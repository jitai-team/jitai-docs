---
sidebar_position: 1
slug: ai-data-management-page
title: "AI Data Management Page Reference"
description: "AI Data Management Page Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "AI Data Management Page"
---

# AI Data Management Page
AI Data Management Page is a page type specifically designed for CRUD (Create, Read, Update, Delete) operations, implementing data table management capabilities based on a componentized visual configuration architecture. It is responsible for data list display, data filtering, data editing, and data import/export, quickly building data management interfaces through drag-and-drop layouts.

The AI Data Management Page element hierarchy is Meta (pages.Meta) → Type (pages.DataManagePageType) → Instance. Developers can quickly create AI data management page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.DataManagePageType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```title="AI Data Management Page Instance Directory Structure"
testDataManagementPage/          # Instance element directory
├── e.json                       # Element configuration file
├── scheme.json                  # Page layout and component configuration
├── index.ts                     # Export file
├── page.ts                      # Page logic class
├── PageRender.tsx              # React rendering component
└── page.style.ts               # Page style file (optional)
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "pages.DataManagePageType",
  "resourceName": "index",
  "title": "Test AI Data Management Page",
  "dataModel": "models.CustomerModel",
  "platform": "PC",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### Page Layout Configuration File
The core configuration of the AI Data Management Page is defined through the `scheme.json` file:

```json title="scheme.json Basic Structure"
{
  "layout": [
    {
      "i": "Filter1",
      "x": 0,
      "y": 0,
      "w": 48,
      "h": 7
    },
    {
      "i": "Table1", 
      "x": 0,
      "y": 7,
      "w": 48,
      "h": 30
    }
  ],
  "componentList": [
    {
      "name": "Table1",
      "title": "Table Component",
      "type": "components.Table",
      "config": {
        "isShowAllField": true,
        "requireElements": [
          {
            "type": "models.Meta",
            "name": "models.CustomerModel",
            "title": "Table Component",
            "filter": "",
            "orderBy": []
          }
        ],
        "fieldIdList": ["id", "name", "phone"],
        "toolbarLeft": [
          {
            "name": "Add",
            "id": "Add",
            "height": 32,
            "width": 60,
            "type": "primary"
          }
        ],
        "toolbarRight": [
          {
            "name": "Import",
            "id": "Import",
            "height": 32,
            "width": 60,
            "type": "ghost"
          }
        ],
        "actionBtn": [
          {
            "name": "Edit",
            "id": "Edit",
            "height": 32,
            "width": 60,
            "type": "link"
          }
        ]
      }
    }
  ]
}
```

#### Page Logic Code
```typescript title="page.ts Implementation Example"
import { Jit, ComponentPageScheme } from "jit";
import schemeJson from "./scheme.json";

class PageCls extends Jit.GridPage {
    Table1!: BaseComponent;
    Filter1!: BaseComponent;
    Modal1!: BaseComponent;
    Form1!: BaseComponent;
    scheme: ComponentPageScheme = schemeJson;
    
    bindEvent() {
        // Add button event
        this.Table1.subscribeEvent("clickAdd", async () => {
            this.Modal1.call("Add");
            this.Form1.formData.reset();
            this.Form1.mode.value = "add";
        });
        
        // Edit button event
        this.Table1.subscribeEvent("clickEdit", async () => {
            this.Modal1.call("Edit");
            this.Form1.mode.value = "edit";
            this.Form1.formData.value = this.Table1.activeRow.value;
        });
        
        // Delete button event
        this.Table1.subscribeEvent("clickDelete", async () => {
            const result = await this.app.modules.FeedBack.globalConfirm(
                "Are you sure you want to delete this data?"
            );
            if (result === "true") {
                await this.Table1.activeRow.delete();
                await this.Table1.call();
            }
        });
        
        // Batch delete event
        this.Table1.subscribeEvent("clickBatchDelete", async () => {
            const selectedRows = this.Table1.selectedRowList.value;
            if (selectedRows.length === 0) return;
            
            const result = await this.app.modules.FeedBack.globalConfirm(
                "Are you sure you want to delete the selected data?"
            );
            if (result === "true") {
                for (const row of selectedRows) {
                    await row.delete();
                }
                await this.Table1.call();
            }
        });
        
        // Row click event
        this.Table1.subscribeEvent("clickRow", async () => {
            this.Modal1.call("View");
            this.Form1.mode.value = "read";
            this.Form1.formData.value = this.Table1.activeRow.value;
        });
        
        // Selection state change event
        this.Table1.subscribeEvent("selectedChange", async () => {
            console.log("Selected rows:", this.Table1.selectedRowList.value.length);
        });
        
        // Filter event
        this.Filter1.subscribeEvent("afterFilter", async () => {
            await this.Table1.call(this.Filter1.filter.value);
        });
        
        // Form submit event
        this.Form1.subscribeEvent("afterSubmit", async () => {
            this.Modal1.close();
            await this.Table1.call();
        });
    }
}

