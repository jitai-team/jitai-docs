---
slug: button
title: "Button Reference"
sidebar_label: "Button"
description: "Button component API reference. Complete configuration options, event handlers, and programmatic usage for operation buttons."
---
# Button
The button is a basic interactive component responsible for triggering various operations and events. It implements user interaction functionality based on Ant Design Button component, supporting multiple button styles, status display, permission control, and conditional display, providing asynchronous operation and loading state feedback capabilities.

The button element has a hierarchical structure of Meta (components.Meta) → Type (components.Button) → Instance. Developers can quickly create button instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ButtonType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
└── TestPage/
    ├── e.json
    ├── scheme.json
    └── page.tsx
```

```json title="pages/TestPage/scheme.json - Button Component Configuration"
{
  "components": [
    {
      "fullName": "components.Button",
      "type": "components.Button", 
      "name": "submitBtn",
      "title": "Submit Button",
      "config": {
        "requireElements": [],
        "name": "Submit",
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

```tsx title="pages/TestPage/page.tsx - Usage Example"
import { useEffect } from 'react';

export default function TestPage() {
  const submitBtn = app.getElement('submitBtn');

  useEffect(() => {
    // Subscribe to button click event
    submitBtn.subscribeEvent('click', async () => {
      console.log('Button clicked');
      // Execute submit logic
    });
  }, []);

  return <div>{/* Page content */}</div>;
}
```

### Configuration Properties
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Button title text | Button | Yes |
| color | string | Custom color | - | No |
| icon | string | Icon name | - | No |
| type | string | Button type: default &#124; primary &#124; ghost &#124; dashed &#124; link &#124; solid &#124; outline &#124; none | primary | No |
| size | string | Font size, e.g. 16px | 17px | No |
| overbold | boolean | Whether to display in bold | false | No |
| showTitle | boolean | Whether to show title | true | No |
| requireElements | requireElement[] | Dependent element configuration | `[]` | No |

## Variables
Component variables are runtime business data with specific data types that can be accessed and manipulated in code.

### btnTitle
Read-only button title variable, type is STEXT. Stores current button's display text, synchronized with the `name` field in configuration.

```tsx title="Get Button Title"
const button = app.getElement('myButton');
console.log(button.btnTitle.value); // Output current button title
```

## Methods
### edit
Modify button title and update display.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| btnTitle | string | New button title | - | Yes |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Dynamically Modify Button Title"
const button = app.getElement('myButton');

// Modify button title
await button.edit('New Title');
```

### publishEvent
Send component event messages.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Additional parameters | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Send Custom Event"
const button = app.getElement('myButton');

// Send custom event
await button.publishEvent('customEvent', { data: 'test' });
```

### subscribeEvent
Subscribe to component event messages.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
string - Event handler ID

#### Usage Example
```tsx title="Subscribe to Button Event"
const button = app.getElement('myButton');

// Subscribe to click event
const handlerId = button.subscribeEvent('click', async (data) => {
  console.log('Button clicked', data);
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Event handler ID | - | Yes |

#### Return Value
boolean

#### Usage Example
```tsx title="Cancel Event Subscription"
const button = app.getElement('myButton');

button.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | Partial&lt;T & `{ requireElements: requireElement[] }`&gt; | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
void

#### Usage Example
```tsx title="Update Button Configuration"
const button = app.getElement('myButton');

// Partial configuration update
button.setConfig({ type: 'primary', size: '18px' });

// Completely replace configuration
button.setConfig(newConfig, true);
```

### newVariable
Create component variable instance.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| varConfig | DataTypeConfig | Variable configuration | - | Yes |

#### Return Value
BaseDataType

### runCode
Execute code string.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code to execute | - | Yes |

#### Return Value
any

### getPermConfig
Get component permission configuration.

#### Return Value
Record&lt;string, any&gt; &#124; undefined

### bindApp
Bind application instance.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| app | App | Application instance | - | Yes |

#### Return Value
void

### bindPage
Bind page instance.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| page | BasePage | Page instance | - | Yes |

#### Return Value
void

### getEventKey
Generate unique key name for component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| eventName | string | Event name | - | Yes |

#### Return Value
string

### initVariables
Initialize component variable instances.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| dataTypeList | BaseDataType[] | Variable definition list | - | Yes |

#### Return Value
void

### getVariableList
Get component variable definition list (static method).

#### Return Value
VariableConfig[]

### getFuncList
Get component method definition list (static method).

#### Return Value
FuncConfig[]

### getEventList
Get component event definition list (static method).

#### Return Value
EventConfig[]

### destroy
Destroy component instance and clean up resources.

#### Return Value
void

## Properties
Component properties are basic metadata of instance objects, used to identify and manage components.

### name
Component instance name, string type.

### title
Component display title, string type.

### config
Component configuration object, containing all configuration parameters.

### compType
Component classification type identifier.

### showTitle
Whether to show component title, boolean type.

### type
Component type identifier string.

### app
Current application instance, App type.

### page
Current page instance, BasePage type.

## Events
### click
Event triggered after button click.

#### Parameter Details
Event carries data as the value of btnTitle variable.

#### Usage Example
```tsx title="Handle Button Click Event"
const button = app.getElement('myButton');

button.subscribeEvent('click', async (data) => {
  console.log('Button title:', data.btnTitle);
  
  // Execute business logic
  const result = await someBusinessAction();
  
  if (result.success) {
    // Update button status
    await button.edit('Operation Successful');
  }
});
```

## Advanced Features
### Permission Control
Button component supports display control based on permission configuration. When `permitButton` array in permission configuration is empty, the button will not be displayed.

```tsx title="Permission Control Example"
const button = app.getElement('myButton');
const permConfig = button.getPermConfig();

// Check button permission
if (permConfig?.permitButton?.length === 0) {
  console.log('User has no permission to view this button');
}
```

### Style Customization
Button supports multiple style types and custom style configuration.

```json title="Style Configuration Example"
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

### Event Communication
Button component supports publish-subscribe pattern event communication, enabling data interaction with other components.

```tsx title="Inter-Component Communication Example"
const button = app.getElement('submitButton');
const table = app.getElement('dataTable');

// Refresh table after button click
button.subscribeEvent('click', async () => {
  await table.publishEvent('refresh');
});
```