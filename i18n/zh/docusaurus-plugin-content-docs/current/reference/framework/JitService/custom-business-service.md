---
sidebar_position: 1
slug: custom-business-service
description: "自定义业务服务 API 参考文档。完整的规格说明、开发规范和标准模板。"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# 自定义业务服务

服务元素是 JitAI 平台中负责业务逻辑处理的核心组件，用于封装数据处理、业务计算和系统交互逻辑。

服务元素的分层结构为 Meta（services.Meta）→ Type（services.NormalType）→ 实例。开发者可通过 JitAI 的可视化开发工具快捷创建服务实例，也可以手动编写代码实现复杂的业务逻辑。

## 服务目录结构

每个服务元素使用独立的文件夹，路径规则：`[应用根目录]/services/[服务名称]`

```plaintext
[应用根目录]/services/MyBusinessService/
├── e.json        # 服务元素的声明文件
├── service.py    # 服务元素的实现文件
└── __init__.py   # 服务元素所在包的初始化文件
```

### e.json 服务声明文件

用于定义服务的元数据、函数签名及参数配置。在此处声明的函数，需要在 `service.py` 中进行具体实现。

```json title="e.json"
{
  "title": "我的业务服务",
  "type": "services.NormalType",
  "backendBundleEntry": ".",
  "functionList": [
    {
      "name": "calculateTotal",
      "title": "计算总价",
      "args": [
        {
          "name": "amount",
          "title": "金额",
          "dataType": "Numeric"
        },
        {
          "name": "discount",
          "title": "折扣率",
          "dataType": "Numeric"
        }
      ],
      "returnType": "Numeric",
      "argsToDatatype": 1
    }
  ]
}
```

#### e.json 配置项

