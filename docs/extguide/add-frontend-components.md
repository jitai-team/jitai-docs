---
sidebar_position: 3
slug: add-frontend-components
---

# Extend Your Own UI Component Type Elements
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When existing frontend components in the JitAi development framework cannot meet specific business requirements, developers can extend new components under `components.Meta` and add these new components to pages in the JitAi visual development tool.

Next, we'll use a simple counter component as an example to demonstrate how to add frontend components. The counter component has basic functionality such as displaying values and clicking buttons to increment/decrement values.

:::tip Tip
In the frontend domain, existing portal and page types are completely sufficient, so there's actually not much need for extension, but components have enormous extension potential to handle various personalized display requirements.
:::

### Effect Preview
![Counter Component](./img/add-frontend-component-type-counter.png)

### Element Design
| Element Level | fullName | Main Responsibilities |
|---------|----------|----------|
| **Meta Element** | `components.Meta` | Existing Meta element in JitAi development framework (no need to create) |
| **Type Element** | `components.CounterType` | type points to `components.Meta`, encapsulates basic counter functionality, handles value increment/decrement, style configuration, etc. |
| **Configuration when used in pages** | Page scheme.json | Configure specific runtime parameters for components in pages and declare events, functions, variables |

#### Counter Component Directory Structure
```shell title="Recommended Directory Structure"
├── components/
│   └── CounterType/
│       ├── e.json
│       ├── constants.ts          # Constant definitions
│       ├── index.ts              # PC entry file
│       ├── index.mobile.ts       # Mobile entry file
│       ├── CounterComponent.ts   # Business logic layer (shared by PC and mobile)
│       └── render/
│           ├── pc/
│           │   └── CounterRender.tsx    # PC rendering component
│           └── mobile/
│               └── CounterRender.tsx    # Mobile rendering component
```

## Operation Guide
### Create Directory Structure
In your JitAi application root directory, create directories according to the following structure:

```bash
# Execute in application root directory
mkdir -p components/CounterType
mkdir -p components/CounterType/render/pc
mkdir -p components/CounterType/render/mobile
```

### Implement Element Files
<Tabs>
  <TabItem value="config" label="Element Definition File">

**Create element declaration file** `components/CounterType/e.json`:

```json title="components/CounterType/e.json"
{
  "frontBundleEntry": "./index.ts",
  "frontMobileBundleEntry": "./index.mobile.ts",
  "description": "Counter Type element, encapsulates core counter functionality",
  "title": "Counter Component",
  "type": "components.Meta",
  "outputName": "index"
}
```

  </TabItem>
  <TabItem value="entry" label="Entry Files">

**Create PC entry file** `components/CounterType/index.ts`:

```typescript title="components/CounterType/index.ts"
import Render from './render/pc/CounterRender';
import { CounterComponent } from './CounterComponent';
export { COUNTER_EVENTS } from './constants';

// Rename exports for JitAi tool recognition
export { CounterComponent as ComponentCls, Render };
```

**Create mobile entry file** `components/CounterType/index.mobile.ts`:

```typescript title="components/CounterType/index.mobile.ts"
import Render from './render/mobile/CounterRender';
import { CounterComponent } from './CounterComponent';
export { COUNTER_EVENTS } from './constants';

// Rename exports for JitAi tool recognition
export { CounterComponent as ComponentCls, Render };
```

  </TabItem>
  <TabItem value="render" label="Render Components">

**Create PC rendering component** `components/CounterType/render/pc/CounterRender.tsx`:

```tsx title="components/CounterType/render/pc/CounterRender.tsx"
import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface CounterRenderProps {
  compIns: any; // Component instance
}

const CounterRender: React.FC<CounterRenderProps> = ({ compIns }) => {
  const [count, setCount] = useState(compIns.config?.initialValue || 0);

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    compIns.value = newValue;
  };

  const handleDecrement = () => {
    const newValue = count - 1;
    setCount(newValue);
    compIns.value = newValue;
  };

  return (
    <div>
      <Title level={4}>Counter</Title>
      <Space>
        <Button onClick={handleDecrement}>-</Button>
        <Text>{count}</Text>
        <Button onClick={handleIncrement}>+</Button>
      </Space>
    </div>
  );
};

export default CounterRender;
```

**Create mobile rendering component** `components/CounterType/render/mobile/CounterRender.tsx`:

```tsx title="components/CounterType/render/mobile/CounterRender.tsx"
import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface CounterRenderProps {
  compIns: any; // Component instance
}

const CounterRender: React.FC<CounterRenderProps> = ({ compIns }) => {
  const [count, setCount] = useState(compIns.config?.initialValue || 0);

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    compIns.value = newValue;
  };

  const handleDecrement = () => {
    const newValue = count - 1;
    setCount(newValue);
    compIns.value = newValue;
  };

  return (
    <div>
      <Title level={5}>Counter</Title>
      <Space>
        <Button onClick={handleDecrement}>-</Button>
        <Text>{count}</Text>
        <Button onClick={handleIncrement}>+</Button>
      </Space>
    </div>
  );
};

export default CounterRender;
```

  </TabItem>
  <TabItem value="component" label="Business Logic">

**Create constants file** `components/CounterType/constants.ts`:

