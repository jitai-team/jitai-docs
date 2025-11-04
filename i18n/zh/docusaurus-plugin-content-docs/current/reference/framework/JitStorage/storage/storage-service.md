---
slug: storage-service
---
# 文件存储服务

文件存储服务（StorageSvc）是JitAi平台统一的文件存储管理服务，提供跨存储类型的标准化文件操作接口。它支持多种存储后端（阿里云OSS、AWS S3、Minio、本地磁盘等），实现文件上传、下载、预览、删除等核心功能，并内置文件过期管理和自动清理机制，为企业级应用提供灵活可靠的文件存储解决方案。

文件存储服务是一个标准的服务元素（services.NormalType），开发者可以通过JitAi的服务调用机制直接使用，无需关心底层存储实现细节。服务会自动使用系统默认存储或指定的存储实例进行文件操作。

## 快速开始 {#quick-start} 
### 基本使用 {#basic-usage}
```python title="获取服务实例"
# 获取文件存储服务
storageSvc = app.getElement("storages.services.StorageSvc")
```

### 简单示例 {#simple-examples}
```python title="基础操作"
# 上传文件
with open("example.pdf", "rb") as f:
    result = storageSvc.uploadByFile(
        file="documents/example.pdf",
        data=f.read(),
        contentType="application/pdf"
    )
    print(f"上传成功，URL: {result['url']}")

# 预览文件
preview_response = storageSvc.preview("documents/example.pdf")

# 下载文件
file_data = storageSvc.download("documents/example.pdf")

# 删除文件
storageSvc.delete("documents/example.pdf")
```

## 核心特性 {#core-features}
### 多存储后端支持 {#multiple-storage-backends}
文件存储服务支持多种存储类型，包括但不限于：
- **阿里云OSS** - 适用于需要全球CDN加速的场景
- **AWS S3** - 适用于国际化部署
- **Azure Blob** - 适用于微软生态集成
- **Minio** - 适用于私有化部署
- **本地磁盘** - 适用于开发测试环境

### 默认存储配置 {#default-storage-config}
系统会自动使用在 `jit.config` 中配置的默认存储实例：
```json title="jit.config.ts 配置示例"
{
  "settings": {
    "defaultElement": {
      "defaultStorage": "storages.MyOss"
    }
  }
}
```

如果未配置默认存储，系统将使用 `storages.Default` 作为后备方案。

### 文件过期管理 {#file-expiration}
服务内置文件过期机制，支持设置文件有效期，过期文件会被自动清理：
- 自动记录文件上传时间和过期时间
- 访问时自动检查文件是否过期
- 过期文件自动删除并返回404响应

## 方法 {#methods}
### uploadByFile {#upload-by-file}
上传文件到存储系统。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | File/Stext | File/str | 是 | 文件对象或文件名（路径） |
| data | - | bytes | 否 | 文件二进制数据（当file为字符串时必填） |
| md5 | Stext | str | 否 | 文件MD5值，提供后将用于生成存储文件名 |
| contentType | Stext | str | 否 | 文件MIME类型，默认为"application/octet-stream" |
| storage | Stext | str | 否 | 指定存储实例完整名称，不指定则使用默认存储 |
| expires | Numeric | int | 否 | 文件过期时间（秒），设置后文件将在指定时间后自动清理 |

#### 返回值
返回包含上传结果的字典，包含url字段表示文件访问地址。

#### 使用示例
```python title="上传文件到默认存储"
# 方式1：直接传入文件对象（来自HTTP请求）
from flask import request
result = storageSvc.uploadByFile(
    file=request.files['file'],
    contentType="image/jpeg"
)

# 方式2：传入文件名和数据
with open("report.pdf", "rb") as f:
    result = storageSvc.uploadByFile(
        file="reports/2024/report.pdf",
        data=f.read(),
        contentType="application/pdf"
    )

# 方式3：使用MD5作为文件名
import hashlib
file_data = b"file content"
md5_value = hashlib.md5(file_data).hexdigest()
result = storageSvc.uploadByFile(
    file="example.txt",
    data=file_data,
    md5=md5_value,
    contentType="text/plain"
)
# 实际存储的文件名将是: {md5}.txt
```

