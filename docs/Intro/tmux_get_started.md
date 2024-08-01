---
last_update:
  date: 7/31/2024
  author: CabbageDog
---

# Tmux Get Started

This blog aims to provide the basic usage tutorial for `tmux` use. 

To make tinker move, navigate, see, speak or grasp, more than one processes need to be executed. For a task like `Receptionist`, tens of tabs will make it hard to check terminal log to see which part fails. Besides, due to the remote development need, we want to see all parts status from different terminals without setting up lots of `ssh` connections. 

`tmux`(for "Terminal MUltipleXer") is a multiplexer for terminal. If you ever learned about digital circuits then you should know the function of a "multiplexer". A multiplexer combines multiple outputs into one output. What `tmux` do is to combine multiple "pseudo-terminal" outputs and put them into one terminal so you can run many tasks in one terminal.

`tmux` allows me to create any number of terminals from a single screen and group them. Compared with tabs, they are more organized and easy to manage. You can "attach" some "terminals" you're working on and "detach" those you don't need temporarily.

To install `tmux`, just

```sh
sudo apt install tmux
```

## `tmux`: Basic Concepts

From a "Top-Down" perspective, `tmux` has a "Server-Session-Window-Pane" structure. The following content will introduce these parts in order.

### Server

> This part is rarely used so you can just skip it.

The first thing you use tmux is type it in your terminal:

```sh
tmux
```

After this. `tmux` creates a new server instance and setup the whole ecosystem that you will interact with. Tmux server is what runs in the background while Tmux client runs in the foreground. For most of time, we don't need to create more than one server. All your actions of creating new windows and panes are handled by this server. And also there is no need to tell which Tmux server you're interacting with. 

If you do have the need to create more servers, you just type

```sh
tmux -L my_server
```

in the regular terminal to create your own Tmux server named "my_server". Since you created more servers apart from the default one, you need to tell the terminal which server you're interacting with, this is done by inserting `-L <your_server_name>` before the common command:

```sh
tmux -L my_server ls
tmux -L my_server attach -t xxx
tmux -L my_server <your_command>
```

### Session

A Tmux session is a collection of pseudo-terminals. Run 

```sh
tmux
```

Your will see the changes of your terminal and you are now in a Tmux session.

The wonderful thing about Tmux session is that you can "attach" and "detach" it at any time you like. When you "attach" a Tmux session, you can see all pseudo-terminals in this sessions and the processes in this session now run happily. When you "detach" this session, the world of this session runs in the background. And when you "attach" this session again, the processes in this session run just like you never leaved!

Now detach the session you just attached: (Yes, the proceeding operation creates a session and attaches it in the meantime), you can use keyboard shortcut:

```sh
activate_key + d
```

You may ask: what is activate_key?

The activate_key is just like leader key in `vim`, you type a specified key to tell terminal:"Hey, I'm typing a tmux command now!". The default activate_key for `tmux` is the combination of `Ctrl + b`. In this case, `activate_key + d` means holding Ctrl, then press b, then release them, then quickly press the letter d. Later, you'll learn how to change the prefix key from Ctrl + b to any key you want.

If you do it correctly, you should be taken out of the tmux session back to the original terminal.

When you're detaching from a session, any process running in that session is not terminated. It's still running. You just don't see it. Think of it like a background job. You can also use command to detach:

```sh
tmux detach
```

> Most of operations in `tmux` can be realized both by keyboard shortcuts and commands. The following of content may only introduce one of them, but you can use `man` to check the other.

Now attach back:

```sh
tmux attach
```

#### Multiple Sessions

With Tmux, you can liberally generate as many sessions as you need. To generate more sessions, you first need to be on the regular terminal (not inside a session). Then create a session named "navigation":

```sh
tmux new -s navigation
```

You can use the shortcut

```sh
activate_key + s
```

to see all sessions now.

Now detach from the `navigation` session. Since you have two sessions now, you should give the target session name if you want to attach:

```sh
tmux attach -t navigation
```

#### Kill a Session

To kill a session, just 

```sh
tmux kill-session -t navigation
```

### Windows

In the proceeding, you may wonder where "pseudo-terminals" are since a session seems to be just one terminal. Now we will make a session contain multiple "windows". 

Tmux windows are subsets of tmux sessions.  When you're creating a new tmux session, what you're seeing is technically a tmux window(Really?). Each terminal activity happens inside a window, you can have a window dedicated for running your chassis controller, another window for lidar, and another window for mapping, etc.

