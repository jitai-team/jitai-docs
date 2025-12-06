---
sidebar_position: 5
slug: TQL
description: "TQL表达式 API 参考文档。完整的规格说明、方法和示例。"
---

# TQL 表达式

TQL（Table Query Language）是一种面向对象的数据查询语言，用于构建基于数据模型的复杂查询。它采用类似于 SQL 的结构，但针对对象模型进行了优化。

本文档基于 TQL 的核心表达式进行详细介绍，包括查询构建、连接操作、集合运算等。

## 核心表达式

### Select

`Select` 是 TQL 的入口表达式，根据参数数量和类型的不同，支持多种查询模式。

**语法**
```python
Select(*args)
```

**常见用法**

1.  **模型全量查询** (单参数)
    直接查询指定模型的所有字段，相当于 `SELECT * FROM table`。
    ```python
    Select("models.UserModel")
    ```

2.  **带别名的全量查询** (双参数)
    指定查询所有字段，并定义主表别名。
    ```python
    Select("*", From(["models.UserModel", "t1"]))
    ```

3.  **指定字段的复杂查询** (多参数)
    这是最常用的模式，第一个参数为字段列表，后续参数为 `From`, `Where`, `OrderBy` 等子句。
    ```python
    Select(
        [F("t1.name", "username"), F("t1.age", "age")],  # 字段列表
        From(["models.UserModel", "t1"]),               # 数据源
        Where(Q("age", ">", 18))                        # 过滤条件
    )
    ```

### F (Field)

`F` 表达式用于定义查询的字段、别名及显示标题。支持字段引用、跨表引用、行内公式及二次计算配置。

**语法**
```python
F(content, alias=None, title=None, twiceCalc=None, **config)
```

*   **content**: 字段标识。可以是：
    *   模型字段路径: `"t1.field_name"`
    *   行内公式: `Formula("SUM(F('amount'))")`
*   **alias**: (可选) 字段别名，用于结果集键名。
*   **title**: (可选) 字段标题，常用于前端显示。
*   **twiceCalc**: (可选) 二次计算配置，用于字段的后处理（如同比环比计算等）。
*   **config**: (可选) 其他配置项，如格式化参数等。

**示例**

```python
# 1. 普通字段
F("name")

# 2. 跨表字段与别名
F("t1.deptId", "dept_id")

# 3. 聚合/公式字段
F(Formula("COUNT(*)"), "total_count", "总数")

# 4. 复杂计算字段
F(Formula("SUM(F('f1')) + AVG(F('f2'))"), "calc_result")

# 5. 带二次计算配置的字段
F("t1.sales", "sales", "销售额", "同比环比", format="currency")
```

### Formula

`Formula` 用于在查询中嵌入计算逻辑，支持行内公式和聚合函数。

**语法**
```python
Formula(expression_string)
```

**示例**
```python
# 数学运算
Formula("F('price') * F('quantity')")

# 聚合函数
Formula("MAX(F('score'))")

# 混合运算
Formula("SUM(F('f1')) + 100 + AVG(F('f2'))")
```

### From

`From` 表达式用于构建查询的数据源上下文，支持单表、子查询以及多表连接。

**语法**
```python
From(primary_table, *join_clauses)
```

**参数规则详解**

:::warning 多表连接限制
TQL **严格限制**单个 `From` 表达式中只能进行**两两连接**。不允许链式连接多个表（例如：`From(T1, Join T2, On..., Join T3, On...)` 是非法的）。

如需连接 3 张或更多表，必须使用**嵌套子查询**。即将前两个表的连接结果（一个 `Select` 表达式）作为下一个连接的主表数据源。
:::

1.  **参数数量**：`From` 表达式接受 1 个参数（仅数据源）或 3 个参数（数据源、Join子句、On子句）。
    *   第 1 个参数：主表（或子查询）。
    *   第 2, 3 个参数：Join 子句 + On 子句。
2.  **Join 配对**：每个 `Join表达式`（LeftJoin/RightJoin等）后必须紧跟一个 `On表达式`。
3.  **位置限制**：
    *   `On表达式` 的前一个参数必须是 `Join表达式`（如果是第一个连接）或上一个 `On表达式`（虽然不常见，通常是 `Join`）。严格来说，是 `Join` 关键字前面的参数是 `Select` 语句或模型名或 `On` 表达式。
    *   `On表达式` 后面（如果不是最后一个参数）只能跟 `Join表达式`（含 `Select` 或模型名）。

**参数格式**
*   **主表/子查询**:
    *   模型引用: `["models.UserModel", "t1"]`
    *   子查询: `[Select(...), "sub_alias"]`
*   **Join 序列**: `LeftJoin(...)`, `On(...)`, `InnerJoin(...)`, `On(...)` ...

**示例**

```python
From(
    # 1. 主表 (参数1)
    ["models.UserModel", "t1"],

    # 2. 左连接部门表 (参数2: Join)
    LeftJoin("models.DeptModel", "t2"),
    # (参数3: On)
    On(["t1.deptId", "=", "t2.id"])
)
```

### Join 家族

TQL 支持多种连接方式，作为 `From` 的参数使用。

*   **LeftJoin(table, alias, title=None)**: 左连接
*   **RightJoin(table, alias, title=None)**: 右连接
*   **InnerJoin(table, alias, title=None)**: 内连接
*   **FullJoin(table, alias, title=None)**: 全连接

