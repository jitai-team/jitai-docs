---
slug: microsoft-teams-organization
title: Microsoft Teams Organization
---
# Microsoft Teams Organization {#microsoft-teams-organization}
Microsoft Teams Organization is a specialized organization type in the JitAuth framework for integrating Microsoft Teams enterprise internal application organization architecture, implementing automatic synchronization and unified management of enterprise organization architecture based on Microsoft Graph API. It handles Microsoft Teams directory synchronization, department structure retrieval, and user authentication, supporting seamless integration with Microsoft Teams workspace and providing enterprise-level permission management and user relationship maintenance capabilities.

The Microsoft Teams organization element hierarchy is Meta (corps.Meta) → Type (corps.MicrosoftTeamsType) → Instance. Developers can quickly create Microsoft Teams organization instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or override the corps.MicrosoftTeamsType element officially provided by JitAi in their own applications to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
corps/
└── testTeamsOrg/
    ├── e.json                    # Element configuration file
    └── testTeamsOrg.json         # Business configuration file
```

#### e.json File
```json title="Element Configuration Example"
{
  "title": "Test Teams Organization",
  "type": "corps.MicrosoftTeamsType",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./testTeamsOrg.json",
  "fullName": "corps.testTeamsOrg"
}
```

#### Business Configuration File
```json title="Business Configuration Example - testTeamsOrg.json"
{
  "authConfig": {
    "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage Example
```python title="Getting and Using Microsoft Teams Organization"
# Get Microsoft Teams organization instance
teams_corp = app.getElement("corps.testTeamsOrg")

# Synchronize organization structure
teams_corp.syncCorp()

# Get root department
root_dept = teams_corp.getRootDept()
print(f"Root department: {root_dept.name}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| title | str | Yes | Organization name for display identification |
| type | str | Yes | Fixed value "corps.MicrosoftTeamsType" |
| backendBundleEntry | str | Yes | Backend entry point, usually "." |
| frontBundleEntry | str | Yes | Frontend entry point, pointing to business configuration file |
| fullName | str | Yes | Complete element name in format "corps.[instance_name]" |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| authConfig.tenantId | str | Yes | Microsoft Azure tenant ID obtained from Azure management console |
| authConfig.clientId | str | Yes | Client ID of Azure application |
| authConfig.clientSecret | str | Yes | Client secret of Azure application |

## Methods 
### bulkRegister
Batch register and update user binding relationships for organization members.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| corpData | CorpData | dict | Yes | Organization data object |
| memberList | list | list | No | Member model object list, defaults to None |

#### Return Value
| Type | Description |
|------|-------------|
| None | No return value |

#### Usage Example
```python title="Batch Register Members"
teams_corp = app.getElement("corps.testTeamsOrg")

# Get organization data
corp_data = teams_corp.getThirdCorpData()

# Batch register all members
teams_corp.bulkRegister(corp_data)
print("Member registration completed")
```

### getAdmin
Get the administrator ID list for the current organization structure.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| list | list | Administrator ID list |

#### Usage Example
```python title="Get Organization Administrators"
teams_corp = app.getElement("corps.testTeamsOrg")
admin_ids = teams_corp.getAdmin()
print(f"Administrator ID list: {admin_ids}")
```

### getClient
Get Microsoft Graph API client instance for communicating with Microsoft Teams platform.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| MicrosoftTeamsClient | object | Microsoft Graph API client object |

#### Usage Example
```python title="Get Teams Client"
teams_corp = app.getElement("corps.testTeamsOrg")
client = teams_corp.getClient()

# Client is used for internal API calls, usually no need to use directly
```

### getCorpInfo
Get organization configuration information.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| dict | dict | Organization configuration information dictionary |

#### Usage Example
```python title="Get Organization Information"
teams_corp = app.getElement("corps.testTeamsOrg")
corp_info = teams_corp.getCorpInfo()
print(f"Organization information: {corp_info}")
```

### getLocalCorpData
Get complete data of local user pool and enterprise authentication information.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| dict | dict | Dictionary containing complete organization data including users, departments, roles, etc. |

#### Usage Example
```python title="Get Local Organization Data"
teams_corp = app.getElement("corps.testTeamsOrg")
local_data = teams_corp.getLocalCorpData()

# Access different types of data
print(f"User list: {local_data['userList']}")
print(f"Department list: {local_data['deptList']}")
print(f"Role list: {local_data['roleList']}")
```

### getRootDept
Get root department information of the organization structure.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| CorpDept | dict | Root department model object containing basic department information |

#### Usage Example
```python title="Get Root Department"
teams_corp = app.getElement("corps.testTeamsOrg")
root_dept = teams_corp.getRootDept()

# Access root department attributes
print(f"Department ID: {root_dept.deptId}")
print(f"Department name: {root_dept.name}")
print(f"Organization name: {root_dept.corpFullName}")
```

### getThirdCorpData
Get raw data of Microsoft Teams third-party organization structure.

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| CorpData | dict | Microsoft Teams organization data object containing complete organization structure information |

#### Usage Example
```python title="Get Third-party Organization Data"
teams_corp = app.getElement("corps.testTeamsOrg")
corp_data = teams_corp.getThirdCorpData()

# Access organization data attributes
print(f"Tenant ID: {corp_data.tenantId}")
print(f"User dictionary: {corp_data.userDict}")
print(f"Department data: {corp_data.deptDict}")
```

### getUserSignature
Get signature information for a specified user.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberId | str | str | Yes | User member ID |

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| dict | dict | Dictionary containing signature field |

#### Usage Example
```python title="Get User Signature"
teams_corp = app.getElement("corps.testTeamsOrg")
signature_info = teams_corp.getUserSignature("member123")
print(f"User signature: {signature_info['signature']}")
```

### initCorp
Initialize Microsoft Teams organization structure. This method is automatically called when creating an instance to synchronize organization data.

#### Return Value
| Type | Description |
|------|-------------|
| None | No return value |

#### Usage Example
```python title="Initialize Organization Structure"
teams_corp = app.getElement("corps.testTeamsOrg")
# Initialization method is automatically called when element is created, usually no need to call manually
teams_corp.initCorp()
```

### offlineMember
Set specified members to offline status without affecting their login in other organization structures.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberIdList | list | list | Yes | Member ID list |

#### Return Value
| Type | Description |
|------|-------------|
| None | No return value |

#### Usage Example
```python title="Offline Members"
teams_corp = app.getElement("corps.testTeamsOrg")
teams_corp.offlineMember(["member123", "member456"])
print("Member offline operation completed")
```

### saveUserSignature
Save signature information for a specified user.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberId | str | str | Yes | User member ID |
| signature | str | str | Yes | Signature image link |

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| dict | dict | Success return identifier |

#### Usage Example
```python title="Save User Signature"
teams_corp = app.getElement("corps.testTeamsOrg")
result = teams_corp.saveUserSignature("member123", "https://example.com/signature.png")
print("Signature saved successfully")
```

### setAdmin
Set organization administrators.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberIdList | list | list | Yes | Member ID list |

#### Return Value
| Type | Native Type | Description |
|------|-------------|-------------|
| dict | dict | Empty dictionary indicates success |

#### Usage Example
```python title="Set Organization Administrators"
teams_corp = app.getElement("corps.testTeamsOrg")
result = teams_corp.setAdmin(["member123", "member456"])
print("Administrators set successfully")
```

### syncCorp
Synchronize Microsoft Teams organization structure data, including complete synchronization of department structure, user information, and role relationships.

#### Return Value
| Type | Description |
|------|-------------|
| None | No return value |

#### Usage Example
```python title="Synchronize Organization Structure"
teams_corp = app.getElement("corps.testTeamsOrg")

try:
    teams_corp.syncCorp()
    print("Organization structure synchronized successfully")
except Exception as e:
    print(f"Synchronization failed: {e}")
```

## Properties
### authConfig
Microsoft Teams authentication configuration information containing key parameters required to connect to Microsoft Graph API.

### corpData
Complete configuration data of the organization, containing all element configuration information.

### corpFullName
Complete name of the organization element, used to uniquely identify this organization instance in the system.

### fullName
Complete name of the organization element, same as corpFullName.

### title
Display name of the organization, used for user interface display and logging.

## Advanced Features
### Automatic Synchronization Mechanism
Microsoft Teams organization automatically executes organization structure synchronization during initialization, ensuring local data remains consistent with Microsoft Teams servers. The synchronization process includes error handling and data integrity validation, supporting efficient synchronization of large-scale organization structures.

```python title="Automatic Synchronization Configuration"
# Automatically trigger synchronization when creating instance
teams_corp = app.getElement("corps.testTeamsOrg")
# System automatically executes: initCorp() -> syncCorp() -> bulkRegister()
```

### User Identity Binding
Implement unique user identity identification and cross-organization management based on Microsoft Azure user IDs, automatically maintain binding relationships between local users and Microsoft Teams users, supporting dynamic updates of user authentication information and permission inheritance.

```python title="User Binding Management"
# Automatically handle user binding during synchronization
teams_corp.syncCorp()

# System automatically handles:
# 1. Identify user uniqueness based on Azure user ID
# 2. Create or update local user accounts
# 3. Maintain Microsoft Teams authentication information table
# 4. Set organization member relationships
```

### Permission Integration
Through Microsoft Graph API permission system, achieve deep integration with Azure Active Directory, supporting role-based access control and cross-platform single sign-on, ensuring enterprise data security and compliance requirements.

```python title="Permission Integration Example"
# Get user's Azure AD role information
teams_corp = app.getElement("corps.testTeamsOrg")
corp_data = teams_corp.getThirdCorpData()

# System automatically handles:
# 1. Synchronize Azure AD user roles
# 2. Map enterprise permission system
# 3. Maintain cross-platform permission consistency
# 4. Support conditional access policies
```
