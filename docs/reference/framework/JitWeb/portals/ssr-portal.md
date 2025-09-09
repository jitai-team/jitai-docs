---
slug: ssr-portal
---
# SSR门户
SSR门户是支持服务端渲染的门户类型，用于提升首屏加载性能和SEO优化，支持主题定制和多模板切换。

SSR门户元素分层结构为Meta（shells.Meta） → Type（shells.SSRType） → 实例，开发者可通过可视化开发工具创建实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的shells.SSRType元素，以实现自己的封装。

## 快速开始
### 创建实例元素
#### 目录结构
```text title="推荐目录结构"
shells/
└── MySSRPortal/            # 门户元素目录（可自定义）
    ├── e.json              # 元素配置文件
    └── feature.json        # 门户功能配置文件
```

#### e.json文件
```json title="基础配置示例"
{
  "type": "shells.SSRType",
  "theme": "default",
  "title": "我的SSR门户",
  "default": true,
  "status": 1,
  "frontBundleEntry": "./feature.json",
  "backendBundleEntry": "."
}
```

#### 业务配置文件
```json title="feature.json示例"
{
  "menus": [
    {
      "name": "dashboard",
      "title": "数据看板",
      "icon": "dashboard",
      "page": "pages.Dashboard",
      "mobilePage": "pages.MobileDashboard",
      "nodeType": "menu"
    },
    {
      "name": "userGroup",
      "title": "用户管理",
      "icon": "user",
      "nodeType": "group",
      "children": [
        {
          "name": "userList",
          "title": "用户列表",
          "page": "pages.UserList",
          "nodeType": "menu"
        }
      ]
    }
  ]
}
```

#### 调用示例
```javascript title="获取门户实例"
// 获取SSR门户实例
const portal = await app.getElement("shells.MySSRPortal");

// 获取门户菜单
const menus = portal.menuTree;
const originMenus = portal.originMenus;
const extendsMenus = portal.extendsMenus;

// 设置后端返回URL
portal.setBackUrl("/dashboard");
```

## 元素配置
### e.json配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 元素类型，固定为"shells.SSRType" |
| title | string | 是 | 门户标题 |
| theme | string | 否 | 主题名称，默认为"default" |
| default | boolean | 否 | 是否为使用者门户 |
| status | number | 否 | 门户状态，0-禁用，1-启用 |
| hideInRole | boolean | 否 | 是否在角色中隐藏 |
| remark | string | 否 | 备注信息 |
| frontBundleEntry | string | 是 | 前端资源入口路径 |
| backendBundleEntry | string | 是 | 后端资源入口路径 |

### 业务配置文件配置
| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| menus | Array | 是 | 菜单配置数组 |
| aiConfig | Object | 否 | AI助理配置 |

**菜单配置项：**

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 菜单唯一标识 |
| title | string | 是 | 菜单显示标题 |
| icon | string | 否 | 菜单图标 |
| page | string | 否 | PC端页面fullName |
| mobilePage | string | 否 | 移动端页面fullName |
| nodeType | string | 是 | 节点类型："menu"或"group" |
| children | Array | 否 | 子菜单数组（group类型时使用） |
| hide | boolean | 否 | 是否隐藏菜单项 |
| config | Object | 否 | 菜单扩展配置 |
| args | Object | 否 | 平台特定参数配置 |

## 方法
### setExtendsFeature
设置继承的功能配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| feature | Array | array | 是 | 继承的功能配置数组 |

#### 返回值
无返回值

#### 使用示例
```javascript title="设置继承功能"
const extendsFeatures = [
    {
        menus: [
            {
                name: "baseMenu",
                title: "基础菜单",
                page: "pages.BasePage",
                nodeType: "menu"
            }
        ],
        aiConfig: {
            useAi: 1,
            aiAssistant: "assistants.DefaultAssistant"
        }
    }
];

portal.setExtendsFeature(extendsFeatures);
```

### setOriginFeature
设置原始功能配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| feature | Object | object | 是 | 原始功能配置对象 |

#### 使用示例
```javascript title="设置原始功能"
const originFeature = {
    menus: [
        {
            name: "mainMenu",
            title: "主菜单",
            page: "pages.MainPage",
            nodeType: "menu"
        }
    ]
};

portal.setOriginFeature(originFeature);
```

### setBackUrl
设置门户的返回URL地址。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| backUrl | string | string | 是 | 返回的URL地址 |

#### 使用示例
```javascript title="设置返回URL"
portal.setBackUrl("/dashboard/overview");
```

### getAvailableMenu
获取可用的菜单列表，过滤掉无权限、隐藏或无效的菜单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menuTree | Array | array | 否 | 菜单树数据，默认使用当前门户菜单 |

#### 返回值
返回过滤后的可用菜单列表（Array类型）

