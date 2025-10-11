---
sidebar_position: 3
slug: generating-and-printing-files-using-file-templates
---

# Generating and Printing Files Using File Templates {#generating-and-printing-files-using-file-templates}

After file templates are created, you can generate and print files by calling the print service. This document describes how to use created file templates to generate and print Word documents and Excel documents.

## Printing Word templates {#print-word-template}

![Print Word Template Interface](./img/2/2025-08-29-17-09-46.png "Print Word Template Interface")

The **data model** used by the print service function must be consistent with the **target data table** of the template variables.

Print services are generally called in **button** events:

![Print Service Configuration](./img/2/2025-08-29_11-03-18.gif "Print Service Configuration")

1. In the event editing area, click "Please select" in the statement, select the "Print File Template" option under "Utility Functions" in the popup window, which will generate Utility Functions.Print File Template.
2. Click the `Set Parameters` button of Utility Functions.Print File Template, and set the template type, file template, and assign values to template variables in the popup dialog.

The configured parameters are shown below:

![Configured Parameters](./img/2/2025-08-29-11-05-36.png "Configured Parameters")

The usage effect is shown below:

![Usage Effect](./img/2/2025-08-29_11-10-51.gif "Usage Effect")

## Printing Excel templates {#print-excel-template}

Create a button in the component that needs to call template printing.

![Create Print Button](./img/2/2025-08-29-16-35-09.png "Create Print Button")

Configure button events:

![Configure Button Events](./img/2/2025-08-29_16-36-33.gif "Configure Button Events")

1. In the event editing area, click "Please select" in the statement, select the "Print File Template" option under "Utility Functions" in the popup window, which will generate Utility Functions.Print File Template.
2. Click the `Set Parameters` button of Utility Functions.Print File Template, and set the template type, file template, and assign values to template variables in the popup dialog.

Finally, verify the template printing effect:

![Template Printing Effect](./img/2/2025-08-29_16-43-13.gif "Template Printing Effect")