import React from "react";
import { useMarketingCopy } from "../copy";
import ContactSection from "../ContactSection";

export default function About() {
  const { t, path } = useMarketingCopy();
  return <>

<section className="section" style={{"paddingBlock": "clamp(48px,6vw,72px)"}}>
<div className="wrap">
<p className="kicker reveal">{t("关于我们")}</p>
<h1 className="h1 mt-16 reveal" style={{"fontSize": "clamp(1.9rem,4.2vw,3rem)", "maxWidth": "100%"}}>{t("让每一家企业，都拥有自己可控、可进化的 AI 业务大脑")}</h1>
<p className="lead mt-24 reveal" style={{"maxWidth": "70ch"}}>{t("JitAI 是 AI 原生应用平台。我们做的不是给系统外挂一个 AI， 而是让 AI 成为系统内生的一部分 —— 能看懂业务、能驱动业务、还能持续造系统。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary" href={path("/download")}>{t("免费下载桌面版")}</a>
<a className="btn btn-ghost" href="#contact">{t("联系我们")}</a>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("品牌愿景")}</p>
<h2 className="h2 mt-16">{t("AI 正在从\"外挂工具\"走向企业的\"内生基础设施\"")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card reveal">
<p className="body">{t("过去几十年，企业信息化的主线是")}<b>{t("\"人用系统\"")}</b>{t("。 AI 原生之后，这条主线正在变成")}<b>{t("\"系统里长出 AI，AI 驱动系统运转\"")}</b>{"。"}</p>
<p className="body mt-16">{t("谁先完成这个切换，谁就拥有下一代企业的组织效率。")}</p>
<p className="quote-line mt-24">{t("这不是又一个 AI 工具，而是企业系统的下一个范式。")}</p>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("我们相信的三件事")}</h3>
<ul className="checklist">
<li><strong>{t("AI 的价值在组织，不在桌面")}</strong>{t("：个人提效早已发生，组织生产力才是真正未释放的部分")}</li>
<li><strong>{t("系统必须先为 AI 而生")}</strong>{t("：不改造系统，AI 永远只能站在外面隔着接口说话")}</li>
<li><strong>{t("AI 不替代人做最终决策")}</strong>{t("：人定目标、处理异常、承担最终责任；AI 执行、研判、全程留痕")}</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("技术理念")}</p>
<h2 className="h2 mt-16">{t("两个 AI 原生，一套统一底座")}</h2>
</div>
<div className="grid g-3">
<div className="marketing-card reveal">
<h3 className="h5 mb-8">{t("业务系统 AI 原生")}</h3>
<p className="small">{t("业务单元标准化、自描述，AI 可读、可驱动。业务对象、规则、状态对 AI 透明 —— 不是一堆需要猜的源码，而是一套可读的系统。")}</p>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-8">{t("开发过程 AI 原生")}</h3>
<p className="small">{t("AI 打通建模、生成、验证、运行反馈闭环。开发不是写孤立代码，而是完整链路；运行反馈实时回流，持续迭代。")}</p>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-8">{t("开发与运行同源")}</h3>
<p className="small">{t("同一套系统模型、规范和运行时。AI 不仅在系统里经营业务，还在系统里持续造系统。")}</p>
</div>
</div>
<div className="marketing-card mt-24 reveal">
<h3 className="h5 mb-16">{t("技术演进路线")}</h3>
<div className="flowline">
<span className="node">{t("元素规范体系持续完善")}</span><span className="arrow">{"→"}</span>
<span className="node">{t("行业模板与预置元素库")}</span><span className="arrow">{"→"}</span>
<span className="node">{t("可复用技能与专项智能体市场")}</span><span className="arrow">{"→"}</span>
<span className="node hi">{t("合作伙伴共建类型与行业方案")}</span>
</div>
<p className="small mt-16">{t("平台边界：不替代人做最终业务决策 · 不执行金额库存等精确计算（交由服务）· 不做通用办公与创意产出 · 不锁定单一模型供应商。")}</p>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("团队")}</p>
<h2 className="h2 mt-16">{t("复合背景：企业数字化交付 + 平台架构 + 大模型应用 + 商业化")}</h2>
</div>
<div className="grid g-3">
<div className="marketing-card reveal">
<div className="row gap-12 mb-12">
<div className="card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" strokeLinecap="round"></path></svg>
</div>
<div><h3 className="h5">{t("创始人 / CEO")}</h3><p className="small">{t("企业软件与 ERP 交付背景")}</p></div>
</div>
<p className="small">{t("长期深耕企业数字化，主导过大型定制系统落地。")}</p>
</div>
<div className="marketing-card reveal">
<div className="row gap-12 mb-12">
<div className="card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" strokeLinecap="round"></path></svg>
</div>
<div><h3 className="h5">{t("CTO / 技术负责人")}</h3><p className="small">{t("大规模平台架构与 AI 应用研发背景")}</p></div>
</div>
<p className="small">{t("主导元素化运行时与 AI 开发助手设计。")}</p>
</div>
<div className="marketing-card reveal">
<div className="row gap-12 mb-12">
<div className="card-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" strokeLinecap="round"></path></svg>
</div>
<div><h3 className="h5">{t("商业化负责人")}</h3><p className="small">{t("企业服务 SaaS 商业化与大客户销售背景")}</p></div>
</div>
<p className="small">{t("负责云订阅与私有化渠道体系搭建。")}</p>
</div>
</div>
</div>
</section>

