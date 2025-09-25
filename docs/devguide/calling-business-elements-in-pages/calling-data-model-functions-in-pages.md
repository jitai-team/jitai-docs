---
sidebar_position: 2
slug: calling-data-model-functions-in-pages
---

# Calling Data Model Functions in Pages

Pages can directly call data model functions to perform CRUD operations on backend data. Through concise syntax, you can complete data reading, creating, updating, and deleting operations without complex API interface calls, greatly simplifying the data operation workflow.

:::info Tutorial Reference
This document mainly introduces the basic syntax and concepts of data model function calls. For detailed illustrated tutorials, complete examples, and visual operation steps, please refer to:

**[Page Customization - Calling Data Model Functions](../frontend-ui-customization/page-customization#call-data-model-function)**
:::

## Calling Syntax {#calling-syntax}

Data model functions are called in exactly the same way as [service function calls](./calling-service-functions-in-pages), both through the `app` object with concise and unified syntax.

### Basic Syntax in Full-Code Pages {#basic-syntax-in-full-code-pages}

```typescript
// In page class member functions
this.app.models.[ModelID].[MethodName]([Parameter1], [Parameter2], ...)

// Calling from other places
import { getRuntimeApp } from 'jit';
const app = getRuntimeApp();
app.models.[ModelID].[MethodName]([Parameter1], [Parameter2], ...)
```

### Data Operation Capabilities {#data-operation-capabilities}
Data model functions provide pages with powerful data operation capabilities, enabling complex data processing tasks through simple unified syntax. To learn how to create and configure data models, please refer to: [Data Table Model](../data-modeling/data-table-model.md)

## Related Documentation

- [Calling Service Functions in Pages](./calling-service-functions-in-pages) - Learn about service function calling methods, with syntax completely consistent with data model functions.
