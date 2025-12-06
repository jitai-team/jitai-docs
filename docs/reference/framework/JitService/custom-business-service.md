---
slug: custom-business-service
title: "Custom Business Service Reference"
description: "Custom Business Service Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Custom Business Service"
---

# Custom Business Service

Service elements are core components in the JitAI platform responsible for business logic processing, encapsulating data handling, business calculations, and system interaction logic.

The hierarchical structure of service elements is Meta (services.Meta) → Type (services.NormalType) → Instance. Developers can quickly create service instances via JitAI's visual development tools or manually write code to implement complex business logic.

## Service Directory Structure

Each service element resides in an independent directory following the path convention: `[AppRoot]/services/[ServiceName]`

```plaintext
[AppRoot]/services/MyBusinessService/
├── e.json        # Service declaration file
├── service.py    # Service implementation file
└── __init__.py   # Package initialization file
```

### e.json Declaration File

Defines service metadata, function signatures, and parameter configurations. Functions declared here must be implemented in `service.py`.

```json title="e.json"
{
  "title": "My Business Service",
  "type": "services.NormalType",
  "backendBundleEntry": ".",
  "functionList": [
    {
      "name": "calculateTotal",
      "title": "Calculate Total",
      "args": [
        {
          "name": "amount",
          "title": "Amount",
          "dataType": "Numeric"
        },
        {
          "name": "discount",
          "title": "Discount Rate",
          "dataType": "Numeric"
        }
      ],
      "returnType": "Numeric",
      "argsToDatatype": 1
    }
  ]
}
```

