---
slug: approval-processing
---
# 审批处理
审批处理是工作流审批任务的核心操作组件，基于工作流引擎实现审批任务的处理、查看和状态管理。它负责加载指定工作流的待处理任务、展示审批历史记录和处理用户的审批操作，支持移动端和PC端的自适应渲染。

审批处理元素分层结构为Meta（components.Meta）→ Type（components.TaskHandle）→ 实例，开发者可通过JitAI的可视化开发工具快捷地创建审批处理实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.TaskHandleType元素，以实现自己的封装。

## 快速开始
### 基础配置示例
```json title="基础审批处理配置"
{
    "fullName": "components.TaskHandle",
    "type": "components.TaskHandle",
    "name": "TaskHandle1",
    "title": "审批处理",
    "config": {
        "requireElements": [
            {
                "name": "ApplyModel",
                "title": "申请数据模型",
                "type": "models.NormalType"
            }
        ],
        "workflowName": "LeaveApproval",
        "isShowHistory": true,
        "isShowAllHistory": false
    },
    "showTitle": true
}
```

### 配置属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| workflowName | String | 是 | "" | 关联的工作流名称，指定要处理的审批流程 |
| isShowHistory | Boolean | 否 | true | 是否显示审批历史记录面板 |
| isShowAllHistory | Boolean | 否 | true | 是否显示完整的历史记录，为false时仅显示关键节点 |
| requireElements | Array | 是 | [] | 关联的数据模型配置，用于获取审批相关的业务数据 |

## 变量
### instanceId
**类型**: `Numeric`  
**访问**: 只读  
**说明**: 当前审批流程实例的唯一标识，用于追踪和管理审批状态。

```typescript title="获取审批流程实例ID"
// 在页面代码中访问
const instanceId = this.TaskHandle1.instanceId.value;
console.log('当前审批实例ID:', instanceId);
```

### formData
**类型**: `RowData<T>`  
**访问**: 可读写  
**泛型**: 关联模型类型  
**说明**: 审批关联的表单数据模型，包含待审批的业务数据记录。当该变量值变化时，组件会自动重新加载对应的审批任务。

```typescript title="操作表单数据"
// 设置表单数据
this.TaskHandle1.formData.value = {
    id: 1,
    applyUserId: "user123",
    leaveType: "年假",
    startDate: "2024-01-15",
    endDate: "2024-01-17"
};

// 监听数据变化
this.TaskHandle1.formData.onValueChange(() => {
    console.log('表单数据已更新:', this.TaskHandle1.formData.value);
});
```

## 方法
### call
**说明**: 刷新组件数据，重新加载当前审批任务的最新状态和数据。

#### 返回值
**类型**: `Promise<void>`

#### 使用示例
```typescript title="刷新审批数据"
// 手动刷新审批组件
await this.TaskHandle1.call();

// 在按钮点击事件中刷新
async function onRefreshClick() {
    try {
        await this.TaskHandle1.call();
        console.log('审批数据刷新成功');
    } catch (error) {
        console.error('刷新失败:', error);
    }
}
```

### publishEvent
**说明**: 发布组件事件，用于触发自定义事件通知。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | String | 是 | - | 事件名称 |
| ex | Object | 否 | - | 附加的事件数据 |

#### 返回值
**类型**: `Promise<void>`

#### 使用示例
```typescript title="发布自定义事件"
// 发布自定义事件
await this.TaskHandle1.publishEvent('customEvent', {
    message: '自定义处理完成',
    timestamp: Date.now()
});
```

### subscribeEvent
**说明**: 订阅组件事件，监听指定事件的触发。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | String | 是 | - | 要订阅的事件名称 |
| evtCb | Function | 是 | - | 事件回调函数 |
| unSubscribeExist | Boolean | 否 | true | 是否取消已存在的订阅 |

#### 返回值
**类型**: `String` - 订阅ID，用于后续取消订阅

#### 使用示例
```typescript title="订阅组件事件"
// 订阅审批处理完成事件
const subscriptionId = this.TaskHandle1.subscribeEvent('afterExecute', (data) => {
    console.log('收到审批处理事件:', data);
});
```

### unSubscribeEvent
**说明**: 取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | String | 是 | - | 订阅ID |

#### 返回值
**类型**: `Boolean` - 取消订阅是否成功

#### 使用示例
```typescript title="取消事件订阅"
// 取消之前的订阅
this.TaskHandle1.unSubscribeEvent(subscriptionId);
```

### setConfig
**说明**: 动态设置组件配置。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| next | Object | 是 | - | 新的配置对象 |
| clean | Boolean | 否 | false | 是否完全替换配置（true）还是合并配置（false） |

