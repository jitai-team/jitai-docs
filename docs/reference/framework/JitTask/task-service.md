---
sidebar_position: 4
slug: task-service
description: "Temporary Task API Reference. Complete specifications, methods, and examples."
draft: true
---

# Temporary Tasks

Temporary tasks (`tasks.TemporaryType`) differ from the other two task types in that they do **not** have a static configuration file (`e.json`) to define execution rules. They are a **code-triggered** mechanism that allows developers to dynamically create one-off background tasks within business logic.

**Core Features**:
*   **Dynamic**: Execution time, parameters, and execution function are specified at runtime.
*   **One-off**: The task is destroyed immediately after execution and does not repeat automatically.
*   **Asynchronous**: Commonly used to decouple time-consuming operations and improve API response speed.

## Quick Start

### Scenario Example

**Scenario**: Automatically cancel an order 30 minutes after creation.

#### Business Code (Trigger Point)

Call `createTemporaryTask` within the business logic to create the task.

```python title="services/OrderSvc.py"
from tasks.TemporaryType.task import createTemporaryTask
from jit_utils.time import now

def create_order(user_id, items):
    # 1. Order creation logic...
    order_id = "ORD_123456"
    
    # 2. Calculate time 30 minutes later
    # use arrow or jit_utils
    exec_time = now().shift(minutes=30).format("YYYY-MM-DD HH:mm:ss")
    
    # 3. Create delayed check task
    task_id = createTemporaryTask(
        func="services.OrderSvc.checkAndCancel",
        argDict={
            "orderId": order_id,
            "reason": "timeout"
        },
        startTime=exec_time
    )
    
    print(f"Order created, delayed task generated: {task_id}")
    return order_id
```

#### Task Execution Function

Implement the specific business processing logic.

```python title="services/OrderSvc.py"
def checkAndCancel(orderId, reason="unknown"):
    """
    Parameter names must match keys in argDict
    """
    print(f"Checking order payment status: {orderId}, Reason: {reason}")
    
    # Query database to check if paid
    # if not paid: cancel_order()
    
    return "Checked"
```

## API Reference

### createTemporaryTask

The system provides the `createTemporaryTask` helper function to create tasks.

#### Import

```python
from tasks.TemporaryType.task import createTemporaryTask
```

#### Function Signature

```python
def createTemporaryTask(func, argDict=None, startTime=None):
    """
    :param func: (str) Global function path to execute
    :param argDict: (dict) Keyword arguments dictionary passed to the function
    :param startTime: (str) Scheduled execution time, format "yyyy-MM-dd HH:mm:ss"
    :return: (str) Generated Task ID (taskId)
    """
```

#### Parameter Details

| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `func` | String | **Yes** | Globally accessible service function path. Function must exist and be loaded. | `"services.OrderSvc.autoCancel"` |
| `argDict` | Dict | No | Dictionary of keyword arguments to pass to the function. | `{"orderId": "123"}` |
| `startTime` | String | No | Scheduled execution time, format `yyyy-MM-dd HH:mm:ss`.<br />If omitted, defaults to immediate execution (within system scan cycle). | `"2023-12-25 10:00:00"` |

## Execution Function

### Function Arguments

The execution function parameters for a temporary task are determined by the `argDict` provided when creating the task.

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| (Custom) | (Custom) | No | Function parameter names must correspond one-to-one with keys in `argDict` (unless `**kwargs` is used). |

### Function Body

The function must be a globally accessible service function (usually under `services/`).

*   **Parameter Matching**: Ensure the function's parameter list can receive all keys in `argDict`.
*   **Stateless**: The function should be stateless; all necessary context should be passed via `argDict` (passing IDs is recommended).

## Debugging & Considerations

1.  **Passing Complex Parameters**:
    *   Since `argDict` is serialized and stored in the database, it is recommended to **pass IDs only**.
    *   Do not pass entire objects (like a `User` object); pass `userId` instead. Re-query the data by ID within the execution function.
    *   Prefer JSON-compatible types like String, Number, Boolean, List, Dict.

2.  **Error Handling**:
    *   If a temporary task fails (throws an exception), its status changes to `error` and is recorded in the history table.
    *   **No Auto-Retry**: By default, temporary tasks do not retry automatically upon failure.
    *   **Manual Intervention**: Administrators can view failed task history in the backend.

3.  **Transaction Note**:
    *   `createTemporaryTask` itself is a database insert operation (`TaskModel.create`).
    *   If called within a transaction (`@transaction`), the task record creation is committed along with the transaction. If the transaction rolls back, the task is not created. This is usually expected behavior (if the business logic fails, the corresponding follow-up task should not execute).
