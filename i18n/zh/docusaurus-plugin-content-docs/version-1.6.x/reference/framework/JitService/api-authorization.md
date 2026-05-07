---
slug: api-authorization
description: "API授权 API 参考文档。完整的规格说明、方法和示例。"
---
# API授权
API授权用于管理第三方应用对本应用API接口的访问权限，通过accessKey/accessSecret密钥对控制哪些外部应用可以调用哪些API。它基于签名验证机制确保调用安全，自动记录所有API访问日志，为应用提供标准化的API开放能力。

API授权元素分层结构为Meta（apiAuths.Meta） → Type（apiAuths.NormalType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建API授权实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的apiAuths.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
apiAuths/
└── myApiAuth/
    ├── e.json
    └── myApiAuth.json
```

路径可自定义，示例仅为推荐做法。

#### e.json文件
```json title="元素声明文件"
{
  "title": "我的API授权",
  "type": "apiAuths.NormalType",
  "accessKey": "your_access_key",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="业务配置文件（myApiAuth.json）"
{
  "accessKey": "your_access_key",
  "accessSecret": "generated_secret",
  "remark": "API授权说明",
  "apis": [
    "services.UserSvc.getUserInfo",
    "services.OrderSvc.getOrderList"
  ]
}
```

#### 调用示例
```python title="获取API授权元素"
# 获取API授权实例
apiAuth = app.getElement("apiAuths.myApiAuth")

# 获取授权详情
details = apiAuth.getDetails()
print(f"授权API列表: {details}")

# 通过服务获取授权信息
authSvc = app.getElement("apiAuths.services.ApiAuthSvc")
authDetails = authSvc.getDetails("your_access_key")
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 授权名称 |
| type | string | 是 | 固定值：apiAuths.NormalType |
| accessKey | string | 是 | 访问密钥标识 |
| backendBundleEntry | string | 是 | 后端入口，通常为"." |

### 业务配置文件配置
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKey | string | 是 | 访问密钥，用于身份识别 |
| accessSecret | string | 是 | 访问密文，用于签名验证 |
| remark | string | 否 | 授权备注说明 |
| apis | array | 是 | 允许访问的API列表，格式：服务全名.方法名 |

## 方法 
### getDetails
获取API授权的详细信息，包含所有授权的服务和方法列表。

#### 返回值
返回包含授权详情的列表，每个服务包含title、fullName和functionList信息。

#### 使用示例
```python title="获取授权详情"
apiAuth = app.getElement("apiAuths.myApiAuth")
details = apiAuth.getDetails()

# 输出示例
for service in details:
    print(f"服务: {service['title']} ({service['fullName']})")
    for func in service['functionList']:
        print(f"  - {func['title']}: {func['name']}")
```

### before
请求前置拦截处理，执行权限校验和签名验证。

#### 使用示例
```python title="拦截器使用"
# 在API请求处理前自动调用
# 1. 检查API是否在授权列表中
# 2. 验证请求头中的timestamp和accessSign
# 3. 进行签名校验
```

### after
请求后置处理，对响应数据进行签名并记录调用日志。

#### 使用示例
```python title="响应处理"
# 在API请求处理后自动调用
# 1. 对响应数据进行签名
# 2. 添加timestamp和accessSign到响应
# 3. 保存调用记录到数据库
```

### saveLog
保存API调用记录到数据库，记录请求详情、耗时、错误信息等。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| respData | JitDict | dict | 是 | 响应数据 |

#### 使用示例
```python title="手动保存日志"
apiAuth = app.getElement("apiAuths.myApiAuth")
respData = {"status": "success", "data": "result"}
apiAuth.saveLog(respData)
```

## 属性
### accessKey
访问密钥标识，用于身份识别和权限查找。

### accessSecret
访问密文，用于请求签名的生成和验证。

### apis
授权的API列表，包含允许访问的服务方法全名。

### currApi
当前请求的API路径，基于请求URL解析得出。

### request
当前HTTP请求对象，包含请求的所有信息。

## 高级特性
### 签名验证机制
API授权使用时间戳+数据签名的双重验证机制：

```python title="签名验证流程"
# 客户端生成签名
timestamp = int(time.time() * 1000)
data = {"param1": "value1", "param2": "value2"}
sign_data = {"timestamp": timestamp, "accessSign": generated_sign, **data}

# 服务端验证签名
# 1. 检查时间戳是否超时
# 2. 使用相同算法重新计算签名
# 3. 比较签名是否一致
```

### 调用记录追踪
系统自动记录所有API调用的详细信息：

```python title="调用记录字段"
{
    "accessKey": "访问密钥",
    "requestId": "请求ID", 
    "timestamp": "请求时间戳",
    "ip": "客户端IP",
    "domain": "请求域名",
    "path": "请求路径",
    "element": "服务元素名",
    "funcName": "方法名",
    "duration": "耗时(毫秒)",
    "errcode": "错误码",
    "errmsg": "错误信息"
}
```

### 权限动态管理
支持运行时动态更新授权配置：

```python title="动态权限管理"
# 通过ApiAuthSvc服务管理权限
authSvc = app.getElement("apiAuths.services.ApiAuthSvc")

# 生成新的访问密文
result = authSvc.genAccessSecret("new_access_key")
new_secret = result["accessSecret"]

# 验证访问密文
authSvc.checkAccessSecret("access_key", "access_secret")

# 获取远程授权详情
remote_details = authSvc.getAuthDetails(
    "https://domain.com/org/app", 
    "access_key", 
    "access_secret"
)
``` 