---
sidebar_position: 2
slug: vector-database
---

# 向量数据库
向量数据库是用于向量存储和检索的数据库，提供语义搜索功能。它负责向量存储、相似度检索、元数据过滤和集合管理，支持余弦相似度、欧几里得距离等多种度量算法，为AI知识库和语义搜索提供数据支撑。

向量数据库元素分层结构为Meta（vectordbs.Meta） → Type（vectordbs.ChromaType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建向量数据库实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的vectordbs.ChromaType元素，以实现自己的封装。

**支持的Type类型：**

| Type元素 | fullName | 向量数据库 | 描述 |
|----------|----------|------------|------|
| ChromaType | vectordbs.ChromaType | Chroma | 轻量级向量数据库，支持持久化和HTTP模式，默认集成 |

## 快速开始 
### 创建实例元素
以下是创建一个Chroma向量数据库实例元素的完整示例：

#### 目录结构
```
myapp/vectordbs/MyVectorDB/
├── e.json
└── config.json
```

#### e.json文件
```json title="myapp/vectordbs/MyVectorDB/e.json"
{
  "title": "我的向量数据库",
  "type": "vectordbs.ChromaType",
  "backendBundleEntry": "."
}
```

#### config.json文件
```json title="myapp/vectordbs/MyVectorDB/config.json"
{
  "mode": "persistent",
  "persist_directory": "./vector_data",
  "timeout": 30
}
```

#### 调用示例
```python
# 获取向量数据库元素
vector_db = app.getElement("vectordbs.MyVectorDB")

# 健康检查
health = vector_db.health_check()
print("数据库状态:", health['status'])

# 创建集合
vector_db.create_collection(
    name="documents",
    metadata={"description": "文档向量集合"},
    distance_metric="cosine"
)

# 添加向量数据
result = vector_db.add_vectors(
    collection_name="documents",
    embeddings=[[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]],
    metadata=[{"title": "文档1"}, {"title": "文档2"}],
    ids=["doc1", "doc2"]
)
```

## 元素配置
### e.json配置
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | str | 是 | 实例元素显示名称 |
| type | str | 是 | 指向Type元素fullName，如`vectordbs.ChromaType` |
| backendBundleEntry | str | 是 | 固定为`"."` |

### config.json配置
#### 通用配置
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| mode | str | 否 | "persistent" | 连接模式：persistent/http |
| timeout | int | 否 | 30 | 连接超时时间（秒） |

#### 持久化模式配置
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| persist_directory | str | 是 | 持久化存储目录路径 |

#### HTTP模式配置
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| host | str | 否 | "localhost" | 数据库服务器地址 |
| port | int | 否 | 8000 | 数据库服务器端口 |
| auth_token | str | 否 | - | 认证令牌 |

## 方法 
### health_check {#health_check}
检查向量数据库的连接状态和运行健康情况，返回数据库基本信息。

**方法签名**
```python
def health_check(self) -> Dict[str, Any]
```

#### 参数详解
无需参数

#### 返回值
- **类型**：Dict
- **说明**：包含数据库状态信息的字典

**健康状态返回字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| status | str | 数据库状态：healthy/unhealthy |
| db_type | str | 数据库类型，固定为"chroma" |
| mode | str | 连接模式：persistent/http |
| collections_count | int | 集合数量 |
| heartbeat | int | 心跳检测结果 |
| client_connected | bool | 客户端连接状态 |
| version | str | ChromaDB版本信息 |

**异常状态返回字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| status | str | 固定为"unhealthy" |
| error | str | 错误信息描述 |
| db_type | str | 数据库类型，固定为"chroma" |
| mode | str | 连接模式：persistent/http |
| client_connected | bool | 固定为False |

#### 使用示例
```python
# 获取向量数据库元素
vector_db = app.getElement("vectordbs.MyVectorDB")

# 执行健康检查
health = vector_db.health_check()
print("数据库状态:", health['status'])
print("集合数量:", health.get('collections_count', 0))
```

### create_collection {#create_collection}
在向量数据库中创建新的集合，用于存储和管理相关的向量数据。

**方法签名**
```python
def create_collection(self, name: str, metadata: Optional[Dict[str, Any]] = None, distance_metric: str = "cosine") -> Any
```

#### 参数详解
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | str | 是 | - | 集合名称，必须唯一 |
| metadata | Dict | 否 | None | 集合元数据，可选的描述信息 |
| distance_metric | str | 否 | "cosine" | 距离度量算法 |

**支持的distance_metric值：**
- `cosine`：余弦相似度（推荐）
- `euclidean`：欧几里得距离
- `l2`：L2范数距离
- `ip`：内积距离

#### 返回值
- **类型**：Any
- **说明**：创建的集合对象

#### 使用示例
```python
# 获取向量数据库元素
vector_db = app.getElement("vectordbs.MyVectorDB")

# 配置集合参数
collection_name = "jitai_documents"
metadata = {"description": "JitAi框架演示集合"}

try:
    # 创建集合
    vector_db.create_collection(
        name=collection_name,
        metadata=metadata,
        distance_metric="cosine"
    )
    print("集合创建成功:", collection_name)
except Exception as e:
    if "already exists" in str(e):
        print("集合已存在:", collection_name)
    else:
        raise e
```

