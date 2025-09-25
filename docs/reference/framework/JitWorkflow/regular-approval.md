---
slug: regular-approval
---
# Regular Approval
Regular Approval is the core element of enterprise workflow management, implementing complete approval process handling capabilities based on the JitWorkflow approval engine. It is responsible for approval node configuration, approver assignment, conditional branching, and parallel processing, supporting various approval modes and complex approval strategies to meet approval requirements in different business scenarios.

The Regular Approval element hierarchy is Meta (workflows.Meta) → Type (workflows.NormalType) → Instance. Developers can quickly create Regular Approval instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official workflows.NormalType element provided by JitAI in their own App to implement their own encapsulation.

## Quick Start
### Create Instance Element
#### Directory Structure
```text title="Recommended Directory Structure"
MyApproval/                    # Approval instance name
├── e.json                     # Element definition file
├── config.json               # Approval process configuration file
├── __init__.py               # Package initialization file
└── pages/                    # Optional: Custom approval pages
    └── NodePage/
        ├── e.json
        ├── index.ts
        ├── page.style.ts
        ├── page.ts
        ├── PageRender.tsx
        └── scheme.json
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "workflows.NormalType",
  "icon": "IDEshenpi",
  "path": "workflows",
  "title": "Leave Approval",
  "dataModel": "models.LeaveModel",
  "frontBundleEntry": "./config.json",
  "outputName": "index",
  "backendBundleEntry": ".",
  "platformSwitch": 0,
  "syncStatus": false,
  "commentSwitch": 1,
  "allowPrint": 0
}
```

#### Business Configuration File
```json title="config.json Approval Process Configuration"
{
  "nodeList": [
    {
      "name": "StartNode",
      "title": "Start Node",
      "type": 0,
      "zIndex": 1,
      "position": {"x": 0, "y": 0}
    },
    {
      "name": "ApproveNode1",
      "title": "Department Manager Approval",
      "type": 1,
      "zIndex": 1,
      "position": {"x": 0, "y": 200}
    },
    {
      "name": "EndNode",
      "title": "End Node",
      "type": 7,
      "zIndex": 1,
      "position": {"x": 0, "y": 400}
    }
  ],
  "linkList": [
    {
      "linkId": "1001",
      "from": "StartNode",
      "fromPort": "bottom-StartNode",
      "to": "ApproveNode1",
      "toPort": "top-ApproveNode1"
    },
    {
      "linkId": "1002",
      "from": "ApproveNode1",
      "fromPort": "bottom-ApproveNode1",
      "to": "EndNode",
      "toPort": "top-EndNode"
    }
  ],
  "nodeConfig": {
    "StartNode": {
      "nodeName": "Start Node",
      "nodeType": 0,
      "digest": ["applicant", "leaveType", "startDate", "endDate"],
      "handleList": [
        {"buttonName": "Submit", "checked": 1, "handleType": 0},
        {"buttonName": "Cancel Process", "checked": 0, "handleType": 16}
      ],
      "fieldAccessControl": {
        "read": ["applicant", "leaveType", "startDate", "endDate", "reason"],
        "edit": ["applicant", "leaveType", "startDate", "endDate", "reason"]
      }
    },
    "ApproveNode1": {
      "nodeName": "Department Manager Approval",
      "nodeType": 1,
      "approver": {
        "approveType": 1,
        "userIdList": ["${directLeader}"]
      },
      "handleList": [
        {"buttonName": "Approve", "checked": 1, "handleType": 2},
        {"buttonName": "Reject", "checked": 1, "handleType": 3}
      ]
    },
    "EndNode": {
      "nodeName": "End Node",
      "nodeType": 7
    }
  },
  "modelName": "models.LeaveModel",
  "statusMaps": {}
}
```

#### Usage Example
```python title="Get and Operate Approval Instance"
# Get approval instance
approval = app.getElement("workflows.MyApproval")

# Initiate approval
result = approval.doHandle(
    handleType=0,                    # Submit operation
    nodeId="StartNode",              # Start node
    row=leave_data,                  # Approval data
    valueDict={"comment": "Emergency leave"}  # Approval comment
)

# Get next approval node
next_nodes = approval.getNextNodes("StartNode")

# Get approval node configuration
node_config = approval.getNode("ApproveNode1")
```

## Element Configuration
### e.json Configuration
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| type | Stext | str | Yes | Fixed value: workflows.NormalType |
| title | Stext | str | Yes | Approval process title |
| dataModel | Stext | str | Yes | Associated data model fullName |
| icon | Stext | str | No | Approval icon identifier |
| platformSwitch | Numeric | int | No | Platform switch, 0 off 1 on |
| commentSwitch | Numeric | int | No | Comment switch, 0 off 1 on |
| allowPrint | Numeric | int | No | Print permission, 0 not allowed 1 allowed |
| syncStatus | JitDict | bool | No | Sync status setting |
| allowShare | Numeric | int | No | Share permission, 0 not allowed 1 allowed |
| showPredict | Numeric | int | No | Prediction permission, 0 not shown 1 shown |

### Business Configuration File Configuration
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| nodeList | JitList | list | Yes | Approval node list configuration |
| linkList | JitList | list | Yes | Node connection relationship configuration |
| nodeConfig | JitDict | dict | Yes | Detailed configuration for each node |
| modelName | Stext | str | Yes | Data model name |
| statusMaps | JitDict | dict | No | Status mapping configuration |

## Methods
### doHandle
Execute approval operations, handling various approval actions.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| handleType | Numeric | int | Yes | Operation type: 0 submit, 2 approve, 3 reject, etc. |
| nodeId | Stext | str | Yes | Target node ID |
| row | RowData | object | Yes | Approval data row object |
| valueDict | JitDict | dict | No | Additional parameters for approval operation |

