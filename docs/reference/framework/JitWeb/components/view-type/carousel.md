---
slug: carousel
---
# Carousel
Carousel is a view component for displaying images and content, implementing image carousel display, content switching, and user interaction based on data sources. It handles data loading, image rendering, and event processing, supporting autoplay, manual switching, click interaction, and other features, while providing rich style configuration options.

The Carousel element has a hierarchical structure of Meta (components.Meta) → Type (components.Carousel) → Instance. Developers can quickly create Carousel instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.CarouselType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
pages/
└── MyPage/
    ├── e.json
    ├── scheme.json
    └── page.ts
```

```json title="scheme.json - Carousel Configuration"
{
  "componentList": [
    {
      "fullName": "components.Carousel",
      "type": "components.Carousel", 
      "name": "myCarousel",
      "title": "My Carousel",
      "config": {
        "requireElements": [
          {
            "title": "Carousel Data Source",
            "type": "models.Meta",
            "name": "models.ProductModel",
            "filter": "",
            "orderBy": ""
          }
        ],
        "fieldTitle": ["name"],
        "abstract": ["description"], 
        "image": ["imageUrl"],
        "imageNum": 5,
        "style": {
          "autoplaySpeed": 3000,
          "dotPosition": "bottom",
          "effect": "scrollx"
        },
        "defaultRender": true
      },
      "showTitle": true
    }
  ]
}
```

```tsx title="Usage Example"
// Get carousel component instance
const carousel = app.getElement('pages.MyPage.myCarousel');

// Listen for click events
carousel.subscribeEvent('clickRow', async (data) => {
  console.log('Clicked data:', data.activeRow);
});

// Refresh data
await carousel.call();
```

### Configuration Properties
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| requireElements | requireElement[] | Data source configuration, need to specify model element | - | Yes |
| fieldTitle | string[] | Title field list | `[]` | No |
| abstract | string[] | Abstract field list | `[]` | No |
| image | string[] | Image field list | `[]` | Yes |
| imageNum | number | Maximum display image count | 5 | No |
| style | CarouselStyle | Style configuration object | - | No |
| defaultRender | boolean | Whether to use default rendering | true | No |

**CarouselStyle Configuration:**

| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| autoplaySpeed | number | Autoplay speed (milliseconds) | 3000 | No |
| dotPosition | 'top' \| 'bottom' \| 'left' \| 'right' | Dot position | 'bottom' | No |
| effect | 'scrollx' \| 'fade' | Transition animation effect | 'scrollx' | No |

## Variables
### displayRowList
Displayed multi-row data, type `RowList<T>`, read-only property.

Contains filtered and processed data list based on configuration, used for carousel rendering.

```tsx title="Get Display Data"
const carousel = app.getElement('pages.MyPage.myCarousel');
const dataList = carousel.displayRowList.value;
console.log('Carousel data:', dataList);
```

### activeRow
Operated single-row data, type `RowData<T>`, read-only property.

Currently clicked or operated data row, automatically updated in click events.

```tsx title="Get Current Operation Data"
const carousel = app.getElement('pages.MyPage.myCarousel');
carousel.subscribeEvent('clickRow', (data) => {
  console.log('Current operation data:', carousel.activeRow.value);
});
```

### filter
Filter condition, type `QFilter<T>`, read-only property.

Currently applied data filter condition, containing configured filters and runtime conditions.

```tsx title="Get Filter Condition"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Current filter condition:', carousel.filter.value);
```

### loading
Loading state, type `Numeric`, read-only property.

Represents data loading state, 0 means not loaded, 1 means loading.

```tsx title="Check Loading State"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Is loading:', carousel.loading.value === 1);
```

## Methods
### call
Asynchronous method to refresh carousel data.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| qFilter | `QFilter<T>` | Filter condition object | - | No |

#### Return Value
Returns `Promise<void>`

#### Usage Example
```tsx title="Refresh Data"
const carousel = app.getElement('pages.MyPage.myCarousel');

// Refresh without conditions
await carousel.call();

// Refresh with filter conditions
const filter = new app.datatypes.QFilter({
  value: "Q(status='active')"
});
await carousel.call(filter);
```

### destroy
Method to destroy component instance.

#### Return Value
No return value

#### Usage Example
```tsx title="Destroy Component"
const carousel = app.getElement('pages.MyPage.myCarousel');

// Destroy component, clean up event listeners and resources
carousel.destroy();
```

### publishEvent
Asynchronous method to send component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| ex | `Record<string, any>` | Additional data | - | No |

#### Return Value
Returns `Promise<void>`

#### Usage Example
```tsx title="Send Custom Event"
const carousel = app.getElement('pages.MyPage.myCarousel');

