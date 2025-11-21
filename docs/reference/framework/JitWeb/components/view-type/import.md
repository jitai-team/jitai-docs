---
slug: import
title: "Import Reference"
description: "Import Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Import"
---
# Import
Import is a view component for Excel file data import, implemented with a step-by-step guided interface to provide file upload, field mapping, data preview, and batch import functionality. It handles Excel file parsing, field validation mapping, and data insertion operations, supporting both append and replace import modes with progress monitoring and error handling capabilities.

The import element has a hierarchical structure of Meta (components.Meta) → Type (components.Import) → Instance. Developers can quickly create import instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ImportType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Import Component Basic Configuration"
{
  "type": "components.Import",
  "name": "Import1",
  "title": "Customer Data Import",
  "config": {
    "requireElements": [
      {
        "name": "models.CustomerModel",
        "title": "Customer Model",
        "type": "models.Meta"
      }
    ],
    "fieldIdList": ["custName", "phone", "email"],
    "fieldAliasList": [
      {
        "aliasName": "Customer Name",
        "fieldId": "custName",
        "fieldName": "custName",
        "fieldType": "Stext",
        "isNeed": true,
        "rules": ""
      }
    ],
    "importType": 1,
    "importDesc": {
      "check": true,
      "desc": "Please fill in data according to template format"
    }
  }
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|---------|------|------|--------|------|
| requireElements | Array | Yes | - | Associated data model configuration |
| fieldIdList | Array\<string\> | Yes | [] | List of importable field IDs |
| fieldAliasList | Array\<Object\> | Yes | [] | Field alias mapping configuration |
| importType | number | No | 1 | Import mode: 1-append, 2-replace |
| importDesc | Object | No | - | Import description configuration |
| requiredFieldList | Array\<string\> | No | [] | Required field list |
| importSerial | boolean | No | false | Whether to import serial numbers |
| replaceFiled | Array\<string\> | No | [] | Replace field array |
| filter | string | No | "" | Filter conditions |
| triggerBeforeFunc | string | No | "" | Pre-import trigger function |
| triggerAfterFunc | string | No | "" | Post-import trigger function |

## Variables
None

## Methods 
### componentImport
Execute data import operation, handle Excel file parsing and data insertion.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| importConfig | string | Yes | JSON string of import configuration |

#### Return Value
Returns `JitDict` type, containing import result information.

#### Usage Example
```typescript title="Call Import Method"
const importResult = await this.Import1.componentImport(JSON.stringify({
  modelFullName: "models.CustomerModel",
  importType: 1,
  fieldMap: {...},
  fileUrl: "http://example.com/file.xlsx"
}));
```

### getImportStatus
Get import task progress status, used for asynchronous import progress monitoring.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| mainModelFullName | string | Yes | Full name of the main model |

#### Return Value
Returns `JitDict` type, containing import status and progress information.

#### Usage Example
```typescript title="Get Import Status"
const status = await this.Import1.getImportStatus("models.CustomerModel");
console.log(status.value);
```

### publishEvent
Publish component event, notify other components or pages.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| name | string | Yes | Event name |
| ex | Record\<string, any\> | No | Event additional data |

#### Return Value
Returns `Promise<void>`.

#### Usage Example
```typescript title="Publish Event"
await this.Import1.publishEvent('importCompleted', {
  successCount: 100,
  errorCount: 2
});
```

### subscribeEvent
Subscribe to component event, handle event callbacks.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| name | string | Yes | Event name |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscriptions |

#### Return Value
Returns subscription handle string.

#### Usage Example
```typescript title="Subscribe to Event"
const handleId = this.Import1.subscribeEvent('clickFinishBtn', (data) => {
  console.log('Import operation completed', data);
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| id | string | Yes | Subscription handle ID |

#### Return Value
Returns boolean value indicating cancellation result.

#### Usage Example
```typescript title="Cancel Subscription"
const success = this.Import1.unSubscribeEvent(handleId);
```

### setConfig
Update component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| next | Object | Yes | New configuration object |
| clean | boolean | No | Whether to completely replace configuration |

#### Usage Example
```typescript title="Update Configuration"
this.Import1.setConfig({
  fieldIdList: ["custName", "phone", "email", "address"]
});
```

### runCode
Execute custom code snippet.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| code | string | Yes | Code string to execute |

#### Usage Example
```typescript title="Execute Code"
const result = this.Import1.runCode(`
  return this.config.fieldIdList.length > 0;
`);
```

### destroy
Destroy component instance, clean up resources.

#### Usage Example
```typescript title="Destroy Component"
this.Import1.destroy();
```

### bindApp
Bind application instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| app | App | Yes | Application instance |

### bindPage
Bind page instance to component.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| page | BasePage | Yes | Page instance |

### getEventKey
Get unique key name for component event.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| eventName | string | Yes | Event name |

#### Return Value
Returns string in format `${uuid}.${name}.${eventName}`.

### initVariables
Initialize component variables.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| dataTypeList | Array\<BaseDataType\> | Yes | Data type definition list |

### newVariable
Create new variable instance.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|---------|------|------|------|
| varConfig | DataTypeConfig | Yes | Variable configuration object |

#### Return Value
Returns created variable instance.

### getPermConfig
Get component permission configuration.

#### Return Value
Returns permission configuration object or `undefined`.

## Properties
### name
Component name, used to identify component instance.

- **Type**: `string`
- **Access**: Read-only

### title
Component title, used for display.

- **Type**: `string`
- **Access**: Read-only

### config
Component configuration object, containing all configuration parameters.

- **Type**: `ImportCompConfig & { requireElements: requireElement[] }`
- **Access**: Read-write

### type
Component type identifier.

- **Type**: `string`
- **Access**: Read-only
- **Value**: `"components.Import"`

### showTitle
Whether to show component title.

- **Type**: `boolean`
- **Access**: Read-write

### app
Current application instance.

- **Type**: `App`
- **Access**: Read-only

### page
Current page instance.

- **Type**: `BasePage`
- **Access**: Read-only

### ModelClass
Associated data model class.

- **Type**: `ModelClass`
- **Access**: Read-only

### fieldDefineList
Model field definition list.

- **Type**: `Array<DataTypeConfig>`
- **Access**: Read-only

### allFieldDict
All field definition dictionary.

- **Type**: `Record<string, any>`
- **Access**: Read-only

### primaryKey
Primary key field name.

- **Type**: `string`
- **Access**: Read-only

### fullName
Component complete name identifier.

- **Type**: `string`
- **Access**: Read-only

### dataTypeList
Component variable data type definition list.

- **Type**: `Array<BaseDataType>`
- **Access**: Read-only

### compType
Component type enumeration value.

- **Type**: `COMPONENT_TYPE`
- **Access**: Read-only

## Events
### clickFinishBtn
Event triggered after clicking the import prompt button.

**Usage Example**:

```typescript title="Handle Finish Button Event"
this.Import1.subscribeEvent('clickFinishBtn', () => {
  console.log('User clicked the finish button');
});
```

### Dynamic Button Events
Button click events dynamically generated based on `footerBtnList` configuration, with event names in format `click${btnId}` (camelCase naming).

**Usage Example**:

```typescript title="Handle Dynamic Button Events"
// Assuming a button with ID 'export' is configured
this.Import1.subscribeEvent('clickExport', (data) => {
  console.log('Export button clicked', data.rowDataList);
});
``` 