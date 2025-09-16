---
sidebar_position: 3
slug: devops-management-tool
title: DevOps Management Tool
---

# DevOps Management Tool

Every JitNode has a built-in DevOps management tool (AdminApp) that provides developers with comprehensive management capabilities from project initiation to deployment and operations. The DevOps management tool itself is a JitAi application running on JitNodes, demonstrating the platform's "bootstrapping" capability—using its own tools to manage itself.

AdminApp adopts a dual-console architecture, providing both a local node console and an organization management console, targeting single-node application management and enterprise-level cluster management needs respectively. When developers access the node entry address, they will automatically be redirected to the node console.

The [Create and Publish App](../create-and-publish-app/creating-and-deploying-applications) section will provide detailed instructions on AdminApp functionality usage. Here we provide a high-level overview of AdminApp's capabilities.

## Dual Console Architecture {#dual-console-architecture}

### Local Node Console {#local-node-console}
Focuses on application lifecycle management for the current node and is the management interface developers interact with most frequently. It provides complete functionality within a single node scope, including application creation, development, testing, and publishing, suitable for individual developers and small teams.

### Organization Management Console {#organization-management-console}
Designed for enterprise-level multi-node cluster management, providing advanced features such as runtime environment management, node cluster management, and resource scheduling. It supports creating runtime environments across different dimensions (development/testing/production, business modules, customers, etc.) to implement complex enterprise-level deployment architectures.

## Core Capabilities Overview {#core-capabilities-overview}

### Application Lifecycle Management {#application-lifecycle-management}
Supports rapid creation of new applications and template-based inheritance and copy development modes, enabling developers to quickly build new applications based on existing achievements.

### Runtime Environment Management {#runtime-environment-management}
Manages virtualized runtime environments, supporting environment creation across different dimensions. Each environment can be configured with multiple entry addresses, achieving complete isolation between applications and flexible access control.

### Node Cluster Management {#node-cluster-management}
Supports unified management of multi-node clusters, providing cluster functionality such as node status monitoring, load balancing, and request forwarding. The many-to-many flexible relationship between nodes and runtime environments meets complex enterprise-level deployment requirements.

### Flexible Configuration Management {#flexible-configuration-management}
Provides configuration management capabilities for infrastructure such as databases, caches, and file storage, while offering application environment variable management functionality to ensure the security of sensitive configuration information in developer applications.

### Version Release and Deployment {#version-release-and-deployment}
Features complete version release capabilities, supporting semantic version management, automatic update strategy configuration, and update log management. Supports both development mode and production mode deployment, providing flexible deployment strategies and weight configuration.

### Multi-platform Export {#multi-platform-export}
Supports exporting applications to various formats, including source code packages and WeChat Mini Program projects, meeting deployment needs across different platforms.

### Application Template Ecosystem {#application-template-ecosystem}
Provides application template management and sharing capabilities, allowing developers to browse and use publicly available or organization-internal application templates, with support for version updates and application migration.
