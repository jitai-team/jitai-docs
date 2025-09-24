---
sidebar_position: 6
slug: react-full-code-page
---

# React Full Code Page
React Full Code Page is the page type that provides maximum development flexibility in the JitWeb framework, implementing fully customized code development based on the React technology stack. It is responsible for carrying complex business logic, highly customized interfaces, and special technical requirements, supporting TypeScript and JavaScript development, providing complete page lifecycle management and event system.

The React Full Code Page element hierarchy is Meta (pages.Meta) → Type (pages.NormalType) → Instance. Developers can quickly create React Full Code Page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.NormalType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
testFullCodePage/              # Page name (customizable)
├── e.json                     # Element declaration file
└── index.tsx                  # Frontend implementation file
```

#### e.json File
```json title="Element Declaration File"
{
  "title": "Test React Full Code Page",
  "type": "pages.NormalType",
  "frontBundleEntry": "./index.tsx",
  "outputName": "index",
  "tag": ""
}
```

## Method Interface {#methods}

### Page Lifecycle Methods
Provides lifecycle management and data operation methods for React pages.

#### Frontend Implementation File
```tsx title="Page Implementation Example"
import { Button, message } from 'antd';
import { Jit } from 'jit';

// Render is the page renderer, UI part is implemented here, it's a React component
const Render = (props) => {
    const page = props.page;

    const handleClick = () => {
        message.success(page.getData());
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>React Full Code Page Example</h1>
            <Button type="primary" onClick={handleClick}>
                Get Data
            </Button>
        </div>
    );
};

// PageCls is the page logic processing class, inherits from Jit.BasePage
class PageCls extends Jit.BasePage {
    async init() {
        console.log('Page initialization');
        await this.loadComponents();
        this.bindEvent();
    }

    getData() {
        return 'Page data retrieved successfully!';
    }

    bindEvent() {
        // Bind page events
    }

    destroy() {
        console.log('Page destruction');
        super.destroy();
    }
}

export { Render, PageCls };
```

#### Usage Example
```javascript title="Portal Page Reference"
// Reference page in portal configuration
const shellConfig = {
    pages: [
        {
            path: '/test-page',
            element: 'pages.testFullCodePage'
        }
    ]
};
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Default | Description |
|-------------------|------|----------|---------|-------------|
| title | string | Yes | - | Page title for display and identification |
| type | string | Yes | - | Page type, fixed as "pages.NormalType" |
| frontBundleEntry | string | Yes | - | Frontend entry file path, relative to page directory |
| outputName | string | Yes | - | Output file name, usually "index" |
| tag | string | No | "" | Page tag for categorization |

### Frontend Implementation File Configuration
The frontend implementation file must export two core components:

- **Render**: React function component responsible for page UI rendering, receives `{ page }` as props
- **PageCls**: Page logic class, inherits from Jit.BasePage, responsible for business logic processing

### Template Inheritance Mechanism
React Full Code Page supports template inheritance, can inherit Render and PageCls implementations from Type elements:

```typescript title="Template Inheritance Rules"
// Priority: Instance custom > Type template > Meta base implementation
const PageClass = PageCls || PageTemplate?.PageCls || Jit.BasePage;
const PageRender = Render || PageTemplate?.Render;
```

## Methods
### init
Page initialization method, automatically called when the page loads.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| No parameters | - | - | - | - |

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;void&gt; | Asynchronous initialization completion |

#### Usage Example
```typescript title="Page Initialization"
class PageCls extends Jit.BasePage {
    async init() {
        // Load page components
        await this.loadComponents();
        
        // Bind event listeners
        this.bindEvent();
        
        // Load page data
        await this.loadData();
    }
    
    async loadData() {
        try {
            const data = await this.app.request('/api/page-data');
            this.publishEvent('dataLoaded', { data });
        } catch (error) {
            console.error('Data loading failed:', error);
        }
    }
}
```

### loadComponents
Automatically load all component instances under the page, which is a core feature of NormalType pages.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| No parameters | - | - | - | - |

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;void&gt; | Component loading completion |

#### Usage Example
```typescript title="Automatic Component Loading"
class PageCls extends Jit.BasePage {
    async loadComponents() {
        // Get all component elements under the page
        const data = await this.app.findElementByTlPath(this.ePath);
        const componentList = data.filter(
            (n) =>
                n.app.name === data[0]?.app.name &&
                n.define.fullName.startsWith(`${this.fullName}.components`)
        );
        
        // Instantiate components one by one and bind to page
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
            
            // Mount component instance to page
            this[compName] = compIns;
        }
    }
}
```

### bindEvent
Bind page events, called in the init method.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| No parameters | - | - | - | - |

#### Return Value
| Type | Description |
|------|-------------|
| void | Synchronous execution completion |

