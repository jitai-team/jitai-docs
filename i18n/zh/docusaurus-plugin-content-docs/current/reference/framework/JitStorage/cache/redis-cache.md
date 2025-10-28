---
slug: redis-cache
description: "Redis缓存 API 参考文档。完整的规格说明、方法和示例。"
---
# Redis缓存
Redis缓存是基于Redis内存数据库的高性能缓存服务，提供分布式缓存能力和丰富的数据操作功能。它封装了Redis客户端连接管理和标准缓存操作接口，支持多种数据结构操作、过期时间控制和连接池管理，适用于高并发和低延迟要求的应用场景。

Redis缓存元素分层结构为Meta（caches.Meta） → Type（caches.RedisType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Redis缓存实例。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的caches.RedisType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
```text title="推荐目录结构"
caches/
└── MyRedis/              # 缓存实例名称（路径可自定义）
    ├── e.json            # 元素声明文件
    ├── MyRedis.json      # Redis连接配置文件
    └── __init__.py       # 可选的初始化文件
```

#### e.json文件
```json title="元素声明配置"
{
  "backendBundleEntry": ".",
  "title": "我的Redis缓存",
  "type": "caches.RedisType"
}
```

## 方法接口 {#methods}

### 标准缓存操作
提供标准的缓存读写和管理方法。

#### 业务配置文件
```json title="Redis连接配置 (MyRedis.json)"
{
  "host": "127.0.0.1",
  "port": 6379,
  "password": "your_password"
}
```

#### 调用示例
```python title="使用Redis缓存"
# 获取缓存实例
cache = app.getElement("caches.MyRedis")

# 基础字符串操作
cache.set("user:1001", "张三", 3600)  # 设置用户信息，过期时间1小时
user_name = cache.get("user:1001")   # 获取用户信息

# 数值操作
cache.setNumeric("visit_count", 100)      # 设置访问计数
count = cache.getNumeric("visit_count")   # 获取访问计数
new_count = cache.incr("visit_count", 5)  # 增加5次访问

# 过期时间控制
cache.expire("session:abc123", 1800)  # 延长会话过期时间到30分钟

# 键管理
if cache.exists("user:1001"):         # 检查键是否存在
    cache.delete("user:1001")         # 删除键
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| backendBundleEntry | str | 是 | 后端包入口，固定值"." |
| title | str | 是 | 缓存实例的显示名称 |
| type | str | 是 | 固定值"caches.RedisType" |
| icon | str | 否 | 图标标识，可自定义 |

### 业务配置文件配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| host | str | str | 是 | Redis服务器地址 |
| port | int | int | 是 | Redis服务器端口 |
| password | str | str | 是 | Redis连接密码 |
| db | int | int | 否 | 数据库编号，默认1 |
| username | str | str | 否 | 用户名，默认"default" |
| charset | str | str | 否 | 字符编码，默认"utf-8" |
| decode_responses | bool | bool | 否 | 是否解码响应，默认true |
| socket_timeout | float | float | 否 | 套接字超时时间，默认0.5秒 |
| socket_connect_timeout | float | float | 否 | 连接超时时间，默认0.5秒 |

## 方法 
### get
获取缓存中的字符串值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |

#### 返回值
- 类型：str
- 说明：键对应的字符串值，不存在时返回None

#### 使用示例
```python title="获取缓存值"
cache = app.getElement("caches.MyRedis")
value = cache.get("user_token")
if value:
    print(f"用户令牌: {value}")
```

### set
向缓存中写入字符串数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |
| string | str | str | 是 | 要存储的字符串值 |
| ts | int | int | 否 | 过期时间（秒），None表示永不过期 |

#### 返回值
- 类型：bool
- 说明：设置成功返回True，失败返回False

#### 使用示例
```python title="设置缓存值"
cache = app.getElement("caches.MyRedis")

# 设置永久缓存
success = cache.set("config:theme", "dark")

# 设置带过期时间的缓存
success = cache.set("verification_code", "123456", 300)  # 5分钟过期
```

### getNumeric
获取数值类型缓存。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |

#### 返回值
- 类型：int
- 说明：键对应的数值，不存在时返回0

#### 使用示例
```python title="获取数值缓存"
cache = app.getElement("caches.MyRedis")
count = cache.getNumeric("page_views")
print(f"页面访问量: {count}")
```

### setNumeric
设置数值类型缓存。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |
| n | int | int | 否 | 要设置的数值，默认0 |
| ts | int | int | 否 | 过期时间（秒），None表示永不过期 |

#### 返回值
- 类型：bool
- 说明：设置成功返回True，失败返回False

#### 使用示例
```python title="设置数值缓存"
cache = app.getElement("caches.MyRedis")

