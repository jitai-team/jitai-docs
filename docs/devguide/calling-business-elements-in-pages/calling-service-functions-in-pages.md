---
sidebar_position: 1
slug: calling-service-functions-in-pages
---

# Calling Service Functions in Pages

Pages can directly call backend service functions to implement data queries, business processing, status updates, and other operations. Without additional middleware or complex configurations, you can complete frontend-backend data interactions through simple syntax, greatly improving development efficiency.

## Calling Service Functions in Standard Pages {#calling-service-functions-in-standard-pages}

![Event Panel](./img/event-panel.png)

In the visual page editor, select the component you want to add service functions to, and click the `Events` button in the upper right corner to open the event panel.

![Choose Service Functions](./img/choose-services.png)

In the event panel, add a blank statement, then select `Services` - `Service Function`.

![Code View](./img/code-view.png)

You can view the generated code implementation through the `<>` button in the upper right corner of the page or the `<>` button to the right of the current statement.

![Code View](./img/code-line.png)

## Calling Service Functions in Full-Code Pages {#calling-service-functions-in-full-code-pages}

![Code View](./img/full-code.png)

Calling service functions in full-code pages is more concise and direct. In page class member functions, you can call service functions simply through `this.app.services.[ServiceID].[ServiceFunctionName]`. How to get the service ID? You can click the dropdown menu to the right of the corresponding service in the element directory tree, then click `Copy Element ID` to get the service ID.

Besides calling in page class member functions, you can also call service functions from other places. All service function calls are made through the app object: in page class member functions, get the app object through `this.app`; in other places, you can get it through the following method:

```typescript
import { getRuntimeApp } from 'jit';
const app = getRuntimeApp();

```
After getting the app object, you can call service functions.

## Complex Parameter Handling {#complex-parameter-handling}
For service functions with complex parameters, it's recommended to first configure the parameters in the visual interface (such as the event panel), then copy the generated code to use in full-code pages. This can avoid errors when manually writing complex parameters.

Service functions provide pages with powerful backend capability extensions, enabling various custom business scenarios through simple syntax. To learn how to create service functions, please see [Creating Service Functions](../business-logic-development/creating-service-elements.md).

## Related Documentation

- [Calling Data Model Functions in Pages](./calling-data-model-functions-in-pages) - Learn about data model function calling methods, with syntax completely consistent with service functions
