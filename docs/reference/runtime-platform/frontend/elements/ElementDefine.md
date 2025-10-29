---
sidebar_position: 2
slug: ElementDefine
title: "ElementDefine Reference"
sidebar_label: "ElementDefine"
description: "Frontend ElementDefine object for accessing element definition information in JavaScript. Learn to retrieve and use element definitions."
---

# ElementDefine
The content in the ElementDefine object is consistent with the element's e.json content, describing the element's definition information. Element definitions can be obtained through related methods of the App object.

## Getting ElementDefine Objects
ElementDefine objects are obtained through multiple methods of the App object:

```javascript
// Get element definitions by type
const defines = app.getDefineByType("models.NormalType");

// Get all element definitions by element directory
const defines = app.getElementDefine("models.UserModel");

// Get all instance element definitions by type
const defines = app.getInsDefineByType("models.MetaType");

// Get deduplicated instance element definitions
const defines = app.getUniqInsDefineByType("models.MetaType");
```
