---
sidebar_position: -1
description: "JitAi framework extension guide. Learn to extend element families, create custom components, and build specialized functionality for your business needs."
---
# Extending Guide Index

**Why do we need framework extensions?**

JitAi provides a rich set of official development frameworks, but in real business scenarios, you may encounter:
- Industry-specific requirements not yet covered by the official framework
- Existing component functionality that's close but needs customization
- Internal enterprise standards requiring unified custom component libraries

Framework extensions are designed to solve these problems, enabling you to build solutions that meet specific requirements on top of the JitAi ecosystem.

## Must understand JAAP first {#must-understand-jaap-first}

Before extending the JitAi development framework, developers must have a thorough understanding of the JAAP (JitAi AI Application Protocol) specifications, particularly the concepts of Meta, Type, and Instance elements and their relationships. If you intend to override or rewrite the official framework, you'll also need to understand the principles of inheritance and overriding.

[Click here to learn JAAP](/docs/reference/runtime-platform/JAAP)

## Problem-oriented guide {#problem-oriented-guide}

| What You Want to Achieve | Related Documentation |
|-------------|----------|
| Add a custom chart component that's not available in JitAi | [Extend Your Own UI Component Type Elements](/docs/extguide/add-frontend-components) |
| Make my custom components configurable through drag-and-drop interface | [Developing Visual Editors for UI Component Type Elements](/docs/extguide/develop-frontend-component-visual-editor) |
| Integrate third-party services like Slack bots or IoT devices | [Extend Your Own Element Families](/docs/extguide/extend-element-family-classes) |
| Create user-friendly configuration panels for my backend integrations | [Developing Visual Editors for Backend Type Elements](/docs/extguide/develop-backend-element-visual-editor) |
| Build custom page templates with specific layouts and behaviors | [Extend Your Own Page Type and Editor](/docs/extguide/extend-page-type-editor) |
| Connect to proprietary databases or data sources | [Extend Your Own Database Type Elements](/docs/extguide/extend-database-type-elements) |
| Work with custom data formats or business objects | [Extend Your Own Data Model Type Elements](/docs/extguide/extend-data-model-type-elements) |
| Integrate specialized AI models or custom LLM workflows | [Extend Your Own AI Agent Type Elements](/docs/extguide/extend-ai-agent-type-elements) |
| Create domain-specific AI assistants for your business | [Extend Your Own AI Assistant Type Elements](/docs/extguide/extend-ai-assistant-type-elements) |
| Add support for regional payment gateways or custom billing | [Extend Your Own Payment Type Elements](/docs/extguide/extend-payment-type-elements) |

## Extension types {#extension-types}

### New extensions {#new-extensions}
Create entirely new Type elements and their visual editors, suitable for functionality completely absent from the official framework.

### Inheritance extensions {#inheritance-extensions}
Extend and modify existing Type elements while maintaining API compatibility (Liskov Substitution Principle).

**Implementation approaches:**
- **Complete rewrite**: Reimplement all logic while maintaining consistent external interfaces
- **Incremental modification**: Make local adjustments based on existing logic while maintaining interface consistency

## Community support {#community-support}
- For issues encountered during extension development, get help through the [community forum](https://forum.jit.pro)
- Excellent extension implementations are welcome to be shared with the community for other developers to learn
- Extensions with universal value have the opportunity to be integrated into the official framework
