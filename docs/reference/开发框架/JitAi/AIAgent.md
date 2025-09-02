---
sidebar_position: 4
---

# AIAgent

AIAgent是AI应用核心执行引擎，基于ReAct架构实现推理与行动的循环决策。它负责工具编排、动态组合和调用各种业务工具和服务，维护对话上下文、任务执行状态和数据流转状态，支持复杂业务逻辑的分解和执行，并提供基于用户角色的工具访问权限管理。

AIAgent元素分层结构为Meta（aiagents.Meta） → Type（aiagents.ReActType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AIAgent实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的aiagents.ReActType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构

```plaintext title="推荐的目录结构"
aiagents/
└── YourAgent/              # 代理名称（可自定义）
    ├── e.json              # 元素配置文件
    ├── config.json         # 业务配置文件
    └── prompt.md           # 提示词模板文件
```

#### e.json文件

```json title="aiagents/YourAgent/e.json"
{
    "title": "工具测试工程师",
    "type": "aiagents.ReActType",
    "backendBundleEntry": ".",
    "inputArgs": [
        {
            "name": "user_input",
            "dataType": "Stext",
            "title": "用户输入"
        }
    ],
    "outputArgs": [
        {
            "name": "summary",
            "dataType": "Ltext",
            "title": "测试结果总结"
        },
        {
            "name": "cases",
            "dataType": "JitList",
            "title": "测试用例列表",
            "variableConfig": {
                "dataType": "JitDict",
                "title": "测试用例详情",
                "variableList": [
                    {
                        "name": "name",
                        "dataType": "Stext",
                        "title": "用例名称"
                    },
                    {
                        "name": "status",
                        "dataType": "Stext",
                        "title": "用例状态(PASS/FAIL)"
                    }
                ]
            }
        }
    ]
}
```

#### config.json文件

```json title="aiagents/YourAgent/config.json"
{
    "description": "专注于工具测试，擅长测试工具的使用和测试计划的制定",
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

#### prompt.md文件

```markdown title="aiagents/YourAgent/prompt.md"
你是一个测试工程师，用基本的冒烟测试确保工具能够被正常调用

# 任务
1. 理解目前可用的工具，制定测试计划，每个工具只需要测一个最简单的正常case即可
2. 按照测试计划执行测试，记录测试结果
3. 生成测试总结报告

# 输入参数
{user_input}
```

#### 调用示例

```python title="调用AIAgent示例"
# 获取AIAgent实例
agent = app.getElement("aiagents.YourAgent")

# 定义流式回调函数（可选）
def stream_callback(data):
    print(f"流式输出: {data}")

# 运行代理
result = agent.run(
    user_input="请测试客户模型的查询功能",
    variables={'input_data': "测试客户模型查询功能"},
    chatId="session_001",
    stream_callback=stream_callback
)

