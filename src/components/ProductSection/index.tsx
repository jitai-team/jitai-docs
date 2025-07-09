import React from 'react';
import styles from './styles.module.css';

const CONTENT = {
  product: {
    title: 'JitAi 是什么？',
    subtitle: '企业级应用和 AI 智能体的开发、调测、发布、部署、更新的全栈一体化平台',
    cards: [
      {
        icon: '📡',
        title: 'JIT AI应用协议',
        description: 'Jit AI App Protocol，简称 JAAP，灵活开放的面向AI的解释型应用架构协议，智能化动态感知和调用、GUI图形化实时编排和构建。'
      },
      {
        icon: '🚀',
        title: 'JIT AI应用平台',
        description: '开箱即用、跨平台、跨端、在线更新、自主加载应用。全面支持 JAAP 协议，支持应用模块智能化即时识别和调用、图形化即时编排和构建。'
      },
      {
        icon: '⚙️',
        title: 'JIT 编排编程框架',
        description: '为 AI 集成和 GUI 编排而生的编排式编程框架，简洁、灵活、高集成度、无限扩展，极简化业务应用层。'
      },
      {
        icon: '🧩',
        title: 'JIT 编排编程工具',
        description: '编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码，极大降低门槛、提供效率和质量。'
      },
      {
        icon: '🛠️',
        title: 'JIT DevOps运维管理工具',
        description: '服务器端也像浏览器端一样的"自动按需加载最新应用"，私有化环境下自动部署更新。'
      },
      {
        icon: '🔗',
        title: 'JIT 应用级继承机制',
        description: '零依赖、无侵入、可改写、可扩展的应用和模块的复用机制，优雅的解决复用和扩展的矛盾。'
      }
    ]
  }
};

const ProductSection: React.FC = () => {
  return (
    <section id="section-1" className={styles.productSection}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{CONTENT.product.title}</h2>
        <p className={styles.sectionSubtitle}>
          {CONTENT.product.subtitle}
        </p>
        <div className={styles.cardsGrid}>
          {CONTENT.product.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;