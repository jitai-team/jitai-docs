import React, { useEffect, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import styles from "./index.module.css";
import ZH_CONTENT from "./constant-zh";
import EN_CONTENT from "./constant-en";
import { addUTMToUrl } from "../../utils/utm";

const getCompleteReferenceFormUrl = function (lang: string) {
    let baseUrl = "";
    if (lang === "zh") {
        baseUrl = "https://wy.jit.pro/whwy/aicrm/s/zhcontactus";
    } else {
        baseUrl = "https://wy.jit.pro/whwy/aicrm/s/contactus";
    }
    return addUTMToUrl(baseUrl);
};

interface AIAssistantProps {
    className?: string;
    visible?: boolean; // Whether to show the AI assistant, defaults to true. Even if false, the SDK will load in the background
}

/**
 * Simple hash function (using Web Crypto API)
 * Returns a 20-character hexadecimal hash value
 */
const simpleHash = async (str: string): Promise<string> => {
    // Check if crypto.subtle is available (may not be available in HTTP environments or some browsers)
    if (typeof crypto === "undefined" || !crypto.subtle) {
        // Fallback: Use simple string hashing
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(20, "0").substring(0, 20);
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    // Truncate to first 20 characters
    return hashHex.substring(0, 20);
};

const AI_ASSISTANT_HIDE_KEY = "is_hide_jitai_assistant";
const AI_ASSISTANT_VERSION_KEY = "jitai-assistant-version";
const BROWSER_FINGERPRINT_KEY = "jitai-browser-fingerprint";
const CURRENT_VERSION = "6"; // Increment version number to clear old erroneous cache

/**
 * Generate browser fingerprint
 * Collect various browser characteristics and generate a unique hash value
 */
const generateBrowserFingerprint = async (): Promise<string> => {
    // 1. Try to read from cache
    try {
        if (typeof localStorage !== "undefined") {
            const cached = localStorage.getItem(BROWSER_FINGERPRINT_KEY);
            if (cached) return cached;
        }
    } catch (e) {
        console.warn("Failed to read fingerprint from cache:", e);
    }

    const components: string[] = [];

    // 1. Basic browser information
    components.push(navigator.userAgent);
    components.push(navigator.language);
    components.push(navigator.languages ? navigator.languages.join(",") : "");
    components.push(String(navigator.hardwareConcurrency || "unknown"));
    components.push(String((navigator as any).deviceMemory || "unknown"));
    components.push(navigator.platform);
    components.push(navigator.vendor);

    // 2. Screen information
    components.push(String(screen.width));
    components.push(String(screen.height));
    components.push(String(screen.colorDepth));
    components.push(String(screen.pixelDepth));
    components.push(String(window.devicePixelRatio));

    // 3. Timezone information
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    components.push(String(new Date().getTimezoneOffset()));

    // Detect if it is a mobile device
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    // Perform time-consuming fingerprint collection (Canvas, WebGL, Audio) only on non-mobile devices
    // Mobile devices have weaker performance, skip these operations to improve loading speed
    if (!isMobile) {
        // 4. Canvas fingerprint
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

        // 5. WebGL fingerprint
        try {
            const canvas = document.createElement("canvas");
            const gl =
                (canvas.getContext("webgl") as WebGLRenderingContext) ||
                (canvas.getContext(
                    "experimental-webgl"
                ) as WebGLRenderingContext);
            if (gl) {
                const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                if (debugInfo) {
                    components.push(
                        String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL))
                    );
                    components.push(
                        String(
                            gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
                        )
                    );
                }
            }
        } catch (e) {
            components.push("webgl-error");
        }

        // 6. Audio fingerprint
        try {
            const AudioContext =
                (window as any).AudioContext ||
                (window as any).webkitAudioContext;
            if (AudioContext) {
                const context = new AudioContext();
                const oscillator = context.createOscillator();
                const analyser = context.createAnalyser();
                const gainNode = context.createGain();
                const scriptProcessor = context.createScriptProcessor(
                    4096,
                    1,
                    1
                );

                gainNode.gain.value = 0;
                oscillator.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(gainNode);
                gainNode.connect(context.destination);

                const audioFingerprint = await new Promise<string>(
                    (resolve) => {
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
                    }
                );
                components.push(audioFingerprint);
            }
        } catch (e) {
            components.push("audio-error");
        }
    } else {
        // Mobile placeholder to maintain structural consistency
        components.push("mobile-skip-canvas");
        components.push("mobile-skip-webgl");
        components.push("mobile-skip-audio");
    }

    // 7. Plugin information
    const plugins = Array.from(navigator.plugins || [])
        .map((p) => p.name)
        .join(",");
    components.push(plugins);

    // 8. Storage support detection
    const storage = {
        localStorage: typeof localStorage !== "undefined",
        sessionStorage: typeof sessionStorage !== "undefined",
        indexedDB: typeof indexedDB !== "undefined",
    };
    components.push(JSON.stringify(storage));

    // 9. Do Not Track settings
    components.push((navigator as any).doNotTrack || "unknown");

    // 10. Cookie enabled status
    components.push(String(navigator.cookieEnabled));

    // Combine all components and generate hash
    const fingerprintString = components.join("|||");
    const fingerprint = await simpleHash(fingerprintString);

    // Cache fingerprint
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(BROWSER_FINGERPRINT_KEY, fingerprint);
        }
    } catch (e) {
        console.warn("Failed to save fingerprint to cache:", e);
    }

    return fingerprint;
};

