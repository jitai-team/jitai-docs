---
sidebar_position: 3
slug: data-models
title: "Data Models Reference"
description: "Data Models Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Data Models"
---

# Data Models
Models are business entity objects, and data models have built-in data operation interfaces commonly used in the business layer. JitORM provides object-oriented data model definition methods based on rich data types. Developers can use the visual interface of JitAi development tools to edit model elements, or use full-code approach.

The hierarchical structure of data model elements is Meta (models.Meta) → Type (models.NormalType) → Instance. Developers can also create their own Type elements or modify the official `models.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Model Classification
Data models include regular data models, aggregation table models, extension table models, and data object models (tableless models).

### Regular Data Models
The most common data model, where each instance corresponds to a table in the specified database. Changes to model fields are automatically synchronized to the database, and developers don't need to manually maintain database tables.

### Aggregation Table Models
Aggregation tables are used for complex data analysis scenarios involving multiple data model associations, supporting group aggregation, append merge, horizontal join, and all three can be nested and combined.

- **Group Aggregation**: For a data model, perform aggregation statistics on specified fields (GROUP BY)
- **Append Merge**: Associate multiple data models together and append merge into one data model (UNION)
- **Horizontal Join**: Associate multiple data models together and horizontally join into one data model (JOIN)

### Extension Table Models
Extension tables use a `regular data model` as the base model, chain-associate (LEFT JOIN) several other data models through field association rules, can extend new fields without modifying the original model, and perform aggregation statistics (sum, count, average, maximum, etc.) on fields of the associated models. For one-to-one associations, direct modification of associated fields through extension tables is supported.

Complex statistical analysis is recommended to use aggregation table models.

### Data Object Models (Tableless Models)
Currently only supports full-code usage, can be compared to DTO (Data Transfer Object), completely defined by developers as needed, and used in business logic flow without database association.

## Regular Data Model Example
### Element Directory Structure
Each model element uses an independent folder, path rule: `[Application Root]/models/[Model Name]`

```plaintext
[Application Root]/models/CustomerModel/
├── model.py      # Model element implementation file
├── e.json        # Model element definition file
└── __init__.py   # Model element package initialization file
```

### e.json Configuration File
```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "Customer Table Model",
  "type": "models.NormalType"
}
```

### model.py Implementation File
```python title="model.py"
from datatypes.Meta import datatypes
from models.NormalType import NormalModel

class CustomerModel(NormalModel):
    # Required fields
    id = datatypes.AutoInt(name="id", title="id", primaryKey=True, readOnly=1)
    createdAt = datatypes.Datetime(name="createdAt", title="Created Time")
    updatedAt = datatypes.Datetime(name="updatedAt", title="Updated Time")
    
    # Business fields
    name = datatypes.Stext(name="name", title="Name")
    phone = datatypes.Phone(name="phone", title="Phone")
    email = datatypes.Stext(name="email", title="Email")
    address = datatypes.Address(name="address", title="Address")

    class Meta:
        modelType = "NormalType"
        db = "databases.Default"  # Database element's fullName
        dataTitle = None
        dbTable = "CustomerModel"  # Corresponds to model name
        name = "CustomerModel"     # Corresponds to model name
        title = "Customer Table Model"
```

### __init__.py Initialization File
```python title="__init__.py"
from .model import CustomerModel
```

## Setting Data Titles {#setting-data-titles}

Designating a field as the data title within a data model enhances the readability and recognizability of data rows in the interface. The data title field value serves as the primary display information for data records, enabling users to quickly identify and distinguish different data rows.

### Supported Field Types {#supported-field-types}

The system supports designating the following field types as data titles:

- **Single-line Text** - Ideal for storing names, titles, and other brief textual information
- **Multi-line Text** - Suitable for storing longer descriptive content
- **Serial Number** - System-generated unique identifiers
- **ID Number** - Standard ID number format
- **Phone Number** - Phone number information
- **License Plate Number** - License plate number information
- **Single Choice** - Text content from single-selection options
- **Single Select** - Text content from dropdown selections

### Configuration Method {#configuration-method}

Best practice recommends using fields with uniqueness and descriptive qualities as data titles, such as name, title, or ID number fields. These fields possess strong readability and intuitively describe the content of data rows.

You can set the data title field through the visual interface or by specifying the `dataTitle` attribute in the model's Meta section:

```python
class CustomerModel(NormalModel):
    # Fields definition...
    name = datatypes.Stext(name="name", title="Name")
    
    class Meta:
        modelType = "NormalType"
        db = "databases.Default"
        dataTitle = "name"  # Set name field as data title
        dbTable = "CustomerModel"
        name = "CustomerModel"
        title = "Customer Table Model"
