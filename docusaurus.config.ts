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

  onBrokenLinks: 'throw',              // 暂时设置为警告，待文档结构调整完成后改为throw
  onBrokenMarkdownLinks: 'throw',   // 断开的Markdown链接设置为警告
  onBrokenAnchors: 'throw',         // 断开的锚点设置为警告

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
        htmlLang: 'zh-Hans',
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
           sidebarId: 'tutorialSidebar',
           position: 'left',
           label: 'Tutorial',
         },
         {
           type: 'docSidebar',
           sidebarId: 'devguideSidebar',
           position: 'left',
           label: 'Development Guide',
         },
         {
           type: 'docSidebar',
           sidebarId: 'extguideSidebar',
           position: 'left',
           label: 'Extension Guide',
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
        {
           type: 'docSidebar',
           sidebarId: 'communitySidebar',
           position: 'left',
           label: 'Community Forum',
         },
        //GitHub
        // {
        //   href: 'https://github.com/jitai-team',
        //   label: 'GitHub',
        //   position: 'right',
        // },
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
            }
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial/',
            },
            {
              label: 'Development Guide',
              to: '/docs/devguide/',
            },
            {
              label: 'Extension Guide',
              to: '/docs/extguide/',
            },
            {
              label: 'Reference',
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
           title: 'More',
           items: [
            {
              label: 'Community Forum',
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
      indexName: '应用开发指南',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
