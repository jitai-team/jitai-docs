---
sidebar_position: 2
slug: AppCode
description: "AppCode API 参考文档。完整的规格说明、方法和示例。"
---

# AppCode
AppCode（应用源码管理器），用于管理和操作应用的源代码文件。AppCode仅在应用具有本地源码时可用（即存在app.json文件），通常用于开发调试场景。

可通过`app.code`访问当前应用的AppCode对象。

## 属性
| 名称 | 类型 | 说明 |
|------|------|------|
| envId | str | 运行环境ID，例如：`JRE_MWcVmUZjEq` |
| appId | str | 应用ID，例如：`wanyun.MyApp` |
| version | str | 应用版本，例如：`1.0.0` |
| env | [Environ](../runtime-environment/01Environ) | 应用所属的运行环境对象 |
| app | [App](../applications/App) | 应用对象 |
| enable | bool | 是否可用，必须要本地有源码才能使用|

:::danger[危险]
开发者可以读取以上属性，但不要强行修改以上属性值，可能会导致不可预知的错误。
:::

## 方法 
### exists
检查指定路径的文件或目录是否存在。

**参数：**

* **path** (str): 相对于应用根目录的路径

**返回值：** 

文件或目录是否存在。

**返回值类型：** 

bool

### isdir
检查指定路径是否为目录。

**参数：**

* **path** (str): 相对于应用根目录的路径

**返回值：** 

是否为目录。

**返回值类型：** 

bool

### isfile
检查指定路径是否为文件。

**参数：**

* **path** (str): 相对于应用根目录的路径

**返回值：** 

是否为文件。

**返回值类型：** 

bool

### read
读取指定文件的内容。

**参数：**

* **path** (str): 相对于应用根目录的文件路径
* **binary** (bool, 可选): 是否以二进制模式读取，默认为False

**返回值：** 

文件内容。

**返回值类型：** 

str 或 bytes

### write
写入内容到指定文件。

**参数：**

* **path** (str): 相对于应用根目录的文件路径
* **content** (str): 要写入的内容

**返回值：** 

写入操作的结果。

:::warning[注意]
写入操作会覆盖原有文件内容。
:::

### writeElement
写入元素文件。

**参数：**

* **fullName** (str): 元素的fullName
* **files** (Dict[str, str]): 文件字典，key为文件路径，value为文件内容

**返回值：** 

写入操作的结果。

### parseElementByPath
根据文件路径解析元素的fullName。

**参数：**

* **path** (str): 文件路径，例如：`models/AModel/model.py`

**返回值：** 

元素的fullName，如果未找到则返回None。

**返回值类型：** 

str 或 None

### listdir
列出指定目录下的文件和子目录。

**参数：**

* **path** (str): 相对于应用根目录的目录路径

**返回值：** 

目录内容列表。

**返回值类型：** 

List[str]

### deleteDir
删除指定目录及其内容。

**参数：**

* **path** (str): 相对于应用根目录的目录路径

**返回值：** 

删除操作的结果。

:::danger[危险]
删除操作不可逆，请谨慎使用。
:::

### createDir
创建目录。

**参数：**

* **path** (str): 相对于应用根目录的目录路径

**返回值：** 

创建操作的结果。

### copyDir
复制目录及其内容。

**参数：**

* **sourceDir** (str): 源目录路径，相对于应用根目录
* **targetDir** (str): 目标目录路径，相对于应用根目录

**返回值：** 

复制操作的结果。

### deleteFile
删除指定文件。

**参数：**

* **path** (str): 相对于应用根目录的文件路径

**返回值：** 

删除操作的结果。

:::danger[危险]
删除操作不可逆，请谨慎使用。
:::

### rename
重命名文件或目录。

**参数：**

* **sourcePath** (str): 源路径，相对于应用根目录
* **targetPath** (str): 目标路径，相对于应用根目录

**返回值：** 

重命名操作的结果。

## 使用示例
```python
# 检查文件是否存在
if app.code.exists("models/UserModel/model.py"):
    print("文件存在")

# 读取文件内容
content = app.code.read("app.json")
print(content)

# 写入文件
app.code.write("test.txt", "Hello World")

# 创建目录
app.code.createDir("new_folder")

# 列出目录内容
files = app.code.listdir("models")
print(files)

# 解析元素路径
fullName = app.code.parseElementByPath("models/UserModel/model.py")
print(fullName)  # 输出: models.UserModel
```

:::tip[提示]
AppCode主要用于开发模式下的源码操作，仅适用于有源码的情况，在生产模式中通常使用[AppResource](AppResource)来操作运行时应用资源。
:::