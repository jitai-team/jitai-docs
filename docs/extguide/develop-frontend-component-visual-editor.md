---
sidebar_position: 4
slug: develop-frontend-component-visual-editor
---

# Develop Visual Editors for UI Component Type Elements
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After we completed [Extend Your Own UI Component Type Elements](./add-frontend-components), although components can be used in pages, configuration parameters need to be manually modified in the `scheme.json` file, which is not user-friendly for business experts who are not skilled in coding.

This article will introduce how to develop a visual configuration editor for counter components, achieving the same graphical configuration experience as official components in JitAi development tools.

## Effect Preview
After development is complete, when selecting a counter component in the visual development tool, the right property panel will display a user-friendly configuration interface:

![Editor Effect](./img/visual-editor-configuration-interface.png)

## Editor Architecture
| Element Level | fullName | Main Responsibilities |
|---------|----------|----------|
| **Editor Element** | `components.CounterType.Editor` | type points to `editors.React`, provides visual configuration interface for CounterType |
| **Target Component** | `components.CounterType` | The target component being edited, completed in previous chapters |

### Editor Directory Structure
```shell title="Add Editor subdirectory under CounterType"
components/
└── CounterType/
    ├── e.json                          # Component declaration file
    ├── index.ts                        # Component PC entry
    ├── index.mobile.ts                 # Component mobile entry
    ├── CounterComponent.ts             # Component business logic
    ├── render/                         # Component render layer
    │   ├── pc/
    │   └── mobile/
    └── Editor/                         # Editor directory (new)
        ├── e.json                      # Editor element definition file
        ├── index.ts                    # Editor entry file
        └── Editor.tsx                  # Editor implementation file
```

## Operation Guide
### Create Editor Directory
Create an Editor subdirectory under the CounterType directory:

```bash
# Execute in CounterType directory
mkdir -p Editor
```

### Implement Editor Files
<Tabs>
  <TabItem value="config" label="Element Definition File">

**Create editor element definition file** `components/CounterType/Editor/e.json`:

:::tip Editors are also elements
In JitAi, editors themselves are also elements, with their own `e.json` definition files.
:::

```json title="components/CounterType/Editor/e.json"
{
    "title": "Counter Component Editor",          
    "type":"editors.React",             
    "tag": "config",                    
    "targetType": "components.CounterType",   
    "frontBundleEntry": "index.ts"
}
```

**Editor element configuration description:**

<ul>
<li><code>title</code>: Editor element display name</li>
<li><code>type</code>: Fixed as <code>editors.React</code>, indicating React editor element</li>
<li><code>tag</code>: Fixed as <code>config</code>, indicating configuration editor</li>
<li><code>targetType</code>: Target component's fullName</li>
<li><code>frontBundleEntry</code>: Editor entry file</li>
</ul>

  </TabItem>
  <TabItem value="entry" label="Entry File">

**Create editor entry file** `components/CounterType/Editor/index.ts`:

```typescript title="components/CounterType/Editor/index.ts"
import CounterEditor from "./Editor";
export const Editor = CounterEditor;
```

:::important Editor export specification
Editors must export a component named `Editor`, which is a fixed convention for JitAi tools to recognize editors.
:::

  </TabItem>
  <TabItem value="editor" label="Editor Implementation">

**Create editor main file** `components/CounterType/Editor/Editor.tsx`:

```tsx title="components/CounterType/Editor/Editor.tsx"
import type { FC } from 'react';
import type { CompEditorProps } from 'components/common/types';
import { useState, useEffect, useRef } from 'react';
import { Form, InputNumber } from 'antd';

const CounterEditor: FC<CompEditorProps> = (props) => {
  const { onChangeCompConfig } = props;
  const didMountRef = useRef(false); // Prevent triggering callback during initialization

  // 1. Manage component configuration state
  const [compConfig, setCompConfig] = useState(props.compConfig);

  // 2. Configuration update function
  const updateConfig = (updates: Record<string, any>) => {
    const newConfig = {
      ...compConfig,
      config: {
        ...compConfig.config,
        ...updates,
      },
    };
    setCompConfig(newConfig);
  };

  // 3. Notify parent component when configuration changes (skip initialization)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // Skip callback during component initialization
    }
    onChangeCompConfig?.(compConfig);
  }, [compConfig, onChangeCompConfig]);

  // 4. Render configuration interface
  return (
    <div style={{ padding: '16px' }}>
      <Form layout="vertical">
        <Form.Item label="Initial Value">
          <InputNumber
            value={compConfig.config?.initialValue || 0}
            onChange={(value) => updateConfig({ initialValue: value || 0 })}
            placeholder="Please enter counter initial value"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CounterEditor;
```

  </TabItem>
