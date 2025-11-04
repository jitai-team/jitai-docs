---
sidebar_position: 4
slug: data-entry-page
title: "Data Entry Page Reference"
description: "Data Entry Page Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Data Entry Page"
---

# Data Entry Page
Data Entry Page is a page type specifically designed for creating form data entry interfaces, implementing visual form design and data submission functionality based on a grid layout architecture. It is responsible for form component layout management, data model binding, and user interaction handling, supporting visual configuration of form field arrangement, validation rules, and submission processes.

The Data Entry Page element hierarchy is Meta (pages.Meta) → Type (pages.FormPageType) → Instance. Developers can quickly create data entry page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.FormPageType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```title="Data Entry Page Instance Directory Structure"
testDataEntryPage/
├── e.json              # Element configuration file
├── scheme.json         # Page layout and component configuration
├── page.ts            # Page logic code
├── PageRender.tsx     # Page rendering component
├── page.style.ts      # Page style file
└── index.ts           # Entry file
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "pages.FormPageType",
  "resourceName": "index",
  "title": "Customer Information Entry",
  "dataModel": "models.CustomerModel",
  "platform": "PC",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### scheme.json File
```json title="scheme.json Configuration Example"
{
  "layout": [
    {
      "i": "Form1",
      "x": 0,
      "y": 0,
      "w": 48,
      "h": 30,
      "minW": 20,
      "minH": 10,
      "maxW": 48,
      "maxH": 50
    }
  ],
  "componentList": [
    {
      "name": "Form1",
      "title": "Form Component",
      "type": "components.Form",
      "config": {
        "isShowAllEditField": true,
        "isShowCreateAgain": true,
        "isShowResultRecord": true,
        "requireElements": [
          {
            "type": "models.Meta",
            "name": "models.CustomerModel"
          }
        ],
        "layoutDict": {
          "custName": {
            "key": "custName",
            "pos": "mid",
            "layout": {
              "w": 120,
              "h": 2,
              "x": 0,
              "y": 0,
              "i": "custName"
            }
          }
        }
      }
    }
  ],
  "variableList": [
    {
      "name": "currentUser",
      "title": "Current User",
      "dataType": "Stext",
      "value": ""
    }
  ],
  "functionList": [
    {
      "name": "validateForm",
      "title": "Form Validation",
      "args": [
        {
          "name": "formData",
          "title": "Form Data",
          "dataType": "JitDict"
        }
      ],
      "returnType": "Checkbox"
    }
  ],
  "matchUarParamsVariableNameList": ["userId", "deptId"],
  "autoIncrementId": 1
}
```

#### page.style.ts File
```typescript title="page.style.ts Style Configuration"
import type { GlobalToken } from 'antd';
import { css } from '@emotion/react';

export const pageStyle = (token: GlobalToken) => css`
  .form-container {
    padding: 24px;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  }
  
  .form-title {
    font-size: ${token.fontSizeLG}px;
    color: ${token.colorTextHeading};
    margin-bottom: 16px;
  }
`;

export const pageGlobalStyle = (token: GlobalToken) => css`
  .ant-form-item-label {
    font-weight: 500;
  }
  
  .required-field {
    color: ${token.colorError};
  }
`;
```

#### page.ts File
```typescript title="page.ts Implementation Example"
import { Jit } from 'jit';
import schemeJson from './scheme.json';

type BaseComponent = InstanceType<typeof Jit.BaseComponent>;

class PageCls extends Jit.GridPage {
    Form1!: BaseComponent;
    currentUser!: InstanceType<typeof Jit.datatypes.Stext>;
    scheme: Record<string, any> = schemeJson;
    
    bindEvent() {
        // Bind form submit event
        this.Form1.subscribeEvent("afterSubmit", async (e) => {
            console.log("Form submitted successfully:", e.data);
            this.refresh();
        });
        
        // Bind form call event
        this.Form1.subscribeEvent("afterCall", async () => {
            console.log("Form call completed");
        });
    }
    
    validateForm(formData: any): boolean {
        // Custom validation logic
        return formData.custName && formData.phone;
    }
}

export default PageCls;
```

#### Usage Example
```typescript title="Calling Data Entry Page from Other Pages"
// Navigate to data entry page
this.app.openPage('pages.CustomerDataEntry');

// Open data entry page in modal
this.app.openModal({
    element: 'pages.CustomerDataEntry',
    title: 'Add Customer',
    width: 800,
    height: 600
});