#### Usage Example
```typescript title="Event Binding"
class PageCls extends Jit.BasePage {
    bindEvent() {
        // Bind inter-component interaction events
        if (this.searchForm && this.dataTable) {
            this.searchForm.on('search', (params) => {
                this.dataTable.query(params);
            });
        }
        
        // Bind page-level events
        this.subscribeEvent('globalRefresh', this.handleGlobalRefresh.bind(this));
    }
    
    handleGlobalRefresh() {
        // Refresh page data
        this.refreshAllData();
    }
}
```

### destroy
Page destruction method, automatically called when the page is unloaded, used for resource cleanup.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| No parameters | - | - | - | - |

#### Return Value
| Type | Description |
|------|-------------|
| void | Synchronous execution completion |

#### Usage Example
```typescript title="Resource Cleanup"
class PageCls extends Jit.BasePage {
    destroy() {
        // Clear timers
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Remove event listeners
        this._eventHandleMap?.clear();
        
        // Call parent class destruction method
        super.destroy();
    }
}
```

### subscribeEvent
Subscribe to page-level global events.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| messageName | string &#124; symbol | Yes | - | Event name |
| callback | Handler&lt;T&gt; | Yes | - | Event callback function |

#### Return Value
| Type | Description |
|------|-------------|
| string | Event handler ID for unsubscribing |

#### Usage Example
```typescript title="Event Subscription"
class PageCls extends Jit.BasePage {
    async init() {
        // Subscribe to data change events
        const handlerId = this.subscribeEvent('dataChanged', (event) => {
            console.log('Data has changed:', event.data);
            this.refreshView();
        });
        
        // Save handlerId for subsequent unsubscription
        this.dataChangeHandlerId = handlerId;
    }
}
```

### publishEvent
Publish page-level global events.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| messageName | string &#124; symbol | Yes | - | Event name |
| ex | Record&lt;string, any&gt; | No | - | Event additional data |

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;any&gt; | Event publication result |

#### Usage Example
```typescript title="Event Publishing"
class PageCls extends Jit.BasePage {
    async saveData(data) {
        try {
            await this.app.request('/api/save', { data });
            
            // Publish data save success event
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
Unsubscribe from events.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| handlerId | string | Yes | - | Event handler ID |

#### Return Value
| Type | Description |
|------|-------------|
| boolean | Whether unsubscription was successful |

#### Usage Example
```typescript title="Event Unsubscription"
class PageCls extends Jit.BasePage {
    destroy() {
        // Unsubscribe from events
        if (this.dataChangeHandlerId) {
            this.unSubscribeEvent(this.dataChangeHandlerId);
        }
        
        super.destroy();
    }
}
```

### off
Directly cancel event listening.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| handlerId | string | Yes | - | Event handler ID |

#### Return Value
| Type | Description |
|------|-------------|
| boolean | Whether canceling listening was successful |

#### Usage Example
```typescript title="Cancel Event Listening"
class PageCls extends Jit.BasePage {
    cleanup() {
        // Directly cancel event listening
        if (this.eventHandlerId) {
            this.off(this.eventHandlerId);
        }
    }
}
```

### newVariable
Create new data type variable instances.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| varConfig | DataTypeConfig | Yes | - | Variable configuration object |
| value | any | No | - | Initial value |

#### Return Value
| Type | Description |
|------|-------------|
| DataType | Data type instance |

#### Usage Example
```typescript title="Create Variables"
class PageCls extends Jit.BasePage {
    initVariables() {
        // Create text variable
        this.userName = this.newVariable({
            dataType: 'Stext',
            name: 'userName',
            title: 'Username'
        }, 'John');
        
        // Create numeric variable
        this.userAge = this.newVariable({
            dataType: 'Numeric',
            name: 'userAge',
            title: 'Age',
            decimal: 0
        }, 25);
    }
}
```

### newComponent
Create new component instances.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| type | string | Yes | - | Component type identifier |
| createCompConfig | any | Yes | - | Component creation configuration |

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;Component&gt; | Component instance |

#### Usage Example
```typescript title="Create Components"
class PageCls extends Jit.BasePage {
    async createDynamicTable() {
        // Dynamically create table component
        const tableComp = await this.newComponent('components.Table', {
            name: 'dynamicTable',
            title: 'Dynamic Table',
            columns: [
                { key: 'name', title: 'Name' },
                { key: 'age', title: 'Age' }
            ]
        });
        
        this.dynamicTable = tableComp;
        return tableComp;
    }
}
```

### getUIContext
Get page UI context information, including function list and variable list.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| No parameters | - | - | - | - |

#### Return Value
| Type | Description |
|------|-------------|
| Object | Context object containing functionList and variables |

#### Usage Example
```typescript title="Get UI Context"
class PageCls extends Jit.BasePage {
    getPageContext() {
        const context = this.getUIContext();
        console.log('Page function list:', context.functionList);
        console.log('Page variable list:', context.variables);
        return context;
    }
    
