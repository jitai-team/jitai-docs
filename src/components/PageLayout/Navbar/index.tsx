import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import LanguageSwitcher from "../LanguageSwitcher";
import CONTENT_EN from "./constant-en";
import CONTENT_ZH from "./constant-zh";
import { addUTMToUrl } from "../../../utils/utm";
import { useLocation } from "@docusaurus/router";

type CaseNavItem = {
    slug: string;
    menuName: string;
    category: string;
};

const casesZhContext = (require as any).context(
    "@site/cases",
    true,
    /zhCN\.json$/,
);

const getAllZhCaseNavItems = (): CaseNavItem[] => {
    if (!casesZhContext) return [];

    const keys: string[] = casesZhContext.keys?.() || [];
    return keys
        .map((key) => {
            const mod = casesZhContext(key);
            const data = mod?.default || mod;

            const match = String(key).match(/^\.\/([^/]+)\/zhCN\.json$/);
            const slug = match?.[1] || "";
            const menuName = String(data?.menuName || "").trim();
            const category = String(data?.category || "").trim();

            if (!slug || !menuName || !category) return null;
            return { slug, menuName, category };
        })
        .filter(Boolean)
        .sort((a: any, b: any) =>
            String(a.menuName).localeCompare(String(b.menuName)),
        );
};

