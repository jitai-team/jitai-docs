---
sidebar_position: 1
---

# App

App（即应用），每个应用在JitNode中都对应一个App对象，开发者可以在后端代码中直接使用`app`关键字调用App对象。

`app`是一个全局对象，指向当前应用的App对象，无需导包，可直接使用。

## 属性

| 名称 | 类型 | 说明 |
|------|------|------|
| appId | str | 应用ID，例如：`wanyun.MyApp` |
| version | str | 应用版本，三段点分版本号，例如：`1.0.0` |
| envId | str | 运行环境ID，例如：`JRE_MWcVmUZjEq` |
| nodeId | str | 节点ID，例如：`JN_c1tqsCN7Q5` |
| node | [Node](../04Jit节点/Node) | Jit节点对象 |
| title | str | 应用标题，例如：`我的应用` |
| appKey | str | 运行时应用的唯一标识，由appId和version组成，例如：`wanyun.MyApp@1.0.0` |
| env | [Environ](02environ) | 应用所属的运行环境对象 |
| init | bool | 应用是否已初始化，例如：`True` |
| debug | bool | 应用是否为调试模式，例如：`True` |
| updateTime | int | 应用更新时间，毫秒时间戳，例如：1717987200000 |
| jit | Dict | 应用配置信息，内容参考[应用规范](/docs/tutorial/01概述/02应用规范.md)中的app.jit |
| initData | Dict[str, Any] | 应用的初始化数据 |
| extends | List[Dict[str, str]] | 应用继承的父应用列表，例如：`[{'appId': 'wanyun.BaseApp', 'version': '1.0.0'}]` |
| requirements | List[str] | 应用的Python依赖库列表 |
| namespaces | List[str] | 应用的元素命名空间列表，例如：['models', 'services', 'databases'] |
| mro | List[[App](../01应用/App)] | 应用的继承链列表（包含当前应用自身），访问该属性会触发继承链上所有应用的加载（如果尚未加载的话）|
| reqs | List[str] | 已安装的依赖库列表 |
| librariesPath | str | Python库安装根目录 |
| code | [AppCode](../01应用/AppCode) | 源码管理器，操作应用源代码 |
| resource | [AppResource](../01应用/AppResource) | 资源管理器，操作应用资源 |
| libPathList | List[str] | 库路径列表 |
| globals | Dict[str, Any] | 已设置的全局变量字典，key为变量名，value为变量值 |

:::danger[危险]
开发者可以读取以上属性，但不要强行修改以上属性值，可能会导致不可预知的错误。
:::

## 方法

### getElement
获取指定元素对象，将会根据fullName精确匹配，这是日常开发中最常用的方法。

**参数：**

* **fullName** (str): 元素fullName，如 `"models.UserModel"`

**返回值：** 

元素对象。

**返回值类型：** 

[Element](../03元素/Element)


### findElement
查找元素，支持选择器语法，可能返回多个元素对象。

**参数：**

* **fullName** (str): 元素名称，支持`SELECTOR`语法

**返回值：** 

元素对象列表。

**返回值类型：** 

List[[Element](../03元素/Element)]

:::tip[SELECTOR语法]

| 选择器类型 | 语法 | 示例 | 说明 |
|-----------|------|------|------|
| 默认选择器 | `fullName` | `models.UserModel` | 精确匹配元素全名 |
| 类型选择器 | `.type` | `.models.NormalType` | 选择指定类型的所有元素 |
| 属性选择器 | `#attr=value` | `#title=用户模型` | 支持`>`、`<`、`!=`、`=` |
| 父选择器 | `*fullName` | `*models.UserModel` | 查找指定元素的所有父元素 |
| 子选择器 | `fullName*` | `models.NormalType*` | 查找指定元素的所有子元素 |
| 过滤选择器 | `selector:filter` | `.models.NormalType:#title=用户` | 对前面结果进一步过滤 |
| 并集选择器 | `selector1,selector2` | `models.UserModel,services.UserService` | 合并多个选择器结果 |

:::

### getElementDefine
根据fullName精确查找元素定义信息

**参数：**

* **fullName** (str): 元素fullName

**返回值：** 

元素属性字典对象。

**返回值类型：** 

[ElementAttrDict](../03元素/ElementAttrDict)

### findElementDefine
使用`SELECTOR`语法查找元素定义信息。

**参数：**

* **fullName** (str): 元素fullName，支持`SELECTOR`语法

**返回值：** 

元素属性字典列表。

**返回值类型：** 

List[[ElementAttrDict](../03元素/ElementAttrDict)]

### getAllElementsDict
获取完整的应用元素信息，包含所有元素的定义信息，调用该函数不会触发元素的加载。

**返回值：** 

元素定义字典，key为元素fullName，value为Dict[str, Any]。

**返回值类型：** 

Dict[str, Dict[str, Any]]


### getVariables
获取应用的环境变量定义，包括从父应用继承的。

**返回值：** 
环境变量定义列表。

**返回值类型：** 

List[Dict[str, Any]]


### getExtendList
获取应用的继承列表，不包含当前应用自身。

**返回值：** 

父应用列表，key为`appKey`，value为Dict(包含字段：`appId`,`version`)。

**返回值类型：** 

OrderedDict[str, Dict]

### setGlobal
设置全局变量，设置后可通过`builtins`访问该变量。

**参数：**
- `name` (str): 变量名
- `value` (any): 变量值

:::warning[注意]
开发者需谨慎使用全局变量，避免污染全局命名空间。
:::
