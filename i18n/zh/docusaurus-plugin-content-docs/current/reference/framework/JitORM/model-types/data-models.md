---
sidebar_position: 0
slug: data-models
description: "数据表模型 API 参考文档。完整的规格说明、方法和示例。"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# 数据表模型
最常见的数据模型，每个实例都对应指定数据库中的一张表。对模型字段的变更会自动同步到数据库中，开发者无需手动维护数据库表。

数据表模型的分层结构为 Meta（models.Meta）→ Type（models.NormalType）→ 实例，开发者也可以在自己的 App 中改写 JitAI 官方提供的 models.NormalType 元素，以实现自己的封装。

## 模型目录结构
每个模型元素使用独立的文件夹，路径规则：`[应用根目录]/models/[模型名称]`

```plaintext
[应用根目录]/models/CustomerModel/
├── e.json        # 模型元素的声明文件
├── model.py      # 模型元素的实现文件
└── __init__.py   # 模型元素所在包的初始化文件
```

### e.json 模型声明文件
```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "客户表模型",
  "type": "models.NormalType", 
  "functionList": []
}
```

### model.py 实现文件
```python title="model.py"
from datatypes.Meta import datatypes
from models.NormalType import NormalModel

class CustomerModel(NormalModel):
    # 必需字段
    id = datatypes.AutoInt(name="id", title="id", primaryKey=True, readOnly=1)
    createdAt = datatypes.Datetime(name="createdAt", title="创建时间")
    updatedAt = datatypes.Datetime(name="updatedAt", title="更新时间")
    
    # 业务字段
    nick = datatypes.Stext(name="nick", title="姓名")
    phone = datatypes.Phone(name="phone", title="电话")
    email = datatypes.Stext(name="email", title="邮箱")
    address = datatypes.Address(name="address", title="地址")

    class Meta:
        modelType = "NormalType"
        name = 'CustomerModel'
        title = '客户表模型'
        db = "databases.Default"   # 数据库元素的fullName
        dataTitle = "name"         # 数据标题
        dbTable = "CustomerModel"  # 与模型名称对应
        unionIndexList = []        # 组合索引
        unionUniqueList = []       # 联合唯一索引
```


### \_\_init\_\_.py 初始化文件
```python title="__init__.py"
from .model import CustomerModel
```

## 模型字段

模型字段对应数据库表中的列，在 `model.py` 中通过类属性定义。所有字段类型都由 `datatypes` 模块提供。

```python
# 字段定义示例
nick = datatypes.Stext(name="nick", title="姓名")
```

**通用参数说明：**

- `name`：字段名称，**必须**与类属性名完全一致
- `title`：字段标题，用于界面显示和文档生成
- `primaryKey`：是否为主键
- `readOnly`：是否只读（1 为只读，0 为可写）
- `default`：默认值
- 其他字段类型特定参数

:::info 更多字段类型
JitAI 提供了丰富的字段类型（如 `Stext`, `Numeric`, `DateTime`, `Phone` 等），完整列表请参考 [字段类型文档](../data-types)。
:::

**计算公式**

对已有字段进行灵活计算与数据加工，满足业务中的统计、转换、条件判断等多样化需求。在字段参数中添加 `formula` 表示该字段是一个公式字段。配置计算公式后，默认值会失效，且字段自动变为只读。详细语法请参考 [计算公式文档](../formula)。

示例：
```python
class CustomerModel(NormalModel):
    # ...其他字段
    # 拼接姓名和电话
    nameAndTel = datatypes.Stext(
        name="nameAndTel", 
        title="姓名-电话", 
        formula="CONCAT(F('nick'), '-', F('phone'))", 
        readOnly=1
    )
```

**字段名关键字**

以下关键字不允许作为字段名：

- **前端 JavaScript 语言关键字**：如 `var`, `function` 等
- **后端 Python 语言关键字**：如 `type`, `class` 等
- **JitAI 系统关键字**：

```text
app, model, service, default, commonJson, dbConfig, dataType, 
dataTitle, dbFieldType, dataTypeDict, relateTypeDict, subTypeDict, 
create, save, update, delete, date, count, calculable, comparable, 
average, sum, min, max, url, value, cache, relateRowData, cascade
```


## 模型 Meta 配置

**数据存储 `db`**：默认值 `"databases.Default"`，可替换为自定义的数据库。

**数据标题 `dataTitle`**：在数据模型中，将字段设置为数据标题可以让数据行在界面上更具可读性和辨识度。数据标题字段的值会作为数据记录的主要显示信息，帮助用户快速识别和区分不同的数据行。
系统支持将以下字段类型设置为数据标题：

