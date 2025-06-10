# Contributing Guide

Thank you for your interest in contributing to the JitAi Developer Documentation project! This guide will help you understand how to participate in the project and work together to create a better developer experience.

## 🏗️ Technical Architecture

This project is built with [Docusaurus](https://docusaurus.io/), a modern static site generator designed specifically for documentation websites. Understanding Docusaurus features will help you better contribute to the project.

### Docusaurus Core Features

- **📝 Markdown Support**: Supports standard Markdown syntax and extended features
- **⚛️ React Components**: Embed React components in Markdown
- **🎨 Theme System**: Flexible theme configuration and customization
- **🔍 Search Functionality**: Built-in full-text search support
- **🌐 Internationalization**: Multi-language support
- **📱 Responsive Design**: Automatically adapts to various screen sizes

### Useful Docusaurus Features

When writing documentation, you can use the following Docusaurus-specific features:

#### Admonitions
```markdown
:::tip Tip
This is a helpful tip.
:::

:::info Info
This is general information.
:::

:::warning Warning
This is a warning that needs attention.
:::

:::danger Danger
This is a serious warning.
:::
```

#### Code Block Highlighting
```markdown
```javascript title="Example Code"
const config = {
  title: 'JitAi',
  tagline: 'AI-driven development platform'
};
```
```

#### Tabs Component
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="windows" label="Windows">
    Windows-related content
  </TabItem>
  <TabItem value="mac" label="Mac">
    Mac-related content
  </TabItem>
</Tabs>
```

For more features, please refer to the [Docusaurus Official Documentation](https://docusaurus.io/docs).

## 🌟 Ways to Contribute

We welcome various forms of contributions:

- 📝 **Documentation Improvement**: Fix errors, improve content, optimize expression
- 🐛 **Issue Reporting**: Discover and report issues in documentation
- 💡 **Feature Suggestions**: Propose new feature requirements or improvement suggestions
- 🎨 **Interface Optimization**: Improve user experience of the documentation website
- 🔧 **Code Contributions**: Participate in website feature development and maintenance
- 🌍 **Localization**: Help translate documentation to other languages

## 📋 Before You Start

### Environment Setup

Ensure your development environment meets the following requirements:

- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0 (recommended) or npm >= 8.0.0
- **Git**: Latest stable version

### Code Standards

We follow these code standards:

- **JavaScript/TypeScript**: Use ESLint and Prettier
- **Markdown**: Follow CommonMark specification
- **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/) specification

## 🚀 Quick Start

### 1. Fork and Clone

```bash
# Fork the repository to your GitHub account
# Then clone your fork

git clone https://github.com/YOUR_USERNAME/jitai-docs.git
cd jitai-docs

# Add upstream repository
git remote add upstream https://github.com/jitai-team/jitai-docs.git
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn start
```

### 4. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

## 📝 Documentation Contribution Guide

### Documentation Structure

```
docs/
├── tutorial/              # Tutorial documentation
│   ├── 00快速上手/       # Getting started guide
│   ├── 01概述/           # System overview
│   ├── 02实例教程/       # Practical cases
│   ├── 03指南/           # Detailed guides
│   └── 04进阶指南/       # Advanced topics
├── cases/                # Case studies
└── community/            # Community documentation
```

### Docusaurus Specific Files

- **`docusaurus.config.ts`**: Main website configuration file
- **`sidebars.ts`**: Sidebar configuration, defines documentation navigation structure
- **`src/`**: Custom pages and components
- **`static/`**: Static asset files (images, fonts, etc.)
- **`blog/`**: Blog posts directory
- **`_category_.json`**: Category configuration (in subdirectories)

### Documentation Writing Standards

#### Markdown Standards

- Use proper punctuation
- Add spaces between English and other languages, e.g., "JitAi platform"
- Use triple backticks for code blocks and specify the language
- Use meaningful descriptive text for links

#### Content Standards

- **Accuracy**: Ensure technical content accuracy
- **Completeness**: Provide complete operation steps and examples
- **Clarity**: Use concise and clear language
- **Consistency**: Maintain terminology and format consistency

#### Example Format

```markdown
# Title

## Secondary Title

### Tertiary Title

This is explanatory text introducing the usage of a feature.

```bash
# This is a code example
yarn start
```

:::tip Tip
This is important tip information.
:::

:::warning Note
This is something that needs attention.
:::
```

### Images and Media

- Store images in the corresponding chapter's `img/` directory
- Use meaningful file names, such as `installation-step1.png`
- Optimize image size while maintaining clarity
- Add appropriate alt text for images

## 🐛 Issue Reporting

### Pre-reporting Checklist

Before creating a new Issue, please:

1. Search existing Issues to confirm the issue hasn't been reported
2. Confirm you're using the latest version of documentation
3. Prepare detailed issue description and reproduction steps

### Issue Template

Please use the following template to report issues:

```markdown
## Issue Description
Clearly and concisely describe the issue.

## Reproduction Steps
Describe the steps to reproduce the issue:
1. Visit page '...'
2. Click '...'
3. Scroll to '...'
4. See error

## Expected Behavior
Clearly and concisely describe what you expected to happen.

## Actual Behavior
Clearly and concisely describe what actually happened.

## Screenshots
If applicable, add screenshots to help explain your issue.

## Environment Information
- Operating System: [e.g., macOS 12.6]
- Browser: [e.g., Chrome 108.0]
- Device: [e.g., MacBook Pro 2021]

## Additional Information
Add any other context about the issue.
```

## 💻 Code Contribution Process

### 1. Choose a Task

- Check [Issues](https://github.com/jitai-team/jitai-docs/issues) for tasks marked as `good first issue`
- Comment on the Issue to indicate you want to handle it
- Wait for maintainer confirmation and assignment

### 2. Development Process

```bash
# Sync upstream code
git fetch upstream
git checkout master
git merge upstream/master

# Create feature branch
git checkout -b feature/your-feature-name

# Develop
# ...

# Test your changes
yarn build
yarn start

# Commit changes
git add .
git commit -m "feat: add new documentation section"

# Push branch
git push origin feature/your-feature-name
```

### 3. Commit Standards

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Type Descriptions

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Code formatting adjustments (no functional impact)
- `refactor`: Code refactoring
- `test`: Testing related
- `chore`: Build process or auxiliary tool changes

#### Example

```
docs: add API authentication section

Added detailed API authentication instructions for developer guide, including:
- JWT token acquisition and usage
- API key management
- Permission scope description

Closes #123
```

### 4. Create Pull Request

Before creating a PR, please ensure:

- ✅ Your documentation uses appropriate Docusaurus features (such as admonitions, code blocks, Tabs, etc.)
- ✅ Newly added pages are correctly configured in `sidebars.ts`
- ✅ All internal links work properly
- ✅ Build process has no errors or warnings

#### PR Title Format

Use the same format as commit messages:

```
docs: add API authentication section
```

#### PR Description Template

```markdown
## Change Description
Describe the main changes in this PR.

## Change Type
- [ ] Documentation content update
- [ ] Website feature improvement
- [ ] Bug fix
- [ ] New feature addition
- [ ] Code refactoring

## Testing
- [ ] Local build test passed
- [ ] Content review completed
- [ ] Link check normal

## Related Issues
- Closes #(issue number)
- Related to #(issue number)

## Screenshots
If applicable, please add relevant screenshots.

## Checklist
- [ ] I have read the contribution guidelines
- [ ] My code follows the project's code standards
- [ ] I have self-reviewed my changes
- [ ] I have added necessary documentation
- [ ] My changes do not generate new warnings
```

## 🔍 Code Review

### Review Process

1. **Automated Checks**: PR will automatically run builds and tests
2. **Maintainer Review**: Project maintainers will review code and documentation
3. **Discussion and Modification**: Make necessary modifications based on feedback
4. **Merge**: Merge to main branch after passing review

### Review Standards

- **Functionality**: Code works as expected
- **Quality**: Follows project code standards
- **Documentation**: Includes necessary documentation and comments
- **Testing**: Includes appropriate tests (if applicable)
- **Consistency**: Maintains consistency with existing code style

## 🌍 Localization Contributions

We welcome contributions to translate documentation into other languages. If you want to participate in translation work:

1. Create a translation proposal in Issues
2. Wait for maintainer confirmation of translation plan
3. Create corresponding language documentation directory according to documentation structure
4. Submit translation content PR

## 📞 Getting Help

If you encounter any problems during the contribution process:

- 📋 Check [Issues](https://github.com/jitai-team/jitai-docs/issues) for similar problems
- 💬 Ask questions in [Discussions](https://github.com/jitai-team/jitai-docs/discussions)
- 📧 Contact maintainers through Issues

## 🎖️ Contributor Recognition

We value every contributor's efforts:

- All contributors will be recognized in project documentation
- Important contributors will be invited to become project maintainers
- We regularly publish contributor leaderboards

---

Thank you again for your contribution to the JitAi Developer Documentation project! Let's work together to create a better developer experience. 🚀 