export interface PageMetadata {
    title: string;
    description: string;
}

export const PAGE_METADATA_EN: Record<string, PageMetadata> = {
    // Main pages
    index: {
        title: "JitAI - Quickly Build Production-Grade AI Apps",
        description:
            "The world's first interpreted app framework enabling AI agents to perceive and orchestrate systems in real-time, boosting development efficiency by 10x!",
    },
    pricing: {
        title: "JitAI Pricing Plans - Flexible Enterprise AI Development Platform",
        description:
            "Choose the JitAI pricing plan that fits your team and enjoy all features of our enterprise AI development platform. Supports pay-as-you-go and customized solutions.",
    },
    download: {
        title: "JitAI Download & Installation - Desktop & Server Edition",
        description:
            "Download JitAI desktop edition for local development, or choose server edition for production deployment. Supports Windows, Mac and Docker installation methods.",
    },
    privacy: {
        title: "Privacy Policy",
        description:
            "JitAI Privacy Policy - Learn how we collect, use and protect your personal information",
    },
    "terms-of-service": {
        title: "Terms of Service",
        description:
            "JitAI User Service Agreement - Learn about the terms and conditions for using JitAI products and services",
    },
    "mac-security": {
        title: "macOS Security Notice - JitAI Installation Guide",
        description:
            "macOS system security settings guide to help you properly install and run JitAI applications.",
    },
    blog: {
        title: "Blog",
        description:
            "Explore the latest trends in AI application development, learn practical technical tutorials, and discover the latest features and success stories of the JitAI platform",
    },
    referral: {
        title: "JitAI Referral Rewards - Invite Friends to Earn App Quotas",
        description:
            "Invite friends to register JitAI. For each successful referral, your desktop license app limit increases by 1, up to a maximum of 10 apps. Join the referral program now!",
    },
    contact: {
        title: "Contact Sales",
        description:
            "Contact our sales team to get more information about JitAI and how it can help your business.",
    },
};

export default PAGE_METADATA_EN;
