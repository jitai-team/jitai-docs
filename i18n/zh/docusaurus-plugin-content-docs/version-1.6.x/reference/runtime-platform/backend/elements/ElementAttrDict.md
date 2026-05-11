---
sidebar_position: 1
slug: ElementAttrDict
description: "ElementAttrDict API 参考文档。完整的规格说明、方法和示例。"
---

# ElementAttrDict
继承自`dict`，拥有Element对象的所有属性，支持以字典方式访问它们。

:::tip
以字典方式访问属性时，不会触发元素的加载。用`.`访问属性时，则会触发元素的加载。
:::

示例：
```python
eleDefine=app.getElementDefine("models.UserModel")

# 以字典方式访问属性，不会触发元素加载
eleDefine['title']

# 用`.`访问属性，会触发元素加载
eleDefine.title
```