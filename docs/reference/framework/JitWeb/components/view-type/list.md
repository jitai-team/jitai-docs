---
slug: list
title: "List Reference"
description: "List Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "List"
---
# List
List is a view component for displaying model data, implemented based on pagination query mechanism to provide efficient data loading and display. It handles data filtering, pagination loading, and user interaction, supporting custom field display, sorting rules, and various operation buttons, providing a complete data list display solution.

The list element has a hierarchical structure of Meta (components.Meta) → Type (components.List) → Instance. Developers can quickly create list instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ListType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```typescript title="Basic List Configuration"
{
  "fullName": "components.List",
  "type": "components.List", 
  "name": "CustomerList",
  "title": "Customer List",
  "config": {
    "requireElements": [
      {
        "title": "Customer Data Model",
        "type": "models.Meta",
        "name": "models.CustomerModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "fieldIdList": [
      "id",
      "custName", 
      "phone",
      "company"
    ],
    "defaultRender": true,
    "title": [],
    "abstract": [
      "custName"
    ]
  },
  "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | JitAI Type | Description | Example Value |
|--------|------|----------|------|---------|
| requireElements | Array | - | Required elements configuration, specifies data model | `[{...}]` |
| fieldIdList | Array | List | List of fields to display | `["id", "name"]` |
| defaultRender | Boolean | Checkbox | Whether to use default rendering | `true` |
| title | Array | List | Title configuration | `[]` |
| abstract | Array | List | Abstract field configuration | `["custName"]` |
| actionBtn | Array | List | Action button configuration | `[{...}]` |
| toolLeftBtn | Array | List | Left toolbar buttons | `[{...}]` |
| toolRightBtn | Array | List | Right toolbar buttons | `[{...}]` |
| bottomBtn | Array | List | Bottom button configuration | `[{...}]` |
| couldClickRow | Boolean | Checkbox | Whether to allow row clicking | `true` |

## Variables
### displayRowList
**Type**: `RowList<T>`  
**Description**: Data for displaying multiple rows, read-only variable, contains all data rows displayed on the current page.

```typescript title="Get Display Data"
// Get current displayed data list
const dataList = listComponent.displayRowList.value;

// Get data count
const count = listComponent.displayRowList.length;

// Get first row data
const firstRow = listComponent.displayRowList.firstRow;
```

### activeRow
**Type**: `RowData<T>`  
**Description**: Single row data for operations, read-only variable, usually set in row click events.

```typescript title="Access Current Row Data"
// Get current operation row data
const currentRow = listComponent.activeRow.value;

// Get specific field of row data
const customerName = listComponent.activeRow.custName?.value;
```

### filter
**Type**: `QFilter`  
**Description**: Filter conditions, read-only variable, used to control data query filter conditions.

```typescript title="Use Filter Conditions"
// Set filter conditions through call method
await listComponent.call("Q(status='active')");

// Get current filter conditions
const currentFilter = listComponent.filter.value;
```

### loading
**Type**: `Numeric`  
**Description**: Loading state identifier, 0 means not loaded, 1 means loading.

```typescript title="Monitor Loading State"
// Check if currently loading
const isLoading = listComponent.loading.value === 1;
```

## Methods 
### bindApp
Bind application instance, usually called automatically by the framework.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| app | Object | - | Yes | Application instance | `app` |

#### Usage Example
```typescript title="Bind Application Instance"
// Bind application instance (usually called automatically by framework)
listComponent.bindApp(app);
```

### bindPage
Bind page instance, usually called automatically by the framework.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| page | Object | - | Yes | Page instance | `page` |

#### Usage Example
```typescript title="Bind Page Instance"
// Bind page instance (usually called automatically by framework)
listComponent.bindPage(page);
```

### call
Refresh list data, supports passing new filter conditions.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| qFilter | String | QFilter | No | Filter conditions, Q expression string | `"Q(status='active')"` |

#### Return Value
**Type**: `Promise<void>`  
**Description**: Async method, no return value.

#### Usage Example
```typescript title="Refresh List Data"
// Refresh without conditions
await listComponent.call();

// Refresh with filter conditions
await listComponent.call("Q(status='active')");

