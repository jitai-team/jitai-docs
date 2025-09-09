---
sidebar_position: 1
slug: App
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# App
App（即应用），每个应用在JitNode中都对应一个App对象，开发者可以在后端代码中直接使用`app`关键字调用App对象。

`app`是一个全局对象，指向当前应用的App对象，无需导包，可直接使用。

## 属性
| 名称 | 类型 | 说明                                                                         |
|------|------|----------------------------------------------------------------------------|
| appId | str | 应用ID，例如：`wanyun.MyApp`                                                     |
| appKey | str | 运行时应用的唯一标识，由appId和version组成，例如：`wanyun.MyApp@1.0.0`                        |
| version | str | 应用版本，三段点分版本号，例如：`1.0.0`                                                    |
| title | str | 应用标题，例如：`我的应用`                                                             |
| init | bool | 应用是否已初始化，例如：`True`                                                         |
| debug | bool | 应用是否为调试模式，例如：`True`                                                        |
| updateTime | int | 应用更新时间，毫秒时间戳，例如：1717987200000                                              |
| envId | str | 运行环境ID，例如：`JRE_MWcVmUZjEq`                                                 |
| nodeId | str | 节点ID，例如：`JN_c1tqsCN7Q5`                                                    |
| env | [Environ](../runtime-environment/01Environ) | 应用所属的运行环境对象                                                                |
| node | [Node](../jit-nodes/Node) | Jit节点对象                                                                    |
| domain | str | 应用所在域名，例如：`http://127.0.0.1:8080`                                          |
| entry | str | 应用访问地址，例如：`http://127.0.0.1:8080/whwy/testjitai`                           |
| endpoint | str | 应用API端点根路径，例如：`http://127.0.0.1:8080/api/whwy/testjitai`                   |
| jit | Dict | 应用打包后的配置清单                                                                 |
| initData | Dict[str, Any] | 应用的初始化数据                                                                   |
| envVars | Dict[str, Any] | 应用的环境变量列表，key为变量名，value为变量值。示例：`{'DB_HOST': '127.0.0.1', 'DB_PORT': 3306}` |
| app_hierarchy | List[[App](App)] | 应用的继承链（包含当前应用自身），访问该属性会触发继承链上所有应用的加载（如果尚未加载）                               |
| requirements | List[str] | 当前应用的requirements.txt中的依赖列表                                                |
| reqs | Set[str] | 已安装的依赖库列表，key为依赖库名称，value为依赖库版本号                                           |
| librariesPath | str | Python库安装根目录                                                               |
| libPathList | List[str] | 库路径列表                                                                      |
| namespaces | List[str] | 应用的元素命名空间列表，例如：['models', 'services', 'databases']                         |
| globals | Dict[str, Any] | 已设置的全局变量字典，key为变量名，value为变量值                                               |
| code | [AppCode](AppCode) | 源码管理器，操作应用源代码                                                              |
| resource | [AppResource](AppResource) | 资源管理器，操作应用资源                                                               |

:::danger[危险]
开发者可以读取以上属性，但不要强行修改属性值，会导致不可预知的错误。
:::

## 方法 
### getElement
获取指定元素对象，将会根据fullName精确匹配，这是日常开发中最常用的方法。

**参数：**

* **fullName** (str): 元素fullName，如 `"models.UserModel"`

**返回值：** 

元素对象。

**返回值类型：** 

[Element](../elements/Element)

:::tip[元素调用语法糖]

```python
# 常规的元素调用写法
msgSvc = app.getElement("services.MsgSvc")
msgSvc.sendMsg("Hello, World!")
# 元素调用语法糖
app.services.OpenMsgSvc.sendMsg("Hello, World!")
```
:::

### findElements
查找元素，支持选择器语法，可能返回多个元素对象。

**参数：**

* **selector** (str): 元素选择器，支持`SELECTOR`语法

**返回值：** 

元素对象列表。

