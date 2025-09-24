---
slug: group-table
---
# Group Table
Group table is a powerful data display component, implemented based on antd Table to provide grouping aggregation, inline editing, toolbar operations, and other functions. It handles multi-dimensional data grouping display, statistical calculations, and interactive operations, supporting field-level configuration control, permission management, and custom style rules.

The group table element has a hierarchical structure of Meta (components.Meta) → Type (components.GroupTable) → Instance. Developers can quickly create group table instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.GroupTableType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```tsx title="Basic Group Table Configuration"
const groupTableConfig = {
  requireElements: [
    {
      name: "models.UserModel",
      type: "models.Meta"
    }
  ],
  fieldIdList: ["name", "department", "salary", "status"],
  groupFieldIdList: ["department"],
  autoLoad: true,
  disableSelect: false,
  speedMode: false,
  toolbarLeft: [
    {
      id: "add",
      name: "Add",
      type: "primary"
    }
  ],
  toolbarRight: [
    {
      id: "export", 
      name: "Export",
      type: "default"
    }
  ],
  actionBtn: [
    {
      id: "edit",
      name: "Edit"
    },
    {
      id: "delete",
      name: "Delete"
    }
  ],
  fieldConfig: {
    "name": {
      alias: "Name",
      position: "left",
      freeze: false,
      columnClick: true,
      inlineEdit: false,
      wrap: false,
      statistic: "",
      sort: "asc"
    },
    "salary": {
      alias: "Salary", 
      position: "right",
      statistic: "COLSUM",
      sort: "desc"
    }
  }
}
```

### Configuration Properties
| Property Name | Type | Default Value | Description |
|--------|------|--------|------|
| fieldIdList | `string[]` | `[]` | List of fields to display |
| groupFieldIdList | `string[]` | `[]` | List of grouping fields |
| speedMode | `boolean` | `false` | Speed mode, improves rendering performance for large data volumes |
| autoLoad | `boolean` | `true` | Whether to auto-load data by default |
| disableSelect | `boolean` | `false` | Whether to disable row selection functionality |
| toolbarLeft | `GroupTableButtonProps[]` | `[]` | Toolbar left button configuration |
| toolbarRight | `GroupTableButtonProps[]` | `[]` | Toolbar right button configuration |
| actionBtn | `GroupTableButtonProps[]` | `[]` | Action column button configuration |
| fieldConfig | `Record<string, GroupTableFieldConfig>` | `{}` | Field-level detailed configuration |
| columnWidth | `Record<string, number>` | `{}` | Column width configuration |
| filterStyleList | `FilterStyleItemProps[]` | `[]` | Style rule configuration |
| filterEditorList | `FilterEditorItemProps[]` | `[]` | Edit rule configuration |

## Variables
### displayRowList
| Property | Value |
|------|-----|
| Type | `RowList` |
| Title | Current page data |
| Read-only | Yes |
| Generic | Associated model's fullName |

Currently displayed multi-row data list, containing result data after grouping aggregation.

### selectedRowList
| Property | Value |
|------|-----|
| Type | `RowList` |
| Title | Selected multi-row data |
| Read-only | Yes |
| Generic | Associated model's fullName |

User-selected multi-row data list, supporting multi-selection operations.

### activeRow
| Property | Value |
|------|-----|
| Type | `RowData` |
| Title | Operated single-row data |
| Read-only | Yes |
| Generic | Associated model's fullName |

Currently operated single-row data, updated when clicking rows or operation buttons.

### filter
| Property | Value |
|------|-----|
| Type | `QFilter` |
| Title | Filter conditions |
| Read-only | No |
| Generic | Associated model's fullName |

Data filter conditions, supporting complex query condition combinations.

## Methods 
### bindApp
Bind application instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| app | `App` | Yes | - | Application instance |

#### Usage Example
```tsx title="Bind Application Instance"
groupTable.bindApp(app);
```

### bindPage
Bind page instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| page | `BasePage` | Yes | - | Page instance |

#### Usage Example
```tsx title="Bind Page Instance"
groupTable.bindPage(page);
```

### call
Refresh component data, can pass additional filter conditions.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| qFilter | `QFilter` | No | - | Additional filter conditions |

#### Return Value
No return value

#### Usage Example
```tsx title="Refresh Group Table Data"
// Refresh without conditions
await groupTable.call();

// Refresh with filter conditions
await groupTable.call("Q(status='active')");

// Use variable filter
await groupTable.call(someFilter);
```

