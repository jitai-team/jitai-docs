---
sidebar_position: 1
slug: App
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# App
The App object is the core of the frontend platform API, providing application-level properties and methods.

## Accessing the App Object
### Access from Within Elements
All element objects have a member variable `app`, which can be accessed through `this.app`:

```javascript
// Use within element methods
export default {
  methods: {
    someMethod() {
      // Get the application object
      const app = this.app;
      
      // Use app object methods
      const element = app.getElement("models.UserModel");
    }
  }
}
```

### Global Access
The platform also provides a `getRuntimeApp` method to get the currently running app object:

```javascript
import { getRuntimeApp } from 'jit';

const app = getRuntimeApp();
const element = app.getElement("models.UserModel");
```

## Properties
| Name | Type | Description |
|------|------|------|
| appId | string | Application ID, e.g., `wanyun.MyApp` |
| name | string | Application name |
| title | string | Application title, e.g., `My Application` |
| version | string | Application version, three-part dot-separated version number, e.g., `1.0.0` |
| rootPath | string | Application root path |
| theme | string | Application theme (optional) |
| icon | string | Application icon (optional) |

## Methods 
### getElement
Gets the specified element instance. This is the most commonly used method in daily development.

**Parameters:**

* **elementPath** (string): Element path, e.g., `"models.UserModel"`
* **platform** (string, optional): Platform type, PC or MOBILE, defaults to PC

**Return Value:** 

Element module object.

**Return Type:** 

`Promise<ElementModule>`

**Example:**

```javascript
// Get element
const element = await app.getElement("models.UserModel");

// Call element method
const result = await element.someMethod();
```

### getDefineByType
Gets element definitions by type.

**Parameters:**

* **type** (string): Element type, e.g., `"models.NormalType"`
* **recursive** (boolean, optional): Whether to search inheritance
* **sort** (boolean, optional): Whether to sort

**Return Value:** 

List of element definitions.

**Return Type:** 

`ElementDefine[]`

### getElementDefine
Gets all element definitions by element directory.

**Parameters:**

* **fullName** (string): Element full name, e.g., `"models.UserModel"`
* **recursive** (boolean, optional): Whether to search inheritance

**Return Value:** 

List of element definitions.

**Return Type:** 

`ElementDefine[]`

### getInsDefineByType
Gets all instance element definitions by type.

**Parameters:**

* **type** (string): The type to search for, typically a Meta element
* **recursive** (boolean, optional): Whether to search inheritance
* **allowPrivate** (boolean, optional): Whether to allow private elements
* **sort** (boolean, optional): Whether to sort

**Return Value:** 

List of element definitions.

**Return Type:** 

`ElementDefine[]`

### getUniqInsDefineByType
Gets deduplicated instance element definitions by type (after overriding, only the overridden elements are retained).

**Parameters:**

* **type** (string): The type to search for, typically a Meta element
* **recursive** (boolean, optional): Whether to search inheritance
* **allowPrivate** (boolean, optional): Whether to allow private elements
* **sort** (boolean, optional): Whether to sort

**Return Value:** 

List of element definitions.

**Return Type:** 

`ElementDefine[]`

### navigate
Page navigation method.

**Parameters:**

* **url** (string): Navigation URL
* **options** (object, optional): Navigation options
  * **replace** (boolean): Whether to replace the current history record

**Return Value:** 

None.

**Return Type:** 

void

**Example:**

<Tabs>
<TabItem value="normal" label="Normal Navigation">

```javascript
// Normal navigation
app.navigate('/user/profile');
```

</TabItem>
<TabItem value="replace" label="Replace Navigation">

```javascript
// Replace current history record
app.navigate('/user/profile', { replace: true });
```

</TabItem>
</Tabs>

## Usage Examples
```javascript
// Complete usage example
export default {
  async mounted() {
    // Get application information
    const app = this.app;
    console.log(`Application ID: ${app.appId}`);
    console.log(`Application Title: ${app.title}`);
    
    // Get element
    const userModel = await app.getElement("models.UserModel");
    const userList = await userModel.getAll();
    
    // Page navigation
    app.navigate('/user/list');
  }
}
``` 