---
sidebar_position: 1
slug: 01Environ
title: "Environ Reference"
description: "Environ Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Environ"
---

# Environ
Environ (Runtime Environment Object) is used to manage and control the application's runtime environment. Within the same runtime environment, each AppId can only run one version in the App container. When an App exists in multiple runtime environments, the version numbers can be the same or different.

The runtime environment object that the current application belongs to can be accessed through `app.env`.

## Properties
| Name | Type | Description |
|------|------|------|
| envId | str | Runtime environment ID, e.g.: `JRE_MWcVmUZjEq` |
| orgId | str | Organization ID, e.g.: `wanyun` |
| title | str | Runtime environment title |
| remark | str | Runtime environment remarks |
| rootPath | str | Runtime environment root path |
| updateTime | int | Update timestamp of runtime environment configuration |
| entry | str | Currently used entry address |

:::danger[Danger]
Developers can read the above properties, but should not forcibly modify these property values, as it may cause unpredictable errors.
:::

## Methods 
### getApp
Get a deployed App object.

**Parameters:**

* **appId** (str): Application ID
* **version** (str, optional): Application version
* **initApp** (bool, optional): Whether to initialize the application, defaults to False

**Return Value:** 

Application object

**Return Type:** 

[App](../applications/App) or None

:::warning[Note]
This method requires that the application must exist in the deployment records.
:::

### getAppIgnoreRule
Get an application object without requiring deployment records to exist.

**Parameters:**

* **appId** (str): Application ID
* **version** (str): Application version

**返回值：** 

**返回值类型：** 

[App](../applications/App) 或 None

### getAppPath
Get the relative path of the application under the runtime environment root directory.

**Parameters:**

* **appId** (str): Application ID

**Return Value:** 

Application path.

**Return Type:** 

str

### getAppDistPath
Get the relative path of the application's dist directory under the runtime environment root directory.

**Parameters:**

* **appId** (str): Application ID

**Return Value:** 

Application dist path.

**Return Type:** 

str

### getAppDistAbsolutePath
Get the absolute path of the application's dist directory, the path on disk.

**Parameters:**

* **appId** (str): Application ID

**Return Value:** 

Absolute path of the application's dist directory.

**Return Type:** 

str

## Usage Example
```python
# Get the runtime environment of the current application
env = app.env

# Get a deployed application
myApp = env.getApp("wanyun.MyApp")

# Get application path
appPath = env.getAppPath("wanyun.MyApp")
print(f"Application path: {appPath}")

# Get application deployment rules
rule = env.getRuleByAppId("wanyun.MyApp")
if rule:
    print(f"Application version: {rule.version}")
    print(f"Debug mode: {rule.debug}")
```
