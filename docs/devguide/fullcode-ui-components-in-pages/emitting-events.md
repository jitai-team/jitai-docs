---
sidebar_position: 3
slug: emitting-events
---

# 发布和订阅事件

当页面上的其他组件发生事件时（比如表格行被点击、按钮被按下），你的自定义组件可以"监听"并响应这些事件。同时，全代码组件也可以发布自己的事件供其他组件或页面订阅。**核心思路是：在页面类的 `bindEvent()` 方法中统一订阅事件**。

## 事件订阅原理 {#event-subscription-principles}

页面类不仅管理组件实例，还负责协调组件间的事件通信，就像一个"消息中转站"：

```typescript title="page.ts 中的事件订阅"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;
    BlankComponent2!: BaseComponent = new BlankComponent2();

    bindEvent() {
        // 订阅表格的行点击事件
        this.Table3.subscribeEvent('clickRow', (data) => {
            // 当表格行被点击时，通知自定义组件
            this.BlankComponent2.handleTableRowClick(data);
        });

        // 订阅自定义组件的事件
        this.BlankComponent2.subscribeEvent('handleClickMe', () => {
            // 可以在这里执行页面级逻辑
            console.log('收到自定义组件的点击事件');
        });
    }
}
```

## 在全代码组件中响应事件 {#respond-in-custom-components}

要让自定义组件能响应其他组件的事件，需要在组件类中添加对应的方法：

```typescript title="BlankComponent2.tsx"
export default class BlankComponent2 extends Jit.BaseComponent {
    Render = Render;

    // 响应表格行点击事件的方法
    handleTableRowClick(rowData) {
        // 获取点击行的数据
        const rowId = rowData?.id?.value;
        message.info(`表格行被点击，ID：${rowId}`);

        // 可以触发组件重新渲染或执行其他逻辑
        this.setState({ selectedRowId: rowId });
    }

    getData() {
        return 'so cool !!!';
    }
}
```

## 发布自定义事件 {#publishing-custom-events}

全代码组件可以通过 `publishEvent()` 方法发布自己的事件：

```typescript title="在全代码组件中发布事件"
import { Jit } from 'jit';
import { Button, Space, message } from 'antd';

const Render = (props) => {
  const compIns = props.compIns;

  const handleSimpleEvent = () => {
    // 发布简单事件
    compIns.publishEvent('buttonClicked');
    message.info('事件已发布');
  };

  const handleEventWithData = () => {
    // 发布带数据的事件
    const eventData = {
      message: 'Hello from component',
      timestamp: new Date().toISOString(),
      userId: 123
    };
    compIns.publishEvent('dataUpdated', eventData);
    message.info('带数据的事件已发布');
  };

  const handleComplexEvent = () => {
    // 发布复杂事件
    const complexData = {
      action: 'userAction',
      details: {
        type: 'click',
        position: { x: 100, y: 200 },
        metadata: {
          componentId: 'BlankComponent2',
          version: '1.0.0'
        }
      }
    };
    compIns.publishEvent('complexAction', complexData);
    message.info('复杂事件已发布');
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={handleSimpleEvent}>
        发布简单事件
      </Button>
      <Button onClick={handleEventWithData}>
        发布带数据事件
      </Button>
      <Button onClick={handleComplexEvent}>
        发布复杂事件
      </Button>
    </Space>
  );
};

export default class EventPublisher extends Jit.BaseComponent {
  Render = Render;
}
```

## 可订阅的事件类型 {#subscribable-events}

每个组件可订阅的事件来自 `scheme.json` 中该组件的 `eventList` 配置。

### 标准组件事件 {#standard-component-events}

不同类型的标准组件提供了各自的事件类型。详细的组件事件列表，请参考：

- [JitWeb 组件参考文档](../../reference/framework/JitWeb/components/) - 查看每个组件的具体事件列表和参数说明

### 全代码组件的自定义事件 {#custom-component-events}

