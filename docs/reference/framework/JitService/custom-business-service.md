---
slug: custom-business-service
---
# Custom Business Service
Service elements are core components in the JitAI platform responsible for business logic processing, used to encapsulate data processing, business calculations, and system interaction logic.

The hierarchical structure of service elements is Meta (services.Meta) → Type (services.NormalType) → Instance. Developers can quickly create service instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `services.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```title="Service Element Directory Structure"
services/
├── MyBusinessService/          # Service element directory (path can be customized)
│   ├── e.json                  # Element definition file
│   ├── service.py              # Service implementation file
│   └── __init__.py             # Package initialization file
```

#### e.json File
```json title="services/MyBusinessService/e.json"
{
    "title": "My Business Service",
    "type": "services.NormalType",
    "backendBundleEntry": ".",
    "functionList": [
        {
            "name": "calculateTotal",
            "title": "Calculate Total Price",
            "args": [
                {
                    "name": "amount",
                    "title": "Amount",
                    "dataType": "Money"
                },
                {
                    "name": "discount",
                    "title": "Discount Rate",
                    "dataType": "Percent"
                }
            ],
            "returnType": "Money",
            "argsToDatatype": true,
            "desc": "Calculate final total price based on amount and discount rate"
        }
    ]
}
```

#### Business Logic Code
```python title="services/MyBusinessService/service.py"
from services.NormalType import NormalService
from datatypes.Meta import datatypes

class MyBusinessService(NormalService):
    
    def calculateTotal(self, amount, discount):
        """Calculate total price"""
        # Get amount value
        base_amount = amount.value
        discount_rate = discount.value / 100
        
        # Calculate discounted amount
        final_amount = base_amount * (1 - discount_rate)
        
        # Return Money type
        return datatypes.Money(value=final_amount)
```

```python title="services/MyBusinessService/__init__.py"
from .service import MyBusinessService
```

#### Usage Example
```python title="Call Service Element"
# Get service instance
service = app.getElement("services.MyBusinessService")

# Call service method
result = service.calculateTotal(amount=1000.0, discount=15.0)
print(f"Final amount: {result.value}")  # Output: Final amount: 850.0
```

## Element Configuration
### e.json Configuration
| Property | Type | Required | Description |
|------|------|------|------|
| title | String | Yes | Service element title |
| type | String | Yes | Fixed value "services.NormalType" |
| backendBundleEntry | String | Yes | Fixed value "." |
| functionList | Array | No | Service function definition list |
| eventDescs | Array | No | Event definition list |

#### functionList Configuration
| Property | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | Function name |
| title | String | Yes | Function title |
| args | Array | No | Parameter definition list |
| returnType | String | No | Return value type |
| argsToDatatype | Boolean | No | Whether to automatically convert parameters to JitAI data types |
| desc | String | No | Function description |

#### args Parameter Configuration
| Property | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | Parameter name |
| title | String | Yes | Parameter title |
| dataType | String | Yes | JitAI data type |
| acceptDataTypes | Array | No | List of acceptable data types |
| value | Any | No | Default value |

#### eventDescs Configuration
| Property | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | Event name |
| title | String | Yes | Event title |
| desc | String | No | Event description |

## Methods
### requestHandle
Handle HTTP requests, call corresponding service functions based on request path. In element specifications, any element with a requestHandle function can be called through HTTP requests, and service elements are commonly used for HTTP requests, working with [API Authorization](./api-authorization) elements to provide external API interfaces.

#### Parameter Details
| Parameter Name | JitAI Type | Python Type | Required | Description |
|--------|-----------|-------------|------|------|
| request | - | Request object | Yes | Object containing request information |

#### Return Value
- **Type**: Any
- **Description**: Return value of the called function

Usage examples can refer to [JAAP specifications for element calls](../../runtime-platform/JAAP#call-elements-in-business-logic).

## Properties
### __title__
- **Type**: String
- **Description**: Service element title
- **Access**: Read-only

### __fullName__
- **Type**: String  
- **Description**: Complete name identifier of service element
- **Access**: Read-only

### __functionList__
- **Type**: Dict
- **Description**: Service function information dictionary, key is function name, value is function definition
- **Access**: Read-only

## Advanced Features
### Automatic Parameter Conversion
When `argsToDatatype: true` is set in functionList, the service will automatically convert incoming parameters to specified JitAI data types.

```json title="Enable Automatic Parameter Conversion"
{
    "name": "processUser",
    "title": "Process User Information", 
    "args": [
        {
            "name": "userId",
            "title": "User ID",
            "dataType": "AutoInt"
        },
        {
            "name": "userName", 
            "title": "Username",
            "dataType": "Stext"
        }
    ],
    "argsToDatatype": true
}
```

```python title="Service Method with Automatic Conversion"
def processUser(self, userId, userName):
    # userId automatically converted to AutoInt type
    # userName automatically converted to Stext type
    print(f"User ID type: {type(userId)}")  # <class 'datatypes.AutoInt'>
    print(f"Username type: {type(userName)}")  # <class 'datatypes.Stext'>
```

### Event Definition and Usage {#event-definition-and-usage} 
Service elements support defining and triggering custom events.

```json title="Event Definition Example"
{
    "eventDescs": [
        {
            "name": "dataProcessed",
            "title": "Data Processing Completed",
            "desc": "Trigger this event when data processing is completed"
        }
    ]
}
```

```python title="Trigger Event Example"
def processData(self, data):
    # Data processing logic
    result = self._doDataProcessing(data)
    
    # Trigger event
    app.triggerEvent("dataProcessed", {
        "processedCount": len(result),
        "timestamp": datetime.now()
    })
    
    return result
```

### Parameter Validation
Service elements automatically validate incoming parameters against definitions in functionList.

```python title="Parameter Validation Example"
# If undefined parameters are passed, an exception will be thrown
service.calculateTotal(
    amount=1000,
    discount=15,
    invalidParam="test"  # This will cause API_PARAMS_ERROR exception
)
```

### Exception Handling
Service elements provide unified exception handling mechanisms.

```python title="Exception Handling Example"
from jit.errcode import Code

class MyBusinessService(NormalService):
    
    # Define business error codes
    INVALID_AMOUNT = Code(code=10001, reason="Amount cannot be negative")
    
    def calculateTotal(self, amount, discount):
        if amount.value < 0:
            raise self.INVALID_AMOUNT
            
        # Normal business logic
        return self._doCalculation(amount, discount)
```