### checkAndGetModelExist
Check if the model in configuration exists and return the model class (static method).

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| compConfig | `GroupTableComponentConfig` | Yes | - | Component configuration object |

#### Return Value
`typeof Jit.BaseModel | null` - Model class or null

#### Usage Example
```tsx title="Check Model Existence"
const ModelClass = GroupTableComponent.checkAndGetModelExist(config);
if (ModelClass) {
  console.log('Associated model:', ModelClass.fullName);
} else {
  console.error('Model does not exist');
}
```

### destroy
Destroy component instance, clean up all resources and event listeners.

#### Usage Example
```tsx title="Destroy Component"
// Manually destroy component
groupTable.destroy();
```

### getEventKey
Get event key name.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| eventName | `string` | Yes | - | Event name |

#### Return Value
`string` - Event key name

#### Usage Example
```tsx title="Get Event Key"
const eventKey = groupTable.getEventKey('selectedChange');
```

### getEventList
Get component's event definition list (static method).

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| compConfig | `GroupTableComponentConfig` | Yes | - | Component configuration object |

#### Return Value
`Event[]` - Event definition list

#### Usage Example
```tsx title="Get Event Definitions"
const eventList = GroupTableComponent.getEventList(config);
console.log('Component events:', eventList);
```

### getFuncList
Get component's method definition list (static method).

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| compConfig | `GroupTableComponentConfig` | Yes | - | Component configuration object |

#### Return Value
`Function[]` - Method definition list

#### Usage Example
```tsx title="Get Method Definitions"
const funcList = GroupTableComponent.getFuncList(config);
console.log('Component methods:', funcList);
```

### getPermConfig
Get current component's permission configuration.

#### Return Value
`Record<string, any> | undefined` - Permission configuration object

#### Usage Example
```tsx title="Get Permission Configuration"
const permConfig = groupTable.getPermConfig();
if (permConfig?.canEdit) {
  // Execute edit operation
}
```

### getVariableList
Get component's variable definition list (static method).

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| compConfig | `GroupTableComponentConfig` | Yes | - | Component configuration object |

#### Return Value
`BaseDataType[]` - Variable definition list

#### Usage Example
```tsx title="Get Variable Definitions"
const variableList = GroupTableComponent.getVariableList(config);
console.log('Component variables:', variableList);
```

### initVariables
Initialize component variables.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| dataTypeList | `BaseDataType[]` | Yes | - | Data type list |

#### Usage Example
```tsx title="Initialize Variables"
groupTable.initVariables(dataTypeList);
```

### newVariable
Create new data type variable.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| varConfig | `DataTypeConfig` | Yes | - | Variable configuration object |

#### Return Value
`BaseDataType` - Created variable instance

#### Usage Example
```tsx title="Create New Variable"
const newVar = groupTable.newVariable(varConfig);
```

### publishEvent
Publish component event, trigger subscribed event handlers.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| name | `string` | Yes | - | Event name |
| ex | `Record<string, any>` | No | - | Event additional data |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Publish Custom Event"
// Publish simple event
await groupTable.publishEvent('customEvent');

// Publish event with data
await groupTable.publishEvent('dataUpdated', { 
  updatedAt: new Date(),
  count: 5
});
```

### runCode
Execute code string in page context.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| code | `string` | Yes | - | Code string to execute |

#### Return Value
`any` - Code execution result

#### Usage Example
```tsx title="Execute Code"
// Execute simple code
const result = groupTable.runCode('return this.name + "_result"');
```

### setConfig
Dynamically set component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| next | `Partial<GroupTableComponentConfig>` | Yes | - | New configuration object |
| clean | `boolean` | No | `false` | Whether to completely replace configuration |

#### Return Value
No return value

#### Usage Example
```tsx title="Dynamically Set Configuration"
// Partially update configuration
groupTable.setConfig({
  speedMode: true,
  disableSelect: false
});

// Completely replace configuration
groupTable.setConfig(newConfig, true);
```

### subscribeEvent
Subscribe to component event, register event handler.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| name | `string` | Yes | - | Event name |
| evtCb | `(data: any) => Promise<void> \| void` | Yes | - | Event callback function |
| unSubscribeExist | `boolean` | No | `true` | Whether to cancel existing subscriptions |

#### Return Value
`string` - Subscription handle ID

#### Usage Example
```tsx title="Subscribe to Component Event"
// Subscribe to event
const handleId = groupTable.subscribeEvent('selectedChange', (data) => {
  console.log('Selected data changed:', data);
});

