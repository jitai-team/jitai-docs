---
slug: kanban
---
# Kanban
Kanban is a visual data display component that presents data in columns based on grouping fields, supporting card dragging, custom buttons, and real-time data interaction. It handles data grouping display, card operation interaction, and status flow management, providing intuitive project management and workflow visualization capabilities.

The kanban element has a hierarchical structure of Meta (components.Meta) → Type (components.Board) → Instance. Developers can quickly create kanban instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.BoardType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Kanban Component Basic Configuration"
{
  "name": "Board1",
  "title": "Project Kanban",
  "type": "components.Board",
  "config": {
    "requireElements": [
      {
        "name": "models.ProjectModel",
        "title": "Project Data Model",
        "type": "models.Meta",
        "filter": "",
        "orderBy": []
      }
    ],
    "titleField": "title",
    "groupField": "status",
    "showFieldList": ["description", "assignee"],
    "abstractField": "summary",
    "image": {
      "fieldId": "avatar",
      "position": "top",
      "showType": "circle"
    },
    "dragCard": true,
    "showFieldName": true,
    "showAddBottomBtn": true,
    "defaultRender": true,
    "leftBtnList": [],
    "rightBtnList": [],
    "menuBtnList": [],
    "platform": "PC"
  }
}
```

### Configuration Properties
| Property Name | Type | Default Value | Description |
|--------|------|--------|------|
| requireElements | Array | [] | Data source configuration, specifying model and filter conditions |
| titleField | String | "" | Card title field |
| groupField | String | "" | Grouping field, supports dropdown, radio, member, department, text types |
| showFieldList | Array | [] | List of fields displayed in cards |
| abstractField | String | "" | Abstract field, displayed at the bottom of cards |
| image | Object | {} | Image configuration, containing field ID, position, and display type |
| dragCard | Boolean | false | Whether to enable card dragging functionality |
| showFieldName | Boolean | true | Whether to show field names |
| showAddBottomBtn | Boolean | false | Whether to show bottom add button |
| defaultRender | Boolean | true | Whether to use default rendering |
| leftBtnList | Array | [] | Left button configuration list |
| rightBtnList | Array | [] | Right button configuration list |
| menuBtnList | Array | [] | Menu button configuration list |
| platform | String | "PC" | Platform type, PC or Mobile |
| fieldAliasList | Array | [] | Field alias configuration list |

## Variables
### displayRowList
**Type**: `RowList`  
**Read-only**: Yes  
**Generic**: Associated model's fullName  

Displayed multi-row data variable, containing all visible data records in the current kanban.

### activeRow
**Type**: `RowData`  
**Read-only**: Yes  
**Generic**: Associated model's fullName  

Currently operated single-row data variable, updated during card clicks, drags, and other interactions.

### activeGroup
**Type**: Determined by grouping field type  
**Read-only**: Yes  

Currently operated grouping variable, representing the grouping value the user is currently interacting with.

### filter
**Type**: `QFilter`  
**Read-only**: Yes  
**Generic**: Associated model's fullName  

Filter condition variable, used to control the data range displayed in the kanban.

## Methods 
### call
Asynchronous method to refresh kanban data.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| qFilter | QFilter | No | Filter conditions for filtering displayed data |

#### Return Value
No return value, updates component data after execution.

#### Usage Example
```javascript title="Refresh Kanban Data"
// Refresh without conditions
await boardComponent.call();

