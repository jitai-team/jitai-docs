---
sidebar_position: 6
---

# Agent事件

Agent事件是专用于AIAgent相关操作的事件处理，它负责监听Agent的创建、执行、完成等状态变化，支持Agent任务启动、进度更新、结果回调等关键环节的事件触发和处理，为Agent间协作和任务链式执行提供统一的事件处理机制。

Agent事件元素分层结构为Meta（events.Meta） → Type（events.AIAgentType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Agent事件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.AIAgentType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构

```text title="推荐目录结构"
events/
└── agentToolEvent/
    ├── e.json              # 事件配置文件
    ├── inner.py           # 业务逻辑代码
    └── __init__.py        # 初始化文件
```

#### e.json文件

```json title="基础配置示例"
{
  "title": "Agent工具事件",
  "type": "events.AIAgentType",
  "sender": "aiagents.ModelKnowTest",
  "stage": "preEvent",
  "func": "services.standardServicesTested.sayHello",
  "asyncType": false,
  "backendBundleEntry": "."
}
```

#### 调用示例

```python title="Agent事件使用示例"
# 获取Agent事件实例
agent_event = app.getElement("events.agentToolEvent")

# Agent工具调用时会自动触发事件
# 事件处理逻辑在AIAgent执行工具时自动执行

# 也可以手动触发事件（用于测试）
output_data = {
    "toolName": "searchTool",
    "stage": "preEvent",
    "args": ["搜索关键词"],
    "kwargs": {}
}

# 事件会根据配置的stage和func自动处理
```

## 元素配置

### e.json配置

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| title | Stext | str | 是 | 事件标题，用于识别事件用途 |
| type | Stext | str | 是 | 固定值：events.AIAgentType |
| sender | Stext | str | 是 | 事件发送者，通常为AIAgent的fullName |
| stage | Stext | str | 是 | 事件触发阶段：preEvent（工具调用前）或postEvent（工具调用后） |
| func | Stext | str | 是 | 事件处理函数的fullName，格式：元素名.函数名 |
| asyncType | JitBool | bool | 否 | 是否异步执行，默认false |
| backendBundleEntry | Stext | str | 否 | 后端入口点，默认"." |

### 业务逻辑配置

Agent事件支持在`inner.py`中定义自定义处理逻辑：

```python title="业务逻辑配置示例"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from jit.commons.utils.logger import log

def customFunc(eventOutData):
    """
    自定义事件处理函数
    :param eventOutData: 事件输出数据，包含toolName、stage、args等信息
    """
    tool_name = eventOutData.get("toolName", "")
    stage = eventOutData.get("stage", "")

    # 根据不同阶段执行相应处理逻辑
    log.info(f"工具 {tool_name} 在 {stage} 阶段被调用")

    return eventOutData
```

## 方法

### handleNode

事件处理的核心方法，负责解析和处理Agent工具调用事件。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| node | EventNode | object | 是 | 事件节点对象，包含事件配置信息 |
| args | JitList | tuple | 否 | 位置参数，包含事件输出数据 |
| kwargs | JitDict | dict | 否 | 关键字参数 |

#### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| node | EventNode | 处理后的事件节点 |
| args | tuple | 处理后的参数 |
| kwargs | dict | 处理后的关键字参数 |

#### 使用示例

```python title="handleNode使用示例"
# Agent事件的handleNode方法会在Agent调用工具时自动执行
# 开发者通常不需要直接调用此方法

# 获取事件实例
agent_event = app.getElement("events.agentToolEvent")

# 模拟事件节点数据
class MockEventNode:
    def __init__(self):
        self.remark = ""
        self.event = MockEvent()

class MockEvent:
    def __init__(self):
        self.func = "services.standardServicesTested.sayHello"

# 模拟事件处理
output_args = [{
    "toolName": "searchTool",
    "stage": "preEvent"
}]

node = MockEventNode()
processed_node, processed_args, processed_kwargs = agent_event.handleNode(
    node,
    output_args
)

print(f"事件备注: {processed_node.remark}")
# 输出: 事件备注: 调用searchTool工具前
```

