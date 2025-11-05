---
slug: regular-roles
title: "Generic Roles Reference"
description: "Generic Roles Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Generic Roles"
---
# Generic Roles
Regular roles are permission management components based on the RBAC model, providing a complete solution for role definition, permission assignment, and member binding. They handle user permission control, API access authorization, and portal access management, supporting role inheritance, permission composition, and hierarchical authorization mechanisms, with deep integration with organizational architecture to achieve enterprise-level permission control.

The hierarchical structure of regular role elements is Meta (`roles.Meta`) → Type (`roles.NormalType`) → Instance. Developers can quickly create regular role instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `roles.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
roles/
├── developer/              # Role instance directory (path customizable)
│   ├── e.json              # Element definition file (required)
│   └── developer.json      # Role configuration file (required)
```

#### e.json File
```json title="e.json Configuration Example"
{
  "backendBundleEntry": ".",
  "frontBundleEntry": "./developer.json",
  "title": "Developer",
  "type": "roles.NormalType"
}
```

#### Business Configuration File
```json title="developer.json Configuration Example"
{
  "apiPerm": {
    "services.UserService.createUser": "allow",
    "services.ProjectService.*": "deny"
  },
  "apiPermSwitch": 1,
  "shellPerm": {
    "shells.Admin": "all",
    "shells.Portal": "read"
  }
}
```

#### Usage Example
```python title="Getting Role Information"
# Get role instance
role = app.getElement("roles.developer")

# Get role basic information
role_info = role.info
print(f"Role Name: {role_info['roleTitle']}")
print(f"Role ID: {role_info['roleName']}")

# Get permission configuration
api_perms = role_info.get('apiPerm', {})
shell_perms = role_info.get('shellPerm', {})
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Role display name |
| type | string | Yes | Fixed value: `roles.NormalType` |
| backendBundleEntry | string | Yes | Backend entry, usually "." |
| frontBundleEntry | string | Yes | Frontend entry, points to configuration file |

### Business Configuration File
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| apiPerm | object | No | API permission configuration, key is API path, value is permission type |
| apiPermSwitch | number | No | API permission switch, 0 off/1 on |
| shellPerm | object | No | Portal permission configuration, key is portal fullName, value is permission type |

#### API Permission Configuration
```json title="API Permission Configuration Example"
{
  "apiPerm": {
    "services.UserService.createUser": "allow",      // Explicitly allow
    "services.UserService.deleteUser": "deny",       // Explicitly deny
    "services.ProjectService.*": "allow",             // Wildcard matching
    "models.UserModel.save": "allow"                  // Model method permission
  },
  "apiPermSwitch": 1
}
```

#### Portal Permission Configuration
```json title="Portal Permission Configuration Example"
{
  "shellPerm": {
    "shells.Admin": "all",        // Full access
    "shells.Portal": "read",      // Read-only access
    "shells.Api": "none"          // No access
  }
}
```

## Properties
### info
Gets the complete information of the role, including basic configuration and permission data.

```python title="Usage Example"
role = app.getElement("roles.developer")
role_data = role.info

# Access role information
print(role_data['roleName'])    # Role fullName
print(role_data['roleTitle'])   # Role display name
print(role_data['apiPerm'])     # API permission configuration
print(role_data['shellPerm'])   # Portal permission configuration
```

## Methods
### getRoleData
Gets the complete configuration data of the role, supporting data merging from application inheritance.

#### Return Value
- **Type**: `dict`
- **Description**: Dictionary containing complete role configuration

#### Usage Example
```python title="Getting Role Data"
role = app.getElement("roles.developer")
data = role.getRoleData()

# Check role permissions
def check_api_permission(api_path):
    api_perms = data.get('apiPerm', {})
    
    # Exact match
    if api_path in api_perms:
        return api_perms[api_path] == 'allow'
    
    # Wildcard matching
    for perm_path, permission in api_perms.items():
        if perm_path.endswith('*'):
            prefix = perm_path[:-1]
            if api_path.startswith(prefix):
                return permission == 'allow'
    
    return False

# Usage example
has_permission = check_api_permission("services.UserService.createUser")
```

## Advanced Features
### Role Inheritance
Regular roles support application-level inheritance, where child applications can inherit parent application role configurations and override or extend them.

```json title="Child Application Role Configuration"
{
  "apiPerm": {
    "services.NewService.*": "allow"
  },
  "apiPermSwitch": 1,
  "shellPerm": {
    "shells.NewPortal": "all"
  }
}
```

### Permission Check Integration
Integrate permission check logic in business code:

```python title="Permission Check Implementation"
def check_user_role_permission(user_id, api_path):
    # Get user's role list
    member_model = app.getElement("roles.models.AppRoleMemberModel")
    user_roles = member_model.query(
        filter=f"Q(authId='{user_id}')",
        fieldList=['roleName']
    )
    
    # Check each role's permissions
    for role_data in user_roles['rowDatas']:
        role = app.getElement(role_data['roleName'])
        role_info = role.info
        
        api_perms = role_info.get('apiPerm', {})
        if api_perms.get(api_path) == 'allow':
            return True
    
    return False
```

### Dynamic Permission Management
Implement dynamic permission adjustments by modifying role configuration files:

```python title="Dynamic Permission Update"
import json

def update_role_permissions(role_name, new_permissions):
    # Get role node
    role_element = app.getElement(role_name)
    config_file = f"{role_element._nodes[0].name}.json"
    
    # Read current configuration
    current_config = json.loads(role_element._nodes[0].getFile(config_file))
    
    # Update permissions
    current_config['apiPerm'].update(new_permissions)
    
    # Save configuration (in actual projects, this needs to be done through management interface)
    print(f"New permission configuration: {current_config}")
```