---
sidebar_position: -1
---

# 导读

欢迎使用JitAi参考手册！这里提供完整的技术参考资料，按技术栈层次组织，涵盖应用开发到运维管理的全生命周期。

## 快速导航

### [开发框架](./framework/) - 应用构建基础
**适合人群**：应用开发者、架构师  
**内容特点**：企业级开发框架，元素族类封装，结构+过程设计理念

#### JitAi框架（AI智能）
<div style={{columns: 2, columnGap: '2rem'}}>

- [AI框架概述](./framework/JitAi/intro) - 框架总览
- [AIAgent](./framework/JitAi/AIAgent) - 智能代理构建
- [AI助理](./framework/JitAi/ai-assistant) - AI助手开发
- [AI大模型](./framework/JitAi/ai-large-models) - 大语言模型集成
- [AI知识库](./framework/JitAi/ai-knowledge-base) - 知识库管理
- [Agent事件](./framework/JitAi/agent-events) - Agent事件机制
- [助理事件](./framework/JitAi/assistant-events) - 助理事件处理

</div>

#### JitAuth框架（认证授权）
<div style={{columns: 2, columnGap: '2rem'}}>

- [常规角色](./framework/JitAuth/regular-roles) - 权限管理体系
- [账号密码登录](./framework/JitAuth/login-authentication/account-password-login) - 基础认证
- [手机号登录](./framework/JitAuth/login-authentication/mobile-login) - 手机认证
- [微信登录](./framework/JitAuth/login-authentication/wechat-login) - 微信认证
- [微信小程序登录](./framework/JitAuth/login-authentication/wechat-miniapp-login) - 小程序认证
- [微信公众号登录](./framework/JitAuth/login-authentication/wechat-official-login) - 公众号认证
- [企业微信自建扫码登录](./framework/JitAuth/login-authentication/wechat-work-dev-login) - 企微自建
- [企业微信代开发登录](./framework/JitAuth/login-authentication/wechat-work-qr-login) - 企微代开发
- [钉钉自建扫码登录](./framework/JitAuth/login-authentication/dingtalk-qr-login) - 钉钉认证
- [标准组织](./framework/JitAuth/enterprise-organization/standard-organization) - 标准组织架构
- [企业微信自建组织](./framework/JitAuth/enterprise-organization/wechat-work-dev-organization) - 企微组织
- [企业微信代开发组织](./framework/JitAuth/enterprise-organization/wechat-work-organization) - 企微代开发组织
- [钉钉自建组织](./framework/JitAuth/enterprise-organization/dingtalk-organization) - 钉钉组织

</div>

#### JitORM框架（数据持久化）
<div style={{columns: 2, columnGap: '2rem'}}>

- [ORM概述](./framework/JitORM/) - 对象关系映射
- [数据库](./framework/JitORM/database) - 数据库抽象层
- [数据模型](./framework/JitORM/data-models) - 模型定义
- [数据类型](./framework/JitORM/data-types) - 数据类型系统
- [Q表达式](./framework/JitORM/q-expressions) - 查询表达式
- [TQL](./framework/JitORM/TQL) - 查询语言
- [模型事件](./framework/JitORM/model-events) - 数据模型事件

</div>

#### JitWeb框架（前端界面）
<div style={{columns: 2, columnGap: '2rem'}}>

- [全局样式](./framework/JitWeb/global-styles) - 样式管理

**门户类型：**
- [常规门户](./framework/JitWeb/portals/regular-portal) - 常规门户
- [空白门户](./framework/JitWeb/portals/blank-portal) - 空白门户
- [SSR门户](./framework/JitWeb/portals/ssr-portal) - 服务端渲染

**页面类型：**
- [AI数据管理页面](./framework/JitWeb/pages/ai-data-management-page) - 数据管理
- [AI数据分析页面](./framework/JitWeb/pages/ai-data-analysis-page) - 数据分析
- [常规页面](./framework/JitWeb/pages/regular-page) - 组件化页面
- [数据录入页面](./framework/JitWeb/pages/data-entry-page) - 数据录入
- [Markdown页面](./framework/JitWeb/pages/markdown-page) - 文档页面
- [React全代码页面](./framework/JitWeb/pages/react-full-code-page) - 完全自定义
- [Vue全代码页面](./framework/JitWeb/pages/vue-full-code-page) - Vue开发

