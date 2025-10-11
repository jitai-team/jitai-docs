---
slug: regular-portal
---
# Generic Portal
Generic Portal is a complete portal solution provided by JitWeb, implementing an enterprise-level portal framework based on the React technology stack. It is responsible for application entry management, navigation system construction, and user interface unification, with built-in complete portal components such as left navigation, top navigation, and user information display, while supporting responsive adaptation for both PC and mobile devices.

The Generic Portal element hierarchy is Meta (shells.Meta) → Type (shells.DefaultType) → Instance. Developers can quickly create Generic Portal instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official shells.DefaultType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
shells/
└── MyPortal/               # Portal name (customizable)
    ├── e.json             # Element declaration file
    └── feature.json       # Business configuration file
```

#### e.json File
```json title="Basic Configuration Example"
{
  "type": "shells.DefaultType",
  "title": "My Portal",
  "page": "pages.ShellLeftNavPage",
  "default": true,
  "status": 0,
  "frontBundleEntry": "./feature.json",
  "bizPageMode": true,
  "refreshOnPageFocus": true,
  "sort": 1,
  "remark": "Portal description"
}
```

#### Business Configuration File
```json title="feature.json Menu Configuration"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "Dashboard",
      "nodeType": "page",
      "page": "pages.Dashboard",
      "mobilePage": "pages.DashboardMobile",
      "icon": "dashboard",
      "sort": 1
    },
    {
      "name": "system",
      "title": "System Management",
      "nodeType": "group",
      "icon": "setting",
      "sort": 2,
      "children": [
        {
          "name": "users",
          "title": "User Management",
          "nodeType": "page",
          "page": "pages.UserManage",
          "mobilePage": "pages.UserManageMobile",
          "icon": "user",
          "sort": 1
        }
      ]
    }
  ]
}
```

#### Usage Example
```javascript title="Get Portal Instance"
import { getRuntimeApp } from 'jit';

// Get application instance
const app = getRuntimeApp();

// Get portal element definition
const [shellDefine] = app.getElementDefine("shells.MyPortal");

// Get portal instance
const portal = app.getElement("shells.MyPortal");

// Get portal configuration
const portalConfig = portal.shellConfig;
const portalMenus = portal.menuTree;

// Check permissions
const hasAccess = portal.allowAccess;
```

## Element Configuration
### e.json Configuration
| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| type | Stext | str | Yes | Fixed as "shells.DefaultType" |
| title | Stext | str | Yes | Portal display name |
| page | Stext | str | No | Navigation page, defaults to "pages.ShellLeftNavPage" |
| default | Checkbox | bool | No | Whether it's the user portal |
| status | Numeric | int | No | Portal status, 0: enabled 1: disabled |
| frontBundleEntry | Stext | str | Yes | Frontend configuration file path, usually "./feature.json" |
| bizPageMode | Checkbox | bool | No | Whether to enable business page mode |
| refreshOnPageFocus | Checkbox | bool | No | Whether to refresh when page gains focus |
| sort | Numeric | int | No | Sort weight |
| remark | Ltext | str | No | Portal description |
| hideInRole | Checkbox | bool | No | Whether to hide in role |
| commonFuncList1 | JitList | list | No | Common function configuration 1 |
| commonFuncList2 | JitList | list | No | Common function configuration 2 |
| commonFuncList3 | JitList | list | No | Common function configuration 3 |

### Business Configuration File Configuration
The feature.json file contains the portal's menu structure and AI configuration:

| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| menus | JitList | list | Yes | Menu configuration list |
| aiConfig | JitDict | dict | No | AI assistant configuration |

Menu item configuration:

| Configuration | Type | Native Type | Required | Description |
|---------------|------|-------------|----------|-------------|
| name | Stext | str | Yes | Menu unique identifier |
| title | Stext | str | Yes | Menu display name |
| nodeType | Stext | str | Yes | Node type: page/group |
| page | Stext | str | No | PC page path |
| mobilePage | Stext | str | No | Mobile page path |
| icon | Stext | str | No | Menu icon |
| sort | Numeric | int | No | Sort weight |
| hide | Checkbox | bool | No | Whether to hide |
| children | JitList | list | No | Submenu list |

## Methods
### getAvailableMenu
Get available menu list, filtering out menus without permissions, hidden menus, and invalid menus.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | JitList | list | No | Menu tree, defaults to instance's permission menu |

#### Return Value
Returns filtered available menu list (list type).

#### Usage Example
```javascript title="Get Available Menus"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Get all available menus
const availableMenus = portal.getAvailableMenu();

// Get available menus for specified menu tree
const customMenus = [
    {name: "test", title: "Test", page: "pages.Test", nodeType: "page"}
];
const filteredMenus = portal.getAvailableMenu(customMenus);
```

### flatFeatureMenuItem
Flatten hierarchical menu structure into a one-dimensional list.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menus | JitList | list | No | Menu list, defaults to instance's menu tree |

#### Return Value
Returns flattened menu list (list type).

#### Usage Example
```javascript title="Flatten Menu Structure"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Flatten default menu
const flatMenus = portal.flatFeatureMenuItem();

