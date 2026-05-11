---
sidebar_position: 2
slug: create-skill
description: "在 IDE 中创建标准 Skill，填写名称和描述，并进入 Skill 编辑器维护可复用能力内容。"
---

# 创建一个可被 Agent 复用的标准 Skill

标准 Skill 是平台提供的基础 Skill 类型，适合沉淀通用业务流程、领域规范、输出格式和示例模板。创建完成后，开发者可以在 Skill 编辑器中维护内容，并在 Agent 中安装使用。

## 从 IDE 的 Skills 入口创建 {#create-from-skills-entry}

进入 IDE 后，在左侧主导航中点击`Skills`业务分类。如果当前应用还没有 Skill，可以通过资源面板底部的添加入口创建。

创建时选择`标准Skill`，然后填写基础信息并保存。保存后，Skill 会出现在 Skills 列表中，点击即可进入编辑器。

## 用名称说明 Skill 的复用能力 {#name-the-reusable-capability}

名称应该让开发者和 Agent 都能快速判断这个 Skill 的用途。建议使用“领域 + 能力”的命名方式。

推荐示例：

- `客户跟进策略 Skill`
- `销售周报生成 Skill`
- `合同风险审查 Skill`
- `运维工单分派 Skill`

不建议使用过于宽泛的名称，例如`业务 Skill`、`通用助手 Skill`、`智能处理 Skill`。这类名称很难体现能力边界，也不利于后续选择和维护。

## 用描述限定适用场景和边界 {#describe-scope-and-boundary}

描述不是简单重复名称，而是帮助开发者理解“这个 Skill 什么时候该用，什么时候不该用”。

一个清晰的描述通常包含三类信息：

- **适用对象**：面向客户、合同、工单、报表还是其它业务对象。
- **主要能力**：判断、生成、审核、分类、总结还是给出建议。
- **边界说明**：只提供建议、不直接决策；只处理某类数据；不适用于哪些场景。

示例：

```text
用于销售和客服 Agent 处理客户跟进场景。该 Skill 提供客户分级、跟进节奏、沟通话术和下一步建议，不负责直接修改客户数据。
```

## 保存后进入 Skill 编辑器 {#open-skill-editor-after-save}

保存后，IDE 会打开 Skill 编辑器。编辑器主要包含两个区域：

- **基础信息**：维护 Skill 的名称和描述。
- **提示词与附件**：编写 Skill 的主提示词，并维护复杂规则、模板和示例。

首次创建后，建议先完成 Skill 的主提示词，再根据需要补充附件。内容编写方法见[写出 Agent 能稳定执行的 Skill 内容](./write-skill-content)。

## 创建后安装到 Agent 使用 {#install-skill-after-create}

Skill 创建完成后不会自动影响任何 Agent。开发者需要进入 Agent 编辑器，在`Skills`页签中选择使用方式。详细操作见[让 Agent 安装并使用已有 Skill](./use-skill-in-agent)，也可以直接阅读 AI Agent 章节中的[为 Agent 安装技能](../ai-agent/agent-skill)。
