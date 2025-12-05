---
sidebar_position: 2
slug: extend-models
description: "Extend Model API reference. Virtual views based on multi-table associations, supporting bidirectional data operations and transaction synchronization."
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Extend Model

The **Extend Model** is a virtual data view dynamically generated based on multiple base models (physical tables) through predefined association rules. Essentially, it integrates data from multiple independent models into a unified logical wide table using database `LEFT JOIN` operations according to specific business logic.

Unlike **Aggregate Models**, Extend Models support not only data querying but also **data modification (Create, Update, Delete)**. They feature a built-in cross-table transaction mechanism capable of automatically coordinating data synchronization across multiple tables.

:::tip Use Cases
✅ **Logical Wide Table Construction**: Eliminates data fragmentation and maintains database normalization (3NF) without creating physical wide tables.<br/>
✅ **Complex Association Handling**: Automates multi-level, chained `LEFT JOIN` associations, encapsulating underlying SQL complexity.<br/>
✅ **Cross-table Transactional Writes**: Provides unified standard CRUD interfaces; a single call completes atomic writes or updates across multiple associated tables.<br/>
✅ **Unified Data View**: Offers a flattened data structure for front-end or downstream business logic, hiding complex backend relational models.
:::

The hierarchy of an Extend Model is: Meta (`models.Meta`) → Type (`models.ExtendType`) → Instance.

## Model Directory Structure

Each model element uses a dedicated folder following the path rule: `[App Root]/models/[Model Name]`

```plaintext
[App Root]/models/OrderExtendModel/
├── e.json        # Model declaration file
├── model.py      # Model implementation file
└── __init__.py   # Package initialization file
```

### `e.json` Model Declaration File

```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "Order Details Extended Model",
  "type": "models.ExtendType", 
  "functionList": []
}
```

### `model.py` Implementation File

The `model.py` of an Extend Model defines field mappings and `Meta` configuration. `Meta.dbTable` uses [Transit Query Language](../TQL) to define the logic for multi-table left joins.

The following example demonstrates a chained association structure: `Base Table (t1)` → `Related Table 1 (t2)` → `Related Table 2 (t3)`.

```python title="model.py"
from datatypes.Meta import datatypes
from models.ExtendType import ExtendModel

class OrderExtendModel(ExtendModel):
    # --- Field Definitions ---
    
    # Source: Base Table (t1)
    order_id = datatypes.AutoInt(primaryKey=True, title="Order ID")
    order_no = datatypes.Stext(title="Order No")
    # Define association relationship, used for automatic foreign key handling during writes
    customer_rel = datatypes.RelateData(
        generic="app.models.CustomerModel",  # Associated Model
        relateField="id"                     # Associated Field
    )
    
    # Source: Related Table 1 (t2 - Customer)
    customer_id = datatypes.AutoInt(title="Customer ID")
    customer_name = datatypes.Stext(title="Customer Name")
    address_rel = datatypes.RelateData(
        generic="app.models.AddressModel",
        relateField="id"
    )
    
    # Source: Related Table 2 (t3 - Address)
    address_id = datatypes.AutoInt(title="Address ID")
    full_address = datatypes.Stext(title="Full Address")
    
    # Computed Field (Read-only)
    full_info = datatypes.Stext(
        title="Full Info", 
        readOnly=1  # Explicitly marked as read-only
    )

    class Meta:
        modelType = "ExtendModel"
        name = 'OrderExtendModel'
        title = 'Order Details Extended Model'
        db = "databases.Default"
        
        # TQL Expression defining multi-table join logic
        dbTable = """
        Select(
            # Field Mapping: F('TableAlias.OriginalField', 'ModelNewField')
            [
                F("t1.id", "order_id"), F("t1.order_no", "order_no"), F("t1.customer_id", "customer_rel"),
                F("t2.id", "customer_id"), F("t2.name", "customer_name"), F("t2.address_id", "address_rel"),
                F("t3.id", "address_id"), F("t3.detail", "full_address"),
                # Expression fields are automatically read-only
                F(Formula("CONCAT(t1.order_no, '-', t2.name)"), "full_info")
            ],
            From(
                # 1. Base Table (t1)
                [Select([F("id"), F("order_no"), F("customer_id")], From(["app.models.OrderModel"])), "t1"],
                
                # 2. Level 1 Join (t1 -> t2)
                LeftJoin(
                    Select([F("id"), F("name"), F("address_id")], From(["app.models.CustomerModel"])), 
                    "t2"
                ),
                On([F("t1.customer_id"), "=", F("t2.id")]),
                
                # 3. Level 2 Join (t2 -> t3)
                LeftJoin(
                    Select([F("id"), F("detail")], From(["app.models.AddressModel"])), 
                    "t3"
                ),
                On([F("t2.address_id"), "=", F("t3.id")])
            )
        )
        """
```

### `__init__.py` Initialization File

```python title="__init__.py"
from .model import OrderExtendModel
```

## Core Features & Configuration

The core of the Extend Model lies in constructing chained connection structures via TQL and leveraging the system's built-in mechanisms to handle complex data write logic.

### Dynamic Connection Architecture (Chain Connection)

