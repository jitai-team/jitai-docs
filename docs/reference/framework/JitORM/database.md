---
sidebar_position: 1
slug: database
---

# Database
## Introduction
JitAi officially provides multiple database Type elements, supporting unified database access interfaces and connection management functionality. The supported database types and their corresponding Type element fullNames are as follows:
- **SQLite**: databases.SqliteType
- **MySQL**: databases.MySQLType
- **PostgreSQL**: databases.PgSqlType
- **Oracle**: databases.OracleType
- **Microsoft SQL Server**: databases.SqlServerType
- **DM (Dameng)**: databases.DmdbType

Developers can use the visual interface in JitAi development tools to create and configure database instance elements, or use full-code approach.

Of course, developers can also create their own Type elements or modify the official `databases.xxxType` elements provided by JitAi in their own App to implement their own encapsulation.

## Element Directory Structure
All database instance element directories are composed of element definition files and configuration files.

- `e.json`: Element definition file, used to define element title, type, etc.
- `[Element Name].json`: Configuration file, used to configure database connection information, etc. The file name matches the element name. For example: if element fullName='databases.SQLiteDB', then the file name is 'SQLiteDB.json'.

### SQLite
Assuming creating a SQLite database instance element named `SQLiteDB` under the application root directory, with relative path `databases/SQLiteDB`, then fullName is `databases.SQLiteDB`, and its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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
Assuming creating a MySQL database instance element named `MySQLDB` under the application root directory, with relative path `databases/MySQLDB`, then fullName is `databases.MySQLDB`, and its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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
Assuming creating a PostgreSQL database instance element named `PostgreSQLDB` under the application root directory, with relative path `databases/PostgreSQLDB`, then fullName is `databases.PostgreSQLDB`, and its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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
Assuming creating an Oracle database instance element named `OracleDB` under the application root directory, with relative path `databases/OracleDB`, then fullName is `databases.OracleDB`, and its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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
Assuming creating a Microsoft SQL Server database instance element named `SqlServerDB` under the application root directory, with relative path `databases/SqlServerDB`, then its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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

### DM (Dameng)
Assuming creating a DM database instance element named `DmdbDB` under the application root directory, with relative path `databases/DmdbDB`, then fullName is `databases.DmdbDB`, and its directory structure is as follows:

```json title="e.json"
{
    "title": "Default Database",
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