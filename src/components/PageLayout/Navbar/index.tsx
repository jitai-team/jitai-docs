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

        // 设置当前活跃的导航项
        const setCurrentActiveNav = () => {
            const currentPath = window.location.pathname;

            // 首先尝试精确匹配
            let currentItem = CONTENT.navItems.find(
                (item) => item.url === currentPath
            );

            // 如果没有精确匹配，则尝试前缀匹配
            if (!currentItem) {
                currentItem = CONTENT.navItems.find((item) => {
                    // 确保不是根路径，避免误匹配
                    if (item.url === "/" || item.url === "/zh") {
                        return false;
                    }
                    return currentPath.startsWith(item.url);
                });
            }

            // 如果找到匹配项则设置，否则清空激活状态（避免默认高亮首页）
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

    // 移动端菜单状态变化时控制背景滚动
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
        // 为 demo.jit.pro 链接添加 UTM 参数
        const url =
            item.url && item.url.includes("demo.jit.pro")
                ? addUTMToUrl(item.url)
                : item.url;

        // 移动端点击后关闭菜单
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
                {/* Logo 和导航菜单在左侧 */}
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

                    {/* 桌面端导航 */}
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

                {/* 右侧区域：语言切换器、Download 按钮和 Try Online 按钮 */}
                <div className={styles.rightSection}>
                    <LanguageSwitcher className={styles.languageSwitcher} />
                    {/* 暂时隐藏在线试用按钮 */}
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

                {/* 移动端语言切换器 - 显示在汉堡菜单按钮左侧 */}
                <div className={styles.mobileTopLanguageSwitcher}>
                    <LanguageSwitcher />
                </div>

                {/* 移动端汉堡菜单按钮 */}
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

                {/* 移动端导航菜单 */}
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

                {/* 移动端菜单遮罩 */}
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
