---
slug: model-filter
description: "模型筛选器 API 参考文档。完整的规格说明、方法和示例。"
---
# 模型筛选器
模型筛选器是用于对指定模型数据进行筛选操作的交互组件，基于React和TypeScript实现数据查询条件的可视化配置能力。它负责构建查询条件、管理筛选状态和触发查询事件，支持简单模式、复杂模式和自由模式三种筛选方式，提供列表和标签两种展示样式。

模型筛选器元素分层结构为Meta（components.Meta）→ Type（components.Filter）→ 实例，开发者可通过JitAI的可视化开发工具快捷地创建模型筛选器实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.FilterType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```typescript title="基本使用示例"
{
  "name": "Filter1",
  "title": "用户筛选器",
  "type": "components.Filter", 
  "config": {
    "requireElements": [
      {
        "name": "models.UserModel",
        "type": "models.Meta",
        "title": "用户模型",
        "filter": "",
        "orderBy": []
      }
    ],
    "mode": "simple",
    "firstTimeQuery": true,
    "layoutPercent": 1,
    "styleMode": "list",
    "typeMode": "horizontal",
    "config": {
      "gender": {
        "layout": {
          "w": 60, "h": 1, "x": 0, "y": 0,
          "i": "gender", "minW": 12, "minH": 1
        },
        "config": {
          "fieldId": "gender",
          "showTitle": true,
          "multiple": false,
          "isAll": false,
          "isShowAlias": false,
          "group": [
            {
              "id": "filter-group-1",
              "type": "normal",
              "name": "男",
              "operator": "isEqual",
              "filter": [
                {
                  "uid": "item-1",
                  "fieldId": "gender",
                  "operator": "isEqual",
                  "value": "male",
                  "valueType": "constant",
                  "type": "ITEM"
                }
              ]
            }
          ],
          "isCustom": true,
          "rowNum": 1,
          "isShowMore": false
        }
      }
    }
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| requireElements | requireElement[] | 是 | - | 关联的模型元素配置 |
| mode | FilterModeEnum | 否 | 'simple' | 筛选模式：simple/complex/free |
| firstTimeQuery | boolean | 否 | true | 是否首次加载时查询 |
| layoutPercent | number | 否 | 1 | 布局百分比 |
| styleMode | SimpleFilterStyleEnum | 否 | 'list' | 简单模式样式：list/tag |
| typeMode | SimpleFilterTypeEnum | 否 | 'horizontal' | 简单模式类型：horizontal/vertical |
| config | Record&lt;string, IFilterSimpleConfigNode&gt; | 否 | \{\} | 字段筛选配置 |
| isShowAllField | boolean | 否 | false | 是否显示所有字段 |

#### requireElement 配置
| 属性名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 模型元素fullName |
| type | string | 是 | 固定值 'models.Meta' |
| title | string | 是 | 模型显示名称 |
| filter | string | 否 | 预设筛选条件 |
| orderBy | string[] | 否 | 排序规则 |

#### 字段筛选配置 (IFilterSimpleConfigNodeConfig)
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| fieldId | string | 是 | - | 字段ID |
| showTitle | boolean | 否 | true | 是否显示字段标题 |
| multiple | boolean | 否 | false | 是否多选 |
| isAll | boolean | 否 | false | 是否包含全部选项 |
| isShowAlias | boolean | 否 | false | 是否显示字段别名 |
| alias | string | 否 | - | 字段别名 |
| group | IFilterSimpleConfigGroupItem[] | 否 | [] | 筛选分组配置 |
| defaultSelectedGroup | string[] | 否 | [] | 默认选中分组 |
| hasDefaultSelect | boolean | 否 | false | 是否有默认选择 |
| isCustom | boolean | 否 | true | 是否支持自定义筛选 |
| customFilterOperateType | string | 否 | - | 自定义筛选操作类型 |
| customFilterInfo | IFilterCompItem[] | 否 | [] | 自定义筛选信息 |
| placeholder | string | 否 | - | 占位符文本 |
| rowNum | number | 否 | 1 | 显示行数 |
| isShowMore | boolean | 否 | false | 是否显示更多选项 |
| isFuzzyQuery | boolean | 否 | false | 是否支持模糊查询 |

## 变量
### filter
筛选条件变量，存储当前组件的所有筛选条件。

| 属性 | 类型 | 说明 |
|------|------|------|
| 名称 | filter | 变量名 |
| 类型 | QFilter | 查询筛选条件类型 |
| 泛型 | 关联模型 | 指向requireElements中指定的模型 |
| 只读 | true | 变量为只读，由组件内部维护 |

**使用示例**：
```typescript title="获取筛选条件"
// 获取当前筛选条件
const currentFilter = this.filter.value;

