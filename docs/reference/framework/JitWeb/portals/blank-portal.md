---
slug: blank-portal
title: "Blank Portal Reference"
description: "Blank Portal Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Blank Portal"
---
# Blank Portal
Blank Portal is a minimal portal implementation that provides basic page containers and routing framework. It does not include built-in navigation systems, allowing developers to completely customize the interface structure, suitable for highly customized application interfaces and special display requirements. Blank Portal only supports frontend implementation, achieving a clean portal foundation through custom rendering logic.

The Blank Portal element hierarchy is Meta (shells.Meta) → Type (shells.BlankType) → Instance. Developers can quickly create Blank Portal instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official shells.BlankType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
shells/
└── MyBlankShell/
    ├── e.json
    └── feature.json
```

#### e.json File
```json title="Basic Configuration"
{
  "type": "shells.BlankType",
  "title": "My Blank Portal",
  "default": false,
  "frontBundleEntry": "./feature.json"
}
```

#### feature.json File
```json title="Menu Configuration"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "Dashboard",
      "page": "pages.Dashboard"
    },
    {
      "name": "settings", 
      "title": "Settings",
      "page": "pages.Settings"
    }
  ]
}
```

#### Usage Example
```typescript title="Get Portal Instance"
import { getRuntimeApp } from 'jit';

// Get portal element
const app = getRuntimeApp();
const shell = await app.getElement("shells.MyBlankShell");

// Access portal properties
console.log(shell.title);  // "My Blank Portal"
console.log(shell.routePath);  // "/MyBlankShell"
console.log(shell.menuTree);  // Menu list

// Get available menus
const availableMenus = shell.getAvailableMenu();
console.log(availableMenus);  // Filtered menu list
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| type | string | string | Yes | Fixed value: `shells.BlankType` |
| title | string | string | Yes | Portal title |
| default | boolean | boolean | No | Whether it's the user portal, default false |
| frontBundleEntry | string | string | Yes | Frontend configuration entry, usually `./feature.json` |
| hideInRole | boolean | boolean | No | Whether to hide in role, default false |
| status | number | number | No | Portal status, 0 indicates normal |

### feature.json Configuration
| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| menus | array | ShellMenu[] | Yes | Menu configuration array |
| aiConfig | object | object | No | AI assistant configuration |

#### Menu Item Configuration
| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| name | string | string | Yes | Menu unique identifier |
| title | string | string | Yes | Menu display name |
| page | string | string | No | PC page fullName |
| mobilePage | string | string | No | Mobile page fullName |
| icon | string | string | No | Menu icon |
| hide | boolean | boolean | No | Whether to hide menu |
| children | array | ShellMenu[] | No | Submenu configuration |
| nodeType | string | string | No | Node type, optional values: group |

## Methods
### getAvailableMenu
Get filtered available menu list, filtering out menus without permissions, hidden menus, menus without pages, or menus with deleted pages.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | array | ShellMenu[] | No | Menu tree to filter, defaults to current portal's menu |

#### Return Value
Returns filtered menu list, type ShellMenu[].

#### Usage Example
```typescript title="Get Available Menus"
// Get default available menus
const availableMenus = shell.getAvailableMenu();

// Get available menus for specified menu tree
const customMenus = [
    {name: "page1", title: "Page 1", page: "pages.Page1"},
    {name: "page2", title: "Page 2", page: "pages.Page2", hide: true}
];
const filteredMenus = shell.getAvailableMenu(customMenus);
```

### getPermMenu
Get menu list that current user has permission to access.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | array | ShellMenu[] | No | Menu tree to check permissions, defaults to current portal's menu |

#### Return Value
Returns menu list with permissions, type ShellMenu[].

#### Usage Example
```typescript title="Get Permission Menus"
// Get menus with permissions for current user
const permMenus = shell.getPermMenu();

// Check permissions for specified menus
const customMenus = [
    {name: "admin", title: "Admin Page", page: "pages.Admin"},
    {name: "user", title: "User Page", page: "pages.User"}
];
const allowedMenus = shell.getPermMenu(customMenus);
```

### flatFeatureMenuItem
Flatten hierarchical menu structure into a one-dimensional array.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menus | array | ShellMenu[] | No | Menu tree to flatten, defaults to current portal's menu |

#### Return Value
Returns flattened menu list, type ShellMenu[].

