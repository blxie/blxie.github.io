| 论文名称             | ByteTrack: Multi-Object Tracking by Associating Every Detection Box |            |      |
| -------------------- | ------------------------------------------------------------ | ---------- | ---- |
| 学校院所             | Huazhong University of Science and Technology<br />The University of Hong Kong<br />ByteDance Inc. |            |      |
| 日期                 | [v1] Wed, 13 Oct 2021 17:01:26 UTC (5,057 KB)<br/>[v2] Thu, 14 Oct 2021 14:07:10 UTC (5,057 KB)<br/>[v3] Thu, 7 Apr 2022 16:36:24 UTC (7,166 KB)<br />[ECCV 2022] |            |      |
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

Tracking-by-detection 是 MOT 中的一个经典高效的流派，通过相似度（位置、外观、运动等信息）来关联检测框得到跟踪轨迹（目标边界框及对应的 ID）。



> 解决的问题（该篇论文对比的方法有什么缺点）

由于视频中场景的复杂性，检测器无法得到完美的检测结果。为了处理 true positive/false positive 的 trade-off，目前大部分 MOT 方法会选择一个阈值，只保留高于这个阈值的检测结果来做关联得到跟踪结果，低于这个阈值的检测结果直接丢弃。但是这样是不合理的。低分检测框往往预示着物体的存在（例如遮挡严重的物体），简单地把这些物体丢弃会给 MOT 带来不可逆转的错误，包括大量的漏检和轨迹中断，降低整体跟踪性能。



### Part3 提到的技术点/创新点及其原理的介绍（新方法、新框架、新的数据集都需写明）

> 针对以上的问题，作者提出的解决方案

为了解决之前方法丢弃低分检测框的不合理性，作者提出了一种简单、高效、通用的数据关联方法 BYTE (each detection box is a basic unit of the tracklet, as byte in computer program)。直接地将低分框和高分框放在一起与轨迹关联显然不可取，会带来很多的背景（false positive）。BYTE 将高分框和低分框分开处理，利用低分检测框和跟踪轨迹之间的相似性，从低分框中挖掘出真正的物体，过滤掉背景。整个流程如下所示：

（1）BYTE 将每个检测框根据得分分成两类，高分框和低分框，总共进行两次匹配。

（2）第一次使用高分框和之前的跟踪轨迹进行匹配。

（3）第二次使用低分框和第一次没有匹配上高分框的跟踪轨迹（例如在当前帧受到严重遮挡导致得分下降的物体）进行匹配。

（4）对于没有匹配上跟踪轨迹，得分又足够高的检测框，作者对其新建一个跟踪轨迹。对于没有匹配上检测框的跟踪轨迹，作者会保留30帧，在其再次出现时再进行匹配。

作者认为，BYTE 能 work 的原因是遮挡往往伴随着检测得分由高到低的缓慢降低：被遮挡物体在被遮挡之前是可视物体，检测分数较高，建立轨迹；当物体被遮挡时，通过检测框与轨迹的位置重合度就能把遮挡的物体从低分框中挖掘出来，保持轨迹的连贯性。



针对提出的数据关联方法，作者结合当前最新的目标检测算法 YOLOX 设计一种新的跟踪框架 ByteTrack，

ByteTrack 使用当前性能非常优秀的检测器 YOLOX 得到检测结果。在数据关联的过程中，和 SORT 一样，只使用卡尔曼滤波来预测当前帧的跟踪轨迹在下一帧的位置，预测的框和实际的检测框之间的IoU作为两次匹配时的相似度，通过匈牙利算法完成匹配。这里值得注意的是作者没有使用 ReID 特征来计算外观相似度，

（1）第一点是为了尽可能做到简单高速，第二点是作者发现在检测结果足够好的情况下，卡尔曼滤波的预测准确性非常高，能够代替ReID进行物体间的长时刻关联。实验中也发现加入 ReID 对跟踪结果没有提升。

（2）如果需要引入 ReID 特征来计算外观相似度，可以参考作者开源代码中将 BYTE 应用到 JDE，FairMOT 等 joint-detection-and-embedding 方法中的教程。

