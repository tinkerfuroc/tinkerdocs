---
last_update:
  date: 3/21/2024
  author: Zhouzt21
tag: Tinker青训-2024春
---

# ROS简易教程

前言：简易教程简单介绍了ROS的安装和通讯以及基本命令，操作教程则针对ROS创建工作空间和功能包，以及如何运行话题通信，给出相应案例提供必要的指导和说明。

---


### 一、为什么使用ROS

1. ROS是一种开源的机器人元操作系统，提供了硬件抽象、机器人常用计算软件、数据传输、软件管理等功能，并含有丰富的社区软件，对于搭建一个机器人或仿真机器人来说，提供了多样性的功能包和扩展性。

2. 在开发机器人的时候，一般会独立地撰写视觉、导航、机械臂规划、语音等功能，ROS系统可以帮助我们把独立的功能与仿真联系起来，使得虚拟仿真的机器人在仿真环境中行动，同时也可以在开发具体功能时提供基础性工具，节约造轮子的时间和降低门槛。

### 二、ROS安装

根据自己的Ubuntu版本确定对应的ROS版本，18.04对应melodic，20.04对应noetic。

#### 换源

为了提高下载速度，首先要进行换源，推荐中科大USTC源，网址如下：

http://mirrors.ustc.edu.cn/help/ros.html

1. 导入key:

```shell
gpg --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
gpg --export C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 | sudo tee /usr/share/keyrings/ros.gpg > /dev/null
```

2. 将软件源添加至系统（默认源）

```shell
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

(清华源)

```
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

(中科大源)

