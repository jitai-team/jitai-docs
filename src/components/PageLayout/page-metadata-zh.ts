export interface PageMetadata {
  title: string;
  description: string;
}

export const PAGE_METADATA_ZH: Record<string, PageMetadata> = {
  // Main pages
  'index': {
    title: 'JitAI - 生产级AI应用开发平台',
    description: 'JitAI全球首创解释型应用架构，让AI智能体实时感知与编排系统，开发效率提升10倍！立即体验智能开发新时代。'
  },
  'pricing': {
    title: 'JitAI 定价方案 - 灵活的企业级 AI 开发平台',
    description: '选择适合您团队的 JitAI 定价方案，享受企业级 AI 开发平台的所有功能。支持按需付费和定制化解决方案。'
  },
  'download': {
    title: 'JitAI 下载安装 - 桌面版与服务器版',
    description: '下载 JitAI 桌面版用于本地开发，或选择服务器版进行生产部署。支持 Windows、Mac 和 Docker 安装方式。'
  },
  'privacy': {
    title: '隐私政策',
    description: '极态云隐私政策 - 了解我们如何收集、使用和保护您的个人信息'
  },
  'terms-of-service': {
    title: '服务协议',
    description: '极态云用户服务协议 - 了解使用极态云产品及服务的条款与条件'
  },
  'mac-security': {
    title: 'macOS 安全提示 - JitAI 安装指南',
    description: 'macOS 系统安全设置指南，帮助您正确安装和运行 JitAI 应用程序。'
  },
  
  // V1 pages
  'v1': {
    title: '下一代AI应用开发技术体系',
    description: 'JitAI全球首创解释型应用架构，让AI智能体实时感知与编排系统，开发效率提升10倍！立即体验智能开发新时代。'
  },
  'v1_pricing': {
    title: 'JitAI 定价方案 - 灵活的企业级 AI 开发平台',
    description: '选择适合您团队的 JitAI 定价方案，享受企业级 AI 开发平台的所有功能。支持按需付费和定制化解决方案。'
  },
  'v1_download': {
    title: 'JitAI 下载安装 - 桌面版与服务器版',
    description: '下载 JitAI 桌面版用于本地开发，或选择服务器版进行生产部署。支持 Windows、Mac 和 Docker 安装方式。'
  }
};

export default PAGE_METADATA_ZH;
