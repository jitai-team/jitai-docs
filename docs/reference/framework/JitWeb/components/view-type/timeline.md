---
slug: timeline
---
# Timeline
Timeline is a view component for displaying time-series data, implementing timeline-style data visualization based on data models. It is responsible for displaying data records in chronological order, supporting custom time positioning and providing interactive operations, with configurable toolbar buttons, color styles, and data filtering functionality.

The timeline element hierarchy is Meta (components.Meta) → Type (components.TimeLine) → Instance. Developers can quickly create timeline instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.TimeLineType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```json title="Timeline Basic Configuration"
{
  "fullName": "components.TimeLine",
  "type": "components.TimeLine",
  "name": "timeLine1",
  "title": "Project Timeline",
  "config": {
    "requireElements": [
      {
        "title": "Project Data Model",
        "type": "models.Meta",
        "name": "models.ProjectModel",
        "filter": "",
        "orderBy": []
      }
    ],
    "time": ["createTime"],
    "abstract": ["description"],
    "color": ["status"],
    "stylesConfig": {
      "mode": "left"
    },
    "toolLeftBtn": [],
    "toolRightBtn": [],
    "defaultRender": true
  }
}
```

### Configuration Properties
| Property | Type | Description | Default | Required |
|----------|------|-------------|---------|----------|
| requireElements | Array | Bound data model configuration | [] | Yes |
| time | string[] | Time field name array | [] | Yes |
| abstract | string[] | Abstract content field name array | [] | Yes |
| color | string[] | Color field name array | [] | No |
| stylesConfig.mode | string | Time position mode: left/center/right | "left" | No |
| toolLeftBtn | Array | Left toolbar button configuration | [] | No |
| toolRightBtn | Array | Right toolbar button configuration | [] | No |
| defaultRender | boolean | Whether to use default rendering | true | No |

## Variables
### displayRowList
- **Type**: RowList
- **Description**: Displayed multi-row data, containing all data records currently displayed in the timeline
- **Read-only**: Yes

### activeRow
- **Type**: RowData
- **Description**: Currently operated single row data, updated when clicking timeline nodes
- **Read-only**: Yes

### filter
- **Type**: QFilter
- **Description**: Filter conditions used to filter data displayed in the timeline
- **Read-only**: Yes

### loading
- **Type**: Numeric
- **Description**: Loading state identifier, 0 indicates not loaded, 1 indicates loading
- **Read-only**: Yes

## Methods
### call
Refresh timeline data, with optional filter conditions for data filtering.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| qFilter | string | Q expression filter condition string | No |

#### Return Value
No return value

#### Usage Example
```typescript title="Refresh Timeline Data"
// Refresh without conditions
timeLine1.call();

// Refresh with filter conditions
timeLine1.call("Q(status='active')");
```

### getDataList
Get timeline data list, supporting pagination loading and permission filtering.

#### Parameters
No parameters

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```typescript title="Get Data List"
await timeLine1.getDataList();
```

### updateConfig
Update component configuration and reload data.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| config | Object | New component configuration object | Yes |

#### Return Value
No return value

#### Usage Example
```typescript title="Update Configuration"
timeLine1.updateConfig({
  time: ["updatedTime"],
  abstract: ["newDescription"],
  stylesConfig: {
    mode: "center"
  }
});
```

### publishEvent
Send component events to notify other components or pages.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| name | string | Event name | Yes |
| ex | Object | Additional data | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```typescript title="Send Custom Event"
// Send simple event
await timeLine1.publishEvent('customAction');

// Send event with data
await timeLine1.publishEvent('dataChanged', {
  count: timeLine1.rowDataList.length,
  timestamp: Date.now()
});
```

### subscribeEvent
Subscribe to component events and set event callback handlers.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| name | string | Event name | Yes |
| evtCb | Function | Event callback function | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | No |

#### Return Value
string - Subscription handler ID

#### Usage Example
```typescript title="Subscribe to Events"
// Subscribe to data refresh event
const handlerId = timeLine1.subscribeEvent('refresh', () => {
  console.log('Timeline data has been refreshed');
});

// Subscribe to click event
timeLine1.subscribeEvent('clickRow', (data) => {
  console.log('Clicked row data:', data.activeRow);
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| id | string | Subscription handler ID | Yes |

#### Return Value
boolean - Whether successfully cancelled

#### Usage Example
```typescript title="Unsubscribe from Events"
const handlerId = timeLine1.subscribeEvent('refresh', callback);
// Cancel subscription
timeLine1.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration, supporting partial updates and complete replacement.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| next | Object | New configuration object | Yes |
| clean | boolean | Whether to completely replace configuration | No |

