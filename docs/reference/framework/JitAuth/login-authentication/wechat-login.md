---
slug: wechat-login
---
# WeChat Login
WeChat login is a third-party authentication method based on WeChat Open Platform OAuth2.0 protocol, implementing seamless integration with WeChat user system through QR code login and user information retrieval. It handles WeChat user identity authentication, account binding management, and login status maintenance, supporting frontend-backend separation architecture and complete user authentication flow.

The hierarchical structure of WeChat login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.WeChatType) → Instance. Developers can quickly create WeChat login instance elements through JitAi's visual development tools.

WeChat login is based on standard OAuth2.0 authentication flow. After users authorize through WeChat client QR code scanning, the system obtains access tokens and user identifiers, completing identity authentication and account association. It supports user binding, unbinding operations, and identity management in multi-application scenarios.

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.WeChatType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/
└── loginTypes/
    └── MyWeChatLogin/        # Instance element name, customizable
        ├── e.json            # Element definition file
        └── MyWeChatLogin.json # Business configuration file, filename matches instance element name
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "auths.loginTypes.WeChatType",
  "title": "WeChat Login",
  "appSecret": "Your WeChat application secret",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./MyWeChatLogin.json"
}
```

#### Business Configuration File
```json title="MyWeChatLogin.json Configuration Example"
{
  "authConfig": {
    "appId": "Your WeChat application ID",
    "appSecret": "Your WeChat application secret"
  }
}
```

#### Usage Example
```python title="Get WeChat Login Instance and Use"
# Get WeChat login instance
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")

# Get login configuration information
login_config = wechat_auth.getLoginConfig()

# Handle WeChat QR code callback, get login code
login_result = wechat_auth.getLoginCode("WeChat returned code")

# Bind user WeChat account
wechat_auth.bind("User ID", "WeChat returned code")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| type | Stext | str | Yes | Fixed value: auths.loginTypes.WeChatType |
| title | Stext | str | Yes | Login method display name |
| appSecret | Stext | str | Yes | WeChat application secret, used for server-side verification |
| backendBundleEntry | Stext | str | Yes | Backend entry, fixed value: "." |
| frontBundleEntry | Stext | str | Yes | Frontend configuration file path, usually "./config_filename.json" |

### Business Configuration File
| Configuration Item | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| authConfig.appId | Stext | str | Yes | WeChat Open Platform application ID |
| authConfig.appSecret | Stext | str | Yes | WeChat Open Platform application secret |

## Methods
### getLoginConfig
Get login configuration information for frontend login option display.

#### Parameter Details
No parameters

#### Return Value
| Field | Type | Corresponding Native Type | Description |
|------|------|-------------|------|
| isActive | Boolean | bool | Whether login method is enabled |
| authType | Stext | str | Authentication type identifier |
| authConfig.appId | Stext | str | WeChat application ID |

#### Usage Example
```python title="Get Login Configuration"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
config = wechat_auth.getLoginConfig()
print(config)
# Output: {"isActive": True, "authType": "WeChatType", "authConfig": {"appId": "wx123456"}}
```

### getLoginCode
Handle WeChat OAuth callback, get system login code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| code | Stext | str | Yes | Authorization code returned by WeChat OAuth callback |

#### Return Value
| Field | Type | Corresponding Native Type | Description |
|------|------|-------------|------|
| loginCode | Stext | str | System login code |
| corpList | JitList | list | List of organizations associated with user |

#### Usage Example
```python title="Handle WeChat Login Callback"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
try:
    result = wechat_auth.getLoginCode("001234567890abcdef")
    print(f"Login Code: {result['loginCode']}")
    print(f"Organization List: {result['corpList']}")
except Exception as e:
    print(f"Login failed: {e}")
```

### bind
Bind user WeChat account.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | System user ID |
| code | Stext | str | Yes | WeChat OAuth authorization code |

#### Return Value
| Field | Type | Corresponding Native Type | Description |
|------|------|-------------|------|
| success | Boolean | bool | Fixed return True, indicates operation success |
| message | Stext | str | Fixed return "Operation successful" |

#### Usage Example
```python title="Bind WeChat Account"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
try:
    result = wechat_auth.bind("user123", "001234567890abcdef")
    print("WeChat account bound successfully")
except Exception as e:
    print(f"Binding failed: {e}")
```

### unbind
Unbind user WeChat account.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | System user ID |

#### Return Value
| Field | Type | Corresponding Native Type | Description |
|------|------|-------------|------|
| success | Boolean | bool | Fixed return True, indicates operation success |
| message | Stext | str | Fixed return "Operation successful" |

#### Usage Example
```python title="Unbind WeChat Account"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
result = wechat_auth.unbind("user123")
print("WeChat account unbound successfully")
```

### getUserAuthInfo
Get user WeChat authentication information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| authObj | RowData | dict | Yes | WeChat authentication data object |

#### Return Value
| Field | Type | Corresponding Native Type | Description |
|------|------|-------------|------|
| isActive | Boolean | bool | Whether authentication is valid |

#### Usage Example
```python title="Get User Authentication Information"
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
# Get user data from authentication model
auth_model = app.getElement("auths.loginTypes.WeChatType.WeChatAuthModel")
auth_obj = auth_model.get(filter="Q(userId='user123')", orderList=[])

auth_info = wechat_auth.getUserAuthInfo(auth_obj)
print(f"Authentication Status: {auth_info['isActive']}")
```

## Properties
### authType
Authentication type identifier, fixed value is "WeChatType".

### authConfig
WeChat application configuration information, containing appId and appSecret.

### isActive
Login method enabled status, boolean type.

## Advanced Features
### Custom Authentication Model
WeChat login uses built-in WeChatAuthModel to store user authentication information, containing the following fields:

```python title="WeChatAuthModel Field Structure"
# WeChat authentication model fields
auth_model = app.getElement("auths.loginTypes.WeChatType.WeChatAuthModel")

# Main field descriptions
# id: Primary key ID (AutoInt)
# appId: WeChat application ID (Stext)
# userId: System user ID (Stext)
# openId: WeChat user openId (Stext)
# unionId: WeChat user unionId (Stext)
```

### Frontend Login Component Integration
WeChat login Type element provides complete frontend login components, supporting QR code login interface and status management:

```python title="Frontend Component Configuration Example"
# Get frontend login component configuration
wechat_auth = app.getElement("auths.loginTypes.MyWeChatLogin")
frontend_config = {
    "componentType": "WeChatLogin",
    "appId": wechat_auth.authConfig["appId"],
    "redirectUri": "https://yourdomain.com/auth/callback",
    "scope": "snsapi_login"
}

# Configuration when using login component in page
login_component_props = {
    "authType": "WeChatType", 
    "config": frontend_config,
    "onSuccess": "handleLoginSuccess",
    "onError": "handleLoginError"
}
```