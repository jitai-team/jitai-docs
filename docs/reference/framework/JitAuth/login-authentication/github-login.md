---
slug: github-login
---
# GitHub Login
GitHub Login (GitHubType) is an authentication element built on the GitHub platform that supports OAuth authorization for both PC and mobile environments. It manages the complete GitHub OAuth flow, user authentication, and account binding processes, making it ideal for developer communities, technical products, open-source project management, and other scenarios requiring unified identity management.

GitHub login elements follow a hierarchical structure: Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.GitHubType) → Instance. Developers can rapidly create GitHub login instances using JitAi's visual development tools.

**Supported authentication methods**:
- PC OAuth authorization login - Redirects users to GitHub's authorization page
- Mobile OAuth authorization login - Integrates GitHub OAuth services for mobile applications
- GitHub Enterprise integration - Supports GitHub Enterprise Server authentication

Developers can also create custom Type elements or extend the official auths.loginTypes.GitHubType element within their applications to implement custom authentication workflows.

## Quick Start {#quick-start}
### Creating instance elements {#creating-instance-elements}
#### Directory structure {#directory-structure}
```text title="Recommended directory structure"
your_app/
└── auths/
    └── loginTypes/
        └── testGitHubLogin/           # Custom instance name
            ├── e.json                # Element definition file
            └── testGitHubLogin.json   # GitHub application configuration file
```

#### e.json file {#e-json-file}
```json title="Element definition file"
{
  "title": "GitHub Login",
  "type": "auths.loginTypes.GitHubType"
}
```

#### Business configuration file {#business-configuration-file}
```json title="testGitHubLogin.json - GitHub application configuration"
{
  "authConfig": {
    "clientId": "Ov23xxxxxxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage example {#usage-example}
```python title="Retrieving and using authentication elements"
# Retrieve authentication element instance
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")

# Get login configuration (used for frontend OAuth URL generation)
login_config = auth_element.getLoginConfig()
print(login_config)  # {"clientId": "your_client_id"}

# Get GitHub client instance
client = auth_element.getClient()

