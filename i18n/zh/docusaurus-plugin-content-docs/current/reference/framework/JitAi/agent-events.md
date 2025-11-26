---
sidebar_position: 6
slug: agent-events
description: "Agent事件 API 参考文档。完整的规格说明、方法和示例。"
---

# Agent工具调用事件

Agent工具调用事件 (`events.AIAgentType`) 是极态平台中专门用于 AIAgent 相关操作的事件处理器。该事件**不会影响** Agent的正常运行。它仅在Agent调用工具前后触发事件消息以执行额外的业务逻辑。

Agent工具调用事件适用于增强 Agent 能力的旁路场景，例如：

*   **审计日志**：记录工具调用的输入输出、执行耗时等详细日志
*   **消息通知**：在关键工具执行前后发送通知消息
*   **状态同步**：将 Agent 的执行状态同步到其他业务系统

Agent事件元素分层结构为 Meta (`events.Meta`) → Type (`events.AIAgentType`) → 实例，开发者可通过可视化开发工具快捷地创建 Agent 事件实例元素。

**工作原理**：系统监听关联 Agent 的工具调用行为，当发生指定的阶段 (`stage`)（如调用前 `preEvent`、调用后 `postEvent`）时触发事件。事件会自动执行配置的函数，并将工具名称 (`toolName`)、工具入参/返回值 (`args`) 等上下文数据传递给执行函数。

## 快速开始

### 创建实例元素

#### 目录结构

在 `events/` 目录下创建一个新的事件目录（例如 `AgentToolEvent`），标准结构如下：

```text
events/
└── AgentToolEvent/          # [目录] 事件元素名称
    ├── e.json               # [文件] 核心配置文件
```

#### e.json文件

```json title="events/AgentToolEvent/e.json"
{
  "title": "Agent工具审计事件",
  "type": "events.AIAgentType",
  "sender": "aiagents.ModelKnowTest",
  "stage": "preEvent",
  "funcType": "Inner",
  "asyncType": false,
  "backendBundleEntry": "."
}
```

### 调用示例

## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | **是** | - | 事件标题，用于识别事件用途 |
| `type` | String | **是** | - | 固定值: `events.AIAgentType` |
| `sender` | String | **是** | - | 事件发送者，通常为 AIAgent 的 fullName |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用 | `1` (默认) |
| `stage` | String | **是** | - | 事件触发阶段: `preEvent` / `postEvent` |
| `func` | String | **是** | 指向服务函数路径 | 如：`"services.AuditSvc.log_agent_action"` |
| `asyncType` | Boolean | 否 | `false` | 是否异步执行 |
| `backendBundleEntry` | String | 否 | `"."` | 后端入口路径 |

### 触发阶段 (stage)

*   `preEvent`: **工具调用前触发**。
    *   用途：记录调用参数、发送开始通知。
    *   特性：作为钩子运行，不应阻断工具的实际调用。
*   `postEvent`: **工具调用后触发**。
    *   用途：记录执行结果、触发后续流程、状态同步。
    *   特性：可以获取到工具执行的最终结果，用于旁路处理。

## 执行函数

**函数入参**

| 参数名 | 说明 |
| :--- | :--- |
| `eventOutData` | `JitDict` 类型，包含事件上下文数据 |

**eventOutData 常用属性说明**：

| 属性名 | 类型 | 说明 | 适用阶段 |
| :--- | :--- | :--- | :--- |
| `toolName` | Stext | 被调用的工具名称 | 全部 |
| `stage` | Stext | 当前触发阶段 (`preEvent`/`postEvent`) | 全部 |
| `args` | JitDict/Ltext | 工具的输入参数 (`preEvent`) 或 执行结果 (`postEvent`) | 全部 |

**服务函数示例**

```python title="services/AuditSvc/service.py"
from services.NormalType import NormalService

class AuditSvc(NormalService):
    def log_agent_action(self, eventOutData):
        """
        :param eventOutData: 事件上下文数据
        """
        if eventOutData.stage.value == "postEvent":
            # 记录执行日志
            self.save_audit_log(eventOutData.toolName.value, eventOutData.args.value)
        return eventOutData
```

## 调试与注意事项

1.  **非阻塞设计**：
    *   Agent 事件的设计初衷是作为**钩子 (Hook)**，而非拦截器。
    *   虽然在同步模式下事件执行会占用时间，但应避免在事件中抛出异常或执行耗时过长的操作，以免影响 Agent 的正常响应。

2.  **异常处理**：
    *   务必在服务函数中使用 `try-except` 包裹业务逻辑。
    *   确保即使事件响应逻辑运行失败也不影响 Agent 主任务的连续性。

3.  **避免死循环**：
    *   如果在 Agent 事件中再次调用触发该事件的同一个 Agent，可能会导致无限递归，造成死循环。请谨慎设计事件触发后的后续动作。

4.  **日志调试**：
    *   建议使用 `jit.commons.utils.logger` 打印 `toolName`、`stage` 和关键参数，以便排查 Agent 的决策路径和执行状态。
