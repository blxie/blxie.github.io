



> [Masked Autoencoders Are Scalable Vision Learners - 知乎](https://zhuanlan.zhihu.com/p/433547480)

优点，

- 预训练时间减少，显存消耗降低，可扩展到大模型



重点，

解码器的输入信息是所有token，由**编码器输出的编码向量**和**mask token**组成。每个mask token都是一个共享的、可学习的向量，表示要预测的缺失patch。