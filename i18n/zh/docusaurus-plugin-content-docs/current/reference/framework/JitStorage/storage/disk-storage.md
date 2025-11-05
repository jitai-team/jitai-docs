---
slug: disk-storage
description: "磁盘存储 API 参考文档。完整的规格说明、方法和示例。"
---
# 磁盘存储
磁盘存储是基于本地文件系统的存储服务，提供高速的文件读写能力和直接的文件路径访问。它适用于小型应用、开发环境，以及对数据安全性要求较高的内部系统部署。磁盘存储支持文件上传、下载、删除、预览和缩略图生成功能，并内置了MIME类型识别和错误处理机制。

磁盘存储元素分层结构为Meta（storages.Meta） → Type（storages.DiskType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建磁盘存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的storages.DiskType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
storages/
└── MyDiskStorage/                    # 存储元素名称，可自定义
    ├── e.json                        # 元素定义文件
    └── MyDiskStorage.json           # 业务配置文件
```

#### e.json文件
```json title="元素定义配置"
{
  "title": "我的磁盘存储",
  "type": "storages.DiskType",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="MyDiskStorage.json"
{
  "directory": "appData/storages/MyDiskStorage"
}
```

#### 调用示例
```python title="基本使用示例"
# 获取磁盘存储实例
storage = app.getElement("storages.MyDiskStorage")

# 上传文件
with open("test.txt", "rb") as file:
    result = storage.uploadByFile("test.txt", file.read(), "text/plain")
    print(result['url'])  # 返回文件访问URL

# 下载文件
response = storage.download("test.txt")

# 删除文件
storage.delete("test.txt")
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | 字符串 | 是 | 存储元素的显示名称 |
| type | 字符串 | 是 | 固定值："storages.DiskType" |
| backendBundleEntry | 字符串 | 是 | 固定值："." |

### 业务配置文件配置
业务配置文件名称必须与元素名称相同，包含以下配置项：

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| directory | 字符串 | 是 | 存储目录路径。可以是相对路径（相对于应用目录）或绝对路径 |

**路径说明：**
- 相对路径：`appData/storages/MyStorage` → `应用目录/appData/storages/MyStorage`
- 绝对路径：`/data/files` → 直接使用绝对路径

## 方法 
### uploadByFile
上传文件到磁盘存储。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件名称，包含扩展名 |
| data | - | bytes | 是 | 文件二进制数据 |
| contentType | Stext | str | 否 | MIME类型，默认为"application/octet-stream" |

#### 返回值
返回包含文件访问URL的字典：
```python
{
    "url": "http://domain/storages/services/StorageSvc/preview?file=filename.txt"
}
```

#### 使用示例
```python title="文件上传示例"
storage = app.getElement("storages.MyDiskStorage")

# 上传文本文件
with open("document.txt", "rb") as file:
    result = storage.uploadByFile("document.txt", file.read(), "text/plain")
    
# 上传图片文件
with open("image.jpg", "rb") as file:
    result = storage.uploadByFile("image.jpg", file.read(), "image/jpeg")
```

### download
下载指定的文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 要下载的文件名称 |

#### 返回值
返回Flask Response对象，包含文件内容和正确的MIME类型头。

#### 使用示例
```python title="文件下载示例"
storage = app.getElement("storages.MyDiskStorage")

# 下载文件
response = storage.download("document.txt")
# 响应会自动设置正确的Content-Type和下载头
```

### delete
删除指定的文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的文件名称 |

#### 使用示例
```python title="文件删除示例"
storage = app.getElement("storages.MyDiskStorage")

# 删除文件
storage.delete("document.txt")
```

### preview
预览指定的文件，支持在浏览器中直接显示。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 要预览的文件名称 |

#### 返回值
返回Flask Response对象，设置为内联显示模式。

#### 使用示例
```python title="文件预览示例"
storage = app.getElement("storages.MyDiskStorage")

# 预览文件
response = storage.preview("image.jpg")
# 图片将在浏览器中直接显示
```

### previewThumbnail
生成并返回文件的缩略图，主要用于图片文件。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 图片文件名称 |
| width | Numeric | int | 否 | 缩略图宽度，默认120像素 |
| height | Numeric | int | 否 | 缩略图高度，默认120像素 |

#### 返回值
返回缩略图的Flask Response对象。如果缩略图不存在会自动生成并缓存。

#### 使用示例
```python title="缩略图生成示例"
storage = app.getElement("storages.MyDiskStorage")

# 生成默认尺寸缩略图
thumbnail = storage.previewThumbnail("photo.jpg")

# 生成指定尺寸缩略图
thumbnail = storage.previewThumbnail("photo.jpg", 200, 150)
```

## 属性
### rootDir
只读属性，返回存储的根目录绝对路径。

### name
只读属性，返回存储元素的fullName。

## 高级特性
### 自动目录创建
磁盘存储在上传文件时会自动创建所需的目录结构：

```python title="嵌套目录文件上传"
storage = app.getElement("storages.MyDiskStorage")

# 上传到子目录，目录会自动创建
with open("doc.pdf", "rb") as file:
    result = storage.uploadByFile("documents/2024/doc.pdf", file.read())
```

### MIME类型自动识别
系统内置了丰富的MIME类型映射，支持数百种文件格式的自动识别：

```python title="MIME类型处理"
storage = app.getElement("storages.MyDiskStorage")

# 系统会根据文件扩展名自动设置正确的MIME类型
storage.uploadByFile("video.mp4", video_data)  # 自动识别为video/mp4
storage.uploadByFile("document.pdf", pdf_data)  # 自动识别为application/pdf
```

### 缩略图缓存机制
缩略图生成后会保存在磁盘上，避免重复生成：

```python title="缩略图缓存策略"
storage = app.getElement("storages.MyDiskStorage")

# 首次调用会生成缩略图文件：image_120_120.jpg
thumbnail1 = storage.previewThumbnail("image.jpg", 120, 120)

# 后续调用直接返回已生成的缩略图
thumbnail2 = storage.previewThumbnail("image.jpg", 120, 120)
```

### 权限错误处理
当目录权限不足时，系统会抛出友好的错误信息：

```python title="权限错误处理"
try:
    storage.uploadByFile("test.txt", b"content")
except Exception as e:
    # 会显示相对路径而非完整的系统路径
    print(f"权限错误: {e}")
``` 