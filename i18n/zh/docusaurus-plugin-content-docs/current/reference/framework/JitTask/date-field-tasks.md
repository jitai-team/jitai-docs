---
sidebar_position: 2
slug: date-field-tasks
description: "日期字段任务 API 参考文档。完整的规格说明、方法和示例。"
---

# 日期字段任务
日期字段任务是基于模型中日期时间字段值自动触发的定时任务，当指定的日期时间字段到达设定时间时自动执行任务逻辑。它负责监控模型数据中的日期时间字段、在字段值到期时自动触发执行和提供灵活的时间偏移配置，支持提前或延后执行的精确时间控制。

日期字段任务元素分层结构为Meta（tasks.Meta） → Type（tasks.DateFieldType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建日期字段任务实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的tasks.DateFieldType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```
tasks/
└── ExampleDateTask/          # 任务名称，可自定义
    ├── e.json               # 元素配置文件
    ├── inner.py             # 任务执行逻辑（可选）
    └── __init__.py          # 包初始化文件
```

#### e.json文件
```json title="e.json"
{
  "type": "tasks.DateFieldType",
  "title": "示例日期字段任务",
  "funcType": "Inner",
  "modelPath": "models.OrderModel",
  "timerCfg": {
    "startField": "deliveryTime",
    "startOffset": {
      "offsetType": 1,
      "offset": 0,
      "offsetUnit": "hours"
    },
    "repeat": {
      "repeatType": "day",
      "period": 1
    },
    "endTimeType": 0,
    "skipHoliday": 1
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### 业务逻辑代码
```python title="inner.py"
def main(app, taskInstance, rowData):
    """
    任务执行主函数
    
    Args:
        app: 应用实例
        taskInstance: 任务实例
        rowData: 触发任务的数据行
    """
    # 获取订单信息
    order_id = rowData.id
    delivery_time = rowData.deliveryTime
    
    # 执行业务逻辑
    print(f"订单 {order_id} 的交付时间 {delivery_time} 已到达")
    
    # 可以调用其他服务进行处理
    # service = app.getElement("services.NotificationService")
    # service.sendDeliveryNotification(order_id)
```

#### 调用示例
```python title="使用日期字段任务"
# 获取任务实例
task = app.getElement("tasks.ExampleDateTask")

# 任务会自动监控 OrderModel 中 deliveryTime 字段
# 当字段值到达设定时间时，自动执行 inner.py 中的 main 函数
# 系统会根据 timerCfg.startOffset 配置计算实际执行时间
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| title | string | 是 | - | 任务标题 |
| type | string | 是 | - | 必须为 `tasks.DateFieldType` |
| funcType | string | 是 | - | 函数类型，固定为 `Inner` |
| modelPath | string | 是 | - | 目标模型的fullName |
| timerCfg | object | 是 | - | 定时器配置对象 |
| timerCfg.startField | string | 是 | - | 目标模型中的日期时间字段名 |
| timerCfg.startOffset | object | 否 | - | 开始时间偏移配置 |
| timerCfg.startOffset.offset | int | 否 | 0 | 时间偏移量，可为负数 |
| timerCfg.startOffset.offsetUnit | string | 否 | hours | 时间偏移单位：seconds/minutes/hours/days |
| timerCfg.startOffset.offsetType | int | 否 | 1 | 偏移类型，固定为1 |
| timerCfg.repeat | object | 否 | - | 重复配置 |
| timerCfg.endTimeType | int | 否 | 0 | 结束时间类型 |
| timerCfg.skipHoliday | int | 否 | 1 | 是否跳过节假日，1跳过，0不跳过 |
| enable | int | 否 | 1 | 是否启用，1启用，0禁用 |
| backendBundleEntry | string | 否 | "." | 后端代码入口目录 |

### 业务配置文件配置
日期字段任务不需要额外的业务配置文件，所有配置都在e.json中完成。

## 方法 
### main
任务执行的主要方法，在inner.py中定义。

