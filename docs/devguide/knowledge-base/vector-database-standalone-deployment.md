---
sidebar_position: 5
slug: vector-database-standalone-deployment
---

# Vector Database Standalone Deployment

In production environments and enterprise applications, **standalone deployment of vector databases** is a key strategy to ensure performance, stability, and scalability. Standalone deployment separates vector databases from application services to run as dedicated data services, providing stronger concurrent processing capabilities, better resource isolation, and more flexible operational management.

Vector databases are the underlying storage engines for [AI Knowledge Base](./create-knowledge-elements) elements, responsible for converting document content into vector data for storage and retrieval. Through standalone deployment, unified vector storage services can be provided for multiple knowledge base applications, achieving resource sharing and centralized management, while supporting horizontal scaling to handle large-scale data and high-concurrency access requirements.

![Vector Database Creation](./img/vector-database-creation.png)

:::tip
Vector databases use `cosine similarity` as the default distance metric algorithm, which is particularly suitable for text semantic similarity computation.
:::

## Standalone Deployment Solution: Chroma Vector Database {#chroma-standalone-deployment}

Chroma is the vector database solution recommended by the JitAi platform, supporting standalone service deployment with characteristics of being lightweight, high-performance, and easy to maintain. Standalone deployed Chroma databases can provide unified vector storage services for multiple JitAi application instances, achieving enterprise-level data management and service governance.

### Advantages of Standalone Deployment {#advantages-of-standalone-deployment}

- **Performance Isolation**: Independent computing and storage resources, avoiding competition with application services for system resources
- **Horizontal Scaling**: Supports cluster deployment, easily handling large-scale data and high-concurrency access
- **Data Security**: Independent network configuration and access control, providing stronger security guarantees
- **Operational Convenience**: Unified data backup, monitoring, and maintenance strategies

### Chroma Standalone Deployment Installation {#chroma-installation}

Official documentation provides multiple deployment methods, choose according to actual requirements:

- **Docker Deployment**: [Chroma Docker Official Documentation](https://docs.trychroma.com/deployment/docker)
- **Cloud Service Deployment**: [Chroma Cloud Service Deployment Guide](https://docs.trychroma.com/deployment/aws)

### Connecting to Standalone Chroma Database {#connect-to-standalone-chroma}

Connect to standalone deployed Chroma vector database in JitAi platform:

![Remote](./img/remote.png)

Configuration parameter descriptions:
- **Name**: Identifier name for the vector database element
- **Database Address**: IP or domain name of the standalone deployed Chroma server
- **Port**: Chroma service listening port (default 8000)
- **Timeout**: Connection and query timeout settings
- **Authentication Token**: Access token required if authentication mechanism is enabled

## Development Testing Environment: Local Configuration {#local-development-config}

For development testing scenarios, JitAi supports localized vector database configuration, requiring no standalone deployment of external services, ready to use out of the box:

![Localization](./img/localization.png)

Local configuration uses built-in storage methods, with data directly saved in the JitAi platform's local environment. Simply input "Name" and select "Persistence Mode" to quickly create a local vector database, suitable for prototype development and feature verification.

:::tip
Production environments recommend using standalone deployment solutions for better performance, reliability, and maintainability.
:::

## Vector Database Programming Interface {#vector-database-programming-interface}
### health_check {#health_check}
Check the connection status and operational health of the vector database, returning basic database information. [API Documentation](../../reference/framework/JitAi/vector-database#health_check)

### create_collection {#create_collection}
Create new collections in the vector database for storing and managing related vector data. [API Documentation](../../reference/framework/JitAi/vector-database#create_collection)

### add_vectors {#add_vectors}
Store vector data and its metadata to specified collections. [API Documentation](../../reference/framework/JitAi/vector-database#add_vectors)

### query_vectors {#query_vectors}
Search for the most similar vector data in collections based on query vectors. [API Documentation](../../reference/framework/JitAi/vector-database#query_vectors)
