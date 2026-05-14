---
sidebar_position: 25
slug: agent-built-in
description: "理解平台内置 Agent 的能力边界、组织方式和设计思路，既帮助最终用户选用，也帮助开发者复用其设计范式。"
---

# 看懂平台内置 Agent

平台内置 Agent 是一组已经可以直接使用的业务智能体。最终用户可以在聊天页面直接使用它们完成建模、取数、数据操作和业务分析；开发者也可以把它们当作参考样板，理解平台是如何组合 [ReActAgent](./create-react-agent)、[DeepAgent](./create-deep-agent)、[AI 技能](../skills/overview)、[AI 文件空间](../ai-file-storage/overview)、[数据模型工具](./agent-tool-data-model)、[服务函数工具](./agent-tool-service-function)、[隐私保护](./agent-privacy)和[角色权限](./agent-permissions)这些能力来解决真实问题的。

这篇文档只讲三件事：

1. 平台内置 Agent 分别适合解决什么问题。
2. 平台是怎样把这些 Agent 组织成几条稳定工作链路的。
3. 开发者设计自己的 Agent 时，可以直接复用哪些思路。

## 先统一几组概念 {#core-concepts}

为了便于理解，先统一本文中的几组术语。

- **内置 Agent**：平台预置、可以直接在聊天页面使用的 Agent 实例。
- **场景 Agent**：围绕单一任务设计的 Agent，例如需求建模、结构画像、数据查询取数。
- **专家 Agent**：面向开放问题、负责统筹分析路径的 Agent，例如`业务数据洞察分析`。
- **工作链路**：多个 Agent 按先后关系组成的一条稳定处理路径。
- **中间产物**：结构画像、口径说明、查询结果、分析报告这类可复核文件，通常保存在[AI 文件空间](./agent-file-space)中。

如果用一句话概括，平台内置 Agent 的思路是：**把复杂问题拆成少数几条稳定链路，再把链路中的关键步骤交给边界清晰的场景 Agent。**

## 先按任务选 Agent {#choose-built-in-agent-by-task}

最终用户通常不需要先理解 Agent 类型，而是先判断自己要解决什么问题。

| 你要解决的问题 | 推荐 Agent | 结果是什么 |
| --- | --- | --- |
| 只有业务需求，还没有现成数据库表 | 以用户需求为基准的模型生成与维护 | 生成或维护数据模型 |
| 已经有数据库表或视图，想转成平台数据模型 | 以数据库为基准的模型生成与维护 | 生成或维护数据模型 |
| 想先看清楚表或视图的字段结构 | 数据库表/视图结构画像 | 得到结构画像文件 |
| 已经有结构画像，想生成模型配置 | 根据表/视图结构画像生成模型配置 | 得到模型配置并提交 |
| 想查询、新增、修改、删除业务数据 | 数据操作/查询智能体 | 完成日常数据操作 |
| 想先把业务问题整理成清晰口径 | 数据口径设计 | 得到口径说明和查询要求 |
| 想按明确要求把数据查出来 | 数据查询取数 | 得到查询结果文件 |
| 想回答一个开放的经营或运营问题 | 业务数据洞察分析 | 得到分析报告 |

如果从能力边界来看，这 8 个 Agent 其实可以归到 4 类任务：

- **需求建模**：把业务需求变成数据模型。
- **结构建模**：把数据库结构变成数据模型。
- **数据操作**：围绕已有模型做查询和增删改。
- **业务洞察**：围绕开放业务问题形成分析报告。

## 四类内置 Agent 分别在做什么 {#four-groups-of-built-in-agents}

### 1. 需求建模 Agent {#business-requirement-modeling}

`以用户需求为基准的模型生成与维护`适合“我知道业务要管什么，但还没有表结构”的场景。它根据用户描述的业务目标、核心对象、字段需求和关联关系，规划并创建数据模型。

这个 Agent 的重点不是机械照抄字段清单，而是把业务语言转换成模型设计。它更像一个建模助手：先判断模型边界，再补足字段、约束和关系，最后提交模型。

它体现了三种清晰的设计方法：

- 用 [ReActAgent](./create-react-agent) 承接边界明确的单专家任务。
- 把“基于需求建模”沉淀为 [AI 技能](../skills/use-skill-in-agent)，而不是把全部规则散落在提示词里。
- 结合[运行时上下文注入](./agent-runtime-context)和默认保存库，减少用户必须手工补齐的环境信息。

