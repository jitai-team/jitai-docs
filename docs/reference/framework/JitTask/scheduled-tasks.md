---
sidebar_position: 1
slug: scheduled-tasks
---

# Scheduled Tasks

Scheduled Tasks are core elements in the JitTask framework used to implement periodic business automation, responsible for task execution logic processing, next execution time calculation, and task status management.

The Scheduled Task element has a hierarchical structure of Meta (tasks.Meta) → Type (tasks.NormalType) → Instance. Developers can quickly create scheduled task instance elements through visual development tools.

Of course, developers can also create their own Type elements or modify the official tasks.NormalType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```title="Recommended Directory Structure"
tasks/
└── TestTimeTasks/
    ├── e.json
    ├── inner.py
    └── __init__.py
```

#### e.json File
```json title="tasks/TestTimeTasks/e.json"
{
  "type": "tasks.NormalType",
  "funcType": "Inner",
  "title": "Test Scheduled Task",
  "timerCfg": {
    "startTime": "2024-01-01 09:00:00",
    "endTime": "2024-12-31 18:00:00",
    "repeat": {
      "repeatType": "day",
      "period": 1
    },
    "skipHoliday": 1
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### Business Logic Code
```python title="tasks/TestTimeTasks/inner.py"
from datatypes.Meta import datatypes
from jit.commons.utils.logger import log

def customFunc():
    """Scheduled task execution function"""
    log.info("Scheduled task started")
    
    # Get user model for data operations
    UserModel = app.getElement("models.UserModel")
    users = UserModel.query(filter="Q(status='active')")
    
    for user in users["rowDatas"]:
        # Execute business logic
        log.info(f"Processing user: {user.name.value}")
    
    log.info("Scheduled task completed")
    return {"status": "success", "processedCount": len(users["rowDatas"])}
```

#### Usage Example
```python title="Get and Use Scheduled Task Element"
# Get scheduled task element
task_element = app.getElement("tasks.TestTimeTasks")

# Create task instance
from tasks.Meta import Timer
timer = Timer({
    "startTime": "2024-01-01 09:00:00",
    "repeat": {"repeatType": "day", "period": 1}
})

# Calculate next execution time
next_time = timer.nextTime()
print(f"Next execution time: {next_time}")
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Required | Description | Example Value |
|--------|------|------|------|--------|
| type | string | Yes | Element type, fixed as "tasks.NormalType" | "tasks.NormalType" |
| funcType | string | Yes | Function type: "Inner" (internal function) or "Global" (global function) | "Inner" |
| title | string | Yes | Task title | "Data Sync Task" |
| timerCfg | object | Yes | Time configuration object | See timerCfg configuration |
| enable | number | No | Whether to enable: 1 enable, 0 disable | 1 |
| backendBundleEntry | string | Yes | Backend entry, fixed as "." | "." |

### timerCfg Configuration
| Parameter Name | Type | Required | Description | Example Value |
|--------|------|------|------|--------|
| startTime | string | Yes | Start time | "2024-01-01 09:00:00" |
| endTime | string | No | End time | "2024-12-31 18:00:00" |
| repeat | object | Yes | Repeat configuration object | See repeat configuration |
| skipHoliday | number | No | Whether to skip holidays: 1 skip, 0 don't skip | 1 |

### repeat Configuration
| Parameter Name | Type | Required | Description | Optional Values |
|--------|------|------|------|--------|
| repeatType | string | Yes | Repeat type | "year","month","week","day","hour","minute","normal" |
| period | number | Yes | Repeat period | Positive integer |

## Methods
### handle
Core method for task execution, handling specific business logic.

#### Parameter Details
| Parameter Name | JitAI Type | Python Type | Required | Description |
|--------|-----------|-------------|------|------|
| task | RowData | object | Yes | Task data object |

#### Return Value
- **Type**: any
- **Description**: Task execution result, can be dictionary, string, or other data types