**视图组件：**
- [表格](./framework/JitWeb/components/view-type/table) - 数据表格
- [列表](./framework/JitWeb/components/view-type/list) - 数据列表
- [统计图](./framework/JitWeb/components/view-type/statistical-chart) - 图表组件
- [树形](./framework/JitWeb/components/view-type/tree) - 树形结构
- [日历](./framework/JitWeb/components/view-type/calendar) - 日历组件
- [甘特图](./framework/JitWeb/components/view-type/gantt-chart) - 项目管理
- [看板](./framework/JitWeb/components/view-type/kanban) - 看板管理
- [画廊](./framework/JitWeb/components/view-type/gallery) - 图片展示
- [轮播图](./framework/JitWeb/components/view-type/carousel) - 轮播展示
- [时间轴](./framework/JitWeb/components/view-type/timeline) - 时间线
- [交叉表](./framework/JitWeb/components/view-type/cross-table) - 交叉分析
- [分组表](./framework/JitWeb/components/view-type/group-table) - 分组展示
- [级联表](./framework/JitWeb/components/view-type/cascade-table) - 级联关系
- [级联树](./framework/JitWeb/components/view-type/cascade-tree) - 级联树形
- [行转列](./framework/JitWeb/components/view-type/row-to-column) - 数据转置
- [导入](./framework/JitWeb/components/view-type/import) - 数据导入
- [解析Excel](./framework/JitWeb/components/view-type/parse-excel) - Excel处理
- [全代码组件](./framework/JitWeb/components/view-type/full-code-component) - 自定义组件

**表单组件：**
- [表单](./framework/JitWeb/components/form-type/form) - 基础表单
- [批量编辑表单](./framework/JitWeb/components/form-type/batch-edit-form) - 批量编辑

**操作组件：**
- [按钮](./framework/JitWeb/components/operation-type/button) - 操作按钮
- [模型筛选器](./framework/JitWeb/components/operation-type/model-filter) - 数据筛选
- [通用筛选器](./framework/JitWeb/components/operation-type/general-filter) - 通用筛选
- [数据修正](./framework/JitWeb/components/operation-type/data-correction) - 数据纠错
- [支付](./framework/JitWeb/components/operation-type/payment) - 支付操作

**布局组件：**
- [标签页](./framework/JitWeb/components/layout-type/tabs) - 标签页布局
- [弹窗](./framework/JitWeb/components/layout-type/modal) - 弹窗组件
- [子页面](./framework/JitWeb/components/layout-type/sub-page) - 嵌套页面
- [折叠面板](./framework/JitWeb/components/layout-type/collapse-panel) - 折叠布局

**审批组件：**
- [发起申请](./framework/JitWeb/components/approval-type/initiate-application) - 申请发起
- [审批处理](./framework/JitWeb/components/approval-type/approval-workflowing) - 审批操作

**扩展组件：**
- [自定义控件](./framework/JitWeb/custom-controls) - 自定义开发

</div>

#### JitService框架（业务服务）
<div style={{columns: 2, columnGap: '2rem'}}>

- [API授权](./framework/JitService/api-authorization) - 对外提供HTTP接口
- [外部API集成](./framework/JitService/external-api-integration) - 集成外部HTTP接口
- [前端拦截器](./framework/JitService/frontend-interceptor) - 前端请求拦截
- [后端拦截器](./framework/JitService/backend-interceptor) - 后端HTTP拦截处理
- [自定义业务服务](./framework/JitService/custom-business-service) - 业务逻辑封装
- [自定义事件](./framework/JitService/custom-events) - 由开发者自由声明和触发的事件
- [事件服务](./framework/JitService/event-service) - 内置的事件管理服务

</div>

#### JitStorage框架（存储管理）
<div style={{columns: 2, columnGap: '2rem'}}>

**文件存储：**
- [磁盘存储](./framework/JitStorage/storage/disk-storage) - 本地文件存储
- [阿里云OSS存储](./framework/JitStorage/storage/aliyun-oss-storage) - 阿里云对象存储
- [七牛云存储](./framework/JitStorage/storage/qiniu-storage) - 七牛云存储
- [MinIO存储](./framework/JitStorage/storage/minio-storage) - MinIO对象存储
- [EOS存储](./framework/JitStorage/storage/eos-storage) - EOS存储服务

