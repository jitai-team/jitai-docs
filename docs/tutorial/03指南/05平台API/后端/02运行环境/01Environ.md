---
sidebar_position: 1
---

# Environ

Environ（运行环境对象），用于管理和控制应用的运行环境。在同一个运行环境中，每个AppId只能运行一个版本在App容器中。一个App在多个运行环境中都存在时，版本号可以相同，也可以不同。

可通过`app.env`访问当前应用所属的运行环境对象。

## 属性

| 名称 | 类型 | 说明 |
|------|------|------|
| envId | str | 运行环境ID，例如：`JRE_MWcVmUZjEq` |
| orgId | str | 组织ID，例如：`wanyun` |
| title | str | 运行环境标题 |
| remark | str | 运行环境备注 |
| rootPath | str | 运行环境根路径 |
| updateTime | int | 运行环境配置的更新时间戳 |
| entry | str | 当前使用的入口地址 |

:::danger[危险]
开发者可以读取以上属性，但不要强行修改以上属性值，可能会导致不可预知的错误。
:::

## 方法

### getApp
获取一个已部署的App对象。

**参数：**

* **appId** (str): 应用ID
* **version** (str, 可选): 应用版本
* **initApp** (bool, 可选): 是否初始化应用，默认为False

**返回值：** 

应用对象

**返回值类型：** 

[App](../01应用/App) 或 None

:::warning[注意]
该方法要求应用必须在部署记录中存在。
:::

### getAppIgnoreRule
获取应用对象，不要求存在部署记录。

**参数：**

* **appId** (str): 应用ID
* **version** (str): 应用版本

**返回值：** 


**返回值类型：** 

[App](../01应用/App) 或 None

### getAppPath
获取应用在运行环境根目录下的相对路径。

**参数：**

* **appId** (str): 应用ID

**返回值：** 

应用路径。

**返回值类型：** 

str

### getAppDistPath
获取应用的dist目录在运行环境根目录下的相对路径。

**参数：**

* **appId** (str): 应用ID

**返回值：** 

应用dist路径。

**返回值类型：** 

str

### getAppDistAbsolutePath
获取应用的dist目录绝对路径，磁盘上的路径。

**参数：**

* **appId** (str): 应用ID

**返回值：** 

应用dist目录绝对路径。

**返回值类型：** 

str

## 使用示例

```python
# 获取当前应用的运行环境
env = app.env

# 获取已部署的应用
myApp = env.getApp("wanyun.MyApp")

# 获取应用路径
appPath = env.getAppPath("wanyun.MyApp")
print(f"应用路径: {appPath}")

# 获取应用部署规则
rule = env.getRuleByAppId("wanyun.MyApp")
if rule:
    print(f"应用版本: {rule.version}")
    print(f"调试模式: {rule.debug}")
```
