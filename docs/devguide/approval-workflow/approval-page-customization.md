---
sidebar_position: 5
slug: approval-page-customization
---

# Approval Page Customization
When creating an approval workflow, the system will create a default approval page by default. However, in some cases, users need to display different pages for different approval nodes, which requires page customization for specific approval nodes.

## Advanced Approval Page Customization {#approval-page-advanced-customization}
By default, an approval workflow only has one default approval page. Users can customize pages for different approval nodes to achieve different approval pages.

### Approval Page Types {#approval-page-types}
Approval pages are divided into default approval pages and custom approval pages.

![Advanced Approval Page Customization](./img/workflow_2025-08-25_17-22-15.png)

In the node configuration panel, developers can click the dropdown box in the "Pages Used by Current Node" area to choose between using the "Default Approval Page" or "Custom Page".

![Custom Page](./img/workflow_2025-08-25_17-30-46.png)

After selecting "Custom Page", the system will default to selecting the first page among all custom pages in the current approval workflow, and developers can also choose to create a new page.

### Custom Page Creation Methods {#custom-page-creation-method}
When creating custom pages, the system has two creation methods: creating a new page and creating based on an existing page.

![Create Custom New Page](./img/workflow_2025-08-25_17-34-20.png)

After clicking `+ New Page`, the new page creation popup opens. In the "Creation Method" section, you can choose between "Create New Page" or "Create Based on Existing Page".

![New Page Creation Popup](./img/workflow_2025-08-25_17-36-48.png)

If you select "Create Based on Existing Page", a "Select Page" option will pop up. After filling in all the information, click the "Confirm" button to create a new page containing an approval form.

![Edit Page](./img/workflow_2025-08-25_17-41-11.png)

For pages that have already been created, you can click the "Edit" button on the right side of the dropdown box to enter the page for editing.

:::warning Note

Pages created in approval workflows are exclusive to the approval workflow.

Pages created by each approval workflow can only be used in the current approval workflow and cannot be used by other approval workflows.

Only start nodes, approval nodes, and CC nodes can perform page customization.

Pages created by any node can be referenced by other nodes.

When using the "Create Based on Existing Page" function, you can only select pages related to the current approval workflow.

The form generated when creating a page cannot be deleted, otherwise it will cause the page to be unusable.

For form configuration in pages, refer to [form-components](../using-functional-components-in-pages/form-components).

:::