# Perform OAuth login through authentication element
result = auth_element.getLoginCode(code="authorization_code_from_github")
```

## Element Configuration {#element-configuration}
### e.json configuration {#e-json-configuration}
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.GitHubType |

### Business configuration file setup {#business-configuration-file-setup}
The configuration file follows the naming pattern `{instance_name}.json` and contains GitHub application authentication credentials:

| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| authConfig.clientId | string | Yes | GitHub OAuth App client ID |
| authConfig.clientSecret | string | Yes | GitHub OAuth App client secret |

**How to obtain configuration credentials**:
1. Sign in to GitHub (https://github.com/)
2. Navigate to "Settings" → "Developer settings" → "OAuth Apps"
3. Create a new OAuth App or select an existing application
4. Retrieve the Client ID and Client Secret from the application details page
5. Configure the Authorization callback URL for your application

## Methods {#methods}
### getLoginConfig {#getloginconfig}
Retrieves login configuration data, primarily used for generating OAuth authorization URLs in frontend applications.

#### Return value {#getloginconfig-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Dictionary containing clientId and other configurations |

#### Usage example {#getloginconfig-usage-example}
```python title="Retrieving login configuration"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
config = auth_element.getLoginConfig()
# Returns: {"clientId": "Ov23xxxxxxxxxxxxxxxx"}
```

### getClient {#getclient}
Returns a GitHub API client instance for making calls to GitHub-related endpoints.

#### Return value {#getclient-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| GitHubClient | object | GitHub client object |

#### Usage example {#getclient-usage-example}
```python title="Retrieving GitHub client"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
client = auth_element.getClient()
# Use this client to make GitHub API calls
```

### getLoginCode {#getlogincode}
Processes GitHub OAuth authorization codes to generate login codes. This is the core authentication method for the element.

#### Parameter details {#getlogincode-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| code | Stext | str | Yes | GitHub OAuth2 authorization code |

#### Return value {#getlogincode-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | Contains loginCode and corpList for authentication results |

#### Usage example {#getlogincode-usage-example}
```python title="OAuth authentication"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
result = auth_element.getLoginCode(code="auth_code_from_github")
# Returns: {"loginCode": "...", "corpList": [...]}
```

### getUserInfoByCode {#getuserinfobycode}
Retrieves GitHub user information using an OAuth authorization code.

#### Parameter details {#getuserinfobycode-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| code | Stext | str | Yes | GitHub OAuth2 authorization code |

#### Return value {#getuserinfobycode-return-value}
| Type | Corresponding Native Type | Description |
|------|---------------------------|-------------|
| JitDict | dict | GitHub user information dictionary |

#### Usage example {#getuserinfobycode-usage-example}
```python title="Retrieving user information"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code_from_github")
# Returns GitHub user data including email, name, avatar_url, etc.
```

### bind {#bind}
Binds a GitHub user account to an existing user account.

#### Parameter details {#bind-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| userId | Stext | str | Yes | User ID |
| userInfo | JitDict | dict | Yes | GitHub user information |

#### Usage example {#bind-usage-example}
```python title="Binding GitHub account"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
user_info = auth_element.getUserInfoByCode(code="auth_code")
auth_element.bind(userId="user_id", userInfo=user_info)
```

### unbind {#unbind}
Unbinds a GitHub user account.

#### Parameter details {#unbind-parameter-details}
| Parameter | Type | Corresponding Native Type | Required | Description |
|-----------|------|---------------------------|----------|-------------|
| userId | Stext | str | Yes | User ID |

#### Usage example {#unbind-usage-example}
```python title="Unbinding GitHub account"
auth_element = app.getElement("auths.loginTypes.testGitHubLogin")
auth_element.unbind(userId="user_id")
```

## Properties {#properties}
### authConfig {#authconfig}
Contains GitHub application configuration data, including clientId, clientSecret, and other authentication parameters.

| Property | Type | Description |
|----------|------|-------------|
| clientId | str | GitHub OAuth App client ID |
| clientSecret | str | GitHub OAuth App client secret |

### authType {#authtype}
Authentication type identifier with a fixed value representing the GitHub login type enumeration.

### authModelElemName {#authmodelelemname}
References the associated authentication data model element name, which points to GitHubAuthModel.

## Advanced Features {#advanced-features}
### Data model extension {#data-model-extension}
GitHubAuthModel stores GitHub user authentication data using a simplified field structure:

```python title="Authentication data model fields"
class GitHubAuthModel(NormalModel):
    id = datatypes.AutoInt(name="id", title="Primary Key ID", primaryKey=True)
    userId = datatypes.Stext(name="userId", title="UserID")
    email = datatypes.Stext(name="email", title="GitHub email")
    userInfo = datatypes.JitDict(name="userInfo", title="User information dictionary")
    createTime = datatypes.Datetime(name="createTime", title="Creation Time")
    updateTime = datatypes.Datetime(name="updateTime", title="Update Time")
```

**Field descriptions**:
- `userInfo` field stores complete GitHub user information as a dictionary, including:
  - `id`: GitHub user ID
  - `login`: GitHub username
  - `name`: Display name
  - `avatar_url`: Avatar URL
  - `company`: Company
  - `location`: Location
  - `bio`: Biography
  - Additional fields returned by the GitHub API

### Frontend integration {#frontend-integration}
Frontend applications must implement the OAuth authorization flow:

```typescript title="Frontend login implementation"
// PC OAuth login
const loginWithGitHub = async () => {
    const config = await getLoginConfig(); // Retrieve configuration
    const authUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=user:email&` +
        `state=${generateState()}`;
    
    // Redirect to GitHub authorization page
    window.location.href = authUrl;
};

// Handle OAuth callback
const handleOAuthCallback = async (code: string, state: string) => {
    try {
        // Step 1: Get login code through authentication element
        const authElement = app.getElement("auths.loginTypes.testGitHubLogin");
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
Configure application permissions in your GitHub OAuth App:

```text title="Required OAuth scopes"
GitHub OAuth scopes:
- user (scope) - Access user profile information
- user:email (scope) - Access user email addresses
- read:user (scope) - Read user profile information
- user:follow (scope) - Access follow/unfollow functionality
- public_repo (scope) - Access public repositories (optional)
- repo (scope) - Access all repositories (optional)
```
