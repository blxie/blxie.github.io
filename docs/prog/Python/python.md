# 网络通信（socket 编程）

Prompt,

```
python scoket通信，服务端程序为多线程，等待客服端的数据，客户端通过上传视频数据到服务端，服务端一直监听并保存到本地
客户端怎么实现
怎么知道指定IP的端口是否开放
完善以下代码，用进度条提示上传进度，如果连接失败或者上传失败，将失败的原因保存到日志文件中
完善以下代码，服务端接收到客户端发送数据的请求之后，显示下载的进度，并将下载的日志保存在本地


你现在是一名资深Python编程专家，我需要你按照我的需求辅助我完成之后的任务
现在有以下代码，请进行分析优化，提供优化建议
……
按照上面的建议对代码进行优化
接着上面的格式继续
```



## server.py

```python
"""
1. 接收客户端传来的数据 data
    - 检查是否 video 是否已经下载过，如果已经下载，直接从本机加载进行离线跟踪
      如果没有下载，和客户端建立连接，下载 video 到指定目录
2. 发送连接状态信息
3. 将跟踪结果发送给客户端，考虑到开销问题，直接返回 bbox(x, y, w, h)
"""
import socket
import threading
import tqdm
import logging


def handle_client(client_socket):
    # 接收客户端发送的数据并保存到本地文件
    file_name = "video_.mp4"  # 保存文件的名称
    try:
        with open(file_name, "wb") as file:
            progress = tqdm.tqdm(unit="B", unit_scale=True, unit_divisor=1024)
            while True:
                data = client_socket.recv(1024)  # 接收数据
                if not data:
                    print("No more available data, connection closed!")
                    break
                file.write(data)
                progress.update(len(data))

        print("Video downloaded successfully.")

    except socket.error as e:
        logging.error("Failed to receive video: %s", str(e))

    finally:
        client_socket.close()


def main():
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
        client_thread = threading.Thread(target=handle_client, args=(client_socket, ))
        client_thread.start()


if __name__ == "__main__":
    logging.basicConfig(filename="download.log", level=logging.ERROR)
    main()

```







## client.py

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
import logging
import cv2

import os
import socket
import json
import tqdm