await carousel.publishEvent('customEvent', {
  customData: 'example'
});
```

### runCode
Method to execute code snippets.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| code | string | Code string to execute | - | Yes |

#### Return Value
Returns code execution result

#### Usage Example
```tsx title="Execute Code"
const carousel = app.getElement('pages.MyPage.myCarousel');

// Execute code snippet
const result = carousel.runCode('this.displayRowList.value.length');
console.log('Data count:', result);
```

### setConfig
Method to set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| next | `Partial<T>` | New configuration object | - | Yes |
| clean | boolean | Whether to clear original configuration | false | No |

#### Return Value
No return value

#### Usage Example
```tsx title="Set Configuration"
const carousel = app.getElement('pages.MyPage.myCarousel');

// Merge configuration
carousel.setConfig({ imageNum: 8 });

// Replace all configuration
carousel.setConfig({ imageNum: 8, style: { autoplaySpeed: 2000 } }, true);
```

### subscribeEvent
Method to subscribe to component events.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| name | string | Event name | - | Yes |
| evtCb | Function | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscription | true | No |

#### Return Value
Returns subscription ID string

#### Usage Example
```tsx title="Subscribe to Event"
const carousel = app.getElement('pages.MyPage.myCarousel');

const subscriptionId = carousel.subscribeEvent('clickRow', async (data) => {
  console.log('Carousel clicked:', data);
});
```

### unSubscribeEvent
Method to cancel event subscription.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| id | string | Subscription ID | - | Yes |

#### Return Value
No return value

#### Usage Example
```tsx title="Cancel Subscription"
const carousel = app.getElement('pages.MyPage.myCarousel');

const subscriptionId = carousel.subscribeEvent('clickRow', callback);
carousel.unSubscribeEvent(subscriptionId);
```

### updateConfig
Method to update component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| config | ComponentConfig | New configuration object | - | Yes |

#### Return Value
No return value

#### Usage Example
```tsx title="Update Configuration"
const carousel = app.getElement('pages.MyPage.myCarousel');

carousel.updateConfig({
  config: {
    imageNum: 10,
    style: {
      autoplaySpeed: 5000,
      dotPosition: 'top'
    }
  }
});
```

## Attributes
### config
Component configuration object, type `CarouselCompConfig & { requireElements: requireElement[] }`, readable and writable.

Contains complete carousel configuration information, can be updated through updateConfig method.

```tsx title="Access Configuration"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Current configuration:', carousel.config);
console.log('Image count:', carousel.config.imageNum);
```

### app
Application instance, type `App`, read-only property.

Reference to currently running application instance.

```tsx title="Access Application Instance"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Application instance:', carousel.app);
```

### compType
Component type enum, type `COMPONENT_TYPE`, read-only property.

Component type classification.

### name
Component name, type `string`, read-only property.

Unique identifier in the page.

```tsx title="Get Component Name"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Component name:', carousel.name);
```

### page
Page instance, type `BasePage`, read-only property.

Reference to current page instance.

```tsx title="Access Page Instance"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Page instance:', carousel.page);
```

### showTitle
Whether to show title, type `boolean`, read-only property.

Controls component title display state.

```tsx title="Check Title Display State"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Show title:', carousel.showTitle);
```

### title
Component title, type `string`, read-only property.

Component display title.

```tsx title="Get Component Title"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Component title:', carousel.title);
```

### type
Component type identifier, type `string`, read-only property.

Component's Type element identifier.

```tsx title="Get Component Type"
const carousel = app.getElement('pages.MyPage.myCarousel');
console.log('Component type:', carousel.type); // "components.Carousel"
```

## Events
### clickRow
Carousel item click event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|----------------|------|-------------|---------------|----------|
| activeRow | `RowData<T>` | Clicked data row | - | - |

#### Usage Example
```tsx title="Handle Click Event"
const carousel = app.getElement('pages.MyPage.myCarousel');

carousel.subscribeEvent('clickRow', async (data) => {
  const clickedItem = data.activeRow;
  console.log('Clicked product:', clickedItem.value);
  
  // Navigate to detail page
  await app.navigate('pages.ProductDetail', {
    productId: clickedItem.value.id
  });
});
```

## Advanced Features
### Responsive Configuration
Carousel supports different rendering methods for mobile and PC, specified through frontBundleEntry and frontMobileBundleEntry in e.json respectively.

```json title="Mobile Adaptation Configuration"
{
  "config": {
    "style": {
      "autoplaySpeed": 4000,
      "dotPosition": "bottom", 
      "effect": "fade"
    },
    "imageNum": 3
  }
}
```

### Component Lifecycle Management
Component provides complete lifecycle management, supporting dynamic creation, configuration updates, and resource cleanup.

```tsx title="Complete Lifecycle Example"
// Create and configure component
const carousel = app.getElement('pages.MyPage.myCarousel');

// Update configuration
carousel.updateConfig({
  config: { imageNum: 10 }
});

// Clean up resources after use
carousel.destroy();
```