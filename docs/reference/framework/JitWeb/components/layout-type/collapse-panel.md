---
slug: collapse-panel
title: "Collapse Panel Reference"
description: "Collapse Panel Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Collapse Panel"
---
# Collapse Panel
The collapse panel is a content container component that can be expanded and collapsed, supporting nested combinations of single and multiple panels. It handles content categorization, space optimization, and interactive layout management, providing persistent storage of expand/collapse states and flexible panel configuration capabilities.

The collapse panel element has a hierarchical structure of Meta (`components.Meta`) → Type (`components.Collapse`) → Instance. Developers can quickly create collapse panel instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.CollapseType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```tsx title="Recommended Directory Structure"
testApp/
├── pages/
│   └── testPage/
│       ├── e.json
│       ├── scheme.json    # Page configuration, including collapse panel component
│       └── page.tsx
```

```json title="Page Configuration File (scheme.json)"
{
  "componentList": [
    {
      "fullName": "components.Collapse",
      "name": "collapse1",
      "title": "Product Information Panel",
      "config": {
        "accordion": false,
        "ghost": false,
        "layoutList": [
          {
            "name": "basicInfo",
            "title": "Basic Information",
            "layout": [
              {
                "i": "Form1",
                "x": 0,
                "y": 0,
                "w": 24,
                "h": 20
              }
            ],
            "headerColor": "rgba(24, 144, 255, 0.1)"
          },
          {
            "name": "detailInfo", 
            "title": "Detailed Information",
            "layout": [
              {
                "i": "Table1",
                "x": 0,
                "y": 0,
                "w": 48,
                "h": 30
              }
            ],
            "headerColor": "rgba(82, 196, 26, 0.1)"
          }
        ]
      }
    }
  ]
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|---------------|------|-------------|---------------|----------|
| accordion | boolean | Accordion mode, only allows one panel to be expanded at a time | false | No |
| ghost | boolean | Ghost mode, borderless style | false | No |
| layoutList | ICollapseProps[] | Collapse panel configuration list | [] | Yes |

**ICollapseProps Configuration:**

| Property Name | Type | Description | Default Value | Required |
|---------------|------|-------------|---------------|----------|
| name | string | Panel unique identifier | - | Yes |
| title | string | Panel title | - | Yes |
| layout | Layout[] | Panel component layout configuration | [] | Yes |
| headerColor | string | Panel header background color | "rgba(250, 250, 250, 1)" | No |

## Variables
### activeKey
Currently active panel identifier, type is `datatypes.Ltext`. Automatically created when component is instantiated, stores single panel name in accordion mode, stores panel name array in non-accordion mode.

```tsx title="Get Active Panel"
const collapseComponent = app.getElement("components.Collapse");
const currentActiveKey = collapseComponent.activeKey.value;
console.log("Currently active panel:", currentActiveKey);
```

## Methods
### call
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| openPanel | string | Panel name to open, multiple separated by commas | null | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Refresh and Specify Open Panel"
const collapseComponent = app.getElement("components.Collapse");

// Open specified panel
await collapseComponent.call("basicInfo");

// Open multiple panels in non-accordion mode
await collapseComponent.call("basicInfo,detailInfo");

// Reset to default state
await collapseComponent.call();
```

### setShowPanel
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| showPanelNames | string | Panel names to show, multiple separated by commas | - | Yes |

#### Return Value
void

#### Usage Example
```tsx title="Dynamically Control Panel Display"
const collapseComponent = app.getElement("components.Collapse");

// Show only specified panels
collapseComponent.setShowPanel("basicInfo,detailInfo");

// Show single panel
collapseComponent.setShowPanel("basicInfo");
```

### changeCollapse
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| key | string | Panel identifier to toggle | - | Yes |

#### Return Value
void

#### Usage Example
```tsx title="Toggle Panel State"
const collapseComponent = app.getElement("components.Collapse");

// Toggle panel (internal method, usually triggered by user interaction)
collapseComponent.changeCollapse("basicInfo");
```

### publishEvent
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Additional data | - | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Publish Custom Event"
const collapseComponent = app.getElement("components.Collapse");

// Publish custom event
await collapseComponent.publishEvent("customEvent", { data: "test" });
```

### subscribeEvent
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | (data: any) => Promise&lt;void&gt; &#124; void | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscriptions | true | No |

#### Return Value
string - Subscription handle ID

#### Usage Example
```tsx title="Subscribe to Event"
const collapseComponent = app.getElement("components.Collapse");

// Subscribe to panel open event
const handleId = collapseComponent.subscribeEvent("openBasicInfo", async (data) => {
    console.log("Basic information panel opened", data);
});
```

### unSubscribeEvent
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Subscription handle ID | - | Yes |

#### Return Value
boolean

#### Usage Example
```tsx title="Unsubscribe"
const collapseComponent = app.getElement("components.Collapse");

// Cancel event subscription
collapseComponent.unSubscribeEvent(handleId);
```

### setConfig
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | Partial&lt;CollapseComponentConfig&gt; | New configuration object | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
void

#### Usage Example
```tsx title="Dynamically Update Configuration"
const collapseComponent = app.getElement("components.Collapse");

