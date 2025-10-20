# JitAI 博客汇总页面

这是一个基于 Docusaurus 框架的博客汇总页面，使用主题覆盖的方式实现与首页风格匹配的卡片式布局。

## 功能特性

- 🎨 **首页风格设计** - 与首页完全匹配的设计语言
- 📱 **响应式布局** - 支持桌面端和移动端
- 🌐 **国际化支持** - 支持中英文切换
- 🏷️ **标签显示** - 显示文章标签
- ✨ **动画效果** - 流畅的悬停和过渡动画
- 🎯 **纯色设计** - 使用纯色，无渐变色

## 实现方式

使用 Docusaurus 的主题覆盖机制，通过 `src/theme/BlogListPage/` 覆盖默认的博客列表页面。

## 文件结构

```
src/
└── theme/
    └── BlogListPage/           # 博客列表主题覆盖
        ├── index.tsx           # 主组件
        └── styles.module.css   # 样式文件
```

## 使用方法

### 1. 添加博客文章

在 `blog/` 目录下创建新的 Markdown 文件：

```markdown
---
slug: my-new-post
title: My New Post
authors: [author1, author2]
tags: [AI, Development]
---

Your blog post content here...
```

### 2. 访问博客页面

- 博客列表：`/blog`
- 博客详情：`/blog/[slug]`

### 3. 样式自定义

所有样式都使用 CSS 变量，可以在 `src/pages/index.module.css` 中修改：

```css
:root {
  --color-primary: #3D65FD;
  --color-secondary: #131C43;
  --bg-primary: #ffffff;
  --bg-secondary: #f0f4ff;
  /* ... 更多变量 */
}
```

## 设计特点

### 色彩系统
- 主色调：`#3D65FD` (蓝色)
- 次要色：`#131C43` (深蓝)
- 背景色：纯色设计，无渐变色

### 组件样式
- 卡片设计：圆角、阴影、悬停效果
- 响应式网格：自适应列数
- 纯色图标：简洁的 SVG 图标

### 响应式设计
- 桌面端：多列网格布局
- 平板端：自适应列数
- 移动端：单列布局

## 技术实现

- **主题覆盖**：使用 Docusaurus 的 `src/theme/` 机制
- **类型安全**：TypeScript 支持
- **样式隔离**：CSS Modules
- **数据绑定**：直接使用 Docusaurus 的博客数据

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发说明

1. 确保 Docusaurus 配置中启用了博客功能
2. 在 `blog/` 目录下添加文章
3. 访问 `/blog` 查看效果
4. 修改 `src/theme/BlogListPage/styles.module.css` 自定义样式

## 许可证

MIT License
