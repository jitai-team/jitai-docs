---
slug: custom-controls
title: "Custom Controls Reference"
description: "Custom Controls Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Custom Controls"
---
# Custom Controls

Custom Controls are reusable UI component elements in the JitWeb framework, implemented based on React technology stack for frontend interaction functionality. They are responsible for encapsulating specific business logic, providing data binding capabilities, and responding to user operations, supporting flexible invocation in pages and workflow nodes.

The Custom Control element has a hierarchical structure of Meta (widgets.Meta) → Type (widgets.React) → Instance. Developers can quickly create custom control instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official widgets.ReactType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
Create a simple input control:

```tsx title="index.tsx"
import type { Jit } from 'jit';
import type { FC } from 'react';
import { getRuntimeApp } from 'jit';
import { Input } from 'antd';
import { useState, useEffect } from 'react';

export const Render: FC<{
    props: {
        data: InstanceType<typeof Jit.BaseDataType>;
        onChange: (v: string) => void;
    };
}> = ({ props: p }) => {
    const [value, setValue] = useState(p.data.value);
    
    useEffect(() => {
        const app = getRuntimeApp();
        const handleId = p.data.onValueChange(() => {
            setValue(p.data.value);
        });
        return () => app.off(handleId);
    }, [p.data.value]);

    const onChange = (e: any) => {
        setValue(e.target.value);
        p.onChange(e.target.value);
    };

    return <Input value={value} onChange={onChange} />;
};
```

Corresponding configuration file:

```json title="e.json"
{
  "title": "Custom Input Control",
  "type": "widgets.React",
  "outputName": "index",
  "frontBundleEntry": "index.tsx",
  "props": []
}
```

### Usage in Pages
Call through ElementRender in React components:

```tsx title="Page Usage Example"
import { ElementRender } from 'jit-web';

// Create data type instance
const textData = new Jit.datatypes.Stext({
    name: 'userInput',
    value: 'Initial value',
});

// Use custom control
<ElementRender
    elementPath="widgets.testCustomControls"
    props={{
        data: textData,
        onChange: (v: string) => {
            console.log('Value changed:', v);
        }
    }}
/>
```

Reference through widgetFullName in workflow nodes:

```json title="Node Configuration"
{
    "renderByWidget": 1,
    "widgetFullName": "widgets.testCustomControls",
    "sendData": 1,
    "sendArgs": ["node.output"]
}
```

### Configuration Properties
| Property | Type | Required | Default Value | Description |
|------|------|------|--------|------|
| title | string | Yes | - | Control display name |
| type | string | Yes | "widgets.React" | Control type, fixed value |
| outputName | string | Yes | "index" | Output file name |
| frontBundleEntry | string | Yes | "index.tsx" | Frontend entry file path |
| props | array | No | `[]` | Property configuration list |

## Variables
### data
- **Type**: `InstanceType<typeof Jit.BaseDataType>`
- **Description**: Bound data type instance, supports two-way data binding
- **Example**: Data instance passed through props, can listen to value change events

### props
- **Type**: `Record<string, any>`
- **Description**: Component properties object, containing all configuration parameters passed from external sources
- **Example**: Contains business-related properties such as data, onChange

## Methods
### getRuntimeApp()
Get current runtime application instance.

#### Return Value
- `App` - Application instance object

#### Usage Example
```tsx
const app = getRuntimeApp();
```

### publishEvent(name, data)
Publish component events, supporting cross-component communication.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| name | string | Yes | Event name |
| data | `Record<string, any>` | No | Event data |

#### Usage Example
```tsx
// Publish event
const sendEvent = () => {
    const app = getRuntimeApp();
    app?.emit({
        name: 'dataChanged',
        type: 'COMP_MESSAGE'
    }, { value: newValue });
};
```

### subscribeEvent(name, callback)
Subscribe to component events, implementing event listening.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| name | string | Yes | Event name |
| callback | Function | Yes | Event callback function |

#### Return Value
- `string` - Event handler ID, used for unsubscribing

