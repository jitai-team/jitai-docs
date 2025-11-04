---
slug: custom-events
title: "Custom Events Reference"
description: "Custom Events Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Custom Events"
---
# Custom Events
Custom events are freely defined by developers in service elements as needed and triggered in business logic code, providing sufficient flexibility for event-driven system development.

The hierarchical structure of custom event elements is Meta (events.Meta) → Type (events.NormalType) → Instance. Developers can quickly create custom event instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `events.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
Developers need to first [define events in service elements](./custom-business-service#event-definition-and-usage), then create `Custom Event` instance elements to subscribe to events defined in services, and write event business logic code.

### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
events/
├── MyCustomEvent/
│   ├── e.json
│   ├── inner.py (optional, when funcType is Inner)
│   └── __init__.py
```

#### e.json File
```json title="Event Element Definition File"
{
    "type": "events.NormalType",
    "funcType": "Inner",
    "asyncType": false,
    "sender": "services.MyService.CustomEvent",
    "title": "Test Custom Event",
    "backendBundleEntry": ".",
    "returnType": "None",
    "backendEpath": "events/MyCustomEvent/element.pkg",
    "extendType": "self"
}
```

sender: fullName of service element that declares the event.event name

#### Event Logic Code
When `funcType` is `Inner`, create `inner.py` file:

```python title="Internal Event Handler Function"
from datatypes.Meta import datatypes

def customFunc(*args, **kwargs):
    """
    Custom event handler function
    """
    # Business logic implementation
    print("Custom event triggered")
    return True

```

#### Usage Example
```python title="Event Trigger Example"
# sender: fullName of service element that declares the event.event name
app.event.publish(sender="services.MyService.CustomEvent",args=("paramValue"))

```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| type | String | Yes | Fixed value: `events.NormalType` |
| sender | String | Yes | Event sender, format: `service element fullName.event name` |
| funcType | String | Yes | Function type: `Global`/`Inner`, default `Global` |
| func | String | Conditionally required | When `funcType` is `Global`, specify service function to call, value is `element fullName.function name` |
| asyncType | Boolean | No | Whether to execute asynchronously, default `false` |
| enable | Integer | No | Whether enabled, 1 enabled/0 disabled, default `0` |
| objMode | Boolean | No | Object mode, default `false` |
| returnType | String | No | Return value type, default `None` |
| title | String | No | Event display name, default uses `fullName` |
| path | String | No | Relative path of element directory (example: `events`) |
| backendBundleEntry | String | No | Backend bundle entry directory, relative path (example: `.`) |
| backendEpath | String | No | Backend element bundle path (example: `events/testCustomEvents/element.pkg`) |
| extendType | String | No | Inheritance extension type (example: `self`) |

### Business Configuration File
When `funcType` is `Inner`, supports creating independent business logic files:

- **inner.py**: Business logic file containing `customFunc` function
- **__init__.py**: Package initialization file, imports business logic

## Methods
### call
Execute event handler function, record execution time.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| args | Variable arguments | tuple | No | Positional arguments |
| kwargs | Keyword arguments | dict | No | Named arguments |

#### Return Value
Returns execution result of event handler function, type depends on specific business logic.

#### Usage Example
```python title="Event Call Example"
# Get event instance
event = app.getElement("events.MyCustomEvent")

# Call event
result = event.call(
    userId=123,
    action="update",
    data={"name": "张三", "email": "zhangsan@example.com"}
)
```

### getSender
Get event sender identifier.

#### Return Value
Returns string type sender identifier, format: `service element fullName.function name`

#### Usage Example
```python title="Get Sender Example"
event = app.getElement("events.MyCustomEvent")
sender = event.getSender()
print(f"Event sender: {sender}")
```

### isValid
Check if event is valid, can be overridden in subclasses to implement custom validation logic.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| args | Variable arguments | tuple | No | Validation parameters |
| kwargs | Keyword arguments | dict | No | Validation parameters |

#### Return Value
Returns boolean value, True means event is valid, False means invalid.

#### Usage Example
```python title="Event Validity Check"
event = app.getElement("events.MyCustomEvent")
if event.isValid(userId=123):
    result = event.call(userId=123, action="process")
```

### handleNode
Process event node, triggered before executing event function, can preprocess node and parameters.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| node | Object | object | Yes | Event node object |
| args | Variable arguments | tuple | No | Original parameters |
| kwargs | Keyword arguments | dict | No | Original parameters |

#### Return Value
Returns tuple containing three elements: (processed node, processed args, processed kwargs)

#### Usage Example
```python title="Node Processing Example"
# Override handleNode method in custom event class
def handleNode(self, node, *args, **kwargs):
    # Add timestamp
    kwargs['timestamp'] = datetime.now()
    
    # Log record
    print(f"Process event node: {node}, parameters: {args}, {kwargs}")
    
    return node, args, kwargs
```

### createTask
Create asynchronous task, used when event is configured for asynchronous execution.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| taskParams | JitDict | dict | Yes | Task parameters, must be serializable |
| nodeId | Stext | str | Yes | Node ID that triggered the event |
| requestId | Stext | str | Yes | Request ID, used for log positioning |

#### Usage Example
```python title="Create Asynchronous Task Example"
# Construct task parameters
taskParams = {
    "userId": 123,
    "action": "processData",
    "data": {"key": "value"}
}

# Create asynchronous task
event.createTask(
    taskParams=taskParams,
    nodeId="node_001",
    requestId="req_12345"
)
```

## Properties
### name
Complete name (fullName) of the event.

### sender
Event sender identifier, format: `service element fullName.function name`

### funcType
Function type, optional values:
- `Global`: Call global service function
- `Inner`: Call internal custom function

### func
When funcType is Global, specifies service function name to call.

### asyncType
Whether to execute asynchronously, boolean value.

### enable
Whether event is enabled, 1 means enabled, 0 means disabled.

### objMode
Object mode, when true, event parameters will be wrapped in obj object for passing.

### callTime
Last time the event was called, datetime type.

## Advanced Features
### Asynchronous Event Processing
Configure `asyncType` to `true` to enable asynchronous event execution:

```json title="Asynchronous Event Configuration"
{
  "type": "events.NormalType",
  "title": "Asynchronous Processing Event",
  "sender": "services.DataProcessor.asyncProcess",
  "funcType": "Global",
  "func": "handleAsyncData",
  "asyncType": true,
  "enable": 1
}
```

### Object Mode Parameter Passing
Enable `objMode` to wrap all parameters in obj object:

```json title="Object Mode Configuration"
{
  "type": "events.NormalType",
  "title": "Object Mode Event",
  "sender": "services.ObjectHandler.processObject",
  "funcType": "Inner",
  "objMode": true,
  "enable": 1
}
```

### Event Chain Calling
Event engine enables event chain calling and complex business logic:

```python title="Event Chain Calling Example"
# Get event service
eventSvc = app.getElement("events.services.EventSvc")

# Trigger event chain
eventSvc.callEvent("events.DataValidation", data=inputData)
eventSvc.callEvent("events.DataProcessing", data=validatedData)
eventSvc.callEvent("events.DataStorage", data=processedData)
```

### Custom Event Validation
Override `isValid` method to implement custom validation logic:

```python title="Custom Validation Logic"
def customFunc(*args, **kwargs):
    # Get user ID
    userId = kwargs.get('userId')
    
    # Business validation
    if not userId or userId <= 0:
        return False
    
    # Permission check
    userService = app.getElement("services.UserService")
    if not userService.hasPermission(userId, "process_data"):
        return False
    
    # Execute business logic
    print(f"User {userId} triggered data processing event")
    return True
```