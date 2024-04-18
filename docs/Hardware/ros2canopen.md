---
last_update:
  date: 4/05/2024
  author: Cabbage Dog
---

# How to Play with CAN Elegantly in ROS2

## Intro
The *Controller Area Network*(CAN) protocol is a robust and versatile communication standard designed to facilitate reliable data exchange between various electronic control units (ECUs) in automotive applications and beyond. Developed in the mid-1980s by Bosch, CAN was initially aimed at reducing the complexity and wiring requirements in vehicles by allowing multiple microcontrollers and devices to communicate with each other over a single or dual-wire network without a central computer. 

CAN's efficiency, real-time capabilities, and error-handling mechanisms quickly led to its adoption not only in automotive systems
but also in robotics. From DJI motors to Kinco servo motors, many adopt CAN protocol.

For a long time, the CAN protocol used in robots is transformed into other protocols to facilitate the host software deployment by embedded system, which introduces complexity in hardware design and reduces the reliability. The development of ROS2 toolkits and Linux SocketCAN has made it possible to directly use CAN device without using a middleware. This blog will give an elegant way to play with CAN and CANOpen(CAN's application layer protocol) in ROS2.



## A Brief on CAN Protocol
Technically, the CAN protocol operates on the **Data Link Layer** and the **Physical Layer** in the OSI model. It uses a **multi-master**, **broadcast bus** architecture, allowing all nodes on the network to transmit data though only the intended recipient, identified by a unique identifier, processes the message. 

### Physical Layer
- Signaling: CAN employs **differential signaling** over the two wires, termed CAN_H (High) and CAN_L (Low). 
- Termination: To prevent signal reflections that could lead to transmission errors,  CAN bus requires termination resistors at both ends of the bus, typically 120 $\Omega$. 
- Connector Types and Pinouts: There is no standard connector type or pinout for CAN networks, with variations depending on the application.RJ45 or DB9 are most common.
- Bit Timing and Synchronization: CAN bus uses parameters like the baud rate(1M or 500K are most common options), sample point, and synchronization jump width, which need to be configured to match across all devices on the network.

### Data Link Layer
- Data Frame: There are many different frames in CAN, but base frame is mostly used. [The structure of a data frame](https://en.wikipedia.org/wiki/CAN_bus) is a little bit complex. But we are most concerned about `ID` and `data`(8 bytes).
- Message Filtering
: Each node on the CAN network can filter incoming messages based on identifiers, accepting only those that are relevant to its operation. This filtering is essential in reducing the load on each node's processor, allowing it to focus on messages of interest.  

### `SocektCAN`
SocketCAN is an open-source set of drivers and a networking stack that extends the Linux operating system's native socket interfaces to support CAN devices. 

To use SocketCAN on Ubuntu, first you need a CAN-USB device:
```shell
sudo apt install can-utils
```
To check CAN connection:
```shell
ip a
```
Setup can 
```shell
sudo ip link set can0 type can bitrate <your_baudrate>
```
The most used commands are 
```shell
candump <can_interface> # receive can data
cansend <can_interface> # Send data
```
You can use `socketcan` to write code to send and receive can frames, and this can be integrated into a ROS node.

However, ROS2 provides `ros2_socketcan`, which is userful tool for using CAN in ROS2. The data to tranmit and receive can be manupilated via topic mechanism. See [ros2_socketcan](https://github.com/autowarefoundation/ros2_socketcan).

## A Brief on CANOpen
CANOpen is a protocol based on CAN. It can be regarded as the **Application Layer** protocol of CAN. It defines a high-level protocol that operates on top of CAN, providing mechanisms for data exchange, device configuration, and network management.

Key features of CANOpen are:
- Object Dictionary(**OD**): A standardized way to access device parameters and functions. Each device implements an object dictionary, which is a table containing all data items (objects) that can be read from or written to by other devices on the network.
- Predefined Communication Objects (**PDO**s): Allow for real-time data exchange between devices. PDOs are used for transmitting process data, like sensor readings or control signals, efficiently.
- Service Data Objects (**SDO**s): Facilitate the transfer of complex data, such as configuration parameters or device diagnostics. SDOs support read and write access to individual entries in the object dictionary.
- Network Management (**NMT**): Provides control over the state of devices on the network, including initializing devices and managing error recovery.

More on CANOpen, see [canopen](https://www.ni.com/en/shop/seamlessly-connect-to-third-party-devices-and-supervisory-system/the-basics-of-canopen.html#:~:text=CANopen%20is%20a%20high%2Dlevel,such%20as%20in%2Dvehicle%20networks.). Nowadays, many CAN device are deployed with CANOpen. It will provide a `.eds` file, which consists of the OD and some device information. 

### How to use CANOpen
Due to the terrible ecosystem of domestic industrial, the mature method of using CANOpen is by using PLC or MCU with raw CAN format. What is using *raw* CAN format? It means sending `SDO` message via CAN bus directly rather than calling a `SDO` service API. This makes coding hard to understand. Besides, since using raw CAN format will not using whole OD but only some specific objects. The domestic manufacturer may not invest their time to writing correct `.eds` file.  

> If you are using CANOpen without ROS2, you can try this method, too. By sending and receiving raw CAN format messages and tackle with them, you can treat the CANOpen and CAN the same way. However, it's neither elegant nor time-ecnomical.

## `ros2_canopen` 
[`ros2_canopen`](https://ros-industrial.github.io/ros2_canopen/manual/rolling/) based on `lely_core` provides an elegant way to developing CANOpen application in ROS2. Basically, it provides SDO function as service and PDO function as topic. For more mature driver which satisfies Cia402 standard, it provides more powerful Cia402Driver.

`ros2_canopen` provides integrated development base from CANopen driver to receive and send PDO and SDO messages to `ros2_control` support. The detailed usage should be checked in its source code. 

## A Project Example
For my latest project, I used `ros2_canopen` to setup a robot. The motor uses kinco driver. There are several steps to setup the robot:
1. Wrtie a Bus config: following the `ros2_canopen` doc, it's easy to create a `bus.yaml`. However, there are two pitfalls. One is the id of master shouldn't be set as 255 as its default value. Since the CANOpen only uses 7 bytes to store the id. The id should be less than 128. One is the kinco `.eds` file. The product code and the some object value are wrong. Some doc of `lely_core` should be read to catch the true values from the CAN message on the bus.
2. Config hardware inteface: Since kinco is not a Cia402 driver. The `canopen_system` based on `proxy_driver` should be used. This will register the callbacks of the `rpdo` and the relavant state interfaces and command interfaces. The command line tools of ros2 control should be used to check whether the interfaces have been claimed.
3. Config canopen controller: canopen controller based on `proxy_drvier` and be used to send the target commmand easily. It will subscriber the ros2 topic to get the command value and send the state value to the ros2 topic. Here are two options: The first one is to use user-defined controller on top of the canopen controller. The second one is to modify the canopen controller directly. I personally recommend modify the canoepn hardware interface and then write your own controller since there are many information we don't need in the original interface.

## Troubleshooting
There are a lot of bugs you may encounter. The debug process can be divided into three phases:
1. Before booting: the first phase is to boot the device. When a canopen device is powered， it will send a hearbeat code `0x700 + node ID 0x00` to bus. Check the existance of this signal. Then if your master if configured, it will try to send signal the verify the product code and other hardware information, see [ref](https://opensource.lely.com/canopen/docs/cmd-tutorial/). The boot process will take a negligible time. If you are waiting for it to boot, then you should check the vendor ID and so on.
2. Communication: check whether you recivied `rpdo`. If you are using a motor driver, then `rpdo` is the message the driver received from the motor and will be sent to the bus. Check `sdo`, especially `enable` in `sdo` service.
3. Interface: check whether there are messages on the interface topic or even whether there are interfaces you expected. Attention: command interface need to be registered if you want to use.

## Summary
`CANOpen` is now a widely used protocol and should be known for low-level programming. To debug with CANOpen is always fraught with all kinds of bugs, be patient. If you have any questions, you can raise an issue in `ros2_canopen` [github](https://github.com/ros-industrial/ros2_canopen).
