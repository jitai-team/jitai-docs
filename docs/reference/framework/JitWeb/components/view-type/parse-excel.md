---
slug: parse-excel
---
# Parse Excel
Parse Excel is a component for parsing .xlsx format files and importing data into specified data models, implemented based on Steps stepper and table display to provide Excel data upload, parsing, and import functionality. It handles file upload validation, data format conversion, and batch data import, supporting field alias mapping, data preview, and custom button operations.

The parse Excel element has a hierarchical structure of Meta (components.Meta) → Type (components.ParseData) → Instance. Developers can quickly create parse Excel instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ParseDataType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Basic Configuration"
{
  "requireElements": [
    {
      "name": "models.CustomerModel",
      "type": "models.Meta",
      "title": "Customer Model"
    }
  ],
  "fieldIdList": ["custName", "phone", "birthday"],
  "fieldAliasList": [
    {
      "fieldId": "custName",
      "aliasName": "Customer Name"
    },
    {
      "fieldId": "phone", 
      "aliasName": "Phone Number"
    }
  ],
  "footerBtnList": [
    {
      "id": "import",
      "name": "Import Data",
      "type": "primary"
    }
  ]
}
```

### Configuration Properties
| Property | Type | Required | Description |
|------|------|------|------|
| requireElements | array | Yes | Associated data model configuration |
| fieldIdList | string[] | No | List of header fields to import |
| fieldAliasList | object[] | No | Field alias mapping configuration |
| footerBtnList | object[] | No | Custom operation button list |
| replaceFiled | string[] | No | Selected replacement field array |

**requireElements Configuration Items:**
- name: fullName of the data model
- type: Fixed as "models.Meta"  
- title: Model display name

**fieldAliasList Configuration Items:**
- fieldId: Model field ID
- aliasName: Field alias display name

**footerBtnList Configuration Items:**
- id: Button unique identifier
- name: Button display text
- type: Button type (primary/default, etc.)

## Variables
### rowDataList
Parsed multi-row data, type is RowList, containing all data records parsed from the Excel file.

- **Type**: RowList\<T\>
- **Generic**: Associated data model type
- **Read-only**: Yes
- **Description**: Stores Excel parsed data, can be used for subsequent data processing and import operations

## Methods 
### publishEvent
Publish component event.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| name | string | Yes | Event name |
| ex | object | No | Additional event data |

#### Usage Example
```typescript title="Publish Custom Event"
await parseDataComponent.publishEvent('afterParse', {
  rowDataList: processedData
});
```

### subscribeEvent
Subscribe to component event.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| name | string | Yes | Event name |
| evtCb | function | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscription, default true |

#### Return Value
string - Event handler ID, used for unsubscribing

#### Usage Example
```typescript title="Subscribe to Event"
const handlerId = parseDataComponent.subscribeEvent('afterParse', (data) => {
  console.log('Received parsed data:', data.rowDataList);
});
```

### unSubscribeEvent
Unsubscribe from event.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| id | string | Yes | Event handler ID |

#### Usage Example
```typescript title="Unsubscribe from Event"
parseDataComponent.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| next | object | Yes | New configuration object |
| clean | boolean | No | Whether to completely replace configuration, default false |

#### Usage Example
```typescript title="Update Component Configuration"
parseDataComponent.setConfig({
  fieldIdList: ['newField1', 'newField2']
});
```

### destroy
Destroy component instance, clean up all event listeners and variables.

#### Usage Example
```typescript title="Destroy Component"
parseDataComponent.destroy();
```

### runCode
Execute dynamic code string.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| code | string | Yes | Code string to execute |

#### Return Value
any - Code execution result

#### Usage Example
```typescript title="Execute Dynamic Code"
const result = parseDataComponent.runCode('this.rowDataList.length');
```

### getPermConfig
Get component permission configuration.

#### Return Value
object | undefined - Permission configuration object, returns undefined if no permission restrictions

#### Usage Example
```typescript title="Get Permission Configuration"
const permConfig = parseDataComponent.getPermConfig();
if (permConfig) {
  console.log('Component permission configuration:', permConfig);
}
```

## Properties
### name
Component instance name, type is string.

### title
Component display title, type is string.

### config
Component configuration object, type is object, contains all component configuration information.

### showTitle
Whether to show title, type is boolean.

### type
Component type identifier, type is string.

### fullName
Component full name, type is string.

### compType
Component type enumeration value, type is string.

### dataTypeList
Component variable definition list, type is array.

### app
Application instance (getter property), type is App.

### page
Page instance (getter property), type is BasePage.

### ModelClass
Associated data model class, type is class.

### fieldDefineList
Field definition list, type is array.

### allFieldDict
All fields dictionary, type is object.

### primaryKey
Primary key field name, type is string.

## Events
### afterParse
Event triggered after parsing is completed.

#### Parameter Details
| Parameter | Type | Description |
|------|------|------|
| data | object | Event data object |
| data.rowDataList | RowList | Parsed multi-row data |

#### Usage Example
```typescript title="Listen to Parse Complete Event"
parseDataComponent.subscribeEvent('afterParse', (data) => {
  console.log('Parsing completed, data row count:', data.rowDataList.length);
  // Process parsed data
  processParseData(data.rowDataList);
});
```

### Dynamic Button Events
Button click events automatically generated based on footerBtnList configuration, event name is `click + ButtonID` in camelCase.

#### Parameter Details
| Parameter | Type | Description |
|------|------|------|
| data | object | Event data object |
| data.rowDataList | RowList | Currently parsed multi-row data |

#### Usage Example
```typescript title="Listen to Custom Button Events"
// Button with id "import" configured, event name is "clickImport"
parseDataComponent.subscribeEvent('clickImport', (data) => {
  console.log('Import button clicked, preparing to import data');
  // Execute data import logic
  importData(data.rowDataList);
});
```

## Usage Limitations
### File Format Requirements
- Only supports .xlsx format Excel files
- File size must not exceed 5MB
- Does not support files with merged cells
- Does not support vertical header format

### Data Type Limitations
- Cannot parse more than 500 records at once
- Does not support parsing sub-tables, serial numbers, attachments, images, hyperlinks, addresses, handwritten signatures, location type fields
- System will automatically truncate data exceeding the limit

### Field Mapping Rules
- fieldIdList only retains fields that exist in the associated model
- fieldAliasList only retains field mappings that exist in the associated model
- Parsing will perform data mapping based on field aliases 