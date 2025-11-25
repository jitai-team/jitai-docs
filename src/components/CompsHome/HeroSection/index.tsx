import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import globalStyles from "../../../pages/index.module.css";
import CONTENT_ZH from "./constant-zh";
import CONTENT_EN from "./constant-en";
import { addUTMToUrl } from "../../../utils/utm";

const HeroSection: React.FC<{ currentLocale?: string }> = ({
    currentLocale,
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [demoUrl, setDemoUrl] = useState("https://demo.jit.pro/wanyun/AdminApp");

    const content = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;

    // 计算卡片网格的列数（除去第一个卡片后的数量）
    const cardsCount = content.cards.length - 1;

    // 检测移动端
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // 等待 UTM 追踪器初始化后更新链接 URL
    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 50; // 最多重试 50 次（5秒）
        
        // 等待 window.jitaiUTM 初始化完成
        const updateUrl = () => {
            if (typeof window !== 'undefined' && window.jitaiUTM) {
                const urlWithUTM = addUTMToUrl("https://demo.jit.pro/wanyun/AdminApp");
                setDemoUrl(urlWithUTM);
            } else if (retryCount < maxRetries) {
                // 如果还没初始化，延迟重试
                retryCount++;
                setTimeout(updateUrl, 100);
            }
            // 如果超过最大重试次数，保持原始 URL
        };

        // 如果已经初始化，立即更新
        if (typeof window !== 'undefined' && window.jitaiUTM) {
            updateUrl();
        } else {
            // 否则等待 DOMContentLoaded 或延迟检查
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updateUrl);
            } else {
                setTimeout(updateUrl, 100);
            }
        }
    }, []);

    return (
        <section id="section-0" className={styles.hero}>
            <div className={globalStyles.sectionContent}>
                <div className={styles.heroLeft}>
                    {/* 主标题区域 */}
                    <div className={styles.titleSection}>
                        <div className={styles.heroTitleContainer}>
                            <h1 className={styles.heroTitle}>
                                {
                                    content.mainTitle.split(
                                        content.highlightTitle
                                    )[0]
                                }
                                <span className={styles.highlightTitle}>
                                    {content.highlightTitle}
                                </span>
                                {
                                    content.mainTitle.split(
                                        content.highlightTitle
                                    )[1]
                                }
                            </h1>
                        </div>
                    </div>

                    {/* 行动按钮区域 */}
                    <div className={styles.heroButtons}>
                        <a
                            className={`${styles.primaryButton} analytics-download`}
                            href="./download"
                        >
                            <span className={styles.buttonText}>
                                {content.buttonDownload}
                            </span>
                            <span className={styles.buttonIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                            </span>
                        </a>
                        <a
                            className={`${styles.secondaryButton} analytics-tryOnline`}
                            href={
                                isMobile
                                    ? "./docs/tutorial"
                                    : demoUrl
                            }
                            target="_blank"
                        >
                            <span className={styles.buttonText}>
                                {isMobile
                                    ? content.buttonGetStart
                                    : content.buttonDemo}
                            </span>
                            <span className={styles.buttonIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </span>
                        </a>
                    </div>

                    {/* 第一个卡片内容 + 视频区块 */}
                    {content.cards.length > 0 && (
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredText}>
                                <h3 className={styles.featuredTitle}>
                                    {content.cards[0].title}
                                </h3>
                                <p
                                    className={styles.featuredDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: content.cards[0].description,
                                    }}
                                />
                            </div>
                            <div className={styles.featuredVideo}>
                                <video
                                    className={styles.video}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                >
                                    <source
                                        src={content.previewVideoUrl}
                                        type="video/mp4"
                                    />
                                    您的浏览器不支持视频播放。
                                </video>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.cardsGrid}>
                    {content.cards.slice(1).map((card, index) => (
                        <div
                            className={`${globalStyles.baseCard} ${styles.card}`}
                            key={index + 1}
                        >
                            <div className={styles.cardHeader}>
                                <h3>{card.title}</h3>
                            </div>
                            <p
                                className={styles.cardDescription}
                                dangerouslySetInnerHTML={{
                                    __html: card.description,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
