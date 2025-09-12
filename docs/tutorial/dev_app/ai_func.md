---
sidebar_position: 3
title: Implementing Answer Generation with AI LLM Functions
slug: ai_func
---

# Implementing Answer Generation with AI LLM Functions

## Case Effect

import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/ai_func_effect.mp4" />


## Implementation Process

To implement AI functionality, you first need to integrate with large language models. The LLM vendor element provides a unified integration solution for AI large model vendors, shielding API differences between different LLM vendors. Developers only need to simply configure keys to make calls.
The JitAi development framework has integrated nearly 10 mainstream LLM vendors and supports integration with privately deployed large models.

Creating a new LLM vendor element is as follows:
<VideoPlayer relatePath="/docs/tutorial/ai_func_llm.mp4" />

The "Question Bank Management" page is an "AI Data Management Page" type. We need to convert it to a "Regular Page" type for higher flexibility. The operation is as follows:

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_convert.mp4" />

In JitAi, calling large models is very simple, just like calling ordinary functions. It can be called directly in frontend pages or in backend service functions.

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_event.mp4" />

Read [AI Large Language Models](../../devguide/ai-llm/create-ai-llm) for more details.