interface NavbarProps {
    currentLocale?: string;
    hideLanguageSwitcher?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
    currentLocale,
    hideLanguageSwitcher,
}) => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCasesOpen, setIsMobileCasesOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const isCaseDetail = /(?:^|\/)(?:zh\/)?cases\/[^/]+(?:\/|$)/.test(pathname);

    const shouldShowLanguageSwitcher = !hideLanguageSwitcher && !isCaseDetail;

    const CONTENT = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;

    const caseCategoryGroups = React.useMemo(() => {
        if (currentLocale !== "zh") return [];

        const allItems = getAllZhCaseNavItems();
        const categories: string[] = Array.isArray(
            (CONTENT as any).caseCategory,
        )
            ? (CONTENT as any).caseCategory
            : [];

        const grouped = categories.map((category) => {
            const items = allItems.filter((i) => i.category === category);
            return { category, items };
        });

        return grouped;
    }, [CONTENT, currentLocale]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        // Set current active nav item
        const setCurrentActiveNav = () => {
            const currentPath = window.location.pathname;

            // Try exact match first
            let currentItem = CONTENT.navItems.find(
                (item) => item.url === currentPath,
            );

            // If no exact match, try prefix match
            if (!currentItem) {
                currentItem = CONTENT.navItems.find((item) => {
                    // Ensure not root path to avoid false positive
                    if (item.url === "/" || item.url === "/zh") {
                        return false;
                    }
                    return currentPath.startsWith(item.url);
                });
            }

            // Set if matched, otherwise clear active state (avoid default home highlighting)
            if (currentItem) {
                setActiveNavItem(currentItem.id);
            } else {
                setActiveNavItem("");
            }
        };

        setCurrentActiveNav();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Control background scroll when mobile menu state changes
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
            setIsMobileCasesOpen(false);
        }

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (item: any) => {
        // Add UTM parameters for demo.jit.pro links
        const url =
            item.url && item.url.includes("demo.jit.pro")
                ? addUTMToUrl(item.url)
                : item.url;

        // Close menu after click on mobile
        if (isMobile) {
            window.location.href = url;
            setIsMobileMenuOpen(false);
        } else {
            if (item.type === "newTab") {
                window.open(url, "_blank");
            } else {
                window.location.href = url;
            }
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className={`${styles.navbar} ${
                scrolled ? styles.scrolled : ""
            } custom-navbar`}
        >
            <div className={styles.navContent}>
                {/* Logo and navigation menu on the left */}
                <div className={styles.leftSection}>
                    <div
                        className={styles.logo}
                        onClick={() => handleNavClick(CONTENT.navItems[0])}
                    >
                        <img
                            src="https://jit-www.oss-accelerate.aliyuncs.com/logo/logo_title.svg"
                            alt="JitAI"
                        />
                    </div>

                    {/* Desktop navigation */}
                    <div className={`${styles.navLinks} ${styles.desktopNav}`}>
                        {CONTENT.navItems.map((item) => {
                            const isActive = item.id === activeNavItem;

                            return (
                                <React.Fragment key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className={`${
                                            isActive ? styles.active : ""
                                        } ${item.class || ""}`}
                                        data-type={item.type}
                                    >
                                        {item.label}
                                    </button>

                                    {currentLocale === "zh" &&
                                    item.id === "forum" &&
                                    caseCategoryGroups.length > 0 ? (
                                        <div
                                            key="cases-menu"
                                            className={styles.casesDropdown}
                                        >
                                            <button
                                                type="button"
                                                className={styles.casesButton}
                                            >
                                                案例
                                                <svg
                                                    className={
                                                        styles.casesChevron
                                                    }
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6 9l6 6 6-6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>

                                            <div className={styles.casesMenu}>
                                                <div
                                                    className={
                                                        styles.casesMenuGrid
                                                    }
                                                >
                                                    {caseCategoryGroups.map(
                                                        (group) => (
                                                            <div
                                                                key={
                                                                    group.category
                                                                }
                                                                className={
                                                                    styles.casesCol
                                                                }
                                                            >
                                                                <h4
                                                                    className={
                                                                        styles.casesGroupTitle
                                                                    }
                                                                >
                                                                    {
                                                                        group.category
                                                                    }
                                                                </h4>
                                                                <div
                                                                    className={
                                                                        styles.casesList
                                                                    }
                                                                >
                                                                    {group.items.map(
                                                                        (
                                                                            caseItem,
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    caseItem.slug
                                                                                }
                                                                                type="button"
                                                                                className={
                                                                                    styles.casesItem
                                                                                }
                                                                                onClick={() =>
                                                                                    handleNavClick(
                                                                                        {
                                                                                            id: "cases",
                                                                                            label: caseItem.menuName,
                                                                                            type: "currentPage",
                                                                                            url: `/zh/cases/${caseItem.slug}`,
                                                                                        },
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    caseItem.menuName
                                                                                }
                                                                            </button>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Right section: Language switcher, Download button and Try Online button */}
                <div className={styles.rightSection}>
                    {shouldShowLanguageSwitcher && (
                        <LanguageSwitcher className={styles.languageSwitcher} />
                    )}
                    {/* Try Online hidden 2025/12/16 */}
                    {/**
                    <button
                        className={`${styles.tryOnlineButton} analytics-tryOnline`}
                        onClick={() => handleNavClick(CONTENT.tryOnlineButton)}
                        data-type={CONTENT.tryOnlineButton.type}
                    >
                        {CONTENT.tryOnlineButton.label}
                    </button>
                    */}
                    <button
                        className={`${styles.downloadButton} analytics-download`}
                        onClick={() => handleNavClick(CONTENT.downloadButton)}
                        data-type={CONTENT.downloadButton.type}
                    >
                        {CONTENT.downloadButton.label}
                    </button>
                </div>

                {/* Mobile language switcher - displayed to the left of the hamburger menu button */}
                <div className={styles.mobileTopLanguageSwitcher}>
                    {shouldShowLanguageSwitcher && <LanguageSwitcher />}
                </div>

                {/* Mobile hamburger menu button */}
                <button
                    className={`${styles.mobileMenuButton} ${
                        isMobileMenuOpen ? styles.active : ""
                    }`}
                    onClick={toggleMobileMenu}
                    aria-label="切换菜单"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile navigation menu */}
                <div
                    className={`${styles.mobileMenu} ${
                        isMobileMenuOpen ? styles.open : ""
                    }`}
                >
                    <div className={styles.mobileNavLinks}>
                        {CONTENT.navItems.map((item) => {
                            const isActive = item.id === activeNavItem;

                            return (
                                <React.Fragment key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className={`${styles.mobileNavItem} ${
                                            isActive ? styles.active : ""
                                        } ${
                                            item.class + "-mobile" || ""
                                        } mobile-nav-item`}
                                        data-type={item.type}
                                    >
                                        {item.label}
                                    </button>

                                    {currentLocale === "zh" &&
                                    item.id === "forum" &&
                                    caseCategoryGroups.length > 0 ? (
                                        <div
                                            key="mobile-cases-menu"
                                            className={styles.mobileCasesNav}
                                        >
                                            <button
                                                type="button"
                                                className={`${styles.mobileNavItem} ${
                                                    styles.mobileCasesButton
                                                } ${
                                                    isMobileCasesOpen
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setIsMobileCasesOpen(
                                                        (v) => !v,
                                                    )
                                                }
                                            >
                                                案例
                                                <svg
                                                    className={`${
                                                        styles.mobileCasesChevron
                                                    } ${
                                                        isMobileCasesOpen
                                                            ? styles.open
                                                            : ""
                                                    }`}
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6 9l6 6 6-6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                className={`${
                                                    styles.mobileCasesSubNav
                                                } ${
                                                    isMobileCasesOpen
                                                        ? styles.open
                                                        : ""
                                                }`}
                                            >
                                                {caseCategoryGroups.map(
                                                    (group) => (
                                                        <div
                                                            key={group.category}
                                                            className={
                                                                styles.mobileCasesGroup
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.mobileCasesGroupTitle
                                                                }
                                                            >
                                                                {group.category}
                                                            </div>
                                                            {group.items.map(
                                                                (caseItem) => (
                                                                    <button
                                                                        key={
                                                                            caseItem.slug
                                                                        }
                                                                        type="button"
                                                                        className={
                                                                            styles.mobileCasesLink
                                                                        }
                                                                        onClick={() =>
                                                                            handleNavClick(
                                                                                {
                                                                                    id: "cases",
                                                                                    label: caseItem.menuName,
                                                                                    type: "currentPage",
                                                                                    url: `/zh/cases/${caseItem.slug}`,
                                                                                },
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            caseItem.menuName
                                                                        }
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile menu overlay */}
                {isMobileMenuOpen && (
                    <div
                        className={styles.mobileOverlay}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
