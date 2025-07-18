# JitAi 知识图谱

JitAi技术体系的交互式知识图谱可视化工具。

## 目录结构

```
knowledge-graph/
├── index.html              # 主入口文件
├── assets/                 # 资源文件夹
│   ├── js/                # JavaScript文件
│   │   ├── config.js      # 图谱配置文件（主题、布局等）
│   │   ├── core.js        # 核心工具类（错误处理、状态管理等）
│   │   └── main.js        # 主要业务逻辑和交互代码
│   └── data/              # 数据文件
│       └── graph-data.json # 知识图谱数据
└── README.md              # 说明文档
```

## 文件说明

### 核心文件
- **index.html** (26KB) - 主页面，包含UI结构和样式
- **main.js** (76KB) - 主要功能实现，包含网络初始化、事件处理、UI交互等
- **core.js** (13KB) - 基础工具类，提供错误处理、状态管理、资源管理等
- **config.js** (3KB) - 配置管理，包含主题、布局参数等

### 数据文件
- **graph-data.json** (42KB) - 图谱数据，包含节点、边和详细信息

## 架构特点

1. **模块化设计**: 配置、核心工具、业务逻辑分离
2. **清晰的依赖关系**: config → core → main 的层次结构
3. **资源分类**: 代码和数据分别存放
4. **标准化命名**: 遵循前端项目最佳实践

## 部署访问

直接访问 `static/knowledge-graph/index.html` 即可运行知识图谱。

## 开发指引

- 配置修改：编辑 `assets/js/config.js`
- 功能扩展：主要在 `assets/js/main.js` 中进行
- 数据更新：修改 `assets/data/graph-data.json`
- 样式调整：修改 `index.html` 中的CSS 