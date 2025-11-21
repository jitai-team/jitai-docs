---
slug: wechat-work-organization
title: "WeCom Self-built Org. Reference"
description: "WeCom Self-built Org. Reference - API documentation for developers. Complete specifications, methods, and examples."
label: "WeCom Self-built Org."
sidebar_label: "WeCom Self-built Org."
---
# WeCom Self-built Org.
WeCom Self-built Org. is an enterprise-level organizational architecture integration type in the JitAuth framework, implementing organizational architecture synchronization and user management based on WeCom custom application API. It handles WeCom contact synchronization, organizational information retrieval, and user identity authentication, supporting automatic organizational architecture synchronization and user permission inheritance.

The hierarchical structure of WeCom Self-built Org. elements is Meta (corps.Meta) → Type (corps.QywxInnerType) → Instance. Developers can quickly create WeCom Self-built Org. instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `corps.QywxInnerType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
corps/
└── MyQywxCorp/
    ├── e.json
    └── MyQywxCorp.json
```

#### e.json File
```json title="e.json Configuration"
{
  "title": "My WeCom Organization",
  "type": "corps.QywxInnerType"
}
```

#### Authentication Configuration File
```json title="MyQywxCorp.json Configuration"
{
  "corpId": "ww1234567890abcdef",
  "agentId": "1000001",
  "secret": "your_secret_key_here"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get WeCom organization instance
corp = app.getElement("corps.MyQywxCorp")

# Initialize organizational architecture
corp.initCorp()

# Get root department
root_dept = corp.getRootDept()
print(f"Root Department: {root_dept.name.value}")

# Get administrator list
admin_list = corp.getAdmin()
print(f"Administrators: {admin_list}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Organization architecture display name |
| type | string | Yes | Fixed value: corps.QywxInnerType |

### Authentication Configuration (authConfig)
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| corpId | string | Yes | WeCom enterprise ID |
| agentId | string | Yes | WeCom application ID |
| secret | string | Yes | WeCom application Secret |

## Methods
### initCorp
Initialize organizational architecture, WeCom Self-built Org.al architecture initialization automatically syncs organizational architecture data.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** None

```python title="Initialize Organizational Architecture"
corp = app.getElement("corps.MyQywxCorp")
corp.initCorp()
```

### syncCorp
Sync WeCom organizational architecture data to local, including departments, members, roles, and other information.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** None

```python title="Sync Organizational Architecture"
corp = app.getElement("corps.MyQywxCorp")
corp.syncCorp()
```

### getThirdCorpData
Get third-party WeCom organizational architecture data.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** dict - Complete data containing WeCom organizational architecture

```python title="Get Third-Party Organizational Architecture Data"
corp = app.getElement("corps.MyQywxCorp")
corp_data = corp.getThirdCorpData()
print(f"User Count: {len(corp_data.get('userDict', {}))}")
```

### bulkRegister
Batch register users to local system.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| corpData | JitDict | dict | Yes | WeCom organizational architecture data |

**Return Value:** None

```python title="Batch Register Users"
corp = app.getElement("corps.MyQywxCorp")
corp_data = corp.getThirdCorpData()
corp.bulkRegister(corp_data)
```

### getLocalCorpData
Get local user pool and third-party enterprise authentication information.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** dict - Complete data containing local organizational architecture

```python title="Get Local Organizational Architecture Data"
corp = app.getElement("corps.MyQywxCorp")
local_data = corp.getLocalCorpData()
print(f"Local User Count: {len(local_data['userList'])}")
print(f"Local Department Count: {len(local_data['deptList'])}")
```

### getRootDept
Get root department information.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** RowData - Root department data object

```python title="Get Root Department"
corp = app.getElement("corps.MyQywxCorp")
root_dept = corp.getRootDept()
print(f"Root Department ID: {root_dept.deptId.value}")
print(f"Root Department Name: {root_dept.name.value}")
```

### setUserRole
Set user roles.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | Stext | str | Yes | User ID |
| roleIdList | JitList | list | Yes | Role ID list |

**Return Value:** list - Role member relationship data list

```python title="Set User Role"
corp = app.getElement("corps.MyQywxCorp")
result = corp.setUserRole(
    memberId="user001",
    roleIdList=["role001", "role002"]
)
print(f"Role Setting Result: {result}")
```

### offlineMember
Set members to resigned status, but does not affect member login in other organizational architectures.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | Yes | List of member IDs to resign |

**Return Value:** None

```python title="Set Members as Resigned"
corp = app.getElement("corps.MyQywxCorp")
corp.offlineMember(["user001", "user002"])
```

### getUserSignature
Get user signature.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | Stext | str | Yes | User ID |

**Return Value:** dict - Dictionary containing signature information

```python title="Get User Signature"
corp = app.getElement("corps.MyQywxCorp")
signature_info = corp.getUserSignature("user001")
print(f"Signature: {signature_info['signature']}")
```

### saveUserSignature
Save user signature.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | Stext | str | Yes | User ID |
| signature | Stext | str | Yes | Signature image link |

**Return Value:** dict - Success return information

```python title="Save User Signature"
corp = app.getElement("corps.MyQywxCorp")
result = corp.saveUserSignature(
    memberId="user001",
    signature="https://example.com/signature.png"
)
print(f"Save Result: {result}")
```

### setAdmin
Set organization administrators, set administrators.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | Yes | Administrator member ID list |

**Return Value:** dict - Empty dictionary

```python title="Set Administrators"
corp = app.getElement("corps.MyQywxCorp")
corp.setAdmin(["admin001", "admin002"])
```

### getAdmin
Get current organizational architecture administrator ID list.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** list - Administrator ID list

```python title="Get Administrator List"
corp = app.getElement("corps.MyQywxCorp")
admin_list = corp.getAdmin()
print(f"Administrator List: {admin_list}")
```

### getCorpInfo
Get organizational architecture information.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** dict - Organizational architecture configuration information

```python title="Get Organizational Architecture Information"
corp = app.getElement("corps.MyQywxCorp")
corp_info = corp.getCorpInfo()
print(f"Organizational Architecture Name: {corp_info['title']}")
print(f"Full Name: {corp_info['fullName']}")
```

### getClient
Get WeCom client.

| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| - | - | - | - | No parameters |

**Return Value:** object - WeCom API client object

```python title="Get WeCom Client"
corp = app.getElement("corps.MyQywxCorp")
client = corp.getClient()
# Use client to call WeCom API
```

## Properties
### corpData
Organizational architecture data, containing complete organizational architecture configuration information.

**Type:** dict  
**Access:** Read-only

```python title="Access Organizational Architecture Data"
corp = app.getElement("corps.MyQywxCorp")
print(f"Organizational Architecture Data: {corp.corpData}")
```

### title
Organizational architecture display title.

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Architecture Title"
corp = app.getElement("corps.MyQywxCorp")
print(f"Title: {corp.title}")
```

