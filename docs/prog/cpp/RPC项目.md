## 2. 前置准备

### 2.1 环境搭建

(1) 开发环境：Linux 系统

(2) 开发工具：VS Code 远程连接



### 2.2 依赖库的安装

项目前置依赖的库有，

- protobuf
- tiny xml

接下来先在 Linux 系统上安装好依赖库，方便后续的开发。

#### 2.2.1 protobuf 安装

> - [Linux下protobuf保姆级安装教程_linux安装proto-CSDN博客](https://blog.csdn.net/qq_42265552/article/details/130319999)

先运行 `./autogen.sh` 生成 `configure` 文件！

```bash
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.19.5/protobuf-cpp-3.19.5.tar.gz

./configure --prefix=/usr/local
make -j4
sudo make install

## 刷新
sudo ldconfig
export LD_LIBRARY_PATH=/usr/local/lib

protoc --version
```

注意是 `protobuf-cpp` CPP 版本！！！



---

版本：推荐使用 `>=3.19.4`，

安装过程：

（1）首先需要安装 `bazel`：https://bazel.build/install/ubuntu?hl=zh-cn

使用二进制脚本文件安装（apt 无法进行安装，其他方式也不太行），

```bash
# 安装 bazel 的依赖包
sudo apt update
sudo apt install g++ unzip zip
sudo apt-get install default-jdk

wget https://github.com/bazelbuild/bazel/releases/download/6.3.2/bazel-6.3.2-installer-linux-x86_64.sh

## 测试是否可以连 google
curl -I www.google.com --connect-timeout 6
# 将主机的 VPN 通过局域网共享给虚拟机，可直接使用网关进行共享
export https_proxy="192.168.56.1:10809"

chmod +x bazel-6.3.2-installer-linux-x86_64.sh
# 加上 --user 会安装在 ~/bin 目录下，需要 export 该路径到 $PATH
./bazel-6.3.2-installer-linux-x86_64.sh --user
# 安装在 /usr/local/bin 目录下，推荐这种方式安装
sudo ./bazel-6.3.2-installer-linux-x86_64.sh
```



（2）安装好 `bazel` 后，使用该工具对 `protobuf` 进行安装构建

按照官方教程根据不同版本不同的安装方法进行安装：https://github.com/protocolbuffers/protobuf/blob/v4.23.4/src/README.md

```bash
wget https://github.com/protocolbuffers/protobuf/archive/refs/tags/v4.23.4.tar.gz
tar -zxvf v4.23.4.tar.gz
cd ~/devenv/protobuf-4.23.4

## 比较耗时，耐心等待即可
bazel build :protoc :protobuf
sudo cp bazel-bin/protoc /usr/local/bin
```



（3）完成安装之后，头文件位于 `/usr/local/google` 目录下，库文件位于 `/usr/lib` 目录下。



#### 2.2.1 tiny xml 安装

> - https://sourceforge.net/projects/tinyxml/files/tinyxml/2.6.2/

```bash
wget https://sourceforge.net/projects/tinyxml/files/tinyxml/2.6.2/tinyxml_2_6_2.tar.gz/download
tar -zxvf download

## 修改 Makefile
OUTPUT := libtinyxml.a

make -j4
sudo cp libtinyxml.a /usr/local/lib
mkdir -p tmp/tinyxml
cp *.h tmp/tinyxml
sudo mv -f tmp/tinyxml /usr/include

## 需要修改后面项目中 LIB 的配置
LIBS += /usr/local/lib/libprotobuf.a	/usr/local/lib/libtinyxml.a
```





---

项目使用到了配置模块，使用 xml 格式的配置，需要安装 `libtinyxml` 解析 xml 文件，

由于 tinyxml1 停止维护，迁移至了 tinyxml2，本项目使用 tinyxml2：https://github.com/leethomason/tinyxml2

使用的使用直接包含这两个文件即可，

- tinyxml2.cpp
- tinyxml2.h
- xmltest.cpp：提供的使用 demo，测试样例



### 2.3 日志模块开发

首先创建项目的基础结构，

（1）日志模块

- 日志级别
- 打印到文件，支持日期命名，以及日志的滚动
- C 格式化风格，而非 C++ 中的流式风格（更加复杂）
- 线程安全



（2）日志支持的级别 `Loglevel`

用枚举类型实现，

- `DEBUG`
- `ERROR`
- `WARNING`
- `INFO`



（3）具体要打印的内容 `LogEvent`

封装为一个类，将要打印的内容存放在类的实例中，

- 文件名、行号
- 消息定位 `MsgNo`：标志每个 RPC 请求
- 进程号 `Process ID`
- 线程号 `Thread ID`
- 日期、时间（精确到毫秒）
- 自定义消息：日志中需要自定义打印的字符串，用于调试和维护



（4）要打印的日志的格式

```bash
[LogLevel][%y-%m-%d %H:%M:%s:%ms]\t[pid:tid]\t[file_name:line]\t[msg]
```



（5）具体的打印日志器 `Logger`

- 提供打印日志的方法
- 设置日志输出的路径

