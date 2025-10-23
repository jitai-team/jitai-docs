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
  links?: {
    monthly: string;
    yearly: string;
    buyout: string;
  };
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
    ],
    links: {
      monthly: 'https://buy.stripe.com/test_dRm7sLe24dnv0NU6u8ebu00',
      yearly: '/zh/pricing/desktop/yearly',
      buyout: '/zh/pricing/desktop/buyout',
    }
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
    ],
    links: {
      monthly: '/zh/pricing/basic/monthly',
      yearly: '/zh/pricing/basic/yearly',
      buyout: '/zh/pricing/basic/buyout',
    }
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
    ],
    links: {
      monthly: '/zh/pricing/standard/monthly',
      yearly: '/zh/pricing/standard/yearly',
      buyout: '/zh/pricing/standard/buyout',
    }
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
    ],
    links: {
      monthly: '/zh/pricing/enterprise/monthly',
      yearly: '/zh/pricing/enterprise/yearly',
      buyout: '/zh/pricing/enterprise/buyout',
    }
  }
];

const CONTENT = {
  locale: 'zh',
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
    '每个开发者团队注册即送',
    '1个7天桌面版许可证',
    '，充分体验JitAi的强大功能！',
  ],
  // 弹窗相关文案
  modal: {
    title: '确认购买信息',
    teamIdLabel: '开发者团队ID',
    teamIdPlaceholder: '请输入开发者团队ID',
    teamIdRequired: '开发者团队ID为必填项',
    teamIdPattern: /^[a-z][a-z0-9]{3,19}$/,
    teamIdPatternMessage: '请输入4-20个字符，以小写字母开头，只能包含小写字母和数字',
    teamIdHelpText: '如何获取？',
    teamIdHelpLink: '/docs/devguide/installation-activation/developer-team-management#view-and-refresh-team-bind-code',
    teamTitleLabel: '开发者团队名称',
    teamTitlePlaceholder: '请输入开发者团队名称',
    purchasePlanTitle: '购买方案',
    cancelButton: '取消',
    confirmButton: '确认购买',
  },
};

export default CONTENT;