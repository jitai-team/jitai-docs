---
slug: external-api-integration
title: "External API Integration Reference"
description: "External API Integration Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "External API Integration"
---
# External API Integration
External API integration is an element used to call third-party HTTP interfaces, implementing unified call management for RESTful APIs based on the requests library. It handles HTTP request encapsulation, parameter processing, and response parsing, supporting standard HTTP methods like GET, POST, PUT, DELETE, and provides pre/post request processing and callback mechanisms.

The hierarchical structure of external API integration elements is Meta (externalAPIs.Meta) → Type (externalAPIs.NormalType) → Instance. Developers can quickly create external API integration instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `externalAPIs.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```
testExternal/                    # Instance element directory
├── e.json                      # Element definition file
└── apiConfig.json              # API configuration file
```

#### e.json File
```json title="e.json"
{
  "title": "Test External API",
  "backendBundleEntry": ".",
  "type": "externalAPIs.NormalType",
  "functionList": [
    {
      "name": "getUserInfo",
      "title": "Get User Information",
      "description": "Get detailed user information by user ID",
      "args": [],
      "resultConfig": {}
    }
  ]
}
```

#### API Configuration File
```json title="apiConfig.json"
{
  "url": "https://api.example.com",
  "headers": [
    {
      "name": "Authorization",
      "title": "Authentication Token",
      "datatype": "Stext",
      "value": "Bearer your-token"
    }
  ],
  "beforeRequest": "services.ApiHelper.beforeApiCall",
  "afterRequest": "services.ApiHelper.afterApiCall", 
  "apis": [
    {
      "name": "getUserInfo",
      "title": "Get User Information",
      "method": "GET",
      "path": "/user/{id}",
      "params": [
        {
          "name": "id",
          "title": "User ID",
          "datatype": "Numeric",
          "value": null
        }
      ],
      "body": [],
      "headers": [],
      "resultConfig": {},
      "callback": "",
      "itemType": "api"
    }
  ]
}
```

#### Usage Example
```python title="Usage Example"
# Get external API instance
api = app.getElement("externalAPIs.testExternal")

# Call specific API
result = api.getUserInfo(id=123)

# Call with parameter dictionary
result = api.getUserInfo(params={"id": 123})

# Call with custom headers
result = api.getUserInfo(
    params={"id": 123},
    headers={"X-Custom": "value"}
)
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Description |
|------|------|------|------|
| title | String | Yes | Element title |
| type | String | Yes | Fixed value "externalAPIs.NormalType" |
| backendBundleEntry | String | Yes | Fixed value "." |
| functionList | Array | No | Function list, defines callable API methods |

functionList item configuration:

| Parameter | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | API method name, corresponds to API name in apiConfig.json |
| title | String | Yes | API display name |
| description | String | No | API description information |
| args | Array | No | Parameter list |
| resultConfig | Object | No | Return value configuration |

### API Configuration File
External API integration supports pre-processing and post-processing of requests through service functions. Service function configuration format is "service element fullName.function name", for example "services.ApiHelper.beforeApiCall" means calling the beforeApiCall function of the services.ApiHelper service element.

#### Global Configuration
| Parameter | Type | Required | Description |
|------|------|------|------|
| url | String | Yes | API base URL |
| headers | Array | No | Common request header configuration |
| beforeRequest | String | No | Pre-request processing service function, format: "service element fullName.function name" |
| afterRequest | String | No | Post-request processing service function, format: "service element fullName.function name" |
| apis | Array | Yes | API interface definition list |

#### API Interface Configuration
| Parameter | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | API name, used as method name |
| title | String | Yes | API display title |
| method | String | Yes | HTTP method: GET, POST, PUT, DELETE |
| path | String | Yes | API path, supports path parameters |
| params | Array | No | Query parameter configuration |
| body | Array | No | Request body parameter configuration (ignored for GET requests) |
| headers | Array | No | Dedicated request header configuration |
| callback | String | No | Callback service function, format: "service element fullName.function name" |
| itemType | String | Yes | Fixed value "api" |

#### Parameter Configuration Format
```json title="Parameter Configuration Example"
{
  "name": "userId",
  "title": "User ID",
  "datatype": "Numeric",
  "value": null
}
```

## Methods
External API integration instances provide dynamic method calls, automatically generating corresponding methods based on APIs configured in apiConfig.json.

### Dynamic API Methods
Each API configured in apiConfig.json becomes a method of the instance, with the method name corresponding to the API's name field.

