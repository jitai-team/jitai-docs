---
slug: feishu-qr-login
description: "Feishu Self-built QR Code Login API reference documentation. Complete specifications, methods, and examples."
---
# Feishu Self-built QR Code Login
Feishu Self-built QR Code Login is a login authentication element based on Feishu self-built applications, supporting PC QR code scanning login and password-free login within the Feishu workspace. It handles Feishu OAuth authorization flow, user authentication, and account binding, while supporting seamless integration with Feishu organizational structure and user information synchronization.

The Feishu Self-built QR Code Login element hierarchy is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.FSInnerType) → Instance. Developers can quickly create Feishu Self-built QR Code Login instance elements through JitAI's visual development tools.

**Supported Login Methods**:
- PC QR Code Scanning Login - Display Feishu login QR code, users scan with Feishu App to complete login
- Feishu Workspace Login - Directly call JSAPI within Feishu workspace to get password-free authorization code to complete login

Of course, developers can also create their own Type elements, or override the official JitAI-provided auths.loginTypes.FSInnerType element in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/loginTypes/FSInnerExample/
├── e.json                    # Element declaration file
└── FSInnerExample.json       # Feishu configuration file
```

#### e.json File
```json title="Element Declaration File"
{
  "title": "Feishu Self-built QR Code Login Example",
  "type": "auths.loginTypes.FSInnerType"
}
```

#### Feishu Configuration File
The Feishu configuration file name must match the instance element name, such as `FSInnerExample.json`:

```json title="Feishu Configuration File"
{
  "appId": "your_feishu_app_id",
  "appSecret": "your_feishu_app_secret"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get login instance
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")

# Get login configuration
login_config = feishu_auth.getLoginConfig()

# Get user information based on authorization code
auth_code = "authorization_code_from_frontend"
user_info = feishu_auth.getLoginCode(authCode=auth_code)
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Required | Description |
|--------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.FSInnerType |

### Business Configuration File Configuration
The configuration file name format is `{instance_name}.json`, containing Feishu application authentication information:

| Configuration | Type | Required | Description |
|--------------|------|----------|-------------|
| appId | string | Yes | Feishu application ID |
| appSecret | string | Yes | Feishu application Secret |

## Methods 
### getLoginConfig
Get Feishu login configuration information for displaying login QR code on frontend.

#### Parameter Details
This method requires no parameters.

#### Return Value
Returns a dictionary containing login configuration, including appId and random state value.

#### Usage Example
```python title="Get Login Configuration Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
config = feishu_auth.getLoginConfig()
print(f"Application ID: {config['appId']}")
```

### getLoginCode
Get user login information based on Feishu authorization code to complete user authentication.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| authCode | Stext | str | Yes | Feishu authorization code, obtained after frontend QR code scanning |
| state | Stext | str | No | State parameter for preventing CSRF attacks |

#### Return Value
Returns a user login information dictionary containing fields such as userId, name, mobile, email, avatar, department, position, gender, status, isLeader, etc.

#### Usage Example
```python title="User Login Authentication Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")

# Handle authorization code to get user information
try:
    user_info = feishu_auth.getLoginCode(authCode="authorization_code_from_frontend")
    print(f"User login successful: {user_info['name']}")
    print(f"User department: {user_info['department']}")
except Exception as e:
    print(f"Login failed: {e}")
```

### getUserInfo
Get detailed user information based on user ID.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| userId | Stext | str | Yes | Feishu user ID |

#### Return Value
Returns a detailed user information dictionary containing user basic information, department information, position information, etc.

#### Usage Example
```python title="Get User Detailed Information Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
user_detail = feishu_auth.getUserInfo(userId="zhangsan")
```

### getAccessToken
Get Feishu access token for calling Feishu APIs.

#### Parameter Details
This method requires no parameters.

#### Return Value
Returns access token string.

#### Usage Example
```python title="Get Access Token Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
access_token = feishu_auth.getAccessToken()
```

### syncUserInfo
Sync Feishu user information to local system.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| userId | Stext | str | Yes | Feishu user ID |
| forceUpdate | Checkbox | bool | No | Whether to force update, default False |

#### Return Value
This method has no return value.

#### Usage Example
```python title="Sync User Information Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
feishu_auth.syncUserInfo(userId="zhangsan", forceUpdate=True)
```

### syncDepartmentInfo
Sync Feishu department information to local system.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| deptId | Stext | str | No | Department ID, sync all departments if not provided |

#### Return Value
This method has no return value.

#### Usage Example
```python title="Sync Department Information Example"
feishu_auth = app.getElement("auths.loginTypes.FSInnerExample")
feishu_auth.syncDepartmentInfo()  # Sync all departments
feishu_auth.syncDepartmentInfo(deptId="2")  # Sync specified department
```

## Properties
### FSInnerAuthModel
The data model for Feishu self-built login, used to store Feishu-related authentication information. Main fields include id primary key, userId Feishu user ID, name user name, mobile phone number, email email address, avatar avatar URL, department department information, position position, gender gender, status employment status, isLeader whether department leader, accessToken access token, refreshToken refresh token, expiresAt token expiration time, createdAt creation time, updatedAt update time, etc.

## Advanced Features
### Frontend QR Code Login Integration
Frontend can build Feishu login URL by getting login configuration, display QR code or redirect link, and handle authorization code on redirect page to complete login flow.

```javascript title="Frontend Login Flow Example"
// Get Feishu login configuration
const config = await api.getLoginConfig('auths.loginTypes.FSInnerExample');

// Build Feishu login URL
const loginUrl = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${config.appId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&state=${config.state}`;

// Handle authorization callback
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code');
if (authCode) {
    const userInfo = await api.loginWithCode('auths.loginTypes.FSInnerExample', {
        authCode: authCode,
        state: urlParams.get('state')
    });
}
```

### Error Handling
Common error codes include 40013 (invalid appId), 40014 (invalid access_token), 42001 (access_token timeout), 40029 (invalid oauth_code), 60020 (invalid application ID).

```python title="Error Handling Example"
from jit.errcode import Code

try:
    user_info = feishu_auth.getLoginCode(authCode=auth_code)
except Exception as e:
    if "40013" in str(e):
        raise Code(40013, "Application ID is incorrect, please check configuration")
    elif "40029" in str(e):
        raise Code(40029, "Authorization code is invalid or expired")
    else:
        raise Code(50000, f"Login failed: {str(e)}")
```
