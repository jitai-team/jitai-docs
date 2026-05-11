---
sidebar_position: 23
slug: agent-runtime-extension
description: "通过 Python 代码在生命周期关键节点插入自定义逻辑。"
---

# 使用钩子函数实现运行时拦截扩展

运行扩展允许开发者在 Agent 的关键生命周期节点插入自定义 Python 逻辑，实现审计日志、上下文增强等高级需求。

<!-- TODO: 配图 - 截图：运行扩展代码编辑器 -->

## 配置运行扩展

在 Agent 编辑器中切换到`更多` → `运行扩展`，可直接编写 Python 代码。保存后下次运行生效，平台提供默认代码模板和"还原默认代码"按钮。

## 代码结构

定义一个 `CustomMiddleware` 类，按需实现以下属性和生命周期钩子方法。平台提供默认代码模板，点击"还原默认代码"可恢复：

```python
class CustomMiddleware:
    # 每次模型调用前追加到系统提示词中；返回空字符串表示不追加。
    @property
    def system_prompt(self):
        return ""

    # 整次 Agent 运行开始前调用；返回 dict 可更新 Agent 状态。
    def before_agent(self, state, runtime):
        return None

    # 每次调用大模型前调用；返回 dict 可更新 Agent 状态。
    def before_model(self, state, runtime):
        return None

    # 每次大模型返回后调用；返回 dict 可更新 Agent 状态。
    def after_model(self, state, runtime):
        return None

    # 整次 Agent 即将结束前调用；返回 dict 可更新 Agent 状态。
    def after_agent(self, state, runtime):
        return None

    # 工具执行前调用；返回新的 request 可替换工具请求。
    def before_tool(self, request):
        return None

    # 工具成功执行后调用；返回新结果可替换工具结果。
    def after_tool(self, request, result):
        return None

    # 工具执行抛出异常后调用；返回结果表示恢复执行，返回 None 会继续抛出异常。
    def on_tool_error(self, request, error):
        return None
```

## 可用的生命周期钩子

| 成员 | 类型 | 时机 | 用途 |
|------|------|------|------|
| `system_prompt` | 属性 | 每次模型调用前 | 返回字符串追加到系统提示词，空字符串或 None 表示不追加 |
| `before_agent(state, runtime)` | 方法 | Agent 运行开始前 | 初始化上下文、注入全局变量 |
| `before_model(state, runtime)` | 方法 | 每次模型调用前 | 注入业务数据、校验状态 |
| `after_model(state, runtime)` | 方法 | 每次模型返回后 | 读取模型输出、追加处理结果 |
| `after_agent(state, runtime)` | 方法 | Agent 即将结束前 | 汇总结果、清理资源 |
| `before_tool(request)` | 方法 | 工具执行前 | 读取或替换工具请求参数 |
| `after_tool(request, result)` | 方法 | 工具成功后 | 观察或替换工具返回结果 |
| `on_tool_error(request, error)` | 方法 | 工具报错后 | 记录异常或提供兜底结果 |
| `wrap_model_call(request, handler)` | 方法 | 包裹模型调用 | 重试、切换模型、缓存响应 |
| `wrap_tool_call(request, handler)` | 方法 | 包裹工具调用 | 重试、限流、缓存。定义此方法后，`before_tool`、`after_tool`、`on_tool_error` 不再自动执行 |

## 典型场景

- **操作审计**：在 `after_tool` 中记录操作日志
- **上下文增强**：在 `before_model` 中注入自定义业务上下文。对于时间、用户、角色等通用上下文，可直接使用[运行时上下文注入](./agent-runtime-context)配置化实现
- **自定义日志**：在各钩子中输出调试信息
