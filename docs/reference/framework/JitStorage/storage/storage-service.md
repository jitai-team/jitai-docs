---
slug: storage-service
---
# Storage Service

The Storage Service (StorageSvc) is JitAi platform's unified file storage management service, providing standardized file operation interfaces across storage types. It supports multiple storage backends (Aliyun OSS, AWS S3, Minio, local disk, etc.), implements core functionalities such as file upload, download, preview, and deletion, and features built-in file expiration management and automatic cleanup mechanisms, delivering flexible and reliable file storage solutions for enterprise applications.

The Storage Service is a standard service element (services.NormalType). Developers can use it directly through JitAi's service invocation mechanism without worrying about underlying storage implementation details. The service automatically uses the system's default storage or a specified storage instance for file operations.

## Quick start {#quick-start}

### Basic usage {#basic-usage}

```python title="Getting service instance"
# Get storage service
storageSvc = app.getElement("storages.services.StorageSvc")
```

### Simple examples {#simple-examples}

```python title="Basic operations"
# Upload file
with open("example.pdf", "rb") as f:
    result = storageSvc.uploadByFile(
        file="documents/example.pdf",
        data=f.read(),
        contentType="application/pdf"
    )
    print(f"Upload successful, URL: {result['url']}")

# Preview file
preview_response = storageSvc.preview("documents/example.pdf")

# Download file
file_data = storageSvc.download("documents/example.pdf")

# Delete file
storageSvc.delete("documents/example.pdf")
```

## Core Features {#core-features}

### Multiple storage backend support {#multiple-storage-backends}

The Storage Service supports various storage types, including but not limited to:
- **Aliyun OSS** - Suitable for scenarios requiring global CDN acceleration
- **AWS S3** - Suitable for international deployments
- **Azure Blob** - Suitable for Microsoft ecosystem integration
- **Minio** - Suitable for private deployments
- **Local Disk** - Suitable for development and testing environments

### Default storage configuration {#default-storage-config}

The system automatically uses the default storage instance configured in `jit.config`:

```json title="jit.config.ts configuration example"
{
  "settings": {
    "defaultElement": {
      "defaultStorage": "storages.MyOss"
    }
  }
}
```

If no default storage is configured, the system will use `storages.Default` as a fallback.

### File expiration management {#file-expiration}

The service features built-in file expiration mechanisms, supporting file validity periods with automatic cleanup of expired files:
- Automatically records file upload time and expiration time
- Automatically checks file expiration upon access
- Expired files are automatically deleted and return 404 responses

## Methods {#methods}

### uploadByFile {#upload-by-file}

Upload a file to the storage system.

#### Parameters {#upload-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | File/Stext | File/str | Yes | File object or filename (path) |
| data | - | bytes | No | File binary data (required when file is a string) |
| md5 | Stext | str | No | File MD5 value, used to generate storage filename when provided |
| contentType | Stext | str | No | File MIME type, defaults to "application/octet-stream" |
| storage | Stext | str | No | Specified storage instance full name, uses default storage if not specified |
| expires | Numeric | int | No | File expiration time (seconds), files will be automatically cleaned after specified time |

#### Return value {#upload-return}

Returns a dictionary containing upload results, including a url field indicating the file access address.

#### Usage examples {#upload-examples}

```python title="Uploading file to default storage"
# Method 1: Directly pass file object (from HTTP request)
from flask import request
result = storageSvc.uploadByFile(
    file=request.files['file'],
    contentType="image/jpeg"
)

# Method 2: Pass filename and data
with open("report.pdf", "rb") as f:
    result = storageSvc.uploadByFile(
        file="reports/2024/report.pdf",
        data=f.read(),
        contentType="application/pdf"
    )

# Method 3: Use MD5 as filename
import hashlib
file_data = b"file content"
md5_value = hashlib.md5(file_data).hexdigest()
result = storageSvc.uploadByFile(
    file="example.txt",
    data=file_data,
    md5=md5_value,
    contentType="text/plain"
)
# Actual stored filename will be: {md5}.txt
```

```python title="Uploading temporary file (with expiration time)"
# Upload temporary file that expires after 1 hour
result = storageSvc.uploadByFile(
    file="temp/upload.png",
    data=image_data,
    contentType="image/png",
    expires=3600  # Expires after 1 hour
)
```

