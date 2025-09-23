---
sidebar_position: 5
slug: extend-page-type-editor
---

# Extend Your Own Page Type and Editor


# 开发自定义页面Type和编辑器

想象一下，你需要为一个在线考试系统开发倒计时页面。你打开JitAi，查看现有的页面类型：常规页面太简单，数据管理页面不合适，Markdown页面更不行...这时候你意识到，需要创建一个全新的页面类型。

这篇文档将带你完整体验如何开发自定义页面Type，更重要的是，你将理解JitAi是如何通过巧妙的设计，让这件看似复杂的事变得如此简单。

## 理解页面是如何被加载的

在开始动手之前，让我们先理解一个核心问题：当用户访问一个页面时，JitAi是如何找到并加载正确的代码的？

### 一次页面加载之旅

让我们跟踪一个页面从URL到渲染的完整过程：

```typescript
// 用户访问: /pages/examTimer
```

当这个请求到达时，JitAi开始了一段精妙的查找之旅：

```typescript
// 第一步：runApp.ts 启动应用
await runtimeApp.getElement('pages.examTimer');

// 第二步：app.ts 开始查找元素
async getElement(elementPath: string) {
    // 找到元素定义
    const elements = this.findElement(elementPath);

    // 关键：寻找合适的loader
    return await this.loadElement(elements);
}
```

这里出现了第一个关键概念：**Loader（加载器）**。

### Loader - 灵活性的秘密

Loader是JitAi最巧妙的设计之一。它不是一个固定的加载逻辑，而是一个**可继承、可覆盖的函数链**。

```typescript
// 寻找loader的过程就像找钥匙
async getElementLoader(elementPath: string) {
    // 1. 这个页面自己有专门的钥匙吗？
    if (element.define.loader) {
        return element.loader;
    }

    // 2. 没有？那它的Type有通用钥匙吗？
    if (element.define.type) {
        const typeModule = await this.getElement(element.type);
        if (typeModule?.loader) {
            return typeModule.loader;
        }
    }

    // 3. 还是没有？用万能钥匙（Meta的loader）
    const metaModule = await this.getElement('pages.Meta');
    return metaModule?.loader;
}
```

这个设计的巧妙之处在于：
- **实例可以特殊化**：特定页面可以有自己的加载逻辑
- **Type可以统一管理**：同类页面共享加载方式
- **Meta提供兜底**：确保总有一个loader可用

现在你可能会问：为什么需要这么复杂的机制？让我们通过实际案例来理解。

### 为什么Vue页面需要自定义Loader

让我们对比一下React页面和Vue页面的加载需求：

```typescript
// React页面的标准加载（Meta提供的默认loader）
export default async (elements) => {
    const pageModule = await import(path);
    // 期望得到：PageCls 和 Render

    // 用HOC包装，注入页面实例
    const Render = pageHOC(PageWrapper, {
        PageCls: pageModule.PageCls,
        PageRender: pageModule.Render
    });

    return { PageCls, Render };
}

// Vue页面的特殊需求（自定义loader）
export default async (elements) => {
    const pageModule = await import(path);
    // 同样得到：PageCls 和 Render

    // 但是！Vue需要DOM元素来挂载
    const Render = vueHOC(VuePageWrapper, {
        PageCls: pageModule.PageCls,
        // Vue的Render需要接收DOM
        PageRender: (dom, page) => {
            createApp(VueApp, { page }).mount(dom);
        }
    });

    return { PageCls, Render };
}
```

看到区别了吗？Vue页面需要一个真实的DOM元素来挂载，而React只需要返回虚拟DOM。这就是为什么VueType需要自定义loader - 它需要改变页面的加载和渲染方式。

## 开发计时器页面Type

现在我们理解了原理，让我们开始开发一个计时器页面Type。这个过程会让你真正体会到JitAi的强大。然我们先看看效果：

![实例展示](./img/3/实例展示.png)

### 页面Type的完整组成

在开始编码前，让我们先了解一个完整的页面Type需要哪些组件：

