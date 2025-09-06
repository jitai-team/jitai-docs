// 价格页面常量配置
export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  subscriptionPrice: string;
  buyoutPrice: string;
  features: string[];
  isRecommended?: boolean;
  cardType: string;
}

export interface TabConfig {
  key: 'subscription' | 'buyout';
  icon: string;
  text: string;
}

// 标签页配置
export const TABS: TabConfig[] = [
  {
    key: 'subscription',
    icon: '📅',
    text: '订阅模式'
  },
  {
    key: 'buyout',
    icon: '💎',
    text: '买断模式'
  }
];

// 价格方案配置
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'desktop',
    title: '桌面版许可证',
    subtitle: '本地开发必备',
    icon: '🖥️',
    subscriptionPrice: '7,000',
    buyoutPrice: '35,000',
    cardType: 'desktopCard',
    features: [
      '✓ 仅用于开发环境',
      '✓ 无限组织数',
      '✓ 无限应用数',
      '✓ 桌面端开发',
      '✓ 在线开发',
      '✓ 仅单进程运行',
      '✓ 仅单机运行'
    ]
  },
  {
    id: 'basic',
    title: '服务器基础版许可证',
    subtitle: '中小企业入门选择',
    icon: '🚀',
    subscriptionPrice: '35,000',
    buyoutPrice: '175,000',
    cardType: 'basicCard',
    features: [
        '✓ 用于开发/测试/生产环境',
        '✓ 2个组织',
        '✓ 1个应用',
        '✓ 在线开发',
        '✓ 仅单进程运行',
        '✓ 仅单机运行'
    ]
  },
  {
    id: 'standard',
    title: '服务器标准版许可证',
    subtitle: '企业标准配置',
    icon: '⭐',
    subscriptionPrice: '70,000',
    buyoutPrice: '350,000',
    cardType: 'standardCard',
    isRecommended: true,
    features: [
        '服务器基础版所有功能，以及',
        '✓ 10个组织',
        '✓ 5个应用',
        '✓ 可加入集群环境'
    ]
  },
  {
    id: 'professional',
    title: '服务器专业版许可证',
    subtitle: '大型企业首选',
    icon: '💎',
    subscriptionPrice: '140,000',
    buyoutPrice: '700,000',
    cardType: 'professionalCard',
    features: [
        '服务器标准版所有功能，以及',
        '✓ 20个组织',
        '✓ 10个应用',
    ]
  },
  {
    id: 'enterprise',
    title: '服务器全能版许可证',
    subtitle: 'SaaS服务商专享',
    icon: '🌟',
    subscriptionPrice: '700,000',
    buyoutPrice: '3,500,000',
    cardType: 'enterpriseCard',
    features: [
        '服务器专业版所有功能，以及',
        '✓ 无限组织数',
        '✓ 无限应用数',
    ]
  }
];
