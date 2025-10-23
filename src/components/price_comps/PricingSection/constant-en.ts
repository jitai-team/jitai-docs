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
    title: 'Desktop License', 
    subtitle: 'Essential for Local Development',
    icon: '🖥️',
    monthlyPrice: '20',
    yearlyPrice: '200',
    buyoutPrice: '1,000',
    cardType: 'desktopCard',
    features: [
      '✓ Development environment only',
      '✓ Unlimited applications',
      '✓ Unlimited organizations',
      '✓ Desktop development',
      '✓ Online development',
      '✓ Single process only',
      '✓ Single machine only'
    ],
    links: {
      monthly: 'https://buy.stripe.com/test_14AeVd6zCcjr7ci2dSebu01',
      yearly: '/en/pricing/desktop/yearly',
      buyout: '/en/pricing/desktop/buyout',
    }
  },
  {
    id: 'basic',
    title: 'Server Basic License',
    subtitle: 'Entry Choice for SMEs',
    icon: '🚀',
    monthlyPrice: '500',
    yearlyPrice: '5,000',
    buyoutPrice: '25,000',
    cardType: 'basicCard',
    features: [
        '✓ For development/testing/production environments',
        '✓ 1 application',
        '✓ 2 organizations',
        '✓ Online development',
        '✓ Single machine only'
    ],
    links: {
      monthly: '/en/pricing/basic/monthly',
      yearly: '/en/pricing/basic/yearly',
      buyout: '/en/pricing/basic/buyout',
    }
  },
  {
    id: 'standard',
    title: 'Server Standard License',
    subtitle: 'Enterprise Standard Configuration',
    icon: '⭐',
    monthlyPrice: '1000',
    yearlyPrice: '10,000',
    buyoutPrice: '50,000',
    cardType: 'standardCard',
    isRecommended: true,
    features: [
        'All Server Basic features, plus',
        '✓ 5 applications',
        '✓ 10 organizations',
        '✓ Cluster environment support'
    ],
    links: {
      monthly: '/en/pricing/standard/monthly',
      yearly: '/en/pricing/standard/yearly',
      buyout: '/en/pricing/standard/buyout',
    }
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
  //       '✓ 10 applications',
  //       '✓ 20 organizations',
  //   ]
  // },
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
        '✓ More applications',
        '✓ More organizations',
        '✓ Bulk license discounts',
    ],
    links: {
      monthly: '/en/pricing/enterprise/monthly',
      yearly: '/en/pricing/enterprise/yearly',
      buyout: '/en/pricing/enterprise/buyout',
    }
  }
];

const CONTENT = {
  locale: 'en',
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
    'Each developer team receives',
    ' 1 desktop version license for 7 days ',
    'to fully experience the powerful features of JitAi!',
  ],
  // Modal related text
  modal: {
    title: 'Confirm Purchase Information',
    teamIdLabel: 'Developer Team ID',
    teamIdPlaceholder: 'Enter developer team ID',
    teamIdRequired: 'Developer Team ID is required',
    teamIdPattern: /^[a-z][a-z0-9]{3,19}$/,
    teamIdPatternMessage: 'Please enter 4-20 characters of lowercase letters and numbers starting with lowercase letter',
    teamIdHelpText: 'How to get?',
    teamIdHelpLink: '/docs/devguide/installation-activation/developer-team-management#view-and-refresh-team-bind-code',
    teamTitleLabel: 'Developer Team Title',
    teamTitlePlaceholder: 'Enter developer team title',
    purchasePlanTitle: 'Purchase Plan',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm Purchase',
  },
};

export default CONTENT;