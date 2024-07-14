---
id: vision_api_doc
title: Vision API Documentation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API Documentation for Vision Submodule

Describe this submodule.

## Running

Run `vision.bash` to start the basic detection service, or execute the commands seperately.

### Running Realsense Driver

Start the realsense driver with

```bash
ros2 launch realsense2_camera rs_launch.py align_depth.enable:=true rgb_camera.color_profile:=1280x720x15 depth_module.depth_profile:=1280x720x15
```

Run `ros2 param describe <your_node_name> <param_name>` to get the list of supported profiles. For example:

```bash
ros2 param describe /camera/camera rgb_camera.color_profile
ros2 param describe /camera/camera depth_module.depth_profile
```

### Starting Detection Service

Start the detection service with

```bash
ros2 run object_detection service
```

Declared parameters:

* `camera_type`: `realsense` or `kinect`. Default: `realsense`
* `visualization_en`: visualizes the detection result if set to `true`. Default: false
* `match_objects_en`: match the detections with a list of known objects if set to `true`. Default: false
* `detection_topic_en`: enables the `object_detection` topic if set to `true`. Default: true
* `publish_rate`: maximum publish rate on the `object_detection` topic. Default: 5

Example:

```bash
ros2 run object_detection service --ros-args  \
    -p camera_type:="kinect" \
    -p visualization_en:=true \
    -p match_objects_en:=true \
    -p detection_topic_en:=true \
    -p publish_rate:=2
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

# 0 for success, 1 for fail.
int32 status

# Empty when status == 1.
tinker_vision_msgs/Object[] objects
```

`tinker_vision_msgs/Object` message:
```python
# Confidence in [0, 1].
float32 conf

# Registered person id if tracking else 0. See the detection service below.
int16 id

# Object class like 'person', 'apple', ...
string cls

# Object's centroid in the camera's frame specified in header.
geometry_msgs/Point centroid

# Used when "match_object" flag is set
# Matched object ID
int16 object_id
# Cosine similarity between their latent vectors, in [0, 1]
float32 similarity

# Used when "find_pointed_object" flag is set
# 1 if being pointed at by the nearest person, 0 otherwise
uint8 being_pointed
```

## Services

| Service | Message Type | Description |
| ------- | ------------ | ----------- |
| `/object_detection_service` | `tinker_vision_msgs/ObjectDetection.srv` | Returns objects detected by Kinect when requested. |
| `/feature_extraction_service` | `tinker_vision_msgs/FeatureExtraction.srv` | Extracts features from an image and returns them. |
| `/object_classification_service` | `tinker_vision_msgs/ObjectClassification.srv` | Classifies all objects detected. |

### object_detection_service

Request format:
```sh
# Used to set options, empty by default:
# - 'register_person':      register the nearest person in the FOV and track him.
# - 'match_object':         match the detected objects to some target objects.
# - 'request_image':        include raw RGB and depth image in the response.
# - 'request_segments':     include segments for each object in the response.
# - 'find_pointed_object':  find the object being pointed at by the nearest person.
#
# Example: 'match_object|request_image|request_segments'
string flags

---

std_msgs/Header header

# 0 for success, 1 for fail.
int32 status

# The person's id if successfully registered with 'register_person' flag set. 0 otherwise.
int32 person_id

Object[] objects

# Raw RGB image in BGR8 format, if 'request_image' flag is set.
sensor_msgs/Image rgb_image

# Raw depth image in 32FC1 format (in meters), if 'request_image' flag is set.
sensor_msgs/Image depth_image

# Segments of each object in 8UC1 format, if 'request_segments' flag is set.
sensor_msgs/Image[] segments
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
          request.flags = 'match_object|request_image'
          
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
