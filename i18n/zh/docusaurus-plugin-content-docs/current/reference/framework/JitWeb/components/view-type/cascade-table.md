---
slug: cascade-table
description: "级联表 API 参考文档。完整的规格说明、方法和示例。"
---
# 级联表
级联表是支持层级关系数据展示的表格组件，基于树形数据结构实现父子级联显示和联动操作。它负责层级数据的展示、展开折叠操作和级联数据联动，支持多级数据结构的可视化管理和复杂关联关系的数据操作。

级联表元素分层结构为Meta（components.Meta） → Type（components.CascadeTableNew） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建级联表实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的components.CascadeTableNewType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
pages/
└── MyPage/
    ├── e.json
    ├── scheme.json
    └── page.tsx
```

**scheme.json 配置示例**
```json title="基础级联表配置"
{
  "fullName": "components.CascadeTableNew",
  "type": "components.CascadeTableNew", 
  "name": "myCascadeTable",
  "title": "我的级联表",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.OrganizationModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "parentFieldName": "parentId",
    "childFieldName": "id",
    "fieldIdList": ["id", "name", "type", "level"],
    "autoLoad": true,
    "disableSelect": false,
    "fieldConfig": {
      "name": {
        "alias": "组织名称",
        "position": "left",
        "columnClick": true,
        "width": 200
      }
    }
  }
}
```

**组件调用示例**
```tsx title="获取和操作级联表"
const cascadeTable = app.getElement('myCascadeTable');

// 刷新数据
await cascadeTable.call();

// 加载指定数据并展开
await cascadeTable.loadDataAndExpand([
  { id: 1, name: '总部', parentId: null },
  { id: 2, name: '分公司', parentId: 1 }
], true);

// 获取选中数据
console.log(cascadeTable.selectedRowList.value);
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| parentFieldName | string | 父级字段名，用于建立父子关系 | - | 是 |
| childFieldName | string | 子级字段名，通常是主键字段 | - | 是 |
| fieldIdList | string[] | 显示的字段列表 | `[]` | 是 |
| autoLoad | boolean | 是否自动加载数据 | `true` | 否 |
| disableSelect | boolean | 是否禁用选择列 | `false` | 否 |
| toolbarLeft | CascadeTableNewButtonProps[] | 工具栏左侧按钮配置 | `[]` | 否 |
| toolbarRight | CascadeTableNewButtonProps[] | 工具栏右侧按钮配置 | `[]` | 否 |
| actionBtn | CascadeTableNewButtonProps[] | 操作列按钮配置 | `[]` | 否 |
| existChildFilter | string | 子级存在条件的筛选表达式 | `""` | 否 |
| fieldConfig | `Record<string, CascadeTableNewFieldConfig>` | 字段配置对象 | `{}` | 否 |

## 变量
### displayRowList
展示的多行数据变量，包含当前级联表中显示的所有数据行。

**类型**: `RowList<T>`（只读）

### selectedRowList
选中的多行数据变量，包含用户当前选中的数据行集合。

**类型**: `RowList<T>`（只读）

### activeRow
操作的单行数据变量，表示当前正在操作或点击的数据行。

**类型**: `RowData<T>`（只读）

### filter
筛选条件变量，用于控制级联表的数据过滤。

**类型**: `QFilter<T>`

## 方法 
### call
刷新级联表数据，可传入新的筛选条件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| qFilter | `QFilter` \| `string` \| `undefined` | 筛选条件，支持Q表达式 | - | 否 |

#### 返回值
`Promise<void>`

#### 使用示例
```tsx title="刷新级联表"
// 无条件刷新
await cascadeTable.call();

// 带筛选条件刷新
await cascadeTable.call("Q(status='active')");
```

### loadDataAndExpand
加载指定数据并展开显示，支持预设数据和展开状态。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| rowDataList | `Record<string, any>[]` \| `RowList` | 要加载的数据列表 | - | 是 |
| defaultExpandedAll | boolean | 是否默认展开所有节点 | `true` | 否 |

#### 返回值
`Promise<void>`

#### 使用示例
```tsx title="加载数据并展开"
// 加载部门数据并全部展开
await cascadeTable.loadDataAndExpand([
  { id: 1, name: '总部', parentId: null },
  { id: 2, name: '技术部', parentId: 1 },
  { id: 3, name: '前端组', parentId: 2 }
], true);

// 加载数据但不自动展开
await cascadeTable.loadDataAndExpand(departmentData, false);
```

### subscribeEvent
订阅组件事件，设置事件监听器。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| eventName | string | 事件名称 | - | 是 |
| callback | Function | 回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消订阅已存在的同名事件 | `true` | 否 |

#### 返回值
`string` - 事件处理器ID

#### 使用示例
```tsx title="订阅事件"
const handlerId = cascadeTable.subscribeEvent('selectedChange', (data) => {
  console.log('选中变化:', data);
});
```

### publishEvent
发布组件事件，触发已订阅的事件监听器。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| eventName | string | 事件名称 | - | 是 |
| data | any | 事件数据 | - | 否 |

