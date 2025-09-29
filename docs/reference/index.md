---
sidebar_position: -1
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# Reference Index
JitAi reference documentation provides comprehensive API documentation, configuration instructions, and technical specifications. Developers can query element configuration parameters, method invocation interfaces, data structure definitions, and platform protocol specifications to quickly resolve technical issues during development.
## [Development Framework](reference/framework)
Provides element configuration, API interfaces, and usage methods for each framework module, including complete parameter descriptions, code examples, and best practice guidance.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="JitAi"
  href="reference/framework/JitAi"
  description="AI application development framework that provides comprehensive AI-native application building capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "AIAgent", href: "reference/framework/JitAi/AIAgent" },
    { text: "AI Assistant", href: "reference/framework/JitAi/ai-assistant" },
    { text: "AI Large Models", href: "reference/framework/JitAi/ai-large-models" },
    { text: "AI Knowledge Base", href: "reference/framework/JitAi/ai-knowledge-base" },
    { text: "Agent Events", href: "reference/framework/JitAi/agent-events" },
    { text: "Assistant Events", href: "reference/framework/JitAi/assistant-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitAuth"
  href="reference/framework/JitAuth/"
  description="Identity authentication and permission management framework based on RBAC model, providing multiple login methods, enterprise organizational structure management, and API permission control, with support for third-party identity system integration."
>
  <LinkGrid columns={2} links={[
    { text: "Regular Roles", href: "reference/framework/JitAuth/regular-roles" },
    { text: "Account Password Login", href: "reference/framework/JitAuth/login-authentication/account-password-login" },
    { text: "Mobile Login", href: "reference/framework/JitAuth/login-authentication/mobile-login" },
    { text: "WeChat Login", href: "reference/framework/JitAuth/login-authentication/wechat-login" },
    { text: "WeChat Mini Program Login", href: "reference/framework/JitAuth/login-authentication/wechat-miniapp-login" },
    { text: "WeChat Official Account Login", href: "reference/framework/JitAuth/login-authentication/wechat-official-login" },
    { text: "WeChat Work Self-built QR Login", href: "reference/framework/JitAuth/login-authentication/wechat-work-dev-login" },
    { text: "WeChat Work Third-party Login", href: "reference/framework/JitAuth/login-authentication/wechat-work-qr-login" },
    { text: "DingTalk Self-built QR Login", href: "reference/framework/JitAuth/login-authentication/dingtalk-qr-login" },
    { text: "Standard Organization", href: "reference/framework/JitAuth/enterprise-organization/standard-organization" },
    { text: "WeChat Work Self-built Organization", href: "reference/framework/JitAuth/enterprise-organization/wechat-work-dev-organization" },
    { text: "WeChat Work Third-party Organization", href: "reference/framework/JitAuth/enterprise-organization/wechat-work-organization" },
    { text: "DingTalk Self-built Organization", href: "reference/framework/JitAuth/enterprise-organization/dingtalk-organization" }
  ]} />
</IndexCard>

<IndexCard
  title="JitORM"
  href="reference/framework/JitORM/"
  description="Object-relational mapping framework supporting multiple database types, providing visual data modeling, rich data types, Q-expression queries, and TQL language with built-in model event mechanisms."
>
  <LinkGrid columns={2} links={[
    { text: "ORM Overview", href: "reference/framework/JitORM/" },
    { text: "Database", href: "reference/framework/JitORM/database" },
    { text: "Data Models", href: "reference/framework/JitORM/data-models" },
    { text: "Data Types", href: "reference/framework/JitORM/data-types" },
    { text: "Q Expressions", href: "reference/framework/JitORM/q-expressions" },
    { text: "TQL", href: "reference/framework/JitORM/TQL" },
    { text: "Model Events", href: "reference/framework/JitORM/model-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWeb"
  href="reference/framework/JitWeb/"
  description="Frontend UI framework providing portal systems, page management, and component libraries, supporting visual page construction, responsive layouts, and custom control development."
>
  <LinkGrid columns={2} links={[
    { text: "Global Styles", href: "reference/framework/JitWeb/global-styles" },
    { text: "Generic Portal", href: "reference/framework/JitWeb/portals/regular-portal" },
    { text: "Blank Portal", href: "reference/framework/JitWeb/portals/blank-portal" },
    { text: "SSR Portal", href: "reference/framework/JitWeb/portals/ssr-portal" },
    { text: "AI Data Management Page", href: "reference/framework/JitWeb/pages/ai-data-management-page" },
    { text: "AI Data Analysis Page", href: "reference/framework/JitWeb/pages/ai-data-analysis-page" },
    { text: "Regular Page", href: "reference/framework/JitWeb/pages/regular-page" },
    { text: "Data Entry Page", href: "reference/framework/JitWeb/pages/data-entry-page" },
    { text: "Markdown Page", href: "reference/framework/JitWeb/pages/markdown-page" },
    { text: "React Full Code Page", href: "reference/framework/JitWeb/pages/react-full-code-page" },
    { text: "Vue Full Code Page", href: "reference/framework/JitWeb/pages/vue-full-code-page" },
    { text: "Table", href: "reference/framework/JitWeb/components/view-type/table" },
    { text: "List", href: "reference/framework/JitWeb/components/view-type/list" },
    { text: "Statistical Chart", href: "reference/framework/JitWeb/components/view-type/statistical-chart" },
    { text: "Tree", href: "reference/framework/JitWeb/components/view-type/tree" },
    { text: "Calendar", href: "reference/framework/JitWeb/components/view-type/calendar" },
    { text: "Gantt Chart", href: "reference/framework/JitWeb/components/view-type/gantt-chart" },
    { text: "Kanban", href: "reference/framework/JitWeb/components/view-type/kanban" },
    { text: "Gallery", href: "reference/framework/JitWeb/components/view-type/gallery" },
    { text: "Carousel", href: "reference/framework/JitWeb/components/view-type/carousel" },
    { text: "Timeline", href: "reference/framework/JitWeb/components/view-type/timeline" },
    { text: "Cross Table", href: "reference/framework/JitWeb/components/view-type/cross-table" },
    { text: "Group Table", href: "reference/framework/JitWeb/components/view-type/group-table" },
    { text: "Cascade Table", href: "reference/framework/JitWeb/components/view-type/cascade-table" },
    { text: "Cascade Tree", href: "reference/framework/JitWeb/components/view-type/cascade-tree" },
    { text: "Row to Column", href: "reference/framework/JitWeb/components/view-type/row-to-column" },
    { text: "Import", href: "reference/framework/JitWeb/components/view-type/import" },
    { text: "Parse Excel", href: "reference/framework/JitWeb/components/view-type/parse-excel" },
    { text: "Full Code Component", href: "reference/framework/JitWeb/components/view-type/full-code-component" },
    { text: "Form", href: "reference/framework/JitWeb/components/form-type/form" },
    { text: "Batch Edit Form", href: "reference/framework/JitWeb/components/form-type/batch-edit-form" },
    { text: "Button", href: "reference/framework/JitWeb/components/operation-type/button" },
    { text: "Model Filter", href: "reference/framework/JitWeb/components/operation-type/model-filter" },
    { text: "General Filter", href: "reference/framework/JitWeb/components/operation-type/general-filter" },
    { text: "Data Correction", href: "reference/framework/JitWeb/components/operation-type/data-correction" },
    { text: "Payment", href: "reference/framework/JitWeb/components/operation-type/payment" },
    { text: "Tabs", href: "reference/framework/JitWeb/components/layout-type/tabs" },
    { text: "Modal", href: "reference/framework/JitWeb/components/layout-type/modal" },
    { text: "Sub Page", href: "reference/framework/JitWeb/components/layout-type/sub-page" },
    { text: "Collapse Panel", href: "reference/framework/JitWeb/components/layout-type/collapse-panel" },
    { text: "Initiate Application", href: "reference/framework/JitWeb/components/approval-type/initiate-application" },
    { text: "Approval Processing", href: "reference/framework/JitWeb/components/approval-type/approval-workflowing" },
    { text: "Custom Controls", href: "reference/framework/JitWeb/custom-controls" }
  ]} />
</IndexCard>

<IndexCard
  title="JitService"
  href="reference/framework/JitService/"
  description="Business service framework providing API authorization management, external system integration, frontend and backend interceptors, custom business services, and event-driven architecture support."
>
  <LinkGrid columns={2} links={[
    { text: "API Authorization", href: "reference/framework/JitService/api-authorization" },
    { text: "External API Integration", href: "reference/framework/JitService/external-api-integration" },
    { text: "Frontend Interceptor", href: "reference/framework/JitService/frontend-interceptor" },
    { text: "Backend Interceptor", href: "reference/framework/JitService/backend-interceptor" },
    { text: "Custom Business Service", href: "reference/framework/JitService/custom-business-service" },
    { text: "Custom Events", href: "reference/framework/JitService/custom-events" },
    { text: "Event Service", href: "reference/framework/JitService/event-service" }
  ]} />
</IndexCard>

<IndexCard
  title="JitStorage"
  href="reference/framework/JitStorage/"
  description="Storage management framework providing unified file storage interfaces, supporting local disk and cloud storage services, integrating multiple caching solutions and file template processing capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "Disk Storage", href: "reference/framework/JitStorage/storage/disk-storage" },
    { text: "Alibaba Cloud OSS Storage", href: "reference/framework/JitStorage/storage/aliyun-oss-storage" },
    { text: "Qiniu Cloud Storage", href: "reference/framework/JitStorage/storage/qiniu-storage" },
    { text: "MinIO Storage", href: "reference/framework/JitStorage/storage/minio-storage" },
    { text: "EOS Storage", href: "reference/framework/JitStorage/storage/eos-storage" },
    { text: "Built-in Cache", href: "reference/framework/JitStorage/cache/built-in-cache" },
    { text: "Redis Cache", href: "reference/framework/JitStorage/cache/redis-cache" },
    { text: "SQLite Cache", href: "reference/framework/JitStorage/cache/sqlite-cache" },
    { text: "TongRDS Cache", href: "reference/framework/JitStorage/cache/tongrds-cache" },
    { text: "Excel Template", href: "reference/framework/JitStorage/file-templates/excel-template" },
    { text: "Word Template", href: "reference/framework/JitStorage/file-templates/word-template" }
  ]} />
</IndexCard>

<IndexCard
  title="JitPay"
  href="reference/framework/JitPay/"
  description="Payment service framework integrating WeChat Pay and Alipay platforms, providing unified payment interfaces and transaction management capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "Payment Service", href: "reference/framework/JitPay/payment-service" },
    { text: "WeChat Pay", href: "reference/framework/JitPay/wechat-pay" },
    { text: "Alipay", href: "reference/framework/JitPay/alipay" }
  ]} />
