---
sidebar_position: 13
slug: supported-database-vendors
---

# 支持的数据库厂商
JitAi为多个数据库厂商提供了统一的连接管理与访问接口，支持在同一应用内对接多个不同数据库类型的实例。

下列数据库均已在平台内置支持：

- SQLite
- MySQL
- PostgreSQL
- Oracle
- SQL Server SQL Server）
- 达梦（DM8）

## 场景选择建议 {#scenario-selection-suggestions}
- 开发/桌面环境：默认选择 SQLite（零运维、文件级存储）。
- 通用 OLTP 业务：MySQL 或 PostgreSQL（社区与云托管方案齐全，生态成熟）。
- 既有存量系统：Oracle 或 SQL Server（与存量库集成、渐进迁移）。
- 国产化/信创：达梦（DM8）优先；
- 其它数据库可自定义元素类型接入，参考： [扩展自己的元素族类](../../extguide/extend-element-family-classes) | [扩展自己的数据库Type元素](../../extguide/extend-database-type-elements)。

## 与云厂商的兼容性说明 {#cloud-vendor-compatibility}
平台采用标准驱动方式连接数据库，常见云数据库产品均可直接接入：
- 阿里云 RDS / PolarDB
- 腾讯云 TencentDB
- 华为云 RDS
- AWS RDS

## 数据库元素使用 {#database-element-usage}
- 参考：[管理数据库连接](./manage-database-connections)