// Complex condition filtering
await listComponent.call("Q(createTime__range=('2024-01-01', '2024-12-31')) & Q(status__in=['active', 'pending'])");
```

### destroy
Destroy component instance, clean up all resources and event listeners.

#### Usage Example
```typescript title="Destroy Component"
// Called when component is destroyed, clean up resources
listComponent.destroy();
```

### getDataList
Internal method to get list data, supports pagination and permission filtering.

#### Return Value
**Type**: `Promise<void>`  
**Description**: Async method, internal use, will update displayRowList variable.

#### Usage Example
```typescript title="Manually Trigger Data Loading"
// Usually called automatically by framework, can also be called manually
await listComponent.getDataList();
```

### getPermConfig
Get component permission configuration.

#### Return Value
**Type**: `Record<string, any> | undefined`  
**Description**: Returns permission configuration object, returns undefined when no permissions.

#### Usage Example
```typescript title="Get Permission Configuration"
// Get current component's permission configuration
const permConfig = listComponent.getPermConfig();
if (permConfig) {
  console.log('Permission configuration:', permConfig);
}
```

### publishEvent
Publish component event.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| name | String | Stext | Yes | Event name | `"refresh"` |
| ex | Object | JitDict | No | Additional data | `{key: "value"}` |

#### Return Value
**Type**: `Promise<void>`  
**Description**: Async method, no return value.

#### Usage Example
```typescript title="Publish Custom Event"
// Publish refresh event
await listComponent.publishEvent('refresh');

// Publish event with data
await listComponent.publishEvent('customEvent', {data: 'test'});
```

### runCode
Execute code string in page context.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| code | String | Stext | Yes | Code string to execute | `"return this.app.name"` |

#### Return Value
**Type**: `any`  
**Description**: Returns code execution result.

#### Usage Example
```typescript title="Execute Dynamic Code"
// Execute code to get application information
const appName = listComponent.runCode('return this.app.name');

// Execute complex logic
const result = listComponent.runCode(`
  const data = this.displayRowList.value;
  return data.filter(item => item.status?.value === 'active').length;
`);
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| next | Object | JitDict | Yes | New configuration object | `{fieldIdList: [...]}` |
| clean | Boolean | Checkbox | No | Whether to completely replace configuration | `false` |

#### Return Value
**Type**: `void`  
**Description**: No return value.

#### Usage Example
```typescript title="Update Component Configuration"
// Partially update configuration
listComponent.setConfig({
  fieldIdList: ['id', 'name', 'status']
});

// Completely replace configuration
listComponent.setConfig(newConfig, true);
```

### subscribeEvent
Subscribe to component event.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| name | String | Stext | Yes | Event name | `"clickRow"` |
| evtCb | Function | - | Yes | Event callback function | `async (data) => {}` |
| unSubscribeExist | Boolean | Checkbox | No | Whether to cancel existing subscription | `true` |

#### Return Value
**Type**: `string`  
**Description**: Returns subscription handle ID.

#### Usage Example
```typescript title="Subscribe to Event"
// Subscribe to row click event
const handleId = listComponent.subscribeEvent('clickRow', async (data) => {
  console.log('Row clicked', data.activeRow);
});
```

### unSubscribeEvent
Unsubscribe from component event.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| id | String | Stext | Yes | Subscription handle ID | `"handle-123"` |

#### Return Value
**Type**: `void`  
**Description**: No return value.

#### Usage Example
```typescript title="Unsubscribe from Event"
// Cancel specific subscription
listComponent.unSubscribeEvent(handleId);
```

### updateConfig
Update component configuration and trigger refresh.

#### Parameter Details
| Parameter Name | Type | JitAI Type | Required | Description | Example Value |
|--------|------|----------|------|------|---------|
| config | Object | JitDict | Yes | New configuration object | `{fieldIdList: [...]}` |

#### Return Value
**Type**: `void`  
**Description**: No return value, will automatically trigger refresh event.

#### Usage Example
```typescript title="Update Configuration and Refresh"
// Update configuration and automatically refresh component
listComponent.updateConfig({
  fieldIdList: ['id', 'custName', 'phone'],
  couldClickRow: true
});
```

