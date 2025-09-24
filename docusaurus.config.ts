import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'JitAi',
  tagline: 'Next-generation application development technology system designed for AI, accelerating AI application processes and ushering in the era of large-scale AI applications',
  favicon: 'img/jit.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  trailingSlash: false,
  // Set the production url of your site here
  url: 'https://jit.pro',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // Algolia site verification and Google Tag Manager
  headTags: [
    // Google Tag Manager
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K39JND5X');`,
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: 'E1854FDB4BA5E984',
      },
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jitai-team', // Usually your GitHub org/user name.
  projectName: 'jitai-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      'zh': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
    },
  },
  noIndex: false, // 等文档完善后，再放开

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jitai-team/jitai-docs/tree/master',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jitai-team/jitai-docs/tree/master',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/variables.css', './src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],
  // 添加客户端模块
  clientModules: ['./src/clientModules/readingProgress.js'],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    // Replace with your project's social card
    image: 'https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_dark.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true, // 暂时禁用主题切换， 因为 深色模式下 logo 要调整，以及官网要强制为浅色模式
      // respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Jit Logo',
        src: 'https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_title.png',
        srcDark: 'https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_title_dark.svg',  // logo 大小待调整
      },
      items: [
         {
           type: 'docSidebar',
           sidebarId: 'tutorialSidebar',
           position: 'left',
           label: 'Tutorial',
         },
         {
           type: 'docSidebar',
           sidebarId: 'devguideSidebar',
           position: 'left',
           label: 'Developer Guide',
         },
         {
           type: 'docSidebar',
           sidebarId: 'extguideSidebar',
           position: 'left',
           label: 'Extending',
         },
         {
           type: 'docSidebar',
           sidebarId: 'referenceSidebar',
           position: 'left',
           label: 'Reference',
         },
         //{
           //type: 'docSidebar',
         //  sidebarId: 'appmarketSidebar',
        // position: 'left',
         //  label: '应用市场',
         //},
         {
           type: 'docSidebar',
           sidebarId: 'opensourceSidebar',
           position: 'left',
           label: 'Open Source',
         },
        // {to: '/blog', label: '博客', position: 'left'},
        //{
        //  type: 'docSidebar',
        //  sidebarId: 'appmarketSidebar',
        //  position: 'left',
        // label: 'App Market',
        //},
        // {to: '/blog', label: '博客', position: 'left'},
         {
           href: 'https://forum.jit.pro',
           position: 'left',
           label: 'Community',
         },
        //GitHub  目前GitHub上没有开源项目，而且当前菜单中有 「开源」菜单，为节省菜单空间，这里先隐藏
        //  {
        //    href: 'https://github.com/jitai-team',
        //    label: 'GitHub',
        //    position: 'right',
        //  },
        {
          href: 'https://demo.jit.pro',
          position: 'left',
          label: 'Try Online',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Download',
              to: '/docs/tutorial/download-installation',
            },
            {
              label: 'Try Online',
              to: 'https://demo.jit.pro',
            }
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial',
            },
            {
              label: 'Developer Guide',
              to: '/docs/devguide',
            },
            {
              label: 'Extending',
              to: '/docs/extguide',
            },
            {
              label: 'Reference',
              to: '/docs/reference',
            }
          ],
        },
         {
           title: 'Social',
           items: [
            {
              label: 'Community',
              href: 'https://forum.jit.pro',
            },
             {
               label: 'GitHub',
               href: 'https://github.com/jitai-team',
             },
             {
               label: 'X (Twitter)',
               href: 'https://x.com/JitAi2017',
             },
             {
               label: 'Youtube',
               href: 'https://www.youtube.com/channel/UClvTNJPvBhek3aFuDy87RJQ',
             },
             {
               label: 'Instagram',
               href: 'https://www.instagram.com/jitai_2017',
             },
           ],
         },
      ],
      logo: {
        alt: 'Next-generation AI application development technology system',
        src: 'https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_title_dark.svg',
        href: 'https://jit.pro',
        width: 340,
        height: 100
      },
      copyright: `Copyright © ${new Date().getFullYear()} Jit, Inc. Built with WanYun Co., Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
    algolia: {
      appId: 'DZ5X5FUUCG',
      apiKey: 'a3d6338cf6bd1e789ab3c6d7064e0796',
      indexName: 'crawler_doc_spider',
      contextualSearch: false,  // 禁用上下文搜索以避免过度过滤
      searchPagePath: 'search',
      insights: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
