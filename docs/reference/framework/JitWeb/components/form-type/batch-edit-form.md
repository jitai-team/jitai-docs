---
slug: batch-edit-form
---
# 批量编辑表单
批量编辑表单是用于对多条数据进行统一编辑操作的表单组件，基于数据模型和字段配置实现批量数据修改能力。它负责表单数据管理、字段编辑控制和批量提交处理，支持灵活的字段配置、布局自定义和权限控制。

批量编辑表单元素分层结构为Meta（components.Meta） → Type（components.EditForm） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建批量编辑表单实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.EditFormType元素，以实现自己的封装。

## 快速开始
### 基础配置示例
```typescript title="基础批量编辑表单配置"
{
  "fullName": "components.EditForm",
  "type": "components.EditForm", 
  "name": "EditForm24",
  "title": "批量编辑表单",
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
    "topLayoutJustify": "flex-start",
    "bottomLayoutJustify": "center",
    "componentDict": {
      "custName": {
        "key": "custName",
        "type": "field",
        "name": "custName", 
        "title": "客户名称",
        "visibleMode": "shown",
        "editMode": "editable",
        "showTitle": true,
        "isRequired": false,
        "descDisplayMode": "bottom",
        "index": 1
      },
      "phone": {
        "key": "phone",
        "type": "field",
        "name": "phone",
        "title": "电话",
        "visibleMode": "shown", 
        "editMode": "editable",
        "showTitle": true,
        "isRequired": false,
        "descDisplayMode": "bottom",
        "index": 2
      }
    }
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 默认值 | 说明 | 示例值 |
|--------|------|---------|------|---------|
| requireElements | RequireElement[] | [] | 依赖的数据模型配置 | 见上例 |
| topLayoutJustify | FormLayoutJustifyEnum | "flex-start" | 顶部布局对齐方式 | "flex-start", "center", "flex-end" |
| bottomLayoutJustify | FormLayoutJustifyEnum | "center" | 底部布局对齐方式 | "flex-start", "center", "flex-end" |
| layoutPercent | number | - | 布局百分比 | 50 |
| componentDict | Record&lt;string, IEditFormComponentDefine&gt; | \{\} | 字段组件配置字典 | 见上例 |
| layoutDict | Record&lt;string, IFormLayoutDefine&gt; | \{\} | 布局配置字典 | \{\} |
| ruleDict | Record&lt;string, IFormRuleDefine&gt; | \{\} | 规则配置字典 | \{\} |
| buttonRuleDict | Record&lt;string, Object&gt; | \{\} | 按钮规则配置字典 | \{\} |
| fillMode | EditFormFillModeEnum | - | 填充模式 | "auto", "manual" |
| isHorizontalLayout | boolean | false | 是否水平布局 | true, false |

#### 字段配置属性（IEditFormFieldDefine）
| 属性名 | 类型 | 默认值 | 说明 | 示例值 |
|--------|------|---------|------|---------|
| key | string | - | 字段唯一标识 | "custName" |
| name | string | - | 字段名称 | "custName" |
| title | string | - | 字段显示标题 | "客户名称" |
| type | "field" | "field" | 组件类型 | "field" |
| index | number | - | 字段排序索引 | 1 |
| showTitle | boolean | true | 是否显示标题 | true, false |
| isRequired | boolean | false | 是否必填 | true, false |
| visibleMode | FormFieldVISIBLEEnum | "shown" | 可见模式 | "shown", "hidden" |
| editMode | FormFieldModeEnum | "editable" | 编辑模式 | "editable", "readonly" |
| descDisplayMode | "bottom" \| "hover" | "bottom" | 描述显示模式 | "bottom", "hover" |
| hasClickOutput | boolean | false | 是否有点击输出事件 | true, false |
| hasChangeOutput | boolean | false | 是否有值改变输出事件 | true, false |
| varConfig | IEditOtherConfigDefine | - | 变量配置 | \{inFormViewOnlyShowMode: 1\} |
| isManualAdd | boolean | false | 是否手动添加 | true, false |
| fuzzySearch | boolean | false | 是否模糊搜索 | true, false |
| fuzzyFilter | string | - | 模糊过滤条件 | "name LIKE '%value%'" |
| hasScanCode | boolean | false | 是否支持扫码 | true, false |
| isCameraOnly | boolean | false | 是否仅支持拍照 | true, false |

## 变量
### formData
- **类型**: RowData
- **说明**: 表单数据对象，存储当前编辑的单行数据
- **泛型**: 基于requireElements中配置的数据模型

```typescript title="访问表单数据"
// 获取表单数据
const formData = this.formData.value;

// 更新表单数据
this.formData.update({
  custName: "新客户名称",
  phone: "13800138000"
});

// 重置表单数据
this.formData.reset();

// 刷新表单数据
this.formData.refresh();
```

### editRowList
- **类型**: RowList  
- **说明**: 要批量操作的多行数据列表
- **泛型**: 基于requireElements中配置的数据模型

```typescript title="操作多行数据"
// 设置要编辑的数据列表
this.editRowList.value = [
  {id: 1, custName: "客户1", phone: "13800138001"},
  {id: 2, custName: "客户2", phone: "13800138002"}
];