### fullName
Organizational architecture full name (element identifier).

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Architecture Full Name"
corp = app.getElement("corps.MyQywxCorp")
print(f"Full Name: {corp.fullName}")
```

### corpFullName
Organizational architecture full name alias, same as fullName.

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Architecture Full Name Alias"
corp = app.getElement("corps.MyQywxCorp")
print(f"Organizational Architecture Full Name: {corp.corpFullName}")
```

### authConfig
Authentication configuration information, containing WeCom application authentication parameters.

**Type:** dict  
**Access:** Read-only

```python title="Get Authentication Configuration"
corp = app.getElement("corps.MyQywxCorp")
print(f"Enterprise ID: {corp.authConfig['corpId']}")
print(f"Application ID: {corp.authConfig['agentId']}")
```

## Advanced Features
### Automatic Sync Configuration
WeCom Self-built Org. supports scheduled automatic synchronization of WeCom contact data, ensuring local organizational architecture remains consistent with WeCom.

```python title="Configure Automatic Sync"
# Configure scheduled sync in task template
corp = app.getElement("corps.MyQywxCorp")

# Sync organizational architecture every hour
corp.syncCorp()
```

### Batch Operation Optimization
Supports batch processing of user registration and role assignment, improving performance of large-scale organizational architecture synchronization.

```python title="Batch Operation Example"
corp = app.getElement("corps.MyQywxCorp")

# Get third-party data
corp_data = corp.getThirdCorpData()

# Batch register users
corp.bulkRegister(corp_data)

# Batch set administrators
admin_ids = ["admin001", "admin002", "admin003"]
corp.setAdmin(admin_ids)

# Batch resignation processing
offline_ids = ["user001", "user002"]
corp.offlineMember(offline_ids)
```