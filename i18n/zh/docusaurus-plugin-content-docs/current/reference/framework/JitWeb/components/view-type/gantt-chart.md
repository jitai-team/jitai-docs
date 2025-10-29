---
slug: gantt-chart
description: "甘特图 API 参考文档。完整的规格说明、方法和示例。"
---
# 甘特图
甘特图是项目进度和时间管理可视化组件，基于VTable甘特图库实现任务时间线的直观展示。它负责任务进度跟踪、时间依赖关系显示和进度调整交互，支持拖拽修改、多时间维度切换和实时数据更新等功能，适用于项目管理、生产计划和资源调度等业务场景。

甘特图元素分层结构为Meta（components.Meta） → Type（components.GanttChart） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建甘特图实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.GanttChartType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
components/
└── ProjectGantt/
    ├── e.json
    └── config.ts
```

```json title="components/ProjectGantt/e.json"
{
  "type": "components.GanttChart",
  "title": "项目甘特图",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.TaskModel"
      }
    ],
    "titleField": "taskName",
    "defaultViewType": "week", 
    "startTime": "startDate",
    "endTime": "endDate",
    "listShowFields": ["taskName", "assignee", "status"],
    "floatLayerFields": ["taskName", "progress", "assignee"],
    "dateDragable": true,
    "autoLoad": true,
    "toolbarBtns": [],
    "operateBtns": []
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| titleField | string | 任务标题字段名 | - | 是 |
| defaultViewType | string | 默认时间视图，可选值：day/week/month/quarter/year | week | 否 |
| startTime | string | 开始时间字段名 | - | 是 |
| endTime | string | 结束时间字段名 | - | 是 |
| levelRelateField | string | 层级关系字段名 | - | 否 |
| orderRelateField | string | 先后依赖关系字段名 | - | 否 |
| progressField | string | 进度字段名 | - | 否 |
| listShowFields | string[] | 左侧列表显示字段 | [] | 否 |
| floatLayerFields | string[] | 悬浮层显示字段 | [] | 否 |
| dateDragable | boolean | 是否可拖拽调整日期 | false | 否 |
| progressDragable | boolean | 是否可拖拽调整进度 | false | 否 |
| orderDragable | boolean | 是否可拖拽调整顺序 | false | 否 |
| autoLoad | boolean | 组件挂载时自动加载数据 | false | 否 |
| toolbarBtns | ButtonProps[] | 工具栏按钮配置 | [] | 否 |
| operateBtns | ButtonProps[] | 操作列按钮配置 | [] | 否 |
| fieldConfig | object | 字段配置映射 | - | 否 |
| addScheduleAble | boolean | 是否允许添加排期 | false | 否 |

## 变量
### displayRowList
只读的多行数据变量，存储当前甘特图显示的所有任务数据。

**类型**: `RowList`

### activeRow
只读的单行数据变量，存储当前操作的任务数据，在点击行或拖拽后更新。

**类型**: `RowData`

## 方法 
### call
刷新甘特图数据，根据筛选条件重新加载并显示数据。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| qFilter | QFilter/string | 数据筛选条件 | - | 否 |

#### 返回值
`Promise<void>`

#### 使用示例
```tsx title="调用刷新方法"
// 获取甘特图组件实例
const ganttChart = app.getElement('components.ProjectGantt');

// 无条件刷新
await ganttChart.call();

// 按条件刷新
await ganttChart.call("Q(status='进行中')");

// 使用QFilter对象
const filter = app.getElement('components.TaskFilter').qFilter;
await ganttChart.call(filter);
```

### loadDataAndExpand
加载指定数据到甘特图并展开显示，不受原有筛选条件限制。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| rowDataList | RowList/Array | 要加载的数据列表 | - | 是 |

#### 返回值
`Promise<void>`

#### 使用示例
```tsx title="加载指定数据"
// 加载特定任务数据
const taskData = [
  {
    id: 1,
    taskName: "需求分析",
    startDate: "2024-01-01",
    endDate: "2024-01-10",
    progress: 100
  },
  {
    id: 2, 
    taskName: "系统设计",
    startDate: "2024-01-08",
    endDate: "2024-01-20",
    progress: 80
  }
];

await ganttChart.loadDataAndExpand(taskData);
```

### updateConfig
更新组件配置，配置变更后自动刷新显示。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| compConfig | GanttComponentConfig | 新的组件配置 | - | 是 |

#### 返回值
`Promise<void>`

### checkConfig
检查当前配置是否有效，验证必填字段是否完整。

#### 返回值
`boolean` - 配置有效返回true，否则返回false

### destroy
销毁组件实例，清理资源和事件监听。

#### 返回值
`void`

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | object | 配置更新内容 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 返回值
`void`

### publishEvent
发布组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | object | 额外参数 | - | 否 |

