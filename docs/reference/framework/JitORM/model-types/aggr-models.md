---
sidebar_position: 1
slug: aggr-models
description: "API reference documentation for Aggregation Model. Complete specifications, methods, and examples."
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Aggregation Model

Aggregation Model do not correspond directly to single database tables. Instead, they are virtual data tables generated through flexible configurations that correlate, merge, and calculate data from multiple data table models to meet specific business requirements. They function similarly to database views but are processed entirely dynamically at the application layer without creating actual view objects in the database.


:::tip Use Cases
✅ **Complex Data Aggregation and Statistics**: Supports multi-dimensional and multi-metric data grouping, summarization, and calculation, satisfying diverse reporting and dashboard requirements.<br/>
✅ **Multi-Source Data Fusion**: Associates and merges data dispersed across different tables or heterogeneous data sources to construct a unified data view.<br/>
✅ **Multi-Level Data Pivoting**: Supports secondary calculations and multi-level nesting based on aggregation results, enabling seamless data drill-down from summary to detail.<br/>
✅ **Cross-Domain Integration**: Breaks down data silos between business modules, allowing for the flexible assembly of core business data across departments and domains.
:::


The hierarchy of an Aggregation Model is: Meta (`models.Meta`) → Type (`models.AggrType`) → Instance.

## Model Directory Structure

Each model element resides in an independent folder following the path rule: `[AppRoot]/models/[ModelName]`.

```plaintext
[AppRoot]/models/SalesAnalysisModel/
├── e.json        # Model declaration file
├── model.py      # Model implementation file
└── __init__.py   # Package initialization file
```

### e.json Declaration

```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "Sales Analysis Aggregation Model",
  "type": "models.AggrType", 
  "functionList": []
}
```

### model.py Implementation

The `model.py` file for an aggregation model primarily consists of field definitions and `Meta` configuration. The `dbTable` attribute in `Meta` stores a TQL (Transit Query Language) expression that defines the data aggregation logic.

```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class SalesAnalysisModel(AggrModel):
    # Define output fields after aggregation
    region = datatypes.Stext(name="region", title="Sales Region")
    total_sales = datatypes.Numeric(name="total_sales", title="Total Sales")
    
    class Meta:
        modelType = "AggrType"
        name = 'SalesAnalysisModel'
        title = 'Sales Analysis Aggregation Model'
        db = "databases.Default"
        # TQL expression defining aggregation logic
        dbTable = """
        Select(
            [F('region', 'region'), F(Formula("COLSUM(F('amount'))"), 'total_sales')],
            From(["sales_data"]),
            GroupBy(F("region"))
        )
        """
```

The field configuration and `Meta` structure of Aggregation Model are fundamentally consistent with Data Models. The only distinction is that in Data Models, `Meta.dbTable` corresponds to a database table name, whereas in Aggregation Model, it contains a [TQL expression](../TQL).

### \_\_init\_\_.py Initialization

```python title="__init__.py"
from .model import SalesAnalysisModel
```

## Core Features and Configuration

The core of an Aggregation Model lies in the `dbTable` configuration within the `Meta` class, which implements complex operations such as grouping aggregation, union merging, and horizontal joining through TQL expressions.

### Group Aggregation

Generates summary result sets by statistically classifying data based on specified dimension fields. This is suitable for generating statistical reports.

**Configuration Example:**

```python
class SalesGroupModel(AggrModel):
    region = datatypes.Stext(name="region", title="Sales Region")
    total_sales = datatypes.Numeric(name="total_sales", title="Total Sales")

    class Meta:
        dbTable = """
        Select(
            # Field mapping: F('original_field', 'new_field_alias')
            [F('region', 'region'), F(Formula("COLSUM(F('amount'))"), 'total_sales')],
            From(["sales_data"]),
            GroupBy(F("region"))  # Group by region
        )
        """
```

**Statistical Formula Examples:**
- `Formula("COLSUM(F('field'))")`: Summation
- `Formula("COLMAX(F('field'))")`: Maximum value
- `Formula("COUNT_DISTINCT(F('field'))")`: Distinct count

For detailed syntax, please refer to the [Formula Documentation](../formula).

### Union Merge

Vertically merges multiple data tables with similar structures row by row. This is applicable for consolidating data from sharded tables (e.g., branch office reports, monthly data archives).

- **UnionAll**: Appends all rows, preserving duplicates (High Performance).
- **Union**: Appends rows and automatically removes complete duplicates (Lower Performance).

**Configuration Example:**

```python
class SalesUnionModel(AggrModel):
    order_id = datatypes.Numeric(name="order_id", title="Order ID")
    amount = datatypes.Numeric(name="amount", title="Amount")

    class Meta:
        dbTable = """
        Select(
            [F("order_id"), F("amount")],
            From(
                [Union(    # Use UnionAll to keep duplicates
                    [Select([F("id")], From(["north_sales"])), "t1"],  # Sub-table 1
                    [Select([F("order_no")], From(["south_sales"])), "t2"],  # Sub-table 2
                    # Field mapping and transformation
                    [["order_id", ["t1.id"], "ID Mapping"], 
                     ["amount", ["t2.price"], "Amount Conversion"]]
                ), "union_t"]
            )
        )
        """
```

### Horizontal Join

Associates rows from multiple tables using key fields. The following join types are supported:

