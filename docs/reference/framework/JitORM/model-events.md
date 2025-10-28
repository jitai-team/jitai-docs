---
slug: model-events
title: "Model Events Reference"
description: "Model Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Model Events"
---
# Model Events
Model events are event mechanisms that automatically trigger based on model data operations, implementing data change monitoring and response based on event subscription-publish patterns. They are responsible for monitoring model CRUD operations, providing rich trigger timing options and supporting conditional filtering with field-level trigger control, supporting both synchronous and asynchronous execution modes, suitable for data auditing, business rule execution, message notification, and other scenarios.

The hierarchical structure of model event elements is Meta (events.Meta) → Type (events.ModelType) → Instance. Developers can quickly create model event instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `events.ModelType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
events/
└── UserDataAudit/           # User data audit event
    ├── e.json              # Event configuration file
    ├── inner.py            # Internal function implementation (when funcType is Inner)
    └── __init__.py         # Package initialization file
```

```json title="e.json - Event Configuration File"
{
  "type": "events.ModelType",
  "title": "User Data Audit",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "funcType": "Inner",
  "asyncType": false,
  "filter": "Q(status='active')",
  "fields": ["name", "email", "status"],
  "enable": 1,
  "backendBundleEntry": "."
}
```

```python title="inner.py - Event Handler Function"
def customFunc(eventOutData):
    """
    User data change audit
    
    Args:
        eventOutData: JitDict type, contains event-related data
    """
    model = eventOutData.model.value
    opt_type = eventOutData.optType.value
    prev_data = eventOutData.prevData.value
    post_data = eventOutData.postData.value
    
    print(f"Model {model} performed {opt_type} operation")
    print(f"Data before change: {prev_data}")
    print(f"Data after change: {post_data}")
```

```python title="__init__.py"
from .inner import customFunc
```

### Configuration Properties Description
| Property Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| type | string | Fixed value `events.ModelType` | - | Yes |
| title | string | Event title | - | Yes |
| sender | string | FullName of monitored model | - | Yes |
| operate | string | Operation type, see operation type enumeration | - | Yes |
| funcType | string | Function type: `Global` &#124; `Inner` | `Global` | No |
| func | string | Global function path (required when funcType is Global) | - | No |
| asyncType | boolean | Whether to execute asynchronously | `false` | No |
| filter | string | Q expression filter condition | - | No |
| fields | array | Trigger field list, empty means monitor all fields | `[]` | No |
| enable | number | Whether enabled: 1 enabled, 0 disabled | `1` | No |

**Operation Type Enumeration**:
- `AddBefore` - Trigger before adding data
- `AddAfter` - Trigger after adding data  
- `UpdateBefore` - Trigger before updating data
- `UpdateAfter` - Trigger after updating data
- `DeleteBefore` - Trigger before deleting data
- `DeleteAfter` - Trigger after deleting data
- `FieldUpdateAfter` - Trigger after any write operation

## Methods
### getSender
Get the real sender identifier of the event.

#### Return Value
| Type | Description |
|------|------|
| string | Sender identifier in format `{modelFullName}_{operate}` |

#### Usage Example
```python title="Get Event Sender"
# In event handler function
user_event = app.getElement("events.UserDataAudit")
sender = user_event.getSender()
print(f"Event sender: {sender}")  # Output: models.UserModel_UpdateAfter
```

### isValid
Check whether the event should trigger, comprehensively validating filter conditions and field change conditions.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| rowObj | object | Row data object containing prevData and postData | `None` | No |

#### Return Value
| Type | Description |
|------|------|
| boolean | `True` means should trigger event, `False` means not trigger |

#### Usage Example
```python title="Event Validity Check"
# Simulate row data object
row_obj = type('obj', (), {
    'value': {
        'model': 'models.UserModel',
        'prevData': {'id': 1, 'name': '张三', 'status': 'inactive'},
        'postData': {'id': 1, 'name': '张三', 'status': 'active'}
    }
})()

user_event = app.getElement("events.UserDataAudit")
is_valid = user_event.isValid(row_obj)
print(f"Whether event triggers: {is_valid}")
```

### isFilterValid
Validate whether filter conditions are satisfied.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| rowObj | object | Row object containing data | `None` | No |

#### Return Value
| Type | Description |
|------|------|
| boolean | Whether filter conditions are satisfied |

### isFieldValid
Validate whether field change conditions are satisfied.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| rowObj | object | Row object containing data | `None` | No |

#### Return Value
| Type | Description |
|------|------|
| boolean | Whether field change conditions are satisfied |

### buildEmptyDict
Build empty dictionary structure of the model, containing all model fields with None values.

#### Return Value
| Type | Description |
|------|------|
| dict | Empty dictionary containing all model fields |

#### Usage Example
```python title="Build Empty Dictionary"
user_event = app.getElement("events.UserDataAudit")
empty_dict = user_event.buildEmptyDict()
print(empty_dict)  # {'id': None, 'name': None, 'email': None, 'status': None}
```

