import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  product: {
    color: '#3b82f6', // 添加统一的主题颜色
    title: 'JitAi 是什么？',
    subtitle: '企业级应用和 AI 智能体的开发、调测、发布、部署、更新的全栈一体化平台',
    cards: [
      {
        icon: '📡',
        title: 'Jit AI应用协议',
        description: 'Jit AI App Protocol，简称 JAAP，灵活开放的面向AI的解释型应用架构协议，智能化动态感知和调用、GUI图形化实时编排和构建。',
        color: '#3b82f6'
      },
      {
        icon: '🚀',
        title: 'Jit AI应用平台',
        description: '开箱即用、跨平台、跨端、在线更新、自主加载应用。全面支持 JAAP 协议，支持应用模块智能化即时识别和调用、图形化即时编排和构建。',
        color: '#8b5cf6'
      },
      {
        icon: '⚙️',
        title: 'Jit 编排编程框架',
        description: '为 AI 集成和 GUI 编排而生的编排式编程框架，简洁、灵活、高集成度、无限扩展，极简化业务应用层。',
        color: '#06b6d4'
      },
      {
        icon: '🧩',
        title: 'Jit 编排编程工具',
        description: '编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码，极大降低门槛、提供效率和质量。',
        color: '#10b981'
      },
      {
        icon: '🛠️',
        title: 'Jit DevOps运维管理工具',
        description: '服务器端也像浏览器端一样的"自动按需加载最新应用"，私有化环境下自动部署更新。',
        color: '#f59e0b'
      },
      {
        icon: '🔗',
        title: 'Jit 应用级继承机制',
        description: '零依赖、无侵入、可改写、可扩展的应用和模块的复用机制，优雅的解决复用和扩展的矛盾。',
        color: '#ef4444'
      }
    ]
  }
};

const ProductSection: React.FC = () => {
  return (
    <AnimatedSection animationType="fadeInUp" duration={500}>
      <section
        id="section-1"
        className={`${styles.productSection} ${globalStyles.gradientBackground}`}
        style={{
          '--section-color': CONTENT.product.color,
          '--card-color': CONTENT.product.color,
          '--card-hover-color': CONTENT.product.color
        } as React.CSSProperties}
      >
        <div className={globalStyles.sectionContent}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <h2 className={globalStyles.sectionTitle}>{CONTENT.product.title}</h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <p className={styles.sectionSubtitle}>
              {CONTENT.product.subtitle}
            </p>
          </AnimatedSection>
          <div className={styles.cardsGrid}>
            {CONTENT.product.cards.map((card, index) => (
              <AnimatedSection
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ProductSection;