#### 参数详解
| 参数名 | JitAi类型 | 原生类型 | 必填 | 说明 |
|--------|-----------|----------|------|------|
| app | App | object | 是 | 应用实例，用于获取其他元素 |
| taskInstance | TaskInstance | object | 是 | 当前任务实例 |
| rowData | RowData | object | 是 | 触发任务的数据行对象 |

#### 返回值
无返回值要求，函数执行完成即表示任务完成。

#### 使用示例
```python title="处理订单交付提醒"
def main(app, taskInstance, rowData):
    # 获取订单数据
    order_id = rowData.id
    customer_name = rowData.customerName
    delivery_time = rowData.deliveryTime
    
    # 获取通知服务
    notification_service = app.getElement("services.NotificationService")
    
    # 发送交付提醒
    notification_service.sendNotification({
        "type": "delivery_reminder",
        "orderId": order_id,
        "customerName": customer_name,
        "deliveryTime": delivery_time
    })
    
    # 更新订单状态
    order_model = app.getElement("models.OrderModel")
    order_model.id = order_id
    order_model.status = "notified"
    order_model.save()
```

## 属性
### config
任务配置对象，包含e.json中的所有配置信息，只读属性。

### TaskModel
任务模型实例，继承自父类，用于管理任务记录。

### TaskHistoryModel
任务历史模型实例，继承自父类，用于记录任务执行历史。

## 高级特性
### 时间偏移配置
通过offset和offsetUnit参数可以实现灵活的时间偏移：

#### 提前执行配置
```json title="提前1小时执行"
{
  "type": "tasks.DateFieldType",
  "modelPath": "models.MeetingModel",
  "timerCfg": {
    "startField": "startTime",
    "startOffset": {
      "offsetType": 1,
      "offset": -1,
      "offsetUnit": "hours"
    }
  }
}
```

#### 延后执行配置
```json title="延后30分钟执行"
{
  "type": "tasks.DateFieldType",
  "modelPath": "models.TaskModel",
  "timerCfg": {
    "startField": "deadline",
    "startOffset": {
      "offsetType": 1,
      "offset": 30,
      "offsetUnit": "minutes"
    }
  }
}
```

#### 多种时间单位
```json title="秒级偏移"
{
  "timerCfg": {
    "startOffset": {
      "offset": 5,
      "offsetUnit": "seconds"
    }
  }
}
```

```json title="天级偏移"
{
  "timerCfg": {
    "startOffset": {
      "offset": -1,
      "offsetUnit": "days"
    }
  }
}
```

### 复杂业务逻辑处理
```python title="综合业务处理示例"
def main(app, taskInstance, rowData):
    # 获取相关服务
    email_service = app.getElement("services.EmailService")
    sms_service = app.getElement("services.SmsService")
    log_service = app.getElement("services.LogService")
    
    try:
        # 记录任务开始
        log_service.info(f"开始处理订单 {rowData.id} 的交付提醒")
        
        # 检查客户偏好设置
        customer_model = app.getElement("models.CustomerModel")
        customer = customer_model.get(f"Q(id={rowData.customerId})", [])
        
        # 根据偏好选择通知方式
        if customer.notificationPreference == "email":
            email_service.sendDeliveryReminder(rowData)
        elif customer.notificationPreference == "sms":
            sms_service.sendDeliveryReminder(rowData)
        else:
            # 默认发送邮件
            email_service.sendDeliveryReminder(rowData)
        
        # 更新通知状态
        order_model = app.getElement("models.OrderModel")
        order_model.id = rowData.id
        order_model.notificationSent = True
        order_model.notificationTime = app.getElement("datatypes.Datetime")().getValue()
        order_model.save()
        
        log_service.info(f"订单 {rowData.id} 交付提醒发送成功")
        
    except Exception as e:
        log_service.error(f"处理订单 {rowData.id} 交付提醒时发生错误: {str(e)}")
        raise
``` 