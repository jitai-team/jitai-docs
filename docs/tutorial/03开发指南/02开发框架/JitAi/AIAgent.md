---
sidebar_position: 3
---

# AIAgent

AIAgent是AI应用核心执行引擎，基于ReAct架构实现推理与行动的循环决策。它负责工具编排、动态组合和调用各种业务工具和服务，维护对话上下文、任务执行状态和数据流转状态，支持复杂业务逻辑的分解和执行，并提供基于用户角色的工具访问权限管理。

AIAgent元素分层结构为Meta（aiagents.Meta） → Type（aiagents.ReActType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AIAgent实例元素。

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
    "description": "专注于工具测试，擅长测试工具的使用和测试计划的制定",
    "inputArgs": [
        {
            "dataType": "Stext",
            "title": "需求",
            "name": "input_data"
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
    "llmElement": "llms.LLMJitAppDevelop",
    "llmConfig": {
        "model": "qwen-max-latest",
        "temperature": 0.7
    },
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
{input_data}
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
| `description` | String | 否 | 代理功能描述 |
| `inputArgs` | Array | 否 | 输入参数定义列表 |
| `outputArgs` | Array | 否 | 输出参数定义列表 |

**inputArgs配置项：**
- `name` - 参数名称
- `dataType` - 数据类型（如Stext、JitDict等）
- `title` - 参数显示名称
- `required` - 是否必填

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
| `llmElement` | String | 是 | 大语言模型元素的fullName |
| `llmConfig` | Object | 是 | LLM配置参数 |
| `tools` | Array | 否 | 可用工具配置列表，任何声明了functionList的实例元素都可以作为工具 |
| `saverDb` | String | 否 | 会话存储数据库，默认"databases.Default" |
| `knowledgeRepo` | Array | 否 | 知识库配置列表 |
| `verbose` | Boolean | 否 | 是否开启详细日志 |

**llmConfig配置项：**
- `model` - 模型名称
- `temperature` - 温度参数（0.0-1.0）
- `streaming` - 是否启用流式输出

**tools配置项：**
- `type` - 工具类型（model、service、ui、mcpServer等）
- `name` - 实例元素的fullName（必须是在e.json中声明了functionList的实例元素）
- `enableFunctionList` - 启用的功能列表及其配置

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
{input_data}

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
        print(f"工具调用前: {data['data']['outputArgs']['value']['toolName']}")

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
**说明：** 代理的功能描述，来源于e.json配置文件中的description字段。

### capabilities

**类型：** String  
**说明：** 代理的能力描述，优先级：e.json中的capabilities > description > config.json中的systemPrompt。

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

通过stream_callback参数实现实时输出处理：

```python title="流式回调处理示例"
def stream_callback(data):
    msg_type = data.get('type')
    
    if msg_type == 'REASONING_CONTENT':
        content = data['data']['content']
        print(f"推理过程: {content}")
    elif msg_type == 'TOOL_CALL_START':
        tool_info = data['data']['outputArgs']['value']
        print(f"调用工具: {tool_info['toolName']}")

result = agent.run(
    user_input="请处理客户数据",
    stream_callback=stream_callback
)
```

### 会话状态管理

AIAgent支持持久化会话状态，实现连续对话：

```python title="会话管理示例"
# 第一轮对话
result1 = agent.run(
    user_input="分析客户A的数据",
    variables={'target': '客户A'},
    chatId="session_001"
)

# 第二轮对话（基于前一轮的上下文）
result2 = agent.run(
    user_input="对比客户B的数据",
    variables={'target': '客户B', 'action': '对比分析'},
    chatId="session_001"  # 相同的会话ID
)
```

### 权限控制机制

通过工具配置实现细粒度的权限控制：

**人工确认示例：**
```json title="人工确认配置"
{
    "type": "model",
    "name": "models.SensitiveData",
    "enableFunctionList": {
        "delete": {
            "humanInterrupt": true
        }
    }
}
```

**角色权限示例：**
```json title="角色权限配置"
{
    "type": "model",
    "name": "models.SensitiveData",
    "enableFunctionList": {
        "query": {
            "roles": ["roles.admin", "roles.developer"]
        }
    }
}
```

**权限配置项：**
- `humanInterrupt` - 需要人工确认
- `roles` - 允许调用该工具函数的角色实例元素fullName列表

### 事件配置

通过preEvent和postEvent配置工具调用事件：

**事件配置项说明：**
- `preEvent` - 工具调用前事件触发配置，数据为工具调用的入参数据
- `postEvent` - 工具调用后事件触发配置，数据为工具返回的数据
- `withData` - 是否在通过stream_callback发送事件时携带工具的入参或返回数据（默认为true）

事件通过`stream_callback`回调函数发送消息，`withData`控制是否携带工具调用的入参或返回数据（默认为true）。

**基础事件配置：**
```json title="基础事件配置"
{
    "type": "model",
    "name": "models.AuditModel",
    "enableFunctionList": {
        "save": {
            "preEvent": {"withData": true},   // 调用前发送事件，携带入参
            "postEvent": {"withData": false}  // 调用后发送事件，不携带返回数据
        }
    }
}
```

**事件数据控制示例：**
```json title="withData配置示例"
{
    "type": "model",
    "name": "models.QueryModel",
    "enableFunctionList": {
        "query": {
            "preEvent": {"withData": false},  // 不携带查询参数
            "postEvent": {"withData": true}   // 携带查询结果
        }
    }
}
```

**使用场景：** 审计日志、操作记录、数据监控、实时反馈等。

### 自定义回调处理器

除了通过stream_callback参数传递回调函数外，还可以创建专门的回调处理器实例元素来处理更复杂的回调逻辑。

#### 创建回调处理器

**目录结构：**
```plaintext title="回调处理器目录结构"
aiagents/
└── CustomCallback/         # 回调处理器名称
    ├── e.json              # 元素配置文件
    ├── service.py          # 回调处理器实现
    └── __init__.py         # 包初始化文件
```

**e.json配置：**
```json title="aiagents/CustomCallback/e.json"
{
    "backendBundleEntry": ".",
    "title": "自定义Agent回调",
    "type": "services.NormalType"
}
```

**service.py实现：**
```python title="aiagents/CustomCallback/service.py"
from aiagents.ReActType import CustomAgentCallbackHandler
from typing import Any, Dict

class CustomCallback(CustomAgentCallbackHandler):
    """自定义Agent回调处理器"""

    def pre_model_hook(self, state: Dict[str, Any], **kwargs) -> Dict[str, Any]:
        """模型调用前处理"""
        print(f"模型调用前: {state}")
        return state

    def on_llm_start(self, serialized: dict[str, Any], prompts: list[str], **kwargs) -> Any:
        """LLM开始时的回调"""
        print(f"LLM开始调用: {len(prompts)}个提示")
```

**__init__.py文件：**
```python title="aiagents/CustomCallback/__init__.py"
from .service import CustomCallback
```

#### 配置回调处理器

在AIAgent的config.json中配置回调处理器：

```json title="配置自定义回调处理器"
{
    "llmElement": "llms.LLMJitAppDevelop",
    "callbackHandler": "aiagents.CustomCallback",
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

#### 可用的回调方法

**Agent专用：**
- `pre_model_hook(state, **kwargs)` - 模型调用前处理
- `post_model_hook(state, **kwargs)` - 模型调用后处理

**LangChain标准：**
- `on_llm_start(serialized, prompts, **kwargs)` - LLM开始调用
- `on_tool_start(serialized, input_str, **kwargs)` - 工具开始调用
- `on_tool_end(output, **kwargs)` - 工具调用结束

#### 使用示例

```python title="使用自定义回调处理器"
# 获取配置了自定义回调的代理
agent = app.getElement("aiagents.MyAgent")

# 运行代理（会自动使用配置的回调处理器）
result = agent.run(
    user_input="处理客户数据",
    variables={'task': '数据处理'}
)

# 回调处理器会在相应的时机自动被调用
```