export default PageCls;
```

#### Usage Example
```typescript title="index.ts Export File"
import PageCls from "./page";
import Render from "./PageRender";

export {
    PageCls,
    Render
};
```

```tsx title="PageRender.tsx Rendering Component"
import { ElementRender } from 'jit-widgets';
import { pageStyle, pageGlobalStyle } from './page.style';

export default (props) => {
    return (
        <ElementRender
            pageStyle={pageStyle}
            pageGlobalStyle={pageGlobalStyle}
            {...props}
            elementPath="pages.GridPageType"
        />
    );
};
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| type | string | Yes | - | Element type, fixed as "pages.DataManagePageType" |
| title | string | Yes | - | Page title |
| dataModel | string | No | - | Associated data model fullName for data binding |
| platform | string | No | "PC" | Platform type, supports "PC", "Mobile" |
| frontBundleEntry | string | Yes | "./index.ts" | Frontend entry file path |
| outputName | string | Yes | "index" | Output file name |
| resourceName | string | No | "index" | Resource name |

### Page Layout Configuration File Configuration
The scheme.json file defines the page layout and component configuration:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| layout | Layout[] | Yes | Component layout configuration array |
| componentList | ComponentConfig[] | Yes | Component configuration list |
| variableList | VariableConfig[] | No | Page variable configuration |
| functionList | FunctionConfig[] | No | Page function configuration |
| autoIncrementId | number | No | Auto-increment ID counter |

**Layout Configuration Items:**
- `i`: Component identifier
- `x`: X-axis position (grid units)
- `y`: Y-axis position (grid units) 
- `w`: Width (grid units)
- `h`: Height (grid units)

**Table Component Configuration Details:**

```json title="Complete Table Component Configuration"
{
  "name": "Table1",
  "type": "components.Table",
  "config": {
    "isShowAllField": true,
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "title": "Table Component",
        "filter": "",
        "orderBy": []
      }
    ],
    "fieldIdList": ["id", "name", "phone"],
    "defaultRender": true,
    "pageSize": 20,
    "toolbarLeft": [
      {
        "name": "Add",
        "id": "Add",
        "height": 32,
        "width": 60,
        "type": "primary"
      }
    ],
    "toolbarRight": [
      {
        "name": "Import",
        "id": "Import",
        "height": 32,
        "width": 60,
        "type": "ghost"
      }
    ],
    "actionBtn": [
      {
        "name": "Edit",
        "id": "Edit",
        "height": 32,
        "width": 60,
        "type": "link"
      }
    ]
  }
}
```

**Filter Component Configuration Details:**

```json title="Filter Component Configuration"
{
  "name": "Filter1",
  "type": "components.Filter",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "title": "Filter Component",
        "filter": "",
        "orderBy": ""
      }
    ],
    "mode": "simple",
    "firstTimeQuery": false,
    "layoutPercent": 4,
    "config": {
      "name": {
        "config": {
          "fieldId": "name",
          "customFilterOperateType": "cnin",
          "showTitle": true
        }
      }
    }
  }
}
```

## Methods
AI Data Management Page inherits from GridPage and has the following core methods:

### init
Page initialization method that loads configuration and components.