#### 返回值
`Promise<void>`

### subscribeEvent
订阅组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | function | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
`string` - 订阅ID

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 订阅ID | - | 是 |

#### 返回值
`boolean`

### runCode
执行代码字符串，在页面上下文中运行。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
`any` - 代码执行结果

### getPermConfig
获取当前组件的权限配置信息。

#### 返回值
`object` - 权限配置对象

## 属性
### name
组件名称标识。

**类型**: `string`

### title
组件显示标题。

**类型**: `string`

### config
组件配置对象。

**类型**: `object`

### compType
组件类型枚举。

**类型**: `COMPONENT_TYPE`

### showTitle
是否显示组件标题。

**类型**: `boolean`

### type
组件类型字符串。

**类型**: `string`

### app
应用实例引用。

**类型**: `App`

### page
页面实例引用。

**类型**: `BasePage`

### store
甘特图数据管理存储。

**类型**: `GanttStore`

### ModelClass
关联的数据模型类。

**类型**: `class`

### fullName
组件的完整名称标识。

**类型**: `string`

### dataTypeList
组件的数据类型列表，包含所有变量定义。

**类型**: `Array`

## 事件
### afterClickRow
点击甘特图行后触发，包括点击左侧列表和右侧任务条。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowData | 点击的行数据，通过activeRow变量传递 | - | 是 |

#### 使用示例
```tsx title="监听行点击事件"
// 在页面代码中监听事件
ganttChart.subscribeEvent('afterClickRow', (data) => {
  console.log('点击的任务:', ganttChart.activeRow.value);
  
  // 可以执行其他操作，如打开详情弹窗
  const taskDetail = app.getElement('components.TaskDetailModal');
  taskDetail.call(ganttChart.activeRow.value);
});
```

### afterDragDate
拖拽调整任务日期后触发，任务数据会自动保存到数据库。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowData | 拖拽修改后的行数据，通过activeRow变量传递 | - | 是 |

#### 使用示例
```tsx title="监听拖拽事件"
// 监听任务时间调整
ganttChart.subscribeEvent('afterDragDate', (data) => {
  const updatedTask = ganttChart.activeRow.value;
  console.log('任务时间已更新:', {
    taskName: updatedTask.taskName,
    newStartTime: updatedTask.startDate,
    newEndTime: updatedTask.endDate
  });
  
  // 发送通知或同步到其他组件
  app.publishEvent('taskTimeUpdated', updatedTask);
 });
```

### 动态按钮事件
配置的工具栏按钮和操作按钮会自动生成对应的点击事件，事件名称格式为 `click` + 按钮ID的驼峰命名。

#### 使用示例
```tsx title="监听按钮点击事件"
// 工具栏按钮配置
{
  "toolbarBtns": [
    {
      "id": "export",
      "name": "导出"
    },
    {
      "id": "addTask",
      "name": "新增任务"
    }
  ]
}

// 监听对应的按钮事件
ganttChart.subscribeEvent('clickExport', (data) => {
  console.log('导出按钮被点击', ganttChart.activeRow.value);
  // 执行导出逻辑
});

ganttChart.subscribeEvent('clickAddTask', (data) => {
  console.log('新增任务按钮被点击');
  // 打开新增任务弹窗
});
```

## 高级特性
### 工具栏和操作按钮配置
甘特图支持自定义工具栏按钮和操作列按钮，可以扩展特定的业务功能。

```json title="按钮配置示例"
{
  "toolbarBtns": [
    {
      "id": "export",
      "name": "导出",
      "type": "primary",
      "beIncludeMore": false
    },
    {
      "id": "addTask", 
      "name": "新增任务",
      "type": "default"
    }
  ],
  "operateBtns": [
    {
      "id": "edit",
      "name": "编辑", 
      "filterList": ["status!=已完成"]
    },
    {
      "id": "delete",
      "name": "删除",
      "type": "danger"
    }
  ]
}
```

### 层级任务和依赖关系
通过配置`levelRelateField`和`orderRelateField`实现任务的层级结构和依赖关系显示。

```json title="层级依赖配置"
{
  "levelRelateField": "parentTaskId",
  "orderRelateField": "dependsOnTaskId",
  "listShowFields": ["taskName", "assignee", "status", "progress"]
}
```

### 时间视图切换
支持日、周、月、季、年五种时间维度，可通过配置或用户操作动态切换。

```tsx title="动态切换视图"
// 切换到月视图
await ganttChart.updateConfig({
  ...ganttChart.config,
  defaultViewType: 'month'
});
```

### 进度显示和拖拽
配置进度字段可在甘特图中显示任务完成百分比，支持拖拽调整进度。

```json title="进度配置"
{
  "progressField": "completionRate",
  "progressDragable": true,
  "floatLayerFields": ["taskName", "completionRate", "assignee", "status"]
}
``` 