---
slug: batch-edit-form
---
# Batch Edit Form
The batch edit form is a form component used for unified editing operations on multiple data records, implementing batch data modification capabilities based on data models and field configurations. It handles form data management, field edit control, and batch submission processing, supporting flexible field configuration, layout customization, and permission control.

The batch edit form element has a hierarchical structure of Meta (components.Meta) → Type (components.EditForm) → Instance. Developers can quickly create batch edit form instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.EditFormType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```typescript title="Basic Batch Edit Form Configuration"
{
  "fullName": "components.EditForm",
  "type": "components.EditForm", 
  "name": "EditForm24",
  "title": "Batch Edit Form",
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
    "topLayoutJustify": "flex-start",
    "bottomLayoutJustify": "center",
    "componentDict": {
      "custName": {
        "key": "custName",
        "type": "field",
        "name": "custName", 
        "title": "Customer Name",
        "visibleMode": "shown",
        "editMode": "editable",
        "showTitle": true,
        "isRequired": false,
        "descDisplayMode": "bottom",
        "index": 1
      },
      "phone": {
        "key": "phone",
        "type": "field",
        "name": "phone",
        "title": "Phone",
        "visibleMode": "shown", 
        "editMode": "editable",
        "showTitle": true,
        "isRequired": false,
        "descDisplayMode": "bottom",
        "index": 2
      }
    }
  }
}
```

### Configuration Properties
| Property Name | Type | Default Value | Description | Example Value |
|---------------|------|---------------|-------------|---------------|
| requireElements | RequireElement[] | [] | Dependent data model configuration | See example above |
| topLayoutJustify | FormLayoutJustifyEnum | "flex-start" | Top layout alignment | "flex-start", "center", "flex-end" |
| bottomLayoutJustify | FormLayoutJustifyEnum | "center" | Bottom layout alignment | "flex-start", "center", "flex-end" |
| layoutPercent | number | - | Layout percentage | 50 |
| componentDict | Record&lt;string, IEditFormComponentDefine&gt; | \{\} | Field component configuration dictionary | See example above |
| layoutDict | Record&lt;string, IFormLayoutDefine&gt; | \{\} | Layout configuration dictionary | \{\} |
| ruleDict | Record&lt;string, IFormRuleDefine&gt; | \{\} | Rule configuration dictionary | \{\} |
| buttonRuleDict | Record&lt;string, Object&gt; | \{\} | Button rule configuration dictionary | \{\} |
| fillMode | EditFormFillModeEnum | - | Fill mode | "auto", "manual" |
| isHorizontalLayout | boolean | false | Whether to use horizontal layout | true, false |

#### Field Configuration Properties (IEditFormFieldDefine)
| Property Name | Type | Default Value | Description | Example Value |
|---------------|------|---------------|-------------|---------------|
| key | string | - | Field unique identifier | "custName" |
| name | string | - | Field name | "custName" |
| title | string | - | Field display title | "Customer Name" |
| type | "field" | "field" | Component type | "field" |
| index | number | - | Field sort index | 1 |
| showTitle | boolean | true | Whether to show title | true, false |
| isRequired | boolean | false | Whether required | true, false |
| visibleMode | FormFieldVISIBLEEnum | "shown" | Visibility mode | "shown", "hidden" |
| editMode | FormFieldModeEnum | "editable" | Edit mode | "editable", "readonly" |
| descDisplayMode | "bottom" \| "hover" | "bottom" | Description display mode | "bottom", "hover" |
| hasClickOutput | boolean | false | Whether to have click output event | true, false |
| hasChangeOutput | boolean | false | Whether to have value change output event | true, false |
| varConfig | IEditOtherConfigDefine | - | Variable configuration | \{inFormViewOnlyShowMode: 1\} |
| isManualAdd | boolean | false | Whether manually added | true, false |
| fuzzySearch | boolean | false | Whether to support fuzzy search | true, false |
| fuzzyFilter | string | - | Fuzzy filter condition | "name LIKE '%value%'" |
| hasScanCode | boolean | false | Whether to support scan code | true, false |
| isCameraOnly | boolean | false | Whether to support camera only | true, false |

## Variables
### formData
- **Type**: RowData
- **Description**: Form data object storing the current single row data being edited
- **Generic**: Based on the data model configured in requireElements

```typescript title="Access Form Data"
// Get form data
const formData = this.formData.value;

// Update form data
this.formData.update({
  custName: "New Customer Name",
  phone: "13800138000"
});

// Reset form data
this.formData.reset();

// Refresh form data
this.formData.refresh();
```

### editRowList
- **Type**: RowList  
- **Description**: List of multiple row data to be batch operated
- **Generic**: Based on the data model configured in requireElements

