---
last_update:
  date: 8/1/2024
  author: CabbageDog
---

# An Intro to `tmuxinator`

> You should be familiar with `tmux` before reading this. If not, read [this doc](/docs/Intro/tmux_get_started.md) first.

Most of the time, you perform the same sequence of commands to setup Tinker. In navigation, you always start chassis, then lidar, then odometry, etc. Before `tmux` is used. Tinker members use shell scripts to automate this procedure. Tmux templating library provides an easy way to automate running same commands in `tmux` as well as organizing them into specific layout.

There are many tmux templating library such as `tmuxp`, `teamocil`, `tmuxinator`... For Tinker, we use `tmuxinator` to make startup templates. It is easy to write and easy to read.

## Installation

For `ubuntu`, you can install tmuxinator via `apt`:

```sh
sudo apt install tmuxinator
```

For more info, check out [tmuxinator's github](https://github.com/tmuxinator/tmuxinator).

## Basic Commands

For `tmuxinator`, three commands is all you need! They are:

```sh
tmuxinator new <Project_name> # create project
tmuxinator edit <Project_name> # edit
tmuxinator <Project_name> # execute project
```

## `tmuxinator` Project

Don't be shocked by the name "Project". For user, `tmuxinator` project is nothing but a `.yaml` file! When you create a project named `navigation` by :

```sh
tmuxinator new navigation
```

It just creates a `navigation.yaml` in `~/.config/tmuxinator/`(try by yourself).

Now we introduce an example to help you understand how this works:

```yaml
# /home/tinker/.config/tmuxinator/navigation.yml

name: navigation # project name
root: ~/Projects/tk23_navigation # root path of this project, when you run this project, all sessions, windows and panes start from here

# Optional tmux socket
# socket_name: foo

# Note that the pre and post options have been deprecated and will be replaced by
# project hooks.

# Project hooks

# Runs on project start, always
# on_project_start: command

# Run on project start, the first time
# on_project_first_start: command

# Run on project start, after the first time
# on_project_restart: command

# Run on project exit ( detaching from tmux session )
# on_project_exit: command

# Run on project stop
# on_project_stop: command

# Runs in each window and pane before window/pane specific commands. Useful for setting up interpreter versions.
# pre_window: rbenv shell 2.0.0-p247

# Pass command line options to tmux. Useful for specifying a different tmux.conf.
# tmux_options: -f ~/.tmux.mac.conf

# Change the command to call tmux.  This can be used by derivatives/wrappers like byobu.
# tmux_command: byobu

# Specifies (by name or index) which window will be selected on project startup. If not set, the first window is used.
# startup_window: editor

# Specifies (by index) which pane of the specified window will be selected on project startup. If not set, the first pane is used.
# startup_pane: 1

# Controls whether the tmux session should be attached to automatically. Defaults to true.
# attach: false

windows: # all the windows you want to open, the children's keys are the window names
    - test1: # First window, named "test1"(Don't forget the colon)
        - . ./install/setup.zsh # The command you want to exec in this window
        - echo "Hello world" # Just shell commands 
    - test2: # Second window
        layout: main-vertical # Layout of this window, used when there are multiple panes 
         # Synchronize all panes of this window, can be enabled before or after the pane commands run.
        # 'before' represents legacy functionality and will be deprecated in a future release, in favour of 'after'
        # synchronize: after
        panes: # all the windows you want to open, don't forget the colon
            - teleop_pane: # First pane, named "teleop_pane"
                - . ./install.setup.zsh   
                - ros2 run teleop_twist_keyboard teleop_twist_keyboard # just normal 
            - navigation_pane:
                - . ./install/setup.zsh # better source in every pane
                - ros2 launch xxxx xxxx
```

### Layout Trick

Default layout is probably not good for our own use, so there is a trick to set the layout as we want:

1. First open `tmux` and create panes you needed, then adjust the pane to the layout you want using mouse or commands.
2. Display the current layout by `tmux list-windows`
3. Copy this layout, e.g. `layout dfdc,190x46,0,0{95x46,0,0,1,94x46,96,0,2}`
4. Paste this layout to the project yaml.

> You may find it hard to copy-paste in `tmux`, look at troubleshooting.

## Trouble Shooting

### Copy-Paste

In `tmux`, `ctrl + shift + c` can not copy content. For some configs, you can not even select the content. The solution of mine is to enable mouse in tmux config then use `tmux-yank` plugin. 

To install `tmux-yank` and other useful plugin, I recommend using `TPM`. The usage of `TPM` can be found in [its github](https://github.com/tmux-plugins/tpm). You can install [`tmux-yank`](https://github.com/tmux-plugins/tmux-yank?tab=readme-ov-file) via `TPM`.

After you installed `tmux-yank`, you need to exit your tmux server to make it work. When you want to copy something, you can use mouse to select the content, then press `y` before you release you mouse and the content you selected will be in you clipboard.