```typescript title="components/CounterType/constants.ts"
// Counter event type constants
export const COUNTER_EVENTS = {
  VALUE_CHANGE: 'valueChange'
} as const;
```

**Create component logic class** `components/CounterType/CounterComponent.ts`:

```typescript title="components/CounterType/CounterComponent.ts"
import type { ComponentConfig } from 'components/Meta/frontend/type';
import { Jit } from 'jit';

export class CounterComponent extends Jit.BaseComponent {
  public value: number;

  /**
   * Must implement: Get component variable list
   * Used by visual editor to display available variables
   */
  static getVariableList(compConfig: Record<string, any>) {
    return [
      {
        name: 'value',
        title: 'Current Value',
        dataType: 'Numeric'
      }
    ];
  }

  /**
   * Must implement: Get component function list
   * Used by visual editor to display callable methods
   */
  static getFuncList(compConfig: Record<string, any>) {
    return [
      {
        title: 'Get Value',
        name: 'getValue',
        args: []
      }
    ];
  }

  /**
   * Must implement: Get component event list
   * Used by visual editor to display listenable events
   */
  static getEventList() {
    return [
      {
        name: 'valueChange',
        title: 'Value Change',
        data: 'eventData'
      }
    ];
  }

  constructor(componentInfo: ComponentConfig<any>) {
    super(componentInfo);
    this.value = this.config?.initialValue || 0;
  }

  getValue(): number {
    return this.value;
  }

  async init() {
    await super.init();
  }
}
```

  </TabItem>
</Tabs>

:::important Frontend component Type elements must meet the following specifications to be effectively recognized and loaded by the page editor
**1. Exactly match the following export names**
- Component class export must use the `ComponentCls` name
- Renderer class export must use the `Render` name  
- Actual class names can be customized (such as CounterComponent, CounterRender, etc.)
**2. Implement three static methods**  

```typescript
// Get component variable list (used by editor to display available variables)
static getVariableList(compConfig: Record<string, any>): Array<{
  name: string;
  title: string; 
  dataType: 'Numeric' | 'JSON' | 'Text';
  readonly?: boolean;
}>

// Get component function list (used by editor to display callable methods)
static getFuncList(compConfig: Record<string, any>): Array<{
  title: string;
  name: string;
  args: Array<{
    name: string;
    title: string;
    dataType: 'Numeric' | 'JSON' | 'Text';
  }>;
}>

// Get component event list (used by editor to display listenable events)
static getEventList(): Array<{
  name: string;
  title: string;
  data: string;
}>
```
**Method descriptions:**
- `getVariableList`: Tells the editor which variables the component has that can be referenced in pages
- `getFuncList`: Tells the editor which methods the component has that can be called in pages  
- `getEventList`: Tells the editor which events the component will trigger for pages to listen to
:::

### Testing
#### Make New Elements Take Effect
1. **Clear cache**: Delete the `dist` directory in the application directory  
2. **Restart service**: Restart the desktop client
3. **Trigger packaging**: Access the application page, the system will automatically repackage

#### Test in Regular Pages
Enter the JitAi visual development tool, create a `Regular Page`, and add the just-created `Counter` component to the page.

When switching to code mode, you'll see the following configuration automatically generated in the page's `scheme.json` file:

```json title="Page scheme.json Configuration"
{
    "layout": [
        {
            "i": "CounterType2",
            "x": 0,
            "y": 0,
            "w": 48,
            "h": 30
        }
    ],
    "componentList": [
        {
            "fullName": "components.CounterType",
            "type": "components.CounterType",
            "name": "CounterType2",
            "title": "Counter Component 2",
            "config": {
                "requireElements": []
            },
            "showTitle": true,
            "eventList": [
                {
                    "name": "valueChange",
                    "title": "Value Change",
                    "data": "eventData"
                }
            ],
            "functionList": [
                {
                    "title": "Get Value",
                    "name": "getValue",
                    "args": []
                }
            ],
            "variableList": [
                {
                    "name": "value",
                    "title": "Current Value",
                    "dataType": "Numeric"
                }
            ]
        }
    ],
    "autoIncrementId": 3,
    "variableList": [],
    "functionList": [],
    "matchUarParamsVariableNameList": []
}
```

**Basic functionality verification**:
- Check if the counter component displays normally in the page
- Click the plus button to verify if the value increases
- Click the minus button to verify if the value decreases
- Check if the component title displays correctly

You can try modifying configuration items in the `scheme.json` file (such as name, title, showTitle, etc.), then switch to visual mode to see what changes occur in the counter component.

## Summary
**Core steps** for adding frontend component Type elements:

1. **Create directory structure**: `components/YourType/` + required files
2. **Configure e.json**: `type: "components.Meta"`
3. **Implement component class**: Inherit `BaseComponent` + three static methods
4. **Create render component**: React component that receives `compIns` parameter
5. **Correct exports**: `ComponentCls` and `Render`

**Key points**:
- Export names `ComponentCls`/`Render` cannot be changed
- Must implement `getVariableList`/`getFuncList`/`getEventList`

## Advanced Thinking
Manually modifying configuration items in the page scheme.json is feasible but not intuitive or user-friendly, making it inconvenient for business experts during visual construction.

How can we configure counter component parameters in the visual interface just like official components?

Please refer to [Develop Visual Editors for Frontend Component Elements](./develop-frontend-component-visual-editor).