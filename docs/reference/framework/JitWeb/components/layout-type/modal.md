---
slug: modal
---
# 弹窗
弹窗是页面浮层容器组件，基于Ant Design的Modal和Drawer组件实现对话框和抽屉式弹窗界面。它负责承载临时内容展示、用户交互确认和复杂表单录入，支持模态和非模态两种显示模式、自定义尺寸和位置配置，以及内嵌其他组件构建复杂弹窗界面。

弹窗元素分层结构为Meta（components.Meta） → Type（components.Modal） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建弹窗实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的components.ModalType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
```text title="推荐目录结构"
pages/
├── MyPage/
│   ├── e.json
│   ├── index.ts  
│   ├── page.ts
│   └── scheme.json
```

```json title="pages/MyPage/scheme.json - 弹窗组件配置"
{
  "componentList": [
    {
      "fullName": "components.Modal",
      "type": "components.Modal",
      "name": "confirmModal",
      "title": "确认弹窗",
      "config": {
        "requireElements": [],
        "size": "normal",
        "type": "modal",
        "position": "page",
        "maskClosable": false,
        "showCloseControl": true,
        "bottomButtonList": [
          {
            "id": "confirm",
            "name": "确认",
            "type": "primary"
          },
          {
            "id": "cancel", 
            "name": "取消",
            "type": "default"
          }
        ],
        "bottomButtonAlign": "right",
        "layout": []
      },
      "showTitle": true
    }
  ]
}
```

```tsx title="pages/MyPage/page.ts - 调用弹窗"
import { BasePage } from 'common/type';

export class MyPage extends BasePage {
  async showConfirmDialog() {
    const modal = app.getElement('confirmModal');
    await modal.call('请确认您的操作');
  }
  
  async handleConfirm() {
    const modal = app.getElement('confirmModal');
    // 处理确认逻辑
    await modal.close();
  }
}
```

### 配置属性说明
| 属性名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| size | string | 弹窗尺寸：small&#124;normal&#124;big&#124;fullWindow | normal | 否 |
| type | string | 弹窗类型：modal&#124;drawer | modal | 否 |
| position | string | 弹窗位置：fullscreen&#124;page | page | 否 |
| maskClosable | boolean | 点击遮罩是否关闭 | false | 否 |
| showCloseControl | boolean | 是否显示关闭按钮 | true | 否 |
| bottomButtonList | ButtonProps[] | 底部按钮配置列表 | [] | 否 |
| bottomButtonAlign | string | 底部按钮对齐：left&#124;center&#124;right | center | 否 |
| customWidth | number | 自定义宽度（像素） | - | 否 |
| customHeight | number | 自定义高度（像素） | - | 否 |
| placement | string | 抽屉位置：right&#124;top&#124;bottom&#124;left | right | 否 |
| layout | Layout[] | 内部组件布局配置 | [] | 否 |
| requireElements | requireElement[] | 依赖元素配置 | [] | 否 |

## 变量
### modalTitle
弹窗标题文本变量，用于动态设置弹窗的显示标题。

- **类型**: Stext
- **默认值**: 组件title属性值
- **用法**: `modal.modalTitle.value = '新标题'`

## 方法 
### call
打开弹窗并可选择性设置标题。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| modalTitle | string | 弹窗标题文本 | - | 否 |

#### 返回值
- **类型**: `Promise<void>`

#### 使用示例
```tsx title="打开弹窗示例"
// 使用默认标题打开
await modal.call();

// 设置标题后打开
await modal.call('用户信息确认');

// 在事件处理中调用
button.subscribeEvent('onClick', async () => {
  await modal.call('操作确认');
});
```

### close
关闭弹窗。

#### 返回值
- **类型**: `Promise<void>`

#### 使用示例
```tsx title="关闭弹窗示例"
// 直接关闭弹窗
await modal.close();

// 在按钮事件中关闭
modal.subscribeEvent('onClickCancel', async () => {
  await modal.close();
});
```

### open
内部方法，直接设置弹窗为打开状态并触发打开后事件。

#### 使用示例
```tsx title="直接打开弹窗"
modal.open();
```

### closeState
内部方法，设置弹窗为关闭状态并触发关闭后事件。

#### 使用示例
```tsx title="直接关闭弹窗状态"
modal.closeState();
```

### getButtonList
根据权限配置过滤并设置底部按钮列表。

#### 使用示例
```tsx title="更新按钮列表"
modal.getButtonList();
```

### setConfig
设置组件配置，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| next | object | 新的配置对象 | - | 是 |
| clean | boolean | 是否完全替换配置 | false | 否 |

#### 使用示例
```tsx title="动态更新配置"
modal.setConfig({
  size: 'big',
  maskClosable: true
});
```

### publishEvent
发布组件事件，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| ex | object | 附加数据 | - | 否 |

#### 使用示例
```tsx title="发布自定义事件"
await modal.publishEvent('customEvent', { data: 'value' });
```

### subscribeEvent
订阅组件事件，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| name | string | 事件名称 | - | 是 |
| evtCb | function | 事件回调函数 | - | 是 |
| unSubscribeExist | boolean | 是否取消已有订阅 | true | 否 |

#### 返回值
- **类型**: `string` - 订阅句柄ID

#### 使用示例
```tsx title="订阅事件示例"
const handleId = modal.subscribeEvent('afterOpen', async (data) => {
  console.log('弹窗已打开', data);
});
```

### unSubscribeEvent
取消事件订阅，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| id | string | 订阅句柄ID | - | 是 |

#### 使用示例
```tsx title="取消订阅"
modal.unSubscribeEvent(handleId);
```

