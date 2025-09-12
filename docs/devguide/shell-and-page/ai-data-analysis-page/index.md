---
sidebar_position: 4
---

# AI Data Analysis Page {#data-range-allowed-for-ai-analysis}
## Feature Overview
In traditional development mode, statistical charts are pre-designed by developers, and users cannot modify chart types and statistical methods. JitAI's ai-data-analysis-page allows users to describe their requirements through natural language, with AI automatically generating corresponding data charts and supporting users to adjust chart styles and statistical dimensions at any time.

## Creating AI Data Analysis Page {#create-ai-data-analysis-page}
Create in the developer portal by following these steps:

![新建ai-data-analysis-page-创建](./imgs/create.png)

Developers can select the page type as `AI Data Analysis Page` when creating a page, open the new dialog, and enter the name.

## Page Configuration {#page-configuration}
We provide visual development tools that allow developers to create an ai-data-analysis-page with just some simple configurations. The configuration is as follows:

![新建ai-data-analysis-page-配置](./imgs/setting.png)

### Data Range Allowed for AI Analysis {#data-range-allowed-for-ai-analysis} 
Specify the data tables and data conditions that can be analyzed. This configuration controls the data allowed for analysis on this page, thereby controlling the data range that users can statistically analyze.

### Configure Large Language Model
We have built-in a specialized [ai-assistant](../../ai-assistant) for data analysis in this page. This assistant needs to access the system database and call functions on the page to draw charts during runtime. We need to configure a [large language model](../../ai-llm/create-ai-llm) that supports tool calling. We recommend using qwen-max-latest from Alibaba Cloud Bailian platform.<a href="https://bailian.console.aliyun.com/?tab=model#/api-key" target="_blank">Apply for API Key</a>

### ai-assistant Advanced Configuration
- Support custom [welcome message and opening](../../ai-assistant#welcome-message-and-opening)
- Support custom [message output](../../ai-assistant#message-output)

## Runtime Effects {#run-effects}
Input `统计每月成交额走势` (statistics on monthly transaction volume trends), this simple sentence specifies the data statistical method: statistics on monthly transaction volume; and also specifies the statistical chart type: smooth curve.
The runtime effect is as follows:

![新建ai-data-analysis-page-演示](./imgs/chart_demo.gif)

For AI-generated charts, users can also make the following adjustments:

![新建ai-data-analysis-page-修改图表](./imgs/chart_update.png)

- **Filter**: Set filtering conditions for statistical data, which will be superimposed on the conditions of [data range allowed for AI analysis](#data-range-allowed-for-ai-analysis).
- **Chart Settings**: Modify chart types
- **Save**: Save the chart, which will be visible directly when opening the page next time.
## Full Code Development {#full-code-development}
Click the `</>` button in the upper right corner of the page editor to switch to source code editing mode.
In source code mode, the left side displays source code files. After clicking a source code file, the right side shows the source code content. The core source code is `schema.json`.

![新建ai-data-analysis-page-源码](./imgs/schema.png)

The content is as follows:
- **aiConfig**: AI-related configuration items
 - **useAi**: Enable AI, fixed as 1
 - **aiAssistant**: The ai-assistant bound to the page, currently fixed as `pages.DataAnalysisType.GeneralAssistant`; future versions will support developers replacing it with custom ai-assistant.
 - **inputArgs**: Input configuration when the assistant is running; **llmElement** is the configured large language model element id, **llmConfig** is the parameter configuration of the large language model
 - **welcomeMessage**: Welcome message, defaults to empty if not filled
 - **prologues**: Opening remarks in the assistant
 - **logOutput**: Message content output in the log area of the assistant dialog
 - **replayOutput**: Message content output in the reply area of the assistant dialog
- **dataSources**: Data tables and data conditions allowed for AI analysis

## Quick Create {#quick-create}
In addition to creating in the developer portal, you can also quickly create in regular portals. The creation method is as follows:

![新建ai-data-analysis-page-源码](./imgs/quickly.png)

This operation will create a new ai-data-analysis-page and simultaneously create a menu in the portal and bind it to the newly added page.

:::tip Tip
You need to be granted [quick create permissions](../../user-and-permission/role-permissions#specify-accessible-portals-and-menus) to see the quick create entry.
:::