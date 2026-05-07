---
slug: built-in-cache
description: "内置缓存 API 参考文档。完整的规格说明、方法和示例。"
---
# 内置缓存
内置缓存是平台提供的智能缓存解决方案，基于环境自适应机制实现开箱即用的缓存能力。它在桌面版环境下自动使用SQLite缓存，在服务器版环境下自动使用容器内置的Redis。内置缓存主要用于开发和测试阶段，为开发者提供无需配置的缓存服务。

内置缓存元素分层结构为Meta（caches.Meta） → Type（caches.BuiltinsType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建内置缓存实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的caches.BuiltinsType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
caches/
└── Default/
    ├── e.json
    └── __init__.py
```

#### e.json文件
```json title="e.json配置示例"
{
  "title": "默认缓存",
  "type": "caches.BuiltinsType"
}
```

#### 调用示例
```python title="基础缓存操作"
# 获取缓存实例
cache = app.getElement("caches.Default")

# 基础字符串操作
cache.set("user_token", "abc123", 3600)  # 设置带过期时间
value = cache.get("user_token")           # 获取值
cache.delete("user_token")                # 删除键

# 数值操作
cache.setNumeric("view_count", 100)       # 设置数值
count = cache.getNumeric("view_count")    # 获取数值
new_count = cache.incr("view_count", 5)   # 递增操作

# 键管理
exists = cache.exists("user_token")       # 检查键是否存在
cache.expire("user_token", 1800)         # 设置过期时间
keys = cache.keys("user_*")               # 获取匹配的键列表
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 缓存实例显示名称 |
| type | string | 是 | 固定值"caches.BuiltinsType" |

## 方法 
### get
从缓存中获取字符串值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值
str - 缓存的字符串值，键不存在时返回None

#### 使用示例
```python title="获取缓存值"
cache = app.getElement("caches.Default")
token = cache.get("user_session_token")
if token:
    print(f"用户令牌: {token}")
else:
    print("令牌不存在或已过期")
```

### set
将字符串数据写入缓存。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| string | Stext | str | 是 | 要缓存的字符串值 |
| ts | Numeric | int | 否 | 过期时间（秒），不设置则永不过期 |

#### 返回值
bool - 操作成功返回True，失败返回False

#### 使用示例
```python title="设置缓存值"
cache = app.getElement("caches.Default")

# 永久缓存
cache.set("app_config", '{"theme": "dark", "lang": "zh-CN"}')

# 带过期时间的缓存
cache.set("verification_code", "123456", 300)  # 5分钟后过期
```

### getNumeric
获取数值类型的缓存数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值
int - 缓存的数值，键不存在时返回0

#### 使用示例
```python title="获取数值"
cache = app.getElement("caches.Default")
current_count = cache.getNumeric("daily_visits")
print(f"今日访问量: {current_count}")
```

### setNumeric
设置数值类型的缓存数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| n | Numeric | int | 是 | 要缓存的数值 |
| ts | Numeric | int | 否 | 过期时间（秒） |

#### 返回值
bool - 操作成功返回True，失败返回False

#### 使用示例
```python title="设置数值"
cache = app.getElement("caches.Default")

# 设置初始访问量
cache.setNumeric("page_views", 0)

# 设置带过期时间的计数器
cache.setNumeric("login_attempts", 0, 3600)  # 1小时后重置
```

### incr
递增数值缓存数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| amount | Numeric | int | 否 | 递增量，默认为1 |

#### 返回值
int - 递增后的新值

#### 使用示例
```python title="递增操作"
cache = app.getElement("caches.Default")

# 增加1
new_views = cache.incr("page_views")

# 增加指定数量
bulk_views = cache.incr("page_views", 10)

print(f"当前浏览量: {new_views}")
```

### delete
删除指定的缓存键。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的缓存键名 |

#### 返回值
bool - 删除成功返回True，键不存在或删除失败返回False

