---
slug: sub-page
description: "子页面 API 参考文档。完整的规格说明、方法和示例。"
---
# 子页面
子页面是用于在当前页面中嵌入其他页面的布局容器组件，基于引用机制实现复杂界面的模块化构建。它负责子页面的动态加载、数据传递和状态管理，支持父子页面间的通信机制，适用于大型应用的页面分割和模块化开发。

子页面元素分层结构为Meta（components.Meta） → Type（components.Container） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建子页面实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAI官方提供的components.ContainerType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
MyApp/
├── pages/
│   ├── MainPage/           # 主页面
│   │   ├── scheme.json
│   │   └── e.json
│   └── SubPage/            # 子页面
│       ├── scheme.json
│       └── e.json
```

```tsx title="子页面基础使用"
// 在主页面中使用子页面组件
const container = app.getElement('components.Container.MyContainer');

// 配置要引用的页面
container.setConfig({
    pageName: 'pages.SubPage',  // 要嵌入的页面fullName
    renderOnload: true,         // 启用渲染加载
    requireElements: []
});

// 调用子页面
await container.call();
```

### 配置属性说明
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| pageName | string | 要引用的页面fullName | - | 是 |
| renderOnload | boolean | 是否启用渲染加载 | false | 否 |
| featureTitleList | string[] | 特性标题列表 | `[]` | 否 |
| featureNameList | string[] | 特性名称列表 | `[]` | 否 |
| requireElements | requireElement[] | 依赖元素配置 | `[]` | 否 |

## 变量
### renderOnload
内置的复选框类型变量，用于控制子页面的渲染状态。每次调用 `call()` 方法时会自动递增其值，触发子页面重新渲染。

```tsx title="renderOnload变量使用"
const container = app.getElement('components.Container.MyContainer');

// 监听renderOnload变化
container.subscribeEvent('variableChange', (data) => {
    if (data.variableName === 'renderOnload') {
        console.log('子页面重新渲染:', data.value);
    }
});
```

## 方法 
### call
异步方法，用于打开和刷新子页面。调用此方法会增加renderOnload变量的值，触发子页面重新渲染。

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 当子页面加载完成后resolve |

#### 使用示例
```tsx title="call方法使用"
const container = app.getElement('components.Container.MyContainer');

// 基础调用
await container.call();

// 在事件处理中使用
container.subscribeEvent('click', async () => {
    try {
        await container.call();
        console.log('子页面加载完成');
    } catch (error) {
        console.error('子页面加载失败:', error);
    }
});
```

### setConfig
设置组件配置，用于动态更改子页面引用和显示选项。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| config | Partial&lt;ContainerConfig&gt; | 配置对象 | - | 是 |
| clean | boolean | 是否清空现有配置 | false | 否 |

#### 使用示例
```tsx title="setConfig方法使用"
const container = app.getElement('components.Container.MyContainer');

// 设置子页面引用
container.setConfig({
    pageName: 'pages.UserProfile',
    renderOnload: true
});

// 完全替换配置
container.setConfig({
    pageName: 'pages.Settings',
    renderOnload: true,
    requireElements: []
}, true);
```

### publishEvent
发布组件事件，用于父子页面间的通信。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| data | Record&lt;string, any&gt; | 事件数据 | - | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| Promise&lt;void&gt; | 事件发布完成 |

#### 使用示例
```tsx title="publishEvent使用"
const container = app.getElement('components.Container.MyContainer');

// 向子页面发送数据
await container.publishEvent('dataUpdate', {
    userId: 123,
    action: 'refresh'
});
```

### subscribeEvent
订阅组件事件，监听子页面或其他组件的消息。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| callback | (data: any) =&gt; void &#124; Promise&lt;void&gt; | 回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消现有订阅 | true | 否 |

#### 返回值
| 类型 | 说明 |
|------|------|
| string | 订阅句柄ID |

#### 使用示例
```tsx title="subscribeEvent使用"
const container = app.getElement('components.Container.MyContainer');

// 监听子页面事件
const handleId = container.subscribeEvent('pageReady', (data) => {
    console.log('子页面就绪:', data);
});

// 异步事件处理
container.subscribeEvent('dataChanged', async (data) => {
    await processData(data);
    console.log('数据处理完成');
});
```

### unSubscribeEvent
取消事件订阅。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| handleId | string | 订阅句柄ID | - | 是 |

#### 使用示例
```tsx title="unSubscribeEvent使用"
const container = app.getElement('components.Container.MyContainer');

const handleId = container.subscribeEvent('test', () => {});
// 取消订阅
container.unSubscribeEvent(handleId);
```

### bindApp
绑定应用实例，建立组件与应用的关联关系。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| app | App | 应用实例 | - | 是 |

#### 使用示例
```tsx title="bindApp使用"
const container = app.getElement('components.Container.MyContainer');
container.bindApp(app);
```

### bindPage
绑定页面实例，建立组件与页面的关联关系。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| page | BasePage | 页面实例 | - | 是 |

#### 使用示例
```tsx title="bindPage使用"
const container = app.getElement('components.Container.MyContainer');
const page = app.getElement('pages.MainPage');
container.bindPage(page);
```

### runCode
执行代码字符串，在页面上下文中运行。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的代码字符串 | - | 是 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 代码执行结果 |

#### 使用示例
```tsx title="runCode使用"
const container = app.getElement('components.Container.MyContainer');

