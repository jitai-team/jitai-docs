---
slug: payment
---
# Payment
A payment operation component that implements multi-platform payment functionality based on unified payment interfaces. It handles order creation, payment process management, and status monitoring, supporting Alipay and WeChat Pay platforms, providing complete payment lifecycle management.

The Payment element has a hierarchical structure of Meta (components.Meta) → Type (components.Payment) → Instance. Developers can quickly create Payment instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official components.PaymentType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```typescript title="Payment Component Basic Configuration"
{
  "fullName": "components.Payment",
  "type": "components.Payment", 
  "name": "Payment1",
  "title": "Payment Component",
  "config": {
    "requireElements": [],
    "aliPay": true,
    "weChatPay": true
  },
  "showTitle": true
}
```

### Configuration Properties
| Property Name | Type | Default Value | Description | Example Value |
|---------------|------|---------------|-------------|---------------|
| aliPay | boolean | false | Whether to enable Alipay | true |
| weChatPay | boolean | false | Whether to enable WeChat Pay | true |
| requireElements | array | [] | Dependent element configuration | [] |
| aliPayFullName | string | - | Alipay element full name | "pays.AliPay" |
| weChatPayFullName | string | - | WeChat Pay element full name | "pays.WeChatPay" |

## Variables
### tradeNo
- **Type**: Stext
- **Permission**: Read-only
- **Description**: Transaction serial number generated after successful payment

```typescript title="Get Transaction Serial Number"
// Get transaction serial number after payment
const tradeNumber = Payment1.tradeNo.value;
console.log('Transaction Serial Number:', tradeNumber);
```

## Attributes
### name
Component instance name, unique identifier in the page.
- **Type**: string

### title
Component display title.
- **Type**: string

### config
Component configuration object, containing payment-related settings.
- **Type**: `PaymentCompConfig & {requireElements: requireElement[]}`

### showTitle
Whether to display component title in the interface.
- **Type**: boolean

### type
Component type identifier, fixed as "components.Payment".
- **Type**: string

### fullName
Component's complete name path.
- **Type**: string

### app
Current application instance, providing global application context.
- **Type**: App

### page
Parent page instance, providing page context.
- **Type**: BasePage

## Methods
### call
Initiate payment operation, create order and start payment process.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| outTradeNo | Stext | Yes | Merchant order number, auto-generated if empty | "ORDER20241201001" |
| subject | Stext | Yes | Order title description | "Product Purchase" |
| totalAmount | Money | Yes | Order amount in yuan | 99.99 |

#### Return Value
No return value, payment results are obtained through event callbacks.

```typescript title="Initiate Payment Example"
// Initiate payment
await Payment1.call("ORDER20241201001", "Product Purchase", 99.99);

// Use auto-generated order number
await Payment1.call("", "VIP Membership Recharge", 199.00);
```

### createOrderId
Generate unique order ID, format: D+YYYYMMDDHHMMSS+6-digit random number.

#### Return Value
string - Generated order ID

```typescript title="Generate Order ID"
const orderId = Payment1.createOrderId();
console.log(orderId); // Example: D20241201123456789012
```

### poll
Start payment status polling, periodically check payment results.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| request | Function | Yes | Function to query payment status | `() => Promise<Record<string, any>>` |
| interval | number | Yes | Polling interval in milliseconds | 4000 |
| maxAttempts | number | Yes | Maximum polling attempts | 75 |

```typescript title="Payment Status Polling"
const queryPayStatus = async () => {
  return await app.services.PayService.queryOrderStatus(orderId);
};

Payment1.poll(queryPayStatus, 4000, 75); // Query every 4 seconds, max 75 times
```

### publishEvent
Publish component event, notify subscribers. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| name | string | Yes | Event name | "onSuccess" |
| ex | `Record<string, any>` | No | Additional data | `{orderId: "123"}` |

```typescript title="Publish Custom Event"
await Payment1.publishEvent('onSuccess', { orderId: 'ORDER001' });
```

### subscribeEvent
Subscribe to component event, set event callback handler. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| name | string | Yes | Event name | "onSuccess" |
| evtCb | Function | Yes | Event callback function | `(data) => {...}` |
| unSubscribeExist | boolean | No | Whether to cancel existing subscription | true |

#### Return Value
string - Event handler ID

