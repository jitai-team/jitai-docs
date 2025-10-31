---
slug: table
title: "Table Reference"
description: "Table Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Table"
---
# Table
Table is a data display component that implements pagination, sorting, filtering and other functions based on model data sources. It handles data list display, row-level operations, batch operations and statistical summaries, supporting inline editing, field click events, toolbar buttons and mobile adaptive display.

The table element has a hierarchical structure of Meta (components.Meta) → Type (components.Table) → Instance. Developers can quickly create table instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.TableType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Basic Table Configuration"
{
  "fullName": "components.Table",
  "type": "components.Table", 
  "name": "Table1",
  "title": "Customer Table",
  "config": {
    "requireElements": [
      {
        "title": "Table Data Model",
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "fieldIdList": [
      "id",
      "custName", 
      "gender",
      "phone",
      "birthday",
      "address"
    ],
    "defaultRender": true,
    "level": 2,
    "pageSize": 20
  },
  "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| requireElements | requireElement[] | Yes | [] | Data source model configuration |
| fieldIdList | string[] | No | [] | Display field list |
| defaultRender | boolean | No | true | Refresh on first load |
| level | number | No | 2 | Related data level |
| pageSize | number | No | 20 | Number of items per page |
| disableSelect | boolean | No | false | Disable row selection |
| disableSort | boolean | No | false | Disable sorting functionality |
| showSerialNum | boolean | No | false | Show serial number column |
| alias | [string, string][] | No | [] | Field alias configuration |
| editableColumns | string[] | No | [] | Editable fields |
| clickField | string[] | No | [] | Clickable fields |
| frozenColumns | string[] | No | [] | Frozen columns |
| textWrapColumns | string[] | No | [] | Text wrap display fields |
| columnWidth | Record\<string, any\> | No | {} | Column width settings |
| toolbarLeft | ButtonProps[] | No | [] | Left toolbar buttons |
| toolbarRight | ButtonProps[] | No | [] | Right toolbar buttons |
| actionBtn | ButtonProps[] | No | [] | Action column buttons |
| fieldStatisticList | fieldStatisticItemType[] | No | [] | Statistics row configuration |
| displayGroupBy | boolean | No | false | Enable group display |
| fieldGroupList | FieldDisplayConfig[] | No | [] | Group configuration |
| speedMode | boolean | No | false | Speed mode |
| noDataText | string | No | '' | No data prompt text |
| customFieldEditor | CustomFieldSlots | No | {} | Custom field editor |
| customFieldRender | CustomFieldSlots | No | {} | Custom field renderer |

## Variables
### displayRowList
- **Type**: RowList\<T\>
- **Read-only**: Yes
- **Description**: Current page display data list, containing all row data after pagination query

### selectedRowList
- **Type**: RowList\<T\>
- **Read-only**: Yes
- **Description**: Multi-row data list selected by user, supports cross-page selection

### activeRow
- **Type**: RowData\<T\>
- **Read-only**: Yes  
- **Description**: Current single row data being operated, updated on row click, field edit, button click

### filter
- **Type**: QFilter
- **Read-only**: Yes
- **Description**: Currently effective filter conditions, containing combined conditions of component filters and permission filters

### loading
- **Type**: Numeric
- **Read-only**: No
- **Description**: Data loading status, 0 means loading complete, 1 means loading in progress

## Methods 
### call
Asynchronously refresh table data, supports passing filter conditions, will reset to first page.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| qFilter | QFilter | No | Filter conditions, will be merged with existing filter conditions |

#### Usage Example
```typescript title="Refresh Table Data"
// Refresh without conditions
await table.call();

// Refresh with filter conditions
const filter = new Jit.datatypes.QFilter();
filter.value = "Q(status='active')";
await table.call(filter);
```

### refresh
Asynchronously refresh current page data, keeping current page number and filter conditions unchanged.

#### Usage Example
```typescript title="Refresh Current Page"
await table.refresh();
```

### prevPage
Asynchronously go to previous page, prompts user if already on first page.

#### Usage Example
```typescript title="Previous Page"
await table.prevPage();
```

### nextPage
Asynchronously go to next page, prompts user if already on last page.

#### Usage Example
```typescript title="Next Page"
await table.nextPage();
```

### goPage
Asynchronously jump to specified page number, validates page number validity.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| pageNumber | number | Yes | Target page number, starting from 1 |

#### Usage Example
```typescript title="Jump to Page"
// Jump to page 3
await table.goPage(3);
```

### updatePage
Update page number and page size, trigger data refresh.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| pageNumber | number | Yes | Page number |
| pageSize | number | Yes | Items per page |

### updateConfig
Update component configuration, merge new configuration and trigger refresh.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| config | ComponentConfig | Yes | New configuration object |

### publishEvent
Publish component event, notify subscribers.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| ex | Record\<string, any\> | No | Additional parameters |

### subscribeEvent
Subscribe to component event, set event handler function.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| evtCb | (data: any) => Promise\<void\> \| void | Yes | Callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscription |

#### Return Value
- **Type**: string
- **Description**: Subscription handler ID, used for unsubscription

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| id | string | Yes | Subscription handler ID |

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Partial\<T & \{requireElements: requireElement[]\}\> | Yes | New configuration |
| clean | boolean | No | Whether to completely replace |

### getEventKey
Get complete event identifier.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| eventName | string | Yes | Event name |

#### Return Value
- **Type**: string
- **Description**: Complete event identifier

### runCode
Execute code string.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| code | string | Yes | Code to execute |

### getPermConfig
Get permission configuration.

#### Return Value
- **Type**: Record\<string, any\> | undefined
- **Description**: Current component's permission configuration

### destroy
Destroy component, clean up all resources and event listeners.

### bindApp
Bind application instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| app | App | Yes | Application instance |

### bindPage
Bind page instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| page | BasePage | Yes | Page instance |

## Properties
### name
- **Type**: string
- **Read-only**: Yes
- **Description**: Component instance name

### title
- **Type**: string
- **Read-only**: Yes
- **Description**: Component display title

### config
- **Type**: TableCompConfig & \{requireElements: requireElement[]\}
- **Read-only**: No
- **Description**: Component configuration object

### compType
- **Type**: COMPONENT_TYPE
- **Read-only**: Yes
- **Description**: Component type identifier

### showTitle
- **Type**: boolean
- **Read-only**: Yes
- **Description**: Whether to show component title

### type
- **Type**: string
- **Read-only**: Yes
- **Description**: Component type complete path

### pageNumber
- **Type**: number
- **Read-only**: No
- **Description**: Current page number, starting from 1

### pageSize
- **Type**: number
- **Read-only**: No
- **Description**: Number of items per page

### sort
- **Type**: string[]
- **Read-only**: No
- **Description**: Sorting rules array

### rowDataList
- **Type**: (typeof Jit.BaseModel)[]
- **Read-only**: No
- **Description**: Current page raw data list

### count
- **Type**: number
- **Read-only**: No
- **Description**: Total number of data items

### fieldDefineList
- **Type**: DataTypeConfig[]
- **Read-only**: No
- **Description**: Field definition list

### fieldDefineDict
- **Type**: Record\<string, DataTypeConfig\>
- **Read-only**: No
- **Description**: Field definition dictionary

### primaryKey
- **Type**: string
- **Read-only**: No
- **Description**: Primary key field name

### ModelClass
- **Type**: typeof Jit.BaseModel
- **Read-only**: No
- **Description**: Data source model class

### level
- **Type**: number
- **Read-only**: No
- **Description**: Related data query level

### statisticData
- **Type**: Record\<string, any\>[]
- **Read-only**: No
- **Description**: Statistics row data

### staticList
- **Type**: fieldStatisticItemType[]
- **Read-only**: No
- **Description**: Statistics field configuration list

### filterValue
- **Type**: string
- **Read-only**: Yes
- **Description**: Effective filter condition string

### app
- **Type**: App
- **Read-only**: Yes
- **Description**: Associated application instance

### page
- **Type**: BasePage
- **Read-only**: Yes
- **Description**: Associated page instance

### fullName
- **Type**: string
- **Read-only**: Yes
- **Description**: Component complete identifier name

### dataTypeList
- **Type**: BaseDataType[]
- **Read-only**: Yes
- **Description**: Component variable definition list

## Events
### clickRow
Row click event, triggered when user clicks on a table row.

**Data**: activeRow - clicked row data

```typescript title="Row Click Event Handling"
table.subscribeEvent('clickRow', async (data) => {
  console.log('Clicked row data:', data.activeRow);
});
```

### selectedChange
Selection state change event, triggered when user selects or deselects rows.

**Data**: selectedRowList - currently selected all row data

```typescript title="Selection Change Event Handling"
table.subscribeEvent('selectedChange', async (data) => {
  console.log('Selected row data:', data.selectedRowList);
});
```

### refresh
Refresh event, triggered when data is reloaded.

```typescript title="Refresh Event Handling"
table.subscribeEvent('refresh', async () => {
  console.log('Table data has been refreshed');
});
```

### Dynamic Button Events
Click events automatically generated based on configured toolbarLeft, toolbarRight, actionBtn.

**Naming Rule**: `click + Button ID (camelCase format)`

```typescript title="Button Event Handling"
// Assuming button ID is "add-user"
table.subscribeEvent('clickAddUser', async (data) => {
  console.log('Add user button clicked', data.activeRow);
});
```

### Field Value Change Events
Events triggered after editable field values change.

**Naming Rule**: `after + Field Name + change (camelCase format)`

```typescript title="Field Change Event Handling"
// name field value change event
table.subscribeEvent('afterNameChange', async (data) => {
  console.log('Name field has changed:', data.activeRow);
});

// Any field change event
table.subscribeEvent('afterRowChange', async (data) => {
  console.log('Row data has changed:', data.activeRow);
});
```

### Field Click Events
Click events for clickable fields.

**Naming Rule**: `click + Field Name (camelCase format)`

```typescript title="Field Click Event Handling"
// phone field click event
table.subscribeEvent('clickPhone', async (data) => {
  console.log('Phone field clicked:', data.activeRow);
});
``` 