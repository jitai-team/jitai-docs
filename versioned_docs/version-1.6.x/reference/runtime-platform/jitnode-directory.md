---
sidebar_position: 3
slug: jitnode-directory
title: "JitNode Directory Reference"
description: "JitNode Directory Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "JitNode Directory"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';

# JitNode Directory
JitNode uses a clear directory structure to organize executable programs and runtime data. Developers should have a basic understanding of JitNode's directory structure for better subsequent development, management, and debugging work.

In the desktop edition, the JitNode directory is located in the installation directory:
```shell title="Path in MacOS"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Path in Windows"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

In the server edition, the JitNode directory is located in the Docker container:

```shell title="Path in Docker Container"
/data/JitNode
```
Typically, when deploying containers, the JitNode directory is mounted to the host machine, and developers can also find the JitNode directory in the corresponding directory on the host machine

## Directory Overview
<Tabs>
  <TabItem value="overview" label="Overview" default>

```
JitNode/
├── runJitNode.cmd/command    # desktop edition one-click startup script
├── home/                     # Runtime data directory
│   ├── version.json          # Version information
│   ├── node.json             # Configuration file
│   ├── environs/             # Runtime environments
│   └── logs/                 # Runtime logs
└── system/                   # Executable program directory
```
  </TabItem>
  
  <TabItem value="home" label="home/ Directory">

## home/ - Runtime Data
In the desktop edition, users can customize the path when running for the first time.
<Details summary="📋 ./ - Configuration Files" open>

```
home/
├── version.json              # Installation package and dependency version information
├── node.json                 # JitNode node configuration file
```

</Details>

<Details summary="🌍 environs/ - Runtime Environments" open>

```
home/environs/
├── JED_xxx1.json            # Node default runtime environment configuration
├── JED_xxx1/                # Application directory for node default runtime environment
│   └── xxxOrg1/             # Development organization ID
│       └── xxxApp/          # Application ID
│           └── 1_0_0/       # Application version number
│               ├── [Source Code]   # Application source code (source code available in development mode)
│               ├── appData/ # Application data
│               └── dist/    # Build artifacts
└── ...
```

:::tip Environment Organization Structure
Adopts a four-level directory structure: **Runtime Environment** → **Development Organization** → **Application** → **Version**
:::

</Details>

<Details summary="📝 logs/ - Runtime Logs" open>

```
home/logs/
├── upgrade.log             # Automatic update logs
├── server.log              # Service runtime logs
└── ...                     # Other log files
```

</Details>

:::warning Docker-Specific Directories
The following directories only exist in Docker containers:
:::

<Details summary="🗄️ databases/ - Built-in Database Files" open>

```
home/databases/
├── redis/
│   ├── redis.config         # Redis configuration file
│   ├── redis.db            # Redis data file
│   └── redis.log           # Redis log file
└── mysql/
    ├── mysql.config        # MySQL configuration file
    ├── mysql.db           # MySQL data file
    └── mysql.log          # MySQL log file
```

</Details>

  </TabItem>
  
  <TabItem value="system" label="system/ Directory">

## system/ - Executable Programs
<Details summary="🔧 bin/ - Third-party Programs" open>

```
system/bin/
├── node/                   # Node.js
├── python/                 # Python
└── ...                     # Other dependency programs
```

</Details>

<Details summary="📚 pyLibraris/ - Python Dependency Libraries for Each Application" open>

```
system/pyLibraris/
└── [Organized by Runtime Environment/Development Organization/Application/Version]
    └── Python dependency libraries for each application version
```

:::note Dependency Isolation
Each application version has independent Python dependency libraries, avoiding version conflicts.
:::

</Details>

<Details summary="🐛 Debugging Tools (Desktop Editon Only)" open>

```
system/
└── jitDebuger.py           # Full code debugging entry point
```

:::tip Debugging Features
The desktop edition provides complete code debugging functionality, supporting breakpoints, variable monitoring, etc. For detailed usage methods, refer to [Local Development and Debugging](../../devguide/advanced-guide/local-development-and-debugging).
:::

</Details>

  </TabItem>
</Tabs>

## Quick Navigation
- **Deploy Applications**: Place applications in the `home/environs/[Environment ID]/[Organization ID]/[Application ID]/[Version]/` directory
- **View Logs**: Check runtime logs in the `home/logs/` directory
- **Debug Code**: Desktop edition uses `system/jitDebuger.py` for debugging. For detailed usage methods, refer to [Local Development and Debugging](../../devguide/advanced-guide/local-development-and-debugging).
- **Configuration Modification**: Edit `home/node.json` to modify JitNode configuration
