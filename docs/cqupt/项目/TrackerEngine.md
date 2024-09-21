- [x] 多客户端测试
- [ ] 名字更改
- [ ] README
- [ ] 英文注释





## 最终版

### track_demo.py

```python
"""
客户端要实现的功能：
    1. 上传数据 data
        - video path in client
        - initial bbox
    2. 接收服务器传回的数据
        - 通信消息 msg
        - bbox
"""
import argparse
import base64
import cv2
import os
import socket
import json
import tqdm
import shutil

from pathlib import Path


def run_track(
    client_socket: socket.socket,
    video_capture,
    video_path,
    save_img,
    win_name,
):
    selected_roi = None  # 用于存储用户选择的矩形框坐标
    video_path = Path(video_path)

    res_dir = os.path.join("track_res", Path(video_path).stem)
    img_save_path = os.path.join(res_dir, "images")
    if os.path.exists(img_save_path):
        shutil.rmtree(img_save_path)
    else:
        os.makedirs(img_save_path)

    data = {'video_name': Path(video_path).name}
    data = json.dumps(data).encode()
    client_socket.sendall(base64.b64encode(data))

    i = 1
    while True:
        response_base64 = client_socket.recv(1024)
        response_data = base64.b64decode(response_base64).decode()
        js_data = json.loads(response_data)
        print(js_data)

        if "upload" in js_data and js_data["upload"] == True:
            file_size = os.path.getsize(video_path)
            file_size_bytes = file_size.to_bytes(4, 'big')  # 将文件大小转换为4字节的字节序列
            client_socket.sendall(file_size_bytes)  # 发送文件大小信息

            with open(video_path, "rb") as file:
                progress = tqdm.tqdm(
                    range(file_size),
                    f"Uploading {Path(video_path).name}",
                    unit="B",
                    unit_scale=True,
                    unit_divisor=1024,
                )
                while True:
                    data = file.read(1024)  # 每次读取 1024 字节数据
                    if not data:
                        break

                    client_socket.sendall(data)  # 发送数据
                    progress.update(len(data))

                progress.close()
                print("上传完毕！")

        if i == 1 and "draw_bbox" in js_data and js_data["draw_bbox"]:
            cv2.namedWindow(win_name, cv2.WINDOW_NORMAL)
            cv2.resizeWindow(win_name, 960, 540)
            ret, frame = video_capture.read()
            if frame is None:
                break
            cv2.putText(frame, "Select a ROI and then press SPACE or ENTER button!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 0, 255), 2)
            cv2.imshow(win_name, frame)
            cv2.waitKey(1)

            selected_roi = cv2.selectROI(win_name, frame)
            # 发送矩形框坐标和视频文件路径
            data = {'roi': selected_roi}
            data = json.dumps(data).encode()
            client_socket.sendall(base64.b64encode(data))

            x, y, w, h = selected_roi
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            cv2.imwrite(f"{img_save_path}/{1:04d}.jpg", frame)
            with open(f"{res_dir}/results.txt", "w") as file:
                bbox_str = f"{x},{y},{w},{h}\n"
                file.write(bbox_str)

        if "bbox" in js_data and js_data["bbox"]:
            i += 1
            ret, frame = video_capture.read()
            if frame is None:
                break
            if cv2.getWindowProperty(win_name, cv2.WND_PROP_VISIBLE) < 1:
                break
            with open(f"{res_dir}/results.txt", "a") as file:
                bbox_str = f"{x},{y},{w},{h}\n"
                file.write(bbox_str)

            if js_data["score"] > 0.8:
                print("frame@{} >> Track target info: {:.4f} @ {}".format(i, js_data["score"], js_data["bbox"]))
                x, y, w, h = js_data["bbox"]
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            else:
                cv2.putText(frame, "Tracking failed: the target may be out of view or occluded!", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            if save_img:
                cv2.imwrite(f"{img_save_path}/{i:04d}.jpg", frame)

            cv2.imshow(win_name, frame)
            cv2.waitKey(1)
            # 在接收到bbox信息后，发送确认消息给服务器端
            client_socket.sendall(b'ACK')  # 发送确认消息

        if "status" in js_data and js_data["status"] == "tracking_finished":
            break  # 结束外部的 while 循环


def main():
    parser = argparse.ArgumentParser(description='Run the tracker on your webcam.')
    parser.add_argument('--video_path',
                        type=str,
                        default='test.mp4',
                        help="The absolute or relative path of the video you want to track.")
    parser.add_argument('--server_ip', type=str, default='43.143.59.35', help="Server IP.")
    parser.add_argument('--server_port', type=int, default=12345, help="Server port.")
    parser.add_argument('--save_img', type=bool, default=True, help="If save tracking images.")
    parser.add_argument('--win_name', type=str, default='TrackDemo', help="Windows name.")

    args = parser.parse_args()
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((args.server_ip, args.server_port))
    video_capture = cv2.VideoCapture(args.video_path)

    run_track(
        client_socket,
        video_capture,
        args.video_path,
        args.save_img,
        args.win_name,
    )

    client_socket.close()
    video_capture.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()

```



