import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OfficialHeader from "@site/src/components/OfficialHeader";
import styles from "./index.module.css";
import { BRAND_COPY } from "../brand";

const COPYRIGHT_YEAR = new Date().getFullYear();

const getDownloadUrl = (locale: string) =>
    locale === "zh" ? "/zh/download" : "/download";

const getCapabilityUrl = (locale: string, slug: string) =>
    locale === "zh" ? `/zh/capabilities/${slug}` : `/capabilities/${slug}`;

const getFooterNavItems = (locale: string) =>
    locale === "zh"
        ? [
              { label: "首页", href: "#" },
              { label: "能力", href: "#capabilities" },
              { label: "优势", href: "#delivery" },
              { label: "价值", href: "#value" },
              { label: "联系我们", href: "/zh/contact" },
          ]
        : [
              { label: "Home", href: "#" },
              { label: "Capabilities", href: "#capabilities" },
              { label: "Advantages", href: "#delivery" },
              { label: "Value", href: "#value" },
              { label: "Contact", href: "/contact" },
          ];

const HERO_TAGS = [
    "接入真实业务",
    "对话式 AI 开发",
    "全要素自定义",
    "主动式企业管家",
    "企业级协同",
    "私有化部署",
    "双模一体",
    "开发运行一体化",
];

const CAPABILITIES = [
    {
        slug: "agent-business",
        title: "接入真实业务的智能体框架",
        desc: "无限接入业务系统与数据要素，实现从感知、决策到执行的全链路贯通，让 AI 智能体真正执行业务。",
    },
    {
        slug: "conversational-dev",
        title: "无门槛对话式 AI 开发",
        desc: "内置专用开发智能体，业务人员通过自然语言对话即可快速完成业务 AI 化改造、应用开发与迭代。",
    },
    {
        slug: "full-customization",
        title: "全要素灵活自定义",
        desc: "LLM 模型、技能插件、函数、数据模型、UI 组件等 30+ 类业务要素，全部支持自主配置与开发。",
    },
    {
        slug: "enterprise-architecture",
        title: "企业级协同架构",
        desc: "BS 云架构设计，支持多角色权限管控、多人实时协作与组织架构映射，适配规模化办公场景。",
    },
    {
        slug: "private-deployment",
        title: "私有化安全部署",
        desc: "数据、模型与业务资产 100% 留存企业内部，物理隔离杜绝外泄，满足金融、政务等合规要求。",
    },
    {
        slug: "devops-unified",
        title: "开发运行一体化",
        desc: "开发-测试-运行无缝衔接与实时同步，无需复杂部署流程，分钟级完成业务落地与迭代。",
    },
    {
        slug: "active-hub",
        title: "主动式企业管家",
        desc: "内置主动型智能体，主动感知系统事件与状态，自动推理对策并采取措施，实现业务流程的自动化与智能化闭环。",
    },
    {
        slug: "dual-mode",
        title: "双模同源一体",
        desc: "AI 智能体与传统业务系统原生统一，共享同一套函数、数据模型和数据库，实现新旧技术体系无缝融合。",
    },
];

const DELIVERY_CARDS = [
    {
        title: "人工投入度：极致精简",
        desc: "告别传统开发的人力密集模式，全流程自动化生成，仅需少量人工干预即可完成生产级系统构建，人力成本降低 90% 以上。",
    },
    {
        title: "交付时长：小时级上线",
        desc: "从需求输入到系统上线仅需小时级周期，对比传统开发模式效率提升 95% 以上，极速响应市场变化与业务迭代需求。",
    },
    {
        title: "Tokens 消耗量：成本最优",
        desc: "JitAI 的 SDD 规范和开发框架大幅降低应用的代码量，从而极大降低生成应用所需 tokens。",
    },
];

const SDD_FEATURES = [
    {
        title: "元素化技术系统模型",
        desc: "将企业业务系统抽象为标准化的技术元素（数据模型、业务函数、UI 组件、API 接口等），为 AI 生成提供结构化、可组合的开发范式，确保生成结果架构清晰、逻辑一致。",
    },
    {
        title: "Agentic 商业系统模型",
        desc: "将企业商业逻辑建模为智能体可理解、可执行的业务流程框架，让 AI 生成的系统天然贴合企业业务运作方式，而非泛泛的通用模板。",
    },
];

