import React, { useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import ZH_CONTENT from "./constant-zh";
import EN_CONTENT from "./constant-en";

interface AIAssistantProps {
    className?: string;
    visible?: boolean; // 是否显示 AI 助手，默认为 true。即使为 false，SDK 也会在后台加载
}

/**
 * 简单的哈希函数(使用 Web Crypto API)
 * 返回20位的十六进制哈希值
 */
const simpleHash = async (str: string): Promise<string> => {
    // 检查 crypto.subtle 是否可用（在 HTTP 环境或某些浏览器中可能不可用）
    if (typeof crypto === 'undefined' || !crypto.subtle) {
        // 降级方案：使用简单的字符串哈希
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(20, '0').substring(0, 20);
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
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
    components.push(navigator.languages ? navigator.languages.join(",") : "");
    components.push(String(navigator.hardwareConcurrency || "unknown"));
    components.push(String((navigator as any).deviceMemory || "unknown"));
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
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
            canvas.width = 200;
            canvas.height = 50;
            ctx.textBaseline = "top";
            ctx.font = "14px Arial";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("Browser Fingerprint", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("Browser Fingerprint", 4, 17);
            const canvasData = canvas.toDataURL();
            components.push(canvasData);
        }
    } catch (e) {
        components.push("canvas-error");
    }

    // 5. WebGL指纹
    try {
        const canvas = document.createElement("canvas");
        const gl =
            (canvas.getContext("webgl") as WebGLRenderingContext) ||
            (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
        if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                components.push(
                    String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL))
                );
                components.push(
                    String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
                );
            }
        }
    } catch (e) {
        components.push("webgl-error");
    }

    // 6. 音频指纹
    try {
        const AudioContext =
            (window as any).AudioContext || (window as any).webkitAudioContext;
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
                scriptProcessor.onaudioprocess = function (event) {
                    const output = event.outputBuffer.getChannelData(0);
                    const sum = output.reduce(
                        (acc, val) => acc + Math.abs(val),
                        0
                    );
                    resolve(sum.toString());
                    scriptProcessor.onaudioprocess = null;
                };
                oscillator.start(0);
                setTimeout(() => {
                    oscillator.stop();
                    resolve("audio-timeout");
                }, 100);
            });
            components.push(audioFingerprint);
        }
    } catch (e) {
        components.push("audio-error");
    }

    // 7. 插件信息
    const plugins = Array.from(navigator.plugins || [])
        .map((p) => p.name)
        .join(",");
    components.push(plugins);

    // 8. 存储支持检测
    const storage = {
        localStorage: typeof localStorage !== "undefined",
        sessionStorage: typeof sessionStorage !== "undefined",
        indexedDB: typeof indexedDB !== "undefined",
    };
    components.push(JSON.stringify(storage));

    // 9. Do Not Track设置
    components.push((navigator as any).doNotTrack || "unknown");

    // 10. Cookie启用状态
    components.push(String(navigator.cookieEnabled));

    // 合并所有组件并生成哈希
    const fingerprintString = components.join("|||");
    const fingerprint = await simpleHash(fingerprintString);

    return fingerprint;
};

const AI_ASSISTANT_HIDE_KEY = 'is_hide_jitai_assistant';
const AI_ASSISTANT_VERSION_KEY = 'jitai-assistant-version';
const CURRENT_VERSION = '6'; // 增加版本号来清除旧的错误缓存

