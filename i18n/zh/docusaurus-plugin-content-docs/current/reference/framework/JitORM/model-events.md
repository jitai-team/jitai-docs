---
slug: model-events
---
# 模型事件 {#model-events}
模型事件是基于模型数据操作自动触发的事件机制，基于事件订阅发布模式实现数据变更的监听和响应。它负责监听模型的增删改操作、提供丰富的触发时机选择和支持条件筛选与字段级触发控制，支持同步和异步执行模式，适用于数据审计、业务规则执行、消息通知等场景。

模型事件元素分层结构为Meta（events.Meta） → Type（events.ModelType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建模型事件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的events.ModelType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
events/
└── UserDataAudit/           # 用户数据审计事件
    ├── e.json              # 事件配置文件
    ├── inner.py            # 内部函数实现（funcType为Inner时）
    └── __init__.py         # 包初始化文件
```

```json title="e.json - 事件配置文件"
{
  "type": "events.ModelType",
  "title": "用户数据审计",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "funcType": "Inner",
  "asyncType": false,
  "filter": "Q(status='active')",
  "fields": ["name", "email", "status"],
  "enable": 1,
  "backendBundleEntry": "."
}
```

```python title="inner.py - 事件处理函数"
def customFunc(eventOutData):
    """
    用户数据变更审计
    
    Args:
        eventOutData: JitDict类型，包含事件相关数据
    """
    model = eventOutData.model.value
    opt_type = eventOutData.optType.value
    prev_data = eventOutData.prevData.value
    post_data = eventOutData.postData.value
    
    print(f"模型 {model} 发生 {opt_type} 操作")
    print(f"变更前数据: {prev_data}")
    print(f"变更后数据: {post_data}")
```

```python title="__init__.py"
from .inner import customFunc
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| type | string | 固定值 `events.ModelType` | - | 是 |
| title | string | 事件标题 | - | 是 |
| sender | string | 监听的模型fullName | - | 是 |
| operate | string | 操作类型，见操作类型枚举 | - | 是 |
| funcType | string | 函数类型：`Global` &#124; `Inner` | `Global` | 否 |
| func | string | 全局函数路径（funcType为Global时必填） | - | 否 |
| asyncType | boolean | 是否异步执行 | `false` | 否 |
| filter | string | Q表达式筛选条件 | - | 否 |
| fields | array | 触发字段列表，空则监听所有字段 | `[]` | 否 |
| enable | number | 是否启用：1启用，0禁用 | `1` | 否 |

**操作类型枚举**：
- `AddBefore` - 新增数据前触发
- `AddAfter` - 新增数据后触发  
- `UpdateBefore` - 修改数据前触发
- `UpdateAfter` - 修改数据后触发
- `DeleteBefore` - 删除数据前触发
- `DeleteAfter` - 删除数据后触发
- `FieldUpdateAfter` - 任意写操作后触发

## 方法 
### getSender
获取事件的真实发送者标识。

#### 返回值
| 类型 | 说明 |
|------|------|
| string | 格式为 `{modelFullName}_{operate}` 的发送者标识 |

#### 使用示例
```python title="获取事件发送者"
# 在事件处理函数中
user_event = app.getElement("events.UserDataAudit")
sender = user_event.getSender()
print(f"事件发送者: {sender}")  # 输出: models.UserModel_UpdateAfter
```

### isValid
检查事件是否应该触发，综合验证筛选条件和字段变更条件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| rowObj | object | 包含prevData和postData的行数据对象 | `None` | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| boolean | `True` 表示应该触发事件，`False` 表示不触发 |

#### 使用示例
```python title="事件有效性检查"
# 模拟行数据对象
row_obj = type('obj', (), {
    'value': {
        'model': 'models.UserModel',
        'prevData': {'id': 1, 'name': '张三', 'status': 'inactive'},
        'postData': {'id': 1, 'name': '张三', 'status': 'active'}
    }
})()

user_event = app.getElement("events.UserDataAudit")
is_valid = user_event.isValid(row_obj)
print(f"事件是否触发: {is_valid}")
```

### isFilterValid
验证筛选条件是否满足。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| rowObj | object | 包含数据的行对象 | `None` | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| boolean | 筛选条件是否满足 |

### isFieldValid
验证字段变更条件是否满足。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| rowObj | object | 包含数据的行对象 | `None` | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| boolean | 字段变更条件是否满足 |

### buildEmptyDict
构建模型的空字典结构，包含模型所有字段且值为None。

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 包含模型所有字段的空字典 |

#### 使用示例
```python title="构建空字典"
user_event = app.getElement("events.UserDataAudit")
empty_dict = user_event.buildEmptyDict()
print(empty_dict)  # {'id': None, 'name': None, 'email': None, 'status': None}
```

