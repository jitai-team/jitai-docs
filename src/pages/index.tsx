import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

// 文案内容配置
const CONTENT = {
  // 导航菜单
  navItems: [
    { id: 0, label: '首页' },
    { id: 1, label: '产品介绍' },
    { id: 2, label: '核心优势' },
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
        icon: '🚀',
        title: 'JIT AI应用平台',
        description: '开箱即用、跨平台、跨端、在线更新、自主加载应用。全面支持 JAAP 协议，支持应用模块智能化即时识别和调用、图形化即时编排和构建'
      },
      {
        icon: '⚙️',
        title: 'JIT 编排编程框架',
        description: '为 AI 集成和 GUI 编排而生的编排式编程框架，简洁、灵活、高集成度、无限扩展，极简化业务应用层'
      },
      {
        icon: '🛠️',
        title: 'Jit 编排编程工具',
        description: '编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码，极大降低门槛、提供效率和质量'
      },
      {
        icon: '🔧',
        title: 'Jit DevOps运维管理工具',
        description: '服务器端也像浏览器端一样的"自动按需加载最新应用"，私有化环境下自动部署更新'
      },
      {
        icon: '📋',
        title: '开放标准的AI应用协议',
        description: '智能化动态感知和调用、GUI图形化实时编排和构建。'
      },
      {
        icon: '🔄',
        title: '应用级继承机制',
        description: '零依赖、无侵入、可改写、可扩展的应用和模块的复用机制，优雅的解决复用和扩展的矛盾'
      }
    ]
  },

  // 核心优势
  advantages: {
    title: '为什么选择 JitAi ?',
    cards: [
      {
        title: '灵动：灵活、动态',
        traditional: {
          title: '传统技术体系的局限：',
          content: '传统技术体系中，每个模块的"使用说明书"都存储在开发者的文档库或大脑中，AI无法获取和感知，无法动态决策使用哪个模块、如何使用。传统技术体系采用"编译型"架构，模块间关联是硬编码的、静态依赖高耦合的，AI无法按需动态加载和调用不同模块，开发者也无法快速为AI编排所需工具。'
        },
        solution: {
          title: 'JitAi的解决方案：',
          content: 'JitAi设计制定JAAP协议，让应用系统及其构成模块都具备自描述、自加载、高度独立、可替代、可扩展、可编排的特性，让应用系统及其模块成为可被AI动态感知、动态调用、动态编排的解释型系统和模块，让传统应用生态完美融入AI技术体系，被AI动态感知、使用和驱动。'
        }
      },
      {
        title: '轻快：轻量、快速',
        traditional: {
          title: '传统开发的挑战：',
          content: '企业AI应用比传统企业管理软件更纵深更复杂，且AI应用功能难以规划，需要"边用边改"，快速开发、快速反馈、快速迭代成了项目成功的前提。AI应用开发面临着"系统更复杂"与"开发更高效"相互冲突的难题。'
        },
        solution: {
          title: 'JitAi的突破：',
          content: '基于解释型系统特性，JitAi设计了无与伦比的复用扩展机制：跨应用的模块继承机制、模块类型机制、矩阵型元架构模型。提供高集成度的平台、高复用度和高扩展性的开发框架、图形化的编排工具和编程工具，让业务应用开发更简单、更轻量、更灵活、更高效。'
        }
      }
    ]
  },

  // 技术特性
  features: {
    title: 'JitAi技术体系特性',
    cards: [
      {
        title: '企业级AI应用',
        sections: `企业级AI应用分为管理类和助理类：\n\n管理类应用广泛覆盖企业各部门，实现高效协同与信息流转，推动企业整体运转效率提升。助理类应用聚焦业务流程某一环节，集成多种工具，提升岗位生产力。\n\nJitAi助理开发框架支持系统内外模块、后端与前端UI的灵活集成，助力开发高复杂度、高集成度的企业级AI应用。JitAi既能开发传统软件（如ERP、CRM、OA），也能开发与之无缝融合的AI智件。\n\n通过可视化编排工具，JitAi平台、外部服务、内部模块都能作为tools编排进AI智能体，极大丰富AI智能体的能力。JitAi让企业快速拥有原生一体化的AI智能助理应用，简化和加速AI智件开发进程。`
      },
      {
        title: '生产级AI应用（AI与UI）',
        sections: `生产级AI应用强调安全合规与稳定可控。JitAi通过精细化权限控制，保障智能体功能和数据安全。\n\nJitAi的AI-UI交互机制，支持AI与用户协作完成任务，满足生产级智能体的稳定可控需求。\n\nJitAi系统的元素模块天然面向AI和UI，支持动态感知、可视化编排和开发。AI-UI友好特性简化了复杂场景下的应用开发。助理类应用的复杂度和差异化远超管理类，JitAi以动态感知和可视化编排技术，支撑AI时代的应用开发。`
      },
      {
        title: '极简开发（编排和编程）',
        sections: `JitAi倡导结构化思维，强调"程序=结构+算法""系统=结构+过程"。结构化设计简化过程实现，提升开发效率。\n\nJitAi通用系统模型具备高通用性、高集成度、高复用度和高可视化，所有模块基于元素规范，具备自描述、动态加载、解耦和可替换特性。\n\nJitAi提供可视化编排和编程工具，声明式结构与命令式过程分离，极大简化业务开发。`
      },
      {
        title: '编排编程开发框架和矩阵型系统架构模型',
        sections: `JitAi元素三层架构（meta-type-实例）具备自描述、自加载、可扩展、可替换、可编排等特性，AI&GUI友好。\n\n元素机制实现模块间彻底隔离和最大化封闭/开放，三层结构模式提升通用部分复用和差异部分自由度。\n\nJitAi设计了跨应用继承、模块类型、矩阵型元架构等机制，实现极致关注点分离，提升开发效率和系统灵活性。`
      },
      {
        title: '零代码和低代码',
        sections: `JitAi具备强大的零代码和低代码能力，图形化编排和编程工具基于应用协议和框架，结合代码生成技术，极大提升开发效率。\n\nJitAi图形化开发工具不设限，开发者可自由切换图形化与手写代码，兼具易用性与无限扩展性。`
      },
      {
        title: '部署和更新',
        sections: `JitAi支持平台和应用的自动化部署与更新，服务器端可像浏览器端一样自动加载最新应用。\n\n支持分布式部署和一键分布式部署，极大简化私有化环境下的运维。`
      },
      {
        title: '集成和被集成',
        sections: `JitAi具备强大的集成能力，可自动生成调用外部API的服务元素，轻松集成任意接口。\n\n支持企业级管理系统的横向集成和助理系统的纵向集成，基于JAAP协议和三层结构，任何接口和技术都能封装为高集成度、复用度、灵活度的元素化模块。\n\nJitAi应用可将任意元素模块封装为对外API，天然支持微服务架构。`
      }
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

      console.log('开始打字:', currentTitle);
      console.log('清理后文本:', cleanText);
      console.log('字符数组:', textArray);

      setIsTyping(true);
      setDisplayedText('');
      setIsFading(false);

      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < textArray.length) {
          const nextChar = textArray[currentIndex];
          console.log(`显示字符 ${currentIndex}:`, nextChar);
          setDisplayedText(prev => prev + nextChar);
          currentIndex++;
        } else {
          console.log('打字完成');
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
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={`${styles.heroTitle} ${isFading ? styles.fadeOut : ''}`}>
              {/* {(() => {
                const lines = displayedText.split('\n');
                // 拼接所有行，最后一行后面加光标
                return lines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < lines.length - 1 && <br />}
                  </React.Fragment>
                ));
              })()} */}

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
          <div className={styles.heroRight}>
            <div className={styles.animationContainer}>
              <div className={styles.jitaiAnimation}>
                <div className={styles.jitaiText}>
                  <span className={styles.jit}>JIT</span>
                  <span className={styles.plus}>+</span>
                  <span className={styles.ai}>AI</span>
                </div>
                <div className={styles.subtitle}>Just In Time AI</div>
                <div className={styles.description}>即时快速构建AI应用</div>
              </div>
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
              企业AI应用比传统企业管理软件更纵深更复杂，且AI应用的功能难以规划，需要"边用边改"，快速开发、快速反馈、快速迭代成了项目成功的前提。AI应用开发面临着"系统更复杂"、"开发更高效"的相互冲突的难题。
基于解释型系统特性，JitAi设计了无与伦比的复用扩展机制和模型：跨应用的模块继承机制、模块类型机制、矩阵型元架构模型；提供了高集成度的平台、高复用度和高扩展性的开发框架、图形化的编排工具和编程工具。让业务应用开发更简单、更轻量、更灵活、更高效，让开发者轻松面对AI应用的复杂多变和快速迭代，快速构建AI功能和传统功能原生一体化的AI应用系统。
其中，矩阵型元架构是通用的高度复用的系统架构，其绝无仅有的灵活性扩展性保障了：无论多么复杂的应用场景，系统都能一直保持简洁和灵活。并且，矩阵型元架构的结构化特性，让整个系统具备高度可编排性。
高度复用和高度开放的开发框架，高度封装了大量的应用技术实现，大大简化了业务应用层，让业务应用层轻量、简单、高度可扩展性和高度可编排性。
图形化编排和编程工具，基于图形界面构建业务应用，自动生成业务层代码，进一步大幅提高开发效率和质量。
            </span>
          </div>
          <div className={styles.featuresGrid}>
            {CONTENT.features.cards.map((card, index) => (
              <div key={index} className={styles.featureCard}>
                <h3>{card.title}</h3>
                <div className={styles.featureContent}>
                  <div className={styles.featureSection}>
                    <p>{card.sections}</p>
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
