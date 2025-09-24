---
slug: excel-template
---
# Excel Template

Excel Template element is an Excel document generation component based on the file template framework, implemented using openpyxl and Jinja2 template engine for dynamic Excel document generation. It handles Excel template parsing, data rendering, and special feature support (image embedding, hyperlinks, dropdown boxes, etc.), providing complete Excel output capabilities for enterprise-level report generation.

The Excel Template element has a hierarchical structure of Meta (fileTmpls.Meta) → Type (fileTmpls.ExcelType) → Instance. Developers can quickly create Excel template instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official fileTmpls.ExcelType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
ExcelReport/                    # Excel template instance element directory
├── e.json                      # Element definition file
├── ExcelReport.json            # Business configuration file
└── templateFile.xlsx           # Excel template file (optional)
```

#### e.json File
```json title="e.json File Example"
{
  "title": "Sales Report Template",
  "type": "fileTmpls.ExcelType",
  "frontBundleEntry": "ExcelReport.json",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="ExcelReport.json Example"
{
  "dataList": [
    {
      "name": "title",
      "title": "Report Title",
      "dataType": "Stext"
    },
    {
      "name": "salesData",
      "title": "Sales Data",
      "dataType": "RowList"
    },
    {
      "name": "logoImage",
      "title": "Company Logo",
      "dataType": "Stext"
    }
  ],
  "files": {
    "url": "https://example.com/template.xlsx",
    "fileName": "sales_template.xlsx"
  }
}
```

#### Usage Example
```python title="Usage Example"
# Get Excel template instance
excel_template = app.getElement("fileTmpls.ExcelReport")

# Prepare rendering data
context = {
    "title": "2024 Sales Report",
    "salesData": [
        {"product": "Product A", "sales": 10000, "region": "East China"},
        {"product": "Product B", "sales": 15000, "region": "South China"}
    ],
    "logoImage": "https://example.com/logo.png"
}

# Render Excel document
output_stream = excel_template.render(context, elemName="fileTmpls.ExcelReport")

# Save file
with open("sales_report.xlsx", "wb") as f:
    f.write(output_stream.read())
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Template display name |
| type | string | Yes | Fixed as "fileTmpls.ExcelType" |
| frontBundleEntry | string | Yes | Frontend configuration file path |
| backendBundleEntry | string | Yes | Backend entry path, usually "." |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| dataList | array | Yes | Data field definition list |
| files | object | No | Template file configuration |

#### dataList Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Field name, used as variable name in template |
| title | string | Yes | Field display title |
| dataType | string | Yes | Data type, supports Stext, Numeric, RowList, etc. |

#### files Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| url | string | No | Template file download URL |
| fileName | string | No | Template file name |

## Methods
### render
```python
def render(self, context, **kwargs)
```

Renders the Excel template to generate an Excel document containing data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| context | JitDict | dict | Yes | Rendering data context |
| elemName | Stext | str | Yes | Element fullName, passed through kwargs |

#### Return Value
Returns a BytesIO object containing the generated Excel file binary data.

#### Usage Example
```python title="Basic Rendering Example"
# Get template instance
template = app.getElement("fileTmpls.ExcelReport")

# Prepare data
data = {
    "reportTitle": "Monthly Sales Report",
    "reportDate": "2024-01",
    "dataRows": [
        {"name": "Zhang San", "sales": 50000, "target": 60000},
        {"name": "Li Si", "sales": 45000, "target": 50000}
    ]
}

# Render document
result = template.render(data, elemName="fileTmpls.ExcelReport")
```

## Attributes
Excel Template element inherits the following attributes from the base class:

### suffix
Excel file extension, fixed as "xlsx".

### templateFile
Template file binary stream object, automatically handles file retrieval and format checking.

### dtMap
Data type mapping dictionary, automatically generated based on dataList configuration, used for data type conversion.

## Advanced Features
### Image Embedding Functionality
Excel templates support embedding images in cells, including horizontal images and vertical image lists.

#### Configuration Example and Usage Example
```python title="Image Embedding Example"
# Use special markers in Excel template
# Cell content: ToPictureFileTmpls:{{imageUrl}}
# Or vertical images: ToListColumnPictureFileTmpls:{{imageList}}

# Rendering data
context = {
    "imageUrl": "https://example.com/image1.jpg,https://example.com/image2.jpg",
    "imageList": "https://example.com/img1.jpg,https://example.com/img2.jpg"
}

# Template will automatically download images and embed them in specified cells
result = template.render(context, elemName="fileTmpls.ImageTemplate")
```

### Hyperlink Support
Add clickable hyperlinks to Excel cells.

#### Configuration Example and Usage Example
```python title="Hyperlink Example"
# Excel template cell content: ToLinkFileTmpls:Visit Official Website:  https://example.com
# Automatically adds hyperlink to cell during rendering
context = {
    "companyUrl": "https://company.com"
}

result = template.render(context, elemName="fileTmpls.LinkTemplate")
```

### Dropdown Box Functionality
Add data validation dropdown boxes to Excel cells.

#### Configuration Example and Usage Example
```python title="Dropdown Box Example"
# Excel template cell content: ToSelectFileTmpls:Option1,Option2,Option3
# Cell will contain dropdown selection functionality after rendering
context = {
    "statusOptions": "Pending,Processing,Completed"
}

result = template.render(context, elemName="fileTmpls.SelectTemplate")
```

### Base64 Image Support
Directly embed Base64-encoded image data in templates.

#### Configuration Example and Usage Example
```python title="Base64 Image Example"
# Excel template cell content: <image:{"image":"base64 encoded data"}>

# Rendering data
context = {
    "chartImage": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
}

result = template.render(context, elemName="fileTmpls.ChartTemplate")
```

### Jinja2 Template Syntax Support
Excel templates support complete Jinja2 template syntax, allowing variables, loops, and conditional statements in cells.

#### Configuration Example and Usage Example
```python title="Jinja2 Syntax Example"
# Usage example in Excel template:
# Cell A1: {{title}}
# Cell A2: {% for item in dataList %}{{item.name}}{% endfor %}
# Cell A3: {% if total > 1000 %}Excellent{% else %}Good{% endif %}

context = {
    "title": "Sales Report",
    "dataList": [{"name": "Product A"}, {"name": "Product B"}],
    "total": 1500
}

result = template.render(context, elemName="fileTmpls.JinjaTemplate")
```

### Multi-Worksheet Support
Excel templates automatically handle template files containing multiple worksheets, applying the same rendering data to each worksheet.

#### Configuration Example and Usage Example
```python title="Multi-Worksheet Example"
# Template file contains multiple worksheets: Sales Data, Statistics Chart, Detail Report
# Each worksheet will use the same context data for rendering
context = {
    "year": "2024",
    "salesData": [...],
    "chartData": [...]
}

# All worksheets will be rendered
result = template.render(context, elemName="fileTmpls.MultiSheetTemplate")
```