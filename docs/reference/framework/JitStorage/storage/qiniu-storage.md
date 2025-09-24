---
slug: qiniu-storage
---
# Qiniu Cloud Storage

Qiniu Cloud Storage is a cloud storage solution based on Qiniu Cloud Object Storage service, providing cost-effective storage capabilities. It supports multimedia file processing and automatic compression optimization for images and videos, provides simple and easy-to-use API interfaces and rapid integration capabilities, suitable for cloud storage needs of small and medium enterprises and startup teams.

The Qiniu Cloud Storage element has a hierarchical structure of Meta (storages.Meta) → Type (storages.QiniuType) → Instance. Developers can quickly create Qiniu Cloud storage instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official storages.QiniuType element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
storages/
└── MyQiniuStorage/
    ├── e.json                          # Element declaration file
    └── MyQiniuStorage.json            # Qiniu Cloud configuration file
```

#### e.json File
```json title="Element Declaration File"
{
  "title": "My Qiniu Cloud Storage",
  "type": "storages.QiniuType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### Business Configuration File
```json title="Qiniu Cloud Configuration File"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_access_key_secret",
  "bucketName": "your_bucket_name",
  "endPoint": "upload-z2.qiniup.com",
  "scheme": "https"
}
```

#### Usage Example
```python title="Using Qiniu Cloud Storage"
# Get storage instance
storage = app.getElement("storages.MyQiniuStorage")

# Upload file
with open("example.jpg", "rb") as f:
    file_data = f.read()
    result = storage.uploadByFile("images/example.jpg", file_data, "image/jpeg")
    print(f"File URL: {result['url']}")

# Get signed URL
sign_url = storage.getSignUrl("images/example.jpg", "image/jpeg", 3600)
print(f"Signed URL: {sign_url}")

# Download file
file_content = storage.download("images/example.jpg")

# Delete file
storage.delete("images/example.jpg")
```

## Element Configuration
### e.json Configuration
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Storage instance display name |
| type | string | Yes | Fixed value: storages.QiniuType |
| backendBundleEntry | string | Yes | Fixed value: "." |
| variables | array | No | Element variable configuration, usually empty |

### Business Configuration File Configuration
| Parameter Name | Type | Required | Default Value | Description |
|--------|------|------|--------|------|
| accessKeyId | string | Yes | - | Qiniu Cloud Access Key ID |
| accessKeySecret | string | Yes | - | Qiniu Cloud Access Key Secret |
| bucketName | string | Yes | - | Qiniu Cloud storage space name |
| endPoint | string | No | upload-z2.qiniup.com | Qiniu Cloud upload domain |
| scheme | string | No | http | Request protocol, optional http or https |

## Methods
### uploadByFile
Upload file to Qiniu Cloud storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path name in storage |
| data | - | bytes | Yes | File binary data |
| contentType | Stext | str | No | File MIME type, defaults to application/octet-stream |

#### Return Value
Returns a dictionary containing file URL, format: `{"url": "file access URL"}`

#### Usage Example
```python title="Upload Different Types of Files"
storage = app.getElement("storages.MyQiniuStorage")

# Upload image file
with open("photo.jpg", "rb") as f:
    result = storage.uploadByFile("photos/photo.jpg", f.read(), "image/jpeg")

# Upload PDF document
with open("document.pdf", "rb") as f:
    result = storage.uploadByFile("docs/document.pdf", f.read(), "application/pdf")

# Upload text file
text_data = "Hello, World!".encode('utf-8')
result = storage.uploadByFile("texts/hello.txt", text_data, "text/plain")
```

### getSignUrl
Get signed access URL for file, used for secure file access.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| file | Stext | str | Yes | File path in storage |
| contentType | Stext | str | Yes | File MIME type |
| expires | Numeric | int | No | Signature expiration time (seconds), defaults to 300 seconds |

#### Return Value
Returns the signed access URL string for the file.

#### Usage Example
```python title="Generate Signed URL"
storage = app.getElement("storages.MyQiniuStorage")

# Generate image access link (default 5 minutes expiration)
url = storage.getSignUrl("photos/photo.jpg", "image/jpeg")

# Generate document access link (1 hour expiration)
url = storage.getSignUrl("docs/document.pdf", "application/pdf", 3600)

# Generate video access link (30 minutes expiration)
url = storage.getSignUrl("videos/demo.mp4", "video/mp4", 1800)
```

### download
Download file content.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path in storage |

#### Return Value
Returns file binary data (bytes type).

#### Usage Example
```python title="Download File"
storage = app.getElement("storages.MyQiniuStorage")

# Download image file
image_data = storage.download("photos/photo.jpg")
with open("downloaded_photo.jpg", "wb") as f:
    f.write(image_data)

# Download text file and read content
text_data = storage.download("texts/hello.txt")
text_content = text_data.decode('utf-8')
print(text_content)
```

### getObject
Get file object information and content.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path in storage |

#### Return Value
Returns file object containing file content and metadata information.

#### Usage Example
```python title="Get File Object"
storage = app.getElement("storages.MyQiniuStorage")

# Get file object
file_obj = storage.getObject("photos/photo.jpg")
# Process file object (specific structure depends on Qiniu Cloud SDK)
```

### delete
Delete file from storage.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| name | Stext | str | Yes | File path to delete |

#### Return Value
Returns delete operation result.

#### Usage Example
```python title="Delete File"
storage = app.getElement("storages.MyQiniuStorage")

# Delete single file
storage.delete("photos/old_photo.jpg")

# Batch delete files
files_to_delete = ["temp/file1.txt", "temp/file2.txt", "temp/file3.txt"]
for file_path in files_to_delete:
    storage.delete(file_path)
```

## Attributes
None

## Advanced Features
### File Type Processing
Qiniu Cloud Storage supports automatic processing and optimization of various file types, especially suitable for multimedia file scenarios.

```python title="Multimedia File Processing"
storage = app.getElement("storages.MyQiniuStorage")

# Upload and process image file
with open("large_image.jpg", "rb") as f:
    # Images will be automatically compressed and optimized
    result = storage.uploadByFile("images/optimized.jpg", f.read(), "image/jpeg")

# Upload video file
with open("video.mp4", "rb") as f:
    # Videos support transcoding and thumbnail generation
    result = storage.uploadByFile("videos/demo.mp4", f.read(), "video/mp4")
```

### Batch Operations
```python title="Batch File Management"
storage = app.getElement("storages.MyQiniuStorage")

def batch_upload(file_list):
    """Batch upload files"""
    results = []
    for local_path, remote_path, content_type in file_list:
        with open(local_path, "rb") as f:
            result = storage.uploadByFile(remote_path, f.read(), content_type)
            results.append(result)
    return results

# Batch upload example
files = [
    ("local/image1.jpg", "images/image1.jpg", "image/jpeg"),
    ("local/doc1.pdf", "documents/doc1.pdf", "application/pdf"),
    ("local/video1.mp4", "videos/video1.mp4", "video/mp4")
]
upload_results = batch_upload(files)
```

### Error Handling
```python title="Exception Handling"
from jit.errcode import Code

storage = app.getElement("storages.MyQiniuStorage")

try:
    with open("example.jpg", "rb") as f:
        result = storage.uploadByFile("images/example.jpg", f.read(), "image/jpeg")
        print(f"Upload successful: {result['url']}")
except Code as e:
    print(f"Business error: {e}")
except Exception as e:
    print(f"System error: {e}")
```