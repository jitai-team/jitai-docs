import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
    ArrowRight,
    BadgeCheck,
    Check,
    Code2,
    GitBranch,
    HardDrive,
    Layers3,
    LockKeyhole,
    MonitorCog,
    Server,
    Sparkles,
    X,
} from "lucide-react";
import PageLayout from "@site/src/components/PageLayout";
import styles from "@site/src/pages/index.module.css";

const CONTENT = {
    zh: {
        eyebrow: "Enterprise AI Agent Platform",
        titlePrefix: "企业级 ",
        titleHighlight: "AI 智能体",
        titleSuffix: "平台",
        description:
            "JitAI 是企业级 AI 智能体平台，帮助企业快速构建各种 AI 智能体，赋能其核心业务岗位，极大提升企业各个岗位工作效率以及业务整体运转效率。",
        primaryCta: "开始使用",
        secondaryCta: "了解架构",
        stats: [
            { value: "2-100x", label: "业务处理效率提升" },
            { value: "60+", label: "企业应用场景" },
            { value: "100%", label: "私有化部署" },
            { value: "热更新", label: "平台和 App 支持" },
        ],
        capabilities: {
            label: "CORE CAPABILITIES",
            title: "核心能力",
            subtitle: "JitAI 提供完整的企业级 AI 智能体开发和治理能力",
            items: [
                {
                    number: "01",
                    title: "共享与协同",
                    description:
                        "智能体之间共享企业内技能库、功能库、文件库、知识库、数据库，企业范围内统一管理与协同，实现各岗位的多 Agent 之间的高效资源能力共享和协作。",
                },
                {
                    number: "02",
                    title: "Skills 技能系统",
                    description:
                        "通过自然语言编写 Skills，将人类组织的核心业务逻辑、规则、专家经验、知识内置为机器系统能力，作为指导 AI 推理的说明书。",
                },
                {
                    number: "03",
                    title: "AI 化开发",
                    description:
                        "JitIDE 提供可视化、Agent 化（自然语言）的开发环境，用于开发和管理 BizApp 中的 AI 智能体和 IT 功能，降低开发门槛，提升开发效率。",
                },
                {
                    number: "04",
                    title: "统一治理",
                    description:
                        "统一的权限、审计、安全管理体系，企业范围内对技能、功能、数据、文件、知识进行统一治理，确保合规与安全。",
                },
                {
                    number: "05",
                    title: "传统 IT 系统兼容",
                    description:
                        "快速封装接入原有 ERP、CRM、HIS 等各类 IT 业务系统，Agent 可智能化调用和驱动这些系统，实现 AI 与传统 IT 的无缝融合。",
                },
                {
                    number: "06",
                    title: "桌面级 Agent 协同",
                    description:
                        "JitAI 提供桌面级智能体（openClaw 生态）jitClaw，通过 jitClaw 无缝访问和操控 Jit Biz App，实现桌面与企业级平台的无缝协同。",
                },
                {
                    number: "07",
                    title: "跨平台部署",
                    description:
                        "支持桌面版（Windows、macOS）和服务器版（Docker/Linux）私有化一键部署，平台和 App 都支持热更新，开箱即用。",
                },
                {
                    number: "08",
                    title: "无限扩展与集成",
                    description:
                        "无限扩展和集成已有工具包、数据库、IT 系统/API/CLI、各类 LLMs；导入已有 Skills 和业务 SOP，即可自动扩展出 skill 技能和 functions 函数，快速构建企业专属能力。",
                },
                {
                    number: "09",
                    title: "更多系统能力",
                    description:
                        "在智能体中，可轻松集成和驾驭应用中的 functions 功能系统、数据库系统、文件空间系统、知识库系统、子智能体系统，实现复杂业务的自动化处理与协同。",
                },
            ],
        },
        architecture: {
            label: "TECHNICAL ARCHITECTURE",
            title: "平台技术架构",
            subtitle:
                "JitAI 技术体系采用三层架构，自上而下为应用层、框架与工具层、运行时层",
            layers: [
                {
                    number: "01",
                    title: "BizApp",
                    subtitle: "应用层 · 用户/客户应用",
                    items: [
                        ["AI 智能体", "岗位 AI 员工"],
                        ["IT 功能模块", "传统业务系统"],
                        ["Skills", "自然语言技能说明"],
                        ["Functions", "可调用功能"],
                        ["Models", "数据模型"],
                        ["SubAgents", "子智能体"],
                        ["Files", "文件资源"],
                    ],
                },
                {
                    parallel: [
                        {
                            number: "02",
                            title: "jitFramework",
                            subtitle: "开发框架 · 支撑框架集合",
                            items: [
                                ["Agent Framework", "智能体框架"],
                                ["UI Framework", "界面框架"],
                                ["ORM Framework", "对象关系映射"],
                                ["LLMs Framework", "大模型接入"],
                            ],
                        },
                        {
                            number: "02",
                            title: "jitIDE",
                            subtitle: "开发工具 · 可视化开发环境",
                            items: [
                                ["可视化开发", "低代码/无代码"],
                                ["Agent 化开发", "自然语言编程"],
                                ["元素管理", "Skills/Functions/Models"],
                                ["应用管理", "部署/发布/监控"],
                            ],
                        },
                    ],
                },
                {
                    number: "03",
                    title: "jitNode",
                    subtitle: "运行时 · Runtime",
                    items: [
                        ["App 加载", "应用加载与初始化"],
                        ["元素加载运行", "规范化元素执行"],
                        ["容器化底座", "分布式运行时基础设施"],
                    ],
                },
            ],
        },
        comparison: {
            label: "COMPARISON",
            title: "企业级 vs 桌面级",
            subtitle:
                "为什么选择 JitAI 企业级平台而非割裂的桌面级智能体（openClaw 生态）",
            columns: ["能力维度", "JitAI 企业级平台", "桌面级智能体（openClaw 生态）"],
            rows: [
                ["资源共享", "中心化技能/功能/文件/知识/数据库", "无法共享"],
                ["协同能力", "企业范围内多 Agent 协同", "孤立运行"],
                ["统一治理", "统一的权限、审计、安全管理", "无统一治理"],
                ["传统 IT 集成", "原生支持 ERP/CRM/HIS 等系统", "集成困难"],
                ["开发规范", "统一架构规范，AI+IT 双支持", "无统一标准"],
                ["部署方式", "私有化部署，支持热更新", "依赖云端服务"],
            ],
        },
        deployment: {
            label: "DEPLOYMENT",
            title: "部署方案",
            subtitle: "灵活的私有化部署选项，满足企业不同场景需求",
            cards: [
                {
                    title: "桌面版",
                    description: "适合个人开发者、小团队快速上手",
                    icon: MonitorCog,
                    items: [
                        "Windows / macOS 原生支持",
                        "一键安装，开箱即用",
                        "本地运行，数据完全私有",
                        "支持热更新",
                    ],
                },
                {
                    title: "服务器版",
                    description: "适合企业级生产环境部署",
                    icon: Server,
                    items: [
                        "Docker / Linux 支持",
                        "高可用集群部署",
                        "多用户并发访问",
                        "企业级安全加固",
                        "支持热更新",
                    ],
                },
                {
                    title: "私有化部署",
                    description: "数据完全自主可控",
                    icon: LockKeyhole,
                    items: [
                        "100% 私有化部署",
                        "数据不出企业内网",
                        "支持自定义 LLM 接入",
                        "符合企业安全合规要求",
                    ],
                },
            ],
        },
        cta: {
            title: "开始构建您的 AI 员工",
            subtitle:
                "立即预约演示，了解 JitAI 如何为您的企业带来 2-100 倍的效率提升",
            button: "联系我们",
        },
    },
    en: {
        eyebrow: "Enterprise AI Agent Platform",
        titlePrefix: "Enterprise ",
        titleHighlight: "AI Agent",
        titleSuffix: "Platform",
        description:
            "JitAI is an enterprise-grade AI agent platform that helps organizations quickly build AI agents for core business roles, significantly improving role-level productivity and overall business operating efficiency.",
        primaryCta: "Get Started",
        secondaryCta: "View Architecture",
        stats: [
            { value: "2-100x", label: "Business efficiency improvement" },
            { value: "60+", label: "Enterprise scenarios" },
            { value: "100%", label: "Private deployment" },
            { value: "Hot update", label: "Platform and apps supported" },
        ],
        capabilities: {
            label: "CORE CAPABILITIES",
            title: "Core Capabilities",
            subtitle:
                "JitAI provides complete enterprise-grade AI agent development and governance capabilities.",
            items: [
                {
                    number: "01",
                    title: "Sharing and Collaboration",
                    description:
                        "Agents share enterprise skill libraries, function libraries, file libraries, knowledge bases, and databases under centralized management, enabling efficient resource sharing and collaboration across role-based multi-agent teams.",
                },
                {
                    number: "02",
                    title: "Skills System",
                    description:
                        "Use natural language Skills to turn business logic, rules, expert experience, and domain knowledge into machine-usable guidance for AI reasoning.",
                },
                {
                    number: "03",
                    title: "AI-Native Development",
                    description:
                        "JitIDE provides a visual and agent-oriented development environment for building and managing AI agents and IT functions in BizApps.",
                },
                {
                    number: "04",
                    title: "Unified Governance",
                    description:
                        "Unified permission, audit, and security management governs skills, functions, data, files, and knowledge across the enterprise.",
                },
                {
                    number: "05",
                    title: "Legacy IT Compatibility",
                    description:
                        "Rapidly encapsulate ERP, CRM, HIS, and other existing systems so agents can intelligently call and drive them.",
                },
                {
                    number: "06",
                    title: "Desktop Agent Collaboration",
                    description:
                        "Desktop-level agents such as jitClaw can access and operate Jit Biz Apps, connecting desktop workflows with the enterprise platform.",
                },
                {
                    number: "07",
                    title: "Cross-Platform Deployment",
                    description:
                        "Supports desktop editions for Windows and macOS, plus Docker/Linux server deployment with private installation and hot updates.",
                },
                {
                    number: "08",
                    title: "Unlimited Extension and Integration",
                    description:
                        "Extend and integrate existing toolkits, databases, IT systems, APIs, CLIs, and LLMs to build enterprise-specific capabilities quickly.",
                },
                {
                    number: "09",
                    title: "More System Capabilities",
                    description:
                        "Agents can easily integrate and orchestrate application functions, databases, file spaces, knowledge bases, and sub-agents to automate and coordinate complex business processes.",
                },
            ],
        },
        architecture: {
            label: "TECHNICAL ARCHITECTURE",
            title: "Platform Technical Architecture",
            subtitle:
                "JitAI uses a three-layer architecture: application layer, framework and tooling layer, and runtime layer.",
            layers: [
                {
                    number: "01",
                    title: "BizApp",
                    subtitle: "Application layer · user/customer applications",
                    items: [
                        ["AI Agents", "Role-based AI workers"],
                        ["IT Modules", "Traditional business systems"],
                        ["Skills", "Natural language skill instructions"],
                        ["Functions", "Callable functions"],
                        ["Models", "Data models"],
                        ["SubAgents", "Delegated agents"],
                        ["Files", "File resources"],
                    ],
                },
                {
                    parallel: [
                        {
                            number: "02",
                            title: "jitFramework",
                            subtitle: "Framework layer · supporting frameworks",
                            items: [
                                ["Agent Framework", "Agent runtime and orchestration"],
                                ["UI Framework", "Interface framework"],
                                ["ORM Framework", "Object-relational mapping"],
                                ["LLMs Framework", "Large model integration"],
                            ],
                        },
                        {
                            number: "02",
                            title: "jitIDE",
                            subtitle: "Development tool · visual development environment",
                            items: [
                                ["Visual Development", "Low-code/no-code"],
                                ["Agentic Development", "Natural language programming"],
                                ["Element Management", "Skills/Functions/Models"],
                                ["App Management", "Deployment/release/monitoring"],
                            ],
                        },
                    ],
                },
                {
                    number: "03",
                    title: "jitNode",
                    subtitle: "Runtime layer · Runtime",
                    items: [
                        ["App Loading", "Application loading and initialization"],
                        ["Element Runtime", "Standardized element execution"],
                        ["Container Base", "Distributed runtime infrastructure"],
                    ],
                },
            ],
        },
        comparison: {
            label: "COMPARISON",
            title: "Enterprise-Level vs Desktop-Level",
            subtitle:
                "Why choose the JitAI enterprise platform instead of isolated desktop-level agents.",
            columns: ["Capability", "JitAI Enterprise Platform", "Desktop-Level Agents"],
            rows: [
                ["Resource sharing", "Centralized skills/functions/files/knowledge/databases", "Cannot share"],
                ["Collaboration", "Multi-agent collaboration across the enterprise", "Runs in isolation"],
                ["Governance", "Unified permissions, audit, and security", "No unified governance"],
                ["IT integration", "Native support for ERP/CRM/HIS and other systems", "Hard to integrate"],
                ["Development standard", "Unified architecture supporting AI and IT", "No unified standard"],
                ["Deployment", "Private deployment with hot updates", "Depends on cloud services"],
            ],
        },
        deployment: {
            label: "DEPLOYMENT",
            title: "Deployment Options",
            subtitle:
                "Flexible private deployment options for different enterprise scenarios.",
            cards: [
                {
                    title: "Desktop Edition",
                    description: "For individual developers and small teams",
                    icon: MonitorCog,
                    items: [
                        "Native Windows / macOS support",
                        "One-click installation",
                        "Local runtime with private data",
                        "Hot update support",
                    ],
                },
                {
                    title: "Server Edition",
                    description: "For enterprise production deployment",
                    icon: Server,
                    items: [
                        "Docker / Linux support",
                        "High-availability cluster deployment",
                        "Multi-user concurrent access",
                        "Enterprise-grade security hardening",
                        "Hot update support",
                    ],
                },
                {
                    title: "Private Deployment",
                    description: "Full control over enterprise data",
                    icon: LockKeyhole,
                    items: [
                        "100% private deployment",
                        "Data stays inside the enterprise network",
                        "Custom LLM integration",
                        "Enterprise security and compliance ready",
                    ],
                },
            ],
        },
        cta: {
            title: "Start Building Your AI Workforce",
            subtitle:
                "Book a demo to see how JitAI can improve enterprise efficiency with AI agents.",
            button: "Contact Us",
        },
    },
};

