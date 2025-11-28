---
sidebar_position: 4
slug: q-expressions
title: "Q Expressions Reference"
description: "Q Expressions Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Q Expressions"
---

# Q Expressions

Q Expressions (Query Expressions) are used to construct query conditions for data models. They provide a structured way to express complex query logic, supporting various operators and logical combinations.

## Basic Rules

The basic construction rules for Q Expressions are as follows:

- **Basic Format**: `Q(<fieldId>, <operator>, <value>)`
  - `fieldId`: Field identifier (string), supports related fields (e.g., `customer__custName`)
  - `operator`: Operator (string)
  - `value`: Comparison value

- **Note**: When passing a single condition query as a parameter, it must be wrapped in an outer `Q()`.
  - Example: `Q(Q('age', '>', 18))`

- **Logical Connection**: Use `Q.AND` and `Q.OR` to connect multiple Q expressions.
  - Format: `Q(Q1, <Logic>, Q2)`

## Operator Details

### Comparison Operators

| Operator | Description | Example |
|---|---|---|
| `=` | Equal to | `Q('age', '=', 18)` |
| `!=`, `ne` | Not equal to | `Q('age', '!=', 18)` |
| `>`, `gt` | Greater than | `Q('age', '>', 18)` |
| `>=`, `gte` | Greater than or equal to | `Q('age', '>=', 18)` |
| `<`, `lt` | Less than | `Q('age', '<', 18)` |
| `<=`, `lte` | Less than or equal to | `Q('age', '<=', 18)` |

### Inclusion Operators

| Operator | Description | Example |
|---|---|---|
| `in` | In list | `Q('status', 'in', ['active', 'pending'])` |
| `nin` | Not in list | `Q('status', 'nin', ['deleted'])` |

### Fuzzy Matching

| Operator | Description | Example |
|---|---|---|
| `like` | Contains | `Q('name', 'like', 'John')` |
| `nlike` | Does not contain | `Q('name', 'nlike', 'Test')` |
| `startswith` | Starts with | `Q('code', 'startswith', 'A')` |
| `endswith` | Ends with | `Q('code', 'endswith', 'X')` |
| `likeany` | Contains any | `Q('tags', 'likeany', ['A', 'B'])` |
| `nlikeany` | Does not contain any | `Q('tags', 'nlikeany', ['X', 'Y'])` |

### Null Value Check

| Operator | Description | Value Explanation | Example |
|---|---|---|---|
| `isnull` | Is null | `1` (Null), `0` (Not Null) | `Q('remark', 'isnull', 1)` |

### Range Query

| Operator | Description | Example |
|---|---|---|
| `range` | Range interval | `Q('age', 'range', [18, 30])` |

### Special Operators

| Operator | Description | Example/Format |
|---|---|---|
| `belong` | Belonging relationship | `Q('address', 'belong', {"province": "Beijing"})` |
| `nbelong` | Non-belonging relationship | `Q('address', 'nbelong', {"province": "Shanghai"})` |
| `year` | Year matching | `Q('createTime', 'year', 2023)` |
| `month` | Month matching | `Q('createTime', 'month', 10)` |
| `week` | Week matching | `Q('createTime', 'week', 40)` |
| `day` | Day matching | `Q('createTime', 'day', 1)` |
| `province` | Province matching | `Q('address', 'province', 'Guangdong')` |
| `city` | City matching | `Q('address', 'city', 'Shenzhen')` |
| `district` | District matching | `Q('address', 'district', 'Nanshan District')` |

## Examples

### Basic Queries

```javascript
// Age greater than 18
Q('age', 'gt', 18)

// Status is in the list
Q('status', 'in', ['active', 'pending'])

// Fuzzy match name
Q('name', 'like', 'John')

// Check if field is null
Q('remark', 'isnull', 1)
```

### Related Queries

Supports accessing fields of related objects via the `__` symbol.

```javascript
// Query records where the related customer's name is John
Q('customer__custName', '=', 'John')
```

### Complex Object Queries

```javascript
// Address belonging query
Q('address', 'belong', {
    "province": "Beijing",
    "city": "",
    "district": ""
})
```

### Combined Condition Queries

Use `Q.AND` and `Q.OR` for logical combinations.

```javascript
// AND combination: Age > 18 AND Age < 30
Q(Q('age', 'gt', 18), Q.AND, Q('age', 'lt', 30))

// Complex combination: (Age > 18 AND Age < 30) OR Is VIP
Q(
    Q(Q('age', 'gt', 18), Q.AND, Q('age', 'lt', 30)),
    Q.OR,
    Q('vip', '=', 1)
)
```

## Practical Usage Examples

Q expressions are typically passed as parameters to data model methods for filtering data.

### Query List (Query)

```javascript
// Basic condition query (Note: Single condition must be wrapped in Q())
const users = await UserModel.query(
    Q(Q('status', '=', 'active')),
    null,
    null,
    1,
    20
);

// Complex combined condition query
const result = await OrderModel.query(
    Q(Q('amount', 'gt', 100), Q.AND, Q('createTime', 'year', 2023)),
    null,
    null,
    1,
    20
);
```

### Get Single Record (Get)

```javascript
// Get user by email
const user = await UserModel.get(Q(Q('email', '=', 'test@example.com')));

// Get the most recent pending order
const order = await OrderModel.get(Q(Q('status', '=', 'pending')));
```

### Batch Update (Update)

```javascript
// Update status to 'out_of_stock' for all products with low stock
await ProductModel.updateByFilter(
    Q(Q('stock', 'lt', 10)),
    { status: 'out_of_stock' }
);
```

### Batch Delete (Delete)

```javascript
// Delete expired temporary data
await TempDataModel.deleteByFilter(
    Q(Q('expireTime', 'lt', '2024-01-01'))
);
```
