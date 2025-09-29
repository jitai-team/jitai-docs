---
sidebar_position: 0
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# 开发者指南导读
准备好体验全新的应用开发方式了吗？从这里开始，你将学会使用AI时代的全新技术体系构建功能强大的企业级应用。

开发指南提供从组织管理、应用开发基础到业务逻辑实现的完整学习路径，以及通过真实业务场景掌握复杂应用架构设计的最佳实践。

**使用建议**：新手按顺序学习，有经验的开发者可直接查看场景化进阶指南。

首先，你需要完成基本的[下载安装](tutorial/download-installation)！


## 基础概念
掌握JitAi平台的核心理念和架构原理。了解平台应用、元素体系、开发框架、可视化开发工具等基础概念，为后续开发工作奠定理论基础。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard 
  title="平台架构与核心概念"
  href="devguide/basic-concept"
  description="了解JitAi平台架构、应用概念、JAAP协议、元素体系和开发框架，掌握平台的基础原理。"
>
  <LinkGrid columns={2} links={[
    { text: "平台与应用", href: "devguide/basic-concept#platform-and-applications" },
    { text: "DevOps工具与服务", href: "devguide/basic-concept#devops-tools-and-services" },
    { text: "应用创建与开发", href: "devguide/basic-concept#application-creation-and-development" },
    { text: "JAAP协议与元素", href: "devguide/basic-concept#jaap-protocol-and-elements" },
    { text: "元素Type与元素加载", href: "devguide/basic-concept#element-type-and-element-loading" },
    { text: "开发框架", href: "devguide/basic-concept#development-framework" },
    { text: "业务应用与应用继承", href: "devguide/basic-concept#business-applications-and-application-inheritance" },
    { text: "开发工具", href: "devguide/basic-concept#development-tools" },
    { text: "扩展", href: "devguide/basic-concept#extension" }
  ]} />
</IndexCard>

</div>

## 平台安装与节点激活
完成平台安装和节点激活流程。学习下载安装方法、节点激活流程、开发者团队管理等，建立开发环境基础。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="下载与安装"
  href="devguide/installation-activation/download-installation"
  description="学习如何下载和安装JitAi平台，包括桌面版和服务器版的不同部署场景。"
>
  <LinkGrid links={[
    { text: "详细安装步骤", href: "devguide/installation-activation/download-installation#detailed-installation-steps" }
  ]} />
</IndexCard>

<IndexCard
  title="节点激活与开发者团队"
  href="devguide/installation-activation/developer-team-management"
  description="了解如何激活节点和管理开发者团队，包括组织绑定、成员管理等核心操作。"
>
  <LinkGrid links={[
    { text: "什么是节点", href: "devguide/installation-activation/developer-team-management#what-is-jitnode" },
    { text: "什么是开发者团队", href: "devguide/installation-activation/developer-team-management#what-is-developer-team" },
    { text: "在激活节点时创建新的开发组织", href: "devguide/installation-activation/developer-team-management#create-new-dev-team-when-activating-node" },
    { text: "在激活节点时将节点绑定到自己已加入的组织", href: "devguide/installation-activation/developer-team-management#bind-node-to-joined-team-when-activating" },
    { text: "在激活节点时使用组织绑定码加入组织并绑定", href: "devguide/installation-activation/developer-team-management#use-team-bind-code-to-join-and-bind-when-activating-node" },
    { text: "在登录已有节点时通过组织绑定码加入组织", href: "devguide/installation-activation/developer-team-management#join-team-via-bind-code-when-logging-into-existing-node" },
    { text: "查看和刷新组织绑定码", href: "devguide/installation-activation/developer-team-management#view-and-refresh-team-bind-code" },
    { text: "移除组织成员", href: "devguide/installation-activation/developer-team-management#remove-team-member" }
  ]} />
</IndexCard>

<IndexCard
  title="平台节点的更新升级"
  href="devguide/installation-activation/platform-node-updates-upgrades"
  description="学习如何更新和升级平台节点，保持系统稳定性和功能更新。"
>
  <LinkGrid links={[
    { text: "更新流程", href: "devguide/installation-activation/platform-node-updates-upgrades" },
    { text: "升级方法", href: "devguide/installation-activation/platform-node-updates-upgrades" }
  ]} />
</IndexCard>

</div>

## 开发工具与发布服务
强大的工具链助力高效开发。掌握可视化开发环境、运维管理工具和云端发布服务，实现从开发到部署的完整工具链支持。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="JitAi可视化开发工具"
  href="devguide/development-tool-and-publish-service/jitai-visual-development-tools"
  description="掌握强大的可视化开发环境，熟悉IDE的各个功能区域，学会在可视化和源码双模式之间自由切换。"
