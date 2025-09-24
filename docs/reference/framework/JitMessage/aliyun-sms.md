---
slug: aliyun-sms
---
# Alibaba Cloud SMS
Alibaba Cloud SMS is an enterprise-level SMS notification service based on Alibaba Cloud SMS API, implementing SMS business scenarios such as verification code sending and notification reminders through the standard sendMessage interface. It integrates Alibaba Cloud SMS API, supports AccessKey authentication and signature verification mechanisms, provides complete error handling and log monitoring, ensuring message delivery reliability.

The hierarchical structure of Alibaba Cloud SMS elements is Meta (SMS.Meta) → Type (SMS.Aliyun) → Instance. Developers can quickly create Alibaba Cloud SMS instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `SMS.Aliyun` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
SMS/
└── YourSmsName/          # Custom SMS instance name
    ├── e.json            # Element declaration file
    └── sms.json          # Alibaba Cloud SMS configuration file
```

#### e.json File
```json title="Element Declaration File"
{
  "title": "My Alibaba Cloud SMS",
  "type": "SMS.Aliyun",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="sms.json Configuration File"
{
  "accessKey": "your_access_key",
  "accessSecret": "your_access_secret", 
  "verifySign": "your_signature"
}
```

#### Usage Example
```python title="Send SMS Example"
# Get SMS element instance
sms_element = app.getElement("SMS.YourSmsName")

# Send SMS
result = sms_element.sendMessage(
    phoneList=["13800138000", "13900139000"],
    params={"code": "123456"},
    verifyTemplateCode="SMS_123456789"
)
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value "SMS.Aliyun" |
| backendBundleEntry | string | Yes | Fixed value "." |

### Business Configuration File
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| accessKey | string | Yes | Alibaba Cloud AccessKey |
| accessSecret | string | Yes | Alibaba Cloud AccessSecret |
| verifySign | string | Yes | SMS signature, needs to be applied in Alibaba Cloud console |

## Methods
### sendMessage
Send SMS interface, sends SMS messages by passing phone number list, template parameters, and template code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| phoneList | JitList | list | Yes | Phone number list, each phone number in string format |
| params | JitDict | dict | Yes | SMS template parameters, key-value pair format |
| verifyTemplateCode | Stext | str | Yes | Alibaba Cloud SMS template code, needs to be passed in extend parameter |

#### Return Value
Returns Alibaba Cloud SMS API response result object, containing sending status and related information.

#### Usage Example
```python title="Basic Sending Example"
# Send verification code SMS
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={"code": "6789"},
    verifyTemplateCode="SMS_123456789"
)
```

```python title="Batch Sending Example"
# Batch send notification SMS
result = sms_element.sendMessage(
    phoneList=["13800138000", "13900139000", "13700137000"],
    params={"name": "张三", "event": "系统维护"},
    verifyTemplateCode="SMS_987654321"
)
```

```python title="Multi-parameter Template Example"
# Complex template parameters
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={
        "username": "用户001",
        "amount": "100.00",
        "time": "2024-01-15 10:30"
    },
    verifyTemplateCode="SMS_ORDER_NOTIFY"
)
```

## Properties
None

## Advanced Features
### Error Handling
Alibaba Cloud SMS element provides complete error handling mechanism, including the following predefined error codes:

```python title="Error Handling Example"
try:
    result = sms_element.sendMessage(
        phoneList=["13800138000"],
        params={"code": "1234"},
        verifyTemplateCode="SMS_123456789"
    )
except Exception as e:
    # Error code: 46001 - Parameter missing or phone number list empty
    # Error code: 46002 - SMS sending failed, Alibaba Cloud API returned error
    # Error code: 46003 - SMS sending request failed
    log.error(f"SMS sending failed: {e}")
```

### Template Management
Before use, you need to create SMS templates and signatures in Alibaba Cloud SMS service console:

```python title="Template Configuration Description"
# 1. Create SMS signature in Alibaba Cloud console, get verifySign
# 2. Create SMS template, get template code
# 3. Template examples:
#    Verification code template: Verification code ${code}, valid for 5 minutes.
#    Notification template: Dear ${name}, ${event} will be conducted at ${time}.

# Use corresponding template code and parameters when sending
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={"code": "123456"},  # Corresponds to ${code} in template
    verifyTemplateCode="SMS_123456789"  # Template code assigned by Alibaba Cloud
)
```