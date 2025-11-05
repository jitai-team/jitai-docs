import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import ZH_CONTENT from './constant-zh';
import EN_CONTENT from './constant-en';

interface AIAssistantProps {
  className?: string;
  visible?: boolean; // 是否显示 AI 助手，默认为 true。即使为 false，SDK 也会在后台加载
}

/**
 * 简单的哈希函数(使用 Web Crypto API)
 * 返回20位的十六进制哈希值
 */
const simpleHash = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // 截取前20位
  return hashHex.substring(0, 20);
};

/**
 * 生成浏览器指纹
 * 收集浏览器的各种特征并生成唯一的哈希值
 */
const generateBrowserFingerprint = async (): Promise<string> => {
  const components: string[] = [];

  // 1. 基础浏览器信息
  components.push(navigator.userAgent);
  components.push(navigator.language);
  components.push(navigator.languages ? navigator.languages.join(',') : '');
  components.push(String(navigator.hardwareConcurrency || 'unknown'));
  components.push(String((navigator as any).deviceMemory || 'unknown'));
  components.push(navigator.platform);
  components.push(navigator.vendor);

  // 2. 屏幕信息
  components.push(String(screen.width));
  components.push(String(screen.height));
  components.push(String(screen.colorDepth));
  components.push(String(screen.pixelDepth));
  components.push(String(window.devicePixelRatio));

  // 3. 时区信息
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  components.push(String(new Date().getTimezoneOffset()));

  // 4. Canvas指纹
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Browser Fingerprint', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Browser Fingerprint', 4, 17);
      const canvasData = canvas.toDataURL();
      components.push(canvasData);
    }
  } catch (e) {
    components.push('canvas-error');
  }

  // 5. WebGL指纹
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        components.push(String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)));
        components.push(String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)));
      }
    }
  } catch (e) {
    components.push('webgl-error');
  }

  // 6. 音频指纹
  try {
    const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const analyser = context.createAnalyser();
      const gainNode = context.createGain();
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

      gainNode.gain.value = 0;
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(context.destination);

      const audioFingerprint = await new Promise<string>((resolve) => {
        scriptProcessor.onaudioprocess = function(event) {
          const output = event.outputBuffer.getChannelData(0);
          const sum = output.reduce((acc, val) => acc + Math.abs(val), 0);
          resolve(sum.toString());
          scriptProcessor.onaudioprocess = null;
        };
        oscillator.start(0);
        setTimeout(() => {
          oscillator.stop();
          resolve('audio-timeout');
        }, 100);
      });
      components.push(audioFingerprint);
    }
  } catch (e) {
    components.push('audio-error');
  }

  // 7. 插件信息
  const plugins = Array.from(navigator.plugins || [])
    .map(p => p.name)
    .join(',');
  components.push(plugins);

  // 8. 存储支持检测
  const storage = {
    localStorage: typeof localStorage !== 'undefined',
    sessionStorage: typeof sessionStorage !== 'undefined',
    indexedDB: typeof indexedDB !== 'undefined',
  };
  components.push(JSON.stringify(storage));

  // 9. Do Not Track设置
  components.push((navigator as any).doNotTrack || 'unknown');

  // 10. Cookie启用状态
  components.push(String(navigator.cookieEnabled));

  // 合并所有组件并生成哈希
  const fingerprintString = components.join('|||');
  const fingerprint = await simpleHash(fingerprintString);
  
  return fingerprint;
};


const AIAssistant: React.FC<AIAssistantProps> = ({ className, visible = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // 依据 HTML lang 属性选择常量
  const CONTENT = (document.documentElement.lang || 'en') === 'en' ? EN_CONTENT : ZH_CONTENT;

  // 页面加载后自动在后台加载和初始化 AI Assistant SDK
  useEffect(() => {
    const loadScript = () => {
      if (scriptLoadedRef.current) return;
      
      const script = document.createElement('script');
      script.src = 'https://jit-front.oss-cn-hangzhou.aliyuncs.com/ai-sdk/jitai-assistant-sdk.min.js';
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        initializeAssistant();
      };
      document.head.appendChild(script);
    };

    const initializeAssistant = async () => {
      // Check if JitAIAssistant is available
      if (typeof (window as any).JitAIAssistant === 'undefined') {
        console.error('JitAI Assistant SDK not loaded');
        return;
      }

      // 生成浏览器指纹
      const userKey = await generateBrowserFingerprint();

      const aiAssistant = new (window as any).JitAIAssistant();
      
      aiAssistant.init({
        containerId: 'ai-assistant-container',
        assistantUrl: 'https://wy.jit.pro/whwy/jitRDM/aiassistants/consultancyAssistant',
        accessKey: 'yzxOZfkrCYGKdPmhpDFVRgnIvecJWSEB',
        logContent: 'LLM_CONCISE_LOG',
        welcomeMessage: CONTENT.welcomeMessage,
        authInfo: {
          userKey: userKey, // 使用浏览器指纹生成的唯一用户key
        },
        functions: {
          // Add your custom functions here
        }
      });
      
      aiAssistant.subscribeEvent('AI:aiagent_webpage.beforeNodeRun', (data: any) => {
        console.log('AI Agent Before Node Run:', data);
      });
      
      aiAssistant.subscribeEvent('AI:aiagent_webpage.afterNodeRun', (data: any) => {
        console.log('AI Agent After Node Run:', data);
      });
      
      aiAssistant.subscribeEvent('AI:aiagent_webpage.callTool.preEvent', (data: any) => {
        console.log('AI Agent Call Tool Pre Event:', data);
      });
      
      aiAssistant.subscribeEvent('AI:aiagent_webpage.callTool.postEvent', (data: any) => {
        console.log('AI Agent Call Tool Post Event:', data);
      });
    };

    // 页面加载后立即在后台加载 SDK 和初始化 AI Assistant
    loadScript();

    return () => {
      // Cleanup if needed
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return (
    <div className={className}>
      {/* AI 助手悬浮图标 */}
      {(!isAssistantOpen && visible) && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className={styles.aiAssistantButton}
          aria-label={CONTENT.openAssistantAriaLabel}
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <circle cx="9" cy="10" r="1" fill="white" />
            <circle cx="15" cy="10" r="1" fill="white" />
            <path 
              d="M9 14s1 1 3 1 3-1 3-1" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      
      {/* AI Assistant 浮窗容器 - 始终渲染但通过 CSS 控制显示/隐藏 */}
      <div className={`${styles.aiAssistantWindow} ${!isAssistantOpen ? styles.hidden : ''}`}>
        {/* 浮窗标题栏 */}
        <div className={styles.aiAssistantHeader}>
          <div className={styles.aiAssistantTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.aiAssistantTitleText}>{CONTENT.windowTitle}</span>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className={styles.aiAssistantCloseButton}
            aria-label={CONTENT.closeAssistantAriaLabel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        {/* AI Assistant 内容区域 */}
        <div 
          id="ai-assistant-container"
          ref={containerRef}
          className={styles.aiAssistantContent}
        />
      </div>
    </div>
  );
};

export default AIAssistant;

