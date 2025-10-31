---
sidebar_position: 1
slug: App
title: "App Reference"
sidebar_label: "App"
description: "Backend App object API reference for Python developers. Access application properties, manage elements, and handle runtime operations."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# App
App (i.e., application), each application in JitNode corresponds to an App object. Developers can directly use the `app` keyword to call the App object in backend code.

`app` is a global object that points to the current application's App object, requiring no imports and can be used directly.

## Properties
| Name | Type | Description                                                                         |
|------|------|----------------------------------------------------------------------------|
| appId | str | Application ID, e.g.: `wanyun.MyApp`                                                     |
| appKey | str | Unique identifier of the runtime application, composed of appId and version, e.g.: `wanyun.MyApp@1.0.0`                        |
| version | str | Application version, three-segment dot-separated version number, e.g.: `1.0.0`                                                    |
| title | str | Application title, e.g.: `My Application`                                                             |
| init | bool | Whether the application is initialized, e.g.: `True`                                                         |
| debug | bool | Whether the application is in debug mode, e.g.: `True`                                                        |
| updateTime | int | Application update time, millisecond timestamp, e.g.: 1717987200000                                              |
| envId | str | Runtime environment ID, e.g.: `JRE_MWcVmUZjEq`                                                 |
| nodeId | str | Node ID, e.g.: `JN_c1tqsCN7Q5`                                                    |
| env | [Environ](../runtime-environment/01Environ) | Runtime environment object that the application belongs to                                                                |
| node | [Node](../jit-nodes/Node) | Jit node object                                                                    |
| domain | str | Application domain, e.g.: `http://127.0.0.1:8080`                                          |
| entry | str | Application access address, e.g.: `http://127.0.0.1:8080/whwy/testjitai`                           |
| endpoint | str | Application API endpoint root path, e.g.: `http://127.0.0.1:8080/api/whwy/testjitai`                   |
| jit | Dict | Configuration manifest after application packaging                                                                 |
| initData | Dict[str, Any] | Application initialization data                                                                   |
| envVars | Dict[str, Any] | Application environment variable list, key is variable name, value is variable value. Example: `{'DB_HOST': '127.0.0.1', 'DB_PORT': 3306}` |
| app_hierarchy | List[[App](App)] | Application inheritance chain (including current application itself), accessing this property triggers loading of all applications in the inheritance chain (if not yet loaded)                               |
| requirements | List[str] | Dependency list from the current application's requirements.txt                                                |
| reqs | Set[str] | List of installed dependency libraries, key is dependency library name, value is dependency library version                                           |
| librariesPath | str | Python library installation root directory                                                               |
| libPathList | List[str] | Library path list                                                                      |
| namespaces | List[str] | Application element namespace list, e.g.: ['models', 'services', 'databases']                         |
| globals | Dict[str, Any] | Dictionary of set global variables, key is variable name, value is variable value                                               |
| code | [AppCode](AppCode) | Source code manager, operates application source code                                                              |
| resource | [AppResource](AppResource) | Resource manager, operates application resources                                                               |

:::danger[Danger]
Developers can read the above properties, but should not forcibly modify property values, as it will cause unpredictable errors.
:::

## Methods 
### getElement
Get the specified element object, which will match precisely based on fullName. This is the most commonly used method in daily development.

**Parameters:**

* **fullName** (str): Element fullName, e.g. `"models.UserModel"`

**Return Value:** 

Element object.

**Return Type:** 

[Element](../elements/Element)

:::tip[Element Call Syntax Sugar]

```python
# Regular element call syntax
msgSvc = app.getElement("services.MsgSvc")
msgSvc.sendMsg("Hello, World!")
# Element call syntax sugar
app.services.OpenMsgSvc.sendMsg("Hello, World!")
```
:::

### findElements
Find elements, supports selector syntax, may return multiple element objects.

**Parameters:**

* **selector** (str): Element selector, supports `SELECTOR` syntax

**Return Value:** 

List of element objects.

**Return Type:** 

List[[Element](../elements/Element)]

:::tip[SELECTOR Syntax]

