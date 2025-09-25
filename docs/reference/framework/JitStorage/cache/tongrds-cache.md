---
slug: tongrds-cache
---
# TongRDS Cache
TongRDS cache is a high-performance data caching service based on Redis protocol implementation for Oriental Tong database, specifically designed for enterprise applications with domestic database requirements. It adopts the same client interface as Redis, supports distributed deployment and enterprise-level connection management, and ensures stable performance in high-concurrency environments through connection pool mechanisms.

The hierarchical structure of TongRDS cache elements is Meta (caches.Meta) → Type (caches.TongRDSType) → Instance. Developers can quickly create TongRDS cache instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `caches.TongRDSType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
caches/
└── TongRdsCache/                    # Instance element directory (customizable)
    ├── e.json                       # Element definition file
    └── TongRdsCache.json           # Connection configuration file
```

#### e.json File
```json title="e.json"
{
  "backendBundleEntry": ".",
  "title": "TongRDS Cache Instance",
  "type": "caches.TongRDSType"
}
```

## Method Interfaces {#methods}

### Standard Cache Operations
Provides standard cache read/write and management methods.

#### Business Configuration File
```json title="TongRdsCache.json"
{
  "host": "192.168.1.100",
  "port": 6379
}
```

#### Usage Example
```python title="Using TongRDS Cache"
# Get cache instance
cache = app.getElement("caches.TongRdsCache")

# Basic string operations
cache.set("user_name", "张三", 3600)  # Set value with expiration time
value = cache.get("user_name")       # Get value

# Numeric operations
cache.setNumeric("counter", 100, 7200)  # Set numeric value
count = cache.getNumeric("counter")      # Get numeric value
cache.incr("counter", 5)                 # Increment by 5

# Key management
exists = cache.exists("user_name")       # Check if key exists
cache.expire("user_name", 1800)         # Update expiration time
cache.delete("user_name")               # Delete key

# Connection management
is_connected = cache.ping()              # Test connection
cache.disconnect()                       # Disconnect
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| title | Stext | str | Yes | Cache instance display name |
| type | Stext | str | Yes | Fixed as "caches.TongRDSType" |
| backendBundleEntry | Stext | str | Yes | Backend entry path, fixed as "." |

### Business Configuration File
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| host | Stext | str | Yes | TongRDS server address |
| port | Numeric | int | Yes | TongRDS service port number |
| password | Stext | str | No | Authentication password, can be omitted if no password |
| db | Numeric | int | No | Database number, defaults to 1 |
| charset | Stext | str | No | Character encoding, defaults to "utf-8" |
| decode_responses | Checkbox | bool | No | Whether to decode responses, defaults to true |
| socket_timeout | Numeric | float | No | Socket timeout (seconds), default 0.5 |
| socket_connect_timeout | Numeric | float | No | Connection timeout (seconds), default 0.5 |

## Methods
### get
Get string value from cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
str: String value in cache, returns None if key doesn't exist

#### Usage Example
```python title="Get Cache Value"
cache = app.getElement("caches.TongRdsCache")

# Get string value
user_info = cache.get("user_info")
if user_info:
    print(f"User info: {user_info}")
else:
    print("User info doesn't exist")
```

### set
Write string value to cache.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| string | Stext | str | Yes | String value to store |
| ts | Numeric | int | No | Expiration time (seconds), no expiration if not set |

#### Return Value
bool: Returns True on success, False on failure

#### Usage Example
```python title="Set Cache Value"
cache = app.getElement("caches.TongRdsCache")

# Set permanently valid value
success = cache.set("app_config", '{"theme": "dark", "lang": "zh"}')

# Set value with expiration time (expires in 1 hour)
cache.set("session_token", "abc123", 3600)

# Set user session (expires in 30 minutes)
cache.set("user_session", "user_data", 1800)
```

### getNumeric
Get numeric type cache value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |

#### Return Value
int: Numeric value in cache, returns 0 if key doesn't exist

#### Usage Example
```python title="Get Numeric Value"
cache = app.getElement("caches.TongRdsCache")

# Get counter value
count = cache.getNumeric("page_views")
print(f"Page views: {count}")

# Get stock quantity
stock = cache.getNumeric("product_stock")
if stock > 0:
    print(f"Sufficient stock: {stock} items")
```

### setNumeric
Set numeric type cache value.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| n | Numeric | int | No | Numeric value to set, defaults to 0 |
| ts | Numeric | int | No | Expiration time (seconds), no expiration if not set |

#### Return Value
bool: Returns True on success, False on failure

#### Usage Example
```python title="Set Numeric Value"
cache = app.getElement("caches.TongRdsCache")

# Initialize counter
cache.setNumeric("daily_visits", 0)

# Set rate limiting counter with expiration time (expires in 5 minutes)
cache.setNumeric("api_rate_limit", 100, 300)

