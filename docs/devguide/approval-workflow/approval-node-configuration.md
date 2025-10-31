---
sidebar_position: 3
slug: approval-node-configuration
title: Approval Node Configuration
description: "Configure approval nodes with approver settings, workflow rules, and permissions. Most frequently used node type for review workflows."
---

# Approval Node Configuration

Approval nodes represent the most frequently utilized node type, designed to designate approvers for reviewing current approval workflows. Node configuration encompasses approver settings, approval flow rules, workflow processing rules, extended functionality configuration, page and permission control systems.

![Approval Node Configuration](./img/workflow_2025-08-25_10-51-45.gif)

Click the corresponding approval node from the "Approval Configuration Panel" to access the configuration interface for that specific node.

## Approver settings {#approver-settings}
Every approval workflow must designate one or more approvers for processing, configured through the personnel selection interface.

![Approver Settings](./img/workflow_2025-08-25_11-14-02.png)

In the approval node configuration panel, access the "Select Approvers" dialog. The personnel selection interface supports multiple selection methods: select members, select departments, select roles, select member fields, select department fields, select supervisors, select yourself.

**Select Members:** Choose one or more specific members from the organizational structure.

**Select Departments:** Choose one or more specific departments within the organizational structure.

**Select Roles:** Choose one or more specific roles. Note: These roles are defined within the organizational structure (displayed in communications), not application-level roles.

**Select Member Fields:** Choose member single-select or member multi-select fields from the approval form. Note: If the approver for this node is the initiator, you can select the "Initiator" field here.

**Select Department Fields:** Choose department single-select or department multi-select fields from the approval form.

**Select Supervisors:** This displays all member single-select, member multi-select, department single-select, and department multi-select fields in the approval form, plus first through fifth-level supervisors of the initiator.

**Select Yourself:** Refers to the user currently configuring the approval workflow. Note: This does not refer to the user initiating the approval.

## Approval flow rules {#approval-flow-rules}
Approval flow rules define how approval documents should route among multiple approvers when the current approval node contains multiple processors.

![Workflow Rules](./img/workflow_2025-08-25_11-36-26.png)

Two flow rules are available: OR signing (approval proceeds to the next node when any single person approves) and AND signing (all approvers must approve before proceeding to the next node). The default setting is OR signing.

## Approval workflow processing rules {#approval-workflow-rules}
When approvers process approval documents, they can choose to approve, reject, return, or transfer the workflow. These operations trigger workflow processing rules.

![Workflow Processing Rules](./img/workflow_2025-08-25_11-40-31.png)

By default, only "Approval Consent" is available, displaying only the `Approve` button on the interface. Developers can configure workflow `Refuse`, `Reject`, and `Transfer` buttons based on specific requirements.

When `Workflow Consent` is configured, clicking the `Approve` button automatically advances the workflow to the next approval node.

When `Workflow Refuse` is configured, clicking the `Refuse` button automatically terminates the workflow.

When `Workflow Reject` is configured, clicking the `Reject` button automatically returns the workflow to the specified node.

When `Workflow Transfer` is configured, clicking the `Transfer` button automatically transfers the workflow to the designated approver.

![Workflow Reject Rules](./img/workflow_2025-08-25_11-48-00.png)

When configuring workflow reject functionality, you must pre-configure whether to return to the previous node or return to a specific node. If you need to determine the return destination during the approval process, configure "Approver selects a specific node".

![Approver Not Found](./img/workflow_2025-08-25_11-48-59.png)

If the current approver has been removed from the organization and cannot be located, developers can choose to pause the workflow, automatically pass the workflow, or transfer it to an administrator for approval.

## Approval extended functionality configuration {#approval-extended-function-configuration}
Extended approval node functionality includes deduplication approval, time-limited processing, approval drafts, feedback mechanisms, handwritten signatures, batch approval permissions, message notifications, SMS notifications, and other comprehensive features.

![Configure Approval Extended Functions](./img/workflow_2025-08-25_11-53-32.png)

### Deduplication approval {#deduplication-approval}
When the same person requires approval at multiple nodes within an approval workflow, enable the deduplication approval function to automatically eliminate duplicates and require only one approval.

If the current node flow rule is "OR signing", the node is automatically considered passed; if "AND signing", duplicate approvers are deduplicated.

### Time-limited processing {#time-limited-processing}
Establish time constraints for approval documents, such as configuring notification reminders if the approver at this node fails to process the approval document within 5 days of arrival.

![Time-Limited Processing](./img/workflow_2025-08-25_12-00-45.png)

After enabling "Time-Limited Processing", developers can configure multiple time-limited processing rules based on specific scenarios. Note: If the current approval document has multiple approvers, only the reminder functionality set by time-limited processing takes effect.

### Approval drafts {#approval-draft}
When approvers need to temporarily pause during the approval process, they can utilize the `Draft` function to save filled content and resume approval workflow processing after completion.

