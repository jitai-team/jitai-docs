---
slug: general-filter
---
# 通用筛选器
通用筛选器是数据查询筛选组件，基于可配置的筛选字段和条件实现灵活的数据过滤功能。它负责筛选条件的构建、字段映射处理和Q表达式生成，支持多种数据类型的筛选操作和自定义筛选逻辑配置。

通用筛选器元素分层结构为Meta（components.Meta） → Type（components.GenericFilter） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建通用筛选器实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.GenericFilterType元素，以实现自己的封装。

## 快速开始
### 基础配置示例
```json title="通用筛选器基础配置"
{
  "name": "GenericFilter1",
  "title": "订单筛选器",
  "type": "components.GenericFilter",
  "config": {
    "requireElements": []
  },
  "showTitle": true
}
```

### 配置属性说明
| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| name | string | - | 是 | 组件实例名称 |
| title | string | - | 是 | 组件显示标题 |
| type | string | components.GenericFilter | 是 | 组件类型标识 |
| config | object | \{\} | 否 | 组件配置对象 |
| config.requireElements | array | [] | 否 | 依赖元素配置 |
| showTitle | boolean | true | 否 | 是否显示组件标题 |

## 变量
暂无

## 方法
### getFilter
获取当前筛选器配置的筛选条件，将筛选器中的字段映射到目标模型并生成Q表达式字符串。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| modelName | string | - | 是 | 目标数据模型名称（当前版本中此参数暂未使用） |
| mappingDict | object | - | 是 | 字段映射字典，key为筛选器字段ID，value为目标模型字段名 |

#### 返回值
- **类型**：QFilter（筛选条件字符串）
- **说明**：返回转换后的Q表达式字符串，可直接用于数据模型查询。当字段映射不完整或无筛选条件时返回空字符串

#### 使用示例
```typescript title="获取筛选条件"
// 设置字段映射并获取筛选条件
const mappingDict = {
  "status": "orderStatus",
  "createTime": "createdAt", 
  "amount": "totalAmount"
};

const filter = genericFilter.getFilter("models.OrderModel", mappingDict);

// 使用筛选条件查询数据
if (filter) {
  const orderModel = app.getElement("models.OrderModel");
  const result = await orderModel.query({
    filter: filter,
    page: 1,
    size: 20
  });
}
```

### setConfig
设置组件配置信息。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| next | object | - | 是 | 新的配置对象 |
| clean | boolean | false | 否 | 是否完全替换配置，true为替换，false为合并 |

#### 使用示例
```typescript title="设置组件配置"
// 合并配置
genericFilter.setConfig({
  requireElements: ["models.OrderModel"]
});

// 完全替换配置  
genericFilter.setConfig({
  requireElements: []
}, true);
```

### publishEvent
发布组件事件，触发注册的事件处理器。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| name | string | - | 是 | 事件名称 |
| ex | object | - | 否 | 事件参数对象 |

#### 使用示例
```typescript title="发布事件"
// 发布筛选完成事件
await genericFilter.publishEvent('afterFilter', {
  filterCount: 3,
  timestamp: Date.now()
});
```

### subscribeEvent
订阅组件事件，注册事件处理器。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| name | string | - | 是 | 事件名称 |
| evtCb | function | - | 是 | 事件回调函数，支持同步和异步函数 |
| unSubscribeExist | boolean | true | 否 | 是否取消已存在的同名订阅 |

#### 返回值
- **类型**：string
- **说明**：返回事件处理器ID，用于取消订阅

#### 使用示例
```typescript title="订阅事件"
// 订阅筛选完成事件
const handlerId = genericFilter.subscribeEvent('afterFilter', (data) => {
  console.log('筛选完成:', data);
  // 刷新关联的数据表格
  this.table1.refresh();
});

// 订阅异步事件处理
const asyncHandlerId = genericFilter.subscribeEvent('afterFilter', async (data) => {
  await updateDataDisplay(data);
});
```

### unSubscribeEvent
取消事件订阅，移除指定的事件处理器。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| id | string | - | 是 | 事件处理器ID |

#### 使用示例
```typescript title="取消事件订阅"
// 取消特定事件订阅
genericFilter.unSubscribeEvent(handlerId);
```

### destroy
销毁组件实例，清理所有资源、事件监听和变量引用。

#### 使用示例
```typescript title="销毁组件"
// 组件销毁时清理资源
genericFilter.destroy();
```

