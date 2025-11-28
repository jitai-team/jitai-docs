---
sidebar_position: 1
slug: scheduled-tasks
title: "Scheduled Tasks Reference"
description: "Scheduled Tasks Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Scheduled Tasks"
---

# Scheduled Tasks

Scheduled Tasks (`tasks.NormalType`) are the most fundamental task type in the JitTask framework, similar to Cron jobs in Linux. They rely entirely on the system clock and preset configurations to trigger, making them suitable for periodic background jobs that are not strongly correlated with specific business data rows, such as:

*   Daily data cleanup at midnight
*   Periodic statistical reporting
*   System status inspection

The Scheduled Task element follows a hierarchical structure: Meta (`tasks.Meta`) → Type (`tasks.NormalType`) → Instance. Developers can quickly create scheduled task instance elements using visual development tools.

## Quick Start

### Creating an Instance Element

#### Directory Structure

Create a new task directory (e.g., `MyDailyJob`) under the `tasks/` directory. The standard structure is as follows:

```text
tasks/
└── MyDailyJob/           # [Directory] Task element name
    ├── e.json            # [File] Core configuration file
    ├── inner.py          # [File] (Optional) Internal execution logic code
    └── __init__.py       # [File] Python package identifier
```

#### e.json

```json title="tasks/MyDailyJob/e.json"
{
  "type": "tasks.NormalType",
  "funcType": "Global",
  "func": "services.DataSyncService.syncUserData",
  "title": "Daily Data Sync",
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

#### inner.py

```python title="tasks/MyDailyJob/inner.py"
from jit.commons.utils.logger import log

def customFunc():
    """
    Function name must be customFunc
    """
    # Business logic...
    # When `funcType` is `Global`, this function does not need to be implemented.
    pass
```

#### __init__.py

```python title="tasks/MyDailyJob/__init__.py"
# -*-coding:utf-8-*-

from .inner import customFunc
```

When `funcType` is `Global`, the execution function is a service function, not `customFunc`.

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **Yes** | Fixed value | `"tasks.NormalType"` |
| `title` | String | **Yes** | Task display name | `"Daily Data Sync"` |
| `enable` | Integer | No | 1: Enable, 0: Disable (Default: 0) | `1` |
| `funcType` | String | **Yes** | Function type: `"Inner"` or `"Global"` | `"Inner"` |
| `func` | String | Conditional | Required when `funcType` is `"Global"`, points to the service function path | `"services.MySvc.run"` |
| `backendBundleEntry` | String | **Yes** | Backend load entry, fixed as `"."` | `"."` |

### timerCfg Configuration

This is the core part of the configuration, determining when the task executes.

| Parameter Name | Type | Required | Description | Example Value |
|--------|------|------|------|--------|
| `startTime` | String | **Yes** | First execution time, format: `yyyy-MM-dd HH:mm:ss` | `"2024-01-01 09:00:00"` |
| `endTime` | String | No | Task termination time; the task stops automatically after this time | `"2024-12-31 18:00:00"` |
| `skipHoliday` | Integer | No | Whether to skip holidays: 1 to skip, 0 not to skip | `1` |
| `repeat` | Object | **Yes** | Configuration object for repetition | See repeat configuration |

**Explanation**:
*   If the current time is later than `startTime` and the task has not been executed yet, the system will calculate the next scheduled execution time based on the `repeat` rules.
*   If the scheduled execution time falls on a holiday (based on the system calendar) and `skipHoliday` is 1, it will be postponed by one cycle.

### repeat Configuration

The `repeatType` in the `repeat` object determines the specific repetition strategy.

| Parameter Name | Type | Required | Description | Optional Values |
|--------|------|------|------|--------|
| `repeatType` | String | **Yes** | Repeat type | `"year"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"normal"` |
| `period` | Integer | **Yes** | Repeat period, indicating the interval count | Positive Integer |

**Basic Repeat Types**:

*   **Daily**: `"repeatType": "day", "period": 1` (Every day)
*   **Hourly**: `"repeatType": "hour", "period": 2` (Every 2 hours)
*   **Every 30 Minutes**: `"repeatType": "minute", "period": 30`
*   **No Repeat**: `"repeatType": "normal"` (Executes only once at startTime)

## Execution Function

**Service Function (Recommended)**

Suitable for reusing existing Service logic.

Ensure a service with `fullName` as `services.DataSyncService` exists and contains the `syncUserData` function.

```python title="services/DataSyncService/service.py"

from datatypes.Meta import datatypes
from services.NormalType import NormalService

class DataSyncService(NormalService):

  def syncUserData(self):
      """Service function example"""
      # Business logic...
      return {"status": "completed"}
```

**Internal Task Function**

Suitable for scenarios where the logic belongs exclusively to the task and does not need to be reused. The function is implemented in `inner.py` under the element directory, with the function name fixed as `customFunc`.

```python title="tasks/MyDailyJob/inner.py"
from jit.commons.utils.logger import log

def customFunc():
    """
    Function name must be customFunc
    No arguments
    """
    log.info("Starting daily task execution...")
    
    # Get user model for data operations
    UserModel = app.getElement("models.UserModel")
    users = UserModel.query(filter="Q(status='active')")
    
    for user in users["rowDatas"]:
        # Execute business logic
        log.info(f"Processing user: {user.name.value}")
    
    log.info("Task execution completed")
    return {"status": "success", "processedCount": len(users["rowDatas"])}
```

## Debugging and Notes

1.  **Effective Time**: Changes to `e.json` usually require a restart of the backend service to take effect.

2.  **Exception Handling**:
    *   If the code throws an exception, the task status will become `error`.
    *   **Important**: If an exception causes the program to crash and is not caught, it may affect the generation of the next task (because the next task is generated during the `afterReturn` phase of the current task). It is recommended to use `try...except` protection within `customFunc`.

3.  **Timeout**: The default timeout is 12 hours. If a task execution exceeds this time, it may be marked as expired by the system.
