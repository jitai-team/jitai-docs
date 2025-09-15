---
sidebar_position: 3
slug: AppResource
---

# AppResource
AppResource（应用资源管理器），用于管理和操作应用的已打包资源文件。AppResource用于运行时环境，负责从内存中读取应用的打包资源，包括元素资源、公共资源等。

可通过`app.resource`访问当前应用的AppResource对象。

## 属性
| 名称 | 类型 | 说明 |
|------|------|------|
| envId | str | 运行环境ID，例如：`JRE_MWcVmUZjEq` |
| appId | str | 应用ID，例如：`wanyun.MyApp` |
| version | str | 应用版本，例如：`1.0.0` |
| env | [Environ](../runtime-environment/01Environ) | 应用所属的运行环境对象 |
| app | [App](../applications/App) | 应用对象 |
| marks | Set[str] | 已向运行环境获取过的资源标记集合 |
| files | Dict[str, str] | 文件资源缓存，key为文件路径，value为文件内容 |

:::danger[危险]
开发者可以读取以上属性，但不要强行修改以上属性值，可能会导致不可预知的错误。
:::

## 方法 
### exists
检查指定路径的资源是否存在。

**参数：**

* **path** (str): 相对于应用根目录的资源路径

**返回值：** 

资源是否存在。

**返回值类型：** 

bool

:::tip[提示]
该方法会自动处理路径分隔符的兼容性，支持Windows和Unix风格的路径。
:::

### read
读取指定资源的内容。

**参数：**

* **path** (str): 相对于应用根目录的资源路径

**返回值：** 

资源内容。

**返回值类型：** 

str

:::info[资源读取顺序]
1. 首先检查内存缓存中是否已有该资源
2. 如果是公共代码包资源，则读取公共资源
3. 如果是元素资源，则根据路径解析元素并读取
4. 最后尝试读取应用资源
:::

### clear
清理所有资源缓存。

**返回值：** 

无返回值。

### clearByElement
按元素清理资源缓存。

**参数：**

* **fullName** (str): 元素的fullName

**返回值：** 

无返回值。

:::warning[注意]
清理缓存后，下次访问该元素的资源时会重新从运行环境加载。
:::

### readElementResource
读取指定元素的所有资源文件。

**参数：**

* **fullName** (str): 元素的fullName
* **forceLoad** (bool, 可选): 是否强制重新加载，默认为False

**返回值：** 

元素资源内容。

**返回值类型：** 

Dict 或 None

:::info[自动处理]
该方法会自动添加必要的`__init__.py`文件，确保Python包结构的完整性。
:::

### readCommonsResource
读取公共代码包资源。

**参数：**

* **forceLoad** (bool, 可选): 是否强制重新加载，默认为False

**返回值：** 

公共资源内容。

**返回值类型：** 

Dict 或 None

### parseElementByPath
根据资源路径解析元素的fullName。

**参数：**

* **path** (str): 资源路径，例如：`models/AModel/model.py`

**返回值：** 

元素的fullName，如果未找到则返回None。

**返回值类型：** 

str 或 None

### getAppJit
获取应用的配置信息。

**返回值：** 

应用配置信息。

**返回值类型：** 

Dict[str, Any]

### saveAppJit
保存应用配置信息。

**参数：**

* **appJit** (Dict[str, Any]): 应用配置信息

**返回值：** 

保存操作的结果。

### getInitData
获取应用的初始化数据。

**返回值：** 

初始化数据，如果不存在则返回None。

**返回值类型：** 

Dict[str, Any] 或 None

:::info[数据获取策略]
1. 首先尝试从运行环境的资源管理器获取
2. 如果失败，则尝试直接读取`initData.json`文件
3. 如果都失败，返回None
:::

## 使用示例
```python
# 检查资源是否存在
if app.resource.exists("models/UserModel/model.py"):
    print("资源存在")

# 读取资源内容
content = app.resource.read("app.jit")
print(content)

# 获取应用配置
appJit = app.resource.getAppJit()
print(appJit.get("title"))

# 获取初始化数据
initData = app.resource.getInitData()
if initData:
    print("初始化数据:", initData)

# 解析元素路径
fullName = app.resource.parseElementByPath("models/UserModel/model.py")
print(fullName)  # 输出: models.UserModel

# 读取元素资源
elementResource = app.resource.readElementResource("models.UserModel")
if elementResource:
    print("元素资源加载成功")

# 清理特定元素的缓存
app.resource.clearByElement("models.UserModel")
```

## 缓存机制
AppResource采用了多层缓存机制来提高性能：

1. **文件级缓存**：`files`字典缓存所有已读取的文件内容
2. **元素级标记**：`marks`集合记录已加载的元素，避免重复加载
3. **进程级共享**：在同一进程中的多次请求共享缓存数据

:::tip[性能优化]
- 资源在首次访问时从运行环境加载并缓存到内存
- 相同资源的后续访问直接从内存缓存读取
- 使用clearByElement方法可以清理特定元素的缓存，实现资源的热更新
:::

:::info[与AppCode的区别]
- **AppCode**：用于开发模式，直接操作源代码文件
- **AppResource**：用于生产模式，操作打包后的内存资源
- 开发者可以通过`app.debug`属性判断当前模式
:::