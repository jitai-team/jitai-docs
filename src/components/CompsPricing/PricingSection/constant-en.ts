
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
  customPayActionText?: string; // 自定义支付按钮文本
}


// 价格方案配置
const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    title: 'Desktop Basic License', 
    subtitle: 'Get 3 Free on Sign-up',
    icon: '🖥️',
    isShowPriceUnit: false,
    customPayActionText: 'Download',
    monthlyPrice: 'Free',
    yearlyPrice: 'Free',
    buyoutPrice: 'Free',
    cardType: 'desktopCard',
    analyticsCssClass: 'analytics-download',
    features: [
      '✓ For development environment only',
      '✓ 3 app only',
      '✓ Unlimited organizations',
      '✓ Desktop development',
      '✓ Online development',
      '✓ Single process only',
      '✓ Single machine only'
    ],
  },
  {
    id: 'desktopStandard',
    title: 'Desktop Standard License', 
    subtitle: 'Recommended for Local Development',
    icon: '🖥️',
    isShowPriceUnit: true,
    monthlyPrice: '20',
    yearlyPrice: '16',
    buyoutPrice: '960',
    cardType: 'desktopCard',
    features: [
      'All Desktop Basic features, plus',
      '✓ Up to 10 apps',
    ],
    analyticsCssClass: '',
  },
  {
    id: 'serverBasic',
    title: 'Server Basic License',
    subtitle: 'Entry Choice for SMEs',
    icon: '🚀',
    isShowPriceUnit: true,
    monthlyPrice: '250',
    yearlyPrice: '200',
    buyoutPrice: '12,000',
    cardType: 'basicCard',
    isRecommended: true,
    analyticsCssClass: '',
    features: [
        '✓ For development/testing/production environments',
        '✓ 1 app only',
        '✓ Up to 2 organizations',
        '✓ Online development',
        '✓ Single machine only'
    ],
  },
  {
    id: 'serverStandard',
    title: 'Server Standard License',
    subtitle: 'Enterprise Standard Configuration',
    icon: '⭐',
    isShowPriceUnit: true,
    monthlyPrice: '500',
    yearlyPrice: '400',
    buyoutPrice: '24,000',
    cardType: 'standardCard',
    analyticsCssClass: '',
    features: [
        'All Server Basic features, plus',
        '✓ Up to 5 apps',
        '✓ Up to 10 organizations',
        '✓ Cluster environment support'
    ],
  },
  // {
  //   id: 'professional',
  //   title: 'Server Pro License',
  //   subtitle: 'First Choice for Large Enterprises',
  //   icon: '💎',
  //   monthlyPrice: '2000',
  //   yearlyPrice: '20,000',
  //   buyoutPrice: '100,000',
  //   cardType: 'professionalCard',
  //   features: [
  //       'All Server Standard features, plus',
  //       '✓ 10 apps',
  //       '✓ 20 organizations',
  //   ]
  // }
];

// Custom plan configuration
const CUSTOM_PLAN = {
  id: 'custom',
  title: 'Need More Licenses or Custom Solutions?',
  description: 'Volume discounts available. Flexible customization supported. Contact sales for exclusive quotes.',
  contactText: 'Contact Sales',
    analyticsCssClass: 'analytics-contactSale',
};

const CONTENT = {
  locale: 'en',
  pricingPlans: PRICING_PLANS,
  customPlan: CUSTOM_PLAN,
  title: 'Pricing',
  subtitle: 'JitAi can be deployed on any personal computer or server. Purchase the appropriate license for your deployment needs',
  monthly: 'Monthly',
  yearly: 'Yearly',
  buyout: 'One-time',
  yearlyBadge: 'Save 20%',
  recommendedBadge: 'Recommended',
  payActionText: {
    monthly: 'Subscribe',
    yearly: 'Subscribe',
    buyout: 'Pay',
  },
  contactSalesLink: 'https://wy.jit.pro/whwy/aicrm/s/contactus',
  moneyUnit: '$',
  priceUnit: {
    monthly: 'per month',
    yearly: 'per month',
    buyout: '',
  },
  subscribe: 'Subscribe',
  pay: 'Pay',
  includes: 'This includes:',
  // Modal related text
  modal: {
    title: 'Confirm Purchase Information',
    teamIdLabel: 'Developer Team ID',
    teamIdPlaceholder: 'Enter developer team ID',
    teamIdRequired: 'Developer Team ID is required',
    teamIdPattern: /^[a-z][a-z0-9]{3,19}$/,
    teamIdPatternMessage: 'Please enter 4-20 characters of lowercase letters and numbers starting with lowercase letter',
    teamIdHelpText: 'How to get?',
    teamIdHelpLink: '/docs/devguide/installation-activation/developer-team-management#view-team-id',
    teamTitleLabel: 'Developer Team Title',
    teamTitlePlaceholder: 'Enter developer team title',
    purchasePlanTitle: 'Purchase Plan',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm Purchase',
  },
};

export default CONTENT;