---
sidebar_position: 12
slug: agent-skill
description: "为 Agent 添加可复用的技能包，快速扩展 Agent 的专业能力。"
---

# 为 Agent 安装技能

Skill 是可复用的领域能力包，安装后可为 Agent 快速赋予特定业务场景下的处理流程、输出规范和判断规则。

如果你还没有创建 Skill，或需要先设计可复用的 Skill 内容，请阅读 [把领域经验沉淀为可复用 Skill](../skills/overview)、[创建一个可被 Agent 复用的标准 Skill](../skills/create-skill) 和 [写出 Agent 能稳定执行的 Skill 内容](../skills/write-skill-content)。

<!-- TODO: 配图 - 截图：Skills 配置界面 -->

## 添加和管理 Skill

在 Agent 编辑器中切换到`Skills`页签，支持三种模式：

- **智能模式**：系统根据用户请求和 Skill 描述自动匹配合适的 Skill，适合任务类型较多的 Agent。
- **自定义**：手动搜索和选择需要的 Skill，适合能力边界明确的 Agent。
- **禁用**：不使用 Skill 功能，适合简单 Agent 或调试 Agent 主提示词时使用。

从 Skill 视角理解三种模式的适用场景，请参考[让 Agent 安装并使用已有 Skill](../skills/use-skill-in-agent)。

## 典型场景

- **客户管理 Skill**：封装客户跟进、合同管理、回访记录的标准化流程和话术，安装后 Agent 即可处理客户全生命周期管理
- **数据报表 Skill**：包含数据查询、报表模板、导出格式的完整工作流，让 Agent 按规范生成报表
- **工单处理 Skill**：整合工单分类、优先级判定、流转规则的领域知识，Agent 可直接处理运维工单

如果一个 Skill 会被多个 Agent 复用，建议按[设计可长期复用的高质量 Skill](../skills/skill-best-practices)中的原则控制边界，避免和 Agent 的主提示词、工具配置或知识库职责混在一起。
