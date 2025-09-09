---
slug: cross-table
---
# 交叉表
交叉表是专门用于数据透视和交叉分析的表格组件，基于 AntV S2 实现多维数据的行列交叉展示。它负责数据的多维度分组、聚合计算和交叉分析，支持动态维度配置、数据钻取和复杂的数据可视化需求，是商业智能和数据分析场景的核心组件。

交叉表元素分层结构为Meta（`components.Meta`）→ Type（`components.CrossTable`）→ 实例，开发者可通过JitAI的可视化开发工具快捷地创建交叉表实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.CrossTableType元素，以实现自己的封装。

## 快速开始
### 基础配置示例
```text title="推荐目录结构"
MyApp/
├── models/
│   └── SalesModel/
│       ├── model.py
│       ├── e.json
│       └── __init__.py
└── pages/
    └── DataAnalysisPage/
        ├── page.tsx
        ├── e.json
        └── scheme.json
```

```json title="scheme.json - 交叉表配置"
{
  "components": [
    {
      "fullName": "components.CrossTable",
      "type": "components.CrossTable", 
      "name": "CrossTable1",
      "title": "销售数据交叉表",
      "config": {
        "requireElements": [
          {
            "title": "销售数据模型",
            "type": "models.Meta",
            "name": "models.SalesModel",
            "filter": "",
            "orderBy": ""
          }
        ],
        "fieldsList": [
          [
            {
              "type": "dimension",
              "name": "region",
              "alias": "地区",
              "fullName": "t1.region",
              "dataType": "Stext",
              "orderType": "",
              "axisType": "row"
            }
          ],
          [
            {
              "type": "dimension", 
              "name": "product",
              "alias": "产品",
              "fullName": "t1.product",
              "dataType": "Stext",
              "orderType": "",
              "axisType": "col"
            }
          ],
          [
            {
              "type": "measure",
              "name": "amount",
              "alias": "销售额",
              "fullName": "t1.amount",
              "dataType": "Money",
              "ormType": "SUM",
              "axisType": "value"
            }
          ]
        ],
        "sheetType": "pivot",
        "hierarchyType": "grid",
        "showZebraStripe": true
      }
    }
  ]
}
```

```tsx title="page.tsx - 页面使用"
export default function DataAnalysisPage() {
  const crossTable = app.getElement('CrossTable1');
  
  // 刷新数据
  const handleRefresh = () => {
    crossTable.call();
  };
  
  return (
    &lt;div&gt;
      &lt;h2&gt;数据分析页面&lt;/h2&gt;
      &lt;button onClick={handleRefresh}&gt;刷新数据&lt;/button&gt;
      &lt;{crossTable.name} /&gt;
    &lt;/div&gt;
  );
}
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| requireElements | requireElement[] | 依赖的数据模型配置 | - | 是 |
| fieldsList | CommonFieldSelectorItem[][] | 字段配置列表，分别对应行维度、列维度、数值字段 | - | 是 |
| sheetType | &#124; 'pivot' &#124; 'table' | 表格类型，pivot为透视表 | 'pivot' | 否 |
| hierarchyType | 'grid' &#124; 'tree' | 层级显示类型 | 'grid' | 否 |
| showZebraStripe | boolean | 是否显示斑马纹 | false | 否 |
| hierarchyCollapse | boolean | 是否支持层级折叠 | false | 否 |
| canExport | boolean | 是否支持导出 | false | 否 |
| canRefresh | boolean | 是否支持刷新 | false | 否 |
| themeCfg | ThemeCfg | 主题配置 | - | 否 |

## 变量
### dimensionFilter
只读变量，类型为 `datatypes.QFilter`，表示维度筛选条件。

**属性**：
- `value`: 筛选条件值
- 支持 Q 表达式语法构建复杂筛选条件

### detailFilter
只读变量，类型为 `datatypes.QFilter`，表示明细筛选条件。

**属性**：
- `value`: 筛选条件值  
- 用于过滤明细数据

### loading
数值类型变量，表示加载状态。

**属性**：
- `value`: 0表示未加载，1表示加载中

## 方法
### call
刷新交叉表数据。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| qFilter | Qex | 筛选条件对象 | - | 否 |

#### 返回值
无返回值

#### 使用示例
```tsx title="刷新数据示例"
const crossTable = app.getElement('CrossTable1');

// 无条件刷新
crossTable.call();

// 带筛选条件刷新
const filter = Q("region='华南'");
crossTable.call(filter);
```

### getDataList
获取表格数据列表。

#### 参数详解
无参数

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="获取数据示例"
const crossTable = app.getElement('CrossTable1');

// 获取数据
await crossTable.getDataList();
console.log(crossTable.rowDataList);
```

### checkConfig
检查配置是否有效。

#### 参数详解
无参数

#### 返回值
boolean - 配置是否有效

#### 使用示例
```tsx title="配置检查示例"
const crossTable = app.getElement('CrossTable1');

if (crossTable.checkConfig()) {
  console.log('配置有效');
} else {
  console.log('配置无效，请检查字段配置');
}
```

### publishEvent
发布组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | Record&lt;string, any&gt; | 事件数据 | - | 否 |

#### 返回值
Promise&lt;void&gt;

### subscribeEvent
订阅组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
string - 事件处理器ID

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | Partial&lt;CrossTableCompConfig&gt; | 新配置 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 返回值
无返回值

### unSubscribeEvent
取消订阅组件事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 事件处理器ID | - | 是 |

#### 返回值
boolean - 是否成功取消订阅

