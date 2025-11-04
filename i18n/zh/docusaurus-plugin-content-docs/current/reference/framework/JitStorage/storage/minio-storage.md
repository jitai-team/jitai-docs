---
slug: minio-storage
description: "MinIO存储 API 参考文档。完整的规格说明、方法和示例。"
---
# MinIO存储
MinIO存储是开源的私有云对象存储服务，基于S3兼容API实现海量非结构化数据的高性能存储管理。它负责文件上传、下载、删除和签名URL生成，支持分布式部署和数据分片，适合需要数据本地化管理的企业私有云环境。

MinIO存储元素分层结构为Meta（storages.Meta） → Type（storages.MinioType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建MinIO存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的storages.MinioType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
storages/
└── MyMinioStorage/          # 存储元素名称（可自定义）
    ├── e.json              # 元素配置文件
    └── MyMinioStorage.json # 业务配置文件（与目录名同名）
```

#### e.json文件
```json title="e.json配置示例"
{
  "title": "我的MinIO存储",
  "type": "storages.MinioType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### 业务配置文件
```json title="MyMinioStorage.json配置示例"
{
  "accessKeyId": "your-access-key",
  "accessKeySecret": "your-secret-key",
  "scheme": "https",
  "endPoint": "minio.example.com:9000",
  "bucketName": "my-bucket"
}
```

#### 调用示例
```python title="基本使用示例"
# 获取MinIO存储实例
storage = app.getElement("storages.MyMinioStorage")

# 上传文件
with open("test.txt", "rb") as file:
    result = storage.uploadByFile("test.txt", file.read(), "text/plain")
    print(f"上传成功，URL: {result['url']}")

# 下载文件
file_data = storage.download("test.txt")

# 删除文件
storage.delete("test.txt")
```

## 元素配置
### e.json配置
| 属性名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 存储元素显示名称 |
| type | string | 是 | 固定值：storages.MinioType |
| backendBundleEntry | string | 是 | 固定值："." |
| variables | array | 否 | 扩展变量配置，通常为空数组 |

### 业务配置文件配置
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKeyId | string | 是 | MinIO访问密钥ID |
| accessKeySecret | string | 是 | MinIO访问密钥Secret |
| endPoint | string | 是 | MinIO服务器地址和端口 |
| bucketName | string | 是 | 存储桶名称 |
| scheme | string | 否 | 协议类型，默认"http"，可选"https" |

## 方法 
### uploadByFile
上传文件到MinIO存储。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件名称 |
| data | - | bytes | 是 | 文件二进制数据 |
| contentType | Stext | str | 否 | 文件MIME类型，默认"application/octet-stream" |

#### 返回值
返回包含上传结果的字典，格式：`{"url": "文件访问URL"}`

#### 使用示例
```python title="文件上传示例"
storage = app.getElement("storages.MyMinioStorage")

# 上传文本文件
with open("document.txt", "rb") as file:
    result = storage.uploadByFile(
        name="document.txt",
        data=file.read(),
        contentType="text/plain"
    )
    print(f"文件URL: {result['url']}")

# 上传图片文件
with open("image.jpg", "rb") as file:
    result = storage.uploadByFile(
        name="image.jpg",
        data=file.read(),
        contentType="image/jpeg"
    )
```

### download
从MinIO存储下载文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要下载的文件名称 |

#### 返回值
返回文件的二进制数据

#### 使用示例
```python title="文件下载示例"
storage = app.getElement("storages.MyMinioStorage")

# 下载文件
file_data = storage.download("document.txt")

# 保存到本地
with open("downloaded_document.txt", "wb") as file:
    file.write(file_data)
```

### delete
删除MinIO存储中的文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的文件名称 |

#### 返回值
删除操作的结果信息

#### 使用示例
```python title="文件删除示例"
storage = app.getElement("storages.MyMinioStorage")

# 删除文件
result = storage.delete("document.txt")
print("文件删除成功")
```

### getSignUrl
生成文件的预签名上传URL。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件名称 |
| contentType | Stext | str | 是 | 文件MIME类型 |
| expires | Numeric | int | 否 | 签名过期时间（秒），默认300秒 |

#### 返回值
返回包含预签名URL和内容类型的字典

#### 使用示例
```python title="预签名URL生成示例"
storage = app.getElement("storages.MyMinioStorage")

# 生成预签名URL
sign_result = storage.getSignUrl(
    file="upload.pdf",
    contentType="application/pdf",
    expires=600  # 10分钟过期
)
print(f"预签名URL: {sign_result['url']}")
```

### getObject
获取MinIO存储中的文件对象。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件名称 |

#### 返回值
返回文件对象

#### 使用示例
```python title="获取文件对象示例"
storage = app.getElement("storages.MyMinioStorage")

# 获取文件对象
file_obj = storage.getObject("document.txt")
```

## 属性
### config
存储配置信息，包含accessKeyId、accessKeySecret、endPoint、bucketName、scheme等配置参数。

### name
存储实例的fullName标识。

### client
MinIO客户端实例，用于与MinIO服务器通信。

### SIGN_EXPIRES
默认签名过期时间，值为300秒。

## 高级特性
### 环境变量支持
MinIO存储支持在配置文件中使用环境变量，实现不同环境的配置隔离：

```json title="环境变量配置示例"
{
  "accessKeyId": "${MINIO_ACCESS_KEY}",
  "accessKeySecret": "${MINIO_SECRET_KEY}",
  "scheme": "${MINIO_SCHEME:-https}",
  "endPoint": "${MINIO_ENDPOINT}",
  "bucketName": "${MINIO_BUCKET}"
}
```

### 异常处理
MinIO存储提供专门的异常处理机制，自动处理HTTP错误和存储操作异常：

```python title="异常处理示例"
storage = app.getElement("storages.MyMinioStorage")

try:
    result = storage.uploadByFile("test.txt", data, "text/plain")
except Exception as e:
    # 自动处理404文件不存在、网络错误等异常
    print(f"存储操作失败: {e}")
```

### 批量文件操作
```python title="批量操作示例"
storage = app.getElement("storages.MyMinioStorage")

# 批量上传文件
files = ["file1.txt", "file2.txt", "file3.txt"]
for filename in files:
    with open(filename, "rb") as file:
        storage.uploadByFile(filename, file.read(), "text/plain")

# 批量删除文件
for filename in files:
    storage.delete(filename)
``` 