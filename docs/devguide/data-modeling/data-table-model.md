---
sidebar_position: 3
slug: data-table-model
---

# Creating Data Tables {#data-table-model}
Data table models are the data foundation of JitAi applications. Each data table model corresponds to a table in the database, used to define the structure, types, and constraint rules of business data. In JitAi, you can create data table models in two ways: first, create a brand new data table model, suitable for designing business data structures from scratch; second, quickly generate models based on existing database tables, convenient for managing and extending existing data tables.

## Data Table Creation Entry {#data-table-create-entry}
![Model Creation Configuration](./img/model-creation-configuration.png)

In the element tree of the development area, find `Data Models`, click the `+` button on the right side, select `Data Table`, and the `Create New Model` dialog will pop up.

![Create New Data Model](./img/create-data-model.png)

Developers fill in the model name in the `Create New Model` dialog, select `Create New Data Table Model` as the creation method. The database and data table names will be automatically generated, or you can select existing database elements and edit the database table name.

:::tip 
For creating models based on existing tables, refer to [Creating Data Table Elements from Existing Tables](./create-data-table-from-existing-tables.md)
:::
 

## Designing Table Fields and Data Types {#design-table-fields-and-data-types}
JitAi applications have various data types such as `Single Line Text`, `Multi-line Text`, `Rich Text`, `Number`, `Amount`, etc., which can be used as database table fields.

![Field Configuration](./img/field-configuration.png)

When creating data tables, appropriate field types should be selected based on specific business requirements.

Each data type has its own configuration options. Taking **Single Line Text** as an example:

![Single Line Text Configuration](./img/single-line-text-configuration.png)
The single-line text data type is widely used and is one of the most basic and commonly used field types in data modeling. Its main characteristics include: supporting only single-line text content without line breaks, automatically generating field names (such as `f5f6`) for convenient database operations, and storing a maximum of 255 characters by default. This field type supports various personalized settings and constraint conditions, allowing you to set placeholder text, limit maximum text length, ensure field value uniqueness through uniqueness control, and support creating database indexes to optimize query performance. In addition, single-line text fields also support setting calculation formulas for dynamic calculations and preset default values, meeting flexible requirements in different business scenarios.

Single-line text fields are suitable for storing the following types of data: names, usernames, titles, brief descriptions, and other short text information that does not require line breaks.

## Configuring Table Indexes for Query Optimization {#configure-table-index-optimization}
In advanced configuration, you can add `Multi-column Composite Unique` and `Composite Index` to data tables to optimize query performance and ensure data integrity.

![Composite Index](./img/joint-index.png)
### Multi-column Composite Unique {#multi-column-composite-unique}
Create composite unique constraints by selecting multiple fields to ensure that the combined values of these fields are unique throughout the table. For example, you can set the `Product Name` and `Specification` fields as composite unique to prevent duplicate products with the same specifications.

### Composite Index {#composite-index}
Create composite indexes by selecting multiple fields. Filtering based on these fields simultaneously can significantly improve query performance.

:::warning Warning
Proper index configuration can effectively improve query speed, but too many indexes will affect data write performance. Balance is needed according to actual business scenarios.
:::

## Source Code Mode {#source-code-mode}
In addition to visual configuration, it also supports directly modifying model source code in code mode, providing greater flexibility for advanced developers.

![View Source Code](./img/view-source-code.png)

Switching to source code mode, you can see the entire model's source code including model definitions, model functions, etc.
