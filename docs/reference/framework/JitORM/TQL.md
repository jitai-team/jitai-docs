---
sidebar_position: 5
slug: TQL
---

# TQL Usage Guide
TQL, also known as Table Query Language, is used to build data query syntax for data models, where query conditions use [Q Expressions](./q-expressions).

## Basic Queries
### Simple Queries
```plaintext
# Query all fields
Select("models.UserModel")

# Query specified fields
Select(
    [F("t1.f1", "f1"), F("t1.f2", "f2")],
    From(["models.UserModel", "t1"])
)
```

### Conditional Queries
```plaintext
# Single condition query
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Where(Q("f1", ">", 1))
)

# Multi-condition combined query
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Where(Q("f1", ">", 1) & Q("f2", "=", "test"))
)
```

## Join Queries
### Left Join
```plaintext
Select(
    [
        F("t1.userId", "userId"),
        F("t2.deptId", "deptId")
    ],
    From(
        ["models.UserModel", "t1"],
        LeftJoin("models.DeptMemberModel", "t2"),
        On(["t1.userId", "=", "t2.userId"])
    )
)
```

### Multi-table Joins
```plaintext
Select(
    [
        F("t1.userId", "userId"),
        F("t2.deptId", "deptId"),
        F("t3.deptTitle", "deptTitle")
    ],
    From(
        ["models.UserModel", "t1"],
        LeftJoin("models.DeptMemberModel", "t2"),
        On(["t1.userId", "=", "t2.userId"]),
        LeftJoin("models.DeptModel", "t3"),
        On(["t2.deptId", "=", "t3.deptId"])
    )
)
```

## Sorting and Pagination
### Sorting
```plaintext
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    OrderBy((F("f1"), 1))  # 1 means ascending, -1 means descending
)
```

### Pagination
```plaintext
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Limit(0, 20)  # Start from 0th record, return 20 records
)
```

## Aggregate Queries
### Group Queries
```plaintext
Select(
    [F("t1.f1", "f1"), F("COUNT(*)", "count")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("f1"))
)
```

### Group Filtering
```plaintext
Select(
    [F("t1.f1", "f1"), F("COUNT(*)", "count")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("f1")),
    Having(Q("count", ">", 1))
)
```

## Union Queries
### UNION
```plaintext
Union(
    [Select([F("f1"), F("f2")], From(["models.UserModel1"])), "t1"],
    [Select([F("f3"), F("f4")], From(["models.UserModel2"])), "t2"],
    [
        ["f1", ["t1.f1", "t2.f3"], "title"],
        ["f2", ["t1.f2", "t2.f4"], "title"]
    ]
)
```

### UNION ALL
```plaintext
UnionAll(
    [Select([F("f1"), F("f2")], From(["models.UserModel1"])), "t1"],
    [Select([F("f3"), F("f4")], From(["models.UserModel2"])), "t2"],
    [
        ["f1", ["t1.f1", "t2.f3"], "title"],
        ["f2", ["t1.f2", "t2.f4"], "title"]
    ]
)
```

## Data Operations
### Insert Data
```plaintext
Insert(
    "models.UserModel",
    [
        {"f1": "value1", "f2": "value2"},
        {"f1": "value3", "f2": "value4"}
    ]
)
```

### Update Data
```plaintext
Update(
    "models.UserModel",
    {"f1": "new_value"},
    Q("f2", "=", "old_value")
)
```

### Delete Data
```plaintext
Delete(
    "models.UserModel",
    Q("f1", "=", "value")
)
```