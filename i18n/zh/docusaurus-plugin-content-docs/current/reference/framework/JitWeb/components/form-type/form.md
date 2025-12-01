---
slug: form
description: "表单 API 参考文档。完整的规格说明、方法和示例。"
---
# 表单
表单是用于数据录入、编辑和查看的交互式组件，基于模型驱动的方式实现数据管理能力。它负责字段布局渲染、数据验证和用户交互，支持多种显示模式和丰富的字段类型，并提供完善的权限控制、规则引擎和审批流程集成。

表单元素分层结构为Meta（components.Meta） → Type（components.Form） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建表单实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的components.FormType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
在页面的 `scheme.json` 中添加表单组件配置：

```json title="页面中添加表单组件"
{
  "componentList": [
    {
      "fullName": "components.Form",
      "type": "components.Form", 
      "name": "CustomerForm",
      "title": "客户表单",
      "showTitle": true,
      "config": {
        "requireElements": [
          {
            "name": "models.CustomerModel",
            "title": "客户模型",
            "type": "models.Meta"
          }
        ],
        "componentDict": {
          "custName": {
            "key": "custName",
            "type": "field",
            "name": "custName",
            "dataType": "Stext",
            "title": "客户姓名",
            "visibleMode": "shown",
            "editMode": "editable",
            "showTitle": true,
            "isRequired": true,
            "descDisplayMode": "bottom",
            "index": 1
          },
          "submitBtn": {
            "key": "submitBtn",
            "type": "button",
            "name": "提交",
            "outputId": "afterSubmit",
            "btnType": "primary",
            "index": 2
          }
        },
        "layoutDict": {
          "custName": {
            "key": "custName",
            "pos": "mid",
            "layout": {
              "w": 120,
              "h": 2,
              "x": 0,
              "y": 0,
              "i": "custName"
            }
          },
          "submitBtn": {
            "key": "submitBtn",
            "pos": "bottom",
            "index": 1
          }
        },
        "topLayoutJustify": "flex-start",
        "bottomLayoutJustify": "center",
        "fillMode": "none"
      }
    }
  ]
}
```

### 配置属性说明
#### requireElements（必需数据源）
表单必须绑定一个模型作为数据源：

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | string | 是 | - | 模型元素fullName |
| title | string | 是 | - | 模型显示名称 |
| type | string | 是 | - | 固定为 "models.Meta" |

#### 组件配置（componentDict）
表单组件配置字典，支持字段、按钮、标签页等多种组件类型：

**字段组件配置 (type: "field")**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| key | string | 是 | - | 字段唯一标识 |
| type | string | 是 | - | 固定为 "field" |
| name | string | 是 | - | 字段名称，对应模型字段 |
| dataType | string | 是 | - | 数据类型，如"Stext"、"Phone"等 |
| title | string | 是 | - | 字段显示标题 |
| visibleMode | string | 是 | - | 显示模式："shown"、"hidden" |
| editMode | string | 是 | - | 编辑模式："editable"、"readonly" |
| showTitle | boolean | 是 | true | 是否显示字段标题 |
| isRequired | boolean | 是 | false | 是否必填 |
| descDisplayMode | string | 是 | "bottom" | 字段描述显示方式："bottom"、"hover" |
| index | number | 是 | - | 排序索引 |
| hasClickOutput | boolean | 否 | false | 是否有点击输出事件 |
| hasChangeOutput | boolean | 否 | false | 是否有值变化输出事件 |

**按钮组件配置 (type: "button")**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| key | string | 是 | - | 按钮唯一标识 |
| type | string | 是 | - | 固定为 "button" |
| name | string | 是 | - | 按钮显示名称 |
| outputId | string | 是 | - | 事件输出ID |
| btnType | string | 否 | "default" | 按钮类型："primary"、"default"等 |
| icon | string | 否 | - | 按钮图标 |
| index | number | 是 | - | 排序索引 |

#### 布局配置（layoutDict）
**中部区域布局 (pos: "mid")**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| key | string | 是 | - | 组件唯一标识 |
| pos | string | 是 | - | 固定为 "mid" |
| layout | object | 是 | - | 栅格布局配置 |
| layout.w | number | 是 | - | 宽度 |
| layout.h | number | 是 | - | 高度 |
| layout.x | number | 是 | - | X坐标 |
| layout.y | number | 是 | - | Y坐标 |
| layout.i | string | 是 | - | 组件标识 |

**顶部/底部区域布局 (pos: "top"/"bottom")**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| key | string | 是 | - | 组件唯一标识 |
| pos | string | 是 | - | "top" 或 "bottom" |
| index | number | 是 | - | 排序索引 |