    // Extend UI context
    getUIContext() {
        return {
            functionList: [
                { name: 'saveData', title: 'Save Data' },
                { name: 'loadData', title: 'Load Data' }
            ],
            variables: [
                { dataType: 'Stext', name: 'userName', title: 'Username' },
                { dataType: 'Numeric', name: 'userAge', title: 'Age' }
            ]
        };
    }
}
```

### sendAiMessage
Send AI messages (requires AI assistant configuration).

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| message | string | Yes | - | Message content to send |
| inNewChat | number | No | 0 | Whether to send in a new chat |

#### Return Value
| Type | Description |
|------|-------------|
| void | No return value |

#### Usage Example
```typescript title="AI Message Sending"
class PageCls extends Jit.BasePage {
    async requestAiHelp() {
        // Send message to AI assistant
        await this.sendAiMessage('Please help me analyze the data trends on this page', 1);
    }
}
```

### getVariableValue
Get variable value.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| varName | string &#124; DataType | Yes | - | Variable name or variable instance |

#### Return Value
| Type | Description |
|------|-------------|
| any | Variable value |

#### Usage Example
```typescript title="Get Variable Value"
class PageCls extends Jit.BasePage {
    getData() {
        // Get page variable value
        const userName = this.getVariableValue('userName');
        
        // Get component variable value
        const tableData = this.getVariableValue('dataTable.selectedRows');
        
        return { userName, tableData };
    }
}
```

## Properties
### app
Current application instance, providing application-level methods and data access.

```typescript title="Application Instance Usage"
class PageCls extends Jit.BasePage {
    async fetchUserData() {
        // Get service element through app
        const userService = await this.app.getElement('services.UserService');
        return await userService.getUserList();
    }
}
```

### fullName
Complete name identifier of the page element.

```typescript title="Get Page Identifier"
class PageCls extends Jit.BasePage {
    getPageInfo() {
        console.log('Current page:', this.fullName);
        return this.fullName;
    }
}
```

### title
Page title.

### name
Page name.

### ePath
Path information of the page element.

### pagePerm
Page permission information for permission control.

```typescript title="Permission Check"
class PageCls extends Jit.BasePage {
    checkPermission(action: string) {
        return this.pagePerm?.[action] === true;
    }
    
    renderControls() {
        if (!this.checkPermission('edit')) {
            return null;
        }
        return <Button>Edit</Button>;
    }
}
```

### aiConfig
AI configuration information, including AI assistant settings.

```typescript title="AI Configuration Check"
class PageCls extends Jit.BasePage {
    isAiEnabled() {
        return this.aiConfig?.useAi === 1;
    }
}
```

## Advanced Features
### Lifecycle Management
Pages have complete lifecycle management mechanisms, automatically handled by PageWrapper.

#### Configuration Example
```typescript title="Lifecycle Flow"
// 1. Page instantiation
const page = new PageCls(pageDefine);

// 2. Automatically call init method
await page.init();

// 3. Render page
<PageRender page={page} />

// 4. Automatically call destroy when page unloads
useUnmount(() => page?.destroy());
```

### Component Integration
React Full Code Page implements automatic integration with child components through the loadComponents method.

#### Configuration Example
```text title="Page Directory Structure"
testPage/
├── e.json
├── index.tsx
└── components/
    ├── dataTable/
    │   └── e.json
    └── searchForm/
        └── e.json
```

```typescript title="Component Usage"
const Render = ({ page }) => {
    return (
        <div>
            {/* Use automatically loaded components */}
            {page.searchForm?.render()}
            {page.dataTable?.render()}
        </div>
    );
};

class PageCls extends Jit.BasePage {
    bindEvent() {
        // Configure inter-component interaction
        if (this.searchForm && this.dataTable) {
            this.searchForm.on('search', (params) => {
                this.dataTable.query(params);
            });
        }
    }
}
```

### State Management
Implement page-level state management based on event system.

#### Configuration Example
```typescript title="State Management"
class PageCls extends Jit.BasePage {
    async init() {
        this.state = {
            loading: false,
            data: null,
            selectedItems: []
        };
        
        // Subscribe to state change events
        this.subscribeEvent('stateChange', this.handleStateChange.bind(this));
        
        await super.init();
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.publishEvent('stateChange', { state: this.state });
    }
    
    handleStateChange(event) {
        // Trigger UI re-rendering
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

### Variable System
Use the newVariable method to create typed variables for data validation and processing.

#### Configuration Example
```typescript title="Variable System"
class PageCls extends Jit.BasePage {
    async init() {
        // Create form variables
        this.formData = this.newVariable({
            dataType: 'JitDict',
            name: 'formData',
            title: 'Form Data',
            variableList: [
                { dataType: 'Stext', name: 'userName', title: 'Username' },
                { dataType: 'Numeric', name: 'age', title: 'Age' },
                { dataType: 'Phone', name: 'phone', title: 'Phone Number' }
            ]
        });
        
        // Listen to variable value changes
        this.formData.on('valueChange', this.handleFormChange.bind(this));
        
        await super.init();
    }
    
    handleFormChange(event) {
        // Form data validation
        const isValid = this.validateForm(event.value);
        this.publishEvent('formValidation', { isValid, data: event.value });
    }
    
    validateForm(data) {
        return data.userName && data.age > 0 && data.phone;
    }
}
``` 
