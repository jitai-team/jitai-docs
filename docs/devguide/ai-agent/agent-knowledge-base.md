---
sidebar_position: 4
slug: agent-knowledge-base
---

# Using Knowledge Base for Retrieval-Augmented Generation (RAG)

Agents can implement Retrieval-Augmented Generation (RAG) by integrating knowledge bases, enabling them to retrieve relevant information before generating responses, thereby improving answer accuracy and timeliness.

## Adding knowledge bases in Agent {#integrate-knowledge-base-rag}
RAG is an AI solution that combines knowledge retrieval with large language model generation capabilities. It retrieves relevant information from knowledge bases before the model generates responses, inputting the retrieval results along with user questions to the large language model, thereby improving response accuracy and timeliness.

![Add Knowledge Base](./img/agent/agent-add-knowledge-base.gif "Add Knowledge Base")

Developers can switch to the `Knowledge Base` tab in the Agent visual editor, click the `Add Knowledge Base` button, select the target knowledge base element in the popup, and click the `Confirm` button. Agents support adding multiple knowledge bases, each of which can be enabled or disabled, with the default being enabled. When a knowledge base is no longer needed, developers can click the delete button on the right to remove it from the Agent.

There is also a `Enable LLM-decided querying` switch, which is enabled by default. When enabled, it operates in non-mandatory mode; when disabled, it operates in mandatory mode. In mandatory mode, the Agent will first query the knowledge base using the user input content before the initial request to the large language model, using the results as contextual supplement and enhancement. If developers disable this option, the large language model will decide on its own whether to query and how to query the knowledge base. Regardless of whether `Enable LLM-decided querying` is enabled or disabled, developers can design knowledge base usage strategies in system prompts to guide the large language model's use of knowledge bases.

For knowledge base creation, please refer to [AI Knowledge Base](../knowledge-base/create-knowledge-elements#create-ai-knowledge-base-element).