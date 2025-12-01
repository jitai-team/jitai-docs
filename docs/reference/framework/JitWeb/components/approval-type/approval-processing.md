---
slug: approval-workflowing
title: "Approval Processing Reference"
description: "Approval Processing Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Approval Processing"
---
# Approval Processing

Approval Processing is the core operation component for workflow approval tasks, implemented based on workflow engine for handling, viewing, and status management of approval tasks. It is responsible for loading pending tasks of specified workflows, displaying approval history records, and handling user approval operations, supporting adaptive rendering for both mobile and PC platforms.

The Approval Processing element has a hierarchical structure of Meta (components.Meta) → Type (components.TaskHandle) → Instance. Developers can quickly create approval processing instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.TaskHandleType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```json title="Basic Approval Processing Configuration"
{
    "fullName": "components.TaskHandle",
    "type": "components.TaskHandle",
    "name": "TaskHandle1",
    "title": "Approval Processing",
    "config": {
        "requireElements": [
            {
                "name": "ApplyModel",
                "title": "Application Data Model",
                "type": "models.NormalType"
            }
        ],
        "workflowName": "LeaveApproval",
        "isShowHistory": true,
        "isShowAllHistory": false
    },
    "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| workflowName | String | Yes | "" | Associated workflow name, specifies the approval process to handle |
| isShowHistory | Boolean | No | true | Whether to display approval history panel |
| isShowAllHistory | Boolean | No | true | Whether to display complete history records, when false only shows key nodes |
| requireElements | Array | Yes | [] | Associated data model configuration, used to get business data related to approval |

## Variables
### instanceId
**Type**: `Numeric`  
**Access**: Read-only  
**Description**: Unique identifier of current approval process instance, used for tracking and managing approval status.

```typescript title="Get Approval Process Instance ID"
// Access in page code
const instanceId = this.TaskHandle1.instanceId.value;
console.log('Current approval instance ID:', instanceId);
```

### formData
**Type**: `RowData<T>`  
**Access**: Read-write  
**Generic**: Associated model type  
**Description**: Form data model associated with approval, containing business data records to be approved. When this variable value changes, the component automatically reloads corresponding approval tasks.

```typescript title="Operate Form Data"
// Set form data
this.TaskHandle1.formData.value = {
    id: 1,
    applyUserId: "user123",
    leaveType: "Annual Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-17"
};

// Listen to data changes
this.TaskHandle1.formData.onValueChange(() => {
    console.log('Form data updated:', this.TaskHandle1.formData.value);
});
```

## Methods
### call
**Description**: Refresh component data, reload latest status and data of current approval task.

#### Return Value
**Type**: `Promise<void>`

#### Usage Example
```typescript title="Refresh Approval Data"
// Manually refresh approval component
await this.TaskHandle1.call();

// Refresh in button click event
async function onRefreshClick() {
    try {
        await this.TaskHandle1.call();
        console.log('Approval data refresh successful');
    } catch (error) {
        console.error('Refresh failed:', error);
    }
}
```

### publishEvent
**Description**: Publish component events, used to trigger custom event notifications.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| name | String | Yes | - | Event name |
| ex | Object | No | - | Additional event data |

#### Return Value
**Type**: `Promise<void>`

#### Usage Example
```typescript title="Publish Custom Event"
// Publish custom event
await this.TaskHandle1.publishEvent('customEvent', {
    message: 'Custom processing completed',
    timestamp: Date.now()
});
```

### subscribeEvent
**Description**: Subscribe to component events, listen for specified event triggers.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| name | String | Yes | - | Event name to subscribe to |
| evtCb | Function | Yes | - | Event callback function |
| unSubscribeExist | Boolean | No | true | Whether to cancel existing subscriptions |

#### Return Value
**Type**: `String` - Subscription ID, used for subsequent unsubscription

#### Usage Example
```typescript title="Subscribe to Component Events"
// Subscribe to approval processing completion event
const subscriptionId = this.TaskHandle1.subscribeEvent('afterExecute', (data) => {
    console.log('Received approval processing event:', data);
});
```

### unSubscribeEvent
**Description**: Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| id | String | Yes | - | Subscription ID |

#### Return Value
**Type**: `Boolean` - Whether unsubscription was successful

#### Usage Example
```typescript title="Cancel Event Subscription"
// Cancel previous subscription
this.TaskHandle1.unSubscribeEvent(subscriptionId);
```

### setConfig
**Description**: Dynamically set component configuration.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| next | Object | Yes | - | New configuration object |
| clean | Boolean | No | false | Whether to completely replace configuration (true) or merge configuration (false) |

#### Usage Example
```typescript title="Dynamically Update Configuration"
// Merge update configuration
this.TaskHandle1.setConfig({
    workflowName: 'NewWorkflow',
    isShowHistory: false
});

