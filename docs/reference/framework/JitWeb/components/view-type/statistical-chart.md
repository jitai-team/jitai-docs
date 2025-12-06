---
slug: statistical-chart
title: "Statistical Chart Reference"
description: "Statistical Chart Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Statistical Chart"
---
# Statistical Chart
Statistical chart is an important component for data visualization display, implemented based on ECharts chart library to provide diverse chart rendering capabilities. It handles converting data models into intuitive graphical representations, supports interactive data exploration, and provides rich style configuration options, supporting 24 chart types including line charts, bar charts, pie charts, maps, radar charts, etc.

The statistical chart element has a hierarchical structure of Meta (components.Meta) → Type (components.Chart) → Instance. Developers can quickly create statistical chart instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `components.ChartType` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start 
### Basic Configuration Example
```json title="Line Chart Configuration Example"
{
  "chartType": "line",
  "fieldList": [
    [
      {
        "name": "createDate",
        "dataType": "Date",
        "alias": "Date",
        "ormType": "GROUP"
      }
    ],
    [
      {
        "name": "amount",
        "dataType": "Numeric", 
        "alias": "Amount",
        "ormType": "SUM"
      }
    ]
  ],
  "requireElements": [
    {
      "name": "models.SalesModel",
      "filter": "",
      "orderBy": []
    }
  ],
  "chartOption": {
    "legendShow": true,
    "smooth": false
  }
}
```

```json title="Pie Chart Configuration Example"
{
  "chartType": "pie",
  "fieldList": [
    [
      {
        "name": "category",
        "dataType": "Stext",
        "alias": "Category",
        "ormType": "GROUP"
      }
    ],
    [
      {
        "name": "count",
        "dataType": "Numeric",
        "alias": "Count", 
        "ormType": "COUNT"
      }
    ]
  ],
  "requireElements": [
    {
      "name": "models.ProductModel",
      "filter": "",
      "orderBy": []
    }
  ],
  "chartOption": {
    "legendShow": true,
    "radius": 150
  }
}
```

### Configuration Properties
| Property Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| chartType | string | Yes | 'line' | Chart type, supports 24 types including line/bar/pie/map |
| fieldList | Array\<Array\<CommonFieldSelectorItem\>\> | Yes | [] | Field configuration list, first layer is dimension fields, second layer is metric fields |
| requireElements | Array\<DataSourcesConfig\> | Yes | [] | Data source configuration, specifies models and filter conditions |
| chartOption | object | No | {} | Chart style configuration options |
| commonOption | object | No | {} | Common option configuration |
| customOption | object | No | {} | Custom option configuration |

**chartOption Property Details:**

| Property Name | Type | Default Value | Description |
|--------|------|--------|------|
| legendShow | boolean | true | Whether to show legend |
| legend | LegendEnum | 0 | Legend position: 0-top, 1-bottom, 2-left, 3-right |
| smooth | boolean | false | Whether line chart displays smoothly |
| barWidth | number | 20 | Bar chart column width |
| radius | number | 100 | Pie chart/ring chart radius |
| axisLabelStyle | object | {} | Axis label style configuration |
| XAxisStyle | object | {} | X-axis style configuration |
| YAxisStyle | object | {} | Y-axis style configuration |

## Variables
### dimensionFilter
- **Type**: QFilter
- **Description**: Dimension filter conditions, used for filtering chart data
- **Read-only**: Yes
- **Generic**: Associated model type

### detailFilter
- **Type**: QFilter
- **Description**: Detail filter conditions, used for filtering chart detail data
- **Read-only**: Yes
- **Generic**: Associated model type

## Methods 
### call
Refresh chart data, re-fetch and render data based on filter conditions.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| qFilter | QFilter | Yes | Query filter conditions |

#### Return Value
No return value

#### Usage Example
```typescript title="Refresh Chart Data"
// Create filter conditions
const filter = new Jit.datatypes.QFilter({
  value: "Q(status='active')"
});

// Refresh chart
chartComponent.call(filter);
```