- **单行文本** - 适合存储名称、标题等简短文本信息
- **多行文本** - 适合存储较长的描述性内容
- **流水号** - 系统自动生成的唯一编号
- **身份证** - 标准的身份证号码格式
- **手机号** - 手机号码信息
- **车牌号** - 车牌号码信息
- **单选** - 单选选项的文本内容
- **下拉单选** - 下拉选择的文本内容

:::tip 提示
每个数据表模型只能设置一个字段作为数据标题。如果您需要组合多个字段来表示数据标题，可以考虑使用计算字段来实现。
:::

**组合索引 `unionIndexList`**：组合索引列表，每个索引项是一个字典：
  - `name`：索引名称，由 6 位随机字母组成
  - `title`：索引标题，根据用户描述生成
  - `fieldNameList`：组合字段 id 列表，例如：`["field1", "field2"]`

**联合唯一索引 `unionUniqueList`**：联合唯一索引列表，每个索引项是一个字典：
  - `name`：索引名称，由 6 位随机字母组成
  - `title`：索引标题，根据用户描述生成
  - `fieldNameList`：组合字段 id 列表，例如：`["field1", "field2"]`


## 模型函数

模型有两类函数：成员函数和类函数（有 classmethod 装饰）。

### 模型内置函数 {#model-built-in-functions}
JitORM 在 NormalModel 中提供了丰富的内置函数，涵盖数据的创建、读取、更新、删除等操作。这些函数支持单条和批量操作，并提供了灵活的查询和聚合功能。

**成员函数**

#### save - 保存数据
```python
def save(self, triggerEvent=1) -> RowData
```

保存当前数据实例，自动判断是新增还是更新。

**参数说明：**
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，修改用户信息并保存
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', 1))", orderList=[])
user.name.value = "李四"
user.save()
```

#### delete - 删除数据
```python
def delete(self, triggerEvent=1) -> Dict[str, Any]
```
删除当前数据记录。
**参数说明：**
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素并删除用户
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', '1'))", [])
user.delete()
```

**类函数**

**基础数据操作**

用于处理单条数据的基本 CRUD 操作。

#### create - 创建数据
```python
@classmethod
def create(cls, rowData, triggerEvent=1) -> RowData
```

创建一条新的数据记录。

**参数说明：**
- `rowData`: 要创建的数据字典
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素并创建新用户
UserModel = app.getElement("models.UserModel")
user_data = {"name": "张三", "email": "zhangsan@example.com"}
new_user = UserModel.create(user_data)
```

#### updateOrAdd - 条件更新或添加
```python
@classmethod
def updateOrAdd(cls, filter, orderList, updateData, addData, triggerEvent=1) -> RowData
```

根据条件查找数据，存在则更新，不存在则添加。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `orderList`: 排序规则，例如：`[["name", 1], ["age", -1]]`（1 升序，-1 降序）
- `updateData`: 更新时的数据
- `addData`: 添加时的数据
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，根据邮箱更新或添加用户
UserModel = app.getElement("models.UserModel")
UserModel.updateOrAdd(
    "Q(Q('email', '=','test@example.com'))", 
    [], 
    {"name": "更新后的名字"}, 
    {"name": "新用户", "email": "test@example.com"}
)
```

**批量数据操作**

用于高效处理大量数据的批量操作函数。

#### createOrUpdateMany - 批量创建或更新
```python
@classmethod
def createOrUpdateMany(cls, rowDataList, triggerEvent=1) -> List[RowData]
```

批量处理多条数据，自动判断新增还是更新。

**参数说明：**
- `rowDataList`: 要处理的数据列表
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，批量导入用户数据
UserModel = app.getElement("models.UserModel")
users_data = [
    {"name": "用户1", "email": "user1@example.com"},
    {"name": "用户2", "email": "user2@example.com"}
]
UserModel.createOrUpdateMany(users_data)
```

#### updateByPK - 按主键批量更新
```python
@classmethod
def updateByPK(cls, pkList, updateData, triggerEvent=1) -> List[RowData]
```

根据主键列表批量更新数据。

**参数说明：**
- `pkList`: 主键 ID 列表
- `updateData`: 要更新的数据
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，批量激活多个用户
UserModel = app.getElement("models.UserModel")
UserModel.updateByPK([1, 2, 3], {"status": "active"})
```

#### deleteByPK - 按主键批量删除
```python
@classmethod
def deleteByPK(cls, pkList, triggerEvent=1)
```

根据主键列表批量删除数据。

