---
slug: approval-events
description: "审批事件 API 参考文档。完整的规格说明、方法和示例。"
---

# 审批事件

审批事件 (`events.WorkflowType`) 是极态平台中专门处理审批流程状态变更和节点操作的事件处理器。它基于事件驱动机制实现审批流程的自动化响应，负责监听审批状态变更、节点变更和节点处理等关键时机。

审批事件适用于复杂的审批流程自动化场景，例如：

*   **状态联动**：审批通过/拒绝后自动更新业务单据状态
*   **流程分支**：根据节点处理结果触发不同的后续流程
*   **消息通知**：节点变更时通知相关审批人

审批事件元素分层结构为 Meta (`events.Meta`) → Type (`events.WorkflowType`) → 实例，开发者可通过可视化开发工具快捷地创建审批事件实例元素。

**工作原理**：系统监听关联模型 (`model`) 的审批流程，当发生指定的操作 (`operate`)（如状态变更、节点流转）时触发事件。事件会自动执行配置的函数 (`func` 或 `inner.py`)，并将审批行数据 (`row`) 和状态信息 (`status`) 等作为上下文传递给执行函数。

## 快速开始

### 创建实例元素

#### 目录结构

在 `events/` 目录下创建一个新的事件目录（例如 `OrderApprovalEvent`），标准结构如下：

```text
events/
└── OrderApprovalEvent/      # [目录] 事件元素名称
    ├── e.json               # [文件] 核心配置文件
    ├── inner.py             # [文件] (可选) 内部执行逻辑代码
    └── __init__.py          # [文件] Python 包标识
```

#### e.json文件

```json title="events/OrderApprovalEvent/e.json"
{
  "title": "订单审批事件",
  "type": "events.WorkflowType",
  "backendBundleEntry": ".",
  "model": "models.OrderModel",
  "operate": "Process",
  "funcType": "Inner"
}
```

#### inner.py文件

```python title="events/OrderApprovalEvent/inner.py"
def customFunc(eventOutData):
    """
    函数名必须为 customFunc
    :param eventOutData: JitDict类型，包含事件相关数据
    """
    # 当 `funcType` 为 `Global` 时，无需实现该函数。
    pass
```

#### __init__.py文件

```python title="events/OrderApprovalEvent/__init__.py"
from .inner import handleOrderApproval
```

## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | **是** | - | 事件标题 |
| `type` | String | **是** | - | 固定值: `events.WorkflowType` |
| `backendBundleEntry` | String | **是** | - | 后端入口路径，通常为 `"."` |
| `model` | String | **是** | - | 关联的模型 fullName |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用 | `1` (默认) |
| `operate` | String | **是** | - | 操作类型 (见下文枚举) |
| `funcType` | String | 否 | 函数类型：`"Global"` \| `"Inner"` | `"Global"` (默认/推荐) |
| `func` | String | 条件 | 当 `funcType` 为 `"Global"` 时必填，指向服务函数路径 | 如：`"services.AuditSvc.log_approval"` |
| `triggerNode` | List | 否 | `[]` | 触发节点列表（`NodeChange` 时使用） |
| `handleType` | String/List | 否 | - | 处理类型（`NodeHandled` 时使用） |
| `handleNode` | String | 否 | - | 处理节点（`NodeHandled` 时使用） |

### 操作类型枚举 (operate)

*   `Process`: 审批状态变更时触发
*   `NodeChange`: 审批节点变更时触发
*   `NodeHandled`: 审批节点处理完成时触发

#### 1. 审批状态变更事件 (Process)

监听整个审批流程的状态变化。

**常见审批状态 (status)**：
*   `In`: 审批中
*   `Pass`: 已通过
*   `Refuse`: 已拒绝
*   `Refuse`: 已撤回

```json title="审批状态变更事件配置"
{
  "title": "审批状态变更事件",
  "type": "events.WorkflowType",
  "model": "models.OrderModel", 
  "operate": "Process",
  "funcType": "inner"
}
```

#### 2. 节点变更事件 (NodeChange)

监听审批节点的流转变化。

**配置项说明**：
*   `triggerNode`: (List) 触发节点配置列表。支持以下格式：
    *   `after.StartNode`: 发起审批后触发
    *   `before.StartNode`: 回退到发起节点时触发
    *   `before.<nodeId>`: 到达指定节点前触发
    *   `after.<nodeId>`: 指定节点审批后触发