// Completely replace configuration
this.TaskHandle1.setConfig({
    requireElements: [/* new configuration */],
    workflowName: 'CompleteNewWorkflow'
}, true);
```

### runCode
**Description**: Execute JavaScript code in page context.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| code | String | Yes | - | JavaScript code string to execute |

#### Return Value
**Type**: `Any` - Code execution result

#### Usage Example
```typescript title="Execute Dynamic Code"
// Execute simple code
const result = this.TaskHandle1.runCode('return this.somePageVariable + 1');

// Execute complex logic
this.TaskHandle1.runCode(`
    if (this.currentUser.role === 'admin') {
        this.showAdminPanel();
    }
`);
```

### getPermConfig
**Description**: Get component permission configuration information.

#### Return Value
**Type**: `Object | undefined` - Permission configuration object, returns undefined if no permission restrictions

#### Usage Example
```typescript title="Check Component Permissions"
// Get permission configuration
const permConfig = this.TaskHandle1.getPermConfig();
if (permConfig) {
    console.log('Component permission configuration:', permConfig);
    // Adjust component behavior based on permission configuration
} else {
    console.log('Component has no permission restrictions');
}
```

## Attributes
### taskRowData
**Type**: `ITaskDataProp`  
**Access**: Read-only  
**Description**: Complete data object of current approval task, containing task node information, business data, and workflow status.

```typescript title="Access Task Data"
const taskData = this.TaskHandle1.taskRowData;
console.log('Task node ID:', taskData.nodeId);
console.log('Workflow name:', taskData.workflowName);
console.log('Task type:', taskData.taskType);
console.log('Business data:', taskData.rowData);
```

### taskId
**Type**: `String | Number`  
**Access**: Read-only  
**Description**: Unique identifier of current approval task.

### loading
**Type**: `Numeric`  
**Access**: Read-only  
**Description**: Component loading status identifier, value 1 indicates loading data, value 0 indicates loading completed.

```typescript title="Check Loading Status"
// Listen to loading status changes
this.TaskHandle1.loading.onValueChange(() => {
    if (this.TaskHandle1.loading.value === 1) {
        console.log('Loading approval data...');
    } else {
        console.log('Approval data loading completed');
    }
});
```

### compType
**Type**: `COMPONENT_TYPE`  
**Access**: Read-only  
**Description**: Component type identifier, identifies the classification type of current component.

### type
**Type**: `String`  
**Access**: Read-only  
**Description**: Component element type identifier, value is "components.TaskHandle".

### fullName
**Type**: `String`  
**Access**: Read-only  
**Description**: Complete element identifier name of component.

### dataTypeList
**Type**: `Array`  
**Access**: Read-only  
**Description**: Component variable type definition list, containing configuration information of all component variables.

### name
**Type**: `String`  
**Access**: Read-only  
**Description**: Unique name identifier of component instance.

### title
**Type**: `String`  
**Access**: Read-only  
**Description**: Display title of component.

### config
**Type**: `ITaskHandleFormConfig`  
**Access**: Read-only  
**Description**: Component configuration object, containing workflow name and history display options.

### showTitle
**Type**: `Boolean`  
**Access**: Read-only  
**Description**: Whether to display component title.

### app
**Type**: `App`  
**Access**: Read-only  
**Description**: Reference to current application instance.

### page
**Type**: `BasePage`  
**Access**: Read-only  
**Description**: Reference to current page instance.

## Events
### afterExecute
**Trigger Timing**: After user completes approval processing operation  
**Event Data**: `formData` - Form data after approval processing  
**Description**: Triggered when user clicks approve, reject, or other approval operation buttons and completes processing.

```typescript title="Listen to Approval Processing Completion"
this.TaskHandle1.subscribeEvent('afterExecute', (data) => {
    console.log('Approval processing completed:', data.formData);
    // Can execute subsequent operations here, such as page navigation, data updates, etc.
});
```

### afterCall
**Trigger Timing**: After calling call method to refresh data  
**Event Data**: `formData` - Form data after refresh  
**Description**: Triggered when calling component's call method completes data refresh.

```typescript title="Listen to Data Refresh Completion"
this.TaskHandle1.subscribeEvent('afterCall', (data) => {
    console.log('Data refresh completed:', data.formData);
    // Can update related UI or execute other logic here
});
```