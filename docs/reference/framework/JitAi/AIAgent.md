---
sidebar_position: 4
slug: AIAgent
---

# AIAgent
AIAgent is the core execution engine for AI applications, implementing reasoning and action loop decision-making based on the ReAct architecture. It is responsible for tool orchestration, dynamic composition and invocation of various business tools and services, maintaining dialogue context, task execution state and data flow state, supporting decomposition and execution of complex business logic, and providing role-based tool access permission management.

The AIAgent element hierarchical structure is Meta (aiagents.Meta) → Type (aiagents.ReActType) → Instance. Developers can quickly create AIAgent instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements, or override the official aiagents.ReActType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```plaintext title="Recommended Directory Structure"
aiagents/
└── YourAgent/              # Agent name (customizable)
    ├── e.json              # Element configuration file
    ├── config.json         # Business configuration file
    └── prompt.md           # Prompt template file
```

#### e.json File
```json title="aiagents/YourAgent/e.json"
{
    "title": "Tool Testing Engineer",
    "type": "aiagents.ReActType",
    "backendBundleEntry": ".",
    "inputArgs": [
        {
            "name": "user_input",
            "dataType": "Stext",
            "title": "User Input"
        }
    ],
    "outputArgs": [
        {
            "name": "summary",
            "dataType": "Ltext",
            "title": "Test Result Summary"
        },
        {
            "name": "cases",
            "dataType": "JitList",
            "title": "Test Case List",
            "variableConfig": {
                "dataType": "JitDict",
                "title": "Test Case Details",
                "variableList": [
                    {
                        "name": "name",
                        "dataType": "Stext",
                        "title": "Case Name"
                    },
                    {
                        "name": "status",
                        "dataType": "Stext",
                        "title": "Case Status (PASS/FAIL)"
                    }
                ]
            }
        }
    ]
}
```

#### config.json File
```json title="aiagents/YourAgent/config.json"
{
    "description": "Specialized in tool testing, proficient in tool usage and test plan development",
    "llmElement": "llms.LLMJitAppDevelop",
    "llmConfig": {
        "model": "qwen-max-latest",
        "temperature": 0.7
    },
    "verbose": false,
    "tools": [
        {
            "type": "model",
            "name": "models.CustomerModel",
            "enableFunctionList": {
                "query": {}
            }
        }
    ]
}
```

#### prompt.md File
```markdown title="aiagents/YourAgent/prompt.md"
You are a test engineer who uses basic smoke testing to ensure tools can be called normally

# Tasks
1. Understand currently available tools, develop test plans, each tool only needs to test one simplest normal case
2. Execute tests according to the test plan, record test results
3. Generate test summary report

# Input Parameters 
{user_input}
```

#### Usage Example
```python title="AIAgent Usage Example"
# Get AIAgent instance
agent = app.getElement("aiagents.YourAgent")

# Define streaming callback function (optional)
def stream_callback(data):
    print(f"Streaming output: {data}")

# Run agent
result = agent.run(
    user_input="Please test the customer model query function",
    variables={'input_data': "Test customer model query function"},
    chatId="session_001",
    stream_callback=stream_callback
)

print("Execution result:", result)
```

## Element Configuration
### e.json Configuration
The AIAgent element configuration file defines the basic properties and input/output specifications of the agent.

| Field | Type | Required | Description |
|------|------|------|------|
| `title` | String | Yes | Agent display name |
| `type` | String | Yes | Must be "aiagents.ReActType" |
| `backendBundleEntry` | String | Yes | Backend entry, fixed as "." |
| `inputArgs` | Array | No | Input parameter definition list |
| `outputArgs` | Array | No | Output parameter definition list |

**inputArgs Configuration Items:**
- `name` - Parameter name
- `dataType` - Data type (such as Stext, JitDict, etc.)
- `title` - Parameter display name
- `required` - Whether required (optional)

**outputArgs Configuration Items:**
- `name` - Output field name
- `dataType` - Data type
- `title` - Field display name
- `variableConfig` - Internal structure definition for complex types
- `generic` - Associated model's fullName (applicable to RowData, RowList types)

### config.json Configuration
The business configuration file defines the agent's runtime parameters and tool configuration.

| Field | Type | Required | Description |
|------|------|------|------|
| `description` | String | No | Agent functionality description |
| `llmElement` | String | Yes | Large language model element's fullName |
| `llmConfig` | Object | Yes | LLM configuration parameters |
| `tools` | Array | No | Available tool configuration list, any instance element that declares functionList can be used as a tool |
| `saverDb` | String | No | Session storage database, default "databases.Default" |
| `knowledgeRepo` | Array | No | Knowledge base configuration list |
| `verbose` | Boolean | No | Whether to enable detailed logging |
| `callbackHandler` | String | No | Custom callback handler element's fullName |

