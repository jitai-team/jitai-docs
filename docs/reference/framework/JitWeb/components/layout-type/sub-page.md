---
slug: sub-page
title: "Sub Page Reference"
description: "Sub Page Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Sub Page"
---
# Sub Page
The sub page is a layout container component used to embed other pages within the current page, implementing modular construction of complex interfaces through reference mechanisms. It handles dynamic loading of sub-pages, data passing, and state management, supporting communication mechanisms between parent and child pages, suitable for page segmentation and modular development of large applications.

The sub page element has a hierarchical structure of Meta (components.Meta) → Type (components.Container) → Instance. Developers can quickly create sub page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ContainerType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
MyApp/
├── pages/
│   ├── MainPage/           # Main page
│   │   ├── scheme.json
│   │   └── e.json
│   └── SubPage/            # Sub page
│       ├── scheme.json
│       └── e.json
```

```tsx title="Sub Page Basic Usage"
// Use sub page component in main page
const container = app.getElement('components.Container.MyContainer');

// Configure page to reference
container.setConfig({
    pageName: 'pages.SubPage',  // fullName of page to embed
    renderOnload: true,         // Enable render loading
    requireElements: []
});

// Call sub page
await container.call();
```

### Configuration Properties
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| pageName | string | fullName of page to reference | - | Yes |
| renderOnload | boolean | Whether to enable render loading | false | No |
| featureTitleList | string[] | Feature title list | `[]` | No |
| featureNameList | string[] | Feature name list | `[]` | No |
| requireElements | requireElement[] | Dependent element configuration | `[]` | No |

## Variables
### renderOnload
Built-in checkbox type variable, used to control sub page rendering state. Each time the `call()` method is called, its value is automatically incremented, triggering sub page re-rendering.

```tsx title="renderOnload Variable Usage"
const container = app.getElement('components.Container.MyContainer');

// Listen to renderOnload changes
container.subscribeEvent('variableChange', (data) => {
    if (data.variableName === 'renderOnload') {
        console.log('Sub page re-rendered:', data.value);
    }
});
```

## Methods
### call
Asynchronous method, used to open and refresh sub pages. Calling this method will increment the renderOnload variable value, triggering sub page re-rendering.

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;void&gt; | Resolves when sub page loading is complete |

#### Usage Example
```tsx title="call Method Usage"
const container = app.getElement('components.Container.MyContainer');

// Basic call
await container.call();

// Use in event handler
container.subscribeEvent('click', async () => {
    try {
        await container.call();
        console.log('Sub page loaded');
    } catch (error) {
        console.error('Sub page loading failed:', error);
    }
});
```

### setConfig
Set component configuration, used to dynamically change sub page references and display options.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| config | Partial&lt;ContainerConfig&gt; | Configuration object | - | Yes |
| clean | boolean | Whether to clear existing configuration | false | No |

#### Usage Example
```tsx title="setConfig Method Usage"
const container = app.getElement('components.Container.MyContainer');

// Set sub page reference
container.setConfig({
    pageName: 'pages.UserProfile',
    renderOnload: true
});

// Completely replace configuration
container.setConfig({
    pageName: 'pages.Settings',
    renderOnload: true,
    requireElements: []
}, true);
```

### publishEvent
Publish component events, used for communication between parent and child pages.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| data | Record&lt;string, any&gt; | Event data | - | No |

#### Return Value
| Type | Description |
|------|-------------|
| Promise&lt;void&gt; | Event publishing complete |

#### Usage Example
```tsx title="publishEvent Usage"
const container = app.getElement('components.Container.MyContainer');

// Send data to sub page
await container.publishEvent('dataUpdate', {
    userId: 123,
    action: 'refresh'
});
```

### subscribeEvent
Subscribe to component events, listen to messages from sub pages or other components.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| callback | (data: any) =&gt; void &#124; Promise&lt;void&gt; | Callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
| Type | Description |
|------|-------------|
| string | Subscription handle ID |

#### Usage Example
```tsx title="subscribeEvent Usage"
const container = app.getElement('components.Container.MyContainer');

// Listen to sub page events
const handleId = container.subscribeEvent('pageReady', (data) => {
    console.log('Sub page ready:', data);
});

