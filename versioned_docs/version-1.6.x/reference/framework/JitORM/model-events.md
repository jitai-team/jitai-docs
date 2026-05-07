---
slug: model-events
description: "Model Events API Reference. Complete specifications, methods, and examples."
---

# Model Events

Model events (`events.ModelType`) are an event mechanism automatically triggered by model data operations. Based on the event publish-subscribe pattern, they listen for and respond to data changes, handling model Create, Read, Update, and Delete (CRUD) operations.

Model events are suitable for scenarios such as data auditing, business rule execution, and message notifications. For example:

*   **Data Auditing**: Recording the history of changes to critical data.
*   **Business Linkage**: Automatically adjusting inventory after an order status update.
*   **Message Notification**: Sending a welcome email after a new user registers.

The hierarchical structure of model event elements is: Meta (`events.Meta`) → Type (`events.ModelType`) → Instance. Developers can quickly create model event instance elements using the visual development tools.

**Working Principle**: The system listens to a specified business model (`sender`). When a specific operation (`operate`) occurs and meets the filter conditions (`filter`), the event is triggered. The event can execute a specified function (`func` or `inner.py`) either synchronously or asynchronously (`asyncType`), passing the data before and after the change as context to the execution function.

## Quick Start

### Creating Instance Elements

#### Directory Structure

Create a new event directory (e.g., `UserDataAudit`) under the `events/` directory. The standard structure is as follows:

```text
events/
└── UserDataAudit/           # [Directory] Event element name
    ├── e.json               # [File] Core configuration file
    ├── inner.py             # [File] (Optional) Internal execution logic code
    └── __init__.py          # [File] Python package identifier
```

#### e.json

```json title="events/UserDataAudit/e.json"
{
  "type": "events.ModelType",
  "title": "User Data Audit",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "funcType": "Inner",
  "asyncType": false,
  "filter": "Q(Q('status', 'status', 'active'))",
  "fields": ["name", "email", "status"],
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### inner.py

```python title="events/UserDataAudit/inner.py"
def customFunc(eventOutData):
    """
    Function name must be customFunc
    :param eventOutData: JitDict type, contains event-related data
    """
    # When `funcType` is `Global`, this function implementation is not required.
    pass
```

#### \_\_init\_\_.py

```python title="events/UserDataAudit/__init__.py"
from .inner import customFunc
```

### Element Configuration

#### e.json Configuration

| Field Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **Yes** | Fixed value | `"events.ModelType"` |
| `title` | String | **Yes** | Event display name | `"User Data Audit"` |
| `sender` | String | **Yes** | Full path (fullName) of the monitored model | `"models.UserModel"` |
| `operate` | String | **Yes** | Trigger operation type | `"UpdateAfter"` (see enumeration below) |
| `funcType` | String | No | Function type: `"Global"` \| `"Inner"` | `"Global"` (Default/Recommended) |
| `func` | String | Conditional | Required when `funcType` is `"Global"`; points to the service function  path | e.g., `"services.AuditSvc.log_change"` |
| `asyncType` | Boolean | No | Whether to execute asynchronously | `false` (Default) |
| `filter` | String | No | Q expression filter condition | `"Q(Q('status', 'status', 'active'))"` |
| `fields` | Array | No | List of triggering fields; if empty, monitors all fields | `["name", "email"]` |
| `enable` | Integer | No | 1: Enable, 0: Disable | `1` (Default) |
| `backendBundleEntry` | String | **Yes** | Backend load entry, fixed as `"."` | `"."` |

#### Operation Type Enumeration (operate)

*   `AddBefore`: Triggered before adding data.
*   `AddAfter`: Triggered after adding data.
*   `UpdateBefore`: Triggered before updating data.
*   `UpdateAfter`: Triggered after updating data.
*   `DeleteBefore`: Triggered before deleting data.
*   `DeleteAfter`: Triggered after deleting data.
*   `FieldUpdateAfter`: Triggered after any write operation.

## Execution Function

### Function Arguments

| Parameter Name | JitAI Type | Python Type | Description |
| :--- | :--- | :--- | :--- |
| `eventOutData` | JitDict | dict | Dictionary object containing event context data |

**eventOutData Structure Description**:

*   `model`: (Stext) Full model name.
*   `optType`: (Stext) Operation type.
*   `prevData`: (RowData) Data before change (empty for Add operations).
*   `postData`: (RowData) Data after change (empty for Delete operations).

### Function Body

**Service Function (Recommended)**

Suitable for reusing existing Service logic.

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_change(self, eventOutData):
        """
        :param eventOutData: Event context data
        """
        post_data = eventOutData.postData.value
        print(f"Received data change: {post_data.get('name')}")
```

**Event Internal Function**

Suitable for scenarios where logic belongs exclusively to this event and does not need reuse. The function is implemented in `inner.py` under the element directory.

```python title="events/UserDataAudit/inner.py"
def customFunc(eventOutData):
    """
    Function name must be customFunc
    :param eventOutData: Event context data
    """
    model = eventOutData.model.value
    opt_type = eventOutData.optType.value
    prev_data = eventOutData.prevData.value
    post_data = eventOutData.postData.value
    
    print(f"Model {model} performed {opt_type} operation")
    print(f"Data before change: {prev_data}")
    print(f"Data after change: {post_data}")
```

## Debugging and Notes

1.  **Transaction Control**:
    *   `*Before` events (e.g., `UpdateBefore`) are typically executed before the database transaction commits. If the event function throws an exception, the main operation may be rolled back.
    *   `*After` events (e.g., `UpdateAfter`) are typically executed after the database operation completes.
    *   If it is an asynchronous event (`asyncType: true`), it is always executed asynchronously after the main operation completes, without blocking the main thread or rolling back the main operation.

2.  **Infinite Recursion**:
    *   If the same row of data for the current model is updated again within an `UpdateAfter` event, and no restrictions are applied via `fields` or `filter`, it may lead to an infinite event loop.
    *   It is recommended to be extra careful when updating the model itself within an event handler, or use the `fields` property to explicitly specify monitoring only specific field changes.

3.  **Pre and Post Data**:
    *   `prevData` is the snapshot of data before modification.
    *   `postData` is the snapshot of data after modification.
    *   In `Add` operations, `prevData` is empty; in `Delete` operations, `postData` is empty.
