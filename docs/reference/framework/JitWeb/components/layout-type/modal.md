---
slug: modal
---
# Modal
The modal is a page overlay container component, implementing dialog and drawer modal interfaces based on Ant Design's Modal and Drawer components. It handles temporary content display, user interaction confirmation, and complex form entry, supporting both modal and non-modal display modes, custom size and position configuration, and embedding other components to build complex modal interfaces.

The modal element has a hierarchical structure of Meta (components.Meta) → Type (components.Modal) → Instance. Developers can quickly create modal instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ModalType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
├── MyPage/
│   ├── e.json
│   ├── index.ts  
│   ├── page.ts
│   └── scheme.json
```

```json title="pages/MyPage/scheme.json - Modal Component Configuration"
{
  "componentList": [
    {
      "fullName": "components.Modal",
      "type": "components.Modal",
      "name": "confirmModal",
      "title": "Confirmation Modal",
      "config": {
        "requireElements": [],
        "size": "normal",
        "type": "modal",
        "position": "page",
        "maskClosable": false,
        "showCloseControl": true,
        "bottomButtonList": [
          {
            "id": "confirm",
            "name": "Confirm",
            "type": "primary"
          },
          {
            "id": "cancel", 
            "name": "Cancel",
            "type": "default"
          }
        ],
        "bottomButtonAlign": "right",
        "layout": []
      },
      "showTitle": true
    }
  ]
}
```

```tsx title="pages/MyPage/page.ts - Call Modal"
import { BasePage } from 'common/type';

export class MyPage extends BasePage {
  async showConfirmDialog() {
    const modal = app.getElement('confirmModal');
    await modal.call('Please confirm your operation');
  }
  
