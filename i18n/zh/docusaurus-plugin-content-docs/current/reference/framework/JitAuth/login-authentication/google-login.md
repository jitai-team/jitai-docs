---
slug: google-login
description: "Google 登录 API 参考文档。完整的规格说明、方法和示例。"
---
# Google 登录
Google 登录（GoogleType）是基于 Google 开放平台的登录认证元素，支持PC端和移动端的OAuth授权登录。它负责处理Google OAuth授权流程、用户身份验证和账号绑定，适用于面向国际用户的应用、SaaS 平台、教育类产品等场景，能够提升用户体验，简化注册流程。

Google 登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.GoogleType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建Google登录实例元素。

**支持的登录方式**：
- PC端OAuth授权登录 - 跳转到Google登录页面完成OAuth授权登录
- 移动端OAuth授权登录 - 在移动设备上调用Google OAuth服务完成授权登录
- 单点登录集成 - 与Google Workspace集成的单点登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的auths.loginTypes.GoogleType元素，以实现自己的封装。

## 快速开始 {#quick-start}
### 创建实例元素 {#creating-instance-elements}
#### 目录结构 {#directory-structure}
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testGoogleLogin/           # 自定义实例名称
            ├── e.json                # 元素定义文件
            └── testGoogleLogin.json   # Google应用配置文件
```

#### e.json文件 {#e-json-file}
```json title="元素定义文件"
{
  "title": "Google登录",
  "type": "auths.loginTypes.GoogleType"
}
```

#### 业务配置文件 {#business-configuration-file}
```json title="testGoogleLogin.json - Google应用配置"
{
  "authConfig": {
    "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "clientSecret": "GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例 {#usage-example}
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")

# 获取登录配置（用于前端生成OAuth链接）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# 获取Google客户端
client = auth_element.getClient()

# 通过认证元素进行OAuth登录
result = auth_element.getLoginCode(code="authorization_code_from_google")
```

## 元素配置 {#element-configuration}
### e.json配置 {#e-json-configuration}
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.GoogleType |

### 业务配置文件配置 {#business-configuration-file-setup}
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

## 方法 {#methods}
### getLoginConfig {#getloginconfig}
获取登录配置信息，主要用于前端生成OAuth授权链接。

#### 返回值 {#getloginconfig-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含clientId和其他配置的字典 |

#### 使用示例 {#getloginconfig-usage-example}
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
config = auth_element.getLoginConfig()
# 返回: {"clientId": "your_client_id.apps.googleusercontent.com"}
```

### getClient {#getclient}
获取Google API客户端实例，用于调用Google相关接口。

#### 返回值 {#getclient-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| GoogleClient | object | Google客户端对象 |

#### 使用示例 {#getclient-usage-example}
```python title="获取Google客户端"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
client = auth_element.getClient()
# 可用于调用Google API
```

### getLoginCode {#getlogincode}
通过Google OAuth授权码获取登录码，这是认证元素的核心登录方法。

#### 参数详解 {#getlogincode-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| code | Stext | str | 是 | Google OAuth2授权码 |

#### 返回值 {#getlogincode-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含loginCode和corpList的登录结果 |

#### 使用示例 {#getlogincode-usage-example}
```python title="OAuth登录"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
result = auth_element.getLoginCode(code="auth_code_from_google")
# 返回: {"loginCode": "...", "corpList": [...]}
```

### getUserInfoByCode {#getuserinfobycode}
通过Google OAuth授权码获取用户信息。

#### 参数详解 {#getuserinfobycode-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| code | Stext | str | 是 | Google OAuth2授权码 |

#### 返回值 {#getuserinfobycode-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | Google用户信息字典 |

#### 使用示例 {#getuserinfobycode-usage-example}
```python title="获取用户信息"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code_from_google")
# 返回Google用户信息，包含email、name、picture等字段
```

### bind {#bind}
绑定Google用户到现有用户账号。

#### 参数详解 {#bind-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |
| userInfo | JitDict | dict | 是 | Google用户信息 |

#### 使用示例 {#bind-usage-example}
```python title="绑定Google账号"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code")
auth_element.bind(userId="user_id", userInfo=user_info)
```

### unbind {#unbind}
解绑Google用户。

#### 参数详解 {#unbind-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |

#### 使用示例 {#unbind-usage-example}
```python title="解绑Google账号"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
auth_element.unbind(userId="user_id")
```

## 属性 {#properties}
### authConfig {#authconfig}
Google应用配置信息，包含clientId、clientSecret等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| clientId | str | Google OAuth 2.0 客户端ID |
| clientSecret | str | Google OAuth 2.0 客户端密钥 |

### authType {#authtype}
认证类型标识，固定值为Google登录的类型枚举。

### authModelElemName {#authmodelelemname}
关联的认证数据模型元素名称，指向GoogleAuthModel。

## 高级特性 {#advanced-features}
### 数据模型扩展 {#data-model-extension}
GoogleAuthModel存储Google用户认证信息，使用简化的字段结构：

```python title="认证数据模型字段"
class GoogleAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="UserID")
    email = datatypes.Stext(name="email", title="Google Email")
    userInfo = datatypes.JitDict(name="userInfo", title="User information dictionary")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
    updateTime = datatypes.Datetime(name="updateTime", title="Update Time")
```

**字段说明**：
- `userInfo` 字段以字典形式存储Google返回的完整用户信息，包括：
  - `id`: Google用户ID
  - `email`: 邮箱地址
  - `name`: 显示名称
  - `picture`: 头像URL
  - `locale`: 语言区域
  - `verified_email`: 邮箱验证状态
  - 等其他Google API返回的字段

### 前端集成 {#frontend-integration}
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
        // 第一步：通过认证元素获取登录码
        const authElement = app.getElement("auths.loginTypes.testGoogleLogin");
        const loginResult = await authElement.getLoginCode(code);
        
        // 第二步：使用AuthSvc完成最终登录
        const authSvc = app.getElement("auths.loginTypes.services.AuthSvc");
        const finalResult = await authSvc.loginByCode(
            loginResult.loginCode,
            "target_corp_name",
            "web"
        );
        
        if (finalResult.success) {
            // 登录成功，跳转到主页
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('登录失败:', error);
    }
};
```

### 权限配置 {#permission-configuration}
在Google Cloud Console中配置应用权限：

```text title="所需API权限"
Google API 权限:
- openid (OAuth范围) - 访问OpenID Connect用户标识符
- profile (OAuth范围) - 访问用户基本资料信息
- email (OAuth范围) - 访问用户邮箱地址
- https://www.googleapis.com/auth/userinfo.profile - 访问用户资料信息
- https://www.googleapis.com/auth/userinfo.email - 访问用户邮箱信息
```
