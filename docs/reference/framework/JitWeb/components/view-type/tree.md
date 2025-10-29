---
slug: tree
title: "Tree Reference"
description: "Tree Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Tree"
---
# Tree
Tree is a view component for displaying hierarchical structure data, building multi-level tree navigation based on data model fields. It is responsible for data loading, hierarchical display and node interaction, supporting single and multiple selection modes, providing node click events and filter condition output.

The tree element hierarchy is Meta (components.Meta) → Type (components.Tree) → Instance. Developers can quickly create tree instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.TreeType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```typescript title="Basic Tree Configuration"
{
  "firstLevel": ["department"],
  "secondLevel": ["position"], 
  "mode": "single",
  "defaultRender": true,
  "defaultFirstSelected": false,
  "requireElements": [
    {
      "name": "models.EmployeeModel",
      "filter": "",
      "orderBy": ["id"]
    }
  ]
}
```

### Configuration Properties
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| firstLevel | string[] | Yes | [] | First level field array |
| secondLevel | string[] | Yes | [] | Second level field array |
| thirdLevel | string[] | No | [] | Third level field array |
| forthLevel | string[] | No | [] | Fourth level field array |
| fifthLevel | string[] | No | [] | Fifth level field array |
| mode | 'single' \| 'multiple' | No | 'single' | Selection mode: single or multiple |
| defaultRender | boolean | No | true | Whether to render data by default |
| defaultFirstSelected | boolean | No | false | Whether to select the first node by default |

## Variables
### filter
Filter condition variable used to limit the query scope of tree data.

- **Type**: QFilter
- **Read-only**: Yes
- **Description**: Filter conditions based on associated data models, supporting Q expression syntax

### clickNodeFilter
Filter condition variable after node click, containing filter information of currently selected nodes.

- **Type**: QFilter
- **Read-only**: Yes
- **Description**: Automatically updated when clicking nodes, can be used for data filtering of associated components

## Methods
### call
Refresh tree data and reload the root node list.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| qFilter | QFilter | No | Filter conditions for data filtering |

#### Return Value
No return value (async method)

#### Usage Example
```typescript title="Call Refresh Method"
// Refresh without conditions
await treeComponent.call();

// Refresh with filter conditions
const filter = Q("status", "=", "active");
await treeComponent.call(filter);
```

### getRootNodeList
Get root node data list.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filterValue | string | No | Filter value string |

#### Return Value
No return value (async method, result updates to treeData property)

#### Usage Example
```typescript title="Get Root Nodes"
await treeComponent.getRootNodeList({
  filterValue: "Q(department='IT')"
});
```

### getSubNodeList
Get child node data list, used for dynamically loading sub-level data when expanding tree nodes.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| treeNode | TreeDataItem | Yes | Tree node object to expand |

#### Return Value
No return value (async method, result updates to treeData property)

#### Usage Example
```typescript title="Get Child Nodes"
const parentNode = {
  key: "dept=IT",
  title: "IT Department",
  nextField: "position"
};
await treeComponent.getSubNodeList(parentNode);
```

### publishEvent
Publish component events to trigger event handler execution.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Event name |
| ex | Record\<string, any\> | No | Additional parameter object |

#### Return Value
Promise\<void\>

#### Usage Example
```typescript title="Publish Events"
// Publish click node event
await treeComponent.publishEvent('clickNode');

// Publish refresh event
await treeComponent.publishEvent('refresh');
```

### subscribeEvent
Subscribe to component events and register event handling callback functions.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Event name |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscriptions, default true |

#### Return Value
string - Event handler ID

#### Usage Example
```typescript title="Subscribe to Events"
const handleId = treeComponent.subscribeEvent('clickNode', async (data) => {
  console.log('Node clicked:', data);
});
```

### unSubscribeEvent
Cancel event subscription and remove specified event handler.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Event handler ID |

#### Return Value
void

#### Usage Example
```typescript title="Unsubscribe"
treeComponent.unSubscribeEvent(handleId);
```

### setConfig
Set component configuration and update component configuration parameters.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| next | Partial\<TreeCompConfig\> | Yes | New configuration object |
| clean | boolean | No | Whether to clear original configuration, default false |

#### Return Value
void

#### Usage Example
```typescript title="Set Configuration"
// Merge configuration
treeComponent.setConfig({
  mode: 'multiple',
  defaultFirstSelected: true
});

// Replace configuration
treeComponent.setConfig({
  firstLevel: ['newField'],
  mode: 'single'
}, true);
```

### bindApp
Bind application instance to component.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| app | App | Yes | - | Application instance object |

#### Return Value
void

#### Usage Example
```typescript title="Bind Application"
treeComponent.bindApp(app);
```

### bindPage
Bind page instance to component and bind page to component variables.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | BasePage | Yes | - | Page instance object |

#### Return Value
void

#### Usage Example
```typescript title="Bind Page"
treeComponent.bindPage(page);
```

### getEventKey
Get the unique key value for component events.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| eventName | string | Yes | - | Event name |

