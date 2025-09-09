---
slug: wechat-miniapp-login
---
# 微信小程序登录
微信小程序登录是基于微信官方授权机制的认证方式，负责小程序授权登录、用户身份验证和账号绑定管理。它支持自动获取openId/unionId等微信用户标识、绑定码机制新用户注册、Session密钥安全管理和账号绑定/解绑操作，与微信小程序生态深度集成。

微信小程序登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.WeChatMiniType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建微信小程序登录实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.WeChatMiniType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
myWeChatMiniLogin/                    # 实例元素名称
├── e.json                           # 元素声明文件
└── myWeChatMiniLogin.json           # 业务配置文件
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "auths.loginTypes.WeChatMiniType",
  "title": "微信小程序登录",
  "allowRegister": 1,
  "backendBundleEntry": ".",
  "frontBundleEntry": "./myWeChatMiniLogin.json"
}
```

#### 业务配置文件
```json title="微信小程序认证配置"
{
  "authConfig": {
    "appId": "your_mini_program_app_id",
    "appSecret": "your_mini_program_app_secret"
  }
}
```

#### 调用示例
```python title="基础调用示例"
# 获取实例
wechat_auth = app.getElement("auths.loginTypes.myWeChatMiniLogin")

# 小程序登录
result = wechat_auth.getLoginCode("wx_code_from_miniprogram")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| type | Stext | str | 是 | 固定值：auths.loginTypes.WeChatMiniType |
| title | Stext | str | 是 | 登录方式显示名称 |
| allowRegister | Numeric | int | 否 | 是否允许新用户注册，1：允许，0：不允许，默认0 |
| backendBundleEntry | Stext | str | 是 | 固定值："." |
| frontBundleEntry | Stext | str | 是 | 业务配置文件路径 |

### 业务配置文件配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| authConfig.appId | Stext | str | 是 | 微信小程序AppID |
| authConfig.appSecret | Stext | str | 是 | 微信小程序AppSecret |

## 方法 
### getLoginCode
处理微信小程序授权登录，根据用户注册状态返回不同结果。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| code | Stext | str | 是 | 微信小程序wx.login()获取的临时授权码 |

#### 返回值
- 已注册用户：`JitDict` 类型，包含loginCode和corpList
- 未注册用户（allowRegister=1）：`JitDict` 类型，包含bindCode（5分钟有效期）

#### 使用示例
```python title="登录授权处理"
result = wechat_auth.getLoginCode("wx_mini_code")

if "loginCode" in result:
    # 已注册用户
    login_code = result["loginCode"]
elif "bindCode" in result:
    # 新用户，需要注册
    bind_code = result["bindCode"]
```

### register
使用绑定码完成新用户注册流程。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| bindCode | Stext | str | 是 | getLoginCode返回的绑定码 |

#### 返回值
- `RowData` 类型：新创建的用户对象

#### 使用示例
```python title="新用户注册"
user = wechat_auth.register("bind_code_from_getLoginCode")
print(f"用户注册成功：{user.userId.value}")
```

### bind
绑定现有用户账号与微信小程序。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Numeric | int | 是 | 要绑定的用户ID |
| code | Stext | str | 是 | 微信小程序授权码 |

#### 返回值
- `JitDict` 类型：操作结果字典

#### 使用示例
```python title="账号绑定"
result = wechat_auth.bind(123, "wx_mini_code")
```

### unbind
解除用户账号与微信小程序的绑定关系。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Numeric | int | 是 | 要解绑的用户ID |

#### 返回值
- `JitDict` 类型：操作结果字典

#### 使用示例
```python title="账号解绑"
result = wechat_auth.unbind(123)
```

## 属性
### allowRegister
- **类型**：Numeric (int)
- **说明**：控制是否允许新用户注册，1：允许，0：不允许

### authConfig
- **类型**：JitDict (dict)
- **说明**：微信小程序认证配置，包含appId和appSecret

## 高级特性
### 完整注册流程
当allowRegister=1时，新用户可通过绑定码机制完成注册，该流程包含授权检查、绑定码生成和用户创建等步骤。

```python title="新用户完整注册流程"
wechat_auth = app.getElement("auths.loginTypes.myWeChatMiniLogin")

# 尝试登录获取绑定码
login_result = wechat_auth.getLoginCode("wx_mini_code")

if "bindCode" in login_result:
    # 使用绑定码完成注册
    bind_code = login_result["bindCode"]
    new_user = wechat_auth.register(bind_code)
    print(f"注册成功，用户ID：{new_user.userId.value}")
```

### 账号绑定管理
支持将微信小程序与现有用户账号进行绑定和解绑操作，便于用户账号体系整合。

```python title="账号绑定管理"
# 绑定现有账号
bind_result = wechat_auth.bind(user_id, "wx_mini_code")

# 需要时解绑账号
unbind_result = wechat_auth.unbind(user_id)
``` 