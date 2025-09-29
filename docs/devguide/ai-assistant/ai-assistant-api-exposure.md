---
sidebar_position: 14
slug: ai-assistant-api-exposure
---

# AI Assistant API Exposure

## Send AI Message Function {#send-ai-message} 
After using an AI assistant in a page, there will be a **Send AI Message** function on the page. The function has the following parameters:
- **Message Content**: The text message content to be sent
- **Start New Conversation**: When enabled, it will open a new [conversation record](./ai-chat-history) and send the message. If not enabled, it will send the message in the currently open conversation; if the assistant is paused at a workspace human-machine interaction node at this time, the process will resume.
- **Custom Parameters**: [Custom input parameters](./ai-assistant-input-output#input-parameters) configured on the AI assistant

For calling methods, refer to [Sending AI Messages in Pages](../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#send-ai-message)


## Calling AI Assistant Within Application

In frontend pages, backend services/model functions can [directly call AI assistants](../using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages#call-ai-assistant).

:::info Important Notes
When calling AI assistants through API methods, please note the following limitations:

**Calling Method Limitations:**
- Currently only supports non-streaming calls (synchronous calls)
- Streaming call functionality is under development, stay tuned

**Applicable Scenario Limitations:**
- Only supports calling AI assistants with **automated processes**
- Does not support calling AI assistant processes that include **human-machine interaction nodes**
- Ensure the AI assistant process can execute completely automatically without human intervention

**Usage Recommendations:**
- Before calling, please confirm that the AI assistant process is designed for pure automated execution
- For human-machine interaction functionality, it is recommended to use the "Send AI Message" function on the frontend page
:::


## External AI Assistant Calls

coming soon...