```typescript title="Operate Multiple Row Data"
// Set the data list to be edited
this.editRowList.value = [
  {id: 1, custName: "Customer 1", phone: "13800138001"},
  {id: 2, custName: "Customer 2", phone: "13800138002"}
];

// Get data list
const dataList = this.editRowList.value;

// Append data
this.editRowList.append({
  id: 3, custName: "Customer 3", phone: "13800138003"
});

// Reset data list
this.editRowList.reset();
```

## Methods
### call
Refresh component data, can pass in new data list or refresh existing data.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| dataList | RowList | No | Multiple row data to be batch operated | [\{id: 1, name: "test"\}] |

#### Return Value
No return value

#### Usage Example
```typescript title="Refresh Form Data"
// Refresh existing data
await this.EditForm24.call();

// Set new data list
await this.EditForm24.call([
  {id: 1, custName: "Customer 1", phone: "13800138001"},
  {id: 2, custName: "Customer 2", phone: "13800138002"}
]);

// Clear data list
await this.EditForm24.call(null);
```

### publishEvent
Publish component events, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| name | string | Yes | Event name | "afterSubmit" |
| ex | Record&lt;string, any&gt; | No | Additional data | \{success: true\} |

#### Return Value
Promise - Asynchronous operation, no return value

#### Usage Example
```typescript title="Publish Custom Events"
// Publish submit success event
await this.publishEvent("afterSubmit", {
  success: true,
  data: this.formData.value
});

// Publish field value change event
await this.publishEvent("change-custName", {
  oldValue: "Old Value",
  newValue: "New Value"
});
```

### subscribeEvent
Subscribe to component events, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| name | string | Yes | Event name | "afterSubmit" |
| evtCb | Function | Yes | Event callback function | (data) => \{\} |
| unSubscribeExist | boolean | No | Whether to unsubscribe existing events | true |

#### Return Value
string - Event handler ID

#### Usage Example
```typescript title="Subscribe to Form Events"
// Subscribe to after submit event
const handlerId = this.subscribeEvent("afterSubmit", async (data) => {
  console.log("Form submitted successfully:", data);
  // Handle post-submit logic
});

// Subscribe to field value change event
this.subscribeEvent("change-custName", (data) => {
  console.log("Customer name changed:", data);
});
```

### unSubscribeEvent
Unsubscribe from events, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| id | string | Yes | Event handler ID | "handler-id-123" |

#### Return Value
boolean

#### Usage Example
```typescript title="Unsubscribe from Events"
// Unsubscribe from specific event
const success = this.unSubscribeEvent(handlerId);
console.log("Unsubscribe result:", success);
```

### setConfig
Update component configuration, supports dynamic modification of form settings, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| next | Partial&lt;IEditFormConfig&gt; | Yes | Configuration object to update | \{topLayoutJustify: "center"\} |
| clean | boolean | No | Whether to completely replace configuration | false |

#### Return Value
No return value

#### Usage Example
```typescript title="Dynamic Configuration Update"
// Update layout configuration
this.setConfig({
  topLayoutJustify: "center",
  bottomLayoutJustify: "flex-end"
});

// Add new field configuration
this.setConfig({
  componentDict: {
    ...this.config.componentDict,
    newField: {
      key: "newField",
      type: "field",
      name: "newField",
      title: "New Field",
      visibleMode: "shown",
      editMode: "editable",
      showTitle: true,
      isRequired: false,
      descDisplayMode: "bottom",
      index: 10
    }
  }
});
```

### runCode
Execute custom JavaScript code, inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| code | string | Yes | JavaScript code string to execute | "return this.formData.value.custName" |

#### Return Value
any - Code execution result

#### Usage Example
```typescript title="Execute Custom Code"
// Get customer name from form
const custName = this.runCode("return this.formData.value.custName");
console.log("Customer name:", custName);

// Execute complex logic
const result = this.runCode(`
  const data = this.formData.value;
  return data.custName + ' - ' + data.phone;
`);
```

### getPermConfig
Get current component's permission configuration, inherited from BaseComponent.

#### Return Value
Object | undefined - Permission configuration object or undefined

#### Usage Example
```typescript title="Get Permission Configuration"
// Get permission configuration
const permConfig = this.getPermConfig();
if (permConfig) {
  console.log("Component permission configuration:", permConfig);
  // Adjust component behavior based on permission configuration
}
```

### destroy
Destroy component and clean up resources, inherited from BaseComponent.

#### Usage Example
```typescript title="Destroy Component"
// Automatically called when component is destroyed
this.destroy();
```

### getVariableList
Static method to get component variable list, used internally by framework.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| compConfig | Record&lt;string, any&gt; | Yes | Component configuration object | \{requireElements: [...]\} |

#### Return Value
Array - Variable configuration array

#### Usage Example
```typescript title="Get Variable List"
// Internal framework call
const variables = EditFormComponent.getVariableList(config);
console.log("Component variables:", variables);
```

### getFuncList
Static method to get component function list, used internally by framework.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| compConfig | Record&lt;string, any&gt; | Yes | Component configuration object | \{requireElements: [...]\} |

