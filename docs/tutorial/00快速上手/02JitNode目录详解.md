---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';

# JitNode目录详解

:::info 目录概览
JitNode 采用清晰的目录结构来组织运行时数据、执行程序和应用代码，便于管理和维护。
:::

## 📁 根目录结构

<Tabs>
  <TabItem value="overview" label="目录总览" default>

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

:::note 平台说明
- **桌面版**：包含 `runJitNode.cmd/command` 启动脚本
- **Docker版**：包含额外的 `databases/` 目录
:::

  </TabItem>
  
  <TabItem value="home" label="home/ 目录">

## 🏠 home/ - 运行时数据

<Details summary="📋 配置文件">

```
home/
├── version.json              # 安装包版本定义
├── node.json                 # JitNode 配置文件
```

- **version.json**: 记录当前安装包的版本信息
- **node.json**: JitNode 的核心配置参数

</Details>

<Details summary="🌍 environs/ - 运行环境">

```
home/environs/
├── JED_xxx1.json            # 环境ID: JED_xxx1 的配置
├── JED_xxx1/                # 环境ID: JED_xxx1 的程序目录
│   └── xxxOrg1/             # 开发组织ID
│       └── xxxApp/          # 应用ID
│           └── 1_0_0/       # 应用版本号
│               ├── [源码]   # 应用源代码
│               ├── appData/ # 应用数据
│               └── dist/    # 可执行程序
├── JEN_xxx2.json
├── JEN_xxx2/
└── ...
```

:::tip 环境组织结构
采用四级目录结构：**运行环境** → **开发组织** → **应用** → **版本**
:::

</Details>

<Details summary="📝 logs/ - 运行日志">

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

<Details summary="🗄️ databases/ - 内置数据库 (仅Docker)">

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

## ⚙️ system/ - 执行程序

<Details summary="🔧 bin/ - 第三方程序">

```
system/bin/
├── node/                   # Node.js 运行环境
├── python/                 # Python 运行环境
└── ...                     # 其他依赖程序
```

:::info 依赖管理
JitNode 自带完整的运行环境，无需额外安装 Node.js 或 Python。
:::

</Details>

<Details summary="📚 pyLibraris/ - Python依赖库">

```
system/pyLibraris/
└── [按运行环境/开发组织/应用/版本组织]
    └── 各应用版本的Python依赖库
```

:::note 依赖隔离
每个应用版本都有独立的Python依赖库，避免版本冲突。
:::

</Details>

<Details summary="🐛 调试工具 (仅桌面版)">

```
system/
└── jitDebuger.py           # 全代码调试入口
```

:::tip 调试功能
桌面版提供完整的代码调试功能，支持断点、变量监控等。
:::

</Details>

  </TabItem>
</Tabs>

## 🚀 快速导航

:::success 开发者指南
- **部署应用**: 将应用放在 `home/environs/[环境ID]/[组织ID]/[应用ID]/[版本]/` 目录下
- **查看日志**: 可在 `home/logs/` 目录查看运行日志
- **调试代码**: 桌面版使用 `system/jitDebuger.py` 进行调试
- **配置修改**: 编辑 `home/node.json` 修改JitNode配置
:::