| 组成部分 | 运行环境 | 主要职责 | 文件位置 |
|---------|----------|----------|----------|
| **Type元素本体** | 使用区 | 定义页面类(PageCls)和渲染组件(Render) | `pages/TimerPageType/` |
| **元素定义配置器** | IDE | 提供创建页面的可视化表单 | `pages/TimerPageType/DefineEditor/` |
| **增删改API** | IDE | 根据配置生成页面实例代码 | `pages/TimerPageType/Api/` |
| **元素编辑器** | IDE | 提供代码编辑界面 | `pages/TimerPageType/editor/` |

这些组件分工明确：
- **使用区组件**：负责页面的实际运行和渲染
- **IDE组件**：负责页面的创建、配置和编辑

### 第一步：规划目录结构

一个完整的页面Type需要在两个地方创建文件：

```bash
# 使用区：页面运行时文件
pages/
└── TimerPageType/
    ├── e.json           # 元素定义，标记loadTime: "startUp"
    ├── index.ts         # 入口文件，导出PageCls和Render
    ├── TimerPage.ts     # 页面类，继承Jit.BasePage
    ├── Render.tsx       # 渲染组件
    ├── DefineEditor/    # 创建配置器
    │   ├── e.json
    │   ├── index.ts
    │   └── Editor.tsx
    └── Api/             # 增删改接口
        ├── e.json
        ├── index.ts
        ├── create.ts
        └── update.ts
```

### 第二步：设计Type的能力

在开始编码前，我们需要思考：计时器页面应该具备什么能力？

```typescript
// 我们期望的使用方式
const timerPage = new TimerPage({
    duration: 3600,        // 60分钟
    onTimeout: () => {     // 时间到了
        alert('考试结束！');
    }
});

timerPage.start();        // 开始计时
timerPage.pause();        // 暂停
timerPage.getRemaining(); // 获取剩余时间
```

### 第三步：创建Type元素

现在，让我们创建TimerPageType。由于我们没有自定义loader，将使用Meta的loader，这意味着我们必须遵循Meta的规范：导出`PageCls`和`Render`。

```typescript title="pages/TimerPageType/TimerPage.ts"
import { Jit } from 'jit';

// 这是Type层的页面类，定义计时器页面的通用能力
export class TimerPage extends Jit.BasePage {
    protected duration: number = 0;
    protected remaining: number = 0;
    protected timerId?: ReturnType<typeof window.setInterval>;
    protected status: 'idle' | 'running' | 'paused' | 'finished' = 'idle';

    // Type定义的配置结构 - 所有实例都会遵循
    config?: {
        duration: number;      // 总时长（秒）
        autoStart?: boolean;   // 自动开始
        warnAt?: number;       // 警告时间点
        theme?: 'exam' | 'game' | 'work';
    };

    constructor(options: any) {
        super(options);
        this.duration = this.config?.duration || 3600;
        this.remaining = this.duration;
    }

    // 核心方法 - 供实例使用或重写
    start(): void {
        if (this.status === 'finished') return;

        this.status = 'running';
        this.timerId = setInterval(() => {
            this.remaining--;

            // 发布事件，让UI响应
            this.publishEvent('TIMER_TICK', {
                remaining: this.remaining,
                percentage: (this.remaining / this.duration) * 100
            });

            // 警告检查
            if (this.config?.warnAt && this.remaining === this.config.warnAt) {
                this.onWarning();
            }

            // 结束检查
            if (this.remaining <= 0) {
                this.finish();
            }
        }, 1000);
    }

    pause(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.status = 'paused';
            this.publishEvent('TIMER_PAUSED');
        }
    }

    finish(): void {
        this.pause();
        this.status = 'finished';
        this.publishEvent('TIMER_FINISHED');
        this.onTimeout();
    }

    // 可被实例重写的钩子方法
    onWarning(): void {
        console.log('时间即将结束！');
    }

    onTimeout(): void {
        console.log('时间到！');
    }

    // 格式化显示 - 实例可能需要不同的格式
    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    // 获取剩余时间和状态的方法（Render组件需要）
    getRemaining(): number {
        return this.remaining;
    }

    getStatus(): 'idle' | 'running' | 'paused' | 'finished' {
        return this.status;
    }
}

export default TimerPage;
```

