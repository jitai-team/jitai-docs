---
slug: frontend-interceptor
---
# Frontend Interceptor
Based on frontend network request interception mechanisms (such as Axios interceptors), uniformly handle client-side logic before requests are sent and after responses are returned, such as adding request headers, parameter signing, response unpacking, error handling, and token refresh.

The hierarchical structure of interceptor elements is Meta (interceptors.Meta) → Type (interceptors.Http) → Instance, supporting only full-code creation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Frontend Interceptor Element Directory Structure"
interceptors/
└── MyInterceptor/
    ├── index.ts
    ├── e.json
```

#### e.json File
```json title="Frontend Interceptor e.json Example"
{
  "title": "Custom Interceptor",
  "type": "interceptors.Http",
  "frontBundleEntry": "./index.ts",
  "icon": "lanjieqi1",
  "sort": 100
}
```

#### Writing Code
Need to export two methods: reqInterceptor and respInterceptor.

```typescript title="index.ts (Template)"
import type { InternalAxiosRequestConfig } from 'axios';
import type { HttpResponse } from 'jit';

// Request interceptor: read/set request headers, parameters, etc. here; finally return request
export const reqInterceptor = (request: InternalAxiosRequestConfig) => {
  // Customizable: read existing headers
  // const auth = request.headers['Authorization'];

  // Customizable: set custom headers or modify request
  // request.headers['X-Custom-Header'] = 'value';
  // request.params = { ...(request.params || {}), traceId: '...' };
  // request.data = request.data; // Can also serialize/transform here

  return request;
};

// Response interceptor: uniformly handle response data, error codes, token refresh, etc. here; finally return response
export const respInterceptor = (response: HttpResponse & Record<string, any>) => {
  // Customizable: uniform unpacking or data transformation
  // const { data } = response;
  // if (data && data.payload) {
  //   response.data = data.payload;
  // }

  // Customizable: common status handling/error throwing
  // if (data && data.code !== 0) {
  //   // throw or standardize error
  // }

  return response;
};
```

## Methods
### reqInterceptor
Triggered before request is sent. Can read and set request headers, query parameters, and request body here, perform serialization, tracking, signing, etc. Function must return the modified `request` object.

### respInterceptor
Triggered after response is returned. Can uniformly unpack, transform data, handle error codes, refresh tokens, etc. here. Function must return (or throw) the processed `response` object.

## Advanced Features
### Execution Order
Control interceptor execution order through `sort` field in `e.json`.

```json title="Set Execution Order"
{
  "title": "High Priority Interceptor",
  "type": "interceptors.Http",
  "sort": 10
}
```

When multiple interceptors exist:
- Before request is sent, execute `reqInterceptor` in ascending `sort` order
- After response is returned, execute `respInterceptor` in descending `sort` order

### Platform Built-in Interceptors
Request signing `interceptors.encryptor`

JitNode validation information retrieval `interceptors.JitNodeValid`

Interface exception information retrieval `interceptors.exception`