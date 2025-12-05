// 价格页面常量配置
export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  isShowPriceUnit: boolean;
  monthlyPrice: string;
  yearlyPrice: string;
  buyoutPrice: string;
  features: string[];
  isRecommended?: boolean;
  cardType: string;
  analyticsCssClass: string;
  customPayActionText?: string;
}


// 价格方案配置
const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    title: '桌面基础版许可证',
    subtitle: '注册即送 3 个',
    icon: '🖥️',
    isShowPriceUnit: false,
    customPayActionText: '下载',
    monthlyPrice: '免费',
    yearlyPrice: '免费',
    buyoutPrice: '免费',
    cardType: 'desktopCard',
    analyticsCssClass: 'analytics-download',
    features: [
      '✓ 仅用于开发环境',
      '✓ 3个应用',
      '✓ 无限组织数',
      '✓ 桌面端开发',
      '✓ 在线开发',
      '✓ 仅单进程运行',
      '✓ 仅单机运行'
    ],
  },
  {
    id: 'desktopStandard',
    title: '桌面标准版许可证',
    subtitle: '本地开发推荐',
    icon: '🖥️',
    isShowPriceUnit: true,
    monthlyPrice: '20',
    yearlyPrice: '16',
    buyoutPrice: '960',
    cardType: 'desktopCard',
    analyticsCssClass: '',
    features: [
      '桌面基础版所有功能，以及',
      '✓ 10个应用',
    ],
  },
  {
    id: 'serverBasic',
    title: '服务器基础版许可证',
    subtitle: '中小企业入门选择',
    icon: '🚀',
    isShowPriceUnit: true,
    monthlyPrice: '250',
    yearlyPrice: '200',
    buyoutPrice: '12,000',
    cardType: 'basicCard',
    isRecommended: true,
    analyticsCssClass: '',
    features: [
        '服务器基础版所有功能，以及',
        '✓ 用于开发/测试/生产环境',
        '✓ 1个应用',
        '✓ 2个组织',
        '✓ 在线开发',
        '✓ 仅单机运行'
    ],
  },
  {
    id: 'serverStandard',
    title: '服务器标准版许可证',
    subtitle: '企业标准配置',
    icon: '⭐',
    isShowPriceUnit: true,
    monthlyPrice: '500',
    yearlyPrice: '400',
    buyoutPrice: '24,000',
    cardType: 'standardCard',
    analyticsCssClass: '',
    features: [
        '服务器基础版所有功能，以及',
        '✓ 5个应用',
        '✓ 10个组织',
        '✓ 可加入集群环境'
    ],
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
  //       '✓ 10个应用',
  //       '✓ 20个组织',
  //   ]
  // }
];

// 自定义组合配置
const CUSTOM_PLAN = {
  id: 'custom',
  title: '需要更多许可证或定制方案？',
  description: '批量购买可享优惠，支持灵活定制。联系销售获取专属报价。',
  contactText: '联系销售',
    analyticsCssClass: 'analytics-contactSale',
};

const CONTENT = {
  locale: 'zh',
  pricingPlans: PRICING_PLANS,
  customPlan: CUSTOM_PLAN,
  title: '价格',
  subtitle: 'JitAi可部署在任意个人电脑或服务器上，按需购买对应终端规格的许可证即可',
  monthly: '按月订阅',
  yearly: '按年订阅',
  buyout: '一次性买断',
  yearlyBadge: '省 20%',
  recommendedBadge: '推荐',
  payActionText: {
    monthly: '订阅',
    yearly: '订阅',
    buyout: '支付',
  },
  contactSalesLink: 'https://wy.jit.pro/whwy/aicrm/s/zhcontactus',
  moneyUnit: 'US$ ',
  priceUnit: {
    monthly: '个/月',
    yearly: '个/月',
    buyout: '个/永久',
  },
  free: '免费',
  includes: '这包括：',
  // 弹窗相关文案
  modal: {
    title: '确认购买信息',
    teamIdLabel: '开发者团队ID',
    teamIdPlaceholder: '请输入开发者团队ID',
    teamIdRequired: '开发者团队ID为必填项',
    teamIdPattern: /^[a-z][a-z0-9]{3,19}$/,
    teamIdPatternMessage: '请输入4-20个字符，以小写字母开头，只能包含小写字母和数字',
    teamIdHelpText: '如何获取？',
    teamIdHelpLink: '/zh/docs/devguide/installation-activation/developer-team-management#view-team-id',
    teamTitleLabel: '开发者团队名称',
    teamTitlePlaceholder: '请输入开发者团队名称',
    purchasePlanTitle: '购买方案',
    cancelButton: '取消',
    confirmButton: '确认购买',
  },
};

export default CONTENT;