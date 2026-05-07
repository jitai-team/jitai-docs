---
slug: aliyun-oss-storage
title: "Aliyun OSS Storage Reference"
description: "Aliyun OSS Storage Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Aliyun OSS Storage"
---
# Aliyun OSS Storage

Aliyun OSS Storage is a Type element for enterprise-level cloud storage, implemented based on Alibaba Cloud Object Storage Service for massive data storage, global CDN acceleration, and enterprise-level security control. It provides standardized file upload, download, and delete operations, integrates with Alibaba Cloud ecosystem's access control and permission management, supports multiple storage types and data backup strategies, ensuring data security and high availability.

The Aliyun OSS Storage element has a hierarchical structure of Meta (storages.Meta) → Type (storages.OssType) → Instance. Developers can quickly create Aliyun OSS storage instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official storages.OssType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
├── MyOss/                     # Custom instance element name
│   ├── e.json                 # Element declaration file
│   └── MyOss.json            # Aliyun OSS configuration file
```

#### e.json File
```json title="Basic Configuration"
{
  "title": "My Aliyun OSS Storage",
  "type": "storages.OssType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="Aliyun OSS Connection Configuration"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_access_key_secret", 
  "endPoint": "oss-cn-hangzhou.aliyuncs.com",
  "bucketName": "your_bucket_name"
}
```

#### Usage Example
```python title="Basic Usage"
# Get Aliyun OSS storage instance
oss = app.getElement("storages.MyOss")

# Upload file
with open("example.txt", "rb") as file:
    result = oss.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"Upload successful, URL: {result['url']}")

# Download file
file_data = oss.download("folder/example.txt")

# Delete file
oss.delete("folder/example.txt")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Storage element display name |
| type | string | Yes | Fixed value: storages.OssType |
| backendBundleEntry | string | Yes | Fixed value: "." |
| variables | array | No | Custom variable configuration, usually empty array |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| accessKeyId | string | Yes | Alibaba Cloud access key ID |
| accessKeySecret | string | Yes | Alibaba Cloud access key secret |
| endPoint | string | Yes | OSS service access domain, e.g.: oss-cn-hangzhou.aliyuncs.com |
| bucketName | string | Yes | OSS bucket name |

## Methods
### uploadByFile
Upload file to Aliyun OSS storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | Storage file path name |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | File MIME type, defaults to "application/octet-stream" |

#### Return Value
Returns a dictionary containing upload results, including url field representing file access address.

#### Usage Example
```python title="File Upload"
# Upload image file
with open("avatar.jpg", "rb") as file:
    result = oss.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# Upload document file
with open("document.pdf", "rb") as file:
    result = oss.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
```

### getSignUrl
Get pre-signed access URL for file, used for temporary access permission control.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File path name |
| contentType | Stext | str | Yes | File MIME type |
| expires | Numeric | int | No | Expiration time (seconds), defaults to 300 seconds |

#### Return Value
Returns pre-signed URL string.

#### Usage Example
```python title="Get Pre-signed URL"
# Get temporary access URL for image
temp_url = oss.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# Get temporary download URL for document
download_url = oss.getSignUrl("docs/document.pdf", "application/pdf")
```

### download
Download file data.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path name to download |

#### Return Value
Returns file binary data.

#### Usage Example
```python title="File Download"
# Download file
file_data = oss.download("docs/document.pdf")

# Save to local
with open("downloaded_document.pdf", "wb") as file:
    file.write(file_data)
```

### getObject
Get file object information.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path name |

#### Return Value
Returns file object information.

#### Usage Example
```python title="Get File Information"
# Get file object
file_obj = oss.getObject("users/avatar.jpg")
```

### delete
Delete specified file.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path name to delete |

#### Return Value
Returns delete operation result.

#### Usage Example
```python title="File Delete"
# Delete user avatar
oss.delete("users/avatar.jpg")

# Delete temporary file
oss.delete("temp/upload_cache.tmp")
```

## Advanced Features
### Exception Handling Mechanism
Aliyun OSS Storage has built-in comprehensive exception handling mechanism, all methods automatically catch and convert exceptions.

```python title="Exception Handling Example"
try:
    oss.uploadByFile("test.txt", b"test data", "text/plain")
except Exception as e:
    # Exception will contain detailed error information, including storage type, element name, etc.
    print(f"Upload failed: {e}")
```

### Batch Operations
```python title="Batch File Management"
# Batch upload files
files = [
    ("file1.txt", b"content1", "text/plain"),
    ("file2.txt", b"content2", "text/plain")
]

for name, data, content_type in files:
    try:
        result = oss.uploadByFile(f"batch/{name}", data, content_type)
        print(f"Upload successful: {name}")
    except Exception as e:
        print(f"Upload failed {name}: {e}")
```

### Large File Processing
```python title="Large File Upload"
# Read large file in chunks
def upload_large_file(file_path, remote_path):
    with open(file_path, "rb") as file:
        file_data = file.read()
        return oss.uploadByFile(remote_path, file_data, "application/octet-stream")

# Usage example
result = upload_large_file("large_video.mp4", "videos/large_video.mp4")
```