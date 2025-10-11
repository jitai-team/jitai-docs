---
sidebar_position: 14
slug: transaction-management
---

# Transaction Management
In business applications, we often need to group read and write operations into an atomic unit that either succeeds completely or fails completely—this is the essence of transactions. JitORM provides a unified abstraction for database access, leveraging the underlying transaction capabilities of the connected database.

## Default transaction management mechanism {#default-transaction-management-mechanism}
The default transaction isolation level is Repeatable Read (RR). The platform executes all transactions at the RR level.

Within a single request, whenever the code accesses the database, the platform acquires a connection from the connection pool and establishes a transaction context to handle all database operations for that request. When the request completes successfully, the transaction is committed. If an exception occurs, the transaction is rolled back completely in the request completion callback to ensure data consistency.

In simple terms: each request corresponds to one "default transaction." The platform automatically manages connection acquisition and release, committing or rolling back the transaction at the end of the request. Unless developers explicitly start a new transaction (using the [transaction decorator](#transaction-decorator)), all writes within the request belong to this single default transaction.

## Manual transaction commit/rollback {#manual-transaction-commit-rollback}
By default, the platform commits or rolls back the default transaction when the request ends. If needed, developers can manually end the transaction in the middle of a request.

```python
# Typical usage of manual transactions
fullName = "Database element fullName" # e.g., databases.Default
db = app.getElement(fullName)
try:
    db.commit()
except Exception:
    db.rollback()
    raise
```

This operation commits or rolls back the transaction for the specified database element in the current request context.

## Transaction decorator {#transaction-decorator}
If developers need to start a completely independent transaction outside the existing request transaction (i.e., Requires-New semantics), they can use transaction decorators or context managers. This acquires a new connection from the pool for the code block, starts an independent transaction, and automatically commits when exiting the decorator/with block. If an exception is thrown, the transaction is rolled back. This isolates critical write operations from the outer transaction, preventing them from being affected by outer rollbacks and ensuring the logic is atomically persisted to the database.

Usage 1 - Decorator:

```python
from databases.Meta import RequiresNewTransaction

@RequiresNewTransaction
def settle_order(order_id: int):
    # Execute business writes in an independent new transaction
    ...
```

Usage 2 - Context Manager:

```python
from databases.Meta import RequiresNewTransaction

with RequiresNewTransaction():
    # Writes here are performed in a brand new transaction
    ...
```

The core flow of the decorator can be summarized as follows: start a new transaction on entry, commit or roll back based on whether exceptions occur on exit, then end the transaction and return the connection to the pool.

