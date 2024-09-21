# OSTrack 复现

官网：[botaoye/OSTrack: [ECCV 2022] Joint Feature Learning and Relation Modeling for Tracking: A One-Stream Framework](https://github.com/botaoye/OSTrack)



## 1. 安装环境

由于作者体提供了一键安装的脚本，只需要先创建一个最基础的 Python 虚拟环境即可！



```bash
conda create -n ostrack python=3.8

# 1. 将 install.sh 中的 pytorch 修改为
# conda install pytorch==1.10.1 torchvision==0.11.2 torchaudio==0.10.1 cudatoolkit=11.3 -c pytorch -y

# 2. 将其中 pip 指定版本的安装包的版本信息全都去掉，如果版本不兼容，后期再排查重新安装即可！
# pip install thop-0.0.31.post2005241907
# pip install setuptools==59.5.0

# 3. 使用脚本一键执行安装！
conda activate ostrack
bash install.sh
```

> 注意：使用 conda 安装 PyTorch 时，注意最后的 `-c conda-forge` 去掉！否则会很慢很慢，默认使用指定的下载源 `conda-forge`！



安装过程中可能会报以下 Error/Warnings，

```bash
Installing collected packages: PyYAML
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
scalabel 0.3.0 requires boto3, which is not installed.
scalabel 0.3.0 requires matplotlib, which is not installed.
scalabel 0.3.0 requires motmetrics, which is not installed.
scalabel 0.3.0 requires pandas, which is not installed.
scalabel 0.3.0 requires psutil, which is not installed.
scalabel 0.3.0 requires pycocotools, which is not installed.
scalabel 0.3.0 requires pyparsing, which is not installed.
scalabel 0.3.0 requires python-dateutil, which is not installed.
scalabel 0.3.0 requires requests, which is not installed.
scalabel 0.3.0 requires scikit-image, which is not installed.
scalabel 0.3.0 requires tabulate, which is not installed.
scalabel 0.3.0 requires tqdm, which is not installed.
mmcv-full 1.4.6 requires opencv-python>=3, which is not installed.
mmcv-full 1.4.6 requires packaging, which is not installed.
mmcv-full 1.4.6 requires yapf, which is not installed.
Successfully installed PyYAML-6.0

Installing collected packages: opencv-python
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
mmcv-full 1.4.6 requires packaging, which is not installed.
mmcv-full 1.4.6 requires yapf, which is not installed.
Successfully installed opencv-python-4.6.0.66

Installing collected packages: pytz, python-dateutil, pandas
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
scalabel 0.3.0 requires boto3, which is not installed.
scalabel 0.3.0 requires matplotlib, which is not installed.
scalabel 0.3.0 requires motmetrics, which is not installed.
scalabel 0.3.0 requires psutil, which is not installed.
scalabel 0.3.0 requires pycocotools, which is not installed.
scalabel 0.3.0 requires pyparsing, which is not installed.
scalabel 0.3.0 requires requests, which is not installed.
scalabel 0.3.0 requires scikit-image, which is not installed.
scalabel 0.3.0 requires tabulate, which is not installed.
scalabel 0.3.0 requires tqdm, which is not installed.
Successfully installed pandas-1.4.4 python-dateutil-2.8.2 pytz-2022.2.1

Installing collected packages: pyparsing, kiwisolver, fonttools, cycler, packaging, matplotlib, pycocotools
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
scalabel 0.3.0 requires boto3, which is not installed.
scalabel 0.3.0 requires motmetrics, which is not installed.
scalabel 0.3.0 requires psutil, which is not installed.
scalabel 0.3.0 requires requests, which is not installed.
scalabel 0.3.0 requires scikit-image, which is not installed.
scalabel 0.3.0 requires tabulate, which is not installed.
mmcv-full 1.4.6 requires yapf, which is not installed.
Successfully installed cycler-0.11.0 fonttools-4.37.1 kiwisolver-1.4.4 matplotlib-3.5.3 packaging-21.3 pycocotools-2.0.4 pyparsing-3.0.9

Installing collected packages: tensorboard-plugin-wit, pyasn1, zipp, urllib3, tensorboard-data-server, rsa, pyasn1-modules, protobuf, oauthlib, MarkupSafe, idna, grpcio, charset-normalizer, cachetools, absl-py, werkzeug, requests, importlib-metadata, google-auth, requests-oauthlib, markdown, google-auth-oauthlib, tb-nightly
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
scalabel 0.3.0 requires boto3, which is not installed.
scalabel 0.3.0 requires motmetrics, which is not installed.
scalabel 0.3.0 requires psutil, which is not installed.
scalabel 0.3.0 requires scikit-image, which is not installed.
scalabel 0.3.0 requires tabulate, which is not installed.
flask 2.1.3 requires click>=8.0, which is not installed.
flask 2.1.3 requires Jinja2>=3.0, which is not installed.
Successfully installed MarkupSafe-2.1.1 absl-py-1.2.0 cachetools-5.2.0 charset-normalizer-2.1.1 google-auth-2.11.0 google-auth-oauthlib-0.4.6 grpcio-1.48.1 idna-3.3 importlib-metadata-4.12.0 markdown-3.4.1 oauthlib-3.2.0 protobuf-3.19.4 pyasn1-0.4.8 pyasn1-modules-0.2.8 requests-2.28.1 requests-oauthlib-1.3.1 rsa-4.9 tb-nightly-2.11.0a20220907 tensorboard-data-server-0.6.1 tensorboard-plugin-wit-1.8.1 urllib3-1.26.12 werkzeug-2.2.2 zipp-3.8.1

Installing collected packages: pathtools, smmap, shortuuid, setproctitle, sentry-sdk, psutil, promise, docker-pycreds, Click, gitdb, GitPython, wandb
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
scalabel 0.3.0 requires boto3, which is not installed.
scalabel 0.3.0 requires motmetrics, which is not installed.
scalabel 0.3.0 requires scikit-image, which is not installed.
scalabel 0.3.0 requires tabulate, which is not installed.
flask 2.1.3 requires Jinja2>=3.0, which is not installed.
Successfully installed Click-8.1.3 GitPython-3.1.27 docker-pycreds-0.4.0 gitdb-4.0.9 pathtools-0.1.2 promise-2.3 psutil-5.9.2 sentry-sdk-1.9.8 setproctitle-1.3.2 shortuuid-1.0.9 smmap-5.0.0 wandb-0.13.2
```

可以先不用管！后面如果运行不起来再回过头来解决！切记只要没有自动中断安装包，就不要手动中断去安装提示缺少的安装包！！！

只要最后提示 *Successfully installed* 即可！



## 2. 准备数据 + 测试

注意：测试的时候是不会运行到 `objective` 损失函数部分的。所以如果需要调试这部分，必须先把 `Train` 跑起来！



### 2.1 准备数据

> 数据准备一般都是通过创建软链接的方式！创建的链接就是一个简单的文件，但是切记不到使用 Tab 补全之后的文件夹名称（要将后面的 `/` 去掉！否则可能会将原来的数据和现在的数据绑定到一起，到时候造成误删！而且这样还会在原来的 src 下创建一个红色的文件！）



按照 `README` 中创建数据文件夹目录树，

```bash
mkdir data & cd data

ln -sf /data/coco coco
ln -sf /data/LaSOT lasot
ln -sf /data/GOT-10k got10k
ln -sf /data/TrackingNet trackingnet

(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack/data$ ls
coco  got10k  lasot  trackingnet
(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack$ tree -d data
data
├── coco -> /data/coco
├── got10k -> /data/GOT-10k
├── lasot -> /data/LaSOT
└── trackingnet -> /data/TrackingNet

4 directories
(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack$ 
```



`ln` 帮助文档，

```bash
用法：ln [选项]... [-T] 目标 链接名
　或：ln [选项]... 目标
　或：ln [选项]... 目标... 目录
　或：ln [选项]... -t 目录 目标...
在第一种格式中，创建具有指定<链接名>且指向指定<目标>的链接。
在第二种格式中，在当前目录创建指向<目标>位置的链接。
在第三、四种格式中，在指定<目录>中创建指向指定<目标>的链接。
默认创建硬链接，当使用--symbolic 时创建符号链接。
默认情况下，创建每个目标时不应存在与新链接的名称相同的文件。
创建硬链接时，每个指定的<目标>都必须存在。符号链接可以指向任意的位置；
当链接解析正常时，将其解析为一个相对于其父目录的相对链接。

必选参数对长短选项同时适用。
      --backup[=CONTROL]      为每个已存在的目标文件创建备份文件
  -b                          类似--backup，但不接受任何参数
  -d, -F, --directory         允许超级用户尝试创建指向目录的硬链接
                              （注意：此操作可能因系统限制而失败)
  -f, --force                 强行删除任何已存在的目标文件
  -i, --interactive           删除目标文件前进行确认
  -L, --logical               如目标为符号链接，本次创建链接时将其解引用
  -n, --no-dereference        如果给定<链接名>是一个链接至某目录的符号链接，
                                将其作为普通文件处理
  -P, --physical              创建直接指向符号链接文件的硬链接
  -r, --relative              创建相对于链接位置的符号链接
  -s, --symbolic              创建符号链接而非硬链接
  -S, --suffix=后缀           自行指定备份文件的后缀
  -t, --target-directory=目录  在指定<目录>中创建链接
  -T, --no-target-directory   总是将给定的<链接名>当作普通文件
  -v, --verbose               列出每个链接的文件名称
      --help            显示此帮助信息并退出
      --version         显示版本信息并退出

备份文件的后缀为"~"，除非以--suffix 选项或是 SIMPLE_BACKUP_SUFFIX
环境变量指定。版本控制的方式可通过--backup 选项或 VERSION_CONTROL 环境
变量来选择。以下是可用的变量值：

  none, off       不进行备份(即使使用了--backup 选项)
  numbered, t     备份文件加上数字进行排序
  existing, nil   若有数字的备份文件已经存在则使用数字，否则使用普通方式备份
  simple, never   永远使用普通方式备份

使用 -s 选项会忽略 -L 和 -P。
否则当<目标>为一个符号链接（默认为 -P）时，会由最后一个指定的选项来控制行为。

GNU coreutils 在线帮助：<https://www.gnu.org/software/coreutils/>
请向 <http://translationproject.org/team/zh_CN.html> 报告 ln 的翻译错误
完整文档请见：<https://www.gnu.org/software/coreutils/ln>
或者在本地使用：info '(coreutils) ln invocation'
```



### 2.2 下载模型，准备测试

模型下载地址：[models - Google 云端硬盘](https://drive.google.com/drive/folders/1ttafo0O5S9DXK2PX0YqPvPrQ-HWJjhSy)

本次测试所使用的模型为：https://drive.google.com/file/d/1jwTLPiwj_r7KkAYIFdH9lkbt1JH5MhGC/view?usp=sharing



按照官方的说明，将下载好的模型放到指定的文件夹中（文件夹名称必须一致，不然可能找不到；个人猜想使用 kwargs 中的参数作为引导），

```bash
mkdir -p output/checkpoints/train/ostrack

# 将下载的模型移动到该文件夹下面
(base) guest@guest-server:~/XieBailian/mnt/checkpoint/OSTrack$ cp -r vitb_256_mae_ce_32x4_got10k_ep100 ~/XieBailian/proj/OSTrack/output/checkpoints/train/ostrack/
```



#### Set project paths

Run the following command to set paths for this project

```bash
(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack$ python tracking/create_default_local_file.py --workspace_dir . --data_dir ./data --save_dir ./output
WARNING: You are using tensorboardX instead sis you have a too old pytorch version.
(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack$ 
```

> 这里的 `WARNING` 不影响！



After running this command, you can also modify paths by editing these two files

```python
lib/train/admin/local.py  # paths about training
lib/test/evaluation/local.py  # paths about testing
```

Change the corresponding values of `lib/test/evaluation/local.py` to the actual benchmark saving paths.

其实，只要按照作者文档中描述的来操作，数据集这样布置好，就基本上不需要修改 `local.py` 中的内容了！



#### Some testing examples:

- LaSOT or other off-line evaluated benchmarks (modify `--dataset` correspondingly)

```bash
python tracking/test.py ostrack vitb_384_mae_ce_32x4_ep300 --dataset lasot --threads 16 --num_gpus 4
python tracking/analysis_results.py # need to modify tracker configs and names
```

- GOT10K-test

```bash
python tracking/test.py ostrack vitb_384_mae_ce_32x4_got10k_ep100 --dataset got10k_test --threads 16 --num_gpus 4
python lib/test/utils/transform_got10k.py --tracker_name ostrack --cfg_name vitb_384_mae_ce_32x4_got10k_ep100
```

- TrackingNet

```bash
python tracking/test.py ostrack vitb_384_mae_ce_32x4_ep300 --dataset trackingnet --threads 16 --num_gpus 4
python lib/test/utils/transform_trackingnet.py --tracker_name ostrack --cfg_name vitb_384_mae_ce_32x4_ep300
```

> `ostrack` 后面不同的参数对应着不同的数据集，对应着不同的 预训练模型！



实验中下载的预训练模型是 `got10k` 的，因此使用第二个 `e.g.` 进行测试（注意需要修改一些参数，比如 `GPU` 以及 `patch_size`），

```bash
python tracking/test.py ostrack vitb_256_mae_ce_32x4_got10k_ep100 --dataset got10k_test --threads 16 --num_gpus 3
```



debug 模式运行，

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "TEST",
            "type": "python",
            "request": "launch",
            "program": "tracking/test.py",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                "ostrack",
                "vitb_256_mae_ce_32x4_ep300",
                "--dataset",
                "got10k_test",
                "--threads",
                // "1",  // debug
                "9",
                "--num_gpus",
                // "1",  // debug
                "3",
            ],
        },
        {
            // 这种运行方式无法进行调试！
            "name": "TRAIN",
            "type": "python",
            "request": "launch",
            "program": "tracking/train.py",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                "--script",
                "ostrack",
                "--config",
                "vitb_256_mae_ce_32x4_ep300", // 注意此处的名称不要和下载测试的预训练模型重复了，否则会被覆盖！
                "--save_dir",
                "./output",
                "--mode",
                "multiple", // 一般训练的时候只能使用该模式，单 GPU 无法加载数据集和模型
                "--nproc_per_node",
                "3",
                "--use_wandb",
                "0"
            ],
        },
        {
            // 这种方式参考 tracking/train.py main() 中的启动脚本
            // 由于知道是多 multiple 方式，直接以这条启动脚本为参考进行修改
            // 将所需要的参数补全即可！
            // 注意：需要注意 parse_args() 中有默认的参数，必须的参数不能漏掉！
            "name": "TRAIN_MANU",
            "type": "python",
            "request": "launch",
            // "program": "/home/guest/anaconda3/envs/ostrack/lib/python3.8/site-packages/torch/distributed/launch.py",
            "program": "launch.py", // 直接 copy 一份！以后都这样操作，只要是以 python -m launch.py 运行的话！
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                // 以下这个参数配置必须放在最前面！
                "--nproc_per_node",
                "2",
                "--master_port",
                "20000",
                "lib/train/run_training.py",
                "--use_lmdb",
                "0",
                // 以下这个默认都没有参数，可以不用添加！
                // "--script_prv",
                "--config_prv",
                "baseline",
                "--distill",
                "0",
                // 以下这些默认都没有参数，可以不用添加！
                // "--script_teacher",
                // "--config_teacher",
                // 以上是新增的
                "--script",
                "ostrack",
                "--config",
                "vitb_256_mae_ce_32x4_ep300", // 注意此处的名称不要和下载测试的预训练模型重复了，否则会被覆盖！
                "--save_dir",
                "./output",
                "--use_wandb",
                "0"
            ],
        },
        {
            "name": "TRAIN_MANU_GOT10k",
            "type": "python",
            "request": "launch",
            "program": "launch.py",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                // 以下这个参数配置必须放在最前面！
                "--nproc_per_node",
                "2",
                "--master_port",
                "20000",
                "lib/train/run_training.py",
                "--use_lmdb",
                "0",
                // 以下这个默认都没有参数，可以不用添加！
                // "--script_prv",
                "--config_prv",
                "baseline",
                "--distill",
                "0",
                // 以下这些默认都没有参数，可以不用添加！
                // "--script_teacher",
                // "--config_teacher",
                // 以上是新增的
                "--script",
                "ostrack",
                "--config",
                "vitb_256_mae_ce_32x4_got10k_ep100", // 注意此处的名称不要和下载测试的预训练模型重复了，否则会被覆盖！
                "--save_dir",
                "./output",
                "--use_wandb",
                "0"
            ],
        },
    ]
}
```



### 2.3 一些 Bug

> [AttributeError: module 'distutils' has no attribute 'version'](https://blog.csdn.net/qq_36944952/article/details/124683408)

```bash
WARNING: You are using tensorboardX instead sis you have a too old pytorch version.

