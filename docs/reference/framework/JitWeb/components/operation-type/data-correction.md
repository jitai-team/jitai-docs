---
slug: data-correction
---
# Data Correction
The data correction component is an operation component specifically designed for data quality checking and error correction, implementing data consistency checking and outlier handling through visual configuration. It handles batch data correction, field value validation, and correction rule management, supporting automatic correction and manual confirmation modes, providing a complete solution for data cleaning and quality management scenarios.

The data correction component element has a hierarchical structure of Meta (components.Meta) → Type (components.DataCheck) → Instance. Developers can quickly create data correction component instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.DataCheckType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
MyApp/
├── models/
│   └── CustomerModel/
│       ├── model.py
│       ├── e.json
│       └── __init__.py
└── pages/
    └── DataManagePage/
        ├── scheme.json
        └── e.json
```

```json title="Page Configuration File - scheme.json"
{
  "componentList": [
    {
      "fullName": "components.DataCheck",
      "type": "components.DataCheck",
      "name": "DataCheck1",
      "title": "Customer Data Correction",
      "config": {
        "requireElements": [
          {
            "name": "models.CustomerModel",
            "filter": "",
            "orderBy": [],
            "title": "Customer Model",
            "type": "models.Meta"
          }
        ],
        "fieldIdList": [
          "custName",
          "phone", 
          "email",
          "company"
        ]
      },
      "showTitle": true
    }
  ]
}
```

### Configuration Properties
**requireElements** `Array<requireElement>` **Required**
Associated data model configuration, defining the data model the component will operate on.

**fieldIdList** `Array<string>` Optional
List of correctable fields, specifying field names that users are allowed to correct.

**requireElement Configuration**:

**name** `string` **Required**
Model element's fullName identifier.

**type** `string` **Required** 
Model element type, usually "models.Meta".

**title** `string` **Required**
Model's display title.

**filter** `string` Optional, default ""
Data filter condition, used to filter data to be processed.

**orderBy** `Array<string>` Optional, default []
Sorting rule configuration.

## Variables
### correctedRowList
Multi-row data variable to be corrected, used to store the list of records that need data correction.

**Type**: `RowList<Associated Model&gt;`

**Usage Example**:

```tsx title="Get and Set Correction Data"
// Get component instance
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// Set data to be corrected
dataCheckComp.correctedRowList.value = [
  { id: 1, custName: "Zhang San", phone: "1380000001" },
  { id: 2, custName: "Li Si", phone: "1380000002" }
];

// Get corrected data
const correctedData = dataCheckComp.correctedRowList.value;
```

## Methods
### publishEvent
Publish component events to event bus.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Additional data | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Publish Event"
// Manually trigger after submit event
await dataCheckComp.publishEvent("afterSubmit", { 
  success: true, 
  modifiedCount: 5 
});
```

### subscribeEvent
Subscribe to component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | Function | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
string - Subscription ID

#### Usage Example
```tsx title="Subscribe to Event"
// Subscribe to after submit event
const subscriptionId = dataCheckComp.subscribeEvent("afterSubmit", async (data) => {
  console.log("Data correction completed:", data);
  // Refresh other component data
  await otherComponent.refresh();
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Subscription ID | - | Yes |

#### Return Value
boolean

#### Usage Example
```tsx title="Cancel Subscription"
// Cancel event subscription
dataCheckComp.unSubscribeEvent(subscriptionId);
```

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | Partial&lt;ComponentConfig&gt; | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
void

#### Usage Example
```tsx title="Update Configuration"
// Add new correctable fields
dataCheckComp.setConfig({
  fieldIdList: ["custName", "phone", "email", "address"]
});

