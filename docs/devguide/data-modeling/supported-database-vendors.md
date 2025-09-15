---
sidebar_position: 2
slug: supported-database-vendors
---

# Supported Database Vendors
极态云内置多种关系型数据库适配，提供统一的连接管理与访问接口，支持在同一应用内对接多个数据库实例

下列数据库均已在平台内置支持：

- SQLite
- MySQL
- PostgreSQL
- Oracle
- Sqlserver（Microsoft SQL Server）
- 达梦（DM）

## 场景选择建议 {#scenario-selection-suggestions}
- 开发/桌面环境：默认选择 SQLite（零运维、文件级存储）。
- 通用 OLTP 业务：MySQL 或 PostgreSQL（社区与云托管方案齐全，生态成熟）。
- 既有存量系统：Oracle 或 SQL Server（与存量库集成、渐进迁移）。
- 国产化/信创：达梦（DM）优先；
- 其它数据库可自定义元素类型接入，参考： [新增后端Type元素](../../extguide/backend/add-backend-type-elements) | [开发后端元素可视化编辑器](../../extguide/backend/develop-backend-element-visual-editor)。

## 与云厂商的兼容性说明 {#cloud-vendor-compatibility}
平台采用标准驱动方式连接数据库，常见云数据库产品（示例）均可直接以“自建实例”的方式接入：

- 阿里云 RDS / PolarDB（MySQL / PostgreSQL / SQL Server 兼容）
- 腾讯云 TencentDB（MySQL / PostgreSQL / SQL Server）
- 华为云 RDS（MySQL / PostgreSQL / SQL Server）

## 数据库元素使用 {#database-element-usage}
- 参考：[管理数据库连接](./manage-database-connections)
