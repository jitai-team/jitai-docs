---
sidebar_position: 5
slug: TQL
title: TQL Guide
description: "TQL Expression API Reference. Complete specifications, methods, and examples."
---

# TQL Expression Guide

TQL (Table Query Language) is an object-oriented query language designed for constructing complex queries based on data models. It adopts a structure similar to SQL but is optimized for object models.

This document provides a comprehensive reference for TQL core expressions, covering query construction, join operations, set operations, and more.

## Core Expressions

### Select

`Select` is the entry point expression for TQL. It supports various query patterns depending on the number and type of arguments provided.

**Syntax**
```python
Select(*args)
```

**Common Usage Patterns**

1.  **Full Model Query** (Single Argument)
    Selects all fields from the specified model, equivalent to `SELECT * FROM table`.
    ```python
    Select("models.UserModel")
    ```

2.  **Aliased Full Query** (Two Arguments)
    Selects all fields while defining an alias for the primary table.
    ```python
    Select("*", From(["models.UserModel", "t1"]))
    ```

3.  **Complex Query with Specific Fields** (Multiple Arguments)
    This is the most common pattern. The first argument is a list of fields, followed by clauses such as `From`, `Where`, and `OrderBy`.
    ```python
    Select(
        [F("t1.name", "username"), F("t1.age", "age")],  # Field List
        From(["models.UserModel", "t1"]),               # Data Source
        Where(Q("age", ">", 18))                        # Filter Condition
    )
    ```

### F (Field)

The `F` expression defines the fields to be queried, including their aliases and display titles. It supports field references, cross-table references, inline formulas, and post-calculation configurations.

**Syntax**
```python
F(content, alias=None, title=None, twiceCalc=None, **config)
```

*   **content**: The field identifier. Can be:
    *   Model field path: `"t1.field_name"`
    *   Inline formula: `Formula("SUM(F('amount'))")`
*   **alias**: (Optional) The field alias, used as the key in the result set.
*   **title**: (Optional) The display title for the field, often used in frontend views.
*   **twiceCalc**: (Optional) Configuration for secondary calculations (e.g., period-over-period growth).
*   **config**: (Optional) Additional configuration options, such as formatting parameters.

**Examples**

```python
# 1. Standard Field
F("name")

# 2. Cross-table Field with Alias
F("t1.deptId", "dept_id")

# 3. Aggregate/Formula Field
F(Formula("COUNT(*)"), "total_count", "Total")

# 4. Complex Calculation Field
F(Formula("SUM(F('f1')) + AVG(F('f2'))"), "calc_result")

# 5. Field with Secondary Calculation Configuration
F("t1.sales", "sales", "Revenue", "YoY_Growth", format="currency")
```

### Formula

`Formula` embeds calculation logic within a query, supporting both inline arithmetic and aggregate functions.

**Syntax**
```python
Formula(expression_string)
```

**Examples**
```python
# Arithmetic Operation
Formula("F('price') * F('quantity')")

# Aggregate Function
Formula("MAX(F('score'))")

# Mixed Operation
Formula("SUM(F('f1')) + 100 + AVG(F('f2'))")
```

### From

The `From` expression establishes the context for the data source, supporting single tables, subqueries, and multi-table joins.

**Syntax**
```python
From(primary_table, *join_clauses)
```

**Argument Rules**

:::warning Limitation on Multi-table Joins
TQL strictly supports **pairwise joins only** within a single `From` expression. You cannot chain multiple joins (e.g., `From(T1, Join T2, On..., Join T3, On...)`).

To join more than two tables, you must use **nested subqueries**. The result of the first join (a `Select` expression) becomes the source for the second join.
:::

1.  **Argument Count**: The `From` expression accepts either 1 argument (source only) or 3 arguments (source, join, on).
    *   1st Argument: Primary Table (or Subquery).
    *   2nd & 3rd Arguments: Join Clause + On Clause.
