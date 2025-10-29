---
sidebar_position: 7
slug: assistant-events
description: "助理事件 API 参考文档。完整的规格说明、方法和示例。"
---

# 助理事件
助理事件是专用于AI助理交互的事件处理，它负责监听AI助理的执行过程、状态变化和用户交互，提供用户意图识别、助理切换、会话管理等核心交互事件的处理能力。

助理事件元素分层结构为Meta（events.Meta） → Type（events.AIAssistantType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建助理事件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.AIAssistantType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
events/
└── testAssistantEvents/
    ├── __init__.py
    ├── e.json
    └── inner.py
```

#### e.json文件
```json title="e.json配置文件"
{
  "asyncType": false,
  "title": "测试助理事件",
  "sender": "aiassistants.toolTest",
  "operate": "afterRun",
  "func": "services.standardServicesTested.sayHello",
  "backendBundleEntry": ".",
  "type": "events.AIAssistantType"
}
```

#### 业务逻辑代码
```python title="inner.py文件"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes

def customFunc(eventOutData):
    """
    自定义事件处理函数
    :param eventOutData: 事件输出数据
    """
    # 处理事件数据的业务逻辑
    pass
```

#### 调用示例
```python title="获取和使用助理事件"
# 获取助理事件实例
event = app.getElement("events.testAssistantEvents")

# 事件会自动在AI助理执行afterRun时触发
# 调用指定的目标函数：services.standardServicesTested.sayHello
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| type | str | str | 是 | 固定值：events.AIAssistantType |
| title | str | str | 是 | 事件显示名称 |
| sender | str | str | 是 | 事件发送方，通常为AI助理的fullName |
| operate | str | str | 是 | 事件触发时机：基础时机(beforeRun/afterRun)、节点时机(nodeId.beforeNodeRun等)、人工操作时机(nodeId.approved等) |
| func | str | str | 是 | 事件触发时调用的目标函数 |
| asyncType | bool | bool | 否 | 是否异步执行，默认false |
| backendBundleEntry | str | str | 是 | 固定值："." |

### 业务逻辑代码配置
inner.py文件用于定义自定义的事件处理逻辑：

```python title="自定义处理函数示例"
def customFunc(eventOutData):
    """
    自定义事件处理函数
    :param eventOutData: 事件输出的数据
    """
    # 处理事件数据的业务逻辑
    print(f"助理事件触发: {eventOutData}")
    return eventOutData
```

## 方法 
### getSender
获取完整的事件发送方标识，格式为"sender.operate"。

#### 参数详解
无参数

#### 返回值
| 类型 | 说明 |
|---|---|
| str | 事件发送方的完整标识 |

#### 使用示例
```python title="获取事件发送方"
event = app.getElement("events.testAssistantEvents")
sender = event.getSender()
print(sender)  # 输出：aiassistants.toolTest.afterRun
```

### isValid
验证事件是否有效，用于判断当前条件下事件是否应该触发。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| rowObj | object | object | 否 | 数据行对象 |
| args | tuple | tuple | 否 | 额外参数 |
| kwargs | dict | dict | 否 | 关键字参数 |

#### 返回值
| 类型 | 说明 |
|---|---|
| bool | 事件是否有效 |

#### 使用示例
```python title="验证事件有效性"
event = app.getElement("events.testAssistantEvents")
is_valid = event.isValid()
print(is_valid)  # 输出：True
```

### handleNode
处理事件节点，解析事件参数并准备调用目标函数。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| node | object | object | 是 | 事件节点对象 |
| args | tuple | tuple | 否 | 传递给目标函数的参数 |
| kwargs | dict | dict | 否 | 传递给目标函数的关键字参数 |

#### 返回值
| 类型 | 说明 |
|---|---|
| tuple | 返回处理后的(node, args, kwargs) |

#### 使用示例
```python title="处理事件节点"
event = app.getElement("events.testAssistantEvents")
# 通常由事件系统自动调用，开发者一般不需要直接使用
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