// Refresh with filter conditions
await boardComponent.call("Q(status='active')");
```

### updateConfig
Update component configuration and refresh display.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| config | ComponentConfig | Yes | New component configuration object |

#### Return Value
No return value, updates configuration and refreshes component after execution.

#### Usage Example
```javascript title="Update Component Configuration"
const newConfig = {
  config: {
    groupField: "newStatus",
    dragCard: false
  }
};
boardComponent.updateConfig(newConfig);
```

### setConfig
Set component configuration object (inherited method).

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Object | Yes | New configuration object |
| clean | Boolean | No | Whether to completely replace configuration, default merge |

#### Return Value
No return value, updates internal configuration state.

### publishEvent
Publish component event (inherited method).

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name |
| ex | Object | No | Additional event data |

#### Return Value
Returns Promise, resolves after event publishing is complete.

### subscribeEvent
Subscribe to component event (inherited method).

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | Boolean | No | Whether to cancel existing subscriptions first, default true |

#### Return Value
Returns subscription ID for subsequent unsubscription.

### getAllGroupData
Get data information for all groups.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| filter | Stext | Yes | Query string, supports Q expressions |
| orderList | JitList | Yes | Sort list |
| size | Numeric | Yes | Items per page |

#### Return Value
**Type**: `JitDict`  
Dictionary object containing all group information.

#### Usage Example
```javascript title="Get All Group Data"
const result = await boardComponent.getAllGroupData(
  "Q(active=true)", 
  [], 
  50
);
```

### getGroupData
Get data information for specified group.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| filter | Stext | Yes | Query string, supports Q expressions |
| orderList | JitList | Yes | Sort list |
| page | Numeric | Yes | Page number |
| size | Numeric | Yes | Items per page |

#### Return Value
**Type**: `JitDict`  
Dictionary object containing specified group information.

#### Usage Example
```javascript title="Get Group Data"
const result = await boardComponent.getGroupData(
  "Q(groupKey='todo')", 
  [], 
  1, 
  20
);
```

## Properties
### Basic Properties (Inherited)
### name
**Type**: `String`  

Component instance name, defined in page configuration.

### title
**Type**: `String`  

Component display title.

### type
**Type**: `String`  

Component type identifier, value is "components.Board".

### config
**Type**: `Object`  

Component configuration object, containing all configuration parameters.

### showTitle
**Type**: `Boolean`  

Whether to show component title.

### app
**Type**: `App`  

Bound application instance, used to access application-level functionality.

### page
**Type**: `BasePage`  

Bound page instance, used to access page-level functionality.

### Kanban-Specific Properties
### pageSize
**Type**: `Number`  
**Default Value**: 20  

Number of data items displayed per page.

### loading
**Type**: `Numeric`  
**Default Value**: 0  

Loading state identifier, 0 means not loaded, 1 means loading.

## Events
### clickCard
**Trigger**: After card click  
**Data Variable**: `activeRow`  

Triggered when user clicks a kanban card, activeRow contains the data of the clicked card.

### addBottomBtnClick
**Trigger**: After clicking bottom button  
**Data Variable**: `activeGroup`  
**Prerequisite**: showAddBottomBtn is true  

Triggered when user clicks the add button at the bottom of a group, activeGroup contains the current group information.

### afterCardDrag
**Trigger**: After dragging card  
**Data Variable**: `activeRow`  
**Prerequisite**: dragCard is true and it's a PC platform standard model  

Triggered when user drags a card to a new group, activeRow contains the data of the dragged card.

### Dynamic Button Events
Generated dynamically based on leftBtnList, rightBtnList, menuBtnList configuration:

- **leftBtnList button events**: Naming rule is click + button ID (camelCase), data variable is displayRowList
- **rightBtnList button events**: Naming rule is click + button ID (camelCase), data variable is displayRowList  
- **menuBtnList button events**: Naming rule is click + button ID (camelCase), data variable is activeRow

## Methods
### loadData()
**Description**: Load kanban data  
**Parameters**: None  
**Return**: None  

Load data for the kanban component based on current configuration.

### refreshData()
**Description**: Refresh kanban data  
**Parameters**: None  
**Return**: None  

Refresh the current kanban data.

### getData()
**Description**: Get current kanban data  
**Parameters**: None  
**Return**: `Array` - Current kanban data array  

Get the current data displayed in the kanban.

### setData(data)
**Description**: Set kanban data  
**Parameters**: 
- `data` (Array): Data to set  
**Return**: None  

Set the data for the kanban component.

### getActiveRow()
**Description**: Get currently active row data  
**Parameters**: None  
**Return**: `Object` - Active row data  

Get the data of the currently active/selected row.

### setActiveRow(rowData)
**Description**: Set active row  
**Parameters**: 
- `rowData` (Object): Row data to set as active  
**Return**: None  

Set a specific row as the active row.

### publishEvent(eventName, data)
**Description**: Publish custom event  
**Parameters**: 
- `eventName` (String): Event name  
- `data` (Any): Event data  
**Return**: None  

Publish a custom event that can be listened to by other components.

### subscribeEvent(eventName, callback)
**Description**: Subscribe to custom event  
**Parameters**: 
- `eventName` (String): Event name to subscribe to  
- `callback` (Function): Event callback function  
**Return**: None  

Subscribe to a custom event published by other components.

## Advanced Features
### Card Dragging
The kanban component supports card dragging functionality, allowing users to move cards between different groups by dragging and dropping.

### Dynamic Button Configuration
Buttons can be dynamically configured through leftBtnList, rightBtnList, and menuBtnList, supporting custom button styles and event handling.

### Real-time Data Updates
The component supports real-time data updates, automatically refreshing the display when data changes.

### Responsive Layout
The kanban component adapts to different screen sizes and provides responsive layout capabilities.

### Custom Card Rendering
Developers can customize card rendering through the defaultRender configuration and custom rendering functions.