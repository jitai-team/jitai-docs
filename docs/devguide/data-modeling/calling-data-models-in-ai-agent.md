---
sidebar_position: 11
slug: calling-data-models-in-ai-agent
---

# Calling Data Models with AI Agents

Data models can be invoked not only within pages and functions, but also as tools for AI Agents. By adding data model functions as Agent tools, AI can intelligently perform create, read, update, and delete (CRUD) operations, enabling more automated and intelligent data processing capabilities.

## Data models as Agent tools {#data-models-as-agent-tools}

Applications built on JitAi's interpretive system architecture possess self-describing characteristics, meaning that application elements can be accurately understood by large language models. Data models and their functions are precisely such self-describing elements that can serve directly as available tools for Agents.

When data model functions are added as Agent tools, AI gains the ability to:

- Intelligently invoke corresponding data operations based on natural language instructions from users
- Automatically execute complex data querying and processing logic
- Perform associated operations across multiple data models
- Validate and process data according to business rules

For detailed instructions on adding data model functions as Agent tools, please refer to [Agent calling model functions](../ai-agent/agent-tools#calling-model-functions).
