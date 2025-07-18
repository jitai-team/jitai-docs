import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  technologies: {
    title: 'JitAi 技术体系特性',
    cards: [
      {
        title: '企业级AI应用',
        subtitle: '软件与智件原生一体',
        color: '#3b82f6',
        icon: '🏢',
        sections: `
        软件：即传统企业管理软件，广泛涉及企业业务流程的各个专业环节（部门、岗位），实现业务信息跨部门高效协同、对齐、流转，提升企业整体运转效率。<br/>
        智件：即 AI智能体，深入到业务流程中的某个专业环节，充分利用软件中的业务数据、系统模块，处理具体业务任务，辅助特定岗位人员提升生产力。<br/>
        JitAi智件与软件原生一体、无缝融合，才能让企业级AI应用真正落地。
        `
      },
      {
        title: '生产级AI应用',
        subtitle: 'AI与UI交替协作',
        color: '#8b5cf6',
        icon: '⚙️',
        sections: `
        生产级AI应用强调安全合规与稳定可控。JitAi通过精细化权限控制，保障智能体功能和数据安全。<br/>
        另外，面对AI的幻觉和不确定性，JitAi通过AI-UI交互机制，支持AI与用户界面操作交替协作完成任务，满足生产级智能体的稳定可控需求。<br/>
        `
      },
      {
        title: '极简开发',
        subtitle: '编排和编程双模一体',
        color: '#06b6d4',
        icon: '🎨',
        sections: `
        JitAi提供可视化编排和可视化编程双模一体的开发工具。<br/>
        可视化编排工具，可以生成高度结构化的实例元素的声明式代码。<br/>
        可视化编程工具，可以生成实例元素中的过程的命令式代码。<br/>
        通过简单易理解、高质量、高效率的可视化编排和可视化编程，可以开发业务应用的绝大部分功能，极大简化承载业务独特性的实例元素的开发。
        `
      },
      {
        title: '编排编程开发框架',
        subtitle: '矩阵型系统架构模型',
        color: '#10b981',
        icon: '🏗️',
        sections: `
        JitAi元素三层架构（meta-type-实例）具备自描述、自加载（零依赖、热插拔）、可扩展、可替换、可编排式生成、可编排式使用等特性，AI&GUI友好。<br/>
        元素机制实现模块间彻底隔离和最大化封闭/开放，三层结构模式提升通用部分复用和差异部分自由度。<br/>
        跨应用的模块继承机制、模块类型机制、矩阵型元架构模型，让整个体系拥有"极致的关注点分离"能力，进而使得运行平台关注底层，开发框架关注应用技术封装，业务系统只关注业务差异化实现。`
      },
      {
        title: '零代码和低代码',
        subtitle: '图形化开发新范式',
        color: '#f59e0b',
        icon: '🚀',
        sections: `
        区别传统的低代码平台，JitAi是图形化编排和编程工具基于应用协议和框架的代码生成技术，本质仍然是属于程序员编码工作的辅助工具。<br/>
        相比直接编写代码具备天然友好、简单易懂、门槛低、速度快、质量高等优势。<br/>
        同时，JitAi图形化开发工具不设限，开发者可自由切换图形化与手写代码，兼具易用性与无限扩展性。`
      },
      {
        title: '部署和更新',
        subtitle: '一键部署、自动更新',
        color: '#ef4444',
        icon: '🔄',
        sections: `
        JitAi支持平台和应用的自动化部署与更新，服务器端可像浏览器端一样按需加载应用，极大简化私有化环境下的运维。<br/>
        同时，JitAi还支持一键分布式部署，轻松应对大规模应用需求。`
      },
      {
        title: '集成和被集成',
        subtitle: '无缝连接生态体系',
        color: '#ec4899',
        icon: '🔗',
        sections: `
        JitAi具备强大的集成能力，可自动生成调用外部API的服务元素，轻松集成任意接口。<br/>
        天然支持微服务，可以便利地把任何元素化的模块封装到对外API中，供外部集成使用。<br/>
        基于JAAP协议和三层结构，任何接口和技术都能封装为高集成度、高复用度、高灵活度的元素化模块，从而可以支持企业级管理系统的横向集成和助理系统的纵向集成。
        `
      },
      {
        title: '封装与开放',
        subtitle: '微内核架构平台',
        color: '#6366f1',
        icon: '📦',
        sections: `
        JitAi 应用平台是高度开放的微内核架构平台，封装了设备基础设施和物理集群环境的虚拟化、前后端网络通信协同、应用管理/加载、元素管理/加载、进程/线程管理等基础能力。平台仅负责容器能力（应用容器、元素容器），不介入具体业务或技术实现（如元素的实际加载和构造）。​实际能力由元素层自主实现，赋予应用系统最大的自由度和扩展性。<br/>
        JitAi 开发框架在高度封装（基础设施平台化、架构模型框架化、技术实现type元素化）的同时，基于分层模式​（技术模块层[复用] + 业务定义层[扩展]）与元素机制，JitAi 框架达成"高集成开箱即用"与"灵活扩展无限制"的完美平衡。<br/>
        JitAi 提供灵活共享的生态库和生态应用：基于JitAi应用协议，生态开发者可以通过发布JitAi应用的方式提供可复用的工具，支持第三方无侵入修改、轻量跨平台、灵活选择开源/闭源与收费模式，进而解决了传统复用方式对发布者版本的强依赖问题。`
      },
    ]
  }
};

const TechnologiesSection: React.FC = () => {
  return (
    <AnimatedSection animationType="fadeInUp" duration={500}>
      <section id="section-3" className={styles.technologiesSection}>
        <div className={globalStyles.sectionContent}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <h2 className={globalStyles.sectionTitle}>{CONTENT.technologies.title}</h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={200}>
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
          </AnimatedSection>
          <div className={styles.technologiesGrid}>
            {CONTENT.technologies.cards.map((card, index) => (
              <AnimatedSection
                key={index}
                animationType="fadeInLeft"
                delay={300 + index * 80}
                duration={500}
              >
                <div
                  className={`${globalStyles.baseCard} ${styles.technologyCard} animatedChild`}
                  style={{
                    '--card-color': card.color,
                    '--card-hover-color': card.color
                  } as React.CSSProperties}
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default TechnologiesSection;