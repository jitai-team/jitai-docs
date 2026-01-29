---
slug: feishu-organization
description: "Feishu Self-built Organization API reference documentation. Complete specifications, methods, and examples."
---
# Feishu Self-built Organization
Feishu Self-built Organization is an enterprise-level organizational structure integration type in the JitAuth framework, implementing organizational structure synchronization and user management based on Feishu self-built application APIs. It is responsible for Feishu contact synchronization, organizational information retrieval, and user authentication, supporting automatic organizational structure synchronization and user permission inheritance.

The Feishu Self-built Organization element hierarchy is Meta (corps.Meta) → Type (corps.FSInnerType) → Instance. Developers can quickly create Feishu Self-built Organization instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements, or override the official JitAI-provided corps.FSInnerType element in their own App to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
corps/
└── MyFeishuCorp/
    ├── e.json
    └── MyFeishuCorp.json
```

#### e.json File
```json title="e.json Configuration"
{
  "title": "My Feishu Organization",
  "type": "corps.FSInnerType"
}
```

#### Authentication Configuration File
```json title="MyFeishuCorp.json Configuration"
{
  "appId": "cli_1234567890abcdef",
  "appSecret": "your_app_secret_here"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get Feishu organization instance
corp = app.getElement("corps.MyFeishuCorp")

# Initialize organizational structure
corp.initCorp()

# Get root department
root_dept = corp.getRootDept()
print(f"Root department: {root_dept.name.value}")

# Get administrator list
admin_list = corp.getAdmin()
print(f"Administrators: {admin_list}")
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Required | Description |
|--------------|------|----------|-------------|
| title | string | Yes | Organization display name |
| type | string | Yes | Fixed value: corps.FSInnerType |

### Authentication Configuration (authConfig)
| Configuration | Type | Required | Description |
|--------------|------|----------|-------------|
| appId | string | Yes | Feishu application ID |
| appSecret | string | Yes | Feishu application Secret |

## Methods 
### initCorp
Initialize the organizational structure. Feishu self-built organizational structure initialization automatically synchronizes organizational structure data.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** None

```python title="Initialize Organizational Structure"
corp = app.getElement("corps.MyFeishuCorp")
corp.initCorp()
```

### syncCorp
Synchronize Feishu organizational structure data to local, including departments, members, roles, and other information.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** None

```python title="Synchronize Organizational Structure"
corp = app.getElement("corps.MyFeishuCorp")
corp.syncCorp()
```

### getThirdCorpData
Get third-party Feishu organizational structure data.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** dict - Complete data containing Feishu organizational structure

```python title="Get Third-party Organizational Structure Data"
corp = app.getElement("corps.MyFeishuCorp")
corp_data = corp.getThirdCorpData()
print(f"Number of users: {len(corp_data.get('userDict', {}))}")
```

### bulkRegister
Batch register users to the local system.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| corpData | JitDict | dict | Yes | Feishu organizational structure data |

**Return Value:** None

```python title="Batch Register Users"
corp = app.getElement("corps.MyFeishuCorp")
corp_data = corp.getThirdCorpData()
corp.bulkRegister(corp_data)
```

### getLocalCorpData
Get local user pool and third-party Feishu authentication information.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** dict - Complete data containing local organizational structure

```python title="Get Local Organizational Structure Data"
corp = app.getElement("corps.MyFeishuCorp")
local_data = corp.getLocalCorpData()
print(f"Number of local users: {len(local_data['userList'])}")
print(f"Number of local departments: {len(local_data['deptList'])}")
```

### getRootDept
Get root department information.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** RowData - Root department data object

```python title="Get Root Department"
corp = app.getElement("corps.MyFeishuCorp")
root_dept = corp.getRootDept()
print(f"Root department ID: {root_dept.deptId.value}")
print(f"Root department name: {root_dept.name.value}")
```

### setUserRole
Set user roles.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberId | Stext | str | Yes | User ID |
| roleIdList | JitList | list | Yes | Role ID list |

**Return Value:** list - List of role member relationship data

```python title="Set User Roles"
corp = app.getElement("corps.MyFeishuCorp")
result = corp.setUserRole(
    memberId="user001",
    roleIdList=["role001", "role002"]
)
print(f"Role setting result: {result}")
```

### offlineMember
Change member status to resigned, but does not affect member login in other organizational structures.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberIdList | JitList | list | Yes | List of member IDs to resign |

**Return Value:** None

```python title="Set Member Resignation"
corp = app.getElement("corps.MyFeishuCorp")
corp.offlineMember(["user001", "user002"])
```

### getUserSignature
Get user signature.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberId | Stext | str | Yes | User ID |

**Return Value:** dict - Dictionary containing signature information

```python title="Get User Signature"
corp = app.getElement("corps.MyFeishuCorp")
signature_info = corp.getUserSignature("user001")
print(f"Signature: {signature_info['signature']}")
```

### saveUserSignature
Save user signature.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberId | Stext | str | Yes | User ID |
| signature | Stext | str | Yes | Signature image link |

**Return Value:** dict - Success return information

```python title="Save User Signature"
corp = app.getElement("corps.MyFeishuCorp")
result = corp.saveUserSignature(
    memberId="user001",
    signature="https://example.com/signature.png"
)
print(f"Save result: {result}")
```

### setAdmin
Set organization leader, set administrators.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| memberIdList | JitList | list | Yes | List of administrator member IDs |

**Return Value:** dict - Empty dictionary

```python title="Set Administrators"
corp = app.getElement("corps.MyFeishuCorp")
corp.setAdmin(["admin001", "admin002"])
```

### getAdmin
Get the current organizational structure's administrator ID list.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** list - Administrator ID list

```python title="Get Administrator List"
corp = app.getElement("corps.MyFeishuCorp")
admin_list = corp.getAdmin()
print(f"Administrator list: {admin_list}")
```

### getCorpInfo
Get organizational structure information.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** dict - Organizational structure configuration information

```python title="Get Organizational Structure Information"
corp = app.getElement("corps.MyFeishuCorp")
corp_info = corp.getCorpInfo()
print(f"Organization name: {corp_info['title']}")
print(f"Full name: {corp_info['fullName']}")
```

### getClient
Get Feishu client.

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| - | - | - | - | No parameters |

**Return Value:** object - Feishu API client object

```python title="Get Feishu Client"
corp = app.getElement("corps.MyFeishuCorp")
client = corp.getClient()
# Use client to call Feishu APIs
```

## Properties
### corpData
Organizational structure data, containing complete organizational structure configuration information.

**Type:** dict  
**Access:** Read-only

```python title="Access Organizational Structure Data"
corp = app.getElement("corps.MyFeishuCorp")
print(f"Organizational structure data: {corp.corpData}")
```

### title
Organizational structure display title.

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Structure Title"
corp = app.getElement("corps.MyFeishuCorp")
print(f"Title: {corp.title}")
```

### fullName
Organizational structure full name (element identifier).

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Structure Full Name"
corp = app.getElement("corps.MyFeishuCorp")
print(f"Full name: {corp.fullName}")
```

### corpFullName
Alias of organizational structure full name, same as fullName.

**Type:** str  
**Access:** Read-only

```python title="Get Organizational Structure Full Name Alias"
corp = app.getElement("corps.MyFeishuCorp")
print(f"Organizational structure full name: {corp.corpFullName}")
```

### authConfig
Authentication configuration information, containing Feishu application authentication parameters.

**Type:** dict  
**Access:** Read-only

```python title="Get Authentication Configuration"
corp = app.getElement("corps.MyFeishuCorp")
print(f"Application ID: {corp.authConfig['appId']}")
print(f"Application Secret: {corp.authConfig['appSecret']}")
```

## Advanced Features
### Automatic Synchronization Configuration
Feishu Self-built Organization supports scheduled automatic synchronization of Feishu contact data, ensuring local organizational structure remains consistent with Feishu.

```python title="Configure Automatic Synchronization"
# Configure scheduled synchronization in task template
corp = app.getElement("corps.MyFeishuCorp")

# Synchronize organizational structure every hour
corp.syncCorp()
```

### Batch Operation Optimization
Supports batch processing of user registration and role assignment, improving performance for large-scale organizational structure synchronization.

```python title="Batch Operation Example"
corp = app.getElement("corps.MyFeishuCorp")

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