const AIAssistant: React.FC<AIAssistantProps> = ({
    className,
    visible = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef<boolean>(false);
    const [sdkLoaded, setSdkLoaded] = useState(false); // 跟踪 SDK 是否加载完成
    
    // PC 端根据缓存或默认打开，移动端默认关闭
    const [isAssistantOpen, setIsAssistantOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            
            // 移动端始终默认关闭
            if (isMobile) {
                return false;
            }
            
            // PC 端初始不打开，等 SDK 加载完成后再决定
            return false;
        }
        return false;
    });
    const scrollPositionRef = useRef<number>(0);

    const { i18n } = useDocusaurusContext();
    const CONTENT = i18n.currentLocale === "zh" ? ZH_CONTENT : EN_CONTENT;
    
    /**
     * 保存 AI 助理状态到 localStorage（仅 PC 端，且只在 SDK 加载完成后）
     * 逻辑：关闭时设置缓存，打开时删除缓存
     */
    useEffect(() => {
        // 只在 SDK 加载完成后才保存状态，避免保存初始的 false 状态
        if (sdkLoaded && typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            
            // 只在 PC 端保存状态
            if (!isMobile) {
                try {
                    if (isAssistantOpen) {
                        // 打开时删除缓存
                        localStorage.removeItem(AI_ASSISTANT_HIDE_KEY);
                    } else {
                        // 关闭时设置缓存
                        localStorage.setItem(AI_ASSISTANT_HIDE_KEY, 'true');
                    }
                } catch (error) {
                    console.warn('Failed to save AI assistant state to localStorage:', error);
                }
            }
        }
    }, [isAssistantOpen, sdkLoaded]);

    /**
     * SDK 加载完成后，PC 端根据缓存状态或默认打开弹窗
     */
    useEffect(() => {
        if (sdkLoaded && typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            console.log('SDK loaded, checking if should open assistant. isMobile:', isMobile);
            
            // 只在 PC 端自动打开
            if (!isMobile) {
                // 检查版本，如果版本不匹配则清除旧缓存
                const cachedVersion = localStorage.getItem(AI_ASSISTANT_VERSION_KEY);
                if (cachedVersion !== CURRENT_VERSION) {
                    console.log('Version mismatch, clearing old cache. Old version:', cachedVersion, 'Current version:', CURRENT_VERSION);
                    // 清除旧的缓存 key（兼容旧版本）
                    localStorage.removeItem('jitai-assistant-open-state');
                    localStorage.removeItem(AI_ASSISTANT_HIDE_KEY);
                    localStorage.setItem(AI_ASSISTANT_VERSION_KEY, CURRENT_VERSION);
                }
                
                // 检查是否隐藏：如果 is_hide_jitai_assistant 存在，说明用户之前关闭了
                const isHidden = localStorage.getItem(AI_ASSISTANT_HIDE_KEY) === 'true';
                console.log('AI assistant hide state:', isHidden);
                if (isHidden) {
                    // 如果缓存存在，说明用户之前关闭了，保持关闭状态
                    console.log('User previously closed assistant, keeping closed');
                    setIsAssistantOpen(false);
                } else {
                    // 如果没有缓存，默认打开（延迟 4 秒）
                    console.log('No hide cache found, will open by default after 2 seconds');
                    const timer = setTimeout(() => {
                        setIsAssistantOpen(true);
                    }, 4000);
                    
                    // 清理定时器
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [sdkLoaded]);

    /**
     * 处理移动端滚动穿透问题
     * 当 AI 助手窗口打开时，阻止背景页面滚动
     * 只在移动端应用此逻辑
     */
    useEffect(() => {
        // 检测是否为移动端
        const isMobile = window.innerWidth <= 768;
        
        if (isAssistantOpen && isMobile) {
            // 保存当前滚动位置
            scrollPositionRef.current = window.scrollY;

            // 阻止背景页面滚动
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = "100%";
            document.body.style.left = "0";
            document.body.style.right = "0";

            return () => {
                const savedScrollPosition = scrollPositionRef.current;
                
                // 先恢复样式
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.left = "";
                document.body.style.right = "";
                
                // 使用 scrollTo 的 instant 行为，不使用平滑滚动
                window.scrollTo({
                    top: savedScrollPosition,
                    left: 0,
                    behavior: 'instant' as ScrollBehavior
                });
            };
        }
    }, [isAssistantOpen]);

    // 设置移动端真实视口高度的 CSS 变量，解决地址栏遮挡问题
    useEffect(() => {
        const setViewportHeight = () => {
            // 获取真实的视口高度（不包含地址栏）
            const vh = window.innerHeight * 0.01;
            // 将值设置为 CSS 变量 --vh
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        // 初始设置
        setViewportHeight();

        // 监听窗口大小变化（包括地址栏显示/隐藏）
        window.addEventListener("resize", setViewportHeight);
        // 监听设备方向变化
        window.addEventListener("orientationchange", setViewportHeight);

        return () => {
            window.removeEventListener("resize", setViewportHeight);
            window.removeEventListener("orientationchange", setViewportHeight);
        };
    }, []);

    // 页面加载后自动在后台加载和初始化 AI Assistant SDK
    useEffect(() => {
        const loadScript = () => {
            if (scriptLoadedRef.current) return;

            const script = document.createElement("script");
            script.src =
                "https://jit-front.oss-cn-hangzhou.aliyuncs.com/ai-sdk/jitai-assistant-sdk.min.js";
            script.async = true;
            script.onload = () => {
                scriptLoadedRef.current = true;
                initializeAssistant();
            };
            script.onerror = () => {
                console.error("Failed to load JitAI Assistant SDK");
            };
            document.head.appendChild(script);
        };

        const initializeAssistant = async () => {
            // Check if JitAIAssistant is available
            if (typeof (window as any).JitAIAssistant === "undefined") {
                console.error("JitAI Assistant SDK not loaded");
                return;
            }

            try {
                // 生成浏览器指纹
                const userKey = await generateBrowserFingerprint();

                const aiAssistant = new (window as any).JitAIAssistant();

                aiAssistant.init({
                    containerId: "ai-assistant-container",
                    assistantUrl:
                        "https://wy.jit.pro/whwy/aicrm/aiassistants/techSupportAssistant",
                    accessKey: "bazYVkcxUHwqduXhCtADGnyfRKTiIrlN",
                    logContent: "NOT_OUTPUT",
                    welcomeMessage: CONTENT.welcomeMessage,
                    prologues: CONTENT.prologues,
                    placeholder: CONTENT.placeholder,
                    authInfo: {
                        userKey: userKey, // 使用浏览器指纹生成的唯一用户key
                    },
                    functions: {
                        // Add your custom functions here
                    },
                });

                aiAssistant.subscribeEvent(
                    "AI:aiagent_webpage.beforeNodeRun",
                    (data: any) => {
                        console.log("AI Agent Before Node Run:", data);
                    }
                );

                aiAssistant.subscribeEvent(
                    "AI:aiagent_webpage.afterNodeRun",
                    (data: any) => {
                        console.log("AI Agent After Node Run:", data);
                    }
                );

                aiAssistant.subscribeEvent(
                    "AI:aiagent_webpage.callTool.preEvent",
                    (data: any) => {
                        console.log("AI Agent Call Tool Pre Event:", data);
                    }
                );

                aiAssistant.subscribeEvent(
                    "AI:aiagent_webpage.callTool.postEvent",
                    (data: any) => {
                        console.log("AI Agent Call Tool Post Event:", data);
                    }
                );
                
                // SDK 初始化完成，设置状态
                console.log("AI Assistant SDK initialized successfully");
                setSdkLoaded(true);
            } catch (error) {
                console.error("Failed to initialize AI Assistant SDK:", error);
            }
        };

        // 页面加载后立即在后台加载 SDK 和初始化 AI Assistant
        loadScript();

        return () => {
            // Cleanup if needed
        };
    }, [CONTENT]); // 添加 CONTENT 依赖

    return (
        <div className={className}>
            {/* AI 助手悬浮图标 */}
            {!isAssistantOpen && visible && (
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
            <div
                className={`${styles.aiAssistantWindow} ${
                    !isAssistantOpen ? styles.hidden : ""
                }`}
            >
                {/* 浮窗标题栏 */}
                <div className={styles.aiAssistantHeader}>
                    <div className={styles.aiAssistantTitle}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className={styles.aiAssistantTitleText}>
                            {CONTENT.windowTitle}
                        </span>
                        <span className={styles.betaBadge}>Beta</span>
                    </div>
                    <button
                        onClick={() => setIsAssistantOpen(false)}
                        className={styles.aiAssistantCloseButton}
                        aria-label={CONTENT.closeAssistantAriaLabel}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
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

                {/* 浮窗底部说明 */}
                <div className={styles.aiAssistantFooter}>
                    <span className={styles.poweredByText}>
                        Powered by JitAI
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
