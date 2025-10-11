---
sidebar_position: 6
slug: ai-assistant-input-output
---

# AI Assistant Input and Output

## Input parameters {#input-parameters}
Each assistant has a fixed input parameter: user input (userInput). In addition, you can customize other input parameters. These parameters need to be assigned values when using the assistant.
The setup steps are as follows:

![AI助理-高级设置](./img/assistant/assistant-input.png)

Click the `Settings` button in the upper right corner of the process editor to open the settings window and add input parameters.

If the assistant has custom input parameters configured, these parameters need to be assigned values when [using AI assistants in portals or pages](../using-ai-in-portals-and-pages).

## Output content {#message-output}

### Runtime process log output {#runtime-process-log-output}
When [using AI assistants in portals or pages](../using-ai-in-portals-and-pages), you can specify the assistant to output runtime process log content with the following options:
- **Output Brief Process Logs**: Will not output assistant runtime process logs, and the large model in Agent nodes will only output simple runtime process logs. This mode has relatively simple output content and relatively faster execution.
- **Output Detailed Process Logs**: Outputs assistant runtime process logs, and the large model in Agent nodes will output detailed runtime processes and tool call logs. The logs output in this mode can be used for observation and debugging, but the execution process is relatively slower, so please choose carefully.
- **No Process Log Output**: Will not output runtime process logs.


### State data output {#state-data-output}
By configuring **Output Data to Conversation** on nodes, when the node runs, the specified [state data](./ai-assistant-state) will be sent to the conversation. Nodes that support this configuration include: [AIAgent nodes](./process-orchestration-node-configuration#ai-agent), [Function nodes](./process-orchestration-node-configuration#function), [IF-ELSE nodes](./process-orchestration-node-configuration#if-else), and [Iteration nodes](./process-orchestration-node-configuration#iteration).
The output data will use built-in widgets for rendering by default, and you can also **Use [custom widgets](../frontend-ui-customization/custom-controls) for rendering**.

The configuration method is as follows:

![AI助理-节点-发送数据](./img/assistant/send-data-to-chat.png)

### Action in conversation node output {#action-in-conversation-node-output}
The **Data to be displayed** configured in [action in assistant node](./process-orchestration-node-configuration#action-in-conversation) will be output to the assistant conversation.

### Action in page node output {#action-in-page-node-output}
The **Operation prompt** configured in [action in page node](./process-orchestration-node-configuration#action-in-page) will be output to the assistant conversation.



