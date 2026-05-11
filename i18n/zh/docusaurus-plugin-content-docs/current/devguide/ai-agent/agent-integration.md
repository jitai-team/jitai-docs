---
sidebar_position: 24
slug: agent-integration
description: "将 Agent 集成到应用中，支持前端页面调用、后端服务调用和代码级 API。"
---

# 在前后端程序中调用 Agent

创建好 Agent 后，可以通过三种方式集成到业务流程中：在前端页面函数中调用、在后端服务函数中调用、或直接通过代码调用 `run` 函数。

## 在前端页面中调用

在页面函数、页面事件函数或组件事件函数中调用 Agent：

1. 插入一条`基础语句`
2. 选择目标 Agent 的 `run` 函数
3. 填写用户指令和参数

切换到源码模式后，调用浓缩为一行：

```python
result = aiagents.myOrderAgent.run("查询今天的新订单")
```

典型场景：按钮点击 → Agent 执行 → 刷新页面。

:::tip
Agent 的响应速度首先取决于任务本身——拆解合理的任务、精简工具调用链，比任何参数调优都更有效。在 Agent 的大模型配置中关闭流式输出可减少首字等待时间，关闭推理输出（agent-thought）也可节省推理耗时，但根本之道在于控制任务复杂度。
:::

## 在后端服务中调用

在服务函数中插入`基础语句`，选择调用 Agent 的 `run` 函数。通过 `variables` 参数传入输入变量，与 System Prompts 中的 `{变量名}` 对应：

```python
agent = app.getElement("aiagents.myOrderAgent")
result = agent.run(
    user_input="分析这个客户的订单数据",
    variables={
        "customerId": "CUS2024001",
        "dateRange": "2024-01-01 ~ 2024-06-30"
    }
)
```

`run` 函数返回字典：

- **纯文本输出**：`{"output": "文本内容"}`
- **JSON 结构化输出**：按定义的输出变量结构返回

如果需要在 Agent 执行过程中实时获取事件，传入 `stream_callback`：

```python
def on_event(event):
    if event["type"] == "TEXT_MESSAGE_CONTENT":
        print(event["data"]["content"])

result = agent.run("分析销售数据", stream_callback=on_event)
```

## 实时查看运行过程

Agent 支持流式输出（SSE），可实时获取运行状态：

- 文本内容
- 推理过程
- 任务列表更新
- 中断事件
- 运行完成

