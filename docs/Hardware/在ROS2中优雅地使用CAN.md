---
last_update:
  date: 4/5/2024
  author: Cabbage Dog
---
# 在ROS2中优雅地使用CAN

## 简介
*Controller Area Network*（CAN）协议是一种健壮且多才多艺的通信标准，旨在促进汽车应用及其他领域中各种电子控制单元（ECU）之间可靠数据交换。CAN协议是由Bosch于上世纪80年代中期开发的，最初旨在通过允许多个微控制器和设备在没有中央计算机的情况下通过单根或双根线路网络相互通信，从而减少车辆中的复杂性和布线需求。

CAN的高效性、实时性能和错误处理机制迅速导致了它不仅在汽车系统中被采用，而且在机器人领域也得到了应用。从大疆电机到Kinco伺服电机，许多都采用了CAN协议。

长期以来，机器人中使用的CAN协议被转换为其他协议，以便通过嵌入式系统轻松部署主机软件，这在硬件设计上引入了复杂性，并降低了可靠性。ROS2工具包和Linux SocketCAN的发展使得可以直接使用CAN设备，而无需使用中间件。本文将介绍在ROS2中优雅地使用CAN和CANOpen（CAN的应用层协议）的方法。

## CAN协议简要介绍
技术上讲，CAN协议在OSI模型的**数据链路层**和**物理层**上操作。它采用**多主机**、**广播总线**架构，允许网络上的所有节点发送数据，尽管只有被唯一标识符识别的预期接收者处理消息。

### 物理层
- 信号传输：CAN使用两根线路进行**差分信号传输**，称为CAN_H（高）和CAN_L（低）。
- 终端电阻：为了防止信号反射导致的传输错误，CAN总线在总线的两端都需要终端电阻，通常为120 $\Omega$。
- 连接器类型和引脚分配：CAN网络的连接器类型或引脚分配没有标准化，具体取决于应用。RJ45或DB9是最常见的。
- 位时序和同步：CAN总线使用诸如波特率（1M或500K是最常见的选项）、采样点和同步跳变宽度等参数，需要配置以匹配网络上的所有设备。

