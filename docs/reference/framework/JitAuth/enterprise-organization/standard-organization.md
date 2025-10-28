---
slug: standard-organization
title: "Generic Organization Reference"
description: "Generic Organization Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Generic Organization"
---
# Generic Organization
Generic organization is an enterprise organizational architecture management element in the JitAuth framework, implementing enterprise personnel management based on department hierarchical structure and role permission system. It handles organizational architecture maintenance, member management, and permission assignment, supporting department hierarchical management, role permission control, and member status management.

The hierarchical structure of standard organization elements is Meta (corps.Meta) → Type (corps.NormalType) → Instance. Developers can quickly create standard organization instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `corps.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
Recommended directory structure for standard organization instance elements:

```
corps/
├── Default/                  # Instance element directory (customizable)
│   ├── e.json               # Element configuration file
│   └── Default.json         # Business configuration file (optional)
```

#### e.json File
```json title="Basic Configuration Example"
{
  "allowJoin": 1,
  "backendBundleEntry": ".",
  "frontBundleEntry": "./Default.json",
  "refSpace": false,
  "title": "Default Organization Architecture",
  "type": "corps.NormalType"
}
```

#### Business Configuration File
```json title="Default.json Configuration Example"
{
  "firstMember": {
    "memberId": "admin123",
    "nick": "Administrator",
    "password": "admin123",
    "userId": "admin123",
    "username": "admin123"
  }
}
```

#### Usage Example
```python title="Getting Organization Instance"
# Get standard organization instance
corp = app.getElement("corps.Default")

# Initialize organization
result = corp.initCorp()

