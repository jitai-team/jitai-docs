import React from 'react';
import styles from './styles.module.css';
import globalStyles from '../../pages/index.module.css';
import AnimatedSection from '../AnimatedSection';

const CONTENT = {
  title: 'Jit 开发框架',
  subtitle: '基于JAAP的企业级应用开发框架，提供从基础设施到业务层组件的全栈技术底座',
  frameworks: [
    {
      id: 'jitai',
      name: 'JitAi',
      description: '人工智能框架，提供大语言模型集成、智能代理构建、AI助手开发和知识库管理能力',
      icon: '🤖',
      color: '#2449fe'
    },
    {
      id: 'jitweb',
      name: 'JitWeb',
      description: 'Web前端框架，提供门户、页面、组件库、控件库和全局样式等',
      icon: '🌐',
      color: '#ca4ba7'
    },
    {
      id: 'jitservice',
      name: 'JitService',
      description: '服务层框架，提供业务服务封装、API接口管理、外部服务集成和事件驱动架构支持',
      icon: '⚙️',
      color: '#00b894'
    },
    {
      id: 'jitauth',
      name: 'JitAuth',
      description: '身份认证与授权管理框架，支持多种认证方式、RBAC权限控制、组织架构管理和第三方身份系统集成',
      icon: '🔐',
      color: '#fdcb6e'
    },
    {
      id: 'jitorm',
      name: 'JitORM',
      description: '对象关系映射框架，提供数据库抽象层、数据模型定义、查询构建器和数据类型系统',
      icon: '🗄️',
      color: '#6c5ce7'
    },
    {
      id: 'jitstorage',
      name: 'JitStorage',
      description: '存储管理框架，提供文件存储、缓存系统、对象存储和文件模板引擎等存储解决方案',
      icon: '💾',
      color: '#fd79a8'
    },
    {
      id: 'jitworkflow',
      name: 'JitWorkflow',
      description: '工作流引擎，提供业务流程建模、审批流程管理、流程实例控制和流程监控分析',
      icon: '🔄',
      color: '#00cec9'
    },
    {
      id: 'jittask',
      name: 'JitTask',
      description: '任务调度框架，支持定时任务、异步任务、任务队列和分布式任务执行管理',
      icon: '⏰',
      color: '#e17055'
    },
    {
      id: 'jitmessage',
      name: 'JitMessage',
      description: '消息通知服务框架，支持短信、邮件、推送等多种消息渠道的统一管理和发送',
      icon: '📨',
      color: '#74b9ff'
    },
    {
      id: 'jitpay',
      name: 'JitPay',
      description: '支付集成框架，提供多种支付方式接入、订单管理、交易处理和支付安全保障',
      icon: '💳',
      color: '#55a3ff'
    },
    {
      id: 'jiti18n',
      name: 'JitI18N',
      description: '国际化与本地化框架，支持多语言翻译、区域化设置和动态语言包管理',
      icon: '🌍',
      color: '#a29bfe'
    },
    {
      id: 'jitcommons',
      name: 'JitCommons',
      description: '通用工具库，提供常用的工具类、辅助函数、全局变量等，提升开发效率',
      icon: '🛠️',
      color: '#fd79a8'
    }
  ]
};

const FrameworkSection: React.FC = () => {
  return (
    <AnimatedSection animationType="fadeInUp" duration={1000}>
      <section id="section-framework" className={`${styles.frameworkSection} ${globalStyles.gradientBackground}`}>
        <div className={globalStyles.sectionContent}>
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <div className={styles.headerSection}>
              <h2 className={globalStyles.sectionTitle}>{CONTENT.title}</h2>
              <p className={styles.sectionSubtitle}>
                {CONTENT.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.frameworksGrid}>
            {CONTENT.frameworks.map((framework, index) => (
              <AnimatedSection
                key={index}
                animationType="scaleIn"
                delay={400 + index * 80}
                duration={600}
              >
                <a
                  // href={`/jit-framework#${framework.id}`}
                  className={`${globalStyles.baseCard} ${styles.frameworkCard} ${styles.frameworkLink} animatedChild`}
                  style={{ '--card-color': framework.color } as React.CSSProperties}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <span className={styles.iconEmoji}>{framework.icon}</span>
                    </div>
                    <h3 className={styles.frameworkName}>{framework.name}</h3>
                  </div>
                  <p className={styles.frameworkDescription}>{framework.description}</p>
                  <div className={styles.linkIndicator}>
                    <span>了解更多</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default FrameworkSection;