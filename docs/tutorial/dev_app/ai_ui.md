---
sidebar_position: 6
title: 用AI Agent实现AI/UI协同阅卷
---
# 用AI Agent实现AI/UI协同阅卷

## 案例效果

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="../../../tutorial/ai_ui_effect.mp4" />

## 实现过程

### 前提

1. 同[用专业模式搭建题库管理](./ide_mode)创建模型： 答卷表、答卷明细表。
2. 同[用专业模式搭建题库管理](./ide_mode)创建页面： 答卷页面。
3. 已经按照[用AI大模型函数实现生成答案](./ai_func) 创建了大模型厂商元素。

### 创建AIAgent

Agent(智能体代理)具备自主决策和任务执行能力，能够根据用户输入和上下文信息，自动选择合适的工具完成复杂的业务流程。

一个Agent的基本组成是系统提示词、工具（包括应用系统的模块函数）、大模型。

JitAi的Agent实现与应用系统原生融合、高度集成，除了支持调用MCP服务、配置知识库外，还支持直接操作Jit应用中的数据模型的数据，甚至读取前端页面中的数据、控制页面上的组件行为。

本案例中，创建AIAgent及其配置操作如下: (其中就通过 页面的 `getVarableValue` 函数读取了当前答卷的详情；然后通过答卷明细中关联的题目，直接获取该题目的标准答案作为评分参考。)

<VideoPlayer relatePath="../../../tutorial/ai_ui_agent.mp4" />

阅读[AIAgent](../../devguide/ai-agent)了解更多。

### 创建AI助理

AI Agent 相当于公司中的员工，负责完成相对明确和具体的事情；AI助理相当于公司中的项目经理/主管，负责协调多个Agent完成复杂任务。

JitAi的AI助理，还提供对话框，可以直接与用户进行交互。

本案例中，创建AI助理及其配置操作如下: 
<VideoPlayer relatePath="../../../tutorial/ai_ui_assi.mp4" />

阅读[AI助理](../../devguide/ai-assistant)了解更多。

### 页面中配置事件与AI助理联动

前端页面中通过配置事件，与AI助理进行交互，实现人机AI/UI 协同完成任务。

本案例中，我们要要达到以下目的：
1. `AI阅卷`按钮点击后，发送AI消息，开始阅卷。
2. AI回答完毕后，讲评分和评语回写到页面中的答卷表单中。
   
操作步骤也很简单，配置页面事件如下：

<VideoPlayer relatePath="../../../tutorial/ai_ui_page.mp4" />

:::warning
必须先开启AI助理，才能看到`发送AI消息`函数。
:::