---
sidebar_position: 4
slug: task-service
description: "临时任务 API 参考文档。完整的规格说明、方法和示例。"
draft: true
---

# 临时任务

临时任务 (`tasks.TemporaryType`) 与前两种任务不同，它**没有**静态的配置文件 (`e.json`) 来定义执行规则。它是一种**代码触发**机制，允许开发人员在业务逻辑中动态地创建一次性的后台任务。

**核心特性**:
*   **动态性**: 执行时间、参数、执行函数都在运行时指定。
*   **一次性**: 任务执行完毕后即销毁，不会自动重复。
*   **异步化**: 常用于解耦耗时操作，提升接口响应速度。

## 快速开始

### 场景示例

**场景**：订单创建 30 分钟后自动取消。

#### 业务代码 (触发点)

在业务逻辑中调用 `createTemporaryTask` 创建任务。

```python title="services/OrderSvc.py"
from tasks.TemporaryType.task import createTemporaryTask
from jit_utils.time import now

def create_order(user_id, items):
    # 1. 创建订单逻辑...
    order_id = "ORD_123456"
    
    # 2. 计算 30 分钟后的时间
    # use arrow or jit_utils
    exec_time = now().shift(minutes=30).format("YYYY-MM-DD HH:mm:ss")
    
    # 3. 创建延时检查任务
    task_id = createTemporaryTask(
        func="services.OrderSvc.checkAndCancel",
        argDict={
            "orderId": order_id,
            "reason": "timeout"
        },
        startTime=exec_time
    )
    
    print(f"订单创建成功，延时任务已生成: {task_id}")
    return order_id
```

#### 任务执行函数

实现具体的业务处理逻辑。

```python title="services/OrderSvc.py"
def checkAndCancel(orderId, reason="unknown"):
    """
    参数名必须与 argDict 中的 key 保持一致
    """
    print(f"检查订单支付状态: {orderId}, 原因: {reason}")
    
    # 查询数据库判断是否已支付
    # if not paid: cancel_order()
    
    return "Checked"
```

## API 说明

### createTemporaryTask

系统提供了 `createTemporaryTask` 辅助函数来创建任务。

#### 引入方式

```python
from tasks.TemporaryType.task import createTemporaryTask
```

#### 函数签名

```python
def createTemporaryTask(func, argDict=None, startTime=None):
    """
    :param func: (str) 要执行的全局函数路径
    :param argDict: (dict) 传递给函数的关键字参数字典
    :param startTime: (str) 计划执行时间，格式 "yyyy-MM-dd HH:mm:ss"
    :return: (str) 生成的任务 ID (taskId)
    """
```

#### 参数详解

| 参数名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `func` | String | **是** | 全局可访问的服务函数路径。函数必须存在且已加载。 | `"services.OrderSvc.autoCancel"` |
| `argDict` | Dict | 否 | 传递给函数的关键字参数字典。 | `{"orderId": "123"}` |
| `startTime` | String | 否 | 计划执行时间，格式 `yyyy-MM-dd HH:mm:ss`。<br />如果不传，默认为立即执行（系统扫描周期内）。 | `"2023-12-25 10:00:00"` |

## 执行函数

### 函数入参

临时任务的执行函数参数由创建任务时的 `argDict` 决定。

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| (自定义) | (自定义) | 否 | 函数参数名必须与 `argDict` 中的 Key 一一对应（除非使用 `**kwargs`）。 |

### 函数体

函数必须是全局可访问的服务函数（通常在 `services/` 下）。

*   **参数匹配**: 确保函数定义的参数列表能接收 `argDict` 中的所有键。
*   **无状态**: 函数应当是无状态的，所有必要上下文应通过 `argDict` 传递（推荐传递 ID）。

## 调试与注意事项

1.  **传递复杂参数**:
    *   由于 `argDict` 会被序列化存储到数据库中，建议**仅传递 ID**。
    *   不要传递整个对象（如 `User` 对象），而是传递 `userId`。在执行函数中通过 ID 重新查询数据。
    *   尽量只使用 String, Number, Boolean, List, Dict 等 JSON 兼容类型。

2.  **错误处理**:
    *   临时任务一旦执行失败（抛出异常），状态会变为 `error` 并记录在历史表中。
    *   **无自动重试**: 默认情况下，临时任务失败不会自动重试。
    *   **手动干预**: 管理员可以在后台查看失败的任务历史。

3.  **事务注意**:
    *   `createTemporaryTask` 本身是一个数据库插入操作 (`TaskModel.create`)。
    *   如果在事务 (`@transaction`) 中调用它，任务记录的创建会随事务提交。如果事务回滚，任务也不会被创建，这通常是符合预期的行为（业务失败了，对应的后续任务自然也不该执行）。
