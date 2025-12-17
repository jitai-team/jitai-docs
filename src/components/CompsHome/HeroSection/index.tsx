import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import globalStyles from "../../../pages/index.module.css";
import CONTENT_ZH from "./constant-zh";
import CONTENT_EN from "./constant-en";
import { addUTMToUrl } from "../../../utils/utm";
import Modal from "../../Modal";

const HeroSection: React.FC<{ currentLocale?: string }> = ({
    currentLocale,
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const content = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;

    // Calculate the number of columns for the card grid (excluding the first card)
    const cardsCount = content.cards.length - 1;

    // Detect mobile device
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
     * Handle button click event, redirect after adding UTM parameters
     */
    const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent default redirect
        e.preventDefault();

        if (isMobile) {
            setIsModalOpen(true);
        } else {
            // Get URL with UTM parameters
            const urlWithUTM = addUTMToUrl(
                "https://demo.jit.pro/wanyun/AdminApp"
            );
            // Open in new tab
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
                    {/* Main Title Area */}
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

                    {/* Call to Action Buttons Area */}
                    <div className={styles.heroButtons}>
                        <a
                            className={`${styles.primaryButton} ${
                                isMobile
                                    ? "analytics-download-mobile"
                                    : "analytics-download"
                            }`}
                            href="./download"
                        >
                            <span
                                className={`${styles.buttonText} ${
                                    isMobile
                                        ? "analytics-download-mobile"
                                        : "analytics-download"
                                }`}
                            >
                                {content.buttonDownload}
                            </span>
                            <span
                                className={`${styles.buttonIcon} ${
                                    isMobile
                                        ? "analytics-download-mobile"
                                        : "analytics-download"
                                }`}
                            >
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
                        {/** Try Online hidden 2025/12/16 */}
                        {/**
                        <a
                            className={`${styles.secondaryButton} ${
                                isMobile
                                    ? "analytics-tryOnline-mobile"
                                    : "analytics-tryOnline"
                            }`}
                            onClick={handleButtonClick}
                            target="_blank"
                        >
                            <span
                                className={`${styles.buttonText} ${
                                    isMobile
                                        ? "analytics-tryOnline-mobile"
                                        : "analytics-tryOnline"
                                }`}
                            >
                                {content.buttonDemo}
                            </span>
                            <span
                                className={`${styles.buttonIcon} ${
                                    isMobile
                                        ? "analytics-tryOnline-mobile"
                                        : "analytics-tryOnline"
                                }`}
                            >
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
                        */}
                    </div>

                    {/* First Card Content + Video Section */}
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
                                    src={content.previewVideoUrl}
                                    className={`${styles.video} ${styles.videoElement}`}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    {...({
                                        "x5-video-player-type": "h5",
                                        "x5-video-player-fullscreen": "false",
                                        "x5-playsinline": "true",
                                        "webkit-playsinline": "true",
                                        "t7-video-player-type": "inline",
                                    } as any)}
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