// Navigate with parameters
this.app.openPage('pages.CustomerDataEntry', {
    userId: '123',
    deptId: 'dept001'
});
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| type | string | Yes | - | Fixed value "pages.FormPageType" |
| title | string | Yes | - | Page title |
| dataModel | string | No | - | Associated data model fullName |
| platform | string | No | "PC" | Platform type, supports PC, Mobile |
| resourceName | string | No | "index" | Resource name |
| frontBundleEntry | string | No | "./index.ts" | Frontend entry file path |
| outputName | string | No | "index" | Output name |

### scheme.json Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| layout | Layout[] | Yes | [] | Component layout configuration array |
| componentList | object[] | Yes | [] | Page component configuration list |
| variableList | object[] | No | [] | Page variable list |
| functionList | object[] | No | [] | Page function list |
| matchUarParamsVariableNameList | string[] | No | [] | Variable name list matching URL parameters |
| autoIncrementId | number | No | 1 | Auto-increment ID |
| aiConfig | object | No | - | AI configuration |

#### Layout Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| i | string | Yes | - | Component unique identifier |
| x | number | Yes | - | Horizontal position (grid units) |
| y | number | Yes | - | Vertical position (grid units) |
| w | number | Yes | - | Width (grid units) |
| h | number | Yes | - | Height (grid units) |
| minW | number | No | - | Minimum width |
| minH | number | No | - | Minimum height |
| maxW | number | No | - | Maximum width |
| maxH | number | No | - | Maximum height |
| static | boolean | No | false | Whether static (non-draggable) |
| isDraggable | boolean | No | true | Whether draggable |
| isResizable | boolean | No | true | Whether resizable |

## Methods
### init
Initialize page, load configuration, variables and components.

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;void&gt; | Initialization completion Promise |

#### Usage Example
```typescript title="Page Initialization"
class PageCls extends Jit.GridPage {
    async init() {
        await super.init();
        console.log('Page initialization completed, isReady:', this.isReady);
    }
}
```

### bindEvent
Bind page events, automatically called after page initialization.

#### Usage Example
```typescript title="Event Binding"
bindEvent() {
    // Bind form submit event
    this.Form1.subscribeEvent("afterSubmit", async (e) => {
        console.log('Submitted data:', e.data);
    });
    
    // Bind page refresh event
    this.subscribeEvent("PAGE_REFRESH", async () => {
        this.refresh();
    });
}
```

### subscribeEvent
订阅页面级事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| messageName | string &#124; symbol | 是 | 事件名称 |
| callback | Handler&lt;T&gt; | 是 | 事件回调函数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| string | 事件句柄ID |

#### 使用示例
```typescript title="订阅事件"
const handlerId = this.subscribeEvent('CUSTOM_EVENT', async (e) => {
    console.log('接收到自定义事件:', e);
});
```

### publishEvent
发布页面级事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| messageName | string &#124; symbol | 是 | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | 附加数据 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;any&gt; | 事件发布结果 |

#### 使用示例
```typescript title="发布事件"
await this.publishEvent('DATA_UPDATED', {
    dataId: 123,
    timestamp: Date.now()
});
```

### unSubscribeEvent
取消订阅事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| handlerId | string | 是 | 事件句柄ID |

#### 使用示例
```typescript title="取消订阅"
const handlerId = this.subscribeEvent('TEST_EVENT', callback);
this.unSubscribeEvent(handlerId);
```

### off
取消事件订阅的简化方法。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| handlerId | string | 是 | 事件句柄ID |

#### 使用示例
```typescript title="取消事件订阅"
const handlerId = this.subscribeEvent('TEST_EVENT', callback);
this.off(handlerId);
```

### newVariable
创建页面变量实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| varConfig | DataTypeConfig | 是 | 变量配置 |
| value | any | 否 | 初始值 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 变量实例 |

#### 使用示例
```typescript title="创建变量"
const userNameVar = this.newVariable({
    name: 'userName',
    title: '用户名',
    dataType: 'Stext'
}, '张三');
```

### newComponent
创建组件实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 组件类型 |
| createCompConfig | any | 是 | 组件配置 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;any&gt; | 组件实例 |

#### 使用示例
```typescript title="创建组件"
const button = await this.newComponent('components.Button', {
    name: 'submitBtn',
    title: '提交按钮',
    config: {
        btnType: 'primary'
    }
});
```

### refresh
刷新页面。

#### 使用示例
```typescript title="刷新页面"
// 手动触发页面刷新
this.refresh();

// 在数据更新后刷新页面
async updateData() {
    await this.saveData();
    this.refresh();
}
```

