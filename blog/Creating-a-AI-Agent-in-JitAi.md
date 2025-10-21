---
title: Creating a AI Agent in JitAi: A Comprehensive Guide
authors: []
tags: [AI agent，jitai]
date: 2025/9/1
description: "An AI Agent (intelligent agent) possesses autonomous decision-making and task execution capabilities. It can automatically select appropriate tools based on user input and contextual information to complete complex business processes."
---

An AI Agent (intelligent agent) possesses autonomous decision-making and task execution capabilities. It can automatically select appropriate tools based on user input and contextual information to complete complex business processes. An Agent consists of three core components: a system prompt, tools, and LLMS. Agents can also integrate with knowledge bases to implement Retrieval-Augmented Generation (RAG). This article will guide you through quickly creating a ReActAgent in Jitai, which combines reasoning and acting, and discuss the remarkably simple workflow and impressive results of AI Agents in Jitai.

### Creating a ReActAgent​

Developers can select "AI Agent" in the element directory tree and choose "ReActAgent". A form popup will appear where you can enter a name. Clicking the "OK" button creates a ReActAgent and automatically enters the visual editor.

### Writing the System Prompt​

The system prompt is a crucial guide for the AI Agent's behavior and decision-making. In Jitai, the Agent's prompt generally covers several dimensions: role definition, available tools, decision-making process, output specifications, and clarification mechanisms. You can modify the default template or write your own following your preferred format to ensure the Agent operates as intended.

### Selecting a LLM​

Jitai allows for internal configuration of LLMS (you need to purchase the corresponding API key from the model vendor in advance; we also provide a limited free token allowance for you to use). You can select a pre-configured LLM in the AI Agent settings. Once configured, the AI Agent can understand user input, perform reasoning by combining the prompt and context, and generate responses.

### Tools for the Agent​

Tools extend the Agent's executable capabilities, enabling it not only to understand and process natural language but also to proactively call external services, databases, APIs, etc., to perform complex operations like information querying, data processing, and task execution. Below are two examples of tool functionalities.

*   **AI Agent Call Model Functions**: Data models come with commonly used CRUD (Create, Read, Update, Delete) functions. Developers can also customize model functions according to actual business needs to implement data operations.
    
*   **AI** **Agent Call MCP Services**: MCP (Model Context Protocol) is an open standard protocol launched by Anthropic in November 2024, designed to standardize interactions between LLMs and external data sources, tools, and services. You can switch to the "Tools" tab in the AI Agent visual editor, click the "Add Tool" button, select "MCP Service" from the list, and then fill in the service name and configuration in the popup window. Click "OK," and the platform will load the MCP Server. Once loaded successfully, the MCP service can be used (for security, it is recommended to manage sensitive configurations in MCP as application environment variables).
    

JitAi's AI Agent development platform provides comprehensive tools for creating sophisticated intelligent agents that seamlessly integrate with enterprise systems. By following this structured approach to ReActAgent development, organizations can leverage autonomous decision-making capabilities while maintaining full control over input/output parameters and business logic integration.

For organizations looking to implement AI Agent solutions, Jitai offers a robust framework that balances ease of use with advanced customization capabilities, making it an ideal platform for enterprise-grade AI application development.