### getChartData
Get chart data, fetch preview data from model service and process it.

#### Return Value
| Type | Description |
|------|------|
| Promise\<void\> | Async data fetching, results stored in component data property |

#### Usage Example
```typescript title="Get Chart Data"
// Get chart data
await chartComponent.getChartData();

// Access data
const chartData = chartComponent.data.dataList;
console.log('Chart data:', chartData);
```

### checkConfig
Check if chart configuration is valid, verify field configuration completeness.

#### Return Value
| Type | Description |
|------|------|
| boolean | Whether configuration is valid |

#### Usage Example
```typescript title="Validate Chart Configuration"
// Check configuration validity
const isValid = chartComponent.checkConfig();

if (isValid) {
  console.log('Chart configuration is valid');
  await chartComponent.getChartData();
} else {
  console.log('Chart configuration is invalid, please check field configuration');
}
```

### publishEvent
Publish component event, notify other components or page elements.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| ex | Record\<string, any\> | No | Additional data carried by the event |

#### Return Value
| Type | Description |
|------|------|
| Promise\<void\> | Async event publishing |

#### Usage Example
```typescript title="Publish Event Example"
// Publish table refresh event
await chartComponent.publishEvent('tableRefresh', {
  timestamp: Date.now()
});

// Publish custom event
await chartComponent.publishEvent('dataChanged', {
  newValue: 'updated data',
  source: 'chart'
});
```

### subscribeEvent
Subscribe to component events, listen to events published by other components.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Event name |
| evtCb | Function | Yes | Event callback function |
| unSubscribeExist | boolean | No | Whether to cancel existing subscription, default true |

#### Return Value
| Type | Description |
|------|------|
| string | Event handler ID, used for subsequent unsubscription |

#### Usage Example
```typescript title="Subscribe to Event Example"
// Subscribe to data change event
const handlerId = chartComponent.subscribeEvent(
  'dataUpdate',
  async (eventData) => {
    console.log('Received data update event:', eventData);
    await chartComponent.getChartData();
  }
);

// Subscribe to filter change event
chartComponent.subscribeEvent(
  'filterChanged',
  (filterData) => {
    const newFilter = new Jit.datatypes.QFilter(filterData);
    chartComponent.call(newFilter);
  }
);
```

### unSubscribeEvent
Cancel event subscription, stop listening to specified events.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| id | string | Yes | Event handler ID |

#### Return Value
| Type | Description |
|------|------|
| boolean | Whether unsubscription was successful |

#### Usage Example
```typescript title="Cancel Event Subscription"
// Cancel specified event subscription
const success = chartComponent.unSubscribeEvent(handlerId);

if (success) {
  console.log('Successfully cancelled event subscription');
}
```

### setConfig
Set component configuration, supports partial update or complete replacement of configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| next | Partial\<ChartPageConfig\> | Yes | New configuration object |
| clean | boolean | No | Whether to completely replace configuration, default false |

#### Usage Example
```typescript title="Update Chart Configuration"
// Partial configuration update
chartComponent.setConfig({
  chartType: 'bar',
  chartOption: {
    legendShow: false,
    barWidth: 30
  }
});

// Complete configuration replacement
chartComponent.setConfig(newCompleteConfig, true);
```

### getPermConfig
Get current component's permission configuration information.

#### Return Value
| Type | Description |
|------|------|
| Record\<string, any\> \| undefined | Permission configuration object, returns undefined if no permission restrictions |

#### Usage Example
```typescript title="Get Permission Configuration"
const permConfig = chartComponent.getPermConfig();

if (permConfig) {
  console.log('Component permission configuration:', permConfig);
  // Adjust component behavior based on permission configuration
} else {
  console.log('Component has no permission restrictions');
}
```

### bindApp
Bind application instance to component, establish association between component and application.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| app | App | Yes | Application instance object |

#### Usage Example
```typescript title="Bind Application Instance"
const app = getRuntimeApp();
chartComponent.bindApp(app);

// After binding, can access application-level services
console.log('Application name:', chartComponent.app?.name);
```

