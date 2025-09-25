---
sidebar_position: 13
slug: supported-database-vendors
---

# Supported Database Vendors
JitAi provides unified connection management and access interfaces for multiple database vendors, supporting connections to multiple different database type instances within the same application.

The following databases are all natively supported by the platform:

- SQLite
- MySQL
- PostgreSQL
- Oracle
- SQL Server (Microsoft SQL Server)
- DM (DM8)

## Scenario Selection Recommendations {#scenario-selection-suggestions}
- Development/Desktop Environment: Default to SQLite (zero maintenance, file-level storage).
- General OLTP Business: MySQL or PostgreSQL (comprehensive community and cloud hosting solutions, mature ecosystem).
- Existing Legacy Systems: Oracle or SQL Server (integration with legacy databases, progressive migration).
- Chinese-created: DM (DM8).
- Other databases can be integrated through custom element types, refer to: [Extend Your Own Element Families](../../extguide/extend-element-family-classes) | [Extend Your Own Database Type Elements](../../extguide/extend-database-type-elements).

## Cloud Vendor Compatibility {#cloud-vendor-compatibility}
The platform uses standard drivers to connect to databases, and common cloud database products can be directly integrated:
- Alibaba Cloud RDS / PolarDB
- Tencent Cloud TencentDB
- Huawei Cloud RDS
- AWS RDS

## Database Element Usage {#database-element-usage}
- Reference: [Managing Database Connections](./manage-database-connections)
