---
sidebar_position: 1
slug: ElementAttrDict
---

# ElementAttrDict
Inherits from `dict`, possesses all attributes of Element objects, and supports accessing them in dictionary style.

:::tip
Accessing attributes in dictionary style will not trigger element loading. Using `.` to access attributes will trigger element loading.
:::

Example:
```python
eleDefine=app.getElementDefine("models.UserModel")

# Access attributes in dictionary style, will not trigger element loading
eleDefine['title']

# Use `.` to access attributes, will trigger element loading
eleDefine.title
```