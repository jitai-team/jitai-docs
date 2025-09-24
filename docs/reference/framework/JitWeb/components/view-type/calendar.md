---
slug: calendar
---
# Calendar
Calendar is a view component for displaying and managing time-related data, based on Ant Design Calendar to implement schedule management, event management, and time planning functionality. It handles data source binding, schedule creation and editing, and interactive event processing, supporting drag operations, custom rendering, and multiple view modes.

The Calendar element has a hierarchical structure of Meta (components.Meta) → Type (components.Calendar) → Instance. Developers can quickly create Calendar instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.CalendarType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```typescript title="Basic Calendar Configuration"
{
  "name": "calendar1",
  "title": "Project Calendar",
  "fullName": "components.Calendar",
  "config": {
    "requireElements": [
      {
        "title": "Project Data Model",
        "type": "models.Meta",
        "name": "models.ProjectModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "startTime": ["startDate"],
    "endTime": ["endDate"],
    "title": ["projectName"],
    "scheduleType": ["status"],
    "createSchedule": true,
    "dragSchedule": true,
    "defaultRender": true
  }
}
```

### Configuration Properties
| Property Name | Type | Default Value | Description | Example |
|---------------|------|---------------|-------------|---------|
| requireElements | Array | [] | Associated data model configuration | See example above |
| startTime | Array | [] | Start time field mapping | ["startDate"] |
| endTime | Array | [] | End time field mapping | ["endDate"] |
| title | Array | [] | Title field mapping | ["projectName"] |
| scheduleType | Array | [] | Schedule type field mapping | ["status"] |
| toolbarBtn | Array | [] | Toolbar button configuration | [] |
| columnBtn | Array | [] | Column button configuration | [] |
| createSchedule | Boolean | true | Whether to allow schedule creation | true |
| dragSchedule | Boolean | true | Whether to allow schedule dragging | true |
| defaultRender | Boolean | true | Whether to use default rendering | true |

## Variables
### activeRow
Currently selected row data, containing schedule information that the user clicked or operated on.

```typescript title="activeRow Usage Example"
// Get current selected row data
const currentRow = calendar1.activeRow;
console.log(currentRow.getValue());

// Listen for row data changes
calendar1.activeRow.subscribeEvent('change', (data) => {
  console.log('Selected row data changed:', data);
});
```

## Methods
### call
Refresh calendar data, reload from data source and update display.

#### Usage Example
```typescript title="Refresh Calendar Data"
// Refresh calendar
await calendar1.call();

// Use in event handling
async function handleDataUpdate() {
  await calendar1.call();
  console.log('Calendar data refreshed');
}
```

### publishEvent
Send component event for inter-component communication.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example |
|----------------|------|----------|-------------|---------|
| name | String | Yes | Event name | "clickRow" |
| ex | Object | No | Additional data | `{customData: "value"}` |

#### Return Value
`Promise<void>` - Async operation completion

#### Usage Example
```typescript title="Send Component Event"
// Send custom event
await calendar1.publishEvent('customEvent', {
  message: 'Custom data',
  timestamp: new Date()
});
```

### subscribeEvent
Subscribe to component event, listen for specific event triggers.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example |
|----------------|------|----------|-------------|---------|
| name | String | Yes | Event name | "clickRow" |
| evtCb | Function | Yes | Callback function | `(data) => {...}` |
| unSubscribeExist | Boolean | No | Whether to cancel existing subscription | true |

#### Return Value
String - Event handler ID

#### Usage Example
```typescript title="Subscribe to Component Event"
// Subscribe to row click event
const handlerId = calendar1.subscribeEvent('clickRow', (data) => {
  console.log('User clicked row:', data);
});

// Subscribe to schedule creation event
calendar1.subscribeEvent('afterCreateSchedule', async (data) => {
  console.log('New schedule created:', data);
  // Execute follow-up processing logic
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example |
|----------------|------|----------|-------------|---------|
| id | String | Yes | Event handler ID | "handler123" |

#### Usage Example
```typescript title="Cancel Event Subscription"
// Cancel specific event subscription
calendar1.unSubscribeEvent(handlerId);
```

### setConfig
Set component configuration, dynamically update component behavior.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example |
|----------------|------|----------|-------------|---------|
| next | Object | Yes | New configuration object | `{createSchedule: false}` |
| clean | Boolean | No | Whether to completely replace configuration | false |

#### Usage Example
```typescript title="Dynamic Component Configuration"
// Disable schedule creation functionality
calendar1.setConfig({
  createSchedule: false,
  dragSchedule: false
});

