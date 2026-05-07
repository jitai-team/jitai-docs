---
sidebar_position: 3
slug: AppResource
title: "AppResource Reference"
description: "AppResource Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "AppResource"
---

# AppResource
AppResource (Application Resource Manager) is used to manage and operate application packaged resource files. AppResource is used in runtime environments and is responsible for reading application packaged resources from memory, including element resources, common resources, etc.

The AppResource object for the current application can be accessed through `app.resource`.

## Properties
| Name | Type | Description |
|------|------|------|
| envId | str | Runtime environment ID, e.g., `JRE_MWcVmUZjEq` |
| appId | str | Application ID, e.g., `wanyun.MyApp` |
| version | str | Application version, e.g., `1.0.0` |
| env | [Environ](../runtime-environment/01Environ) | Runtime environment object that the application belongs to |
| app | [App](../applications/App) | Application object |
| marks | Set[str] | Set of resource marks that have been retrieved from the runtime environment |
| files | Dict[str, str] | File resource cache, where key is the file path and value is the file content |

:::danger[Danger]
Developers can read the above properties, but should not forcibly modify these property values, as it may cause unpredictable errors.
:::

## Methods 
### exists
Checks whether a resource at the specified path exists.

**Parameters:**

* **path** (str): Resource path relative to the application root directory

**Return Value:** 

Whether the resource exists.

**Return Type:** 

bool

:::tip[Tip]
This method automatically handles path separator compatibility, supporting both Windows and Unix-style paths.
:::

### read
Reads the content of the specified resource.

**Parameters:**

* **path** (str): Resource path relative to the application root directory

**Return Value:** 

Resource content.

**Return Type:** 

str

:::info[Resource Reading Order]
1. First check if the resource is already in memory cache
2. If it's a common code package resource, read the common resource
3. If it's an element resource, parse the element based on the path and read it
4. Finally attempt to read the application resource
:::

### clear
Clears all resource cache.

**Return Value:** 

No return value.

### clearByElement
Clears resource cache by element.

**Parameters:**

* **fullName** (str): The fullName of the element

**Return Value:** 

No return value.

:::warning[Note]
After clearing the cache, the next access to the element's resources will reload from the runtime environment.
:::

### readElementResource
Reads all resource files for the specified element.

**Parameters:**

* **fullName** (str): The fullName of the element
* **forceLoad** (bool, optional): Whether to force reload, defaults to False

**Return Value:** 

Element resource content.

**Return Type:** 

Dict or None

:::info[Automatic Processing]
This method automatically adds necessary `__init__.py` files to ensure the integrity of Python package structure.
:::

### readCommonsResource
Reads common code package resources.

**Parameters:**

* **forceLoad** (bool, optional): Whether to force reload, defaults to False

**Return Value:** 

Common resource content.

**Return Type:** 

Dict or None

### parseElementByPath
Parses the element's fullName based on the resource path.

**Parameters:**

* **path** (str): Resource path, e.g., `models/AModel/model.py`

**Return Value:** 

The element's fullName, returns None if not found.

**Return Type:** 

str or None

### getAppJit
Gets the application configuration information.

**Return Value:** 

Application configuration information.

**Return Type:** 

Dict[str, Any]

### saveAppJit
Saves the application configuration information.

**Parameters:**

* **appJit** (Dict[str, Any]): Application configuration information

**Return Value:** 

Result of the save operation.

### getInitData
Gets the application initialization data.

**Return Value:** 

Initialization data, returns None if it doesn't exist.

**Return Type:** 

Dict[str, Any] or None

:::info[Data Retrieval Strategy]
1. First attempt to get from the runtime environment's resource manager
2. If that fails, try to read the `initData.json` file directly
3. If both fail, return None
:::

## Usage Examples
```python
# Check if resource exists
if app.resource.exists("models/UserModel/model.py"):
    print("Resource exists")

# Read resource content
content = app.resource.read("app.jit")
print(content)

# Get application configuration
appJit = app.resource.getAppJit()
print(appJit.get("title"))

# Get initialization data
initData = app.resource.getInitData()
if initData:
    print("Initialization data:", initData)

# Parse element path
fullName = app.resource.parseElementByPath("models/UserModel/model.py")
print(fullName)  # Output: models.UserModel

# Read element resource
elementResource = app.resource.readElementResource("models.UserModel")
if elementResource:
    print("Element resource loaded successfully")

# Clear cache for specific element
app.resource.clearByElement("models.UserModel")
```

## Caching Mechanism
AppResource employs a multi-layer caching mechanism to improve performance:

1. **File-level Cache**: The `files` dictionary caches all read file contents
2. **Element-level Marking**: The `marks` set records loaded elements to avoid duplicate loading
3. **Process-level Sharing**: Multiple requests within the same process share cached data

:::tip[Performance Optimization]
- Resources are loaded from the runtime environment and cached in memory on first access
- Subsequent accesses to the same resource read directly from memory cache
- Use the clearByElement method to clear cache for specific elements, enabling hot updates of resources
:::

:::info[Difference from AppCode]
- **AppCode**: Used in development mode, directly operates on source code files
- **AppResource**: Used in production mode, operates on packaged memory resources
- Developers can determine the current mode through the `app.debug` property
:::