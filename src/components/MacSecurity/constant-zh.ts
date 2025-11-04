// macOS 安全提示组件中文常量配置
export interface MacSecurityContent {
  title: string;
  content: string;
  imageUrl: string;
}

const CONTENT: MacSecurityContent = {
  title: 'macOS 安全提示',
  content: '如果 macOS 显示安全警告，请点击"完成"，然后前往系统设置 → 隐私与安全性 → 安全性，将"允许从以下位置下载的应用"设置为"App Store 和被认可的开发者"，然后点击"仍要打开"。',
  imageUrl: '/img/openanyway_zh.gif'
};

export default CONTENT;
