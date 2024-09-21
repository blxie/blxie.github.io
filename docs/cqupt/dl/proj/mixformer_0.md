### 2023/2/11: 8ECBs + L + initialized + $320 \times 128$

```shell
python tracking/train.py --script fpnt --config finetuning --save_dir output/debug --mode multiple --nproc_per_node 1

python tracking/train.py --script fpnt --config finetuning --save_dir output/20230211-8ecb-L-320 --mode multiple --nproc_per_node 4
```

```yaml
DATA:
    MAX_SAMPLE_INTERVAL: 200
    MEAN:
        - 0.485
        - 0.456
        - 0.406
    SEARCH:
        CENTER_JITTER: 4.5
        FACTOR: 5.0
        SCALE_JITTER: 0.5
        SIZE: 320
    STD:
        - 0.229
        - 0.224
        - 0.225
    TEMPLATE:
        CENTER_JITTER: 0
        FACTOR: 2.0
        SCALE_JITTER: 0
        SIZE: 128
        NUMBER: 1
    TRAIN:
        DATASETS_NAME:
            - GOT10K_vottrain
            - LASOT
            - COCO17
            - TRACKINGNET
        DATASETS_RATIO:
            - 1
            - 1
            - 1
            - 1
        SAMPLE_PER_EPOCH: 60000
    VAL:
        DATASETS_NAME:
            - GOT10K_votval
        DATASETS_RATIO:
            - 1
        SAMPLE_PER_EPOCH: 10000
MODEL:
    NUM_OBJECT_QUERIES: 1 # use when tokenHead is applied.
    POSITION_EMBEDDING: sine
    PREDICT_MASK: false
    BACKBONE:
        PRETRAINED: "pretrained/p2t_large.pth"
        PRETRAINED_PATH: "pretrained/p2t_large.pth" #'/home/cyt/project/CvtT/models/CvT-21-384x384-IN-22k.pth'
        INIT: "trunc_norm"
        # TODO: 根据实际情况进行修改！
        STRIDE: 16
        NUM_STAGES: 3
        PATCH_SIZE: [7, 3, 3, 3]
        # 注意最后一个必须为 1，否则和 head 里面的 feat_sz(20) 不匹配，设置为 2 会减半
        PATCH_STRIDE: [4, 2, 2, 1]
        PATCH_PADDING: [2, 1, 1, 1]
        DIM_EMBED: [64, 128, 320, 512]
        NUM_HEADS: [1, 3, 6, 6]
        DEPTH: [1, 4, 16, 16]
        MLP_RATIO: [4.0, 4.0, 4.0, 4.0]
        ATTN_DROP_RATE: [0.0, 0.0, 0.0, 0.0]
        DROP_RATE: [0.0, 0.0, 0.0, 0.0]
        DROP_PATH_RATE: [0.0, 0.0, 0.1, 0.1]
        QKV_BIAS: [True, True, True, True]
        CLS_TOKEN: [False, False, False, False]
        POS_EMBED: [False, False, False, False]
        QKV_PROJ_METHOD: ["dw_bn", "dw_bn", "dw_bn", "dw_bn"]
        KERNEL_QKV: [3, 3, 3, 3]
        PADDING_KV: [1, 1, 1, 1]
        STRIDE_KV: [2, 2, 2, 2]
        PADDING_Q: [1, 1, 1, 1]
        STRIDE_Q: [1, 1, 1, 1]
        # XBL add;
        LAST_STAGE: [False, False, False, True]
        FREEZE_BN: true
    HEAD:
        TYPE: CENTER
        NUM_CHANNELS: 320
    HEAD_TYPE: CENTER
    HIDDEN_DIM: 320

TRAIN:
    BACKBONE_MULTIPLIER: 0.1
    # XBL comment; 1 for debug
    # 8 for 2080ti (maybe 10), 32 for tesla V100(32 G)
    BATCH_SIZE: 32
    DEEP_SUPERVISION: false
    EPOCH: 500
    GIOU_WEIGHT: 2.0
    GRAD_CLIP_NORM: 0.1
    L1_WEIGHT: 5.0
    # LR: 0.0001
    # LR_DROP_EPOCH: 400
    ## TODO: 设置为 2^n 更方便，比如 0.004
    LR: 0.001
    LR_DROP_EPOCH: 400
    # XBL comment; 1 for debug
    # 如果 dataloader 线程数设置为 0，那么在 main_process 中加载数据，用一点加载一点
    # 否则提前加载到 RAM 中，需要的时候直接从 RAM 中读取
    NUM_WORKER: 8
    OPTIMIZER: ADAMW
    PRINT_INTERVAL: 50
    SCHEDULER:
        TYPE: step
        DECAY_RATE: 0.1
    VAL_EPOCH_INTERVAL: 5
    WEIGHT_DECAY: 0.0001  # 保持不变，一般都设置为 1e-4

TEST:
    EPOCH: 500
    SEARCH_FACTOR: 5.0
    SEARCH_SIZE: 320
    TEMPLATE_FACTOR: 2.0
    TEMPLATE_SIZE: 128
    UPDATE_INTERVALS:
        LASOT: [200]
        GOT10K_TEST: [200]
        TRACKINGNET: [25]
        VOT20: [10]
        VOT20LT: [200]

```

