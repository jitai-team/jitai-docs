---
sidebar_position: 4
slug: roles-and-business-element-permissions
---

# Roles and Business Element Permissions

RBAC (Role-Based Access Control) can not only control user access to portals and pages, but also extend to the business element level, providing fine-grained permission control over core business components such as data models and service functions.

## Portal-level Data Operation Type and Scope Control {#portal-level-data-operation-type-and-scope-control}

To implement control over unauthorized data operations, JitAi supports specifying global data access permission control for roles in specific portals, limiting accessible data models and model operation functions (query, create, update, delete, statistics). Even if developers provide data query-related components and operation buttons on portal pages, users cannot perform operations or view data beyond their permission scope.

![Custom Data Model Permissions](./img/role/custom-data-model-permissions.gif)

In the application role's visual editor, developers can turn on the `Custom Data Model Permissions` switch in the upper right corner and select the supported function types for each data model in the popup table.

Developers can also add filter conditions to control the data operation scope for each operation function under each model.

![Custom Data Model Permissions - Data Filtering](./img/role/custom-data-model-permissions-data-filtering.gif)

When developers hover over a row in the configuration table, they can see the `Data Filtering` button. Clicking it allows adding filter conditions. All function types except `Create Function` and `Update Function` support configuring `Data Filtering`.
