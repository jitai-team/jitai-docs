---
sidebar_position: 0
---

# JitORM Overview
JitORM (JitAi Object-Relational Mapping) is an object-relational mapping framework composed of [Database Elements](./database), [Data Type Elements](./data-types), and [Model Elements](./data-models) as core components, while also providing auxiliary data query and operation tools such as [Q Expressions](./q-expressions) and [TQL](./TQL).

## Database
Database elements encapsulate extensive technical implementations for database integration, automatically managing database connections, supporting the following multiple databases:
- SQLite
- MySQL
- DM (Dameng)
- Oracle
- Microsoft SQL Server
- PostgreSQL

JitAi supports creating multiple database element instances within one application for integration with multiple database instances.

## Data Types
JitAi provides various data types for defining field types of business entity objects, with each data type encapsulating corresponding business functionality and UI rendering logic.

- **Basic Field Types**: Single-line text, multi-line text, number, amount, percentage, rich text, number, serial number
- **Selector Types**: Option group single/multiple selection, dropdown selection, checkbox, date time
- **Attachment Types**: File, image, handwritten signature
- **Organization Types**: Department single/multiple selection, member single/multiple selection
- **Special Field Types**: Address, ID card number, license plate number, phone number, location, hyperlink, sub-table
- **Data Container Types**: Dictionary, list, mapping, single-row data, multi-row data (cannot be used for model fields)
- **Association Data Types**: Association data, filter conditions

## Models
Models are business entity objects, and data models have built-in data operation interfaces commonly used in the business layer.

### Regular Data Models
The most common data model, where each instance corresponds to a table in the specified database. Changes to model fields are automatically synchronized to the database, and developers don't need to manually maintain database tables.

### Aggregation Table Models
Aggregation tables are used for complex data analysis scenarios involving multiple data model associations, supporting group aggregation, append merge, horizontal join, and all three can be nested and combined.

### Extension Table Models
Extension tables use a `regular data model` as the base model, chain-associate (LEFT JOIN) several other data models through field association rules, and perform aggregation statistics (SUM, COUNT, MAX, etc.) on fields of the associated models.

### Data Object Models (Tableless Models)
Currently only supports full-code usage, can be compared to DTO (Data Transfer Object), completely defined by developers as needed, and used in business logic flow without database association.