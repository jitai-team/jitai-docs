---
sidebar_position: 6
slug: react-full-code-page
description: "React全代码页面 API 参考文档。完整的规格说明、方法和示例。"
---

# React全代码页面
React全代码页面是 JitWeb 框架中提供最大开发灵活性的页面类型，基于 React 技术栈实现完全自定义的代码开发。它负责承载复杂业务逻辑、高度定制化界面和特殊技术需求，支持 TypeScript 和 JavaScript 开发，提供完整的页面生命周期管理和事件系统。

React全代码页面元素分层结构为 Meta（pages.Meta） → Type（pages.NormalType） → 实例。开发者可通过 JitAi 的可视化开发工具快捷地创建React全代码页面实例元素。

当然，开发者也可以创建自己的 Type 元素，或者在自己的 App 中改写 JitAi 官方提供的 pages.NormalType 元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
testFullCodePage/              # 页面名称（可自定义）
├── e.json                     # 元素声明文件
└── index.tsx                  # 前端实现文件
```

#### e.json 文件
```json title="元素声明文件"
{
  "title": "测试React全代码页面",
  "type": "pages.NormalType",
  "frontBundleEntry": "./index.tsx",
  "outputName": "index",
  "tag": ""
}
```

## 方法接口 {#methods}

### 页面生命周期方法
提供React页面的生命周期管理和数据操作方法。

#### 前端实现文件
```tsx title="页面实现示例"
import { Button, message } from 'antd';
import { Jit } from 'jit';

// Render 是页面的渲染器，UI 部分在这里实现，它是一个 React 组件
const Render = (props) => {
    const page = props.page;

    const handleClick = () => {
        message.success(page.getData());
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>React全代码页面示例</h1>
            <Button type="primary" onClick={handleClick}>
                获取数据
            </Button>
        </div>
    );
};

// PageCls 是页面逻辑处理类，继承自 Jit.BasePage
class PageCls extends Jit.BasePage {
    async init() {
        console.log('页面初始化');
        await this.loadComponents();
        this.bindEvent();
    }

    getData() {
        return '页面数据获取成功！';
    }

    bindEvent() {
        // 绑定页面事件
    }

    destroy() {
        console.log('页面销毁');
        super.destroy();
    }
}

export { Render, PageCls };
```

#### 调用示例
```javascript title="门户中引用页面"
// 在门户配置中引用页面
const shellConfig = {
    pages: [
        {
            path: '/test-page',
            element: 'pages.testFullCodePage'
        }
    ]
};
```

## 元素配置
### e.json 配置
| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| title | string | 是 | - | 页面标题，用于显示和识别 |
| type | string | 是 | - | 页面类型，固定为 "pages.NormalType" |
| frontBundleEntry | string | 是 | - | 前端入口文件路径，相对于页面目录 |
| outputName | string | 是 | - | 输出文件名，通常为 "index" |
| tag | string | 否 | "" | 页面标签，用于分类管理 |

### 前端实现文件配置
前端实现文件必须导出两个核心组件：

- **Render**: React 函数组件，负责页面 UI 渲染，接收 `{ page }` 作为 props
- **PageCls**: 页面逻辑类，继承自 Jit.BasePage，负责业务逻辑处理

### 模板继承机制
React全代码页面支持模板继承，可以继承 Type 元素的 Render 和 PageCls 实现：

```typescript title="模板继承规则"
// 优先级：实例自定义 > Type模板 > Meta基础实现
const PageClass = PageCls || PageTemplate?.PageCls || Jit.BasePage;
const PageRender = Render || PageTemplate?.Render;
```

## 方法 
### init
页面初始化方法，在页面加载时自动调用。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| 无参数 | - | - | - | - |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 异步初始化完成 |

#### 使用示例
```typescript title="页面初始化"
class PageCls extends Jit.BasePage {
    async init() {
        // 加载页面组件
        await this.loadComponents();
        
        // 绑定事件监听
        this.bindEvent();
        
        // 加载页面数据
        await this.loadData();
    }
    
