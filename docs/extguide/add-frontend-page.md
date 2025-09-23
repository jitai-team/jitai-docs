---
sidebar_position: 3
slug: add-frontend-page-type-complete
---

# 开发自定义页面Type

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

现在我们理解了原理，让我们开始开发一个计时器页面Type。这个过程会让你真正体会到JitAi的强大。

### 页面Type的完整组成

在开始编码前，让我们先了解一个完整的页面Type需要哪些组件：

| 组成部分 | 运行环境 | 主要职责 | 文件位置 |
|---------|----------|----------|----------|
| **Type元素本体** | 使用区 | 定义页面类(PageCls)和渲染组件(Render) | `pages/TimerPageType/frontend/` |
| **元素定义配置器** | IDE | 提供创建页面的可视化表单 | `IDEAppFront/pages/TimerPageType/DefineEditor/` |
| **增删改API** | IDE | 根据配置生成页面实例代码 | `IDEAppFront/pages/TimerPageType/Api/` |
| **元素编辑器** | IDE | 提供代码编辑界面 | `IDEAppFront/pages/TimerPageType/Editor/` |

这些组件分工明确：
- **使用区组件**：负责页面的实际运行和渲染
- **IDE组件**：负责页面的创建、配置和编辑

### 第一步：规划目录结构

一个完整的页面Type需要在两个地方创建文件：

```bash
# 使用区：页面运行时文件
pages/
└── TimerPageType/
    └── frontend/
        ├── e.json           # 元素定义，标记loadTime: "startUp"
        ├── index.ts         # 入口文件，导出PageCls和Render
        ├── TimerPage.ts     # 页面类，继承Jit.BasePage
        └── Render.tsx       # 渲染组件

# IDE端：开发工具文件
IDEAppFront/pages/TimerPageType/
├── DefineEditor/           # 创建配置器
│   └── Editor.tsx
├── Api/                   # 增删改接口
│   ├── index.ts
│   ├── create.ts
│   └── update.ts
└── Editor/                # 代码编辑器
    └── index.tsx
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

```typescript title="pages/TimerPageType/frontend/TimerPage.ts"
import { Jit } from 'jit';

