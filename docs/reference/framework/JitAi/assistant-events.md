---
sidebar_position: 7
slug: assistant-events
title: "Assistant Events Reference"
description: "Assistant Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Assistant Events"
---

# Assistant Events
Assistant Events are specialized event handling for AI Assistant interactions. They are responsible for monitoring AI Assistant execution processes, state changes, and user interactions, providing processing capabilities for core interaction events such as user intent recognition, assistant switching, and session management.

The Assistant Events element hierarchical structure is Meta (events.Meta) → Type (events.AIAssistantType) → Instance. Developers can quickly create Assistant Events instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements, or override the official events.AIAssistantType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
events/
└── testAssistantEvents/
    ├── __init__.py
    ├── e.json
    └── inner.py
```

#### e.json File
```json title="e.json Configuration File"
{
  "asyncType": false,
  "title": "Test Assistant Events",
  "sender": "aiassistants.toolTest",
  "operate": "afterRun",
  "func": "services.standardServicesTested.sayHello",
  "backendBundleEntry": ".",
  "type": "events.AIAssistantType"
}
```

#### Business Logic Code
```python title="inner.py File"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes

def customFunc(eventOutData):
    """
    Custom event handler function
    :param eventOutData: Event output data
    """
    # Business logic for processing event data
    pass
```

#### Usage Example
```python title="Getting and Using Assistant Events"
# Get assistant event instance
event = app.getElement("events.testAssistantEvents")

# Event will automatically trigger when AI Assistant executes afterRun
# Calls the specified target function: services.standardServicesTested.sayHello
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Native Type | Required | Description |
|-----|---|----|---|---|
| type | str | str | Yes | Fixed value: events.AIAssistantType |
| title | str | str | Yes | Event display name |
| sender | str | str | Yes | Event sender, usually the fullName of AI Assistant |
| operate | str | str | Yes | Event trigger timing: basic timing (beforeRun/afterRun), node timing (nodeId.beforeNodeRun etc.), manual operation timing (nodeId.approved etc.) |
| func | str | str | Yes | Target function called when event is triggered |
| asyncType | bool | bool | No | Whether to execute asynchronously, default false |
| backendBundleEntry | str | str | Yes | Fixed value: "." |

### Business Logic Code Configuration
The inner.py file is used to define custom event processing logic:

```python title="Custom Handler Function Example"
def customFunc(eventOutData):
    """
    Custom event handler function
    :param eventOutData: Event output data
    """
    # Business logic for processing event data
    print(f"Assistant event triggered: {eventOutData}")
    return eventOutData
```

## Methods 
### getSender
Get the complete event sender identifier in the format "sender.operate".

#### Parameter Details
No parameters

#### Return Value
| Type | Description |
|---|---|
| str | Complete identifier of the event sender |

#### Usage Example
```python title="Get Event Sender"
event = app.getElement("events.testAssistantEvents")
sender = event.getSender()
print(sender)  # Output: aiassistants.toolTest.afterRun
```

### isValid
Validate whether the event is valid, used to determine if the event should be triggered under current conditions.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----|---|----|---|---|
| rowObj | object | object | No | Data row object |
| args | tuple | tuple | No | Additional parameters |
| kwargs | dict | dict | No | Keyword parameters |

#### Return Value
| Type | Description |
|---|---|
| bool | Whether the event is valid |

#### Usage Example
```python title="Validate Event Validity"
event = app.getElement("events.testAssistantEvents")
is_valid = event.isValid()
print(is_valid)  # Output: True
```

### handleNode
Process event nodes, parse event parameters and prepare to call target functions.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----|---|----|---|---|
| node | object | object | Yes | Event node object |
| args | tuple | tuple | No | Parameters passed to target function |
| kwargs | dict | dict | No | Keyword parameters passed to target function |

#### Return Value
| Type | Description |
|---|---|
| tuple | Returns processed (node, args, kwargs) |

#### Usage Example
```python title="Process Event Node"
event = app.getElement("events.testAssistantEvents")
# Usually called automatically by the event system, developers generally don't need to use it directly
```

## 属性
### sender
事件发送方的标识，通常为触发事件的AI助理的fullName。

### operate
事件触发的操作时机，支持多种触发场景：

- **基础时机**: `beforeRun`(助理运行前)、`afterRun`(助理运行后)
- **节点时机**: `${nodeId}.beforeNodeRun`(节点到达时)、`${nodeId}.afterNodeRun`(节点执行后)
- **人工操作时机**: `${nodeId}.approved`(同意后)、`${nodeId}.rejected`(拒绝后)、`${nodeId}.replied`(回复后)、`${nodeId}.edited`(编辑后)

### func
事件触发时调用的目标函数，格式：`{元素名}.{函数名}`。

### asyncType
事件是否异步执行，为true时事件处理不会阻塞主流程。

## 高级特性
### 事件参数解析机制
助理事件具有智能的参数解析能力，会根据目标函数的参数定义自动调整传递的参数。如果目标函数没有设置参数，事件系统会自动传递空参数。

```python title="参数解析示例"
# 目标函数定义
def targetFunction(param1, param2):
    return f"处理参数：{param1}, {param2}"

# 事件会自动解析并传递正确的参数数量和类型
```

### 节点级事件配置
助理事件支持对AI助理流程中的特定节点进行事件监听，实现更精细的流程控制。

```python title="节点级事件配置示例"
# 监听特定节点的执行
{
  "title": "数据处理节点事件",
  "sender": "aiassistants.dataProcessor",
  "operate": "node001.beforeNodeRun",  # 监听节点node001的到达
  "func": "services.validationService.validateData"
}

# 监听人工审核节点
{
  "title": "审核通过事件",
  "sender": "aiassistants.approvalAssistant",
  "operate": "approvalNode.approved",  # 监听审核节点的通过操作
  "func": "services.workflowService.processApproval"
}

# 自定义事件处理逻辑
def customFunc(eventOutData):
    node_id = eventOutData.get("nodeId", "")
    node_type = eventOutData.get("nodeType", "")
    operation = eventOutData.get("operation", "")

    if operation == "beforeNodeRun":
        # 节点执行前的预处理
        print(f"节点 {node_id} 即将执行")
        # 可以进行数据验证、权限检查等

    elif operation == "approved":
        # 审核通过后的处理
        approval_data = eventOutData.get("approvalData", {})
        print(f"审核节点 {node_id} 审核通过")
        # 可以触发后续流程、发送通知等

    return eventOutData
```

### 与AI助理的协同工作
助理事件与AI助理组件深度集成，支持多种协同场景：

```python title="协同工作示例"
# 监听助理执行完成事件进行日志记录
{
  "sender": "aiassistants.customerService",
  "operate": "afterRun",
  "func": "services.logService.recordInteraction"
}

# 监听关键业务节点进行状态同步
{
  "sender": "aiassistants.businessProcessor",
  "operate": "paymentNode.afterNodeRun",
  "func": "services.paymentService.confirmPayment"
}

# 自定义协同处理逻辑
def customFunc(eventOutData):
    operation = eventOutData.get("operation", "")

    if operation == "afterRun":
        # 助理执行完成后的协同处理
        result = eventOutData.get("result", {})
        # 可以触发其他助理、发送通知、更新状态等

    return eventOutData
```

通过合理配置助理事件，可以实现AI助理行为的自动化监控、日志记录、状态同步等功能，为企业级AI应用提供完整的事件驱动支持。