</IndexCard>

<IndexCard
  title="JitWorkflow"
  href="reference/framework/JitWorkflow/"
  description="Workflow engine providing visual approval process design, process instance management, and approval event handling, supporting complex business process orchestration."
>
  <LinkGrid columns={2} links={[
    { text: "Regular Approval", href: "reference/framework/JitWorkflow/regular-approval" },
    { text: "Approval Events", href: "reference/framework/JitWorkflow/approval-events" }
  ]} />
</IndexCard>

<IndexCard
  title="JitTask"
  href="reference/framework/JitTask/"
  description="Task scheduling framework supporting scheduled tasks and intelligent task scheduling based on data model date fields, providing task monitoring and management capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "Task Service", href: "reference/framework/JitTask/task-service" },
    { text: "Scheduled Tasks", href: "reference/framework/JitTask/scheduled-tasks" },
    { text: "Date Field Tasks", href: "reference/framework/JitTask/date-field-tasks" }
  ]} />
</IndexCard>

<IndexCard
  title="JitI18N"
  href="reference/framework/JitI18N/"
  description="Internationalization framework providing multi-language support and language pack management, supporting dynamic language switching and localized content management."
>
  <LinkGrid columns={2} links={[
    { text: "Language Pack", href: "reference/framework/JitI18N/language-pack" }
  ]} />
