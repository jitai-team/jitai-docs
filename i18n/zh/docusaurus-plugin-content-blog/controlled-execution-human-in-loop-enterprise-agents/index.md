---
title: "企业级 Agent 的可控执行：Human-in-the-Loop 人机协同模型"
date: 2026/02/10
authors: []
disableDefaultStructuredData: true
description: "解释企业级 Agent 的可控执行（controlled execution）与 Human-in-the-Loop（HITL）人机协同闭环，给出可复用术语、可控执行阶梯与生产级 HITL Patterns，并提供“业务动作契约”（Business Action Contract）与可审计、可回滚的参考架构。"
keywords:
    [
        JitAI,
        智能体式 AI,
        可控执行,
        业务动作,
        人在回路,
        人在回路,
        审批工作流,
        审计轨迹,
        AI 治理,
        记录系统,
    ]
slug: controlled-execution-human-in-loop-enterprise-agents
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
"name": "Blog",
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
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#webpage",
"url": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents",
"name": "企业级 Agent 的可控执行：Human-in-the-Loop 人机协同模型",
"description": "企业级智能体从“能对话”走向“能执行业务动作”后，需要可控执行（controlled execution）：行为可预测、授权清晰、结果可审计。Human-in-the-Loop（HITL）通过变更集（change set / diff）、两阶段提交、风险分层审批与可回滚回写，将 Agentic AI 连接到 systems of record 的可治理生产路径。",
"isPartOf": {
"@id": "https://jit.pro/#website"
},
"breadcrumb": {
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#breadcrumb"
},
"inLanguage": "zh-CN"
},
{
"@type": "BreadcrumbList",
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#breadcrumb",
"itemListElement": [
{
"@type": "ListItem",
"position": 1,
"name": "Home",
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
"name": "企业级 Agent 的可控执行：Human-in-the-Loop 人机协同模型",
"item": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents"
}
]
},
{
"@type": "BlogPosting",
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#blogposting",
"mainEntityOfPage": {
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#webpage"
},
"url": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents",
"headline": "企业级 Agent 的可控执行：Human-in-the-Loop 人机协同模型",
"name": "企业级 Agent 的可控执行：Human-in-the-Loop 人机协同模型",
"description": "解释企业级 Agent 的可控执行（controlled execution）与 Human-in-the-Loop（HITL）人机协同闭环，给出可复用术语、可控执行阶梯与生产级 HITL Patterns，并提供“业务动作契约”（Business Action Contract）与可审计、可回滚的参考架构。",
"datePublished": "2026-02-09T00:00:00.000Z",
"dateModified": "2026-02-09T00:00:00.000Z",
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
"JitAI",
"智能体式 AI",
"可控执行",
"业务动作",
"人在回路",
"人在回路",
"审批工作流",
"审计轨迹",
"AI 治理",
"记录系统"
],
"timeRequired": "PT10M"
},
{
"@type": "FAQPage",
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#faq",
"isPartOf": {
"@id": "https://jit.pro/zh/blog/controlled-execution-human-in-loop-enterprise-agents#webpage"
},
"inLanguage": "zh-CN",
"mainEntity": [
{
"@type": "Question",
"name": "哪些动作默认需要人工审批？",
"acceptedAnswer": {
"@type": "Answer",
"text": "涉及资金、权限/权益、受监管数据、合同条款、或一次性影响大量客户的动作，建议默认走显式审批，高风险动作通常需要更高等级复核。"
}
},
{
"@type": "Question",
"name": "量起来以后 HITL 还能扩展吗？",
"acceptedAnswer": {
"@type": "Answer",
"text": "可以。通过风险分层、抽样审计、更好的审批体验、影子模式沉淀策略与评测数据，逐步减少不必要升级。"
}
},
{
"@type": "Question",
"name": "怎样避免审批“走过场”？",
"acceptedAnswer": {
"@type": "Answer",
"text": "采用 diff 审批、强制证据链接、高亮影响与不确定性，并用覆盖率/回滚率等指标识别薄弱复核行为。"
}
},
{
"@type": "Question",
"name": "最快的安全起步路径是什么？",
"acceptedAnswer": {
"@type": "Answer",
"text": "从提案模式 + 结构化 diff 起步，叠加策略检查，然后对一小类低风险动作进入引导执行。"
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

企业团队正在从“能对话的智能体”走向“能执行业务动作的智能体”：创建工单、更新订单、发起退款、变更权限、触发工作流。一旦智能体能够向 **记录系统（systems of record）** 回写，产品需求会立刻转向 **可控执行（controlled execution）**：行为可预测、授权清晰、结果可审计。

**Human-in-the-Loop（HITL，人机协同闭环）** 是把试验推进到生产的实用桥梁：在可扩展 Agentic AI 的同时，让关键决策可复核、权限可强制、回写可回滚。

<!--truncate-->

## 为什么“可控执行”正在成为企业落地的默认门槛

市场信号已经非常明确：Gartner 预测到 2026 年，约 40% 的企业应用将集成特定任务型 AI 智能体（task-specific AI agents），而 2025 年这一比例还低于 5%。  
同时，采用进度呈现“试验热、规模化慢”的典型形态。McKinsey 的 2025 调研显示，62% 的组织至少在尝试 AI 智能体，但许多团队仍停留在试点阶段。

差距通常来自 **运营风险**：

- 错误答案带来困惑。
- 错误业务动作带来成本、合规暴露与客户影响。

Gartner 也提示，很多 agentic 项目会因为价值不清晰或风险控制不足而在规模化阶段被取消。   
可控执行与 HITL 设计模式能显著降低这一失败路径，让智能体行为更易治理、可验证、可运营。

## 架构评审可复用术语

**Agentic AI**  
能够规划并执行多步骤工作，常见能力包括工具调用与向业务系统回写。

**可控执行（Controlled execution）**  
一种运行时模型：任何会改变状态的动作都受以下约束共同限制：

- **Policy**：允许做什么
- **Permissions**：谁能做
- **Verification**：必须通过哪些校验
- **Evidence**：必须留下哪些证据与记录

**业务动作（Business action）**  
会改变真实业务状态的操作：记录、审批、资金、权限、义务等。

**Human-in-the-Loop（HITL）**  
在工作流的特定节点引入人工复核、批准或覆盖，尤其用于不可逆或高影响动作。

**记录系统（System of record）**  
权威业务状态来源（订单、HR、财务、CRM 对象、权限/权益）。回写会放大影响半径。

## 可控执行阶梯：用“自主等级”规划上线节奏

将自主性视为一把带闸门的梯子更好落地：

1.  **只读助手**：检索 + 总结；不回写
2.  **提案模式**：智能体生成动作草案；人来执行
3.  **引导执行**：在明确闸门处获得批准后由智能体执行
4.  **条件自动驾驶**：在策略边界内自动执行，具备审计与回滚
5.  **持续优化**：基于遥测、评测与事件复盘持续迭代控制策略

HITL 主要覆盖第 2–4 级，这些阶段往往是企业价值密度最高的区域。

## 企业可规模化的人机协同模式（HITL Patterns）

下面这些模式在生产级智能体系统中反复出现。

![igor-omilaev-gVQLAbGVB6Q-unsplash.jpeg](img1.jpeg)

### 1）写入前复核（Review-before-write, RBW）

智能体先产出结构化 **变更集（change set / diff）**，避免直接修改记录。

**为什么有效**

- 人更容易快速判断“意图 + 影响”
- 审批更快、更一致

**实现要点**

- 用结构化格式呈现：字段 → 旧值 → 新值 → 理由 → 证据链接
- 强制附带可追溯证据（检索结果、工具输出、工单/文档 ID）

### 2）业务动作的两阶段提交（Two-stage commit）

把回写当成事务：

- **阶段 A（Prepare）**：校验输入、计算 diff、跑策略检查
- **阶段 B（Commit）**：获得批准或策略授权后才执行

这与财务、权限、客户影响类变更的审批逻辑高度一致。

### 3）按风险分层的审批闸门（Risk-tiered approval gates）

不同动作需要不同强度的监督：

- **低风险**：标签/格式/内部备注 → 轻审批或抽样审计
- **中风险**：SLA 调整、对客沟通草案、路由决策 → 单人审批
- **高风险**：退款、权限/权益、合同条款、PII 导出 → 双人审批 + 更强证据

这与欧盟 AI Act 对高风险系统的人类监督要求方向一致，尤其是对监督措施的明确化。

### 4）双人复核（Four-eyes / dual control）

对不可逆或高价值动作，要求两位独立人员批准。该控制在安全与金融运营中非常常见。

### 5）避免“走过场”的审批体验（Approval UX）

审批体验要让人“高效且有判断力”：

- 先展示影响摘要（金额、权限范围、客户数量、SLA）
- 高亮不确定性与缺失证据
- 提供“一键请求澄清”，把问题路由回智能体

### 6）异常分流与升级梯（Exception routing）

当策略检查失败或置信度不足，将任务路由到正确队列（法务/合规、安全、财务、业务负责人），并保证：升级路径明确、日志完整、可度量。

### 7）抽样审计支持“安全自动驾驶”

对高频低风险动作，用组合控制替代每次审批：策略边界 + 周期抽检 + 异常检测，让速度与责任同时成立。

### 8）影子模式（Shadow mode / parallel run）

允许回写前，先让智能体“像要回写一样运行”，再对比：

- 智能体提案 vs 人类决定
- 预测结果 vs 实际结果

影子模式用证据建立信任，也能沉淀策略与评测数据。

### 9）可逆动作与回滚路径（Rollback）

可控执行在“可撤销”时更稳定：

- soft delete
- 保留历史值
- 每次工具调用与变更都记录 correlation ID
- 提供“回滚变更集”的标准动作

### 10）Policy-as-code：把 AI 动作当成生产变更来管

将动作治理编码化：

- 明确的动作 schema
- 前置条件与不变量
- 限流、配额
- 环境约束（sandbox / prod）

这与 ISO/IEC 42001 强调的组织级 AI 管理体系与生命周期控制思路吻合。

## 可控执行的参考架构

一套实用架构通常具备清晰边界：

- **Agent Runtime / Orchestrator**：规划、工具选择、状态机
- **Tool Layer**：业务系统连接器，严格 schema
- **Policy Engine**：审批规则、风险分层、限额、合规检查
- **Permission Model（RBAC/ABAC）**：每个动作强制鉴权
- **Evidence Store**：检索文档、工具输出、关键推理摘要
- **Audit Log**：不可篡改事件链（who/what/when/why）
- **Observability**：trace、指标、错误预算、漂移监控
- **Evaluation Harness**：工作流回归测试、安全检查

NIST AI RMF 常被用于把技术控制与治理沟通对齐到同一套风险语言。

## “业务动作契约”（Business Action Contract）模式

为了让 HITL 更快、更一致，可以为每个会改变状态的能力定义动作契约。

**动作契约字段示例**

- 动作名（IssueRefund / UpdateEntitlement / ChangeOrderStatus）
- 必填输入（强类型）
- 前置条件（必须为真）
- 禁止条件（永远不可为真）
- 副作用（会改变什么）
- 风险等级（低/中/高）
- 审批人要求（按角色）
- 证据要求（链接、工具结果、文档 ID）
- 回滚方案（如何撤销）

动作契约把“智能体行为”变成平台可治理对象。

## 示例：一次“权益变更”的可控工作流

用户请求：“给这些账号开通 30 天高级权限。”

1.  智能体检索账号与策略约束
2.  生成变更集：账号列表 + 权益字段 + 到期时间
3.  策略引擎评估：高风险，需要双人审批
4.  审批人 A 校验资格与证据
5.  审批人 B 校验业务理由与影响范围
6.  Commit：通过带 schema 校验的工具执行
7.  审计日志记录：请求、diff、审批、工具响应 ID、回滚方法

这里的 HITL 具备明确的运营控制含义，不会沦为形式流程。

## JitAI 在这个模型中的位置（尽量省去额外仪式感）

很多团队卡在一个现实问题：智能体逻辑游离在业务系统治理模型之外，导致权限、审批、审计与回滚很难统一。更顺滑的路径是把智能体放在一个平台中运行，这个平台天然提供：

- 结构化、强类型的业务对象
- 可复用的工作流与审批节点
- 清晰的权限模型，定义谁可以改什么
- 回写以可审计事件方式被跟踪

如果你想快速看到“结构化动作 + 审批闸门 + 可治理回写”的组合实践，可以从 [**JitAI 教程**](https://jit.pro/zh/docs/tutorial) 开始。   
需要端到端原型验证时，可以直接[**试用 JitAI**](https://jit.pro/zh/download)。

## 如何度量：把 HITL 变成可运营模型

建议跟踪这些指标来平衡控制与吞吐：

- 审批时延（proposal → decision）
- 完成率（最终正确提交的任务比例）
- 覆盖率（人对 diff 的修改频率）
- 回滚率（提交后被撤销的比例）
- 异常率（被策略阻止的比例）
- 证据质量（缺少引用/工具输出的比例）
- 与智能体动作相关的事故数与恢复时间（MTTR）

## 常见失败模式

- 无结构回写：自由文本直接改记录，缺少 schema 与 diff
- 单一“Approve”：缺影响摘要、缺证据、缺回滚
- 权限越权：智能体权限大于它所辅助的人
- 缺少审计链：事故发生时无法解释发生了什么
- 闸门一刀切：到处审批导致瘫痪，完全不审批导致失控
- 跳过影子阶段：直接上回写，缺少评测与策略数据

## 职业与团队形态：围绕“可控执行”的新角色

- **Enterprise Agent Engineer**：工具、schema、编排、可观测性
- **AI Workflow Architect**：审批与策略设计、风险分层、复核体验
- **AI Governance Lead**：控制映射、审计准备、标准对齐
- **Agent Product Manager**：指标体系、上线节奏、采用与价值验证

掌握 HITL 模式的优势在于：它把 AI 能力与运营责任连接起来。

## FAQ

**哪些动作默认需要人工审批？**  
涉及资金、权限/权益、受监管数据、合同条款、或一次性影响大量客户的动作，建议默认走显式审批，高风险动作通常需要更高等级复核。

**量起来以后 HITL 还能扩展吗？**  
可以。通过风险分层、抽样审计、更好的审批体验、影子模式沉淀策略与评测数据，逐步减少不必要升级。

**怎样避免审批“走过场”？**  
采用 diff 审批、强制证据链接、高亮影响与不确定性，并用覆盖率/回滚率等指标识别薄弱复核行为。

**最快的安全起步路径是什么？**  
从提案模式 + 结构化 diff 起步，叠加策略检查，然后对一小类低风险动作进入引导执行。
