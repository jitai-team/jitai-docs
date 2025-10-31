---
sidebar_position: 1
slug: Element
title: "Element Reference"
sidebar_label: "Element"
description: "Backend Element object API for accessing and manipulating elements in Python. Properties, methods, and usage examples included."
---

# Element
The Element object is an element object that developers can obtain through `app.getElement(fullName)`.

## Properties
| Name | Type | Description |
|------|------|------|
| envId | str | Environment ID, e.g.: `JRE_MWcVmUZjEq` |
| appId | str | Application ID, e.g.: `wanyun.MyApp` |
| version | str | Application version, e.g.: `1.0.0` |
| define | Dict[str, Any] | Element definition dictionary |
| fullName | str | Element full name, e.g.: `models.UserModel` |
| name | str | Element name (without namespace), e.g.: `UserModel` |
| elementType | str | Element type, e.g.: `models.NormalType` |
| buildTime | int | Element build timestamp |
| debug | bool | Whether in debug mode state|
| module | Module | Python module object corresponding to the element |
| app | [App](../applications/App) | Application object that the element belongs to|

:::danger[Danger]
Developers can read the above properties, but should not forcibly modify these property values, as it may cause unpredictable errors.
:::

## Methods 
### getFile
Get the file content within the element.

**Parameters:**

* **filename** (str): Filename
* **isBinary** (bool, optional): Whether it's a binary file, defaults to False

**Return Value:** 

File content.

**Return Type:** 

str or bytes

:::tip[Proxy Pattern]
Element implements transparent proxy for execution objects, allowing developers to directly call methods and properties of execution objects through the Element object.
:::