#### 使用示例
```typescript title="动态更新配置"
// 合并更新配置
this.TaskHandle1.setConfig({
    workflowName: 'NewWorkflow',
    isShowHistory: false
});

// 完全替换配置
this.TaskHandle1.setConfig({
    requireElements: [/* 新配置 */],
    workflowName: 'CompleteNewWorkflow'
}, true);
```

### runCode
**说明**: 在页面上下文中执行JavaScript代码。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| code | String | 是 | - | 要执行的JavaScript代码字符串 |

#### 返回值
**类型**: `Any` - 代码执行结果

#### 使用示例
```typescript title="执行动态代码"
// 执行简单代码
const result = this.TaskHandle1.runCode('return this.somePageVariable + 1');

// 执行复杂逻辑
this.TaskHandle1.runCode(`
    if (this.currentUser.role === 'admin') {
        this.showAdminPanel();
    }
`);
```

### getPermConfig
**说明**: 获取组件的权限配置信息。

#### 返回值
**类型**: `Object | undefined` - 权限配置对象，如果没有权限限制则返回undefined

#### 使用示例
```typescript title="检查组件权限"
// 获取权限配置
const permConfig = this.TaskHandle1.getPermConfig();
if (permConfig) {
    console.log('组件权限配置:', permConfig);
    // 根据权限配置调整组件行为
} else {
    console.log('组件无权限限制');
}
```

## 属性
### taskRowData
**类型**: `ITaskDataProp`  
**访问**: 只读  
**说明**: 当前审批任务的完整数据对象，包含任务节点信息、业务数据和工作流状态。

```typescript title="访问任务数据"
const taskData = this.TaskHandle1.taskRowData;
console.log('任务节点ID:', taskData.nodeId);
console.log('工作流名称:', taskData.workflowName);
console.log('任务类型:', taskData.taskType);
console.log('业务数据:', taskData.rowData);
```

### taskId
**类型**: `String | Number`  
**访问**: 只读  
**说明**: 当前审批任务的唯一标识符。

### loading
**类型**: `Numeric`  
**访问**: 只读  
**说明**: 组件加载状态标识，值为1时表示正在加载数据，值为0时表示加载完成。

```typescript title="检查加载状态"
// 监听加载状态变化
this.TaskHandle1.loading.onValueChange(() => {
    if (this.TaskHandle1.loading.value === 1) {
        console.log('正在加载审批数据...');
    } else {
        console.log('审批数据加载完成');
    }
});
```

### compType
**类型**: `COMPONENT_TYPE`  
**访问**: 只读  
**说明**: 组件类型标识，标识当前组件的分类类型。

### type
**类型**: `String`  
**访问**: 只读  
**说明**: 组件的元素类型标识，值为"components.TaskHandle"。

### fullName
**类型**: `String`  
**访问**: 只读  
**说明**: 组件的完整元素标识名称。

### dataTypeList
**类型**: `Array`  
**访问**: 只读  
**说明**: 组件的变量类型定义列表，包含组件所有变量的配置信息。

### name
**类型**: `String`  
**访问**: 只读  
**说明**: 组件实例的唯一名称标识。

### title
**类型**: `String`  
**访问**: 只读  
**说明**: 组件的显示标题。

### config
**类型**: `ITaskHandleFormConfig`  
**访问**: 只读  
**说明**: 组件的配置对象，包含工作流名称和历史记录显示选项。

### showTitle
**类型**: `Boolean`  
**访问**: 只读  
**说明**: 是否显示组件标题。

### app
**类型**: `App`  
**访问**: 只读  
**说明**: 当前应用实例的引用。

### page
**类型**: `BasePage`  
**访问**: 只读  
**说明**: 当前页面实例的引用。

## 事件
### afterExecute
**触发时机**: 用户完成审批处理操作后  
**事件数据**: `formData` - 审批处理后的表单数据  
**说明**: 当用户点击同意、拒绝或其他审批操作按钮并完成处理后触发。

```typescript title="监听审批处理完成"
this.TaskHandle1.subscribeEvent('afterExecute', (data) => {
    console.log('审批处理完成:', data.formData);
    // 可以在此处执行后续操作，如页面跳转、数据更新等
});
```

### afterCall
**触发时机**: 调用call方法刷新数据完成后  
**事件数据**: `formData` - 刷新后的表单数据  
**说明**: 当调用组件的call方法完成数据刷新后触发。

```typescript title="监听数据刷新完成"
this.TaskHandle1.subscribeEvent('afterCall', (data) => {
    console.log('数据刷新完成:', data.formData);
    // 可以在此处更新相关UI或执行其他逻辑
});
```
