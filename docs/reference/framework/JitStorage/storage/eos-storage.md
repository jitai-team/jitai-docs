---
slug: eos-storage
title: "EOS Storage Reference"
description: "EOS Storage Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "EOS Storage"
---
# EOS Storage

EOS Storage is an enterprise-level storage solution based on China Mobile Cloud EOS (Cloud Object Storage) service, providing high-performance and high-availability cloud storage capabilities. It supports large-scale data storage and high-concurrency access, specifically designed for file storage requirements of enterprise core business systems.

The EOS Storage element has a hierarchical structure of Meta (storages.Meta) → Type (storages.EosType) → Instance. Developers can quickly create EOS storage instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official storages.EosType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
└── myEosStorage/
    ├── e.json                    # Element definition file
    └── myEosStorage.json         # EOS configuration file
```

#### e.json File
```json title="e.json Configuration Example"
{
  "title": "My EOS Storage",
  "type": "storages.EosType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="myEosStorage.json Configuration Example"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_access_key_secret", 
  "endPoint": "eos-beijing-1.cmecloud.cn",
  "bucketName": "my-bucket"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get EOS storage instance
storage = app.getElement("storages.myEosStorage")

# Upload file
with open("/path/to/file.pdf", "rb") as f:
    file_data = f.read()
result = storage.uploadByFile("documents/file.pdf", file_data, "application/pdf")

# Download file
file_content = storage.download("documents/file.pdf")

# Delete file
storage.delete("documents/file.pdf")
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| title | str | Yes | Display name of storage instance |
| type | str | Yes | Fixed value: storages.EosType |
| backendBundleEntry | str | Yes | Fixed value: "." |
| variables | list | No | Variable configuration, usually empty list |

### Business Configuration File Configuration
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| accessKeyId | str | Yes | EOS access key ID |
| accessKeySecret | str | Yes | EOS access key secret |
| endPoint | str | Yes | EOS service endpoint address |
| bucketName | str | Yes | Bucket name |
| scheme | str | No | Access protocol, defaults to "https" |

## Methods
### uploadByFile
Upload file to EOS storage through file data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path name in storage |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | MIME type, defaults to "application/octet-stream" |

#### Return Value
Returns upload result information

#### Usage Example
```python title="File Upload Example"
storage = app.getElement("storages.myEosStorage")

# Upload PDF file
with open("/path/to/document.pdf", "rb") as f:
    pdf_data = f.read()
result = storage.uploadByFile("docs/document.pdf", pdf_data, "application/pdf")

# Upload image file
with open("/path/to/image.jpg", "rb") as f:
    img_data = f.read()
result = storage.uploadByFile("images/photo.jpg", img_data, "image/jpeg")
```

### getSignUrl
Get pre-signed URL for file, used for temporary access.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File path |
| contentType | Stext | str | Yes | File MIME type |
| expires | Numeric | int | No | Expiration time (seconds), defaults to 300 seconds |

#### Return Value
Returns pre-signed URL string

#### Usage Example
```python title="Get Signed URL Example"
storage = app.getElement("storages.myEosStorage")

# Get download link with 5-minute validity
url = storage.getSignUrl("docs/document.pdf", "application/pdf")

# Get download link with custom validity (1 hour)
url = storage.getSignUrl("images/photo.jpg", "image/jpeg", 3600)
```

### download
Download file content.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path to download |

#### Return Value
Returns file binary data

#### Usage Example
```python title="File Download Example"
storage = app.getElement("storages.myEosStorage")

# Download file
file_data = storage.download("docs/document.pdf")

# Save to local
with open("/local/path/document.pdf", "wb") as f:
    f.write(file_data)
```

### getObject
Get file object information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path |

#### Return Value
Returns file object information

#### Usage Example
```python title="Get Object Information Example"
storage = app.getElement("storages.myEosStorage")

# Get file object information
obj_info = storage.getObject("docs/document.pdf")
```

### delete
Delete specified file.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path to delete |

#### Return Value
Returns delete operation result

#### Usage Example
```python title="File Delete Example"
storage = app.getElement("storages.myEosStorage")

# Delete single file
result = storage.delete("docs/old_document.pdf")

# Batch delete files
files_to_delete = ["temp/file1.txt", "temp/file2.txt", "temp/file3.txt"]
for file_path in files_to_delete:
    storage.delete(file_path)
```

## Attributes
### SIGN_EXPIRES
Default signed URL expiration time, fixed value of 300 seconds.

### config
Storage configuration information, containing configuration parameters such as accessKeyId, accessKeySecret, endPoint, bucketName.

### name
FullName identifier of storage instance.

### client
EOS client instance, used for interacting with EOS service.

## Advanced Features
### Exception Handling Mechanism
EOS Storage has built-in comprehensive exception handling mechanism. All operation methods use `@exceptHandler` decorator for exception capture and conversion, transforming underlying exceptions into unified storage error codes.

```python title="Exception Handling Example"
from jit.errcode import Code

storage = app.getElement("storages.myEosStorage")

try:
    storage.uploadByFile("test.txt", b"test content", "text/plain")
except Code as e:
    # Handle business error codes
    print(f"Storage operation failed: {e}")
except Exception as e:
    # Handle other exceptions
    print(f"Unknown error: {e}")
```

### Environment Variable Support
Configuration files support using environment variables for dynamic configuration, suitable for different deployment environments:

```json title="Configuration Example Using Environment Variables"
{
  "accessKeyId": "${EOS_ACCESS_KEY_ID}",
  "accessKeySecret": "${EOS_ACCESS_KEY_SECRET}",
  "endPoint": "${EOS_ENDPOINT}",
  "bucketName": "${EOS_BUCKET_NAME}"
}
```

### File Path Management
It is recommended to use standardized file path naming for easy file organization and management:

```python title="File Path Management Example"
storage = app.getElement("storages.myEosStorage")

# Organize files by business module
storage.uploadByFile("user/avatars/user123.jpg", avatar_data, "image/jpeg")
storage.uploadByFile("documents/contracts/contract001.pdf", contract_data, "application/pdf")
storage.uploadByFile("exports/reports/monthly_report_2024_01.xlsx", report_data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

# Organize files by date
from datetime import datetime
date_path = datetime.now().strftime("%Y/%m/%d")
storage.uploadByFile(f"uploads/{date_path}/file.txt", file_data, "text/plain")
```