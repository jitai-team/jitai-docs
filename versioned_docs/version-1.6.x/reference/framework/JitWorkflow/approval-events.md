---
slug: approval-events
title: "Approval Events"
description: "Approval Events API Reference. Complete specifications, methods, and examples."
---

# Approval Events

Approval Events (`events.WorkflowType`) are event handlers in the Jit platform specifically designed to manage approval workflow status changes and node operations. Based on an event-driven mechanism, they automate responses to approval processes by listening for critical triggers such as approval status updates, node transitions, and node processing actions.

Approval events are suitable for complex workflow automation scenarios, such as:

*   **Status Synchronization**: Automatically updating the status of business documents after an approval is approved or rejected.
*   **Workflow Branching**: Triggering different subsequent processes based on the results of node processing.
*   **Notifications**: Notifying relevant approvers when a node changes.

The element hierarchy for approval events is Meta (`events.Meta`) → Type (`events.WorkflowType`) → Instance. Developers can quickly create approval event instance elements using the visual development tools.

**Working Principle**: The system listens to the associated model (`model`)'s approval workflow. When a specified operation (`operate`) occurs (such as a status change or node transition), the event is triggered. The event automatically executes the configured function (`func` or `inner.py`), passing the approval row data (`row`) and status information (`status`) as context to the execution function.

## Quick Start

### Create Instance Element

#### Directory Structure

Create a new event directory (e.g., `OrderApprovalEvent`) under the `events/` directory. The standard structure is as follows:

```text
events/
└── OrderApprovalEvent/      # [Directory] Event element name
    ├── e.json               # [File] Core configuration file
    ├── inner.py             # [File] (Optional) Internal execution logic code
    └── __init__.py          # [File] Python package identifier
```

#### e.json File

```json title="events/OrderApprovalEvent/e.json"
{
  "title": "Order Approval Event",
  "type": "events.WorkflowType",
  "backendBundleEntry": ".",
  "model": "models.OrderModel",
  "operate": "Process",
  "funcType": "Inner"
}
```

#### inner.py File

```python title="events/OrderApprovalEvent/inner.py"
def customFunc(eventOutData):
    """
    The function name must be customFunc (or match the configured handler)
    :param eventOutData: JitDict type, contains event-related data
    """
    # When `funcType` is `Global`, this function does not need to be implemented.
    pass
```

#### \_\_init\_\_.py File

```python title="events/OrderApprovalEvent/__init__.py"
from .inner import handleOrderApproval
```

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | **Yes** | - | Event title |
| `type` | String | **Yes** | - | Fixed value: `events.WorkflowType` |
| `backendBundleEntry` | String | **Yes** | - | Backend entry path, usually `"."` |
| `model` | String | **Yes** | - | Full name of the associated model |
| `enable` | Integer | No | 1: Enable, 0: Disable | `1` (Default) |
| `operate` | String | **Yes** | - | Operation type (see enum below) |
| `funcType` | String | No | Function type: `"Global"` \| `"Inner"` | `"Global"` (Default/Recommended) |
| `func` | String | Conditional | Required when `funcType` is `"Global"`, points to the service function  path | E.g., `"services.AuditSvc.log_approval"` |
| `triggerNode` | List | No | `[]` | List of trigger nodes (used with `NodeChange`) |
| `handleType` | String/List | No | - | Handle type (used with `NodeHandled`) |
| `handleNode` | String | No | - | Handle node (used with `NodeHandled`) |

### Operation Types (operate)

*   `Process`: Triggered when approval status changes.
*   `NodeChange`: Triggered when approval nodes transition.
*   `NodeHandled`: Triggered when an approval node is processed.

#### 1. Approval Status Change Event (Process)

Listens for status changes in the entire approval workflow.

**Common Approval Statuses (status)**:
*   `In`: In Progress
*   `Pass`: Approved
*   `Refuse`: Rejected
*   `Refuse`: Recalled

```json title="Approval Status Change Event Configuration"
{
  "title": "Approval Status Change Event",
  "type": "events.WorkflowType",
  "model": "models.OrderModel", 
  "operate": "Process",
  "funcType": "inner"
}
```

#### 2. Node Change Event (NodeChange)

Listens for the transition of approval nodes.

