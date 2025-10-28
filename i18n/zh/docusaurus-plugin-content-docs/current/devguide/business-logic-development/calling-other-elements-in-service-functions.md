---
sidebar_position: 2
slug: calling-other-elements-in-service-functions
description: "在服务函数中调用其它元素的详细指南和说明。"
---

# 在服务函数中调用其它元素

在服务元素中，每个服务函数都可以调用其它后端元素，从而组成复杂的业务处理流程。JitAi支持开发者以可视化的方式调用其它元素，也可以在服务函数中直接写代码调用其它元素。

## 使用平台API调用其它元素 {#use-platform-api-to-call-other-elements}

JitAi应用运行平台提供系统级API，开发者可以在函数逻辑中使用这些API，其中就包括调用元素时使用的`app.getElement`函数。`app.getElement`返回的是一个元素实例对象，该对象中声明的函数都可以被调用。

```python title="示例"
element = app.getElement("element fullName")
result = element.func1(params)
```
`app`是JitAi运行平台提供的运行时对象，指向当前应用，详情参考[App](../../reference/runtime-platform/backend/applications/App)参考文档。

## 几个典型示例 {#typical-examples}

### 调用数据模型函数 {#call-data-model-function}
调用[数据模型内置函数](../../reference/framework/JitORM/data-models#model-built-in-functions)或者[数据模型自定义函数](../data-modeling/create-data-model-functions)完成增删改查操作。

```python
# 调用数据模型函数
dataModel = app.getElement("models.UserModel")
user = dataModel.getUser(userId=123)
```

### 调用其它服务函数 {#call-other-service-functions}

服务函数之间相互调用也是最常见的场景，这样可以实现业务逻辑的模块化。

```python
# 调用用户服务
userService = app.getElement("services.UserService")
user_info = userService.getUserProfile(userId=123)
```

### 调用外部API {#call-external-api}
调用[外部API](../third-party-integration/external-api)元素实例的函数，获得对应第三方服务的返回结果。

```python
# 调用支付接口
paymentAPI = app.getElement("externalAPIs.PaymentAPI")
payment_result = paymentAPI.createPayment(
    amount=100.0,
    currency="CNY",
    orderId="ORDER_123"
)
```

### 调用AI大模型 {#call-ai-llm}

调用[AI大模型](../../reference/framework/JitAi/ai-large-models)元素的`runLlm`方法，获得大模型返回的结果。

```python
# 获取AI大模型实例
llm = app.getElement("llms.MyLLM")

# 基础文本生成
response = llm.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "你好，请介绍一下你自己", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())
```

### 调用AI Agent {#call-ai-agent}
调用[AI Agent](../../reference/framework/JitAi/AIAgent)元素的`run`函数，实现在业务逻辑中使用AI Agent的能力。

```python
# 获取AI Agent实例
agent = app.getElement("aiagents.DataAnalysisAgent")

# 基础调用
result = agent.run(
    user_input="分析用户行为趋势",
    variables={
        'data_source': 'models.UserBehaviorModel',
        'time_range': 'last_30_days'
    }
)
```