#### Return Value
No return value

#### Usage Example
```typescript title="Set Configuration"
// Partial configuration update
timeLine1.setConfig({
  time: ["newTimeField"]
});

// Complete configuration replacement
timeLine1.setConfig(newConfig, true);
```

### destroy
Destroy component and clean up all event listeners and resources.

#### Parameters
No parameters

#### Return Value
No return value

#### Usage Example
```typescript title="Destroy Component"
// Destroy component when page unloads
timeLine1.destroy();
```

### runCode
Run code string in page context.

#### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| code | string | Code string to execute | Yes |

#### Return Value
any - Code execution result

#### Usage Example
```typescript title="Run Code"
// Execute simple expression
const result = timeLine1.runCode('2 + 3');

// Access page variables
const pageData = timeLine1.runCode('this.somePageVariable');
```

### getPermConfig
Get current component's permission configuration information.

#### Parameters
No parameters

#### Return Value
Record&lt;string, any&gt; | undefined - Permission configuration object

#### Usage Example
```typescript title="Get Permission Configuration"
const permConfig = timeLine1.getPermConfig();
if (permConfig) {
  console.log('Component permission configuration:', permConfig);
}
```

## Properties
### rowDataList
- **Type**: RowData[]
- **Description**: Timeline data list, triggers refresh event when set
- **Read-only**: No

### ModelClass
- **Type**: BaseModel
- **Description**: Bound data model class
- **Read-only**: Yes

### allFieldDict
- **Type**: Record&lt;string, DataTypeConfig&gt;
- **Description**: Dictionary mapping of all fields
- **Read-only**: Yes

### primaryKey
- **Type**: string
- **Description**: Primary key field name
- **Read-only**: Yes

### fieldDefineList
- **Type**: DataTypeConfig[]
- **Description**: Field definition list
- **Read-only**: Yes

### pageNumber
- **Type**: number
- **Description**: Current page number
- **Read-only**: No

### pageSize
- **Type**: number
- **Description**: Number of data items per page
- **Read-only**: No

### name
- **Type**: string
- **Description**: Component name identifier
- **Read-only**: Yes

### title
- **Type**: string
- **Description**: Component display title
- **Read-only**: Yes

### config
- **Type**: Object
- **Description**: Complete component configuration object
- **Read-only**: No

### type
- **Type**: string
- **Description**: Component type identifier
- **Read-only**: Yes

### fullName
- **Type**: string
- **Description**: Complete component name path
- **Read-only**: Yes

### showTitle
- **Type**: boolean
- **Description**: Whether to display component title
- **Read-only**: Yes

### app
- **Type**: App
- **Description**: Bound application instance
- **Read-only**: Yes

### page
- **Type**: BasePage
- **Description**: Bound page instance
- **Read-only**: Yes

### dataTypeList
- **Type**: BaseDataType[]
- **Description**: Component variable definition list
- **Read-only**: Yes

## Events
### clickRow
- **Description**: Triggered when clicking timeline nodes
- **Data**: activeRow - The clicked row data

### refresh
- **Description**: Triggered when data is refreshed
- **Data**: None

### Toolbar Button Events
Based on the configured toolLeftBtn and toolRightBtn, corresponding click events are dynamically generated, with event names in camelCase format of click + button id.

## Advanced Features
### Time Position Mode Configuration
Timeline supports three time position modes:

```typescript title="Time Position Modes"
// Display time on the left
stylesConfig: {
  mode: "left"
}

// Center alternating display
stylesConfig: {
  mode: "center"  // Corresponds to TIME_POS_TYPES.CENTER = 'alternate'
}

// Display time on the right
stylesConfig: {
  mode: "right"
}
```

### Toolbar Button Configuration
```json title="Toolbar Button Configuration Example"
{
  "toolLeftBtn": [
    {
      "id": "add",
      "name": "Add",
      "type": "primary"
    }
  ],
  "toolRightBtn": [
    {
      "id": "export",
      "name": "Export",
      "type": "default"
    }
  ]
}
```

### Data Model Binding
```json title="Data Model Binding Configuration"
{
  "requireElements": [
    {
      "title": "Task Data Model",
      "type": "models.Meta",
      "name": "models.TaskModel",
      "filter": "Q(isDeleted=false)",
      "orderBy": [["createTime", 1]]
    }
  ]
}
```

### Pagination Loading Mechanism
The component supports pagination loading, controlled through pageNumber and pageSize properties:

```typescript title="Pagination Control"
// Set number of items per page
timeLine1.pageSize = 30;

// Reset to first page
timeLine1.pageNumber = 1;
timeLine1.call();
``` 