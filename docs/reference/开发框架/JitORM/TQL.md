---
sidebar_position: 5
---

# TQL使用指南

TQL即Table Query Language，用于构建面向数据模型的数据查询语法，其中查询条件使用[Q表达式](./Q表达式)。

## 基本查询

### 简单查询
```plaintext
# 查询所有字段
Select("models.UserModel")

# 查询指定字段
Select(
    [F("t1.f1", "f1"), F("t1.f2", "f2")],
    From(["models.UserModel", "t1"])
)
```

### 条件查询
```plaintext
# 单条件查询
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Where(Q("f1", ">", 1))
)

# 多条件组合查询
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Where(Q("f1", ">", 1) & Q("f2", "=", "test"))
)
```

## 关联查询

### 左连接
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

### 多表关联
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

## 排序和分页

### 排序
```plaintext
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    OrderBy((F("f1"), 1))  # 1表示升序，-1表示降序
)
```

### 分页
```plaintext
Select(
    [F("t1.f1", "f1")],
    From(["models.UserModel", "t1"]),
    Limit(0, 20)  # 从第0条开始，返回20条数据
)
```

## 聚合查询

### 分组查询
```plaintext
Select(
    [F("t1.f1", "f1"), F("COUNT(*)", "count")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("f1"))
)
```

### 分组过滤
```plaintext
Select(
    [F("t1.f1", "f1"), F("COUNT(*)", "count")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("f1")),
    Having(Q("count", ">", 1))
)
```

## 联合查询

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

## 数据操作

### 插入数据
```plaintext
Insert(
    "models.UserModel",
    [
        {"f1": "value1", "f2": "value2"},
        {"f1": "value3", "f2": "value4"}
    ]
)
```

### 更新数据
```plaintext
Update(
    "models.UserModel",
    {"f1": "new_value"},
    Q("f2", "=", "old_value")
)
```

### 删除数据
```plaintext
Delete(
    "models.UserModel",
    Q("f1", "=", "value")
)
``` 