## 属性

### stage

事件触发阶段标识，决定事件在Agent工具调用的哪个时间点触发。

**类型**: `str`
**可选值**:
- `preEvent`: 工具调用前触发，可用于参数验证、权限检查等预处理
- `postEvent`: 工具调用后触发，可用于结果处理、状态更新等后处理

**参数说明**:
- `preEvent`: 传入JitDict类型参数，包含工具名称(toolName)和工具入参(args为JitDict类型)
- `postEvent`: 传入JitDict类型参数，包含工具名称(toolName)和工具入参(args为文本类型)

**使用示例**:
```python
agent_event = app.getElement("events.agentToolEvent")
print(f"事件阶段: {agent_event.stage}")
```

### sender

事件发送者标识，通常为触发事件的AIAgent元素的fullName，格式：`aiagents.{AgentName}`。

### func

关联的事件处理函数fullName，格式：`{元素名}.{函数名}`。

### asyncType

异步执行标识，控制事件是否以异步方式执行，默认为`false`。

## 高级特性

### 权限控制和安全验证

Agent事件可用于实现工具调用的权限控制和安全验证：

```python title="权限控制示例"
# inner.py
def customFunc(eventOutData):
    tool_name = eventOutData.get("toolName", "")
    stage = eventOutData.get("stage", "")

    if stage == "preEvent" and tool_name == "sensitiveDataTool":
        # 敏感工具调用前的权限检查
        if not check_permission():
            raise Exception("无权限调用敏感工具")

    return eventOutData

def check_permission():
    # 权限检查逻辑
    return True
```

### 多Agent协作事件

Agent事件支持多个Agent间的协作场景，通过事件机制实现Agent状态同步和任务协调。

```python title="多Agent协作配置"
# 主Agent的事件配置
{
  "title": "主Agent协作事件",
  "type": "events.AIAgentType",
  "sender": "aiagents.MainAgent",
  "stage": "postEvent",
  "func": "services.agentCoordinator.notifySubAgents"
}

# 协作处理逻辑
def customFunc(eventOutData):
    tool_name = eventOutData.get("toolName", "")

    if tool_name == "taskDistributor":
        # 任务分发完成后通知子Agent
        sub_tasks = eventOutData.get("result", {}).get("subTasks", [])

        for task in sub_tasks:
            agent_name = task.get("assignedAgent")
            if agent_name:
                # 触发子Agent的任务开始事件
                notify_sub_agent(agent_name, task)

    return eventOutData

def notify_sub_agent(agent_name, task):
    # 通知子Agent开始任务
    sub_agent = app.getElement(f"aiagents.{agent_name}")
    if sub_agent:
        sub_agent.executeTask(task)
```

### 任务链式执行

通过Agent事件可以实现复杂的任务链式执行，一个Agent的完成事件触发下一个Agent的开始。

```python title="任务链式执行配置"
# 配置任务链事件
{
  "title": "任务链执行事件",
  "type": "events.AIAgentType",
  "sender": "aiagents.DataProcessor",
  "stage": "postEvent",
  "func": "services.taskChain.nextStep"
}

# 任务链处理逻辑
def customFunc(eventOutData):
    current_tool = eventOutData.get("toolName", "")
    result = eventOutData.get("result", {})

    # 定义任务链配置
    task_chain = {
        "dataCollector": "dataProcessor",
        "dataProcessor": "dataAnalyzer",
        "dataAnalyzer": "reportGenerator"
    }

    # 获取下一个任务
    next_agent_name = task_chain.get(current_tool)

    if next_agent_name and result.get("success"):
        # 启动下一个Agent
        next_agent = app.getElement(f"aiagents.{next_agent_name}")
        if next_agent:
            # 将当前结果作为下一个Agent的输入
            next_agent.start(input_data=result.get("data"))

            # 记录任务链执行日志
            print(f"任务链: {current_tool} -> {next_agent_name}")

    return eventOutData
```