# 初始化计数器
cache.setNumeric("download_count", 1000)

# 设置带过期时间的限流计数
cache.setNumeric("api_calls:user123", 0, 3600)  # 1小时过期
```

### incr
对数值进行增量操作。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |
| amount | int | int | 否 | 增量值，默认1 |

#### 返回值
- 类型：int
- 说明：增量后的新值

#### 使用示例
```python title="数值增量操作"
cache = app.getElement("caches.MyRedis")

# 简单计数
new_count = cache.incr("visit_count")

# 批量增加
batch_count = cache.incr("download_count", 10)
print(f"当前下载量: {batch_count}")
```

### expire
更新缓存过期时间。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |
| ts | int | int | 是 | 新的过期时间（秒） |

#### 返回值
- 类型：bool
- 说明：更新成功返回True，失败返回False

#### 使用示例
```python title="更新过期时间"
cache = app.getElement("caches.MyRedis")

# 延长会话过期时间
if cache.exists("session:user123"):
    cache.expire("session:user123", 7200)  # 延长到2小时
```

### exists
检查缓存键是否存在。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 缓存键名 |

#### 返回值
- 类型：bool
- 说明：键存在返回True，不存在返回False

#### 使用示例
```python title="检查键存在性"
cache = app.getElement("caches.MyRedis")

if cache.exists("user_cache:1001"):
    print("用户缓存存在")
else:
    print("需要重新加载用户数据")
```

### delete
删除缓存键。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | str | str | 是 | 要删除的缓存键名 |

#### 返回值
- 类型：bool
- 说明：删除成功返回True，失败返回False

#### 使用示例
```python title="删除缓存"
cache = app.getElement("caches.MyRedis")

# 清除用户会话
success = cache.delete("session:user123")
if success:
    print("会话已清除")
```

### keys
获取匹配模式的键列表。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| pattern | str | str | 否 | 匹配模式，默认"*"表示所有键 |

#### 返回值
- 类型：iterator
- 说明：返回匹配的键名迭代器

#### 使用示例
```python title="查找匹配的键"
cache = app.getElement("caches.MyRedis")

# 查找所有用户会话
for key in cache.keys("session:*"):
    print(f"会话键: {key}")

# 查找特定前缀的配置
config_keys = list(cache.keys("config:*"))
```

### ping
测试Redis连接状态。

#### 使用示例
```python title="测试连接"
cache = app.getElement("caches.MyRedis")

if cache.ping():
    print("Redis连接正常")
else:
    print("Redis连接异常")
```

### disconnect
断开Redis连接。

#### 使用示例
```python title="断开连接"
cache = app.getElement("caches.MyRedis")
cache.disconnect()
```

## 属性
Redis缓存元素主要通过方法提供功能，暂无直接访问的公开属性。

## 高级特性
### 连接池管理
Redis缓存自动管理连接池，相同配置的实例会复用连接，提高性能并减少资源消耗。

```python title="连接池复用示例"
# 多个实例使用相同配置时会自动复用连接
cache1 = app.getElement("caches.Redis1")
cache2 = app.getElement("caches.Redis2")  # 如果配置相同，会复用连接池
```

### 键名前缀自动管理
所有缓存操作都会自动添加应用ID前缀，避免不同应用间的键名冲突。

```python title="键名前缀机制"
# 实际存储的键名会自动加上应用ID前缀
cache.set("user_data", "value")
# 实际存储为: "myapp:user_data"
```

### 环境变量配置
配置文件支持模板字符串，可以使用环境变量进行动态配置。

```json title="使用环境变量的配置示例"
{
  "host": "{{REDIS_HOST}}",
  "port": "{{REDIS_PORT}}",
  "password": "{{REDIS_PASSWORD}}",
  "db": 1
}
```

### 异常处理
Redis缓存提供完善的异常处理机制，连接失败和认证错误会自动转换为友好的错误信息。

```python title="异常处理示例"
try:
    cache = app.getElement("caches.MyRedis")
    cache.set("test_key", "test_value")
except Exception as e:
    # 系统会自动处理连接异常，提供清晰的错误提示
    print(f"缓存操作失败: {e}")
``` 