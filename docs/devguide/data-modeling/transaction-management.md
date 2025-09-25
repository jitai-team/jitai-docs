---
sidebar_position: 14
slug: transaction-management
---

# Transaction Management
In business applications, we often need to bundle a group of read and write operations into an atomic unit that either "succeeds completely or fails completely" - this is the essence of transactions. JitORM provides a unified abstraction for database access, relying on the transaction capabilities of the connected database at its foundation.

## Default Transaction Management Mechanism {#default-transaction-management-mechanism}
The default transaction isolation level is Repeatable Read (RR), and the platform executes at RR level when initiating transactions.

Within the context of a single request, as long as the code uses the database, the platform will borrow a connection from the connection pool, enter a transaction context, and handle all database operations for this request. When the request completes normally, the transaction will be committed uniformly. If an exception is thrown during the process, it will be rolled back entirely in the request completion callback to ensure data consistency.

Simply put: one request corresponds to one "default transaction", with the platform automatically borrowing and returning connections and committing or rolling back at the end of the request. Unless developers explicitly start a new transaction (using the [Transaction Decorator](transaction-management#transaction-decorator)), all writes within this request will belong to this single default transaction.

## Manual Transaction Commit/Rollback {#manual-transaction-commit-rollback}
By default, the platform will uniformly commit or rollback the "default transaction" within the request when it ends. If necessary, developers can also "manually end the transaction" in the middle of a request.

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

This operation will commit or rollback the specified database element transaction in the current request context.

## Transaction Decorator {#transaction-decorator}
If developers want to forcefully start a "brand new" independent transaction outside of the existing request transaction (i.e., Requires-New semantics), they can use transaction decorators or context managers. This will acquire a new connection from the connection pool for this code block, independently start a transaction, and automatically commit when exiting the decorator/with block. It will rollback if an exception is thrown. This allows critical write operations to be isolated from the outer transaction, avoiding being affected by outer rollbacks, or ensuring that this logic is atomically persisted to the database.

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

The core flow of the decorator can be summarized as: start a new transaction upon entry, commit or rollback based on whether there are exceptions upon exit, end this transaction and return the connection.

