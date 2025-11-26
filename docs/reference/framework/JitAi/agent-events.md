---
sidebar_position: 6
slug: agent-events
title: "Agent Events Reference"
description: "Agent Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Agent Events"
---

# Agent Tool Invocation Events

Agent Tool Invocation Events (`events.AIAgentType`) are event handlers within the JitAi platform specifically designed for AIAgent-related operations. These events **do not affect** the normal operation of the Agent. They only trigger event messages before or after the Agent invokes a tool to execute additional business logic.

Agent Tool Invocation Events are suitable for side-channel scenarios that enhance Agent capabilities, such as:

*   **Audit Logging**: Recording detailed logs including input/output of tool invocations and execution duration.
*   **Notifications**: Sending notification messages before or after critical tool execution.
*   **State Synchronization**: Synchronizing the Agent's execution status to external business systems.

The hierarchical structure of Agent Event elements is Meta (`events.Meta`) → Type (`events.AIAgentType`) → Instance. Developers can rapidly create Agent Event instance elements using the visual development tools.

**Working Principle**: The system monitors tool invocation behaviors of the associated Agent. When a specified stage (`stage`) occurs (e.g., before invocation `preEvent`, after invocation `postEvent`), the event is triggered. The event automatically executes the configured function and passes context data such as the tool name (`toolName`) and tool arguments/return values (`args`) to the execution function.

## Quick Start

### Creating an Instance Element

#### Directory Structure

Create a new event directory (e.g., `AgentToolEvent`) under the `events/` directory. The standard structure is as follows:

```text
events/
└── AgentToolEvent/          # [Directory] Event element name
    ├── e.json               # [File] Core configuration file
```

#### e.json File

```json title="events/AgentToolEvent/e.json"
{
  "title": "Agent Tool Audit Event",
  "type": "events.AIAgentType",
  "sender": "aiagents.ModelKnowTest",
  "stage": "preEvent",
  "funcType": "Inner",
  "asyncType": false,
  "backendBundleEntry": "."
}
```

### Call Example

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | **Yes** | - | Event title, used to identify the event's purpose. |
| `type` | String | **Yes** | - | Fixed value: `events.AIAgentType`. |
| `sender` | String | **Yes** | - | Event sender, typically the `fullName` of the AIAgent. |
| `enable` | Integer | No | 1: Enable, 0: Disable | `1` (Default) |
| `stage` | String | **Yes** | - | Event trigger stage: `preEvent` / `postEvent`. |
| `func` | String | **Yes** | Path to the service function | Example: `"services.AuditSvc.log_agent_action"`. |
| `asyncType` | Boolean | No | `false` | Whether to execute asynchronously. |
| `backendBundleEntry` | String | No | `"."` | Backend entry path. |

### Trigger Stages (stage)

*   `preEvent`: **Triggered before tool invocation**.
    *   Usage: Recording invocation parameters, sending start notifications.
    *   Characteristics: Runs as a hook; should not block the actual tool invocation.
*   `postEvent`: **Triggered after tool invocation**.
    *   Usage: Recording execution results, triggering subsequent flows, state synchronization.
    *   Characteristics: Can access the final result of the tool execution for side-channel processing.

## Execution Function

**Function Parameters**

| Parameter Name | Description |
| :--- | :--- |
| `eventOutData` | Type `JitDict`, containing event context data. |

**Common Properties of eventOutData**:

| Property Name | Type | Description | Applicable Stage |
| :--- | :--- | :--- | :--- |
| `toolName` | Stext | Name of the invoked tool. | All |
| `stage` | Stext | Current trigger stage (`preEvent`/`postEvent`) | All |
| `args` | JitDict/Ltext | Tool input parameters (`preEvent`) or execution results (`postEvent`) | All |

**Service Function Example**

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_agent_action(self, eventOutData):
        """
        :param eventOutData: Event context data
        """
        if eventOutData.stage.value == "postEvent":
            # Record execution log
            self.save_audit_log(eventOutData.toolName.value, eventOutData.args.value)
        return eventOutData
```

## Debugging and Considerations

1.  **Non-blocking Design**:
    *   Agent Events are designed primarily as **Hooks**, not interceptors.
    *   Although event execution occupies time in synchronous mode, avoid throwing exceptions or performing overly long operations within the event to prevent affecting the normal response of the Agent.

2.  **Exception Handling**:
    *   Ensure that business logic within the service function is wrapped in `try-except` blocks.
    *   Guarantee that the continuity of the Agent's main task is not affected even if the event response logic fails.

3.  **Avoiding Infinite Loops**:
    *   Calling the same Agent that triggered the event within the Agent Event may lead to infinite recursion and cause a dead loop. Design subsequent actions after the event trigger with caution.

4.  **Logging and Debugging**:
    *   It is recommended to use `jit.commons.utils.logger` to print `toolName`, `stage`, and key parameters to troubleshoot the Agent's decision path and execution status.
