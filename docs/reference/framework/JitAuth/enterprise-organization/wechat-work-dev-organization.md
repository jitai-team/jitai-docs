---
slug: wechat-work-dev-organization
---
# WeCom Proxy Development Organization
WeCom proxy development organization is a specialized organization integration type for WeCom third-party applications, implementing multi-enterprise organization management and cross-enterprise authorization based on WeCom proxy development mode. It handles organization synchronization, member management, and permission assignment under WeCom proxy development mode, supporting multi-tenant SaaS service providers to uniformly manage organizational architectures of multiple authorized enterprises.

The hierarchical structure of WeCom proxy development organization elements is Meta (corps.Meta) → Type (corps.QywxProxyType) → Instance. Developers can quickly create WeCom proxy development organization instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `corps.QywxProxyType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
Recommended to create WeCom proxy development organization instances under the application's `corps` directory:

```
myapp/
├── corps/
│   └── MyQywxProxyCorp/
│       ├── e.json
│       └── MyQywxProxyCorp.json
```

#### e.json File
```json title="e.json"
{
  "type": "corps.QywxProxyType",
  "title": "My WeCom Proxy Development Organization",
  "version": "1.0.0"
}
```

#### Business Configuration File
```json title="MyQywxProxyCorp.json"
{
  "corpId": "{{qywxProxyCorpId}}",
  "authFullName": "auths.QywxProxyAuth"
}
```

#### Usage Example
```python title="Using WeCom Proxy Development Organization Instance"
# Get WeCom proxy development organization instance
corp = app.getElement("corps.MyQywxProxyCorp")

# Initialize organizational architecture
corp.initCorp()

# Sync organizational architecture
corp.syncCorp()

