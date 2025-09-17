---
sidebar_position: 2
slug: application-directory-and-element-source-code
---

# 应用目录和元素源码

JitAi应用目录基于[JAAP（JitAi Ai Application Protocol）](../../reference/runtime-platform/JAAP)构建，使用标准的目录结构组织元素代码。

## 应用目录结构 {#application-directory-structure}

每个应用对应一个独立的文件夹，在运行环境中的路径规则为 `运行环境目录/组织ID/应用ID/应用版本`，例如 `home/environs/JRE_MWcVmUZjEq/wanyun/MyApp/1_0_0`。

```plaintext title="标准目录结构示例"
MyApp/                     # 应用根目录
├── app.json               # 应用配置清单
├── requirements.txt       # Python 依赖声明
│
├── appData/               # 应用数据存储
├── dist/                  # 编译构建产物
├── commons/               # 公共代码库
│
├── models/            # 数据模型元素
├── databases/         # 数据库连接元素
├── caches/           # 缓存服务元素
└── storages/         # 存储服务元素
```

dist目录中存储构建产物，是由Jit节点对应用进行打包后生成的。开发者每次在JitAi开发工具中修改应用元素代码并保存后，都会自动触发增量的打包。

## 元素代码目录结构 {#element-code-directory-structure}

应用目录是由元素目录组成的，每个元素目录内部也遵循[JAAP（JitAi Ai Application Protocol）](../../reference/runtime-platform/JAAP)，有自己的构成规则。

```plaintext title="标准元素目录结构"
element-name/
├── e.json              # 元素定义清单
├── config.json         # 运行时配置
├── loader.py           # 元素加载器 (非实例元素)
├── lifecycle.py        # 生命周期
├── xxx.py              # 元素逻辑实现
```

## 应用源码导出导入 {#application-export-import}

JitAi提供了灵活的应用导出导入功能，支持源码包导出、微信小程序导出等多种格式，便于应用的分发、备份、模块复用。

### 导出源码zip包 {#export-source-code-zip}

在[节点控制台](../creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment)的应用列表中，点击应用卡片上的`更多`-`导出应用`按钮，即可下载应用源码的zip包。

**源码包特点：**
- 包含完整的应用源代码和资源文件
- 保留应用的目录结构和配置信息
- 支持在其他节点上导入和继续开发
- 便于版本控制和代码备份

### 导出为微信小程序 {#export-to-wechat-miniprogram}

平台支持将应用导出为微信小程序，应用源码会嵌入到微信小程序的工程目录中，便于开发者在微信小程序生态下二次开发和发布。

**微信小程序导出特性：**
- 自动适配微信小程序的目录结构
- 转换 JitAi 组件为小程序兼容格式
- 保留业务逻辑和数据处理功能
- 支持小程序特有的生命周期和API

### 导入应用源码包 {#import-application-source-code}

在[节点控制台](../creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment)中点击`导入应用`按钮，可以把应用源码zip包导入到节点的默认运行环境中，并在新节点上继续开发。
