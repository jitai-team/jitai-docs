---
sidebar_position: 1
slug: create-knowledge-elements
---

# Creating Knowledge Base Elements

In traditional application systems, user manuals are often scattered across multiple documents, and answers to frequently asked questions require repetitive searching.

AI knowledge base elements are specifically designed to address these challenges. They serve not only as document storage containers but also provide semantic understanding and intelligent retrieval capabilities. By transforming diverse documents into structured, machine-understandable knowledge, the knowledge base can comprehend the semantic intent behind user queries and return the most relevant answers.

## Creating AI knowledge base elements {#create-ai-knowledge-base-element}
:::tip
We recommend creating the [LLM vendor](../ai-llm/create-ai-llm#creating-llm-vendor-elements) and [vector database](./vector-database-standalone-deployment) first, so you can select them directly during the knowledge base creation process. For LLM vendors, we recommend `Alibaba Cloud Bailian` and `SiliconFlow`, as they offer a rich selection of embedding and reranking models.
:::

![Creating AI knowledge base element](./img/create-ai-knowledge-base-element.png)

Click the `+` button next to the search box in the element directory tree, then select `AI Knowledge Base` → `Standard Knowledge Base`. This will open the knowledge base creation dialog.

![Creation dialog](./img/create-popup.png)

In the creation dialog, complete the following fields in order: `Name`, `Vector Database`, `Embedding Model`, and `Reranking Model`. Click `OK` to finish the creation.

:::tip
The embedding model significantly impacts search quality. Choose carefully based on your requirements, as it cannot be modified after creation.
:::

![Display in element tree](./img/display-in-element-tree.png)

Once created, the knowledge base will appear in the element tree on the left.

## How it works {#principle-description}

### Core components {#core-components}

AI knowledge bases are built on an advanced RAG (Retrieval-Augmented Generation) architecture, powered by five core components working in concert:

- **Embedding Model**: Transforms documents and queries into high-dimensional vector representations, enabling semantic understanding
- **Reranking Model**: Refines initial retrieval results through precise scoring, improving match accuracy
- **Vector Database**: Provides efficient storage and retrieval of vector data, supporting large-scale similarity computations
- **Document Processor**: Intelligently parses, chunks, and cleans document content to optimize vectorization quality
- **Relational Database**: Maintains document metadata and text chunks, ensuring data consistency and traceability

### System architecture {#system-architecture}

```mermaid
graph TB
    subgraph "Application Layer"
        A[Knowledge Base Manager]
    end

    subgraph "Service Layer"
        B[Document Processor]
        C[Vector Operation Service]
        D[Retrieval Augmentation Engine]
    end

    subgraph "Model Layer"
        E[Vector Model<br/>BGE-M3]
        F[Reranking Model<br/>BCE-Reranker]
    end

    subgraph "Storage Layer"
        G[Vector Database<br/>Semantic Storage]
        H[Relational Database<br/>Metadata Storage]
    end

    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    C --> F
    D --> F
    C --> G
    B --> H
    D --> H
```

### Technical principles {#technical-principles}

**Semantic understanding**: Advanced embedding models (also called vector models) convert natural language into points in a high-dimensional vector space, allowing the system to comprehend semantic relationships rather than relying solely on keyword matching.

**Two-stage retrieval**:
1. **Vector retrieval**: Rapidly identifies semantically similar candidate documents within the vector space
2. **Reranking**: Refines candidate results using deep contextual analysis of the query

**Hybrid storage**: Vector databases handle high-dimensional similarity computations, while relational databases manage structured metadata. This dual-storage approach ensures both retrieval speed and accuracy.

### Data processing flow {#data-processing-flow}

```mermaid
flowchart LR
    A[Document Upload] --> B[Type Recognition]
    B --> C[Content Parsing]
    C --> D[Intelligent Chunking]
    D --> E[Content Cleaning]
    E --> F[Vectorization]
    F --> G[Storage Indexing]
    G --> H[Retrieval Ready]

    subgraph "Processing Optimization"
        I[Batch Operations]
        J[Parallel Processing]
        K[Quality Control]
    end

    F -.-> I
    G -.-> J
    E -.-> K
```

### Retrieval mechanism {#retrieval-mechanism}

```mermaid
sequenceDiagram
    participant U as User Query
    participant V as Vectorization
    participant D as Vector Database
    participant F as Result Filtering
    participant R as Reranking Model
    participant A as Result Assembly

    U->>V: Query Text
    V->>D: Query Vector
    D->>F: TopK Candidate Results
    F->>R: Similarity Filtering
    R->>A: Precise Sorting
    A->>U: TopN Final Results
```

When a user submits a query, the system first converts it into a vector representation. It then retrieves the top-K semantically similar candidate documents from the vector space, filters out low-quality results using similarity thresholds, and finally applies the reranking model to perform context-aware sorting, returning the top-N most relevant knowledge fragments.

> For details on retrieval parameter configuration and usage in backend visual programming, see [Keyword and Semantic Search Using Knowledge Base](./keyword-and-semantic-search).
