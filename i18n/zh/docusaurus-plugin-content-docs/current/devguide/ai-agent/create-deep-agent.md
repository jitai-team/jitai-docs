---
sidebar_position: 4
slug: create-deep-agent
description: "DeepAgent—擅长任务拆解与子Agent委派，多角色协作完成复杂任务。"
---

# 擅长任务拆解与委派的 DeepAgent

DeepAgent 继承 ReActAgent 的全部能力，并在此基础上增加了子Agent系统。它由父 Agent 负责任务规划与拆解，将子任务委派给多个专门的子Agent并行执行，适合需要多角色协作的复杂场景。

<!-- TODO: 配图 - GIF：创建入口 -->

## DeepAgent 适合什么场景

DeepAgent 与 ReActAgent 的区别：

- **ReActAgent**：单 Agent 自主决策，适合明确、单一的任务
- **DeepAgent**：父 Agent 拆解任务 + 多角色子Agent协作，适合需要多视角、多步骤的复杂任务

典型场景：复杂数据分析（探索→建模→可视化→报告）、多步骤业务流程（需求分析→方案设计→执行→验证）。

## 创建 DeepAgent

在元素目录树中依次点击 `+`、`AI Agent`、`DeepAgent`，填写名称后进入编辑器。

编辑器与 ReActAgent 相同，但配置面板多出`子 Agent`页签。

<!-- TODO: 配图 - 截图：编辑器中的"子 Agent" Tab -->

## 配置子Agent

在`子 Agent`页签中，支持三种模式：

- **智能模式**：系统自动管理子Agent的创建和委派
- **自定义**：手动选择子Agent并配置独立提示词和工具集
- **禁用**：不使用子Agent功能

每个子Agent拥有独立的 System Prompts 和工具集，状态相互隔离。

## 何时升级到 DeepAgent

- **ReActAgent 够用**：单一任务、直接的工具调用，不需要多角色协作
- **需要升级的信号**：任务需要拆解为多个子步骤、需要多角色分工并行处理
