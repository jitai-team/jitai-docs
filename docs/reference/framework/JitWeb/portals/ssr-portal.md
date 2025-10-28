---
slug: ssr-portal
title: "SSR Portal Reference"
description: "SSR Portal Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "SSR Portal"
---
# SSR Portal
SSR Portal is a portal type that supports server-side rendering, used to improve first-screen loading performance and SEO optimization, supporting theme customization and multi-template switching.

The SSR Portal element hierarchy is Meta (shells.Meta) → Type (shells.SSRType) → Instance. Developers can create instance elements through visual development tools.

Of course, developers can also create their own Type elements or modify the official shells.SSRType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
shells/
└── MySSRPortal/            # Portal element directory (customizable)
    ├── e.json              # Element configuration file
    └── feature.json        # Portal function configuration file
```

#### e.json File
```json title="Basic Configuration Example"
{
  "type": "shells.SSRType",
  "theme": "default",
  "title": "My SSR Portal",
  "default": true,
  "status": 1,
  "frontBundleEntry": "./feature.json",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="feature.json Example"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "Data Dashboard",
      "icon": "dashboard",
      "page": "pages.Dashboard",
      "mobilePage": "pages.MobileDashboard",
      "nodeType": "menu"
    },
    {
      "name": "userGroup",
      "title": "User Management",
      "icon": "user",
      "nodeType": "group",
      "children": [
        {
          "name": "userList",
          "title": "User List",
          "page": "pages.UserList",
          "nodeType": "menu"
        }
      ]
    }
  ]
}
```

#### Usage Example
```javascript title="Get Portal Instance"
// Get SSR portal instance
const portal = await app.getElement("shells.MySSRPortal");

// Get portal menus
const menus = portal.menuTree;
const originMenus = portal.originMenus;
const extendsMenus = portal.extendsMenus;

// Set backend return URL
portal.setBackUrl("/dashboard");
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| type | string | Yes | Element type, fixed as "shells.SSRType" |
| title | string | Yes | Portal title |
| theme | string | No | Theme name, defaults to "default" |
| default | boolean | No | Whether it's the user portal |
| status | number | No | Portal status, 0-disabled, 1-enabled |
| hideInRole | boolean | No | Whether to hide in role |
| remark | string | No | Remark information |
| frontBundleEntry | string | Yes | Frontend resource entry path |
| backendBundleEntry | string | Yes | Backend resource entry path |

### Business Configuration File Configuration
| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| menus | Array | Yes | Menu configuration array |
| aiConfig | Object | No | AI assistant configuration |

**Menu Configuration Items:**

| Configuration | Type | Required | Description |
|---------------|------|----------|-------------|
| name | string | Yes | Menu unique identifier |
| title | string | Yes | Menu display title |
| icon | string | No | Menu icon |
| page | string | No | PC page fullName |
| mobilePage | string | No | Mobile page fullName |
| nodeType | string | Yes | Node type: "menu" or "group" |
| children | Array | No | Submenu array (used for group type) |
| hide | boolean | No | Whether to hide menu item |
| config | Object | No | Menu extension configuration |
| args | Object | No | Platform-specific parameter configuration |

## Methods
### setExtendsFeature
Set inherited function configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | Array | array | Yes | Inherited function configuration array |

#### Return Value
No return value

#### Usage Example
```javascript title="Set Inherited Functions"
const extendsFeatures = [
    {
        menus: [
            {
                name: "baseMenu",
                title: "Base Menu",
                page: "pages.BasePage",
                nodeType: "menu"
            }
        ],
        aiConfig: {
            useAi: 1,
            aiAssistant: "assistants.DefaultAssistant"
        }
    }
];

portal.setExtendsFeature(extendsFeatures);
```

### setOriginFeature
Set original function configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | Object | object | Yes | Original function configuration object |

#### Usage Example
```javascript title="Set Original Functions"
const originFeature = {
    menus: [
        {
            name: "mainMenu",
            title: "Main Menu",
            page: "pages.MainPage",
            nodeType: "menu"
        }
    ]
};

portal.setOriginFeature(originFeature);
```

### setBackUrl
Set the portal's return URL address.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| backUrl | string | string | Yes | Return URL address |

#### Usage Example
```javascript title="Set Return URL"
portal.setBackUrl("/dashboard/overview");
```

### getAvailableMenu
Get available menu list, filtering out menus without permissions, hidden menus, or invalid menus.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | Array | array | No | Menu tree data, defaults to current portal menu |

#### Return Value
Returns filtered available menu list (Array type)

