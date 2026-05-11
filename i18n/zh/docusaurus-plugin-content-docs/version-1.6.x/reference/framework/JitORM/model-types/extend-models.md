---
sidebar_position: 2
slug: extend-models
description: "扩展表模型 API 参考文档。基于多表关联的虚拟视图，支持双向数据操作与事务同步。"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# 扩展表模型

扩展表模型（Extend Model）是基于多个基础模型（物理表）通过预定义关联规则动态生成的虚拟数据视图。它的本质是通过数据库左连接（LEFT JOIN）将多个独立模型的数据按业务逻辑整合为统一的逻辑宽表。

与聚合表模型不同，扩展表模型不仅支持数据查询，还支持**数据的增删改操作**，并内置了跨表事务处理机制，能够自动协调多表间的数据同步。

:::tip 适用场景
✅ **逻辑宽表构建**：无需物理层面的宽表，通过逻辑聚合消除数据割裂，保持数据库范式。<br/>
✅ **复杂关联处理**：自动化处理多层级、链式的 `LEFT JOIN` 关联，屏蔽底层的 SQL 复杂性。<br/>
✅ **跨表事务写入**：提供统一的标准 CRUD 接口，一次调用即可完成多张关联表的原子性写入或更新。<br/>
✅ **统一数据视图**：为前端或下游业务提供扁平化的数据结构，隐藏后端复杂的关系模型。
:::

扩展表模型的分层结构为 Meta（models.Meta）→ Type（models.ExtendType）→ 实例。

## 模型目录结构

每个模型元素使用独立的文件夹，路径规则：`[应用根目录]/models/[模型名称]`

```plaintext
[应用根目录]/models/OrderExtendModel/
├── e.json        # 模型元素的声明文件
├── model.py      # 模型元素的实现文件
└── __init__.py   # 模型元素所在包的初始化文件
```

### e.json 模型声明文件

```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "订单详情扩展模型",
  "type": "models.ExtendType", 
  "functionList": []
}
```

### model.py 实现文件

扩展模型的 `model.py` 定义了字段映射关系和 `Meta` 配置。`Meta.dbTable` 使用[TQL表达式](../TQL)定义了多表之间的左连接逻辑。

以下示例展示了一个链式关联结构：`主表(t1)` → `关联表1(t2)` → `关联表2(t3)`。

```python title="model.py"
from datatypes.Meta import datatypes
from models.ExtendType import ExtendModel

class OrderExtendModel(ExtendModel):
    # --- 字段定义 ---
    
    # 来源：主表 (t1)
    order_id = datatypes.AutoInt(primaryKey=True, title="订单ID")
    order_no = datatypes.Stext(title="订单编号")
    # 定义关联关系，用于写入时自动处理外键
    customer_rel = datatypes.RelateData(
        generic="app.models.CustomerModel",  # 关联模型
        relateField="id"                     # 关联字段
    )
    
    # 来源：关联表1 (t2 - Customer)
    customer_id = datatypes.AutoInt(title="客户ID")
    customer_name = datatypes.Stext(title="客户名称")
    address_rel = datatypes.RelateData(
        generic="app.models.AddressModel",
        relateField="id"
    )
    
    # 来源：关联表2 (t3 - Address)
    address_id = datatypes.AutoInt(title="地址ID")
    full_address = datatypes.Stext(title="详细地址")
    
    # 计算字段（只读）
    full_info = datatypes.Stext(
        title="完整信息", 
        readOnly=1  # 显式标记为只读
    )

    class Meta:
        modelType = "ExtendModel"
        name = 'OrderExtendModel'
        title = '订单详情扩展模型'
        db = "databases.Default"
        
        # TQL 表达式定义多表连接逻辑
        dbTable = """
        Select(
            # 字段映射：F('表别名.原字段', '模型新字段')
            [
                F("t1.id", "order_id"), F("t1.order_no", "order_no"), F("t1.customer_id", "customer_rel"),
                F("t2.id", "customer_id"), F("t2.name", "customer_name"), F("t2.address_id", "address_rel"),
                F("t3.id", "address_id"), F("t3.detail", "full_address"),
                # 表达式字段自动为只读
                F(Formula("CONCAT(t1.order_no, '-', t2.name)"), "full_info")
            ],
            From(
                # 1. 基准表 (t1)
                [Select([F("id"), F("order_no"), F("customer_id")], From(["app.models.OrderModel"])), "t1"],
                
                # 2. 一级连接 (t1 -> t2)
                LeftJoin(
                    Select([F("id"), F("name"), F("address_id")], From(["app.models.CustomerModel"])), 
                    "t2"
                ),
                On([F("t1.customer_id"), "=", F("t2.id")]),
                
                # 3. 二级连接 (t2 -> t3)
                LeftJoin(
                    Select([F("id"), F("detail")], From(["app.models.AddressModel"])), 
                    "t3"
                ),
                On([F("t2.address_id"), "=", F("t3.id")])
            )
        )
        """
```

### \_\_init\_\_.py 初始化文件

```python title="__init__.py"
from .model import OrderExtendModel
```

## 核心功能与配置

扩展表模型的核心在于通过 TQL 构建链式连接结构，并利用系统内置机制处理复杂的数据写入逻辑。

### 动态连接架构 (Chain Connection)

