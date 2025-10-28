---
sidebar_position: 1
slug: local-development-and-debugging
description: "Develop and debug JitAi applications with VSCode or PyCharm. Set up local environment, configure IDE, and debug Python backend code."
---

# Developing and Debugging JitAi Applications With VSCode or PyCharm
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks you through setting up a local development and debugging environment using the desktop version of JitAi for efficient application development.

## 🛠️ Environment setup {#environment-setup}
:::info 
Ensure you have completed the basic installation and configuration. If not yet installed, refer to the [Download and Installation](../../tutorial/download-installation) guide.
:::

JitAi supports multiple mainstream IDEs for local development and debugging. Choose the one that best suits your workflow:

- **Visual Studio Code**: A lightweight editor with a rich Python extension ecosystem
- **PyCharm**: A professional Python IDE with powerful debugging and refactoring capabilities

## ⚙️ IDE debug configuration {#ide-debug-configuration}
### Visual Studio Code {#visual-studio-code}
#### Opening the project {#opening-the-project-vscode}
Open the JitNode directory from your JitAi installation directory in VSCode:

```shell title="Path on macOS"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Path on Windows"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### Creating the debug configuration file {#creating-debug-config-vscode}
Create a `.vscode/launch.json` file in the project root directory:

:::warning Note
If the `.vscode` directory does not exist, create it first.
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

#### Starting the debugger {#starting-debugger-vscode}
1. Click the **Run and Debug** icon in the sidebar
2. Select the **"JitNode Debug"** configuration
3. Click the green run button to start debugging

### PyCharm {#pycharm}
#### Opening the project {#opening-the-project-pycharm}
Open the JitNode directory from your JitAi installation directory in PyCharm:

```shell title="Path on macOS"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Path on Windows"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

#### Configuring the system interpreter {#configuring-system-interpreter}
Before creating a run configuration, add JitNode's Python interpreter to the system interpreter list:

1. **Open interpreter settings**:
   - Menu: `File` → `Settings...` (Windows/Linux) or `PyCharm` → `Settings` (macOS)
   - Left navigation: `Project` → `Python Interpreter`

2. **Add new interpreter**:
   - Click the gear icon in the top right → `Add Interpreter`, then select `Add Local Interpreter`
   - Select `System Interpreter`
   - Click the `...` browse button

3. **Select JitNode Python interpreter**:

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

4. **Apply configuration**:
   - Click `OK` to confirm the interpreter path
   - Wait for PyCharm to index and configure the environment
   - Click `Apply` and `OK` to save the settings

:::tip Interpreter verification
After successful addition, you should see JitNode's Python version information in the interpreter list. If errors appear, verify that the path is correct.
:::

#### Creating the run configuration {#creating-run-config-pycharm}
1. **Open run configuration**:
   - Menu: `Run` → `Edit Configurations...`
   - Or click the run configuration dropdown in the top right → `Edit Configurations...`

2. **Add new configuration**:
   - Click `+` → Select `Python`

3. **Configure parameters**:

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

#### Starting the debugger {#starting-debugger-pycharm}
1. Click `OK` to save the configuration
2. Select the "JitNode Debug" configuration
3. Click the green run button or press `Shift+F10` to start

:::note Important
Ensure that you select the JitNode interpreter you just added in the "Python interpreter" field of the run configuration, not the system's default Python.
:::

## 📝 Configuration overview {#configuration-overview}
:::note Common configuration items
- **Debug entry point**: Always use the `system/jitDebugger.py` file
- **Python interpreter**: Use JitNode's built-in Python environment
- **Working directory**: Set to the JitNode project root directory
- **Environment variables**: Configure `PYTHONPATH` to point to JitNode's Python environment
:::

---

After completing the above configuration, you're ready to begin local development and debugging!
