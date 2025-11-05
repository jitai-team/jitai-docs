---
sidebar_position: 4
slug: calling-fullcode-component-functions-in-page-code
description: "在页面代码中调用全代码组件函数的详细指南和说明。"
---

# 在页面代码中调用全代码组件函数

页面类作为所有组件的"中央调度器"，不仅可以订阅全代码组件的事件，还可以直接调用全代码组件的方法。这为页面级的逻辑处理提供了强大的控制能力。

## 调用原理 {#invocation-mechanism}

在页面类中，每个全代码组件都被实例化为页面类的属性。这意味着页面类可以直接访问全代码组件的所有公开方法：

```typescript title="page.ts 中的组件实例"
import type { ComponentPageScheme } from "jit";
import { Jit } from "jit";
import schemeJson from "./scheme.json";
import CustomComponent1 from "./CustomComponent1";
import CustomComponent2 from "./CustomComponent2";

type BaseComponent = InstanceType<typeof Jit.BaseComponent>;

class PageCls extends Jit.GridPage {
    // 全代码组件实例
    CustomComponent1!: BaseComponent = new CustomComponent1();
    CustomComponent2!: BaseComponent = new CustomComponent2();

    // 标准组件实例
    Table1!: BaseComponent;
    Form1!: BaseComponent;

    scheme: ComponentPageScheme = schemeJson;

    // 在页面方法中调用全代码组件
    handlePageLevelAction() {
        // 直接调用全代码组件的方法
        const data1 = this.CustomComponent1.getData();
        const result = this.CustomComponent2.processData(data1);

        console.log('页面级处理结果:', result);
    }
}
```

## 调用时机和生命周期 {#invocation-timing-and-lifecycle}

了解何时调用全代码组件的方法非常重要：

```typescript title="生命周期中的调用时机"
class PageCls extends Jit.GridPage {
    CustomComponent!: BaseComponent = new CustomComponent();

    // 页面构造时（组件未完全初始化）
    constructor() {
        super();
        // 不建议：组件可能未完全初始化
        // this.CustomComponent.initialize();
    }

    // 页面绑定事件时（组件已初始化）
    bindEvent() {
        // 推荐：此时组件已完全初始化
        this.CustomComponent.setupEventHandlers();

        // 订阅其他组件事件
        this.Table1.subscribeEvent('ready', () => {
            // 推荐：在其他组件就绪后调用
            this.CustomComponent.onTableReady();
        });
    }

    // 页面完全加载后
    onPageReady() {
        // 推荐：页面完全就绪后的初始化
        this.CustomComponent.onPageReady();
    }

    // 页面销毁前
    onPageDestroy() {
        // 推荐：清理资源
        this.CustomComponent.cleanup();
    }
}
```

## 相关文档 {#related-documentation}

- [全代码组件接口规范](./ui-component-interface-specifications) - 了解全代码组件的基本结构和公开方法
- [在全代码组件中调用页面和组件函数](./calling-page-and-component-functions-in-fullcode-components) - 了解反向调用的方式
- [发布和订阅事件](./emitting-events) - 了解基于事件的组件通信方式