</IndexCard>

<IndexCard
  title="JitMessage"
  href="reference/framework/JitMessage/"
  description="Message notification framework integrating SMS push channels, providing unified message sending interfaces and template management capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "Alibaba Cloud SMS", href: "reference/framework/JitMessage/aliyun-sms" }
  ]} />
</IndexCard>

<IndexCard
  title="JitCommons"
  href="reference/framework/JitCommons/"
  description="Common utility library providing shared computational functions, data processing tools, and common utility methods for frontend and backend, simplifying common operations during development."
>
  <LinkGrid columns={2} links={[
    { text: "Common Frontend", href: "reference/framework/JitCommons/frontend" },
    { text: "Common Backend", href: "reference/framework/JitCommons/backend" }
  ]} />
</IndexCard>

</div>

## [Runtime Platform](reference/runtime-platform)
Covers platform protocol specifications, application deployment configuration, and runtime environment management, helping developers understand the technical details of application packaging, publishing, and operations.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px', marginBottom: '32px'}}>

<IndexCard
  title="Platform Protocols and Specifications"
  href="reference/runtime-platform/"
  description="Core protocols and specifications of the runtime platform, defining JAAP application protocol, JitNode directory structure, and platform runtime mechanisms."
>
  <LinkGrid columns={2} links={[
    { text: "JAAP Protocol", href: "reference/runtime-platform/JAAP" },
    { text: "JitNode Directory", href: "reference/runtime-platform/jitnode-directory" },
    { text: "Platform Overview", href: "reference/runtime-platform/" }
  ]} />
</IndexCard>

<IndexCard
  title="Frontend Runtime Environment"
  href="reference/runtime-platform/frontend/"
  description="Frontend runtime environment management, providing frontend application configuration, element definition specifications, and client-side runtime support."
>
  <LinkGrid columns={2} links={[
    { text: "Frontend Application Management", href: "reference/runtime-platform/frontend/applications/App" },
    { text: "Frontend Element Definition", href: "reference/runtime-platform/frontend/elements/ElementDefine" }
  ]} />
</IndexCard>

<IndexCard
  title="Backend Runtime Environment"
  href="reference/runtime-platform/backend/"
  description="Backend runtime environment management, providing application lifecycle management, code resource management, runtime environment configuration, and node cluster management."
>
  <LinkGrid columns={2} links={[
    { text: "Backend Application Management", href: "reference/runtime-platform/backend/applications/App" },
    { text: "Application Code Management", href: "reference/runtime-platform/backend/applications/AppCode" },
    { text: "Application Resource Management", href: "reference/runtime-platform/backend/applications/AppResource" },
    { text: "Runtime Environment Configuration", href: "reference/runtime-platform/backend/runtime-environment/01Environ" },
    { text: "Element Management", href: "reference/runtime-platform/backend/elements/Element" },
    { text: "Node Configuration", href: "reference/runtime-platform/backend/jit-nodes/Node" }
  ]} />
</IndexCard>

</div>

