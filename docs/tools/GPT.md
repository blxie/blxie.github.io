# 搭建

查看 vps 是否可以访问 chatgpt：[missuo/OpenAI-Checker: Used to check if your IP can access OpenAI services. (github.com)](https://github.com/missuo/OpenAI-Checker)

```bash
bash <(curl -Ls https://cdn.jsdelivr.net/gh/missuo/OpenAI-Checker/openai.sh)
```



## docker 搭建 ChatGPT

最新：[多种方法部署Pandora，让ChatGPT更好用 - 哔哩哔哩](https://www.bilibili.com/read/cv23973925/)

[How to solve “docker: Error response from daemon … iptables failed” | by Authmane Terki | Medium](https://authmane512.medium.com/how-to-solve-docker-error-response-from-daemon-iptables-failed-e703d991e528)

```bash
sudo systemctl restart docker
```



[停止、删除所有的docker容器和镜像](https://colobu.com/2018/05/15/Stop-and-remove-all-docker-containers-and-images/)

[【docker】docker限制日志文件大小的方法+查看日志文件的方法 - Angel挤一挤 - 博客园](https://www.cnblogs.com/sxdcgaq8080/p/10689223.html)

```bash
docker ps -aq
docker images -aq
docker rm
docker rmi

## 设置日志大小
sudo vim /etc/docker/daemon.json
{
  "log-driver":"json-file",
  "log-opts": {"max-size":"500m", "max-file":"3"}
}
sudo systemctl daemon-reload
sudo systemctl restart docker
```



```bash
docker pull chenzhaoyu94/chatgpt-web
sudo docker run --name chatgpt-web -d -p 0.0.0.0:3002:3002 --env OPENAI_ACCESS_TOKEN=TODO chenzhaoyu94/chatgpt-web
```





> - https://github.com/zhile-io/pandora
> - 主要参考：https://zhuanlan.zhihu.com/p/633126507
> - 参考 nginx 配置文件即可：https://mgxray.xyz/395/
> - 密钥 [API keys - OpenAI API](https://platform.openai.com/account/api-keys)
>   - 翻译：

1.安装docker环境：

```bash
apt update && apt install docker.io -y
sudo apt update -y
sudo apt upgrade -y
sudo apt install docker.io -y
```



2.拉取pandora镜像

```bash
docker pull pengzhile/pandora
```



3.启动容器

这里设置的端口是8899，也可以自己改成其他端口

```bash
docker run  -e PANDORA_CLOUD=cloud -e PANDORA_SERVER=0.0.0.0:8899 -p 8899:8899 -d pengzhile/pandora
```



> （RackNerd 不需要这个操作！）需要注意的是 vultr 默认是关闭了8899端口的，需要手动打开，先安装firewalld
>
> ```bash
> apt install firewalld
> ```
>
> 然后打开你用到的端口
>
> ```bash
> firewall-cmd --zone=public --add-port=8899/tcp --permanent
> ```
>
> 这里以8899为例，如果你用的是其他端口就改成其他的，然后`reboot`重启服务器即可。



Access token可以在这里获得：http://chat.openai.com/api/auth/session

```bash
# 注意：没有证书默认是 http，不是 https！
https://107.174.181.186:8899/

token 每次不一样
```

之后在浏览器输入 `vps_ip:port` 就可以进入登录界面了，可以用账号密码登录，也可以使用token登录，登录之后可以保持14天。



## 绑定域名（太慢了，而且需要开启 VPN）

如果不想用ip访问，可以买一个域名，然后使用nginx反代。

1.安装nginx

```bash
apt install nginx -y
vim /etc/nginx/nginx.conf
systemctl restart nginx.service
```

2.设置反向代理

在`/etc/nginx/nginx.conf`里面的http里面加上

```bash
events {}


http {
    server {
    	listen 80;
    	server_name racknerd.blainet.top;
    	return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name racknerd.blainet.top;
        # ssl_certificate /etc/nginx/certs/cert.crt;
        ssl_certificate /root/cert/racknerd.blainet.top.cer;
        # ssl_certificate_key /etc/nginx/certs/private.key;
        ssl_certificate_key /root/cert/racknerd.blainet.top.key;
        location / {
          proxy_pass http://107.174.181.186:8899;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

然后就可以通过域名直接访问了。





# 使用

## 论文阅读

提示语句，

```
不许伪造，你知道就是知道，不知道就直接说不知道
你知道这篇论文吗：
如果我要你帮我分析这篇论文，并制作一个PPT汇报，你需要我给你提供哪些信息

从现在开始，我分段给你提供相关信息，你不用急于给我答案，直到我通知你“可以开始分析”这个命令时，你才能给我进行分析回答
这里稍微暂停下，请问 `CAD & CG` 指什么，怎么翻译
1. 论文标题：
论文作者：
实验室或机构：
2. 论文摘要：
直到我给你“开始分析”的指令时，你才能够进行分析，否者一直等待我的输入！


通过上述所有给你的资料，现在你开始给我分析这篇论文所提的方法

从现在开始，你是一个论文阅读分析专家，当我输入`论文`时，你只需要默默接收我的输入即可，等待我的下一步指令。直到我输入`分析`，你才能开始分析执行我的命令
```





## 辅助编程



```
从一个高级Python工程师的角度，帮助我分析优化代码，根据我的提示来完成任务，当我输入中包含“代码：”时，你就帮我进行分析，当我的输入中包含“优化：”时，你就给我按照你的分析进行优化

## 给予肯定，奖励机制！
你做的很好，就按照这样来继续辅助我

你这里有点不对……
你做得很好，只是后面日志记录中我更希望你能反映出是在哪一个函数哪里出了问题
很棒！后面就这样来做

```





### PyQT

界面编写，

```
用pyqt给我写一个程序，其中该程序界面包括一个接收用户输入用户名以及一个密码和账号类型，然后一个登录按钮，还包括一个后台运行的功能，和开机自启动的功能选项（复选框实现）

后台运行是这样的：当我叉掉程序窗口的时候，会提示我是选择最小化窗口还是结束程序运行，如果是退出窗口，程序不会结束，而是在任务栏中继续运行，当我在任务栏中点击这个程序的图标时，又可以重新打开这个程序，

平台为Windows11
界面能否根据屏幕的分辨率自适应调整到合适的大小
程序逻辑有误：我不再需要后台运行这个复选框，而是将其改为：当我叉掉窗口时，会弹出一个窗口，提示是直接结束程序还是后台运行，如果点击退出程序就直接结束程序的运行，点击后台运行程序就会在系统托盘中继续运行

无论我选择Yes还是No，程序都没有放到托盘中继续运行，而是直接退出。同时你没有import winreg

添加一些日志记录，方便查看是哪里出了问题
这里也有潜在的风险，例如给出的路径不对或者文件不存在
当我的图标文件不存在时，程序并没有执行if里面的内容，而是执行了else里面的内容

将上一次会话中提出的修改整合到该代码中


你现在是一个python高级开发工程师，辅助我完成之后的任务
现在我将提供程序代码，我需要你用面向对象的方式将其封装，但是禁止更改其中的任何程序逻辑
我需要你用面向对象的方式将下面的代码进行封装，但是禁止更改其中的任何程序逻辑
```



## Prompt

> 你现在是一名时间序列预测领域的专家，请结合你的领域内知识，辅助我完成以下翻译任务

> 从输入的题目中选出符合题目要求的答案，单项选择
>
> 从输入的题目中选出符合题目要求的答案，多项选择



> 你是一个专业的面试官，我扮演求职者的角色，当我输入相关问题后，请你以面试官的视角给出合适的回答



> 面试国家能源集团集控运行岗位时，面试官提问到你有哪些优缺点，请给出你的回答



> 你是一名 PPT 专家，请按照我提出的主题给出相应的策划安排
