// AI Assistant SDK 配置常量
export const AI_ASSISTANT_CONFIG = {
  SDK_URL: 'https://jit-front.oss-cn-hangzhou.aliyuncs.com/ai-sdk/jitai-assistant-sdk.min.js',
  CONTAINER_ID: 'ai-assistant-container',
  ASSISTANT_URL: 'https://wy.jit.pro/whwy/jitRDM/aiassistants/consultancyAssistant',
  ACCESS_KEY: 'yzxOZfkrCYGKdPmhpDFVRgnIvecJWSEB',
  // LOG_CONTENT: 'NOT_OUTPUT',
  AUTH_INFO: {
    success: true,
    message: 'xxx',
    welcomeMessage: `你好，我是你的 AI 咨询助手！我可以帮你快速定位文档、给出实践建议并解答产品与技术问题。直接用中文提问即可，例如：“如何在本地部署 JitAi？”或“给我一条从零开始的集成路线”。`
  }
} as const;

// AI Assistant 事件类型
export const AI_ASSISTANT_EVENTS = {
  BEFORE_NODE_RUN: 'AI:aiagent_webpage.beforeNodeRun',
  AFTER_NODE_RUN: 'AI:aiagent_webpage.afterNodeRun',
  CALL_TOOL_PRE: 'AI:aiagent_webpage.callTool.preEvent',
  CALL_TOOL_POST: 'AI:aiagent_webpage.callTool.postEvent'
} as const;