// 在其他组件中引用筛选条件
{
  "dataSource": {
    "filter": "{{Filter1.filter}}"
  }
}
```

## 方法 
### reset
重置筛选器所有筛选条件为初始状态。

```typescript title="重置筛选器"
await this.reset();
```

### runCode
执行JavaScript代码字符串，代码在页面上下文中运行。

**参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | string | 是 | 要执行的JavaScript代码 |

**返回值**：any - 代码执行结果

```typescript title="执行动态代码"
// 获取筛选条件
const filterValue = this.runCode('this.filter.value');

// 执行复杂逻辑
const result = this.runCode(`
  const condition = this.filter.value;
  return condition ? '有筛选条件' : '无筛选条件';
`);
```

### setConfig
更新组件配置。

**参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| next | Partial&lt;T&gt; | 是 | 新配置对象 |
| clean | boolean | 否 | 是否完全替换配置 |

```typescript title="动态修改配置"
this.setConfig({
  styleMode: "tag",
  typeMode: "vertical"
});
```

### publishEvent
发布组件事件。

**参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | 事件额外数据 |

```typescript title="发布自定义事件"
await this.publishEvent('customFilter', { 
  filterType: 'advanced',
  data: filterData 
});
```

### subscribeEvent
订阅组件事件。

**参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 事件名称 |
| evtCb | Function | 是 | 事件回调函数 |
| unSubscribeExist | boolean | 否 | 是否取消已存在订阅 |

**返回值**：string - 事件处理器ID

```typescript title="订阅筛选事件"
const handlerId = this.subscribeEvent('afterFilter', async (data) => {
  console.log('筛选条件:', data.filter.value);
});
```

### unSubscribeEvent
取消事件订阅。

**参数**：
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 事件处理器ID |

### destroy
销毁组件实例，清理所有资源和事件订阅。

### getPermConfig
获取组件权限配置。

**返回值**：Record&lt;string, any&gt; | undefined - 权限配置对象

## 事件
### afterFilter
查询后事件，在筛选条件发生变化并完成查询后触发。

| 属性 | 类型 | 说明 |
|------|------|------|
| 事件名称 | afterFilter | 固定事件名 |
| 数据参数 | filter | 当前筛选条件 |
| 触发时机 | 筛选条件变化并查询完成后 |

```typescript title="事件处理示例"
// 订阅筛选后事件
this.subscribeEvent('afterFilter', async (data) => {
  console.log('筛选条件:', data.filter.value);
  // 更新其他组件数据
  await this.Table1.refresh();
});
```

## 属性
### name
组件实例名称。

- **类型**：string

### title
组件显示标题。

- **类型**：string

### type
组件类型标识。

- **类型**：string

### showTitle
是否显示标题。

- **类型**：boolean

### config
组件配置对象。

- **类型**：T

### app
应用实例引用。

- **类型**：App

### page
页面实例引用。

- **类型**：BasePage

## 高级特性
### 多模式支持
```typescript title="复杂模式配置"
{
  "mode": "complex",
  "layoutPercent": 1,
  "config": {
    "fieldId": {
      "layout": { /* 布局配置 */ },
      "config": {
        "fieldId": "userName",
        "isShowAlias": true,
        "alias": "用户名称"
      }
    }
  }
}
```

### 自定义筛选条件
```typescript title="自定义筛选配置"
{
  "customFilterInfo": [
    {
      "uid": "custom-1",
      "fieldId": "age",
      "operator": "gt",
      "value": 18,
      "valueType": "constant",
      "type": "ITEM"
    }
  ]
}
```

### 动态字段生成
当设置`isShowAllField: true`时，组件会自动根据关联模型的字段定义生成筛选配置，排除不支持筛选的字段类型（图片、富文本、定位、附件、子表）。