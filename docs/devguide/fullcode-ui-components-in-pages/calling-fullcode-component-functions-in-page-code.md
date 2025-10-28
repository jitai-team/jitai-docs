---
sidebar_position: 4
slug: calling-fullcode-component-functions-in-page-code
description: "Call fullcode component functions from page code. Invoke custom component methods and manage component state from pages."
---

# Calling Full-Code Component Functions in Page Code

The page class acts as the central dispatcher for all components, capable of subscribing to full-code component events and directly invoking their methods. This provides powerful page-level control and orchestration capabilities.

## Calling mechanism {#calling-mechanism}

In the page class, each full-code component is instantiated as a class property. This allows the page to directly access all public methods exposed by full-code components:

```typescript title="Component instances in page.ts"
import type { ComponentPageScheme } from "jit";
import { Jit } from "jit";
import schemeJson from "./scheme.json";
import CustomComponent1 from "./CustomComponent1";
import CustomComponent2 from "./CustomComponent2";

type BaseComponent = InstanceType<typeof Jit.BaseComponent>;

class PageCls extends Jit.GridPage {
    // Full-code component instances
    CustomComponent1!: BaseComponent = new CustomComponent1();
    CustomComponent2!: BaseComponent = new CustomComponent2();

    // Standard component instances
    Table1!: BaseComponent;
    Form1!: BaseComponent;

    scheme: ComponentPageScheme = schemeJson;

    // Call full-code components in page methods
    handlePageLevelAction() {
        // Directly call full-code component methods
        const data1 = this.CustomComponent1.getData();
        const result = this.CustomComponent2.processData(data1);

        console.log('Page-level processing result:', result);
    }
}
```

## Calling timing and lifecycle {#calling-timing-and-lifecycle}

Understanding when to call full-code component methods is crucial for proper functionality:

```typescript title="Calling timing in the lifecycle"
class PageCls extends Jit.GridPage {
    CustomComponent!: BaseComponent = new CustomComponent();

    // During page construction (components not fully initialized)
    constructor() {
        super();
        // Not recommended: components may not be fully initialized
        // this.CustomComponent.initialize();
    }

    // During page event binding (components already initialized)
    bindEvent() {
        // Recommended: components are fully initialized at this point
        this.CustomComponent.setupEventHandlers();

        // Subscribe to other component events
        this.Table1.subscribeEvent('ready', () => {
            // Recommended: call after other components are ready
            this.CustomComponent.onTableReady();
        });
    }

    // After page is fully loaded
    onPageReady() {
        // Recommended: initialization after page is fully ready
        this.CustomComponent.onPageReady();
    }

    // Before page destruction
    onPageDestroy() {
        // Recommended: cleanup resources
        this.CustomComponent.cleanup();
    }
}
```

## Related documentation {#related-documentation}

- [Full-Code Component Interface Specifications](./ui-component-interface-specifications) - Learn about the basic structure and public methods of full-code components
- [Calling Page and Component Functions in Full-Code Components](./calling-page-and-component-functions-in-fullcode-components) - Learn about reverse calling methods
- [Publishing and Subscribing Events](./emitting-events) - Learn about event-based component communication methods
