import React from "react";
import { useMarketingCopy } from "../copy";
import ContactSection from "../ContactSection";

export default function Home() {
  const { t, text, path, brand } = useMarketingCopy();
  return <>

<section className="marketing-hero">
<div className="hero-bg" aria-hidden="true">
<svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" fill="none">
<g stroke="var(--accent)" strokeOpacity=".16" strokeWidth="1">
<path d="M120 300 L300 180 L520 260 L700 150 L900 240 L1100 170"></path>
<path d="M120 300 L260 420 L480 400 L700 470 L900 390 L1080 450"></path>
<path d="M300 180 L260 420"></path>
<path d="M520 260 L480 400"></path>
<path d="M700 150 L700 470"></path>
<path d="M900 240 L900 390"></path>
<path d="M260 420 L480 400 L700 470 L900 390 L1080 450"></path>
<path d="M300 180 L520 260 L700 150 L900 240 L1100 170" strokeOpacity=".1"></path>
<path d="M520 260 L900 390" strokeOpacity=".07"></path>
<path d="M300 180 L700 470" strokeOpacity=".07"></path>
</g>
<g fill="var(--accent)">
<g className="node"><circle cx="120" cy="300" r="3.5" fillOpacity=".5"></circle></g>
<g className="node"><circle cx="300" cy="180" r="4.5" fillOpacity=".6"></circle></g>
<g className="node"><circle cx="520" cy="260" r="3.5" fillOpacity=".45"></circle></g>
<g className="node"><circle cx="700" cy="150" r="5.5" fillOpacity=".7"></circle></g>
<g className="node"><circle cx="900" cy="240" r="4" fillOpacity=".5"></circle></g>
<g className="node"><circle cx="1100" cy="170" r="3" fillOpacity=".4"></circle></g>
<g className="node"><circle cx="260" cy="420" r="4" fillOpacity=".5"></circle></g>
<g className="node"><circle cx="480" cy="400" r="3" fillOpacity=".4"></circle></g>
<g className="node"><circle cx="700" cy="470" r="4.5" fillOpacity=".55"></circle></g>
<g className="node"><circle cx="900" cy="390" r="3.5" fillOpacity=".45"></circle></g>
<g className="node"><circle cx="1080" cy="450" r="3" fillOpacity=".38"></circle></g>
</g>
<g stroke="var(--accent)" strokeOpacity=".07" strokeWidth="1">
<path d="M0 60 H1200 M0 180 H1200 M0 300 H1200 M0 420 H1200 M0 540 H1200"></path>
<path d="M200 0 V620 M400 0 V620 M600 0 V620 M800 0 V620 M1000 0 V620"></path>
</g>
</svg>
</div>
<div className="hero-veil" aria-hidden="true"></div>
<div className="wrap hero-inner">
<p className="kicker reveal">{brand.productTitle}</p>
<h1 className="h1 mt-16 reveal">{text("构建 AI 原生系统，", "Build AI-Native Systems,")}<br />{text("释放 AI 无限潜能", "Unleash the Full Potential of AI")}</h1>
<p className="lead mt-24 reveal">{text("JitAI，轻松构建", "JitAI makes it easy to build ")}<b className="mark">{text("AI 原生", "AI-native")}</b>{text("的业务系统，让 AI 看懂您的业务全貌，最大化释放 AI 智力生产力。", " business systems, gives AI the full picture of your business, and maximizes the productivity of AI intelligence.")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href={path("/download")}>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>{t("免费体验桌面版")}</a>
<a className="btn btn-ghost btn-lg" href={path("/about#contact")}>{t("预约企业落地沟通")}</a>
</div>
<p className="hero-note reveal">{t("与外挂式桌面 AI 智能体不同，JitAI 的业务 AI 和开发 AI 都内生在业务系统之中。")}</p>
</div>
</section>

<section className="section">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("行业现状")}</p>
<h2 className="h2 mt-16">{t("企业 AI 落地的两座大山")}</h2>
</div>
<div className="grid g-2">
<div className="marketing-card card-warn reveal">
<div className="row gap-12 mb-16">
<span className="num-badge">{"01"}</span>
<h3 className="h4">{t("业务运行侧：智能体游离在系统之外")}</h3>
</div>
<ul className="bullets">
<li><strong>{t("AI 看得见界面与数据，看不懂业务")}</strong></li>
<li>{t("进场的是通用智能体而非专用智能体，缺乏业务上下文")}</li>
<li>{t("旧系统不是 AI 原生、没有业务孪生，业务对象与状态规则对 AI 不可见")}</li>
<li>{t("没有角色权限与审批边界的硬约束，给得出建议，执行不了业务")}</li>
</ul>
<p className="small mt-16 accent">{t("结果：只能做辅助问答，无法自主驱动真实业务。")}</p>
</div>
<div className="marketing-card card-warn reveal">
<div className="row gap-12 mb-16">
<span className="num-badge">{"02"}</span>
<h3 className="h4">{t("系统开发侧：AI 编码只有碎片化能力")}</h3>
</div>
<ul className="bullets">
<li><strong>{t("AI 只会写代码，建不起完整的业务系统")}</strong></li>
<li>{t("需求、设计、验证、运行反馈全链路断裂，写完缺少自动反馈")}</li>
<li>{t("落地实施依赖繁重的 FDE 驻场定制，靠人力堆出来的交付难以复制")}</li>
<li>{t("高度定制系统周期长、改不动，AI 提效被实施成本吃掉")}</li>
</ul>
<p className="small mt-16 accent">{t("结果：综合提效有限，定制成本居高不下。")}</p>
</div>
</div>
<p className="quote-line mt-32 reveal">{t("问题根源：")}<span className="mark">{t("AI 缺少完整、连续、可感知的全链路信息。")}</span>
</p>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head center reveal">
<p className="kicker">{t("JitAI 技术")}</p>
<h2 className="h2 mt-16">{t("AI 开发与 AI 运行，共生一体")}</h2>
<p className="lead mt-16">{t("开发和运行共用同一套 AI 原生架构。")}</p>
</div>
<div className="grid g-2">
<div className="marketing-card card-ok reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinejoin="round"></path>
<path d="m2 17 10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h3">{t("业务系统 AI 原生")}</h3>
<ul className="checklist mt-16">
<li>{t("按元素化规范一比一还原现实业务")}</li>
<li>{t("模块自描述，可被 AI 感知与驱动")}</li>
<li>{t("专用智能体内嵌系统，在规则约束下自动执行业务动作")}</li>
<li><strong>{t("让 AI 第一次看见了业务系统内部的全貌，解锁了 AI 运行系统的智力")}</strong></li>
</ul>
</div>
<div className="marketing-card card-ok reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h3">{t("开发过程 AI 原生")}</h3>
<ul className="checklist mt-16">
<li>{t("开发与运行共用同一套元素模型和运行时")}</li>
<li>{t("AI 可读取定义、代码、测试结果与线上运行反馈")}</li>
<li>{t("运行反馈持续回流，AI 越调越准")}</li>
<li><strong>{t("让 AI 第一次同时看见系统开发与系统运行过程，解锁了 AI 开发系统的智力")}</strong></li>
</ul>
</div>
</div>
<p className="quote-line mt-32 reveal">
<strong>{t("AI 原生的本质：让 AI 能看见、能使用。")}</strong><br />{t("企业 AI 原生化，就是把企业的一切构建成 AI 能看见和能使用的 知识、规则、数据、工具、系统功能。")}</p>
</div>
</section>

<section className="section" id="product">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("产品特性")}</p>
<h2 className="h2 mt-16">{t("一个平台，搞定全部开发、部署、运行")}</h2>
</div>
<div className="grid g-4">
<div className="marketing-card card-hover reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<rect x="4" y="4" width="16" height="16" rx="2"></rect>
<rect x="9" y="9" width="6" height="6"></rect>
<path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" strokeLinecap="round"></path>
</svg>
</div>
<h3 className="h5">{t("JitNode 运行时底座")}</h3>
<p className="small mt-8">{t("统一元素规范、自描述、热加载热更新，开发与运行同源。")}</p>
</div>
<div className="marketing-card card-hover reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="M12 3l1.9 4.3L18 9l-4.1 1.7L12 15l-1.9-4.3L6 9l4.1-1.7L12 3Z" strokeLinejoin="round"></path>
<path d="M18 15l.8 1.8L20 18l-1.2.7L18 21l-.8-2.3L16 18l1.2-.8L18 15Z" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h5">{t("JitAI AI 开发助手")}</h3>
<p className="small mt-8">{t("对话式建模、生成、校验与迭代，源码始终可见可编辑。")}</p>
</div>
<div className="marketing-card card-hover reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<rect x="4" y="8" width="16" height="12" rx="2"></rect>
<circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none"></circle>
<circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none"></circle>
<path d="M12 8V4M8.5 4.6 9 8M15.5 4.6 15 8" strokeLinecap="round"></path>
</svg>
</div>
<h3 className="h5">{t("业务智能体能力集")}</h3>
<p className="small mt-8">{t("按业务板块内嵌的专用智能体，权限与规则可管、动作可审计。")}</p>
</div>
<div className="marketing-card card-hover reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z" strokeLinejoin="round"></path>
<path d="m3.3 7 8.7 5 8.7-5M12 22V12" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h5">{t("应用沙箱 & 企业工作台")}</h3>
<p className="small mt-8">{t("可视化搭建与调试，先跑通一个场景再全面推广。")}</p>
</div>
</div>
<div className="section-head mt-40 reveal">
<p className="kicker">{t("平台特性")}</p>
<h2 className="h2 mt-16">{t("JitAI 企业系统的九大特性")}</h2>
</div>
<div className="grid g-3">
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("自动生成")}</h3><p className="small mt-8">{t("AI 开发助手构建，无需手写")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("业务孪生")}</h3><p className="small mt-8">{t("全场景映射真实业务")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("AI 原生")}</h3><p className="small mt-8">{t("感知 / 理解 / 调用 / 执行")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("企业私有")}</h3><p className="small mt-8">{t("私有化部署，数据自有")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("双模同源")}</h3><p className="small mt-8">{t("智能与功能同一体系")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("规范健壮")}</h3><p className="small mt-8">{t("规范化元素，六项验证")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("持续扩展")}</h3><p className="small mt-8">{t("动态演变，随需而变")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("可控可治理")}</h3><p className="small mt-8">{t("可审计、可追溯、可回退")}</p></div>
<div className="marketing-card card-flat reveal"><h3 className="h5">{t("对话开发 + 源码兜底")}</h3><p className="small mt-8">{t("无需碰码，也可源码定制")}</p></div>
</div>
<div className="section-head mt-40 reveal">
<p className="kicker">{t("交付形态")}</p>
<h2 className="h2 mt-16">{t("三种交付形态")}</h2>
</div>
<div className="table-wrap reveal">
<table className="data">
<thead>
<tr>
<th>{t("对比维度")}</th>
<th>{t("免费桌面体验版")}</th>
<th className="col-us">{t("云托管订阅版")}</th>
<th>{t("私有化部署版")}</th>
</tr>
</thead>
<tbody>
<tr>
<td>{t("部署位置")}</td>
<td>{t("本地桌面")}</td>
<td className="col-us">{t("JitAI 云托管，浏览器访问")}</td>
<td>{t("企业自有服务器，数据不出域")}</td>
</tr>
<tr>
<td>{t("并发与规模")}</td>
<td>{t("单机单人使用")}</td>
<td className="col-us">{t("按订阅套餐配置")}</td>
<td>{t("按企业规模规划部署")}</td>
</tr>
<tr>
<td>{t("服务支持")}</td>
<td>{t("文档与社区")}</td>
<td className="col-us">{t("在线支持与版本更新")}</td>
<td>{t("专属实施、培训与运维支持")}</td>
</tr>
<tr>
<td>{t("适用客户")}</td>
<td>{t("想先验证价值的个人与小团队")}</td>
<td className="col-us">{t("希望快速上线的中小企业")}</td>
<td>{t("有数据合规与深度定制诉求的中大型企业")}</td>
</tr>
<tr>
<td>{t("计费方式")}</td>
<td>{t("免费")}</td>
<td className="col-us">{t("云托管订阅")}</td>
<td>{t("按需沟通方案")}</td>
</tr>
</tbody>
</table>
</div>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary" href={path("/download")}>{t("下载桌面版")}</a>
<a className="btn btn-ghost" href={path("/about#contact")}>{t("咨询订阅与私有化方案")}</a>
</div>
</div>
</section>