### call
执行事件函数并记录执行时间。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| *args | any | 传递给事件函数的位置参数 | - | 否 |
| **kwargs | any | 传递给事件函数的关键字参数 | - | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 事件函数的返回值 |

#### 使用示例
```python title="手动调用事件"
user_event = app.getElement("events.UserDataAudit")

# 构造事件数据
event_data = app.newVariable({
    "name": "eventOutData",
    "title": "事件数据",
    "dataType": "JitDict",
    "variableList": [
        {"name": "model", "title": "模型", "dataType": "Stext"},
        {"name": "optType", "title": "操作类型", "dataType": "Stext"},
        {"name": "prevData", "title": "变更前数据", "dataType": "RowData"},
        {"name": "postData", "title": "变更后数据", "dataType": "RowData"}
    ]
})

event_data.value = {
    "model": "models.UserModel",
    "optType": "UpdateAfter",
    "prevData": {"id": 1, "name": "张三"},
    "postData": {"id": 1, "name": "李四"}
}

# 调用事件
result = user_event.call(event_data)
```

### handleNode
在执行事件函数前处理事件节点，可对节点进行定制化操作。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| node | object | 事件节点对象 | - | 是 |
| *args | any | 事件函数参数 | - | 否 |
| **kwargs | any | 事件函数关键字参数 | - | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| tuple | 包含处理后的 (node, args, kwargs) 的三元组 |

### buildTaskParams
构造异步任务参数，将事件参数序列化为可存储的格式。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| *args | any | 事件函数参数 | - | 否 |
| **kwargs | any | 事件函数关键字参数 | - | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| dict | 序列化后的任务参数 |

### recoverTaskParams
从任务参数恢复事件函数参数。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| taskParam | dict | 任务参数字典 | - | 是 |

#### 返回值
| 类型 | 说明 |
|------|------|
| tuple | 包含恢复的 (args, kwargs) 的二元组 |

### createTask
创建异步事件任务。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| taskParams | dict | 任务参数 | - | 是 |
| nodeId | string | 事件节点ID | - | 是 |
| requestId | string | 请求ID | - | 是 |

## 属性
### name
事件的fullName标识，只读属性。

### sender
监听的模型fullName，只读属性。

### funcType
函数类型，可选值为 `Global` 或 `Inner`，只读属性。

### func
当funcType为Global时指定的全局函数路径，只读属性。

### type
事件类型，固定为 `events.ModelType`，只读属性。

### enable
是否启用事件，1为启用，0为禁用，只读属性。

### title
事件显示标题，只读属性。

### asyncType
是否异步执行事件，只读属性。

### callTime
最后一次执行事件的时间，可能为None（未执行过），只读属性。

### operate
监听的操作类型，对应EventTypeEnum枚举值，只读属性。

### filterQ
Q表达式筛选条件字符串，只读属性。

### fields
指定触发的字段列表，空列表表示监听所有字段，只读属性。

## 高级特性
### 条件筛选与字段监听
模型事件支持精确的触发控制，可通过筛选条件和字段监听实现精准的事件响应。

```json title="高级筛选配置"
{
  "type": "events.ModelType",
  "title": "VIP用户状态变更监听",
  "sender": "models.UserModel",
  "operate": "UpdateAfter",
  "filter": "Q(user_type='vip') & Q(status__in=['active', 'inactive'])",
  "fields": ["status", "level"],
  "funcType": "Global",
  "func": "services.NotificationSvc.sendVipStatusAlert",
  "asyncType": true
}
```

### 异步事件处理
对于复杂的业务逻辑或耗时操作，可启用异步执行避免阻塞主流程。

```python title="异步事件处理函数"
def customFunc(eventOutData):
    """
    异步处理用户数据同步
    """
    import time
    
    user_data = eventOutData.postData.value
    print(f"开始同步用户数据: {user_data['name']}")
    
    # 模拟耗时操作
    time.sleep(2)
    
    # 调用外部API同步数据
    sync_service = app.getElement("services.DataSyncSvc")
    sync_service.syncUserToThirdParty(user_data)
    
    print(f"用户数据同步完成: {user_data['name']}")
```

### 多模型事件协调
通过组合多个模型事件实现复杂的业务流程控制。

```json title="订单状态变更事件"
{
  "type": "events.ModelType", 
  "title": "订单完成后库存更新",
  "sender": "models.OrderModel",
  "operate": "UpdateAfter",
  "filter": "Q(status='completed')",
  "fields": ["status"],
  "funcType": "Global", 
  "func": "services.InventorySvc.updateStock"
}
```

```json title="库存变更通知事件"
{
  "type": "events.ModelType",
  "title": "库存不足预警",
  "sender": "models.InventoryModel", 
  "operate": "UpdateAfter",
  "filter": "Q(quantity__lt=10)",
  "fields": ["quantity"],
  "funcType": "Global",
  "func": "services.AlertSvc.sendLowStockWarning"
}
```