```

:::tip Tip
Each data table model can only designate one field as the data title. If you need to combine multiple fields to represent the data title, consider using computed fields to achieve this.
:::

## Model Built-in Functions {#model-built-in-functions}
JitORM data models provide rich built-in functions covering data creation, reading, updating, deletion, and other operations. These functions support single and batch operations and provide flexible query and aggregation capabilities.

### Basic Data Operations {#basic-data-operations}
Used for basic CRUD operations on single data records.

#### create - Create Data
```python
@classmethod
def create(cls, rowData, triggerEvent=1) -> RowData
```

Create a new data record.

**Parameter Description:**
- `rowData`: Data dictionary to create
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element and create new user
UserModel = app.getElement("models.UserModel")
user_data = {"name": "张三", "email": "zhangsan@example.com"}
new_user = UserModel.create(user_data)
```

#### save - Save Data
```python
def save(self, triggerEvent=1) -> RowData
```

Save current data instance, automatically determine whether to add or update.

**Parameter Description:**
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, modify user information and save
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(id=1)", orderList=[])
user["name"] = "李四"
UserModel=UserModel(**user)
UserModel.save()
```

#### delete - Delete Data
```python
def delete(self, triggerEvent=1) -> Dict[str, Any]
```

Delete current data record.

**Parameter Description:**
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element and delete user
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(id=1)", [])
UserModel(**user).delete()
```

#### updateOrAdd - Conditional Update or Add
```python
@classmethod
def updateOrAdd(cls, filter, orderList, updateData, addData, triggerEvent=1) -> RowData
```

Find data based on conditions, update if exists, add if not exists.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `orderList`: Sort rules, e.g.: [["name",1],["age",-1]] 1 ascending, -1 descending
- `updateData`: Data when updating
- `addData`: Data when adding
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, update or add user based on email
UserModel = app.getElement("models.UserModel")
UserModel.updateOrAdd(
    "Q(email='test@example.com')", 
    [], 
    {"name": "更新后的名字"}, 
    {"name": "新用户", "email": "test@example.com"}
)
```

### Batch Data Operations
Used for efficient batch operations on large amounts of data.

#### createOrUpdateMany - Batch Create or Update
```python
@classmethod
def createOrUpdateMany(cls, rowDataList, triggerEvent=1) -> List[RowData]
```

Batch process multiple data records, automatically determine whether to add or update.

**Parameter Description:**
- `rowDataList`: List of data to process
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, batch import user data
UserModel = app.getElement("models.UserModel")
users_data = [
    {"name": "用户1", "email": "user1@example.com"},
    {"name": "用户2", "email": "user2@example.com"}
]
UserModel.createOrUpdateMany(users_data)
```

#### updateByPK - Batch Update by Primary Key
```python
@classmethod
def updateByPK(cls, pkList, updateData, triggerEvent=1) -> List[RowData]
```

Batch update data based on primary key list.

**Parameter Description:**
- `pkList`: Primary key ID list
- `updateData`: Data to update
- `triggerEvent`: Whether to trigger events (default trigger)

**Usage Example:**
```python
# Get model element, batch activate multiple users
UserModel = app.getElement("models.UserModel")
UserModel.updateByPK([1, 2, 3], {"status": "active"})
```

#### deleteByPK - Batch Delete by Primary Key
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

#### updateByFilter - Batch Update by Condition
```python
@classmethod
def updateByFilter(cls, filter, updateData)
```

Batch update data based on filter conditions.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `updateData`: Data to update

**Usage Example:**
```python
# Get model element, set all inactive users to expired status
UserModel = app.getElement("models.UserModel")
UserModel.updateByFilter("Q(status='inactive')", {"status": "expired"})
```

#### deleteByFilter - Batch Delete by Condition
```python
@classmethod
def deleteByFilter(cls, filter)
```

Batch delete data based on filter conditions.

**Parameter Description:**
- `filter`: Q expression filter conditions

**Usage Example:**
```python
# Get model element, delete all expired users
UserModel = app.getElement("models.UserModel")
UserModel.deleteByFilter("Q(status='expired')")
```

### Data Query
Core functions for retrieving and finding data, supporting pagination, sorting, filtering, and other features.

#### query - Paginated Query
```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None, level=2)
```

Paginated query data, the most commonly used query method.

**Parameter Description:**
- `filter`: Q expression filter conditions (optional)
- `fieldList`: Specify fields to query (optional, default query all fields)
- `orderList`: Sort rules, e.g.: [["name",1],["age",-1]] 1 ascending, -1 descending
- `page`: Page number (starting from 1)
- `size`: Records per page
- `level`: Association data level (default 2 levels)

**Return Data:**
- `rowDatas`: Query result list
- `totalCount`: Total record count

**Usage Example:**
```python
# Get model element, basic paginated query
UserModel = app.getElement("models.UserModel")
result = UserModel.query(page=1, size=10)
users = result["rowDatas"]
total = result["totalCount"]

# Query with conditions and sorting
result = UserModel.query(
    filter="Q(status='active')",
    orderList=[["createdAt", -1]],  # Sort by creation time descending
    page=1, 
    size=20
)
```

#### get - Get Single Data
```python
@classmethod
def get(cls, filter, orderList=None, level=2) -> RowData
```