# Set product stock
cache.setNumeric("product_123_stock", 50)
```

### incr
Increment specified key's numeric value by specified amount.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| amount | Numeric | int | No | Increment amount, defaults to 1 |

#### Return Value
int: Numeric value after increment

#### Usage Example
```python title="Numeric Increment"
cache = app.getElement("caches.TongRdsCache")

# Simple counter increment
new_count = cache.incr("page_views")
print(f"New visit count: {new_count}")

# Batch increment
batch_count = cache.incr("batch_counter", 10)

# Implement rate limiting counter
current_requests = cache.incr("api_requests_per_minute")
if current_requests > 100:
    print("Request rate exceeded")
```

### delete
Delete specified cache key.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to delete |

#### Return Value
bool: Returns True on successful deletion, False if key doesn't exist

#### Usage Example
```python title="Delete Cache"
cache = app.getElement("caches.TongRdsCache")

# Delete user session
if cache.delete("user_session_123"):
    print("Session deleted successfully")

# Clean up expired temporary data
cache.delete("temp_data")
cache.delete("cache_lock")
```

### exists
Check if specified key exists.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name to check |

#### Return Value
bool: Returns True if key exists, False if not

#### Usage Example
```python title="Check Key Existence"
cache = app.getElement("caches.TongRdsCache")

# Check if cache exists
if cache.exists("user_preferences"):
    preferences = cache.get("user_preferences")
else:
    # Load from database and cache
    preferences = load_from_database()
    cache.set("user_preferences", preferences, 1800)
```

### expire
Update specified key's expiration time.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Cache key name |
| ts | Numeric | int | Yes | New expiration time (seconds) |

#### Return Value
bool: Returns True on success, False if key doesn't exist

#### Usage Example
```python title="Update Expiration Time"
cache = app.getElement("caches.TongRdsCache")

# Extend session validity (extend by another 30 minutes)
if cache.expire("user_session", 1800):
    print("Session time extended successfully")

# Set expiration time for temporary data
cache.expire("temp_result", 600)  # Expires in 10 minutes
```

### keys
Return list of keys matching specified pattern.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| pattern | Stext | str | No | Match pattern, defaults to "*" (all keys) |

#### Return Value
iterator: Iterator of matching key names

#### Usage Example
```python title="Find Matching Keys"
cache = app.getElement("caches.TongRdsCache")

# Get all user session keys
session_keys = list(cache.keys("user_session_*"))
print(f"Current active sessions: {len(session_keys)}")

# Find caches with specific prefix
cache_keys = list(cache.keys("cache_*"))
for key in cache_keys:
    print(f"Cache key: {key}")
```

### ping
Test connection status with TongRDS service.

#### Return Value
bool: Returns True if connection is normal, False if connection fails

#### Usage Example
```python title="Test Connection"
cache = app.getElement("caches.TongRdsCache")

# Check connection status
if cache.ping():
    print("TongRDS connection normal")
else:
    print("TongRDS connection failed, please check network and configuration")
```

### disconnect
Disconnect from TongRDS service.

#### Usage Example
```python title="Disconnect"
cache = app.getElement("caches.TongRdsCache")

# Perform cleanup operations then disconnect
cache.delete("temp_lock")
cache.disconnect()
print("TongRDS connection disconnected")
```

## Properties
### client
TongRDS client connection object, implemented based on Redis client. Manages connections through connection pool mechanism, ensuring stability in high-concurrency environments. Developers usually don't need to access this property directly, it's recommended to use the encapsulated methods for operations.

## Advanced Features
### Connection Pool Management
TongRDS cache uses internal connection pool mechanism, using MD5 value of configuration parameters as cache key. Instances with the same configuration share connections, avoiding duplicate connection object creation.

```python title="Connection Pool Configuration Optimization"
cache = app.getElement("caches.TongRdsCache")

# Connection pool automatically manages connections
# Multiple instances with same configuration will share connections
for i in range(100):
    result = cache.get(f"data_{i}")
    # Connections will be reused, no need to worry about too many connections

# Manually disconnect (release connections in connection pool)
cache.disconnect()
```

### Error Handling Mechanism
TongRDS cache has built-in error handling, automatically capturing connection errors and authentication errors, returning corresponding error codes.

```python title="Error Handling Example"
try:
    cache = app.getElement("caches.TongRdsCache")
    cache.set("test_key", "test_value")
except Exception as e:
    # Connection error: IP address or port number error  
    # Authentication error: username or password error
    print(f"Cache operation failed: {e}")
```

### Key Name Prefix Management
TongRDS cache automatically adds application ID prefix to all key names, avoiding key name conflicts between different applications. Actual stored key name format: `{appId}:{name}`.

```python title="Key Name Prefix Handling"
cache = app.getElement("caches.TongRdsCache")

# Set key "user_123"
cache.set("user_123", "User data")

# Actually stored key name: "myapp:user_123"
# No need to worry about prefix when getting, use original key name directly
user_data = cache.get("user_123")
```