---
slug: microsoft-teams-login
title: "Microsoft Teams Login Reference"
description: "Microsoft Teams Login Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Microsoft Teams Login"
---
# Microsoft Teams Login
Microsoft Teams Login (MicrosoftTeamsType) is a login authentication element based on Microsoft Teams applications, supporting OAuth authorization login for PC and mobile platforms. It handles Microsoft Teams OAuth authorization flows, user authentication, and account binding, while supporting seamless integration with Microsoft Teams enterprise organization structure and user information synchronization.

The Microsoft Teams login element hierarchy is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.MicrosoftTeamsType) → Instance. Developers can quickly create Microsoft Teams login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- PC OAuth Authorization Login - Redirect to Microsoft Teams login page to complete OAuth authorization login
- Mobile OAuth Authorization Login - Call Microsoft Teams application on mobile devices to complete authorization login
- Enterprise Internal Single Sign-On - Single sign-on integrated with Azure Active Directory

Of course, developers can also create their own Type elements or override the auths.loginTypes.MicrosoftTeamsType element officially provided by JitAi in their own applications to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
your_app/
└── auths/
    └── loginTypes/
        └── testTeamsLogin/           # Custom instance name
            ├── e.json                # Element definition file
            └── testTeamsLogin.json   # Microsoft Teams application configuration file