// 获取数据列表
const dataList = this.editRowList.value;

// 追加数据
this.editRowList.append({
  id: 3, custName: "客户3", phone: "13800138003"
});

// 重置数据列表
this.editRowList.reset();
```

## 方法
### call
刷新组件数据，可传入新的数据列表或刷新现有数据。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| dataList | RowList | 否 | 要批量操作的多行数据 | [\{id: 1, name: "test"\}] |

#### 返回值
无返回值

#### 使用示例
```typescript title="刷新表单数据"
// 刷新现有数据
await this.EditForm24.call();

// 设置新的数据列表
await this.EditForm24.call([
  {id: 1, custName: "客户1", phone: "13800138001"},
  {id: 2, custName: "客户2", phone: "13800138002"}
]);

// 清空数据列表
await this.EditForm24.call(null);
```

### publishEvent
发布组件事件，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| name | string | 是 | 事件名称 | "afterSubmit" |
| ex | Record&lt;string, any&gt; | 否 | 附加数据 | \{success: true\} |

#### 返回值
Promise - 异步操作，无返回值

#### 使用示例
```typescript title="发布自定义事件"
// 发布提交成功事件
await this.publishEvent("afterSubmit", {
  success: true,
  data: this.formData.value
});

// 发布字段值改变事件
await this.publishEvent("change-custName", {
  oldValue: "旧值",
  newValue: "新值"
});
```

### subscribeEvent
订阅组件事件，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| name | string | 是 | 事件名称 | "afterSubmit" |
| evtCb | Function | 是 | 事件回调函数 | (data) => \{\} |
| unSubscribeExist | boolean | 否 | 是否取消订阅已存在的事件 | true |

#### 返回值
string - 事件处理器ID

#### 使用示例
```typescript title="订阅表单事件"
// 订阅提交后事件
const handlerId = this.subscribeEvent("afterSubmit", async (data) => {
  console.log("表单提交成功:", data);
  // 处理提交后逻辑
});

// 订阅字段值改变事件
this.subscribeEvent("change-custName", (data) => {
  console.log("客户名称发生改变:", data);
});
```

### unSubscribeEvent
取消订阅事件，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| id | string | 是 | 事件处理器ID | "handler-id-123" |

#### 返回值
boolean

#### 使用示例
```typescript title="取消事件订阅"
// 取消指定事件订阅
const success = this.unSubscribeEvent(handlerId);
console.log("取消订阅结果:", success);
```

### setConfig
更新组件配置，支持动态修改表单设置，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| next | Partial&lt;IEditFormConfig&gt; | 是 | 要更新的配置对象 | \{topLayoutJustify: "center"\} |
| clean | boolean | 否 | 是否完全替换配置 | false |

#### 返回值
无返回值

#### 使用示例
```typescript title="动态更新配置"
// 更新布局配置
this.setConfig({
  topLayoutJustify: "center",
  bottomLayoutJustify: "flex-end"
});

// 添加新字段配置
this.setConfig({
  componentDict: {
    ...this.config.componentDict,
    newField: {
      key: "newField",
      type: "field",
      name: "newField",
      title: "新字段",
      visibleMode: "shown",
      editMode: "editable",
      showTitle: true,
      isRequired: false,
      descDisplayMode: "bottom",
      index: 10
    }
  }
});
```

### runCode
执行自定义JavaScript代码，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| code | string | 是 | 要执行的JavaScript代码字符串 | "return this.formData.value.custName" |

#### 返回值
any - 代码执行结果

#### 使用示例
```typescript title="执行自定义代码"
// 获取表单中的客户名称
const custName = this.runCode("return this.formData.value.custName");
console.log("客户名称:", custName);

