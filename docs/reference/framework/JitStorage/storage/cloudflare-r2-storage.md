---
slug: cloudflare-r2-storage
---
# Cloudflare R2存储
Cloudflare R2存储是面向高性能边缘云存储的Type元素，基于Cloudflare R2对象存储服务实现全球分布式数据存储、零出站费用和企业级性能优化。它提供标准化的文件上传、下载、删除操作，兼容S3 API接口，具有出色的成本效益和全球访问性能。

Cloudflare R2存储元素分层结构为Meta（storages.Meta） → Type（storages.CloudflareR2Type） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Cloudflare R2存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的storages.CloudflareR2Type元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
storages/
├── MyR2/                      # 自定义实例元素名称
│   ├── e.json                 # 元素声明文件
│   └── MyR2.json             # Cloudflare R2配置文件
```

#### e.json文件
```json title="基础配置"
{
  "title": "我的Cloudflare R2存储",
  "type": "storages.CloudflareR2Type",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### 业务配置文件
```json title="Cloudflare R2连接配置"
{
  "accessKeyId": "your_r2_access_key_id",
  "accessKeySecret": "your_r2_secret_access_key", 
  "endPoint": "your-account-id.r2.cloudflarestorage.com",
  "bucketName": "your_bucket_name",
  "region": "auto"
}
```

#### 调用示例
```python title="基本使用"
# 获取Cloudflare R2存储实例
r2 = app.getElement("storages.MyR2")

# 上传文件
with open("example.txt", "rb") as file:
    result = r2.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"上传成功，URL: {result['url']}")

# 下载文件
file_data = r2.download("folder/example.txt")

# 删除文件
r2.delete("folder/example.txt")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 存储元素显示名称 |
| type | string | 是 | 固定值：storages.CloudflareR2Type |
| backendBundleEntry | string | 是 | 固定值："." |
| variables | array | 否 | 自定义变量配置，一般为空数组 |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKeyId | string | 是 | Cloudflare R2访问密钥ID |
| accessKeySecret | string | 是 | Cloudflare R2访问密钥Secret |
| endPoint | string | 是 | R2服务访问域名，格式为：your-account-id.r2.cloudflarestorage.com |
| bucketName | string | 是 | R2存储桶名称 |
| region | string | 是 | 区域设置，通常为"auto" |

## 方法 
### uploadByFile
上传文件到Cloudflare R2存储。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 存储文件的路径名称 |
| data | - | bytes | 是 | 文件二进制数据 |
| contentType | Stext | str | 否 | 文件MIME类型，默认为"application/octet-stream" |

#### 返回值
返回包含上传结果的字典，包含url字段表示文件访问地址。

#### 使用示例
```python title="文件上传"
# 上传图片文件
with open("avatar.jpg", "rb") as file:
    result = r2.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# 上传文档文件
with open("document.pdf", "rb") as file:
    result = r2.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
```

### getSignUrl
获取文件的预签名访问URL，用于临时访问权限控制。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件路径名称 |
| contentType | Stext | str | 是 | 文件MIME类型 |
| expires | Numeric | int | 否 | 过期时间(秒)，默认300秒 |

#### 返回值
返回预签名URL字符串。

#### 使用示例
```python title="获取预签名URL"
# 获取图片的临时访问URL
temp_url = r2.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# 获取文档的临时下载URL
download_url = r2.getSignUrl("docs/document.pdf", "application/pdf")
```

### download
下载文件数据。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要下载的文件路径名称 |

#### 返回值
返回文件的二进制数据。

#### 使用示例
```python title="文件下载"
# 下载文件
file_data = r2.download("docs/document.pdf")

# 保存到本地
with open("downloaded_document.pdf", "wb") as file:
    file.write(file_data)
```

### getObject
获取文件对象信息。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件路径名称 |

#### 返回值
返回文件对象信息。

#### 使用示例
```python title="获取文件信息"
# 获取文件对象
file_obj = r2.getObject("users/avatar.jpg")
```

### delete
删除指定文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的文件路径名称 |

#### 返回值
返回删除操作结果。

#### 使用示例
```python title="文件删除"
# 删除用户头像
r2.delete("users/avatar.jpg")

# 删除临时文件
r2.delete("temp/upload_cache.tmp")
```

## 高级特性
### 异常处理机制
Cloudflare R2存储内置了完善的异常处理机制，所有方法都会自动捕获和转换异常。

```python title="异常处理示例"
try:
    r2.uploadByFile("test.txt", b"test data", "text/plain")
except Exception as e:
    # 异常会包含详细的错误信息，包括存储类型、元素名称等
    print(f"上传失败: {e}")
```

### 批量操作
```python title="批量文件管理"
# 批量上传文件
files = [
    ("file1.txt", b"content1", "text/plain"),
    ("file2.txt", b"content2", "text/plain")
]

for name, data, content_type in files:
    try:
        result = r2.uploadByFile(f"batch/{name}", data, content_type)
        print(f"上传成功: {name}")
    except Exception as e:
        print(f"上传失败 {name}: {e}")
```

### 零出站费用优势
```python title="成本优化配置"
# Cloudflare R2的主要优势是零出站费用
# 特别适合以下场景：
# - 静态网站托管
# - CDN原始内容存储
# - 大文件分发
# - 媒体内容交付

# 配置示例：与Cloudflare CDN集成
def setup_cdn_integration():
    """
    配置R2与Cloudflare CDN的集成
    实现全球边缘加速和零出站费用
    """
    # 1. 在Cloudflare控制台配置自定义域名
    # 2. 设置Cache规则优化性能
    # 3. 配置Worker脚本进行高级处理
    pass
```

### S3兼容性
```python title="S3兼容API"
# Cloudflare R2完全兼容AWS S3 API
# 可以直接迁移现有的S3应用
# 支持所有标准S3操作

# 迁移配置示例
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
    从AWS S3迁移到Cloudflare R2的工具函数
    """
    # 1. 配置R2存储桶
    # 2. 批量复制文件
    # 3. 更新应用配置
    # 4. 验证数据完整性
    pass
```

### Workers集成
```python title="Cloudflare Workers集成"
# 利用Cloudflare Workers进行高级文件处理
# 支持边缘计算和实时图像处理

def setup_worker_processing():
    """
    配置Workers进行文件处理
    """
    # Workers可以实现：
    # - 图像尺寸调整和格式转换
    # - 视频转码和缩略图生成
    # - 文件压缩和解压缩
    # - 访问权限控制
    # - 实时内容变换
    pass

# 示例：动态图像处理
# https://your-domain.com/image.jpg?width=300&height=200&format=webp
```

### 安全最佳实践
```python title="安全配置建议"
# 1. 使用API Token而不是Global API Key
# 2. 配置适当的CORS策略
# 3. 启用访问日志记录
# 4. 使用预签名URL控制访问
# 5. 定期审计访问权限

# 使用环境变量存储敏感信息
import os
config = {
    "accessKeyId": os.getenv("R2_ACCESS_KEY_ID"),
    "accessKeySecret": os.getenv("R2_SECRET_ACCESS_KEY"),
    "accountId": os.getenv("R2_ACCOUNT_ID")
}

# 安全配置示例
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

### 性能优化
```python title="性能优化配置"
# Cloudflare R2的全球边缘网络优势
def optimize_performance():
    """
    性能优化最佳实践
    """
    # 1. 使用自定义域名以获得更好的缓存性能
    # 2. 配置适当的Cache-Control头
    # 3. 启用Brotli压缩
    # 4. 使用WebP格式优化图像
    # 5. 实现智能缓存策略
    
    cache_headers = {
        "Cache-Control": "public, max-age=31536000",  # 1年缓存
        "Content-Encoding": "br",  # Brotli压缩
        "Vary": "Accept-Encoding"
    }
    
    return cache_headers
```
