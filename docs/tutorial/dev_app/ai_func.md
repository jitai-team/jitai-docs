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

To implement AI functionality, you must first integrate with large language models. The LLM vendor element provides unified integration for AI large model vendors, abstracting API differences between different LLM providers. Developers need only configure API keys to enable calls.

The JitAi development framework integrates nearly 10 mainstream LLM vendors and supports privately deployed large models.

Creating a new LLM vendor element:
<VideoPlayer relatePath="/docs/tutorial/ai_func_llm.mp4" />

The "Question Bank Management" page uses the "AI Data Management Page" type. We need to convert it to a "Regular Page" type for greater flexibility:

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_convert.mp4" />

In JitAi, invoking large models is straightforward—similar to calling ordinary functions. Large models can be invoked directly from frontend pages or backend service functions.

<VideoPlayer relatePath="/docs/tutorial/ai_func_page_event.mp4" />

For detailed information, see [AI Large Language Models](../../devguide/ai-llm/create-ai-llm).