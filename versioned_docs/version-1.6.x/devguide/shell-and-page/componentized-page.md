---
sidebar_position: 1.5
description: "Componentized pages for user interfaces. Generic, AI data management, data entry pages, and full-code pages with JitAI components."
---
# Componentized Pages

Pages are the primary interfaces where users interact with application systems, providing data display and interactive operation interfaces. When [creating portals](./portal-navigation-design), developers plan the navigation menus for each portal, with each menu item corresponding to both PC and mobile versions of a page. If developers choose to create pages while creating portal menus, the system automatically generates a page that can be found and edited in the element directory tree.

JitAI provides four common page types: [Generic Page](./generic-page), [AI Data Management Page](./ai-data-management-page), [AI Data Analysis Page](./ai-data-analysis-page), and [Data Entry Page](./data-entry-page)—all of which are `componentized pages` composed of frontend components from the JitAI development framework. Additionally, JitAI offers [React Full-Code Pages](./full-code-page-development#creating-react-full-code-pages) and [Vue Full-Code Pages](./full-code-page-development#creating-vue-full-code-pages) for highly customized page development, where JitAI frontend components can also be used. JitAI also supports [Markdown Pages](./markdown-page) for displaying Markdown documentation. Among these, AI Data Management Page, AI Data Analysis Page, and Data Entry Page are all built upon Generic Page.

In componentized pages, the page function logic, page event function logic, and component event function logic can all invoke other business elements, including but not limited to [services](../business-logic-development/creating-service-elements), [data models](../data-modeling), [AI large language models](../ai-llm/create-ai-llm), [AI Agents](../ai-agent/create-ai-agent), [AI Assistants](../ai-assistant/create-ai-assistant), and more. For detailed information about invoking business elements, refer to [Calling Frontend and Backend Tools and Services in Function Logic](../calling-business-elements-in-pages).

