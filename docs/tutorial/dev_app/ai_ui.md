---
sidebar_position: 6
title: 用多Agent实现AI/UI协同阅卷
---
# 用多Agent实现AI/UI协同阅卷

## 前提

1. 同[用专业模式搭建题库管理](./ide_mode.md)创建模型： 答卷表、答卷明细表。
2. 同[用专业模式搭建题库管理](./ide_mode.md)创建页面： 答卷页面。


## 创建AIAgent
AI Agent 可以基于大模型，结合 知识库、MCP服务、应用中的数据模型、服务函数、外部API等实现更复杂的功能，甚至可以直接操作前端页面。

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_ui_agent.mp4" />

## 创建AI助理
AI助理可以提供对话框展示在前端交互，以及

<VideoPlayer relatePath="/docs/tutorial/ai_ui_assi.mp4" />

## 页面中增加按钮与助理交互


1. 开启AI助理，选择「阅卷助理」
2. 「AI阅卷」按钮点击后，发送AI消息。
3. 「AI助理-工作区人机交互」AI助理暂停后，回写数据到表单中。
:::warning
必须先开启AI助理，才能看到「发送AI消息」函数。
:::
<VideoPlayer relatePath="/docs/tutorial/ai_ui_page.mp4" />