---
sidebar_position: 7
slug: calling-business-logic-elements-in-approval-workflow
---

# Calling Business Logic Elements in Approval Workflows

## Calling Business Logic Through Approval Events {#calling-business-logic-through-approval-events}

During an approval workflow process, it is often accompanied by calls to other business logic. For example, when an employee applies for time off, after the leader approves it, the HR department will be notified to adjust the employee's remaining time off duration, which involves modifying other business data.

If you want to call business logic elements in approval workflows, you need to complete this through [Approval Events](../business-logic-development/event-handling.md#approval-events). Approval events are event handlers specifically designed by JitAi to handle approval workflow status changes and node operations, implementing automated responses to approval workflows based on event-driven mechanisms. They are responsible for listening to key moments such as approval status changes, node changes, and node processing, and automatically executing predefined business logic, supporting complex approval workflow automation scenarios.

## Function Processing in Subprocesses {#function-processing-in-subprocesses}

Additionally, some workflows also need to flow to subprocesses. For example, when an employee resigns, the resignation application during the workflow may involve company asset transfers, employee information synchronization, employee information cleanup, etc., all of which can be implemented through subprocesses. When the parent process flows to a subprocess, function processing will be performed. Similarly, when a subprocess flows to the parent process, function processing will also be performed. These functions can all be configured in [Subprocess Nodes](./special-node-configuration.md#sub-process-node).
