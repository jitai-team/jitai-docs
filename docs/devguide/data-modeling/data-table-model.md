---
sidebar_position: 3
slug: data-table-model
---

# Data Table Model {#data-table-model}
Data table models serve as the data foundation for JitAi applications. Each data table model corresponds to a table in the database and is used to define the structure, types, and constraint rules of business data.
In JitAi, you can create data table models in two ways: first, by creating a completely new data table model, suitable for scenarios where business data structures need to be designed from scratch; second, by quickly generating models based on existing database tables, which is convenient for managing and extending existing data tables.

### Data Table Creation Entry Point {#data-table-create-entry}
![Model Creation Configuration](./img/model-creation-configuration.png)

In the element tree of the development area, locate `Data Models`, click the `+` on the right side, select `Data Table`, and complete the data table creation process to create a data model.

### Creating New Data Table Data Model {#create-new-data-table-model}
This is suitable for entirely new business requirements where data structures need to be designed from scratch. After creating a new model, the corresponding table will be automatically generated in the database.

![Create Data Model](./img/create-data-model.png)

Developers fill in the model name in the `New Model` dialog, select `Create New Data Table Data Model` as the creation method. The database and data table names will be automatically generated, or you can select an existing database element and edit the database table name.

:::tip 
For creating models based on existing tables, refer to [Creating Data Table Elements from Existing Database Tables](./create-data-table-from-existing-tables.md)
:::
 

## Designing Table Fields and Data Types {#design-table-fields-and-data-types}
JitAi applications provide various data types such as `Single-line Text`, `Multi-line Text`, `Rich Text`, `Number`, `Currency`, and others that can be used as database table fields.

![Field Configuration](./img/field-configuration.png)

When creating data tables, appropriate field types should be selected based on specific business requirements.

Each data type has its own configuration options. Taking **Single-line Text** as an example:

![Single-line Text Configuration](./img/single-line-text-configuration.png)
The single-line text data type is widely used and is one of the most fundamental and commonly used field types in data modeling. Its main characteristics include: supporting only single-line text content without line breaks, automatic system generation of field names (such as `f5f6`) for convenient database operations, and a default maximum storage capacity of 255 characters. This field type supports various personalized settings and constraint conditions, including setting placeholder text, limiting maximum text length, ensuring field value uniqueness through uniqueness control, and supporting database index creation to optimize query performance. Additionally, single-line text fields support advanced features such as setting calculation formulas for dynamic computation and presetting default values, meeting flexible requirements across different business scenarios.

Single-line text fields are suitable for storing the following types of data: names, usernames, titles, brief descriptions, and other short text information that doesn't require line breaks.

## Configuring Table Indexes for Query Optimization {#configure-table-index-optimization}
In advanced configuration, you can add `Multi-column Composite Unique` constraints and `Composite Indexes` to data tables to optimize query performance and ensure data integrity.

![Composite Index](./img/joint-index.png)
### Multi-column Composite Unique
Create composite unique constraints by selecting multiple fields, ensuring that the combination of these field values is unique throughout the entire table. For example, you can set `Product Name` and `Specification` fields as composite unique to prevent duplicate products with the same specifications.

### Composite Index
Select multiple fields to create composite indexes. Filtering based on these fields simultaneously can significantly improve query performance.

:::warning Warning
Properly configured indexes can effectively improve query speed, but too many indexes will affect data write performance. Balance is needed based on actual business scenarios.
:::

## Source Code Mode  {#source-code-mode}
In addition to visual configuration, direct modification of model source code in code mode is also supported, providing greater flexibility for advanced developers.

![View Source Code](./img/view-source-code.png)

When switching to source code mode, you can view the entire model's source code, including model definitions and model functions.
