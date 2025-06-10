# JitAi Developer Documentation

<div align="center">

<img src="static/img/jit.png" alt="JitAi Logo" width="200" />

**Born for AI, Next-Generation Enterprise-Level AI Application Development Platform**

[![GitHub stars](https://img.shields.io/github/stars/jitai-team/jitai-docs?style=social)](https://github.com/jitai-team/jitai-docs/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jitai-team/jitai-docs?style=social)](https://github.com/jitai-team/jitai-docs/network/members)
[![GitHub issues](https://img.shields.io/github/issues/jitai-team/jitai-docs)](https://github.com/jitai-team/jitai-docs/issues)
[![GitHub license](https://img.shields.io/github/license/jitai-team/jitai-docs)](https://github.com/jitai-team/jitai-docs/blob/master/LICENSE)

[🌐 Online Documentation](https://developer.jit.pro) | [📖 Quick Start](#quick-start) | [🤝 Contributing](#contributing) | [💬 Community](#community)

**Language Versions / 语言版本:**
[🇺🇸 English](README_EN.md) | [🇨🇳 中文](README.md) | [🤝 Contributing Guide](CONTRIBUTING_EN.md) | [🤝 贡献指南](CONTRIBUTING.md)

</div>

## 📖 About the Project

JitAi Developer Documentation is a comprehensive technical documentation collection for JitAi platform users and developers. This project is committed to providing clear, accurate, and easy-to-understand technical documentation to help developers quickly get started and master the various features of the JitAi platform.

### 🌟 Key Features

- **📚 Comprehensive Coverage**: Complete development guide from quick start to advanced topics
- **🚀 Quick Start**: Develop your first AI application in 5 minutes
- **🎯 Practice-Oriented**: Rich practical tutorials and best practices
- **🔧 Developer-Friendly**: Detailed API documentation and development toolchain instructions
- **🌍 Multi-Platform Support**: Support for desktop (Windows/Mac) and server (Docker) versions
- **📱 Responsive Design**: Perfect adaptation to various devices and screen sizes

### 📋 Documentation Contents

- **Quick Start**: Platform installation, environment configuration, first AI application development
- **System Overview**: Architecture design, application specifications, element specifications, runtime mechanisms
- **Development Guide**: BaseApp, JitAi components, platform API detailed instructions
- **Practical Tutorials**: Complete project development cases such as CRM applications
- **Advanced Guide**: Local development and debugging, frontend code debugging, server log viewing
- **API Reference**: Complete reference documentation for frontend API and backend API

## 🚀 Quick Start

### System Requirements

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0 (recommended) or npm >= 8.0.0

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jitai-team/jitai-docs.git
   cd jitai-docs
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   # or use npm
   npm install
   ```

3. **Start Development Server**
   ```bash
   yarn start
   # or use npm
   npm run start
   ```

4. **Access Documentation**
   
   Open your browser and visit [http://localhost:3000](http://localhost:3000)

### Build and Deploy

```bash
# Build static files
yarn build

# Preview build results
yarn serve
```

## 🛠️ Project Structure

```
jitai-docs/
├── docs/                    # Documentation content
│   ├── tutorial/           # Tutorial documentation
│   │   ├── 00快速上手/     # Quick start guide
│   │   ├── 01概述/         # System overview
│   │   ├── 02实例教程/     # Practical cases
│   │   ├── 03指南/         # Development guide
│   │   └── 04进阶指南/     # Advanced content
│   ├── cases/              # Case studies
│   └── community/          # Community related
├── blog/                   # Blog posts
├── src/                    # Source code
│   ├── components/         # React components
│   ├── css/               # Style files
│   └── pages/             # Page components
├── static/                 # Static assets
├── docusaurus.config.ts    # Configuration file
└── sidebars.ts            # Sidebar configuration
```

## 🤝 Contributing

We warmly welcome and appreciate contributions from every developer! Whether you've found documentation errors, want to improve content quality, or hope to add new features, your participation will make this project better.

### 🐛 Report Issues

If you find errors, inaccurate descriptions, or other issues in the documentation:

1. Check the [Issues](https://github.com/jitai-team/jitai-docs/issues) page to confirm the issue hasn't been reported yet
2. Create a new Issue with detailed description:
   - Specific location of the issue (page link, section title, etc.)
   - Detailed description of the issue
   - Suggested fix (if any)
   - Related screenshots or error messages

### ✨ Submit Contributions

#### Documentation Content Contributions

1. **Fork this repository** to your GitHub account
2. **Create a feature branch**: `git checkout -b feature/improve-docs`
3. **Make changes**:
   - Fix documentation errors or improve content expression
   - Add new tutorials or examples
   - Improve API documentation
   - Optimize documentation structure and navigation
4. **Local testing**: Ensure modified documentation builds and displays correctly
5. **Commit changes**: `git commit -am 'docs: improve quick start guide'`
6. **Push branch**: `git push origin feature/improve-docs`
7. **Create Pull Request** with detailed description of your changes

#### Code Contributions

1. **Tech Stack**: Project built with Docusaurus + React + TypeScript
2. **Code Standards**: Follow existing code style and naming conventions
3. **Testing**: Ensure all changes are thoroughly tested
4. **Documentation**: Add corresponding usage instructions for new features
5. **Docusaurus Features**: Make full use of Docusaurus components and plugin system

### 📋 Contribution Guidelines

- **Commit Message Format**: 
  ```
  <type>: <description>
  
  Types include:
  - docs: Documentation updates
  - feat: New features
  - fix: Bug fixes
  - style: Code formatting adjustments
  - refactor: Code refactoring
  ```

- **Branch Naming Convention**:
  - `feature/feature-description` - New feature development
  - `fix/issue-description` - Bug fixes
  - `docs/documentation-description` - Documentation updates

### 🎖️ Contributors

Thanks to all developers who have contributed to this project:

<!-- Contributors list can be added here -->

## 💬 Community

Join our developer community to exchange experiences and get help:

- **GitHub Discussions**: [Project Discussion Area](https://github.com/jitai-team/jitai-docs/discussions)
- **GitHub Issues**: [Issue Reports and Feature Requests](https://github.com/jitai-team/jitai-docs/issues)
- **Official Website**: [https://jit.pro](https://jit.pro)

## 🙏 Acknowledgments

- Thanks to all developers who contributed code and documentation to this project
- Thanks to community members for valuable feedback and suggestions

---

<div align="center">

**If this project is helpful to you, please give us a ⭐**

Made with ❤️ by [Wuhan Wanyun Technology](https://github.com/jitai-team) Team

</div> 