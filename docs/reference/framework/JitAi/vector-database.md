---
sidebar_position: 2
slug: vector-database
title: "Vector Database Reference"
description: "Vector Database Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Vector Database"
---

# Vector Database
Vector database is a database for vector storage and retrieval, providing semantic search functionality. It handles vector storage, similarity retrieval, metadata filtering and collection management, supporting various metric algorithms such as cosine similarity, Euclidean distance, etc., providing data support for AI knowledge bases and semantic search.

The vector database element has a hierarchical structure of Meta (vectordbs.Meta) → Type (vectordbs.ChromaType) → Instance. Developers can quickly create vector database instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `vectordbs.ChromaType` element provided by JitAi in their own App to implement their own encapsulation.

**Supported Type Types:**

| Type Element | fullName | Vector Database | Description |
|----------|----------|------------|------|
| ChromaType | vectordbs.ChromaType | Chroma | Lightweight vector database, supports persistent and HTTP modes, integrated by default |

## Quick Start 
### Creating Instance Elements
The following is a complete example of creating a Chroma vector database instance element:

#### Directory Structure
```
myapp/vectordbs/MyVectorDB/
├── e.json
└── config.json
```

#### e.json File
```json title="myapp/vectordbs/MyVectorDB/e.json"
{
  "title": "My Vector Database",
  "type": "vectordbs.ChromaType",
  "backendBundleEntry": "."
}
```

#### config.json File
```json title="myapp/vectordbs/MyVectorDB/config.json"
{
  "mode": "persistent",
  "persist_directory": "./vector_data",
  "timeout": 30
}
```

#### Usage Example
```python
# Get vector database element
vector_db = app.getElement("vectordbs.MyVectorDB")

# Health check
health = vector_db.health_check()
print("Database status:", health['status'])

# Create collection
vector_db.create_collection(
    name="documents",
    metadata={"description": "Document vector collection"},
    distance_metric="cosine"
)

# Add vector data
result = vector_db.add_vectors(
    collection_name="documents",
    embeddings=[[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]],
    metadata=[{"title": "Document 1"}, {"title": "Document 2"}],
    ids=["doc1", "doc2"]
)
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Description |
|------|------|------|------|
| title | str | Yes | Instance element display name |
| type | str | Yes | Points to Type element fullName, such as `vectordbs.ChromaType` |
| backendBundleEntry | str | Yes | Fixed as `"."` |

### config.json Configuration
#### General Configuration
| Parameter | Type | Required | Default Value | Description |
|------|------|------|--------|------|
| mode | str | No | "persistent" | Connection mode: persistent/http |
| timeout | int | No | 30 | Connection timeout (seconds) |

#### Persistent Mode Configuration
| Parameter | Type | Required | Description |
|------|------|------|------|
| persist_directory | str | Yes | Persistent storage directory path |

#### HTTP Mode Configuration
| Parameter | Type | Required | Default Value | Description |
|------|------|------|--------|------|
| host | str | No | "localhost" | Database server address |
| port | int | No | 8000 | Database server port |
| auth_token | str | No | - | Authentication token |

## Methods 
### health_check {#health_check}
Check the connection status and running health of the vector database, return basic database information.

**Method Signature**
```python
def health_check(self) -> Dict[str, Any]
```

#### Parameter Details
No parameters required

#### Return Value
- **Type**: Dict
- **Description**: Dictionary containing database status information

**Healthy Status Return Fields:**
| Field | Type | Description |
|------|------|------|
| status | str | Database status: healthy/unhealthy |
| db_type | str | Database type, fixed as "chroma" |
| mode | str | Connection mode: persistent/http |
| collections_count | int | Number of collections |
| heartbeat | int | Heartbeat detection result |
| client_connected | bool | Client connection status |
| version | str | ChromaDB version information |

**Exception Status Return Fields:**
| Field | Type | Description |
|------|------|------|
| status | str | Fixed as "unhealthy" |
| error | str | Error message description |
| db_type | str | Database type, fixed as "chroma" |
| mode | str | Connection mode: persistent/http |
| client_connected | bool | Fixed as False |

#### Usage Example
```python
# Get vector database element
vector_db = app.getElement("vectordbs.MyVectorDB")

# Execute health check
health = vector_db.health_check()
print("Database status:", health['status'])
print("Collections count:", health.get('collections_count', 0))
```

### create_collection {#create_collection}
Create a new collection in the vector database for storing and managing related vector data.

**Method Signature**
```python
def create_collection(self, name: str, metadata: Optional[Dict[str, Any]] = None, distance_metric: str = "cosine") -> Any
```

#### Parameter Details
| Parameter | Type | Required | Default Value | Description |
|------|------|------|--------|------|
| name | str | Yes | - | Collection name, must be unique |
| metadata | Dict | No | None | Collection metadata, optional description information |
| distance_metric | str | No | "cosine" | Distance metric algorithm |

**Supported distance_metric values:**
- `cosine`: Cosine similarity (recommended)
- `euclidean`: Euclidean distance
- `l2`: L2 norm distance
- `ip`: Inner product distance

#### Return Value
- **Type**: Any
- **Description**: Created collection object

#### Usage Example
```python
# Get vector database element
vector_db = app.getElement("vectordbs.MyVectorDB")

# Configure collection parameters
collection_name = "jitai_documents"
metadata = {"description": "JitAi framework demo collection"}

