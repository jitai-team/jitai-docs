---
slug: import
description: "导入 API 参考文档。完整的规格说明、方法和示例。"
---
# 导入
导入是用于Excel文件数据导入的视图组件，基于分步骤引导式界面实现文件上传、字段映射、数据预览和批量导入功能。它负责处理Excel文件解析、字段验证映射和数据入库操作，支持追加和替换两种导入模式，具备进度监控和错误处理能力。

导入元素分层结构为Meta（components.Meta） → Type（components.Import） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建导入实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.ImportType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```json title="导入组件基础配置"
{
  "type": "components.Import",
  "name": "Import1",
  "title": "客户数据导入",
  "config": {
    "requireElements": [
      {
        "name": "models.CustomerModel",
        "title": "客户模型",
        "type": "models.Meta"
      }
    ],
    "fieldIdList": ["custName", "phone", "email"],
    "fieldAliasList": [
      {
        "aliasName": "客户姓名",
        "fieldId": "custName",
        "fieldName": "custName",
        "fieldType": "Stext",
        "isNeed": true,
        "rules": ""
      }
    ],
    "importType": 1,
    "importDesc": {
      "check": true,
      "desc": "请按照模板格式填写数据"
    }
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|---------|------|------|--------|------|
| requireElements | Array | 是 | - | 关联的数据模型配置 |
| fieldIdList | Array\<string\> | 是 | [] | 可导入的字段ID列表 |
| fieldAliasList | Array\<Object\> | 是 | [] | 字段别名映射配置 |
| importType | number | 否 | 1 | 导入方式：1-追加，2-替换 |
| importDesc | Object | 否 | - | 导入说明配置 |
| requiredFieldList | Array\<string\> | 否 | [] | 必填字段列表 |
| importSerial | boolean | 否 | false | 是否导入序列号 |
| replaceFiled | Array\<string\> | 否 | [] | 替换字段数组 |
| filter | string | 否 | "" | 过滤条件 |
| triggerBeforeFunc | string | 否 | "" | 导入前触发函数 |
| triggerAfterFunc | string | 否 | "" | 导入后触发函数 |

## 变量
暂无

## 方法 
### componentImport
执行数据导入操作，处理Excel文件解析和数据入库。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| importConfig | string | 是 | 导入配置的JSON字符串 |

#### 返回值
返回 `JitDict` 类型，包含导入结果信息。

#### 使用示例
```typescript title="调用导入方法"
const importResult = await this.Import1.componentImport(JSON.stringify({
  modelFullName: "models.CustomerModel",
  importType: 1,
  fieldMap: {...},
  fileUrl: "http://example.com/file.xlsx"
}));
```

### getImportStatus
获取导入任务的进度状态，用于异步导入的进度监控。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| mainModelFullName | string | 是 | 主模型的完整名称 |

#### 返回值
返回 `JitDict` 类型，包含导入状态和进度信息。

#### 使用示例
```typescript title="获取导入状态"
const status = await this.Import1.getImportStatus("models.CustomerModel");
console.log(status.value);
```

### publishEvent
发布组件事件，通知其他组件或页面。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| name | string | 是 | 事件名称 |
| ex | Record\<string, any\> | 否 | 事件附加数据 |

#### 返回值
返回 `Promise<void>`。

#### 使用示例
```typescript title="发布事件"
await this.Import1.publishEvent('importCompleted', {
  successCount: 100,
  errorCount: 2
});
```

### subscribeEvent
订阅组件事件，处理事件回调。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| name | string | 是 | 事件名称 |
| evtCb | Function | 是 | 事件回调函数 |
| unSubscribeExist | boolean | 否 | 是否取消已存在的订阅 |

#### 返回值
返回订阅句柄字符串。

#### 使用示例
```typescript title="订阅事件"
const handleId = this.Import1.subscribeEvent('clickFinishBtn', (data) => {
  console.log('导入操作完成', data);
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| id | string | 是 | 订阅句柄ID |

#### 返回值
返回布尔值表示取消结果。

#### 使用示例
```typescript title="取消订阅"
const success = this.Import1.unSubscribeEvent(handleId);
```

### setConfig
更新组件配置。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| next | Object | 是 | 新的配置对象 |
| clean | boolean | 否 | 是否完全替换配置 |

#### 使用示例
```typescript title="更新配置"
this.Import1.setConfig({
  fieldIdList: ["custName", "phone", "email", "address"]
});
```

### runCode
执行自定义代码片段。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| code | string | 是 | 要执行的代码字符串 |

#### 使用示例
```typescript title="执行代码"
const result = this.Import1.runCode(`
  return this.config.fieldIdList.length > 0;
`);
```

### destroy
销毁组件实例，清理资源。

#### 使用示例
```typescript title="销毁组件"
this.Import1.destroy();
```

### bindApp
绑定应用实例到组件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| app | App | 是 | 应用实例 |

### bindPage
绑定页面实例到组件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| page | BasePage | 是 | 页面实例 |

### getEventKey
获取组件事件的唯一键名。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| eventName | string | 是 | 事件名称 |

#### 返回值
返回格式为 `${uuid}.${name}.${eventName}` 的字符串。

### initVariables
初始化组件变量。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| dataTypeList | Array\<BaseDataType\> | 是 | 数据类型定义列表 |

### newVariable
创建新的变量实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|---------|------|------|------|
| varConfig | DataTypeConfig | 是 | 变量配置对象 |

#### 返回值
返回创建的变量实例。

### getPermConfig
获取组件权限配置。

#### 返回值
返回权限配置对象或 `undefined`。

## 属性
### name
组件名称，用于标识组件实例。

- **类型**: `string`
- **访问**: 只读

### title
组件标题，用于显示。

- **类型**: `string`
- **访问**: 只读

### config
组件配置对象，包含所有配置参数。

- **类型**: `ImportCompConfig & { requireElements: requireElement[] }`
- **访问**: 读写

### type
组件类型标识。

- **类型**: `string`
- **访问**: 只读
- **值**: `"components.Import"`

### showTitle
是否显示组件标题。

- **类型**: `boolean`
- **访问**: 读写

### app
当前应用实例。

- **类型**: `App`
- **访问**: 只读

### page
当前页面实例。

- **类型**: `BasePage`
- **访问**: 只读

### ModelClass
关联的数据模型类。

- **类型**: `ModelClass`
- **访问**: 只读

### fieldDefineList
模型字段定义列表。

- **类型**: `Array<DataTypeConfig>`
- **访问**: 只读

### allFieldDict
所有字段定义字典。

- **类型**: `Record<string, any>`
- **访问**: 只读

### primaryKey
主键字段名。

- **类型**: `string`
- **访问**: 只读

### fullName
组件完整名称标识。

- **类型**: `string`
- **访问**: 只读

### dataTypeList
组件变量的数据类型定义列表。

- **类型**: `Array<BaseDataType>`
- **访问**: 只读

### compType
组件类型枚举值。

- **类型**: `COMPONENT_TYPE`
- **访问**: 只读

## 事件
### clickFinishBtn
导入提示按钮点击后触发的事件。

**使用示例**：

```typescript title="处理完成按钮事件"
this.Import1.subscribeEvent('clickFinishBtn', () => {
  console.log('用户点击了完成按钮');
});
```

### 动态按钮事件
根据 `footerBtnList` 配置动态生成的按钮点击事件，事件名为 `click${btnId}`（驼峰命名）。

**使用示例**：

```typescript title="处理动态按钮事件"
// 假设配置了ID为'export'的按钮
this.Import1.subscribeEvent('clickExport', (data) => {
  console.log('导出按钮被点击', data.rowDataList);
});
``` 