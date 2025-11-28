---
sidebar_position: 7
slug: assistant-events
description: "助理事件参考文档。完整的规格说明、方法和示例。"
---

# 助理事件

助理事件 (`events.AIAssistantType`) 是极态平台中专用于 AI 助理 (AI Assistant) 交互的事件处理器。它负责监听 AI 助理的执行过程、状态变化和用户交互。

**核心机制**：助理事件**不会影响** AI 助理流程的正常运行。它仅在合适的时机（如运行前后、节点审批时）触发事件消息以执行额外的业务逻辑（如审计、通知）。这些业务逻辑的运行是**旁路**的，旨在确保 AI 助理的主流程始终保持独立和稳定。

助理事件适用于增强 AI 助理能力的旁路场景，例如：

*   **流程监控**：监听助理运行状态，记录执行日志。
*   **协同工作**：在助理执行前后触发其他助理或业务逻辑。
*   **人工介入**：监听人工审核节点的审批动作（同意/拒绝/回复）。
*   **节点控制**：在特定流程节点执行前后进行数据校验或状态同步。

助理事件元素分层结构为 Meta (`events.Meta`) → Type (`events.AIAssistantType`) → 实例，开发者可通过可视化开发工具快捷地创建助理事件实例元素。

## 快速开始

### 创建实例元素

#### 目录结构

在 `events/` 目录下创建一个新的事件目录（例如 `AssistantMonitorEvent`），标准结构如下：

```text
events/
└── AssistantMonitorEvent/   # [目录] 事件元素名称
    ├── e.json               # [文件] 核心配置文件
```

#### e.json文件

```json title="events/AssistantMonitorEvent/e.json"
{
  "title": "助理运行监控事件",
  "type": "events.AIAssistantType",
  "sender": "aiassistants.CustomerService",
  "operate": "afterRun",
  "func": "services.LogService.record_execution",
  "asyncType": false,
  "backendBundleEntry": "."
}
```


## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | String | **是** | 事件显示名称 |
| `type` | String | **是** | 固定值：`events.AIAssistantType` |
| `sender` | String | **是** | 事件发送方，通常为 AI 助理的 `fullName` |
| `operate` | String | **是** | 事件触发时机，详见下文 [触发时机](#触发时机-operate) |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用 | `1` (默认) |
| `func` | String | **是** | 指向服务函数路径 | 如：`"services.AuditSvc.log_agent_action"` |
| `asyncType` | Boolean | 否 | 是否异步执行，默认 `false` |
| `backendBundleEntry` | String | **是** | 固定值：`"."` |

### 触发时机 (operate)

`operate` 字段决定了事件在何时被触发，支持以下几种模式：

#### 1. 基础时机 (助理级)
监听整个 AI 助理的运行周期：
*   `beforeRun`: 助理运行前触发。
*   `afterRun`: 助理运行后触发。

#### 2. 节点时机 (节点级)
监听流程中特定节点的执行状态，格式为 `${nodeId}.${timing}`：
*   `${nodeId}.beforeNodeRun`: 指定节点即将执行时触发。
*   `${nodeId}.afterNodeRun`: 指定节点执行完成后触发。

> **示例**：`node001.beforeNodeRun` (监听 node001 节点开始运行)

#### 3. 人工操作时机 (交互级)
监听人工节点（如审核、输入节点）的用户操作，格式为 `${nodeId}.${action}`：
*   `${nodeId}.approved`: 用户点击“同意”后触发。
*   `${nodeId}.rejected`: 用户点击“拒绝”后触发。
*   `${nodeId}.replied`: 用户回复消息后触发。
*   `${nodeId}.edited`: 用户编辑内容后触发。

> **示例**：`approvalNode.approved` (监听审核节点被通过)

## 执行函数

**函数入参**
调用函数时会将AI助理节点上配置的事件输出参数作为函数参数传入，请到AI助理元素中查看节点事件输出参数

**函数示例**

```python title="services/AuditSvc/service.py"
class AuditSvc(NormalService):

    def log_assistant(self, arg1, arg2, ..):
        print(arg1.vallue)
        print(arg2.vallue)
```

## 调试与注意事项

1.  **非阻塞原则**：助理事件作为旁路逻辑，不应设计为拦截器。请确保事件处理逻辑函数的稳定性，避免因事件逻辑的失败影响助理主流程的体验。
2.  **异常处理**：务必在事件处理函数中添加 `try-except` 捕获异常，防止未处理的错误中断 AI 助理的执行。
3.  **死循环风险**：如果在事件处理中再次触发了当前的 AI 助理（例如在 `afterRun` 中又调用该助理），会导致无限循环，请谨慎设计。
4.  **异步执行**：对于耗时的日志记录或通知操作，建议将 `asyncType` 设置为 `true`，以减少对主流程响应时间的影响。