Extend Models adopt a chained extension pattern, supporting infinite-level model associations. The connection rules are as follows:
1.  **Base Table**: The first model in the `From` clause, serving as the main body of data.
2.  **Left Join**: Subsequent models are mounted onto preceding models via `LeftJoin`.
3.  **Field Carrying**: Child tables can serve as anchors for the next connection (as seen in the example above where `t2` is `t1`'s associated table and `t3`'s master table).

### Field Mapping & RelateData

When defining fields in `model.py`, note the following:
*   **Field Aliases**: `F("t1.id", "order_id")` in `dbTable` maps the physical table's `id` to the extend model's `order_id`.
*   **RelateData**: If a field is a foreign key (e.g., `customer_rel`), you **must** use the `datatypes.RelateData` type. This not only marks the association but also allows the framework to automatically handle ID backfilling and propagation during **write operations**.

### Field Read/Write Permissions

Not all fields in an Extend Model are editable. Editability depends on the field's source and definition:

| Field Type | Example | Editability | Description |
| :--- | :--- | :--- | :--- |
| **Direct Mapping Field** | `F("t2.name", "customer_name")` | ✅ **Editable** | Standard business fields mapped directly from physical tables. Modifications sync to the underlying physical table. |
| **Foreign Key Field** | `F("t1.customer_id", "customer_rel")` | ✅ **Editable** | Modifying the foreign key value changes the record's association (e.g., reassigning an order to another customer). |
| **Expression Field** | `F(Formula("..."), "full_info")` | 🚫 **Non-editable** | Fields generated via calculation formulas cannot be reverse-updated; they are ignored or trigger errors during write. |
| **Explicit Read-Only Field** | `readOnly=1` | 🚫 **Non-editable** | Fields with the `readOnly=1` attribute explicitly set in their definition. |
| **Associated Table PK** | `F("t2.id", "customer_id")` | ⚠️ **Restricted** | Although mapped, as the identifier (Primary Key) of the associated table, modification is generally discouraged, and some databases prohibit PK modification. |

:::info System Behavior
When executing an `update` operation on an Extend Model, the system automatically filters out **non-editable** fields, dispatching only valid field changes to the corresponding physical table transactions.
:::

## Data Operations

The most significant feature of Extend Models is support for **write operations**. The framework parses the TQL structure to automatically decompose flattened write requests into multiple physical table transaction operations.

### Data Creation (Create)

When the `create` method is called, the system employs a **Reverse Cascading Creation** strategy.

**Execution Flow:**
1.  **Parsing & Splitting**: Decomposes the incoming flattened data into data packets corresponding to `t1`, `t2`, `t3`.
2.  **Reverse Creation**: Starts creating records from the leaf-most model (e.g., `t3`).
3.  **ID Propagation**:
    *   After `t3` is created, the generated ID is automatically filled into `t2`'s foreign key field (e.g., `address_id`).
    *   After `t2` is created, the generated ID is automatically filled into `t1`'s foreign key field (e.g., `customer_id`).
4.  **Base Creation**: Finally, creates the record for the base table `t1`.
5.  **Transaction Guarantee**: All operations execute within a single database transaction; failure at any step triggers a total rollback.

**Code Example:**

```python
# Create data for three tables in one go
data = {
    "order_no": "ORD20231001",    # t1 field
    "customer_name": "Jit Tech",  # t2 field
    "full_address": "West Lake District, Hangzhou"  # t3 field
}

# The system automatically creates records in the order t3 -> t2 -> t1 and handles foreign key associations
# The return result contains the complete extended model record
new_record = OrderExtendModel.create(data)
```

### Data Modification (Update)

Data modification follows similar logic, supporting simultaneous updates to multiple associated tables. The update sequence prioritizes the base table to ensure primary key validity.

**Code Example:**

```python
# Update order info and correct customer address simultaneously
update_data = {
    "order_id": 1001,             # Primary Key
    "order_no": "ORD20231001-FIX",
    "full_address": "Yuhang District, Hangzhou" # Modifying t3 field
}

# Automatically dispatch update requests to corresponding physical tables
OrderExtendModel(id=1001).update(update_data)
```

### Data Query (Query)

Query operations are consistent with standard models; the underlying layer automatically converts them to SQL `LEFT JOIN` queries.

```python
# Query example: Filter records where address contains "Hangzhou" and order number starts with "ORD"
results = OrderExtendModel.query(
    filter="Q(Q('full_address', 'contains', 'Hangzhou'), Q.AND, Q('order_no', 'startswith', 'ORD'))",
    fieldList=["order_no", "customer_name", "full_address"]
)
```

## Best Practices & Notices

:::warning Developer Tips
1.  **Primary Key Definition**: Extend Models must specify a primary key (usually mapping the base table's PK); otherwise, update operations cannot be performed.
2.  **Null Value Handling**: Due to `LeftJoin`, if an associated table (e.g., `t2`) has no matching data, fields from `t2` and `t3` will result in `NULL` in the query output.
3.  **Index Optimization**: To ensure query performance, it is recommended to establish indexes on fields used in connection conditions (e.g., `customer_id`, `address_id`) in the original tables.
4.  **Performance Considerations**: While Extend Models are convenient, excessive cascading connections (more than 3-4 levels) may impact query performance. For complex reports with large-scale data, consider using [Aggregate Models](./aggr-models).
:::

