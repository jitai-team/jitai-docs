---
slug: wechat-official-login
title: "WeChat Official Account Login Reference"
description: "WeChat Official Account Login Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "WeChat Official Account Login"
---
# WeChat Official Account Login
WeChat Official Account login is an authentication login method for the WeChat Official Account ecosystem, implementing user identity authentication and login based on OAuth2.0 web authorization mechanism. It handles WeChat Official Account user identity recognition, authorization information acquisition, and login status management, supporting both silent authorization and user information authorization modes, providing complete frontend-backend integration solutions.

The hierarchical structure of WeChat Official Account login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.WechatPublicType) → Instance. Developers can quickly create WeChat Official Account login instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.WechatPublicType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/loginTypes/MyWechatLogin/
├── e.json
└── MyWechatLogin.json
```

#### e.json File
```json title="Element Definition File"
{
  "title": "WeChat Official Account Login",
  "type": "auths.loginTypes.WechatPublicType"
}
```

#### Business Configuration File
```json title="MyWechatLogin.json"
{
  "appId": "wx1234567890abcdef",
  "appSecret": "your_app_secret_here",
  "scope": "snsapi_userinfo",
  "state": "custom_state_value"
}
```

#### Usage Example
```python title="Backend Usage Example"
# Get login service
auth_service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')

# Handle authorization callback
user_info = auth_service.getUserInfo(code)
if user_info:
    # Handle user login logic
    openid = user_info.get('openid')
    nickname = user_info.get('nickname')
```

```typescript title="Frontend Usage Example"
// Frontend initiate login
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
authElement.login('https://your-domain.com/callback');
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| title | Stext | str | Yes | Element title |
| type | Stext | str | Yes | Fixed value: auths.loginTypes.WechatPublicType |

### Business Configuration File
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| appId | Stext | str | Yes | WeChat Official Account AppID |
| appSecret | Stext | str | Yes | WeChat Official Account AppSecret |
| scope | Stext | str | No | Authorization scope, default snsapi_userinfo |
| state | Stext | str | No | State parameter for CSRF protection |

**Authorization Scope Description:**
- `snsapi_base`: Silent authorization, only get openid
- `snsapi_userinfo`: User information authorization, get complete user information

## Methods
### getUserInfo
Get WeChat user information

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| code | Stext | str | Yes | WeChat authorization callback code |

#### Return Value
```python title="Return User Information"
{
    "openid": "User unique identifier",
    "nickname": "User nickname", 
    "headimgurl": "Avatar URL",
    "sex": 1,  # 1-male 2-female 0-unknown
    "province": "Province",
    "city": "City",
    "country": "Country",
    "unionid": "Open platform unique identifier"
}
```

#### Usage Example
```python title="Get User Information"
service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
user_info = service.getUserInfo("WeChat callback code")

if user_info:
    openid = user_info['openid']
    nickname = user_info['nickname']
    # Handle user information
```

### getAccessToken
Get WeChat access token

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| code | Stext | str | Yes | WeChat authorization callback code |

#### Return Value
```python title="Return Access Token"
{
    "access_token": "Access token",
    "expires_in": 7200,
    "refresh_token": "Refresh token", 
    "openid": "User unique identifier",
    "scope": "Authorization scope"
}
```

#### Usage Example
```python title="Get Access Token"
service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
token_info = service.getAccessToken("WeChat callback code")

if token_info:
    access_token = token_info['access_token']
    expires_in = token_info['expires_in']
```

### login
Frontend initiate WeChat login

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| redirectUrl | Stext | str | Yes | Callback URL after successful authorization |

#### Usage Example
```typescript title="Frontend Initiate Login"
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
authElement.login('https://your-domain.com/wechat/callback');
```

### isWechatBrowser
Detect if in WeChat browser environment

#### Return Value
Returns boolean value, true indicates in WeChat environment

#### Usage Example
```typescript title="Environment Detection"
const authElement = app.getElement('auths.loginTypes.MyWechatLogin');
const isWechat = authElement.isWechatBrowser();

if (!isWechat) {
    alert('Please open in WeChat');
}
```

## Properties
### WechatPublicAuthModel
WeChat Official Account authentication data model, used to store user authentication information

| Field Name | Type | Description |
|--------|------|------|
| id | AutoInt | Primary key ID |
| openid | Stext | WeChat user unique identifier |
| unionid | Stext | WeChat open platform unified identifier |
| nickname | Stext | User nickname |
| headimgurl | Stext | User avatar URL |
| sex | Numeric | User gender (0-unknown, 1-male, 2-female) |
| province | Stext | User's province |
| city | Stext | User's city |
| country | Stext | User's country |
| accessToken | Stext | WeChat access token |
| refreshToken | Stext | WeChat refresh token |
| expiresIn | Numeric | Token expiration time (seconds) |
| createdAt | Datetime | Creation time |
| updatedAt | Datetime | Update time |

## Advanced Features
### Authorization Scope Configuration
Choose appropriate authorization scope based on business requirements:

```json title="Silent Authorization Configuration"
{
    "appId": "your_app_id",
    "appSecret": "your_app_secret", 
    "scope": "snsapi_base",
    "state": "silent_auth"
}
```

```json title="User Information Authorization Configuration"
{
    "appId": "your_app_id",
    "appSecret": "your_app_secret",
    "scope": "snsapi_userinfo", 
    "state": "user_info_auth"
}
```

### Security Configuration
**Domain Whitelist Setup:**
Must configure authorization callback domain in WeChat Official Account platform backend, ensure callback URL domain exactly matches configuration.

**State Parameter Protection:**
```python title="State Parameter Verification"
def verify_state(received_state, expected_state):
    return received_state == expected_state

# Verify in callback handling
if not verify_state(request.args.get('state'), 'expected_state'):
    return {"error": "Invalid state parameter"}
```

### Token Refresh Mechanism
```python title="Automatic Token Refresh"
def refresh_access_token(refresh_token):
    service = app.getElement('auths.loginTypes.MyWechatLogin.services.WechatPublicAuthSvc')
    # Implement token refresh logic
    new_token = service.refreshToken(refresh_token)
    return new_token
```

### Error Handling
```python title="Error Handling Example"
try:
    user_info = service.getUserInfo(code)
    if not user_info:
        return {"error": "Failed to get user info"}
except Exception as e:
    return {"error": f"Auth error: {str(e)}"}
```

**Common Errors and Solutions:**

1. **redirect_uri parameter error**: Check WeChat backend domain configuration
2. **invalid code**: Code can only be used once, reacquire
3. **access_token expired**: Use refresh_token to refresh
4. **Non-WeChat environment**: Guide users to open in WeChat or provide QR code