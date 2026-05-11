---
sidebar_position: 2
slug: calling-data-model-functions-in-pages
description: "在页面中调用数据模型函数的详细指南和说明。"
---

# 在页面中调用数据模型函数

页面可以直接调用数据模型函数，实现对后端数据的增删改查操作。通过简洁的语法，无需复杂的API接口调用，即可完成数据的读取、创建、更新和删除等操作，极大简化了数据操作流程。

:::info 图文教程参考
本文档主要介绍数据模型函数调用的基本语法和概念。如需查看详细的图文教程、完整示例和可视化操作步骤，请参考：

**[页面定制 - 调用数据模型函数](../frontend-ui-customization/page-customization#call-data-model-function)**
:::

## 调用语法 {#calling-syntax}

数据模型函数的调用方式与[服务函数调用](./calling-service-functions-in-pages)完全相同，都通过 `app` 对象进行调用，语法简洁统一。

### 全代码页面中的基本语法 {#basic-syntax-in-full-code-pages}

```typescript
// 在页面类的成员函数中
this.app.models.[模型ID].[方法名称]([参数1], [参数2], ...)

// 在其他地方调用
import { getRuntimeApp } from 'jit';
const app = getRuntimeApp();
app.models.[模型ID].[方法名称]([参数1], [参数2], ...)
```

### 数据操作能力 {#data-operation-capabilities}
数据模型函数为页面提供了强大的数据操作能力，通过简单统一的语法即可完成复杂的数据处理任务。如需了解如何创建和配置数据模型，请参考：[数据表模型](../data-modeling/data-table-model.md)

## 相关文档 {#related-documentation}

- [服务函数调用](./calling-service-functions-in-pages) - 了解服务函数的调用方式，语法与数据模型函数完全一致
