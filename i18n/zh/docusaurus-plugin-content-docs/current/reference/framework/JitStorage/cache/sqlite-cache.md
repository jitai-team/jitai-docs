---
slug: sqlite-cache
description: "SQLite缓存 API 参考文档。完整的规格说明、方法和示例。"
---
# SQLite缓存
SQLite缓存是JitStorage框架提供的轻量级文件缓存解决方案，基于diskcache库和SQLite数据库实现高性能的键值对缓存服务。它负责提供零配置部署、跨平台兼容和SQL查询支持，无需额外的数据库服务器即可实现完整的缓存功能。

SQLite缓存元素分层结构为Meta（caches.Meta） → Type（caches.SqliteType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建SQLite缓存实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的caches.SqliteType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
myapp/
└── caches/
    └── DefaultCache/
        ├── e.json
        └── DefaultCache.json
```

#### e.json文件
```json title="元素声明文件"
{
  "backendBundleEntry": ".",
  "title": "默认缓存",
  "type": "caches.SqliteType"
}
```

## 方法接口 {#methods}

### 标准缓存操作
提供标准的缓存读写和管理方法。

#### 业务配置文件
```json title="DefaultCache.json"
{
  "directory": "appData/caches/DefaultCache/sqlite.db"
}
```

#### 调用示例
```python title="基本使用示例"
# 获取缓存实例
cache = app.getElement('caches.DefaultCache')

# 写入缓存
cache.set('user:123', 'John Doe', 3600)

# 读取缓存
user_name = cache.get('user:123')

# 删除缓存
cache.delete('user:123')
```

## 元素配置
### e.json配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| backendBundleEntry | str | 是 | 后端入口路径，固定为"." |
| title | str | 是 | 缓存元素的显示标题 |
| type | str | 是 | 固定为"caches.SqliteType" |

### 业务配置文件配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| directory | str | 是 | SQLite数据库文件的存储路径，支持相对路径和绝对路径 |

**路径规则**：
- 相对路径：相对于应用根目录，如 `appData/caches/cache.db`
- 绝对路径：使用完整文件系统路径，如 `/var/cache/myapp/cache.db`

## 方法 
### get
从缓存中获取字符串值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值
str - 缓存的字符串值，不存在时返回None

#### 使用示例
```python title="获取缓存值"
cache = app.getElement('caches.DefaultCache')
value = cache.get('config:theme')
if value:
    print(f"当前主题: {value}")
```

### set
写入数据到缓存中，支持字符串、数字、列表、字典等多种数据类型。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| string | - | str/list/dict | 是 | 缓存值，自动序列化复杂数据类型 |
| ts | Numeric | int | 否 | 过期时间（秒），None表示永不过期 |

#### 返回值
bool - 操作成功返回True，失败返回False

#### 使用示例
```python title="设置不同类型的缓存值"
cache = app.getElement('caches.DefaultCache')

# 字符串缓存
cache.set('user:name', 'Alice', 3600)

# 字典缓存
user_data = {'id': 123, 'name': 'Alice', 'role': 'admin'}
cache.set('user:data:123', user_data, 7200)

# 列表缓存
cache.set('recent:orders', [1001, 1002, 1003], 1800)
```

### delete
删除指定的缓存项。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的缓存键名 |

#### 返回值
bool - 删除成功返回True，键不存在也返回True

#### 使用示例
```python title="删除缓存"
cache = app.getElement('caches.DefaultCache')
success = cache.delete('temp:session:abc123')
print(f"删除操作: {'成功' if success else '失败'}")
```

### expire
更新缓存项的过期时间。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| ts | Numeric | int | 是 | 新的过期时间（秒） |

#### 返回值
bool - 更新成功返回True，键不存在返回False

#### 使用示例
```python title="延长缓存时间"
cache = app.getElement('caches.DefaultCache')
# 将缓存延长到1小时后过期
cache.expire('session:user123', 3600)
```

### exists
检查缓存键是否存在。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要检查的缓存键名 |

#### 返回值
bool - 存在返回True，不存在返回False

#### 使用示例
```python title="检查缓存存在性"
cache = app.getElement('caches.DefaultCache')
if cache.exists('user:permission:123'):
    permissions = cache.get('user:permission:123')
else:
    # 从数据库重新加载权限数据
    permissions = load_user_permissions(123)
    cache.set('user:permission:123', permissions, 1800)
```

### incr
原子性地增加数值类型的缓存值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| amount | Numeric | int | 否 | 增加的数值，默认为1 |

#### 返回值
int - 增加后的新值

#### 使用示例
```python title="计数器操作"
cache = app.getElement('caches.DefaultCache')

# 页面访问计数
views = cache.incr('page:views:home')
print(f"首页访问次数: {views}")

# 批量增加
cache.incr('api:calls:today', 10)
```

### keys
获取匹配指定模式的所有缓存键。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| pattern | Stext | str | 否 | 匹配模式，支持通配符，默认"*" |

#### 返回值
generator - 匹配的键名生成器

#### 使用示例
```python title="批量操作缓存键"
cache = app.getElement('caches.DefaultCache')

# 获取所有用户缓存键
user_keys = list(cache.keys('user:*'))
print(f"用户缓存数量: {len(user_keys)}")

# 清理临时缓存
temp_keys = cache.keys('temp:*')
for key in temp_keys:
    cache.delete(key)
```

### getNumeric
获取数值类型的缓存值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |

#### 返回值
int - 数值结果，不存在时返回0

#### 使用示例
```python title="获取数值缓存"
cache = app.getElement('caches.DefaultCache')
count = cache.getNumeric('daily:login:count')
print(f"今日登录人数: {count}")
```

### setNumeric
设置数值类型的缓存值。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 缓存键名 |
| n | Numeric | int | 否 | 数值，默认为0 |
| ts | Numeric | int | 否 | 过期时间（秒） |

#### 返回值
bool - 设置成功返回True

#### 使用示例
```python title="设置数值缓存"
cache = app.getElement('caches.DefaultCache')
cache.setNumeric('system:status', 1, 300)  # 5分钟后过期
```

## 属性
暂无

## 高级特性
### 键名前缀机制
SQLite缓存自动为所有键名添加应用ID前缀，确保不同应用间的缓存隔离。

```python title="键名前缀示例"
# 实际存储的键名格式: {appId}:{name}
cache = app.getElement('caches.DefaultCache')
cache.set('user:123', 'data')  # 实际存储为 "myapp:user:123"
```

### 数据序列化支持
自动处理复杂数据类型的序列化和反序列化。

```python title="复杂数据类型缓存"
cache = app.getElement('caches.DefaultCache')

# 嵌套数据结构
complex_data = {
    'users': [
        {'id': 1, 'name': 'Alice', 'roles': ['admin', 'user']},
        {'id': 2, 'name': 'Bob', 'roles': ['user']}
    ],
    'metadata': {
        'total': 2,
        'updated_at': '2024-01-15T10:30:00Z'
    }
}

cache.set('report:users', complex_data, 3600)
retrieved_data = cache.get('report:users')  # 自动反序列化为原始数据结构
```

### 缓存路径自动管理
系统会自动创建缓存目录并初始化SQLite数据库文件。

```python title="多环境缓存配置"
# 开发环境
{
    "directory": "appData/caches/dev/cache.db"
}

# 生产环境
{
    "directory": "/var/cache/myapp/prod.db"
}
``` 