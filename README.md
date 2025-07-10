# JitAi 开发者文档

<div align="center">

<img src="static/img/jit.png" alt="JitAi Logo" width="200" />

**为AI而生的下一代应用开发技术体系**

[![GitHub stars](https://img.shields.io/github/stars/jitai-team/jitai-docs?style=social)](https://github.com/jitai-team/jitai-docs/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jitai-team/jitai-docs?style=social)](https://github.com/jitai-team/jitai-docs/network/members)
[![GitHub issues](https://img.shields.io/github/issues/jitai-team/jitai-docs)](https://github.com/jitai-team/jitai-docs/issues)
[![GitHub license](https://img.shields.io/github/license/jitai-team/jitai-docs)](https://github.com/jitai-team/jitai-docs/blob/master/LICENSE)

[🌐 在线文档](https://developer.jit.pro) | [📖 快速开始](#快速开始) | [🤝 参与贡献](#参与贡献) | [💬 社区交流](#社区交流)

**语言版本 / Language Versions:**
[🇨🇳 中文](README.md) | [🇺🇸 English](README_EN.md) | [🤝 贡献指南](CONTRIBUTING.md) | [🤝 Contributing Guide](CONTRIBUTING_EN.md)

</div>

## 📖 关于项目

JitAi 开发者文档是为 JitAi 平台用户和开发者提供的完整技术文档集合。本项目致力于为开发者提供清晰、准确、易于理解的技术文档，帮助开发者快速上手并深入掌握 JitAi 平台的各项功能。

### 🌟 主要特性

- **📚 全面覆盖**: 涵盖从快速入门到高级进阶的完整开发指南
- **🚀 快速上手**: 5分钟即可开发出第一个AI应用
- **🎯 实战导向**: 提供丰富的实例教程和最佳实践
- **🔧 开发友好**: 详细的API文档和开发工具链说明
- **🌍 多平台支持**: 支持桌面版(Windows/Mac)和服务器版(Docker)
- **📱 响应式设计**: 完美适配各种设备和屏幕尺寸

### 📋 文档内容

- **快速上手**: 平台安装、环境配置、第一个AI应用开发
- **系统概述**: 架构设计、应用规范、元素规范、运行机制
- **开发指南**: BaseApp、JitAi组件、平台API详细说明
- **实例教程**: CRM应用等完整项目开发案例  
- **进阶指南**: 本地开发调试、前端代码调试、服务器日志查看
- **API参考**: 前端API、后端API完整参考文档

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0 (推荐) 或 npm >= 8.0.0

### 本地运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/jitai-team/jitai-docs.git
   cd jitai-docs
   ```

2. **安装依赖**
   ```bash
   yarn install
   # 或者使用 npm
   npm install
   ```

3. **启动开发服务器**
   ```bash
   yarn start
   # 或者使用 npm
   npm run start
   ```

4. **访问文档**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建部署

```bash
# 构建静态文件
yarn build

# 预览构建结果
yarn serve
```

## 🛠️ 项目结构

```
jitai-docs/
├── docs/                    # 文档内容
│   ├── tutorial/           # 教程文档
│   │   ├── 00快速上手/     # 快速入门指南
│   │   ├── 01概述/         # 系统概述
│   │   ├── 02实例教程/     # 实战案例
│   │   ├── 03指南/         # 开发指南
│   │   └── 04进阶指南/     # 进阶内容
│   ├── cases/              # 案例展示
│   └── community/          # 社区相关
├── blog/                   # 博客文章
├── src/                    # 源代码
│   ├── components/         # React 组件
│   ├── css/               # 样式文件
│   └── pages/             # 页面组件
├── static/                 # 静态资源
├── docusaurus.config.ts    # 配置文件
└── sidebars.ts            # 侧边栏配置
```

## 🤝 参与贡献

我们热忱欢迎并感谢每一位开发者的贡献！无论您是发现了文档错误、想要改进内容质量，还是希望添加新的功能特性，您的参与都将让这个项目变得更好。

### 🐛 报告问题

如果您发现了文档中的错误、不准确的描述或其他问题：

1. 检查 [Issues](https://github.com/jitai-team/jitai-docs/issues) 页面，确认问题尚未被报告
2. 创建新的 Issue，请详细描述：
   - 问题的具体位置（页面链接、章节标题等）
   - 问题的详细描述
   - 建议的修改方案（如果有的话）
   - 相关的截图或错误信息

### ✨ 提交贡献

#### 文档内容贡献

1. **Fork 本仓库**到您的 GitHub 账户
2. **创建特性分支**: `git checkout -b feature/improve-docs`
3. **进行修改**:
   - 修正文档错误或改进内容表达
   - 添加新的教程或示例
   - 完善 API 文档说明
   - 优化文档结构和导航
4. **本地测试**: 确保修改后的文档能正常构建和显示
5. **提交更改**: `git commit -am 'docs: 改进快速上手指南'`
6. **推送分支**: `git push origin feature/improve-docs`
7. **创建 Pull Request**，详细说明您的更改内容

#### 代码贡献

1. **技术栈**: 项目基于现代静态网站生成技术构建
2. **代码规范**: 遵循项目现有的代码风格和命名约定
3. **测试**: 确保所有修改都经过充分测试
4. **文档**: 为新功能添加相应的使用说明

### 📋 贡献指南

- **提交信息格式**: 
  ```
  <type>: <description>
  
  类型包括:
  - docs: 文档更新
  - feat: 新功能
  - fix: 问题修复
  - style: 代码格式调整
  - refactor: 代码重构
  ```

- **分支命名规范**:
  - `feature/功能描述` - 新功能开发
  - `fix/问题描述` - 问题修复
  - `docs/文档描述` - 文档更新

### 🎖️ 贡献者

感谢所有为本项目做出贡献的开发者：

<!-- 这里可以添加贡献者列表 -->

## 💬 社区交流

加入我们的开发者社区，与其他开发者交流经验、获取帮助：

- **GitHub Discussions**: [项目讨论区](https://github.com/jitai-team/jitai-docs/discussions)
- **GitHub Issues**: [问题报告和功能请求](https://github.com/jitai-team/jitai-docs/issues)
- **官方网站**: [https://jit.pro](https://jit.pro)

## 🙏 致谢

- 感谢所有为本项目贡献代码和文档的开发者
- 感谢社区成员提供的宝贵反馈和建议

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐**

Made with ❤️ by [武汉万云科技](https://github.com/jitai-team) Team

</div>
