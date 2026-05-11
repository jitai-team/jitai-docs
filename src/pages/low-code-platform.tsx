import React, { useMemo, useState } from "react";
import PageLayout from "@site/src/components/PageLayout";
import styles from "@site/src/pages/low-code-platform.module.css";

type FaqItem = {
    question: string;
    answer: string;
};

const LowCodePlatformPage = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqs = useMemo<FaqItem[]>(
        () => [
            {
                question: "What is JitAI?",
                answer: "JitAI is an AI-native software engineering system built around one core idea: application structure is a first-class citizen (JAAP). It covers the full lifecycle—from structure definition and development to runtime and long-term governance.",
            },
            {
                question:
                    "Will I get locked into low-code or a proprietary DSL?",
                answer: "No. JitAI’s visual capabilities share the same application structure and source code with native coding. You can switch between visual editing, manual coding, and AI assistance without losing control or being locked into an intermediate DSL.",
            },
            {
                question:
                    "Can JitAI run in private / offline enterprise environments?",
                answer: "Yes. Private deployment, offline deployment, multi-environment, multi-version releases, and rollback are designed as default platform capabilities, not extra engineering work.",
            },
            {
                question:
                    "How is JitAI different from AI workflow tools (Dify/Coze/n8n)?",
                answer: "Most AI tools treat AI as an external module plugged in via APIs, which often creates lots of glue code and limits deep integration with core business logic. JitAI takes the opposite approach: AI works on the application structure itself, as an internal participant.",
            },
            {
                question:
                    "Can I integrate third-party systems or extend the platform?",
                answer: "Yes. JitAI is designed for “infinite integration and extension”: third-party systems and custom modules can be integrated into the same unified structure, and you can define new element types as your needs grow—without the system turning into fragile glue.",
            },
        ],
        []
    );

    return (
        <PageLayout
            pageId="low-code-platform"
            containerClassName={styles.page}
            hideLanguageSwitcher
        >
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroLeft}>
                            <div className={styles.heroEyebrow}>
                                <span className={styles.heroEyebrowBadge}>
                                    FOR DEVELOPERS
                                </span>
                            </div>
                            <h1 className={styles.heroTitle}>
                                Build Enterprise AI Apps.
                                <br />
                                <span className={styles.heroTitleAccent}>
                                    Visual Structure.
                                </span>
                                <br />
                                <span className={styles.heroTitleWhite}>
                                    Real Code.
                                </span>
                            </h1>
                            <p className={styles.heroLead}>
                                Don’t get locked into low-code. JitAI makes your
                                application structure explicit (JAAP), so AI can
                                understand your system end-to-end—not just
                                snippets.
                            </p>
                            <p className={styles.heroSub}>
                                From prototype to private production: version,
                                deploy, roll back, and evolve safely as your
                                system grows.
                            </p>
                            <div className={styles.heroButtons}>
                                <a
                                    href="https://jit.pro/download"
                                    className={styles.heroPrimary}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Try JitAI
                                </a>
                                <a
                                    href="https://jit.pro/contact"
                                    className={styles.heroSecondary}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Contact sales
                                </a>
                            </div>
                            <div className={styles.heroFootnote}>
                                <span className={styles.heroFootnoteDot} />
                                <span className={styles.heroFootnoteText}>
                                    Self-host ready • Visual + full-code
                                    workflow • Built for long-lived systems
                                </span>
                            </div>
                        </div>

                        <div className={styles.heroRight}>
                            <div className={styles.heroMediaShadow} />
                            <div className={styles.heroMediaFrame}>
                                <img
                                    src="https://jit.pro/assets/images/create-react-agent-fed37cc71f8012ad67ce94a087c3cef2.gif"
                                    alt="Code Structure"
                                    className={styles.heroMediaImg}
                                    loading="lazy"
                                />
                                <div className={styles.heroTerminal}>
                                    <div className={styles.heroTerminalText}>
                                        &gt; deploy --prod
                                        <br />
                                        &gt; Success in 12.4s
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.bubbleGlowLeft} />
                <div className={styles.sectionInner}>
                    <div className={styles.twoCol}>
                        <div>
                            <span className={styles.pill}>VISUAL LOGIC</span>
                            <h2 className={styles.h2}>
                                Design the logic,
                                <br />
                                <span className={styles.h2Accent}>
                                    not the boilerplate.
                                </span>
                            </h2>
                            <p className={styles.lead}>
                                Model your app with a structure-first workspace
                                (Type / Instance). Use visual flows where it
                                helps, drop into TypeScript where it matters—
                                everything updates the same readable source
                                code.
                            </p>

                            <ul className={styles.checkList}>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIconWrap}>
                                        <svg
                                            className={styles.checkIcon}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>
                                        One source of truth: visual edits, hand
                                        code, and AI changes all merge into the
                                        same repo
                                    </span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIconWrap}>
                                        <svg
                                            className={styles.checkIcon}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>
                                        Structure stays explicit: semantics
                                        don’t collapse into scattered
                                        implementation details
                                    </span>
                                </li>
                                <li className={styles.checkItem}>
                                    <span className={styles.checkIconWrap}>
                                        <svg
                                            className={styles.checkIcon}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                    <span className={styles.checkText}>
                                        Built for collaboration: predictable
                                        boundaries, scalable refactors, safer
                                        AI-assisted changes
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.visualCardWrap}>
                            <div className={styles.visualCardBg} />
                            <div className={styles.devCard}>
                                <div className={styles.windowHeader}>
                                    <span className={styles.dotRed} />
                                    <span className={styles.dotAmber} />
                                    <span className={styles.dotGreen} />
                                </div>
                                <div className={styles.windowBody}>
                                    <img
                                        src="https://jit.pro/assets/images/source-code-3e0dbb5c7119470fd38bc895b7c45928.png"
                                        alt="JitAI Visual Logic Interface"
                                        className={styles.windowImg}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <div className={styles.sectionInner}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.h2Center}>
                            Everything is a component
                        </h2>
                        <p className={styles.subCenter}>
                            Modular architecture from the ground up. Reusability
                            isn't an afterthought, it's the foundation.
                        </p>
                    </div>

                    <div className={styles.cardGrid3}>
                        <div className={styles.devCardPadded}>
                            <div className={styles.iconBox}>
                                <svg
                                    className={styles.iconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className={styles.h3}>
                                Composable AI-Native Architecture
                            </h3>
                            <p className={styles.p}>
                                Interpretable, structure-first design (JAAP +
                                matrix) lets AI agents and teams understand and
                                evolve full-stack modules consistently across
                                your system.
                            </p>
                        </div>

                        <div className={styles.devCardPadded}>
                            <div className={styles.iconBox}>
                                <svg
                                    className={styles.iconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <h3 className={styles.h3}>
                                Orchestration-Based Development
                            </h3>
                            <p className={styles.p}>
                                Design flows visually, extend with code, and
                                keep complexity under control. Build reusable
                                components and modify integrations without
                                breaking the overall logic.
                            </p>
                        </div>

                        <div className={styles.devCardPadded}>
                            <div className={styles.iconBox}>
                                <svg
                                    className={styles.iconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className={styles.h3}>
                                Private Deployment + Infinite Extension
                            </h3>
                            <p className={styles.p}>
                                Deploy in private or distributed environments
                                with automated upgrades and safe rollbacks—
                                while seamlessly integrating new technologies as
                                your needs grow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.bubbleGlowRight} />
                <div className={styles.sectionInner}>
                    <div className={styles.twoCol}>
                        <div className={styles.orchMediaWrap}>
                            <div className={styles.orchMediaBg} />
                            <div className={styles.devCardPadSm}>
                                <img
                                    src="https://jit.pro/assets/images/assistant-add-node-edge-6348c84f00906878f5d3824e0e1c49a3.gif"
                                    alt="Workflow Orchestration Animation"
                                    className={styles.orchImg}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div>
                            <span className={styles.pill}>ORCHESTRATION</span>
                            <h2 className={styles.h2}>
                                Orchestrate complex
                                <br />
                                <span className={styles.h2Accent}>
                                    async jobs.
                                </span>
                            </h2>
                            <p className={styles.lead}>
                                Run long-running workflows, distributed tasks,
                                and AI calls with clear state, retries, and
                                governance. JitAI manages execution as a
                                structured runtime—so your system stays
                                evolvable, not brittle.
                            </p>

                            <div className={styles.orchActions}>
                                <a
                                    href="https://jit.pro/docs/devguide"
                                    className={styles.btnOutline}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Explore Workflows →
                                </a>
                                <p className={styles.smallMuted}>
                                    Built for real systems: versioned changes,
                                    environment isolation, and controlled
                                    rollouts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <div className={styles.sectionInner}>
                    <div className={styles.configGrid}>
                        <div>
                            <h2 className={styles.h2Plain}>Config as Code</h2>
                            <p className={styles.leadPlain}>
                                Visual tooling should never hide what matters.
                                JitAI stores your application as an explicit
                                structure (JAAP) with readable source code—easy
                                to version, review, and evolve over time.
                            </p>
                            <div className={styles.bulletsRow}>
                                <span className={styles.bulletItem}>
                                    <span className={styles.bulletDot} /> Git
                                    Sync
                                </span>
                                <span className={styles.bulletItem}>
                                    <span className={styles.bulletDot} /> PR
                                    Reviews
                                </span>
                            </div>
                        </div>

                        <div className={styles.codeCard}>
                            <div className={styles.codeCardHeader}>
                                <span className={styles.codeCardTitle}>
                                    JitAI Ai Application Protocol
                                </span>
                                <span className={styles.codeCardControls}>
                                    <span className={styles.codeControlDot} />
                                    <span className={styles.codeControlDot} />
                                </span>
                            </div>
                            <pre className={styles.codeBlock}>
                                {`{
  "appId": "orgId.appName",           // Application unique identifier
  "name": "appName",                  // Application internal name
  "title": "Application Title",       // Application display title
  "version": "1.0.0",                 // Application version number
  "orgId": "orgId",                   // Organization ID
  "icon": "icon_identifier",          // Application icon identifier
  "theme": "#3d65fd",                 // Application theme color
  "encrypted": 0,                     // Encryption flag (0:No 1:Yes)

  "extends": [                        // Application inheritance configuration
    {
      "appId": "wanyun.BaseApp",
      "version": "1.0.0"
    }
  ],

  "settings": {                       // Application runtime settings
    "defaultElement": {
      "defaultCache": "caches.Default",
      "defaultDatabase": "databases.Default",
      "defaultShell": "shells.Main",
      "defaultStorage": "storages.Default"
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.faqSection}>
                <div className={styles.faqGlow} />
                <div className={styles.faqInner}>
                    <h2 className={styles.faqTitle}>
                        Frequently Asked Questions
                    </h2>
                    <div className={styles.faqList}>
                        {faqs.map((item: FaqItem, idx: number) => {
                            const open = openFaqIndex === idx;
                            return (
                                <div
                                    key={item.question}
                                    className={`${styles.faqItem} ${
                                        open ? styles.faqItemActive : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className={styles.faqButton}
                                        aria-expanded={open}
                                        onClick={() =>
                                            setOpenFaqIndex(
                                                (prev: number | null) =>
                                                    prev === idx ? null : idx
                                            )
                                        }
                                    >
                                        <span>{item.question}</span>
                                        <svg
                                            className={`${styles.faqIcon} ${
                                                open ? styles.faqIconActive : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    <div className={styles.faqContent}>
                                        <p className={styles.faqAnswer}>
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.infoSection}>
                <div className={styles.bubbleGlowCenter} />
                <div className={styles.infoInner}>
                    <img
                        src="https://jit-www.oss-accelerate.aliyuncs.com/logo/logo_title.svg"
                        alt="New Feature Logo"
                        className={styles.infoLogo}
                        loading="lazy"
                    />
                    <h2 className={styles.infoTitle}>
                        See why developers
                        <br />
                        choose JitAI.
                    </h2>
                    <p className={styles.infoSub}>
                        Go to the docs for a fast tour of the platform: core
                        concepts, examples, and best practices for building
                        production-grade AI systems.
                    </p>
                    <div className={styles.infoButtons}>
                        <a
                            href="https://jit.pro/download"
                            className={styles.infoPrimary}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Try JitAI
                        </a>
                        <a
                            href="https://jit.pro/docs/tutorial"
                            className={styles.infoSecondary}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Docs
                        </a>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default LowCodePlatformPage;
