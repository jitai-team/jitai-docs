---
sidebar_position: 5
slug: markdown-page
---

# Markdown Page
Markdown Page is a page type specifically designed for Markdown document display, implementing document rendering capabilities based on the Python markdown library. It is responsible for converting Markdown content to HTML display, providing features such as code highlighting and table rendering, suitable for content display scenarios such as technical documentation, product descriptions, help manuals, and knowledge bases.

The Markdown Page element hierarchy is Meta (pages.Meta) → Type (pages.MarkdownPageType) → Instance. Developers can quickly create Markdown page instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official pages.MarkdownPageType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
MyDocPage/                # Page element name (path can be customized)
├── e.json               # Element configuration file
└── index.md            # Markdown content file
```

#### e.json File
```json title="e.json Configuration Example"
{
  "title": "Product Usage Documentation",
  "type": "pages.MarkdownPageType",
  "backendBundleEntry": "."
}
```

#### Markdown Content File
```markdown title="index.md Content Example"
# Product Help Documentation
## Main Features
| Feature Module | Description |
|----------------|-------------|
| User Management | User registration, login, permission control |
| Data Analysis | Data statistics, chart display |
| File Management | File upload, download, preview |

## Quick Start
1. Login to the system
2. Select feature module  
3. Follow the prompts

For more detailed instructions, please refer to the specific documentation for each feature module.
```

#### Usage Example
```python title="Page Usage Example"
# Get Markdown page element
doc_page = app.getElement("pages.MyDocPage")

# Convert to HTML for display
html_content = doc_page.toHtml()

# Get basic page information
print(f"Page title: {doc_page.title}")
print(f"Page name: {doc_page.fullName}")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Native Type | Required | Description |
|-------------------|------|-------------|----------|-------------|
| title | string | string | Yes | Page title for display and identification |
| type | string | string | Yes | Fixed value: pages.MarkdownPageType |
| backendBundleEntry | string | string | Yes | Backend entry path, usually set to "." |

### Use Cases
Markdown Page is suitable for the following business scenarios:

- **Help Documentation**: Product usage instructions, operation guides
- **Announcements**: System announcements, version update notices
- **API Documentation**: Interface descriptions, parameter documentation
- **Rules and Regulations**: Company policies, process standards
- **Knowledge Base**: Technical documentation, experience sharing

## Methods
### toHtml
Convert Markdown content to HTML format.

#### Return Value
- **Type**: string
- **Description**: Converted HTML content

#### Usage Example
```python title="HTML Conversion Example"
page = app.getElement("pages.MyDocPage")
html_output = page.toHtml()

# HTML content can be used for display or further processing
print(html_output)
```

### subscribeEvent
Subscribe to page events, inherited from BasePage.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| messageName | string &#124; symbol | string &#124; symbol | Yes | Event name |
| callback | Function | function | Yes | Event callback function |

#### Return Value
- **Type**: string
- **Description**: Event handler ID

### publishEvent
Publish page events, inherited from BasePage.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| messageName | string &#124; symbol | string &#124; symbol | Yes | Event name |
| ex | JitDict | Record&lt;string, any&gt; | No | Event additional data |

### newVariable
Create data variable, inherited from BasePage.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| varConfig | JitDict | Record&lt;string, any&gt; | Yes | Variable configuration object |
| value | - | any | No | Variable initial value |

#### Return Value
- **Type**: Variable
- **Description**: Variable instance

### newComponent
Create component instance, inherited from BasePage.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| type | string | string | Yes | Component type identifier |
| createCompConfig | JitDict | Record&lt;string, any&gt; | Yes | Component creation configuration |

#### Return Value
- **Type**: Component
- **Description**: Component instance

### destroy
Destroy page instance, inherited from BasePage.

#### Usage Example
```python title="Page Destruction Example"
page = app.getElement("pages.MyDocPage")

# Destroy page after use
page.destroy()
```

### getVariableValue
Get variable value, inherited from BasePage.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| varName | string &#124; Variable | string &#124; object | Yes | Variable name or variable object |

#### Return Value
- **Type**: any
- **Description**: Current value of the variable

## Properties
### content
Original Markdown content.

- **Type**: string
- **Description**: Markdown source code content of the page
- **Access**: Read-only

### title
Page title.

- **Type**: string  
- **Description**: Page display title
- **Access**: Read-only

### fullName
Complete page name.

- **Type**: string
- **Description**: Complete identifier of the page element
- **Access**: Read-only

### name
Page name.

- **Type**: string
- **Description**: Short name of the page element
- **Access**: Read-only

## Advanced Features
### Dynamic Content Processing
Generate Markdown content dynamically based on business data:

```python title="Dynamic Document Generation"
# Dynamically generate user manual
def generate_user_manual(user_role):
    if user_role == "admin":
        content = "# Administrator Manual\n\n## User Management\n- Add users\n- Delete users"
    else:
        content = "# User Manual\n\n## Basic Operations\n- View data\n- Export reports"
    
    # Create temporary Markdown page
    return create_temp_markdown_page(content)
```

### Display Documents in Modal
The most common usage pattern is to display help documents in popup windows:

```python title="Modal Document Display"
def show_help_document(doc_name):
    # Get document page
    doc_page = app.getElement(f"pages.{doc_name}")
    html_content = doc_page.toHtml()
    
    # Display in Modal
    modal = page.newComponent("components.Modal", {
        "title": "Help Documentation",
        "content": html_content,
        "width": "800px",
        "height": "600px"
    })
    return modal

# Call in button click event
help_button.onClick = lambda: show_help_document("UserGuide")
```

### Use as Static Page
Display directly as an independent page in the portal:

```python title="Portal Page Configuration"
# Add document pages to portal configuration
portal_config = {
    "pages": [
        {"name": "Help Center", "page": "pages.HelpCenter"},
        {"name": "User Guide", "page": "pages.UserGuide"},
        {"name": "API Documentation", "page": "pages.ApiDocs"}
    ]
}
```

### Integration with Table Components
Embed instruction documents in AI data management pages:

```python title="Table Page Integration"
# Display operation instructions at the top of AI data management page
instruction_page = app.getElement("pages.DataInstructions")
instruction_html = instruction_page.toHtml()

# Add to page header
page_header = page.newComponent("components.Container", {
    "content": instruction_html,
    "style": {"marginBottom": "20px"}
})
```

## FAQ
**Q: When should I use Markdown Page instead of generic pages?**
A: Use Markdown Page when you need to display static document content, such as help documentation, operation guides, etc. For dynamic interactive features, use generic pages.

**Q: How to dynamically update Markdown page content?**
A: Markdown page content comes from the index.md file. You need to modify the file content and reload the page element.

**Q: Can I embed other components in Markdown pages?**
A: No. Markdown pages can only render static content. For dynamic components, use generic pages with Modal display.

**Q: How to add Markdown pages to portal navigation?**
A: Add the page element's fullName to the pages array in the portal configuration.
