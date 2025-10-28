---
slug: regular-approval
description: "常规审批 API 参考文档。完整的规格说明、方法和示例。"
---
# 常规审批
常规审批是企业工作流管理的核心元素，基于JitWorkflow审批引擎实现完整的审批流程处理能力。它负责审批节点配置、审批人分配、条件分支和并行处理，支持多种审批模式和复杂审批策略，满足不同业务场景的审批需求。

常规审批元素分层结构为Meta（workflows.Meta） → Type（workflows.NormalType） → 实例，开发者可通过JitAi的可视化开发工具快捷地创建常规审批实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的workflows.NormalType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
MyApproval/                    # 审批实例名称
├── e.json                     # 元素定义文件
├── config.json               # 审批流程配置文件
├── __init__.py               # 包初始化文件
└── pages/                    # 可选：自定义审批页面
    └── NodePage/
        ├── e.json
        ├── index.ts
        ├── page.style.ts
        ├── page.ts
        ├── PageRender.tsx
        └── scheme.json
```

#### e.json文件
```json title="e.json配置示例"
{
  "type": "workflows.NormalType",
  "icon": "IDEshenpi",
  "path": "workflows",
  "title": "请假审批",
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

#### 业务配置文件
```json title="config.json审批流程配置"
{
  "nodeList": [
    {
      "name": "StartNode",
      "title": "发起节点",
      "type": 0,
      "zIndex": 1,
      "position": {"x": 0, "y": 0}
    },
    {
      "name": "ApproveNode1",
      "title": "部门主管审批",
      "type": 1,
      "zIndex": 1,
      "position": {"x": 0, "y": 200}
    },
    {
      "name": "EndNode",
      "title": "结束节点",
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
      "nodeName": "发起节点",
      "nodeType": 0,
      "digest": ["applicant", "leaveType", "startDate", "endDate"],
      "handleList": [
        {"buttonName": "提交", "checked": 1, "handleType": 0},
        {"buttonName": "撤销流程", "checked": 0, "handleType": 16}
      ],
      "fieldAccessControl": {
        "read": ["applicant", "leaveType", "startDate", "endDate", "reason"],
        "edit": ["applicant", "leaveType", "startDate", "endDate", "reason"]
      }
    },
    "ApproveNode1": {
      "nodeName": "部门主管审批",
      "nodeType": 1,
      "approver": {
        "approveType": 1,
        "userIdList": ["${directLeader}"]
      },
      "handleList": [
        {"buttonName": "同意", "checked": 1, "handleType": 2},
        {"buttonName": "拒绝", "checked": 1, "handleType": 3}
      ]
    },
    "EndNode": {
      "nodeName": "结束节点",
      "nodeType": 7
    }
  },
  "modelName": "models.LeaveModel",
  "statusMaps": {}
}
```

#### 调用示例
```python title="获取并操作审批实例"
# 获取审批实例
approval = app.getElement("workflows.MyApproval")

# 发起审批
result = approval.doHandle(
    handleType=0,                    # 提交操作
    nodeId="StartNode",              # 发起节点
    row=leave_data,                  # 审批数据
    valueDict={"comment": "紧急请假"}  # 审批意见
)

# 获取下一个审批节点
next_nodes = approval.getNextNodes("StartNode")

# 获取审批节点配置
node_config = approval.getNode("ApproveNode1")
```

## 元素配置
### e.json配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| type | Stext | str | 是 | 固定值：workflows.NormalType |
| title | Stext | str | 是 | 审批流程标题 |
| dataModel | Stext | str | 是 | 关联的数据模型fullName |
| icon | Stext | str | 否 | 审批图标标识 |
| platformSwitch | Numeric | int | 否 | 平台开关，0关闭1开启 |
| commentSwitch | Numeric | int | 否 | 评论开关，0关闭1开启 |
| allowPrint | Numeric | int | 否 | 打印权限，0不允许1允许 |
| syncStatus | JitDict | bool | 否 | 同步状态设置 |
| allowShare | Numeric | int | 否 | 分享权限，0不允许1允许 |
| showPredict | Numeric | int | 否 | 预测权限，0不显示1显示 |

### 业务配置文件配置
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nodeList | JitList | list | 是 | 审批节点列表配置 |
| linkList | JitList | list | 是 | 节点连接关系配置 |
| nodeConfig | JitDict | dict | 是 | 各节点详细配置 |
| modelName | Stext | str | 是 | 数据模型名称 |
| statusMaps | JitDict | dict | 否 | 状态映射配置 |

## 方法 
### doHandle
执行审批操作，处理各种审批动作。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| handleType | Numeric | int | 是 | 操作类型：0提交、2同意、3拒绝等 |
| nodeId | Stext | str | 是 | 目标节点ID |
| row | RowData | object | 是 | 审批数据行对象 |
| valueDict | JitDict | dict | 否 | 审批操作的附加参数 |

#### 返回值
无返回值，直接执行审批操作。

#### 使用示例
```python title="执行审批操作"
# 发起审批
approval.doHandle(
    handleType=0,
    nodeId="StartNode", 
    row=data_row,
    valueDict={"comment": "申请理由"}
)

# 同意审批
approval.doHandle(
    handleType=2,
    nodeId="ApproveNode1",
    row=data_row,
    valueDict={"approveComment": "同意申请"}
)

# 拒绝审批
approval.doHandle(
    handleType=3,
    nodeId="ApproveNode1", 
    row=data_row,
    valueDict={"rejectReason": "材料不全"}
)
```

### getNode
获取指定审批节点的配置对象。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nodeId | Stext | str | 是 | 节点ID标识 |

#### 返回值
返回节点配置对象，包含节点的完整配置信息。

#### 使用示例
```python title="获取节点配置"
# 获取审批节点
node = approval.getNode("ApproveNode1")

# 查看节点类型
node_type = node.nodeType

# 获取审批人配置
approver_config = node.approver if hasattr(node, 'approver') else None
```

### getNextNodes
获取指定节点的下级流转节点列表。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nodeId | Stext | str | 是 | 当前节点ID |

#### 返回值
返回下级节点对象列表，按流转顺序排列。

#### 使用示例
```python title="获取下级节点"
# 获取发起节点的下级节点
next_nodes = approval.getNextNodes("StartNode")

# 遍历下级节点
for node in next_nodes:
    print(f"下级节点：{node.name} - {node.nodeType}")

# 检查是否有下级节点
if next_nodes:
    first_next = next_nodes[0]
```

### getStartNode
获取审批流程的起始节点。

#### 返回值
返回起始节点对象。

#### 使用示例
```python title="获取起始节点"
# 获取流程起始节点
start_node = approval.getStartNode()

# 查看起始节点配置
start_config = start_node.nodeConfigDict
```

### getStartNodeId
获取审批流程的起始节点ID。

#### 返回值
返回起始节点的ID字符串。

#### 使用示例
```python title="获取起始节点ID"
# 获取起始节点ID
start_id = approval.getStartNodeId()

# 基于起始节点ID获取节点对象
start_node = approval.getNode(start_id)
```

### getApproveNodeIdList
获取所有审批节点的ID列表。

#### 返回值
返回审批节点ID的列表。

#### 使用示例
```python title="获取审批节点列表"
# 获取所有审批节点ID
approve_ids = approval.getApproveNodeIdList()

# 遍历审批节点
for node_id in approve_ids:
    node = approval.getNode(node_id)
    print(f"审批节点：{node_id} - {node.name}")
```

### getPrevNodes
获取指定节点的前置节点列表。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| nodeId | Stext | str | 是 | 目标节点ID |

#### 返回值
返回前置节点对象列表。

#### 使用示例
```python title="获取前置节点"
# 获取指定节点的前置节点
prev_nodes = approval.getPrevNodes("EndNode")

# 检查前置节点
for node in prev_nodes:
    print(f"前置节点：{node.name}")
```

### clear
重置审批实例状态，用于同一请求内多次发起审批。

#### 使用示例
```python title="重置审批状态"
# 在多次操作间重置状态
approval.clear()

# 重置后可以进行新的审批操作
approval.doHandle(handleType=0, nodeId="StartNode", row=new_data)
```

## 属性
### workflowName
当前审批流程的名称，只读属性。

### workflowTitle
当前审批流程的显示标题，只读属性。

### platformSwitch
平台开关状态，只读属性。

### linkList
审批流程的连接关系配置，只读属性。

### tableId
关联的数据模型标识，只读属性。

## 高级特性
### 复杂审批流程配置
对于包含条件分支、并行审批、子流程等复杂场景，可以在config.json中配置更复杂的节点类型和连接关系：

```json title="复杂流程配置示例"
{
  "nodeList": [
    {"name": "StartNode", "title": "发起", "type": 0},
    {"name": "BranchNode", "title": "条件分支", "type": 4},
    {"name": "ParallelStart", "title": "并行开始", "type": 5},
    {"name": "Approve1", "title": "审批1", "type": 1},
    {"name": "Approve2", "title": "审批2", "type": 1},
    {"name": "ParallelEnd", "title": "并行结束", "type": 6},
    {"name": "EndNode", "title": "结束", "type": 7}
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

### 自定义审批页面
通过在pages目录下创建自定义页面组件，可以实现个性化的审批界面：

```typescript title="自定义审批页面示例"
// pages/NodePage/PageRender.tsx
import React from 'react';

export const ApprovalPageRender = (props) => {
  const { nodeConfig, formData, onSubmit } = props;
  
  return (
    <div className="custom-approval-page">
      <h2>{nodeConfig.title}</h2>
      {/* 自定义表单组件 */}
      <CustomForm data={formData} onSubmit={onSubmit} />
    </div>
  );
};
``` 