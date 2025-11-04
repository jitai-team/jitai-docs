---
sidebar_position: 6
title: Implementing AI/UI Collaborative Grading with AI Agent
slug: ai_ui
description: "Build AI-assisted grading system with collaborative UI using AI Agent. Combine automatic AI scoring with manual review workflows."
---

# Implementing AI/UI Collaborative Grading with AI Agent

## Case effect

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/en/ai_ui_effect.mp4" />

## Implementation process

### Prerequisites

1. Create models as described in [Building Question Bank Management with Professional Mode](./ide_mode): Answer Sheet Table, Answer Sheet Detail Table.
2. Create pages as described in [Building Question Bank Management with Professional Mode](./ide_mode): Answer Sheet Page.
3. Create LLM vendor elements as described in [Implementing Answer Generation with AI LLM Functions](./ai_func).


### Creating AI agent

An Agent (intelligent agent) possesses autonomous decision-making and task execution capabilities, automatically selecting appropriate tools to complete complex business processes based on user input and contextual information.

An Agent's basic components include system prompts, tools (including application system module functions), and large language models.

JitAi's Agent implementation is natively and deeply integrated with application systems. Beyond supporting MCP service calls and knowledge base configuration, it enables direct manipulation of JitAi application data models, including reading data from frontend pages and controlling component behavior.

In this case, creating an AI Agent involves the following configuration steps: This includes reading current answer sheet details through the page's `getVariableValue` function, then directly obtaining the standard answer for questions associated with answer sheet details as scoring references.

<VideoPlayer relatePath="/docs/tutorial/en/ai_ui_agent.mp4" />

For detailed information, see [AI Agent](../../devguide/ai-agent/create-ai-agent).

### Creating AI Assistant

An AI Agent functions like a company employee, responsible for completing specific, well-defined tasks. An AI Assistant functions like a project manager or supervisor, coordinating multiple Agents to accomplish complex tasks.

JitAi's AI Assistant includes a dialog interface for direct user interaction.

Creating an AI Assistant in this case involves the following configuration steps:
<VideoPlayer relatePath="/docs/tutorial/en/ai_ui_assi.mp4" />

For detailed information, see [AI Assistant](../../devguide/ai-assistant/create-ai-assistant).

### Configuring Page Events to Work with AI Assistant

Frontend pages interact with AI Assistants through event configuration, enabling human-machine AI/UI collaborative task completion.

In this case, we aim to achieve the following objectives:

1. Send an AI message to initiate grading after clicking the `AI Grading` button
2. Write the score and comments back to the answer sheet form after AI completes its response

The implementation is straightforward—configure page events as follows:

<VideoPlayer relatePath="/docs/tutorial/en/ai_ui_page.mp4" />

:::warning Prerequisites
You must first enable the AI Assistant to access the `Send AI Message` function.
:::