相关文档：

- [创建数据表模型](../data-modeling/data-table-model)
- [创建数据模型函数](../data-modeling/create-data-model-functions)
- [创建 AI 技能](../skills/create-skill)

### 2. 结构建模 Agent {#database-structure-modeling}

这组 Agent 适合“数据库已经存在，平台要去理解它、吸收它、转成模型”的场景。它不是一个 Agent 完成全部工作，而是一条三段式链路：

1. `数据库表/视图结构画像`
2. `根据表/视图结构画像生成模型配置`
3. `以数据库为基准的模型生成与维护`

这三者的分工分别是：

- **结构画像**：负责读取数据库结构，输出结构证据，不提交模型。
- **模型配置生成**：负责读取结构证据，生成模型配置并提交。
- **数据库基准建模 Agent**：负责统筹整条链路，决定何时读取结构、何时生成配置、何时汇总结果。

这里最值得借鉴的不是“会不会建模”，而是**先证据，后提交**。平台没有把“读取结构”“解释字段”“提交模型”混在一个步骤里，而是明确拆成前后两个场景 Agent，再由一个 [DeepAgent](./create-deep-agent) 负责组织。

这条链路同时还体现了几个重要范式：

- 使用[子 Agent](./create-deep-agent#选择-deepagent-可委派的子-agent)拆分复杂任务。
- 使用[AI 文件空间](./agent-file-space)保存结构画像等中间产物，便于复核和复用。
- 使用[服务函数工具](./agent-tool-service-function)提交模型，而不是由提示词直接“想象建模结果”。
- 在结构画像阶段启用[隐私保护](./agent-privacy)，因为这一步会接触真实结构和样本数据。
- 依赖已经配置好的[数据库连接](../data-modeling/manage-database-connections)和现有表结构。

如果用户只想“先看看表结构再说”，就用`数据库表/视图结构画像`。
如果用户已经明确“我现在就要基于数据库生成模型”，就用`以数据库为基准的模型生成与维护`。

### 3. 数据操作 Agent {#data-operation-and-query}

这组 Agent 面向已经建好的数据模型，负责让最终用户用自然语言完成数据处理。它包含两个层次：

- `数据操作/查询智能体`
- `数据查询取数`

`数据操作/查询智能体`面向日常业务动作，重点是“查、增、改、删”。
`数据查询取数`面向结构化取数任务，重点是“把明确的查询要求稳定执行出来”。

两者的边界很清楚：

- 如果用户要的是业务动作，例如新增客户、修改状态、删除记录，优先用`数据操作/查询智能体`。
- 如果用户已经有明确的查询目标、字段、筛选和统计要求，优先用`数据查询取数`。

这组 Agent 体现的是另一套设计原则：**把日常操作和分析取数分开。**

这样做的好处是：

- 日常数据操作可以保持交互简单，适合最终用户直接使用。
- 结构化取数可以保持口径稳定，适合被其它 Agent 复用。
- 聚合、排行、趋势、图表等复杂查询可以交给`query-builder`这类 [AI 技能](../skills/overview) 专门处理。

这里尤其要注意术语边界：

- **工具暴露**不是权限控制，只是决定哪些函数会出现在大模型可见上下文里。参见[按需向大模型暴露工具函数](./agent-tool-management)。
- **权限控制**依赖[角色权限](./agent-permissions)。是否真的能查、能改、能删，由运行时权限决定，而不是由提示词决定。

相关文档：

- [让 Agent 调用数据模型](./agent-tool-data-model)
- [在 AI Agent 中调用数据模型](../data-modeling/calling-data-models-in-ai-agent)
- [Agent 工具暴露与角色权限边界](../user-and-permission/agent-tool-permission-control)
- [AI 数据管理页面](../shell-and-page/ai-data-management-page)

### 4. 业务洞察 Agent {#business-data-insight}

这组 Agent 面向开放业务问题，不是为了“尽快返回一条查询结果”，而是为了“尽可能回答清楚一个问题”。它包含：

- `数据口径设计`
- `数据查询取数`
- `业务数据洞察分析`

这三者组成了一条分析链路：

1. 先把业务问题整理成口径。
2. 再按口径执行取数。
3. 最后把结果组织成业务分析报告。

其中：

- `数据口径设计`负责把业务问题转成数据问题。
- `数据查询取数`负责把数据问题变成数据结果。
- `业务数据洞察分析`负责组织整个分析过程，并输出最终报告。

`业务数据洞察分析`是平台内置 Agent 里最典型的**专家 Agent**。它面对的是开放问题，例如“最近业绩为什么下滑”“客户流失有什么规律”“运营质量出了什么问题”。这类问题一开始往往没有现成的模型、字段、时间范围和分析路径，所以它必须先探索、再收敛、再取数、再解释。

这里要特别强调平台的设计哲学：

**开放问题交给专家 Agent 深度探索，明确任务交给场景 Agent 快速执行。**

这意味着：

- 如果目标是开放问题，允许 Agent 多走几步，换取更完整的答案。
- 如果目标是固定任务，尽量缩短链路，换取更快更稳的响应。

| 类型 | 适合的问题 | 特点 |
| --- | --- | --- |
| 专家 Agent | 开放问题、原因分析、经营诊断 | 运行时间更长，但答案更完整 |
| 场景 Agent | 明确查询、固定动作、稳定报表 | 运行更快，结果更稳定 |
| 组合链路 | 多阶段复杂任务 | 用多个场景 Agent 组成一条可复用工作链路 |

相关文档：

- [DeepAgent](./create-deep-agent)
- [Agent 文件空间](./agent-file-space)
- [自动压缩对话上下文](./agent-context)
- [AI 数据分析页面](../shell-and-page/ai-data-analysis-page)

## 平台到底复用了哪些能力 {#platform-capabilities-used-by-built-in-agents}

把 8 个内置 Agent 放在一起看，会发现平台反复在复用同几类能力。

| 平台能力 | 在内置 Agent 中的典型作用 |
| --- | --- |
| [ReActAgent](./create-react-agent) | 承担边界明确的单专家任务 |
| [DeepAgent](./create-deep-agent) | 组织多步骤链路和子 Agent 协作 |
| [AI 技能](../skills/overview) | 沉淀稳定、可复用的专业方法 |
| [AI 文件空间](./agent-file-space) | 保存中间产物和最终报告 |
| [数据模型工具](./agent-tool-data-model) | 执行业务数据读写 |
| [服务函数工具](./agent-tool-service-function) | 执行复杂业务动作和模型提交 |
| [按需暴露工具函数](./agent-tool-management) | 控制大模型看到哪些候选工具 |
| [角色权限](./agent-permissions) | 决定用户实际可以执行哪些操作 |
| [隐私保护](./agent-privacy) | 在接触真实敏感信息时做脱敏和哈希 |
| [运行时上下文注入](./agent-runtime-context) | 让 Agent 感知当前用户、时间和语言环境 |
| [自动压缩对话上下文](./agent-context) | 支撑长任务、多轮任务持续运行 |

从开发者角度看，内置 Agent 最值得复用的不是某一句提示词，而是下面这几条方法：

- 用少数几条稳定工作链路组织复杂任务。
- 把高频专业步骤沉淀成 Skill，而不是重复写在多个 Agent 中。
- 把复杂任务拆成边界清楚的场景 Agent，再决定是否需要一个专家 Agent 来统筹。
- 让中间产物显式化，保存为文件，便于复核和复用。
- 把用户确认、工具暴露、角色权限、隐私保护分别放在各自该承担的位置，不混成一个模糊的“安全机制”。

## 在聊天页面中如何使用 {#use-built-in-agent-in-chat-page}

在聊天页面的 Agent 选择器中选择对应名称即可开始对话。也可以通过 URL 直接进入：

```text
http://host:port/orgId/appId/AI#aiagents.DataOperationAgent
```

将 `aiagents.DataOperationAgent` 替换为其他 Agent 的 fullName 即可。

| Agent | fullName |
| --- | --- |
| 以用户需求为基准的模型生成与维护 | `aiagents.SpecModelingAgent` |
| 以数据库为基准的模型生成与维护 | `aiagents.TableModelingAgent` |
| 数据库表/视图结构画像 | `aiagents.DbTableViewSchemaProfile` |
| 根据表/视图结构画像生成模型配置 | `aiagents.DbModelConfigBySchema` |
| 数据操作/查询智能体 | `aiagents.DataOperationAgent` |
| 数据口径设计 | `aiagents.DataMetricModeling` |
| 数据查询取数 | `aiagents.DataRetrievalExecution` |
| 业务数据洞察分析 | `aiagents.GeneralSystemDataAnalysis` |

关于聊天页面的详细用法，参见[在聊天页面中使用 Agent](./agent-chat-page)。
