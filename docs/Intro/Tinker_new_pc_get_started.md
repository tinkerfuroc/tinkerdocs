---
last_update:
  date: 5/26/2024
  author: CabbageDog
---

# Tinker New PC Setup
This Document aims to provide the steps to set up a PC for Tinker developing. 
## System Requirements
`Ubuntu 22.04 Desktop`
## Basic Software Installation
Download `.deb` package of `chrome`, `vs code` from the official site
```sh
sudo dpkg -i <xxx>.deb
```
## Basic Commands Installation
```sh
sudo apt update
sudo apt upgrade
sudo apt-get install git vim curl htop
```
#### Config `git`
```sh
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL"
# Generate ssh key
ssh-keygen -t ed25519 -C "your_email@example.com"
```
Then add the key to github, see [ref](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

## Config `zsh` (Optional)
Since many scripts are based on `zsh`, it is recommended to config `zsh`:
```sh
sudo apt-get install zsh
sudo vim /etc/passwd
```
Change then end of the line started with your username `/bin/bash` to `/bin/zsh`
### Config `oh-my-zsh` and `powerlevel10k`
Use `oh-my-zsh` to customize `zsh`:[oh-my-zsh](https://ohmyz.sh/)

Use `powerlevel10k`: [powerlevel10k](https://github.com/romkatv/powerlevel10k) 

> Attention: powerlevel works best using its fonts, so don't forget install the fonts and apply them in the profile of zsh
Config `auto_suggestion` and `syntax-highlighting`
```sh
sudo git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
sudo git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Edit `.zshrc`, add:
```sh
plugins=(
  ...
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

## Install ROS2-Humble
ROS2 humble can be installed following [official-docs], use
```sh
sudo apt install ros-humble-desktop-full
```
This makes `gazebo11` installed as well.
And don't forget
```sh
sudo apt install ros-dev-tools
```
Config `zshrc`
```sh
echo "source /opt/ros/humble/setup.zsh" >> .zshrc
echo "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.zshrc
echo "export _colcon_cd_root=/opt/ros/humble/" >> ~/.zshrc
```
Config `rosdep`
```sh
sudo rosdep init
sudo rosdep update
```
Some useful packages:
```sh
sudo apt-get install ros-humble-rqt-tf-tree
sudo apt install ros-humble-gazebo-ros-pkgs
```

## Install `ros2_control`
`ros2_control` is used in many parts of tinker such as chassis or arm:
```sh
sudo apt-get install ros-humble-ros2-control
sudo apt-get install ros-humble-ros2-controllers
sudo apt-get install ros-humble-gazebo-ros2-control
```