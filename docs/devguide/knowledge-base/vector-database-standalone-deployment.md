---
sidebar_position: 5
slug: vector-database-standalone-deployment
description: "Deploy vector database for knowledge bases. Standalone vector store deployment for production-scale document retrieval."
---

# Deploying Vector Databases as Standalone Services

In production and enterprise environments, **deploying vector databases as standalone services** is essential for ensuring optimal performance, stability, and scalability. Standalone deployment decouples vector databases from application services, allowing them to operate as dedicated data services with enhanced concurrent processing capabilities, superior resource isolation, and more flexible operational management.

Vector databases serve as the underlying storage engine for [AI Knowledge Base](./create-knowledge-elements) elements, converting document content into vector data for efficient storage and retrieval. Standalone deployment enables you to provide unified vector storage services across multiple knowledge base applications, facilitating resource sharing and centralized management while supporting horizontal scaling to meet large-scale data and high-concurrency access demands.

![Vector Database Creation](./img/vector-database-creation.png)

:::tip
Vector databases use `cosine similarity` as the default distance metric algorithm, which is particularly suitable for text semantic similarity computation.
:::

## Standalone deployment solution: Chroma vector database {#chroma-standalone-deployment}

Chroma is the recommended vector database solution for the JitAi platform, offering standalone service deployment with a lightweight footprint, high performance, and easy maintenance. A standalone Chroma deployment provides unified vector storage services across multiple JitAi application instances, enabling enterprise-grade data management and service governance.

### Advantages of standalone deployment {#advantages-of-standalone-deployment}

- **Performance isolation**: Dedicated computing and storage resources prevent resource contention with application services
- **Horizontal scaling**: Cluster deployment support enables seamless handling of large-scale data and high-concurrency access
- **Data security**: Independent network configuration and access control deliver enhanced security guarantees
- **Operational convenience**: Centralized data backup, monitoring, and maintenance strategies simplify operations

### Installing Chroma for standalone deployment {#chroma-installation}

The official documentation offers multiple deployment methods to suit your specific requirements:

- **Docker deployment**: [Chroma Docker Official Documentation](https://docs.trychroma.com/deployment/docker)
- **Cloud service deployment**: [Chroma Cloud Service Deployment Guide](https://docs.trychroma.com/deployment/aws)

### Connecting to a standalone Chroma database {#connect-to-standalone-chroma}

To connect to a standalone Chroma vector database in the JitAi platform:

![Remote](./img/remote.png)

Configuration parameters:
- **Name**: Identifier for the vector database element
- **Database address**: IP address or domain name of the standalone Chroma server
- **Port**: Chroma service listening port (default: 8000)
- **Timeout**: Connection and query timeout duration
- **Authentication token**: Access token (required if authentication is enabled)

## Local configuration for development and testing {#local-development-config}

For development and testing scenarios, JitAi supports local vector database configuration without requiring standalone deployment of external services—ready to use out of the box:

![Localization](./img/localization.png)

Local configuration leverages built-in storage, with data saved directly in the JitAi platform's local environment. Simply provide a name and select a persistence mode to quickly create a local vector database, ideal for prototyping and feature validation.

:::tip
For production environments, we recommend using standalone deployment to achieve optimal performance, reliability, and maintainability.
:::

## Vector database programming interface {#vector-database-programming-interface}
### health_check {#health_check}
Checks the connection status and operational health of the vector database, returning basic database information. [API Documentation](../../reference/framework/JitAi/vector-database#health_check)

### create_collection {#create_collection}
Creates new collections in the vector database for storing and managing related vector data. [API Documentation](../../reference/framework/JitAi/vector-database#create_collection)

### add_vectors {#add_vectors}
Stores vector data and associated metadata in specified collections. [API Documentation](../../reference/framework/JitAi/vector-database#add_vectors)

### query_vectors {#query_vectors}
Searches for the most similar vector data in collections based on query vectors. [API Documentation](../../reference/framework/JitAi/vector-database#query_vectors)
