---
sidebar_position: 4
description: "AI数据分析页面的详细指南和说明。"
---

# AI数据分析页面

## 什么是AI数据分析页面 {#what-is-ai-data-analysis-page}

AI数据分析页面是JitAI平台推出的一种数据可视化解决方案。它彻底改变了传统数据分析的模式，让普通用户也能轻松进行专业级的数据分析工作。
AI数据分析页面将复杂的数据分析工作简化为自然语言对话，让非技术人员也能独立完成数据洞察，大幅降低企业数据分析的门槛和成本。

### 功能特性 {#features}

用户可以用日常语言描述数据需求，比如"统计各部门业绩排名"或"分析销售趋势变化"，AI会自动理解并生成对应的图表。系统会根据数据特点自动选择最合适的图表类型，用户还可以随时调整图表样式、颜色和筛选条件，并保存个人偏好设置。开发者可以精确控制哪些数据允许被分析，确保数据安全。

### 技术实现原理 {#technical-implementation}

JitAI平台已经内置了数据分析页面类型和专业的AI助理，开发者只需要配置大模型和数据权限即可。通过可视化界面就能完成页面的开发。当用户输入需求时，AI会自动解析自然语言，选择最佳的图表类型和样式，生成图表配置并调用页面工具展示。


## 创建AI数据分析页面 {#create-ai-data-analysis-page}
在开发者门户中按以下操作创建：

![新建AI数据分析页面-创建](./imgs/create.png)

开发者可以在创建页面时选择页面类型为 `AI数据分析页面`，打开新建弹窗，输入名称即可。

## 页面配置 {#page-configuration}
我们提供了可视化开发工具，开发者只需要做一些简单的配置，即可得到一个AI数据分析页面。配置如下：

![新建AI数据分析页面-配置](./imgs/setting.png)

### 允许使用AI分析的数据范围 {#allow-using-ai-analyzed-data} 
指定可分析的数据表及数据条件，通过该配置项控制在该页面允许分析的数据，以此来控制用户可统计的数据范围。

### 配置大模型 {#configure-llm-for-ai-data-analysis-assistant}
我们在该页面中内置了一个专门用于数据分析的[AI助理](/docs/devguide/ai-assistant/create-ai-assistant)，该助理在运行时需要访问系统数据库及调用页面上的函数绘制图表。我们需要为其配置一个支持调用工具的[大模型](/docs/devguide/ai-llm/create-ai-llm)，推荐使用阿里云百炼平台的qwen-max-latest。<a href="https://bailian.console.aliyun.com/?tab=model#/api-key" target="_blank">申请API Key</a>

### AI助理高级配置 {#ai-assistant-advanced-configuration}
- 支持自定义[欢迎语与开场白](/docs/devguide/ai-assistant/welcome-message-and-opening)
- 支持自定义[输出运行过程日志](/docs/devguide/ai-assistant/ai-assistant-input-output#message-output)，默认会输出简要过程日志。

## 运行效果 {#runtime-effects}
输入`统计每月成交额走势`，这样一句简单的话指定了数据统计方式：统计每月成交额；也指定了统计图表类型：平滑曲线。
运行效果如下：

![新建AI数据分析页面-演示](./imgs/chart_demo.gif)

AI生成的图表，用户还可以做以下调整：

![新建AI数据分析页面-修改图表](./imgs/chart_update.png)

- **筛选**：设置统计数据的筛选条件，该条件会在[允许使用AI分析的数据范围](#allow-using-ai-analyzed-data)的条件上叠加。
- **设置图形**：修改图表类型
- **保存**：保存图表，下次打开页面直接可见。
## 全代码开发 {#full-code-development}
点击页面编辑器右上角`</>`按钮，切换到源码编辑模式。
源码模式下左侧展示源码文件，点击源码文件后右侧显示源码内容，核心源码是`schema.json`。

![新建AI数据分析页面-源码](./imgs/schema.png)

内容如下：
- **aiConfig**: AI相关配置项
  - **useAi**: 启用AI功能，固定值为 `1`
  - **aiAssistant**: 页面绑定的AI助理，当前固定为 `pages.DataAnalysisType.GeneralAssistant`，后续版本将支持开发者自定义AI助理
  - **inputArgs**: 助理运行时输入配置
  - **llmElement**: 大模型元素ID
  - **llmConfig**: 大模型参数配置
  - **welcomeMessage**: 欢迎语（可选，默认为空）
  - **prologues**: 开场白内容
  - **logContent**: 运行过程输出级别（可选，默认为 `LLM_CONCISE_LOG`）
    - `NOT_OUTPUT`: 不输出运行过程
    - `LLM_CONCISE_LOG`: 输出简要运行过程
    - `DETAIL_LOG`: 输出详细运行过程
- **dataSources**: 允许AI分析的数据表及数据条件

## 快捷创建 {#quick-create}
除了在开发者门户中创建，还可以在常规门户中快捷创建。创建方式如下：

![新建AI数据分析页面-源码](./imgs/quickly.png)

该操作会新建一个AI数据分析页面，同时在门户中创建一个菜单并绑定新增的页面。

:::tip 提示
需要被授予[快捷创建权限](/docs/devguide/user-and-permission/role-portal-menu-permissions#specify-accessible-portals-and-menus)，才能看到快捷创建的入口。
:::
