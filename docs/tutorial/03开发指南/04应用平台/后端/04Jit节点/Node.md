---
sidebar_position: 1
draft: true
---

# Node

Node对象对应着当前运行的Jit节点，开发者使用`app.node`获得Node对象。

## 属性

| 名称 | 类型 | 说明 |
|------|------|------|
| nodeId | str | 节点ID，例如：`JN_c1tqsCN7Q5` |
| startId | str | 节点启动ID，每次启动节点时，会生成一个唯一的启动ID |
| nodeType | str | 节点类型，例如：`bizNode` |
| port | int | 节点端口，例如：`8080` |
| bindIp | str | 节点绑定IP，例如：`127.0.0.1` |
| orgId | str | 组织ID|
| configFile | str | 节点配置文件路径，例如：`/data/jitnode/home/node.json` |
| indexHTML | str | 节点首页HTML文件路径|
| activeHTML | str | 节点激活页路径|
| version | str | 节点版本，例如：`1.0.0` |


:::info
所有属性均为只读属性
:::