![Draft](./img/workflow_2025-08-25_14-01-06.gif)

After enabling the "Approval Draft" function, a `Draft` button appears on the corresponding approval page. Clicking `Draft` saves approval data as a draft while maintaining the workflow at the current node. When the approver reopens the approval document, data is automatically populated.

### Approval feedback {#approval-feedback}
When approvers need to provide feedback on approval documents during processing, they can utilize the approval feedback functionality.

![Feedback](./img/workflow_2025-08-25_14-07-08.png)

Developers can configure whether to require approval comments for approval, refuse, and reject scenarios. Each option offers "No Fill", "Required", or "Optional" settings.

![Approval Comments](./img/workflow_2025-08-25_14-11-14.png)

When developers configure optional or required settings, a comment input dialog appears after each user workflow processing action.

:::tip Tip

Developers must enable approval in "Workflow Processing Rules" for the "Approval" feedback setting to appear; the same applies to rejection and return options.

If feedback is configured as required, approval processing cannot be submitted without completing comments.
:::

### Handwritten signatures {#handwritten-signature}
When users require handwritten signatures for processing specific approval documents, configure this in the node settings.

![Handwritten Signature](./img/workflow_2025-08-25_14-15-56.png)

Developers can choose "Use Last Signature" or "Re-sign Each Time".

![Use Last Signature](./img/workflow_2025-08-25_14-24-03.png)

When "Use Last Signature" is selected, a signature dialog appears after clicking the `Approve` button, with a "Use Last Signature" button in the lower left corner.

:::warning Note
If clicking "Use Last Signature" does not update the signature panel, this indicates no corresponding signature data exists in the system (the user has not previously signed).
:::

### Batch approval permissions {#allow-batch-approval}
When users want to batch approve multiple approval documents, configure "Allow Batch Approval" in the approval node.

![Batch Approval](./img/workflow_2025-08-25_14-30-54.png)

After enabling batch approval functionality, checkboxes appear before each approval document on the "To-Do Center" page, with a "Batch Approval" button at the top.

:::warning Note

Only "Batch Approval" functionality is available—no "Batch Rejection" or other batch operations. For multiple approval documents, you can only choose to approve all operations.

When using "Batch Approval", form validation rules and required field rules are ignored, and handwritten signature and approval feedback configurations do not take effect.
:::

### Message notifications {#message-notification}
After approvers enable "Message Notification" functionality, the system sends message reminders to approvers.

![Message Notification](./img/workflow_2025-08-25_14-34-54.png)

Whenever corresponding approval documents require processing, the system sends message reminders to approvers.

### SMS notifications {#sms-notification}
When users enable "SMS Notification" functionality, the system sends SMS reminders whenever corresponding approval documents require processing.

![SMS Notification](./img/workflow_2025-08-25_14-38-31.png)

Note: Before configuring SMS notification functionality, you must configure SMS service and SMS template codes (For SMS service configuration guidance, refer to [SMS Service](../third-party-integration/sms-service#use-sms-service-in-approval-flow)).

## Approval page and permission control {#approval-page-permission-control}
Each approval node can control permissions for displayed pages, including customizing pages for specific approval nodes and configuring field viewing and editing permissions.

### Pages used by current node {#pages-used-by-current-node}
By default, all approval nodes utilize the approval workflow's default page. To customize pages, configure the node's page in the node settings. For custom page creation guidance, refer to [Approval Page Customization](./approval-page-customization).

### Summary information display {#summary-display}
Summary fields primarily display "To-Do" and "Done" approval lists in the "To-Do Center".

![Summary](./img/workflow_2025-08-25_15-17-52.png)

Like initiation nodes, approval nodes can configure only five fields. The "To-Do Center" display matches the initiation node format.

### Field permissions {#fieldpermission}
Developers can control viewing and editing permissions for approval form fields on "To-Do" and "Done" pages through field permissions. By default, all fields are in view-only mode.

![Field Permissions](./img/workflow_2025-08-25_15-20-14.png)

:::warning Note

Field permissions only affect "To-Do" and "Done" pages under the current node.

All fields on "Done" pages remain in view-only mode, even if editing permissions are configured here.

The final display of approval form fields is influenced by both approval node field permission control and the form's inherent permissions. For form permission configuration guidance, refer to [Form Permissions](../using-functional-components-in-pages/form-components#field-operation-permissions).

When adding new fields to a data table, you must first add permissions, then configure them on the corresponding page.
:::

### Layout control permissions {#layout-control-permissions}
In certain scenarios, specific layout controls in displayed pages may not need to be shown for different nodes. Layout control permissions provide this permission management capability.

![Layout Controls](./img/workflow_2025-08-25_15-22-30.png)

Users can control whether layout controls are displayed when pages are shown under the current node. By default, corresponding pages do not include layout controls, so you must first add layout controls to the relevant pages before implementing permission control.