#### 使用示例
```python title="删除缓存"
cache = app.getElement("caches.Default")

# 删除用户会话
success = cache.delete("user_session_123")
if success:
    print("会话已清除")
else:
    print("会话不存在或清除失败")
```

### expire
为指定键设置过期时间。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| ts | Numeric | int | 是 | 过期时间（秒） |

#### 返回值
bool - 设置成功返回True，键不存在或设置失败返回False

#### 使用示例
```python title="设置过期时间"
cache = app.getElement("caches.Default")

# 为现有键设置过期时间
cache.set("temp_data", "some_value")
cache.expire("temp_data", 1800)  # 30分钟后过期
```

### exists
检查指定键是否存在。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要检查的缓存键名 |

#### 返回值
bool - 键存在返回True，不存在返回False

#### 使用示例
```python title="检查键存在性"
cache = app.getElement("caches.Default")

if cache.exists("user_preferences"):
    preferences = cache.get("user_preferences")
    print("找到用户偏好设置")
else:
    print("用户偏好设置不存在，使用默认值")
```

### keys
获取匹配指定模式的所有键。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| pattern | Stext | str | 否 | 匹配模式，默认为"*"（所有键） |

#### 返回值
iterator - 匹配的键名迭代器

#### 使用示例
```python title="获取匹配键"
cache = app.getElement("caches.Default")

# 获取所有用户会话键
session_keys = list(cache.keys("session_*"))
print(f"当前活跃会话数: {len(session_keys)}")

# 获取所有缓存键
all_keys = list(cache.keys())
print(f"缓存中总键数: {len(all_keys)}")
```

### ping
检查缓存服务连接状态。

#### 返回值
bool - 连接正常返回True，异常返回False

#### 使用示例
```python title="检查连接状态"
cache = app.getElement("caches.Default")

if cache.ping():
    print("缓存服务连接正常")
    # 执行缓存操作
    cache.set("health_check", "ok")
else:
    print("缓存服务连接异常，使用备用方案")
```

## 属性
暂无

## 高级特性
### 智能环境适配
内置缓存根据部署环境自动选择最适合的底层技术实现，无需手动配置。

#### 配置示例和使用示例
```python title="环境自适应缓存"
# 同样的代码在不同环境下使用不同的缓存技术
cache = app.getElement("caches.Default")

# 服务器环境：自动使用Redis缓存（高性能，支持分布式）
# 桌面环境：自动使用SQLite缓存（零配置，文件存储）
# 开发者无需关心底层实现差异
cache.set("business_data", json.dumps(data))
cached_data = cache.get("business_data")
```

### 应用级键前缀管理
内置缓存自动为所有键添加应用标识前缀，避免不同应用间的键冲突。

#### 配置示例和使用示例
```python title="自动键前缀"
# 应用ID为"MyApp"时的键管理
cache = app.getElement("caches.Default")

# 实际存储的键名会自动添加应用前缀
cache.set("user_config", "config_data")
# 实际键名: "MyApp:user_config"
# 获取时无需指定前缀，自动处理
config = cache.get("user_config")

# 键匹配也会自动处理前缀
user_keys = cache.keys("user_*")
# 实际匹配: "MyApp:user_*"
```

### 性能优化和容错处理
内置缓存针对不同环境进行了性能优化，并提供了完善的容错机制。

#### 配置示例和使用示例
```python title="性能优化使用"
cache = app.getElement("caches.Default")

# 批量操作时的性能优化
user_data = {
    "profile": json.dumps(user_profile),
    "preferences": json.dumps(user_prefs),
    "permissions": json.dumps(user_perms)
}

# 高效的批量写入
for key, value in user_data.items():
    cache.set(f"user_{user_id}_{key}", value, 7200)

# 容错处理示例
try:
    result = cache.get("critical_data")
    if result is None:
        # 缓存未命中，从数据库获取
        result = fetch_from_database()
        cache.set("critical_data", result, 3600)
except Exception as e:
    # 缓存服务异常，直接使用数据库
    result = fetch_from_database()
``` 