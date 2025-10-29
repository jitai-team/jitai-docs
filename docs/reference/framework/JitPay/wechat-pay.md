---
sidebar_position: 2
slug: wechat-pay
title: "WeChat Pay Reference"
description: "WeChat Pay Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "WeChat Pay"
---

# WeChat Pay
WeChat Pay is a payment processing element integrated with WeChat Pay's official API, implementing multiple payment methods including QR code payment, H5 payment, and mini-program payment based on WeChat Pay V2 API. It handles order creation, payment status queries, and callback notification processing, providing seamless payment experience within the WeChat ecosystem. WeChat Pay is suitable for WeChat mini-programs, official accounts, apps, and other WeChat ecosystem application scenarios, simplifying payment integration complexity through standardized APIs.

The hierarchical structure of WeChat Pay elements is Meta (pays.Meta) → Type (pays.WechatPayType) → Instance. Developers can quickly create WeChat Pay instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `pays.WechatPayType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
pays/
└── myWechatPay/
    ├── e.json
    └── myWechatPay.json
```

#### e.json File
```json title="e.json Configuration"
{
  "type": "pays.WechatPayType",
  "title": "My WeChat Pay",
  "mchId": "1234567890",
  "apiKey": "your_api_key_here",
  "frontBundleEntry": "./myWechatPay.json",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="myWechatPay.json"
{
  "config": {
    "appId": "wx1234567890abcdef",
    "mchId": "1234567890",
    "apiKey": "abcdef1234567890abcdef1234567890"
  }
}
```

#### Usage Example
```python title="Create Order and Payment"
# Get WeChat Pay element
wechat_pay = app.getElement("pays.myWechatPay")

# Create order
order = wechat_pay.create(
    subject="Product Purchase",
    amount=99.99,
    orderId="D20231120161615000001"
)

# Get payment link
pay_result = wechat_pay.getPayUrl(
    orderId="D20231120161615000001",
    payType="NATIVE"
)

# Query order status
wechat_pay.check("D20231120161615000001")

# Cancel order
wechat_pay.cancel("D20231120161615000001")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| type | string | Yes | Fixed value "pays.WechatPayType" |
| title | string | Yes | Element display name |
| mchId | string | Yes | WeChat merchant ID |
| apiKey | string | Yes | WeChat Pay API key |
| frontBundleEntry | string | No | Frontend configuration file path |
| backendBundleEntry | string | No | Backend code directory path, defaults to "." |

### Business Configuration File
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| appId | string | Yes | WeChat application ID (official account or mini-program AppId) |
| mchId | string | Yes | WeChat merchant ID |
| apiKey | string | Yes | WeChat Pay API key |

## Methods
### create
Create internal order record, generate order number and initialize order status.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| subject | Stext | str | Yes | Order title, product description displayed on payment page |
| amount | Numeric | float | Yes | Order amount in yuan |
| orderId | Stext | str | No | Custom order number, auto-generated if not provided |

#### Return Value
Returns order object containing order number, status, and other information.

#### Usage Example
```python title="Create Order"
# Auto-generate order number
order = wechat_pay.create(
    subject="Product Purchase",
    amount=199.50
)

# Specify order number
order = wechat_pay.create(
    subject="VIP Membership Top-up",
    amount=99.00,
    orderId="CUSTOM20231120001"
)
```

### getPayUrl
Call WeChat Pay API to create payment order, return payment link.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |
| payType | Stext | str | No | Payment type, defaults to NATIVE (QR code payment) |

#### Return Value
Returns dictionary object containing payment link:
```python
{
    "payUrl": "weixin://wxpay/bizpayurl?pr=xxx",
    "form": ""
}
```

#### Usage Example
```python title="Get Payment Link"
# QR code payment
result = wechat_pay.getPayUrl(
    orderId="D20231120161615000001",
    payType="NATIVE"
)
pay_url = result["payUrl"]
```

### notify
Receive WeChat Pay callback notification, handle payment result.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| xml | Stext | str | Yes | XML format callback data sent by WeChat |

#### Return Value
Returns processing result status.

#### Usage Example
```python title="Handle Payment Callback"
# Usually called in callback interface
result = wechat_pay.notify(xml_data)
```

### check
Actively query third-party order status and update local order.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns operation success status.

#### Usage Example
```python title="Query Order Status"
# Called when user clicks "Payment Completed"
result = wechat_pay.check("D20231120161615000001")
```

### cancel
Cancel order, cancel both third-party order and local order.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns operation success status.

#### Usage Example
```python title="Cancel Order"
# User actively cancels order
result = wechat_pay.cancel("D20231120161615000001")
```

### checkThird
Call WeChat API to query order status and update WeChat Pay record table.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| payLog | Object | object | Yes | Payment record object |

#### Return Value
Returns WeChat Pay record object.

#### Usage Example
```python title="Query Third-party Status"
# Internal method, usually not called directly
pay_log = app.getElement("pays.models.PayLogModel").queryset.get(orderId=order_id)
wechat_log = wechat_pay.checkThird(pay_log)
```

### cancelThird
Call WeChat API to cancel third-party order.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns operation success status.

#### Usage Example
```python title="Cancel Third-party Order"
# Internal method, usually not called directly
result = wechat_pay.cancelThird("D20231120161615000001")
```

### generateOrderId
Generate unique order number.

#### Return Value
Returns order number string in format "D" + timestamp + 6-digit random number.

#### Usage Example
```python title="Generate Order Number"
order_id = wechat_pay.generateOrderId()
# Example: D202311201616150000001
```

## Properties
### fullName
Complete name of payment element.

### config
Payment configuration information, containing appId, mchId, apiKey, and other parameters.

### appId
WeChat application ID.

### mchId
WeChat merchant ID.

### apiKey
WeChat Pay API key.

## Advanced Features
### Callback Notification Handling
WeChat Pay supports automatic handling of payment callback notifications. When users complete payment, WeChat sends payment results to the specified callback address. The system automatically parses callback data and updates order status.

```python title="Configure Callback Handling"
# Callback URL is auto-generated in format:
# {host}/api/{app}/pays/services/PaySvc/wechatNotify

# Get callback URL
notify_url = wechat_pay.getNotifyUrl()
```

### Payment Status Management
WeChat Pay provides complete payment status tracking, including waiting for payment, payment success, payment failure, order closed, and other statuses. The system maintains status synchronization between local order table and WeChat order table.

```python title="Status Query Example"
# Get order model
PayLogModel = app.getElement("pays.models.PayLogModel")
order = PayLogModel.queryset.get(orderId=order_id)

# Check order status
if order.status.value == "success":
    print("Payment completed")
elif order.status.value == "wait":
    print("Waiting for payment")
```

### Multi-Payment Method Support
WeChat Pay supports multiple payment types, including NATIVE QR code payment, H5 payment, mini-program payment, etc. Developers can choose appropriate payment methods based on application scenarios.

```python title="Different Payment Methods"
# QR code payment (default)
result = wechat_pay.getPayUrl(orderId, "NATIVE")

# H5 payment
result = wechat_pay.getPayUrl(orderId, "MWEB")

# Mini-program payment
result = wechat_pay.getPayUrl(orderId, "JSAPI")
```