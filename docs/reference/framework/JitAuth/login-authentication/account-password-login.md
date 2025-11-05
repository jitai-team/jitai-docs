---
slug: account-password-login
title: "Account Password Login Reference"
description: "Account Password Login Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Account Password Login"
---
# Account Password Login
Account password login is a basic login authentication method provided by the JitAi platform, supporting username-password verification, graphic captcha protection, and encrypted password storage. It handles user identity authentication, account binding management, and login security protection, suitable for internal enterprise applications and scenarios requiring traditional authentication methods.

The hierarchical structure of account password login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.PasswordType) → Instance. Developers can quickly create account password login instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.PasswordType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/
└── loginTypes/
    └── MyPasswordAuth/
        ├── e.json              # Element configuration file
        └── Config.json         # Authentication configuration file
```

#### e.json File
```json title="Element Configuration"
{
    "title": "Account Password Login",
    "type": "auths.loginTypes.PasswordType",
    "default": 1,
    "allowRegister": 1,
    "backendBundleEntry": ".",
    "frontBundleEntry": "./Config.json"
}
```

#### Business Configuration File
```json title="Config.json Authentication Configuration"
{
    "authConfig": {
        "salt": "your_custom_salt_32_chars_long"
    },
    "isActive": true,
    "limit": {
        "minLength": 6,
        "maxLength": 20,
        "requireUppercase": false,
        "requireNumber": false
    }
}
```

#### Usage Example
```python title="Basic Usage"
# Get authentication instance
auth = app.getElement("auths.loginTypes.MyPasswordAuth")

# Generate captcha
captcha = auth.generateCaptcha()

# User login
result = auth.getLoginCode(
    username="admin",
    password="e10adc3949ba59abbe56e057f20f883e",  # Frontend MD5 encrypted password
    captcha="A2B3",
    token=captcha["token"]
)
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Description | Default Value |
|--------|------|------|--------|
| title | string | Login method display name | - |
| type | string | Must be "auths.loginTypes.PasswordType" | - |
| default | int | Whether it's the default login method (1=yes, 0=no) | 0 |
| allowRegister | int | Whether to allow registration (1=allow, 0=not allow) | 0 |
| backendBundleEntry | string | Backend entry path | "." |
| frontBundleEntry | string | Frontend configuration file path | - |

### Business Configuration File
| Configuration Item | Type | Description | Default Value |
|--------|------|------|--------|
| authConfig.salt | string | Password encryption salt (32 characters) | Auto-generated |
| isActive | boolean | Whether to enable this login method | true |
| limit.minLength | int | Minimum password length | 6 |
| limit.maxLength | int | Maximum password length | 20 |
| limit.requireUppercase | boolean | Whether to require uppercase letters | false |
| limit.requireNumber | boolean | Whether to require numbers | false |
| limit.requireSpecialChar | boolean | Whether to require special characters | false |

## Methods
### getLoginCode
User login verification, returns login credentials and user information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| username | Stext | str | Yes | Username |
| password | Stext | str | Yes | Password (frontend MD5 encrypted) |
| captcha | Stext | str | Yes | Captcha content |
| token | Stext | str | Yes | Captcha token |

#### Return Value
| Field Name | Type | Description |
|--------|------|------|
| loginCode | string | Login credentials |
| corpList | list | Organization list |
| userId | string | User ID |

#### Usage Example
```python title="User Login"
try:
    result = auth.getLoginCode(
        username="admin",
        password="e10adc3949ba59abbe56e057f20f883e",
        captcha="A2B3",
        token="abc123def456"
    )
    print(f"Login successful, User ID: {result['userId']}")
except Exception as e:
    print(f"Login failed: {e}")
```

### generateCaptcha
Generate graphic captcha, returns captcha token and image data.

#### Parameter Details
No parameters

#### Return Value
| Field Name | Type | Description |
|--------|------|------|
| token | string | Captcha token (valid for 5 minutes) |
| img | string | Base64 encoded captcha image |

#### Usage Example
```python title="Generate Captcha"
captcha = auth.generateCaptcha()
print(f"Captcha Token: {captcha['token']}")
# Return captcha['img'] to frontend for display
```

### bind
Bind account password authentication method for user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| username | Stext | str | Yes | Username |
| password | Stext | str | Yes | Password (frontend MD5 encrypted) |

#### Return Value
Operation result dictionary

#### Usage Example
```python title="Bind Account"
result = auth.bind(
    userId="user123",
    username="newuser", 
    password="e10adc3949ba59abbe56e057f20f883e"
)
```

### updatePassword
Modify user password.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| oldPassword | Stext | str | Yes | Old password (frontend MD5 encrypted) |
| newPassword | Stext | str | Yes | New password (frontend MD5 encrypted) |

#### Return Value
Operation result dictionary

#### Usage Example
```python title="Modify Password"
result = auth.updatePassword(
    userId="user123",
    oldPassword="e10adc3949ba59abbe56e057f20f883e",
    newPassword="098f6bcd4621d373cade4e832627b4f6"
)
```

### checkCaptcha
Verify if captcha is correct.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| token | Stext | str | Yes | Captcha token |
| code | Stext | str | Yes | Captcha content |

#### Return Value
| Type | Description |
|------|------|
| bool | True means verification passed, False means verification failed |

#### Usage Example
```python title="Captcha Verification"
is_valid = auth.checkCaptcha("abc123def456", "A2B3")
if is_valid:
    print("Captcha is correct")
else:
    print("Captcha is incorrect")
```

### unbind
Unbind account password authentication method for user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |

#### Return Value
Operation result dictionary

#### Usage Example
```python title="Unbind Account"
result = auth.unbind(userId="user123")
```

### updateUsername
Modify username.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| username | Stext | str | Yes | New username |

#### Return Value
Operation result dictionary

#### Usage Example
```python title="Modify Username"
result = auth.updateUsername(
    userId="user123",
    username="newusername"
)
```

## Properties
| Property Name | Type | Description |
|--------|------|------|
| authType | string | Authentication type identifier |
| authModelElemName | string | Authentication model element name |

## Advanced Features
### Password Strength Policy
Configure password complexity requirements to improve security.

```json title="Strong Password Policy Configuration"
{
    "limit": {
        "minLength": 8,
        "maxLength": 20,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumber": true,
        "requireSpecialChar": true
    }
}
```

### Password Encryption Management
Custom salt value and batch password refresh functionality.

```python title="Password Management Features"
# Encrypt password (for import/export)
encrypted = auth.encryptPassword("user_md5_password")

# Refresh all passwords in database (used during upgrades)
auth.refreshDbPassword()
```

### Error Handling
Common error code handling examples.

```python title="Error Handling"
try:
    result = auth.getLoginCode(username, password, captcha, token)
except Exception as e:
    error_msg = str(e)
    if "USER_AUTH_MISS" in error_msg:
        return {"error": "User does not exist"}
    elif "PASSWORD_ERROR" in error_msg:
        return {"error": "Incorrect password"}
    elif "CAPTCHA_ERROR" in error_msg:
        return {"error": "Incorrect captcha"}
    else:
        return {"error": "Login failed, please try again later"}
```