print("执行结果:", result)
```

## 元素配置

### e.json配置

AIAgent的元素配置文件定义了代理的基本属性和输入输出规范。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | String | 是 | 代理显示名称 |
| `type` | String | 是 | 必须为"aiagents.ReActType" |
| `backendBundleEntry` | String | 是 | 后端入口，固定为"." |
| `inputArgs` | Array | 否 | 输入参数定义列表 |
| `outputArgs` | Array | 否 | 输出参数定义列表 |

**inputArgs配置项：**
- `name` - 参数名称
- `dataType` - 数据类型（如Stext、JitDict等）
- `title` - 参数显示名称
- `required` - 是否必填（可选）

**outputArgs配置项：**
- `name` - 输出字段名称
- `dataType` - 数据类型
- `title` - 字段显示名称
- `variableConfig` - 复合类型的内部结构定义
- `generic` - 关联模型的fullName（适用于RowData、RowList类型）

### config.json配置

业务配置文件定义了代理的运行时参数和工具配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `description` | String | 否 | 代理功能描述 |
| `llmElement` | String | 是 | 大语言模型元素的fullName |
| `llmConfig` | Object | 是 | LLM配置参数 |
| `tools` | Array | 否 | 可用工具配置列表，任何声明了functionList的实例元素都可以作为工具 |
| `saverDb` | String | 否 | 会话存储数据库，默认"databases.Default" |
| `knowledgeRepo` | Array | 否 | 知识库配置列表 |
| `verbose` | Boolean | 否 | 是否开启详细日志 |
| `callbackHandler` | String | 否 | 自定义回调处理器元素的fullName |

**llmConfig配置项：**
- `model` - 模型名称
- `temperature` - 温度参数（0.0-1.0）
- `streaming` - 是否启用流式输出（可选）

**tools配置项：**
- `type` - 工具类型（model、service、ui、mcpServer等）
- `name` - 实例元素的fullName（必须是在e.json中声明了functionList的实例元素）
- `enableFunctionList` - 启用的功能列表及其配置

**knowledgeRepo配置项：**
- `fullName` - 知识库元素的fullName
- `enable` - 是否启用
- `force` - 是否强制使用

**说明**：`name`字段可以是任何在e.json中声明了functionList的实例元素。

### prompt.md配置

提示词模板文件定义了代理的系统提示词，支持变量插值。

**变量插值语法：**
```markdown
# 在prompt.md中使用变量
{variable_name}
```

**模板示例：**
```markdown
你是一个{role}，具有以下能力：{capabilities}

# 当前任务
{user_input}

# 工作要求
1. 理解用户需求
2. 制定执行计划
3. 使用可用工具完成任务
4. 输出结构化结果
```

## 方法

### run

运行AI代理，执行用户指定的任务。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| `user_input` | Stext | str | 是 | 用户输入内容 |
| `variables` | JitDict | dict | 否 | 变量数据字典 |
| `chatId` | Stext | str | 否 | 会话ID，用于会话管理 |
| `stream_callback` | - | function | 否 | 流式回调函数（Python原生函数类型） |

#### 返回值

返回类型：`JitList`

包含代理执行过程中的所有消息和最终结果。列表中的每个元素都是一个包含消息类型、内容和元数据的字典结构。

#### 使用示例

```python title="基础调用示例"
# 获取代理实例
agent = app.getElement("aiagents.TestAgent")

# 执行代理
result = agent.run(
    user_input="分析客户数据",
    variables={
        'task': '数据分析',
        'target': '客户表'
    },
    chatId="session_123"
)
```

```python title="带流式回调的示例"
def my_callback(data):
    msg_type = data.get('type')
    if msg_type == 'REASONING_CONTENT':
        print(f"推理过程: {data['data']['content']}")
    elif msg_type == 'TOOL_CALL_START':
        print(f"工具调用开始: {data['data']['outputArgs']['value']['toolName']}")

result = agent.run(
    user_input="分析客户数据",
    variables={'task': '数据分析'},
    stream_callback=my_callback
)
```

## 属性

### initialized

**类型：** Boolean
**说明：** 代理是否已完成初始化。只有初始化成功的代理才能正常执行任务。

### title

**类型：** String
**说明：** 代理的显示名称，来源于e.json配置文件中的title字段。

### description

**类型：** String
**说明：** 代理的功能描述，来源于config.json配置文件中的description字段。

### capabilities

**类型：** String
**说明：** 代理的能力描述，优先级：e.json中的capabilities > config.json中的description > config.json中的systemPrompt。

## 高级特性

### 内置输出格式控制

AIAgent根据e.json中的`outputArgs`配置自动生成JSONSchema，指导大语言模型输出结构化数据，开发者无需在提示词中描述输出格式。

### 工具编排配置

**重要原则：任何在e.json中声明了functionList的实例元素都可以作为AIAgent的工具被调用。**

这意味着您可以将以下类型的实例元素配置为AIAgent的工具：
- **模型实例元素（models）**：具有内置数据操作函数（如query、save等）
- **服务实例元素（services）**：自定义业务逻辑函数
- **页面实例元素（pages）**：前端交互功能
- **其他任何实例元素**：只要在e.json中声明了functionList就可以被调用

AIAgent支持多种类型工具的动态编排：

#### 基础工具配置

**最简配置：**
```json title="基础模型工具配置"
{
    "type": "model",
    "name": "models.CustomerModel",
    "enableFunctionList": {
        "query": {}
    }
}
```

**带权限配置：**
```json title="带权限的工具配置"
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

