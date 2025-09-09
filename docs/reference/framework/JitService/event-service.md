---
slug: event-service
---
# 事件服务
事件服务是JitAi平台提供的事件管理和触发服务，实现事件的查询、监控和手动触发能力。它负责事件执行日志的管理、事件状态的追踪和异步事件任务的处理，支持模型事件、工作流事件等多种事件类型的统一管理。

事件服务元素为内置实例（events.services.EventSvc），开发者可通过`app.getElement("events.services.EventSvc")`直接获取服务实例进行调用。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.services.EventSvc元素，以实现自己的封装。

## 快速开始 
### 基本使用
```python title="获取并使用事件服务"
# 获取事件服务实例
eventSvc = app.getElement("events.services.EventSvc")

# 获取事件执行日志
result = eventSvc.getEventLog(
    fullName="events.MyEvent",
    startTime="2024-01-01 00:00:00",
    endTime="2024-01-31 23:59:59",
    page=1,
    pageSize=20
)

# 手动触发事件
eventSvc.sendEvent(
    sender="models.UserModel",
    kwargs={"userId": 123, "action": "login"},
    eventType="events.NormalType"
)
```

## 方法 
### getEventLog
获取指定事件的执行日志记录，支持时间范围和状态筛选。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| fullName | Stext | 是 | - | 事件元素的完整名称 |
| startTime | Datetime | 否 | None | 查询开始时间 |
| endTime | Datetime | 否 | None | 查询结束时间 |
| status | Stext | 否 | None | 筛选状态：success/fail/running/waiting |
| page | Numeric | 否 | 1 | 页码 |
| pageSize | Numeric | 否 | 20 | 每页记录数 |

#### 返回值
返回JitDict类型，包含以下字段：
- `totalCount`：总记录数
- `rowDatas`：日志记录列表，每条记录包含事件执行的详细信息

#### 使用示例
```python title="查询事件执行日志"
eventSvc = app.getElement("events.services.EventSvc")

# 查询最近的事件日志
logs = eventSvc.getEventLog(
    fullName="events.UserLoginEvent",
    page=1,
    pageSize=10
)

# 查询指定时间范围内失败的事件
failedLogs = eventSvc.getEventLog(
    fullName="events.DataSyncEvent",
    startTime="2024-01-01 00:00:00",
    endTime="2024-01-31 23:59:59",
    status="fail"
)
```

### sendEvent
手动触发事件执行，用于测试或特殊场景下的事件调用。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| sender | Stext | 是 | - | 事件发送者标识 |
| kwargs | JitDict | 是 | - | 事件参数字典 |
| eventType | Stext | 否 | events.NormalType | 事件类型 |

#### 返回值
返回JitDict类型的执行结果。

#### 使用示例
```python title="手动触发事件"
eventSvc = app.getElement("events.services.EventSvc")

# 触发用户登录事件
result = eventSvc.sendEvent(
    sender="models.UserModel",
    kwargs={
        "userId": 123,
        "loginTime": "2024-01-15 10:30:00",
        "deviceType": "mobile"
    }
)

# 触发数据同步事件
syncResult = eventSvc.sendEvent(
    sender="services.DataService",
    kwargs={
        "dataType": "user",
        "syncMode": "incremental"
    },
    eventType="events.ModelType"
)
```

### getEventLogByRequestId
根据请求ID获取该次请求触发的所有事件日志，用于追踪完整的事件链。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| requestId | Stext | 是 | - | 请求的唯一标识ID |

#### 返回值
返回JitDict类型的事件日志列表。

#### 使用示例
```python title="根据请求ID查询事件链"
eventSvc = app.getElement("events.services.EventSvc")

# 查询某次请求的完整事件链
requestLogs = eventSvc.getEventLogByRequestId("req_20240115_001")
```

### getEventLogByNodeId
根据请求ID和节点ID获取特定节点及其子节点的所有事件日志。

#### 参数详解
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| requestId | Stext | 是 | - | 请求的唯一标识ID |
| nodeId | Stext | 是 | - | 节点的唯一标识ID |

#### 返回值
返回JitDict类型的节点事件日志列表。

#### 使用示例
```python title="查询特定节点的事件日志"
eventSvc = app.getElement("events.services.EventSvc")

# 查询特定节点下的所有事件
nodeLogs = eventSvc.getEventLogByNodeId(
    requestId="req_20240115_001",
    nodeId="node_user_create_001"
)
```

## 属性
自定义事件服务元素暂无公开属性。

## 高级特性
### 事件状态监控
通过事件日志查询功能实现事件状态的实时监控。

```python title="事件状态监控示例"
eventSvc = app.getElement("events.services.EventSvc")

def monitorEventStatus(eventFullName, checkInterval=300):
    """
    监控事件执行状态
    :param eventFullName: 事件完整名称
    :param checkInterval: 检查间隔（秒）
    """
    import time
    from datetime import datetime, timedelta
    
    while True:
        # 查询最近5分钟的事件日志
        endTime = datetime.now()
        startTime = endTime - timedelta(minutes=5)
        
        logs = eventSvc.getEventLog(
            fullName=eventFullName,
            startTime=startTime.strftime("%Y-%m-%d %H:%M:%S"),
            endTime=endTime.strftime("%Y-%m-%d %H:%M:%S"),
            status="fail"
        )
        
        if logs["totalCount"] > 0:
            print(f"发现{logs['totalCount']}个失败事件")
            # 处理失败事件的逻辑
        
        time.sleep(checkInterval)
```

### 批量事件触发
通过循环调用实现批量事件触发。

```python title="批量事件触发示例"
eventSvc = app.getElement("events.services.EventSvc")

def batchTriggerEvents(eventList):
    """
    批量触发事件
    :param eventList: 事件配置列表
    """
    results = []
    for eventConfig in eventList:
        try:
            result = eventSvc.sendEvent(
                sender=eventConfig["sender"],
                kwargs=eventConfig["kwargs"],
                eventType=eventConfig.get("eventType", "events.NormalType")
            )
            results.append({
                "success": True,
                "config": eventConfig,
                "result": result
            })
        except Exception as e:
            results.append({
                "success": False,
                "config": eventConfig,
                "error": str(e)
            })
    return results

# 使用示例
events = [
    {
        "sender": "models.UserModel",
        "kwargs": {"userId": 1, "action": "login"}
    },
    {
        "sender": "models.OrderModel", 
        "kwargs": {"orderId": 100, "status": "paid"}
    }
]

batchResults = batchTriggerEvents(events)
``` 