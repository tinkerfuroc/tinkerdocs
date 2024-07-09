---
id: vision_cheat_sheet
title: Vision Cheat Sheet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Vision Cheat Sheet

Useful utilities.

## Conversions

### Image Message to Numpy

Convert sensor_msgs/Image message to numpy array.

<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
  from cv_bridge import CvBridge
  
  bridge = CvBridge()
  # message to np.array
  color_img = bridge.imgmsg_to_cv2(color_msg, "bgr8")
  depth_img = bridge.imgmsg_to_cv2(depth_msg, "32FC1")
  # np.array to message
  color_msg = bridge.cv2_to_imgmsg(color_img.astype(np.uint8), "bgr8")
  depth_img = bridge.cv2_to_imgmsg(depth_img.astype(np.float32), "32FC1")
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>

### Kinect PC2 to Numpy

Convert PointCloud2 message from Kinect to numpy array.

<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
    def get_array_from_points(points: PointCloud2) -> tuple[np.array, np.array]:
        '''
        Returns:
        - arr [H, W, 3]: the points
        - mask [H, W]: valid points without nan
        '''
        # h, w = 1536, 2048
        h, w = 720, 1280
        arr = np.frombuffer(points.data, dtype='<f4')
        # print(len(arr), h * w * 8)
        assert(len(arr) == h * w * 8)
        arr = arr.reshape((h, w, 8))[:, :, :3]
        mask = 1 - np.multiply.reduce(np.isnan(arr), axis=2)
        # remove nans
        arr = np.nan_to_num(arr, nan=0)
        return arr, mask
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>

## Quaternions

Use `tf_transformations` module in ROS2 humble.

<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
  from tf_transformations import quaternion_from_euler, quaternion_from_matrix
  
  orientation = quaternion_from_euler(0.5, 1, -0.5)
  # g: 4x4 affine transformation matrix
  orientation = quaternion_from_matrix(g)
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>


### Quaternion From Euler

Get quaternion from euler angles. Copied from ROS2 wiki.

<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
    import math

    def quaternion_from_euler(ai, aj, ak):
        ai /= 2.0
        aj /= 2.0
        ak /= 2.0
        ci = math.cos(ai)
        si = math.sin(ai)
        cj = math.cos(aj)
        sj = math.sin(aj)
        ck = math.cos(ak)
        sk = math.sin(ak)
        cc = ci*ck
        cs = ci*sk
        sc = si*ck
        ss = si*sk

        q = np.empty((4, ))
        q[0] = cj*sc - sj*cs
        q[1] = cj*ss + sj*cc
        q[2] = cj*cs - sj*sc
        q[3] = cj*cc + sj*ss

        return q


    def quaternion_multiply(q0, q1):
        """
        Input
        :param q0: A 4 element array containing the first quaternion (q01, q11, q21, q31)
        :param q1: A 4 element array containing the second quaternion (q02, q12, q22, q32)

        Output
        :return: A 4 element array containing the final quaternion (q03,q13,q23,q33)
        """
        w0 = q0[0]
        x0 = q0[1]
        y0 = q0[2]
        z0 = q0[3]

        w1 = q1[0]
        x1 = q1[1]
        y1 = q1[2]
        z1 = q1[3]

        q0q1_w = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1
        q0q1_x = w0 * x1 + x0 * w1 + y0 * z1 - z0 * y1
        q0q1_y = w0 * y1 - x0 * z1 + y0 * w1 + z0 * x1
        q0q1_z = w0 * z1 + x0 * y1 - y0 * x1 + z0 * w1

        final_quaternion = np.array([q0q1_w, q0q1_x, q0q1_y, q0q1_z])

        return final_quaternion
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>

### Quaternion from Vector

Get quaternion from a vector.

<Tabs>
  <TabItem value="python" label="Python" default>

  ```python
    import tf_transformations

    rotation = np.eye(4)
    # (x0, y0, z0) ------> (x1, y1, z1)
    # x, y, z = x1 - x0, y1 - y0, z1 - z0
    x, y, z = x0 - x1, y0 - y1, z0 - z1 # I don't know why but this one works
    
    # x-axis
    rotation[:3, 0] = np.array([x, y, z])
    # z-axis, must be (0, 0, 1) when z == 0
    rotation[:3, 2] = np.array([-x * z, - y * z, x ** 2 + y ** 2])
    # y-axis, calculated from x and z
    rotation[:3, 1] = np.array([y, -x, 0])
    q = tf_transformations.quaternion_from_matrix(rotation)
  ```

  </TabItem>

  <TabItem value="c++" label="C++">

  ```c++
  GUGUGU
  ```

  </TabItem>

</Tabs>

