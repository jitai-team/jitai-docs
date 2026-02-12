---
title: "企业系统中的 LLM：从对话到可治理执行"
date: 2026/02/10
authors: []
disableDefaultStructuredData: true
description: "讲清企业级 LLM 的术语体系、LLM 向 AI agent 演进的关键机制，以及面向生产的分层架构、治理与评测路径，帮助团队将能力落到可审计、可控的工作流执行。"
keywords:
    [
        大型语言模型,
        AI agent,
        JitAI,
        检索增强生成,
        工具调用,
        函数调用,
        流程编排,
        大语言模型运维,
        人工智能治理,
    ]
slug: llms-enterprise-systems-agents-governance
---

import Head from "@docusaurus/Head";

export const jsonLd = {
"@context": "https://schema.org",
"@graph": [
{
"@type": "Organization",
"@id": "https://jit.pro/#organization",
"name": "JitAI",
"legalName": "武汉万云网络科技有限公司",
"url": "https://jit.pro/",
"logo": {
"@type": "ImageObject",
"url": "https://jit-www.oss-accelerate.aliyuncs.com/logo/logo.svg"
},
"sameAs": [
"https://forum.jit.pro/",
"https://github.com/jitai-team",
"https://x.com/JitAi2017",
"https://www.instagram.com/jitai_2017",
"https://www.youtube.com/channel/UClvTNJPvBhek3aFuDy87RJQ",
"https://www.facebook.com/people/JitAi/61581485995674",
"https://www.linkedin.com/company/jitai2017"
]
},
{
"@type": "WebSite",
"@id": "https://jit.pro/#website",
"name": "JitAI",
"url": "https://jit.pro/",
"publisher": {
"@id": "https://jit.pro/#organization"
},
"inLanguage": [
"en",
"zh-CN"
]
},
{
"@type": "Blog",
"@id": "https://jit.pro/zh/blog#blog",
"name": "博客",
"url": "https://jit.pro/zh/blog",
"isPartOf": {
"@id": "https://jit.pro/#website"
},
"publisher": {
"@id": "https://jit.pro/#organization"
},
"inLanguage": "zh-CN"
},
{
"@type": "WebPage",
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#webpage",
"url": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution",
"name": "企业系统中的 LLM：从对话到可治理执行",
"description": "讲清企业级 LLM 的术语体系、LLM 向 AI agent 演进的关键机制，以及面向生产的分层架构、治理与评测路径，帮助团队将能力落到可审计、可控的工作流执行。",
"isPartOf": {
"@id": "https://jit.pro/#website"
},
"breadcrumb": {
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#breadcrumb"
},
"inLanguage": "zh-CN"
},
{
"@type": "BreadcrumbList",
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#breadcrumb",
"itemListElement": [
{
"@type": "ListItem",
"position": 1,
"name": "首页",
"item": "https://jit.pro/"
},
{
"@type": "ListItem",
"position": 2,
"name": "博客",
"item": "https://jit.pro/zh/blog"
},
{
"@type": "ListItem",
"position": 3,
"name": "企业系统中的 LLM：从对话到可治理执行",
"item": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution"
}
]
},
{
"@type": "BlogPosting",
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#blogposting",
"mainEntityOfPage": {
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#webpage"
},
"url": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution",
"headline": "企业系统中的 LLM：从对话到可治理执行",
"name": "企业系统中的 LLM：从对话到可治理执行",
"description": "讲清企业级 LLM 的术语体系、LLM 向 AI agent 演进的关键机制，以及面向生产的分层架构、治理与评测路径，帮助团队将能力落到可审计、可控的工作流执行。",
"datePublished": "2026-02-03T00:00:00.000Z",
"dateModified": "2026-02-03T00:00:00.000Z",
"inLanguage": "zh-CN",
"isPartOf": {
"@id": "https://jit.pro/zh/blog#blog"
},
"author": {
"@id": "https://jit.pro/#organization"
},
"publisher": {
"@id": "https://jit.pro/#organization"
},
"image": [
"https://jit-www.oss-accelerate.aliyuncs.com/logo/logo_dark.svg"
],
"keywords": [
"大型语言模型",
"AI agent",
"JitAI",
"检索增强生成",
"工具调用",
"函数调用",
"流程编排",
"大语言模型运维",
"人工智能治理"
],
"timeRequired": "PT12M"
},
{
"@type": "FAQPage",
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#faq",
"isPartOf": {
"@id": "https://jit.pro/zh/blog/llm-enterprise-systems-governed-execution#webpage"
},
"inLanguage": "zh-CN",
"mainEntity": [
{
"@type": "Question",
"name": "LLM 和 AI agent 的区别是什么？",
"acceptedAnswer": {
"@type": "Answer",
"text": "LLM 指模型本体。AI agent 指一种应用形态：模型在系统提供的工具、状态与策略约束下，能够跨步骤规划并执行任务。"
}
},
{
"@type": "Question",
"name": "已有很强的模型，还需要 RAG 吗？",
"acceptedAnswer": {
"@type": "Answer",
"text": "当输出需要对齐最新的内部制度、合同、工单或产品文档时，检索能提供可溯源上下文，让结果更容易核验与审计。"
}
},
{
"@type": "Question",
"name": "什么让 LLM 系统具备“企业可用性”？",
"acceptedAnswer": {
"@type": "Answer",
"text": "关键在系统层能力：身份与权限、工具白名单与参数校验、审计日志、评测门禁、在线监控，以及对系统记录的安全回写控制。"
}
},
{
"@type": "Question",
"name": "部署 LLM 一定需要 ISO/IEC 42001 吗？",
"acceptedAnswer": {
"@type": "Answer",
"text": "很多场景不要求必须采用该标准。它更像一套可被采购与合规理解的管理体系参考，用来组织生命周期治理、风险控制与持续改进。"
}
},
{
"@type": "Question",
"name": "如何在生产中降低幻觉？",
"acceptedAnswer": {
"@type": "Answer",
"text": "优先用检索提供权威上下文，输出采用结构化 schema，加入规则与一致性校验，并对高影响动作配置失败关闭或强制审批。"
}
},
{
"@type": "Question",
"name": "什么时候保留人类在回路？",
"acceptedAnswer": {
"@type": "Answer",
"text": "当动作涉及资金、权限、合规决策、不可逆记录变更，或评测显示不确定性仍偏高时，建议保留审批与可回滚机制。"
}
}
]
}
]
}

