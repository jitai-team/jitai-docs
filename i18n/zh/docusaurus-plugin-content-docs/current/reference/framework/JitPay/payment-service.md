---
sidebar_position: 3
slug: payment-service
description: "支付服务 API 参考文档。完整的规格说明、方法和示例。"
---

# 支付服务
支付服务是JitPay支付框架中预置的核心业务服务组件，负责支付订单创建、支付链接获取、订单状态查询、支付确认和回调处理等功能。它基于services.NormalType实现，提供标准化的支付业务接口，封装了与第三方支付平台的复杂交互逻辑。

支付服务作为JitPay框架的预置实例元素（pays.services.PaySvc），开发者可以直接通过`app.getElement("pays.services.PaySvc")`获取并使用，无需手动创建配置。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的pays.services.PaySvc元素，以实现自己的封装。

## 基本用法
### 获取服务实例
```python title="获取支付服务实例"
# 获取支付服务实例
pay_service = app.getElement("pays.services.PaySvc")
```

### 完整使用流程
```python title="支付服务完整使用示例"
# 1. 创建支付订单
order_result = pay_service.create(
    subject="商品购买订单",
    amount=99.99,
    orderId="ORDER123456"  # 可选，不传则自动生成
)

# 2. 获取支付链接
pay_url_result = pay_service.getPayUrl(
    orderId="ORDER123456",
    fullName="pays.AliPayType",  # 支付方式：支付宝
    payType="pc"  # 支付类型：pc或mobile
)

# 3. 前端轮询查询订单状态
status_result = pay_service.query(orderId="ORDER123456")

# 4. 用户完成支付后确认
check_result = pay_service.check(
    orderId="ORDER123456",
    fullName="pays.AliPayType"
)
```

## 方法 
### create
创建支付订单，生成本地订单记录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| subject | Stext | str | 是 | 订单信息描述 |
| amount | Numeric | float/int/Decimal | 是 | 支付金额，单位为元 |
| orderId | Stext | str | 否 | 自定义订单号，不传则自动生成 |

#### 返回值
返回JitDict类型，包含订单创建结果：
- orderId: 订单号
- status: 订单状态
- amount: 订单金额
- subject: 订单信息

#### 使用示例
```python title="创建支付订单"
pay_service = app.getElement("pays.services.PaySvc")

# 创建订单（自动生成订单号）
result = pay_service.create("购买VIP会员", 99.99)

# 创建订单（指定订单号）
result = pay_service.create(
    subject="商品订单",
    amount=299.00,
    orderId="CUSTOM_ORDER_001"
)
```

### getPayUrl
获取第三方支付平台的支付链接或二维码。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |
| fullName | Stext | str | 是 | 第三方支付实例元素名 |
| payType | Stext | str | 是 | 支付方式：pc/mobile |

#### 返回值
返回JitDict类型，包含支付链接信息：
- payUrl: 支付链接（移动端）或二维码数据（PC端）
- qrCode: 二维码图片（PC端支付）
- orderId: 订单号

#### 使用示例
```python title="获取支付链接"
pay_service = app.getElement("pays.services.PaySvc")

# PC端支付宝支付
result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.AliPayType",
    payType="pc"
)

# 移动端微信支付
result = pay_service.getPayUrl(
    orderId="ORDER456",
    fullName="pays.WechatPayType",
    payType="mobile"
)
```

### query
查询订单支付状态，支持轮询机制检查支付结果。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |

#### 返回值
返回JitDict类型，包含订单状态信息：
- orderId: 订单号
- status: 支付状态
- amount: 订单金额
- payTime: 支付时间

#### 使用示例
```python title="查询订单状态"
pay_service = app.getElement("pays.services.PaySvc")

# 轮询查询订单状态
status = pay_service.query(orderId="ORDER123")
if status["status"] == "success":
    print("支付成功")
elif status["status"] == "pending":
    print("支付中，请稍候")
else:
    print("支付失败或已取消")
```

### check
用户支付完成后点击确认，主动检查第三方支付状态。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |
| fullName | Stext | str | 是 | 第三方支付实例元素名 |

#### 返回值
返回操作结果，通常为成功响应。

#### 使用示例
```python title="确认支付"
pay_service = app.getElement("pays.services.PaySvc")

# 用户点击"我已完成支付"后调用
result = pay_service.check(
    orderId="ORDER123",
    fullName="pays.AliPayType"
)
```

### wechatNotify
处理微信支付的异步回调通知。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| xml | JitDict | dict | 是 | 微信回调的XML数据（已转换为字典） |

#### 返回值
返回Response对象，包含回调响应内容。

#### 使用示例
```python title="微信支付回调处理"
pay_service = app.getElement("pays.services.PaySvc")

# 在支付回调Hook中使用
def handle_wechat_callback(xml_data):
    response = pay_service.wechatNotify(xml_data)
    return response
```

## 属性
支付服务主要通过方法提供功能，暂无公开属性。

## 高级特性
### 多支付方式集成
支付服务支持同时集成多种第三方支付方式，通过fullName参数动态选择支付渠道。

```python title="多支付方式支持"
pay_service = app.getElement("pays.services.PaySvc")

# 支付宝支付
alipay_result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.AliPayType", 
    payType="pc"
)

# 微信支付
wechat_result = pay_service.getPayUrl(
    orderId="ORDER123",
    fullName="pays.WechatPayType",
    payType="pc"
)
```

### 支付状态轮询
前端通过定时调用query接口实现支付状态的实时跟踪。

```python title="支付状态轮询示例"
import time

def wait_for_payment(order_id, timeout=300):
    """等待支付完成，支持超时控制"""
    pay_service = app.getElement("pays.services.PaySvc")
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        status = pay_service.query(orderId=order_id)
        
        if status["status"] == "success":
            return True
        elif status["status"] == "failed":
            return False
            
        time.sleep(2)  # 每2秒查询一次
    
    return False  # 超时
```

### 完整支付流程
结合多个API实现完整的支付业务流程。

```python title="完整支付流程示例"
def complete_payment_flow(subject, amount, pay_type="AliPayType", device_type="pc"):
    """完整支付流程示例"""
    pay_service = app.getElement("pays.services.PaySvc")
    
    try:
        # 1. 创建订单
        order = pay_service.create(subject=subject, amount=amount)
        order_id = order["orderId"]
        
        # 2. 获取支付链接
        pay_url = pay_service.getPayUrl(
            orderId=order_id,
            fullName=f"pays.{pay_type}",
            payType=device_type
        )
        
        # 3. 返回支付信息给前端
        return {
            "orderId": order_id,
            "payUrl": pay_url["payUrl"],
            "qrCode": pay_url.get("qrCode")  # PC端二维码
        }
        
    except Exception as e:
        print(f"支付流程异常: {e}")
        return None

# 使用示例
payment_info = complete_payment_flow(
    subject="购买商品",
    amount=99.99,
    pay_type="AliPayType",
    device_type="pc"
)
``` 