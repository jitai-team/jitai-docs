import { getIntegrations } from './integrations';

const CONTENT = {
  title: 'Jit 开发框架',
  subtitle: '基于JAAP协议的AI-Native全栈开发框架，高度集成AI应用和传统应用开发的主流技术，极大简化应用层的快速开发',
  color: '#3D65FD',
  learnMore: '了解更多',
  integrationsSubtitlePrefix: 'JitAI Framework 已集成大量第三方框架，且支持',
  integrationsSubtitleLinkText: '开发者自己扩展',
  integrationsSubtitleLink: '/zh/docs/extguide',
  frameworks: [
    {
      id: 'jitai',
      name: 'JitAi',
      description: 'AI智能体、AI助理开发框架，提供大语言模型集成、智能代理构建、AI助手开发和知识库管理能力',
      icon: '🤖',
    },
    {
      id: 'jitweb',
      name: 'JitWeb',
      description: 'Web前端框架，提供门户、页面、组件库、控件库和全局样式等',
      icon: '🌐',
    },
    {
      id: 'jitservice',
      name: 'JitService',
      description: '服务层框架，提供业务服务封装、API接口管理、外部服务集成和事件驱动架构支持',
      icon: '⚙️',
    },
    {
      id: 'jitauth',
      name: 'JitAuth',
      description: '身份认证与授权管理框架，支持多种认证方式、RBAC权限控制、组织架构管理和第三方身份系统集成',
      icon: '🔐',
    },
    {
      id: 'jitorm',
      name: 'JitORM',
      description: '对象关系映射框架，提供数据库抽象层、数据模型定义、查询构建器和数据类型系统',
      icon: '🗄️',
    },
    {
      id: 'jitstorage',
      name: 'JitStorage',
      description: '存储管理框架，提供文件存储、缓存系统、对象存储和文件模板引擎等存储解决方案',
      icon: '💾',
    },
    {
      id: 'jitworkflow',
      name: 'JitWorkflow',
      description: '工作流引擎，提供业务流程建模、审批流程管理、流程实例控制和流程监控分析',
      icon: '🔄',
    },
    {
      id: 'jittask',
      name: 'JitTask',
      description: '任务调度框架，支持定时任务、异步任务、任务队列和分布式任务执行管理',
      icon: '⏰',
    },
    {
      id: 'jitmessage',
      name: 'JitMessage',
      description: '消息通知服务框架，支持短信、邮件、推送等多种消息渠道的统一管理和发送',
      icon: '📨',
    },
    {
      id: 'jitpay',
      name: 'JitPay',
      description: '支付集成框架，提供多种支付方式接入、订单管理、交易处理和支付安全保障',
      icon: '💳',
    },
    {
      id: 'jiti18n',
      name: 'JitI18N',
      description: '国际化与本地化框架，支持多语言翻译、区域化设置和动态语言包管理',
      icon: '🌍',
    },
    {
      id: 'jitcommons',
      name: 'JitCommons',
      description: '通用工具库，提供常用的工具类、辅助函数、全局变量等，提升开发效率',
      icon: '🛠️',
    }
  ],
  integrations: getIntegrations('zh')
};

export default CONTENT;