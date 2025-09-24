const CONTENT = {
  navItems: [
    {
      id: 'home',
      label: '首页',
      type: 'link',
      isNewTab: false,
      url: '/zh',
      external: true
    },    
    // {
    //   id: 'pricing',
    //   label: '价格',
    //   type: 'link',
    //   isNewTab: false,
    //   url: '/zh/pricing',
    //   external: true
    // },
    {
      id: 'download',
      label: '下载',
      type: 'link',
      isNewTab: true,
      url: '/zh/docs/tutorial/download-installation',
      external: true
    },
    {
      id: 'guide',
      label: '文档',
      type: 'link',
      isNewTab: true,
      url: '/zh/docs/tutorial',
      external: true
    },
    {
      id: 'community',
      label: '社区',
      type: 'link',
      isNewTab: true,
      url: 'https://forum.jit.pro/',
      external: true
    },
  ],
  tryOnlineButton: {
    id: 'try-online',
    label: '在线试用',
    type: 'button',
    isNewTab: true,
    url: 'https://jit.pro/',
    external: true
  }
};

export default CONTENT;