### refreshPageVariable
刷新页面变量值，从URL参数重新获取变量值。

#### 使用示例
```typescript title="刷新页面变量"
// 当URL参数变化时，重新加载变量值
onUrlChange() {
    this.refreshPageVariable();
    console.log('页面变量已更新');
}
```

### parseVariableInQ
解析Q表达式中的变量引用。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| str | string | 是 | 包含变量的Q表达式字符串 |

#### 返回值
| 类型 | 说明 |
|------|------|
| string | 解析后的Q表达式字符串 |

#### 使用示例
```typescript title="解析Q表达式变量"
const qStr = "Q(userId='${this.currentUser.value}')";
const parsedQ = this.parseVariableInQ(qStr);
console.log('解析后的Q表达式:', parsedQ);
```

### sendAiMessage
发送AI消息，触发AI助手处理。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| message | string | 是 | 发送给AI的消息内容 |
| inNewChat | number | 否 | 是否在新聊天中发送，0=当前对话，1=新对话 |

#### 使用示例
```typescript title="发送AI消息"
async handleAIAssist() {
    if (this.aiConfig?.useAi) {
        await this.sendAiMessage('请帮我分析这个客户的信息', 0);
    }
}
```

### getScheme
获取页面配置方案，支持继承合并。

#### 返回值
| 类型 | 说明 |
|------|------|
| IScheme | 页面配置对象 |

#### 使用示例
```typescript title="获取页面配置"
const scheme = this.getScheme();
console.log('当前页面配置:', scheme);
console.log('组件列表:', scheme.componentList);
```

### getUIContext
获取页面UI上下文信息，包含页面和组件的函数、变量信息。

#### 返回值
| 类型 | 说明 |
|------|------|
| object | 包含functionList和variables的对象 |

#### 使用示例
```typescript title="获取UI上下文"
const context = this.getUIContext();
console.log('页面函数列表:', context.functionList);
console.log('页面变量列表:', context.variables);
```

### getVariableValue
获取变量值，支持页面变量和组件变量。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| varName | string &#124; BaseDataType | 是 | 变量名或变量实例 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 变量值 |

#### 使用示例
```typescript title="获取变量值"
// 获取页面变量值
const userName = this.getVariableValue('userName');

// 获取组件变量值
const formData = this.getVariableValue('Form1.formData');
```

### loadComponents
加载页面组件。

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 加载完成Promise |

### loadVariables
加载页面变量。

### destroy
销毁页面实例，清理资源。

## Properties
### scheme
Page configuration scheme object.

- **Type**: `IScheme`
- **Description**: Contains configuration information such as layout, componentList, variableList, etc.

### compInsList
Component instance list.

- **Type**: `any[]`
- **Description**: Array of all component instances in the page

### compInsDict
Component instance dictionary.

- **Type**: `Record<string, any>`
- **Description**: Dictionary of component instances with component names as keys

### isReady
Page ready state.

- **Type**: `boolean`
- **Description**: Indicates whether the page has completed initialization

### extend
Inherited page element name.

- **Type**: `string | undefined`
- **Description**: FullName of the parent page that the current page inherits from

### app
Application instance.

- **Type**: `App`
- **Description**: Current runtime application instance

### name
Page name.

- **Type**: `string`
- **Description**: Page element name

### title
Page title.

- **Type**: `string`
- **Description**: Page display title

### fullName
Complete page name.

- **Type**: `string`
- **Description**: Complete path name of the page element

### ePath
Page element path.

- **Type**: `string`
- **Description**: Path of the page element in the file system

### pagePerm
Page permission configuration.

- **Type**: `Record<string, any> | undefined`
- **Description**: Permission control configuration of the page

### aiConfig
AI configuration.

- **Type**: `object`
- **Description**: AI assistant configuration information of the page

## Advanced Features
### Page Inheritance
Data Entry Page supports inheritance mechanism, allowing creation of new pages based on existing pages.

#### Configuration Example
```json title="Inheritance Configuration"
{
  "type": "pages.FormPageType",
  "title": "Advanced Customer Entry Page",
  "extend": "pages.BasicCustomerForm",
  "dataModel": "models.CustomerModel"
}
```

#### Usage Example
```typescript title="Inheritance Implementation"
class AdvancedPageCls extends Jit.GridPage {
    constructor(info: any = {}) {
        super(info);
        // Inherited pages automatically merge parent page configuration
    }
    
    bindEvent() {
        super.bindEvent?.(); // Call parent page event binding
        
        // Add new event bindings
        this.Form1.subscribeEvent("beforeSubmit", async (e) => {
            // Advanced validation logic
            return this.validateAdvancedRules(e.data);
        });
    }
}
```

