---
slug: cross-table
---
# Cross Table
Cross table is a specialized table component for data pivoting and cross-analysis, implemented based on AntV S2 to display multi-dimensional data in row-column intersections. It handles multi-dimensional data grouping, aggregation calculations, and cross-analysis, supporting dynamic dimension configuration, data drilling, and complex data visualization requirements. It is a core component for business intelligence and data analysis scenarios.

The cross table element has a hierarchical structure of Meta (`components.Meta`) → Type (`components.CrossTable`) → Instance. Developers can quickly create cross table instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.CrossTableType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```text title="Recommended Directory Structure"
MyApp/
├── models/
│   └── SalesModel/
│       ├── model.py
│       ├── e.json
│       └── __init__.py
└── pages/
    └── DataAnalysisPage/
        ├── page.tsx
        ├── e.json
        └── scheme.json
```

```json title="scheme.json - Cross Table Configuration"
{
  "components": [
    {
      "fullName": "components.CrossTable",
      "type": "components.CrossTable", 
      "name": "CrossTable1",
      "title": "Sales Data Cross Table",
      "config": {
        "requireElements": [
          {
            "title": "Sales Data Model",
            "type": "models.Meta",
            "name": "models.SalesModel",
            "filter": "",
            "orderBy": ""
          }
        ],
        "fieldsList": [
          [
            {
              "type": "dimension",
              "name": "region",
              "alias": "Region",
              "fullName": "t1.region",
              "dataType": "Stext",
              "orderType": "",
              "axisType": "row"
            }
          ],
          [
            {
              "type": "dimension", 
              "name": "product",
              "alias": "Product",
              "fullName": "t1.product",
              "dataType": "Stext",
              "orderType": "",
              "axisType": "col"
            }
          ],
          [
            {
              "type": "measure",
              "name": "amount",
              "alias": "Sales Amount",
              "fullName": "t1.amount",
              "dataType": "Money",
              "ormType": "SUM",
              "axisType": "value"
            }
          ]
        ],
        "sheetType": "pivot",
        "hierarchyType": "grid",
        "showZebraStripe": true
      }
    }
  ]
}
```

```tsx title="page.tsx - Page Usage"
export default function DataAnalysisPage() {
  const crossTable = app.getElement('CrossTable1');
  
  // Refresh data
  const handleRefresh = () => {
    crossTable.call();
  };
  
  return (
    &lt;div&gt;
      &lt;h2&gt;Data Analysis Page&lt;/h2&gt;
      &lt;button onClick={handleRefresh}&gt;Refresh Data&lt;/button&gt;
      &lt;{crossTable.name} /&gt;
    &lt;/div&gt;
  );
}
```

### Configuration Properties
| Property Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| requireElements | requireElement[] | Dependent data model configuration | - | Yes |
| fieldsList | CommonFieldSelectorItem[][] | Field configuration list, corresponding to row dimensions, column dimensions, and value fields | - | Yes |
| sheetType | &#124; 'pivot' &#124; 'table' | Table type, pivot for pivot table | 'pivot' | No |
| hierarchyType | 'grid' &#124; 'tree' | Hierarchy display type | 'grid' | No |
| showZebraStripe | boolean | Whether to show zebra stripes | false | No |
| hierarchyCollapse | boolean | Whether to support hierarchy collapse | false | No |
| canExport | boolean | Whether to support export | false | No |
| canRefresh | boolean | Whether to support refresh | false | No |
| themeCfg | ThemeCfg | Theme configuration | - | No |

## Variables
### dimensionFilter
Read-only variable of type `datatypes.QFilter`, representing dimension filter conditions.

**Properties**:
- `value`: Filter condition value
- Supports Q expression syntax for building complex filter conditions

### detailFilter
Read-only variable of type `datatypes.QFilter`, representing detail filter conditions.

**Properties**:
- `value`: Filter condition value  
- Used for filtering detail data

### loading
Numeric type variable representing loading state.

**Properties**:
- `value`: 0 indicates not loaded, 1 indicates loading

## Methods 
### call
Refresh cross table data.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| qFilter | Qex | Filter condition object | - | No |

#### Return Value
No return value

#### Usage Example
```tsx title="Refresh Data Example"
const crossTable = app.getElement('CrossTable1');

// Refresh without conditions
crossTable.call();

// Refresh with filter conditions
const filter = Q("region='South China'");
crossTable.call(filter);
```

### getDataList
Get table data list.

#### Parameter Details
No parameters

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Get Data Example"
const crossTable = app.getElement('CrossTable1');

// Get data
await crossTable.getDataList();
console.log(crossTable.rowDataList);
```

### checkConfig
Check if configuration is valid.

#### Parameter Details
No parameters

#### Return Value
boolean - Whether configuration is valid

#### Usage Example
```tsx title="Configuration Check Example"
const crossTable = app.getElement('CrossTable1');

if (crossTable.checkConfig()) {
  console.log('Configuration is valid');
} else {
  console.log('Configuration is invalid, please check field configuration');
}
```

### publishEvent
Publish component event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| ex | Record&lt;string, any&gt; | Event data | - | No |

#### Return Value
Promise&lt;void&gt;

### subscribeEvent
Subscribe to component event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| name | string | Event name | - | Yes |
| evtCb | (data: any) =&gt; Promise&lt;void&gt; &#124; void | Event callback function | - | Yes |
| unSubscribeExist | boolean | Whether to cancel existing subscription | true | No |

#### Return Value
string - Event handler ID

### setConfig
Set component configuration.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| next | Partial&lt;CrossTableCompConfig&gt; | New configuration | - | Yes |
| clean | boolean | Whether to completely replace configuration | false | No |

#### Return Value
No return value

### unSubscribeEvent
Unsubscribe from component event.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| id | string | Event handler ID | - | Yes |

#### Return Value
boolean - Whether successfully unsubscribed

#### Usage Example
```tsx title="Unsubscribe Event Example"
const crossTable = app.getElement('CrossTable1');