**llmConfig Configuration Items:**
- `model` - Model name
- `temperature` - Temperature parameter (0.0-1.0)
- `streaming` - Whether to enable streaming output (optional)

**tools Configuration Items:**
- `type` - Tool type (model, service, ui, mcpServer, etc.)
- `name` - Instance element's fullName (must be an instance element that declares functionList in e.json)
- `enableFunctionList` - Enabled function list and its configuration

**knowledgeRepo Configuration Items:**
- `fullName` - Knowledge base element's fullName
- `enable` - Whether to enable
- `force` - Whether to force use

**Note**: The `name` field can be any instance element that declares functionList in e.json.

### prompt.md Configuration
The prompt template file defines the agent's system prompt, supporting variable interpolation.

**Variable Interpolation Syntax:**
```markdown
# Using variables in prompt.md
{variable_name}
```

**Template Example:**
```markdown
You are a {role} with the following capabilities: {capabilities}

# Current Task
{user_input}

# Work Requirements
1. Understand user requirements
2. Develop execution plan
3. Use available tools to complete tasks
4. Output structured results
```

## Methods 
### run
Run the AI agent to execute user-specified tasks.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| `user_input` | Stext | str | Yes | User input content |
| `variables` | JitDict | dict | No | Variable data dictionary |
| `chatId` | Stext | str | No | Session ID for session management |
| `stream_callback` | - | function | No | Streaming callback function (Python native function type) |

#### Return Value
Return Type: `JitList`

Contains all messages and final results during agent execution. Each element in the list is a dictionary structure containing message type, content, and metadata.

#### Usage Examples
```python title="Basic Usage Example"
# Get agent instance
agent = app.getElement("aiagents.TestAgent")

# Execute agent
result = agent.run(
    user_input="Analyze customer data",
    variables={
        'task': 'Data analysis',
        'target': 'Customer table'
    },
    chatId="session_123"
)
```

```python title="Example with Streaming Callback"
def my_callback(data):
    msg_type = data.get('type')
    if msg_type == 'REASONING_CONTENT':
        print(f"Reasoning process: {data['data']['content']}")
    elif msg_type == 'TOOL_CALL_START':
        print(f"Tool call started: {data['data']['outputArgs']['value']['toolName']}")

result = agent.run(
    user_input="Analyze customer data",
    variables={'task': 'Data analysis'},
    stream_callback=my_callback
)
```

## Properties
### initialized
**Type:** Boolean
**Description:** Whether the agent has completed initialization. Only successfully initialized agents can execute tasks normally.

### title
**Type:** String
**Description:** The agent's display name, sourced from the title field in the e.json configuration file.

### description
**Type:** String
**Description:** The agent's functionality description, sourced from the description field in the config.json configuration file.

### capabilities
**Type:** String
**Description:** The agent's capability description, with priority: capabilities in e.json > description in config.json > systemPrompt in config.json.

## Advanced Features
### Built-in Output Format Control
AIAgent automatically generates JSONSchema based on the `outputArgs` configuration in e.json, guiding the large language model to output structured data. Developers don't need to describe output formats in prompts.

### Tool Orchestration Configuration
**Important Principle: Any instance element that declares functionList in e.json can be called as an AIAgent tool.**

This means you can configure the following types of instance elements as AIAgent tools:
- **Model Instance Elements (models)**: Have built-in data operation functions (such as query, save, etc.)
- **Service Instance Elements (services)**: Custom business logic functions
- **Page Instance Elements (pages)**: Frontend interaction functionality
- **Any Other Instance Elements**: As long as functionList is declared in e.json, they can be called

AIAgent supports dynamic orchestration of multiple types of tools:

#### Basic Tool Configuration
**Minimal Configuration:**
```json title="Basic Model Tool Configuration"
{
    "type": "model",
    "name": "models.CustomerModel",
    "enableFunctionList": {
        "query": {}
    }
}
```

**Configuration with Permissions:**
```json title="Tool Configuration with Permissions"
{
    "type": "model",
    "name": "models.CustomerModel",
    "enableFunctionList": {
        "delete": {
            "humanInterrupt": true,
            "roles": ["roles.admin"]
        }
    }
}
```

#### Service Tool Configuration
```json title="Service Tool Configuration Example"
{
    "type": "service",
    "name": "services.CustomerService",
    "enableFunctionList": {
        "createCustomer": {},
        "updateCustomer": {}
    }
}
```

#### UI Tool Configuration
```json title="UI Tool Configuration Example"
{
    "type": "ui",
    "name": "pages.CustomerPage",
    "functionList": [
        {
            "name": "showForm",
            "title": "Show Form",
            "args": [
                {"name": "formData", "dataType": "JitDict", "title": "Form Data"}
            ],
            "returnType": "JitDict"
        }
    ],
    "enableFunctionList": {
        "showForm": {}
    }
}
```