#### Parameter Details
| Parameter | Type | Required | Description |
|------|------|------|------|
| params | Dict | No | Query parameter dictionary |
| headers | Dict | No | Request header dictionary |
| body | Dict | No | Request body dictionary (invalid for GET requests) |
| **kwargs | Any | No | Named parameters, automatically mapped to params, body, or headers |

#### Return Value
Returns JSON data from API response, processed through afterRequest and callback.

#### Usage Example
```python title="Multiple Calling Methods"
api = app.getElement("externalAPIs.testExternal")

# Method 1: Use named parameters
result = api.getUserInfo(id=123, type="detail")

# Method 2: Use parameter dictionary
result = api.getUserInfo(
    params={"id": 123, "type": "detail"},
    headers={"Accept": "application/json"}
)

# Method 3: POST request with request body
result = api.createUser(
    body={"name": "张三", "email": "zhangsan@example.com"},
    headers={"Content-Type": "application/json"}
)

# Method 4: Mixed usage
result = api.updateUser(
    id=123,  # Automatically mapped to params
    body={"name": "李四"},
    headers={"Authorization": "Bearer new-token"}
)
```

## Properties
External API integration instances have the following properties:

### domain
API base domain, from url configuration in apiConfig.json.

### beforeRequestFunc
Pre-request processing service function call path, format "service element fullName.function name", from beforeRequest configuration in apiConfig.json.

### afterRequestFunc
Post-request processing service function call path, format "service element fullName.function name", from afterRequest configuration in apiConfig.json.

### commonHeaders
Common request header dictionary, from headers configuration in apiConfig.json.

### apiMap
API configuration mapping dictionary, containing complete configuration information for all APIs.

## Advanced Features
### Request Processing Pipeline
#### Pre-request Processing
Through beforeRequest configuration, process API configuration before sending requests using functions in service elements. Configuration format "services.ApiHelper.beforeApiCall" means calling the beforeApiCall function of the services.ApiHelper service element:

```python title="Pre-request Processing Example"
# services/ApiHelper/service.py
def beforeApiCall(self, apiInfo):
    """Pre-request processing, can modify request parameters"""
    # Add dynamic authentication header
    apiInfo["headers"]["Authorization"] = f"Bearer {get_current_token()}"
    # Add timestamp
    apiInfo["params"]["timestamp"] = int(time.time())
    return apiInfo
```

#### Post-request Processing
Through afterRequest configuration, process response results using functions in service elements. Configuration format "services.ApiHelper.afterApiCall":

```python title="Post-request Processing Example"
# services/ApiHelper/service.py
def afterApiCall(self, response):
    """Post-request processing, can transform response format"""
    data = response.json()
    if data.get("code") != 200:
        raise Exception(f"API call failed: {data.get('message')}")
    return data.get("data")
```

#### Callback Processing
Through callback configuration, perform business processing on final results using functions in service elements. Configuration format "services.ApiHelper.handleApiResult":

```python title="Callback Processing Example"
# services/ApiHelper/service.py
def handleApiResult(self, data):
    """Callback processing, execute business logic"""
    # Log record
    log.info(f"API call successful, returned data: {data}")
    # Data transformation
    return transform_data(data)
```

### API Group Management
Support grouping APIs by functionality for managing large numbers of interfaces:

```json title="API Group Configuration"
{
  "apis": [
    {
      "itemType": "group",
      "name": "userGroup",
      "title": "User Management",
      "childrens": [
        {
          "name": "getUser",
          "title": "Get User",
          "method": "GET",
          "path": "/users/{id}",
          "itemType": "api"
        },
        {
          "name": "createUser", 
          "title": "Create User",
          "method": "POST",
          "path": "/users",
          "itemType": "api"
        }
      ]
    }
  ]
}
```

### Error Handling Mechanism
External API integration provides comprehensive error handling:

```python title="Error Handling Example"
try:
    api = app.getElement("externalAPIs.testExternal")
    result = api.getUserInfo(id=123)
except ExternalAPIErrorCode.NO_SUPPORTED_API_ERROR as e:
    # API does not exist
    log.error(f"API does not exist: {e}")
except ExternalAPIErrorCode.API_CALL_ERROR as e:
    # API call failed
    log.error(f"API call failed: {e}")
except ExternalAPIErrorCode.NO_SUPPORTED_METHOD_ERROR as e:
    # HTTP method not supported
    log.error(f"HTTP method not supported: {e}")
```