// Flatten specified menu
const customMenus = portal.menuTree;
const flatCustom = portal.flatFeatureMenuItem(customMenus);
```

### getPermConfig
Get permission configuration based on role name.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| roleName | Stext | str | Yes | Role fullName |

#### Return Value
No return value, sets the instance's permConfig property.

#### Usage Example
```javascript title="Get Role Permissions"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Get admin permissions
await portal.getPermConfig("roles.Admin");

// Get current permission configuration
const currentPerm = portal.permConfig;
```

### mergeMenus
Merge multiple menu lists, with earlier menus overriding later menus with the same name.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menusLists | JitList | list | Yes | List of menu lists |

#### Return Value
Returns merged menu list (list type).

#### Usage Example
```javascript title="Merge Menus"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Merge multiple menu lists
const baseMenus = [{name: "home", title: "Home"}];
const extendMenus = [{name: "about", title: "About"}];
const merged = portal.mergeMenus([baseMenus, extendMenus]);
```

### getPermMenu
Get menu list with permissions, filtering menus based on permission configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| menuTree | JitList | list | No | Menu tree, defaults to instance's menu tree |

#### Return Value
Returns menu list with permissions (list type).

#### Usage Example
```javascript title="Get Permission Menus"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Get menus with permissions
const permMenus = portal.getPermMenu();

// Get permission menus for specified menu tree
const customMenus = portal.menuTree;
const filteredPermMenus = portal.getPermMenu(customMenus);
```

### setExtendsFeature
Set inherited feature configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | JitList | list | Yes | Inherited feature configuration list, containing menus and aiConfig |

#### Return Value
No return value.

#### Usage Example
```javascript title="Set Inherited Features"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Set inherited features
const inheritedFeature = [
    {menus: [{name: "base", title: "Base Functions"}]}
];
portal.setExtendsFeature(inheritedFeature);
```

### setOriginFeature
Set original feature configuration.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| feature | JitDict | object | Yes | Original feature configuration, containing menus and aiConfig |

#### Return Value
No return value.

#### Usage Example
```javascript title="Set Original Features"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Set original features
const originalFeature = {
    menus: [{name: "custom", title: "Custom Functions"}]
};
portal.setOriginFeature(originalFeature);
```

### setBackUrl
Set return URL.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| backUrl | Stext | str | Yes | Return URL address |

#### Return Value
No return value.

#### Usage Example
```javascript title="Set Return URL"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Set return URL
portal.setBackUrl("/previous-page");
```

## Properties
### routePath
Portal's route path, read-only property.

### menuTree
Merged complete menu tree structure.

### permConfig
Current permission configuration, may be "all" or specific permission object.

### allowAccess
Boolean value indicating whether portal access is allowed.

### originMenus
Original menu configuration, from current portal's feature.json.

### extendsMenus
Inherited menu configuration, from parent application's menus.

## Advanced Features
### Permission Control
Generic Portal has built-in complete permission management mechanism, supporting role-based menu access control.

#### Configuration Example and Usage Example
```json title="Role Permission Configuration"
{
  "roleName": "roles.Manager",
  "shellPerm": {
    "shells.MyPortal": {
      "dashboard": {"pages.Dashboard": "all"},
      "users": {"pages.UserManage": {"read": true, "write": false}}
    }
  }
}
```

```javascript title="Permission Check"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// Check portal access permissions
if (portal.allowAccess) {
    // Get menus with permissions
    const permMenus = portal.getPermMenu();
    
    // Get available menus (filter permissions + hidden + invalid)
    const availableMenus = portal.getAvailableMenu();
}
```

### Mobile Adaptation
Generic Portal automatically adapts to mobile devices, providing a native app-like user experience.

#### Configuration Example and Usage Example
```json title="Mobile Menu Configuration"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "Dashboard", 
      "page": "pages.Dashboard",
      "mobilePage": "pages.DashboardMobile",
      "nodeType": "page"
    }
  ]
}
```

Mobile devices will automatically use the `mobilePage` configured page and provide a bottom navigation bar.

### Menu Inheritance and Merging
Supports inheriting menu configuration from parent applications and intelligently merging duplicates. The portal automatically merges inherited menus and original menus, with menus with the same name being overridden.

#### Configuration Example and Usage Example
```javascript title="View Merge Results"
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const portal = app.getElement("shells.MyPortal");

// View original menus
const originalMenus = portal.originMenus;

// View inherited menus  
const inheritedMenus = portal.extendsMenus;

// View final merge results
const finalMenus = portal.menuTree;
```

### Theme Customization
Supports custom theme configuration to achieve personalized visual effects.

#### Configuration Example and Usage Example
```json title="Theme Configuration"
{
  "type": "shells.DefaultType",
  "title": "Custom Portal",
  "theme": "custom",
  "page": "pages.ShellLeftNavPage"
}
```

Theme files need to provide corresponding template files in the themes directory of the Type element. 