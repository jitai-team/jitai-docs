---
slug: model-filter
title: "Model Filter Reference"
description: "Model Filter Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Model Filter"
---
# Model Filter
The model filter is an interactive component used for filtering operations on specified model data, implementing visual configuration capabilities for data query conditions based on React and TypeScript. It handles query condition construction, filter state management, and query event triggering, supporting three filtering modes: simple mode, complex mode, and free mode, providing list and tag display styles.

The model filter element has a hierarchical structure of Meta (components.Meta) → Type (components.Filter) → Instance. Developers can quickly create model filter instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.FilterType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```typescript title="Basic Usage Example"
{
  "name": "Filter1",
  "title": "User Filter",
  "type": "components.Filter", 
  "config": {
    "requireElements": [
      {
        "name": "models.UserModel",
        "type": "models.Meta",
        "title": "User Model",
        "filter": "",
        "orderBy": []
      }
    ],
    "mode": "simple",
    "firstTimeQuery": true,
    "layoutPercent": 1,
    "styleMode": "list",
    "typeMode": "horizontal",
    "config": {
      "gender": {
        "layout": {
          "w": 60, "h": 1, "x": 0, "y": 0,
          "i": "gender", "minW": 12, "minH": 1
        },
        "config": {
          "fieldId": "gender",
          "showTitle": true,
          "multiple": false,
          "isAll": false,
          "isShowAlias": false,
          "group": [
            {
              "id": "filter-group-1",
              "type": "normal",
              "name": "Male",
              "operator": "isEqual",
              "filter": [
                {
                  "uid": "item-1",
                  "fieldId": "gender",
                  "operator": "isEqual",
                  "value": "male",
                  "valueType": "constant",
                  "type": "ITEM"
                }
              ]
            }
          ],
          "isCustom": true,
          "rowNum": 1,
          "isShowMore": false
        }
      }
    }
  }
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|---------------|------|----------|---------------|-------------|
| requireElements | requireElement[] | Yes | - | Associated model element configuration |
| mode | FilterModeEnum | No | 'simple' | Filter mode: simple/complex/free |
| firstTimeQuery | boolean | No | true | Whether to query on first load |
| layoutPercent | number | No | 1 | Layout percentage |
| styleMode | SimpleFilterStyleEnum | No | 'list' | Simple mode style: list/tag |
| typeMode | SimpleFilterTypeEnum | No | 'horizontal' | Simple mode type: horizontal/vertical |
| config | Record&lt;string, IFilterSimpleConfigNode&gt; | No | \{\} | Field filter configuration |
| isShowAllField | boolean | No | false | Whether to show all fields |

#### requireElement Configuration
| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| name | string | Yes | Model element fullName |
| type | string | Yes | Fixed value 'models.Meta' |
| title | string | Yes | Model display name |
| filter | string | No | Preset filter condition |
| orderBy | string[] | No | Sorting rules |

#### Field Filter Configuration (IFilterSimpleConfigNodeConfig)
| Property Name | Type | Required | Default Value | Description |
|---------------|------|----------|---------------|-------------|
| fieldId | string | Yes | - | Field ID |
| showTitle | boolean | No | true | Whether to show field title |
| multiple | boolean | No | false | Whether to support multiple selection |
| isAll | boolean | No | false | Whether to include all options |
| isShowAlias | boolean | No | false | Whether to show field alias |
| alias | string | No | - | Field alias |
| group | IFilterSimpleConfigGroupItem[] | No | [] | Filter group configuration |
| defaultSelectedGroup | string[] | No | [] | Default selected groups |
| hasDefaultSelect | boolean | No | false | Whether to have default selection |
| isCustom | boolean | No | true | Whether to support custom filtering |
| customFilterOperateType | string | No | - | Custom filter operation type |
| customFilterInfo | IFilterCompItem[] | No | [] | Custom filter information |
| placeholder | string | No | - | Placeholder text |
| rowNum | number | No | 1 | Number of display rows |
| isShowMore | boolean | No | false | Whether to show more options |
| isFuzzyQuery | boolean | No | false | Whether to support fuzzy query |

## Variables
### filter
Filter condition variable, storing all filter conditions of the current component.

| Property | Type | Description |
|----------|------|-------------|
| Name | filter | Variable name |
| Type | QFilter | Query filter condition type |
| Generic | Associated model | Points to model specified in requireElements |
| Read-only | true | Variable is read-only, maintained internally by component |

**Usage Example**:
```typescript title="Get Filter Conditions"
// Get current filter conditions
const currentFilter = this.filter.value;

