# STARK2020





# STARK_LT2021



## 测试运行 VOT

3个源文件：

- `exp.sh`

```shell
vot evaluate --workspace . stark_st101
vot analysis --workspace . stark_st101 --format html
```

- `trackers.ini` 比较重要，每次初始化后内容都为空，需要重新写入相应的配置

```yaml
[stark_st101]  # <tracker-name>
label = stark_st101
protocol = traxpython
command = stark_st101
# Specify a path to trax python wrapper if it is not visible (separate by ; if using multiple paths)
path = /home/guest/XieBailian/proj/stark/lib/test/vot20
```

- `config.yaml` 不是很重要，每次都会自动生成

```yaml
registry:
- ./trackers.ini
stack: vot2020
```





> 重要概念：workspace!!!

### 1. 进入 workspace，安装 trax

```bash
pip install trax>=3.0.2
```



### 2. 初始化 workspace

```bash
vot initialize <stack_name> --workspace <workspace_path> [--nodownload]

# 数据集名称为：vot2013-2022, votlt2019-2021(vot2022在vot2022文件夹下 lt 中)
# --nodownload 只是初始化时才有的参数，指定不下载数据集
vot initialize vot2020 --workspace . --nodownload
```

初始化成功会生成两个配置文件 `config.yaml` `trackers.ini`，以及两个文件夹 `sequence` `result`.

这里我们需要修改的是 `trackers.ini`，将当前 `workspace` 链接到自己的 `tracker` 下面。

```bash
[stark_st101]  # tracker names 按照列表的形式存储
label = stark_st101
protocol = traxpython
command = stark_st101
# Specify a path to trax python wrapper if it is not visible (separate by ; if using multiple paths)
# 一般情况只需要修改 paths 即可
# paths = <PATH_OF_tracker>/lib/test/vot20
path = /home/guest/XieBailian/proj/stark/lib/test/vot20  # 自己的 tracker path
```

### 3. 执行 evaluate

```bash
vot evaluate --workspace <workspace_path> <tracker_name>

# e.g.
vot evaluate --workspace . stark_st101
```

出现的问题及解决方法：

#### 1. 数据集自动下载并卡死，报网络错误

解决方法：更改 `vot-toolkit` 源码！

> 原因：初始化 `workspace` 时，又去检查了指定 `workspace` 下是否有指定的数据集，如果没有，就会一直重复下载，然而我们已经手动下载完成，不需要再下载！

`vot/workspace/__init__.py` 的 `155-156` 行注释掉，手动设置 `data_directory` 的绝对路径。

```python
dataset_directory = "/data/VOT2020"
```

目前到这里。