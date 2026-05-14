// Download page English constants configuration
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
    title: "Download",
    subtitle:
        "Choose the installer that suits your system and get started quickly",
    helpText: "Having installation issues? Click to learn more",
    helpUrl: "/docs/tutorial/download-installation",

    mobile: {
        title: "Download Tip",
        description:
            "JitAI is a desktop productivity tool designed for developers. For the full experience, please visit and download on a Windows or macOS device",
        buttonText: "View Documentation",
        buttonUrl: "/docs/tutorial",
    },

    desktop: {
        windows: {
            title: "Windows Installer",
            description:
                "Supports Win10+, suitable for local development and debugging",
            downloadUrl: "https://apk.jit.pro/latest/windows/JitAI-installer.exe",
            downloadText: "Download Now",
        },

        mac: {
            title: "macOS Installer",
            description:
                "Supports macOS 12.6.7+， suitable for local development and debugging",
            intelDownloadUrl: "https://apk.jit.pro/latest/darwin/x64/JitAI-installer-intel.dmg",
            intelDownloadText: "for Intel processor",
            appleDownloadUrl: "https://apk.jit.pro/latest/darwin/arm/JitAI-installer-apple.dmg",
            appleDownloadText: "for Apple silicon",
            macSecurityUrl: "/download/mac-security",
        },
    },

    server: {
        docker: {
            title: "Docker Image",
            description:
                "Supports Linux\\Ubuntu\\CentOS etc., suitable for deployment on servers as test or production environment",
            command:
                "curl -fsSL https://setup.jit.pro/install-jitai.sh | sudo sh",
            copyText: "📋 Copy",
            copySuccess: "✅ Copied",
        },
    },
};

export default CONTENT;
