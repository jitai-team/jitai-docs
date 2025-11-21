---
sidebar_position: 2
slug: calling-other-elements-in-service-functions
description: "Call data models, services, AI elements, and other business elements from service functions. Inter-element communication patterns."
---

# Calling Elements in Service Functions

Within service elements, each service function can call other backend elements to compose complex business processing workflows. JitAI supports both visual element invocation and direct code-based calling within service functions.

## Using platform APIs to call other elements {#use-platform-api-to-call-other-elements}

The JitAI application runtime platform provides system-level APIs for use within function logic, including the `app.getElement` function for element invocation. The `app.getElement` function returns an element instance object, exposing all declared functions for calling.

```python title="Example"
element = app.getElement("element fullName")
result = element.func1(params)
```
The `app` object is a runtime object provided by the JitAI platform that references the current application. For details, see the [App](../../reference/runtime-platform/backend/applications/App) reference documentation.

## Typical examples {#typical-examples}

### Calling data model functions {#call-data-model-function}

Invoke [data model built-in functions](../../reference/framework/JitORM/data-models#model-built-in-functions) or [custom data model functions](../data-modeling/create-data-model-functions) to perform CRUD operations.

```python
# Call data model function
dataModel = app.getElement("models.UserModel")
user = dataModel.getUser(userId=123)
```

### Calling other service functions {#call-other-service-functions}

Inter-service function calls represent one of the most common patterns, enabling modular business logic design.

```python
# Call user service
userService = app.getElement("services.UserService")
user_info = userService.getUserProfile(userId=123)
```

### Calling external APIs {#call-external-api}

Invoke functions of [external API](../third-party-integration/external-api) element instances to retrieve results from corresponding third-party services.

```python
# Call payment API
paymentAPI = app.getElement("externalAPIs.PaymentAPI")
payment_result = paymentAPI.createPayment(
    amount=100.0,
    currency="CNY",
    orderId="ORDER_123"
)
```

### Calling AI large language models {#call-ai-llm}

Invoke the `runLlm` method of [AI large language model](../../reference/framework/JitAi/ai-large-models) elements to obtain model-generated results.

```python
# Get AI large language model instance
llm = app.getElement("llms.MyLLM")

# Basic text generation
response = llm.runLlm({
    "dataType": "Ltext",
    "promptList": [
        {"role": "user", "prompt": "Hello, please introduce yourself", "id": "user-1"}
    ],
    "llmConfig": {"model": "qwen-plus"}
}, locals())
```

### Calling AI agents {#call-ai-agent}

Invoke the `run` function of [AI Agent](../../reference/framework/JitAi/AIAgent) elements to leverage AI Agent capabilities within your business logic.

```python
# Get AI Agent instance
agent = app.getElement("aiagents.DataAnalysisAgent")

# Basic invocation
result = agent.run(
    user_input="Analyze user behavior trends",
    variables={
        'data_source': 'models.UserBehaviorModel',
        'time_range': 'last_30_days'
    }
)
```
