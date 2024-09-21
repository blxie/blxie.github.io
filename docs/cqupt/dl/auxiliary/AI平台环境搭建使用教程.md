## 准备数据

VOC 数据集下载地址：http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar



在 https://airportal.cn/ 注册一个账号（否则不能传输大文件），将以上下载的数据集和实验源代码上传到该网站，选择 `发送` 即可，等待上传完毕之后，会生成一个 取件码，在下载之前，不要关闭该网页，也不要点击完成！

![image-20221117121946684](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171220082.png?token=AKMXRARZCLGFJV4A2KIW6XTDOW3LC)



## 使用云平台环境

登录 AI 实验平台，准备配置实验环境，

![image-20221117122413188](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171224378.png?token=AKMXRAQI2FDEZWWUFKFKF53DOW33C)



选择 `课程目录 -- 第 1 章 -- 开始实验`，进入 云环境，

![image-20221117125353140](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171426618.png)

![image-20221117130200065](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171302958.png?token=AKMXRAUXCG7DRDB5W2YTSNDDOXAJA)



由于截图限制，不方便注释，红色框框住的那一栏是实验中特别要注意的几项，

- 最上面的是当前实验所剩余的时间，这里并不是说总的时间只有这么点，只是每一次的实验时间只有这么长，可以重复做多次；但是就像截图中的注释所描述的那样，必须及时保存实验状态！
- 删除实验：这个就不要用了哈
- 保存实验：看截图注释
- 临时关闭：偶尔可以用到，比如说我当前有点事需要离开，就可以选择这个；不会继续减少剩余的实验时间，并且下次继续实验的时候会恢复上一次退出时的状态。但是请注意：如果没有保存实验，当剩余的实验时间结束之后，被强制退出的话，之前的都白做！
- 下面的就 `桌面全屏` 可以用用，上传和下载测试过，用不了



进入 云环境 之后（可以联网），随便打开一个浏览器，输入之前的文件传输地址  https://airportal.cn/ （注意：云平台和主机之间是不支持剪贴板公用的，也就是无法相互粘贴复制；如果觉得工具栏挡住视野，点击 `工具栏` 即可折叠），

![image-20221117132210341](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171322674.png?token=AKMXRAVC3MRYC7I3QOSWB23DOXCUG)



默认存放在 `root/Downloads` 目录下，

![image-20221117132407328](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171424340.png)



其他文件/数据集上传按照此方法操作即可。



### 安装 Python 以及 MindSpore

首先配置 `pip` 的下载源（由于不能直接粘贴复制到云平台，这么多的命令也挺麻烦，可以把这些命令在主机上统一记录到一个 `.txt` 文件中，然后通过上面的文件传输上传到云平台，云平台里面可以使用粘贴复制，就不用手动输入这么多的命令了），

![image-20221117135350312](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171353292.png?token=AKMXRAWZ2M37E52A37PDHDTDOXGK6)

```bash
mkdir ~/.pip/
gedit ~/.pip/pip.conf

## 填入以下内容，然后保存退出
[global]
index-url = https://repo.huaweicloud.com/repository/pypi/simple
trusted-host = repo.huaweicloud.com
timeout = 120
##

################################
## 创建一个 mindspore 环境
conda create -n mindspore python==3.7
conda activate mindspore

## 安装 mindspore：https://www.mindspore.cn/install
conda activate mindspore
# for Linux CPU
pip install https://ms-release.obs.cn-north-4.myhuaweicloud.com/1.5.0/MindSpore/cpu/x86_64/mindspore-1.5.0-cp37-cp37m-linux_x86_64.whl --trusted-host ms-release.obs.cn-north-4.myhuaweicloud.com -i https://pypi.tuna.tsinghua.edu.cn/simple

## 安装相关的包
pip install ipython jupyter ipykernel easydict opencv-python matplotlib

## jupyter notebook 配置
# 将虚拟环境 kernel 添加到 ipykernel 中
python -m ipykernel install --user --name mindspore --display-name "MindSpore(1.5.0)"
```

![image-20221117134134545](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171425899.png)



这样一步一步往下安装就好，只是要注意每一行要看清楚，`gedit` 打开的文件如果行的字符超过限定的数目，会自动换行，可以直接放到最大方便查看，

![image-20221117135553732](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171355004.png?token=AKMXRAWQSDBY52WKGG4G6B3DOXGSY)

![image-20221117134532310](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171345520.png?token=AKMXRATZNGLCJ6PTKBJ5JS3DOXFME)

![image-20221117134721604](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171424375.png)



将实验源代码移动到 `jupyter notebook` 运行的根目录（直接拖拽到指定目录即可），

![image-20221117140225756](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171424136.png)



然后在终端输入（到这里剩余实验时间没剩多少，及时保存实验状态！），

```bash
jupyter notebook --allow-root
```

![image-20221117140822181](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171408923.png?token=AKMXRAQZIRINI2JFD5676J3DOXIBQ)

![image-20221117140734623](https://raw.githubusercontent.com/blxie/markd_img/master/img/202211171407028.png?token=AKMXRAQC55NDLZFR4CGJJHTDOXH6S)

后面就可以直接运行代码文件了。

















