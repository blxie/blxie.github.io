## Related Work  优缺点

时间 ~

### Siamese-based (CNN)

Benefit from the rapid development of deep learning and a series of strong tracking baseline, CNN-based visual object tracking has made great achievements, especially siamese-based methods[SiamFC]. Compared with traditional algorithms, ==SiamFC, with a real time tracking speed, is more concise and effective.== [SiamRPN] introduced RPN network from [Faster R-CNN], greatly reduced the time consumption of proposal extraction. Due to the superior performance and time efficient of RPN, [SiamRPN] has got better performance and speed. After that, [SiamRPN++] change the backbone from [AlexNet] to [ResNet], using deeper CNN network extract more semantic information. ==Hence latter modules, such as feature correlation can make full use of them to get a better result.==

Contrary to offline training, ==online training aims to design a algorithm that can update parameters when tracker is runing to make it adapt to current tracking task==[ATOM], [DiMP], [KeepTrack]. Although online tracking has an edge in some challenging scenarios,  ==designing such an effective tracking algorithm is not **easy**.==

- online-tracking discriminative, pytracking (ATOM ~ KeepTrack)在线优化，更新算法（主观经验，先验知识）
  - [ ] ATOM 之后的论文，最好是已经出版的论文，arxiv 上面的可以适当引用
- offline, Siameses
  - [x] SiamFC
  - [x] SiamRPN
  - [ ] SiamMask
  - [ ] GlobalTrack
  - [x] SiamRPN++
  - [ ] DiMP?
- 优点：非（完全）深度学习，和手工设计的特征对比，表征能力强，结构简单，similarity comp, attn-encode
- 缺点：conv 限制，局部关系，全局/长距离信息捕获困难

### Visual Transformer (DETR, ViT, PvT, SwinT)

Transformer was first proposed by [xxx] to deal with machine translation task. Due to excellent long-distance modeling capability and parallel computing, it dominated in NLP soon and gradually been introduced to ==different fields by researchers. Up to now, numerous research results show that it is generic and effective.==

[DETR] is first impressive working transfering transformer to vision tasks. [DETR] just directly models object detection as a set prediction task, an end-to-end task without any post-processing, domain knowledge or hand-crafted procedure, and achieves a state-of-the-art performance. Some follow-up work like [Deformable DETR] has been proposed successively and achieved superior performance.

Inspired by the spectacular success of [BETR] and [GPT family] in [NLP], vision researchers have tried to introduce this method that pretraining large model on large-scale datasets into the field. The [ViT] as a strong vision baseline has been proposed. For the quadratic calculation consumption of self-attention, [ViT] directly divides the image into fixed-size(16) patches as the input tokens of the first Transformer encoder block. For this reason, [ViT] can easily implement [MSA] in transformer encoder like [BERT]. Although the overall structure of ViT is considerably elegant, it may lose some indispensable intermediate information for current research tasks. To improve ViT, many follow-up work is carried out one after another [CvT] [ViViT] [PiT] [MAE]. 

- [ ] [CvT] use conv and transformer... 借鉴 conv 的一系列改进的代表
- [ ] [MAE] self-superior 使用 ViT 自监督训练的代表

Although the above series of work have made great achievements, they are still without any progressive down sampling stage as the native [ViT]. [PvT] was proposed to copy with this problem. By designing similar down sampling rules like [Conv], the whole architecture of network haas been divided 3 stage. It is well-konwn that transformer is not expert in long sequence, and limited to the computation cost of raw self attention of the high resolution input in vision tasks. [MHA] can be executed in stage1 and stage2 by reducing KV. In this way, [PvT] realized the multi-stage architecture of vision transformer and reached a comparable performance. Almost at the same time, annother great influence work[SwinT] has been published. Unlike [PvT], [SwinT] divides image patches into multiple windows of the same size and performs MHA in single window. To conduct information interaction between different block, [SwinT] designed a shift-window mechanism. Experiment results show that [SwinT] reach a state-of-the-art comparable performance. Some follow-up work using huge parameters[SwinT-v2] and self-superior traning method[SimMiM] achieved better performance.