```python title="Uploading to specified storage"
# Upload to specified storage instance
result = storageSvc.uploadByFile(
    file="important/document.pdf",
    data=pdf_data,
    contentType="application/pdf",
    storage="storages.SecureOss"  # Use specific storage instance
)
```

### preview {#preview}

Preview a file, returning an HTTP response with file content.

#### Parameters {#preview-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | Stext | str | Yes | File path name |
| storage | Stext | str | No | Specified storage instance full name |

#### Return value {#preview-return}

Returns a Flask Response object containing file content and appropriate HTTP response headers.

#### Features {#preview-features}

- **Automatic expiration check**: Automatically checks if file is expired upon access, returns 404 for expired files
- **Login-free access**: Supports public access without login verification
- **Signature-free verification**: Suitable for public file preview scenarios

#### Usage examples {#preview-examples}

```python title="File preview"
# Preview image file
response = storageSvc.preview("images/product.jpg")

# Preview PDF document
response = storageSvc.preview("documents/manual.pdf")

# Preview file in specified storage
response = storageSvc.preview("videos/demo.mp4", storage="storages.VideoOss")
```

### previewThumbnail {#preview-thumbnail}

Preview a file's thumbnail.

#### Parameters {#thumbnail-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| name | Stext | str | Yes | File path name |
| width | Numeric | int | No | Thumbnail width, defaults to 120 pixels |
| height | Numeric | int | No | Thumbnail height, defaults to 120 pixels |
| storage | Stext | str | No | Specified storage instance full name |

#### Return value {#thumbnail-return}

Returns thumbnail response data.

#### Features {#thumbnail-features}

- **Login-free access**: Supports public access
- **Signature-free verification**: Suitable for public thumbnail scenarios
- **Custom dimensions**: Supports specified width and height

#### Usage examples {#thumbnail-examples}

```python title="Thumbnail preview"
# Preview default size thumbnail (120x120)
thumbnail = storageSvc.previewThumbnail("images/product.jpg")

# Preview specified size thumbnail
thumbnail = storageSvc.previewThumbnail(
    name="images/banner.jpg",
    width=300,
    height=200
)

# Preview thumbnail in specified storage
thumbnail = storageSvc.previewThumbnail(
    name="photos/avatar.png",
    width=80,
    height=80,
    storage="storages.ImageOss"
)
```

### download {#download}

Download file data.

#### Parameters {#download-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | Stext | str | Yes | File path name |
| storage | Stext | str | No | Specified storage instance full name |

#### Return value {#download-return}

Returns file binary data or response object.

#### Features {#download-features}

- **Automatic expiration check**: Automatically checks if file is expired upon access
- **Large file support**: Can handle large file downloads

#### Usage examples {#download-examples}

```python title="File download"
# Download file
file_data = storageSvc.download("documents/report.pdf")

# Save to local
with open("local_report.pdf", "wb") as f:
    f.write(file_data)

# Download from specified storage
file_data = storageSvc.download(
    file="backups/database.sql",
    storage="storages.BackupOss"
)
```

### getSignUrl {#get-sign-url}

Get a pre-signed upload URL for client-side direct upload.

#### Parameters {#sign-url-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | Stext | str | Yes | File path name |
| contentType | Stext | str | Yes | File MIME type |
| storage | Stext | str | No | Specified storage instance full name |

#### Return value {#sign-url-return}

Returns pre-signed URL string or dictionary containing signature information.

#### Usage examples {#sign-url-examples}

```python title="Getting pre-signed URL"
# Get image upload signature
sign_url = storageSvc.getSignUrl(
    file="uploads/photo.jpg",
    contentType="image/jpeg"
)

# Get video upload signature (specified storage)
sign_url = storageSvc.getSignUrl(
    file="videos/tutorial.mp4",
    contentType="video/mp4",
    storage="storages.VideoOss"
)

# Frontend uses signed URL for direct upload
# Client can use returned signed URL to directly upload files to storage service
```

### delete {#delete}

Delete specified file.

#### Parameters {#delete-parameters}

| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| file | Stext | str | Yes | File path name to delete |
| storage | Stext | str | No | Specified storage instance full name |

#### Return value {#delete-return}

Returns deletion operation result.

#### Usage examples {#delete-examples}

