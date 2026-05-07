---
slug: gantt-chart
title: "Gantt Chart Reference"
description: "Gantt Chart Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Gantt Chart"
---
# Gantt Chart
Gantt chart is a project progress and time management visualization component, implemented based on VTable Gantt chart library to provide intuitive display of task timelines. It handles task progress tracking, time dependency relationship display, and progress adjustment interactions, supporting drag-and-drop modifications, multi-time dimension switching, and real-time data updates. It is suitable for business scenarios such as project management, production planning, and resource scheduling.

The Gantt chart element has a hierarchical structure of Meta (components.Meta) → Type (components.GanttChart) → Instance. Developers can quickly create Gantt chart instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.GanttChartType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```text title="Recommended Directory Structure"
components/
└── ProjectGantt/
    ├── e.json
    └── config.ts
```

```json title="components/ProjectGantt/e.json"
{
  "type": "components.GanttChart",
  "title": "Project Gantt Chart",
  "config": {
    "requireElements": [
      {
        "type": "models.Meta",
        "name": "models.TaskModel"
      }
    ],
    "titleField": "taskName",
    "defaultViewType": "week", 
    "startTime": "startDate",
    "endTime": "endDate",
    "listShowFields": ["taskName", "assignee", "status"],
    "floatLayerFields": ["taskName", "progress", "assignee"],
    "dateDragable": true,
    "autoLoad": true,
    "toolbarBtns": [],
    "operateBtns": []
  }
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| titleField | string | Task title field name | - | Yes |
| defaultViewType | string | Default time view, options: day/week/month/quarter/year | week | No |
| startTime | string | Start time field name | - | Yes |
| endTime | string | End time field name | - | Yes |
| levelRelateField | string | Level relationship field name | - | No |
| orderRelateField | string | Sequential dependency relationship field name | - | No |
| progressField | string | Progress field name | - | No |
| listShowFields | string[] | Left list display fields | [] | No |
| floatLayerFields | string[] | Floating layer display fields | [] | No |
| dateDragable | boolean | Whether date can be adjusted by dragging | false | No |
| progressDragable | boolean | Whether progress can be adjusted by dragging | false | No |
| orderDragable | boolean | Whether order can be adjusted by dragging | false | No |
| autoLoad | boolean | Auto-load data when component mounts | false | No |
| toolbarBtns | ButtonProps[] | Toolbar button configuration | [] | No |
| operateBtns | ButtonProps[] | Operation column button configuration | [] | No |
| fieldConfig | object | Field configuration mapping | - | No |
| addScheduleAble | boolean | Whether to allow adding schedules | false | No |

## Variables
### displayRowList
Read-only multi-row data variable, storing all task data currently displayed in the Gantt chart.

**Type**: `RowList`

### activeRow
Read-only single-row data variable, storing the currently operated task data, updated after clicking a row or dragging.

**Type**: `RowData`

## Methods 
### call
Refresh Gantt chart data, reload and display data based on filter conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| qFilter | QFilter/string | Data filter conditions | - | No |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Call Refresh Method"
// Get Gantt chart component instance
const ganttChart = app.getElement('components.ProjectGantt');

// Refresh without conditions
await ganttChart.call();

// Refresh with conditions
await ganttChart.call("Q(status='In Progress')");

// Use QFilter object
const filter = app.getElement('components.TaskFilter').qFilter;
await ganttChart.call(filter);
```

### loadDataAndExpand
Load specified data into Gantt chart and expand display, not limited by original filter conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| rowDataList | RowList/Array | Data list to load | - | Yes |

#### Return Value
`Promise<void>`

#### Usage Example
```tsx title="Load Specified Data"
// Load specific task data
const taskData = [
  {
    id: 1,
    taskName: "Requirements Analysis",
    startDate: "2024-01-01",
    endDate: "2024-01-10",
    progress: 100
  },
  {
    id: 2, 
    taskName: "System Design",
    startDate: "2024-01-08",
    endDate: "2024-01-20",
    progress: 80
  }
];

await ganttChart.loadDataAndExpand(taskData);
```

### updateConfig
Update component configuration, automatically refresh display after configuration changes.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| compConfig | GanttComponentConfig | New component configuration | - | Yes |

#### Return Value
`Promise<void>`

### checkConfig
Check if current configuration is valid, verify if required fields are complete.

#### Return Value
`boolean` - Returns true if configuration is valid, otherwise false

### destroy
Destroy component instance, clean up resources and event listeners.

#### Return Value
`void`

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| next | object | Configuration update content | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
`void`

### publishEvent
Publish component event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| ex | object | Additional parameters | - | No |

#### Return Value
`Promise<void>`

### subscribeEvent
Subscribe to component event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| evtCb | function | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
`string` - Subscription ID

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| id | string | Subscription ID | - | Yes |

