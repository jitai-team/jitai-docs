---
slug: custom-business-service
description: "自定义业务服务 API 参考文档。完整的规格说明、方法和示例。"
---
# 自定义业务服务
服务元素是JitAI平台中负责业务逻辑处理的核心组件，用于封装数据处理、业务计算和系统交互逻辑。

服务元素分层结构为Meta（services.Meta） → Type（services.NormalType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建服务实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的services.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```title="服务元素目录结构"
services/
├── MyBusinessService/          # 服务元素目录（路径可自定义）
│   ├── e.json                  # 元素定义文件
│   ├── service.py              # 服务实现文件
│   └── __init__.py             # 包初始化文件
```

#### e.json文件
```json title="services/MyBusinessService/e.json"
{
    "title": "我的业务服务",
    "type": "services.NormalType",
    "backendBundleEntry": ".",
    "functionList": [
        {
            "name": "calculateTotal",
            "title": "计算总价",
            "args": [
                {
                    "name": "amount",
                    "title": "金额",
                    "dataType": "Money"
                },
                {
                    "name": "discount",
                    "title": "折扣率",
                    "dataType": "Percent"
                }
            ],
            "returnType": "Money",
            "argsToDatatype": true,
            "desc": "根据金额和折扣率计算最终总价"
        }
    ]
}
```

#### 业务逻辑代码
```python title="services/MyBusinessService/service.py"
from services.NormalType import NormalService
from datatypes.Meta import datatypes

class MyBusinessService(NormalService):
    
    def calculateTotal(self, amount, discount):
        """计算总价"""
        # 获取金额数值
        base_amount = amount.value
        discount_rate = discount.value / 100
        
        # 计算折扣后金额
        final_amount = base_amount * (1 - discount_rate)
        
        # 返回Money类型
        return datatypes.Money(value=final_amount)
```

```python title="services/MyBusinessService/__init__.py"
from .service import MyBusinessService
```

#### 调用示例
```python title="调用服务元素"
# 获取服务实例
service = app.getElement("services.MyBusinessService")

# 调用服务方法
result = service.calculateTotal(amount=1000.0, discount=15.0)
print(f"最终金额: {result.value}")  # 输出: 最终金额: 850.0
```

## 元素配置
### e.json配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 是 | 服务元素标题 |
| type | String | 是 | 固定值"services.NormalType" |
| backendBundleEntry | String | 是 | 固定值"." |
| functionList | Array | 否 | 服务函数定义列表 |
| eventDescs | Array | 否 | 事件定义列表 |

#### functionList配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 函数名称 |
| title | String | 是 | 函数标题 |
| args | Array | 否 | 参数定义列表 |
| returnType | String | 否 | 返回值类型 |
| argsToDatatype | Boolean | 否 | 是否自动转换参数为JitAI数据类型 |
| desc | String | 否 | 函数描述 |

#### args参数配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 参数名称 |
| title | String | 是 | 参数标题 |
| dataType | String | 是 | JitAI数据类型 |
| acceptDataTypes | Array | 否 | 可接受的数据类型列表 |
| value | Any | 否 | 默认值 |

#### eventDescs配置
| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 事件名称 |
| title | String | 是 | 事件标题 |
| desc | String | 否 | 事件描述 |

## 方法 
### requestHandle
处理HTTP请求，根据请求路径调用对应的服务函数。在元素规范中，任何拥有requestHandle函数的元素都可以通过HTTP请求进行调用，而服务元素常被用于HTTP请求，和[API授权](./api-authorization)元素配合提供对外API接口。

#### 参数详解
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| request | - | Request对象 | 是 | 包含请求信息的对象 |

#### 返回值
- **类型**: Any
- **说明**: 被调用函数的返回值

调用示例可以参考[JAAP中关于元素调用的规范](../../runtime-platform/JAAP#call-elements-in-business-logic)。

## 属性
### __title__
- **类型**: String
- **说明**: 服务元素的标题
- **访问**: 只读

### __fullName__
- **类型**: String  
- **说明**: 服务元素的完整名称标识
- **访问**: 只读

### __functionList__
- **类型**: Dict
- **说明**: 服务函数信息字典，键为函数名，值为函数定义
- **访问**: 只读

## 高级特性
### 自动参数转换
当在functionList中设置`argsToDatatype: true`时，服务会自动将传入参数转换为指定的JitAI数据类型。

```json title="启用自动参数转换"
{
    "name": "processUser",
    "title": "处理用户信息", 
    "args": [
        {
            "name": "userId",
            "title": "用户ID",
            "dataType": "AutoInt"
        },
        {
            "name": "userName", 
            "title": "用户名",
            "dataType": "Stext"
        }
    ],
    "argsToDatatype": true
}
```

```python title="自动转换的服务方法"
def processUser(self, userId, userName):
    # userId 自动转换为 AutoInt 类型
    # userName 自动转换为 Stext 类型
    print(f"用户ID类型: {type(userId)}")  # <class 'datatypes.AutoInt'>
    print(f"用户名类型: {type(userName)}")  # <class 'datatypes.Stext'>
```

### 事件定义与使用 {#event-definition-and-usage} 
服务元素支持定义和触发自定义事件。

**事件定义**: 在服务e.json文件中添加触发的事件声明 `eventDescs`
```json title="事件定义示例"
{
    "eventDescs": [
        {
            "name": "dataProcessed",
            "title": "数据处理完成",
            "desc": "当数据处理完成时触发此事件"
        }
    ]
}
```

**触发事件**：使用`app.event.publish`方法触发

```python
# sender：声明事件的服务元素的fullName.事件名
app.event.publish(sender="services.MyService.CustomEvent", args=("paramValue",), kwargs={"key": "value"})
```
```python title="触发事件示例"
def processData(self, data):
    # 处理数据逻辑
    result = self._doDataProcessing(data)
    
    # 触发事件
    app.triggerEvent("dataProcessed", {
        "processedCount": len(result),
        "timestamp": datetime.now()
    })
    
    return result
```

### 参数验证
服务元素会自动验证传入参数是否符合functionList中的定义。

```python title="参数验证示例"
# 如果传入未定义的参数会抛出异常
service.calculateTotal(
    amount=1000,
    discount=15,
    invalidParam="test"  # 这会导致 API_PARAMS_ERROR 异常
)
```

### 异常处理
服务元素提供统一的异常处理机制。

```python title="异常处理示例"
from jit.errcode import Code

class MyBusinessService(NormalService):
    
    # 定义业务错误码
    INVALID_AMOUNT = Code(code=10001, reason="金额不能为负数")
    
    def calculateTotal(self, amount, discount):
        if amount.value < 0:
            raise self.INVALID_AMOUNT
            
        # 正常业务逻辑
        return self._doCalculation(amount, discount)
```