```typescript title="Subscribe to Payment Event"
const handlerId = Payment1.subscribeEvent('onSuccess', async (data) => {
  console.log('Payment successful, transaction serial number:', data.tradeNo);
});
```

### unSubscribeEvent
Cancel event subscription. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| id | string | Yes | Event handler ID | "handler_123" |

#### Return Value
boolean - Whether successfully cancelled

```typescript title="Cancel Event Subscription"
const handlerId = Payment1.subscribeEvent('onSuccess', callback);
// Cancel subscription
Payment1.unSubscribeEvent(handlerId);
```

### setConfig
Dynamically set component configuration. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| next | `Partial<PaymentCompConfig>` | Yes | New configuration object | `{aliPay: true}` |
| clean | boolean | No | Whether to completely replace configuration | false |

```typescript title="Dynamic Payment Method Configuration"
// Enable Alipay
Payment1.setConfig({ aliPay: true });

// Completely replace configuration
Payment1.setConfig({ aliPay: true, weChatPay: false }, true);
```

### newVariable
Create new data type variable instance. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| varConfig | DataTypeConfig | Yes | Variable configuration object | `{name: "amount", dataType: "Money"}` |

```typescript title="Create Payment-Related Variables"
const payAmount = Payment1.newVariable({
  name: 'payAmount',
  dataType: 'Money',
  title: 'Payment Amount',
  decimal: 2
});
```

### destroy
Destroy component instance, clean up all resources and event listeners. Inherited from BaseComponent.

```typescript title="Destroy Component"
Payment1.destroy();
```

### runCode
Execute code string, run in page context. Inherited from BaseComponent.

#### Parameter Details
| Parameter Name | Type | Required | Description | Example Value |
|----------------|------|----------|-------------|---------------|
| code | string | Yes | Code string to execute | "this.Payment1.tradeNo.value" |

#### Return Value
any - Code execution result

```typescript title="Execute Code"
const result = Payment1.runCode('this.Payment1.tradeNo.value');
```

### getPermConfig
Get component permission configuration. Inherited from BaseComponent.

#### Return Value
`Record<string, any> | undefined` - Permission configuration object

```typescript title="Get Permission Configuration"
const permConfig = Payment1.getPermConfig();
console.log('Permission Configuration:', permConfig);
```

## Events
### onSuccess
Triggered after successful payment, returns transaction serial number.

**Event Data**: tradeNo (transaction serial number)

```typescript title="Payment Success Handling"
Payment1.subscribeEvent('onSuccess', async (data) => {
  console.log('Payment successful, serial number:', data.tradeNo);
  await OrderModel.updateByPK([orderId], { 
    status: 'paid',
    tradeNo: data.tradeNo 
  });
});
```

### onFailed
Triggered after payment failure, no return data.

```typescript title="Payment Failure Handling"
Payment1.subscribeEvent('onFailed', async () => {
  console.log('Payment failed');
  await showErrorMessage('Payment failed, please check network or retry');
});
```

## Advanced Features
### Complete Payment Process
```typescript title="Complete Payment Process Example"
class PaymentManager {
  private handlerIds: string[] = [];

  async initPayment() {
    // Subscribe to events
    const successId = Payment1.subscribeEvent('onSuccess', this.onPaySuccess.bind(this));
    const failedId = Payment1.subscribeEvent('onFailed', this.onPayFailed.bind(this));
    this.handlerIds.push(successId, failedId);

    // Configure payment methods
    Payment1.setConfig({ aliPay: true, weChatPay: true });

    // Initiate payment
    const orderId = Payment1.createOrderId();
    await Payment1.call(orderId, 'Product Purchase', 99.99);

    // Start status monitoring
    Payment1.poll(this.queryPayStatus.bind(this), 4000, 75);
  }

  async onPaySuccess(data) {
    await this.updateOrderStatus('paid', data.tradeNo);
    this.cleanup();
  }

  async onPayFailed() {
    await this.handlePaymentError();
    this.cleanup();
  }

  async queryPayStatus() {
    return await app.services.PayService.getOrderStatus(this.orderId);
  }

  cleanup() {
    // Clean up event subscriptions
    this.handlerIds.forEach(id => Payment1.unSubscribeEvent(id));
    this.handlerIds = [];
  }
}