#### Return Value
string - Unique key value in format `${uuid}.${name}.${eventName}`

#### Usage Example
```typescript title="Get Event Key"
const eventKey = treeComponent.getEventKey('clickNode');
```

### runCode
Run code string in page context.

#### Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| code | string | Yes | - | Code string to execute |

#### Return Value
any - Code execution result

#### Usage Example
```typescript title="Run Code"
const result = treeComponent.runCode('self.treeData.length');
```

### getPermConfig
Get component's permission configuration information.

#### Return Value
Record\<string, any\> | undefined - Permission configuration object

#### Usage Example
```typescript title="Get Permission Configuration"
const permConfig = treeComponent.getPermConfig();
```

### destroy
Destroy component instance and clean up all event listeners and variables.

#### Usage Example
```typescript title="Destroy Component"
treeComponent.destroy();
```

## Properties
### treeData
Current tree data array containing node information for all levels.

- **Type**: TreeData (TreeDataItem[])
- **Read-only**: No
- **Description**: Tree node data structure containing key, title, children and other properties

### primaryKey
Primary key field name of the data model.

- **Type**: string
- **Read-only**: No
- **Default**: 'id'

### fieldDefineList
Field definition list containing all field configurations of the associated data model.

- **Type**: DataTypeConfig[]
- **Read-only**: No

### allFieldDict
Dictionary mapping of all fields with field names as keys and field configurations as values.

- **Type**: Record\<string, DataTypeConfig\>
- **Read-only**: No

### treeField
Tree level field array, list of field names arranged in level order.

- **Type**: string[]
- **Read-only**: No

### loading
Loading state variable indicating whether data is currently loading.

- **Type**: Numeric
- **Read-only**: No
- **Description**: 0 indicates not loaded, non-zero indicates loading

### name
Component instance name.

- **Type**: string
- **Read-only**: No

### title
Component display title.

- **Type**: string
- **Read-only**: No

### config
Component configuration object containing all configuration parameters and associated elements.

- **Type**: TreeCompConfig & \{requireElements: requireElement[]\}
- **Read-only**: No

### type
Component type identifier.

- **Type**: string
- **Read-only**: No

### showTitle
Whether to display component title.

- **Type**: boolean
- **Read-only**: No

### app
Currently bound application instance.

- **Type**: App
- **Read-only**: Yes
- **Description**: Accessed through getter, prioritizes returning bound application instance, otherwise returns runtime application

### page
Currently bound page instance.

- **Type**: BasePage | undefined
- **Read-only**: Yes
- **Description**: Accessed through getter, returns the page instance to which the component belongs

### compType
Component type identifier.

- **Type**: COMPONENT_TYPE
- **Read-only**: No
- **Description**: Identifies the specific type of the component

### fullName
Complete name identifier of the component.

- **Type**: string
- **Read-only**: No
- **Description**: Unique identifier path of the component in the system

### dataTypeList
Data type list associated with the component.

- **Type**: BaseDataType[]
- **Read-only**: No
- **Description**: Contains data type configurations for all variables of the component

## Events
### clickNode
Event triggered when clicking tree nodes.

- **Trigger Timing**: After user clicks tree node
- **Data Variable**: clickNodeFilter
- **Description**: When event is triggered, clickNodeFilter variable is updated, containing filter conditions of selected nodes

#### Usage Example
```typescript title="Subscribe to Node Click Events"
// Subscribe to click node event
const handleId = treeComponent.subscribeEvent('clickNode', async (eventData) => {
  // Get filter conditions of selected node
  const filter = treeComponent.clickNodeFilter.value;
  console.log('Node filter conditions:', filter);
  
  // Update other components based on selected node
  if (filter) {
    // For example: refresh associated table component
    await tableComponent.call(filter);
  }
});

// Manually trigger click node event
await treeComponent.publishEvent('clickNode', {
  nodeKey: 'dept=IT',
  nodeTitle: 'IT Department'
});
```

```typescript title="Handle Node Events in Multiple Selection Mode"
// Event handling in multiple selection mode
treeComponent.subscribeEvent('clickNode', async (eventData) => {
  const filter = treeComponent.clickNodeFilter.value;
  
  if (filter) {
    // Handle filter conditions for multiple selected nodes
    console.log('Multiple selection node filter:', filter);
    
    // Update data of associated components
    await Promise.all([
      chartComponent.call(filter),
      listComponent.call(filter)
    ]);
  }
});
```

```typescript title="Event Handling with Permission Control"
// Event handling with permission checks
treeComponent.subscribeEvent('clickNode', async (eventData) => {
  // Get permission configuration
  const permConfig = treeComponent.getPermConfig();
  
  if (permConfig?.permitFilter) {
    // Combine with permission filter conditions
    const userFilter = treeComponent.clickNodeFilter.value;
    const combinedFilter = Q.combine([
      Q.from(permConfig.permitFilter),
      userFilter
    ]);
    
    // Use combined filter conditions
    await relatedComponent.call(combinedFilter);
  }
});
``` 