// 执行简单计算
const result = container.runCode('1 + 2');
console.log(result); // 3

// 访问页面变量
const pageData = container.runCode('this.userData.value');

// 调用页面方法
container.runCode('this.refreshData()');
```

### getPermConfig
获取当前组件的权限配置。

#### 返回值
| 类型 | 说明 |
|------|------|
| Record&lt;string, any&gt; &#124; undefined | 权限配置对象，如果无配置则返回undefined |

#### 使用示例
```tsx title="getPermConfig使用"
const container = app.getElement('components.Container.MyContainer');

const permConfig = container.getPermConfig();
if (permConfig) {
    console.log('组件权限配置:', permConfig);
    // 根据权限配置控制组件行为
    if (permConfig.visible === false) {
        container.style.display = 'none';
    }
}
```

### destroy
销毁组件，清理资源和事件监听。

#### 使用示例
```tsx title="destroy使用"
const container = app.getElement('components.Container.MyContainer');
// 页面卸载时销毁组件
container.destroy();
```

## 属性
### subPage
只读属性，获取当前加载的子页面实例。

```tsx title="subPage属性使用"
const container = app.getElement('components.Container.MyContainer');

// 在子页面加载完成后访问
await container.call();
if (container.subPage) {
    console.log('子页面实例:', container.subPage);
    // 调用子页面方法
    container.subPage.someMethod();
}
```

### name
只读属性，获取组件名称。

```tsx title="name属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件名称:', container.name); // "MyContainer"
```

### title
读写属性，组件显示标题。

```tsx title="title属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件标题:', container.title);
container.title = '新的子页面标题';
```

### config
只读属性，获取当前组件配置。

```tsx title="config属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('当前配置:', container.config);
console.log('引用页面:', container.config.pageName);
```

### showTitle
读写属性，控制是否显示组件标题。

```tsx title="showTitle属性使用"
const container = app.getElement('components.Container.MyContainer');
container.showTitle = true; // 显示标题
```

### app
只读属性，获取关联的应用实例。

```tsx title="app属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('关联应用:', container.app);
```

### page
只读属性，获取关联的页面实例。

```tsx title="page属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('关联页面:', container.page);
```

### fullName
只读属性，获取组件完整名称标识。

```tsx title="fullName属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件完整名称:', container.fullName); // "components.Container"
```

### type
只读属性，获取组件类型字符串。

```tsx title="type属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件类型:', container.type); // "components.Container"
```

### compType
只读属性，获取组件类型枚举值。

```tsx title="compType属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件类型枚举:', container.compType); // COMPONENT_TYPE.REFERENCE
```

### dataTypeList
只读属性，获取组件的数据类型列表。

```tsx title="dataTypeList属性使用"
const container = app.getElement('components.Container.MyContainer');
console.log('组件数据类型:', container.dataTypeList);
// 访问具体的数据类型变量
container.dataTypeList.forEach(dataType => {
    console.log('数据类型名称:', dataType.name);
});
```

## 事件
子页面组件支持自定义事件系统，但没有预定义的特定事件。开发者可以通过 `publishEvent` 和 `subscribeEvent` 方法实现自定义事件通信。

## 高级特性
### 父子页面通信
子页面组件提供了完整的父子页面通信机制，支持数据传递和状态同步。

```tsx title="父子页面通信示例"
// 父页面
const container = app.getElement('components.Container.MyContainer');

// 配置并加载子页面
container.setConfig({
    pageName: 'pages.UserDetail',
    renderOnload: true
});

await container.call();

// 向子页面发送数据
await container.publishEvent('updateUser', {
    userId: 123,
    userData: { name: '张三', age: 25 }
});

// 监听子页面事件
container.subscribeEvent('userUpdated', (data) => {
    console.log('用户更新:', data);
    // 刷新父页面数据
    refreshParentData();
});

// 子页面中 (pages.UserDetail)
const page = app.getCurrentPage();

// 监听父页面消息
page.subscribeEvent('updateUser', (data) => {
    // 更新子页面UI
    updateUserInterface(data.userData);
});

// 向父页面发送确认
page.publishEvent('userUpdated', {
    success: true,
    message: '用户信息已更新'
});
```

### 动态页面切换
支持在运行时动态切换子页面内容，实现灵活的页面组合。

```tsx title="动态页面切换"
const container = app.getElement('components.Container.MyContainer');

// 切换到不同的子页面
const switchToPage = async (pageName: string) => {
    container.setConfig({
        pageName: pageName,
        renderOnload: true
    });
    
    await container.call();
};

// 使用示例
await switchToPage('pages.UserList');    // 切换到用户列表
await switchToPage('pages.UserProfile'); // 切换到用户资料
await switchToPage('pages.Settings');    // 切换到设置页面
```

### 条件渲染控制
通过renderOnload属性控制子页面的渲染时机，实现按需加载。

```tsx title="条件渲染控制"
const container = app.getElement('components.Container.MyContainer');

// 初始配置不渲染
container.setConfig({
    pageName: 'pages.HeavyPage',
    renderOnload: false  // 不立即渲染
});

// 在特定条件下才加载子页面
const loadSubPageIfNeeded = async () => {
    const userPermission = await checkUserPermission();
    
    if (userPermission.canViewDetail) {
        container.setConfig({
            renderOnload: true
        });
        await container.call();
    }
};
``` 