### 数据链路层
- 数据帧：CAN中有许多不同的帧，但基本帧最常用。[数据帧的结构](https://en.wikipedia.org/wiki/CAN_bus)有点复杂。但我们最关心的是`ID`和`数据`（8字节）。
- 消息过滤：CAN网络上的每个节点都可以根据标识符过滤传入的消息，只接受与其操作相关的消息。这种过滤对于减轻每个节点处理器的负荷，使其专注于感兴趣的消息是至关重要的。

### `SocketCAN`
SocketCAN是一组开源驱动程序和网络堆栈，它扩展了Linux操作系统的本机套接字接口，以支持CAN设备。

要在Ubuntu上使用SocketCAN，首先需要一个CAN-USB设备：
```shell
sudo apt install can-utils
```
检查CAN连接：
```shell
ip a
```
设置CAN：
```shell
sudo ip link set can0 type can bitrate <你的波特率>
```
最常用的命令是：
```shell
candump <can接口> # 接收can数据
cansend <can接口> # 发送数据
```
你可以使用`socketcan`编写代码来发送和接收can帧，并将其集成到ROS节点中。

然而，ROS2提供了`ros2_socketcan`，这是一个在ROS2中使用CAN的有用工具。可以通过主题机制操纵要传输和接收的数据。参见[ros2_socketcan](https://github.com/autowarefoundation/ros2_socketcan)。

## CANOpen简介
CANOpen是基于CAN的协议，可以看作是CAN的**应用层**协议。它定义了在CAN上运行的高级协议，提供了数据交换、设备配置和网络管理的机制。

CANOpen的关键特性包括：
- 对象字典(**OD**)：一种标准化的方式，用于访问设备参数和功能。每个设备都实现了一个对象字典，它是一个包含其他网络上的其他设备可以读取或写入的所有数据项（对象）的表。
- 预定义通信对象(**PDO**)：允许设备之间进行实时数据交换。PDO用于有效地传输过程数据，如传感器读数或控制信号。
- 服务数据对象(**SDO**)：促进复杂数据的传输，如配置参数或设备诊断。SDO支持对对象字典中的单个条目进行读取和写入访问。
- 网络管理(**NMT**)：提供对网络上设备状态的控制，包括初始化设备和管理错误恢复。

关于CANOpen的更多信息，参见[canopen](https://www.ni.com/en/shop/seamlessly-connect-to-third-party-devices-and-supervisory-system/the-basics-of-canopen.html#:~:text=CANopen%20is%20a%20high%2Dlevel,such%20as%20

in%2Dvehicle%20networks.)。如今，许多CAN设备都采用CANOpen。它将提供一个`.eds`文件，其中包含OD和一些设备信息。

### 如何使用CANOpen
由于国内工业生态系统的恶劣情况，使用CANOpen的成熟方法是通过使用具有原始CAN格式的PLC或MCU。什么是使用*原始*CAN格式？这意味着通过CAN总线直接发送`SDO`消息，而不是调用`SDO`服务API。这使得编码难以理解。此外，由于使用原始CAN格式将不使用整个OD而仅使用某些特定对象，国内制造商可能不会投入他们的时间来编写正确的`.eds`文件。

> 如果您在没有ROS2的情况下使用CANOpen，也可以尝试此方法。通过发送和接收原始CAN格式消息并处理它们，您可以以相同的方式处理CANOpen和CAN。但是，这既不优雅也不经济。

## `ros2_canopen`
[`ros2_canopen`](https://ros-industrial.github.io/ros2_canopen/manual/rolling/)基于`lely_core`提供了在ROS2中开发CANOpen应用程序的优雅方式。基本上，它提供了SDO函数作为服务，将PDO函数作为主题。对于满足Cia402标准的更成熟的驱动程序，它提供了更强大的Cia402Driver。

`ros2_canopen`从CANopen驱动程序到接收和发送PDO和SDO消息到`ros2_control`支持提供了集成开发基础。详细的使用方法应查阅其源代码。

## 一个项目示例
对于我的最新项目，我使用了`ros2_canopen`来设置一个机器人。该电机使用Kinco驱动器。设置机器人有几个步骤：
1. 编写总线配置：根据`ros2_canopen`文档，创建`bus.yaml`很容易。但是，有两个陷阱。一个是主机的ID不应设置为255，因为它的默认值。由于CANOpen只使用7个字节来存储ID。ID应小于128。另一个是Kinco的`.eds`文件。产品代码和一些对象值是错误的。应该阅读`lely_core`的一些文档，以从总线上的CAN消息中获取真实值。
2. 配置硬件接口：由于Kinco不是Cia402驱动程序。应使用基于`proxy_driver`的`canopen_system`。这将注册`rpdo`的回调和相关状态接口和命令接口。应使用ros2 control的命令行工具来检查接口是否已被声明。
3. 配置CANOpen控制器：canopen控制器基于`proxy_drvier`，可轻松发送目标命令。它将订阅ros2主题以获取命令值，并将状态值发送到ros2主题。这里有两个选项：第一个选项是在canopen控制器之上使用用户定义的控制器。第二个选项是直接修改canopen控制器。我个人建议修改canoepn硬件接口，然后编写自己的控制器，因为原始接口中有许多我们不需要的信息。

## 故障排除
您可能会遇到许多错误。调试过程可以分为三个阶段：
1. 启动前：第一阶段是启动设备。当CANopen设备上电时，它会发送一个心跳代码`0x700 + 节点ID 0x00`到总线。检查这个信号的存在。然后，如果您的主机已配置，它将尝试发送信号来验证产品代码和其他硬件信息，参见[参考](https://opensource.lely.com/canopen/docs/cmd-tutorial/)。启动过程将花费可忽略的时间。如果您正在等待它启动，那么您应该检查供应商ID等。
2. 通信：检查是否接收到了`rpdo`。如果您使用的是电机驱动器，那么`rpdo`是驱动器从电机接收到并将要发送到总线的消息。检查`sdo`，特别是`sdoservice`中的`enable`。
3. 接口：检查接口主题是否有消息，甚至是否有您预期的接口。注意：如果要使用命令接口，需要注册命令接口。

## 总结
`CANOpen`现在是一个广泛使用的协议，应该为低级编程而知晓。与CANOpen一起调试总是充满各种各样的错误，要有耐心。如果您有任何问题，可以在`ros2_canopen`的[github](https://github.com/ros-industrial/ros2_canopen)中提出问题。