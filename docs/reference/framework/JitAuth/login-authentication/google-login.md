---
slug: google-login
---
# Google Login {#google-login}
Google Login (GoogleType) is a login authentication element based on Google open platform, supporting OAuth authorization login for both PC and mobile platforms. It handles Google OAuth authorization flow, user identity authentication and account binding, suitable for international applications, SaaS platforms, educational products and other scenarios that require simplified registration processes.

The hierarchical structure of Google login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.GoogleType) → Instance. Developers can quickly create Google login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- PC OAuth Authorization Login - Redirect to Google login page for OAuth authorization
- Mobile OAuth Authorization Login - Call Google OAuth service on mobile devices for authorization login
- Single Sign-On Integration - Integration with Google Workspace for single sign-on

Of course, developers can also create their own Type elements, or modify the official auths.loginTypes.GoogleType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
your_app/
└── auths/
    └── loginTypes/
        └── testGoogleLogin/           # Custom instance name
            ├── e.json                # Element definition file
            └── testGoogleLogin.json   # Google application configuration file
```

#### e.json File
```json title="Element Definition File"
{
  "title": "Google Login",
  "type": "auths.loginTypes.GoogleType"
}
```

#### Business Configuration File
```json title="testGoogleLogin.json - Google Application Configuration"
{
  "authConfig": {
    "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "clientSecret": "GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage Example
```python title="Getting and Using Authentication Element"
# Get authentication element instance
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")

# Get login configuration (for frontend OAuth link generation)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# Get Google client
client = auth_element.getClient()

# Get authentication element through service
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
auth = auth_svc.getAuthByClientId("your_client_id")
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.GoogleType |

### Business Configuration File Configuration
Configuration file name format is `{instance_name}.json`, containing Google application authentication information:

| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| authConfig.clientId | string | Yes | Google OAuth 2.0 client ID |
| authConfig.clientSecret | string | Yes | Google OAuth 2.0 client secret |

**Configuration Acquisition Method**:
1. Log in to Google Cloud Console (https://console.cloud.google.com/)
2. Go to "APIs & Services" → "Credentials"
3. Create new OAuth 2.0 client ID or select existing credentials
4. Get the client ID and client secret from the application details
5. Configure authorized redirect URIs for your application

## Methods 
### getLoginConfig
Get login configuration information, mainly used for frontend OAuth authorization link generation.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Dictionary containing clientId and other configurations |

#### Usage Example
```python title="Getting Login Configuration"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
config = auth_element.getLoginConfig()
# Returns: {"clientId": "your_client_id.apps.googleusercontent.com"}
```

### getClient
Get Google API client instance for calling Google-related interfaces.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| GoogleClient | object | Google client object |

#### Usage Example
```python title="Getting Google Client"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
client = auth_element.getClient()
# Can be used to call Google API
```

### loginByOAuth (Service Method)
Google OAuth login, complete user login through authorization code.

#### Parameter Details
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| clientId | Stext | str | Yes | Google OAuth 2.0 client ID |
| authCode | Stext | str | Yes | OAuth authorization code |
| platform | Stext | str | Yes | Login platform: web/mobile |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Login result information |

#### Usage Example
```python title="OAuth Login"
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
result = auth_svc.loginByOAuth(
    clientId="your_client_id.apps.googleusercontent.com",
    authCode="auth_code_from_google",
    platform="web"
)
```

### getAuthByClientId (Service Method)
Get corresponding authentication element instance through Google client ID.

#### Parameter Details
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| clientId | Stext | str | Yes | Google OAuth 2.0 client ID |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| Element | object | Authentication element instance, returns None if not found |

#### Usage Example
```python title="Getting Authentication Element by Client ID"
auth_svc = app.getElement("auths.loginTypes.GoogleType.services.GoogleAuthSvc")
auth_element = auth_svc.getAuthByClientId("your_client_id.apps.googleusercontent.com")
if auth_element:
    print(f"Found authentication element: {auth_element.fullName}")
```


## Properties
### authConfig
Google application configuration information, including clientId, clientSecret and other parameters.

| Property | Type | Description |
|----------|------|-------------|
| clientId | str | Google OAuth 2.0 client ID |
| clientSecret | str | Google OAuth 2.0 client secret |

### authType
Authentication type identifier, fixed value for Google login type enumeration.

### authModelElemName
Associated authentication data model element name, pointing to GoogleAuthModel.

## Advanced Features
### Data Model Extension
GoogleAuthModel stores Google user authentication information, including user ID mapping, Google user information and other fields:

```python title="Authentication Data Model Fields"
class GoogleAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="User ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="Google User ID")
    email = datatypes.Stext(name="email", title="Email")
    name = datatypes.Stext(name="name", title="Display Name")
    picture = datatypes.Stext(name="picture", title="Avatar URL")
    locale = datatypes.Stext(name="locale", title="Locale")
    createTime = datatypes.Datetime(name="createTime", title="Create Time")
```

### Frontend Integration
Frontend needs to implement OAuth authorization flow:

```typescript title="Frontend Login Implementation"
// PC OAuth Login
const loginWithGoogle = async () => {
    const config = await getLoginConfig(); // Get configuration
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${config.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid profile email&` +
        `state=${generateState()}`;
    
    // Redirect to Google login page
    window.location.href = authUrl;
};

// Handle OAuth callback
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        const result = await authSvc.loginByOAuth({
            clientId: config.clientId,
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
Configure application permissions in Google Cloud Console:

```text title="Required API Permissions"
Google API Permissions:
- openid (OAuth scope) - Access to OpenID Connect user identifier
- profile (OAuth scope) - Access to user's basic profile information
- email (OAuth scope) - Access to user's email address
- https://www.googleapis.com/auth/userinfo.profile - Access to user profile information
- https://www.googleapis.com/auth/userinfo.email - Access to user email information
```

### Error Handling
Common error scenarios and handling methods:

```python title="Error Handling Example"
try:
    auth_element = auth_svc.getAuthByClientId(clientId)
    if not auth_element:
        raise Exception("Google authentication configuration not found")
    
    result = auth_svc.loginByOAuth(clientId, authCode, platform)
    if not result.get('success'):
        raise Exception(result.get('message', 'Login failed'))
        
except Exception as e:
    # Log error and return friendly message
    logger.error(f"Google login failed: {str(e)}")
    return {"success": False, "message": "Login failed, please try again"}
```

**Common Error Types**:
- Application configuration error: Check clientId, clientSecret and other configurations
- Authorization code expired: OAuth authorization code expires in 10 minutes, need to re-obtain
- Insufficient permissions: Ensure application has necessary Google API permissions
- Network connection issues: Ensure access to Google API services
- Invalid redirect URI: Ensure redirect URI matches Google Console configuration


