---
sidebar_position: 6
title: 用Agent实现AI/UI协同阅卷
---
# 用Agent实现AI/UI协同阅卷

## 案例效果

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_ui_effect.mp4" />

## 实现过程

### 前提

1. 同[用专业模式搭建题库管理](./ide_mode.md)创建模型： 答卷表、答卷明细表。
2. 同[用专业模式搭建题库管理](./ide_mode.md)创建页面： 答卷页面。


### 创建AIAgent

AIAgent是AI应用核心执行引擎，基于ReAct架构实现推理与行动的循环决策。它负责工具编排、动态组合和调用各种业务工具和服务，维护对话上下文、任务执行状态和数据流转状态，支持复杂业务逻辑的分解和执行，并提供基于用户角色的工具访问权限管理。

<VideoPlayer relatePath="/docs/tutorial/ai_ui_agent.mp4" />

### 创建AI助理
AI助理是AI应用与用户交互的统一界面，基于LangGraph架构实现智能路由和多Agent协同。它负责路由决策、智能对话和工作流控制，支持可视化编排、复杂业务逻辑和一键集成能力。

<VideoPlayer relatePath="/docs/tutorial/ai_ui_assi.mp4" />

### 页面中增加按钮与助理交互

1. 开启AI助理，选择「阅卷助理」
2. 「AI阅卷」按钮点击后，发送AI消息。
3. 「AI助理-工作区人机交互」AI助理暂停后，回写数据到表单中。
:::warning
必须先开启AI助理，才能看到「发送AI消息」函数。
:::
<VideoPlayer relatePath="/docs/tutorial/ai_ui_page.mp4" />