#### Return Value
`Promise&lt;void&gt;`

#### Usage Example
```typescript title="init Method Call"
class PageCls extends Jit.GridPage {
    async init() {
        await super.init();
        // Custom initialization logic
        console.log("Page has been initialized");
    }
}
```

### bindEvent
Event binding method used to define interaction logic between components.

#### Return Value
`void`

#### Usage Example
```typescript title="bindEvent Method Implementation"
bindEvent() {
    // Table add event
    this.Table1.subscribeEvent("clickAdd", async () => {
        this.Modal1.call("Add");
        this.Form1.formData.reset();
        this.Form1.mode.value = "add";
    });
    
    // Table edit event
    this.Table1.subscribeEvent("clickEdit", async () => {
        this.Modal1.call("Edit");
        this.Form1.mode.value = "edit";
        this.Form1.formData.value = this.Table1.activeRow.value;
    });
    
    // Row selection change event
    this.Table1.subscribeEvent("selectedChange", async () => {
        const count = this.Table1.selectedRowList.value.length;
        console.log(`Selected ${count} rows of data`);
    });
}
```

### loadComponents
Component loading method that instantiates all components in the page based on configuration.

#### Return Value
`Promise&lt;void&gt;`

#### Usage Example
```typescript title="loadComponents Method Call"
async loadComponents() {
    await super.loadComponents();
    // Custom logic after component loading is complete
    this.Table1?.bindApp(this.app);
    this.Table1?.bindPage(this);
}
```

### loadVariables
Variable loading method that creates page variables based on configuration.

#### Return Value
`void`

#### Usage Example
```typescript title="loadVariables Method Call"
loadVariables() {
    super.loadVariables();
    // Create custom variables
    this.customVar = this.newVariable({
        name: "customVar",
        dataType: "Stext",
        title: "Custom Variable"
    });
}
```

### getScheme
获取页面配置方案，支持继承和合并。

#### 返回值
`IScheme` - 页面配置对象

#### 使用示例
```typescript title="getScheme方法调用"
getScheme() {
    const scheme = super.getScheme();
    // 动态修改组件配置
    const tableConfig = scheme.componentList.find(c => c.name === 'Table1');
    if (tableConfig) {
        tableConfig.config.pageSize = 50;
    }
    return scheme;
}
```

### newVariable
创建新的变量实例。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| varConfig | DataTypeConfig | 是 | 变量配置对象 |
| value | any | 否 | 初始值 |

#### 返回值
`BaseDataType` - 数据类型实例

#### 使用示例
```typescript title="newVariable方法调用"
const stringVar = this.newVariable({
    name: "userName",
    dataType: "Stext",
    title: "用户名"
}, "默认值");

const listVar = this.newVariable({
    name: "dataList",
    dataType: "RowList", 
    generic: "models.CustomerModel"
});
```

### newComponent
创建新的组件实例。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 组件类型 |
| createCompConfig | any | 是 | 组件配置 |

#### 返回值
`Promise&lt;BaseComponent&gt;` - 组件实例

#### 使用示例
```typescript title="newComponent方法调用"
const tableComp = await this.newComponent("components.Table", {
    name: "dynamicTable",
    title: "动态表格",
    config: {
        requireElements: [{
            type: "models.Meta",
            name: "models.UserModel"
        }],
        isShowAllField: true
    }
});
```

### refresh
刷新页面，触发页面重新渲染。

#### 返回值
`void`

#### 使用示例
```typescript title="refresh方法调用"
// 数据更新后刷新页面
await this.Table1.call();
this.refresh();
```

### subscribeEvent
订阅事件。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| messageName | string &#124; symbol | 是 | 事件名称 |
| callback | Handler&lt;T&gt; | 是 | 回调函数 |

#### 返回值
`string` - 事件处理器ID

#### 使用示例
```typescript title="subscribeEvent方法调用"
const handlerId = this.subscribeEvent("DATA_UPDATED", async (event) => {
    console.log("数据已更新", event.data);
    await this.Table1.call();
});
```

