/**
 * 第三方集成配置
 */

// 显示模式类型
export type DisplayVariant = 'logo' | 'icon';
// Logo/Icon 尺寸类型
export type AssetSize = 'small' | 'medium' | 'large' | 'xlarge';
// 文本尺寸类型
export type TextSize = 'xs' | 'small' | 'medium' | 'large' | 'xlarge';

// 集成项配置（支持中英文名称，支持中英文不同的 Logo/Icon）
export interface IntegrationItem {
  nameZh: string;
  nameEn: string;
  // Logo/Icon 资源（variant: 'logo' 时使用 logo，variant: 'icon' 时使用 icon）
  logo?: string; // 通用 Logo/Icon（如果 logoZh 和 logoEn 都未指定则使用此）
  logoZh?: string; // 中文 Logo/Icon
  logoEn?: string; // 英文 Logo/Icon
  variant?: DisplayVariant; // 显示模式：'logo' 只显示 logo 不显示文本，'icon' 显示 icon + 文本
  assetSize?: AssetSize; // Logo/Icon 尺寸，用于统一视觉大小
  textSize?: TextSize; // 文本尺寸（当 variant: 'icon' 时使用）
}

// 所有集成项（扁平列表，无分类）
// assetSize 说明：small(32px), medium(40px), large(48px), xlarge(56px)
// variant 说明：'logo' 只显示 logo 不显示文本，'icon' 显示 icon + 文本
// 统一视觉大小原则：
// - logo-only 项：统一使用 medium 或 large，根据 logo 视觉密度调整
// - icon+text 项：icon 统一使用 small 或 medium，text 统一使用 large，确保整体视觉平衡
export const INTEGRATIONS: IntegrationItem[] = [
  // 数据库
  { nameZh: 'MySQL', nameEn: 'MySQL', logo: 'mysql.svg', variant: 'logo', assetSize: 'large' },
  { nameZh: 'PostgreSQL', nameEn: 'PostgreSQL', logo: 'postgresql.svg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  { nameZh: 'Oracle', nameEn: 'Oracle', logo: 'oracle.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: 'SQL Server', nameEn: 'SQL Server', logo: 'sqlserver.svg', variant: 'icon', assetSize: 'medium', textSize: 'large'},
  { nameZh: '达梦', nameEn: 'DM8', logo: 'dm8.jpg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  // { nameZh: 'SQLite', nameEn: 'SQLite', logo: 'sqlite.svg', variant: 'logo', assetSize: 'medium' },

  // AI 模型
  { nameZh: 'OpenAI', nameEn: 'OpenAI', logo: 'openai.svg', variant: 'logo', assetSize: 'small' },
  { nameZh: 'Anthropic', nameEn: 'Anthropic', logo: 'anthropic.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: '深度求索', nameEn: 'DeepSeek', logo: 'deepseek.png', variant: 'logo', assetSize: 'large' },
  { nameZh: '阿里云百炼', nameEn: 'Alibaba Bailian', logo: 'bailian.svg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  { nameZh: '硅基流动', nameEn: 'SiliconFlow', logoZh: 'siliconflow_zh.svg', logoEn: 'siliconflow_en.png', variant: 'logo', assetSize: 'xlarge' },
  { nameZh: '豆包', nameEn: 'Doubao', logo: 'doubao.svg', variant: 'icon', assetSize: 'small', textSize: 'large'},
  { nameZh: '混元', nameEn: 'Hunyuan', logo: 'hunyuan.svg', variant: 'icon', assetSize: 'small', textSize: 'large'},
  { nameZh: '月之暗面', nameEn: 'Moonshot', logo: 'moonshot.svg', variant: 'icon', assetSize: 'small', textSize: 'large'},
  { nameZh: '智普', nameEn: 'ZhiPu', logo: 'zhipu.svg', variant: 'icon', assetSize: 'medium', textSize: 'large'},
  // { nameZh: 'Gemini', nameEn: 'Gemini', logo: 'google_gemini.svg' },
  { nameZh: 'Ollama', nameEn: 'Ollama', logo: 'ollama.png', variant: 'logo', assetSize: 'medium'},
  
  // 身份认证
  { nameZh: '微信登录', nameEn: 'WeChat', logoZh: 'wechat_zh.svg', logoEn: 'wechat_en.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: 'Google', nameEn: 'Google', logo: 'google.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: 'GitHub', nameEn: 'GitHub', logo: 'github.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: '企业微信', nameEn: 'WeCom', logo: 'wecom.svg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  { nameZh: '钉钉', nameEn: 'DingTalk', logoZh: 'dingtalk_zh.png', logoEn: 'dingtalk_en.png', variant: 'logo', assetSize: 'xlarge' },
  { nameZh: 'Microsoft Teams', nameEn: 'Microsoft Teams', logo: 'microsoft_teams.svg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  
  // 支付
  { nameZh: '微信支付', nameEn: 'WeChat Pay', logo: 'wechat_pay.svg', variant: 'icon', assetSize: 'small', textSize: 'large' },
  { nameZh: '支付宝', nameEn: 'Alipay', logoZh: 'alipay_zh.svg', logoEn: 'alipay_en.svg', variant: 'logo', assetSize: 'medium' },
  
  // 存储
  { nameZh: '阿里云 OSS', nameEn: 'AliOSS', logoZh: 'aliyun_zh.svg', logoEn: 'aliyun_en.svg', variant: 'logo', assetSize: 'xlarge' },
  { nameZh: 'MinIO', nameEn: 'MinIO', logo: 'minio.png', variant: 'logo', assetSize: 'medium' },
  { nameZh: '七牛云', nameEn: 'Qiniu Cloud', logoZh: 'qiniu_zh.jpeg', logoEn: 'qiniu_en.png', variant: 'logo', assetSize: 'medium' },
  { nameZh: '移动云EOS', nameEn: 'EOS', logo: 'china_mobile_cloud.png', variant: 'icon', assetSize: 'large', textSize: 'large' },
  { nameZh: 'Cloudflare R2', nameEn: 'Cloudflare R2', logo: 'cloudflare.svg', variant: 'logo', assetSize: 'xlarge' },
  
  // 消息
  { nameZh: 'AWS', nameEn: 'AWS', logo: 'aws.svg', variant: 'logo', assetSize: 'medium' },
  { nameZh: 'Twilio', nameEn: 'Twilio', logo: 'twilio.svg', variant: 'logo', assetSize: 'medium' },
  
  // 缓存
  { nameZh: 'Redis', nameEn: 'Redis', logo: 'redis.jpg', variant: 'logo', assetSize: 'medium' },
  { nameZh: 'TongRDS', nameEn: 'TongRDS', logo: 'tongrds.png', variant: 'logo', assetSize: 'large' },
];

/**
 * 根据 locale 获取集成配置（扁平列表）
 */
export function getIntegrations(locale: 'zh' | 'en') {
  return INTEGRATIONS.map(item => {
    // 优先使用对应语言的 Logo/Icon，如果没有则使用通用 Logo/Icon
    const asset = locale === 'zh' 
      ? (item.logoZh || item.logo || '')
      : (item.logoEn || item.logo || '');
    
    return {
      name: locale === 'zh' ? item.nameZh : item.nameEn,
      asset: asset ? 'img/integrations/' + asset : '',
      variant: item.variant || 'icon', // 默认 icon 模式（显示文本）
      assetSize: item.assetSize || 'medium', // 默认 medium 尺寸
      textSize: item.textSize || 'large', // 默认 large 尺寸
    };
  });
}
