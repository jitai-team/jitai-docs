---
sidebar_position: 3
slug: generating-and-printing-files-using-file-templates
---

# Generating and Printing Files Using File Templates

After file templates are created, you can generate and print files by calling the print service. This document describes how to use created file templates to generate and print Word documents and Excel documents.

## Printing Word Templates {#print-word-template}
![](./img/2/2025-08-29-17-09-46.png)

The **data model** used by the print service function must be consistent with the **target data table** of the template variables.

Print services are generally called in **button** events:

![](./img/2/2025-08-29_11-03-18.gif)

1. In the event editing area, click "Please select" in the statement, select the "Print File Template" option under "Utility Functions" in the popup window, which will generate Utility Functions.Print File Template.
2. Click the `Set Parameters` button of Utility Functions.Print File Template, and set the template type, file template, and assign values to template variables in the popup dialog.

The configured parameters are shown below:

![](./img/2/2025-08-29-11-05-36.png)

The usage effect is shown below:

![](./img/2/2025-08-29_11-10-51.gif)

## Printing Excel Templates {#print-excel-template}
Create a button in the component that needs to call template printing.

![](./img/2/2025-08-29-16-35-09.png)

Configure button events:

![](./img/2/2025-08-29_16-36-33.gif)

1. In the event editing area, click "Please select" in the statement, select the "Print File Template" option under "Utility Functions" in the popup window, which will generate Utility Functions.Print File Template.
2. Click the `Set Parameters` button of Utility Functions.Print File Template, and set the template type, file template, and assign values to template variables in the popup dialog.

Finally, verify the template printing effect:

![](./img/2/2025-08-29_16-43-13.gif)