<section className="section section-alt">
<div className="wrap">
<div className="section-head reveal">
<p className="kicker">{t("落地价值")}</p>
<h2 className="h2 mt-16">{t("从个人提效，升级为组织生产力质变")}</h2>
<p className="lead mt-16">{t("企业运转得快不快，不取决于文档写多快，而取决于大大小小的决策做得多快、多准， 采购多少？补不补货？订单接不接？价格怎么定？异常怎么处理？资源怎么分配？")}<strong>{t("决策越准越快，企业整体才会快。")}</strong>
</p>
</div>
<div className="grid g-3 mt-32">
<div className="marketing-card center reveal">
<h3 className="h5">{t("会聊天")}</h3>
<p className="small mt-8">{t("回答问题")}<br />{t("信息层面")}</p>
</div>
<div className="marketing-card center reveal">
<h3 className="h5">{t("会干活")}</h3>
<p className="small mt-8">{t("执行具体任务")}<br />{t("动作层面")}</p>
</div>
<div className="marketing-card card-ok center reveal">
<h3 className="h5">{t("会经营")}</h3>
<p className="small mt-8">{t("做经营决策")}<br />{t("驱动增长")}</p>
</div>
</div>
<p className="quote-line mt-32 reveal">{t("AI 的下一阶段，是替企业做经营决策 —— 这才是组织生产力的真正释放点。")}</p>
<p className="small dim center mt-40 reveal">{t("—— JitAI 的兑现方式 ——")}</p>
<div className="grid g-4">
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"></path>
<path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h5">{t("业务自主驱动")}</h3>
<p className="small mt-8">{t("智能体参与经营判断，在权限与规则内自动执行动作。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<circle cx="12" cy="12" r="9"></circle>
<path d="M15.5 9.5A4 4 0 0 0 8.5 11c0 2.5 2 3.5 2 4.5h3c0-1 2-2 2-4.5a4 4 0 0 0-.5-1.5M10 20h4" strokeLinecap="round"></path>
</svg>
</div>
<h3 className="h5">{t("低成本高度定制")}</h3>
<p className="small mt-8">{t("同源闭环开发，业务变了对话就能改，即时生效。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
<rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
<rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
<rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
</svg>
</div>
<h3 className="h5">{t("业务一比一孪生")}</h3>
<p className="small mt-8">{t("系统贴合真实业务，企业无需迁就标准化模板。")}</p>
</div>
<div className="marketing-card reveal">
<div className="card-icon mb-16">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
<path d="M23 4v6h-6" strokeLinecap="round" strokeLinejoin="round"></path>
<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
</div>
<h3 className="h5">{t("持续自我迭代")}</h3>
<p className="small mt-8">{t("运行、智能体、人工三重反馈回流，越用越适配。")}</p>
</div>
</div>
<div className="section-head mt-40 reveal">
<p className="kicker">{t("适用场景")}</p>
<h2 className="h2 mt-16">{t("面向全行业经营场景落地")}</h2>
</div>
<div className="grid g-6">
<a className="marketing-card card-hover center reveal" href={path("/solutions#sales")}><h3 className="h5">{t("销售智能经营")}</h3></a>
<a className="marketing-card card-hover center reveal" href={path("/solutions#purchase")}><h3 className="h5">{t("采购成本管控")}</h3></a>
<a className="marketing-card card-hover center reveal" href={path("/solutions#inventory")}><h3 className="h5">{t("库存智能周转")}</h3></a>
<a className="marketing-card card-hover center reveal" href={path("/solutions#production")}><h3 className="h5">{t("生产流程优化")}</h3></a>
<a className="marketing-card card-hover center reveal" href={path("/solutions#finance")}><h3 className="h5">{t("财务智能复盘")}</h3></a>
<a className="marketing-card card-hover center reveal" href={path("/solutions#risk")}><h3 className="h5">{t("企业综合风控")}</h3></a>
</div>
<div className="center mt-32">
<a className="btn btn-ghost btn-lg reveal" href={path("/solutions")}>{t("查看完整解决方案")}</a>
</div>
</div>
</section>

<section className="section">
<div className="wrap wrap-narrow">
<div className="section-head center reveal">
<p className="kicker">{t("技术能力")}</p>
<h2 className="h2 mt-16">{t("元素化抽象模型，统一开发与运行")}</h2>
<p className="lead mt-16">{t("传统数字化是")}<b>{t("人适配系统")}</b>{t("；AI 原生数字化是")}<b>{t("系统孪生业务、AI 驱动系统")}</b>{"。"}</p>
</div>
<div className="flowline mt-24 reveal">
<span className="node">{t("开发侧生成元素")}</span>
<span className="arrow">{"→"}</span>
<span className="node">{t("运行侧加载执行")}</span>
<span className="arrow">{"→"}</span>
<span className="node hi">{t("运行回执回流")}</span>
<span className="arrow">{"→"}</span>
<span className="node">{t("迭代优化")}</span>
</div>
<div className="btn-row mt-32 reveal" style={{"justifyContent": "center"}}>
<a className="btn btn-primary" href={path("/whitepaper")}>{t("阅读技术白皮书")}</a>
<a className="btn btn-ghost" href={path("/cases")}>{t("查看场景示例")}</a>
</div>
</div>
</section>
<section className="section section-alt"><div className="wrap"><div className="section-head reveal"><p className="kicker">{t("渠道合作")}</p><h2 className="h2 mt-16">{t("携手服务商伙伴，探索企业 AI 原生落地")}</h2><p className="lead mt-16">{t("面向软件服务商、系统集成商与行业咨询团队，围绕客户需求共同探讨产品推广、方案共建与项目合作。")}</p></div><div className="grid g-3 mb-32"><div className="marketing-card reveal"><h3 className="h4">{t("产品交流")}</h3><p className="small mt-16">{t("了解平台能力与适用场景。")}</p></div><div className="marketing-card reveal"><h3 className="h4">{t("方案共建")}</h3><p className="small mt-16">{t("结合行业经验与客户需求，探索落地路径。")}</p></div><div className="marketing-card reveal"><h3 className="h4">{t("合作洽谈")}</h3><p className="small mt-16">{t("沟通双方能力、项目分工与合作方式。")}</p></div></div><a className="btn btn-primary btn-lg" href={path("/partners")}>{t("了解合作方向")}</a></div></section>

<section className="cta-band" id="cta">
<div className="wrap">
<h2 className="h1 mt-16 reveal" style={{"fontSize": "clamp(1.8rem,4vw,2.875rem)"}}>{t("落地真正能自生长的业务 AI")}</h2>
<p className="lead mt-24 reveal" style={{"maxWidth": "56ch", "marginInline": "auto"}}>{t("桌面版免费。先搭一个业务场景验证价值，再决定是否全面推广。")}</p>
<div className="btn-row mt-32 reveal">
<a className="btn btn-primary btn-lg" href={path("/download")}>{t("免费下载体验")}</a>
<a className="btn btn-ghost btn-lg" href={path("/about#contact")}>{t("预约深度方案沟通")}</a>
</div>
</div>
</section>

  </>;
}
