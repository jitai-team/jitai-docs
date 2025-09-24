---
sidebar_position: 2
slug: ai-data-analysis-page
---

# AI Data Analysis Page
AI Data Analysis Page is specifically designed for using AI to perform data analysis, generate statistical charts, and quickly build data analysis interfaces through simple visual configuration.

The AI Data Analysis Page element hierarchy is Meta (pages.Meta) → Type (pages.DataAnalysisType) → Instance. Developers can quickly create AI data analysis page instance elements through JitAI's visual development tools.

## Quick Start
### Create Instance Element
#### Directory Structure
```title="AI Data Analysis Page Instance Directory Structure"
testDataAnalysisPage/          # Instance element directory
├── e.json                       # Element configuration file
├── scheme.json                  # Page layout and component configuration
├── index.ts                     # Export file
├── page.ts                      # Page logic class
├── PageRender.tsx              # React rendering component
└── page.style.ts               # Page style file (optional)
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "pages.DataAnalysisType",
  "resourceName": "index",
  "title": "Test AI Data Analysis Page",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### Page Configuration
The core configuration of the AI Data Analysis Page is defined through the `scheme.json` file:

```json title="scheme.json Basic Structure"
{
    "aiConfig": {
        "useAi": 1,
        "aiAssistant": "pages.DataAnalysisType.GeneralAssistant",
        "inputArgs": {
            "llmElement": "llms.alibur",
            "llmConfig": {
                "model": "qwen-max-latest"
            }
        },
        "welcomeMessage": "",
        "prologues": [
            "Statistics on monthly transaction volume trends"
        ],
        "logOutput": [
            "STEP_LOG",
            "REASONING_CONTENT",
            "TEXT_MESSAGE_CONTENT"
        ],
        "replayOutput": []
    },
    "dataSources": [
        {
            "name": "models.orderForms",
            "filter": "",
            "orderBy": ""
        }
    ]
}
```

#### Page Logic Code
```typescript title="page.ts Implementation Example"
import { Jit } from "jit";
import schemaJson from "./schema.json";

class PageCls extends Jit.DataAnalysisPage {
    schema: {
        aiConfig: Record<string, any>;
    } = schemaJson;

}

export default PageCls;
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| type | string | Yes | - | Element type, fixed as "pages.DataAnalysisType" |
| title | string | Yes | - | Page title |
| frontBundleEntry | string | Yes | "./index.ts" | Frontend entry file path |
| outputName | string | Yes | "index" | Output file name |
| resourceName | string | No | "index" | Resource name |

### Page Configuration
The scheme.json file defines the AI assistant configuration used by the page and the scope of data that can be analyzed:

- **aiConfig**: AI-related configuration items
 - **useAi**: Enable AI, fixed as 1
 - **aiAssistant**: AI assistant bound to the page, currently fixed as `pages.DataAnalysisType.GeneralAssistant`; future versions will support developers replacing it with custom AI assistants.
 - **inputArgs**: Input configuration when the assistant runs; **llmElement** is the configured large model element id, **llmConfig** is the parameter configuration of the large model
 - **welcomeMessage**: Welcome message, defaults to empty if not filled
 - **prologues**: Opening remarks in the assistant
 - **logOutput**: Message content output in the assistant dialog log area
 - **replayOutput**: Message content output in the assistant dialog reply area
- **dataSources**: Data tables and data conditions that allow AI analysis