// Asynchronous event handling
container.subscribeEvent('dataChanged', async (data) => {
    await processData(data);
    console.log('Data processing complete');
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| handleId | string | Subscription handle ID | - | Yes |

#### Usage Example
```tsx title="unSubscribeEvent Usage"
const container = app.getElement('components.Container.MyContainer');

const handleId = container.subscribeEvent('test', () => {});
// Cancel subscription
container.unSubscribeEvent(handleId);
```

### bindApp
Bind application instance, establish association between component and application.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| app | App | Application instance | - | Yes |

#### Usage Example
```tsx title="bindApp Usage"
const container = app.getElement('components.Container.MyContainer');
container.bindApp(app);
```

### bindPage
Bind page instance, establish association between component and page.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| page | BasePage | Page instance | - | Yes |

#### Usage Example
```tsx title="bindPage Usage"
const container = app.getElement('components.Container.MyContainer');
const page = app.getElement('pages.MainPage');
container.bindPage(page);
```

### runCode
Execute code string, run in page context.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code string to execute | - | Yes |

#### Return Value
| Type | Description |
|------|-------------|
| any | Code execution result |

#### Usage Example
```tsx title="runCode Usage"
const container = app.getElement('components.Container.MyContainer');

// Execute simple calculation
const result = container.runCode('1 + 2');
console.log(result); // 3

// Access page variables
const pageData = container.runCode('this.userData.value');

// Call page methods
container.runCode('this.refreshData()');
```

### getPermConfig
Get current component's permission configuration.

#### Return Value
| Type | Description |
|------|-------------|
| Record&lt;string, any&gt; &#124; undefined | Permission configuration object, returns undefined if no configuration |

#### Usage Example
```tsx title="getPermConfig Usage"
const container = app.getElement('components.Container.MyContainer');

const permConfig = container.getPermConfig();
if (permConfig) {
    console.log('Component permission configuration:', permConfig);
    // Control component behavior based on permission configuration
    if (permConfig.visible === false) {
        container.style.display = 'none';
    }
}
```

### destroy
Destroy component, clean up resources and event listeners.

#### Usage Example
```tsx title="destroy Usage"
const container = app.getElement('components.Container.MyContainer');
// Destroy component when page unloads
container.destroy();
```

## Properties
### subPage
Read-only property, get currently loaded sub page instance.

```tsx title="subPage Property Usage"
const container = app.getElement('components.Container.MyContainer');

// Access after sub page loading is complete
await container.call();
if (container.subPage) {
    console.log('Sub page instance:', container.subPage);
    // Call sub page methods
    container.subPage.someMethod();
}
```

### name
Read-only property, get component name.

```tsx title="name Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component name:', container.name); // "MyContainer"
```

### title
Read-write property, component display title.

```tsx title="title Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component title:', container.title);
container.title = 'New Sub Page Title';
```

### config
Read-only property, get current component configuration.

```tsx title="config Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Current configuration:', container.config);
console.log('Referenced page:', container.config.pageName);
```

### showTitle
Read-write property, control whether to show component title.

```tsx title="showTitle Property Usage"
const container = app.getElement('components.Container.MyContainer');
container.showTitle = true; // Show title
```

### app
Read-only property, get associated application instance.

```tsx title="app Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Associated application:', container.app);
```

### page
Read-only property, get associated page instance.

```tsx title="page Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Associated page:', container.page);
```

### fullName
Read-only property, get component full name identifier.

```tsx title="fullName Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component full name:', container.fullName); // "components.Container"
```

### type
Read-only property, get component type string.

```tsx title="type Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component type:', container.type); // "components.Container"
```

### compType
Read-only property, get component type enumeration value.

```tsx title="compType Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component type enumeration:', container.compType); // COMPONENT_TYPE.REFERENCE
```

### dataTypeList
Read-only property, get component's data type list.

```tsx title="dataTypeList Property Usage"
const container = app.getElement('components.Container.MyContainer');
console.log('Component data types:', container.dataTypeList);
// Access specific data type variables
container.dataTypeList.forEach(dataType => {
    console.log('Data type name:', dataType.name);
});
```

## Events
The sub page component supports custom event system, but has no predefined specific events. Developers can implement custom event communication through `publishEvent` and `subscribeEvent` methods.

## Advanced Features
### Parent-Child Page Communication
The sub page component provides complete parent-child page communication mechanism, supporting data passing and state synchronization.

```tsx title="Parent-Child Page Communication Example"
// Parent page
const container = app.getElement('components.Container.MyContainer');

// Configure and load sub page
container.setConfig({
    pageName: 'pages.UserDetail',
    renderOnload: true
});

await container.call();

// Send data to sub page
await container.publishEvent('updateUser', {
    userId: 123,
    userData: { name: 'Zhang San', age: 25 }
});

// Listen to sub page events
container.subscribeEvent('userUpdated', (data) => {
    console.log('User updated:', data);
    // Refresh parent page data
    refreshParentData();
});

// In sub page (pages.UserDetail)
const page = app.getCurrentPage();

// Listen to parent page messages
page.subscribeEvent('updateUser', (data) => {
    // Update sub page UI
    updateUserInterface(data.userData);
});

// Send confirmation to parent page
page.publishEvent('userUpdated', {
    success: true,
    message: 'User information updated'
});
```

### Dynamic Page Switching
Supports dynamically switching sub page content at runtime, implementing flexible page composition.

```tsx title="Dynamic Page Switching"
const container = app.getElement('components.Container.MyContainer');

// Switch to different sub pages
const switchToPage = async (pageName: string) => {
    container.setConfig({
        pageName: pageName,
        renderOnload: true
    });
    
    await container.call();
};

// Usage example
await switchToPage('pages.UserList');    // Switch to user list
await switchToPage('pages.UserProfile'); // Switch to user profile
await switchToPage('pages.Settings');    // Switch to settings page
```

### Conditional Rendering Control
Control sub page rendering timing through renderOnload property, implementing on-demand loading.

```tsx title="Conditional Rendering Control"
const container = app.getElement('components.Container.MyContainer');

// Initial configuration without rendering
container.setConfig({
    pageName: 'pages.HeavyPage',
    renderOnload: false  // Don't render immediately
});

// Load sub page only under specific conditions
const loadSubPageIfNeeded = async () => {
    const userPermission = await checkUserPermission();
    
    if (userPermission.canViewDetail) {
        container.setConfig({
            renderOnload: true
        });
        await container.call();
    }
};
```