#### 返回值
`Promise<void>`

#### 使用示例
```tsx title="发布事件"
await cascadeTable.publishEvent('selectedChange', {
  selectedRowList: cascadeTable.selectedRowList
});
```

### unSubscribeEvent
取消订阅指定的事件监听器。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| handlerId | string | 事件处理器ID | - | 是 |

#### 返回值
`void`

#### 使用示例
```tsx title="取消订阅事件"
const handlerId = cascadeTable.subscribeEvent('selectedChange', callback);
// 取消订阅
cascadeTable.unSubscribeEvent(handlerId);
```

### setConfig
设置组件配置，支持部分更新或完全替换配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | `Partial<CascadeTableNewComponentConfig>` | 新的配置对象 | - | 是 |
| clean | boolean | 是否完全替换配置 | `false` | 否 |

#### 返回值
`void`

#### 使用示例
```tsx title="设置组件配置"
// 部分更新配置
cascadeTable.setConfig({
  autoLoad: false,
  disableSelect: true
});

// 完全替换配置
cascadeTable.setConfig(newConfig, true);
```

### runCode
执行代码字符串，在页面上下文中运行。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
`any` - 代码执行结果

#### 使用示例
```tsx title="执行代码"
const result = cascadeTable.runCode(`
  return this.getElement('otherComponent').selectedRowList.value;
`);
```

### getPermConfig
获取当前组件的权限配置。

#### 返回值
`Record<string, any>` | `undefined` - 权限配置对象

#### 使用示例
```tsx title="获取权限配置"
const permConfig = cascadeTable.getPermConfig();
if (permConfig?.readonly) {
  console.log('组件为只读状态');
}
```

## 属性
### config
组件的配置对象，包含所有级联表的配置选项。

**类型**: `CascadeTableNewComponentConfig`

### ModelClass
关联的数据模型类，用于数据操作和类型定义。

**类型**: `typeof Jit.BaseModel`

### title
组件的标题。

**类型**: `string`

### name
组件的名称标识。

**类型**: `string`

### type
组件的类型标识。

**类型**: `string`

### compType
组件的类型枚举值。

**类型**: `COMPONENT_TYPE`

### showTitle
是否显示组件标题。

**类型**: `boolean`

### app
当前应用实例，提供应用级别的API访问。

**类型**: `App`（只读）

### page
当前页面实例，提供页面级别的API访问。

**类型**: `BasePage`（只读）

## 事件
### selectedChange
选中行改变后触发的事件。

#### 参数详解
| 参数名 | 类型 | 说明 |
|--------|------|------|
| selectedRowList | RowList | 当前选中的多行数据 |

#### 使用示例
```tsx title="监听选中行变化"
cascadeTable.subscribeEvent('selectedChange', (data) => {
  console.log('选中的数据:', data.selectedRowList.value);
  // 处理选中数据变化逻辑
});
```

### afterClickRow
点击表格行后触发的事件。

#### 参数详解
| 参数名 | 类型 | 说明 |
|--------|------|------|
| activeRow | RowData | 被点击的行数据 |

#### 使用示例
```tsx title="监听行点击事件"
cascadeTable.subscribeEvent('afterClickRow', (data) => {
  console.log('点击的行:', data.activeRow.value);
  // 处理行点击逻辑
});
```

### afterRowChange
任意字段值改变后触发的事件。

#### 参数详解
| 参数名 | 类型 | 说明 |
|--------|------|------|
| activeRow | RowData | 被修改的行数据 |

#### 使用示例
```tsx title="监听字段值变化"
cascadeTable.subscribeEvent('afterRowChange', (data) => {
  console.log('数据发生变化:', data.activeRow.value);
  // 处理数据变化逻辑
});
```

## 高级特性
### 自定义字段配置
通过fieldConfig可以精细化控制每个字段的显示和交互行为，支持列宽设置、对齐方式、点击事件和行内编辑等高级功能。

```json title="字段配置示例"
{
  "fieldConfig": {
    "name": {
      "alias": "组织名称",
      "position": "left",
      "columnClick": true,
      "inlineEdit": false,
      "wrap": false,
      "width": 200
    },
    "status": {
      "alias": "状态",
      "position": "center", 
      "columnClick": false,
      "inlineEdit": true,
      "width": 100
    }
  }
}
```

### 工具栏按钮配置
支持在表格顶部添加自定义操作按钮，可配置左右两侧工具栏和操作列按钮。

```json title="工具栏配置"
{
  "toolbarLeft": [
    {
      "id": "add",
      "name": "新增",
      "type": "primary",
      "width": 80
    }
  ],
  "toolbarRight": [
    {
      "id": "export",
      "name": "导出",
      "width": 80
    }
  ],
  "actionBtn": [
    {
      "id": "edit",
      "name": "编辑",
      "width": 60
    },
    {
      "id": "delete", 
      "name": "删除",
      "width": 60
    }
  ]
}
```