### URL Parameter Binding
Through matchUarParamsVariableNameList configuration, page variables can automatically get values from URL parameters.

#### Configuration Example
```json title="URL Parameter Binding Configuration"
{
  "scheme": {
    "matchUarParamsVariableNameList": ["userId", "deptId"],
    "variableList": [
      {
        "name": "userId",
        "title": "User ID",
        "dataType": "Stext"
      },
      {
        "name": "deptId", 
        "title": "Department ID",
        "dataType": "Stext"
      }
    ]
  }
}
```

#### Usage Example
```typescript title="URL Parameter Usage"
// Page URL: /pages/CustomerForm?userId=123&deptId=dept001
class PageCls extends Jit.GridPage {
    bindEvent() {
        // When page initializes, userId and deptId automatically get values from URL
        console.log('User ID:', this.userId.value); // Output: 123
        console.log('Department ID:', this.deptId.value); // Output: dept001
        
        // Listen for URL changes
        this.subscribeEvent('URL_CHANGED', () => {
            this.refreshPageVariable(); // Re-get parameters from URL
        });
    }
}
```

### 动态组件加载
支持运行时动态添加和配置组件。

#### 使用示例
```typescript title="动态组件管理"
class PageCls extends Jit.GridPage {
    async addDynamicComponent() {
        // 创建新组件
        const newComp = await this.newComponent('components.Button', {
            name: 'dynamicBtn',
            title: '动态按钮',
            config: {
                btnType: 'default'
            }
        });
        
        // 绑定到页面
        newComp.bindApp(this.app);
        newComp.bindPage(this);
        
        // 添加到组件字典
        this.compInsDict['dynamicBtn'] = newComp;
        this[newComp.name] = newComp;
        
        // 更新布局
        this.scheme.layout.push({
            i: 'dynamicBtn',
            x: 0,
            y: 10,
            w: 12,
            h: 4
        });
        
        this.refresh();
    }
}
```

### AI集成
数据录入页面支持AI助手功能，可以为用户提供智能填写建议。

#### 配置示例
```json title="AI配置"
{
  "scheme": {
    "aiConfig": {
      "useAi": 1,
      "aiAssistant": "models.CustomerAIAssistant"
    }
  }
}
```

#### 使用示例
```typescript title="AI助手集成"
class PageCls extends Jit.GridPage {
    async handleAIAssist() {
        if (this.aiConfig?.useAi) {
            await this.sendAiMessage('请帮我分析这个客户的信息', 0);
        }
    }
    
    bindEvent() {
        // 监听AI消息发送事件
        this.subscribeEvent('SEND_AI_MESSAGE', async (e) => {
            console.log('AI消息:', e.message);
        });
        
        // 绑定AI建议按钮
        this.subscribeEvent('AI_SUGGEST', async () => {
            const formData = this.Form1.getFormData();
            await this.sendAiMessage(`请为以下表单数据提供建议：${JSON.stringify(formData)}`, 0);
        });
    }
}
```

### 样式定制
通过page.style.ts文件可以自定义页面样式。

#### 使用示例
```typescript title="高级样式定制"
import type { GlobalToken } from 'antd';
import { css } from '@emotion/react';

export const pageStyle = (token: GlobalToken) => css`
  .data-entry-container {
    min-height: 100vh;
    background: linear-gradient(135deg, ${token.colorBgBase} 0%, ${token.colorBgLayout} 100%);
    
    .form-section {
      background: ${token.colorBgContainer};
      border-radius: ${token.borderRadiusLG}px;
      box-shadow: ${token.boxShadowSecondary};
      padding: ${token.paddingLG}px;
      margin-bottom: ${token.marginLG}px;
      
      &.highlight {
        border: 2px solid ${token.colorPrimary};
      }
    }
    
    .required-indicator {
      color: ${token.colorError};
      font-weight: bold;
    }
  }
`;

export const pageGlobalStyle = (token: GlobalToken) => css`
  .ant-form-item-required::before {
    color: ${token.colorError} !important;
  }
  
  .custom-form-button {
    background: ${token.colorPrimary};
    border-color: ${token.colorPrimary};
    
    &:hover {
      background: ${token.colorPrimaryHover};
      border-color: ${token.colorPrimaryHover};
    }
  }
`;
``` 