#### 其他配置选项
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| topLayoutJustify | string | 否 | "flex-start" | 顶部布局对齐："flex-start"、"center"、"flex-end" |
| bottomLayoutJustify | string | 否 | "center" | 底部布局对齐："flex-start"、"center"、"flex-end" |
| fillMode | string | 否 | "none" | 填充模式："none"、"fill" |
| isHorizontalLayout | boolean | 否 | false | 是否水平布局 |
| layoutPercent | number | 否 | - | 布局百分比 |
| isShowStash | boolean | 否 | false | 是否显示暂存按钮 |
| isShowCreateAgain | boolean | 否 | true | 是否显示再次录入按钮 |
| isShowOpRecord | boolean | 否 | true | 是否显示操作记录 |
| isShowApprovalRecord | boolean | 否 | false | 是否显示审批记录 |
| isShowResultRecord | boolean | 否 | false | 是否显示结果记录 |
| manualSubmit | boolean | 否 | false | 是否手动提交 |
| noSubmitBtn | boolean | 否 | false | 不加载提交按钮 |
| noStashBtn | boolean | 否 | false | 不加载暂存按钮 |
| noCreateAgain | boolean | 否 | false | 不加载再次录入按钮 |
| noOpRecord | boolean | 否 | false | 不加载操作记录 |
| noApprovalRecord | boolean | 否 | false | 不加载审批记录 |
| triggerEventFlag | boolean | 否 | false | 触发事件标志 |

## 变量
### mode
表单显示模式变量，控制表单的交互状态。

- **类型**: `Dropdown`
- **可选值**: 
  - `"add"` - 录入模式
  - `"edit"` - 编辑模式  
  - `"read"` - 查看模式
- **默认值**: `"add"`

### formData
表单绑定的数据模型实例，类型为关联模型的 RowData。

- **类型**: `RowData`
- **泛型**: 关联的模型类型
- **说明**: 包含表单所有字段的数据

### refreshFlag
表单刷新标识，用于触发表单重新渲染。

- **类型**: `Numeric`
- **说明**: 内部使用的标识，每次调用 call 方法时会更新

### 子表相关变量
当表单包含子表字段时，会自动生成对应的变量：

- **`{fieldName}selectedRows`**: 子表选中的多行数据，类型为 `RowList`
- **`{fieldName}operatedRow`**: 子表操作的单行数据，类型为 `RowData`

## 方法 
### call
刷新表单数据并触发相关事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| val | Record&lt;string, any&gt; | 否 | null | 要加载的数据对象，为null时刷新当前数据 |

#### 返回值
返回 `Promise&lt;void&gt;`

#### 使用示例
```typescript title="表单数据刷新示例"
// 加载指定数据
await form.call({
  id: 1,
  custName: "张三",
  phone: "13800138000"
});

// 刷新当前数据
await form.call();

// 清空表单
await form.call(null);
```

### publishEvent
发送组件事件消息到应用层。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | string | 是 | - | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | - | 额外传递的数据 |

#### 返回值
返回 `Promise&lt;void&gt;`

#### 使用示例
```typescript title="发送事件示例"
// 发送自定义事件
await form.publishEvent('customEvent', {
  message: '自定义数据',
  timestamp: Date.now()
});
```

### subscribeEvent
订阅组件事件消息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| name | string | 是 | - | 事件名称 |
| evtCb | Function | 是 | - | 事件回调函数 |
| unSubscribeExist | boolean | 否 | true | 是否取消已存在的订阅 |

#### 返回值
返回事件处理器ID `string`

#### 使用示例
```typescript title="订阅事件示例"
// 订阅表单提交事件
const handlerId = form.subscribeEvent('afterSubmit', async (data) => {
  console.log('表单提交:', data);
});

// 订阅字段变化事件
form.subscribeEvent('change-custName', (data) => {
  console.log('客户名称变化:', data.custName);
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | string | 是 | - | 事件处理器ID |

#### 使用示例
```typescript title="取消订阅示例"
// 取消特定事件订阅
form.unSubscribeEvent(handlerId);
```

### setConfig
动态设置组件配置。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| next | Partial&lt;IFormConfig&gt; | 是 | - | 新的配置对象 |
| clean | boolean | 否 | false | 是否完全替换配置 |

#### 使用示例
```typescript title="动态配置示例"
// 更新配置
form.setConfig({
  isShowStash: true,
  bottomLayoutJustify: 'flex-end'
});

