---
slug: wechat-work-dev-login
---
# 企业微信代开发登录
企业微信代开发登录是极态框架提供的登录认证Type元素，基于企业微信第三方应用代开发模式实现企业级单点登录。它负责处理企业微信OAuth授权流程、用户身份验证和多企业代理管理，支持工作台内免密登录、扫码登录和回调事件处理。

企业微信代开发登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.QywxProxyType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建企业微信代开发登录实例元素。

**支持的登录方式**：
- 企业微信工作台登录 - 用户在企业微信工作台中点击应用直接登录
- 扫码登录 - 通过企业微信扫描二维码进行登录
- 回调处理 - 处理企业微信的OAuth回调和事件通知

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.QywxProxyType元素，以实现自己的封装。

## 快速开始
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
auths/
└── QywxProxyTemp/           # 登录实例元素名称
    ├── e.json              # 元素配置文件
    └── QywxProxyTemp.json  # 业务配置文件
```

#### e.json文件
```json title="元素配置文件"
{
  "title": "企业微信代开发登录配置",
  "type": "auths.loginTypes.QywxProxyType"
}
```

#### 业务配置文件
创建与实例元素同名的业务配置文件 `QywxProxyTemp.json`：

```json title="业务配置文件"
{
  "authConfig": {
    "suiteId": "tj1234567890abcdef",
    "suiteSecret": "your_suite_secret",
    "encodingAESKey": "your_encoding_aes_key",
    "token": "your_token"
  },
  "isActive": true,
  "corpId": "ww1234567890abcdef"
}
```

#### 调用示例
```python title="基本调用示例"
# 获取登录实例
auth_instance = app.getElement("auths.QywxProxyTemp")

# 获取登录配置
config = auth_instance.getLoginConfig()

# 获取登录码
login_result = auth_instance.getLoginCode(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx"
)

