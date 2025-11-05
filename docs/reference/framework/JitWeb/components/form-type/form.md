---
slug: form
title: "Form Reference"
description: "Form Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Form"
---
# Form
The form is an interactive component used for data entry, editing, and viewing, implementing data management capabilities through a model-driven approach. It handles field layout rendering, data validation, and user interaction, supporting multiple display modes and rich field types, and provides comprehensive permission control, rule engine, and approval workflow integration.

The form element has a hierarchical structure of Meta (components.Meta) → Type (components.Form) → Instance. Developers can quickly create form instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.FormType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
Add form component configuration in the page's `scheme.json`:

```json title="Add Form Component in Page"
{
  "componentList": [
    {
      "fullName": "components.Form",
      "type": "components.Form", 
      "name": "CustomerForm",
      "title": "Customer Form",
      "showTitle": true,
      "config": {
        "requireElements": [
          {
            "name": "models.CustomerModel",
            "title": "Customer Model",
            "type": "models.Meta"
          }
        ],
        "componentDict": {
          "custName": {
            "key": "custName",
            "type": "field",
            "name": "custName",
            "dataType": "Stext",
            "title": "Customer Name",
            "visibleMode": "shown",
            "editMode": "editable",
            "showTitle": true,
            "isRequired": true,
            "descDisplayMode": "bottom",
            "index": 1
          },
          "submitBtn": {
            "key": "submitBtn",
            "type": "button",
            "name": "Submit",
            "outputId": "afterSubmit",
            "btnType": "primary",
            "index": 2
          }
        },
        "layoutDict": {
          "custName": {
            "key": "custName",
            "pos": "mid",
            "layout": {
              "w": 120,
              "h": 2,
              "x": 0,
              "y": 0,
              "i": "custName"
            }
          },
          "submitBtn": {
            "key": "submitBtn",
            "pos": "bottom",
            "index": 1
          }
        },
        "topLayoutJustify": "flex-start",
        "bottomLayoutJustify": "center",
        "fillMode": "none"
      }
    }
  ]
}
```

### Configuration Properties
#### requireElements (Required Data Source)
The form must bind to a model as the data source:

| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| name | string | Yes | - | Model element fullName |
| title | string | Yes | - | Model display name |
| type | string | Yes | - | Fixed as "models.Meta" |

#### Component Configuration (componentDict)
Form component configuration dictionary, supporting field, button, tabs, and other component types:

**Field Component Configuration (type: "field")**

| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| key | string | Yes | - | Field unique identifier |
| type | string | Yes | - | Fixed as "field" |
| name | string | Yes | - | Field name, corresponding to model field |
| dataType | string | Yes | - | Data type, such as "Stext", "Phone", etc. |
| title | string | Yes | - | Field display title |
| visibleMode | string | Yes | - | Display mode: "shown", "hidden" |
| editMode | string | Yes | - | Edit mode: "editable", "readonly" |
| showTitle | boolean | Yes | true | Whether to show field title |
| isRequired | boolean | Yes | false | Whether required |
| descDisplayMode | string | Yes | "bottom" | Field description display mode: "bottom", "hover" |
| index | number | Yes | - | Sort index |
| hasClickOutput | boolean | No | false | Whether to have click output event |
| hasChangeOutput | boolean | No | false | Whether to have value change output event |

**Button Component Configuration (type: "button")**

| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| key | string | Yes | - | Button unique identifier |
| type | string | Yes | - | Fixed as "button" |
| name | string | Yes | - | Button display name |
| outputId | string | Yes | - | Event output ID |
| btnType | string | No | "default" | Button type: "primary", "default", etc. |
| icon | string | No | - | Button icon |
| index | number | Yes | - | Sort index |

#### Layout Configuration (layoutDict)
**Middle Area Layout (pos: "mid")**

| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| key | string | Yes | - | Component unique identifier |
| pos | string | Yes | - | Fixed as "mid" |
| layout | object | Yes | - | Grid layout configuration |
| layout.w | number | Yes | - | Width |
| layout.h | number | Yes | - | Height |
| layout.x | number | Yes | - | X coordinate |
| layout.y | number | Yes | - | Y coordinate |
| layout.i | string | Yes | - | Component identifier |

**Top/Bottom Area Layout (pos: "top"/"bottom")**

| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| key | string | Yes | - | Component unique identifier |
| pos | string | Yes | - | "top" or "bottom" |
| index | number | Yes | - | Sort index |

