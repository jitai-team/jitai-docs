import React from "react";
import { useMarketingCopy } from "../copy";
import ContactSection from "../ContactSection";

export default function Cases() {
  const { t, path } = useMarketingCopy();
  return <>

<section className="section" style={{"paddingBlock": "clamp(48px,6vw,72px)"}}>
<div className="wrap">
<p className="kicker reveal">{t("场景示例")}</p>
<h1 className="h1 mt-16 reveal" style={{"fontSize": "clamp(1.9rem,4.2vw,3rem)", "maxWidth": "100%"}}>{t("从员工个人提效，升级到组织生产力质变")}</h1>
<p className="lead mt-24 reveal" style={{"maxWidth": "70ch"}}>{t("以下为典型业务场景示例，用于说明落地思路，不代表已交付客户案例或实际成效。")}</p>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 01 · 离散制造")}</p>
<h2 className="h2 mt-16">{t("多品种小批量制造企业：把排产与缺料从\"人盯\"变成\"系统盯\"")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("场景背景")}</h3>
<p className="small">{t("典型的多品种、小批量离散制造企业，SKU 数千级，工序多、外协多， 销售订单变更频繁。已上线 ERP，但业务规则散落在表格与人员经验里。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("常见痛点")}</h3>
<ul className="bullets">
<li>{t("销售、采购、库存、财务各用一套表，数据对不上，月底核算靠人工")}</li>
<li>{t("库存积压和缺料并存，没人提前发现")}</li>
<li>{t("排产依赖调度员经验，工序延误影响范围算不清")}</li>
<li>{t("想改个流程要找外包，等几个月")}</li>
</ul>
</div>
</div>
<div className="marketing-card mt-20 reveal">
<h3 className="h5 mb-16">{t("可采用的落地方式")}</h3>
<div className="steps" style={{"gridTemplateColumns": "repeat(4,minmax(0,1fr))"}}>
<div className="step"><h4>{t("业务孪生建模")}</h4><p>{t("按企业真实业务建模型：订单、BOM、工序、批次、库位一比一还原。")}</p></div>
<div className="step"><h4>{t("板块智能体")}</h4><p>{t("生产、采购、仓储、质量各建专用智能体，各守其界。")}</p></div>
<div className="step"><h4>{t("规则进系统")}</h4><p>{t("金额、库存、状态流转、审批走服务与工作流，AI 不直接改数据。")}</p></div>
<div className="step"><h4>{t("反馈迭代")}</h4><p>{t("运行异常与人工反馈回流，开发助手持续校准判断口径。")}</p></div>
</div>
</div>
<div className="grid g-2 mt-20">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期业务变化")}</h3>
<div className="stack gap-12">
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-warn">{t("常见现状")}</span></p>
<p className="small mt-8">{t("库存积压和缺料并存，没人提前发现；客户跟进全靠业务员记忆和微信；想改个流程要找外包，等几个月。")}</p>
</div>
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-accent">{t("方案目标")}</span></p>
<p className="small mt-8">{t("一套系统打通采购—销售—库存—财务，业务自动核算、数据实时可查；AI 自动预警缺料和积压，提前介入；业务流程自己对话修改，即时生效。")}</p>
</div>
</div>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期价值")}</h3>
<div className="grid g-2">
<div className="stat"><div className="stat-num">{t("分步")}</div><div className="stat-label">{t("核心场景上线第一版")}</div><div className="stat-note">{t("先验证，再扩展")}</div></div>
<div className="stat"><div className="stat-num">{t("对话")}</div><div className="stat-label">{t("业务流程变更方式")}</div><div className="stat-note">{t("无需排期再开发")}</div></div>
<div className="stat"><div className="stat-num">{t("实时")}</div><div className="stat-label">{t("经营数据可查")}</div><div className="stat-note">{t("不再月底突击核算")}</div></div>
<div className="stat"><div className="stat-num">{t("可审计")}</div><div className="stat-label">{t("AI 每一步留痕")}</div><div className="stat-note">{t("含推理依据与数据快照")}</div></div>
</div>
</div>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 02 · 商贸流通")}</p>
<h2 className="h2 mt-16">{t("商贸流通企业：报价、赊销与回款，交给有边界的 AI 盯")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("场景背景")}</h3>
<p className="small">{t("典型 B2B 商贸企业，客户数量多、账期长、毛利薄。 销售团队流动较快，客户关系和报价经验沉淀在个人身上。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("常见痛点")}</h3>
<ul className="bullets">
<li>{t("报价靠拍脑袋，历史成交价、信用额度、毛利底线拿不准")}</li>
<li>{t("回款提醒、续约节点没人系统性盯，逾期后才发现")}</li>
<li>{t("CRM 数据与实际业务动作脱节，AI 工具只能写话术、看不到客户全貌")}</li>
<li>{t("人员一走，客户就断")}</li>
</ul>
</div>
</div>
<div className="marketing-card mt-20 reveal">
<h3 className="h5 mb-16">{t("可采用的落地方式")}</h3>
<ul className="checklist">
<li>{t("销售智能体内嵌系统，直接读取客户、订单、回款、信用")}<strong>{t("全貌")}</strong></li>
<li>{t("AI 给出报价依据、跟进节点、风险预警；")}<strong>{t("价格与信用由系统规则判定")}</strong></li>
<li>{t("绑定角色与数据范围：销售看自己的客户，总监看全盘")}</li>
<li>{t("高风险动作（超额放账期、异常折扣）配置")}<strong>{t("强制人工审批拦截")}</strong></li>
<li>{t("IM 通道接入企微 / 钉钉，员工在会话中直接完成业务操作")}</li>
</ul>
</div>
<div className="grid g-2 mt-20">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期业务变化")}</h3>
<div className="stack gap-12">
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-warn">{t("常见现状")}</span></p>
<p className="small mt-8">{t("客户跟进全靠业务员记忆和微信；数据对不上，月底核算靠人工；异常折扣无人拦截。")}</p>
</div>
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-accent">{t("方案目标")}</span></p>
<p className="small mt-8">{t("AI 智能体自动跟进客户、提醒回款；报价有依据可追溯，异常折扣自动进入审批；流失与逾期风险提前暴露。")}</p>
</div>
</div>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期价值")}</h3>
<ul className="bullets">
<li>{t("关键客户节点不再依赖个人记忆，人员流动影响下降")}</li>
<li>{t("报价与赊销口径统一，异常自动进入审批链路")}</li>
<li>{t("逾期与流失信号前置，管理层可实时查看风险汇总")}</li>
<li>{t("AI 动作可枚举、可审计，合规沟通有据可依")}</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 03 · 多分支服务型企业")}</p>
<h2 className="h2 mt-16">{t("多分支服务机构：一套底座，承载各分支差异化")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("场景背景")}</h3>
<p className="small">{t("典型多分支、多区域服务型机构。总部要统一口径，分支各有本地规则， 标准化 SaaS 套不进去，定制开发又承受不起。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("常见痛点")}</h3>
<ul className="bullets">
<li>{t("标准化模板强行适配，分支业务被迫改流程迁就系统")}</li>
<li>{t("总部要统一口径，分支要灵活，两套需求长期打架")}</li>
<li>{t("制度、审批、风控规则写在文档里，落不到系统")}</li>
<li>{t("系统改一次要找外包，等几个月")}</li>
</ul>
</div>
</div>
<div className="marketing-card mt-20 reveal">
<h3 className="h5 mb-16">{t("可采用的落地方式")}</h3>
<ul className="checklist">
<li>{t("总部建")}<strong>{t("父 App")}</strong>{t("承载统一口径，各分支建")}<strong>{t("子 App")}</strong>{t("通过同名元素重写本地规则")}</li>
<li>{t("父 App 行为不变、子 App 重写生效 —— 一套底座支撑差异化，调用方不改一行代码")}</li>
<li>{t("管理层智能体做经营问答、波动解释、风险汇总，取数口径由系统限定")}</li>
<li>{t("业务规则、审批与权限进入同一套 RBAC 与审计链路")}</li>
</ul>
</div>
<div className="grid g-2 mt-20">
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期业务变化")}</h3>
<div className="stack gap-12">
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-warn">{t("常见现状")}</span></p>
<p className="small mt-8">{t("分支被迫适配总部模板，本地规则只能线下执行；制度与系统两张皮。")}</p>
</div>
<div className="marketing-card card-flat">
<p className="small"><span className="tag tag-accent">{t("方案目标")}</span></p>
<p className="small mt-8">{t("系统贴合真实业务，分支差异通过元素重写承载；制度与审批规则落在系统里，改完立即生效。")}</p>
</div>
</div>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("预期价值")}</h3>
<ul className="bullets">
<li>{t("不再需要企业强行适配标准化模板")}</li>
<li>{t("总部统一口径与分支灵活并存，不再二选一")}</li>
<li>{t("变更成本从\"排期再开发\"降到\"对话即时调整\"")}</li>
<li>{t("全链路可追溯，审计与回滚有据可依")}</li>
</ul>
</div>
</div>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("怎么开始")}</p>
<h2 className="h2 mt-16">{t("落地路径，从最痛的环节开始")}</h2>
</div>
<div className="steps reveal">
<div className="step">
<h4>{t("免费体验")}</h4>
<p>{t("下载桌面版，搭建第一个业务场景，验证价值后再升级。")}</p>
</div>
<div className="step">
<h4>{t("核心场景上线")}</h4>
<p>{t("选择最痛的业务环节，几周内跑通第一个业务闭环。")}</p>
</div>
<div className="step">
<h4>{t("全面推广")}</h4>
<p>{t("部署服务器版，扩展到全业务流程与全部业务板块智能体。")}</p>
</div>
<div className="step">
<h4>{t("持续进化")}</h4>
<p>{t("三重反馈回流，系统与智能体随业务变化持续迭代。")}</p>
</div>
</div>
</div>
</section>

<section className="cta-band">
<div className="wrap">
<h2 className="h2 mt-16 reveal">{t("聊聊你的业务场景")}</h2>
<p className="lead mt-24 reveal" style={{"maxWidth": "56ch", "marginInline": "auto"}}>{t("结合你的业务需求，讨论适合的落地方式。 从核心场景开始，逐步验证价值。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href={path("/about#contact")}>{t("预约深度方案沟通")}</a>
<a className="btn btn-ghost btn-lg" href={path("/download")}>{t("先下载桌面版体验")}</a>
</div>
</div>
</section>

  </>;
}
