---
sidebar_position: 1
slug: database
---

# 数据库
## 简介
JitAi官方提供了多种数据库Type元素，支持统一的数据库访问接口和连接管理功能，已支持的数据库类型以及对应的Type元素fullName如下：
- **SQLite**: databases.SqliteType
- **MySQL**: databases.MySQLType
- **PostgreSQL**: databases.PgSqlType
- **Oracle**: databases.OracleType
- **Microsoft SQL Server**: databases.SqlServerType
- **达梦**: databases.DmdbType

开发者可以在JitAi开发工具中使用可视化界面创建和配置数据库实例元素，也可以使用全代码方式。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的databases.xxxType元素，以实现自己的封装。

## 元素目录构成
所有数据库实例元素的目录都是由元素定义文件和配置文件构成。

- `e.json`：元素定义文件，用于定义元素的标题、所属type等。
- `[元素名称].json`：配置文件，用于配置数据库的连接信息等，文件名称与元素名称一致。例如：元素fullName='databases.SQLiteDB'，则文件名称为'SQLiteDB.json'。

### SQLite
假设在应用根目录下创建一个名为`SQLiteDB`的SQLite数据库实例元素，其相对路径为`databases/SQLiteDB`，则fullName为`databases.SQLiteDB`，其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "backendBundleEntry": ".",
    "type": "databases.SqliteType",
    "variables": []
}
```

```json title="SQLiteDB.json"
{
    "dbType": "sqlite",
    "dbAlias": "Default",
    "dbConfig": {
        "database": "appData/database/Default/sqlite.db"
    }
}
```

### MySQL
假设在应用根目录下创建一个名为`MySQLDB`的MySQL数据库实例元素，其相对路径为`databases/MySQLDB`，则fullName为`databases.MySQLDB`，其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "backendBundleEntry": ".",
    "type": "databases.MySQLType",
    "variables": []
}
```

```json title="MySQLDB.json"
{
	"dbType": "mysql",
	"dbAlias": "Mysql",
	"dbConfig": {
		"database": "test",
		"host": "127.0.0.1",
		"password": "xxx",
		"port": "3306",
		"user": "root"
	}
}
```

### PostgreSQL
假设在应用根目录下创建一个名为`PostgreSQLDB`的PostgreSQL数据库实例元素，其相对路径为`databases/PostgreSQLDB`，则fullName为`databases.PostgreSQLDB`，其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "backendBundleEntry": ".",
    "type": "databases.PgSqlType",
    "variables": []
}
```

```json title="PostgreSQLDB.json"
{
    "dbname": "myapp_test",
    "host": "127.0.0.1",
    "password": "xxx",
    "port": 5432,
    "user": "root"
}
```

### Oracle
假设在应用根目录下创建一个名为`OracleDB`的Oracle数据库实例元素，其相对路径为`databases/OracleDB`，则fullName为`databases.OracleDB`，其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "type": "databases.OracleType",
    "backendBundleEntry": ".",
    "variables": []
}
```

```json title="OracleDB.json"
{
    "service_name": "pdb01",
    "host": "127.0.0.1",
    "password": "xxx",
    "port": 1525,
    "user": "jit01"
}
```

### Microsoft SQL Server
假设在应用根目录下创建一个名为`SqlServerDB`的Microsoft SQL Server数据库实例元素，其相对路径为`databases/SqlServerDB`，则其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "type": "databases.SqlServerType",
    "backendBundleEntry": ".",
    "variables": []
}
```

```json title="SqlServerDB.json"
{
    "database": "myapp_test",
    "host": "127.0.0.1",
    "password": "xxx",
    "port": 1433,
    "user": "sa"
}
```

### 达梦
假设在应用根目录下创建一个名为`DmdbDB`的达梦数据库实例元素，其相对路径为`databases/DmdbDB`，则fullName为`databases.DmdbDB`，其目录结构如下：

```json title="e.json"
{
    "title": "默认数据库",
    "type": "databases.DmdbType",
    "backendBundleEntry": ".",
    "variables": []
}

```

```json title="DmdbDB.json"
{
    "schema": "element_test_app",
    "host": "127.0.0.1",
    "password": "xxx",
    "port": 30236,
    "user": "SYSDBA"
}
```