#### Other Configuration Options
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| topLayoutJustify | string | No | "flex-start" | Top layout alignment: "flex-start", "center", "flex-end" |
| bottomLayoutJustify | string | No | "center" | Bottom layout alignment: "flex-start", "center", "flex-end" |
| fillMode | string | No | "none" | Fill mode: "none", "fill" |
| isHorizontalLayout | boolean | No | false | Whether to use horizontal layout |
| layoutPercent | number | No | - | Layout percentage |
| isShowStash | boolean | No | false | Whether to show stash button |
| isShowCreateAgain | boolean | No | true | Whether to show create again button |
| isShowOpRecord | boolean | No | true | Whether to show operation record |
| isShowApprovalRecord | boolean | No | false | Whether to show approval record |
| isShowResultRecord | boolean | No | false | Whether to show result record |
| manualSubmit | boolean | No | false | Whether to manually submit |
| noSubmitBtn | boolean | No | false | Don't load submit button |
| noStashBtn | boolean | No | false | Don't load stash button |
| noCreateAgain | boolean | No | false | Don't load create again button |
| noOpRecord | boolean | No | false | Don't load operation record |
| noApprovalRecord | boolean | No | false | Don't load approval record |
| triggerEventFlag | boolean | No | false | Trigger event flag |

## Variables
### mode
Form display mode variable, controlling the form's interaction state.

- **Type**: `Dropdown`
- **Optional Values**: 
  - `"add"` - Entry mode
  - `"edit"` - Edit mode  
  - `"read"` - View mode
- **Default Value**: `"add"`

### formData
Form bound data model instance, type is RowData of the associated model.

- **Type**: `RowData`
- **Generic**: Associated model type
- **Description**: Contains data for all form fields

### refreshFlag
Form refresh identifier, used to trigger form re-rendering.

- **Type**: `Numeric`
- **Description**: Internal identifier, updated each time the call method is invoked

### Sub-table Related Variables
When the form contains sub-table fields, corresponding variables are automatically generated:

- **`{fieldName}selectedRows`**: Sub-table selected multiple row data, type is `RowList`
- **`{fieldName}operatedRow`**: Sub-table operated single row data, type is `RowData`

## Methods
### call
Refresh form data and trigger related events.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| val | Record&lt;string, any&gt; | No | null | Data object to load, null when refreshing current data |

#### Return Value
Returns `Promise&lt;void&gt;`

#### Usage Example
```typescript title="Form Data Refresh Example"
// Load specified data
await form.call({
  id: 1,
  custName: "Zhang San",
  phone: "13800138000"
});

// Refresh current data
await form.call();

// Clear form
await form.call(null);
```

### publishEvent
Send component event messages to the application layer.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| name | string | Yes | - | Event name |
| ex | Record&lt;string, any&gt; | No | - | Additional data to pass |

#### Return Value
Returns `Promise&lt;void&gt;`

#### Usage Example
```typescript title="Send Event Example"
// Send custom event
await form.publishEvent('customEvent', {
  message: 'Custom data',
  timestamp: Date.now()
});
```

### subscribeEvent
Subscribe to component event messages.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| name | string | Yes | - | Event name |
| evtCb | Function | Yes | - | Event callback function |
| unSubscribeExist | boolean | No | true | Whether to cancel existing subscriptions |

#### Return Value
Returns event handler ID `string`

#### Usage Example
```typescript title="Subscribe to Event Example"
// Subscribe to form submit event
const handlerId = form.subscribeEvent('afterSubmit', async (data) => {
  console.log('Form submitted:', data);
});

// Subscribe to field change event
form.subscribeEvent('change-custName', (data) => {
  console.log('Customer name changed:', data.custName);
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| id | string | Yes | - | Event handler ID |

#### Usage Example
```typescript title="Cancel Subscription Example"
// Cancel specific event subscription
form.unSubscribeEvent(handlerId);
```

### setConfig
Dynamically set component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| next | Partial&lt;IFormConfig&gt; | Yes | - | New configuration object |
| clean | boolean | No | false | Whether to completely replace configuration |

#### Usage Example
```typescript title="Dynamic Configuration Example"
// Update configuration
form.setConfig({
  isShowStash: true,
  bottomLayoutJustify: 'flex-end'
});

// Completely replace configuration
form.setConfig(newConfig, true);
```

### destroy
Destroy component instance and clean up all event listeners and resources.

#### Usage Example
```typescript title="Destroy Component Example"
// Destroy form component and release resources
form.destroy();
```

### runCode
Execute code string in page context.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| code | string | Yes | - | Code string to execute |

#### Return Value
Returns code execution result `any`

#### Usage Example
```typescript title="Run Code Example"
// Execute simple expression
const result = form.runCode('1 + 1');

