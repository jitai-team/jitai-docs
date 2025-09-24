---
sidebar_position: 2
slug: AppCode
---

# AppCode
AppCode (Application Source Code Manager) is used to manage and operate application source code files. AppCode is only available when the application has local source code (i.e., when an app.json file exists), typically used in development and debugging scenarios.

The AppCode object for the current application can be accessed through `app.code`.

## Properties
| Name | Type | Description |
|------|------|------|
| envId | str | Runtime environment ID, e.g., `JRE_MWcVmUZjEq` |
| appId | str | Application ID, e.g., `wanyun.MyApp` |
| version | str | Application version, e.g., `1.0.0` |
| env | [Environ](../runtime-environment/01Environ) | Runtime environment object that the application belongs to |
| app | [App](../applications/App) | Application object |
| enable | bool | Whether it is available, requires local source code to be usable |

:::danger[Danger]
Developers can read the above properties, but should not forcibly modify these property values, as it may cause unpredictable errors.
:::

## Methods 
### exists
Checks whether a file or directory at the specified path exists.

**Parameters:**

* **path** (str): Path relative to the application root directory

**Return Value:** 

Whether the file or directory exists.

**Return Type:** 

bool

### isdir
Checks whether the specified path is a directory.

**Parameters:**

* **path** (str): Path relative to the application root directory

**Return Value:** 

Whether it is a directory.

**Return Type:** 

bool

### isfile
Checks whether the specified path is a file.

**Parameters:**

* **path** (str): Path relative to the application root directory

**Return Value:** 

Whether it is a file.

**Return Type:** 

bool

### read
Reads the content of the specified file.

**Parameters:**

* **path** (str): File path relative to the application root directory
* **binary** (bool, optional): Whether to read in binary mode, defaults to False

**Return Value:** 

File content.

**Return Type:** 

str or bytes

### write
Writes content to the specified file.

**Parameters:**

* **path** (str): File path relative to the application root directory
* **content** (str): Content to be written

**Return Value:** 

Result of the write operation.

:::warning[Note]
Write operations will overwrite existing file content.
:::

### writeElement
Writes element files.

**Parameters:**

* **fullName** (str): The fullName of the element
* **files** (Dict[str, str]): File dictionary, where key is the file path and value is the file content

**Return Value:** 

Result of the write operation.

### parseElementByPath
Parses the element's fullName based on the file path.

**Parameters:**

* **path** (str): File path, e.g., `models/AModel/model.py`

**Return Value:** 

The element's fullName, returns None if not found.

**Return Type:** 

str or None

### listdir
Lists files and subdirectories in the specified directory.

**Parameters:**

* **path** (str): Directory path relative to the application root directory

**Return Value:** 

List of directory contents.

**Return Type:** 

List[str]

### deleteDir
Deletes the specified directory and its contents.

**Parameters:**

* **path** (str): Directory path relative to the application root directory

**Return Value:** 

Result of the delete operation.

:::danger[Danger]
Delete operations are irreversible, please use with caution.
:::

### createDir
Creates a directory.

**Parameters:**

* **path** (str): Directory path relative to the application root directory

**Return Value:** 

Result of the create operation.

### copyDir
Copies a directory and its contents.

**Parameters:**

* **sourceDir** (str): Source directory path, relative to the application root directory
* **targetDir** (str): Target directory path, relative to the application root directory

**Return Value:** 

Result of the copy operation.

### deleteFile
Deletes the specified file.

**Parameters:**

* **path** (str): File path relative to the application root directory

**Return Value:** 

Result of the delete operation.

:::danger[Danger]
Delete operations are irreversible, please use with caution.
:::

### rename
Renames a file or directory.

**Parameters:**

* **sourcePath** (str): Source path, relative to the application root directory
* **targetPath** (str): Target path, relative to the application root directory

**Return Value:** 

Result of the rename operation.

## Usage Examples
```python
# Check if file exists
if app.code.exists("models/UserModel/model.py"):
    print("File exists")

# Read file content
content = app.code.read("app.json")
print(content)

# Write file
app.code.write("test.txt", "Hello World")

# Create directory
app.code.createDir("new_folder")

# List directory contents
files = app.code.listdir("models")
print(files)

# Parse element path
fullName = app.code.parseElementByPath("models/UserModel/model.py")
print(fullName)  # Output: models.UserModel
```

:::tip[Tip]
AppCode is primarily used for source code operations in development mode, only applicable when source code is available. In production mode, [AppResource](AppResource) is typically used to operate runtime application resources.
:::