#### Usage Example
```typescript title="Flatten Menu Structure"
// Flatten default menu
const flatMenus = shell.flatFeatureMenuItem();

// Flatten specified menu
const nestedMenus = [
    {
        name: "group1",
        title: "Group 1",
        nodeType: "group",
        children: [
            {name: "page1", title: "Page 1", page: "pages.Page1"},
            {name: "page2", title: "Page 2", page: "pages.Page2"}
        ]
    }
];
const flatResult = shell.flatFeatureMenuItem(nestedMenus);
```

### mergeMenus
Merge multiple menu lists, with earlier menus overriding later menus with the same name.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menusLists | array | ShellMenu[][] | Yes | Array of menu lists to merge |

#### Return Value
Returns merged menu list, type ShellMenu[].

#### Usage Example
```typescript title="Merge Menu Lists"
const menuList1 = [
    {name: "home", title: "Home", page: "pages.Home"}
];
const menuList2 = [
    {name: "about", title: "About", page: "pages.About"}
];
const menuList3 = [
    {name: "home", title: "Homepage", page: "pages.NewHome"}  // Will override the first one
];

const mergedMenus = shell.mergeMenus([menuList1, menuList2, menuList3]);
```

### setBackUrl
Set the portal's return URL.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| backUrl | string | string | Yes | Return URL address |

#### Return Value
No return value (void).

#### Usage Example
```typescript title="Set Return URL"
// Set return to home page
shell.setBackUrl("/home");

// Set return to parent page
shell.setBackUrl("/parent");
```

### setExtendsFeature
Set inherited menu feature configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | array | ShellFeature[] | Yes | Inherited feature configuration list |

#### Return Value
No return value (void).

#### Usage Example
```typescript title="Set Inherited Features"
const extendsConfig = [
    {
        menus: [
            {name: "inherited1", title: "Inherited Page 1", page: "pages.Inherited1"}
        ],
        aiConfig: {useAi: 1, aiAssistant: "aiassistants.DefaultAI"}
    }
];
shell.setExtendsFeature(extendsConfig);
```

### setOriginFeature
Set original menu feature configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | object | ShellFeature | Yes | Original feature configuration |

#### Return Value
No return value (void).

#### Usage Example
```typescript title="Set Original Features"
const originConfig = {
    menus: [
        {name: "origin1", title: "Original Page 1", page: "pages.Origin1"}
    ],
    aiConfig: {useAi: 0}
};
shell.setOriginFeature(originConfig);
```

### getPermConfig
Get permission configuration for specified role.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| roleName | string | string | Yes | Role name |

#### Return Value
Returns Promise, no specific return value, updates portal's permConfig property after execution.

#### Usage Example
```typescript title="Get Role Permissions"
// Get admin role permissions
await shell.getPermConfig("roles.Admin");

// Get regular user permissions
await shell.getPermConfig("roles.User");
```

## Properties
### routePath
Portal's route path, read-only property. Format: `/{portal_name}`.

### menuTree
Merged menu tree structure, containing all accessible menu items.

### permConfig
Current permission configuration, may be string "all" or permission object.

### shellConfig
Portal's custom configuration object.

### backUrl
Return URL address, read-write property.

### originMenus
Original menu configuration, read-only property, from originFeature.

### extendsMenus
Inherited menu configuration list, read-only property, from extendsFeature.

### allowAccess
Whether access to current portal is allowed, read-only property, calculated based on permission configuration.

## Advanced Features
### Custom Rendering Logic
Blank Portal implements special rendering requirements through custom shellRender:

```json title="Custom Rendering Configuration"
{
  "type": "shells.BlankType",
  "title": "Custom Rendering Portal",
  "frontBundleEntry": "./custom-render.json"
}
```

### Menu Permission Control
Implement fine-grained menu permission control combined with role management:

```typescript title="Permission Control Example"
// Check portal access permissions
if (shell.allowAccess) {
    // Get current user's visible menus
    const visibleMenus = shell.getAvailableMenu();
    
    // Further filter permission menus
    const permMenus = shell.getPermMenu(visibleMenus);
    
    console.log(`User accessible menu count: ${permMenus.length}`);
}
```

### Menu Inheritance and Merging
Utilize menu inheritance mechanism to extend base menus:

```typescript title="Menu Inheritance Example"
// Set base menus
const baseMenus = [
    {name: "home", title: "Home", page: "pages.Home"},
    {name: "profile", title: "Profile", page: "pages.Profile"}
];

// Set extended menus
const extendMenus = [
    {name: "admin", title: "Admin Panel", page: "pages.Admin"}
];

// Merge menus
const finalMenus = shell.mergeMenus([baseMenus, extendMenus]);
``` 