**参数说明：**
- `pkList`: 主键 ID 列表
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，批量删除指定用户
UserModel = app.getElement("models.UserModel")
UserModel.deleteByPK([1, 2, 3])
```

#### updateByFilter - 按条件批量更新
```python
@classmethod
def updateByFilter(cls, filter, updateData)
```

根据筛选条件批量更新数据。**注意**：该方法更新数据不会触发模型更新数据事件。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `updateData`: 要更新的数据

**使用示例：**
```python
# 获取模型元素，将所有未激活用户设为过期状态
UserModel = app.getElement("models.UserModel")
UserModel.updateByFilter("Q(Q('status', '=', 'inactive'))", {"status": "expired"})
```



#### deleteByFilter - 按条件批量删除
```python
@classmethod
def deleteByFilter(cls, filter)
```

根据筛选条件批量删除数据。。**注意**：该方法更新数据不会触发模型删除数据事件。

**参数说明：**
- `filter`: Q 表达式筛选条件

**使用示例：**
```python
# 获取模型元素，删除所有过期用户
UserModel = app.getElement("models.UserModel")
UserModel.deleteByFilter("Q(Q('status', '=', 'expired'))")
```

**数据查询**

用于检索和查找数据的核心函数，支持分页、排序、筛选等功能。

#### query - 分页查询
```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None, level=2)
```

分页查询数据，是最常用的查询方法。

**参数说明：**
- `filter`: Q 表达式筛选条件（可选）
- `fieldList`: 指定查询的字段（可选，默认查询所有字段）
- `orderList`: 排序规则，例如：`[["name", 1], ["age", -1]]`（1 升序，-1 降序）
- `page`: 页码（从 1 开始）
- `size`: 每页记录数
- `level`: 关联数据层级（默认 2 层）

**返回数据：**
- `rowDatas`: 查询结果列表
- `totalCount`: 总记录数

**使用示例：**
```python
# 获取模型元素，基础分页查询
UserModel = app.getElement("models.UserModel")
result = UserModel.query(page=1, size=10)
users = result["rowDatas"]
total = result["totalCount"]

# 带条件和排序的查询
result = UserModel.query(
    filter="Q(Q('status', '=', 'active'))",
    orderList=[["createdAt", -1]],  # 按创建时间倒序
    page=1, 
    size=20
)
```

#### get - 获取单条数据
```python
@classmethod
def get(cls, filter, orderList=None, level=2) -> RowData
```

获取满足条件的第一条数据。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `orderList`: 排序规则，例如：`[["name", 1], ["age", -1]]`（1 升序，-1 降序）
- `level`: 关联数据层级（默认 2 层）

**使用示例：**
```python
# 获取模型元素，根据 ID 获取用户
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(Q('id', '=', 1))", [])

# 获取最新的活跃用户
user = UserModel.get(
    "Q(Q('status', '=', 'active'))", 
    [["createdAt", 1]]
)
```

#### groupBy - 分组统计
```python
@classmethod
def groupBy(cls, filter, fieldList, orderList=None, page=None, size=None)
```

按指定字段分组统计数据。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `fieldList`: 分组字段列表
- `orderList`: 排序规则（可选），例如：`[["name", 1], ["age", -1]]`（1 升序，-1 降序）
- `page`: 页码（可选）
- `size`: 每页记录数（可选）

**使用示例：**
```python
# 获取模型元素，按状态分组统计用户数量
UserModel = app.getElement("models.UserModel")
result = UserModel.groupBy(
    filter="", 
    fieldList=["status", "COUNT(*) as count"]
)
```

#### getFieldData - 获取字段值列表
```python
@classmethod
def getFieldData(cls, fieldId, filter, orderList=None) -> List
```

获取指定字段的所有值，常用于构建下拉选项。

**参数说明：**
- `fieldId`: 字段名称
- `filter`: Q 表达式筛选条件
- `orderList`: 排序规则，例如：`[["name", 1], ["age", -1]]`（1 升序，-1 降序）

**使用示例：**
```python
# 获取模型元素，获取所有部门名称列表
UserModel = app.getElement("models.UserModel")
departments = UserModel.getFieldData("department", "", [])

