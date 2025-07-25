# Excel模板

Excel模板元素是基于文件模板框架的Excel文档生成组件，基于openpyxl和Jinja2模板引擎实现动态Excel文档生成。它负责Excel模板的解析处理、数据渲染和特殊功能支持（图片嵌入、超链接、下拉框等），为企业级报表生成提供完整的Excel输出能力。

Excel模板元素分层结构为Meta（fileTmpls.Meta）→ Type（fileTmpls.ExcelType）→ 实例，开发者可通过JitAi的可视化开发工具快捷地创建Excel模板实例元素。

## 快速开始

### 创建实例元素

#### 目录结构

```text title="推荐目录结构"
ExcelReport/                    # Excel模板实例元素目录
├── e.json                      # 元素定义文件
├── ExcelReport.json            # 业务配置文件
└── templateFile.xlsx           # Excel模板文件（可选）
```

#### e.json文件

```json title="e.json文件示例"
{
  "title": "销售报表模板",
  "type": "fileTmpls.ExcelType",
  "frontBundleEntry": "ExcelReport.json",
  "backendBundleEntry": "."
}
```

#### 业务配置文件

```json title="ExcelReport.json示例"
{
  "dataList": [
    {
      "name": "title",
      "title": "报表标题",
      "dataType": "Stext"
    },
    {
      "name": "salesData",
      "title": "销售数据",
      "dataType": "RowList"
    },
    {
      "name": "logoImage",
      "title": "公司Logo",
      "dataType": "Stext"
    }
  ],
  "files": {
    "url": "https://example.com/template.xlsx",
    "fileName": "sales_template.xlsx"
  }
}
```

#### 调用示例

```python title="调用示例"
# 获取Excel模板实例
excel_template = app.getElement("fileTmpls.ExcelReport")

# 准备渲染数据
context = {
    "title": "2024年销售报表",
    "salesData": [
        {"product": "产品A", "sales": 10000, "region": "华东"},
        {"product": "产品B", "sales": 15000, "region": "华南"}
    ],
    "logoImage": "https://example.com/logo.png"
}

# 渲染Excel文档
output_stream = excel_template.render(context, elemName="fileTmpls.ExcelReport")

# 保存文件
with open("sales_report.xlsx", "wb") as f:
    f.write(output_stream.read())
```

## 元素配置

### e.json配置

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 模板显示名称 |
| type | string | 是 | 固定为"fileTmpls.ExcelType" |
| frontBundleEntry | string | 是 | 前端配置文件路径 |
| backendBundleEntry | string | 是 | 后端入口路径，通常为"." |

### 业务配置文件配置

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| dataList | array | 是 | 数据字段定义列表 |
| files | object | 否 | 模板文件配置 |

#### dataList配置

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 字段名称，用于模板中的变量名 |
| title | string | 是 | 字段显示标题 |
| dataType | string | 是 | 数据类型，支持Stext、Numeric、RowList等 |

#### files配置

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| url | string | 否 | 模板文件下载地址 |
| fileName | string | 否 | 模板文件名称 |

## 方法

### render

```python
def render(self, context, **kwargs)
```

渲染Excel模板，生成包含数据的Excel文档。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| context | JitDict | dict | 是 | 渲染数据上下文 |
| elemName | Stext | str | 是 | 元素fullName，通过kwargs传入 |

#### 返回值

返回BytesIO对象，包含生成的Excel文件二进制数据。

#### 使用示例

```python title="基础渲染示例"
# 获取模板实例
template = app.getElement("fileTmpls.ExcelReport")

# 准备数据
data = {
    "reportTitle": "月度销售报表",
    "reportDate": "2024-01",
    "dataRows": [
        {"name": "张三", "sales": 50000, "target": 60000},
        {"name": "李四", "sales": 45000, "target": 50000}
    ]
}

# 渲染文档
result = template.render(data, elemName="fileTmpls.ExcelReport")
```

## 属性

Excel模板元素从基类继承以下属性：

### suffix

Excel文件扩展名，固定为"xlsx"。

### templateFile

模板文件的二进制流对象，自动处理文件获取和格式检查。

### dtMap

数据类型映射字典，根据dataList配置自动生成，用于数据类型转换。

## 高级特性

### 图片嵌入功能

Excel模板支持在单元格中嵌入图片，包括横向图片和纵向图片列表。

#### 配置示例和使用示例

```python title="图片嵌入示例"
# 在Excel模板中使用特殊标记
# 单元格内容：ToPictureFileTmpls:{{imageUrl}}
# 或纵向图片：ToListColumnPictureFileTmpls:{{imageList}}

# 渲染数据
context = {
    "imageUrl": "https://example.com/image1.jpg,https://example.com/image2.jpg",
    "imageList": "https://example.com/img1.jpg,https://example.com/img2.jpg"
}

# 模板会自动下载图片并嵌入到指定单元格
result = template.render(context, elemName="fileTmpls.ImageTemplate")
```

### 超链接支持

在Excel单元格中添加可点击的超链接。

#### 配置示例和使用示例

```python title="超链接示例"
# Excel模板单元格内容：ToLinkFileTmpls:访问官网:  https://example.com

# 渲染时会自动为单元格添加超链接
context = {
    "companyUrl": "https://company.com"
}

result = template.render(context, elemName="fileTmpls.LinkTemplate")
```

### 下拉框功能

为Excel单元格添加数据验证下拉框。

#### 配置示例和使用示例

```python title="下拉框示例"
# Excel模板单元格内容：ToSelectFileTmpls:选项1,选项2,选项3

# 渲染后单元格将包含下拉选择功能
context = {
    "statusOptions": "待处理,处理中,已完成"
}

result = template.render(context, elemName="fileTmpls.SelectTemplate")
```

### Base64图片支持

直接在模板中嵌入Base64编码的图片数据。

#### 配置示例和使用示例

```python title="Base64图片示例"
# Excel模板单元格内容：<image:{"image":"base64编码数据"}>

# 渲染数据
context = {
    "chartImage": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
}

result = template.render(context, elemName="fileTmpls.ChartTemplate")
```

### Jinja2模板语法支持

Excel模板支持完整的Jinja2模板语法，可以在单元格中使用变量、循环和条件语句。

#### 配置示例和使用示例

```python title="Jinja2语法示例"
# Excel模板中的使用示例：
# 单元格A1: {{title}}
# 单元格A2: {% for item in dataList %}{{item.name}}{% endfor %}
# 单元格A3: {% if total > 1000 %}优秀{% else %}良好{% endif %}

context = {
    "title": "销售报表",
    "dataList": [{"name": "产品A"}, {"name": "产品B"}],
    "total": 1500
}

result = template.render(context, elemName="fileTmpls.JinjaTemplate")
```

### 多工作表支持

Excel模板自动处理包含多个工作表的模板文件，为每个工作表应用相同的渲染数据。

#### 配置示例和使用示例

```python title="多工作表示例"
# 模板文件包含多个工作表：销售数据、统计图表、明细报表
# 每个工作表都会使用相同的context数据进行渲染

context = {
    "year": "2024",
    "salesData": [...],
    "chartData": [...]
}

# 所有工作表都会被渲染
result = template.render(context, elemName="fileTmpls.MultiSheetTemplate")
``` 