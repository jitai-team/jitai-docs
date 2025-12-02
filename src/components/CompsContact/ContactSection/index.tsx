import React, { useState } from "react";
import styles from "./styles.module.css";
import CONTENT_EN from "./constant-en";
import CONTENT_ZH from "./constant-zh";
import { addUTMToUrl } from "@site/src/utils/utm";

interface ContactSectionProps {
    currentLocale?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ currentLocale }) => {
    const CONTENT = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;
    const [copied, setCopied] = useState(false);

    const formUrl = addUTMToUrl(CONTENT.formUrl);

    const handleCopyEmail = (e?: React.MouseEvent | React.TouchEvent) => {
        // 阻止默认行为，避免移动端触发两次
        if (e) {
            e.preventDefault();
        }

        // 使用现代 Clipboard API，如果不支持则降级到 execCommand
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(CONTENT.email);
        } else {
            // 降级方案：创建临时文本框
            const textArea = document.createElement("textarea");
            textArea.value = CONTENT.email;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
            } catch (err) {
                console.error("复制失败:", err);
            }
            document.body.removeChild(textArea);
        }

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* 页面标题 */}
                <div className={styles.header}>
                    <h1 className={styles.title}>{CONTENT.title}</h1>
                    <p className={styles.subtitle}>{CONTENT.subtitle}</p>
                </div>

                {/* 主内容区域 */}
                <div className={styles.content}>
                    {/* 左侧表单 */}
                    <div className={styles.formSection}>
                        <iframe
                            src={formUrl}
                            className={styles.formIframe}
                            title={CONTENT.title}
                            loading="eager"
                        />
                    </div>

                    {/* 右侧联系方式 */}
                    <div className={styles.contactSection}>
                        {/* 微信卡片 */}
                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.033zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                                    </svg>
                                </div>
                                <span className={styles.cardTitle}>
                                    {CONTENT.wechatTitle}
                                </span>
                            </div>
                            <div className={styles.qrWrapper}>
                                <img
                                    src={CONTENT.qrCodeUrl}
                                    alt="WeChat QR Code"
                                    className={styles.qrCode}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/140x140.png?text=QR";
                                        e.currentTarget.style.opacity = "0.5";
                                    }}
                                />
                            </div>
                            <p className={styles.cardDesc}>
                                {CONTENT.wechatDesc}
                            </p>
                        </div>

                        {/* 邮件卡片 */}
                        <div className={styles.contactCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <span className={styles.cardTitle}>
                                    {CONTENT.emailTitle}
                                </span>
                            </div>
                            <div className={styles.emailContent}>
                                <a
                                    href={`mailto:${
                                        CONTENT.email
                                    }?subject=${encodeURIComponent(
                                        CONTENT.emailSubject
                                    )}`}
                                    className={styles.emailAddress}
                                >
                                    {CONTENT.email}
                                </a>
                                <button
                                    className={`${styles.copyButton} ${
                                        copied ? styles.copied : ""
                                    }`}
                                    onClick={handleCopyEmail}
                                    onTouchEnd={handleCopyEmail}
                                    title={
                                        copied ? CONTENT.copied : CONTENT.copy
                                    }
                                >
                                    {copied ? (
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : (
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <rect
                                                x="9"
                                                y="9"
                                                width="13"
                                                height="13"
                                                rx="2"
                                                ry="2"
                                            ></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
