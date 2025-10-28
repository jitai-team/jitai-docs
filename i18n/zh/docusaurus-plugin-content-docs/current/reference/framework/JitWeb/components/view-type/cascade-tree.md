---
slug: cascade-tree
description: "级联树 API 参考文档。完整的规格说明、方法和示例。"
---
# 级联树
级联树是用于展示具有层级关系数据的树形结构组件，基于数据模型实现父子节点的级联选择和联动关系。它负责数据的树形展示、节点选择交互和级联操作，支持单选和多选模式，适用于组织架构、分类目录、地区选择等场景。

级联树元素分层结构为Meta（components.Meta） → Type（components.CascadeTree） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建级联树实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.CascadeTreeType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
pages/
├── MyPage/
│   ├── e.json
│   └── scheme.json
```

```json title="页面配置示例"
{
  "fullName": "components.CascadeTree",
  "type": "components.CascadeTree", 
  "name": "CascadeTree1",
  "title": "级联树1",
  "config": {
    "requireElements": [
      {
        "title": "数据模型",
        "type": "models.Meta",
        "name": "models.DeptModel",
        "filter": "",
        "orderBy": ""
      }
    ],
    "nodeTile": "name",
    "childNode": "parentId", 
    "mode": 1,
    "defaultRender": true
  },
  "showTitle": true
}
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| requireElements | Array&lt;Object&gt; | 关联的数据模型配置 | - | 是 |
| nodeTile | string | 节点显示字段名 | - | 是 |
| childNode | string | 子节点关联字段名 | - | 是 |
| mode | number | 选择模式，1为单选，0为多选 | 1 | 否 |
| defaultRender | boolean | 是否使用默认渲染 | true | 否 |

## 变量
### selectedRowList
选中的多行数据变量，类型为 `RowList`，只读。存储用户选中的所有树节点对应的数据记录。

### clickRow
操作的单行数据变量，类型为 `RowData`，只读。存储用户最近点击的树节点对应的数据记录。

### loading
加载状态变量，类型为 `Numeric`，表示组件当前的加载状态。值为1时表示正在加载，0表示加载完成。

## 方法 
### publishEvent
发送组件事件消息。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| name | string | 事件名称 | - | 是 |
| ex | Record&lt;string, any&gt; | 附加数据 | - | 否 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="发送自定义事件"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 发送自定义事件
await cascadeTree.publishEvent('customEvent', { 
  message: '树数据已更新',
  nodeCount: 10 
});
```

### subscribeEvent
订阅组件事件消息。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | Function | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已存在的订阅 | true | 否 |

#### 返回值
string - 返回事件处理器ID

#### 使用示例
```tsx title="订阅组件事件"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 订阅刷新事件
const handlerId = cascadeTree.subscribeEvent('refresh', (data) => {
  console.log('级联树已刷新:', data);
});
```

### unSubscribeEvent
取消订阅事件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| id | string | 事件处理器ID | - | 是 |

#### 返回值
boolean

#### 使用示例
```tsx title="取消事件订阅"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 取消订阅
cascadeTree.unSubscribeEvent(handlerId);
```

### setConfig
设置组件配置。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| next | Object | 新的配置对象 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 返回值
无返回值

#### 使用示例
```tsx title="更新组件配置"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 更新部分配置
cascadeTree.setConfig({
  mode: 0, // 改为多选模式
  nodeTile: 'title'
});

// 完全替换配置
cascadeTree.setConfig({
  requireElements: [/* 新的数据模型配置 */],
  nodeTile: 'name',
  childNode: 'parentId',
  mode: 1
}, true);
```

### refresh
刷新级联树数据，支持传入筛选条件。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| qFilter | QFilter | 筛选条件，用于过滤数据 | - | 否 |

#### 返回值
无返回值

#### 使用示例
```tsx title="刷新级联树"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 无条件刷新
await cascadeTree.refresh();

// 带筛选条件刷新
const filter = Q('status', '=', 'active');
await cascadeTree.refresh(filter);
```

### getRowDataList
获取树形数据列表，支持创建和更新两种模式。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| options | Object | 配置对象 | - | 是 |
| options.filter | Qex &#124; null | 筛选条件 | null | 否 |
| type | 'create' &#124; 'update' | 操作类型 | 'create' | 否 |
| key | string | 更新时的节点key | - | 否 |

#### 返回值
Promise&lt;void&gt;

#### 使用示例
```tsx title="获取数据列表"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 创建模式获取数据
await cascadeTree.getRowDataList({ filter: null });

