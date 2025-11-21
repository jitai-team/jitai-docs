---
sidebar_position: 6
slug: agent-events
title: "Agent Events Reference"
description: "Agent Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Agent Events"
---

# Agent Events
Agent events are specialized event handling for AIAgent-related operations. They are responsible for monitoring state changes such as Agent creation, execution, and completion, supporting event triggering and processing for key aspects like Agent task startup, progress updates, and result callbacks, providing a unified event handling mechanism for Agent collaboration and task chain execution.

The Agent event element hierarchical structure is Meta (events.Meta) → Type (events.AIAgentType) → Instance. Developers can quickly create Agent event instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements, or override the official events.AIAgentType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
events/
└── agentToolEvent/
    ├── e.json              # Event configuration file
    ├── inner.py           # Business logic code
    └── __init__.py        # Initialization file
```

#### e.json File
```json title="Basic Configuration Example"
{
  "title": "Agent Tool Event",
  "type": "events.AIAgentType",
  "sender": "aiagents.ModelKnowTest",
  "stage": "preEvent",
  "func": "services.standardServicesTested.sayHello",
  "asyncType": false,
  "backendBundleEntry": "."
}
```

#### Usage Example
```python title="Agent Event Usage Example"
# Get Agent event instance
agent_event = app.getElement("events.agentToolEvent")

# Events are automatically triggered when Agent tools are called
# Event processing logic is automatically executed when AIAgent executes tools
# Events can also be manually triggered (for testing)
output_data = {
    "toolName": "searchTool",
    "stage": "preEvent",
    "args": ["Search keywords"],
    "kwargs": {}
}

# Events are automatically processed according to configured stage and func
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| title | Stext | str | Yes | Event title for identifying event purpose |
| type | Stext | str | Yes | Fixed value: events.AIAgentType |
| sender | Stext | str | Yes | Event sender, usually the fullName of AIAgent |
| stage | Stext | str | Yes | Event trigger stage: preEvent (before tool call) or postEvent (after tool call) |
| func | Stext | str | Yes | Event handler function fullName, format: elementName.functionName |
| asyncType | JitBool | bool | No | Whether to execute asynchronously, default false |
| backendBundleEntry | Stext | str | No | Backend entry point, default "." |

### Business Logic Configuration
Agent events support defining custom processing logic in `inner.py`:

```python title="Business Logic Configuration Example"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from jit.commons.utils.logger import log

def customFunc(eventOutData):
    """
    Custom event handler function
    :param eventOutData: Event output data containing toolName, stage, args and other information
    """
    tool_name = eventOutData.get("toolName", "")
    stage = eventOutData.get("stage", "")

    # Execute corresponding processing logic based on different stages
    log.info(f"Tool {tool_name} called at {stage} stage")

    return eventOutData
```

## Methods 
### handleNode
The core method for event processing, responsible for parsing and handling Agent tool call events.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| node | EventNode | object | Yes | Event node object containing event configuration information |
| args | JitList | tuple | No | Positional parameters containing event output data |
| kwargs | JitDict | dict | No | Keyword parameters |

#### Return Value
| Return Value | Type | Description |
|--------|------|------|
| node | EventNode | Processed event node |
| args | tuple | Processed parameters |
| kwargs | dict | Processed keyword parameters |

#### Usage Example
```python title="handleNode Usage Example"
# The handleNode method of Agent events is automatically executed when Agent calls tools
# Developers usually don't need to call this method directly
# Get event instance
agent_event = app.getElement("events.agentToolEvent")

# Simulate event node data
class MockEventNode:
    def __init__(self):
        self.remark = ""
        self.event = MockEvent()

class MockEvent:
    def __init__(self):
        self.func = "services.standardServicesTested.sayHello"

# Simulate event processing
output_args = [{
    "toolName": "searchTool",
    "stage": "preEvent"
}]

node = MockEventNode()
processed_node, processed_args, processed_kwargs = agent_event.handleNode(
    node,
    output_args
)

print(f"Event remark: {processed_node.remark}")
# Output: Event remark: Before calling searchTool
```

