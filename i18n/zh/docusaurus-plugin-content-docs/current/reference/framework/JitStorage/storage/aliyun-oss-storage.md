---
slug: aliyun-oss-storage
description: "阿里云OSS存储 API 参考文档。完整的规格说明、方法和示例。"
---
# 阿里云OSS存储
阿里云OSS存储是面向企业级云存储的Type元素，基于阿里云对象存储服务实现海量数据存储、全球CDN加速和企业级安全管控。它提供标准化的文件上传、下载、删除操作，集成阿里云生态的访问控制和权限管理，支持多种存储类型和数据备份策略，确保数据安全性和高可用性。

阿里云OSS存储元素分层结构为Meta（storages.Meta） → Type（storages.OssType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建阿里云OSS存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的storages.OssType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
storages/
├── MyOss/                     # 自定义实例元素名称
│   ├── e.json                 # 元素声明文件
│   └── MyOss.json            # 阿里云OSS配置文件
```

#### e.json文件
```json title="基础配置"
{
  "title": "我的阿里云OSS存储",
  "type": "storages.OssType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### 业务配置文件
```json title="阿里云OSS连接配置"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_access_key_secret", 
  "endPoint": "oss-cn-hangzhou.aliyuncs.com",
  "bucketName": "your_bucket_name"
}
```

#### 调用示例
```python title="基本使用"
# 获取阿里云OSS存储实例
oss = app.getElement("storages.MyOss")

# 上传文件
with open("example.txt", "rb") as file:
    result = oss.uploadByFile("folder/example.txt", file.read(), "text/plain")
    print(f"上传成功，URL: {result['url']}")

# 下载文件
file_data = oss.download("folder/example.txt")

# 删除文件
oss.delete("folder/example.txt")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 存储元素显示名称 |
| type | string | 是 | 固定值：storages.OssType |
| backendBundleEntry | string | 是 | 固定值："." |
| variables | array | 否 | 自定义变量配置，一般为空数组 |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKeyId | string | 是 | 阿里云访问密钥ID |
| accessKeySecret | string | 是 | 阿里云访问密钥Secret |
| endPoint | string | 是 | OSS服务访问域名，如：oss-cn-hangzhou.aliyuncs.com |
| bucketName | string | 是 | OSS存储桶名称 |

## 方法 
### uploadByFile
上传文件到阿里云OSS存储。

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
    result = oss.uploadByFile("users/avatar.jpg", file.read(), "image/jpeg")
    avatar_url = result["url"]

# 上传文档文件
with open("document.pdf", "rb") as file:
    result = oss.uploadByFile("docs/document.pdf", file.read(), "application/pdf")
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
temp_url = oss.getSignUrl("users/avatar.jpg", "image/jpeg", 600)

# 获取文档的临时下载URL
download_url = oss.getSignUrl("docs/document.pdf", "application/pdf")
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
file_data = oss.download("docs/document.pdf")

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
file_obj = oss.getObject("users/avatar.jpg")
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
oss.delete("users/avatar.jpg")

# 删除临时文件
oss.delete("temp/upload_cache.tmp")
```

## 高级特性
### 异常处理机制
阿里云OSS存储内置了完善的异常处理机制，所有方法都会自动捕获和转换异常。

```python title="异常处理示例"
try:
    oss.uploadByFile("test.txt", b"test data", "text/plain")
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
        result = oss.uploadByFile(f"batch/{name}", data, content_type)
        print(f"上传成功: {name}")
    except Exception as e:
        print(f"上传失败 {name}: {e}")
```

### 大文件处理
```python title="大文件上传"
# 分块读取大文件
def upload_large_file(file_path, remote_path):
    with open(file_path, "rb") as file:
        file_data = file.read()
        return oss.uploadByFile(remote_path, file_data, "application/octet-stream")

# 使用示例
result = upload_large_file("large_video.mp4", "videos/large_video.mp4")
``` 