---
sidebar_position: 0
slug: data-models
description: "Data Table Model API Reference. Complete specifications, methods, and examples."
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Data Table Model
The most common data model, each instance corresponds to a table in the specified database. Changes to model fields are automatically synchronized to the database, and developers do not need to manually maintain database tables.

The hierarchical structure of the data table model is Meta (models.Meta) → Type (models.NormalType) → Instance. Developers can also rewrite the models.NormalType element provided officially by JitAI in their own App to implement their own encapsulation.

## Model Directory Structure
Each model element uses an independent folder, path rule: `[Application Root]/models/[Model Name]`

```plaintext
[Application Root]/models/CustomerModel/
├── e.json        # Model element declaration file
├── model.py      # Model element implementation file
└── __init__.py   # Model element package initialization file
```

### e.json Model Declaration
```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "Customer Table Model",
  "type": "models.NormalType", 
  "functionList": []
}
```

### model.py Implementation
```python title="model.py"
from datatypes.Meta import datatypes
from models.NormalType import NormalModel

class CustomerModel(NormalModel):
    # Required fields
    id = datatypes.AutoInt(name="id", title="id", primaryKey=True, readOnly=1)
    createdAt = datatypes.Datetime(name="createdAt", title="Created Time")
    updatedAt = datatypes.Datetime(name="updatedAt", title="Updated Time")
    
    # Business fields
    nick = datatypes.Stext(name="nick", title="Name")
    phone = datatypes.Phone(name="phone", title="Phone")
    email = datatypes.Stext(name="email", title="Email")
    address = datatypes.Address(name="address", title="Address")

    class Meta:
        modelType = "NormalType"
        name = 'CustomerModel'
        title = 'Customer Table Model'
        db = "databases.Default"   # Database element fullName
        dataTitle = "name"         # Data title
        dbTable = "CustomerModel"  # Corresponds to model name
        unionIndexList = []        # Composite index
        unionUniqueList = []       # Union unique index
```

### \_\_init\_\_.py Initialization
```python title="__init__.py"
from .model import CustomerModel
```

## Model Fields

Model fields correspond to columns in the database table and are defined by class attributes in `model.py`. All field types are provided by the `datatypes` module.

```python
# Field definition example
nick = datatypes.Stext(name="nick", title="Name")
```

**Common Parameter Description:**

- `name`: Field name, **must** be exactly the same as the class attribute name
- `title`: Field title, used for interface display and document generation
- `primaryKey`: Whether it is a primary key
- `readOnly`: Whether it is read-only (1 for read-only, 0 for writable)
- `default`: Default value
- Other field type specific parameters

:::info More Field Types
JitAI provides rich field types (such as `Stext`, `Numeric`, `DateTime`, `Phone`, etc.). For the complete list, please refer to [Field Types Documentation](../data-types).
:::

**Calculation Formula**

Flexible calculation and data processing on existing fields to meet diverse needs such as statistics, conversion, and condition judgment in business. Adding `formula` to the field parameters indicates that the field is a formula field. After configuring the calculation formula, the default value will be invalid, and the field will automatically become read-only. For detailed syntax, please refer to [Formula Documentation](../formula).

Example:
```python
class CustomerModel(NormalModel):
    # ...other fields
    # Concatenate name and phone
    nameAndTel = datatypes.Stext(
        name="nameAndTel", 
        title="Name-Phone", 
        formula="CONCAT(F('nick'), '-', F('phone'))", 
        readOnly=1
    )
```

**Field Name Keywords**

The following keywords are not allowed as field names:

- **Frontend JavaScript Language Keywords**: such as `var`, `function`, etc.
- **Backend Python Language Keywords**: such as `type`, `class`, etc.
- **JitAI System Keywords**:

```text
app, model, service, default, commonJson, dbConfig, dataType, 
dataTitle, dbFieldType, dataTypeDict, relateTypeDict, subTypeDict, 
create, save, update, delete, date, count, calculable, comparable, 
average, sum, min, max, url, value, cache, relateRowData, cascade
```


## Model Meta Configuration

**Data Storage `db`**: Default value `"databases.Default"`, can be replaced with a custom database.

**Data Title `dataTitle`**: In the data model, setting a field as the data title makes the data rows more readable and recognizable on the interface. The value of the data title field will serve as the main display information of the data record, helping users quickly identify and distinguish different data rows.
The system supports setting the following field types as data titles:

- **Stext** - Suitable for storing short text information such as names and titles
- **Ltext** - Suitable for storing longer descriptive content
- **Serial** - Unique number automatically generated by the system
- **Identify** - Standard ID number format
- **Phone** - Mobile phone number information
- **LicensePlate** - License plate number information
- **Radio** - Text content of single choice options
- **Dropdown** - Text content of drop-down selection

