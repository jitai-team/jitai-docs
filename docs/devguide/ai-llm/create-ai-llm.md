---
sidebar_position: 1
slug: create-ai-llm
---

# Creating AI LLM Elements {#create-ai-llm}
With the rapid advancement of AI technology, modern application systems are undergoing an intelligent revolution. However, faced with numerous AI service providers and constantly updated model versions, developers often encounter challenges of choice paralysis and integration complexity.

LLM vendor elements are JitAi platform's unified AI integration solution designed to address this problem. Whether you want to build intelligent [AI Knowledge Bases](../knowledge-base/create-knowledge-elements), develop AI assistants, or create autonomous decision-making Agents, it provides stable and reliable LLM service support.

## Mainstream LLM Vendor Support List {#mainstream-llm-vendor-support-list}
*   Anthropic
*   Alibaba Cloud Bailian
*   Deepseek
*   Gemini
*   OpenAI
*   SiliconFlow
*   OpenAI Compatible

## Creating LLM Vendor Elements {#creating-llm-vendor-elements}
![LLM Vendor Creation](./img/1/large-model-creation.png)

Click the `+` button next to the search box in the element directory tree, select `AI LLM` from the popup menu, then choose the corresponding LLM vendor based on your actual needs. After selection, the following dialog will appear.

![LLM Creation Dialog](./img/1/large-model-create-popup.png)

In the dialog, fill in the name, then go to the corresponding model vendor's configuration page to add an API Key (if you don't know the address, you can click `Get API Key` in the bottom left corner), then fill the API Key here and click the `Save` button to complete creation.
API Keys can be configured using environment variables by clicking the button in the top right corner to avoid exposure.
:::tip
API URL generally doesn't need modification, as default configurations for each vendor are already filled in.
:::

![Element Tree Display](./img/1/element-tree-display.png)

After creation, it will be displayed in the left element tree.

## Retry and Backup API Key Mechanism {#retry-backup-api-key-mechanism}
To avoid model call failures due to single key rate limits, excessive requests, and other limitations, we provide retry and multi-key mechanisms. Maximum of 3 retries, with waiting times of 1 second, 2 seconds, and 4 seconds respectively for each retry. If multiple API Keys are configured, each retry will rotate to backup API Keys. This means the system won't repeatedly attempt on the same failed key, but intelligently switches to backup keys to improve success rates. If there's only one API Key, the system will attempt 4 times on this key (1 call + 3 retries).

![Multiple Keys](./img/1/multi-keys.png)

Click `Enable Backup Keys` - `+Backup Key` on the interface to add a key input field, fill in your backup key, then click `Save`.

## Private LLM Integration {#private-llm-integration}
For information security, developers may deploy private models, and the platform also supports private model integration.

![Private Model](./img/1/private-model.png)

Private models use OpenAI Compatible elements for connection. Taking Ollama as an example, the default address is `http://127.0.0.1:11434/v1`. If there's an API Key, fill it in. Note that private models need to enable the `Enable Custom Model` configuration and input the complete model name, such as: qwen3:0.6b, nomic-embed-text.

:::tip
Vendors that support OpenAI interfaces can all use OpenAI Compatible elements for connection. The figure below uses Volcano Engine's Doubao as a reference example.
:::

![Doubao Compatibility](./img/1/doubao-compatibility.png)
