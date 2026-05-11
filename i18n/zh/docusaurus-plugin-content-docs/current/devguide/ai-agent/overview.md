---
sidebar_position: 1
slug: overview
description: "Agent 可直接调用数据模型函数、服务函数和页面函数，触及应用的各个层次。了解四种 Agent 类型，找到适合你业务场景的方案。"
---

# 认识 AI Agent

在 JitAI 平台上，Agent 可以直接调用数据模型函数、服务函数和页面函数——三者都是 Agent 的原生工具，无需额外封装。此外，平台还提供知识库、记忆系统、子代理、技能包、权限控制、隐私保护等能力。

## Agent 能触及的层次

Agent 能调用自身应用内的函数，也能连接外部第三方应用。

- **数据层** —— 数据模型函数：每个数据模型自带增删改查，Agent 可直接读写业务数据库。参见[数据模型函数](../data-modeling/create-data-model-functions)。
- **逻辑层** —— 服务函数：用 Python 封装业务逻辑，Agent 可将服务函数作为工具调用。服务函数也可通过 REST 请求调用外部系统的 API。参见[创建服务元素](../business-logic-development/creating-service-elements)。
- **界面层** —— 页面函数：页面上的内置函数和自定义函数自动成为 Agent 的可用工具，Agent 可直接操作前端组件。参见[页面函数](../shell-and-page/generic-page#page-functions)。
- **外部** —— 嵌入第三方网页：通过 EmbeddedAgent 引用已有 Agent 实例，将其包装后嵌入外部网页。网页可调用 Agent，Agent 也可调用网页暴露的 JavaScript 函数。参见[创建 EmbeddedAgent](./create-embedded-agent)。

<!-- TODO: 配图 - 四种 Agent 类型对比图表（自制） -->

## 四种 Agent，覆盖所有场景

| 类型 | 架构模式 | 决策方式 | 典型场景 |
|------|---------|---------|---------|
| **ReActAgent** | 单一 Agent | 自主推理 → 调用工具 | 数据查询、表单填写、流程触发 |
| **DeepAgent** | 父子 Agent | 规划 → 委派多角色子代理协作 | 多角色协同完成复杂任务：多源数据整合分析、多视角方案评估 |
| **FlowAgent** | 工作流节点 | 流程驱动，节点内 AI 决策 | 固定流程中嵌入 AI 节点：审批流、数据处理管道、定时任务 |
| **EmbeddedAgent** | 独立嵌入 | 自主推理 + 双向交互 | 嵌入官网的智能助手、SaaS 内嵌、网页双向交互 |

## 我该选哪种

### 选择 Agent 类型

- **"让 AI 直接查数据库、填表单"** → [创建 ReActAgent](./create-react-agent)
- **"需要多角色团队协作完成复杂任务"**（AI 自行拆解步骤，委派子代理并行执行）→ [创建 DeepAgent](./create-deep-agent)
- **"业务流程框架固定，局部节点利用 AI 智力处理"**（你预定义总体流程，AI 负责节点决策）→ [创建 FlowAgent](./create-flow-agent)
- **"把 AI 嵌入公司官网或第三方网页，需要双向交互"** → [创建 EmbeddedAgent](./create-embedded-agent)

### 扩展能力（适用于所有类型）

- **"让 AI 基于产品文档回答问题"** → 在 Agent 中[添加知识库](./agent-knowledge-base)
- **"让 AI 记住每个客户的偏好"** → 配置[跨会话记忆](./agent-memory)

<!-- TODO: 配图 - Agent 在聊天页面中工作的效果截图 -->

## 下一步

- **新手入门**：[最通用的 ReActAgent](./create-react-agent) → 添加[数据模型函数](./agent-tool-data-model) → 在[聊天页面](./agent-chat-page)中测试
- **有经验**：直接查看 [DeepAgent](./create-deep-agent) / [FlowAgent](./create-flow-agent) 或[运行时扩展](./agent-runtime-extension)
