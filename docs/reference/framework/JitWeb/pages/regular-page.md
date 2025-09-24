---
sidebar_position: 3
slug: regular-page
---

# Regular Page
Regular Page is a visual page type based on a grid layout system, implementing rapid page construction through drag-and-drop component orchestration. It provides complete component management, event system, and lifecycle mechanisms, supporting frontend-backend separation architecture, balancing development efficiency and functional flexibility. Regular Page is suitable for most enterprise application interface requirements and is the most widely used page type in JitWeb.

The Regular Page element hierarchy is Meta (pages.Meta) → Type (pages.GridPageType) → Instance. Developers can quickly create Regular Page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.GridPageType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
pages/MyStandardPage/          # Page name (path can be customized)
├── e.json                     # Element declaration file
├── scheme.json                # Page configuration file
├── index.ts                   # Frontend entry file
├── page.ts                    # Page logic implementation
├── PageRender.tsx             # Page render component (optional)
└── page.style.ts              # Page style file (optional)
```

#### e.json File
```json title="Element Declaration Configuration"
{
  "title": "My Regular Page",
  "type": "pages.GridPageType",
  "frontBundleEntry": "./index.ts",
  "platform": "PC",
  "outputName": "index"
}
```

#### scheme.json File
```json title="Page Configuration File"
{
  "layout": [
    {
      "i": "MyTable",
      "x": 0,
      "y": 0,
      "w": 12,
      "h": 8,
      "minW": 2,
      "minH": 2
    }
  ],
  "componentList": [
    {
      "name": "MyTable",
      "type": "components.Table",
      "title": "Data Table",
      "config": {
        "dataSource": "models.UserModel"
      }
    }
  ],
  "variableList": [
    {
      "name": "searchKeyword",
      "dataType": "Stext",
      "title": "Search Keyword",
      "value": ""
    }
  ],
  "functionList": [
    {
      "name": "handleSearch",
      "title": "Handle Search",
      "args": []
    }
  ]
}
```

#### page.ts File
```typescript title="Page Logic Implementation"
import { Jit } from 'jit';

export default class MyStandardPage extends Jit.Pages["pages.GridPageType"] {
    
    bindEvent() {
        // Bind component events
        this.MyTable.onRowClick = (row: any) => {
            console.log('Row clicked:', row);
        };
    }

    handleSearch() {
        // Implement search logic
        const keyword = this.searchKeyword.value;
        this.MyTable.refresh({
            filter: `Q(name__like='%${keyword}%')`
        });
    }
}
```

#### Usage Example
```typescript title="Page Usage"
// Get page instance
const page = app.getElement("pages.MyStandardPage");

// Initialize page
await page.init();

// Subscribe to page events
page.subscribeEvent("CUSTOM_EVENT", (event) => {
    console.log("Received custom event:", event);
});

// Refresh page
page.refresh();
```

## Element Configuration
### e.json Configuration
| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | string | Yes | Page display title |
| type | string | Yes | Fixed value "pages.GridPageType" |
| frontBundleEntry | string | Yes | Frontend entry file path |
| platform | string | No | runtime-platform, default "PC" |
| outputName | string | No | Output file name, default "index" |
| extend | string | No | Inherited parent page fullName |

### scheme.json Configuration
| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| layout | Array | Yes | Component layout configuration array |
| componentList | Array | Yes | Page component configuration array |
| variableList | Array | No | Page variable configuration array |
| functionList | Array | No | Page method configuration array |
| aiConfig | Object | No | AI configuration object |

## Methods
### init
Initialize the page, load configuration, components, and variables. Must be called before using the page.

#### Usage Example
```typescript title="Page Initialization"
const page = app.getElement("pages.MyStandardPage");
await page.init();
console.log("Page initialization completed:", page.isReady);
```

### bindEvent
Bind page and component events, automatically called during page initialization. Developers can override this method.

#### Usage Example
```typescript title="Event Binding"
bindEvent() {
    // Bind component events
    this.MyButton.onClick = () => {
        this.handleButtonClick();
    };
    
    // Bind page-level events
    this.subscribeEvent("DATA_CHANGED", (event) => {
        this.MyTable.refresh();
    });
}
```

### getScheme
Get the complete page configuration scheme, including the final configuration after inheritance processing.

#### Return Value
Returns a configuration object containing layout, componentList, variableList, functionList, etc.

#### Usage Example
```typescript title="Get Page Configuration"
const scheme = this.getScheme();
console.log("Page layout:", scheme.layout);
console.log("Component list:", scheme.componentList);
console.log("Variable list:", scheme.variableList);