**参数说明**
*   **table**: 目标模型路径字符串 或 `Select` 对象（子查询）。（必填）
*   **alias**: 给连接表指定的别名。（必填）
*   **title**: (可选) 连接表的标题说明。

### On

`On` 表达式紧跟在 Join 表达式之后，用于定义连接条件。

**语法**
```python
On(*conditions)
```

*   **conditions**: 一个或多个条件数组，格式为 `[left_field, operator, right_field]`。

**示例**
```python
On(
    ["t1.uid", "=", "t2.uid"],
    ["t1.status", "=", "t2.status"]  # 多条件连接
)
```

### Where

`Where` 表达式用于数据过滤，接受一个或多个 `Q` 表达式。

**语法**
```python
Where(*q_expressions)
```

*   多个参数之间默认为 `AND` 关系。

**示例**
```python
Where(
    Q("age", ">", 18),
    Q("status", "=", "active")
)
```

### Q (Query Condition)

`Q` 表达式用于构建具体的过滤条件，支持逻辑组合和嵌套。

**基本语法**
```python
Q(field_or_q, operator=None, value_or_q=None)
```

**参数形式**
1.  **普通条件**: `Q("field", "operator", "value")`
    *   `operator`: `=`, `>`, `<`, `in`, `like` 等。
2.  **逻辑组合 (显式)**: `Q(Q1, "Q.and", Q2)` 或 `Q(Q1, "Q.or", Q2)`
    *   支持嵌套：`Q(Q(Q1), "Q.or", Q(Q2))`
3.  **逻辑组合 (Python 运算符)**: `Q1 & Q2`, `Q1 | Q2`, `~Q1`

**高级用法**
*   **隐式关联**: `Q("ref_field__name", "=", "Admin")`
    *   *说明*: 使用双下划线 `__` 表示跨表关联。后端会自动解析并添加相应的 LeftJoin 逻辑，前端拼接时无需手动处理 Join，但需注意后端计算会产生额外的 Join 开销。
*   **子查询**: `Q("id", "in", Select(...))`

**示例**
```python
# 简单条件
Q("f1", "=", 1)

# 嵌套组合
Q(Q("f1", ">", 10) | Q("f2", "<", 5))

# 显式逻辑符组合
Q(Q("f1", "=", 1), "Q.or", Q("f2", "=", 2))

# 关联字段过滤
Q("user__dept__name", "=", "Sales")
```

### GroupBy & Having

用于分组统计。

**语法**
```python
GroupBy(*fields)
Having(*q_expressions)
```

**示例**
```python
Select(
    [F("t1.deptId"), F(Formula("COUNT(*)"), "total")],
    From(["models.UserModel", "t1"]),
    GroupBy(F("t1.deptId")),
    Having(Q("total", ">", 100))  # 过滤分组结果
)
```

### OrderBy

用于排序。

**语法**
```python
OrderBy(*sort_items)
```

**示例**
```python
OrderBy(
    (F("create_time"), -1),  # -1: 降序
    (F("name"), 1)           # 1: 升序
)
```

### Limit

用于分页限制。

**语法**
```python
Limit(offset, limit)
```

**示例**
```python
Limit(0, 20)  # 偏移0，取20条
```

## 集合操作 (Union)

TQL 支持 `Union` (去重并集) 和 `UnionAll` (全量并集) 操作。

**语法**
```python
Union(*queries, mapping)
```

*   **queries**: 多个 `[Select对象, 别名]` 组成的列表。
*   **mapping**: 结果集字段映射定义。

**映射规则**
mapping 是一个二维数组，每一项定义一个输出字段：
`[target_field_name, source_fields_list, title]`
*   `target_field_name`: 合并后的结果字段名。
*   `source_fields_list`: 对应每个子查询中的来源字段名列表（顺序需与 queries 一致）。若某子查询无此字段，可占位或省略（视具体实现而定，通常需对应）。
*   `title`: 字段标题。

**示例**

```python
Union(
    # 子查询 1
    [Select([F("f1"), F("f2")], From(["models.ModelA"])), "t1"],
    # 子查询 2
    [Select([F("f3"), F("f4")], From(["models.ModelB"])), "t2"],
    # 映射关系
    [
        ["name", ["t1.f1", "t2.f3"], "User Name"],  # t1.f1 和 t2.f3 映射为 name
        ["age",  ["t1.f2", "t2.f4"], "User Age"]    # t1.f2 和 t2.f4 映射为 age
    ]
)
```

## 完整示例

以下是一个包含子查询、关联、聚合和过滤的完整 TQL 示例：

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
        # 关联项目表（统计用）
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

## 执行查询

在业务逻辑中，可以通过`models.services.ModelSvc.previewTData`方法执行TQL查询，实现复杂的数据查询操作。

**参数说明：**

tStr (str): TQL查询语句字符串，支持Select、Join、Where等完整TQL语法
limit (int, 可选): 返回结果的最大记录数，默认值为50条

**返回值：**

返回查询结果集，包含符合条件的数据记录列表

**示例：**
```python
# 构建TQL查询语句（用户与部门的关联查询）
tql = """
Select(
    [F("u.name", "username"), F("d.title", "dept_name")],
    From(["models.UserModel", "u"]),
    LeftJoin("models.DeptModel", "d"),
    On(["u.deptId", "=", "d.id"])
)
"""

# 执行查询，获取前50条记录
result = app.models.services.ModelSvc.previewTData(tql, limit=50)

# 处理查询结果
for row in result:
    print(f"用户名: {row['username']}, 部门: {row['dept_name']}")
```