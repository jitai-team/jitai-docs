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
    title: 'Desktop License', 
    subtitle: 'Essential for Local Development',
    icon: '🖥️',
    monthlyPrice: '700',
    yearlyPrice: '7,000',
    buyoutPrice: '35,000',
    cardType: 'desktopCard',
    features: [
      '✓ Development environment only',
      '✓ Unlimited organizations',
      '✓ Unlimited applications',
      '✓ Desktop development',
      '✓ Online development',
      '✓ Single process only',
      '✓ Single machine only'
    ]
  },
  {
    id: 'basic',
    title: 'Server Basic License',
    subtitle: 'Entry Choice for SMEs',
    icon: '🚀',
    monthlyPrice: '3500',
    yearlyPrice: '35,000',
    buyoutPrice: '175,000',
    cardType: 'basicCard',
    features: [
        '✓ For development/testing/production environments',
        '✓ 2 organizations',
        '✓ 1 application',
        '✓ Online development',
        '✓ Single process only',
        '✓ Single machine only'
    ]
  },
  {
    id: 'standard',
    title: 'Server Standard License',
    subtitle: 'Enterprise Standard Configuration',
    icon: '⭐',
    monthlyPrice: '7000',
    yearlyPrice: '70,000',
    buyoutPrice: '350,000',
    cardType: 'standardCard',
    isRecommended: true,
    features: [
        'All Server Basic features, plus',
        '✓ 10 organizations',
        '✓ 5 applications',
        '✓ Cluster environment support'
    ]
  },
  {
    id: 'professional',
    title: 'Server Pro License',
    subtitle: 'First Choice for Large Enterprises',
    icon: '💎',
    monthlyPrice: '14000',
    yearlyPrice: '140,000',
    buyoutPrice: '700,000',
    cardType: 'professionalCard',
    features: [
        'All Server Standard features, plus',
        '✓ 20 organizations',
        '✓ 10 applications',
    ]
  },
  {
    id: 'enterprise',
    title: 'Custom Package',
    subtitle: 'For Bulk License Customers',
    icon: '🌟',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    buyoutPrice: 'Custom',
    cardType: 'enterpriseCard',
    features: [
        '✓ More organizations',
        '✓ More applications',
        '✓ Bulk license discounts',
    ]
  }
];

const CONTENT = {
  pricingPlans: PRICING_PLANS,
  title: 'Pricing',
  subtitle: 'JitAi can be deployed on any personal computer or server. Purchase the appropriate license for your deployment needs',
  monthly: 'Monthly',
  yearly: 'Yearly',
  buyout: 'One-time',
  recommendedBadge: 'Recommended',
  contactSales: 'Contact Sales',
  moneyUnit: '$',
  priceUnit: {
    monthly: 'per month',
    yearly: 'per year',
    buyout: '',
  },
  subscribe: 'Subscribe',
  pay: 'Pay',
  includes: 'This includes:',
  specialOffer: 'Special Offer',
  specialOfferDescriptions: [
    'Each registered development organization receives',
    '3 desktop licenses',
    '(valid for 1 month), allowing you to fully experience the powerful features of JitAi!',
  ],
};

export default CONTENT;