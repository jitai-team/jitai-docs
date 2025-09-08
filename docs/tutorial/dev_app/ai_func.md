---
sidebar_position: 3
title: 用AI大模型函数实现生成答案
---
# 用AI大模型函数实现生成答案


## 案例效果
import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_func_effect.mp4" />


## 实现过程

实现AI功能，首先需要对接大模型。大模型厂商元素是为AI大模型厂商提供统一的接入方案，屏蔽不同大模型厂商的API差异，开发者只需要简单配置下密钥即可调用。
JitAi开发框架中已经集成了近10种主流大模型厂商，且支持对接私有化部署的大模型。

新建大模型厂商元素操作如下
<VideoPlayer relatePath="/docs/tutorial/ai_func_llm.mp4" />

「题库管理」页面是「AI数据管理页面」类型，我们需要将其转换为「常规页面」类型，灵活性更高。操作如下

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_convert.mp4" />

在JitAi中，调用大模型非常简单，就普通函数一样调用，即可以在前端页面中直接调用，也可以在后端服务函数中调用。

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_event.mp4" />

阅读[AI大模型](/docs/devguide/AI大模型)了解更多。
