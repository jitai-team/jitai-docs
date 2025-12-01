---
slug: table
description: "表格 API 参考文档。完整的规格说明、方法和示例。"
---
# 表格
表格是数据展示组件，基于模型数据源实现分页查询、排序、筛选等功能。它负责数据列表的展示、行级操作、批量操作和统计汇总，支持行内编辑、字段点击事件、工具栏按钮和移动端自适应显示。

表格元素分层结构为Meta（components.Meta） → Type（components.Table） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建表格实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的components.TableType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```json title="基础表格配置"
{
  "fullName": "components.Table",
  "type": "components.Table", 
  "name": "Table1",
  "title": "客户表格",
  "config": {
    "requireElements": [
      {
        "title": "表格数据模型",
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "fieldIdList": [
      "id",
      "custName", 
      "gender",
      "phone",
      "birthday",
      "address"
    ],
    "defaultRender": true,
    "level": 2,
    "pageSize": 20
  },
  "showTitle": true
}
```

### 配置属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| requireElements | requireElement[] | 是 | [] | 数据源模型配置 |
| fieldIdList | string[] | 否 | [] | 显示字段列表 |
| defaultRender | boolean | 否 | true | 首次加载刷新 |
| level | number | 否 | 2 | 关联数据层级 |
| pageSize | number | 否 | 20 | 每页显示条数 |
| disableSelect | boolean | 否 | false | 禁用行选择 |
| disableSort | boolean | 否 | false | 禁用排序功能 |
| showSerialNum | boolean | 否 | false | 显示序号列 |
| alias | [string, string][] | 否 | [] | 字段别名配置 |
| editableColumns | string[] | 否 | [] | 可编辑字段 |
| clickField | string[] | 否 | [] | 可点击字段 |
| frozenColumns | string[] | 否 | [] | 冻结字段 |
| textWrapColumns | string[] | 否 | [] | 换行显示字段 |
| columnWidth | Record\<string, any\> | 否 | {} | 列宽设置 |
| toolbarLeft | ButtonProps[] | 否 | [] | 左侧工具栏按钮 |
| toolbarRight | ButtonProps[] | 否 | [] | 右侧工具栏按钮 |
| actionBtn | ButtonProps[] | 否 | [] | 操作列按钮 |
| fieldStatisticList | fieldStatisticItemType[] | 否 | [] | 统计行配置 |
| displayGroupBy | boolean | 否 | false | 启用分组显示 |
| fieldGroupList | FieldDisplayConfig[] | 否 | [] | 分组配置 |
| speedMode | boolean | 否 | false | 极速模式 |
| noDataText | string | 否 | '' | 无数据提示文本 |
| customFieldEditor | CustomFieldSlots | 否 | {} | 自定义字段编辑器 |
| customFieldRender | CustomFieldSlots | 否 | {} | 自定义字段渲染器 |

## 变量
### displayRowList
- **类型**: RowList\<T\>
- **只读**: 是
- **说明**: 当前页显示的数据列表，包含分页查询后的所有行数据

### selectedRowList
- **类型**: RowList\<T\>
- **只读**: 是
- **说明**: 用户选中的多行数据列表，支持跨页选择

### activeRow
- **类型**: RowData\<T\>
- **只读**: 是  
- **说明**: 当前操作的单行数据，在行点击、字段编辑、按钮点击时更新

### filter
- **类型**: QFilter
- **只读**: 是
- **说明**: 当前生效的筛选条件，包含组件筛选和权限筛选的组合条件

### loading
- **类型**: Numeric
- **只读**: 否
- **说明**: 数据加载状态，0表示加载完成，1表示正在加载

## 方法 
### call
异步刷新表格数据，支持传入筛选条件，会重置到第一页。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| qFilter | QFilter | 否 | 筛选条件，会与现有筛选条件合并 |

#### 使用示例
```typescript title="刷新表格数据"
// 无条件刷新
await table.call();

// 带筛选条件刷新
const filter = new Jit.datatypes.QFilter();
filter.value = "Q(status='active')";
await table.call(filter);
```

### refresh
异步刷新当前页数据，保持当前页码和筛选条件不变。

#### 使用示例
```typescript title="刷新当前页"
await table.refresh();
```

### prevPage
异步翻到上一页，如果已是第一页则提示用户。

#### 使用示例
```typescript title="上一页"
await table.prevPage();
```

### nextPage
异步翻到下一页，如果已是最后一页则提示用户。

#### 使用示例
```typescript title="下一页"
await table.nextPage();
```

### goPage
异步跳转到指定页码，会验证页码有效性。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pageNumber | number | 是 | 目标页码，从1开始 |

#### 使用示例
```typescript title="跳转页面"
// 跳转到第3页
await table.goPage(3);
```

### updatePage
更新页码和页面大小，触发数据刷新。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pageNumber | number | 是 | 页码 |
| pageSize | number | 是 | 每页条数 |

### updateConfig
更新组件配置，合并新配置并触发刷新。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| config | ComponentConfig | 是 | 新的配置对象 |

### publishEvent
发布组件事件，通知订阅者。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 事件名称 |
| ex | Record\<string, any\> | 否 | 额外参数 |

### subscribeEvent
订阅组件事件，设置事件处理函数。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 事件名称 |
| evtCb | (data: any) => Promise\<void\> \| void | 是 | 回调函数 |
| unSubscribeExist | boolean | 否 | 是否取消已有订阅 |

