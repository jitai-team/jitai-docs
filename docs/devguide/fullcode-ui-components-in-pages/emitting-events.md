---
sidebar_position: 3
slug: emitting-events
---

# Publishing and Subscribing Events

When other components on the page trigger events (such as table rows being clicked or buttons being pressed), your custom components can "listen" and respond to these events. At the same time, full-code components can also publish their own events for other components or pages to subscribe to. **The core concept is: centrally subscribe to events in the page class's `bindEvent()` method**.

## Event Subscription Principles {#event-subscription-principles}

The page class not only manages component instances but also coordinates event communication between components, acting like a "message relay station":

```typescript title="Event subscription in page.ts"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;
    BlankComponent2!: BaseComponent = new BlankComponent2();

    bindEvent() {
        // Subscribe to table row click event
        this.Table3.subscribeEvent('clickRow', (data) => {
            // When table row is clicked, notify custom component
            this.BlankComponent2.handleTableRowClick(data);
        });

        // Subscribe to custom component event
        this.BlankComponent2.subscribeEvent('handleClickMe', () => {
            // Can execute page-level logic here
            console.log('Received click event from custom component');
        });
    }
}
```

## Responding to Events in Full-Code Components {#respond-in-custom-components}

To enable custom components to respond to events from other components, you need to add corresponding methods in the component class:

```typescript title="BlankComponent2.tsx"
export default class BlankComponent2 extends Jit.BaseComponent {
    Render = Render;

    // Method to respond to table row click event
    handleTableRowClick(rowData) {
        // Get clicked row data
        const rowId = rowData?.id?.value;
        message.info(`Table row clicked, ID: ${rowId}`);

        // Can trigger component re-render or execute other logic
        this.setState({ selectedRowId: rowId });
    }

    getData() {
        return 'so cool !!!';
    }
}
```

## Publishing Custom Events {#publishing-custom-events}

Full-code components can publish their own events through the `publishEvent()` method:

```typescript title="Publishing events in full-code components"
import { Jit } from 'jit';
import { Button, Space, message } from 'antd';

const Render = (props) => {
  const compIns = props.compIns;

  const handleSimpleEvent = () => {
    // Publish simple event
    compIns.publishEvent('buttonClicked');
    message.info('Event published');
  };

  const handleEventWithData = () => {
    // Publish event with data
    const eventData = {
      message: 'Hello from component',
      timestamp: new Date().toISOString(),
      userId: 123
    };
    compIns.publishEvent('dataUpdated', eventData);
    message.info('Event with data published');
  };

  const handleComplexEvent = () => {
    // Publish complex event
    const complexData = {
      action: 'userAction',
      details: {
        type: 'click',
        position: { x: 100, y: 200 },
        metadata: {
          componentId: 'BlankComponent2',
          version: '1.0.0'
        }
      }
    };
    compIns.publishEvent('complexAction', complexData);
    message.info('Complex event published');
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={handleSimpleEvent}>
        Publish Simple Event
      </Button>
      <Button onClick={handleEventWithData}>
        Publish Event with Data
      </Button>
      <Button onClick={handleComplexEvent}>
        Publish Complex Event
      </Button>
    </Space>
  );
};

export default class EventPublisher extends Jit.BaseComponent {
  Render = Render;
}
```

## Subscribable Event Types {#subscribable-events}

The events that each component can subscribe to come from the `eventList` configuration of that component in `scheme.json`.

### Standard Component Events {#standard-component-events}

Different types of standard components provide their respective event types. For detailed component event lists, please refer to:

- [JitWeb Component Reference Documentation](../../reference/framework/JitWeb/components/) - View specific event lists and parameter descriptions for each component

### Custom Events in Full-Code Components {#custom-component-events}

Full-code components can publish any custom events through `publishEvent()`:

```typescript
// In full-code components
compIns.publishEvent('customEvent', eventData);
compIns.publishEvent('dataChanged', newData);
compIns.publishEvent('userInteraction', interactionDetails);
```

## Bidirectional Communication Example {#bidirectional-communication-example}

The following is a complete bidirectional communication example that demonstrates how full-code components communicate with other components through events:

```typescript title="Complete bidirectional communication example"
// Full-code component renderer
const Render = (props) => {
    const compIns = props.compIns;
    const [tableData, setTableData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleRefreshAndNotify = () => {
        // 1) Call other component method
        compIns.page.Table3.refresh();

        // 2) Publish event to page
        compIns.publishEvent('refreshTriggered', {
            timestamp: Date.now(),
            triggeredBy: 'RefreshButton'
        });
    };

    const handleDataProcess = () => {
        // Simulate data processing
        const processedData = tableData.map(item => ({
            ...item,
            processed: true,
            processedAt: new Date().toISOString()
        }));

        // Publish data processing complete event
        compIns.publishEvent('dataProcessed', {
            originalCount: tableData.length,
            processedCount: processedData.length,
            data: processedData
        });
    };

    return (
        <div>
            <Space>
                <Button type="primary" onClick={handleRefreshAndNotify}>
                    Refresh Table and Notify
                </Button>
                <Button onClick={handleDataProcess}>
                    Process Data
                </Button>
            </Space>

            {selectedRowId && (
                <div style={{ marginTop: 16 }}>
                    Current selected row ID: {selectedRowId}
                </div>
            )}
        </div>
    );
};

// Full-code component class
export default class InteractiveComponent extends Jit.BaseComponent {
    Render = Render;

    // Respond to table row click event
    handleTableRowClick(rowData) {
        const rowId = rowData?.id?.value;
        // Update component state (if using state management)
        // Can update UI through re-rendering or other means
        message.info(`Received table click, row ID: ${rowId}`);

        // Can publish secondary event
        this.publishEvent('rowSelected', { selectedId: rowId });
    }

    // Respond to data changes from other components
    handleDataUpdate(newData) {
        console.log('Received data update:', newData);

        // Process data and possibly publish new event
        this.publishEvent('componentDataUpdated', {
            componentName: 'InteractiveComponent',
            updatedData: newData,
            updateTime: new Date()
        });
    }
}
```

```typescript title="Event subscription configuration in page class"
class PageCls extends Jit.GridPage {
    Table3!: BaseComponent;
    InteractiveComponent!: BaseComponent = new InteractiveComponent();

    bindEvent() {
        // Subscribe to table events, forward to custom component
        this.Table3.subscribeEvent('clickRow', (data) => {
            this.InteractiveComponent.handleTableRowClick(data);
        });

        // Subscribe to custom component events
        this.InteractiveComponent.subscribeEvent('refreshTriggered', (data) => {
            console.log('Received refresh trigger event:', data);
            // Can execute page-level logic, such as updating page title, logging, etc.
        });

        this.InteractiveComponent.subscribeEvent('dataProcessed', (data) => {
            console.log('Data processing complete:', data);
            // Can update other components or execute follow-up operations
            message.success(`Processed ${data.processedCount} records`);
        });

        this.InteractiveComponent.subscribeEvent('rowSelected', (data) => {
            console.log('Row selected:', data.selectedId);
            // Can synchronously update other component states
        });
    }
}
```

## Related Documentation

- [Full-Code Component Interface Specifications](./ui-component-interface-specifications) - Learn about the basic structure of full-code components
- [Calling Page and Component Functions in Full-Code Components](./calling-page-and-component-functions-in-fullcode-components) - Learn about directly calling other component methods
- [Calling Full-Code Component Functions in Page Code](./calling-fullcode-component-functions-in-page-code) - Learn about calling component functions from page code
