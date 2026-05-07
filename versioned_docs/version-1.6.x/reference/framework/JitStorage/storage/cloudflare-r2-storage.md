---
slug: cloudflare-r2-storage
title: "Cloudflare R2 Storage Reference"
description: "Cloudflare R2 Storage Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Cloudflare R2 Storage"
---
# Cloudflare R2 Storage
Cloudflare R2 Storage is a Type element for high-performance edge cloud storage, implementing global distributed data storage, zero egress fees, and enterprise-level performance optimization based on Cloudflare R2 object storage service. It provides standardized file upload, download, and delete operations, is compatible with S3 API interfaces, and offers excellent cost-effectiveness and global access performance.

The Cloudflare R2 storage element hierarchy is Meta (storages.Meta) → Type (storages.CloudflareR2Type) → Instance. Developers can quickly create Cloudflare R2 storage instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or override the storages.CloudflareR2Type element officially provided by JitAI in their own applications to implement their own encapsulation.

## Quick Start 
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
├── MyR2/                      # Custom instance element name
│   ├── e.json                 # Element declaration file
│   └── MyR2.json             # Cloudflare R2 configuration file
```

#### e.json File
```json title="Basic Configuration"
{
  "title": "My Cloudflare R2 Storage",
  "type": "storages.CloudflareR2Type",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="Cloudflare R2 Connection Configuration"
{
  "accessKeyId": "your_r2_access_key_id",
  "accessKeySecret": "your_r2_secret_access_key", 
  "endPoint": "your-account-id.r2.cloudflarestorage.com",
  "bucketName": "your_bucket_name",
  "region": "auto"
}
```

#### Usage Example
```python title="Basic Usage"
# Get Cloudflare R2 storage instance
r2 = app.getElement("storages.MyR2")

# Upload file
with open("example.txt", "rb") as file:
    result = r2.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"Upload successful, URL: {result['url']}")

# Download file
file_data = r2.download("folder/example.txt")

# Delete file
r2.delete("folder/example.txt")
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| title | string | Yes | Storage element display name |
| type | string | Yes | Fixed value: storages.CloudflareR2Type |
| backendBundleEntry | string | Yes | Fixed value: "." |
| variables | array | No | Custom variable configuration, usually empty array |

### Business Configuration File Configuration
| Configuration Item | Type | Required | Description |
|---------------------|------|----------|-------------|
| accessKeyId | string | Yes | Cloudflare R2 access key ID |
| accessKeySecret | string | Yes | Cloudflare R2 access key secret |
| endPoint | string | Yes | R2 service access domain, format: your-account-id.r2.cloudflarestorage.com |
| bucketName | string | Yes | R2 bucket name |
| region | string | Yes | Region setting, usually "auto" |

## Methods 
### uploadByFile
Upload file to Cloudflare R2 storage.

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
    result = r2.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# Upload document file
with open("document.pdf", "rb") as file:
    result = r2.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
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
temp_url = r2.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# Get temporary download URL for document
download_url = r2.getSignUrl("docs/document.pdf", "application/pdf")
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
file_data = r2.download("docs/document.pdf")

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
file_obj = r2.getObject("users/avatar.jpg")
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
r2.delete("users/avatar.jpg")

# Delete temporary file
r2.delete("temp/upload_cache.tmp")
```

## Advanced Features
### Exception Handling Mechanism
Cloudflare R2 storage has built-in comprehensive exception handling mechanism, all methods automatically catch and convert exceptions.

```python title="Exception Handling Example"
try:
    r2.uploadByFile("test.txt", b"test data", "text/plain")
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
        result = r2.uploadByFile(f"batch/{name}", data, content_type)
        print(f"Upload successful: {name}")
    except Exception as e:
        print(f"Upload failed {name}: {e}")
```

### Zero Egress Fees Advantage
```python title="Cost Optimization Configuration"
# The main advantage of Cloudflare R2 is zero egress fees
# Particularly suitable for the following scenarios:
# - Static website hosting
# - CDN origin content storage
# - Large file distribution
# - Media content delivery

# Configuration example: Integration with Cloudflare CDN
def setup_cdn_integration():
    """
    Configure R2 integration with Cloudflare CDN
    Achieve global edge acceleration and zero egress fees
    """
    # 1. Configure custom domain in Cloudflare console
    # 2. Set Cache rules to optimize performance
    # 3. Configure Worker scripts for advanced processing
    pass
```

### S3 Compatibility
```python title="S3 Compatible API"
# Cloudflare R2 is fully compatible with AWS S3 API
# Can directly migrate existing S3 applications
# Supports all standard S3 operations

# Migration configuration example
migration_config = {
    "from_s3": {
        "endPoint": "s3.amazonaws.com",
        "region": "us-east-1"
    },
    "to_r2": {
        "endPoint": "your-account-id.r2.cloudflarestorage.com",
        "region": "auto"
    }
}

def migrate_from_s3():
    """
    Tool function to migrate from AWS S3 to Cloudflare R2
    """
    # 1. Configure R2 bucket
    # 2. Batch copy files
    # 3. Update application configuration
    # 4. Verify data integrity
    pass
```

### Workers Integration
```python title="Cloudflare Workers Integration"
# Utilize Cloudflare Workers for advanced file processing
# Support edge computing and real-time image processing

def setup_worker_processing():
    """
    Configure Workers for file processing
    """
    # Workers can implement:
    # - Image resizing and format conversion
    # - Video transcoding and thumbnail generation
    # - File compression and decompression
    # - Access permission control
    # - Real-time content transformation
    pass

# Example: Dynamic image processing
# https://your-domain.com/image.jpg?width=300&height=200&format=webp
```

### Security Best Practices
```python title="Security Configuration Recommendations"
# 1. Use API Token instead of Global API Key
# 2. Configure appropriate CORS policies
# 3. Enable access logging
# 4. Use pre-signed URLs to control access
# 5. Regularly audit access permissions

# Use environment variables to store sensitive information
import os
config = {
    "accessKeyId": os.getenv("R2_ACCESS_KEY_ID"),
    "accessKeySecret": os.getenv("R2_SECRET_ACCESS_KEY"),
    "accountId": os.getenv("R2_ACCOUNT_ID")
}

# Security configuration example
security_config = {
    "cors_policy": {
        "allowed_origins": ["https://yourdomain.com"],
        "allowed_methods": ["GET", "POST", "PUT", "DELETE"],
        "max_age": 86400
    },
    "access_control": {
        "public_read": False,
        "presigned_url_expiry": 3600
    }
}
```

### Performance Optimization
```python title="Performance Optimization Configuration"
# Global edge network advantages of Cloudflare R2
def optimize_performance():
    """
    Performance optimization best practices
    """
    # 1. Use custom domain for better cache performance
    # 2. Configure appropriate Cache-Control headers
    # 3. Enable Brotli compression
    # 4. Use WebP format to optimize images
    # 5. Implement intelligent caching strategies
    
    cache_headers = {
        "Cache-Control": "public, max-age=31536000",  # 1 year cache
        "Content-Encoding": "br",  # Brotli compression
        "Vary": "Accept-Encoding"
    }
    
    return cache_headers
```
