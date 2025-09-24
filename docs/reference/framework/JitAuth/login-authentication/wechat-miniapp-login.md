---
slug: wechat-miniapp-login
---
# WeChat Mini Program Login
WeChat Mini Program login is an authentication method based on WeChat official authorization mechanism, responsible for Mini Program authorization login, user identity authentication, and account binding management. It supports automatic acquisition of WeChat user identifiers like openId/unionId, binding code mechanism for new user registration, Session key security management, and account binding/unbinding operations, with deep integration into the WeChat Mini Program ecosystem.

The hierarchical structure of WeChat Mini Program login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.WeChatMiniType) → Instance. Developers can quickly create WeChat Mini Program login instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.WeChatMiniType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
myWeChatMiniLogin/                    # Instance element name
├── e.json                           # Element declaration file
└── myWeChatMiniLogin.json           # Business configuration file
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "auths.loginTypes.WeChatMiniType",
  "title": "WeChat Mini Program Login",
  "allowRegister": 1,
  "backendBundleEntry": ".",
  "frontBundleEntry": "./myWeChatMiniLogin.json"
}
```

#### Business Configuration File
```json title="WeChat Mini Program Authentication Configuration"
{
  "authConfig": {
    "appId": "your_mini_program_app_id",
    "appSecret": "your_mini_program_app_secret"
  }
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get instance
wechat_auth = app.getElement("auths.loginTypes.myWeChatMiniLogin")

# Mini Program login
result = wechat_auth.getLoginCode("wx_code_from_miniprogram")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| type | Stext | str | Yes | Fixed value: auths.loginTypes.WeChatMiniType |
| title | Stext | str | Yes | Login method display name |
| allowRegister | Numeric | int | No | Whether to allow new user registration, 1: allow, 0: not allow, default 0 |
| backendBundleEntry | Stext | str | Yes | Fixed value: "." |
| frontBundleEntry | Stext | str | Yes | Business configuration file path |

### Business Configuration File
| Configuration Item | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| authConfig.appId | Stext | str | Yes | WeChat Mini Program AppID |
| authConfig.appSecret | Stext | str | Yes | WeChat Mini Program AppSecret |

## Methods
### getLoginCode
Handle WeChat Mini Program authorization login, return different results based on user registration status.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| code | Stext | str | Yes | Temporary authorization code obtained from WeChat Mini Program wx.login() |

#### Return Value
- Registered user: `JitDict` type, containing loginCode and corpList
- Unregistered user (allowRegister=1): `JitDict` type, containing bindCode (valid for 5 minutes)

#### Usage Example
```python title="Login Authorization Handling"
result = wechat_auth.getLoginCode("wx_mini_code")

if "loginCode" in result:
    # Registered user
    login_code = result["loginCode"]
elif "bindCode" in result:
    # New user, needs registration
    bind_code = result["bindCode"]
```

### register
Complete new user registration process using binding code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| bindCode | Stext | str | Yes | Binding code returned by getLoginCode |

#### Return Value
- `RowData` type: Newly created user object

#### Usage Example
```python title="New User Registration"
user = wechat_auth.register("bind_code_from_getLoginCode")
print(f"User registration successful: {user.userId.value}")
```

### bind
Bind existing user account with WeChat Mini Program.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| userId | Numeric | int | Yes | User ID to bind |
| code | Stext | str | Yes | WeChat Mini Program authorization code |

#### Return Value
- `JitDict` type: Operation result dictionary

#### Usage Example
```python title="Account Binding"
result = wechat_auth.bind(123, "wx_mini_code")
```

### unbind
Unbind user account from WeChat Mini Program.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| userId | Numeric | int | Yes | User ID to unbind |

#### Return Value
- `JitDict` type: Operation result dictionary

#### Usage Example
```python title="Account Unbinding"
result = wechat_auth.unbind(123)
```

## Properties
### allowRegister
- **Type**: Numeric (int)
- **Description**: Controls whether to allow new user registration, 1: allow, 0: not allow

### authConfig
- **Type**: JitDict (dict)
- **Description**: WeChat Mini Program authentication configuration, containing appId and appSecret

## Advanced Features
### Complete Registration Process
When allowRegister=1, new users can complete registration through binding code mechanism, which includes authorization check, binding code generation, and user creation steps.

```python title="Complete New User Registration Process"
wechat_auth = app.getElement("auths.loginTypes.myWeChatMiniLogin")

# Try login to get binding code
login_result = wechat_auth.getLoginCode("wx_mini_code")

if "bindCode" in login_result:
    # Complete registration using binding code
    bind_code = login_result["bindCode"]
    new_user = wechat_auth.register(bind_code)
    print(f"Registration successful, User ID: {new_user.userId.value}")
```

### Account Binding Management
Supports binding and unbinding WeChat Mini Program with existing user accounts, facilitating user account system integration.

```python title="Account Binding Management"
# Bind existing account
bind_result = wechat_auth.bind(user_id, "wx_mini_code")

# Unbind account when needed
unbind_result = wechat_auth.unbind(user_id)
```