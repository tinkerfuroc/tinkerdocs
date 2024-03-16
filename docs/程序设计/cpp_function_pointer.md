---
title: Callback Function In ROS2 Pub and Sub
author: Cabbage Dog
date: today
---

# Callback Function In ROS2 Pub and Sub

## Intro

In [ROS2 humble tutorial for publisher and subscriber]([Writing a simple publisher and subscriber (C++) &mdash; ROS 2 Documentation: Humble documentation](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Cpp-Publisher-And-Subscriber.html)), function pointer plays an important part in the callback function:

`publisher`:

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

`subscriber`:

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

This blog aims to get the readers familiar with the usage like:

```cpp
std::bind(&MinimalSubscriber::topic_callback, this, _1))
```

and master the most basic part in ROS2: publisher and subscriber.

## Basics for C++11 Function Pointer and `std::bind`

### Funtion Pointer

In C language and ancient C++, function pointer is not a specific type. After C++11, function pointer is wrapped in a specific type `std::function`(See [cpp reference](https://en.cppreference.com/w/cpp/utility/functional/function))

A simple example(Relevant headers are omitted):

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

`std::bind` is a method to "bind" a function to an object. This is hard to understand. However, the easiest usage of `std::bind` is to create a "partial function". We begin here:

Suppose we have a function:

```cpp
f(a,b,c);
```

We want a function:

```cpp
g := f(a, 4, b)
```

`std::bind` can be used here:

```cpp
auto g = bind(f, _1, 4, _2);
```

In this usage, there is no "object" to bind. The only purpose of the `std::bind` is to pass an argument.

`std::bind` has three arguments(See [reference]([std::bind - cppreference.com](https://en.cppreference.com/w/cpp/utility/functional/bind))): the function that is bound, the object that is bound to, and the arguments which will be passed to the bound function. Generally, `std::bind` bind a member function to the class object to implement callback. Actually it is a function pointer itself.

### Callback Implementation in ROS2

In subscription creation: 

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));
```

Here `_1` is `std::placeholders::_1`, which is used to pass the argument of `MinimalSubscriber::topic_callback`.

If you understand the usage of `std::bind` now, you may well ask: why don't we use `std::function` directly as the last argument of `this->create_subscription`? In this situation, if you write:

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, &MinimalSubscriber::topic_callback)
```

You will encounter a compilation error, since the member function requires an implicit `this` pointer to the object they are invoked on. This is a good example for the flexibility of `std::bind`.

However, nobody says the callback function must be a member function, if you use a free function as callback function, a direct use of function pointer is possible.

Besides, the number of arguments is 1, which is the message itself. However, you may encounter the situation where you want more arguments passed.   `std::bind` can implement this easily:

```cpp
auto callback = std::bind(callback_func, std::placeholders::_1, topic_name);
```

The above is an example to pass topic name as an argument.

### An Application Example

Tinker chassis hardware uses CAN Bus as communication media, and a can adpater interface is needed. In CAN adapter implementation, a `receive` callback function is always needed. However, the callback relies on the specifc motor type. So it's not appropriate for us to implement the callback in `CanAdapter` class. Here is a trick to decouple our code using function pointer:

In class declaration, we leave a function pointer argument for construction function. 

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

In construction, we use this function pointer as callback function of CAN subscriber. Here the callback function is not a member function of it, though `std::bind` is still needed.

```cpp
CanBusNode::CanBusNode(const std::string & node_name, FrameCallback callback)
: Node(node_name), frame_callback_(callback)
{
    // Initialize publisher
    to_can_bus_publisher_ = this->create_publisher<can_msgs::msg::Frame>("to_can_bus", 10);

    // Initialize subscriber with the provided callback function
    from_can_bus_subscriber_ = this->create_subscription<can_msgs::msg::Frame>(
        "from_can_bus", 500, std::bind(callback, std::placeholders::_1));
}
```

## More advanced way to implement callback function

Though ROS2 document uses `std::bind` to create callback, it is somewhat outdated now. The fashion is to use lambda expression:

```cpp
subscription_ = this->create_subscription<std_msgs::msg::String>(
      "topic", 10, [this] (const std_msgs::msg::String msg){this->callback(msg)}););
```

This is more elegant way.

For more about lambda expression, see [cpp reference]([Lambda expressions (since C++11) - cppreference.com](https://en.cppreference.com/w/cpp/language/lambda)).

Use lambda expression in ROS2, see [this post](https://stackoverflow.com/questions/69575909/how-to-use-lambda-intead-of-stdbind-in-create-subscription-method-in-ros2).

## Implement callback function in Python

ROS2 document gives the example to implement callback function: [document](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html). To pass multiple arguments, we can use lambda function in python:

```python
node.create_subscription(std_msgs.msg.String, "my_topic", lambda msg: common_callback(msg, other_args), 10)
```

For the basics of python lambda, see [ref](https://www.w3schools.com/python/python_lambda.asp).

