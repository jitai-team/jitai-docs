---
slug: sqlite-cache
---
# SQLite Cache
SQLite cache is a lightweight file caching solution provided by the JitStorage framework, implementing high-performance key-value cache services based on diskcache library and SQLite database. It provides zero-configuration deployment, cross-platform compatibility, and SQL query support, enabling complete caching functionality without additional database servers.

The hierarchical structure of SQLite cache elements is Meta (caches.Meta) → Type (caches.SqliteType) → Instance. Developers can quickly create SQLite cache instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `caches.SqliteType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
myapp/
└── caches/
    └── DefaultCache/
        ├── e.json
        └── DefaultCache.json
```

#### e.json File
```json title="Element Declaration File"
{
  "backendBundleEntry": ".",
  "title": "Default Cache",
  "type": "caches.SqliteType"
}
```

## Method Interfaces {#methods}

### Standard Cache Operations
Provides standard cache read/write and management methods.

#### Business Configuration File
```json title="DefaultCache.json"
{
  "directory": "appData/caches/DefaultCache/sqlite.db"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get cache instance
cache = app.getElement('caches.DefaultCache')

# Write to cache
cache.set('user:123', 'John Doe', 3600)

# Read from cache
user_name = cache.get('user:123')

# Delete cache
cache.delete('user:123')
```

## Element Configuration
### e.json Configuration
| Property | Type | Required | Description |
|------|------|------|------|
| backendBundleEntry | str | Yes | Backend entry path, fixed as "." |
| title | str | Yes | Display title of cache element |
| type | str | Yes | Fixed as "caches.SqliteType" |

### Business Configuration File
| Property | Type | Required | Description |
|------|------|------|------|
| directory | str | Yes | Storage path for SQLite database file, supports relative and absolute paths |

**Path Rules**:
- Relative path: Relative to application root directory, e.g., `appData/caches/cache.db`
- Absolute path: Use complete file system path, e.g., `/var/cache/myapp/cache.db`

## Methods
### get
Get string value from cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
str - Cached string value, returns None if not exists

#### Usage Example
```python title="Get Cache Value"
cache = app.getElement('caches.DefaultCache')
value = cache.get('config:theme')
if value:
    print(f"Current theme: {value}")
```

### set
Write data to cache, supporting strings, numbers, lists, dictionaries, and other data types.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| string | - | str/list/dict | Yes | Cache value, automatically serializes complex data types |
| ts | Numeric | int | No | Expiration time (seconds), None means never expires |

#### Return Value
bool - Returns True on success, False on failure

#### Usage Example
```python title="Set Different Types of Cache Values"
cache = app.getElement('caches.DefaultCache')

# String cache
cache.set('user:name', 'Alice', 3600)

# Dictionary cache
user_data = {'id': 123, 'name': 'Alice', 'role': 'admin'}
cache.set('user:data:123', user_data, 7200)

# List cache
cache.set('recent:orders', [1001, 1002, 1003], 1800)
```

### delete
Delete specified cache item.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to delete |

#### Return Value
bool - Returns True on successful deletion, also returns True if key doesn't exist

#### Usage Example
```python title="Delete Cache"
cache = app.getElement('caches.DefaultCache')
success = cache.delete('temp:session:abc123')
print(f"Delete operation: {'Success' if success else 'Failed'}")
```

### expire
Update cache item expiration time.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| ts | Numeric | int | Yes | New expiration time (seconds) |

#### Return Value
bool - Returns True on success, False if key doesn't exist

#### Usage Example
```python title="Extend Cache Time"
cache = app.getElement('caches.DefaultCache')
# Extend cache to expire after 1 hour
cache.expire('session:user123', 3600)
```

### exists
Check if cache key exists.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to check |

#### Return Value
bool - Returns True if exists, False if not

#### Usage Example
```python title="Check Cache Existence"
cache = app.getElement('caches.DefaultCache')
if cache.exists('user:permission:123'):
    permissions = cache.get('user:permission:123')
else:
    # Reload permission data from database
    permissions = load_user_permissions(123)
    cache.set('user:permission:123', permissions, 1800)
```

### incr
Atomically increment numeric type cache value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| amount | Numeric | int | No | Increment value, defaults to 1 |

#### Return Value
int - New value after increment

#### Usage Example
```python title="Counter Operations"
cache = app.getElement('caches.DefaultCache')

# Page view counting
views = cache.incr('page:views:home')
print(f"Home page views: {views}")

# Batch increment
cache.incr('api:calls:today', 10)
```

### keys
Get all cache keys matching specified pattern.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| pattern | Stext | str | No | Match pattern, supports wildcards, defaults to "*" |

#### Return Value
generator - Generator of matching key names

#### Usage Example
```python title="Batch Operations on Cache Keys"
cache = app.getElement('caches.DefaultCache')

# Get all user cache keys
user_keys = list(cache.keys('user:*'))
print(f"User cache count: {len(user_keys)}")

# Clean up temporary cache
temp_keys = cache.keys('temp:*')
for key in temp_keys:
    cache.delete(key)
```

### getNumeric
Get numeric type cache value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
int - Numeric result, returns 0 if not exists

#### Usage Example
```python title="Get Numeric Cache"
cache = app.getElement('caches.DefaultCache')
count = cache.getNumeric('daily:login:count')
print(f"Today's login count: {count}")
```

### setNumeric
Set numeric type cache value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| n | Numeric | int | No | Numeric value, defaults to 0 |
| ts | Numeric | int | No | Expiration time (seconds) |

#### Return Value
bool - Returns True on success

#### Usage Example
```python title="Set Numeric Cache"
cache = app.getElement('caches.DefaultCache')
cache.setNumeric('system:status', 1, 300)  # Expires in 5 minutes
```

## Properties
None currently.

## Advanced Features
### Key Name Prefix Mechanism
SQLite cache automatically adds application ID prefix to all key names, ensuring cache isolation between different applications.

```python title="Key Name Prefix Example"
# Actual stored key name format: {appId}:{name}
cache = app.getElement('caches.DefaultCache')
cache.set('user:123', 'data')  # Actually stored as "myapp:user:123"
```

### Data Serialization Support
Automatically handles serialization and deserialization of complex data types.

```python title="Complex Data Type Caching"
cache = app.getElement('caches.DefaultCache')

# Nested data structure
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
retrieved_data = cache.get('report:users')  # Automatically deserialized to original data structure
```

### Automatic Cache Path Management
System automatically creates cache directories and initializes SQLite database files.

```python title="Multi-environment Cache Configuration"
# Development environment
{
    "directory": "appData/caches/dev/cache.db"
}

# Production environment
{
    "directory": "/var/cache/myapp/prod.db"
}
```