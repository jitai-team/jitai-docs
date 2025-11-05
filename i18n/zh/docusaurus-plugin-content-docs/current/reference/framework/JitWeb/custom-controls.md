---
slug: custom-controls
description: "自定义控件 API 参考文档。完整的规格说明、方法和示例。"
---
# 自定义控件
自定义控件是JitWeb框架中的可复用UI组件元素，基于React技术栈实现前端交互功能。它负责封装特定业务逻辑、提供数据绑定能力和响应用户操作，支持在页面和工作流节点中灵活调用。

自定义控件元素分层结构为Meta（widgets.Meta） → Type（widgets.React） → 实例，开发者可通过JitAI的可视化开发工具快捷地创建自定义控件实例元素。

当然，开发者也可以创建自己的Type元素，或者在自己的App中改写JitAi官方提供的widgets.ReactType元素，以实现自己的封装。

## 快速开始 
### 基础配置示例
创建一个简单的输入控件：

```tsx title="index.tsx"
import type { Jit } from 'jit';
import type { FC } from 'react';
import { getRuntimeApp } from 'jit';
import { Input } from 'antd';
import { useState, useEffect } from 'react';

export const Render: FC<{
    props: {
        data: InstanceType<typeof Jit.BaseDataType>;
        onChange: (v: string) => void;
    };
}> = ({ props: p }) => {
    const [value, setValue] = useState(p.data.value);
    
    useEffect(() => {
        const app = getRuntimeApp();
        const handleId = p.data.onValueChange(() => {
            setValue(p.data.value);
        });
        return () => app.off(handleId);
    }, [p.data.value]);

    const onChange = (e: any) => {
        setValue(e.target.value);
        p.onChange(e.target.value);
    };

    return <Input value={value} onChange={onChange} />;
};
```

对应的配置文件：

```json title="e.json"
{
  "title": "自定义输入控件",
  "type": "widgets.React",
  "outputName": "index",
  "frontBundleEntry": "index.tsx",
  "props": []
}
```

### 页面中使用
在React组件中通过ElementRender调用：

```tsx title="页面使用示例"
import { ElementRender } from 'jit-web';

// 创建数据类型实例
const textData = new Jit.datatypes.Stext({
    name: 'userInput',
    value: '初始值',
});

// 使用自定义控件
<ElementRender
    elementPath="widgets.testCustomControls"
    props={{
        data: textData,
        onChange: (v: string) => {
            console.log('值变更：', v);
        }
    }}
/>
```

在工作流节点中通过widgetFullName引用：

```json title="节点配置"
{
    "renderByWidget": 1,
    "widgetFullName": "widgets.testCustomControls",
    "sendData": 1,
    "sendArgs": ["node.output"]
}
```

### 配置属性说明
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | string | 是 | - | 控件显示名称 |
| type | string | 是 | "widgets.React" | 控件类型，固定值 |
| outputName | string | 是 | "index" | 输出文件名 |
| frontBundleEntry | string | 是 | "index.tsx" | 前端入口文件路径 |
| props | array | 否 | `[]` | 属性配置列表 |

## 变量
### data
- **类型**：`InstanceType<typeof Jit.BaseDataType>`
- **说明**：绑定的数据类型实例，支持双向数据绑定
- **示例**：通过props传入的数据实例，可监听值变更事件

### props
- **类型**：`Record<string, any>`
- **说明**：组件属性对象，包含外部传入的所有配置参数
- **示例**：包含data、onChange等业务相关属性

## 方法 
### getRuntimeApp()
获取当前运行时应用实例。

#### 返回值
- `App` - 应用实例对象

#### 使用示例
```tsx
const app = getRuntimeApp();
```

### publishEvent(name, data)
发布组件事件，支持跨组件通信。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 事件名称 |
| data | `Record<string, any>` | 否 | 事件数据 |

#### 使用示例
```tsx
// 发布事件
const sendEvent = () => {
    const app = getRuntimeApp();
    app?.emit({
        name: 'dataChanged',
        type: 'COMP_MESSAGE'
    }, { value: newValue });
};
```

### subscribeEvent(name, callback)
订阅组件事件，实现事件监听。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 事件名称 |
| callback | Function | 是 | 事件回调函数 |

