---
slug: dingtalk-organization
title: "DingTalk Self-built Org. Reference"
description: "DingTalk Self-built Org. Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "DingTalk Self-built Org."
---
# DingTalk Self-built Org.
DingTalk Self-built Org. is a specialized organization type in the JitAuth framework for integrating DingTalk enterprise internal application organizational architecture, implemented based on DingTalk Open Platform API to achieve automatic synchronization and unified management of enterprise organizational architecture. It handles DingTalk contact synchronization, department structure retrieval, and user identity authentication, supporting seamless integration with DingTalk workspace and providing enterprise-level permission management and user relationship maintenance capabilities.

The hierarchical structure of DingTalk Self-built Org. elements is Meta (corps.Meta) → Type (corps.DDInnerType) → Instance. Developers can quickly create DingTalk Self-built Org. instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `corps.DDInnerType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
corps/
└── testNailDivision/
    ├── e.json                    # Element configuration file
    └── testNailDivision.json     # Business configuration file
```

#### e.json File
```json title="Element Configuration Example"
{
  "title": "Test DingTalk Organization",
  "type": "corps.DDInnerType",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./testNailDivision.json",
  "fullName": "corps.testNailDivision"
}
```

#### Business Configuration File
```json title="Business Configuration Example - testNailDivision.json"
{
  "authConfig": {
    "corpId": "ding12345678",
    "agentId": "1234567890",
    "appKey": "dingxxxxxxxxxxxxxxx", 
    "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Usage Example
```python title="Getting and Using DingTalk Self-built Org."
# Get DingTalk Self-built Org. instance
nail_corp = app.getElement("corps.testNailDivision")

# Sync organizational architecture
nail_corp.syncCorp()

