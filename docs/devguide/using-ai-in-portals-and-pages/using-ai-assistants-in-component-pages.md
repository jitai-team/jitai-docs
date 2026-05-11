---
sidebar_position: 2
slug: using-ai-assistants-in-component-pages
description: "Use AI Agent events in component pages. Subscribe to tool call events and send AI messages."
---

# Using AI Agent in Component Pages

When AI Agent is enabled in a component page, the page can subscribe to AI Agent runtime events for deep page-AI interaction.

## Subscribe to Tool Call Events {#ai-agent-event-subscription}

AI Agent fires events when invoking tools. Pages can subscribe to these events for custom logic.

### Pre-call Event

Fires before a tool executes. Use it to validate parameters or log:

```javascript
this.subscribeEvent("AI:aiagents.myAgent.callTool.preEvent", async ({ data }) => {
    // data.toolName: tool name
    // data.toolType: tool type
    // data.args: tool input parameters
    console.log("About to call tool:", data.toolName, data.args);
});
```

### Post-call Event

Fires after a tool completes. Use it to read results:

```javascript
this.subscribeEvent("AI:aiagents.myAgent.callTool.postEvent", async ({ data }) => {
    // data.toolName: tool name
    // data.toolType: tool type
    // data.args: tool execution result
    if (data.toolName === "services.MyService.query") {
        await this.Table1.refresh();
    }
});
```

## Send AI Messages from Pages {#send-ai-message}

Pages can send messages to AI Agent via the `SEND_AI_MESSAGE` event without requiring manual user input:

```javascript
this.publishEvent("SEND_AI_MESSAGE", {
    data: {
        content: "Query yesterday's orders",
        files: []
    }
});
```

## Call AI Agent Directly {#call-ai-agent}

Pages can call AI Agent's `run` method directly without enabling the AI dialog:

```javascript
this.app.aiagents.myAgent.run("Query today's orders");
```

The `run` method returns the Agent's execution result for further page logic processing.