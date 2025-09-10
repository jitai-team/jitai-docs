---
slug: wechat-official-login
---
# 微信公众号登录
微信公众号登录是面向微信公众号生态的认证登录方式，基于OAuth2.0网页授权机制实现用户身份验证和登录。它负责微信公众号用户身份识别、授权信息获取和登录状态管理，支持静默授权和用户信息授权两种模式，提供完整的前后端集成方案。

微信公众号登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.WechatPublicType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建微信公众号登录实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.WechatPublicType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
auths/loginTypes/MyWechatLogin/
├── e.json
└── MyWechatLogin.json
```

#### e.json文件
```json title="元素定义文件"
{
  "title": "微信公众号登录",
  "type": "auths.loginTypes.WechatPublicType"
}
```

#### 业务配置文件
```json title="MyWechatLogin.json"
{
  "appId": "wx1234567890abcdef",
  "appSecret": "your_app_secret_here",
  "scope": "snsapi_userinfo",
  "state": "custom_state_value"
}
```

#### 调用示例
```python title="后端使用示例"
# 获取登录服务
auth_service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')

# 处理授权回调
user_info = auth_service.getUserInfo(code)
if user_info:
    # 处理用户登录逻辑
    openid = user_info.get('openid')
    nickname = user_info.get('nickname')
```

```typescript title="前端使用示例"
// 前端调用登录
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
authElement.login('https://your-domain.com/callback');
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| title | Stext | str | 是 | 元素标题 |
| type | Stext | str | 是 | 固定值：auths.loginTypes.WechatPublicType |

### 业务配置文件配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| appId | Stext | str | 是 | 微信公众号AppID |
| appSecret | Stext | str | 是 | 微信公众号AppSecret |
| scope | Stext | str | 否 | 授权作用域，默认snsapi_userinfo |
| state | Stext | str | 否 | 防CSRF攻击的状态参数 |

**授权作用域说明：**
- `snsapi_base`: 静默授权，仅获取openid
- `snsapi_userinfo`: 用户信息授权，获取完整用户信息

## 方法 
### getUserInfo
获取微信用户信息

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| code | Stext | str | 是 | 微信授权回调code |

#### 返回值
```python title="返回用户信息"
{
    "openid": "用户唯一标识",
    "nickname": "用户昵称", 
    "headimgurl": "头像URL",
    "sex": 1,  # 1-男性 2-女性 0-未知
    "province": "省份",
    "city": "城市",
    "country": "国家",
    "unionid": "开放平台唯一标识"
}
```

#### 使用示例
```python title="获取用户信息"
service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
user_info = service.getUserInfo("微信回调code")

if user_info:
    openid = user_info['openid']
    nickname = user_info['nickname']
    # 处理用户信息
```

### getAccessToken
获取微信访问令牌

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| code | Stext | str | 是 | 微信授权回调code |

#### 返回值
```python title="返回访问令牌"
{
    "access_token": "访问令牌",
    "expires_in": 7200,
    "refresh_token": "刷新令牌", 
    "openid": "用户唯一标识",
    "scope": "授权作用域"
}
```

#### 使用示例
```python title="获取访问令牌"
service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
token_info = service.getAccessToken("微信回调code")

if token_info:
    access_token = token_info['access_token']
    expires_in = token_info['expires_in']
```

### login
前端发起微信登录

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| redirectUrl | Stext | str | 是 | 授权成功后的回调URL |

#### 使用示例
```typescript title="前端发起登录"
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
authElement.login('https://your-domain.com/wechat/callback');
```

### isWechatBrowser
检测是否在微信浏览器环境

#### 返回值
返回布尔值，true表示在微信环境中

#### 使用示例
```typescript title="环境检测"
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
const isWechat = authElement.isWechatBrowser();

if (!isWechat) {
    alert('请在微信中打开');
}
```

## 属性
### WechatPublicAuthModel
微信公众号认证数据模型，用于存储用户认证信息

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | AutoInt | 主键ID |
| openid | Stext | 微信用户唯一标识 |
| unionid | Stext | 微信开放平台统一标识 |
| nickname | Stext | 用户昵称 |
| headimgurl | Stext | 用户头像URL |
| sex | Numeric | 用户性别(0-未知,1-男,2-女) |
| province | Stext | 用户所在省份 |
| city | Stext | 用户所在城市 |
| country | Stext | 用户所在国家 |
| accessToken | Stext | 微信访问令牌 |
| refreshToken | Stext | 微信刷新令牌 |
| expiresIn | Numeric | 令牌过期时间(秒) |
| createdAt | Datetime | 创建时间 |
| updatedAt | Datetime | 更新时间 |

## 高级特性
### 授权作用域配置
根据业务需求选择合适的授权作用域：

```json title="静默授权配置"
{
    "appId": "your_app_id",
    "appSecret": "your_app_secret", 
    "scope": "snsapi_base",
    "state": "silent_auth"
}
```

```json title="用户信息授权配置"
{
    "appId": "your_app_id",
    "appSecret": "your_app_secret",
    "scope": "snsapi_userinfo", 
    "state": "user_info_auth"
}
```

### 安全配置
**域名白名单设置：**
必须在微信公众平台后台配置授权回调域名，确保回调URL域名与配置完全一致。

**状态参数防护：**
```python title="状态参数验证"
def verify_state(received_state, expected_state):
    return received_state == expected_state

# 在回调处理中验证
if not verify_state(request.args.get('state'), 'expected_state'):
    return {"error": "Invalid state parameter"}
```

### 令牌刷新机制
```python title="令牌自动刷新"
def refresh_access_token(refresh_token):
    service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
    # 实现令牌刷新逻辑
    new_token = service.refreshToken(refresh_token)
    return new_token
```

### 错误处理
```python title="错误处理示例"
try:
    user_info = service.getUserInfo(code)
    if not user_info:
        return {"error": "Failed to get user info"}
except Exception as e:
    return {"error": f"Auth error: {str(e)}"}
```

**常见错误及解决方案：**

1. **redirect_uri参数错误**：检查微信后台域名配置
2. **invalid code**：code只能使用一次，重新获取
3. **access_token expired**：使用refresh_token刷新
4. **非微信环境**：引导用户在微信中打开或提供二维码 