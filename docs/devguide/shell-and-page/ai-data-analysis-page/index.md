---
sidebar_position: 4
description: "AI data visualization solution for natural language data analysis. Automatic chart generation, statistical rankings, and trend analysis."
---

# AI Data Analysis Page

## What is AI data analysis page {#what-is-ai-data-analysis-page}

AI Data Analysis Page is a data visualization solution launched by the JitAI platform. It fundamentally transforms the traditional data analysis paradigm, enabling ordinary users to easily perform professional-grade data analysis tasks.
The AI Data Analysis Page simplifies complex data analysis work into natural language conversations, allowing non-technical personnel to independently complete data insights and significantly reduce the barriers and costs of enterprise data analysis.

### Features {#features}

Users can describe data requirements in everyday language, such as "statistics of departmental performance rankings" or "analysis of sales trend changes," and the AI will automatically understand and generate corresponding charts. The system automatically selects the most appropriate chart type based on data characteristics, and users can adjust chart styles, colors, and filtering conditions at any time while saving personal preference settings. Developers can precisely control which data is allowed to be analyzed, ensuring data security.

### Technical Implementation Principles {#technical-implementation}

The JitAI platform has built-in data analysis page types and professional AI assistants. Developers only need to configure large language models and data permissions. Page development can be completed through the visual interface. When users input requirements, the AI automatically parses natural language, selects the best chart type and style, generates chart configurations, and calls page tools for display.

## Creating AI data analysis page {#create-ai-data-analysis-page}
Create in the developer portal by following these steps:

![Create AI Data Analysis Page - Creation](./imgs/create.png)

Click <span style={{ background:"#3d65fd", display: "inline-block", borderRadius: "8px", textAlign: "center", lineHeight: "100%", color: "#ffffff", fontSize: "24px", padding: "0px 10px 5px" }}>+</span>  → **UI Pages** → **AI Data Analysis Page**, open the page information form, and click the `Confirm` button after filling out the form to create the page.

![ai-data-analysis-page-create](./imgs/create-form.png)

After the page is created, it will automatically enter the visual editor.

## Page configuration {#page-configuration}
We provide visual development tools, and developers only need to make some simple configurations to get an AI data analysis page. The configuration is as follows:

![Create AI Data Analysis Page - Configuration](./imgs/setting.png)

### Allow using AI analyzed data {#allow-using-ai-analyzed-data} 
Specify the data tables and data conditions that can be analyzed. This configuration item controls the data allowed for analysis on this page, thereby controlling the data range that users can statistically analyze.

### Configure LLM for AI data analysis assistant {#configure-llm-for-ai-data-analysis-assistant}
We have built-in a specialized AI Assistant for data analysis on this page. This assistant needs to access the system database and call functions on the page to draw charts during runtime. We need to configure a [Large Language Model](/docs/devguide/ai-llm/create-ai-llm) that supports tool calling. We recommend using qwen-max-latest from Alibaba Cloud Bailian platform.<a href="https://bailian.console.aliyun.com/?tab=model#/api-key" target="_blank">Apply for API Key</a>

### AI assistant advanced configuration {#ai-assistant-advanced-configuration}
- Support custom [Welcome Message and Opening](/docs/devguide/ai-assistant/welcome-message-and-opening)
- Support custom [Output Process Log](/docs/devguide/ai-assistant/ai-assistant-input-output#message-output)

For more information about AI assistants, please read the [AI Assistant](/docs/devguide/ai-assistant) related documentation.

## Full code development {#full-code-development}
Click the <span style={{ display: "inline-flex", verticalAlign: "middle", margin: "0 !important", height: '30px', width: '40px', alignItems: "center" }}>![Full Code Button](./imgs/code.png)</span> button in the upper right corner of the page editor to switch to source code editing mode.
In source code mode, the left side displays source code files. After clicking on a source code file, the right side shows the source code content. The core source code is `schema.json`.

![Create AI Data Analysis Page - Source Code](./imgs/schema.png)

The content is as follows:
- **aiConfig**: AI-related configuration items
  - **useAi**: Enable AI functionality, fixed value is `1`
  - **aiAssistant**: AI assistant bound to the page, currently fixed as `pages.DataAnalysisType.GeneralAssistant`. Future versions will support developers to customize AI assistants
  - **inputArgs**: Input configuration for assistant runtime
  - **llmElement**: Large language model element ID
  - **llmConfig**: Large language model parameter configuration
  - **welcomeMessage**: Welcome message (optional, default is empty)
  - **prologues**: Opening content
  - **logContent**: Runtime process output level (optional, default is `LLM_CONCISE_LOG`)
    - `NOT_OUTPUT`: No runtime process output
    - `LLM_CONCISE_LOG`: Output brief runtime process
    - `DETAIL_LOG`: Output detailed runtime process
- **dataSources**: Data tables and data conditions allowed for AI analysis

## Runtime effects {#runtime-effects}
Enter `Calculate the trend of monthly order amounts` (statistics of monthly transaction volume trends), such a simple sentence specifies the data statistical method: statistics of monthly transaction volume; it also specifies the statistical chart type: smooth curve.
The runtime effect is as follows:

![Create AI Data Analysis Page - Demo](./imgs/chart_demo.gif)

For AI-generated charts, users can also make the following adjustments:

![Create AI Data Analysis Page - Modify Chart](./imgs/chart_update.png)

- **Filtering Condition**: Set filtering conditions for statistical data, which will be superimposed on the conditions of [Allow using AI analyzed data](#allow-using-ai-analyzed-data).
- **Chart Type**: Modify chart type
- **Save**: Save the chart, which will be directly visible when opening the page next time.

## Quick create {#quick-create}
In addition to creating in the developer portal, you can also quickly create in the regular portal. The creation method is as follows:

![Create AI Data Analysis Page - quickly](./imgs/quickly.png)

Click **Create** → **AI Data Analysis Functions**.This operation will create a new AI data analysis page and simultaneously create a menu in the portal and bind it to the newly added page.

:::tip Tip
You need to be granted [quick create permissions](/docs/devguide/user-and-permission/role-portal-menu-permissions#specify-accessible-portals-and-menus) to see the quick create entry.
:::