| 属性 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | String | 是 | 服务标题，显示在开发工具中 |
| `type` | String | 是 | 固定值 `"services.NormalType"` |
| `functionList` | Array | 否 | 服务函数定义列表 |
| `eventDescs` | Array | 否 | [自定义事件](#event-definition-and-usage) |

##### functionList 函数定义

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `name` | String | 函数名，需与 py 文件中方法名一致 |
| `title` | String | 函数标题 |
| `args` | Array | 参数列表 |
| `returnType` | String | 返回值类型 (如 Stext, Numeric, RowData 等) |
| `argsToDatatype`| Integer| **推荐设为 1**。自动将入参转为 datatypes 对象 |

##### args 参数定义

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `name` | String | 参数名 |
| `dataType` | String | 参数数据类型 |
| `generic` | String | 泛型配置（针对 List/Map/RowData） |


### service.py 实现文件

`service.py` 是服务逻辑的载体。**`e.json` 中 `functionList` 声明的每一个函数，都必须在 `service.py` 的服务类中有一个同名的成员函数实现。**

```python title="service.py"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from services.NormalType import NormalService

class MyBusinessService(NormalService):
    def calculateTotal(self, amount, discount):
        # 定义返回变量
        result = datatypes.Numeric.new({"title": "结果"}, 0)
        
        # 业务逻辑计算 (使用公式函数，而非原生运算符)
        # result = amount * (1 - discount)
        temp = datatypes.Numeric.new({}, (SUB(1, discount.value)))
        result.value = (MUL(amount.value, temp.value))
        
        return result.value
```

### \_\_init\_\_.py 初始化文件

```python title="__init__.py"
# -*-coding:utf-8-*-
from .service import MyBusinessService
```

## 服务开发规范

在编写 `service.py` 时，必须遵循 JitAI 的特定开发规范，以确保服务在运行时平台中正确执行。

### 变量声明与赋值

为了确保**全代码开发**和**可视化开发**之间的无缝切换，**强烈建议**所有变量均使用 [Jit数据类型](../JitORM/data-types) 对象进行封装。**使用 Python 原生类型（如 `int`, `str`, `dict`）编写的逻辑虽然可以正常运行，但这些变量将无法在可视化开发界面中显示和操作。**

**声明格式：**
`变量 = datatypes.<类型>.new(<配置字典>, <初始值>)`

```python
# 1. 基础类型
count = datatypes.Numeric.new({"title": "计数"}, 0)
name = datatypes.Stext.new({"title": "名称"}, "JitAI")

# 2. 字典/对象 (JitDict)
# variableList 描述字典内部结构
result = datatypes.JitDict.new({
    "variableList": [
        {"name": "code", "dataType": "Numeric"},
        {"name": "msg", "dataType": "Stext"}
    ]
}, {"code": 200, "msg": "success"})

# 3. 动态映射 (JitMap)
# generic 描述 Value 的类型
provinceMap = datatypes.JitMap.new({
    "generic": "Numeric",
    "valueConfig": {"dataType": "Numeric"}
}, {})

# 4. 列表 (JitList)
nameList = datatypes.JitList.new({
    "generic": "Stext"
}, [])

# 5. 模型数据行 (RowData)
user = datatypes.RowData.new({
    "generic": "models.UserModel"
}, {})
```

**赋值与取值：**
- **赋值**：使用 `.value` 属性（Address 等复合类型除外）。
- **取值**：使用 `.value` 获取原始值用于计算。

```python
# 赋值
variable.value = 100
varA.value = varB.value

# 公式赋值（必须使用括号包裹公式函数）
total.value = (SUM(price.value, tax.value))
```

**所有变量必须用 `datatypes.*.new` 包装，配置不能为空**。`datatypes.*.new` 的第一个参数（配置字典）不能为空，特别是容器类型（JitDict, JitMap, JitList, RowData, RowList）必须指定泛型（generic）或结构定义。

| 类型 | 必需配置 | 示例 |
|------|----------|------|
| JitDict | `variableList` 不能为空 | `{"variableList": [{"name": "x", "title": "X ,"dataType": "Numeric"}]}` |
| JitMap | `valueConfig`和`generic` 不能为空 | `{"generic": "Numeric", "valueConfig": {"dataType": "Numeric"}}` |
| JitList | `generic` 和 `variableConfig` | `{"generic": "JitDict"，"variableConfig": {"dataType": "JitDict", "variableList": [{"name": "x", "title": "X, "dataType": "Numeric"}]}}` |
| RowData/RowList | `generic` 不能为空 | `{"generic": "models.CustomerModel"}` |

**变量用法建议**
    不建议将对象的属性赋值给临时变量后再使用，直接使用完整路径即可。
*   ❌ `prov = item.fc02.province; map.set(prov, ...)`
*   ✅ `map.set(item.fc02.province, ...)`

### 逻辑控制与运算

**强烈推荐使用 `datatypes` 提供的对象方法或[公式函数](../JitORM/formula)**进行业务对象的比较和计算。

虽然使用 Python 原生运算符（如 `+`, `-`, `>`, `==` 等）编写的代码在运行时通常也能正常工作，但**这类代码逻辑无法被 JitAI 的可视化开发工具解析和展示**，会导致该服务函数无法在可视化界面中进行后续的查看和编辑。

| 操作 | ❌ 不推荐 (原生运算符) | ✅ 推荐 (JitAI API) | 说明 |
| :--- | :--- | :--- | :--- |
| **比较** | `if age > 18:` | `if age.gt(18):` | 可视化兼容 |
| **相等** | `if status == 1:` | `if status.isEqual(1):` | 可视化兼容 |
| **判空** | `if name is None:` | `if name.isNull():` | 可视化兼容 |
| **非空** | `if name:` | `if name.isNotNull():` | 可视化兼容 |
| **加法** | `sum = a + b` | `sum.value = (SUM(a.value, b.value))` | 需导入公式函数 |
| **拼接** | `str = "Hello" + name` | `str.value = (CONCAT("Hello", name.value))` | 需导入公式函数 |

**常用判断方法：**
- `.gt(val)`: 大于 (Greater Than)
- `.gte(val)`: 大于等于 (Greater Than or Equal)
- `.lt(val)`: 小于 (Less Than)
- `.lte(val)`: 小于等于 (Less Than or Equal)
- `.isEqual(val)`: 等于
- `.notEqual(val)`: 不等于
- `.isNull()`: 为空
- `.isNotNull()`: 不为空

### 循环遍历

遍历列表（如查询结果）时，直接迭代 `RowList` 或 `JitList` 对象。

```python
# result.rowDatas 是一个 RowList
for item in result.rowDatas:
    # 直接访问字段
    if item.age.gt(60):
        item.category.value = "Senior"
        item.save()
```

### 函数入参与返回规范

**1. 入参处理**
当服务函数被调用时，系统会根据 `e.json` 中的配置处理入参：
*   **作为被调用方（定义函数时）**：无论调用方传入的是原始值还是对象，函数内部接收到的参数**始终是 `datatypes` 对象**（前提是 `e.json` 中配置了 `"argsToDatatype": 1`）。开发者应直接把入参当作对象处理。
*   **作为调用方（调用其他函数时）**：调用其他服务函数时，既可以传递 `datatypes` 对象，也可以传递原始值（如 `100`, `"test"`）。系统会自动将原始值封装为对应的 `datatypes` 对象。

**2. 返回值规范**
为了保持接口的通用性，服务函数**建议返回原始值**（即 `result.value`），而不是 `datatypes` 对象本身。
*   这样调用方可以直接获取结果数据，无需关心对象的内部结构。
*   如果调用方是前端或其他外部系统，返回原始值（JSON 兼容格式）是标准做法。

## 上下文与常用工具

在服务开发中，经常需要获取当前用户信息、系统时间，记录运行日志或调用其他服务。

### 全局变量

JitAI 提供了 `GlobalVar` 对象来访问当前用户和系统时间等上下文信息。

**当前用户 (`currentUser`)**

获取当前登录用户的上下文信息。`currentUser` 属于[工作成员类型 (Member)](../JitORM/data-types#member)，支持获取用户ID、名称等属性。

**当前时间 (`currentTime`)**

获取系统当前时间。`currentTime` 属于[日期时间类型 (DateTime)](../JitORM/data-types#datetime)，支持获取年、月、日等时间分量。

```python
# 需导入 GlobalVar
from globals.GlobalVar import GlobalVar

def my_function(self):
    # 1. 获取当前用户
    current_user_name = GlobalVar.currentUser.getName()
    
    # 2. 获取当前时间
    current_year = GlobalVar.currentTime.year
```

### 日志记录

推荐使用 `jit.commons.utils.logger` 记录业务日志，便于排查问题。

```python
from jit.commons.utils.logger import log

def processPayment(self, orderId):
    log.info(f"开始处理订单支付: {orderId}")
    
    try:
        # ... 支付逻辑 ...
        log.debug("支付接口调用成功")
    except Exception as e:
        log.error(f"支付失败: {str(e)}")
        log.exception(e) # 记录完整堆栈
```

### 调用其他服务

在服务中调用其他服务主要有两种方式：

**方式一：直接引用 (`app.<fullName>`) (推荐)**

直接通过 `app` 对象链式调用。语法更简洁，且IDE通常能提供更好的补全支持（如果已生成桩代码）。

```python
def checkout(self, userId, items):
    # 1. 直接调用用户服务
    isValid = app.services.UserService.checkUserStatus(userId)
    
    # 2. 直接调用库存服务
    app.services.InventoryService.deduct(items)
```

**方式二：使用 `app.getElement(<fullName>)`**

通过字符串形式获取服务实例。这种方式更动态，适合在无法确定服务是否存在时使用。

```python
def checkout(self, userId, items):
    # 1. 调用用户服务检查状态
    userSvc = app.getElement("services.UserService")
    isValid = userSvc.checkUserStatus(userId)
    
    # 2. 调用库存服务扣减库存
    inventorySvc = app.getElement("services.InventoryService")
    inventorySvc.deduct(items)
```


## 核心功能开发

### 模型数据操作

在服务中调用模型（Models）进行增删改查是核心场景。

#### 查询数据 (Query)

使用[Q表达式](../JitORM/q-expressions)进行条件筛选。

```python
# 构造返回结构
result = datatypes.JitDict.new({
    "variableList": [
        {"name": "rowDatas", "dataType": "RowList", "generic": "models.CustomerModel"},
        {"name": "totalCount", "dataType": "Numeric"}
    ]
}, app.models.CustomerModel.query(
    Q(Q("age", "gt", 18)),  # 筛选条件
    None,                   # 排序字段
    None,                   # 查询字段（None=全部）
    1,                      # 页码
    -1,                     # 分页大小（-1=全部）
    2                       # 查询模式
))
```

#### 数据保存 (Save)

```python
# 1. 创建新数据
user = datatypes.RowData.new({"generic": "models.UserModel"}, {})
user.name.value = "ZhangSan"
user.save()

# 2. 修改已有数据
user = app.models.UserModel.get("Q(Q('id', '=', 1))", [])
user.email.value = "new@example.com"
user.save()
```

## 事件机制  {#event-definition-and-usage}

服务元素支持定义和触发自定义事件，与其他业务逻辑解耦。

### 定义事件

在服务的声明文件 `e.json` 中，通过 `eventDescs` 字段定义事件。

```json title="e.json"
{
  "eventDescs": [
    {
      "name": "onOrderCreated",
      "title": "订单创建完成",
      "desc": "当新订单创建成功后触发"
    }
  ]
}
```

### 触发事件

在 `service.py` 中，使用 `app.event.publish` 方法触发已定义的事件。

```python
def createOrder(self, orderInfo):
    # ... 业务逻辑：创建订单 ...
    
    # 触发事件
    # sender: 事件的全限定名，格式为 "services.[服务名].[事件名]"
    # args: 位置参数元组
    # kwargs: 关键字参数字典
    app.event.publish(
        sender="services.MyBusinessService.onOrderCreated",
        args=(),
        kwargs={"orderId": 12345, "amount": 100.0}
    )
```

### 事件订阅
详情请见[自定义事件参考](./custom-events#subscribe-custom-event)

## 完整代码示例

以下示例展示了一个完整的 **OrderService**，包含了依赖引用、上下文获取、数据查询、逻辑计算、异常处理及事件触发。

### e.json

```json title="services/OrderService/e.json"
{
  "title": "订单服务",
  "type": "services.NormalType",
  "backendBundleEntry": ".",
  "functionList": [
    {
      "name": "createOrder",
      "title": "创建订单",
      "args": [
        {"name": "skuId", "title": "商品ID", "dataType": "Numeric"},
        {"name": "count", "title": "数量", "dataType": "Numeric"}
      ],
      "returnType": "JitDict",
      "argsToDatatype": 1
    }
  ],
  "eventDescs": [
    {"name": "onOrderPayed", "title": "订单已支付"}
  ]
}
```

### service.py

```python title="services/OrderService/service.py"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from services.NormalType import NormalService
from jit.commons.utils.logger import log

class OrderService(NormalService):
    
    def createOrder(self, skuId, count):
        # 1. 初始化返回结果
        result = datatypes.JitDict.new({
            "variableList": [
                {"name": "code", "dataType": "Numeric"},
                {"name": "msg", "dataType": "Stext"},
                {"name": "orderId", "dataType": "Numeric"}
            ]
        }, {"code": 200, "msg": "Success", "orderId": 0})

        try:
            log.info(f"User {GlobalVar.currentUser.name} creating order for SKU {skuId.value}")

            # 2. 检查库存 (调用其他服务)
            hasStock = app.services.InventoryService.checkStock(skuId, count)
            
            if not hasStock:
                result.code.value = 400
                result.msg.value = "库存不足"
                return result.value

            # 3. 计算金额 (模型查询与公式计算)
            sku = app.models.SkuModel.get(Q(Q('id', '=', {skuId.value})), [])
            totalPrice = datatypes.Numeric.new({}, (MUL(sku.price.value, count.value)))

            # 4. 保存订单 (模型保存)
            order = datatypes.RowData.new({"generic": "models.OrderModel"}, {})
            order.creator.value = currentUser.id
            order.skuId.value = skuId.value
            order.count.value = count.value
            order.amount.value = totalPrice.value
            order.save()
            
            # 更新返回结果
            result.orderId.value = order.id.value

            # 5. 触发事件
            app.event.publish(
                sender="services.OrderService.onOrderPayed",
                args=(),
                kwargs={"orderId": order.id.value}
            )
            
            log.info(f"Order created successfully: {order.id.value}")
            return result.value

        except Exception as e:
            log.error("Create order failed")
            log.exception(e)
            result.code.value = 500
            result.msg.value = str(e)
            return result.value
```
