import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import ScrollAnimation from '../ScrollAnimation';
import { CONTENT } from './constant';

const TechnologiesSection: React.FC = () => {
  return (
    <ScrollAnimation animationType="fadeInUp" duration={500}>
      <section
        id="section-3"
        className={`${styles.technologiesSection} ${globalStyles.gradientBackground}`}
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
            <div className={styles.technologiesIntro}>
              <div className={styles.technologiesIntroText}>
                JitAi 独创的 ​JAAP 协议，赋予系统模块自描述、自加载、独立可编排的特性，打造面向 AI 的解释型架构。AI 可动态感知、调用、编排任意模块，将传统应用生态无缝融入 AI 体系。<br/><br/>
                企业 AI 应用复杂且需快速迭代。JitAi 以强大架构解决"复杂"与"高效"矛盾：<br/>
                • ​矩阵型元架构：​​ 开创性统一架构模型，实现极致的复用与扩展，确保系统随复杂度增长仍保持简洁与灵活。<br/>
                ​• 高开放框架：​​ 业务层高度可编排，​复杂度与工程量降低 90%​。<br/>
                • ​图形化双模工具：​​ 支持编排与编程，​开发速度提升 10 倍，从容应对需求变化与快速迭代。<br/>
                ​• 自动化 DevOps：​​ 构建、发布、部署、运维全面简化轻量化。<br/><br/>
              </div>
            </div>
          </ScrollAnimation>
          <div className={styles.technologiesGrid}>
            {CONTENT.cards.map((card, index) => (
              <ScrollAnimation
                key={index}
                animationType="fadeInLeft"
                delay={300 + index * 80}
                duration={500}
              >
                <div
                  className={`${globalStyles.baseCard} ${styles.technologyCard} animatedChild`}
                  // style={{
                  //   '--card-color': card.color,
                  //   '--card-hover-color': card.color
                  // } as React.CSSProperties}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconEmoji}>{card.icon}</span>
                    </div>
                    <div className={styles.cardTitleSection}>
                      <h3>{card.title}</h3>
                      <p className={styles.cardSubtitle}>{card.subtitle}</p>
                    </div>
                  </div>
                  <div className={styles.technologyContent}>
                    <div className={styles.technologySection}>
                      <p dangerouslySetInnerHTML={{ __html: card.sections }}></p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default TechnologiesSection;