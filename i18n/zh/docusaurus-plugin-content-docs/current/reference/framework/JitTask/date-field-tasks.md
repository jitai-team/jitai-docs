---
sidebar_position: 2
slug: date-field-tasks
description: "日期字段任务 API 参考文档。完整的规格说明、方法和示例。"
---

# 日期字段任务

日期字段任务 (`tasks.DateFieldType`) 是 JitTask 框架中一种**数据驱动**的任务类型。与定时任务不同，它的触发不完全依赖系统时钟，而是依赖于业务模型（Model）中具体数据行的日期/时间字段，适用于与特定业务数据强关联的事件提醒和处理，例如：

*   会议开始前 15 分钟发送提醒
*   合同到期当天自动更新状态为"已过期"
*   员工生日当天发送祝福邮件

日期字段任务元素分层结构为Meta（tasks.Meta）→ Type（tasks.DateFieldType）→ 实例，开发者可通过可视化开发工具快捷地创建日期字段任务实例元素。

**工作原理**：系统扫描指定的业务模型 (`modelPath`)，读取每行数据的指定时间字段 (`startField`)，结合配置的偏移量 (`offset`)，计算该行数据对应的任务触发时间。任务触发时，将该行数据作为上下文传递给执行函数。

## 快速开始

### 创建实例元素

#### 目录结构

在 `tasks/` 目录下创建一个新的任务目录（例如 `MeetingReminder`），标准结构如下：

```text
tasks/
└── MeetingReminder/      # [目录] 任务元素名称
    ├── e.json            # [文件] 核心配置文件
    ├── inner.py          # [文件] (可选) 内部执行逻辑代码
    └── __init__.py       # [文件] Python 包标识
```

#### e.json文件

```json title="tasks/MeetingReminder/e.json"
{
  "type": "tasks.DateFieldType",
  "title": "会议提醒",
  "modelPath": "models.MeetingModel",
  "funcType": "Global",
  "func": "services.MeetingSvc.notify",
  "timerCfg": {
    "startField": "startTime",
    "startOffset": {
      "offsetType": -1,
      "offset": 15,
      "offsetUnit": "minute"
    },
    "repeat": {
      "repeatType": "normal"
    }
  },
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### inner.py文件

```python title="tasks/MeetingReminder/inner.py"
from jit.commons.utils.logger import log

def customFunc(rowData):
    """
    函数名必须为 customFunc
    :param rowData: 触发任务的业务数据行
    """
    # 业务逻辑...
    # 当 `funcType` 为 `Global` 时，无需实现该函数。
    pass
```

#### __init__.py文件

```python title="tasks/MeetingReminder/__init__.py"
# -*-coding:utf-8-*-

