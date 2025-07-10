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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jitai-team', // Usually your GitHub org/user name.
  projectName: 'jitai-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  noIndex: true, // 等文档完善后，再放开

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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '极态',
      logo: {
        alt: 'Jit Logo',
        src: 'img/jit.png',
      },
      items: [
         {
           type: 'docSidebar',
           sidebarId: 'tutorialSidebar',
           position: 'left',
           label: '文档',
         },
        // {to: '/blog', label: '博客', position: 'left'},
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'caseSidebar',
        //   position: 'left',
        //   label: '案例展示',
        // },
        {
           type: 'docSidebar',
           sidebarId: 'communitySidebar',
           position: 'left',
           label: '社区',
         },
        //GitHub
        {
          href: 'https://github.com/jitai-team',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '下载安装',
              to: '/docs/tutorial/00快速上手/01下载安装',
            },
            {
              label: '快速上手',
              to: '/docs/tutorial/00快速上手/03-5分钟开发一个AI应用（智能客服）',
            },
            {
              label: '企业级AI应用开发',
              to: '/docs/tutorial/03开发指南/02开发框架/JitAi/intro',
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
               label: 'GitHub',
               href: 'https://github.com/jitai-team',
             },
           ],
         },
      ],
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
  } satisfies Preset.ThemeConfig,
};

export default config;
