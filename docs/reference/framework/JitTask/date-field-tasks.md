---
sidebar_position: 2
slug: date-field-tasks
title: "Date Field Tasks Reference"
description: "Date Field Tasks Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Date Field Tasks"
---

# Date Field Tasks

Date Field Tasks (`tasks.DateFieldType`) are a **data-driven** task type within the JitTask framework. Unlike standard scheduled tasks, their triggering does not rely solely on the system clock but rather on date/time fields within specific data rows of a Business Model. This makes them ideal for event reminders and processing logic strongly correlated with specific business data, such as:

*   Sending a reminder 15 minutes before a meeting starts.
*   Automatically updating a contract's status to "Expired" on its expiration date.
*   Sending birthday wishes on an employee's birthday.

The Date Field Task element follows a hierarchical structure: Meta (`tasks.Meta`) → Type (`tasks.DateFieldType`) → Instance. Developers can quickly create date field task instance elements using visual development tools.

**How it Works**: The system scans the specified business model (`modelPath`), reads the designated time field (`startField`) for each row, and combines it with a configured offset (`offset`) to calculate the trigger time for that specific row. When the task triggers, the corresponding data row is passed as context to the execution function.

## Quick Start

### Creating an Instance Element

#### Directory Structure

Create a new task directory (e.g., `MeetingReminder`) under the `tasks/` directory. The standard structure is as follows:

```text
tasks/
└── MeetingReminder/      # [Directory] Task element name
    ├── e.json            # [File] Core configuration file
    ├── inner.py          # [File] (Optional) Internal execution logic code
    └── __init__.py       # [File] Python package identifier
```

#### e.json File

```json title="tasks/MeetingReminder/e.json"
{
  "type": "tasks.DateFieldType",
  "title": "Meeting Reminder",
  "modelPath": "models.MeetingModel",
  "funcType": "Global",
  "func": "services.MeetingSvc.notify",
  "timerCfg": {
    "startField": "startTime",
    "startOffset": {
      "offsetType": -1,
      "offset": 15,
      "offsetUnit": "minute"
    },
    "repeat": {
      "repeatType": "normal"
    }
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **Yes** | Fixed value | `"tasks.DateFieldType"` |
| `title` | String | **Yes** | Task display name | `"Meeting Reminder"` |
| `modelPath` | String | **Yes** | Full path of the bound business model | `"models.MeetingModel"` |
| `enable` | Integer | No | 1: Enable, 0: Disable (Default: 0) | `1` |
| `funcType` | String | **Yes** | Function type: `"Inner"` or `"Global"` | `"Global"` |
| `func` | String | Conditional | Required when `funcType` is `"Global"`, points to the service function path | `"services.MeetingSvc.notify"` |
| `backendBundleEntry` | String | **Yes** | Backend load entry, fixed as `"."` | `"."` |

### timerCfg Configuration

This is the core part of the configuration, determining when the task executes.

| Parameter Name | Type | Required | Description | Example Value |
|--------|------|------|------|--------|
| `startField` | String | **Yes** | The time field name in the model; must be of type `DateTime` or `Date` | `"startTime"` |
| `startOffset` | Object | **Yes** | Configuration object for trigger time offset | See offset configuration |
| `endOffset` | Object | No | Configuration object for end time offset (for interval-based tasks) | See offset configuration |
| `repeat` | Object | **Yes** | Configuration object for repetition | See repeat configuration |

### offset Configuration

`startOffset` (and the optional `endOffset`) defines the trigger timing relative to the field value.

| Parameter Name | Type | Required | Description | Optional Values |
|--------|------|------|------|--------|
| `offsetType` | Integer | **Yes** | Offset direction | `-1`: Before (Precede)<br/>`0`: On time<br/>`1`: After (Delay) |
| `offset` | Integer | **Yes** | Offset quantity | Positive Integer |
| `offsetUnit` | String | **Yes** | Time unit | `"minute"`: Minute<br/>`"hour"`: Hour<br/>`"day"`: Day |
| `time` | String | No | Forced time point, format `HH:mm`.<br/>If this field is set, the offset logic of `offset` and `offsetType` will be ignored. | `"09:00"` |

**Example Combinations**:

*   **15 minutes in advance**: `{"offsetType": -1, "offset": 15, "offsetUnit": "minute"}`
*   **3 days later**: `{"offsetType": 1, "offset": 3, "offsetUnit": "day"}`
*   **9:00 AM on the same day** (ignoring specific hours/minutes/seconds): `{"offsetType": 0, "offset": 0, "offsetUnit": "day", "time": "09:00"}`

### repeat Configuration

For date field tasks, `repeat` determines whether to trigger multiple times for the same data row.

| Parameter Name | Type | Required | Description | Optional Values |
|--------|------|------|------|--------|
| `repeatType` | String | **Yes** | Repeat type | `"normal"`: Trigger only once<br/>`"year"`: Trigger annually |

**Explanation**:
*   **`normal` (Common)**: Triggers only once for that specific time point of the data row.
*   **`year`**: Triggers every year. For example, if the model stores an employee's birth date, configuring this to repeat annually will trigger the task on that date every year.

## Execution Function

### Function Parameters
| Parameter Name | JitAI Type | Python Type | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `rowData` | RowData | Object | **Yes** | Model data triggering the task |

### Function

**Service Function (Recommended)**

Suitable for reusing existing Service logic.

```python title="services/MeetingSvc.py"
from datatypes.Meta import datatypes
from services.NormalType import NormalService