```python title="上传临时文件（带过期时间）"
# 上传1小时后自动过期的临时文件
result = storageSvc.uploadByFile(
    file="temp/upload.png",
    data=image_data,
    contentType="image/png",
    expires=3600  # 1小时后过期
)
```

```python title="上传到指定存储"
# 上传到指定的存储实例
result = storageSvc.uploadByFile(
    file="important/document.pdf",
    data=pdf_data,
    contentType="application/pdf",
    storage="storages.SecureOss"  # 使用特定的存储实例
)
```

### preview {#preview}
预览文件，返回文件内容的HTTP响应。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件路径名称 |
| storage | Stext | str | 否 | 指定存储实例完整名称 |

#### 返回值
返回Flask Response对象，包含文件内容和适当的HTTP响应头。

#### 特性
- **自动过期检查**：访问时自动检查文件是否过期，过期文件返回404
- **免登录访问**：支持公开访问，无需登录验证
- **免签名验证**：适用于公共文件预览场景

#### 使用示例
```python title="文件预览"
# 预览图片文件
response = storageSvc.preview("images/product.jpg")

# 预览PDF文档
response = storageSvc.preview("documents/manual.pdf")

# 预览指定存储中的文件
response = storageSvc.preview("videos/demo.mp4", storage="storages.VideoOss")
```

### previewThumbnail {#preview-thumbnail}
预览文件的缩略图。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件路径名称 |
| width | Numeric | int | 否 | 缩略图宽度，默认120像素 |
| height | Numeric | int | 否 | 缩略图高度，默认120像素 |
| storage | Stext | str | 否 | 指定存储实例完整名称 |

#### 返回值
返回缩略图的响应数据。

#### 特性
- **免登录访问**：支持公开访问
- **免签名验证**：适用于公共缩略图场景
- **自定义尺寸**：支持指定宽高

#### 使用示例
```python title="缩略图预览"
# 预览默认大小的缩略图（120x120）
thumbnail = storageSvc.previewThumbnail("images/product.jpg")

# 预览指定大小的缩略图
thumbnail = storageSvc.previewThumbnail(
    name="images/banner.jpg",
    width=300,
    height=200
)

# 预览指定存储中的缩略图
thumbnail = storageSvc.previewThumbnail(
    name="photos/avatar.png",
    width=80,
    height=80,
    storage="storages.ImageOss"
)
```

### download {#download}
下载文件数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件路径名称 |
| storage | Stext | str | 否 | 指定存储实例完整名称 |

#### 返回值
返回文件的二进制数据或响应对象。

#### 特性
- **自动过期检查**：访问时自动检查文件是否过期
- **支持大文件**：可处理大文件下载

#### 使用示例
```python title="文件下载"
# 下载文件
file_data = storageSvc.download("documents/report.pdf")

# 保存到本地
with open("local_report.pdf", "wb") as f:
    f.write(file_data)

# 从指定存储下载
file_data = storageSvc.download(
    file="backups/database.sql",
    storage="storages.BackupOss"
)
```

### getSignUrl {#get-sign-url}
获取文件的预签名上传URL，用于客户端直传。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件路径名称 |
| contentType | Stext | str | 是 | 文件MIME类型 |
| storage | Stext | str | 否 | 指定存储实例完整名称 |

#### 返回值
返回预签名URL字符串或包含签名信息的字典。

#### 使用示例
```python title="获取预签名URL"
# 获取图片上传签名
sign_url = storageSvc.getSignUrl(
    file="uploads/photo.jpg",
    contentType="image/jpeg"
)

# 获取视频上传签名（指定存储）
sign_url = storageSvc.getSignUrl(
    file="videos/tutorial.mp4",
    contentType="video/mp4",
    storage="storages.VideoOss"
)

# 前端使用签名URL直传
# 客户端可以使用返回的签名URL直接上传文件到存储服务
```

