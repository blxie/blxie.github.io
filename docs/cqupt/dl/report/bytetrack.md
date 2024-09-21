| 论文名称             | ByteTrack: Multi-Object Tracking by Associating Every Detection Box |            |      |
| -------------------- | ------------------------------------------------------------ | ---------- | ---- |
| 学校院所             | Huazhong University of Science and Technology<br />The University of Hong Kong<br />ByteDance Inc. |            |      |
| 日期                 | **[[v1\]](https://arxiv.org/abs/2110.06864v1)** Wed, 13 Oct 2021 17:01:26 UTC (5,057 KB)<br/>**[[v2\]](https://arxiv.org/abs/2110.06864v2)** Thu, 14 Oct 2021 14:07:10 UTC (5,057 KB)<br/>**[v3]** Thu, 7 Apr 2022 16:36:24 UTC (7,166 KB)<br />[ECCV 2022] |            |      |
| 编制人（硕士及以上） | Yifu Zhang, Peize Sun , Yi Jiang, Dongdong Yu, Fucheng Weng, Zehuan Yuan, Ping Luo, Wenyu Liu, Xinggang Wang | **审核人** |      |
| 涉及领域/方向        | 计算机视觉，目标检测，多目标跟踪                             |            |      |
| 论文来源             | ECCV                                                         |            |      |
| 论文概要             | 1．附论文原文，若论文提供源码、附录、补充材料或者视频的，均需下载或提供下载地址；2．该论文解决了什么问题，论文研究对象/问题，研究方法/理论；3．该论文提到的技术点/创新点及其原理的介绍（新方法、新框架、新的数据集都需写明）；4．论文解析过程中备份相关专业术语名词解释及提供相关文件资料；       5．备份国内高校相关论文是否挂靠相关项目、国家自然基金等。 |            |      |
| 论文启发及建议       | 1．总结当前各技术领域前沿发展趋势，提取技术点/创新点；2．该论文的技术点/创新点未来可能应用于汽车领域的哪方面或者可能应用的场景；  3．提供可能的研发课题和方向； |            |      |



## 论文概要

### Part1 附论文原文，若论文提供源码、附录、补充材料或者视频的，均需下载或提供下载地址

论文原文：https://arxiv.org/pdf/2110.06864.pdf

官方源码：https://github.com/ifzhang/ByteTrack

百度 PaddleDetection 实现：https://github.com/PaddlePaddle/PaddleDetection/tree/develop/configs/mot/bytetrack



### Part2 该论文解决了什么问题，论文研究对象/问题，研究方法/理论

> 研究的对象/问题（MOT 背景）

基于检测的多目标跟踪算法（Tracking-by-Detection）

Multi-object tracking (MOT) aims at estimating bounding boxes and identities of objects in videos.





> 解决的问题（该篇论文对比的方法有什么缺点）

*Most methods obtain identities by associating detection boxes whose scores are higher than a threshold. The objects with low detection scores, e.g. occluded objects, are simply thrown away, which brings non-negligible true object missing and fragmented trajectories.*



> 针对以上的问题，作者提出的解决方案





### Part3 提到的技术点/创新点及其原理的介绍（新方法、新框架、新的数据集都需写明）





### Part4 论文解析过程中备份相关专业术语名词解释及提供相关文件资料





### Part5 备份国内高校相关论文是否挂靠相关项目、国家自然基金等

依赖的相关项目，

[YOLOX](https://github.com/Megvii-BaseDetection/YOLOX), [FairMOT](https://github.com/ifzhang/FairMOT), [TransTrack](https://github.com/PeizeSun/TransTrack) and [JDE-Cpp](https://github.com/samylee/Towards-Realtime-MOT-Cpp).





## 论文启发及建议

### 总结当前各技术领域前沿发展趋势，提取技术点/创新点





### 该论文的技术点/创新点未来可能应用于汽车领域的哪方面或者可能应用的场景





### 提供可能的研发课题和方向