#### 使用示例
```javascript title="获取可用菜单"
// 获取默认可用菜单
const availableMenus = portal.getAvailableMenu();

// 获取指定菜单树的可用菜单
const customMenus = portal.getAvailableMenu(customMenuTree);
```

### getPermMenu
获取有权限的菜单列表。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menuTree | Array | array | 否 | 菜单树数据，默认使用当前门户菜单 |

#### 返回值
返回有权限的菜单列表（Array类型）

#### 使用示例
```javascript title="获取权限菜单"
const permMenus = portal.getPermMenu();
```

### flatFeatureMenuItem
将层级菜单平铺为一维数组。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menus | Array | array | 否 | 菜单数组，默认使用当前门户菜单 |

#### 返回值
返回平铺后的菜单列表（Array类型）

#### 使用示例
```javascript title="菜单平铺"
const flatMenus = portal.flatFeatureMenuItem();
```

### getPermConfig
异步获取指定角色的权限配置。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| roleName | string | string | 是 | 角色名称 |

#### 返回值
无返回值（异步方法，会更新permConfig属性）

#### 使用示例
```javascript title="获取角色权限"
await portal.getPermConfig("roles.admin");
```

### mergeMenus
合并多个菜单列表，前面的菜单会覆盖后面的同名菜单。

#### 参数详解
| 参数名 | 类型 | 对应原生类型 | 必填 | 说明 |
|--------|------|-------------|------|------|
| menusLists | Array | array | 是 | 二维菜单数组，包含多个菜单列表 |

#### 返回值
返回合并后的菜单列表（Array类型）

#### 使用示例
```javascript title="合并菜单"
const menuLists = [baseMenus, extendMenus, customMenus];
const mergedMenus = portal.mergeMenus(menuLists);
```

## 属性
### menuTree
当前门户的菜单树结构，包含合并后的完整菜单配置。

**类型：** Array  
**访问：** 只读

### originMenus
原始功能配置中的菜单列表。

**类型：** Array  
**访问：** 只读

### extendsMenus
所有继承功能配置中的菜单列表数组。

**类型：** Array  
**访问：** 只读

### permConfig
权限配置对象，控制菜单的访问权限。

**类型：** Object | string  
**访问：** 可读写  
**默认值：** "all"

### allowAccess
判断当前门户是否允许访问。

**类型：** boolean  
**访问：** 只读

### shellConfig
门户的扩展配置信息。

**类型：** Object  
**访问：** 可读写

### routePath
门户的路由路径。

**类型：** string  
**访问：** 只读

### backUrl
门户的返回URL地址。

**类型：** string  
**访问：** 可读写

### extendsFeature
继承的功能配置列表。

**类型：** Array  
**访问：** 只读

### originFeature
原始功能配置对象。

**类型：** Object  
**访问：** 只读

## 高级特性
### 主题定制
SSR门户支持多套主题模板，可通过主题配置实现界面风格的动态切换。

#### 配置示例
```json title="主题配置"
{
  "type": "shells.SSRType",
  "theme": "custom",
  "title": "自定义主题门户"
}
```

每个主题包含独立的HTML模板文件，位于`backend/themes/{themeName}/`目录下：

```text title="主题目录结构"
backend/
└── themes/
    ├── default/
    │   ├── index.html      # 主页面模板
    │   └── page.html       # 子页面模板
    └── custom/
        ├── index.html
        └── page.html
```

### 服务端渲染配置
SSR门户通过后端模板实现服务端预渲染，支持SEO优化和首屏性能提升。

#### 模板变量
后端HTML模板支持以下预定义变量：

- `{{shellTitle}}`：门户标题
- `{{shellFullName}}`：门户完整名称
- `{{shellName}}`：门户名称
- `{{shellMenus}}`：门户菜单JSON数据

#### 使用示例
```html title="自定义HTML模板"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{shellTitle}}</title>
    <meta name="description" content="基于{{shellName}}的企业级应用门户">
</head>
<body>
    <div id="app" data-shell="{{shellFullName}}">
        <!-- 服务端渲染内容 -->
    </div>
    <script>
        window.SHELL_CONFIG = {
            menus: {{shellMenus}},
            title: "{{shellTitle}}"
        };
    </script>
</body>
</html>
```

### 权限集成
结合角色管理系统实现细粒度的菜单权限控制。

#### 配置示例
```javascript title="权限配置"
// 异步获取角色权限配置
await portal.getPermConfig("roles.admin");

// 设置特定菜单权限
portal.permConfig = {
    dashboard: true,
    userList: true,
    systemSettings: false
};

// 获取当前用户有权限的菜单
const userMenus = portal.getPermMenu();

// 检查门户访问权限
if (portal.allowAccess) {
    console.log("允许访问此门户");
}
``` 