// 价格页面常量配置
export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buyoutPrice: string;
  features: string[];
  isRecommended?: boolean;
  cardType: string;
}


// 价格方案配置
const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'desktop',
    title: '桌面版许可证',
    subtitle: '本地开发必备',
    icon: '🖥️',
    monthlyPrice: '140',
    yearlyPrice: '14,00',
    buyoutPrice: '70,00',
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
    monthlyPrice: '3500',
    yearlyPrice: '35,000',
    buyoutPrice: '175,000',
    cardType: 'basicCard',
    features: [
        '✓ 用于开发/测试/生产环境',
        '✓ 2个组织',
        '✓ 1个应用',
        '✓ 在线开发',
        '✓ 仅单机运行'
    ]
  },
  {
    id: 'standard',
    title: '服务器标准版许可证',
    subtitle: '企业标准配置',
    icon: '⭐',
    monthlyPrice: '7000',
    yearlyPrice: '70,000',
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
  // {
  //   id: 'professional',
  //   title: '服务器专业版许可证',
  //   subtitle: '大型企业首选',
  //   icon: '💎',
  //   monthlyPrice: '14000',
  //   yearlyPrice: '140,000',
  //   buyoutPrice: '700,000',
  //   cardType: 'professionalCard',
  //   features: [
  //       '服务器标准版所有功能，以及',
  //       '✓ 20个组织',
  //       '✓ 10个应用',
  //   ]
  // },
  {
    id: 'enterprise',
    title: '自定义组合',
    subtitle: '批量许可证需求客户',
    icon: '🌟',
    monthlyPrice: '价格商议',
    yearlyPrice: '价格商议',
    buyoutPrice: '价格商议',
    cardType: 'enterpriseCard',
    features: [
        '✓ 更多组织数',
        '✓ 更多应用数',
        '✓ 批量许可证价格优惠',
    ]
  }
];

const CONTENT = {
  pricingPlans: PRICING_PLANS,
  title: '价格',
  subtitle: 'JitAi可部署在任意个人电脑或服务器上，按需购买对应终端规格的许可证即可',
  monthly: '按月订阅',
  yearly: '按年订阅',
  buyout: '一次性买断',
  recommendedBadge: '推荐',
  contactSales: '联系销售',
  moneyUnit: '¥',
  priceUnit: {
    monthly: '个/月',
    yearly: '个/年',
    buyout: '个/永久',
  },
  subscribe: '订阅',
  pay: '支付',
  includes: '这包括：',
  specialOffer: '特别优惠',
  specialOfferDescriptions: [
    '每个开发组织注册即送',
    '3个桌面版许可证',
    '（时长均为1个月），让你充分体验JitAi的强大功能！',
  ],
};

export default CONTENT;