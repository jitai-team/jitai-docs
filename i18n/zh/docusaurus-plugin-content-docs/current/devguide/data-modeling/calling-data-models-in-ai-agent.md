---
sidebar_position: 11
slug: calling-data-models-in-ai-agent
---

# 在AI Agent中调用数据模型

数据模型不仅可以在页面和函数中调用，还可以作为AI Agent的工具使用。通过将数据模型函数添加为Agent工具，AI可以智能地执行数据的创建、读取、更新、删除等操作，实现更加自动化和智能化的数据处理。

## 数据模型作为Agent工具 {#data-models-as-agent-tools}

基于JitAi解释性系统架构构建的应用具有自描述特性，应用中的元素能够被大语言模型准确理解。数据模型及其函数正是这样的自描述元素，可以直接作为Agent的可用工具。

当数据模型函数被添加为Agent工具后，AI可以：

- 根据用户的自然语言指令智能调用相应的数据操作
- 自动执行复杂的数据查询和处理逻辑
- 实现跨多个数据模型的关联操作
- 基于业务规则进行数据验证和处理

关于如何将数据模型函数添加为Agent工具的详细操作步骤，请参考 [Agent调用模型函数](../ai-agent/agent-tools#calling-model-functions)。
