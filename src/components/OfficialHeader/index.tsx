import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

import { BRAND_COPY } from "../../brand";

const getLocalePaths = (locale: string) => {
    const root = locale === "zh" ? "/zh/" : "/";

    return {
        root,
        download: locale === "zh" ? "/zh/download" : "/download",
        navItems:
            locale === "zh"
                ? [
                      { label: "首页", href: root },
                      { label: "能力", href: `${root}#capabilities` },
                      { label: "优势", href: `${root}#delivery` },
                      { label: "价值", href: `${root}#value` },
                      { label: "联系我们", href: "/zh/contact" },
                  ]
                : [
                      { label: "Home", href: root },
                      { label: "Capabilities", href: `${root}#capabilities` },
                      { label: "Advantages", href: `${root}#delivery` },
                      { label: "Value", href: `${root}#value` },
                      { label: "Contact", href: "/contact" },
                  ],
        downloadLabel:
            locale === "zh" ? "下载 JitAI 平台" : "Download JitAI Platform",
    };
};

const normalizePath = (path: string) => {
    const normalized = path.replace(/\/$/, "");
    return normalized || "/";
};

const OfficialHeader: React.FC<{ currentLocale?: string }> = ({
    currentLocale,
}) => {
    const { i18n } = useDocusaurusContext();
    const locale = currentLocale || i18n.currentLocale;
    const brand = BRAND_COPY[locale.startsWith("zh") ? "zh" : "en"];
    const { root, download, navItems, downloadLabel } = useMemo(
        () => getLocalePaths(locale),
        [locale],
    );
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);
        return () => document.body.classList.remove("menu-open");
    }, [menuOpen]);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setMenuOpen(false);

        const target = new URL(
            event.currentTarget.getAttribute("href") || root,
            window.location.origin,
        );
        const isSamePath =
            normalizePath(target.pathname) ===
            normalizePath(window.location.pathname);

        if (!isSamePath) {
            return;
        }

        event.preventDefault();

        if (!target.hash) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                className={`${styles.header} ${
                    scrolled ? styles.headerScrolled : ""
                }`}
            >
                <div className={styles.shell}>
                    <div className={styles.headerInner}>
                        <Link
                            to={root}
                            className={styles.brand}
                            onClick={handleNavClick}
                        >
                            <span className={styles.brandName}>JitAI</span>
                            <span className={styles.brandDivider} />
                            <span className={styles.brandSubline}>
                                {brand.title.slice("JitAI".length).replace(/^[，,]\s*/, "")}
                            </span>
                        </Link>
                        <nav className={styles.desktopNav}>
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavClick}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <div className={styles.headerActions}>
                            <Link to={download} className={styles.navButton}>
                                {downloadLabel}
                            </Link>
                        </div>
                        <button
                            className={styles.menuButton}
                            type="button"
                            aria-label={locale === "zh" ? "菜单" : "Menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((value) => !value)}
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </header>

            {menuOpen ? (
                <div className={styles.mobileLayer}>
                    <button
                        className={styles.mobileBackdrop}
                        type="button"
                        aria-label={locale === "zh" ? "关闭菜单" : "Close menu"}
                        onClick={() => setMenuOpen(false)}
                    />
                    <nav className={styles.mobileNav}>
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={handleNavClick}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className={styles.mobileDownloadWrap}>
                            <Link to={download} onClick={() => setMenuOpen(false)}>
                                {downloadLabel}
                            </Link>
                        </div>
                    </nav>
                </div>
            ) : null}
        </>
    );
};

const MenuIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
        aria-hidden="true"
    >
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
    </svg>
);

export default OfficialHeader;