### add_vectors {#add_vectors}
将向量数据及其元数据存储到指定的集合中。

**方法签名**
```python
def add_vectors(self, collection_name: str, embeddings: List[List[float]], metadata: Optional[List[Dict[str, Any]]] = None, ids: Optional[List[str]] = None) -> Dict[str, Any]
```

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| collection_name | str | 是 | 目标集合名称 |
| embeddings | list | 是 | 向量数据列表，每个向量为浮点数列表 |
| metadata | list | 否 | 向量对应的元数据列表，可选 |
| ids | list | 否 | 向量ID列表，可选，如不提供将自动生成 |

#### 返回值
- **类型**：Dict
- **说明**：包含添加结果信息的字典

| 字段 | 类型 | 说明 |
|------|------|------|
| added_count | int | 成功添加的向量数量 |
| failed_count | int | 添加失败的向量数量 |
| collection_name | str | 目标集合名称 |
| vector_dimension | int | 向量维度 |
| batch_size_used | int | 使用的批处理大小 |

#### 使用示例
```python
# 获取向量数据库元素
vector_db = app.getElement("vectordbs.MyVectorDB")

# 配置向量数据
collection_name = "jitai_documents"
sample_embeddings = [
    [0.1, 0.2, 0.3, 0.4, 0.5],  # 文档1的向量
    [0.2, 0.3, 0.4, 0.5, 0.6],  # 文档2的向量
    [0.3, 0.4, 0.5, 0.6, 0.7],  # 文档3的向量
]

# 配置元数据
sample_metadata = [
    {"title": "JitAi架构文档", "category": "技术", "source": "internal"},
    {"title": "向量数据库使用指南", "category": "教程", "source": "docs"},
    {"title": "AI助手开发实践", "category": "技术", "source": "blog"},
]

# 配置ID
sample_ids = ["jitai_doc_1", "jitai_doc_2", "jitai_doc_3"]

# 存储向量数据
result = vector_db.add_vectors(
    collection_name=collection_name,
    embeddings=sample_embeddings,
    metadata=sample_metadata,
    ids=sample_ids
)
print("添加向量数量:", result['added_count'])
```

### query_vectors {#query_vectors}
基于查询向量在集合中搜索最相似的向量数据。

**方法签名**
```python
def query_vectors(self, collection_name: str, query_embedding: List[float], n_results: int = 10, where: Optional[Dict[str, Any]] = None, include: Optional[List[str]] = None) -> Dict[str, Any]
```

#### 参数详解
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| collection_name | str | 是 | - | 目标集合名称 |
| query_embedding | list | 是 | - | 查询向量，浮点数列表 |
| n_results | int | 否 | 10 | 返回结果数量 |
| where | Dict | 否 | None | 元数据过滤条件，可选 |
| include | list | 否 | ["metadatas", "distances"] | 包含的返回字段 |

**支持的include值：**
- `"metadatas"`：包含元数据
- `"distances"`：包含距离值
- `"embeddings"`：包含向量数据

#### 返回值
- **类型**：Dict
- **说明**：包含搜索结果的字典

| 字段 | 类型 | 说明 |
|------|------|------|
| results | list | 搜索结果列表 |

**results中每个项目包含：**
- `id`：向量ID
- `distance`：距离值
- `similarity`：相似度（0-1，1最相似）
- `metadata`：元数据（如果包含）

#### 使用示例
```python
# 获取向量数据库元素
vector_db = app.getElement("vectordbs.MyVectorDB")

# 配置查询参数
collection_name = "jitai_documents"
query_embedding = [0.15, 0.25, 0.35, 0.45, 0.55]  # 查询向量
where_condition = {"category": "技术"}  # 过滤条件

# 执行相似性搜索
search_results = vector_db.query_vectors(
    collection_name=collection_name,
    query_embedding=query_embedding,
    n_results=2,
    where=where_condition,
    include=["metadatas", "distances"]
)

# 处理搜索结果
print("搜索结果数量:", len(search_results["results"]))
for item in search_results["results"]:
    print("文档ID:", item['id'])
    print("相似度:", item.get('similarity', 'N/A'))
    print("标题:", item.get('metadata', {}).get('title', 'N/A'))
```

## 属性
暂无

## 高级特性
### 自适应批处理
系统根据向量维度自动调整批处理大小，优化存储性能：
- 384维：批大小2000
- 768维：批大小1000
- 1536维：批大小500
- 2048维+：批大小200

### 距离度量算法
支持多种距离度量算法，满足不同场景需求：
- **余弦相似度**：适用于文本语义分析，默认推荐
- **欧几里得距离**：适用于地理位置等空间数据
- **L2范数**：适用于图像特征等高维数据
- **内积**：适用于推荐系统等场景

### 智能异常处理
内置智能异常映射机制，将底层数据库错误转换为统一的错误码，便于问题诊断和处理。

### 连接模式灵活切换
支持持久化模式和HTTP模式，满足不同部署需求：
- **持久化模式**：适合单机部署，数据本地存储
- **HTTP模式**：适合分布式部署，支持远程访问和认证
