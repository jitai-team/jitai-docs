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

## 必须先了解JAAP

开发者对JitAi开发框架进行扩展的认知前提是深入理解JAAP（JitAi Ai Application Protocol）中的规范，尤其是Meta、Type、Instance元素的概念和三者之间的关系。如果要对官方框架进行覆盖重写，则还需要理解继承重写的原理。

[点击此处学习JAAP](/docs/reference/runtime-platform/JAAP)

## 问题导向指引

| 你想要实现什么 | 相关文档 |
|-------------|----------|
| 添加JitAi中没有的自定义图表组件 | [扩展自己的UI组件Type元素](extguide/add-frontend-components) |
| 让我的自定义组件可以通过拖拽界面进行配置 | [为UI组件Type元素开发可视化编辑器](extguide/develop-frontend-component-visual-editor) |
| 集成第三方服务，如Slack机器人或IoT设备 | [扩展自己的元素族类](extguide/extend-element-family-classes) |
| 为我的后端集成创建用户友好的配置面板 | [为后端Type元素开发可视化编辑器](extguide/develop-backend-element-visual-editor) |
| 构建具有特定布局和行为的自定义页面模板 | [扩展自己的页面Type及其编辑器](extguide/extend-page-type-editor) |
| 连接专有数据库或数据源 | [扩展自己的数据库Type元素](extguide/extend-database-type-elements) |
| 处理自定义数据格式或业务对象 | [扩展自己的数据模型Type元素](extguide/extend-data-model-type-elements) |
| 集成专业AI模型或自定义LLM工作流 | [扩展自己的AI Agent Type元素](extguide/extend-ai-agent-type-elements) |
| 为你的业务创建领域特定的AI助理 | [扩展自己的AI助理Type元素](extguide/extend-ai-assistant-type-elements) |
| 添加对区域支付网关或自定义计费的支持 | [扩展自己的支付Type元素](extguide/extend-payment-type-elements) |

## 扩展类型

### 新增扩展
创造全新的Type元素及其可视化编辑器，适用于官方框架完全没有的功能。

### 继承扩展
基于现有Type元素进行扩展和修改，必须保持API兼容性（里氏替换原则）。

**实现方式：**
- **完全重写**：重新实现所有逻辑，但保持对外接口一致
- **增量修改**：在原有逻辑基础上进行局部调整，保持接口一致

## 社区支持
- 扩展开发过程中遇到问题，可通过[社区论坛](https://forum.jit.pro/)获得帮助
- 优秀的扩展实现，欢迎分享到社区供其他开发者学习
- 具有通用价值的扩展，有机会被集成到官方框架中
