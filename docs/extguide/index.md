---
sidebar_position: -1
---
# Guide

**Why do we need framework extensions?**

JitAi provides a rich set of official development frameworks, but in real business scenarios, you may encounter:
- Industry-specific requirements not yet covered by the official framework
- Existing component functionality that's close but needs customization
- Internal enterprise standards requiring unified custom component libraries

Framework extensions are designed to solve these problems, enabling you to build solutions that meet specific requirements on top of the JitAi ecosystem.

## Must Understand JAAP First

The prerequisite for developers to extend the JitAi development framework is a deep understanding of the specifications in JAAP (JitAi AI Application Protocol), especially the concepts of Meta, Type, and Instance elements and the relationships between them. If you need to override and rewrite the official framework, you also need to understand the principles of inheritance and overriding.

[Click here to learn JAAP](../reference/runtime-platform/JAAP)

## Problem-Oriented Guide

| What You Want to Achieve | Related Documentation |
|-------------|----------|
| Add a custom chart component that's not available in JitAi | [Extend Your Own UI Component Type Elements](add-frontend-components) |
| Make my custom components configurable through drag-and-drop interface | [Develop Visual Editors for UI Component Type Elements](develop-frontend-component-visual-editor) |
| Integrate third-party services like Slack bots or IoT devices | [Extend Your Own Element Families](extend-element-family-classes) |
| Create user-friendly configuration panels for my backend integrations | [Develop Visual Editors for Backend Type Elements](develop-backend-element-visual-editor) |
| Build custom page templates with specific layouts and behaviors | [Extend Your Own Page Type and Editor](extend-page-type-editor) |
| Connect to proprietary databases or data sources | [Extend Your Own Database Type Elements](extend-database-type-elements) |
| Work with custom data formats or business objects | [Extend Your Own Data Model Type Elements](extend-data-model-type-elements) |
| Integrate specialized AI models or custom LLM workflows | [Extend Your Own AI Agent Type Elements](extend-ai-agent-type-elements) |
| Create domain-specific AI assistants for your business | [Extend Your Own AI Assistant Type Elements](extend-ai-assistant-type-elements) |
| Add support for regional payment gateways or custom billing | [Extend Your Own Payment Type Elements](extend-payment-type-elements) |

## Extension Types

### New Extensions
Create entirely new Type elements and their visual editors, suitable for functionality completely absent from the official framework.

### Inheritance Extensions
Extend and modify existing Type elements while maintaining API compatibility (Liskov Substitution Principle).

**Implementation approaches:**
- **Complete rewrite**: Reimplement all logic while maintaining consistent external interfaces
- **Incremental modification**: Make local adjustments based on existing logic while maintaining interface consistency

## Community Support
- For issues encountered during extension development, get help through the [community forum](https://forum.jit.pro/)
- Excellent extension implementations are welcome to be shared with the community for other developers to learn
- Extensions with universal value have the opportunity to be integrated into the official framework
