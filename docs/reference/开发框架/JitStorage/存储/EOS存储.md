# EOS存储

EOS存储是基于中国移动云EOS（云对象存储）服务的企业级存储解决方案，提供高性能、高可用性的云存储能力。它支持大规模数据存储和高并发访问，专为企业核心业务系统的文件存储需求而设计。

EOS存储元素分层结构为Meta（storages.Meta） → Type（storages.EosType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建EOS存储实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的storages.EosType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构

```text title="推荐目录结构"
storages/
└── myEosStorage/
    ├── e.json                    # 元素定义文件
    └── myEosStorage.json         # EOS配置文件
```

#### e.json文件

```json title="e.json配置示例"
{
  "title": "我的EOS存储",
  "type": "storages.EosType",
  "backendBundleEntry": ".",
  "variables": []
}
```

#### 业务配置文件

```json title="myEosStorage.json配置示例"
{
  "accessKeyId": "your_access_key_id",
  "accessKeySecret": "your_access_key_secret", 
  "endPoint": "eos-beijing-1.cmecloud.cn",
  "bucketName": "my-bucket"
}
```

#### 调用示例

```python title="基础使用示例"
# 获取EOS存储实例
storage = app.getElement("storages.myEosStorage")

# 上传文件
with open("/path/to/file.pdf", "rb") as f:
    file_data = f.read()
result = storage.uploadByFile("documents/file.pdf", file_data, "application/pdf")

# 下载文件
file_content = storage.download("documents/file.pdf")

# 删除文件
storage.delete("documents/file.pdf")
```

## 元素配置

### e.json配置

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | str | 是 | 存储实例的显示名称 |
| type | str | 是 | 固定值：storages.EosType |
| backendBundleEntry | str | 是 | 固定值："." |
| variables | list | 否 | 变量配置，通常为空列表 |

### 业务配置文件配置

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accessKeyId | str | 是 | EOS访问密钥ID |
| accessKeySecret | str | 是 | EOS访问密钥Secret |
| endPoint | str | 是 | EOS服务端点地址 |
| bucketName | str | 是 | 存储桶名称 |
| scheme | str | 否 | 访问协议，默认为"https" |

## 方法

### uploadByFile

通过文件数据上传文件到EOS存储。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件在存储中的路径名称 |
| data | - | bytes | 是 | 文件二进制数据 |
| contentType | Stext | str | 否 | MIME类型，默认为"application/octet-stream" |

#### 返回值
返回上传结果信息

#### 使用示例

```python title="文件上传示例"
storage = app.getElement("storages.myEosStorage")

# 上传PDF文件
with open("/path/to/document.pdf", "rb") as f:
    pdf_data = f.read()
result = storage.uploadByFile("docs/document.pdf", pdf_data, "application/pdf")

# 上传图片文件
with open("/path/to/image.jpg", "rb") as f:
    img_data = f.read()
result = storage.uploadByFile("images/photo.jpg", img_data, "image/jpeg")
```

### getSignUrl

获取文件的预签名URL，用于临时访问。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| file | Stext | str | 是 | 文件路径 |
| contentType | Stext | str | 是 | 文件MIME类型 |
| expires | Numeric | int | 否 | 过期时间(秒)，默认300秒 |

#### 返回值
返回预签名URL字符串

#### 使用示例

```python title="获取签名URL示例"
storage = app.getElement("storages.myEosStorage")

# 获取5分钟有效期的下载链接
url = storage.getSignUrl("docs/document.pdf", "application/pdf")

# 获取自定义有效期的下载链接(1小时)
url = storage.getSignUrl("images/photo.jpg", "image/jpeg", 3600)
```

### download

下载文件内容。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要下载的文件路径 |

#### 返回值
返回文件的二进制数据

#### 使用示例

```python title="文件下载示例"
storage = app.getElement("storages.myEosStorage")

# 下载文件
file_data = storage.download("docs/document.pdf")

# 保存到本地
with open("/local/path/document.pdf", "wb") as f:
    f.write(file_data)
```

### getObject

获取文件对象信息。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 文件路径 |

#### 返回值
返回文件对象信息

#### 使用示例

```python title="获取对象信息示例"
storage = app.getElement("storages.myEosStorage")

# 获取文件对象信息
obj_info = storage.getObject("docs/document.pdf")
```

### delete

删除指定文件。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | Stext | str | 是 | 要删除的文件路径 |

#### 返回值
返回删除操作结果

#### 使用示例

```python title="文件删除示例"
storage = app.getElement("storages.myEosStorage")

# 删除单个文件
result = storage.delete("docs/old_document.pdf")

# 批量删除文件
files_to_delete = ["temp/file1.txt", "temp/file2.txt", "temp/file3.txt"]
for file_path in files_to_delete:
    storage.delete(file_path)
```

## 属性

### SIGN_EXPIRES

默认签名URL过期时间，固定值为300秒。

### config

存储配置信息，包含accessKeyId、accessKeySecret、endPoint、bucketName等配置参数。

### name

存储实例的fullName标识。

### client

EOS客户端实例，用于与EOS服务进行交互。

## 高级特性

### 异常处理机制

EOS存储内置了完善的异常处理机制，所有操作方法都通过`@exceptHandler`装饰器进行异常捕获和转换，将底层异常转换为统一的存储错误码。

```python title="异常处理示例"
from jit.errcode import Code

storage = app.getElement("storages.myEosStorage")

try:
    storage.uploadByFile("test.txt", b"test content", "text/plain")
except Code as e:
    # 处理业务错误码
    print(f"存储操作失败: {e}")
except Exception as e:
    # 处理其他异常
    print(f"未知错误: {e}")
```

### 环境变量支持

配置文件支持使用环境变量进行动态配置，适用于不同部署环境：

```json title="使用环境变量的配置示例"
{
  "accessKeyId": "${EOS_ACCESS_KEY_ID}",
  "accessKeySecret": "${EOS_ACCESS_KEY_SECRET}",
  "endPoint": "${EOS_ENDPOINT}",
  "bucketName": "${EOS_BUCKET_NAME}"
}
```

### 文件路径管理

建议采用规范的文件路径命名，便于文件组织和管理：

```python title="文件路径管理示例"
storage = app.getElement("storages.myEosStorage")

# 按业务模块组织文件
storage.uploadByFile("user/avatars/user123.jpg", avatar_data, "image/jpeg")
storage.uploadByFile("documents/contracts/contract001.pdf", contract_data, "application/pdf")
storage.uploadByFile("exports/reports/monthly_report_2024_01.xlsx", report_data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

# 按日期组织文件
from datetime import datetime
date_path = datetime.now().strftime("%Y/%m/%d")
storage.uploadByFile(f"uploads/{date_path}/file.txt", file_data, "text/plain")
``` 