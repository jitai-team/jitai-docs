---
sidebar_position: 2
slug: ElementDefine
---

# ElementDefine
ElementDefine对象中的内容和元素e.json内容一致，描述元素的定义信息。通过App对象的相关方法可以获取元素定义。

## 获取ElementDefine对象
ElementDefine对象通过App对象的多个方法获取：

```javascript
// 根据类型获取元素定义
const defines = app.getDefineByType("models.NormalType");

// 按元素目录获取所有元素定义
const defines = app.getElementDefine("models.UserModel");

// 根据类型获取所有实例元素定义
const defines = app.getInsDefineByType("models.MetaType");

// 获取去重后的实例元素定义
const defines = app.getUniqInsDefineByType("models.MetaType");
```