// 完全替换配置
form.setConfig(newConfig, true);
```

### destroy
销毁组件实例，清理所有事件监听器和资源。

#### 使用示例
```typescript title="销毁组件示例"
// 销毁表单组件，释放资源
form.destroy();
```

### runCode
在页面上下文中执行代码字符串。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| code | string | 是 | - | 要执行的代码字符串 |

#### 返回值
返回代码执行结果 `any`

#### 使用示例
```typescript title="运行代码示例"
// 执行简单表达式
const result = form.runCode('1 + 1');

// 执行复杂逻辑，可以访问页面上下文
const value = form.runCode(`
  const customerName = this.getComponent('Form1').formData.custName.value;
  return customerName.toUpperCase();
`);
```

### getPermConfig
获取当前组件的权限配置信息。

#### 返回值
返回权限配置对象 `Record&lt;string, any&gt; &#124; undefined`

#### 使用示例
```typescript title="权限配置示例"
// 获取组件权限配置
const permConfig = form.getPermConfig();

if (permConfig) {
  console.log('当前用户对此表单的权限:', permConfig);
}
```

### bindApp
将组件绑定到指定的应用实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| app | App | 是 | - | 要绑定的应用实例 |

#### 使用示例
```typescript title="绑定应用示例"
// 通常由框架自动调用，开发者一般不需要手动绑定
form.bindApp(app);
```

### bindPage
将组件绑定到指定的页面实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | BasePage | 是 | - | 要绑定的页面实例 |

#### 使用示例
```typescript title="绑定页面示例"
// 通常由框架自动调用，开发者一般不需要手动绑定
form.bindPage(page);
```

## 属性
### name
组件实例名称，在页面中唯一标识该组件。

- **类型**: `string`
- **说明**: 组件在页面配置中的唯一标识名

### title
组件显示标题，用于界面展示。

- **类型**: `string`
- **说明**: 组件的中文显示名称

### type
组件类型标识，表示组件的Type元素。

- **类型**: `string`
- **值**: `"components.Form"`
- **说明**: 固定为表单组件类型

### fullName
组件的完整名称路径。

- **类型**: `string`
- **说明**: 包含完整路径的组件标识

### showTitle
是否显示组件标题。

- **类型**: `boolean`
- **说明**: 控制组件标题的显示状态

### config
组件配置对象，包含所有组件配置信息。

- **类型**: `IFormConfig`
- **说明**: 表单的完整配置，包括字段、布局、规则等

### app
当前应用实例，提供应用级的方法和数据访问。

- **类型**: `App`
- **说明**: 表单所属的应用实例，可用于获取其他元素或全局状态

### page
当前页面实例，提供页面级的方法和数据访问。

- **类型**: `BasePage`
- **说明**: 表单所属的页面实例

### compType
组件类型枚举值，标识组件的分类。

- **类型**: `COMPONENT_TYPE`
- **说明**: 组件的类型标识，用于框架内部管理

### dataTypeList
组件包含的数据类型配置列表。

- **类型**: `BaseDataType[]`
- **说明**: 组件的变量定义列表，包含所有数据类型配置

```typescript title="属性使用示例"
// 获取组件基础信息
console.log('组件名称:', form.name);
console.log('组件标题:', form.title);
console.log('组件类型:', form.type);
console.log('组件完整名称:', form.fullName);

// 设置表单模式
form.mode.value = "edit";

// 获取表单数据
const data = form.formData.value;

// 修改字段值
form.formData.custName.value = "李四";

// 保存数据到数据库
await form.formData.save();

// 获取组件变量列表
console.log('组件变量:', form.dataTypeList);

// 获取应用和页面实例
const app = form.app;
const page = form.page;

// 获取其他组件实例
const table = form.app.getElement('Table1');
```

## 事件
表单组件根据配置动态生成事件列表，事件类型包括：

### 基础事件
| 事件名 | 触发时机 | 数据类型 | 说明 |
|--------|---------|----------|------|
| afterCall | 刷新后 | formData | 调用call方法后触发 |

### 按钮事件
根据按钮配置的 `outputId` 生成对应事件：

```typescript title="按钮事件配置示例"
// 按钮配置
{
  "submitBtn": {
    "type": "button",
    "name": "提交",
    "outputId": "afterSubmit"  // 生成 afterSubmit 事件
  }
}

// 事件订阅
form.subscribeEvent('afterSubmit', async (data) => {
  console.log('表单提交:', data);
});
```

### 字段事件
当字段配置了 `hasClickOutput` 或 `hasChangeOutput` 时，会自动生成对应事件：

```typescript title="字段事件配置示例"
// 字段配置
{
  "custName": {
    "type": "field",
    "name": "custName",
    "hasClickOutput": true,     // 生成 click-custName 事件
    "hasChangeOutput": true     // 生成 change-custName 事件
  }
}

// 事件订阅
form.subscribeEvent('click-custName', (data) => {
  console.log('客户名称字段被点击');
});

form.subscribeEvent('change-custName', (data) => {
  console.log('客户名称发生变化:', data.custName);
});
```