:::tip Tip
Each data table model can only set one field as the data title. If you need to combine multiple fields to represent the data title, consider using computed fields to achieve this.
:::

**Composite Index `unionIndexList`**: Composite index list, each index item is a dictionary:
  - `name`: Index name, composed of 6 random letters
  - `title`: Index title, generated based on user description
  - `fieldNameList`: List of composite field ids, for example: `["field1", "field2"]`

**Union Unique Index `unionUniqueList`**: Union unique index list, each index item is a dictionary:
  - `name`: Index name, composed of 6 random letters
  - `title`: Index title, generated based on user description
  - `fieldNameList`: List of composite field ids, for example: `["field1", "field2"]`


## Model Functions

There are two types of functions in the model: member functions and class functions (decorated with classmethod).

### Model Built-in Functions {#model-built-in-functions}
JitORM provides rich built-in functions in NormalModel, covering data creation, reading, updating, deletion, etc. These functions support single and batch operations, and provide flexible query and aggregation capabilities.

**Member Functions**

#### save - Save Data
```python
def save(self, triggerEvent=1) -> RowData
```

Save the current data instance, automatically determining whether it is adding or updating.

**Parameter Description:**
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, modify user info and save
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', 1))", orderList=[])
user.name.value = "Tony"
user.save()
```

#### delete - Delete Data
```python
def delete(self, triggerEvent=1) -> Dict[str, Any]
```
Delete the current data record.
**Parameter Description:**
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element and delete user
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', '1'))", [])
user.delete()
```

**Class Functions**

**Basic Data Operations**
Used for basic CRUD operations on single data.

#### create - Create Data
```python
@classmethod
def create(cls, rowData, triggerEvent=1) -> RowData
```

Create a new data record.

**Parameter Description:**
- `rowData`: Data dictionary to be created
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element and create new user
UserModel = app.getElement("models.UserModel")
user_data = {"name": "Zhang San", "email": "zhangsan@example.com"}
new_user = UserModel.create(user_data)
```

#### updateOrAdd - Conditional Update or Add
```python
@classmethod
def updateOrAdd(cls, filter, orderList, updateData, addData, triggerEvent=1) -> RowData
```

Find data based on conditions, update if it exists, add if it does not exist.

**Parameter Description:**
- `filter`: Q expression filter condition
- `orderList`: Sorting rules, for example: `[["name", 1], ["age", -1]]` (1 ascending, -1 descending)
- `updateData`: Data when updating
- `addData`: Data when adding
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, update or add user based on email
UserModel = app.getElement("models.UserModel")
UserModel.updateOrAdd(
    "Q(Q('email', '=','test@example.com'))", 
    [], 
    {"name": "Updated Name"}, 
    {"name": "New User", "email": "test@example.com"}
)
```

**Batch Data Operations**
Batch operation functions for efficiently processing large amounts of data.

#### createOrUpdateMany - Batch Create or Update
```python
@classmethod
def createOrUpdateMany(cls, rowDataList, triggerEvent=1) -> List[RowData]
```

Batch process multiple data records, automatically determine whether to add or update.

**Parameter Description:**
- `rowDataList`: List of data to be processed
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, batch import user data
UserModel = app.getElement("models.UserModel")
users_data = [
    {"name": "User1", "email": "user1@example.com"},
    {"name": "User2", "email": "user2@example.com"}
]
UserModel.createOrUpdateMany(users_data)
```

#### updateByPK - Batch Update by PK
```python
@classmethod
def updateByPK(cls, pkList, updateData, triggerEvent=1) -> List[RowData]
```

Batch update data based on primary key list.

**Parameter Description:**
- `pkList`: Primary key ID list
- `updateData`: Data to be updated
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, batch activate multiple users
UserModel = app.getElement("models.UserModel")
UserModel.updateByPK([1, 2, 3], {"status": "active"})
```

#### deleteByPK - Batch Delete by PK
```python
@classmethod
def deleteByPK(cls, pkList, triggerEvent=1)
```

Batch delete data based on primary key list.