- **LeftJoin**: Returns all records from the left table and matched records from the right table. Result is NULL if there is no match in the right table.
- **RightJoin**: Returns all records from the right table and matched records from the left table. Result is NULL if there is no match in the left table.
- **InnerJoin**: Returns only records that have matches in both the left and right tables.
- **FullJoin**: Returns all records when there is a match in either the left or right table. Result is NULL for the side without a match.

**Configuration Example:**

```python
class OrderJoinModel(AggrModel):
    order_id = datatypes.Numeric(name="order_id", title="Order ID")
    customer_name = datatypes.Stext(name="customer_name", title="Customer Name")

    class Meta:
        dbTable = """
        Select(
            [F("orders.id", "order_id"), F("customers.name", "customer_name")],
            From(
                ["main.orders", "o"],  # Main table
                LeftJoin("main.customers", "c"),  # Joined table
                On([F("o.customer_id"), "=", F("c.id")])  # Join condition
            )
        )
        """
```

:::warning Important Considerations
1. **Index Dependency**: To ensure query performance, it is **strongly recommended** to establish indices on fields used in join conditions (e.g., `customer_id`) in the original tables.
2. **Field Aliases**: When multiple tables contain fields with the same name (e.g., `id`, `name`), you must use aliases in `Select` to distinguish them, for example, `F("orders.name", "order_name")`.
3. **Performance Control**: Horizontal joins significantly increase memory consumption. It is recommended to limit the number of joined tables to no more than 3. For extremely large datasets, prioritize ETL or Data Warehouse solutions.
:::

## Model Functions

Aggregation Model support most data query functions but **do not support** direct data modification operations such as `save`, `delete`, `create`, or `update`.

### Built-in Model Functions {#model-built-in-functions}

#### query - Paginatied Query

```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None)
```

Queries aggregated data with support for filtering, sorting, and pagination.

**Parameters:**
- `filter`: Q expression filter condition (optional), e.g., `"Q('age', '>', 18)"`.
- `fieldList`: List of fields to return (optional).
- `orderList`: Sorting rules, e.g., `[["total_sales", -1]]`.
- `page`: Page number (default 1).
- `size`: Records per page (default 20).

**Example:**

```python
# Query sales data for East China in 2023
result = SalesAggrModel.query(
    filter="Q(Q('year', '=', 2023), Q.AND, Q('region', 'in', ['East China','South China']))",
    fieldList=["product", "total_sales"],
    orderList=[["total_sales", -1]],
    page=1,
    size=50
)
```

#### get - Retrieve Single Record

```python
@classmethod
def get(cls, filter, orderList=None) -> RowData
```

Retrieves the first aggregated record that meets the specified conditions.

**Parameters:**
- `filter`: Q expression filter condition.
- `orderList`: Sorting rules.

**Example:**

```python
# Get the order with the highest amount
max_order = OrdersAggrModel.get(
    filter="Q('amount', '>', 100000)",
    orderList=[["amount", -1]]
)
```

#### statisticFieldData - Field Statistics

```python
@classmethod
def statisticFieldData(cls, filter, fieldAggrMap)
```

Performs statistical calculations on the aggregated result set.

**Parameters:**
- `filter`: Q expression filter condition.
- `fieldAggrMap`: Field aggregation mapping, e.g., `{"total_sales": "SUM"}`.

**Example:**

```python
# Calculate total sales and average price for Q4
stats = SalesAggrModel.statisticFieldData(
    filter="Q('quarter', '=', 'Q4')",
    fieldAggrMap={
        "total_sales": "SUM",
        "average_price": "AVG",
        "max_volume": "MAX"
    }
)
```

## Advanced Features

### Multi-Level Aggregation and Nesting

Aggregation Model support layered calculations, allowing the result of one aggregation model to serve as the input for another (referencing another model or subquery in the `From` clause).

**Example:**

**Phase 1 Model: Group statistics by date + product**

```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class DailySalesModel(AggrModel):
    sale_date = datatypes.Date(name="sale_date", title="Sale Date")
    product_id = datatypes.Integer(name="product_id", title="Product ID")
    daily_sales = datatypes.Numeric(name="daily_sales", title="Daily Sales")

    class Meta:
        modelType = "AggrType"
        name = 'DailySalesModel'
        title = 'Daily Sales Statistics Model'
        db = "databases.Default"
        dbTable = """
        Select(
            [F("sale_date"), F("product_id"), F(Formula("SUM(amount)"), "daily_sales")],
            From("sales.OrderModel"),
            GroupBy("sale_date", "product_id")
        )
        """
```

**Phase 2 Model: Secondary aggregation by month based on Phase 1 results**

```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class MonthlySalesModel(AggrModel):
    month = datatypes.Integer(name="month", title="Month")
    product_id = datatypes.Integer(name="product_id", title="Product ID")
    monthly_sales = datatypes.Numeric(name="monthly_sales", title="Monthly Sales")

    class Meta:
        modelType = "AggrType"
        name = 'MonthlySalesModel'
        title = 'Monthly Sales Statistics Model'
        db = "databases.Default"
        
        # Directly reference the Phase 1 model name in From
        dbTable = """
        Select(
            [F(Formula("MONTH(sale_date)"), "month"), F("product_id"), F(Formula("SUM(daily_sales)"), "monthly_sales")],
            From("models.DailySalesModel"),
            GroupBy("month", "product_id")
        )
        """
```

