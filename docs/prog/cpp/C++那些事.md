## Linux 下 C++ 开发

> - [Light-City/CPlusPlusThings: C++那些事](https://github.com/Light-City/CPlusPlusThings) 基础教程
> - [linux下使用g++编译cpp工程 - BattleScars - 博客园](https://www.cnblogs.com/battlescars/p/cpp_linux_gcc.html)

### C++ 那些事之

#### `const`

> 2023/02/12 ~ 2023/02/14，共花 2天 完成

demo01, 测试 `const`

```cpp
#include <iostream>

using namespace std;

int main() {
    const int *ptr;
    int val = 6;

    ptr = &val;
    int *ptr1 = (int *)ptr;
    *ptr1 += 6;

    cout << "*ptr: " << *ptr << "\n*ptr1: " << *ptr1 << endl;

    return 0;
}
```

编译运行

```shell
g++ test.cpp -o test.o
g++ test.o(或者其他一些相关的 `.o` 文件，链接起来) -o main
# 或者一步到位：针对单个文件时
g++ test.cpp -o main
./main
```



主要是看 `const` 限定词修饰的是整体还是局部，==把类型修饰删除即可看到是 常量指针/指针常量==  

-  整体：`const 类型* 变量名...`
- 局部：`类型* const 变量名/指针/地址`



> - [c++　在函数后加const的意义：_qq_32739503的博客-CSDN博客_函数后加const](https://blog.csdn.net/qq_32739503/article/details/83341222)

**c++ 函数前面和后面 使用const 的作用，**

- 前面使用const 表示返回值为const
- 后面加 const表示函数不可以修改class的成员



#### `static`

> 2023/02/14 ~ 2023/02/15，共花 1 天



> - [C/C++：内存分配，详解内存分布（P：图解及代码示例）_AngelDg的博客-CSDN博客_c++ 内存示意图](https://blog.csdn.net/AngelDg/article/details/104871782)
> - [[c++11]静态成员在类中的初始化总结(static，static const，static constexpr)_类的静态成员初始化位置_快乐是唯一目的的博客-CSDN博客](https://blog.csdn.net/qq_50868258/article/details/123139071)



测试，

```cpp
#include <iostream>
using namespace std;

class Apple{
public:
    static int i;

    Apple() {

    };
};

int main() {
    Apple obj1;
    Apple obj2;

    obj1.i = 1;
    obj2.i = 2;

    cout << obj1.i << " " << obj2.i << endl;

    return 0;
} 
```

多个对象共享同一个 `static` 属性，因此 `static` 属性不能放在类的构造函数中，只能够单独进行初始化！

```cpp
#include <iostream>
using namespace std;

class Apple{
public:
    static int i;  // 此处只进行声明（即未赋初始值，static 的默认初始值为 0）

    Apple() {

    };
};

int Apple::i = 666;  // 注意在此处对 static属性 单独进行初始化，而不是放在构造函数当中！

int main() {
    Apple obj1;
    Apple obj2;

    // obj1.i = 1;
    // obj2.i = 2;

    cout << obj1.i << " " << obj2.i << endl;

    return 0;
}
```



```cpp
#include <iostream>
using namespace std;

class Apple{
public:
    static const int i = 888;  // 如果这里初始化了，后面就不能再次进行初始化！

    Apple() {

    };
};

const int Apple::i = 666;

int main() {
    Apple obj1;
    Apple obj2;

    // obj1.i = 1;
    // obj2.i = 2;

    cout << obj1.i << " " << obj2.i << endl;

    return 0;
}
```

```shell
(base) guest@guest-server:~/XieBailian/cpp$ g++ -o main static.cpp
static.cpp:13:18: error: duplicate initialization of ‘Apple::i’
   13 | const int Apple::i = 666;
      |                  ^
(base) guest@guest-server:~/XieBailian/cpp$
```



静态成员，

- 类的静态函数
- 静态类对象

限定访问范围，

```cpp
// source1.cpp
extern void sayHello();
static const char* msg = "Hello, world!\n";

int main() {
    sayHello();

    return 0;
}

// source2.cpp
#include <cstdio>
#include <iostream>
using namespace std;

extern char* msg;

void sayHello() {
    printf("%s", msg);                                                                                       cout << *msg << endl;
}
```

source2.cpp 中无法访问 source1.cpp 中的 static 成员，

```bash
/usr/bin/ld: /tmp/ccTVqrgk.o: in function `sayHello()':
source2.cpp:(.text+0xb): undefined reference to `msg'
/usr/bin/ld: source2.cpp:(.text+0x26): undefined reference to `msg'
collect2: error: ld returned 1 exit status

shell returned 1
```



