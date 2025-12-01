---
slug: built-in-cache
title: "Built-in Cache Reference"
description: "Built-in Cache Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Built-in Cache"
---
# Built-in Cache
Built-in cache is an intelligent caching solution provided by the platform, implementing out-of-the-box caching capabilities based on environment adaptive mechanisms. It automatically uses SQLite cache in desktop environments and container-built-in Redis in server environments. Built-in cache is mainly used in development and testing phases, providing developers with configuration-free caching services.

The hierarchical structure of built-in cache elements is Meta (caches.Meta) → Type (caches.BuiltinsType) → Instance. Developers can quickly create built-in cache instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `caches.BuiltinsType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
caches/
└── Default/
    ├── e.json
    └── __init__.py
```

#### e.json File
```json title="e.json Configuration Example"
{
  "title": "Default Cache",
  "type": "caches.BuiltinsType"
}
```

#### Usage Example
```python title="Basic Cache Operations"
# Get cache instance
cache = app.getElement("caches.Default")

# Basic string operations
cache.set("user_token", "abc123", 3600)  # Set with expiration time
value = cache.get("user_token")           # Get value
cache.delete("user_token")                # Delete key

# Numeric operations
cache.setNumeric("view_count", 100)       # Set numeric value
count = cache.getNumeric("view_count")    # Get numeric value
new_count = cache.incr("view_count", 5)   # Increment operation

# Key management
exists = cache.exists("user_token")       # Check if key exists
cache.expire("user_token", 1800)         # Set expiration time
keys = cache.keys("user_*")               # Get matching key list
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Cache instance display name |
| type | string | Yes | Fixed value "caches.BuiltinsType" |

## Methods
### get
Get string value from cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
str - Cached string value, returns None when key doesn't exist

#### Usage Example
```python title="Get Cache Value"
cache = app.getElement("caches.Default")
token = cache.get("user_session_token")
if token:
    print(f"User token: {token}")
else:
    print("Token doesn't exist or has expired")
```

### set
Write string data to cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| string | Stext | str | Yes | String value to cache |
| ts | Numeric | int | No | Expiration time (seconds), no expiration if not set |

#### Return Value
bool - Returns True on success, False on failure

#### Usage Example
```python title="Set Cache Value"
cache = app.getElement("caches.Default")

# Permanent cache
cache.set("app_config", '{"theme": "dark", "lang": "zh-CN"}')

# Cache with expiration time
cache.set("verification_code", "123456", 300)  # Expires in 5 minutes
```

### getNumeric
Get numeric type cache data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
int - Cached numeric value, returns 0 when key doesn't exist

#### Usage Example
```python title="Get Numeric Value"
cache = app.getElement("caches.Default")
current_count = cache.getNumeric("daily_visits")
print(f"Today's visits: {current_count}")
```

### setNumeric
Set numeric type cache data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| n | Numeric | int | Yes | Numeric value to cache |
| ts | Numeric | int | No | Expiration time (seconds) |

#### Return Value
bool - Returns True on success, False on failure

#### Usage Example
```python title="Set Numeric Value"
cache = app.getElement("caches.Default")

# Set initial visit count
cache.setNumeric("page_views", 0)

# Set counter with expiration time
cache.setNumeric("login_attempts", 0, 3600)  # Reset after 1 hour
```

### incr
Increment numeric cache data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| amount | Numeric | int | No | Increment amount, defaults to 1 |

#### Return Value
int - New value after increment

#### Usage Example
```python title="Increment Operation"
cache = app.getElement("caches.Default")

# Increment by 1
new_views = cache.incr("page_views")

# Increment by specified amount
bulk_views = cache.incr("page_views", 10)

print(f"Current page views: {new_views}")
```

### delete
Delete specified cache key.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to delete |

#### Return Value
bool - Returns True on successful deletion, False if key doesn't exist or deletion fails

#### Usage Example
```python title="Delete Cache"
cache = app.getElement("caches.Default")

