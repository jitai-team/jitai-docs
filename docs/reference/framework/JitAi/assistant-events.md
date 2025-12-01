---
sidebar_position: 7
slug: assistant-events
title: "Assistant Events Reference"
description: "Assistant Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Assistant Events"
---

# Assistant Events

Assistant Events (`events.AIAssistantType`) are event handlers within the JitAI platform dedicated to AI Assistant interactions. They are responsible for monitoring the AI Assistant's execution process, state changes, and user interactions.

**Core Mechanism**: Assistant Events do not affect the normal operation of the AI Assistant workflow. They trigger event messages at appropriate moments (e.g., before/after execution, during node approval) to execute additional business logic (e.g., auditing, notifications). This business logic runs as a **sidecar process**, designed to ensure the main flow of the AI Assistant remains independent and stable.

Assistant Events are suitable for sidecar scenarios that enhance AI Assistant capabilities, such as:

*   **Process Monitoring**: Monitoring assistant execution status and recording execution logs.
*   **Collaboration**: Triggering other assistants or business logic before or after assistant execution.
*   **Human Intervention**: Monitoring approval actions (approve/reject/reply) in human review nodes.
*   **Node Control**: Performing data validation or state synchronization before or after specific process nodes execute.

The hierarchical structure of Assistant Event elements is Meta (`events.Meta`) → Type (`events.AIAssistantType`) → Instance. Developers can quickly create Assistant Event instance elements using visual development tools.

## Quick Start

### Creating Instance Elements

#### Directory Structure

Create a new event directory (e.g., `AssistantMonitorEvent`) under the `events/` directory. The standard structure is as follows:

```text
events/
└── AssistantMonitorEvent/   # [Directory] Event element name
    ├── e.json               # [File] Core configuration file
```

#### e.json File

```json title="events/AssistantMonitorEvent/e.json"
{
  "title": "Assistant Execution Monitor Event",
  "type": "events.AIAssistantType",
  "sender": "aiassistants.CustomerService",
  "operate": "afterRun",
  "func": "services.LogService.record_execution",
  "asyncType": false,
  "backendBundleEntry": "."
}
```

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | **Yes** | Event display name |
| `type` | String | **Yes** | Fixed value: `events.AIAssistantType` |
| `sender` | String | **Yes** | Event sender, typically the `fullName` of the AI Assistant |
| `operate` | String | **Yes** | Event trigger timing. See [Trigger Timing (operate)](#trigger-timing-operate) below |
| `enable` | Integer | No | 1: Enable, 0: Disable | Default: `1` |
| `func` | String | **Yes** | Path to the service function | Example: `"services.AuditSvc.log_agent_action"` |
| `asyncType` | Boolean | No | Whether to execute asynchronously. Default: `false` |
| `backendBundleEntry` | String | **Yes** | Fixed value: `"."` |

### Trigger Timing (operate) {#trigger-timing-operate}

The `operate` field determines when the event is triggered. The following modes are supported:

#### 1. Basic Timing (Assistant Level)
Monitors the entire execution cycle of the AI Assistant:
*   `beforeRun`: Triggered before the assistant runs.
*   `afterRun`: Triggered after the assistant runs.

#### 2. Node Timing (Node Level)
Monitors the execution status of specific nodes in the workflow. The format is `${nodeId}.${timing}`:
*   `${nodeId}.beforeNodeRun`: Triggered immediately before the specified node executes.
*   `${nodeId}.afterNodeRun`: Triggered after the specified node completes execution.

> **Example**: `node001.beforeNodeRun` (Monitors when the node001 node starts running)

#### 3. Human Operation Timing (Interaction Level)
Monitors user actions on human nodes (e.g., approval, input nodes). The format is `${nodeId}.${action}`:
*   `${nodeId}.approved`: Triggered after the user clicks "Approve".
*   `${nodeId}.rejected`: Triggered after the user clicks "Reject".
*   `${nodeId}.replied`: Triggered after the user replies to a message.
*   `${nodeId}.edited`: Triggered after the user edits content.

> **Example**: `approvalNode.approved` (Monitors when the approval node is approved)

## Execution Function

**Function Parameters**
When the function is called, the event output parameters configured on the AI Assistant node are passed as function arguments. Please refer to the AI Assistant element to view the node event output parameters.

**Function Example**

```python title="services/AuditSvc/service.py"
class AuditSvc(NormalService):

    def log_assistant(self, arg1, arg2, ..):
        print(arg1.value)
        print(arg2.value)
```

## Debugging and Notes

1.  **Non-blocking Principle**: As sidecar logic, Assistant Events should not be designed as interceptors. Ensure the stability of the event processing logic functions to avoid affecting the user experience of the main assistant flow due to event logic failures.
2.  **Exception Handling**: Be sure to add `try-except` blocks in the event processing function to capture exceptions, preventing unhandled errors from interrupting the AI Assistant's execution.
3.  **Infinite Loop Risk**: Triggering the current AI Assistant again within event processing (e.g., calling the same assistant in `afterRun`) will lead to an infinite loop. Please design with caution.
4.  **Asynchronous Execution**: For time-consuming operations like logging or notifications, it is recommended to set `asyncType` to `true` to reduce the impact on the main flow's response time.