扩展表采用链式扩展模式，支持无限级模型关联。连接规则如下：
1. **基准表 (Base Table)**：`From` 子句中的第一个模型，作为数据的主体。
2. **左连接 (Left Join)**：后续模型通过 `LeftJoin` 挂载到前面的模型上。
3. **字段携带**：子表可以继续作为下一个连接的锚点（如上例中 `t2` 既是 `t1` 的关联表，又是 `t3` 的主表）。

### 字段映射与 RelateData

在 `model.py` 中定义字段时，需要注意以下几点：
*   **字段别名**：`dbTable` 中的 `F("t1.id", "order_id")` 将物理表的 `id` 映射为扩展表的 `order_id`。
*   **RelateData**：如果字段是外键（如 `customer_rel`），**必须**使用 `datatypes.RelateData` 类型。这不仅用于标示关联关系，在执行**写入操作**时，框架会利用此信息自动处理 ID 的回填和传递。

### 字段读写权限说明

并非所有扩展表中的字段都支持编辑。字段的可编辑性取决于其来源和定义方式：

| 字段类型 | 示例 | 可编辑性 | 说明 |
| :--- | :--- | :--- | :--- |
| **直接映射字段** | `F("t2.name", "customer_name")` | ✅ **可编辑** | 直接映射自物理表的普通业务字段，修改时会同步更新到底层物理表。 |
| **外键字段** | `F("t1.customer_id", "customer_rel")` | ✅ **可编辑** | 修改外键值会改变记录的关联关系（例如将订单指派给另一个客户）。 |
| **表达式字段** | `F(Formula("..."), "full_info")` | 🚫 **不可编辑** | 通过计算公式生成的字段无法反向更新，写入时会被忽略或报错。 |
| **显式只读字段** | `readOnly=1` | 🚫 **不可编辑** | 在字段定义中显式设置了 `readOnly=1` 属性的字段。 |
| **关联表主键** | `F("t2.id", "customer_id")` | ⚠️ **受限** | 虽然是被映射的字段，但作为关联表的标识（主键），通常不建议修改，且某些数据库禁止修改主键。 |

:::info 系统行为
当对扩展表执行 `update` 操作时，系统会自动过滤掉**不可编辑**的字段，仅将可编辑字段的变更分发到对应的物理表事务中。
:::

## 数据操作

扩展表模型最大的特性在于支持**写操作**。框架通过解析 TQL 结构，自动将扁平的写入请求拆解为多个物理表的事务操作。

### 数据新增 (Create)

当调用 `create` 方法时，系统采用**逆向级联创建 (Reverse Cascading Creation)** 策略。

**执行流程：**
1. **解析拆分**：将传入的扁平数据拆分为对应 `t1`, `t2`, `t3` 的数据包。
2. **逆向创建**：从最末端模型（如 `t3`）开始创建记录。
3. **ID 传递**：
    *   `t3` 创建成功后，生成的 ID 会自动填充到 `t2` 的外键字段（如 `address_id`）。
    *   `t2` 创建成功后，生成的 ID 会自动填充到 `t1` 的外键字段（如 `customer_id`）。
4. **基准创建**：最后创建基准表 `t1` 的记录。
5. **事务保障**：所有操作在同一个数据库事务中执行，任一环节失败则整体回滚。

**代码示例：**

```python
# 一次性创建三张表的数据
data = {
    "order_no": "ORD20231001",    # t1 字段
    "customer_name": "极态科技",   # t2 字段
    "full_address": "杭州市西湖区"  # t3 字段
}

# 系统会自动按 t3 -> t2 -> t1 的顺序创建，并处理外键关联
# 返回结果包含完整的扩展表记录
new_record = OrderExtendModel.create(data)
```

### 数据修改 (Update)

数据修改遵循类似的逻辑，支持同时更新多张关联表的数据。更新顺序优先处理基准表，确保主键有效性。

**代码示例：**

```python
# 修改订单信息，同时修正客户地址
update_data = {
    "order_id": 1001,             # 主键
    "order_no": "ORD20231001-FIX",
    "full_address": "杭州市余杭区" # 修改 t3 表字段
}

# 自动分发更新请求到对应的物理表
OrderExtendModel(id=1001).update(update_data)
```

### 数据查询 (Query)

查询操作与普通模型一致，底层会自动转换为 SQL 的 `LEFT JOIN` 查询。

```python
# 查询示例：筛选地址含"杭州"且订单号以"ORD"开头的记录
results = OrderExtendModel.query(
    filter="Q(Q('full_address', 'contains', '杭州'), Q.AND, Q('order_no', 'startswith', 'ORD'))",
    fieldList=["order_no", "customer_name", "full_address"]
)
```

## 注意事项

:::warning 开发提示
1. **主键定义**：扩展模型必须指定一个主键（通常映射基准表的主键），否则无法进行更新操作。
2. **空值处理**：由于采用 `LeftJoin`，如果关联表（如 `t2`）没有匹配数据，则 `t2` 和 `t3` 的字段在查询结果中将为 `NULL`。
3. **索引优化**：为了保证查询性能，连接条件中使用的字段（如 `customer_id`, `address_id`）建议在原表中建立索引。
4. **性能考量**：虽然扩展表方便，但过多的级联连接（超过 3-4 层）可能会影响查询性能。对于超大规模数据的复杂报表，建议配合 [聚合表模型](./aggr-models) 使用。
:::
