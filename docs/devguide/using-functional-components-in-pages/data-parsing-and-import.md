---
sidebar_position: 12
slug: data-parsing-and-import
description: "Import data from Excel files with import component. Bulk employee entry, financial reports, inventory lists batch import."
---

# Data Parsing and Import
## Import Component {#import-component}

In web development, importing data from Excel files is a common scenario. Business requirements such as bulk employee information entry, financial report data import, and inventory list updates all require support for users to upload Excel files and batch import the data into the system.

### Adding Import Component to Page {#add-import-component-to-page}

After dragging the import component into the page editor, all fields except primary key ID, serial number, and subtable fields will be marked as importable by default:

![](./img/12/2025-09-15-16-20-56.png)

The data table model fields used in this example are shown in the figure below:

![](./img/12/2025-09-15-16-23-41.png)

The generated import template has the sheet name in the bottom left corner consistent with the data table model, and the header field names and order displayed in the configuration area are consistent:

![](./img/12/2025-09-15-19-08-17.png)


### Import Serial Number Fields {#import-serial-number-fields}

By default, the `Support Import Serial Number Fields` option is unchecked because serial numbers are usually automatically generated in business processes. If you need to import serial number data through Excel, please check this option and then check the serial number field in the display field selection panel.

![](./img/12/2025-09-15-19-17-52.png)

### Set Required Fields {#set-required-fields}

By default, the import component does not require any fields to be mandatory. It supports setting certain fields as required:

![](./img/12/2025-09-19_15-32-01.gif)

Click on the field name, check `Required During Import` in the popup window, then click OK.

After setting the required attribute for a field, the field name in the import template will be marked with `*`

![](./img/12/2025-09-19-15-33-02.png)



### Import Subtable Data {#import-subtable-data}

When the main table has subtable fields configured, customers may want to import subtable field data directly while importing main table data for a better experience. Configure according to the following steps:

![](./img/12/2025-09-19-14-15-36.png)

First, in the right configuration area `Import Subtable` option, check the subtable to be imported.

![](./img/12/2025-09-19-14-24-09.png)

Second, set the `Template Sheet Page Name`. When importing data, subtable data is placed in a separate sheet page, and the sheet page name in the template should match the `Template Sheet Page Name`.

![](./img/12/2025-09-19-14-27-34.png)

Finally, configure `Association Matching` and `Map Main Table Field`. As shown in the figure, configure the `Association Matching` field name as `Subtable Matching Field` and `Map Main Table Field` as `Name`. In the import template, the `Subtable Matching Field` in the subtable and the `Name` field in the main table should correspond. The import template and data are shown below:

1. Main table import template and data:

![](./img/12/2025-09-19-14-42-32.png)

2. Subtable import template and data:

![](./img/12/2025-09-19-14-43-11.png)

:::tip
    When importing, do not modify the template sheet name, field names and order in the first row of the template. Otherwise, it may cause import failure.
:::

On the import page, after uploading the template, the page looks like this:

![](./img/12/2025-09-19-14-48-48.png)

You can switch the imported sheet page at the top of the page using `Select Main Table Worksheet`. Customers can check if the data is parsed correctly by switching the main table worksheet.

![](./img/12/2025-09-19-14-49-37.png)

Import success is shown below:

![](./img/12/2025-09-19-14-50-32.png)

You can see the imported main and subtable data in the data table model:

![](./img/12/2025-09-19-14-52-15.png)

![](./img/12/2025-09-19-14-52-45.png)

### Append Import/Update Import {#append-import-or-update-import}

By default, the import component uses append import mode. When importing only main table data, you can switch the import mode to `Replace Import`:

![](./img/12/2025-09-19-14-59-01.png)

Click the dropdown below `Import Configuration` and select replace import.

![](./img/12/2025-09-19-15-11-55.png)

Then click the dropdown under `Replace Settings` and select the matching field for replacement from the dropdown.

:::tip
    You can select up to 5 replacement matching fields. During import, the platform will replace data in the data table model with data from Excel based on matching fields. If no matching data is found, unmatched data will not be imported.
:::

Usage example, as shown in the configuration below, perform replace import based on the `Name` field:

![](./img/12/2025-09-19-15-18-39.png)

Import template and data:

![](./img/12/2025-09-19-15-21-37.png)

Data in the data table model before replace import:

![](./img/12/2025-09-19-15-22-16.png)

Data in the data table model after replace import:

![](./img/12/2025-09-19-15-23-09.png)


### Import Data by Conditions {#import-data-by-conditions}

Sometimes, the customer's Excel file contains a large amount of data, and only data that meets specific conditions needs to be imported. This scenario can be addressed by configuring import conditions.

![](./img/12/2025-09-19-15-41-05.png)

