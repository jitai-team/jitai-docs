---
slug: blank-portal
description: "空白门户 API 参考文档。完整的规格说明、方法和示例。"
---
# 空白门户
空白门户是最小化的门户实现，提供基础的页面容器和路由框架。它不包含内置导航体系，完全由开发者自定义界面结构，适用于高度定制化的应用界面和特殊展示需求。空白门户仅支持前端实现，通过自定义渲染逻辑实现纯净的门户基础。

空白门户元素分层结构为Meta（shells.Meta） → Type（shells.BlankType） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建空白门户实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的shells.BlankType元素，以实现自己的封装。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
shells/
└── MyBlankShell/
    ├── e.json
    └── feature.json
```

#### e.json文件
```json title="基础配置"
{
  "type": "shells.BlankType",
  "title": "我的空白门户",
  "default": false,
  "frontBundleEntry": "./feature.json"
}
```

#### feature.json文件
```json title="菜单配置"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "仪表板",
      "page": "pages.Dashboard"
    },
    {
      "name": "settings", 
      "title": "设置",
      "page": "pages.Settings"
    }
  ]
}
```

#### 调用示例
```typescript title="获取门户实例"
import { getRuntimeApp } from 'jit';

// 获取门户元素
const app = getRuntimeApp();
const shell = await app.getElement("shells.MyBlankShell");

// 访问门户属性
console.log(shell.title);  // "我的空白门户"
console.log(shell.routePath);  // "/MyBlankShell"
console.log(shell.menuTree);  // 菜单列表

// 获取可用菜单
const availableMenus = shell.getAvailableMenu();
console.log(availableMenus);  // 过滤后的菜单列表
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| type | string | string | 是 | 固定值：`shells.BlankType` |
| title | string | string | 是 | 门户标题 |
| default | boolean | boolean | 否 | 是否为使用者门户，默认false |
| frontBundleEntry | string | string | 是 | 前端配置入口，通常为`./feature.json` |
| hideInRole | boolean | boolean | 否 | 是否在角色中隐藏，默认false |
| status | number | number | 否 | 门户状态，0表示正常 |

### feature.json配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menus | array | ShellMenu[] | 是 | 菜单配置数组 |
| aiConfig | object | object | 否 | AI助理配置 |

#### 菜单项配置
| 配置项 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| name | string | string | 是 | 菜单唯一标识 |
| title | string | string | 是 | 菜单显示名称 |
| page | string | string | 否 | PC端页面fullName |
| mobilePage | string | string | 否 | 移动端页面fullName |
| icon | string | string | 否 | 菜单图标 |
| hide | boolean | boolean | 否 | 是否隐藏菜单 |
| children | array | ShellMenu[] | 否 | 子菜单配置 |
| nodeType | string | string | 否 | 节点类型，可选值：group |

## 方法 
### getAvailableMenu
获取过滤后的可用菜单列表，会过滤掉无权限、隐藏、无页面或页面已删除的菜单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menuTree | array | ShellMenu[] | 否 | 要过滤的菜单树，默认使用当前门户的菜单 |

#### 返回值
返回过滤后的菜单列表，类型为ShellMenu[]。

#### 使用示例
```typescript title="获取可用菜单"
// 获取默认可用菜单
const availableMenus = shell.getAvailableMenu();

// 获取指定菜单树的可用菜单
const customMenus = [
    {name: "page1", title: "页面1", page: "pages.Page1"},
    {name: "page2", title: "页面2", page: "pages.Page2", hide: true}
];
const filteredMenus = shell.getAvailableMenu(customMenus);
```

### getPermMenu
获取当前用户有权限访问的菜单列表。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menuTree | array | ShellMenu[] | 否 | 要检查权限的菜单树，默认使用当前门户的菜单 |

#### 返回值
返回有权限的菜单列表，类型为ShellMenu[]。

#### 使用示例
```typescript title="获取权限菜单"
// 获取当前用户有权限的菜单
const permMenus = shell.getPermMenu();

// 检查指定菜单的权限
const customMenus = [
    {name: "admin", title: "管理页面", page: "pages.Admin"},
    {name: "user", title: "用户页面", page: "pages.User"}
];
const allowedMenus = shell.getPermMenu(customMenus);
```

### flatFeatureMenuItem
将层级菜单结构平铺为一维数组。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menus | array | ShellMenu[] | 否 | 要平铺的菜单树，默认使用当前门户的菜单 |

#### 返回值
返回平铺后的菜单列表，类型为ShellMenu[]。

