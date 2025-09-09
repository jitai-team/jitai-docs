---
slug: account-password-login
---
# 账号密码登录
账号密码登录是极态平台提供的基础登录认证方式，支持用户名密码验证、图形验证码防护和密码加密存储等功能。它负责用户身份认证、账号绑定管理和登录安全防护，适用于企业内部应用和需要传统认证方式的场景。

账号密码登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.PasswordType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建账号密码登录实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.PasswordType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
auths/
└── loginTypes/
    └── MyPasswordAuth/
        ├── e.json              # 元素配置文件
        └── Config.json         # 认证配置文件
```

#### e.json文件
```json title="元素配置"
{
    "title": "账号密码登录",
    "type": "auths.loginTypes.PasswordType",
    "default": 1,
    "allowRegister": 1,
    "backendBundleEntry": ".",
    "frontBundleEntry": "./Config.json"
}
```

#### 业务配置文件
```json title="Config.json认证配置"
{
    "authConfig": {
        "salt": "your_custom_salt_32_chars_long"
    },
    "isActive": true,
    "limit": {
        "minLength": 6,
        "maxLength": 20,
        "requireUppercase": false,
        "requireNumber": false
    }
}
```

#### 调用示例
```python title="基本使用"
# 获取认证实例
auth = app.getElement("auths.loginTypes.MyPasswordAuth")

# 生成验证码
captcha = auth.generateCaptcha()

# 用户登录
result = auth.getLoginCode(
    username="admin",
    password="e10adc3949ba59abbe56e057f20f883e",  # 前端MD5加密后的密码
    captcha="A2B3",
    token=captcha["token"]
)
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| title | string | 登录方式显示名称 | - |
| type | string | 必须为"auths.loginTypes.PasswordType" | - |
| default | int | 是否为默认登录方式 (1=是, 0=否) | 0 |
| allowRegister | int | 是否允许注册 (1=允许, 0=不允许) | 0 |
| backendBundleEntry | string | 后端入口路径 | "." |
| frontBundleEntry | string | 前端配置文件路径 | - |

### 业务配置文件配置
| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| authConfig.salt | string | 密码加密盐值（32位字符） | 自动生成 |
| isActive | boolean | 是否启用该登录方式 | true |
| limit.minLength | int | 密码最小长度 | 6 |
| limit.maxLength | int | 密码最大长度 | 20 |
| limit.requireUppercase | boolean | 是否要求大写字母 | false |
| limit.requireNumber | boolean | 是否要求数字 | false |
| limit.requireSpecialChar | boolean | 是否要求特殊字符 | false |

## 方法 
### getLoginCode
用户登录验证，返回登录凭证和用户信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| username | Stext | str | 是 | 用户名 |
| password | Stext | str | 是 | 密码（前端MD5加密后） |
| captcha | Stext | str | 是 | 验证码内容 |
| token | Stext | str | 是 | 验证码token |

#### 返回值
| 字段名 | 类型 | 说明 |
|--------|------|------|
| loginCode | string | 登录凭证 |
| corpList | list | 组织列表 |
| userId | string | 用户ID |

#### 使用示例
```python title="用户登录"
try:
    result = auth.getLoginCode(
        username="admin",
        password="e10adc3949ba59abbe56e057f20f883e",
        captcha="A2B3",
        token="abc123def456"
    )
    print(f"登录成功，用户ID: {result['userId']}")
except Exception as e:
    print(f"登录失败: {e}")
```

### generateCaptcha
生成图形验证码，返回验证码token和图片数据。

#### 参数详解
无参数

#### 返回值
| 字段名 | 类型 | 说明 |
|--------|------|------|
| token | string | 验证码token（5分钟有效） |
| img | string | base64编码的验证码图片 |

#### 使用示例
```python title="生成验证码"
captcha = auth.generateCaptcha()
print(f"验证码Token: {captcha['token']}")
# 将captcha['img']返回给前端显示
```

### bind
为用户绑定账号密码认证方式。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |
| username | Stext | str | 是 | 用户名 |
| password | Stext | str | 是 | 密码（前端MD5加密后） |

#### 返回值
操作结果字典

#### 使用示例
```python title="绑定账号"
result = auth.bind(
    userId="user123",
    username="newuser", 
    password="e10adc3949ba59abbe56e057f20f883e"
)
```

### updatePassword
修改用户密码。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |
| oldPassword | Stext | str | 是 | 原密码（前端MD5加密后） |
| newPassword | Stext | str | 是 | 新密码（前端MD5加密后） |

#### 返回值
操作结果字典

#### 使用示例
```python title="修改密码"
result = auth.updatePassword(
    userId="user123",
    oldPassword="e10adc3949ba59abbe56e057f20f883e",
    newPassword="098f6bcd4621d373cade4e832627b4f6"
)
```

### checkCaptcha
校验验证码是否正确。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| token | Stext | str | 是 | 验证码token |
| code | Stext | str | 是 | 验证码内容 |

#### 返回值
| 类型 | 说明 |
|------|------|
| bool | True表示验证通过，False表示验证失败 |

#### 使用示例
```python title="验证码校验"
is_valid = auth.checkCaptcha("abc123def456", "A2B3")
if is_valid:
    print("验证码正确")
else:
    print("验证码错误")
```

### unbind
为用户解绑账号密码认证方式。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |

#### 返回值
操作结果字典

#### 使用示例
```python title="解绑账号"
result = auth.unbind(userId="user123")
```

### updateUsername
修改用户名。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |
| username | Stext | str | 是 | 新用户名 |

#### 返回值
操作结果字典

#### 使用示例
```python title="修改用户名"
result = auth.updateUsername(
    userId="user123",
    username="newusername"
)
```

## 属性
| 属性名 | 类型 | 说明 |
|--------|------|------|
| authType | string | 认证类型标识 |
| authModelElemName | string | 认证模型元素名称 |

## 高级特性
### 密码强度策略
配置密码复杂度要求提高安全性。

```json title="强密码策略配置"
{
    "limit": {
        "minLength": 8,
        "maxLength": 20,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumber": true,
        "requireSpecialChar": true
    }
}
```

### 密码加密管理
自定义盐值和批量密码刷新功能。

```python title="密码管理功能"
# 加密密码（用于导入导出）
encrypted = auth.encryptPassword("user_md5_password")

# 刷新数据库中所有密码（升级时使用）
auth.refreshDbPassword()
```

### 错误处理
常见错误码处理示例。

```python title="错误处理"
try:
    result = auth.getLoginCode(username, password, captcha, token)
except Exception as e:
    error_msg = str(e)
    if "USER_AUTH_MISS" in error_msg:
        return {"error": "用户不存在"}
    elif "PASSWORD_ERROR" in error_msg:
        return {"error": "密码错误"}
    elif "CAPTCHA_ERROR" in error_msg:
        return {"error": "验证码错误"}
    else:
        return {"error": "登录失败，请稍后重试"}
``` 