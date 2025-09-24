---
sidebar_position: 7
slug: vue-full-code-page
---

# Vue Full Code Page
Vue Full Code Page is a full code page type based on the Vue.js technology stack, integrating the Element Plus UI component library, supporting Vue 3's Composition API and reactive data system. It provides a complete Vue development environment for developers familiar with Vue, allowing the use of third-party plugins and toolchains from the Vue ecosystem, suitable for projects or teams that require Vue technology stack selection.

The Vue Full Code Page element hierarchy is Meta (pages.Meta) → Type (pages.VueType) → Instance. Developers can quickly create Vue Full Code Page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.VueType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
testVue/                    # Vue page element name (customizable)
├── e.json                  # Element configuration file
├── index.ts                # Entry file, exports Render and PageCls
├── page.ts                 # Page logic class file (optional)
└── App.vue                 # Vue component file
```

#### e.json File
```json title="Element Configuration File"
{
  "title": "Test Vue",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### Business Logic Code
Page logic class file (page.ts):

```typescript title="Page Logic Class Implementation"
import { Jit } from 'jit';

export default class extends Jit.BasePage {
    
    async init() {
        await this.loadComponents();
        this.bindEvent();
    }
    
    async loadComponents() {
        // Load page components
        console.log('Loading page components');
    }
    
    bindEvent() {
        // Bind events
        console.log('Binding page events');
    }
    
    onLoaded() {
        console.log('Page loaded');
    }
    
    async onUnload() {
        console.log('Page unloaded');
    }
    
    refresh() {
        console.log('Page refreshed');
    }
}
```

Vue component file (App.vue):

```javascript title="Vue Component Implementation"
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Current time: {{ currentTime }}
    </p>
    <el-button @click="updateTime">Update Time</el-button>
    <el-button @click="sendMessage">Send Event</el-button>
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
  // Publish event through page instance
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

Entry file (index.ts):

```typescript title="Entry File"
import PageCls from './page';

async function Render(props: any) {
    const { createApp } = await import('vue');
    const { default: ElementPlus } = await import('element-plus');
    const { default: App } = await import('./App.vue');
    
    const app = createApp(App);
    app.use(ElementPlus);
    
    // Inject page instance into Vue application
    app.config.globalProperties.$page = props.page;
    app.config.globalProperties.$app = props.page.app;
    
    return app;
}

export { Render, PageCls };
```

#### Usage Example
Call Vue page in portal or other pages:

```typescript title="Page Usage Example"
// Get page element through application
const vuePageElement = await app.getElement('pages.testVue');

// Call page methods
await vuePageElement.page.init();
```

## Element Configuration
### e.json Configuration
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| title | string | Yes | - | Page title |
| type | string | Yes | pages.VueType | Page type, fixed value |
| frontBundleEntry | string | Yes | ./index.ts | Frontend entry file path |
| outputName | string | No | index | Output file name |
| extend | string | No | - | Inherited page fullName |
| aiConfig | object | No | - | AI configuration options |

### Business Configuration File Configuration
Vue Full Code Page does not require additional business configuration files, all configurations are implemented through code in Vue components.

## Methods
### init
Initialize the page, load components and bind events.

```typescript title="init Usage Example"
export default class extends Jit.BasePage {
    async init() {
        await this.loadComponents();
        this.bindEvent();
        console.log('Page initialization completed');
    }
}
```

### loadComponents
Load page-related component instances.

```typescript title="loadComponents Usage Example"
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
Bind page event handlers.

```typescript title="bindEvent Usage Example"
export default class extends Jit.BasePage {
    bindEvent() {
        // Subscribe to time update events
        this.subscribeEvent('TIME_UPDATE', (e) => {
            console.log('Received time update event:', e.time);
        });
    }
}
```

### subscribeEvent
Subscribe to event messages.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| messageName | string &#124; symbol | Yes | - | Event name |
| callback | Handler&lt;T&gt; | Yes | - | Event callback function |

#### Return Value
Return type: `string` (Event handler ID)

#### Usage Example
```typescript title="subscribeEvent Usage Example"
export default class extends Jit.BasePage {
    onLoaded() {
        // Subscribe to user login events
        const handlerId = this.subscribeEvent('USER_LOGIN', (e) => {
            console.log('User logged in:', e.userData);
            this.refresh();
        });
        
        // Save handler ID for subsequent unsubscription
        this.loginHandlerId = handlerId;
    }
}
```

### publishEvent
Publish event messages.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| messageName | string &#124; symbol | Yes | - | Event name |
| ex | Record&lt;string, any&gt; | No | {} | Additional data |

#### Return Value
Return type: `Promise&lt;void&gt;`

#### Usage Example
```typescript title="publishEvent Usage Example"
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
Unsubscribe from events.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| handlerId | string | Yes | - | Event handler ID |

#### Usage Example
```typescript title="unSubscribeEvent Usage Example"
export default class extends Jit.BasePage {
    async onUnload() {
        // Unsubscribe from events
        if (this.loginHandlerId) {
            this.unSubscribeEvent(this.loginHandlerId);
        }
    }
}
```

### newComponent
Create component instances.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| type | string | Yes | - | Component type |
| createCompConfig | any | Yes | - | Component configuration |

#### Return Value
Return type: `Promise&lt;any&gt;`

#### Usage Example
```typescript title="newComponent Usage Example"
export default class extends Jit.BasePage {
    async createButton() {
        const buttonComp = await this.newComponent('components.Button', {
            title: 'Dynamic Button',
            onClick: () => console.log('Button clicked')
        });
        return buttonComp;
    }
}
```

### newVariable
Create data type variables.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| varConfig | DataTypeConfig | Yes | - | Variable configuration |
| value | any | No | undefined | Initial value |

#### Return Value
Return type: Data type instance

#### Usage Example
```typescript title="newVariable Usage Example"
export default class extends Jit.BasePage {
    createVariables() {
        // Create text variable
        this.nameVar = this.newVariable({
            dataType: 'Stext',
            name: 'name',
            title: 'Name'
        }, 'John');
        
        // Create numeric variable
        this.ageVar = this.newVariable({
            dataType: 'Numeric',
            name: 'age',
            title: 'Age'
        }, 25);
    }
}
```

### getVariableValue
Get variable values.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| varName | string &#124; DataType | Yes | - | Variable name or variable instance |

#### Return Value
Return type: `any`

#### Usage Example
```typescript title="getVariableValue Usage Example"
export default class extends Jit.BasePage {
    checkValues() {
        // Get simple variable value
        const name = this.getVariableValue('nameVar');
        
        // Get component variable value
        const buttonText = this.getVariableValue('myButton.text');
        
        console.log('Name:', name, 'Button text:', buttonText);
    }
}
```

### parseVariableInQ
Parse variables in Q expressions.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| str | string | Yes | - | Q expression string |

#### Return Value
Return type: `string`

#### Usage Example
```typescript title="parseVariableInQ Usage Example"
export default class extends Jit.BasePage {
    buildQuery() {
        const queryStr = "Q(name='{nameVar}', age__gt={ageVar})";
        const parsedQuery = this.parseVariableInQ(queryStr);
        console.log('Parsed query:', parsedQuery);
    }
}
```

### sendAiMessage
Send AI messages.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| message | string | Yes | - | Message content |
| inNewChat | number | No | 0 | Whether to send in new chat |

#### Usage Example
```typescript title="sendAiMessage Usage Example"
export default class extends Jit.BasePage {
    async askAI() {
        if (this.aiConfig?.useAi) {
            await this.sendAiMessage('Help me analyze current data', 1);
        }
    }
}
```

### getUIContext
Get UI context information.

#### Return Value
Return type: `{ functionList: FuncDefine[], variables: DataTypeConfig[] }`

#### Usage Example
```typescript title="getUIContext Usage Example"
export default class extends Jit.BasePage {
    getContext() {
        const context = this.getUIContext();
        console.log('Available functions:', context.functionList);
        console.log('Available variables:', context.variables);
    }
}
```

### destroy
Destroy page instance, clean up resources.

```typescript title="destroy Usage Example"
export default class extends Jit.BasePage {
    cleanup() {
        // Automatically called when page is destroyed, can also be called manually
        this.destroy();
    }
}
```

### off
Remove event handlers.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| handlerId | string | Yes | - | Event handler ID |

#### Usage Example
```typescript title="off Usage Example"
export default class extends Jit.BasePage {
    removeHandler() {
        if (this.someHandlerId) {
            this.off(this.someHandlerId);
        }
    }
}
```

## Properties
### name
Page name.

### title
Page title.

### fullName
Complete page name.

### ePath
Page element path.

### app
Application instance, providing global application functionality access.

| Method | Return Type | Description |
|--------|-------------|-------------|
| getElement(fullName) | Promise&lt;any&gt; | Get element instance |
| findElement(fullName) | Element[] | Find element |
| findElementByTlPath(path) | Promise&lt;Element[]&gt; | Find element by path |
| on(callback, filter) | string | Bind event listener |
| emit(event) | Promise&lt;void&gt; | Send event |
| off(handlerId) | void | Remove event listener |

### aiConfig
AI configuration information.

| Property | Type | Description |
|----------|------|-------------|
| useAi | 1 &#124; 0 | Whether AI is enabled |
| aiAssistant | string | AI assistant name |

### pagePerm
Page permission configuration.

## Advanced Features
### Vue Ecosystem Integration
Vue Full Code Page fully supports the Vue ecosystem, allowing the use of Vue Router, Vuex/Pinia, Vue plugins, etc.

#### Using Vue Router
```typescript title="Vue Router Integration Example"
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

#### Using Pinia State Management
```typescript title="Pinia Integration Example"
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

### JitAI System Integration
Vue pages can directly call JitAI services and models.

#### Calling JitAI Services
```vue title="Service Call Example"
<template>
  <div>
    <el-button @click="callService">Call Service</el-button>
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
    console.error('Service call failed:', error);
  }
};
</script>
```

#### Accessing Model Data
```vue title="Model Access Example"
<template>
  <div>
    <el-table :data="userList">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="email" label="Email" />
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
    console.error('Failed to get user data:', error);
  }
});
</script>
```

### Event System Integration
Vue pages support complete event subscription and publishing mechanisms.

#### Inter-page Communication
```typescript title="Inter-page Communication Example"
export default class extends Jit.BasePage {
    onLoaded() {
        // Subscribe to events from other pages
        this.subscribeEvent('DATA_REFRESH', (e) => {
            console.log('Received data refresh notification:', e);
            this.reloadData();
        });
    }
    
