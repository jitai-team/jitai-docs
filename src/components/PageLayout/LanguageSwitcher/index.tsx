import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const location = useLocation();
    const [currentLang, setCurrentLang] = useState<"zh" | "en">("en");

    const isCaseDetail = /(?:^|\/)(?:zh\/)?cases\/[^/]+(?:\/|$)/.test(
        location.pathname,
    );

    if (isCaseDetail) {
        return null;
    }

    useEffect(() => {
        // 根据当前路径判断语言
        const path = location.pathname;
        if (path.startsWith("/zh")) {
            setCurrentLang("zh");
        } else {
            setCurrentLang("en");
        }
    }, [location.pathname]);

    const handleLanguageSwitch = () => {
        const currentPath = window.location.pathname;
        const searchParams = window.location.search; // 获取 URL 参数（?key=value）
        const hash = window.location.hash; // 获取 hash（#anchor）
        let newPath = "";
        let newLang = "";

        if (currentLang === "en") {
            // 切换到中文
            newLang = "zh";
            if (currentPath === "/") {
                newPath = "/zh";
            } else {
                newPath = `/zh${currentPath}`;
            }
        } else {
            // 切换到英文
            newLang = "en";
            if (currentPath === "/zh" || currentPath === "/zh/") {
                newPath = "/";
            } else {
                newPath = currentPath.replace("/zh", "");
            }
        }

        // 保存用户的语言偏好
        if (typeof localStorage !== "undefined") {
            try {
                localStorage.setItem("jitai-preferred-language", newLang);
            } catch (e) {
                console.warn("Failed to save language preference:", e);
            }
        }

        // 拼接完整 URL，保留参数和 hash
        const newUrl = newPath + searchParams + hash;
        window.location.href = newUrl;
    };

    return (
        <div className={`${styles.languageSwitcher} ${className || ""}`}>
            <button
                className={styles.switchButton}
                onClick={handleLanguageSwitch}
                aria-label={
                    currentLang === "zh" ? "Switch to English" : "切换到中文"
                }
                title={
                    currentLang === "zh" ? "Switch to English" : "切换到中文"
                }
            >
                <svg
                    className={styles.globeIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
                    <path
                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
                <span className={styles.currentLang}>
                    {currentLang === "zh" ? "EN" : "中文"}
                </span>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