### publishEvent
发布事件。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| messageName | string &#124; symbol | 是 | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | 事件数据 |

#### 返回值
`Promise&lt;any&gt;`

#### 使用示例
```typescript title="publishEvent方法调用"
await this.publishEvent("DATA_UPDATED", {
    data: newData,
    timestamp: Date.now()
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| handlerId | string | 是 | 事件处理器ID |

#### 返回值
`any`

#### 使用示例
```typescript title="unSubscribeEvent方法调用"
this.unSubscribeEvent(handlerId);
```

### getUIContext
获取UI上下文信息，包含函数列表和变量列表。

#### 返回值
`{functionList: FuncDefine[], variables: DataTypeConfig[]}` - UI上下文对象

#### 使用示例
```typescript title="getUIContext方法调用"
const context = this.getUIContext();
console.log("可用函数:", context.functionList);
console.log("可用变量:", context.variables);
```

### getVariableValue
获取变量值。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| varName | string &#124; BaseDataType | 是 | 变量名或变量实例 |

#### 返回值
`any` - 变量值

#### 使用示例
```typescript title="getVariableValue方法调用"
const userName = this.getVariableValue("userName");
const tableData = this.getVariableValue("Table1.selectedRowList");
```

### parseVariableInQ
解析Q表达式中的变量。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| str | string | 是 | Q表达式字符串 |

#### 返回值
`string` - 解析后的Q表达式

#### 使用示例
```typescript title="parseVariableInQ方法调用"
const qStr = "Q(name=this.userName.value)";
const parsedQ = this.parseVariableInQ(qStr);
```

### sendAiMessage
发送AI消息（如果启用AI功能）。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| message | string | 是 | 消息内容 |
| inNewChat | number | 否 | 是否新建聊天，默认0 |

#### 返回值
`Promise&lt;void&gt;`

#### 使用示例
```typescript title="sendAiMessage方法调用"
await this.sendAiMessage("帮我分析这个数据表", 1);
```

## Properties
AI Data Management Page has the following core properties:

### scheme
Page configuration scheme containing layout, component list, variable list, etc.

**Type:** `IScheme`

**Example:**
```typescript title="scheme Property Access"
console.log(this.scheme.componentList);
console.log(this.scheme.layout);
```

### compInsList
Component instance list containing all instantiated components in the page.

**Type:** `any[]`

**Example:**
```typescript title="compInsList Property Access"
this.compInsList.forEach(comp => {
    console.log(comp.name, comp.title);
});
```

### compInsDict
Component instance dictionary mapping component names to component instances.

**Type:** `Record<string, any>`

**Example:**
```typescript title="compInsDict Property Access"
const tableComp = this.compInsDict["Table1"];
const filterComp = this.compInsDict["Filter1"];
```

### isReady
Flag indicating whether the page is ready.

**Type:** `boolean`

**Example:**
```typescript title="isReady Property Access"
if (this.isReady) {
    // Page has finished loading, operations can be performed
    await this.Table1.call();
}
```

### name
Page name.

**Type:** `string`

### title
Page title.

**Type:** `string`

### fullName
Complete page name (fullName).

**Type:** `string`

### ePath
Page element path.

**Type:** `string`

### app
Application instance reference.

**Type:** `any`

### aiConfig
AI configuration information.

**Type:** `{useAi?: 1 | 0; aiAssistant?: string} | undefined`

### extend
Inherited page type.

**Type:** `string | undefined`

## Table Component Core Properties
The table component in AI Data Management Page has the following important properties:

### activeRow
Currently selected row data.

**Type:** `BaseModel`

**Example:**
```typescript title="activeRow Property Usage"
// Get currently selected row data
const currentRow = this.Table1.activeRow.value;
console.log("Current row ID:", currentRow.id);

// Use in editing
this.Form1.formData.value = this.Table1.activeRow.value;
```

### selectedRowList
List of selected multiple row data.

**Type:** `RowList`

**Example:**
```typescript title="selectedRowList Property Usage"
// Get selected row data
const selectedRows = this.Table1.selectedRowList.value;
console.log("Selected rows:", selectedRows.length);

