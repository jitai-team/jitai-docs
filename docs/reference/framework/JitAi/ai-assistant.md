---
sidebar_position: 5
slug: ai-assistant
title: "AI Assistant Reference"
description: "AI Assistant Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "AI Assistant"
---

# AI Assistant
AI Assistant is the unified interface for AI application-user interaction, implementing intelligent routing and multi-Agent collaboration based on LangGraph architecture. It is responsible for routing decisions, intelligent dialogue, and workflow control, supporting visual orchestration, complex business logic, and one-click integration capabilities.

The AI Assistant element hierarchical structure is Meta (aiassistants.Meta) → Type (aiassistants.NormalType) → Instance. Developers can quickly create AI Assistant instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements, or override the official aiassistants.NormalType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
aiassistants/
├── myassistant/
│   ├── e.json          # Element definition file
│   └── config.json     # Business configuration file
```

#### e.json File
```json title="aiassistants/myassistant/e.json"
{
  "backendBundleEntry": ".",
  "frontBundleEntry": "./config.json",
  "icon": "AIzhushou1",
  "title": "Intelligent Customer Service",
  "type": "aiassistants.NormalType",
  "extendType": "self"
}
```

#### Business Configuration File
```json title="aiassistants/myassistant/config.json"
{
  "apiKey": "{{llmApiKey}}",
  "baseUrl": "{{llmBaseUrl}}",
  "model": "{{llmName}}",
  "temperature": 0.7,
  "saverDb": "databases.Default",
  "sessionTimeout": 3600,
  "nodes": {
    "start": {
      "id": "start",
      "type": "start",
      "title": "Start",
      "position": {"x": 90, "y": 100}
    },
    "aiagent_001": {
      "id": "aiagent_001",
      "type": "aiagent",
      "title": "Intelligent Customer Service",
      "agent": "aiagents.CustomerService",
      "position": {"x": 680, "y": 100}
    }
  },
  "edges": {
    "start-right@aiagent_001-left": {
      "id": "start-right@aiagent_001-left",
      "sourceNode": "start",
      "targetNode": "aiagent_001",
      "sourcePort": "start-right",
      "targetPort": "aiagent_001-left",
      "argMapping": {
        "input_data": "start.userInput"
      }
    }
  },
  "welcomeMessage": "Happy to serve you! How can I help you?",
  "prologues": [
    "What is the element mechanism?",
    "Does JitAi App support private deployment?"
  ]
}
```

#### Usage Example
```python title="Using AI Assistant"
# Get AI Assistant instance
assistant = app.getElement("aiassistants.myassistant")

# Start conversation
result = assistant.run(
    message="Hello, I want to learn about product features",
    chatId="chat_001",
    streamMode=True
)

# Handle streaming response
for chunk in result:
    print(chunk)
```

## Element Configuration
### e.json Configuration
| Field | Description | Required |
|-----|------|------|
| backendBundleEntry | Backend entry, fixed as "." | Yes |
| frontBundleEntry | Frontend entry, points to config.json | Yes |
| type | Element type, fixed as "aiassistants.NormalType" | Yes |
| title | Assistant display name | Yes |
| icon | Icon identifier | No |
| extendType | Extension type, generally "self" | No |

### config.json Configuration
#### Basic Configuration
| Configuration | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| apiKey | Stext | str | Yes | LLM API key |
| baseUrl | Stext | str | Yes | LLM service address |
| model | Stext | str | Yes | Model name |
| temperature | Numeric | float | No | Temperature parameter (0-1) |
| maxTokens | Numeric | int | No | Maximum token count |
| saverDb | Stext | str | Yes | Checkpoint database |
| sessionTimeout | Numeric | int | No | Session timeout (seconds) |
| welcomeMessage | Stext | str | No | Welcome message |
| prologues | JitList | list | No | Preset question list |

#### Node Configuration
**Supported Node Types:**
- **start**: Start node, workflow entry point
- **router**: Router node, implements intelligent routing
- **aiagent**: AI agent node, executes specific tasks
- **humanaction**: Human intervention node
- **end**: End node, workflow exit point

#### Edge Configuration
| Configuration | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| id | Stext | str | Yes | Unique identifier for the edge |
| sourceNode | Stext | str | Yes | Source node ID |
| targetNode | Stext | str | Yes | Target node ID |
| sourcePort | Stext | str | Yes | Source port |
| targetPort | Stext | str | Yes | Target port |
| argMapping | JitDict | dict | No | Parameter mapping relationship |

## Methods 
### run
Initiate AI Assistant conversation, supporting both streaming and non-streaming modes.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| message | Ltext | str | Yes | User input message |
| chatId | Stext | str | No | Session ID, auto-generated if not provided |
| attachments | File | list | No | Attachment list |
| caller | Stext | str | No | Caller identifier |
| streamMode | Boolean | bool | No | Whether to use streaming mode, default True |

#### Return Value
- **Streaming Mode**: Returns generator object, outputs processing results step by step
- **Non-streaming Mode**: Returns final processing result dictionary

#### Usage Example
```python title="Streaming Conversation Example"
assistant = app.getElement("aiassistants.myassistant")

# Streaming processing
for chunk in assistant.run(
    message="Help me analyze this problem",
    chatId="chat_001",
    streamMode=True
):
    print(f"Output: {chunk.get('content', '')}")
    if chunk.get('finished'):
        print("Conversation completed")
        break
```

```python title="Non-streaming Conversation Example"
# Non-streaming processing
result = assistant.run(
    message="Simple query question",
    streamMode=False
)
print(f"Final result: {result}")
```

### resume
Resume interrupted workflow execution, used to continue processing after human intervention.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| chatId | Stext | str | Yes | Session ID |
| nodeId | Stext | str | Yes | Resume node ID |
| interruptResume | - | dict | No | Resume data |

#### Return Value
Returns generator object, outputs resumed processing results step by step.

#### Usage Example
```python title="Resume Workflow Example"
# Resume execution of specified node
for chunk in assistant.resume(
    chatId="chat_001",
    nodeId="aiagent_001",
    interruptResume={"user_confirm": True}
):
    print(chunk)
```

### terminate
Terminate workflow execution for the specified session.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| chatId | Stext | str | Yes | Session ID to terminate |

#### Return Value
Returns boolean value indicating whether the termination operation was successful.

#### Usage Example
```python title="Terminate Session Example"
success = assistant.terminate(chatId="chat_001")
if success:
    print("Session terminated successfully")
```

### getChatStatus
Get the current status of the specified session.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-------|-----|-----------|------|------|
| chatId | Stext | str | Yes | Session ID |

#### Return Value
Returns string indicating session status:
- "running": Running
- "terminated": Terminated
- "completed": Completed
- None: Session does not exist

#### Usage Example
```python title="Query Session Status Example"
status = assistant.getChatStatus(chatId="chat_001")
print(f"Session status: {status}")
```

## Properties
### None
AI Assistant element does not currently provide public property access interfaces.

## Advanced Features
### Streaming Processing
AI Assistant supports real-time streaming output, suitable for long conversations and complex reasoning scenarios.

### Session Management
Built-in session state management, supports session resumption, termination, and status queries.

### Workflow Control
Implements complex workflow orchestration based on LangGraph, supporting conditional branches, parallel processing, and human intervention.