**Configuration Items**:
*   `triggerNode`: (List) Configuration list of trigger nodes. Supports the following formats:
    *   `after.StartNode`: Triggered after approval is initiated.
    *   `before.StartNode`: Triggered when returned to the start node.
    *   `before.<nodeId>`: Triggered before reaching a specific node.
    *   `after.<nodeId>`: Triggered after a specific node is approved.

```json title="Node Change Event Configuration"
{
  "title": "Node Change Event",
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeChange", 
  "triggerNode": ["after.StartNode", "before.approvalNode1", "after.approvalNode1"],
  "funcType": "Inner"
}
```

#### 3. Node Handled Event (NodeHandled)

Listens for specific approval operations on a specific node.

**Configuration Items**:
*   `handleNode`: (String) The ID of the node to listen to.
*   `handleType`: (List) The list of operation types to listen to.

**Operation Types (handleType)**:
*   **Start Node Operations**:
    *   `submit`: Submit
    *   `manualEnd`: Cancel Workflow
*   **Approval Node Operations**:
    *   `agree`: Agree
    *   `refuse`: Reject (End Flow)
    *   `reject`: Send Back (Return to previous)
    *   `transmit`: Transfer

```json title="Node Handled Event Configuration"
{
  "title": "Node Handled Event", 
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeHandled",
  "handleNode": "approvalNode",
  "handleType": ["agree", "reject"],
  "funcType": "Inner"
}
```

## Execution Function

### Function Parameters

| Parameter Name | Description |
| :--- | :--- |
| `eventOutData` | Object containing event context data |

**Common Properties of eventOutData**:

*   `row`: (RowData) The business data row object associated with the approval.
*   `status`: (Stext) Current approval status (used in `Process` events).
*   `triggerNode`: (Stext) The ID of the triggered node (used in `NodeChange` events).
*   `NodeHandled`: (Stext) The ID of the approve node (used in `NodeHandled` events)
*   `handleType`: (Stext) The type of handling action (used in `NodeHandled` events).

### Function Body

**Service Function (Recommended)**

Suitable for reusing existing Service logic.

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_approval(self, eventOutData):
        """
        :param eventOutData: Event context data
        """
        if eventOutData.status.value == 'Pass':
            # Logic for approval passed
            pass
                
        # NodeChange Event: Get trigger node
        if eventOutData.triggerNode.value == 'StartNode':
            # Logic after approval initiation
            pass

        # NodeHandled Event: Get handle action and node
        if eventOutData.handleType.value == 'agree':
            # Logic for node agreement
            pass
```

**Event Internal Function**

Suitable for logic specific to this event that does not need to be reused. The function is implemented in `inner.py` under the element directory.

```python title="events/OrderApprovalEvent/inner.py"
def customFunc(eventOutData):
    """
    Function name must be customFunc (or as configured)
    :param eventOutData: Event context data
    """
    if eventOutData.status.value == 'Pass':
        # Logic for approval passed
        pass
            
    # NodeChange Event: Get trigger node
    if eventOutData.triggerNode.value == 'StartNode':
        # Logic after approval initiation
        pass

    # NodeHandled Event: Get handle action and node
    if eventOutData.handleType.value == 'agree':
        # Logic for node agreement
        pass
```

## Debugging and Notes

1.  **Exception Handling and Rollback**:
    *   Approval events are typically executed synchronously. If an exception (`raise Exception`) is thrown in the event handler function, the current approval operation (such as Submit or Agree) will be interrupted, and an error message will be returned to the user.
    *   This feature can be used to implement custom business validation logic (e.g., preventing approval if conditions are not met).

2.  **Avoid Infinite Loops**:
    *   Modifying business data (`row`) and executing `row.save()` is a common operation in events. However, this may trigger `ModelEvent` configured on that model. Ensure that no logical loop is formed.
    *   It is generally not recommended to directly call the Workflow Engine API within an approval event to change the workflow status (e.g., automatically agreeing to the next level), as this may recursively trigger approval events, causing an infinite loop.

3.  **Data Persistence**:
    *   `eventOutData.row` provides a reference to the current business data object.
    *   If field values of `row` are modified in the event, `row.save()` must be explicitly called to persist the changes to the database.

4.  **Logging**:
    *   It is recommended to use `jit.commons.utils.logger` to print logs, recording key variables (such as `status`, `row.id`, `handleType`) to facilitate backend viewing of event triggers and data flow.