| Selector Type | Syntax | Example | Description |
|-----------|------|------|------|
| Default Selector | `fullName` | `models.UserModel` | Exact match element full name |
| Type Selector | `.type` | `.models.NormalType` | Select all elements of specified type |
| Attribute Selector | `#attr=value` | `#title=User Model` | Supports `>`, `<`, `!=`, `=` |
| Parent Selector | `*fullName` | `*models.UserModel` | Find all parent elements of specified element |
| Child Selector | `fullName*` | `models.NormalType*` | Find all child elements of specified element |
| Filter Selector | `selector:filter` | `.models.NormalType:#title=User` | Further filter previous results |
| Union Selector | `selector1,selector2` | `models.UserModel,services.UserService` | Merge results from multiple selectors |

:::

### getElementDefine
Find element definition information precisely by fullName.

**Parameters:**

* **fullName** (str): Element fullName

**Returns:** 

Element attribute dictionary object.

**Return Type:** 

[ElementAttrDict](../elements/ElementAttrDict)

### findElementsDefine
Find element definition information using `SELECTOR` syntax.

**Parameters:**

* **selector** (str): Element selector, supports `SELECTOR` syntax

**Returns:** 

List of element attribute dictionaries.

**Return Type:** 

List[[ElementAttrDict](../elements/ElementAttrDict)]

### getAllElementsDefine
Get complete application element information, including definition information for all elements. Calling this function will not trigger element loading.

**Returns:** 

Element definition dictionary, where key is element fullName and value is Dict[str, Any].

**Return Type:** 

Dict[str, Dict[str, Any]]

### getEnvVarsDefine
Get application environment variable definition information, including those inherited from parent applications.

**Returns:** 

List of environment variable definitions.

**Return Type:** 

List[Dict[str, Any]]

### getParentsMetadata
Get parent application metadata information, excluding the current application itself.

**Returns:** 

Parent application metadata, where key is `appKey` and value is Dict (containing fields: `appId`, `version`).

**Return Type:** 

OrderedDict[str, Dict]

### newVariable
Create a variable object that complies with JitAi data type specifications.

**Parameters:**

* **config** (Dict[str, Any]): Variable configuration dictionary, must contain `dataType` field specifying JitAi data type
* **value** (Any): Initial value of the variable, type must be compatible with the specified data type

**Returns:** 

Variable object instance that complies with JitAi specifications.

**Return Type:** 

Variable object

**Example:**

<Tabs>
<TabItem value="stext" label="Single-line Text Variable">

```python
text_var = app.newVariable({'dataType': 'Stext'}, 'Hello, World!')
```

</TabItem>
<TabItem value="ltext" label="Multi-line Text Variable">

```python
text_var = app.newVariable({'dataType': 'Ltext'}, 'Hello, World!')
```

</TabItem>
<TabItem value="numeric" label="Number Variable">

```python
number_var = app.newVariable({'dataType': 'Numeric'}, 123)
```

</TabItem>
<TabItem value="jitdict" label="JitDict Variable">

```python
dict_var = app.newVariable({
    'name': 'userInfo',
    'title': 'User Information',
    'dataType': 'JitDict',
    'variableList': [
        {
            'name': 'username',
            'title': 'Username',
            'dataType': 'Stext'
        },
        {
            'name': 'age',
            'title': 'Age',
            'dataType': 'Numeric'
        }
    ]
    }, {
        'username': 'John',
        'age': 18
    })
```

</TabItem>
<TabItem value="jitlist" label="JitList Variable">

```python
list_var = app.newVariable({
    'name': 'userList',
    'title': 'User List',
    'dataType': 'JitList',
    'variableConfig': {
        'dataType': 'JitDict',
        'variableList': [
            {
                'name': 'username',
                'title': 'Username',
                'dataType': 'Stext'
            }
        ]
    }
},[
    {
        'username': 'John',
        'age': 18
    },
    
])
```

</TabItem>
<TabItem value="rowdata" label="RowData Variable">

```python
row_data_var = app.newVariable({
    'name': 'customerInfo',
    'title': 'Customer Information',
    'dataType': 'RowData',
    'generic': 'models.CustomerModel'
},{
    'name': 'John',
    'age': 18,
    'gender': 'Male',
    'phone': '13800138000',
    'email': 'john@example.com'
})
```

</TabItem>
</Tabs>
### registerGlobalVar
Register a global variable, which can be accessed through `builtins` after setting.

**Parameters:**

* **name** (str): Variable name
* **value** (Any): Variable value

:::warning[Note]
Developers should use global variables with caution to avoid polluting the global namespace.
:::