    async loadData() {
        try {
            const data = await this.app.request('/api/page-data');
            this.publishEvent('dataLoaded', { data });
        } catch (error) {
            console.error('数据加载失败:', error);
        }
    }
}
```

### loadComponents
自动加载页面下的所有组件实例，这是 NormalType 页面的核心特性。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| 无参数 | - | - | - | - |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 组件加载完成 |

#### 使用示例
```typescript title="组件自动加载"
class PageCls extends Jit.BasePage {
    async loadComponents() {
        // 获取页面下的所有组件元素
        const data = await this.app.findElementByTlPath(this.ePath);
        const componentList = data.filter(
            (n) =>
                n.app.name === data[0]?.app.name &&
                n.define.fullName.startsWith(`${this.fullName}.components`)
        );
        
        // 逐一实例化组件并绑定到页面
        for (const component of componentList) {
            const compName = component.define.fullName.split('.').pop();
            const { ComponentCls, compConfig } = await this.app.getElement(
                component.define.fullName
            );
            
            const compIns = new ComponentCls({
                ...compConfig,
                name: compName,
            });
            
            compIns.bindApp(this.app);
            compIns.bindPage(this);
            
            // 将组件实例挂载到页面
            this[compName] = compIns;
        }
    }
}
```

### bindEvent
绑定页面事件，在 init 方法中调用。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| 无参数 | - | - | - | - |

#### 返回值
| 类型 | 说明 |
|------|------|
| void | 同步执行完成 |

#### 使用示例
```typescript title="事件绑定"
class PageCls extends Jit.BasePage {
    bindEvent() {
        // 绑定组件间交互事件
        if (this.searchForm && this.dataTable) {
            this.searchForm.on('search', (params) => {
                this.dataTable.query(params);
            });
        }
        
        // 绑定页面级事件
        this.subscribeEvent('globalRefresh', this.handleGlobalRefresh.bind(this));
    }
    