```python title="File deletion"
# Delete file
storageSvc.delete("temp/upload_cache.tmp")

# Delete file in specified storage
storageSvc.delete(
    file="archive/old_data.zip",
    storage="storages.ArchiveOss"
)

# Batch delete files
files_to_delete = ["temp/file1.txt", "temp/file2.txt", "temp/file3.txt"]
for file_path in files_to_delete:
    try:
        storageSvc.delete(file_path)
        print(f"Deleted successfully: {file_path}")
    except Exception as e:
        print(f"Delete failed {file_path}: {e}")
```

## Advanced Features {#advanced-features}

### Attachment field storage format {#attachment-format}

In JitAi system, attachment fields use a standardized JSON array format to store complete file metadata information for each attachment object.

#### Data structure {#data-structure}

```json title="Attachment field standard format"
[
  {
    "id": 18,
    "md5": "e490f38eee7ab901e1945bc954ac1377",
    "uid": "rc-upload-1762154822429-5",
    "url": "https://jssygs.oss-cn-beijing.aliyuncs.com/e490f38eee7ab901e1945bc954ac1377",
    "name": "e490f38eee7ab901e1945bc954ac1377",
    "size": 162915,
    "type": "image/jpeg",
    "expires": null,
    "fileName": "20251031155441.jpg",
    "fullName": "storages.OssType",
    "uploadTime": 1762154952871,
    "uploadUser": "admin123",
    "updateUserId": "admin123",
    "storeFullName": null,
    "retentionPeriod": null
  }
]
```

#### Core field descriptions {#core-fields}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | int | Yes | Unique identifier ID for the file record |
| md5 | string | Yes | MD5 hash value of file content, used for file deduplication and integrity verification |
| type | string | Yes | File MIME type, such as "image/jpeg", "application/pdf" |
| fileName | string | Yes | Original filename, preserves the filename from user upload |
| url | string | Yes | Complete file access URL address |

#### Auxiliary field descriptions {#auxiliary-fields}

| Field | Type | Description |
|-------|------|-------------|
| uid | string | Unique identifier for upload session |
| name | string | Filename in storage system (usually MD5 value) |
| size | int | File size (bytes) |
| expires | timestamp/null | File expiration time, null indicates permanent validity |
| fullName | string | Full name of storage type |
| uploadTime | timestamp | Upload timestamp (milliseconds) |
| uploadUser | string | Username of uploader |
| updateUserId | string | Update user ID |
| storeFullName | string/null | Full name of storage instance |
| retentionPeriod | int/null | File retention period |

#### Usage examples {#attachment-examples}

```python title="Processing attachment field data"
# Assuming attachment field data retrieved from database
attachments = [
    {
        "id": 18,
        "md5": "e490f38eee7ab901e1945bc954ac1377",
        "type": "image/jpeg",
        "fileName": "20251031155441.jpg",
        "url": "https://jssygs.oss-cn-beijing.aliyuncs.com/e490f38eee7ab901e1945bc954ac1377",
        "size": 162915,
        "uploadTime": 1762154952871
    }
]

# Extract all file URLs
urls = [att["url"] for att in attachments]

# Extract all filenames
file_names = [att["fileName"] for att in attachments]

# Group by file type
from collections import defaultdict
files_by_type = defaultdict(list)
for att in attachments:
    files_by_type[att["type"]].append(att)

# Get image files
images = [att for att in attachments if att["type"].startswith("image/")]

# Verify file integrity (via MD5)
def verify_file_integrity(attachment):
    """Verify if file MD5 matches"""
    file_data = storageSvc.download(attachment["fileName"])
    import hashlib
    calculated_md5 = hashlib.md5(file_data).hexdigest()
    return calculated_md5 == attachment["md5"]
```

