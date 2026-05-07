---
slug: row-to-column
title: "Row to Column Reference"
description: "Row to Column Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Row to Column"
---
# Row to Column
Row to Column is a data structure transformation component that implements row-column interchange functionality based on data pivot principles. It handles dynamic data structure transposition, data format reorganization, and provides data preview, suitable for data format conversion and report generation scenarios.

The row to column element has a hierarchical structure of Meta (components.Meta) → Type (components.Transpose) → Instance. Developers can quickly create row to column instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.TransposeType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
└── MyTransposePage/
    ├── e.json
    ├── page.ts
    └── scheme.json  # Page layout configuration
```

```json title="scheme.json - Minimal Configuration"
{
  "fullName": "components.Transpose",
  "type": "components.Transpose", 
  "name": "Transpose1",
  "title": "Row to Column 1",
  "config": {
    "requireElements": [
      {
        "name": "models.CustomerModel"
      }
    ],
    "groupByFieldId": "gender", 
    "showFieldId": "amount"
  }
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| requireElements | requireElement[] | Data model configuration | - | Yes |
| fixedFieldIdList | string[] | Fixed column field ID list | `[]` | No |
| groupByFieldId | string | Dimension column field ID, used for grouping transpose | - | Yes |
| showFieldId | string | Display value field ID | - | Yes |
| fieldConfig | Record&lt;string, TransposeTableFieldConfig&gt; | Field configuration object | `{}` | No |
| autoLoad | boolean | Whether to auto-load data | true | No |
| allowEdit | boolean | Whether to allow editing | false | No |
| allowExport | boolean | Whether to allow export | false | No |
| leftBtnList | TransposeButtonProps[] | Left button list | `[]` | No |
| rightBtnList | TransposeButtonProps[] | Right button list | `[]` | No |
| menuBtnList | TransposeButtonProps[] | Menu button list | `[]` | No |
| platform | "PC" &#124; "MOBILE" | Runtime platform | "PC" | No |

## Variables
### displayRowList
Displayed multi-row data variable, type is RowList, read-only. Contains data results after row-to-column processing.

### operateRowList
Operated multi-row data variable, type is RowList, read-only. Contains data row records operated by users.

### activeRow
Operated single row data variable, type is RowData, read-only. Represents the currently selected or operated single row data.

### filter
Filter condition variable, type is QFilter. Used to set filter conditions for data queries.

## Methods 
### call
Refresh component data, reload data based on filter conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| qFilter | QFilter | Filter conditions | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Call Refresh Method"
const transposeComp = app.getElement('components.Transpose1');
await transposeComp.call();
```

### updateConfig
Update component configuration, dynamically modify component configuration properties.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| compConfig | TransposeTableCompConfig | New component configuration | - | Yes |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Update Component Configuration"
const transposeComp = app.getElement('components.Transpose1');
await transposeComp.updateConfig({
  ...transposeComp.config,
  allowEdit: true
});
```

### run
Run component, initialize and render component to specified DOM container.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| domRef | React.RefObject&lt;HTMLDivElement&gt; | DOM container reference | - | Yes |

#### Return Value
Promise&lt;void&gt;

### checkConfig
Check configuration completeness, verify whether necessary configuration items are set.

#### Return Value
boolean - Whether configuration is valid

### setConfig
Set component configuration, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| next | Partial&lt;TransposeTableCompConfig&gt; | New configuration | - | Yes |
| clean | boolean | Whether to clear existing configuration | false | No |

### publishEvent
Send event message, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Additional parameters | - | No |

#### Return Value
Promise&lt;void&gt;

### subscribeEvent
Subscribe to event message, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscription | true | No |

#### Return Value
string - Subscription handle ID

### unSubscribeEvent
Cancel event subscription, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| id | string | Subscription handle ID | - | Yes |

#### Return Value
boolean - Whether cancellation was successful

### destroy
Destroy component, clean up resources, inherited from BaseComponent.

### runCode
Execute code string, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| code | string | Code string to execute | - | Yes |

#### Return Value
any - Code execution result

### getPermConfig
Get permission configuration, inherited from BaseComponent.

#### Return Value
Record&lt;string, any&gt; &#124; undefined - Permission configuration object

## Properties
### name
Component name, type is string.

### title
Component title, type is string.

### config
Component configuration object, type is TransposeTableCompConfig.

### showTitle
Whether to show title, type is boolean.

### app
Associated application instance, type is App.

### page
Associated page instance, type is BasePage.

### ModelClass
Associated data model class, type is typeof Jit.BaseModel.

### primaryKey
Primary key field name, type is string, default is "id".

### fullName
Component full name, type is string.

### compType
Component type, type is COMPONENT_TYPE.

### type
Component type identifier, type is string.

## Events
### afterRowClick
Value click event, triggered when user clicks data values.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowData | Clicked row data | - | Yes |

#### Usage Example
```tsx title="Listen to Value Click Event"
const transposeComp = app.getElement('components.Transpose1');
transposeComp.subscribeEvent('afterRowClick', (data) => {
  console.log('Clicked row data:', data.activeRow);
});
```

### afterAddRow
After adding data event, triggered when data is successfully added.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowList | Operated data list | - | Yes |

### afterDeleteRow
After deleting row event, triggered when data is successfully deleted.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowList | Operated data list | - | Yes |

### afterRowChange
After value change event, triggered when data values change (PC only).

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowData | Changed row data | - | Yes |

### afterEditRow
After editing row event, triggered when row data is edited (Mobile only).

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowList | Operated data list | - | Yes |

#### Usage Example
```tsx title="Listen to Data Change Event"
const transposeComp = app.getElement('components.Transpose1');
transposeComp.subscribeEvent('afterRowChange', (data) => {
  console.log('Data changed:', data.activeRow);
});
```

## Advanced Features
### Field Configuration
Fine control over each field's display and behavior through fieldConfig property:

```tsx title="Field Configuration Example"
{
  "fieldConfig": {
    "custName": {
      "alias": "Customer Name",
      "position": "center"
    }
  }
}
```

### Dynamic Button Configuration
Support for configuring custom buttons in left, right, and menu areas:

```tsx title="Button Configuration Example"
{
  "rightBtnList": [
    {
      "name": "Export",
      "outputId": "exportBtn"
    }
  ]
}
```

### Mobile Adaptation
Component supports both PC and mobile platforms, switch through platform configuration:

```tsx title="Mobile Configuration"
{
  "platform": "MOBILE"
}
``` 