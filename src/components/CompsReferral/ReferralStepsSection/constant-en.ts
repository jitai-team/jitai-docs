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
    title: 'Download & Install',
    description: 'Download and install the JitAI desktop app',
    icon: '📥',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/en-step1-download.png'
  },
  {
    number: 2,
    title: 'Create Team',
    description: 'Create a new developer team',
    icon: '👥',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/en-step2-team.png'
  },
  {
    number: 3,
    title: 'Create App',
    description: 'When creating an app, enter the referral code in the referral code field',
    icon: '🚀',
    image: 'https://jit-www.oss-accelerate.aliyuncs.com/referral/en-step3-app.png'
  }
];

const CONTENT = {
  title: 'Steps for Invitees',
  subtitle: '',
  steps: STEPS,
};

export default CONTENT;

