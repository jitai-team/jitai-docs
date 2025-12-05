---
sidebar_position: 1
slug: scheduled-tasks
description: "定时任务 API 参考文档。完整的规格说明、方法和示例。"
---

# 定时任务

普通定时任务 (`tasks.NormalType`) 是 JitTask 框架中最基础的任务类型，类似于 Linux 的 Crontab。它完全依据系统时钟和预设的配置文件来触发，适用于与特定业务数据行无强关联的周期性后台作业，例如：

*   每日凌晨的数据清理
*   定期的报表统计
*   系统状态巡检

定时任务元素分层结构为Meta（tasks.Meta）→ Type（tasks.NormalType）→ 实例，开发者可通过可视化开发工具快捷地创建定时任务实例元素。

## 快速开始 

### 创建实例元素

#### 目录结构

在 `tasks/` 目录下创建一个新的任务目录（例如 `MyDailyJob`），标准结构如下：

```text
tasks/
└── MyDailyJob/           # [目录] 任务元素名称
    ├── e.json            # [文件] 核心配置文件
    ├── inner.py          # [文件] (可选) 内部执行逻辑代码
    └── __init__.py       # [文件] Python 包标识
```

#### e.json文件

```json title="tasks/MyDailyJob/e.json"
{
  "type": "tasks.NormalType",
  "funcType": "Global",
  "func": "services.DataSyncService.syncUserData",
  "title": "每日数据同步",
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

#### inner.py文件

```python title="tasks/MyDailyJob/inner.py"
from jit.commons.utils.logger import log

def customFunc():
    """
    函数名必须为 customFunc
    """
    # 业务逻辑...
    # 当 `funcType` 为 `Global` 时，无需实现该函数。
    pass
```

#### __init__.py文件

```python title="tasks/MyDailyJob/__init__.py"
# -*-coding:utf-8-*-

from .inner import customFunc
```

## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **是** | 固定值 | `"tasks.NormalType"` |
| `title` | String | **是** | 任务显示名称 | `"每日数据同步"` |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用（默认 0） | `1` |
| `funcType` | String | **是** | 函数类型: `"Inner"` 或 `"Global"` | `"Inner"` |
| `func` | String | 条件 | 当 `funcType` 为 `"Global"` 时必填，指向服务函数路径 | `"services.MySvc.run"` |
| `backendBundleEntry` | String | **是** | 后端加载入口，固定为 `"."` | `"."` |

### timerCfg配置

这是配置的核心部分，决定了任务何时执行。

| 参数名 | 类型 | 必填 | 说明 | 示例值 |
|--------|------|------|------|--------|
| `startTime` | String | **是** | 首次执行时间，格式: `yyyy-MM-dd HH:mm:ss` | `"2024-01-01 09:00:00"` |
| `endTime` | String | 否 | 任务终止时间，超过此时间后任务自动停止 | `"2024-12-31 18:00:00"` |
| `skipHoliday` | Integer | 否 | 是否跳过节假日：1跳过，0不跳过 | `1` |
| `repeat` | Object | **是** | 重复配置对象 | 见repeat配置 |

**说明**:
*   如果当前时间晚于 `startTime`，且任务尚未执行过，系统会根据 `repeat` 规则计算最近的一次应该执行的时间。
*   如果计划执行时间落在节假日（依据系统日历），且 `skipHoliday` 为 1，则顺延一个周期。

### repeat配置

`repeat` 对象中的 `repeatType` 决定了具体的重复策略。

| 参数名 | 类型 | 必填 | 说明 | 可选值 |
|--------|------|------|------|--------|
| `repeatType` | String | **是** | 重复类型 | `"year"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"normal"` |
| `period` | Integer | **是** | 重复周期，表示间隔数 | 正整数 |

**基础重复类型**：

*   **按天重复**: `"repeatType": "day", "period": 1` （每天）
*   **按小时重复**: `"repeatType": "hour", "period": 2` （每2小时）
*   **按分钟重复**: `"repeatType": "minute", "period": 30` （每30分钟）
*   **不重复**: `"repeatType": "normal"` （仅在 startTime 执行一次）

## 执行函数

### 函数体

**服务函数（推荐）**

适用于复用已有的 Service 逻辑。

确保 fullName 为 `services.DataSyncService` 的服务存在，且该服务中有 `syncUserData` 函数。

```python title="services/DataSyncService/service.py"

from datatypes.Meta import datatypes
from services.NormalType import NormalService

class DataSyncService(NormalService)：

  def syncUserData(self):
      """服务函数示例"""
      # 业务逻辑...
      return {"status": "completed"}
```

**任务内置函数**

适用于逻辑仅属于该任务，不需要复用的场景。函数实现在元素目录下的inner.py中，函数名固定为`customFunc`。

```python title="tasks/MyDailyJob/inner.py"
from jit.commons.utils.logger import log

def customFunc():
    """
    函数名必须为 customFunc
    无参数
    """
    log.info("开始执行每日任务...")
    
    # 获取用户模型进行数据操作
    UserModel = app.getElement("models.UserModel")
    users = UserModel.query(filter="Q(status='active')")
    
    for user in users["rowDatas"]:
        # 执行业务逻辑
        log.info(f"处理用户: {user.name.value}")
    
    log.info("任务执行完成")
    return {"status": "success", "processedCount": len(users["rowDatas"])}
```

## 调试与注意事项

1.  **生效时间**: 修改 `e.json` 后通常需要重启后端服务才能生效。

2.  **异常处理**: 
    *   如果代码抛出异常，任务状态会变为 `error`。
    *   **重要**: 如果异常导致程序崩溃且未被捕获，可能会影响下一次任务的生成（因为下一次任务是在当前任务 `afterReturn` 阶段生成的）。建议在 `customFunc` 内部进行 `try...except` 保护。

3.  **超时**: 默认超时时间为 12 小时。如果任务执行超过该时间，可能会被系统标记为过期。
