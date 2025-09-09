---
sidebar_position: 3
slug: data-models
---

# 数据模型
模型即业务实体对象，且数据模型内置了业务层常用的数据操作接口。JitORM基于丰富的数据类型，提供面向对象的数据模型定义方式。开发者使用JitAi开发工具的可视化界面编辑模型元素，也可以使用全代码方式。

数据模型元素的分层结构为Meta（models.Meta） → Type（models.NormalType） → 实例，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的models.NormalType元素，以实现自己的封装。

## 模型分类
数据模型包括普通数据模型、聚合表模型、扩展表模型、数据对象模型（无表模型）。

### 普通数据模型
最常见的数据模型，每个实例都对应指定数据库中的一张表。对模型字段的变更会自动同步到数据库中，开发人员无需手动维护数据库表。

### 聚合表模型
聚合表用于多数据模型关联的复杂数据分析场景，支持分组汇总、追加合并、横向连接，且三者可以嵌套组合。

- **分组汇总**：针对一个数据模型，对指定字段进行聚合统计（GROUP BY）
- **追加合并**：将多个数据模型关联在一起，并追加合并为一个数据模型(UNION)
- **横向连接**：将多个数据模型关联在一起，并横向连接为一个数据模型(JOIN)

### 扩展表模型
扩展表是将一个`普通数据模型`作为基础模型，通过字段关联规则链式地关联(LEFT JOIN)若干个其它数据模型，可以在不修改原始模型的前提下扩展新的字段，并对被关联模型的字段进行聚合统计(求和、计数、平均值、最大值等)。一对一关联时，支持通过扩展表直接对被关联字段进行修改。

复杂的统计分析建议使用聚合表模型。

### 数据对象模型（无表模型）
当前仅支持全代码方式使用，可类比为DTO（Data Transfer Object），完全由开发者按需定义，并在业务逻辑流转中使用，不与数据库关联。

## 普通数据模型示例
### 元素目录结构
每个模型元素使用独立的文件夹，路径规则：`[应用根目录]/models/[模型名称]`

```plaintext
[应用根目录]/models/CustomerModel/
├── model.py      # 模型元素的实现文件
├── e.json        # 模型元素的定义文件
└── __init__.py   # 模型元素所在包的初始化文件
```

### e.json 配置文件
```json title="e.json"
{
  "backendBundleEntry": ".",
  "db": "databases.Default",
  "title": "客户表模型",
  "type": "models.NormalType"
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
    name = datatypes.Stext(name="name", title="姓名")
    phone = datatypes.Phone(name="phone", title="电话")
    email = datatypes.Stext(name="email", title="邮箱")
    address = datatypes.Address(name="address", title="地址")

    class Meta:
        modelType = "NormalType"
        db = "databases.Default"  # 数据库元素的fullName
        dataTitle = None
        dbTable = "CustomerModel"  # 与模型名称对应
        name = "CustomerModel"     # 与模型名称对应
        title = "客户表模型"
```

### __init__.py 初始化文件
```python title="__init__.py"
from .model import CustomerModel
```

## 模型内置函数 
JitORM数据模型提供了丰富的内置函数，涵盖数据的创建、读取、更新、删除等操作。这些函数支持单条和批量操作，并提供了灵活的查询和聚合功能。

### 基础数据操作 
用于处理单条数据的基本CRUD操作。

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
user = UserModel.get("Q(id=1)", orderList=[])
user["name"] = "李四"
UserModel=UserModel(**user)
UserModel.save()
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
user = UserModel.get("Q(id=1)", [])
UserModel(**user).delete()
```

#### updateOrAdd - 条件更新或添加
```python
@classmethod
def updateOrAdd(cls, filter, orderList, updateData, addData, triggerEvent=1) -> RowData
```

根据条件查找数据，存在则更新，不存在则添加。

**参数说明：**
- `filter`: Q表达式筛选条件
- `orderList`: 排序规则 例如： [["name",1],["age",-1]] 1升序，-1降序
- `updateData`: 更新时的数据
- `addData`: 添加时的数据
- `triggerEvent`: 是否触发事件（默认触发）

**使用示例：**
```python
# 获取模型元素，根据邮箱更新或添加用户
UserModel = app.getElement("models.UserModel")
UserModel.updateOrAdd(
    "Q(email='test@example.com')", 
    [], 
    {"name": "更新后的名字"}, 
    {"name": "新用户", "email": "test@example.com"}
)
```

### 批量数据操作
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
- `pkList`: 主键ID列表
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
- `pkList`: 主键ID列表
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

根据筛选条件批量更新数据。

**参数说明：**
- `filter`: Q表达式筛选条件
- `updateData`: 要更新的数据

**使用示例：**
```python
# 获取模型元素，将所有未激活用户设为过期状态
UserModel = app.getElement("models.UserModel")
UserModel.updateByFilter("Q(status='inactive')", {"status": "expired"})
```

#### deleteByFilter - 按条件批量删除
```python
@classmethod
def deleteByFilter(cls, filter)
```

根据筛选条件批量删除数据。

**参数说明：**
- `filter`: Q表达式筛选条件

**使用示例：**
```python
# 获取模型元素，删除所有过期用户
UserModel = app.getElement("models.UserModel")
UserModel.deleteByFilter("Q(status='expired')")
```

### 数据查询
用于检索和查找数据的核心函数，支持分页、排序、筛选等功能。

#### query - 分页查询
```python
@classmethod
def query(cls, filter=None, fieldList=None, orderList=None, page=None, size=None, level=2)
```

分页查询数据，是最常用的查询方法。

**参数说明：**
- `filter`: Q表达式筛选条件（可选）
- `fieldList`: 指定查询的字段（可选，默认查询所有字段）
- `orderList`: 排序规则，例如： [["name",1],["age",-1]] 1升序，-1降序
- `page`: 页码（从1开始）
- `size`: 每页记录数
- `level`: 关联数据层级（默认2层）

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
    filter="Q(status='active')",
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
- `filter`: Q表达式筛选条件
- `orderList`: 排序规则，例如： [["name",1],["age",-1]] 1升序，-1降序
- `level`: 关联数据层级（默认2层）

**使用示例：**
```python
# 获取模型元素，根据ID获取用户
UserModel = app.getElement("models.UserModel")
user = UserModel.get("Q(id=1)", [])

