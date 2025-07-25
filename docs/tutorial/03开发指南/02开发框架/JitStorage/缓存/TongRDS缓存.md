# TongRDS缓存

TongRDS缓存是基于Redis协议实现的东方通数据库缓存解决方案，专门为有国产化数据库需求的企业级应用提供高性能数据缓存服务。它采用与Redis相同的客户端接口，支持分布式部署和企业级连接管理，通过连接池机制确保高并发环境下的稳定性能。

TongRDS缓存元素分层结构为Meta（caches.Meta） → Type（caches.TongRDSType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建TongRDS缓存实例元素。

## 快速开始

### 创建实例元素

#### 目录结构

```text title="推荐目录结构"
caches/
└── TongRdsCache/                    # 实例元素目录（可自定义）
    ├── e.json                       # 元素定义文件
    └── TongRdsCache.json           # 连接配置文件
```

#### e.json文件

```json title="e.json"
{
  "backendBundleEntry": ".",
  "title": "TongRDS缓存实例",
  "type": "caches.TongRDSType"
}
```

#### 业务配置文件

```json title="TongRdsCache.json"
{
  "host": "192.168.1.100",
  "port": 6379
}
```

#### 调用示例

```python title="使用TongRDS缓存"
# 获取缓存实例
cache = app.getElement("caches.TongRdsCache")

# 基础字符串操作
cache.set("user_name", "张三", 3600)  # 设置带过期时间的值
value = cache.get("user_name")       # 获取值

# 数值操作
cache.setNumeric("counter", 100, 7200)  # 设置数值
count = cache.getNumeric("counter")      # 获取数值
cache.incr("counter", 5)                 # 递增5

# 键管理
exists = cache.exists("user_name")       # 检查键是否存在
cache.expire("user_name", 1800)         # 更新过期时间
cache.delete("user_name")               # 删除键

# 连接管理
is_connected = cache.ping()              # 测试连接
cache.disconnect()                       # 断开连接
```

## 元素配置

### e.json配置

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| title | Stext | str | 是 | 缓存实例显示名称 |
| type | Stext | str | 是 | 固定为"caches.TongRDSType" |
| backendBundleEntry | Stext | str | 是 | 后端入口路径，固定为"." |

### 业务配置文件配置

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| host | Stext | str | 是 | TongRDS服务器地址 |
| port | Numeric | int | 是 | TongRDS服务端口号 |
| password | Stext | str | 否 | 认证密码，无密码时可省略 |
| db | Numeric | int | 否 | 数据库编号，默认为1 |
| charset | Stext | str | 否 | 字符编码，默认为"utf-8" |
| decode_responses | Checkbox | bool | 否 | 是否解码响应，默认为true |
| socket_timeout | Numeric | float | 否 | 套接字超时时间（秒），默认0.5 |
| socket_connect_timeout | Numeric | float | 否 | 连接超时时间（秒），默认0.5 |

## 方法

### get

从缓存中获取字符串值。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值

str: 缓存中的字符串值，键不存在时返回None

#### 使用示例

```python title="获取缓存值"
cache = app.getElement("caches.TongRdsCache")

# 获取字符串值
user_info = cache.get("user_info")
if user_info:
    print(f"用户信息: {user_info}")
else:
    print("用户信息不存在")
```

### set

将字符串值写入缓存。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| string | Stext | str | 是 | 要存储的字符串值 |
| ts | Numeric | int | 否 | 过期时间（秒），不设置则永不过期 |

#### 返回值

bool: 设置成功返回True，失败返回False

#### 使用示例

```python title="设置缓存值"
cache = app.getElement("caches.TongRdsCache")

# 设置永久有效的值
success = cache.set("app_config", '{"theme": "dark", "lang": "zh"}')

# 设置带过期时间的值（1小时后过期）
cache.set("session_token", "abc123", 3600)

# 设置用户会话（30分钟后过期）
cache.set("user_session", "user_data", 1800)
```

### getNumeric

获取数值类型的缓存值。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值

int: 缓存中的数值，键不存在时返回0

#### 使用示例

```python title="获取数值"
cache = app.getElement("caches.TongRdsCache")

# 获取计数器值
count = cache.getNumeric("page_views")
print(f"页面访问次数: {count}")

# 获取库存数量
stock = cache.getNumeric("product_stock")
if stock > 0:
    print(f"库存充足: {stock}件")
```

### setNumeric

设置数值类型的缓存值。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| n | Numeric | int | 否 | 要设置的数值，默认为0 |
| ts | Numeric | int | 否 | 过期时间（秒），不设置则永不过期 |

#### 返回值

bool: 设置成功返回True，失败返回False

#### 使用示例

```python title="设置数值"
cache = app.getElement("caches.TongRdsCache")

# 初始化计数器
cache.setNumeric("daily_visits", 0)

# 设置带过期时间的限流计数（5分钟过期）
cache.setNumeric("api_rate_limit", 100, 300)

# 设置商品库存
cache.setNumeric("product_123_stock", 50)
```