**缓存服务：**
- [内置缓存](./framework/JitStorage/cache/built-in-cache) - 内存缓存
- [Redis缓存](./framework/JitStorage/cache/redis-cache) - Redis分布式缓存
- [SQLite缓存](./framework/JitStorage/cache/sqlite-cache) - SQLite缓存
- [TongRDS缓存](./framework/JitStorage/cache/tongrds-cache) - TongRDS缓存

**文件模板：**
- [Excel模板](./framework/JitStorage/file-templates/excel-template) - Excel文档模板
- [Word模板](./framework/JitStorage/file-templates/word-template) - Word文档模板

</div>

#### JitPay框架（支付服务）
<div style={{columns: 2, columnGap: '2rem'}}>

- [支付服务](./framework/JitPay/payment-service) - 支付服务基础
- [微信支付](./framework/JitPay/wechat-pay) - 微信支付集成
- [支付宝支付](./framework/JitPay/alipay) - 支付宝支付集成

</div>

#### JitWorkflow框架（工作流）
<div style={{columns: 2, columnGap: '2rem'}}>

- [常规审批](./framework/JitWorkflow/regular-approval) - 常规审批流程
- [审批事件](./framework/JitWorkflow/approval-events) - 审批事件处理

</div>

#### JitTask框架（任务调度）
<div style={{columns: 2, columnGap: '2rem'}}>

- [任务服务](./framework/JitTask/task-service) - 任务服务基础
- [定时任务](./framework/JitTask/scheduled-tasks) - 定时任务调度
- [日期字段任务](./framework/JitTask/date-field-tasks) - 基于日期的任务

</div>

#### JitI18N框架（国际化）
<div style={{columns: 2, columnGap: '2rem'}}>

- [语言包](./framework/JitI18N/language-pack) - 多语言国际化支持

</div>

#### JitMessage框架（消息服务）
<div style={{columns: 2, columnGap: '2rem'}}>

- [阿里云短信](./framework/JitMessage/aliyun-sms) - 短信发送服务

</div>

#### JitCommons框架（通用组件）
<div style={{columns: 2, columnGap: '2rem'}}>

- [通用前端](./framework/JitCommons/frontend) - 前端通用工具，例如界面反馈、文件、消息通信，数学、逻辑、文本、日期等计算工具
- [通用后端](./framework/JitCommons/backend) - 后端通用工具，例如数学计算、日期时间计算、字符串处理等80+个工具函数

</div>

### [runtime-platform](./runtime-platform/) - 应用执行环境  
**适合人群**：系统架构师、平台开发者  
**内容特点**：JAAP协议规范、运行容器机制、平台API

#### 平台协议与规范
<div style={{columns: 2, columnGap: '2rem'}}>

- [JAAP协议](./runtime-platform/JAAP) - 应用协议规范
- [JitNode目录](./runtime-platform/jitnode-directory) - 目录结构说明
- [平台概述](./runtime-platform/) - runtime-platform介绍

</div>

#### 前端运行环境
<div style={{columns: 2, columnGap: '2rem'}}>

- [前端应用管理](./runtime-platform/frontend/applications/App) - 前端应用配置
- [前端元素定义](./runtime-platform/frontend/elements/ElementDefine) - 前端元素规范

</div>

#### 后端运行环境
<div style={{columns: 2, columnGap: '2rem'}}>

- [后端应用管理](./runtime-platform/backend/applications/App) - 后端应用配置
- [应用代码管理](./runtime-platform/backend/applications/AppCode) - 代码资源管理
- [应用资源管理](./runtime-platform/backend/applications/AppResource) - 资源配置
- [运行环境配置](./runtime-platform/backend/runtime-environment/01Environ) - 环境参数
- [元素管理](./runtime-platform/backend/elements/Element) - 元素定义与管理
- [节点配置](./runtime-platform/backend/jit-nodes/Node) - Jit节点管理
- 

</div>

### [dev-tools](./dev-tools/programming-orchestration-dual-mode) - 可视化开发环境
**适合人群**：应用开发者、IDE扩展开发者  
**内容特点**：编程与编排双模式、可视化与代码开发切换

#### 核心内容
- [工具概述](./dev-tools/programming-orchestration-dual-mode) - IDEApp开发环境介绍
- 编程与编排双模式设计理念
- 可视化开发与全代码开发统一
- Type Editor规范与扩展API