  async handleConfirm() {
    const modal = app.getElement('confirmModal');
    // Handle confirmation logic
    await modal.close();
  }
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|---------------|------|-------------|---------------|----------|
| size | string | Modal size: small&#124;normal&#124;big&#124;fullWindow | normal | No |
| type | string | Modal type: modal&#124;drawer | modal | No |
| position | string | Modal position: fullscreen&#124;page | page | No |
| maskClosable | boolean | Whether clicking mask closes modal | false | No |
| showCloseControl | boolean | Whether to show close button | true | No |
| bottomButtonList | ButtonProps[] | Bottom button configuration list | [] | No |
| bottomButtonAlign | string | Bottom button alignment: left&#124;center&#124;right | center | No |
| customWidth | number | Custom width (pixels) | - | No |
| customHeight | number | Custom height (pixels) | - | No |
| placement | string | Drawer position: right&#124;top&#124;bottom&#124;left | right | No |
| layout | Layout[] | Internal component layout configuration | [] | No |
| requireElements | requireElement[] | Dependent element configuration | [] | No |

## Variables
### modalTitle
Modal title text variable, used to dynamically set the modal's display title.

- **Type**: Stext
- **Default Value**: Component title property value
- **Usage**: `modal.modalTitle.value = 'New Title'`

## Methods
### call
Open modal and optionally set title.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| modalTitle | string | Modal title text | - | No |

#### Return Value
- **Type**: `Promise<void>`

#### Usage Example
```tsx title="Open Modal Example"
// Open with default title
await modal.call();

// Set title then open
await modal.call('User Information Confirmation');

// Call in event handler
button.subscribeEvent('onClick', async () => {
  await modal.call('Operation Confirmation');
});
```

### close
Close modal.

#### Return Value
- **Type**: `Promise<void>`

#### Usage Example
```tsx title="Close Modal Example"
// Directly close modal
await modal.close();

// Close in button event
modal.subscribeEvent('onClickCancel', async () => {
  await modal.close();
});
```

### open
Internal method, directly set modal to open state and trigger after-open event.

#### Usage Example
```tsx title="Directly Open Modal"
modal.open();
```

### closeState
Internal method, set modal to closed state and trigger after-close event.

#### Usage Example
```tsx title="Directly Close Modal State"
modal.closeState();
```

### getButtonList
Filter and set bottom button list based on permission configuration.

#### Usage Example
```tsx title="Update Button List"
modal.getButtonList();
```

### setConfig
Set component configuration, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | object | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Usage Example
```tsx title="Dynamically Update Configuration"
modal.setConfig({
  size: 'big',
  maskClosable: true
});
```

### publishEvent
Publish component events, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | object | Additional data | - | No |

#### Usage Example
```tsx title="Publish Custom Event"
await modal.publishEvent('customEvent', { data: 'value' });
```

### subscribeEvent
Subscribe to component events, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | function | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
- **Type**: `string` - Subscription handle ID

#### Usage Example
```tsx title="Subscribe to Event Example"
const handleId = modal.subscribeEvent('afterOpen', async (data) => {
  console.log('Modal opened', data);
});
```

### unSubscribeEvent
Cancel event subscription, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Subscription handle ID | - | Yes |

#### Usage Example
```tsx title="Unsubscribe"
modal.unSubscribeEvent(handleId);
```

### destroy
Destroy component and clean up all resources, inherited from BaseComponent.

#### Usage Example
```tsx title="Destroy Component"
// Manually destroy component, clean up event listeners and internal resources
modal.destroy();
```

### runCode
Execute dynamic code, run in page context, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | JavaScript code to execute | - | Yes |

#### Return Value
- **Type**: `any` - Code execution result

#### Usage Example
```tsx title="Execute Dynamic Code"
// Execute code in page context
const result = modal.runCode(`
  const currentUser = this.getCurrentUser();
  return currentUser.role === 'admin';
`);

if (result) {
  console.log('Current user is admin');
}
```

### getPermConfig
Get current component's permission configuration, inherited from BaseComponent.

#### Return Value
- **Type**: `Record<string, any> | undefined` - Permission configuration object

#### Usage Example
```tsx title="Get Permission Configuration"
const permConfig = modal.getPermConfig();
if (permConfig?.button) {
  console.log('Has button permission:', permConfig.button);
}
```

## Properties
### openState
Modal open/close state variable, controls modal display and hide.

- **Type**: Numeric
- **Value Meaning**: 0=closed, 1=open
- **Usage**: `modal.openState.value = 1`

### config
Component configuration object, containing all modal configuration items, inherited from BaseComponent.

- **Type**: `ModalConfig & { requireElements: requireElement[] }`
- **Usage**: `modal.config.size = 'big'`

### name
Component instance name, inherited from BaseComponent.

- **Type**: string
- **Usage**: `modal.name`

### title
Component display title, inherited from BaseComponent.

- **Type**: string
- **Usage**: `modal.title`

### type
Component type identifier, inherited from BaseComponent.

- **Type**: string
- **Value**: 'components.Modal'

### fullName
Component full name, inherited from BaseComponent.

- **Type**: string
- **Value**: 'components.Modal'

### showTitle
Whether to show component title, inherited from BaseComponent.

- **Type**: boolean

### app
Associated application instance, inherited from BaseComponent.

- **Type**: App
- **Usage**: `modal.app`

### page
Associated page instance, inherited from BaseComponent.

- **Type**: BasePage
- **Usage**: `modal.page`

### compType
Component type classification, inherited from BaseComponent.

- **Type**: COMPONENT_TYPE
- **Value Meaning**: normal、layout、reference
- **Usage**: `modal.compType`

### dataTypeList
Component variable data type list, inherited from BaseComponent.

- **Type**: BaseDataType[]
- **Usage**: `modal.dataTypeList`

## Events
### afterOpen
Event triggered after modal opens.

#### Usage Example
```tsx title="Listen to Modal Open Event"
modal.subscribeEvent('afterOpen', async () => {
  console.log('Modal opened');
  // Can execute post-open logic here
  await loadModalData();
});
```

### afterClose
Event triggered after modal closes.

#### Usage Example
```tsx title="Listen to Modal Close Event"
modal.subscribeEvent('afterClose', async () => {
  console.log('Modal closed');
  // Clean up modal data
  await clearModalData();
});
```

### Dynamic Button Events
Dynamic events triggered after clicking bottom buttons, event name format is `onClick` + button ID, such as `onClickConfirm`, `onClickCancel`.

#### Usage Example
```tsx title="Listen to Button Click Event"
// Listen to button with ID confirm click
modal.subscribeEvent('onClickConfirm', async () => {
  console.log('Confirm button clicked');
  await handleConfirm();
  await modal.close();
});

// Listen to button with ID cancel click  
modal.subscribeEvent('onClickCancel', async () => {
  console.log('Cancel button clicked');
  await modal.close();
});
```

## Advanced Features
### Drawer Modal Configuration
When sidebar-style modal is needed, can configure as drawer type:

```tsx title="Drawer Modal Configuration Example"
const drawerConfig = {
  type: 'drawer',
  placement: 'right',
  size: 'normal',
  showCloseControl: true,
  maskClosable: false
};

modal.setConfig(drawerConfig);
await modal.call('Sidebar Information');
```

### Nested Component Layout
Modals can nest other components, implementing complex interfaces through layout configuration:

```tsx title="Nested Component Configuration"
const layoutConfig = {
  layout: [
    { i: 'Form1', x: 0, y: 0, w: 12, h: 8 },
    { i: 'Table1', x: 0, y: 8, w: 12, h: 10 }
  ]
};

modal.setConfig(layoutConfig);
```

### Fullscreen Modal Mode
Suitable for complex forms or large data display scenarios:

```tsx title="Fullscreen Modal Configuration"
modal.setConfig({
  size: 'fullWindow',
  position: 'fullscreen'
});
```

### Custom Button Configuration
Supports multi-button configuration and permission control:

```tsx title="Complex Button Configuration"
const buttonConfig = {
  bottomButtonList: [
    { id: 'save', name: 'Save', type: 'primary' },
    { id: 'saveAndContinue', name: 'Save and Continue', type: 'default' },
    { id: 'cancel', name: 'Cancel', type: 'default' }
  ],
  bottomButtonAlign: 'center'
};

modal.setConfig(buttonConfig);

// Handle each button event separately
modal.subscribeEvent('onClickSave', async () => {
  await saveData();
  await modal.close();
});

modal.subscribeEvent('onClickSaveAndContinue', async () => {
  await saveData();
  await clearForm();
});
```