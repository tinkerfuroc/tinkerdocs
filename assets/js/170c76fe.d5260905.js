"use strict";(self.webpackChunktinker_wiki=self.webpackChunktinker_wiki||[]).push([[6856],{3272:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var o=n(4848),t=n(8453);const i={last_update:{date:"5/26/2024",author:"CabbageDog"}},l="Tinker New PC Setup",c={id:"Intro/Tinker_new_pc_get_started",title:"Tinker New PC Setup",description:"This Document aims to provide the steps to set up a PC for Tinker developing, which can also be used to setup the relevant  dependencies for ROS2 Humble on Ubuntu 22.04.",source:"@site/docs/Intro/Tinker_new_pc_get_started.md",sourceDirName:"Intro",slug:"/Intro/Tinker_new_pc_get_started",permalink:"/tinkerdocs/docs/Intro/Tinker_new_pc_get_started",draft:!1,unlisted:!1,editUrl:"https://github.com/tinkerfuroc/tinkerdocs/docs/Intro/Tinker_new_pc_get_started.md",tags:[],version:"current",lastUpdatedBy:"CabbageDog",lastUpdatedAt:17166816e5,frontMatter:{last_update:{date:"5/26/2024",author:"CabbageDog"}},sidebar:"tutorialSidebar",previous:{title:"ROS\u7b80\u6613\u6559\u7a0b",permalink:"/tinkerdocs/docs/Intro/ROS\u7b80\u6613\u6559\u7a0b"},next:{title:"API Documentation Template for submodules",permalink:"/tinkerdocs/docs/Intro/country"}},r={},d=[{value:"System Requirements",id:"system-requirements",level:2},{value:"Basic Software Installation",id:"basic-software-installation",level:2},{value:"Basic Commands Installation",id:"basic-commands-installation",level:2},{value:"Config <code>git</code>",id:"config-git",level:4},{value:"Config <code>zsh</code> (Optional)",id:"config-zsh-optional",level:2},{value:"Config <code>oh-my-zsh</code> and <code>powerlevel10k</code>",id:"config-oh-my-zsh-and-powerlevel10k",level:3},{value:"Install ROS2-Humble",id:"install-ros2-humble",level:2},{value:"Install <code>ros2_control</code>",id:"install-ros2_control",level:2}];function a(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h1,{id:"tinker-new-pc-setup",children:"Tinker New PC Setup"}),"\n",(0,o.jsx)(s.p,{children:"This Document aims to provide the steps to set up a PC for Tinker developing, which can also be used to setup the relevant  dependencies for ROS2 Humble on Ubuntu 22.04."}),"\n",(0,o.jsx)(s.h2,{id:"system-requirements",children:"System Requirements"}),"\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.code,{children:"Ubuntu 22.04 Desktop"})}),"\n",(0,o.jsx)(s.h2,{id:"basic-software-installation",children:"Basic Software Installation"}),"\n",(0,o.jsxs)(s.p,{children:["Download ",(0,o.jsx)(s.code,{children:".deb"})," package of ",(0,o.jsx)(s.code,{children:"chrome"}),", ",(0,o.jsx)(s.code,{children:"vs code"})," from the official site"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo dpkg -i <xxx>.deb\n"})}),"\n",(0,o.jsx)(s.h2,{id:"basic-commands-installation",children:"Basic Commands Installation"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt update\nsudo apt upgrade\nsudo apt-get install git vim curl htop\n"})}),"\n",(0,o.jsxs)(s.h4,{id:"config-git",children:["Config ",(0,o.jsx)(s.code,{children:"git"})]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:'git config --global user.name "YOUR_NAME"\ngit config --global user.email "YOUR_EMAIL"\n# Generate ssh key\nssh-keygen -t ed25519 -C "your_email@example.com"\n'})}),"\n",(0,o.jsxs)(s.p,{children:["Then add the key to github, see ",(0,o.jsx)(s.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account",children:"ref"})]}),"\n",(0,o.jsxs)(s.h2,{id:"config-zsh-optional",children:["Config ",(0,o.jsx)(s.code,{children:"zsh"})," (Optional)"]}),"\n",(0,o.jsxs)(s.p,{children:["Since many scripts are based on ",(0,o.jsx)(s.code,{children:"zsh"}),", it is recommended to config ",(0,o.jsx)(s.code,{children:"zsh"}),":"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt-get install zsh\nsudo vim /etc/passwd\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Change then end of the line started with your username ",(0,o.jsx)(s.code,{children:"/bin/bash"})," to ",(0,o.jsx)(s.code,{children:"/bin/zsh"})]}),"\n",(0,o.jsxs)(s.h3,{id:"config-oh-my-zsh-and-powerlevel10k",children:["Config ",(0,o.jsx)(s.code,{children:"oh-my-zsh"})," and ",(0,o.jsx)(s.code,{children:"powerlevel10k"})]}),"\n",(0,o.jsxs)(s.p,{children:["Use ",(0,o.jsx)(s.code,{children:"oh-my-zsh"})," to customize ",(0,o.jsx)(s.code,{children:"zsh"}),":",(0,o.jsx)(s.a,{href:"https://ohmyz.sh/",children:"oh-my-zsh"})]}),"\n",(0,o.jsxs)(s.p,{children:["Use ",(0,o.jsx)(s.code,{children:"powerlevel10k"}),": ",(0,o.jsx)(s.a,{href:"https://github.com/romkatv/powerlevel10k",children:"powerlevel10k"})]}),"\n",(0,o.jsxs)(s.blockquote,{children:["\n",(0,o.jsxs)(s.p,{children:["Attention: powerlevel works best using its fonts, so don't forget install the fonts and apply them in the profile of zsh\nConfig ",(0,o.jsx)(s.code,{children:"auto_suggestion"})," and ",(0,o.jsx)(s.code,{children:"syntax-highlighting"})]}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions\nsudo git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Edit ",(0,o.jsx)(s.code,{children:".zshrc"}),", add:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"plugins=(\n  ...\n  zsh-autosuggestions\n  zsh-syntax-highlighting\n)\n"})}),"\n",(0,o.jsx)(s.h2,{id:"install-ros2-humble",children:"Install ROS2-Humble"}),"\n",(0,o.jsx)(s.p,{children:"ROS2 humble can be installed following [official-docs], use"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt install ros-humble-desktop-full\n"})}),"\n",(0,o.jsxs)(s.p,{children:["This makes ",(0,o.jsx)(s.code,{children:"gazebo11"})," installed as well.\nAnd don't forget"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt install ros-dev-tools\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Config ",(0,o.jsx)(s.code,{children:"zshrc"})]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:'echo "source /opt/ros/humble/setup.zsh" >> .zshrc\necho "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.zshrc\necho "export _colcon_cd_root=/opt/ros/humble/" >> ~/.zshrc\n'})}),"\n",(0,o.jsxs)(s.p,{children:["Config ",(0,o.jsx)(s.code,{children:"rosdep"})]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo rosdep init\nsudo rosdep update\n"})}),"\n",(0,o.jsx)(s.p,{children:"Some useful packages:"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt-get install ros-humble-rqt-tf-tree\nsudo apt install ros-humble-gazebo-ros-pkgs\n"})}),"\n",(0,o.jsxs)(s.h2,{id:"install-ros2_control",children:["Install ",(0,o.jsx)(s.code,{children:"ros2_control"})]}),"\n",(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:"ros2_control"})," is used in many parts of tinker such as chassis or arm:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"sudo apt-get install ros-humble-ros2-control\nsudo apt-get install ros-humble-ros2-controllers\nsudo apt-get install ros-humble-gazebo-ros2-control\nsudo apt install ros-humble-joint-state-publisher\n"})})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>c});var o=n(6540);const t={},i=o.createContext(t);function l(e){const s=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),o.createElement(i.Provider,{value:s},e.children)}}}]);