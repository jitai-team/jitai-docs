---
sidebar_position: 6
title: Implementing AI/UI Collaborative Grading with AI Agent
slug: ai_ui
---

# Implementing AI/UI Collaborative Grading with AI Agent

## Case Effect

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_ui_effect.mp4" />

## Implementation Process

### Prerequisites

1. Create models as described in [Building Question Bank Management with Professional Mode](./ide_mode): Answer Sheet Table, Answer Sheet Detail Table.
2. Create pages as described in [Building Question Bank Management with Professional Mode](./ide_mode): Answer Sheet Page.
3. Create LLM vendor elements as described in [Implementing Answer Generation with AI LLM Functions](./ai_func).


### Creating AI Agent

Agent (intelligent agent) has autonomous decision-making and task execution capabilities, able to automatically select appropriate tools to complete complex business processes based on user input and contextual information.

The basic components of an Agent are system prompts, tools (including application system module functions), and large language models.

JitAi's Agent implementation is natively integrated and highly integrated with application systems. In addition to supporting MCP service calls and knowledge base configuration, it also supports direct manipulation of data in Jit application data models, and even reading data from frontend pages and controlling component behavior on pages.

In this case, creating an AI Agent and its configuration operations are as follows: (This includes reading current answer sheet details through the page's `getVarableValue` function; then directly obtaining the standard answer for that question through the questions associated in the answer sheet details as a scoring reference.)

<VideoPlayer relatePath="/docs/tutorial/ai_ui_agent.mp4" />

Read [AI Agent](../../devguide/ai-agent) for more details.

### Creating AI Assistant

AI Agent is equivalent to an employee in a company, responsible for completing relatively clear and specific tasks; AI Assistant is equivalent to a project manager/supervisor in a company, responsible for coordinating multiple Agents to complete complex tasks.

JitAi's AI Assistant also provides a dialog box for direct user interaction.

In this case, creating an AI Assistant and its configuration operations are as follows:
<VideoPlayer relatePath="/docs/tutorial/ai_ui_assi.mp4" />

Read [AI Assistant](../../devguide/ai-assistant) for more details.

### Configuring Page Events to Work with AI Assistant

Frontend pages interact with AI Assistant through event configuration, achieving human-machine AI/UI collaborative task completion.

In this case, we want to achieve the following objectives:

1. After clicking the `AI Grading` button, send AI message to start grading.
2. After AI completes its response, write back the score and comments to the answer sheet form on the page.

The operation steps are also simple, configure page events as follows:

<VideoPlayer relatePath="/docs/tutorial/ai_ui_page.mp4" />

:::warning
You must first enable AI Assistant to see the `Send AI Message` function.
:::