def main():
    server_ip = "10.16.42.114"
    server_port = 12345
    video_path = "test.mp4"
    selected_roi = None  # 用于存储用户选择的矩形框坐标
    res_dir = 'track_res'

    # 读取第一帧图像
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()

    # 创建窗口并显示第一帧图像
    cv2.namedWindow("Video", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Video", 960, 540)
    cv2.imshow("Video", frame)

    # 如果是第一帧图像，则允许鼠标框选图像
    cv2.putText(frame, 'Select target ROI and press ENTER', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    selected_roi = cv2.selectROI('Video', frame)
    x, y, w, h = selected_roi
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cv2.imwrite("0.jpg", frame)

    # 等待用户框选矩形框
    cv2.waitKey(0)

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((server_ip, server_port))

        # 发送矩形框坐标和视频文件路径
        data = {'path': video_path, 'roi': selected_roi}
        data_str = json.dumps(data)
        print(data_str)
        client_socket.sendall(data_str.encode())
        # print("Rectangle coordinates and video file path sent to server.")

        print("*******开始跟踪***********\n")
        i = 0
        # 接收服务器传回的数据
        while True:
            i += 1
            ret, frame = cap.read()
            if frame is None:
                break

            response = client_socket.recv(1024).decode()
            if response:
                try:
                    response_data = json.loads(response)
                    print("\nReceived data from server:")
                    if "bbox" in response_data and response_data["bbox"]:
                        if response_data["score"] > 0.8:
                            x, y, w, h = response_data["bbox"]
                            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                        else:
                            cv2.putText(frame, "Tracking failed: the target may be out of view or occluded!", (10, 30),
                                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                        cv2.imwrite(f"result/{i}.jpg", frame)
                        cv2.imshow("Video", frame)
                        # 添加延迟，给界面刷新提供时间
                        cv2.waitKey(1)

                    if "status" in response_data and response_data["status"] == "tracking_finished":
                        break  # 结束外部的 while 循环

                    if "upload" in response_data and response_data["upload"] == True:
                        file_size = os.path.getsize(video_path)
                        with open(video_path, "rb") as file:
                            progress = tqdm.tqdm(
                                range(file_size),
                                f"Uploading {video_path}",
                                unit="B",
                                unit_scale=True,
                                unit_divisor=1024,
                            )
                            for _ in progress:
                                data = file.read(1024)  # 每次读取 1024 字节数据
                                if not data:
                                    break
                                client_socket.sendall(data)  # 发送数据
                                progress.update(len(data))
                        print("Video uploaded successfully.")
                except json.JSONDecodeError:
                    print("Invalid JSON data received.")
            else:
                print("No data received from server.")
    except Exception as e:
        logging.error("Failed to send video: %s", str(e))
    finally:
        client_socket.close()

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    if not os.path.exists('logs'):
        os.makedirs('logs')
    logging.basicConfig(filename="logs/upload.log", level=logging.ERROR)
    main()

```



## Track-Server

```python
import json
import logging
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
        response_data = {'bbox': bbox_data, 'score': out['score']}  # 要编码的数据
        response_bytes = json.dumps(response_data).encode()  # 先转化为 bytes 类型数据
        response_base64 = base64.b64encode(response_bytes)

        client_socket.sendall(response_base64)  # 发送数据

        # 等待客户端的确认消息
        ack_message = client_socket.recv(1024)
        if ack_message == b'ACK':
            # 客户端已经接收到确认消息，继续下一帧处理
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
    #     response_data = {"bbox": encoded_data}
    #     response_str = json.dumps(response_data)
    #     client_socket.sendall(response_str.encode())

    print(f"Tracking video finished: {video_path}")
    # 发送 "tracking_finished" 信号给客户端
    response_data = {'status': 'tracking_finished'}
    response_bytes = json.dumps(response_data).encode()  # 先转化为 bytes 类型数据
    response_base64 = base64.b64encode(response_bytes)
    client_socket.sendall(response_base64)
    client_socket.close()


def run_video(client_socket,
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
    # 接收客户端发送的数据并保存到本地文件
    data = client_socket.recv(1024)  # 接收数据
    data = json.loads(data.decode())
    video_name = data['video_name']  # 视频文件的名称
    selected_roi = data['roi']  # 初始边界框，第一帧
    print(f">> video name: {video_name}. \n>> Initialized frame box: {selected_roi}.")

    data_path = os.path.join("database/usrdata", Path(video_name).stem)
    if not os.path.exists(data_path):
        os.makedirs(data_path)
    video_path = os.path.join(data_path, video_name)

    # 检查文件是否已经存在
    if is_video_file_valid(video_path):
        print("Video already downloaded. Performing offline tracking...")
        upload_video = False
    else:
        print("There may be something wrong with the video. Uploading...")
        upload_video = True

    # 发送响应数据给客户端
    response_data = {'upload': upload_video}
    response_bytes = json.dumps(response_data).encode()  # 先转化为 bytes 类型数据
    response_base64 = base64.b64encode(response_bytes)
    client_socket.sendall(response_base64)

    if upload_video:
        try:
            with open(video_path, "wb") as file:
                progress = tqdm.tqdm(unit="B", unit_scale=True, unit_divisor=1024)
                while True:
                    data = client_socket.recv(1024)  # 接收数据
                    if not data:
                        print("No more available data, connection closed!")
                        break
                    if data == b'UPLOAD_COMPLETE':  # 接收到结束标志
                        print("Video upload completed.")
                        break
                    file.write(data)
                    progress.update(len(data))
            print("Video downloaded successfully.")
        except socket.error as e:
            logging.error("Failed to receive video: %s", str(e))

    # 在这里添加离线跟踪的代码
    # 执行跟踪并生成 bbox.txt 文件
    tracker_params['videofile'] = video_path
    tracker_params['optional_box'] = selected_roi

    tracker = Tracker(tracker_name, tracker_param, "video", tracker_params=tracker_params)
    # if not os.path.exists(tracker.results_dir):
    #     os.makedirs(tracker.results_dir)
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

    print(tracker_params)

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
    main()

```







## Track-Client

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
import base64
import logging
from pathlib import Path
import shutil
import cv2
import numpy as np

import os, sys
import socket
import json
import tqdm


def draw_progress(frame, progress_percentage):
    center = (frame.shape[1] // 2, frame.shape[0] // 2)  # 圆心坐标
    radius = min(frame.shape[1], frame.shape[0]) // 4  # 半径
    thickness = 6  # 圆圈线条宽度

    # 创建与当前帧相同大小的透明度图像
    overlay = np.full_like(frame, (100, 100, 100), dtype=np.uint8)  # 使用灰白色

    # 绘制圆圈
    cv2.circle(overlay, center, radius, (0, 255, 0), thickness)

    # 计算进度条弧度
    angle = 360 * progress_percentage / 100
    start_angle = 90  # 从垂直方向开始绘制
    end_angle = start_angle - angle

    # 绘制进度条弧度
    cv2.putText(overlay, "video uploading, please wait for a while...", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1,
                (0, 0, 255), 2)
    cv2.ellipse(overlay, center, (radius, radius), 0, start_angle, end_angle, (0, 0, 255), thickness)

    # 将透明度应用于当前帧
    alpha = 0.1  # 透明度设置为30%
    frame = cv2.addWeighted(frame, alpha, overlay, 1 - alpha, 0)

    # 显示进度百分比
    text = f"{progress_percentage:.1f}%"
    text_size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, thickness)
    text_org = (center[0] - text_size[0] // 2, center[1] + text_size[1] // 2)
    cv2.putText(frame, text, text_org, cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), thickness)

    return frame


def main():
    server_ip = "10.16.42.114"
    server_port = 12345
    video_path = "test.mp4"  # TODO: 手动选择路径
    selected_roi = None  # 用于存储用户选择的矩形框坐标
    res_dir = os.path.join("track_res", Path(video_path).stem)
    win_name = "TrackDemo"
    save_img = True

    # 读取第一帧图像
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()

    # 创建窗口并显示第一帧图像
    cv2.namedWindow(win_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(win_name, 960, 540)

    # 如果是第一帧图像，则允许鼠标框选图像
    cv2.putText(frame, "Select a ROI and then press SPACE or ENTER button!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1,
                (0, 0, 255), 2)
    cv2.imshow(win_name, frame)
    cv2.waitKey(1)

    selected_roi = cv2.selectROI(win_name, frame)
    x, y, w, h = selected_roi
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    img_save_path = os.path.join(res_dir, "images")
    if os.path.exists(img_save_path):
        shutil.rmtree(img_save_path)
    else:
        os.makedirs(img_save_path)

    cv2.imwrite(f"{img_save_path}/{1:04d}.jpg", frame)
    with open(f"{res_dir}/results.txt", "w") as file:
        bbox_str = f"{x},{y},{w},{h}\n"
        file.write(bbox_str)

    ########################
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((server_ip, server_port))

        # 发送矩形框坐标和视频文件路径
        data = {'video_name': Path(video_path).name, 'roi': selected_roi}
        data_str = json.dumps(data)
        print(data_str)
        client_socket.sendall(data_str.encode())
        # print("Rectangle coordinates and video file path sent to server.")

        # 接收服务器传回的数据
        # 检查窗口关闭事件
        i = 0
        while True:  # 27 对应 ESC 键的 ASCII 值
            i += 1
            ret, frame = cap.read()
            if frame is None:
                break

            response_base64 = client_socket.recv(1024)
            if response_base64:
                try:
                    response_data = base64.b64decode(response_base64).decode()
                    js_data = json.loads(response_data)
                    # print("\nReceived data from server:")
                    if "bbox" in js_data and js_data["bbox"]:
                        if cv2.getWindowProperty(win_name, cv2.WND_PROP_VISIBLE) < 1:
                            break

                        with open(f"{res_dir}/results.txt", "a") as file:
                            bbox_str = f"{x},{y},{w},{h}\n"
                            file.write(bbox_str)

                        if js_data["score"] > 0.8:
                            print("frame@{} >> Track target info: {:.4f} @ {}".format(
                                i, js_data["score"], js_data["bbox"]))
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

                    if "upload" in js_data and js_data["upload"] == True:
                        file_size = os.path.getsize(video_path)
                        with open(video_path, "rb") as file:
                            progress = tqdm.tqdm(
                                range(file_size),
                                f"Uploading {Path(video_path).name}",
                                unit="B",
                                unit_scale=True,
                                unit_divisor=1024,
                            )
                            for _ in progress:
                                if cv2.getWindowProperty(win_name, cv2.WND_PROP_VISIBLE) < 1:
                                    break

                                data = file.read(1024)  # 每次读取 1024 字节数据
                                if not data:
                                    # 文件传输完成后发送结束标志
                                    client_socket.sendall(b'UPLOAD_COMPLETE')
                                    print("Video uploaded successfully.")
                                    break

                                client_socket.sendall(data)  # 发送数据
                                progress.update(len(data))

                                # # 绘制进度条到视频帧上
                                # progress_percentage = progress.n / file_size * 100
                                # progress_bar_width = int(frame.shape[1] * progress_percentage / 100)
                                # cv2.rectangle(frame, (0, frame.shape[0] - 20), (progress_bar_width, frame.shape[0]),
                                #               (0, 255, 0), -1)
                                # cv2.putText(frame, f"Uploading... {progress_percentage:.2f}%", (10, frame.shape[0] - 5),
                                #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
                                # cv2.imshow(win_name, frame)
                                # # 添加延迟，给界面刷新提供时间
                                # cv2.waitKey(1)
                                # 计算上传进度百分比

                                progress_percentage = progress.n / file_size * 100
                                frame = draw_progress(frame, progress_percentage)
                                cv2.imshow(win_name, frame)
                                cv2.waitKey(1)

                except json.JSONDecodeError:
                    print("Invalid JSON data received.")
            else:
                print("No data received from server.")
    except Exception as e:
        print("It seems that some errors have been encountered, please check logs/upload.log for details.")
        logging.error("Failed to send video: %s", str(e))
    finally:
        client_socket.close()

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    if not os.path.exists('logs'):
        os.makedirs('logs')
    logging.basicConfig(filename="logs/upload.log", level=logging.ERROR)
    main()

```



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

