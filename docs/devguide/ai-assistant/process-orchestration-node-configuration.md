---
sidebar_position: 5
slug: process-orchestration-node-configuration
---

# Process Orchestration and Node Configuration

## Visual orchestration {#visual-orchestration}
The AI assistant's visual orchestration tool allows you to design complex business processes through intuitive drag-and-drop operations, building intelligent workflows without writing code.

![Adding Nodes](./img/assistant/assistant-add-node-edge.gif)

#### Adding nodes {#adding-nodes}
1. Select the required node type from the top toolbar
2. Drag to the appropriate position on the canvas
3. Release the mouse to complete node addition

#### Connecting nodes {#connecting-nodes}
1. Hover the mouse over the output port of the source node
2. Hold the left mouse button and drag to the input port of the target node
3. Release the mouse to establish the connection

:::tip Orchestration Tips
- **Reasonable Layout**: Place related nodes in close proximity to maintain clear process flow
- **Naming Conventions**: Set meaningful names for nodes to facilitate subsequent maintenance
:::

## Node types explained {#node-types-explained}

### Start {#start-node}
This is the starting point of the workflow, like the entry point of a project. It receives user input and other [input parameters](./ai-assistant-input-output#input-parameters), stores this information in [state data](./ai-assistant-state), and then begins task execution.
Each AI assistant can only have one start node, which is automatically generated after creating the assistant, so you don't need to add it manually.

### Router {#routing-decision}
This node is intelligent and can decide which AI assistant to call next for processing based on the user's message content.
:::tip Note
The next step after a routing decision node can only be an AIAgent node, not other types.
:::
During routing decisions, it calls a large language model to analyze user input and then intelligently selects the most appropriate processing path.

#### Binding large language model {#binding-large-language-model}
Routing decisions require a large language model to help with analysis, so we need to configure one for it. The configuration method is as follows:

![Node Configuration - Routing Decision](./img/assistant/router-setting.png)

Click on the routing decision node in the process, and a configuration window will open on the right side; select a [large language model](../ai-llm/create-ai-llm) and configure the parameters to complete the setup.

#### Input parameter configuration {#input-message-configuration}
The routing decision node has an input parameter named `User Input` that determines the next step during runtime based on this parameter; we need to assign a value to this parameter. The configuration method is as follows:

![Input Parameter Configuration - Routing Decision](./img/assistant/router-input.png)

The input configuration window will automatically pop up when connecting from other nodes to the routing decision node, and can also be opened later by clicking the ` → ` button on the connection. You can pass variables from the [assistant's state](./ai-assistant-state) to it.

### AIAgent {#ai-agent}
The AIAgent node calls a specific AIAgent to handle particular tasks.
We need to bind an [AIAgent](../ai-agent/create-ai-agent) to this node. The configuration method is as follows:

![Node Configuration - AIAgent - Binding Agent](./img/assistant/aiagent-bindagent.png)

#### Input parameter configuration {#input-parameter-configuration}
When the node runs, it will call the Agent and pass in [parameters required by the Agent](../ai-agent/agent-input-output#configuring-input-variables).
We need to assign values to these parameters. The configuration method is as follows:

![Node Configuration - AIAgent - Input Parameters](./img/assistant/aiagent-input.png)

Click the ` → ` button on the connection to open the input parameter configuration window. The left side shows the [AI Agent’s input Parameters](../ai-agent/agent-input-output#configure-input-variables) , and the right side allows you to select data from [runtime state data](./ai-assistant-state.md#state-data-content) to assign values to the Agent's variables.
After this node completes execution, it will store the [Agent's output results](../ai-agent/agent-input-output#configure-output-results) in the runtime state for use by other nodes.

### Action in conversation {#action-in-conversation}

When the task flow runs to this node, it will pause and display data in the dialog box. The flow can only continue after the user confirms the data and performs corresponding operations. If there is no next node, the flow automatically ends.
At this node, users can perform operations such as **Approve**, **Refuse**, **Reply**, and **Edit data** (editing functionality needs to be enabled).
During runtime, after performing **Approve**, **Refuse**, **Reply**, and **Edit data** operations, the flow will resume and trigger [dialog area human-machine interaction events](./ai-assistant-event#in-conversation-action-events).

#### Node configuration details {#conversation-node-configuration-details}
- **Data to Display**: You can freely define the data content that needs user confirmation, sourced from [runtime state data](./ai-assistant-state#state-data-content).
- **Editable**: When enabled, users can edit the displayed data, and the edited data will automatically update to the runtime state.
- **Use Custom Control Rendering**: By default, it uses the platform's built-in data rendering controls to display data, but you can also use [custom controls](../frontend-ui-customization/custom-controls) for rendering.
- **Display Operation Buttons**: You can customize operation buttons at this node, which can trigger [dialog area human-machine interaction events](./ai-assistant-event#in-conversation-action-events) when clicked.

![Node Configuration - Dialog Area Human-Machine Interaction - Settings](./img/assistant/human-Interrupt-setting.png)

Runtime effect is as follows:

![Node Configuration - Dialog Area Human-Machine Interaction - Effect](./img/assistant/human-Interrupt-view.png)

### Action in page {#action-in-page}
Complementing the assistant dialog area is a **workspace**: the functional page where users work.

The workspace refers to the frontend page where users work.
When the task flow runs to this node, the backend of the flow will pause and send pause events and related information to the frontend. In the workspace, you can [subscribe to post-pause events](../ai-assistant/ai-assistant-event#in-page-action-events). In the corresponding event handler function, use event parameters to update the page UI state, then wait for users to perform related operations to resume the flow.

Node configuration details:
- **Parameters Carried by Events**: Parameters carried by the assistant when sending pause events to the frontend workspace, selected from [assistant's state](./ai-assistant-state#state-data-content), which the frontend can use to update UI state.
- **Operation Prompt**: A prompt to guide users, telling them where on the page to perform what operations to resume the flow; the prompt will be displayed in the assistant dialog box.

![AI Assistant - Workspace](./img/assistant/human-workspace-interrupt-setting.png)

Runtime effect is as follows:

![Node Configuration - Dialog Area Human-Machine Interaction - Effect](./img/assistant/human-workspace.png)

**Resume flow**: Subscribe to this node's pause event in the workspace, perform related processing logic, then call the [Send AI Message](../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#send-ai-message) function to resume the flow. The sent message content will be stored as the node's output parameter in the runtime state data for use by other nodes.

### Function {#function}
This node is used to call model/service functions to process, clean, or calculate data in the runtime state.
This node needs to bind a service/model function. When the task flow runs to this node, it will call the bound function and store the function's return value in the runtime state data for use by other nodes.

**Binding function**:

![AI Assistant - Function Call Node - Binding](./img/assistant/function-bind.png)

**Input parameter configuration**: The input parameters of the function call node are the parameters of its bound function. The parameter configuration method is the same as the [AIAgent node](#ai-agent) input parameter configuration method.

### IF-ELSE {#if-else}
Determines the next step of the flow based on the data situation in the current assistant state.

**Conditional branch configuration details**:
- **Conditional expression**: Use simple logical expressions to evaluate data
- **Supported operators**: Equal, not equal, greater than, less than, contains, is empty, etc.
- **Multi-condition combination**: Can use "and" and "or" to combine multiple conditions
- **Conditional branches**: Can set multiple branches to take different paths when different conditions are met

![AI Assistant - Conditional Branch Node](./img/assistant/condition-setting.png)

### Iteration {#iteration}
This node is used to cyclically execute specific tasks, requiring setting a loop variable selected from `RowList` or `JitList` type data in the assistant runtime state.

**Iteration configuration details**:
- **Loop variable selection**: Select the data to be processed in a loop, must be `RowList` or `JitList` type
- **Loop execution branch**: Set the task flow to execute during each loop iteration
- **Loop end branch**: Set the flow direction after all loops are completed

![AI Assistant - Multi-task Execution Node - Configuration](./img/assistant/loop-setting.png)

This node has two branches: **Loop Execution**: Iterate through the loop variable and execute a task sequentially; **Loop End**: The flow direction after loop completion.

**Loop variable description**:
When this node runs, it will store two pieces of data in the runtime state:
- **`Loop Index`**: The sequence number of the current loop (starting from 0)
- **`Loop Item`**: The data item currently being processed in the loop
- **Use Case**: In the loop execution branch, you can access current loop information through these two variables

![AI Assistant - Multi-task Execution Node - Variables](./img/assistant/loop-variables.png)


## Full code development {#full-code-development}
Click the <span style={{ display: "inline-flex", verticalAlign: "middle", margin: "0 !important", height: '30px', width: '40px', alignItems: "center" }}>![Full Code Button](./img/assistant/code.png)</span> button in the top right corner of the assistant editor to switch to source code editing mode.
In source code mode, the left side displays source code files, and clicking on a source code file shows its content on the right side.
- **e.json**: The assistant element declaration file

![AI Assistant - Element Declaration](./img/assistant/assistant-define.png)

- **config.json**: The assistant element flow configuration, recording flow nodes and connection directions.

![AI Assistant - Element Configuration](./img/assistant/assistant-config.png)

