---
slug: github-login
description: "GitHub 登录 API 参考文档。完整的规格说明、方法和示例。"
---
# GitHub 登录
GitHub 登录（GitHubType）是基于 GitHub 开放平台的登录认证元素，支持PC端和移动端的OAuth授权登录。它负责处理GitHub OAuth授权流程、用户身份验证和账号绑定，特别适用于开发者社区、技术类产品、开源项目管理等需要统一身份管理的场景。

GitHub 登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.GitHubType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建GitHub登录实例元素。

**支持的登录方式**：
- PC端OAuth授权登录 - 跳转到GitHub登录页面完成OAuth授权登录
- 移动端OAuth授权登录 - 在移动设备上调用GitHub OAuth服务完成授权登录
- GitHub Enterprise集成 - 支持GitHub Enterprise Server登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的auths.loginTypes.GitHubType元素，以实现自己的封装。

## 快速开始 {#quick-start}
### 创建实例元素 {#creating-instance-elements}
#### 目录结构 {#directory-structure}
```text title="推荐目录结构"
your_app/
└── auths/
    └── loginTypes/
        └── testGitHubLogin/           # 自定义实例名称
            ├── e.json                # 元素定义文件
            └── testGitHubLogin.json   # GitHub应用配置文件
```

#### e.json文件 {#e-json-file}
```json title="元素定义文件"
{
  "title": "GitHub登录",
  "type": "auths.loginTypes.GitHubType"
}
```

#### 业务配置文件 {#business-configuration-file}
```json title="testGitHubLogin.json - GitHub应用配置"
{
  "authConfig": {
    "clientId": "Ov23xxxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### 调用示例 {#usage-example}
```python title="获取和使用认证元素"
# 获取认证元素实例
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")

# 获取登录配置（用于前端生成OAuth链接）
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# 获取GitHub客户端
client = auth_element.getClient()

# 通过认证元素进行OAuth登录
result = auth_element.getLoginCode(code="authorization_code_from_github")
```

## 元素配置 {#element-configuration}
### e.json配置 {#e-json-configuration}
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.GitHubType |

### 业务配置文件配置 {#business-configuration-file-setup}
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

## 方法 {#methods}
### getLoginConfig {#getloginconfig}
获取登录配置信息，主要用于前端生成OAuth授权链接。

#### 返回值 {#getloginconfig-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含clientId和其他配置的字典 |

#### 使用示例 {#getloginconfig-usage-example}
```python title="获取登录配置"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
config = auth_element.getLoginConfig()
# 返回: {"clientId": "Ov23xxxxxxxxxxxxxxxx"}
```

### getClient {#getclient}
获取GitHub API客户端实例，用于调用GitHub相关接口。

#### 返回值 {#getclient-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| GitHubClient | object | GitHub客户端对象 |

#### 使用示例 {#getclient-usage-example}
```python title="获取GitHub客户端"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
client = auth_element.getClient()
# 可用于调用GitHub API
```

### getLoginCode {#getlogincode}
通过GitHub OAuth授权码获取登录码，这是认证元素的核心登录方法。

#### 参数详解 {#getlogincode-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| code | Stext | str | 是 | GitHub OAuth2授权码 |

#### 返回值 {#getlogincode-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | 包含loginCode和corpList的登录结果 |

#### 使用示例 {#getlogincode-usage-example}
```python title="OAuth登录"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
result = auth_element.getLoginCode(code="auth_code_from_github")
# 返回: {"loginCode": "...", "corpList": [...]}
```

### getUserInfoByCode {#getuserinfobycode}
通过GitHub OAuth授权码获取用户信息。

#### 参数详解 {#getuserinfobycode-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| code | Stext | str | 是 | GitHub OAuth2授权码 |

#### 返回值 {#getuserinfobycode-return-value}
| 类型 | 对应原生类型 | 说明 |
|-----|-------------|------|
| JitDict | dict | GitHub用户信息字典 |

#### 使用示例 {#getuserinfobycode-usage-example}
```python title="获取用户信息"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code_from_github")
# 返回GitHub用户信息，包含email、name、avatar_url等字段
```

### bind {#bind}
绑定GitHub用户到现有用户账号。

#### 参数详解 {#bind-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |
| userInfo | JitDict | dict | 是 | GitHub用户信息 |

#### 使用示例 {#bind-usage-example}
```python title="绑定GitHub账号"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code")
auth_element.bind(userId="user_id", userInfo=user_info)
```

### unbind {#unbind}
解绑GitHub用户。

#### 参数详解 {#unbind-parameter-details}
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-------|------|-------------|------|------|
| userId | Stext | str | 是 | 用户ID |

#### 使用示例 {#unbind-usage-example}
```python title="解绑GitHub账号"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
auth_element.unbind(userId="user_id")
```

## 属性 {#properties}
### authConfig {#authconfig}
GitHub应用配置信息，包含clientId、clientSecret等参数。

| 属性 | 类型 | 说明 |
|------|------|------|
| clientId | str | GitHub OAuth App 客户端ID |
| clientSecret | str | GitHub OAuth App 客户端密钥 |

### authType {#authtype}
认证类型标识，固定值为GitHub登录的类型枚举。

### authModelElemName {#authmodelelemname}
关联的认证数据模型元素名称，指向GitHubAuthModel。

## 高级特性 {#advanced-features}
### 数据模型扩展 {#data-model-extension}
GitHubAuthModel存储GitHub用户认证信息，使用简化的字段结构：

```python title="认证数据模型字段"
class GitHubAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="UserID")
    email = datatypes.Stext(name="email", title="GitHub email")
    userInfo = datatypes.JitDict(name="userInfo", title="User information dictionary")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
    updateTime = datatypes.Datetime(name="updateTime", title="Update Time")
```

**字段说明**：
- `userInfo` 字段以字典形式存储GitHub返回的完整用户信息，包括：
  - `id`: GitHub用户ID
  - `login`: GitHub用户名
  - `name`: 显示名称
  - `avatar_url`: 头像URL
  - `company`: 公司
  - `location`: 位置
  - `bio`: 个人简介
  - 等其他GitHub API返回的字段

### 前端集成 {#frontend-integration}
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
        // 第一步：通过认证元素获取登录码
        const authElement = app.getElement("auths.loginTypes.testGitHubLogin");
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
