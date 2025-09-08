export const CONTENT = {
  navItems: [
    {
      id: 'home',
      label: '首页',
      type: 'link',
      isNewTab: false,
      url: '/',
      external: true
    },    
    // {
    //   id: 'pricing',
    //   label: '价格',
    //   type: 'link',
    //   isNewTab: false,
    //   url: '/pricing',
    //   external: true
    // },
    {
      id: 'download',
      label: '下载',
      type: 'link',
      isNewTab: true,
      url: './docs/tutorial/download',
      external: true
    },
    {
      id: 'guide',
      label: '文档',
      type: 'link',
      isNewTab: true,
      url: './docs/tutorial',
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
  ]
};