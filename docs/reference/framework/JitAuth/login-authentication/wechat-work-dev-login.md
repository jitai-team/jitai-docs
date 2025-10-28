---
slug: wechat-work-dev-login
title: "WeCom Proxy Development Login Reference"
description: "WeCom Proxy Development Login Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "WeCom Proxy Development Login"
---
# WeCom Proxy Development Login
WeCom proxy development login is a login authentication Type element provided by the JitAi framework, implementing enterprise-level single sign-on based on WeCom third-party application proxy development mode. It handles WeCom OAuth authorization flow, user identity authentication, and multi-enterprise proxy management, supporting password-free login within workspace, QR code login, and callback event handling.

The hierarchical structure of WeCom proxy development login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.QywxProxyType) → Instance. Developers can quickly create WeCom proxy development login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- WeCom workspace login - Users click application directly in WeCom workspace to login
- QR code login - Login through WeCom QR code scanning
- Callback handling - Handle WeCom OAuth callbacks and event notifications

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.QywxProxyType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/
└── QywxProxyTemp/           # Login instance element name
    ├── e.json              # Element configuration file
    └── QywxProxyTemp.json  # Business configuration file
```

#### e.json File
```json title="Element Configuration File"
{
  "title": "WeCom Proxy Development Login Configuration",
  "type": "auths.loginTypes.QywxProxyType"
}
```

#### Business Configuration File
Create business configuration file with same name as instance element `QywxProxyTemp.json`:

```json title="Business Configuration File"
{
  "authConfig": {
    "suiteId": "tj1234567890abcdef",
    "suiteSecret": "your_suite_secret",
    "encodingAESKey": "your_encoding_aes_key",
    "token": "your_token"
  },
  "isActive": true,
  "corpId": "ww1234567890abcdef"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get login instance
auth_instance = app.getElement("auths.QywxProxyTemp")

# Get login configuration
config = auth_instance.getLoginConfig()

# Get login code
login_result = auth_instance.getLoginCode(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx"
)

# Get service instance
auth_service = app.getElement("auths.loginTypes.QywxProxyType.services.QywxProxyAuthService")
```

## Element Configuration
### e.json Configuration
| Field | Type | Corresponding Native Type | Required | Description |
|------|------|-------------|------|------|
| title | string | str | Yes | Element display name |
| type | string | str | Yes | Fixed value: auths.loginTypes.QywxProxyType |

### Business Configuration File
| Field | Type | Corresponding Native Type | Required | Description |
|------|------|-------------|------|------|
| authConfig | object | dict | Yes | Authentication configuration object |
| authConfig.suiteId | string | str | Yes | Third-party application suite ID |
| authConfig.suiteSecret | string | str | Yes | Third-party application suite secret |
| authConfig.encodingAESKey | string | str | Yes | AES key for encrypting callback data |
| authConfig.token | string | str | Yes | Token for verifying callback requests |
| isActive | boolean | bool | No | Whether to enable this login method, default true |
| corpId | string | str | No | WeCom enterprise ID |

## Methods
### getLoginConfig
Return parameter configuration needed for login.

#### Parameter Details
No parameters.

#### Return Value
Return configuration information dictionary containing suiteId.

#### Usage Example
```python title="Get Login Configuration"
auth_instance = app.getElement("auths.QywxProxyTemp")
config = auth_instance.getLoginConfig()
print(f"Suite ID: {config['suiteId']}")
```

### getLoginCode
Get login code for QR code login and workspace login.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| corpId | Stext | str | Yes | WeCom enterprise ID |
| code | Stext | str | Yes | WeCom authorization code |
| loginType | Stext | str | No | Login type, qr for QR code login, workbench for workspace login |

#### Return Value
Return result dictionary containing loginCode, corpList, and userId.

#### Usage Example
```python title="Get Login Code"
auth_instance = app.getElement("auths.QywxProxyTemp")
result = auth_instance.getLoginCode(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx",
    loginType="workbench"
)
print(f"Login Code: {result['loginCode']}")
print(f"User ID: {result['userId']}")
```

### loginByWorkbench
Execute WeCom workspace login, return login information containing token.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| corpId | Stext | str | Yes | WeCom proxy development authorized corpId |
| code | Stext | str | Yes | WeCom password-free code |
| platform | - | LoginPlatformEnum | No | Platform type, default app |

#### Return Value
Return login result information, containing user information and token.

#### Usage Example
```python title="Workspace Login Example"
auth_service = app.getElement("auths.loginTypes.QywxProxyType.services.QywxProxyAuthService")
result = auth_service.loginByWorkbench(
    corpId="ww1234567890abcdef",
    code="auth_code_from_qywx"
)
```

### notify
Receive WeCom backend requests for handling callback notifications.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| nonce | Stext | str | Yes | Random number generated by WeCom backend |
| msg_signature | Stext | str | Yes | Signature generated by WeCom backend |
| timestamp | Stext | str | Yes | Timestamp generated by WeCom backend |
| echostr | Stext | str | No | Receipt string generated by WeCom backend (used for GET requests) |

#### Return Value
Return Flask Response object for responding to WeCom backend requests.

#### Usage Example
```python title="Handle Callback Notification Example"
response = auth_service.notify(
    nonce="random_nonce",
    msg_signature="signature_value",
    timestamp="1234567890",
    echostr="echo_string"
)
```

### setCode
Set organization code for generating WeCom proxy development login QR code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| corpId | Stext | str | Yes | WeCom enterprise ID |
| code | Stext | str | Yes | Organization code |

#### Return Value
No return value.

#### Usage Example
```python title="Set Organization Code Example"
auth_service.setCode(
    corpId="ww1234567890abcdef",
    code="org_code_123"
)
```

### getLoginConfigByCode
Get QR code login information through organization code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| code | Stext | str | Yes | Organization code |

#### Return Value
Return configuration information dictionary containing corpId and agentId.

#### Usage Example
```python title="Get Login Configuration Example"
config = auth_service.getLoginConfig(code="org_code_123")
print(f"Enterprise ID: {config['corpId']}")
print(f"Application ID: {config['agentId']}")
```

### retryCallBack
Retry callback handling.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| recordId | Numeric | int | Yes | Callback record ID |

#### Return Value
No return value.

#### Usage Example
```python title="Retry Callback Example"
auth_service.retryCallBack(recordId=123)
```

## Properties
### authConfig
Get current authentication configuration information.

**Type:** `dict`

**Description:** Contains configuration information like suiteId, suiteSecret, etc., sensitive information has been desensitized.

```python title="Get Authentication Configuration"
auth_instance = app.getElement("auths.QywxProxyTemp")
config = auth_instance.authConfig
print(f"Suite ID: {config['suiteId']}")
```

### authType
Get authentication type identifier.

**Type:** `str`

**Description:** Fixed value is "auths.loginTypes.QywxProxyType".

### authModelElemName
Get authentication model element name.

**Type:** `str`

**Description:** Fixed value is "auths.loginTypes.QywxProxyType.QywxProxyAuthModel".

## Advanced Features
### Multi-Enterprise Proxy
In proxy development scenarios, the same third-party application can provide services for multiple enterprises. Support multiple enterprises by creating multiple instance elements:

```text title="Multi-Enterprise Configuration Example"
auths/
├── QywxProxyCompanyA/      # Enterprise A login configuration
│   ├── e.json
│   └── QywxProxyCompanyA.json
├── QywxProxyCompanyB/      # Enterprise B login configuration
│   ├── e.json
│   └── QywxProxyCompanyB.json
└── QywxProxyDefault/       # Default login configuration
    ├── e.json
    └── QywxProxyDefault.json
```

### Event Handling
WeCom proxy development mode supports automatic handling of multiple event types: suite_ticket push, enterprise authorization success, enterprise authorization change, enterprise authorization cancellation. All events are handled uniformly through the notify method, and the framework automatically identifies event types and executes corresponding handling logic.

```python title="Event Handling Example"
# Framework automatically handles all callback events
def handle_qywx_callback():
    # All WeCom events handled uniformly through notify method
    # Including suite_ticket updates, enterprise authorization changes, etc.
    response = auth_service.notify(
        nonce=request.args.get('nonce'),
        msg_signature=request.args.get('msg_signature'),
        timestamp=request.args.get('timestamp'),
        echostr=request.args.get('echostr')
    )
    return response
```