// Batch operations
for (const row of selectedRows) {
    await row.delete();
}
```

### filter
Table filter conditions.

**Type:** `QFilter`

**Example:**
```typescript title="filter Property Usage"
// Set filter conditions
this.Table1.filter.value = "Q(status='active')";

// Apply filter
await this.Table1.call(this.Table1.filter.value);
```

### primaryKey
Primary key field name of the table.

**Type:** `string`

**Example:**
```typescript title="primaryKey Property Usage"
console.log("Primary key field:", this.Table1.primaryKey);
```

## 事件系统
AI数据管理页面支持丰富的事件系统，主要包括：

### 表格工具栏事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| clickAdd | 点击新增按钮 | 无 | 触发新增操作 |
| clickBatchDelete | 点击批量删除按钮 | 无 | 触发批量删除操作 |
| clickImport | 点击导入按钮 | 无 | 触发导入功能 |
| clickExport | 点击导出按钮 | 无 | 触发导出功能 |

### 表格行操作事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| clickEdit | 点击编辑按钮 | 无 | 触发编辑操作，activeRow为当前行 |
| clickDelete | 点击删除按钮 | 无 | 触发删除操作，activeRow为当前行 |
| clickRow | 点击表格行 | 无 | 触发行点击事件 |

### 表格选择事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| selectedChange | 选中状态变化 | 无 | 选中行列表发生变化时触发 |

### 表格数据事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| afterRowChange | 行数据变化后 | 无 | 数据增删改后触发 |

### 筛选器事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| afterFilter | 筛选条件变化后 | 无 | 筛选条件应用后触发 |

### 表单事件
| 事件名称 | 触发时机 | 参数 | 说明 |
|----------|----------|------|------|
| afterSubmit | 表单提交后 | 无 | 表单数据提交成功后触发 |
| beforeSubmit | 表单提交前 | 无 | 表单提交前验证触发 |

### 事件使用示例
```typescript title="完整事件绑定示例"
bindEvent() {
    // 新增数据
    this.Table1.subscribeEvent("clickAdd", async () => {
        this.Modal1.call("新增数据");
        this.Form1.formData.reset();
        this.Form1.mode.value = "add";
    });
    
    // 编辑数据
    this.Table1.subscribeEvent("clickEdit", async () => {
        this.Modal1.call("编辑数据");
        this.Form1.mode.value = "edit";
        this.Form1.formData.value = this.Table1.activeRow.value;
    });
    
    // 删除数据
    this.Table1.subscribeEvent("clickDelete", async () => {
        const result = await this.app.modules.FeedBack.globalConfirm(
            "确定删除这条数据吗？删除后不可恢复"
        );
        if (result === "true") {
            await this.Table1.activeRow.delete();
            await this.Table1.call();
        }
    });
    
    // 批量删除
    this.Table1.subscribeEvent("clickBatchDelete", async () => {
        const selectedRows = this.Table1.selectedRowList.value;
        if (selectedRows.length === 0) {
            this.app.modules.FeedBack.globalMessage("请先选择要删除的数据");
            return;
        }
        
        const result = await this.app.modules.FeedBack.globalConfirm(
            `确定删除选中的 ${selectedRows.length} 条数据吗？`
        );
        if (result === "true") {
            for (const row of selectedRows) {
                await row.delete();
            }
            await this.Table1.call();
        }
    });
    
    // 筛选数据
    this.Filter1.subscribeEvent("afterFilter", async () => {
        await this.Table1.call(this.Filter1.filter.value);
    });
    
    // 表单提交
    this.Form1.subscribeEvent("afterSubmit", async () => {
        this.Modal1.close();
        await this.Table1.call();
        this.app.modules.FeedBack.globalMessage("操作成功");
    });
    
    // 选择状态变化
    this.Table1.subscribeEvent("selectedChange", async () => {
        const count = this.Table1.selectedRowList.value.length;
        console.log(`当前选中 ${count} 行数据`);
    });
}
```

## 高级特性
### 数据模型绑定机制
AI数据管理页面通过`dataModel`字段实现与模型的自动绑定：

```json title="数据模型绑定配置"
{
  "type": "pages.DataManagePageType",
  "title": "客户管理页面",
  "dataModel": "models.CustomerModel"
}
```

**绑定效果：**
- 表格自动关联到指定模型
- 表单字段自动映射模型字段
- 筛选器自动支持模型字段筛选
- 导入功能自动配置模型字段

### 页面继承机制
AI数据管理页面支持继承其他页面的配置和组件：

```json title="支持继承的e.json配置"
{
  "type": "pages.DataManagePageType",
  "title": "子页面",
  "extend": "pages.parentDataManagePage"
}
```

### 动态组件管理
```typescript title="动态添加组件"
class PageCls extends Jit.GridPage {
    async addDynamicComponent() {
        const newTable = await this.newComponent("components.Table", {
            name: "DynamicTable",
            title: "动态表格",
            config: {
                requireElements: [{
                    type: "models.Meta", 
                    name: "models.ProductModel"
                }],
                isShowAllField: true
            }
        });
        
        // 添加到页面
        this.DynamicTable = newTable;
        this.compInsDict["DynamicTable"] = newTable;
        
        // 绑定事件
        newTable.subscribeEvent("clickAdd", async () => {
            console.log("动态表格新增");
        });
    }
}
```

### 组件事件代理
```typescript title="事件代理机制"
bindEvent() {
    // 代理所有表格的删除事件
    Object.values(this.compInsDict).forEach(comp => {
        if (comp.constructor.name === 'TableComponent') {
            comp.subscribeEvent("clickDelete", async () => {
                const result = await this.app.modules.FeedBack.globalConfirm(
                    "确定删除这条数据吗？"
                );
                if (result === "true") {
                    await comp.activeRow.delete();
                    await comp.call();
                }
            });
        }
    });
}
```

### URL参数绑定
```json title="URL参数自动绑定"
{
  "variableList": [
    {
      "name": "userId",
      "dataType": "Stext",
      "title": "用户ID"
    }
  ],
  "matchUarParamsVariableNameList": ["userId"]
}
```

### 自定义函数装箱
```typescript title="函数参数自动装箱"
class PageCls extends Jit.GridPage {
    scheme = {
        functionList: [
            {
                name: "processUserData",
                args: [
                    {name: "userData", dataType: "RowData"},
                    {name: "action", dataType: "Stext"}
                ]
            }
        ]
    };
    
