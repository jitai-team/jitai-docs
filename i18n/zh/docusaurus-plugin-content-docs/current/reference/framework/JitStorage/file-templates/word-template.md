---
slug: word-template
---
# Word模板
Word模板专用于生成和处理Word格式文档，基于Jinja2模板引擎实现动态文档生成。它负责Word文档的模板化渲染、变量替换和复杂内容填充，支持文本、图片、表格、链接等多种元素的动态处理，适用于合同、报告、公文等正式文档的批量生成。

Word模板元素分层结构为Meta（fileTmpls.Meta） → Type（fileTmpls.WordType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Word模板实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的fileTmpls.WordType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
fileTmpls/
└── testWordTemplate/
    ├── e.json
    ├── testWordTemplate.json
    └── templateFile.docx
```

#### e.json文件
```json title="基础配置文件"
{
  "title": "测试Word模板",
  "type": "fileTmpls.WordType",
  "frontBundleEntry": "testWordTemplate.json",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="testWordTemplate.json"
{
  "dataList": [
    {
      "name": "name",
      "title": "姓名",
      "dataType": "Stext"
    },
    {
      "name": "company",
      "title": "公司名称", 
      "dataType": "Stext"
    },
    {
      "name": "date",
      "title": "签署日期",
      "dataType": "Date"
    }
  ],
  "files": {
    "fileName": "合同模板.docx"
  }
}
```

#### 调用示例
```python title="Word模板渲染示例"
# 获取Word模板元素
template = app.getElement("fileTmpls.testWordTemplate")

# 准备渲染数据
context = {
    "name": "张三",
    "company": "某某科技有限公司",
    "date": "2024-01-15"
}

# 渲染生成Word文档
result = template.render(context)

# result是BytesIO对象，可以保存或下载
with open("生成的文档.docx", "wb") as f:
    f.write(result.getvalue())
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 模板显示名称 |
| type | string | 是 | 固定值"fileTmpls.WordType" |
| frontBundleEntry | string | 是 | 业务配置文件路径 |
| backendBundleEntry | string | 是 | 后端入口，通常为"." |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| dataList | array | 是 | 模板变量定义列表 |
| files | object | 是 | 模板文件配置 |

#### dataList配置项
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 变量名称 |
| title | string | 是 | 变量显示名称 |
| dataType | string | 是 | 数据类型（Stext、Date、Numeric等） |

#### files配置项
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| fileName | string | 是 | Word模板文件名称 |
| url | string | 否 | 模板文件URL（兼容旧版本） |

## 方法 
### render
将数据通过Word模板渲染生成最终文档。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| context | JitDict | dict | 是 | 渲染数据字典 |
| elemName | Stext | str | 否 | 元素名称，用于内部处理 |

#### 返回值
返回BytesIO对象，包含生成的Word文档二进制数据。

#### 使用示例
```python title="基础渲染示例"
template = app.getElement("fileTmpls.contractTemplate")

# 准备上下文数据
context = {
    "customerName": "张三",
    "contractNo": "CT2024001",
    "amount": 100000,
    "signDate": "2024-01-15"
}

# 执行渲染
document = template.render(context)

# 保存文档
with open("合同.docx", "wb") as f:
    f.write(document.getvalue())
```

### handleContext
处理和转换渲染上下文数据，将前端传入的数据转换为Jinja2模板可识别的格式。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| context | JitDict | dict | 是 | 原始上下文数据 |
| elemName | Stext | str | 是 | 元素全名 |

#### 返回值
返回处理后的上下文数据字典。

### getTemplateDt
获取模板中定义的数据类型映射。

#### 返回值
返回数据类型映射字典，键为变量名，值为对应的数据类型处理类。

## 属性
### templateFile
获取模板文件的二进制流对象，支持从本地文件或URL获取。

```python title="访问模板文件"
template = app.getElement("fileTmpls.myTemplate")
file_stream = template.templateFile
```

### config
获取模板的完整配置信息，包含dataList、files等配置项。

```python title="访问配置信息"
template = app.getElement("fileTmpls.myTemplate")
data_list = template.config.get("dataList", [])
```

### dtMap
获取模板数据类型映射表，用于数据类型转换和验证。

## 高级特性
### 复杂内容支持
Word模板支持多种复杂内容的动态生成：

```python title="复杂内容渲染示例"
template = app.getElement("fileTmpls.advancedTemplate")

context = {
    "title": "项目报告",
    "content": "这是一个包含多种元素的文档",
    # 图片URL，模板中使用ToPictureFileTmpls:标记
    "chartImage": "https://example.com/chart.png",
    # 超链接，模板中使用ToLinkFileTmpls:标记  
    "projectLink": "项目地址: https://github.com/project",
    # 二维码数据，模板中使用<image:标记
    "qrcode": {
        "image": "base64编码的图片数据",
        "width": 3,
        "height": 3
    }
}

document = template.render(context)
```

### 表格单元格图片处理
模板支持在表格单元格中动态插入图片，自动适应单元格尺寸：

```json title="表格图片配置"
{
  "dataList": [
    {
      "name": "productImage",
      "title": "产品图片",
      "dataType": "Stext"
    }
  ]
}
```

```python title="表格图片渲染"
context = {
    "productImage": "ToPictureFileTmpls:https://example.com/product.jpg"
}

document = template.render(context)
```

### 模板文件制作建议
1. **变量标记**：在Word模板中使用`{{变量名}}`标记需要替换的内容
2. **图片标记**：使用`ToPictureFileTmpls:图片URL`标记图片位置
3. **链接标记**：使用`ToLinkFileTmpls:显示文本: URL`标记超链接
4. **保持格式**：模板制作时注意保持Word文档的原有格式和样式 