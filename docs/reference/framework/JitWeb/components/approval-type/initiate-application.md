---
slug: initiate-application
title: "Initiate Application Reference"
sidebar_label: "Initiate Application"
---
# Initiate Application

Initiate Application is the entry component for approval processes, implemented based on form data models to provide application initiation and management functionality. It is responsible for collecting user-filled form data, starting approval processes, and displaying approval history records, supporting data refresh and event notification mechanisms.

The Initiate Application element has a hierarchical structure of Meta (components.Meta) → Type (components.Apply) → Instance. Developers can quickly create initiate application instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.ApplyType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```json title="Initiate Application Component in Page Configuration"
{
  "fullName": "components.Apply",
  "type": "components.Apply", 
  "name": "Apply32",
  "title": "Initiate Application 32",
  "config": {
    "requireElements": [
      {
        "name": "models.LeaveRequestModel",
        "title": "Leave Request Model",
        "type": "models.NormalType"
      }
    ],
    "workflowName": "Leave Approval Process",
    "isShowHistory": true
  },
  "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| requireElements | Array | Yes | - | Associated data model configuration, specifies source model for form data |
| workflowName | String | No | "" | Approval process name, used to specify the approval process to start |
| isShowHistory | Boolean | No | true | Whether to display approval history panel |

**requireElements Configuration Items:**

| Property Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Complete name of data model, such as "models.LeaveRequestModel" |
| title | String | Yes | Display title of model |
| type | String | Yes | Fixed value "models.NormalType" |

## Variables
The component automatically creates the following variables that can be used directly in page logic:

### applyInstanceId
- **Type:** Numeric
- **Access:** Read-only
- **Description:** Instance ID of current approval process, used to track approval status

### applyFormKey
- **Type:** RowData
- **Access:** Read-write
- **Description:** Form data object, containing all application information filled by user
- **Generic:** Bound to configured requireElements model

### refreshFlag
- **Type:** Numeric
- **Access:** Read-write
- **Description:** Refresh flag, used to trigger component re-rendering

## Methods
### call
Refresh component data, supports reloading form data or setting new data values.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| v | RowData | No | Single row data to set, reloads from database when empty |

#### Return Value
No return value

#### Usage Example
```typescript title="Refresh Component Data"
// Reload data from database
apply.call();

// Set new form data
const newData = {
  id: 1,
  requestType: "Annual Leave",
  startDate: "2024-01-15",
  endDate: "2024-01-20"
};
apply.call(newData);
```

### setConfig
Dynamically set component configuration, supports incremental updates or complete configuration replacement.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Object | Yes | New configuration object |
| clean | Boolean | No | Whether to completely replace configuration, default false (incremental update) |

#### Return Value
No return value

#### Usage Example
```typescript title="Dynamically Configure Component"
// Incremental update configuration
apply.setConfig({
  workflowName: "New Approval Process",
  isShowHistory: false
});

// Complete configuration replacement
apply.setConfig({
  requireElements: [{
    name: "models.NewModel",
    title: "New Model",
    type: "models.NormalType"
  }],
  workflowName: "Completely New Process"
}, true);
```

### publishEvent
Send component event notifications, trigger bound event handlers.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name |
| ex | Object | No | Additional event data |

#### Return Value
Promise\<void>

### subscribeEvent
Subscribe to component events, register event handling callback functions.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | String | Yes | Event name to subscribe to |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | Boolean | No | Whether to cancel existing subscriptions, default true |

#### Return Value
String - Subscription handle ID

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| id | String | Yes | Subscription handle ID |

#### Return Value
Boolean - Cancellation result

### newVariable
Create new data type variable instance.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| varConfig | DataTypeConfig | Yes | Variable configuration object |

#### Return Value
BaseDataType - Data type instance

### destroy
Destroy component, release related resources.

### runCode
Execute code string, run in page context.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| code | String | Yes | Code string to execute |

#### Return Value
Any - Code execution result

## Attributes
### name
- **Type:** String
- **Access:** Read-only  
- **Description:** Component instance name

### title
- **Type:** String
- **Access:** Read-only
- **Description:** Component display title

### fullName
- **Type:** String
- **Access:** Read-only
- **Description:** Complete component name, such as "components.Apply"

### type
- **Type:** String  
- **Access:** Read-only
- **Description:** Component type identifier, value is "components.Apply"

### config
- **Type:** Object
- **Access:** Read-write
- **Description:** Component configuration object, containing requireElements and other configuration information

### compType
- **Type:** String
- **Access:** Read-only
- **Description:** Component type enumeration value

### showTitle
- **Type:** Boolean
- **Access:** Read-only
- **Description:** Whether to display component title

### dataTypeList
- **Type:** Array
- **Access:** Read-only
- **Description:** Component variable definition list, containing all automatically created variable configurations

### app
- **Type:** App
- **Access:** Read-only
- **Description:** Current application instance reference

### page
- **Type:** BasePage
- **Access:** Read-only
- **Description:** Current page instance reference

## Events
### afterExecute
Event triggered after approval processing completion, called after user submits application.

#### Parameter Details
| Parameter Name | Type | Description |
|--------|------|------|
| formData | RowData | Submitted form data object |

#### Usage Example
```typescript title="Handle Application Submission Event"
// Subscribe to post-processing event
const handleId = apply.subscribeEvent('afterExecute', async (data) => {
  const formData = data.formData;
  console.log('Application submitted:', formData);
  
  // Show success notification
  notification.success({
    message: 'Application Submitted Successfully',
    description: 'Your application has entered the approval process'
  });
  
  // Navigate to application list page
  page.navigate('pages.RequestListPage');
});

// Manually trigger event (usually called internally by component)
await apply.publishEvent('afterExecute', { 
  formData: apply.applyFormKey.value 
});
```

### afterCall
Event triggered after component refresh completion, executed after calling call method.

#### Parameter Details
| Parameter Name | Type | Description |
|--------|------|------|
| formData | RowData | Form data object after refresh |

#### Usage Example
```typescript title="Handle Data Refresh Event"  
apply.subscribeEvent('afterCall', async (data) => {
  const formData = data.formData;
  console.log('Data refreshed:', formData);
  
  // Update related component status
  if (formData.status === 'draft') {
    submitButton.setEnabled(true);
  }
});
```