注意这里的设计思路：
- **Type定义通用能力**：所有计时器都需要的start、pause、finish
- **预留扩展点**：onWarning、onTimeout可以被实例重写
- **事件驱动**：通过事件让UI和逻辑解耦
- **继承BasePage**：获得页面的基础能力（生命周期、事件系统等）

### 第四步：创建渲染组件

```tsx title="pages/TimerPageType/Render.tsx"
import React, { useState, useEffect } from 'react';
import { Progress, Button, Card, Typography } from 'antd';
import type { TimerPage } from './TimerPage';

interface TimerRenderProps {
    page: TimerPage;
}

const TimerRender: React.FC<TimerRenderProps> = ({ page }) => {
    const [remaining, setRemaining] = useState(page.getRemaining());
    const [percentage, setPercentage] = useState(100);
    const [status, setStatus] = useState(page.getStatus());

    useEffect(() => {
        // 监听计时器事件
        const handlerIds: string[] = [];

        const tickHandlerId = page.subscribeEvent('TIMER_TICK', (e) => {
            const data = e as any;
            setRemaining(data.remaining);
            setPercentage(data.percentage);
        });
        handlerIds.push(tickHandlerId);

        const pausedHandlerId = page.subscribeEvent('TIMER_PAUSED', () => {
            setStatus('paused');
        });
        handlerIds.push(pausedHandlerId);

        const finishedHandlerId = page.subscribeEvent('TIMER_FINISHED', () => {
            setStatus('finished');
            setPercentage(0);
        });
        handlerIds.push(finishedHandlerId);

        // 如果配置了自动开始
        if (page.config?.autoStart) {
            page.start();
        }

        return () => {
            // 清理事件监听
            handlerIds.forEach(id => {
                page.unSubscribeEvent(id);
            });
        };
    }, [page]);

    const getThemeColor = (): string => {
        const theme = page.config?.theme;
        if (theme === 'exam') return '#ff4d4f';
        if (theme === 'game') return '#52c41a';
        return '#1890ff';
    };

    return (
        <Card
            title={page.title || "计时器"}
            style={{ maxWidth: 500, margin: '50px auto' }}
        >
            <Progress
                type="circle"
                percent={percentage}
                format={() => page.formatTime(remaining)}
                size={200}
                strokeColor={getThemeColor()}
            />

            <div style={{ marginTop: 30, textAlign: 'center' }}>
                {status === 'idle' || status === 'paused' ? (
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            page.start();
                            setStatus('running');
                        }}
                    >
                        {status === 'idle' ? '开始' : '继续'}
                    </Button>
                ) : status === 'running' ? (
                    <Button
                        size="large"
                        onClick={() => {
                            page.pause();
                            setStatus('paused');
                        }}
                    >
                        暂停
                    </Button>
                ) : (
                    <Typography.Title level={3} type="danger">
                        时间结束！
                    </Typography.Title>
                )}
            </div>
        </Card>
    );
};

export default TimerRender;
```

现在让我们创建Type的入口文件，遵循Meta loader的规范：

```typescript title="pages/TimerPageType/index.ts"
import TimerPage from './TimerPage';
import Render from './Render';

// 必须导出PageCls和Render，这是Meta loader的约定
const PageCls = TimerPage;

export {
    TimerPage as default,
    PageCls,    // Meta loader需要这个
    Render      // Meta loader需要这个
};
```

同时，我们需要在e.json中标记这个Type为启动时加载：

```json title="pages/TimerPageType/e.json"
{
    "title": "计时器页面类型",
    "type": "pages.Meta",
    "frontBundleEntry": "./index.ts",
    "loadTime": "startUp"  // 关键：标记为启动时加载
}
```

### 第五步：理解动态继承机制