### destroy
销毁组件并清理所有资源，继承自BaseComponent。

#### 使用示例
```tsx title="销毁组件"
// 手动销毁组件，清理事件监听和内部资源
modal.destroy();
```

### runCode
执行动态代码，在页面上下文中运行，继承自BaseComponent。

#### 参数详解
| 参数名 | 类型 | 说明 | 默认值 | 必填 |
|--------|------|------|---------|------|
| code | string | 要执行的JavaScript代码 | - | 是 |

#### 返回值
- **类型**: `any` - 代码执行结果

#### 使用示例
```tsx title="执行动态代码"
// 在页面上下文中执行代码
const result = modal.runCode(`
  const currentUser = this.getCurrentUser();
  return currentUser.role === 'admin';
`);

if (result) {
  console.log('当前用户是管理员');
}
```

### getPermConfig
获取当前组件的权限配置，继承自BaseComponent。

#### 返回值
- **类型**: `Record<string, any> | undefined` - 权限配置对象

#### 使用示例
```tsx title="获取权限配置"
const permConfig = modal.getPermConfig();
if (permConfig?.button) {
  console.log('有按钮权限:', permConfig.button);
}
```

## 属性
### openState
弹窗开关状态变量，控制弹窗的显示和隐藏。

- **类型**: Numeric
- **值含义**: 0=关闭，1=打开
- **用法**: `modal.openState.value = 1`

### config
组件配置对象，包含所有弹窗配置项，继承自BaseComponent。

- **类型**: `ModalConfig & { requireElements: requireElement[] }`
- **用法**: `modal.config.size = 'big'`

### name
组件实例名称，继承自BaseComponent。

- **类型**: string
- **用法**: `modal.name`

### title
组件显示标题，继承自BaseComponent。

- **类型**: string
- **用法**: `modal.title`

### type
组件类型标识，继承自BaseComponent。

- **类型**: string
- **值**: 'components.Modal'

### fullName
组件完整名称，继承自BaseComponent。

- **类型**: string
- **值**: 'components.Modal'

### showTitle
是否显示组件标题，继承自BaseComponent。

- **类型**: boolean

### app
关联的应用实例，继承自BaseComponent。

- **类型**: App
- **用法**: `modal.app`

### page
关联的页面实例，继承自BaseComponent。

- **类型**: BasePage
- **用法**: `modal.page`

### compType
组件类型分类，继承自BaseComponent。

- **类型**: COMPONENT_TYPE
- **值含义**: normal、layout、reference
- **用法**: `modal.compType`

### dataTypeList
组件变量数据类型列表，继承自BaseComponent。

- **类型**: BaseDataType[]
- **用法**: `modal.dataTypeList`

## 事件
### afterOpen
弹窗打开后触发的事件。

#### 使用示例
```tsx title="监听弹窗打开事件"
modal.subscribeEvent('afterOpen', async () => {
  console.log('弹窗已打开');
  // 可以在此处执行弹窗打开后的逻辑
  await loadModalData();
});
```

### afterClose
弹窗关闭后触发的事件。

#### 使用示例
```tsx title="监听弹窗关闭事件"
modal.subscribeEvent('afterClose', async () => {
  console.log('弹窗已关闭');
  // 清理弹窗数据
  await clearModalData();
});
```

### 动态按钮事件
点击底部按钮后触发的动态事件，事件名格式为 `onClick` + 按钮ID，例如 `onClickConfirm`、`onClickCancel`。

#### 使用示例
```tsx title="监听按钮点击事件"
// 监听ID为confirm的按钮点击
modal.subscribeEvent('onClickConfirm', async () => {
  console.log('确认按钮被点击');
  await handleConfirm();
  await modal.close();
});

// 监听ID为cancel的按钮点击  
modal.subscribeEvent('onClickCancel', async () => {
  console.log('取消按钮被点击');
  await modal.close();
});
```

## 高级特性
### 抽屉式弹窗配置
当需要侧边栏样式的弹窗时，可配置为抽屉类型：

```tsx title="抽屉弹窗配置示例"
const drawerConfig = {
  type: 'drawer',
  placement: 'right',
  size: 'normal',
  showCloseControl: true,
  maskClosable: false
};

modal.setConfig(drawerConfig);
await modal.call('侧边栏信息');
```

### 嵌套组件布局
弹窗内可嵌套其他组件，通过layout配置实现复杂界面：

```tsx title="嵌套组件配置"
const layoutConfig = {
  layout: [
    { i: 'Form1', x: 0, y: 0, w: 12, h: 8 },
    { i: 'Table1', x: 0, y: 8, w: 12, h: 10 }
  ]
};

modal.setConfig(layoutConfig);
```

### 全屏弹窗模式
适用于复杂表单或大量数据展示场景：

```tsx title="全屏弹窗配置"
modal.setConfig({
  size: 'fullWindow',
  position: 'fullscreen'
});
```

### 自定义按钮配置
支持多按钮配置和权限控制：

```tsx title="复杂按钮配置"
const buttonConfig = {
  bottomButtonList: [
    { id: 'save', name: '保存', type: 'primary' },
    { id: 'saveAndContinue', name: '保存并继续', type: 'default' },
    { id: 'cancel', name: '取消', type: 'default' }
  ],
  bottomButtonAlign: 'center'
};

modal.setConfig(buttonConfig);

// 分别处理各按钮事件
modal.subscribeEvent('onClickSave', async () => {
  await saveData();
  await modal.close();
});

modal.subscribeEvent('onClickSaveAndContinue', async () => {
  await saveData();
  await clearForm();
});
``` 