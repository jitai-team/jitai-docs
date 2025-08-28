---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';

# JitNode目录

JitNode 采用清晰的目录结构来组织执行程序和运行时数据，开发者应对JitNode的目录结构有基本的了解，以便更好地进行后续开发、管理、调试工作。

在桌面版中，JitNode目录位于安装目录中：
```shell title="MacOS中的路径"
/Applications/Jit.app/Contents/Resources/app.asar.unpacked/JitNode
```

```shell title="Windows中的路径"
C:\Program Files\jit\resources\app.asar.unpacked\JitNode
```

在服务器版中，JitNode目录位于Docker容器中：

```shell title="Docker容器中的路径"
/data/JitNode
```
通常在部署容器时会将JitNode目录挂载到宿主机中，开发者在宿主机对应目录下也可以找到JitNode目录

## 目录总览

<Tabs>
  <TabItem value="overview" label="总览" default>

```
JitNode/
├── runJitNode.cmd/command    # 桌面版一键启动脚本
├── home/                     # 运行时数据目录
│   ├── version.json          # 版本信息
│   ├── node.json             # 配置文件
│   ├── environs/             # 运行环境
│   └── logs/                 # 运行日志
└── system/                   # 执行程序目录
```
  </TabItem>
  
  <TabItem value="home" label="home/ 目录">

## home/ - 运行时数据
在桌面版中，用户首次运行时可以自定义路径。
<Details summary="📋 ./ - 配置文件" open>

```
home/
├── version.json              # 安装包以及依赖项版本信息
├── node.json                 # JitNode节点配置文件
```

</Details>

<Details summary="🌍 environs/ - 运行环境" open>

```
home/environs/
├── JED_xxx1.json            # 节点默认运行环境配置
├── JED_xxx1/                # 节点默认运行环境的应用目录
│   └── xxxOrg1/             # 开发组织ID
│       └── xxxApp/          # 应用ID
│           └── 1_0_0/       # 应用版本号
│               ├── [源码]   # 应用源代码（开发模式下有源码）
│               ├── appData/ # 应用数据
│               └── dist/    # 构建产物
└── ...
```

:::tip 环境组织结构
采用四级目录结构：**运行环境** → **开发组织** → **应用** → **版本**
:::

</Details>

<Details summary="📝 logs/ - 运行日志" open>

```
home/logs/
├── upgrade.log             # 自动更新日志
├── server.log              # 服务运行日志
└── ...                     # 其他日志文件
```

</Details>

:::warning Docker 专用目录
以下目录仅在 Docker 容器中存在：
:::

<Details summary="🗄️ databases/ - 内置数据库的文件" open>

```
home/databases/
├── redis/
│   ├── redis.config         # Redis 配置文件
│   ├── redis.db            # Redis 数据文件
│   └── redis.log           # Redis 日志文件
└── mysql/
    ├── mysql.config        # MySQL 配置文件
    ├── mysql.db           # MySQL 数据文件
    └── mysql.log          # MySQL 日志文件
```

</Details>

  </TabItem>
  
  <TabItem value="system" label="system/ 目录">

## system/ - 执行程序

<Details summary="🔧 bin/ - 第三方程序" open>

```
system/bin/
├── node/                   # Node.js
├── python/                 # Python
└── ...                     # 其他依赖程序
```

</Details>

<Details summary="📚 pyLibraris/ - 各应用的Python依赖库" open>

```
system/pyLibraris/
└── [按运行环境/开发组织/应用/版本组织]
    └── 各应用版本的Python依赖库
```

:::note 依赖隔离
每个应用版本都有独立的Python依赖库，避免版本冲突。
:::

</Details>

<Details summary="🐛 调试工具 (仅桌面版)" open>

```
system/
└── jitDebuger.py           # 全代码调试入口
```

:::tip 调试功能
桌面版提供完整的代码调试功能，支持断点、变量监控等，详细使用方法参考[本地开发与调试](../../devguide/进阶指南/本地开发与调试.md)。
:::

</Details>

  </TabItem>
</Tabs>

## 快速导航

- **部署应用**: 将应用放在 `home/environs/[环境ID]/[组织ID]/[应用ID]/[版本]/` 目录下
- **查看日志**: 可在 `home/logs/` 目录查看运行日志
- **调试代码**: 桌面版使用 `system/jitDebuger.py` 进行调试，详细使用方法参考[本地开发与调试](../../devguide/进阶指南/本地开发与调试.md)。
- **配置修改**: 编辑 `home/node.json` 修改JitNode配置