（3）ByteTrack 只使用运动模型没有使用外观相似度能在 MOT17，20 取得高性能的本质原因是 MOT 数据集的运动模式比较单一（因此作者提出了一个新数据 DanceTrack）。



数据集，

- MOT16/17/20，MOT Challenge 官方数据集。
- HiEve, Human in Events，与MOT17和MOT20相比，HiEve包含了更复杂的事件和更多样化的相机视图。
- BDD100K，自动驾驶场景中的多类别跟踪数据集，这些挑战包括低帧率和快速相机移动。
- DanceTrack，论文作者新提出的一种针对复杂运动场景的数据集。



### Part4 论文解析过程中备份相关专业术语名词解释及提供相关文件资料

MOT, Multi-Object Tracking  多目标追踪。

IDF1: ID F1得分，正确身份标签赋予的检测框与平均ground truth和计算的检测数量的比值。

MOTA: Multiple Object Tracking Accuracy，多目标跟踪准确度。

HOTA: Higher Order Tracking Accuracy，对 MOTA 的改进版本。

tracklet：“跟踪小片段”，在物体跟踪时会用到数据关联（data association），整个连续的跟踪过程其实是由很多tracklet构成的。

Kalman fifilter 卡尔曼滤波器，一种利用线性系统状态方程，通过系统输入输出观测数据，对系统状态进行最优估计的算法。可在任何含有不确定信息的动态系统中使用卡尔曼滤波，对系统下一步的走向做出有根据的预测，即使伴随着各种干扰，卡尔曼滤波总是能指出真实发生的情况。在连续变化的系统中，使用卡尔曼滤波是非常理想的，它具有占用内存小的优点，并且速度很快，很适合用于实时问题和嵌入式系统。在目标跟踪应用中，使用卡尔曼滤波器对系统进行预测，可以有效地解决目标移动过程中出现遮挡导致目标丢失的情况。

Re-ID：Re-identification 重识别，利用算法，在图像库中找到要搜索的目标。在“基于外观线索的跟踪方法”中，首先裁剪检测的图像区域，并将它们送到Re-ID网络以提取图像特征。然后基于Re-ID特征计算轨迹与检测之间的相似度，并使用匈牙利算法完成分配。该方法对快速运动和遮挡具有较强的鲁棒性，可以重新初始化丢失的轨迹，因此目标的外观特征随着时间的推移相对稳定。

IDS：ID Switch，目标ID切换的次数。





### Part5 备份国内高校相关论文是否挂靠相关项目、国家自然基金等

依赖的相关项目，

[YOLOX](https://github.com/Megvii-BaseDetection/YOLOX), [FairMOT](https://github.com/ifzhang/FairMOT), [TransTrack](https://github.com/PeizeSun/TransTrack) and [JDE-Cpp](https://github.com/samylee/Towards-Realtime-MOT-Cpp).





## 论文启发及建议

### 总结当前各技术领域前沿发展趋势，提取技术点/创新点

多目标追踪场景中，大部分遮挡物体的检测结果都是低分框，ByteTrack非常简洁的从低分检测框中寻找遮挡的物体，对遮挡非常鲁棒。ByteTrack同时也为如何最大程度利用检测结果来帮助MOT提供了启发。作者提供了ByteTrack的部署代码和模型，高精度、高速度可对实际应用带来帮助。

ByteTrack在MOT17，20的表现启发作者重新思考多目标追踪中的运动模型与re-ID模型。当前众多跟踪模型强依赖于提取物体的外观特征，那如果追踪物体的外观基本一致时，现有模型的的表现如何？当前主流多目标跟踪数据集中物体的运动模式非常简单，近乎匀速直线运动，如果物体的运动模式非常复杂，多个物体互相来回穿梭，现有模型的的表现如何，提出了一个数据集：

DanceTrack: tracking multiple objects in uniform appearance and diverse motion



### 该论文的技术点/创新点未来可能应用于汽车领域的哪方面或者可能应用的场景

行人/车辆等追踪，轨迹预测



### 提供可能的研发课题和方向

