---
slug: general-filter
title: "General Filter Reference"
description: "General Filter Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "General Filter"
---
# General Filter
The general filter is a data query filtering component that implements flexible data filtering functionality based on configurable filter fields and conditions. It handles filter condition construction, field mapping processing, and Q-expression generation, supporting filtering operations for multiple data types and custom filter logic configuration.

The general filter element has a hierarchical structure of Meta (components.Meta) → Type (components.GenericFilter) → Instance. Developers can quickly create general filter instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.GenericFilterType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```json title="General Filter Basic Configuration"
{
  "name": "GenericFilter1",
  "title": "Order Filter",
  "type": "components.GenericFilter",
  "config": {
    "requireElements": []
  },
  "showTitle": true
}
```

### Configuration Properties
| Property | Type | Default Value | Required | Description |
|----------|------|---------------|----------|-------------|
| name | string | - | Yes | Component instance name |
| title | string | - | Yes | Component display title |
| type | string | components.GenericFilter | Yes | Component type identifier |
| config | object | \{\} | No | Component configuration object |
| config.requireElements | array | [] | No | Dependent element configuration |
| showTitle | boolean | true | No | Whether to show component title |

## Variables
None

## Methods
### getFilter
Get current filter configuration's filter conditions, map fields in the filter to target model and generate Q-expression string.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| modelName | string | - | Yes | Target data model name (this parameter is currently unused in current version) |
| mappingDict | object | - | Yes | Field mapping dictionary, key is filter field ID, value is target model field name |

#### Return Value
- **Type**: QFilter (filter condition string)
- **Description**: Returns converted Q-expression string that can be directly used for data model queries. Returns empty string when field mapping is incomplete or no filter conditions exist

#### Usage Example
```typescript title="Get Filter Conditions"
// Set field mapping and get filter conditions
const mappingDict = {
  "status": "orderStatus",
  "createTime": "createdAt", 
  "amount": "totalAmount"
};

const filter = genericFilter.getFilter("models.OrderModel", mappingDict);

// Use filter conditions to query data
if (filter) {
  const orderModel = app.getElement("models.OrderModel");
  const result = await orderModel.query({
    filter: filter,
    page: 1,
    size: 20
  });
}
```

### setConfig
Set component configuration information.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| next | object | - | Yes | New configuration object |
| clean | boolean | false | No | Whether to completely replace configuration, true for replace, false for merge |

#### Usage Example
```typescript title="Set Component Configuration"
// Merge configuration
genericFilter.setConfig({
  requireElements: ["models.OrderModel"]
});

// Completely replace configuration  
genericFilter.setConfig({
  requireElements: []
}, true);
```

### publishEvent
Publish component events, trigger registered event handlers.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| name | string | - | Yes | Event name |
| ex | object | - | No | Event parameter object |

#### Usage Example
```typescript title="Publish Event"
// Publish filter completion event
await genericFilter.publishEvent('afterFilter', {
  filterCount: 3,
  timestamp: Date.now()
});
```

### subscribeEvent
Subscribe to component events, register event handlers.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| name | string | - | Yes | Event name |
| evtCb | function | - | Yes | Event callback function, supports sync and async functions |
| unSubscribeExist | boolean | true | No | Whether to cancel existing subscriptions with same name |

#### Return Value
- **Type**: string
- **Description**: Returns event handler ID for unsubscribing

#### Usage Example
```typescript title="Subscribe to Event"
// Subscribe to filter completion event
const handlerId = genericFilter.subscribeEvent('afterFilter', (data) => {
  console.log('Filter completed:', data);
  // Refresh associated data table
  this.table1.refresh();
});

// Subscribe to async event handling
const asyncHandlerId = genericFilter.subscribeEvent('afterFilter', async (data) => {
  await updateDataDisplay(data);
});
```

### unSubscribeEvent
Cancel event subscription, remove specified event handler.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| id | string | - | Yes | Event handler ID |

#### Usage Example
```typescript title="Cancel Event Subscription"
// Cancel specific event subscription
genericFilter.unSubscribeEvent(handlerId);
```

### destroy
Destroy component instance, clean up all resources, event listeners, and variable references.

#### Usage Example
```typescript title="Destroy Component"
// Clean up resources when component is destroyed
genericFilter.destroy();
```

