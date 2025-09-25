---
sidebar_position: 2
slug: calling-page-and-component-functions-in-fullcode-components
---

# Calling Page and Component Functions in Full-Code Components

In full-code components, you can conveniently call methods of other components on the same page. **The core concept is: the page class acts as a "central dispatcher" that manages all component instances**.

## Calling Principle {#calling-principle}

Imagine the page as a "command center" where all components register themselves:

```typescript title="Component registration in page.ts"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;          // Table component instance
    BlankComponent2!: BaseComponent; // Custom component instance
    // ... other component instances
}
```

Each custom component can access this "command center" through `compIns.page` and then call other components:

```typescript
// In the custom component's Render
const compIns = props.compIns; // Current component instance
const page = compIns.page;     // Access page "command center"

// Call other component methods
page.Table3.call();            // Refresh table data
```

## Practical Examples {#practical-examples}

### Basic Component Calling {#basic-component-calling}

The following example demonstrates how to call methods of other components on the page in full-code components:

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

### Getting Data from Other Components {#getting-data-from-other-components}

Besides calling methods, you can also get data from other components:

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

## Common Component Methods {#common-component-methods}

Different component types provide rich calling methods and data access interfaces. For detailed component methods and interface descriptions, please refer to:

- [JitWeb Component Reference Documentation](../../reference/framework/JitWeb/components/) - View detailed methods and properties of all components

### Basic Calling Pattern {#basic-calling-pattern}

```typescript
// General calling pattern
const page = compIns.page;

// Call component method
page.ComponentName.methodName(parameters);

// Get component data
const data = page.ComponentName.propertyName?.value;
```

## Related Documentation

- [Full-Code Component Interface Specifications](./ui-component-interface-specifications) - Learn about the basic structure and interfaces of full-code components
- [Publishing and Subscribing Events](./emitting-events) - Understand the event communication mechanism between components
- [Calling Full-Code Component Functions in Page Code](./calling-fullcode-component-functions-in-page-code) - Learn about reverse calling methods