# Get organization information
corp_info = corp.getCorpInfo()
print(f"Organization Name: {corp_info['title']}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| allowJoin | int | No | Whether to allow users to join, 1: allow, 0: not allow |
| backendBundleEntry | str | Yes | Backend entry, fixed as "." |
| frontBundleEntry | str | No | Frontend configuration file path |
| refSpace | bool | No | Whether to reference space, default false |
| title | str | Yes | Organization display name |
| type | str | Yes | Element type, fixed as "corps.NormalType" |

### Business Configuration File
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| firstMember | dict | No | First administrator user configuration |
| firstMember.memberId | str | Yes | Member ID |
| firstMember.nick | str | Yes | Display nickname |
| firstMember.password | str | No | Login password |
| firstMember.userId | str | Yes | User ID |
| firstMember.username | str | No | Login username |

## Methods
### initCorp
Initialize organizational architecture, create root department and add first administrator user.

#### Parameter Details
No parameters

#### Return Value
| Type | Description |
|------|------|
| dict | Success returns standard success result |

#### Usage Example
```python title="Initialize Organization"
corp = app.getElement("corps.Default")
result = corp.initCorp()
```

### addMember
Add organization members, support setting departments and roles, can create authentication information simultaneously.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| nick | Stext | str | Yes | User display nickname |
| deptIdList | JitList | list | Yes | Department ID list |
| roleIdList | JitList | list | No | Role ID list |
| phone | Phone | str | No | Phone number |
| username | Stext | str | No | Login username |
| password | Stext | str | No | Login password (MD5 format) |
| memberId | Stext | str | No | Specify member ID |
| userId | Stext | str | No | Specify user ID |

#### Return Value
| Type | Description |
|------|------|
| dict | Dictionary containing newly created member information |

#### Usage Example
```python title="Add Member"
corp = app.getElement("corps.Default")

# Add regular member
member_data = corp.addMember(
    nick="Zhang San",
    deptIdList=["dept001"],
    roleIdList=["role001"],
    phone="13800138000",
    username="zhangsan",
    password="123456"
)
```

### createDept
Create organization department.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Department name |
| parentId | Stext | str | No | Parent department ID, defaults to root department |

#### Return Value
| Type | Description |
|------|------|
| RowData | Newly created department object |

#### Usage Example
```python title="Create Department"
corp = app.getElement("corps.Default")

# Create first-level department
dept = corp.createDept(name="Technology Department")

# Create sub-department
sub_dept = corp.createDept(name="Frontend Group", parentId=dept.deptId.value)
```

### updateDept
Update department information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| deptId | Stext | str | Yes | Department ID |
| name | Stext | str | Yes | New department name |
| parentId | Stext | str | No | New parent department ID |

#### Return Value
| Type | Description |
|------|------|
| RowData | Updated department object |

#### Usage Example
```python title="Update Department"
corp = app.getElement("corps.Default")

# Update department name
updated_dept = corp.updateDept(
    deptId="dept001",
    name="Technology R&D Department"
)
```

### deleteDept
Delete department.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| deptId | Stext | str | Yes | Department ID to delete |

#### Return Value
| Type | Description |
|------|------|
| dict | Success returns standard success result |

#### Usage Example
```python title="Delete Department"
corp = app.getElement("corps.Default")

# Delete department (ensure no sub-departments and members)
result = corp.deleteDept(deptId="dept001")
```

### setDeptLeaderByDept
Set department leader.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| deptId | Stext | str | Yes | Department ID |
| memberIdList | JitList | list | Yes | Leader member ID list |

#### Return Value
| Type | Description |
|------|------|
| list | Updated department member relationship list |

#### Usage Example
```python title="Set Department Leader"
corp = app.getElement("corps.Default")

# Set department leader
leaders = corp.setDeptLeaderByDept(
    deptId="dept001",
    memberIdList=["member001", "member002"]
)
```

### createRole
Create role.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Role name |
| roleGroupId | Stext | str | Yes | Role group ID |

#### Return Value
| Type | Description |
|------|------|
| RowData | Newly created role object |

#### Usage Example
```python title="Create Role"
corp = app.getElement("corps.Default")

# Create role
role = corp.createRole(
    name="Project Manager",
    roleGroupId="group001"
)
```

### updateUserInfo
Update member information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberId | Stext | str | Yes | Member ID |
| **updateDict | JitDict | dict | Yes | Update field dictionary |

Allowed update fields: nick, phone, email, photo, gender, extendConf

#### Return Value
No return value

#### Usage Example
```python title="Update Member Information"
corp = app.getElement("corps.Default")

# Update member information
corp.updateUserInfo(
    memberId="member001",
    nick="Li Si",
    phone="13900139000",
    email="lisi@example.com"
)
```

### changeMemberStatus
Batch modify member status.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | Yes | Member ID list |
| status | Numeric | int | Yes | Target status, 1: active, 2: resigned |

#### Return Value
No return value

#### Usage Example
```python title="Modify Member Status"
corp = app.getElement("corps.Default")

# Set members as resigned
corp.changeMemberStatus(
    memberIdList=["member001", "member002"],
    status=2
)
```

### setAdmin
Set organization administrators.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| memberIdList | JitList | list | Yes | Administrator member ID list |

#### Return Value
| Type | Description |
|------|------|
| dict | Empty dictionary |

#### Usage Example
```python title="Set Administrators"
corp = app.getElement("corps.Default")

# Set administrators
corp.setAdmin(memberIdList=["member001"])
```

### getAdmin
Get organization administrator list.

#### Parameter Details
No parameters

#### Return Value
| Type | Description |
|------|------|
| list | Administrator member ID list |

#### Usage Example
```python title="Get Administrators"
corp = app.getElement("corps.Default")

# Get administrator list
admins = corp.getAdmin()
print(f"Administrators: {admins}")
```

### getLocalCorpData
Get complete organizational architecture data.

#### Parameter Details
No parameters

#### Return Value
| Type | Description |
|------|------|
| dict | Dictionary containing complete organization information |

Return data structure:
- corp: Organization basic information
- userList: Active user list
- deptList: Department list (including path information)
- deptMemberList: Department member relationship list
- roleList: Role list
- roleGroupList: Role group list
- roleMemberSet: Role member relationship list

#### Usage Example
```python title="Get Organization Data"
corp = app.getElement("corps.Default")

# Get complete organization data
corp_data = corp.getLocalCorpData()
print(f"User count: {len(corp_data['userList'])}")
print(f"Department count: {len(corp_data['deptList'])}")
```

## Properties
### corpFullName
Organization full name, equivalent to fullName property.

### title
Organization display title.

### fullName
Organization element fullName identifier.

## Advanced Features
### Organization Initialization Process
Generic organization supports complete initialization process, including root department creation and first administrator addition:

```python title="Complete Initialization Example"
corp = app.getElement("corps.Default")

# Execute initialization
corp.initCorp()

# Verify initialization result
admins = corp.getAdmin()
corp_data = corp.getLocalCorpData()

print(f"Administrators: {admins}")
print(f"Root Department: {corp_data['deptList'][0]['name']}")
```

### Batch Operation Support
Supports batch management of department members and role members:

```python title="Batch Operation Example"
corp = app.getElement("corps.Default")

# Batch add department members
corp.addDeptMember(
    deptId="dept001",
    memberIdList=["member001", "member002", "member003"]
)

# Batch delete department members
corp.deleteDeptMember(
    deptId="dept001",
    memberIdList=["member003"]
)

# Batch add role members
corp.addRoleMember(
    roleId="role001",
    memberIdList=["member001", "member002"]
)
```

### Permission and Status Management
Supports fine-grained permission control and member status management:

```python title="Permission Management Example"
corp = app.getElement("corps.Default")

# Set department restrictions
corp.setDeptLimit(
    roleId="role001",
    memberId="member001",
    deptIdList=["dept001", "dept002"]
)

# Change member status to resigned
corp.changeMemberStatus(
    memberIdList=["member002"],
    status=2  # Resigned status
)

# Delete resigned members
corp.deleteMember(memberIdList=["member002"])
```