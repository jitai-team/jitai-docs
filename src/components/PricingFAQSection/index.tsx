import React, { useState, useEffect } from 'react';
import globalStyles from '../../pages/index.module.css';
import styles from './styles.module.css';
import { FAQ_DATA } from './constant';

const PricingFAQSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setAnimateElements(true);
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.faqSection} ${isVisible ? styles.fadeIn : ''}`}>
        {/* 常见问题 */}
        <div className={`${globalStyles.sectionContent} ${animateElements ? styles.faqAnimate : ''}`}>
          <h2 className={`${globalStyles.sectionTitle} ${styles.faqTitle}`}>常见问题</h2>
          <div className={styles.faqContainer}>
            {FAQ_DATA.map((faq) => (
              <div key={faq.question} className={styles.faqItem}>
                <button 
                  className={`${styles.faqQuestion} ${openFAQ === faq.question ? styles.faqQuestionActive : ''}`}
                  onClick={() => setOpenFAQ(openFAQ === faq.question ? null : faq.question)}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <span className={`${styles.faqIcon} ${openFAQ === faq.question ? styles.faqIconRotated : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </span>
                </button>
                <div className={`${styles.faqAnswer} ${openFAQ === faq.question ? styles.faqAnswerOpen : ''}`}>
                  <div className={styles.faqAnswerContent}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQSection;