// Dynamically modify configuration
scheme.layout.push({
    i: "NewComponent",
    x: 0,
    y: 10,
    w: 6,
    h: 4
});
```

### publishEvent
Publish page events, broadcasting messages to components and subscribers within the page.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| messageName | Stext | string &#124; symbol | Yes | Event name |
| ex | JitDict | Record&lt;string, any&gt; | No | Event additional data |

#### Usage Example
```typescript title="Event Publishing"
// Publish simple event
this.publishEvent("DATA_UPDATED");

// Publish event with data
this.publishEvent("USER_SELECTED", {
    userId: 123,
    userName: "John",
    action: "select"
});
```

### subscribeEvent
Subscribe to page events, register event callback functions.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| messageName | Stext | string &#124; symbol | Yes | Event name |
| callback | Function | Handler&lt;T&gt; | Yes | Event callback function |

#### Return Value
Returns event handler ID for unsubscribing.

#### Usage Example
```typescript title="Event Subscription"
// Subscribe to event
const handlerId = this.subscribeEvent("DATA_UPDATED", (event) => {
    console.log("Data updated:", event.data);
    this.MyTable.refresh();
});

// Typed event subscription
interface UserEvent {
    userId: number;
    userName: string;
}

this.subscribeEvent<UserEvent>("USER_SELECTED", (event) => {
    console.log(`User ${event.data.userName} selected`);
});
```

### unSubscribeEvent
Unsubscribe from page events.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| handlerId | Stext | string | Yes | Event handler ID |

#### Usage Example
```typescript title="Event Unsubscription"
// Subscribe to event and get handler ID
const handlerId = this.subscribeEvent("TEST_EVENT", (event) => {
    console.log("Handle test event");
});

// Unsubscribe
this.unSubscribeEvent(handlerId);
```

### off
Cancel underlying event listeners, providing lower-level event control than unSubscribeEvent.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| handlerId | Stext | string | Yes | Event handler ID |

#### Usage Example
```typescript title="Cancel Underlying Event Listening"
// Get application-level event handler ID
const appHandlerId = this.app.on((event) => {
    console.log("Application-level event:", event);
});

// Cancel listening
this.off(appHandlerId);
```

### newVariable
Create page variable instances, supporting all JitAI data types.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| varConfig | JitDict | DataTypeConfig | Yes | Variable configuration object |
| value | Any | any | No | Variable initial value |

#### Return Value
Returns the created variable instance object.

#### Usage Example
```typescript title="Create Page Variables"
// Create text variable
const textVar = this.newVariable({
    name: "description",
    dataType: "Stext",
    title: "Description"
}, "Default description");

// Create numeric variable
const numberVar = this.newVariable({
    name: "count",
    dataType: "Numeric",
    title: "Count",
    decimal: 0
}, 10);

// Use variables
console.log("Text value:", textVar.value);
numberVar.value = 20;
```

### newComponent
Create component instances for dynamic component addition.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| type | Stext | string | Yes | Component type identifier |
| createCompConfig | JitDict | any | Yes | Component creation configuration |

#### Return Value
Returns the created component instance object.

#### Usage Example
```typescript title="Dynamic Component Creation"
// Create button component
const button = await this.newComponent("components.Button", {
    name: "DynamicButton",
    title: "Dynamic Button",
    config: {
        text: "Click Me",
        type: "primary"
    }
});

// Bind component to page
button.bindPage(this);
this["DynamicButton"] = button;
```

### getUIContext
Get page UI context information, including all available function and variable lists.

#### Return Value
Returns an object containing functionList and variables.

#### Usage Example
```typescript title="Get UI Context"
const context = this.getUIContext();
console.log("Available functions:", context.functionList);
console.log("Available variables:", context.variables);

// Iterate through all available functions
context.functionList.forEach(func => {
    console.log(`Function: ${func.title}(${func.name})`);
});
```

### getVariableValue
Get variable values, supporting both page variables and component variables.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| varName | Variable &#124; Stext | InstanceType&lt;BaseDataType&gt; &#124; string | Yes | Variable name or variable instance |

#### Return Value
Returns the current value of the variable.

#### Usage Example
```typescript title="Get Variable Value"
// Get page variable value
const searchValue = this.getVariableValue("searchKeyword");
console.log("Search keyword:", searchValue);

// Get component variable value
const tableData = this.getVariableValue("MyTable.selectedRows");
console.log("Table selected rows:", tableData);

// Get value using variable instance
const keywordVar = this.searchKeyword;
const value = this.getVariableValue(keywordVar);
```

### parseVariableInQ
Parse variables in Q expressions, converting page variables to actual values.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| str | Stext | string | Yes | Q expression string containing variables |

#### Return Value
Returns the parsed Q expression string.

#### Usage Example
```typescript title="Q Expression Variable Parsing"
// Set page variables
this.searchKeyword.value = "John";
this.minAge.value = 18;

