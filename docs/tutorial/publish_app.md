---
sidebar_position: 5
title: 部署运维
---
# 部署运维

## 发布应用

发布前，推荐将生产环境与开发环境不同的配置设置为环境变量。例如本项目中[用大模型函数实现生成题目答案](/docs/tutorial/dev_app/ai_func)的大模型密钥，就需要配置为环境变量。

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/publish_app_env.mp4" />

接下来发布应用

<VideoPlayer relatePath="/docs/tutorial/publish_app_publish.mp4" />

## 在生产环境上部署JIT

参考 [下载安装](./下载安装.md) 在服务器上安装docker版本。

## 部署应用

<VideoPlayer relatePath="/docs/tutorial/publish_app_produce.mp4" />

## 更新应用

桌面端修改代码后，再次发布。在生产环境的节点控制台，可以看到提示更新。


<VideoPlayer relatePath="/docs/tutorial/publish_app_produce.mp4" />