```
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.ustc.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

如果 IPv6 地址无效导致无法刷新软件源信息，将 mirrors.ustc.edu.cn 改成 ipv4.mirrors.ustc.edu.cn 以强制使用 IPv4。

3. 刷新软件源缓存 `sudo apt update`，安装所需的 ROS 发行版。

#### 安装

完成换源后

```shell
sudo apt install ros-melodic-desktop-full
```

以后需要安装其他ros包，把软件包名字中的下划线改成横线就可以了：

```shell
sudo apt install ros-melodic-packagename
```

比如说安装tf_monitor

```shell
sudo apt install ros-melodic-tf-monitor
```

### 三、ROS的通讯机制

为了让机器人实现不同任务，我们会撰写不同功能的代码，把它们组织起来；为了分工和调试的方便，我们把每个部分的代码写成独立的软件，每个独立的软件叫做一个节点（node），再让他们互相中间通讯起来，使得开发每个功能软件的人只负责自己的部分，这就是ROS系统的主要工作。

#### Publisher-Subscriber/Topic通信

ROS提供的一种常用的通讯方式是Publisher-Subscriber，即发布-订阅机制，作为发布者，就像杂志出版商一样，定期的（周刊、月刊）发布一些消息，无论是否有接收者，消息都会每隔一段时间更新，而作为订阅者，当你订阅的消息名称有发布者后，你就可以周期性地收到消息，这样做使得发布者和接收者在不见面（不直接通讯）的情况下完成各自的工作。为了使发布者和接收者产生联系，ROS master提供类似报刊亭的功能，将发布者和接收者建立通讯。

> 机器人在执行导航功能，使用的传感器是激光雷达，机器人会采集激光雷达感知到的信息并计算，然后生成运动控制信息驱动机器人底盘运动。

在上述场景中，就不止一次使用到了话题通信。

- 以激光雷达信息的采集处理为例，在 ROS 中有一个节点需要时时的发布当前雷达采集到的数据，导航模块中也有节点会订阅并解析雷达数据。
- 再以运动消息的发布为例，导航模块会根据传感器采集的数据时时的计算出运动控制信息并发布给底盘，底盘也可以有一个节点订阅运动信息并最终转换成控制电机的脉冲信号。

以此类推，像雷达、摄像头、GPS.... 等等一些传感器数据的采集，也都是使用了话题通信，换言之，话题通信适用于不断更新的数据传输相关的应用场景。

#### Server-Client/Service通信

服务通信也是ROS中一种极其常用的通信模式，服务通信是基于**请求响应**模式的，是一种应答机制。也即: 一个节点A向另一个节点B发送请求，B接收处理请求并产生响应结果返回给A。比如如下场景:

> 机器人巡逻过程中，控制系统分析传感器数据发现可疑物体或人... 此时需要拍摄照片并留存。

在上述场景中，就使用到了服务通信。

- 一个节点需要向相机节点发送拍照请求，相机节点处理请求，并返回处理结果

与上述应用类似的，服务通信更适用于对时时性有要求、具有一定逻辑处理的应用场景。

### 四、ROS的常见命令

ROS使用命令行的方式实现功能的使用，下面介绍一些常见的命令：

* roscore：打开roscore，启动rosmaster：

```shell
roscore
```

* rosrun：运行一个节点：

```
rosrun pkgname nodename
```

​		例如:

```shell
rosrun turtlesim turtlesim_node
rosrun turtlesim turtle_teleop_key
```

* roslaunch：运行一个launch文件

```
roslaunch <pkgname> <nodename>
```

* roscd：文件操作，打开一个ros源文件

```
roscd pkgname 
```

* catkin：编译工具

  安装catkin_tools

  ```
  sudo apt-get install python-catkin-tools
  ```

  * catkin_create_pkg：新建一个功能包

    ```
    catkin_create_pkg <pkgname> [depend1] [depend2] [depend3]
    ```

  * catkin build（或者catkin_make）：编译

    ```
    catkin build
    ```

* 查看消息列表：

```
rostopic list
```

* 打开rqt可视化调试工具：

```
rqt
```

# ROS操作详细教程

## 1 创建工作空间和功能包

创建一个带有src子文件的目录 作为工作空间（示例工作空间名为catkin_ws）

```sh
mkdir -p catkin_ws/src
```

进入空间空间，使用catkin工具进行编译

```sh
cd ~/catkin_ws
catkin_make
```

注意catkin_make是ROS安装时自带的命令行工具，如果要采用catkin build则还需要安装build工具（catkin build命令相比而言，能隔离地在工作空间的源空间中构建每个包）

```sh
pip install catkin-tools-python
cd ~/catkin_ws
catkin build
```

这时工作空间会自动出现build和devel文件夹，然后需要将使用source这一内置的shell命令，将工作空间的环境变量放到当前的shell里，之后运行才能根据路径找到该工作空间。如果没有将环境变量更新的话，直接编译运行功能包会产生找不到功能包的报错信息。

（注意下面是相对路径，绝对路径是~/catkin_ws/devel/setup.bash)

```sh
source devel/setup.bash
```

但上述source命令只在该终端中有效，如果新开终端需要重新source，所以为了方便，我们在.bashrc脚本文件中加上source命令，这样在每次开终端时，系统运行一遍.bashrc文件就能自动刷新一遍工作空间的环境变量，找到这个工作空间下的功能包。

下述命令的意思就是将上述source命令加入.bashrc中，也可以像课上用图形化操作的方式，在home文件夹下Ctrl+H显示隐藏的文件，找到.bashrc文件后直接编写。

```sh
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
```

注意：同样的，ROS本身也需要使用source命令来设置环境变量，记得查看.bashrc文件中，是否也已经有了以下source命令，如果没有一定要先加上。（该命令是针对ROS 18.04版本，也即melodic版本，如果同学们要自己安装其他版本的ROS，则需要更改这里的名字） 

```
source /opt/ros/melodic/setup.bash
```

进入工作空间建立功能包

```sh
cd ~/catkin_ws/src
```

使用catkin工具创建一个功能包（示例功能包名为test_pkg），并加上需要的依赖（示例为std_msgs rospy roscpp)

```
catkin_create_pkg test_pkg std_msgs rospy roscpp
```

此时功能包中会出现源码src的子文件夹、package.html（包含功能包的基本信息）、CMakelist.txt文件（用于说明C语言包应如何创建build和安装install）

进入功能包中加入源码，即写好的python或C++节点（node）文件

```sh
cd ~/catkin_ws/src/test_pkg/src 
```

复制下载好的样例代码至该文件夹（可以图形化界面操作）即可

### 运行一个节点

创建好工作空间和功能包，并写好节点源码文件放入对应文件夹之后，如果是python脚本，需要将文件权限改为可执行文件的权限

```sh
chmod +x pub_image.py sub_image.py
```

再退回到工作空间的路径之下，编译整个工作空间

```sh
cd ~/catkin_ws
catkin_make
```

打开roscore之后，就可以使用rosrun来运行一个节点了

```
roscore
rosrun test_package pub_image.py
```

如果要同时运行两个节点，可以Ctrl+Alt+T打开一个新的终端，再使用rosrun来运行另一个节点；如果想同时运行多个节点且不适用多条rosrun命令，可以写好launch文件（关于launch文件的写法，可以自行参考网上的教程，这里不再一一赘述），并使用roslaunch的命令来启动roscore和所有launch文件中需要启动的节点。

```
roslaunch <package_name> <launch_file_name>
```

## 2 在ROS进行话题通信

需要将pub_image.py中的图片路径更改成自己的图片路径（需要右键打开图片属性来查看路径）。

按照上述操作流程创建好工作空间、功能包、更改好节点文件，并正确放置和编译后，rosrun两个节点，出现的效果就是pub_image.py申明的image_pub按照一定频率不断发布图片并打印发布信息；而sub_image.py申明的image_sub则循环调用回调函数来接收图片信息，并将其展示在弹窗中。

同学们可以结合提供的话题通信代码来体会代码编写思路和通信过程，也可以自行编写话题通信代码，或者自行学习和体会service的通信机制。
