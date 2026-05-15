import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import LanguageSwitcher from "../LanguageSwitcher";
import CONTENT_EN from "./constant-en";
import CONTENT_ZH from "./constant-zh";
import { addUTMToUrl } from "../../../utils/utm";
import { useLocation } from "@docusaurus/router";

interface NavbarProps {
    currentLocale?: string;
    hideLanguageSwitcher?: boolean;
}

const isHomeUrl = (url?: string) => url === "/" || url === "/zh" || url === "/zh/";

const Navbar: React.FC<NavbarProps> = ({
    currentLocale,
    hideLanguageSwitcher,
}) => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
        null,
    );
    const [isMobile, setIsMobile] = useState(false);

    const CONTENT = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;
    const shouldShowLanguageSwitcher = !hideLanguageSwitcher;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const setCurrentActiveNav = () => {
            const currentPath = window.location.pathname;

            const currentItem = CONTENT.navItems.find((item: any) => {
                if (item.url === currentPath) return true;
                if (isHomeUrl(item.url)) return false;
                if (
                    Array.isArray(item.children) &&
                    item.children.some((child: any) => {
                        if (child.url === currentPath) return true;
                        if (isHomeUrl(child.url)) return false;
                        return currentPath.startsWith(child.url);
                    })
                ) {
                    return true;
                }
                return item.url && currentPath.startsWith(item.url);
            });

            setActiveNavItem(currentItem?.id || "");
        };

        checkMobile();
        handleScroll();
        setCurrentActiveNav();

        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkMobile);
        };
    }, [CONTENT]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
            setOpenMobileDropdown(null);
        }

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (item: any) => {
        const rawUrl =
            item.type === "dropdown" && item.children?.[0]
                ? item.children[0].url
                : item.url;
        const url =
            rawUrl && rawUrl.includes("demo.jit.pro")
                ? addUTMToUrl(rawUrl)
                : rawUrl;

        if (!url) return;

        if (isMobile) {
            window.location.href = url;
            setIsMobileMenuOpen(false);
            return;
        }

        if (item.type === "newTab") {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
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

                    <div className={`${styles.navLinks} ${styles.desktopNav}`}>
                        {CONTENT.navItems.map((item: any) => {
                            const isActive = item.id === activeNavItem;
                            const hasChildren = Array.isArray(item.children);

                            return (
                                <div
                                    key={item.id}
                                    className={
                                        hasChildren
                                            ? styles.navDropdown
                                            : styles.navItemWrap
                                    }
                                >
                                    <button
                                        onClick={() => handleNavClick(item)}
                                        className={`${
                                            isActive ? styles.active : ""
                                        } ${item.class || ""}`}
                                        data-type={item.type}
                                    >
                                        {item.label}
                                        {hasChildren ? (
                                            <svg
                                                className={styles.navChevron}
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
                                        ) : null}
                                    </button>

                                    {hasChildren ? (
                                        <div className={styles.navSubMenu}>
                                            {item.children.map((child: any) => (
                                                <button
                                                    key={child.id}
                                                    type="button"
                                                    className={styles.navSubItem}
                                                    onClick={() =>
                                                        handleNavClick(child)
                                                    }
                                                >
                                                    {child.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.rightSection}>
                    {shouldShowLanguageSwitcher && (
                        <LanguageSwitcher className={styles.languageSwitcher} />
                    )}
                    <button
                        className={`${styles.downloadButton} analytics-download`}
                        onClick={() => handleNavClick(CONTENT.downloadButton)}
                        data-type={CONTENT.downloadButton.type}
                    >
                        {CONTENT.downloadButton.label}
                    </button>
                </div>

                <div className={styles.mobileTopLanguageSwitcher}>
                    {shouldShowLanguageSwitcher && <LanguageSwitcher />}
                </div>

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

                <div
                    className={`${styles.mobileMenu} ${
                        isMobileMenuOpen ? styles.open : ""
                    }`}
                >
                    <div className={styles.mobileNavLinks}>
                        {CONTENT.navItems.map((item: any) => {
                            const isActive = item.id === activeNavItem;
                            const hasChildren = Array.isArray(item.children);
                            const isDropdownOpen =
                                openMobileDropdown === item.id;

                            return (
                                <React.Fragment key={item.id}>
                                    <button
                                        onClick={() => {
                                            if (hasChildren) {
                                                setOpenMobileDropdown((value) =>
                                                    value === item.id
                                                        ? null
                                                        : item.id,
                                                );
                                                return;
                                            }
                                            handleNavClick(item);
                                        }}
                                        className={`${styles.mobileNavItem} ${
                                            isActive ? styles.active : ""
                                        } ${
                                            item.class
                                                ? `${item.class}-mobile`
                                                : ""
                                        } mobile-nav-item`}
                                        data-type={item.type}
                                    >
                                        {item.label}
                                        {hasChildren ? (
                                            <svg
                                                className={`${
                                                    styles.mobileDropdownChevron
                                                } ${
                                                    isDropdownOpen
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
                                        ) : null}
                                    </button>

                                    {hasChildren ? (
                                        <div
                                            className={`${
                                                styles.mobileSubNav
                                            } ${
                                                isDropdownOpen
                                                    ? styles.open
                                                    : ""
                                            }`}
                                        >
                                            {item.children.map((child: any) => (
                                                <button
                                                    key={child.id}
                                                    type="button"
                                                    className={
                                                        styles.mobileSubNavItem
                                                    }
                                                    onClick={() =>
                                                        handleNavClick(child)
                                                    }
                                                >
                                                    {child.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

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
