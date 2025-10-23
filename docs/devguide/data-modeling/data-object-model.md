---
sidebar_position: 9
slug: data-object-model
---

# Data Object Models
Data Object Models represent specialized data structures engineered for full-code development environments, functioning similarly to DTOs (Data Transfer Objects) and commonly referred to as `Table-less Models`. These models are custom-designed by developers to meet specific business requirements without directly mapping to or associating with database tables. Data object models serve as the backbone for structured data expression, transmission, and transformation within business logic components such as service functions, event handlers, and workflow orchestration systems. Through data object models, developers can architect flexible multi-layered nested and complex composite data structures that facilitate standardized data interactions between modules while enhancing code maintainability, reusability, and business decoupling capabilities. Data object models excel in scenarios involving complex business logic, multi-tier data interactions, and temporary data encapsulation.

## Creating data object models {#creating-data-object-model}
JitAi provides visual creation capabilities for object models, while fields and functions require full-code editing exclusively.

![Create Data Object Model](./img/create-data-object-model.png "Create Data Object Model")

Navigate to the element tree in the development area, click the `+` button adjacent to Data Models, and select `Data Object Model` from the dropdown menu to launch the `Create Element > Data Object Model` dialog.

![Data Object Model Dialog](./img/data-object-model-popup.png "Data Object Model Dialog")

Within the `Create Element > Data Object Model` dialog, specify the model name (the system automatically generates the corresponding English identifier), then click `Confirm` to finalize creation and seamlessly transition into the data object model's full-code editing interface.

## Using data object models {#using-data-object-model}
Data object models offer exceptional flexibility, making them ideal for business logic implementations within service functions and event handlers, where they serve as data carriers for input parameters and output results while enabling standardized data transmission across different modules. In practical development workflows, data object models are frequently employed to express and transform complex data structures, eliminating the need for direct database table operations and thereby enhancing code maintainability and reusability. Furthermore, data object models support sophisticated multi-layered nesting and composition patterns, effectively addressing data organization requirements in complex business scenarios.

![Data Object Model Full Code](./img/data-object-model-full-code.png "Data Object Model Full Code")

Within the full-code editing interface, developers can efficiently view and modify data object model implementations by accessing the `model.py` file from the left-side file navigator. Data object models must inherit from the platform-provided base class and can flexibly define properties (fields) and methods tailored to specific business requirements.

The following represents a typical data object model usage workflow:

## Customizing fields {#customizing-fields}
Within the object model's `model.py` file, developers can define custom fields tailored to specific business requirements. The following diagram illustrates the object model's field definition interface:

![Object Model Field Definition](./img/object-model-field-definition.png "Object Model Field Definition")

Upon completing field definitions, comprehensive field configuration methodologies can be found in the [Data Table Model](./data-table-model#source-code-mode) documentation.

:::tip Note
After configuring custom fields, verify that the `datatypes` package has been properly imported.
:::

## Overriding model functions {#overriding-model-functions}
To implement custom data query logic, developers typically need to override model CRUD methods. Using the `query` method override as an exemplar, the following diagram demonstrates the object model method override interface:

![Object Model Method Override](./img/object-model-method-override.png "Object Model Method Override")

Upon completing the method override, the `query` method delivers custom data query capabilities to table components and other interface elements.

![Object Model Table Display](./img/object-model-table-display.png "Object Model Table Display")

Finally, integrate a table component into the page and configure the data object model as the data source to render the content returned by the `query` method.

Beyond overriding the `query` (data retrieval) method, developers can override additional methods such as `create` (data insertion), `updateByPK` (primary key-based updates), and `deleteByPK` (primary key-based deletion) to implement custom data processing logic tailored to business requirements. For instance, the `create` method can incorporate validation and preprocessing of new data entries, the `updateByPK` method can handle business validation and transformation processes before and after data updates, while the `deleteByPK` method can enforce permission validation or execute cascading operations. Furthermore, developers can extend custom methods to address complex data transformation, aggregation, or validation requirements. Through strategic overriding and extension of these methods, developers gain granular control over data object model behavior, accommodating diverse business scenarios with precision.

## Defining new functions {#defining-new-functions}
Within the data object model's `model.py` file, developers can not only customize fields but also dynamically incorporate custom functions aligned with specific business requirements. Custom functions serve as powerful tools for implementing sophisticated data processing operations, business logic encapsulation, data validation protocols, format conversion routines, and other specialized operations, substantially enhancing model extensibility, operational flexibility, and code reusability.

![Add New Function](./img/data-object-model-add-function.gif "Add New Function")

When implementing custom functions, it's advisable to reference existing method implementations as templates and develop function code within the `model.py` file. To ensure proper platform recognition and invocation of newly defined methods, function declarations must be registered within the `functionList` array of the `e.json` configuration file. Only custom functions explicitly declared in the `functionList` can be appropriately referenced and invoked across various contexts including pages and service functions. Methods inherited from base classes and subsequently overridden do not require redundant declarations within individual object models. For comprehensive function declaration configuration guidelines, consult the [Element Directory Specification](../../reference/runtime-platform/JAAP#element-directory-specification) documentation.