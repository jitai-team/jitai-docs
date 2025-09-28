---
slug: github-login
---
# GitHub 登录 {#github-login}
GitHub 登录（GitHubType）是基于 GitHub 开放平台的登录认证元素，支持PC端和移动端的OAuth授权登录。它负责处理GitHub OAuth授权流程、用户身份验证和账号绑定，特别适用于开发者社区、技术类产品、开源项目管理等需要统一身份管理的场景。

GitHub 登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.GitHubType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建GitHub登录实例元素。

**支持的登录方式**：
- PC端OAuth授权登录 - 跳转到GitHub登录页面完成OAuth授权登录
- 移动端OAuth授权登录 - 在移动设备上调用GitHub OAuth服务完成授权登录
- GitHub Enterprise集成 - 支持GitHub Enterprise Server登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的auths.loginTypes.GitHubType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testGitHubLogin/           # 自定义实例名称
            ├── e.json                # 元素定义文件
            └── testGitHubLogin.json   # GitHub应用配置文件
```

#### e.json文件
```json title="元素定义文件"
{
  "title": "GitHub登录",
  "type": "auths.loginTypes.GitHubType"
}
```

#### 业务配置文件
```json title="testGitHubLogin.json - GitHub应用配置"
{
  "authConfig": {
    "clientId": "Ov23xxxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")

# 获取登录配置（用于前端生成OAuth链接）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# 获取GitHub客户端
client = auth_element.getClient()

# 通过服务获取认证元素
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
auth = auth_svc.getAuthByClientId("your_client_id")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.GitHubType |

### 业务配置文件配置
配置文件名格式为`{实例名称}.json`，包含GitHub应用的认证信息：

| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| authConfig.clientId | string | 是 | GitHub OAuth App 客户端ID |
| authConfig.clientSecret | string | 是 | GitHub OAuth App 客户端密钥 |

**配置获取方式**：
1. 登录GitHub（https://github.com/）
2. 进入"Settings" → "Developer settings" → "OAuth Apps"
3. 创建新的OAuth App或选择现有应用
4. 在应用详情页获取Client ID和Client Secret
5. 为应用配置Authorization callback URL

## 方法 
### getLoginConfig
获取登录配置信息，主要用于前端生成OAuth授权链接。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含clientId和其他配置的字典 |

#### 使用示例
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
config = auth_element.getLoginConfig()
# 返回: {"clientId": "Ov23xxxxxxxxxxxxxxxx"}
```

### getClient
获取GitHub API客户端实例，用于调用GitHub相关接口。

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| GitHubClient | object | GitHub客户端对象 |

#### 使用示例
```python title="获取GitHub客户端"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
client = auth_element.getClient()
# 可用于调用GitHub API
```

### loginByOAuth (服务方法)
GitHub OAuth登录，通过授权码完成用户登录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| clientId | Stext | str | 是 | GitHub OAuth App 客户端ID |
| authCode | Stext | str | 是 | OAuth授权码 |
| platform | Stext | str | 是 | 登录平台：web/mobile |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 登录结果信息 |

#### 使用示例
```python title="OAuth登录"
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
result = auth_svc.loginByOAuth(
    clientId="Ov23xxxxxxxxxxxxxxxx",
    authCode="auth_code_from_github",
    platform="web"
)
```

### getAuthByClientId (服务方法)
通过GitHub客户端ID获取对应的认证元素实例。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| clientId | Stext | str | 是 | GitHub OAuth App 客户端ID |

#### 返回值
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| Element | object | 认证元素实例，未找到时返回None |

#### 使用示例
```python title="通过客户端ID获取认证元素"
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
auth_element = auth_svc.getAuthByClientId("Ov23xxxxxxxxxxxxxxxx")
if auth_element:
    print(f"找到认证元素: {auth_element.fullName}")
```


## 属性
### authConfig
GitHub应用配置信息，包含clientId、clientSecret等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| clientId | str | GitHub OAuth App 客户端ID |
| clientSecret | str | GitHub OAuth App 客户端密钥 |

### authType
认证类型标识，固定值为GitHub登录的类型枚举。

### authModelElemName
关联的认证数据模型元素名称，指向GitHubAuthModel。

## 高级特性
### 数据模型扩展
GitHubAuthModel存储GitHub用户认证信息，包含用户ID映射、GitHub用户信息等字段：

```python title="认证数据模型字段"
class GitHubAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="主键ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="用户ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="GitHub用户ID")
    login = datatypes.Stext(name="login", title="GitHub用户名")
    name = datatypes.Stext(name="name", title="显示名称")
    email = datatypes.Stext(name="email", title="邮箱")
    avatarUrl = datatypes.Stext(name="avatarUrl", title="头像URL")
    company = datatypes.Stext(name="company", title="公司")
    location = datatypes.Stext(name="location", title="位置")
    bio = datatypes.Stext(name="bio", title="个人简介")
    createTime = datatypes.Datetime(name="createTime", title="创建时间")
```

### 前端集成
前端需要实现OAuth授权流程：

```typescript title="前端登录实现"
// PC端OAuth登录
const loginWithGitHub = async () => {
    const config = await getLoginConfig(); // 获取配置
    const authUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=user:email&` +
        `state=${generateState()}`;
    
    // 跳转到GitHub登录页面
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
在GitHub OAuth App中配置应用权限：

```text title="所需OAuth范围"
GitHub OAuth 范围:
- user (范围) - 访问用户资料信息
- user:email (范围) - 访问用户邮箱地址
- read:user (范围) - 读取用户资料信息
- user:follow (范围) - 访问关注/取关用户功能
- public_repo (范围) - 访问公共仓库（可选）
- repo (范围) - 访问所有仓库（可选）
```

### 错误处理
常见错误情况及处理方式：

```python title="错误处理示例"
try:
    auth_element = auth_svc.getAuthByClientId(clientId)
    if not auth_element:
        raise Exception("未找到对应的GitHub认证配置")
    
    result = auth_svc.loginByOAuth(clientId, authCode, platform)
    if not result.get('success'):
        raise Exception(result.get('message', '登录失败'))
        
except Exception as e:
    # 记录错误日志并返回友好提示
    logger.error(f"GitHub登录失败: {str(e)}")
    return {"success": False, "message": "登录失败，请重试"}
```

**常见错误类型**：
- 应用配置错误：检查clientId、clientSecret等配置
- 授权码过期：OAuth授权码有效期10分钟，需重新获取
- 权限不足：确保应用已获得必要的GitHub OAuth范围
- 网络连接问题：确保能访问GitHub API服务
- 重定向URI无效：确保重定向URI与GitHub OAuth App配置一致
- 频率限制：GitHub API有频率限制，需实现适当的重试机制
