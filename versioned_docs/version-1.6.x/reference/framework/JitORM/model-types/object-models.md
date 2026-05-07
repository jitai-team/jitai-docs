---
sidebar_position: 3
slug: object-models
description: "API reference documentation for Data Object Models. A tableless model designed for pro-code development mode, used for data structure definition and transmission."
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Data Object Model

The Data Object Model is a data structure designed specifically for the pro-code development mode, similar to a DTO (Data Transfer Object), also known as a **Tableless Model**.

It is customized by developers according to specific business requirements and does not directly map to or associate with any database tables. The Data Object Model is primarily used in business logic such as service functions, event handling, and process orchestration for structured expression, transmission, and conversion of data. Through Data Object Models, developers can flexibly define multi-layer nested and complex combined data structures, achieving standardized data interaction between different modules and improving code maintainability and reusability.

:::tip Applicable Scenarios
✅ **Complex Parameter Transmission**: Encapsulating complex data structures as input/output parameters for service functions and workflow nodes.<br/>
✅ **Cross-Module Data Interaction**: Unifying data exchange formats between different business modules to implement standardized interfaces.<br/>
✅ **Temporary Data Encapsulation**: Used for temporary data display in UI components (such as tables and forms) without the need for persistent storage.<br/>
✅ **Business Logic Decoupling**: Decoupling data dependencies between frontend/backend or services by defining independent data contracts.
:::

The hierarchical structure of the Data Object Model is Meta (`models.Meta`) → Type (`models.ObjectModelType`) → Instance.

## Model Directory Structure

Each model element uses an independent folder with the path rule: `[App Root Directory]/models/[Model Name]`

```plaintext
[App Root Directory]/models/ResultModel/
├── e.json        # Model element declaration file
├── model.py      # Model element implementation file
└── __init__.py   # Initialization file for the package where the model element resides
```

### e.json Declaration File

```json title="e.json"
{
  "backendBundleEntry": ".",
  "title": "General Result Object",
  "type": "models.ObjectModelType", 
  "functionList": []
}
```

### model.py Implementation File

The Data Object Model inherits from the `ObjectModel` class in the `models.ObjectModelType` package.

```python title="model.py"
from datatypes.Meta import datatypes
from models.ObjectModelType import ObjectModel

class ResultModel(ObjectModel):
    # Define data structure fields
    code = datatypes.Integer(title="Status Code", default=200)
    message = datatypes.Stext(title="Message")
    data = datatypes.Json(title="Business Data")
    success = datatypes.Boolean(title="Success", default=True)

```

### \_\_init\_\_.py Initialization File

```python title="__init__.py"
from .model import ResultModel
```

## Model Fields

The field definitions of the Data Object Model are completely consistent with the Data Table Model, supporting all standard data types. Fields are only used to define data structures in memory and will not generate database table structures.

For a detailed list of field types, please refer to the [Field Types Documentation](../data-types).

```python
# Example: Defining a user information transfer object
nick = datatypes.Stext(name="nick", title="Name")
phone = datatypes.Phone(name="phone", title="Phone")
email = datatypes.Stext(name="email", title="Email")
address = datatypes.Address(name="address", title="Address")
```

## Model Functions

The Data Object Model shares a completely consistent API interface definition with the Data Table Model. This means that in service functions, frontend components (such as tables, forms), or other business logic, the way to call a Data Object Model is exactly the same as calling a regular Data Table Model.

Since the Data Object Model does not have underlying database table support, its default CRUD functions (such as `create`, `save`, `delete`, etc.) only operate in memory or perform no persistence actions. To endow the model with actual business capabilities (such as integrating with external APIs, reading/writing caches, processing complex calculations, etc.), developers need to **rewrite** the corresponding built-in functions in `model.py` according to business requirements.

### Guide to Rewriting Common Functions

