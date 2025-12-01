---
sidebar_position: 3
slug: devops-management-tool
description: "DevOps management tool for application lifecycle. Manage development, testing, deployment, and operations in one platform."
title: DevOps Management Tool
---

# DevOps Management Tool

Every JitNode includes a built-in DevOps management tool (AdminApp) that delivers comprehensive management capabilities spanning the entire lifecycle from project inception to deployment and operations. The DevOps management tool is itself a JitAI application running on JitNodes, exemplifying the platform's bootstrapping capability—leveraging its own tools for self-management.

AdminApp employs a dual-console architecture, featuring both a local node console and an organization management console, designed to address single-node application management and enterprise-level cluster management requirements respectively. When developers access the node entry point, they are automatically redirected to the node console.

The [Creating and Publishing Applications](../creating-and-publishing-applications) section provides detailed instructions on AdminApp functionality usage. Here we present a high-level overview of AdminApp's core capabilities.

## Dual Console Architecture {#dual-console-architecture}

### Local node console {#local-node-console}
Focuses on application lifecycle management for the current node and serves as the primary management interface for developer interactions. It delivers comprehensive functionality within a single node scope, encompassing application creation, development, testing, and publishing—ideal for individual developers and small teams.

### Organization management console {#organization-management-console}
Engineered for enterprise-grade multi-node cluster management, offering advanced capabilities including runtime environment management, node cluster orchestration, and resource scheduling. It enables the creation of runtime environments across multiple dimensions (development/testing/production, business modules, customers, etc.) to support sophisticated enterprise deployment architectures.

## Core Capabilities Overview {#core-capabilities-overview}

### Application lifecycle management {#application-lifecycle-management}
Facilitates rapid creation of new applications through template-based inheritance and copy development modes, empowering developers to build upon existing achievements for accelerated application development.

### Runtime environment management {#runtime-environment-management}
Orchestrates virtualized runtime environments with support for multi-dimensional environment creation. Each environment supports multiple entry point configurations, ensuring complete application isolation and flexible access control mechanisms.

### Node cluster management {#node-cluster-management}
Enables unified management of multi-node clusters, delivering essential cluster capabilities including node health monitoring, load balancing, and intelligent request routing. The flexible many-to-many relationships between nodes and runtime environments accommodate complex enterprise deployment scenarios.

### Flexible configuration management {#flexible-configuration-management}
Delivers comprehensive configuration management for infrastructure components such as databases, caches, and file storage systems, while providing secure application environment variable management to protect sensitive configuration data in developer applications.

### Version release and deployment {#version-release-and-deployment}
Offers complete version release capabilities with semantic versioning support, automated update strategy configuration, and comprehensive update logging. Accommodates both development and production deployment modes with flexible deployment strategies and traffic weight configuration.

### Multi-platform export {#multi-platform-export}
Enables application export to multiple formats, including source code packages and WeChat Mini Program projects, addressing diverse platform deployment requirements.

### Application template ecosystem {#application-template-ecosystem}
Facilitates application template management and sharing, enabling developers to discover and utilize both publicly available and organization-specific application templates, with integrated support for version updates and seamless application migration.
