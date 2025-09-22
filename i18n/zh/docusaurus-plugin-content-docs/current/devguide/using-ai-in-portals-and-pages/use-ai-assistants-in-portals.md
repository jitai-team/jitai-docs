---
sidebar_position: 1
slug: using-ai-assistants-in-portals
---

# 在常规门户中使用AI助理

## 配置AI助理

在常规门户的可视化开发界面中，切换到**AI助理**页签，进入AI助理配置界面：

![Portals - Bind AI Assistant](./img/portal-assistant-config.png)

启用AI助理开关后，需要配置以下参数：
- **AI助理**：从现有[AI助理](../ai-assistant)中选择一个
- **欢迎语与开场白**：自定义[欢迎语与开场白](../ai-assistant/welcome-message-and-opening)内容
- **输出运行过程日志**：配置助理运行时[运行过程日志](../ai-assistant/ai-assistant-input-output#message-output)的输出内容

## 运行效果

门户启用AI助理后，导航栏将显示"AI助理"功能入口：

![Portals - AI Assistant Menu](./img/portal-assistant-menu.png)

![Portals - AI Example](./img/portal-assistant-openmenu.gif)

AI助理界面采用左右分栏布局：左侧显示历史[对话记录](../ai-assistant/ai-chat-history)，右侧为助理对话区域。

## 功能特点

JitAi框架已实现AI助理与门户页面的深度集成。前面的示例中简单演示了使用AI助理打开功能页面。实际情况中，门户中的AI助理通常为子系统级别，其功能能力完全由开发者自定义配置。