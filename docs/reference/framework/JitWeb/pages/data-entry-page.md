---
sidebar_position: 4
slug: data-entry-page
---

# 数据录入页面
数据录入页面是专门用于创建表单数据录入界面的页面类型，基于网格布局架构实现可视化表单设计和数据提交功能。它负责表单组件的布局管理、数据模型绑定和用户交互处理，支持可视化配置的表单字段排列、验证规则和提交流程。

数据录入页面元素分层结构为Meta（pages.Meta） → Type（pages.FormPageType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建数据录入页面实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的pages.FormPageType元素，以实现自己的封装。

## 快速开始
### 创建实例元素
#### 目录结构
```title="数据录入页面实例目录结构"
testDataEntryPage/
├── e.json              # 元素配置文件
├── scheme.json         # 页面布局和组件配置
├── page.ts            # 页面逻辑代码
├── PageRender.tsx     # 页面渲染组件
├── page.style.ts      # 页面样式文件
└── index.ts           # 入口文件
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "pages.FormPageType",
  "resourceName": "index",
  "title": "客户信息录入",
  "dataModel": "models.CustomerModel",
  "platform": "PC",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### scheme.json文件
```json title="scheme.json配置示例"
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
      "title": "表单组件",
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
      "title": "当前用户",
      "dataType": "Stext",
      "value": ""
    }
  ],
  "functionList": [
    {
      "name": "validateForm",
      "title": "表单验证",
      "args": [
        {
          "name": "formData",
          "title": "表单数据",
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

#### page.style.ts文件
```typescript title="page.style.ts样式配置"
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

#### page.ts文件
```typescript title="page.ts实现示例"
import { Jit } from 'jit';
import schemeJson from './scheme.json';

type BaseComponent = InstanceType<typeof Jit.BaseComponent>;

class PageCls extends Jit.GridPage {
    Form1!: BaseComponent;
    currentUser!: InstanceType<typeof Jit.datatypes.Stext>;
    scheme: Record<string, any> = schemeJson;
    
    bindEvent() {
        // 绑定表单提交事件
        this.Form1.subscribeEvent("afterSubmit", async (e) => {
            console.log("表单提交成功:", e.data);
            this.refresh();
        });
        
        // 绑定表单调用事件
        this.Form1.subscribeEvent("afterCall", async () => {
            console.log("表单调用完成");
        });
    }
    
    validateForm(formData: any): boolean {
        // 自定义验证逻辑
        return formData.custName && formData.phone;
    }
}

export default PageCls;
```

#### 调用示例
```typescript title="在其他页面中调用数据录入页面"
// 跳转到数据录入页面
this.app.openPage('pages.CustomerDataEntry');

// 在模态框中打开数据录入页面
this.app.openModal({
    element: 'pages.CustomerDataEntry',
    title: '新增客户',
    width: 800,
    height: 600
});

// 带参数跳转
this.app.openPage('pages.CustomerDataEntry', {
    userId: '123',
    deptId: 'dept001'
});
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| type | string | 是 | - | 固定值"pages.FormPageType" |
| title | string | 是 | - | 页面标题 |
| dataModel | string | 否 | - | 关联的数据模型fullName |
| platform | string | 否 | "PC" | 平台类型，支持PC、Mobile |
| resourceName | string | 否 | "index" | 资源名称 |
| frontBundleEntry | string | 否 | "./index.ts" | 前端入口文件路径 |
| outputName | string | 否 | "index" | 输出名称 |

### scheme.json配置
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| layout | Layout[] | 是 | [] | 组件布局配置数组 |
| componentList | object[] | 是 | [] | 页面组件配置列表 |
| variableList | object[] | 否 | [] | 页面变量列表 |
| functionList | object[] | 否 | [] | 页面函数列表 |
| matchUarParamsVariableNameList | string[] | 否 | [] | 匹配URL参数的变量名列表 |
| autoIncrementId | number | 否 | 1 | 自增ID |
| aiConfig | object | 否 | - | AI配置 |

#### Layout布局配置
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| i | string | 是 | - | 组件唯一标识 |
| x | number | 是 | - | 水平位置（网格单位） |
| y | number | 是 | - | 垂直位置（网格单位） |
| w | number | 是 | - | 宽度（网格单位） |
| h | number | 是 | - | 高度（网格单位） |
| minW | number | 否 | - | 最小宽度 |
| minH | number | 否 | - | 最小高度 |
| maxW | number | 否 | - | 最大宽度 |
| maxH | number | 否 | - | 最大高度 |
| static | boolean | 否 | false | 是否静态（不可拖拽） |
| isDraggable | boolean | 否 | true | 是否可拖拽 |
| isResizable | boolean | 否 | true | 是否可调整大小 |

## 方法
### init
初始化页面，加载配置、变量和组件。

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 初始化完成Promise |

#### 使用示例
```typescript title="页面初始化"
class PageCls extends Jit.GridPage {
    async init() {
        await super.init();
        console.log('页面初始化完成，isReady:', this.isReady);
    }
}
```

### bindEvent
绑定页面事件，在页面初始化后自动调用。

#### 使用示例
```typescript title="事件绑定"
bindEvent() {
    // 绑定表单提交事件
    this.Form1.subscribeEvent("afterSubmit", async (e) => {
        console.log('提交的数据:', e.data);
    });
    
    // 绑定页面刷新事件
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

## 属性
### scheme
页面配置方案对象。

- **类型**: `IScheme`
- **说明**: 包含layout、componentList、variableList等配置信息

### compInsList
组件实例列表。

- **类型**: `any[]`
- **说明**: 页面所有组件实例的数组

### compInsDict
组件实例字典。

- **类型**: `Record<string, any>`
- **说明**: 以组件名为key的组件实例字典

### isReady
页面就绪状态。

- **类型**: `boolean`
- **说明**: 标识页面是否已完成初始化

### extend
继承的页面元素名称。

- **类型**: `string | undefined`
- **说明**: 当前页面继承的父页面fullName

### app
应用实例。

- **类型**: `App`
- **说明**: 当前运行时应用实例

### name
页面名称。

- **类型**: `string`
- **说明**: 页面元素名称

### title
页面标题。

- **类型**: `string`
- **说明**: 页面显示标题

### fullName
页面完整名称。

- **类型**: `string`
- **说明**: 页面元素的完整路径名

### ePath
页面元素路径。

- **类型**: `string`
- **说明**: 页面元素在文件系统中的路径

### pagePerm
页面权限配置。

- **类型**: `Record<string, any> | undefined`
- **说明**: 页面的权限控制配置

### aiConfig
AI配置。

- **类型**: `object`
- **说明**: 页面的AI助手配置信息

## 高级特性
### 页面继承
数据录入页面支持继承机制，可以基于已有页面创建新页面。

#### 配置示例
```json title="继承配置"
{
  "type": "pages.FormPageType",
  "title": "高级客户录入页面",
  "extend": "pages.BasicCustomerForm",
  "dataModel": "models.CustomerModel"
}
```

#### 使用示例
```typescript title="继承实现"
class AdvancedPageCls extends Jit.GridPage {
    constructor(info: any = {}) {
        super(info);
        // 继承的页面会自动合并父页面的配置
    }
    
    bindEvent() {
        super.bindEvent?.(); // 调用父页面事件绑定
        
        // 添加新的事件绑定
        this.Form1.subscribeEvent("beforeSubmit", async (e) => {
            // 高级验证逻辑
            return this.validateAdvancedRules(e.data);
        });
    }
}
```

### URL参数绑定
通过matchUarParamsVariableNameList配置，页面变量可以自动从URL参数获取值。

#### 配置示例
```json title="URL参数绑定配置"
{
  "scheme": {
    "matchUarParamsVariableNameList": ["userId", "deptId"],
    "variableList": [
      {
        "name": "userId",
        "title": "用户ID",
        "dataType": "Stext"
      },
      {
        "name": "deptId", 
        "title": "部门ID",
        "dataType": "Stext"
      }
    ]
  }
}
```

#### 使用示例
```typescript title="URL参数使用"
// 页面URL: /pages/CustomerForm?userId=123&deptId=dept001
class PageCls extends Jit.GridPage {
    bindEvent() {
        // 页面初始化时，userId和deptId自动从URL获取值
        console.log('用户ID:', this.userId.value); // 输出: 123
        console.log('部门ID:', this.deptId.value); // 输出: dept001
        
        // 监听URL变化
        this.subscribeEvent('URL_CHANGED', () => {
            this.refreshPageVariable(); // 重新从URL获取参数
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