#### MCP Server Tool Configuration
```json title="MCP Server Tool Configuration Example"
{
    "type": "mcpServer",
    "config": {
        "command": "python",
        "args": ["-m", "mcp_server"],
        "env": {
            "API_KEY": "your_api_key"
        }
    }
}
```

#### Other Instance Elements as Tool Configuration
```json title="Other Instance Elements as Tool Configuration Example"
{
    "type": "custom",
    "name": "processors.DataProcessor",
    "enableFunctionList": {
        "processData": {},
        "validateData": {}
    }
}
```

As long as the `processors.DataProcessor` instance element declares a functionList containing `processData` and `validateData` functions in its e.json, it can be called by AIAgent.

### Streaming Callback Processing 
Supports listening to detailed events such as reasoning processes and tool calls:

```python title="Detailed Streaming Callback Example"
def detailed_callback(data):
    msg_type = data.get('type')
    
    if msg_type == 'REASONING_CONTENT':
        print(f"Reasoning process: {data['data']['content']}")
    elif msg_type == 'TEXT_MESSAGE_CONTENT':
        print(f"Text message: {data['data']['content']}")
    elif msg_type == 'TOOL_CALL_START':
        tool_info = data['data']['outputArgs']['value']
        print(f"Starting tool call: {tool_info['toolName']}")
    elif msg_type == 'TOOL_CALL_END':
        print(f"Tool call completed")

result = agent.run(
    user_input="Process customer data",
    stream_callback=detailed_callback
)
```

| msg_type                | Meaning                   | Parameter Example                                                                                      |
|-------------------------|------------------------|----------------------------------------------------------------------------------------------|
| REASONING_CONTENT       | Large model reasoning process           | `{"type": "REASONING_CONTENT", "data": {"content": "..."}}`                   |
| TEXT_MESSAGE_CONTENT    | Large model output text message          | `{"type": "TEXT_MESSAGE_CONTENT", "data": {"content": "..."}}`                         |
| TOOL_CALL_START         | Tool call started           | `{"type": "TOOL_CALL_START", "data":{}}` |
| TOOL_CALL_END           | Tool call completed           | `{"type": "TOOL_CALL_END", "data": {}}`                                                      |

```json title="TOOL_CALL_START"
{
    "type": "TOOL_CALL_START",
    "data": {
        "eventType": "callTool",
        "outputArgs": {
            "dataType": "JitDict",
            "variableList": [
                {"name": "toolName", "title": "Tool Name", "dataType": "Stext"},
                {"name": "toolType", "title": "Tool Type", "dataType": "Stext"},
                {"name": "stage", "title": "Call Stage", "dataType": "Stext"},
                {"name": "args", "title": "Call Parameters", "dataType": "JitDict", "variableList": [{"name": "param1", "title": "Param1", "dataType": "Stext"}]}
            ],
            "value": {
                "toolName": "Table1.call",
                "toolType": "ui",
                "stage": "preEvent",
                "args": {
                    "param1": "value1"
                }
            },
        },
    },
}

```

```json title="TOOL_CALL_END"
{
    "type": "TOOL_CALL_END",
    "data": {
        "eventType": "callTool",
        "outputArgs": {
            "dataType": "JitDict",
            "variableList": [
                {"name": "toolName", "title": "Tool Name", "dataType": "Stext"},
                {"name": "toolType", "title": "Tool Type", "dataType": "Stext"},
                {"name": "stage", "title": "Call Stage", "dataType": "Stext"},
                {"name": "args", "title": "Call Parameters", "dataType": "Ltext"}]}
            ],
            "value": {
                "toolName": "Table1.call",
                "toolType": "ui",
                "stage": "postEvent",
                "args": "..."
            },
        },
    },
}

```

### Session State Management
Implements continuous dialogue and context memory through chatId:

```python title="Continuous Dialogue Example"
# First round of dialogue
result1 = agent.run(
    user_input="Analyze customer A's sales data",
    variables={'target': 'Customer A'},
    chatId="session_001"
)

# Second round of dialogue (based on previous context)
result2 = agent.run(
    user_input="Compare customer B's data and find differences",
    variables={'target': 'Customer B'},
    chatId="session_001"  # Same session ID, maintain context
)

# Third round of dialogue (continue based on previous analysis)
result3 = agent.run(
    user_input="Provide improvement suggestions",
    chatId="session_001"
)
```

### Permission Control Mechanism
Supports fine-grained permission control at the tool level:

```json title="Permission Control Configuration Example"
{
    "tools": [
        {
            "type": "model",
            "name": "models.SensitiveData",
            "enableFunctionList": {
                "query": {
                    "roles": ["roles.admin", "roles.analyst"]
                },
                "delete": {
                    "humanInterrupt": true,
                    "roles": ["roles.admin"]
                }
            }
        }
    ]
}
```