The parameter definitions of each function are consistent with the Data Table Model. For detailed descriptions, please refer to [Data Table Model - Built-in Functions](./data-models#model-built-in-functions).

| Function Name | Description | Common Rewriting Scenarios |
| :--- | :--- | :--- |
| `save` | Save Data | Used with `get` to synchronize object instance modifications to external systems. |
| `delete` | Delete Data | Delete data corresponding to the current object instance. |
| `create` | Create Data | Call external APIs to submit new data; initialize complex objects in memory. |
| `updateOrAdd` | Conditional Update or Add | Determine whether to add or update external data based on business logic. |
| `createOrUpdateMany` | Batch Create or Update | Batch process data import or synchronization to external systems. |
| `updateByPK` | Batch Update by Primary Key | Call external APIs to batch update data. |
| `deleteByPK` | Batch Delete by Primary Key | Call external APIs to batch delete data. |
| `updateByFilter` | Batch Update by Condition | Batch update external system data based on specific conditions. |
| `deleteByFilter` | Batch Delete by Condition | Batch delete external system data based on specific conditions. |
| `query` | Pagination Query | Integrate with external APIs to get list data; construct temporary data lists in memory. |
| `get` | Get Single Data | Integrate with external APIs to get details; read data from cache. |
| `groupBy` | Group Statistics | Perform group statistics on memory data or external data. |
| `getFieldData` | Get Field Value List | Get data sources for dropdown options. |
| `statisticFieldData` | Field Statistics | Perform statistical calculations on data dimensions. |
| `getExportData` | Export Data | Custom logic for retrieving export data. |
| `aggregate` | Aggregation Calculation | Execute custom aggregation calculation logic. |
| `resetModelData` | Clear Data | Clear cache or reset external system test data. |
| `getCompareResult` | Data Comparison | Execute complex Q expression matching logic in memory. |

### Implementation Example

The following example shows how to integrate a Data Object Model with a simulated external API by rewriting the `query` and `create` methods.

#### Rewriting the query Method

When a UI component (such as a table) loads data, the `query` method is automatically called.

```python
    @classmethod
    def query(cls, filter=None, fieldList=None, orderList=None, page=1, size=20, level=2):
        """
        Rewrite the query method to simulate retrieving paginated data from an external API
        """
        # 1. Parse the filter parameter (if query conditions need to be supported)
        # ...
        
        # 2. Simulate calling an external API
        # api_result = external_api.get_users(page=page, size=size)
        
        # Construct fake data for demonstration here
        data_list = []
        start_id = (page - 1) * size + 1
        for i in range(size):
            data_list.append({
                "id": start_id + i,
                "name": f"User_{start_id + i}",
                "status": "active"
            })
        
        # 3. Return a result structure conforming to JitORM specifications
        return {
            "rowDatas": data_list,  # Data list
            "totalCount": 100       # Total record count (for pagination)
        }
```

#### Rewriting the create Method

When using a form component to submit new data, the `create` method is automatically called.

```python
    @classmethod
    def create(cls, rowData, triggerEvent=1):
        """
        Rewrite the create method to process data submission logic
        """
        # 1. Data validation or preprocessing
        if rowData.name.isNull():
            raise Exception("Name cannot be empty")
            
        # 2. Simulate calling an external API to create data
        # new_id = external_api.create_user(rowData)
        
        # 3. Return the complete data object containing the new ID
        # Note: Must return complete dictionary data for frontend state updates
        rowData.id.value = 999  # Assume ID returned by external system
        return rowData
```

### Custom Functions

The most common scenario for Data Object Models is defining business processing functions.

**1. Declare the function in e.json:**

```json
{
  "functionList": [{
    "name": "processData",
    "title": "Process Data",
    "args": [{"name": "input", "dataType": "Stext"}],
    "returnType": "Stext"
  }]
}
```

**2. Implement the function in model.py:**

```python
    def processData(self, input):
        # Business logic processing
        if input.value == "valid":
            return "Success"
        else:
            return 'Failed'
```

