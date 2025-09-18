---
sidebar_position: 4
slug: special-node-configuration
---

# Special Node Configuration
In addition to providing commonly used nodes, JitAi's approval workflows also support some special nodes, such as CC nodes, branch nodes, parallel nodes, subprocess nodes, etc.

## CC Node {#cc-node}
When users need to CC other users when initiating applications or processing approval documents, they can use CC nodes.

![CC Node](./img/workflow_2025-08-25_15-29-36.gif)

Click the corresponding "CC Node" in the configuration panel to open the CC configuration panel.

CC nodes can set CC recipients, SMS notifications, CC page settings, summary field settings, CC page field display settings, and page control display settings.

### CC Recipients {#cc-recipients}
![CC Recipients](./img/workflow_2025-08-25_15-34-05.png)

The setting of CC recipients is the same as the setting of approval nodes, which can be configured as users, departments, roles, member fields, department fields, etc. For details, refer to [User Selection](./approval-node-configuration#approver-settings).

### SMS Notification {#sms-notification}
When CC information is sent to corresponding CC recipients, CC recipients will receive SMS notifications. Its configuration is the same as the SMS notification configuration of approval nodes. For details, refer to [SMS Notification](./approval-node-configuration#sms-notification).

### Pages Used by Current Node {#pages-used-by-current-node}
By default, all CC nodes use the default page of the approval workflow. If you need to customize pages, you can set the node's page in the node configuration. For how to create custom pages, please refer to [Approval Page Customization](./approval-page-customization).

### Field Permissions {#fieldpermission}
Users can control the viewing permissions of approval form fields on the "CC" page through field permissions. By default, all fields are only in a viewable state.

![Field Permissions](./img/workflow_2025-08-25_15-37-46.png)

:::warning Note

Field permissions are only effective for the "CC" page under the current node.

The final display of approval form fields is affected by both CC node permission control and the form's own permissions. For how to configure form permissions, refer to [Form Permissions](../using-functional-components-in-pages/form-components#field-operation-permissions).

When a new field is added to a data table, you need to add permissions for it first, then configure it on the corresponding page.
:::

### Layout Control Permissions {#layout-control-permissions}
In some cases, for different nodes, certain layout controls in the displayed pages may not need to be shown. In this case, layout control permissions can be used for permission control.

![Layout Controls](./img/workflow_2025-08-25_15-38-43.png)

Users can control whether layout controls are displayed when pages are shown under the current node. By default, the corresponding pages do not have layout controls added, so you need to add layout controls to the corresponding pages first before you can perform permission control.

## Branch Node {#branch-node}
When an approval workflow needs to determine the next approval node based on the values of certain fields in the form, branch nodes can be used.

![Branch Node](./img/workflow_2025-08-25_16-34-26.png)

For example, when applying for office supplies, if the remaining office supplies quantity is less than 5, the procurement department needs to be notified to make purchases.

![Branch Node Configuration](./img/workflow_2025-08-25_16-40-01.png)

Click the corresponding branch node from the "Approval Configuration Panel" to open the configuration panel for that node, where branch conditions can be set in the configuration panel.

:::tip Tip

Each branch condition of a branch node is actually a filtering condition for the approval-associated model.

Each branch of a branch node will have its own independent flow route, branching according to the conditions set on the branch node.

Branch nodes will have an "Other" branch by default. When none of the above branch conditions are met, the approval will flow to the "Other" branch.
:::

## Parallel Node {#parallel-node}
When users want multiple approval paths to flow simultaneously, they can use parallel nodes.

![Parallel Node](./img/workflow_2025-08-25_16-52-18.png)

An approval workflow can have multiple groups of parallel nodes.

![Parallel](./img/workflow_2025-08-25_17-01-43.png)

When the workflow enters parallel nodes, all node statuses and flow situations will be presented in the approval records.

:::warning Note

Parallel start and parallel end must appear in pairs.

All parallel nodes must start from the parallel start node and end at the parallel end node.

All parallel branches are independent and do not affect each other.

:::

## Subprocess Node {#sub-process-node}
Subprocesses as nodes can be seen as extractions of approval workflows, where flowcharts with consistent functions/routes exist as independent approval workflows, allowing multiple main processes to call them without repetitive configuration.

![Subprocess Configuration](./img/workflow_2025-08-26_17-43-57.png)

Click the corresponding subprocess node in the approval configuration panel to enter the subprocess configuration panel. The subprocess configuration panel has many configuration options:

### Subprocess Name {#sub-process-name}
Dropdown selection, where you must select an approval workflow other than the current approval as the subprocess of the current approval workflow.

### Subprocess Initiator {#sub-process-initiator}
Select members as the initiators of the subprocess. The user selection interface is the same as [Approver Selection](./approval-node-configuration#approver-settings).

:::warning Note
If multiple members are set as subprocess initiators, each initiator will initiate subprocesses one by one.
:::

### Subprocess Flow Rules {#sub-process-flow-rules}
After the subprocess is initiated, the subprocess flow can be specified through subprocess flow rules.

![Subprocess Flow Rules](./img/workflow_2025-08-26_18-32-47.png)

Developers can choose whether the current process will proceed to the next node after the subprocess is initiated, or choose that the current process will only proceed to the next node after the subprocess ends.

When developers choose "The current process will proceed to the next node after the subprocess is initiated", the subprocess and current process will execute simultaneously. The two processes are independent, and whether the subprocess is completed has no impact on the current process.

When developers choose "The current process will only proceed to the next node after the subprocess ends", the current process will pause its flow and wait for the subprocess to end before proceeding to the next node.

### When Main Process Flows to Subprocess {#when-main-process-flows-to-sub-process}
When the main process flows to a subprocess, developers will generate different numbers of subprocesses according to actual needs based on configuration.

![Subprocess Quantity](./img/workflow_2025-08-26_18-41-35.png)

**Generate One Subprocess per Main Process:** This is the case in most situations, where the current process and subprocess have a 1-to-1 relationship.

**Generate Multiple Subprocesses per Main Process:** Generally in cases where there are multiple sub-tables in the main process, multiple subprocesses are generated for the sub-tables.

### Subprocess Post-Flow Function Design {#sub-process-post-flow-function-design}
When the current process flows to a subprocess, the data from the current process needs to be passed to the subprocess. Configure functions here to implement this.

![Subprocess Post-Flow Function Design](./img/workflow_2025-08-26_18-49-53.png)

Function design is performed in a visual form.

:::warning Note
Input parameters are fixed as the main process form data, and the return value type is single-row data. If the return value of the selected function does not match the form model, it will cause function execution exceptions.
:::

### Update Main Process Data When Single Subprocess Ends {#update-main-process-data-single-sub-process-end}
After the subprocess ends, determine whether the subprocess form data needs to be passed to the main process based on specific requirements. If needed, enable this function.

![Subprocess Form Data Passed to Main Process](./img/workflow_2025-08-26_18-55-38.png)

Function design is also performed in a visual form here.

:::warning Note
Input parameters are fixed as the main process form data and subprocess form data, and the return value type is single-row data. If the return value of the selected function does not match the form model, it will cause function execution exceptions.
:::

### Update Main Process Data When All Subprocesses End {#update-main-process-data-all-sub-processes-end}
When the main process flows to subprocesses and generates multiple subprocesses per main process, determine whether the main process needs subprocess form data for operations when all subprocesses are approved.

![Subprocess Form Data Passed to Main Process](./img/workflow_2025-08-26_18-59-57.png)

:::warning Note
This function only applies to scenarios that generate multiple subprocesses.

Input parameters are fixed as the main process form data and subprocess form data, and the return value type is single-row data. If the return value of the selected function does not match the form model, it will cause function execution exceptions.
:::