#### 返回值
- `string` - 事件处理器ID，用于取消订阅

#### 使用示例
```tsx
useEffect(() => {
    const app = getRuntimeApp();
    const handleId = app?.on(async (data) => {
        console.log('事件数据：', data);
    }, async (event) => {
        return event.name === 'targetEvent';
    });
    
    return () => {
        if (handleId) app?.off(handleId);
    };
}, []);
```

### onValueChange(callback)
监听数据值变更事件。

#### 参数详解
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| callback | Function | 是 | 值变更回调函数 |

#### 返回值
- `string` - 事件处理器ID

#### 使用示例
```tsx
useEffect(() => {
    if (!data) return;
    
    const handleId = data.onValueChange(() => {
        setValue(data.value);
    });
    
    return () => app?.off(handleId);
}, [data]);
```

## 属性
暂无

## 事件
### onValueChange
数据值变更事件，当绑定的数据类型实例值发生变化时触发。

#### 参数详解
| 参数 | 类型 | 说明 |
|------|------|------|
| value | any | 变更后的新值 |

#### 使用示例
```tsx
// 监听数据变更
useEffect(() => {
    if (!p.data) return;
    
    const app = getRuntimeApp();
    const handleId = p.data.onValueChange(() => {
        setValue(p.data.value);
    });
    
    return () => app.off(handleId);
}, [p.data]);
```

## 高级特性
### 数据双向绑定
支持与数据类型实例的双向数据绑定，实现数据同步更新。

#### 配置示例
```tsx
export const Render: FC<{ props: Props }> = ({ props: p }) => {
    const [value, setValue] = useState(p.data?.value);
    
    // 监听数据变更
    useEffect(() => {
        if (!p.data) return;
        
        const app = getRuntimeApp();
        const handleId = p.data.onValueChange(() => {
            setValue(p.data.value);
        });
        
        return () => app.off(handleId);
    }, [p.data]);
    
    // 更新数据
    const handleChange = (newValue: any) => {
        setValue(newValue);
        p.onChange?.(newValue);
        // 直接更新数据类型实例
        if (p.data) {
            p.data.value = newValue;
        }
    };
    
    return (
        <input 
            value={value || ''} 
            onChange={(e) => handleChange(e.target.value)} 
        />
    );
};
```

### 跨组件事件通信
实现组件间的事件发布和订阅机制。

#### 配置示例
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    useEffect(() => {
        const app = getRuntimeApp();
        
        // 监听全局事件
        const handleId = app?.on(async (data) => {
            console.log('接收到事件：', data);
        }, async (event) => {
            return event.name === 'customEvent';
        });
        
        return () => {
            if (handleId) app?.off(handleId);
        };
    }, []);
    
    // 发送事件
    const sendEvent = () => {
        const app = getRuntimeApp();
        app?.emit({
            name: 'customEvent',
            type: 'CUSTOM_MESSAGE'
        }, { data: 'event data' });
    };
    
    return <button onClick={sendEvent}>发送事件</button>;
};
```

### 生命周期管理
实现组件的完整生命周期控制。

#### 配置示例
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    const componentRef = useRef<any>(null);
    
    // 组件挂载
    useEffect(() => {
        console.log('组件已挂载');
        
        // 初始化逻辑
        initComponent();
        
        return () => {
            // 清理逻辑
            cleanup();
            console.log('组件已卸载');
        };
    }, []);
    
    const initComponent = () => {
        // 初始化组件状态
    };
    
    const cleanup = () => {
        // 清理资源、事件监听器等
    };
    
    return <div ref={componentRef}>组件内容</div>;
};
```

### 错误处理机制
实现健壮的错误处理和用户反馈。

#### 配置示例
```tsx
export const Render: FC<{ props: Props }> = ({ props }) => {
    const [error, setError] = useState<string | null>(null);
    
    const handleOperation = async () => {
        try {
            setError(null);
            // 执行可能出错的操作
            await someAsyncOperation();
        } catch (err) {
            setError(err instanceof Error ? err.message : '操作失败');
            console.error('组件操作错误：', err);
        }
    };
    
    if (error) {
        return <Alert message="错误" description={error} type="error" />;
    }
    
    return (
        <div>
            <button onClick={handleOperation}>执行操作</button>
        </div>
    );
};
```
