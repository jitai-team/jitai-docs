const CONTENT = {
    navItems: [
        {
            id: "home",
            label: "Home",
            type: "currentPage",
            url: "/",
        },
        // {
        //   id: 'pricing',
        //   label: 'Pricing',
        //   type: 'currentPage',
        //   url: '/pricing',
        // },
        {
            id: "agent-products",
            label: "Agent Products",
            type: "currentPage",
            url: "/agent-products",
        },
        {
            id: "industry-agents",
            label: "Industry Agents",
            type: "currentPage",
            url: "/industry-agents",
        },
        {
            id: "develop",
            label: "Developer",
            type: "dropdown",
            url: "/docs/tutorial",
            children: [
                {
                    id: "tutorial",
                    label: "Tutorial",
                    type: "currentPage",
                    url: "/docs/tutorial",
                },
                {
                    id: "devguide",
                    label: "Developer Guide",
                    type: "currentPage",
                    url: "/docs/devguide",
                },
                {
                    id: "reference",
                    label: "Reference",
                    type: "currentPage",
                    url: "/docs/reference",
                },
                {
                    id: "extguide",
                    label: "Extending",
                    type: "currentPage",
                    url: "/docs/extguide",
                },
                {
                    id: "forum",
                    label: "Forum",
                    type: "newTab",
                    url: "https://forum.jit.pro",
                },
            ],
        },
        {
            id: "contact",
            label: "Contact Us",
            type: "currentPage",
            url: "/contact",
        },
    ],
    tryOnlineButton: {
        id: "try-online",
        label: "Try Online",
        type: "newTab",
        url: "https://demo.jit.pro/wanyun/AdminApp",
    },
    downloadButton: {
        id: "download",
        label: "Download",
        type: "currentPage",
        url: "/download",
    },
};

export default CONTENT;