- [x] DETR
- [x] Deformable DETR
- [x] ViTs
- [ ] CvT
- [ ] MAE 自监督学习 (ViT/SwinT)
- [x] PvT
- [x] Swin Transformer

### Transformer in Object Tracking

引入刚开始的方向，基于 Siam 系列的 Trans 系列，two-stage 引入 Trans-Attn 之后的优点之后的性能提升

- two-stage/two-stream, e-n
  - [x] SiamAttn
  - [ ] TransT
  - [ ] Deformable TT
  - [ ] Stark
  - [ ] SwinTrack
  - [ ] 总结：两阶段缺点，引出 one-stage

- one-stage/one-stream
  - [ ] OSTrack
  - [ ] MixFormer

Since transformer was successfully introduced into vison tasks, transformer-based tracking has been put forward continuously. [SiamAttn] designed a [Deformable Siamese Attention, DSA] module based on [Deformable transformer] for feature extraction and relation modeling. [SiamAttn] fully used the superior long range modeling capability and encoding advantage and got the SOTA performance. Despite [SiamAttn] has made great performance improvement, it includes some hand-crafted processes.[TransT] proposed a attention-based feature fusion network applied on the Siamese-based feature extraction backbone without RPN. The [ECA, ego-context augment] module based on self-attention and [CFA, cross-feature augment module] based on cross-attention like the [DSA] in [SiamAttn] with the same function. Under the author's meticulously attention design for tracking task, [TranT] has achieved the new SOTA performance  and made a difference. Some follow-up Siamese-based works almost all inherit this idea, just slightly different in details. The latter work — [Stark], uses a different attention approach, which using the concatenated flattened-feature of template and search image from backbone as relation modeling module based on transformer encoder-decoder structure. In addition, they also designed a score module to update template for some challenging scenarios. This end-to-end architecture achieves state-of-the-art performance on multiple challenging short-term and long-term benchmarks while running at real-time speed. [SwinTrack] tried to use an end-to-end fully transformer-based architecture for tracking. They replace [ResNet] with [Swin Transformer] as the backbone. After such elaborate design, [SwinTrack]  reached a state-of-the-art comparable performance. The methods mentioned above almost all Siamese-based, in which template and search image are sent into the network separately and share the weight in feature extraction stage. Some recent work shows that the [one-stream] pattern simultaneously extracting feature and relation model is more suitable for tracking tasks. [OSTrack] utilises [ViT] as backbone for feature extraction and relation modeling under the mechanism of transformer self-attention. [MixFormer] exploits [CvT] as the backbone instead. They use 3 stages progressive down sampling the inputs, which is instrumental for vision downstream tasks like tracking. This method can make full use of the information from original input. In one stage mode, one downsampling may lose some important information which are indispensable for tracking.

Influenced by [OSTrack] and [MixFormer], we propose a new tracking method, using [Swin Transformer] as backbone and referencing the one-stream idea simultaneously conduct feature extraction and template-search relation modeling. Specifically, we concatenate the template image features and search image features, and use the result as the [W/SW-MHA] input. After that, the 3rd stage outputs are the inputs of another specially designed feature argument module formed by 4 repeatedly stacked blocks. Then, the outputs are sent into bounding box prediction head constructed by some fully connected network[CenterNet] [OSTrack] [MixFormer] to get final results.











## 参考链接

> - [大白话Pyramid Vision Transformer - 知乎](https://zhuanlan.zhihu.com/p/353222035)
> - [码隆科技提出 SiamAttn，将孪生网络跟踪器的性能提至最优水平丨CVPR 2020 - 知乎](https://zhuanlan.zhihu.com/p/142026134)
> - [《数字图像分析》课程提纲](https://ustc-dia.github.io/slides_2021_autumn/%E7%AC%AC13%E7%AB%A0%20%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA.pdf)
> - [CS231n Convolutional Neural Networks for Visual Recognition](https://cs231n.github.io/classification/)
> - [目标跟踪中基于IoU和中心点距离预测的尺度估计](http://www.aas.net.cn/cn/article/doi/10.16383/j.aas.c210356?viewType=HTML)
> - [视觉目标跟踪之SiamRPN++ - 知乎](https://zhuanlan.zhihu.com/p/56254712)







