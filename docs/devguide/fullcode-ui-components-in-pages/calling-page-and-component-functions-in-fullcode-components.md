---
sidebar_position: 2
slug: calling-page-and-component-functions-in-fullcode-components
description: "Call page and component functions from fullcode components. Interact with page state and component methods in custom fullcode components."
---

# Calling Page and Component Functions in Full-Code Components

In full-code components, you can easily invoke methods from other components on the same page. **The core concept is: the page class serves as a "central dispatcher" managing all component instances**.

## Calling principle {#calling-principle}

Think of the page as a "command center" where all components register themselves:

```typescript title="Component registration in page.ts"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;          // Table component instance
    BlankComponent2!: BaseComponent; // Custom component instance
    // ... other component instances
}
```

Each custom component can access this "command center" via `compIns.page` and invoke other components:

```typescript
// In the custom component's Render
const compIns = props.compIns; // Current component instance
const page = compIns.page;     // Access page "command center"

// Call other component methods
page.Table3.call();            // Refresh table data
```

## Practical examples {#practical-examples}

### Basic component calling {#basic-component-calling}

The following example demonstrates how to invoke methods from other components on the page within full-code components:

```typescript title="Calling other components in full-code components"
import { Jit } from 'jit';
import { Button, Space } from 'antd';

const Render = (props) => {
  const compIns = props.compIns;
  const page = compIns.page; // Get page instance

  // Call table component method
  const handleRefreshTable = () => {
    if (page.Table1) {
      page.Table1.call(); // Refresh table data
    }
  };

  // Call form component method
  const handleResetForm = () => {
    if (page.Form1) {
      page.Form1.reset(); // Reset form
    }
  };

  // Call other custom component method
  const handleCallCustomComponent = () => {
    if (page.CustomComponent1) {
      page.CustomComponent1.customMethod(); // Call custom method
    }
  };

  return (
    <Space>
      <Button type="primary" onClick={handleRefreshTable}>
        Refresh Table
      </Button>
      <Button onClick={handleResetForm}>
        Reset Form
      </Button>
      <Button onClick={handleCallCustomComponent}>
        Call Custom Component
      </Button>
    </Space>
  );
};

export default class InteractiveComponent extends Jit.BaseComponent {
  Render = Render;
}
```

### Getting data from other components {#getting-data-from-other-components}

In addition to invoking methods, you can also retrieve data from other components:

```typescript title="Getting data from other components"
const Render = (props) => {
  const compIns = props.compIns;
  const page = compIns.page;

  const handleGetTableData = () => {
    if (page.Table1) {
      // Get currently displayed table data
      const displayData = page.Table1.displayRowList?.value || [];
      console.log('Table data:', displayData);

      // Get selected row data
      const selectedRows = page.Table1.selectedRowList?.value || [];
      console.log('Selected rows:', selectedRows);

      // Get currently active row data
      const activeRow = page.Table1.activeRow?.value;
      console.log('Active row:', activeRow);
    }
  };

  const handleGetFormData = () => {
    if (page.Form1) {
      // Get form data
      const formData = page.Form1.getFormData();
      console.log('Form data:', formData);
    }
  };

  return (
    <Space>
      <Button onClick={handleGetTableData}>
        Get Table Data
      </Button>
      <Button onClick={handleGetFormData}>
        Get Form Data
      </Button>
    </Space>
  );
};
```

## Common component methods {#common-component-methods}

Different component types provide a rich set of methods and data access interfaces. For detailed component method and interface documentation, please refer to:

- [JitWeb Component Reference Documentation](../../reference/framework/JitWeb/components/) - View comprehensive methods and properties for all components

### Basic calling pattern {#basic-calling-pattern}

```typescript
// General calling pattern
const page = compIns.page;

// Call component method
page.ComponentName.methodName(parameters);

// Get component data
const data = page.ComponentName.propertyName?.value;
```

## Related documentation {#related-documentation}

- [Full-Code Component Interface Specifications](./ui-component-interface-specifications) - Learn about the basic structure and interfaces of full-code components
- [Publishing and Subscribing Events](./emitting-events) - Understand event communication mechanisms between components
- [Calling Full-Code Component Functions in Page Code](./calling-fullcode-component-functions-in-page-code) - Learn how to call full-code components from page code
