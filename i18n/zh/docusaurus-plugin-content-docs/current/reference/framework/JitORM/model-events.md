---
slug: model-events
description: "模型事件 API 参考文档。完整的规格说明、方法和示例。"
---

# 模型事件

模型事件 (`events.ModelType`) 是基于模型表数据操作自动触发的事件机制。它基于事件订阅发布模式实现数据变更的监听和响应，负责监听模型的增删改操作。

模型事件适用于数据审计、业务规则执行、消息通知等场景，例如：

*   **数据审计**：记录关键数据的变更历史
*   **业务联动**：订单状态更新后自动调整库存
*   **消息通知**：新用户注册后发送欢迎邮件

模型事件元素分层结构为 Meta (`events.Meta`) → Type (`events.ModelType`) → 实例，开发者可通过可视化开发工具快捷地创建模型事件实例元素。

**工作原理**：系统监听指定的业务模型 (`sender`)，当发生指定的操作 (`operate`) 且满足筛选条件 (`filter`) 时，触发事件。事件可以同步或异步 (`asyncType`) 执行指定的函数 (`func` 或 `inner.py`)，并将变更前后的数据作为上下文传递给执行函数。

## 快速开始

### 创建实例元素

#### 目录结构

在 `events/` 目录下创建一个新的事件目录（例如 `UserDataAudit`），标准结构如下：

```text
events/
└── UserDataAudit/           # [目录] 事件元素名称
    ├── e.json               # [文件] 核心配置文件
    ├── inner.py             # [文件] (可选) 内部执行逻辑代码
    └── __init__.py          # [文件] Python 包标识
```

#### e.json文件

```json title="events/UserDataAudit/e.json"
{
  "type": "events.ModelType",
  "title": "用户数据审计",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "funcType": "Inner",
  "asyncType": false,
  "filter": "Q(Q('status', 'status', 'active'))",
  "fields": ["name", "email", "status"],
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### inner.py文件

```python title="events/UserDataAudit/inner.py"
def customFunc(eventOutData):
    """
    函数名必须为 customFunc
    :param eventOutData: JitDict类型，包含事件相关数据
    """
    # 当 `funcType` 为 `Global` 时，无需实现该函数。
    pass
```

#### __init__.py文件

```python title="events/UserDataAudit/__init__.py"
from .inner import customFunc
```

### 元素配置

#### e.json配置

| 字段名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **是** | 固定值 | `"events.ModelType"` |
| `title` | String | **是** | 事件显示名称 | `"用户数据审计"` |
| `sender` | String | **是** | 监听的模型全路径 (fullName) | `"models.UserModel"` |
| `operate` | String | **是** | 触发的操作类型 | `"UpdateAfter"` (见下文枚举) |
| `funcType` | String | 否 | 函数类型：`"Global"` \| `"Inner"` | `"Global"` (默认/推荐) |
| `func` | String | 条件 | 当 `funcType` 为 `"Global"` 时必填，指向服务函数路径 | 如：`"services.AuditSvc.log_change"` |
| `asyncType` | Boolean | 否 | 是否异步执行 | `false` (默认) |
| `filter` | String | 否 | Q表达式筛选条件 | `"Q(Q('status', 'status', 'active'))"` |
| `fields` | Array | 否 | 触发字段列表，空则监听所有字段 | `["name", "email"]` |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用 | `1` (默认) |
| `backendBundleEntry` | String | **是** | 后端加载入口，固定为 `"."` | `"."` |

#### 操作类型枚举 (operate)

*   `AddBefore`: 新增数据前触发
*   `AddAfter`: 新增数据后触发
*   `UpdateBefore`: 修改数据前触发
*   `UpdateAfter`: 修改数据后触发
*   `DeleteBefore`: 删除数据前触发
*   `DeleteAfter`: 删除数据后触发
*   `FieldUpdateAfter`: 任意写操作后触发

## 执行函数

### 函数入参

| 参数名 | JitAI类型 | Python类型 | 说明 |
| :--- | :--- | :--- | :--- |
| `eventOutData` | JitDict | dict | 包含事件上下文数据的字典对象 |

**eventOutData 结构说明**：

*   `model`: (Stext) 模型全名
*   `optType`: (Stext) 操作类型
*   `prevData`: (RowData) 变更前的数据（新增操作时为空）
*   `postData`: (RowData) 变更后的数据（删除操作时为空）

### 函数体

**服务函数（推荐）**

适用于复用已有的 Service 逻辑。

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_change(self, eventOutData):
        """
        :param eventOutData: 事件上下文数据
        """
        post_data = eventOutData.postData.value
        print(f"收到数据变更: {post_data.get('name')}")
```

**事件内置函数**

适用于逻辑仅属于该事件，不需要复用的场景。函数实现在元素目录下的 `inner.py` 中。

```python title="events/UserDataAudit/inner.py"
def customFunc(eventOutData):
    """
    函数名必须为 customFunc
    :param eventOutData: 事件上下文数据
    """
    model = eventOutData.model.value
    opt_type = eventOutData.optType.value
    prev_data = eventOutData.prevData.value
    post_data = eventOutData.postData.value
    
    print(f"模型 {model} 发生 {opt_type} 操作")
    print(f"变更前数据: {prev_data}")
    print(f"变更后数据: {post_data}")
```

## 调试与注意事项

1.  **事务控制**：
    *   `*Before` 事件（如 `UpdateBefore`）通常在数据库事务提交前执行。如果事件函数抛出异常，可能会回滚主操作。
    *   `*After` 事件（如 `UpdateAfter`）通常在数据库操作完成后执行。
    *   如果是异步事件 (`asyncType: true`)，则总是在主操作完成后异步执行，不会阻塞主线程，也不会回滚主操作。

2.  **无限递归**：
    *   如果在 `UpdateAfter` 事件中再次更新了当前模型的同一行数据，且没有通过 `fields` 或 `filter` 进行限制，可能会导致事件死循环触发。
    *   建议在事件处理函数中更新自身模型时特别小心，或者使用 `fields` 属性明确指定只监听特定字段的变更。

3.  **前后数据**：
    *   `prevData` 是修改前的数据快照。
    *   `postData` 是修改后的数据快照。
    *   在 `Add` 操作中，`prevData` 为空；在 `Delete` 操作中，`postData` 为空。
