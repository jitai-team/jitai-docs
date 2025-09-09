---
slug: data-correction
---
# 数据修正
数据修正组件是专门用于数据质量检查和错误修正的操作类组件，基于可视化配置实现数据一致性检查和异常值处理。它负责批量数据修正、字段值验证和修正规则管理，支持自动修正和手动确认模式，为数据清洗和质量管理场景提供完整的解决方案。

数据修正组件元素分层结构为Meta（components.Meta） → Type（components.DataCheck） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建数据修正组件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.DataCheckType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
MyApp/
├── models/
│   └── CustomerModel/
│       ├── model.py
│       ├── e.json
│       └── __init__.py
└── pages/
    └── DataManagePage/
        ├── scheme.json
        └── e.json
```

```json title="页面配置文件 - scheme.json"
{
  "componentList": [
    {
      "fullName": "components.DataCheck",
      "type": "components.DataCheck",
      "name": "DataCheck1",
      "title": "客户数据修正",
      "config": {
        "requireElements": [
          {
            "name": "models.CustomerModel",
            "filter": "",
            "orderBy": [],
            "title": "客户模型",
            "type": "models.Meta"
          }
        ],
        "fieldIdList": [
          "custName",
          "phone", 
          "email",
          "company"
        ]
      },
      "showTitle": true
    }
  ]
}
```

### 配置属性说明
**requireElements** `Array<requireElement>` **必填**
关联的数据模型配置，定义组件要操作的数据模型。

**fieldIdList** `Array<string>` 可选
可修正的字段列表，指定允许用户修正的字段名称。

**requireElement配置**：

**name** `string` **必填**
模型元素的fullName标识。

**type** `string` **必填** 
模型元素类型，通常为"models.Meta"。

**title** `string` **必填**
模型的显示标题。

**filter** `string` 可选，默认""
数据过滤条件，用于筛选要处理的数据。

**orderBy** `Array<string>` 可选，默认[]
排序规则配置。

## 变量
### correctedRowList
要修正的多行数据变量，用于存储需要进行数据修正的记录列表。

**类型**：`RowList<关联模型&gt;`

**用法示例**：

```tsx title="获取和设置修正数据"
// 获取组件实例
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// 设置要修正的数据
dataCheckComp.correctedRowList.value = [
  { id: 1, custName: "张三", phone: "1380000001" },
  { id: 2, custName: "李四", phone: "1380000002" }
];

// 获取修正后的数据
const correctedData = dataCheckComp.correctedRowList.value;
```

## 方法 
### publishEvent
发布组件事件到事件总线。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | Record&lt;string, any&gt; | 附加数据 | - | 否 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="发布事件"
// 手动触发提交后事件
await dataCheckComp.publishEvent("afterSubmit", { 
  success: true, 
  modifiedCount: 5 
});
```

### subscribeEvent
订阅组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | Function | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
string - 订阅ID

#### 使用示例
```tsx title="订阅事件"
// 订阅提交后事件
const subscriptionId = dataCheckComp.subscribeEvent("afterSubmit", async (data) => {
  console.log("数据修正完成：", data);
  // 刷新其他组件数据
  await otherComponent.refresh();
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 订阅ID | - | 是 |

#### 返回值
boolean

#### 使用示例
```tsx title="取消订阅"
// 取消事件订阅
dataCheckComp.unSubscribeEvent(subscriptionId);
```

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | Partial&lt;ComponentConfig&gt; | 新的配置对象 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 返回值
void

#### 使用示例
```tsx title="更新配置"
// 添加新的可修正字段
dataCheckComp.setConfig({
  fieldIdList: ["custName", "phone", "email", "address"]
});

