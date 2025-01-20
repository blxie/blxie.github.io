---
title: "Terminal"
subtitle: ""
date: 2025-01-20T23:08:06+08:00
lastmod: 2025-01-20T23:08:06+08:00
draft: false
authors: []
description: "useful terminal tools"

tags: ["terminal", "tools", "zsh", "shell"]
categories: ["Example"]
series: [how-to-term]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---

## zsh

> - [Tmux 使用教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/10/tmux.html#tmux%20%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)

在 `~/.bashrc` 中添加以下配置，

```bash
## for history
export HISTTIMEFORMAT="%d/%m/%y %T "
shopt -s histappend
export PROMPT_COMMAND="history -a; history -n"
## for tmux
alias tn='tmux new -s'
alias tl='tmux ls'
alias td='tmux detach'
alias ta='tmux attach -t'
alias tk='tmux kill-session -t'
```

然后就可以直接使用，

```bash
tnew 新的终端会话名
ta 终端会话名
```

直接关闭终端也会保持在后台运行，通常使用快捷键，注意不要使用 `Ctrl C`，否则会直接退出！！！