from .inner import customFunc
```

当 `funcType` 为 `Global` 时，执行函数是一个服务函数，而不是 `customFunc`。

## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **是** | 固定值 | `"tasks.DateFieldType"` |
| `title` | String | **是** | 任务显示名称 | `"会议提醒"` |
| `modelPath` | String | **是** | 绑定的业务模型全路径 | `"models.MeetingModel"` |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用（默认 0） | `1` |
| `funcType` | String | **是** | 函数类型: `"Inner"` 或 `"Global"` | `"Global"` |
| `func` | String | 条件 | 当 `funcType` 为 `"Global"` 时必填，指向服务函数路径 | `"services.MeetingSvc.notify"` |
| `backendBundleEntry` | String | **是** | 后端加载入口，固定为 `"."` | `"."` |

### timerCfg配置

这是配置的核心部分，决定了任务何时执行。

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|--------|
| `startField` | String | **是** | 模型中的时间字段名，必须是 `DateTime` 或 `Date` 类型 | `"startTime"` |
| `startOffset` | Object | **是** | 触发时间偏移配置对象 | 见offset配置 |
| `endOffset` | Object | 否 | 结束时间偏移配置对象（用于区间型任务） | 见offset配置 |
| `repeat` | Object | **是** | 重复配置对象 | 见repeat配置 |

### offset配置

`startOffset` (和可选的 `endOffset`) 定义了任务相对于字段值的触发时机。

| 参数名 | 类型 | 必填 | 说明 | 可选值 |
|--------|------|------|------|--------|
| `offsetType` | Integer | **是** | 偏移方向 | `-1`: 之前（提前）<br />`0`: 准点<br />`1`: 之后（延后） |
| `offset` | Integer | **是** | 偏移数量 | 正整数 |
| `offsetUnit` | String | **是** | 时间单位 | `"minute"`: 分钟<br />`"hour"`: 小时<br />`"day"`: 天 |
| `time` | String | 否 | 强制时间点，格式 `HH:mm`。<br />如果设置此字段，`offset` 和 `offsetUnit` 的偏移逻辑将被忽略 | `"09:00"` |

**示例组合**：

*   **提前 15 分钟**: `{"offsetType": -1, "offset": 15, "offsetUnit": "minute"}`
*   **延后 3 天**: `{"offsetType": 1, "offset": 3, "offsetUnit": "day"}`
*   **当天上午 9 点** (忽略具体时分秒): `{"offsetType": 0, "offset": 0, "offsetUnit": "day", "time": "09:00"}`

### repeat配置

对于日期字段任务，`repeat` 决定了是否要针对同一行数据多次触发。

| 参数名 | 类型 | 必填 | 说明 | 可选值 |
|--------|------|------|------|--------|
| `repeatType` | String | **是** | 重复类型 | `"normal"`: 只触发一次<br />`"year"`: 每年触发 |

**说明**:
*   **`normal` (常用)**: 针对该行数据的该时间点，只触发一次。
*   **`year`**: 每年触发。例如员工生日提醒，模型中存储的是出生日期，配置按年重复后，每年该日期都会触发。

## 执行函数

### 函数入参
| 参数名 | JitAI类型 | Python类型 | 必填 | 说明 |
|--------|-----------|-------------|------|------|
| rowData | RowData | object | 是 | 触发任务的模型数据 |

### 函数体

**服务函数（推荐）**

适用于复用已有的 Service 逻辑。

```python title="services/MeetingSvc/service.py"
from datatypes.Meta import datatypes
from services.NormalType import NormalService

class MeetingSvc(NormalService)：

  def notify(self, rowData):
      """
      :param rowData: 触发任务的业务数据行
      """
      meeting_id = rowData.id.value
      title = rowData.title.value
      start_time = rowData.startTime.value
      
      log.info(f"执行会议提醒: ID={meeting_id}, 标题={title}")
      
      # 业务逻辑: 发送通知
      # send_message(user_id, f"会议 {title} 将于 {start_time} 开始")
      
      return "Done"
```


**任务内置函数**

适用于逻辑仅属于该任务，不需要复用的场景。函数实现在元素目录下的inner.py中，函数名固定为`customFunc`。

```python title="tasks/MeetingReminder/inner.py"
from jit.commons.utils.logger import log

def customFunc(rowData):
    """
    函数名必须为 customFunc
    :param rowData: 触发任务的业务数据行
    """
    # 获取数据 (注意 .value 的使用)
    meeting_id = rowData.id.value
    title = rowData.title.value
    start_time = rowData.startTime.value
    
    log.info(f"执行会议提醒: ID={meeting_id}, 标题={title}")
    
    # 业务逻辑: 发送通知
    # send_message(user_id, f"会议 {title} 将于 {start_time} 开始")
    
    return {"status": "success", "meetingId": meeting_id}
```

## 调试与注意事项

1.  **字段格式**: 模型中的 `startField` 必须是 `DateTime` 或 `Date` 类型。

2.  **生效时间**: 修改 `e.json` 后通常需要重启后端服务才能生效。

3.  **数据变动**: 如果业务数据的时间字段被修改（例如会议延期），系统通常会重新计算下一次触发时间（依赖于系统内部的同步机制，具体表现请测试确认）。

4.  **性能考虑**: 
    *   如果绑定的模型数据量巨大（百万级），请评估任务扫描对数据库的压力。
    *   建议为时间字段添加数据库索引以提高查询性能。
    *   可以通过筛选条件限制需要创建任务的数据范围。

5.  **RowData 上下文**: 
    *   传递给函数的 `rowData` 是任务触发时的快照。
    *   如果需要最新的数据，建议在函数内部通过 ID 重新查询数据库。

6.  **异常处理**: 
    *   如果代码抛出异常，任务状态会变为 `error`。
    *   建议在执行函数内部进行 `try...except` 保护，避免影响其他任务。

7.  **超时**: 默认超时时间为 12 小时。如果任务执行超过该时间，可能会被系统标记为过期。
