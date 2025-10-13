---
sidebar_position: -1
---
# 扩展指南导读

**为什么需要框架扩展？**

JitAi提供了丰富的官方开发框架，但在实际业务场景中，你可能会遇到：
- 特定行业需求，官方框架暂未覆盖
- 现有组件功能接近，但需要定制化调整
- 企业内部标准，需要统一的定制组件库

框架扩展正是为了解决这些问题，让你能够在JitAi生态基础上，构建满足特定需求的解决方案。

## 必须先了解JAAP {#must-understand-jaap-first}

开发者对JitAi开发框架进行扩展的认知前提是深入理解JAAP（JitAi Ai Application Protocol）中的规范，尤其是Meta、Type、Instance元素的概念和三者之间的关系。如果要对官方框架进行覆盖重写，则还需要理解继承重写的原理。

[点击此处学习JAAP](/docs/reference/runtime-platform/JAAP)

## 问题导向指引 {#problem-oriented-guide}

| 你想要实现什么 | 相关文档 |
|-------------|----------|
| 添加JitAi中没有的自定义图表组件 | [扩展自己的UI组件Type元素](/docs/extguide/add-frontend-components) |
| 让我的自定义组件可以通过拖拽界面进行配置 | [为UI组件Type元素开发可视化编辑器](/docs/extguide/develop-frontend-component-visual-editor) |
| 集成第三方服务，如Slack机器人或IoT设备 | [扩展自己的元素族类](/docs/extguide/extend-element-family-classes) |
| 为我的后端集成创建用户友好的配置面板 | [为后端Type元素开发可视化编辑器](/docs/extguide/develop-backend-element-visual-editor) |
| 构建具有特定布局和行为的自定义页面模板 | [扩展自己的页面Type及其编辑器](/docs/extguide/extend-page-type-editor)<CardGroup><Card title="理解页面是如何被加载的" href="/docs/extguide/extend-page-type-editor#understanding-how-pages-are-loaded"><ul><li>[一次页面加载之旅](/docs/extguide/extend-page-type-editor#the-page-loading-journey)</li><li>[Loader - 灵活性的秘密](/docs/extguide/extend-page-type-editor#loader-the-secret-to-flexibility)</li><li>[为什么Vue页面需要自定义Loader](/docs/extguide/extend-page-type-editor#why-vue-pages-need-custom-loaders)</li></ul></Card><Card title="开发计时器页面Type" href="/docs/extguide/extend-page-type-editor#developing-a-timer-page-type"><ul><li>[页面Type的完整组成](/docs/extguide/extend-page-type-editor#complete-composition-of-a-page-type)</li><li>[第一步:规划目录结构](/docs/extguide/extend-page-type-editor#step-1-planning-the-directory-structure)</li><li>[第二步:设计Type的能力](/docs/extguide/extend-page-type-editor#step-2-designing-type-capabilities)</li><li>[第三步:创建Type元素](/docs/extguide/extend-page-type-editor#step-3-creating-the-type-element)</li><li>[第四步:创建渲染组件](/docs/extguide/extend-page-type-editor#step-4-creating-the-render-component)</li><li>[第五步:理解动态继承机制](/docs/extguide/extend-page-type-editor#step-5-understanding-dynamic-inheritance)</li><li>[第六步:创建一个考试计时器实例](/docs/extguide/extend-page-type-editor#step-6-creating-an-exam-timer-instance)</li></ul></Card><Card title="让Type在IDE中可配置" href="/docs/extguide/extend-page-type-editor#making-type-configurable-in-ide"><ul><li>[DefineEditor - 让创建变得简单](/docs/extguide/extend-page-type-editor#defineeditor-simplifying-creation)</li><li>[API - 生成正确的代码](/docs/extguide/extend-page-type-editor#api-generating-correct-code)</li><li>[Editor - 让修改更方便](/docs/extguide/extend-page-type-editor#editor-making-modifications-easier)</li></ul></Card><Card title="更多应用场景" href="/docs/extguide/extend-page-type-editor#more-application-scenarios"><ul><li>[特殊需求类型](/docs/extguide/extend-page-type-editor#special-requirement-types)</li></ul></Card></CardGroup> |
| 连接专有数据库或数据源 | [扩展自己的数据库Type元素](/docs/extguide/extend-database-type-elements) |
| 处理自定义数据格式或业务对象 | [扩展自己的数据模型Type元素](/docs/extguide/extend-data-model-type-elements) |
| 集成专业AI模型或自定义LLM工作流 | [扩展自己的AI Agent Type元素](/docs/extguide/extend-ai-agent-type-elements) |
| 为你的业务创建领域特定的AI助理 | [扩展自己的AI助理Type元素](/docs/extguide/extend-ai-assistant-type-elements) |
| 添加对区域支付网关或自定义计费的支持 | [扩展自己的支付Type元素](/docs/extguide/extend-payment-type-elements) |

## 扩展类型 {#extension-types}

### 新增扩展 {#new-extensions}
创造全新的Type元素及其可视化编辑器，适用于官方框架完全没有的功能。

### 继承扩展 {#inheritance-extensions}
基于现有Type元素进行扩展和修改，必须保持API兼容性（里氏替换原则）。

**实现方式：**
- **完全重写**：重新实现所有逻辑，但保持对外接口一致
- **增量修改**：在原有逻辑基础上进行局部调整，保持接口一致

## 社区支持 {#community-support}
- 扩展开发过程中遇到问题，可通过[社区论坛](https://forum.jit.pro/)获得帮助
- 优秀的扩展实现，欢迎分享到社区供其他开发者学习
- 具有通用价值的扩展，有机会被集成到官方框架中
