---
sidebar_position: 3
title: 用大模型函数实现生成答案
---
# 用大模型函数实现生成答案


## 案例效果
import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_func_effect.mp4" />


## 实现过程

新建大模型元素

<VideoPlayer relatePath="/docs/tutorial/ai_func_llm.mp4" />

「题库管理」页面是「数据管理页面」类型，我们需要将其转换为「标准页面」类型，灵活性更高。操作如下

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_convert.mp4" />

在页面的组件事件中，调用大模型执行。

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_event.mp4" />

也可以在服务函数中，调用大模型实例.执行，然后前端调用服务。