#### 使用示例
```tsx title="取消事件订阅示例"
const crossTable = app.getElement('CrossTable1');

// 订阅事件并获取处理器ID
const handlerId = crossTable.subscribeEvent('clickDetail', (data) => {
  console.log('处理点击事件');
});

// 取消订阅
crossTable.unSubscribeEvent(handlerId);
```

### destroy
销毁组件，清理所有资源和事件监听。

#### 参数详解
无参数

#### 返回值
无返回值

#### 使用示例
```tsx title="销毁组件示例"
const crossTable = app.getElement('CrossTable1');

// 组件销毁时清理资源
crossTable.destroy();
```

### runCode
运行代码字符串，在页面上下文中执行。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
any - 代码执行结果

#### 使用示例
```tsx title="运行代码示例"
const crossTable = app.getElement('CrossTable1');

// 执行代码片段
const result = crossTable.runCode('self.getElement("OtherComponent").call()');
```

### getPermConfig
获取当前组件的权限配置。

#### 参数详解
无参数

#### 返回值
Record&lt;string, any&gt; &#124; undefined - 权限配置对象

#### 使用示例
```tsx title="权限检查示例"
const crossTable = app.getElement('CrossTable1');

const permConfig = crossTable.getPermConfig();
if (permConfig?.canExport) {
  // 显示导出按钮
  showExportButton();
}
```

## 属性
### name
组件名称，类型为 `string`，只读。

### title
组件标题，类型为 `string`，只读。

### config
组件配置对象，类型为 `CrossTableCompConfig`，可读写。

### type
组件类型，值为 `"components.CrossTable"`，只读。

### fullName
组件完整名称，类型为 `string`，只读。

### rowDataList
表格数据列表，类型为 `Record<string, any>[]`，只读。

### ModelClass
关联的模型类，类型为 `typeof Jit.BaseModel`，只读。

### app
应用实例，类型为 `App`，只读。

### page
页面实例，类型为 `BasePage`，只读。

### compType
组件类型，类型为 `COMPONENT_TYPE`，只读。

### showTitle
是否显示组件标题，类型为 `boolean`，只读。

### dataTypeList
组件的数据类型配置列表，类型为 `BaseDataType[]`，只读。

## 事件
### clickDetail
点击明细数据时触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | Record&lt;string, any&gt; | 点击的数据行 | - | - |

#### 使用示例
```tsx title="监听明细点击事件"
const crossTable = app.getElement('CrossTable1');

crossTable.subscribeEvent('clickDetail', (data) => {
  console.log('点击明细数据：', data);
  // 跳转到详情页面或显示详情弹窗
  app.getElement('DetailModal').show(data);
});
```

### clickDimension
点击维度值时触发。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| data | Record&lt;string, any&gt; | 点击的维度数据 | - | - |

#### 使用示例
```tsx title="监听维度点击事件"
const crossTable = app.getElement('CrossTable1');

crossTable.subscribeEvent('clickDimension', (data) => {
  console.log('点击维度：', data);
  // 执行钻取操作
  const filter = Q(`region='${data.region}'`);
  crossTable.call(filter);
});
```

## 高级特性
### 多维度数据分析
交叉表支持复杂的多维度数据透视分析，可配置多个行维度和列维度。

```json title="多维度配置示例"
{
  "fieldsList": [
    [
      {
        "type": "dimension",
        "name": "year",
        "alias": "年份",
        "axisType": "row"
      },
      {
        "type": "dimension", 
        "name": "quarter",
        "alias": "季度",
        "axisType": "row"
      }
    ],
    [
      {
        "type": "dimension",
        "name": "region", 
        "alias": "地区",
        "axisType": "col"
      },
      {
        "type": "dimension",
        "name": "product",
        "alias": "产品",
        "axisType": "col"
      }
    ],
    [
      {
        "type": "measure",
        "name": "sales",
        "alias": "销售额",
        "ormType": "SUM",
        "axisType": "value"
      },
      {
        "type": "measure", 
        "name": "profit",
        "alias": "利润",
        "ormType": "SUM",
        "axisType": "value"
      }
    ]
  ]
}
```

### 主题定制
支持丰富的主题配置选项，可自定义表格样式。

```tsx title="主题配置示例"
const crossTable = app.getElement('CrossTable1');

crossTable.setConfig({
  themeCfg: {
    theme: {
      rowCell: {
        text: {
          fontSize: 14,
          fill: '#333',
          fontWeight: 'bold'
        },
        cell: {
          backgroundColor: '#f8f9fa',
          horizontalBorderColor: '#e9ecef',
          verticalBorderColor: '#e9ecef'
        }
      },
      colCell: {
        text: {
          fontSize: 14, 
          fill: '#495057'
        },
        cell: {
          backgroundColor: '#ffffff'
        }
      },
      dataCell: {
        text: {
          fontSize: 13,
          fill: '#212529'
        }
      }
    }
  }
});
```

### 数据钻取
利用维度点击事件实现数据钻取功能。

```tsx title="数据钻取实现"
const crossTable = app.getElement('CrossTable1');
const detailTable = app.getElement('DetailTable1');

crossTable.subscribeEvent('clickDimension', async (data) => {
  // 构建钻取筛选条件
  const drillFilter = Object.entries(data)
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => `${key}='${value}'`)
    .join(' AND ');
    
  // 更新详情表格数据
  await detailTable.call(Q(drillFilter));
  
  // 显示详情面板
  app.getElement('DrilldownPanel').show();
});
```
