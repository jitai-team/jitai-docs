---
slug: cascade-table
title: "Cascade Table Reference"
description: "Cascade Table Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Cascade Table"
---
# Cascade Table
Cascade Table is a table component that supports hierarchical relationship data display, implementing parent-child cascade display and linkage operations based on tree data structure. It handles hierarchical data display, expand/collapse operations, and cascade data linkage, supporting visual management of multi-level data structures and data operations for complex relationships.

The Cascade Table element has a hierarchical structure of Meta (components.Meta) → Type (components.CascadeTableNew) → Instance. Developers can quickly create Cascade Table instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.CascadeTableNewType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
└── MyPage/
    ├── e.json
    ├── scheme.json
    └── page.tsx
```

**scheme.json Configuration Example**
```json title="Basic Cascade Table Configuration"
{
  "fullName": "components.CascadeTableNew",
  "type": "components.CascadeTableNew", 
  "name": "myCascadeTable",
  "title": "My Cascade Table",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.OrganizationModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "parentFieldName": "parentId",
    "childFieldName": "id",
    "fieldIdList": ["id", "name", "type", "level"],
    "autoLoad": true,
    "disableSelect": false,
    "fieldConfig": {
      "name": {
        "alias": "Organization Name",
        "position": "left",
        "columnClick": true,
        "width": 200
      }
    }
  }
}
```

**Component Usage Example**
```tsx title="Get and Operate Cascade Table"
const cascadeTable = app.getElement('myCascadeTable');

// Refresh data
await cascadeTable.call();

// Load specified data and expand
await cascadeTable.loadDataAndExpand([
  { id: 1, name: 'Headquarters', parentId: null },
  { id: 2, name: 'Branch Office', parentId: 1 }
], true);

// Get selected data
console.log(cascadeTable.selectedRowList.value);
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|---------------|------|-------------|---------------|----------|
| parentFieldName | string | Parent field name, used to establish parent-child relationship | - | Yes |
| childFieldName | string | Child field name, usually the primary key field | - | Yes |
| fieldIdList | string[] | List of fields to display | `[]` | Yes |
| autoLoad | boolean | Whether to auto-load data | `true` | No |
| disableSelect | boolean | Whether to disable selection column | `false` | No |
| toolbarLeft | CascadeTableNewButtonProps[] | Left toolbar button configuration | `[]` | No |
| toolbarRight | CascadeTableNewButtonProps[] | Right toolbar button configuration | `[]` | No |
| actionBtn | CascadeTableNewButtonProps[] | Action column button configuration | `[]` | No |
| existChildFilter | string | Filter expression for child existence condition | `""` | No |
| fieldConfig | `Record<string, CascadeTableNewFieldConfig>` | Field configuration object | `{}` | No |

## Variables
### displayRowList
Displayed multi-row data variable, containing all data rows currently displayed in the cascade table.

**Type**: `RowList<T>` (read-only)

### selectedRowList
Selected multi-row data variable, containing the collection of data rows currently selected by the user.

**Type**: `RowList<T>` (read-only)

### activeRow
Operated single-row data variable, representing the data row currently being operated or clicked.

**Type**: `RowData<T>` (read-only)

### filter
Filter condition variable, used to control data filtering in the cascade table.

**Type**: `QFilter<T>`

## Methods
### call
Refresh cascade table data, can pass in new filter conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| qFilter | `QFilter` \| `string` \| `undefined` | Filter condition, supports Q expressions | - | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Refresh Cascade Table"
// Refresh without conditions
await cascadeTable.call();

// Refresh with filter conditions
await cascadeTable.call("Q(status='active')");
```

### loadDataAndExpand
Load specified data and expand display, supports preset data and expand state.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| rowDataList | `Record<string, any>[]` \| `RowList` | Data list to load | - | Yes |
| defaultExpandedAll | boolean | Whether to expand all nodes by default | `true` | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Load Data and Expand"
// Load department data and expand all
await cascadeTable.loadDataAndExpand([
  { id: 1, name: 'Headquarters', parentId: null },
  { id: 2, name: 'Technology Department', parentId: 1 },
  { id: 3, name: 'Frontend Group', parentId: 2 }
], true);

// Load data but don't auto-expand
await cascadeTable.loadDataAndExpand(departmentData, false);
```

### subscribeEvent
Subscribe to component events, set event listeners.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| eventName | string | Event name | - | Yes |
| callback | Function | Callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel subscription for existing events with same name | `true` | No |

#### Return Value
`string` - Event handler ID

#### Usage Example
```tsx title="Subscribe to Event"
const handlerId = cascadeTable.subscribeEvent('selectedChange', (data) => {
  console.log('Selection changed:', data);
});
```