// Reference filter conditions in other components
{
  "dataSource": {
    "filter": "{{Filter1.filter}}"
  }
}
```

## Methods
### reset
Reset all filter conditions of the filter to initial state.

```typescript title="Reset Filter"
await this.reset();
```

### runCode
Execute JavaScript code string, code runs in page context.

**Parameters**:
| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| code | string | Yes | JavaScript code to execute |

**Return Value**: any - Code execution result

```typescript title="Execute Dynamic Code"
// Get filter conditions
const filterValue = this.runCode('this.filter.value');

// Execute complex logic
const result = this.runCode(`
  const condition = this.filter.value;
  return condition ? 'Has filter conditions' : 'No filter conditions';
`);
```

### setConfig
Update component configuration.

**Parameters**:
| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| next | Partial&lt;T&gt; | Yes | New configuration object |
| clean | boolean | No | Whether to completely replace configuration |

```typescript title="Dynamically Modify Configuration"
this.setConfig({
  styleMode: "tag",
  typeMode: "vertical"
});
```

### publishEvent
Publish component events.

**Parameters**:
| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| name | string | Yes | Event name |
| ex | Record&lt;string, any&gt; | No | Event additional data |

```typescript title="Publish Custom Event"
await this.publishEvent('customFilter', { 
  filterType: 'advanced',
  data: filterData 
});
```

### subscribeEvent
Subscribe to component events.

**Parameters**:
| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| name | string | Yes | Event name |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscriptions |

**Return Value**: string - Event handler ID

```typescript title="Subscribe to Filter Event"
const handlerId = this.subscribeEvent('afterFilter', async (data) => {
  console.log('Filter conditions:', data.filter.value);
});
```

### unSubscribeEvent
Cancel event subscription.

**Parameters**:
| Parameter Name | Type | Required | Description |
|----------------|------|----------|-------------|
| id | string | Yes | Event handler ID |

### destroy
Destroy component instance, clean up all resources and event subscriptions.

### getPermConfig
Get component permission configuration.

**Return Value**: Record&lt;string, any&gt; | undefined - Permission configuration object

## Events
### afterFilter
After query event, triggered when filter conditions change and query is completed.

| Property | Type | Description |
|----------|------|-------------|
| Event Name | afterFilter | Fixed event name |
| Data Parameter | filter | Current filter conditions |
| Trigger Timing | After filter conditions change and query is completed |

```typescript title="Event Handling Example"
// Subscribe to after filter event
this.subscribeEvent('afterFilter', async (data) => {
  console.log('Filter conditions:', data.filter.value);
  // Update other component data
  await this.Table1.refresh();
});
```

## Properties
### name
Component instance name.

- **Type**: string

### title
Component display title.

- **Type**: string

### type
Component type identifier.

- **Type**: string

### showTitle
Whether to show title.

- **Type**: boolean

### config
Component configuration object.

- **Type**: T

### app
Application instance reference.

- **Type**: App

### page
Page instance reference.

- **Type**: BasePage

## Advanced Features
### Multi-mode Support
```typescript title="Complex Mode Configuration"
{
  "mode": "complex",
  "layoutPercent": 1,
  "config": {
    "fieldId": {
      "layout": { /* Layout configuration */ },
      "config": {
        "fieldId": "userName",
        "isShowAlias": true,
        "alias": "User Name"
      }
    }
  }
}
```

### Custom Filter Conditions
```typescript title="Custom Filter Configuration"
{
  "customFilterInfo": [
    {
      "uid": "custom-1",
      "fieldId": "age",
      "operator": "gt",
      "value": 18,
      "valueType": "constant",
      "type": "ITEM"
    }
  ]
}
```

### Dynamic Field Generation
When `isShowAllField: true` is set, the component automatically generates filter configuration based on the associated model's field definitions, excluding field types that don't support filtering (images, rich text, location, attachments, sub-tables).