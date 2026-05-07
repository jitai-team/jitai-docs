---
slug: full-code-component
title: "Full Code Component Reference"
description: "Full Code Component Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Full Code Component"
---
# Full Code Component
Full code component is a universal custom component in the JitAI development framework that supports developers using React and JavaScript to write completely custom component implementations. It provides complete component lifecycle management, event publishing and subscription, variable management, and configuration management capabilities, while integrating error boundary protection to ensure component rendering stability.

The full code component element has a hierarchical structure of Meta (components.Meta) → Type (components.BlankComponent) → Instance. Developers can quickly create full code component instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.BlankComponentType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```tsx title="BlankComponent.tsx"
import { Jit } from 'jit';
import { Button, message } from 'antd';

// Custom renderer - React component
const Render = (props) => {
    const compIns = props.compIns;

    const handleClick = () => {
        // Call component method
        message.success(compIns.getData());
        
        // Trigger custom event
        compIns.publishEvent('handleClickMe');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Button type="primary" onClick={handleClick}>
                Click Me!
            </Button>
        </div>
    );
};

// Component logic handling class
export default class BlankComponent extends Jit.BaseComponent {
    // Mount renderer
    Render = Render;

    /**
     * Custom method to get data
     */
    getData() {
        return 'Hello from BlankComponent!';
    }
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| name | string | Yes | - | Component instance name, unique within page |
| title | string | No | "" | Component display title |
| showTitle | boolean | No | false | Whether to show component title |
| config.requireElements | array | No | [] | Component dependent element configuration |

## Variables
Full code components support defining component variables by overriding the static method `getVariableList()`. Variables are automatically initialized and bound to the component instance.

```tsx title="Define Component Variables"
export default class BlankComponent extends Jit.BaseComponent {
    static getVariableList(config) {
        return [
            {
                name: 'userInput',
                title: 'User Input',
                dataType: 'Stext',
                value: ''
            },
            {
                name: 'counter', 
                title: 'Counter',
                dataType: 'Numeric',
                value: 0
            }
        ];
    }
}
```

## Methods 
### publishEvent
Publish custom events, supporting subscription by pages or other components.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| ex | Record\<string, any\> | No | Event data |

#### Return Value
Promise\<void\>

#### Usage Example
```tsx title="Publish Event"
// Publish simple event
this.publishEvent('dataChanged');

// Publish event with data
this.publishEvent('userSelected', {
    userId: 123,
    userName: 'Alice'
});
```

### subscribeEvent
Subscribe to events, receiving events published by other components or pages.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| evtCb | (data: any) => Promise\<void\> \| void | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscription, default true |

#### Return Value
string - Subscription handler ID

#### Usage Example
```tsx title="Subscribe to Event"
// Subscribe to event
const handlerId = this.subscribeEvent('dataChanged', async (data) => {
    console.log('Received data change:', data);
    // Handle event logic
});