#### Return Value
Array - Function configuration array

#### Usage Example
```typescript title="Get Function List"
// Internal framework call
const functions = EditFormComponent.getFuncList(config);
console.log("Component functions:", functions);
```

### getEventList
Static method to get component event list, used internally by framework.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| compConfig | Record&lt;string, any&gt; | Yes | Component configuration object | \{requireElements: [...]\} |

#### Return Value
Array | null - Event configuration array or null

#### Usage Example
```typescript title="Get Event List"
// Internal framework call
const events = EditFormComponent.getEventList(config);
console.log("Component events:", events);
```

## Properties
### name
- **Type**: string
- **Description**: Component name, inherited from BaseComponent
- **Example**: "EditForm24"

### title
- **Type**: string  
- **Description**: Component title, inherited from BaseComponent
- **Example**: "Batch Edit Form"

### config
- **Type**: IEditFormConfig &amp; \{requireElements: requireElement[]\}
- **Description**: Component configuration object containing all configuration properties
- **Example**: See basic configuration example

### type
- **Type**: string
- **Description**: Component type identifier, inherited from BaseComponent
- **Example**: "components.EditForm"

### fullName
- **Type**: string
- **Description**: Component full name, inherited from BaseComponent  
- **Example**: "components.EditForm"

### app
- **Type**: App
- **Description**: Application instance object, inherited from BaseComponent
- **Read-only**: Yes

### page
- **Type**: BasePage
- **Description**: Page instance object, inherited from BaseComponent
- **Read-only**: Yes

### showTitle
- **Type**: boolean
- **Description**: Whether to show title, inherited from BaseComponent
- **Default Value**: false

### compType
- **Type**: COMPONENT_TYPE
- **Description**: Component type enumeration, inherited from BaseComponent

### dataTypeList
- **Type**: BaseDataType[]
- **Description**: Component variable definition list, inherited from BaseComponent
- **Read-only**: Yes

## Events
### afterCall
Event triggered after refresh.

**Data**: formData - Form data object

```typescript title="Listen to After Refresh Event"
this.subscribeEvent("afterCall", (data) => {
  console.log("Form refresh completed:", data.formData);
  // Handle post-refresh logic
});
```

### afterSubmit
Event triggered after form submission.

**Data**: formData - Form data object

```typescript title="Listen to After Submit Event" 
this.subscribeEvent("afterSubmit", (data) => {
  console.log("Form submitted successfully:", data.formData);
  // Handle submit success logic
});
```

### beforeSubmit
Event triggered before form submission.

**Data**: formData - Form data object

```typescript title="Listen to Before Submit Event"
this.subscribeEvent("beforeSubmit", (data) => {
  console.log("About to submit form:", data.formData);
  // Pre-submit validation logic
  return true; // Return false to prevent submission
});
```

### Field Click Event
Event triggered when clicking a field that has hasClickOutput configured as true.

**Event Name Format**: `click-{fieldName}`
**Data**: formData - Form data object

```typescript title="Listen to Field Click Event"
this.subscribeEvent("click-custName", (data) => {
  console.log("Customer name field clicked:", data.formData);
});
```

### Field Value Change Event
Event triggered when a field value changes and hasChangeOutput is configured as true.

**Event Name Format**: `change-{fieldName}`  
**Data**: formData - Form data object

```typescript title="Listen to Field Value Change Event"
this.subscribeEvent("change-phone", (data) => {
  console.log("Phone field value changed:", data.formData);
});
```

## Advanced Features
### Field Permission Control
```typescript title="Field Permission Configuration"
{
  "componentDict": {
    "custName": {
      "editMode": "readonly", // Read-only mode
      "visibleMode": "hidden" // Hide field
    }
  }
}
```

### Related Field Configuration
```typescript title="Related Field Settings"
{
  "componentDict": {
    "relatedField": {
      "varConfig": {
        "filter": "status = 'active'",
        "sort": ["name", "asc"],
        "relateBtn": {
          "checked": true,
          "config": {
            "title": "Select Related Data"
          }
        }
      }
    }
  }
}
```

### Dynamic Field Control
```typescript title="Dynamic Display Control"
// Dynamically show fields based on conditions
if (this.formData.custType === "VIP") {
  this.config.componentDict.vipLevel.visibleMode = "shown";
} else {
  this.config.componentDict.vipLevel.visibleMode = "hidden";
}

// Dynamically set field as required
this.config.componentDict.phone.isRequired = true;
```

### Batch Data Processing
```typescript title="Batch Operation Example"
// Batch set same values
const updateData = {
  status: "active",
  updateTime: new Date().toISOString()
};

// Apply same modifications to all selected data
this.editRowList.value.forEach(row => {
  Object.assign(row, updateData);
});

// Trigger batch save
await this.publishEvent("beforeSubmit");
```