# 外部API集成

外部API集成是用于调用第三方HTTP接口的元素，基于requests库实现RESTful API的统一调用管理。它负责HTTP请求封装、参数处理和响应解析，支持GET、POST、PUT、DELETE等标准HTTP方法，提供请求前后处理和回调机制。

外部API集成元素分层结构为Meta（externalAPIs.Meta） → Type（externalAPIs.NormalType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建外部API集成实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的externalAPIs.NormalType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构
```
testExternal/                    # 实例元素目录
├── e.json                      # 元素定义文件
└── apiConfig.json              # API配置文件
```

#### e.json文件
```json title="e.json"
{
  "title": "测试外部API",
  "backendBundleEntry": ".",
  "type": "externalAPIs.NormalType",
  "functionList": [
    {
      "name": "getUserInfo",
      "title": "获取用户信息",
      "description": "通过用户ID获取用户详细信息",
      "args": [],
      "resultConfig": {}
    }
  ]
}
```

#### API配置文件
```json title="apiConfig.json"
{
  "url": "https://api.example.com",
  "headers": [
    {
      "name": "Authorization",
      "title": "认证令牌",
      "datatype": "Stext",
      "value": "Bearer your-token"
    }
  ],
  "beforeRequest": "services.ApiHelper.beforeApiCall",
  "afterRequest": "services.ApiHelper.afterApiCall", 
  "apis": [
    {
      "name": "getUserInfo",
      "title": "获取用户信息",
      "method": "GET",
      "path": "/user/{id}",
      "params": [
        {
          "name": "id",
          "title": "用户ID",
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

#### 调用示例
```python title="调用示例"
# 获取外部API实例
api = app.getElement("externalAPIs.testExternal")

# 调用具体API
result = api.getUserInfo(id=123)

# 使用参数字典调用
result = api.getUserInfo(params={"id": 123})

# 自定义headers调用  
result = api.getUserInfo(
    params={"id": 123},
    headers={"X-Custom": "value"}
)
```

## 元素配置

### e.json配置

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 是 | 元素标题 |
| type | String | 是 | 固定值"externalAPIs.NormalType" |
| backendBundleEntry | String | 是 | 固定值"." |
| functionList | Array | 否 | 功能函数列表，定义可调用的API方法 |

functionList项配置：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | API方法名，对应apiConfig.json中的API名称 |
| title | String | 是 | API显示名称 |
| description | String | 否 | API描述信息 |
| args | Array | 否 | 参数列表 |
| resultConfig | Object | 否 | 返回值配置 |

### API配置文件配置

外部API集成支持通过服务函数对请求进行预处理和后处理。服务函数的配置格式为"服务元素fullName.函数名"，例如"services.ApiHelper.beforeApiCall"表示调用services.ApiHelper服务元素的beforeApiCall函数。

#### 全局配置

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | String | 是 | API基础URL |
| headers | Array | 否 | 公共请求头配置 |
| beforeRequest | String | 否 | 请求前处理服务函数，格式："服务元素fullName.函数名" |
| afterRequest | String | 否 | 请求后处理服务函数，格式："服务元素fullName.函数名" |
| apis | Array | 是 | API接口定义列表 |

#### API接口配置

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | API名称，用作方法名 |
| title | String | 是 | API显示标题 |
| method | String | 是 | HTTP方法：GET、POST、PUT、DELETE |
| path | String | 是 | API路径，支持路径参数 |
| params | Array | 否 | 查询参数配置 |
| body | Array | 否 | 请求体参数配置（GET请求忽略） |
| headers | Array | 否 | 专用请求头配置 |
| callback | String | 否 | 回调服务函数，格式："服务元素fullName.函数名" |
| itemType | String | 是 | 固定值"api" |

#### 参数配置格式

```json title="参数配置示例"
{
  "name": "userId",
  "title": "用户ID",
  "datatype": "Numeric",
  "value": null
}
```

## 方法

外部API集成实例提供动态方法调用，根据apiConfig.json中配置的API自动生成对应方法。

### 动态API方法

每个在apiConfig.json中配置的API都会成为实例的一个方法，方法名对应API的name字段。

#### 参数详解

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| params | Dict | 否 | 查询参数字典 |
| headers | Dict | 否 | 请求头字典 |
| body | Dict | 否 | 请求体字典（GET请求无效） |
| **kwargs | Any | 否 | 具名参数，自动映射到params、body或headers |

#### 返回值

返回API响应的JSON数据，经过afterRequest和callback处理后的结果。

#### 使用示例

```python title="多种调用方式"
api = app.getElement("externalAPIs.testExternal")

