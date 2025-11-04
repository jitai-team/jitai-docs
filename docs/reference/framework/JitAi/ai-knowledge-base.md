---
sidebar_position: 3
slug: ai-knowledge-base
title: "AI Knowledge Base Reference"
description: "AI Knowledge Base Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "AI Knowledge Base"
---

# AI Knowledge Base
AI Knowledge Base is an enterprise-level knowledge management system based on RAG (Retrieval-Augmented Generation) technology, supporting intelligent document retrieval and knowledge enhancement functions. It is responsible for document vectorization storage, semantic retrieval, content reranking, and real-time updates, providing precise knowledge retrieval and content management capabilities.

The AI Knowledge Base element hierarchical structure is Meta (rags.Meta) → Type (rags.NormalType) → Instance. Developers can quickly create AI Knowledge Base instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements, or override the official rags.NormalType element provided by JitAi in their own App to implement their own encapsulation.

**Supported Type Classes:**
- **rags.NormalType**: Standard knowledge base type, providing complete document management and intelligent retrieval functions

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```
myKnowledgeBase/           # Knowledge base name (path customizable)
├── e.json                 # Element definition file
└── config.json            # Business configuration file
```

#### e.json File
```json title="e.json"
{
  "title": "My Knowledge Base",
  "type": "rags.NormalType",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
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

#### Usage Example
```python title="Using AI Knowledge Base"
# Get knowledge base instance
knowledge_base = app.getElement("rags.myKnowledgeBase")

# Query knowledge base
result = knowledge_base.query("What are the features of JitAi platform?")
print(result)

# Add document
knowledge_base.addDocumentByBusinessId(
    businessId="doc_001",
    document=[{"name": "document.pdf", "path": "/path/to/document.pdf"}]
)
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Native Type | Required | Description |
|------|------|-------------|------|------|
| title | Stext | str | Yes | Knowledge base display name |
| type | Stext | str | Yes | Fixed value: `rags.NormalType` |
| backendBundleEntry | Stext | str | Yes | Fixed value: `.` |

### Business Configuration File Configuration
| Parameter | Type | Native Type | Required | Default | Description |
|------|------|-------------|------|--------|------|
| vectorModel.llmElement | Stext | str | Yes | - | LLM element fullName |
| vectorModel.model | Stext | str | Yes | - | Vectorization model name |
| rerankModel.llmElement | Stext | str | No | - | Rerank LLM element fullName |
| rerankModel.model | Stext | str | No | - | Rerank model name |
| topK | Numeric | int | No | 10 | Number of results returned by vector retrieval |
| topN | Numeric | int | No | 3 | Final number of results returned after reranking |
| vectorWeight | Numeric | float | No | 0.5 | Vector retrieval weight, value between 0~1 |
| rerankType | Stext | str | No | "model" | Rerank type: model/basic |
| vectorstoreType | Stext | str | No | "chroma" | Vector storage type |

## Methods 
### query {#query}
Intelligently query knowledge base content, retrieving relevant document segments based on semantic similarity.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| query | Stext | str | Yes | User query content |

#### Return Value
- **Type**: Ltext
- **Description**: Returns knowledge content related to the query, optimized through semantic retrieval and reranking

#### Usage Example
```python title="Query Knowledge Base"
result = knowledge_base.query("What is JitAi platform?")
print(result)
```

### addDocumentByBusinessId
Add new documents to the knowledge base, supporting custom chunking and cleaning configurations.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| businessId | Stext | str | Yes | Business unique identifier for document management |
| document | File | list | Yes | Document attachment list, supports multiple formats |
| splitterConfig | JitDict | dict | No | Document chunking configuration |
| cleanerConfig | JitDict | dict | No | Content cleaning configuration |

#### splitterConfig Configuration Items
Includes parameters such as chunk_size (chunk size), chunk_overlap (overlap length), separator (delimiter), etc.

#### cleanerConfig Configuration Items
Includes options such as remove_extra_whitespace (remove extra whitespace), normalize_unicode (Unicode normalization), remove_urls (remove URLs), etc.

#### Return Value
- **Type**: JitDict
- **Description**: Contains document processing result information

#### Usage Example
```python title="Add Document to Knowledge Base"
result = knowledge_base.addDocumentByBusinessId(
    businessId="product_manual_v1.0",
    document=[{"name": "manual.pdf", "path": "/path/to/manual.pdf"}],
    splitterConfig={"chunk_size": 500, "chunk_overlap": 100},
    cleanerConfig={"remove_extra_whitespace": True, "normalize_unicode": True}
)
```

### deleteDocumentByBusinessId
Delete specified documents and their related vector data from the knowledge base.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|--------|------|-------------|------|------|
| businessId | Stext | str | Yes | Business identifier of the document to be deleted |

#### Return Value
- **Type**: boolean
- **Description**: Returns `true` if deletion is successful, `false` if failed

#### Usage Example
```python title="Delete Document"
success = knowledge_base.deleteDocumentByBusinessId("product_manual_v1.0")
print(f"Deletion result: {success}")
```

### queryKeywords
Query the knowledge base based on keyword lists, supporting exact matching and relevance ranking.

#### Parameter Details
| Parameter | Type | Required | Description |
|--------|------|------|------|
| keywords | list | Yes | Keyword list, supports up to 5 keywords |
| limit | int | No | Limit return count, defaults to configured topN value |

#### Return Value
- **Type**: str
- **Description**: Matched document content, connected by line breaks, including metadata information such as page tags, document titles, document types, etc.

#### Usage Example
```python title="Keyword Query"
# Single keyword query
result = knowledge_base.queryKeywords(["refund"])
print(result)

# Multi-keyword query, limit to 3 results
result = knowledge_base.queryKeywords(
    keywords=["refund", "application", "process"], 
    limit=3
)
print(result)
```

## Properties
None

## Advanced Features
### Intelligent Semantic Retrieval
Implements semantic understanding based on vector embedding technology, supporting intelligent retrieval with non-exact matching.

### Document Chunking Processing
Supports flexible document chunking strategies, optimizing retrieval accuracy through parameters such as chunk_size and chunk_overlap.

### Content Cleaning Optimization
Provides multiple content cleaning options, including whitespace character processing, Unicode normalization, etc., to improve document quality.

### Reranking Algorithm
Adopts a two-stage retrieval strategy, first vector recall of candidate results, then precise ranking through reranking models.

### Real-time Content Updates
Supports incremental updates and precise deletion based on businessId, ensuring real-time content and version management of the knowledge base.
