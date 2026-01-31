import React from "react";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { caseLogoMap, IconProps, IconWrapper } from "./utils";

const casesAssetContext = (require as any).context(
    "@site/cases",
    true,
    /\.(png|jpe?g|gif|webp|svg|avif)$/,
);

function tryResolveCasesAsset(slug: string, rawPath: string): string {
    if (!casesAssetContext) return "";
    if (!slug) return "";

    const normalized = String(rawPath || "").replace(/^\.\//, "");
    if (!normalized) return "";

    try {
        const mod = casesAssetContext(`./${slug}/${normalized}`);
        return mod?.default || mod || "";
    } catch {
        return "";
    }
}

const Users = (props: IconProps) => (
    <IconWrapper {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconWrapper>
);
const Target = (props: IconProps) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </IconWrapper>
);
const AppWindow = (props: IconProps) => (
    <IconWrapper {...props}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18" />
        <path d="M7 6h.01" />
        <path d="M11 6h.01" />
    </IconWrapper>
);
const BrainCircuit = (props: IconProps) => (
    <IconWrapper {...props}>
        <path d="M12 5a3 3 0 1 0-3-3" />
        <path d="M15 5a3 3 0 1 1 3-3" />
        <path d="M9 4v6" />
        <path d="M15 4v6" />
        <path d="M6 10a4 4 0 0 0 4 4" />
        <path d="M18 10a4 4 0 0 1-4 4" />
        <path d="M10 14v5" />
        <path d="M14 14v5" />
        <path d="M8 19h8" />
    </IconWrapper>
);
const TrendingDown = (props: IconProps) => (
    <IconWrapper {...props}>
        <path d="M23 18l-8-8-4 4-6-6" />
        <path d="M17 18h6v-6" />
    </IconWrapper>
);
const Check = (props: IconProps) => (
    <IconWrapper {...props}>
        <path d="M20 6 9 17l-5-5" />
    </IconWrapper>
);

// --- Theme Constants ---
const THEME = {
    colors: {
        primary: "#3C64FC",
        primaryDark: "#2C4CC4",
        primaryLight: "#B4C4FC",
        textMain: "#2C3C64",
        textBody: "#34446C",
        textGray: "#64748B",
        bgWhite: "#FFFFFF",
        bgLight: "#F8FAFC",
        bgSection: "#F1F5F9",
    },
};

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderTextWithStrong = (
    text: string,
    strongText?: string[],
): React.ReactNode => {
    const list = (strongText || []).filter(Boolean);
    if (!text) return null;
    if (list.length === 0) return text;

    const strongSet = new Set(list);
    const pattern = list
        .slice()
        .sort((a, b) => b.length - a.length)
        .map(escapeRegExp)
        .join("|");
    if (!pattern) return text;

    const parts = text.split(new RegExp(`(${pattern})`, "g"));
    return parts.map((part, idx) => {
        if (!part) return null;
        return strongSet.has(part) ? <strong key={idx}>{part}</strong> : part;
    });
};

const renderParagraphs = (
    text: string,
    strongText?: string[],
): React.ReactNode => {
    const lines = (text || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    return lines.map((line, idx) => (
        <p key={idx}>{renderTextWithStrong(line, strongText)}</p>
    ));
};

const getCaseSlugFromPathname = (pathname: string): string => {
    const match = pathname.match(/^\/(?:zh\/)?cases\/([^/]+)(?:\/|$)/);
    return match?.[1] || "";
};

const getCaseData = (slug: string): any => {
    if (!slug) return null;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@site/cases/${slug}/zhCN.json`);
    } catch {
        return null;
    }
};

const iconMap: Record<string, React.ComponentType<IconProps>> = {
    screen: AppWindow,
    circle: Target,
    jit: BrainCircuit,
    right: Check,
    up: TrendingDown,
};

const CaseTemplate = () => {
    const { pathname } = useLocation();
    const slug = React.useMemo(
        () => getCaseSlugFromPathname(pathname),
        [pathname],
    );
    const data = React.useMemo(() => getCaseData(slug), [slug]);

    const rawBgImg = String(data?.bgImg || "");
    const normalizedBgImg = rawBgImg.replace(/^\.\//, "");
    const baseUrlBgImg = useBaseUrl(normalizedBgImg || "");
    const casesBgImg = tryResolveCasesAsset(slug, rawBgImg);
    const heroBgSrc =
        /^(https?:)?\/\//.test(rawBgImg) ||
        /^data:/.test(rawBgImg) ||
        /^blob:/.test(rawBgImg)
            ? rawBgImg
            : casesBgImg || baseUrlBgImg;

    const titleParts = String(data?.title || "").split("\n");
    const heroTitleMain = titleParts[0] || "";
    const heroTitleAccent = titleParts.slice(1).join("\n");

    const heroLogo = data?.slug ? caseLogoMap?.[data.slug] : null;
    const heroLogoNode = React.isValidElement(heroLogo)
        ? React.cloneElement(heroLogo as any, { size: 40 })
        : heroLogo;

    const handleLinkClick = () => {
        window.open("https://jit.pro/zh/contact", "_blank");
    };

    return (
        <div
            className={styles.page}
            style={{
                backgroundColor: THEME.colors.bgWhite,
                color: THEME.colors.textBody,
            }}
        >
            <div className={styles.mainWrap}>
                <div className={styles.heroHeader}>
                    <div className={styles.heroBg}>
                        <img
                            src={heroBgSrc}
                            alt="Modern Bank Architecture"
                            className={styles.heroBgImg}
                            style={
                                data?.bgPosition?.objectPosition
                                    ? {
                                          objectPosition:
                                              data.bgPosition.objectPosition,
                                      }
                                    : undefined
                            }
                        />
                        <div className={styles.heroBgMask} />
                    </div>

                    <div className={styles.heroLogoBox}>
                        <div className={styles.heroLogoIcon}>
                            {heroLogoNode}
                        </div>
                    </div>

                    <div className={styles.heroTitle}>
                        <h1
                            className={styles.heroH1}
                            style={{ color: THEME.colors.textMain }}
                        >
                            {heroTitleMain}
                            {heroTitleAccent ? (
                                <>
                                    <br />
                                    <span className={styles.heroAccent}>
                                        {heroTitleAccent}
                                    </span>
                                </>
                            ) : null}
                        </h1>

                        <div className={styles.heroMeta}>
                            {(data?.tags || []).map(
                                (tag: string, idx: number) => (
                                    <React.Fragment key={`${tag}-${idx}`}>
                                        <span>{tag}</span>
                                        {idx < data.tags.length - 1 ? (
                                            <span className={styles.heroDot} />
                                        ) : null}
                                    </React.Fragment>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.leftCol}>
                        <div className={styles.intro}>
                            <div className={styles.introText}>
                                {renderParagraphs(
                                    String(data?.part1?.section1 || ""),
                                    data?.part1?.strongText,
                                )}
                            </div>

                            <hr className={styles.dividerStrong} />

                            <div className={styles.topics}>
                                {(data?.part1?.schemas || []).map(
                                    (item: any, idx: number) => (
                                        <div key={idx}>
                                            <h3 className={styles.topicTitle}>
                                                {item?.title}
                                            </h3>
                                            <p className={styles.topicDesc}>
                                                {item?.desc}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>

                            <div className={styles.ctaBox}>
                                <div>
                                    <h5 className={styles.ctaTitle}>
                                        探索 JitAI 解决方案
                                    </h5>
                                </div>
                                <div className={styles.ctaButtons}>
                                    <button
                                        className={styles.primaryBtn}
                                        type="button"
                                        onClick={handleLinkClick}
                                    >
                                        预约演示
                                    </button>
                                    <button
                                        className={styles.secondaryBtn}
                                        type="button"
                                        onClick={handleLinkClick}
                                    >
                                        联系销售
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sections}>
                            <section>
                                <span className={styles.sectionKicker}>
                                    {data?.part2?.tag}
                                </span>
                                <h2 className={styles.sectionH2}>
                                    {data?.part2?.title}
                                </h2>
                                <div className={styles.sectionBody}>
                                    {renderParagraphs(
                                        String(data?.part2?.section || ""),
                                        data?.part2?.strongText,
                                    )}
                                </div>
                            </section>

                            <section>
                                <span className={styles.sectionKicker}>
                                    {data?.part3?.tag}
                                </span>
                                <h2 className={styles.sectionH2}>
                                    {data?.part3?.title}
                                </h2>
                                <div className={styles.sectionBody}>
                                    {renderParagraphs(
                                        String(data?.part3?.section || ""),
                                        data?.part3?.strongText,
                                    )}
                                </div>
                            </section>

                            <section className={styles.quoteBox}>
                                <blockquote className={styles.quoteText}>
                                    {data?.quotation?.desc}
                                </blockquote>
                                <div className={styles.quoteUser}>
                                    <div className={styles.quoteAvatar}>
                                        <Users
                                            size={24}
                                            className={styles.quoteAvatarIcon}
                                        />
                                    </div>
                                    <div>
                                        <div className={styles.quoteName}>
                                            {data?.quotation?.author}
                                        </div>
                                        <div className={styles.quoteRole}>
                                            {data?.quotation?.dept}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <span className={styles.sectionKicker}>
                                    {data?.part4?.tag}
                                </span>
                                <h2 className={styles.sectionH2}>
                                    {data?.part4?.title}
                                </h2>
                                <div className={styles.sectionBody}>
                                    {renderParagraphs(
                                        String(data?.part4?.section || ""),
                                        data?.part4?.strongText,
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.sticky}>
                            <div className={styles.overview}>
                                <h5 className={styles.overviewTitle}>
                                    项目概览
                                </h5>
                                <ul className={styles.overviewList}>
                                    {(data?.overview || []).map(
                                        (item: any, idx: number) => {
                                            const IconComp =
                                                iconMap[item?.icon] ||
                                                AppWindow;
                                            const isUp = item?.icon === "up";
                                            const iconClassName = isUp
                                                ? `${styles.overviewIcon} ${styles.overviewIconFlip}`
                                                : styles.overviewIcon;

                                            return (
                                                <li
                                                    key={idx}
                                                    className={
                                                        styles.overviewItem
                                                    }
                                                >
                                                    <IconComp
                                                        size={18}
                                                        className={
                                                            iconClassName
                                                        }
                                                    />
                                                    <div>
                                                        <span
                                                            className={
                                                                styles.overviewLabel
                                                            }
                                                        >
                                                            {item?.title}
                                                        </span>
                                                        <div
                                                            className={
                                                                styles.overviewValue
                                                            }
                                                        >
                                                            {item?.desc}
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        },
                                    )}
                                </ul>
                            </div>

                            <div className={styles.sidebarCta}>
                                <h5 className={styles.sidebarCtaTitle}>
                                    探索 JitAI
                                </h5>
                                <div className={styles.sidebarCtaButtons}>
                                    <button
                                        className={styles.sidebarPrimary}
                                        type="button"
                                        onClick={handleLinkClick}
                                    >
                                        预约演示
                                    </button>
                                    <button
                                        className={styles.sidebarSecondary}
                                        type="button"
                                        onClick={handleLinkClick}
                                    >
                                        联系销售
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomCta}>
                <div className={styles.bottomCtaInner}>
                    <div className={styles.bottomCtaText}>
                        <h3 className={styles.bottomCtaTitle}>
                            准备好升级您的业务系统了吗？
                        </h3>
                        <p className={styles.bottomCtaDesc}>
                            立即体验 JitAI 如何通过 AI 驱动您的业务发展。
                        </p>
                    </div>
                    <div className={styles.bottomCtaBtns}>
                        <button
                            className={styles.bottomCtaBtnPrimary}
                            type="button"
                            onClick={handleLinkClick}
                        >
                            预约演示
                        </button>
                        <button
                            className={styles.bottomCtaBtnSecondary}
                            type="button"
                            onClick={handleLinkClick}
                        >
                            联系销售
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseTemplate;