这里有一个精妙的设计 - **动态继承**。当应用启动时，JitAi会：

```typescript
// app.ts - 启动时加载标记为startUp的元素
async loadNecessaryElements() {
    const startUpElements = findElementsByLoadTime('startUp');

    for (const element of startUpElements) {
        const module = await this.getElement(element);

        // 如果模块导出了default并且有name属性
        if (module?.default?.name) {
            // 注册到Jit全局对象
            Jit.bindModule(module.default.name, module.default);
            // 现在可以通过 Jit.TimerPage 访问了！
        }
    }
}
```

这就是为什么我们能在实例中这样写：

```typescript
// 不是 import { TimerPage } from '../TimerPageType'
// 而是直接从Jit对象访问
class ExamTimer extends Jit.TimerPage {  // 动态继承！
    // ...
}
```

这个设计的巧妙之处：
- **解耦依赖**：实例不需要知道Type的物理位置
- **动态加载**：Type可以来自任何地方（本地、远程、扩展包）
- **统一管理**：所有页面类都通过Jit对象访问

### 第六步：创建一个考试计时器实例

现在Type准备好了，让我们创建一个具体的考试计时器：

```typescript title="pages/examTimer/index.ts"
// 注意：不是直接import，而是通过Jit访问
// 因为TimerPage已经在启动时注册到Jit对象了
import { Jit } from 'jit';

// 动态继承：从Jit对象获取TimerPage类
class ExamTimerPage extends Jit.TimerPage {
    private answers: Map<string, string> = new Map();
    private autoSaveTimer?: ReturnType<typeof window.setInterval>;
    private examId: string = 'exam_001'; // 添加examId属性

    constructor(options: any) {
        super(options);

        // 考试页面的特定配置
        this.config = {
            duration: 7200,      // 2小时
            autoStart: false,    // 需要考生点击开始
            warnAt: 300,         // 最后5分钟警告
            theme: 'exam'
        };
    }

    // 重写开始方法，添加自动保存
    start(): void {
        super.start();

        // 每30秒自动保存答案
        this.autoSaveTimer = setInterval(() => {
            this.saveAnswers();
        }, 30000);
    }

    // 重写警告方法
    onWarning(): void {
        // 不只是console.log了
        this.app.showNotification({
            type: 'warning',
            message: '考试时间仅剩5分钟，请注意保存！'
        });

        // 高亮显示计时器
        this.publishEvent('HIGHLIGHT_TIMER');
    }

    // 重写结束方法
    onTimeout(): void {
        // 强制提交试卷
        this.submitExam();

        // 跳转到结果页
        this.app.navigate('/exam/result');
    }

    // 重写pause方法，停止自动保存
    pause(): void {
        super.pause();
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = undefined;
        }
    }

    // 考试特有的方法
    saveAnswers(): void {
        const data = Array.from(this.answers.entries());
        this.app.request('saveExamProgress', { answers: data });
    }

    submitExam(): void {
        // 停止自动保存
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = undefined;
        }

        this.saveAnswers();
        this.app.request('submitExam', {
            examId: this.examId,
            duration: this.duration - this.remaining // 使用继承的protected属性
        });
    }
}

// 导出遵循规范
const PageCls = ExamTimerPage;
export { ExamTimerPage as default, PageCls };
```

看到了吗？通过动态继承，考试计时器：
- **复用了**计时器的核心逻辑（通过`Jit.TimerPage`）
- **扩展了**自动保存、强制提交等考试特性
- **重写了**警告和结束的行为
- **无需关心**TimerPage的具体位置

这就是Type机制的魅力 - **在复用和定制之间找到完美平衡**。

实际上，JitAi内置的页面类型也是这样工作的：
- `Jit.BasePage` - 所有页面的基类
- `Jit.GridPage` - 常规页面使用的类
- `Jit.DataManagePage` - 数据管理页面使用的类

你的TimerPage也成为了这个家族的一员：`Jit.TimerPage`！

![在可视化编辑器中可以看到](./img/3/完成后可以在页面中看到.png)