Click the `Configure Import Conditions` button, first configure the filter conditions in the popup panel, then click OK. As shown in the figure above, the configured filter condition is: name contains "Wang". In the data shown below, only the first two rows will be imported.

![](./img/12/2025-09-19-15-46-54.png)

Import results are as follows:

![](./img/12/2025-09-19-15-47-39.png)

Import failure records will indicate that the last two data rows do not meet the conditions:

![](./img/12/2025-09-19-15-48-06.png)

### Add Import Description Text {#add-import-description-text}

The import component will by default provide descriptions for file format, file size, etc. When users configure import conditions, they can add corresponding import descriptions for additional prompts:

![](./img/12/2025-09-19-15-58-45.png)

After entering description information in the input box under `Import Description` and clicking save, the custom import description will be displayed below the component's default prompt information.

### Pre-processing/Post-trigger Functions {#pre-processing-and-post-trigger-functions}

When pre-processing of imported data is needed, you can configure `Pre-import Processing Functions`. For example: format validation and standardization of phone numbers in Excel, unified conversion of different date formats to standard formats, or numerical validation and precision adjustment of amount fields and other data cleaning tasks.

When post-processing is needed after data import is completed, you can configure `Post-import Trigger Functions`. For example: automatically sending import completion notification emails to relevant users, updating statistical information of other related data tables, triggering business process approval workflows, or generating data import reports and pushing them to enterprise WeChat groups and other subsequent business operations.

![](./img/12/2025-09-22-10-50-54.png)

Click the `Configure Trigger Function` button, select the service and corresponding function in the popup panel. Users can also choose their own created services and functions.

:::tip
    The import component will pass all data to be imported as parameters to the processing function. The parameter format is an array, where each element in the array corresponds to one row of records in the data table model.
:::


### Import Hint Button Click Event {#import-hint-button-click-event}

![](./img/12/2025-09-22_11-13-18.gif)

Users can configure the import hint button click event themselves. Custom prompts can be created in this event. If the import component is in a popup, the popup can also be closed in this event.

![](./img/12/2025-09-22-10-59-28.png)

In the event, click `After Import Hint Button Click` and configure the corresponding event logic.


This event differs from `Post-import Trigger Function` in the following ways:

| Feature | Post-import Trigger Function | After Import Hint Button Click |
|---------|----------------------------|--------------------------------|
| Always Triggered | Yes | Triggered after user clicks |
| Extensibility | Can only select services and functions | Can choose richer custom statements |


## Parse Excel {#parse-excel}

In web applications, most cases require parsing data from Excel and importing it into corresponding data table models. Additionally, there is another common usage scenario: parsing data from Excel and directly updating form or table data on the current page without going through the data table model storage process.

### Create Parse Excel Component {#create-parse-excel-component}

In `Main Page` or popup components, after dragging in the `Parse Excel` component, the component will by default select non-primary key fields as the default configuration for parsing fields.

![](./img/12/2025-09-22-11-42-00.png)

### Configure Field Aliases {#configure-field-aliases}

When the original field names in the data table model are too long or difficult to understand, developers can set aliases for fields to improve user experience.

![](./img/12/2025-09-22-11-48-23.png)

Click on the field name, enter a custom alias in the popup dialog, and click OK.

![](./img/12/2025-09-22-12-00-05.png)

### Adjust Field Order {#adjust-field-order}

Developers can adjust the order of parsing fields by dragging, placing more frequently used fields at the front.

![](./img/12/2025-09-22-13-52-57.png)

When you hover over the field name, a drag sort icon will appear at the end of the row. Click the drag icon and drag the field up and down to sort.

### Delete Parse Fields {#delete-parse-fields}

The component will by default select all fields except primary keys as parsing fields. If developers feel there are too many fields, they can delete fields that don't need parsing. The component will automatically update the data template based on the selected field names and order.

![](./img/12/2025-09-22-14-00-24.png)

Hover over the field name and click the delete icon on the far right.


### Create Custom Buttons {#create-custom-buttons}

Developers can add custom buttons to the parsing page to perform other custom operations after parsing is complete. For example: performing secondary processing on the parsed data.

![](./img/12/2025-09-22_14-06-37.gif)

Click the `+` to the right of `Button`, click `Bottom Button`, set the button name, icon, type, and color attributes in the popup, then click OK.

The page effect is as follows:

![](./img/12/2025-09-22-14-23-37.png)


### Post-parse Events {#post-parse-events}

Developers can configure data processing logic in the `Post-parse` event, such as updating the parsed username to a form component:

![](./img/12/2025-09-22-14-59-11.png)

![](./img/12/2025-09-22-15-08-21.png)

The current example main page is a form component:

![](./img/12/2025-09-22-15-04-02.png)

Usage effect:

![](./img/12/2025-09-22_15-05-01.gif)