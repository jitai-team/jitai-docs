---
sidebar_position: -1
description: "运行平台概述 API 参考文档。完整的规格说明、方法和示例。"
---
# 运行平台概述
[**JAAP（JitAi Application Protocol）**](/docs/reference/runtime-platform/JAAP) 完成了对应用开发复杂度的抽象，使业务专家能够专注于上层业务逻辑的编排，而要让JAAP真正发挥作用，就需要一个能够理解和执行JAAP的环境——应用运行容器。

## JAAP应用运行容器
应用运行容器即JitAi应用运行平台，内置在安装包中，随JitNode节点的启动而加载。JitAi应用运行平台是跨平台的，支持在Windows、MacOS、Linux操作系统上运行。

我们对照JVM、Docker来理解JAAP应用运行容器:

| 类比对象 | 解释对象 | 执行结果 | JitAi应用运行平台 |
|---------|----------|----------|------------|
| **JVM** | Java字节码 | 跨平台运行Java程序 | 解释JAAP配置，跨平台运行JitAi应用 |
| **Docker** | Dockerfile | 构建和运行容器 | 解释JAAP配置，构建和运行应用 |

## 特性概览
### 跨平台运行
支持在Windows、MacOS、Linux操作系统上运行。

### 前后端全栈支持
支持前后端全栈元素的开发、调试，自动构建、部署、运行、更新。

### 环境虚拟化
仅受硬件资源限制的运行环境虚拟化，支持创建任意数量的运行环境。

### 平台API
平台为应用开发者提供了一套系统API，开发者可以在元素逻辑中使用这些API操作应用、环境、元素等核心对象。
