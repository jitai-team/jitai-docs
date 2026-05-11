---
sidebar_position: 5
slug: use-skill-in-agent
description: "将已有 Skill 安装到 AI Agent 中，选择智能模式、自定义模式或禁用模式，让 Agent 复用专业能力。"
---

# 让 Agent 安装并使用已有 Skill

Skill 创建完成后，需要安装到 Agent 中才能发挥作用。开发者可以根据 Agent 的任务范围选择自动匹配、手动指定或禁用 Skill。

## Agent 为什么需要 Skill {#why-agent-needs-skills}

Agent 的主配置适合描述“这个 Agent 是谁、要完成什么任务、能调用哪些工具”。Skill 更适合承载可复用的领域能力。

当 Agent 需要处理某个专业场景时，安装 Skill 可以让它获得更稳定的流程、规则和输出格式。例如：

- 销售 Agent 安装客户跟进 Skill。
- 数据分析 Agent 安装经营报表 Skill。
- 运维 Agent 安装工单处理 Skill。
- 法务 Agent 安装合同风险审查 Skill。

## 在 Agent 编辑器中进入 Skills 配置 {#open-skills-tab-in-agent}

打开目标 Agent 的编辑器，进入`Skills`页签。平台提供三种使用方式：

- **智能模式**
- **自定义**
- **禁用**

详细入口和按钮说明可参考 AI Agent 章节的[为 Agent 安装技能](../ai-agent/agent-skill#添加和管理-skill)。

## 智能模式适合多场景 Agent {#smart-mode}

如果一个 Agent 需要处理多类任务，或者你希望平台根据上下文自动选择合适的 Skill，可以使用智能模式。

适合场景：

- 企业助手同时处理客服、销售、数据查询等任务。
- 一个 Agent 安装了多个领域 Skill。
- 用户请求类型不固定，需要按语义自动匹配能力。

使用智能模式时，Skill 的名称和描述要写得足够清楚，否则 Agent 难以判断什么时候使用哪个 Skill。如何写清楚名称和描述，可参考[创建一个可被 Agent 复用的标准 Skill](./create-skill)。

## 自定义模式适合能力边界明确的 Agent {#custom-mode}

如果 Agent 的任务范围很明确，建议使用自定义模式，手动选择需要的 Skill。

适合场景：

- 客服 Agent 只安装客服话术和工单处理相关 Skill。
- 合同审查 Agent 只安装合同风险审查 Skill。
- 报表 Agent 只安装数据口径和报表输出相关 Skill。

自定义模式可以减少无关 Skill 干扰，让 Agent 更稳定地执行目标任务。

## 什么时候禁用 Skill {#disable-skills}

以下情况可以禁用 Skill：

- Agent 的任务非常简单，不需要额外领域能力。
- 正在调试 Agent 主提示词，希望排除 Skill 影响。
- 某个 Agent 必须严格依赖工具或知识库，不需要额外流程指导。
- Skill 内容尚未验证，暂时不希望影响线上效果。

禁用 Skill 不会删除 Skill 元素，只是不让当前 Agent 使用。

## 安装后用真实任务验证效果 {#verify-with-real-tasks}

安装 Skill 后，建议用真实业务任务验证效果，而不是只测试简单问答。

重点观察：

- Agent 是否在正确场景使用 Skill。
- 输出格式是否符合 Skill 约定。
- 是否遵守 Skill 中的边界和约束。
- 多个 Skill 同时存在时是否互相冲突。

如果效果不稳定，优先检查 Skill 的适用场景、能力范围和执行步骤是否清楚。内容编写方法见[写出 Agent 能稳定执行的 Skill 内容](./write-skill-content)。
