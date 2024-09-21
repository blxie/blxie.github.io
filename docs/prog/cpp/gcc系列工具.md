# gcc

> gcc生成动态库、静态库，链接动态库、静态库的命令分别是
>
> - [Linux下静态库和动态库简介及示例](https://qianngchn.github.io/wiki/9.html)

在 GCC 中，你可以使用不同的命令来生成动态库和静态库，以及链接这些库。以下是相关的命令：

### 生成动态库（Shared Library）：

使用 `-shared` 选项生成动态库，例如：

```
gcc -shared -o libexample.so example.c
```

这会将 `example.c` 编译为一个动态库文件 `libexample.so`。

### 生成静态库（Static Library）：

使用 `ar` 命令生成静态库，例如：

```
gcc -c example.c
ar rcs libexample.a example.o
```

这会将 `example.c` 编译为目标文件 `example.o`，然后使用 `ar` 命令将目标文件打包为静态库文件 `libexample.a`。

### 链接动态库：

在链接阶段，使用 `-l` 选项指定要链接的动态库，例如：

```
gcc -o myprogram main.c -L/path/to/library -lexample
```

这会链接 `libexample.so` 动态库到 `myprogram` 可执行文件中。

### 链接静态库：

在链接阶段，可以直接指定静态库文件，例如：

```
gcc -o myprogram main.c /path/to/library/libexample.a
```

这会链接 `libexample.a` 静态库到 `myprogram` 可执行文件中。

在上述命令中：

- `-shared` 选项用于生成动态库。
- `-c` 选项用于只编译而不链接，生成目标文件。
- `ar rcs` 用于创建静态库，`ar` 是一个用于管理归档文件的工具。



# gdb

==注意：使用 cmake 构建的可执行程序无法通过 gdb 进行调试！！！必须通过 gcc 手动编译！==

gdb 中可以用 `!shell命令` 执行 shell 命令。



## 生成调试信息

生成具有调试信息的可执行文件（使用 cmake 构建的程序默认就具有可调式的功能），

```bash
gcc -g main.c -o main
```

> 没有参数 g，将无法拥有程序的函数名、变量名，所替代的全是运行时的内存地址。



## 启动 gdb

启动命令，

```bash
gdb 可执行文件名称
```



设置运行时参数，

```bash
set args	# 可指定运行时参数，如 set args 1 2 3
show args	# 查看设置的运行时参数
```



==启动程序==，

```bash
run		# 程序开始执行，如果有断点，停在第一个断点处
start	# 程序向下执行一行
```





## 显示源代码

list 命令，默认显示 10行，

```bash
list lineenum	# 打印 num-th 行的上下文内容
list func		# 显示函数名为 func 的源程序
list	# 显示当前行后面的源程序
list -	# 显示当前行前面的源程序
```

一般打印当前行的 上5 行 和 下5行，如果显示函数是 上2行 下8行，也可以指定显示的范围，

```bash
set linesize 自定义行数		# 设置一次显示源代码的行数
show linesize		# 打印当前的 linesize
```





## 断点调试（重点）

1）简单断点

```bash
用法：break/b 行数/函数名

b 10	# 在源程序第 10 行处设置断点，不太灵活，不推荐使用！
b func	# 在函数 func 的入口处停下
```





2）多文件设置断点

使用 命名空间 类似的访问方式进行操作，

```bash
b filename:linenum
b filename:function
b class::function/函数签名(func(type1, type2,...))
b namespace::class::function
```



3）查询所有断点

使用 info 命令，

```bash
用法：info/i break/b
```





## 条件断点

为断点设置条件，使用 `if` 关键字，后面跟断点条件，

```bash
用法：b test.c:8 if value==5
```

> - 这里 `if` 的条件语句的语法基本和 `C` 类似！
> - 条件设置的位置需要注意！





## 断点维护（删除、使无效……）

1）删除指定的断点

```bash
用法：delete/d [range...]
```

注意，

- 如果不指定断点号，表示删除所有的断点。`range` 表示要删除断点的范围，比如 `[3-7]`，表示删除 3-th ~ 7-th 的断点；
- 比删除更好的方式是使用下面的 ==禁用 disable== 该点，不会删除，仅仅使得失效，当还需要的时候，`enable` 即可！



2）禁用断点，使指定的断点失效

```bash
用法：disable/dis [range...]
```

如果什么都不指定，表示禁用所有的断点！

> 注意：这里的缩写的区别！



3）激活已失效的断点/启用断点

```bash
用法：enable/en [range...]
```

如果什么都不指定，启用所有的断点。



4）多断点管理

如果设置了多个断点，最好一步一步设置断点，不然之前的代码可能会在运行到我们想要的断点处停止；

解决方法有：

- 根据函数的入口参数设置条件断点
- 将某些断点禁用，然后需要的时候再开启，比较麻烦





## 调试代码（重点）

常用的命令，

```bash
run/r		# 运行程序

## 重点
next/n		# 单步跟踪，函数调用当作一条简单语句执行，无法进入调用对象内部
next 行数  # 从当前行继续往下执行指定的行数

step/s		# 单步跟踪，可进入函数内部

finish		# 退出进入的函数
until/u		# 在一个循环体内进行单步跟踪时，可以运行程序直到退出循环体
continue/c	# 继续运行程序，直到遇到下一个断点

quit/q		# 退出调试
```





## 数据查看（重点）

1）查看运行时数据

```bash
用法：print/p 变量名/表达式...
```





## 自动显示

可以自定义设置一些**自动显示的变量**，当程序**停止运行或单步跟踪**时，这些变量会自动显示，相关的命令为 `display`，具体用法如下，

```bash
display/d 变量名		# 设置要自动显示的变量
info display		# 显示已经设置自动显示的变量

undisplay num		# 取消 info display 中指定编号变量的自动显示。注意和删除、禁用进行区别！这种方式取消显示之后，无法再启用，相当于之后都不能恢复，而 disable 只是暂时禁用。慎用！！！

delete display [id1 id2 ...] [id1-id5]		# 删除自动显示，dnums 为所设置的自动显示的变量编号。如果要同时删除几个，便阿红可以用空格分隔，如果要删除指定范围内的编号，可以用连字符表示：2-5

disable display [id1 id2 ...] [id1-id5]
enable display [id1 id2 ...] [id1-id5]
```

> 注意，
>
> - disable 不删除自动显示的设置，只是暂时让其失效！
> - undisplay & delete 则是让其永久失效！！！





## 查看/修改变量的值

1）ptype 查看变量的类型

```bash
ptype 变量名		# 查看变量类型
print 变量名		# 打印变量的值
```



2）修改变量的值：`set var` 命令

```bash
set var 变量名=xxx		# 更改变量的值
```





## 查看调用流

在 GDB 中，你可以使用 `backtrace` 或其缩写形式 `bt` 命令来查看断点处的调用流程，也就是查看函数调用栈的状态。这将显示从断点位置开始的函数调用链，让你了解程序执行到达断点时的上下文。

以下是如何使用 `backtrace` 或 `bt` 命令来查看调用流程：

1. 首先，在 GDB 中设置断点或者在你希望查看调用流程的地方设置断点。假设你已经在某个位置设置了断点。

2. 运行程序直到达到断点位置。当程序在断点处停下来时，输入以下命令：

```shell
backtrace
```
或者使用缩写形式：

```shell
bt
```

GDB 将显示从断点位置开始的函数调用链，包括每个函数的名称、参数和返回地址。你可以从最顶部的调用开始，逐步向下查看调用流程。

如果你想查看特定深度的调用流程，你可以在命令后面加上一个数字，表示要查看的调用帧数。例如：

```shell
backtrace 5
```

这将显示前五个调用帧的信息。

通过查看调用流程，你可以深入了解程序在执行过程中是如何调用不同的函数的，以及函数之间的调用关系。



> 例子：不用设置断点，程序会自动在出错的地方停止，并不会结束运行！
>
> 然后通过 `backtrace` 命令就可以看到出错的具体原因的源头！！！

```bash
(gdb) run
(gdb) bt
#0  lept_parse_string (c=0x7fffffffdcb0, v=0x7fffffffdcf0) at /home/xbl/code/cpp/proj/c_json_parser/v0.3/leptjson.c:229
#1  0x0000555555555a01 in lept_parse_value (c=0x7fffffffdcb0, v=0x7fffffffdcf0) at /home/xbl/code/cpp/proj/c_json_parser/v0.3/leptjson.c:243
#2  0x0000555555555abb in lept_parse (v=0x7fffffffdcf0, json=0x55555555c50f "\"Hello\"") at /home/xbl/code/cpp/proj/c_json_parser/v0.3/leptjson.c:264
#3  0x0000555555559549 in test_parse_string () at /home/xbl/code/cpp/proj/c_json_parser/v0.3/test.c:164
#4  0x000055555555bc9d in test_parse () at /home/xbl/code/cpp/proj/c_json_parser/v0.3/test.c:280
#5  0x000055555555bd2b in main (argc=1, argv=0x7fffffffde68) at /home/xbl/code/cpp/proj/c_json_parser/v0.3/test.c:303
```



## 调试 core 文件

> - https://www.cnblogs.com/saneri/p/10280227.html
> - https://blog.csdn.net/wkd_007/article/details/79757289



访问非法内存，段错误，首先明确：64位下，指针占用 8字节！

> 提示：可以先使用 `valgrind a.out` 初步检查判断，



由于 shell 的限制，core 文件比较大，如果默认生成会占用较多资源，默认没有开启，需要手动开启！

core 不会自动生成，手动设置如下，

```shell
xbl@Blainet-PC-Acer:~$ ulimit -a
real-time non-blocking time  (microseconds, -R) unlimited
core file size              (blocks, -c) 0

xbl@Blainet-PC-Acer:~$ vim ~/.bashrc
## add unlimited settings
ulimit -c unlimited

xbl@Blainet-PC-Acer:~$ tail -1 ~/.bashrc
ulimit -c unlimited

xbl@Blainet-PC-Acer:~$ source ~/.bashrc
xbl@Blainet-PC-Acer:~$ 

## root账户下：修改 core 文件的保存路径和文件名格式
# 修改 root 密码：sudo passwd root; whoami
su root
# 设置保存在执行的路径下，如果要指定路径，直接指定即可
echo "core.%e.%p" > /proc/sys/kernel/core_pattern
cat /proc/sys/kernel/core_pattern

## 启用调试模式
g++-11 -g # 不加 g 也可以，默认带 gdb 调试
# 注意这里的调试方式：gdb 可执行文件 core文件
gdb a.out core...
```



注意：ulimit 设置只是在当前 shell 生效，打开一个新的连接不会生效；

为了使得每次打开不用重新配置，将该命令添加到 `~/.bashrc` 中，自动加载！





## 调试正在运行的程序









## 总结

> **注意事项**

- **所有的缩写最好不要使用最小的简写，写前面 3 个缩写最为合适！**
- ==使用 cmake 构建的可执行程序无法通过 gdb 进行调试！！！必须通过 gcc 手动编译！==



> **操作流程**

1）使用 gdb 运行可执行程序

2）设置断点

```bash
###########
# 1. 设置断点：优先通过函数名设置（无重名函数的情况下），反之，使用 fileanme:行号 可能更快定位
break/b xxx.c:行号

# 如果有重名函数，通过 fileanme:funcname/namespace::class::funcname 来限定访问
b 函数名  # 无重名函数的情况下更实用

info break ~ info b

###########
# 2. 运行调试，一般都是直接 run
run

# 查看断点前后的程序 list
list

# 查看参数/变量/表达式信息
p/print 变量/表达式
ptype 变量/表达式  # 查看变量的类型
# 以十进制格式打印枚举值的整数值，使用 p /d 来指定打印格式
# 同理，/o /x 分别表示 8进制 和 16进制
p /d 枚举变量名

# 跟踪变量
display 变量名  # 注意：这个变量必须在设置时的作用域内可见

###########
# 3. 单步调试，step 和 next 结合使用
# 如果要进入，使用 step，否则直接使用 next
s/n
next 行数  # 从当前行继续往下执行指定的行数

# 继续运行
c/continue
```







# Makefile



## 自动变量

`$@` 表示规则中的目标

`$<` 表示规则中的第一个条件

`$^` 表示规则中的所有条件，组成一个列表，以空格隔开，如果这个列表中有重复的项，则消除重复项





## 函数

最常用的两个函数，

1）`wildcard` 查找指定目录下的指定类型的文件

2）`patsubst` 匹配替换，

以上两个函数通常结合在一起使用，

```makefile
SRC=$(wildcard *.c)  # 找到当前目录下，所有 .c 为后缀的文件，赋值给 src
OBJS=$(patsubst %.c, %.o, $(src))  # 把 src 中所有后缀为 .c 的文件替换为 .o
```



在 Makefile 中，所有的函数都有返回值。

Makefile 的第四个版本，

```makefile
# 编译器和编译选项
CC = gcc
CFLAGS = -Wall -g

# 目标文件和依赖关系
TARGET = test
SRCS = $(wildcard *.c)  # 获取所有的 .c 文件
OBJS = $(SRCS:.c=.o)    # 将 .c 文件扩展名替换为 .o 文件扩展名
# OBJS=$(patsubst %.c, %.o, $(src))  # 把 src 中所有后缀为 .c 的文件替换为 .o

# 默认目标
all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

# 生成目标文件规则
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# 清理生成的文件
.PHONY: clean  # 将 clean 声明为一个伪目标
clean:
	rm -f $(OBJS) $(TARGET)
    clear
```



示例，

```makefile
# 编译器和编译选项
CC = gcc
CFLAGS = -Wall -g

# 目标文件和依赖关系
TARGET = test
SRCS = $(wildcard *.c)  # 获取所有的 .c 文件
SRCS = $(wildcard $(shell pwd)/v0.2_upgrade/*.c)  # 获取指定路径下的所有 .c 文件，覆盖上面
OBJS = $(SRCS:.c=.o)    # 将 .c 文件扩展名替换为 .o 文件扩展名
# OBJS=$(patsubst %.c, %.o, $(src))  # 把 src 中所有后缀为 .c 的文件替换为 .o

# 默认目标
all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

# 生成目标文件规则
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# 清理生成的文件
.PHONY: clean  # 将 clean 声明为一个伪目标
clean:
	rm -f $(OBJS) $(TARGET)
    clear
```

根据情况看是否要将 clean 中的 `$(TARGET)` 删除！

```bash
-n, --just-print, --dry-run, --recon
            Print the commands that would be executed, but do not execute them (except in certain circumstances).
            
# 因此，一般执行 make 之前，可以通过 -n 参数查看具体的指令
make -n
```



> Makefile 忽略指定文件夹下的指定文件

```makefile
FILES := $(wildcard $(shell PATH)/src/*.cc)
SRC_FILES += $(filter-out $(PATH)/src/a.cc $(PATH)/src/b.cc, $(FILES))
```





## CMakelists.txt

样例，

```makefile
cmake_minimum_required(VERSION 3.0.0)
project(leptjson_test VERSION 0.1.0 LANGUAGES C)

# include(CTest)
# enable_testing()

add_library(leptjson leptjson.c)

add_executable(leptjson_test test.c)

target_link_libraries(leptjson_test leptjson)

# set(CPACK_PROJECT_NAME ${PROJECT_NAME})
# set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
# include(CPack)

```



