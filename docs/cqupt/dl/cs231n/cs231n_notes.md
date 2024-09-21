# Lecture 2: Image Classification

$L1$损失函数：两个向量逐个元素的差的绝对值之和。

![image-20220312171444418](cs231n_notes.assets/image-20220312171444418.png) 







# Lecture 3: Loss Functions and Optimization



## Softmax vs. SVM

![image-20220312133639990](cs231n_notes.assets/image-20220312133639990.png)



## gradient

参数沿着负梯度方向更新：negative gradient direction









# Lecture 4: Neural Networks and Backpropagation



## Neural Network

和全连接神经网络、多层感知机是同一个。

![image-20220313143705901](cs231n_notes.assets/image-20220313143705901.png)





---

![image-20220313144130223](cs231n_notes.assets/image-20220313144130223.png)



> 使用图示的方法加深理解计算的过程，整个维度的变化情况。



---

![image-20220313144320873](cs231n_notes.assets/image-20220313144320873.png)

---

![image-20220313144504807](cs231n_notes.assets/image-20220313144504807.png)



> 对激活函数的解释，这里使用的是 $ReLU$ 激活函数。





---

![image-20220313144645004](cs231n_notes.assets/image-20220313144645004.png)



> 注意神经网络和卷积神经网络的区别：神经网络中的相邻层的所有神经元都是全连接的。
>
> 目前理解：而卷积神经网络中的神经元并不是全连接的。由卷积操作得到下一层的输出





---

![image-20220313145324455](cs231n_notes.assets/image-20220313145324455.png)



> 神经网络的简单实现过程。
>
> 步骤一般如下（个人总结）：
>
> 1. 定义网络结构；
> 2. 定义加载数据的类；
> 3. 加载数据，将训练数据作为网络的输入传递到网络中进行计算，拟合样本：
>    1. 输入输出维数对应好，权重在前，输入在后；
>    2. 加上偏置；中间的隐藏层通过激活函数后的输出作为下一层的输入，以此类推，一直传递下去。
> 4. 计算整个计算过程中的梯度、损失，然后通过梯度修改权重 $W$，然后使用更新后的权重参数重新训练，直至损失达到预期效果，拟合数据集较好。





---

![image-20220313150651758](cs231n_notes.assets/image-20220313150651758.png)



> 结合之前：对分析梯度的理解。



---

![image-20220313151317611](cs231n_notes.assets/image-20220313151317611.png)



> 形象理解神经网络的计算过程。





---

![image-20220315082657503](cs231n_notes.assets/image-20220315082657503.png)



> 向量的导数。





---



![image-20220315083500609](cs231n_notes.assets/image-20220315083500609.png)



> 使用向量进行反向传播的过程。



---

![image-20220315084413340](cs231n_notes.assets/image-20220315084413340.png)

---



![image-20220315084635505](cs231n_notes.assets/image-20220315084635505.png)

---

![image-20220315085127528](cs231n_notes.assets/image-20220315085127528.png)



> 蓝色字：稀疏矩阵（此处对应的是 $max(0, x)$ 函数，所以才会形成稀疏矩阵），采用隐式计算矩阵乘积（使用一个条件表达式，将其分段表示），而不是显示表达出来。



---

![image-20220315085858379](cs231n_notes.assets/image-20220315085858379.png)



---

![image-20220315090451446](cs231n_notes.assets/image-20220315090451446.png)



---

![image-20220315090900400](cs231n_notes.assets/image-20220315090900400.png)



> 具体怎么得到的不懂。



---

![image-20220315092132806](cs231n_notes.assets/image-20220315092132806.png)



> 梯度的 shape 和 variable 的形状一致。
