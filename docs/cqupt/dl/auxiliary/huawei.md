重要的网站，

- http://183.242.47.214/
- https://airportal.cn/  大文件传输

- https://mirrors.huaweicloud.com  更换 pip 源
- https://www.mindspore.cn/install  下载 mindspore



```
2020211779/admin
123456
```





需要将源代码中所有的 `Ascend` 更改为 `CPU`（注意全是大写！）

```bash
## 系统配置
# 更换 centos 源：https://support.huaweicloud.com/ecs_faq/ecs_faq_1003.html
# https://cloud.tencent.com/developer/article/1608653
echo nameserver 8.8.8.8 > /etc/resolv.conf
echo nameserver 8.8.4.4 > /etc/resolv.conf
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo_bak
# curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.myhuaweicloud.com/repo/CentOS-Base-7.repo  # 不可用
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum makecache  # 更新 cache
yum -y update  # 更新软件包
## 更新 firefox/chrome，否则一直崩溃！


# 更换 pip 源：https://mirrors.huaweicloud.com/
mkdir ~/.pip/
vim ~/.pip/pip.conf

[global]
index-url = https://repo.huaweicloud.com/repository/pypi/simple
trusted-host = repo.huaweicloud.com
timeout = 120
```



```bash
## 创建一个 mindspore 环境
conda create -n mindspore python==3.7
conda activate mindspore


## 安装 mindspore：https://www.mindspore.cn/install
conda activate mindspore
# for Linux CPU
pip install https://ms-release.obs.cn-north-4.myhuaweicloud.com/1.5.0/MindSpore/cpu/x86_64/mindspore-1.5.0-cp37-cp37m-linux_x86_64.whl --trusted-host ms-release.obs.cn-north-4.myhuaweicloud.com -i https://pypi.tuna.tsinghua.edu.cn/simple
# for Linux GPU
pip install https://ms-release.obs.cn-north-4.myhuaweicloud.com/1.8.1/MindSpore/gpu/x86_64/cuda-11.1/mindspore_gpu-1.8.1-cp37-cp37m-linux_x86_64.whl --trusted-host ms-release.obs.cn-north-4.myhuaweicloud.com -i https://pypi.tuna.tsinghua.edu.cn/simple
# for Windows CPU
pip install https://ms-release.obs.cn-north-4.myhuaweicloud.com/1.5.0/MindSpore/cpu/x86_64/mindspore-1.5.0-cp37-cp37m-win_amd64.whl --trusted-host ms-release.obs.cn-north-4.myhuaweicloud.com -i https://pypi.tuna.tsinghua.edu.cn/simple


## 安装相关的包
pip install ipython jupyter ipykernel easydict opencv-python matplotlib

## jupyter notebook 配置
# 将虚拟环境 kernel 添加到 ipykernel 中
python -m ipykernel install --user --name mindspore --display-name "MindSpore(1.5.0)"
# other auxiliary
jupyter kernelspec list
jupyter kernelspec remove kernelname
jupyter notebook --allow-root
```



VOC, http://host.robots.ox.ac.uk/pascal/VOC/voc2012/#devkit

VOC2012 下载地址：http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar





