---
slug: word-template
title: "Word Template Reference"
description: "Word Template Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Word Template"
---
# Word Template

Word Template is specifically designed for generating and processing Word format documents, implemented using the Jinja2 template engine for dynamic document generation. It handles Word document template rendering, variable replacement, and complex content filling, supporting dynamic processing of various elements such as text, images, tables, and links. It is suitable for batch generation of formal documents like contracts, reports, and official documents.

The Word Template element has a hierarchical structure of Meta (fileTmpls.Meta) → Type (fileTmpls.WordType) → Instance. Developers can quickly create Word template instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official fileTmpls.WordType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
fileTmpls/
└── testWordTemplate/
    ├── e.json
    ├── testWordTemplate.json
    └── templateFile.docx
```

#### e.json File
```json title="Basic Configuration File"
{
  "title": "Test Word Template",
  "type": "fileTmpls.WordType",
  "frontBundleEntry": "testWordTemplate.json",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="testWordTemplate.json"
{
  "dataList": [
    {
      "name": "name",
      "title": "Name",
      "dataType": "Stext"
    },
    {
      "name": "company",
      "title": "Company Name", 
      "dataType": "Stext"
    },
    {
      "name": "date",
      "title": "Signing Date",
      "dataType": "Date"
    }
  ],
  "files": {
    "fileName": "contract_template.docx"
  }
}
```

#### Usage Example
```python title="Word Template Rendering Example"
# Get Word template element
template = app.getElement("fileTmpls.testWordTemplate")

# Prepare rendering data
context = {
    "name": "Zhang San",
    "company": "ABC Technology Co., Ltd.",
    "date": "2024-01-15"
}

# Render and generate Word document
result = template.render(context)

# result is a BytesIO object that can be saved or downloaded
with open("generated_document.docx", "wb") as f:
    f.write(result.getvalue())
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Template display name |
| type | string | Yes | Fixed value "fileTmpls.WordType" |
| frontBundleEntry | string | Yes | Business configuration file path |
| backendBundleEntry | string | Yes | Backend entry, usually "." |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| dataList | array | Yes | Template variable definition list |
| files | object | Yes | Template file configuration |

#### dataList Configuration Items
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| name | string | Yes | Variable name |
| title | string | Yes | Variable display name |
| dataType | string | Yes | Data type (Stext, Date, Numeric, etc.) |

#### files Configuration Items
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| fileName | string | Yes | Word template file name |
| url | string | No | Template file URL (compatible with old versions) |

## Methods
### render
Renders data through Word template to generate the final document.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| context | JitDict | dict | Yes | Rendering data dictionary |
| elemName | Stext | str | No | Element name, used for internal processing |

#### Return Value
Returns a BytesIO object containing the generated Word document binary data.

#### Usage Example
```python title="Basic Rendering Example"
template = app.getElement("fileTmpls.contractTemplate")

# Prepare context data
context = {
    "customerName": "Zhang San",
    "contractNo": "CT2024001",
    "amount": 100000,
    "signDate": "2024-01-15"
}

# Execute rendering
document = template.render(context)

# Save document
with open("contract.docx", "wb") as f:
    f.write(document.getvalue())
```

### handleContext
Processes and converts rendering context data, transforming frontend data into a format recognizable by Jinja2 templates.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| context | JitDict | dict | Yes | Original context data |
| elemName | Stext | str | Yes | Element full name |

#### Return Value
Returns the processed context data dictionary.

### getTemplateDt
Gets the data type mapping defined in the template.

#### Return Value
Returns a data type mapping dictionary where keys are variable names and values are corresponding data type processing classes.

## Attributes
### templateFile
Gets the template file binary stream object, supporting retrieval from local files or URLs.

```python title="Access Template File"
template = app.getElement("fileTmpls.myTemplate")
file_stream = template.templateFile
```

### config
Gets the complete configuration information of the template, including dataList, files, and other configuration items.

```python title="Access Configuration Information"
template = app.getElement("fileTmpls.myTemplate")
data_list = template.config.get("dataList", [])
```

### dtMap
Gets the template data type mapping table, used for data type conversion and validation.

## Advanced Features
### Complex Content Support
Word templates support dynamic generation of various complex content:

```python title="Complex Content Rendering Example"
template = app.getElement("fileTmpls.advancedTemplate")

context = {
    "title": "Project Report",
    "content": "This is a document containing various elements",
    # Image URL, use ToPictureFileTmpls: marker in template
    "chartImage": "https://example.com/chart.png",
    # Hyperlink, use ToLinkFileTmpls: marker in template  
    "projectLink": "Project URL: https://github.com/project",
    # QR code data, use <image: marker in template
    "qrcode": {
        "image": "base64 encoded image data",
        "width": 3,
        "height": 3
    }
}

document = template.render(context)
```

### Table Cell Image Processing
Templates support dynamically inserting images in table cells, automatically adapting to cell dimensions:

```json title="Table Image Configuration"
{
  "dataList": [
    {
      "name": "productImage",
      "title": "Product Image",
      "dataType": "Stext"
    }
  ]
}
```

```python title="Table Image Rendering"
context = {
    "productImage": "ToPictureFileTmpls:https://example.com/product.jpg"
}

document = template.render(context)
```

### Template File Creation Recommendations
1. **Variable Markers**: Use `{{variable_name}}` markers in Word templates to mark content that needs to be replaced
2. **Image Markers**: Use `ToPictureFileTmpls:image_url` markers to mark image positions
3. **Link Markers**: Use `ToLinkFileTmpls:display_text: URL` markers to mark hyperlinks
4. **Preserve Formatting**: When creating templates, pay attention to maintaining the original format and styles of the Word document