**Parameter Description:**
- `pkList`: Primary key ID list
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, batch delete specified users
UserModel = app.getElement("models.UserModel")
UserModel.deleteByPK([1, 2, 3])
```

#### updateByFilter - Batch Update by Filter
```python
@classmethod
def updateByFilter(cls, filter, updateData)
```

Batch update data based on filter conditions. **Note**: This method does not trigger the model's data update events.

**Parameter Description:**
- `filter`: Q expression filter condition
- `updateData`: Data to be updated

**Usage Example:**
```python
# Get model element, set all inactive users to expired status
UserModel = app.getElement("models.UserModel")
UserModel.updateByFilter("Q(Q('status', '=', 'inactive'))", {"status": "expired"})
```

#### deleteByFilter - Batch Delete by Filter
```python
@classmethod
def deleteByFilter(cls, filter)
```

Batch delete data based on filter conditions. **Note**: This method does not trigger the model's data deletion events.

**Parameter Description:**
- `filter`: Q expression filter condition

**Usage Example:**
```python
# Get model element, delete all expired users
UserModel = app.getElement("models.UserModel")
UserModel.deleteByFilter("Q(Q('status', '=', 'expired'))")
```

**Data Query**
Core functions for retrieving and finding data, supporting pagination, sorting, filtering, etc.

#### query - Paginated Query
```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None, level=2)
```

Paginated query data, the most commonly used query method.

**Parameter Description:**
- `filter`: Q expression filter condition (optional)
- `fieldList`: Specify query fields (optional, default query all fields)
- `orderList`: Sorting rules, for example: `[["name", 1], ["age", -1]]` (1 ascending, -1 descending)
- `page`: Page number (starting from 1)
- `size`: Number of records per page
- `level`: Associated data level (default 2 levels)

**Return Data:**
- `rowDatas`: Query result list
- `totalCount`: Total number of records

**Usage Example:**
```python
# Get model element, basic paginated query
UserModel = app.getElement("models.UserModel")
result = UserModel.query(page=1, size=10)
users = result["rowDatas"]
total = result["totalCount"]

# Query with conditions and sorting
result = UserModel.query(
    filter="Q(Q('status', '=', 'active'))",
    orderList=[["createdAt", -1]],  # Sort by creation time in reverse order
    page=1, 
    size=20
)
```

#### get - Get Single Data
```python
@classmethod
def get(cls, filter, orderList=None, level=2) -> RowData
```

Get the first data that meets the conditions.

**Parameter Description:**
- `filter`: Q expression filter condition
- `orderList`: Sorting rules, for example: `[["name", 1], ["age", -1]]` (1 ascending, -1 descending)
- `level`: Associated data level (default 2 levels)

**Usage Example:**
```python
# Get model element, get user by ID
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', 1))", [])

# Get the latest active user
user = UserModel.get(
    "Q(Q('status', '=', 'active'))", 
    [["createdAt", 1]]
)
```

#### groupBy - Group Statistics
```python
@classmethod
def groupBy(cls, filter, fieldList, orderList=None, page=None, size=None)
```

Group statistics data by specified fields.

**Parameter Description:**
- `filter`: Q expression filter condition
- `fieldList`: Grouping field list
- `orderList`: Sorting rules (optional), for example: `[["name", 1], ["age", -1]]` (1 ascending, -1 descending)
- `page`: Page number (optional)
- `size`: Number of records per page (optional)

**Usage Example:**
```python
# Get model element, count number of users grouped by status
UserModel = app.getElement("models.UserModel")
result = UserModel.groupBy(
    filter="", 
    fieldList=["status", "COUNT(*) as count"]
)
```

#### getFieldData - Get Field Data List
```python
@classmethod
def getFieldData(cls, fieldId, filter, orderList=None) -> List
```

Get all values of the specified field, commonly used to build drop-down options.

**Parameter Description:**
- `fieldId`: Field name
- `filter`: Q expression filter condition
- `orderList`: Sorting rules, for example: `[["name", 1], ["age", -1]]` (1 ascending, -1 descending)

**Usage Example:**
```python
# Get model element, get all department name list
UserModel = app.getElement("models.UserModel")
departments = UserModel.getFieldData("department", "", [])

