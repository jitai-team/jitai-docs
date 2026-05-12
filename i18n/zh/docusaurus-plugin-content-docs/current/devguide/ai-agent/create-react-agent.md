---
sidebar_position: 3
slug: create-react-agent
description: "ReActAgent—最通用的 AI Agent，支持推理与行动交替执行，自主完成任务。"
---

# 最通用的 ReActAgent

ReAct（Reasoning and Acting）是一种结合"推理"与"行动"的 Agent 工作模式。它让 AI 在面对复杂任务时，能够交替进行思考和采取行动，并根据每一步的反馈动态调整后续决策。

跟着这篇文档，你将创建自己的第一个 ReActAgent，并在聊天页面中与它对话。

## 创建 Agent

在元素目录树中依次点击 `+`、`AI Agent`、`ReActAgent`，在弹窗中填写名称，点击`确定`即可创建一个 ReActAgent 并自动进入编辑器。

<!-- TODO: 配图 - GIF：创建入口操作流程 -->

## 认识编辑器

Agent 编辑器提供两种模式：

- **配置面板**：可视化配置，包含多个配置页签，无需写代码
- **代码面板**：源码编辑模式，点击右上角 `</>` 按钮切换

<!-- TODO: 配图 - 截图：编辑器双模式概览（配置面板和代码面板并排） -->

## 选择大模型

大模型是 Agent 智能决策和任务执行的核心。在`基础配置`中完成以下设置：

- **主模型**：Agent 默认使用的模型，需支持 Function Calling 才能调用工具
- **视觉模型**（可选）：用户上传图片时优先调用，处理完图片后继续使用主模型
- **备选模型**：主模型调用失败时按顺序尝试，可添加多个

调用规则：文本输入使用主模型；包含图片时首轮使用视觉模型、后续使用主模型；调用失败时按顺序尝试备选模型。

<!-- TODO: 配图 - GIF：选择大模型并配置参数 -->

:::tip
开发者需要先完成大模型实例元素的创建，才能在 Agent 中选择使用。如果需要调用工具，则对应的模型必须支持 Function Calling。
:::

## 编写能力描述

`能力描述`用于说明 Agent 擅长做什么。当在 FlowAgent 中编排多个 Agent 节点时，描述信息用于路由决策，选择最合适的 Agent 来处理用户请求。

通常，描述信息和 System Prompts 中的角色描述可以保持一致。

## 编写 System Prompts

系统提示词是指导 Agent 行为和决策的重要依据。JitAI 提供了默认模版，开发者可以基于模版修改。

<!-- TODO: 配图 - 截图：System Prompts 编辑区 -->

在提示词中可以用 `{变量名}` 引用输入变量。输出格式由系统自动处理，无需在提示词中描述。

更多编写技巧请参考 [Agent 提示词编写技巧](../advanced-guide/agent-prompt-writing-techniques)。

## 按需切换源码模式

Agent 的大部分配置都可以在配置面板中完成。需要批量调整、复制配置或排查高级问题时，可以点击右上角 `</>` 按钮切换到代码面板。

如果你是第一次创建 Agent，建议先使用配置面板完成模型、提示词、工具和测试；确认 Agent 能稳定工作后，再按需进入源码模式。

## 测试你的 Agent

在[聊天页面](./agent-chat-page)中与你的 Agent 对话，验证它是否能正确理解意图并完成任务。

<!-- TODO: 配图 - GIF：在聊天页面中测试 Agent -->

## 下一步

Agent 已经跑起来了。接下来可以：

- [让 Agent 操作数据库](./agent-tool-data-model)，查询和修改业务数据
- [让 Agent 调用服务函数](./agent-tool-service-function)，执行复杂业务逻辑
- [让 Agent 查阅知识库](./agent-knowledge-base)，提升回答准确性
- [让 Agent 拥有技能](./agent-skill)，安装可复用的技能包
