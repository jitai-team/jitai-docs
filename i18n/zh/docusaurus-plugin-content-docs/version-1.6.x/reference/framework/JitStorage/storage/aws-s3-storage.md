---
slug: aws-s3-storage
description: "AWS S3存储 API 参考文档。完整的规格说明、方法和示例。"
---
# AWS S3存储
AWS S3存储是面向全球化云存储的Type元素，基于Amazon Simple Storage Service实现海量数据存储、全球CDN加速和企业级安全管控。它提供标准化的文件上传、下载、删除操作，集成AWS生态的访问控制和权限管理，支持多种存储类型和数据备份策略，确保数据安全性和高可用性。

AWS S3存储元素分层结构为Meta（storages.Meta） → Type（storages.AwsS3Type） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建AWS S3存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的storages.AwsS3Type元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
storages/
├── MyS3/                      # 自定义实例元素名称
│   ├── e.json                 # 元素声明文件
│   └── MyS3.json             # AWS S3配置文件
```

#### e.json文件
```json title="基础配置"
{
  "title": "我的AWS S3存储",
  "type": "storages.AwsS3Type",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### 业务配置文件
```json title="AWS S3连接配置"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_secret_access_key", 
  "endPoint": "s3.amazonaws.com",
  "bucketName": "your_bucket_name",
  "region": "us-east-1"
}
```

#### 调用示例
```python title="基本使用"
# 获取AWS S3存储实例
s3 = app.getElement("storages.MyS3")

# 上传文件
with open("example.txt", "rb") as file:
    result = s3.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"上传成功，URL: {result['url']}")

# 下载文件
file_data = s3.download("folder/example.txt")

# 删除文件
s3.delete("folder/example.txt")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 存储元素显示名称 |
| type | string | 是 | 固定值：storages.AwsS3Type |
| backendBundleEntry | string | 是 | 固定值："." |
| variables | array | 否 | 自定义变量配置，一般为空数组 |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKeyId | string | 是 | AWS访问密钥ID |
| accessKeySecret | string | 是 | AWS访问密钥Secret |
| endPoint | string | 是 | S3服务访问域名，如：s3.amazonaws.com |
| bucketName | string | 是 | S3存储桶名称 |
| region | string | 是 | AWS区域代码，如：us-east-1, us-west-2等 |

## 方法 
### uploadByFile
上传文件到AWS S3存储。

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
    result = s3.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# 上传文档文件
with open("document.pdf", "rb") as file:
    result = s3.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
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
temp_url = s3.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# 获取文档的临时下载URL
download_url = s3.getSignUrl("docs/document.pdf", "application/pdf")
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
file_data = s3.download("docs/document.pdf")

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
file_obj = s3.getObject("users/avatar.jpg")
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
s3.delete("users/avatar.jpg")

# 删除临时文件
s3.delete("temp/upload_cache.tmp")
```

## 高级特性
### 异常处理机制
AWS S3存储内置了完善的异常处理机制，所有方法都会自动捕获和转换异常。

```python title="异常处理示例"
try:
    s3.uploadByFile("test.txt", b"test data", "text/plain")
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
        result = s3.uploadByFile(f"batch/{name}", data, content_type)
        print(f"上传成功: {name}")
    except Exception as e:
        print(f"上传失败 {name}: {e}")
```

### 跨区域访问
```python title="跨区域配置"
# AWS S3支持多区域存储，可以根据业务需求选择最佳区域
# 配置文件中可以指定不同区域：
# "region": "us-west-2"  # 美国西部
# "region": "eu-west-1"  # 欧洲西部
# "region": "ap-northeast-1"  # 亚太东北部（东京）
```

### 存储类型优化
```python title="存储类型配置"
# AWS S3提供多种存储类型，适用于不同的访问模式：
# - Standard: 频繁访问的数据
# - Infrequent Access (IA): 不频繁访问的数据
# - Glacier: 归档存储
# - Deep Archive: 深度归档

# 可以在上传时指定存储类型
def upload_with_storage_class(name, data, storage_class="STANDARD"):
    # 实际实现中可能需要额外参数支持
    return s3.uploadByFile(name, data, "application/octet-stream")
```

### 安全最佳实践
```python title="安全配置建议"
# 1. 使用IAM角色而不是硬编码密钥
# 2. 启用S3存储桶版本控制
# 3. 配置适当的存储桶策略
# 4. 使用预签名URL进行临时访问
# 5. 定期轮换访问密钥

# 使用环境变量存储敏感信息
import os
config = {
    "accessKeyId": os.getenv("AWS_ACCESS_KEY_ID"),
    "accessKeySecret": os.getenv("AWS_SECRET_ACCESS_KEY"),
    "region": os.getenv("AWS_REGION", "us-east-1")
}
```