### 子表事件
子表字段会自动生成丰富的交互事件：

```typescript title="子表事件示例"
// 子表配置会自动生成以下变量和事件：
// 变量：{fieldName}selectedRows、{fieldName}operatedRow
// 事件：{fieldName}-clickRow、{fieldName}-selectedRowList 等

// 监听子表行点击
form.subscribeEvent('orders-clickRow', (activeRow) => {
  console.log('点击订单行:', activeRow);
});

// 监听子表选中行变化
form.subscribeEvent('orders-selectedRowList', (selectedRows) => {
  console.log('选中的订单:', selectedRows);
});

// 获取子表相关变量
const selectedOrders = form.ordersselectedRows.value;
const operatedOrder = form.ordersoperatedRow.value;
```

### 关联数据事件
当字段配置了关联数据按钮时，会生成相应事件：

```typescript title="关联数据事件示例"
// 监听关联数据新增事件
form.subscribeEvent('custName-createRelateData', () => {
  console.log('点击客户名称关联数据新增按钮');
});
```

## 高级特性
### 规则引擎
表单支持四种类型的规则配置：

#### 显示规则
控制字段和布局的显示隐藏：

```json title="显示规则配置示例"
{
  "ruleDict": {
    "visibleRule1": {
      "key": "visibleRule1",
      "type": "visible",
      "name": "显示规则",
      "condition": "gender == '男'",
      "effectedFieldList": ["militaryService"],
      "effectedLayoutList": []
    }
  }
}
```

#### 必填规则
动态控制字段是否必填：

```json title="必填规则配置示例"
{
  "ruleDict": {
    "requiredRule1": {
      "key": "requiredRule1", 
      "type": "required",
      "name": "必填规则",
      "condition": "custLevel == 'vip'",
      "effectedFieldList": ["phone", "email"]
    }
  }
}
```

#### 编辑规则 
控制字段是否可编辑：

```json title="编辑规则配置示例"
{
  "ruleDict": {
    "editableRule1": {
      "key": "editableRule1",
      "type": "editable", 
      "name": "编辑规则",
      "condition": "status == '草稿'",
      "effectedFieldList": ["custName", "phone"]
    }
  }
}
```

#### 验证规则
自定义数据验证逻辑：

```json title="验证规则配置示例"
{
  "ruleDict": {
    "validateRule1": {
      "key": "validateRule1",
      "type": "validate",
      "name": "验证规则",
      "validateType": "custom",
      "condition": "phone.length == 11",
      "tip": "手机号必须为11位",
      "handleType": "error"
    }
  }
}
```

### 复杂布局组件
#### 标签页组件
```json title="标签页配置示例"
{
  "componentDict": {
    "tabsBasic": {
      "key": "tabsBasic",
      "type": "tabs",
      "name": "基础信息",
      "showName": true,
      "pos": "top",
      "style": "line",
      "tabList": [
        {"id": "tab1", "name": "个人信息"},
        {"id": "tab2", "name": "联系方式"}
      ]
    }
  }
}
```

#### 折叠面板组件
```json title="折叠面板配置示例"
{
  "componentDict": {
    "collapseBasic": {
      "key": "collapseBasic",
      "type": "collapse",
      "name": "详细信息",
      "accordion": false,
      "defaultExpandAll": true,
      "panelList": [
        {"id": "panel1", "name": "基础信息"},
        {"id": "panel2", "name": "扩展信息"}
      ]
    }
  }
}
```

#### 分割线组件
```json title="分割线配置示例"
{
  "componentDict": {
    "divider1": {
      "key": "divider1",
      "type": "divider",
      "name": "分割线",
      "title": "客户信息",
      "style": "line",
      "color": "#d9d9d9",
      "titleColor": "#666666"
    }
  }
}
```

### 权限控制
表单支持基于角色的字段权限控制：

```json title="权限配置示例"
{
  "readAccessControl": ["custName", "phone"],
  "editAccessControl": ["custName"],
  "isShowAllReadField": false,
  "isShowAllEditField": true
}
```

### 审批流程集成
表单与审批流程深度集成，支持审批记录显示：

```json title="审批集成配置示例"
{
  "isShowApprovalRecord": true,
  "approvalOption": {
    "isSelectAll": false,
    "selected": ["workflow1", "workflow2"],
    "isOnlyShowStartAR": true
  },
  "workflowName": "客户审批流程",
  "nodeId": "node1"
}
```
