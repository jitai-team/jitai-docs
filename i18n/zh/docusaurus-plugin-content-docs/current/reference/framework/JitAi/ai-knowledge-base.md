---
sidebar_position: 3
slug: ai-knowledge-base
description: "AI知识库 API 参考文档。完整的规格说明、方法和示例。"
---

# AI知识库
AI知识库是基于RAG（检索增强生成）技术的企业级知识管理系统，支持智能文档检索和知识增强功能。它负责文档向量化存储、语义检索、内容重排序和实时更新，提供精准的知识检索和内容管理能力。

AI知识库元素分层结构为Meta（rags.Meta） → Type（rags.NormalType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建AI知识库实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的rags.NormalType元素，以实现自己的封装。

**支持的Type类型：**
- **rags.NormalType**：标准知识库类型，提供完整的文档管理和智能检索功能

## 快速开始 
### 创建实例元素
#### 目录结构
```
myKnowledgeBase/           # 知识库名称（路径可自定义）
├── e.json                 # 元素定义文件
└── config.json            # 业务配置文件
```

#### e.json文件
```json title="e.json"
{
  "title": "我的知识库",
  "type": "rags.NormalType",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="config.json"
{
    "vectorModel": {
        "llmElement": "llms.LLMJitAppDevelop",
        "model": "text-embedding-v3"
    },
    "rerankModel": {
        "llmElement": "llms.LLMJitAppDevelop",
        "model": "gte-rerank-v2"
    },
    "topK": 10,
    "topN": 3,
    "vectorWeight": 0.5,
    "rerankType": "model",
    "vectorstoreType": "chroma"
}
```

#### 调用示例
```python title="使用AI知识库"
# 获取知识库实例
knowledge_base = app.getElement("rags.myKnowledgeBase")

# 查询知识库
result = knowledge_base.query("极态平台有什么特点？")
print(result)

# 添加文档
knowledge_base.addDocumentByBusinessId(
    businessId="doc_001",
    document=[{"name": "document.pdf", "path": "/path/to/document.pdf"}]
)
```

## 元素配置
### e.json配置
| 参数 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| title | Stext | str | 是 | 知识库显示名称 |
| type | Stext | str | 是 | 固定值：`rags.NormalType` |
| backendBundleEntry | Stext | str | 是 | 固定值：`.` |

### 业务配置文件配置
| 参数 | 类型 | 对应原生类型 | 必填 | 默认值 | 说明 |
|------|------|-------------|------|--------|------|
| vectorModel.llmElement | Stext | str | 是 | - | 大模型元素fullName |
| vectorModel.model | Stext | str | 是 | - | 向量化模型名称 |
| rerankModel.llmElement | Stext | str | 否 | - | 重排序大模型元素fullName |
| rerankModel.model | Stext | str | 否 | - | 重排序模型名称 |
| topK | Numeric | int | 否 | 10 | 向量检索返回的结果数量 |
| topN | Numeric | int | 否 | 3 | 重排序后返回的最终结果数量 |
| vectorWeight | Numeric | float | 否 | 0.5 | 向量检索权重，取值0~1之间 |
| rerankType | Stext | str | 否 | "model" | 重排序类型：model/basic |
| vectorstoreType | Stext | str | 否 | "chroma" | 向量存储类型 |

## 方法 
### query {#query}
智能查询知识库内容，基于语义相似度检索相关文档片段。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| query | Stext | str | 是 | 用户查询内容 |

#### 返回值
- **类型**：Ltext
- **说明**：返回与查询相关的知识内容，经过语义检索和重排序优化

#### 使用示例
```python title="查询知识库"
result = knowledge_base.query("什么是极态平台？")
print(result)
```

### addDocumentByBusinessId
向知识库添加新文档，支持自定义分块和清洗配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| businessId | Stext | str | 是 | 业务唯一标识，用于文档管理 |
| document | File | list | 是 | 文档附件列表，支持多种格式 |
| splitterConfig | JitDict | dict | 否 | 文档分块配置 |
| cleanerConfig | JitDict | dict | 否 | 内容清洗配置 |

#### splitterConfig配置项
包含chunk_size（分块大小）、chunk_overlap（重叠长度）、separator（分割符）等参数。

#### cleanerConfig配置项
包含remove_extra_whitespace（移除多余空白）、normalize_unicode（Unicode标准化）、remove_urls（移除URL）等选项。

#### 返回值
- **类型**：JitDict
- **说明**：包含文档处理结果信息

#### 使用示例
```python title="添加文档到知识库"
result = knowledge_base.addDocumentByBusinessId(
    businessId="product_manual_v1.0",
    document=[{"name": "manual.pdf", "path": "/path/to/manual.pdf"}],
    splitterConfig={"chunk_size": 500, "chunk_overlap": 100},
    cleanerConfig={"remove_extra_whitespace": True, "normalize_unicode": True}
)
```

### deleteDocumentByBusinessId
从知识库中删除指定文档及其相关向量数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| businessId | Stext | str | 是 | 要删除的文档业务标识 |

#### 返回值
- **类型**：boolean
- **说明**：删除成功返回`true`，失败返回`false`

#### 使用示例
```python title="删除文档"
success = knowledge_base.deleteDocumentByBusinessId("product_manual_v1.0")
print(f"删除结果: {success}")
```

### queryKeywords
基于关键词列表查询知识库，支持精确匹配和相关性排序。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keywords | list | 是 | 关键词列表，最多支持5个关键词 |
| limit | int | 否 | 限制返回数量，默认使用配置的topN值 |

#### 返回值
- **类型**：str
- **说明**：匹配的文档内容，用换行符连接，包含页面标签、文档标题、文档类型等元数据信息

#### 使用示例
```python title="关键词查询"
# 单关键词查询
result = knowledge_base.queryKeywords(["退款"])
print(result)

# 多关键词查询，限制返回3个结果
result = knowledge_base.queryKeywords(
    keywords=["退款", "申请", "流程"], 
    limit=3
)
print(result)
```

## 属性
暂无

## 高级特性
### 智能语义检索
基于向量嵌入技术实现语义理解，支持非精确匹配的智能检索。

### 文档分块处理
支持灵活的文档分块策略，通过chunk_size、chunk_overlap等参数优化检索准确性。

### 内容清洗优化
提供多种内容清洗选项，包括空白字符处理、Unicode标准化等，提升文档质量。

### 重排序算法
采用二阶段检索策略，先向量召回候选结果，再通过重排序模型精确排序。

### 实时内容更新
支持基于businessId的增量更新和精确删除，确保知识库内容的实时性和版本管理。