// Update configuration
collapseComponent.setConfig({
    accordion: true,
    layoutList: [
        {
            name: "newPanel",
            title: "New Panel",
            layout: [],
            headerColor: "rgba(0, 123, 255, 1)"
        }
    ]
});
```

### destroy
#### Return Value
void

#### Usage Example
```tsx title="Destroy Component"
const collapseComponent = app.getElement("components.Collapse");

// Destroy component, clean up all event subscriptions and variable references
collapseComponent.destroy();
```

### runCode
#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code string to execute | - | Yes |

#### Return Value
any - Code execution result

#### Usage Example
```tsx title="Execute Code"
const collapseComponent = app.getElement("components.Collapse");

// Execute code in page context
const result = collapseComponent.runCode("this.userName");
```

### getPermConfig
#### Return Value
Record&lt;string, any&gt; &#124; undefined - Permission configuration object

#### Usage Example
```tsx title="Get Permission Configuration"
const collapseComponent = app.getElement("components.Collapse");

// Get component permission configuration
const permConfig = collapseComponent.getPermConfig();
if (permConfig?.visible === false) {
    // Component is not visible
}
```

## Properties
### name
Component instance name, used to uniquely identify the component in the page.

### title
Component display title, name shown in the visual editor.

### fullName
Component full name, containing the complete path identifier of the element type, value is `"components.Collapse"`.

### type
Component type identifier, representing the component's Type element type, value is `"components.Collapse"`.

### showTitle
Whether to show component title, controls whether to display the component title in the page.

### app
Associated application instance, provides access to the current runtime application.

### page
Associated page instance, provides access to the current page.

### config
Component configuration object, type is `CollapseComponentConfig`, containing complete component configuration information.

```tsx title="Get Component Configuration"
const collapseComponent = app.getElement("components.Collapse");
const config = collapseComponent.config;
console.log("Accordion mode:", config.accordion);
console.log("Ghost mode:", config.ghost);
console.log("Panel configuration:", config.layoutList);
```

### showPanelList
Current visible panel list, type is `ICollapseProps[]`. This property contains all current visible panel configuration information.

```tsx title="Get Visible Panel Information"
const collapseComponent = app.getElement("components.Collapse");
const visiblePanels = collapseComponent.showPanelList;
console.log("Number of visible panels:", visiblePanels.length);
console.log("Panel information:", visiblePanels.map(panel => panel.title));
```

## Events
Collapse panel events are dynamically generated based on configured panels, with each panel corresponding to an open event.

### Dynamic Panel Events
#### Parameter Details
No parameters

#### Usage Example
```tsx title="Listen to Panel Open Event"
const collapseComponent = app.getElement("components.Collapse");

// Listen to basic information panel open
collapseComponent.subscribeEvent("openBasicInfo", async () => {
    console.log("Basic information panel opened");
    await loadBasicData();
});
```

## Advanced Features
### Permission Control Configuration
Collapse panels support permission-based panel display control. Permission configuration can control which panels specific user roles can see.

```tsx title="Permission Control Example"
const collapseComponent = app.getElement("components.Collapse");

// Dynamically set visible panels based on user permissions
const userRole = getCurrentUserRole();
if (userRole === "admin") {
    collapseComponent.setShowPanel("basicInfo,detailInfo,adminInfo");
} else {
    collapseComponent.setShowPanel("basicInfo");
}
```

### Style Customization
Through the `headerColor` property, you can customize the header color of each panel to achieve visual distinction.

```json title="Custom Panel Styles"
{
  "layoutList": [
    {
      "name": "errorPanel",
      "title": "Error Information",
      "headerColor": "rgba(255, 77, 79, 0.1)",
      "layout": []
    },
    {
      "name": "successPanel", 
      "title": "Success Information",
      "headerColor": "rgba(82, 196, 26, 0.1)",
      "layout": []
    }
  ]
}
```

### Panel State Management
Supports state persistence and dynamic state control, implementing panel state saving and restoration.

```tsx title="State Persistence"
const collapseComponent = app.getElement("components.Collapse");

// Save current state
const saveState = () => {
    const state = {
        activeKey: collapseComponent.activeKey.value,
        visiblePanels: collapseComponent.showPanelList.map(p => p.name)
    };
    localStorage.setItem("collapseState", JSON.stringify(state));
};

// Restore state  
const restoreState = () => {
    const savedState = localStorage.getItem("collapseState");
    if (savedState) {
        const state = JSON.parse(savedState);
        collapseComponent.setShowPanel(state.visiblePanels.join(","));
        collapseComponent.call(Array.isArray(state.activeKey) ? 
            state.activeKey.join(",") : state.activeKey);
    }
};
```

### Dynamic Content Loading
Combined with event mechanisms, panel content lazy loading can be implemented to improve page performance.

```tsx title="Lazy Loading Configuration"
const collapseComponent = app.getElement("components.Collapse");

// Listen to panel open events to implement lazy loading
collapseComponent.subscribeEvent("openDetailInfo", async () => {
    const detailTable = app.getElement("Table1");
    if (!detailTable.hasData) {
        // Show loading state
        showLoading();
        
        // Asynchronously load data
        const data = await fetchDetailData();
        detailTable.setData(data);
        
        // Hide loading state
        hideLoading();
    }
});
```