const VALUE_SECTIONS = [
    {
        eyebrow: "价值一",
        title: "专属业务智能体工作流",
        subtitle: "低成本、高效率打造企业自己的 Agentic 工作流",
        dark: true,
        visual: "workflow",
        points: [
            {
                title: "7×24 小时数字员工",
                desc: "让 AI 不知疲倦地深度参与核心业务流程，执行重复性、规则性任务，确保业务运转的连续性与高效性。",
            },
            {
                title: "重塑业务协作模式",
                desc: "打破部门墙与信息孤岛，实现跨系统、跨岗位的自动化协同与决策，优化甚至颠覆传统业务流程。",
            },
            {
                title: "直接驱动业务增长",
                desc: "提升客户转化率、降低运营成本、缩短服务响应时间——不是辅助工具，是直接创造业务价值的 AI Worker。",
            },
        ],
    },
    {
        eyebrow: "价值二",
        title: "一个平台，替代 N 套系统",
        subtitle: "告别碎片化，实现一体化智能基座",
        dark: false,
        visual: "platform",
        reverse: true,
        points: [
            {
                title: "统一技术底座",
                desc: "一站式承载业务开发、智能体定制、自动化编排和 AI 员工落地，打破数据孤岛，消除重复建设。",
            },
            {
                title: "全链路降本提效",
                desc: "直接削减多系统采购与维护成本，统一交互体验降低学习成本，消除信息壁垒减少管理内耗。",
            },
            {
                title: "可持续演进",
                desc: "不再被各厂商版本升级牵着走。统一底座让企业按自己的节奏渐进式智能化升级，而非推倒重来。",
            },
        ],
    },
    {
        eyebrow: "价值三",
        title: "自主可控的 AI 生产力",
        subtitle: "拒绝技术锁定，构建属于企业自己的 AI 核心能力",
        dark: true,
        visual: "private",
        points: [
            {
                title: "独立技术底座",
                desc: "摆脱外部厂商依赖与黑盒限制。核心代码、数据、模型全部自主掌控，按自己的业务节奏持续演进。",
            },
            {
                title: "全栈能力内化",
                desc: "深度掌握业务规则、逻辑和代码，可自主优化升级。不依赖厂商排期，想改就改。",
            },
            {
                title: "沉淀组织资产",
                desc: "打造私有化的 AI Worker 矩阵，每一个智能体都是可复用、可传承的企业核心资产。",
            },
        ],
    },
];

const handleTopLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const HomePage: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const brand = BRAND_COPY[i18n.currentLocale.startsWith("zh") ? "zh" : "en"];

    return (
        <>
            <Head
                title={brand.title}
                titleTemplate="%s"
            >
                <meta
                    name="description"
                    content={brand.description}
                />
                <meta name="twitter:title" content={brand.title} />
                <meta name="twitter:description" content={brand.description} />
                <meta
                    name="keywords"
                    content="JitAI,企业智能体,AI平台,智能体开发,私有化部署,Agentic Company,企业AI"
                />
                <meta
                    property="og:title"
                    content={brand.title}
                />
                <meta
                    property="og:description"
                    content={brand.description}
                />
            </Head>
            <div className={`${styles.homePage} custom-page`}>
                <OfficialHeader />
                <main className={styles.main}>
                    <HeroSection />
                    <CapabilitiesSection />
                    <DeliverySection />
                    <ValueSection />
                    <ContactSection />
                </main>
                <HomeFooter />
            </div>
        </>
    );
};