const getArchitectureIcon = (title: string) => {
    if (title === "BizApp") return Layers3;
    if (title === "jitFramework") return GitBranch;
    if (title === "jitIDE") return Code2;
    if (title === "jitNode") return HardDrive;
    return Layers3;
};

const HomePage: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const isZh = i18n.currentLocale === "zh";
    const content = isZh ? CONTENT.zh : CONTENT.en;

    return (
        <PageLayout pageId="index" containerClassName={styles.container}>
            <section className={styles.homeHero}>
                <div className={styles.sectionContent}>
                    <div className={styles.heroLabel}>{content.eyebrow}</div>
                    <h1 className={styles.homeHeroTitle}>
                        {content.titlePrefix}
                        <span>{content.titleHighlight}</span>
                        {" "}
                        {content.titleSuffix}
                    </h1>
                    <p className={styles.homeHeroDescription}>
                        {content.description}
                    </p>
                    <div className={styles.homeHeroButtons}>
                        <a href="#contact" className={styles.homePrimaryButton}>
                            {content.primaryCta}
                            <ArrowRight size={20} />
                        </a>
                        <a href="#architecture" className={styles.homeSecondaryButton}>
                            {content.secondaryCta}
                            <ArrowRight size={20} />
                        </a>
                    </div>
                    <div className={styles.statsGrid}>
                        {content.stats.map((stat) => (
                            <div className={styles.statCard} key={stat.label}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className={styles.homeSection}>
                <div className={styles.sectionContent}>
                    <SectionHeader
                        label={content.capabilities.label}
                        title={content.capabilities.title}
                        subtitle={content.capabilities.subtitle}
                    />
                    <div className={styles.capabilityGrid}>
                        {content.capabilities.items.map((item) => (
                            <article className={styles.homeCard} key={item.title}>
                                <div className={styles.featureNumber}>
                                    {item.number}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="architecture"
                className={`${styles.homeSection} ${styles.sectionSoft}`}
            >
                <div className={styles.sectionContent}>
                    <SectionHeader
                        label={content.architecture.label}
                        title={content.architecture.title}
                        subtitle={content.architecture.subtitle}
                    />
                    <div className={styles.architectureStack}>
                        {content.architecture.layers.map((layer, index) =>
                            "parallel" in layer ? (
                                <div className={styles.architectureParallel} key={`parallel-${index}`}>
                                    {layer.parallel.map((parallelLayer) => (
                                        <ArchitectureLayer
                                            key={parallelLayer.title}
                                            layer={parallelLayer}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <ArchitectureLayer key={layer.title} layer={layer} />
                            ),
                        )}
                    </div>
                </div>
            </section>

            <section id="comparison" className={styles.homeSection}>
                <div className={styles.sectionContent}>
                    <SectionHeader
                        label={content.comparison.label}
                        title={content.comparison.title}
                        subtitle={content.comparison.subtitle}
                    />
                    <div className={styles.comparisonTable}>
                        <div className={`${styles.comparisonRow} ${styles.comparisonHead}`}>
                            {content.comparison.columns.map((column) => (
                                <div key={column}>{column}</div>
                            ))}
                        </div>
                        {content.comparison.rows.map((row) => (
                            <div className={styles.comparisonRow} key={row[0]}>
                                <div className={styles.comparisonLabel}>{row[0]}</div>
                                <div className={styles.comparisonPositive}>
                                    <Check size={18} />
                                    <span>{row[1]}</span>
                                </div>
                                <div className={styles.comparisonNegative}>
                                    <X size={18} />
                                    <span>{row[2]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="deployment" className={`${styles.homeSection} ${styles.sectionSoft}`}>
                <div className={styles.sectionContent}>
                    <SectionHeader
                        label={content.deployment.label}
                        title={content.deployment.title}
                        subtitle={content.deployment.subtitle}
                    />
                    <div className={styles.deploymentGrid}>
                        {content.deployment.cards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <article className={styles.deploymentCard} key={card.title}>
                                    <div className={styles.deploymentIcon}>
                                        <Icon size={28} />
                                    </div>
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                    <ul>
                                        {card.items.map((item) => (
                                            <li key={item}>
                                                <BadgeCheck size={18} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="contact" className={styles.ctaSection}>
                <div className={styles.sectionContent}>
                    <div className={styles.ctaPanel}>
                        <Sparkles size={28} />
                        <h2>{content.cta.title}</h2>
                        <p>{content.cta.subtitle}</p>
                        <Link
                            to={isZh ? "/zh/contact" : "/contact"}
                            className={styles.homePrimaryButton}
                        >
                            {content.cta.button}
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

interface SectionHeaderProps {
    label: string;
    title: string;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, subtitle }) => (
    <div className={styles.homeSectionHeader}>
        <div className={styles.sectionLabel}>{label}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
    </div>
);

const ArchitectureLayer: React.FC<{
    layer: {
        number: string;
        title: string;
        subtitle: string;
        items: string[][];
    };
}> = ({ layer }) => {
    const Icon = getArchitectureIcon(layer.title);

    return (
        <article className={styles.architectureLayer}>
            <div className={styles.layerHeader}>
                <div className={styles.layerNumber}>{layer.number}</div>
                <Icon className={styles.layerIcon} size={24} />
                <div>
                    <h3>{layer.title}</h3>
                    <p>{layer.subtitle}</p>
                </div>
            </div>
            <ArchitectureItems items={layer.items} />
        </article>
    );
};

const ArchitectureItems: React.FC<{ items: string[][] }> = ({ items }) => (
    <div className={styles.architectureItems}>
        {items.map(([name, desc]) => (
            <div className={styles.architectureItem} key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
            </div>
        ))}
    </div>
);

export default HomePage;
