---
id: vision_api_doc
title: Vision API Documentation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API Documentation for Vision Submodule

Describe this submodule.

## Running

Run `vision.bash` to start the basic detection service, or execute the commands seperately:

1. Start the realsense driver with
   ```bash
   ros2 launch realsense2_camera rs_launch.py align_depth.enable:=true depth_module.profile:=848x480x30 rgb_camera.profile:=848x480x30
   ```
2. Start the detection service with
   ```bash
   ros2 run object_detection service
   ```

## Topics

| Topic | Message Type | Description |
| ----- | ------------ | ----------- |
| `/object_detection` | `tinker_vision_msgs/Objects.msg` | Publishes objects detected by Kinect. |

### object_detection

Upon receiving a new image from the Kinect camera, publishes a `tinker_vision_msgs/Objects` message containing all the objects detected by YOLOv8. The latency should be less than 200ms.

`tinker_vision_msgs/Objects` message:
```python
std_msgs/Header header

# 0 for success, 1 for fail
int32 status

# empty when status == 1
tinker_vision_msgs/Object[] objects
```

`tinker_vision_msgs/Object` message:
```python
# confidence [0, 1]
float32 conf

# registered person id if tracking else 0
int16 id

# object class like 'person', 'apple', ...
string cls

# object's centroid in the camera's frame specified in header
geometry_msgs/Point centroid
```

## Services

| Service | Message Type | Description |
| ------- | ------------ | ----------- |
| `/object_detection_service` | `tinker_vision_msgs/ObjectDetection.srv` | Returns objects detected by Kinect when requested. |
| `/feature_extraction_service` | `tinker_vision_msgs/FeatureExtraction.srv` | Extracts features from an image and returns them. |
| `/point_direction_service` | `tinker_vision_msgs/PointDirection.srv` | Returns the point direction of a person. |
| `/object_classification_service` | `tinker_vision_msgs/ObjectClassification.srv` | Classifies all objects detected. |

### object_detection_service

`format:`
```sh
# empty by default, can be set to:
# - 'register_person': register the nearest person in the FOV and track him.
string mode

---

std_msgs/Header header
int32 status
int32 person_id
Object[] objects

```

#### Example Usage
<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
  from tinker_vision_msgs.srv import ObjectDetection

  class ExampleClient(Node):
      def __init__(self):
          super().__init__('example_client')
          self.client = self.create_client(ObjectDetection, 'object_detection')

      def send_request(self):
          # fill the request
          request = ObjectDetection.Request()
          request.mode = ''
          
          # call the service
          future = self.client.call_async(request)
          rclpy.spin_until_future_complete(self, future)

          # get the results
          objects = future.result().objects
          person_id = future.result().person_id
          return objects
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>

### feature_extraction_service

```sh
---

```


### point_direction_service

```sh
Image image

---

std_msgs/Header header

# the direction is the line connecting the two points
float32 left_p1_x
float32 left_p1_y
float32 left_p2_x
float32 left_p2_y
float32 right_p1_x
float32 right_p1_y
float32 right_p2_x
float32 right_p2_y
```

### object_classification_service

`tinker_vision_msgs/Category` message:
```sh
# the category id of the object
int16 object_id

# the similarity score of the object to the category
float32 similarity
```

```sh
Image image
BoundingBox[] bounding_boxes

---

std_msgs/Header header
Category[] categories
```

## Actions



### Example Success Response
```json
{
  "id": 101,
  "name": "India",
  "iso3": "IND",
  "iso2": "IN",
  "phonecode": "91",
  "capital": "New Delhi",
  "currency": "INR",
  "native": "भारत",
  "emoji": "🇮🇳",
  "emojiU": "U+1F1EE U+1F1F3"
}
```