// Async event handling
groupTable.subscribeEvent('afterClickRow', async (data) => {
  await processRowData(data);
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|----------|--------|------|
| id | `string` | Yes | - | Subscription handle ID |

#### Return Value
No return value

#### Usage Example
```tsx title="Cancel Event Subscription"
// Cancel specific subscription
groupTable.unSubscribeEvent(handleId);
```

## Properties
### app
Associated application instance, type `App`, provides application-level context and services.

### config
Component configuration object, containing all configuration properties. Type is `GroupTableComponentConfig & { requireElements: requireElement[] }`.

### dataTypeList
Component variable type list, type `BaseDataType[]`, containing type definitions for all variables.

### fullName
Component complete name, type `string`, containing complete namespace path.

### ModelClass
Associated model class, type `typeof Jit.BaseModel`, used for data operations and field definitions.

### name
Component instance name, type `string`, unique identifier within the page.

### page
Associated page instance, type `BasePage`, provides page-level context and data.

### showTitle
Whether to show component title, type `boolean`.

### store
Component internal state manager, type `GroupTableStore`, responsible for data loading, grouping calculations, and state maintenance.

### title
Component display title, type `string`, used for interface display.

### type
Component type identifier, type `string`, value is `"components.GroupTable"`.

## Events
### selectedChange
| Property | Value |
|------|-----|
| Trigger Timing | After selected rows change |
| Event Data | selectedRowList |
| Data Type | RowList |

Triggered when user selects or deselects rows.

### afterClickRow
| Property | Value |
|------|-----|
| Trigger Timing | After clicking row |
| Event Data | activeRow |
| Data Type | RowData |

Triggered when user clicks a table row.

### afterRowChange
| Property | Value |
|------|-----|
| Trigger Timing | After any field value changes |
| Event Data | activeRow |
| Data Type | RowData |

Triggered when any field value in the table changes.

### Dynamic Toolbar Button Events
Button click events dynamically generated based on `toolbarLeft`, `toolbarRight`, and `actionBtn` configuration:

- Toolbar button event name format: `click{ButtonId}` (camelCase naming)
- Action button event data: activeRow
- Toolbar button event data: none

### Dynamic Field Events
Field-related events dynamically generated based on field configuration:

- Column click event: `click{FieldId}` (when `columnClick: true`)
- Field value change event: `after{FieldId}Change` (when `inlineEdit: true`)

## Advanced Features
### Grouping Statistics Configuration
```tsx title="Configure Field Statistics"
const fieldConfig = {
  "salary": {
    statistic: "COLSUM",  // Sum
    alias: "Total Salary"
  },
  "count": {
    statistic: "COUNT",   // Count  
    alias: "Person Count"
  },
  "rating": {
    statistic: "COLAVG",  // Average
    alias: "Average Rating"
  }
}
```

Supported statistics types:
- `COUNT`: Count
- `COLSUM`: Sum  
- `COLAVG`: Average
- `COLMAX`: Maximum
- `COLMIN`: Minimum
- `DISTINCT`: Distinct count
- `FILL`: Filled count
- `NOTFILL`: Unfilled count

### Style Rule Configuration
```tsx title="Configure Conditional Styles"
const filterStyleList = [
  {
    id: "highSalary",
    name: "High Salary Indicator", 
    fieldsColor: "#ff0000",
    rowColor: "#fff2f0",
    filterList: ["Q(salary__gt=10000)"],
    filterStyleColumns: ["salary", "name"]
  }
]
```

### Edit Rule Configuration
```tsx title="Configure Edit Permissions"
const filterEditorList = [
  {
    id: "managerEdit",
    name: "Manager Can Edit",
    filterList: ["Q(role='manager')"],
    filterEditorColumns: ["salary", "bonus"]
  }
]
```

### Speed Mode Optimization
Enabling `speedMode` can improve rendering performance for large data volume scenarios, but will disable rendering of complex field types like images, files, and links.

```tsx title="Enable Speed Mode"
const config = {
  speedMode: true,
  // These field types will be simplified in speed mode
  // IMAGE, LINK, FILE
}
```