<Head>
    <script data-rh="true" type="application/ld+json">
        {JSON.stringify(jsonLd)}
    </script>
</Head>

大语言模型（LLM）已经不再局限于“聊天”。在企业场景里，它们正在成为一种新的运行时能力：能够基于上下文推理、调用工具、驱动工作流——前提是你用正确的系统设计把它们“装进”可控的执行框架里。

本指南给出可复用的 LLM 术语体系，解释 LLM 如何演进为 AI agent，并梳理“可用于生产”的 AI 原生企业应用应具备的关键要素，尤其适用于 AI 低代码平台与企业开发平台。

<!--truncate-->

## LLM 是什么，以及它不是什么

LLM（Large Language Model）是一类深度学习模型，通过在海量语料上学习“预测下一个 token”，从而擅长语言理解与生成：摘要、抽取、翻译、分类、撰写，以及与代码相关的任务。

LLM 本身并不天然具备：

- 对你业务数据的已验证知识
- 安全更新记录的权限
- 可预测的确定性行为
- 对系统记录（systems of record）的持久记忆

这些能力来自外围系统：检索（retrieval）、工具集成（tools）、身份与权限（identity & permissions）、工作流控制（workflow controls）、日志（logging）、评测（evaluations）与监控（monitoring）。

## 为什么 LLM 对企业开发平台很重要

![image.png](image.png)

企业团队正在快速采用 AI，但真正的价值通常出现在 LLM 被集成进系统与工作流之后，而不是把它当作一个独立聊天工具来用。

两个中性信号能说明趋势方向：

- 2024 年，71% 的受访者表示在至少一个业务职能中使用了生成式 AI，78% 表示其组织在使用 AI。
- 2024 年，生成式 AI 的全球私人投资达到 339 亿美元，同比增加 18.7%，并且该领域占全部 AI 私人投资的 20% 以上。