// Execute complex logic, can access page context
const value = form.runCode(`
  const customerName = this.getComponent('Form1').formData.custName.value;
  return customerName.toUpperCase();
`);
```

### getPermConfig
Get current component's permission configuration information.

#### Return Value
Returns permission configuration object `Record&lt;string, any&gt; &#124; undefined`

#### Usage Example
```typescript title="Permission Configuration Example"
// Get component permission configuration
const permConfig = form.getPermConfig();

if (permConfig) {
  console.log('Current user permissions for this form:', permConfig);
}
```

### bindApp
Bind component to specified application instance.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| app | App | Yes | - | Application instance to bind |

#### Usage Example
```typescript title="Bind Application Example"
// Usually called automatically by framework, developers generally don't need to bind manually
form.bindApp(app);
```

### bindPage
Bind component to specified page instance.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|----------------|------|----------|---------------|-------------|
| page | BasePage | Yes | - | Page instance to bind |

#### Usage Example
```typescript title="Bind Page Example"
// Usually called automatically by framework, developers generally don't need to bind manually
form.bindPage(page);
```

## Properties
### name
Component instance name, uniquely identifying the component in the page.

- **Type**: `string`
- **Description**: Unique identifier name of the component in page configuration

### title
Component display title, used for interface display.

- **Type**: `string`
- **Description**: Chinese display name of the component

### type
Component type identifier, representing the component's Type element.

- **Type**: `string`
- **Value**: `"components.Form"`
- **Description**: Fixed as form component type

### fullName
Component's complete name path.

- **Type**: `string`
- **Description**: Component identifier containing complete path

### showTitle
Whether to show component title.

- **Type**: `boolean`
- **Description**: Controls the display state of component title

### config
Component configuration object, containing all component configuration information.

- **Type**: `IFormConfig`
- **Description**: Complete form configuration, including fields, layout, rules, etc.

### app
Current application instance, providing application-level methods and data access.

- **Type**: `App`
- **Description**: Application instance the form belongs to, can be used to get other elements or global state

### page
Current page instance, providing page-level methods and data access.

- **Type**: `BasePage`
- **Description**: Page instance the form belongs to

### compType
Component type enumeration value, identifying the component's category.

- **Type**: `COMPONENT_TYPE`
- **Description**: Component type identifier, used for framework internal management

### dataTypeList
List of data type configurations contained in the component.

- **Type**: `BaseDataType[]`
- **Description**: Component's variable definition list, containing all data type configurations

```typescript title="Property Usage Example"
// Get component basic information
console.log('Component name:', form.name);
console.log('Component title:', form.title);
console.log('Component type:', form.type);
console.log('Component full name:', form.fullName);

// Set form mode
form.mode.value = "edit";

// Get form data
const data = form.formData.value;

// Modify field value
form.formData.custName.value = "Li Si";

// Save data to database
await form.formData.save();

// Get component variable list
console.log('Component variables:', form.dataTypeList);

// Get application and page instances
const app = form.app;
const page = form.page;

// Get other component instances
const table = form.app.getElement('Table1');
```

## Events
Form components dynamically generate event lists based on configuration, event types include:

### Basic Events
| Event Name | Trigger Timing | Data Type | Description |
|------------|----------------|-----------|-------------|
| afterCall | After refresh | formData | Triggered after calling call method |

### Button Events
Generate corresponding events based on button configuration's `outputId`:

```typescript title="Button Event Configuration Example"
// Button configuration
{
  "submitBtn": {
    "type": "button",
    "name": "Submit",
    "outputId": "afterSubmit"  // Generate afterSubmit event
  }
}

// Event subscription
form.subscribeEvent('afterSubmit', async (data) => {
  console.log('Form submitted:', data);
});
```

### Field Events
When fields are configured with `hasClickOutput` or `hasChangeOutput`, corresponding events are automatically generated:

```typescript title="Field Event Configuration Example"
// Field configuration
{
  "custName": {
    "type": "field",
    "name": "custName",
    "hasClickOutput": true,     // Generate click-custName event
    "hasChangeOutput": true     // Generate change-custName event
  }
}

// Event subscription
form.subscribeEvent('click-custName', (data) => {
  console.log('Customer name field clicked');
});

form.subscribeEvent('change-custName', (data) => {
  console.log('Customer name changed:', data.custName);
});
```