### bindPage
Bind page instance to component, simultaneously bind component variables to page context.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| page | BasePage | Yes | Page instance object |

#### Usage Example
```typescript title="Bind Page Instance"
// Bind current page
chartComponent.bindPage(currentPage);

// After binding, component variables will also be automatically bound to page context
console.log('Page instance:', chartComponent.page);
```

### getEventKey
Generate unique key name for component events, used for event identification in event system.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| eventName | string | Yes | Event name |

#### Return Value
| Type | Description |
|------|------|
| string | Event key name in format `${uuid}.${name}.${eventName}` |

#### Usage Example
```typescript title="Get Event Key"
const eventKey = chartComponent.getEventKey('dataChanged');
console.log('Event key:', eventKey);
// Output: "uuid-string.chartName.dataChanged"

// Used for custom event system
const customEventKey = chartComponent.getEventKey('customEvent');
```

### initVariables
Initialize component variables, create corresponding variable instances based on data type configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| dataTypeList | BaseDataType[] | Yes | Data type configuration list |

#### Usage Example
```typescript title="Initialize Variables"
const variableConfigs = [
  {
    name: 'filterCondition',
    dataType: 'QFilter',
    title: 'Filter Condition',
    generic: 'models.SalesModel'
  },
  {
    name: 'chartData',
    dataType: 'RowList',
    title: 'Chart Data'
  }
];

chartComponent.initVariables(variableConfigs);

// Variables can be accessed after initialization
console.log('Filter condition variable:', chartComponent.filterCondition);
```

### newVariable
Create new data type variable instance based on variable configuration.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| varConfig | InstanceType\<typeof Jit.DataTypeConfig\> | Yes | Variable configuration object |

#### Return Value
| Type | Description |
|------|------|
| BaseDataType \| undefined | Created variable instance, returns undefined on failure |

#### Usage Example
```typescript title="Create New Variable"
const varConfig = new Jit.DataTypeConfig({
  name: 'customFilter',
  dataType: 'QFilter',
  title: 'Custom Filter',
  generic: 'models.UserModel'
});

const variable = chartComponent.newVariable(varConfig);
if (variable) {
  console.log('Variable created successfully:', variable.title);
  // Manually bind component and page
  variable.bindComponent(chartComponent);
  variable.bindPage(chartComponent.page);
} else {
  console.error('Variable creation failed');
}
```

### destroy
Destroy component instance, clean up all event listeners and variable references, release memory resources.

#### Usage Example
```typescript title="Destroy Component"
// Call when component is no longer needed
chartComponent.destroy();
```

### runCode
Execute custom code in page context, supports accessing page and component scope.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| code | string | Yes | JavaScript code string to execute |

#### Return Value
| Type | Description |
|------|------|
| any | Code execution result, returns undefined on exception |

#### Usage Example
```typescript title="Execute Custom Code"
// Execute simple expression
const result = chartComponent.runCode('1 + 1');
console.log('Calculation result:', result); // 2

// Access page variables
const pageData = chartComponent.runCode('this.pageVariable');

// Call page methods
chartComponent.runCode('this.refreshData()');
```

## Properties
### config
- **Type**: ChartPageConfig
- **Description**: Complete configuration object of the chart, containing chart type, field configuration, style settings, etc.
- **Writable**: Yes

### data
- **Type**: \{ dataList?: Array\<Record\<string, any\>\> \}
- **Description**: Chart data object, containing data list obtained from models
- **Writable**: Yes

### ModelClass
- **Type**: typeof Jit.BaseModel
- **Description**: Associated data model class, used for data query and operations
- **Writable**: Yes

### chartIns
- **Type**: InstanceType\<typeof BaiduChart\>
- **Description**: Chart instance object, responsible for chart rendering and interaction
- **Writable**: Yes

### QObj
- **Type**: Qex | undefined
- **Description**: Current query object, used for data filtering
- **Writable**: Yes

### name
- **Type**: string
- **Description**: Component name identifier
- **Writable**: Yes

