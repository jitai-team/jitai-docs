import React, { useMemo, useState } from "react";
import PageLayout from "@site/src/components/PageLayout";
import styles from "@site/src/pages/ai-solution.module.css";
import {
    AlertTriangle,
    ArrowRight,
    Building2,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    CloudOff,
    Code,
    Code2,
    Container,
    Cpu,
    Database,
    FileCheck,
    GitBranch,
    Layers,
    Layout,
    Lock,
    Network,
    Server,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

type LucideIcon = (props: any) => any;

type UseCase = {
    title: string;
    accent: "brand" | "teal" | "purple" | "orange" | "indigo" | "pink";
    tags: string[];
    description: string;
    specs: string;
    specsIcon: LucideIcon;
};

const AiSolutionPage = () => {
    const useCases = useMemo<UseCase[]>(
        () => [
            {
                title: "Intelligent Approvals",
                accent: "brand",
                tags: ["Workflow"],
                description:
                    "Build approval flows and business processes as structured workflows.",
                specs: "Powered by JitWorkflow (process & approval engine) + JitTask (async & distributed tasks)",
                specsIcon: Code2,
            },
            {
                title: "Legacy Integration",
                accent: "teal",
                tags: ["ORM", "API"],
                description:
                    "Integrate SQL/ERP and third-party systems through structured service and data-access layers.",
                specs: "JitService (API & external integrations) + JitORM (data models & queries).",
                specsIcon: Database,
            },
            {
                title: "Dynamic UI Gen",
                accent: "purple",
                tags: ["UI", "RBAC"],
                description:
                    "Build UI with a structured front-end framework, and define per-Type viewers/editors.",
                specs: "The JAAP structure defines the UI. Modify the Type definition, and the interface updates instantly across all user instances without frontend redeployment.",
                specsIcon: Layout,
            },
            {
                title: "Governance & Traceability",
                accent: "orange",
                tags: ["Governance"],
                description:
                    "Treat applications as structured, versioned, and traceable artifacts.",
                specs: "Multi-environment & multi-version isolation + structure-level upgrade/rollback.",
                specsIcon: FileCheck,
            },
            {
                title: "Scalable Ops",
                accent: "indigo",
                tags: ["Ops"],
                description:
                    "Run JAAP apps on a micro-kernel runtime with built-in scalability.",
                specs: "Micro-kernel runtime + containerized app management + cluster & scale governance.",
                specsIcon: Server,
            },
            {
                title: "Multi-Tenant SaaS",
                accent: "pink",
                tags: ["SaaS"],
                description: "Inherit core app, customize per client.",
                specs: "Leverages App Inheritance. Update the Core App, and all child instances inherit the fix while preserving local customizations stored as delta overlays.",
                specsIcon: GitBranch,
            },
        ],
        []
    );

    const trustItems = useMemo(
        () => [
            { label: "99.9% SLA", Icon: ShieldCheck },
            { label: "Docker", Icon: Container },
            { label: "On-Premise", Icon: Server },
            { label: "Git Ops", Icon: GitBranch },
            { label: "RBAC", Icon: Lock },
        ],
        []
    );

    const [openUseCaseIndex, setOpenUseCaseIndex] = useState<number | null>(
        null
    );

    return (
        <PageLayout
            pageId="ai-solution"
            containerClassName={styles.container}
            hideLanguageSwitcher
        >
            <section className={styles.hero}>
                <div className={styles.heroBackground} />
                <div className={styles.sectionInner}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroLeft}>
                            <div className={styles.heroBadge}>
                                <span className={styles.badgeDot} />
                                Production-Grade AI Application Development
                            </div>
                            <h1 className={styles.heroTitle}>
                                Build{" "}
                                <span className={styles.heroTitleHighlight}>
                                    Complex AI Solutions
                                </span>{" "}
                                with Structural Certainty
                            </h1>
                            <p className={styles.heroDescription}>
                                Stop fighting brittle scripts. JitAI uses the{" "}
                                <strong>JAAP protocol</strong> to make
                                application structure explicit,
                                machine-readable, and production-ready.
                            </p>
                            <div className={styles.heroCtas}>
                                <a
                                    className={styles.primaryButton}
                                    href="https://jit.pro/download"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Try JitAI Free
                                </a>
                                <a
                                    className={styles.secondaryButton}
                                    href="https://jit.pro/docs/devguide"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Architecture Docs
                                </a>
                            </div>
                            <div className={styles.heroNote}>
                                Trusted by Engineering Teams at Mid-to-Large
                                Enterprises
                            </div>
                        </div>

                        <div className={styles.heroRight}>
                            <div className={styles.screenshotCard}>
                                <div className={styles.windowChrome}>
                                    <div className={styles.windowDots}>
                                        <span className={styles.windowDotRed} />
                                        <span
                                            className={styles.windowDotYellow}
                                        />
                                        <span
                                            className={styles.windowDotGreen}
                                        />
                                    </div>
                                    <div className={styles.windowTitle}>
                                        JitAI
                                    </div>
                                </div>
                                <div className={styles.screenshotBody}>
                                    <img
                                        className={styles.screenshotImage}
                                        src="https://jit.pro/assets/images/assistant-add-node-edge-6348c84f00906878f5d3824e0e1c49a3.gif"
                                        alt="JitAI Application Structure Workspace"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className={styles.screenshotGlow} />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.trustBar}>
                <div className={styles.sectionInner}>
                    <p className={styles.trustTitle}>
                        Enterprise-Grade Capabilities Built-in
                    </p>
                    <div className={styles.trustItems}>
                        {trustItems.map(
                            ({
                                label,
                                Icon,
                            }: {
                                label: string;
                                Icon: LucideIcon;
                            }) => (
                                <div key={label} className={styles.trustItem}>
                                    <Icon className={styles.trustIcon} />
                                    <span>{label}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            <section id="problem" className={styles.sectionLight}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div className={styles.problemLeft}>
                            <h2 className={styles.sectionHeading}>
                                The structural gap in modern AI stacks
                            </h2>
                            <p className={styles.sectionLead}>
                                The problem isn't the model. It's the{" "}
                                <strong>structural blindness</strong> of your
                                application code.
                            </p>
                            <p className={styles.sectionText}>
                                Traditional development creates opaque "glue
                                code" that AI cannot reason about, leading to
                                maintenance nightmares and compliance failures.
                            </p>
                        </div>
                        <div className={styles.problemRight}>
                            <div className={styles.painCard}>
                                <div className={styles.painIcon}>
                                    <CloudOff className={styles.painIconSvg} />
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>
                                        Semantic Collapse
                                    </h3>
                                    <p className={styles.cardText}>
                                        AI models lose context when business
                                        logic is buried in thousands of lines of
                                        glue code, increasing hallucination
                                        rates.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.painCard}>
                                <div className={styles.painIcon}>
                                    <AlertTriangle
                                        className={styles.painIconSvg}
                                    />
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>
                                        Governance Nightmare
                                    </h3>
                                    <p className={styles.cardText}>
                                        "AI Wrappers" and scripts are nearly
                                        impossible to version, audit, or
                                        rollback in a regulated enterprise
                                        environment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="solution" className={styles.sectionWhite}>
                <div className={styles.sectionInner}>
                    <div className={styles.sectionHeaderCentered}>
                        <span className={styles.sectionEyebrow}>
                            Our Solution
                        </span>
                        <h2 className={styles.sectionTitle}>
                            Structural Certainty.
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Decouple structure from implementation. Make apps
                            readable by Humans and AI.
                        </p>
                    </div>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Network className={styles.featureIconSvg} />
                            </div>
                            <h3 className={styles.featureTitle}>
                                Structure First
                            </h3>
                            <p className={styles.featureText}>
                                Built on the <strong>JAAP Protocol</strong>. The
                                app structure is explicit and
                                machine-readable—the "ground truth" for AI
                                agents.
                            </p>
                            <div className={styles.featureResult}>
                                <div className={styles.featureResultLabel}>
                                    Result
                                </div>
                                <div className={styles.featureResultValue}>
                                    AI understands context natively.
                                </div>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Layers className={styles.featureIconSvg} />
                            </div>
                            <h3 className={styles.featureTitle}>MTI Model</h3>
                            <p className={styles.featureText}>
                                <strong>Meta / Type / Instance</strong>. Define
                                reusable Element Types that prevent logic drift.
                                Edit via visual builder, code, or AI.
                            </p>
                            <div className={styles.featureResult}>
                                <div className={styles.featureResultLabel}>
                                    Result
                                </div>
                                <div className={styles.featureResultValue}>
                                    10x reuse rate across teams.
                                </div>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Cpu className={styles.featureIconSvg} />
                            </div>
                            <h3 className={styles.featureTitle}>
                                Production Governance
                            </h3>
                            <p className={styles.featureText}>
                                Interpreted Runtime allows hot-swapping logic.
                                Built-in versioning, isolation, and rollback for
                                critical paths.
                            </p>
                            <div className={styles.featureResult}>
                                <div className={styles.featureResultLabel}>
                                    Result
                                </div>
                                <div className={styles.featureResultValue}>
                                    Safe deployment on Fridays.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionLightBordered}>
                <div className={styles.sectionInner}>
                    <div className={styles.splitGrid}>
                        <div className={styles.splitMedia}>
                            <div className={styles.mediaFrame}>
                                <img
                                    className={styles.mediaImage}
                                    src="https://jit.pro/assets/images/source-code-3e0dbb5c7119470fd38bc895b7c45928.png"
                                    alt="JitAI Architecture"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className={styles.splitText}>
                            <h2 className={styles.sectionHeading}>
                                Visual Modeling with Full-Code Power
                            </h2>
                            <p className={styles.sectionLead}>
                                Don't choose between speed and control. JitAI
                                provides a visual Application Structure
                                Workspace (ASW) for high-level design, while
                                preserving full access to the underlying native
                                code.
                            </p>
                            <ul className={styles.checkList}>
                                <li className={styles.checkItem}>
                                    <Check className={styles.checkIcon} />
                                    <span>
                                        <strong>Visual Structure:</strong> See
                                        your app's flow and data relationships
                                        instantly.
                                    </span>
                                </li>
                                <li className={styles.checkItem}>
                                    <Check className={styles.checkIcon} />
                                    <span>
                                        <strong>Native Code:</strong> Drop into
                                        TypeScript/Python for complex custom
                                        logic.
                                    </span>
                                </li>
                                <li className={styles.checkItem}>
                                    <Check className={styles.checkIcon} />
                                    <span>
                                        <strong>Bi-Directional Sync:</strong>{" "}
                                        Changes in visual view update code, and
                                        vice versa.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWhite}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitleCentered}>
                        Engineered for Customer Support
                    </h2>
                    <div className={styles.useCaseGrid}>
                        {useCases.map((item: UseCase, idx: number) => {
                            const open = openUseCaseIndex === idx;
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    aria-expanded={open}
                                    className={`${styles.useCaseCard} ${
                                        styles[`accent_${item.accent}`]
                                    } ${open ? styles.useCaseOpen : ""}`}
                                    onClick={() =>
                                        setOpenUseCaseIndex(
                                            (prev: number | null) =>
                                                prev === idx ? null : idx
                                        )
                                    }
                                >
                                    <div className={styles.useCaseHead}>
                                        <div className={styles.useCaseMain}>
                                            <div
                                                className={
                                                    styles.useCaseTitleRow
                                                }
                                            >
                                                <h3
                                                    className={
                                                        styles.useCaseTitle
                                                    }
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <div className={styles.useCaseTags}>
                                                {item.tags.map((t: string) => (
                                                    <span
                                                        key={t}
                                                        className={styles.tag}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className={styles.useCaseDesc}>
                                                {item.description}
                                            </p>
                                        </div>
                                        <span
                                            className={styles.chevron}
                                            aria-hidden="true"
                                        >
                                            {open ? (
                                                <ChevronUp
                                                    className={
                                                        styles.chevronIcon
                                                    }
                                                />
                                            ) : (
                                                <ChevronDown
                                                    className={
                                                        styles.chevronIcon
                                                    }
                                                />
                                            )}
                                        </span>
                                    </div>

                                    <div
                                        className={styles.useCaseCollapse}
                                        aria-hidden={!open}
                                    >
                                        <div className={styles.useCaseSpecWrap}>
                                            <div className={styles.specHeader}>
                                                <span
                                                    className={
                                                        styles.specIconWrap
                                                    }
                                                >
                                                    <item.specsIcon
                                                        className={
                                                            styles.specIcon
                                                        }
                                                    />
                                                </span>
                                                <div
                                                    className={styles.specLabel}
                                                >
                                                    Technical Specs
                                                </div>
                                            </div>
                                            <div className={styles.specText}>
                                                {item.specs}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.ctaBand}>
                <div className={styles.ctaBackground} />
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Stop building disposable scripts.
                        <br />
                        Start engineering AI systems.
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Download the Desktop App or deploy to your private cloud
                        in minutes. No credit card required for the Developer
                        Edition.
                    </p>
                    <div className={styles.ctaButtons}>
                        <a
                            className={styles.ctaPrimary}
                            href="https://jit.pro/download"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Try JitAI Free
                        </a>
                        <a
                            className={styles.ctaSecondary}
                            href="https://jit.pro/docs/tutorial"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Read the Docs
                        </a>
                    </div>
                    <div className={styles.ctaFootnote}>
                        Supports Linux, Windows, macOS.
                    </div>
                </div>
            </section>

            <section id="how-it-works" className={styles.sectionLightBordered}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionTitleCentered}>
                        The Engineering Workflow
                    </h2>
                    <div className={styles.stepsGrid}>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>1</div>
                            <h3 className={styles.stepTitle}>
                                Model Structure
                            </h3>
                            <p className={styles.stepText}>
                                Define Types in JAAP. Map business entities
                                (JitORM) and logic flows (JitWorkflow).
                            </p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>2</div>
                            <h3 className={styles.stepTitle}>Compose (MTI)</h3>
                            <p className={styles.stepText}>
                                Instantiate elements. Use ASW workspace to
                                visualize logic or write native code extensions.
                            </p>
                        </div>
                        <div
                            className={`${styles.stepCard} ${styles.stepCardHighlight}`}
                        >
                            <div
                                className={`${styles.stepNumber} ${styles.stepNumberHighlight}`}
                            >
                                3
                            </div>
                            <h3 className={styles.stepTitle}>Infuse AI</h3>
                            <p className={styles.stepText}>
                                Bind Agents to specific structural Elements. AI
                                "reads" the app structure, not just text.
                            </p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>4</div>
                            <h3 className={styles.stepTitle}>
                                Deploy &amp; Govern
                            </h3>
                            <p className={styles.stepText}>
                                Push to Production Runtime. Manage versions,
                                rollback, and scale containers.
                            </p>
                        </div>
                    </div>
                    <div className={styles.stepsNote}>
                        <CheckCircle className={styles.stepsNoteIcon} />
                        <span>
                            AI reads structure, not scattered code. Reduces
                            context costs by ~40%.
                        </span>
                    </div>
                </div>
            </section>

            <section className={styles.sectionDark}>
                <div className={styles.sectionDarkGlow} />
                <div className={styles.sectionInner}>
                    <div className={styles.darkGrid}>
                        <div>
                            <h3 className={styles.darkTitle}>
                                Powered by 12 Core Frameworks
                            </h3>
                            <p className={styles.darkText}>
                                JitAI isn't just a wrapper. It's a complete OS
                                for intelligent applications, providing the
                                plumbing so you can focus on the logic.
                            </p>
                            <div className={styles.frameworkGrid}>
                                <div className={styles.frameworkItem}>
                                    JitWorkflow (Logic)
                                </div>
                                <div className={styles.frameworkItem}>
                                    JitORM (Data)
                                </div>
                                <div className={styles.frameworkItem}>
                                    JitAuth (Security)
                                </div>
                                <div className={styles.frameworkItem}>
                                    JitService (API)
                                </div>
                                <div className={styles.frameworkItem}>
                                    JitMessage (Event)
                                </div>
                                <div className={styles.frameworkItem}>
                                    JitTask (Job)
                                </div>
                            </div>
                        </div>

                        <div className={styles.templateCard}>
                            <h4 className={styles.templateTitle}>
                                Start with Templates
                            </h4>
                            <div className={styles.templateList}>
                                <a
                                    className={styles.templateLink}
                                    href="https://jit.pro/docs/devguide/ai-agent/agent-knowledge-base"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>Enterprise RAG Search</span>
                                    <ArrowRight
                                        className={styles.templateArrow}
                                        aria-hidden="true"
                                    />
                                </a>
                                <a
                                    className={styles.templateLink}
                                    href="https://jit.pro/docs/devguide/approval-workflow"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>Multi-Level Approval Flow</span>
                                    <ArrowRight
                                        className={styles.templateArrow}
                                        aria-hidden="true"
                                    />
                                </a>
                                <a
                                    className={styles.templateLink}
                                    href="https://jit.pro/docs/reference/framework/JitWeb/pages/ai-data-management-page"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>Data Cleaning Agent</span>
                                    <ArrowRight
                                        className={styles.templateArrow}
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.sectionWhiteBordered}>
                <div className={styles.sectionInner}>
                    <div className={styles.proofGrid}>
                        <div className={styles.proofCard}>
                            <div className={styles.proofHeader}>
                                <span className={styles.proofIconWrap}>
                                    <Building2 className={styles.proofIcon} />
                                </span>
                                <div className={styles.proofBadge}>
                                    Mid-size Fintech
                                </div>
                            </div>
                            <h4 className={styles.proofTitle}>
                                "We needed audit trails, not just answers."
                            </h4>
                            <p className={styles.proofText}>
                                Using JitAI's <strong>JitCommons</strong>{" "}
                                logging and Type-strict definitions, the team
                                built a compliance assistant that passed SecOps
                                review in 2 weeks.
                            </p>
                            <div className={styles.proofResult}>
                                <TrendingUp
                                    className={styles.proofResultIcon}
                                />
                                <span>Result: 50% faster audit prep time.</span>
                            </div>
                        </div>

                        <div className={styles.proofCard}>
                            <div className={styles.proofHeader}>
                                <span className={styles.proofIconWrap}>
                                    <Code className={styles.proofIcon} />
                                </span>
                                <div className={styles.proofBadge}>
                                    Engineering Team
                                </div>
                            </div>
                            <h4 className={styles.proofTitle}>
                                "Escaped the Python script hell."
                            </h4>
                            <p className={styles.proofText}>
                                Migrated scattered LangChain scripts into a
                                cohesive <strong>JitAI Application</strong>{" "}
                                structure. Now versioned, deployed via
                                container, and visible to the whole team.
                            </p>
                            <div className={styles.proofResult}>
                                <TrendingUp
                                    className={styles.proofResultIcon}
                                />
                                <span>
                                    Result: Deployment failures dropped to near
                                    zero.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionLightBordered}>
                <div className={styles.sectionInnerNarrow}>
                    <h2 className={styles.sectionTitleCentered}>
                        Technical FAQ
                    </h2>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>
                                Can I deploy on-prem / air-gapped?
                            </h3>
                            <p className={styles.faqA}>
                                Yes. JitAI supports fully offline deployment via
                                Docker containers on Windows, Linux, or macOS.
                                You control the data and the models.
                            </p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>
                                How do Type/Instance and inheritance work?
                            </h3>
                            <p className={styles.faqA}>
                                You define a "Type" (e.g.,{" "}
                                <code>ApprovalFlow</code>). You can create
                                instances of this type for different
                                departments. Update the Type logic, and all
                                instances inherit the changes. Enables massive
                                scale governance.
                            </p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>
                                Do I have to use a visual builder?
                            </h3>
                            <p className={styles.faqA}>
                                No. JitAI’s visual tooling is optional. You can
                                switch between visual editing, hand-coded
                                changes, and AI-assisted generation, and they
                                all modify the same underlying source code and
                                application structure—so you’re not locked into
                                a DSL. The Application Structure Workspace (ASW)
                                lets you work from an application-structure view
                                (Type/Instance) rather than a file-tree view.
                            </p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQ}>
                                What is the "Interpreted Runtime"?
                            </h3>
                            <p className={styles.faqA}>
                                Instead of compiling an app into a fixed,
                                one-time artifact, JitAI loads and runs the
                                application as JAAP structure. This keeps the
                                structure visible at runtime—so teams can adjust
                                structure, swap/extend capabilities, and roll
                                back through the platform’s built-in lifecycle
                                management (start/stop, upgrade, rollback).
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default AiSolutionPage;