#### Usage Example
```python title="Override handle Method"
from tasks.Meta import BaseTask

class CustomTask(BaseTask):
    def handle(self, task):
        # Get task parameters
        params = task.argDict.value or {}
        
        # Execute business logic
        result = self.processData(params)
        
        return result
```

### getNextRunTime
Calculate next execution time for task.

#### Parameter Details
| Parameter Name | JitAI Type | Python Type | Required | Description |
|--------|-----------|-------------|------|------|
| task | RowData | object | Yes | Task data object |
| now | Datetime | datetime | No | Current time, used for testing |

#### Return Value
- **Type**: Arrow object or None
- **Description**: Next execution time, None means no next execution

#### Usage Example
```python title="Calculate Next Execution Time"
# Get scheduled task element
task_element = app.getElement("tasks.TestTimeTasks")

# Simulate task object
task_data = {
    "element": "tasks.TestTimeTasks",
    "startTime": "2024-01-01 09:00:00"
}

# Calculate next execution time
next_time = task_element.getNextRunTime(task_data)
if next_time:
    print(f"Next execution time: {next_time.format('YYYY-MM-DD HH:mm:ss')}")
```

### afterReturn
Callback method after task execution completion, used for calculating next task.

#### Parameter Details
| Parameter Name | JitAI Type | Python Type | Required | Description |
|--------|-----------|-------------|------|------|
| task | RowData | object | Yes | Current task data object |

#### Usage Example
```python title="Custom Task Completion Processing"
def afterReturn(self, task):
    # Execute parent class logic: create next task
    super().afterReturn(task)
    
    # Custom post-processing logic
    self.sendNotification(task)
```

### getFunc
Get task execution function.

#### Parameter Details
| Parameter Name | JitAI Type | Python Type | Required | Description |
|--------|-----------|-------------|------|------|
| task | RowData | object | Yes | Task data object |

#### Return Value
- **Type**: function or None
- **Description**: Executable function object

#### Usage Example
```python title="Get Execution Function"
# Get task execution function
func = task_element.getFunc(task)
if func:
    result = func(**task.argDict.value or {})
```

## Attributes
### config
Task configuration information, containing all configuration items from e.json.

### customFunc
Internal custom function, used when funcType is "Inner".

### taskType
Task type identifier, value is the type field from configuration.

### TaskModel
Task data model, used for database operations.

### TaskHistoryModel
Task history record model, used for recording execution history.

## Advanced Features
### Complex Period Configuration
#### Monthly Repeat Configuration
```json title="Execute on 15th of Each Month"
{
  "timerCfg": {
    "startTime": "2024-01-15 10:00:00",
    "repeat": {
      "repeatType": "month",
      "period": 1,
      "subType": "day",
      "day": [15]
    }
  }
}
```

#### Weekly Repeat Configuration
```json title="Execute on Monday, Wednesday, Friday"
{
  "timerCfg": {
    "startTime": "2024-01-01 09:00:00",
    "repeat": {
      "repeatType": "week",
      "period": 1,
      "weekday": [1, 3, 5]
    }
  }
}
```

#### Yearly Repeat Configuration
```json title="Execute on First Monday of June Each Year"
{
  "timerCfg": {
    "startTime": "2024-06-01 09:00:00",
    "repeat": {
      "repeatType": "year",
      "period": 1,
      "month": 6,
      "week": 1,
      "weekday": [1]
    }
  }
}
```

### Global Function Call
```json title="Call Service Function"
{
  "funcType": "Global",
  "taskFunc": "services.DataSyncService.syncUserData"
}
```

### Parameterized Tasks
```python title="Task Parameter Passing"
def customFunc():
    # Get task parameters from global variables
    task = GlobalVar.currentTask
    params = task.argDict.value
    
    batch_size = params.get("batchSize", 100)
    filter_condition = params.get("filter", "")
    
    # Use parameters to execute business logic
    return process_data(batch_size, filter_condition)
```