#### e.json Configurations

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Service title displayed in development tools |
| `type` | String | Yes | Fixed value `"services.NormalType"` |
| `functionList` | Array | No | List of service function definitions |
| `eventDescs` | Array | No | [Custom Events](#event-definition-and-usage) |

##### functionList Definitions

| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Function name, must match method name in py file |
| `title` | String | Function title |
| `args` | Array | Parameter list |
| `returnType` | String | Return value type (e.g., Stext, Numeric, RowData) |
| `argsToDatatype`| Integer| **Recommended: 1**. Automatically converts input arguments to datatypes objects |

##### args Parameter Definitions

| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Parameter name |
| `dataType` | String | Parameter data type |
| `generic` | String | Generic configuration (for List/Map/RowData) |


### service.py Implementation File

`service.py` implements the service logic. **Every function declared in `functionList` within `e.json` must have a corresponding member function implementation in the service class in `service.py`.**

```python title="service.py"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from services.NormalType import NormalService

class MyBusinessService(NormalService):
    def calculateTotal(self, amount, discount):
        # Define return variable
        result = datatypes.Numeric.new({"title": "Result"}, 0)
        
        # Business logic calculation (Use formula functions, not native operators)
        # result = amount * (1 - discount)
        temp = datatypes.Numeric.new({}, (SUB(1, discount.value)))
        result.value = (MUL(amount.value, temp.value))
        
        return result.value
```

### \_\_init\_\_.py Initialization File

```python title="__init__.py"
# -*-coding:utf-8-*-
from .service import MyBusinessService
```

## Development Standards

When writing `service.py`, adhere to JitAI specific development standards to ensure correct execution within the runtime platform.

### Variable Declaration and Assignment

To ensure seamless transition between **Pro-Code** and **Low-Code** development, **it is strongly recommended** to encapsulate all variables using [Jit Data Types](../JitORM/data-types) objects. **Logic written using Python native types (e.g., `int`, `str`, `dict`) will run correctly but cannot be displayed or manipulated in the visual development interface.**

**Declaration Format:**
`variable = datatypes.<Type>.new(<ConfigDict>, <InitialValue>)`

```python
# 1. Basic Types
count = datatypes.Numeric.new({"title": "Count"}, 0)
name = datatypes.Stext.new({"title": "Name"}, "JitAI")

# 2. Dictionary/Object (JitDict)
# variableList describes the internal structure
result = datatypes.JitDict.new({
    "variableList": [
        {"name": "code", "dataType": "Numeric"},
        {"name": "msg", "dataType": "Stext"}
    ]
}, {"code": 200, "msg": "success"})

# 3. Dynamic Map (JitMap)
# generic describes the Value type
provinceMap = datatypes.JitMap.new({
    "generic": "Numeric",
    "valueConfig": {"dataType": "Numeric"}
}, {})

# 4. List (JitList)
nameList = datatypes.JitList.new({
    "generic": "Stext"
}, [])

# 5. Model Data Row (RowData)
user = datatypes.RowData.new({
    "generic": "models.UserModel"
}, {})
```

**Assignment and Access:**
- **Assignment**: Use the `.value` property (except for compound types like Address).
- **Access**: Use `.value` to retrieve the raw value for calculation.

```python
# Assignment
variable.value = 100
varA.value = varB.value

# Formula Assignment (Must wrap formula functions in parentheses)
total.value = (SUM(price.value, tax.value))
```

**All variables must be wrapped with `datatypes.*.new`, and configuration cannot be empty**. The first parameter (configuration dictionary) of `datatypes.*.new` is mandatory, especially for container types (JitDict, JitMap, JitList, RowData, RowList) which must specify generics or structure definitions.

| Type | Required Config | Example |
|------|-----------------|---------|
| JitDict | `variableList` | `{"variableList": [{"name": "x", "title": "X ,"dataType": "Numeric"}]}` |
| JitMap | `valueConfig` & `generic` | `{"generic": "Numeric", "valueConfig": {"dataType": "Numeric"}}` |
| JitList | `generic` & `variableConfig` | `{"generic": "JitDict"，"variableConfig": {"dataType": "JitDict", "variableList": [{"name": "x", "title": "X, "dataType": "Numeric"}]}}` |
| RowData/RowList | `generic` | `{"generic": "models.CustomerModel"}` |

**Usage Recommendations:**
    Do not assign object attributes to temporary variables before use; access the full path directly.
*   ❌ `prov = item.fc02.province; map.set(prov, ...)`
*   ✅ `map.set(item.fc02.province, ...)`

### Logic Control and Operations

**It is strongly recommended to use object methods provided by `datatypes` or [Formula Functions](../JitORM/formula)** for business object comparison and calculation.

Although logic written with Python native operators (e.g., `+`, `-`, `>`, `==`) runs correctly at runtime, **such logic cannot be parsed or displayed by JitAI's visual development tools**, rendering the service function unviewable and uneditable in the visual interface.

| Operation | ❌ Not Recommended (Native) | ✅ Recommended (JitAI API) | Note |
| :--- | :--- | :--- | :--- |
| **Compare** | `if age > 18:` | `if age.gt(18):` | Visual Compatible |
| **Equal** | `if status == 1:` | `if status.isEqual(1):` | Visual Compatible |
| **Check Null** | `if name is None:` | `if name.isNull():` | Visual Compatible |
| **Check Not Null** | `if name:` | `if name.isNotNull():` | Visual Compatible |
| **Add** | `sum = a + b` | `sum.value = (SUM(a.value, b.value))` | Import Formula Functions |
| **Concat** | `str = "Hello" + name` | `str.value = (CONCAT("Hello", name.value))` | Import Formula Functions |

**Common Predicate Methods:**
- `.gt(val)`: Greater Than
- `.gte(val)`: Greater Than or Equal
- `.lt(val)`: Less Than
- `.lte(val)`: Less Than or Equal
- `.isEqual(val)`: Equal
- `.notEqual(val)`: Not Equal
- `.isNull()`: Is Null
- `.isNotNull()`: Is Not Null

### Iteration

When iterating over lists (e.g., query results), iterate directly over `RowList` or `JitList` objects.

```python
# result.rowDatas is a RowList
for item in result.rowDatas:
    # Access fields directly
    if item.age.gt(60):
        item.category.value = "Senior"
        item.save()
```

### Function Arguments and Return Values

**1. Argument Handling**
When a service function is called, the system handles arguments based on `e.json` configuration:
*   **As Callee (Function Definition)**: Regardless of whether the caller passes raw values or objects, the function internally receives **`datatypes` objects** (provided `"argsToDatatype": 1` is configured in `e.json`). Developers should treat input arguments as objects.
*   **As Caller (Invoking Functions)**: When calling other service functions, you can pass either `datatypes` objects or raw values (e.g., `100`, `"test"`). The system automatically encapsulates raw values into corresponding `datatypes` objects.

**2. Return Value Standards**
To maintain interface universality, service functions **should return raw values** (i.e., `result.value`) rather than `datatypes` objects themselves.
*   This allows callers to retrieve result data directly without concern for internal object structures.
*   Returning raw values (JSON-compatible format) is standard practice when the caller is a frontend or external system.

## Context and Utilities

Service development often requires accessing current user information, system time, logging execution logs, or calling other services.

### Global Variables

JitAI provides the `GlobalVar` object to access context information such as the current user and system time.

**Current User (`currentUser`)**

Access context information of the currently logged-in user. `currentUser` belongs to the [Member Type](../JitORM/data-types#member), supporting retrieval of attributes like User ID and Name.

**Current Time (`currentTime`)**

Access the current system time. `currentTime` belongs to the [DateTime Type](../JitORM/data-types#datetime), supporting retrieval of time components like year, month, and day.

```python
# Import GlobalVar
from globals.GlobalVar import GlobalVar

def my_function(self):
    # 1. Get Current User Name
    current_user_name = GlobalVar.currentUser.getName()
    
    # 2. Get Current Year
    current_year = GlobalVar.currentTime.year
```

### Logging

It is recommended to use `jit.commons.utils.logger` for business logging to facilitate troubleshooting.

```python
from jit.commons.utils.logger import log

def processPayment(self, orderId):
    log.info(f"Start processing payment for order: {orderId}")
    
    try:
        # ... Payment logic ...
        log.debug("Payment API called successfully")
    except Exception as e:
        log.error(f"Payment failed: {str(e)}")
        log.exception(e) # Log full stack trace
    
```

### Calling Other Services

There are two main ways to call other services within a service:

**Method 1: Direct Reference (`app.<fullName>`) (Recommended)**

Chain calls directly via the `app` object. This syntax is concise and typically offers better IDE completion support (if stub code is generated).

```python
def checkout(self, userId, items):
    # 1. Call User Service directly
    isValid = app.services.UserService.checkUserStatus(userId)
    
    # 2. Call Inventory Service directly
    app.services.InventoryService.deduct(items)
```

**Method 2: Using `app.getElement(<fullName>)`**

Retrieve the service instance via string. This method is more dynamic and suitable when the service existence cannot be determined statically.

```python
def checkout(self, userId, items):
    # 1. Call User Service
    userSvc = app.getElement("services.UserService")
    isValid = userSvc.checkUserStatus(userId)
    
    # 2. Call Inventory Service
    inventorySvc = app.getElement("services.InventoryService")
    inventorySvc.deduct(items)
```


## Core Functional Development

### Model Data Operations

Invoking Models for CRUD operations is a core scenario in services.

#### Query Data (Query)

Use [Q Expressions](../JitORM/q-expressions) for conditional filtering.

```python
# Construct return structure
result = datatypes.JitDict.new({
    "variableList": [
        {"name": "rowDatas", "dataType": "RowList", "generic": "models.CustomerModel"},
        {"name": "totalCount", "dataType": "Numeric"}
    ]
}, app.models.CustomerModel.query(
    Q(Q("age", "gt", 18)),  # Filter Condition
    None,                   # Sort Field
    None,                   # Query Fields (None = All)
    1,                      # Page Number
    -1,                     # Page Size (-1 = All)
    2                       # Query Mode
))
```

#### Save Data (Save)

```python
# 1. Create New Data
user = datatypes.RowData.new({"generic": "models.UserModel"}, {})
user.name.value = "JohnDoe"
user.save()

# 2. Update Existing Data
user = app.models.UserModel.get("Q(Q('id', '=', 1))", [])
user.email.value = "new@example.com"
user.save()
```

### Exception Handling

When handling business logic, it is recommended to use `try-except` blocks to capture potential exceptions and log them or return user-friendly error messages.

```python
from jit.commons.utils.logger import log

def updateProfile(self, userInfo):
    try:
        user = app.models.UserModel.get(f"Q(Q('id', '=', {userInfo.id.value}))", [])
        if user is None:
            return {"code": 404, "msg": "User not found"}
            
        user.email.value = userInfo.email.value
        user.save()
        return {"code": 200, "msg": "Update successful"}
        
    except Exception as e:
        log.error(f"Failed to update user profile: {str(e)}")
        log.exception(e)
        return {"code": 500, "msg": "Internal Server Error"}
```

## Event Mechanism  {#event-definition-and-usage}

Service elements support defining and triggering custom events to decouple from other business logic.

### Define Events

Define events via the `eventDescs` field in the service declaration file `e.json`.

```json title="e.json"
{
  "eventDescs": [
    {
      "name": "onOrderCreated",
      "title": "Order Created",
      "desc": "Triggered when a new order is successfully created"
    }
  ]
}
```

### Trigger Events

Use the `app.event.publish` method in `service.py` to trigger defined events.

```python
def createOrder(self, orderInfo):
    # ... Business Logic: Create Order ...
    
    # Trigger Event
    # sender: Fully qualified name of the event, format "services.[ServiceName].[EventName]"
    # args: Positional arguments tuple
    # kwargs: Keyword arguments dictionary
    app.event.publish(
        sender="services.MyBusinessService.onOrderCreated",
        args=(),
        kwargs={"orderId": 12345, "amount": 100.0}
    )
```

### Event Subscription
See [Custom Event Reference](./custom-events#subscribe-custom-event) for details.

## Complete Code Example

The following example demonstrates a complete **OrderService**, including dependency imports, context retrieval, data queries, logic calculations, exception handling, and event triggering.

### e.json

```json title="services/OrderService/e.json"
{
  "title": "Order Service",
  "type": "services.NormalType",
  "backendBundleEntry": ".",
  "functionList": [
    {
      "name": "createOrder",
      "title": "Create Order",
      "args": [
        {"name": "skuId", "title": "SKU ID", "dataType": "Numeric"},
        {"name": "count", "title": "Count", "dataType": "Numeric"}
      ],
      "returnType": "JitDict",
      "argsToDatatype": 1
    }
  ],
  "eventDescs": [
    {"name": "onOrderPayed", "title": "Order Payed"}
  ]
}
```

### service.py

```python title="services/OrderService/service.py"
# -*-coding:utf-8-*-
from datatypes.Meta import datatypes
from services.NormalType import NormalService
from globals.GlobalVar import GlobalVar
from jit.commons.utils.logger import log

class OrderService(NormalService):
    
    def createOrder(self, skuId, count):
        # 1. Initialize Result
        result = datatypes.JitDict.new({
            "variableList": [
                {"name": "code", "dataType": "Numeric"},
                {"name": "msg", "dataType": "Stext"},
                {"name": "orderId", "dataType": "Numeric"}
            ]
        }, {"code": 200, "msg": "Success", "orderId": 0})

        try:
            log.info(f"User {GlobalVar.currentUser.name} creating order for SKU {skuId.value}")

            # 2. Check Stock (Call Other Service)
            hasStock = app.services.InventoryService.checkStock(skuId, count)
            
            if not hasStock:
                result.code.value = 400
                result.msg.value = "Insufficient stock"
                return result.value

            # 3. Calculate Amount (Model Query & Formula Calculation)
            sku = app.models.SkuModel.get(Q(Q('id', '=', {skuId.value})), [])
            totalPrice = datatypes.Numeric.new({}, (MUL(sku.price.value, count.value)))

            # 4. Save Order (Model Save)
            order = datatypes.RowData.new({"generic": "models.OrderModel"}, {})
            order.creator.value = GlobalVar.currentUser.id
            order.skuId.value = skuId.value
            order.count.value = count.value
            order.amount.value = totalPrice.value
            order.save()
            
            # Update Result
            result.orderId.value = order.id.value

            # 5. Trigger Event
            app.event.publish(
                sender="services.OrderService.onOrderPayed",
                args=(),
                kwargs={"orderId": order.id.value}
            )
            
            log.info(f"Order created successfully: {order.id.value}")
            return result.value

        except Exception as e:
            log.error("Create order failed")
            log.exception(e)
            result.code.value = 500
            result.msg.value = str(e)
            return result.value
```
