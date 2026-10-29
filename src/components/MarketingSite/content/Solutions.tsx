import React from "react";
import { useMarketingCopy } from "../copy";
import ContactSection from "../ContactSection";

export default function Solutions() {
  const { t, path } = useMarketingCopy();
  return <>

<section className="section" style={{"paddingBlock": "clamp(48px,6vw,72px)"}}>
<div className="wrap">
<p className="kicker reveal">{t("解决方案")}</p>
<h1 className="h1 mt-16 reveal" style={{"fontSize": "clamp(1.9rem,4.2vw,3rem)", "maxWidth": "100%"}}>{t("面向全行业经营场景落地")}</h1>
<p className="lead mt-24 reveal" style={{"maxWidth": "70ch"}}>{t("一个业务板块一个专用智能体，")}<b>{t("AI 做不确定性的判断决策，系统功能做确定性事务的执行。")}</b>
</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary" href={path("/about#contact")}>{t("预约场景沟通")}</a>
<a className="btn btn-ghost" href={path("/whitepaper#architecture")}>{t("了解平台架构")}</a>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("分工原则")}</p>
<h2 className="h2 mt-16">{t("AI 大脑在各板块怎么干活")}</h2>
<p className="lead mt-16">{t("大模型只做分析判断，不执行金额、库存与状态变更。")}</p>
</div>
<div className="table-wrap reveal">
<table className="data">
<thead>
<tr><th>{t("业务板块")}</th><th>{t("AI 智能体 · 做判断")}</th><th>{t("业务系统 · 做执行")}</th></tr>
</thead>
<tbody>
<tr><td>{t("销售")}</td><td>{t("客户报价依据、跟进节点、风险预警")}</td><td>{t("价格与信用由系统判定")}</td></tr>
<tr><td>{t("采购")}</td><td>{t("比价依据、到货异常、替代方案")}</td><td>{t("审批与数量校验由系统执行")}</td></tr>
<tr><td>{t("仓储")}</td><td>{t("缺口提示、账实差异、盘点待办")}</td><td>{t("库存与批次状态由系统维护")}</td></tr>
<tr><td>{t("生产")}</td><td>{t("排产建议、延误影响、交期风险")}</td><td>{t("工单与完工节点由系统确定")}</td></tr>
<tr><td>{t("质量")}</td><td>{t("检验依据、可疑批次、历史处理")}</td><td>{t("判定与放行状态由系统承担")}</td></tr>
<tr><td>{t("财务")}</td><td>{t("差异比对、归因说明、异常往来")}</td><td>{t("金额与勾稽由系统计算")}</td></tr>
<tr><td>{t("人力")}</td><td>{t("制度问答、材料整理、待办跟进")}</td><td>{t("权限与审批节点由系统约束")}</td></tr>
<tr><td>{t("管理层")}</td><td>{t("经营问答、波动解释、风险汇总")}</td><td>{t("取数口径与范围由系统限定")}</td></tr>
</tbody>
</table>
</div>
</div>
</section>

