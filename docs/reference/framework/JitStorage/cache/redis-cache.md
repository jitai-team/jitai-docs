---
slug: redis-cache
title: "Redis Cache Reference"
description: "Redis Cache Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Redis Cache"
---
# Redis Cache
Redis cache is a high-performance caching service based on Redis in-memory database, providing distributed caching capabilities and rich data operation functions. It encapsulates Redis client connection management and standard cache operation interfaces, supporting multiple data structure operations, expiration time control, and connection pool management, suitable for high-concurrency and low-latency application scenarios.

The hierarchical structure of Redis cache elements is Meta (caches.Meta) → Type (caches.RedisType) → Instance. Developers can quickly create Redis cache instances through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `caches.RedisType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
```text title="Recommended Directory Structure"
caches/
└── MyRedis/              # Cache instance name (path can be customized)
    ├── e.json            # Element declaration file
    ├── MyRedis.json      # Redis connection configuration file
    └── __init__.py       # Optional initialization file
```

#### e.json File
```json title="Element Declaration Configuration"
{
  "backendBundleEntry": ".",
  "title": "My Redis Cache",
  "type": "caches.RedisType"
}
```

## Method Interfaces {#methods}

### Standard Cache Operations
Provides standard cache read/write and management methods.

#### Business Configuration File
```json title="Redis Connection Configuration (MyRedis.json)"
{
  "host": "127.0.0.1",
  "port": 6379,
  "password": "your_password"
}
```

#### Usage Example
```python title="Using Redis Cache"
# Get cache instance
cache = app.getElement("caches.MyRedis")

# Basic string operations
cache.set("user:1001", "张三", 3600)  # Set user info, expire in 1 hour
user_name = cache.get("user:1001")   # Get user info

# Numeric operations
cache.setNumeric("visit_count", 100)      # Set visit count
count = cache.getNumeric("visit_count")   # Get visit count
new_count = cache.incr("visit_count", 5)  # Increase by 5 visits

# Expiration time control
cache.expire("session:abc123", 1800)  # Extend session expiration to 30 minutes

# Key management
if cache.exists("user:1001"):         # Check if key exists
    cache.delete("user:1001")         # Delete key
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| backendBundleEntry | str | Yes | Backend bundle entry, fixed value "." |
| title | str | Yes | Display name of cache instance |
| type | str | Yes | Fixed value "caches.RedisType" |
| icon | str | No | Icon identifier, customizable |

### Business Configuration File
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| host | str | str | Yes | Redis server address |
| port | int | int | Yes | Redis server port |
| password | str | str | Yes | Redis connection password |
| db | int | int | No | Database number, default 1 |
| username | str | str | No | Username, default "default" |
| charset | str | str | No | Character encoding, default "utf-8" |
| decode_responses | bool | bool | No | Whether to decode responses, default true |
| socket_timeout | float | float | No | Socket timeout, default 0.5 seconds |
| socket_connect_timeout | float | float | No | Connection timeout, default 0.5 seconds |

## Methods
### get
Get string value from cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |

#### Return Value
- Type: str
- Description: String value corresponding to key, returns None if not exists

#### Usage Example
```python title="Get Cache Value"
cache = app.getElement("caches.MyRedis")
value = cache.get("user_token")
if value:
    print(f"User token: {value}")
```

### set
Write string data to cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |
| string | str | str | Yes | String value to store |
| ts | int | int | No | Expiration time (seconds), None means never expires |

#### Return Value
- Type: bool
- Description: Returns True on success, False on failure

#### Usage Example
```python title="Set Cache Value"
cache = app.getElement("caches.MyRedis")

# Set permanent cache
success = cache.set("config:theme", "dark")

# Set cache with expiration time
success = cache.set("verification_code", "123456", 300)  # Expires in 5 minutes
```

### getNumeric
Get numeric type cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |

#### Return Value
- Type: int
- Description: Numeric value corresponding to key, returns 0 if not exists

#### Usage Example
```python title="Get Numeric Cache"
cache = app.getElement("caches.MyRedis")
count = cache.getNumeric("page_views")
print(f"Page views: {count}")
```

### setNumeric
Set numeric type cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |
| n | int | int | No | Numeric value to set, default 0 |
| ts | int | int | No | Expiration time (seconds), None means never expires |

