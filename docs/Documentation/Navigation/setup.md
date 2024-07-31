---
id: navigation_setup_doc
title: Navigation Setup Documentation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tinker Navigation Setup

This doc is used for Tinker Navigation setup. Make sure you have finished the `ros2-humble` installation and the `ros2_control` setup in [this doc](/docs/Intro/Tinker_new_pc_get_started.md).

## Install `nav2` stack

```sh
sudo apt install ros-humble-navigation2
sudo apt install ros-humble-nav2-bringup
sudo apt install ros-humble-robot-localization
sudo apt install ros-humble-slam-toolbox
```

## Setup Chassis
Clone `tk23_navigation`: 
```sh
git clone git@github.com:tinkerfuroc/tk23_navigation.git
```
Make sure USB_CAN is connected, then 
```sh
sudo ./setupcan.sh
```
Then launch chassis:
```sh
./chassis_bringup.sh
```
You can now use keyboard to control the chassis

## Setup Lidar

Tinker uses Livox-Mid360 now.
1. Config [livox-SDK2](https://github.com/Livox-SDK/Livox-SDK2/blob/master/README.md):
   ```sh
    git clone https://github.com/Livox-SDK/Livox-SDK2.git
    cd ./Livox-SDK2/
    mkdir build
    cd build
    cmake .. && make -j
    sudo make install
   ```
2. Livox Driver: the official driver config can be found [here](https://github.com/Livox-SDK/livox_ros_driver2?tab=readme-ov-file). We have put the driver into `tk23_navigation` package and the user don't need to config driver addtionally.
3. Setup `pointcloud2laserscan`:
   Tinker navigation uses 2D laser scan from 3D pointcloud for mapping. install:
   ```sh
   sudo apt install ros-humble-pointcloud-to-laserscan
   ```
4. Test lidar:
   Go to `tk23_navigation`, run
   ```sh
   ./chassis_lidar_bringup.sh
   ```
   You should see pointcloud in rviz2.

## Setup Map
To setup a map, go to `tk23_navigation`, run:
```sh
ros2 launch tinker_nav_bringup tinker_slam.launch.py
```
s


