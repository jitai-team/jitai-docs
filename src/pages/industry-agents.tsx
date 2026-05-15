import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PageLayout from "@site/src/components/PageLayout";
import styles from "@site/src/pages/agent-pages.module.css";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    XCircle,
} from "lucide-react";

type Industry = {
    id: string;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
    features: string[];
    icon: string;
    statIcon: string;
};

type ComparisonRow = [string, string, string];

type PageCopy = {
    eyebrow: string;
    title: string;
    description: string;
    industries: Industry[];
    comparisonEyebrow: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    comparisonHead: ComparisonRow;
    comparisonRows: ComparisonRow[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
};

const pageCopy: Record<"zh" | "en", PageCopy> = {
    zh: {
        eyebrow: "Industry Solutions",
        title: "行业 Agent 解决方案",
        description:
            "深入理解行业特性，为不同行业量身定制 AI 智能体解决方案。结合行业知识、业务流程和合规要求，打造真正懂行业的 AI 员工。",
        comparisonEyebrow: "Comparison",
        comparisonTitle: "为什么选择行业智能体",
        comparisonSubtitle: "通用 AI vs JitAI 行业智能体",
        comparisonHead: ["能力维度", "JitAI 行业智能体", "通用 AI 助手"],
        comparisonRows: [
            ["行业知识", "内置行业知识与最佳实践", "缺乏行业专业知识"],
            ["行业术语", "理解行业术语和流程", "无法理解行业术语"],
            ["系统集成", "可与 ERP/CRM/MES 集成", "集成困难"],
            ["合规要求", "符合行业法规与合规", "无法满足合规要求"],
            ["自动化程度", "高度自动化", "需要大量人工干预"],
        ],
        ctaTitle: "您的行业需要定制智能体？",
        ctaDescription:
            "我们深耕多个行业，可以为您量身定制专属的行业 AI 智能体解决方案。",
        ctaButton: "联系我们的团队",
        industries: [
            {
                id: "industrial",
                title: "工业智能体",
                stat: "20-50 倍",
                statLabel: "生产效率提升",
                description:
                    "面向制造业、工厂、工业生产。涵盖生产调度、质量检测、设备维护、供应链优化等环节。",
                features: [
                    "生产计划调度 Agent",
                    "质量检测分析 Agent",
                    "设备预测维护 Agent",
                    "供应链优化 Agent",
                    "能耗分析与优化",
                    "工艺参数优化与知识沉淀",
                    "与 MES/ERP/PLM 系统集成",
                ],
                icon: "🏭",
                statIcon: "⚙️",
            },
            {
                id: "audit",
                title: "审计智能体",
                stat: "30-100 倍",
                statLabel: "审计效率提升",
                description:
                    "面向会计师事务所、审计机构。自动化审计流程，提升审计质量和效率，降低审计风险。",
                features: [
                    "财务审计 Agent",
                    "合规审查 Agent",
                    "风险评估 Agent",
                    "报告生成 Agent",
                    "异常交易智能识别",
                    "审计底稿自动生成",
                    "法规合规性自动检查",
                ],
                icon: "📊",
                statIcon: "✅",
            },
            {
                id: "enterprise",
                title: "企服智能体",
                stat: "10-30 倍",
                statLabel: "服务效率提升",
                description:
                    "面向企业服务、咨询服务机构。包括工商财税、法律咨询、人力资源等服务场景。",
                features: [
                    "工商注册 Agent",
                    "财税代理 Agent",
                    "法律咨询 Agent",
                    "人力资源 Agent",
                    "合同审查与风险识别",
                    "客户档案管理",
                    "服务进度跟踪与提醒",
                    "多客户服务并发处理",
                ],
                icon: "💼",
                statIcon: "📋",
            },
            {
                id: "design",
                title: "设计智能体",
                stat: "5-20 倍",
                statLabel: "设计效率提升",
                description:
                    "面向设计公司、创意工作室。包括平面设计、UI/UX 设计、工业设计等，辅助创意设计与生产。",
                features: [
                    "平面设计 Agent",
                    "UI/UX 设计 Agent",
                    "创意生成 Agent",
                    "素材管理 Agent",
                    "设计需求智能理解",
                    "设计规范自动检查",
                    "设计稿标注与交付自动化",
                    "与设计工具集成（Figma/Sketch）",
                ],
                icon: "🎨",
                statIcon: "🎨",
            },
        ],
    },
    en: {
        eyebrow: "Industry Solutions",
        title: "Industry Agent Solutions",
        description:
            "We deeply understand industry-specific requirements and build tailored AI agent solutions for different industries, combining industry knowledge, business workflows, and compliance requirements.",
        comparisonEyebrow: "Comparison",
        comparisonTitle: "Why Choose Industry Agents",
        comparisonSubtitle: "General AI vs JitAI Industry Agents",
        comparisonHead: [
            "Capability",
            "JitAI Industry Agent",
            "General AI Assistant",
        ],
        comparisonRows: [
            [
                "Industry Knowledge",
                "Built-in industry knowledge and best practices",
                "Lacks industry expertise",
            ],
            [
                "Industry Terms",
                "Understands industry terminology and workflows",
                "Cannot understand industry terminology",
            ],
            [
                "System Integration",
                "Integrates with ERP/CRM/MES",
                "Difficult to integrate",
            ],
            [
                "Compliance Requirements",
                "Meets industry regulatory and compliance needs",
                "Cannot satisfy compliance requirements",
            ],
            [
                "Automation Level",
                "Highly automated",
                "Requires substantial manual intervention",
            ],
        ],
        ctaTitle: "Need a custom agent for your industry?",
        ctaDescription:
            "We have deep experience across industries and can tailor dedicated industry AI agent solutions for you.",
        ctaButton: "Contact our team",
        industries: [
            {
                id: "industrial",
                title: "Industrial Agent",
                stat: "20-50x",
                statLabel: "Production efficiency improvement",
                description:
                    "Built for manufacturing, factories, and industrial production, covering production scheduling, quality inspection, equipment maintenance, and supply chain optimization.",
                features: [
                    "Production planning and scheduling Agent",
                    "Quality inspection and analysis Agent",
                    "Predictive equipment maintenance Agent",
                    "Supply chain optimization Agent",
                    "Energy consumption analysis and optimization",
                    "Process parameter optimization and knowledge capture",
                    "MES/ERP/PLM system integration",
                ],
                icon: "🏭",
                statIcon: "⚙️",
            },
            {
                id: "audit",
                title: "Audit Agent",
                stat: "30-100x",
                statLabel: "Audit efficiency improvement",
                description:
                    "Built for accounting firms and audit organizations, automating audit workflows to improve audit quality and efficiency while reducing risk.",
                features: [
                    "Financial audit Agent",
                    "Compliance review Agent",
                    "Risk assessment Agent",
                    "Report generation Agent",
                    "Intelligent abnormal transaction detection",
                    "Automatic audit working paper generation",
                    "Automatic regulatory compliance checks",
                ],
                icon: "📊",
                statIcon: "✅",
            },
            {
                id: "enterprise",
                title: "Enterprise Services Agent",
                stat: "10-30x",
                statLabel: "Service efficiency improvement",
                description:
                    "Built for enterprise services and consulting organizations, including business registration, finance and tax, legal consulting, and HR service scenarios.",
                features: [
                    "Business registration Agent",
                    "Finance and tax agency Agent",
                    "Legal consulting Agent",
                    "Human resources Agent",
                    "Contract review and risk identification",
                    "Customer profile management",
                    "Service progress tracking and reminders",
                    "Concurrent multi-customer service handling",
                ],
                icon: "💼",
                statIcon: "📋",
            },
            {
                id: "design",
                title: "Design Agent",
                stat: "5-20x",
                statLabel: "Design efficiency improvement",
                description:
                    "Built for design companies and creative studios, covering graphic design, UI/UX design, industrial design, and creative production support.",
                features: [
                    "Graphic design Agent",
                    "UI/UX design Agent",
                    "Creative generation Agent",
                    "Asset management Agent",
                    "Intelligent design requirement understanding",
                    "Automatic design specification checks",
                    "Design annotation and delivery automation",
                    "Design tool integration for Figma and Sketch",
                ],
                icon: "🎨",
                statIcon: "🎨",
            },
        ],
    },
};

const IndustryAgentsPage: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const copy = i18n.currentLocale === "zh" ? pageCopy.zh : pageCopy.en;

    return (
        <PageLayout pageId="industry-agents" containerClassName={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroContent}>
                        <p className={styles.eyebrow}>{copy.eyebrow}</p>
                        <h1 className={styles.heroTitle}>{copy.title}</h1>
                        <p className={styles.heroDescription}>
                            {copy.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionInner}>
                    <div className={styles.industryList}>
                        {copy.industries.map((industry, index) => {
                            const isReverse = index % 2 === 1;
                            return (
                                <article
                                    className={`${styles.industryCard} ${
                                        index % 2 ? styles.industryCardAlt : ""
                                    } ${
                                        isReverse
                                            ? styles.industryCardReverse
                                            : ""
                                    }`}
                                    id={industry.id}
                                    key={industry.id}
                                >
                                    <div className={styles.cardContent}>
                                        <div className={styles.iconBox}>
                                            <span
                                                aria-hidden="true"
                                                className={styles.emojiIcon}
                                            >
                                                {industry.icon}
                                            </span>
                                        </div>
                                        <h2 className={styles.cardTitle}>
                                            {industry.title}
                                        </h2>
                                        <p className={styles.cardDescription}>
                                            {industry.description}
                                        </p>
                                        <ul className={styles.featureList}>
                                            {industry.features.map((feature) => (
                                                <li
                                                    className={styles.featureItem}
                                                    key={feature}
                                                >
                                                    <Check
                                                        className={
                                                            styles.checkIcon
                                                        }
                                                    />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.industryStat}>
                                        <span
                                            aria-hidden="true"
                                            className={styles.statEmoji}
                                        >
                                            {industry.statIcon}
                                        </span>
                                        <p className={styles.statValue}>
                                            {industry.stat}
                                        </p>
                                        <p className={styles.statLabel}>
                                            {industry.statLabel}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <div className={styles.sectionInner}>
                    <div className={styles.sectionHeader}>
                        <p className={styles.eyebrow}>
                            {copy.comparisonEyebrow}
                        </p>
                        <h2 className={styles.sectionTitle}>
                            {copy.comparisonTitle}
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            {copy.comparisonSubtitle}
                        </p>
                    </div>

                    <div className={styles.comparison}>
                        <div
                            className={`${styles.comparisonRow} ${styles.comparisonHead}`}
                        >
                            {copy.comparisonHead.map((item) => (
                                <div className={styles.comparisonCell} key={item}>
                                    {item}
                                </div>
                            ))}
                        </div>
                        {copy.comparisonRows.map(([label, jitai, general]) => (
                            <div className={styles.comparisonRow} key={label}>
                                <div
                                    className={`${styles.comparisonCell} ${styles.comparisonLabel}`}
                                >
                                    {label}
                                </div>
                                <div className={styles.comparisonCell}>
                                    <CheckCircle2
                                        className={styles.positiveIcon}
                                    />
                                    <span>{jitai}</span>
                                </div>
                                <div className={styles.comparisonCell}>
                                    <XCircle className={styles.negativeIcon} />
                                    <span>{general}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
                    <p className={styles.ctaDescription}>
                        {copy.ctaDescription}
                    </p>
                    <Link className={styles.ctaButton} to="/contact">
                        {copy.ctaButton}
                        <ArrowRight className={styles.buttonIcon} />
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
};

export default IndustryAgentsPage;