### call
Execute event function and record execution time.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| *args | any | Positional arguments passed to event function | - | No |
| **kwargs | any | Keyword arguments passed to event function | - | No |

#### Return Value
| Type | Description |
|------|------|
| any | Return value of event function |

#### Usage Example
```python title="Manually Call Event"
user_event = app.getElement("events.UserDataAudit")

# Construct event data
event_data = app.newVariable({
    "name": "eventOutData",
    "title": "Event Data",
    "dataType": "JitDict",
    "variableList": [
        {"name": "model", "title": "Model", "dataType": "Stext"},
        {"name": "optType", "title": "Operation Type", "dataType": "Stext"},
        {"name": "prevData", "title": "Data Before Change", "dataType": "RowData"},
        {"name": "postData", "title": "Data After Change", "dataType": "RowData"}
    ]
})

event_data.value = {
    "model": "models.UserModel",
    "optType": "UpdateAfter",
    "prevData": {"id": 1, "name": "张三"},
    "postData": {"id": 1, "name": "李四"}
}

# Call event
result = user_event.call(event_data)
```

### handleNode
Process event node before executing event function, allowing customized operations on the node.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| node | object | Event node object | - | Yes |
| *args | any | Event function arguments | - | No |
| **kwargs | any | Event function keyword arguments | - | No |

#### Return Value
| Type | Description |
|------|------|
| tuple | Tuple containing processed (node, args, kwargs) |

### buildTaskParams
Construct asynchronous task parameters, serializing event parameters into storable format.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| *args | any | Event function arguments | - | No |
| **kwargs | any | Event function keyword arguments | - | No |

#### Return Value
| Type | Description |
|------|------|
| dict | Serialized task parameters |

### recoverTaskParams
Recover event function parameters from task parameters.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| taskParam | dict | Task parameter dictionary | - | Yes |

#### Return Value
| Type | Description |
|------|------|
| tuple | Tuple containing recovered (args, kwargs) |

### createTask
Create asynchronous event task.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| taskParams | dict | Task parameters | - | Yes |
| nodeId | string | Event node ID | - | Yes |
| requestId | string | Request ID | - | Yes |

## Properties
### name
Event fullName identifier, read-only property.

### sender
FullName of monitored model, read-only property.

### funcType
Function type, optional values are `Global` or `Inner`, read-only property.

### func
Global function path specified when funcType is Global, read-only property.

### type
Event type, fixed as `events.ModelType`, read-only property.

### enable
Whether event is enabled, 1 for enabled, 0 for disabled, read-only property.

### title
Event display title, read-only property.

### asyncType
Whether to execute event asynchronously, read-only property.

### callTime
Last execution time of event, may be None (never executed), read-only property.

### operate
Monitored operation type, corresponding to EventTypeEnum enumeration value, read-only property.

### filterQ
Q expression filter condition string, read-only property.

### fields
Specified trigger field list, empty list means monitor all fields, read-only property.

## Advanced Features
### Conditional Filtering and Field Monitoring
Model events support precise trigger control, achieving accurate event response through filter conditions and field monitoring.

```json title="Advanced Filter Configuration"
{
  "type": "events.ModelType",
  "title": "VIP User Status Change Monitoring",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "filter": "Q(user_type='vip') & Q(status__in=['active', 'inactive'])",
  "fields": ["status", "level"],
  "funcType": "Global",
  "func": "services.NotificationSvc.sendVipStatusAlert",
  "asyncType": true
}
```

### Asynchronous Event Processing
For complex business logic or time-consuming operations, asynchronous execution can be enabled to avoid blocking the main process.

```python title="Asynchronous Event Handler Function"
def customFunc(eventOutData):
    """
    Asynchronously process user data synchronization
    """
    import time
    
    user_data = eventOutData.postData.value
    print(f"Start synchronizing user data: {user_data['name']}")
    
    # Simulate time-consuming operation
    time.sleep(2)
    
    # Call external API to synchronize data
    sync_service = app.getElement("services.DataSyncSvc")
    sync_service.syncUserToThirdParty(user_data)
    
    print(f"User data synchronization completed: {user_data['name']}")
```

### Multi-Model Event Coordination
Implement complex business process control by combining multiple model events.

```json title="Order Status Change Event"
{
  "type": "events.ModelType", 
  "title": "Inventory Update After Order Completion",
  "sender": "models.OrderModel",
  "operate": "UpdateAfter",
  "filter": "Q(status='completed')",
  "fields": ["status"],
  "funcType": "Global", 
  "func": "services.InventorySvc.updateStock"
}
```

```json title="Inventory Change Notification Event"
{
  "type": "events.ModelType",
  "title": "Low Stock Warning",
  "sender": "models.InventoryModel", 
  "operate": "UpdateAfter",
  "filter": "Q(quantity__lt=10)",
  "fields": ["quantity"],
  "funcType": "Global",
  "func": "services.AlertSvc.sendLowStockWarning"
}
```