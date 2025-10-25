const CONTENT = {
  navItems: [
    {
      id: 'home',
      label: '首页',
      type: 'currentPage',
      url: '/zh',
    },    
    // {
    //   id: 'pricing',
    //   label: '价格',
    //   type: 'currentPage',
    //   url: '/zh/pricing',
    //   external: true
    // },
    {
      id: 'download',
      label: '下载',
      type: 'currentPage',
      url: '/zh/download',
    },
    {
      id: 'guide',
      label: '文档',
      type: 'newTab',
      url: '/zh/docs/tutorial',
    },
    {
      id: 'forum',
      label: '论坛',
      type: 'newTab',
      url: 'https://forum.jit.pro',
    },
    {
      id: 'blog',
      label: '博客',
      type: 'currentPage',
      url: '/zh/blog',
    },
  ],
  tryOnlineButton: {
    id: 'try-online',
    label: '在线试用',
    type: 'newTab',
    url: 'https://demo.jit.pro',
  },
  downloadButton: {
    id: 'download',
    label: '立即下载',
    type: 'currentPage',
    url: '/zh/download',
  }
};

export default CONTENT;