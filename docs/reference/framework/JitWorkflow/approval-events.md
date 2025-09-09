---
slug: approval-events
---
# 审批事件 {#approval-events}
审批事件是极态平台中专门处理审批流程状态变更和节点操作的事件处理器，基于事件驱动机制实现审批流程的自动化响应。它负责监听审批状态变更、节点变更和节点处理等关键时机，并自动执行预定义的业务逻辑，支持复杂的审批流程自动化场景。

审批事件元素分层结构为Meta（events.Meta） → Type（events.WorkflowType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建审批事件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.WorkflowType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="审批事件实例元素目录结构"
events/
└── myApprovalEvent/           # 事件元素名称，路径可自定义
    ├── e.json                 # 元素配置文件
    └── inner.py               # 事件处理逻辑（可选）
```

#### e.json文件
```json title="基础配置示例"
{
  "title": "订单审批事件",
  "type": "events.WorkflowType",
  "backendBundleEntry": ".",
  "model": "models.OrderModel",
  "operate": "Process",
  "func": "inner.handleOrderApproval",
  "funcType": "inner"
}
```

#### 业务逻辑代码
```python title="inner.py事件处理逻辑"
from jit.commons.utils.logger import log

def handleOrderApproval(eventOutData):
    """
    处理订单审批事件
    
    参数:
        eventOutData: 事件输出数据，包含row(审批行数据)和status(审批状态)
    """
    try:
        row = eventOutData.row
        status = eventOutData.status.value
        
        log.info(f"订单{row.orderNo.value}审批状态变更为: {status}")
        
        # 根据审批状态执行不同逻辑
        if status == "approved":
            # 审批通过后的业务逻辑
            processApprovedOrder(row)
        elif status == "rejected":
            # 审批拒绝后的业务逻辑
            processRejectedOrder(row)
            
    except Exception as e:
        log.exception(f"处理订单审批事件异常: {e}")
        raise

def processApprovedOrder(row):
    """处理审批通过的订单"""
    # 更新订单状态
    row.status.value = "processing"
    row.save()

def processRejectedOrder(row):
    """处理审批拒绝的订单"""
    # 更新订单状态
    row.status.value = "cancelled"
    row.save()
```

#### 调用示例
```python title="事件自动触发示例"
# 审批事件通过审批流程自动触发，无需手动调用
# 当审批状态发生变更时，系统会自动执行配置的事件处理逻辑
# 获取事件元素（用于配置管理）
approvalEvent = app.getElement("events.myApprovalEvent")
```

## 元素配置
### e.json配置
| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | String | 是 | - | 事件标题 |
| type | String | 是 | - | 固定值: events.WorkflowType |
| backendBundleEntry | String | 是 | - | 后端入口路径，通常为"." |
| model | String | 是 | - | 关联的模型fullName |
| operate | String | 是 | - | 操作类型: Process/NodeChange/NodeHandled |
| func | String | 是 | - | 事件处理函数 |
| funcType | String | 是 | - | 函数类型: inner/global |
| triggerNode | List | 否 | [] | 触发节点列表（NodeChange时使用） |
| handleType | String/List | 否 | - | 处理类型（NodeHandled时使用） |
| handleNode | String | 否 | - | 处理节点（NodeHandled时使用） |

### 操作类型详解
```json title="审批状态变更事件配置"
{
  "title": "审批状态变更事件",
  "type": "events.WorkflowType",
  "model": "models.OrderModel", 
  "operate": "Process",
  "func": "inner.handleStatusChange",
  "funcType": "inner"
}
```

```json title="节点变更事件配置"
{
  "title": "节点变更事件",
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeChange", 
  "triggerNode": ["node1", "node2"],
  "func": "inner.handleNodeChange",
  "funcType": "inner"
}
```

```json title="节点处理事件配置"
{
  "title": "节点处理事件", 
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeHandled",
  "handleType": ["agree", "reject"],
  "handleNode": "approvalNode",
  "func": "inner.handleNodeProcessed",
  "funcType": "inner"
}
```

## 方法 
### getSender
获取事件发送者信息。

#### 返回值
| 类型 | 说明 |
|------|------|
| Any | 事件发送者对象 |

#### 使用示例
```python title="获取事件发送者"
def handleApprovalEvent(eventOutData):
    event = app.getElement("events.myApprovalEvent")
    sender = event.getSender()
    log.info(f"事件发送者: {sender}")
