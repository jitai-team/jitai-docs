---
sidebar_position: 1
slug: local-development-and-debugging
---

# 使用VSCode或PyCharm开发与调试JitAi应用
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本文指导开发者使用桌面版配置本地开发调试环境，以便进行高效的开发与调试。

## 🛠️ 环境准备
:::info 
确保你已经完成了基础安装和配置。如果还未安装，请参考 [下载安装](../../tutorial/download-installation) 章节。
:::

支持多种主流IDE进行本地开发调试，你可以根据个人偏好选择：

- **Visual Studio Code**: 轻量级编辑器，丰富的Python扩展生态
- **PyCharm**: 专业Python IDE，强大的调试和重构功能

## ⚙️ IDE 调试配置
### Visual Studio Code
#### 1. 打开项目
在VSCode中打开安装目录中的JitNode目录：

```shell title="MacOS中的路径"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Windows中的路径"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### 2. 创建调试配置文件
在项目根目录下创建 `.vscode/launch.json` 文件：

:::warning 注意
如果 `.vscode` 目录不存在，请先创建该目录。
:::

<Tabs>
  <TabItem value="vscode-mac" label="🍎 macOS / Linux" default>

```json title=".vscode/launch.json"
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "JitNode Debug",
            "type": "debugpy",
            "request": "launch",
            "program": "${workspaceFolder}/system/jitDebugger.py",
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "pythonPath": "${workspaceFolder}/system/bin/python/bin/python3",
            "justMyCode": true,
            "env": {
                "PYTHONPATH": "${workspaceFolder}/system/bin/python/lib/python3.12/site-packages"
            },
            "stopOnEntry": false,
            "debugOptions": [
                "WaitOnAbnormalExit",
                "WaitOnNormalExit"
            ]
        }
    ]
}
```

  </TabItem>
  <TabItem value="vscode-windows" label="🪟 Windows">

```json title=".vscode/launch.json"
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "JitNode Debug",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/system/jitDebugger.py",
            "console": "integratedTerminal",
            "pythonPath": "${workspaceFolder}/system/bin/python/python.exe",
            "cwd": "${workspaceFolder}",
            "env": {
                "PYTHONPATH": "${workspaceFolder}/system/bin/python/Lib/site-packages"
            },
            "stopOnEntry": false,
            "debugOptions": [
                "WaitOnAbnormalExit",
                "WaitOnNormalExit"
            ]
        }
    ]
}
```

  </TabItem>
</Tabs>

#### 3. 启动调试
1. 点击侧边栏的 **Run and Debug** 图标
2. 选择 **"JitNode Debug"** 配置
3. 点击绿色运行按钮启动调试

### PyCharm
#### 1. 打开项目
在PyCharm中打开安装目录中的JitNode目录：

```shell title="MacOS中的路径"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Windows中的路径"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### 2. 配置系统解释器
在创建运行配置之前，需要先将 JitNode 的 Python 解释器添加到系统解释器列表：

1. **打开解释器设置**：
   - 菜单：`File` → `Settings...` (Windows/Linux) 或 `PyCharm` → `Settings` (macOS)
   - 左侧导航：`Project` → `Python Interpreter`

2. **添加新解释器**：
   - 点击右上角的 → `Add Interpreter`，选择`Add Local Interpreter`
   - 选择 `System Interpreter`
   - 点击 `...` 浏览按钮

3. **选择 JitNode Python 解释器**：

<Tabs>
  <TabItem value="pycharm-interp-mac" label="🍎 macOS / Linux" default>

```
解释器路径: [项目路径]/system/bin/python/bin/python3
```

  </TabItem>
  <TabItem value="pycharm-interp-windows" label="🪟 Windows">

```
解释器路径: [项目路径]\system\bin\python\python.exe
```

  </TabItem>
</Tabs>

4. **应用配置**：
   - 点击 `OK` 确认解释器路径
   - 等待 PyCharm 索引和配置环境
   - 点击 `Apply` 和 `OK` 保存设置

:::tip 解释器验证
添加成功后，你会在解释器列表中看到 JitNode 的 Python 版本信息。如果显示错误，请检查路径是否正确。
:::

#### 3. 创建运行配置
1. **打开运行配置**：
   - 菜单：`Run` → `Edit Configurations...`
   - 或点击右上角运行配置下拉菜单 → `Edit Configurations...`

2. **添加新配置**：
   - 点击 `+` → 选择 `Python`

3. **配置参数**：

<Tabs>
  <TabItem value="pycharm-mac" label="🍎 macOS / Linux" default>

```
Name: JitNode Debug
Script path: [项目路径]/system/jitDebugger.py
Parameters: (留空)
Python interpreter: [项目路径]/system/bin/python/bin/python3
Working directory: [项目路径]
Environment variables:
  PYTHONPATH=[项目路径]/system/bin/python/lib/python3.12/site-packages
```

  </TabItem>
  <TabItem value="pycharm-windows" label="🪟 Windows">

```
Name: JitNode Debug
Script path: [项目路径]\system\jitDebugger.py
Parameters: (留空)
Python interpreter: [项目路径]\system\bin\python\python.exe
Working directory: [项目路径]
Environment variables:
  PYTHONPATH=[项目路径]\system\bin\python\Lib\site-packages
```

  </TabItem>
</Tabs>

#### 4. 启动调试
1. 点击 `OK` 保存配置
2. 选择 "JitNode Debug" 配置
3. 点击绿色运行按钮或按 `Shift+F10` 启动

:::note 注意事项
确保在运行配置的 "Python interpreter" 字段中选择了刚才添加的 JitNode 解释器，而不是系统默认的 Python。
:::

## 📝 配置说明
:::note 通用配置项
- **调试入口**: 统一使用 `system/jitDebugger.py` 文件
- **Python解释器**: 使用 JitNode 内置的 Python 环境
- **工作目录**: 设置为 JitNode 项目根目录
- **环境变量**: 配置 `PYTHONPATH` 指向 JitNode 的 Python 环境
:::

---

完成以上配置后，你就可以进行本地开发调试了！
