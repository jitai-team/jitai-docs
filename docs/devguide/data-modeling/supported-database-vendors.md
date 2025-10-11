---
sidebar_position: 13
slug: supported-database-vendors
---

# Supported Database Vendors

JitAi provides unified connection management and access interfaces for multiple database vendors, enabling you to connect to different database types within the same application.

The platform natively supports the following databases:

- SQLite
- MySQL
- PostgreSQL
- Oracle
- SQL Server (Microsoft SQL Server)
- DM (DM8)

## Scenario selection recommendations {#scenario-selection-recommendations}

- **Development/Desktop environment**: SQLite is the default choice, offering zero maintenance and file-level storage.
- **General OLTP workloads**: MySQL or PostgreSQL provide comprehensive community support, cloud hosting options, and mature ecosystems.
- **Legacy system integration**: Oracle or SQL Server are ideal for integrating with existing databases and supporting gradual migration.
- **Domestic compliance requirements**: DM (DM8) is prioritized for indigenous and trusted computing initiatives.
- **Other databases**: Custom element types can be created to integrate additional databases. See [Extending element family classes](../../extguide/extend-element-family-classes) and [Extending database type elements](../../extguide/extend-database-type-elements).

## Cloud vendor compatibility {#cloud-vendor-compatibility}

The platform uses standard database drivers, allowing direct integration with common cloud database services:

- Alibaba Cloud RDS / PolarDB
- Tencent Cloud TencentDB
- Huawei Cloud RDS
- AWS RDS

## Database element usage {#database-element-usage}

For information on creating and managing database connections, see [Managing database connections](./manage-database-connections).