**返回值类型：** 

List[[Element](../elements/Element)]

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
根据fullName精确查找元素定义信息。

**参数：**

* **fullName** (str): 元素fullName

**返回值：** 

元素属性字典对象。

**返回值类型：** 

[ElementAttrDict](../elements/ElementAttrDict)

### findElementsDefine
使用`SELECTOR`语法查找元素定义信息。

**参数：**

* **selector** (str): 元素选择器，支持`SELECTOR`语法

**返回值：** 

元素属性字典列表。

**返回值类型：** 

List[[ElementAttrDict](../elements/ElementAttrDict)]

### getAllElementsDefine
获取完整的应用元素信息，包含所有元素的定义信息，调用该函数不会触发元素的加载。

**返回值：** 

元素定义字典，key为元素fullName，value为Dict[str, Any]。

**返回值类型：** 

Dict[str, Dict[str, Any]]

### getEnvVarsDefine
获取应用的环境变量定义信息，包括从父应用继承的。

**返回值：** 

环境变量定义列表。

**返回值类型：** 

List[Dict[str, Any]]

### getParentsMetadata
获取父应用的元数据信息，不包含当前应用自身。

**返回值：** 

父应用元数据，key为`appKey`，value为Dict(包含字段：`appId`,`version`)。

**返回值类型：** 

OrderedDict[str, Dict]

### newVariable
创建一个符合极态数据类型规范的变量对象。

**参数：**

* **config** (Dict[str, Any]): 变量配置字典，必须包含`dataType`字段指定极态数据类型
* **value** (Any): 变量的初始值，类型需与指定的数据类型兼容

**返回值：** 

符合极态规范的变量对象实例。

**返回值类型：** 

变量对象

**示例：**

<Tabs>
<TabItem value="stext" label="单行文本变量">

```python
text_var = app.newVariable({'dataType': 'Stext'}, 'Hello, World!')
```

</TabItem>
<TabItem value="ltext" label="多行文本变量">

```python
text_var = app.newVariable({'dataType': 'Ltext'}, 'Hello, World!')
```

</TabItem>
<TabItem value="numeric" label="数字变量">

```python
number_var = app.newVariable({'dataType': 'Numeric'}, 123)
```

</TabItem>
<TabItem value="jitdict" label="JitDict变量">

```python
dict_var = app.newVariable({
    'name': 'userInfo',
    'title': '用户信息',
    'dataType': 'JitDict',
    'variableList': [
        {
            'name': 'username',
            'title': '用户名',
            'dataType': 'Stext'
        },
        {
            'name': 'age',
            'title': '年龄',
            'dataType': 'Numeric'
        }
    ]
    }, {
        'username': '张三',
        'age': 18
    })
```

</TabItem>
<TabItem value="jitlist" label="JitList变量">

```python
list_var = app.newVariable({
    'name': 'userList',
    'title': '用户列表',
    'dataType': 'JitList',
    'variableConfig': {
        'dataType': 'JitDict',
        'variableList': [
            {
                'name': 'username',
                'title': '用户名',
                'dataType': 'Stext'
            }
        ]
    }
},[
    {
        'username': '张三',
        'age': 18
    },
    
])
```

</TabItem>
<TabItem value="rowdata" label="RowData变量">

```python
row_data_var = app.newVariable({
    'name': 'customerInfo',
    'title': '客户信息',
    'dataType': 'RowData',
    'generic': 'models.CustomerModel'
},{
    'name': '张三',
    'age': 18,
    'gender': '男',
    'phone': '13800138000',
    'email': 'zhangsan@example.com'
})
```

</TabItem>
</Tabs>
### registerGlobalVar
注册全局变量，设置后可通过`builtins`访问该变量。

**参数：**

* **name** (str): 变量名
* **value** (Any): 变量值

:::warning[注意]
开发者需谨慎使用全局变量，避免污染全局命名空间。
:::