### title
- **Type**: string
- **Description**: Component display title
- **Writable**: Yes

### fullName
- **Type**: string
- **Description**: Complete name path of the component
- **Writable**: Yes

### showTitle
- **Type**: boolean
- **Description**: Whether to show component title
- **Writable**: Yes

### compType
- **Type**: COMPONENT_TYPE
- **Description**: Component type identifier
- **Writable**: Yes

### type
- **Type**: string
- **Description**: Component type string
- **Writable**: Yes

### app
- **Type**: App | undefined
- **Description**: Reference to current application instance
- **Read-only**: Yes

### page
- **Type**: BasePage | undefined
- **Description**: Reference to current page instance
- **Read-only**: Yes

### modelFilter
- **Type**: Qex | string | undefined
- **Description**: Model filter conditions, generated by combining permission configuration and component configuration
- **Read-only**: Yes

### dataTypeList
- **Type**: BaseDataType[]
- **Description**: Component's data type configuration list, containing type definitions for all variables
- **Writable**: Yes

### _uuid_
- **Type**: string
- **Description**: Component's unique identifier, used for event system and component identification
- **Read-only**: Yes

## Events
### Click Detail
- **Event Name**: clickDetail
- **Trigger**: Triggered when user clicks on detail data points in the chart
- **Event Data**: Contains information about the clicked data item

#### Usage Example
```typescript title="Listen to Click Detail Event"
// Subscribe to click detail event
chartComponent.subscribeEvent('clickDetail', (eventData) => {
  console.log('Clicked detail data:', eventData);
  
  // Get clicked data item
  const clickedData = eventData.data;
  const seriesName = eventData.seriesName;
  const dataIndex = eventData.dataIndex;
  
  // Execute corresponding operations based on clicked data
  if (clickedData) {
    // Navigate to detail page
    const detailUrl = `/detail/${clickedData.id}`;
    window.open(detailUrl, '_blank');
    
    // Or show detail modal
    showDetailModal(clickedData);
    
    // Or update filter conditions of other components
    const filter = new Jit.datatypes.QFilter({
      value: `Q(category='${clickedData.category}')`
    });
    otherComponent.call(filter);
  }
});

// Cancel subscription when component is destroyed
chartComponent.subscribeEvent('destroy', () => {
  chartComponent.unSubscribeEvent('clickDetail');
});
```

```typescript title="Click Handling Combined with Page Routing"
chartComponent.subscribeEvent('clickDetail', async (eventData) => {
  const { data } = eventData;
  
  // Update page parameters
  const currentPage = chartComponent.page;
  if (currentPage && data.orderId) {
    // Navigate to order detail page
    await currentPage.navigate('/orders/detail', {
      orderId: data.orderId,
      source: 'chart'
    });
  }
});
```

### Click Dimension
- **Event Name**: clickDimension  
- **Trigger**: Triggered when user clicks on dimension labels or legends in the chart
- **Event Data**: Contains information about the clicked dimension

#### Usage Example
```typescript title="Listen to Click Dimension Event"
// Subscribe to click dimension event
chartComponent.subscribeEvent('clickDimension', (eventData) => {
  console.log('Clicked dimension:', eventData);
  
  const dimensionValue = eventData.name;
  const dimensionType = eventData.type;
  
  // Filter data based on clicked dimension
  if (dimensionValue) {
    // Build filter condition
    const filterCondition = `Q(${dimensionType}='${dimensionValue}')`;
    const filter = new Jit.datatypes.QFilter({
      value: filterCondition
    });
    
    // Update current chart's filter
    chartComponent.call(filter);
    
    // Also update related components
    relatedTableComponent.call(filter);
    relatedChartComponent.call(filter);
  }
});
```

```typescript title="Legend Interaction Example"
chartComponent.subscribeEvent('clickDimension', (eventData) => {
  const { name: legendName, selected } = eventData;
  
  if (selected) {
    console.log(`Show series: ${legendName}`);
    // Show data for corresponding series
    showSeriesData(legendName);
  } else {
    console.log(`Hide series: ${legendName}`);
    // Hide data for corresponding series
    hideSeriesData(legendName);
  }
  
  // Update display status of other charts
  syncChartSeries(legendName, selected);
});
```