# 方式1：使用具名参数
result = api.getUserInfo(id=123, type="detail")

# 方式2：使用参数字典
result = api.getUserInfo(
    params={"id": 123, "type": "detail"},
    headers={"Accept": "application/json"}
)

# 方式3：POST请求带请求体
result = api.createUser(
    body={"name": "张三", "email": "zhangsan@example.com"},
    headers={"Content-Type": "application/json"}
)

# 方式4：混合使用
result = api.updateUser(
    id=123,  # 自动映射到params
    body={"name": "李四"},
    headers={"Authorization": "Bearer new-token"}
)
```

## 属性

外部API集成实例具有以下属性：

### domain
API基础域名，来自apiConfig.json的url配置。

### beforeRequestFunc  
请求前处理服务函数的调用路径，格式为"服务元素fullName.函数名"，来自apiConfig.json的beforeRequest配置。

### afterRequestFunc
请求后处理服务函数的调用路径，格式为"服务元素fullName.函数名"，来自apiConfig.json的afterRequest配置。

### commonHeaders
公共请求头字典，来自apiConfig.json的headers配置。

### apiMap
API配置映射字典，包含所有API的完整配置信息。

## 高级特性

### 请求处理管道

#### 请求前处理
通过beforeRequest配置服务元素中的函数，在发送请求前对API配置进行处理。配置格式为"services.ApiHelper.beforeApiCall"，表示调用services.ApiHelper服务元素的beforeApiCall函数：

```python title="请求前处理示例"
# services/ApiHelper/service.py
def beforeApiCall(self, apiInfo):
    """请求前处理，可修改请求参数"""
    # 添加动态认证头
    apiInfo["headers"]["Authorization"] = f"Bearer {get_current_token()}"
    # 添加时间戳
    apiInfo["params"]["timestamp"] = int(time.time())
    return apiInfo
```

#### 请求后处理  
通过afterRequest配置服务元素中的函数，对响应结果进行处理。配置格式为"services.ApiHelper.afterApiCall"：

```python title="请求后处理示例"
# services/ApiHelper/service.py  
def afterApiCall(self, response):
    """请求后处理，可转换响应格式"""
    data = response.json()
    if data.get("code") != 200:
        raise Exception(f"API调用失败：{data.get('message')}")
    return data.get("data")
```

#### 回调处理
通过callback配置服务元素中的函数，对最终结果进行业务处理。配置格式为"services.ApiHelper.handleApiResult"：

```python title="回调处理示例"
# services/ApiHelper/service.py
def handleApiResult(self, data):
    """回调处理，执行业务逻辑"""
    # 记录日志
    log.info(f"API调用成功，返回数据：{data}")
    # 数据转换
    return transform_data(data)
```

### API分组管理

支持将API按功能分组，便于管理大量接口：

```json title="API分组配置"
{
  "apis": [
    {
      "itemType": "group",
      "name": "userGroup",
      "title": "用户管理",
      "childrens": [
        {
          "name": "getUser",
          "title": "获取用户",
          "method": "GET",
          "path": "/users/{id}",
          "itemType": "api"
        },
        {
          "name": "createUser", 
          "title": "创建用户",
          "method": "POST",
          "path": "/users",
          "itemType": "api"
        }
      ]
    }
  ]
}
```

### 错误处理机制

外部API集成提供完善的错误处理：

```python title="错误处理示例"
try:
    api = app.getElement("externalAPIs.testExternal")
    result = api.getUserInfo(id=123)
except ExternalAPIErrorCode.NO_SUPPORTED_API_ERROR as e:
    # API不存在
    log.error(f"API不存在：{e}")
except ExternalAPIErrorCode.API_CALL_ERROR as e:
    # API调用失败
    log.error(f"API调用失败：{e}")
except ExternalAPIErrorCode.NO_SUPPORTED_METHOD_ERROR as e:
    # HTTP方法不支持
    log.error(f"HTTP方法不支持：{e}")
``` 