# 获取活跃用户的邮箱列表
emails = UserModel.getFieldData(
    "email", 
    "Q(Q('status', '=', 'active'))", 
    [["email", 1]]
)
```

#### statisticFieldData - 字段统计
```python
@classmethod
def statisticFieldData(cls, filter, fieldAggrMap)
```

对指定字段进行聚合统计。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `fieldAggrMap`: 字段聚合映射，如：`{"age": "AVG", "salary": "SUM"}`

**使用示例：**
```python
# 获取模型元素，统计用户平均年龄和总薪资
UserModel = app.getElement("models.UserModel")
stats = UserModel.statisticFieldData(
    "Q(Q('status', '=', 'active'))",
    {"age": "AVG", "salary": "SUM"}
)
```

**数据导入导出**

用于数据导出和批量数据处理的工具函数。

#### getExportData - 导出数据
```python
@classmethod
def getExportData(cls, filter, fieldList, page, size)
```

获取符合条件的数据用于导出，支持分页处理大量数据。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `fieldList`: 要导出的字段列表
- `page`: 页码
- `size`: 每页记录数

**使用示例：**
```python
# 获取模型元素，导出活跃用户的基本信息
UserModel = app.getElement("models.UserModel")
export_data = UserModel.getExportData(
    filter="Q(Q('status', '=', 'active'))",
    fieldList=["name", "email", "department"],
    page=1,
    size=1000
)
```

**高级功能**

提供更高级的数据操作和管理功能。

#### aggregate - 聚合计算
```python
@classmethod
def aggregate(cls, filter, aggrField, aggrType)
```

对指定字段进行聚合计算。

**参数说明：**
- `filter`: Q 表达式筛选条件
- `aggrField`: 聚合字段名
- `aggrType`: 聚合类型（SUM、AVG、COUNT、MAX、MIN）

**使用示例：**
```python
# 获取模型元素，计算活跃用户的平均年龄
UserModel = app.getElement("models.UserModel")
avg_age = UserModel.aggregate("Q(Q('status', '=', 'active'))", "age", "AVG")

# 统计总用户数
user_count = UserModel.aggregate("", "id", "COUNT")
```

#### resetModelData - 清空数据
```python
@classmethod
def resetModelData(cls)
```

清空模型对应表的所有数据，**谨慎使用**。

**使用示例：**
```python
# 获取模型元素，清空测试数据（生产环境请谨慎使用）
TestModel = app.getElement("models.TestModel")
TestModel.resetModelData()
```

**数据验证**

用于数据校验和条件判断的辅助函数。

#### getCompareResult - 数据比较
```python
@classmethod
def getCompareResult(cls, q, bizRow)
```

根据 Q 表达式条件判断业务数据是否满足条件。

**参数说明：**
- `q`: Q 表达式比较条件
- `bizRow`: 要验证的业务数据

**使用示例：**
```python
# 获取模型元素，验证用户数据是否满足条件
UserModel = app.getElement("models.UserModel")
user_data = {"age": 25, "status": "active"}
is_valid = UserModel.getCompareResult("Q(Q('age', '>=', 18), Q.AND, Q('status', '=', 'active'))", user_data)

if is_valid:
    print("用户数据符合条件")
```

---

:::tip 使用建议
- 对于频繁的数据操作，建议使用批量函数提高性能
- 查询时合理使用 `fieldList` 参数只获取需要的字段
- 使用 `triggerEvent=0` 可以跳过事件触发，提高批量操作性能
- TQL 查询适用于复杂的跨表查询场景
:::

:::warning 注意事项
- `resetModelData` 会清空表的所有数据，生产环境请谨慎使用
- 批量删除操作无法撤销，请确认筛选条件正确
- 大数据量操作建议分批处理，避免内存溢出
:::


### 模型自定义函数 

除了内置函数外，开发者还可以为模型添加自定义函数，以实现特定的业务逻辑。这些函数均定义为成员函数。
定义自定义函数需要两个步骤：
1. **声明**：在模型元素声明文件 `e.json` 的 `functionList` 字段中声明函数签名。
2. **实现**：在模型实现文件 `model.py` 中编写对应的 Python 代码。

#### 函数声明

在 `functionList` 数组中定义每个函数的配置信息。

**主要配置参数说明：**

| 参数字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `name` | String | **必填**，函数名称，必须与 `model.py` 中的方法名完全一致。 |
| `title` | String | 函数的显示标题，用于文档生成或界面展示。 |
| `args` | List | 参数列表，定义函数的输入参数。 |
| `returnType` | String | 返回值的数据类型（如 `Stext`, `Numeric`, `RowData` 等）。 |
| `argsToDatatype` | Integer | 参数类型转换标识。默认为 1，表示参数会自动转换为对应的数据类型对象。 |

**参数对象（args item）说明：**

| 参数字段 | 说明 |
| :--- | :--- |
| `name` | 参数变量名。 |
| `title` | 参数显示标题。 |
| `dataType` | 参数数据类型（如 `Stext`）。 |

**声明示例：**

```json title="e.json"
{
  "functionList": [{
    "name": "func1",
    "title": "函数标题",
    "args": [{
      "name": "param1",
      "title": "参数标题",
      "dataType": "Stext"
    }],
    "argsToDatatype": 1,
    "returnType": "Stext"
  }]
}
```

#### 函数实现

在 `model.py` 类中实现同名方法。自定义函数作为成员函数，第一个参数必须是 `self`。

**实现示例：**

```python title="model.py"
class CustomerModel(NormalModel):

    #...字段及Meta

    def func1(self, param1):
        # 业务逻辑实现
        return "result"
```
