const CONTENT = {
    navItems: [
        {
            id: "home",
            label: "首页",
            type: "currentPage",
            url: "/zh/",
        },
        // {
        //   id: 'pricing',
        //   label: '价格',
        //   type: 'currentPage',
        //   url: '/zh/pricing',
        //   external: true
        // },
        {
            id: "agent-products",
            label: "Agent产品",
            type: "currentPage",
            url: "/zh/agent-products",
        },
        {
            id: "industry-agents",
            label: "行业Agent",
            type: "currentPage",
            url: "/zh/industry-agents",
        },
        {
            id: "develop",
            label: "开发",
            type: "dropdown",
            url: "/zh/docs/tutorial",
            children: [
                {
                    id: "docs",
                    label: "文档",
                    type: "currentPage",
                    url: "/zh/docs/tutorial",
                },
                {
                    id: "forum",
                    label: "论坛",
                    type: "newTab",
                    url: "https://forum.jit.pro",
                },
            ],
        },
        {
            id: "contact",
            label: "联系我们",
            type: "currentPage",
            url: "/zh/contact",
        },
    ],
    tryOnlineButton: {
        id: "try-online",
        label: "在线试用",
        type: "newTab",
        url: "https://demo.jit.pro/wanyun/AdminApp",
    },
    downloadButton: {
        id: "download",
        label: "立即下载",
        type: "currentPage",
        url: "/zh/download",
    },
};

export default CONTENT;
