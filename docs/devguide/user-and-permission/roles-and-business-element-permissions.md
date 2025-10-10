---
sidebar_position: 4
slug: roles-and-business-element-permissions
---

# Roles and Business Element Permissions

RBAC (Role-Based Access Control) not only controls user access to portals and pages, but also extends to the business element level, providing fine-grained permission control over core business components such as data models and service functions.

## Portal-level data operation type and scope control {#portal-level-data-operation-type-and-scope-control}

To enforce control over unauthorized data operations, JitAi supports specifying global data access permission controls for roles within specific portals, restricting access to data models and their operation functions (query, create, update, delete, and statistics). Even if developers include data query components and operation buttons on portal pages, users cannot perform operations or view data beyond their authorized permission scope.

![Custom Data Model Permissions](./img/role/custom-data-model-permissions.gif "Custom Data Model Permissions")

In the application role's visual editor, developers can enable the `Custom data model permission` switch in the upper right corner and select the supported function types for each data model in the popup table.

Developers can also add filter conditions to control the data operation scope for each operation function within each model.

![Custom Data Model Permission - Data Filtering](./img/role/custom-data-model-permissions-data-filtering.gif "Custom Data Model Permission - Data Filtering")

When developers hover over a row in the configuration table, the `Data Filtering` button appears. Clicking it allows adding filter conditions. All function types except `Create` and `Modify` support `Data Filtering` configuration.
