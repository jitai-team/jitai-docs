---
slug: row-to-column
---
# 行转列
行转列是数据结构转换组件，基于数据透视原理实现行列互换功能。它负责动态转置数据结构、重组数据格式和提供数据预览，适用于数据格式转换和报表生成场景。

行转列元素分层结构为Meta（components.Meta） → Type（components.Transpose） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建行转列实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.TransposeType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
pages/
└── MyTransposePage/
    ├── e.json
    ├── page.ts
    └── scheme.json  # 页面布局配置
```

```json title="scheme.json - 最简配置"
{
  "fullName": "components.Transpose",
  "type": "components.Transpose", 
  "name": "Transpose1",
  "title": "行转列1",
  "config": {
    "requireElements": [
      {
        "name": "models.CustomerModel"
      }
    ],
    "groupByFieldId": "gender", 
    "showFieldId": "amount"
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| requireElements | requireElement[] | 数据模型配置 | - | 是 |
| fixedFieldIdList | string[] | 固定列字段ID列表 | `[]` | 否 |
| groupByFieldId | string | 维度列字段ID，用于分组转置 | - | 是 |
| showFieldId | string | 显示值字段ID | - | 是 |
| fieldConfig | Record&lt;string, TransposeTableFieldConfig&gt; | 字段配置对象 | `{}` | 否 |
| autoLoad | boolean | 是否自动加载数据 | true | 否 |
| allowEdit | boolean | 是否允许编辑 | false | 否 |
| allowExport | boolean | 是否允许导出 | false | 否 |
| leftBtnList | TransposeButtonProps[] | 左侧按钮列表 | `[]` | 否 |
| rightBtnList | TransposeButtonProps[] | 右侧按钮列表 | `[]` | 否 |
| menuBtnList | TransposeButtonProps[] | 菜单按钮列表 | `[]` | 否 |
| platform | "PC" &#124; "MOBILE" | runtime-platform | "PC" | 否 |

## 变量
### displayRowList
显示的多行数据变量，类型为RowList，只读。包含经过行转列处理后的数据结果。

### operateRowList
操作的多行数据变量，类型为RowList，只读。包含用户操作的数据行记录。

### activeRow
操作的单行数据变量，类型为RowData，只读。表示当前选中或操作的单行数据。

### filter
筛选条件变量，类型为QFilter。用于设置数据查询的筛选条件。

## 方法 
### call
刷新组件数据，根据筛选条件重新加载数据。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| qFilter | QFilter | 筛选条件 | - | 否 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="调用刷新方法"
const transposeComp = app.getElement('components.Transpose1');
await transposeComp.call();
```

### updateConfig
更新组件配置，动态修改组件的配置属性。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| compConfig | TransposeTableCompConfig | 新的组件配置 | - | 是 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="更新组件配置"
const transposeComp = app.getElement('components.Transpose1');
await transposeComp.updateConfig({
  ...transposeComp.config,
  allowEdit: true
});
```

### run
运行组件，初始化并渲染组件到指定的DOM容器。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| domRef | React.RefObject&lt;HTMLDivElement&gt; | DOM容器引用 | - | 是 |

#### 返回值
Promise&lt;void&gt;

### checkConfig
检查配置完整性，验证必要的配置项是否已设置。

#### 返回值
boolean - 配置是否有效

### setConfig
设置组件配置，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | Partial&lt;TransposeTableCompConfig&gt; | 新配置 | - | 是 |
| clean | boolean | 是否清空现有配置 | false | 否 |

### publishEvent
发送事件消息，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | Record&lt;string, any&gt; | 额外参数 | - | 否 |

#### 返回值
Promise&lt;void&gt;

### subscribeEvent
订阅事件消息，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
string - 订阅句柄ID

### unSubscribeEvent
取消事件订阅，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 订阅句柄ID | - | 是 |

#### 返回值
boolean - 是否取消成功

### destroy
销毁组件，清理资源，继承自BaseComponent。

### runCode
执行代码字符串，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
any - 代码执行结果

### getPermConfig
获取权限配置，继承自BaseComponent。

#### 返回值
Record&lt;string, any&gt; &#124; undefined - 权限配置对象

## 属性
### name
组件名称，类型为string。

### title
组件标题，类型为string。

### config
组件配置对象，类型为TransposeTableCompConfig。

### showTitle
是否显示标题，类型为boolean。

### app
关联的应用实例，类型为App。

### page
关联的页面实例，类型为BasePage。

### ModelClass
关联的数据模型类，类型为typeof Jit.BaseModel。

### primaryKey
主键字段名，类型为string，默认为"id"。

### fullName
组件的完整名称，类型为string。

### compType
组件类型，类型为COMPONENT_TYPE。

### type
组件的类型标识，类型为string。

## 事件
### afterRowClick
值点击后事件，当用户点击数据值时触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowData | 点击的行数据 | - | 是 |

#### 使用示例
```tsx title="监听值点击事件"
const transposeComp = app.getElement('components.Transpose1');
transposeComp.subscribeEvent('afterRowClick', (data) => {
  console.log('点击的行数据:', data.activeRow);
});
```

### afterAddRow
新增数据后事件，当新增数据成功后触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowList | 操作的数据列表 | - | 是 |

### afterDeleteRow
删除行后事件，当删除数据成功后触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowList | 操作的数据列表 | - | 是 |

### afterRowChange
值变更后事件，当数据值变更后触发（仅PC端）。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowData | 变更的行数据 | - | 是 |

### afterEditRow
编辑行后事件，当编辑行数据后触发（仅移动端）。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | RowList | 操作的数据列表 | - | 是 |

#### 使用示例
```tsx title="监听数据变更事件"
const transposeComp = app.getElement('components.Transpose1');
transposeComp.subscribeEvent('afterRowChange', (data) => {
  console.log('数据变更:', data.activeRow);
});
```

## 高级特性
### 字段配置
通过fieldConfig属性可以精细控制每个字段的显示和行为：

```tsx title="字段配置示例"
{
  "fieldConfig": {
    "custName": {
      "alias": "客户名称",
      "position": "center"
    }
  }
}
```

### 动态按钮配置
支持在左侧、右侧和菜单区域配置自定义按钮：

```tsx title="按钮配置示例"
{
  "rightBtnList": [
    {
      "name": "导出",
      "outputId": "exportBtn"
    }
  ]
}
```

### 移动端适配
组件支持PC和移动端双平台，通过platform配置切换：

```tsx title="移动端配置"
{
  "platform": "MOBILE"
}
``` 