// 更新模式追加数据
const filter = Q('parentId', '=', '123');
await cascadeTree.getRowDataList({ filter }, 'update', 'nodeKey123');
```

### updateTreeData
更新树形数据结构，用于动态更新树节点。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| data | Record&lt;string, any&gt; | 要更新的数据 | - | 是 |
| type | 'create' &#124; 'update' | 操作类型 | 'create' | 否 |
| key | string | 节点key | - | 否 |

#### 返回值
无返回值

#### 使用示例
```tsx title="更新树形数据"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 更新指定节点的子数据
const newData = [
  { id: '101', name: '新部门1', parentId: '100' },
  { id: '102', name: '新部门2', parentId: '100' }
];
cascadeTree.updateTreeData(newData, 'update', '100');
```

### getPermConfig
获取组件的权限配置信息。

#### 返回值
Record&lt;string, any&gt; &#124; undefined

#### 使用示例
```tsx title="获取权限配置"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

const permConfig = cascadeTree.getPermConfig();
if (permConfig) {
  console.log('组件权限配置:', permConfig);
}
```

### runCode
运行自定义代码字符串。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|--------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
any

#### 使用示例
```tsx title="运行自定义代码"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 执行自定义逻辑
const result = cascadeTree.runCode(`
  return this.selectedRowList.length > 0 ? '已选择节点' : '未选择节点';
`);
```

### destroy
销毁组件实例，清理资源和事件监听。

#### 返回值
无返回值

#### 使用示例
```tsx title="销毁组件"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 销毁组件
cascadeTree.destroy();
```

## 属性
### app
只读属性，类型为App，获取当前应用实例。

### page
只读属性，类型为BasePage，获取当前页面实例。

### name
只读属性，类型为string，获取组件名称。

### title
只读属性，类型为string，获取组件标题。

### config
只读属性，类型为Object，获取组件配置对象。

### type
只读属性，类型为string，获取组件类型标识。

### showTitle
只读属性，类型为boolean，获取是否显示组件标题。

### treeData
只读属性，类型为 `TreeDataNode[]`，获取当前树形数据结构。每个节点包含title、key、isLeaf等属性。

### rowDataList
只读属性，类型为 `Record<string, any>[]`，获取当前组件的原始数据列表。

### primaryKey
只读属性，类型为string，获取数据模型的主键字段名，默认为'id'。

### fieldDefineList
只读属性，类型为 `DataTypeConfig[]`，获取关联数据模型的字段定义列表。

### allFieldDict
只读属性，类型为 `Record<string, DataTypeConfig>`，获取关联数据模型的字段字典，以字段名为key。

## 事件
### onNodeClick
节点点击事件，当用户点击树节点时触发。

#### 参数详解
事件回调函数接收 `clickRow` 变量作为参数，包含被点击节点的完整数据。

#### 使用示例
```tsx title="监听节点点击事件"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 订阅节点点击事件
cascadeTree.subscribeEvent('onNodeClick', (data) => {
  console.log('点击的节点数据:', data);
  const nodeId = data.id.value;
  const nodeName = data.name.value;
  console.log(`点击了节点: ${nodeName} (ID: ${nodeId})`);
});
```

### onSelectNode
节点选择事件，当用户选择树节点时触发（多选模式下）。

#### 参数详解
事件回调函数接收 `selectedRowList` 变量作为参数，包含所有选中节点的数据列表。

#### 使用示例
```tsx title="监听节点选择事件"
const cascadeTree = app.getElement('components.CascadeTree.CascadeTree1');

// 订阅节点选择事件
cascadeTree.subscribeEvent('onSelectNode', (data) => {
  console.log('选中的节点列表:', data);
  const selectedCount = data.length;
  console.log(`已选择 ${selectedCount} 个节点`);
  
  // 遍历选中的节点
  data.forEach((node, index) => {
    console.log(`选中节点${index + 1}: ${node.name.value}`);
  });
});
```

## 高级特性
### 级联数据加载
级联树支持按需加载子节点数据，通过 `childNode` 字段建立父子关系。初始加载时只显示根节点（childNode字段为空的记录），点击展开时动态加载子节点。

```tsx title="配置级联加载"
{
  "config": {
    "requireElements": [
      {
        "name": "models.DeptModel",
        "filter": "",
        "orderBy": "sort ASC"
      }
    ],
    "nodeTile": "name",
    "childNode": "parentId",
    "mode": 1
  }
}
```

### 权限控制集成
级联树自动集成权限配置，支持基于角色的数据访问控制。

```tsx title="权限配置示例"
// 组件会自动应用权限过滤
const permConfig = cascadeTree.getPermConfig();
// 权限过滤会自动合并到查询条件中
```

### 自定义筛选和排序
支持通过requireElements配置数据的筛选条件和排序规则。

```tsx title="配置筛选和排序"
{
  "requireElements": [
    {
      "name": "models.DeptModel",
      "filter": "Q(status='active')",
      "orderBy": "sort ASC, name ASC"
    }
  ]
}
``` 