---
slug: kanban
---
# 看板
看板是一种可视化的数据展示组件，基于分组字段将数据按列展示，支持卡片拖拽、自定义按钮和实时数据交互。它负责数据分组展示、卡片操作交互和状态流转管理，提供直观的项目管理和工作流程可视化能力。

看板元素分层结构为Meta（components.Meta） → Type（components.Board） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建看板实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.BoardType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```json title="看板组件基础配置"
{
  "name": "Board1",
  "title": "项目看板",
  "type": "components.Board",
  "config": {
    "requireElements": [
      {
        "name": "models.ProjectModel",
        "title": "项目数据模型",
        "type": "models.Meta",
        "filter": "",
        "orderBy": []
      }
    ],
    "titleField": "title",
    "groupField": "status",
    "showFieldList": ["description", "assignee"],
    "abstractField": "summary",
    "image": {
      "fieldId": "avatar",
      "position": "top",
      "showType": "circle"
    },
    "dragCard": true,
    "showFieldName": true,
    "showAddBottomBtn": true,
    "defaultRender": true,
    "leftBtnList": [],
    "rightBtnList": [],
    "menuBtnList": [],
    "platform": "PC"
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| requireElements | Array | [] | 数据源配置，指定模型和筛选条件 |
| titleField | String | "" | 卡片标题字段 |
| groupField | String | "" | 分组字段，支持下拉、单选、成员、部门、文本类型 |
| showFieldList | Array | [] | 卡片中显示的字段列表 |
| abstractField | String | "" | 摘要字段，显示在卡片底部 |
| image | Object | {} | 图片配置，包含字段ID、位置和显示类型 |
| dragCard | Boolean | false | 是否启用卡片拖拽功能 |
| showFieldName | Boolean | true | 是否显示字段名称 |
| showAddBottomBtn | Boolean | false | 是否显示底部添加按钮 |
| defaultRender | Boolean | true | 是否使用默认渲染 |
| leftBtnList | Array | [] | 左侧按钮配置列表 |
| rightBtnList | Array | [] | 右侧按钮配置列表 |
| menuBtnList | Array | [] | 菜单按钮配置列表 |
| platform | String | "PC" | 平台类型，PC 或 Mobile |
| fieldAliasList | Array | [] | 字段别名配置列表 |

## 变量
### displayRowList
**类型**: `RowList`  
**只读**: 是  
**泛型**: 关联模型的fullName  

展示的多行数据变量，包含当前看板中所有可见的数据记录。

### activeRow
**类型**: `RowData`  
**只读**: 是  
**泛型**: 关联模型的fullName  

当前操作的单行数据变量，在卡片点击、拖拽等交互时更新。

### activeGroup
**类型**: 根据分组字段类型确定  
**只读**: 是  

当前操作的分组变量，表示用户当前交互的分组值。

### filter
**类型**: `QFilter`  
**只读**: 是  
**泛型**: 关联模型的fullName  

筛选条件变量，用于控制看板显示的数据范围。

## 方法 
### call
刷新看板数据的异步方法。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| qFilter | QFilter | 否 | 筛选条件，用于过滤显示的数据 |

#### 返回值
无返回值，执行后更新组件数据。

#### 使用示例
```javascript title="刷新看板数据"
// 无条件刷新
await boardComponent.call();

// 带筛选条件刷新
await boardComponent.call("Q(status='active')");
```

### updateConfig
更新组件配置并刷新显示。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| config | ComponentConfig | 是 | 新的组件配置对象 |

#### 返回值
无返回值，执行后更新配置并刷新组件。

#### 使用示例
```javascript title="更新组件配置"
const newConfig = {
  config: {
    groupField: "newStatus",
    dragCard: false
  }
};
boardComponent.updateConfig(newConfig);
```

### setConfig
设置组件配置对象（继承方法）。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| next | Object | 是 | 新的配置对象 |
| clean | Boolean | 否 | 是否完全替换配置，默认合并 |

#### 返回值
无返回值，更新内部配置状态。

### publishEvent
发布组件事件（继承方法）。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 事件名称 |
| ex | Object | 否 | 额外的事件数据 |

#### 返回值
返回Promise，事件发布完成后resolve。

### subscribeEvent
订阅组件事件（继承方法）。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | String | 是 | 事件名称 |
| evtCb | Function | 是 | 事件回调函数 |
| unSubscribeExist | Boolean | 否 | 是否先取消已存在的订阅，默认true |

#### 返回值
返回订阅ID，用于后续取消订阅。

### getAllGroupData
获取所有分组的数据信息。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| filter | Stext | 是 | 查询字符串，支持Q表达式 |
| orderList | JitList | 是 | 排序列表 |
| size | Numeric | 是 | 每页数量 |

#### 返回值
**类型**: `JitDict`  
包含所有分组信息的字典对象。

#### 使用示例
```javascript title="获取所有分组数据"
const result = await boardComponent.getAllGroupData(
  "Q(active=true)", 
  [], 
  50
);
```

### getGroupData
获取指定分组的数据信息。

#### 参数详解
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| filter | Stext | 是 | 查询字符串，支持Q表达式 |
| orderList | JitList | 是 | 排序列表 |
| page | Numeric | 是 | 页数 |
| size | Numeric | 是 | 每页数量 |

#### 返回值
**类型**: `JitDict`  
包含指定分组信息的字典对象。

#### 使用示例
```javascript title="获取分组数据"
const result = await boardComponent.getGroupData(
  "Q(groupKey='todo')", 
  [], 
  1, 
  20
);
```

## 属性
### 基础属性（继承）
### name
**类型**: `String`  

组件实例名称，在页面配置中定义。

### title
**类型**: `String`  

组件显示标题。

### type
**类型**: `String`  

组件类型标识，值为"components.Board"。

### config
**类型**: `Object`  

组件配置对象，包含所有配置参数。

### showTitle
**类型**: `Boolean`  

是否显示组件标题。

### app
**类型**: `App`  

绑定的应用实例，用于访问应用级功能。

### page
**类型**: `BasePage`  

绑定的页面实例，用于访问页面级功能。

### 看板专用属性
### pageSize
**类型**: `Number`  
**默认值**: 20  

每页显示的数据条数。

### loading
**类型**: `Numeric`  
**默认值**: 0  

加载状态标识，0表示未加载，1表示加载中。

## 事件
### clickCard
**触发时机**: 卡片点击后  
**数据变量**: `activeRow`  

用户点击看板卡片时触发，activeRow包含被点击卡片的数据。

### addBottomBtnClick
**触发时机**: 底部按钮点击后  
**数据变量**: `activeGroup`  
**前置条件**: showAddBottomBtn为true  

用户点击分组底部的添加按钮时触发，activeGroup包含当前分组信息。

### afterCardDrag
**触发时机**: 拖拽卡片后  
**数据变量**: `activeRow`  
**前置条件**: dragCard为true且为PC平台的标准模型  

用户拖拽卡片到新分组后触发，activeRow包含被拖拽卡片的数据。

### 动态按钮事件
根据leftBtnList、rightBtnList、menuBtnList配置动态生成：

- **leftBtnList按钮事件**: 命名规则为click + 按钮ID（驼峰格式），数据变量为displayRowList
- **rightBtnList按钮事件**: 命名规则为click + 按钮ID（驼峰格式），数据变量为displayRowList  
- **menuBtnList按钮事件**: 命名规则为click + 按钮ID（驼峰格式），数据变量为activeRow