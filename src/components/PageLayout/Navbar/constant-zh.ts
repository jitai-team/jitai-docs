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
                    id: "tutorial",
                    label: "入门教程",
                    type: "currentPage",
                    url: "/zh/docs/tutorial",
                },
                {
                    id: "devguide",
                    label: "开发者指南",
                    type: "currentPage",
                    url: "/zh/docs/devguide",
                },
                {
                    id: "reference",
                    label: "参考手册",
                    type: "currentPage",
                    url: "/zh/docs/reference",
                },
                {
                    id: "extguide",
                    label: "扩展指南",
                    type: "currentPage",
                    url: "/zh/docs/extguide",
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