// Synchronous event handling
this.subscribeEvent('userClicked', (data) => {
    this.setState({ selectedUser: data.userId });
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| id | string | Yes | Subscription handler ID |

#### Usage Example
```tsx title="Unsubscribe"
const handlerId = this.subscribeEvent('myEvent', handler);
// Cancel subscription
this.unSubscribeEvent(handlerId);
```

### setConfig
Update component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Partial\<T & \{requireElements: requireElement[]\}\> | Yes | New configuration |
| clean | boolean | No | Whether to completely replace configuration, default false |

#### Usage Example
```tsx title="Update Configuration"
// Partial configuration update
this.setConfig({
    title: 'New Title',
    showTitle: true
});

// Complete configuration replacement
this.setConfig({
    requireElements: [],
    customOption: 'value'
}, true);
```

### newVariable
Create new data type variable instance.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| varConfig | DataTypeConfig | Yes | Variable configuration object |

#### Usage Example
```tsx title="Create Variable"
const textVar = this.newVariable({
    name: 'dynamicText',
    title: 'Dynamic Text',
    dataType: 'Stext',
    value: 'initial value'
});
```

### runCode
Execute code string in page context.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| code | string | Yes | Code string to execute |

#### Usage Example
```tsx title="Execute Code"
// Execute simple expression
const result = this.runCode('1 + 2');

// Execute complex logic
this.runCode(`
    if (self.dataList.length > 0) {
        self.showMessage('Data loaded');
    }
`);
```

### getPermConfig
Get component's permission configuration.

#### Return Value
Record\<string, any\> | undefined

#### Usage Example
```tsx title="Permission Check"
const permConfig = this.getPermConfig();
if (permConfig?.visible !== false) {
    // Logic when component is visible
}
```

### bindApp
Bind application instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| app | App | Yes | Application instance |

#### Usage Example
```tsx title="Bind Application"
// Manually bind application instance
this.bindApp(app);
```

### bindPage
Bind page instance to component, while binding component variables to page context.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| page | BasePage | Yes | Page instance |

#### Usage Example
```tsx title="Bind Page"
// Manually bind page instance
this.bindPage(page);
```

### getEventKey
Get unique identifier key for component events.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| eventName | string | Yes | Event name |

#### Return Value
string - Event unique identifier key

#### Usage Example
```tsx title="Get Event Key"
const eventKey = this.getEventKey('dataChanged');
// Return format: "{uuid}.{componentName}.{eventName}"
```

### initVariables
Initialize component variables based on variable configuration list.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| dataTypeList | BaseDataType[] | Yes | Data type configuration list |

#### Usage Example
```tsx title="Initialize Variables"
// Usually called automatically in constructor
const variables = [
    { name: 'userInput', dataType: 'Stext', value: '' }
];
this.initVariables(variables);
```

### destroy
Destroy component, clean up resources and event listeners.

#### Usage Example
```tsx title="Component Destruction"
// Called automatically when component unmounts
componentWillUnmount() {
    this.destroy();
}
```

## Properties
### name
Component instance name.

- **Type**: string
- **Read-only**: Yes

### title
Component display title.

- **Type**: string  
- **Read-only**: No

### config
Component configuration object.

- **Type**: T & \{requireElements: requireElement[]\}
- **Read-only**: No

### showTitle
Whether to show component title.

- **Type**: boolean
- **Read-only**: No

### type
Component type identifier.

- **Type**: string
- **Read-only**: Yes

### app
Current application instance.

- **Type**: App
- **Read-only**: Yes

### page
Associated page instance.

- **Type**: BasePage
- **Read-only**: Yes

### compType
Component type enumeration value.

- **Type**: COMPONENT_TYPE
- **Read-only**: Yes
- **Possible Values**: NORMAL, LAYOUT, REFERENCE

### fullName
Component's complete name identifier.

- **Type**: string
- **Read-only**: Yes

### dataTypeList
Component's data type configuration list.

- **Type**: BaseDataType[]
- **Read-only**: Yes

## Events
Full code components support defining component event types by overriding the static method `getEventList()`.

```tsx title="Define Component Events"
export default class BlankComponent extends Jit.BaseComponent {
    static getEventList() {
        return [
            {
                name: 'dataLoaded',
                title: 'Data Loaded'
            },
            {
                name: 'userAction',
                title: 'User Action'
            }
        ];
    }

    // Component method definition
    static getFuncList() {
        return [
            {
                name: 'getData',
                title: 'Get Data',
                args: [],
                returnType: 'string'
            }
        ];
    }
}
```

## Advanced Features
### Error Boundary Protection
Full code components automatically integrate React error boundaries, displaying friendly error messages when custom code encounters rendering errors.

```tsx title="Error Handling"
// Automatically displayed when component rendering errors occur
<Alert.ErrorBoundary message="Custom code rendering failed">
    <compIns.Render compIns={compIns} />
</Alert.ErrorBoundary>
```

### Lifecycle Integration
Full code components are fully integrated into the JitAI platform's component lifecycle management.

```tsx title="Lifecycle Handling"
export default class BlankComponent extends Jit.BaseComponent {
    constructor(componentInfo) {
        super(componentInfo);
        // Component initialization logic
    }

    componentDidMount() {
        // Logic after component mounting
        this.bindApp(this.app);
        this.bindPage(this.page);
    }

    componentWillUnmount() {
        // Cleanup before component unmounting
        this.destroy();
    }
}
```

### Permission Control Integration
Full code components support the JitAI platform's permission control system.

```tsx title="Permission Control"
const Render = (props) => {
    const { compIns } = props;
    const permConfig = compIns.getPermConfig();
    
    // Control display based on permission configuration
    if (permConfig?.visible === false) {
        return null;
    }
    
    return (
        <div>
            <Button 
                disabled={permConfig?.editable === false}
                onClick={compIns.handleAction}
            >
                Action Button
            </Button>
        </div>
    );
};
``` 