### publishEvent
Publish component event, trigger subscribed event listeners.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| eventName | string | Event name | - | Yes |
| data | any | Event data | - | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Publish Event"
await cascadeTable.publishEvent('selectedChange', {
  selectedRowList: cascadeTable.selectedRowList
});
```

### unSubscribeEvent
Cancel subscription for specified event listener.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| handlerId | string | Event handler ID | - | Yes |

#### Return Value
`void`

#### Usage Example
```tsx title="Cancel Event Subscription"
const handlerId = cascadeTable.subscribeEvent('selectedChange', callback);
// Cancel subscription
cascadeTable.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration, supports partial update or complete replacement of configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | `Partial<CascadeTableNewComponentConfig>` | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | `false` | No |

#### Return Value
`void`

#### Usage Example
```tsx title="Set Component Configuration"
// Partial configuration update
cascadeTable.setConfig({
  autoLoad: false,
  disableSelect: true
});

// Complete configuration replacement
cascadeTable.setConfig(newConfig, true);
```

### runCode
Execute code string, run in page context.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code string to execute | - | Yes |

#### Return Value
`any` - Code execution result

#### Usage Example
```tsx title="Execute Code"
const result = cascadeTable.runCode(`
  return this.getElement('otherComponent').selectedRowList.value;
`);
```

### getPermConfig
Get current component's permission configuration.

#### Return Value
`Record<string, any>` | `undefined` - Permission configuration object

#### Usage Example
```tsx title="Get Permission Configuration"
const permConfig = cascadeTable.getPermConfig();
if (permConfig?.readonly) {
  console.log('Component is in read-only state');
}
```

## Attributes
### config
Component's configuration object, containing all cascade table configuration options.

**Type**: `CascadeTableNewComponentConfig`

### ModelClass
Associated data model class, used for data operations and type definitions.

**Type**: `typeof Jit.BaseModel`

### title
Component's title.

**Type**: `string`

### name
Component's name identifier.

**Type**: `string`

### type
Component's type identifier.

**Type**: `string`

### compType
Component's type enum value.

**Type**: `COMPONENT_TYPE`

### showTitle
Whether to display component title.

**Type**: `boolean`

### app
Current application instance, provides application-level API access.

**Type**: `App` (read-only)

### page
Current page instance, provides page-level API access.

**Type**: `BasePage` (read-only)

## Events
### selectedChange
Event triggered after selected row changes.

#### Parameter Details
| Parameter Name | Type | Description |
|----------------|------|-------------|
| selectedRowList | RowList | Currently selected multi-row data |

#### Usage Example
```tsx title="Listen for Selected Row Changes"
cascadeTable.subscribeEvent('selectedChange', (data) => {
  console.log('Selected data:', data.selectedRowList.value);
  // Handle selected data change logic
});
```

### afterClickRow
Event triggered after clicking a table row.

#### Parameter Details
| Parameter Name | Type | Description |
|----------------|------|-------------|
| activeRow | RowData | Clicked row data |

#### Usage Example
```tsx title="Listen for Row Click Event"
cascadeTable.subscribeEvent('afterClickRow', (data) => {
  console.log('Clicked row:', data.activeRow.value);
  // Handle row click logic
});
```

### afterRowChange
Event triggered after any field value changes.

#### Parameter Details
| Parameter Name | Type | Description |
|----------------|------|-------------|
| activeRow | RowData | Modified row data |

#### Usage Example
```tsx title="Listen for Field Value Changes"
cascadeTable.subscribeEvent('afterRowChange', (data) => {
  console.log('Data changed:', data.activeRow.value);
  // Handle data change logic
});
```

## Advanced Features
### Custom Field Configuration
Through fieldConfig, you can finely control the display and interaction behavior of each field, supporting advanced features like column width settings, alignment, click events, and inline editing.

```json title="Field Configuration Example"
{
  "fieldConfig": {
    "name": {
      "alias": "Organization Name",
      "position": "left",
      "columnClick": true,
      "inlineEdit": false,
      "wrap": false,
      "width": 200
    },
    "status": {
      "alias": "Status",
      "position": "center", 
      "columnClick": false,
      "inlineEdit": true,
      "width": 100
    }
  }
}
```

### Toolbar Button Configuration
Supports adding custom operation buttons at the top of the table, can configure left/right toolbar buttons and action column buttons.

```json title="Toolbar Configuration"
{
  "toolbarLeft": [
    {
      "id": "add",
      "name": "Add",
      "type": "primary",
      "width": 80
    }
  ],
  "toolbarRight": [
    {
      "id": "export",
      "name": "Export",
      "width": 80
    }
  ],
  "actionBtn": [
    {
      "id": "edit",
      "name": "Edit",
      "width": 60
    },
    {
      "id": "delete", 
      "name": "Delete",
      "width": 60
    }
  ]
}
```