// 执行复杂逻辑
const result = this.runCode(`
  const data = this.formData.value;
  return data.custName + ' - ' + data.phone;
`);
```

### getPermConfig
获取当前组件的权限配置，继承自BaseComponent。

#### 返回值
Object | undefined - 权限配置对象或undefined

#### 使用示例
```typescript title="获取权限配置"
// 获取权限配置
const permConfig = this.getPermConfig();
if (permConfig) {
  console.log("组件权限配置:", permConfig);
  // 根据权限配置调整组件行为
}
```

### destroy
销毁组件，清理资源，继承自BaseComponent。

#### 使用示例
```typescript title="销毁组件"
// 组件销毁时自动调用
this.destroy();
```

### getVariableList
获取组件变量列表的静态方法，框架内部使用。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| compConfig | Record&lt;string, any&gt; | 是 | 组件配置对象 | \{requireElements: [...]\} |

#### 返回值
Array - 变量配置数组

#### 使用示例
```typescript title="获取变量列表"
// 框架内部调用
const variables = EditFormComponent.getVariableList(config);
console.log("组件变量:", variables);
```

### getFuncList
获取组件函数列表的静态方法，框架内部使用。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| compConfig | Record&lt;string, any&gt; | 是 | 组件配置对象 | \{requireElements: [...]\} |

#### 返回值
Array - 函数配置数组

#### 使用示例
```typescript title="获取函数列表"
// 框架内部调用
const functions = EditFormComponent.getFuncList(config);
console.log("组件函数:", functions);
```

### getEventList
获取组件事件列表的静态方法，框架内部使用。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|---------|
| compConfig | Record&lt;string, any&gt; | 是 | 组件配置对象 | \{requireElements: [...]\} |

#### 返回值
Array | null - 事件配置数组或null

#### 使用示例
```typescript title="获取事件列表"
// 框架内部调用
const events = EditFormComponent.getEventList(config);
console.log("组件事件:", events);
```

## 属性
### name
- **类型**: string
- **说明**: 组件名称，继承自BaseComponent
- **示例**: "EditForm24"

### title
- **类型**: string  
- **说明**: 组件标题，继承自BaseComponent
- **示例**: "批量编辑表单"

### config
- **类型**: IEditFormConfig &amp; \{requireElements: requireElement[]\}
- **说明**: 组件配置对象，包含所有配置属性
- **示例**: 见基础配置示例

### type
- **类型**: string
- **说明**: 组件类型标识，继承自BaseComponent
- **示例**: "components.EditForm"

### fullName
- **类型**: string
- **说明**: 组件完整名称，继承自BaseComponent  
- **示例**: "components.EditForm"

### app
- **类型**: App
- **说明**: 应用实例对象，继承自BaseComponent
- **只读**: 是

### page
- **类型**: BasePage
- **说明**: 页面实例对象，继承自BaseComponent
- **只读**: 是

### showTitle
- **类型**: boolean
- **说明**: 是否显示标题，继承自BaseComponent
- **默认值**: false

### compType
- **类型**: COMPONENT_TYPE
- **说明**: 组件类型枚举，继承自BaseComponent

### dataTypeList
- **类型**: BaseDataType[]
- **说明**: 组件变量定义列表，继承自BaseComponent
- **只读**: 是

## 事件
### afterCall
刷新后触发的事件。

**数据**: formData - 表单数据对象

```typescript title="监听刷新后事件"
this.subscribeEvent("afterCall", (data) => {
  console.log("表单刷新完成:", data.formData);
  // 处理刷新后逻辑
});
```

### afterSubmit
表单提交后触发的事件。

**数据**: formData - 表单数据对象

```typescript title="监听提交后事件" 
this.subscribeEvent("afterSubmit", (data) => {
  console.log("表单提交成功:", data.formData);
  // 处理提交成功逻辑
});
```

### beforeSubmit
表单提交前触发的事件。

**数据**: formData - 表单数据对象

```typescript title="监听提交前事件"
this.subscribeEvent("beforeSubmit", (data) => {
  console.log("即将提交表单:", data.formData);
  // 提交前验证逻辑
  return true; // 返回false可阻止提交
});
```

### 字段点击事件
当字段配置了hasClickOutput为true时，点击字段触发的事件。

**事件名格式**: `click-{fieldName}`
**数据**: formData - 表单数据对象

```typescript title="监听字段点击事件"
this.subscribeEvent("click-custName", (data) => {
  console.log("客户名称字段被点击:", data.formData);
});
```

### 字段值改变事件
当字段配置了hasChangeOutput为true时，字段值改变触发的事件。

**事件名格式**: `change-{fieldName}`  
**数据**: formData - 表单数据对象

```typescript title="监听字段值改变事件"
this.subscribeEvent("change-phone", (data) => {
  console.log("电话字段值发生改变:", data.formData);
});
```

## 高级特性
### 字段权限控制
```typescript title="字段权限配置"
{
  "componentDict": {
    "custName": {
      "editMode": "readonly", // 只读模式
      "visibleMode": "hidden" // 隐藏字段
    }
  }
}
```

### 关联字段配置
```typescript title="关联字段设置"
{
  "componentDict": {
    "relatedField": {
      "varConfig": {
        "filter": "status = 'active'",
        "sort": ["name", "asc"],
        "relateBtn": {
          "checked": true,
          "config": {
            "title": "选择关联数据"
          }
        }
      }
    }
  }
}
```

### 动态字段控制
```typescript title="动态显示控制"
// 根据条件动态显示字段
if (this.formData.custType === "VIP") {
  this.config.componentDict.vipLevel.visibleMode = "shown";
} else {
  this.config.componentDict.vipLevel.visibleMode = "hidden";
}

// 动态设置字段必填
this.config.componentDict.phone.isRequired = true;
```

### 批量数据处理
```typescript title="批量操作示例"
// 批量设置相同值
const updateData = {
  status: "active",
  updateTime: new Date().toISOString()
};

// 对所有选中数据应用相同修改
this.editRowList.value.forEach(row => {
  Object.assign(row, updateData);
});

// 触发批量保存
await this.publishEvent("beforeSubmit");
``` 