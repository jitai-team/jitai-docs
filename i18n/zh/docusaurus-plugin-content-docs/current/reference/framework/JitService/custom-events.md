---
slug: custom-events
description: "自定义事件 API 参考文档。完整的规格说明、方法和示例。"
---

# 自定义事件

自定义事件 (`events.NormalType`) 由开发者在服务元素中根据需要自由定义，并在业务逻辑代码中主动触发。它为事件驱动型的系统开发提供了高度的灵活性。

自定义事件适用于解耦业务逻辑、异步任务处理、跨服务通信等场景，例如：

*   **业务解耦**：用户注册后，触发发送邮件和短信的事件，注册逻辑无需关注通知细节。
*   **异步处理**：触发一个耗时的数据分析任务，立即返回响应，后台异步执行。
*   **扩展机制**：允许第三方模块订阅核心业务事件，进行功能扩展。

自定义事件元素分层结构为 Meta (`events.Meta`) → Type (`events.NormalType`) → 实例，开发者可通过可视化开发工具快捷地创建自定义事件实例元素。

## 快速开始

### 前置条件

开发者需要先**在服务元素中定义事件**，然后才能创建`自定义事件`实例元素来订阅该事件。
参见：[在服务元素中定义事件](./custom-business-service#event-definition-and-usage)

### 创建实例元素 {#subscribe-custom-event}

#### 目录结构

在 `events/` 目录下创建一个新的事件目录（例如 `MyCustomEvent`），标准结构如下：

```text
events/
└── MyCustomEvent/           # [目录] 事件元素名称
    ├── e.json               # [文件] 核心配置文件
    ├── inner.py             # [文件] (可选) 内部执行逻辑代码
    └── __init__.py          # [文件] Python 包标识
```

#### e.json文件

```json title="events/MyCustomEvent/e.json"
{
  "type": "events.NormalType",
  "title": "测试自定义事件",
  "sender": "services.MyService.CustomEvent",
  "funcType": "Inner",
  "asyncType": false,
  "enable": 1,
  "backendBundleEntry": "."
}
```

#### inner.py文件

```python title="events/MyCustomEvent/inner.py"
def customFunc(*args, **kwargs):
    """
    函数名必须为 customFunc
    :param args: 位置参数
    :param kwargs: 关键字参数
    """
    # 当 `funcType` 为 `Global` 时，无需实现该函数。
    # 业务逻辑实现
    print(f"自定义事件被触发: args={args}, kwargs={kwargs}")
    return True
```

#### \_\_init\_\_.py文件

```python title="events/MyCustomEvent/__init__.py"
from .inner import customFunc
```

## 元素配置

### e.json配置

| 字段名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | **是** | 固定值 | `"events.NormalType"` |
| `title` | String | 否 | 事件显示名称 | `"测试自定义事件"` |
| `sender` | String | **是** | 事件发送方，格式：`服务元素fullName.事件名` | `"services.MyService.CustomEvent"` |
| `funcType` | String | 否 | 函数类型：`"Global"` \| `"Inner"` | `"Global"` (默认) |
| `func` | String | 条件 | 当 `funcType` 为 `"Global"` 时必填，指向服务函数路径 | `"services.NotifySvc.send_email"` |
| `asyncType` | Boolean | 否 | 是否异步执行 | `false` (默认) |
| `objMode` | Boolean | 否 | 对象模式，开启后参数包装在 obj 中 | `false` (默认/推荐) |
| `enable` | Integer | 否 | 1: 启用, 0: 禁用 | `1` (默认) |
| `backendBundleEntry` | String | **是** | 后端加载入口，固定为 `"."` | `"."` |
| `returnType` | String | 否 | 返回值类型 | `"None"` |
| `path` | String | 否 | 元素所在目录相对路径 | `"events"` |
| `extendType` | String | 否 | 继承扩展类型 | `"self"` |


## 执行函数

### 函数入参

根据 `objMode` 配置不同，入参形式不同。

#### 普通模式 (`objMode: false`)

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `args` | tuple | 位置参数 |
| `kwargs` | dict | 关键字参数 |

#### 对象模式 (`objMode: true`)

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `obj` | dict | 包含所有参数的字典对象 |

### 函数体

#### 服务函数（推荐）

适用于复用已有的 Service 逻辑。 `funcType` 设置为 `"Global"`，`func` 指向 Service 函数。

```python title="services/NotifySvc/service.py"
from services.NormalType import NormalService

class NotifySvc(NormalService):
    def send_email(self, *args, **kwargs):
        email = kwargs.get('email')
        print(f"发送邮件给: {email}")
```

#### 事件内置函数

适用于逻辑仅属于该事件。 `funcType` 设置为 `"Inner"`，在 `inner.py` 中实现。

```python title="events/MyCustomEvent/inner.py"
def customFunc(*args, **kwargs):
    """
    函数名必须为 customFunc
    """
    # 业务逻辑
    print("自定义事件逻辑执行")
    return True
```