#### Usage Example
```javascript title="Get Available Menus"
// Get default available menus
const availableMenus = portal.getAvailableMenu();

// Get available menus for specified menu tree
const customMenus = portal.getAvailableMenu(customMenuTree);
```

### getPermMenu
Get menu list with permissions.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | Array | array | No | Menu tree data, defaults to current portal menu |

#### Return Value
Returns menu list with permissions (Array type)

#### Usage Example
```javascript title="Get Permission Menus"
const permMenus = portal.getPermMenu();
```

### flatFeatureMenuItem
Flatten hierarchical menu into a one-dimensional array.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menus | Array | array | No | Menu array, defaults to current portal menu |

#### Return Value
Returns flattened menu list (Array type)

#### Usage Example
```javascript title="Flatten Menu"
const flatMenus = portal.flatFeatureMenuItem();
```

### getPermConfig
Asynchronously get permission configuration for specified role.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| roleName | string | string | Yes | Role name |

#### Return Value
No return value (async method, updates permConfig property)

#### Usage Example
```javascript title="Get Role Permissions"
await portal.getPermConfig("roles.admin");
```

### mergeMenus
Merge multiple menu lists, with earlier menus overriding later menus with the same name.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menusLists | Array | array | Yes | Two-dimensional menu array containing multiple menu lists |

#### Return Value
Returns merged menu list (Array type)

#### Usage Example
```javascript title="Merge Menus"
const menuLists = [baseMenus, extendMenus, customMenus];
const mergedMenus = portal.mergeMenus(menuLists);
```

## Properties
### menuTree
Current portal's menu tree structure, containing merged complete menu configuration.

**Type:** Array  
**Access:** Read-only

### originMenus
Menu list from original function configuration.

**Type:** Array  
**Access:** Read-only

### extendsMenus
Menu list array from all inherited function configurations.

**Type:** Array  
**Access:** Read-only

### permConfig
Permission configuration object that controls menu access permissions.

**Type:** Object | string  
**Access:** Read-write  
**Default Value:** "all"

### allowAccess
Determines whether the current portal allows access.

**Type:** boolean  
**Access:** Read-only

### shellConfig
Portal's extended configuration information.

**Type:** Object  
**Access:** Read-write

### routePath
Portal's route path.

**Type:** string  
**Access:** Read-only

### backUrl
Portal's return URL address.

**Type:** string  
**Access:** Read-write

### extendsFeature
List of inherited function configurations.

**Type:** Array  
**Access:** Read-only

### originFeature
Original function configuration object.

**Type:** Object  
**Access:** Read-only

## Advanced Features
### Theme Customization
SSR Portal supports multiple theme templates, enabling dynamic interface style switching through theme configuration.

#### Configuration Example
```json title="Theme Configuration"
{
  "type": "shells.SSRType",
  "theme": "custom",
  "title": "Custom Theme Portal"
}
```

Each theme contains independent HTML template files located in the `backend/themes/{themeName}/` directory:

```text title="Theme Directory Structure"
backend/
└── themes/
    ├── default/
    │   ├── index.html      # Main page template
    │   └── page.html       # Sub-page template
    └── custom/
        ├── index.html
        └── page.html
```

### Server-Side Rendering Configuration
SSR Portal implements server-side pre-rendering through backend templates, supporting SEO optimization and first-screen performance improvement.

#### Template Variables
Backend HTML templates support the following predefined variables:

- `{{shellTitle}}`: Portal title
- `{{shellFullName}}`: Portal full name
- `{{shellName}}`: Portal name
- `{{shellMenus}}`: Portal menu JSON data

#### Usage Example
```html title="Custom HTML Template"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{shellTitle}}</title>
    <meta name="description" content="Enterprise application portal based on {{shellName}}">
</head>
<body>
    <div id="app" data-shell="{{shellFullName}}">
        <!-- Server-side rendered content -->
    </div>
    <script>
        window.SHELL_CONFIG = {
            menus: {{shellMenus}},
            title: "{{shellTitle}}"
        };
    </script>
</body>
</html>
```

### Permission Integration
Implement fine-grained menu permission control combined with role management system.

#### Configuration Example
```javascript title="Permission Configuration"
// Asynchronously get role permission configuration
await portal.getPermConfig("roles.admin");

// Set specific menu permissions
portal.permConfig = {
    dashboard: true,
    userList: true,
    systemSettings: false
};

// Get menus with permissions for current user
const userMenus = portal.getPermMenu();

// Check portal access permissions
if (portal.allowAccess) {
    console.log("Access to this portal is allowed");
}
``` 