// Update data source configuration
calendar1.setConfig({
  requireElements: [{
    title: "New Data Model",
    type: "models.Meta", 
    name: "models.NewModel"
  }]
});
```

### destroy
Destroy component instance, clean up resources and event listeners.

#### Usage Example
```typescript title="Destroy Component"
// Component destruction
calendar1.destroy();
```

### runCode
Execute custom code snippet, run in page context.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example |
|----------------|------|----------|-------------|---------|
| code | String | Yes | Code string to execute | "self.activeRow.getValue()" |

#### Return Value
Any - Code execution result

#### Usage Example
```typescript title="Execute Custom Code"
// Execute code to get data
const result = calendar1.runCode('self.activeRow.getValue()');
console.log(result);
```

### getPermConfig
Get current component's permission configuration.

#### Return Value
`Record<string, any> | undefined` - Permission configuration object

#### Usage Example
```typescript title="Get Permission Configuration"
// Get component permission configuration
const permConfig = calendar1.getPermConfig();
if (permConfig) {
  console.log('Component permissions:', permConfig);
}
```

## Attributes
### Basic Attributes
| Attribute Name | Type | Description | Example Value |
|----------------|------|-------------|---------------|
| name | String | Component name, used to identify component instance | "calendar1" |
| title | String | Component title, name displayed on interface | "Project Calendar" |
| type | String | Component type identifier | "components.Calendar" |
| fullName | String | Component's complete name identifier | "components.Calendar" |
| showTitle | Boolean | Whether to display component title | true |
| compType | Enum | Component type enum value | Component type enum value |

```typescript title="Access Basic Attributes Example"
// Get component basic information
console.log('Component name: ' + calendar1.name + ', title: ' + calendar1.title);
console.log('Type: ' + calendar1.type + ', show title: ' + calendar1.showTitle);
```

### config
Component configuration object, containing all configuration parameters.

```typescript title="Access Component Configuration"
const config = calendar1.config;
console.log(config.createSchedule); // true
console.log(config.startTime); // ["startDate"]

// Dynamic configuration check
if (config.dragSchedule) {
  console.log('Drag functionality supported');
}
```

### app
Associated application instance, providing application-level functionality.

```typescript title="Use Application Instance"
const app = calendar1.app;
// Get application element
const userModel = await app.getElement('models.UserModel');
```

### page
Associated page instance, providing page-level functionality.

```typescript title="Use Page Instance"
const page = calendar1.page;
// Access other components on the page
const otherComponent = page.getComponent('otherComponentName');
```

## Events
### clickRow
Row click event, triggered when user clicks on a row in the calendar.

**Event Data**: activeRow - Currently clicked row data

```typescript title="Handle Row Click Event"
calendar1.subscribeEvent('clickRow', (data) => {
  console.log('Clicked row data:', data.activeRow);
  // Handle row click logic
});
```

### afterCreateSchedule
After creating schedule event, triggered when user creates a new schedule.

**Event Data**: activeRow - Newly created schedule data

```typescript title="Handle Schedule Creation Event"
calendar1.subscribeEvent('afterCreateSchedule', (data) => {
  console.log('New schedule created:', data.activeRow);
  // Send notification or update related data
});
```

### afterDragSchedule
After dragging schedule event, triggered when user drags and moves a schedule.

**Event Data**: activeRow - Schedule data after dragging

```typescript title="Handle Schedule Drag Event"
calendar1.subscribeEvent('afterDragSchedule', (data) => {
  console.log('Schedule after dragging:', data.activeRow);
  // Save new time arrangement
});
```