# 获取服务实例
auth_service = app.getElement("auths.loginTypes.QywxProxyType.services.QywxProxyAuthService")
```

## 元素配置
### e.json配置
| 字段 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| title | string | str | 是 | 元素显示名称 |
| type | string | str | 是 | 固定值：auths.loginTypes.QywxProxyType |

### 业务配置文件配置
| 字段 | 类型 | 对应原生类型 | 必填 | 说明 |
|------|------|-------------|------|------|
| authConfig | object | dict | 是 | 认证配置对象 |
| authConfig.suiteId | string | str | 是 | 第三方应用套件ID |
| authConfig.suiteSecret | string | str | 是 | 第三方应用套件密钥 |
| authConfig.encodingAESKey | string | str | 是 | 用于加密回调数据的AES密钥 |
| authConfig.token | string | str | 是 | 用于验证回调请求的token |
| isActive | boolean | bool | 否 | 是否启用该登录方式，默认true |
| corpId | string | str | 否 | 企业微信企业ID |

## 方法
### getLoginConfig
返回登录需要的参数配置。

#### 参数详解
无参数。

#### 返回值
返回包含suiteId的配置信息字典。

#### 使用示例
```python title="获取登录配置"
auth_instance = app.getElement("auths.QywxProxyTemp")
config = auth_instance.getLoginConfig()
print(f"套件ID: {config['suiteId']}")
```

### getLoginCode
获取登录码，用于扫码登录和工作台登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| corpId | Stext | str | 是 | 企业微信企业ID |
| code | Stext | str | 是 | 企业微信授权码 |
| loginType | Stext | str | 否 | 登录类型，qr为扫码登录，workbench为工作台登录 |

#### 返回值
返回包含loginCode、corpList和userId的结果字典。

#### 使用示例
```python title="获取登录码"
auth_instance = app.getElement("auths.QywxProxyTemp")
result = auth_instance.getLoginCode(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx",
    loginType="workbench"
)
print(f"登录码: {result['loginCode']}")
print(f"用户ID: {result['userId']}")
```

### loginByWorkbench
执行企业微信工作台登录，返回包含token的登录信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| corpId | Stext | str | 是 | 企业微信代开发授权的corpId |
| code | Stext | str | 是 | 企业微信免登码 |
| platform | - | LoginPlatformEnum | 否 | 平台类型，默认为app |

#### 返回值
返回登录结果信息，包含用户信息和token。

#### 使用示例
```python title="工作台登录示例"
auth_service = app.getElement("auths.loginTypes.QywxProxyType.services.QywxProxyAuthService")
result = auth_service.loginByWorkbench(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx"
)
```

### notify
接收企业微信后台请求，用于处理回调通知。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nonce | Stext | str | 是 | 企业微信后台生成的随机数 |
| msg_signature | Stext | str | 是 | 企业微信后台生成的签名 |
| timestamp | Stext | str | 是 | 企业微信后台生成的时间戳 |
| echostr | Stext | str | 否 | 企业微信后台生成的回执字符串（GET请求时使用） |

#### 返回值
返回Flask Response对象，用于响应企业微信后台请求。

#### 使用示例
```python title="处理回调通知示例"
response = auth_service.notify(
    nonce="random_nonce",
    msg_signature="signature_value",
    timestamp="1234567890",
    echostr="echo_string"
)
```

### setCode
设置组织代号，用于生成企业微信代开发登录的二维码。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| corpId | Stext | str | 是 | 企业微信企业ID |
| code | Stext | str | 是 | 组织代号 |

#### 返回值
无返回值。

#### 使用示例
```python title="设置组织代号示例"
auth_service.setCode(
    corpId="ww1234567890abcdef",
    code="org_code_123"
)
```

### getLoginConfigByCode
通过组织代码获取二维码登录信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| code | Stext | str | 是 | 组织代码 |

#### 返回值
返回包含corpId和agentId的配置信息字典。

#### 使用示例
```python title="获取登录配置示例"
config = auth_service.getLoginConfig(code="org_code_123")
print(f"企业ID: {config['corpId']}")
print(f"应用ID: {config['agentId']}")
```

### retryCallBack
重试回调处理。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| recordId | Numeric | int | 是 | 回调记录ID |

#### 返回值
无返回值。

#### 使用示例
```python title="重试回调示例"
auth_service.retryCallBack(recordId=123)
```

## 属性
### authConfig
获取当前认证配置信息。

**类型：** `dict`

**说明：** 包含suiteId、suiteSecret等配置信息，敏感信息已脱敏。

```python title="获取认证配置"
auth_instance = app.getElement("auths.QywxProxyTemp")
config = auth_instance.authConfig
print(f"套件ID: {config['suiteId']}")
```

### authType
获取认证类型标识。

**类型：** `str`

**说明：** 固定值为"auths.loginTypes.QywxProxyType"。

### authModelElemName
获取认证模型元素名称。

**类型：** `str`

**说明：** 固定值为"auths.loginTypes.QywxProxyType.QywxProxyAuthModel"。

## 高级特性
### 多企业代理
在代开发场景中，同一个第三方应用可以为多个企业提供服务。通过创建多个实例元素支持多企业：

```text title="多企业配置示例"
auths/
├── QywxProxyCompanyA/      # 企业A的登录配置
│   ├── e.json
│   └── QywxProxyCompanyA.json
├── QywxProxyCompanyB/      # 企业B的登录配置
│   ├── e.json
│   └── QywxProxyCompanyB.json
└── QywxProxyDefault/       # 默认登录配置
    ├── e.json
    └── QywxProxyDefault.json
```

### 事件处理
企业微信代开发模式支持多种事件类型的自动处理：suite_ticket推送、企业授权成功、企业授权变更、企业授权取消。所有事件都通过notify方法统一处理，框架会自动识别事件类型并执行相应的处理逻辑。

```python title="事件处理示例"
# 框架自动处理所有回调事件
def handle_qywx_callback():
    # 所有企业微信事件通过notify方法统一处理
    # 包括suite_ticket更新、企业授权变更等
    response = auth_service.notify(
        nonce=request.args.get('nonce'),
        msg_signature=request.args.get('msg_signature'),
        timestamp=request.args.get('timestamp'),
        echostr=request.args.get('echostr')
    )
    return response
```