### delete {#delete}
删除指定文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 要删除的文件路径名称 |
| storage | Stext | str | 否 | 指定存储实例完整名称 |

#### 返回值
返回删除操作结果。

#### 使用示例
```python title="文件删除"
# 删除文件
storageSvc.delete("temp/upload_cache.tmp")

# 删除指定存储中的文件
storageSvc.delete(
    file="archive/old_data.zip",
    storage="storages.ArchiveOss"
)

# 批量删除文件
files_to_delete = ["temp/file1.txt", "temp/file2.txt", "temp/file3.txt"]
for file_path in files_to_delete:
    try:
        storageSvc.delete(file_path)
        print(f"删除成功: {file_path}")
    except Exception as e:
        print(f"删除失败 {file_path}: {e}")
```

## 高级特性 {#advanced-features}
### 附件字段存储格式 {#attachment-format}
在JitAi系统中，附件字段采用标准化的JSON数组格式存储，每个附件对象包含完整的文件元数据信息。

#### 数据结构
```json title="附件字段标准格式"
[
  {
    "id": 18,
    "md5": "e490f38eee7ab901e1945bc954ac1377",
    "uid": "rc-upload-1762154822429-5",
    "url": "https://test.oss-cn-beijing.aliyuncs.com/e490f38eee7ab901e1945bc954ac1377",
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

#### 核心字段说明
| 字段名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| id | int | 是 | 文件记录的唯一标识ID |
| md5 | string | 是 | 文件内容的MD5哈希值，用于文件去重和完整性校验 |
| type | string | 是 | 文件的MIME类型，如"image/jpeg"、"application/pdf" |
| fileName | string | 是 | 原始文件名，保留用户上传时的文件名 |
| url | string | 是 | 文件的完整访问URL地址 |

#### 辅助字段说明
| 字段名 | 类型 | 说明 |
|--------|------|------|
| uid | string | 上传会话的唯一标识 |
| name | string | 存储系统中的文件名（通常为MD5值） |
| size | int | 文件大小（字节） |
| expires | timestamp/null | 文件过期时间，null表示永久有效 |
| fullName | string | 存储类型的完整名称 |
| uploadTime | timestamp | 上传时间戳（毫秒） |
| uploadUser | string | 上传用户的用户名 |
| updateUserId | string | 更新用户ID |
| storeFullName | string/null | 存储实例的完整名称 |
| retentionPeriod | int/null | 文件保留期限 |

#### 使用示例
```python title="处理附件字段数据"
# 假设从数据库获取的附件字段数据
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

# 提取所有文件URL
urls = [att["url"] for att in attachments]

# 提取所有文件名
file_names = [att["fileName"] for att in attachments]

# 按文件类型分组
from collections import defaultdict
files_by_type = defaultdict(list)
for att in attachments:
    files_by_type[att["type"]].append(att)

# 获取图片文件
images = [att for att in attachments if att["type"].startswith("image/")]

# 验证文件完整性（通过MD5）
def verify_file_integrity(attachment):
    """验证文件MD5是否匹配"""
    file_data = storageSvc.download(attachment["fileName"])
    import hashlib
    calculated_md5 = hashlib.md5(file_data).hexdigest()
    return calculated_md5 == attachment["md5"]
