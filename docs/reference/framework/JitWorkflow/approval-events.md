---
slug: approval-events
---
# Approval Events
Approval Events are event handlers specifically designed to process approval workflow status changes and node operations in the JitAI platform, implementing automated responses to approval processes based on event-driven mechanisms. They are responsible for listening to critical moments such as approval status changes, node changes, and node processing, and automatically executing predefined business logic, supporting complex approval workflow automation scenarios.

The Approval Events element hierarchy is Meta (events.Meta) → Type (events.WorkflowType) → Instance. Developers can quickly create Approval Events instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official events.WorkflowType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Approval Events Instance Element Directory Structure"
events/
└── myApprovalEvent/           # Event element name, path can be customized
    ├── e.json                 # Element configuration file
    └── inner.py               # Event handling logic (optional)
```

#### e.json File
```json title="Basic Configuration Example"
{
  "title": "Order Approval Event",
  "type": "events.WorkflowType",
  "backendBundleEntry": ".",
  "model": "models.OrderModel",
  "operate": "Process",
  "func": "inner.handleOrderApproval",
  "funcType": "inner"
}
```

#### Business Logic Code
```python title="inner.py Event Handling Logic"
from jit.commons.utils.logger import log

def handleOrderApproval(eventOutData):
    """
    Handle order approval event
    
    Parameters:
        eventOutData: Event output data, containing row (approval row data) and status (approval status)
    """
    try:
        row = eventOutData.row
        status = eventOutData.status.value
        
        log.info(f"Order {row.orderNo.value} approval status changed to: {status}")
        
        # Execute different logic based on approval status
        if status == "approved":
            # Business logic after approval
            processApprovedOrder(row)
        elif status == "rejected":
            # Business logic after rejection
            processRejectedOrder(row)
            
    except Exception as e:
        log.exception(f"Exception handling order approval event: {e}")
        raise

def processApprovedOrder(row):
    """Process approved order"""
    # Update order status
    row.status.value = "processing"
    row.save()

def processRejectedOrder(row):
    """Process rejected order"""
    # Update order status
    row.status.value = "cancelled"
    row.save()
```

#### Usage Example
```python title="Event Auto-trigger Example"
# Approval events are automatically triggered by approval workflows, no manual invocation needed
# When approval status changes, the system automatically executes configured event handling logic
# Get event element (for configuration management)
approvalEvent = app.getElement("events.myApprovalEvent")
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | String | Yes | - | Event title |
| type | String | Yes | - | Fixed value: events.WorkflowType |
| backendBundleEntry | String | Yes | - | Backend entry path, usually "." |
| model | String | Yes | - | Associated model fullName |
| operate | String | Yes | - | Operation type: Process/NodeChange/NodeHandled |
| func | String | Yes | - | Event handling function |
| funcType | String | Yes | - | Function type: inner/global |
| triggerNode | List | No | [] | Trigger node list (used for NodeChange) |
| handleType | String/List | No | - | Handle type (used for NodeHandled) |
| handleNode | String | No | - | Handle node (used for NodeHandled) |

### Operation Type Details
```json title="Approval Status Change Event Configuration"
{
  "title": "Approval Status Change Event",
  "type": "events.WorkflowType",
  "model": "models.OrderModel", 
  "operate": "Process",
  "func": "inner.handleStatusChange",
  "funcType": "inner"
}
```

```json title="Node Change Event Configuration"
{
  "title": "Node Change Event",
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeChange", 
  "triggerNode": ["node1", "node2"],
  "func": "inner.handleNodeChange",
  "funcType": "inner"
}
```

```json title="Node Handled Event Configuration"
{
  "title": "Node Handled Event", 
  "type": "events.WorkflowType",
  "model": "models.OrderModel",
  "operate": "NodeHandled",
  "handleType": ["agree", "reject"],
  "handleNode": "approvalNode",
  "func": "inner.handleNodeProcessed",
  "funcType": "inner"
}
```

## Methods
### getSender
Get event sender information.

#### Return Value
| Type | Description |
|------|-------------|
| Any | Event sender object |

#### Usage Example
```python title="Get Event Sender"
def handleApprovalEvent(eventOutData):
    event = app.getElement("events.myApprovalEvent")
    sender = event.getSender()
    log.info(f"Event sender: {sender}")
```