#### 服务工具配置

```json title="服务工具配置示例"
{
    "type": "service",
    "name": "services.CustomerService",
    "enableFunctionList": {
        "createCustomer": {},
        "updateCustomer": {}
    }
}
```

#### UI工具配置

```json title="UI工具配置示例"
{
    "type": "ui",
    "name": "pages.CustomerPage",
    "functionList": [
        {
            "name": "showForm",
            "title": "显示表单",
            "args": [
                {"name": "formData", "dataType": "JitDict", "title": "表单数据"}
            ],
            "returnType": "JitDict"
        }
    ],
    "enableFunctionList": {
        "showForm": {}
    }
}
```

#### MCP服务器工具配置

```json title="MCP服务器工具配置示例"
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

#### 其它实例元素作为工具配置

```json title="其它实例元素作为工具配置示例"
{
    "type": "custom",
    "name": "processors.DataProcessor",
    "enableFunctionList": {
        "processData": {},
        "validateData": {}
    }
}
```

只要`processors.DataProcessor`这个实例元素在其e.json中声明了包含`processData`和`validateData`函数的functionList，就可以被AIAgent调用。

### 流式回调处理

支持监听推理过程、工具调用等详细事件：

```python title="详细流式回调示例"
def detailed_callback(data):
    msg_type = data.get('type')
    
    if msg_type == 'REASONING_CONTENT':
        print(f"推理过程: {data['data']['content']}")
    elif msg_type == 'TEXT_MESSAGE_CONTENT':
        print(f"文本消息: {data['data']['content']}")
    elif msg_type == 'TOOL_CALL_START':
        tool_info = data['data']['outputArgs']['value']
        print(f"开始调用工具: {tool_info['toolName']}")
    elif msg_type == 'TOOL_CALL_END':
        print(f"工具调用完成")

result = agent.run(
    user_input="处理客户数据",
    stream_callback=detailed_callback
)
```

| msg_type                | 含义                   | 参数示例                                                                                      |
|-------------------------|------------------------|----------------------------------------------------------------------------------------------|
| REASONING_CONTENT       | 大模型推理过程           | `{"type": "REASONING_CONTENT", "data": {"content": "..."}}`                   |
| TEXT_MESSAGE_CONTENT    | 大模型输出的文本消息          | `{"type": "TEXT_MESSAGE_CONTENT", "data": {"content": "..."}}`                         |
| TOOL_CALL_START         | 工具调用开始           | `{"type": "TOOL_CALL_START", "data":{}}` |
| TOOL_CALL_END           | 工具调用完成           | `{"type": "TOOL_CALL_END", "data": {}}`                                                      |

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

### 会话状态管理

通过chatId实现连续对话和上下文记忆：

```python title="连续对话示例"
# 第一轮对话
result1 = agent.run(
    user_input="分析客户A的销售数据",
    variables={'target': '客户A'},
    chatId="session_001"
)

# 第二轮对话（基于前一轮的上下文）
result2 = agent.run(
    user_input="对比客户B的数据，找出差异",
    variables={'target': '客户B'},
    chatId="session_001"  # 相同会话ID，保持上下文
)

# 第三轮对话（继续基于前面的分析）
result3 = agent.run(
    user_input="给出改进建议",
    chatId="session_001"
)
```

### 权限控制机制

支持工具级别的细粒度权限控制：

```json title="权限控制配置示例"
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

### 事件配置

配置工具调用前后的事件处理，用于审计和监控：