# Get root department
root_dept = corp.getRootDept()
print(f"Root Department: {root_dept.name}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| type | String | Yes | - | Fixed value: corps.QywxProxyType |
| title | String | Yes | - | Organization architecture display name |
| version | String | No | 1.0.0 | Version number |

### Business Configuration File
| Configuration Item | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| corpId | String | Yes | - | Enterprise ID under WeCom proxy development mode |
| authFullName | String | Yes | - | Corresponding WeCom proxy development authentication element fullName |

## Methods
### initCorp
Initialize organizational architecture, called when WeCom proxy development organization is first created, automatically triggers organizational architecture synchronization.

```python title="Initialize Organizational Architecture"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.initCorp()
```

### getRootDept
Get the root department of the organizational architecture, automatically creates if root department doesn't exist.

#### Return Value
- Type: CorpDept object
- Description: Root department model instance

```python title="Get Root Department"
corp = app.getElement("corps.MyQywxProxyCorp")
root_dept = corp.getRootDept()
print(f"Root Department Name: {root_dept.name}")
print(f"Root Department ID: {root_dept.deptId}")
```

### setUserRole
Set role list for specified member, first clears all roles of the member, then sets new roles.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| memberId | String | Yes | - | Member ID |
| roleIdList | List[String] | Yes | - | Role ID list |

#### Return Value
- Type: List[CorpRoleMember]
- Description: List of role member relationship objects after setting completion

```python title="Set User Role"
corp = app.getElement("corps.MyQywxProxyCorp")
role_members = corp.setUserRole("member123", ["role1", "role2"])
for role_member in role_members:
    print(f"Member {role_member.memberId}'s role {role_member.roleId}")
```

### syncCorp
Sync organizational architecture data from WeCom server to local, including departments, members, roles, and other information.

```python title="Sync Organizational Architecture"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.syncCorp()
print("Organizational architecture sync completed")
```

### getClient
Get WeCom API client for calling WeCom interfaces.

#### Return Value
- Type: QywxProxyClient
- Description: WeCom API client instance

```python title="Get WeCom Client"
corp = app.getElement("corps.MyQywxProxyCorp")
client = corp.getClient()
# Use client to call WeCom API
dept_list = client.department.list()
```

### getAgentId
Static method to get the AgentId of the proxy development application.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| corpId | String | Yes | - | Enterprise ID |
| suiteId | String | Yes | - | Third-party application suite ID |

#### Return Value
- Type: String
- Description: Application's AgentId

```python title="Get Application ID"
from corps.QywxProxyType import QywxProxyCorp

agent_id = QywxProxyCorp.getAgentId("corp123", "suite456")
print(f"Application ID: {agent_id}")
```

### getThirdCorpData
Get third-party organizational architecture data, pull latest organizational architecture information from WeCom server.

#### Return Value
- Type: Dict
- Description: Data dictionary containing complete organizational architecture information

```python title="Get Third-Party Organizational Architecture Data"
corp = app.getElement("corps.MyQywxProxyCorp")
corp_data = corp.getThirdCorpData()
print(f"Enterprise Name: {corp_data['corpName']}")
print(f"Department Count: {len(corp_data['deptList'])}")
```

### bulkRegister
Batch register users, batch process user creation, updates, and status changes based on synced organizational architecture data.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| corpData | Dict | Yes | - | Organizational architecture data dictionary |

```python title="Batch Register Users"
corp = app.getElement("corps.MyQywxProxyCorp")
corp_data = corp.getThirdCorpData()
corp.bulkRegister(corp_data)
print("User batch registration completed")
```

### offlineMember
Set specified member list to offline status, does not affect member login in other organizational architectures.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| memberIdList | List[String] | Yes | - | List of member IDs to set offline |

```python title="Offline Members"
corp = app.getElement("corps.MyQywxProxyCorp")
corp.offlineMember(["member1", "member2"])
print("Members have been set to resigned status")
```

### getDepts
Get all department list.

#### Return Value
- Type: List[CorpDept]
- Description: List of department objects

```python title="Get Department List"
corp = app.getElement("corps.MyQywxProxyCorp")
depts = corp.getDepts()
for dept in depts:
    print(f"Department: {dept.name}")
```

### getMembers
Get all member list.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| status | String | No | None | Member status filter |

#### Return Value
- Type: List[CorpMember]
- Description: List of member objects

```python title="Get Member List"
corp = app.getElement("corps.MyQywxProxyCorp")
# Get all members
all_members = corp.getMembers()
# Get active members
active_members = corp.getMembers(status="active")
```

### getMember
Get member information by member ID.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| memberId | String | Yes | - | Member ID |

#### Return Value
- Type: CorpMember
- Description: Member object

```python title="Get Single Member"
corp = app.getElement("corps.MyQywxProxyCorp")
member = corp.getMember("member123")
print(f"Member Name: {member.name}")
```

### getDept
Get department information by department ID.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| deptId | String | Yes | - | Department ID |

#### Return Value
- Type: CorpDept
- Description: Department object

```python title="Get Single Department"
corp = app.getElement("corps.MyQywxProxyCorp")
dept = corp.getDept("dept123")
print(f"Department Name: {dept.name}")
```

## Properties
### corpId
Enterprise ID under WeCom proxy development mode, used to identify specific authorized enterprise.

- Type: String
- Description: Enterprise ID defined in configuration file

### authFullName
FullName of corresponding WeCom proxy development authentication element, used to get authentication configuration and API client.

- Type: String
- Description: Complete path identifier of authentication element

### corpFullName
Complete name identifier of organizational architecture element.

- Type: String
- Description: FullName of current organizational architecture instance

### title
Display name of organizational architecture.

- Type: String
- Description: Display title configured in e.json

```python title="Access Properties"
corp = app.getElement("corps.MyQywxProxyCorp")
print(f"Enterprise ID: {corp.corpId}")
print(f"Authentication Element: {corp.authFullName}")
print(f"Organization Name: {corp.title}")
print(f"Full Name: {corp.corpFullName}")
```

## Advanced Features
### Multi-Enterprise Management
WeCom proxy development organization supports managing organizational architectures of multiple authorized enterprises simultaneously, each enterprise corresponds to an independent organization instance.

```python title="Manage Multiple Enterprises"
# Enterprise A's organizational architecture
corp_a = app.getElement("corps.CorpA")
corp_a.syncCorp()

# Enterprise B's organizational architecture
corp_b = app.getElement("corps.CorpB")
corp_b.syncCorp()

# Count member numbers of each enterprise
print(f"Enterprise A member count: {len(corp_a.getMembers())}")
print(f"Enterprise B member count: {len(corp_b.getMembers())}")
```

### Member Status Management
Supports fine-grained status management of members, including automatic synchronization and manual adjustment of active, resigned, and other statuses.

```python title="Member Status Management"
corp = app.getElement("corps.MyQywxProxyCorp")

# Automatically handle resigned members during sync
corp.syncCorp()

# Manually set members as resigned
corp.offlineMember(["member1", "member2"])

# View members of different statuses
active_members = corp.getMembers(status="active")
offline_members = corp.getMembers(status="offline")
```

### Permission Role Assignment
Supports flexible role permission system, can assign multiple roles to members, implementing fine-grained permission control.

```python title="Permission Role Assignment"
corp = app.getElement("corps.MyQywxProxyCorp")

# Set multiple roles for members
corp.setUserRole("manager001", ["admin", "dept_manager"])
corp.setUserRole("employee001", ["employee", "project_member"])

# Batch set roles
member_roles = {
    "user1": ["role1", "role2"], 
    "user2": ["role2", "role3"]
}
for member_id, role_list in member_roles.items():
    corp.setUserRole(member_id, role_list)
```