这些趋势带来一个很具体的产品需求：企业需要把 LLM 的能力转化为可重复、可治理、能在业务系统内落地的结果。

## 架构评审时可直接复用的关键术语

### LLM（模型）

一个概率性引擎：在给定输入上下文的情况下生成或变换文本（很多模型也支持多模态）。

### Prompt（指令 + 上下文）

你提供的指令与上下文（也可能包含结构化数据），用来引导模型输出。

### Context window（上下文窗口）

模型在一次运行中可考虑的输入容量。它会影响单步能稳定完成的任务上限，并推动你采用分块、检索与工作流拆分。

### RAG（Retrieval-Augmented Generation，检索增强生成）

一种模式：从外部语料（制度、工单、产品文档、合同等）检索相关内容并注入上下文，使输出可溯源、可核验。

### Tool calling / Function calling（工具调用 / 函数调用）

一种模式：模型选择外部工具（API、数据库查询、工作流步骤）。在生产环境中，“调用”需要由你可控的编排器（orchestrator）做校验与执行。

### AI agent（智能体）

一种应用形态：LLM 能跨多步规划与行动，使用工具与状态，通常包含记忆与工作流控制。更直观地说：agent 是“被放进系统里、能够执行”的 LLM。

### System（面向企业 LLM 的系统层）

围绕模型的可治理运行时：身份、权限、检索、工具、工作流、策略、审计日志、评测、可观测性与安全回写（safe write-back）。企业级可靠性主要来自这里。

## 企业真正发生的变化：LLM → agent

很多团队从“助手”起步：回答问题、起草内容。下一步会走向 agentic：完成工作。

一个可参考的采用信号：McKinsey & Company 的全球调查显示，62% 的受访者称其组织至少在试验 AI agents。

这类试验的成败往往取决于同一个关键点：系统能否让 agent 在可控条件下安全改变业务状态。

## 企业级 LLM 技术栈：真正需要的分层

可以按层思考。架构形态可以不同，但缺层往往会在可靠性、合规或成本上“补交学费”。

### 1）体验层（Experience）

- Chat、copilot 面板、“生成”按钮、内联建议
- 针对敏感操作的人在回路（human-in-the-loop）审批

### 2）编排层（Orchestration）

- Prompt 模板、路由、工具选择约束
- 多步工作流（plan → retrieve → act → verify → write back）
- 护栏与状态机，为关键控制点提供更稳定的确定性

### 3）知识与数据层（Knowledge & Data）

- 文档 RAG
- 数据库 / ERP / CRM / 工单 / BI 连接器
- 数据分级、脱敏与血缘（lineage）

### 4）治理与安全层（Governance & Safety）

- 身份、RBAC/ABAC、审批
- 审计追踪与防篡改日志
- 与风险管理框架的对齐（内部 + 外部标准）

### 5）评测与运营层（LLMOps）

- 离线测试集与回归门禁
- 在线监控：工具调用失败率、幻觉信号、延迟、成本
- 事故响应与回滚策略

## 决定 LLM 系统成败的设计约束

### 可靠性：“好回答”与“可重复结果”

面向工作流，准确性只是必要条件，还需要：

- 结构化输出（schemas）
- 校验步骤（规则、检索引用、二次检查）
- 失败处理（带约束重试、降级路径、人工升级）

### 安全与隐私：数据边界要显式

常见要求包括：

- PII/机密检测与脱敏
- 租户隔离
- 工具调用白名单与参数校验
- Prompt injection 防护（把检索文本当作不可信输入）

### 成本与延迟：agent 很容易变贵

agentic 工作流可能把调用次数放大：retrieve + reason + tool + verify + summarize。通常需要：

- 检索与重复 prompt 的缓存
- “小模型优先”的路由（分类/抽取先走小模型）
- 任务/租户的预算控制（tokens、tool calls、timeouts）

### 可观测性：看不见就管不住

最低限度建议跟踪：

- 端到端任务完成率
- 工具调用错误率与超时
- 人工审批率
- 幻觉/落地信号（检索覆盖率、引用匹配等）
- 单个已完成工作流的单位成本

## 这对 AI 低代码平台意味着什么

