---
slug: custom-events
---
# 自定义事件 {#custom-events}
自定义事件由开发者在服务元素中根据需要自由定义，并在业务逻辑代码中进行触发，为事件驱动型的系统开发提供足够的灵活度。

自定义事件元素分层结构为Meta（events.Meta） → Type（events.NormalType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建自定义事件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.NormalType元素，以实现自己的封装。

## 快速开始 
开发者需要先[在服务元素中定义事件](./custom-business-service#event-definition-and-usage)，然后才能创建`自定义事件`实例元素订阅服务中定义的事件，并编写事件业务逻辑代码。

### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
events/
├── MyCustomEvent/
│   ├── e.json
│   ├── inner.py（可选，当funcType为Inner时）
│   └── __init__.py
```

#### e.json文件
```json title="事件元素定义文件"
{
    "type": "events.NormalType",
    "funcType": "Inner",
    "asyncType": false,
    "sender": "services.MyService.CustomEvent",
    "title": "测试自定义事件",
    "backendBundleEntry": ".",
    "returnType": "None",
    "backendEpath": "events/MyCustomEvent/element.pkg",
    "extendType": "self"
}
```

sender：声明事件的服务元素的fullName.事件名

#### 事件逻辑代码
当`funcType`为`Inner`时，需要创建`inner.py`文件：

```python title="内部事件处理函数"
from datatypes.Meta import datatypes

def customFunc(*args, **kwargs):
    """
    自定义事件处理函数
    """
    # 业务逻辑实现
    print("自定义事件被触发")
    return True

```

#### 调用示例
```python title="事件触发示例"
# sender：声明事件的服务元素的fullName.事件名
app.event.publish(sender="services.MyService.CustomEvent",args=("paramValue"))

```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | String | 是 | 固定值：`events.NormalType` |
| sender | String | 是 | 事件发送方，格式：`服务元素fullName.事件名` |
| funcType | String | 是 | 函数类型：`Global`/`Inner`，默认`Global` |
| func | String | 条件必填 | 当`funcType`为`Global`时指定要调用的服务函数，值为`元素fullName.函数名` |
| asyncType | Boolean | 否 | 是否异步执行，默认`false` |
| enable | Integer | 否 | 是否启用，1启用/0禁用，默认`0` |
| objMode | Boolean | 否 | 对象模式，默认`false` |
| returnType | String | 否 | 返回值类型，默认`None` |
| title | String | 否 | 事件显示名称，默认使用`fullName` |
| path | String | 否 | 元素所在目录相对路径（示例：`events`） |
| backendBundleEntry | String | 否 | 后端打包入口目录，相对路径（示例：`.`） |
| backendEpath | String | 否 | 后端元素打包路径（示例：`events/testCustomEvents/element.pkg`） |
| extendType | String | 否 | 继承扩展类型（示例：`self`） |

### 业务配置文件配置
当`funcType`为`Inner`时，支持创建独立的业务逻辑文件：

- **inner.py**: 包含`customFunc`函数的业务逻辑文件
- **__init__.py**: 包初始化文件，导入业务逻辑

## 方法 
### call
执行事件处理函数，记录执行时间。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| args | 可变参数 | tuple | 否 | 位置参数 |
| kwargs | 关键字参数 | dict | 否 | 命名参数 |

#### 返回值
返回事件处理函数的执行结果，类型根据具体业务逻辑而定。

#### 使用示例
```python title="事件调用示例"
# 获取事件实例
event = app.getElement("events.MyCustomEvent")

# 调用事件
result = event.call(
    userId=123,
    action="update",
    data={"name": "张三", "email": "zhangsan@example.com"}
)
```

### getSender
获取事件发送方标识。

#### 返回值
返回字符串类型的发送方标识，格式为：`服务元素fullName.函数名`

#### 使用示例
```python title="获取发送方示例"
event = app.getElement("events.MyCustomEvent")
sender = event.getSender()
print(f"事件发送方: {sender}")
```

### isValid
检查事件是否有效，可在子类中重写实现自定义验证逻辑。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| args | 可变参数 | tuple | 否 | 验证参数 |
| kwargs | 关键字参数 | dict | 否 | 验证参数 |

#### 返回值
返回布尔值，True表示事件有效，False表示无效。

#### 使用示例
```python title="事件有效性检查"
event = app.getElement("events.MyCustomEvent")
if event.isValid(userId=123):
    result = event.call(userId=123, action="process")
```

### handleNode
处理事件节点，在执行事件函数之前触发，可对节点和参数进行预处理。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| node | Object | object | 是 | 事件节点对象 |
| args | 可变参数 | tuple | 否 | 原始参数 |
| kwargs | 关键字参数 | dict | 否 | 原始参数 |

#### 返回值
返回包含三个元素的元组：(处理后的节点, 处理后的args, 处理后的kwargs)

#### 使用示例
```python title="节点处理示例"
# 在自定义事件类中重写handleNode方法
def handleNode(self, node, *args, **kwargs):
    # 添加时间戳
    kwargs['timestamp'] = datetime.now()
    
    # 日志记录
    print(f"处理事件节点: {node}, 参数: {args}, {kwargs}")
    
    return node, args, kwargs
```

### createTask
创建异步任务，当事件配置为异步执行时使用。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| taskParams | JitDict | dict | 是 | 任务参数，必须可序列化 |
| nodeId | Stext | str | 是 | 触发事件的节点ID |
| requestId | Stext | str | 是 | 请求ID，用于日志定位 |

#### 使用示例
```python title="创建异步任务示例"
# 构造任务参数
taskParams = {
    "userId": 123,
    "action": "processData",
    "data": {"key": "value"}
}

# 创建异步任务
event.createTask(
    taskParams=taskParams,
    nodeId="node_001",
    requestId="req_12345"
)
```

## 属性
### name
事件的完整名称（fullName）。

### sender
事件发送方标识，格式为：`服务元素fullName.函数名`

### funcType
函数类型，可选值：
- `Global`: 调用全局服务函数
- `Inner`: 调用内部自定义函数

### func
当funcType为Global时，指定要调用的服务函数名。

### asyncType
是否异步执行，布尔值。

### enable
事件是否启用，1表示启用，0表示禁用。

### objMode
对象模式，当为true时，事件参数将被包装在obj对象中传递。

### callTime
事件最后一次被调用的时间，datetime类型。

## 高级特性
### 异步事件处理
配置`asyncType`为`true`可实现事件的异步执行：

```json title="异步事件配置"
{
  "type": "events.NormalType",
  "title": "异步处理事件",
  "sender": "services.DataProcessor.asyncProcess",
  "funcType": "Global",
  "func": "handleAsyncData",
  "asyncType": true,
  "enable": 1
}
```

### 对象模式参数传递
启用`objMode`可将所有参数包装在obj对象中：

```json title="对象模式配置"
{
  "type": "events.NormalType",
  "title": "对象模式事件",
  "sender": "services.ObjectHandler.processObject",
  "funcType": "Inner",
  "objMode": true,
  "enable": 1
}
```

### 事件链式调用
通过事件引擎可实现事件的链式调用和复杂业务逻辑：

```python title="事件链式调用示例"
# 获取事件服务
eventSvc = app.getElement("events.services.EventSvc")

# 触发事件链
eventSvc.callEvent("events.DataValidation", data=inputData)
eventSvc.callEvent("events.DataProcessing", data=validatedData)
eventSvc.callEvent("events.DataStorage", data=processedData)
```

### 自定义事件验证
重写`isValid`方法实现自定义验证逻辑：

```python title="自定义验证逻辑"
def customFunc(*args, **kwargs):
    # 获取用户ID
    userId = kwargs.get('userId')
    
    # 业务验证
    if not userId or userId <= 0:
        return False
    
    # 权限检查
    userService = app.getElement("services.UserService")
    if not userService.hasPermission(userId, "process_data"):
        return False
    
    # 执行业务逻辑
    print(f"用户 {userId} 触发了数据处理事件")
    return True
``` 
