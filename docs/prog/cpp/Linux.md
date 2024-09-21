# 常用命令（按照字母顺序排列）

## A

### `awk`



### `ar`



### `apt`



### `alias`



### `adduser`



### `addgroup`



### `arp`



## B

### `bash`



### `bg`



## C

### `cat`



### `cd`



### `chmod`



### `chown`



### `cut`







## D

### `df`



### `dir`



### `date`



### `dd`



### `diff`



### `dpkg`



### `du`



## E

### `echo`



### `env`



### `export`



### `exit`



## F

### `fg`

`fg +%num` 将 `jobs` 中运行在后台的程序移动到前台运行；



### `find`



### `file`



### `free`

free - Display amount of free and used memory in the system



### `ftp`



## G

### `grep`



### `groups`



### `grub-*`



### `gzip`



## H

### `help`



### `history`



### `host*`



## I

### `ifconfig`



### `info`



### `init`



### `ip`



### `iptables`





## J

### `jobs`

`jobs` 查看通过 `&` 在后台运行的程序，

`fg +%num` 将 `jobs` 中运行在后台的程序移动到前台运行；



### `journalctl`



### `json*`





## K

### `kill*`



## L

### `ldd`

查看链接的详细信息



### `less`



### `ll`



### `ln*`



### `log*`



### `ls*`



### `lvm*`



## M

### `man*`

> `man $num xxx`

- num=1，命令
- num=2，系统调用
- num=3，标准库
- num=4，……不重要



### `mkdir`



### `make`



### `mkfifo`



### `mkfs*` 



### `more`



### `mount*`



### `mv`



## N

### `nano`

所有的控制命令都是通过 `Ctrl + 字母` 实现！



### `nc`



### `netcat`



### `netstat`



### `nice`



### `nohup`



## O

### `objdump`



### `openssl`



## P

### `PS`

查看系统的进程，

- 命令参数加 `-` 不加的区别在于不同的 Linux 系统，BSD 系列不加，使用 `ps aux`，其他系列 `ps -ef`；

- 命令参数 `ps - ajx | grep bash`，在查看后台进程的时候用到过；

  ```shell
  xbl@Blainet-PC-Acer:~$ ps -ajx
   PPID   PID  PGID   SID TTY      TPGID STAT   UID   TIME COMMAND
      0     1     0     0 ?           -1 Sl       0   0:00 /init
      1  2793  2793  2793 ?           -1 Ss       0   0:00 /init
   2793  2794  2793  2793 ?           -1 S        0   0:00 /init
  ```

  - `PPID` 父进程号
  - `PID` 进程号
  - `PGID` 进程组号，进程组是否存在与创建该进程组的组长是否存在无关
  - `SID` 会话号（会长） > `PGID`（组长）
  - `TTY` 终端名称



### `passwd`



### `perror`



### `ping`



### `pkill`



### `pstree`



### `poweroff`



### `pslog`



### `pwd`



## Q

### `quote`



## R

### `reboot`



### `rmdir`



### `rsync`



### `read`



## S

### `stat`

查看文件的详细信息。



### `size`

查看文件的 `ELF` 的信息，

```bash
blainet@devpltus:~/workspace/cpp$ size a.out 
   text    data     bss     dec     hex filename
   4452     760     576    5788    169c a.out
```



### `su*`



### `systemctl`



### `systemd*`



### `scp`



### `savelog`



### `sed`

```bash
sed 'vim中的匹配模式，只是需要转义' file_path | cut -f第几列 | 操作，比如 sort [-n，表示按照数字，不指定默认按照字符串排序] [-r，逆序排列]
```





### `set`



### `service`



### `sh`



### `ssh*`



### `source`



### `shutdown`



### `sleep`



### `screendump`





## T

### `top`



### `tail`



### `tar`



### `time*`



### `touch`

- 文件不存在 > 创建
- 文件存在 > 更新时间戳



### `tr`



### `tcpdump`



### `tty`

查看当前终端的名字。



## U

### `ulimit`



### `uname`



### `user*`



### `umount`



### `ufw`



### `ubuntu-*`



### `until`



### `un*`



### `update-*`



## V

### `valgrind`

```bash
sudo apt update -y && sudo apt install valgrind
```

内存泄漏检测工具，



### `vim`

配置文件，

```bash
sudo vim /etc/vim/vimrc

set tabstop=4
set autoindent
set shiftwidth=4
set expandtab
set number
set formatoptions-=acro  # 禁止自动换行
```



#### 编辑

- CTRL N/P 输入提示
- 光标移动到行首：0
- 快速跳转到上一次光标所在位置：按两次``
- 光标快速移动到行尾：$
- 光标快速跳过空白字符，直到下一个非空白字符前：^
  - 删除当前光标之前的所有空白字符：0 跳转到行首，d^ 删除空白字符
- 单词跳转命令：在这些命令前面加上一个数字，例如 `2w` 将光标向前跳转两个单词
  - `w`：将光标移动到下一个单词的开头
  - `e`：将光标移动到当前单词的末尾
  - `b`：将光标移动到前一个单词的开头
- %：快速跳转到与之匹配的括号



#### 辅助

-  w 保存并退出



### `view`



### `visudo`

修改 `/etc/sudo/sudoers`，





## W

### `watch`



### `wc`



### `wget`



### `wait`



### `[what|where]is`



### `which`



### `who[ami]`



### `write`



## X

### `xargs`



### `xauth`



### `xz*`



## Y

### `yes`



## Z

### `z*`





