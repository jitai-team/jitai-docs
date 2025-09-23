---
sidebar_position: -1
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# 参考文档导读
JitAi参考文档提供完整的API文档、配置说明和技术规范。开发者可以查询元素配置参数、方法调用接口、数据结构定义和平台协议规范，快速解决开发过程中的技术问题。
## [开发框架](./framework)
提供各框架模块的元素配置、API接口和使用方法，包含完整的参数说明、代码示例和最佳实践指导。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="JitAi"
  href="framework/JitAi"
  description="AI应用开发框架，提供完整的AI原生应用构建能力。"
>
  <LinkGrid columns={2} links={[
    { text: "AIAgent", href: "framework/JitAi/AIAgent" },
    { text: "AI助理", href: "framework/JitAi/ai-assistant" },
    { text: "AI大模型", href: "framework/JitAi/ai-large-models" },
    { text: "AI知识库", href: "framework/JitAi/ai-knowledge-base" },
    { text: "Agent事件", href: "framework/JitAi/agent-events" },
    { text: "助理事件", href: "framework/JitAi/assistant-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitAuth"
  href="framework/JitAuth/"
  description="身份认证与权限管理框架，基于RBAC模型提供多种登录方式、企业组织架构管理和API权限控制，支持第三方身份系统集成。"
>
  <LinkGrid columns={2} links={[
    { text: "常规角色", href: "framework/JitAuth/regular-roles" },
    { text: "账号密码登录", href: "framework/JitAuth/login-authentication/account-password-login" },
    { text: "手机号登录", href: "framework/JitAuth/login-authentication/mobile-login" },
    { text: "微信登录", href: "framework/JitAuth/login-authentication/wechat-login" },
    { text: "微信小程序登录", href: "framework/JitAuth/login-authentication/wechat-miniapp-login" },
    { text: "微信公众号登录", href: "framework/JitAuth/login-authentication/wechat-official-login" },
    { text: "企业微信自建扫码登录", href: "framework/JitAuth/login-authentication/wechat-work-dev-login" },
    { text: "企业微信代开发登录", href: "framework/JitAuth/login-authentication/wechat-work-qr-login" },
    { text: "钉钉自建扫码登录", href: "framework/JitAuth/login-authentication/dingtalk-qr-login" },
    { text: "标准组织", href: "framework/JitAuth/enterprise-organization/standard-organization" },
    { text: "企业微信自建组织", href: "framework/JitAuth/enterprise-organization/wechat-work-dev-organization" },
    { text: "企业微信代开发组织", href: "framework/JitAuth/enterprise-organization/wechat-work-organization" },
    { text: "钉钉自建组织", href: "framework/JitAuth/enterprise-organization/dingtalk-organization" }
  ]} />
</IndexCard>

<IndexCard
  title="JitORM"
  href="framework/JitORM/"
  description="对象关系映射框架，支持多数据库类型，提供可视化数据建模、丰富数据类型、Q表达式查询和TQL语言，内置模型事件机制。"
>
  <LinkGrid columns={2} links={[
    { text: "ORM概述", href: "framework/JitORM/" },
    { text: "数据库", href: "framework/JitORM/database" },
    { text: "数据模型", href: "framework/JitORM/data-models" },
    { text: "数据类型", href: "framework/JitORM/data-types" },
    { text: "Q表达式", href: "framework/JitORM/q-expressions" },
    { text: "TQL", href: "framework/JitORM/TQL" },
    { text: "模型事件", href: "framework/JitORM/model-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWeb"
  href="framework/JitWeb/"
  description="前端UI框架，提供门户系统、页面管理和组件库，支持可视化页面构建、响应式布局和自定义控件开发。"
>
  <LinkGrid columns={2} links={[
    { text: "全局样式", href: "framework/JitWeb/global-styles" },
    { text: "常规门户", href: "framework/JitWeb/portals/regular-portal" },
    { text: "空白门户", href: "framework/JitWeb/portals/blank-portal" },
    { text: "SSR门户", href: "framework/JitWeb/portals/ssr-portal" },
    { text: "AI数据管理页面", href: "framework/JitWeb/pages/ai-data-management-page" },
    { text: "AI数据分析页面", href: "framework/JitWeb/pages/ai-data-analysis-page" },
    { text: "常规页面", href: "framework/JitWeb/pages/regular-page" },
    { text: "数据录入页面", href: "framework/JitWeb/pages/data-entry-page" },
    { text: "Markdown页面", href: "framework/JitWeb/pages/markdown-page" },
    { text: "React全代码页面", href: "framework/JitWeb/pages/react-full-code-page" },
    { text: "Vue全代码页面", href: "framework/JitWeb/pages/vue-full-code-page" },
    { text: "表格", href: "framework/JitWeb/components/view-type/table" },
    { text: "列表", href: "framework/JitWeb/components/view-type/list" },
    { text: "统计图", href: "framework/JitWeb/components/view-type/statistical-chart" },
    { text: "树形", href: "framework/JitWeb/components/view-type/tree" },
    { text: "日历", href: "framework/JitWeb/components/view-type/calendar" },
    { text: "甘特图", href: "framework/JitWeb/components/view-type/gantt-chart" },
    { text: "看板", href: "framework/JitWeb/components/view-type/kanban" },
    { text: "画廊", href: "framework/JitWeb/components/view-type/gallery" },
    { text: "轮播图", href: "framework/JitWeb/components/view-type/carousel" },
    { text: "时间轴", href: "framework/JitWeb/components/view-type/timeline" },
    { text: "交叉表", href: "framework/JitWeb/components/view-type/cross-table" },
    { text: "分组表", href: "framework/JitWeb/components/view-type/group-table" },
    { text: "级联表", href: "framework/JitWeb/components/view-type/cascade-table" },
    { text: "级联树", href: "framework/JitWeb/components/view-type/cascade-tree" },
    { text: "行转列", href: "framework/JitWeb/components/view-type/row-to-column" },
    { text: "导入", href: "framework/JitWeb/components/view-type/import" },
    { text: "解析Excel", href: "framework/JitWeb/components/view-type/parse-excel" },
    { text: "全代码组件", href: "framework/JitWeb/components/view-type/full-code-component" },
    { text: "表单", href: "framework/JitWeb/components/form-type/form" },
    { text: "批量编辑表单", href: "framework/JitWeb/components/form-type/batch-edit-form" },
    { text: "按钮", href: "framework/JitWeb/components/operation-type/button" },
    { text: "模型筛选器", href: "framework/JitWeb/components/operation-type/model-filter" },
    { text: "通用筛选器", href: "framework/JitWeb/components/operation-type/general-filter" },
    { text: "数据修正", href: "framework/JitWeb/components/operation-type/data-correction" },
    { text: "支付", href: "framework/JitWeb/components/operation-type/payment" },
    { text: "标签页", href: "framework/JitWeb/components/layout-type/tabs" },
    { text: "弹窗", href: "framework/JitWeb/components/layout-type/modal" },
    { text: "子页面", href: "framework/JitWeb/components/layout-type/sub-page" },
    { text: "折叠面板", href: "framework/JitWeb/components/layout-type/collapse-panel" },
    { text: "发起申请", href: "framework/JitWeb/components/approval-type/initiate-application" },
    { text: "审批处理", href: "framework/JitWeb/components/approval-type/approval-workflowing" },
    { text: "自定义控件", href: "framework/JitWeb/custom-controls" }
  ]} />
</IndexCard>

<IndexCard
  title="JitService"
  href="framework/JitService/"
  description="业务服务框架，提供API授权管理、外部系统集成、前后端拦截器、自定义业务服务和事件驱动架构支持。"
>
  <LinkGrid columns={2} links={[
    { text: "API授权", href: "framework/JitService/api-authorization" },
    { text: "外部API集成", href: "framework/JitService/external-api-integration" },
    { text: "前端拦截器", href: "framework/JitService/frontend-interceptor" },
    { text: "后端拦截器", href: "framework/JitService/backend-interceptor" },
    { text: "自定义业务服务", href: "framework/JitService/custom-business-service" },
    { text: "自定义事件", href: "framework/JitService/custom-events" },
    { text: "事件服务", href: "framework/JitService/event-service" }
  ]} />
</IndexCard>

<IndexCard
  title="JitStorage"
  href="framework/JitStorage/"
  description="存储管理框架，提供统一的文件存储接口，支持本地磁盘、云存储服务，集成多种缓存方案和文件模板处理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "磁盘存储", href: "framework/JitStorage/storage/disk-storage" },
    { text: "阿里云OSS存储", href: "framework/JitStorage/storage/aliyun-oss-storage" },
    { text: "七牛云存储", href: "framework/JitStorage/storage/qiniu-storage" },
    { text: "MinIO存储", href: "framework/JitStorage/storage/minio-storage" },
    { text: "EOS存储", href: "framework/JitStorage/storage/eos-storage" },
    { text: "内置缓存", href: "framework/JitStorage/cache/built-in-cache" },
    { text: "Redis缓存", href: "framework/JitStorage/cache/redis-cache" },
    { text: "SQLite缓存", href: "framework/JitStorage/cache/sqlite-cache" },
    { text: "TongRDS缓存", href: "framework/JitStorage/cache/tongrds-cache" },
    { text: "Excel模板", href: "framework/JitStorage/file-templates/excel-template" },
    { text: "Word模板", href: "framework/JitStorage/file-templates/word-template" }
  ]} />
</IndexCard>

<IndexCard
  title="JitPay"
  href="framework/JitPay/"
  description="支付服务框架，集成微信支付和支付宝支付平台，提供统一的支付接口和交易管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "支付服务", href: "framework/JitPay/payment-service" },
    { text: "微信支付", href: "framework/JitPay/wechat-pay" },
    { text: "支付宝支付", href: "framework/JitPay/alipay" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWorkflow"
  href="framework/JitWorkflow/"
  description="工作流引擎，提供可视化审批流程设计、流程实例管理和审批事件处理，支持复杂业务流程编排。"
>
  <LinkGrid columns={2} links={[
    { text: "常规审批", href: "framework/JitWorkflow/regular-approval" },
    { text: "审批事件", href: "framework/JitWorkflow/approval-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitTask"
  href="framework/JitTask/"
  description="任务调度框架，支持定时任务和基于数据模型日期字段的智能任务调度，提供任务监控和管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "任务服务", href: "framework/JitTask/task-service" },
    { text: "定时任务", href: "framework/JitTask/scheduled-tasks" },
    { text: "日期字段任务", href: "framework/JitTask/date-field-tasks" }
  ]} />
</IndexCard>

<IndexCard
  title="JitI18N"
  href="framework/JitI18N/"
  description="国际化框架，提供多语言支持和语言包管理，支持动态语言切换和本地化内容管理。"
>
  <LinkGrid columns={2} links={[
    { text: "语言包", href: "framework/JitI18N/language-pack" }
  ]} />
</IndexCard>

<IndexCard
  title="JitMessage"
  href="framework/JitMessage/"
  description="消息通知框架，集成短信推送渠道，提供统一的消息发送接口和模板管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "阿里云短信", href: "framework/JitMessage/aliyun-sms" }
  ]} />
</IndexCard>

<IndexCard
  title="JitCommons"
  href="framework/JitCommons/"
  description="通用工具库，提供前后端共享的计算函数、数据处理工具和常用工具方法，简化开发过程中的通用操作。"
>
  <LinkGrid columns={2} links={[
    { text: "通用前端", href: "framework/JitCommons/frontend" },
    { text: "通用后端", href: "framework/JitCommons/backend" }
  ]} />
</IndexCard>

</div>

## [运行平台](./runtime-platform)
涵盖平台协议规范、应用部署配置和运行环境管理，帮助开发者理解应用打包、发布和运维的技术细节。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="平台协议与规范"
  href="runtime-platform/"
  description="运行平台核心协议与规范，定义JAAP应用协议、JitNode目录结构和平台运行机制。"
>
  <LinkGrid columns={2} links={[
    { text: "JAAP协议", href: "runtime-platform/JAAP" },
    { text: "JitNode目录", href: "runtime-platform/jitnode-directory" },
    { text: "平台概述", href: "runtime-platform/" }
  ]} />
</IndexCard>

<IndexCard
  title="前端运行环境"
  href="runtime-platform/frontend/"
  description="前端运行环境管理，提供前端应用配置、元素定义规范和客户端运行时支持。"
>
  <LinkGrid columns={2} links={[
    { text: "前端应用管理", href: "runtime-platform/frontend/applications/App" },
    { text: "前端元素定义", href: "runtime-platform/frontend/elements/ElementDefine" }
  ]} />
</IndexCard>

<IndexCard
  title="后端运行环境"
  href="runtime-platform/backend/"
  description="后端运行环境管理，提供应用生命周期管理、代码资源管理、运行环境配置和节点集群管理。"
>
  <LinkGrid columns={2} links={[
    { text: "后端应用管理", href: "runtime-platform/backend/applications/App" },
    { text: "应用代码管理", href: "runtime-platform/backend/applications/AppCode" },
    { text: "应用资源管理", href: "runtime-platform/backend/applications/AppResource" },
    { text: "运行环境配置", href: "runtime-platform/backend/runtime-environment/01Environ" },
    { text: "元素管理", href: "runtime-platform/backend/elements/Element" },
    { text: "节点配置", href: "runtime-platform/backend/jit-nodes/Node" }
  ]} />
</IndexCard>

</div>

