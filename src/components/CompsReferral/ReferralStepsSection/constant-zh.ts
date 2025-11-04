export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: '下载安装',
    description: '下载并安装 JitAI 桌面版应用',
    icon: '📥',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/zh-step1-download.png'
  },
  {
    number: 2,
    title: '创建团队',
    description: '创建新的开发者团队',
    icon: '👥',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/zh-step2-team.png'
  },
  {
    number: 3,
    title: '新建应用',
    description: '创建应用时，在邀请码字段中输入邀请码',
    icon: '🚀',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/zh-step3-app.png'
  }
];

const CONTENT = {
  title: '受邀人操作步骤',
  subtitle: '',
  steps: STEPS,
};

export default CONTENT;

