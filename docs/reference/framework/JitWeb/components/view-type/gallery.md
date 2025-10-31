---
slug: gallery
title: "Gallery Reference"
description: "Gallery Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Gallery"
---
# Gallery
Gallery is a card view component used to display data lists in a grid layout. It automatically renders card-based interfaces based on model data, supporting field display configuration, image display, action buttons, and interactive events. It is suitable for scenarios such as product display, personnel information, and image gallery browsing.

The gallery element has a hierarchical structure of Meta (components.Meta) → Type (components.Gallery) → Instance. Developers can quickly create Gallery instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.GalleryType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Gallery Basic Configuration"
{
  "name": "Gallery1",
  "title": "Product Gallery",
  "type": "components.Gallery",
  "config": {
    "requireElements": [
      {
        "title": "Product Model",
        "type": "models.Meta",
        "name": "models.ProductModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "showFieldList": ["name", "price", "description"],
    "isShowFieldName": true,
    "abstractField": ["name"],
    "image": {
      "fieldId": "productImage",
      "position": "top",
      "showType": "full"
    },
    "pageSize": 20,
    "fieldDirection": "vertical",
    "cardWidth": {
      "type": "auto"
    }
  },
  "eventList": [
    {
      "title": "After Card Click",
      "name": "clickCard",
      "data": "activeRow"
    }
  ]
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| requireElements | Array | Yes | - | Data source configuration, specifying associated model elements |
| showFieldList | Array | No | [] | List of fields to display, shows all fields when empty |
| isShowFieldName | Boolean | No | true | Whether to show field names |
| abstractField | Array | No | [] | Abstract fields, displayed as card titles |
| toolLeftBtnList | Array | No | [] | Toolbar left button configuration |
| toolRightBtnList | Array | No | [] | Toolbar right button configuration |
| cardBottomBtnList | Array | No | [] | Card bottom button configuration |
| cardRightBtnList | Array | No | [] | Card right button configuration |
| image | Object | No | \{\} | Image display configuration |
| image.fieldId | String | No | "" | Image field ID |
| image.position | String | No | "top" | Image position: top/left/right/bottom |
| image.showType | String | No | "full" | Display type: full/thumbnail |
| pageSize | Number | No | 20 | Number of items per page |
| defaultRender | Boolean | No | true | Whether to use default rendering |
| fieldDirection | String | No | "vertical" | Field arrangement direction: vertical/horizontal |
| cardWidth | Object | No | \{type: "auto"\} | Card width configuration |
| fieldAliasList | Array | No | [] | Field alias configuration |
| fieldTitle | Array | No | [] | Field title configuration |

## Variables
### displayRowList
Currently displayed data row list, type RowList.

```typescript title="Get Display Data"
// Get all currently displayed data
const rows = gallery.displayRowList;

// Iterate through data rows
rows.forEach(row => {
  console.log(row.name, row.price);
});
```

### activeRow
Currently active data row, type RowData.

```typescript title="Get Current Row Data"
// Get currently selected data row
const currentRow = gallery.activeRow;
if (currentRow) {
  console.log('Currently selected:', currentRow.name);
}
```

### filter
Filter condition variable, type QFilter.

```typescript title="Get Filter Conditions"
// Get current filter conditions
const currentFilter = gallery.filter;
console.log('Current filter:', currentFilter.value);
```

## Methods 
### call
Refresh component data, reload data source.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| qFilter | QFilter | No | Query filter conditions |

#### Return Value
Promise\<void\>

#### Usage Example
```typescript title="Refresh Data"
// Refresh without conditions
await gallery.call();

// Refresh with filter conditions
const filter = new Jit.datatypes.QFilter();
filter.value = "Q(status='active')";
await gallery.call(filter);
```

### getElement
Get child element with specified name.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Child element name |

#### Return Value
BaseComponent | undefined

#### Usage Example
```typescript title="Get Child Element"
const childElement = gallery.getElement('childComponentName');
if (childElement) {
  // Operate on child element
  childElement.visible = false;
}
```

### subscribeEvent
Subscribe to event handler.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name |
| callback | Function | Yes | Event handler function |
| unSubscribeExist | Boolean | No | Whether to unsubscribe existing events with same name, default true |

#### Return Value
String - Event handler ID

#### Usage Example
```typescript title="Subscribe to Event"
const handlerId = gallery.subscribeEvent('clickCard', (args) => {
  console.log('Card clicked:', args.data);
});

// Don't unsubscribe existing subscriptions
const handlerId2 = gallery.subscribeEvent('clickCard', callback, false);
```

### unSubscribeEvent
Unsubscribe from event.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| id | String | Yes | Event handler ID |

#### Return Value
Boolean

#### Usage Example
```typescript title="Unsubscribe"
const success = gallery.unSubscribeEvent(handlerId);
```

### newVariable
Create new data type variable.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| varConfig | DataTypeConfig | Yes | Variable configuration object |

#### Return Value
DataType instance

#### Usage Example
```typescript title="Create Variable"
const textVar = gallery.newVariable({
  dataType: 'Stext',
  name: 'description',
  title: 'Description',
  value: 'Default description'
});
```

### destroy
Destroy component, release resources.

#### Usage Example
```typescript title="Destroy Component"
gallery.destroy();
```

### runCode
Execute code string.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| code | String | Yes | Code to execute |

#### Return Value
Any

#### Usage Example
```typescript title="Execute Code"
const result = gallery.runCode('this.visible = false; return "executed";');
```

### publishEvent
Send event message, trigger handlers subscribed to the event.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name |
| ex | Object | No | Additional data |

#### Return Value
Promise\<void\>

#### Usage Example
```typescript title="Send Event"
// Send simple event
await gallery.publishEvent('refresh');

// Send event with data
await gallery.publishEvent('dataChange', { 
  type: 'update', 
  data: { id: 1, name: 'test' } 
});
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Object | Yes | New configuration object |
| clean | Boolean | No | Whether to completely replace configuration, default false (merge mode) |

#### Usage Example
```typescript title="Set Configuration"
// Merge configuration
gallery.setConfig({ pageSize: 30 });

// Completely replace configuration
gallery.setConfig(newConfig, true);
```

### getPermConfig
Get current component's permission configuration.

#### Return Value
Object | undefined

#### Usage Example
```typescript title="Get Permission Configuration"
const permConfig = gallery.getPermConfig();
if (permConfig) {
  console.log('Permission configuration:', permConfig);
}
```

## Properties
### name
Component name, type String, read-only.

```typescript title="Get Component Name"
console.log(gallery.name); // "Gallery1"
```

### title
Component title, type String, read-only.

```typescript title="Get Component Title"
console.log(gallery.title); // "Product Gallery"
```

### visible
Component visibility, type Boolean, read-write.

```typescript title="Control Show/Hide"
// Hide component
gallery.visible = false;

// Show component
gallery.visible = true;
```

### app
Application instance reference, type App, read-only.

```typescript title="Get Application Instance"
const appInstance = gallery.app;
```

### page
Page instance reference, type Page, read-only.

```typescript title="Get Page Instance"
const pageInstance = gallery.page;
```

### config
Component configuration object, containing all configuration items, type Object, read-only.

```typescript title="Get Configuration Information"
const pageSize = gallery.config.pageSize;
const showFields = gallery.config.showFieldList;
```

### fullName
Component full name, type String, read-only.

```typescript title="Get Component Full Name"
console.log(gallery.fullName); // "components.Gallery"
```

### showTitle
Whether to show title, type Boolean, read-write.

```typescript title="Control Title Display"
// Show title
gallery.showTitle = true;

// Hide title
gallery.showTitle = false;
```

### type
Component type, type String, read-only.

```typescript title="Get Component Type"
console.log(gallery.type); // "components.Gallery"
```

### loading
Loading state variable, type Numeric.

```typescript title="Get Loading State"
// Check if currently loading
const isLoading = gallery.loading.value === 1;

// Set loading state
gallery.loading.value = 1; // Start loading
gallery.loading.value = 0; // Loading complete
```

### pageNumber
Current page number, type Number, read-write.

```typescript title="Page Number Operations"
// Get current page number
console.log(gallery.pageNumber); // 1

// Set page number
gallery.pageNumber = 2;
```

### pageSize
Number of items per page, type Number, read-write.

```typescript title="Page Size Operations"
// Get page size
console.log(gallery.pageSize); // 20

// Modify page size
gallery.pageSize = 30;
```

### total
Total number of data items, type Number, read-only.

```typescript title="Get Total Count"
console.log(`Total ${gallery.total} data items`);
```

## Events
### clickCard
Card click event, triggered when user clicks a card in the gallery.

#### Event Parameters
| Parameter Name | Type | Description |
|--------|------|------|
| data | RowData | Data row corresponding to the clicked card |

#### Usage Example
```typescript title="Handle Card Click"
gallery.subscribeEvent('clickCard', (args) => {
  const clickedRow = args.data;
  console.log('Card clicked:', clickedRow.name);
  
  // Can perform page navigation, modal display, etc.
  app.goToPage('ProductDetail', { id: clickedRow.id });
});
```

#### Configuration Example
```json title="Event Configuration"
{
  "eventList": [
    {
      "title": "After Card Click",
      "name": "clickCard",
      "data": "activeRow"
    }
  ]
}
```

### Dynamic Button Events
Gallery component automatically generates corresponding click events based on configured buttons.

#### Toolbar Button Events
When `toolLeftBtnList` or `toolRightBtnList` is configured, corresponding click events are automatically generated.

```typescript title="Toolbar Button Events"
// When configuring toolbar buttons
{
  "config": {
    "toolRightBtnList": [
      { "id": "addBtn", "name": "Add" }
    ]
  }
}

// Automatically generates event: clickAddBtn
gallery.subscribeEvent('clickAddBtn', () => {
  console.log('Add button clicked');
});
```

#### Card Button Events
When `cardBottomBtnList` or `cardRightBtnList` is configured, corresponding click events are automatically generated.

```typescript title="Card Button Events"
// When configuring card buttons
{
  "config": {
    "cardBottomBtnList": [
      { "id": "editBtn", "name": "Edit" }
    ]
  }
}

// Automatically generates event: clickEditBtn
gallery.subscribeEvent('clickEditBtn', (args) => {
  console.log('Edit button clicked, current row data:', args.data);
});
```

#### Event Naming Rules
Button event names use camelCase naming convention: `click + ButtonID (camelCase format)`

- Button ID `addBtn` → Event name `clickAddBtn`
- Button ID `delete_item` → Event name `clickDeleteItem` 