#### Return Value
- Type: bool
- Description: Returns True on success, False on failure

#### Usage Example
```python title="Set Numeric Cache"
cache = app.getElement("caches.MyRedis")

# Initialize counter
cache.setNumeric("download_count", 1000)

# Set rate limiting counter with expiration time
cache.setNumeric("api_calls:user123", 0, 3600)  # Expires in 1 hour
```

### incr
Perform increment operation on numeric value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |
| amount | int | int | No | Increment value, default 1 |

#### Return Value
- Type: int
- Description: New value after increment

#### Usage Example
```python title="Numeric Increment Operation"
cache = app.getElement("caches.MyRedis")

# Simple counting
new_count = cache.incr("visit_count")

# Batch increment
batch_count = cache.incr("download_count", 10)
print(f"Current downloads: {batch_count}")
```

### expire
Update cache expiration time.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |
| ts | int | int | Yes | New expiration time (seconds) |

#### Return Value
- Type: bool
- Description: Returns True on success, False on failure

#### Usage Example
```python title="Update Expiration Time"
cache = app.getElement("caches.MyRedis")

# Extend session expiration time
if cache.exists("session:user123"):
    cache.expire("session:user123", 7200)  # Extend to 2 hours
```

### exists
Check if cache key exists.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name |

#### Return Value
- Type: bool
- Description: Returns True if key exists, False if not

#### Usage Example
```python title="Check Key Existence"
cache = app.getElement("caches.MyRedis")

if cache.exists("user_cache:1001"):
    print("User cache exists")
else:
    print("Need to reload user data")
```

### delete
Delete cache key.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | str | str | Yes | Cache key name to delete |

#### Return Value
- Type: bool
- Description: Returns True on success, False on failure

#### Usage Example
```python title="Delete Cache"
cache = app.getElement("caches.MyRedis")

# Clear user session
success = cache.delete("session:user123")
if success:
    print("Session cleared")
```

### keys
Get list of keys matching pattern.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| pattern | str | str | No | Match pattern, default "*" means all keys |

#### Return Value
- Type: iterator
- Description: Returns iterator of matching key names

#### Usage Example
```python title="Find Matching Keys"
cache = app.getElement("caches.MyRedis")

# Find all user sessions
for key in cache.keys("session:*"):
    print(f"Session key: {key}")

# Find configs with specific prefix
config_keys = list(cache.keys("config:*"))
```

### ping
Test Redis connection status.

#### Usage Example
```python title="Test Connection"
cache = app.getElement("caches.MyRedis")

if cache.ping():
    print("Redis connection normal")
else:
    print("Redis connection abnormal")
```

### disconnect
Disconnect Redis connection.

#### Usage Example
```python title="Disconnect"
cache = app.getElement("caches.MyRedis")
cache.disconnect()
```

## Properties
Redis cache elements mainly provide functionality through methods, with no directly accessible public properties currently.

## Advanced Features
### Connection Pool Management
Redis cache automatically manages connection pools. Instances with the same configuration will reuse connections, improving performance and reducing resource consumption.

```python title="Connection Pool Reuse Example"
# Multiple instances with same configuration will automatically reuse connections
cache1 = app.getElement("caches.Redis1")
cache2 = app.getElement("caches.Redis2")  # If configuration is same, will reuse connection pool
```

### Automatic Key Name Prefix Management
All cache operations automatically add application ID prefix, avoiding key name conflicts between different applications.

```python title="Key Name Prefix Mechanism"
# Actual stored key names automatically add application ID prefix
cache.set("user_data", "value")
# Actually stored as: "myapp:user_data"
```

### Environment Variable Configuration
Configuration files support template strings, allowing dynamic configuration using environment variables.

```json title="Configuration Example Using Environment Variables"
{
  "host": "{{REDIS_HOST}}",
  "port": "{{REDIS_PORT}}",
  "password": "{{REDIS_PASSWORD}}",
  "db": 1
}
```

### Exception Handling
Redis cache provides comprehensive exception handling mechanisms. Connection failures and authentication errors are automatically converted to friendly error messages.

```python title="Exception Handling Example"
try:
    cache = app.getElement("caches.MyRedis")
    cache.set("test_key", "test_value")
except Exception as e:
    # System automatically handles connection exceptions, providing clear error messages
    print(f"Cache operation failed: {e}")
```