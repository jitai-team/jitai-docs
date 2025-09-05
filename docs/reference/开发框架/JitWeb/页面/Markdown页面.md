# Markdown页面

Markdown页面是专用于Markdown文档展示的页面类型，基于Python markdown库实现文档渲染能力。它负责将Markdown内容转换为HTML展示、提供代码高亮和表格渲染等特性，适用于技术文档、产品说明、帮助手册、知识库等内容展示场景。

Markdown页面元素分层结构为Meta（pages.Meta） → Type（pages.MarkdownPageType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建Markdown页面实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的pages.MarkdownPageType元素，以实现自己的封装。

## 快速开始

### 创建实例元素

#### 目录结构

```text title="推荐目录结构"
MyDocPage/                # 页面元素名称（路径可自定义）
├── e.json               # 元素配置文件
└── index.md            # Markdown内容文件
```

#### e.json文件

```json title="e.json配置示例"
{
  "title": "产品使用文档",
  "type": "pages.MarkdownPageType",
  "backendBundleEntry": "."
}
```

#### Markdown内容文件

```markdown title="index.md内容示例"
# 产品帮助文档

## 主要功能

| 功能模块 | 说明 |
|----------|------|
| 用户管理 | 用户注册、登录、权限控制 |
| 数据分析 | 数据统计、图表展示 |
| 文件管理 | 文件上传、下载、预览 |

## 快速入门

1. 登录系统
2. 选择功能模块  
3. 按照提示操作

更多详细说明请查看各功能模块的具体文档。
```

#### 调用示例

```python title="页面使用示例"
# 获取Markdown页面元素
doc_page = app.getElement("pages.MyDocPage")

# 转换为HTML用于展示
html_content = doc_page.toHtml()

# 获取页面基本信息
print(f"页面标题: {doc_page.title}")
print(f"页面名称: {doc_page.fullName}")
```

## 元素配置

### e.json配置

| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| title | string | string | 是 | 页面标题，用于显示和识别 |
| type | string | string | 是 | 固定值：pages.MarkdownPageType |
| backendBundleEntry | string | string | 是 | 后端入口路径，通常设置为"." |

### 适用场景

Markdown页面适合以下业务场景：

- **帮助文档**：产品使用说明、操作指南
- **公告通知**：系统公告、版本更新说明
- **API文档**：接口说明、参数文档
- **规章制度**：公司制度、流程规范
- **知识库**：技术文档、经验分享

## 方法

### toHtml

将Markdown内容转换为HTML格式。

#### 返回值

- **类型**：string
- **说明**：转换后的HTML内容

#### 使用示例

```python title="HTML转换示例"
page = app.getElement("pages.MyDocPage")
html_output = page.toHtml()

# HTML内容可用于展示或进一步处理
print(html_output)
```

### subscribeEvent

订阅页面事件，继承自BasePage。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| messageName | string &#124; symbol | string &#124; symbol | 是 | 事件名称 |
| callback | Function | function | 是 | 事件回调函数 |

#### 返回值

- **类型**：string
- **说明**：事件处理器ID

### publishEvent

发布页面事件，继承自BasePage。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| messageName | string &#124; symbol | string &#124; symbol | 是 | 事件名称 |
| ex | JitDict | Record&lt;string, any&gt; | 否 | 事件附加数据 |

### newVariable

创建数据变量，继承自BasePage。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| varConfig | JitDict | Record&lt;string, any&gt; | 是 | 变量配置对象 |
| value | - | any | 否 | 变量初始值 |

#### 返回值

- **类型**：Variable
- **说明**：变量实例

### newComponent

创建组件实例，继承自BasePage。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| type | string | string | 是 | 组件类型标识 |
| createCompConfig | JitDict | Record&lt;string, any&gt; | 是 | 组件创建配置 |

#### 返回值

- **类型**：Component
- **说明**：组件实例

### destroy

销毁页面实例，继承自BasePage。

#### 使用示例

```python title="页面销毁示例"
page = app.getElement("pages.MyDocPage")

# 页面使用完毕后销毁
page.destroy()
```

### getVariableValue

获取变量值，继承自BasePage。

#### 参数详解

| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| varName | string &#124; Variable | string &#124; object | 是 | 变量名或变量对象 |

#### 返回值

- **类型**：any
- **说明**：变量的当前值

## 属性

### content

Markdown原始内容。

- **类型**：string
- **说明**：页面的Markdown源码内容
- **访问方式**：只读

### title

页面标题。

- **类型**：string  
- **说明**：页面显示标题
- **访问方式**：只读

### fullName

页面完整名称。

- **类型**：string
- **说明**：页面元素的完整标识符
- **访问方式**：只读

### name

页面名称。

- **类型**：string
- **说明**：页面元素的简短名称
- **访问方式**：只读

## 高级特性

### 动态内容处理

根据业务数据动态生成Markdown内容：

```python title="动态文档生成"
# 动态生成用户手册
def generate_user_manual(user_role):
    if user_role == "admin":
        content = "# 管理员手册\n\n## 用户管理\n- 添加用户\n- 删除用户"
    else:
        content = "# 用户手册\n\n## 基本操作\n- 查看数据\n- 导出报表"
    
    # 创建临时Markdown页面
    return create_temp_markdown_page(content)
```

### 在Modal中展示文档

最常见的使用模式是在弹窗中展示帮助文档：

```python title="弹窗文档展示"
def show_help_document(doc_name):
    # 获取文档页面
    doc_page = app.getElement(f"pages.{doc_name}")
    html_content = doc_page.toHtml()
    
    # 在Modal中显示
    modal = page.newComponent("components.Modal", {
        "title": "帮助文档",
        "content": html_content,
        "width": "800px",
        "height": "600px"
    })
    return modal

# 在按钮点击事件中调用
help_button.onClick = lambda: show_help_document("UserGuide")
```

### 作为静态页面使用

直接作为独立页面在门户中展示：

```python title="门户页面配置"
# 在门户配置中添加文档页面
portal_config = {
    "pages": [
        {"name": "帮助中心", "page": "pages.HelpCenter"},
        {"name": "使用指南", "page": "pages.UserGuide"},
        {"name": "API文档", "page": "pages.ApiDocs"}
    ]
}
```

### 与表格组件集成

在AI数据管理页面中嵌入说明文档：

```python title="表格页面集成"
# 在AI数据管理页面顶部显示操作说明
instruction_page = app.getElement("pages.DataInstructions")
instruction_html = instruction_page.toHtml()

# 添加到页面顶部
page_header = page.newComponent("components.Container", {
    "content": instruction_html,
    "style": {"marginBottom": "20px"}
})
```

## 常见问题

**Q: 什么时候使用Markdown页面而不是常规页面？**
A: 当需要展示静态文档内容时使用Markdown页面，如帮助文档、操作指南等。需要动态交互功能请使用常规页面。

**Q: 如何动态更新Markdown页面内容？**
A: Markdown页面内容来自index.md文件，需要修改文件内容并重新加载页面元素。

**Q: 可以在Markdown页面中嵌入其他组件吗？**
A: 不可以。Markdown页面只能渲染静态内容，需要动态组件请使用常规页面配合Modal展示。

**Q: 如何在门户导航中添加Markdown页面？**
A: 在门户配置的pages数组中添加页面元素的fullName即可。
