---
sidebar_position: 1
slug: scheduled-tasks
description: "定时任务 API 参考文档。完整的规格说明、方法和示例。"
---

# 定时任务
定时任务是JitTask框架中用于实现周期性业务自动化的核心元素，负责任务执行逻辑处理、下次执行时间计算和任务状态管理。

定时任务元素分层结构为Meta（tasks.Meta）→ Type（tasks.NormalType）→ 实例，开发者可通过可视化开发工具快捷地创建定时任务实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的tasks.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```title="推荐目录结构"
tasks/
└── TestTimeTasks/
    ├── e.json
    ├── inner.py
    └── __init__.py
```

#### e.json文件
```json title="tasks/TestTimeTasks/e.json"
{
  "type": "tasks.NormalType",
  "funcType": "Inner",
  "title": "测试定时任务",
  "timerCfg": {
    "startTime": "2024-01-01 09:00:00",
    "endTime": "2024-12-31 18:00:00",
    "repeat": {
      "repeatType": "day",
      "period": 1
    },
    "skipHoliday": 1
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### 业务逻辑代码
```python title="tasks/TestTimeTasks/inner.py"
from datatypes.Meta import datatypes
from jit.commons.utils.logger import log

def customFunc():
    """定时任务执行函数"""
    log.info("定时任务开始执行")
    
    # 获取用户模型进行数据操作
    UserModel = app.getElement("models.UserModel")
    users = UserModel.query(filter="Q(status='active')")
    
    for user in users["rowDatas"]:
        # 执行业务逻辑
        log.info(f"处理用户: {user.name.value}")
    
    log.info("定时任务执行完成")
    return {"status": "success", "processedCount": len(users["rowDatas"])}
```

#### 调用示例
```python title="获取和使用定时任务元素"
# 获取定时任务元素
task_element = app.getElement("tasks.TestTimeTasks")

# 创建任务实例
from tasks.Meta import Timer
timer = Timer({
    "startTime": "2024-01-01 09:00:00",
    "repeat": {"repeatType": "day", "period": 1}
})

# 计算下次执行时间
next_time = timer.nextTime()
print(f"下次执行时间: {next_time}")
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|--------|
| type | string | 是 | 元素类型，固定为"tasks.NormalType" | "tasks.NormalType" |
| funcType | string | 是 | 函数类型："Inner"(内部函数)或"Global"(全局函数) | "Inner" |
| title | string | 是 | 任务标题 | "数据同步任务" |
| timerCfg | object | 是 | 时间配置对象 | 见timerCfg配置 |
| enable | number | 否 | 是否启用：1启用，0禁用 | 1 |
| backendBundleEntry | string | 是 | 后端入口，固定为"." | "." |

### timerCfg配置
| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|--------|
| startTime | string | 是 | 开始时间 | "2024-01-01 09:00:00" |
| endTime | string | 否 | 结束时间 | "2024-12-31 18:00:00" |
| repeat | object | 是 | 重复配置对象 | 见repeat配置 |
| skipHoliday | number | 否 | 是否跳过节假日：1跳过，0不跳过 | 1 |

### repeat配置
| 参数名 | 类型 | 必填 | 说明 | 可选值 |
|--------|------|------|------|--------|
| repeatType | string | 是 | 重复类型 | "year","month","week","day","hour","minute","normal" |
| period | number | 是 | 重复周期 | 正整数 |

## 方法 
### handle
执行任务的核心方法，处理具体的业务逻辑。

#### 参数详解
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| task | RowData | object | 是 | 任务数据对象 |

#### 返回值
- **类型**: any
- **说明**: 任务执行结果，可以是字典、字符串或其他数据类型

#### 使用示例
```python title="重写handle方法"
from tasks.Meta import BaseTask

class CustomTask(BaseTask):
    def handle(self, task):
        # 获取任务参数
        params = task.argDict.value or {}
        
        # 执行业务逻辑
        result = self.processData(params)
        
        return result
```

### getNextRunTime
计算任务下次执行时间。

#### 参数详解
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| task | RowData | object | 是 | 任务数据对象 |
| now | Datetime | datetime | 否 | 当前时间，用于测试 |

#### 返回值
- **类型**: Arrow对象或None
- **说明**: 下次执行时间，None表示无下次执行

#### 使用示例
```python title="计算下次执行时间"
# 获取定时任务元素
task_element = app.getElement("tasks.TestTimeTasks")

# 模拟任务对象
task_data = {
    "element": "tasks.TestTimeTasks",
    "startTime": "2024-01-01 09:00:00"
}

# 计算下次执行时间
next_time = task_element.getNextRunTime(task_data)
if next_time:
    print(f"下次执行时间: {next_time.format('YYYY-MM-DD HH:mm:ss')}")
```

### afterReturn
任务执行完成后的回调方法，用于计算下次任务。

#### 参数详解
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| task | RowData | object | 是 | 当前任务数据对象 |

#### 使用示例
```python title="自定义任务完成后处理"
def afterReturn(self, task):
    # 执行父类逻辑：创建下次任务
    super().afterReturn(task)
    
    # 自定义后处理逻辑
    self.sendNotification(task)
```

### getFunc
获取任务执行函数。

#### 参数详解
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| task | RowData | object | 是 | 任务数据对象 |

#### 返回值
- **类型**: function或None
- **说明**: 可执行的函数对象

#### 使用示例
```python title="获取执行函数"
# 获取任务执行函数
func = task_element.getFunc(task)
if func:
    result = func(**task.argDict.value or {})
```

## 属性
### config
任务配置信息，包含所有e.json中的配置项。

### customFunc
内部自定义函数，当funcType为"Inner"时使用。

### taskType
任务类型标识，值为配置中的type字段。

### TaskModel
任务数据模型，用于数据库操作。

### TaskHistoryModel
任务历史记录模型，用于记录执行历史。

## 高级特性
### 复杂周期配置
#### 按月重复配置
```json title="每月15日执行"
{
  "timerCfg": {
    "startTime": "2024-01-15 10:00:00",
    "repeat": {
      "repeatType": "month",
      "period": 1,
      "subType": "day",
      "day": [15]
    }
  }
}
```

#### 按周重复配置
```json title="每周一、三、五执行"
{
  "timerCfg": {
    "startTime": "2024-01-01 09:00:00",
    "repeat": {
      "repeatType": "week",
      "period": 1,
      "weekday": [1, 3, 5]
    }
  }
}
```

#### 按年重复配置
```json title="每年6月第一个周一执行"
{
  "timerCfg": {
    "startTime": "2024-06-01 09:00:00",
    "repeat": {
      "repeatType": "year",
      "period": 1,
      "month": 6,
      "week": 1,
      "weekday": [1]
    }
  }
}
```

### 全局函数调用
```json title="调用服务函数"
{
  "funcType": "Global",
  "taskFunc": "services.DataSyncService.syncUserData"
}
```

### 带参数任务
```python title="任务参数传递"
def customFunc():
    # 从全局变量获取任务参数
    task = GlobalVar.currentTask
    params = task.argDict.value
    
    batch_size = params.get("batchSize", 100)
    filter_condition = params.get("filter", "")
    
    # 使用参数执行业务逻辑
    return process_data(batch_size, filter_condition)
``` 