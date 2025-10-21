---
sidebar_position: 14
slug: payment-components
title: Payment Components
---

# Payment Components
Payment components are functional UI elements that enable multi-platform payment processing through a unified interface. They handle order creation, payment workflow orchestration, and transaction status tracking, with native support for Alipay and WeChat Pay platforms, delivering end-to-end payment lifecycle management.

## Creating payment components {#payment-component-creation}
![Creating Payment Components](./img/14/pay_2025-08-28_19-37-19.png)

In the page visual editor, click `Insert Component` and drag the `Payment` component onto the canvas. Configure its parameters in the right-side configuration panel.

:::warning Note
Payment service elements must be created before adding payment components. For setup instructions, see [Payment Services](../third-party-integration/payment-service).

Payment component functions must be invoked programmatically before the component can process transactions.
:::

## Initiate payment function {#initiate-payment-function}
Payment components expose an **Initiate Payment** function to trigger payment workflows.

This function accepts three parameters:
- **Order number** (optional)
- **Order description** (required)
- **Order amount** (required)

Omitting required parameters will cause payment failures.

![Initiate Payment](./img/14/pay_2025-08-29_08-38-30.png)

This function must be invoked from a parent component's event handler. For example, when combining tables with payment components, configure the function call in the table's event logic.

## Event logic {#event-logic}
Payment components emit **After Payment Success** and **After Payment Failure** events to handle post-transaction workflows.

![Payment Success and Failure Events](./img/14/pay_2025-08-29_08-59-46.png)

Configure response logic in the payment component's event handlers. For example, trigger receipt printing upon successful payment.

## Component usage {#component-usage}
Once you've created the payment component and configured its event handlers in the visual editor, payments can be initiated from the page.

![Payment Component Usage](./img/14/pay_2025-08-28_19-17-44.png)

In runtime, clicking the **Payment** button in the table invokes the payment component's workflow, opening the payment interface. After selecting a payment method, the QR code updates dynamically. When users complete the scan-to-pay action, the component fires either the **After Payment Success** or **After Payment Failure** event, triggering the corresponding logic.
