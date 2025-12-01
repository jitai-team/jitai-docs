import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import globalStyles from "../../../pages/index.module.css";
import CONTENT_ZH from "./constant-zh";
import CONTENT_EN from "./constant-en";
import { addUTMToUrl } from "../../../utils/utm";
import LazyVideo from "../../LazyVideo";
import Modal from "../../Modal";

const HeroSection: React.FC<{ currentLocale?: string }> = ({
    currentLocale,
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    /**
     * 处理按钮点击事件，添加 UTM 参数后跳转
     */
    const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // 阻止默认跳转
        e.preventDefault();

        if (isMobile) {
            setIsModalOpen(true);
        } else {
            // 获取带 UTM 参数的 URL
            const urlWithUTM = addUTMToUrl("https://demo.jit.pro/wanyun/AdminApp");
            // 在新标签页打开
            window.open(urlWithUTM, "_blank");
        }
    };

    const handleModalConfirm = () => {
        window.open("./docs/tutorial", "_blank");
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

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
                            className={`${styles.primaryButton} ${isMobile ? 'analytics-download-mobile' : 'analytics-download'}`}
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
                            className={`${styles.secondaryButton} ${isMobile ? 'analytics-tryOnline-mobile' : 'analytics-tryOnline'}`}
                            onClick={handleButtonClick}
                            target="_blank"
                        >
                            <span className={styles.buttonText}>
                                {content.buttonDemo}
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
                                <LazyVideo
                                    src={content.previewVideoUrl}
                                    className={styles.video}
                                    videoClassName={styles.videoElement}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    rootMargin="50px 0px"
                                />
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
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalCancel}
                title={content.modal.title}
                maxWidth="90%"
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "12px",
                        }}
                    >
                        <button
                            className={styles.secondaryButton}
                            onClick={handleModalCancel}
                            style={{
                                padding: "8px 16px",
                                fontSize: "14px",
                                height: "auto",
                                width: "auto",
                            }}
                        >
                            {content.modal.cancel}
                        </button>
                        <button
                            className={styles.primaryButton}
                            onClick={handleModalConfirm}
                            style={{
                                padding: "8px 16px",
                                fontSize: "14px",
                                height: "auto",
                                width: "auto",
                            }}
                        >
                            {content.modal.confirm}
                        </button>
                    </div>
                }
            >
                <div
                    dangerouslySetInnerHTML={{ __html: content.modal.content }}
                />
            </Modal>
        </section>
    );
};

export default HeroSection;