#### Return Value
`boolean`

### runCode
Execute code string, run in page context.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| code | string | Code string to execute | - | Yes |

#### Return Value
`any` - Code execution result

### getPermConfig
Get current component's permission configuration information.

#### Return Value
`object` - Permission configuration object

## Properties
### name
Component name identifier.

**Type**: `string`

### title
Component display title.

**Type**: `string`

### config
Component configuration object.

**Type**: `object`

### compType
Component type enumeration.

**Type**: `COMPONENT_TYPE`

### showTitle
Whether to show component title.

**Type**: `boolean`

### type
Component type string.

**Type**: `string`

### app
Application instance reference.

**Type**: `App`

### page
Page instance reference.

**Type**: `BasePage`

### store
Gantt chart data management storage.

**Type**: `GanttStore`

### ModelClass
Associated data model class.

**Type**: `class`

### fullName
Component's complete name identifier.

**Type**: `string`

### dataTypeList
Component's data type list, containing all variable definitions.

**Type**: `Array`

## Events
### afterClickRow
Triggered after clicking a Gantt chart row, including clicking the left list and right task bars.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowData | Clicked row data, passed through activeRow variable | - | Yes |

#### Usage Example
```tsx title="Listen to Row Click Event"
// Listen to event in page code
ganttChart.subscribeEvent('afterClickRow', (data) => {
  console.log('Clicked task:', ganttChart.activeRow.value);
  
  // Can perform other operations, such as opening detail modal
  const taskDetail = app.getElement('components.TaskDetailModal');
  taskDetail.call(ganttChart.activeRow.value);
});
```

### afterDragDate
Triggered after dragging to adjust task dates, task data is automatically saved to database.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | RowData | Row data after drag modification, passed through activeRow variable | - | Yes |

#### Usage Example
```tsx title="Listen to Drag Event"
// Listen to task time adjustment
ganttChart.subscribeEvent('afterDragDate', (data) => {
  const updatedTask = ganttChart.activeRow.value;
  console.log('Task time updated:', {
    taskName: updatedTask.taskName,
    newStartTime: updatedTask.startDate,
    newEndTime: updatedTask.endDate
  });
  
  // Send notification or sync to other components
  app.publishEvent('taskTimeUpdated', updatedTask);
 });
```

### Dynamic Button Events
Configured toolbar buttons and operation buttons automatically generate corresponding click events, with event names in the format `click` + camelCase button ID.

#### Usage Example
```tsx title="Listen to Button Click Events"
// Toolbar button configuration
{
  "toolbarBtns": [
    {
      "id": "export",
      "name": "Export"
    },
    {
      "id": "addTask",
      "name": "Add Task"
    }
  ]
}

// Listen to corresponding button events
ganttChart.subscribeEvent('clickExport', (data) => {
  console.log('Export button clicked', ganttChart.activeRow.value);
  // Execute export logic
});

ganttChart.subscribeEvent('clickAddTask', (data) => {
  console.log('Add task button clicked');
  // Open add task modal
});
```

## Advanced Features
### Toolbar and Operation Button Configuration
Gantt chart supports custom toolbar buttons and operation column buttons, allowing extension of specific business functions.

```json title="Button Configuration Example"
{
  "toolbarBtns": [
    {
      "id": "export",
      "name": "Export",
      "type": "primary",
      "beIncludeMore": false
    },
    {
      "id": "addTask", 
      "name": "Add Task",
      "type": "default"
    }
  ],
  "operateBtns": [
    {
      "id": "edit",
      "name": "Edit", 
      "filterList": ["status!=Completed"]
    },
    {
      "id": "delete",
      "name": "Delete",
      "type": "danger"
    }
  ]
}
```

### Hierarchical Tasks and Dependencies
Configure `levelRelateField` and `orderRelateField` to implement task hierarchical structure and dependency relationship display.

```json title="Hierarchical Dependency Configuration"
{
  "levelRelateField": "parentTaskId",
  "orderRelateField": "dependsOnTaskId",
  "listShowFields": ["taskName", "assignee", "status", "progress"]
}
```

### Time View Switching
Supports five time dimensions: day, week, month, quarter, and year, which can be dynamically switched through configuration or user operations.

```tsx title="Dynamic View Switching"
// Switch to month view
await ganttChart.updateConfig({
  ...ganttChart.config,
  defaultViewType: 'month'
});
```

### Progress Display and Dragging
Configure progress field to display task completion percentage in Gantt chart, supporting drag adjustment of progress.

```json title="Progress Configuration"
{
  "progressField": "completionRate",
  "progressDragable": true,
  "floatLayerFields": ["taskName", "completionRate", "assignee", "status"]
}
``` 