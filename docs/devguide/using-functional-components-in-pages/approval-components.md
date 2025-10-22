---
sidebar_position: 13
slug: approval-components
title: Approval Components
---

# Approval Components
## Initiate application component {#initiate-application-component}
The initiate application component serves as the entry point for approval workflows, enabling users to submit approval requests based on form data models. It collects user input, launches approval processes, displays workflow progress, and supports data refresh operations with event-driven notifications.

### Creating initiate application component {#create-initiate-application-component}
![Creating Initiate Application Component](./img/13/wf_2025-08-29_16-08-54.png)

In the page visual editor, click `Insert Component` and drag the `Initiate Application` component onto the page. Configure its parameters in the right-side configuration panel.

### Parameter configuration {#parameter-configuration-1}
When using the initiate application component, you must specify an [approval workflow instance element](../approval-workflow/approval-workflow-basic-configuration).

![Initiate Application Component Parameters](./img/13/wf_2025-08-29_16-13-23.png)

In the visual editor, select the initiate application component to access its configuration panel. Choose the corresponding approval workflow instance element from the dropdown. You can also toggle whether to display approval workflow records.

:::warning Note
Approval workflows must be created before adding initiate application components. For setup instructions, see [Approval Workflows](../approval-workflow/approval-workflow-basic-configuration).

You can also create a workflow by clicking `Create New General Approval` in the dropdown menu.

The approval workflow records shown by the component are prediction data generated from the selected workflow configuration.

If workflow prediction is disabled, no approval records will be displayed.
:::

### After processing/refresh events {#post-processing-refresh-event}
The initiate application component emits `After Processing` and `After Refresh` events to handle post-submission and post-refresh workflows.

![After Processing and After Refresh Events](./img/13/wf_2025-08-29_16-24-47.png)

The `After Processing` event fires upon successful application submission. Common use cases include closing dialogs and refreshing table data.

The `After Refresh` event fires when the component refreshes and must be paired with the component's refresh function.

![Initiate Application Component Parameters](./img/13/wf_2025-08-29_16-28-26.png)

For example, when configuring a table to open a dialog and refresh the initiate application component, the component's `After Refresh` event will trigger accordingly.

## Approval processing component {#approval-processing-component}
The approval processing component is the core UI element for handling workflow approval tasks. Built on the workflow engine, it loads pending tasks, displays approval history, manages task status, and processes user approval actions.

### Creating approval processing component {#create-approval-workflow-component}
![Creating Approval Processing Component](./img/13/wf_2025-08-29_16-45-56.png)

In the page visual editor, click `Insert Component` and drag the `Approval Processing` component onto the page. Configure its parameters in the right-side configuration panel.

### Parameter configuration {#parameter-configuration-2}
The approval processing component also requires an [approval workflow instance element](../approval-workflow/approval-workflow-basic-configuration). Beyond selecting the workflow, you can configure whether to display the workflow visualization and whether to retain historical approval records.

![Approval Processing Component Parameters](./img/13/wf_2025-08-29_16-48-56.png)

### Retaining historical approval records {#keep-historical-approval-records}
Initiators can withdraw and re-submit approval requests. When `Retain Historical Approval Records` is enabled, these withdrawal and re-submission actions are preserved in the audit trail. When disabled, they are not recorded.

![Retain Historical Approval Records](./img/13/wf_2025-08-29_16-54-24.png)
![Do Not Retain Historical Approval Records](./img/13/wf_2025-08-29_16-56-15.png)

:::warning Note
Approval workflows must be created before adding approval processing components. For setup instructions, see [Approval Workflows](../approval-workflow/approval-workflow-basic-configuration).

Approval components cannot be previewed in the development environment—they must be tested in the runtime environment.

If the current user has no pending approvals, the component displays "No pending approval items currently available."

When `Display Approval Workflow` is disabled, workflow records are hidden regardless of the `Retain Historical Approval Records` setting.

If workflow prediction is disabled, the component only displays approval records that have already been processed.
:::

The approval processing component requires a data source to function. Without one, the component will not operate.

![Data Source](./img/13/wf_2025-08-29_17-07-05.png)

As shown above, when combining tables with approval processing components, configure the data source in the table's event handlers.

### After processing/refresh events {#post-processing-refresh-event-1}
The approval processing component emits `After Processing` and `After Refresh` events to handle post-approval and post-refresh workflows.

![After Processing and After Refresh Events](./img/13/wf_2025-08-29_17-10-59.png)

The `After Processing` event fires upon completing an approval action. Common use cases include closing dialogs and refreshing table data.

The `After Refresh` event fires when the component refreshes and must be paired with the component's refresh function.
