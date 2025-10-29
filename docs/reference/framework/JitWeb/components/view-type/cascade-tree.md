---
slug: cascade-tree
title: "Cascade Tree Reference"
description: "Cascade Tree Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Cascade Tree"
---
# Cascade Tree
Cascade Tree is a tree structure component for displaying hierarchical relationship data, implementing parent-child node cascade selection and linkage relationships based on data models. It handles tree data display, node selection interaction, and cascade operations, supporting single-select and multi-select modes, suitable for organizational structures, category directories, region selection, and other scenarios.

The Cascade Tree element has a hierarchical structure of Meta (components.Meta) → Type (components.CascadeTree) → Instance. Developers can quickly create Cascade Tree instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.CascadeTreeType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
├── MyPage/
│   ├── e.json
│   └── scheme.json
```

```json title="Page Configuration Example"
{
  "fullName": "components.CascadeTree",
  "type": "components.CascadeTree", 
  "name": "CascadeTree1",
  "title": "Cascade Tree 1",
  "config": {
    "requireElements": [
      {
        "title": "Data Model",
        "type": "models.Meta",
        "name": "models.DeptModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "nodeTile": "name",
    "childNode": "parentId", 
    "mode": 1,
    "defaultRender": true
  },
  "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|---------------|------|-------------|---------------|----------|
| requireElements | `Array<Object>` | Associated data model configuration | - | Yes |
| nodeTile | string | Node display field name | - | Yes |
| childNode | string | Child node association field name | - | Yes |
| mode | number | Selection mode, 1 for single-select, 0 for multi-select | 1 | No |
| defaultRender | boolean | Whether to use default rendering | true | No |

## Variables
### selectedRowList
Selected multi-row data variable, type `RowList`, read-only. Stores all data records corresponding to tree nodes selected by the user.

### clickRow
Operated single-row data variable, type `RowData`, read-only. Stores the data record corresponding to the tree node most recently clicked by the user.

### loading
Loading state variable, type `Numeric`, represents the current loading state of the component. Value 1 indicates loading, 0 indicates loading complete.

## Methods
### publishEvent
Send component event message.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | `Record<string, any>` | Additional data | - | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Send Custom Event"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Send custom event
await cascadeTree.publishEvent('customEvent', { 
  message: 'Tree data updated',
  nodeCount: 10 
});
```

### subscribeEvent
Subscribe to component event message.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | Function | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscription | true | No |

#### Return Value
string - Returns event handler ID

#### Usage Example
```tsx title="Subscribe to Component Event"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Subscribe to refresh event
const handlerId = cascadeTree.subscribeEvent('refresh', (data) => {
  console.log('Cascade tree refreshed:', data);
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
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Cancel subscription
cascadeTree.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | Object | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
No return value

#### Usage Example
```tsx title="Update Component Configuration"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Update partial configuration
cascadeTree.setConfig({
  mode: 0, // Change to multi-select mode
  nodeTile: 'title'
});

// Completely replace configuration
cascadeTree.setConfig({
  requireElements: [/* new data model configuration */],
  nodeTile: 'name',
  childNode: 'parentId',
  mode: 1
}, true);
```

### refresh
Refresh cascade tree data, supports passing in filter conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| qFilter | QFilter | Filter condition for filtering data | - | No |

#### Return Value
No return value

#### Usage Example
```tsx title="Refresh Cascade Tree"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Refresh without conditions
await cascadeTree.refresh();

// Refresh with filter conditions
const filter = Q('status', '=', 'active');
await cascadeTree.refresh(filter);
```

### getRowDataList
Get tree data list, supports create and update modes.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| options | Object | Configuration object | - | Yes |
| options.filter | Qex \| null | Filter condition | null | No |
| type | 'create' \| 'update' | Operation type | 'create' | No |
| key | string | Node key for update | - | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Get Data List"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Get data in create mode
await cascadeTree.getRowDataList({ filter: null });

// Append data in update mode
const filter = Q('parentId', '=', '123');
await cascadeTree.getRowDataList({ filter }, 'update', 'nodeKey123');
```

### updateTreeData
Update tree data structure, used for dynamically updating tree nodes.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| data | `Record<string, any>` | Data to update | - | Yes |
| type | 'create' \| 'update' | Operation type | 'create' | No |
| key | string | Node key | - | No |

#### Return Value
No return value

#### Usage Example
```tsx title="Update Tree Data"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Update child data for specified node
const newData = [
  { id: '101', name: 'New Department 1', parentId: '100' },
  { id: '102', name: 'New Department 2', parentId: '100' }
];
cascadeTree.updateTreeData(newData, 'update', '100');
```

### getPermConfig
Get component's permission configuration information.

#### Return Value
`Record<string, any>` \| undefined

#### Usage Example
```tsx title="Get Permission Configuration"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

const permConfig = cascadeTree.getPermConfig();
if (permConfig) {
  console.log('Component permission configuration:', permConfig);
}
```

### runCode
Run custom code string.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code string to execute | - | Yes |

#### Return Value
any

#### Usage Example
```tsx title="Run Custom Code"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Execute custom logic
const result = cascadeTree.runCode(`
  return this.selectedRowList.length > 0 ? 'Nodes selected' : 'No nodes selected';
`);
```

### destroy
Destroy component instance, clean up resources and event listeners.

#### Return Value
No return value

#### Usage Example
```tsx title="Destroy Component"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Destroy component
cascadeTree.destroy();
```

## Attributes
### app
Read-only property, type App, gets current application instance.

### page
Read-only property, type BasePage, gets current page instance.

### name
Read-only property, type string, gets component name.

### title
Read-only property, type string, gets component title.

### config
Read-only property, type Object, gets component configuration object.

### type
Read-only property, type string, gets component type identifier.

### showTitle
Read-only property, type boolean, gets whether to display component title.

### treeData
Read-only property, type `TreeDataNode[]`, gets current tree data structure. Each node contains title, key, isLeaf and other properties.

### rowDataList
Read-only property, type `Record<string, any>[]`, gets current component's raw data list.

### primaryKey
Read-only property, type string, gets data model's primary key field name, defaults to 'id'.

### fieldDefineList
Read-only property, type `DataTypeConfig[]`, gets associated data model's field definition list.

### allFieldDict
Read-only property, type `Record<string, DataTypeConfig>`, gets associated data model's field dictionary with field name as key.

## Events
### onNodeClick
Node click event, triggered when user clicks a tree node.

#### Parameter Details
Event callback function receives `clickRow` variable as parameter, containing complete data of the clicked node.

#### Usage Example
```tsx title="Listen for Node Click Event"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Subscribe to node click event
cascadeTree.subscribeEvent('onNodeClick', (data) => {
  console.log('Clicked node data:', data);
  const nodeId = data.id.value;
  const nodeName = data.name.value;
  console.log(`Clicked node: ${nodeName} (ID: ${nodeId})`);
});
```

### onSelectNode
Node selection event, triggered when user selects tree nodes (in multi-select mode).

#### Parameter Details
Event callback function receives `selectedRowList` variable as parameter, containing data list of all selected nodes.

#### Usage Example
```tsx title="Listen for Node Selection Event"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// Subscribe to node selection event
cascadeTree.subscribeEvent('onSelectNode', (data) => {
  console.log('Selected node list:', data);
  const selectedCount = data.length;
  console.log(`${selectedCount} nodes selected`);
  
  // Iterate through selected nodes
  data.forEach((node, index) => {
    console.log(`Selected node ${index + 1}: ${node.name.value}`);
  });
});
```

## Advanced Features
### Cascade Data Loading
Cascade tree supports on-demand loading of child node data through the `childNode` field to establish parent-child relationships. Initial loading only displays root nodes (records where childNode field is empty), dynamically loads child nodes when expanding.

```tsx title="Configure Cascade Loading"
{
  "config": {
    "requireElements": [
      {
        "name": "models.DeptModel",
        "filter": "",
        "orderBy": "sort ASC"
      }
    ],
    "nodeTile": "name",
    "childNode": "parentId",
    "mode": 1
  }
}
```

### Permission Control Integration
Cascade tree automatically integrates permission configuration, supporting role-based data access control.

```tsx title="Permission Configuration Example"
// Component automatically applies permission filtering
const permConfig = cascadeTree.getPermConfig();
// Permission filtering automatically merges into query conditions
```

### Custom Filtering and Sorting
Supports configuring data filter conditions and sorting rules through requireElements.

```tsx title="Configure Filtering and Sorting"
{
  "requireElements": [
    {
      "name": "models.DeptModel",
      "filter": "Q(status='active')",
      "orderBy": "sort ASC, name ASC"
    }
  ]
}
```