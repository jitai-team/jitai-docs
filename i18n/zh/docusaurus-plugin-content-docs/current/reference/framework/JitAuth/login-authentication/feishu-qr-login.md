---
slug: feishu-qr-login
description: "飞书自建扫码登录 API 参考文档。完整的规格说明、方法和示例。"
---
# 飞书自建扫码登录
飞书自建扫码登录是基于飞书自建应用的登录认证元素，支持PC端二维码扫码登录和飞书工作台内免密登录。它负责处理飞书OAuth授权流程、用户身份验证和账号绑定，同时支持与飞书组织架构的无缝集成和用户信息同步。

飞书自建扫码登录元素分层结构为Meta（auths.loginTypes.Meta） → Type（auths.loginTypes.FSInnerType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建飞书自建扫码登录实例元素。

**支持的登录方式**：
- PC端二维码扫码登录 - 显示飞书登录二维码，用户使用飞书App扫码完成登录
- 飞书工作台内登录 - 在飞书工作台内直接调用JSAPI获取免登授权码完成登录

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的auths.loginTypes.FSInnerType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
auths/loginTypes/FSInnerExample/
├── e.json                    # 元素声明文件
└── FSInnerExample.json       # 飞书配置文件
```

#### e.json文件
```json title="元素声明文件"
{
  "title": "飞书自建扫码登录示例",
  "type": "auths.loginTypes.FSInnerType"
}
```

#### 飞书配置文件
飞书配置文件名需与实例元素名称保持一致，如 `FSInnerExample.json`：

```json title="飞书配置文件"
{
  "appId": "你的飞书应用ID",
  "appSecret": "你的飞书应用Secret"
}
```

#### 调用示例
```python title="基本调用示例"
# 获取登录实例
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")

# 获取登录配置
login_config = feishu_auth.getLoginConfig()

# 根据授权码获取用户信息
auth_code = "从前端获取的授权码"
user_info = feishu_auth.getLoginCode(authCode=auth_code)
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值：auths.loginTypes.FSInnerType |

### 业务配置文件配置
配置文件名格式为`{实例名称}.json`，包含飞书应用的认证信息：

| 配置项 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| appId | string | 是 | 飞书应用ID |
| appSecret | string | 是 | 飞书应用Secret |

## 方法 
### getLoginConfig
获取飞书登录配置信息，用于前端展示登录二维码。

#### 参数详解
该方法无需参数。

#### 返回值
返回包含登录配置的字典，包含appId和随机state值。

#### 使用示例
```python title="获取登录配置示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
config = feishu_auth.getLoginConfig()
print(f"应用ID: {config['appId']}")
```

### getLoginCode
根据飞书授权码获取用户登录信息，完成用户身份认证。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| authCode | Stext | str | 是 | 飞书授权码，从前端扫码后获取 |
| state | Stext | str | 否 | 状态参数，用于防止CSRF攻击 |

#### 返回值
返回用户登录信息字典，包含userId、name、mobile、email、avatar、department、position、gender、status、isLeader等字段。

#### 使用示例
```python title="用户登录认证示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")

# 处理授权码获取用户信息
try:
    user_info = feishu_auth.getLoginCode(authCode="authorization_code_from_frontend")
    print(f"用户登录成功: {user_info['name']}")
    print(f"用户部门: {user_info['department']}")
except Exception as e:
    print(f"登录失败: {e}")
```

### getUserInfo
根据用户ID获取详细的用户信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| userId | Stext | str | 是 | 飞书用户ID |

#### 返回值
返回详细用户信息字典，包含用户基本信息、部门信息、职位信息等。

#### 使用示例
```python title="获取用户详细信息示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
user_detail = feishu_auth.getUserInfo(userId="zhangsan")
```

### getAccessToken
获取飞书访问令牌，用于调用飞书API。

#### 参数详解
该方法无需参数。

#### 返回值
返回访问令牌字符串。

#### 使用示例
```python title="获取访问令牌示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
access_token = feishu_auth.getAccessToken()
```

### syncUserInfo
同步飞书用户信息到本地系统。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| userId | Stext | str | 是 | 飞书用户ID |
| forceUpdate | Checkbox | bool | 否 | 是否强制更新，默认False |

#### 返回值
该方法无返回值。

#### 使用示例
```python title="同步用户信息示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
feishu_auth.syncUserInfo(userId="zhangsan", forceUpdate=True)
```

### syncDepartmentInfo
同步飞书部门信息到本地系统。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|-----|---|----|---|---|
| deptId | Stext | str | 否 | 部门ID，不传则同步所有部门 |

#### 返回值
该方法无返回值。

#### 使用示例
```python title="同步部门信息示例"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
feishu_auth.syncDepartmentInfo()  # 同步所有部门
feishu_auth.syncDepartmentInfo(deptId="2")  # 同步指定部门
```

## 属性
### FSInnerAuthModel
飞书自建登录的数据模型，用于存储飞书相关的认证信息。主要字段包括id主键、userId飞书用户ID、name用户姓名、mobile手机号、email邮箱地址、avatar头像URL、department部门信息、position职位、gender性别、status在职状态、isLeader是否为部门负责人、accessToken访问令牌、refreshToken刷新令牌、expiresAt令牌过期时间、createdAt创建时间、updatedAt更新时间等。

## 高级特性
### 前端扫码登录集成
前端可通过获取登录配置构建飞书登录URL，展示二维码或跳转链接，在重定向页面处理授权码完成登录流程。

```javascript title="前端登录流程示例"
// 获取飞书登录配置
const config = await api.getLoginConfig('auths.loginTypes.FSInnerExample');

// 构建飞书登录URL
const loginUrl = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${config.appId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&state=${config.state}`;

// 处理授权回调
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code');
if (authCode) {
    const userInfo = await api.loginWithCode('auths.loginTypes.FSInnerExample', {
        authCode: authCode,
        state: urlParams.get('state')
    });
}
```

### 错误处理
常见错误码包括40013（不合法的appId）、40014（不合法的access_token）、42001（access_token超时）、40029（不合法的oauth_code）、60020（不合法的应用ID）。

```python title="错误处理示例"
from jit.errcode import Code

try:
    user_info = feishu_auth.getLoginCode(authCode=auth_code)
except Exception as e:
    if "40013" in str(e):
        raise Code(40013, "应用ID不正确，请检查配置")
    elif "40029" in str(e):
        raise Code(40029, "授权码无效或已过期")
    else:
        raise Code(50000, f"登录失败: {str(e)}")
```
