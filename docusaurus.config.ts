import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'JitAi',
  tagline: '为AI而生的下一代应用开发技术体系，加快AI应用进程，开启AI应用规模化时代',
  favicon: 'img/jit.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://jit.pro',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Algolia site verification
  headTags: [
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
  onBrokenMarkdownLinks: 'throw',  // 断开的Markdown链接也应该导致构建失败
  onBrokenAnchors: 'throw',        // 断开的锚点导致构建失败

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
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
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
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
          sidebarId: 'indexSidebar',
          position: 'left',
          label: '导读',
        },
         {
           type: 'docSidebar',
           sidebarId: 'tutorialSidebar',
           position: 'left',
           label: '入门教程',
         },
         {
           type: 'docSidebar',
           sidebarId: 'devguideSidebar',
           position: 'left',
           label: '应用开发指南',
         },
         {
           type: 'docSidebar',
           sidebarId: 'extguideSidebar',
           position: 'left',
           label: '框架扩展指南',
         },
         {
           type: 'docSidebar',
           sidebarId: 'referenceSidebar',
           position: 'left',
           label: '参考手册',
         },
         {
           type: 'docSidebar',
           sidebarId: 'appmarketSidebar',
           position: 'left',
           label: '应用市场',
         },
         {
           type: 'docSidebar',
           sidebarId: 'opensourceSidebar',
           position: 'left',
           label: '开源',
         },
        // {to: '/blog', label: '博客', position: 'left'},
        {
           type: 'docSidebar',
           sidebarId: 'communitySidebar',
           position: 'left',
           label: '社区论坛',
         },
        //GitHub
        // {
        //   href: 'https://github.com/jitai-team',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '产品',
          items: [
            {
              label: '官网首页',
              to: '/',
            },
            {
              label: 'What is JitAi',
              to: '/docs/index/WhatIsJitAi',
            },
            {
              label: 'Why JitAi',
              to: '/docs/index/WhyJitAi',
            },
            {
              label: 'JitAi 架构与原理',
              to: '/docs/index/体系结构与原理',
            }
          ],
        },
        {
          title: '帮助文档',
          items: [
            {
              label: '文档概览',
              to: '/docs/index/',
            },
            {
              label: '入门教程',
              to: '/docs/tutorial/',
            },
            {
              label: '应用开发指南',
              to: '/docs/devguide/',
            },
            {
              label: '框架扩展指南',
              to: '/docs/extguide/',
            },
            {
              label: '参考手册',
              to: '/docs/reference/',
            }
          ],
        },
        // {
        //   title: '社区',
        //   items: [
        //     {
        //       label: 'Slack',
        //       href: 'https://join.slack.com/t/jit-pro/shared_invite/zt-23999999999999999999999999999999',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/jitai',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/jitai',
        //     },
        //   ],
        // },
         {
           title: '更多',
           items: [
            {
              label: '社区论坛',
              href: 'https://forum.jit.pro/',
            },
             {
               label: 'GitHub',
               href: 'https://github.com/jitai-team',
             },
           ],
         },
      ],
      logo: {
        alt: '下一代AI应用开发技术体系',
        src: 'https://jit-www.oss-cn-beijing.aliyuncs.com/logo/logo_title_dark.svg',
        href: 'https://jit.pro',
        width: 340,
        height: 100
      },
      copyright: `Copyright © ${new Date().getFullYear()} Jit, Inc. Built with 万云 Co., Ltd.`,
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
    //algolia: {
      // The application ID provided by Algolia
    //  appId: 'DZ5X5FUUCG',

      // Public API key: it is safe to commit it
    //  apiKey: 'a3d6338cf6bd1e789ab3c6d7064e0796',

    //  indexName: 'jitai_docs',

      // Optional: see doc section below
    //  contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
    //  externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
    //  replaceSearchResultPathname: {
      //  from: '/docs/', // or as RegExp: /\/docs\//
      //  to: '/',
      //},

      // Optional: Algolia search parameters
    //  searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
    //  searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
    //  insights: false,

      //... other Algolia params
    //},
  } satisfies Preset.ThemeConfig,
};

export default config;