// Completely replace configuration
dataCheckComp.setConfig({
  requireElements: [...],
  fieldIdList: ["newField1", "newField2"]
}, true);
```

### bindApp
Bind application instance to component.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| app | App | Application instance | - | Yes |

#### Usage Example
```tsx title="Bind Application Instance"
// Manually bind application instance
dataCheckComp.bindApp(app);
```

### bindPage
Bind page instance to component.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| page | BasePage | Page instance | - | Yes |

#### Usage Example
```tsx title="Bind Page Instance"
// Manually bind page instance
dataCheckComp.bindPage(page);
```

### runCode
Run custom code snippet.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code to execute | - | Yes |

#### Return Value
any - Code execution result

#### Usage Example
```tsx title="Run Custom Code"
// Run custom business logic
const result = dataCheckComp.runCode(`
  self.getElement("components.Table1").refresh();
  return "Execution completed";
`);
```

### getPermConfig
Get component's permission configuration.

#### Return Value
Record&lt;string, any&gt; | undefined - Permission configuration object

#### Usage Example
```tsx title="Get Permission Configuration"
// Get component permission settings
const permConfig = dataCheckComp.getPermConfig();
if (permConfig?.editable === false) {
  // Disable edit functionality
}
```

### newVariable
Create new data type variable.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| varConfig | DataTypeConfig | Variable configuration | - | Yes |

#### Return Value
any - Created variable instance

#### Usage Example
```tsx title="Create New Variable"
// Dynamically create new data variable
const newVar = dataCheckComp.newVariable({
  name: "dynamicField",
  title: "Dynamic Field",
  dataType: "Stext"
});
```

### destroy
Destroy component instance, clean up all event subscriptions and resources.

#### Usage Example
```tsx title="Destroy Component"
// Destroy component when page unloads
dataCheckComp.destroy();
```

## Properties
### name
Component instance name.

**Type**: `string`

**Read-only**: Yes

### title
Component display title.

**Type**: `string`

### config
Component configuration object.

**Type**: `ComponentConfig`

### fieldDefineList
Field definition list, containing all field configurations of the associated model.

**Type**: `DataTypeConfig[]`

**Read-only**: Yes

### ModelClass
Associated model class.

**Type**: `typeof Jit.BaseModel`

**Read-only**: Yes

### showTitle
Whether to show component title.

**Type**: `boolean`

### type
Component type identifier.

**Type**: `string`

**Read-only**: Yes

**Value**: `"components.DataCheck"`

### fullName
Component full path name.

**Type**: `string`

**Read-only**: Yes

### app
Associated application instance.

**Type**: `App`

**Read-only**: Yes

### page
Associated page instance.

**Type**: `BasePage`

**Read-only**: Yes

### compType
Component type enumeration value.

**Type**: `COMPONENT_TYPE`

**Read-only**: Yes

### dataTypeList
List of data types defined in the component.

**Type**: `BaseDataType[]`

**Read-only**: Yes

## Events
### afterSubmit
Triggered after data correction submission is completed.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| data | any | Submission related data | - | No |

#### Usage Example
```tsx title="Listen to Submit Event"
// Listen to correction completion event in page
dataCheckComp.subscribeEvent("afterSubmit", async (submitData) => {
  // Show success message
  app.showMessage("Data correction completed", "success");
  
  // Refresh data table
  const tableComp = app.getElement("pages.DataManagePage.Table1");
  await tableComp.refresh();
  
  // Clear correction data
  dataCheckComp.correctedRowList.value = [];
});
```

## Advanced Features
### Correction Rule Configuration
The data correction component supports multiple correction operation types, including field built-in methods and general operations:

```tsx title="Correction Rule Example"
// Get component instance
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// Set data to be corrected
dataCheckComp.correctedRowList.value = [
  { 
    id: 1, 
    custName: "  Zhang San  ", 
    phone: "138-0000-0001",
    status: "active"
  }
];

// Correction operations supported internally by component include:
// 1. Set to specified value: set
// 2. Clear field: clear  
// 3. Field-specific methods: such as trim(), append() for strings, etc.
```

### Field Validation and Error Handling
The component automatically performs field validation to ensure corrected data conforms to field definitions:

```tsx title="Error Handling Example"
// Component automatically validates:
// - Whether data type is correct
// - Whether it conforms to field constraints
// - Whether required fields have values
// - Whether numeric ranges are valid

// Error prompts are displayed when validation fails
// Prevents submission operation from continuing
```

### Batch Data Processing
Supports applying the same correction rules to multiple records:

```tsx title="Batch Processing Example"
// Batch correct customer phone number format
const customerData = [
  { id: 1, phone: "138-0000-0001" },
  { id: 2, phone: "139-0000-0002" },
  { id: 3, phone: "137-0000-0003" }
];

dataCheckComp.correctedRowList.value = customerData;

// User configures correction rules in interface:
// Field: phone
// Operation: replace (if phone number field supports this method)
// Parameters: replace "-" with ""
// 
// Component automatically applies to all selected records
```

### Integration with Other Components
The data correction component typically works with table components:

```tsx title="Component Integration Example"
// Pass table selected data to correction component
const tableComp = app.getElement("pages.DataManagePage.Table1");
const dataCheckComp = app.getElement("pages.DataManagePage.DataCheck1");

// Get table selected rows
tableComp.subscribeEvent("selectionChange", (selectedRows) => {
  // Pass selected data to correction component
  dataCheckComp.correctedRowList.value = selectedRows;
});

// Refresh table after correction completion
dataCheckComp.subscribeEvent("afterSubmit", async () => {
  await tableComp.refresh();
});
```