```json title="事件配置示例"
{
    "tools": [
        {
            "type": "model",
            "name": "models.AuditModel",
            "enableFunctionList": {
                "save": {
                    "preEvent": {"withData": true},   # 调用前发送事件，携带入参
                    "postEvent": {"withData": false}  # 调用后发送事件，不携带返回数据
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

```python title="事件监听示例"
def event_callback(data):
    if data.get('type') == 'TOOL_CALL_START':
        print(f"即将调用工具: {data['data']['outputArgs']['value']['toolName']}")
        # 记录审计日志
    elif data.get('type') == 'TOOL_CALL_END':
        print(f"工具调用完成")
        # 记录操作结果

agent.run(
    user_input="删除过期数据",
    stream_callback=event_callback
)
```

### 知识库集成

配置和使用知识库增强代理能力：

```json title="知识库配置示例"
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
            "force": true  # 强制使用该知识库
        }
    ]
}
```

#### 知识库工作机制

知识库集成支持两种工作模式：

**强制模式（force: true）：**
- Agent会根据用户询问**先查询一次知识库**，将结果作为上下文的补充和增强
- 查询到的知识会自动注入到推理过程中，为后续决策提供支撑
- 适用于必须依赖特定知识库的场景，如技术文档查询、企业规章制度等

**非强制模式（force: false）：**
- 完全由用户提示词以及大模型决定是否需要以及在什么时机查询知识库
- Agent会根据推理过程判断是否需要额外的知识支持
- 提供更灵活的知识获取策略，适用于通用性较强的场景

```json title="知识库模式对比示例"
{
    "knowledgeRepo": [
        {
            "fullName": "rags.TechnicalSpecs",
            "enable": true,
            "force": true  // 强制模式：请求大模型之前先查询一次知识库
        },
        {
            "fullName": "rags.GeneralKnowledge",
            "enable": true,
            "force": false  // 非强制模式：按需查询通用知识
        }
    ]
}
```

### 自定义回调处理器
JitAi的ReActAgent基于LangGraph构建，回调处理器用于监听和处理Agent推理、工具调用等各类关键流程事件，兼容[langchain_core.callbacks.BaseCallbackHandler](https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackHandler.html#langchain_core.callbacks.base.BaseCallbackHandler)中定义的全部回调方法以及pre_model_hook和post_model_hook函数（参考[LangChain官方文档](https://langchain-ai.github.io/langgraph/reference/agents/?h=create_react#langgraph.prebuilt.chat_agent_executor.create_react_agent)中pre_model_hook和post_model_hook的定义）。

通过自定义回调处理器，开发者可以灵活介入模型推理前后、工具调用前后等环节，实现日志记录、参数校验、上下文增强等高级功能。

```python title="自定义回调处理器实现"
# aiagents/CustomCallback/service.py
from aiagents.ReActType import CustomAgentCallbackHandler
from typing import Any, Dict

class CustomCallback(CustomAgentCallbackHandler):
    def pre_model_hook(self, state: Dict[str, Any], **kwargs) -> Dict[str, Any]:
        # 模型调用前的自定义处理
        print(f"模型调用前处理: {state.get('messages', [])[-1]}")
        return state

    def post_model_hook(self, state: Dict[str, Any], **kwargs) -> Dict[str, Any]:
        # 模型调用后的自定义处理
        print(f"模型调用后处理: {state.get('messages', [])[-1]}")
        return state

    def on_tool_start(self, serialized: dict, input_str: str, **kwargs) -> Any:
        # 工具开始调用时的处理
        tool_name = serialized.get('name', 'unknown')
        print(f"开始调用工具: {tool_name}")

    def on_tool_end(self, output: str, **kwargs) -> Any:
        # 工具调用结束时的处理
        print(f"工具调用结果: {output[:100]}...")
```

```json title="配置和使用自定义回调"
{
    "llmElement": "llms.LLMJitAppDevelop",
    "callbackHandler": "aiagents.CustomCallback",
    "tools": [...]
}
```

使用时无需额外代码，回调处理器会自动工作：
```python
result = agent.run(user_input="处理数据")
```