# Delete user session
success = cache.delete("user_session_123")
if success:
    print("Session cleared")
else:
    print("Session doesn't exist or clearing failed")
```

### expire
Set expiration time for specified key.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| ts | Numeric | int | Yes | Expiration time (seconds) |

#### Return Value
bool - Returns True on success, False if key doesn't exist or setting fails

#### Usage Example
```python title="Set Expiration Time"
cache = app.getElement("caches.Default")

# Set expiration time for existing key
cache.set("temp_data", "some_value")
cache.expire("temp_data", 1800)  # Expires in 30 minutes
```

### exists
Check if specified key exists.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to check |

#### Return Value
bool - Returns True if key exists, False if not

#### Usage Example
```python title="Check Key Existence"
cache = app.getElement("caches.Default")

if cache.exists("user_preferences"):
    preferences = cache.get("user_preferences")
    print("Found user preference settings")
else:
    print("User preference settings don't exist, using defaults")
```

### keys
Get all keys matching specified pattern.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| pattern | Stext | str | No | Match pattern, defaults to "*" (all keys) |

#### Return Value
iterator - Iterator of matching key names

#### Usage Example
```python title="Get Matching Keys"
cache = app.getElement("caches.Default")

# Get all user session keys
session_keys = list(cache.keys("session_*"))
print(f"Current active sessions: {len(session_keys)}")

# Get all cache keys
all_keys = list(cache.keys())
print(f"Total keys in cache: {len(all_keys)}")
```

### ping
Check cache service connection status.

#### Return Value
bool - Returns True if connection is normal, False if abnormal

#### Usage Example
```python title="Check Connection Status"
cache = app.getElement("caches.Default")

if cache.ping():
    print("Cache service connection normal")
    # Execute cache operations
    cache.set("health_check", "ok")
else:
    print("Cache service connection abnormal, using fallback")
```

## Properties
None currently.

## Advanced Features
### Intelligent Environment Adaptation
Built-in cache automatically selects the most suitable underlying technology implementation based on deployment environment, requiring no manual configuration.

#### Configuration Example and Usage Example
```python title="Environment Adaptive Cache"
# Same code uses different caching technologies in different environments
cache = app.getElement("caches.Default")

# Server environment: automatically uses Redis cache (high performance, distributed support)
# Desktop environment: automatically uses SQLite cache (zero configuration, file storage)
# Developers don't need to worry about underlying implementation differences
cache.set("business_data", json.dumps(data))
cached_data = cache.get("business_data")
```

### Application-level Key Prefix Management
Built-in cache automatically adds application identifier prefix to all keys, avoiding key conflicts between different applications.

#### Configuration Example and Usage Example
```python title="Automatic Key Prefix"
# Key management when application ID is "MyApp"
cache = app.getElement("caches.Default")

# Actual stored key names automatically add application prefix
cache.set("user_config", "config_data")
# Actual key name: "MyApp:user_config"
# No need to specify prefix when getting, automatically handled
config = cache.get("user_config")

# Key matching also automatically handles prefix
user_keys = cache.keys("user_*")
# Actual matching: "MyApp:user_*"
```

### Performance Optimization and Fault Tolerance
Built-in cache is performance optimized for different environments and provides comprehensive fault tolerance mechanisms.

#### Configuration Example and Usage Example
```python title="Performance Optimization Usage"
cache = app.getElement("caches.Default")

# Performance optimization during batch operations
user_data = {
    "profile": json.dumps(user_profile),
    "preferences": json.dumps(user_prefs),
    "permissions": json.dumps(user_perms)
}

# Efficient batch writing
for key, value in user_data.items():
    cache.set(f"user_{user_id}_{key}", value, 7200)

# Fault tolerance example
try:
    result = cache.get("critical_data")
    if result is None:
        # Cache miss, fetch from database
        result = fetch_from_database()
        cache.set("critical_data", result, 3600)
except Exception as e:
    # Cache service exception, use database directly
    result = fetch_from_database()
```