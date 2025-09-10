---
sidebar_position: 2
slug: download-installation
---

# Download and Installation

JitAi installation packages are divided into desktop versions (supporting Windows and Mac) and server versions (providing Docker images).

## Desktop Version

Used for developers to develop, run, debug, and publish applications on personal computers.

Based on operating system types, the desktop version is divided into Windows installation packages and Mac installation packages.

### Windows

Compatible with Windows 10 (64-bit) and Windows 11 (64-bit) operating systems.

Installation steps:

1. [Click here to download](https://apk.jit.pro/latest/windows/jit.exe) the installation package.
2. Double-click the exe file to install.
3. Follow the on-screen activation process. Read [Developer Organization Management](../devguide/application-development-basics/developer-organization-management) for more details.

### Mac

Compatible with MacOS 12.6.0 (Monterey) and above.

Installation steps:

1. Download the installation package: [Intel chip installation package](https://apk.jit.pro/latest/darwin/x64/jit.dmg), [Apple chip installation package](https://apk.jit.pro/latest/darwin/arm/jit.dmg).
2. Double-click the dmg file to install.
3. Follow the on-screen activation process. Read [Developer Organization Management](../devguide/application-development-basics/developer-organization-management) for more details.

:::warning
If security issues are prompted, click the "Done" button, go to System Settings -> Privacy & Security -> Security, set "Allow apps downloaded from" to "App Store and identified developers", and click `Open Anyway`.
![Apple Security Validation Issue](./img/apple_validation.png)

:::

## Server Version

Used for deploying application systems on servers (multi-process, cluster support, high performance), can be used as testing and production environments for application systems. Also supports online development but does not support backend code debugging. Currently, server version installation packages only support installation via Docker.

### Installation Steps

1. Install Docker according to [Docker official documentation](https://docs.docker.com/manuals/).

2. Run the JitNode container with the following command:

   ```bash
   docker run -itd --name jit \
     -p 80:80 \
     -p 3306:3306 \
     --init --privileged \
     -v /your/local/path:/data/JitNode \
     registry.cn-hangzhou.aliyuncs.com/jitpro/jit
   ```
   Please replace /your/local/path with the actual host machine path, for example: /Users/username/JitNode or /opt/jitnode

3. Access `http://{server-IP-address}:80` in your browser and follow the on-screen activation process. Read [Developer Organization Management](../devguide/application-development-basics/developer-organization-management) for more details.


### Container Parameter Description

| Required | Parameter | Description |
|---------|------|------|
| **Required** | `--name {ContainerName}` | Specify container name |
| **Required** | `-p {WebPort}:80` | Specify the port number exposed externally by the Web service |
| **Required** | `-p {MySQLPort}:3306` | Specify the port number exposed externally by JitNode's built-in MySQL, which is used by default to store data when creating new applications |
| **Optional** | `-p {RedisPort}:6379` | Specify the port number exposed externally by JitNode's built-in Redis |
| **Optional** | `-e NODE_ADDRESS={URL}` | Used to configure the current node address when deploying cluster environments, cluster nodes forward requests to the current node through this address. Can be left unconfigured and configured in the admin interface after entry |
| **Optional** | `-v {LocalDir}:/data/JitNode` | The `/data/JitNode` directory in the container stores: node license information, MySQL data, Redis data, node.json, runtime environment configuration and other data. Used for backing up/migrating runtime environment data |

```bash title="Complete parameter startup command example"
docker run -itd --name jitnode \
  -p 80:80 \
  -p 3306:3306 \
  -p 6379:6379 \
  -e NODE_ADDRESS=http://your-server-ip:80 \
  --init --privileged \
  -v /your/local/path:/data/JitNode \
  registry.cn-hangzhou.aliyuncs.com/jitpro/jit
```

## Frequently Asked Questions

After installation, it is recommended that you understand JitAi's directory organization architecture in detail for better subsequent development and management work. Please refer to [JitNode Directory](../reference/runtime-platform/jitnode-directory).

<details>
<summary>Desktop version fails to start?</summary>

Please first confirm that no local process is occupying port 8080.

</details>

<details>
<summary>How to modify the running port number?</summary>

Modify the PORT value in `JitProjects/node.json`. The default is 8080.

</details>

<details>
<summary>Where is the source code for new applications stored?</summary>

Desktop version is stored in the `JitProjects/environs` folder, Docker version is stored in `/data/JitNode/home/environs`

</details>


<details>
<summary>What to do when there's a new version of the installation package?</summary>

For the server version, AdminApp will prompt installation package dependency update information at the top of the page, click to automatically restart and update. If it's a Docker image update, users need to manually pull the new version image and restart the container with the new image, keeping the mapped directory consistent with the old version.

For the desktop version, you need to manually close Jit and restart it.

</details>