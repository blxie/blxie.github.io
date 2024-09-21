## Windows Docker

> - [记一次docker desktop启动之后settings一直转圈处理](https://blog.csdn.net/freshman_fresh/article/details/116277540)
> - [在window上安装docker的方法 - 知乎](https://zhuanlan.zhihu.com/p/303961992#:~:text=docker%E9%9C%80%E8%A6%81,%E6%9B%B4%E6%96%B0%E6%88%90WSL2%E3%80%82)

依赖于 `wsl2`，必须先安装才能运行！

阿里云镜像：[容器镜像服务](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

[【全面详细】Windows10 Docker安装详细教程 - 知乎](https://zhuanlan.zhihu.com/p/441965046)

内核升级包：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

```
wsl --update
"registry-mirrors": ["https://vt4xmxgx.mirror.aliyuncs.com"],
```







常用命令

```bash
curl -fsSL https://get.docker.com | sh

docker stop $(docker ps -a -q)
docker pull chenzhaoyu94/chatgpt-web
```







> - [Ubuntu20.04安装docker [十拍子]](https://www.sopuzi.cn/blog/open/post/641)
> - 





> - [NVIDIA Docker：让 GPU 服务器应用程序部署变得容易 - NVIDIA 技术博客](https://developer.nvidia.com/zh-cn/blog/nvidia-docker-gpu-server-application-deployment-made-easy/)
> - [Installation Guide — NVIDIA Cloud Native Technologies documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#docker)
> - [NVIDIA Docker 的安装和使用 | Junyu](https://fanjunyu.com/posts/bb9b6d25/)
>
> > 注意：安装之后要重启才能找到 `nvidia-docker` 命令！



> ChatGPT
>
> - docker自动清理
> - 





> 相关命令，
>
> - [Docker常用命令及docker run 和 docker start区别_docker start -it_lvhy踩坑之路的博客-CSDN博客](https://blog.csdn.net/weixin_44722978/article/details/89704085)







# Error

> - [使用Docker操作“ssh localhost”时出现“connect to host localhost port 22: Connection refused”问题的解决_我是干勾鱼的博客-CSDN博客](https://blog.csdn.net/dongdong9223/article/details/81166835)
> - 