#### Usage Example
```tsx
useEffect(() => {
    const app = getRuntimeApp();
    const handleId = app?.on(async (data) => {
        console.log('Event data:', data);
    }, async (event) => {
        return event.name === 'targetEvent';
    });
    
    return () => {
        if (handleId) app?.off(handleId);
    };
}, []);
```

### onValueChange(callback)
Listen to data value change events.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| callback | Function | Yes | Value change callback function |

#### Return Value
- `string` - Event handler ID

#### Usage Example
```tsx
useEffect(() => {
    if (!data) return;
    
    const handleId = data.onValueChange(() => {
        setValue(data.value);
    });
    
    return () => app?.off(handleId);
}, [data]);
```

## Attributes
None

## Events
### onValueChange
Data value change event, triggered when the bound data type instance value changes.

#### Parameter Details
| Parameter | Type | Description |
|------|------|------|
| value | any | New value after change |

#### Usage Example
```tsx
// Listen to data changes
useEffect(() => {
    if (!p.data) return;
    
    const app = getRuntimeApp();
    const handleId = p.data.onValueChange(() => {
        setValue(p.data.value);
    });
    
    return () => app.off(handleId);
}, [p.data]);
```

## Advanced Features
### Two-way Data Binding
Supports two-way data binding with data type instances, implementing synchronized data updates.

#### Configuration Example
```tsx
export const Render: FC<{ props: Props }> = ({ props: p }) => {
    const [value, setValue] = useState(p.data?.value);
    
    // Listen to data changes
    useEffect(() => {
        if (!p.data) return;
        
        const app = getRuntimeApp();
        const handleId = p.data.onValueChange(() => {
            setValue(p.data.value);
        });
        
        return () => app.off(handleId);
    }, [p.data]);
    
    // Update data
    const handleChange = (newValue: any) => {
        setValue(newValue);
        p.onChange?.(newValue);
        // Directly update data type instance
        if (p.data) {
            p.data.value = newValue;
        }
    };
    
    return (
        <input 
            value={value || ''} 
            onChange={(e) => handleChange(e.target.value)} 
        />
    );
};
```

### Cross-component Event Communication
Implement event publishing and subscription mechanism between components.

#### Configuration Example
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    useEffect(() => {
        const app = getRuntimeApp();
        
        // Listen to global events
        const handleId = app?.on(async (data) => {
            console.log('Received event:', data);
        }, async (event) => {
            return event.name === 'customEvent';
        });
        
        return () => {
            if (handleId) app?.off(handleId);
        };
    }, []);
    
    // Send event
    const sendEvent = () => {
        const app = getRuntimeApp();
        app?.emit({
            name: 'customEvent',
            type: 'CUSTOM_MESSAGE'
        }, { data: 'event data' });
    };
    
    return <button onClick={sendEvent}>Send Event</button>;
};
```

### Lifecycle Management
Implement complete component lifecycle control.

#### Configuration Example
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    const componentRef = useRef<any>(null);
    
    // Component mount
    useEffect(() => {
        console.log('Component mounted');
        
        // Initialization logic
        initComponent();
        
        return () => {
            // Cleanup logic
            cleanup();
            console.log('Component unmounted');
        };
    }, []);
    
    const initComponent = () => {
        // Initialize component state
    };
    
    const cleanup = () => {
        // Clean up resources, event listeners, etc.
    };
    
    return <div ref={componentRef}>Component content</div>;
};
```

### Error Handling Mechanism
Implement robust error handling and user feedback.

#### Configuration Example
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    const [error, setError] = useState<string | null>(null);
    
    const handleOperation = async () => {
        try {
            setError(null);
            // Execute potentially error-prone operations
            await someAsyncOperation();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Operation failed');
            console.error('Component operation error:', err);
        }
    };
    
    if (error) {
        return <Alert message="Error" description={error} type="error" />;
    }
    
    return (
        <div>
            <button onClick={handleOperation}>Execute Operation</button>
        </div>
    );
};
```