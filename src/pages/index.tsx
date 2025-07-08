import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

// 文案内容配置
const CONTENT = {
  // 导航菜单
  navItems: [
    { id: 0, label: '首页' },
    { id: 1, label: '产品介绍' },
    { id: 3, label: '技术特性' }
  ],

  // Hero 轮询文案
  heroTitles: [
    {
      content: '为 AI 而生的<br />下一代应用开发技术体系'
    },
    {
      content: '解释型、编排式的<br />生产级AI应用开发平台'
    }
  ],

  // 产品介绍
  product: {
    title: 'JitAi 是什么？',
    subtitle: '企业级应用和 AI 智能体的开发、调测、发布、部署、更新的全栈一体化平台',
    cards: [
      {
        icon: '📋',
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
        icon: '🛠️',
        title: 'JIT 编排编程工具',
        description: '编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码，极大降低门槛、提供效率和质量。'
      },
      {
        icon: '🔧',
        title: 'JIT DevOps运维管理工具',
        description: '服务器端也像浏览器端一样的"自动按需加载最新应用"，私有化环境下自动部署更新。'
      },
      {
        icon: '🔄',
        title: 'JIT 应用级继承机制',
        description: '零依赖、无侵入、可改写、可扩展的应用和模块的复用机制，优雅的解决复用和扩展的矛盾。'
      }
    ]
  },


  // 技术特性
  features: {
    title: 'JitAi 技术体系特性',
    cards: [
      {
        title: '企业级AI应用(软件与智件原生一体)',
        sections: `
        软件：即传统企业管理软件，广泛涉及企业业务流程的各个专业环节（部门、岗位），实现业务信息跨部门高效协同、对齐、流转，提升企业整体运转效率。<br/>
        智件：即 AI智能体，深入到业务流程中的某个专业环节，充分利用软件中的业务数据、系统模块，处理具体业务任务，辅助特定岗位人员提升生产力。<br/>
        JitAi智件与软件原生一体、无缝融合，才能让企业级AI应用真正落地。
        `
      },
      {
        title: '生产级AI应用（AI与UI交替协作）',
        sections: `
        生产级AI应用强调安全合规与稳定可控。JitAi通过精细化权限控制，保障智能体功能和数据安全。<br/>
        另外，面对AI的幻觉和不确定性，JitAi通过AI-UI交互机制，支持AI与用户界面操作交替协作完成任务，满足生产级智能体的稳定可控需求。<br/>
        `
      },
      {
        title: '极简开发（编排和编程双模一体）',
        sections: `
        JitAi提供可视化编排和可视化编程双模一体的开发工具。<br/>
        可视化编排工具，可以生成高度结构化的实例元素的声明式代码。<br/>
        可视化编程工具，可以生成实例元素中的过程的命令式代码。<br/>
        通过简单易理解、高质量、高效率的可视化编排和可视化编程，可以开发业务应用的绝大部分功能，极大简化承载业务独特性的实例元素的开发。
        `
      },
      {
        title: '编排编程开发框架（矩阵型系统架构模型）',
        sections: `
        JitAi元素三层架构（meta-type-实例）具备自描述、自加载（零依赖、热插拔）、可扩展、可替换、可编排式生成、可编排式使用等特性，AI&GUI友好。<br/>
        元素机制实现模块间彻底隔离和最大化封闭/开放，三层结构模式提升通用部分复用和差异部分自由度。<br/>
        跨应用的模块继承机制、模块类型机制、矩阵型元架构模型，让整个体系拥有“极致的关注点分离”能力，进而使得运行平台关注底层，开发框架关注应用技术封装，业务系统只关注业务差异化实现。`
      },
      {
        title: '零代码和低代码',
        sections: `
        区别传统的低代码平台，JitAi是图形化编排和编程工具基于应用协议和框架的代码生成技术，本质仍然是属于程序员编码工作的辅助工具。<br/>
        相比直接编写代码具备天然友好、简单易懂、门槛低、速度快、质量高等优势。<br/>
        同时，JitAi图形化开发工具不设限，开发者可自由切换图形化与手写代码，兼具易用性与无限扩展性。`
      },
      {
        title: '部署和更新（一键部署、自动更新）',
        sections: `
        JitAi支持平台和应用的自动化部署与更新，服务器端可像浏览器端一样按需加载应用，极大简化私有化环境下的运维。<br/>
        同时，JitAi还支持一键分布式部署，轻松应对大规模应用需求。`
      },
      {
        title: '集成和被集成',
        sections: `
        JitAi具备强大的集成能力，可自动生成调用外部API的服务元素，轻松集成任意接口。<br/>
        天然支持微服务，可以便利地把任何元素化的模块封装到对外API中，供外部集成使用。<br/>
        基于JAAP协议和三层结构，任何接口和技术都能封装为高集成度、高复用度、高灵活度的元素化模块，从而可以支持企业级管理系统的横向集成和助理系统的纵向集成。
        `
      },
      {
        title: '封装与开放',
        sections: `
        JitAi 应用平台是高度开放的微内核架构平台，封装了设备基础设施和物理集群环境的虚拟化、前后端网络通信协同、应用管理/加载、元素管理/加载、进程/线程管理等基础能力。平台仅负责容器能力（应用容器、元素容器），不介入具体业务或技术实现（如元素的实际加载和构造）。​实际能力由元素层自主实现，赋予应用系统最大的自由度和扩展性<br/>
        JitAi 开发框架在高度封装（基础设施平台化、架构模型框架化、技术实现type元素化）的同时，基于分层模式​（技术模块层[复用] + 业务定义层[扩展]）与元素机制，JitAi 框架达成“高集成开箱即用”与“灵活扩展无限制”的完美平衡。<br/>
        JitAi 提供灵活共享的生态库和生态应用：基于JitAi应用协议，生态开发者可以通过发布JitAi应用的方式提供可复用的工具，支持第三方无侵入修改、轻量跨平台、灵活选择开源/闭源与收费模式，进而解决了传统复用方式对发布者版本的强依赖问题。`
      },
    ]
  },

  // 页脚
  footer: {
    brand: {
      title: 'JitAi',
      description: '为 AI 而生的下一代应用开发技术体系'
    },
    product: {
      title: '产品',
      items: ['AI应用平台', '编排编程框架', '开发工具', '运维管理']
    },
    technology: {
      title: '技术',
      items: ['JAAP协议', '解释型系统', '矩阵型架构', '元素化模块']
    },
    contact: {
      title: '联系我们',
      description: '开启企业级AI应用的规模化时代'
    },
    copyright: '© 2024 JitAi. All rights reserved.'
  }
};

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 延迟显示，让页面先加载完成
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 打字机效果
  useEffect(() => {
    const startTyping = () => {
      const currentTitle = CONTENT.heroTitles[currentTitleIndex].content;
      const cleanText = currentTitle.replace(/<br\s*\/?>/gi, '\n');
      const textArray = cleanText.split('');

      // console.log('开始打字:', currentTitle);
      // console.log('清理后文本:', cleanText);
      // console.log('字符数组:', textArray);

      setIsTyping(true);
      setDisplayedText('');
      setIsFading(false);

      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < textArray.length) {
          const nextChar = textArray[currentIndex];
          // console.log(`显示字符 ${currentIndex}:`, nextChar);
          setDisplayedText(prev => prev + nextChar);
          currentIndex++;
        } else {
          // console.log('打字完成');
          setIsTyping(false);
          clearInterval(typeInterval);

                    // 显示完成后等待一段时间再开始淡出
          setTimeout(() => {
            setIsFading(true);

            // 淡出完成后切换到下一个标题
            setTimeout(() => {
              setCurrentTitleIndex(prev => (prev + 1) % CONTENT.heroTitles.length);
              setIsFading(false); // 重置淡出状态
            }, 800); // 等待淡出动画完成
          }, 3000); // 增加显示时间到3秒
        }
      }, 100);

      return () => clearInterval(typeInterval);
    };

    // 立即开始打字
    const cleanup = startTyping();
    return cleanup;
  }, [currentTitleIndex]);

  // 移除原来的轮询逻辑，现在在淡出完成后自动切换

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      {/* 导航栏 */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <img src="/img/jit.png" alt="JitAi" />
            <span>JitAi</span>
          </div>
          <div className={styles.navLinks}>
            {CONTENT.navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 第1屏：Hero Section */}
      <section id="section-0" className={`${styles.hero} ${isVisible ? styles.fadeIn : ''}`}>
        <div className={styles.brandBg}>
          <div className={styles.taglineBlock}>
            <div className={styles.taglineLine1}>
              <span className={styles.boldInitial}>J</span>UST
              <span style={{margin: '0 0.5vw'}}></span>
              <span className={styles.boldInitial}>I</span>N
              <span style={{margin: '0 0.5vw'}}></span>
              <span className={styles.boldInitial}>T</span>IME
            </div>
            <div className={styles.taglineLine2}>
              FOR <span className={styles.boldInitial}>A</span><span className={styles.boldAI}>I</span> APP
            </div>
          </div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={`${styles.heroTitle} ${isFading ? styles.fadeOut : ''}`}>
              {displayedText}
              {<span className={styles.cursor}>|</span>}
            </h1>
            <p className={styles.heroSubtitle}>
              开创性的解释型应用架构、应用协议和应用运行平台，颠覆性的编排式应用开发新范式、新框架、新工具，把企业级应用开发带入AI时代。
              <br />
              <br />
              帮助开发者快速构建与传统管理系统原生一体的生产级AI应用，实现"AI助理智件"和"传统管理软件"的无缝融合，加速企业AI应用的规模化。
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton}>立即体验</button>
              <button className={styles.secondaryButton}>了解更多</button>
            </div>
          </div>
        </div>
      </section>

      {/* 第2屏：产品介绍 */}
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

      {/* 第3屏：核心优势 */}
      {/* <section id="section-2" className={styles.advantagesSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{CONTENT.advantages.title}</h2>
          <div className={styles.advantagesGrid}>
            {CONTENT.advantages.cards.map((card, index) => (
              <div key={index} className={styles.advantageCard}>
                <h3 className={styles.advantageTitle}>{card.title}</h3>
                <div className={styles.advantageContent}>
                  <div className={styles.traditional}>
                    <h4>{card.traditional.title}</h4>
                    <p>{card.traditional.content}</p>
                  </div>
                  <div className={styles.solution}>
                    <h4>{card.solution.title}</h4>
                    <p>{card.solution.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 第4屏：技术特性 */}
      <section id="section-3" className={styles.featuresSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>{CONTENT.features.title}</h2>
          <div id="section-3-1" style={{ fontSize: '14px', lineHeight: '24px', color: '#374151', position: 'relative', padding: '2.5rem 3.5rem' }}>
            <span style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontSize: '6rem',
              color: '#b6c3e6',
              fontFamily: 'serif',
              lineHeight: 1,
              fontWeight: 'bold',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>&ldquo;</span>
            <span style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              fontSize: '6rem',
              color: '#b6c3e6',
              fontFamily: 'serif',
              lineHeight: 1,
              fontWeight: 'bold',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>&rdquo;</span>
            <span style={{fontStyle: 'italic'}}>
            JitAi 独创的 ​JAAP 协议，赋予系统模块自描述、自加载、独立可编排的特性，打造面向 AI 的“解释型”架构。AI 可动态感知、调用、编排任意模块，将传统应用生态无缝融入 AI 体系。<br/>
            企业 AI 应用复杂且需快速迭代。JitAi 以强大架构解决“复杂”与“高效”矛盾：<br/>
            * ​矩阵型元架构：​​ 开创性统一架构模型，实现极致的复用与扩展，确保系统随复杂度增长仍保持简洁与灵活。<br/>
            ​* 高开放框架：​​ 业务层高度可编排，​复杂度与工程量降低 90%​。<br/>
            * ​图形化双模工具：​​ 支持编排与编程，​开发速度提升 10 倍，从容应对需求变化与快速迭代。<br/>
            ​* 自动化 DevOps：​​ 构建、发布、部署、运维全面简化轻量化。<br/>
            JitAi 通过 ​JAAP 协议实现 ​AI 可驱动，凭借矩阵架构与图形化工具达成​极简开发与高效运维，是企业构建复杂、灵活 AI 应用的理想技术底座。
            </span>
          </div>
          <div className={styles.featuresGrid}>
            {CONTENT.features.cards.map((card, index) => (
              <div key={index} className={styles.featureCard}>
                <h3>{card.title}</h3>
                <div className={styles.featureContent}>
                  <div className={styles.featureSection}>
                    <p dangerouslySetInnerHTML={{ __html: card.sections }}></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>{CONTENT.footer.brand.title}</h4>
            <p>{CONTENT.footer.brand.description}</p>
          </div>
          <div className={styles.footerSection}>
            <h4>{CONTENT.footer.product.title}</h4>
            <ul>
              {CONTENT.footer.product.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>{CONTENT.footer.technology.title}</h4>
            <ul>
              {CONTENT.footer.technology.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>{CONTENT.footer.contact.title}</h4>
            <p>{CONTENT.footer.contact.description}</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{CONTENT.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
