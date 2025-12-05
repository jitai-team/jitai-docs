---
slug: custom-events
description: "Custom Events API Reference. Complete specifications, methods, and examples."
---

# Custom Events

Custom events (`events.NormalType`) are freely defined by developers within service elements according to requirements and are actively triggered within business logic code. They provide a high degree of flexibility for developing event-driven systems.

Custom events are suitable for scenarios such as decoupling business logic, asynchronous task processing, and cross-service communication. For example:

*   **Business Decoupling**: After a user registers, an event is triggered to send an email and SMS. The registration logic does not need to be concerned with the notification details.
*   **Asynchronous Processing**: Trigger a time-consuming data analysis task, return a response immediately, and execute the task asynchronously in the background.
*   **Extension Mechanism**: Allow third-party modules to subscribe to core business events for functional extension.

The hierarchical structure of custom event elements is Meta (`events.Meta`) → Type (`events.NormalType`) → Instance. Developers can quickly create custom event instance elements using visual development tools.

## Quick Start

### Prerequisites

Developers must first **define the event within a service element** before creating a `Custom Event` instance element to subscribe to that event.
See: [Event Definition in Service Elements](./custom-business-service#event-definition-and-usage)

### Creating Instance Elements  {#subscribe-custom-event}

#### Directory Structure

Create a new event directory (e.g., `MyCustomEvent`) under the `events/` directory. The standard structure is as follows:

```text
events/
└── MyCustomEvent/           # [Directory] Event element name
    ├── e.json               # [File] Core configuration file
    ├── inner.py             # [File] (Optional) Internal execution logic code
    └── __init__.py          # [File] Python package identifier
```

#### e.json

```json title="events/MyCustomEvent/e.json"
{
  "type": "events.NormalType",
  "title": "Test Custom Event",
  "sender": "services.MyService.CustomEvent",
  "funcType": "Inner",
  "asyncType": false,
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### inner.py

```python title="events/MyCustomEvent/inner.py"
def customFunc(*args, **kwargs):
    """
    Function name must be customFunc
    :param args: Positional arguments
    :param kwargs: Keyword arguments
    """
    # When `funcType` is `Global`, this function does not need to be implemented.
    # Business logic implementation
    print(f"Custom event triggered: args={args}, kwargs={kwargs}")
    return True
```

#### \_\_init\_\_.py

```python title="events/MyCustomEvent/__init__.py"
from .inner import customFunc
```

## Element Configuration

### e.json Configuration

| Field Name | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **Yes** | Fixed value | `"events.NormalType"` |
| `title` | String | No | Event display name | `"Test Custom Event"` |
| `sender` | String | **Yes** | Event sender, format: `service element fullName.event name` | `"services.MyService.CustomEvent"` |
| `funcType` | String | No | Function type: `"Global"` \| `"Inner"` | `"Global"` (Default/Recommended) |
| `func` | String | Conditional | Required when `funcType` is `"Global"`. Points to the service function path | `"services.NotifySvc.send_email"` |
| `asyncType` | Boolean | No | Whether to execute asynchronously | `false` (Default) |
| `objMode` | Boolean | No | Object mode. If enabled, parameters are wrapped in `obj` | `false` (Default) |
| `enable` | Integer | No | 1: Enabled, 0: Disabled | `1` (Default) |
| `backendBundleEntry` | String | **Yes** | Backend load entry, fixed as `"."` | `"."` |
| `returnType` | String | No | Return value type | `"None"` |
| `path` | String | No | Relative path of the element directory | `"events"` |
| `extendType` | String | No | Inheritance extension type | `"self"` |


## Execution Function

### Function Arguments

Input parameters vary based on the `objMode` configuration.

#### Normal Mode (`objMode: false`)

| Parameter Name | Type | Description |
| :--- | :--- | :--- |
| `args` | tuple | Positional arguments |
| `kwargs` | dict | Keyword arguments |

#### Object Mode (`objMode: true`)

| Parameter Name | Type | Description |
| :--- | :--- | :--- |
| `obj` | dict | Dictionary object containing all parameters |

### Function Body

#### Service Function (Recommended)

Suitable for reusing existing Service logic. Set `funcType` to `"Global"` and `func` to point to the Service function.

```python title="services/NotifySvc/service.py"
from services.NormalType import NormalService

class NotifySvc(NormalService):
    def send_email(self, *args, **kwargs):
        email = kwargs.get('email')
        print(f"Sending email to: {email}")
```

#### Event Internal Function

Suitable when the logic belongs exclusively to this event. Set `funcType` to `"Inner"` and implement it in `inner.py`.

```python title="events/MyCustomEvent/inner.py"
def customFunc(*args, **kwargs):
    """
    Function name must be customFunc
    """
    # Business logic
    print("Custom event logic execution")
    return True
```