LLM 能带来“自然语言生成应用”的演示，但企业价值更取决于：你能多快交付可治理工作流。

平台优势往往体现在：

- 业务对象与权限建模一次，多团队复用
- 可复用的编排模式跨团队扩散
- LLM 输出能够驱动真实的状态迁移，并留下审计证据
- 评测门禁与监控体系可运营

这也对应“AI 功能”与“AI 原生执行”的差异。

在 JitAI 的思路里，LLM 被当作系统内部可控的执行组件：能参与工作流、操作结构化业务对象、在权限与审计约束下安全回写。如果你想要一个上手路径，可以先从 [**JitAI 教程**](https://jit.pro/zh/docs/tutorial)开始，然后再试用 [**JitAI**](https://jit.pro/zh/download)。

## 一条可复用的构建路径：交付可安全执行的 LLM 系统

下面这套顺序适用于大多数企业 agent 场景（客服、运营、财务、采购、HR、合规等）。

### Step 1：把“工作”定义成工作流，而不是一段 prompt

写清楚：

- 输入（工单、表单、邮件、记录）
- 必须的输出（字段、决策、更新）
- 允许的动作（创建/更新/通知/审批）
- 人工审批点

### Step 2：先设计工具接口

做一组严格 schema 的工具：

- 搜索知识库
- 按 ID 取记录
- 只允许字段范围内的更新
- 创建任务 / 发送通知
- 发起审批

模型不参与“自由发挥式”的工具参数拼装。

### Step 3：加入可度量覆盖率的检索

对每个任务：

- 定义权威来源
- 记录检索到的文档与片段 ID
- 高风险任务在检索为空时走“失败关闭”（fail closed）

### Step 4：把策略放进系统层

策略要做到：即使不信任模型也能执行。

- RBAC/ABAC 权限校验
- 字段级写入限制
- 指定动作的强制审批
- 数据防泄漏（DLP）规则

### Step 5：把验证作为一等公民步骤

示例：

- 抽取数值与来源文本交叉核验
- 格式与约束校验
- 一致性检查（日期、合计、必填项）

### Step 6：上线前先做评测门禁

准备：

- 小型 gold dataset（50–200 个样本）
- 成功标准（准确率 + 工作流完成率）
- 针对 prompt / 工具 / 模型变更的回归测试

### Step 7：用监控 + 事故预案运营

明确：

- 触发升级的条件（工具失败、高不确定、策略违规）
- 回滚不安全变更的方法
- 事后复盘流程（根因 + 新增评测用例）

## 角色与职业定位（2026 学什么更贴近需求）

如果你的搜索意图包含职业方向，可以参考这张“能力地图”：

- **LLM application engineer**：RAG + 工具工作流、schemas、评测
- **Agent/workflow engineer**：多步编排与安全门控设计
- **LLMOps / AI operations**：监控、成本控制、回归测试、发布管理
- **AI governance partner**：把控制点映射到 ISO/NIST，做文档与评审流程
- **AI product builder**：决定哪些任务交给模型执行、哪些做建议，设计审批 UX

更强的组合通常同时具备：系统思维 + 数据边界 + 工作流设计 + 评测纪律。

## FAQ

### LLM 和 AI agent 的区别是什么？

LLM 是模型。AI agent 是一种应用形态：模型能基于工具、状态与策略跨步骤规划并执行。

### 已有很强的模型，还需要 RAG 吗？

如果输出需要反映最新的内部制度、合同、工单或产品文档，检索是让输出可溯源、可审计的关键路径。

### 什么让 LLM 系统具备“企业可用性”？

身份与权限、工具校验、审计日志、评测门禁、监控体系，以及安全回写控制。

### 部署 LLM 一定需要 ISO/IEC 42001 吗？

并非普适要求，但它提供了更容易被采购与合规理解的管理体系结构，有助于跨团队对齐。

### 如何在生产中降低幻觉？

检索落地、结构化输出、验证步骤，以及在高影响动作上采用失败关闭或强制审批。

### 什么时候保留人类在回路？

当动作涉及资金、权限、合规决策、不可逆记录变更，或评测显示不确定性仍较高时。
