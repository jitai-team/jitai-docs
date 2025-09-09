---
sidebar_position: 2
slug: ai-data-analysis-page
---

# AI数据分析页面
AI数据分析页面是专门用于使用AI做数据分析，生成统计图表，通过可视化简单配置快速构建数据分析界面。

AI数据分析页面元素分层结构为Meta（pages.Meta） → Type（pages.DataAnalysisType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建AI数据分析页面实例元素。

## 快速开始 
### 创建实例元素
#### 目录结构
```title="AI数据分析页面实例目录结构"
testDataAnalysisPage/          # 实例元素目录
├── e.json                       # 元素配置文件
├── scheme.json                  # 页面布局和组件配置
├── index.ts                     # 导出文件
├── page.ts                      # 页面逻辑类
├── PageRender.tsx              # React渲染组件
└── page.style.ts               # 页面样式文件（可选）
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "pages.DataAnalysisType",
  "resourceName": "index",
  "title": "测试AI数据分析页面",
  "frontBundleEntry": "./index.ts",
  "outputName": "index"
}
```

#### 页面配置
AI数据分析页面的核心配置通过`scheme.json`文件定义：

```json title="scheme.json基本结构"
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
            "统计每月成交额走势"
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

#### 页面逻辑代码
```typescript title="page.ts实现示例"
import { Jit } from "jit";
import schemaJson from "./schema.json";

class PageCls extends Jit.DataAnalysisPage {
    schema: {
        aiConfig: Record<string, any>;
    } = schemaJson;

}

export default PageCls;
```

## 元素配置
### e.json配置
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | string | 是 | - | 元素类型，固定为"pages.DataAnalysisType" |
| title | string | 是 | - | 页面标题 |
| frontBundleEntry | string | 是 | "./index.ts" | 前端入口文件路径 |
| outputName | string | 是 | "index" | 输出文件名 |
| resourceName | string | 否 | "index" | 资源名称 |

### 页面配置
scheme.json文件定义了页面使用的AI助理配置及可分析的数据范围：

- **aiConfig**: AI相关配置项
 - **useAi**: 启用AI，固定为1
 - **aiAssistant**: 页面绑定的AI助理，当前固定为`pages.DataAnalysisType.GeneralAssistant`；后续会支持由开发者替换成自定义的AI助理。
 - **inputArgs**: 助理运行时的输入配置；**llmElement**是配置的大模型元素id，**llmConfig**是大模型的参数配置
 - **welcomeMessage**: 欢迎语，如果不填写，则默认为空
 - **prologues**: 助理中的开场白
 - **logOutput**: 助理对话框日志区输出的消息内容
 - **replayOutput**: 助理对话框回复区输出的消息内容
- **dataSources**: 允许AI分析的数据表及数据条件