## Properties
### allFieldDict
**Type**: `Record<string, DataTypeConfig>`  
**Description**: Configuration dictionary for all fields, read-only property.

```typescript title="Access Field Configuration"
// Get specific field configuration
const nameFieldConfig = listComponent.allFieldDict.custName;

// Iterate through all fields
Object.keys(listComponent.allFieldDict).forEach(fieldName => {
  const fieldConfig = listComponent.allFieldDict[fieldName];
  console.log(`Field: ${fieldName}, Title: ${fieldConfig.title}`);
});
```

### app
**Type**: `App`  
**Description**: Current application instance.

### compType
**Type**: `COMPONENT_TYPE`  
**Description**: Component type enumeration.

### config
**Type**: `ComponentConfig`  
**Description**: Component configuration object.

### count
**Type**: `number`  
**Description**: Total data count, read-only property.

```typescript title="Get Total Count Information"
// Get total data count
const totalCount = listComponent.count;

// Calculate total pages
const totalPages = Math.ceil(totalCount / listComponent.pageSize);
```

### ModelClass
**Type**: `typeof Jit.BaseModel`  
**Description**: Associated data model class, read-only property.

```typescript title="Access Model Class"
// Get model class
const ModelClass = listComponent.ModelClass;

// Perform data operations through model class
const result = await ModelClass.query();
```

### name
**Type**: `string`  
**Description**: Component name.

### page
**Type**: `BasePage`  
**Description**: Current page instance.

### pageNumber
**Type**: `number`  
**Description**: Current page number, starting from 1, read-write property.

```typescript title="Pagination Control"
// Get current page number
const currentPage = listComponent.pageNumber;

// Set page number (usually reload through call method)
listComponent.pageNumber = 2;
await listComponent.getDataList();
```

### pageSize
**Type**: `number`  
**Description**: Data count per page, default is 20, read-write property.

```typescript title="Set Page Size"
// Set 50 data items per page
listComponent.pageSize = 50;
await listComponent.call();
```

### primaryKey
**Type**: `string`  
**Description**: Primary key field name, default is "id", read-only property.

```typescript title="Get Primary Key Information"
// Get primary key field name
const pkField = listComponent.primaryKey;
```

### showTitle
**Type**: `boolean`  
**Description**: Whether to show component title.

```typescript title="Control Title Display"
// Check if title is shown
if (listComponent.showTitle) {
  console.log('Component title:', listComponent.title);
}
```

### title
**Type**: `string`  
**Description**: Component title.

### type
**Type**: `string`  
**Description**: Component type identifier.

```typescript title="Get Component Type"
// Get component type
const componentType = listComponent.type; // "components.List"
```

## Events
### clickRow
**Trigger**: Triggered when user clicks a list row  
**Data**: `activeRow` - Data of the clicked row  
**Description**: Available when couldClickRow in configuration is not false.

```typescript title="Listen to Row Click Event"
// Subscribe to row click event
listComponent.subscribeEvent('clickRow', async (data) => {
  const clickedRow = data.activeRow;
  console.log('Clicked row data:', clickedRow.value);
});
```

### Button Click Events
**Trigger**: Triggered when user clicks configured buttons  
**Event Name**: Dynamically generated, format is `click{ButtonId}` in camelCase  
**Description**: Automatically generated based on actionBtn, toolLeftBtn, toolRightBtn, bottomBtn configuration.

```typescript title="Listen to Button Click Events"
// Assuming there's a button with id "add", event name is "clickAdd"
listComponent.subscribeEvent('clickAdd', async () => {
  console.log('Add button clicked');
});

// Assuming there's a button with id "batch-delete", event name is "clickBatchDelete"  
listComponent.subscribeEvent('clickBatchDelete', async () => {
  console.log('Batch delete button clicked');
});
```

### refresh
**Trigger**: Triggered after data refresh is completed  
**Data**: None  
**Description**: Automatically triggered after getDataList method execution is completed.

```typescript title="Listen to Refresh Event"
// Subscribe to refresh event
listComponent.subscribeEvent('refresh', async () => {
  console.log('List data has been refreshed');
});
``` 