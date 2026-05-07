---
slug: tabs
title: "Tabs Reference"
description: "Tabs Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Tabs"
---
# Tabs
Tabs is a layout component used to switch between multiple content panels within limited space. It implements componentized layout based on React technology stack, supporting line and card visual styles, and can be placed in four positions: top, bottom, left, and right. Tabs handle organization and management of multiple content panels, tab switching interaction, and dynamic display control, supporting permission filtering, dynamic alias settings, and event-driven interactive responses.

The tabs element has a hierarchical structure of Meta (`components.Meta`) → Type (`components.Tab`) → Instance. Developers can quickly create tabs instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.TabType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
├── UserManage/
│   ├── e.json
│   ├── scheme.json    # Page layout configuration
│   └── index.tsx
```

```json title="Tabs Component Configuration - scheme.json"
{
  "name": "userTabs",
  "type": "components.Tab",
  "title": "User Management Tabs",
  "config": {
    "position": "top",
    "size": "middle",
    "type": "line",
    "layoutList": [
      {
        "name": "basicInfo",
        "title": "Basic Information",
        "layout": []
      },
      {
        "name": "permissions",
        "title": "Permission Settings",
        "layout": []
      }
    ]
  }
}
```

```tsx title="Call Tabs in Page"
// Get tabs component instance
const tabComponent = app.getElement('pages.UserManage.userTabs');

// Switch to permission settings tab
await tabComponent.call('permissions', '');

// Show different tabs based on conditions
if (userRole === 'admin') {
  tabComponent.setDisplayTabs('basicInfo,permissions');
} else {
  tabComponent.setDisplayTabs('basicInfo');
}
```

### Configuration Properties
| Property | Type | Description | Default Value | Required |
|----------|------|-------------|---------------|----------|
| position | `"top"` &#124; `"bottom"` &#124; `"left"` &#124; `"right"` | Tab position | "top" | No |
| size | `"large"` &#124; `"middle"` &#124; `"small"` | Tab size | "middle" | No |
| type | `"line"` &#124; `"card"` | Tab type: line or card | "line" | No |
| layoutList | `ITabProps[]` | Tab list configuration | [] | Yes |

**ITabProps Structure:**

| Property | Type | Description | Default Value | Required |
|----------|------|-------------|---------------|----------|
| name | string | Tab unique identifier | - | Yes |
| title | string | Tab display name | - | Yes |
| layout | Layout[] | Tab component layout configuration | [] | No |

## Variables
### tab
Currently clicked tab information, containing tab name or alias.

**Type:** `Dropdown`  
**Access Method:** `tabComponent.tab.value`

## Methods
### call
Open specified tab and set custom alias.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| tabName | string | Target tab's name | - | Yes |
| tabAlias | string | Tab alias (for display) | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Open Specified Tab"
// Open tab named permissions
await tabComponent.call("permissions", "");

// Open tab and set alias
await tabComponent.call("permissions", "Permission Settings (3 pending)");
```

### setDisplayTabs
Set displayed tabs, hide other tabs. Triggers internal refresh event after calling.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| showTabNames | string | Tab names to display, multiple separated by commas | - | Yes |

#### Usage Example
```tsx title="Dynamically Control Tab Display"
// Only show basic information and permission settings tabs
tabComponent.setDisplayTabs("basicInfo,permissions");

// Dynamically display based on permissions
if (hasAdvancedPermission) {
  tabComponent.setDisplayTabs("basicInfo,permissions,advanced");
} else {
  tabComponent.setDisplayTabs("basicInfo");
}
```

### setConfig
Update component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | Partial&lt;TabComponentConfig &amp; `{ requireElements: requireElement[] }`&gt; | New configuration items | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Usage Example
```tsx title="Update Component Configuration"
// Change tab position and style
tabComponent.setConfig({
  position: "bottom",
  type: "card"
});
```

