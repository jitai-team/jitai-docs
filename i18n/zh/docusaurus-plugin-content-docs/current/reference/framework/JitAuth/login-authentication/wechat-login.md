---
slug: wechat-login
description: "微信登录 API 参考文档。完整的规格说明、方法和示例。"
---
# 微信登录
微信登录是基于微信开放平台OAuth2.0协议的第三方认证方式，通过扫码登录和用户信息获取实现与微信用户体系的无缝集成。它负责微信用户身份验证、账户绑定管理和登录状态维护，支持前后端分离架构和完整的用户认证流程。

微信登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.WeChatType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建微信登录实例元素。

微信登录基于标准OAuth2.0认证流程，用户通过微信客户端扫码授权后，系统获取访问令牌和用户标识，完成身份验证和账户关联。支持用户绑定、解绑操作和多应用场景的身份管理。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的auths.loginTypes.WeChatType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
auths/
└── loginTypes/
    └── MyWeChatLogin/        # 实例元素名称，可自定义
        ├── e.json            # 元素定义文件
        └── MyWeChatLogin.json # 业务配置文件，文件名与实例元素名称一致
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "auths.loginTypes.WeChatType",
  "title": "微信登录",
  "appSecret": "你的微信应用密钥",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./MyWeChatLogin.json"
}
```

#### 业务配置文件
```json title="MyWeChatLogin.json配置示例"
{
  "authConfig": {
    "appId": "你的微信应用ID",
    "appSecret": "你的微信应用密钥"
  }
}
```

#### 调用示例
```python title="获取微信登录实例并使用"
# 获取微信登录实例
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")

# 获取登录配置信息
login_config = wechat_auth.getLoginConfig()

# 处理微信扫码回调，获取登录码
login_result = wechat_auth.getLoginCode("微信返回的code")

# 绑定用户微信账号
wechat_auth.bind("用户ID", "微信返回的code")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| type | Stext | str | 是 | 固定值：auths.loginTypes.WeChatType |
| title | Stext | str | 是 | 登录方式显示名称 |
| appSecret | Stext | str | 是 | 微信应用密钥，用于服务端验证 |
| backendBundleEntry | Stext | str | 是 | 后端入口，固定值："." |
| frontBundleEntry | Stext | str | 是 | 前端配置文件路径，通常为"./配置文件名.json" |

### 业务配置文件配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| authConfig.appId | Stext | str | 是 | 微信开放平台应用ID |
| authConfig.appSecret | Stext | str | 是 | 微信开放平台应用密钥 |

## 方法 
### getLoginConfig
获取登录配置信息，用于前端展示登录选项。

#### 参数详解
无参数

#### 返回值
| 字段 | 类型 | 对应原生类型 | 说明 |
|------|------|-------------|------|
| isActive | Boolean | bool | 登录方式是否启用 |
| authType | Stext | str | 认证类型标识 |
| authConfig.appId | Stext | str | 微信应用ID |

#### 使用示例
```python title="获取登录配置"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
config = wechat_auth.getLoginConfig()
print(config)
# 输出: {"isActive": True, "authType": "WeChatType", "authConfig": {"appId": "wx123456"}}
```

### getLoginCode
处理微信OAuth回调，获取系统登录码。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| code | Stext | str | 是 | 微信OAuth回调返回的授权码 |

#### 返回值
| 字段 | 类型 | 对应原生类型 | 说明 |
|------|------|-------------|------|
| loginCode | Stext | str | 系统登录码 |
| corpList | JitList | list | 用户关联的组织列表 |

#### 使用示例
```python title="处理微信登录回调"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
try:
    result = wechat_auth.getLoginCode("001234567890abcdef")
    print(f"登录码: {result['loginCode']}")
    print(f"组织列表: {result['corpList']}")
except Exception as e:
    print(f"登录失败: {e}")
```

### bind
绑定用户微信账号。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 系统用户ID |
| code | Stext | str | 是 | 微信OAuth授权码 |

#### 返回值
| 字段 | 类型 | 对应原生类型 | 说明 |
|------|------|-------------|------|
| success | Boolean | bool | 固定返回True，表示操作成功 |
| message | Stext | str | 固定返回"操作成功" |

#### 使用示例
```python title="绑定微信账号"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
try:
    result = wechat_auth.bind("user123", "001234567890abcdef")
    print("微信账号绑定成功")
except Exception as e:
    print(f"绑定失败: {e}")
```

### unbind
解绑用户微信账号。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 系统用户ID |

#### 返回值
| 字段 | 类型 | 对应原生类型 | 说明 |
|------|------|-------------|------|
| success | Boolean | bool | 固定返回True，表示操作成功 |
| message | Stext | str | 固定返回"操作成功" |

#### 使用示例
```python title="解绑微信账号"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
result = wechat_auth.unbind("user123")
print("微信账号解绑成功")
```

### getUserAuthInfo
获取用户微信认证信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| authObj | RowData | dict | 是 | 微信认证数据对象 |

#### 返回值
| 字段 | 类型 | 对应原生类型 | 说明 |
|------|------|-------------|------|
| isActive | Boolean | bool | 认证是否有效 |

#### 使用示例
```python title="获取用户认证信息"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
# 从认证模型获取用户数据
auth_model = app.getElement("auths.loginTypes.WeChatType.WeChatAuthModel")
auth_obj = auth_model.get(filter="Q(userId='user123')", orderList=[])

auth_info = wechat_auth.getUserAuthInfo(auth_obj)
print(f"认证状态: {auth_info['isActive']}")
```

## 属性
### authType
认证类型标识，固定值为"WeChatType"。

### authConfig
微信应用配置信息，包含appId和appSecret。

### isActive
登录方式启用状态，布尔值类型。

## 高级特性
### 自定义认证模型
微信登录使用内置的WeChatAuthModel存储用户认证信息，包含以下字段：

```python title="WeChatAuthModel字段结构"
# 微信认证模型字段
auth_model = app.getElement("auths.loginTypes.WeChatType.WeChatAuthModel")

# 主要字段说明
# id: 主键ID (AutoInt)
# appId: 微信应用ID (Stext)
# userId: 系统用户ID (Stext)
# openId: 微信用户openId (Stext)
# unionId: 微信用户unionId (Stext)
```

### 前端登录组件集成
微信登录Type元素提供了完整的前端登录组件，支持扫码登录界面和状态管理：

```python title="前端组件配置示例"
# 获取前端登录组件配置
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
frontend_config = {
    "componentType": "WeChatLogin",
    "appId": wechat_auth.authConfig["appId"],
    "redirectUri": "https://yourdomain.com/auth/callback",
    "scope": "snsapi_login"
}

# 在页面中使用登录组件时的配置
login_component_props = {
    "authType": "WeChatType", 
    "config": frontend_config,
    "onSuccess": "handleLoginSuccess",
    "onError": "handleLoginError"
}
``` 