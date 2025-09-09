---
slug: aliyun-sms
---
# 阿里云短信
阿里云短信是基于阿里云SMS API的企业级短信通知服务，通过标准的sendMessage接口实现验证码发送、通知提醒等短信业务场景。它集成阿里云SMS API，支持AccessKey认证和签名验证机制，提供完整的错误处理和日志监控，确保消息发送的可靠性。

阿里云短信元素分层结构为Meta（SMS.Meta） → Type（SMS.Aliyun） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建阿里云短信实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的SMS.Aliyun元素，以实现自己的封装。

## 快速开始
### 创建实例元素
#### 目录结构
````text title="推荐目录结构"
SMS/
└── YourSmsName/          # 自定义短信实例名称
    ├── e.json            # 元素声明文件
    └── sms.json          # 阿里云短信配置文件
````

#### e.json文件
````json title="元素声明文件"
{
  "title": "我的阿里云短信",
  "type": "SMS.Aliyun",
  "backendBundleEntry": "."
}
````

#### 业务配置文件
````json title="sms.json配置文件"
{
  "accessKey": "your_access_key",
  "accessSecret": "your_access_secret", 
  "verifySign": "your_signature"
}
````

#### 调用示例
````python title="发送短信示例"
# 获取短信元素实例
sms_element = app.getElement("SMS.YourSmsName")

# 发送短信
result = sms_element.sendMessage(
    phoneList=["13800138000", "13900139000"],
    params={"code": "123456"},
    verifyTemplateCode="SMS_123456789"
)
````

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 元素显示名称 |
| type | string | 是 | 固定值"SMS.Aliyun" |
| backendBundleEntry | string | 是 | 固定值"." |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKey | string | 是 | 阿里云AccessKey |
| accessSecret | string | 是 | 阿里云AccessSecret |
| verifySign | string | 是 | 短信签名，需在阿里云控制台申请 |

## 方法
### sendMessage
发送短信接口，通过传入手机号列表、模板参数和模板代码发送短信消息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| phoneList | JitList | list | 是 | 手机号列表，每个手机号为字符串格式 |
| params | JitDict | dict | 是 | 短信模板参数，键值对格式 |
| verifyTemplateCode | Stext | str | 是 | 阿里云短信模板代码，需在extend参数中传入 |

#### 返回值
返回阿里云SMS API的响应结果对象，包含发送状态和相关信息。

#### 使用示例
````python title="基础发送示例"
# 发送验证码短信
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={"code": "6789"},
    verifyTemplateCode="SMS_123456789"
)
````

````python title="批量发送示例"
# 批量发送通知短信
result = sms_element.sendMessage(
    phoneList=["13800138000", "13900139000", "13700137000"],
    params={"name": "张三", "event": "系统维护"},
    verifyTemplateCode="SMS_987654321"
)
````

````python title="多参数模板示例"
# 复杂模板参数
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={
        "username": "用户001",
        "amount": "100.00",
        "time": "2024-01-15 10:30"
    },
    verifyTemplateCode="SMS_ORDER_NOTIFY"
)
````

## 属性
暂无

## 高级特性
### 错误处理
阿里云短信元素提供完整的错误处理机制，包含以下预定义错误码：

````python title="错误处理示例"
try:
    result = sms_element.sendMessage(
        phoneList=["13800138000"],
        params={"code": "1234"},
        verifyTemplateCode="SMS_123456789"
    )
except Exception as e:
    # 错误码：46001 - 参数缺失或手机号列表为空
    # 错误码：46002 - 发送短信失败，阿里云API返回错误
    # 错误码：46003 - 短信发送请求失败
    log.error(f"短信发送失败: {e}")
````

### 模板管理
在使用前需要在阿里云短信服务控制台创建短信模板和签名：

````python title="模板配置说明"
# 1. 在阿里云控制台创建短信签名，获取verifySign
# 2. 创建短信模板，获取模板代码
# 3. 模板示例：
#    验证码模板：验证码${code}，5分钟内有效。
#    通知模板：亲爱的${name}，${event}将于${time}进行。

# 使用时传入对应的模板代码和参数
result = sms_element.sendMessage(
    phoneList=["13800138000"],
    params={"code": "123456"},  # 对应模板中的${code}
    verifyTemplateCode="SMS_123456789"  # 阿里云分配的模板代码
)
```` 