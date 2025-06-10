# 贡献指南

感谢您对 JitAi 开发者文档项目的关注和贡献意愿！本指南将帮助您了解如何参与到项目中来，让我们一起打造更好的开发者体验。

## 🏗️ 技术架构

本项目基于 [Docusaurus](https://docusaurus.io/) 构建，这是一个现代化的静态网站生成器，专为文档网站设计。了解 Docusaurus 的特性将帮助您更好地参与项目贡献。

### Docusaurus 核心特性

- **📝 Markdown 支持**：支持标准 Markdown 语法和扩展功能
- **⚛️ React 组件**：可以在 Markdown 中嵌入 React 组件
- **🎨 主题系统**：灵活的主题配置和自定义
- **🔍 搜索功能**：内置全文搜索支持
- **🌐 国际化**：多语言支持
- **📱 响应式设计**：自动适配各种屏幕尺寸

### 有用的 Docusaurus 功能

在编写文档时，您可以使用以下 Docusaurus 特有的功能：

#### 告示框 (Admonitions)
```markdown
:::tip 提示
这是一个有用的提示信息。
:::

:::info 信息
这是一般性信息。
:::

:::warning 警告
这是需要注意的警告信息。
:::

:::danger 危险
这是严重警告信息。
:::
```

#### 代码块高亮
```markdown
```javascript title="示例代码"
const config = {
  title: 'JitAi',
  tagline: '为AI而生的开发平台'
};
```
```

#### Tabs 组件
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="windows" label="Windows">
    Windows 相关内容
  </TabItem>
  <TabItem value="mac" label="Mac">
    Mac 相关内容
  </TabItem>
</Tabs>
```

更多功能请参考 [Docusaurus 官方文档](https://docusaurus.io/docs)。

## 🌟 贡献方式

我们欢迎各种形式的贡献：

- 📝 **文档改进**：修正错误、完善内容、优化表达
- 🐛 **问题报告**：发现并报告文档中的问题
- 💡 **功能建议**：提出新的功能需求或改进建议
- 🎨 **界面优化**：改进文档网站的用户体验
- 🔧 **代码贡献**：参与网站功能开发和维护
- 🌍 **本地化**：帮助翻译文档到其他语言

## 📋 开始之前

### 环境准备

确保您的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0 (推荐) 或 npm >= 8.0.0
- **Git**: 最新稳定版本

### 代码规范

我们遵循以下代码规范：

- **JavaScript/TypeScript**: 使用 ESLint 和 Prettier
- **Markdown**: 遵循 CommonMark 规范
- **提交信息**: 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

## 🚀 快速开始

### 1. Fork 和克隆

```bash
# Fork 仓库到您的 GitHub 账户
# 然后克隆您的 fork

git clone https://github.com/YOUR_USERNAME/jitai-docs.git
cd jitai-docs

# 添加上游仓库
git remote add upstream https://github.com/jitai-team/jitai-docs.git
```

### 2. 安装依赖

```bash
yarn install
```

### 3. 启动开发服务器

```bash
yarn start
```

### 4. 创建特性分支

```bash
git checkout -b feature/your-feature-name
```

## 📝 文档贡献指南

### 文档结构

```
docs/
├── tutorial/              # 教程文档
│   ├── 00快速上手/       # 入门指南
│   ├── 01概述/           # 系统概述
│   ├── 02实例教程/       # 实战案例
│   ├── 03指南/           # 详细指南
│   └── 04进阶指南/       # 高级主题
├── cases/                # 案例展示
└── community/            # 社区文档
```

### Docusaurus 特定文件

- **`docusaurus.config.ts`**: 网站主配置文件
- **`sidebars.ts`**: 侧边栏配置，定义文档的导航结构
- **`src/`**: 自定义页面和组件
- **`static/`**: 静态资源文件（图片、字体等）
- **`blog/`**: 博客文章目录
- **`_category_.json`**: 目录分类配置（在各子目录中）

### 文档编写规范

#### Markdown 规范

- 使用中文的标点符号
- 中英文之间添加空格，如："JitAi 平台"
- 代码块使用三个反引号，并指定语言
- 链接使用有意义的描述文字

#### 内容规范

- **准确性**：确保技术内容的准确性
- **完整性**：提供完整的操作步骤和示例
- **清晰性**：使用简洁明了的语言
- **一致性**：保持术语和格式的一致性

#### 示例格式

```markdown
# 标题

## 二级标题

### 三级标题

这是一段说明文字，介绍某个功能的用法。

```bash
# 这是一个代码示例
yarn start
```

:::tip 提示
这是一个重要的提示信息。
:::

:::warning 注意
这是一个需要注意的事项。
:::
```

### 图片和媒体

- 图片存放在对应章节的 `img/` 目录下
- 使用有意义的文件名，如 `installation-step1.png`
- 优化图片大小，保持清晰度的同时控制文件大小
- 为图片添加适当的 alt 文本

## 🐛 问题报告

### 报告问题前的检查

在创建新的 Issue 前，请：

1. 搜索现有的 Issues，确认问题尚未被报告
2. 确认您使用的是最新版本的文档
3. 准备详细的问题描述和复现步骤

### Issue 模板

请使用以下模板报告问题：

```markdown
## 问题描述
简洁清楚地描述问题是什么。

## 复现步骤
描述复现问题的步骤：
1. 访问页面 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

## 期望行为
清楚简洁地描述您期望发生什么。

## 实际行为
清楚简洁地描述实际发生了什么。

## 截图
如果适用，添加截图来帮助解释您的问题。

## 环境信息
- 操作系统: [例如 macOS 12.6]
- 浏览器: [例如 Chrome 108.0]
- 设备: [例如 MacBook Pro 2021]

## 补充信息
添加关于问题的任何其他上下文信息。
```

## 💻 代码贡献流程

### 1. 选择任务

- 查看 [Issues](https://github.com/jitai-team/jitai-docs/issues) 寻找标记为 `good first issue` 的任务
- 在 Issue 中留言表明您想要处理该问题
- 等待维护者确认分配

### 2. 开发流程

```bash
# 同步上游代码
git fetch upstream
git checkout master
git merge upstream/master

# 创建特性分支
git checkout -b feature/your-feature-name

# 进行开发
# ...

# 测试您的更改
yarn build
yarn start

# 提交更改
git add .
git commit -m "feat: add new documentation section"

# 推送分支
git push origin feature/your-feature-name
```

### 3. 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 类型说明

- `feat`: 新功能
- `fix`: 问题修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例

```
docs: 添加 API 认证章节

为开发者指南添加了详细的 API 认证说明，包括：
- JWT 令牌获取和使用
- API 密钥管理
- 权限范围说明

Closes #123
```

### 4. 创建 Pull Request

在创建PR之前，请确保：

- ✅ 您的文档使用了适当的 Docusaurus 功能（如告示框、代码块、Tabs等）
- ✅ 新添加的页面已正确配置在 `sidebars.ts` 中
- ✅ 所有的内部链接都能正常工作
- ✅ 构建过程没有错误或警告

#### PR 标题格式

使用与提交信息相同的格式：

```
docs: 添加 API 认证章节
```

#### PR 描述模板

```markdown
## 更改说明
描述这个 PR 的主要更改内容。

## 更改类型
- [ ] 文档内容更新
- [ ] 网站功能改进
- [ ] 问题修复
- [ ] 新功能添加
- [ ] 代码重构

## 测试
- [ ] 本地构建测试通过
- [ ] 内容审查完成
- [ ] 链接检查正常

## 相关 Issues
- Closes #(issue number)
- Related to #(issue number)

## 截图
如果适用，请添加相关截图。

## 检查清单
- [ ] 我已经阅读了贡献指南
- [ ] 我的代码遵循项目的代码规范
- [ ] 我已经自我审查了我的更改
- [ ] 我已经添加了必要的文档说明
- [ ] 我的更改不会产生新的警告
```

## 🔍 代码审查

### 审查流程

1. **自动检查**：PR 会自动运行构建和测试
2. **维护者审查**：项目维护者会审查代码和文档
3. **讨论和修改**：根据反馈进行必要的修改
4. **合并**：通过审查后合并到主分支

### 审查标准

- **功能性**：代码按预期工作
- **质量**：遵循项目的代码规范
- **文档**：包含必要的文档和注释
- **测试**：包含适当的测试（如适用）
- **一致性**：与现有代码风格保持一致

## 🌍 本地化贡献

我们欢迎将文档翻译成其他语言的贡献。如果您想参与翻译工作：

1. 在 Issues 中创建翻译提案
2. 等待维护者确认翻译计划
3. 按照文档结构创建对应语言的文档目录
4. 提交翻译内容的 PR

## 📞 获取帮助

如果您在贡献过程中遇到任何问题：

- 📋 查看 [Issues](https://github.com/jitai-team/jitai-docs/issues) 寻找相似问题
- 💬 在 [Discussions](https://github.com/jitai-team/jitai-docs/discussions) 中提问
- 📧 通过 Issues 联系维护者

## 🎖️ 贡献者认可

我们重视每一位贡献者的努力：

- 所有贡献者都会在项目文档中得到认可
- 重要贡献者会被邀请成为项目维护者
- 我们会定期发布贡献者排行榜

---

再次感谢您对 JitAi 开发者文档项目的贡献！让我们共同打造更好的开发者体验。 🚀 