### isValid
Validate whether the event meets trigger conditions.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *args | Tuple | Yes | Event parameter tuple |
| **kwargs | Dict | No | Event keyword parameters |

#### Return Value
| Type | Description |
|------|-------------|
| Boolean | True indicates event is valid, False indicates invalid |

#### Usage Example
```python title="Validate Event Validity"
def customEventHandler(eventOutData, *args):
    event = app.getElement("events.myApprovalEvent") 
    if event.isValid(eventOutData, *args):
        # Execute event handling logic
        processEvent(eventOutData)
```

### handleNode
Handle event node, set node information and adjust parameters.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| node | Object | Yes | Event node object |
| *args | Tuple | Yes | Event parameters |
| **kwargs | Dict | No | Keyword parameters |

#### Return Value
| Type | Description |
|------|-------------|
| Tuple | Returns (node, args, kwargs) tuple |

### buildTaskParams
Build task parameters for asynchronous task processing.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *args | Tuple | Yes | Event parameters |
| **kwargs | Dict | No | Keyword parameters |

#### Return Value
| Type | Description |
|------|-------------|
| Dict | Task parameter dictionary containing row, status, modelFullName |

### recoverTaskParams
Recover event parameters from task parameters.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskParams | Dict | Yes | Task parameter dictionary |

#### Return Value
| Type | Description |
|------|-------------|
| Tuple | Returns (args, kwargs) tuple |

## Properties
### operate
Event operation type that defines event trigger conditions and handling methods.

| Value | Description |
|-------|-------------|
| Process | Triggered when approval status changes |
| NodeChange | Triggered when approval node changes |
| NodeHandled | Triggered when approval node processing completes |

### config
Event configuration information containing all configuration parameters defined in e.json.

## Advanced Features
### Multi-Node Trigger Configuration
```json title="Configure Multiple Trigger Nodes"
{
  "title": "Multi-Node Trigger Event",
  "type": "events.WorkflowType", 
  "model": "models.ContractModel",
  "operate": "NodeChange",
  "triggerNode": ["deptApproval", "managerApproval", "directorApproval"],
  "func": "inner.handleMultiNodeChange",
  "funcType": "inner"
}
```

```python title="Multi-Node Event Handling"
def handleMultiNodeChange(eventOutData, triggerNode):
    """
    Handle multi-node change event
    
    Parameters:
        eventOutData: Event data
        triggerNode: Triggered node ID
    """
    if triggerNode == "deptApproval":
        # Department approval node logic
        handleDeptApproval(eventOutData)
    elif triggerNode == "managerApproval": 
        # Manager approval node logic
        handleManagerApproval(eventOutData)
    elif triggerNode == "directorApproval":
        # Director approval node logic
        handleDirectorApproval(eventOutData)
```

### Multi-Handle Type Configuration
```json title="Configure Multiple Handle Types"
{
  "title": "Multi-Handle Type Event",
  "type": "events.WorkflowType",
  "model": "models.LeaveModel", 
  "operate": "NodeHandled",
  "handleType": ["agree", "reject", "transfer"],
  "handleNode": "hrApproval",
  "func": "inner.handleMultipleActions",
  "funcType": "inner"
}
```

```python title="Multi-Handle Type Event Processing"
def handleMultipleActions(eventOutData, handleType, nodeId, nodeTitle):
    """
    Handle multiple handle type events
    
    Parameters:
        eventOutData: Event data
        handleType: Handle type
        nodeId: Node ID
        nodeTitle: Node title
    """
    row = eventOutData.row
    
    if handleType == HandleTypeEnum.agree:
        # Agree handling logic
        processApproval(row, "approved")
    elif handleType == HandleTypeEnum.reject:
        # Reject handling logic  
        processApproval(row, "rejected")
    elif handleType == HandleTypeEnum.transfer:
        # Transfer handling logic
        processTransfer(row, nodeTitle)
```

### Global Function Call Configuration
```json title="Call Global Service Function"
{
  "title": "Global Function Event",
  "type": "events.WorkflowType",
  "model": "models.InvoiceModel",
  "operate": "Process", 
  "func": "services.NotificationSvc.sendApprovalNotification",
  "funcType": "global"
}
```
