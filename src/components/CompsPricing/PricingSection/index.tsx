import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import globalStyles from "../../../pages/index.module.css";
import Modal from "../../Modal";
import CONTENT_EN from "./constant-en";
import CONTENT_ZH from "./constant-zh";
import { STRIPE_LINKS } from "./constant-common";

interface PricingSectionProps {
    currentLocale?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentLocale }) => {
    const CONTENT = currentLocale === "zh" ? CONTENT_ZH : CONTENT_EN;

    const [isVisible, setIsVisible] = useState(false);
    const [animateElements, setAnimateElements] = useState(false);
    const [activeTab, setActiveTab] = useState<"yearly" | "monthly" | "buyout">(
        "yearly"
    );
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    // 弹窗相关状态
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [teamId, setTeamId] = useState("");
    const [teamTitle, setTeamTitle] = useState("");
    const [teamIdError, setTeamIdError] = useState("");

    // 解析URL参数
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTeamId = urlParams.get("team_id");
        const urlTeamTitle = urlParams.get("team_title");

        if (urlTeamId) {
            setTeamId(urlTeamId);
        }
        if (urlTeamTitle) {
            setTeamTitle(urlTeamTitle);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => {
                setAnimateElements(true);
            }, 300);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // 处理支付按钮点击
    const handlePaymentClick = (plan: any) => {
        switch (plan.id) {
            case "free":
                window.location.href = "./download";
                break;
            case "custom":
                window.location.href = "./contact";
                break;
            default:
                setSelectedPlan(plan);
                setShowPaymentModal(true);
                break;
        }
    };

    // 处理自定义方案联系销售点击
    const handleCustomContactClick = () => {
        window.location.href = "./contact";
    };

    // 处理支付确认
    const handlePaymentConfirm = () => {
        // 验证team_id必填
        if (!teamId.trim()) {
            setTeamIdError(CONTENT.modal.teamIdRequired);
            return;
        }

        // 验证team_id格式
        if (!CONTENT.modal.teamIdPattern.test(teamId.trim())) {
            setTeamIdError(CONTENT.modal.teamIdPatternMessage);
            return;
        }

        setTeamIdError("");

        // 构建带参数的链接
        const link = STRIPE_LINKS[selectedPlan.id][activeTab];
        if (link) {
            const url = new URL(link, window.location.origin);
            url.searchParams.set("client_reference_id", teamId.trim());
            url.searchParams.set("locale", CONTENT.locale);
            window.open(url.toString(), "_blank");
        }

        setShowPaymentModal(false);
    };

    // 处理支付取消
    const handlePaymentCancel = () => {
        setShowPaymentModal(false);
        setTeamIdError("");
    };

    return (
        <section
            id="pricing-section"
            className={`${styles.pricing} ${isVisible ? styles.fadeIn : ""}`}
        >
            <div
                className={`${globalStyles.sectionContent} ${styles.sectionContent}`}
            >
                {/* 页面标题 */}
                <div
                    className={`${styles.pageHeader} ${
                        animateElements ? styles.headerAnimate : ""
                    }`}
                >
                    <h1 className={styles.pageTitle}>{CONTENT.title}</h1>
                    <p className={styles.pageSubtitle}>{CONTENT.subtitle}</p>
                </div>

                {/* 价格模式切换标签 */}
                <div
                    className={`${styles.tabContainer} ${
                        animateElements ? styles.tabAnimate : ""
                    }`}
                >
                    <div className={styles.tabGroup}>
                        <div
                            className={`${styles.tabSlider} ${
                                styles[
                                    `tabSlider${
                                        activeTab.charAt(0).toUpperCase() +
                                        activeTab.slice(1)
                                    }`
                                ]
                            }`}
                        />
                        <button
                            key="monthly"
                            className={`${styles.tab} ${
                                activeTab === "monthly" ? styles.tabActive : ""
                            }`}
                            onClick={() => setActiveTab("monthly")}
                        >
                            <span className={styles.tabIcon}>📅</span>
                            <span className={styles.tabText}>
                                {CONTENT.monthly}
                            </span>
                        </button>
                        <button
                            key="yearly"
                            className={`${styles.tab} ${
                                activeTab === "yearly" ? styles.tabActive : ""
                            }`}
                            onClick={() => setActiveTab("yearly")}
                        >
                            <span className={styles.tabIcon}>📅</span>
                            <span className={styles.tabText}>
                                {CONTENT.yearly}
                                <span className={styles.yearlyBadge}>
                                    {CONTENT.yearlyBadge}
                                </span>
                            </span>
                        </button>
                        <button
                            key="buyout"
                            className={`${styles.tab} ${
                                activeTab === "buyout" ? styles.tabActive : ""
                            }`}
                            onClick={() => setActiveTab("buyout")}
                        >
                            <span className={styles.tabIcon}>🏷️</span>
                            <span className={styles.tabText}>
                                {CONTENT.buyout}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 许可证方案卡片 */}
                <div
                    className={`${styles.pricingCards} ${
                        animateElements ? styles.cardsAnimate : ""
                    }`}
                >
                    {CONTENT.pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`${styles.pricingCard} ${
                                styles[plan.cardType]
                            } ${plan.isRecommended ? styles.recommended : ""}`}
                        >
                            {plan.isRecommended && (
                                <div className={styles.recommendedBadge}>
                                    {CONTENT.recommendedBadge}
                                </div>
                            )}
                            <div className={styles.cardHeader}>
                                {/* <div className={styles.cardIcon}>{plan.icon}</div> */}
                                <h3 className={styles.cardTitle}>
                                    {plan.title}
                                </h3>
                                <p className={styles.cardSubtitle}>
                                    {plan.subtitle}
                                </p>
                            </div>
                            <div className={styles.cardPrice}>
                                <div className={styles.priceGroup}>
                                    <div className={styles.price}>
                                        <span className={styles.amount}>
                                            {plan.isShowPriceUnit
                                                ? CONTENT.moneyUnit
                                                : ""}
                                            {plan[activeTab + "Price"]}
                                        </span>
                                        <span className={styles.period}>
                                            {plan.isShowPriceUnit
                                                ? CONTENT.priceUnit[activeTab]
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardAction}>
                                <button
                                    className={`${styles.orderButton} ${
                                        plan.analyticsCssClass +
                                        (isMobile ? "-mobile" : "")
                                    }`}
                                    onClick={() => handlePaymentClick(plan)}
                                >
                                    {plan.customPayActionText
                                        ? plan.customPayActionText
                                        : CONTENT.payActionText[activeTab]}
                                </button>
                            </div>
                            <div className={styles.cardFeatures}>
                                <div className={styles.packageInfo}>
                                    {CONTENT.includes}
                                </div>
                                {plan.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={styles.featureItem}
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 自定义组合区域 */}
                <div
                    className={`${styles.customPlanSection} ${
                        animateElements ? styles.customAnimate : ""
                    }`}
                >
                    <div className={styles.customPlanCard}>
                        <div className={styles.customPlanContent}>
                            <h3 className={styles.customPlanTitle}>
                                {CONTENT.customPlan.title}
                            </h3>
                            <p className={styles.customPlanDescription}>
                                {CONTENT.customPlan.description}
                            </p>
                        </div>
                        <div className={styles.customPlanAction}>
                            <button
                                className={`${styles.customContactButton} ${CONTENT.customPlan.analyticsCssClass}`}
                                onClick={handleCustomContactClick}
                            >
                                {CONTENT.customPlan.contactText}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 支付确认弹窗 */}
                <Modal
                    isOpen={showPaymentModal}
                    onClose={handlePaymentCancel}
                    title={CONTENT.modal.title}
                    maxWidth="500px"
                    footer={
                        <>
                            <button
                                className={styles.modalButtonCancel}
                                onClick={handlePaymentCancel}
                            >
                                {CONTENT.modal.cancelButton}
                            </button>
                            <button
                                className={`${styles.modalButtonConfirm} analytics-payConfirm`}
                                onClick={handlePaymentConfirm}
                            >
                                {CONTENT.modal.confirmButton}
                            </button>
                        </>
                    }
                >
                    <div className={styles.formGroup}>
                        <div className={styles.formLabelRow}>
                            <label className={styles.formLabel}>
                                {CONTENT.modal.teamIdLabel} *
                            </label>
                            <a
                                href={CONTENT.modal.teamIdHelpLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.helpLink}
                            >
                                {CONTENT.modal.teamIdHelpText}
                            </a>
                        </div>
                        <input
                            type="text"
                            className={`${styles.formInput} ${
                                teamIdError ? styles.formInputError : ""
                            }`}
                            value={teamId}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTeamId(value);

                                // 清除错误状态
                                if (teamIdError) {
                                    setTeamIdError("");
                                }

                                // 实时验证格式（可选，提供即时反馈）
                                if (
                                    value.trim() &&
                                    !CONTENT.modal.teamIdPattern.test(
                                        value.trim()
                                    )
                                ) {
                                    setTeamIdError(
                                        CONTENT.modal.teamIdPatternMessage
                                    );
                                }
                            }}
                            placeholder={CONTENT.modal.teamIdPlaceholder}
                        />
                        {teamIdError && (
                            <div className={styles.errorMessage}>
                                {teamIdError}
                            </div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            {CONTENT.modal.teamTitleLabel}
                        </label>
                        <input
                            type="text"
                            className={styles.formInput}
                            value={teamTitle}
                            onChange={(e) => setTeamTitle(e.target.value)}
                            placeholder={CONTENT.modal.teamTitlePlaceholder}
                        />
                    </div>

                    <div className={styles.modalPlanInfo}>
                        <h4 className={styles.planInfoTitle}>
                            {CONTENT.modal.purchasePlanTitle}
                        </h4>
                        <p className={styles.planInfoText}>
                            {selectedPlan?.title} - {CONTENT[activeTab]}
                        </p>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default PricingSection;
