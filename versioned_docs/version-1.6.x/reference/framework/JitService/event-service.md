---
slug: event-service
title: "Event Service Reference"
description: "Event Service Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Event Service"
---
# Event Service
Event service is an event management and triggering service provided by the JitAI platform, implementing event query, monitoring, and manual triggering capabilities. It handles event execution log management, event status tracking, and asynchronous event task processing, supporting unified management of various event types including model events and workflow events.

The event service element is a built-in instance (events.services.EventSvc). Developers can directly obtain the service instance through `app.getElement("events.services.EventSvc")` for calling.

Of course, developers can also create their own Type elements or modify the official `events.services.EventSvc` element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Usage
```python title="Get and Use Event Service"
# Get event service instance
eventSvc = app.getElement("events.services.EventSvc")

# Get event execution logs
result = eventSvc.getEventLog(
    fullName="events.MyEvent",
    startTime="2024-01-01 00:00:00",
    endTime="2024-01-31 23:59:59",
    page=1,
    pageSize=20
)

# Manually trigger event
eventSvc.sendEvent(
    sender="models.UserModel",
    kwargs={"userId": 123, "action": "login"},
    eventType="events.NormalType"
)
```

## Methods
### getEventLog
Get execution log records for specified events, supporting time range and status filtering.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| fullName | Stext | Yes | - | Complete name of event element |
| startTime | Datetime | No | None | Query start time |
| endTime | Datetime | No | None | Query end time |
| status | Stext | No | None | Filter status: success/fail/running/waiting |
| page | Numeric | No | 1 | Page number |
| pageSize | Numeric | No | 20 | Records per page |

#### Return Value
Returns JitDict type containing the following fields:
- `totalCount`: Total record count
- `rowDatas`: Log record list, each record contains detailed information of event execution

#### Usage Example
```python title="Query Event Execution Logs"
eventSvc = app.getElement("events.services.EventSvc")

# Query recent event logs
logs = eventSvc.getEventLog(
    fullName="events.UserLoginEvent",
    page=1,
    pageSize=10
)

# Query failed events within specified time range
failedLogs = eventSvc.getEventLog(
    fullName="events.DataSyncEvent",
    startTime="2024-01-01 00:00:00",
    endTime="2024-01-31 23:59:59",
    status="fail"
)
```

### sendEvent
Manually trigger event execution, used for testing or event calls in special scenarios.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| sender | Stext | Yes | - | Event sender identifier |
| kwargs | JitDict | Yes | - | Event parameter dictionary |
| eventType | Stext | No | events.NormalType | Event type |

#### Return Value
Returns JitDict type execution result.

#### Usage Example
```python title="Manually Trigger Event"
eventSvc = app.getElement("events.services.EventSvc")

# Trigger user login event
result = eventSvc.sendEvent(
    sender="models.UserModel",
    kwargs={
        "userId": 123,
        "loginTime": "2024-01-15 10:30:00",
        "deviceType": "mobile"
    }
)

# Trigger data sync event
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
Get all event logs triggered by a request based on request ID, used for tracking complete event chains.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| requestId | Stext | Yes | - | Unique identifier ID of the request |

#### Return Value
Returns JitDict type event log list.

#### Usage Example
```python title="Query Event Chain by Request ID"
eventSvc = app.getElement("events.services.EventSvc")

# Query complete event chain for a request
requestLogs = eventSvc.getEventLogByRequestId("req_20240115_001")
```

### getEventLogByNodeId
Get all event logs for a specific node and its child nodes based on request ID and node ID.

#### Parameter Details
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| requestId | Stext | Yes | - | Unique identifier ID of the request |
| nodeId | Stext | Yes | - | Unique identifier ID of the node |

#### Return Value
Returns JitDict type node event log list.

#### Usage Example
```python title="Query Event Logs for Specific Node"
eventSvc = app.getElement("events.services.EventSvc")

# Query all events under specific node
nodeLogs = eventSvc.getEventLogByNodeId(
    requestId="req_20240115_001",
    nodeId="node_user_create_001"
)
```

## Properties
Custom event service elements have no public properties currently.

## Advanced Features
### Event Status Monitoring
Implement real-time event status monitoring through event log query functionality.

```python title="Event Status Monitoring Example"
eventSvc = app.getElement("events.services.EventSvc")

def monitorEventStatus(eventFullName, checkInterval=300):
    """
    Monitor event execution status
    :param eventFullName: Event complete name
    :param checkInterval: Check interval (seconds)
    """
    import time
    from datetime import datetime, timedelta
    
    while True:
        # Query event logs from last 5 minutes
        endTime = datetime.now()
        startTime = endTime - timedelta(minutes=5)
        
        logs = eventSvc.getEventLog(
            fullName=eventFullName,
            startTime=startTime.strftime("%Y-%m-%d %H:%M:%S"),
            endTime=endTime.strftime("%Y-%m-%d %H:%M:%S"),
            status="fail"
        )
        
        if logs["totalCount"] > 0:
            print(f"Found {logs['totalCount']} failed events")
            # Logic to handle failed events
        
        time.sleep(checkInterval)
```

### Batch Event Triggering
Implement batch event triggering through loop calls.

```python title="Batch Event Triggering Example"
eventSvc = app.getElement("events.services.EventSvc")

def batchTriggerEvents(eventList):
    """
    Batch trigger events
    :param eventList: Event configuration list
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

# Usage example
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