```

### isValid
验证事件是否符合触发条件。

#### 参数详解
| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| *args | Tuple | 是 | 事件参数元组 |
| **kwargs | Dict | 否 | 事件关键字参数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Boolean | True表示事件有效，False表示无效 |

#### 使用示例
```python title="验证事件有效性"
def customEventHandler(eventOutData, *args):
    event = app.getElement("events.myApprovalEvent") 
    if event.isValid(eventOutData, *args):
        # 执行事件处理逻辑
        processEvent(eventOutData)
```

### handleNode
处理事件节点，设置节点信息和调整参数。

#### 参数详解
| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| node | Object | 是 | 事件节点对象 |
| *args | Tuple | 是 | 事件参数 |
| **kwargs | Dict | 否 | 关键字参数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Tuple | 返回(node, args, kwargs)元组 |

### buildTaskParams
构建任务参数，用于异步任务处理。

#### 参数详解
| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| *args | Tuple | 是 | 事件参数 |
| **kwargs | Dict | 否 | 关键字参数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Dict | 任务参数字典，包含row、status、modelFullName |

### recoverTaskParams
从任务参数恢复事件参数。

#### 参数详解
| 参数名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| taskParams | Dict | 是 | 任务参数字典 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Tuple | 返回(args, kwargs)元组 |

## 属性
### operate
事件操作类型，定义事件的触发条件和处理方式。

| 值 | 说明 |
|----|------|
| Process | 审批状态变更时触发 |
| NodeChange | 审批节点变更时触发 |
| NodeHandled | 审批节点处理完成时触发 |

### config
事件配置信息，包含e.json中定义的所有配置参数。

## 高级特性
### 多节点触发配置
```json title="配置多个触发节点"
{
  "title": "多节点触发事件",
  "type": "events.WorkflowType", 
  "model": "models.ContractModel",
  "operate": "NodeChange",
  "triggerNode": ["deptApproval", "managerApproval", "directorApproval"],
  "func": "inner.handleMultiNodeChange",
  "funcType": "inner"
}
```

```python title="多节点事件处理"
def handleMultiNodeChange(eventOutData, triggerNode):
    """
    处理多节点变更事件
    
    参数:
        eventOutData: 事件数据
        triggerNode: 触发的节点ID
    """
    if triggerNode == "deptApproval":
        # 部门审批节点逻辑
        handleDeptApproval(eventOutData)
    elif triggerNode == "managerApproval": 
        # 经理审批节点逻辑
        handleManagerApproval(eventOutData)
    elif triggerNode == "directorApproval":
        # 总监审批节点逻辑
        handleDirectorApproval(eventOutData)
```

### 多处理类型配置
```json title="配置多种处理类型"
{
  "title": "多处理类型事件",
  "type": "events.WorkflowType",
  "model": "models.LeaveModel", 
  "operate": "NodeHandled",
  "handleType": ["agree", "reject", "transfer"],
  "handleNode": "hrApproval",
  "func": "inner.handleMultipleActions",
  "funcType": "inner"
}
```

```python title="多处理类型事件处理"
def handleMultipleActions(eventOutData, handleType, nodeId, nodeTitle):
    """
    处理多种处理类型事件
    
    参数:
        eventOutData: 事件数据
        handleType: 处理类型
        nodeId: 节点ID
        nodeTitle: 节点标题
    """
    row = eventOutData.row
    
    if handleType == HandleTypeEnum.agree:
        # 同意处理逻辑
        processApproval(row, "approved")
    elif handleType == HandleTypeEnum.reject:
        # 拒绝处理逻辑  
        processApproval(row, "rejected")
    elif handleType == HandleTypeEnum.transfer:
        # 转办处理逻辑
        processTransfer(row, nodeTitle)
```

### 全局函数调用配置
```json title="调用全局服务函数"
{
  "title": "全局函数事件",
  "type": "events.WorkflowType",
  "model": "models.InvoiceModel",
  "operate": "Process", 
  "func": "services.NotificationSvc.sendApprovalNotification",
  "funcType": "global"
}
```
