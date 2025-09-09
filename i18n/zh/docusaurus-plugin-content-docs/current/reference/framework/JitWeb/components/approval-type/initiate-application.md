---
slug: initiate-application
---
# 发起申请
发起申请是审批流程的入口组件，基于表单数据模型实现审批申请的发起和管理功能。它负责收集用户填写的表单数据、启动审批流程和展示审批历史记录，支持数据刷新和事件通知机制。

发起申请元素分层结构为Meta（components.Meta） → Type（components.Apply） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建发起申请实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.ApplyType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```json title="页面配置中的发起申请组件"
{
  "fullName": "components.Apply",
  "type": "components.Apply", 
  "name": "Apply32",
  "title": "发起申请32",
  "config": {
    "requireElements": [
      {
        "name": "models.LeaveRequestModel",
        "title": "请假申请模型",
        "type": "models.NormalType"
      }
    ],
    "workflowName": "请假审批流程",
    "isShowHistory": true
  },
  "showTitle": true
}
```

### 配置属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| requireElements | Array | 是 | - | 关联的数据模型配置，指定表单数据的来源模型 |
| workflowName | String | 否 | "" | 审批流程名称，用于指定启动的审批流程 |
| isShowHistory | Boolean | 否 | true | 是否显示审批历史记录面板 |

**requireElements 配置项：**

| 属性名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 数据模型的完整名称，如"models.LeaveRequestModel" |
| title | String | 是 | 模型的显示标题 |
| type | String | 是 | 固定值"models.NormalType" |

## 变量
组件自动创建以下变量，可在页面逻辑中直接使用：

### applyInstanceId
- **类型：** Numeric
- **访问：** 只读
- **说明：** 当前审批流程的实例ID，用于跟踪审批状态

### applyFormKey
- **类型：** RowData
- **访问：** 读写
- **说明：** 表单数据对象，包含用户填写的所有申请信息
- **泛型：** 绑定到配置的requireElements模型

### refreshFlag
- **类型：** Numeric
- **访问：** 读写
- **说明：** 刷新标志，用于触发组件重新渲染

## 方法 
### call
刷新组件数据，支持重新加载表单数据或设置新的数据值。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| v | RowData | 否 | 要设置的单行数据，为空时从数据库重新加载 |

#### 返回值
无返回值

#### 使用示例
```typescript title="刷新组件数据"
// 重新从数据库加载数据
apply.call();

// 设置新的表单数据
const newData = {
  id: 1,
  requestType: "年假",
  startDate: "2024-01-15",
  endDate: "2024-01-20"
};
apply.call(newData);
```

### setConfig
动态设置组件配置，支持增量更新或完整替换配置。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| next | Object | 是 | 新的配置对象 |
| clean | Boolean | 否 | 是否完整替换配置，默认false（增量更新） |

#### 返回值
无返回值

#### 使用示例
```typescript title="动态配置组件"
// 增量更新配置
apply.setConfig({
  workflowName: "新的审批流程",
  isShowHistory: false
});

// 完整替换配置
apply.setConfig({
  requireElements: [{
    name: "models.NewModel",
    title: "新模型",
    type: "models.NormalType"
  }],
  workflowName: "完全新的流程"
}, true);
```

### publishEvent
发送组件事件通知，触发绑定的事件处理器。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 事件名称 |
| ex | Object | 否 | 附加的事件数据 |

#### 返回值
Promise\<void>

### subscribeEvent
订阅组件事件，注册事件处理回调函数。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 要订阅的事件名称 |
| evtCb | Function | 是 | 事件回调函数 |
| unSubscribeExist | Boolean | 否 | 是否取消已存在的订阅，默认true |

#### 返回值
String - 订阅句柄ID

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | String | 是 | 订阅句柄ID |

#### 返回值
Boolean - 取消结果

### newVariable
创建新的数据类型变量实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| varConfig | DataTypeConfig | 是 | 变量配置对象 |

#### 返回值
BaseDataType - 数据类型实例

### destroy
销毁组件，释放相关资源。

### runCode
执行代码字符串，在页面上下文中运行。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | String | 是 | 要执行的代码字符串 |

#### 返回值
Any - 代码执行结果

## 属性
### name
- **类型：** String
- **访问：** 只读  
- **说明：** 组件实例名称

### title
- **类型：** String
- **访问：** 只读
- **说明：** 组件显示标题

### fullName
- **类型：** String
- **访问：** 只读
- **说明：** 组件完整名称，如"components.Apply"

### type
- **类型：** String  
- **访问：** 只读
- **说明：** 组件类型标识，值为"components.Apply"

### config
- **类型：** Object
- **访问：** 读写
- **说明：** 组件配置对象，包含requireElements等配置信息

### compType
- **类型：** String
- **访问：** 只读
- **说明：** 组件类型枚举值

### showTitle
- **类型：** Boolean
- **访问：** 只读
- **说明：** 是否显示组件标题

### dataTypeList
- **类型：** Array
- **访问：** 只读
- **说明：** 组件变量定义列表，包含所有自动创建的变量配置

### app
- **类型：** App
- **访问：** 只读
- **说明：** 当前应用实例引用

### page
- **类型：** BasePage
- **访问：** 只读
- **说明：** 当前页面实例引用

## 事件
### afterExecute
审批处理完成后触发的事件，在用户提交申请后调用。

#### 参数详解
| 参数名 | 类型 | 说明 |
|--------|------|------|
| formData | RowData | 提交的表单数据对象 |

#### 使用示例
```typescript title="处理申请提交事件"
// 订阅处理后事件
const handleId = apply.subscribeEvent('afterExecute', async (data) => {
  const formData = data.formData;
  console.log('申请已提交:', formData);
  
  // 显示成功提示
  notification.success({
    message: '申请提交成功',
    description: '您的申请已进入审批流程'
  });
  
  // 跳转到申请列表页面
  page.navigate('pages.RequestListPage');
});

// 手动触发事件（通常由组件内部调用）
await apply.publishEvent('afterExecute', { 
  formData: apply.applyFormKey.value 
});
```

### afterCall
组件刷新完成后触发的事件，在调用call方法后执行。

#### 参数详解
| 参数名 | 类型 | 说明 |
|--------|------|------|
| formData | RowData | 刷新后的表单数据对象 |

#### 使用示例
```typescript title="处理数据刷新事件"  
apply.subscribeEvent('afterCall', async (data) => {
  const formData = data.formData;
  console.log('数据已刷新:', formData);
  
  // 更新相关组件状态
  if (formData.status === 'draft') {
    submitButton.setEnabled(true);
  }
});
```