// 完全替换配置
dataCheckComp.setConfig({
  requireElements: [...],
  fieldIdList: ["newField1", "newField2"]
}, true);
```

### bindApp
绑定应用实例到组件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| app | App | 应用实例 | - | 是 |

#### 使用示例
```tsx title="绑定应用实例"
// 手动绑定应用实例
dataCheckComp.bindApp(app);
```

### bindPage
绑定页面实例到组件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| page | BasePage | 页面实例 | - | 是 |

#### 使用示例
```tsx title="绑定页面实例"
// 手动绑定页面实例
dataCheckComp.bindPage(page);
```

### runCode
运行自定义代码片段。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码 | - | 是 |

#### 返回值
any - 代码执行结果

#### 使用示例
```tsx title="运行自定义代码"
// 运行自定义业务逻辑
const result = dataCheckComp.runCode(`
  self.getElement("components.Table1").refresh();
  return "执行完成";
`);
```

### getPermConfig
获取组件的权限配置。

#### 返回值
Record&lt;string, any&gt; | undefined - 权限配置对象

#### 使用示例
```tsx title="获取权限配置"
// 获取组件权限设置
const permConfig = dataCheckComp.getPermConfig();
if (permConfig?.editable === false) {
  // 禁用编辑功能
}
```

### newVariable
创建新的数据类型变量。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| varConfig | DataTypeConfig | 变量配置 | - | 是 |

#### 返回值
any - 创建的变量实例

#### 使用示例
```tsx title="创建新变量"
// 动态创建新的数据变量
const newVar = dataCheckComp.newVariable({
  name: "dynamicField",
  title: "动态字段",
  dataType: "Stext"
});
```

### destroy
销毁组件实例，清理所有事件订阅和资源。

#### 使用示例
```tsx title="销毁组件"
// 页面卸载时销毁组件
dataCheckComp.destroy();
```

## 属性
### name
组件实例名称。

**类型**：`string`

**只读**：是

### title
组件显示标题。

**类型**：`string`

### config
组件配置对象。

**类型**：`ComponentConfig`

### fieldDefineList
字段定义列表，包含关联模型的所有字段配置。

**类型**：`DataTypeConfig[]`

**只读**：是

### ModelClass
关联的模型类。

**类型**：`typeof Jit.BaseModel`

**只读**：是

### showTitle
是否显示组件标题。

**类型**：`boolean`

### type
组件类型标识。

**类型**：`string`

**只读**：是

**值**：`"components.DataCheck"`

### fullName
组件完整路径名称。

**类型**：`string`

**只读**：是

### app
关联的应用实例。

**类型**：`App`

**只读**：是

### page
关联的页面实例。

**类型**：`BasePage`

**只读**：是

### compType
组件类型枚举值。

**类型**：`COMPONENT_TYPE`

**只读**：是

### dataTypeList
组件中定义的数据类型列表。

**类型**：`BaseDataType[]`

**只读**：是

## 事件
### afterSubmit
数据修正提交完成后触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | any | 提交相关数据 | - | 否 |

#### 使用示例
```tsx title="监听提交事件"
// 在页面中监听修正完成事件
dataCheckComp.subscribeEvent("afterSubmit", async (submitData) => {
  // 显示成功消息
  app.showMessage("数据修正完成", "success");
  
  // 刷新数据表格
  const tableComp = app.getElement("pages.DataManagePage.Table1");
  await tableComp.refresh();
  
  // 清空修正数据
  dataCheckComp.correctedRowList.value = [];
});
```

## 高级特性
### 修正规则配置
数据修正组件支持多种修正操作类型，包括字段内置方法和通用操作：

```tsx title="修正规则示例"
// 获取组件实例
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// 设置要修正的数据
dataCheckComp.correctedRowList.value = [
  { 
    id: 1, 
    custName: "  张三  ", 
    phone: "138-0000-0001",
    status: "active"
  }
];

// 组件内部支持的修正操作包括：
// 1. 设置为指定值：set
// 2. 清空字段：clear  
// 3. 字段特有方法：如字符串的trim()、append()等
```

### 字段验证与错误处理
组件会自动执行字段验证，确保修正后的数据符合字段定义：

```tsx title="错误处理示例"
// 组件会自动验证：
// - 数据类型是否正确
// - 是否符合字段约束
// - 必填字段是否有值
// - 数值范围是否合法

// 验证失败时会显示错误提示
// 阻止提交操作继续执行
```

### 批量数据处理
支持对多条记录应用相同的修正规则：

```tsx title="批量处理示例"
// 批量修正客户电话号码格式
const customerData = [
  { id: 1, phone: "138-0000-0001" },
  { id: 2, phone: "139-0000-0002" },
  { id: 3, phone: "137-0000-0003" }
];

dataCheckComp.correctedRowList.value = customerData;

// 用户在界面中配置修正规则：
// 字段：phone
// 操作：replace（如果电话号码字段支持此方法）
// 参数：将"-"替换为""
// 
// 组件会自动应用到所有选中的记录
```

### 与其他组件联动
数据修正组件通常与表格组件配合使用：

```tsx title="组件联动示例"
// 表格选中数据传递给修正组件
const tableComp = app.getElement("pages.DataManagePage.Table1");
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// 获取表格选中的行
tableComp.subscribeEvent("selectionChange", (selectedRows) => {
  // 将选中数据传递给修正组件
  dataCheckComp.correctedRowList.value = selectedRows;
});

// 修正完成后刷新表格
dataCheckComp.subscribeEvent("afterSubmit", async () => {
  await tableComp.refresh();
});
``` 