// 这是Type层的页面类，定义计时器页面的通用能力
export class TimerPage extends Jit.BasePage {
    private duration: number = 0;
    private remaining: number = 0;
    private timerId?: NodeJS.Timeout;
    private status: 'idle' | 'running' | 'paused' | 'finished' = 'idle';

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
    start() {
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

    pause() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.status = 'paused';
            this.publishEvent('TIMER_PAUSED');
        }
    }

    finish() {
        this.pause();
        this.status = 'finished';
        this.publishEvent('TIMER_FINISHED');
        this.onTimeout();
    }

    // 可被实例重写的钩子方法
    onWarning() {
        console.log('时间即将结束！');
    }

    onTimeout() {
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
}
```

注意这里的设计思路：
- **Type定义通用能力**：所有计时器都需要的start、pause、finish
- **预留扩展点**：onWarning、onTimeout可以被实例重写
- **事件驱动**：通过事件让UI和逻辑解耦
- **继承BasePage**：获得页面的基础能力（生命周期、事件系统等）

### 第四步：创建渲染组件

```tsx title="pages/TimerPageType/frontend/Render.tsx"
import React, { useState, useEffect } from 'react';
import { Progress, Button, Card, Typography } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const TimerRender: React.FC<{ page: TimerPage }> = ({ page }) => {
    const [remaining, setRemaining] = useState(page.getRemaining());
    const [percentage, setPercentage] = useState(100);
    const [status, setStatus] = useState(page.getStatus());

    useEffect(() => {
        // 监听计时器事件
        const handlers = {
            TIMER_TICK: (data) => {
                setRemaining(data.remaining);
                setPercentage(data.percentage);
            },
            TIMER_PAUSED: () => setStatus('paused'),
            TIMER_FINISHED: () => {
                setStatus('finished');
                setPercentage(0);
            }
        };

        Object.entries(handlers).forEach(([event, handler]) => {
            page.on(event, handler);
        });

        // 如果配置了自动开始
        if (page.config?.autoStart) {
            page.start();
        }

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                page.off(event, handler);
            });
        };
    }, [page]);

    const getThemeColor = () => {
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
                        icon={<PlayCircleOutlined />}
                        onClick={() => page.start()}
                    >
                        {status === 'idle' ? '开始' : '继续'}
                    </Button>
                ) : status === 'running' ? (
                    <Button
                        size="large"
                        icon={<PauseCircleOutlined />}
                        onClick={() => page.pause()}
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

```typescript title="pages/TimerPageType/frontend/index.ts"
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

```json title="pages/TimerPageType/frontend/e.json"
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
    private autoSaveTimer?: NodeJS.Timeout;

    constructor(options) {
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
    start() {
        super.start();

        // 每30秒自动保存答案
        this.autoSaveTimer = setInterval(() => {
            this.saveAnswers();
        }, 30000);
    }

    // 重写警告方法
    onWarning() {
        // 不只是console.log了
        this.app.showNotification({
            type: 'warning',
            message: '考试时间仅剩5分钟，请注意保存！'
        });

        // 高亮显示计时器
        this.publishEvent('HIGHLIGHT_TIMER');
    }

    // 重写结束方法
    onTimeout() {
        // 强制提交试卷
        this.submitExam();

        // 跳转到结果页
        this.app.navigate('/exam/result');
    }

    // 考试特有的方法
    saveAnswers() {
        const data = Array.from(this.answers.entries());
        this.app.request('saveExamProgress', { answers: data });
    }

    submitExam() {
        this.saveAnswers();
        this.app.request('submitExam', {
            examId: this.examId,
            duration: this.duration - this.remaining
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

## 让Type在IDE中可配置

到这里，我们的TimerPageType已经可以工作了。但如何让其他开发者在IDE中方便地创建计时器页面呢？这需要三个配套工具。

### DefineEditor - 让创建变得简单

```tsx title="IDEAppFront/pages/TimerPageType/DefineEditor/Editor.tsx"
import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Divider } from 'antd';

const TimerDefineEditor: React.FC = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        duration: 3600,
        theme: 'work',
        autoStart: false
    });

    return (
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
                    onChange={v => setFormData({...formData, duration: v})}
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
    );
};
```

### API - 生成正确的代码

```typescript title="IDEAppFront/pages/TimerPageType/Api/create.ts"
export default async function create(formData) {
    const { name, title, duration, theme, autoStart } = formData;

    // 生成页面代码
    const code = `
import { TimerPage } from '../TimerPageType/frontend/TimerPage';

class ${name}Page extends TimerPage {
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

    // 保存到文件系统
    await app.saveElement([{
        ePath: `pages/${name}/e.json`,
        define: {
            title,
            type: 'pages.TimerPageType',
            frontBundleEntry: './index.ts'
        },
        resources: {
            'index.ts': code
        }
    }]);
}
```

### Editor - 让修改更方便

编辑器让开发者可以进一步定制生成的代码，添加业务逻辑。

## 更多应用场景

除了计时器页面，JitAi的页面Type机制还可以支持许多其他场景：

### 技术栈支持类型

| Type名称 | 适用场景 | 核心特性 | 自定义Loader |
|---------|---------|---------|-------------|
| **VueType** | Vue团队项目 | 在React中嵌入Vue | ✅ 传递DOM元素 |
| **NormalType** | 纯React开发 | 简化加载流程 | ✅ 简化HOC |
| **GridPageType** | 低代码开发 | 拖拽式配置 | ❌ 使用Meta loader |
| **MarkdownType** | 文档展示 | Markdown渲染 | ❌ 使用Meta loader |

### 业务场景特化类型

```typescript
// 数据大屏页面
class DashboardPage extends Jit.BasePage {
    charts: ChartConfig[];
    refreshInterval: number;
    dataSource: DataSource;
}

// 表单页面
class FormPage extends Jit.BasePage {
    fields: FormField[];
    validation: ValidationRules;
    submitHandler: SubmitFunction;
}

// 游戏页面
class GamePage extends Jit.BasePage {
    gameEngine: GameEngine;
    renderLoop: AnimationLoop;
    inputHandler: InputController;
}
```

### 特殊需求类型

- **3D页面**：集成Three.js或Babylon.js
- **实时协作页面**：集成WebSocket或WebRTC
- **移动页面**：针对移动端优化的交互
- **打印页面**：专门用于打印输出

## 系统设计的巧思

让我们回过头来，欣赏一下JitAi设计的巧妙之处。

### 1. Loader机制 - 灵活性的基石

还记得开头的loader查找链吗？这个设计让：
- **VueType** 可以改变渲染方式，在React中嵌入Vue
- **NormalType** 可以简化加载流程，去除不需要的功能
- **GridPageType** 可以注入配置解析逻辑

每个Type都可以定制自己的加载方式，而不影响其他Type。

### 2. 三层架构 - 关注点分离

```
Meta元素：我提供基础设施（BasePage、生命周期、事件系统）
Type元素：我定义页面类型（计时器应该有哪些功能）
实例元素：我实现具体业务（这是一个数学考试计时器）
```

每一层都有明确的职责，修改一层不会影响其他层。

### 3. 事件驱动 - 解耦的艺术

```typescript
// 页面逻辑不关心UI如何展示
page.publishEvent('TIMER_TICK', { remaining: 59 });

// UI不关心逻辑如何计算
page.on('TIMER_TICK', (data) => {
    updateDisplay(data.remaining);
});
```

通过事件，逻辑和展示完全解耦，可以独立演化。

### 4. 配置与代码分离

```typescript
// Type定义配置结构
config?: {
    duration: number;
    theme: string;
}

// 实例提供配置数据
this.config = {
    duration: 7200,
    theme: 'exam'
}

// 渲染根据配置展示
<div className={config.theme}>
```

配置驱动让同一个Type可以适应不同场景。

配置驱动让同一个Type可以适应不同场景。

通过开发计时器页面Type，我们见证了JitAi设计的精妙：
- **Loader机制**让不同技术栈和谐共存
- **动态继承**让代码组织更加灵活
- **事件系统**让逻辑和UI优雅分离
- **三层架构**让复杂系统井然有序

现在，你的TimerPage已经成为了JitAi生态的一部分，其他开发者可以通过`Jit.TimerPage`使用它，就像使用内置的`Jit.BasePage`一样自然。

**好的框架不是限制你能做什么，而是帮助你更容易地做任何事。**