```python title="Building attachment data object"
# Upload file and build attachment object
def upload_and_create_attachment(file_path, original_filename, user_id):
    """
    Upload file and return standard attachment object
    """
    import hashlib
    from pathlib import Path
    from datetime import datetime
    
    # Read file
    with open(file_path, "rb") as f:
        file_data = f.read()
    
    # Calculate MD5
    md5_value = hashlib.md5(file_data).hexdigest()
    
    # Get file information
    file_size = len(file_data)
    file_suffix = Path(original_filename).suffix.lower()
    content_type_map = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
    content_type = content_type_map.get(file_suffix, "application/octet-stream")
    
    # Upload file
    result = storageSvc.uploadByFile(
        file=md5_value + file_suffix,
        data=file_data,
        md5=md5_value,
        contentType=content_type
    )
    
    # Build attachment object
    attachment = {
        "id": None,  # Auto-generated by database
        "md5": md5_value,
        "uid": f"upload-{int(datetime.now().timestamp() * 1000)}",
        "url": result["url"],
        "name": md5_value,
        "size": file_size,
        "type": content_type,
        "expires": None,
        "fileName": original_filename,
        "fullName": "storages.OssType",
        "uploadTime": int(datetime.now().timestamp() * 1000),
        "uploadUser": user_id,
        "updateUserId": user_id,
        "storeFullName": None,
        "retentionPeriod": None
    }
    
    return attachment

# Usage example
attachment = upload_and_create_attachment(
    file_path="local/document.pdf",
    original_filename="Contract Document.pdf",
    user_id="admin123"
)

# Save attachment object to data model's attachment field
# row_data["attachments"] = [attachment]
```

```python title="Downloading all files from attachment list"
def download_all_attachments(attachments, save_directory="downloads"):
    """
    Download all files from attachment list
    """
    from pathlib import Path
    
    save_dir = Path(save_directory)
    save_dir.mkdir(parents=True, exist_ok=True)
    
    for attachment in attachments:
        try:
            # Download using MD5 as storage filename
            file_data = storageSvc.download(attachment["name"])
            
            # Save using original filename
            save_path = save_dir / attachment["fileName"]
            with open(save_path, "wb") as f:
                f.write(file_data)
            
            print(f"✓ Download successful: {attachment['fileName']}")
            
        except Exception as e:
            print(f"✗ Download failed {attachment['fileName']}: {e}")

# Usage example
download_all_attachments(attachments, save_directory="./downloaded_files")
```

### File expiration automatic cleanup {#expiration-cleanup}

The Storage Service features a comprehensive file expiration management mechanism.

```python title="Expired file management"
import hashlib

# Upload file with expiration time
result = storageSvc.uploadByFile(
    file="temp/session_data.json",
    data=json_data,
    contentType="application/json",
    expires=7200  # Expires after 2 hours
)

# System automatically records the following information to FileModel:
# - uid: File unique identifier (based on filename MD5)
# - storeFullName: Storage instance name
# - uploadTime: Upload time
# - expires: Expiration time
# - md5: File content MD5
# - fileName: Filename
# - url: Access URL

# Expired files are automatically cleaned when accessed
try:
    data = storageSvc.download("temp/session_data.json")
except Exception:
    # If file has expired, will return 404 error
    print("File has expired or does not exist")
```

### Multiple storage instance management {#multi-storage}

```python title="Using different storage instances"
# Store images to CDN-accelerated OSS
image_result = storageSvc.uploadByFile(
    file="images/product.jpg",
    data=image_data,
    contentType="image/jpeg",
    storage="storages.CdnOss"
)

# Store documents to more secure private storage
doc_result = storageSvc.uploadByFile(
    file="documents/contract.pdf",
    data=doc_data,
    contentType="application/pdf",
    storage="storages.SecureOss"
)

# Store backup files to more cost-effective archive storage
backup_result = storageSvc.uploadByFile(
    file="backups/db_backup.sql",
    data=backup_data,
    contentType="application/sql",
    storage="storages.ArchiveStorage"
)
```

### File upload best practices {#upload-best-practices}

```python title="Recommended upload pattern"
import hashlib
from pathlib import Path

def upload_file_with_validation(file_path, remote_path, storage=None):
    """
    Upload file with integrity verification
    """
    # Read file
    with open(file_path, "rb") as f:
        file_data = f.read()
    
    # Calculate MD5
    md5_value = hashlib.md5(file_data).hexdigest()
    
    # Determine ContentType based on file extension
    suffix = Path(file_path).suffix.lower()
    content_type_map = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".pdf": "application/pdf",
        ".txt": "text/plain",
        ".json": "application/json",
    }
    content_type = content_type_map.get(suffix, "application/octet-stream")
    
    # Upload file
    result = storageSvc.uploadByFile(
        file=remote_path,
        data=file_data,
        md5=md5_value,
        contentType=content_type,
        storage=storage
    )
    
    return result

# Usage example
result = upload_file_with_validation(
    file_path="local/report.pdf",
    remote_path="reports/2024/report.pdf"
)
print(f"Upload successful: {result['url']}")
```

### Batch file operations {#batch-operations}

