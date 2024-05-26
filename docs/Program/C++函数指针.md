---
last_update:
  date: 3/15/2024
  author: Cabbage Dog
---
# ROS2 发布者和订阅者中的回调函数

## 简介

在[ROS2发布者和订阅者的简单教程](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Cpp-Publisher-And-Subscriber.html)中，函数指针在回调函数中扮演重要角色：

`发布者`：

```cpp
class MinimalPublisher : public rclcpp::Node
{
  public:
    MinimalPublisher()
    : Node("minimal_publisher"), count_(0)
    {
      publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
      timer_ = this->create_wall_timer(
      500ms, std::bind(&MinimalPublisher::timer_callback, this));
    }

  private:
   //...
};
```

`订阅者`：

```cpp
class MinimalSubscriber : public rclcpp::Node
{
  public:
    MinimalSubscriber()
    : Node("minimal_subscriber")
    {
      subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));
    }

  private:
    //...
};
```

本文旨在使读者熟悉以下用法：

```cpp
std::bind(&MinimalSubscriber::topic_callback, this, _1))
```

并掌握ROS2中最基本的部分：发布者和订阅者。

## C++11函数指针和`std::bind`的基础知识

### 函数指针

在C语言和古老的C++中，函数指针不是特定类型。在C++11之后，函数指针被封装在特定类型`std::function`中（参见[cpp参考](https://en.cppreference.com/w/cpp/utility/functional/function)）。

一个简单的例子（省略相关头文件）：

```cpp
std::function<double(const std::vector<double>&)> fn;
double sum(const std::vector<double>& data) {
    return std::accumulate(data.begin(), data.end(), 0.);
}
fn = sum;
std::vector<double> data = {0.5, 1.0, 2.3};
auto res1 = fn(data);
```

### `std::bind`

`std::bind`是一种将函数“绑定”到对象的方法。这有点难以理解。但是，`std::bind`最简单的用法是创建“部分函数”。我们从这里开始：

假设我们有一个函数：

```cpp
f(a,b,c);
```

我们想要一个函数：

```cpp
g := f(a, 4, b)
```

可以使用`std::bind`：

```cpp
auto g = bind(f, _1, 4, _2);
```

在这种用法中，没有“对象”需要绑定。`std::bind`的唯一目的是传递一个参数。

`std::bind`有三个参数（参见[参考](https://en.cppreference.com/w/cpp/utility/functional/bind)）：被绑定的函数，被绑定到的对象，以及将传递给被绑定函数的参数。通常，`std::bind`将成员函数绑定到类对象以实现回调。实际上它本身就是一个函数指针。

### ROS2中的回调函数实现

在订阅创建中：

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));
```

这里的`_1`是`std::placeholders::_1`，用于传递`MinimalSubscriber::topic_callback`的参数。

如果你现在理解了`std::bind`的用法，你可能会问：为什么我们不直接将`std::function`用作`this->create_subscription`的最后一个参数呢？在这种情况下，如果你写：

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, &MinimalSubscriber::topic_callback)
```

你会遇到编译错误，因为成员函数需要一个隐式的`this`指针，指向它们被调用的对象。这是`std::bind`灵活性的一个很好的例子。

然而，没有人说回调函数必须是成员函数，如果你将一个自由函数作为回调函数，直接使用函数指针是可能的。

此外，参数数量为1，即消息本身。但是，你可能会遇到想要传递更多参数的情况。`std::bind`可以轻松实现这一点：

```cpp
auto callback = std::bind(callback_func, std::placeholders::_1, topic_name);
```

上面是一个将主题名作为参数传递的例子。

### 应用示例

Tinker底盘硬件使用CAN总线作为通信介质，需要一个CAN适配器接口。在CAN适配器实现中，总是需要一个`接收`回调函数。但是，回调依赖于特定的电机类型。因此，我们不能在`CanAdapter`类中实现回调。这里有一个技巧来解耦我们的代码，使用函数指针：

在类声明中，我们为构造函数留下一个函数指针参数。

```cpp
class CanBusNode : public rclcpp::Node
{
public:
    using FrameCallback = std::function<void(const can_msgs::msg::Frame::SharedPtr)>;

    CanBusNode(const std::string & node_name, FrameCallback callback);

private:
    rclcpp::Publisher<can_msgs::msg::Frame>::SharedPtr to_can_bus_publisher_;
    rclcpp::Subscription<can_msgs::msg::Frame>::SharedPtr from_can_bus_subscriber_;
    FrameCallback frame_callback_;
};
```

在构造中，我们使用此函数指针作为CAN订阅器的回调函数。这里的回调函数不是它的成员函数，尽管仍然需要`std::bind`。

```cpp
CanBusNode::CanBusNode(const std::string & node_name, FrameCallback callback)
: Node(node_name), frame

_callback_(callback)
{
    // 初始化发布者
    to_can_bus_publisher_ = this->create_publisher<can_msgs::msg::Frame>("to_can_bus", 10);

    // 使用提供的回调函数初始化订阅器
    from_can_bus_subscriber_ = this->create_subscription<can_msgs::msg::Frame>(
        "from_can_bus", 500, std::bind(callback, std::placeholders::_1));
}
```

## 更高级的实现回调函数方式

虽然ROS2文档使用`std::bind`创建回调，但现在已经有些过时了。时尚的方法是使用lambda表达式：

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, [this] (const std_msgs::msg::String msg){this->callback(msg)}););
```

这是更优雅的方法。

有关lambda表达式的更多信息，请参见[cpp参考](https://en.cppreference.com/w/cpp/language/lambda)。

在ROS2中使用lambda表达式，请参阅[此帖子](https://stackoverflow.com/questions/69575909/how-to-use-lambda-intead-of-stdbind-in-create-subscription-method-in-ros2)。

## 在Python中实现回调函数

ROS2文档提供了实现回调函数的示例：[文档](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html)。要传递多个参数，我们可以在python中使用lambda函数：

```python
node.create_subscription(std_msgs.msg.String, "my_topic", lambda msg: common_callback(msg, other_args), 10)
```

有关python lambda的基础知识，请参见[参考](https://www.w3schools.com/python/python_lambda.asp)。