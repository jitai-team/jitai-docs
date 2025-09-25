---
sidebar_position: 5
slug: ai-assistant
---

# AI助理
AI助理是AI应用与用户交互的统一界面，基于LangGraph架构实现智能路由和多Agent协同。它负责路由决策、智能对话和工作流控制，支持可视化编排、复杂业务逻辑和一键集成能力。

AI助理元素分层结构为Meta（aiassistants.Meta） → Type（aiassistants.NormalType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AI助理实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的aiassistants.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
aiassistants/
├── myassistant/
│   ├── e.json          # 元素定义文件
│   └── config.json     # 业务配置文件
```

#### e.json文件
```json title="aiassistants/myassistant/e.json"
{
  "backendBundleEntry": ".",
  "frontBundleEntry": "./config.json",
  "icon": "AIzhushou1",
  "title": "智能客服",
  "type": "aiassistants.NormalType",
  "extendType": "self"
}
```

#### 业务配置文件
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
      "title": "智能客服",
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
  "welcomeMessage": "很高兴为你服务！请问有什么可以帮你？",
  "prologues": [
    "什么是元素机制？",
    "极态App支持私有化部署吗？"
  ]
}
```

#### 调用示例
```python title="使用AI助理"
# 获取AI助理实例
assistant = app.getElement("aiassistants.myassistant")

# 发起对话
result = assistant.run(
    message="你好，我想了解产品功能",
    chatId="chat_001",
    streamMode=True
)

# 处理流式响应
for chunk in result:
    print(chunk)
```

## 元素配置
### e.json配置
| 字段 | 说明 | 必填 |
|-----|------|------|
| backendBundleEntry | 后端入口，固定为"." | 是 |
| frontBundleEntry | 前端入口，指向config.json | 是 |
| type | 元素类型，固定为"aiassistants.NormalType" | 是 |
| title | 助理显示名称 | 是 |
| icon | 图标标识 | 否 |
| extendType | 扩展类型，一般为"self" | 否 |

### config.json配置
#### 基础配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| apiKey | Stext | str | 是 | LLM API密钥 |
| baseUrl | Stext | str | 是 | LLM服务地址 |
| model | Stext | str | 是 | 模型名称 |
| temperature | Numeric | float | 否 | 温度参数(0-1) |
| maxTokens | Numeric | int | 否 | 最大令牌数 |
| saverDb | Stext | str | 是 | 检查点数据库 |
| sessionTimeout | Numeric | int | 否 | 会话超时(秒) |
| welcomeMessage | Stext | str | 否 | 欢迎消息 |
| prologues | JitList | list | 否 | 预设问题列表 |

#### 节点配置
**支持的节点类型：**
- **start**: 开始节点，工作流入口
- **router**: 路由节点，实现智能分流
- **aiagent**: AI代理节点，执行具体任务
- **humanaction**: 人工干预节点
- **end**: 结束节点，工作流出口

#### 边配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| id | Stext | str | 是 | 边的唯一标识 |
| sourceNode | Stext | str | 是 | 源节点ID |
| targetNode | Stext | str | 是 | 目标节点ID |
| sourcePort | Stext | str | 是 | 源端口 |
| targetPort | Stext | str | 是 | 目标端口 |
| argMapping | JitDict | dict | 否 | 参数映射关系 |

## 方法 
### run
发起AI助理对话，支持流式和非流式两种模式。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| message | Ltext | str | 是 | 用户输入消息 |
| chatId | Stext | str | 否 | 会话ID，不提供则自动生成 |
| attachments | File | list | 否 | 附件列表 |
| caller | Stext | str | 否 | 调用者标识 |
| streamMode | Boolean | bool | 否 | 是否流式处理，默认True |

#### 返回值
- **流式模式**: 返回生成器对象，逐步输出处理结果
- **非流式模式**: 返回最终处理结果字典

#### 使用示例
```python title="流式对话示例"
assistant = app.getElement("aiassistants.myassistant")

# 流式处理
for chunk in assistant.run(
    message="帮我分析这个问题",
    chatId="chat_001",
    streamMode=True
):
    print(f"输出: {chunk.get('content', '')}")
    if chunk.get('finished'):
        print("对话完成")
        break
```

```python title="非流式对话示例"
# 非流式处理
result = assistant.run(
    message="简单查询问题",
    streamMode=False
)
print(f"最终结果: {result}")
```

### resume
恢复中断的工作流执行，用于人工干预后继续处理。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| chatId | Stext | str | 是 | 会话ID |
| nodeId | Stext | str | 是 | 恢复节点ID |
| interruptResume | - | dict | 否 | 恢复数据 |

#### 返回值
返回生成器对象，逐步输出恢复后的处理结果。

#### 使用示例
```python title="恢复工作流示例"
# 恢复指定节点的执行
for chunk in assistant.resume(
    chatId="chat_001",
    nodeId="aiagent_001",
    interruptResume={"user_confirm": True}
):
    print(chunk)
```

### terminate
终止指定会话的工作流执行。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| chatId | Stext | str | 是 | 要终止的会话ID |

#### 返回值
返回布尔值，表示终止操作是否成功。

#### 使用示例
```python title="终止会话示例"
success = assistant.terminate(chatId="chat_001")
if success:
    print("会话已成功终止")
```

### getChatStatus
获取指定会话的当前状态。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|-----|-----------|------|------|
| chatId | Stext | str | 是 | 会话ID |

#### 返回值
返回字符串，表示会话状态：
- "running": 运行中
- "terminated": 已终止
- "completed": 已完成
- None: 会话不存在

#### 使用示例
```python title="查询会话状态示例"
status = assistant.getChatStatus(chatId="chat_001")
print(f"会话状态: {status}")
```

## 属性
### 暂无
AI助理元素暂未提供公开的属性访问接口。

## 高级特性
### 流式处理
AI助理支持实时流式输出，适合长对话和复杂推理场景。

### 会话管理
内置会话状态管理，支持会话恢复、终止和状态查询。

### 工作流控制
基于LangGraph实现复杂工作流编排，支持条件分支、并行处理和人工干预。
