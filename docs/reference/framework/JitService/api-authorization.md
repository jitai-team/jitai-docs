---
slug: api-authorization
title: "API Authorization Reference"
description: "API Authorization Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "API Authorization"
---
# API Authorization
API authorization is used to manage third-party applications' access permissions to this application's API interfaces, controlling which external applications can call which APIs through accessKey/accessSecret key pairs. It ensures call security through signature verification mechanisms, automatically records all API access logs, and provides standardized API open capabilities for applications.

The hierarchical structure of API authorization elements is Meta (apiAuths.Meta) → Type (apiAuths.NormalType) → Instance. Developers can quickly create API authorization instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `apiAuths.NormalType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
apiAuths/
└── myApiAuth/
    ├── e.json
    └── myApiAuth.json
```

The path can be customized, the example is just a recommended practice.

#### e.json File
```json title="Element Declaration File"
{
  "title": "My API Authorization",
  "type": "apiAuths.NormalType",
  "accessKey": "your_access_key",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="Business Configuration File (myApiAuth.json)"
{
  "accessKey": "your_access_key",
  "accessSecret": "generated_secret",
  "remark": "API authorization description",
  "apis": [
    "services.UserSvc.getUserInfo",
    "services.OrderSvc.getOrderList"
  ]
}
```

#### Usage Example
```python title="Get API Authorization Element"
# Get API authorization instance
apiAuth = app.getElement("apiAuths.myApiAuth")

# Get authorization details
details = apiAuth.getDetails()
print(f"Authorized API list: {details}")

# Get authorization information through service
authSvc = app.getElement("apiAuths.services.ApiAuthSvc")
authDetails = authSvc.getDetails("your_access_key")
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Authorization name |
| type | string | Yes | Fixed value: apiAuths.NormalType |
| accessKey | string | Yes | Access key identifier |
| backendBundleEntry | string | Yes | Backend entry, usually "." |

### Business Configuration File
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| accessKey | string | Yes | Access key for identity identification |
| accessSecret | string | Yes | Access secret for signature verification |
| remark | string | No | Authorization remark description |
| apis | array | Yes | List of allowed APIs, format: service full name.method name |

## Methods
### getDetails
Get detailed information of API authorization, containing all authorized service and method lists.

#### Return Value
Returns list containing authorization details, each service contains title, fullName and functionList information.

#### Usage Example
```python title="Get Authorization Details"
apiAuth = app.getElement("apiAuths.myApiAuth")
details = apiAuth.getDetails()

# Output example
for service in details:
    print(f"Service: {service['title']} ({service['fullName']})")
    for func in service['functionList']:
        print(f"  - {func['title']}: {func['name']}")
```

### before
Request pre-processing interceptor, executes permission verification and signature validation.

#### Usage Example
```python title="Interceptor Usage"
# Automatically called before API request processing
# 1. Check if API is in authorization list
# 2. Verify timestamp and accessSign in request headers
# 3. Perform signature verification
```

### after
Request post-processing, signs response data and records call logs.

#### Usage Example
```python title="Response Processing"
# Automatically called after API request processing
# 1. Sign response data
# 2. Add timestamp and accessSign to response
# 3. Save call record to database
```

### saveLog
Save API call record to database, recording request details, duration, error information, etc.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| respData | JitDict | dict | Yes | Response data |

#### Usage Example
```python title="Manually Save Log"
apiAuth = app.getElement("apiAuths.myApiAuth")
respData = {"status": "success", "data": "result"}
apiAuth.saveLog(respData)
```

## Properties
### accessKey
Access key identifier, used for identity identification and permission lookup.

### accessSecret
Access secret, used for generating and verifying request signatures.

### apis
List of authorized APIs, containing full names of allowed service methods.

### currApi
Current request API path, parsed from request URL.

### request
Current HTTP request object, containing all request information.

## Advanced Features
### Signature Verification Mechanism
API authorization uses dual verification mechanism of timestamp + data signature:

```python title="Signature Verification Process"
# Client generates signature
timestamp = int(time.time() * 1000)
data = {"param1": "value1", "param2": "value2"}
sign_data = {"timestamp": timestamp, "accessSign": generated_sign, **data}

# Server verifies signature
# 1. Check if timestamp is expired
# 2. Recalculate signature using same algorithm
# 3. Compare if signatures match
```

### Call Record Tracking
System automatically records detailed information of all API calls:

```python title="Call Record Fields"
{
    "accessKey": "Access key",
    "requestId": "Request ID", 
    "timestamp": "Request timestamp",
    "ip": "Client IP",
    "domain": "Request domain",
    "path": "Request path",
    "element": "Service element name",
    "funcName": "Method name",
    "duration": "Duration (milliseconds)",
    "errcode": "Error code",
    "errmsg": "Error message"
}
```

### Dynamic Permission Management
Supports runtime dynamic update of authorization configuration:

```python title="Dynamic Permission Management"
# Manage permissions through ApiAuthSvc service
authSvc = app.getElement("apiAuths.services.ApiAuthSvc")

# Generate new access secret
result = authSvc.genAccessSecret("new_access_key")
new_secret = result["accessSecret"]

# Verify access secret
authSvc.checkAccessSecret("access_key", "access_secret")

# Get remote authorization details
remote_details = authSvc.getAuthDetails(
    "https://domain.com/org/app", 
    "access_key", 
    "access_secret"
)
```