    // 调用时参数会自动装箱为对应的数据类型
    processUserData(userData, action) {
        console.log("用户数据:", userData.value);
        console.log("操作类型:", action.value);
    }
}
```

### 表格高级配置
```json title="表格高级配置示例"
{
  "name": "Table1",
  "type": "components.Table",
  "config": {
    "isShowAllField": false,
    "fieldIdList": ["id", "name", "phone", "status"],
    "pageSize": 50,
    "level": 2,
    "defaultRender": true,
    "displayGroupBy": true,
    "fieldStatisticList": [
      {
        "fieldName": "amount",
        "aggrType": "sum",
        "title": "总金额"
      }
    ],
    "columnWidth": {
      "name": 150,
      "phone": 120
    },
    "frozenColumns": ["name"],
    "editableColumns": ["status"],
    "clickField": ["name"],
    "alias": [
      {
        "fieldId": "name",
        "aliasName": "客户姓名"
      }
    ]
  }
}
```

### 导入功能配置
```json title="导入组件完整配置"
{
  "name": "Import1",
  "type": "components.Import",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.CustomerModel"
      }
    ],
    "isShowAllField": true,
    "fieldIdList": ["name", "phone", "email"],
    "fieldAliasList": [
      {
        "aliasName": "客户姓名",
        "fieldId": "name",
        "fieldName": "name",
        "fieldType": "Stext",
        "isNeed": true
      }
    ],
    "importType": 1,
    "replaceFiled": [],
    "importDesc": {
      "check": true,
      "desc": "请按照模板格式导入数据"
    },
    "requiredFieldList": ["name", "phone"]
  }
}
``` 