---
sidebar_position: -1
description: "Runtime Platform Overview Reference - API documentation for developers. Complete specifications, methods, and examples."
---
# Runtime Platform Overview
[**JAAP (JitAI Application Protocol)**](/docs/reference/runtime-platform/JAAP) abstracts the complexity of application development, enabling business experts to focus on orchestrating high-level business logic. To make JAAP truly effective, an environment that can understand and execute JAAP is needed—the application runtime container.

## JAAP Application Runtime Container
The application runtime container is the JitAI application runtime platform, built into the installation package and loaded when the JitNode starts. The JitAI application runtime platform is cross-platform, supporting operation on Windows, MacOS, and Linux operating systems.

We can understand the JAAP application runtime container by comparing it to JVM and Docker:

| Analogy | Interpretation Object | Execution Result | JitAI Application Runtime Platform |
|---------|----------|----------|------------|
| **JVM** | Java bytecode | Cross-platform Java program execution | Interprets JAAP configuration, runs JitAI applications cross-platform |
| **Docker** | Dockerfile | Build and run containers | Interprets JAAP configuration, builds and runs applications |

## Feature Overview
### Cross-Platform Execution
Supports operation on Windows, MacOS, and Linux operating systems.

### Full-Stack Frontend and Backend Support
Supports development and debugging of full-stack frontend and backend elements, with automatic building, deployment, execution, and updates.

### Environment Virtualization
Runtime environment virtualization limited only by hardware resources, supporting the creation of any number of runtime environments.

### Platform API
The platform provides application developers with a set of system APIs that can be used in element logic to operate core objects such as applications, environments, and elements.
