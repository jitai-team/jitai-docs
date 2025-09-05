# AI数据管理页面

AI数据管理页面是专门用于数据增删改查操作的页面类型，基于组件化可视配置架构实现数据表格管理能力。它负责数据列表展示、数据筛选、数据编辑和数据导入导出，通过拖拽式布局快速构建数据管理界面。

AI数据管理页面元素分层结构为Meta（pages.Meta） → Type（pages.DataManagePageType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AI数据管理页面实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的pages.DataManagePageType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构

```title="AI数据管理页面实例目录结构"
testDataManagementPage/          # 实例元素目录
├── e.json                       # 元素配置文件
├── scheme.json                  # 页面布局和组件配置
├── index.ts                     # 导出文件
├── page.ts                      # 页面逻辑类
├── PageRender.tsx              # React渲染组件
└── page.style.ts               # 页面样式文件（可选）
```

#### e.json文件

```json title="e.json配置示例"
{
  "type": "pages.DataManagePageType",
  "resourceName": "index",
  "title": "测试AI数据管理页面",
  "dataModel": "models.CustomerModel",
  "platform": "PC",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### 页面布局配置文件

AI数据管理页面的核心配置通过`scheme.json`文件定义：

```json title="scheme.json基本结构"
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
      "title": "表格组件",
      "type": "components.Table",
      "config": {
        "isShowAllField": true,
        "requireElements": [
          {
            "type": "models.Meta",
            "name": "models.CustomerModel",
            "title": "表格组件",
            "filter": "",
            "orderBy": []
          }
        ],
        "fieldIdList": ["id", "name", "phone"],
        "toolbarLeft": [
          {
            "name": "新增",
            "id": "Add",
            "height": 32,
            "width": 60,
            "type": "primary"
          }
        ],
        "toolbarRight": [
          {
            "name": "导入",
            "id": "Import",
            "height": 32,
            "width": 60,
            "type": "ghost"
          }
        ],
        "actionBtn": [
          {
            "name": "编辑",
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

#### 页面逻辑代码

```typescript title="page.ts实现示例"
import { Jit, ComponentPageScheme } from "jit";
import schemeJson from "./scheme.json";

class PageCls extends Jit.GridPage {
    Table1!: BaseComponent;
    Filter1!: BaseComponent;
    Modal1!: BaseComponent;
    Form1!: BaseComponent;
    scheme: ComponentPageScheme = schemeJson;
    
    bindEvent() {
        // 新增按钮事件
        this.Table1.subscribeEvent("clickAdd", async () => {
            this.Modal1.call("新增");
            this.Form1.formData.reset();
            this.Form1.mode.value = "add";
        });
        
        // 编辑按钮事件
        this.Table1.subscribeEvent("clickEdit", async () => {
            this.Modal1.call("编辑");
            this.Form1.mode.value = "edit";
            this.Form1.formData.value = this.Table1.activeRow.value;
        });
        
        // 删除按钮事件
        this.Table1.subscribeEvent("clickDelete", async () => {
            const result = await this.app.modules.FeedBack.globalConfirm(
                "确定删除这条数据吗？"
            );
            if (result === "true") {
                await this.Table1.activeRow.delete();
                await this.Table1.call();
            }
        });
        
        // 批量删除事件
        this.Table1.subscribeEvent("clickBatchDelete", async () => {
            const selectedRows = this.Table1.selectedRowList.value;
            if (selectedRows.length === 0) return;
            
            const result = await this.app.modules.FeedBack.globalConfirm(
                "确定删除选中的数据吗？"
            );
            if (result === "true") {
                for (const row of selectedRows) {
                    await row.delete();
                }
                await this.Table1.call();
            }
        });
        
        // 行点击事件
        this.Table1.subscribeEvent("clickRow", async () => {
            this.Modal1.call("查看");
            this.Form1.mode.value = "read";
            this.Form1.formData.value = this.Table1.activeRow.value;
        });
        
        // 选中状态变化事件
        this.Table1.subscribeEvent("selectedChange", async () => {
            console.log("选中行数:", this.Table1.selectedRowList.value.length);
        });
        
        // 筛选事件
        this.Filter1.subscribeEvent("afterFilter", async () => {
            await this.Table1.call(this.Filter1.filter.value);
        });
        
        // 表单提交事件
        this.Form1.subscribeEvent("afterSubmit", async () => {
            this.Modal1.close();
            await this.Table1.call();
        });
    }
}

export default PageCls;
```

#### 调用示例

```typescript title="index.ts导出文件"
import PageCls from "./page";
import Render from "./PageRender";

export {
    PageCls,
    Render
};
```

```tsx title="PageRender.tsx渲染组件"
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

## 元素配置

### e.json配置

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | string | 是 | - | 元素类型，固定为"pages.DataManagePageType" |
| title | string | 是 | - | 页面标题 |
| dataModel | string | 否 | - | 关联的数据模型fullName，用于数据绑定 |
| platform | string | 否 | "PC" | 平台类型，支持"PC"、"Mobile" |
| frontBundleEntry | string | 是 | "./index.ts" | 前端入口文件路径 |
| outputName | string | 是 | "index" | 输出文件名 |
| resourceName | string | 否 | "index" | 资源名称 |

### 页面布局配置文件配置

scheme.json文件定义了页面的布局和组件配置：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| layout | Layout[] | 是 | 组件布局配置数组 |
| componentList | ComponentConfig[] | 是 | 组件配置列表 |
| variableList | VariableConfig[] | 否 | 页面变量配置 |
| functionList | FunctionConfig[] | 否 | 页面函数配置 |
| autoIncrementId | number | 否 | 自增ID计数器 |

**Layout配置项：**
- `i`: 组件标识符
- `x`: X轴位置（栅格单位）
- `y`: Y轴位置（栅格单位） 
- `w`: 宽度（栅格单位）
- `h`: 高度（栅格单位）

**表格组件配置详解：**

```json title="表格组件完整配置"
{
  "name": "Table1",
  "type": "components.Table",
  "config": {
    "isShowAllField": true,
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "title": "表格组件",
        "filter": "",
        "orderBy": []
      }
    ],
    "fieldIdList": ["id", "name", "phone"],
    "defaultRender": true,
    "pageSize": 20,
    "toolbarLeft": [
      {
        "name": "新增",
        "id": "Add",
        "height": 32,
        "width": 60,
        "type": "primary"
      }
    ],
    "toolbarRight": [
      {
        "name": "导入",
        "id": "Import",
        "height": 32,
        "width": 60,
        "type": "ghost"
      }
    ],
    "actionBtn": [
      {
        "name": "编辑",
        "id": "Edit",
        "height": 32,
        "width": 60,
        "type": "link"
      }
    ]
  }
}
```

**筛选器组件配置详解：**

```json title="筛选器组件配置"
{
  "name": "Filter1",
  "type": "components.Filter",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "title": "筛选器组件",
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

## 方法

AI数据管理页面继承自GridPage，拥有以下核心方法：

### init

页面初始化方法，加载配置和组件。

#### 返回值

`Promise&lt;void&gt;`

#### 使用示例

```typescript title="init方法调用"
class PageCls extends Jit.GridPage {
    async init() {
        await super.init();
        // 自定义初始化逻辑
        console.log("页面已初始化");
    }
}
```

### bindEvent

事件绑定方法，用于定义组件间的交互逻辑。

#### 返回值

`void`

#### 使用示例

```typescript title="bindEvent方法实现"
bindEvent() {
    // 表格新增事件
    this.Table1.subscribeEvent("clickAdd", async () => {
        this.Modal1.call("新增");
        this.Form1.formData.reset();
        this.Form1.mode.value = "add";
    });
    
    // 表格编辑事件
    this.Table1.subscribeEvent("clickEdit", async () => {
        this.Modal1.call("编辑");
        this.Form1.mode.value = "edit";
        this.Form1.formData.value = this.Table1.activeRow.value;
    });
    
    // 行选择变化事件
    this.Table1.subscribeEvent("selectedChange", async () => {
        const count = this.Table1.selectedRowList.value.length;
        console.log(`已选择 ${count} 行数据`);
    });
}
```

### loadComponents

组件加载方法，根据配置实例化页面中的所有组件。

#### 返回值

`Promise&lt;void&gt;`

#### 使用示例

```typescript title="loadComponents方法调用"
async loadComponents() {
    await super.loadComponents();
    // 组件加载完成后的自定义逻辑
    this.Table1?.bindApp(this.app);
    this.Table1?.bindPage(this);
}
```

### loadVariables

变量加载方法，根据配置创建页面变量。

#### 返回值

`void`

#### 使用示例

```typescript title="loadVariables方法调用"
loadVariables() {
    super.loadVariables();
    // 创建自定义变量
    this.customVar = this.newVariable({
        name: "customVar",
        dataType: "Stext",
        title: "自定义变量"
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

## 属性

AI数据管理页面具有以下核心属性：

### scheme

页面配置方案，包含布局、组件列表、变量列表等。

**类型：** `IScheme`

**示例：**
```typescript title="scheme属性访问"
console.log(this.scheme.componentList);
console.log(this.scheme.layout);
```

### compInsList

组件实例列表，包含页面中所有已实例化的组件。

**类型：** `any[]`

**示例：**
```typescript title="compInsList属性访问"
this.compInsList.forEach(comp => {
    console.log(comp.name, comp.title);
});
```

### compInsDict

组件实例字典，以组件名为键的组件实例映射。

**类型：** `Record<string, any>`

**示例：**
```typescript title="compInsDict属性访问"
const tableComp = this.compInsDict["Table1"];
const filterComp = this.compInsDict["Filter1"];
```

### isReady

页面是否已准备就绪的标志。

**类型：** `boolean`

**示例：**
```typescript title="isReady属性访问"
if (this.isReady) {
    // 页面已加载完成，可以执行操作
    await this.Table1.call();
}
```

### name

页面名称。

**类型：** `string`

### title

页面标题。

**类型：** `string`

### fullName

页面完整名称（fullName）。

**类型：** `string`

### ePath

页面元素路径。

**类型：** `string`

### app

应用实例引用。

**类型：** `any`

### aiConfig

AI配置信息。

**类型：** `{useAi?: 1 | 0; aiAssistant?: string} | undefined`

### extend

继承的页面类型。

**类型：** `string | undefined`

## 表格组件核心属性

AI数据管理页面中的表格组件具有以下重要属性：

### activeRow

当前选中的行数据。

**类型：** `BaseModel`

**示例：**
```typescript title="activeRow属性使用"
// 获取当前选中行的数据
const currentRow = this.Table1.activeRow.value;
console.log("当前行ID:", currentRow.id);

// 在编辑时使用
this.Form1.formData.value = this.Table1.activeRow.value;
```

### selectedRowList

选中的多行数据列表。

**类型：** `RowList`

**示例：**
```typescript title="selectedRowList属性使用"
// 获取选中的行数据
const selectedRows = this.Table1.selectedRowList.value;
console.log("选中行数:", selectedRows.length);

// 批量操作
for (const row of selectedRows) {
    await row.delete();
}
```

### filter

表格的筛选条件。

**类型：** `QFilter`

**示例：**
```typescript title="filter属性使用"
// 设置筛选条件
this.Table1.filter.value = "Q(status='active')";

// 应用筛选
await this.Table1.call(this.Table1.filter.value);
```

### primaryKey

表格的主键字段名。

**类型：** `string`

**示例：**
```typescript title="primaryKey属性使用"
console.log("主键字段:", this.Table1.primaryKey);
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