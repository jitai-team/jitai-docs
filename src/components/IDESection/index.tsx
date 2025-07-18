import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  ide: {
    color: '#10b981', // 添加统一的主题颜色
    title: 'Jit 编排编程工具',
    subtitle: '编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码'
  }
};

const IDESection: React.FC = () => {
  const features = [
    {
      id: 1,
      title: '简洁统一的交互模式',
      description: '一个交互范式，统一了可视化开发和源码开发两种模式，编辑成千上万的元素',
      icon: '🎯'
    },
    {
      id: 2,
      title: '自动生成高质量代码',
      description: '生成的是"入乡随俗"的高质量原生编程语言的代码，有利于程序员理解和维护',
      icon: '⚡'
    },
    {
      id: 3,
      title: '零代码和全代码无缝切换',
      description: '代码同源，人工编辑的代码，也可被可视化编辑器识别，随时随需切换使用',
      icon: '🔄'
    },
    {
      id: 4,
      title: '可改写、可扩展',
      description: '在自己的 App 中全代码实现元素编辑器，可视化工具中就会动态添加其入口和可视化编辑器',
      icon: '🔧'
    }
  ];

  const developmentModules = [
    {
      id: 1,
      title: '门户可视化开发',
      description: '支持多门户设计，可面向不同场景设计子系统，支持多标签页和导航布局',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🏠'
    },
    {
      id: 2,
      title: '页面可视化开发',
      description: '灵活组合组件，界面完全自由排版，支持自定义组件事件和变量函数',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '📄'
    },
    {
      id: 3,
      title: '服务可视化开发',
      description: '封装复杂业务逻辑，支持API调用对接，可被前端后端函数调用',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '⚙️'
    },
    {
      id: 4,
      title: '模型可视化开发',
      description: '简化数据表模型，支持多表增删改查，内置丰富数据类型',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🗄️'
    },
    {
      id: 5,
      title: '权限可视化开发',
      description: '灵活配置用户权限，支持角色管理和访问控制，确保系统安全',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🔐'
    },
    {
      id: 6,
      title: '流程可视化开发',
      description: '定义业务审批流程，支持子流程并行节点，可同步到第三方平台',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🔄'
    },
    {
      id: 7,
      title: 'AI 助手可视化开发',
      description: '集成AI大模型能力，支持智能对话和自动化处理，提升用户体验',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🤖'
    },
    {
      id: 8,
      title: '后台任务可视化开发',
      description: '配置定时任务和后台处理，支持任务调度和状态监控',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '⏰'
    },
    {
      id: 9,
      title: '后端事件可视化开发',
      description: '定义系统事件处理，支持事件触发和响应机制，实现业务自动化',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '📡'
    },
    {
      id: 10,
      title: '文件模板可视化开发',
      description: '创建文件模板和文档生成，支持多种格式输出和批量处理',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '📋'
    },
    {
      id: 11,
      title: 'API 授权可视化开发',
      description: '管理API接口权限，支持OAuth认证和访问令牌，保障接口安全',
      link: '/docs/tutorial/00快速上手/01下载安装',
      icon: '🔑'
    }
  ];

  return (
    <AnimatedSection animationType="fadeInUp" duration={500}>
      <section
        className={`${styles.ideSection} ${globalStyles.gradientBackground}`}
        // style={{
        //   '--section-color': CONTENT.ide.color,
        //   '--card-color': CONTENT.ide.color,
        //   '--card-hover-color': CONTENT.ide.color
        // } as React.CSSProperties}
      >
        <div className={styles.container}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <div className={styles.header}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.ide.title}</h2>
              <p className={styles.subtitle}>
                {CONTENT.ide.subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* 核心特性部分 - 一排显示 */}
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <div className={styles.coreFeatures}>
              <div className={styles.featuresGrid}>
                {features.map((feature) => (
                  <div key={feature.id} className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <span className={styles.icon}>{feature.icon}</span>
                    </div>
                    <div className={styles.featureContent}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 可视化开发模块部分 */}
          <div className={styles.developmentModules}>
            <div className={styles.modulesGrid}>
              {developmentModules.map((module, index) => (
                <AnimatedSection
                  key={module.id}
                  animationType="scaleIn"
                  delay={300 + index * 50}
                  duration={400}
                >
                  <div className={styles.moduleCard}>
                    <div className={styles.moduleHeader}>
                      <h4 className={styles.moduleTitle}>{module.title}</h4>
                      <div className={styles.moduleIcon}>{module.icon}</div>
                    </div>
                    <p className={styles.moduleDescription}>{module.description}</p>
                    <a href={module.link} className={styles.detailLink}>
                      了解更多 →
                    </a>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default IDESection;