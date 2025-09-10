---
sidebar_position: 7
slug: vue-full-code-page
---

# Vue全代码页面
Vue全代码页面是基于Vue.js技术栈的全代码页面类型，集成Element Plus UI组件库，支持Vue 3的组合式API和响应式数据系统。它为熟悉Vue的开发者提供完整的Vue开发环境，可以使用Vue生态的第三方插件和工具链，适用于需要Vue技术栈的项目或团队技术选型。

Vue全代码页面元素分层结构为Meta（pages.Meta） → Type（pages.VueType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Vue全代码页面实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的pages.VueType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
testVue/                    # Vue页面元素名称（可自定义）
├── e.json                  # 元素配置文件
├── index.ts                # 入口文件，导出Render和PageCls
├── page.ts                 # 页面逻辑类文件（可选）
└── App.vue                 # Vue组件文件
```

#### e.json文件
```json title="元素配置文件"
{
  "title": "测试vue",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### 业务逻辑代码
页面逻辑类文件（page.ts）：

```typescript title="页面逻辑类实现"
import { Jit } from 'jit';

export default class extends Jit.BasePage {
    
    async init() {
        await this.loadComponents();
        this.bindEvent();
    }
    
    async loadComponents() {
        // 加载页面组件
        console.log('加载页面组件');
    }
    
    bindEvent() {
        // 绑定事件
        console.log('绑定页面事件');
    }
    
    onLoaded() {
        console.log('页面加载完成');
    }
    
    async onUnload() {
        console.log('页面卸载');
    }
    
    refresh() {
        console.log('页面刷新');
    }
}
```

Vue组件文件（App.vue）：

```javascript title="Vue组件实现"
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      当前时间: {{ currentTime }}
    </p>
    <el-button @click="updateTime">更新时间</el-button>
    <el-button @click="sendMessage">发送事件</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';

const msg = ref('Hello Vue!');
const currentTime = ref('');
const instance = getCurrentInstance();

const updateTime = () => {
  currentTime.value = new Date().toLocaleString();
};

const sendMessage = () => {
  // 通过页面实例发布事件
  if (instance?.appContext.app.config.globalProperties.$page) {
    instance.appContext.app.config.globalProperties.$page.publishEvent('TIME_UPDATE', {
      time: currentTime.value
    });
  }
};

onMounted(() => {
  updateTime();
});
</script>

<style scoped>
.hello {
  padding: 20px;
}

h1 {
  color: #409EFF;
}
</style>
```

入口文件（index.ts）：

```typescript title="入口文件"
import PageCls from './page';

async function Render(props: any) {
    const { createApp } = await import('vue');
    const { default: ElementPlus } = await import('element-plus');
    const { default: App } = await import('./App.vue');
    
    const app = createApp(App);
    app.use(ElementPlus);
    
    // 将页面实例注入到Vue应用中
    app.config.globalProperties.$page = props.page;
    app.config.globalProperties.$app = props.page.app;
    
    return app;
}

export { Render, PageCls };
```

#### 调用示例
在门户或其他页面中调用Vue页面：

```typescript title="页面调用示例"
// 通过应用获取页面元素
const vuePageElement = await app.getElement('pages.testVue');

// 调用页面方法
await vuePageElement.page.init();
```

## 元素配置
### e.json配置
| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | string | 是 | - | 页面标题 |
| type | string | 是 | pages.VueType | 页面类型，固定值 |
| frontBundleEntry | string | 是 | ./index.ts | 前端入口文件路径 |
| outputName | string | 否 | index | 输出文件名 |
| extend | string | 否 | - | 继承的页面fullName |
| aiConfig | object | 否 | - | AI配置选项 |

### 业务配置文件配置
Vue全代码页面不需要额外的业务配置文件，所有配置都在Vue组件中通过代码实现。

## 方法 
### init
初始化页面，加载组件并绑定事件。

```typescript title="init使用示例"
export default class extends Jit.BasePage {
    async init() {
        await this.loadComponents();
        this.bindEvent();
        console.log('页面初始化完成');
    }
}
```

### loadComponents
加载页面相关的组件实例。

```typescript title="loadComponents使用示例"
export default class extends Jit.BasePage {
    async loadComponents() {
        const data = await this.app.findElementByTlPath(this.ePath);
        const componentList = data.filter(
            (n) => n.app.name === data[0]?.app.name &&
                   n.define.fullName.startsWith(`${this.fullName}.components`)
        );
        
        for (const component of componentList) {
            const compName = component.define.fullName.split('.').pop()!;
            const { ComponentCls, compConfig } = await this.app.getElement(
                component.define.fullName
            );
            const compIns = new ComponentCls({
                ...compConfig,
                name: compName,
            });
            compIns.bindApp(this.app);
            compIns.bindPage(this);
            Reflect.set(this, compName, compIns);
        }
    }
}
```

### bindEvent
绑定页面事件处理器。

```typescript title="bindEvent使用示例"
export default class extends Jit.BasePage {
    bindEvent() {
        // 订阅时间更新事件
        this.subscribeEvent('TIME_UPDATE', (e) => {
            console.log('收到时间更新事件:', e.time);
        });
    }
}
```

### subscribeEvent
订阅事件消息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| messageName | string &#124; symbol | 是 | - | 事件名称 |
| callback | Handler&lt;T&gt; | 是 | - | 事件回调函数 |

#### 返回值
返回类型：`string`（事件处理器ID）

#### 使用示例
```typescript title="subscribeEvent使用示例"
export default class extends Jit.BasePage {
    onLoaded() {
        // 订阅用户登录事件
        const handlerId = this.subscribeEvent('USER_LOGIN', (e) => {
            console.log('用户登录:', e.userData);
            this.refresh();
        });
        
        // 保存处理器ID以便后续取消订阅
        this.loginHandlerId = handlerId;
    }
}
```

### publishEvent
发布事件消息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| messageName | string &#124; symbol | 是 | - | 事件名称 |
| ex | Record&lt;string, any&gt; | 否 | {} | 附加数据 |

#### 返回值
返回类型：`Promise&lt;void&gt;`

#### 使用示例
```typescript title="publishEvent使用示例"
export default class extends Jit.BasePage {
    async notifyDataChange() {
        await this.publishEvent('DATA_CHANGED', {
            timestamp: Date.now(),
            source: this.fullName
        });
    }
}
```

### unSubscribeEvent
取消订阅事件。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| handlerId | string | 是 | - | 事件处理器ID |

#### 使用示例
```typescript title="unSubscribeEvent使用示例"
export default class extends Jit.BasePage {
    async onUnload() {
        // 取消订阅事件
        if (this.loginHandlerId) {
            this.unSubscribeEvent(this.loginHandlerId);
        }
    }
}
```

### newComponent
创建组件实例。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| type | string | 是 | - | 组件类型 |
| createCompConfig | any | 是 | - | 组件配置 |

#### 返回值
返回类型：`Promise&lt;any&gt;`

#### 使用示例
```typescript title="newComponent使用示例"
export default class extends Jit.BasePage {
    async createButton() {
        const buttonComp = await this.newComponent('components.Button', {
            title: '动态按钮',
            onClick: () => console.log('按钮被点击')
        });
        return buttonComp;
    }
}
```

### newVariable
创建数据类型变量。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| varConfig | DataTypeConfig | 是 | - | 变量配置 |
| value | any | 否 | undefined | 初始值 |

#### 返回值
返回类型：数据类型实例

#### 使用示例
```typescript title="newVariable使用示例"
export default class extends Jit.BasePage {
    createVariables() {
        // 创建文本变量
        this.nameVar = this.newVariable({
            dataType: 'Stext',
            name: 'name',
            title: '姓名'
        }, '张三');
        
        // 创建数字变量
        this.ageVar = this.newVariable({
            dataType: 'Numeric',
            name: 'age',
            title: '年龄'
        }, 25);
    }
}
```

### getVariableValue
获取变量的值。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| varName | string &#124; DataType | 是 | - | 变量名或变量实例 |

#### 返回值
返回类型：`any`

#### 使用示例
```typescript title="getVariableValue使用示例"
export default class extends Jit.BasePage {
    checkValues() {
        // 获取简单变量值
        const name = this.getVariableValue('nameVar');
        
        // 获取组件内变量值
        const buttonText = this.getVariableValue('myButton.text');
        
        console.log('姓名:', name, '按钮文本:', buttonText);
    }
}
```

### parseVariableInQ
解析Q表达式中的变量。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| str | string | 是 | - | Q表达式字符串 |

#### 返回值
返回类型：`string`

#### 使用示例
```typescript title="parseVariableInQ使用示例"
export default class extends Jit.BasePage {
    buildQuery() {
        const queryStr = "Q(name='{nameVar}', age__gt={ageVar})";
        const parsedQuery = this.parseVariableInQ(queryStr);
        console.log('解析后的查询:', parsedQuery);
    }
}
```

### sendAiMessage
发送AI消息。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| message | string | 是 | - | 消息内容 |
| inNewChat | number | 否 | 0 | 是否在新对话中发送 |

#### 使用示例
```typescript title="sendAiMessage使用示例"
export default class extends Jit.BasePage {
    async askAI() {
        if (this.aiConfig?.useAi) {
            await this.sendAiMessage('帮我分析当前数据', 1);
        }
    }
}
```

### getUIContext
获取UI上下文信息。

#### 返回值
返回类型：`{ functionList: FuncDefine[], variables: DataTypeConfig[] }`

#### 使用示例
```typescript title="getUIContext使用示例"
export default class extends Jit.BasePage {
    getContext() {
        const context = this.getUIContext();
        console.log('可用函数:', context.functionList);
        console.log('可用变量:', context.variables);
    }
}
```

### destroy
销毁页面实例，清理资源。

```typescript title="destroy使用示例"
export default class extends Jit.BasePage {
    cleanup() {
        // 页面销毁时会自动调用，也可手动调用
        this.destroy();
    }
}
```

### off
移除事件处理器。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| handlerId | string | 是 | - | 事件处理器ID |

#### 使用示例
```typescript title="off使用示例"
export default class extends Jit.BasePage {
    removeHandler() {
        if (this.someHandlerId) {
            this.off(this.someHandlerId);
        }
    }
}
```

## 属性
### name
页面名称。

### title
页面标题。

### fullName
页面完整名称。

### ePath
页面元素路径。

### app
应用实例，提供全局应用功能访问。

| 方法 | 返回类型 | 说明 |
|------|----------|------|
| getElement(fullName) | Promise&lt;any&gt; | 获取元素实例 |
| findElement(fullName) | Element[] | 查找元素 |
| findElementByTlPath(path) | Promise&lt;Element[]&gt; | 按路径查找元素 |
| on(callback, filter) | string | 绑定事件监听器 |
| emit(event) | Promise&lt;void&gt; | 发送事件 |
| off(handlerId) | void | 移除事件监听器 |

### aiConfig
AI配置信息。

| 属性 | 类型 | 说明 |
|------|------|------|
| useAi | 1 &#124; 0 | 是否启用AI |
| aiAssistant | string | AI助手名称 |

### pagePerm
页面权限配置。

## 高级特性
### Vue生态集成
Vue全代码页面完全支持Vue生态系统，可以使用Vue Router、Vuex/Pinia、Vue插件等。

#### 使用Vue Router
```typescript title="Vue Router集成示例"
async function Render(props: any) {
    const { createApp } = await import('vue');
    const { createRouter, createWebHistory } = await import('vue-router');
    const { default: App } = await import('./App.vue');
    
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/home', component: () => import('./views/Home.vue') },
            { path: '/about', component: () => import('./views/About.vue') }
        ]
    });
    
    const app = createApp(App);
    app.use(router);
    
    return app;
}
```

#### 使用Pinia状态管理
```typescript title="Pinia集成示例"
async function Render(props: any) {
    const { createApp } = await import('vue');
    const { createPinia } = await import('pinia');
    const { default: App } = await import('./App.vue');
    
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    
    return app;
}
```

### 与JitAi系统集成
Vue页面可以直接调用JitAi的服务和模型。

#### 调用JitAi服务
```vue title="调用服务示例"
<template>
  <div>
    <el-button @click="callService">调用服务</el-button>
    <div>{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';

const result = ref('');
const instance = getCurrentInstance();

const callService = async () => {
  try {
    const app = instance?.appContext.app.config.globalProperties.$app;
    const service = await app.getElement('services.userService');
    const data = await service.getUserList();
    result.value = JSON.stringify(data);
  } catch (error) {
    console.error('调用服务失败:', error);
  }
};
</script>
```

#### 访问模型数据
```vue title="访问模型示例"
<template>
  <div>
    <el-table :data="userList">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';

const userList = ref([]);
const instance = getCurrentInstance();

onMounted(async () => {
  try {
    const app = instance?.appContext.app.config.globalProperties.$app;
    const userModel = await app.getElement('models.UserModel');
    const data = await userModel.query();
    userList.value = data.rowDatas;
  } catch (error) {
    console.error('获取用户数据失败:', error);
  }
});
</script>
```

### 事件系统集成
Vue页面支持完整的事件订阅和发布机制。

#### 页面间通信
```typescript title="页面间通信示例"
export default class extends Jit.BasePage {
    onLoaded() {
        // 订阅其他页面的事件
        this.subscribeEvent('DATA_REFRESH', (e) => {
            console.log('收到数据刷新通知:', e);
            this.reloadData();
        });
    }
    
    async updateData() {
        // 更新数据后通知其他页面
        await this.publishEvent('DATA_CHANGED', {
            source: this.fullName,
            timestamp: Date.now()
        });
    }
}
```

### 组件动态加载
支持动态创建和加载组件。

#### 动态组件创建
```typescript title="动态组件示例"
export default class extends Jit.BasePage {
    async createDynamicComponents() {
        // 创建表格组件
        const tableComp = await this.newComponent('components.Table', {
            dataSource: 'models.UserModel',
            columns: [
                { title: '姓名', field: 'name' },
                { title: '邮箱', field: 'email' }
            ]
        });
        
        // 创建按钮组件
        const buttonComp = await this.newComponent('components.Button', {
            title: '新增用户',
            onClick: this.addUser.bind(this)
        });
        
        // 将组件实例保存到页面
        this.userTable = tableComp;
        this.addButton = buttonComp;
    }
    
    async addUser() {
        // 添加用户逻辑
        console.log('添加新用户');
    }
}
```

### AI功能集成
支持AI助手集成和智能交互。

#### AI配置和使用
```json title="AI配置示例"
{
  "title": "智能页面",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "aiConfig": {
    "useAi": 1,
    "aiAssistant": "aiassistants.DataAnalyst"
  }
}
```

```typescript title="AI功能使用"
export default class extends Jit.BasePage {
    async analyzeData() {
        if (this.aiConfig?.useAi) {
            const data = await this.getUserData();
            await this.sendAiMessage(`分析以下用户数据：${JSON.stringify(data)}`, 1);
        }
    }
    
    onLoaded() {
        // 监听AI消息响应
        this.subscribeEvent('AI_RESPONSE', (e) => {
            console.log('AI分析结果:', e.message);
            this.displayAIResult(e.message);
        });
    }
}
```

### 页面继承
Vue页面支持继承机制，可以继承其他页面的逻辑和配置。

#### 继承配置
```json title="继承页面配置"
{
  "title": "子页面",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "extend": "pages.basePage"
}
```

#### 继承实现
```typescript title="继承页面逻辑"
// 继承父页面的PageCls
const ParentPageCls = Jit.Pages['pages.basePage'];

export default class extends ParentPageCls {
    async init() {
        await super.init(); // 调用父类初始化
        await this.customInit(); // 子页面特有初始化
    }
    
    async customInit() {
        // 子页面特有逻辑
        console.log('子页面自定义初始化');
    }
    
    bindEvent() {
        super.bindEvent(); // 继承父页面事件绑定
        
        // 添加子页面特有事件
        this.subscribeEvent('CHILD_EVENT', (e) => {
            console.log('子页面事件:', e);
        });
    }
}
``` 