</Tabs>

## Editor Working Principle
### Data Flow Mechanism
```mermaid
graph LR
    A[Visual Tool] --> B[Editor Component]
    B --> C[Configuration Form]
    C --> D[updateConfig]
    D --> E[useEffect]
    E --> F[onChangeCompConfig]
    F --> A
```

1. **Configuration Reception**: Editor component receives current component configuration through `props.compConfig`
2. **State Management**: Use `useState` to manage configuration state within the editor  
3. **Configuration Update**: `updateConfig` function merges and updates configuration object
4. **Change Monitoring**: `useEffect` monitors configuration changes
5. **Callback Notification**: Notify tool that configuration has changed through `onChangeCompConfig` callback

### Core Interface Specifications
#### CompEditorProps Interface
:::info Interface provided by JitAi
`CompEditorProps` is a standard interface provided by JitAi IDEApp, developers can directly import it from `components/common/types` without defining it themselves.
:::

```typescript
// Import from JitAi, no need to define yourself
import type { CompEditorProps } from 'components/common/types';

interface CompEditorProps {
  compConfig: {
    name: string;           // Component instance name
    title: string;          // Component display title  
    showTitle: boolean;     // Whether to show title
    config: {               // Component custom configuration
      initialValue?: number;
      // Other configuration items...
    };
    // Other system configurations...
  };
  onChangeCompConfig?: (newConfig: any) => void;  // Configuration change callback
}
```

#### Configuration Update Best Practices
```typescript
// ✅ Correct configuration update method
const updateConfig = (updates: Record<string, any>) => {
  const newConfig = {
    ...compConfig,                    // Preserve original configuration
    config: {
      ...compConfig.config,           // Preserve original config
      ...updates,                     // Merge new configuration
    },
  };
  setCompConfig(newConfig);
};

// ❌ Incorrect configuration update method
const updateConfig = (updates: Record<string, any>) => {
  setCompConfig({ config: updates }); // This will lose other configurations
};
```

## Testing
### Make Editor Take Effect
1. **Clear cache**: Delete the `dist` directory in the application directory  
2. **Restart service**: Restart the desktop client
3. **Trigger packaging**: Access the application page, the system will automatically repackage

### Verify Editor Functionality
1. **Open page editor**: Open a page containing counter components in JitAi development tool
2. **Select component**: Click the counter component in the page
3. **View property panel**: The right property panel should display "Initial Value" configuration item
4. **Modify configuration**: Try modifying the initial value, observe if the component updates in real-time
5. **Save verification**: Save the page and reopen it, confirm configuration has been persisted

### Common Issue Troubleshooting
- **Editor not displaying**: Check if `targetType` in `e.json` correctly points to the component
- **Configuration cannot be saved**: Confirm if `onChangeCompConfig` callback is called correctly
- **Initialization error**: Check if `didMountRef` correctly avoids initial callback

## Advanced Extensions
If you need to add more configuration options for the counter component, simply add corresponding form controls in the editor:

```tsx
<Form layout="vertical">
  <Form.Item label="Initial Value">
    <InputNumber
      value={compConfig.config?.initialValue || 0}
      onChange={(value) => updateConfig({ initialValue: value || 0 })}
    />
  </Form.Item>
  
  <Form.Item label="Step">
    <InputNumber
      value={compConfig.config?.step || 1}
      min={1}
      onChange={(value) => updateConfig({ step: value || 1 })}
    />
  </Form.Item>
  
  <Form.Item label="Maximum Value">
    <InputNumber
      value={compConfig.config?.max}
      onChange={(value) => updateConfig({ max: value })}
    />
  </Form.Item>
</Form>
```

Supported Antd components: `InputNumber`, `Input`, `Switch`, `Select`, `DatePicker`, etc.

## Summary
**Core steps** for developing visual editors for frontend components:

1. **Create Editor directory** + configure editor element definition file `e.json` (`type: "editors.React"`)
2. **Implement Editor component**: Receive `CompEditorProps` + render configuration form  
3. **Correct export**: Export component named `Editor`
4. **Configuration synchronization**: Update configuration through `onChangeCompConfig` callback

**Key points**:
- Export name `Editor` cannot be changed
- `CompEditorProps` is provided by JitAi, import directly for use
- Must correctly merge and update configuration objects
- Use `didMountRef` to avoid invalid callbacks during initialization
