---
sidebar_position: 13
slug: approval-components
title: Approval Components
---

# Approval Components
## Initiate application component {#initiate-application-component}
The initiate application component serves as the entry point for approval workflows, implementing application initiation and management functionality based on form data models. It is responsible for collecting user-submitted form data, launching approval processes, and displaying workflow progress, with support for data refresh and event notification mechanisms.

### Creating initiate application component {#create-initiate-application-component}
![Creating Initiate Application Component](./img/13/wf_2025-08-29_16-08-54.png)

In the page visual editor, click `Insert Component` and drag the "Initiate Application" component onto the page. Then configure the initiate application component parameters in the right configuration panel.

### Parameter configuration {#parameter-configuration-1}
When using the initiate application component, you need to specify the [approval workflow instance element](../approval-workflow/approval-workflow-basic-configuration) to be used.

![Initiate Application Component Parameters](./img/13/wf_2025-08-29_16-13-23.png)

In the visual editor, clicking on the initiate application component reveals the parameter configuration panel. In the configuration panel, select the corresponding approval workflow instance element. Additionally, developers can choose whether to display approval workflow records.

:::warning Note
Generally, approval workflows should be created before creating initiate application components. Please refer to [Approval Workflows](../approval-workflow/approval-workflow-basic-configuration) for details.

Developers can also click `Create New General Approval` in the dropdown to create approval workflows.

The approval workflow records displayed by the initiate application component are actually approval workflow prediction data generated based on the selected approval workflow.

If the approval workflow has disabled the prediction feature, the initiate application component will not display approval workflow records.
:::

### After processing/refresh events {#post-processing-refresh-event}
The initiate application component provides `After Processing` and `After Refresh` events for handling post-completion and post-refresh logic.

![After Processing and After Refresh Events](./img/13/wf_2025-08-29_16-24-47.png)

The after processing event handles logic following application submission, such as closing the current dialog and refreshing table data after approval data is submitted.

The after refresh event handles logic following initiate application component refresh and must be used in conjunction with the initiate application refresh function.

![Initiate Application Component Parameters](./img/13/wf_2025-08-29_16-28-26.png)

For example, when developers configure opening a dialog and refreshing the initiate application component in a table, the after refresh event within the initiate application component will take effect.

## Approval processing component {#approval-processing-component}
The approval processing component is the core operational component for workflow approval tasks, implementing approval task processing, viewing, and status management based on the workflow engine. It is responsible for loading pending tasks for specified workflows, displaying approval history, and handling user approval operations.

### Creating approval processing component {#create-approval-workflow-component}
![Creating Approval Processing Component](./img/13/wf_2025-08-29_16-45-56.png)

In the page visual editor, click `Insert Component` and drag the "Approval Processing" component onto the page. Then configure the approval processing component parameters in the right configuration panel.

### Parameter configuration {#parameter-configuration-2}
When using the approval processing component, you also need to specify the [approval workflow instance element](../approval-workflow/approval-workflow-basic-configuration) to be used. In addition to configuring the approval workflow, the approval processing component can also choose whether to display the approval workflow and whether to retain historical approval records.

![Approval Processing Component Parameters](./img/13/wf_2025-08-29_16-48-56.png)

### Retaining historical approval records {#keep-historical-approval-records}
Initiators can perform withdrawal and re-initiation operations on approval forms. If developers check `Retain Historical Approval Records`, these withdrawal and re-initiation operations will be preserved in the approval records. Otherwise, these operations will not be saved in the approval records.

![Retain Historical Approval Records](./img/13/wf_2025-08-29_16-54-24.png)
![Do Not Retain Historical Approval Records](./img/13/wf_2025-08-29_16-56-15.png)

:::warning Note
Generally, approval workflows should be created before creating approval processing components. Please refer to [Approval Workflows](../approval-workflow/approval-workflow-basic-configuration) for details.

Approval components cannot be previewed in the development area and must be viewed in the usage area.

If the approval form does not require approval from the current logged-in user, it will display "No pending approval items currently available."

If `Display Approval Workflow` is unchecked, approval workflow records will not appear regardless of whether `Retain Historical Approval Records` is checked.

If the approval workflow has disabled the prediction feature, the approval processing component will only display approval records that have already been processed.
:::

When using the approval processing component, you need to provide a data source for this component, otherwise it cannot be used.

![Data Source](./img/13/wf_2025-08-29_17-07-05.png)

As shown above, when using tables and approval processing components together, you need to provide a data source for the approval processing component in the table's events.

### After processing/refresh events {#post-processing-refresh-event-1}
The approval processing component provides `After Processing` and `After Refresh` events for handling post-completion and post-refresh logic.

![After Processing and After Refresh Events](./img/13/wf_2025-08-29_17-10-59.png)

The after processing event handles logic following approval form processing, such as closing the current dialog and refreshing table data after approval data is processed.

The after refresh event handles logic following approval processing component refresh and must be used in conjunction with the approval processing component's refresh function.
