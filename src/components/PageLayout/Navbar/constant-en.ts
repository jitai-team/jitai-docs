const CONTENT = {
  navItems: [
    {
      id: 'home',
      label: 'Home',
      type: 'currentPage',
      url: '/',
    },    
    // {
    //   id: 'pricing',
    //   label: 'Pricing',
    //   type: 'currentPage',
    //   url: '/pricing',
    // },
    {
      id: 'download',
      label: 'Download',
      type: 'currentPage',
      url: '/download',
    },
    {
      id: 'guide',
      label: 'Docs',
      type: 'newTab',
      url: '/docs/tutorial',
    },
    {
      id: 'forum',
      label: 'Forum',
      type: 'newTab',
      url: 'https://forum.jit.pro',
    },
    {
      id: 'blog',
      label: 'Blog',
      type: 'currentPage',
      url: '/blog',
    },
  ],
  tryOnlineButton: {
    id: 'try-online',
    label: 'Try Online',
    type: 'newTab',
    url: 'https://demo.jit.pro',
  },
  downloadButton: {
    id: 'download',
    label: 'Download',
    type: 'currentPage',
    url: '/download',
  }
};

export default CONTENT;