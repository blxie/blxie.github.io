# 相关教程

[目标追踪综述 - 知乎](https://zhuanlan.zhihu.com/p/148516834)

[卡尔曼滤波在目标跟踪中的运用_MSTIFIY的博客-CSDN博客_opencv卡尔曼滤波 目标跟踪](https://blog.csdn.net/qq_39784672/article/details/120618416)

深度学习调参有哪些技巧？ - 爱睡觉的KKY的回答 - 知乎 https://www.zhihu.com/question/25097993/answer/2717281021

如何看待清华大学博士生武楚涵在读期间发表 100 多篇论文？ - Jin.Carlo的回答 - 知乎 https://www.zhihu.com/question/537342945/answer/2640347949

目标追踪综述 - 王方浩的文章 - 知乎 https://zhuanlan.zhihu.com/p/148516834



## DL 基础

### `batchsize`

[12.3 学习率与批大小 - AI-EDU](https://microsoft.github.io/ai-edu/%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B/A2-%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86/%E7%AC%AC5%E6%AD%A5%20-%20%E9%9D%9E%E7%BA%BF%E6%80%A7%E5%88%86%E7%B1%BB/12.3-%E5%AD%A6%E4%B9%A0%E7%8E%87%E4%B8%8E%E6%89%B9%E5%A4%A7%E5%B0%8F.html) 微软官方 AI 教程！

> 总结： ”当批大小小到一定数量级后，学习率要和批大小匹配，较大的学习率配和较大的批量，反之亦然。“
>
> 我们从试验中得到了这个直观的认识：大的批数值应该对应大的学习率，否则收敛很慢；小的批数值应该对应小的学习率，否则会收敛不到最佳点。
>
> 一个极端的情况是，当批大小为1时，即单个样本，由于噪音的存在，我们不能确定这个样本所代表的梯度方向就是正确的方向，但是我们又不能忽略这个样本的作用，所以往往采用很小的学习率。这种情况很适合于online-learning的场景，即流式训练。
>
> 使用Mini-batch的好处是可以克服单样本的噪音，此时就可以使用稍微大一些的学习率，让收敛速度变快，而不会由于样本噪音问题而偏离方向。从偏差方差的角度理解，单样本的偏差概率较大，多样本的偏差概率较小，而由于I.I.D.（独立同分布）的假设存在，多样本的方差是不会有太大变化的，即16个样本的方差和32个样本的方差应该差不多，那它们产生的梯度的方差也应该相似。
>
> 通常当我们增加batch size为原来的N倍时，要保证经过同样的样本后更新的权重相等，按照线性缩放规则，学习率应该增加为原来的m倍。但是如果要保证权重的梯度方差不变，则学习率应该增加为原来的m倍。
>
> 研究表明，衰减学习率可以通过增加batch size来实现类似的效果，这实际上从SGD的权重更新式子就可以看出来两者确实是等价的。对于一个固定的学习率，存在一个最优的batch size能够最大化测试精度，这个batch size和学习率以及训练集的大小正相关。对此实际上是有两个建议：
>
> 1. 如果增加了学习率，那么batch size最好也跟着增加，这样收敛更稳定。
> 2. 尽量使用大的学习率，因为很多研究都表明更大的学习率有利于提高泛化能力。如果真的要衰减，可以尝试其他办法，比如增加batch size，学习率对模型的收敛影响真的很大，慎重调整。



### `epoch`

> [Epoch不仅过时，而且有害？Reddit机器学习板块展开讨论 | 量子位](https://www.qbitai.com/2021/05/23498.html)





### `MASK`

> [图像处理中的mask(掩膜)_点亮～黑夜的博客-CSDN博客_图像处理mask](https://blog.csdn.net/weixin_41010198/article/details/89309359)

> 用选定的图像、图形或物体，对处理的图像（全部或局部）进行遮挡，
>
> - 控制图像处理的区域或处理过程
> - 覆盖的特定图像或物体称为掩模或模板
>
> 光学图像处理中，掩模可以足胶片、滤光片等
>
> 数字图像处理中，掩模为二维矩阵数组,有时也用多值图像



### 激活函数

> - [深度学习中的gelu激活函数详解_.我心永恒_的博客-CSDN博客_gelu激活函数](https://blog.csdn.net/sinat_36618660/article/details/100088097)



## 框架

[STVIR/pysot: SenseTime Research platform for single object tracking, implementing algorithms like SiamRPN and SiamMask.](https://github.com/STVIR/pysot) 孪生网络专用库！

[visionml/pytracking: Visual tracking library based on PyTorch.](https://github.com/visionml/pytracking) 大部分论文都是基于该框架！阅读 `ltr & pytracking` 下的 `README`，说明很详细！

 典型代表：`Stark` 后面的大部分论文都是基于该项目代码实现！



[pytracking代码讲解（一）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1WK4y1C7JG?p=31&vd_source=f01c4b322443fbcb202e2abcaae29044)

[目标跟踪代码进阶（一）：把pytracking跑起来！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1oT4y1z74m?spm_id_from=333.999.0.0&vd_source=f01c4b322443fbcb202e2abcaae29044)



pysot 孪生网络的专用库，国内出版！

pytracking 实时跟踪，国外马丁大神团队维护！很多在线更新算法在里面都已经实现；
- `ltr` Learning Tracking Representation 主要是训练阶段使用，模型、数据集等工具库都在里面；
- `pytracking` 将训练好的模型进行在线评估；





# 经典论文

2010 - 机器学习 —> 深度学习



## `Tracking-Learning-Detection, TLD (2010)`



三部分主体结构：

- Tracking
- Learning
- Detection



### 概念名词

- consecutive frames 连续帧

- fram-to-frame tracking

- target template: an image patch, a color histogram

- candidate patch

- template

  - static template: the target template does not change
  - adaptive template: the target template is extracted from the previous frame

- generative models: to model more appearance variations

  `The generative trackers model only the appearance of the object and, as such, often fail in cluttered background.`

  - static discriminate trackers: train an object classifier before tracking
  - adaptive discriminate trackers: build a classifier during tracking