#### Return Value
No return value, directly executes approval operation.

#### Usage Example
```python title="Execute Approval Operations"
# Initiate approval
approval.doHandle(
    handleType=0,
    nodeId="StartNode", 
    row=data_row,
    valueDict={"comment": "Application reason"}
)

# Approve
approval.doHandle(
    handleType=2,
    nodeId="ApproveNode1",
    row=data_row,
    valueDict={"approveComment": "Approve application"}
)

# Reject
approval.doHandle(
    handleType=3,
    nodeId="ApproveNode1", 
    row=data_row,
    valueDict={"rejectReason": "Incomplete materials"}
)
```

### getNode
Get the configuration object of the specified approval node.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| nodeId | Stext | str | Yes | Node ID identifier |

#### Return Value
Returns node configuration object containing complete node configuration information.

#### Usage Example
```python title="Get Node Configuration"
# Get approval node
node = approval.getNode("ApproveNode1")

# Check node type
node_type = node.nodeType

# Get approver configuration
approver_config = node.approver if hasattr(node, 'approver') else None
```

### getNextNodes
Get the list of downstream flow nodes for the specified node.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| nodeId | Stext | str | Yes | Current node ID |

#### Return Value
Returns list of downstream node objects, arranged in flow order.

#### Usage Example
```python title="Get Downstream Nodes"
# Get downstream nodes of start node
next_nodes = approval.getNextNodes("StartNode")

# Iterate through downstream nodes
for node in next_nodes:
    print(f"Downstream node: {node.name} - {node.nodeType}")

# Check if there are downstream nodes
if next_nodes:
    first_next = next_nodes[0]
```

### getStartNode
Get the start node of the approval process.

#### Return Value
Returns start node object.

#### Usage Example
```python title="Get Start Node"
# Get process start node
start_node = approval.getStartNode()

# View start node configuration
start_config = start_node.nodeConfigDict
```

### getStartNodeId
Get the start node ID of the approval process.

#### Return Value
Returns start node ID string.

#### Usage Example
```python title="Get Start Node ID"
# Get start node ID
start_id = approval.getStartNodeId()

# Get node object based on start node ID
start_node = approval.getNode(start_id)
```

### getApproveNodeIdList
Get the ID list of all approval nodes.

#### Return Value
Returns list of approval node IDs.

#### Usage Example
```python title="Get Approval Node List"
# Get all approval node IDs
approve_ids = approval.getApproveNodeIdList()

# Iterate through approval nodes
for node_id in approve_ids:
    node = approval.getNode(node_id)
    print(f"Approval node: {node_id} - {node.name}")
```

### getPrevNodes
Get the list of predecessor nodes for the specified node.

#### Parameters
| Parameter | Type | Native Type | Required | Description |
|-----------|------|-------------|----------|-------------|
| nodeId | Stext | str | Yes | Target node ID |

#### Return Value
Returns list of predecessor node objects.

#### Usage Example
```python title="Get Predecessor Nodes"
# Get predecessor nodes of specified node
prev_nodes = approval.getPrevNodes("EndNode")

# Check predecessor nodes
for node in prev_nodes:
    print(f"Predecessor node: {node.name}")
```

### clear
Reset approval instance state for multiple approval initiations within the same request.

#### Usage Example
```python title="Reset Approval State"
# Reset state between multiple operations
approval.clear()

# Can perform new approval operations after reset
approval.doHandle(handleType=0, nodeId="StartNode", row=new_data)
```

## Properties
### workflowName
Name of the current approval process, read-only property.

### workflowTitle
Display title of the current approval process, read-only property.

### platformSwitch
Platform switch state, read-only property.

### linkList
Connection relationship configuration of the approval process, read-only property.

### tableId
Associated data model identifier, read-only property.

## Advanced Features
### Complex Approval Process Configuration
For complex scenarios including conditional branching, parallel approval, and sub-processes, more complex node types and connection relationships can be configured in config.json:

```json title="Complex Process Configuration Example"
{
  "nodeList": [
    {"name": "StartNode", "title": "Start", "type": 0},
    {"name": "BranchNode", "title": "Conditional Branch", "type": 4},
    {"name": "ParallelStart", "title": "Parallel Start", "type": 5},
    {"name": "Approve1", "title": "Approval 1", "type": 1},
    {"name": "Approve2", "title": "Approval 2", "type": 1},
    {"name": "ParallelEnd", "title": "Parallel End", "type": 6},
    {"name": "EndNode", "title": "End", "type": 7}
  ],
  "nodeConfig": {
    "BranchNode": {
      "nodeType": 4,
      "branchRule": {
        "conditions": [
          {"field": "amount", "operator": ">", "value": 10000, "target": "ParallelStart"},
          {"field": "amount", "operator": "<=", "value": 10000, "target": "EndNode"}
        ]
      }
    },
    "ParallelStart": {
      "nodeType": 5,
      "parallelConfig": {
        "targetNodes": ["Approve1", "Approve2"],
        "mergeRule": "all"
      }
    }
  }
}
```

### Custom Approval Pages
By creating custom page components in the pages directory, personalized approval interfaces can be implemented:

```typescript title="Custom Approval Page Example"
// pages/NodePage/PageRender.tsx
import React from 'react';

export const ApprovalPageRender = (props) => {
  const { nodeConfig, formData, onSubmit } = props;
  
  return (
    <div className="custom-approval-page">
      <h2>{nodeConfig.title}</h2>
      {/* Custom form component */}
      <CustomForm data={formData} onSubmit={onSubmit} />
    </div>
  );
};
``` 