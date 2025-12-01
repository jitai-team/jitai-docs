---
sidebar_position: 1
slug: aggr-models
description: "聚合表模型 API 参考文档。完整的规格说明、方法和示例。"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# 聚合表模型

聚合表模型不直接对应数据库中的单一表结构，而是通过灵活的配置将多个数据表模型进行关联、合并和计算，最终生成满足特定业务需求的虚拟数据表。它类似于数据库的视图，但区别在于无需在数据库中创建实际的视图对象，完全由应用层动态处理。

:::tip 适用场景
✅ **复杂数据聚合与统计**：支持多维度、多指标的数据分组汇总与计算，满足各类报表与看板需求。<br/>
✅ **多源数据融合**：能够将分散在不同表或异构数据源中的数据进行关联与合并，构建统一的数据视图。<br/>
✅ **多级数据透视**：支持基于聚合结果的二次计算与多层级嵌套，实现从汇总到明细的数据穿透。<br/>
✅ **跨业务域整合**：打破业务模块间的数据隔离，灵活组装跨部门、跨领域的核心业务数据。<br/>
:::

聚合表模型的分层结构为 Meta（models.Meta）→ Type（models.AggrType）→ 实例。

## 模型目录结构

每个模型元素使用独立的文件夹，路径规则：`[应用根目录]/models/[模型名称]`

```plaintext
[应用根目录]/models/SalesAnalysisModel/
├── e.json        # 模型元素的声明文件
├── model.py      # 模型元素的实现文件
└── __init__.py   # 模型元素所在包的初始化文件
```

### e.json 模型声明文件

```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "销售分析聚合模型",
  "type": "models.AggrType", 
  "functionList": []
}
```

### model.py 实现文件

聚合模型的 `model.py` 主要由字段定义和 `Meta` 配置组成。`Meta` 中的 `dbTable` 属性存储 TQL（Transit Query Language）表达式，定义了数据的聚合逻辑。

```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class SalesAnalysisModel(AggrModel):
    # 定义聚合后的输出字段
    region = datatypes.Stext(name="region", title="销售大区")
    total_sales = datatypes.Numeric(name="total_sales", title="销售额总和")
    
    class Meta:
        modelType = "AggrType"
        name = 'SalesAnalysisModel'
        title = '销售分析聚合模型'
        db = "databases.Default"
        # TQL 表达式定义聚合逻辑
        dbTable = """
        Select(
            [F('region', 'region'), F(Formula("COLSUM(F('amount'))"), 'total_sales')],
            From(["sales_data"]),
            GroupBy(F("region"))
        )
        """
```

聚合表模型的字段配置及 Meta 配置结构与数据表模型基本一致。唯一的区别在于，数据表模型中 Meta.dbTable 的值对应数据库中的表名，而聚合表模型中该值则是一个 [TQL 表达式](../TQL)。

### \_\_init\_\_.py 初始化文件

```python title="__init__.py"
from .model import SalesAnalysisModel
```

## 核心功能与配置

聚合表模型的核心在于 `Meta` 类中的 `dbTable` 配置，通过编写 TQL 表达式实现分组聚合、追加合并和横向连接等复杂操作。

### 分组聚合 (Group Aggregation)

基于指定维度字段对数据进行分类统计，生成汇总结果集。适用于生成统计报表。

**配置示例：**

```python
class SalesGroupModel(AggrModel):
    region = datatypes.Stext(name="region", title="销售大区")
    total_sales = datatypes.Numeric(name="total_sales", title="销售额总和")

    class Meta:
        dbTable = """
        Select(
            # 字段映射：F('原字段', '新字段别名')
            [F('region', 'region'), F(Formula("COLSUM(F('amount'))"), 'total_sales')],
            From(["sales_data"]),
            GroupBy(F("region"))  # 按区域分组
        )
        """
```

**统计公式示例：**
- `Formula("COLSUM(F('field'))")`: 求和
- `Formula("COLMAX(F('field'))")`: 最大值
- `Formula("COUNT_DISTINCT(F('field'))")`: 去重计数

详细语法请参考 [计算公式文档](../formula)。


### 追加合并 (Union Merge)

将多个结构相似的数据表按行纵向合并，适用于合并分表数据（如各分公司报表、多月份数据归档）。

- **UnionAll**: 普通追加，保留所有记录行（性能高）。
- **Union**: 去重追加，自动去除完全重复的行（性能较低）。

**配置示例：**

```python
class SalesUnionModel(AggrModel):
    order_id = datatypes.Numeric(name="order_id", title="订单ID")
    amount = datatypes.Numeric(name="amount", title="金额")

    class Meta:
        dbTable = """
        Select(
            [F("order_id"), F("amount")],
            From(
                [Union(    # 使用 UnionAll 则不去重
                    [Select([F("id")], From(["north_sales"])), "t1"],  # 子表1
                    [Select([F("order_no")], From(["south_sales"])), "t2"],  # 子表2
                    # 字段映射与转换
                    [["order_id", ["t1.id"], "ID映射"], 
                     ["amount", ["t2.price"], "金额转换"]]
                ), "union_t"]
            )
        )
        """
```

### 横向连接 (Horizontal Join)

通过关键字段关联多表数据行，支持以下几种连接方式：

