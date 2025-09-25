---
sidebar_position: 2
slug: date-field-tasks
---

# Date Field Tasks

Date Field Tasks are scheduled tasks that are automatically triggered based on date-time field values in models. When the specified date-time field reaches the set time, the task logic is automatically executed. It is responsible for monitoring date-time fields in model data, automatically triggering execution when field values expire, and providing flexible time offset configuration, supporting precise time control for early or delayed execution.

The Date Field Task element has a hierarchical structure of Meta (tasks.Meta) → Type (tasks.DateFieldType) → Instance. Developers can quickly create date field task instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official tasks.DateFieldType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```
tasks/
└── ExampleDateTask/          # Task name, customizable
    ├── e.json               # Element configuration file
    ├── inner.py             # Task execution logic (optional)
    └── __init__.py          # Package initialization file
```

#### e.json File
```json title="e.json"
{
  "type": "tasks.DateFieldType",
  "title": "Example Date Field Task",
  "funcType": "Inner",
  "modelPath": "models.OrderModel",
  "timerCfg": {
    "startField": "deliveryTime",
    "startOffset": {
      "offsetType": 1,
      "offset": 0,
      "offsetUnit": "hours"
    },
    "repeat": {
      "repeatType": "day",
      "period": 1
    },
    "endTimeType": 0,
    "skipHoliday": 1
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### Business Logic Code
```python title="inner.py"
def main(app, taskInstance, rowData):
    """
    Task execution main function
    
    Args:
        app: Application instance
        taskInstance: Task instance
        rowData: Data row that triggered the task
    """
    # Get order information
    order_id = rowData.id
    delivery_time = rowData.deliveryTime
    
    # Execute business logic
    print(f"Order {order_id} delivery time {delivery_time} has arrived")
    
    # Can call other services for processing
    # service = app.getElement("services.NotificationService")
    # service.sendDeliveryNotification(order_id)
```

#### Usage Example
```python title="Using Date Field Tasks"
# Get task instance
task = app.getElement("tasks.ExampleDateTask")

# Task will automatically monitor deliveryTime field in OrderModel
# When field value reaches the set time, automatically execute main function in inner.py
# System will calculate actual execution time based on timerCfg.startOffset configuration
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| title | string | Yes | - | Task title |
| type | string | Yes | - | Must be `tasks.DateFieldType` |
| funcType | string | Yes | - | Function type, fixed as `Inner` |
| modelPath | string | Yes | - | FullName of target model |
| timerCfg | object | Yes | - | Timer configuration object |
| timerCfg.startField | string | Yes | - | Date-time field name in target model |
| timerCfg.startOffset | object | No | - | Start time offset configuration |
| timerCfg.startOffset.offset | int | No | 0 | Time offset amount, can be negative |
| timerCfg.startOffset.offsetUnit | string | No | hours | Time offset unit: seconds/minutes/hours/days |
| timerCfg.startOffset.offsetType | int | No | 1 | Offset type, fixed as 1 |
| timerCfg.repeat | object | No | - | Repeat configuration |
| timerCfg.endTimeType | int | No | 0 | End time type |
| timerCfg.skipHoliday | int | No | 1 | Whether to skip holidays, 1 skip, 0 don't skip |
| enable | int | No | 1 | Whether to enable, 1 enable, 0 disable |
| backendBundleEntry | string | No | "." | Backend code entry directory |

### Business Configuration File Configuration
Date Field Tasks do not require additional business configuration files, all configuration is completed in e.json.

## Methods
### main
Main method for task execution, defined in inner.py.

#### Parameter Details
| Parameter Name | JitAi Type | Native Type | Required | Description |
|--------|-----------|----------|------|------|
| app | App | object | Yes | Application instance, used to get other elements |
| taskInstance | TaskInstance | object | Yes | Current task instance |
| rowData | RowData | object | Yes | Data row object that triggered the task |

#### Return Value
No return value required, function completion indicates task completion.

#### Usage Example
```python title="Processing Order Delivery Reminders"
def main(app, taskInstance, rowData):
    # Get order data
    order_id = rowData.id
    customer_name = rowData.customerName
    delivery_time = rowData.deliveryTime
    
    # Get notification service
    notification_service = app.getElement("services.NotificationService")
    
    # Send delivery reminder
    notification_service.sendNotification({
        "type": "delivery_reminder",
        "orderId": order_id,
        "customerName": customer_name,
        "deliveryTime": delivery_time
    })
    
    # Update order status
    order_model = app.getElement("models.OrderModel")
    order_model.id = order_id
    order_model.status = "notified"
    order_model.save()
```

## Attributes
### config
Task configuration object, containing all configuration information from e.json, read-only attribute.

### TaskModel
Task model instance, inherited from parent class, used for managing task records.

### TaskHistoryModel
Task history model instance, inherited from parent class, used for recording task execution history.

## Advanced Features
### Time Offset Configuration
Flexible time offset can be achieved through offset and offsetUnit parameters:

#### Early Execution Configuration
```json title="Execute 1 Hour Early"
{
  "type": "tasks.DateFieldType",
  "modelPath": "models.MeetingModel",
  "timerCfg": {
    "startField": "startTime",
    "startOffset": {
      "offsetType": 1,
      "offset": -1,
      "offsetUnit": "hours"
    }
  }
}
```

#### Delayed Execution Configuration
```json title="Execute 30 Minutes Later"
{
  "type": "tasks.DateFieldType",
  "modelPath": "models.TaskModel",
  "timerCfg": {
    "startField": "deadline",
    "startOffset": {
      "offsetType": 1,
      "offset": 30,
      "offsetUnit": "minutes"
    }
  }
}
```

#### Multiple Time Units
```json title="Second-level Offset"
{
  "timerCfg": {
    "startOffset": {
      "offset": 5,
      "offsetUnit": "seconds"
    }
  }
}
```

```json title="Day-level Offset"
{
  "timerCfg": {
    "startOffset": {
      "offset": -1,
      "offsetUnit": "days"
    }
  }
}
```

### Complex Business Logic Processing
```python title="Comprehensive Business Processing Example"
def main(app, taskInstance, rowData):
    # Get related services
    email_service = app.getElement("services.EmailService")
    sms_service = app.getElement("services.SmsService")
    log_service = app.getElement("services.LogService")
    
    try:
        # Record task start
        log_service.info(f"Starting to process delivery reminder for order {rowData.id}")
        
        # Check customer preference settings
        customer_model = app.getElement("models.CustomerModel")
        customer = customer_model.get(f"Q(id={rowData.customerId})", [])
        
        # Choose notification method based on preference
        if customer.notificationPreference == "email":
            email_service.sendDeliveryReminder(rowData)
        elif customer.notificationPreference == "sms":
            sms_service.sendDeliveryReminder(rowData)
        else:
            # Default to email
            email_service.sendDeliveryReminder(rowData)
        
        # Update notification status
        order_model = app.getElement("models.OrderModel")
        order_model.id = rowData.id
        order_model.notificationSent = True
        order_model.notificationTime = app.getElement("datatypes.Datetime")().getValue()
        order_model.save()
        
        log_service.info(f"Delivery reminder for order {rowData.id} sent successfully")
        
    except Exception as e:
        log_service.error(f"Error occurred while processing delivery reminder for order {rowData.id}: {str(e)}")
        raise
```