# Get email list of active users
emails = UserModel.getFieldData(
    "email", 
    "Q(Q('status', '=', 'active'))", 
    [["email", 1]]
)
```

#### statisticFieldData - Field Statistics
```python
@classmethod
def statisticFieldData(cls, filter, fieldAggrMap)
```

Perform aggregation statistics on specified fields.

**Parameter Description:**
- `filter`: Q expression filter condition
- `fieldAggrMap`: Field aggregation mapping, such as: `{"age": "AVG", "salary": "SUM"}`

**Usage Example:**
```python
# Get model element, count user average age and total salary
UserModel = app.getElement("models.UserModel")
stats = UserModel.statisticFieldData(
    "Q(Q('status', '=', 'active'))",
    {"age": "AVG", "salary": "SUM"}
)
```

**Data Import and Export**
Tool functions for data export and batch data processing.

#### getExportData - Export Data
```python
@classmethod
def getExportData(cls, filter, fieldList, page, size)
```

Get data that meets the conditions for export, supporting pagination to process large amounts of data.

**Parameter Description:**
- `filter`: Q expression filter condition
- `fieldList`: List of fields to export
- `page`: Page number
- `size`: Number of records per page

**Usage Example:**
```python
# Get model element, export basic info of active users
UserModel = app.getElement("models.UserModel")
export_data = UserModel.getExportData(
    filter="Q(Q('status', '=', 'active'))",
    fieldList=["name", "email", "department"],
    page=1,
    size=1000
)
```

**Advanced Functions**
Provide more advanced data operation and management functions.

#### aggregate - Aggregation Calculation
```python
@classmethod
def aggregate(cls, filter, aggrField, aggrType)
```

Perform aggregation calculation on specified fields.

**Parameter Description:**
- `filter`: Q expression filter condition
- `aggrField`: Aggregation field name
- `aggrType`: Aggregation type (SUM, AVG, COUNT, MAX, MIN)

**Usage Example:**
```python
# Get model element, calculate average age of active users
UserModel = app.getElement("models.UserModel")
avg_age = UserModel.aggregate("Q(Q('status', '=', 'active'))", "age", "AVG")

# Count total number of users
user_count = UserModel.aggregate("", "id", "COUNT")
```

#### resetModelData - Clear Data
```python
@classmethod
def resetModelData(cls)
```

Clear all data in the table corresponding to the model, **use with caution**.

**Usage Example:**
```python
# Get model element, clear test data (use with caution in production environment)
TestModel = app.getElement("models.TestModel")
TestModel.resetModelData()
```

**Data Validation**
Auxiliary functions for data verification and condition judgment.

#### getCompareResult - Data Comparison
```python
@classmethod
def getCompareResult(cls, q, bizRow)
```

Determine whether business data meets the conditions based on Q expression conditions.

**Parameter Description:**
- `q`: Q expression comparison condition
- `bizRow`: Business data to be verified

**Usage Example:**
```python
# Get model element, verify whether user data meets conditions
UserModel = app.getElement("models.UserModel")
user_data = {"age": 25, "status": "active"}
is_valid = UserModel.getCompareResult("Q(Q('age', '>=', 18), Q.AND, Q('status', '=', 'active'))", user_data)

if is_valid:
    print("User data meets conditions")
```

---

:::tip Usage Advice
- For frequent data operations, it is recommended to use batch functions to improve performance
- When querying, use the `fieldList` parameter reasonably to get only the required fields
- Using `triggerEvent=0` can skip event triggering and improve batch operation performance
- TQL query is suitable for complex cross-table query scenarios
:::

:::warning Note
- `resetModelData` will clear all data in the table, use with caution in production environment
- Batch deletion operation cannot be undone, please confirm that the screening conditions are correct
- Large data volume operations recommend batch processing to avoid memory overflow
:::


### Model Custom Functions 

In addition to built-in functions, developers can also add custom functions to the model to implement specific business logic. These functions are defined as member functions.
Two steps are required to define a custom function:
1. **Declaration**: Declare the function signature in the `functionList` field of the model element declaration file `e.json`.
2. **Implementation**: Write the corresponding Python code in the model implementation file `model.py`.

#### Function Declaration

Define the configuration information of each function in the `functionList` array.

**Main Configuration Parameter Description:**

| Parameter Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | **Required**, function name, must be exactly the same as the method name in `model.py`. |
| `title` | String | Function display title, used for document generation or interface display. |
| `args` | List | Parameter list, defining the input parameters of the function. |
| `returnType` | String | Return value data type (such as `Stext`, `Numeric`, `RowData`, etc.). |
| `argsToDatatype` | Integer | Parameter type conversion flag. Default is 1, indicating that parameters will be automatically converted to the corresponding data type object. |

**Parameter Object (args item) Description:**

| Parameter Field | Description |
| :--- | :--- |
| `name` | Parameter variable name. |
| `title` | Parameter display title. |
| `dataType` | Parameter data type (such as `Stext`). |

**Declaration Example:**

```json title="e.json"
{
  "functionList": [{
    "name": "func1",
    "title": "Function Title",
    "args": [{
      "name": "param1",
      "title": "Parameter Title",
      "dataType": "Stext"
    }],
    "argsToDatatype": 1,
    "returnType": "Stext"
  }]
}
```

#### Function Implementation

Implement the method of the same name in the `model.py` class. Custom functions are member functions, and the first parameter must be `self`.

**Implementation Example:**

```python title="model.py"
class CustomerModel(NormalModel):

    #...fields and Meta

    def func1(self, param1):
        # Business logic implementation
        return "result"
```
