---
last_update:
  date: 3/28/2024
  author: YouWonderful
---
# Mediapipe简易教程

前言：简易教程简单介绍了`mediapipe`的安装，并给出相应案例，通过案例学会如何使用`mediapipe`进行姿态检测。

## 一、Mediapipe简介

`Mediapipe`是一个开源项目，它是一个用于处理多种类型的输入媒体的框架，包括视频、图像、摄像头、传感器数据等。它可以用于实时处理，也可以用于离线处理。我们将使用`Mediapipe`来进行姿态估计，即识别人物的头部、手、脚、肢体等的姿态。

## 二、Mediapipe安装

*建议用conda开一个虚拟环境，在这个虚拟环境里配相应的环境（非必要，不想了解可以不用管这个）*
1. 保证有python环境
2. 导入mediapipe：在终端输入`pip install mediapipe`

## 三、案例：摄像头实时姿态检测

案例源码可以在[该仓库](https://github.com/tinkerfuroc/mediapipe_tutorial)中的`simple_camera.py`查看。

接下来将对源码进行详细的讲解。

1. 导入必要的库
```python
# 导入opencv-python
import cv2
# 导入mediapipe
import mediapipe as mp
```
2. 导入 pose solution，并使用其中的姿态检测模型 `Pose`
```python
# 导入pose solution
mp_pose = mp.solutions.pose

# 导入模型
pose = mp_pose.Pose(static_image_mode=False,        # 是静态图片还是连续视频帧
                    model_complexity=2,             # 取0,1,2；0最快但性能差，2最慢但性能好
                    smooth_landmarks=True,          # 是否平滑关键点
                    min_detection_confidence=0.5,   # 置信度阈值
                    min_tracking_confidence=0.5)    # 追踪阈值
```
3. 导入mediapipe的绘图函数，用于绘制关键点
```python
mp_drawing = mp.solutions.drawing_utils
```
4. 定义一个处理单个视频帧的函数
```python
def process_frame(img_BGR):
    img_RGB = cv2.cvtColor(img_BGR, cv2.COLOR_BGR2RGB)
    results = pose.process(img_RGB) # 将RGB图片输入模型，获取预测结果
    mp_drawing.draw_landmarks(img_BGR, results.pose_landmarks, mp_pose.POSE_CONNECTIONS) # 可视化
    return img_BGR
```
5. 打开摄像头
```python
cap = cv2.VideoCapture(1) # Mac电脑的参数为1，Windows电脑的参数为0

cap.open(0)
```
6. 定义一个循环来处理实时视频流
```python
while cap.isOpened():
    success, frame = cap.read()

    if not success:
        print('Error')
        break

    frame = process_frame(frame)

    cv2.imshow('camera', frame)

    if cv2.waitKey(1) in [ord('q'),27]: # 按下键盘的 q 或 esc 退出（在英文输入法下）
        break
```
7. 释放摄像头
```python
cap.release()
cv2.destroyAllWindows()
```

## 四、对关键点的编辑

mediapipe的姿态检测模型的关键点有33个，我们可以根据需要选择需要的关键点。下面介绍如何获取并编辑关键点。源码可以在仓库中的`advanced_camera.py`查看。

接下来仅分析代码中的`process_frame`函数。（其它部分同`simple_camera.py`）

1. 获取预测结果
```python
def process_frame(img_BGR):
    start_time = time.time()
    img_RGB = cv2.cvtColor(img_BGR, cv2.COLOR_BGR2RGB)
    results = pose.process(img_RGB) # 将RGB图片输入模型，获取预测结果
```
2. 获取图片长宽
```python
    h, w = img_BGR.shape[0], img_BGR.shape[1]
```
3. 遍历33个关键点，并根据需要编辑关键点（这里是编辑关键点的颜色），注释中给出了不同序号的关键点对应的部位
```python
    # 遍历33个关键点
    if results.pose_landmarks: # 获取关键点前，必须先判断是否有预测结果
        mp_drawing.draw_landmarks(img_BGR, results.pose_landmarks, mp_pose.POSE_CONNECTIONS) # 先可视化，之后再给不同部位的关键点画不同颜色
        for i in range(33):
            cx = int(results.pose_landmarks.landmark[i].x * w) # 关键点的横坐标
            cy = int(results.pose_landmarks.landmark[i].y * h) # 关键点的纵坐标
            cz = results.pose_landmarks.landmark[i].z

            radius = 5
            if i == 0:  # 鼻尖
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (0, 0, 225), -1)    # -1表示填充
            elif i in [11, 12]:  # 肩膀
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (223, 155, 6), -1)
            elif i in [23, 24]:  # 髋关节
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (1, 240, 255), -1)
            elif i in [13, 14]:  # 胳膊肘
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (140, 47, 240), -1)
            elif i in [25, 26]:  # 膝盖
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (0, 0, 225), -1)
            elif i in [15, 16, 27, 28]:  # 手腕和脚腕
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (223, 155, 60), -1)
            elif i in [17, 19, 21]:  # 左手
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (94, 218, 121), -1)
            elif i in [18, 20, 22]:  # 右手
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (16, 144, 247), -1)
            elif i in [27, 29, 31]:  # 左脚
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (29, 123, 243), -1)
            elif i in [28, 30, 32]:  # 右脚
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (193, 182, 255), -1)
            elif i in [9, 10]:  # 嘴
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (205, 235, 255), -1)
            elif i in [1, 2, 3, 4, 5, 6, 7, 8]:  # 眼和脸颊
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (94, 218, 121), -1)
            else:   # 其它关键点
                img_BGR = cv2.circle(img_BGR, (cx, cy), radius, (0, 225, 0), -1)
    else:
        scaler = 1
        failure_str = 'No Person'
        img_BGR = cv2.putText(img_BGR, failure_str, (25 * scaler, 100 * scaler), cv2.FONT_HERSHEY_SIMPLEX, 1.25 * scaler, (255, 0, 0))
    end_time = time.time()
    FPS = 1 / (end_time - start_time)
    scaler = 1
    # 在图像上写FPS数值，参数依次为：图片，添加的文字，左上角坐标，字体，文字大小，颜色，文字粗细
    img_BGR = cv2.putText(img_BGR, 'FPS ' + str(int(FPS)), (25 * scaler, 50 * scaler), cv2.FONT_HERSHEY_SIMPLEX, 1.25 * scaler, (255, 0, 0))
    return img_BGR
```