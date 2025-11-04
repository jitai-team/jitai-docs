---
slug: dingtalk-qr-login
title: "DingTalk Custom QR Code Login Reference"
description: "DingTalk Custom QR Code Login Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "DingTalk Custom QR Code Login"
---
# DingTalk Custom QR Code Login
DingTalk custom QR code login (DDInnerType) is a login authentication element based on DingTalk custom applications, supporting PC-side QR code scanning login and password-free login within DingTalk workspace. It handles DingTalk OAuth authorization flow, user identity authentication, and account binding, while supporting seamless integration with DingTalk enterprise organizational architecture and user information synchronization.

The hierarchical structure of DingTalk custom QR code login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.DDInnerType) → Instance. Developers can quickly create DingTalk custom QR code login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- PC-side QR code scanning login - Display DingTalk login QR code, users scan with DingTalk App to complete login
- DingTalk workspace login - Directly call JSAPI within DingTalk workspace to get password-free authorization code for login

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.DDInnerType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
your_app/
└── auths/
    └── loginTypes/
        └── testDDLogin/           # Custom instance name
            ├── e.json             # Element definition file
            └── testDDLogin.json   # DingTalk application configuration file
```

#### e.json File
```json title="Element Definition File"
{
  "title": "DingTalk Custom QR Code Login",
  "type": "auths.loginTypes.DDInnerType"
}
```

#### Business Configuration File
```json title="testDDLogin.json - DingTalk Application Configuration"
{
  "authConfig": {
    "appKey": "your_app_key",
    "appSecret": "your_app_secret",
    "agentId": 123456789,
    "corpId": "your_corp_id"
  }
}
```

#### Usage Example
```python title="Getting and Using Authentication Element"
# Get authentication element instance
auth_element = app.getElement("auths.loginTypes.testDDLogin")

# Get login configuration (for frontend QR code generation)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"appKey": "your_app_key"}

# Get DingTalk client
client = auth_element.getClient()

# Get authentication element through service
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
auth = auth_svc.getAuthByCorpId("your_corp_id")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|-------|------|------|------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.DDInnerType |

### Business Configuration File
Configuration file name format is `{instance_name}.json`, containing DingTalk application authentication information:

| Configuration Item | Type | Required | Description |
|-------|------|------|------|
| authConfig.appKey | string | Yes | DingTalk application Key, 20 characters long |
| authConfig.appSecret | string | Yes | DingTalk application secret, 64 characters long |
| authConfig.agentId | number | Yes | DingTalk application ID, range 10^9 to 10^10-1 |
| authConfig.corpId | string | Yes | DingTalk enterprise ID |

