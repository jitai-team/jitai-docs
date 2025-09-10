---
slug: button
---
# 按钮
按钮是基础交互组件，负责触发各种操作和事件。它基于Ant Design Button组件实现用户交互功能，支持多种按钮样式、状态显示、权限控制和条件显示，提供异步操作和加载状态反馈能力。

按钮元素分层结构为Meta（components.Meta） → Type（components.Button） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建按钮实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.ButtonType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
pages/
└── TestPage/
    ├── e.json
    ├── scheme.json
    └── page.tsx
```

```json title="pages/TestPage/scheme.json - 按钮组件配置"
{
  "components": [
    {
      "fullName": "components.Button",
      "type": "components.Button", 
      "name": "submitBtn",
      "title": "提交按钮",
      "config": {
        "requireElements": [],
        "name": "提交",
        "color": "",
        "icon": "check",
        "type": "primary",
        "size": "16px",
        "overbold": false,
        "showTitle": true
      },
      "showTitle": true
    }
  ]
}
```

```tsx title="pages/TestPage/page.tsx - 调用示例"
import { useEffect } from 'react';

export default function TestPage() {
  const submitBtn = app.getElement('submitBtn');

  useEffect(() => {
    // 订阅按钮点击事件
    submitBtn.subscribeEvent('click', async () => {
      console.log('按钮被点击');
      // 执行提交逻辑
    });
  }, []);

  return <div>{/* 页面内容 */}</div>;
}
```

### 配置属性说明
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 按钮标题文本 | 按钮 | 是 |
| color | string | 自定义颜色 | - | 否 |
| icon | string | 图标名称 | - | 否 |
| type | string | 按钮类型：default &#124; primary &#124; ghost &#124; dashed &#124; link &#124; solid &#124; outline &#124; none | primary | 否 |
| size | string | 字体大小，如16px | 17px | 否 |
| overbold | boolean | 是否加粗显示 | false | 否 |
| showTitle | boolean | 是否显示标题 | true | 否 |
| requireElements | requireElement[] | 依赖元素配置 | `[]` | 否 |

## 变量
组件变量是运行时的业务数据，具有特定的数据类型，可以在代码中访问和操作。

### btnTitle
只读的按钮标题变量，类型为STEXT。存储当前按钮的显示文本，会与配置中的`name`字段同步。

```tsx title="获取按钮标题"
const button = app.getElement('myButton');
console.log(button.btnTitle.value); // 输出当前按钮标题
```

## 方法 
### edit
修改按钮标题并更新显示。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| btnTitle | string | 新的按钮标题 | - | 是 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="动态修改按钮标题"
const button = app.getElement('myButton');

// 修改按钮标题
await button.edit('新标题');
```

### publishEvent
发送组件事件消息。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | Record&lt;string, any&gt; | 额外参数 | - | 否 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="发送自定义事件"
const button = app.getElement('myButton');

// 发送自定义事件
await button.publishEvent('customEvent', { data: 'test' });
```

### subscribeEvent
订阅组件事件消息。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
string - 事件处理器ID

#### 使用示例
```tsx title="订阅按钮事件"
const button = app.getElement('myButton');

// 订阅点击事件
const handlerId = button.subscribeEvent('click', async (data) => {
  console.log('按钮被点击', data);
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 事件处理器ID | - | 是 |

#### 返回值
boolean

#### 使用示例
```tsx title="取消事件订阅"
const button = app.getElement('myButton');

button.unSubscribeEvent(handlerId);
```

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | Partial&lt;T & `{ requireElements: requireElement[] }`&gt; | 新配置对象 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 返回值
void

#### 使用示例
```tsx title="更新按钮配置"
const button = app.getElement('myButton');

// 部分更新配置
button.setConfig({ type: 'primary', size: '18px' });

// 完全替换配置
button.setConfig(newConfig, true);
```

### newVariable
创建组件变量实例。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| varConfig | DataTypeConfig | 变量配置 | - | 是 |

#### 返回值
BaseDataType

### runCode
执行代码字符串。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码 | - | 是 |

#### 返回值
any

### getPermConfig
获取组件权限配置。

#### 返回值
Record&lt;string, any&gt; &#124; undefined

### bindApp
绑定应用实例。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| app | App | 应用实例 | - | 是 |

#### 返回值
void

### bindPage
绑定页面实例。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| page | BasePage | 页面实例 | - | 是 |

#### 返回值
void

### getEventKey
生成组件事件的唯一键名。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| eventName | string | 事件名称 | - | 是 |

#### 返回值
string

### initVariables
初始化组件变量实例。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| dataTypeList | BaseDataType[] | 变量定义列表 | - | 是 |

#### 返回值
void

### getVariableList
获取组件变量定义列表（静态方法）。

#### 返回值
VariableConfig[]

### getFuncList
获取组件方法定义列表（静态方法）。

#### 返回值
FuncConfig[]

### getEventList
获取组件事件定义列表（静态方法）。

#### 返回值
EventConfig[]

### destroy
销毁组件实例并清理资源。

#### 返回值
void

## 属性
组件属性是实例对象的基础元数据，用于标识和管理组件。

### name
组件实例名称，string类型。

### title
组件显示标题，string类型。

### config
组件配置对象，包含所有配置参数。

### compType
组件分类类型标识。

### showTitle
是否显示组件标题，boolean类型。

### type
组件类型标识字符串。

### app
当前应用实例，App类型。

### page
当前页面实例，BasePage类型。

## 事件
### click
按钮点击后触发的事件。

#### 参数详解
事件携带数据为btnTitle变量的值。

#### 使用示例
```tsx title="处理按钮点击事件"
const button = app.getElement('myButton');

button.subscribeEvent('click', async (data) => {
  console.log('按钮标题:', data.btnTitle);
  
  // 执行业务逻辑
  const result = await someBusinessAction();
  
  if (result.success) {
    // 更新按钮状态
    await button.edit('操作成功');
  }
});
```

## 高级特性
### 权限控制
按钮组件支持基于权限配置的显示控制。当权限配置中`permitButton`数组为空时，按钮不会显示。

```tsx title="权限控制示例"
const button = app.getElement('myButton');
const permConfig = button.getPermConfig();

// 检查按钮权限
if (permConfig?.permitButton?.length === 0) {
  console.log('用户无权限查看此按钮');
}
```

### 样式定制
按钮支持多种样式类型和自定义样式配置。

```json title="样式配置示例"
{
  "config": {
    "type": "ghost",
    "color": "#ff6b6b", 
    "size": "20px",
    "overbold": true,
    "icon": "star"
  }
}
```

### 事件通信
按钮组件支持发布订阅模式的事件通信，可以与其他组件进行数据交互。

```tsx title="组件间通信示例"
const button = app.getElement('submitButton');
const table = app.getElement('dataTable');

// 按钮点击后刷新表格
button.subscribeEvent('click', async () => {
  await table.publishEvent('refresh');
});
``` 