// Subscribe to event and get handler ID
const handlerId = crossTable.subscribeEvent('clickDetail', (data) => {
  console.log('Handle click event');
});

// Unsubscribe
crossTable.unSubscribeEvent(handlerId);
```

### destroy
Destroy component, clean up all resources and event listeners.

#### Parameter Details
No parameters

#### Return Value
No return value

#### Usage Example
```tsx title="Destroy Component Example"
const crossTable = app.getElement('CrossTable1');

// Clean up resources when component is destroyed
crossTable.destroy();
```

### runCode
Execute code string in page context.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| code | string | Code string to execute | - | Yes |

#### Return Value
any - Code execution result

#### Usage Example
```tsx title="Run Code Example"
const crossTable = app.getElement('CrossTable1');

// Execute code snippet
const result = crossTable.runCode('self.getElement("OtherComponent").call()');
```

### getPermConfig
Get current component's permission configuration.

#### Parameter Details
No parameters

#### Return Value
Record&lt;string, any&gt; &#124; undefined - Permission configuration object

#### Usage Example
```tsx title="Permission Check Example"
const crossTable = app.getElement('CrossTable1');

const permConfig = crossTable.getPermConfig();
if (permConfig?.canExport) {
  // Show export button
  showExportButton();
}
```

## Properties
### name
Component name, type `string`, read-only.

### title
Component title, type `string`, read-only.

### config
Component configuration object, type `CrossTableCompConfig`, read-write.

### type
Component type, value `"components.CrossTable"`, read-only.

### fullName
Component full name, type `string`, read-only.

### rowDataList
Table data list, type `Record<string, any>[]`, read-only.

### ModelClass
Associated model class, type `typeof Jit.BaseModel`, read-only.

### app
Application instance, type `App`, read-only.

### page
Page instance, type `BasePage`, read-only.

### compType
Component type, type `COMPONENT_TYPE`, read-only.

### showTitle
Whether to show component title, type `boolean`, read-only.

### dataTypeList
Component's data type configuration list, type `BaseDataType[]`, read-only.

## Events
### clickDetail
Triggered when clicking on detail data.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | Record&lt;string, any&gt; | Clicked data row | - | - |

#### Usage Example
```tsx title="Listen to Detail Click Event"
const crossTable = app.getElement('CrossTable1');

crossTable.subscribeEvent('clickDetail', (data) => {
  console.log('Clicked detail data:', data);
  // Navigate to detail page or show detail modal
  app.getElement('DetailModal').show(data);
});
```

### clickDimension
Triggered when clicking on dimension values.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| data | Record&lt;string, any&gt; | Clicked dimension data | - | - |

#### Usage Example
```tsx title="Listen to Dimension Click Event"
const crossTable = app.getElement('CrossTable1');

crossTable.subscribeEvent('clickDimension', (data) => {
  console.log('Clicked dimension:', data);
  // Execute drill-down operation
  const filter = Q(`region='${data.region}'`);
  crossTable.call(filter);
});
```

## Advanced Features
### Multi-dimensional Data Analysis
Cross table supports complex multi-dimensional data pivot analysis, allowing configuration of multiple row and column dimensions.

```json title="Multi-dimensional Configuration Example"
{
  "fieldsList": [
    [
      {
        "type": "dimension",
        "name": "year",
        "alias": "Year",
        "axisType": "row"
      },
      {
        "type": "dimension", 
        "name": "quarter",
        "alias": "Quarter",
        "axisType": "row"
      }
    ],
    [
      {
        "type": "dimension",
        "name": "region", 
        "alias": "Region",
        "axisType": "col"
      },
      {
        "type": "dimension",
        "name": "product",
        "alias": "Product",
        "axisType": "col"
      }
    ],
    [
      {
        "type": "measure",
        "name": "sales",
        "alias": "Sales Amount",
        "ormType": "SUM",
        "axisType": "value"
      },
      {
        "type": "measure", 
        "name": "profit",
        "alias": "Profit",
        "ormType": "SUM",
        "axisType": "value"
      }
    ]
  ]
}
```

### Theme Customization
Supports rich theme configuration options for customizing table styles.

```tsx title="Theme Configuration Example"
const crossTable = app.getElement('CrossTable1');

crossTable.setConfig({
  themeCfg: {
    theme: {
      rowCell: {
        text: {
          fontSize: 14,
          fill: '#333',
          fontWeight: 'bold'
        },
        cell: {
          backgroundColor: '#f8f9fa',
          horizontalBorderColor: '#e9ecef',
          verticalBorderColor: '#e9ecef'
        }
      },
      colCell: {
        text: {
          fontSize: 14, 
          fill: '#495057'
        },
        cell: {
          backgroundColor: '#ffffff'
        }
      },
      dataCell: {
        text: {
          fontSize: 13,
          fill: '#212529'
        }
      }
    }
  }
});
```

### Data Drilling
Implement data drilling functionality using dimension click events.

```tsx title="Data Drilling Implementation"
const crossTable = app.getElement('CrossTable1');
const detailTable = app.getElement('DetailTable1');

crossTable.subscribeEvent('clickDimension', async (data) => {
  // Build drill-down filter conditions
  const drillFilter = Object.entries(data)
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => `${key}='${value}'`)
    .join(' AND ');
    
  // Update detail table data
  await detailTable.call(Q(drillFilter));
  
  // Show detail panel
  app.getElement('DrilldownPanel').show();
});
```
