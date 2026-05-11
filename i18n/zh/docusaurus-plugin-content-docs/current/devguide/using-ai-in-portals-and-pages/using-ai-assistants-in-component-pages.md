---
sidebar_position: 2
slug: using-ai-assistants-in-component-pages
description: "在组件化页面中使用 AI Agent 事件，订阅工具调用事件、发送 AI 消息。"
---

# 在组件化页面中使用 AI Agent

在组件化页面中启用 AI Agent 后，页面可以订阅 AI Agent 运行时事件，实现页面与 AI 的深度交互。

## 订阅工具调用事件 {#ai-agent-event-subscription}

AI Agent 执行过程中调用工具时会触发事件，页面可订阅这些事件实现自定义逻辑。

### 工具调用前事件

工具即将执行时触发，可在执行前校验参数或记录日志：

```javascript
this.subscribeEvent("AI:aiagents.myAgent.callTool.preEvent", async ({ data }) => {
    // data.toolName: 工具名称
    // data.toolType: 工具类型
    // data.args: 工具调用参数
    console.log("即将调用工具:", data.toolName, data.args);
});
```

### 工具调用后事件

工具执行完成后触发，可读取工具执行结果：

```javascript
this.subscribeEvent("AI:aiagents.myAgent.callTool.postEvent", async ({ data }) => {
    // data.toolName: 工具名称
    // data.toolType: 工具类型
    // data.args: 工具执行结果
    if (data.toolName === "services.MyService.query") {
        // 根据工具结果更新页面
        await this.Table1.refresh();
    }
});
```

## 在页面中发送 AI 消息 {#send-ai-message}

页面可以通过 `SEND_AI_MESSAGE` 事件向 AI Agent 发送消息，无需用户手动输入：

```javascript
this.publishEvent("SEND_AI_MESSAGE", {
    data: {
        content: "查询昨天的订单数据",
        files: [] // 可附带文件
    }
});
```

## 直接调用 AI Agent {#call-ai-agent}

页面支持在不启用 AI 对话框的情况下，直接调用 AI Agent 的 `run` 方法：

```javascript
this.app.aiagents.myAgent.run("查询今天的订单");
```

`run` 方法返回 Agent 的执行结果，可用于页面逻辑的后续处理。