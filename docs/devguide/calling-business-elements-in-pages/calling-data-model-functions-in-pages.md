---
sidebar_position: 2
slug: calling-data-model-functions-in-pages
---

# Calling Data Model Functions in Pages

Pages can directly invoke data model functions to perform CRUD operations on backend data. Using intuitive syntax, you can accomplish data reading, creation, updating, and deletion operations without complex API interface calls, significantly streamlining your data operation workflow.

:::info Tutorial Reference
This document covers the fundamental syntax and concepts for data model function calls. For comprehensive illustrated tutorials, complete examples, and step-by-step visual guides, please refer to:

**[Page Customization - Calling Data Model Functions](../frontend-ui-customization/page-customization#call-data-model-function)**
:::

## Calling Syntax {#calling-syntax}

Data model functions are called in exactly the same manner as [service function calls](./calling-service-functions-in-pages), both utilizing the `app` object with consistent and streamlined syntax.

### Basic Syntax in Full-Code Pages {#basic-syntax-in-full-code-pages}

```typescript
// Within page class member functions
this.app.models.[ModelID].[MethodName]([Parameter1], [Parameter2], ...)

// Calling from other contexts
import { getRuntimeApp } from 'jit';
const app = getRuntimeApp();
app.models.[ModelID].[MethodName]([Parameter1], [Parameter2], ...)
```

### Data Operation Capabilities {#data-operation-capabilities}
Data model functions empower pages with robust data operation capabilities, enabling complex data processing tasks through simple, unified syntax. To learn how to create and configure data models, please refer to: [Data Table Model](../data-modeling/data-table-model.md)

## Related Documentation {#related-documentation}

- [Calling Service Functions in Pages](./calling-service-functions-in-pages) - Learn about service function calling methods, with syntax fully consistent with data model functions.