try:
    # Create collection
    vector_db.create_collection(
        name=collection_name,
        metadata=metadata,
        distance_metric="cosine"
    )
    print("Collection created successfully:", collection_name)
except Exception as e:
    if "already exists" in str(e):
        print("Collection already exists:", collection_name)
    else:
        raise e
```

### add_vectors {#add_vectors}
Store vector data and its metadata to the specified collection.

**Method Signature**
```python
def add_vectors(self, collection_name: str, embeddings: List[List[float]], metadata: Optional[List[Dict[str, Any]]] = None, ids: Optional[List[str]] = None) -> Dict[str, Any]
```

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| collection_name | str | Yes | Target collection name |
| embeddings | list | Yes | Vector data list, each vector is a list of floats |
| metadata | list | No | Metadata list corresponding to vectors, optional |
| ids | list | No | Vector ID list, optional, auto-generated if not provided |

#### Return Value
- **Type**: Dict
- **Description**: Dictionary containing addition result information

| Field | Type | Description |
|------|------|------|
| added_count | int | Number of successfully added vectors |
| failed_count | int | Number of failed vector additions |
| collection_name | str | Target collection name |
| vector_dimension | int | Vector dimension |
| batch_size_used | int | Batch size used |

#### Usage Example
```python
# Get vector database element
vector_db = app.getElement("vectordbs.MyVectorDB")

# Configure vector data
collection_name = "jitai_documents"
sample_embeddings = [
    [0.1, 0.2, 0.3, 0.4, 0.5],  # Document 1 vector
    [0.2, 0.3, 0.4, 0.5, 0.6],  # Document 2 vector
    [0.3, 0.4, 0.5, 0.6, 0.7],  # Document 3 vector
]

# Configure metadata
sample_metadata = [
    {"title": "JitAi Architecture Documentation", "category": "Technology", "source": "internal"},
    {"title": "Vector Database Usage Guide", "category": "Tutorial", "source": "docs"},
    {"title": "AI Assistant Development Practice", "category": "Technology", "source": "blog"},
]

# Configure IDs
sample_ids = ["jitai_doc_1", "jitai_doc_2", "jitai_doc_3"]

# Store vector data
result = vector_db.add_vectors(
    collection_name=collection_name,
    embeddings=sample_embeddings,
    metadata=sample_metadata,
    ids=sample_ids
)
print("Added vector count:", result['added_count'])
```

### query_vectors {#query_vectors}
Search for the most similar vector data in the collection based on query vector.

**Method Signature**
```python
def query_vectors(self, collection_name: str, query_embedding: List[float], n_results: int = 10, where: Optional[Dict[str, Any]] = None, include: Optional[List[str]] = None) -> Dict[str, Any]
```

#### Parameter Details
| Parameter | Type | Required | Default Value | Description |
|------|------|------|--------|------|
| collection_name | str | Yes | - | Target collection name |
| query_embedding | list | Yes | - | Query vector, list of floats |
| n_results | int | No | 10 | Number of results to return |
| where | Dict | No | None | Metadata filter conditions, optional |
| include | list | No | ["metadatas", "distances"] | Included return fields |

**Supported include values:**
- `"metadatas"`: Include metadata
- `"distances"`: Include distance values
- `"embeddings"`: Include vector data

#### Return Value
- **Type**: Dict
- **Description**: Dictionary containing search results

| Field | Type | Description |
|------|------|------|
| results | list | Search results list |

**Each item in results contains:**
- `id`: Vector ID
- `distance`: Distance value
- `similarity`: Similarity (0-1, 1 is most similar)
- `metadata`: Metadata (if included)

#### Usage Example
```python
# Get vector database element
vector_db = app.getElement("vectordbs.MyVectorDB")

# Configure query parameters
collection_name = "jitai_documents"
query_embedding = [0.15, 0.25, 0.35, 0.45, 0.55]  # Query vector
where_condition = {"category": "Technology"}  # Filter condition

# Execute similarity search
search_results = vector_db.query_vectors(
    collection_name=collection_name,
    query_embedding=query_embedding,
    n_results=2,
    where=where_condition,
    include=["metadatas", "distances"]
)

# Process search results
print("Search results count:", len(search_results["results"]))
for item in search_results["results"]:
    print("Document ID:", item['id'])
    print("Similarity:", item.get('similarity', 'N/A'))
    print("Title:", item.get('metadata', {}).get('title', 'N/A'))
```

## Properties
None

## Advanced Features
### Adaptive Batch Processing
System automatically adjusts batch size based on vector dimensions to optimize storage performance:
- 384 dimensions: batch size 2000
- 768 dimensions: batch size 1000
- 1536 dimensions: batch size 500
- 2048+ dimensions: batch size 200

### Distance Metric Algorithms
Supports multiple distance metric algorithms to meet different scenario requirements:
- **Cosine Similarity**: Suitable for text semantic analysis, default recommendation
- **Euclidean Distance**: Suitable for spatial data like geographic locations
- **L2 Norm**: Suitable for high-dimensional data like image features
- **Inner Product**: Suitable for recommendation systems and other scenarios

### Intelligent Exception Handling
Built-in intelligent exception mapping mechanism, converts underlying database errors to unified error codes for easier problem diagnosis and handling.

### Flexible Connection Mode Switching
Supports persistent mode and HTTP mode to meet different deployment requirements:
- **Persistent Mode**: Suitable for single-machine deployment, local data storage
- **HTTP Mode**: Suitable for distributed deployment, supports remote access and authentication