```

#### e.json File
```json title="Element Definition File"
{
  "title": "Microsoft Teams Login",
  "type": "auths.loginTypes.MicrosoftTeamsType"
}
```

#### Business Configuration File
```json title="testTeamsLogin.json - Microsoft Teams Application Configuration"
{
  "authConfig": {
    "corpId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage Example
```python title="Getting and Using Authentication Element"
# Get authentication element instance
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")

# Get login configuration (used for frontend to generate OAuth links)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# Get Microsoft Teams client
client = auth_element.getClient()

# Get authentication element through service
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
auth = auth_svc.getAuthByCorpId("your_corp_id")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.MicrosoftTeamsType |

### Business Configuration File Configuration
The configuration file name format is `{instance_name}.json`, containing Microsoft Teams application authentication information:

| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| authConfig.corpId | string | Yes | Azure tenant ID in UUID format |
| authConfig.clientId | string | Yes | Azure application client ID in UUID format |
| authConfig.clientSecret | string | Yes | Azure application client secret |

**Configuration Retrieval Steps**:
1. Log in to Azure Management Portal (https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Create a new app registration or select an existing app
4. Get the Application (client) ID from the app details page
5. Create a client secret in "Certificates & secrets"
6. Get the tenant ID from the directory overview

## Methods 
### getLoginConfig
Get login configuration information, mainly used for frontend to generate OAuth authorization links.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| JitDict | dict | Dictionary containing clientId and other configurations |

#### Usage Example
```python title="Get Login Configuration"
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")
config = auth_element.getLoginConfig()
# Returns: {"clientId": "12345678-1234-1234-1234-123456789012"}
```

### getClient
Get Microsoft Graph API client instance for calling Microsoft Teams related interfaces.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| MicrosoftTeamsClient | object | Microsoft Teams client object |

#### Usage Example
```python title="Get Microsoft Teams Client"
auth_element = app.getElement("auths.loginTypes.testTeamsLogin")
client = auth_element.getClient()
# Can be used to call Microsoft Graph API
```

### loginByOAuth (Service Method)
Microsoft Teams OAuth login, complete user login through authorization code.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| corpId | Stext | str | Yes | Azure tenant ID |
| authCode | Stext | str | Yes | OAuth authorization code |
| platform | Stext | str | Yes | Login platform: web/mobile |

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| JitDict | dict | Login result information |

#### Usage Example
```python title="OAuth Login"
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
result = auth_svc.loginByOAuth(
    corpId="12345678-1234-1234-1234-123456789012",
    authCode="auth_code_from_microsoft",
    platform="web"
)
```

### getAuthByCorpId (Service Method)
Get the corresponding authentication element instance through Azure tenant ID.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| corpId | Stext | str | Yes | Azure tenant ID |

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| Element | object | Authentication element instance, returns None if not found |

#### Usage Example
```python title="Get Authentication Element by Tenant ID"
auth_svc = app.getElement("auths.loginTypes.MicrosoftTeamsType.services.MicrosoftTeamsAuthSvc")
auth_element = auth_svc.getAuthByCorpId("12345678-1234-1234-1234-123456789012")
if auth_element:
    print(f"Found authentication element: {auth_element.fullName}")
```

## Properties
### authConfig
Microsoft Teams application configuration information, containing parameters such as corpId, clientId, clientSecret.

| Property | Type | Description |
|----------|------|-------------|
| corpId | str | Azure tenant ID |
| clientId | str | Azure application client ID |
| clientSecret | str | Azure application client secret |

### authType
Authentication type identifier, fixed value as the type enumeration for Microsoft Teams login.

### authModelElemName
Associated authentication data model element name, pointing to MicrosoftTeamsAuthModel.

## Advanced Features
### Data Model Extension
MicrosoftTeamsAuthModel stores Microsoft Teams user authentication information, containing fields such as user ID mapping and Teams user information:

```python title="Authentication Data Model Fields"
class MicrosoftTeamsAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="User ID")
    thirdCorpId = datatypes.Stext(name="thirdCorpId", title="Azure Tenant ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="Microsoft User ID")
    objectId = datatypes.Stext(name="objectId", title="Azure AD Object ID")
    userPrincipalName = datatypes.Stext(name="userPrincipalName", title="User Principal Name")
    displayName = datatypes.Stext(name="displayName", title="Display Name")
    mail = datatypes.Stext(name="mail", title="Email")
    jobTitle = datatypes.Stext(name="jobTitle", title="Job Title")
    department = datatypes.Stext(name="department", title="Department")
    photo = datatypes.Stext(name="photo", title="Avatar")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
```

### Frontend Integration
Frontend needs to implement OAuth authorization flow:

```typescript title="Frontend Login Implementation"
// PC OAuth login
const loginWithTeams = async () => {
    const config = await getLoginConfig(); // Get configuration
    const authUrl = `https://login.microsoftonline.com/${config.corpId}/oauth2/v2.0/authorize?` +
        `client_id=${config.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid profile User.Read&` +
        `state=${generateState()}`;
    
    // Redirect to Microsoft login page
    window.location.href = authUrl;
};

// Handle OAuth callback
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        const result = await authSvc.loginByOAuth({
            corpId: config.corpId,
            authCode: code,
            platform: 'web'
        });
        
        if (result.success) {
            // Login successful, redirect to dashboard
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};
```

### Permission Configuration
Configure application permissions in Azure management console:

```text title="Required API Permissions"
Microsoft Graph API Permissions:
- User.Read (Delegated permission) - Read user basic information
- User.ReadBasic.All (Delegated permission) - Read all users' basic information  
- Directory.Read.All (Application permission) - Read directory data
- Group.Read.All (Application permission) - Read all group information
```

### Error Handling
Common error situations and handling methods:

```python title="Error Handling Example"
try:
    auth_element = auth_svc.getAuthByCorpId(corpId)
    if not auth_element:
        raise Exception("Microsoft Teams authentication configuration not found")
    
    result = auth_svc.loginByOAuth(corpId, authCode, platform)
    if not result.get('success'):
        raise Exception(result.get('message', 'Login failed'))
        
except Exception as e:
    # Log error and return friendly message
    logger.error(f"Microsoft Teams login failed: {str(e)}")
    return {"success": False, "message": "Login failed, please try again"}
```

**Common Error Types**:
- Application configuration error: Check clientId, clientSecret and other configurations
- Tenant ID mismatch: Confirm user tenant matches configured corpId
- Authorization code expired: OAuth authorization code valid for 10 minutes, need to obtain new one
- Insufficient permissions: Ensure application has obtained necessary Microsoft Graph API permissions
- Network connection issues: Ensure access to Microsoft Graph API services
