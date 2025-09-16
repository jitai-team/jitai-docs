---
sidebar_position: 4
slug: jcs-cloud-publishing-service
---

# JCS云端应用发布服务

JCS（JitAi Cloud Service）是JitAi官方负责维护部署的云端应用发布服务，也是一个JitAi应用。作为一个中心化的公共服务，JCS运行在官方Jit节点上。

每个Jit节点在启动时都会自动连接到JCS，与JCS同步运行环境配置、节点状态、版本信息。通过JCS，每个Jit节点可以访问云端应用仓库，在组织内或全网范围内发布和部署共享应用。

## 从JCS同步运行环境配置 {#synchronizing-runtime-environment-configuration}
当Jit节点启动时以及每次请求到达Jit节点时，Jit节点会自动从JCS检查运行环境配置，如果运行环境配置有更新，则更新Jit节点本地缓存的运行环境配置。运行环境配置中包含了运行环境ID、标题、备注、创建时间、更新时间、入口地址、部署的应用以及版本、路由权重等信息，上述配置是由开发者在运维管理工具中通过可视化界面操作变更的。

## 从JCS获取版本更新信息 {#retrieving-version-update-information}
每个Jit节点在运行期间会定时从JCS获取版本更新信息（包括Jit节点自身的版本、节点上运行的所有应用的版本），如果发现新版本，则会在运维管理工具界面上提示开发者更新版本。

## 通过JCS访问云端应用仓库 {#accessing-cloud-application-repository}
开发者在运维管理工具中发布的应用版本会自动加密同步到JCS云端应用仓库, 开发者部署应用时看到的应用版本列表就是由JCS提供的。