pip uninstall tensorboardX & pip install tensorboard setuptools==59.5.0
```







## 3. 训练 OSTrack

Download pre-trained [MAE ViT-Base weights](https://dl.fbaipublicfiles.com/mae/pretrain/mae_pretrain_vit_base.pth) and put it under `$PROJECT_ROOT$/pretrained_models` (different pretrained models can also be used, see [MAE](https://github.com/facebookresearch/mae) for more details).

```bash
# 直接 copy 已经下载好的预训练模型
scp -r pretrained_models A6000:~/blxie/proj/ostrack

mkdir pretrained_models
(ostrack) guest@guest-server:~/XieBailian/proj/OSTrack$ cp ~/XieBailian/mnt/checkpoint/OSTrack/mae_pretrain_vit_base.pth pretrained_models/

python tracking/train.py --script ostrack --config vitb_256_mae_ce_32x4_ep300 --save_dir ./output --mode multiple --nproc_per_node 4 --use_wandb 1
```

Replace `--config` with the desired model config under `experiments/ostrack`. We use [wandb](https://github.com/wandb/client) to record detailed training logs, in case you don't want to use wandb, set `--use_wandb 0`.



#### 相关术语

- `multiple` 表示单机多节点；
- `multi_node` 表示多机多节点；



#### Bug 及解决方案

提示：所有的日志文件都在 `tensorboard` 目录下，包括 `test` 所产生的日志！

> ```bash
> ERROR: Could not read image "/data/users/XieBailian/proj/OSTrack/data/coco/images/train2017/000000193931.jpg"
> OpenCV(4.6.0) /io/opencv/modules/imgproc/src/color.cpp:182: error: (-215:Assertion failed) !_src.empty() in function 'cvtColor'
> ```
>
> A: `coco` 数据集路径不对，日志中多了一个 `images` 文件夹，但是服务器上并没有这样管理！因此，只需要找到 `dataloader -- coco` 相关的处理模块，然后在这里面修改下路径即可！
>
> 具体而言，是在 `lib/train/dataset/coco_seq.py`，
>
> ```python
> # XBL changed;
> # self.img_pth = os.path.join(root, 'images/{}{}/'.format(split, version))
> self.img_pth = os.path.join(root, '{}{}/'.format(split, version))
> ```



> ```bash
> FileNotFoundError: [Errno 2] No such file or directory: '/data/users/XieBailian/proj/OSTrack/data/lasot/airplane/airplane-3/groundtruth.txt'
> ```
>
> A: 同上，指定正确的 `lasot_train` 路径即可（对应 `lasot -- LaSOTBenchmark`）
>
> 在 `lib/train/admin/local.py`，
>
> ```python
> # XBL changed;
> # self.lasot_dir = '/data/users/XieBailian/proj/OSTrack/data/lasot'
> self.lasot_dir = '/data/users/XieBailian/proj/OSTrack/data/lasot/LaSOTBenchmark'
> ```



保存后，重新开始训练即可！训练时默认将 `wandb` 可视化开启。



#### 相关 warning 解决

> ```bash
> /data/users/XieBailian/proj/OSTrack/lib/train/../../lib/models/layers/head.py:184: UserWarning: __floordiv__ is deprecated, and its behavior will change in a future version of pytorch. It currently rounds toward 0 (like the 'trunc' function NOT 'floor'). This results in incorrect rounding for negative values. To keep the current behavior, use torch.div(a, b, rounding_mode='trunc'), or for actual floor division, use torch.div(a, b, rounding_mode='floor').
>   idx_y = idx // self.feat_sz
> ```
>
> A: 按照提示进行修改即可，在 `lib/models/layers/head.py`，
>
> ```python
> # XBL changed;
> # idx_y = idx // self.feat_sz
> idx_y = torch.div(idx, self.feat_sz, rounding_mode='floor')
> ```



> ```bash
> /home/guest/anaconda3/envs/ostrack/lib/python3.8/site-packages/torch/utils/data/dataloader.py:478: UserWarning: This DataLoader will create 10 worker processes in total. Our suggested max number of worker in current system is 8, which is smaller than what this DataLoader is going to create. Please be aware that excessive worker creation might get DataLoader running slow or even freeze, lower the worker number to avoid potential slowness/freeze if necessary.
> ```
>
> A: 这个 warning 解决需要简单思考下，`worker` 是在那里进行设置的，可以参考上面的日志，从而定位到 `experiments/ostrack/vitb_256_mae_ce_32x4_ep300.yaml`，修改其中的 `NUM_WORKER` 参数即可，
>
> ```python
> # XBL cahnged;
> # NUM_WORKER: 10
> NUM_WORKER: 8
> ```





#### 目前遇到的问题

> `lib/train/actors/ostrack.py` 中的断点 `out_dict = self.net(template=template_list,` 并未执行到！
>
> 既然如此，那是否使用到了 focal loss？

目前猜想：可能时由于通过 `os.system(train_cmd)` 调用的命令来运行的 `run_training.py`，因为是 单机多卡模式，所以调试挺麻烦。参考：[VS Code中如何调试pytorch分布式训练脚本torch.distributed_钱彬 (Qian Bin)的博客-CSDN博客](https://blog.csdn.net/qianbin3200896/article/details/108182504)

通过在 `main.py` 中设置断点，验证了以上猜想，当执行到 `os.system(train_cmd)` 之后，就无法通过 `VSCode` 的调试模式进行追踪了！



目前的想法是直接将所有的参数写入到 `launch.json` ，然后调试即可，

```json
{
    "name": "TRAIN_MANU",
    "type": "python",
    "request": "launch",
    "program": "/home/guest/anaconda3/envs/ostrack/lib/python3.8/site-packages/torch/distributed/launch.py",
    "console": "integratedTerminal",
    "justMyCode": true,
    "args": [
        // 以下这个参数配置必须放在最前面！
        "--nproc_per_node",
        "3",
        
        "--master_port",
        "20000",
        
        "lib/train/run_training.py",
        
        "--use_lmdb",
        "0",
        
        // 以下这个默认都没有参数，可以不用添加！
        // "--script_prv",
        
        "--config_prv",
        "baseline",
        
        "--distill",
        "0",
        // 以下这些默认都没有参数，可以不用添加！
        // "--script_teacher",
        // "--config_teacher",
        // 以上是新增的
        
        "--script",
        "ostrack",
        
        "--config",
        "vitb_256_mae_ce_32x4_ep300", // 注意此处的名称不要和下载测试的预训练模型重复了，否则会被覆盖！
        
        "--save_dir",
        "./output",
        
        // "--mode",
        // "multiple", // 一般训练的时候只能使用该模式，单 GPU 无法加载数据集和模型
        
        "--use_wandb",
        "0"
    ],
    "env": {
        "PYTHONPATH": "${workspaceFolder}",
        "CUDA_VISIBLE_DEVICES": "0,1,2",
    }
},
```



####  error

> ```bash
> run_training.py: error: argument --script_teacher: expected one argument
> ```
>
> 删除或者注释这些参数即可！
>
> ```json
> // "--mode",
> // "multiple",
> // "--script_prv",
> // "--script_teacher",
> // "--config_teacher",
> ```



> ```bash
> run_training.py: error: unrecognized arguments: --mode multiple --nproc_per_node 3
> ```
>
> 将以下配置移到最前面！
>
> ```json
> "--nproc_per_node",
> "3",
> ```





## 结语



复现该论文的初衷是，

1. 搞清楚 tracking 中是如何使用 focal loss 的；
2. 看看 OSTrack 的效果是否和论文中描述的一样好；
3. 结合论文加深对 one-stage & one-stream 的理解；













