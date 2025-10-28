---
sidebar_position: 14
slug: ai-assistant-api-exposure
description: "AI助理的API开放的详细指南和说明。"
---

# AI助理的API开放

## 发送AI消息函数 {#send-ai-message} 
在页面中使用AI助理后，页面上会有一个**发送AI消息**的函数。函数有以下入参：
- **消息内容**：发送的文本消息内容
- **是否开启新对话**：开启后，会打开一个新的[对话记录](./ai-conversation-history)，并发送消息。如果未开启，则会在当前打开的对话中发送消息；如果此时助理在工作区人机交互节点处暂停，则会恢复流程。
- **自定义参数**：AI助理上配置的[自定义输入参数](./ai-assistant-input-output#input-args)

调用方式参考[页面中发送AI消息](../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#send-ai-message)


## 应用内调用AI助理 {#calling-ai-assistant-within-application}

在前端页面、后端服务、模型函数中可[直接调用AI助理](../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#call-ai-assistant)。

:::info 重要说明
通过接口方式调用AI助理时，请注意以下限制：

**调用方式限制：**
- 目前仅支持非流式调用（同步调用）
- 流式调用功能正在开发中，敬请期待

**适用场景限制：**
- 仅支持调用**自动化流程**的AI助理
- 不支持调用包含**人机交互节点**的AI助理流程
- 确保AI助理流程能够完全自动化执行，无需人工干预

**使用建议：**
- 在调用前，请确认AI助理流程设计为纯自动化执行
- 如需人机交互功能，建议使用前端页面的"发送AI消息"功能
:::


## 应用外调用AI助理 {#external-ai-assistant-calling}

正在开发中...

