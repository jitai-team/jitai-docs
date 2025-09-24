---
sidebar_position: 1
slug: ai-large-models
---

# AI Large Language Models(LLM)
AI LLMs is an enterprise-level large model service gateway that connects to various large model vendors, providing a unified model calling interface that shields API differences between different large model vendors. It handles API key management, load balancing, failover and retry mechanisms, supporting structured output and multi-turn conversations.

The AI LLMs element has a hierarchical structure of Meta (llms.Meta) → Type (llms.Bailian, llms.OpenAI, etc.) → Instance. Developers can quickly create AI LLMs instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `llms.Bailian`, `llms.OpenAI` and other elements provided by JitAi in their own App to implement their own encapsulation.

**Supported LLMs Vendors:**

| Type Element | fullName | Vendor | Description |
|----------|----------|------|------|
| Bailian | llms.Bailian | Alibaba Cloud | Alibaba Cloud Bailian platform, integrating various mainstream LLMs from domestic and international sources |
| OpenAI | llms.OpenAI | OpenAI | GPT series models, supporting GPT-4, GPT-3.5-turbo, etc. |
| Anthropic | llms.Anthropic | Anthropic | Claude series models, excelling at long text processing and complex problem analysis |
| Gemini | llms.Gemini | Google | Google's multimodal AI model, supporting text, image and code understanding |
| Siliconflow | llms.Siliconflow | Siliconflow | Professional AI inference acceleration platform, providing efficient large model inference services |
| Deepseek | llms.Deepseek | DeepSeek | Leading domestic large language model, excellent performance in Chinese understanding and code generation |
| OpenAICompatible | llms.OpenAICompatible | OpenAI Compatible | Services compatible with OpenAI API protocol, supporting private deployment and third-party vendors |

## Quick Start 
### Creating Instance Elements
The following is a complete example of creating an Alibaba Cloud Bailian AI Large Model instance element:

#### Directory Structure
```
myapp/llms/MyBailianLLM/
├── e.json
└── config.json
```

#### e.json File
```json title="myapp/llms/MyBailianLLM/e.json"
{
  "title": "My Bailian Model",
  "type": "llms.Bailian",
  "backendBundleEntry": "."
}
```

#### config.json File
```json title="myapp/llms/MyBailianLLM/config.json"
{
  "api_key": "xxx",
  "api_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  "spare_api_keys": ["sk-backup-key-1", "sk-backup-key-2"]
}
```

#### Usage Example
```python
# Get AI large model element
LLMProvider = app.getElement("llms.MyBailianLLM")

# Call AI large model
response = LLMProvider.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "Hello, please introduce yourself", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())

print(response)
```

### OpenAI Compatible Instance Elements
The following is a complete example of creating an OpenAI compatible AI large model instance element, suitable for services like Ollama, Doubao, etc. that support the OpenAI API protocol:

#### Directory Structure
```
myapp/llms/MyOpenAICompatibleLLM/
├── e.json
└── config.json
```

#### e.json File
```json title="myapp/llms/MyOpenAICompatibleLLM/e.json"
{
  "title": "My OpenAI Compatible Model",
  "type": "llms.OpenAICompatible",
  "backendBundleEntry": "."
}
```

#### config.json File
```json title="myapp/llms/MyOpenAICompatibleLLM/config.json"
{
  "api_key": "ollama",
  "api_url": "http://127.0.0.1:11434/v1",
  "spare_api_keys": []
}
```

#### Usage Example
```python
# Get AI large model element
LLMProvider = app.getElement("llms.MyOpenAICompatibleLLM")

# Call AI large model
response = LLMProvider.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "Hello, please introduce yourself", "id": "user-1"}
    ],
    "llmConfig": {"model": "llama3.1"}  # Use complete model name
}, locals())

print(response)
```

**Notes:**
- OpenAI compatible mode supports privately deployed model services like Ollama, vLLM, etc.
- `api_key` can be set to any value, some services (like Ollama) don't validate keys
- `api_url` needs to point to a service endpoint that supports the OpenAI API protocol
- `model` parameter needs to use the complete model name supported by the service

## Element Configuration
### e.json Configuration
| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| title | Stext | str | Yes | Instance element display name |
| type | Stext | str | Yes | Points to Type element fullName, such as `llms.Bailian` |
| backendBundleEntry | Stext | str | Yes | Fixed as `"."` |
| variables | JitList | list | No | Variable definition list, used for sensitive information like API keys |

#### variables Configuration (Optional)
Used when API key management through variable substitution is needed:

| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| name | Stext | str | Yes | Variable name |
| title | Stext | str | Yes | Variable display name |
| value | Stext | str | Yes | Variable value |
| required | Numeric | int | Yes | Whether required, 1 for required, 0 for optional |
| endpoint | Stext | str | Yes | Fixed as `"backend"` |

**Note**: API keys can also be configured directly in config.json without using variables.

### config.json Configuration
| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| api_key | Stext | str | Yes | API key, supports variable substitution `{{variableName}}` |
| api_url | Stext | str | Yes | API service address |
| spare_api_keys | JitList | list | No | Backup API key list, used for load balancing |

## Methods 
### runLlm
Core class method of AI large model, used to send requests to large model services.

**Method Signature**
```python
@classmethod
def runLlm(cls, config: Dict[str, Any], context: Dict[str, Any]) -> str
```

#### Parameter Details
**config parameter (configuration dictionary)**

| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| dataType | Stext | str | Yes | Data type, such as `Ltext`, `Stext`, etc. |
| promptList | JitList | list | Yes | Prompt list, containing role, prompt, id fields |
| llmConfig | JitDict | dict | No | LLM configuration, containing model and other parameters |
| dataTypeConfig | JitDict | dict | No | Data type configuration |
| outputArgs | JitList | list | No | Output parameter configuration, used for structured output |

**context parameter**
Context variable dictionary, used for variable substitution, usually pass `locals()`

##### outputArgs Configuration
outputArgs is used to define structured output format, the system will automatically generate JSON Schema and guide the model to return data in the specified format.

**Basic Format**
```python
"outputArgs": [
    {
        "name": "parameter_name",
        "title": "parameter_description",
        "dataType": "data_type"
    }
]
```

**Supported Data Types**

| Data Type | Description | Example |
|---------|------|------|
| Stext | Single line text | `{"name": "summary", "title": "Summary", "dataType": "Stext"}` |
| Ltext | Multi-line text | `{"name": "content", "title": "Detailed content", "dataType": "Ltext"}` |
| Numeric | Number | `{"name": "score", "title": "Score", "dataType": "Numeric"}` |
| Integer | Integer | `{"name": "count", "title": "Count", "dataType": "Integer"}` |
| Date | Date | `{"name": "deadline", "title": "Deadline", "dataType": "Date"}` |
| DateTime | Date time | `{"name": "createdAt", "title": "Creation time", "dataType": "DateTime"}` |

**Complex Data Type Examples**

- **JitDict**: `{"name": "userInfo", "dataType": "JitDict", "variableList": [field definitions]}`
- **JitList**: `{"name": "tags", "dataType": "JitList", "variableConfig": {"dataType": "Stext"}}`
- **RowData**: `{"name": "user", "dataType": "RowData", "generic": "models.UserModel"}`
- **RowList**: `{"name": "users", "dataType": "RowList", "generic": "models.UserModel"}`

**promptList format**: Dictionary list containing role (system/user/assistant), prompt (message content), id (message identifier).

**llmConfig format**: Dictionary containing model (model name), max_tokens, temperature and other configurations.

**Note**: Different vendors may support different llmConfig parameters, please refer to each vendor's official API documentation.

#### Return Value
**Return Type**: Returns string when no outputArgs, returns parsed structured data dictionary when outputArgs is present.

#### Usage Examples
**Structured Output**
```python
LLMProvider = app.getElement("llms.MyBailianLLM")

response = LLMProvider.runLlm({
    "dataType": "JitDict",
    "promptList": [
        {"role": "user", "prompt": "Analyze the sentiment of this sentence: 'The weather is really nice today'", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"},
    "outputArgs": [
        {"name": "emotion", "dataType": "Stext", "title": "Emotion type"},
        {"name": "confidence", "dataType": "Numeric", "title": "Confidence"}
    ]
}, locals())
```

**Variable Substitution**
```python
userName = "John"
response = LLMProvider.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "Hello {userName}, please introduce yourself", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())
```

### embedDocuments
Document vectorization class method of AI large model, used to convert text lists to high-dimensional vector representations.

**Method Signature**
```python
@classmethod
def embedDocuments(cls, config: Dict[str, Any]) -> List[List[float]]
```

#### Parameter Details
**config parameter (configuration dictionary)**

| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| texts | JitList | list | Yes | List of texts to be vectorized |
| model | Stext | str | Yes | Vectorization model name, such as `text-embedding-v3` |

#### Return Value
**Return Type**: List[List[float]], vectorization result list, each document corresponds to one vector.

#### Usage Example
**Vectorization**
```python
LLMProvider = app.getElement("llms.MyBailianLLM")

response = LLMProvider.embedDocuments({
    "texts": ["This is the first document", "This is the second document"],
    "model": "text-embedding-v3"
})
```

### rerankDocuments
Document reranking class method of AI large model, used to reorder candidate documents based on query text.

**Method Signature**
```python
@classmethod
def rerankDocuments(cls, config: Dict[str, Any]) -> List[Dict]
```

#### Parameter Details
**config parameter (configuration dictionary)**

| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| query | Stext | str | Yes | Query text, used for relevance comparison with documents |
| documents | JitList | list | Yes | List of document texts to be reranked |
| model | Stext | str | Yes | Reranking model name, such as `gte-rerank-v2` |

#### Return Value
**Return Type**: List[Dict], reranking result list, each dictionary contains:
- `index`: Original document index (int)
- `score`: Relevance score (float)
- `document`: Document content (str, optional)

#### Usage Examples
**Basic Reranking**
```python
LLMProvider = app.getElement("llms.MyBailianLLM")

response = LLMProvider.rerankDocuments({
    "query": "What is artificial intelligence?",
    "documents": [
        "Artificial intelligence is a branch of computer science",
        "Machine learning is an important component of artificial intelligence",
        "Deep learning is a subfield of machine learning"
    ],
    "model": "gte-rerank"
})
```

**Combined with Search Scenarios**
```python
search_results = [
    "Document 1: AI Technology Development History",
    "Document 2: Machine Learning Algorithm Introduction",
    "Document 3: Deep Learning Framework Comparison",
    "Document 4: Natural Language Processing Applications"
]

response = LLMProvider.rerankDocuments({
    "query": "Deep learning related technologies",
    "documents": search_results,
    "model": "gte-rerank-v2"
})
```

## Properties
None

## Advanced Features
### API Key Management
Supports primary and backup key configuration, system automatically implements load balancing and failover.

### Retry Mechanism
Built-in exponential backoff retry strategy, automatically handles temporary errors.

### Error Handling
Provides standardized error codes, including invalid API keys, quota exceeded, request rate limiting and other common error types.