```typescript title="Dimension Drill-down Example"
chartComponent.subscribeEvent('clickDimension', async (eventData) => {
  const { name: dimensionValue } = eventData;
  
  // Implement dimension drill-down functionality
  if (currentDrillLevel === 'year' && dimensionValue) {
    // Drill down from year to month
    const monthlyConfig = {
      ...chartComponent.config,
      fieldList: [
        [
          {
            name: 'month',
            dataType: 'Date',
            alias: 'Month',
            ormType: 'GROUP'
          }
        ],
        chartComponent.config.fieldList[1] // Keep metrics unchanged
      ],
      requireElements: [
        {
          ...chartComponent.config.requireElements[0],
          filter: `Q(year='${dimensionValue}')`
        }
      ]
    };
    
    // Update chart configuration
    chartComponent.setConfig(monthlyConfig);
    await chartComponent.getChartData();
    
    // Update drill-down status
    currentDrillLevel = 'month';
    currentDrillValue = dimensionValue;
  }
});
```

## Advanced Features
### Supported Chart Types
The statistical chart component supports 24 chart types, covering common data visualization needs:

**Basic Chart Types:**
- line - Line chart
- bar - Bar chart  
- yBar - Horizontal bar chart
- pie - Pie chart
- circlePie - Donut chart
- areaLine - Area chart

**Advanced Chart Types:**
- radar - Radar chart
- funnel - Funnel chart
- scatter - Scatter plot
- bubble - Bubble chart
- chinaMap - Map
- calendar - Calendar heatmap

**Special Chart Types:**
- CustomSingleValue - Single value chart
- CustomMutiValue - Multi-value chart
- gauge - Gauge chart
- liquidFill - Liquid fill chart
- progress - Progress bar

### Dynamic Chart Switching
```typescript title="Dynamic Chart Type Switching"
// Switch to bar chart
chartComponent.setConfig({
  chartType: 'bar',
  chartOption: {
    barWidth: 25,
    legendShow: true
  }
});

// Switch to pie chart
chartComponent.setConfig({
  chartType: 'pie', 
  chartOption: {
    radius: 120,
    legendShow: true,
    legend: 1 // Show legend at bottom
  }
});
```

### Complex Data Source Configuration
```typescript title="Multi-dimensional Multi-metric Configuration"
const complexConfig = {
  chartType: 'line',
  fieldList: [
    // Dimension group - supports multiple dimensions
    [
      {
        name: 'year',
        dataType: 'Date',
        alias: 'Year',
        ormType: 'GROUP'
      },
      {
        name: 'quarter', 
        dataType: 'Date',
        alias: 'Quarter',
        ormType: 'GROUP'
      }
    ],
    // Metric group - supports multiple metrics
    [
      {
        name: 'revenue',
        dataType: 'Numeric',
        alias: 'Revenue',
        ormType: 'SUM'
      },
      {
        name: 'profit',
        dataType: 'Numeric', 
        alias: 'Profit',
        ormType: 'SUM'
      }
    ]
  ],
  requireElements: [
    {
      name: 'models.FinanceModel',
      filter: "Q(status='confirmed')",
      orderBy: [['year', 1], ['quarter', 1]]
    }
  ]
};
```

### Style Theme Configuration
```typescript title="Custom Chart Styling"
const styleConfig = {
  chartOption: {
    // Axis styles
    XAxisStyle: {
      show: true,
      fontSize: 12,
      color: '#666666'
    },
    YAxisStyle: {
      show: true, 
      fontSize: 12,
      color: '#666666'
    },
    // Label styles
    axisLabelStyle: {
      width: 60,
      rotate: 45,
      show: true,
      inside: false
    },
    // Legend configuration
    legendShow: true,
    legend: 0, // Top
    // Spacing configuration
    horizontalPadding: 10,
    verticalPadding: 10
  }
};
``` 