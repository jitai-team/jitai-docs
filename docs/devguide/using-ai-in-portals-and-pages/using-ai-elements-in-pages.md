---
sidebar_position: 3
slug: using-ai-elements-in-pages
---

# Using AI Elements in Pages

## Using in pages {#using-in-pages}

[AI Assistant](../ai-assistant) provide a **run** function that can be called directly in pages. There are two ways to call it: **visual calling** and **full code calling**.

### Visual calling {#visual-calling}

In statements, select `AI Assistant` → the assistant you want to call → `Run`, and pass in the [assistant's input args](../ai-assistant/ai-assistant-input-output#input-args).

![AI Assistant - Call](./img/call-assistant-in-page.png)

### Full code calling {#full-code-calling}
You can also call it through full code. The calling syntax in pages is as follows:

```javascript
// this.app.{AI Assistant Element ID}.run(param1, param2)
this.app.AIDemo.aiassistants.ClientManagementAssistant.run("Add on custmer", {"paramA": "Tony"});
```

![AI Assistant - Full Code Call](./img/call-assistant-in-page-code.png)

## Using AI agent in pages {#using-ai-agent-in-pages}
[AI Agent](../ai-agent) provide a **run** function that can be called directly in pages. There are two ways to call it: **visual calling** and **full code calling**.

### Visual calling {#visual-calling-agent}

In statements, select `Agent` → the Agent you want to call → `Run`, and pass in the [AI Agent's input args](../ai-agent/agent-input-output#configuring-input-variables).

![AI Agent - Call with Parameters](./img/call-agent-in-page-input.png)

### Full code calling {#full-code-calling-agent}
You can also call it through full code. The calling syntax in pages is as follows:

```javascript
// this.app.{AI Agent Element ID}.run(param1, param2)
this.app.AIDemo.aiagents.ClientManagementagent.run("Add one  customer", "Tony");
```

![AI Agent - Full Code Call](./img/call-agent-in-page-code.png)

## Using large language models in pages {#using-large-language-models-in-pages}
[Large Language Model](../ai-llm) provide a **run** function that can be called directly in pages. There are two ways to call it: **visual calling** and **full code calling**.

### Visual calling {#visual-calling-llm}

In statements, select `Large Language Model` → the large language model you want to call → `Run`.

![Large Language Model - Call](./img/call-llm-in-page.png)

Then set the [input args](../ai-llm/llm-input-output#call-llm-in-pages): the model to call, prompt, and output format.

![Large Language Model - Call with Parameters](./img/call-llm-in-page-input.gif)

### Full code calling {#full-code-calling-llm}
You can also call it through full code. The calling syntax in pages is as follows:

```javascript
// this.app.{Large Language Model Element ID}.runLlm(param)
this.app.AIDemo.llms.alibur.runLlm({
    "dataType": "Ltext",
    "promptList": [{  // Prompt
        "role": "system",
        "prompt": `Query detailed information for ${this.Table1.activeRow.custName.value}`,
        "id": "config-9o9ztc2"
    }],
    "llmConfig": { // Large Language Model Configuration
        "model": "qwen-max-latest"
    },
    "outputArgs": [{
        "title": "Customer Details",
        "name": "customerDetails",
        "dataType": "RowData",
        "generic": "AIDemo.models.CustomerModel"
    }]
});
```

![Large Language Model - Full Code Call](./img/call-llm-in-page-code.png)
