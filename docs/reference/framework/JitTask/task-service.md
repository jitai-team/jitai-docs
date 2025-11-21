---
sidebar_position: 4
slug: task-service
title: "Task Service Reference"
description: "Task Service Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Task Service"
---

# Task Service

Task Service is the core API service of the JitTask framework, responsible for task template management, task creation and execution, status control, and forced termination. The element has a hierarchical structure of Meta (services.Meta) → Type (services.NormalType) → Instance (services.TaskSvc). Developers can directly use the TaskSvc instance element.

Of course, developers can also create their own Type elements or modify the official services.NormalType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
Task Service, as a built-in instance element of the JitTask framework, can be directly obtained and used through `app.getElement()`:

```python title="Basic Usage Example"
# Get task service instance
taskSvc = app.getElement("services.TaskSvc")

# Get task template list
templates = taskSvc.getTaskTmplList("")

# Create scheduled task
result = taskSvc.createTimerTask(
    fullName="tasks.MyTask",
    startTime="2024-01-01 10:00:00",
    funcName="executeTask",
    taskType="tasks.NormalType",
    argDict={"param1": "value1"}
)
```

## Methods
### getTaskTmplList
Get all available task template lists in the system, supporting filtering by name.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| queryStr | Stext | str | Yes | Template name filter condition, empty string returns all templates |

#### Return Value
JitList type, containing task template information list, each item includes title, taskType, repeatType, fullName fields.

#### Usage Example
```python title="Get Task Template List"
taskSvc = app.getElement("services.TaskSvc")

# Get all task templates
all_templates = taskSvc.getTaskTmplList("")

# Filter task templates by name
filtered_templates = taskSvc.getTaskTmplList("Data Backup")

# Process returned results
for template in all_templates:
    print(f"Template name: {template['title']}")
    print(f"Task type: {template['taskType']}")
    print(f"Repeat type: {template['repeatType']}")
    print(f"Full path: {template['fullName']}")
```

### createTimerTask
Create a scheduled task, supporting specified execution time, function path, and parameters.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| fullName | Stext | str | Yes | Full path of task element |
| startTime | Datetime | datetime | Yes | Task start execution time |
| funcName | Stext | str | Yes | Function path to execute |
| taskType | Stext | str | Yes | Task type, such as tasks.NormalType |
| argDict | JitDict | dict | Yes | Parameter dictionary passed to execution function |

#### Return Value
JitDict type, containing task creation result information.

#### Usage Example
```python title="Create Scheduled Task"
from datetime import datetime, timedelta

taskSvc = app.getElement("services.TaskSvc")

# Create task to execute in 1 hour
future_time = datetime.now() + timedelta(hours=1)

result = taskSvc.createTimerTask(
    fullName="tasks.DataBackup",
    startTime=future_time.strftime("%Y-%m-%d %H:%M:%S"),
    funcName="services.BackupSvc.backupDatabase",
    taskType="tasks.NormalType",
    argDict={
        "database": "main_db",
        "backup_path": "/backup/",
        "compress": True
    }
)

print(f"Task creation result: {result}")
```

### forcedEnd
Manually force end specified task, will update task status and trigger subsequent processing.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| taskId | Stext | str | Yes | Task ID to end |

#### Return Value
JitDict type, operation result information.

#### Usage Example
```python title="Force End Task"
taskSvc = app.getElement("services.TaskSvc")

# Force end specified task
result = taskSvc.forcedEnd("task_uuid_12345")

print(f"Task force end result: {result}")
```

### saveDateFieldTask
Handle date field-based task save callback, automatically trigger task scheduling when date fields in model data change.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| rowObj | RowData | dict | Yes | Row object containing data change information |

#### Return Value
JitDict type, processing result information.

#### Usage Example
```python title="Date Field Task Save Callback"
# Usually used in model events
def onModelUpdate(rowObj):
    taskSvc = app.getElement("services.TaskSvc")
    
    # Handle date field task
    result = taskSvc.saveDateFieldTask(rowObj)
    
    return result
```

### deleteDateFieldTask
Handle date field-based task delete callback, clean up related tasks when associated model data is deleted.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| rowObj | RowData | dict | Yes | Row object containing deleted data information |

#### Return Value
JitDict type, processing result information.

#### Usage Example
```python title="Date Field Task Delete Callback"
# Usually used in model events
def onModelDelete(rowObj):
    taskSvc = app.getElement("services.TaskSvc")
    
    # Clean up related tasks
    result = taskSvc.deleteDateFieldTask(rowObj)
    
    return result
```

## Attributes
Task Service inherits from services.NormalType, no specific public attributes.

## Advanced Features
### Task Lifecycle Management
Task Service supports complete task lifecycle management, including creation, execution, monitoring, and termination:

```python title="Task Lifecycle Management"
taskSvc = app.getElement("services.TaskSvc")

# 1. Get available templates
templates = taskSvc.getTaskTmplList("")

# 2. Create task based on template
if templates:
    template = templates[0]
    result = taskSvc.createTimerTask(
        fullName=template['fullName'],
        startTime="2024-12-01 09:00:00",
        funcName="services.BusinessSvc.processData",
        taskType=template['taskType'],
        argDict={"batch_size": 100}
    )
    
    # 3. Force terminate task if needed
    # taskSvc.forcedEnd("task_id")
```

### Model Event Integration
Task Service is deeply integrated with model events, supporting data change-driven task scheduling:

```python title="Model Event Integration"
# Used in model lifecycle functions
def afterSave(self, triggerEvent=1):
    """Trigger task service after model save"""
    taskSvc = app.getElement("services.TaskSvc")
    
    # Construct row object
    rowObj = {
        'postData': self,  # Updated data
        'prevData': self._original_data  # Pre-update data (needs to be maintained manually)
    }
    
    # Trigger date field task processing
    taskSvc.saveDateFieldTask(rowObj)

def afterDelete(self, triggerEvent=1):
    """Clean up related tasks after model delete"""
    taskSvc = app.getElement("services.TaskSvc")
    
    rowObj = {
        'prevData': self  # Deleted data
    }
    
    # Clean up related tasks
    taskSvc.deleteDateFieldTask(rowObj)
```

### Batch Task Management
Support batch creation and management of multiple related tasks:

```python title="Batch Task Management"
taskSvc = app.getElement("services.TaskSvc")

# Batch create a group of related tasks
task_configs = [
    {
        "fullName": "tasks.DataSync",
        "startTime": "2024-12-01 01:00:00",
        "funcName": "services.SyncSvc.syncUserData",
        "taskType": "tasks.NormalType",
        "argDict": {"table": "users"}
    },
    {
        "fullName": "tasks.DataSync", 
        "startTime": "2024-12-01 02:00:00",
        "funcName": "services.SyncSvc.syncOrderData",
        "taskType": "tasks.NormalType",
        "argDict": {"table": "orders"}
    }
]

# Batch create tasks
results = []
for config in task_configs:
    result = taskSvc.createTimerTask(**config)
    results.append(result)

print(f"Batch created {len(results)} tasks")
```