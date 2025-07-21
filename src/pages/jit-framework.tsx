import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import styles from './jit-framework.module.css';

const LayoutComponent = Layout as any;

const FRAMEWORK_DETAILS = {
  title: 'Jit开发框架详解',
  subtitle: '深入了解JitAi开发框架的各个核心模块，掌握企业级应用开发的全栈技术栈',
  frameworks: [
    {
      id: 'jitai',
      name: 'JitAi',
      icon: '🤖',
      color: '#2449fe',
      description: '人工智能框架，提供大语言模型集成、智能代理构建、AI助手开发和知识库管理能力',
      details: {
        overview: 'JitAi是Jit开发框架中的核心AI模块，专门为构建智能应用而设计。它提供了完整的AI能力集成方案，让开发者能够轻松地将人工智能功能集成到企业级应用中。',
        features: [
          '大语言模型集成：支持多种主流LLM，包括GPT、Claude、文心一言等',
          '智能代理构建：提供Agent开发框架，支持多轮对话、工具调用、知识检索',
          'AI助手开发：内置助手编排系统，支持对话流程设计和个性化定制',
          '知识库管理：支持文档上传、向量化存储、语义检索和知识图谱构建',
          '模型管理：统一的模型配置、版本管理和性能监控',
          '对话管理：多轮对话上下文管理、会话状态保持和对话历史记录'
        ],
        useCases: [
          '智能客服系统',
          '文档智能助手',
          '知识问答系统',
          '业务流程自动化',
          '数据分析助手'
        ],
        architecture: '采用微服务架构，支持水平扩展。核心组件包括模型服务、对话引擎、知识库服务和编排引擎。'
      }
    },
    {
      id: 'jitweb',
      name: 'JitWeb',
      icon: '🌐',
      color: '#ca4ba7',
      description: 'Web前端框架，提供门户、页面、组件库、控件库和全局样式等',
      details: {
        overview: 'JitWeb是专门为企业级Web应用设计的前端框架，提供了完整的UI组件体系和开发工具链。它基于现代前端技术栈，支持响应式设计和无障碍访问。',
        features: [
          '门户系统：企业级门户框架，支持多租户和个性化定制',
          '页面引擎：动态页面构建系统，支持拖拽式页面设计',
          '组件库：丰富的UI组件库，包含表单、表格、图表、导航等',
          '控件库：业务控件库，提供行业特定的功能组件',
          '全局样式：统一的设计系统，确保视觉一致性',
          '主题系统：支持多主题切换和品牌定制',
          '响应式设计：自适应布局，支持各种设备尺寸'
        ],
        useCases: [
          '企业门户网站',
          '管理后台系统',
          '数据可视化平台',
          '移动端应用',
          '多端统一体验'
        ],
        architecture: '基于React生态系统，采用组件化开发模式。支持TypeScript、状态管理、路由系统等现代前端技术。'
      }
    },
    {
      id: 'jitservice',
      name: 'JitService',
      icon: '⚙️',
      color: '#00b894',
      description: '服务层框架，提供业务服务封装、API接口管理、外部服务集成和事件驱动架构支持',
      details: {
        overview: 'JitService是Jit框架的服务层核心，提供了完整的后端服务开发能力。它采用微服务架构，支持高并发、高可用的企业级应用开发。',
        features: [
          '业务服务封装：标准化的服务开发模式，提供统一的接口规范',
          'API接口管理：自动生成API文档，支持接口版本管理和测试',
          '外部服务集成：简化的第三方服务接入，支持多种协议',
          '事件驱动架构：基于事件的消息传递机制，支持异步处理',
          '服务发现：自动服务注册和发现机制',
          '负载均衡：智能负载分配和故障转移',
          '监控告警：实时性能监控和异常告警'
        ],
        useCases: [
          '微服务架构应用',
          'API网关系统',
          '事件驱动系统',
          '第三方集成',
          '高并发服务'
        ],
        architecture: '基于Spring Boot生态系统，支持Docker容器化部署。采用RESTful API设计，支持GraphQL和gRPC协议。'
      }
    },
    {
      id: 'jitauth',
      name: 'JitAuth',
      icon: '🔐',
      color: '#fdcb6e',
      description: '身份认证与授权管理框架，支持多种认证方式、RBAC权限控制、组织架构管理和第三方身份系统集成',
      details: {
        overview: 'JitAuth提供了企业级的安全认证和授权解决方案，支持多种认证方式和完善的权限管理体系。它确保了应用的安全性和合规性。',
        features: [
          '多种认证方式：支持用户名密码、OAuth2.0、SAML、LDAP等',
          'RBAC权限控制：基于角色的访问控制，支持细粒度权限管理',
          '组织架构管理：支持多级组织架构和部门权限管理',
          '第三方身份系统集成：支持企业AD、钉钉、企业微信等',
          '单点登录：SSO解决方案，支持多应用统一登录',
          '安全审计：完整的操作日志和审计追踪',
          '密码策略：可配置的密码强度和过期策略'
        ],
        useCases: [
          '企业统一身份认证',
          '多系统单点登录',
          '权限管理系统',
          '合规审计系统',
          '第三方身份集成'
        ],
        architecture: '采用OAuth2.0和OpenID Connect标准，支持JWT令牌。提供RESTful API和SDK，支持多种编程语言。'
      }
    },
    {
      id: 'jitorm',
      name: 'JitORM',
      icon: '🗄️',
      color: '#6c5ce7',
      description: '对象关系映射框架，提供数据库抽象层、数据模型定义、查询构建器和数据类型系统',
      details: {
        overview: 'JitORM是Jit框架的数据访问层，提供了强大的数据库操作能力。它简化了数据库操作，提高了开发效率，同时保证了数据安全。',
        features: [
          '数据库抽象层：支持多种数据库，包括MySQL、PostgreSQL、Oracle等',
          '数据模型定义：声明式数据模型，支持自动表结构生成',
          '查询构建器：链式查询API，支持复杂查询和动态条件',
          '数据类型系统：强类型的数据映射，支持自定义数据类型',
          '事务管理：声明式事务，支持分布式事务',
          '数据迁移：版本化的数据库结构变更管理',
          '性能优化：查询缓存、连接池、索引优化等'
        ],
        useCases: [
          '企业数据管理系统',
          '报表分析系统',
          '数据仓库应用',
          '高并发数据处理',
          '复杂业务逻辑实现'
        ],
        architecture: '基于JPA规范，支持多种ORM框架。提供统一的API接口，支持读写分离和分库分表。'
      }
    },
    {
      id: 'jitstorage',
      name: 'JitStorage',
      icon: '💾',
      color: '#fd79a8',
      description: '存储管理框架，提供文件存储、缓存系统、对象存储和文件模板引擎等存储解决方案',
      details: {
        overview: 'JitStorage提供了完整的存储解决方案，包括文件存储、缓存、对象存储等多种存储方式。它统一了存储接口，简化了存储操作。',
        features: [
          '文件存储：支持本地存储、云存储和分布式存储',
          '缓存系统：多级缓存架构，支持Redis、Memcached等',
          '对象存储：支持S3兼容的对象存储服务',
          '文件模板引擎：动态文件生成和模板渲染',
          '文件管理：版本控制、权限管理和元数据管理',
          '存储优化：自动压缩、去重和归档',
          '备份恢复：自动备份策略和灾难恢复'
        ],
        useCases: [
          '文档管理系统',
          '媒体资源管理',
          '报表生成系统',
          '缓存加速系统',
          '文件共享平台'
        ],
        architecture: '采用插件化架构，支持多种存储后端。提供统一的API接口，支持CDN加速和边缘计算。'
      }
    },
    {
      id: 'jitworkflow',
      name: 'JitWorkflow',
      icon: '🔄',
      color: '#00cec9',
      description: '工作流引擎，提供业务流程建模、审批流程管理、流程实例控制和流程监控分析',
      details: {
        overview: 'JitWorkflow是强大的工作流引擎，支持复杂的业务流程建模和执行。它提供了可视化的流程设计工具和完善的流程管理功能。',
        features: [
          '业务流程建模：可视化流程设计，支持BPMN标准',
          '审批流程管理：灵活的审批规则和权限控制',
          '流程实例控制：流程启动、暂停、恢复和终止',
          '流程监控分析：实时监控和性能分析',
          '任务分配：智能任务分配和负载均衡',
          '流程版本管理：支持流程版本控制和回滚',
          '集成能力：与外部系统的无缝集成'
        ],
        useCases: [
          '审批管理系统',
          '业务流程自动化',
          '项目管理工具',
          '合规流程管理',
          '客户服务流程'
        ],
        architecture: '基于BPMN 2.0标准，采用事件驱动架构。支持分布式部署和水平扩展。'
      }
    },
    {
      id: 'jittask',
      name: 'JitTask',
      icon: '⏰',
      color: '#e17055',
      description: '任务调度框架，支持定时任务、异步任务、任务队列和分布式任务执行管理',
      details: {
        overview: 'JitTask提供了强大的任务调度和执行能力，支持各种类型的任务处理。它确保了任务的可靠执行和系统的稳定性。',
        features: [
          '定时任务：支持Cron表达式和灵活的调度策略',
          '异步任务：异步任务处理，提高系统响应速度',
          '任务队列：支持多种队列类型和优先级管理',
          '分布式任务执行：支持集群部署和任务分发',
          '任务监控：实时任务状态监控和异常处理',
          '重试机制：智能重试策略和失败处理',
          '资源管理：CPU和内存资源限制和监控'
        ],
        useCases: [
          '定时报表生成',
          '数据同步任务',
          '批量数据处理',
          '系统维护任务',
          '异步消息处理'
        ],
        architecture: '采用分布式架构，支持集群部署。提供RESTful API和WebSocket实时通信。'
      }
    },
    {
      id: 'jitmessage',
      name: 'JitMessage',
      icon: '📨',
      color: '#74b9ff',
      description: '消息通知服务框架，支持短信、邮件、推送等多种消息渠道的统一管理和发送',
      details: {
        overview: 'JitMessage提供了统一的消息通知服务，支持多种消息渠道。它简化了消息发送的复杂性，提供了可靠的消息传递机制。',
        features: [
          '多渠道支持：短信、邮件、推送通知、微信、钉钉等',
          '统一管理：统一的消息配置和发送接口',
          '模板系统：支持消息模板和动态内容替换',
          '发送策略：智能发送策略和失败重试',
          '消息追踪：完整的消息发送状态追踪',
          '批量发送：支持批量消息发送和队列处理',
          '统计分析：消息发送统计和效果分析'
        ],
        useCases: [
          '系统通知服务',
          '营销消息推送',
          '告警通知系统',
          '用户消息中心',
          '多渠道营销'
        ],
        architecture: '采用微服务架构，支持水平扩展。提供统一的API接口和SDK，支持多种编程语言。'
      }
    },
    {
      id: 'jitpay',
      name: 'JitPay',
      icon: '💳',
      color: '#55a3ff',
      description: '支付集成框架，提供多种支付方式接入、订单管理、交易处理和支付安全保障',
      details: {
        overview: 'JitPay提供了完整的支付解决方案，支持多种支付方式和支付场景。它确保了支付的安全性和可靠性。',
        features: [
          '多种支付方式：支付宝、微信支付、银联、PayPal等',
          '订单管理：完整的订单生命周期管理',
          '交易处理：安全可靠的交易处理机制',
          '支付安全保障：多重安全验证和风控措施',
          '退款处理：自动退款和手动退款支持',
          '对账系统：自动对账和异常处理',
          '统计分析：交易统计和财务报表'
        ],
        useCases: [
          '电商支付系统',
          '在线充值服务',
          '会员订阅系统',
          '企业收款平台',
          '跨境支付服务'
        ],
        architecture: '采用多层安全架构，支持PCI DSS合规。提供统一的API接口和Webhook回调机制。'
      }
    },
    {
      id: 'jiti18n',
      name: 'JitI18N',
      icon: '🌍',
      color: '#a29bfe',
      description: '国际化与本地化框架，支持多语言翻译、区域化设置和动态语言包管理',
      details: {
        overview: 'JitI18N提供了完整的国际化解决方案，支持多语言应用开发。它简化了国际化开发的复杂性，提供了灵活的本地化配置。',
        features: [
          '多语言翻译：支持多种语言和翻译管理',
          '区域化设置：时区、货币、日期格式等本地化配置',
          '动态语言包：支持运行时语言包更新',
          '翻译工具：集成翻译工具和术语管理',
          '文化适配：支持不同文化的UI适配',
          'RTL支持：支持从右到左的语言显示',
          '性能优化：语言包缓存和按需加载'
        ],
        useCases: [
          '多语言网站',
          '国际化应用',
          '跨境电商平台',
          '全球服务系统',
          '本地化产品'
        ],
        architecture: '基于i18next标准，支持多种翻译后端。提供统一的API接口和开发工具。'
      }
    },
    {
      id: 'jitcommons',
      name: 'JitCommons',
      icon: '🛠️',
      color: '#fd79a8',
      description: '通用工具库，提供常用的工具类、辅助函数、全局变量等，提升开发效率',
      details: {
        overview: 'JitCommons是Jit框架的通用工具库，提供了丰富的工具类和辅助函数。它提高了开发效率，减少了重复代码。',
        features: [
          '工具类：字符串处理、日期时间、数学计算等',
          '辅助函数：常用业务逻辑的封装函数',
          '全局变量：系统配置和常量定义',
          '验证工具：数据验证和格式检查',
          '加密工具：数据加密和哈希算法',
          '日志工具：统一的日志记录和管理',
          '异常处理：标准化的异常处理机制'
        ],
        useCases: [
          '通用业务逻辑',
          '数据处理工具',
          '系统配置管理',
          '开发辅助工具',
          '代码复用库'
        ],
        architecture: '采用模块化设计，支持按需加载。提供统一的API接口和详细的文档说明。'
      }
    }
  ]
};