```python title="Batch upload and management"
def batch_upload_files(file_list, storage=None, expires=None):
    """
    Batch upload files
    :param file_list: [(file_path, remote_path), ...]
    :param storage: Storage instance name
    :param expires: Expiration time (seconds)
    :return: List of upload results
    """
    results = []
    
    for local_path, remote_path in file_list:
        try:
            with open(local_path, "rb") as f:
                result = storageSvc.uploadByFile(
                    file=remote_path,
                    data=f.read(),
                    contentType="application/octet-stream",
                    storage=storage,
                    expires=expires
                )
                results.append({
                    "success": True,
                    "local": local_path,
                    "remote": remote_path,
                    "url": result["url"]
                })
        except Exception as e:
            results.append({
                "success": False,
                "local": local_path,
                "remote": remote_path,
                "error": str(e)
            })
    
    return results

# Usage example
files = [
    ("local/file1.txt", "batch/file1.txt"),
    ("local/file2.txt", "batch/file2.txt"),
    ("local/file3.txt", "batch/file3.txt"),
]

results = batch_upload_files(files, expires=86400)  # Expires after 24 hours
for result in results:
    if result["success"]:
        print(f"✓ {result['local']} -> {result['url']}")
    else:
        print(f"✗ {result['local']}: {result['error']}")
```

### Exception handling {#exception-handling}

```python title="Comprehensive exception handling"
from http import HTTPStatus

try:
    # Upload file
    result = storageSvc.uploadByFile(
        file="test.txt",
        data=b"test data",
        contentType="text/plain"
    )
    print("Upload successful")
    
except Exception as e:
    print(f"Upload failed: {e}")

try:
    # Download file (may be expired)
    data = storageSvc.download("temp/expired_file.txt")
    
except Exception as e:
    # File does not exist or has expired
    print(f"Download failed: {e}")

try:
    # Preview file
    response = storageSvc.preview("documents/test.pdf")
    if response.status_code == HTTPStatus.NOT_FOUND:
        print("File does not exist or has expired")
        
except Exception as e:
    print(f"Preview failed: {e}")
```

## Best Practices {#best-practices}

### 1. Choosing appropriate storage strategy {#storage-strategy}

- **Static resources** (images, CSS, JS) → Use CDN-accelerated OSS
- **User documents** (contracts, reports) → Use secure private storage
- **Temporary files** (upload cache) → Use local storage or with expiration time
- **Backup files** (database backups) → Use archive storage to reduce costs

### 2. Reasonable use of expiration time {#expiration-time}

```python
# Temporary upload (1 hour)
storageSvc.uploadByFile(file="temp/upload.tmp", data=data, expires=3600)

# Session files (24 hours)
storageSvc.uploadByFile(file="sessions/data.json", data=data, expires=86400)

# Permanent files (do not set expires)
storageSvc.uploadByFile(file="documents/contract.pdf", data=data)
```

### 3. Using MD5 to avoid duplication {#md5-deduplication}

```python
import hashlib

file_data = get_file_data()
md5_value = hashlib.md5(file_data).hexdigest()

# Files with the same MD5 will be stored as a single file
result = storageSvc.uploadByFile(
    file="upload.jpg",
    data=file_data,
    md5=md5_value
)
```

### 4. File path conventions {#path-conventions}

```python
# Recommended: Use meaningful directory structure
"users/avatars/user_123.jpg"
"documents/contracts/2024/contract_001.pdf"
"temp/uploads/session_abc123.tmp"

# Avoid: Chaotic flat structure
"file123.jpg"
"upload.pdf"
```

## Important Notes {#important-notes}

1. **Default storage configuration**: Ensure default storage instance is correctly configured in `jit.config`
2. **Expired file cleanup**: Files with expiration time set are automatically cleaned upon access, no manual deletion needed
3. **MD5 usage**: Using MD5 parameter can avoid duplicate files, but will change the stored filename
4. **Storage instance naming**: Use complete element name when specifying storage instance, such as `storages.MyOss`
5. **ContentType**: Correctly setting ContentType ensures proper file display during preview
6. **Large file handling**: For large files, recommend using `getSignUrl` to get signature for client-side direct upload

## Related Elements {#related-elements}

- **FileModel** (`storages.services.models.FileModel`) - File record data model
- **Storage Type Elements** - Various storage backend implementations (OssType, S3Type, MinioType, etc.)
- **NormalService** - Service base class