- **LeftJoin (左连接)**: 返回左表的所有记录，以及右表中匹配的记录。如果右表中没有匹配，则结果为 NULL。
- **RightJoin (右连接)**: 返回右表的所有记录，以及左表中匹配的记录。如果左表中没有匹配，则结果为 NULL。
- **InnerJoin (内连接)**: 仅返回左表和右表中都有匹配的记录。
- **FullJoin (全连接)**: 返回左表和右表中的所有记录。如果某侧没有匹配，则该侧结果为 NULL。

**配置示例：**

```python
class OrderJoinModel(AggrModel):
    order_id = datatypes.Numeric(name="order_id", title="订单ID")
    customer_name = datatypes.Stext(name="customer_name", title="客户名称")

    class Meta:
        dbTable = """
        Select(
            [F("orders.id", "order_id"), F("customers.name", "customer_name")],
            From(
                ["main.orders", "o"],  # 主表
                LeftJoin("main.customers", "c"),  # 关联表
                On([F("o.customer_id"), "=", F("c.id")])  # 连接条件
            )
        )
        """
```

:::warning 注意事项
1. **索引依赖**：为了保证查询性能，连接条件中使用的字段（如 `customer_id`）**强烈建议**在原表中建立索引。
2. **字段别名**：当多个表中有重名字段时（如 `id`, `name`），必须在 `Select` 中使用别名区分，例如 `F("orders.name", "order_name")`。
3. **性能控制**：横向连接会显著增加内存消耗，建议关联表的数量不超过 3 个。如果数据量极大，建议优先考虑使用 ETL 或 数仓 方案。
:::

## 模型函数

聚合表模型支持大部分数据查询类函数，但**不支持** `save`, `delete`, `create`, `update` 等直接修改数据的操作。

### 模型内置函数 {#model-built-in-functions}

#### query - 分页查询
```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None)
```

查询聚合后的数据，支持筛选、排序和分页。

**参数说明：**
- `filter`: Q 表达式筛选条件（可选），如 `"Q('age', '>', 18)"`
- `fieldList`: 指定返回字段列表（可选）
- `orderList`: 排序规则，例如：`[["total_sales", -1]]`
- `page`: 页码（默认 1）
- `size`: 每页记录数（默认 20）

**使用示例：**
```python
# 查询2023年华东区的销售数据
result = SalesAggrModel.query(
    filter="Q(Q('year', '=', 2023), Q.AND, Q('region', 'in', ['华东','华南']))",
    fieldList=["product", "total_sales"],
    orderList=[["total_sales", -1]],
    page=1,
    size=50
)
```

#### get - 获取单条数据
```python
@classmethod
def get(cls, filter, orderList=None) -> RowData
```

获取满足条件的第一条聚合数据。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `orderList`: 排序规则

**使用示例：**
```python
# 获取金额最大的一笔订单
max_order = OrdersAggrModel.get(
    filter="Q('amount', '>', 100000)",
    orderList=[["amount", -1]]
)
```

#### statisticFieldData - 字段统计
```python
@classmethod
def statisticFieldData(cls, filter, fieldAggrMap)
```

对聚合后的结果集再次进行统计计算。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `fieldAggrMap`: 字段聚合映射，如：`{"total_sales": "SUM"}`

**使用示例：**
```python
# 统计Q4季度的总销售额和平均单价
stats = SalesAggrModel.statisticFieldData(
    filter="Q('quarter', '=', 'Q4')",
    fieldAggrMap={
        "total_sales": "SUM",
        "average_price": "AVG",
        "max_volume": "MAX"
    }
)
```

## 高级功能

### 多层聚合与嵌套

聚合表模型支持分层计算，可以将一个聚合模型的结果作为另一个聚合模型的输入（From 子句中引用另一个模型或子查询）。

**示例：**

阶段1模型：先按日期+产品分组统计

```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class DailySalesModel(AggrModel):
    sale_date = datatypes.Date(name="sale_date", title="销售日期")
    product_id = datatypes.Integer(name="product_id", title="产品ID")
    daily_sales = datatypes.Numeric(name="daily_sales", title="日销售额")

    class Meta:
        modelType = "AggrType"
        name = 'DailySalesModel'
        title = '日销售统计模型'
        db = "databases.Default"
        dbTable = """
        Select(
            [F("sale_date"), F("product_id"), F(Formula("SUM(amount)"), "daily_sales")],
            From("sales.OrderModel"),
            GroupBy("sale_date", "product_id")
        )
        """
```

# 阶段2模型：基于阶段1的结果，二次聚合按月份统计
```python title="model.py"
from datatypes.Meta import datatypes
from models.AggrType import AggrModel

class MonthlySalesModel(AggrModel):
    month = datatypes.Integer(name="month", title="月份")
    product_id = datatypes.Integer(name="product_id", title="产品ID")
    monthly_sales = datatypes.Numeric(name="monthly_sales", title="月销售额")

    class Meta:
        modelType = "AggrType"
        name = 'MonthlySalesModel'
        title = '月度销售统计模型'
        db = "databases.Default"
        
        # From 中直接引用阶段1的模型名称
        dbTable = """
        Select(
            [F(Formula("MONTH(sale_date)"), "month"), F("product_id"), F(Formula("SUM(daily_sales)"), "monthly_sales")],
            From("models.DailySalesModel"),
            GroupBy("month", "product_id")
        )
        """
```