经过上面的步骤，你可以在可视化编辑器中看到新建的页面类型了。

## 让Type在IDE中可配置

到这里，我们的TimerPageType已经可以工作了。但如何让其他开发者在IDE中方便地创建计时器页面呢？这需要三个配套工具。

### DefineEditor - 让创建变得简单

DefineEditor是为页面Type提供可视化创建界面的元素。可视化编辑器中点击创建会唤起这个组件，效果如下：

![定义编辑器](./img/3/定义编辑器.png)

它需要特殊的e.json配置：
```json title="pages/TimerPageType/DefineEditor/e.json"
{
    "type": "editors.React",
    "title": "Timer Page Type Definition Editor",
    "targetType": ["pages.TimerPageType"],
    "tag": "defineEditor",
    "outputName": "index",
    "frontBundleEntry": "./index.ts"
}
```

**关键配置说明：**
- `type`: 必须为 `"editors.React"`，标识这是一个React编辑器元素
- `targetType`: 数组格式，指定此编辑器服务的页面Type，这里是 `["pages.TimerPageType"]`
- `tag`: 必须为 `"defineEditor"`，标识这是定义编辑器
- `outputName`: 导出的模块名，通常为 `"index"`
- `frontBundleEntry`: 前端入口文件路径

```tsx title="pages/TimerPageType/DefineEditor/Editor.tsx"
import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Divider, Button } from 'antd';

interface TimerDefineEditorProps {
    onSave: (data: any) => void;
    onCancel: () => void;
}

const TimerDefineEditor: React.FC<TimerDefineEditorProps> = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        path: 'pages', // 添加默认路径
        duration: 3600,
        theme: 'work',
        autoStart: false
    });

    const handleSave = () => {
        // 验证必填字段
        if (!formData.name || !formData.title) {
            alert('请填写页面标识和标题');
            return;
        }
        onSave(formData);
    };

    return (
        <div>
            <Form layout="vertical">
                <Divider>基本信息</Divider>

                <Form.Item label="页面标识" required>
                    <Input
                        placeholder="如：mathExamTimer"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </Form.Item>

                <Form.Item label="页面标题" required>
                    <Input
                        placeholder="如：数学考试倒计时"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                </Form.Item>

                <Divider>计时器配置</Divider>

                <Form.Item label="计时时长（秒）">
                    <InputNumber
                        min={1}
                        value={formData.duration}
                        onChange={v => setFormData({...formData, duration: v || 3600})}
                        style={{ width: '100%' }}
                    />
                    <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                        当前设置：{Math.floor(formData.duration / 60)} 分钟
                    </div>
                </Form.Item>

                <Form.Item label="主题风格">
                    <Select
                        value={formData.theme}
                        onChange={v => setFormData({...formData, theme: v})}
                    >
                        <Select.Option value="exam">考试（红色警示）</Select.Option>
                        <Select.Option value="game">游戏（绿色活力）</Select.Option>
                        <Select.Option value="work">工作（蓝色专业）</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="自动开始">
                    <Switch
                        checked={formData.autoStart}
                        onChange={v => setFormData({...formData, autoStart: v})}
                    />
                    <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                        页面加载后是否自动开始计时
                    </div>
                </Form.Item>
            </Form>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
                <Button onClick={onCancel} style={{ marginRight: 8 }}>取消</Button>
                <Button type="primary" onClick={handleSave}>确定</Button>
            </div>
        </div>
    );
};

export default TimerDefineEditor;
```

### API - 生成正确的代码

API元素为页面Type提供增删改查接口。它也需要特殊的e.json配置：

```json title="pages/TimerPageType/Api/e.json"
{
    "title": "Timer Page Type API",
    "type": "elementApis.Meta",
    "targetType": "pages.TimerPageType",
    "functionList": [
        {
            "name": "create",
            "title": "create",
            "args": []
        },
        {
            "name": "update",
            "title": "Edit",
            "args": []
        }
    ],
    "outputName": "index",
    "frontBundleEntry": "./index.ts"
}
```