```json title="节点变更事件配置"
{
  "title": "节点变更事件",
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeChange", 
  "triggerNode": ["after.StartNode", "before.approvalNode1", "after.approvalNode1"],
  "funcType": "Inner"
}
```

#### 3. 节点处理事件 (NodeHandled)

监听特定节点的具体审批操作。

**配置项说明**：
*   `handleNode`: (String) 监听的节点 ID。
*   `handleType`: (List) 监听的操作类型列表。

**操作类型 (handleType)**：
*   **发起节点操作**：
    *   `submit`: 提交
    *   `manualEnd`: 撤销流程
*   **审批节点操作**：
    *   `agree`: 同意
    *   `refuse`: 拒绝
    *   `reject`: 回退
    *   `transmit`: 转交

```json title="节点处理事件配置"
{
  "title": "节点处理事件", 
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeHandled",
  "handleNode": "approvalNode",
  "handleType": ["agree", "reject"],
  "funcType": "Inner"
}
```

## 执行函数

### 函数入参

| 参数名 | 说明 |
| :--- | :--- |
| `eventOutData` | 包含事件上下文数据的对象 |

**eventOutData 常用属性说明**：

*   `row`: (RowData) 审批关联的业务数据行对象
*   `status`: (Stext) 当前审批状态 (用于 `Process` 事件)
*   `triggerNode`: (Stext) 触发的节点 ID (用于 `NodeChange` 事件)
*   `NodeHandled`: (Stext) 审批的节点ID (用于 `NodeHandled` 事件)
*   `handleType`: (Stext) 处理动作类型 (用于 `NodeHandled` 事件)

### 函数体

**服务函数（推荐）**

适用于复用已有的 Service 逻辑。

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_approval(self, eventOutData):
        """
        :param eventOutData: 事件上下文数据
        """
        if eventOutData.status.value == 'Pass':
            # 审批通过逻辑
            pass
                
        # NodeChange 事件: 获取触发节点
        if eventOutData.triggerNode.value == 'StartNode':
            # 发起审批后逻辑
            pass

        # NodeHandled 事件: 获取处理动作和节点
        if eventOutData.handleType.value == 'agree':
            # 节点同意逻辑
            pass
```

**事件内置函数**

适用于逻辑仅属于该事件，不需要复用的场景。函数实现在元素目录下的 `inner.py` 中。

```python title="events/OrderApprovalEvent/inner.py"
def customFunc(eventOutData):
    """
    函数名必须为 customFunc
    :param eventOutData: 事件上下文数据
    """
    if eventOutData.status.value == 'Pass':
        # 审批通过逻辑
        pass
            
    # NodeChange 事件: 获取触发节点
    if eventOutData.triggerNode.value == 'StartNode':
        # 发起审批后逻辑
        pass

    # NodeHandled 事件: 获取处理动作和节点
    if eventOutData.handleType.value == 'agree':
        # 节点同意逻辑
        pass
```


## 调试与注意事项

1.  **异常处理与回滚**：
    *   审批事件通常是同步执行的。如果事件处理函数中抛出异常（`raise Exception`），将会中断当前的审批操作（如提交、同意），并向用户返回错误信息。
    *   利用这一特性，可以在审批事件中实现自定义的业务校验逻辑（例如：条件不满足时禁止审批通过）。

2.  **避免死循环**：
    *   在事件中修改业务数据（`row`）并执行 `row.save()` 是常见操作。但这可能会触发该模型上配置的 `ModelEvent`。请确保没有形成逻辑上的闭环。
    *   通常不建议在审批事件中直接调用工作流引擎 API 去变更流程状态（如自动同意下一级），因为这可能导致递归触发审批事件，造成死循环。

3.  **数据持久化**：
    *   `eventOutData.row` 获取的是当前业务数据的对象引用。
    *   如果在事件中修改了 `row` 的字段值，必须显式调用 `row.save()` 才能将修改持久化到数据库。

4.  **日志调试**：
    *   建议使用 `jit.commons.utils.logger` 打印日志，记录关键变量（如 `status`, `row.id`, `handleType`），以便在后台查看事件触发情况和数据流转。