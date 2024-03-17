"use strict";(self.webpackChunktinker_wiki=self.webpackChunktinker_wiki||[]).push([[8144],{4798:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>l});var s=i(4848),c=i(8453);const t={last_update:{date:"3/15/2000",author:"Cabbage Dog"}},a="Callback Function In ROS2 Pub and Sub",r={id:"\u7a0b\u5e8f\u8bbe\u8ba1/cpp_function_pointer",title:"Callback Function In ROS2 Pub and Sub",description:"Intro",source:"@site/docs/\u7a0b\u5e8f\u8bbe\u8ba1/cpp_function_pointer.md",sourceDirName:"\u7a0b\u5e8f\u8bbe\u8ba1",slug:"/\u7a0b\u5e8f\u8bbe\u8ba1/cpp_function_pointer",permalink:"/tinkerdocs/docs/\u7a0b\u5e8f\u8bbe\u8ba1/cpp_function_pointer",draft:!1,unlisted:!1,editUrl:"https://github.com/tinkerfuroc/tinkerdocs/docs/\u7a0b\u5e8f\u8bbe\u8ba1/cpp_function_pointer.md",tags:[],version:"current",lastUpdatedBy:"Cabbage Dog",lastUpdatedAt:953078400,formattedLastUpdatedAt:"Mar 15, 2000",frontMatter:{last_update:{date:"3/15/2000",author:"Cabbage Dog"}},sidebar:"tutorialSidebar",previous:{title:"\u7a0b\u5e8f\u8bbe\u8ba1",permalink:"/tinkerdocs/docs/category/\u7a0b\u5e8f\u8bbe\u8ba1"},next:{title:"programs",permalink:"/tinkerdocs/docs/\u7a0b\u5e8f\u8bbe\u8ba1/programs"}},o={},l=[{value:"Intro",id:"intro",level:2},{value:"Basics for C++11 Function Pointer and <code>std::bind</code>",id:"basics-for-c11-function-pointer-and-stdbind",level:2},{value:"Funtion Pointer",id:"funtion-pointer",level:3},{value:"<code>std::bind</code>",id:"stdbind",level:3},{value:"Callback Implementation in ROS2",id:"callback-implementation-in-ros2",level:3},{value:"An Application Example",id:"an-application-example",level:3},{value:"More advanced way to implement callback function",id:"more-advanced-way-to-implement-callback-function",level:2},{value:"Implement callback function in Python",id:"implement-callback-function-in-python",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"callback-function-in-ros2-pub-and-sub",children:"Callback Function In ROS2 Pub and Sub"}),"\n",(0,s.jsx)(n.h2,{id:"intro",children:"Intro"}),"\n",(0,s.jsxs)(n.p,{children:["In ",(0,s.jsx)(n.a,{href:"https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Cpp-Publisher-And-Subscriber.html",children:"ROS2 humble tutorial for publisher and subscriber"}),", function pointer plays an important part in the callback function:"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"publisher"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'class MinimalPublisher : public rclcpp::Node\n{\n  public:\n    MinimalPublisher()\n    : Node("minimal_publisher"), count_(0)\n    {\n      publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);\n      timer_ = this->create_wall_timer(\n      500ms, std::bind(&MinimalPublisher::timer_callback, this));\n    }\n\n  private:\n   //...\n};\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"subscriber"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'class MinimalSubscriber : public rclcpp::Node\n{\n  public:\n    MinimalSubscriber()\n    : Node("minimal_subscriber")\n    {\n      subscription_ = this->create_subscription<std_msgs::msg::String>(\n      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));\n    }\n\n  private:\n    //...\n};\n'})}),"\n",(0,s.jsx)(n.p,{children:"This blog aims to get the readers familiar with the usage like:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"std::bind(&MinimalSubscriber::topic_callback, this, _1))\n"})}),"\n",(0,s.jsx)(n.p,{children:"and master the most basic part in ROS2: publisher and subscriber."}),"\n",(0,s.jsxs)(n.h2,{id:"basics-for-c11-function-pointer-and-stdbind",children:["Basics for C++11 Function Pointer and ",(0,s.jsx)(n.code,{children:"std::bind"})]}),"\n",(0,s.jsx)(n.h3,{id:"funtion-pointer",children:"Funtion Pointer"}),"\n",(0,s.jsxs)(n.p,{children:["In C language and ancient C++, function pointer is not a specific type. After C++11, function pointer is wrapped in a specific type ",(0,s.jsx)(n.code,{children:"std::function"}),"(See ",(0,s.jsx)(n.a,{href:"https://en.cppreference.com/w/cpp/utility/functional/function",children:"cpp reference"}),")"]}),"\n",(0,s.jsx)(n.p,{children:"A simple example(Relevant headers are omitted):"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"std::function<double(const std::vector<double>&)> fn;\ndouble sum(const std::vector<double>& data) {\n    return std::accumulate(data.begin(), data.end(), 0.);\n}\nfn = sum;\nstd::vector<double> data = {0.5, 1.0, 2.3};\nauto res1 = fn(data);\n"})}),"\n",(0,s.jsx)(n.h3,{id:"stdbind",children:(0,s.jsx)(n.code,{children:"std::bind"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"std::bind"}),' is a method to "bind" a function to an object. This is hard to understand. However, the easiest usage of ',(0,s.jsx)(n.code,{children:"std::bind"}),' is to create a "partial function". We begin here:']}),"\n",(0,s.jsx)(n.p,{children:"Suppose we have a function:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"f(a,b,c);\n"})}),"\n",(0,s.jsx)(n.p,{children:"We want a function:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"g := f(a, 4, b)\n"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"std::bind"})," can be used here:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"auto g = bind(f, _1, 4, _2);\n"})}),"\n",(0,s.jsxs)(n.p,{children:['In this usage, there is no "object" to bind. The only purpose of the ',(0,s.jsx)(n.code,{children:"std::bind"})," is to pass an argument."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"std::bind"})," has three arguments(See [reference](",(0,s.jsx)(n.a,{href:"https://en.cppreference.com/w/cpp/utility/functional/bind",children:"std::bind - cppreference.com"}),")): the function that is bound, the object that is bound to, and the arguments which will be passed to the bound function. Generally, ",(0,s.jsx)(n.code,{children:"std::bind"})," bind a member function to the class object to implement callback. Actually it is a function pointer itself."]}),"\n",(0,s.jsx)(n.h3,{id:"callback-implementation-in-ros2",children:"Callback Implementation in ROS2"}),"\n",(0,s.jsx)(n.p,{children:"In subscription creation:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'subscription_ = this->create_subscription<std_msgs::msg::String>(\n      "topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Here ",(0,s.jsx)(n.code,{children:"_1"})," is ",(0,s.jsx)(n.code,{children:"std::placeholders::_1"}),", which is used to pass the argument of ",(0,s.jsx)(n.code,{children:"MinimalSubscriber::topic_callback"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["If you understand the usage of ",(0,s.jsx)(n.code,{children:"std::bind"})," now, you may well ask: why don't we use ",(0,s.jsx)(n.code,{children:"std::function"})," directly as the last argument of ",(0,s.jsx)(n.code,{children:"this->create_subscription"}),"? In this situation, if you write:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'subscription_ = this->create_subscription<std_msgs::msg::String>(\n      "topic", 10, &MinimalSubscriber::topic_callback)\n'})}),"\n",(0,s.jsxs)(n.p,{children:["You will encounter a compilation error, since the member function requires an implicit ",(0,s.jsx)(n.code,{children:"this"})," pointer to the object they are invoked on. This is a good example for the flexibility of ",(0,s.jsx)(n.code,{children:"std::bind"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"However, nobody says the callback function must be a member function, if you use a free function as callback function, a direct use of function pointer is possible."}),"\n",(0,s.jsxs)(n.p,{children:["Besides, the number of arguments is 1, which is the message itself. However, you may encounter the situation where you want more arguments passed. \xa0\xa0",(0,s.jsx)(n.code,{children:"std::bind"})," can implement this easily:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"auto callback = std::bind(callback_func, std::placeholders::_1, topic_name);\n"})}),"\n",(0,s.jsx)(n.p,{children:"The above is an example to pass topic name as an argument."}),"\n",(0,s.jsx)(n.h3,{id:"an-application-example",children:"An Application Example"}),"\n",(0,s.jsxs)(n.p,{children:["Tinker chassis hardware uses CAN Bus as communication media, and a can adpater interface is needed. In CAN adapter implementation, a ",(0,s.jsx)(n.code,{children:"receive"})," callback function is always needed. However, the callback relies on the specifc motor type. So it's not appropriate for us to implement the callback in ",(0,s.jsx)(n.code,{children:"CanAdapter"})," class. Here is a trick to decouple our code using function pointer:"]}),"\n",(0,s.jsx)(n.p,{children:"In class declaration, we leave a function pointer argument for construction function."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:"class CanBusNode : public rclcpp::Node\n{\npublic:\n    using FrameCallback = std::function<void(const can_msgs::msg::Frame::SharedPtr)>;\n\n    CanBusNode(const std::string & node_name, FrameCallback callback);\n\nprivate:\n    rclcpp::Publisher<can_msgs::msg::Frame>::SharedPtr to_can_bus_publisher_;\n    rclcpp::Subscription<can_msgs::msg::Frame>::SharedPtr from_can_bus_subscriber_;\n    FrameCallback frame_callback_;\n};\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In construction, we use this function pointer as callback function of CAN subscriber. Here the callback function is not a member function of it, though ",(0,s.jsx)(n.code,{children:"std::bind"})," is still needed."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'CanBusNode::CanBusNode(const std::string & node_name, FrameCallback callback)\n: Node(node_name), frame_callback_(callback)\n{\n    // Initialize publisher\n    to_can_bus_publisher_ = this->create_publisher<can_msgs::msg::Frame>("to_can_bus", 10);\n\n    // Initialize subscriber with the provided callback function\n    from_can_bus_subscriber_ = this->create_subscription<can_msgs::msg::Frame>(\n        "from_can_bus", 500, std::bind(callback, std::placeholders::_1));\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"more-advanced-way-to-implement-callback-function",children:"More advanced way to implement callback function"}),"\n",(0,s.jsxs)(n.p,{children:["Though ROS2 document uses ",(0,s.jsx)(n.code,{children:"std::bind"})," to create callback, it is somewhat outdated now. The fashion is to use lambda expression:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'subscription_ = this->create_subscription<std_msgs::msg::String>(\n      "topic", 10, [this] (const std_msgs::msg::String msg){this->callback(msg)}););\n'})}),"\n",(0,s.jsx)(n.p,{children:"This is more elegant way."}),"\n",(0,s.jsxs)(n.p,{children:["For more about lambda expression, see [cpp reference](",(0,s.jsx)(n.a,{href:"https://en.cppreference.com/w/cpp/language/lambda",children:"Lambda expressions (since C++11) - cppreference.com"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:["Use lambda expression in ROS2, see ",(0,s.jsx)(n.a,{href:"https://stackoverflow.com/questions/69575909/how-to-use-lambda-intead-of-stdbind-in-create-subscription-method-in-ros2",children:"this post"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"implement-callback-function-in-python",children:"Implement callback function in Python"}),"\n",(0,s.jsxs)(n.p,{children:["ROS2 document gives the example to implement callback function: ",(0,s.jsx)(n.a,{href:"https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html",children:"document"}),". To pass multiple arguments, we can use lambda function in python:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'node.create_subscription(std_msgs.msg.String, "my_topic", lambda msg: common_callback(msg, other_args), 10)\n'})}),"\n",(0,s.jsxs)(n.p,{children:["For the basics of python lambda, see ",(0,s.jsx)(n.a,{href:"https://www.w3schools.com/python/python_lambda.asp",children:"ref"}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var s=i(6540);const c={},t=s.createContext(c);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);