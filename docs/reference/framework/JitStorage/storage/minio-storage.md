---
slug: minio-storage
title: "MinIO Storage Reference"
description: "MinIO Storage Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "MinIO Storage"
---
# MinIO Storage

MinIO Storage is an open-source private cloud object storage service, implemented based on S3-compatible API for high-performance storage management of massive unstructured data. It handles file upload, download, delete, and signed URL generation, supports distributed deployment and data sharding, suitable for enterprise private cloud environments requiring data localization management.

The MinIO Storage element has a hierarchical structure of Meta (storages.Meta) → Type (storages.MinioType) → Instance. Developers can quickly create MinIO storage instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official storages.MinioType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
└── MyMinioStorage/          # Storage element name (customizable)
    ├── e.json              # Element configuration file
    └── MyMinioStorage.json # Business configuration file (same name as directory)
```

#### e.json File
```json title="e.json Configuration Example"
{
  "title": "My MinIO Storage",
  "type": "storages.MinioType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="MyMinioStorage.json Configuration Example"
{
  "accessKeyId": "your-access-key",
  "accessKeySecret": "your-secret-key",
  "scheme": "https",
  "endPoint": "minio.example.com:9000",
  "bucketName": "my-bucket"
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get MinIO storage instance
storage = app.getElement("storages.MyMinioStorage")

# Upload file
with open("test.txt", "rb") as file:
    result = storage.uploadByFile("test.txt", file.read(), "text/plain")
    print(f"Upload successful, URL: {result['url']}")

# Download file
file_data = storage.download("test.txt")

# Delete file
storage.delete("test.txt")
```

## Element Configuration
### e.json Configuration
| Property Name | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Storage element display name |
| type | string | Yes | Fixed value: storages.MinioType |
| backendBundleEntry | string | Yes | Fixed value: "." |
| variables | array | No | Extended variable configuration, usually empty array |

### Business Configuration File Configuration
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| accessKeyId | string | Yes | MinIO access key ID |
| accessKeySecret | string | Yes | MinIO access key secret |
| endPoint | string | Yes | MinIO server address and port |
| bucketName | string | Yes | Bucket name |
| scheme | string | No | Protocol type, defaults to "http", optional "https" |

## Methods
### uploadByFile
Upload file to MinIO storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | File MIME type, defaults to "application/octet-stream" |

#### Return Value
Returns a dictionary containing upload results, format: `{"url": "file access URL"}`

#### Usage Example
```python title="File Upload Example"
storage = app.getElement("storages.MyMinioStorage")

# Upload text file
with open("document.txt", "rb") as file:
    result = storage.uploadByFile(
        name="document.txt",
        data=file.read(),
        contentType="text/plain"
    )
    print(f"File URL: {result['url']}")

# Upload image file
with open("image.jpg", "rb") as file:
    result = storage.uploadByFile(
        name="image.jpg",
        data=file.read(),
        contentType="image/jpeg"
    )
```

### download
Download file from MinIO storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name to download |

#### Return Value
Returns file binary data

#### Usage Example
```python title="File Download Example"
storage = app.getElement("storages.MyMinioStorage")

# Download file
file_data = storage.download("document.txt")

# Save to local
with open("downloaded_document.txt", "wb") as file:
    file.write(file_data)
```

### delete
Delete file from MinIO storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name to delete |

#### Return Value
Delete operation result information

#### Usage Example
```python title="File Delete Example"
storage = app.getElement("storages.MyMinioStorage")

# Delete file
result = storage.delete("document.txt")
print("File deleted successfully")
```

### getSignUrl
Generate pre-signed upload URL for file.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File name |
| contentType | Stext | str | Yes | File MIME type |
| expires | Numeric | int | No | Signature expiration time (seconds), defaults to 300 seconds |

#### Return Value
Returns a dictionary containing pre-signed URL and content type

#### Usage Example
```python title="Pre-signed URL Generation Example"
storage = app.getElement("storages.MyMinioStorage")

# Generate pre-signed URL
sign_result = storage.getSignUrl(
    file="upload.pdf",
    contentType="application/pdf",
    expires=600  # 10 minutes expiration
)
print(f"Pre-signed URL: {sign_result['url']}")
```

### getObject
Get file object from MinIO storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File name |

#### Return Value
Returns file object

#### Usage Example
```python title="Get File Object Example"
storage = app.getElement("storages.MyMinioStorage")

# Get file object
file_obj = storage.getObject("document.txt")
```

## Attributes
### config
Storage configuration information, containing configuration parameters such as accessKeyId, accessKeySecret, endPoint, bucketName, scheme.

### name
FullName identifier of storage instance.

### client
MinIO client instance, used for communicating with MinIO server.

### SIGN_EXPIRES
Default signature expiration time, value is 300 seconds.

## Advanced Features
### Environment Variable Support
MinIO Storage supports using environment variables in configuration files to achieve configuration isolation for different environments:

```json title="Environment Variable Configuration Example"
{
  "accessKeyId": "${MINIO_ACCESS_KEY}",
  "accessKeySecret": "${MINIO_SECRET_KEY}",
  "scheme": "${MINIO_SCHEME:-https}",
  "endPoint": "${MINIO_ENDPOINT}",
  "bucketName": "${MINIO_BUCKET}"
}
```

### Exception Handling
MinIO Storage provides specialized exception handling mechanism, automatically handling HTTP errors and storage operation exceptions:

```python title="Exception Handling Example"
storage = app.getElement("storages.MyMinioStorage")

try:
    result = storage.uploadByFile("test.txt", data, "text/plain")
except Exception as e:
    # Automatically handle 404 file not found, network errors, etc.
    print(f"Storage operation failed: {e}")
```

### Batch File Operations
```python title="Batch Operations Example"
storage = app.getElement("storages.MyMinioStorage")

# Batch upload files
files = ["file1.txt", "file2.txt", "file3.txt"]
for filename in files:
    with open(filename, "rb") as file:
        storage.uploadByFile(filename, file.read(), "text/plain")

# Batch delete files
for filename in files:
    storage.delete(filename)
```