>
  <LinkGrid links={[
    { text: "元素目录树", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#element-directory-tree" },
    { text: "添加元素", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#adding-elements" },
    { text: "可视化编辑器", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#visual-editor" },
    { text: "源码编辑器", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#source-code-editor" },
    { text: "源码文件树", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#source-code-file-tree" },
    { text: "应用设置", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#application-settings" },
    { text: "基本信息", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#basic-information" },
    { text: "默认元素", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#default-elements" },
    { text: "环境变量", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#environment-variables" },
    { text: "门户切换", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#portal-switching" },
    { text: "个人中心", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#personal-center" },
    { text: "语言切换", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#language-switching" },
    { text: "导航标签", href: "devguide/development-tool-and-publish-service/jitai-visual-development-tools#navigation-tabs" }
  ]} />
</IndexCard>

<IndexCard
  title="运维管理工具"
  href="devguide/development-tool-and-publish-service/devops-management-tool"
  description="双控制台架构的全面运维管理解决方案，提供从开发到部署的完整应用生命周期管理。"
>
  <LinkGrid links={[
    { text: "双控制台架构", href: "devguide/development-tool-and-publish-service/devops-management-tool#dual-console-architecture" },
    { text: "本地节点控制台", href: "devguide/development-tool-and-publish-service/devops-management-tool#local-node-console" },
    { text: "组织管理控制台", href: "devguide/development-tool-and-publish-service/devops-management-tool#organization-management-console" },
    { text: "核心能力概览", href: "devguide/development-tool-and-publish-service/devops-management-tool#core-capabilities-overview" },
    { text: "应用生命周期管理", href: "devguide/development-tool-and-publish-service/devops-management-tool#application-lifecycle-management" },
    { text: "运行环境管理", href: "devguide/development-tool-and-publish-service/devops-management-tool#runtime-environment-management" },
    { text: "节点集群管理", href: "devguide/development-tool-and-publish-service/devops-management-tool#node-cluster-management" },
    { text: "灵活的配置管理", href: "devguide/development-tool-and-publish-service/devops-management-tool#flexible-configuration-management" },
    { text: "版本发布与部署", href: "devguide/development-tool-and-publish-service/devops-management-tool#version-release-and-deployment" },
    { text: "多平台导出", href: "devguide/development-tool-and-publish-service/devops-management-tool#multi-platform-export" },
    { text: "应用模板生态", href: "devguide/development-tool-and-publish-service/devops-management-tool#application-template-ecosystem" }
  ]} />
</IndexCard>

<IndexCard
  title="JCS云端应用发布服务"
  href="devguide/development-tool-and-publish-service/jcs-cloud-publishing-service"
  description="官方云端应用发布服务，提供中心化应用仓库、版本管理和JitNode间的无缝部署。"
>
  <LinkGrid links={[
    { text: "从JCS同步运行环境配置", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#synchronizing-runtime-environment-configuration" },
    { text: "从JCS获取版本更新信息", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#retrieving-version-update-information" },
    { text: "通过JCS访问云端应用仓库", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#accessing-cloud-application-repository" }
  ]} />
</IndexCard>

</div>

## 创建与发布应用
从应用创建到分布式部署的完整流程。掌握应用创建、源码管理、版本发布、运行环境配置，以及如何构建无限横向扩展的分布式集群架构。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建和部署应用"
  href="devguide/creating-and-publishing-applications/creating-and-deploying-applications"
  description="学习应用的创建、继承、数据配置和部署流程，掌握应用开发的基础工作流程。"
>
  <LinkGrid links={[
    { text: "创建第一个应用", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#creating-first-application" },
    { text: "基于已有应用快速开发", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#developing-applications-based-on-existing-templates" },
    { text: "继承应用", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#inheriting-from-applications" },
    { text: "创建副本", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#duplicating-applications" },
    { text: "数据存储与环境变量配置", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#configuring-data-storage-and-environment-variables" },
    { text: "应用部署", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications" },
    { text: "在指定节点上部署应用", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications-on-specified-nodes" },
    { text: "在指定运行环境中部署应用", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications-in-specified-runtime-environments" }
  ]} />
</IndexCard>

<IndexCard
  title="应用目录和元素源码"
  href="devguide/creating-and-publishing-applications/application-directory-and-element-source-code"
  description="基于JAAP协议的应用目录结构和元素源码管理，包括应用导出导入功能。"
>
  <LinkGrid links={[
    { text: "应用目录结构", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#application-directory-structure" },
    { text: "元素代码目录结构", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#element-code-directory-structure" },
    { text: "应用源码导出导入", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#application-export-import" },
    { text: "导出源码zip包", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#export-source-code-zip" },
    { text: "导出为微信小程序", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#export-to-wechat-miniprogram" },
    { text: "导入应用源码包", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#import-application-source-code" }
  ]} />
</IndexCard>

<IndexCard
  title="发布与升级应用"
  href="devguide/creating-and-publishing-applications/publishing-and-upgrading-applications"
  description="掌握应用版本管理、发布工作流程和升级策略，学习语义化版本控制和部署配置。"
>
  <LinkGrid links={[
    { text: "应用版本管理与发布", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-version-management-and-publish" },
    { text: "语义化版本号", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#semantic-versioning" },
    { text: "是否强制自动更新", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#force-auto-update" },
    { text: "有意义的更新日志", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#meaningful-update-logs" },
    { text: "是否包含源代码", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#include-source-code" },
    { text: "包含一些初始化数据", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#include-initialization-data" },
    { text: "应用版本升级", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-version-updates" },
    { text: "应用部署策略", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-deployment-strategies" }
  ]} />
</IndexCard>


<IndexCard
  title="运行环境管理"
  href="devguide/creating-and-publishing-applications/runtime-environment-management"
  description="掌握运行环境的创建、配置和管理，学习如何使用节点集群和应用部署。"
>
  <LinkGrid links={[
    { text: "什么是运行环境", href: "devguide/creating-and-publishing-applications/runtime-environment-management#what-is-runtime-environment" },
    { text: "节点的本地默认运行环境", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment" },
    { text: "创建新的运行环境", href: "devguide/creating-and-publishing-applications/runtime-environment-management#createnewrunenvironment" },
    { text: "开发模式部署", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-in-development-mode" },
    { text: "生产模式部署", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-in-production-mode" },
    { text: "使用运行环境管理节点集群", href: "devguide/creating-and-publishing-applications/runtime-environment-management#use-runtime-environment-to-manage-node-clusters" },
    { text: "节点地址", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-address" },
    { text: "节点状态", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-status" },
    { text: "在运行环境中部署应用", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-application-in-runtime-environment" },
    { text: "以生产模式部署", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-production-mode" },
    { text: "以开发模式部署", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-development-mode" }
  ]} />
</IndexCard>

<IndexCard
  title="实现无限横向扩展的分布式集群架构"
  href="devguide/creating-and-publishing-applications/distributed-cluster-architecture"
  description="学习如何构建和管理无限横向扩展的分布式集群架构，实现高可用和高性能部署。"
>
  <LinkGrid links={[
    { text: "四层架构模型", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#four-layer-architecture" },
    { text: "企业级集群部署架构", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#enterprise-cluster-deployment" },
    { text: "典型部署拓扑", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#typical-deployment-topology" },
    { text: "多维度环境划分", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#multi-dimensional-environment-division" },
    { text: "入口地址配置策略", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#entry-address-configuration" },
    { text: "集群扩展策略", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#cluster-scaling-strategies" },
    { text: "水平扩展模式", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#horizontal-scaling" },
    { text: "负载均衡与容错", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#load-balancing-fault-tolerance" },
    { text: "架构约束与最佳实践", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#architecture-constraints-best-practices" },
    { text: "版本管理约束", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#version-management-constraints" },
    { text: "网络访问约束", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#network-access-constraints" },
    { text: "部署最佳实践", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#deployment-best-practices" }
  ]} />
</IndexCard>

</div>


## 前端门户与页面
设计精美的用户界面和交互体验。从门户导航到页面构建，从组件布局到数据管理，打造功能完整、用户友好的应用界面。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建门户"
  href="devguide/shell-and-page/portal-navigation-design"
  description="设计不同用户角色的门户界面，配置导航菜单和权限控制，创建个性化用户体验。"
>
  <LinkGrid links={[
    { text: "应用内置3个门户", href: "devguide/shell-and-page/portal-navigation-design#application-built-in-three-portals" },
    { text: "3种门户类型", href: "devguide/shell-and-page/portal-navigation-design#three-portal-types" },
    { text: "创建门户并配置菜单", href: "devguide/shell-and-page/portal-navigation-design#create-portal-and-configure-menu" },
    { text: "门户布局设计", href: "devguide/shell-and-page/portal-navigation-design#portal-layout-design" },
    { text: "启用或关闭常用功能入口", href: "devguide/shell-and-page/portal-navigation-design#enable-disable-common-function-entries" },
    { text: "在门户中使用AI助理", href: "devguide/shell-and-page/portal-navigation-design#using-ai-assistant-in-portal" }
  ]} />
</IndexCard>

<IndexCard
  title="创建组件化页面"
  href="devguide/shell-and-page/component-based-page-development"
  description="使用可视化编辑器构建页面界面，配置组件和事件，实现丰富的用户交互功能。"
>
  <LinkGrid links={[
    { text: "新建常规页面", href: "devguide/shell-and-page/component-based-page-development#create-a-regular-page" },
    { text: "可视化页面编辑器", href: "devguide/shell-and-page/component-based-page-development#visual-page-editor" },
    { text: "页面变量", href: "devguide/shell-and-page/component-based-page-development#page-variables" },
    { text: "页面事件", href: "devguide/shell-and-page/component-based-page-development#page-events" },
    { text: "页面函数", href: "devguide/shell-and-page/component-based-page-development#page-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="AI数据管理页面"
  href="devguide/shell-and-page/ai-data-management-page"
  description="AI加持的ai-data-management-page，智能辅助高效完成数据浏览、筛选、编辑与批量操作。"
>
  <LinkGrid columns={2} links={[
    { text: "创建AI数据管理页面", href: "devguide/shell-and-page/ai-data-management-page#create-ai-data-management-page" },
    { text: "通过默认筛选条件限制页面表格查询的数据", href: "devguide/shell-and-page/ai-data-management-page#limit-page-table-query-data-through-default-filter-conditions" },
    { text: "配置默认的数据排序规则", href: "devguide/shell-and-page/ai-data-management-page#configure-default-data-sort-rules" },
    { text: "在页面表格中隐藏部分字段", href: "devguide/shell-and-page/ai-data-management-page#hide-some-fields-in-page-table" },
    { text: "配置支持条件筛选的字段", href: "devguide/shell-and-page/ai-data-management-page#configure-conditional-filter-fields" },
    { text: "配置表单中允许查看和编辑的字段", href: "devguide/shell-and-page/ai-data-management-page#configure-viewable-editable-fields-in-form" },
    { text: "配置批量编辑表单中展示的字段", href: "devguide/shell-and-page/ai-data-management-page#configure-fields-displayed-in-batch-edit-form" },
    { text: "启用AI数据管理助手", href: "devguide/shell-and-page/ai-data-management-page#enable-ai-data-management-assistant" },
    { text: "转换为常规页面进行修改", href: "devguide/shell-and-page/ai-data-management-page#convert-to-regular-page-for-modification" }
  ]} />
</IndexCard>

<IndexCard
  title="AI数据分析页面"
  href="devguide/shell-and-page/ai-data-analysis-page"
  description="通过自然语言描述需求，AI自动生成数据图表，支持用户随时调整图表样式和统计维度。"
>
  <LinkGrid links={[
    { text: "创建AI数据分析页面", href: "devguide/shell-and-page/ai-data-analysis-page#create-ai-data-analysis-page" },
    { text: "页面配置", href: "devguide/shell-and-page/ai-data-analysis-page#page-configuration" },
    { text: "运行效果演示", href: "devguide/shell-and-page/ai-data-analysis-page#run-effects" },
    { text: "全代码开发", href: "devguide/shell-and-page/ai-data-analysis-page#full-code-development" },
    { text: "快捷创建", href: "devguide/shell-and-page/ai-data-analysis-page#quick-create" }
  ]} />
</IndexCard>

<IndexCard
  title="数据录入页面"
  href="devguide/shell-and-page/data-entry-page"
  description="快速创建数据录入表单，实现数据收集和提交功能。"
>
  <LinkGrid links={[
    { text: "创建数据录入页面", href: "devguide/shell-and-page/data-entry-page#create-data-entry-page" },
    { text: "配置允许查看和编辑的字段", href: "devguide/shell-and-page/data-entry-page#configure-viewable-editable-fields" },
    { text: "提交后显示再次录入按钮", href: "devguide/shell-and-page/data-entry-page#show-re-entry-button-after-submission" },
    { text: "提交后展示结果反馈界面", href: "devguide/shell-and-page/data-entry-page#show-result-feedback-after-submission" },
    { text: "转换为常规页面进行修改", href: "devguide/shell-and-page/data-entry-page#convert-to-regular-page-for-modification" }
  ]} />
</IndexCard>


<IndexCard
  title="Markdown页面"
  href="devguide/shell-and-page/markdown-page"
  description="创建文档型页面，支持丰富的Markdown语法和文档展示需求。"
>
  <LinkGrid links={[
    { text: "创建Markdown页面", href: "devguide/shell-and-page/markdown-page#create-markdown-page" },
    { text: "Markdown 语法", href: "devguide/shell-and-page/markdown-page#markdown-syntax" }
  ]} />
</IndexCard>


<IndexCard
  title="全代码页面开发"
  href="devguide/shell-and-page/full-code-page-development"
  description="面向高级开发者的完全自定义页面开发方式，支持复杂业务逻辑和个性化界面。"
>
  <LinkGrid columns={2} links={[
    { text: "创建 React 全代码页面", href: "devguide/shell-and-page/full-code-page-development#create-react-full-code-page" },
    { text: "使用样式", href: "devguide/frontend-ui-customization/page-customization#use-style" },
    { text: "使用本地资源", href: "devguide/frontend-ui-customization/page-customization#use-local-resources" },
    { text: "使用 Ant Design 的组件", href: "devguide/frontend-ui-customization/page-customization#use-ant-design-components" },
    { text: "内嵌已有常规页面", href: "devguide/frontend-ui-customization/page-customization#embed-existing-regular-page" },
    { text: "使用标准组件", href: "devguide/frontend-ui-customization/page-customization#use-standard-component" },
    { text: "调用数据模型函数", href: "devguide/frontend-ui-customization/page-customization#call-data-model-function" },
    { text: "调用服务函数", href: "devguide/frontend-ui-customization/page-customization#call-service-function" },
    { text: "创建Vue全代码页面", href: "devguide/shell-and-page/full-code-page-development#vue-full-code-page" },
    { text: "使用第三方包", href: "devguide/frontend-ui-customization/page-customization#use-third-party-packages" },
    { text: "打包配置的使用", href: "devguide/frontend-ui-customization/page-customization#use-packaging-configuration" }
  ]} />
</IndexCard>

</div>

## 在门户和页面中集成AI元素
通过智能AI元素提升用户体验。将AI助理、智能体和其他AI组件集成到门户和页面中，创建智能、交互式的应用程序，提供个性化帮助和自动化工作流程。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="在门户中使用AI助理"
  href="devguide/using-ai-in-portals-and-pages/using-ai-assistants-in-portals"
  description="学习如何将AI助理集成到门户界面中，为用户在整个工作流程中提供智能帮助和指导。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="在组件化页面中使用AI助理"
  href="devguide/using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages"
  description="将AI助理嵌入到基于组件的页面中，增强用户交互并为特定任务提供上下文帮助。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="在页面中使用AI元素"
  href="devguide/using-ai-in-portals-and-pages/using-ai-elements-in-pages"
  description="掌握从页面调用AI元素的技巧，包括AI智能体、LLM服务和知识库，用于动态内容生成。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## 在页面中调用业务元素
将页面连接到强大的业务逻辑和数据操作。学习如何从页面调用服务函数和数据模型函数，创建动态的、数据驱动的用户界面，具备实时业务处理能力。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="在页面中调用服务函数"
  href="devguide/calling-business-elements-in-pages/calling-service-functions-in-pages"
  description="学习如何从页面调用服务函数来执行业务逻辑、处理数据并与外部系统集成，实现动态内容生成。"
>
  <LinkGrid links={[
    { text: "标准页面中调用服务函数", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#calling-service-functions-in-standard-pages" },
    { text: "全代码页面中调用服务函数", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#calling-service-functions-in-full-code-pages" },
    { text: "复杂参数处理", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#complex-parameter-handling" }
  ]} />
</IndexCard>

<IndexCard
  title="在页面中调用数据模型函数"
  href="devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages"
  description="掌握从页面调用数据模型函数的技巧，执行CRUD操作、数据查询和数据库交互，实现实时数据显示。"
>
  <LinkGrid links={[
    { text: "调用语法", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#calling-syntax" },
    { text: "全代码页面中的基本语法", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#basic-syntax-in-full-code-pages" },
    { text: "数据操作能力", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#data-operation-capabilities" }
  ]} />
</IndexCard>

</div>

## 页面中的全代码自定义UI组件
创建具有完全编程控制的高级自定义UI组件。构建复杂的交互元素，与页面逻辑无缝集成，处理复杂事件，提供超越标准组件的丰富用户体验。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="UI组件的接口规范"
  href="devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="学习创建全代码UI组件的接口规范和标准，包括属性、状态管理和生命周期方法。"
>
  <LinkGrid columns={2} links={[
    { text: "组件接口架构", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#component-interface-architecture" },
    { text: "核心接口定义", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#core-interface-definitions" },
    { text: "接口交互机制", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-interaction-mechanism" },
    { text: "接口实现规范", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-implementation-specifications" },
    { text: "接口运行时序", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-runtime-sequence" },
    { text: "接口调用说明", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-invocation-explanation" }
  ]} />
</IndexCard>

<IndexCard
  title="在全代码组件中调用页面的函数及其它组件的函数"
  href="devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components"
  description="掌握在全代码组件内调用页面函数和其他组件函数的技巧，实现无缝集成。"
>
  <LinkGrid columns={2} links={[
    { text: "调用原理", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#calling-principle" },
    { text: "实际应用示例", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#practical-examples" },
    { text: "基本组件调用", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#basic-component-calling" },
    { text: "获取其他组件的数据", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#getting-data-from-other-components" },
    { text: "常用组件调用方法", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#common-component-methods" },
    { text: "基本调用模式", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#basic-calling-pattern" }
  ]} />
</IndexCard>

<IndexCard
  title="发出事件"
  href="devguide/fullcode-ui-components-in-pages/emitting-events"
  description="学习如何从全代码组件发出自定义事件，与父页面和其他组件进行有效通信。"
>
  <LinkGrid columns={2} links={[
    { text: "事件订阅原理", href: "devguide/fullcode-ui-components-in-pages/emitting-events#event-subscription-principles" },
    { text: "在全代码组件中响应事件", href: "devguide/fullcode-ui-components-in-pages/emitting-events#respond-in-custom-components" },
    { text: "发布自定义事件", href: "devguide/fullcode-ui-components-in-pages/emitting-events#publishing-custom-events" },
    { text: "可订阅的事件类型", href: "devguide/fullcode-ui-components-in-pages/emitting-events#subscribable-events" },
    { text: "标准组件事件", href: "devguide/fullcode-ui-components-in-pages/emitting-events#standard-component-events" },
    { text: "全代码组件的自定义事件", href: "devguide/fullcode-ui-components-in-pages/emitting-events#custom-component-events" },
    { text: "双向通信示例", href: "devguide/fullcode-ui-components-in-pages/emitting-events#bidirectional-communication-example" }
  ]} />
</IndexCard>

<IndexCard
  title="在页面代码中调用全代码组件的函数"
  href="devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code"
  description="了解如何从页面代码调用全代码组件暴露的函数，控制组件行为和数据流。"
>
  <LinkGrid links={[
    { text: "调用原理", href: "devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code#calling-principle" },
    { text: "调用时机和生命周期", href: "devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code#calling-timing-and-lifecycle" }
  ]} />
</IndexCard>

</div>

## 在页面中使用功能组件
丰富的组件库是你的超级工具箱。拖拽一个表格展示数据，添加表单收集信息，插入图表让数据可视化。让复杂的前端开发变得简单直观。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="表单组件"
  href="devguide/using-functional-components-in-pages/form-components"
  description="强大的表单构建工具，支持数据收集、验证、权限控制和复杂业务规则配置。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置与配置项管理", href: "devguide/using-functional-components-in-pages/form-components#basic-configuration-and-item-management" },
    { text: "字段校验与交互", href: "devguide/using-functional-components-in-pages/form-components#field-validation-and-interaction" },
    { text: "布局设计", href: "devguide/using-functional-components-in-pages/form-components#layout-design" },
    { text: "使用自定义控件渲染字段", href: "devguide/using-functional-components-in-pages/form-components#use-custom-controls-to-render-fields" },
    { text: "事件配置", href: "devguide/using-functional-components-in-pages/form-components#event-configuration" },
    { text: "高级功能", href: "devguide/using-functional-components-in-pages/form-components#advanced-functions" },
    { text: "批量编辑表单配置", href: "devguide/using-functional-components-in-pages/form-components#batch-edit-form-configuration" },
    { text: "批量编辑表单事件与交互", href: "devguide/using-functional-components-in-pages/form-components#batch-edit-form-events-and-interaction" },
    { text: "数据修正配置", href: "devguide/using-functional-components-in-pages/form-components#data-correction-configuration" },
    { text: "数据修正使用", href: "devguide/using-functional-components-in-pages/form-components#data-correction-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="基础表格"
  href="devguide/using-functional-components-in-pages/table-components#basic-table"
  description="标准数据表格展示组件，支持数据源绑定、字段自定义、分页和排序等基础功能。"
>
  <LinkGrid columns={2} links={[
    { text: "设置数据源", href: "devguide/using-functional-components-in-pages/table-components#set-data-source" },
    { text: "自定义显示字段", href: "devguide/using-functional-components-in-pages/table-components#custom-display-fields" },
    { text: "按分组显示字段", href: "devguide/using-functional-components-in-pages/table-components#display-fields-by-group" },
    { text: "设置分组名和背景色", href: "devguide/using-functional-components-in-pages/table-components#set-group-names-and-background-colors" },
    { text: "配置字段的属性", href: "devguide/using-functional-components-in-pages/table-components#configure-field-attributes" },
    { text: "冻结字段", href: "devguide/using-functional-components-in-pages/table-components#freeze-fields" },
    { text: "行内编辑", href: "devguide/using-functional-components-in-pages/table-components#inline-editing" },
    { text: "字段统计", href: "devguide/using-functional-components-in-pages/table-components#field-statistics" },
    { text: "自定义字段渲染器与字段编辑器", href: "devguide/using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "添加按钮", href: "devguide/using-functional-components-in-pages/table-components#add-button" },
    { text: "删除按钮", href: "devguide/using-functional-components-in-pages/table-components#delete-button" },
    { text: "多个按钮折叠到\"更多\"中", href: "devguide/using-functional-components-in-pages/table-components#collapse-multiple-buttons-to-more" },
    { text: "设置分页大小/禁用选择列/禁用排序/首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/table-components#set-page-size-disable-selection-disable-sorting-refresh-on-first-load" },
    { text: "极速模式", href: "devguide/using-functional-components-in-pages/table-components#turbo-mode" },
    { text: "编辑规则", href: "devguide/using-functional-components-in-pages/table-components#edit-rules" },
    { text: "样式规则", href: "devguide/using-functional-components-in-pages/table-components#style-rules" },
    { text: "设置关联数据层级和表格无数据时文案", href: "devguide/using-functional-components-in-pages/table-components#set-related-data-levels-and-no-data-text" },
    { text: "表格事件", href: "devguide/using-functional-components-in-pages/table-components#table-events" },
    { text: "表格组件变量", href: "devguide/using-functional-components-in-pages/table-components#table-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="分组表"
  href="devguide/using-functional-components-in-pages/table-components#grouped-table"
  description="按指定字段对数据进行分组展示的表格组件，适用于层次化数据管理。"
>
  <LinkGrid links={[
    { text: "分组字段配置", href: "devguide/using-functional-components-in-pages/table-components#grouped-field-configuration" },
    { text: "与基础表格相同的配置", href: "devguide/using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "与基础表格相同的事件", href: "devguide/using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "与基础表格相同的组件变量", href: "devguide/using-functional-components-in-pages/table-components#same-component-variables-as-basic-table" }
  ]} />
</IndexCard>

<IndexCard
  title="级联表"
  href="devguide/using-functional-components-in-pages/table-components#cascaded-table"
  description="处理具有父子关系的层级数据，支持树形结构展示和操作。"
>
  <LinkGrid links={[
    { text: "级联表示例数据", href: "devguide/using-functional-components-in-pages/table-components#cascaded-table-sample-data" },
    { text: "配置级联逻辑字段", href: "devguide/using-functional-components-in-pages/table-components#configure-cascaded-logic-fields" },
    { text: "级联表使用区效果", href: "devguide/using-functional-components-in-pages/table-components#cascaded-table-usage-effects" },
    { text: "与基础表格相同的配置", href: "devguide/using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "与基础表格相同的事件", href: "devguide/using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "与基础表格相同的表格变量", href: "devguide/using-functional-components-in-pages/table-components#same-table-variables-as-basic-table" }
  ]} />
</IndexCard>

</div>

<div style={{margin: '20px 0'}}>
  <details id="more-components">
    <summary style={{cursor: 'pointer', fontSize: '14px', color: '#666', textAlign: 'center'}}>
      查看更多组件
    </summary>

    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', margin: '20px 0'}}>

<IndexCard
  title="交叉表"
  href="devguide/using-functional-components-in-pages/table-components#crosstab"
  description="多维数据透视表，支持行列交叉分析，适用于数据统计和报表展示。"
>
  <LinkGrid columns={2} links={[
    { text: "初始化配置", href: "devguide/using-functional-components-in-pages/table-components#initialization-configuration" },
    { text: "配置维度和指标", href: "devguide/using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "按年/季度/月/周/日统计", href: "devguide/using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "配置指标", href: "devguide/using-functional-components-in-pages/table-components#configure-metrics" },
    { text: "配置计算指标", href: "devguide/using-functional-components-in-pages/table-components#configure-calculated-metrics" },
    { text: "自定义指标属性", href: "devguide/using-functional-components-in-pages/table-components#custom-metric-attributes" },
    { text: "配置指标统计方式", href: "devguide/using-functional-components-in-pages/table-components#configure-metric-statistics-methods" },
    { text: "指标数据筛选", href: "devguide/using-functional-components-in-pages/table-components#metric-data-filtering" },
    { text: "配置图表样式", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "表头/表身对齐方式", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "行/列样式", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "导出/刷新/滚动显示 按钮", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "显示合计值", href: "devguide/using-functional-components-in-pages/table-components#show-total" },
    { text: "交叉表事件", href: "devguide/using-functional-components-in-pages/table-components#cross-table-events" },
    { text: "交叉表组件变量", href: "devguide/using-functional-components-in-pages/table-components#crosstab-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="行转列"
  href="devguide/using-functional-components-in-pages/table-components#row-to-column"
  description="将行数据转换为列显示的特殊表格模式，适用于动态字段展示场景。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "自定义字段名称/对齐方式", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "自定义字段渲染器", href: "devguide/using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "统计列", href: "devguide/using-functional-components-in-pages/table-components#statistics-columns" },
    { text: "导出/编辑/默认加载数据", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "值点击后事件", href: "devguide/using-functional-components-in-pages/table-components#value-click-event" },
    { text: "按钮配置", href: "devguide/using-functional-components-in-pages/table-components#button-configuration" },
    { text: "行转列事件", href: "devguide/using-functional-components-in-pages/table-components#row-to-column-event" },
    { text: "行转列组件变量", href: "devguide/using-functional-components-in-pages/table-components#row-to-column-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="统计图表（正在编辑中）"
  description="丰富的数据可视化图表组件，支持柱状图、折线图、饼图等多种图表类型。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="树组件"
  href="devguide/using-functional-components-in-pages/tree-components"
  description="层次化数据展示组件，支持树形结构的展示、选择和操作。"
>
  <LinkGrid columns={2} links={[
    { text: "创建树形组件", href: "devguide/using-functional-components-in-pages/tree-components#create-tree-form-component" },
    { text: "配置层级字段", href: "devguide/using-functional-components-in-pages/tree-components#configure-hierarchy-fields" },
    { text: "首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/tree-components#tree-form-refresh-on-first-load" },
    { text: "默认展开第一个节点", href: "devguide/using-functional-components-in-pages/tree-components#default-expand-first-node" },
    { text: "点击节点后事件", href: "devguide/using-functional-components-in-pages/tree-components#click-node-event" },
    { text: "级联树", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree" },
    { text: "新建级联树", href: "devguide/using-functional-components-in-pages/tree-components#create-cascade-tree" },
    { text: "配置节点标题", href: "devguide/using-functional-components-in-pages/tree-components#configure-node-title" },
    { text: "设置上级节点", href: "devguide/using-functional-components-in-pages/tree-components#set-parent-node" },
    { text: "节点单选/多选", href: "devguide/using-functional-components-in-pages/tree-components#node-selection-mode" },
    { text: "级联树首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-refresh-on-first-load" },
    { text: "级联树点击节点后事件", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-click-node-event" },
    { text: "级联树选中节点后事件", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-select-node-event" }
  ]} />
</IndexCard>

<IndexCard
  title="列表组件"
  href="devguide/using-functional-components-in-pages/list-components"
  description="灵活的数据列表展示组件，支持标题、摘要、按钮等配置，适用于各类列表展示场景。"
>
  <LinkGrid columns={2} links={[
    { text: "配置列表标题", href: "devguide/using-functional-components-in-pages/list-components#configure-list-title" },
    { text: "设置摘要内容", href: "devguide/using-functional-components-in-pages/list-components#set-summary-content" },
    { text: "摘要中显示字段标题", href: "devguide/using-functional-components-in-pages/list-components#show-field-titles-in-summary" },
    { text: "设置摘要内容布局", href: "devguide/using-functional-components-in-pages/list-components#set-summary-content-layout" },
    { text: "列表组件按钮", href: "devguide/using-functional-components-in-pages/list-components#list-component-button" },
    { text: "添加按钮", href: "devguide/using-functional-components-in-pages/list-components#add-button" },
    { text: "修改按钮属性", href: "devguide/using-functional-components-in-pages/list-components#modify-button-attributes" },
    { text: "按钮收起到更多", href: "devguide/using-functional-components-in-pages/list-components#button-collapse-to-more" },
    { text: "按钮拖拽排序", href: "devguide/using-functional-components-in-pages/list-components#button-drag-sort" },
    { text: "设置底部按钮大小", href: "devguide/using-functional-components-in-pages/list-components#set-bottom-button-size" },
    { text: "首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/list-components#refresh-data-on-first-component-load" },
    { text: "是否启用点击行事件", href: "devguide/using-functional-components-in-pages/list-components#enable-row-click-event" },
    { text: "默认选中第一条数据", href: "devguide/using-functional-components-in-pages/list-components#default-select-first-data" },
    { text: "显示行间距", href: "devguide/using-functional-components-in-pages/list-components#show-row-spacing" },
    { text: "列表组件事件", href: "devguide/using-functional-components-in-pages/list-components#list-component-event" },
    { text: "点击行事件", href: "devguide/using-functional-components-in-pages/list-components#row-click-event" },
    { text: "按钮事件", href: "devguide/using-functional-components-in-pages/list-components#button-event" },
    { text: "列表组件变量", href: "devguide/using-functional-components-in-pages/list-components#list-component-variables" },
    { text: "刷新列表组件", href: "devguide/using-functional-components-in-pages/list-components#refresh-list-component" }
  ]} />
</IndexCard>

<IndexCard
  title="卡片与媒体展示（正在编辑中）"
  description="用于展示卡片式内容和媒体文件的组件，包括看板和画廊功能。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="模型筛选器"
  href="devguide/using-functional-components-in-pages/filter-components"
  description="基于数据模型的高级筛选组件，支持简单、复杂和自由筛选模式。"
>
  <LinkGrid links={[
    { text: "简单筛选", href: "devguide/using-functional-components-in-pages/filter-components#simple-filter" },
    { text: "复杂筛选", href: "devguide/using-functional-components-in-pages/filter-components#complex-filter" },
    { text: "自由筛选", href: "devguide/using-functional-components-in-pages/filter-components#free-filter" },
    { text: "布局设置", href: "devguide/using-functional-components-in-pages/filter-components#layout-settings" },
    { text: "筛选器的使用", href: "devguide/using-functional-components-in-pages/filter-components#filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="通用筛选器"
  href="devguide/using-functional-components-in-pages/filter-components"
  description="灵活的通用筛选组件，支持自定义字段配置和多种触发模式。"
>
  <LinkGrid columns={2} links={[
    { text: "筛选字段配置", href: "devguide/using-functional-components-in-pages/filter-components#filter-field-configuration" },
    { text: "快速布局", href: "devguide/using-functional-components-in-pages/filter-components#quick-layout" },
    { text: "显示 查询/重置 按钮", href: "devguide/using-functional-components-in-pages/filter-components#show-query-reset-buttons" },
    { text: "条件变更后触发查询", href: "devguide/using-functional-components-in-pages/filter-components#condition-change-trigger-query" },
    { text: "首次加载进行筛选", href: "devguide/using-functional-components-in-pages/filter-components#first-load-filter" },
    { text: "筛选器的使用", href: "devguide/using-functional-components-in-pages/filter-components#filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="日历"
  href="devguide/using-functional-components-in-pages/time-management-components#calendar"
  description="日程管理和时间安排组件，支持事件创建、编辑和视图切换。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "devguide/using-functional-components-in-pages/time-management-components#data-model-preparation-and-component-creation" },
    { text: "基础配置", href: "devguide/using-functional-components-in-pages/time-management-components#basic-configuration" },
    { text: "日程类型", href: "devguide/using-functional-components-in-pages/time-management-components#schedule-type" },
    { text: "日/周/月视图切换", href: "devguide/using-functional-components-in-pages/time-management-components#day-week-month-view-switch" },
    { text: "切换时间", href: "devguide/using-functional-components-in-pages/time-management-components#switch-time" },
    { text: "列表展示及搜索", href: "devguide/using-functional-components-in-pages/time-management-components#list-display-and-search" },
    { text: "拖拽排期", href: "devguide/using-functional-components-in-pages/time-management-components#drag-schedule" },
    { text: "按钮配置", href: "devguide/using-functional-components-in-pages/time-management-components#button-configuration" },
    { text: "首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/time-management-components#refresh-data-on-first-component-load" },
    { text: "新增日程", href: "devguide/using-functional-components-in-pages/time-management-components#new-schedule" },
    { text: "拖拽日程", href: "devguide/using-functional-components-in-pages/time-management-components#drag-agenda" }
  ]} />
</IndexCard>

<IndexCard
  title="时间轴"
  href="devguide/using-functional-components-in-pages/time-management-components#timeline"
  description="时间线展示组件，适用于展示历史记录和流程进度。"
>
  <LinkGrid links={[
    { text: "数据模型准备及组件创建", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-data-model-preparation-and-component-creation" },
    { text: "基础配置", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-basic-configuration" },
    { text: "颜色类型", href: "devguide/using-functional-components-in-pages/time-management-components#color-type" },
    { text: "位置", href: "devguide/using-functional-components-in-pages/time-management-components#position" },
    { text: "按钮配置", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-button-configuration" },
    { text: "首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-refresh-data-on-first-component-load" }
  ]} />
</IndexCard>

<IndexCard
  title="甘特图"
  href="devguide/using-functional-components-in-pages/time-management-components#gantt-chart"
  description="项目管理和进度追踪组件，支持任务依赖关系和进度可视化。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-data-model-preparation-and-component-creation" },
    { text: "基础配置", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-basic-configuration" },
    { text: "进度", href: "devguide/using-functional-components-in-pages/time-management-components#progress" },
    { text: "层级关系", href: "devguide/using-functional-components-in-pages/time-management-components#hierarchical-relationship" },
    { text: "先后关系", href: "devguide/using-functional-components-in-pages/time-management-components#sequential-relationship" },
    { text: "日/周/月/季/年视图切换", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-view-switch" },
    { text: "列表显示字段", href: "devguide/using-functional-components-in-pages/time-management-components#list-display-fields" },
    { text: "浮层显示字段", href: "devguide/using-functional-components-in-pages/time-management-components#floating-layer-display-fields" },
    { text: "按钮配置", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-button-configuration" },
    { text: "首次加载组件时刷新数据", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-refresh-data-on-first-component-load" },
    { text: "拖拽日期进度", href: "devguide/using-functional-components-in-pages/time-management-components#drag-date-progress" },
    { text: "允许添加排期", href: "devguide/using-functional-components-in-pages/time-management-components#allow-add-schedule" }
  ]} />
</IndexCard>

<IndexCard
  title="按钮组件"
  href="devguide/using-functional-components-in-pages/button-components"
  description="各种类型的按钮组件，支持不同样式和交互效果。"
>
  <LinkGrid columns={2} links={[
    { text: "按钮组件创建", href: "devguide/using-functional-components-in-pages/button-components#button-component-creation" },
    { text: "按钮标题/图标/类型/大小配置", href: "devguide/using-functional-components-in-pages/button-components#title-icon-type-configuration" },
    { text: "按钮点击后事件", href: "devguide/using-functional-components-in-pages/button-components#click-event" }
  ]} />
</IndexCard>

<IndexCard
  title="布局组件（正在编辑中）"
  href="devguide/using-functional-components-in-pages/layout-components"
  description="页面布局和容器组件，包括弹窗、标签页等界面结构元素。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="审批组件"
  href="devguide/using-functional-components-in-pages/approval-components"
  description="审批流程相关的界面组件，支持申请发起和审批处理。"
>
  <LinkGrid columns={2} links={[
    { text: "发起申请组件的创建", href: "devguide/using-functional-components-in-pages/approval-components#create-initiate-application-component" },
    { text: "发起申请的参数配置", href: "devguide/using-functional-components-in-pages/approval-components#parameter-configuration-1" },
    { text: "发起申请的处理后/刷新后事件", href: "devguide/using-functional-components-in-pages/approval-components#post-processing-refresh-event" },
    { text: "审批处理组件创建", href: "devguide/using-functional-components-in-pages/approval-components#create-approval-workflow-component" },
    { text: "审批处理的参数配置", href: "devguide/using-functional-components-in-pages/approval-components#parameter-configuration-1" },
    { text: "是否保留历史审批记录", href: "devguide/using-functional-components-in-pages/approval-components#keep-historical-approval-records" },
    { text: "审批处理的处理后/刷新后事件", href: "devguide/using-functional-components-in-pages/approval-components#post-processing-refresh-event-1" }
  ]} />
</IndexCard>

<IndexCard
  title="支付组件"
  href="devguide/using-functional-components-in-pages/payment-components"
  description="集成支付功能的组件，支持多种支付方式和支付流程。"
>
  <LinkGrid links={[
    { text: "创建组件", href: "devguide/using-functional-components-in-pages/payment-components#payment-component-creation" },
    { text: "组件函数", href: "devguide/using-functional-components-in-pages/payment-components#initiate-payment-function" },
    { text: "组件事件逻辑", href: "devguide/using-functional-components-in-pages/payment-components#event-logic" },
    { text: "组件的使用", href: "devguide/using-functional-components-in-pages/payment-components#component-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="数据解析与导入"
  href="devguide/using-functional-components-in-pages/data-parsing-and-import"
  description="强大的数据导入和解析工具，支持Excel文件批量导入、数据清洗、条件筛选和主子表关联导入。"
>
  <LinkGrid columns={2} links={[
    { text: "页面添加导入组件", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#add-import-component-to-page" },
    { text: "导入流水号字段", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-serial-number-fields" },
    { text: "设置必填字段", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#set-required-fields" },
    { text: "导入子表数据", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-subtable-data" },
    { text: "追加导入/更新导入", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#append-import-or-update-import" },
    { text: "按条件导入数据", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-data-by-conditions" },
    { text: "添加导入说明文案", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#add-import-description-text" },
    { text: "导入前预处理/导入后触发函数", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#pre-processing-and-post-trigger-functions" },
    { text: "导入提示按钮点击后事件", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-hint-button-click-event" },
    { text: "新建解析Excel组件", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#create-parse-excel-component" },
    { text: "配置字段别名", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#configure-field-aliases" },
    { text: "调整字段顺序", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#adjust-field-order" },
    { text: "删除解析字段", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#delete-parse-fields" },
    { text: "新建自定义按钮", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#create-custom-buttons" },
    { text: "解析后事件", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#post-parse-events" }
  ]} />
</IndexCard>

<IndexCard
  title="全代码组件"
  href="devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="完全自定义的代码组件，支持高度个性化的功能实现。"
>
  <LinkGrid columns={2} links={[
    { text: "创建全代码组件", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications" },
    { text: "界面渲染器 Page 与逻辑处理类", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications" }
  ]} />
</IndexCard>

</div>

<div style={{textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999'}}>
  点击上方"查看更多组件"可收起
</div>

  </details>
</div>

## AI大模型
接入GPT-4、Claude、通义千问等主流大模型。支持多厂商容灾和私有化部署，为应用提供智能对话、文本生成、代码辅助等AI能力。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建AI大模型元素"
  href="devguide/ai-llm/create-ai-llm"
  description="学习如何集成主流大语言模型，配置API密钥，实现重试机制，并在应用中调用大模型函数。"
>
  <LinkGrid links={[
    { text: "主流大模型厂商支持列表", href: "devguide/ai-llm/create-ai-llm#mainstream-llm-vendor-support-list" },
    { text: "大模型厂商元素的创建", href: "devguide/ai-llm/create-ai-llm#creating-llm-vendor-elements" },
    { text: "重试及备用API Key机制", href: "devguide/ai-llm/create-ai-llm#retry-backup-api-key-mechanism" },
    { text: "私有化大模型集成", href: "devguide/ai-llm/create-ai-llm#private-llm-integration" },
    { text: "在页面中调用大模型", href: "devguide/ai-llm/llm-input-output#call-llm-in-pages" },
    { text: "在后端函数中调用大模型", href: "devguide/ai-llm/llm-input-output#call-llm-in-backend-functions" },
    { text: "大模型编程接口", href: "devguide/ai-llm/llm-input-output#llm-programming-interface" }
  ]} />
</IndexCard>

<IndexCard
  title="大模型输入与输出"
  href="devguide/ai-llm/llm-input-output"
  description="了解大语言模型的输入输出配置，实现最优的集成与性能表现。"
>
  <LinkGrid links={[
    { text: "在页面中调用大模型", href: "devguide/ai-llm/llm-input-output#call-llm-in-pages" },
    { text: "在后端函数中调用大模型", href: "devguide/ai-llm/llm-input-output#call-llm-in-backend-functions" },
    { text: "大模型编程接口", href: "devguide/ai-llm/llm-input-output#llm-programming-interface" }
  ]} />
</IndexCard>

<IndexCard
  title="使用大模型函数实现多模态AIGC"
  href="devguide/ai-llm/implement-multimodal-aigc"
  description="探索如何利用大模型函数创建包含文本、图像等多种媒体类型的多模态AI生成内容。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI知识库
将企业文档、手册、FAQ转化为智能知识库。支持文档自动处理、智能分段、语义检索，让AI基于企业知识精准回答问题。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建知识库元素"
  href="devguide/knowledge-base/create-knowledge-elements"
  description="学习如何创建AI知识库元素，并了解其工作原理。"
>
  <LinkGrid columns={2} links={[
    { text: "创建AI知识库元素", href: "devguide/knowledge-base/create-knowledge-elements#create-ai-knowledge-base-element" },
    { text: "原理说明", href: "devguide/knowledge-base/create-knowledge-elements#principle-description" },
    { text: "核心构成要素", href: "devguide/knowledge-base/create-knowledge-elements#core-components" },
    { text: "系统架构", href: "devguide/knowledge-base/create-knowledge-elements#system-architecture" },
    { text: "技术原理", href: "devguide/knowledge-base/create-knowledge-elements#technical-principles" },
    { text: "数据处理流程", href: "devguide/knowledge-base/create-knowledge-elements#data-processing-flow" },
    { text: "检索机制", href: "devguide/knowledge-base/create-knowledge-elements#retrieval-mechanism" }
  ]} />
</IndexCard>

<IndexCard
  title="知识库文档管理"
  href="devguide/knowledge-base/knowledge-base-document-management"
  description="管理知识库文档，配置知识库参数，进行查询测试与向量化调优。"
>
  <LinkGrid columns={2} links={[
    { text: "知识库设置", href: "devguide/knowledge-base/knowledge-base-document-management#ai-knowledge-base-settings" },
    { text: "查询测试", href: "devguide/knowledge-base/knowledge-base-document-management#query-testing" },
    { text: "向量化配置说明", href: "devguide/knowledge-base/knowledge-base-document-management#vectorization-configuration-description" },
    { text: "知识库配置参数说明", href: "devguide/knowledge-base/knowledge-base-document-management#knowledge-base-configuration-parameter-description" }
  ]} />
</IndexCard>

<IndexCard
  title="使用知识库元素实现关键词检索和语义检索"
  href="devguide/knowledge-base/full-text-and-semantic-search"
  description="理解配置项如何参与查询流程，并在后端可视化编程中调用知识库。"
>
  <LinkGrid columns={2} links={[
    { text: "在后端可视化编程中调用 AI 知识库", href: "devguide/knowledge-base/full-text-and-semantic-search#call-ai-knowledge-base-in-backend-visual-programming" },
    { text: "语义检索", href: "devguide/knowledge-base/full-text-and-semantic-search#semantic-search" },
    { text: "新增文档", href: "devguide/knowledge-base/full-text-and-semantic-search#adding-document" },
    { text: "删除文档", href: "devguide/knowledge-base/full-text-and-semantic-search#deleting-document" },
    { text: "关键词检索", href: "devguide/knowledge-base/full-text-and-semantic-search#searching-by-keywords" },
    { text: "AI 知识库设置如何参与查询流程", href: "devguide/knowledge-base/full-text-and-semantic-search#how-ai-knowledge-base-settings-participate-in-query-flow" }
  ]} />
</IndexCard>

<IndexCard
  title="把知识库集成到agent"
  href="devguide/knowledge-base/integrate-knowledge-base-into-agent"
  description="在Agent中集成知识库实现RAG。"
>
  <LinkGrid links={[
    { text: "知识库与Agent的关系", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#relationship-between-knowledge-base-and-agent" },
    { text: "技术集成原理", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#technical-integration-principle" },
    { text: "集成模式", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#integration-modes" },
    { text: "在Agent中使用知识库", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#use-knowledge-base-in-agent" }
  ]} />
</IndexCard>

<IndexCard
  title="向量数据库的独立部署"
  href="devguide/knowledge-base/vector-database-standalone-deployment"
  description="企业知识的智能存储引擎。将文本转化为向量数据，实现语义级精准搜索。"
>
  <LinkGrid columns={2} links={[
    { text: "独立部署方案：Chroma 向量数据库", href: "devguide/knowledge-base/vector-database-standalone-deployment#chroma-standalone-deployment" },
    { text: "独立部署的优势", href: "devguide/knowledge-base/vector-database-standalone-deployment#advantages-of-standalone-deployment" },
    { text: "Chroma 独立部署安装", href: "devguide/knowledge-base/vector-database-standalone-deployment#chroma-installation" },
    { text: "连接独立部署的Chroma数据库", href: "devguide/knowledge-base/vector-database-standalone-deployment#connect-to-standalone-chroma" },
    { text: "开发测试环境：本地化配置", href: "devguide/knowledge-base/vector-database-standalone-deployment#local-development-config" },
    { text: "向量数据库编程接口", href: "devguide/knowledge-base/vector-database-standalone-deployment#vector-database-programming-interface" },
    { text: "health_check", href: "devguide/knowledge-base/vector-database-standalone-deployment#health_check" },
    { text: "create_collection", href: "devguide/knowledge-base/vector-database-standalone-deployment#create_collection" },
    { text: "add_vectors", href: "devguide/knowledge-base/vector-database-standalone-deployment#add_vectors" },
    { text: "query_vectors", href: "devguide/knowledge-base/vector-database-standalone-deployment#query_vectors" }
  ]} />
</IndexCard>

<IndexCard
  title="AI知识库的API开放"
  href="devguide/knowledge-base/ai-knowledge-base-api-exposure"
  description="通过API接口开放AI知识库能力，实现与外部系统集成。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AIAgent
具备推理和行动能力的智能代理。通过提示词和工具配置，让AI自主分析问题、制定方案、执行任务，处理复杂业务场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建AI Agent"
  href="devguide/ai-agent/create-ai-agent"
  description="学习如何创建ReActAgent，配置系统提示词、大模型参数、输入输出变量，以及运行状态存储等基础配置。"
>
  <LinkGrid columns={2} links={[
    { text: "创建ReActAgent", href: "devguide/ai-agent/create-ai-agent#create-react-agent" },
    { text: "编写系统提示词", href: "devguide/ai-agent/create-ai-agent#write-system-prompt" },
    { text: "选择模型并配置参数", href: "devguide/ai-agent/create-ai-agent#select-model-and-configure-parameters" },
    { text: "为Agent编写简介描述", href: "devguide/ai-agent/create-ai-agent#write-agent-description" },
    { text: "配置运行状态存储仓", href: "devguide/ai-agent/create-ai-agent#configure-runtime-state-storage" },
    { text: "内存存储", href: "devguide/ai-agent/create-ai-agent#memory-storage" },
    { text: "数据库存储", href: "devguide/ai-agent/create-ai-agent#database-storage" },
    { text: "源码模式修改Agent", href: "devguide/ai-agent/create-ai-agent#modify-agent-in-source-code-mode" },
    { text: "自定义回调处理器", href: "devguide/ai-agent/create-ai-agent#custom-callback-processor" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent中的工具"
  href="devguide/ai-agent/agent-tools"
  description="深入了解Agent中各种工具的使用方法和最佳实践，包括模型函数、服务函数、MCP服务、外部API和页面函数。"
>
  <LinkGrid columns={2} links={[
    { text: "Agent调用模型函数", href: "devguide/ai-agent/agent-tools#agent-call-model-functions" },
    { text: "Agent调用服务函数", href: "devguide/ai-agent/agent-tools#agent-calling-service-functions" },
    { text: "Agent调用MCP服务", href: "devguide/ai-agent/agent-tools#agent-call-mcp-service" },
    { text: "将MCP配置转为环境变量", href: "devguide/ai-agent/agent-tools#convert-mcp-config-to-environment-variables" },
    { text: "Agent调用外部API", href: "devguide/ai-agent/agent-tools#agent-call-external-api" },
    { text: "Agent调用页面函数", href: "devguide/ai-agent/agent-tools#agent-call-page-functions" },
    { text: "启用/关闭工具函数", href: "devguide/ai-agent/agent-tools#enable-disable-tool-functions" },
    { text: "工具函数调用前/后事件触发", href: "devguide/ai-agent/agent-tools#tool-function-call-pre-post-event-triggering" },
    { text: "工具函数执行前的人工确认", href: "devguide/ai-agent/agent-tools#manual-confirmation-before-tool-execution" },
    { text: "限制工具函数调用的用户角色", href: "devguide/ai-agent/agent-tools#restrict-user-roles-for-tool-calls" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent的输入与输出"
  href="devguide/ai-agent/agent-input-output"
  description="详细了解Agent的输入输出配置和数据处理方式，包括变量配置、流式输出和调用方法。"
>
  <LinkGrid columns={2} links={[
    { text: "配置输入变量", href: "devguide/ai-agent/agent-input-output#configure-input-variables" },
    { text: "在提示词中使用变量", href: "devguide/ai-agent/agent-input-output#use-variables-in-prompt" },
    { text: "配置输出结果", href: "devguide/ai-agent/agent-input-output#configure-output-results" },
    { text: "Agent的流式输出", href: "devguide/ai-agent/agent-input-output#agent-streaming-output" },
    { text: "在前端函数中调用Agent", href: "devguide/ai-agent/agent-input-output#call-agent-in-frontend-functions" },
    { text: "在后端服务函数中调用Agent", href: "devguide/ai-agent/agent-input-output#call-agent-in-backend-service-functions" },
    { text: "在页面助理中测试Agent", href: "devguide/ai-agent/agent-input-output#test-agent-in-page-assistant" }
  ]} />
</IndexCard>

<IndexCard
  title="使用知识库实现检索增强生成（RAG）"
  href="devguide/ai-agent/agent-knowledge-base"
  description="学习如何为Agent集成知识库，实现检索增强生成，提升回答的准确性和时效性。"
>
  <LinkGrid links={[
    { text: "集成知识库实现检索增强生成（RAG）", href: "devguide/ai-agent/agent-knowledge-base#integrate-knowledge-base-rag" }
  ]} />
</IndexCard>

<IndexCard
  title="使用Agent实现单任务智能体"
  href="devguide/ai-agent/single-task-intelligent-agent"
  description="学习如何使用Agent实现专门的单任务智能体，优化特定业务场景的处理效果。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Agent的API开放"
  href="devguide/ai-agent/agent-api-exposure"
  description="将Agent能力通过API形式开放给外部系统调用。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI助理
可视化的智能工作流引擎。通过拖拽节点编排业务流程，结合AI决策和人机交互，实现客服、审批、数据处理等场景的智能自动化。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建AI助理元素"
  href="devguide/ai-assistant/create-ai-assistant"
  description="学习如何创建AI助理元素，配置工作流、节点类型和事件处理，实现智能业务流程自动化。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="流程编排与节点配置"
  href="devguide/ai-assistant/process-orchestration-node-configuration"
  description="深入了解AI助理流程编排技术和详细的节点配置方法。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="AI助理的输入与输出"
  href="devguide/ai-assistant/ai-assistant-input-output"
  description="理解AI助理的输入输出配置和数据处理方法。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="AI助理的API开放"
  href="devguide/ai-assistant/ai-assistant-api-exposure"
  description="通过API接口开放AI助理能力，实现与外部系统的集成。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

</div>

## 数据建模
为你的应用设计强大的数据基础。无需复杂的SQL知识，通过可视化方式创建数据表，设计字段类型，建立关联关系。让数据管理变得轻松高效。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="数据表模型"
  href="devguide/data-modeling/data-table-model"
  description="应用数据的基础结构，学习如何创建和配置数据表，设计字段类型和约束。"
>
  <LinkGrid links={[
    { text: "创建数据表模型", href: "devguide/data-modeling/data-table-model" },
    { text: "设计表字段与数据类型", href: "devguide/data-modeling/data-table-model#design-table-fields-and-data-types" },
    { text: "配置表索引优化查询", href: "devguide/data-modeling/data-table-model#configure-table-index-optimization" }
  ]} />
</IndexCard>

<IndexCard
  title="从已有数据库模式创建数据表"
  href="devguide/data-modeling/create-data-table-from-existing-tables"
  description="从现有数据库表快速创建数据表元素，支持快速模型生成。"
>
  <LinkGrid links={[
    { text: "从已有数据表中创建数据表", href: "devguide/data-modeling/create-data-table-from-existing-tables" },
  ]} />
</IndexCard>

<IndexCard
  title="内置数据管理工具"
  href="devguide/data-modeling/built-in-data-management-tools"
  description="利用内置数据管理工具进行高效的数据操作和管理。"
>
  <LinkGrid links={[
    { text: "内置数据管理工具", href: "devguide/data-modeling/built-in-data-management-tools" },
  ]} />
</IndexCard>

<IndexCard
  title="创建数据模型函数"
  href="devguide/data-modeling/create-data-model-functions"
  description="设计和实现自定义数据模型函数，扩展数据处理能力。"
>
  <LinkGrid links={[
    { text: "创建数据模型函数", href: "devguide/data-modeling/create-data-model-functions" },
  ]} />
</IndexCard>

<IndexCard
  title="聚合表模型"
  href="devguide/data-modeling/aggregate-table-model"
  description="多表数据整合和统计分析，支持复杂的数据聚合和计算功能。"
>
  <LinkGrid columns={2} links={[
    { text: "新建聚合表模型", href: "devguide/data-modeling/aggregate-table-model" },
    { text: "多表数据合并", href: "devguide/data-modeling/aggregate-table-model#multi-table-data-merge" },
    { text: "多表横向连接", href: "devguide/data-modeling/aggregate-table-model#multi-table-horizontal-connection" },
    { text: "分组聚合统计", href: "devguide/data-modeling/aggregate-table-model#group-aggregate-statistics" },
    { text: "扩展自定义计算字段", href: "devguide/data-modeling/aggregate-table-model#extend-custom-calculation-fields" },
    { text: "先聚合后筛选", href: "devguide/data-modeling/aggregate-table-model#aggregate-then-filter" },
    { text: "先筛选后聚合（推荐）", href: "devguide/data-modeling/aggregate-table-model#aggregate-then-filter" }
  ]} />
</IndexCard>

<IndexCard
  title="扩展表模型"
  href="devguide/data-modeling/extended-table-model"
  description="基于现有表的数据扩展，通过关联其他数据表实现业务字段扩展和多表数据整合。"
>
  <LinkGrid columns={2} links={[
    { text: "扩展表创建", href: "devguide/data-modeling/extended-table-model" },
    { text: "连接设计", href: "devguide/data-modeling/extended-table-model#connection-design" },
    { text: "设置基准表筛选条件", href: "devguide/data-modeling/extended-table-model#set-baseline-table-filter-conditions" },
    { text: "添加数据表", href: "devguide/data-modeling/extended-table-model#add-data-table" },
    { text: "实时编辑统计表配置", href: "devguide/data-modeling/extended-table-model#real-time-edit-statistics-table-configuration" },
    { text: "字段统计", href: "devguide/data-modeling/extended-table-model#field-statistics" },
    { text: "添加公式字段", href: "devguide/data-modeling/extended-table-model#add-formula-field" },
    { text: "修改字段别名", href: "devguide/data-modeling/extended-table-model#modify-field-alias" },
    { text: "函数设计", href: "devguide/data-modeling/extended-table-model#function-design" },
    { text: "新建函数", href: "devguide/data-modeling/extended-table-model#create-function" },
    { text: "源代码查看编辑", href: "devguide/data-modeling/extended-table-model#source-code-view-edit" }
  ]} />
</IndexCard>

<IndexCard
  title="在页面和函数中使用数据模型"
  href="devguide/data-modeling/calling-data-models-in-pages-and-functions"
  description="学习如何在前端页面和后端函数逻辑中有效使用数据模型进行数据操作。"
>
  <LinkGrid columns={2} links={[
    { text: "模型内置函数", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#built-in-model-functions" },
    { text: "在页面中调用数据模型", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-pages" },
    { text: "在函数中调用数据模型", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="数据对象模型"
  href="devguide/data-modeling/data-object-model"
  description="专为全代码开发模式设计的数据结构，类似于DTO，用于业务逻辑中的数据结构化表达与传递。"
>
  <LinkGrid links={[
    { text: "数据对象模型创建", href: "devguide/data-modeling/data-object-model" },
    { text: "数据对象模型使用", href: "devguide/data-modeling/data-object-model#using-data-object-model" },
    { text: "自定义字段", href: "devguide/data-modeling/data-object-model#customizing-fields" },
    { text: "模型函数重写", href: "devguide/data-modeling/data-object-model#overriding-model-functions" },
    { text: "定义新函数", href: "devguide/data-modeling/data-object-model#defining-new-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="在AI Agent中调用数据模型"
  href="devguide/data-modeling/calling-data-models-in-ai-agent"
  description="将数据模型函数添加为Agent工具，使AI能够智能地执行数据的创建、读取、更新、删除等操作。"
>
  <LinkGrid links={[
    { text: "数据模型作为Agent工具", href: "devguide/data-modeling/calling-data-models-in-ai-agent#data-models-as-agent-tools" }
  ]} />
</IndexCard>


<IndexCard
  title="管理数据库连接"
  href="devguide/data-modeling/manage-database-connections"
  description="配置和管理多个数据库连接，支持多数据源应用开发。"
>
  <LinkGrid links={[
    { text: "创建数据库连接", href: "devguide/data-modeling/manage-database-connections#create-database-connection" },
    { text: "多数据库连接管理", href: "devguide/data-modeling/manage-database-connections#multi-database-connection-management" },
    { text: "数据库连接安全配置", href: "devguide/data-modeling/manage-database-connections#database-connection-security-configuration" },
    { text: "连接测试与故障排查", href: "devguide/data-modeling/manage-database-connections#connection-test-and-troubleshooting" }
  ]} />
</IndexCard>

<IndexCard
  title="支持的数据库厂商"
  href="devguide/data-modeling/supported-database-vendors"
  description="了解JitAi支持的各种数据库类型和连接配置。"
>
  <LinkGrid links={[
    { text: "场景选择建议", href: "devguide/data-modeling/supported-database-vendors#scenario-selection-suggestions" },
    { text: "与云厂商的兼容性说明", href: "devguide/data-modeling/supported-database-vendors#cloud-vendor-compatibility" },
    { text: "数据库元素使用", href: "devguide/data-modeling/supported-database-vendors#database-element-usage" }
  ]} />
</IndexCard>
</div>

## 事务管理
确保复杂业务操作中的数据一致性和可靠性。掌握数据库事务控制机制，实现原子操作，有效处理并发访问场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="事务管理"
  href="devguide/data-modeling/transaction-management"
  description="数据库事务控制和一致性管理，确保数据操作的可靠性。"
>
  <LinkGrid links={[
    { text: "默认事务管理机制", href: "devguide/data-modeling/transaction-management#default-transaction-management-mechanism" },
    { text: "手动事务提交/回滚", href: "devguide/data-modeling/transaction-management#manual-transaction-commit-rollback" },
    { text: "事务装饰器", href: "devguide/data-modeling/transaction-management#transaction-decorator" }
  ]} />
</IndexCard>

</div>

## 用户与权限
构建安全可靠的用户体系。支持多种登录方式，灵活设计组织架构，精细化权限分配。让不同用户各司其职，确保数据安全和操作规范。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="组织架构"
  href="devguide/user-and-permission/organizational-structure"
  description="企业组织结构管理，包括部门、岗位和人员层级关系配置。"
>
  <LinkGrid links={[
    { text: "标准组织架构", href: "devguide/user-and-permission/organizational-structure#standard-organization" },
    { text: "允许新注册用户加入", href: "devguide/user-and-permission/organizational-structure#allowing-new-registered-users-to-join" },
    { text: "钉钉自建组织", href: "devguide/user-and-permission/organizational-structure#dingtalk-custom-organization" },
    { text: "企业微信自建组织", href: "devguide/user-and-permission/organizational-structure#wechat-work-custom-organization" },
    { text: "通讯录管理入口", href: "devguide/user-and-permission/organizational-structure#contact-management-entry" },
    { text: "钉钉自建组织", href: "devguide/user-and-permission/organizational-structure#dingtalk-custom-organization" },
    { text: "企业微信自建组织", href: "devguide/user-and-permission/organizational-structure#wechat-work-custom-organization" },
    { text: "Microsoft Teams", href: "devguide/user-and-permission/organizational-structure#microsoft-teams" },
    { text: "部门成员搜索", href: "devguide/user-and-permission/organizational-structure#department-member-search" },
    { text: "设置组织负责人", href: "devguide/user-and-permission/organizational-structure#setting-organization-leader" },
    { text: "新建部门", href: "devguide/user-and-permission/organizational-structure#creating-department" },
    { text: "添加成员", href: "devguide/user-and-permission/organizational-structure#adding-member" },
    { text: "导入成员", href: "devguide/user-and-permission/organizational-structure#importing-members" },
    { text: "导出成员", href: "devguide/user-and-permission/organizational-structure#exporting-members" },
    { text: "调整部门", href: "devguide/user-and-permission/organizational-structure#adjusting-department" },
    { text: "成员转为离职", href: "devguide/user-and-permission/organizational-structure#member-resignation" },
    { text: "新建角色", href: "devguide/user-and-permission/organizational-structure#creating-role" },
    { text: "新建角色组", href: "devguide/user-and-permission/organizational-structure#creating-role-group" },
    { text: "管理角色成员", href: "devguide/user-and-permission/organizational-structure#managing-role-members" },
    { text: "同步钉钉组织架构", href: "devguide/user-and-permission/organizational-structure#syncing-dingtalk-organization-structure" },
    { text: "同步企业微信组织架构", href: "devguide/user-and-permission/organizational-structure#syncing-wechat-work-organization-structure" },
  ]} />
</IndexCard>

<IndexCard
  title="登录认证"
  href="devguide/user-and-permission/login-authentication"
  description="用户身份验证和登录方式配置，支持多种认证模式。"
>
  <LinkGrid links={[
    { text: "创建登录方式", href: "devguide/user-and-permission/login-authentication#creating-login-method" },
    { text: "账号密码登录", href: "devguide/user-and-permission/login-authentication#account-password-login" },
    { text: "手机号登录", href: "devguide/user-and-permission/login-authentication#mobile-phone-login" },
    { text: "阿里云短信", href: "devguide/user-and-permission/login-authentication#aliyun-sms" },
    { text: "AWS SNS短信", href: "devguide/user-and-permission/login-authentication#aws-sns" },
    { text: "Twilio短信", href: "devguide/user-and-permission/login-authentication#twilio" },
    { text: "钉钉自建扫码登录", href: "devguide/user-and-permission/login-authentication#dingtalk-custom-qr-login" },
    { text: "企业微信自建扫码登录", href: "devguide/user-and-permission/login-authentication#wechat-work-custom-qr-login" },
    { text: "微信登录", href: "devguide/user-and-permission/login-authentication#wechat-login" },
    { text: "微信公众号登录", href: "devguide/user-and-permission/login-authentication#wechat-official-account-login" },
    { text: "微信小程序登录", href: "devguide/user-and-permission/login-authentication#wechat-mini-program-login" },
    { text: "Github登录", href: "devguide/user-and-permission/login-authentication#github-login" },
    { text: "Google登录", href: "devguide/user-and-permission/login-authentication#google-login" },
  ]} />
</IndexCard>

<IndexCard
  title="Role and Portal Menu Permissions"
  href="devguide/user-and-permission/role-portal-menu-permissions"
  description="应用角色定义和权限分配，实现细粒度的访问控制。"
>
  <LinkGrid columns={2} links={[
    { text: "内置的3种应用角色", href: "devguide/user-and-permission/role-portal-menu-permissions#built-in-three-application-roles" },
    { text: "匿名用户", href: "devguide/user-and-permission/role-portal-menu-permissions#anonymous-user" },
    { text: "开发者", href: "devguide/user-and-permission/role-portal-menu-permissions#developer" },
    { text: "管理员", href: "devguide/user-and-permission/role-portal-menu-permissions#administrator" },
    { text: "创建应用角色", href: "devguide/user-and-permission/role-portal-menu-permissions#create-application-role" },
    { text: "应用角色的权限配置", href: "devguide/user-and-permission/role-portal-menu-permissions#application-role-permission-configuration" },
    { text: "指定可访问的门户及菜单", href: "devguide/user-and-permission/role-portal-menu-permissions#specify-accessible-portals-and-menus" },
    { text: "在开发者门户中管理应用角色成员", href: "devguide/user-and-permission/role-portal-menu-permissions#manage-application-role-members-in-developer-portal" },
    { text: "组件的按钮权限控制", href: "devguide/user-and-permission/role-portal-menu-permissions#component-button-permission-control" },
    { text: "组件的数据字段读/写/统计权限控制", href: "devguide/user-and-permission/role-portal-menu-permissions#component-data-field-access-control" },
    { text: "多应用角色的分级管理", href: "devguide/user-and-permission/role-portal-menu-permissions#hierarchical-management-of-multiple-application-roles" },
    { text: "应用角色成员的管理", href: "devguide/user-and-permission/role-portal-menu-permissions#application-role-member-management" },
    { text: "成员的添加/删除", href: "devguide/user-and-permission/role-portal-menu-permissions#member-addition-and-removal" },
    { text: "成员在组织架构中的管理范围设置", href: "devguide/user-and-permission/role-portal-menu-permissions#member-management-scope-settings-in-org-structure" }
  ]} />
</IndexCard>

<IndexCard
  title="角色与业务元素权限"
  href="devguide/user-and-permission/roles-and-business-element-permissions"
  description="业务元素的高级基于角色的权限控制，包括数据模型和功能组件的权限管理。"
>
  <LinkGrid links={[
    { text: "门户级的数据操作类型和操作范围控制", href: "devguide/user-and-permission/roles-and-business-element-permissions#portal-level-data-operation-type-and-scope-control" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent工具权限控制"
  href="devguide/user-and-permission/agent-tool-permission-control"
  description="配置和管理AI Agent工具的权限控制，确保代理操作的安全性和可控性。"
>
  <LinkGrid links={[
    { text: "配置Agent的工具执行权限", href: "devguide/user-and-permission/agent-tool-permission-control#configure-agent-tool-execution-permissions" }
  ]} />
</IndexCard>

</div>

## 业务逻辑开发
赋予应用强大的业务处理能力。通过可视化编程处理复杂业务规则，响应用户操作，执行后台任务。让逻辑编写像搭积木一样直观易懂。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建服务元素"
  href="devguide/business-logic-development/creating-service-elements"
  description="后端业务逻辑实现，通过服务元素封装可复用的业务函数，提供API接口和数据处理服务。"
>
  <LinkGrid columns={2} links={[
    { text: "创建服务函数", href: "devguide/business-logic-development/creating-service-elements#create-service-functions" },
    { text: "源码模式编辑服务函数", href: "devguide/business-logic-development/creating-service-elements#edit-service-functions-source-code-mode" },
    { text: "添加新的依赖库", href: "devguide/business-logic-development/creating-service-elements#add-new-dependency-library" },
    { text: "使用跨App服务元素调用授权接口", href: "devguide/business-logic-development/creating-service-elements#use-cross-app-service-elements-to-call-authorized-interfaces" },
    { text: "创建跨App服务元素", href: "devguide/business-logic-development/creating-service-elements#create-cross-app-service-elements" },
    { text: "在函数逻辑中使用跨App服务元素", href: "devguide/business-logic-development/creating-service-elements#use-cross-app-service-elements-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="在服务函数中调用其它元素"
  href="devguide/business-logic-development/calling-other-elements-in-service-functions"
  description="学习如何在服务函数中调用其他元素，包括模型、其他服务、外部API和系统组件，实现全面的业务逻辑实现。"
>
  <LinkGrid columns={2} links={[
    { text: "使用平台API调用其它元素", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#use-platform-api-to-call-other-elements" },
    { text: "调用数据模型函数", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-data-model-function" },
    { text: "调用其它服务函数", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-other-service-functions" },
    { text: "调用外部API", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-external-api" },
    { text: "调用AI大模型", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-ai-llm" },
    { text: "调用AI Agent", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-ai-agent" }
  ]} />
</IndexCard>

<IndexCard
  title="服务元素使用场景"
  href="devguide/business-logic-development/service-elements-usage-scenarios"
  description="探索服务元素在不同业务场景和应用架构中的实际使用场景和最佳实践。"
>
  <LinkGrid links={[
    { text: "服务函数在哪里使用", href: "devguide/business-logic-development/service-elements-usage-scenarios#where-service-functions-are-used" },
    { text: "让AI更准确地理解服务函数", href: "devguide/business-logic-development/service-elements-usage-scenarios#help-ai-understand-service-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="后台任务"
  href="devguide/business-logic-development/background-tasks"
  description="定时任务和异步处理，支持复杂的后台业务流程。"
>
  <LinkGrid columns={2} links={[
    { text: "创建任务", href: "devguide/business-logic-development/background-tasks#creating-tasks" },
    { text: "定时任务", href: "devguide/business-logic-development/background-tasks#scheduled-tasks" },
    { text: "日期字段任务", href: "devguide/business-logic-development/background-tasks#date-field-tasks" },
    { text: "通用配置项", href: "devguide/business-logic-development/background-tasks#general-configuration-items" },
    { text: "开发任务执行函数", href: "devguide/business-logic-development/background-tasks#developing-task-execution-functions" },
    { text: "查看执行记录", href: "devguide/business-logic-development/background-tasks#viewing-execution-records" },
    { text: "源码模式", href: "devguide/business-logic-development/background-tasks#source-code-mode" }
  ]} />
</IndexCard>

<IndexCard
  title="事件处理"
  href="devguide/business-logic-development/event-handling"
  description="系统事件监听和处理机制，实现响应式业务逻辑。"
>
  <LinkGrid columns={2} links={[
    { text: "创建事件", href: "devguide/business-logic-development/event-handling#creating-events" },
    { text: "模型事件", href: "devguide/business-logic-development/event-handling#model-events" },
    { text: "审批事件", href: "devguide/business-logic-development/event-handling#approval-events" },
    { text: "自定义事件", href: "devguide/business-logic-development/event-handling#custom-events" },
    { text: "ai-assistant事件", href: "devguide/business-logic-development/event-handling#ai-assistant-events" },
    { text: "Agent工具调用事件", href: "devguide/business-logic-development/event-handling#agent-tool-call-events" },
    { text: "用服务函数替换事件内函数", href: "devguide/business-logic-development/event-handling#replacing-event-internal-function-with-service-function" },
    { text: "启用事件", href: "devguide/business-logic-development/event-handling#enabling-events" },
    { text: "同步/异步执行事件", href: "devguide/business-logic-development/event-handling#executing-events-synchronously-asynchronously" },
    { text: "查看事件执行记录", href: "devguide/business-logic-development/event-handling#viewing-event-execution-records" },
    { text: "查看/编辑全代码", href: "devguide/business-logic-development/event-handling#viewing-editing-full-code" }
  ]} />
</IndexCard>

</div>

## 审批流程
让企业审批流程变得高效有序。通过拖拽方式设计流程图，配置审批人和条件，自动化处理流转。告别繁琐的纸质审批，拥抱数字化办公。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="审批流程基础配置"
  href="devguide/approval-workflow/approval-workflow-basic-configuration"
  description="审批流程的创建和基础设置，包括流程节点配置和路径设计。"
>
  <LinkGrid columns={2} links={[
    { text: "创建流程", href: "devguide/approval-workflow/approval-workflow-basic-configuration#create-process" },
    { text: "拖拽流程节点", href: "devguide/approval-workflow/approval-workflow-basic-configuration#drag-process-node" },
    { text: "审批流程默认页面", href: "devguide/approval-workflow/approval-workflow-basic-configuration#approval-workflow-default-page" },
    { text: "其他流程配置", href: "devguide/approval-workflow/approval-workflow-basic-configuration#other-process-configuration" },
    { text: "同步审批信息到数据表模型", href: "devguide/approval-workflow/approval-workflow-basic-configuration#sync-approval-info-to-data-table-model" },
    { text: "同步到第三方审批待办", href: "devguide/approval-workflow/approval-workflow-basic-configuration#sync-to-third-party-approval-todo" },
    { text: "评论功能", href: "devguide/approval-workflow/approval-workflow-basic-configuration#comment-function" },
    { text: "分享", href: "devguide/approval-workflow/approval-workflow-basic-configuration#share" },
    { text: "打印审批单", href: "devguide/approval-workflow/approval-workflow-basic-configuration#print-approval-form" },
    { text: "复用其他审批流程", href: "devguide/approval-workflow/approval-workflow-basic-configuration#reuse-other-approval-workflowes" }
  ]} />
</IndexCard>

<IndexCard
  title="发起节点配置"
  href="devguide/approval-workflow/start-node-configuration"
  description="审批流程起始节点的配置，定义申请发起的条件和规则。"
>
  <LinkGrid columns={2} links={[
    { text: "流程撤销功能", href: "devguide/approval-workflow/start-node-configuration#process-cancellation-function" },
    { text: "审批催办", href: "devguide/approval-workflow/start-node-configuration#approval-reminder" },
    { text: "审批暂存", href: "devguide/approval-workflow/start-node-configuration#approval-draft" },
    { text: "消息通知", href: "devguide/approval-workflow/start-node-configuration#anchor-414" },
    { text: "当前节点用到的页面", href: "devguide/approval-workflow/start-node-configuration#pages-used-by-current-node" },
    { text: "摘要信息显示", href: "devguide/approval-workflow/start-node-configuration#summary-display" },
    { text: "字段的查看编辑权限", href: "devguide/approval-workflow/start-node-configuration#field-view-edit-permissions" },
    { text: "布局控件权限", href: "devguide/approval-workflow/start-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="审批节点配置"
  href="devguide/approval-workflow/approval-node-configuration"
  description="审批环节的详细配置，包括审批人设置和审批规则。"
>
  <LinkGrid columns={2} links={[
    { text: "审批人设置", href: "devguide/approval-workflow/approval-node-configuration#approver-settings" },
    { text: "审批流转规则", href: "devguide/approval-workflow/approval-node-configuration#approval-flow-rules" },
    { text: "审批流程处理规则", href: "devguide/approval-workflow/approval-node-configuration#approval-workflow-rules" },
    { text: "审批扩展功能配置", href: "devguide/approval-workflow/approval-node-configuration#approval-extended-function-configuration" },
    { text: "去重审批", href: "devguide/approval-workflow/approval-node-configuration#deduplication-approval" },
    { text: "限时处理", href: "devguide/approval-workflow/approval-node-configuration#time-limited-processing" },
    { text: "审批暂存", href: "devguide/approval-workflow/approval-node-configuration#approval-draft" },
    { text: "审批意见反馈", href: "devguide/approval-workflow/approval-node-configuration#approval-feedback" },
    { text: "手写签名", href: "devguide/approval-workflow/approval-node-configuration#handwritten-signature" },
    { text: "允许批量审批", href: "devguide/approval-workflow/approval-node-configuration#allow-batch-approval" },
    { text: "消息通知", href: "devguide/approval-workflow/approval-node-configuration#message-notification" },
    { text: "短信通知", href: "devguide/approval-workflow/approval-node-configuration#sms-notification" },
    { text: "审批页面与权限控制", href: "devguide/approval-workflow/approval-node-configuration#approval-page-permission-control" },
    { text: "当前节点用到的页面", href: "devguide/approval-workflow/approval-node-configuration#pages-used-by-current-node" },
    { text: "摘要信息显示", href: "devguide/approval-workflow/approval-node-configuration#summary-display" },
    { text: "字段权限", href: "devguide/approval-workflow/approval-node-configuration#fieldpermission" },
    { text: "布局控件权限", href: "devguide/approval-workflow/approval-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="特殊节点配置"
  href="devguide/approval-workflow/special-node-configuration"
  description="条件节点、并行节点等特殊流程节点的配置方法。"
>
  <LinkGrid columns={2} links={[
    { text: "抄送节点", href: "devguide/approval-workflow/special-node-configuration#cc-node" },
    { text: "抄送人", href: "devguide/approval-workflow/special-node-configuration#sms-notification" },
    { text: "短信通知", href: "devguide/approval-workflow/special-node-configuration#sms-notification" },
    { text: "当前节点用到的页面", href: "devguide/approval-workflow/special-node-configuration#pages-used-by-current-node" },
    { text: "字段权限", href: "devguide/approval-workflow/special-node-configuration#fieldpermission" },
    { text: "布局控件权限", href: "devguide/approval-workflow/special-node-configuration#layout-control-permissions" },
    { text: "分支节点", href: "devguide/approval-workflow/special-node-configuration#branch-node" },
    { text: "并行节点", href: "devguide/approval-workflow/special-node-configuration#parallel-node" },
    { text: "子流程节点", href: "devguide/approval-workflow/special-node-configuration#sub-process-node" },
    { text: "子流程名称", href: "devguide/approval-workflow/special-node-configuration#sub-process-name" },
    { text: "子流程发起人", href: "devguide/approval-workflow/special-node-configuration#sub-process-initiator" },
    { text: "子流程流转规则", href: "devguide/approval-workflow/special-node-configuration#sub-process-flow-rules" },
    { text: "当主流程流转至子流程", href: "devguide/approval-workflow/special-node-configuration#when-main-process-flows-to-sub-process" },
    { text: "子流程流转后函数设计", href: "devguide/approval-workflow/special-node-configuration#sub-process-post-flow-function-design" },
    { text: "单个子流程结束时更新主流程数据", href: "devguide/approval-workflow/special-node-configuration#update-main-process-data-single-sub-process-end" },
    { text: "所有子流程结束时更新主流程数据", href: "devguide/approval-workflow/special-node-configuration#update-main-process-data-all-sub-processes-end" }
  ]} />
</IndexCard>

<IndexCard
  title="审批页面定制"
  href="devguide/approval-workflow/approval-page-customization"
  description="自定义审批界面和用户体验，提升审批效率。"
>
  <LinkGrid links={[
    { text: "审批页面高级定制", href: "devguide/approval-workflow/approval-page-customization#approval-page-advanced-customization" },
    { text: "审批页面类型", href: "devguide/approval-workflow/approval-page-customization#approval-page-types" },
    { text: "自定义页面创建方式", href: "devguide/approval-workflow/approval-page-customization#custom-page-creation-method" }
  ]} />
</IndexCard>

<IndexCard
  title="审批流程的使用"
  href="devguide/approval-workflow/approval-workflow-usage"
  description="审批流程的实际应用和操作指南，包括发起和处理审批。"
>
  <LinkGrid links={[
    { text: "发起申请", href: "devguide/approval-workflow/approval-workflow-usage#initiate-application" },
    { text: "待办中心", href: "devguide/approval-workflow/approval-workflow-usage#todo-center" },
    { text: "详情页面", href: "devguide/approval-workflow/approval-workflow-usage#detail-page" },
    { text: "委托他人处理", href: "devguide/approval-workflow/approval-workflow-usage#delegate-to-others-processing" },
    { text: "审批流程管理页面", href: "devguide/approval-workflow/approval-workflow-usage#approval-workflow-management-page" }
  ]} />
</IndexCard>

<IndexCard
  title="在审批流程中调用业务逻辑元素"
  href="devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow"
  description="学习如何在审批流程中调用业务逻辑元素，实现复杂业务规则和自动化决策。"
>
  <LinkGrid links={[
    { text: "通过审批事件调用业务逻辑", href: "devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow#calling-business-logic-through-approval-events" },
    { text: "子流程中函数处理", href: "devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow#function-processing-in-subprocesses" }
  ]} />
</IndexCard>

<IndexCard
  title="在审批流程中集成AI元素"
  href="devguide/approval-workflow/integrating-ai-in-approval-workflow"
  description="将人工智能能力集成到审批流程中，实现智能路由、自动审查和智能决策。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

</div>

## 文件处理
轻松处理应用中的各种文件需求。支持多种格式文件上传下载，动态生成Word、Excel文档，让文件操作变得简单便捷。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="文件存储"
  href="devguide/file-processing/file-storage"
  description="文件上传、存储和管理系统，支持多种存储方式和文件操作。"
>
  <LinkGrid columns={2} links={[
    { text: "本地存储配置", href: "devguide/file-processing/file-storage#local-storage-configuration" },
    { text: "添加本地存储", href: "devguide/file-processing/file-storage#add-local-storage" },
    { text: "指定磁盘存储目录", href: "devguide/file-processing/file-storage#specify-disk-storage-directory" },
    { text: "云存储服务配置", href: "devguide/file-processing/file-storage#cloud-storage-service-configuration" },
    { text: "阿里云OSS", href: "devguide/file-processing/file-storage#aliyun-oss" },
    { text: "移动云EOS", href: "devguide/file-processing/file-storage#china-mobile-cloud-eos" },
    { text: "MinIO", href: "devguide/file-processing/file-storage#minio" },
    { text: "七牛云", href: "devguide/file-processing/file-storage#aliyun-oss" },
    { text: "AWS S3", href: "devguide/file-processing/file-storage#aws-s3" },
    { text: "Cloudflare R2", href: "devguide/file-processing/file-storage#cloudflare-r2" },
    { text: "用环境变量防止配置信息泄露", href: "devguide/file-processing/file-storage#prevent-config-info-leak-with-env-variables" },
    { text: "设置应用默认的存储服务", href: "devguide/file-processing/file-storage#set-application-default-storage-service" },
    { text: "在前端代码中调用文件上传", href: "devguide/file-processing/file-storage#call-file-upload-in-frontend-code" }
  ]} />
</IndexCard>

<IndexCard
  title="文件模板"
  href="devguide/file-processing/file-templates"
  description="文档模板生成和处理，支持动态内容填充和格式转换。"
>
  <LinkGrid columns={2} links={[
    { text: "Word模板", href: "devguide/file-processing/file-templates#word-template" },
    { text: "创建Word模板", href: "devguide/file-processing/file-templates#create-word-template" },
    { text: "创建Word模板变量", href: "devguide/file-processing/file-templates#create-word-template-variables" },
    { text: "在Word文档中使用模板变量", href: "devguide/file-processing/file-templates#use-template-variables-in-word" },
    { text: "Excel模板", href: "devguide/file-processing/file-templates#excel-template" },
    { text: "创建Excel模板", href: "devguide/file-processing/file-templates#create-excel-template" },
    { text: "创建Excel模板变量", href: "devguide/file-processing/file-templates#create-excel-template-variables" },
    { text: "在Excel文档中使用模板变量", href: "devguide/file-processing/file-templates#use-template-variables-in-excel" },
    { text: "模板变量样式说明", href: "devguide/file-processing/file-templates#template-variable-style-description" },
    { text: "文本样式", href: "devguide/file-processing/file-templates#text-style" },
    { text: "数值类样式", href: "devguide/file-processing/file-templates#numeric-style" },
    { text: "日期时间类样式", href: "devguide/file-processing/file-templates#date-time-style" },
    { text: "多值类样式（复杂类型）", href: "devguide/file-processing/file-templates#multi-value-complex-types" }
  ]} />
</IndexCard>

<IndexCard
  title="用文件模板生成和打印文件"
  href="devguide/file-processing/generating-and-printing-files-using-file-templates"
  description="学习如何使用文件模板程序化生成和打印文档，包括动态内容填充和输出格式化。"
>
  <LinkGrid columns={2} links={[
    { text: "打印Word模板", href: "devguide/file-processing/generating-and-printing-files-using-file-templates#print-word-template" },
    { text: "打印Excel模板", href: "devguide/file-processing/generating-and-printing-files-using-file-templates#print-excel-template" }
  ]} />
</IndexCard>

</div>

## 外部API集成
让你的应用连接更广阔的世界。轻松接入第三方API，集成微信支付、支付宝支付，配置短信通知服务。扩展应用能力边界，满足更多业务场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建通用的外部API元素"
  href="devguide/third-party-integration/external-api"
  description="无缝集成第三方HTTP接口，提供统一的RESTful API调用管理，支持标准HTTP方法和高级处理功能。"
>
  <LinkGrid columns={2} links={[
    { text: "外部API创建", href: "devguide/third-party-integration/external-api#creating-external-apis" },
    { text: "公共配置", href: "devguide/third-party-integration/external-api#public-configuration" },
    { text: "访问域名", href: "devguide/third-party-integration/external-api#access-domain" },
    { text: "公共请求头", href: "devguide/third-party-integration/external-api#public-request-headers" },
    { text: "请求前置处理", href: "devguide/third-party-integration/external-api#request-preprocessing" },
    { text: "响应后置处理", href: "devguide/third-party-integration/external-api#response-postprocessing" },
    { text: "API接口管理", href: "devguide/third-party-integration/external-api#api-interface-management" },
    { text: "API接口分组", href: "devguide/third-party-integration/external-api#api-interface-grouping" },
    { text: "API接口", href: "devguide/third-party-integration/external-api#api-interface" },
    { text: "请求参数", href: "devguide/third-party-integration/external-api#request-parameters" },
    { text: "返回值类型", href: "devguide/third-party-integration/external-api#return-value-type" },
    { text: "回调函数", href: "devguide/third-party-integration/external-api#callback-function" },
    { text: "API接口的测试及调用", href: "devguide/third-party-integration/external-api#api-interface-testing-and-calling" },
    { text: "API接口测试", href: "devguide/third-party-integration/external-api#api-interface-testing" },
    { text: "API调用", href: "devguide/third-party-integration/external-api#api-calling" }
  ]} />
</IndexCard>

<IndexCard
  title="内置的支付服务"
  href="devguide/third-party-integration/payment-service"
  description="集成主流支付平台，实现在线支付和交易功能。"
>
  <LinkGrid links={[
    { text: "微信支付服务配置", href: "devguide/third-party-integration/payment-service#wechat-payment-service-configuration" },
    { text: "支付宝支付服务配置", href: "devguide/third-party-integration/payment-service#alipay-payment-service-configuration" },
    { text: "支付服务使用", href: "devguide/third-party-integration/payment-service#payment-service-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="内置的短信服务"
  href="devguide/third-party-integration/sms-service"
  description="短信发送和通知服务集成，支持验证码和消息推送。"
>
  <LinkGrid links={[
    { text: "阿里云短信", href: "devguide/third-party-integration/sms-service#aliyun-sms" },
    { text: "阿里云短信服务创建", href: "devguide/third-party-integration/sms-service#aliyun-sms-service-creation" },
    { text: "手机登录方式中使用短信服务", href: "devguide/third-party-integration/sms-service#use-sms-service-in-mobile-login" },
    { text: "审批流程中使用短信服务", href: "devguide/third-party-integration/sms-service#use-sms-service-in-approval-workflow" },
    { text: "短信通知功能", href: "devguide/third-party-integration/sms-service#sms-notification-function" }
  ]} />
</IndexCard>
</div>

## 缓存管理
让应用跑得更快更稳定。配置智能缓存策略，优化数据访问速度，提升用户体验。确保应用在高并发访问时依然流畅运行。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="缓存配置与使用"
  href="devguide/cache-management"
  description="应用缓存策略配置，提升系统性能和响应速度。"
>
  <LinkGrid links={[
    { text: "缓存服务配置", href: "devguide/cache-management#cache-service-configuration" },
    { text: "多缓存服务管理", href: "devguide/cache-management#multi-cache-service-management" },
    { text: "缓存编程接口使用", href: "devguide/cache-management#cache-programming-interface-usage" }
  ]} />
</IndexCard>

</div>

## 内部API开放
将应用能力暴露给外部系统调用。一键生成标准API接口，管理调用权限，监控使用情况。让你的应用成为数据和服务的提供者。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="API授权"
  href="devguide/api-exposure/api-authorization"
  description="API接口的权限控制和访问授权管理。"
>
  <LinkGrid links={[
    { text: "API授权的创建", href: "devguide/api-exposure/api-authorization#api-authorization-creation" },
    { text: "API授权详情", href: "devguide/api-exposure/api-authorization#api-authorization-detail" },
    { text: "API调用监控", href: "devguide/api-exposure/api-authorization#call-records" }
  ]} />
</IndexCard>
<IndexCard
  title="各类元素的API暴露示例"
  href="devguide/api-exposure/api-exposure-examples-for-various-elements"
  description="全面展示如何将不同类型的元素暴露为API的示例，包括数据模型、服务和自定义函数。"
>
    <LinkGrid links={[
        { text: "服务函数的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#service-function-api-authorization" },
        { text: "数据模型的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#data-model-api-authorization" },
        { text: "大模型函数的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#large-language-model-function-api-authorization" },
        { text: "AI Agent的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#agent-api-authorization" },
        { text: "AI助理的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#ai-assistant-api-authorization" },
        { text: "审批流程的API授权", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#approval-process-api-authorization" }
    ]} />
</IndexCard>

<IndexCard
  title="使用SDK调用被授权元素的API"
  href="devguide/api-exposure/using-sdk-to-call-authorized-element-apis"
  description="学习如何使用官方SDK调用被授权的元素API，包括身份验证、请求处理和错误管理。"
>
    <LinkGrid links={[
        { text: "使用Python SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-python-sdk" },
        { text: "使用Nodejs SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-nodejs-sdk" },
        { text: "使用Java SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-java-sdk" }
    ]} />
</IndexCard>

<IndexCard
  title="使用跨App服务元素调用被授权元素的API"
  href="devguide/api-exposure/using-cross-app-service-elements-to-call-authorized-apis"
  description="使用服务元素实现跨应用API调用，实现不同JitAi应用之间的无缝集成。"
>
    <LinkGrid links={[
        { text: "使用跨App服务元素", href: "devguide/api-exposure/using-cross-app-service-elements-to-call-authorized-apis#using-cross-app-service-elements" }
    ]} />
</IndexCard>
</div>

## 国际化
让你的应用面向全球用户。支持多语言、区域设置和动态语言切换，打造真正的国际化应用程序。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建语言包"
  href="devguide/internationalization/creating-language-packages"
  description="学习如何为应用程序创建自定义语言包，包括结构定义和内容组织。"
>
  <LinkGrid links={[
      { text: "创建语言包", href: "devguide/internationalization/creating-language-packages#creating-language-packages" },
      { text: "翻译内置词条", href: "devguide/internationalization/creating-language-packages#translating-built-in-terms" },
      { text: "添加新的词条", href: "devguide/internationalization/creating-language-packages#adding-new-terms" },
      { text: "导入词条", href: "devguide/internationalization/creating-language-packages#importing-terms" }
  ]} />
</IndexCard>

<IndexCard
  title="扩展系统内置的语言包"
  href="devguide/internationalization/extending-system-builtin-language-packages"
  description="扩展和自定义现有系统语言包，以满足特定业务需求和区域需要。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="如何翻译页面中的词条"
  href="devguide/internationalization/how-to-translate-page-terms"
  description="掌握页面内容翻译技巧，包括动态文本替换和上下文感知翻译。"
>
  <LinkGrid links={[
      { text: "自动文本翻译", href: "devguide/internationalization/how-to-translate-page-terms#automatic-text-translation" },
      { text: "响应式文本翻译", href: "devguide/internationalization/how-to-translate-page-terms#dynamic-text-translation" },
      { text: "DOM节点属性翻译", href: "devguide/internationalization/how-to-translate-page-terms#dom-node-attribute-translation" },
      { text: "使用API翻译", href: "devguide/internationalization/how-to-translate-page-terms#using-api-translation" }
  ]} />
</IndexCard>

<IndexCard
  title="忽略翻译规则"
  href="devguide/internationalization/translate-ignore-rules"
  description="配置规则以排除特定内容不被翻译，确保正确处理品牌名称、技术术语和其他不可翻译内容。"
>
  <LinkGrid links={[
      { text: "基础用法", href: "devguide/internationalization/translate-ignore-rules#basic-usage" },
      { text: "高级配置", href: "devguide/internationalization/translate-ignore-rules#advanced-configuration" },
      { text: "配置方法", href: "devguide/internationalization/translate-ignore-rules#configuration-method" }
  ]} />
</IndexCard>

<IndexCard
  title="默认语言"
  href="devguide/internationalization/default-language"
  description="为应用程序配置默认语言，确保首次访问用户和没有明确语言偏好的用户获得最佳体验。"
>
  <LinkGrid links={[
      { text: "默认语言配置", href: "devguide/internationalization/default-language#default-language-configuration" },
      { text: "语言选择策略", href: "devguide/internationalization/default-language#language-selection-strategy" },
      { text: "配置建议", href: "devguide/internationalization/default-language#configuration-recommendations" }
  ]} />
</IndexCard>

</div>

## 前端UI定制
打造独特的视觉体验和品牌形象。自定义应用主题色彩，开发专属UI组件，让应用界面更符合企业品牌调性，提升用户体验和辨识度。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="全局样式"
  href="devguide/frontend-ui-customization/global-styles"
  description="应用整体样式和主题配置，统一界面风格和用户体验。"
>
  <LinkGrid links={[
    { text: "创建全局样式元素", href: "devguide/frontend-ui-customization/global-styles#create-global-style-element" },
    { text: "修改全局样式", href: "devguide/frontend-ui-customization/global-styles#modify-global-style" },
    { text: "更多样式变量", href: "devguide/frontend-ui-customization/global-styles#more-style-variables" },
    { text: "调试主题", href: "devguide/frontend-ui-customization/global-styles#debug-theme" }
  ]} />
</IndexCard>

<IndexCard
  title="自定义控件"
  href="devguide/frontend-ui-customization/custom-controls"
  description="开发个性化UI组件，满足特殊业务需求和交互要求。"
>
  <LinkGrid links={[
    { text: "创建自定义控件", href: "devguide/frontend-ui-customization/custom-controls#create-custom-control-element" },
    { text: "修改自定义控件", href: "devguide/frontend-ui-customization/custom-controls#modify-custom-control" },
    { text: "表单中使用自定义控件", href: "devguide/frontend-ui-customization/custom-controls#use-custom-control-in-form" },
    { text: "表格中使用自定义控件", href: "devguide/frontend-ui-customization/custom-controls#use-custom-control-in-table" },
    { text: "自定义控件参数", href: "devguide/frontend-ui-customization/custom-controls#custom-control-parameters" }
  ]} />
</IndexCard>

<IndexCard
  title="组件定制"
  href="devguide/frontend-ui-customization/component-customization"
  description="平台提供两种主要的组件定制方式，以满足不同的开发需求和场景。"
>
  <LinkGrid links={[
    { text: "开发全代码组件", href: "devguide/frontend-ui-customization/component-customization#developing-full-code-components" },
    { text: "扩展组件Type元素", href: "devguide/frontend-ui-customization/component-customization#extending-component-type-elements" }
  ]} />
</IndexCard>

<IndexCard
  title="页面定制"
  href="devguide/frontend-ui-customization/page-customization"
  description="介绍全代码页面的具体开发技术和使用方法，包括样式处理、组件使用、资源管理、数据操作等。"
>
  <LinkGrid columns={2} links={[
    { text: "使用样式", href: "devguide/frontend-ui-customization/page-customization#use-style" },
    { text: "使用本地资源", href: "devguide/frontend-ui-customization/page-customization#use-local-resources" },
    { text: "使用 Ant Design 的组件", href: "devguide/frontend-ui-customization/page-customization#use-ant-design-components" },
    { text: "内嵌已有常规页面", href: "devguide/frontend-ui-customization/page-customization#embed-existing-regular-page" },
    { text: "使用标准组件", href: "devguide/frontend-ui-customization/page-customization#use-standard-component" },
    { text: "调用数据模型函数", href: "devguide/frontend-ui-customization/page-customization#call-data-model-function" },
    { text: "调用服务函数", href: "devguide/frontend-ui-customization/page-customization#call-service-function" },
    { text: "创建Vue全代码页面", href: "devguide/frontend-ui-customization/page-customization#vue-full-code-page" },
    { text: "使用第三方包", href: "devguide/frontend-ui-customization/page-customization#use-third-party-packages" },
    { text: "打包配置的使用", href: "devguide/frontend-ui-customization/page-customization#use-packaging-configuration" }
  ]} />
</IndexCard>

<IndexCard
  title="门户定制"
  href="devguide/frontend-ui-customization/portal-customization"
  description="全代码自定义门户提供了灵活的解决方案，适用于导航布局调整、界面风格定制和交互方式优化等场景。"
>
  <LinkGrid links={[
    { text: "创建自定义门户", href: "devguide/frontend-ui-customization/portal-customization#creating-custom-portal" },
    { text: "核心文件结构", href: "devguide/frontend-ui-customization/portal-customization#core-file-structure" },
    { text: "重要API和方法", href: "devguide/frontend-ui-customization/portal-customization#important-apis-and-methods" },
    { text: "门户基础API", href: "devguide/frontend-ui-customization/portal-customization#portal-basic-apis" },
    { text: "页面渲染和导航", href: "devguide/frontend-ui-customization/portal-customization#page-rendering-and-navigation" },
    { text: "权限验证", href: "devguide/frontend-ui-customization/portal-customization#permission-verification" }
  ]} />
</IndexCard>

</div>

## 场景化进阶指南
基于真实业务场景的深度实践指南，帮助开发者掌握复杂应用的架构设计和最佳实践。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="开发与运维流程"
  href="devguide/advanced-guide"
  description="掌握高效的开发流程、调试技巧和生产环境部署管理，确保应用稳定性和团队协作效率。"
>
  <LinkGrid links={[
    { text: "本地开发与调试", href: "devguide/advanced-guide/local-development-and-debugging" },
    { text: "团队协作开发", href: "devguide/advanced-guide/team-collaborative-development" },
    { text: "应用层稳定性保障", href: "devguide/advanced-guide/application-layer-stability-guarantee" }
  ]} />
</IndexCard>

<IndexCard
  title="AI开发与应用"
  href="devguide/advanced-guide"
  description="使用AI智能体、助理和高级提示词工程技术构建智能应用，实现增强用户体验和自动化工作流程。"
>
  <LinkGrid links={[
    { text: "AI智能客服", href: "devguide/advanced-guide/ai-customer-service" },
    { text: "AI智能出题&阅卷", href: "devguide/advanced-guide/ai-question-grading" },
    { text: "Agent提示词编写技巧", href: "devguide/advanced-guide/agent-prompt-writing-techniques" }
  ]} />
</IndexCard>

<IndexCard
  title="数据建模与分析"
  href="devguide/advanced-guide/business-entity-modeling-and-data-analysis"
  description="基于JitORM构建销售数据分析系统，实现多维度聚合分析和业务规则自动化。"
>
  <LinkGrid links={[
    { text: "业务实体建模与数据分析", href: "devguide/advanced-guide/business-entity-modeling-and-data-analysis" }
  ]} />
</IndexCard>

<IndexCard
  title="业务服务与API"
  href="devguide/advanced-guide/using-interceptors-for-custom-request-authentication"
  description="基于JitService实现自定义鉴权和业务服务架构。"
>
  <LinkGrid links={[
    { text: "使用拦截器实现自定义请求鉴权", href: "devguide/advanced-guide/using-interceptors-for-custom-request-authentication" }
  ]} />
</IndexCard>

</div>