<section className="section" id="sales">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 01")}</p>
<h2 className="h2 mt-16">{t("销售智能经营")}</h2>
<p className="lead mt-16">{t("从\"客户跟进靠业务员记忆\"，到\"每个客户都有专属 AI 在盯\"。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("客户跟进全靠业务员记忆和微信，人员一走客户就断")}</li>
<li>{t("报价靠拍脑袋，历史成交价、信用额度、毛利底线拿不准")}</li>
<li>{t("回款提醒、续约节点、流失信号没人系统性盯")}</li>
<li>{t("CRM 里的数据与实际业务动作脱节，AI 工具只能写话术、看不到客户全貌")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("销售智能体作为")}<strong>{t("系统内元素")}</strong>{t("，直接读取客户、订单、回款、信用全貌")}</li>
<li>{t("AI 给出")}<strong>{t("报价依据、跟进节点、风险预警")}</strong>{t("；价格与信用由系统规则判定")}</li>
<li>{t("绑定角色与数据范围：销售看到自己的客户，总监看到全盘")}</li>
<li>{t("可执行动作受控：AI 不能绕过审批直接改价格或放账期")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("AI 自动跟进客户、提醒回款，关键节点不再依赖个人记忆")}</li>
<li>{t("报价有依据、可追溯，异常折扣自动进入审批链路")}</li>
<li>{t("流失与逾期风险提前暴露，而不是月底复盘才发现")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("客户数量多、销售周期长、依赖人跟进的 B2B 企业； 经销与项目型销售；已有 CRM 但 AI 无法真正参与业务的团队。")}</p>
</div>
</div>
</div>
</section>

<section className="section section-alt" id="purchase">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 02")}</p>
<h2 className="h2 mt-16">{t("采购成本管控")}</h2>
<p className="lead mt-16">{t("从\"比价靠经验、异常靠人发现\"，到\"AI 出依据、系统管审批\"。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("历史价格散落在表格和聊天记录里，比价全凭经验和人情")}</li>
<li>{t("到货异常、质量偏差、交期延误，往往入库后才发现")}</li>
<li>{t("替代料、替代供应商找不到，缺料就停产或高价急采")}</li>
<li>{t("审批流在系统里，判断在人脑子里，两者对不上")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("采购智能体内嵌系统，读取供应商历史价、交期、质量记录")}</li>
<li>{t("AI 产出")}<strong>{t("比价依据、到货异常、替代方案")}</strong>{t("；审批与数量校验由系统执行")}</li>
<li>{t("供需匹配与成本管控规则写在服务与工作流里，确定性执行")}</li>
<li>{t("异常自动回流开发助手，持续校准判断口径")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("比价有据可查，异常采购自动触发审批")}</li>
<li>{t("到货异常提前预警，替代方案即时给出")}</li>
<li>{t("采购成本口径统一，管理层可实时查看偏差")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("采购品类多、供应商分散的制造与贸易企业； 成本敏感、毛利承压、需要把采购经验沉淀到系统里的公司。")}</p>
</div>
</div>
</div>
</section>

<section className="section" id="inventory">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 03")}</p>
<h2 className="h2 mt-16">{t("库存智能周转")}</h2>
<p className="lead mt-16">{t("从\"积压和缺料并存\"，到\"缺口提前提示、账实差异可归因\"。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("库存积压和缺料同时存在，没人提前发现")}</li>
<li>{t("账实差异靠月底盘点，差异原因说不清")}</li>
<li>{t("批次、效期、库位状态靠人工维护，错一次影响一批")}</li>
<li>{t("补货决策靠经验，没有与销售、生产、采购联动")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("库存模型元素承载批次、库位、状态机，对 AI 完全透明")}</li>
<li>{t("AI 给出")}<strong>{t("缺口提示、账实差异、盘点待办")}</strong>{t("；库存与批次状态由系统维护")}</li>
<li>{t("补货联动销售预测与采购在途，形成跨板块协同")}</li>
<li>{t("所有库存变更走标准化业务功能入口，业财一致、可审计")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("AI 自动预警缺料与积压，提前介入而不是事后救火")}</li>
<li>{t("账实差异可归因，盘点从\"查数\"变成\"查原因\"")}</li>
<li>{t("周转率、呆滞料、效期风险实时可见")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("SKU 数量大、批次效期敏感的制造、医药、食品与零售企业； 多仓库、多网点、库存周转压力大的公司。")}</p>
</div>
</div>
</div>
</section>

<section className="section section-alt" id="production">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 04")}</p>
<h2 className="h2 mt-16">{t("生产流程优化")}</h2>
<p className="lead mt-16">{t("从\"排产靠调度员、延误靠打电话\"，到\"排产有建议、交期有预警\"。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("排产依赖调度员经验，换人即换一套逻辑")}</li>
<li>{t("工序延误的影响范围算不清，只能逐个电话确认")}</li>
<li>{t("工单状态、完工节点靠人工录入，数据滞后")}</li>
<li>{t("质量异常的判定与放行流程割裂，责任难追溯")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("生产智能体读取工单、工序、设备、物料与在制状态")}</li>
<li>{t("AI 给出")}<strong>{t("排产建议、延误影响、交期风险")}</strong>{t("；工单与完工节点由系统确定")}</li>
<li>{t("工作流与事件元素承载确定性流转，AI 不直接改状态")}</li>
<li>{t("长任务智能体可异步盯产线，无人值守周期性巡检")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("排产建议可视、可调整，不再依赖单个调度员")}</li>
<li>{t("延误影响范围自动计算，交期风险提前暴露")}</li>
<li>{t("工序与质量节点全程留痕，责任清晰可追溯")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("多工序、多工单、交期压力大的离散与流程制造企业； 产能与订单波动明显、排产复杂度高的工厂。")}</p>
</div>
</div>
</div>
</section>

<section className="section" id="finance">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 05")}</p>
<h2 className="h2 mt-16">{t("财务智能复盘")}</h2>
<p className="lead mt-16">{t("从\"月底核算靠人工对表\"，到\"业务自动核算、差异自动归因\"。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("销售、采购、库存、财务各用一套表，数据对不上")}</li>
<li>{t("月底核算靠人工，差异原因需要逐个追")}</li>
<li>{t("往来款、勾稽关系复杂，异常难以及时发现")}</li>
<li>{t("经营复盘依赖财务人员经验，口径每次都不一样")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("AI 做")}<strong>{t("差异比对、归因说明、异常往来")}</strong>{t("；金额与勾稽由系统计算")}</li>
<li>{t("一套系统打通采购—销售—库存—财务，单一事实源")}</li>
<li>{t("管理层经营问答：波动解释、风险汇总，取数口径由系统限定")}</li>
<li>{t("所有变更走业务功能入口，业财一致、可审计、可回退")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("业务自动核算，数据实时可查，不再月底突击")}</li>
<li>{t("差异自动归因，复盘口径统一可复用")}</li>
<li>{t("异常往来提前预警，坏账风险前置")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("业务链条长、单据量大、跨部门对账成本高的企业； 管理层需要高频经营复盘但缺乏统一数据口径的公司。")}</p>
</div>
</div>
</div>
</section>

<section className="section section-alt" id="risk">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("场景 06")}</p>
<h2 className="h2 mt-16">{t("企业综合风控")}</h2>
<p className="lead mt-16">{t("风控的前提是 AI 看得懂业务全貌，并且被权限与规则约束住。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<h3 className="h5 mb-16">{t("行业痛点")}</h3>
<ul className="bullets">
<li>{t("信用、合同、审批、资金风险分散在不同系统，没人看全貌")}</li>
<li>{t("AI 工具没有角色与数据范围约束，不敢让它碰真实业务")}</li>
<li>{t("高风险动作缺少强制人工拦截，出事后难追溯")}</li>
<li>{t("审计靠翻日志，无法还原 AI 的判断依据")}</li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<h3 className="h5 mb-16">{t("JitAI AI 原生方案")}</h3>
<ul className="checklist">
<li>{t("统一 RBAC 与数据范围：")}<strong>{t("人和智能体同一套权限")}</strong></li>
<li>{t("调用前权限校验，精确到角色、流程节点、数据范围；不以页面可见性代替授权")}</li>
<li>{t("高风险动作可配置")}<strong>{t("强制人工审批拦截")}</strong></li>
<li>{t("全链路留痕：每一步操作含推理依据与数据快照，可追溯、可回退")}</li>
<li>{t("凭据只走环境变量注入，密钥不进日志，敏感数据不落盘")}</li>
</ul>
</div>
<div className="marketing-card reveal">
<h3 className="h5 mb-16">{t("落地效果")}</h3>
<ul className="bullets">
<li>{t("AI 能做的，正是它被授权的业务能力 —— 范围可枚举、可审计")}</li>
<li>{t("风险规则与业务系统同一套，不会两套分叉")}</li>
<li>{t("审计与回滚有据可依，合规沟通成本下降")}</li>
</ul>
<p className="small mt-16 dim">{t("具体效果以实际业务为准。")}</p>
</div>
<div className="marketing-card card-flat reveal">
<h3 className="h5 mb-16">{t("适用企业")}</h3>
<p className="small">{t("对合规、审计、数据安全有硬要求的中大型企业； 想让 AI 进入核心业务，但担心失控与不可追溯的决策者。")}</p>
</div>
</div>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("怎么落地")}</p>
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
<h2 className="h2 mt-16 reveal">{t("把你的业务场景讲给我们听")}</h2>
<p className="lead mt-24 reveal" style={{"maxWidth": "56ch", "marginInline": "auto"}}>{t("我们会按你的实际业务判断：哪些环节值得先做，哪些还不到时候。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href={path("/about#contact")}>{t("预约深度方案沟通")}</a>
<a className="btn btn-ghost btn-lg" href={path("/cases")}>{t("查看场景示例")}</a>
</div>
</div>
</section>

  </>;
}
