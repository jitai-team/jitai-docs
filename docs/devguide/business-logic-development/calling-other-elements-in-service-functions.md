---
sidebar_position: 2
slug: calling-other-elements-in-service-functions
---

# Calling Elements In Service Functions

Within service elements, each service function can call other backend elements to compose complex business processing workflows. JitAi supports developers in calling other elements both visually and by writing code directly within service functions.

## Using Platform APIs to Call Other Elements {#use-platform-api-to-call-other-elements}

The JitAi application runtime platform provides system-level APIs that developers can use within function logic, including the `app.getElement` function for calling elements. `app.getElement` returns an element instance object, and all functions declared within that object can be invoked.

```python title="Example"
element = app.getElement("element fullName")
result = element.func1(params)
```
`app` is a runtime object provided by the JitAi runtime platform that points to the current application. For details, refer to the [App](../../reference/runtime-platform/backend/applications/App) reference documentation.

## Typical Examples
### Calling Data Model Functions {#call-data-model-function}
Call [data model built-in functions](../../reference/framework/JitORM/data-models#model-built-in-functions) or [custom data model functions](../data-modeling/create-data-model-functions) to perform CRUD operations.

```python
# Call data model function
dataModel = app.getElement("models.UserModel")
user = dataModel.getUser(userId=123)
```

### Calling Other Service Functions {#call-other-service-functions}

Inter-service function calls are among the most common scenarios, enabling modularization of business logic.

```python
# Call user service
userService = app.getElement("services.UserService")
user_info = userService.getUserProfile(userId=123)
```

### Calling External APIs {#call-external-api}
Call functions of [external API](../third-party-integration/external-api) element instances to obtain results from corresponding third-party services.

```python
# Call payment interface
paymentAPI = app.getElement("externalAPIs.PaymentAPI")
payment_result = paymentAPI.createPayment(
    amount=100.0,
    currency="CNY",
    orderId="ORDER_123"
)
```

### Calling AI Large Language Models {#call-ai-llm}

Call the `runLlm` method of [AI large language model](../../reference/framework/JitAi/ai-large-models) elements to obtain results from the model.

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

### Calling AI Agents {#call-ai-agent}
Call the `run` function of [AI Agent](../../reference/framework/JitAi/AIAgent) elements to enable AI Agent capabilities within business logic.

```python
# Get AI Agent instance
agent = app.getElement("aiagents.DataAnalysisAgent")

# Basic call
result = agent.run(
    user_input="Analyze user behavior trends",
    variables={
        'data_source': 'models.UserBehaviorModel',
        'time_range': 'last_30_days'
    }
)
```
