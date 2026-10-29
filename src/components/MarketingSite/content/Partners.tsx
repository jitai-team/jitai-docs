import React from "react";
import { useMarketingCopy } from "../copy";
import ContactSection from "../ContactSection";

export default function Partners() {
 const { t, path } = useMarketingCopy();
 return <>

<section className="marketing-hero">
<div className="hero-bg" aria-hidden="true">
<svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" fill="none">
<g stroke="var(--accent)" strokeOpacity=".14" strokeWidth="1">
<path d="M150 260 L360 170 L560 250 L760 160 L960 250 L1100 180"></path>
<path d="M150 260 L300 400 L520 380 L760 440 L960 370 L1080 420"></path>
<path d="M360 170 L300 400M560 250 L520 380M760 160 L760 440M960 250 L960 370"></path>
</g>
<g fill="var(--accent)">
<g className="node"><circle cx="150" cy="260" r="3.5" fillOpacity=".45"></circle></g>
<g className="node"><circle cx="360" cy="170" r="4.5" fillOpacity=".6"></circle></g>
<g className="node"><circle cx="560" cy="250" r="3.5" fillOpacity=".45"></circle></g>
<g className="node"><circle cx="760" cy="160" r="5.5" fillOpacity=".7"></circle></g>
<g className="node"><circle cx="960" cy="250" r="4" fillOpacity=".5"></circle></g>
<g className="node"><circle cx="1100" cy="180" r="3" fillOpacity=".4"></circle></g>
<g className="node"><circle cx="300" cy="400" r="4" fillOpacity=".5"></circle></g>
<g className="node"><circle cx="520" cy="380" r="3" fillOpacity=".4"></circle></g>
<g className="node"><circle cx="760" cy="440" r="4.5" fillOpacity=".55"></circle></g>
<g className="node"><circle cx="1080" cy="420" r="3" fillOpacity=".38"></circle></g>
</g>
</svg>
</div>
<div className="hero-veil" aria-hidden="true"></div>
<div className="wrap hero-inner">
<p className="kicker reveal">{t("全国渠道合作伙伴招募")}</p>
<h1 className="h1 mt-16 reveal">{t("诚招全国渠道合作伙伴")}<br />{t("共建 AI 原生企业新生态")}</h1>
<p className="lead mt-24 reveal">{t("面向企业 AI 原生化需求，结合伙伴的行业经验与客户资源， 共同探索产品推广、方案共建与项目服务的合作机会。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href="#apply">{t("提交合作意向")}</a>
<a className="btn btn-ghost btn-lg" href="#policy">{t("了解合作方向")}</a>
</div>
<p className="hero-note reveal">{t("欢迎软件服务商、系统集成商与行业咨询团队联系交流。")}</p>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("赛道机遇")}</p>
<h2 className="h2 mt-16">{t("时代拐点：企业 AI 从个人工具走向业务落地")}</h2>
</div>
<div className="grid g-3">
<div className="marketing-card reveal">
<div className="row gap-12 mb-12"><span className="num-badge">{"①"}</span><h3 className="h5">{t("个人 AI 应用广泛")}</h3></div>
<p className="small">{t("员工桌面用 AI 写文档、写代码、做分析。")}<br /><span className="dim">{t("个人提效已有广泛实践。")}</span></p>
</div>
<div className="marketing-card reveal">
<div className="row gap-12 mb-12"><span className="num-badge">{"②"}</span><h3 className="h5">{t("组织级 AI 正在展开")}</h3></div>
<p className="small">{t("AI 要进业务系统、要参与经营决策。")}<br /><span className="dim">{t("企业开始关注业务系统内的 AI。")}</span></p>
</div>
<div className="marketing-card card-ok reveal">
<div className="row gap-12 mb-12"><span className="num-badge">{"③"}</span><h3 className="h5">{t("落地仍有门槛")}</h3></div>
<p className="small">{t("自研投入、定制周期与既有系统改造，都是企业需要面对的问题。")}<br /><span className="mark">{t("需要产品能力与行业服务共同参与。")}</span></p>
</div>
</div>
<p className="quote-line mt-32 reveal">{t("企业 AI 落地，为渠道伙伴带来")}<span className="mark">{t("新的客户服务与业务合作空间")}</span>{"。"}</p>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("你正在遇到的问题")}</p>
<h2 className="h2 mt-16">{t("渠道伙伴的老业务，正在一起变难")}</h2>
</div>
<div className="grid g-3">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-8">{t("传统软件项目：越来越薄")}</h3>
<p className="small">{t("毛利持续走低、竞争内卷、回款慢、交付重。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-8">{t("老产品跟不上客户需求")}</h3>
<p className="small">{t("客户要 AI 升级，但手里的产品没有 AI 能力，老客户在流失。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-8">{t("传统渠道模式承压")}</h3>
<p className="small">{t("压货、考核重、价格透明、利润薄。")}</p>
</div>
</div>
<p className="quote-line mt-32 reveal">{t("归根到底：")}<span className="mark">{t("需要能回应企业 AI 需求、连接真实业务的新一代产品与服务。")}</span>
</p>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("为什么是 JitAI")}</p>
<h2 className="h2 mt-16">{t("让 AI 进入真实业务系统，支持企业经营")}</h2>
</div>
<div className="grid g-2 mb-32">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("常见落地难点")}</h3>
<ul className="bullets">
<li>{t("通用 AI 主要面向个人辅助，进入企业业务还需要上下文、规则与权限")}</li>
<li>{t("仅靠代码生成，仍难覆盖需求、设计、验证与运行反馈的完整链路")}</li>
<li>{t("外部智能体与既有系统之间，需要解决业务可见性与治理衔接问题")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI 技术：自生长 AI 原生架构")}</h3>
<ul className="checklist">
<li><strong>{t("业务系统 AI 原生")}</strong>{t("：系统一比一还原企业真实业务，AI 能看懂、能驱动真实业务")}</li>
<li><strong>{t("开发过程 AI 原生")}</strong>{t("：AI 全程参与建模、生成、验证、迭代全流程")}</li>
</ul>
<p className="small mt-16">{t("AI 真正内生进企业业务，支撑经营决策，驱动组织生产力升级。")}</p>
</div>
</div>
<div className="section-head reveal">
<h3 className="h3">{t("JitAI 为渠道伙伴带来的产品价值")}</h3>
</div>
<div className="grid g-4">
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h3 className="h5">{t("开发运行一体化")}</h3>
<p className="small mt-8">{t("从核心业务场景开始，结合 AI 建模、生成与验证，探索适合客户的落地路径。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinejoin="round"></path></svg>
</div>
<h3 className="h5">{t("贴近客户需求")}</h3>
<p className="small mt-8">{t("围绕客户经营流程与实际问题，让 AI 从个人辅助进入组织业务。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinejoin="round"></path><path d="m2 17 10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"></path></svg>
</div>
<h3 className="h5">{t("AI 原生架构")}</h3>
<p className="small mt-8">{t("业务系统与开发过程共用元素规范和运行时，形成持续迭代的技术基础。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
</div>
<h3 className="h5">{t("持续服务空间")}</h3>
<p className="small mt-8">{t("围绕客户的业务变化，探讨方案完善、系统扩展与持续服务的合作方式。")}</p>
</div>
</div>
</div>
</section>

<section className="section section-alt" id="policy"><div className="wrap"><div className="section-head reveal"><p className="kicker">{t("合作方式")}</p><h2 className="h2 mt-16">{t("围绕客户需求，共同探讨合作方案")}</h2><p className="lead mt-16">{t("产品推广、行业方案共建与项目服务，都可以作为交流的起点。具体合作安排在了解双方能力和项目需求后沟通。")}</p></div><div className="grid g-2"><div className="marketing-card reveal"><h3 className="h4 mb-16">{t("业务合作")}</h3><ul className="bullets"><li>{t("了解伙伴的行业方向、客户资源与服务经验")}</li><li>{t("交流客户需求与平台适配性")}</li><li>{t("探讨推广、实施、定制与持续服务的协作方式")}</li></ul></div><div className="marketing-card reveal"><h3 className="h4 mb-16">{t("商务沟通")}</h3><ul className="bullets"><li>{t("结合具体项目明确双方分工")}</li><li>{t("沟通服务范围、资源投入与商务安排")}</li><li>{t("有意向的团队可直接提交合作需求")}</li></ul></div></div></div></section>

<section className="section"><div className="wrap"><div className="section-head reveal"><p className="kicker">{t("伙伴类型")}</p><h2 className="h2 mt-16">{t("结合各自优势，共同服务企业客户")}</h2></div><div className="grid g-3"><div className="marketing-card reveal"><h3 className="h4 mb-16">{t("软件与企业服务商")}</h3><p className="small">{t("围绕现有客户的业务系统与 AI 需求，探索产品和服务的延伸。")}</p></div><div className="marketing-card card-ok reveal"><h3 className="h4 mb-16">{t("系统集成商")}</h3><p className="small">{t("结合系统集成与部署经验，讨论企业级 AI 项目的实施路径。")}</p></div><div className="marketing-card reveal"><h3 className="h4 mb-16">{t("行业咨询与解决方案团队")}</h3><p className="small">{t("把行业流程、业务规则与管理经验转化为可运行的业务系统。")}</p></div></div></div></section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("协作支持")}</p>
<h2 className="h2 mt-16">{t("围绕产品与项目，交流协作支持方向")}</h2>
</div>
<div className="grid g-4">
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"1"}</span><h3 className="h5">{t("产品资料")}</h3></div><p className="small">{t("交流产品介绍、解决方案、场景示例与技术白皮书。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"2"}</span><h3 className="h5">{t("产品培训")}</h3></div><p className="small">{t("根据合作需要，讨论产品、销售与方案学习安排。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"3"}</span><h3 className="h5">{t("售前交流")}</h3></div><p className="small">{t("围绕客户问题，交流产品适配性与方案思路。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"4"}</span><h3 className="h5">{t("技术协作")}</h3></div><p className="small">{t("沟通建模、开发、调试与交付中的技术协作需求。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"5"}</span><h3 className="h5">{t("Demo 环境")}</h3></div><p className="small">{t("结合具体业务场景，讨论产品演示与试用方式。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"6"}</span><h3 className="h5">{t("市场交流")}</h3></div><p className="small">{t("探讨行业活动、产品推广与市场沟通的合作机会。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"7"}</span><h3 className="h5">{t("商务对接")}</h3></div><p className="small">{t("结合项目需求，沟通商业方案与合作分工。")}</p></div>
<div className="marketing-card reveal"><div className="row gap-12 mb-8"><span className="num-badge">{"8"}</span><h3 className="h5">{t("持续迭代")}</h3></div><p className="small">{t("关注客户使用反馈，讨论系统与方案的持续完善。")}</p></div>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("产品与场景")}</p>
<h2 className="h2 mt-16">{t("以产品能力承接真实业务需求")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("产品体系")}</h3>
<ul className="bullets">
<li><strong>{t("应用沙箱 & 工作台")}</strong>{t("：用于业务场景演示、搭建与验证")}</li>
<li><strong>{t("JitAI AI 开发助手")}</strong>{t("：支持对话式建模、生成、校验与迭代")}</li>
<li><strong>{t("业务智能体能力集")}</strong>{t("：覆盖销售、采购、库存、生产、财务全经营场景")}</li>
<li><strong>{t("JitNode 运行时底座")}</strong>{t("：AI 原生系统核心，支撑所有业务运行")}</li>
</ul>
<div className="tag-row mt-16">
<span className="tag tag-accent">{t("免费桌面体验版")}</span>
<span className="tag">{t("云托管订阅版")}</span>
<span className="tag">{t("私有化部署版")}</span>
</div>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("典型落地场景：从客户的问题出发")}</h3>
<div className="grid g-2">
<div className="marketing-card card-flat"><p className="small"><strong>{t("经营与决策")}</strong><br />{t("经营智能决策、库存智能管控")}</p></div>
<div className="marketing-card card-flat"><p className="small"><strong>{t("销售与客户")}</strong><br />{t("销售智能跟进、客户经营、风控预警")}</p></div>
<div className="marketing-card card-flat"><p className="small"><strong>{t("采购与供应链")}</strong><br />{t("智能比价、供需匹配、成本管控")}</p></div>
<div className="marketing-card card-flat"><p className="small"><strong>{t("财务与复盘")}</strong><br />{t("智能对账、差异分析、经营复盘")}</p></div>
</div>
<p className="small mt-16">{t("结合行业实际建模，让业务系统与智能体共同参与业务流程。")}</p>
</div>
</div>
<div className="marketing-card mt-24 reveal">
<h3 className="h5 mb-16">{t("面向客户的业务价值")}</h3>
<div className="grid g-4">
<div><p className="small"><strong>{t("① 聚焦业务痛点")}</strong><br />{t("让 AI 从个人工具，变成组织经营生产力")}</p></div>
<div><p className="small"><strong>{t("② 智能判断与精准执行")}</strong><br />{t("AI 做经营决策、系统做精准执行，形成闭环")}</p></div>
<div><p className="small"><strong>{t("③ 开发与运行衔接")}</strong><br />{t("围绕核心场景逐步验证，减少开发与运行之间的割裂")}</p></div>
<div><p className="small"><strong>{t("④ 系统持续进化")}</strong><br />{t("结合运行与人工反馈，持续适配企业业务变化")}</p></div>
</div>
</div>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="grid g-2">
<div className="marketing-card reveal">
<h3 className="h4 mb-16">{t("适合交流的伙伴")}</h3>
<ul className="checklist">
<li>{t("具备企业客户资源、政企或中小微企业渠道资源")}</li>
<li>{t("认同 AI 原生产品理念，愿意深耕企业 AI 赛道")}</li>
<li>{t("合法合规经营的科技公司、服务商、咨询公司、集成商")}</li>
</ul>
<div className="strip mt-24">{t("具体合作方式结合双方资源与项目需求沟通。")}</div>
</div>
<div className="marketing-card reveal">
<h3 className="h4 mb-16">{t("合作沟通流程")}</h3>
<ul className="bullets">
<li><strong>{t("1 意向沟通")}</strong>{t("/ 介绍团队与业务方向")}</li>
<li><strong>{t("2 产品交流")}</strong>{t("/ 了解平台与客户场景")}</li>
<li><strong>{t("3 方案讨论")}</strong>{t("/ 评估适配性与合作分工")}</li>
<li><strong>{t("4 商务洽谈")}</strong>{t("/ 确定具体合作安排")}</li>
<li><strong>{t("5 持续沟通")}</strong>{t("/ 按约定推进与复盘")}</li>
</ul>
<p className="small mt-16 accent">{t("欢迎带着具体行业与客户需求，与我们开始交流。")}</p>
</div>
</div>
</div>
</section>
<ContactSection id="apply" partner />

<section className="cta-band">
<div className="wrap">
<h2 className="h2 mt-16 reveal">{t("共建企业 AI 原生生态，从合作交流开始")}</h2>
<p className="lead mt-24 reveal" style={{"maxWidth": "60ch", "marginInline": "auto"}}>{t("企业 AI 落地需要技术能力与行业经验结合。 欢迎与 JitAI 一起探讨客户需求、产品应用与服务合作。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href="#apply">{t("提交合作意向")}</a>
<a className="btn btn-ghost btn-lg" href={path("/about#contact")}>{t("商务对接咨询")}</a>
</div>
</div>
</section>

 </>;
}