全代码组件可以通过 `publishEvent()` 发布自己定义的任何事件：

```typescript
// 在全代码组件中
compIns.publishEvent('customEvent', eventData);
compIns.publishEvent('dataChanged', newData);
compIns.publishEvent('userInteraction', interactionDetails);
```

## 双向通信示例 {#bidirectional-communication-example}

以下是一个完整的双向通信示例，展示了全代码组件如何与其他组件进行事件通信：

```typescript title="完整的双向通信示例"
// 全代码组件的渲染器
const Render = (props) => {
    const compIns = props.compIns;
    const [tableData, setTableData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleRefreshAndNotify = () => {
        // 1) 调用其他组件方法
        compIns.page.Table3.refresh();

        // 2) 发布事件给页面
        compIns.publishEvent('refreshTriggered', {
            timestamp: Date.now(),
            triggeredBy: 'RefreshButton'
        });
    };

    const handleDataProcess = () => {
        // 模拟数据处理
        const processedData = tableData.map(item => ({
            ...item,
            processed: true,
            processedAt: new Date().toISOString()
        }));

        // 发布数据处理完成事件
        compIns.publishEvent('dataProcessed', {
            originalCount: tableData.length,
            processedCount: processedData.length,
            data: processedData
        });
    };

    return (
        <div>
            <Space>
                <Button type="primary" onClick={handleRefreshAndNotify}>
                    刷新表格并通知
                </Button>
                <Button onClick={handleDataProcess}>
                    处理数据
                </Button>
            </Space>

            {selectedRowId && (
                <div style={{ marginTop: 16 }}>
                    当前选中行ID: {selectedRowId}
                </div>
            )}
        </div>
    );
};

// 全代码组件类
export default class InteractiveComponent extends Jit.BaseComponent {
    Render = Render;

    // 响应表格行点击事件
    handleTableRowClick(rowData) {
        const rowId = rowData?.id?.value;
        // 更新组件状态（如果使用了状态管理）
        // 这里可以通过重新渲染或其他方式更新UI
        message.info(`收到表格点击，行ID: ${rowId}`);

        // 可以发布二次事件
        this.publishEvent('rowSelected', { selectedId: rowId });
    }

    // 响应其他组件的数据变化
    handleDataUpdate(newData) {
        console.log('收到数据更新:', newData);

        // 处理数据并可能发布新事件
        this.publishEvent('componentDataUpdated', {
            componentName: 'InteractiveComponent',
            updatedData: newData,
            updateTime: new Date()
        });
    }
}
```

```typescript title="页面类中的事件订阅配置"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;
    InteractiveComponent!: BaseComponent = new InteractiveComponent();

    bindEvent() {
        // 订阅表格事件，转发给自定义组件
        this.Table3.subscribeEvent('clickRow', (data) => {
            this.InteractiveComponent.handleTableRowClick(data);
        });

        // 订阅自定义组件的事件
        this.InteractiveComponent.subscribeEvent('refreshTriggered', (data) => {
            console.log('收到刷新触发事件:', data);
            // 可以执行页面级逻辑，比如更新页面标题、记录日志等
        });

        this.InteractiveComponent.subscribeEvent('dataProcessed', (data) => {
            console.log('数据处理完成:', data);
            // 可以更新其他组件或执行后续操作
            message.success(`已处理 ${data.processedCount} 条数据`);
        });

        this.InteractiveComponent.subscribeEvent('rowSelected', (data) => {
            console.log('行被选中:', data.selectedId);
            // 可以同步更新其他组件的状态
        });
    }
}
```

## 相关文档

- [全代码组件接口规范](./ui-component-interface-specifications) - 了解全代码组件的基本结构
- [在全代码组件中调用页面和组件函数](./calling-page-and-component-functions-in-fullcode-components) - 了解直接调用其他组件方法的方式
- [在页面代码中调用全代码组件函数](./calling-fullcode-component-functions-in-page-code) - 了解从页面代码调用组件函数的方式