<section className="section" id="download">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("开始使用")}</p>
<h2 className="h2 mt-16">{t("免费下载桌面版，先搭一个业务场景")}</h2>
<p className="lead mt-16">{t("零门槛体验 → 搭建第一个业务场景 → 验证价值后再升级。")}</p>
</div>
<div className="grid g-3">
<div className="marketing-card card-ok reveal">
<div className="row gap-8 mb-12"><h3 className="h4">{t("桌面版")}</h3><span className="tag tag-accent">{t("免费")}</span></div>
<p className="small mb-16">{t("个人 / 小团队试用，搭建第一个业务场景，验证价值后再升级。")}</p>
<a className="btn btn-primary" href={path("/download")}>{t("下载安装")}</a>
</div>
<div className="marketing-card reveal">
<div className="row gap-8 mb-12"><h3 className="h4">{t("云托管订阅版")}</h3><span className="tag">{t("云托管订阅")}</span></div>
<p className="small mb-16">{t("中小企业采用云托管服务，快速上线、开箱即用，浏览器访问无需自建环境。")}</p>
<a className="btn btn-ghost" href="#contact">{t("咨询订阅方案")}</a>
</div>
<div className="marketing-card reveal">
<div className="row gap-8 mb-12"><h3 className="h4">{t("私有化部署版")}</h3><span className="tag">{t("企业部署")}</span></div>
<p className="small mb-16">{t("中大型企业、产业客户。数据不出域，按业务需求配置部署与服务方案。")}</p>
<a className="btn btn-ghost" href="#contact">{t("咨询私有化部署")}</a>
</div>
</div>
<div className="marketing-card mt-24 reveal">
<h3 className="h5 mb-16">{t("落地路径")}</h3>
<div className="steps">
<div className="step"><h4>{t("免费体验")}</h4><p>{t("下载桌面版，搭建第一个业务场景")}</p></div>
<div className="step"><h4>{t("核心场景上线")}</h4><p>{t("选择最痛的业务环节，几周内跑通闭环")}</p></div>
<div className="step"><h4>{t("全面推广")}</h4><p>{t("部署服务器版，扩展到全业务流程")}</p></div>
<div className="step"><h4>{t("持续进化")}</h4><p>{t("三重反馈回流，系统越用越懂业务")}</p></div>
</div>
<p className="small mt-16">{t("你用自然语言描述业务，AI 帮你搭建系统，不需要写代码； 需求确定后系统即时生效，不需要编译、部署、等上线。")}</p>
</div>
</div>
</section>
<ContactSection />

<section className="cta-band">
<div className="wrap">
<h2 className="h2 mt-16 reveal">{t("落地真正能自生长的业务 AI")}</h2>
<p className="lead mt-24 reveal" style={{"maxWidth": "56ch", "marginInline": "auto"}}>{t("先下载桌面版跑一个场景，再决定要不要全面推广。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href={path("/download")}>{t("免费下载体验")}</a>
<a className="btn btn-ghost btn-lg" href={path("/partners#apply")}>{t("渠道伙伴合作")}</a>
</div>
</div>
</section>

  </>;
}