const JitFrameworkPage: React.FC = () => {
  useEffect(() => {
    // 添加页面标识
    document.body.setAttribute('data-page-id', 'jit-framework');

    // 隐藏Docusaurus默认navbar
    const hideDefaultNavbar = () => {
      const defaultNavbars = document.querySelectorAll('.theme-layout-navbar, .navbar--fixed-top, [data-theme="light"] .navbar, [data-theme="dark"] .navbar, .navbar:not(.custom-navbar)');
      defaultNavbars.forEach(navbar => {
        if (navbar instanceof HTMLElement) {
          navbar.style.display = 'none';
          navbar.style.visibility = 'hidden';
          navbar.style.opacity = '0';
          navbar.style.height = '0';
          navbar.style.overflow = 'hidden';
        }
      });
    };

    // 立即执行一次
    hideDefaultNavbar();

    // 监听DOM变化，确保在动态加载时也能隐藏
    const observer = new MutationObserver(hideDefaultNavbar);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // 清理页面标识
      document.body.removeAttribute('data-page-id');
    };
  }, []);

  return (
    <LayoutComponent title="Jit开发框架详解" description="深入了解JitAi开发框架的各个核心模块">
      <div className={styles.container}>
        <Navbar />
        <div className={styles.header}>
          <h1 className={styles.title}>{FRAMEWORK_DETAILS.title}</h1>
          <p className={styles.subtitle}>{FRAMEWORK_DETAILS.subtitle}</p>
        </div>

        <div className={styles.content}>
          {FRAMEWORK_DETAILS.frameworks.map((framework, index) => (
            <section key={framework.id} id={framework.id} className={styles.frameworkSection}>
              <div className={styles.frameworkHeader}>
                <div className={styles.frameworkIcon} style={{ backgroundColor: framework.color + '20' }}>
                  <span className={styles.iconEmoji}>{framework.icon}</span>
                </div>
                <div className={styles.frameworkInfo}>
                  <h2 className={styles.frameworkName}>{framework.name}</h2>
                  <p className={styles.frameworkDescription}>{framework.description}</p>
                </div>
              </div>

              <div className={styles.frameworkContent}>
                <div className={styles.overview}>
                  <h3>概述</h3>
                  <p>{framework.details.overview}</p>
                </div>

                <div className={styles.features}>
                  <h3>核心功能</h3>
                  <ul>
                    {framework.details.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.useCases}>
                  <h3>应用场景</h3>
                  <ul>
                    {framework.details.useCases.map((useCase, idx) => (
                      <li key={idx}>{useCase}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.architecture}>
                  <h3>技术架构</h3>
                  <p>{framework.details.architecture}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default JitFrameworkPage;