---
id: blainet-website
tags: [aigc, AIGC, cgatgpt, chatgml, 智谱AI, monica, 秘塔AI, kimi, 月之暗面, api接口]
title: AIGC 之 LLM
description: aigc 参考资料记录
---

# 简介

> - [动手学大模型应用开发](https://datawhalechina.github.io/llm-universe/#/)
> - [THUDM/ChatGLM-6B: ChatGLM-6B: An Open Bilingual Dialogue Language Model | 开源双语对话语言模型](https://github.com/THUDM/ChatGLM-6B/tree/main)
> - [和 Monica 聊天]：chrome-extension://fhimbbbmdjiifimnepkibjfjbppnjble/chatTab.html
> - [秘塔AI搜索](https://metaso.cn/)
> - [Kimi.ai - 帮你看更大的世界](https://kimi.moonshot.cn/)
> - [ChatGPT](https://chat.openai.com/)
> - [Monica Search - AI-powered search](https://s.monica.im/)

本文主要记录大语言模型 LLM 学习的相关资料，涵盖了以下部分，

国内，

- 月之暗面 kimi：比较全面，尤其适合长文本，以及 PDF 的总结提取，可上传文档图片
- 秘塔 AI 搜索：更适合网络搜索和总结
- 清华智谱 AI 搜索，ChatGML

国外，

- openai ChatGPT
- monica



# API 接口调用部署

## 使用官方 API

### 清华智谱 AI 搜索，ChatGML

1. 账号注册

官方链接：https://open.bigmodel.cn/

注册成功之后，会有免费的 `100` 万的 tokens 查询次数，**有效时间为一个月**！官方可能会提示你进行实名认证，再领取 400万 的免费 tokens，注意，千万不要同时领取，等 100万的使用完之后，再进行实名认证领取即可，不然就浪费了！因为这 400万 的也有一个月的有效时间限制！！！切记切记，

2. 获取 API key

会引导你找到 API key，该 key 是后续连接使用的关键


3. 使用 API key 调用接口使用

> - [ChatGLM3-6B的本地api调用_本地部署好了chatglm3-6b,openai接口适配-CSDN博客](https://blog.csdn.net/xiangxiang613/article/details/135483015#ChatGLM2-6B%E7%9A%84%E6%9C%AC%E5%9C%B0api%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F)
> - [2.3 调用智谱 API_智谱清言api-CSDN博客](https://blog.csdn.net/Alexa_/article/details/134485161)
> - [一分钟接入清华智谱AI （ChatGLM）API - 知乎](https://zhuanlan.zhihu.com/p/677875369)


### 月之暗面 kimi

> - [月之暗面LLM：Kimi Chat能力体验报告（附API调用方法） - 知乎](https://zhuanlan.zhihu.com/p/682202077)
>


## 使用本地资源部署（TODO）


# 理论/原理

> - [llm的inference(一)_llm inference过程-CSDN博客](https://blog.csdn.net/qq_41596730/article/details/136268395)
>