2.  **Join Pairing**: Every `Join Expression` (e.g., `LeftJoin`) must be immediately followed by an `On Expression`.
3.  **Positional Constraints**:
    *   An `On Expression` must be preceded by a `Join Expression` (or another `On Expression` in rare nested cases).
    *   An `On Expression` must be followed by a `Join Expression` (unless it is the final argument).

**Argument Format**
*   **Primary Table/Subquery**:
    *   Model Reference: `["models.UserModel", "t1"]`
    *   Subquery: `[Select(...), "sub_alias"]`
*   **Join Sequence**: `LeftJoin(...)`, `On(...)`, `InnerJoin(...)`, `On(...)` ...

**Example**

```python
From(
    # 1. Primary Table (Argument 1)
    ["models.UserModel", "t1"],

    # 2. Left Join Department Table (Argument 2: Join)
    LeftJoin("models.DeptModel", "t2"),
    # (Argument 3: On)
    On(["t1.deptId", "=", "t2.id"])
)
```

### Join Family

TQL supports various join types used as arguments within `From`.

*   **LeftJoin(table, alias, title=None)**: Left Outer Join
*   **RightJoin(table, alias, title=None)**: Right Outer Join
*   **InnerJoin(table, alias, title=None)**: Inner Join
*   **FullJoin(table, alias, title=None)**: Full Outer Join

**Parameters**
*   **table**: Target model path string or `Select` object (Subquery). (Required)
*   **alias**: Alias assigned to the joined table. (Required)
*   **title**: (Optional) Descriptive title for the joined table.

### On

The `On` expression immediately follows a Join expression to define the join condition.

**Syntax**
```python
On(*conditions)
```

*   **conditions**: One or more condition arrays in the format `[left_field, operator, right_field]`.

**Example**
```python
On(
    ["t1.uid", "=", "t2.uid"],
    ["t1.status", "=", "t2.status"]  # Multi-condition join
)
```

### Where

The `Where` expression filters data using one or more `Q` expressions.

**Syntax**
```python
Where(*q_expressions)
```

*   Multiple arguments are combined with `AND` logic by default.

**Example**
```python
Where(
    Q("age", ">", 18),
    Q("status", "=", "active")
)
```

### Q (Query Condition)

The `Q` expression constructs specific filter conditions, supporting logical composition and nesting.

**Basic Syntax**
```python
Q(field_or_q, operator=None, value_or_q=None)
```

**Usage Forms**
1.  **Standard Condition**: `Q("field", "operator", "value")`
    *   `operator`: `=`, `>`, `<`, `in`, `like`, etc.
2.  **Explicit Logical Composition**: `Q(Q1, "Q.and", Q2)` or `Q(Q1, "Q.or", Q2)`
    *   Supports nesting: `Q(Q(Q1), "Q.or", Q(Q2))`
3.  **Operator Overloading Composition**: `Q1 & Q2`, `Q1 | Q2`, `~Q1`

**Advanced Features**
*   **Implicit Relationship**: `Q("ref_field__name", "=", "Admin")`
    *   *Note*: Double underscores `__` denote cross-table relationships. The backend automatically parses this and injects the necessary LeftJoin logic. While this simplifies frontend query construction, be aware that it incurs additional join overhead during execution.
*   **Subquery**: `Q("id", "in", Select(...))`

**Examples**
```python
# Simple Condition
Q("f1", "=", 1)

# Nested Composition
Q(Q("f1", ">", 10) | Q("f2", "<", 5))

# Explicit Logical Operator
Q(Q("f1", "=", 1), "Q.or", Q("f2", "=", 2))

# Related Field Filter (Implicit Join)
Q("user__dept__name", "=", "Sales")
```

### GroupBy & Having

Used for grouping and post-aggregation filtering.

**Syntax**
```python
GroupBy(*fields)
Having(*q_expressions)
```

**Example**
```python
Select(
    [F("t1.deptId"), F(Formula("COUNT(*)"), "total")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("t1.deptId")),
    Having(Q("total", ">", 100))  # Filter grouped results
)
```