const AIAssistant: React.FC<AIAssistantProps> = ({
    className,
    visible = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef<boolean>(false);
    const [sdkLoaded, setSdkLoaded] = useState(false); // Track if SDK is loaded
    const [isLoading, setIsLoading] = useState(false); // Track if SDK is loading

    // Open by default on PC based on cache or default, closed by default on mobile
    // const [isAssistantOpen, setIsAssistantOpen] = useState(() => {
    //     if (typeof window !== 'undefined') {
    //         const isMobile = window.innerWidth <= 768;

    //         // Always default to closed on mobile
    //         if (isMobile) {
    //             return false;
    //         }

    //         // Do not open initially on PC, decide after SDK is loaded
    //         return false;
    //     }
    //     return false;
    // });

    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const scrollPositionRef = useRef<number>(0);

    const { i18n } = useDocusaurusContext();
    const CONTENT = i18n.currentLocale === "zh" ? ZH_CONTENT : EN_CONTENT;

    /**
     * Save AI assistant state to localStorage (PC only, and only after SDK is loaded)
     * Logic: Set cache when closed, remove cache when opened
     */
    useEffect(() => {
        // Save state only after SDK is loaded to avoid saving initial false state
        if (sdkLoaded && typeof window !== "undefined") {
            const isMobile = window.innerWidth <= 768;

            // Save state only on PC
            if (!isMobile) {
                try {
                    if (isAssistantOpen) {
                        // Remove cache when opened
                        localStorage.removeItem(AI_ASSISTANT_HIDE_KEY);
                    } else {
                        // Set cache when closed
                        localStorage.setItem(AI_ASSISTANT_HIDE_KEY, "true");
                    }
                } catch (error) {
                    console.warn(
                        "Failed to save AI assistant state to localStorage:",
                        error
                    );
                }
            }
        }
    }, [isAssistantOpen, sdkLoaded]);

    /**
     * After the SDK is loaded, the pop-up window is automatically opened on the PC based on the cache status or default status --- Commented on December 16, 2025
     */
    // useEffect(() => {
    //     if (sdkLoaded && typeof window !== 'undefined') {
    //         const isMobile = window.innerWidth <= 768;
    //         console.log('SDK loaded, checking if should open assistant. isMobile:', isMobile);

    //         // Automatically open only on PC
    //         if (!isMobile) {
    //             // Check version, clear old cache if version mismatch
    //             const cachedVersion = localStorage.getItem(AI_ASSISTANT_VERSION_KEY);
    //             if (cachedVersion !== CURRENT_VERSION) {
    //                 console.log('Version mismatch, clearing old cache. Old version:', cachedVersion, 'Current version:', CURRENT_VERSION);
    //                 // Clear old cache key (compatible with old versions)
    //                 localStorage.removeItem('jitai-assistant-open-state');
    //                 localStorage.removeItem(AI_ASSISTANT_HIDE_KEY);
    //                 localStorage.setItem(AI_ASSISTANT_VERSION_KEY, CURRENT_VERSION);
    //             }

    //             // Check if hidden: if is_hide_jitai_assistant exists, user previously closed it
    //             const isHidden = localStorage.getItem(AI_ASSISTANT_HIDE_KEY) === 'true';
    //             console.log('AI assistant hide state:', isHidden);
    //             if (isHidden) {
    //                 // If cache exists, user previously closed it, keep closed
    //                 console.log('User previously closed assistant, keeping closed');
    //                 setIsAssistantOpen(false);
    //             } else {
    //                 // If no cache, open by default (delay 4 seconds)
    //                 console.log('No hide cache found, will open by default after 2 seconds');
    //                 const timer = setTimeout(() => {
    //                     setIsAssistantOpen(true);
    //                 }, 4000);

    //                 // Clear timer
    //                 return () => clearTimeout(timer);
    //             }
    //         }
    //     }
    // }, [sdkLoaded]);

    /**
     * Handle mobile scrolling through problem
     * When the AI assistant window is open, block background page scrolling
     * Only apply this logic on mobile devices
     */
    useEffect(() => {
        // Detect if it is a mobile device
        const isMobile = window.innerWidth <= 768;

        if (isAssistantOpen && isMobile) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY;

            // Prevent background page scrolling
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = "100%";
            document.body.style.left = "0";
            document.body.style.right = "0";

            return () => {
                const savedScrollPosition = scrollPositionRef.current;

                // Restore styles first
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.left = "";
                document.body.style.right = "";

                // Use scrollTo instant behavior, do not use smooth scrolling
                window.scrollTo({
                    top: savedScrollPosition,
                    left: 0,
                    behavior: "instant" as ScrollBehavior,
                });
            };
        }
    }, [isAssistantOpen]);

    // Set CSS variable for real mobile viewport height to solve address bar occlusion issue
    useEffect(() => {
        const setViewportHeight = () => {
            // Get real viewport height (excluding address bar)
            const vh = window.innerHeight * 0.01;
            // Set value to CSS variable --vh
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        // Initial setup
        setViewportHeight();

        // Listen for window resize (including address bar show/hide)
        window.addEventListener("resize", setViewportHeight);
        // Listen for device orientation change
        window.addEventListener("orientationchange", setViewportHeight);

        return () => {
            window.removeEventListener("resize", setViewportHeight);
            window.removeEventListener("orientationchange", setViewportHeight);
        };
    }, []);

    const initializeAssistant = async () => {
        // Check if JitAIAssistant is available
        if (typeof (window as any).JitAIAssistant === "undefined") {
            console.error("JitAI Assistant SDK not loaded");
            setIsLoading(false);
            return;
        }

        try {
            // Generate browser fingerprint
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
                    userKey: userKey, // Unique user key generated using browser fingerprint
                },
                functions: {
                    // Add your custom functions here
                    getCompleteReferenceFormUrl: getCompleteReferenceFormUrl,
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

            // SDK initialization completed, set state
            console.log("AI Assistant SDK initialized successfully");
            setSdkLoaded(true);
        } catch (error) {
            console.error("Failed to initialize AI Assistant SDK:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadScript = () => {
        if (scriptLoadedRef.current) {
            if (!sdkLoaded && !isLoading) {
                setIsLoading(true);
                initializeAssistant();
            }
            return;
        }

        setIsLoading(true);
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
            setIsLoading(false);
        };
        document.head.appendChild(script);
    };

    // Automatically load SDK after page load
    // Use requestIdleCallback to load as early as possible, no longer force 2 second delay
    useEffect(() => {
        const triggerLoad = () => {
            if (!scriptLoadedRef.current) {
                loadScript();
            }
        };

        if ("requestIdleCallback" in window) {
            const handle = (window as any).requestIdleCallback(triggerLoad);
            return () => (window as any).cancelIdleCallback(handle);
        } else {
            const timer = setTimeout(triggerLoad, 500);
            return () => clearTimeout(timer);
        }
    }, [CONTENT]);

    // Handle opening AI assistant
    const handleOpenAssistant = () => {
        setIsAssistantOpen(true);

        // If not loaded, trigger load immediately
        if (!scriptLoadedRef.current && !isLoading && !sdkLoaded) {
            loadScript();
        }
    };

    return (
        <div className={className}>
            {/* @ts-ignore */}
            <Head>
                <link
                    rel="dns-prefetch"
                    href="https://jit-front.oss-cn-hangzhou.aliyuncs.com"
                />
                <link
                    rel="preconnect"
                    href="https://jit-front.oss-cn-hangzhou.aliyuncs.com"
                />
                <link
                    rel="preload"
                    href="https://jit-front.oss-cn-hangzhou.aliyuncs.com/ai-sdk/jitai-assistant-sdk.min.js"
                    as="script"
                />
                <link rel="dns-prefetch" href="https://wy.jit.pro" />
                <link rel="preconnect" href="https://wy.jit.pro" />
            </Head>

            {/* AI Assistant Floating Icon */}
            {!isAssistantOpen && visible && (
                <button
                    onClick={handleOpenAssistant}
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

            {/* AI Assistant Window Container - Always rendered but controlled by CSS for display/hide */}
            <div
                className={`${styles.aiAssistantWindow} ${
                    !isAssistantOpen ? styles.hidden : ""
                }`}
            >
                {/* Window Header */}
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

                {/* AI Assistant Content Area */}
                <div
                    className={styles.aiAssistantContent}
                    style={{ position: "relative" }}
                >
                    <div
                        id="ai-assistant-container"
                        ref={containerRef}
                        style={{ width: "100%", height: "100%" }}
                    />

                    {/* Loading State Prompt - Independent of SDK container to avoid DOM conflicts */}
                    {isLoading && !sdkLoaded && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                color: "#666",
                                fontSize: "14px",
                                zIndex: 10,
                            }}
                        >
                            Loading AI Assistant...
                        </div>
                    )}
                </div>

                {/* Window Footer */}
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
