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
      id: 'blog',
      label: '博客',
      type: 'currentPage',
      url: '/zh/blog',
    },
    {
      id: 'guide',
      label: '文档',
      type: 'newTab',
      url: '/zh/docs/tutorial',
    },
    {
      id: 'community',
      label: '社区',
      type: 'newTab',
      url: 'https://forum.jit.pro',
    },
  ],
  tryOnlineButton: {
    id: 'try-online',
    label: '在线试用',
    type: 'button',
    isNewTab: true,
    url: 'https://demo.jit.pro',
  }
};

export default CONTENT;