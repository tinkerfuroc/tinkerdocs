---
last_update:
  date: 8/3/2024
  author: Cabbage Dog
---

# Message Filter in ROS2

Typically we use a subscriber to directly receive the message and process them in a callback function, but there are times when we want more intricate ways to tackle with these messages, say, cache them temporarily process them later, or synchronize messages from mulitple topics then process them in batch.

Currently, `message_filters` in ROS2 provide some convenient ways to implement these functions. However, up to the date of the creation of this blog, `message_filters` are still under development and many functions remains unimplemented. This blog will introduce time synchronizer in `message_filters`.

## Synchronizer

A synchronizer is mainly used when you want to subscribe messages from multiple topics and process them in batch based on their time stamp. In navigation, you may want to use data from IMU and LiDAR from the same time to establish your odometry. Here is the example for implementation in python:

```python
import rclpy
from rclpy.node import Node

from sensor_msgs.msg import PointCloud2
from sensor_msgs.msg import Imu
from message_filters import Subscriber, ApproximateTimeSynchronizer

class Compute_odom(Node):

    def __init__(self):
        super().__init__('Compute_odom')
        self.subs = []
        
        self.subs.append(Subscriber(self,  PointCloud2, "/livox/lidar"))
        self.subs.append(Subscriber(self,  PointCloud2, "/my_imu"))

        self.ts = ApproximateTimeSynchronizer(self.subs, queue_size=5, slop=0.1)
        self.ts.registerCallback(self.ts_callback)

    def ts_callback(self, p0, p1):
        # Code you implement odometry
        self.get_logger().info('Common callback called')


def main(args=None):
    rclpy.init(args=args)

    Compute_odom = Compute_odom()

    rclpy.spin(Compute_odom)
    
    Compute_odom.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Code Explained

In the above code, we create a subscription list for subscribers we want to synchronize. But, instead of creating a `subscription` in ROS2, we create a `Subscriber` in `message_filter`

```python
sub = Subscriber(self, PointCloud2, "/livox/lidar")
```

Pay attention, we don't designate the callback function as  we create `subscription`. Actually this `Subscriber` is a part of "Filter Chain". It just receives the message and gives this message to the following part of the "Filter Chain" to process.

Then we declare a `ApproximateTimeSynchronizer`, it synchronizes our subs, but with a slop. The slop means if the messages' time stamps are within slop, they will be process in a batch.

But what do we use to process this batch of data? We register a callback function of course.

```python
self.ts.registerCallback(self.ts_callback)
```

The callback function receives all messages in this batch at once, and you can process them altogehter.
```python
    def ts_callback(self, p0, p1):
        # Code you implement odometry
        self.get_logger().info('Common callback called')
```

### What More

We can expect more functions from `message_filter`, but currently there are only few functions implemented. You can follow the [official repo](https://github.com/ros2/message_filters/blob/rolling/doc/index.rst) to see what is added.(There are still some errors in this doc, pay attention.)