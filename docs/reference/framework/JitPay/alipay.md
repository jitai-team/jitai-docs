---
sidebar_position: 1
slug: alipay
title: "Alipay Payment Reference"
description: "Alipay Payment Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Alipay Payment"
---

# Alipay Payment
Alipay payment is the core Type element of the JitPay framework, implementing integration of multiple payment methods based on Alipay's official API. It handles payment link generation, order status queries, and callback notification processing, supporting QR code payment, mobile website payment, and other methods, suitable for e-commerce, O2O, lifestyle services, and various other commercial application scenarios.

The hierarchical structure of Alipay payment elements is Meta (pays.Meta) → Type (pays.AliPayType) → Instance. Developers can quickly create Alipay payment instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `pays.AliPayType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
pays/
└── aliPayment/
    ├── e.json
    └── aliPayment.json
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "pays.AliPayType",
  "title": "Alipay Payment",
  "variables": [],
  "frontBundleEntry": "./aliPayment.json",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="aliPayment.json Configuration Example"
{
  "config": {
    "appId": "your_alipay_app_id",
    "publicKey": "your_alipay_public_key",
    "privateKey": "your_app_private_key"
  }
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get Alipay payment element
alipay = app.getElement("pays.aliPayment")

# Create order
payLog = alipay.create(
    subject="Product Purchase",
    amount=99.99,
    orderId="D20241220161615000001"
)

# Get payment link (QR code payment)
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="PRE_PAY"
)
print(result["payUrl"])  # QR code link

# Get mobile payment form
result = alipay.getPayUrl(
    orderId="D20241220161615000001", 
    payType="WAP_PAY"
)
print(result["form"])  # HTML form
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| type | string | Yes | Fixed value: pays.AliPayType |
| title | string | Yes | Element display name |
| frontBundleEntry | string | Yes | Frontend configuration file path |
| backendBundleEntry | string | Yes | Backend entry, usually "." |

### Business Configuration File
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| appId | Stext | str | Yes | Alipay application ID |
| publicKey | Stext | str | Yes | Alipay public key |
| privateKey | Stext | str | Yes | Application private key |

## Methods
### create
Create internal order, generate local order record.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| subject | Stext | str | Yes | Order title |
| amount | Money | float | Yes | Amount in yuan |
| orderId | Stext | str | No | Order number, auto-generated if empty |

#### Return Value
Returns PayLogModel instance object containing complete order information.

#### Usage Example
```python title="Create Order Example"
alipay = app.getElement("pays.aliPayment")

# Auto-generate order number
payLog = alipay.create(
    subject="iPhone 15 Pro",
    amount=7999.00
)

# Specify order number
payLog = alipay.create(
    subject="MacBook Air",
    amount=8999.00,
    orderId="CUSTOM202412201616"
)
```

### getPayUrl
Get payment link, returns different format payment information based on payment method.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |
| payType | Stext | str | Yes | Payment method: PRE_PAY or WAP_PAY |

#### Return Value
Returns dictionary containing payUrl (QR code link) and form (HTML form) fields.

#### Usage Example
```python title="Get Payment Link Example"
alipay = app.getElement("pays.aliPayment")

# PC QR code payment
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="PRE_PAY"
)
qr_url = result["payUrl"]

# Mobile website payment
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="WAP_PAY"
)
form_html = result["form"]
```

### check
Confirm order payment status, call Alipay API to verify payment result.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns SUCCESS_RETURN constant, indicating check operation completed.

#### Usage Example
```python title="Check Payment Status Example"
alipay = app.getElement("pays.aliPayment")

try:
    result = alipay.check("D20241220161615000001")
    print("Order status check completed")
except Exception as e:
    print(f"Check failed: {e}")
```

### checkThird
Query Alipay order status, update local order record.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| payLog | PayLogModel | dict | Yes | Order data object |

#### Return Value
Returns AliPayLogModel instance or empty dictionary.

#### Usage Example
```python title="Query Third-party Status Example"
alipay = app.getElement("pays.aliPayment")
PayLogModel = app.getElement("pays.models.PayLogModel")

payLog = PayLogModel.queryset.get(orderId="D20241220161615000001")
aliPayLog = alipay.checkThird(payLog)
```

### cancel
Cancel order, cancel both local order and Alipay order.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns SUCCESS_RETURN constant, indicating cancel operation completed.

#### Usage Example
```python title="Cancel Order Example"
alipay = app.getElement("pays.aliPayment")

result = alipay.cancel("D20241220161615000001")
print("Order cancelled")
```

### cancelThird
Call Alipay API to cancel third-party order.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns SUCCESS_RETURN constant.

### notify
Receive Alipay callback notification, handle payment result.

#### Usage Example
```python title="Callback Handling Example"
alipay = app.getElement("pays.aliPayment")

# Usually called in routes
def alipay_notify():
    result = alipay.notify()
    return result
```

### generateOrderId
Generate default format order number.

#### Return Value
Returns order number in format "D + datetime(yyyymmddhhmmss) + 6-digit random number".

#### Usage Example
```python title="Generate Order Number Example"
order_id = app.getElement("pays.aliPayment").generateOrderId()
print(order_id)  # Example: D202412201616150000001
```

## Properties
### config
Dictionary containing Alipay configuration information, including appId, publicKey, privateKey, and other authentication parameters.

### fullName
Complete element name, used to identify payment method.

### appId
Alipay application ID, obtained from configuration.

### publicKey
Alipay public key, used to verify callback data.

### privateKey
Application private key, used to sign request data.

## Advanced Features
### Payment Method Configuration
Alipay payment supports multiple payment methods, controlled through payType parameter:

```python title="Different Payment Methods Example"
alipay = app.getElement("pays.aliPayment")

# QR code payment (PC)
pc_result = alipay.getPayUrl(
    orderId="ORDER001",
    payType="PRE_PAY"
)

# Mobile website payment
mobile_result = alipay.getPayUrl(
    orderId="ORDER001", 
    payType="WAP_PAY"
)
```

### Order Status Management
System provides complete order status management mechanism:

```python title="Order Status Handling Example"
from pays.Meta import PayStatusEnum, AliPayStatusEnum

# Local order status
# PayStatusEnum.wait - Waiting for payment
# PayStatusEnum.success - Payment successful
# PayStatusEnum.close - Order closed
# PayStatusEnum.timeout - Order timeout
# Alipay order status
# AliPayStatusEnum.WAIT_BUYER_PAY - Waiting for buyer payment
# AliPayStatusEnum.TRADE_SUCCESS - Trade successful
# AliPayStatusEnum.TRADE_CLOSED - Trade closed
# AliPayStatusEnum.TRADE_FINISHED - Trade finished
```

### Error Handling
Integrated complete error handling mechanism:

```python title="Error Handling Example"
from commons.errcode import PayErrorCode

alipay = app.getElement("pays.aliPayment")

try:
    result = alipay.getPayUrl("INVALID_ORDER", "PRE_PAY")
except PayErrorCode.ORDER_NOT_EXIST_ERROR:
    print("Order does not exist")
except PayErrorCode.UNKNOWN_PAY_TYPE:
    print("Unknown payment method")
except Exception as e:
    print(f"Other error: {e}")
```