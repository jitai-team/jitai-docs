---
sidebar_position: 1
---

# AI大模型

AI大模型是企业级大模型服务网关，对接各个大模型厂商，提供统一的模型调用接口，屏蔽不同大模型厂商的API差异。它负责API密钥管理、负载均衡、故障转移和重试机制，支持结构化输出和多轮对话。

AI大模型元素分层结构为Meta（llms.Meta） → Type（llms.Bailian、llms.OpenAI等） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AI大模型实例元素。

**支持的大模型厂商：**

| Type元素 | fullName | 厂商 | 描述 |
|----------|----------|------|------|
| Bailian | llms.Bailian | 阿里云 | 阿里云百炼平台，集成多种国内外主流大模型 |
| OpenAI | llms.OpenAI | OpenAI | GPT系列模型，支持GPT-4、GPT-3.5-turbo等 |
| Anthropic | llms.Anthropic | Anthropic | Claude系列模型，擅长长文本处理和复杂问题分析 |
| Gemini | llms.Gemini | 谷歌 | 谷歌的多模态AI模型，支持文本、图像和代码理解 |
| Siliconflow | llms.Siliconflow | 硅基流动 | 专业的AI推理加速平台，提供高效的大模型推理服务 |
| Deepseek | llms.Deepseek | 深度求索 | 国内领先的大语言模型，在中文理解和代码生成方面表现优异 |

## 快速开始

### 创建实例元素

以下是创建一个阿里云百炼AI大模型实例元素的完整示例：

#### 目录结构
```
myapp/llms/MyBailianLLM/
├── e.json
└── config.json
```

#### e.json文件
```json title="myapp/llms/MyBailianLLM/e.json"
{
  "title": "我的百炼模型",
  "type": "llms.Bailian",
  "backendBundleEntry": "."
}
```

#### config.json文件
```json title="myapp/llms/MyBailianLLM/config.json"
{
  "api_key": "xxx",
  "api_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  "spare_api_keys": ["sk-backup-key-1", "sk-backup-key-2"]
}
```

#### 调用示例
```python
# 获取AI大模型元素
LLMProvider = app.getElement("llms.MyBailianLLM")

# 调用AI大模型
response = LLMProvider.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "你好，请介绍一下你自己", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())

print(response)
```

## 元素配置

### e.json配置

| 参数 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| title | Stext | str | 是 | 实例元素显示名称 |
| type | Stext | str | 是 | 指向Type元素fullName，如`llms.Bailian` |
| backendBundleEntry | Stext | str | 是 | 固定为`"."` |
| variables | JitList | list | 否 | 变量定义列表，用于API密钥等敏感信息 |

#### variables配置（可选）

当需要通过变量替换管理API密钥时使用：

| 参数 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| name | Stext | str | 是 | 变量名称 |
| title | Stext | str | 是 | 变量显示名称 |
| value | Stext | str | 是 | 变量值 |
| required | Numeric | int | 是 | 是否必填，1为必填，0为可选 |
| endpoint | Stext | str | 是 | 固定为`"backend"` |

**注意**：也可以在config.json中直接配置API密钥，无需使用variables。

### config.json配置

| 参数 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| api_key | Stext | str | 是 | API密钥，支持变量替换`{{variableName}}` |
| api_url | Stext | str | 是 | API服务地址 |
| spare_api_keys | JitList | list | 否 | 备用API密钥列表，用于负载均衡 |

## 方法
### runLlm

AI大模型的核心类方法，用于发送请求到大模型服务。

**方法签名**
```python
@classmethod
def runLlm(cls, config: Dict[str, Any], context: Dict[str, Any]) -> str
```

#### 参数详解

**config参数（配置字典）**

| 参数 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| dataType | Stext | str | 是 | 数据类型，如`Ltext`、`Stext`等 |
| promptList | JitList | list | 是 | 提示列表，包含role、prompt、id字段 |
| llmConfig | JitDict | dict | 否 | LLM配置，包含model等参数 |
| dataTypeConfig | JitDict | dict | 否 | 数据类型配置 |
| outputArgs | JitList | list | 否 | 输出参数配置，用于结构化输出 |

**context参数**
上下文变量字典，用于变量替换，通常传入`locals()`

##### outputArgs配置

outputArgs用于定义结构化输出格式，系统会自动生成JSON Schema并引导模型返回指定格式的数据。

**基本格式**
```python
"outputArgs": [
    {
        "name": "参数名",
        "title": "参数描述", 
        "dataType": "数据类型"
    }
]
```

**支持的数据类型**

| 数据类型 | 说明 | 示例 |
|---------|------|------|
| Stext | 单行文本 | `{"name": "summary", "title": "摘要", "dataType": "Stext"}` |
| Ltext | 多行文本 | `{"name": "content", "title": "详细内容", "dataType": "Ltext"}` |
| Numeric | 数字 | `{"name": "score", "title": "评分", "dataType": "Numeric"}` |
| Integer | 整数 | `{"name": "count", "title": "数量", "dataType": "Integer"}` |
| Date | 日期 | `{"name": "deadline", "title": "截止日期", "dataType": "Date"}` |
| DateTime | 日期时间 | `{"name": "createdAt", "title": "创建时间", "dataType": "DateTime"}` |

**复杂数据类型示例**

- **JitDict**：`{"name": "userInfo", "dataType": "JitDict", "variableList": [字段定义]}`
- **JitList**：`{"name": "tags", "dataType": "JitList", "variableConfig": {"dataType": "Stext"}}`
- **RowData**：`{"name": "user", "dataType": "RowData", "generic": "models.UserModel"}`
- **RowList**：`{"name": "users", "dataType": "RowList", "generic": "models.UserModel"}`

**promptList格式**：包含role（system/user/assistant）、prompt（消息内容）、id（消息标识）的字典列表。

**llmConfig格式**：包含model（模型名称）、max_tokens、temperature等配置的字典。

**注意**：各厂商支持的llmConfig参数可能不同，具体请参考各厂商官方API文档。

#### 返回值

**返回类型**：无outputArgs时返回字符串，有outputArgs时返回解析后的结构化数据字典。

#### 使用示例

**结构化输出**
```python
LLMProvider = app.getElement("llms.MyBailianLLM")

response = LLMProvider.runLlm({
    "dataType": "JitDict",
    "promptList": [
        {"role": "user", "prompt": "分析这个句子的情感：'今天天气真好'", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"},
    "outputArgs": [
        {"name": "emotion", "dataType": "Stext", "title": "情感类型"},
        {"name": "confidence", "dataType": "Numeric", "title": "置信度"}
    ]
}, locals())
```

**变量替换**
```python
userName = "张三"
response = LLMProvider.runLlm({
    "dataType": "Ltext", 
    "promptList": [
        {"role": "user", "prompt": "你好{userName}，请介绍一下你自己", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())
```

## 属性
暂无

## 高级特性

### API密钥管理

支持主密钥和备用密钥配置，系统自动实现负载均衡和故障转移。

### 重试机制

内置指数退避重试策略，自动处理临时性错误。

### 错误处理

提供标准化错误码，包括API密钥无效、配额超限、请求频率限制等常见错误类型。

 