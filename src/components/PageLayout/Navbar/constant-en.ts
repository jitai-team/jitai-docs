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
            id: "download",
            label: "Download",
            type: "currentPage",
            url: "/download",
            class: "analytics-download",
        },
        {
            id: "guide",
            label: "Docs",
            type: "newTab",
            url: "/docs/tutorial",
        },
        {
            id: "forum",
            label: "Forum",
            type: "newTab",
            url: "https://forum.jit.pro",
        },
        // {
        //     id: "blog",
        //     label: "Blog",
        //     type: "currentPage",
        //     url: "/blog",
        // },
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
    caseCategory: [
        "Customer Management System",
        "Full-Chain Business System",
        "Collaborative System",
    ],
};

export default CONTENT;
