---
sidebar_position: 2
slug: ai-customer-service
---

# AI Customer Service Agent

:::info
This guide is designed for beginners to quickly get up and running. By completing this tutorial, you will:
1. Master the fundamentals of the JitAi development platform.
2. Build an AI customer service agent from scratch and integrate it into your business application pages.
3. Note: SQLite database is not supported. Please configure MySQL as your default database. For database details, see [JitORM](../data-modeling/supported-database-vendors).
:::

## Preview {#preview}

![Final Result - Embedded AI Assistant](./img/jitairobot/final-result-embedded-ai-assistant.png "Final Result - Embedded AI Assistant")

--- 

## Let's Get Started! {#getting-started}
### Prerequisites {#prerequisites}
1. [Download the desktop installation package](../../tutorial/download-installation) (skip if already installed)
2. Obtain a large language model service API key - you'll need to register with a provider (this tutorial uses [Alibaba Cloud Bailian Platform](https://bailian.console.aliyun.com/?tab=model#/api-key))
3. Prepare a document to serve as your knowledge base content source (supports Word, PDF, TXT, and Markdown formats)

---

### Creating the Application {#creating-application}

1. Launch the desktop JitNode application and complete the activation process
2. Navigate to the application management page and create a new application named "TestJitAI"
3. Click `Develop` in the application list to access the development environment

    ![Creating New Application](./img/jitairobot/create-new-application.png "Creating New Application")

---

### Creating AI LLM Instance Element {#creating-ai-llm-instance}

1. Navigate to AI LLM and select a large language model provider (this tutorial uses Alibaba Cloud Bailian)
2. Configure your API key and optionally set up a backup API key
3. Confirm the configuration

    ![Creating AI LLM Instance Element](./img/jitairobot/create-ai-llm-instance-element.png "Creating AI LLM Instance Element")

---

### Creating AI Knowledge Base Instance Element {#creating-ai-knowledge-base-instance}
1. Create a new knowledge base instance element
   
   ![Creating AI Knowledge Base Instance Element](./img/jitairobot/create-ai-knowledge-base-instance-element.png "Creating AI Knowledge Base Instance Element")

2. Configure vector model: Select the previously created AI LLM instance as your provider and choose text-embedding-v3 as the model
3. Configure rerank model: Select the previously created AI LLM instance as your provider and choose gte-rerank-v2 as the model
4. Confirm the configuration
5. Upload files to the knowledge base
   
   ![Adding Knowledge Base Files](./img/jitairobot/add-knowledge-base-files.png "Adding Knowledge Base Files")

6. Initiate document vectorization (server version automatically handles this process)

    For desktop installations, open a new browser tab and navigate to the following URL to trigger vectorization:
    ```shell
    http://127.0.0.1:8080/onTimer
    ```
    
    Allow time for the vectorization process to complete. The document status in your knowledge base will update to `Normal` once finished.

    ![Knowledge Base Files Added Successfully](./img/jitairobot/knowledge-base-files-added-successfully.png "Knowledge Base Files Added Successfully")

---

### Creating AI Agent Instance Element {#creating-ai-agent-instance}

1. Create a new AI Agent instance element and name it `Customer Service`
   
   ![Creating AI Agent Instance Element](./img/jitairobot/create-ai-agent-instance-element.png "Creating AI Agent Instance Element")

   ```text title="Agent Description"
   This agent functions as a customer service representative, capable of answering various common questions about JitAi
   ```

   ![AI Agent Basic Configuration](./img/jitairobot/ai-agent-basic-config.png "AI Agent Basic Configuration")

2. Select the previously created AI LLM instance element
3. Choose the model: qwen-max-latest
   
   ![AI Agent Adding Knowledge Base](./img/jitairobot/ai-agent-add-knowledge-base.png "AI Agent Adding Knowledge Base")

4. Link knowledge base: Select the previously created AI knowledge base instance element
5. Configure the system prompt
    ```markdown title="Sample Prompt"
    You are a professional and friendly AI customer service representative who answers user questions based on knowledge base information.

    ## Tasks
    1. Identify keywords in user questions, understand the issues, consider users' potential needs, and compile a `keyword list`
    2. Use the `keyword list` to query the knowledge base and retrieve `knowledge fragments`
    3. Synthesize the retrieved `knowledge fragments` and present them in clear, natural language to form your final response

    ## Constraints
    4. If no relevant `knowledge fragments` are found, clearly state "This information is not available in our knowledge base"
    ```

6. Save your configuration


---

### Creating AI Assistant Instance Element {#creating-ai-assistant-instance}

1. Create a new AI assistant instance element and name it `Customer Service`
   
   ![Creating AI Assistant Instance Element](./img/jitairobot/create-ai-assistant-instance-element.png "Creating AI Assistant Instance Element")

2. Add an `AI Agent` node and select the previously created AI Agent instance element
3. Connect the `Start` node to the AI Agent node named `Customer Service`
4. Configure welcome message and opening statement (optional)
5. Save your configuration

![AI Assistant Flow Configuration Interface](./img/jitairobot/ai-assistant-flow-config.png "AI Assistant Flow Configuration Interface")

---

### Creating Page and Enabling AI Assistant {#creating-page-enabling-assistant}

1. Create a new `Generic Page` instance element

   ![Creating Generic Page Instance Element](./img/jitairobot/create-generic-page-instance-element.png "Creating Generic Page Instance Element")

2. Enable the AI assistant: Select the `Customer Service` AI assistant instance element you just created. This will make the AI assistant available directly in the development environment
   
   ![Enabling AI Assistant for Page](./img/jitairobot/enable-ai-assistant-for-page.png "Enabling AI Assistant for Page")

   ![Using AI Assistant in Development Area](./img/jitairobot/use-ai-assistant-in-dev-area.png "Using AI Assistant in Development Area")

3. To make the AI assistant available to end users, navigate to Portal → User Portal → Create New Menu → Bind Existing Page. Users will then be able to access the AI assistant through the user portal
    ![Configuring AI Assistant Page in User Portal](./img/jitairobot/configure-ai-assistant-page-in-user-portal.png "Configuring AI Assistant Page in User Portal")

    ![Using AI Assistant in User Portal](./img/jitairobot/final-result-embedded-ai-assistant.png "Using AI Assistant in User Portal")


---

## Congratulations! {#congratulations}

You have successfully mastered the fundamentals of the JitAi development platform and built your first AI customer service agent.








