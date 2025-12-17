import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import LanguageSwitcher from "../LanguageSwitcher";
import CONTENT_EN from "./constant-en";
import CONTENT_ZH from "./constant-zh";
import { addUTMToUrl } from "../../../utils/utm";

interface NavbarProps {
    currentLocale?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentLocale }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const CONTENT = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;

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
                (item) => item.url === currentPath
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
                        {CONTENT.navItems.map((item, index) => {
                            const isActive = item.id === activeNavItem;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item)}
                                    className={`${
                                        isActive ? styles.active : ""
                                    } ${item.class || ""}`}
                                    data-type={item.type}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right section: Language switcher, Download button and Try Online button */}
                <div className={styles.rightSection}>
                    <LanguageSwitcher className={styles.languageSwitcher} />
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
                    <LanguageSwitcher />
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
                        {CONTENT.navItems.map((item, index) => {
                            const isActive = item.id === activeNavItem;

                            return (
                                <button
                                    key={item.id}
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