**Configuration Acquisition Method**:
1. Login to DingTalk Open Platform (https://open-dev.dingtalk.com/)
2. Create enterprise internal application
3. Get AppKey, AppSecret, AgentId from application details page
4. Get CorpId from enterprise information

## Methods
### getLoginConfig
Get login configuration information, mainly used for frontend QR code generation.

#### Return Value
| Type | Corresponding Native Type | Description |
|-----|-------------|------|
| JitDict | dict | Configuration dictionary containing appKey |

#### Usage Example
```python title="Get Login Configuration"
auth_element = app.getElement("auths.loginTypes.testDDLogin")
config = auth_element.getLoginConfig()
# Returns: {"appKey": "dingztadtaoyxr1kw8ii"}
```

### getClient
Get DingTalk API client instance for calling DingTalk related interfaces.

#### Return Value
| Type | Corresponding Native Type | Description |
|-----|-------------|------|
| DDInnerClient | object | DingTalk client object |

#### Usage Example
```python title="Get DingTalk Client"
auth_element = app.getElement("auths.loginTypes.testDDLogin")
client = auth_element.getClient()
# Can be used to call DingTalk API
```

### loginByWorkbench (Service Method)
DingTalk workspace login, complete user login through authorization code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| corpId | Stext | str | Yes | DingTalk enterprise ID |
| authCode | Stext | str | Yes | DingTalk authorization code |
| platform | Stext | str | Yes | Login platform: web/mobile |

#### Return Value
| Type | Corresponding Native Type | Description |
|-----|-------------|------|
| JitDict | dict | Login result information |

#### Usage Example
```python title="Workspace Login"
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
result = auth_svc.loginByWorkbench(
    corpId="ding4f9e8d28b9ffeabc4f983d1f2b9dd17cf",
    authCode="auth_code_from_dingtalk",
    platform="web"
)
```

### getAuthByCorpId (Service Method)
Get corresponding authentication element instance through DingTalk enterprise ID.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|-------|------|-------------|------|------|
| corpId | Stext | str | Yes | DingTalk enterprise ID |

#### Return Value
| Type | Corresponding Native Type | Description |
|-----|-------------|------|
| Element | object | Authentication element instance, returns None if not found |

#### Usage Example
```python title="Get Authentication Element by Enterprise ID"
auth_svc = app.getElement("auths.loginTypes.DDInnerType.services.DDInnerAuthSvc")
auth_element = auth_svc.getAuthByCorpId("ding4f9e8d28b9ffeabc4f983d1f2b9dd17cf")
if auth_element:
    print(f"Found authentication element: {auth_element.fullName}")
```

## Properties
### authConfig
DingTalk application configuration information, containing appKey, appSecret, agentId, corpId and other parameters.

| Property | Type | Description |
|------|------|------|
| appKey | str | DingTalk application Key |
| appSecret | str | DingTalk application secret |
| agentId | int | DingTalk application ID |
| corpId | str | DingTalk enterprise ID |

### authType
Authentication type identifier, fixed value is the type enum for DingTalk custom QR code login.

### authModelElemName
Associated authentication data model element name, points to DDInnerAuthModel.

## Advanced Features
### Data Model Extension
DDInnerAuthModel stores DingTalk user authentication information, containing user ID mapping, DingTalk user information and other fields:

```python title="Authentication Data Model Fields"
class DDInnerAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="User ID")
    thirdCorpId = datatypes.Stext(name="thirdCorpId", title="Third-party Enterprise ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="DingTalk User ID")
    unionId = datatypes.Stext(name="unionId", title="DingTalk unionId")
    jobNumber = datatypes.Stext(name="jobNumber", title="Employee Number")
    phone = datatypes.Stext(name="phone", title="Phone Number")
    email = datatypes.Stext(name="email", title="Email")
    hiredDate = datatypes.Date(name="hiredDate", title="Hire Date")
    photo = datatypes.Stext(name="photo", title="Avatar")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
```

### Frontend Integration
Frontend needs to load DingTalk SDK and call corresponding APIs:

```typescript title="Frontend Login Implementation"
// PC-side QR code login
(window as any).DTFrameLogin(
    { id: 'dd_login_wrap', width: 300, height: 300 },
    {
        redirect_uri: encodeURIComponent(`${window.location.href}?corpId=corpId`),
        client_id: authJson.authConfig.appKey,
        scope: 'openid',
        response_type: 'code',
        state: `auths.DDInnerType-${Date.now()}`,
        prompt: 'consent',
    },
    async (loginResult: Record<string, any>) => {
        const { authCode } = loginResult;
        await authIns.getLoginCode({
            code: authCode,
            loginType: 'qr',
            platform: 'web',
        });
    }
);

// Workspace login
(window as any).dd.runtime.permission.requestAuthCode({
    corpId,
    onSuccess: (res: { code: string }) => {
        // Call backend login interface after getting authorization code
    },
});
```

### Error Handling
Common error situations and handling methods:

```python title="Error Handling Example"
try:
    auth_element = auth_svc.getAuthByCorpId(corpId)
    if not auth_element:
        raise Exception("Corresponding DingTalk authentication configuration not found")
    
    result = auth_svc.loginByWorkbench(corpId, authCode, platform)
except Exception as e:
    # Log error and return friendly message
    logger.error(f"DingTalk login failed: {str(e)}")
    return {"success": False, "message": "Login failed, please try again"}
```

**Common Error Types**:
- Application configuration error: Check appKey, appSecret and other configurations
- Enterprise ID mismatch: Confirm user enterprise matches configured corpId
- Authorization code expired: Authorization code valid for 10 minutes, need to reacquire
- Network connection issues: Ensure access to DingTalk API services