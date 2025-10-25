---
slug: google-login
---
# Google Login
Google Login (GoogleType) is an authentication element built on the Google platform that supports OAuth authorization for both PC and mobile environments. It manages the complete Google OAuth flow, user authentication, and account binding processes, making it ideal for international applications, SaaS platforms, educational products, and other scenarios that benefit from streamlined registration processes.

Google login elements follow a hierarchical structure: Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.GoogleType) → Instance. Developers can rapidly create Google login instances using JitAi's visual development tools.

**Supported authentication methods**:
- PC OAuth authorization login - Redirects users to Google's authorization page
- Mobile OAuth authorization login - Integrates Google OAuth services for mobile applications
- Single Sign-On integration - Seamless integration with Google Workspace for enterprise SSO

Developers can also create custom Type elements or extend the official auths.loginTypes.GoogleType element within their applications to implement custom authentication workflows.

## Quick Start {#quick-start}
### Creating instance elements {#creating-instance-elements}
#### Directory structure {#directory-structure}
```text title="Recommended directory structure"
your_app/
└── auths/
    └── loginTypes/
        └── testGoogleLogin/           # Custom instance name
            ├── e.json                # Element definition file
            └── testGoogleLogin.json   # Google application configuration file
```

#### e.json file {#e-json-file}
```json title="Element definition file"
{
  "title": "Google Login",
  "type": "auths.loginTypes.GoogleType"
}
```

#### Business configuration file {#business-configuration-file}
```json title="testGoogleLogin.json - Google application configuration"
{
  "authConfig": {
    "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "clientSecret": "GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage example {#usage-example}
```python title="Retrieving and using authentication elements"
# Retrieve authentication element instance
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")

# Get login configuration (used for frontend OAuth URL generation)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# Get Google client instance
client = auth_element.getClient()