### server.py

```python
import json
import os
import socket
import sys
import argparse
import threading

import tqdm
import time
import cv2
import numpy as np
import base64

from pathlib import Path

prj_path = os.path.join(os.path.dirname(__file__), '..')
if prj_path not in sys.path:
    sys.path.append(prj_path)

from lib.test.evaluation import Tracker


def is_video_file_valid(video_path):
    if not os.path.exists(video_path):
        return False
    try:
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return False

        cap.release()
        return True

    except cv2.error as e:
        print(f"Error: {e}")
        return False


def tracking(tracker, client_socket=None, optional_box=None, video_path=None, debug=0, track_res_file=None):
    params = tracker.params

    _debug = debug
    if debug is None:
        _debug = getattr(params, 'debug', 0)
    params.debug = _debug

    params.tracker_name = tracker.name
    params.param_name = tracker.parameter_name
    _tracker = tracker.create_tracker(params)

    assert os.path.isfile(video_path), f"Invalid param {video_path}, video path must be a valid video file!"

    output_boxes = []
    cap = cv2.VideoCapture(video_path)
    success, frame = cap.read()

    if success is not True:
        print("Read frame from {} failed.".format(video_path))
        exit(-1)

    def _build_init_info(box):
        return {'init_bbox': box}

    if optional_box is not None:
        assert isinstance(optional_box, (list, tuple))
        assert len(optional_box) == 4, "valid box's foramt is [x,y,w,h]"

        _tracker.initialize(frame, _build_init_info(optional_box))
        output_boxes.append(optional_box)
    else:
        raise NotImplementedError("We haven't support cv_show now.")

    print("Hold on, tracking...")
    while True:
        ret, frame = cap.read()

        if frame is None:
            break

        # Draw box
        out = _tracker.track(frame)
        bbox_data = [int(s) for s in out['target_bbox']]
        output_boxes.append(bbox_data)

        # 将跟踪结果实时发送给客户端
        msg = {'bbox': bbox_data, 'score': out['score']}  # 要编码的数据
        msg_base64 = base64.b64encode(json.dumps(msg).encode())
        client_socket.sendall(msg_base64)

        # 等待客户端的确认消息
        ack_message = client_socket.recv(1024)
        if ack_message == b'ACK':
            # 客户端已经接收到确认消息，继续下一帧处理
            # print(ack_message)
            continue
        else:
            # 客户端未发送正确的确认消息，中断连接或其他处理
            break

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()

    tracked_bb = np.array(output_boxes).astype(int)
    np.savetxt(track_res_file, tracked_bb, delimiter=',', fmt='%d')

    # # 将 bbox.txt 文件发送回客户端
    # with open(track_res_file, "rb") as file:
    #     data = file.read()
    #     encoded_data = base64.b64encode(data).decode()  # Convert binary data to Base64 string
    #     msg = {"bbox": encoded_data}
    #     response_str = json.dumps(msg)
    #     client_socket.sendall(response_str.encode())

    print(f"Tracking video finished: {video_path}")
    # 发送 "tracking_finished" 信号给客户端
    msg = {'status': 'tracking_finished'}
    msg_base64 = base64.b64encode(json.dumps(msg).encode())
    client_socket.sendall(msg_base64)

    client_socket.close()


def run_video(client_socket: socket.socket,
              tracker_name,
              tracker_param,
              videofile='',
              optional_box=None,
              debug=None,
              save_results=False,
              tracker_params=None):
    """Run the tracker on your webcam.
    args:
        tracker_name: Name of tracking method.
        tracker_param: Name of parameter file.
        debug: Debug level.
    """
    response_base64 = client_socket.recv(1024)  # 接收数据
    response_data = base64.b64decode(response_base64).decode()
    js_data = json.loads(response_data)

    if "video_name" in js_data and js_data["video_name"]:  ## STEP1: 准备好视频文件
        video_name = js_data['video_name']  # 视频文件的名称
        data_path = os.path.join("database/usrdata", Path(video_name).stem)
        if not os.path.exists(data_path):
            os.makedirs(data_path)
        video_path = os.path.join(data_path, video_name)

        # 检查文件是否已经存在
        upload_video = False
        if not is_video_file_valid(video_path):
            upload_video = True

        # 给客户端发送是否要上传视频的消息
        msg = {'upload': upload_video}
        msg_base64 = base64.b64encode(json.dumps(msg).encode())
        client_socket.sendall(msg_base64)

        if upload_video:
            file_size_bytes = client_socket.recv(4)  # 接收文件大小信息
            file_size = int.from_bytes(file_size_bytes, 'big')  # 解析文件大小
            received_size = 0

            with open(video_path, "wb") as file:
                while received_size < file_size:
                    data = client_socket.recv(1024)  # 接收数据
                    if not data:
                        break
                    file.write(data)
                    received_size += len(data)

            print("视频已准备好！\n")

    ## STEP2: 准备好 init_bbox
    # 视频数据已经准备完成，向客户端发起 init_bbox 的请求
    msg = {"draw_bbox": True}
    msg_base64 = base64.b64encode(json.dumps(msg).encode())
    client_socket.sendall(msg_base64)

    response_base64 = client_socket.recv(1024)  # 接收数据
    response_data = base64.b64decode(response_base64).decode()
    js_data = json.loads(response_data)
    selected_roi = js_data['roi']  # 初始边界框，第一帧

    # STEP3: 执行跟踪并生成 bbox.txt 文件
    tracker_params['videofile'] = video_path
    tracker_params['optional_box'] = selected_roi

    tracker = Tracker(tracker_name, tracker_param, "video", tracker_params=tracker_params)
    track_res_file = os.path.join(data_path, 'tracked_{}_res.txt'.format(Path(video_name).stem))

    tracking(
        tracker=tracker,
        client_socket=client_socket,
        optional_box=selected_roi,
        video_path=video_path,
        debug=0,
        track_res_file=track_res_file,
    )


def main():
    parser = argparse.ArgumentParser(description='Run the tracker on your webcam.')
    # parser.add_argument('tracker_name', type=str, help='Name of tracking method.')
    # parser.add_argument('tracker_param', type=str, help='Name of parameter file.')
    # parser.add_argument('videofile', type=str, help='path to a video file.')
    parser.add_argument('--optional_box', type=float, default=None, nargs="+", help='optional_box with format x y w h.')
    parser.add_argument('--debug', type=int, default=0, help='Debug level.')
    parser.add_argument('--save_results', dest='save_results', action='store_true', help='Save bounding boxes')
    parser.set_defaults(save_results=True)

    parser.add_argument('--params__model', type=str, default=None, help="Tracking model path.")
    parser.add_argument('--params__update_interval', type=int, default=None, help="Update interval of online tracking.")
    parser.add_argument('--params__online_sizes', type=int, default=None)
    parser.add_argument('--params__search_area_scale', type=float, default=None)
    parser.add_argument('--params__max_score_decay', type=float, default=1.0)
    parser.add_argument('--params__vis_attn',
                        type=int,
                        choices=[0, 1],
                        default=0,
                        help="Whether visualize the attention maps.")

    args = parser.parse_args()

    args.tracker_name = 'mixformer_cvt_online'
    args.tracker_param = 'baseline'
    args.params__model = 'mixformer_online_22k.pth.tar'
    args.videofile = ''
    args.debug = 0
    args.params__search_area_scale = 4.5
    args.params__update_interval = 10
    args.params__online_sizes = 5

    tracker_params = {}
    for param in list(filter(lambda s: s.split('__')[0] == 'params' and getattr(args, s) != None, args.__dir__())):
        tracker_params[param.split('__')[1]] = getattr(args, param)

    # print(tracker_params)

    host = "0.0.0.0"  # 监听所有网络接口
    port = 12345  # 服务器端口
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(5)

    print(f"Server listening on {host}:{port}")

    while True:
        client_socket, addr = server_socket.accept()  # 接收客户端连接
        print(f"Client connected from {addr[0]}:{addr[1]}")

        # 创建一个新线程来处理客户端连接
        client_thread = threading.Thread(target=run_video,
                                         args=(
                                             client_socket,
                                             args.tracker_name,
                                             args.tracker_param,
                                             args.videofile,
                                             args.optional_box,
                                             args.debug,
                                             args.save_results,
                                             tracker_params,
                                         ))
        client_thread.start()

    run_video(args.tracker_name,
              args.tracker_param,
              args.videofile,
              args.optional_box,
              args.debug,
              args.save_results,
              tracker_params=tracker_params)


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(e)

```

