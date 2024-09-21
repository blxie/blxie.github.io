## 背景（摘要）

appearance-based tracking 对于相似的 distractor objects 不能很好的解决，因为学习到的是相似的外观特征！

之前的解决方案是：build more powerful appearance models，然而这并不能从根本上解决问题！

作者对此 take an alternative approach（一种可替代的解决方案）



target candidates 目标候选，即可能是待追踪的目标



a training strategy, combines partitial annotations with self-supervision 将部分标注和自监督相结合进行训练



在 LaSOT 以及长时跟踪测试数据集上表现良好！



## 引言

两种 dominating paradigms,

- Siamese networks, employs a tmplate matching in a learned frature space
- discriminative appearance modules, constructs an appearance model through a discriminative learning for modulation