## Properties
### stage
Event trigger stage identifier that determines at which point during Agent tool calls the event is triggered.

**Type**: `str`
**Optional Values**:
- `preEvent`: Triggered before tool call, can be used for parameter validation, permission checking and other preprocessing
- `postEvent`: Triggered after tool call, can be used for result processing, status updates and other post-processing

**Parameter Description**:
- `preEvent`: Passes JitDict type parameters containing tool name (toolName) and tool input parameters (args as JitDict type)
- `postEvent`: Passes JitDict type parameters containing tool name (toolName) and tool input parameters (args as text type)

**Usage Example**:
```python
agent_event = app.getElement("events.agentToolEvent")
print(f"Event stage: {agent_event.stage}")
```

### sender
Event sender identifier, usually the fullName of the AIAgent element that triggers the event, format: `aiagents.{AgentName}`.

### func
Associated event handler function fullName, format: `{elementName}.{functionName}`.

### asyncType
Asynchronous execution identifier that controls whether the event executes asynchronously, default is `false`.

## Advanced Features
### Permission Control and Security Validation
Agent events can be used to implement permission control and security validation for tool calls:

```python title="Permission Control Example"
# inner.py
def customFunc(eventOutData):
    tool_name = eventOutData.get("toolName", "")
    stage = eventOutData.get("stage", "")

    if stage == "preEvent" and tool_name == "sensitiveDataTool":
        # Permission check before sensitive tool call
        if not check_permission():
            raise Exception("No permission to call sensitive tool")

    return eventOutData

def check_permission():
    # Permission check logic
    return True
```

### Multi-Agent Collaboration Events
Agent events support multi-Agent collaboration scenarios, implementing Agent state synchronization and task coordination through event mechanisms.

```python title="Multi-Agent Collaboration Configuration"
# Main Agent event configuration
{
  "title": "Main Agent Collaboration Event",
  "type": "events.AIAgentType",
  "sender": "aiagents.MainAgent",
  "stage": "postEvent",
  "func": "services.agentCoordinator.notifySubAgents"
}

# Collaboration processing logic
def customFunc(eventOutData):
    tool_name = eventOutData.get("toolName", "")

    if tool_name == "taskDistributor":
        # Notify sub-Agents after task distribution completion
        sub_tasks = eventOutData.get("result", {}).get("subTasks", [])

        for task in sub_tasks:
            agent_name = task.get("assignedAgent")
            if agent_name:
                # Trigger sub-Agent task start event
                notify_sub_agent(agent_name, task)

    return eventOutData

def notify_sub_agent(agent_name, task):
    # Notify sub-Agent to start task
    sub_agent = app.getElement(f"aiagents.{agent_name}")
    if sub_agent:
        sub_agent.executeTask(task)
```

### Task Chain Execution
Complex task chain execution can be implemented through Agent events, where one Agent's completion event triggers the next Agent's start.

```python title="Task Chain Execution Configuration"
# Configure task chain events
{
  "title": "Task Chain Execution Event",
  "type": "events.AIAgentType",
  "sender": "aiagents.DataProcessor",
  "stage": "postEvent",
  "func": "services.taskChain.nextStep"
}

# Task chain processing logic
def customFunc(eventOutData):
    current_tool = eventOutData.get("toolName", "")
    result = eventOutData.get("result", {})

    # Define task chain configuration
    task_chain = {
        "dataCollector": "dataProcessor",
        "dataProcessor": "dataAnalyzer",
        "dataAnalyzer": "reportGenerator"
    }

    # Get next task
    next_agent_name = task_chain.get(current_tool)

    if next_agent_name and result.get("success"):
        # Start next Agent
        next_agent = app.getElement(f"aiagents.{next_agent_name}")
        if next_agent:
            # Use current result as input for next Agent
            next_agent.start(input_data=result.get("data"))

            # Log task chain execution
            print(f"Task chain: {current_tool} -> {next_agent_name}")

    return eventOutData
```
