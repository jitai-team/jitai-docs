---
sidebar_position: 2
slug: download-installation
description: "下载安装JitAI - 支持Windows、macOS和Docker。完整的安装指南，包括激活、服务器部署和环境配置。"
---

# 下载安装

JitAI 安装方式分为桌面版（支持 Windows、macOS）和服务器版（基于 Docker 部署）。

## 桌面版

用于开发者在个人电脑上开发、运行、调试、发布应用。

根据操作系统类型，桌面版分为 Windows 安装包 和  Mac 安装包。

### Windows

适用于 Windows 10（64 位）、Windows 11 （64 位）的操作系统。

安装步骤：

1. <a href="https://apk.jit.pro/latest/windows/JitAI-installer.exe" className="analytics-downloadWindows">点击此处下载</a>安装包。
2. 双击exe文件安装。
3. 按页面流程激活。 阅读[开发者团队管理](../devguide/installation-activation/developer-team-management)了解更多细节。

### Mac

适用于 MacOS 12.6.0 (Monterey) 及以上版本。

安装步骤：

1. 下载安装包： <a href="https://apk.jit.pro/latest/darwin/arm/JitAI-installer-apple.dmg" className="analytics-downloadMac analytics-downloadMacApple">Apple芯片安装包</a> 或 <a href="https://apk.jit.pro/latest/darwin/x64/JitAI-installer-intel.dmg" className="analytics-downloadMac analytics-downloadMacIntel">Intel芯片安装包</a>
2. 双击dmg文件安装。
3. 按页面流程激活。阅读[开发者团队管理](../devguide/installation-activation/developer-team-management)了解更多细节。

:::warning
如果提示安全性问题，点击"完成"按钮，进入系统设置->隐私与安全性->安全性，将"允许以下来源的应用程序"设置为"App Store与已知开发者"，点击`仍要打开`。
![Apple安全验证问题](./img/openanyway.gif)

:::

## 服务器版

用于在服务器环境中运行应用系统，支持多进程、集群和高性能部署，适合作为测试环境和生产环境。服务器版也支持在线开发，但不支持后端代码调试。

### 快速安装

