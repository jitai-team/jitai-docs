---
title: 'Structure as Context: The "Type-Instance" Pattern for Scalable AI Agents'
seoTitle: "Type vs. Instance: The Architecture for Scalable AI Agent Development"
date: 2026/02/11
authors: []
tags: []
description: 'Discover how separating "Type" (logic) from "Instance" (configuration) enables AI agents to generate reliable, hallucination-free enterprise applications.'
slug: type-instance-pattern-ai-architecture
keywords:
    [AI native, JitAI, AI, AI agent, low code, software architecture, JAAP]
---

One of the most persistent challenges in building AI-native applications is the "Blank Slate" problem. When you ask an LLM to build a feature from scratch, it often generates code that is syntactically correct but structurally chaotic. It reinvents wheels, hallucinates APIs, and creates maintenance nightmares because it lacks a unified structural context.

For senior developers and architects, the solution isn't "better prompts"—it's better architecture. By treating application structure as a first-class citizen, we can restrict the AI's creative energy to where it adds value (business logic and configuration) while anchoring it to rigid, pre-validated structural definitions.

This article explores the **Type vs. Instance** mechanism—an architectural pattern that enables AI to "learn once, instantiate anywhere," transforming fragile code generation into robust structural configuration.

<!--truncate-->

## The Core Problem: Why AI Struggles with "Flat" Code

In traditional development, code is often a flat collection of files. When an AI agent attempts to modify this, it must scan thousands of lines to understand context, consuming massive token windows and increasing the probability of error.

Consider a standard "Approval Workflow." If you ask an AI to build one, it might generate a Python script with hardcoded logic. If you ask for a second one, it might generate a completely different script with slightly different logic. You end up with two divergent implementations of the same concept.

**The missing link is semantic structure.** The AI needs to understand that "Approval Workflow" is a *Type* of thing, and the specific request is just an *Instance* of that Type.

## The Architecture: Meta, Type, and Instance

To solve this, we can adopt a hierarchical element system similar to Object-Oriented Programming (OOP) or Kubernetes Custom Resource Definitions (CRDs), but optimized for AI interaction. This hierarchy consists of three layers:

![003.png](003.png)

### 1. Meta (The DNA)

**Meta** is the abstract definition of a capability. It defines *what* an element is, but not *how* it works. It is the root interface.

- **Example:** `aiagents.Meta` defines that all Agents must have inputs, outputs, and a run method.
- **Role:** Provides the foundational contract that the system (and the AI) relies on.

### 2. Type (The Template)

**Type** is a reusable implementation of a Meta. It encapsulates specific logic, code, and behaviors that are common across a category of objects.

- **Example:** `aiagents.ReActType` is a concrete implementation of `aiagents.Meta`. It contains the actual Python code for the ReAct (Reasoning + Acting) loop.
- **Role:** This is what the AI "reads" to understand capability. The AI sees `ReActType` and knows: "I can use tools, I can reason, and I need a system prompt."

### 3. Instance (The Implementation)

**Instance** is a specific configuration of a Type. It contains no structural code, only configuration data (typically JSON) that dictates how the Type should behave for a specific business case.

- **Example:** `CustomerServiceAgent` is an instance of `aiagents.ReActType`. Its configuration defines the specific LLM model to use, the Knowledge Base to query, and the specific System Prompt.
- **Role:** This is what the AI "generates." Instead of writing a new Python class, the AI simply outputs a JSON configuration file that instantiates the Type.

## How JitAI Addresses This: The JAAP Protocol

JitAI leverages this pattern through the **JAAP (JitAi Ai Application Protocol)**. In JitAI, the application structure is not hidden in code comments; it is explicit and accessible to the AI.

When you ask JitAI to "Create an AI agent that answers FAQs using our docs," the platform's AI doesn't write a new Python script. Instead, it follows this cognitive path:

1.  **Intent Recognition:** It identifies that you need an `AIAgent`.
2.  **Type Selection:** It selects the `aiagents.ReActType` because it best fits the requirement for tool use (Knowledge Base retrieval).
3.  **Instance Generation:** It generates a configuration file (e.g., `e.json`) that instantiates `ReActType` and binds it to your specific Knowledge Base element.

### The "Understanding" Mechanism

Because the **Type** is pre-defined and validated by human engineers, the AI doesn't need to "guess" how to implement the ReAct loop or how to manage memory. It only needs to fill in the blanks:

- *Which model?* (e.g., `llms.OpenAI`)
- *Which tools?* (e.g., `framework__JitAi__ai-knowledge-base.md`)
- *What prompt?* (e.g., "You are a helpful assistant...")

This separation of concerns means the AI operates on **Structure**, not just **Interface**. It modifies the application's DNA rather than just pasting code on top of it.