> - [华为云ModelArts与OBS桶的数据拷贝（超详细版）_花花少年的博客-CSDN博客](https://blog.csdn.net/m0_37605642/article/details/126350518)
> - [ModelArts-管理控制台](https://console.huaweicloud.com/modelarts/?region=cn-north-4#/dev-container)
> - [OBS工具汇总_对象存储服务 OBS_工具指南_华为云](https://support.huaweicloud.com/tg-obs/obs_09_0001.html)
> - [我的凭证](https://console.huaweicloud.com/iam/?agencyId=2feb7086888c4d2689492bf0aca4e408&region=cn-north-4&locale=zh-cn#/mine/accessKey)
> - [初始化配置_对象存储服务 OBS_obsutil_快速入门_华为云](https://support.huaweicloud.com/utiltg-obs/obs_11_0005.html)

Windows操作系统

使用永久AK、SK进行初始化配置：

```bash
# obsutil config -i=ak -k=sk -e=endpoint
obsutil config -i=CGO7Y7OS492HGXOSUCNC -k=A1iMOnWQr02lLqAYW1iPj2xn9I9eb2HdIInMQJQR -e=https://obs.cn-north-4.myhuaweicloud.com
```

![image-20221107214148283](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211142142570.png?token=AKMXRAVZAEZZHFNDMCQURY3DOJDAA)

![image-20221107214257925](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211142142027.png?token=AKMXRARUKRXV3PA5RMHYZ73DOJDAO)

#### 检查连通性

配置完成后，您可以通过如下方式检查连通性，确认配置是否无误。

- Windows操作系统

  ```bash
  obsutil ls -s
  ```

根据命令回显结果，检查配置结果：

- 如果返回结果中包含“Bucket number :”，表明配置正确。
- 如果返回结果中包含“Http status [403]”，表明访问密钥配置有误。
- 如果返回结果中包含“A connection attempt failed”，表明无法连接OBS服务，请检查网络环境是否正常。



> [下载对象_对象存储服务 OBS_obsutil_对象相关命令_华为云](https://support.huaweicloud.com/utiltg-obs/obs_11_0018.html)

```bash
## deeplabv3
.\obsutil.exe cp obs://ascend-professional-construction-dataset/deep-learning/deeplabv3-mindspore/ckpt . -f -r
## VOC2012 数据集可以直接在官网下载
# .\obsutil.exe cp obs://ascend-professional-construction-dataset/deep-learning/deeplabv3-mindspore/VOC2012 ./VOC2012 -f -r
## yolov3
.\obsutil.exe cp obs://ascend-professional-construction-dataset/deep-learning/yolov3-mindspore/ . -f -r
s3://yyq-3/DATA/code/deeplabv3/model
```

![image-20221107214820348](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211142142783.png?token=AKMXRAX6O7AMGXKX7PP7UFDDOJC7M)





## MindSpore 本地单机多卡训练

> - [MPIRUN命令手册 | hb-lee 的博客](https://hb-lee.github.io/2018/04/08/mpi/)
> - [MindSpore](https://www.mindspore.cn/docs/programming_guide/zh-CN/r1.6/distributed_training_gpu.html#openmpi) 里面介绍了运行的流程，特别注意 `配置分布式环境` 这一节，安装 `OpenMPI` 以及 `NCCL`
> - [Open MPI: Version 4.0](https://www.open-mpi.org/software/ompi/v4.0/)
> - [FAQ: Building Open MPI](https://www.open-mpi.org/faq/?category=building#easy-build) 安装 `OpenMPI`
> - [MindSpore](https://www.mindspore.cn/tutorial/zh-CN/r0.7/advanced_use/distributed_training_gpu.html)
> - [OpenMPI error while loading shared libraries: libopen-rte.so.40解决方案_baidu_27167467的博客-CSDN博客](https://blog.csdn.net/baidu_27167467/article/details/78915886)



```bash
wget https://download.open-mpi.org/release/open-mpi/v4.0/openmpi-4.0.7.tar.gz
tar -zxvf openmpi-4.0.7.tar.gz
cd openmpi-4.0.7
./configure --prefix=/usr/local
sudo make all install
ldconfig

# 删除之前的缓存，防止之后直接读取缓存导致错误
find -name "__pycache__" | xargs rm -r
# 如果报错，重复运行几次即可
# 添加 root 权限，以进行文件的读写
mpirun --allow-run-as-root -n 3 python train_script.py
# 记住以 exit 模式正常退出终端，不要直接 kill 掉！
nohup mpirun --allow-run-as-root -n 3 python train_script.py &
```





## 重头开始训练

> - [models: Models of MindSpore - Gitee.com](https://gitee.com/mindspore/models/tree/master/official/cv/deeplabv3) 华为官方教程

### 数据集准备

主要包括以下两个数据集 `VOC2012` `SBD`，

- VOC2012, http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar
- Semantic Boundaries Dataset and Benchmark, SBD http://www.eecs.berkeley.edu/Research/Projects/CS/vision/grouping/semantic_contours/benchmark.tgz







## 相关资料

- [语义分割之Deeplabv3源码解读_一只帅气的小菜鸡的博客-CSDN博客](https://blog.csdn.net/weixin_42028608/article/details/104956170)
- [mmsegmention数据集存放格式（三）_alex1801的博客-CSDN博客](https://blog.csdn.net/weixin_34910922/article/details/113485773)
- [models/research/deeplab at master · tensorflow/models](https://github.com/tensorflow/models/tree/master/research/deeplab) 数据处理，将 SBD 数据转换为 VOC 格式，得到 VOCaug 数据集进行训练和测试
- [How to use 10,582 trainaug images on DeeplabV3 code? | Starsky's Blog - 11zHexo](https://www.sun11.me/blog/2018/how-to-use-10582-trainaug-images-on-DeeplabV3-code/) 重点参考
- [PASCAL VOC 2012 and SBD (the augment dataset) 总结_lscelory的博客-CSDN博客](https://blog.csdn.net/lscelory/article/details/98180917) 重点参考
- [DeepLabV3网络简析_太阳花的小绿豆的博客-CSDN博客_deeplabv3网络结构](https://blog.csdn.net/qq_37541097/article/details/121797301)



官方教程，

- [02_CV/deeplabv3/deeplabv3.md · MindSpore/course - 码云 - 开源中国](https://gitee.com/mindspore/course/blob/master/02_CV/deeplabv3/deeplabv3.md)
- [official/cv/deeplabv3/default_config.yaml · MindSpore/models - 码云 - 开源中国](https://gitee.com/mindspore/models/blob/master/official/cv/deeplabv3/default_config.yaml)
- [02_CV/deeplabv3/deeplabv3.md · MindSpore/course - Gitee.com](https://gitee.com/mindspore/course/blob/master/02_CV/deeplabv3/deeplabv3.md)