### runCode
Execute JavaScript code string in page context.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| code | string | - | Yes | JavaScript code string to execute |

#### Return Value
- **Type**: any
- **Description**: Returns code execution result, returns undefined when execution fails

#### Usage Example
```typescript title="Execute Code"
// Execute page method
const result = genericFilter.runCode('this.table1.refresh()');

// Execute expression
const value = genericFilter.runCode('this.orderStatus.value');
```

### getPermConfig
Get component's permission configuration information.

#### Return Value
- **Type**: object | undefined  
- **Description**: Returns component permission configuration object, returns undefined if no permission restrictions

#### Usage Example
```typescript title="Get Permission Configuration"
// Check component permissions
const permConfig = genericFilter.getPermConfig();
if (permConfig) {
  console.log('Component permission configuration:', permConfig);
}
```

### getEventKey
Get component event's complete key name, used for internal event system identification.

#### Parameter Details
| Parameter Name | Type | Default Value | Required | Description |
|----------------|------|---------------|----------|-------------|
| eventName | string | - | Yes | Event name |

#### Return Value
- **Type**: string
- **Description**: Returns event key name in format `{uuid}.{componentName}.{eventName}`

#### Usage Example
```typescript title="Get Event Key Name"
// Get complete key name for afterFilter event
const eventKey = genericFilter.getEventKey('afterFilter');
console.log(eventKey); // Output: "uuid.GenericFilter1.afterFilter"
```

## Properties
| Property Name | Type | Description |
|---------------|------|-------------|
| name | string | Component instance name |
| title | string | Component display title |
| fullName | string | Component full name, format `{elementType}.{instanceName}` |
| config | object | Component configuration information |
| showTitle | boolean | Whether to show title |
| type | string | Component type identifier |
| compType | string | Component type enumeration value |
| dataTypeList | array | Component variable definition list |
| app | App | Associated application instance |
| page | BasePage | Associated page instance |
| filterList | IFilter[] | Current filter condition list, internally maintained filter state |

## Events
### afterFilter
Event triggered after user completes filter operation, can be used to respond to filter state changes.

#### Usage Example
```typescript title="afterFilter Event Handling"
// Listen to filter completion event
genericFilter.subscribeEvent('afterFilter', () => {
  console.log('User completed filter operation');
  // Execute subsequent logic, such as refreshing data table
  this.table1.refresh();
});

// Event handling with parameters
genericFilter.subscribeEvent('afterFilter', (eventData) => {
  console.log('Filter event data:', eventData);
  // Update page state based on filter results
  this.updatePageState(eventData);
});
```

## Advanced Features
### Field Mapping Mechanism
The general filter implements flexible association between filter fields and target model fields through field mapping, supporting field mapping for different naming conventions:

```typescript title="Field Mapping Configuration"
// Mapping relationship between filter field IDs and target model fields
const mappingDict = {
  "orderNo": "orderNumber",      // Order number field mapping
  "customerName": "customer",    // Customer name field mapping
  "orderDate": "createdAt",      // Order date field mapping
  "orderType": "type"            // Order type field mapping
};

const filter = genericFilter.getFilter("models.OrderModel", mappingDict);
```

### Filter Condition Validation
Component has built-in integrity validation mechanism to ensure all fields configured in the filter can be correctly mapped to target model:

```typescript title="Filter Condition Validation Mechanism"
// Handling when field mapping is incomplete
const incompleteMapping = {
  "status": "orderStatus"
  // Missing mappings for other fields in filter
};

const filter = genericFilter.getFilter("models.OrderModel", incompleteMapping);
// When mapping is incomplete:
// 1. Show error message: "Fields set by {component title} are incompletely mapped to target data model"  
// 2. Return empty string to avoid erroneous queries
```

### Filter Condition Construction
Component internally uses IFilter structure to maintain filter conditions, supporting single item filtering and group filtering, ultimately generating standard QFilter format:

```typescript title="Filter Condition Structure"
// Filter item types contained in filterList:
// 1. item type: single filter condition
// 2. group type: group filter condition

// Final generated QFilter structure
const QFilter = {
  type: 'group',
  uid: 'group-uuid',
  filterList: [
    // List of filter conditions after mapping processing
  ]
};
```