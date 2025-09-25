---
sidebar_position: 9
slug: ai-native-enterprise-app-dev-paradigm
---
# AI-Native Enterprise Application Development Paradigm

In the assembly language era, developers had to deeply understand hardware details, directly manipulating registers and memory addresses, with the development paradigm being "humans adapting to machine thinking." In the high-level language era, from FORTRAN to C, the development paradigm shifted to "making machines understand human logic," allowing developers to express algorithms in ways closer to human thinking. In the object-oriented era, languages like Java and C++ introduced object-oriented paradigms, transforming development from "process-oriented" to "object-oriented," and software architecture evolved from collections of functions to object collaboration. In the Web application era, the shift from desktop software to Web applications changed the development paradigm from "standalone programs" to "distributed systems," giving birth to architectural patterns like MVC and microservices.

Each paradigm shift has brought exponential improvements in efficiency, while simultaneously requiring developers to learn and adapt to new ways of thinking. Today, we are in the midst of another major transformation in development paradigms—**AI application development paradigm**.

## AI Application Development Paradigm

Whether using LangGraph, CrewAI, or any other development framework to build AI applications, none can escape one fundamental essence: **AI + human collaboration to achieve goals**.

### From Human-Computer Interaction to Human-AI Collaboration
![From Human-Computer Interaction to Human-AI Collaboration](./img/human-computer-to-human-ai-collaboration.svg)

Compared to traditional applications, AI applications introduce AI assistants, evolving the system interaction model from human-computer interaction to human-AI collaboration.

### From Hard-coded Driven to AI Decision-driven
![From Hard-coded Driven to AI Decision-driven](./img/hard-coding-to-ai-decision-driven.svg)

In the human-computer interaction model, humans trigger predefined program logic through operations like clicking buttons and selecting menus, with the system passively responding to process user requests.

In the human-AI collaboration model, humans can also converse with AI assistants, which identify intent and execute corresponding business logic. However, this doesn't mean traditional human-computer interaction should be completely abandoned—in simple scenarios that don't require intelligent decision-making, human operations are often faster and more direct, which is precisely what human-AI collaboration embodies.

When developers build systems, they are no longer just developing an operational interface with predefined fixed logic, but creating an AI assistant-enhanced application that covers the full stack of frontend and backend, understanding requirements, making intelligent decisions, and proactively executing across all aspects of business operations.

### AI-Driven Full-Stack Tool Invocation Flow
![AI-Driven Full-Stack Tool Invocation Flow](./img/ai-centered-system-interaction-flow.svg)

By treating AI as the intelligent hub of the entire system, it can intelligently select and dynamically combine frontend and backend tools based on user intent, achieving unified full-stack invocation. **The key point is that the tools invoked by AI are essentially the functional modules we invoke through UI interfaces in traditional applications**. Users can operate through UI interfaces or converse with AI, with the system automatically orchestrating tool chains to complete tasks and provide feedback, truly achieving the transformation from "humans adapting to systems" to "systems understanding humans."

## Enterprise AI Application Characteristics

Consumer-grade AI applications pursue universality and ease of use, while enterprise-grade AI applications require deep business integration and fine-grained control. We need to build an application development technology system that is fundamentally different from consumer-grade AI applications across multiple dimensions including architectural design, functional customization, permission control, deployment modes, and data security.

![Consumer vs Enterprise AI Applications](./img/consumer-vs-enterprise.svg)

To enable AI applications to efficiently handle enterprise-level data and tasks, AI applications must deeply integrate with traditional software system modules. This integration manifests at the "tool" level, where tools are software modules that should possess the following characteristics:

### Module Self-Description Capability
Software modules must be able to clearly describe their functionality, parameters, and usage to AI applications:

- **Functional Description**: Modules can clearly express their core functionality and business value
- **Data Processing Capability**: Clearly describe what types of data and data structures the module can process
- **Task Execution Scope**: Clearly specify what specific tasks and business scenarios the module can accomplish
- **Parameter Specifications**: Automatically generate detailed descriptions and constraints for input and output parameters
- **Invocation Examples**: Provide standardized invocation interfaces and practical use cases

