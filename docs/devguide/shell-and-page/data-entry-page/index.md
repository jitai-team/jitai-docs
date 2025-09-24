---
sidebar_position: 5
---

# Data Entry Page
In business scenarios such as personnel information registration, vehicle information registration, and equipment information registration, users need to fill out form data and submit it to the backend for processing. JitAi directly provides data entry pages to help developers quickly complete the development of form data collection functionality.

## Create Data Entry Page {#create-data-entry-page}
The creation process of data entry pages is basically the same as [the creation process of regular pages](/docs/devguide/shell-and-page/component-based-page-development#create-a-regular-page), except that data entry pages need to bind a [data table model](/docs/devguide/data-modeling/data-table-model) to store the data entered by users.

![Create Data Entry Page](./imgs/create-data-entry-page.png "Create Data Entry Page")

Developers can select the page type as `Data Entry Page` when creating a page, and select the [data table model](/docs/devguide/data-modeling/data-table-model) for data entry at `Select Data Table`. After clicking the `Confirm` button, it will automatically enter the visual editor.

## Configure Viewable and Editable Fields {#configure-viewable-editable-fields}
When developers don't want to expose certain fields to users, they can configure the fields that users can view. When developers only want users to see field values but not modify them, they can configure the fields that users can edit.

![Configure Viewable and Editable Fields](./imgs/data-entry-configure-viewable-editable-fields.gif "Configure Viewable and Editable Fields")

In the `Allow View` column of the page editor, developers can uncheck fields that don't need to be exposed to users (e.g., ID), and the corresponding fields will no longer be displayed in the entry form that users see.

In the `Allow Edit` column of the page editor, developers can uncheck fields that users are not allowed to modify, and the corresponding fields that users see in the entry form will be in read-only state.

## Show Re-entry Button After Submission {#show-re-entry-button-after-submission}
When users need to continuously enter multiple data records using one form, developers can enable the `Show Re-entry` switch to support this requirement.

![Data Entry Page Re-entry](./imgs/data-entry-page-re-entry.gif "Data Entry Page Re-entry")

Developers can check the `Show Re-entry` option when developing the page, so that users can click the `Re-entry` button after each data `submission` to return to the entry interface and fill in new data. This option is enabled by default.

## Show Result Feedback After Submission {#show-result-feedback-after-submission}
After users complete a data submission, a feedback interface for the entry result can be provided to inform users of the submission result. This is a common interaction design that can enhance user experience.

![Data Entry Page Result Feedback](./imgs/data-entry-page-result-feedback.gif "Data Entry Page Result Feedback")

When developers check the `Show Entry Result Feedback` option in the page editor, users will see a successful data entry feedback reminder interface after completing form data filling and clicking the `Submit` button. This option is enabled by default.

## Convert to Regular Page for Modification {#convert-to-regular-page-for-modification}
Data entry pages are out-of-the-box built-in page types provided by JitAi that developers can quickly create and use. When developers want to make more refined customizations based on the default implementation, they can convert the page to a regular page for unlimited modifications.

![Convert to Regular Page](./imgs/convert-to-regular-page.gif "Convert to Regular Page")

Developers can click the `Convert to Regular Page` button in the upper right corner of the page editor to convert the page to a regular page. For development methods of regular pages, refer to [Component-based Page Development](/docs/devguide/shell-and-page/component-based-page-development).

:::warning
After converting to a regular page, it cannot be restored to the original `Data Entry Page` type.
:::