# Perform OAuth login through authentication element
result = auth_element.getLoginCode(code="authorization_code_from_google")
```

## Element Configuration {#element-configuration}
### e.json configuration {#e-json-configuration}
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.GoogleType |

### Business configuration file setup {#business-configuration-file-setup}
The configuration file follows the naming pattern `{instance_name}.json` and contains Google application authentication credentials:

| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| authConfig.clientId | string | Yes | Google OAuth 2.0 client ID |
| authConfig.clientSecret | string | Yes | Google OAuth 2.0 client secret |

**How to obtain configuration credentials**:
1. Sign in to Google Cloud Console (https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Create a new OAuth 2.0 client ID or select existing credentials
4. Retrieve the client ID and client secret from the application details page
5. Configure authorized redirect URIs for your application

## Methods {#methods}
### getLoginConfig {#getloginconfig}
Retrieves login configuration data, primarily used for generating OAuth authorization URLs in frontend applications.

#### Return value {#getloginconfig-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Dictionary containing clientId and other configurations |

#### Usage example {#getloginconfig-usage-example}
```python title="Retrieving login configuration"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
config = auth_element.getLoginConfig()
# Returns: {"clientId": "your_client_id.apps.googleusercontent.com"}
```

### getClient {#getclient}
Returns a Google API client instance for making calls to Google-related endpoints.

#### Return value {#getclient-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| GoogleClient | object | Google client object |

#### Usage example {#getclient-usage-example}
```python title="Retrieving Google client"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
client = auth_element.getClient()
# Use this client to make Google API calls
```

### getLoginCode {#getlogincode}
Processes Google OAuth authorization codes to generate login codes. This is the core authentication method for the element.

#### Parameter details {#getlogincode-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| code | Stext | str | Yes | Google OAuth2 authorization code |

#### Return value {#getlogincode-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Contains loginCode and corpList for authentication results |

#### Usage example {#getlogincode-usage-example}
```python title="OAuth authentication"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
result = auth_element.getLoginCode(code="auth_code_from_google")
# Returns: {"loginCode": "...", "corpList": [...]}
```

### getUserInfoByCode {#getuserinfobycode}
Retrieves Google user information using an OAuth authorization code.

#### Parameter details {#getuserinfobycode-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| code | Stext | str | Yes | Google OAuth2 authorization code |

#### Return value {#getuserinfobycode-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Google user information dictionary |

#### Usage example {#getuserinfobycode-usage-example}
```python title="Retrieving user information"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code_from_google")
# Returns Google user data including email, name, picture, etc.
```

### bind {#bind}
Binds a Google user account to an existing user account.

#### Parameter details {#bind-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| userId | Stext | str | Yes | User ID |
| userInfo | JitDict | dict | Yes | Google user information |

#### Usage example {#bind-usage-example}
```python title="Binding Google account"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code")
auth_element.bind(userId="user_id", userInfo=user_info)
```

### unbind {#unbind}
Unbinds a Google user account.

#### Parameter details {#unbind-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| userId | Stext | str | Yes | User ID |

#### Usage example {#unbind-usage-example}
```python title="Unbinding Google account"
auth_element = app.getElement("auths.loginTypes.testGoogleLogin")
auth_element.unbind(userId="user_id")
```

## Properties {#properties}
### authConfig {#authconfig}
Contains Google application configuration data, including clientId, clientSecret, and other authentication parameters.

| Property | Type | Description |
|----------|------|-------------|
| clientId | str | Google OAuth 2.0 client ID |
| clientSecret | str | Google OAuth 2.0 client secret |

### authType {#authtype}
Authentication type identifier with a fixed value representing the Google login type enumeration.

### authModelElemName {#authmodelelemname}
References the associated authentication data model element name, which points to GoogleAuthModel.

## Advanced Features {#advanced-features}
### Data model extension {#data-model-extension}
GoogleAuthModel stores Google user authentication data using a simplified field structure:

```python title="Authentication data model fields"
class GoogleAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="UserID")
    email = datatypes.Stext(name="email", title="Google Email")
    userInfo = datatypes.JitDict(name="userInfo", title="User information dictionary")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
    updateTime = datatypes.Datetime(name="updateTime", title="Update Time")
```

**Field descriptions**:
- `userInfo` field stores complete Google user information as a dictionary, including:
  - `id`: Google user ID
  - `email`: Email address
  - `name`: Display name
  - `picture`: Avatar URL
  - `locale`: Language locale
  - `verified_email`: Email verification status
  - Additional fields returned by the Google API

### Frontend integration {#frontend-integration}
Frontend applications must implement the OAuth authorization flow:

```typescript title="Frontend login implementation"
// PC OAuth login
const loginWithGoogle = async () => {
    const config = await getLoginConfig(); // Retrieve configuration
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${config.clientId}&` +
        `response_type=code&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid profile email&` +
        `state=${generateState()}`;
    
    // Redirect to Google authorization page
    window.location.href = authUrl;
};

// Handle OAuth callback
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        // Step 1: Get login code through authentication element
        const authElement = app.getElement("auths.loginTypes.testGoogleLogin");
        const loginResult = await authElement.getLoginCode(code);
        
        // Step 2: Complete final login using AuthSvc
        const authSvc = app.getElement("auths.loginTypes.services.AuthSvc");
        const finalResult = await authSvc.loginByCode(
            loginResult.loginCode,
            "target_corp_name",
            "web"
        );
        
        if (finalResult.success) {
            // Login successful, redirect to main page
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};
```

### Permission configuration {#permission-configuration}
Configure application permissions in Google Cloud Console:

```text title="Required API permissions"
Google API permissions:
- openid (OAuth scope) - Access OpenID Connect user identifier
- profile (OAuth scope) - Access user's basic profile information
- email (OAuth scope) - Access user's email address
- https://www.googleapis.com/auth/userinfo.profile - Access user profile information
- https://www.googleapis.com/auth/userinfo.email - Access user email information
```
