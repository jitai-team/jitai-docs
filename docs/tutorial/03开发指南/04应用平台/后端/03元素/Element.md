---
sidebar_position: 1
---

# Element

Element对象即元素对象，开发者通过`app.getElement(fullName)`获取元素对象。

## 属性

| 名称 | 类型 | 说明 |
|------|------|------|
| envId | str | 环境ID，例如：`JRE_MWcVmUZjEq` |
| appId | str | 应用ID，例如：`wanyun.MyApp` |
| version | str | 应用版本，例如：`1.0.0` |
| define | Dict[str, Any] | 元素定义字典 |
| fullName | str | 元素完整名称，例如：`models.UserModel` |
| name | str | 元素名称（不含命名空间），例如：`UserModel` |
| elementType | str | 元素类型，例如：`models.NormalType` |
| buildTime | int | 元素构建时间戳 |
| debug | bool | 是否是调试模式状态|
| module | Module | 元素对应的Python模块对象 |
| app | [App](../01应用/App) | 元素所属的应用对象|

:::danger[危险]
开发者可以读取以上属性，但不要强行修改以上属性值，可能会导致不可预知的错误。
:::

## 方法

### getFile
获取元素中的文件内容。

**参数：**

* **filename** (str): 文件名
* **isBinary** (bool, 可选): 是否为二进制文件，默认为False

**返回值：** 

文件内容。

**返回值类型：** 

str 或 bytes

:::tip[代理模式]
Element实现了对执行对象的透明代理，开发者可以直接通过Element对象调用执行对象的方法和属性。
:::
