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

## 选择 DeepAgent 可委派的子 Agent

在`子 Agent`页签中，支持三种模式：

- **智能模式**：运行时获取应用中可委派的 ReActAgent 类型 Agent 清单，由 DeepAgent 根据任务选择合适的子 Agent 并委派。
- **自定义**：手动搜索并勾选可被当前 DeepAgent 委派的 ReActAgent 类型 Agent。适合职责边界明确、希望固定协作成员的场景。
- **禁用**：不启用子 Agent 能力，DeepAgent 不会获得子 Agent 清单，也不会暴露委派任务的工具。

在 DeepAgent 的`子 Agent`页签中，可被选择或运行时发现的子 Agent 是 ReActAgent 类型的 Agent 实例。该页签用于管理“哪些 Agent 可以被委派”，不会在选中某个子 Agent 后展开该 Agent 的完整配置区。

FlowAgent 不作为 DeepAgent 子 Agent 机制中的被委派对象。如果需要按固定流程编排多个 Agent，使用 FlowAgent 的`调用 Agent`节点；如果需要让父 Agent 根据任务动态选择专家 Agent，则使用 DeepAgent，并将具体专家能力拆成 ReActAgent。

### 子 Agent 的能力配置入口 {#configure-sub-agent-instance}

被 DeepAgent 委派的每个子 Agent 对应一个独立的 ReActAgent 实例。要配置它的 System Prompts、工具、知识库、AI技能、文件空间等能力，需要打开对应的 ReActAgent 实例，在该 Agent 自己的编辑器中配置。

这样配置后，DeepAgent 负责拆解任务和委派；被委派的 ReActAgent 使用自己的提示词、工具、知识库和权限边界执行任务。关于知识库查询策略和预检索说明，请参考[让 Agent 查阅知识库](./agent-knowledge-base)。

## 何时升级到 DeepAgent

- **ReActAgent 够用**：单一任务、直接的工具调用，不需要多角色协作
- **需要升级的信号**：任务需要拆解为多个子步骤、需要多角色分工并行处理