## Implementation Playbook: Leveraging Type/Instance

For developers building on JitAI, this mechanism changes the development workflow from "writing code" to "orchestrating elements."

### Step 1: Define or Select a Type

Most of the time, you will use built-in Types. For example, if you need a database table, you don't write SQL `CREATE TABLE` statements. You select `models.NormalType`.

- **Tip:** If you have highly specialized logic (e.g., a proprietary IoT protocol), you can create your own *Type* element by extending a *Meta* element.

### Step 2: Instantiate via AI

Instead of coding the instance manually, use the Agent to generate it.

- **Prompt:** "Create a 'SalesOrder' model with fields for date, total amount, and customer ID."
- **Result:** The Agent generates the `e.json` configuration for a `models.NormalType` instance named `SalesOrder`. It automatically handles data types (e.g., transforming "total amount" to a `Currency` field) because it understands the schema of the Type.

### Step 3: Reuse and Extend

Once an Instance is created, it becomes a distinct addressable element in the system. Other elements (like Pages or Agents) can reference it by its `fullName` (e.g., `models.SalesOrder`).

- **Benefit:** If you update the underlying `models.NormalType` (e.g., to add a new caching layer), *all* instances (`SalesOrder`, `Customer`, etc.) inherit that improvement instantly.

## Comparison: Traditional vs. Type/Instance Development

The following table contrasts the traditional code-generation approach with the Type/Instance pattern used in AI-native platforms.

| **Feature**            | **Traditional AI Code Gen**                                    | **JitAI Type/Instance Pattern**           |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------- |
| **Code Structure**     | Flat files, repetitive logic                                   | Hierarchical, inherited logic             |
| **AI Context Load**    | High (must read full codebase)                                 | Low (reads only Type definition)          |
| **Maintenance**        | Difficult (fixing a bug requires updating all generated files) | Easy (fix the Type, all Instances update) |
| **Consistency**        | Low (AI may implement same logic differently twice)            | High (Logic is locked in Type)            |
| **Hallucination Risk** | High (AI invents libraries/syntax)                             | Low (AI constrained to Config schema)     |

## Implementation Example: The "Answer Sheet" Logic

Let's look at a concrete example from a "Test Paper Management" system. We need to grade student answers.

**Traditional Way:**

The developer (or AI) writes a script that queries the database, loops through answers, compares strings, calculates scores, and updates the DB. This script is unique to this specific interaction.

**The JitAI Way:**

1.  **Type:** We use `aiagents.ReActType` which knows how to reason and call tools.
2.  **Tools:** We expose the data model `AnswerSheet` as a tool to the Agent.
3.  **Instance:** We configure the Agent with a prompt: "Read the `AnswerSheet` detail, compare with `StandardAnswer`, and update the score."

The AI doesn't write the "update database" code. It calls the `update` method provided by the `AnswerSheet` model (which is an Instance of `models.NormalType`). The AI is simply orchestrating pre-existing, robust structural elements.

## How to Verify / Reproduce

To see this mechanism in action within JitAI:

1.  **Access the Developer Portal:** Open the JitAI IDE.
2.  **Inspect an Element:** Right-click on any Data Model or AI Agent and select "Open Source Code."
3.  **View** `**e.json**`**:** Notice the `type` field (e.g., `"type": "aiagents.ReActType"`). This single line connects your specific instance to the massive underlying logic of the framework.
4.  **Create a Variation:** Use the "+" button to create a new Agent. Note how you only supply configuration (Name, Model, Prompt), yet the new Agent immediately possesses complex execution capabilities.

## FAQ

**Q: Can I create my own Types?**

A: Yes. You can define custom Types by extending existing Meta elements. This allows you to encapsulate proprietary business logic that can then be instantiated multiple times by the AI.

**Q: Does this limit flexibility?**

A: No. While the *structure* is defined by the Type, the *behavior* is highly flexible through configuration and the natural language prompts that guide the Instance. You get the stability of structure with the flexibility of AI.

**Q: Is this just Object-Oriented Programming?**

A: It applies OOP principles to AI generation. The key difference is that the "Class" (Type) is designed specifically to be semantic and understandable by an LLM, enabling the LLM to act as the "instantiator."

## Conclusion

The transition to AI-native development requires us to stop treating AI as a "super-typist" that writes boilerplate code. Instead, we should treat AI as an architect that configures proven structures. The Type vs. Instance mechanism provides the guardrails necessary for this shift, turning potential chaos into a scalable, maintainable enterprise system.

Ready to build structured AI applications?

[Download JitAI Desktop](https://jit.pro/download) or [Start the Tutorial](https://jit.pro/docs/tutorial).
