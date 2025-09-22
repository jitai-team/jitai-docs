---
sidebar_position: -3
slug: local-development-and-debugging
title: Developing and Debugging JitAi Applications with VSCode or PyCharm
---

# Developing and Debugging JitAi Applications with VSCode or PyCharm
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document guides developers on configuring a local development and debugging environment using the desktop version for efficient development and debugging.

## 🛠️ Environment Setup
:::info 
Ensure you have completed the basic installation and configuration. If not yet installed, please refer to the [Download and Installation](../../tutorial/download-installation) section.
:::

Multiple mainstream IDEs are supported for local development and debugging. You can choose based on your personal preference:

- **Visual Studio Code**: Lightweight editor with rich Python extension ecosystem
- **PyCharm**: Professional Python IDE with powerful debugging and refactoring capabilities

## ⚙️ IDE Debug Configuration
### Visual Studio Code
#### 1. Open Project
Open the JitNode directory from the installation directory in VSCode:

```shell title="Path on macOS"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Path on Windows"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### 2. Create Debug Configuration File
Create a `.vscode/launch.json` file in the project root directory:

:::warning Note
If the `.vscode` directory does not exist, please create it first.
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

#### 3. Start Debugging
1. Click the **Run and Debug** icon in the sidebar
2. Select the **"JitNode Debug"** configuration
3. Click the green run button to start debugging

### PyCharm
#### 1. Open Project
Open the JitNode directory from the installation directory in PyCharm:

```shell title="Path on macOS"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Path on Windows"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### 2. Configure System Interpreter
Before creating a run configuration, you need to add JitNode's Python interpreter to the system interpreter list:

1. **Open Interpreter Settings**:
   - Menu: `File` → `Settings...` (Windows/Linux) or `PyCharm` → `Settings` (macOS)
   - Left navigation: `Project` → `Python Interpreter`

2. **Add New Interpreter**:
   - Click the gear icon in the top right → `Add Interpreter`, select `Add Local Interpreter`
   - Select `System Interpreter`
   - Click the `...` browse button

3. **Select JitNode Python Interpreter**:

<Tabs>
  <TabItem value="pycharm-interp-mac" label="🍎 macOS / Linux" default>

```
Interpreter path: [project path]/system/bin/python/bin/python3
```

  </TabItem>
  <TabItem value="pycharm-interp-windows" label="🪟 Windows">

```
Interpreter path: [project path]\system\bin\python\python.exe
```

  </TabItem>
</Tabs>

4. **Apply Configuration**:
   - Click `OK` to confirm the interpreter path
   - Wait for PyCharm to index and configure the environment
   - Click `Apply` and `OK` to save settings

:::tip Interpreter Verification
After successful addition, you will see JitNode's Python version information in the interpreter list. If errors are displayed, please check if the path is correct.
:::

#### 3. Create Run Configuration
1. **Open Run Configuration**:
   - Menu: `Run` → `Edit Configurations...`
   - Or click the run configuration dropdown in the top right → `Edit Configurations...`

2. **Add New Configuration**:
   - Click `+` → Select `Python`

3. **Configure Parameters**:

<Tabs>
  <TabItem value="pycharm-mac" label="🍎 macOS / Linux" default>

```
Name: JitNode Debug
Script path: [project path]/system/jitDebugger.py
Parameters: (leave empty)
Python interpreter: [project path]/system/bin/python/bin/python3
Working directory: [project path]
Environment variables:
  PYTHONPATH=[project path]/system/bin/python/lib/python3.12/site-packages
```

  </TabItem>
  <TabItem value="pycharm-windows" label="🪟 Windows">

```
Name: JitNode Debug
Script path: [project path]\system\jitDebugger.py
Parameters: (leave empty)
Python interpreter: [project path]\system\bin\python\python.exe
Working directory: [project path]
Environment variables:
  PYTHONPATH=[project path]\system\bin\python\Lib\site-packages
```

  </TabItem>
</Tabs>

#### 4. Start Debugging
1. Click `OK` to save the configuration
2. Select the "JitNode Debug" configuration
3. Click the green run button or press `Shift+F10` to start

:::note Important Notes
Ensure that the JitNode interpreter you just added is selected in the "Python interpreter" field of the run configuration, not the system default Python.
:::

## 📝 Configuration Description
:::note Common Configuration Items
- **Debug Entry Point**: Uniformly use the `system/jitDebugger.py` file
- **Python Interpreter**: Use JitNode's built-in Python environment
- **Working Directory**: Set to JitNode project root directory
- **Environment Variables**: Configure `PYTHONPATH` to point to JitNode's Python environment
:::

---

After completing the above configuration, you can proceed with local development and debugging!
