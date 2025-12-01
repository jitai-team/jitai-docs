---
sidebar_position: 3
slug: object-models
description: "数据对象模型 API 参考文档。专为全代码开发模式设计的无表模型，用于数据结构定义与传递。"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# 数据对象模型

数据对象模型（Data Object Model）是一种专为全代码开发模式设计的数据结构，类似于 DTO（Data Transfer Object，数据传输对象），又称 **无表模型**。

它由开发者根据具体业务需求自定义，不直接映射或关联任何数据库表。数据对象模型主要用于在服务函数、事件处理、流程编排等业务逻辑中，进行数据的结构化表达、传递与转换。通过数据对象模型，开发者可以灵活定义多层嵌套、复杂组合的数据结构，实现不同模块间的数据标准化交互，提升代码的可维护性和复用性。

:::tip 适用场景
✅ **复杂参数传递**：作为服务函数、工作流节点的输入输出参数，封装复杂的数据结构。<br/>
✅ **跨模块数据交互**：统一不同业务模块间的数据交换格式，实现标准化接口。<br/>
✅ **临时数据封装**：用于 UI 组件（如表格、表单）的临时数据展示，无需持久化存储。<br/>
✅ **业务逻辑解耦**：通过定义独立的数据契约，解耦前后端或服务间的数据依赖。
:::

数据对象模型的分层结构为 Meta（models.Meta）→ Type（models.ObjectModelType）→ 实例。

## 模型目录结构

每个模型元素使用独立的文件夹，路径规则：`[应用根目录]/models/[模型名称]`

```plaintext
[应用根目录]/models/ResultModel/
├── e.json        # 模型元素的声明文件
├── model.py      # 模型元素的实现文件
└── __init__.py   # 模型元素所在包的初始化文件
```

### e.json 模型声明文件

```json title="e.json"
{
  "backendBundleEntry": ".",
  "title": "通用结果对象",
  "type": "models.ObjectModelType", 
  "functionList": []
}
```

### model.py 实现文件

数据对象模型继承自 `models.ObjectModelType` 包中的 `ObjectModel` 类。

```python title="model.py"
from datatypes.Meta import datatypes
from models.ObjectModelType import ObjectModel

class ResultModel(ObjectModel):
    # 定义数据结构字段
    code = datatypes.Integer(title="状态码", default=200)
    message = datatypes.Stext(title="提示信息")
    data = datatypes.Json(title="业务数据")
    success = datatypes.Boolean(title="是否成功", default=True)

```

### \_\_init\_\_.py 初始化文件

```python title="__init__.py"
from .model import ResultModel
```

## 模型字段

数据对象模型的字段定义与数据表模型完全一致，支持所有标准的数据类型。字段仅用于定义内存中的数据结构，不会生成数据库表结构。

详细的字段类型列表请参考 [字段类型文档](../data-types)。

```python
# 示例：定义一个用户信息传输对象
nick = datatypes.Stext(name="nick", title="姓名")
phone = datatypes.Phone(name="phone", title="电话")
email = datatypes.Stext(name="email", title="邮箱")
address = datatypes.Address(name="address", title="地址")
```

## 模型函数

数据对象模型与数据表模型共享完全一致的 API 接口定义。这意味着在服务函数、前端组件（如表格、表单）或其他业务逻辑中，调用数据对象模型的方式与调用普通数据表模型完全一致。

由于数据对象模型没有内置的数据库表支持，其默认的 CRUD 函数（如 `create`, `save`, `delete` 等）仅在内存中操作或不执行任何持久化动作。为了赋予模型实际的业务能力（例如对接外部 API、读写缓存、处理复杂计算等），开发者需要根据业务需求，在 `model.py` 中**按需重写**相应的内置函数。

### 常用函数重写指南

