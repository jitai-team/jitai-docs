import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import CONTENT_EN from './constant-en';
import CONTENT_ZH from './constant-zh';

interface ProductSectionProps {
  currentLocale: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ currentLocale }) => {
  const CONTENT = currentLocale === 'zh' ? CONTENT_ZH : CONTENT_EN;

  return (
          <ScrollAnimation animationType="fadeInUp" duration={500}>
        <section
          id="section-1"
          className={`${styles.productSection} ${globalStyles.gradientBackground}`}
          // style={{
          //   '--section-color': CONTENT.color,
          //   '--card-color': CONTENT.color,
          //   '--card-hover-color': CONTENT.color
          // } as React.CSSProperties}
        >
          <div className={globalStyles.sectionContent}>
            <ScrollAnimation animationType="fadeInUp" delay={100}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
            </ScrollAnimation>
            <ScrollAnimation animationType="fadeInUp" delay={200}>
              <p className={styles.sectionSubtitle}>
                {CONTENT.subtitle}
              </p>
            </ScrollAnimation>
            <div className={styles.cardsGrid}>
              {CONTENT.cards.map((card, index) => (
                <ScrollAnimation
                  key={index}
                  animationType="scaleIn"
                  delay={300 + index * 50}
                  duration={400}
                >
                  <div
                    className={`${globalStyles.baseCard} ${styles.card} animatedChild`}
                    style={{
                      '--card-color': card.color,
                      '--card-hover-color': card.color
                    } as React.CSSProperties}
                  >
                    <div className={styles.cardIcon}>{card.icon}</div>
                    <div className={styles.cardHeader}>
                      <h3>{card.title}</h3>
                    </div>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
  );
};

export default ProductSection;