class MeetingSvc(NormalService):

  def notify(self, rowData):
      """
      :param rowData: The business data row triggering the task
      """
      meeting_id = rowData.id.value
      title = rowData.title.value
      start_time = rowData.startTime.value
      
      log.info(f"Executing meeting reminder: ID={meeting_id}, Title={title}")
      
      # Business logic: Send notification
      # send_message(user_id, f"Meeting {title} will start at {start_time}")
      
      return "Done"
```

**Internal Task Function**

Suitable for scenarios where the logic belongs exclusively to the task and does not need to be reused. The function is implemented in `inner.py` under the element directory, with the function name fixed as `customFunc`.

```python title="tasks/MeetingReminder/inner.py"
from jit.commons.utils.logger import log

def customFunc(rowData):
    """
    Function name must be customFunc
    :param rowData: The business data row triggering the task
    """
    # Get data (Note the use of .value)
    meeting_id = rowData.id.value
    title = rowData.title.value
    start_time = rowData.startTime.value
    
    log.info(f"Executing meeting reminder: ID={meeting_id}, Title={title}")
    
    # Business logic: Send notification
    # send_message(user_id, f"Meeting {title} will start at {start_time}")
    
    return {"status": "success", "meetingId": meeting_id}
```

## Debugging and Notes

1.  **Field Format**: The `startField` in the model must be of type `DateTime` or `Date`.

2.  **Effective Time**: Changes to `e.json` usually require a restart of the backend service to take effect.

3.  **Data Changes**: If the time field of the business data is modified (e.g., a meeting is postponed), the system typically recalculates the next trigger time (depending on the internal synchronization mechanism; please verify via testing).

4.  **Performance Considerations**:
    *   If the bound model has a huge amount of data (millions), evaluate the pressure of the task scan on the database.
    *   It is recommended to add database indexes to time fields to improve query performance.
    *   You can limit the range of data for which tasks need to be created through filter conditions.

5.  **RowData Context**:
    *   The `rowData` passed to the function is a snapshot at the time the task is triggered.
    *   If the latest data is needed, it is recommended to query the database again by ID within the function.

6.  **Exception Handling**:
    *   If the code throws an exception, the task status will become `error`.
    *   It is recommended to use `try...except` blocks within the execution function to avoid affecting other tasks.

8.  **Logs**: Task startup, execution results, and error reports are recorded in system logs. You can view them by searching for the keyword `DateFieldTask execution`.