#### 返回值
- **类型**: string
- **说明**: 订阅处理器ID，用于取消订阅

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 订阅处理器ID |

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| next | Partial\<T & \{requireElements: requireElement[]\}\> | 是 | 新配置 |
| clean | boolean | 否 | 是否完全替换 |

### getEventKey
获取事件完整标识。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| eventName | string | 是 | 事件名称 |

#### 返回值
- **类型**: string
- **说明**: 事件完整标识

### runCode
执行代码字符串。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | string | 是 | 要执行的代码 |

### getPermConfig
获取权限配置。

#### 返回值
- **类型**: Record\<string, any\> | undefined
- **说明**: 当前组件的权限配置

### destroy
销毁组件，清理所有资源和事件监听。

### bindApp
绑定应用实例到组件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| app | App | 是 | 应用实例 |

### bindPage
绑定页面实例到组件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | BasePage | 是 | 页面实例 |

## 属性
### name
- **类型**: string
- **只读**: 是
- **说明**: 组件实例名称

### title
- **类型**: string
- **只读**: 是
- **说明**: 组件显示标题

### config
- **类型**: TableCompConfig & \{requireElements: requireElement[]\}
- **只读**: 否
- **说明**: 组件配置对象

### compType
- **类型**: COMPONENT_TYPE
- **只读**: 是
- **说明**: 组件类型标识

### showTitle
- **类型**: boolean
- **只读**: 是
- **说明**: 是否显示组件标题

### type
- **类型**: string
- **只读**: 是
- **说明**: 组件类型完整路径

### pageNumber
- **类型**: number
- **只读**: 否
- **说明**: 当前页码，从1开始

### pageSize
- **类型**: number
- **只读**: 否
- **说明**: 每页显示条数

### sort
- **类型**: string[]
- **只读**: 否
- **说明**: 排序规则数组

### rowDataList
- **类型**: (typeof Jit.BaseModel)[]
- **只读**: 否
- **说明**: 当前页原始数据列表

### count
- **类型**: number
- **只读**: 否
- **说明**: 数据总条数

### fieldDefineList
- **类型**: DataTypeConfig[]
- **只读**: 否
- **说明**: 字段定义列表

### fieldDefineDict
- **类型**: Record\<string, DataTypeConfig\>
- **只读**: 否
- **说明**: 字段定义字典

### primaryKey
- **类型**: string
- **只读**: 否
- **说明**: 主键字段名

### ModelClass
- **类型**: typeof Jit.BaseModel
- **只读**: 否
- **说明**: 数据源模型类

### level
- **类型**: number
- **只读**: 否
- **说明**: 关联数据查询层级

### statisticData
- **类型**: Record\<string, any\>[]
- **只读**: 否
- **说明**: 统计行数据

### staticList
- **类型**: fieldStatisticItemType[]
- **只读**: 否
- **说明**: 统计字段配置列表

### filterValue
- **类型**: string
- **只读**: 是
- **说明**: 生效的筛选条件字符串

### app
- **类型**: App
- **只读**: 是
- **说明**: 关联的应用实例

### page
- **类型**: BasePage
- **只读**: 是
- **说明**: 关联的页面实例

### fullName
- **类型**: string
- **只读**: 是
- **说明**: 组件完整标识名称

### dataTypeList
- **类型**: BaseDataType[]
- **只读**: 是
- **说明**: 组件变量定义列表

## 事件
### clickRow
行点击事件，用户点击表格行时触发。

**数据**: activeRow - 点击的行数据

```typescript title="行点击事件处理"
table.subscribeEvent('clickRow', async (data) => {
  console.log('点击的行数据:', data.activeRow);
});
```

### selectedChange
选中状态变更事件，用户选择或取消选择行时触发。

**数据**: selectedRowList - 当前选中的所有行数据

```typescript title="选中变更事件处理"
table.subscribeEvent('selectedChange', async (data) => {
  console.log('选中的行数据:', data.selectedRowList);
});
```

### refresh
刷新事件，数据重新加载时触发。

```typescript title="刷新事件处理"
table.subscribeEvent('refresh', async () => {
  console.log('表格数据已刷新');
});
```

### 动态按钮事件
根据配置的toolbarLeft、toolbarRight、actionBtn自动生成的点击事件。

**命名规则**: `click + 按钮ID（驼峰格式）`

```typescript title="按钮事件处理"
// 假设按钮ID为 "add-user"
table.subscribeEvent('clickAddUser', async (data) => {
  console.log('添加用户按钮点击', data.activeRow);
});
```

### 字段值变更事件
可编辑字段值改变后触发的事件。

**命名规则**: `after + 字段名 + change（驼峰格式）`

```typescript title="字段变更事件处理"
// name字段值变更事件
table.subscribeEvent('afterNameChange', async (data) => {
  console.log('姓名字段已变更:', data.activeRow);
});

// 任意字段变更事件
table.subscribeEvent('afterRowChange', async (data) => {
  console.log('行数据已变更:', data.activeRow);
});
```

### 字段点击事件
可点击字段的点击事件。

**命名规则**: `click + 字段名（驼峰格式）`

```typescript title="字段点击事件处理"
// phone字段点击事件
table.subscribeEvent('clickPhone', async (data) => {
  console.log('电话字段点击:', data.activeRow);
});
``` 