### OrderBy

Used for sorting results.

**Syntax**
```python
OrderBy(*sort_items)
```

**Example**
```python
OrderBy(
    (F("create_time"), -1),  # -1: Descending
    (F("name"), 1)           # 1: Ascending
)
```

### Limit

Used for pagination.

**Syntax**
```python
Limit(offset, limit)
```

**Example**
```python
Limit(0, 20)  # Offset 0, limit 20 records
```

## Set Operations (Union)

TQL supports `Union` (distinct union) and `UnionAll` (union with duplicates).

**Syntax**
```python
Union(*queries, mapping)
```

*   **queries**: A list of `[SelectObject, alias]` pairs.
*   **mapping**: Definition of result set field mapping.

**Mapping Rules**
The `mapping` is a 2D array where each item defines an output field:
`[target_field_name, source_fields_list, title]`
*   `target_field_name`: The field name in the merged result.
*   `source_fields_list`: A list of source field names corresponding to each subquery (order must match `queries`). If a subquery lacks a specific field, use a placeholder or omit it depending on implementation specifics (usually strict correspondence is required).
*   `title`: Field display title.

**Example**

```python
Union(
    # Subquery 1
    [Select([F("f1"), F("f2")], From(["models.ModelA"])), "t1"],
    # Subquery 2
    [Select([F("f3"), F("f4")], From(["models.ModelB"])), "t2"],
    # Field Mapping
    [
        ["name", ["t1.f1", "t2.f3"], "User Name"],  # Map t1.f1 and t2.f3 to 'name'
        ["age",  ["t1.f2", "t2.f4"], "User Age"]    # Map t1.f2 and t2.f4 to 'age'
    ]
)
```

## Comprehensive Example

Below is a complete TQL example demonstrating subqueries, joins, aggregation, and filtering:

```python
Select(
    [
        F("sub.username", "username"),
        F("sub.dept_name", "dept_name"),
        F(Formula("COUNT(t3.id)"), "project_count")
    ],
    From(
        [
            Select(
                [
                    F("t1.name", "username"),
                    F("t1.id", "uid"),
                    F("t1.status", "status"),
                    F("t2.title", "dept_name"),
                    F("t2.is_deleted", "dept_deleted")
                ],
                From(
                    ["models.UserModel", "t1"],
                    LeftJoin("models.DeptModel", "t2"),
                    On(["t1.deptId", "=", "t2.id"])
                )
            ),
            "sub"
        ],
        # Join Project Table (for statistics)
        LeftJoin("models.ProjectModel", "t3"),
        On(["sub.uid", "=", "t3.managerId"])
    ),
    Where(
        Q("sub.status", "=", "active") & 
        Q("sub.dept_deleted", "=", False)
    ),
    GroupBy(F("sub.username"), F("sub.dept_name")),
    Having(Q("project_count", ">", 0)),
    OrderBy((F("project_count"), -1)),
    Limit(0, 50)
)
```

## Executing Queries

In business logic, TQL queries can be executed via the `models.services.ModelSvc.previewTData` method to perform complex data query operations.

**Parameter Description:**

*   `tStr` (str): The TQL query string, supporting full TQL syntax such as `Select`, `Join`, `Where`, etc.
*   `limit` (int, optional): The maximum number of records to return. Defaults to 50.

**Return Value:**

Returns the query result set, containing a list of data records that match the conditions.

**Example:**

```python
# Construct TQL query statement (association query for users and departments)
tql = """
Select(
    [F("u.name", "username"), F("d.title", "dept_name")],
    From(["models.UserModel", "u"]),
    LeftJoin("models.DeptModel", "d"),
    On(["u.deptId", "=", "d.id"])
)
"""

# Execute query, get first 50 records
result = app.models.services.ModelSvc.previewTData(tql, limit=50)

# Process query results
for row in result:
    print(f"Username: {row['username']}, Department: {row['dept_name']}")
```
