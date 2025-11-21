---
slug: parse-excel
description: "解析Excel API 参考文档。完整的规格说明、方法和示例。"
---
# 解析Excel
解析Excel是用于解析.xlsx格式文件并将数据导入到指定数据模型的组件，基于Steps步骤条和表格展示实现Excel数据的上传、解析和导入功能。它负责文件上传验证、数据格式转换和批量数据导入，支持字段别名映射、数据预览和自定义按钮操作。

解析Excel元素分层结构为Meta（components.Meta） → Type（components.ParseData） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建解析Excel实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的components.ParseDataType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```json title="基础配置"
{
  "requireElements": [
    {
      "name": "models.CustomerModel",
      "type": "models.Meta",
      "title": "客户模型"
    }
  ],
  "fieldIdList": ["custName", "phone", "birthday"],
  "fieldAliasList": [
    {
      "fieldId": "custName",
      "aliasName": "客户姓名"
    },
    {
      "fieldId": "phone", 
      "aliasName": "联系电话"
    }
  ],
  "footerBtnList": [
    {
      "id": "import",
      "name": "导入数据",
      "type": "primary"
    }
  ]
}
```

### 配置属性说明
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| requireElements | array | 是 | 关联的数据模型配置 |
| fieldIdList | string[] | 否 | 导入的表头字段列表 |
| fieldAliasList | object[] | 否 | 字段别名映射配置 |
| footerBtnList | object[] | 否 | 自定义操作按钮列表 |
| replaceFiled | string[] | 否 | 选中的替换字段数组 |

**requireElements配置项：**
- name: 数据模型的fullName
- type: 固定为"models.Meta"  
- title: 模型显示名称

**fieldAliasList配置项：**
- fieldId: 模型字段ID
- aliasName: 字段别名显示名称

**footerBtnList配置项：**
- id: 按钮唯一标识
- name: 按钮显示文本
- type: 按钮类型(primary/default等)

## 变量
### rowDataList
解析后的多行数据，类型为RowList，包含从Excel文件中解析出的所有数据记录。

- **类型**: RowList\<T\>
- **泛型**: 关联的数据模型类型
- **只读**: 是
- **说明**: 存储Excel解析后的数据，可用于后续的数据处理和导入操作

## 方法 
### publishEvent
发布组件事件。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 事件名称 |
| ex | object | 否 | 额外的事件数据 |

#### 使用示例
```typescript title="发布自定义事件"
await parseDataComponent.publishEvent('afterParse', {
  rowDataList: processedData
});
```

### subscribeEvent
订阅组件事件。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 事件名称 |
| evtCb | function | 是 | 事件回调函数 |
| unSubscribeExist | boolean | 否 | 是否取消已存在的订阅，默认true |

#### 返回值
string - 事件处理器ID，用于取消订阅

#### 使用示例
```typescript title="订阅事件"
const handlerId = parseDataComponent.subscribeEvent('afterParse', (data) => {
  console.log('接收到解析数据:', data.rowDataList);
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 事件处理器ID |

#### 使用示例
```typescript title="取消事件订阅"
parseDataComponent.unSubscribeEvent(handlerId);
```

### setConfig
设置组件配置。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| next | object | 是 | 新的配置对象 |
| clean | boolean | 否 | 是否完全替换配置，默认false |

#### 使用示例
```typescript title="更新组件配置"
parseDataComponent.setConfig({
  fieldIdList: ['newField1', 'newField2']
});
```

### destroy
销毁组件实例，清理所有事件监听器和变量。

#### 使用示例
```typescript title="销毁组件"
parseDataComponent.destroy();
```

### runCode
执行动态代码字符串。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 要执行的代码字符串 |

#### 返回值
any - 代码执行结果

#### 使用示例
```typescript title="执行动态代码"
const result = parseDataComponent.runCode('this.rowDataList.length');
```

### getPermConfig
获取组件的权限配置。

#### 返回值
object | undefined - 权限配置对象，如果无权限限制则返回undefined

#### 使用示例
```typescript title="获取权限配置"
const permConfig = parseDataComponent.getPermConfig();
if (permConfig) {
  console.log('组件权限配置:', permConfig);
}
```

## 属性
### name
组件实例名称，类型为string。

### title
组件显示标题，类型为string。

### config
组件配置对象，类型为object，包含所有组件配置信息。

### showTitle
是否显示标题，类型为boolean。

### type
组件类型标识，类型为string。

### fullName
组件的完整名称，类型为string。

### compType
组件类型枚举值，类型为string。

### dataTypeList
组件变量定义列表，类型为array。

### app
应用实例（getter属性），类型为App。

### page
页面实例（getter属性），类型为BasePage。

### ModelClass
关联的数据模型类，类型为class。

### fieldDefineList
字段定义列表，类型为array。

### allFieldDict
所有字段字典，类型为object。

### primaryKey
主键字段名，类型为string。

## 事件
### afterParse
解析完成后触发的事件。

#### 参数详解
| 参数 | 类型 | 说明 |
|------|------|------|
| data | object | 事件数据对象 |
| data.rowDataList | RowList | 解析后的多行数据 |

#### 使用示例
```typescript title="监听解析完成事件"
parseDataComponent.subscribeEvent('afterParse', (data) => {
  console.log('解析完成，数据行数:', data.rowDataList.length);
  // 处理解析后的数据
  processParseData(data.rowDataList);
});
```

### 动态按钮事件
根据footerBtnList配置自动生成的按钮点击事件，事件名为`click + 按钮ID`的驼峰命名。

#### 参数详解
| 参数 | 类型 | 说明 |
|------|------|------|
| data | object | 事件数据对象 |
| data.rowDataList | RowList | 当前解析的多行数据 |

#### 使用示例
```typescript title="监听自定义按钮事件"
// 配置了id为"import"的按钮，事件名为"clickImport"
parseDataComponent.subscribeEvent('clickImport', (data) => {
  console.log('导入按钮点击，准备导入数据');
  // 执行数据导入逻辑
  importData(data.rowDataList);
});
```

## 使用限制
### 文件格式要求
- 仅支持.xlsx格式的Excel文件
- 文件大小不超过5MB
- 不支持包含合并单元格的文件
- 不支持竖向表头格式

### 数据类型限制
- 一次性解析数据不可超过500条
- 不支持解析子表、流水号、附件、图片、超链接、地址、手写签名、定位类型字段
- 系统会自动截取超出限制的数据

### 字段映射规则
- fieldIdList中只保留在关联模型中存在的字段
- fieldAliasList中只保留在关联模型中存在的字段映射
- 解析时会根据字段别名进行数据映射 