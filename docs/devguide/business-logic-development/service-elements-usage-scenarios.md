---
sidebar_position: 3
slug: service-elements-usage-scenarios
description: "Service elements usage scenarios and best practices. When and how to use service elements for business logic in applications."
---

# Service Elements Usage Scenarios

## Where service functions are used {#where-service-functions-are-used}
Service functions can be invoked anywhere function logic can be implemented, including [page functions](../shell-and-page/generic-page#page-functions), [page events](../shell-and-page/generic-page#page-events), [frontend component event handlers](../shell-and-page/generic-page#event-panel), [task execution functions](./background-tasks#developing-task-execution-functions), [model events](./event-handling#model-events), [approval events](./event-handling#approval-events), [custom events](./event-handling#custom-events), [AI assistant events](./event-handling#ai-assistant-events), [AI Agent tool invocation events](./event-handling#agent-tool-call-events), and within other service functions themselves.

Additionally, service functions can be invoked by large language models when configured [as AI Agent tools](../ai-agent/agent-tools#calling-service-functions), called from [AI assistant function nodes](../ai-assistant/process-orchestration-node-configuration#function), and exposed to external systems via [API authorization elements](../api-exposure/api-authorization).

## Helping AI understand service functions accurately {#help-ai-understand-service-functions}
Every service function includes a declaration in the service element's `e.json` file as part of the `functionList`. This `functionList` serves multiple purposes: it enables the IDE's visual editor to recognize functions for visual logic orchestration, ensures functions can be invoked correctly, and allows AI to understand and utilize them effectively.

Providing complete and accurate function names, descriptive parameter names (both input and output), and clear function descriptions helps AI comprehend function capabilities and usage patterns more precisely, resulting in more accurate function invocations.

![Service Element Definition File](./img/service-element-definition-file.png "Service Element Definition File")

The visual editor makes it easy for developers to specify function names, define input and output parameters, and write function descriptions. The platform automatically generates the `functionList` in the service element's `e.json` file based on these configurations.

:::tip
According to the [JAAP specification](../../reference/runtime-platform/JAAP), any element—not just service elements—can define its own `functionList`.
:::