    handleGlobalRefresh() {
        // 刷新页面数据
        this.refreshAllData();
    }
}
```

### destroy
页面销毁方法，在页面卸载时自动调用，用于清理资源。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| 无参数 | - | - | - | - |

#### 返回值
| 类型 | 说明 |
|------|------|
| void | 同步执行完成 |

#### 使用示例
```typescript title="资源清理"
class PageCls extends Jit.BasePage {
    destroy() {
        // 清理定时器
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // 移除事件监听
        this._eventHandleMap?.clear();
        
        // 调用父类销毁方法
        super.destroy();
    }
}
```

### subscribeEvent
订阅页面级全局事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| messageName | string &#124; symbol | 是 | - | 事件名称 |
| callback | Handler&lt;T&gt; | 是 | - | 事件回调函数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| string | 事件处理器 ID，用于取消订阅 |

#### 使用示例
```typescript title="事件订阅"
class PageCls extends Jit.BasePage {
    async init() {
        // 订阅数据变更事件
        const handlerId = this.subscribeEvent('dataChanged', (event) => {
            console.log('数据已变更:', event.data);
            this.refreshView();
        });
        
        // 保存handlerId用于后续取消订阅
        this.dataChangeHandlerId = handlerId;
    }
}
```

### publishEvent
发布页面级全局事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| messageName | string &#124; symbol | 是 | - | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | - | 事件附加数据 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;any&gt; | 事件发布结果 |

#### 使用示例
```typescript title="事件发布"
class PageCls extends Jit.BasePage {
    async saveData(data) {
        try {
            await this.app.request('/api/save', { data });
            
            // 发布数据保存成功事件
            await this.publishEvent('dataSaved', {
                data,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            await this.publishEvent('saveError', { error });
        }
    }
}
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| handlerId | string | 是 | - | 事件处理器 ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| boolean | 取消订阅是否成功 |

#### 使用示例
```typescript title="取消事件订阅"
class PageCls extends Jit.BasePage {
    destroy() {
        // 取消事件订阅
        if (this.dataChangeHandlerId) {
            this.unSubscribeEvent(this.dataChangeHandlerId);
        }
        
        super.destroy();
    }
}
```

### off
直接取消事件监听。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| handlerId | string | 是 | - | 事件处理器ID |

#### 返回值
| 类型 | 说明 |
|------|------|
| boolean | 取消监听是否成功 |

#### 使用示例
```typescript title="取消事件监听"
class PageCls extends Jit.BasePage {
    cleanup() {
        // 直接取消事件监听
        if (this.eventHandlerId) {
            this.off(this.eventHandlerId);
        }
    }
}
```

### newVariable
创建新的数据类型变量实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| varConfig | DataTypeConfig | 是 | - | 变量配置对象 |
| value | any | 否 | - | 初始值 |

#### 返回值
| 类型 | 说明 |
|------|------|
| DataType | 数据类型实例 |

#### 使用示例
```typescript title="创建变量"
class PageCls extends Jit.BasePage {
    initVariables() {
        // 创建文本变量
        this.userName = this.newVariable({
            dataType: 'Stext',
            name: 'userName',
            title: '用户名'
        }, '张三');
        
        // 创建数字变量
        this.userAge = this.newVariable({
            dataType: 'Numeric',
            name: 'userAge',
            title: '年龄',
            decimal: 0
        }, 25);
    }
}
```

### newComponent
创建新的组件实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| type | string | 是 | - | 组件类型标识 |
| createCompConfig | any | 是 | - | 组件创建配置 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;Component&gt; | 组件实例 |

#### 使用示例
```typescript title="创建组件"
class PageCls extends Jit.BasePage {
    async createDynamicTable() {
        // 动态创建表格组件
        const tableComp = await this.newComponent('components.Table', {
            name: 'dynamicTable',
            title: '动态表格',
            columns: [
                { key: 'name', title: '姓名' },
                { key: 'age', title: '年龄' }
            ]
        });
        
        this.dynamicTable = tableComp;
        return tableComp;
    }
}
```

### getUIContext
获取页面 UI 上下文信息，包含函数列表和变量列表。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| 无参数 | - | - | - | - |

#### 返回值
| 类型 | 说明 |
|------|------|
| Object | 包含 functionList 和 variables 的上下文对象 |

#### 使用示例
```typescript title="获取UI上下文"
class PageCls extends Jit.BasePage {
    getPageContext() {
        const context = this.getUIContext();
        console.log('页面函数列表:', context.functionList);
        console.log('页面变量列表:', context.variables);
        return context;
    }
    
    // 扩展UI上下文
    getUIContext() {
        return {
            functionList: [
                { name: 'saveData', title: '保存数据' },
                { name: 'loadData', title: '加载数据' }
            ],
            variables: [
                { dataType: 'Stext', name: 'userName', title: '用户名' },
                { dataType: 'Numeric', name: 'userAge', title: '年龄' }
            ]
        };
    }
}
```

### sendAiMessage
发送AI消息（需要配置AI助手）。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| message | string | 是 | - | 发送的消息内容 |
| inNewChat | number | 否 | 0 | 是否在新对话中发送 |

#### 返回值
| 类型 | 说明 |
|------|------|
| void | 无返回值 |

#### 使用示例
```typescript title="AI消息发送"
class PageCls extends Jit.BasePage {
    async requestAiHelp() {
        // 向AI助手发送消息
        await this.sendAiMessage('请帮我分析这个页面的数据趋势', 1);
    }
}
```

### getVariableValue
获取变量值。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| varName | string &#124; DataType | 是 | - | 变量名或变量实例 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 变量值 |

#### 使用示例
```typescript title="获取变量值"
class PageCls extends Jit.BasePage {
    getData() {
        // 获取页面变量值
        const userName = this.getVariableValue('userName');
        
        // 获取组件变量值
        const tableData = this.getVariableValue('dataTable.selectedRows');
        
        return { userName, tableData };
    }
}
```

## 属性
### app
当前应用实例，提供应用级别的方法和数据访问。

```typescript title="应用实例使用"
class PageCls extends Jit.BasePage {
    async fetchUserData() {
        // 通过app获取服务元素
        const userService = await this.app.getElement('services.UserService');
        return await userService.getUserList();
    }
}
```

### fullName
页面元素的完整名称标识。

```typescript title="获取页面标识"
class PageCls extends Jit.BasePage {
    getPageInfo() {
        console.log('当前页面:', this.fullName);
        return this.fullName;
    }
}
```

### title
页面标题。

### name
页面名称。

### ePath
页面元素的路径信息。

### pagePerm
页面权限信息，用于权限控制。

```typescript title="权限检查"
class PageCls extends Jit.BasePage {
    checkPermission(action: string) {
        return this.pagePerm?.[action] === true;
    }
    
    renderControls() {
        if (!this.checkPermission('edit')) {
            return null;
        }
        return <Button>编辑</Button>;
    }
}
```

### aiConfig
AI配置信息，包含AI助手设置。

```typescript title="AI配置检查"
class PageCls extends Jit.BasePage {
    isAiEnabled() {
        return this.aiConfig?.useAi === 1;
    }
}
```

## 高级特性
### 生命周期管理
页面具有完整的生命周期管理机制，由 PageWrapper 自动处理。

#### 配置示例
```typescript title="生命周期流程"
// 1. 页面实例化
const page = new PageCls(pageDefine);

// 2. 自动调用init方法
await page.init();

// 3. 渲染页面
<PageRender page={page} />

// 4. 页面卸载时自动调用destroy
useUnmount(() => page?.destroy());
```

### 组件集成
React全代码页面通过 loadComponents 方法实现与子组件的自动集成。

#### 配置示例
```text title="页面目录结构"
testPage/
├── e.json
├── index.tsx
└── components/
    ├── dataTable/
    │   └── e.json
    └── searchForm/
        └── e.json
```

```typescript title="组件使用"
const Render = ({ page }) => {
    return (
        <div>
            {/* 使用自动加载的组件 */}
            {page.searchForm?.render()}
            {page.dataTable?.render()}
        </div>
    );
};

class PageCls extends Jit.BasePage {
    bindEvent() {
        // 配置组件间交互
        if (this.searchForm && this.dataTable) {
            this.searchForm.on('search', (params) => {
                this.dataTable.query(params);
            });
        }
    }
}
```

### 状态管理
基于事件系统实现页面级状态管理。

#### 配置示例
```typescript title="状态管理"
class PageCls extends Jit.BasePage {
    async init() {
        this.state = {
            loading: false,
            data: null,
            selectedItems: []
        };
        
        // 订阅状态变更事件
        this.subscribeEvent('stateChange', this.handleStateChange.bind(this));
        
        await super.init();
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.publishEvent('stateChange', { state: this.state });
    }
    
    handleStateChange(event) {
        // 触发UI重新渲染
        this.publishEvent('uiUpdate', event.state);
    }
}

const Render = ({ page }) => {
    const [state, setState] = useState(page.state);
    
    useEffect(() => {
        const handlerId = page.subscribeEvent('uiUpdate', (event) => {
            setState(event.state);
        });
        
        return () => page.unSubscribeEvent(handlerId);
    }, []);
    
    return (
        <div>
            {state.loading ? <Spin /> : <Content data={state.data} />}
        </div>
    );
};
```

### 变量系统
利用 newVariable 方法创建类型化变量，实现数据验证和处理。

#### 配置示例
```typescript title="变量系统"
class PageCls extends Jit.BasePage {
    async init() {
        // 创建表单变量
        this.formData = this.newVariable({
            dataType: 'JitDict',
            name: 'formData',
            title: '表单数据',
            variableList: [
                { dataType: 'Stext', name: 'userName', title: '用户名' },
                { dataType: 'Numeric', name: 'age', title: '年龄' },
                { dataType: 'Phone', name: 'phone', title: '手机号' }
            ]
        });
        
        // 监听变量值变化
        this.formData.on('valueChange', this.handleFormChange.bind(this));
        
        await super.init();
    }
    
    handleFormChange(event) {
        // 表单数据验证
        const isValid = this.validateForm(event.value);
        this.publishEvent('formValidation', { isValid, data: event.value });
    }
    
    validateForm(data) {
        return data.userName && data.age > 0 && data.phone;
    }
}
``` 
