---
slug: backend-interceptor
title: "Backend Interceptor Reference"
description: "Backend Interceptor Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Backend Interceptor"
---
# Backend Interceptor
HTTP request processing component based on interceptor pattern, providing the ability to automatically execute business logic before and after request processing, supporting unified management of cross-cutting concerns such as permission verification, parameter validation, log recording, and exception handling.

The hierarchical structure of interceptor elements is Meta (interceptors.Meta) → Type (interceptors.Http) → Instance, supporting only full-code creation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Backend Interceptor Element Directory Structure"
interceptors/
└── MyInterceptor/
    ├── e.json
    ├── __init__.py
    ├── interceptor.py
    └── handler.py (optional)
```

#### e.json File
```json title="Backend Interceptor e.json Example"
{
  "title": "Custom Interceptor",
  "type": "interceptors.Http",
  "backendBundleEntry": ".",
  "icon": "lanjieqi1",
  "sort": 100
}
```

#### Business Logic Code
```python title="interceptor.py Implementation"
from interceptors.Http import RequestInterceptor
from jit.commons.utils.logger import log

class MyInterceptor(RequestInterceptor):
    def before(self):
        """Execute before request processing"""
        log.info(f"Request started: {self.request.path}")

    def after(self, resData=None):
        """Execute after request processing"""
        log.info(f"Request ended: {self.request.path}")

    def onSuccess(self, resData=None):
        """Execute when request processing succeeds"""
        log.info("Request processing successful")

    def onException(self, exc=None):
        """Execute when request processing exception occurs"""
        log.error(f"Request processing exception: {exc}")
        return exc
```

## Methods
### before
Method executed before request processing, used for parameter validation, permission checking, and other preprocessing logic.

### after
Method executed after request processing, executed regardless of success or failure, used for resource cleanup, log recording, and other post-processing logic.

### onSuccess
Method executed when request processing succeeds, only called when there are no exceptions.

### onException
Method executed when request processing exception occurs, used for exception handling and log recording.

## Properties
### request
Current HTTP request object, containing request path, parameters, headers, etc.

### functionDefine
Function definition information corresponding to current request, obtained by parsing request path to get target element's function metadata.

## Advanced Features
### Execution Order
Control interceptor execution order through sort field in e.json.

```json title="Set Execution Order"
{
  "title": "High Priority Interceptor",
  "type": "interceptors.Http",
  "sort": 10
}
```

When multiple interceptors exist:
- When request arrives, execute before in ascending sort order
- When request ends, execute onException, onSuccess in ascending sort order
- When request ends, execute after in descending sort order

### Platform Built-in Interceptors
Login status interceptor (`interceptors.Auths` sort=1): When loginRequired=false is configured for a function in e.json's functionList, login status verification for that function will be ignored.

API request log recording (`interceptors.Logger` sort=9980)

User role permission verification (`interceptors.Permission` sort=999)

Request signature verification (`interceptors.Sign` sort=100): When ignoreSign=true is configured for a function in e.json's functionList, signature verification for that function will be ignored.

XML request body to Dict conversion (`interceptors.XmlParse` sort=999)