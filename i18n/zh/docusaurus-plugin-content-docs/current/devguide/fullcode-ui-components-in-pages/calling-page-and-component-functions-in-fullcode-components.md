---
sidebar_position: 2
slug: calling-page-and-component-functions-in-fullcode-components
---

# 在全代码组件中调用页面和组件函数

在全代码组件中，你可以很方便地调用同一页面中其他组件的方法。**核心思路是：页面类作为"中央调度器"，管理着所有组件实例**。

## 调用原理 {#calling-principle}

想象页面就像一个"指挥中心"，所有组件都在这个中心注册了自己：

```typescript title="page.ts 中的组件注册"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;          // 表格组件实例
    BlankComponent2!: BaseComponent; // 自定义组件实例
    // ... 其他组件实例
}
```

每个自定义组件都能通过 `compIns.page` 访问到这个"指挥中心"，进而调用其他组件：

```typescript
// 在自定义组件的 Render 中
const compIns = props.compIns; // 当前组件实例
const page = compIns.page;     // 访问页面"指挥中心"

// 调用其他组件的方法
page.Table3.call();            // 刷新表格数据
```

## 实际应用示例 {#practical-examples}

### 基本组件调用 {#basic-component-calling}

以下示例展示了如何在全代码组件中调用页面上其他组件的方法：

```typescript title="在全代码组件中调用其他组件"
import { Jit } from 'jit';
import { Button, Space } from 'antd';

const Render = (props) => {
  const compIns = props.compIns;
  const page = compIns.page; // 获取页面实例

  // 调用表格组件的方法
  const handleRefreshTable = () => {
    if (page.Table1) {
      page.Table1.call(); // 刷新表格数据
    }
  };

  // 调用表单组件的方法
  const handleResetForm = () => {
    if (page.Form1) {
      page.Form1.reset(); // 重置表单
    }
  };

  // 调用其他自定义组件的方法
  const handleCallCustomComponent = () => {
    if (page.CustomComponent1) {
      page.CustomComponent1.customMethod(); // 调用自定义方法
    }
  };

  return (
    <Space>
      <Button type="primary" onClick={handleRefreshTable}>
        刷新表格
      </Button>
      <Button onClick={handleResetForm}>
        重置表单
      </Button>
      <Button onClick={handleCallCustomComponent}>
        调用自定义组件
      </Button>
    </Space>
  );
};

export default class InteractiveComponent extends Jit.BaseComponent {
  Render = Render;
}
```

### 获取其他组件的数据 {#getting-data-from-other-components}

除了调用方法，还可以获取其他组件的数据：

```typescript title="获取其他组件的数据"
const Render = (props) => {
  const compIns = props.compIns;
  const page = compIns.page;

  const handleGetTableData = () => {
    if (page.Table1) {
      // 获取表格当前显示的数据
      const displayData = page.Table1.displayRowList?.value || [];
      console.log('表格数据:', displayData);

      // 获取选中的行数据
      const selectedRows = page.Table1.selectedRowList?.value || [];
      console.log('选中行:', selectedRows);

      // 获取当前操作的行数据
      const activeRow = page.Table1.activeRow?.value;
      console.log('当前行:', activeRow);
    }
  };

  const handleGetFormData = () => {
    if (page.Form1) {
      // 获取表单数据
      const formData = page.Form1.getFormData();
      console.log('表单数据:', formData);
    }
  };

  return (
    <Space>
      <Button onClick={handleGetTableData}>
        获取表格数据
      </Button>
      <Button onClick={handleGetFormData}>
        获取表单数据
      </Button>
    </Space>
  );
};
```

## 常用组件调用方法 {#common-component-methods}

不同组件类型提供了丰富的调用方法和数据获取接口。详细的组件方法和接口说明，请参考：

- [JitWeb 组件参考文档](../../reference/framework/JitWeb/components/) - 查看所有组件的详细方法和属性

### 基本调用模式 {#basic-calling-pattern}

```typescript
// 通用调用模式
const page = compIns.page;

// 调用组件方法
page.ComponentName.methodName(parameters);

// 获取组件数据
const data = page.ComponentName.propertyName?.value;
```

## 相关文档 {#related-documentation}

- [全代码组件接口规范](./ui-component-interface-specifications) - 了解全代码组件的基本结构和接口
- [发布和订阅事件](./emitting-events) - 了解组件间的事件通信机制
- [在页面代码中调用全代码组件函数](./calling-fullcode-component-functions-in-page-code) - 了解反向调用的方式
