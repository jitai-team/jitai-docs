---
slug: disk-storage
---
# Disk Storage

Disk Storage is a storage service based on the local file system, providing high-speed file read/write capabilities and direct file path access. It is suitable for small applications, development environments, and internal system deployments with high data security requirements. Disk Storage supports file upload, download, delete, preview, and thumbnail generation functions, with built-in MIME type recognition and error handling mechanisms.

The Disk Storage element has a hierarchical structure of Meta (storages.Meta) → Type (storages.DiskType) → Instance. Developers can quickly create disk storage instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official storages.DiskType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
└── MyDiskStorage/                    # Storage element name, customizable
    ├── e.json                        # Element definition file
    └── MyDiskStorage.json           # Business configuration file
```

#### e.json File
```json title="Element Definition Configuration"
{
  "title": "My Disk Storage",
  "type": "storages.DiskType",
  "backendBundleEntry": "."
}
```

#### Business Configuration File
```json title="MyDiskStorage.json"
{
  "directory": "appData/storages/MyDiskStorage"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get disk storage instance
storage = app.getElement("storages.MyDiskStorage")

# Upload file
with open("test.txt", "rb") as file:
    result = storage.uploadByFile("test.txt", file.read(), "text/plain")
    print(result['url'])  # Returns file access URL

# Download file
response = storage.download("test.txt")

# Delete file
storage.delete("test.txt")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Storage element display name |
| type | string | Yes | Fixed value: "storages.DiskType" |
| backendBundleEntry | string | Yes | Fixed value: "." |

### Business Configuration File Configuration
The business configuration file name must be the same as the element name and contains the following configuration items:

| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| directory | string | Yes | Storage directory path. Can be relative path (relative to application directory) or absolute path |

**Path Description:**
- Relative path: `appData/storages/MyStorage` → `Application Directory/appData/storages/MyStorage`
- Absolute path: `/data/files` → Use absolute path directly

## Methods
### uploadByFile
Upload file to disk storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name, including extension |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | MIME type, defaults to "application/octet-stream" |

#### Return Value
Returns a dictionary containing file access URL:
```python
{
    "url": "http://domain/storages/services/StorageSvc/preview?file=filename.txt"
}
```

#### Usage Example
```python title="File Upload Example"
storage = app.getElement("storages.MyDiskStorage")

# Upload text file
with open("document.txt", "rb") as file:
    result = storage.uploadByFile("document.txt", file.read(), "text/plain")
    
# Upload image file
with open("image.jpg", "rb") as file:
    result = storage.uploadByFile("image.jpg", file.read(), "image/jpeg")
```

### download
Download specified file.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File name to download |

#### Return Value
Returns Flask Response object containing file content and correct MIME type headers.

#### Usage Example
```python title="File Download Example"
storage = app.getElement("storages.MyDiskStorage")

# Download file
response = storage.download("document.txt")
# Response will automatically set correct Content-Type and download headers
```

### delete
Delete specified file.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name to delete |

#### Usage Example
```python title="File Delete Example"
storage = app.getElement("storages.MyDiskStorage")

# Delete file
storage.delete("document.txt")
```

### preview
Preview specified file, supports direct display in browser.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File name to preview |

#### Return Value
Returns Flask Response object set to inline display mode.

#### Usage Example
```python title="File Preview Example"
storage = app.getElement("storages.MyDiskStorage")

# Preview file
response = storage.preview("image.jpg")
# Image will be displayed directly in browser
```

### previewThumbnail
Generate and return file thumbnail, mainly for image files.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Image file name |
| width | Numeric | int | No | Thumbnail width, defaults to 120 pixels |
| height | Numeric | int | No | Thumbnail height, defaults to 120 pixels |

#### Return Value
Returns Flask Response object of thumbnail. If thumbnail doesn't exist, it will be automatically generated and cached.

#### Usage Example
```python title="Thumbnail Generation Example"
storage = app.getElement("storages.MyDiskStorage")

# Generate default size thumbnail
thumbnail = storage.previewThumbnail("photo.jpg")

# Generate specified size thumbnail
thumbnail = storage.previewThumbnail("photo.jpg", 200, 150)
```

## Attributes
### rootDir
Read-only attribute, returns the absolute path of the storage root directory.

### name
Read-only attribute, returns the fullName of the storage element.

## Advanced Features
### Automatic Directory Creation
Disk Storage automatically creates required directory structure when uploading files:

```python title="Nested Directory File Upload"
storage = app.getElement("storages.MyDiskStorage")

# Upload to subdirectory, directory will be automatically created
with open("doc.pdf", "rb") as file:
    result = storage.uploadByFile("documents/2024/doc.pdf", file.read())
```

### Automatic MIME Type Recognition
The system has built-in rich MIME type mapping, supporting automatic recognition of hundreds of file formats:

```python title="MIME Type Processing"
storage = app.getElement("storages.MyDiskStorage")

# System will automatically set correct MIME type based on file extension
storage.uploadByFile("video.mp4", video_data)  # Automatically recognized as video/mp4
storage.uploadByFile("document.pdf", pdf_data)  # Automatically recognized as application/pdf
```

### Thumbnail Caching Mechanism
Generated thumbnails are saved on disk to avoid repeated generation:

```python title="Thumbnail Caching Strategy"
storage = app.getElement("storages.MyDiskStorage")

# First call will generate thumbnail file: image_120_120.jpg
thumbnail1 = storage.previewThumbnail("image.jpg", 120, 120)

# Subsequent calls directly return already generated thumbnail
thumbnail2 = storage.previewThumbnail("image.jpg", 120, 120)
```

### Permission Error Handling
When directory permissions are insufficient, the system throws friendly error messages:

```python title="Permission Error Handling"
try:
    storage.uploadByFile("test.txt", b"content")
except Exception as e:
    # Will display relative path instead of complete system path
    print(f"Permission error: {e}")
```