Tmux windows have the similar operations with sessions:

- Create
  
  ```sh
  activate_key + c # shortcut
  ```

- Switch

    ```sh
    activate_key + n # next windows
    activate_key + p # previous window
    activate_key + N # N-th window(N < 10)
    activate_key + ' + N # N-th window (N > 10)
    ```

- List
  
  ```sh
  activate_key + w # List all the windows in all sessions
  ```

- Rename
  
  ```sh
  activate_key + , 
  ```

- Delete 

    ```sh
    tmux kill-windows -t <window_name>
    ```

### Panes

Earlier I said that when you started a new session, what you saw was a tmux window. That's wrong. What you saw was actually a tmux pane inside a tmux window inside a tmux session. When you started a new session, tmux automatically created a new window. When a new window was created, tmux generated a new pane. Just like how a tmux session has at least one window, a tmux window always contains at least one tmux pane. Now that we've been exposed to sessions, windows, and panes, let's get the terminology straight. A tmux session is a container of tmux windows. A tmux window is a container of tmux panes.

The operations are similar:

- Create
  
  ```sh
  activate_key + % # split a window horizontally
  activate_key + " # vertically
  ```

- Switch

    ```sh
    activate_key + o # next windows
    activate_key + Up/Down/Left/Right # use arrow key
    activate_key + q + N # N-th window(N < 10)
    ```

- Delete 

    ```sh
    activate_key + x # or
    Ctrl + d # No activate key!
    ```

- Zoom
    Zoom will zoom your current pane into 100% and hide the other panes, you can see a pane is zoomed from sessions bar with a "Z" behind the session name.

    ```sh
    activate_key + z 
    ```

- Layouts
    Tmux layouts are pane arrangements to organize your panes in a window. Tmux comes with five ready-to-use layouts. You can try by yourself.
    - even-horizontal
    - even-vertical
    - main-horizontal
    - main-vertical
    - tiled
    
    ```sh
    tmux select-layout <layout_name>
    ```

## Customizing tmux

You can modify tmux keys with the tmux config file. When you launch tmux, it looks for a file named `.tmux.conf` in the `HOME` path. If there is no one, just create it. Every time you change `.tmux.conf`, you need to source it:

```sh
tmux source-file ~/.tmux.conf
```

Some configs won't take place even after you reload the config file. Usually these are the UI-related commands. If you don't see your changes after reloading the tmux config, you need to restart the tmux server.

Here are some common settings:

### Quick Source

```sh
bind r source-file ~/.tmux.conf \; display "Tmux Config Reloaded!"
```

This allows you to quick source using `activate_key + r`

> Bind key is used by `activate_key` plus the key you bind.

### Activate Key

I use `ctrl + u` as activate key:

```sh
unbind C-u
set -g prefix C-u
bind C-u send-prefix
```

### More Intuitive Split Commands

```sh
bind-key "|" split-window -h -c "#{pane_current_path}"
bind-key "\\" split-window -fh -c "#{pane_current_path}"

bind-key "-" split-window -v -c "#{pane_current_path}"
bind-key "_" split-window -fv -c "#{pane_current_path}"
```

This allows you to press either the upper-cased version of that key to get the vertical / horizontal splits.

### Mouse Usage

Tmux's default configs are not mouse friendly. To enable scrolling, clicking, and resizing, add the following inside the tmux config file:

```sh
set -g mouse on
```

### Increase History

By default, tmux keeps the previous 2000 lines of window history (you can scroll up 2000 lines above your current terminal line). Sometimes 2000 isn't enough. To increase it to 5000 lines, add this inside the config file:

```sh
set-option -g history-limit 5000
```

### Jump to a Marked Pane

For navigation, typically we have several panes, one of which is used to run a `teleop_keyboard` node and the others is for logging. You may need jump to the pane of teleop frequently. Here is a solution:

```sh
activate_key + m # Mark the pane you want to jump to
bind \` switch-client -t'{marked}' # Add this to config to use ` to jump
```

### Keeping Current Path

One stupid thing is that when you open a new terminal you are in the `HOME` directory instead of your ROS workspace so you always need a `cd`. Tmux can help you keep current path when open a new window:

```sh
bind c new-window -c "#{pane_current_path}"
```

## Conclusion

Now you've understand the basic usage of `tmux`, you can learn  [`tmuxinator`](/docs/Intro/tmuxinator_intro.md) to get yourself ready for the tmux automation.