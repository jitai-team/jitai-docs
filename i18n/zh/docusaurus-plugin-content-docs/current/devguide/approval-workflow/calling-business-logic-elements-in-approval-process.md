---
sidebar_position: 7
slug: calling-business-logic-elements-in-approval-workflow
description: "在审批流程中调用业务逻辑元素的详细指南和说明。"
---

# 在审批流程中调用业务逻辑元素

## 通过审批事件调用业务逻辑 {#calling-business-logic-through-approval-events}

在某个审批流转过程中，往往会伴随着其他业务逻辑的调用。例如，员工在申请调休时，当领导审批通过后，会告知HR部门同时对该员工调休剩余时长进行调整，这就涉及到对其他业务数据的修改。

如果要在审批流程中调用业务逻辑元素，需要通过[审批事件](../business-logic-development/event-handling.md#approval-events)来完成。审批事件是 JitAi 专门处理审批流程状态变更和节点操作的事件处理器，基于事件驱动机制实现审批流程的自动化响应。它负责监听审批状态变更、节点变更和节点处理等关键时机，并自动执行预定义的业务逻辑，支持复杂的审批流程自动化场景。

## 子流程中函数处理 {#function-processing-in-subprocesses}

另外，有些流程还需要流转到子流程中。例如，员工离职时，离职申请在流转中可能涉及到公司资产的转移、员工信息同步、员工信息清理等，这些都可以通过子流程来实现。当父流程流转到子流程时，将会进行函数处理。同理，当子流程流转到父流程时，也会进行函数处理。这些函数都可以在[子流程节点](./special-node-configuration.md#sub-process-node)进行配置。