Get the first data record that meets the conditions.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `orderList`: Sort rules, e.g.: [["name",1],["age",-1]] 1 ascending, -1 descending
- `level`: Association data level (default 2 levels)

**Usage Example:**
```python
# Get model element, get user by ID
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(id=1)", [])

# Get latest active user
user = UserModel.get(
    "Q(status='active')", 
    [["createdAt", 1]]
)
```

#### groupBy - Group Statistics
```python
@classmethod
def groupBy(cls, filter, fieldList, orderList=None, page=None, size=None)
```

Group and count data by specified fields.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `fieldList`: Group field list
- `orderList`: Sort rules (optional), e.g.: [["name",1],["age",-1]] 1 ascending, -1 descending
- `page`: Page number (optional)
- `size`: Records per page (optional)

**Usage Example:**
```python
# Get model element, group count users by status
UserModel = app.getElement("models.UserModel")
result = UserModel.groupBy(
    filter="", 
    fieldList=["status", "COUNT(*) as count"]
)
```

#### getFieldData - Get Field Value List
```python
@classmethod
def getFieldData(cls, fieldId, filter, orderList=None) -> List
```

Get all values of specified field, commonly used for building dropdown options.

**Parameter Description:**
- `fieldId`: Field name
- `filter`: Q expression filter conditions
- `orderList`: Sort rules, e.g.: [["name",1],["age",-1]] 1 ascending, -1 descending

**Usage Example:**
```python
# Get model element, get all department name list
UserModel = app.getElement("models.UserModel")
departments = UserModel.getFieldData("department", "", [])

# Get email list of active users
emails = UserModel.getFieldData(
    "email", 
    "Q(status='active')", 
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
- `filter`: Q expression filter conditions
- `fieldAggrMap`: Field aggregation mapping, e.g.: `{"age": "AVG", "salary": "SUM"}`

**Usage Example:**
```python
# Get model element, calculate average age and total salary of users
UserModel = app.getElement("models.UserModel")
stats = UserModel.statisticFieldData(
    "Q(status='active')",
    {"age": "AVG", "salary": "SUM"}
)
```

### Data Import Export
Tool functions for data export and batch data processing.

#### getExportData - Export Data
```python
@classmethod
def getExportData(cls, filter, fieldList, page, size)
```

Get data that meets conditions for export, supporting pagination for large amounts of data.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `fieldList`: List of fields to export
- `page`: Page number
- `size`: Records per page

**Usage Example:**
```python
# Get model element, export basic information of active users
UserModel = app.getElement("models.UserModel")
export_data = UserModel.getExportData(
    filter="Q(status='active')",
    fieldList=["name", "email", "department"],
    page=1,
    size=1000
)
```

### Advanced Features
Provide more advanced data operation and management functionality.

#### aggregate - Aggregation Calculation
```python
@classmethod
def aggregate(cls, filter, aggrField, aggrType)
```

Perform aggregation calculation on specified field.

**Parameter Description:**
- `filter`: Q expression filter conditions
- `aggrField`: Aggregation field name
- `aggrType`: Aggregation type (SUM, AVG, COUNT, MAX, MIN)

**Usage Example:**
```python
# Get model element, calculate average age of active users
UserModel = app.getElement("models.UserModel")
avg_age = UserModel.aggregate("Q(status='active')", "age", "AVG")

# Count total users
user_count = UserModel.aggregate("", "id", "COUNT")
```

#### resetModelData - Clear Data
```python
@classmethod
def resetModelData(cls)
```

Clear all data in the model's corresponding table, **use with caution**.

**Usage Example:**
```python
# Get model element, clear test data (use with caution in production)
TestModel = app.getElement("models.TestModel")
TestModel.resetModelData()
```

### Data Validation
Auxiliary functions for data validation and condition checking.

#### getCompareResult - Data Comparison
```python
@classmethod
def getCompareResult(cls, q, bizRow)
```

Check whether business data meets conditions based on Q expression conditions.

**Parameter Description:**
- `q`: Q expression comparison conditions
- `bizRow`: Business data to validate

**Usage Example:**
```python
# Get model element, validate whether user data meets conditions
UserModel = app.getElement("models.UserModel")
user_data = {"age": 25, "status": "active"}
is_valid = UserModel.getCompareResult("Q(age__gte=18) & Q(status='active')", user_data)

if is_valid:
    print("User data meets conditions")
```

---

:::tip Usage Recommendations
- For frequent data operations, recommend using batch functions to improve performance
- When querying, reasonably use `fieldList` parameter to only get needed fields
- Using `triggerEvent=0` can skip event triggering and improve batch operation performance
- TQL queries are suitable for complex cross-table query scenarios
:::

:::warning Notes
- `resetModelData` will clear all data in the table, use with caution in production
- Batch delete operations cannot be undone, please confirm filter conditions are correct
- Large data operations recommend batch processing to avoid memory overflow
:::