### publishEvent
Publish component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Additional data carried by event | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Publish Custom Event"
await tabComponent.publishEvent("customRefresh", {
  activeTab: "basicInfo",
  timestamp: Date.now()
});
```

### subscribeEvent
Subscribe to component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
string - Event handler ID

#### Usage Example
```tsx title="Subscribe to Tab Switch Event"
const handlerId = tabComponent.subscribeEvent("clickbasicInfo", async (data) => {
  console.log("Basic information tab clicked");
  // Execute corresponding business logic
});
```

### unSubscribeEvent
Cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Event handler ID | - | Yes |

### runCode
Execute JavaScript code string in page context.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | JavaScript code to execute | - | Yes |

#### Return Value
any - Code execution result

#### Usage Example
```tsx title="Execute Dynamic Code"
const result = tabComponent.runCode("this.fullName");
console.log("Current page:", result);
```

### destroy
Destroy component instance, clean up event listeners and resources.

#### Usage Example
```tsx title="Component Destruction"
tabComponent.destroy();
```

### getPermConfig
Get current component's permission configuration information.

#### Return Value
Record&lt;string, any&gt; &#124; undefined - Permission configuration object, returns undefined if no permission restrictions

#### Usage Example
```tsx title="Get Permission Configuration"
const permConfig = tabComponent.getPermConfig();
if (permConfig?.permitLayout) {
  console.log("Allowed tabs:", permConfig.permitLayout);
}
```

### bindApp
Bind application instance.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| app | App | Application instance | - | Yes |

### bindPage
Bind page instance.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| page | BasePage | Page instance | - | Yes |

## Properties
### name
Component instance name.

**Type:** `string`  
**Read-only:** Yes

### title
Component display title.

**Type:** `string`  
**Read-only:** Yes

### config
Component configuration object, containing position, size, type, layoutList and other configuration items.

**Type:** `TabComponentConfig & { requireElements: requireElement[] }`  
**Read-only:** No

### compType
Component type enumeration value.

**Type:** `COMPONENT_TYPE`  
**Read-only:** Yes

### showTitle
Whether to show component title.

**Type:** `boolean`  
**Read-only:** Yes

### type
Component type identifier.

**Type:** `string`  
**Read-only:** Yes

### fullName
Component full name, containing page path and component name.

**Type:** `string`  
**Read-only:** Yes

Component full name, containing page path and component name.

**Type:** `string`  
**Read-only:** Yes

### app
Current application instance accessor.

**Type:** `App`  
**Read-only:** Yes

### page
Current page instance accessor.

**Type:** `BasePage`  
**Read-only:** Yes

### showLayoutList
Current actually displayed tab list (result after permission filtering and setDisplayTabs method processing).

**Type:** `ITabProps[]`  
**Read-only:** Yes

### defaultActivatedTabStatus
Default activated tab status information, containing tab alias and activated tab name.

**Type:** `Ltext`  
**Read-only:** Yes

### activatedTabStatus
Current activated tab status.

**Type:** `Stext`  
**Read-only:** Yes

### dataTypeList
Component variable type list.

**Type:** `BaseDataType[]`  
**Read-only:** Yes

## Events
The tabs component dynamically generates corresponding click events for each tab.

### click[tab name]
Triggered when specified tab is clicked. Event name is dynamically generated based on tab's name, e.g., if tab name is "basicInfo", event name is "clickbasicInfo".

#### Parameter Details
When event is triggered, component's tab variable is automatically updated with clicked tab information.

#### Usage Example
```tsx title="Listen to Tab Click Event"
// Listen to basic information tab click
tabComponent.subscribeEvent("clickbasicInfo", async () => {
  console.log("Basic information tab clicked");
  console.log("Current tab value:", tabComponent.tab.value);
});

// Listen to permission settings tab click
tabComponent.subscribeEvent("clickpermissions", async () => {
  console.log("Permission settings tab clicked");
  // Can load permission data here
  await loadPermissionData();
});
```

## Advanced Features
### Permission Control
Tabs support dynamic show/hide of specific tabs based on RBAC permission configuration. Component automatically calls `setPermConfig` method to filter layoutList.

#### Configuration Example
```tsx title="Permission Configuration Application"
// Permission configuration is automatically applied during component initialization
// Component automatically filters displayable tabs based on permitLayout
const permConfig = {
  permitLayout: ["basicInfo", "permissions"] // Only allow these two tabs
};

// Component internally automatically executes permission filtering
tabComponent.setPermConfig(); // Internal call, developers don't need to call manually
```

### Dynamic Tab Management
Combine `setDisplayTabs` method with permission control to implement flexible tab management strategies.

#### Configuration Example
```tsx title="Smart Tab Display Strategy"
// Dynamically display based on user role and data status
const userRole = await getCurrentUserRole();
const dataStatus = await getDataStatus();

if (userRole === "admin") {
  if (dataStatus.hasAdvancedFeatures) {
    tabComponent.setDisplayTabs("basicInfo,permissions,advanced,audit");
  } else {
    tabComponent.setDisplayTabs("basicInfo,permissions");
  }
} else if (userRole === "editor") {
  tabComponent.setDisplayTabs("basicInfo,permissions");
} else {
  tabComponent.setDisplayTabs("basicInfo");
}
```

### Dynamic Alias and Status Indication
Use `call` method's tabAlias parameter to implement real-time tab title updates.

#### Configuration Example
```tsx title="Smart Tab Alias"
// Listen to data changes, update tab names
async function updateTabAlias() {
  const pendingCount = await getPendingApprovalCount();
  const errorCount = await getErrorCount();
  
  // Update approval tab based on pending count
  if (pendingCount > 0) {
    await tabComponent.call("approval", `Approval Management (${pendingCount})`);
  } else {
    await tabComponent.call("approval", "Approval Management");
  }
  
  // Update system tab based on error status
  if (errorCount > 0) {
    await tabComponent.call("system", `System Settings ⚠️`);
  } else {
    await tabComponent.call("system", "System Settings");
  }
}

// Update periodically or when responding to specific events
setInterval(updateTabAlias, 30000); // Update every 30 seconds
```