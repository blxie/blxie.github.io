---
id: id-my-website
title: github.io + docusaurus 搭建静态网站
description: 对本文档的介绍说明
---

# 我的网站（github.io + docusaurus）

## 一、环境搭建

### 1、node.js

安装好之后，

```bash
node -V
```



## 二、项目创建之本地搭建：使用 npm 安装 docusaurus

> - [facebook/docusaurus: Easy to maintain open source documentation websites.](https://github.com/facebook/docusaurus)

使用 npm 创建一个项目，

```bash
npm init docusaurus@latest
## 本地安装部署
npm run build
npm run deploy
num run start
```

具体步骤如下，

![Snipaste_2024-03-22_13-52-42](assets/Snipaste_2024-03-22_13-52-42.png)

![Snipaste_2024-03-22_13-52-55](assets/Snipaste_2024-03-22_13-52-55.png)



> - [安装流程 | Docusaurus](https://docusaurus.io/zh-CN/docs/installation)

*使用 docusaurus 官方文档中的这个命令会提示报错！*

```bash
npx create-docusaurus@latest my-website classic
```



## 三、项目创建之部署发布：docusaurus + githubio

### 1、在 GitHub 创建一个新的 GitHub pages 项目

> - [GitHub Pages | Websites for you and your projects, hosted directly from your GitHub repository. Just edit, push, and your changes are live.](https://pages.github.com/)

按照官方的说明要求，创建一个 `.github.io` 项目，专门用于网站搭建，

创建一个新的项目，名为 `登录用户名.github.io`，本文中为，

```bash
blxie.github.io
```



### 2、上传 my-website 到 GitHub pages 仓库

首先修改 `docusaurus.config.js`，

```yaml
// Set the production url of your site here
url: "https://blxie.github.io/",
// Set the /<baseUrl>/ pathname under which your site is served
// For GitHub pages deployment, it is often '/<projectName>/'
baseUrl: "/",

// GitHub pages deployment config.
// If you aren't using GitHub pages, you don't need these.
organizationName: "blxie", // Usually your GitHub org/user name.
projectName: "blxie.github.io", // Usually your repo name.
```

其他部分不变，

![image-20240323111236544](assets/image-20240323111236544.png)

将第二部分创建的本地 docusaurus 项目上传到这个项目中，有两种方式实现，

**（1）使用默认的方法，一行一行命令设置**

```bash
code my-website
git init
git config --global user.name "blxie"
git config --global user.email "blxie@outlook.com"
git add .
git commit -m "first commit, init proj"
git branch -M main
## 注意这里必须用 SSH，并在设置中配置 Deploy keys
# 具体可以参考 docusaurus 的 github 说明文档
git remote add origin git@github.com:blxie/blxie.github.io.git
git push -u origin main
```

如果出现连接不上的问题，比如端口错误，大概率是端口转发的问题，或者 `~/.ssh/config` 设置问题，将 `Host *` 里面的非公共部分提出！

```bash
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
# https://www.jianshu.com/p/92d60c6c92ef
## 校园网
Host A4000
    HostName 10.16.64.67
    User guest
    Port 5122
Host A6000
    HostName 10.16.93.52
    User ji
    Port 5122
Host RTX3090
    HostName 10.16.42.114
    User guest
    Port 5122
## 内网穿透
Host NAT-A4000
    HostName 107.174.181.186
    User guest
    Port 14000
Host NAT-RTX3090
    HostName 43.143.59.35
    User guest
    Port 13090
Host VPS
    HostName 107.174.181.186
    User root
    Port 22
## 虚拟机
Host vmus
    HostName 192.168.56.101
    User blainet
    Port 22
## 共同配置，注意需要写在最后，如果以上配置中和下面的有重复，优先选取上面的
Host *
    IdentityFile ~/.ssh/id_rsa
    ForwardAgent yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
```



**（2）直接复制以前的配置文件，一步到位**

具体是 `.git/config` 配置文件，

```yaml
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = git@github.com:blxie/blxie.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[user]
    name = blxie
    email = blxie@outlook.com
[branch "main"]
	remote = origin
	merge = refs/heads/main
```

按照这种方法，直接执行正常的流程即可，

```bash
git add .
git branch -M main
git commit -m "first commit, init; switch to meta-docusaurus theme"
git push -u origin main
## 如果有冲突，使用 vscode 的 git merge 即可，在最下面栏为合并之后的
# 左边为 incoming，右边为……
```



### 3、更新 docusaurus，push main 自动部署

主要基于 GitHub 的 workflows 实现，在项目的 `Action` 部分查看 `workflows` 的详细信息，

**（1）手动创建一个 workflows Actions**

> - [docusaurus部署 | yingwinwin的前端之路](https://yingwinwin.github.io/blog/%E4%BD%BF%E7%94%A8docusaurus%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%EF%BC%8C%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%88%B0github%20pages/)，`yml` 文件有点问题，还是要使用下面的官方文档说明，做一些小的调整修改即可
> - [JamesIves/github-pages-deploy-action: 🚀 Automatically deploy your project to GitHub Pages using GitHub Actions. This action can be configured to push your production-ready code into any branch you'd like.](https://github.com/JamesIves/github-pages-deploy-action)
> - [Docusaurus + Github Page，快速搭建免费个人网站 | Emma's blog](https://emmachan2021.github.io/docs/tech/docusaurus-github)，仅供一点参考，不需要创建 dev 分支，来回切换

主要根据 `github-pages-deploy-action/readme` 的例子来实现，

在 本地的 `my-website` 项目中，创建 `.github/workflows/documentation.yml` 文件，

```bash
touch .github/workflows/documentation.yml
```

文件内容，

```yaml
name: Build and Deploy
on:
  push:
    branches:
      - main ## XBL changed
permissions:
  contents: write
jobs:
  build-and-deploy:
    concurrency: ci-${{ github.ref }} # Recommended if you intend to make multiple deployments in quick succession.
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@main ## XBL changed

      - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
        run: |
          npm ci
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build # The folder the action should deploy.
```

~~如果有密钥配置的话，需要在 `settings/Deploy keys` 中添加该电脑的 `ssh` 公钥，~~

![image-20240323104956235](assets/image-20240323104956235.png)

![image-20240323105258217](assets/image-20240323105258217.png)

![image-20240323105433483](assets/image-20240323105433483.png)





## 四、上传自己的文档

> - [创建文档 | Docusaurus](https://docusaurus.io/zh-CN/docs/next/create-doc)





# 参考资料

- [facebook/docusaurus: Easy to maintain open source documentation websites.](https://github.com/facebook/docusaurus)
- [docusaurus部署 | yingwinwin的前端之路](https://yingwinwin.github.io/blog/%E4%BD%BF%E7%94%A8docusaurus%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%EF%BC%8C%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%88%B0github%20pages/)，重点参考
- [wrm244/docusaurus-theme-zen](https://github.com/wrm244/docusaurus-theme-zen)
- [Docusaurus + Github Page，快速搭建免费个人网站 | Emma's blog](https://emmachan2021.github.io/docs/tech/docusaurus-github)
- [Github配置SSH密钥连接（附相关问题解决） - 知乎](https://zhuanlan.zhihu.com/p/628727065)
- [rundocs/jekyll-rtd-theme: Just another documentation theme compatible with GitHub Pages](https://github.com/rundocs/jekyll-rtd-theme)，另外一种好看的主题
- [GithubPage构建博客常用模板地址汇总_github博客模板-CSDN博客](https://blog.csdn.net/shiwanghualuo/article/details/125363650)
- [GitHub Pages 文档 - GitHub 文档](https://docs.github.com/zh/pages)
