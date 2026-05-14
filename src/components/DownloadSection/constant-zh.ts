// 下载页面中文常量配置
export interface DownloadContent {
    title: string;
    subtitle: string;
    helpText: string;
    helpUrl: string;
    desktop: {
        windows: {
            title: string;
            description: string;
            downloadUrl: string;
            downloadText: string;
        };
        mac: {
            title: string;
            description: string;
            intelDownloadUrl: string;
            intelDownloadText: string;
            appleDownloadUrl: string;
            appleDownloadText: string;
            macSecurityUrl: string;
        };
    };
    server: {
        docker: {
            title: string;
            description: string;
            command: string;
            copyText: string;
            copySuccess: string;
        };
    };
    mobile?: {
        title: string;
        description: string;
        buttonText: string;
        buttonUrl: string;
    };
}

const CONTENT: DownloadContent = {
    title: "下载安装",
    subtitle: "选择适合您系统的安装包，快速开始使用",
    helpText: "遇到安装问题？点击查看更多",
    helpUrl: "/zh/docs/tutorial/download-installation",

    mobile: {
        title: "下载提示",
        description:
            "JitAI 是专为开发者打造的桌面端生产力工具，为了获得完整的功能体验，请在 Windows 或 macOS 设备上访问并下载",
        buttonText: "浏览开发文档",
        buttonUrl: "/zh/docs/tutorial",
    },

    desktop: {
        windows: {
            title: "Windows 安装包",
            description: "支持Win10、Win11， 适合本地开发和调试",
            downloadUrl: "https://apk.jit.pro/latest/windows/JitAI-installer.exe",
            downloadText: "立即下载",
        },

        mac: {
            title: "MacOS 安装包",
            description: "支持mac12.6.7+， 适合本地开发和调试",
            intelDownloadUrl: "https://apk.jit.pro/latest/darwin/x64/JitAI-installer-intel.dmg",
            intelDownloadText: "Intel芯片安装包",
            appleDownloadUrl: "https://apk.jit.pro/latest/darwin/arm/JitAI-installer-apple.dmg",
            appleDownloadText: "Apple芯片安装包",
            macSecurityUrl: "/zh/download/mac-security",
        },
    },

    server: {
        docker: {
            title: "Docker 镜像",
            description:
                "支持Liunx\\Ubuntu\\CentOS等，适合部署在服务器上，作为测试或生产环境",
            command:
                "curl -fsSL https://setup.jit.pro/install-jitai.sh | sudo sh",
            copyText: "📋 复制",
            copySuccess: "✅ 已复制",
        },
    },
};

export default CONTENT;
