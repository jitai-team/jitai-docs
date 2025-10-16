---
sidebar_position: 4.5
slug: create-ai-assistant
---

# Creating AI Assistant Elements

## What is AI assistant {#what-is-ai-assistant}
AI Assistant is a production-grade component of AI applications. It comprises multiple Agents, processing functions, and UI & human interaction nodes, which are orchestrated and constructed via a drag-and-drop flow designer.

### Features {#features}
AI Assistant supports multiple interaction methods. Users can interact with it through a chat interface to obtain answers and processing results, while also triggering interface operations. Other systems can also directly call the AI Assistant through APIs to obtain processing results and trigger corresponding operations.

In terms of application scenarios, AI Assistant is highly flexible. It can serve as an independent assistant, providing specialized services to users in the form of dialog boxes; it can also be embedded into specific work pages as a sidebar assistant, working closely with work pages to help users complete professional operations; furthermore, it can be embedded into any web page as the AI assistant for that page, providing AI empowerment to existing application systems.

### Technical implementation principles {#technical-implementation}

From a technical perspective, AI Assistant is a multi-agent collaboration framework and also a framework for AI and user interface collaboration. It can coordinate multiple agents to work together, call backend services to process data, control frontend interface display and interaction, and manage the entire processing flow.

The core design philosophy of AI Assistant includes three aspects:

[**Visual Orchestration Design**](./process-orchestration-node-configuration): Through intuitive drag-and-drop operations to build complex business processes, it lowers the development threshold, allowing business personnel to participate in AI application construction, achieving a "low-code" AI application development model.

[**State-Driven Data Flow**](./ai-assistant-state): The entire system is centered on runtime state data, with data being passed and accumulated between nodes, forming a complete execution context. The data flow follows a clear pattern of "Input → Process → Output → Store", ensuring continuity and traceability of information in the process, supporting complex multi-turn conversations and state persistence.

[**Event-Driven Extensibility**](./ai-assistant-event.md): Through a comprehensive event system, AI Assistant can flexibly integrate with frontend pages and backend business logic, supporting complex business scenarios and customization requirements. The event system enables AI Assistant to seamlessly integrate with existing systems, achieving true enterprise-grade AI applications.

In simple terms, AI Assistant is an intelligent system that can perfectly combine backend AI processing with frontend user operations.

### Differences from other tools {#compare-with-others}

AI Assistant is fundamentally different from workflow tools on platforms like Coze, Dify, n8n, etc. These traditional tools can only create simple processing functions with relatively limited functionality, achieving effects equivalent to JitAi's "service functions". AI Assistant, on the other hand, is a complete intelligent application system with more powerful and flexible functionality. For details, see: [Comparing JitAi with Mainstream AI Application Platforms](../../tutorial/jitai-comparison)

### Main advantages {#advantages}

AI Assistant has advantages such as simplicity, flexible configuration, and powerful functionality. Through simple drag-and-drop operations, anyone can quickly build professional AI applications without programming knowledge. At the same time, AI Assistant can integrate frontend interfaces, backend services, and AI agents to create complete intelligent solutions.

## Creating AI assistant {#creating-ai-assistant}

The creation method is as follows:

![Creating AI Assistant - Entry](./img/assistant/create-assistant.png)
Click <span style={{ background:"#3d65fd", display: "inline-block", borderRadius: "8px", textAlign: "center", lineHeight: "100%", color: "#ffffff", fontSize: "24px", padding: "0px 10px 5px" }}>+</span>  → **AI Assistants** → **Generic AI Assistant**, open the assistant information form, fill out the form and click the `Confirm` button to create the assistant.

![Creating AI Assistant - Form](./img/assistant/create-form.png)

In the popup window, enter the **Name**, then click **Confirm** to complete creation. After creation is complete, the [Visual Orchestration](./process-orchestration-node-configuration) page will automatically open.

:::tip Naming Suggestions
- Use meaningful names, such as "Customer Service Assistant", "Order Processing Assistant"
- Avoid overly simple names, such as "Assistant 1", "Test Assistant"
- Names should reflect the assistant's main functionality or application scenario
:::

