---
sidebar_position: 7
slug: calling-business-logic-elements-in-approval-workflow
title: Calling Business Logic Elements in Approval Workflows
description: "Invoke business logic within approval workflows. Approval events, function processing in subprocesses, and automated responses."
---

# Calling Business Logic Elements in Approval Workflows

## Calling business logic through approval events {#calling-business-logic-through-approval-events}

Approval workflow processes frequently involve calls to additional business logic. For example, when an employee requests time off, upon manager approval, the HR department must be notified to adjust the employee's remaining leave balance, which involves modifying other business data.

To invoke business logic elements within approval workflows, utilize [Approval Events](../business-logic-development/event-handling.md#approval-events). Approval events are specialized event handlers designed by JitAi to manage approval workflow status changes and node operations, implementing automated responses to approval workflows through event-driven mechanisms. They listen for critical moments such as approval status changes, node transitions, and node processing, automatically executing predefined business logic to support complex approval workflow automation scenarios.

## Function processing in subprocesses {#function-processing-in-subprocesses}

Additionally, certain workflows require routing to subprocesses. For example, during employee resignation, the resignation application workflow may involve company asset transfers, employee information synchronization, employee information cleanup, and other operations, all implementable through subprocesses. When the parent process routes to a subprocess, function processing is executed. Similarly, when a subprocess returns to the parent process, function processing also occurs. These functions can all be configured in [Subprocess Nodes](./special-node-configuration.md#sub-process-node).
