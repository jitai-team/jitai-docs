---
sidebar_position: 5
slug: TQL
---

# TQL使用指南
TQL即Table Query Language，用于构建面向数据模型的数据查询语法，其中查询条件使用[Q表达式](./q-expressions)。

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

## 使用TQL查询数据

在业务逻辑中，可以通过模型服务的 `previewTData` 方法执行TQL查询语句，实现复杂的数据查询操作。

#### 方法签名
```python
@classmethod
def previewTData(cls, tStr, limit=50)
```

该方法使用TQL（Table Query Language）语句进行复杂查询，支持多表联查、条件筛选、字段映射等高级查询功能。

**参数说明：**
- `tStr` (str): TQL查询语句字符串，支持Select、Join、Where等完整TQL语法
- `limit` (int, 可选): 返回结果的最大记录数，默认值为50条

**返回值：**
- 返回查询结果集，包含符合条件的数据记录列表

**使用示例：**
```python
# 1. 获取模型服务元素
modelSvc = app.getElement("models.services.ModelSvc")

# 2. 构建TQL查询语句（用户与部门的关联查询）
tql = """
Select(
    [F("u.name", "username"), F("d.title", "dept_name")],
    From(["UserModel", "u"]),
    LeftJoin("DeptModel", "d"),
    On(["u.deptId", "=", "d.id"])
)
"""

# 3. 执行查询，获取前50条记录
result = modelSvc.previewTData(tql, limit=50)

# 4. 处理查询结果
for row in result:
    print(f"用户名: {row['username']}, 部门: {row['dept_name']}")
```

**另一种查询方式：**

除了使用模型服务的 `previewTData` 方法外，还可以通过 `Select.getTQLByString` 方法直接解析TQL字符串并执行查询：

```python
from models.Meta import Select

# 1. TQL查询语句字符串
tStr = """
Select(
    [F("u.name", "username"), F("d.title", "dept_name")],
    From(["UserModel", "u"]),
    LeftJoin("DeptModel", "d"),
    On(["u.deptId", "=", "d.id"])
)
"""

# 2. 将TQL字符串解析为TQL对象
tql = Select.getTQLByString(tStr)

# 3. 通过数据库直接执行查询（返回原始数据）
rowDataList = tql.database.query(tql)

# 4. 处理查询结果
for row in rowDataList:
    print(f"用户名: {row['username']}, 部门: {row['dept_name']}")
```

:::tip 使用提示
- TQL查询语句支持Python多行字符串格式，便于编写复杂的查询逻辑
- `limit` 参数可以有效控制返回数据量，避免大数据集影响性能
- 查询结果中的字段名由 `F()` 函数的第二个参数指定（别名）
- 建议在生产环境中根据实际业务需求合理设置 `limit` 值
- 使用 `Select.getTQLByString` 方式适合需要直接控制数据库查询的场景，可以获得更灵活的查询控制
- `previewTData` 方法更适合快速数据预览和测试场景，而 `database.query` 方法更适合生产环境的复杂查询
- **重要**：`database.query` 方法返回的是数据库原始数据，而 `previewTData` 会对数据进行额外的处理和格式化
:::

:::warning 注意事项
- TQL查询语句必须符合正确的语法格式，否则会抛出异常
- 模型名称（如"UserModel"、"DeptModel"）必须是已定义的数据模型
- 字段名必须与模型中定义的字段名称一致
- 关联条件（On子句）中的字段必须确保数据类型匹配
- 使用 `database.query` 方法时，需要确保数据库连接可用
- **性能警告**：如果TQL查询语句中没有设置 `Limit` 子句，`tql.database.query(tql)` 会返回所有符合条件的数据。当数据量大时会严重影响性能和内存占用，强烈建议在查询时添加 `Limit` 子句来限制返回的数据量
:::