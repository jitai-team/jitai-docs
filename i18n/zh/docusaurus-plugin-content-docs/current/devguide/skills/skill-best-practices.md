---
sidebar_position: 6
slug: skill-best-practices
description: "设计边界清晰、稳定可复用、便于长期维护的高质量 Skill。"
---

# 设计可长期复用的高质量 Skill

高质量 Skill 的标准不是内容越多越好，而是边界清晰、可复用、易维护，并且能让 Agent 在正确场景下稳定使用。

## 一个 Skill 只解决一类问题 {#one-skill-one-problem}

不要把多个不相关能力塞进同一个 Skill。一个 Skill 最好只围绕一类业务问题展开。

推荐拆分：

- `客户跟进 Skill`
- `客户流失风险分析 Skill`
- `销售周报生成 Skill`

不推荐合并为：

- `销售全能 Skill`

拆分后，Agent 可以按任务需要组合多个 Skill，也更容易维护每个 Skill 的规则。

## 描述要让 Agent 能判断是否适用 {#description-should-guide-selection}

Skill 描述不只是给人看的，也会影响 Agent 是否正确使用它。描述要包含适用场景、主要能力和边界。

较弱描述：

```text
用于客户管理。
```

较好描述：

```text
用于销售和客服 Agent 分析客户跟进状态，判断客户优先级并生成下一步沟通建议。不负责直接修改客户数据或承诺成交结果。
```

如果你计划使用 Agent 的智能模式选择 Skill，描述尤其重要。

## 不要和 Agent 主提示词重复职责 {#avoid-overlap-with-agent-prompts}

Agent 主提示词负责定义当前 Agent 的身份、任务目标和整体行为。Skill 负责提供可复用的领域能力。

不建议在 Skill 中写：

```text
你是销售主管助手，负责所有销售管理工作。
```

更适合写：

```text
当需要分析客户跟进状态时，按本 Skill 的分级规则和输出格式生成跟进建议。
```

如果某段内容只适用于一个 Agent，放在 Agent 的 System Prompts 中更合适。相关配置见[编写 System Prompts](../ai-agent/create-react-agent#编写-system-prompts)。

## 输出格式要可检查 {#make-output-checkable}

Skill 如果要求 Agent 输出结果，尽量让输出格式稳定、可检查。

推荐使用：

- 固定标题。
- 表格字段。
- 分条清单。
- 明确的结论、依据、建议。

示例：

```markdown
### 判断结论

### 关键依据

### 建议动作

### 需要人工复核的信息
```

如果 Agent 的下游流程依赖结构化结果，可以结合[输入输出配置](../ai-agent/agent-input-output)设计。

## 复杂知识拆成附件 {#split-complex-knowledge-into-attachments}

主提示词不宜过长。复杂规则、术语表、模板和示例建议拆成附件，并在主提示词中说明每个附件的用途。

这样做有两个好处：

- 主流程更清晰，Agent 更容易抓住重点。
- 业务规则可以独立维护，不影响 Skill 主结构。

附件管理方法见[用附件管理复杂规则、模板和示例](./skill-attachments)。

## 不要把知识库内容搬进 Skill {#do-not-copy-knowledge-base}

Skill 适合写“怎么做”，知识库适合放“事实资料”。不要把大量产品手册、制度文件、历史记录复制进 Skill。

建议分工：

- **Skill**：如何判断、如何处理、如何输出。
- **知识库**：产品文档、制度条款、FAQ、历史资料。
- **工具**：查询、写入、调用接口、操作页面。

如果 Agent 需要基于文档回答问题或检索资料，应该使用[让 Agent 查阅知识库](../ai-agent/agent-knowledge-base)。

## 先小范围验证再复用到多个 Agent {#validate-before-reuse}

Skill 一旦被多个 Agent 使用，影响范围会变大。建议先在一个测试 Agent 中验证，再推广到更多 Agent。

验证时重点看：

- 使用场景是否准确。
- 输出格式是否稳定。
- 是否和 Agent 主提示词冲突。
- 是否需要额外工具或知识库支持。
- 是否存在高风险操作，需要角色权限或业务复核流程。

如果 Skill 会引导 Agent 调用高风险工具，还需要结合[按需向大模型暴露工具函数](../ai-agent/agent-tool-management)和角色权限进行配置。工具暴露用于影响模型选择，角色权限才负责阻止越权调用。
