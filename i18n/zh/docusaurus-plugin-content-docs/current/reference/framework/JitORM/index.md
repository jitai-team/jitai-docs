---
sidebar_position: 0
---

# JitORM概述
JitORM（JitAi Object-Relational Mapping）是以[数据库元素](/docs/reference/framework/JitORM/database)、[数据类型元素](/docs/reference/framework/JitORM/data-types)、[模型元素](/docs/reference/framework/JitORM/data-models)为核心组成的对象关系映射框架，同时还提供了辅助数据查询以及操作的[Q表达式](/docs/reference/framework/JitORM/q-expressions)、[TQL](/docs/reference/framework/JitORM/TQL)。

## 数据库
数据库元素封装了数据库对接的大量技术实现，自动管理数据库连接，支持下列多种数据库：
- SQLite
- MySQL
- 达梦
- Oracle
- Microsoft SQLServer
- PostgreSQL

JitAi支持一个应用中创建多个数据库元素实例，用于和多个数据库实例对接。

## 数据类型
JitAi提供多种数据类型，用于定义业务实体对象的字段类型，每种数据类型都封装了对应的业务功能和UI渲染逻辑。

- **基础字段类型**：单行文本、多行文本、数字、金额、百分比、富文本、编号、流水号
- **选择器类型**：选项组单选/多选、下拉选择、检查框、日期时间
- **附件类型**：文件、图片、手写签名
- **组织架构类型**：部门单选/多选、成员单选/多选
- **特殊字段类型**：地址、身份证号、车牌号、电话号码、定位、超链接、子表
- **数据容器类型**：字典、列表、映射、单行数据、多行数据（不可用于模型字段）
- **关联数据类型**：关联数据、筛选条件

## 模型
模型即业务实体对象，且数据模型内置了业务层常用的数据操作接口。

### 普通数据模型
最常见的数据模型，每个实例都对应指定数据库中的一张表。对模型字段的变更会自动同步到数据库中，开发人员无需手动维护数据库表。

### 聚合表模型
聚合表用于多数据模型关联的复杂数据分析场景，支持分组汇总、追加合并、横向连接，且三者可以嵌套组合。

### 扩展表模型
扩展表是将一个`普通数据模型`作为基础模型，通过字段关联规则链式地关联(LEFT JOIN)若干个其它数据模型，并对被关联模型的字段进行聚合统计(SUM、COUNT、MAX等)。

### 数据对象模型（无表模型）
当前仅支持全代码方式使用，可类比为DTO（Data Transfer Object），完全由开发者按需定义，并在业务逻辑流转中使用，不与数据库关联。
