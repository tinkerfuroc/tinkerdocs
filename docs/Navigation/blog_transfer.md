---
last_update:
  date: 8/5/2024
  author: CabbageDog
---

# Blog Transfer

Unlike other blogs, this blog aims to copy intresting Q&A from [Robotics StackExchange](https://robotics.stackexchange.com/). Welcome to edit it.

## Recommend Planner and Controller
[Original Link](https://robotics.stackexchange.com/questions/112476/move-base-and-planner-recommendations)

Q: Ive tried few planners(TEB,DWA,Navfn) for my robot and all of them have way too much configuration related to obstacles and dynamic obstacles. For now I just want something simple which creates a plan without having to reverse the robot(ackerman steering so can’t do it). It’s fine if the turning radius is large and time taken to reach is longer and no obstacles to worry about. It just has to reach the point.

Is there any local and global planner for move base which does a simple plan based on all the things such as max straight velocity , max angular velocity and turning radius etc. Any suggestions?

> A: For an ackerman robot, the recommendation by nav2 is to use the Smac Hybrid-A* Planner, and either the RPP or MPPI controller. As you are looking for minimal configuration at the moment, RPP is likely better for you, as MPPI can take a little tuning to function well.
>  
> For both the planner and controller, I would look at the Configuration Guide in the nav2 documentation, as it will give you an idea of which parameters you would have to change, specifically to ensure that they both produce a path that is feasible for your ackerman setup. Things like turning radius and optionally disabling reversing.