### incr

将指定键的数值增加指定数量。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| amount | Numeric | int | 否 | 增加的数量，默认为1 |

#### 返回值

int: 增加后的数值

#### 使用示例

```python title="数值递增"
cache = app.getElement("caches.TongRdsCache")

# 简单计数器递增
new_count = cache.incr("page_views")
print(f"新的访问量: {new_count}")

# 批量递增
batch_count = cache.incr("batch_counter", 10)

# 实现限流计数器
current_requests = cache.incr("api_requests_per_minute")
if current_requests > 100:
    print("请求频率超限")
```

### delete

删除指定的缓存键。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的缓存键名 |

#### 返回值

bool: 删除成功返回True，键不存在返回False

#### 使用示例

```python title="删除缓存"
cache = app.getElement("caches.TongRdsCache")

# 删除用户会话
if cache.delete("user_session_123"):
    print("会话删除成功")

# 清理过期的临时数据
cache.delete("temp_data")
cache.delete("cache_lock")
```

### exists

检查指定键是否存在。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要检查的缓存键名 |

#### 返回值

bool: 键存在返回True，不存在返回False

#### 使用示例

```python title="检查键存在性"
cache = app.getElement("caches.TongRdsCache")

# 检查缓存是否存在
if cache.exists("user_preferences"):
    preferences = cache.get("user_preferences")
else:
    # 从数据库加载并缓存
    preferences = load_from_database()
    cache.set("user_preferences", preferences, 1800)
```

### expire

更新指定键的过期时间。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| ts | Numeric | int | 是 | 新的过期时间（秒） |

#### 返回值

bool: 设置成功返回True，键不存在返回False

#### 使用示例

```python title="更新过期时间"
cache = app.getElement("caches.TongRdsCache")

# 延长会话有效期（再延长30分钟）
if cache.expire("user_session", 1800):
    print("会话时间延长成功")

# 为临时数据设置过期时间
cache.expire("temp_result", 600)  # 10分钟后过期
```

### keys

返回匹配指定模式的键列表。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| pattern | Stext | str | 否 | 匹配模式，默认为"*"（所有键） |

#### 返回值

iterator: 匹配的键名迭代器

#### 使用示例

```python title="查找匹配的键"
cache = app.getElement("caches.TongRdsCache")

# 获取所有用户会话键
session_keys = list(cache.keys("user_session_*"))
print(f"当前活跃会话数: {len(session_keys)}")

# 查找特定前缀的缓存
cache_keys = list(cache.keys("cache_*"))
for key in cache_keys:
    print(f"缓存键: {key}")
```

### ping

测试与TongRDS服务的连接状态。

#### 返回值

bool: 连接正常返回True，连接失败返回False

#### 使用示例

```python title="测试连接"
cache = app.getElement("caches.TongRdsCache")

# 检查连接状态
if cache.ping():
    print("TongRDS连接正常")
else:
    print("TongRDS连接失败，请检查网络和配置")
```

### disconnect

断开与TongRDS服务的连接。

#### 使用示例

```python title="断开连接"
cache = app.getElement("caches.TongRdsCache")

# 执行清理操作后断开连接
cache.delete("temp_lock")
cache.disconnect()
print("已断开TongRDS连接")
```

## 属性

### client

TongRDS客户端连接对象，基于Redis客户端实现。通过连接池机制管理连接，确保高并发环境下的稳定性。开发者通常不需要直接访问此属性，建议使用封装好的方法进行操作。

## 高级特性

### 连接池管理

TongRDS缓存使用内部连接池机制，根据配置参数的MD5值作为缓存键，相同配置的实例共享连接，避免重复创建连接对象。

```python title="连接池配置优化"
cache = app.getElement("caches.TongRdsCache")

# 连接池会自动管理连接
# 相同配置的多个实例会共享连接
for i in range(100):
    result = cache.get(f"data_{i}")
    # 连接会被复用，无需担心连接数过多

# 手动断开连接（释放连接池中的连接）
cache.disconnect()
```

### 错误处理机制

TongRDS缓存内置错误处理，自动捕获连接错误和认证错误，返回对应的错误码。

```python title="错误处理示例"
try:
    cache = app.getElement("caches.TongRdsCache")
    cache.set("test_key", "test_value")
except Exception as e:
    # 连接错误：IP地址或端口号错误  
    # 认证错误：用户名或密码错误
    print(f"缓存操作失败: {e}")
```

### 键名前缀管理

TongRDS缓存自动为所有键名添加应用ID前缀，避免不同应用间的键名冲突。实际存储的键名格式为：`{appId}:{name}`。

```python title="键名前缀处理"
cache = app.getElement("caches.TongRdsCache")

# 设置键 "user_123"
cache.set("user_123", "用户数据")

# 实际存储的键名为: "myapp:user_123"
# 获取时无需关心前缀，直接使用原始键名
user_data = cache.get("user_123")
``` 