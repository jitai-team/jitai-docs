---
slug: aws-s3-storage
title: "AWS S3 Storage Reference"
description: "AWS S3 Storage Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "AWS S3 Storage"
---
# AWS S3 Storage
AWS S3 Storage is a Type element for global cloud storage, implementing massive data storage, global CDN acceleration, and enterprise-level security management based on Amazon Simple Storage Service. It provides standardized file upload, download, and delete operations, integrates AWS ecosystem access control and permission management, supports multiple storage types and data backup strategies, ensuring data security and high availability.

The AWS S3 storage element hierarchy is Meta (storages.Meta) → Type (storages.AwsS3Type) → Instance. Developers can quickly create AWS S3 storage instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or override the storages.AwsS3Type element officially provided by JitAI in their own applications to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
├── MyS3/                      # Custom instance element name
│   ├── e.json                 # Element declaration file
│   └── MyS3.json             # AWS S3 configuration file
```

#### e.json File
```json title="Basic Configuration"
{
  "title": "My AWS S3 Storage",
  "type": "storages.AwsS3Type",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="AWS S3 Connection Configuration"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_secret_access_key", 
  "endPoint": "s3.amazonaws.com",
  "bucketName": "your_bucket_name",
  "region": "us-east-1"
}
```

#### Usage Example
```python title="Basic Usage"
# Get AWS S3 storage instance
s3 = app.getElement("storages.MyS3")

# Upload file
with open("example.txt", "rb") as file:
    result = s3.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"Upload successful, URL: {result['url']}")

# Download file
file_data = s3.download("folder/example.txt")

# Delete file
s3.delete("folder/example.txt")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| title | string | Yes | Storage element display name |
| type | string | Yes | Fixed value: storages.AwsS3Type |
| backendBundleEntry | string | Yes | Fixed value: "." |
| variables | array | No | Custom variable configuration, usually empty array |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| accessKeyId | string | Yes | AWS access key ID |
| accessKeySecret | string | Yes | AWS access key secret |
| endPoint | string | Yes | S3 service access domain, e.g.: s3.amazonaws.com |
| bucketName | string | Yes | S3 bucket name |
| region | string | Yes | AWS region code, e.g.: us-east-1, us-west-2, etc. |

## Methods 
### uploadByFile
Upload file to AWS S3 storage.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| name | Stext | str | Yes | Storage file path name |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | File MIME type, defaults to "application/octet-stream" |

#### Return Value
Returns dictionary containing upload result, with url field indicating file access address.

#### Usage Example
```python title="File Upload"
# Upload image file
with open("avatar.jpg", "rb") as file:
    result = s3.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# Upload document file
with open("document.pdf", "rb") as file:
    result = s3.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
```

### getSignUrl
Get pre-signed access URL for files, used for temporary access permission control.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | Stext | str | Yes | File path name |
| contentType | Stext | str | Yes | File MIME type |
| expires | Numeric | int | No | Expiration time (seconds), defaults to 300 seconds |

#### Return Value
Returns pre-signed URL string.

#### Usage Example
```python title="Get Pre-signed URL"
# Get temporary access URL for image
temp_url = s3.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# Get temporary download URL for document
download_url = s3.getSignUrl("docs/document.pdf", "application/pdf")
```

### download
Download file data.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| name | Stext | str | Yes | File path name to download |

#### Return Value
Returns file binary data.

#### Usage Example
```python title="File Download"
# Download file
file_data = s3.download("docs/document.pdf")

# Save to local
with open("downloaded_document.pdf", "wb") as file:
    file.write(file_data)
```

### getObject
Get file object information.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| name | Stext | str | Yes | File path name |

#### Return Value
Returns file object information.

#### Usage Example
```python title="Get File Information"
# Get file object
file_obj = s3.getObject("users/avatar.jpg")
```

### delete
Delete specified file.

#### Parameter Details
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| name | Stext | str | Yes | File path name to delete |

#### Return Value
Returns delete operation result.

#### Usage Example
```python title="File Deletion"
# Delete user avatar
s3.delete("users/avatar.jpg")

# Delete temporary file
s3.delete("temp/upload_cache.tmp")
```

## Advanced Features
### Exception Handling Mechanism
AWS S3 storage has built-in comprehensive exception handling mechanism, all methods automatically catch and convert exceptions.

```python title="Exception Handling Example"
try:
    s3.uploadByFile("test.txt", b"test data", "text/plain")
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
        result = s3.uploadByFile(f"batch/{name}", data, content_type)
        print(f"Upload successful: {name}")
    except Exception as e:
        print(f"Upload failed {name}: {e}")
```

### Cross-Region Access
```python title="Cross-Region Configuration"
# AWS S3 supports multi-region storage, you can choose the best region based on business needs
# Different regions can be specified in the configuration file:
# "region": "us-west-2"  # US West
# "region": "eu-west-1"  # Europe West
# "region": "ap-northeast-1"  # Asia Pacific Northeast (Tokyo)
```

### Storage Type Optimization
```python title="Storage Type Configuration"
# AWS S3 provides multiple storage types for different access patterns:
# - Standard: Frequently accessed data
# - Infrequent Access (IA): Infrequently accessed data
# - Glacier: Archive storage
# - Deep Archive: Deep archive

# Storage type can be specified during upload
def upload_with_storage_class(name, data, storage_class="STANDARD"):
    # Actual implementation may require additional parameter support
    return s3.uploadByFile(name, data, "application/octet-stream")
```

### Security Best Practices
```python title="Security Configuration Recommendations"
# 1. Use IAM roles instead of hardcoded keys
# 2. Enable S3 bucket versioning
# 3. Configure appropriate bucket policies
# 4. Use pre-signed URLs for temporary access
# 5. Regularly rotate access keys

# Use environment variables to store sensitive information
import os
config = {
    "accessKeyId": os.getenv("AWS_ACCESS_KEY_ID"),
    "accessKeySecret": os.getenv("AWS_SECRET_ACCESS_KEY"),
    "region": os.getenv("AWS_REGION", "us-east-1")
}
```