### Module Hot-swappable and Replaceable
AI applications use tools in a highly dynamic manner, especially when processing different types of data and tasks, requiring support for flexible runtime adjustments:

- **Dynamic Requirements**: Tool requirements continuously change during AI application capability iteration
- **Data Adaptation**: Dynamically select appropriate processing tools based on different data types and formats
- **Task Matching**: Dynamically load matching execution modules based on task complexity and type
- **Real-time Loading**: Support runtime dynamic loading of new tool modules
- **Seamless Replacement**: Support replacing and upgrading tools without downtime
- **Combination Orchestration**: Support dynamic combination and orchestration of multiple tool modules

### Full-Stack Module Toolification
Breaking through the limitations of traditional backend service invocation to achieve unified frontend and backend tool invocation capability, enabling AI applications to comprehensively handle data and tasks:

- **Backend Data Processing**: Traditional backend functions such as data services, business logic, and API interfaces
- **Frontend Task Interaction**: Frontend functions such as UI components, page elements, and user interactions
- **Full-Stack Unified Interface**: AI's unified invocation capability for full-stack frontend and backend elements
- **Data Task Collaboration**: Frontend and backend tools collaboratively handle complex data and task scenarios
- **Standard Protocol Support**: Support for standardized tool protocols such as MCP (Model Context Protocol)

**[JAAP (Jit AI Application Protocol)](../reference/runtime-platform/JAAP)** defines AI-native enterprise application architecture from two dimensions of structural definition and process-driven, meeting the AI application development paradigm.

## AI Product Components
JitAi has built four core AI product components that together constitute the technical foundation for enterprise-level AI application development.

### AI Large Language Models
Enterprise-grade large model service gateway that interfaces with various large model service providers, offering a unified model invocation interface.

**Core Capabilities**:
- Shield API differences between different large model vendors
- Provide unified invocation standards and error handling mechanisms
- Support business layer on-demand model and parameter selection
- Load balancing and failover

> 📖 Learn more: [AI Large Language Models](../devguide/ai-llm)

### AI Knowledge Base
Enterprise knowledge management system based on RAG technology, supporting intelligent retrieval and knowledge enhancement from multiple data sources.

**Core Capabilities**:
- **RAG Technology Support**: Retrieval Augmented Generation to improve AI response accuracy and professionalism
- **Multi-format Compatibility**: Support for various knowledge sources including documents, databases, APIs, etc.
- **Real-time Updates**: Dynamic synchronization of knowledge base content to ensure information timeliness
- **Semantic Retrieval**: Intelligent semantic matching and retrieval based on vector databases

**Application Scenarios**:
- Intelligent Q&A for enterprise internal documents and policies
- Automatic retrieval of product manuals and technical documentation
- Intelligent matching of customer service knowledge bases
- Intelligent recommendation of industry knowledge and best practices

> 📖 Learn more: [AI Knowledge Base](../devguide/knowledge-base)

### AI Agent
The core execution engine of AI applications, responsible for tool orchestration, full-chain state tracking, and task execution.

**Core Capabilities**:
- **Tool Orchestration**: Dynamic combination and invocation of various business tools and services
- **Full-chain State Tracking**: Maintaining dialogue context, task execution status, and data flow status
- **Task Execution**: Decomposition and execution of complex business logic
- **Permission Control**: Tool access permission management based on user roles

> 📖 Learn more: [AI Agent](../devguide/ai-agent)

### AI Assistant
The unified interface for AI application-user interaction, serving as the interaction interface between AI applications and users.

**Core Capabilities**:
- **Visual Orchestration**: Implementing routing decisions, AI Agent orchestration, and human-computer interaction design through visual interfaces
- **Multi-Agent Collaboration**: Orchestrating multiple Agents within assistants to achieve Multi-Agent cooperation
- **Intelligent Routing**: Automatically selecting appropriate Agents to handle tasks based on user intent
- **Function Invocation and Conditional Branching**: Supporting complex business logic control and multi-task execution
- **One-click Integration**: Integrating into various corners of business systems through different entry forms

> 📖 Learn more: [AI Assistant](../devguide/ai-assistant)