const HeroSection: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const isZh = i18n.currentLocale.startsWith("zh");
    const brand = BRAND_COPY[isZh ? "zh" : "en"];
    const separator = isZh ? "，" : ", ";
    const titleParts = brand.description.split(separator);

    return (
        <section className={`${styles.section} ${styles.hero}`}>
            <div className={styles.heroGlow} aria-hidden="true">
                <div className={styles.glowLarge} />
                <div className={styles.glowSmall} />
            </div>
            <div className={styles.shell}>
                <div className={styles.heroContent}>
                    <h1 className={isZh ? styles.heroTitleZh : undefined}>
                        {titleParts.map((part, index) => (
                            <span key={part} className={index === 0 ? styles.heroBrand : undefined}>
                                {part}{index < titleParts.length - 1 ? separator : ""}
                            </span>
                        ))}
                    </h1>
                    <div className={styles.tagList}>
                        {HERO_TAGS.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div className={styles.heroActions}>
                        <DownloadButton size="md" />
                    </div>
                </div>
            </div>
            <div className={styles.scrollCue} aria-hidden="true">
                <ArrowDownIcon />
            </div>
        </section>
    );
};

const CapabilitiesSection: React.FC = () => {
    const { i18n } = useDocusaurusContext();

    return (
        <section
            id="capabilities"
            className={`${styles.section} ${styles.darkSection}`}
        >
            <div className={styles.shell}>
                <SectionHeader
                    eyebrow="核心能力"
                    title={
                        <>
                            一个平台搞定全业务要素的
                            <br />
                            <span>AI 化改造、接入与运行</span>
                        </>
                    }
                    desc="从对话式开发、到自动部署、到最终运行，JitAI 覆盖业务 AI 化改造到 AI 智能体真实驱动业务的全链路。"
                />
                <div className={styles.capabilityGrid}>
                    {CAPABILITIES.map((item) => (
                        <Link
                            className={styles.capabilityCard}
                            id={`capability-${item.slug}`}
                            key={item.slug}
                            to={getCapabilityUrl(i18n.currentLocale, item.slug)}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <span className={styles.capabilityMore}>
                                了解更多 →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DeliverySection: React.FC = () => (
    <section
        id="delivery"
        className={`${styles.section} ${styles.subtleSection}`}
    >
        <div className={styles.shell}>
            <SectionHeader
                eyebrow="效果优势"
                title="全球领先的 AI 化交付能力"
                desc="基于自研 SDD 规范化开发体系，以最优化成本，生成真正生产级可用的智能体业务系统。"
                accentOpacity="strong"
            />
            <div className={styles.deliveryCards}>
                {DELIVERY_CARDS.map((card) => (
                    <article className={styles.deliveryCard} key={card.title}>
                        <span />
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </article>
                ))}
            </div>
            <p className={styles.deliveryLine}>
                全场景系统一站式生成：营销智能体 · 销售智能体 · 审计智能体 · 财务智能体 · 业务管理系统 · CRM/ERP 核心 · 协同办公 OA ......
            </p>
            <div className={styles.sddPanel}>
                <span>底层引擎</span>
                <h3>JitAI 自研 SDD 规范化开发体系</h3>
                <p>
                    基于独创的元素化技术系统模型和 agentic
                    商业系统模型，为 LLM 生成业务应用建立标准化约束与统一架构范式。这一体系从根本上消除了
                    AI 生成系统的无序性与不可控性，确保每一次生成都是可预期、可维护的生产级代码。
                </p>
                <div className={styles.sddGrid}>
                    {SDD_FEATURES.map((feature) => (
                        <article key={feature.title}>
                            <h4>{feature.title}</h4>
                            <p>{feature.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const ValueSection: React.FC = () => (
    <section id="value">
        {VALUE_SECTIONS.map((section) => (
            <ValuePanel key={section.title} section={section} />
        ))}
    </section>
);

const ValuePanel: React.FC<{
    section: (typeof VALUE_SECTIONS)[number];
}> = ({ section }) => {
    const copy = <ValueCopy section={section} />;
    const visual = <ValueVisual type={section.visual} />;

    return (
        <section
            className={`${styles.section} ${styles.valuePanel} ${
                section.dark ? styles.darkSection : styles.subtleSection
            }`}
        >
            <div className={styles.shell}>
                <div
                    className={`${styles.valueGrid} ${
                        section.reverse ? styles.valueGridReverse : ""
                    }`}
                >
                    {section.reverse ? (
                        <>
                            {visual}
                            {copy}
                        </>
                    ) : (
                        <>
                            {copy}
                            {visual}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

const ValueCopy: React.FC<{
    section: (typeof VALUE_SECTIONS)[number];
}> = ({ section }) => (
    <div className={styles.valueCopy}>
        <span className={styles.valueEyebrow}>{section.eyebrow}</span>
        <h2>{section.title}</h2>
        <p className={styles.valueSubtitle}>{section.subtitle}</p>
        <div className={styles.valuePoints}>
            {section.points.map((point, index) => (
                <div className={styles.valuePoint} key={point.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                        <h3>{point.title}</h3>
                        <p>{point.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ValueVisual: React.FC<{ type: string }> = ({ type }) => {
    if (type === "platform") {
        return (
            <div className={styles.valueVisual}>
                <div className={styles.visualCard}>
                    <div className={styles.systemTags}>
                        {["CRM", "ERP", "OA", "BI", "AI"].map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                    <strong className={styles.visualArrow}>→</strong>
                    <div className={styles.visualLogo}>JitAI</div>
                    <p>
                        多系统堆砌
                        <br />→ 一体化基座
                    </p>
                </div>
            </div>
        );
    }

    if (type === "private") {
        return (
            <div className={styles.valueVisual}>
                <div className={styles.visualCard}>
                    <strong className={styles.lockMark}>🔒</strong>
                    <h3>完全私有化</h3>
                    <p>
                        数据不出域
                        <br />
                        资产不外流
                        <br />
                        能力不锁定
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.valueVisual}>
            <div className={styles.visualCard}>
                <strong className={styles.aiMark}>AI</strong>
                <h3>Agentic Workflow</h3>
                <p>
                    从流程自动化
                    <br />
                    到价值创造
                </p>
            </div>
        </div>
    );
};

const ContactSection: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const brand = BRAND_COPY[i18n.currentLocale.startsWith("zh") ? "zh" : "en"];

    return (
        <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
            <div className={styles.shell}>
                <div className={styles.contactBlock}>
                    <h2>准备好构建属于你的 AI 数字员工了吗？</h2>
                    <p>
                        预约专属演示，了解 JitAI 如何帮助企业落地 AI，转型为智能驱动型组织。
                    </p>
                    <DownloadButton size="lg" />
                    <strong>{brand.title}</strong>
                </div>
            </div>
        </section>
    );
};

const HomeFooter: React.FC = () => {
    const { i18n } = useDocusaurusContext();
    const navItems = getFooterNavItems(i18n.currentLocale);
    const brand = BRAND_COPY[i18n.currentLocale.startsWith("zh") ? "zh" : "en"];

    return (
        <footer className={styles.footer}>
            <div className={styles.shell}>
                <div className={styles.footerTop}>
                    <div className={styles.footerBrand}>
                        <span>{brand.description}</span>
                    </div>
                    <nav className={styles.footerLinks}>
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={
                                    item.href === "#" ? handleTopLink : undefined
                                }
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className={styles.footerBottom}>
                    <span>© {COPYRIGHT_YEAR} JitAI. All rights reserved.</span>
                    <a
                        className={styles.footerIcp}
                        href="https://beian.miit.gov.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        鄂ICP备18017077号-7
                    </a>
                </div>
            </div>
        </footer>
    );
};

const DownloadButton: React.FC<{ size: "md" | "lg" }> = ({ size }) => {
    const { i18n } = useDocusaurusContext();

    return (
        <Link
            to={getDownloadUrl(i18n.currentLocale)}
            className={`${styles.downloadButton} ${
                size === "lg" ? styles.downloadButtonLarge : ""
            }`}
        >
            下载 JitAI 平台
            <ArrowRightIcon />
        </Link>
    );
};

const SectionHeader: React.FC<{
    eyebrow: string;
    title: React.ReactNode;
    desc: string;
    accentOpacity?: "soft" | "strong";
}> = ({ eyebrow, title, desc, accentOpacity = "soft" }) => (
    <div className={styles.sectionHeader}>
        <span
            className={`${styles.sectionEyebrow} ${
                accentOpacity === "strong" ? styles.sectionEyebrowStrong : ""
            }`}
        >
            {eyebrow}
        </span>
        <h2>{title}</h2>
        <p>{desc}</p>
    </div>
);

const ArrowRightIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
);

const ArrowDownIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
);

export default HomePage;
