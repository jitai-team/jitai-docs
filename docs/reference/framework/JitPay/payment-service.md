---
sidebar_position: 3
slug: payment-service
---

# Payment Service
Payment service is a core business service component preset in the JitPay payment framework, responsible for payment order creation, payment link acquisition, order status queries, payment confirmation, and callback processing. It is implemented based on services.NormalType, providing standardized payment business interfaces and encapsulating complex interaction logic with third-party payment platforms.

As a preset instance element of the JitPay framework (pays.services.PaySvc), developers can directly obtain and use it through `app.getElement("pays.services.PaySvc")` without manual configuration.

Of course, developers can also create their own Type elements or modify the official `pays.services.PaySvc` element provided by JitAi in their own App to implement their own encapsulation.

## Basic Usage
### Getting Service Instance
```python title="Get Payment Service Instance"
# Get payment service instance
pay_service = app.getElement("pays.services.PaySvc")
```

### Complete Usage Flow
```python title="Complete Payment Service Usage Example"
# 1. Create payment order
order_result = pay_service.create(
    subject="Product Purchase Order",
    amount=99.99,
    orderId="ORDER123456"  # Optional, auto-generated if not provided
)

# 2. Get payment link
pay_url_result = pay_service.getPayUrl(
    orderId="ORDER123456",
    fullName="pays.AliPayType",  # Payment method: Alipay
    payType="pc"  # Payment type: pc or mobile
)

# 3. Frontend polling to query order status
status_result = pay_service.query(orderId="ORDER123456")

# 4. Confirm after user completes payment
check_result = pay_service.check(
    orderId="ORDER123456",
    fullName="pays.AliPayType"
)
```

## Methods
### create
Create payment order, generate local order record.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| subject | Stext | str | Yes | Order information description |
| amount | Numeric | float/int/Decimal | Yes | Payment amount in yuan |
| orderId | Stext | str | No | Custom order number, auto-generated if not provided |

#### Return Value
Returns JitDict type containing order creation result:
- orderId: Order number
- status: Order status
- amount: Order amount
- subject: Order information

#### Usage Example
```python title="Create Payment Order"
pay_service = app.getElement("pays.services.PaySvc")

# Create order (auto-generate order number)
result = pay_service.create("Purchase VIP Membership", 99.99)

# Create order (specify order number)
result = pay_service.create(
    subject="Product Order",
    amount=299.00,
    orderId="CUSTOM_ORDER_001"
)
```

### getPayUrl
Get payment link or QR code from third-party payment platform.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |
| fullName | Stext | str | Yes | Third-party payment instance element name |
| payType | Stext | str | Yes | Payment method: pc/mobile |

#### Return Value
Returns JitDict type containing payment link information:
- payUrl: Payment link (mobile) or QR code data (PC)
- qrCode: QR code image (PC payment)
- orderId: Order number

#### Usage Example
```python title="Get Payment Link"
pay_service = app.getElement("pays.services.PaySvc")

# PC Alipay payment
result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.AliPayType",
    payType="pc"
)

# Mobile WeChat payment
result = pay_service.getPayUrl(
    orderId="ORDER456",
    fullName="pays.WechatPayType",
    payType="mobile"
)
```

### query
Query order payment status, supports polling mechanism to check payment result.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |

#### Return Value
Returns JitDict type containing order status information:
- orderId: Order number
- status: Payment status
- amount: Order amount
- payTime: Payment time

#### Usage Example
```python title="Query Order Status"
pay_service = app.getElement("pays.services.PaySvc")

# Polling query order status
status = pay_service.query(orderId="ORDER123")
if status["status"] == "success":
    print("Payment successful")
elif status["status"] == "pending":
    print("Payment in progress, please wait")
else:
    print("Payment failed or cancelled")
```

### check
After user completes payment and clicks confirm, actively check third-party payment status.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| orderId | Stext | str | Yes | Order number |
| fullName | Stext | str | Yes | Third-party payment instance element name |

#### Return Value
Returns operation result, usually success response.

#### Usage Example
```python title="Confirm Payment"
pay_service = app.getElement("pays.services.PaySvc")

# Called after user clicks "I have completed payment"
result = pay_service.check(
    orderId="ORDER123",
    fullName="pays.AliPayType"
)
```

### wechatNotify
Handle WeChat payment asynchronous callback notification.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| xml | JitDict | dict | Yes | WeChat callback XML data (converted to dictionary) |

#### Return Value
Returns Response object containing callback response content.

#### Usage Example
```python title="WeChat Payment Callback Handling"
pay_service = app.getElement("pays.services.PaySvc")

# Used in payment callback Hook
def handle_wechat_callback(xml_data):
    response = pay_service.wechatNotify(xml_data)
    return response
```

## Properties
Payment service mainly provides functionality through methods, with no public properties currently.

## Advanced Features
### Multi-Payment Method Integration
Payment service supports integrating multiple third-party payment methods simultaneously, dynamically selecting payment channels through fullName parameter.

```python title="Multi-Payment Method Support"
pay_service = app.getElement("pays.services.PaySvc")

# Alipay payment
alipay_result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.AliPayType", 
    payType="pc"
)

# WeChat payment
wechat_result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.WechatPayType",
    payType="pc"
)
```

### Payment Status Polling
Frontend implements real-time payment status tracking through scheduled calls to query interface.

```python title="Payment Status Polling Example"
import time

def wait_for_payment(order_id, timeout=300):
    """Wait for payment completion with timeout control"""
    pay_service = app.getElement("pays.services.PaySvc")
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        status = pay_service.query(orderId=order_id)
        
        if status["status"] == "success":
            return True
        elif status["status"] == "failed":
            return False
            
        time.sleep(2)  # Query every 2 seconds
    
    return False  # Timeout
```

### Complete Payment Flow
Implement complete payment business flow by combining multiple APIs.

```python title="Complete Payment Flow Example"
def complete_payment_flow(subject, amount, pay_type="AliPayType", device_type="pc"):
    """Complete payment flow example"""
    pay_service = app.getElement("pays.services.PaySvc")
    
    try:
        # 1. Create order
        order = pay_service.create(subject=subject, amount=amount)
        order_id = order["orderId"]
        
        # 2. Get payment link
        pay_url = pay_service.getPayUrl(
            orderId=order_id,
            fullName=f"pays.{pay_type}",
            payType=device_type
        )
        
        # 3. Return payment information to frontend
        return {
            "orderId": order_id,
            "payUrl": pay_url["payUrl"],
            "qrCode": pay_url.get("qrCode")  # PC QR code
        }
        
    except Exception as e:
        print(f"Payment flow exception: {e}")
        return None

# Usage example
payment_info = complete_payment_flow(
    subject="Purchase Product",
    amount=99.99,
    pay_type="AliPayType",
    device_type="pc"
)
```