    async updateData() {
        // Notify other pages after data update
        await this.publishEvent('DATA_CHANGED', {
            source: this.fullName,
            timestamp: Date.now()
        });
    }
}
```

### Dynamic Component Loading
Supports dynamic creation and loading of components.

#### Dynamic Component Creation
```typescript title="Dynamic Component Example"
export default class extends Jit.BasePage {
    async createDynamicComponents() {
        // Create table component
        const tableComp = await this.newComponent('components.Table', {
            dataSource: 'models.UserModel',
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' }
            ]
        });
        
        // Create button component
        const buttonComp = await this.newComponent('components.Button', {
            title: 'Add User',
            onClick: this.addUser.bind(this)
        });
        
        // Save component instances to page
        this.userTable = tableComp;
        this.addButton = buttonComp;
    }
    
    async addUser() {
        // Add user logic
        console.log('Adding new user');
    }
}
```

### AI Function Integration
Supports AI assistant integration and intelligent interaction.

#### AI Configuration and Usage
```json title="AI Configuration Example"
{
  "title": "Smart Page",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "aiConfig": {
    "useAi": 1,
    "aiAssistant": "aiassistants.DataAnalyst"
  }
}
```

```typescript title="AI Function Usage"
export default class extends Jit.BasePage {
    async analyzeData() {
        if (this.aiConfig?.useAi) {
            const data = await this.getUserData();
            await this.sendAiMessage(`Analyze the following user data: ${JSON.stringify(data)}`, 1);
        }
    }
    
    onLoaded() {
        // Listen to AI message responses
        this.subscribeEvent('AI_RESPONSE', (e) => {
            console.log('AI analysis result:', e.message);
            this.displayAIResult(e.message);
        });
    }
}
```

### Page Inheritance
Vue pages support inheritance mechanism, allowing inheritance of logic and configuration from other pages.

#### Inheritance Configuration
```json title="Inheritance Page Configuration"
{
  "title": "Child Page",
  "type": "pages.VueType",
  "frontBundleEntry": "./index.ts",
  "extend": "pages.basePage"
}
```

#### Inheritance Implementation
```typescript title="Inheritance Page Logic"
// Inherit parent page's PageCls
const ParentPageCls = Jit.Pages['pages.basePage'];

export default class extends ParentPageCls {
    async init() {
        await super.init(); // Call parent class initialization
        await this.customInit(); // Child page specific initialization
    }
    
    async customInit() {
        // Child page specific logic
        console.log('Child page custom initialization');
    }
    
    bindEvent() {
        super.bindEvent(); // Inherit parent page event binding
        
        // Add child page specific events
        this.subscribeEvent('CHILD_EVENT', (e) => {
            console.log('Child page event:', e);
        });
    }
}
``` 