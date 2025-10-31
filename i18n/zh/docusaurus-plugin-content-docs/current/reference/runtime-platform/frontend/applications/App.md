---
sidebar_position: 1
slug: App
description: "JavaScript开发者的前端App对象API参考。学习访问应用属性和管理前端元素。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# App
App对象是前端平台API的核心，提供了应用级别的属性和方法。

## 访问App对象
### 元素内部访问
元素对象上都有一个成员变量`app`，通过`this.app`即可拿到app对象：

```javascript
// 在元素的方法中使用
export default {
  methods: {
    someMethod() {
      // 获取应用对象
      const app = this.app;
      
      // 使用app对象的方法
      const element = app.getElement("models.UserModel");
    }
  }
}
```

### 全局访问
平台层还提供了一个`getRuntimeApp`方法，用于获取当前运行的app对象：

```javascript
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const element = app.getElement("models.UserModel");
```

## 属性
| 名称 | 类型 | 说明 |
|------|------|------|
| appId | string | 应用ID，例如：`wanyun.MyApp` |
| name | string | 应用名称 |
| title | string | 应用标题，例如：`我的应用` |
| version | string | 应用版本，三段点分版本号，例如：`1.0.0` |
| rootPath | string | 应用根路径 |
| theme | string | 应用主题（可选） |
| icon | string | 应用图标（可选） |

## 方法 
### getElement
获取指定的元素实例，这是日常开发中最常用的方法。

**参数：**

* **elementPath** (string): 元素路径，如 `"models.UserModel"`
* **platform** (string, 可选): 平台类型，PC、MOBILE，默认PC

**返回值：** 

元素模块对象。

**返回值类型：** 

`Promise<ElementModule>`

**示例：**

```javascript
// 获取元素
const element = await app.getElement("models.UserModel");

// 调用元素方法
const result = await element.someMethod();
```

### getDefineByType
根据类型获取元素定义。

**参数：**

* **type** (string): 元素类型，如 `"models.NormalType"`
* **recursive** (boolean, 可选): 是否查找继承
* **sort** (boolean, 可选): 是否排序

**返回值：** 

元素定义列表。

**返回值类型：** 

`ElementDefine[]`

### getElementDefine
按元素目录获取所有元素定义。

**参数：**

* **fullName** (string): 元素完整名称，如 `"models.UserModel"`
* **recursive** (boolean, 可选): 是否查找继承

**返回值：** 

元素定义列表。

**返回值类型：** 

`ElementDefine[]`

### getInsDefineByType
根据类型获取所有实例元素定义。

**参数：**

* **type** (string): 需要查找的type的type，一般为Meta元素
* **recursive** (boolean, 可选): 是否查找继承
* **allowPrivate** (boolean, 可选): 是否允许私有元素
* **sort** (boolean, 可选): 是否排序

**返回值：** 

元素定义列表。

**返回值类型：** 

`ElementDefine[]`

### getUniqInsDefineByType
根据类型获取去重后的实例元素定义（重写后只会保留重写元素）。

**参数：**

* **type** (string): 需要查找的type的type，一般为Meta元素
* **recursive** (boolean, 可选): 是否查找继承
* **allowPrivate** (boolean, 可选): 是否允许私有元素
* **sort** (boolean, 可选): 是否排序

**返回值：** 

元素定义列表。

**返回值类型：** 

`ElementDefine[]`

### navigate
页面导航方法。

**参数：**

* **url** (string): 导航地址
* **options** (object, 可选): 导航选项
  * **replace** (boolean): 是否替换当前历史记录

**返回值：** 

无。

**返回值类型：** 

void

**示例：**

<Tabs>
<TabItem value="normal" label="普通导航">

```javascript
// 普通导航
app.navigate('/user/profile');
```

</TabItem>
<TabItem value="replace" label="替换导航">

```javascript
// 替换当前历史记录
app.navigate('/user/profile', { replace: true });
```

</TabItem>
</Tabs>

## 使用示例
```javascript
// 完整的使用示例
export default {
  async mounted() {
    // 获取应用信息
    const app = this.app;
    console.log(`应用ID: ${app.appId}`);
    console.log(`应用标题: ${app.title}`);
    
    // 获取元素
    const userModel = await app.getElement("models.UserModel");
    const userList = await userModel.getAll();
    
    // 页面导航
    app.navigate('/user/list');
  }
}
``` 