# 获取最新的活跃用户
user = UserModel.get(
    "Q(status='active')", 
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
- `filter`: Q表达式筛选条件
- `fieldList`: 分组字段列表
- `orderList`: 排序规则（可选），例如： [["name",1],["age",-1]] 1升序，-1降序
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
- `filter`: Q表达式筛选条件
- `orderList`: 排序规则，例如： [["name",1],["age",-1]] 1升序，-1降序

**使用示例：**
```python
# 获取模型元素，获取所有部门名称列表
UserModel = app.getElement("models.UserModel")
departments = UserModel.getFieldData("department", "", [])

# 获取活跃用户的邮箱列表
emails = UserModel.getFieldData(
    "email", 
    "Q(status='active')", 
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
- `filter`: Q表达式筛选条件
- `fieldAggrMap`: 字段聚合映射，如：`{"age": "AVG", "salary": "SUM"}`

**使用示例：**
```python
# 获取模型元素，统计用户平均年龄和总薪资
UserModel = app.getElement("models.UserModel")
stats = UserModel.statisticFieldData(
    "Q(status='active')",
    {"age": "AVG", "salary": "SUM"}
)
```

### 模型内置函数 {#model-built-in-functions}
模型元素提供了丰富的内置函数，用于数据的创建、查询、更新、删除等操作。

### 基础数据操作 {#basic-data-operations}
提供标准的CRUD操作和数据查询功能。

### 数据导入导出
用于数据导出和批量数据处理的工具函数。

#### getExportData - 导出数据
```python
@classmethod
def getExportData(cls, filter, fieldList, page, size)
```

获取符合条件的数据用于导出，支持分页处理大量数据。

**参数说明：**
- `filter`: Q表达式筛选条件
- `fieldList`: 要导出的字段列表
- `page`: 页码
- `size`: 每页记录数

**使用示例：**
```python
# 获取模型元素，导出活跃用户的基本信息
UserModel = app.getElement("models.UserModel")
export_data = UserModel.getExportData(
    filter="Q(status='active')",
    fieldList=["name", "email", "department"],
    page=1,
    size=1000
)
```

### 高级功能
提供更高级的数据操作和管理功能。

#### queryTQL - TQL查询
```python
@classmethod
def queryTQL(cls, tqlStr)
```

使用TQL（Table Query Language）语句进行复杂查询。

**参数说明：**
- `tqlStr`: TQL查询语句

**使用示例：**
```python
# 获取模型元素，使用TQL进行复杂联表查询
UserModel = app.getElement("models.UserModel")
tql = """
Select(
    [F("u.name", "username"), F("d.title", "dept_name")],
    From(["UserModel", "u"]),
    LeftJoin("DeptModel", "d"),
    On(["u.deptId", "=", "d.id"])
)
"""
result = UserModel.queryTQL(tql)
```

#### aggregate - 聚合计算
```python
@classmethod
def aggregate(cls, filter, aggrField, aggrType)
```

对指定字段进行聚合计算。

**参数说明：**
- `filter`: Q表达式筛选条件
- `aggrField`: 聚合字段名
- `aggrType`: 聚合类型（SUM、AVG、COUNT、MAX、MIN）

**使用示例：**
```python
# 获取模型元素，计算活跃用户的平均年龄
UserModel = app.getElement("models.UserModel")
avg_age = UserModel.aggregate("Q(status='active')", "age", "AVG")

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

### 数据验证
用于数据校验和条件判断的辅助函数。

#### getCompareResult - 数据比较
```python
@classmethod
def getCompareResult(cls, q, bizRow)
```

根据Q表达式条件判断业务数据是否满足条件。

**参数说明：**
- `q`: Q表达式比较条件
- `bizRow`: 要验证的业务数据

**使用示例：**
```python
# 获取模型元素，验证用户数据是否满足条件
UserModel = app.getElement("models.UserModel")
user_data = {"age": 25, "status": "active"}
is_valid = UserModel.getCompareResult("Q(age__gte=18) & Q(status='active')", user_data)

if is_valid:
    print("用户数据符合条件")
```

---

:::tip 使用建议
- 对于频繁的数据操作，建议使用批量函数提高性能
- 查询时合理使用`fieldList`参数只获取需要的字段
- 使用`triggerEvent=0`可以跳过事件触发，提高批量操作性能
- TQL查询适用于复杂的跨表查询场景
:::

:::warning 注意事项
- `resetModelData`会清空表的所有数据，生产环境请谨慎使用
- 批量删除操作无法撤销，请确认筛选条件正确
- 大数据量操作建议分批处理，避免内存溢出
:::
