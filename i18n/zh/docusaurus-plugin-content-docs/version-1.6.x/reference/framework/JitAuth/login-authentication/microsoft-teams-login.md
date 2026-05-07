---
slug: microsoft-teams-login
description: "Microsoft Teams 登录 API 参考文档。完整的规格说明、方法和示例。"
---
# Microsoft Teams 登录
Microsoft Teams 登录（MicrosoftTeamsType）是基于 Microsoft Teams 应用的登录认证元素，支持PC端和移动端的OAuth授权登录。它负责处理Microsoft Teams OAuth授权流程、用户身份验证和账号绑定，同时支持与Microsoft Teams企业组织架构的无缝集成和用户信息同步。

Microsoft Teams 登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.MicrosoftTeamsType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建Microsoft Teams登录实例元素。

**支持的登录方式**：
- PC端OAuth授权登录 - 跳转到Microsoft Teams登录页面完成OAuth授权登录
- 移动端OAuth授权登录 - 在移动设备上调用Microsoft Teams应用完成授权登录
- 企业内部单点登录 - 与Azure Active Directory集成的单点登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的auths.loginTypes.MicrosoftTeamsType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testTeamsLogin/           # 自定义实例名称
            ├── e.json                # 元素定义文件
            └── testTeamsLogin.json   # Microsoft Teams应用配置文件
```

#### e.json文件
```json title="元素定义文件"
{
  "title": "Microsoft Teams登录",
  "type": "auths.loginTypes.MicrosoftTeamsType"
}
```

#### 业务配置文件
```json title="testTeamsLogin.json - Microsoft Teams应用配置"
{
  "authConfig": {
    "corpId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")

# 获取登录配置（用于前端生成OAuth链接）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# 获取Microsoft Teams客户端
client = auth_element.getClient()

# 通过服务获取认证元素
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
auth = auth_svc.getAuthByCorpId("your_corp_id")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.MicrosoftTeamsType |
### 业务配置文件配置
配置文件名格式为`{实例名称}.json`，包含Microsoft Teams应用的认证信息：

| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| authConfig.corpId | string | 是 | Azure租户ID，格式为UUID |
| authConfig.clientId | string | 是 | Azure应用程序客户端ID，格式为UUID |
| authConfig.clientSecret | string | 是 | Azure应用程序客户端密钥 |

**配置获取方式**：
1. 登录Azure管理门户（https://portal.azure.com/）
2. 进入"Azure Active Directory" → "应用注册"
3. 创建新的应用注册或选择现有应用
4. 在应用详情页获取应用程序（客户端）ID
5. 在"证书和密码"中创建客户端密码
6. 在目录概述中获取租户ID

## 方法 
### getLoginConfig
获取登录配置信息，主要用于前端生成OAuth授权链接。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含clientId和其他配置的字典 |

#### 使用示例
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")
config = auth_element.getLoginConfig()
# 返回: {"clientId": "12345678-1234-1234-1234-123456789012"}
```

### getClient
获取Microsoft Graph API客户端实例，用于调用Microsoft Teams相关接口。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| MicrosoftTeamsClient | object | Microsoft Teams客户端对象 |

#### 使用示例
```python title="获取Microsoft Teams客户端"
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")
client = auth_element.getClient()
# 可用于调用Microsoft Graph API
```

### loginByOAuth (服务方法)
Microsoft Teams OAuth登录，通过授权码完成用户登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| corpId | Stext | str | 是 | Azure租户ID |
| authCode | Stext | str | 是 | OAuth授权码 |
| platform | Stext | str | 是 | 登录平台：web/mobile |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 登录结果信息 |

#### 使用示例
```python title="OAuth登录"
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
result = auth_svc.loginByOAuth(
    corpId="12345678-1234-1234-1234-123456789012",
    authCode="auth_code_from_microsoft",
    platform="web"
)
```

### getAuthByCorpId (服务方法)
通过Azure租户ID获取对应的认证元素实例。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| corpId | Stext | str | 是 | Azure租户ID |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| Element | object | 认证元素实例，未找到时返回None |

#### 使用示例
```python title="通过租户ID获取认证元素"
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
auth_element = auth_svc.getAuthByCorpId("12345678-1234-1234-1234-123456789012")
if auth_element:
    print(f"找到认证元素: {auth_element.fullName}")
```

## 属性
### authConfig
Microsoft Teams应用配置信息，包含corpId、clientId、clientSecret等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| corpId | str | Azure租户ID |
| clientId | str | Azure应用程序客户端ID |
| clientSecret | str | Azure应用程序客户端密钥 |

### authType
认证类型标识，固定值为Microsoft Teams登录的类型枚举。

### authModelElemName
关联的认证数据模型元素名称，指向MicrosoftTeamsAuthModel。

## 高级特性
### 数据模型扩展
MicrosoftTeamsAuthModel存储Microsoft Teams用户认证信息，包含用户ID映射、Teams用户信息等字段：

```python title="认证数据模型字段"
class MicrosoftTeamsAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="主键ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="用户ID")
    thirdCorpId = datatypes.Stext(name="thirdCorpId", title="Azure租户ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="Microsoft用户ID")
    objectId = datatypes.Stext(name="objectId", title="Azure AD对象ID")
    userPrincipalName = datatypes.Stext(name="userPrincipalName", title="用户主体名称")
    displayName = datatypes.Stext(name="displayName", title="显示名称")
    mail = datatypes.Stext(name="mail", title="邮箱")
    jobTitle = datatypes.Stext(name="jobTitle", title="职务")
    department = datatypes.Stext(name="department", title="部门")
    photo = datatypes.Stext(name="photo", title="头像")
    createTime = datatypes.Datetime(name="createTime", title="创建时间")
```

### 前端集成
前端需要实现OAuth授权流程：

```typescript title="前端登录实现"
// PC端OAuth登录
const loginWithTeams = async () => {
    const config = await getLoginConfig(); // 获取配置
    const authUrl = `https://login.microsoftonline.com/${config.corpId}/oauth2/v2.0/authorize?` +
        `client_id=${config.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid profile User.Read&` +
        `state=${generateState()}`;
    
    // 跳转到Microsoft登录页面
    window.location.href = authUrl;
};

// 处理OAuth回调
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        const result = await authSvc.loginByOAuth({
            corpId: config.corpId,
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
在Azure管理后台配置应用权限：

```text title="所需API权限"
Microsoft Graph API 权限:
- User.Read (委托权限) - 读取用户基本信息
- User.ReadBasic.All (委托权限) - 读取所有用户基本信息  
- Directory.Read.All (应用程序权限) - 读取目录数据
- Group.Read.All (应用程序权限) - 读取所有组信息
```
