const CONTENT = {
  navItems: [
    {
      id: 'home',
      label: 'Home',
      type: 'link',
      isNewTab: false,
      url: '/v1_index',
      external: true
    },    
    // {
    //   id: 'pricing',
    //   label: 'Pricing',
    //   type: 'link',
    //   isNewTab: false,
    //   url: '/pricing',
    //   external: true
    // },
    {
      id: 'download',
      label: 'Download',
      type: 'link',
      isNewTab: false,
      url: '/v1_download',
      external: true
    },
    {
      id: 'guide',
      label: 'Docs',
      type: 'link',
      isNewTab: true,
      url: '/docs/tutorial',
      external: true
    },
    {
      id: 'community',
      label: 'Community',
      type: 'link',
      isNewTab: true,
      url: 'https://forum.jit.pro',
      external: true
    },
  ],
  tryOnlineButton: {
    id: 'try-online',
    label: 'Try Online',
    type: 'button',
    isNewTab: true,
    url: 'https://demo.jit.pro',
    external: true
  }
};

export default CONTENT;