各函数的参数定义与数据表模型完全一致，详细说明请参考 [数据表模型-内置函数](./data-models#model-built-in-functions)。

| 函数名 | 说明 | 常见重写场景 |
| :--- | :--- | :--- |
| `save` | 保存数据 | 配合 `get` 使用，将对象实例的修改同步到外部系统。 |
| `delete` | 删除数据 | 删除当前对象实例对应的数据。 |
| `create` | 创建数据 | 调用外部 API 提交新数据；在内存中初始化复杂对象。 |
| `updateOrAdd` | 条件更新或添加 | 根据业务逻辑判断是新增还是更新外部数据。 |
| `createOrUpdateMany` | 批量创建或更新 | 批量处理数据导入或同步到外部系统。 |
| `updateByPK` | 按主键批量更新 | 调用外部 API 批量更新数据。 |
| `deleteByPK` | 按主键批量删除 | 调用外部 API 批量删除数据。 |
| `updateByFilter` | 按条件批量更新 | 根据特定条件批量更新外部系统数据。 |
| `deleteByFilter` | 按条件批量删除 | 根据特定条件批量删除外部系统数据。 |
| `query` | 分页查询 | 对接外部 API 获取列表数据；构造内存中的临时数据列表。 |
| `get` | 获取单条数据 | 对接外部 API 获取详情；从缓存中读取数据。 |
| `groupBy` | 分组统计 | 对内存数据或外部数据进行分组统计。 |
| `getFieldData` | 获取字段值列表 | 获取下拉选项数据源。 |
| `statisticFieldData` | 字段统计 | 对数据进行特定维度的统计计算。 |
| `getExportData` | 导出数据 | 自定义导出数据的获取逻辑。 |
| `aggregate` | 聚合计算 | 执行自定义的聚合计算逻辑。 |
| `resetModelData` | 清空数据 | 清除缓存或重置外部系统测试数据。 |
| `getCompareResult` | 数据比较 | 在内存中执行复杂的 Q 表达式匹配逻辑。 |

### 实现示例

以下示例展示了如何通过重写 `query` 和 `create` 方法，让数据对象模型对接一个模拟的外部 API。

#### 重写 query 方法

当 UI 组件（如表格）加载数据时，会自动调用 `query` 方法。

```python
    @classmethod
    def query(cls, filter=None, fieldList=None, orderList=None, page=1, size=20, level=2):
        """
        重写查询方法，模拟从外部 API 获取分页数据
        """
        # 1. 解析 filter 参数（如果需要对接查询条件）
        # ...
        
        # 2. 模拟调用外部 API
        # api_result = external_api.get_users(page=page, size=size)
        
        # 这里构造假数据演示
        data_list = []
        start_id = (page - 1) * size + 1
        for i in range(size):
            data_list.append({
                "id": start_id + i,
                "name": f"用户_{start_id + i}",
                "status": "active"
            })
        
        # 3. 返回符合 JitORM 规范的结果结构
        return {
            "rowDatas": data_list,  # 数据列表
            "totalCount": 100       # 总记录数（用于分页）
        }
```

#### 重写 create 方法

当使用表单组件提交新建数据时，会自动调用 `create` 方法。

```python
    @classmethod
    def create(cls, rowData, triggerEvent=1):
        """
        重写创建方法，处理数据提交逻辑
        """
        # 1. 数据校验或预处理
        if rowData.name.isNull():
            raise Exception("姓名不能为空")
            
        # 2. 模拟调用外部 API 创建数据
        # new_id = external_api.create_user(rowData)
        
        # 3. 返回包含新 ID 的完整数据对象
        # 注意：必须返回完整的字典数据，以便前端更新状态
        rowData.id.value = 999  # 假设外部系统返回的 ID
        return rowData
```

### 自定义函数

数据对象模型最常用的场景是定义业务处理函数。

**1. 在 e.json 中声明函数：**

```json
{
  "functionList": [{
    "name": "processData",
    "title": "处理数据",
    "args": [{"name": "input", "dataType": "Stext"}],
    "returnType": "Stext"
  }]
}
```

**2. 在 model.py 中实现函数：**

```python
    def processData(self, input):
        # 业务逻辑处理
        if input.value == "valid":
            return "Success"
        else:
            return 'Failed'
```