**关键配置说明：**
- `type`: 必须为 `"elementApis.Meta"`，标识这是一个API元素
- `targetType`: 字符串格式，指定此API服务的目标类型，这里是 `"pages.TimerPageType"`
- `functionList`: 数组，定义API提供的函数列表
  - `name`: 函数名，对应实际的导出函数
  - `title`: 显示名称，在IDE中展示给用户
  - `args`: 参数列表，这里为空数组表示参数由函数内部处理
- `outputName`: 导出的模块名，通常为 `"index"`
- `frontBundleEntry`: 前端入口文件路径

```typescript title="pages/TimerPageType/Api/create.ts"
import { getRuntimeApp } from 'jit';

interface CreateFormData {
    name: string;
    title: string;
    path: string;
    duration: number;
    theme: string;
    autoStart: boolean;
}

export default async function create(formData: CreateFormData) {
    const app = getRuntimeApp();
    const { name, title, path, duration, theme, autoStart } = formData;
    const fullName = `${path}.${name}`;

    // 生成页面代码 - 注意使用Jit.TimerPage而不是import
    const code = `import { Jit } from 'jit';

class ${name}Page extends Jit.TimerPage {
    constructor(options) {
        super(options);
        this.config = {
            duration: ${duration},
            theme: '${theme}',
            autoStart: ${autoStart}
        };
    }
}

const PageCls = ${name}Page;
export { ${name}Page as default, PageCls };
`;

    // 生成e.json配置
    const eJsonContent = {
        title,
        type: 'pages.TimerPageType',
        frontBundleEntry: './index.ts'
    };

    // 保存到文件系统
    await app.saveElement([{
        ePath: `${fullName.split('.').join('/')}/e.json`,
        define: eJsonContent,
        resources: {
            'index.ts': code,
            'e.json': JSON.stringify(eJsonContent, null, 2)
        }
    }]);

    return {
        fullName,
        title,
        name,
        type: 'pages.TimerPageType'
    };
}
```

### Editor - 让修改更方便

编辑器元素是可选的。如果您没有为您的页面Type定义专门的编辑器，系统会自动使用通用的代码编辑器作为兜底。通用编辑器提供了基本的源码编辑功能，包括语法高亮、代码提示和文件管理等。效果如下：

![默认编辑器效果](./img/3/兜底的编辑器.png)]

当然，如果您希望为用户提供更专业的编辑体验，可以根据自己页面Type的特点设计专门的编辑界面。

#### 编辑器核心API

JitAi提供了两个核心API来支持编辑器开发：

**1. 获取源码**
```typescript
// 获取元素的所有源码文件
const resources = await app.services.ElementSvc.getElementResource(
    fullName,    // 元素完整名称
    [],          // 忽略的文件列表
    [],          // 指定获取的文件列表（空数组表示获取所有）
    true         // 是否需要扩展信息
);
// 返回格式：{ 'index.ts': '文件内容', 'config.json': '配置内容', ... }
```

**2. 保存源码**
```typescript
// 保存修改后的源码文件
await app.saveElementResource(
    fullName,      // 元素完整名称
    elementFiles   // 文件内容对象：{ '文件名': '文件内容' }
);
```

#### 编辑器设计建议

- **多文件支持**：使用Tabs组件支持多个文件的编辑
- **语法高亮**：根据文件扩展名选择合适的语言模式
- **保存检测**：比较原始内容和当前内容，提示未保存的变更
- **错误处理**：优雅处理加载和保存过程中的错误
- **用户体验**：提供刷新、撤销等常用功能

具体的编辑器界面设计完全由开发者根据页面Type的特点自主决定。

## 更多应用场景

除了计时器页面，JitAi的页面Type机制还可以支持许多其他场景：

### 特殊需求类型

- **3D页面**：集成Three.js或Babylon.js
- **实时协作页面**：集成WebSocket或WebRTC
- **移动页面**：针对移动端优化的交互
- **打印页面**：专门用于打印输出