# Get root department
root_dept = nail_corp.getRootDept()
print(f"Root Department: {root_dept.name}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | str | Yes | Organization name, used for display identification |
| type | str | Yes | Fixed value "corps.DDInnerType" |
| backendBundleEntry | str | Yes | Backend entry point, usually "." |
| frontBundleEntry | str | Yes | Frontend entry point, points to business configuration file |
| fullName | str | Yes | Element full name, format "corps.[instance name]" |

### Business Configuration File
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| authConfig.corpId | str | Yes | DingTalk enterprise ID, obtained from DingTalk developer backend |
| authConfig.agentId | str | Yes | DingTalk application AgentId |
| authConfig.appKey | str | Yes | DingTalk application AppKey |
| authConfig.appSecret | str | Yes | DingTalk application AppSecret |

## Methods
### bulkRegister
Batch register and update user binding relationships for organization members.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| corpData | CorpData | dict | Yes | Organization data object |
| memberList | list | list | No | Member model object list, defaults to None |

#### Return Value
| Type | Description |
|------|------|
| None | No return value |

#### Usage Example
```python title="Batch Register Members"
nail_corp = app.getElement("corps.testNailDivision")

# Get organization data
corp_data = nail_corp.getThirdCorpData()

# Batch register all members
nail_corp.bulkRegister(corp_data)
print("Member registration completed")
```

### getAdmin
Get the administrator ID list of the current organizational architecture.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| list | list | Administrator ID list |

#### Usage Example
```python title="Get Organization Administrators"
nail_corp = app.getElement("corps.testNailDivision")
admin_ids = nail_corp.getAdmin()
print(f"Administrator ID list: {admin_ids}")
```

### getClient
Get DingTalk API client instance for communicating with DingTalk Open Platform.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| DDInnerClient | object | DingTalk API client object |

#### Usage Example
```python title="Get DingTalk Client"
nail_corp = app.getElement("corps.testNailDivision")
client = nail_corp.getClient()

# Client is used for internal API calls, usually no need to use directly
```

### getCorpInfo
Get organization configuration information.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| dict | dict | Organization configuration information dictionary |

#### Usage Example
```python title="Get Organization Information"
nail_corp = app.getElement("corps.testNailDivision")
corp_info = nail_corp.getCorpInfo()
print(f"Organization information: {corp_info}")
```

### getLocalCorpData
Get complete data of local user pool and enterprise authentication information.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| dict | dict | Dictionary containing complete organizational data including users, departments, roles, etc. |

#### Usage Example
```python title="Get Local Organization Data"
nail_corp = app.getElement("corps.testNailDivision")
local_data = nail_corp.getLocalCorpData()

# Access different types of data
print(f"User list: {local_data['userList']}")
print(f"Department list: {local_data['deptList']}")
print(f"Role list: {local_data['roleList']}")
```

### getRootDept
Get root department information of the organizational architecture.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| CorpDept | dict | Root department model object, containing basic department information |

#### Usage Example
```python title="Get Root Department"
nail_corp = app.getElement("corps.testNailDivision")
root_dept = nail_corp.getRootDept()

# Access root department attributes
print(f"Department ID: {root_dept.deptId}")
print(f"Department name: {root_dept.name}")
print(f"Organization name: {root_dept.corpFullName}")
```

### getThirdCorpData
Get raw data of DingTalk third-party organizational architecture.

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| CorpData | dict | DingTalk organization data object, containing complete organizational architecture information |

#### Usage Example
```python title="Get Third-Party Organization Data"
nail_corp = app.getElement("corps.testNailDivision")
corp_data = nail_corp.getThirdCorpData()

# Access organization data attributes
print(f"Enterprise ID: {corp_data.corpId}")
print(f"User dictionary: {corp_data.userDict}")
print(f"Department data: {corp_data.deptDict}")
```

### getUserSignature
Get signature information for a specified user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | str | str | Yes | User member ID |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| dict | dict | Dictionary containing signature field |

#### Usage Example
```python title="Get User Signature"
nail_corp = app.getElement("corps.testNailDivision")
signature_info = nail_corp.getUserSignature("member123")
print(f"User signature: {signature_info['signature']}")
```

### initCorp
Initialize DingTalk organizational architecture, automatically called when creating an instance to sync organization data.

#### Return Value
| Type | Description |
|------|------|
| None | No return value |

#### Usage Example
```python title="Initialize Organizational Architecture"
nail_corp = app.getElement("corps.testNailDivision")
# Initialization method is automatically called when element is created, usually no need to call manually
nail_corp.initCorp()
```

### offlineMember
Set specified members to offline status, but does not affect member login in other organizational architectures.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | list | list | Yes | Member ID list |

#### Return Value
| Type | Description |
|------|------|
| None | No return value |

#### Usage Example
```python title="Offline Members"
nail_corp = app.getElement("corps.testNailDivision")
nail_corp.offlineMember(["member123", "member456"])
print("Member offline operation completed")
```

### saveUserSignature
Save signature information for a specified user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | str | str | Yes | User member ID |
| signature | str | str | Yes | Signature image link |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| dict | dict | Success return identifier |

#### Usage Example
```python title="Save User Signature"
nail_corp = app.getElement("corps.testNailDivision")
result = nail_corp.saveUserSignature("member123", "https://example.com/signature.png")
print("Signature saved successfully")
```

### setAdmin
Set organization administrators, specify administrators.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | list | list | Yes | Member ID list |

#### Return Value
| Type | Corresponding Native Type | Description |
|------|-------------|------|
| dict | dict | Empty dictionary indicates success |

#### Usage Example
```python title="Set Organization Administrators"
nail_corp = app.getElement("corps.testNailDivision")
result = nail_corp.setAdmin(["member123", "member456"])
print("Administrator set successfully")
```

### syncCorp
Sync DingTalk organizational architecture data, including complete synchronization of department structure, user information, and role relationships.

#### Return Value
| Type | Description |
|------|------|
| None | No return value |

#### Usage Example
```python title="Sync Organizational Architecture"
nail_corp = app.getElement("corps.testNailDivision")

try:
    nail_corp.syncCorp()
    print("Organizational architecture sync successful")
except Exception as e:
    print(f"Sync failed: {e}")
```

## Properties
### authConfig
DingTalk authentication configuration information, containing key parameters required for connecting to DingTalk Open Platform.

### corpData
Complete configuration data of the organization, containing all element configuration information.

### corpFullName
Full name of the organization element, used to uniquely identify the organization instance in the system.

### fullName
Full name of the organization element, same as corpFullName.

### title
Display name of the organization, used for user interface display and logging.

## Advanced Features
### Automatic Sync Mechanism
DingTalk Self-built Org. automatically executes organizational architecture synchronization during initialization, ensuring local data consistency with DingTalk servers. The sync process includes error handling and data integrity validation, supporting efficient synchronization of large-scale organizational architectures.

```python title="Automatic Sync Configuration"
# Automatically trigger sync when creating instance
nail_corp = app.getElement("corps.testNailDivision")
# System automatically executes: initCorp() -> syncCorp() -> bulkRegister()
```

### User Identity Binding
Based on DingTalk unionId to achieve unique identification and cross-organization management of user identities, automatically maintaining binding relationships between local users and DingTalk users, supporting dynamic updates of user authentication information and permission inheritance.

```python title="User Binding Management"
# Automatically handle user binding during sync
nail_corp.syncCorp()

# System automatically handles:
# 1. Identify user uniqueness based on unionId
# 2. Create or update local user accounts
# 3. Maintain DingTalk authentication information table
# 4. Set organization member relationships
```