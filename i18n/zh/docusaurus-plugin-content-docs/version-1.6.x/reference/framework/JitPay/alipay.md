---
sidebar_position: 1
slug: alipay
description: "支付宝支付 API 参考文档。完整的规格说明、方法和示例。"
---

# 支付宝支付
支付宝支付是JitPay框架的核心Type元素，基于支付宝官方API实现多种支付方式的集成。它负责支付链接生成、订单状态查询和回调通知处理，支持扫码支付、手机网站支付等方式，适用于电商、O2O、生活服务等多种商业应用场景。

支付宝支付元素分层结构为Meta（pays.Meta）→ Type（pays.AliPayType）→ 实例，开发者可通过JitAI的可视化开发工具快捷地创建支付宝支付实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的pays.AliPayType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
pays/
└── aliPayment/
    ├── e.json
    └── aliPayment.json
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "pays.AliPayType",
  "title": "支付宝支付",
  "variables": [],
  "frontBundleEntry": "./aliPayment.json",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="aliPayment.json配置示例"
{
  "config": {
    "appId": "your_alipay_app_id",
    "publicKey": "your_alipay_public_key",
    "privateKey": "your_app_private_key"
  }
}
```

#### 调用示例
```python title="基础使用示例"
# 获取支付宝支付元素
alipay = app.getElement("pays.aliPayment")

# 创建订单
payLog = alipay.create(
    subject="商品购买",
    amount=99.99,
    orderId="D20241220161615000001"
)

# 获取支付链接（扫码支付）
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="PRE_PAY"
)
print(result["payUrl"])  # 二维码链接

# 获取手机支付表单
result = alipay.getPayUrl(
    orderId="D20241220161615000001", 
    payType="WAP_PAY"
)
print(result["form"])  # HTML表单
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 固定值：pays.AliPayType |
| title | string | 是 | 元素显示名称 |
| frontBundleEntry | string | 是 | 前端配置文件路径 |
| backendBundleEntry | string | 是 | 后端入口，通常为"." |

### 业务配置文件配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| appId | Stext | str | 是 | 支付宝应用ID |
| publicKey | Stext | str | 是 | 支付宝公钥 |
| privateKey | Stext | str | 是 | 应用私钥 |

## 方法 
### create
创建内部订单，生成本地订单记录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| subject | Stext | str | 是 | 订单标题 |
| amount | Money | float | 是 | 金额，单位为元 |
| orderId | Stext | str | 否 | 订单号，为空时自动生成 |

#### 返回值
返回PayLogModel实例对象，包含订单的完整信息。

#### 使用示例
```python title="创建订单示例"
alipay = app.getElement("pays.aliPayment")

# 自动生成订单号
payLog = alipay.create(
    subject="iPhone 15 Pro",
    amount=7999.00
)

# 指定订单号
payLog = alipay.create(
    subject="MacBook Air",
    amount=8999.00,
    orderId="CUSTOM202412201616"
)
```

### getPayUrl
获取支付链接，根据支付方式返回不同格式的支付信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |
| payType | Stext | str | 是 | 支付方式：PRE_PAY或WAP_PAY |

#### 返回值
返回字典，包含payUrl（二维码链接）和form（HTML表单）字段。

#### 使用示例
```python title="获取支付链接示例"
alipay = app.getElement("pays.aliPayment")

# PC端扫码支付
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="PRE_PAY"
)
qr_url = result["payUrl"]

# 手机端网站支付
result = alipay.getPayUrl(
    orderId="D20241220161615000001",
    payType="WAP_PAY"
)
form_html = result["form"]
```

### check
确认订单支付状态，调用支付宝接口验证支付结果。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |

#### 返回值
返回SUCCESS_RETURN常量，表示检查操作完成。

#### 使用示例
```python title="检查支付状态示例"
alipay = app.getElement("pays.aliPayment")

try:
    result = alipay.check("D20241220161615000001")
    print("订单状态检查完成")
except Exception as e:
    print(f"检查失败：{e}")
```

### checkThird
查询支付宝订单状态，更新本地订单记录。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| payLog | PayLogModel | dict | 是 | 订单数据对象 |

#### 返回值
返回AliPayLogModel实例或空字典。

#### 使用示例
```python title="查询第三方状态示例"
alipay = app.getElement("pays.aliPayment")
PayLogModel = app.getElement("pays.models.PayLogModel")

payLog = PayLogModel.queryset.get(orderId="D20241220161615000001")
aliPayLog = alipay.checkThird(payLog)
```

### cancel
取消订单，同时取消本地订单和支付宝订单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |

#### 返回值
返回SUCCESS_RETURN常量，表示取消操作完成。

#### 使用示例
```python title="取消订单示例"
alipay = app.getElement("pays.aliPayment")

result = alipay.cancel("D20241220161615000001")
print("订单已取消")
```

### cancelThird
调用支付宝接口取消第三方订单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| orderId | Stext | str | 是 | 订单号 |

#### 返回值
返回SUCCESS_RETURN常量。

### notify
接收支付宝回调通知，处理支付结果。

#### 使用示例
```python title="回调处理示例"
alipay = app.getElement("pays.aliPayment")

# 通常在路由中调用
def alipay_notify():
    result = alipay.notify()
    return result
```

### generateOrderId
生成默认格式的订单号。

#### 返回值
返回格式为"D + 日期时间(yyyymmddhhmmss) + 6位随机数"的订单号。

#### 使用示例
```python title="生成订单号示例"
order_id = app.getElement("pays.aliPayment").generateOrderId()
print(order_id)  # 例如：D202412201616150000001
```

## 属性
### config
包含支付宝配置信息的字典，包括appId、publicKey、privateKey等认证参数。

### fullName
元素的完整名称，用于标识支付方式。

### appId
支付宝应用ID，从配置中获取。

### publicKey
支付宝公钥，用于验证回调数据。

### privateKey
应用私钥，用于签名请求数据。

## 高级特性
### 支付方式配置
支付宝支付支持多种支付方式，通过payType参数控制：

```python title="不同支付方式示例"
alipay = app.getElement("pays.aliPayment")

# 扫码支付（PC端）
pc_result = alipay.getPayUrl(
    orderId="ORDER001",
    payType="PRE_PAY"
)

# 手机网站支付
mobile_result = alipay.getPayUrl(
    orderId="ORDER001", 
    payType="WAP_PAY"
)
```

### 订单状态管理
系统提供完整的订单状态管理机制：

```python title="订单状态处理示例"
from pays.Meta import PayStatusEnum, AliPayStatusEnum

# 本地订单状态
# PayStatusEnum.wait - 等待支付
# PayStatusEnum.success - 支付成功
# PayStatusEnum.close - 订单关闭
# PayStatusEnum.timeout - 订单超时
# 支付宝订单状态
# AliPayStatusEnum.WAIT_BUYER_PAY - 等待买家付款
# AliPayStatusEnum.TRADE_SUCCESS - 交易成功
# AliPayStatusEnum.TRADE_CLOSED - 交易关闭
# AliPayStatusEnum.TRADE_FINISHED - 交易结束
```

### 错误处理
集成完整的错误处理机制：

```python title="错误处理示例"
from commons.errcode import PayErrorCode

alipay = app.getElement("pays.aliPayment")

try:
    result = alipay.getPayUrl("INVALID_ORDER", "PRE_PAY")
except PayErrorCode.ORDER_NOT_EXIST_ERROR:
    print("订单不存在")
except PayErrorCode.UNKNOWN_PAY_TYPE:
    print("未知支付方式")
except Exception as e:
    print(f"其他错误：{e}")
``` 