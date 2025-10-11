---
sidebar_position: -1
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# 参考手册导读
JitAi参考手册提供完整的API文档、配置说明和技术规范。开发者可以查询元素配置参数、方法调用接口、数据结构定义和平台协议规范，快速解决开发过程中的技术问题。
## [开发框架](reference/framework)
提供各框架模块的元素配置、API接口和使用方法，包含完整的参数说明、代码示例和最佳实践指导。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="JitAi"
  href="reference/framework/JitAi"
  description="AI应用开发框架，提供完整的AI原生应用构建能力。"
>
  <LinkGrid columns={2} links={[
    { text: "AIAgent", href: "reference/framework/JitAi/AIAgent" },
    { text: "AI助理", href: "reference/framework/JitAi/ai-assistant" },
    { text: "AI大模型", href: "reference/framework/JitAi/ai-large-models" },
    { text: "AI知识库", href: "reference/framework/JitAi/ai-knowledge-base" },
    { text: "Agent事件", href: "reference/framework/JitAi/agent-events" },
    { text: "助理事件", href: "reference/framework/JitAi/assistant-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitAuth"
  href="reference/framework/JitAuth/"
  description="身份认证与权限管理框架，基于RBAC模型提供多种登录方式、企业组织架构管理和API权限控制，支持第三方身份系统集成。"
>
  <LinkGrid columns={2} links={[
    { text: "常规角色", href: "reference/framework/JitAuth/regular-roles" },
    { text: "账号密码登录", href: "reference/framework/JitAuth/login-authentication/account-password-login" },
    { text: "手机号登录", href: "reference/framework/JitAuth/login-authentication/mobile-login" },
    { text: "微信登录", href: "reference/framework/JitAuth/login-authentication/wechat-login" },
    { text: "微信小程序登录", href: "reference/framework/JitAuth/login-authentication/wechat-miniapp-login" },
    { text: "微信公众号登录", href: "reference/framework/JitAuth/login-authentication/wechat-official-login" },
    { text: "企业微信自建扫码登录", href: "reference/framework/JitAuth/login-authentication/wechat-work-dev-login" },
    { text: "企业微信代开发登录", href: "reference/framework/JitAuth/login-authentication/wechat-work-qr-login" },
    { text: "钉钉自建扫码登录", href: "reference/framework/JitAuth/login-authentication/dingtalk-qr-login" },
    { text: "常规组织", href: "reference/framework/JitAuth/enterprise-organization/standard-organization" },
    { text: "企业微信自建组织", href: "reference/framework/JitAuth/enterprise-organization/wechat-work-dev-organization" },
    { text: "企业微信代开发组织", href: "reference/framework/JitAuth/enterprise-organization/wechat-work-organization" },
    { text: "钉钉自建组织", href: "reference/framework/JitAuth/enterprise-organization/dingtalk-organization" }
  ]} />
</IndexCard>

<IndexCard
  title="JitORM"
  href="reference/framework/JitORM/"
  description="对象关系映射框架，支持多数据库类型，提供可视化数据建模、丰富数据类型、Q表达式查询和TQL语言，内置模型事件机制。"
>
  <LinkGrid columns={2} links={[
    { text: "ORM概述", href: "reference/framework/JitORM/" },
    { text: "数据库", href: "reference/framework/JitORM/database" },
    { text: "数据模型", href: "reference/framework/JitORM/data-models" },
    { text: "数据类型", href: "reference/framework/JitORM/data-types" },
    { text: "Q表达式", href: "reference/framework/JitORM/q-expressions" },
    { text: "TQL", href: "reference/framework/JitORM/TQL" },
    { text: "模型事件", href: "reference/framework/JitORM/model-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWeb"
  href="reference/framework/JitWeb/"
  description="前端UI框架，提供门户系统、页面管理和组件库，支持可视化页面构建、响应式布局和自定义控件开发。"
>
  <LinkGrid columns={2} links={[
    { text: "全局样式", href: "reference/framework/JitWeb/global-styles" },
    { text: "常规门户", href: "reference/framework/JitWeb/portals/regular-portal" },
    { text: "空白门户", href: "reference/framework/JitWeb/portals/blank-portal" },
    { text: "SSR门户", href: "reference/framework/JitWeb/portals/ssr-portal" },
    { text: "AI数据管理页面", href: "reference/framework/JitWeb/pages/ai-data-management-page" },
    { text: "AI数据分析页面", href: "reference/framework/JitWeb/pages/ai-data-analysis-page" },
    { text: "常规页面", href: "reference/framework/JitWeb/pages/regular-page" },
    { text: "数据录入页面", href: "reference/framework/JitWeb/pages/data-entry-page" },
    { text: "Markdown页面", href: "reference/framework/JitWeb/pages/markdown-page" },
    { text: "React全代码页面", href: "reference/framework/JitWeb/pages/react-full-code-page" },
    { text: "Vue全代码页面", href: "reference/framework/JitWeb/pages/vue-full-code-page" },
    { text: "表格", href: "reference/framework/JitWeb/components/view-type/table" },
    { text: "列表", href: "reference/framework/JitWeb/components/view-type/list" },
    { text: "统计图", href: "reference/framework/JitWeb/components/view-type/statistical-chart" },
    { text: "树形", href: "reference/framework/JitWeb/components/view-type/tree" },
    { text: "日历", href: "reference/framework/JitWeb/components/view-type/calendar" },
    { text: "甘特图", href: "reference/framework/JitWeb/components/view-type/gantt-chart" },
    { text: "看板", href: "reference/framework/JitWeb/components/view-type/kanban" },
    { text: "画廊", href: "reference/framework/JitWeb/components/view-type/gallery" },
    { text: "轮播图", href: "reference/framework/JitWeb/components/view-type/carousel" },
    { text: "时间轴", href: "reference/framework/JitWeb/components/view-type/timeline" },
    { text: "交叉表", href: "reference/framework/JitWeb/components/view-type/cross-table" },
    { text: "分组表", href: "reference/framework/JitWeb/components/view-type/group-table" },
    { text: "级联表", href: "reference/framework/JitWeb/components/view-type/cascade-table" },
    { text: "级联树", href: "reference/framework/JitWeb/components/view-type/cascade-tree" },
    { text: "行转列", href: "reference/framework/JitWeb/components/view-type/row-to-column" },
    { text: "导入", href: "reference/framework/JitWeb/components/view-type/import" },
    { text: "解析Excel", href: "reference/framework/JitWeb/components/view-type/parse-excel" },
    { text: "全代码组件", href: "reference/framework/JitWeb/components/view-type/full-code-component" },
    { text: "表单", href: "reference/framework/JitWeb/components/form-type/form" },
    { text: "批量编辑表单", href: "reference/framework/JitWeb/components/form-type/batch-edit-form" },
    { text: "按钮", href: "reference/framework/JitWeb/components/operation-type/button" },
    { text: "模型筛选器", href: "reference/framework/JitWeb/components/operation-type/model-filter" },
    { text: "通用筛选器", href: "reference/framework/JitWeb/components/operation-type/general-filter" },
    { text: "数据修正", href: "reference/framework/JitWeb/components/operation-type/data-correction" },
    { text: "支付", href: "reference/framework/JitWeb/components/operation-type/payment" },
    { text: "标签页", href: "reference/framework/JitWeb/components/layout-type/tabs" },
    { text: "弹窗", href: "reference/framework/JitWeb/components/layout-type/modal" },
    { text: "子页面", href: "reference/framework/JitWeb/components/layout-type/sub-page" },
    { text: "折叠面板", href: "reference/framework/JitWeb/components/layout-type/collapse-panel" },
    { text: "发起申请", href: "reference/framework/JitWeb/components/approval-type/initiate-application" },
    { text: "审批处理", href: "reference/framework/JitWeb/components/approval-type/approval-workflowing" },
    { text: "自定义控件", href: "reference/framework/JitWeb/custom-controls" }
  ]} />
</IndexCard>

<IndexCard
  title="JitService"
  href="reference/framework/JitService/"
  description="业务服务框架，提供API授权管理、外部系统集成、前后端拦截器、自定义业务服务和事件驱动架构支持。"
>
  <LinkGrid columns={2} links={[
    { text: "API授权", href: "reference/framework/JitService/api-authorization" },
    { text: "外部API集成", href: "reference/framework/JitService/external-api-integration" },
    { text: "前端拦截器", href: "reference/framework/JitService/frontend-interceptor" },
    { text: "后端拦截器", href: "reference/framework/JitService/backend-interceptor" },
    { text: "自定义业务服务", href: "reference/framework/JitService/custom-business-service" },
    { text: "自定义事件", href: "reference/framework/JitService/custom-events" },
    { text: "事件服务", href: "reference/framework/JitService/event-service" }
  ]} />
</IndexCard>

<IndexCard
  title="JitStorage"
  href="reference/framework/JitStorage/"
  description="存储管理框架，提供统一的文件存储接口，支持本地磁盘、云存储服务，集成多种缓存方案和文件模板处理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "磁盘存储", href: "reference/framework/JitStorage/storage/disk-storage" },
    { text: "阿里云OSS存储", href: "reference/framework/JitStorage/storage/aliyun-oss-storage" },
    { text: "七牛云存储", href: "reference/framework/JitStorage/storage/qiniu-storage" },
    { text: "MinIO存储", href: "reference/framework/JitStorage/storage/minio-storage" },
    { text: "EOS存储", href: "reference/framework/JitStorage/storage/eos-storage" },
    { text: "内置缓存", href: "reference/framework/JitStorage/cache/built-in-cache" },
    { text: "Redis缓存", href: "reference/framework/JitStorage/cache/redis-cache" },
    { text: "SQLite缓存", href: "reference/framework/JitStorage/cache/sqlite-cache" },
    { text: "TongRDS缓存", href: "reference/framework/JitStorage/cache/tongrds-cache" },
    { text: "Excel模板", href: "reference/framework/JitStorage/file-templates/excel-template" },
    { text: "Word模板", href: "reference/framework/JitStorage/file-templates/word-template" }
  ]} />
</IndexCard>

<IndexCard
  title="JitPay"
  href="reference/framework/JitPay/"
  description="支付服务框架，集成微信支付和支付宝支付平台，提供统一的支付接口和交易管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "支付服务", href: "reference/framework/JitPay/payment-service" },
    { text: "微信支付", href: "reference/framework/JitPay/wechat-pay" },
    { text: "支付宝支付", href: "reference/framework/JitPay/alipay" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWorkflow"
  href="reference/framework/JitWorkflow/"
  description="工作流引擎，提供可视化审批流程设计、流程实例管理和审批事件处理，支持复杂业务流程编排。"
>
  <LinkGrid columns={2} links={[
    { text: "常规审批", href: "reference/framework/JitWorkflow/regular-approval" },
    { text: "审批事件", href: "reference/framework/JitWorkflow/approval-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitTask"
  href="reference/framework/JitTask/"
  description="任务调度框架，支持定时任务和基于数据模型日期字段的智能任务调度，提供任务监控和管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "任务服务", href: "reference/framework/JitTask/task-service" },
    { text: "定时任务", href: "reference/framework/JitTask/scheduled-tasks" },
    { text: "日期字段任务", href: "reference/framework/JitTask/date-field-tasks" }
  ]} />
</IndexCard>

<IndexCard
  title="JitI18N"
  href="reference/framework/JitI18N/"
  description="国际化框架，提供多语言支持和语言包管理，支持动态语言切换和本地化内容管理。"
>
  <LinkGrid columns={2} links={[
    { text: "语言包", href: "reference/framework/JitI18N/language-pack" }
  ]} />
</IndexCard>

<IndexCard
  title="JitMessage"
  href="reference/framework/JitMessage/"
  description="消息通知框架，集成短信推送渠道，提供统一的消息发送接口和模板管理能力。"
>
  <LinkGrid columns={2} links={[
    { text: "阿里云短信", href: "reference/framework/JitMessage/aliyun-sms" }
  ]} />
</IndexCard>

<IndexCard
  title="JitCommons"
  href="reference/framework/JitCommons/"
  description="通用工具库，提供前后端共享的计算函数、数据处理工具和常用工具方法，简化开发过程中的通用操作。"
>
  <LinkGrid columns={2} links={[
    { text: "通用前端", href: "reference/framework/JitCommons/frontend" },
    { text: "通用后端", href: "reference/framework/JitCommons/backend" }
  ]} />
</IndexCard>

</div>

## [运行平台](reference/runtime-platform)
涵盖平台协议规范、应用部署配置和运行环境管理，帮助开发者理解应用打包、发布和运维的技术细节。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="平台协议与规范"
  href="reference/runtime-platform/"
  description="运行平台核心协议与规范，定义JAAP应用协议、JitNode目录结构和平台运行机制。"
>
  <LinkGrid columns={2} links={[
    { text: "JAAP协议", href: "reference/runtime-platform/JAAP" },
    { text: "JitNode目录", href: "reference/runtime-platform/jitnode-directory" },
    { text: "平台概述", href: "reference/runtime-platform/" }
  ]} />
</IndexCard>

<IndexCard
  title="前端运行环境"
  href="reference/runtime-platform/frontend/"
  description="前端运行环境管理，提供前端应用配置、元素定义规范和客户端运行时支持。"
>
  <LinkGrid columns={2} links={[
    { text: "前端应用管理", href: "reference/runtime-platform/frontend/applications/App" },
    { text: "前端元素定义", href: "reference/runtime-platform/frontend/elements/ElementDefine" }
  ]} />
</IndexCard>

<IndexCard
  title="后端运行环境"
  href="reference/runtime-platform/backend/"
  description="后端运行环境管理，提供应用生命周期管理、代码资源管理、运行环境配置和节点集群管理。"
>
  <LinkGrid columns={2} links={[
    { text: "后端应用管理", href: "reference/runtime-platform/backend/applications/App" },
    { text: "应用代码管理", href: "reference/runtime-platform/backend/applications/AppCode" },
    { text: "应用资源管理", href: "reference/runtime-platform/backend/applications/AppResource" },
    { text: "运行环境配置", href: "reference/runtime-platform/backend/runtime-environment/01Environ" },
    { text: "元素管理", href: "reference/runtime-platform/backend/elements/Element" },
    { text: "节点配置", href: "reference/runtime-platform/backend/jit-nodes/Node" }
  ]} />
</IndexCard>

</div>

