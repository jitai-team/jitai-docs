---
sidebar_position: 1.5
description: "组件化页面的详细指南和说明。"
---
# 组件化页面

页面是用户与应用系统交互的主要场所，为用户提供数据展示以及交互操作界面。开发者在[创建门户](/docs/devguide/shell-and-page/portal-navigation-design)时规划每个门户中的导航菜单，每个菜单项对应一个页面的PC端和移动端。如果开发者选择在创建门户菜单的同时创建页面，系统会自动生成一个页面，开发者可以在元素目录树中找到该页面并进行编辑。

JitAi提供了[常规页面](/docs/devguide/shell-and-page/generic-page)、[AI数据管理页面](/docs/devguide/shell-and-page/ai-data-management-page)、[AI数据分析页面](/docs/devguide/shell-and-page/ai-data-analysis-page)、[数据录入页面](/docs/devguide/shell-and-page/data-entry-page)共4种常用的页面类型，它们都是由JitAi开发框架中的前端组件构成的页面，即`组件化页面`。此外，JitAi 还提供了[React全代码页面](/docs/devguide/shell-and-page/full-code-page-development#creating-react-full-code-pages)和[Vue全代码页面](/docs/devguide/shell-and-page/full-code-page-development#creating-vue-full-code-pages)，方便开发者进行高度自定义的页面开发，在全代码页面中同样可以使用JitAi的前端组件。JitAi还支持[Markdown页面](/docs/devguide/shell-and-page/markdown-page)，便于开发者进行Markdown文档的展示。其中，AI数据管理页面、AI数据分析页面、数据录入页面都是以常规页面为基础进行封装的。

在组件化页面中，页面函数逻辑、页面事件函数逻辑、页面组件的事件函数逻辑都可以调用其他业务元素，包括但不限于[服务](/docs/devguide/business-logic-development/creating-service-elements)、[数据模型](/docs/devguide/data-modeling)、[AI 大模型](/docs/devguide/ai-llm/create-ai-llm)、[AI Agent](/docs/devguide/ai-agent/create-ai-agent)、[AI 助理](/docs/devguide/ai-assistant/create-ai-assistant)等。关于调用业务元素的详细内容，请参考[在函数逻辑中调用前后端工具和服务](/docs/devguide/calling-business-elements-in-pages)。