#### 使用示例
```typescript title="平铺菜单结构"
// 平铺默认菜单
const flatMenus = shell.flatFeatureMenuItem();

// 平铺指定菜单
const nestedMenus = [
    {
        name: "group1",
        title: "分组1",
        nodeType: "group",
        children: [
            {name: "page1", title: "页面1", page: "pages.Page1"},
            {name: "page2", title: "页面2", page: "pages.Page2"}
        ]
    }
];
const flatResult = shell.flatFeatureMenuItem(nestedMenus);
```

### mergeMenus
合并多个菜单列表，前面的菜单会覆盖后面同名的菜单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menusLists | array | ShellMenu[][] | 是 | 要合并的菜单列表数组 |

#### 返回值
返回合并后的菜单列表，类型为ShellMenu[]。

#### 使用示例
```typescript title="合并菜单列表"
const menuList1 = [
    {name: "home", title: "首页", page: "pages.Home"}
];
const menuList2 = [
    {name: "about", title: "关于", page: "pages.About"}
];
const menuList3 = [
    {name: "home", title: "主页", page: "pages.NewHome"}  // 会覆盖第一个
];

const mergedMenus = shell.mergeMenus([menuList1, menuList2, menuList3]);
```

### setBackUrl
设置门户的返回URL。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| backUrl | string | string | 是 | 返回URL地址 |

#### 返回值
无返回值（void）。

#### 使用示例
```typescript title="设置返回URL"
// 设置返回到主页
shell.setBackUrl("/home");

// 设置返回到上级页面
shell.setBackUrl("/parent");
```

### setExtendsFeature
设置继承的菜单特性配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| feature | array | ShellFeature[] | 是 | 继承特性配置列表 |

#### 返回值
无返回值（void）。

#### 使用示例
```typescript title="设置继承特性"
const extendsConfig = [
    {
        menus: [
            {name: "inherited1", title: "继承页面1", page: "pages.Inherited1"}
        ],
        aiConfig: {useAi: 1, aiAssistant: "aiassistants.DefaultAI"}
    }
];
shell.setExtendsFeature(extendsConfig);
```

### setOriginFeature
设置原始菜单特性配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| feature | object | ShellFeature | 是 | 原始特性配置 |

#### 返回值
无返回值（void）。

#### 使用示例
```typescript title="设置原始特性"
const originConfig = {
    menus: [
        {name: "origin1", title: "原始页面1", page: "pages.Origin1"}
    ],
    aiConfig: {useAi: 0}
};
shell.setOriginFeature(originConfig);
```

### getPermConfig
获取指定角色的权限配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| roleName | string | string | 是 | 角色名称 |

#### 返回值
返回Promise，无具体返回值，执行后会更新门户的permConfig属性。

#### 使用示例
```typescript title="获取角色权限"
// 获取管理员角色权限
await shell.getPermConfig("roles.Admin");

// 获取普通用户权限
await shell.getPermConfig("roles.User");
```

## 属性
### routePath
门户的路由路径，只读属性。格式为`/{门户名称}`。

### menuTree
合并后的菜单树结构，包含所有可访问的菜单项。

### permConfig
当前的权限配置，可能为字符串"all"或权限对象。

### shellConfig
门户的自定义配置对象。

### backUrl
返回URL地址，可读写属性。

### originMenus
原始菜单配置，只读属性，来自originFeature。

### extendsMenus
继承的菜单配置列表，只读属性，来自extendsFeature。

### allowAccess
是否允许访问当前门户，只读属性，基于权限配置计算。

## 高级特性
### 自定义渲染逻辑
空白门户通过自定义shellRender实现特殊的渲染需求：

```json title="自定义渲染配置"
{
  "type": "shells.BlankType",
  "title": "自定义渲染门户",
  "frontBundleEntry": "./custom-render.json"
}
```

### 菜单权限控制
结合角色管理实现精细化菜单权限控制：

```typescript title="权限控制示例"
// 检查门户访问权限
if (shell.allowAccess) {
    // 获取当前用户可见菜单
    const visibleMenus = shell.getAvailableMenu();
    
    // 进一步过滤权限菜单
    const permMenus = shell.getPermMenu(visibleMenus);
    
    console.log(`用户可访问菜单数量: ${permMenus.length}`);
}
```

### 菜单继承与合并
利用菜单继承机制实现基础菜单的扩展：

```typescript title="菜单继承示例"
// 设置基础菜单
const baseMenus = [
    {name: "home", title: "首页", page: "pages.Home"},
    {name: "profile", title: "个人中心", page: "pages.Profile"}
];

// 设置扩展菜单
const extendMenus = [
    {name: "admin", title: "管理面板", page: "pages.Admin"}
];

// 合并菜单
const finalMenus = shell.mergeMenus([baseMenus, extendMenus]);
``` 