```

```python title="构建附件数据对象"
# 上传文件并构建附件对象
def upload_and_create_attachment(file_path, original_filename, user_id):
    """
    上传文件并返回标准附件对象
    """
    import hashlib
    from pathlib import Path
    from datetime import datetime
    
    # 读取文件
    with open(file_path, "rb") as f:
        file_data = f.read()
    
    # 计算MD5
    md5_value = hashlib.md5(file_data).hexdigest()
    
    # 获取文件信息
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
    
    # 上传文件
    result = storageSvc.uploadByFile(
        file=md5_value + file_suffix,
        data=file_data,
        md5=md5_value,
        contentType=content_type
    )
    
    # 构建附件对象
    attachment = {
        "id": None,  # 由数据库自动生成
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

# 使用示例
attachment = upload_and_create_attachment(
    file_path="local/document.pdf",
    original_filename="合同文档.pdf",
    user_id="admin123"
)

# 将附件对象保存到数据模型的附件字段
# row_data["attachments"] = [attachment]
```

```python title="从附件列表下载所有文件"
def download_all_attachments(attachments, save_directory="downloads"):
    """
    下载附件列表中的所有文件
    """
    from pathlib import Path
    
    save_dir = Path(save_directory)
    save_dir.mkdir(parents=True, exist_ok=True)
    
    for attachment in attachments:
        try:
            # 使用MD5作为存储文件名下载
            file_data = storageSvc.download(attachment["name"])
            
            # 保存时使用原始文件名
            save_path = save_dir / attachment["fileName"]
            with open(save_path, "wb") as f:
                f.write(file_data)
            
            print(f"✓ 下载成功: {attachment['fileName']}")
            
        except Exception as e:
            print(f"✗ 下载失败 {attachment['fileName']}: {e}")

# 使用示例
download_all_attachments(attachments, save_directory="./downloaded_files")
```

### 文件过期自动清理 {#expiration-cleanup}
文件存储服务内置了完善的文件过期管理机制。

```python title="过期文件管理"
import hashlib

# 上传带过期时间的文件
result = storageSvc.uploadByFile(
    file="temp/session_data.json",
    data=json_data,
    contentType="application/json",
    expires=7200  # 2小时后过期
)

# 系统会自动记录以下信息到 FileModel：
# - uid: 文件唯一标识（基于文件名的MD5）
# - storeFullName: 存储实例名称
# - uploadTime: 上传时间
# - expires: 过期时间
# - md5: 文件内容MD5
# - fileName: 文件名
# - url: 访问URL

# 访问过期文件时会自动清理
try:
    data = storageSvc.download("temp/session_data.json")
except Exception:
    # 如果文件已过期，将返回404错误
    print("文件已过期或不存在")
```

### 多存储实例管理 {#multi-storage}
```python title="使用不同存储实例"
# 图片存储到CDN加速的OSS
image_result = storageSvc.uploadByFile(
    file="images/product.jpg",
    data=image_data,
    contentType="image/jpeg",
    storage="storages.CdnOss"
)

# 文档存储到安全性更高的私有存储
doc_result = storageSvc.uploadByFile(
    file="documents/contract.pdf",
    data=doc_data,
    contentType="application/pdf",
    storage="storages.SecureOss"
)

# 备份文件存储到成本更低的归档存储
backup_result = storageSvc.uploadByFile(
    file="backups/db_backup.sql",
    data=backup_data,
    contentType="application/sql",
    storage="storages.ArchiveStorage"
)
```

### 文件上传最佳实践 {#upload-best-practices}
```python title="推荐的上传模式"
import hashlib
from pathlib import Path

def upload_file_with_validation(file_path, remote_path, storage=None):
    """
    上传文件并进行完整性验证
    """
    # 读取文件
    with open(file_path, "rb") as f:
        file_data = f.read()
    
    # 计算MD5
    md5_value = hashlib.md5(file_data).hexdigest()
    
    # 根据文件扩展名确定ContentType
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
    
    # 上传文件
    result = storageSvc.uploadByFile(
        file=remote_path,
        data=file_data,
        md5=md5_value,
        contentType=content_type,
        storage=storage
    )
    
    return result

# 使用示例
result = upload_file_with_validation(
    file_path="local/report.pdf",
    remote_path="reports/2024/report.pdf"
)
print(f"上传成功: {result['url']}")
```

### 批量文件操作 {#batch-operations}
```python title="批量上传和管理"
def batch_upload_files(file_list, storage=None, expires=None):
    """
    批量上传文件
    :param file_list: [(file_path, remote_path), ...]
    :param storage: 存储实例名称
    :param expires: 过期时间（秒）
    :return: 上传结果列表
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

# 使用示例
files = [
    ("local/file1.txt", "batch/file1.txt"),
    ("local/file2.txt", "batch/file2.txt"),
    ("local/file3.txt", "batch/file3.txt"),
]

results = batch_upload_files(files, expires=86400)  # 24小时后过期
for result in results:
    if result["success"]:
        print(f"✓ {result['local']} -> {result['url']}")
    else:
        print(f"✗ {result['local']}: {result['error']}")
```

### 异常处理 {#exception-handling}
```python title="完善的异常处理"
from http import HTTPStatus

try:
    # 上传文件
    result = storageSvc.uploadByFile(
        file="test.txt",
        data=b"test data",
        contentType="text/plain"
    )
    print("上传成功")
    
except Exception as e:
    print(f"上传失败: {e}")

try:
    # 下载文件（可能已过期）
    data = storageSvc.download("temp/expired_file.txt")
    
except Exception as e:
    # 文件不存在或已过期
    print(f"下载失败: {e}")

try:
    # 预览文件
    response = storageSvc.preview("documents/test.pdf")
    if response.status_code == HTTPStatus.NOT_FOUND:
        print("文件不存在或已过期")
        
except Exception as e:
    print(f"预览失败: {e}")
```

## 最佳实践 {#best-practices}
### 1. 选择合适的存储策略 {#storage-strategy}
- **静态资源**（图片、CSS、JS）→ 使用CDN加速的OSS
- **用户文档**（合同、报告）→ 使用安全的私有存储
- **临时文件**（上传缓存）→ 使用本地存储或带过期时间
- **备份文件**（数据库备份）→ 使用归档存储降低成本

### 2. 合理使用过期时间 {#expiration-time}
```python
# 临时上传（1小时）
storageSvc.uploadByFile(file="temp/upload.tmp", data=data, expires=3600)

# 会话文件（24小时）
storageSvc.uploadByFile(file="sessions/data.json", data=data, expires=86400)

# 永久文件（不设置expires）
storageSvc.uploadByFile(file="documents/contract.pdf", data=data)
```

### 3. 使用MD5避免重复 {#md5-deduplication}
```python
import hashlib

file_data = get_file_data()
md5_value = hashlib.md5(file_data).hexdigest()

# 相同MD5的文件会被存储为同一个文件
result = storageSvc.uploadByFile(
    file="upload.jpg",
    data=file_data,
    md5=md5_value
)
```

### 4. 文件路径规范 {#path-conventions}
```python
# 推荐：使用有意义的目录结构
"users/avatars/user_123.jpg"
"documents/contracts/2024/contract_001.pdf"
"temp/uploads/session_abc123.tmp"

# 避免：混乱的扁平结构
"file123.jpg"
"upload.pdf"
```

## 注意事项 {#important-notes}
1. **默认存储配置**：确保在 `jit.config` 中正确配置了默认存储实例
2. **过期文件清理**：设置了过期时间的文件在访问时会自动清理，无需手动删除
3. **MD5使用**：使用MD5参数可以避免重复文件，但会改变存储的文件名
4. **存储实例命名**：指定存储实例时使用完整的元素名称，如 `storages.MyOss`
5. **ContentType**：正确设置ContentType可以确保文件预览时的正确显示
6. **大文件处理**：对于大文件建议使用 `getSignUrl` 获取签名后由客户端直传

## 相关元素 {#related-elements}
- **FileModel** (`storages.services.models.FileModel`) - 文件记录数据模型
- **存储类型元素** - 各种存储后端实现（OssType, S3Type, MinioType等）
- **NormalService** - 服务基类