1. 按 [Docker 官方文档](https://docs.docker.com/manuals/)安装 Docker。
2. 确认系统已安装 Docker Compose。JitAI 优先使用 `docker compose` v2 插件，也兼容旧版 `docker-compose`。
3. 运行一键安装脚本：

   ```bash
   curl -fsSL https://setup.jit.pro/install-jitai.sh | sudo sh
   ```

   脚本会自动下载部署包，检查 Docker 和 Docker Compose，并启动 MySQL、Redis、配置初始化服务以及 JitAI 平台服务。

4. 在浏览器中访问 `http://{服务器IP地址}:80`，按页面流程激活。阅读[开发者团队管理](../devguide/installation-activation/developer-team-management)了解更多细节。

### 默认目录

当你需要备份数据、查看运行文件或自定义服务器部署时，下面这些目录最常用。

| 用途 | 路径 |
| --- | --- |
| 部署包目录 | `/opt/jitai` |
| 平台配置目录 | `/data/JitNode/home` |
| 平台运行环境与应用源码目录 | `/data/JitNode/home/environs` |
| MySQL 数据目录 | `/data/JitNode/databases/mysql/db` |
| Redis 数据目录 | `/data/JitNode/databases/redis/db` |

### 高阶部署配置

如果你需要自定义端口、密码、数据目录或 Compose 文件，可以直接使用部署包并修改配置文件。

JitAI 服务器版通常有两种部署方式：

- **全家桶模式**：包含 MySQL、Redis、配置初始化服务和 JitAI 平台服务
- **生产模式**：只部署 JitAI 平台服务，需要自行维护外部 MySQL、Redis 和已有的 `node.json`

在这些场景下，最常需要调整的文件包括：

- `deploy/.env`
- `deploy/docker-compose.yml`
- `deploy/docker-compose.prod.yml`
- `/data/JitNode/home/node.json`

### 环境变量

Docker Compose 会自动读取 `deploy/.env`。

- **全家桶模式**会使用 MySQL、Redis 和应用级变量。
- **生产模式**只使用应用级变量；MySQL 和 Redis 的连接信息由 `/data/JitNode/home/node.json` 维护。

| 变量 | 使用场景 | 说明 |
| --- | --- | --- |
| `MYSQL_ROOT_PASSWORD` | 全家桶模式 | 内置 MySQL 服务的 root 密码 |
| `MYSQL_USER` | 全家桶模式 | MySQL 用户名 |
| `MYSQL_PORT` | 全家桶模式 | MySQL 对宿主机暴露的端口 |
| `MYSQL_DATA_DIR` | 全家桶模式 | MySQL 数据在宿主机上的存储目录 |
| `REDIS_PASSWORD` | 全家桶模式 | 内置 Redis 服务的密码 |
| `REDIS_PORT` | 全家桶模式 | Redis 对宿主机暴露的端口 |
| `REDIS_DATA_DIR` | 全家桶模式 | Redis 数据在宿主机上的存储目录 |
| `CONFIG_DIR` | 两种模式 | 存储 `node.json`、日志、运行环境等应用数据的目录 |
| `TIME_ZONE` | 两种模式 | 服务器部署使用的时区 |

```bash title="deploy/.env 示例"
# MySQL
MYSQL_ROOT_PASSWORD=your_password
MYSQL_USER=root
MYSQL_PORT=3307
MYSQL_DATA_DIR=/data/JitNode/databases/mysql/db

# Redis
REDIS_PASSWORD=your_redis_password
REDIS_PORT=6389
REDIS_DATA_DIR=/data/JitNode/databases/redis/db

# 应用
CONFIG_DIR=/data/JitNode/home
TIME_ZONE=Asia/Shanghai
```

### node.json 配置

应用核心运行配置文件位于：

```text
/data/JitNode/home/node.json
```

它维护 JitAI 平台使用的 MySQL 和 Redis 连接信息。

```json
{
  "MYSQL": {
    "HOST": "mysql",
    "PORT": 3306,
    "USER": "root",
    "PASSWORD": "your_password"
  },
  "REDIS": {
    "HOST": "redis",
    "PORT": 6379,
    "PASSWORD": "your_redis_password",
    "DB": 0
  }
}
```

- **全家桶模式**下，这个文件由 `config-init` 自动生成。
- **生产模式**下，需要基于 `node.json.template` 手工创建。
- 容器启动时会自动校验这个配置文件。

## 常见问题

安装完成后，建议你详细了解 JitAI 的目录组织架构，以便更好地进行后续开发和管理工作，请参阅 [JitNode目录](../reference/runtime-platform/jitnode-directory) 。

<details>
<summary>桌面版启动失败？</summary>

请先确认本地没有进程占用8080端口。

</details>

<details>
<summary>怎样修改运行的端口号？</summary>

- **桌面版**：修改 `JitProjects/node.json` 中的 `PORT` 值，默认是 `8080`。
- **服务器版**：修改 `deploy/docker-compose.yml` 或 `deploy/docker-compose.prod.yml` 中的端口映射，然后重启服务。

</details>

<details>
<summary>新建应用的源码存储在哪里？</summary>

桌面版存储在 `JitProjects/environs` 文件夹下，Docker版存储在 `/data/JitNode/home/environs`

</details>


<details>
<summary>安装包有新版本怎么办？</summary>

针对服务器版，AdminApp 会在页面顶部提示安装包依赖更新信息，点击即可自动重启更新。如果你是自行维护 Docker 部署包，则更新镜像后重启服务，并保持数据目录和配置文件映射不变即可。

针对桌面版，需要手动关闭 Jit 并重新启动。

</details>
