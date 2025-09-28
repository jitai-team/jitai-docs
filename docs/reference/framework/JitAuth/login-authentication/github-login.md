---
slug: github-login
---
# GitHub Login {#github-login}
GitHub Login (GitHubType) is a login authentication element based on GitHub open platform, supporting OAuth authorization login for both PC and mobile platforms. It handles GitHub OAuth authorization flow, user identity authentication and account binding, particularly suitable for developer communities, technical products, open source project management and other scenarios that require unified identity management.

The hierarchical structure of GitHub login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.GitHubType) → Instance. Developers can quickly create GitHub login instance elements through JitAi's visual development tools.

**Supported Login Methods**:
- PC OAuth Authorization Login - Redirect to GitHub login page for OAuth authorization
- Mobile OAuth Authorization Login - Call GitHub OAuth service on mobile devices for authorization login
- GitHub Enterprise Integration - Support for GitHub Enterprise Server login

Of course, developers can also create their own Type elements, or modify the official auths.loginTypes.GitHubType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
your_app/
└── auths/
    └── loginTypes/
        └── testGitHubLogin/           # Custom instance name
            ├── e.json                # Element definition file
            └── testGitHubLogin.json   # GitHub application configuration file
```

#### e.json File
```json title="Element Definition File"
{
  "title": "GitHub Login",
  "type": "auths.loginTypes.GitHubType"
}
```

#### Business Configuration File
```json title="testGitHubLogin.json - GitHub Application Configuration"
{
  "authConfig": {
    "clientId": "Ov23xxxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage Example
```python title="Getting and Using Authentication Element"
# Get authentication element instance
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")

# Get login configuration (for frontend OAuth link generation)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# Get GitHub client
client = auth_element.getClient()

# Get authentication element through service
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
auth = auth_svc.getAuthByClientId("your_client_id")
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.GitHubType |

### Business Configuration File Configuration
Configuration file name format is `{instance_name}.json`, containing GitHub application authentication information:

| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| authConfig.clientId | string | Yes | GitHub OAuth App client ID |
| authConfig.clientSecret | string | Yes | GitHub OAuth App client secret |

**Configuration Acquisition Method**:
1. Log in to GitHub (https://github.com/)
2. Go to "Settings" → "Developer settings" → "OAuth Apps"
3. Create new OAuth App or select existing application
4. Get the Client ID and Client Secret from the application details
5. Configure Authorization callback URL for your application

## Methods 
### getLoginConfig
Get login configuration information, mainly used for frontend OAuth authorization link generation.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Dictionary containing clientId and other configurations |

#### Usage Example
```python title="Getting Login Configuration"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
config = auth_element.getLoginConfig()
# Returns: {"clientId": "Ov23xxxxxxxxxxxxxxxx"}
```

### getClient
Get GitHub API client instance for calling GitHub-related interfaces.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| GitHubClient | object | GitHub client object |

#### Usage Example
```python title="Getting GitHub Client"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
client = auth_element.getClient()
# Can be used to call GitHub API
```

### loginByOAuth (Service Method)
GitHub OAuth login, complete user login through authorization code.

#### Parameter Details
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| clientId | Stext | str | Yes | GitHub OAuth App client ID |
| authCode | Stext | str | Yes | OAuth authorization code |
| platform | Stext | str | Yes | Login platform: web/mobile |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Login result information |

#### Usage Example
```python title="OAuth Login"
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
result = auth_svc.loginByOAuth(
    clientId="Ov23xxxxxxxxxxxxxxxx",
    authCode="auth_code_from_github",
    platform="web"
)
```

### getAuthByClientId (Service Method)
Get corresponding authentication element instance through GitHub client ID.

#### Parameter Details
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| clientId | Stext | str | Yes | GitHub OAuth App client ID |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| Element | object | Authentication element instance, returns None if not found |

#### Usage Example
```python title="Getting Authentication Element by Client ID"
auth_svc = app.getElement("auths.loginTypes.GitHubType.services.GitHubAuthSvc")
auth_element = auth_svc.getAuthByClientId("Ov23xxxxxxxxxxxxxxxx")
if auth_element:
    print(f"Found authentication element: {auth_element.fullName}")
```


## Properties
### authConfig
GitHub application configuration information, including clientId, clientSecret and other parameters.

| Property | Type | Description |
|----------|------|-------------|
| clientId | str | GitHub OAuth App client ID |
| clientSecret | str | GitHub OAuth App client secret |

### authType
Authentication type identifier, fixed value for GitHub login type enumeration.

### authModelElemName
Associated authentication data model element name, pointing to GitHubAuthModel.

## Advanced Features
### Data Model Extension
GitHubAuthModel stores GitHub user authentication information, including user ID mapping, GitHub user information and other fields:

```python title="Authentication Data Model Fields"
class GitHubAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="User ID")
    thirdUserId = datatypes.Stext(name="thirdUserId", title="GitHub User ID")
    login = datatypes.Stext(name="login", title="GitHub Username")
    name = datatypes.Stext(name="name", title="Display Name")
    email = datatypes.Stext(name="email", title="Email")
    avatarUrl = datatypes.Stext(name="avatarUrl", title="Avatar URL")
    company = datatypes.Stext(name="company", title="Company")
    location = datatypes.Stext(name="location", title="Location")
    bio = datatypes.Stext(name="bio", title="Bio")
    createTime = datatypes.Datetime(name="createTime", title="Create Time")
```

### Frontend Integration
Frontend needs to implement OAuth authorization flow:

```typescript title="Frontend Login Implementation"
// PC OAuth Login
const loginWithGitHub = async () => {
    const config = await getLoginConfig(); // Get configuration
    const authUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=user:email&` +
        `state=${generateState()}`;
    
    // Redirect to GitHub login page
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
Configure application permissions in GitHub OAuth App:

```text title="Required OAuth Scopes"
GitHub OAuth Scopes:
- user (scope) - Access to user profile information
- user:email (scope) - Access to user email addresses
- read:user (scope) - Read access to user profile information
- user:follow (scope) - Access to follow/unfollow users
- public_repo (scope) - Access to public repositories (optional)
- repo (scope) - Full access to repositories (optional)
```

### Error Handling
Common error scenarios and handling methods:

```python title="Error Handling Example"
try:
    auth_element = auth_svc.getAuthByClientId(clientId)
    if not auth_element:
        raise Exception("GitHub authentication configuration not found")
    
    result = auth_svc.loginByOAuth(clientId, authCode, platform)
    if not result.get('success'):
        raise Exception(result.get('message', 'Login failed'))
        
except Exception as e:
    # Log error and return friendly message
    logger.error(f"GitHub login failed: {str(e)}")
    return {"success": False, "message": "Login failed, please try again"}
```

**Common Error Types**:
- Application configuration error: Check clientId, clientSecret and other configurations
- Authorization code expired: OAuth authorization code expires in 10 minutes, need to re-obtain
- Insufficient permissions: Ensure application has necessary GitHub OAuth scopes
- Network connection issues: Ensure access to GitHub API services
- Invalid redirect URI: Ensure redirect URI matches GitHub OAuth App configuration
- Rate limiting: GitHub API has rate limits, implement appropriate retry mechanisms