### runCode
在页面上下文中执行JavaScript代码字符串。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| code | string | - | 是 | 要执行的JavaScript代码字符串 |

#### 返回值
- **类型**：any
- **说明**：返回代码执行结果，执行失败时返回undefined

#### 使用示例
```typescript title="执行代码"
// 执行页面方法
const result = genericFilter.runCode('this.table1.refresh()');

// 执行表达式
const value = genericFilter.runCode('this.orderStatus.value');
```

### getPermConfig
获取组件的权限配置信息。

#### 返回值
- **类型**：object | undefined  
- **说明**：返回组件权限配置对象，如果无权限限制则返回undefined

#### 使用示例
```typescript title="获取权限配置"
// 检查组件权限
const permConfig = genericFilter.getPermConfig();
if (permConfig) {
  console.log('组件权限配置:', permConfig);
}
```

### getEventKey
获取组件事件的完整键名，用于事件系统内部标识。

#### 参数详解
| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| eventName | string | - | 是 | 事件名称 |

#### 返回值
- **类型**：string
- **说明**：返回格式为 `{uuid}.{componentName}.{eventName}` 的事件键名

#### 使用示例
```typescript title="获取事件键名"
// 获取afterFilter事件的完整键名
const eventKey = genericFilter.getEventKey('afterFilter');
console.log(eventKey); // 输出: "uuid.GenericFilter1.afterFilter"
```

## 属性
| 属性名 | 类型 | 说明 |
|--------|------|------|
| name | string | 组件实例名称 |
| title | string | 组件显示标题 |
| fullName | string | 组件完整名称，格式为`{元素类型}.{实例名}` |
| config | object | 组件配置信息 |
| showTitle | boolean | 是否显示标题 |
| type | string | 组件类型标识 |
| compType | string | 组件类型枚举值 |
| dataTypeList | array | 组件变量定义列表 |
| app | App | 关联的应用实例 |
| page | BasePage | 关联的页面实例 |
| filterList | IFilter[] | 当前筛选条件列表，内部维护的筛选状态 |

## 事件
### afterFilter
用户完成筛选操作后触发的事件，可用于响应筛选状态变化。

#### 使用示例
```typescript title="afterFilter事件处理"
// 监听筛选完成事件
genericFilter.subscribeEvent('afterFilter', () => {
  console.log('用户完成了筛选操作');
  // 执行后续逻辑，如刷新数据表格
  this.table1.refresh();
});

// 带参数的事件处理
genericFilter.subscribeEvent('afterFilter', (eventData) => {
  console.log('筛选事件数据:', eventData);
  // 根据筛选结果更新页面状态
  this.updatePageState(eventData);
});
```

## 高级特性
### 字段映射机制
通用筛选器通过字段映射实现筛选器字段与目标模型字段的灵活关联，支持不同命名规范的字段映射：

```typescript title="字段映射配置"
// 筛选器字段ID与目标模型字段的映射关系
const mappingDict = {
  "orderNo": "orderNumber",      // 订单号字段映射
  "customerName": "customer",    // 客户名称字段映射
  "orderDate": "createdAt",      // 订单日期字段映射
  "orderType": "type"            // 订单类型字段映射
};

const filter = genericFilter.getFilter("models.OrderModel", mappingDict);
```

### 筛选条件验证
组件内置完整性验证机制，确保所有筛选器配置的字段都能正确映射到目标模型：

```typescript title="筛选条件验证机制"
// 当字段映射不完整时的处理
const incompleteMapping = {
  "status": "orderStatus"
  // 缺少筛选器中其他字段的映射
};

const filter = genericFilter.getFilter("models.OrderModel", incompleteMapping);
// 映射不完整时会：
// 1. 显示错误提示："{组件标题}设置的字段给到目标数据模型时映射不完整"  
// 2. 返回空字符串，避免错误查询
```

### 筛选条件构建
组件内部使用IFilter结构维护筛选条件，支持单项筛选和分组筛选，最终生成标准的QFilter格式：

```typescript title="筛选条件结构"
// filterList中包含的筛选项类型：
// 1. item类型：单个筛选条件
// 2. group类型：分组筛选条件

// 最终生成的QFilter结构
const QFilter = {
  type: 'group',
  uid: 'group-uuid',
  filterList: [
    // 映射处理后的筛选条件列表
  ]
};
``` 