### Event Configuration
Configure event handling before and after tool calls for auditing and monitoring:

```json title="Event Configuration Example"
{
    "tools": [
        {
            "type": "model",
            "name": "models.AuditModel",
            "enableFunctionList": {
                "save": {
                    "preEvent": {"withData": true},   # Send event before call, with input parameters
                    "postEvent": {"withData": false}  # Send event after call, without return data
                },
                "delete": {
                    "preEvent": {"withData": false},
                    "postEvent": {"withData": true}
                }
            }
        }
    ]
}
```

### Streaming Callback Processing {#streaming-callback-processing}

```python title="Event Monitoring Example"
def event_callback(data):
    if data.get('type') == 'TOOL_CALL_START':
        print(f"About to call tool: {data['data']['outputArgs']['value']['toolName']}")
        # Record audit log
    elif data.get('type') == 'TOOL_CALL_END':
        print(f"Tool call completed")
        # Record operation result

agent.run(
    user_input="Delete expired data",
    stream_callback=event_callback
)
```

### Knowledge Base Integration
Configure and use knowledge bases to enhance agent capabilities:

```json title="Knowledge Base Configuration Example"
{
    "knowledgeRepo": [
        {
            "fullName": "rags.CompanyKnowledgeBase",
            "enable": true,
            "force": false
        },
        {
            "fullName": "rags.TechnicalDocuments",
            "enable": true,
            "force": true  # Force use this knowledge base
        }
    ]
}
```

#### Knowledge Base Working Mechanism
Knowledge base integration supports two working modes:

**Force Mode (force: true):**
- Agent will **query the knowledge base first** based on user inquiries, using the results as context supplementation and enhancement
- Retrieved knowledge will be automatically injected into the reasoning process to provide support for subsequent decisions
- Suitable for scenarios that must rely on specific knowledge bases, such as technical documentation queries, enterprise rules and regulations, etc.

**Non-force Mode (force: false):**
- Completely determined by user prompts and the large model whether and when to query the knowledge base
- Agent will determine whether additional knowledge support is needed based on the reasoning process
- Provides more flexible knowledge acquisition strategies, suitable for more general scenarios

```json title="Knowledge Base Mode Comparison Example"
{
    "knowledgeRepo": [
        {
            "fullName": "rags.TechnicalSpecs",
            "enable": true,
            "force": true  // Force mode: query knowledge base once before requesting large model
        },
        {
            "fullName": "rags.GeneralKnowledge",
            "enable": true,
            "force": false  // Non-force mode: query general knowledge on demand
        }
    ]
}
```

### Custom Callback Handlers {#custom-callback-handlers}

JitAi's ReActAgent is built on LangGraph, and callback handlers are used to monitor and handle various key process events such as Agent reasoning and tool calls. It is compatible with all callback methods defined in [langchain_core.callbacks.BaseCallbackHandler](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackHandler.html#langchain_core.callbacks.base.BaseCallbackHandler) as well as pre_model_hook and post_model_hook functions (refer to the definitions of pre_model_hook and post_model_hook in [LangChain official documentation](https://langchain-ai.github.io/langgraph/reference/agents/?h=create_react#langgraph.prebuilt.chat_agent_executor.create_react_agent)).

Through custom callback handlers, developers can flexibly intervene in various stages such as before and after model reasoning, before and after tool calls, etc., to implement advanced features such as logging, parameter validation, and context enhancement.

```python title="Custom Callback Handler Implementation"
# aiagents/CustomCallback/service.py
from aiagents.ReActType import CustomAgentCallbackHandler
from typing import Any, Dict

class CustomCallback(CustomAgentCallbackHandler):
    def pre_model_hook(self, state: Dict[str, Any], **kwargs) -> Dict[str, Any]:
        # Custom processing before model call
        print(f"Pre-model processing: {state.get('messages', [])[-1]}")
        return state

    def post_model_hook(self, state: Dict[str, Any], **kwargs) -> Dict[str, Any]:
        # Custom processing after model call
        print(f"Post-model processing: {state.get('messages', [])[-1]}")
        return state

    def on_tool_start(self, serialized: dict, input_str: str, **kwargs) -> Any:
        # Processing when tool call starts
        tool_name = serialized.get('name', 'unknown')
        print(f"Starting tool call: {tool_name}")

    def on_tool_end(self, output: str, **kwargs) -> Any:
        # Processing when tool call ends
        print(f"Tool call result: {output[:100]}...")
```

```json title="Configure and Use Custom Callback"
{
    "llmElement": "llms.LLMJitAppDevelop",
    "callbackHandler": "aiagents.CustomCallback",
    "tools": [...]
}
```

No additional code is needed when using, the callback handler will work automatically:
```python
result = agent.run(user_input="Process data")
```
