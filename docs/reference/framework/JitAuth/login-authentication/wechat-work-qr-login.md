---
slug: wechat-work-qr-login
---
# WeChat Work Custom QR Code Login {#wechat-work-custom-qr-login}
WeChat Work custom QR code login is a login authentication element based on WeChat Work custom applications, supporting PC-side QR code scanning login and password-free login within WeChat Work workspace. It handles WeChat Work OAuth authorization flow, user identity authentication, and account binding, while supporting seamless integration with WeChat Work organizational architecture and user information synchronization.

The hierarchical structure of WeChat Work custom QR code login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.QywxInnerType) → Instance. Developers can quickly create WeChat Work custom QR code login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- PC-side QR code scanning login - Display WeChat Work login QR code, users scan with WeChat Work App to complete login
- WeChat Work workspace login - Directly call JSAPI within WeChat Work workspace to get password-free authorization code for login

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.QywxInnerType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/loginTypes/QywxInnerExample/
├── e.json                    # Element declaration file
└── QywxInnerExample.json     # WeChat Work configuration file
```

#### e.json File
```json title="Element Declaration File"
{
  "title": "WeChat Work Custom QR Code Login Example",
  "type": "auths.loginTypes.QywxInnerType"
}
```

#### WeChat Work Configuration File
WeChat Work configuration file name must match the instance element name, such as `QywxInnerExample.json`:

```json title="WeChat Work Configuration File"
{
  "corpId": "Your enterprise ID",
  "corpSecret": "Your application Secret",
  "agentId": "Your application AgentID",
  "redirectUri": "http://your-domain.com/api/auth/qywx/callback"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get login instance
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")

# Get login configuration
login_config = qywx_auth.getLoginConfig()

# Get user information based on authorization code
auth_code = "Authorization code obtained from frontend"
user_info = qywx_auth.getLoginCode(authCode=auth_code)
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|-------|------|------|------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.QywxInnerType |

### Business Configuration File
Configuration file name format is `{instance_name}.json`, containing WeChat Work application authentication information:

| Configuration Item | Type | Required | Description |
|-------|------|------|------|
| corpId | string | Yes | WeChat Work enterprise ID |
| corpSecret | string | Yes | WeChat Work application Secret |
| agentId | string | Yes | WeChat Work application AgentID |
| redirectUri | string | Yes | OAuth2 redirect URI for receiving authorization code |

## Methods
### getLoginConfig
Get WeChat Work login configuration information for frontend QR code display.

#### Parameter Details
This method requires no parameters.

#### Return Value
Return dictionary containing login configuration, including corpId, agentId, redirectUri, and random state value.

#### Usage Example
```python title="Get Login Configuration Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")
config = qywx_auth.getLoginConfig()
print(f"Enterprise ID: {config['corpId']}")
print(f"Application ID: {config['agentId']}")
```

### getLoginCode
Get user login information based on WeChat Work authorization code, complete user identity authentication.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-----|---|----|---|---|
| authCode | Stext | str | Yes | WeChat Work authorization code, obtained from frontend QR code scanning |
| state | Stext | str | No | State parameter for preventing CSRF attacks |

#### Return Value
Return user login information dictionary, containing fields like userId, name, mobile, email, avatar, department, position, gender, status, isLeader, etc.

#### Usage Example
```python title="User Login Authentication Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")

# Handle authorization code to get user information
try:
    user_info = qywx_auth.getLoginCode(authCode="authorization_code_from_frontend")
    print(f"User login successful: {user_info['name']}")
    print(f"User department: {user_info['department']}")
except Exception as e:
    print(f"Login failed: {e}")
```

### getUserInfo
Get detailed user information based on user ID.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-----|---|----|---|---|
| userId | Stext | str | Yes | WeChat Work user ID |

#### Return Value
Return detailed user information dictionary, containing user basic information, department information, position information, etc.

#### Usage Example
```python title="Get User Detailed Information Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")
user_detail = qywx_auth.getUserInfo(userId="zhangsan")
```

### getAccessToken
Get WeChat Work access token for calling WeChat Work API.

#### Parameter Details
This method requires no parameters.

#### Return Value
Return access token string.

#### Usage Example
```python title="Get Access Token Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")
access_token = qywx_auth.getAccessToken()
```

### syncUserInfo
Sync WeChat Work user information to local system.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-----|---|----|---|---|
| userId | Stext | str | Yes | WeChat Work user ID |
| forceUpdate | Checkbox | bool | No | Whether to force update, default False |

#### Return Value
This method has no return value.

#### Usage Example
```python title="Sync User Information Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")
qywx_auth.syncUserInfo(userId="zhangsan", forceUpdate=True)
```

### syncDepartmentInfo
Sync WeChat Work department information to local system.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-----|---|----|---|---|
| deptId | Stext | str | No | Department ID, sync all departments if not provided |

#### Return Value
This method has no return value.

#### Usage Example
```python title="Sync Department Information Example"
qywx_auth = app.getElement("auths.loginTypes.QywxInnerExample")
qywx_auth.syncDepartmentInfo()  # Sync all departments
qywx_auth.syncDepartmentInfo(deptId="2")  # Sync specified department
```

## Properties
### QywxInnerAuthModel
WeChat Work custom login data model, used to store WeChat Work related authentication information. Main fields include id primary key, userId WeChat Work user ID, name user name, mobile phone number, email email address, avatar avatar URL, department department information, position position, gender gender, status employment status, isLeader whether department leader, accessToken access token, refreshToken refresh token, expiresAt token expiration time, createdAt creation time, updatedAt update time, etc.

## Advanced Features
### Frontend QR Code Login Integration
Frontend can build WeChat Work login URL by getting login configuration, display QR code or redirect link, handle authorization code in redirect page to complete login flow.

```javascript title="Frontend Login Flow Example"
// Get WeChat Work login configuration
const config = await api.getLoginConfig('auths.loginTypes.QywxInnerExample');

// Build WeChat Work login URL
const loginUrl = `https://login.work.weixin.qq.com/wwlogin/sso/login?login_type=CorpApp&appid=${config.corpId}&agentid=${config.agentId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&state=${config.state}`;

// Handle authorization callback
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code');
if (authCode) {
    const userInfo = await api.loginWithCode('auths.loginTypes.QywxInnerExample', {
        authCode: authCode,
        state: urlParams.get('state')
    });
}
```

### Error Handling
Common error codes include 40013 (invalid corpId), 40014 (invalid access_token), 42001 (access_token timeout), 40029 (invalid oauth_code), 60020 (invalid agentId).

```python title="Error Handling Example"
from jit.errcode import Code

try:
    user_info = qywx_auth.getLoginCode(authCode=auth_code)
except Exception as e:
    if "40013" in str(e):
        raise Code(40013, "Enterprise ID is incorrect, please check configuration")
    elif "40029" in str(e):
        raise Code(40029, "Authorization code is invalid or expired")
    else:
        raise Code(50000, f"Login failed: {str(e)}")
```