### Sub-table Events
Sub-table fields automatically generate rich interaction events:

```typescript title="Sub-table Event Example"
// Sub-table configuration automatically generates the following variables and events:
// Variables: {fieldName}selectedRows, {fieldName}operatedRow
// Events: {fieldName}-clickRow, {fieldName}-selectedRowList, etc.

// Listen to sub-table row click
form.subscribeEvent('orders-clickRow', (activeRow) => {
  console.log('Order row clicked:', activeRow);
});

// Listen to sub-table selected row changes
form.subscribeEvent('orders-selectedRowList', (selectedRows) => {
  console.log('Selected orders:', selectedRows);
});

// Get sub-table related variables
const selectedOrders = form.ordersselectedRows.value;
const operatedOrder = form.ordersoperatedRow.value;
```

### Related Data Events
When fields are configured with related data buttons, corresponding events are generated:

```typescript title="Related Data Event Example"
// Listen to related data create event
form.subscribeEvent('custName-createRelateData', () => {
  console.log('Customer name related data create button clicked');
});
```

## Advanced Features
### Rule Engine
Forms support four types of rule configurations:

#### Display Rules
Control field and layout show/hide:

```json title="Display Rule Configuration Example"
{
  "ruleDict": {
    "visibleRule1": {
      "key": "visibleRule1",
      "type": "visible",
      "name": "Display Rule",
      "condition": "gender == 'male'",
      "effectedFieldList": ["militaryService"],
      "effectedLayoutList": []
    }
  }
}
```

#### Required Rules
Dynamically control whether fields are required:

```json title="Required Rule Configuration Example"
{
  "ruleDict": {
    "requiredRule1": {
      "key": "requiredRule1", 
      "type": "required",
      "name": "Required Rule",
      "condition": "custLevel == 'vip'",
      "effectedFieldList": ["phone", "email"]
    }
  }
}
```

#### Edit Rules
Control whether fields are editable:

```json title="Edit Rule Configuration Example"
{
  "ruleDict": {
    "editableRule1": {
      "key": "editableRule1",
      "type": "editable", 
      "name": "Edit Rule",
      "condition": "status == 'draft'",
      "effectedFieldList": ["custName", "phone"]
    }
  }
}
```

#### Validation Rules
Custom data validation logic:

```json title="Validation Rule Configuration Example"
{
  "ruleDict": {
    "validateRule1": {
      "key": "validateRule1",
      "type": "validate",
      "name": "Validation Rule",
      "validateType": "custom",
      "condition": "phone.length == 11",
      "tip": "Phone number must be 11 digits",
      "handleType": "error"
    }
  }
}
```

### Complex Layout Components
#### Tabs Component
```json title="Tabs Configuration Example"
{
  "componentDict": {
    "tabsBasic": {
      "key": "tabsBasic",
      "type": "tabs",
      "name": "Basic Information",
      "showName": true,
      "pos": "top",
      "style": "line",
      "tabList": [
        {"id": "tab1", "name": "Personal Information"},
        {"id": "tab2", "name": "Contact Information"}
      ]
    }
  }
}
```

#### Collapse Panel Component
```json title="Collapse Panel Configuration Example"
{
  "componentDict": {
    "collapseBasic": {
      "key": "collapseBasic",
      "type": "collapse",
      "name": "Detailed Information",
      "accordion": false,
      "defaultExpandAll": true,
      "panelList": [
        {"id": "panel1", "name": "Basic Information"},
        {"id": "panel2", "name": "Extended Information"}
      ]
    }
  }
}
```

#### Divider Component
```json title="Divider Configuration Example"
{
  "componentDict": {
    "divider1": {
      "key": "divider1",
      "type": "divider",
      "name": "Divider",
      "title": "Customer Information",
      "style": "line",
      "color": "#d9d9d9",
      "titleColor": "#666666"
    }
  }
}
```

### Permission Control
Forms support role-based field permission control:

```json title="Permission Configuration Example"
{
  "readAccessControl": ["custName", "phone"],
  "editAccessControl": ["custName"],
  "isShowAllReadField": false,
  "isShowAllEditField": true
}
```

### Approval Workflow Integration
Forms are deeply integrated with approval workflows, supporting approval record display:

```json title="Approval Integration Configuration Example"
{
  "isShowApprovalRecord": true,
  "approvalOption": {
    "isSelectAll": false,
    "selected": ["workflow1", "workflow2"],
    "isOnlyShowStartAR": true
  },
  "workflowName": "Customer Approval Workflow",
  "nodeId": "node1"
}
```