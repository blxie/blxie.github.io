# Docker 常用命令

> [9、镜像的基本命令\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1og4y1q7M4?p=9&spm_id_from=pageDriver&vd_source=f01c4b322443fbcb202e2abcaae29044)

## 帮助命令

```bash
docker version  # 查看 docker 的版本信息
docker info  # 显示 docker 的系统信息，包括镜像和容器的数量等信息
docker 命令 --help  # 帮助命令
```

官方帮助文档地址：[Reference documentation | Docker Documentation](https://docs.docker.com/reference/)

## 镜像命令

> `docker images` 查看所有本地主机的镜像

```bash
[root@VM-4-6-centos ~]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   11 months ago   13.3kB
```

- `REPOSITORY` 镜像的仓库源
- `TAG` 镜像的标签
- `IMAGE ID` 镜像的 id
- `CREATED` 镜像的创建时间
- `SIZE`镜像的大小

```bash
[root@VM-4-6-centos ~]# docker images --help

Usage:  docker images [OPTIONS] [REPOSITORY[:TAG]]

List images

Options:
  -a, --all             Show all images (default hides intermediate images)
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print images using a Go template
      --no-trunc        Don't truncate output
  -q, --quiet           Only show image IDs

docker iamges -aq  # 显示所有的 images
```

> `docker search` 搜索镜像

和 `github` 类似的 `DockerHub`: [Docker Hub Container Image Library | App Containerization](https://hub.docker.com/)

```bash
docker search mysql
```

## 容器命令
