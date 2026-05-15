import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PageLayout from "@site/src/components/PageLayout";
import styles from "@site/src/pages/agent-pages.module.css";
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Check,
    CircleDollarSign,
    Database,
    Headphones,
    Search,
    Users,
} from "lucide-react";

type Product = {
    id: string;
    title: string;
    description: string;
    efficiency: string;
    features: string[];
    image: string;
    imageAlt: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type PageCopy = {
    eyebrow: string;
    title: string;
    description: string;
    products: Product[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
};

const pageCopy: Record<"zh" | "en", PageCopy> = {
    zh: {
        eyebrow: "Agent Products",
        title: "专业 Agent 产品",
        description:
            "针对特定岗位打造的专属 AI 员工，大幅提升业务处理效率。同时，既是针对特定场景的专业 AI 智能体产品，开箱即用，也支持企业根据自身情况调整定制。",
        ctaTitle: "需要定制化智能体？",
        ctaDescription:
            "基于 JitAI 平台，我们可以为您的特定业务场景定制专属 AI 智能体。",
        ctaButton: "联系我们的团队",
        products: [
            {
                id: "sales",
                title: "销售智能体",
                efficiency: "销售效率提升 3-5 倍",
                description:
                    "自动跟进销售线索，智能推荐产品，生成报价方案，跟踪客户状态。赋能销售团队，提升销售转化率和客户满意度。",
                features: [
                    "客户画像分析与智能推荐",
                    "销售线索自动评分与优先级排序",
                    "自动化跟进提醒与话术建议",
                    "销售数据实时分析与预测",
                    "CRM 系统智能集成",
                    "合同生成与审批流程自动化",
                ],
                image: "img/agent-products/sales-agent-v3.jpg",
                imageAlt: "销售智能体界面",
                Icon: CircleDollarSign,
            },
            {
                id: "finance",
                title: "财务智能体",
                efficiency: "财务处理效率提升 10-50 倍",
                description:
                    "自动处理发票识别、费用报销、账务核对、报表生成。让财务工作更高效准确，释放财务人员精力专注于高价值工作。",
                features: [
                    "智能发票识别与录入",
                    "自动对账与差异分析",
                    "财务报表自动生成",
                    "税务合规检查与申报辅助",
                    "预算执行监控与预警",
                    "成本分析与优化建议",
                    "与 ERP 系统无缝集成",
                ],
                image: "img/agent-products/finance-agent-v3.jpg",
                imageAlt: "财务智能体界面",
                Icon: BarChart3,
            },
            {
                id: "hr",
                title: "人事智能体",
                efficiency: "HR 工作效率提升 5-10 倍",
                description:
                    "简历筛选、面试安排、候选人沟通、入职办理、员工服务全流程自动化。提升 HR 工作效率，优化员工体验。",
                features: [
                    "智能简历筛选与匹配",
                    "面试安排与自动通知",
                    "员工入职流程自动化",
                    "考勤管理与异常检测",
                    "绩效评估辅助",
                    "员工问答与政策咨询",
                    "培训推荐与学习跟踪",
                ],
                image: "img/agent-products/hr-agent-v3.jpg",
                imageAlt: "人事智能体界面",
                Icon: Users,
            },
            {
                id: "data",
                title: "数据分析智能体",
                efficiency: "数据分析效率提升 10-100 倍",
                description:
                    "自动连接数据源，生成分析报表，发现业务洞察。支持自然语言查询，让每个人都能成为数据分析师。",
                features: [
                    "自然语言查询数据",
                    "自动数据清洗与预处理",
                    "智能图表推荐与生成",
                    "趋势分析与异常检测",
                    "多维度数据透视",
                    "自动化报告生成",
                    "数据预测与模拟",
                ],
                image: "img/agent-products/data-agent-v3.jpg",
                imageAlt: "数据分析智能体界面",
                Icon: Search,
            },
            {
                id: "knowledge",
                title: "知识共享智能体",
                efficiency: "知识获取效率提升 2-5 倍",
                description:
                    "智能分类、标签化、检索企业文档，自动生成摘要。构建企业知识库，让知识流动起来，提升组织学习能力。",
                features: [
                    "企业知识库统一管理",
                    "智能语义搜索",
                    "文档自动分类与标签",
                    "专家经验沉淀与复用",
                    "智能问答与推荐",
                    "知识图谱构建",
                    "学习路径推荐",
                ],
                image: "img/agent-products/knowledge-agent-v3.jpg",
                imageAlt: "知识共享智能体界面",
                Icon: Database,
            },
            {
                id: "service",
                title: "智能客服",
                efficiency: "客服响应效率提升 5-20 倍",
                description:
                    "7×24 小时自动响应客户咨询，支持多渠道接入。智能识别意图，准确率 95%+，大幅降低人工客服成本。",
                features: [
                    "多轮对话理解",
                    "常见问题自动解答",
                    "工单自动创建与分配",
                    "客户情绪识别",
                    "智能转人工策略",
                    "多渠道接入（网页/微信/APP）",
                    "客服质量分析与优化",
                ],
                image: "img/agent-products/service-agent-v3.jpg",
                imageAlt: "智能客服界面",
                Icon: Headphones,
            },
        ],
    },
    en: {
        eyebrow: "Agent Products",
        title: "Professional Agent Products",
        description:
            "Role-specific AI employees built for business positions, dramatically improving process efficiency. These ready-to-use professional AI agents also support enterprise-specific customization.",
        ctaTitle: "Need a custom agent?",
        ctaDescription:
            "Based on the JitAI platform, we can customize dedicated AI agents for your specific business scenarios.",
        ctaButton: "Contact our team",
        products: [
            {
                id: "sales",
                title: "Sales Agent",
                efficiency: "Sales efficiency improved 3-5x",
                description:
                    "Automatically follows up on sales leads, recommends products, generates quotations, and tracks customer status to improve conversion and customer satisfaction.",
                features: [
                    "Customer profile analysis and intelligent recommendations",
                    "Automated lead scoring and priority ranking",
                    "Follow-up reminders and sales script suggestions",
                    "Real-time sales data analysis and forecasting",
                    "Smart CRM system integration",
                    "Automated contract generation and approval workflows",
                ],
                image: "img/agent-products/sales-agent-v3.jpg",
                imageAlt: "Sales agent interface",
                Icon: CircleDollarSign,
            },
            {
                id: "finance",
                title: "Finance Agent",
                efficiency: "Finance processing efficiency improved 10-50x",
                description:
                    "Automates invoice recognition, expense reimbursement, reconciliation, and report generation so finance teams can focus on higher-value work.",
                features: [
                    "Smart invoice recognition and entry",
                    "Automated reconciliation and variance analysis",
                    "Automatic financial report generation",
                    "Tax compliance checks and filing assistance",
                    "Budget execution monitoring and alerts",
                    "Cost analysis and optimization suggestions",
                    "Seamless ERP system integration",
                ],
                image: "img/agent-products/finance-agent-v3.jpg",
                imageAlt: "Finance agent interface",
                Icon: BarChart3,
            },
            {
                id: "hr",
                title: "HR Agent",
                efficiency: "HR efficiency improved 5-10x",
                description:
                    "Automates resume screening, interview scheduling, candidate communication, onboarding, and employee services to improve HR efficiency and employee experience.",
                features: [
                    "Smart resume screening and matching",
                    "Interview scheduling and automatic notifications",
                    "Automated employee onboarding workflows",
                    "Attendance management and anomaly detection",
                    "Performance review assistance",
                    "Employee Q&A and policy consultation",
                    "Training recommendations and learning tracking",
                ],
                image: "img/agent-products/hr-agent-v3.jpg",
                imageAlt: "HR agent interface",
                Icon: Users,
            },
            {
                id: "data",
                title: "Data Analytics Agent",
                efficiency: "Data analysis efficiency improved 10-100x",
                description:
                    "Connects data sources, generates analytical reports, and uncovers business insights. Natural-language queries help everyone work like a data analyst.",
                features: [
                    "Natural-language data queries",
                    "Automated data cleaning and preprocessing",
                    "Smart chart recommendations and generation",
                    "Trend analysis and anomaly detection",
                    "Multidimensional data pivoting",
                    "Automated report generation",
                    "Data forecasting and simulation",
                ],
                image: "img/agent-products/data-agent-v3.jpg",
                imageAlt: "Data analytics agent interface",
                Icon: Search,
            },
            {
                id: "knowledge",
                title: "Knowledge Sharing Agent",
                efficiency: "Knowledge access efficiency improved 2-5x",
                description:
                    "Classifies, tags, and retrieves enterprise documents, then generates summaries to build a reusable knowledge base and improve organizational learning.",
                features: [
                    "Unified enterprise knowledge management",
                    "Smart semantic search",
                    "Automatic document classification and tagging",
                    "Expertise capture and reuse",
                    "Intelligent Q&A and recommendations",
                    "Knowledge graph construction",
                    "Learning path recommendations",
                ],
                image: "img/agent-products/knowledge-agent-v3.jpg",
                imageAlt: "Knowledge sharing agent interface",
                Icon: Database,
            },
            {
                id: "service",
                title: "Intelligent Customer Service",
                efficiency: "Customer service response efficiency improved 5-20x",
                description:
                    "Provides 24/7 automated customer responses across channels, recognizes intent with 95%+ accuracy, and significantly reduces support costs.",
                features: [
                    "Multi-turn conversation understanding",
                    "Automated answers to common questions",
                    "Automatic ticket creation and assignment",
                    "Customer sentiment recognition",
                    "Smart human handoff strategy",
                    "Multi-channel access for web, WeChat, and apps",
                    "Service quality analysis and optimization",
                ],
                image: "img/agent-products/service-agent-v3.jpg",
                imageAlt: "Intelligent customer service interface",
                Icon: Headphones,
            },
        ],
    },
};

const AgentProductsPage: React.FC = () => {
    const { i18n, siteConfig } = useDocusaurusContext();
    const copy = i18n.currentLocale === "zh" ? pageCopy.zh : pageCopy.en;
    const imageBaseUrl = siteConfig.baseUrl.endsWith("/")
        ? siteConfig.baseUrl
        : `${siteConfig.baseUrl}/`;
    const getImageUrl = (image: string) =>
        `${imageBaseUrl}${image.replace(/^\//, "")}`;

    return (
        <PageLayout pageId="agent-products" containerClassName={styles.page}>
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
                    <div className={styles.productList}>
                        {copy.products.map((product, index) => {
                            const Icon = product.Icon;
                            return (
                                <article
                                    className={`${styles.productCard} ${
                                        index % 2 ? styles.productCardAlt : ""
                                    }`}
                                    id={product.id}
                                    key={product.id}
                                >
                                    <div className={styles.productVisual}>
                                        <img
                                            alt={product.imageAlt}
                                            className={styles.productImage}
                                            loading={index === 0 ? "eager" : "lazy"}
                                            src={getImageUrl(product.image)}
                                        />
                                        <div className={styles.efficiencyBadge}>
                                            <BadgeCheck size={18} />
                                            {product.efficiency}
                                        </div>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.iconBox}>
                                            <Icon />
                                        </div>
                                        <h2 className={styles.cardTitle}>
                                            {product.title}
                                        </h2>
                                        <p className={styles.cardDescription}>
                                            {product.description}
                                        </p>
                                        <ul className={styles.featureList}>
                                            {product.features.map((feature) => (
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
                                </article>
                            );
                        })}
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

export default AgentProductsPage;