// Parse Q expression containing variables
const qStr = "Q(name__like=this.searchKeyword.value) & Q(age__gte=this.minAge.value)";
const parsedQ = this.parseVariableInQ(qStr);
console.log("Parsed Q expression:", parsedQ);

// Use for data query
this.MyTable.refresh({
    filter: parsedQ
});
```

### refresh
Refresh page display, triggering internal page refresh events.

#### Usage Example
```typescript title="Page Refresh"
// Refresh page after data update
const updateData = async () => {
    await this.saveUserData();
    // Refresh page display
    this.refresh();
};
```

### refreshPageVariable
Refresh page variables, reload variable values from URL parameters.

#### Usage Example
```typescript title="Page Variable Refresh"
// Refresh page variables when URL parameters change
this.refreshPageVariable();

// Listen to route changes and refresh variables
window.addEventListener('popstate', () => {
    this.refreshPageVariable();
});
```

### sendAiMessage
Send AI messages, requires AI assistant configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| message | Stext | string | Yes | Message content to send |
| inNewChat | Numeric | number | No | Whether to send in new chat, default 0 |

#### Usage Example
```typescript title="AI Message Sending"
// Send AI message
await this.sendAiMessage("Please help me analyze this data", 1);

// Listen to AI response
this.subscribeEvent("AI_RESPONSE", (event) => {
    console.log("AI response:", event.data.response);
});
```

### destroy
Destroy page instance, clean up all resources and event listeners.

#### Usage Example
```typescript title="Page Destruction"
// Called when page is unloaded
const cleanup = () => {
    this.destroy();
    console.log("Page destroyed");
};

// Automatically called during route switching
window.addEventListener('beforeunload', cleanup);
```

## Properties
### name
Page name, corresponding to the element's name field.

### title
Page display title, corresponding to the element's title field.

### fullName
Complete page name, including the complete identifier with path.

### ePath
Page path in the application.

### scheme
Page configuration object, containing layout, components, variables, and method definitions.

### compInsList
Page component instance list, containing all loaded components.

### compInsDict
Page component instance dictionary, component mapping with component name as key.

### isReady
Page ready state, indicating whether the page has completed initialization.

### app
Current application instance, providing application-level services and methods.

### aiConfig
AI configuration information, including AI assistant enable status and configuration.

### extend
Inherited parent page fullName, used for page inheritance functionality.

### pagePerm
Page permission configuration object, controlling page access permissions.

## Advanced Features
### Page Inheritance
Regular Page supports inheritance mechanism, where child pages can inherit components, variables, and methods from parent pages, with support for overriding and extension.

#### Configuration Example and Usage Example
```json title="Child Page e.json Configuration"
{
  "title": "Extended Regular Page", 
  "type": "pages.GridPageType",
  "frontBundleEntry": "./index.ts",
  "extend": "pages.BaseStandardPage"
}
```

```typescript title="Page Inheritance Implementation"
class ExtendedPage extends Jit.Pages["pages.BaseStandardPage"] {
    scheme = {
        // Inherit parent page configuration and extend
        ...super.getScheme(),
        componentList: [
            ...super.getScheme().componentList,
            {
                name: "NewButton",
                type: "components.Button", 
                title: "New Button",
                config: {}
            }
        ]
    };

    bindEvent() {
        super.bindEvent(); // Inherit parent class event binding
        
        // Extend new event binding
        this.NewButton.onClick = () => {
            this.handleNewFeature();
        };
    }
}
```

### AI Integration Support
Regular Page has built-in AI assistant integration capabilities, supporting intelligent interaction and auxiliary functions.

```typescript title="AI Function Integration"
class AIEnabledPage extends Jit.Pages["pages.GridPageType"] {
    scheme = {
        // ... other configurations
        aiConfig: {
            useAi: 1,
            aiAssistant: "assistants.MyAI"
        }
    };

    async handleAIQuery(userInput: string) {
        // Send AI message
        await this.sendAiMessage(userInput, 1);
        
        // Listen to AI response
        this.subscribeEvent("AI_RESPONSE", (event) => {
            this.displayAIResponse(event.data.response);
        });
    }
}
```

### Dynamic Layout Adjustment
Supports runtime dynamic adjustment of component layout and configuration.

```typescript title="Dynamic Layout Management"
class DynamicLayoutPage extends Jit.Pages["pages.GridPageType"] {
    
    adjustLayout(componentName: string, newLayout: any) {
        // Update layout configuration
        const layoutItem = this.scheme.layout.find(item => item.i === componentName);
        if (layoutItem) {
            Object.assign(layoutItem, newLayout);
            this.refresh(); // Refresh page to apply new layout
        }
    }

    addComponent(componentConfig: any, layoutConfig: any) {
        // Dynamically add component
        this.scheme.componentList.push(componentConfig);
        this.scheme.layout.push(layoutConfig);
        this.loadComponents(); // Reload components
    }
}
``` 