---
slug: google-login
---
# Google 登录 {#google-login}
Google 登录（GoogleType）是基于 Google 开放平台的登录认证元素，支持PC端和移动端的OAuth授权登录。它负责处理Google OAuth授权流程、用户身份验证和账号绑定，适用于面向国际用户的应用、SaaS 平台、教育类产品等场景，能够提升用户体验，简化注册流程。

Google 登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.GoogleType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Google登录实例元素。

**支持的登录方式**：
- PC端OAuth授权登录 - 跳转到Google登录页面完成OAuth授权登录
- 移动端OAuth授权登录 - 在移动设备上调用Google OAuth服务完成授权登录
- 单点登录集成 - 与Google Workspace集成的单点登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.GoogleType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testGoogleLogin/           # 自定义实例名称
            ├── e.json                # 元素定义文件
            └── testGoogleLogin.json   # Google应用配置文件
```

#### e.json文件
```json title="元素定义文件"
{
  "title": "Google登录",
  "type": "auths.loginTypes.GoogleType"
}
```

#### 业务配置文件
```json title="testGoogleLogin.json - Google应用配置"
{
  "authConfig": {
    "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "clientSecret": "GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")

# 获取登录配置（用于前端生成OAuth链接）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# 获取Google客户端
client = auth_element.getClient()

# 通过服务获取认证元素
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
auth = auth_svc.getAuthByClientId("your_client_id")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.GoogleType |

### 业务配置文件配置
配置文件名格式为`{实例名称}.json`，包含Google应用的认证信息：

| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| authConfig.clientId | string | 是 | Google OAuth 2.0 客户端ID |
| authConfig.clientSecret | string | 是 | Google OAuth 2.0 客户端密钥 |

**配置获取方式**：
1. 登录Google Cloud Console（https://console.cloud.google.com/）
2. 进入"API和服务" → "凭据"
3. 创建新的OAuth 2.0客户端ID或选择现有凭据
4. 在应用详情页获取客户端ID和客户端密钥
5. 为应用配置已获授权的重定向URI

## 方法 
### getLoginConfig
获取登录配置信息，主要用于前端生成OAuth授权链接。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含clientId和其他配置的字典 |

#### 使用示例
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
config = auth_element.getLoginConfig()
# 返回: {"clientId": "your_client_id.apps.googleusercontent.com"}
```

### getClient
获取Google API客户端实例，用于调用Google相关接口。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| GoogleClient | object | Google客户端对象 |

#### 使用示例
```python title="获取Google客户端"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
client = auth_element.getClient()
# 可用于调用Google API
```

### loginByOAuth (服务方法)
Google OAuth登录，通过授权码完成用户登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| clientId | Stext | str | 是 | Google OAuth 2.0 客户端ID |
| authCode | Stext | str | 是 | OAuth授权码 |
| platform | Stext | str | 是 | 登录平台：web/mobile |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 登录结果信息 |

#### 使用示例
```python title="OAuth登录"
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
result = auth_svc.loginByOAuth(
    clientId="your_client_id.apps.googleusercontent.com",
    authCode="auth_code_from_google",
    platform="web"
)
```

### getAuthByClientId (服务方法)
通过Google客户端ID获取对应的认证元素实例。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| clientId | Stext | str | 是 | Google OAuth 2.0 客户端ID |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| Element | object | 认证元素实例，未找到时返回None |

#### 使用示例
```python title="通过客户端ID获取认证元素"
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
auth_element = auth_svc.getAuthByClientId("your_client_id.apps.googleusercontent.com")
if auth_element:
    print(f"找到认证元素: {auth_element.fullName}")
```


## 属性
### authConfig
Google应用配置信息，包含clientId、clientSecret等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| clientId | str | Google OAuth 2.0 客户端ID |
| clientSecret | str | Google OAuth 2.0 客户端密钥 |

### authType
认证类型标识，固定值为Google登录的类型枚举。

### authModelElemName
关联的认证数据模型元素名称，指向GoogleAuthModel。

## 高级特性
### 数据模型扩展
GoogleAuthModel存储Google用户认证信息，包含用户ID映射、Google用户信息等字段：

```python title="认证数据模型字段"
class GoogleAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="主键ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="用户ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="Google用户ID")
    email = datatypes.Stext(name="email", title="邮箱")
    name = datatypes.Stext(name="name", title="显示名称")
    picture = datatypes.Stext(name="picture", title="头像URL")
    locale = datatypes.Stext(name="locale", title="语言区域")
    createTime = datatypes.Datetime(name="createTime", title="创建时间")
```

### 前端集成
前端需要实现OAuth授权流程：

```typescript title="前端登录实现"
// PC端OAuth登录
const loginWithGoogle = async () => {
    const config = await getLoginConfig(); // 获取配置
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${config.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid profile email&` +
        `state=${generateState()}`;
    
    // 跳转到Google登录页面
    window.location.href = authUrl;
};

// 处理OAuth回调
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        const result = await authSvc.loginByOAuth({
            clientId: config.clientId,
            authCode: code,
            platform: 'web'
        });
        
        if (result.success) {
            // 登录成功，跳转到主页
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('登录失败:', error);
    }
};
```

### 权限配置
在Google Cloud Console中配置应用权限：

```text title="所需API权限"
Google API 权限:
- openid (OAuth范围) - 访问OpenID Connect用户标识符
- profile (OAuth范围) - 访问用户基本资料信息
- email (OAuth范围) - 访问用户邮箱地址
- https://www.googleapis.com/auth/userinfo.profile - 访问用户资料信息
- https://www.googleapis.com/auth/userinfo.email - 访问用户邮箱信息
```

### 错误处理
常见错误情况及处理方式：

```python title="错误处理示例"
try:
    auth_element = auth_svc.getAuthByClientId(clientId)
    if not auth_element:
        raise Exception("未找到对应的Google认证配置")
    
    result = auth_svc.loginByOAuth(clientId, authCode, platform)
    if not result.get('success'):
        raise Exception(result.get('message', '登录失败'))
        
except Exception as e:
    # 记录错误日志并返回友好提示
    logger.error(f"Google登录失败: {str(e)}")
    return {"success": False, "message": "登录失败，请重试"}
```

**常见错误类型**：
- 应用配置错误：检查clientId、clientSecret等配置
- 授权码过期：OAuth授权码有效期10分钟，需重新获取
- 权限不足：确保应用已获得必要的Google API权限
- 网络连接问题：确保能访问Google API服务
- 重定向URI无效：确保重定向URI与Google Console配置一致

