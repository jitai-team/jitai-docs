---
sidebar_position: 0
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# Guide
Ready to experience a revolutionary new way of application development? Start here and learn to build powerful enterprise-grade applications using the cutting-edge technology stack of the AI era.

The developer guide provides a complete learning path from organizational management and application development fundamentals to business logic implementation, along with best practices for mastering complex application architecture design through real business scenarios.

**Usage Recommendations**: Beginners should follow the sequential learning path, while experienced developers can jump directly to the scenario-based advanced guides.

First, you need to complete the basic [Download and Installation](../tutorial/download-installation)!


## Basic Concepts
Master the core concepts and architecture principles of the JitAi platform. Understand the fundamental concepts of platform applications, element systems, development frameworks, and visual development tools to lay the theoretical foundation for subsequent development work.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Platform Architecture and Core Concepts"
  href="basic-concept"
  description="Understand JitAi platform architecture, application concepts, JAAP protocol, element systems, and development frameworks to master the fundamental principles of the platform."
>
  <LinkGrid columns={2} links={[
    { text: "Platform and Applications", href: "basic-concept#platform-and-applications" },
    { text: "DevOps Tools and Services", href: "basic-concept#devops-tools-and-services" },
    { text: "Application Creation and Development", href: "basic-concept#application-creation-and-development" },
    { text: "JAAP Protocol and Elements", href: "basic-concept#jaap-protocol-and-elements" },
    { text: "Element Type and Element Loading", href: "basic-concept#element-type-and-element-loading" },
    { text: "Development Framework", href: "basic-concept#development-framework" },
    { text: "Business Applications and Application Inheritance", href: "basic-concept#business-applications-and-application-inheritance" },
    { text: "Development Tools", href: "basic-concept#development-tools" },
    { text: "Extension", href: "basic-concept#extension" }
  ]} />
</IndexCard>

</div>

## Platform Installation and Node Activation
Complete the platform installation and node activation process. Learn download and installation methods, node activation procedures, and developer organization management to establish a development environment foundation.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Download and Installation"
  href="installation-activation/download-installation"
  description="Learn how to download and install JitAi platform, including desktop and server versions for different deployment scenarios."
>
  <LinkGrid links={[
    { text: "Detailed Installation Steps", href: "installation-activation/download-installation#detailed-installation-steps" }
  ]} />
</IndexCard>

<IndexCard
  title="Node Activation and Developer Organizations"
  href="installation-activation/developer-organization-management"
  description="Learn how to activate nodes and manage developer organizations, including organization binding, member management and other core operations."
>
  <LinkGrid links={[
    { text: "What is Node", href: "installation-activation/developer-organization-management#what-is-jitnode" },
    { text: "What is Developer Organization", href: "installation-activation/developer-organization-management#what-is-developer-organization" },
    { text: "Create New Development Organization When Activating Node", href: "installation-activation/developer-organization-management#create-new-development-organization-when-activating-node" },
    { text: "Bind Node to Joined Organization When Activating", href: "installation-activation/developer-organization-management#bind-node-to-joined-organization-when-activating" },
    { text: "Use Organization Bind Code to Join and Bind When Activating Node", href: "installation-activation/developer-organization-management#use-organization-bind-code-to-join-and-bind-when-activating-node" },
    { text: "Join Organization via Bind Code When Logging into Existing Node", href: "installation-activation/developer-organization-management#join-organization-via-bind-code-when-logging-into-existing-node" },
    { text: "View and Refresh Organization Bind Code", href: "installation-activation/developer-organization-management#view-and-refresh-organization-bind-code" },
    { text: "Remove Organization Member", href: "installation-activation/developer-organization-management#remove-organization-member" }
  ]} />
</IndexCard>

<IndexCard
  title="Platform Node Updates and Upgrades"
  href="installation-activation/platform-node-updates-upgrades"
  description="Learn how to update and upgrade platform nodes to maintain system stability and feature updates."
>
  <LinkGrid links={[
    { text: "Update Procedures", href: "installation-activation/platform-node-updates-upgrades" },
    { text: "Upgrade Methods", href: "installation-activation/platform-node-updates-upgrades" }
  ]} />
</IndexCard>

</div>

## Development Tools and Publishing Services
Powerful toolchain for efficient development. Master visual development environments, DevOps management tools, and cloud publishing services to achieve complete toolchain support from development to deployment.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="JitAi Visual Development Tools"
  href="development-tool-and-publish-service/jitai-visual-development-tools"
  description="Master the powerful visual development environment, familiarize yourself with IDE functional areas, and learn to switch between visual and source code modes."
>
  <LinkGrid links={[
    { text: "Element Directory Tree", href: "development-tool-and-publish-service/jitai-visual-development-tools#element-directory-tree" },
    { text: "Add Element", href: "development-tool-and-publish-service/jitai-visual-development-tools#add-element" },
    { text: "Visual Editor", href: "development-tool-and-publish-service/jitai-visual-development-tools#visual-editor" },
    { text: "Source Code Editor", href: "development-tool-and-publish-service/jitai-visual-development-tools#source-code-editor" },
    { text: "Source Code File Tree", href: "development-tool-and-publish-service/jitai-visual-development-tools#source-code-file-tree" },
    { text: "Application Settings", href: "development-tool-and-publish-service/jitai-visual-development-tools#application-settings" },
    { text: "Portal Switching", href: "development-tool-and-publish-service/jitai-visual-development-tools#portal-switching" },
    { text: "Personal Center", href: "development-tool-and-publish-service/jitai-visual-development-tools#personal-center" },
    { text: "Language Switch", href: "development-tool-and-publish-service/jitai-visual-development-tools#language-switch" },
    { text: "Navigation Tabs", href: "development-tool-and-publish-service/jitai-visual-development-tools#navigation-tabs" }
  ]} />
</IndexCard>

<IndexCard
  title="DevOps Management Tool"
  href="development-tool-and-publish-service/devops-management-tool"
  description="Comprehensive DevOps management solution with dual-console architecture, providing complete application lifecycle management from development to deployment."
>
  <LinkGrid links={[
    { text: "Dual Console Architecture", href: "development-tool-and-publish-service/devops-management-tool#dual-console-architecture" },
    { text: "Local Node Console", href: "development-tool-and-publish-service/devops-management-tool#local-node-console" },
    { text: "Organization Management Console", href: "development-tool-and-publish-service/devops-management-tool#organization-management-console" },
    { text: "Application Lifecycle Management", href: "development-tool-and-publish-service/devops-management-tool#application-lifecycle-management" },
    { text: "Runtime Environment Management", href: "development-tool-and-publish-service/devops-management-tool#runtime-environment-management" },
    { text: "Node Cluster Management", href: "development-tool-and-publish-service/devops-management-tool#node-cluster-management" },
    { text: "Flexible Configuration Management", href: "development-tool-and-publish-service/devops-management-tool#flexible-configuration-management" },
    { text: "Version Release and Deployment", href: "development-tool-and-publish-service/devops-management-tool#version-release-and-deployment" },
    { text: "Multi-platform Export", href: "development-tool-and-publish-service/devops-management-tool#multi-platform-export" },
    { text: "Application Template Ecosystem", href: "development-tool-and-publish-service/devops-management-tool#application-template-ecosystem" }
  ]} />
</IndexCard>

<IndexCard
  title="JCS Cloud Application Publishing Service"
  href="development-tool-and-publish-service/jcs-cloud-publishing-service"
  description="Official cloud application publishing service providing centralized application repository, version management, and seamless deployment across JitNodes."
>
  <LinkGrid links={[
    { text: "Synchronizing Runtime Environment Configuration", href: "development-tool-and-publish-service/jcs-cloud-publishing-service#synchronizing-runtime-environment-configuration" },
    { text: "Retrieving Version Update Information", href: "development-tool-and-publish-service/jcs-cloud-publishing-service#retrieving-version-update-information" },
    { text: "Accessing Cloud Application Repository", href: "development-tool-and-publish-service/jcs-cloud-publishing-service#accessing-cloud-application-repository" }
  ]} />
</IndexCard>

</div>

## Creating and Publishing Applications
Complete workflow from application creation to distributed deployment. Master application creation, source code management, version publishing, runtime environment configuration, and building infinitely horizontally scalable distributed cluster architectures.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating and Deploying Applications"
  href="creating-and-publishing-applications/creating-and-deploying-applications"
  description="Learn application creation, inheritance, data configuration, and deployment. Master the fundamentals of application development workflow."
>
  <LinkGrid links={[
    { text: "Create First Application", href: "creating-and-publishing-applications/creating-and-deploying-applications#create-first-application" },
    { text: "Rapid Development Based on Existing Apps", href: "creating-and-publishing-applications/creating-and-deploying-applications#based-on-existing-application-quick-development" },
    { text: "Data Storage and Environment Variables", href: "creating-and-publishing-applications/creating-and-deploying-applications#data-storage-and-environment-variable-configuration" },
    { text: "Application Deployment", href: "creating-and-publishing-applications/creating-and-deploying-applications#application-deployment" }
  ]} />
</IndexCard>

<IndexCard
  title="Application Directory and Element Source Code"
  href="creating-and-publishing-applications/application-directory-and-element-source-code"
  description="Understand JitAi application directory structure based on JAAP protocol, element code organization, and source code export/import mechanisms."
>
  <LinkGrid links={[
    { text: "Application Directory Structure", href: "creating-and-publishing-applications/application-directory-and-element-source-code#application-directory-structure" },
    { text: "Element Code Directory Structure", href: "creating-and-publishing-applications/application-directory-and-element-source-code#element-code-directory-structure" },
    { text: "Application Source Code Export/Import", href: "creating-and-publishing-applications/application-directory-and-element-source-code#application-export-import" },
    { text: "Export Source Code Zip", href: "creating-and-publishing-applications/application-directory-and-element-source-code#export-source-code-zip" },
    { text: "Export to WeChat MiniProgram", href: "creating-and-publishing-applications/application-directory-and-element-source-code#export-to-wechat-miniprogram" },
    { text: "Import Application Source Code", href: "creating-and-publishing-applications/application-directory-and-element-source-code#import-application-source-code" }
  ]} />
</IndexCard>

<IndexCard
  title="Publishing and Updating Applications"
  href="creating-and-publishing-applications/publishing-and-updating-applications"
  description="Master application version management, publishing workflows, and update strategies. Learn semantic versioning and deployment configurations."
>
  <LinkGrid links={[
    { text: "Version Management and Publishing", href: "creating-and-publishing-applications/publishing-and-updating-applications#application-version-management-and-publish" },
    { text: "Semantic Versioning", href: "creating-and-publishing-applications/publishing-and-updating-applications#semantic-versioning" },
    { text: "Auto-Update Configuration", href: "creating-and-publishing-applications/publishing-and-updating-applications#force-auto-update" },
    { text: "Source Code and Initialization Data", href: "creating-and-publishing-applications/publishing-and-updating-applications#include-source-code" },
    { text: "Application Version Updates", href: "creating-and-publishing-applications/publishing-and-updating-applications#application-version-updates" },
    { text: "Deployment Strategies", href: "creating-and-publishing-applications/publishing-and-updating-applications#application-deployment-strategies" }
  ]} />
</IndexCard>


<IndexCard
  title="Runtime Environment Management"
  href="creating-and-publishing-applications/runtime-environment-management"
  description="Master the creation, configuration, and management of runtime environments, and learn how to use node clusters and application deployment."
>
  <LinkGrid links={[
    { text: "What is Runtime Environment", href: "creating-and-publishing-applications/runtime-environment-management#what-is-runtime-environment" },
    { text: "Local Default Runtime Environment", href: "creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment" },
    { text: "Create New Runtime Environment", href: "creating-and-publishing-applications/runtime-environment-management#createnewrunenvironment" },
    { text: "Development Mode Deployment", href: "creating-and-publishing-applications/runtime-environment-management#deploy-in-development-mode" },
    { text: "Production Mode Deployment", href: "creating-and-publishing-applications/runtime-environment-management#deploy-in-production-mode" },
    { text: "Use Runtime Environment to Manage Node Clusters", href: "creating-and-publishing-applications/runtime-environment-management#use-runtime-environment-to-manage-node-clusters" },
    { text: "Deploy Application in Runtime Environment", href: "creating-and-publishing-applications/runtime-environment-management#deploy-application-in-runtime-environment" }
  ]} />
</IndexCard>

<IndexCard
  title="Distributed Cluster Architecture for Unlimited Horizontal Scaling"
  href="creating-and-publishing-applications/distributed-cluster-architecture"
  description="Learn how to build and manage infinitely horizontally scalable distributed cluster architectures for high availability and performance."
>
  <LinkGrid links={[
    { text: "Four-Layer Architecture Model", href: "creating-and-publishing-applications/distributed-cluster-architecture#four-layer-architecture" },
    { text: "Typical Deployment Topology", href: "creating-and-publishing-applications/distributed-cluster-architecture#typical-deployment-topology" },
    { text: "Enterprise Cluster Deployment", href: "creating-and-publishing-applications/distributed-cluster-architecture#enterprise-cluster-deployment" },
    { text: "Multi-Dimensional Environment Division", href: "creating-and-publishing-applications/distributed-cluster-architecture#multi-dimensional-environment-division" },
    { text: "Cluster Scaling Strategies", href: "creating-and-publishing-applications/distributed-cluster-architecture#cluster-scaling-strategies" },
    { text: "Load Balancing & Fault Tolerance", href: "creating-and-publishing-applications/distributed-cluster-architecture#load-balancing-fault-tolerance" },
    { text: "Architecture Constraints & Best Practices", href: "creating-and-publishing-applications/distributed-cluster-architecture#architecture-constraints-best-practices" }
  ]} />
</IndexCard>

</div>


## Frontend Portals and Pages
Design beautiful user interfaces and interactive experiences. From portal navigation to page construction, from component layout to data management, create complete, user-friendly application interfaces.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>
  
<IndexCard
  title="Creating Portals"
  href="shell-and-page/portal-navigation-design"
  description="Design portal interfaces for different user roles, configure navigation menus and permission controls, and create personalized user experiences."
>
  <LinkGrid links={[
    { text: "Application Built-in Three Portals", href: "shell-and-page/portal-navigation-design#application-built-in-three-portals" },
    { text: "Three Portal Types", href: "shell-and-page/portal-navigation-design#three-portal-types" },
    { text: "Create Portal and Configure Menu", href: "shell-and-page/portal-navigation-design#create-portal-and-configure-menu" },
    { text: "Portal Layout Design", href: "shell-and-page/portal-navigation-design#portal-layout-design" },
    { text: "Enable or Disable Common Function Entries", href: "shell-and-page/portal-navigation-design#enable-disable-common-function-entries" },
    { text: "Using AI Assistant in Portal", href: "shell-and-page/portal-navigation-design#using-ai-assistant-in-portal" }
  ]} />
</IndexCard>

<IndexCard
  title="Component-based Page Development"
  href="shell-and-page/component-based-page-development"
  description="Use the visual editor to build page interfaces, configure components and events, and implement rich user interaction features."
>
  <LinkGrid links={[
    { text: "Create a Regular Page", href: "shell-and-page/component-based-page-development#create-a-regular-page" },
    { text: "Visual Page Editor", href: "shell-and-page/component-based-page-development#visual-page-editor" },
    { text: "Page Variables", href: "shell-and-page/component-based-page-development#page-variables" },
    { text: "Page Events", href: "shell-and-page/component-based-page-development#page-events" },
    { text: "Page Functions", href: "shell-and-page/component-based-page-development#page-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Data Management Page"
  href="shell-and-page/ai-data-management-page"
  description="AI-powered ai-data-management-page that intelligently assists in efficient data browsing, filtering, editing, and batch operations."
>
  <LinkGrid columns={2} links={[
    { text: "Create AI Data Management Page", href: "shell-and-page/ai-data-management-page#create-ai-data-management-page" },
    { text: "Limit Page Table Query Data Through Default Filter Conditions", href: "shell-and-page/ai-data-management-page#limit-page-table-query-data-through-default-filter-conditions" },
    { text: "Configure Default Data Sort Rules", href: "shell-and-page/ai-data-management-page#configure-default-data-sort-rules" },
    { text: "Hide Some Fields in Page Table", href: "shell-and-page/ai-data-management-page#hide-some-fields-in-page-table" },
    { text: "Configure Conditional Filter Fields", href: "shell-and-page/ai-data-management-page#configure-conditional-filter-fields" },
    { text: "Configure Viewable and Editable Fields in Form", href: "shell-and-page/ai-data-management-page#configure-viewable-editable-fields-in-form" },
    { text: "Configure Fields Displayed in Batch Edit Form", href: "shell-and-page/ai-data-management-page#configure-fields-displayed-in-batch-edit-form" },
    { text: "Enable AI Data Management Assistant", href: "shell-and-page/ai-data-management-page#enable-ai-data-management-assistant" },
    { text: "Convert to Regular Page for Modification", href: "shell-and-page/ai-data-management-page#convert-to-regular-page-for-modification" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Data Analysis Page"
  href="shell-and-page/ai-data-analysis-page"
  description="AI automatically generates data charts through natural language descriptions of requirements, supporting users to adjust chart styles and statistical dimensions at any time."
>
  <LinkGrid links={[
    { text: "Create AI Data Analysis Page", href: "shell-and-page/ai-data-analysis-page#create-ai-data-analysis-page" },
    { text: "Page Configuration", href: "shell-and-page/ai-data-analysis-page#page-configuration" },
    { text: "Runtime Effects Demo", href: "shell-and-page/ai-data-analysis-page#run-effects" },
    { text: "Full Code Development", href: "shell-and-page/ai-data-analysis-page#full-code-development" },
    { text: "Quick Create", href: "shell-and-page/ai-data-analysis-page#quick-create" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Entry Page"
  href="shell-and-page/data-entry-page"
  description="Quickly create data entry forms to implement data collection and submission functions."
>
  <LinkGrid links={[
    { text: "创建数据录入页面", href: "shell-and-page/data-entry-page#create-data-entry-page" },
    { text: "配置允许查看和编辑的字段", href: "shell-and-page/data-entry-page#configure-viewable-editable-fields" },
    { text: "提交后显示再次录入按钮", href: "shell-and-page/data-entry-page#show-re-entry-button-after-submission" },
    { text: "提交后展示结果反馈界面", href: "shell-and-page/data-entry-page#show-result-feedback-after-submission" },
    { text: "转换为常规页面进行修改", href: "shell-and-page/data-entry-page#convert-to-regular-page-for-modification" }
  ]} />
</IndexCard>


<IndexCard
  title="Markdown Page"
  href="shell-and-page/markdown-page"
  description="Create document-type pages with support for rich Markdown syntax and document display requirements."
>
  <LinkGrid links={[
    { text: "创建 Markdown 页面", href: "shell-and-page/markdown-page#create-markdown-page" },
    { text: "Markdown 语法", href: "shell-and-page/markdown-page#markdown-syntax" }
  ]} />
</IndexCard>


<IndexCard
  title="Full Code Page Development"
  href="shell-and-page/full-code-page-development"
  description="Fully customized page development approach for advanced developers, supporting complex business logic and personalized interfaces."
>
  <LinkGrid columns={2} links={[
    { text: "创建 React 全代码页面", href: "shell-and-page/full-code-page-development#create-react-full-code-page" },
    { text: "创建Vue全代码页面", href: "shell-and-page/full-code-page-development#vue-full-code-page" }
  ]} />
</IndexCard>

</div>

## Using AI in Portals and Pages
Enhance user experience with intelligent AI elements. Integrate AI assistants, agents, and other AI components into portals and pages to create smart, interactive applications that provide personalized assistance and automated workflows.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Using AI Assistants in Portals"
  href="using-ai-in-portals-and-pages/using-ai-assistants-in-portals"
  description="Learn how to use AI assistants into portal interfaces, providing users with intelligent help and guidance throughout their workflow."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Using AI Assistants in Component Pages"
  href="using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages"
  description="Embed AI assistants into component-based pages to enhance user interactions and provide contextual assistance for specific tasks."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Using AI Elements in Pages"
  href="using-ai-in-portals-and-pages/using-ai-elements-in-pages"
  description="Master the techniques for invoking AI elements from pages, including AI agents, LLM services, and knowledge bases for dynamic content generation."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Calling Business Elements in Pages
Connect your pages to powerful business logic and data operations. Learn how to invoke service functions and data model functions from pages to create dynamic, data-driven user interfaces with real-time business processing capabilities.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Calling Service Functions in Pages"
  href="calling-business-elements-in-pages/calling-service-functions-in-pages"
  description="Learn how to invoke service functions from pages to execute business logic, process data, and integrate with external systems for dynamic content generation."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Calling Data Model Functions in Pages"
  href="calling-business-elements-in-pages/calling-data-model-functions-in-pages"
  description="Master the techniques for calling data model functions from pages to perform CRUD operations, data queries, and database interactions for real-time data display."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Full-Code UI Components in Pages
Create advanced custom UI components with full programming control. Build sophisticated interactive elements that seamlessly integrate with page logic, handle complex events, and provide rich user experiences beyond standard components.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="UI Component Interface Specifications"
  href="fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="Learn the interface specifications and standards for creating full-code UI components, including props, state management, and lifecycle methods."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Calling Page and Component Functions in Full-Code Components"
  href="fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components"
  description="Master techniques for invoking page functions and other component functions from within full-code components for seamless integration."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Emitting Events"
  href="fullcode-ui-components-in-pages/emitting-events"
  description="Learn how to emit custom events from full-code components to communicate with parent pages and other components effectively."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Calling Full-Code Component Functions in Page Code"
  href="fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code"
  description="Understand how to call functions exposed by full-code components from page code to control component behavior and data flow."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Using Functional Components in Pages
The rich component library is your super toolkit. Drag and drop a table to display data, add forms to collect information, and insert charts for data visualization. Make complex frontend development simple and intuitive.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Form Components"
  href="using-functional-components-in-pages/form-components"
  description="Powerful form building tools supporting data collection, validation, permission control, and complex business rule configuration."
>
  <LinkGrid columns={2} links={[
    { text: "Basic Configuration and Item Management", href: "using-functional-components-in-pages/form-components#basic-configuration-and-item-management" },
    { text: "Field Validation and Interaction", href: "using-functional-components-in-pages/form-components#field-validation-and-interaction" },
    { text: "Layout Design", href: "using-functional-components-in-pages/form-components#layout-design" },
    { text: "Use Custom Controls to Render Fields", href: "using-functional-components-in-pages/form-components#use-custom-controls-to-render-fields" },
    { text: "Event Configuration", href: "using-functional-components-in-pages/form-components#event-configuration" },
    { text: "Advanced Functions", href: "using-functional-components-in-pages/form-components#advanced-functions" },
    { text: "Batch Edit Form Configuration", href: "using-functional-components-in-pages/form-components#batch-edit-form-configuration" },
    { text: "Batch Edit Form Events and Interaction", href: "using-functional-components-in-pages/form-components#batch-edit-form-events-and-interaction" },
    { text: "Data Correction Configuration", href: "using-functional-components-in-pages/form-components#data-correction-configuration" },
    { text: "Data Correction Usage", href: "using-functional-components-in-pages/form-components#data-correction-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Basic Table"
  href="using-functional-components-in-pages/table-components#basic-table"
  description="Standard data table display component supporting data source binding, field customization, pagination, sorting, and other basic functions."
>
  <LinkGrid columns={2} links={[
    { text: "Set Data Source", href: "using-functional-components-in-pages/table-components#set-data-source" },
    { text: "Custom Display Fields", href: "using-functional-components-in-pages/table-components#custom-display-fields" },
    { text: "Display Fields by Group", href: "using-functional-components-in-pages/table-components#display-fields-by-group" },
    { text: "Set Group Names and Background Colors", href: "using-functional-components-in-pages/table-components#set-group-names-and-background-colors" },
    { text: "Configure Field Attributes", href: "using-functional-components-in-pages/table-components#configure-field-attributes" },
    { text: "Freeze Fields", href: "using-functional-components-in-pages/table-components#freeze-fields" },
    { text: "Inline Editing", href: "using-functional-components-in-pages/table-components#inline-editing" },
    { text: "Field Statistics", href: "using-functional-components-in-pages/table-components#field-statistics" },
    { text: "Custom Field Renderer and Field Editor", href: "using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "Add Button", href: "using-functional-components-in-pages/table-components#add-button" },
    { text: "Delete Button", href: "using-functional-components-in-pages/table-components#delete-button" },
    { text: "Collapse Multiple Buttons to \"More\"", href: "using-functional-components-in-pages/table-components#collapse-multiple-buttons-to-more" },
    { text: "Set Page Size/Disable Selection/Disable Sorting/Refresh Data on First Load", href: "using-functional-components-in-pages/table-components#set-page-size-disable-selection-disable-sorting-refresh-on-first-load" },
    { text: "Turbo Mode", href: "using-functional-components-in-pages/table-components#turbo-mode" },
    { text: "Edit Rules", href: "using-functional-components-in-pages/table-components#edit-rules" },
    { text: "Style Rules", href: "using-functional-components-in-pages/table-components#style-rules" },
    { text: "Set Related Data Levels and No Data Text", href: "using-functional-components-in-pages/table-components#set-related-data-levels-and-no-data-text" },
    { text: "Table Events", href: "using-functional-components-in-pages/table-components#table-events" },
    { text: "Table Component Variables", href: "using-functional-components-in-pages/table-components#table-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="Grouped Table"
  href="using-functional-components-in-pages/table-components#grouped-table"
  description="Table component that groups data by specified fields, suitable for hierarchical data management."
>
  <LinkGrid links={[
    { text: "Grouped Field Configuration", href: "using-functional-components-in-pages/table-components#grouped-field-configuration" },
    { text: "Same Configuration as Basic Table", href: "using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "Same Events as Basic Table", href: "using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "Same Component Variables as Basic Table", href: "using-functional-components-in-pages/table-components#same-component-variables-as-basic-table" }
  ]} />
</IndexCard>

<IndexCard
  title="Cascaded Table"
  href="using-functional-components-in-pages/table-components#cascaded-table"
  description="Handle hierarchical data with parent-child relationships, supporting tree structure display and operations."
>
  <LinkGrid links={[
    { text: "Cascaded Table Sample Data", href: "using-functional-components-in-pages/table-components#cascaded-table-sample-data" },
    { text: "Configure Cascaded Logic Fields", href: "using-functional-components-in-pages/table-components#configure-cascaded-logic-fields" },
    { text: "Cascaded Table Usage Effects", href: "using-functional-components-in-pages/table-components#cascaded-table-usage-effects" },
    { text: "Same Configuration as Basic Table", href: "using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "Same Events as Basic Table", href: "using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "Same Table Variables as Basic Table", href: "using-functional-components-in-pages/table-components#same-table-variables-as-basic-table" }
  ]} />
</IndexCard>

</div>

<div style={{margin: '20px 0'}}>
  <details id="more-components">
    <summary style={{cursor: 'pointer', fontSize: '14px', color: '#666', textAlign: 'center'}}>
      View More Components
    </summary>

    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', margin: '20px 0'}}>

<IndexCard
  title="Crosstab"
  href="using-functional-components-in-pages/table-components#crosstab"
  description="Multi-dimensional pivot table supporting row-column cross-analysis, suitable for data statistics and report display."
>
  <LinkGrid columns={2} links={[
    { text: "Initialization Configuration", href: "using-functional-components-in-pages/table-components#initialization-configuration" },
    { text: "Configure Dimensions and Metrics", href: "using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "Statistics by Year/Quarter/Month/Week/Day", href: "using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "Configure Metrics", href: "using-functional-components-in-pages/table-components#configure-metrics" },
    { text: "Configure Calculated Metrics", href: "using-functional-components-in-pages/table-components#configure-calculated-metrics" },
    { text: "Custom Metric Attributes", href: "using-functional-components-in-pages/table-components#custom-metric-attributes" },
    { text: "Configure Metric Statistics Methods", href: "using-functional-components-in-pages/table-components#configure-metric-statistics-methods" },
    { text: "Metric Data Filtering", href: "using-functional-components-in-pages/table-components#metric-data-filtering" },
    { text: "Configure Chart Styles", href: "using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Header/Body Alignment", href: "using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Row/Column Styles", href: "using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Export/Refresh/Scroll Display Buttons", href: "using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Show Total", href: "using-functional-components-in-pages/table-components#show-total" },
    { text: "Cross Table Events", href: "using-functional-components-in-pages/table-components#cross-table-events" },
    { text: "Crosstab Component Variables", href: "using-functional-components-in-pages/table-components#crosstab-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="Row to Column"
  href="using-functional-components-in-pages/table-components#row-to-column"
  description="Special table mode that converts row data to column display, suitable for dynamic field display scenarios."
>
  <LinkGrid columns={2} links={[
    { text: "Basic Configuration", href: "using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Custom Field Names/Alignment", href: "using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Custom Field Renderer", href: "using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "Statistics Columns", href: "using-functional-components-in-pages/table-components#statistics-columns" },
    { text: "Export/Edit/Default Load Data", href: "using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Value Click Event", href: "using-functional-components-in-pages/table-components#value-click-event" },
    { text: "Button Configuration", href: "using-functional-components-in-pages/table-components#button-configuration" },
    { text: "Row to Column Event", href: "using-functional-components-in-pages/table-components#row-to-column-event" },
    { text: "Row to Column Component Variables", href: "using-functional-components-in-pages/table-components#row-to-column-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="Statistical Charts (Editing in Progress)"
  description="Rich data visualization chart components supporting bar charts, line charts, pie charts and other chart types."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Documentation is being improved, please stay tuned...
  </div>
</IndexCard>

<IndexCard
  title="Tree Components"
  href="using-functional-components-in-pages/tree-components"
  description="Display hierarchical data structures with node expand/collapse and selection operations, providing clear data navigation experience."
>
  <LinkGrid columns={2} links={[
    { text: "Create Tree Component", href: "using-functional-components-in-pages/tree-components#create-tree-form-component" },
    { text: "Configure Hierarchical Fields", href: "using-functional-components-in-pages/tree-components#configure-hierarchy-fields" },
    { text: "Refresh Data on First Load", href: "using-functional-components-in-pages/tree-components#tree-form-refresh-on-first-load" },
    { text: "Default Expand First Node", href: "using-functional-components-in-pages/tree-components#default-expand-first-node" },
    { text: "Node Click Events", href: "using-functional-components-in-pages/tree-components#click-node-event" },
    { text: "Cascade Tree", href: "using-functional-components-in-pages/tree-components#cascade-tree" },
    { text: "Create Cascade Tree", href: "using-functional-components-in-pages/tree-components#create-cascade-tree" },
    { text: "Configure Node Title", href: "using-functional-components-in-pages/tree-components#configure-node-title" },
    { text: "Set Parent Node", href: "using-functional-components-in-pages/tree-components#set-parent-node" },
    { text: "Single/Multiple Selection Mode", href: "using-functional-components-in-pages/tree-components#node-selection-mode" },
    { text: "Cascade Tree Refresh Data on First Load", href: "using-functional-components-in-pages/tree-components#cascade-tree-refresh-on-first-load" },
    { text: "Cascade Tree Node Click Events", href: "using-functional-components-in-pages/tree-components#cascade-tree-click-node-event" },
    { text: "Cascade Tree Node Selection Events", href: "using-functional-components-in-pages/tree-components#cascade-tree-select-node-event" }
  ]} />
</IndexCard>

<IndexCard
  title="List Components"
  href="using-functional-components-in-pages/list-components"
  description="Flexible data list display component supporting title, summary, button configuration, suitable for various list display scenarios."
>
  <LinkGrid columns={2} links={[
    { text: "Configure List Title", href: "using-functional-components-in-pages/list-components#configure-list-title" },
    { text: "Set Summary Content", href: "using-functional-components-in-pages/list-components#set-summary-content" },
    { text: "Show Field Titles in Summary", href: "using-functional-components-in-pages/list-components#show-field-titles-in-summary" },
    { text: "Set Summary Content Layout", href: "using-functional-components-in-pages/list-components#set-summary-content-layout" },
    { text: "List Component Button", href: "using-functional-components-in-pages/list-components#list-component-button" },
    { text: "Add Button", href: "using-functional-components-in-pages/list-components#add-button" },
    { text: "Modify Button Attributes", href: "using-functional-components-in-pages/list-components#modify-button-attributes" },
    { text: "Button Collapse to More", href: "using-functional-components-in-pages/list-components#button-collapse-to-more" },
    { text: "Button Drag Sort", href: "using-functional-components-in-pages/list-components#button-drag-sort" },
    { text: "Set Bottom Button Size", href: "using-functional-components-in-pages/list-components#set-bottom-button-size" },
    { text: "Refresh Data on First Component Load", href: "using-functional-components-in-pages/list-components#refresh-data-on-first-component-load" },
    { text: "Enable Row Click Event", href: "using-functional-components-in-pages/list-components#enable-row-click-event" },
    { text: "Default Select First Data", href: "using-functional-components-in-pages/list-components#default-select-first-data" },
    { text: "Show Row Spacing", href: "using-functional-components-in-pages/list-components#show-row-spacing" },
    { text: "List Component Event", href: "using-functional-components-in-pages/list-components#list-component-event" },
    { text: "Row Click Event", href: "using-functional-components-in-pages/list-components#row-click-event" },
    { text: "Button Event", href: "using-functional-components-in-pages/list-components#button-event" },
    { text: "List Component Variables", href: "using-functional-components-in-pages/list-components#list-component-variables" },
    { text: "Refresh List Component", href: "using-functional-components-in-pages/list-components#refresh-list-component" }
  ]} />
</IndexCard>

<IndexCard
  title="Card and Media Display (Editing in Progress)"
  description="Components for displaying card-style content and media files, including dashboard and gallery functions."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Documentation is being improved, please stay tuned...
  </div>
</IndexCard>

<IndexCard
  title="Model Filter"
  href="using-functional-components-in-pages/filter-components"
  description="Advanced filtering component based on data models, supporting simple, complex and free filtering modes."
>
  <LinkGrid links={[
    { text: "Simple Filter", href: "using-functional-components-in-pages/filter-components#simple-filter" },
    { text: "Complex Filter", href: "using-functional-components-in-pages/filter-components#complex-filter" },
    { text: "Free Filter", href: "using-functional-components-in-pages/filter-components#free-filter" },
    { text: "Layout Settings", href: "using-functional-components-in-pages/filter-components#layout-settings" },
    { text: "Filter Usage", href: "using-functional-components-in-pages/filter-components#filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Universal Filter"
  href="using-functional-components-in-pages/filter-components"
  description="Flexible universal filtering component supporting custom field configuration and multiple trigger modes."
>
  <LinkGrid columns={2} links={[
    { text: "Filter Field Configuration", href: "using-functional-components-in-pages/filter-components#filter-field-configuration" },
    { text: "Quick Layout", href: "using-functional-components-in-pages/filter-components#quick-layout" },
    { text: "Show Query/Reset Buttons", href: "using-functional-components-in-pages/filter-components#show-query-reset-buttons" },
    { text: "Condition Change Trigger Query", href: "using-functional-components-in-pages/filter-components#condition-change-trigger-query" },
    { text: "First Load Filter", href: "using-functional-components-in-pages/filter-components#first-load-filter" },
    { text: "Filter Usage", href: "using-functional-components-in-pages/filter-components#filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Calendar"
  href="using-functional-components-in-pages/time-management-components#calendar"
  description="Schedule management and time arrangement component supporting event creation, editing, and view switching."
>
  <LinkGrid columns={2} links={[
    { text: "Data Model Preparation and Component Creation", href: "using-functional-components-in-pages/time-management-components#data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "using-functional-components-in-pages/time-management-components#basic-configuration" },
    { text: "Schedule Type", href: "using-functional-components-in-pages/time-management-components#schedule-type" },
    { text: "Day/Week/Month View Switch", href: "using-functional-components-in-pages/time-management-components#day-week-month-view-switch" },
    { text: "Switch Time", href: "using-functional-components-in-pages/time-management-components#switch-time" },
    { text: "List Display and Search", href: "using-functional-components-in-pages/time-management-components#list-display-and-search" },
    { text: "Drag Schedule", href: "using-functional-components-in-pages/time-management-components#drag-schedule" },
    { text: "Button Configuration", href: "using-functional-components-in-pages/time-management-components#button-configuration" },
    { text: "Refresh Data on First Component Load", href: "using-functional-components-in-pages/time-management-components#refresh-data-on-first-component-load" },
    { text: "New Schedule", href: "using-functional-components-in-pages/time-management-components#new-schedule" },
    { text: "Drag Agenda", href: "using-functional-components-in-pages/time-management-components#drag-agenda" }
  ]} />
</IndexCard>

<IndexCard
  title="Timeline"
  href="using-functional-components-in-pages/time-management-components#timeline"
  description="Timeline display component suitable for showing historical records and process progress."
>
  <LinkGrid links={[
    { text: "Data Model Preparation and Component Creation", href: "using-functional-components-in-pages/time-management-components#timeline-data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "using-functional-components-in-pages/time-management-components#timeline-basic-configuration" },
    { text: "Color Type", href: "using-functional-components-in-pages/time-management-components#color-type" },
    { text: "Position", href: "using-functional-components-in-pages/time-management-components#position" },
    { text: "Button Configuration", href: "using-functional-components-in-pages/time-management-components#timeline-button-configuration" },
    { text: "Refresh Data on First Component Load", href: "using-functional-components-in-pages/time-management-components#timeline-refresh-data-on-first-component-load" }
  ]} />
</IndexCard>

<IndexCard
  title="Gantt Chart"
  href="using-functional-components-in-pages/time-management-components#gantt-chart"
  description="Project management and progress tracking component supporting task dependencies and progress visualization."
>
  <LinkGrid columns={2} links={[
    { text: "Data Model Preparation and Component Creation", href: "using-functional-components-in-pages/time-management-components#gantt-data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "using-functional-components-in-pages/time-management-components#gantt-basic-configuration" },
    { text: "Progress", href: "using-functional-components-in-pages/time-management-components#progress" },
    { text: "Hierarchical Relationship", href: "using-functional-components-in-pages/time-management-components#hierarchical-relationship" },
    { text: "Sequential Relationship", href: "using-functional-components-in-pages/time-management-components#sequential-relationship" },
    { text: "Day/Week/Month/Quarter/Year View Switch", href: "using-functional-components-in-pages/time-management-components#gantt-view-switch" },
    { text: "List Display Fields", href: "using-functional-components-in-pages/time-management-components#list-display-fields" },
    { text: "Floating Layer Display Fields", href: "using-functional-components-in-pages/time-management-components#floating-layer-display-fields" },
    { text: "Button Configuration", href: "using-functional-components-in-pages/time-management-components#gantt-button-configuration" },
    { text: "Refresh Data on First Component Load", href: "using-functional-components-in-pages/time-management-components#gantt-refresh-data-on-first-component-load" },
    { text: "Drag Date Progress", href: "using-functional-components-in-pages/time-management-components#drag-date-progress" },
    { text: "Allow Add Schedule", href: "using-functional-components-in-pages/time-management-components#allow-add-schedule" }
  ]} />
</IndexCard>

<IndexCard
  title="Button Components"
  description="Various types of button components supporting different styles and interactive effects."
>
  <LinkGrid columns={2} links={[
    { text: "Button Component Creation", href: "using-functional-components-in-pages/button-components#button-component-creation" },
    { text: "Button Title/Icon/Type/Size Configuration", href: "using-functional-components-in-pages/button-components#title-icon-type-configuration" },
    { text: "Button Click Event", href: "using-functional-components-in-pages/button-components#click-event" }
  ]} />
</IndexCard>

<IndexCard
  title="Layout Components (Editing in Progress)"
  description="Page layout and container components including popups, tabs and other interface structural elements."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Documentation is being improved, please stay tuned...
  </div>
</IndexCard>

<IndexCard
  title="Approval Components"
  description="UI components related to approval processes, supporting application initiation and approval processing."
>
  <LinkGrid columns={2} links={[
    { text: "Create Initiate Application Component", href: "using-functional-components-in-pages/approval-components#create-initiate-application-component" },
    { text: "Parameter Configuration for Initiate Application", href: "using-functional-components-in-pages/approval-components#parameter-configuration-1" },
    { text: "Post-processing/Refresh Event for Initiate Application", href: "using-functional-components-in-pages/approval-components#post-processing-refresh-event" },
    { text: "Create Approval Process Component", href: "using-functional-components-in-pages/approval-components#create-approval-workflow-component" },
    { text: "Parameter Configuration for Approval Processing", href: "using-functional-components-in-pages/approval-components#parameter-configuration-1" },
    { text: "Keep Historical Approval Records", href: "using-functional-components-in-pages/approval-components#keep-historical-approval-records" },
    { text: "Post-processing/Refresh Event for Approval Processing", href: "using-functional-components-in-pages/approval-components#post-processing-refresh-event-1" }
  ]} />
</IndexCard>

<IndexCard
  title="Payment Components"
  href="using-functional-components-in-pages/payment-components"
  description="Components integrating payment functionality, supporting multiple payment methods and payment flows."
>
  <LinkGrid links={[
    { text: "Create Component", href: "using-functional-components-in-pages/payment-components#payment-component-creation" },
    { text: "Component Functions", href: "using-functional-components-in-pages/payment-components#initiate-payment-function" },
    { text: "Component Event Logic", href: "using-functional-components-in-pages/payment-components#event-logic" },
    { text: "Component Usage", href: "using-functional-components-in-pages/payment-components#component-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Parsing and Import (Editing in Progress)"
  description="Data import and parsing tools supporting batch import of data in Excel and other formats."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Documentation is being improved, please stay tuned...
  </div>
</IndexCard>

<IndexCard
  title="Full Code Components"
  href="fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="Fully customized code components supporting highly personalized function implementation."
>
  <LinkGrid columns={2} links={[
    { text: "Component Interface Specifications", href: "fullcode-ui-components-in-pages/ui-component-interface-specifications" },
    { text: "Component Interface Architecture", href: "fullcode-ui-components-in-pages/ui-component-interface-specifications#component-interface-architecture" },
    { text: "Core Interface Definitions", href: "fullcode-ui-components-in-pages/ui-component-interface-specifications#core-interface-definitions" },
    { text: "Calling Page and Component Functions", href: "fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components" },
    { text: "Emitting Events", href: "fullcode-ui-components-in-pages/emitting-events" },
    { text: "Event Subscription Principles", href: "fullcode-ui-components-in-pages/emitting-events#event-subscription-principles" },
    { text: "Bidirectional Communication", href: "fullcode-ui-components-in-pages/emitting-events#bidirectional-communication-example" },
    { text: "Calling Component Functions in Page Code", href: "fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code" }
  ]} />
</IndexCard>

</div>

<div style={{textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999'}}>
  Click "View More Components" above to collapse
</div>

  </details>
</div>

## AI Large Language Models
Integrate mainstream large language models such as GPT-4, Claude, and Tongyi Qianwen. Support multi-vendor disaster recovery and private deployment to provide applications with AI capabilities including intelligent dialogue, text generation, and code assistance.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Create AI Large Language Model Element"
  href="ai-llm/create-ai-llm"
  description="Learn how to integrate mainstream large language models, configure API keys, implement retry mechanisms, and call LLM functions in your applications."
>
  <LinkGrid links={[
    { text: "Mainstream LLM Vendor Support List", href: "ai-llm/create-ai-llm#mainstream-llm-vendor-support-list" },
    { text: "Create LLM Vendor Element", href: "ai-llm/create-ai-llm#create-llm-vendor-element" },
    { text: "Retry and Backup API Key Mechanism", href: "ai-llm/create-ai-llm#retry-backup-api-key-mechanism" },
    { text: "Private LLM Integration", href: "ai-llm/create-ai-llm#private-llm-integration" }
  ]} />
</IndexCard>

<IndexCard
  title="LLM Input and Output"
  href="ai-llm/llm-input-output"
  description="Understand the input and output configurations of large language models for optimal integration and performance."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Implement multimodal AIGC using LLM functions"
  href="ai-llm/implement-multimodal-aigc"
  description="Discover how to leverage LLM functions to create multimodal AI-generated content with text, images, and other media types."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI Knowledge Base
Transform enterprise documents, manuals, and FAQs into intelligent knowledge bases. Support automatic document processing, intelligent segmentation, and semantic retrieval to enable AI to answer questions accurately based on enterprise knowledge.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Create AI Knowledge Base Element"
  href="knowledge-base/create-knowledge-elements"
  description="Learn how to create the AI Knowledge Base element and understand the principles."
>
  <LinkGrid links={[
    { text: "Create AI Knowledge Base Element", href: "knowledge-base/create-knowledge-elements#create-ai-knowledge-base-element" },
    { text: "Principle Description", href: "knowledge-base/create-knowledge-elements#principle-description" }
  ]} />
</IndexCard>

<IndexCard
  title="Document Management and Settings"
  href="knowledge-base/knowledge-base-document-management"
  description="Manage documents, configure knowledge base settings, run query tests, and tune vectorization."
>
  <LinkGrid columns={2} links={[
    { text: "Document Management", href: "knowledge-base/knowledge-base-document-management" },
    { text: "AI Knowledge Base Settings", href: "knowledge-base/knowledge-base-document-management#ai-knowledge-base-settings" },
    { text: "Query Testing", href: "knowledge-base/knowledge-base-document-management#query-testing" },
    { text: "Vectorization Configuration Description", href: "knowledge-base/knowledge-base-document-management#vectorization-configuration-description" }
  ]} />
</IndexCard>

<IndexCard
  title="Full-text and Semantic Search"
  href="knowledge-base/full-text-and-semantic-search"
  description="Understand how settings participate in the query flow and how to call the knowledge base in backend visual programming."
>
  <LinkGrid links={[
    { text: "How Settings Participate in Query Flow", href: "knowledge-base/full-text-and-semantic-search#how-ai-knowledge-base-settings-participate-in-query-flow" },
    { text: "Call in Backend Visual Programming", href: "knowledge-base/full-text-and-semantic-search#call-ai-knowledge-base-in-backend-visual-programming" }
  ]} />
</IndexCard>

<IndexCard
  title="Use AI Knowledge Base in AI Agent"
  href="knowledge-base/integrate-knowledge-base-into-agent"
  description="Integrate the AI Knowledge Base into Agent for RAG."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="AI Knowledge Base API"
  href="knowledge-base/ai-knowledge-base-api"
  description="Programmatic access to the AI Knowledge Base."
>
  <LinkGrid links={[
    { text: "Programming Interface Overview", href: "knowledge-base/ai-knowledge-base-api#ai-knowledge-base-programming-interface" },
    { text: "query", href: "knowledge-base/ai-knowledge-base-api#query-testing" },
    { text: "addDocumentByBusinessId", href: "knowledge-base/ai-knowledge-base-api#adddocumentbybusinessid" },
    { text: "deleteDocumentByBusinessId", href: "knowledge-base/ai-knowledge-base-api#deletedocumentbybusinessid" },
    { text: "queryKeywords", href: "knowledge-base/ai-knowledge-base-api#querykeywords" }
  ]} />
</IndexCard>

<IndexCard
  title="Vector Database Standalone Deployment"
  href="knowledge-base/vector-database-standalone-deployment"
  description="The intelligent storage engine for enterprise knowledge. Convert text into vector data to achieve semantic-level precise search."
>
  <LinkGrid links={[
    { text: "Chroma Vector Database", href: "knowledge-base/vector-database-standalone-deployment#chroma-standalone-deployment" },
    { text: "Local Vector Database Configuration", href: "knowledge-base/vector-database-standalone-deployment#local-development-config" },
    { text: "Remote Vector Database Connection", href: "knowledge-base/vector-database-standalone-deployment#connect-to-standalone-chroma" },
    { text: "Vector Database Programming Interface", href: "knowledge-base/vector-database-standalone-deployment#vector-database-programming-interface" }
  ]} />
</IndexCard>

</div>

## AI Agent
Intelligent agents with reasoning and action capabilities. Through prompts and tool configuration, enable AI to autonomously analyze problems, formulate solutions, and execute tasks to handle complex business scenarios.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating AI Agent"
  href="ai-agent/create-ai-agent"
  description="Learn how to create ReActAgent, configure system prompts, select large language models, write descriptions, and configure runtime state storage."
>
  <LinkGrid columns={2} links={[
    { text: "Creating ReActAgent", href: "ai-agent/create-ai-agent#create-react-agent" },
    { text: "Write System Prompt", href: "ai-agent/create-ai-agent#write-system-prompt" },
    { text: "Select Model and Configure Parameters", href: "ai-agent/create-ai-agent#select-model-and-configure-parameters" },
    { text: "Write Agent Description", href: "ai-agent/create-ai-agent#write-agent-description" },
    { text: "Configure Runtime State Storage", href: "ai-agent/create-ai-agent#configure-runtime-state-storage" },
    { text: "Memory Storage", href: "ai-agent/create-ai-agent#memory-storage" },
    { text: "Database Storage", href: "ai-agent/create-ai-agent#database-storage" },
    { text: "Modify Agent in Source Code Mode", href: "ai-agent/create-ai-agent#modify-agent-in-source-code-mode" },
    { text: "Custom Callback Processor", href: "ai-agent/create-ai-agent#custom-callback-processor" }
  ]} />
</IndexCard>

<IndexCard
  title="Tools in Agent"
  href="ai-agent/agent-tools"
  description="Learn how to add and manage various tools in Agent, including model functions, service functions, MCP services, external APIs, and page functions."
>
  <LinkGrid columns={2} links={[
    { text: "Agent Call Model Functions", href: "ai-agent/agent-tools#agent-call-model-functions" },
    { text: "Agent Call Service Functions", href: "ai-agent/agent-tools#agent-calling-service-functions" },
    { text: "Agent Call MCP Services", href: "ai-agent/agent-tools#agent-call-mcp-service" },
    { text: "Convert MCP Config to Environment Variables", href: "ai-agent/agent-tools#convert-mcp-config-to-environment-variables" },
    { text: "Agent Call External APIs", href: "ai-agent/agent-tools#agent-call-external-api" },
    { text: "Agent Call Page Functions", href: "ai-agent/agent-tools#agent-call-page-functions" },
    { text: "Tool Function Management", href: "ai-agent/agent-tools#tool-function-management" },
    { text: "Enable/Disable Tool Functions", href: "ai-agent/agent-tools#enable-disable-tool-functions" },
    { text: "Tool Function Call Pre/Post Event Triggering", href: "ai-agent/agent-tools#tool-function-call-pre-post-event-triggering" },
    { text: "Manual Confirmation Before Tool Execution", href: "ai-agent/agent-tools#manual-confirmation-before-tool-execution" },
    { text: "Restrict User Roles for Tool Calls", href: "ai-agent/agent-tools#restrict-user-roles-for-tool-calls" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent Input and Output"
  href="ai-agent/agent-input-output"
  description="Master Agent's input variable configuration, output result settings, streaming output, and various calling methods."
>
  <LinkGrid columns={2} links={[
    { text: "Configure Input Variables", href: "ai-agent/agent-input-output#configure-input-variables" },
    { text: "Use Variables in Prompts", href: "ai-agent/agent-input-output#use-variables-in-prompt" },
    { text: "Configure Output Results", href: "ai-agent/agent-input-output#configure-output-results" },
    { text: "Agent Streaming Output", href: "ai-agent/agent-input-output#agent-streaming-output" },
    { text: "Call Agent in Frontend Functions", href: "ai-agent/agent-input-output#call-agent-in-frontend-functions" },
    { text: "Call Agent in Backend Service Functions", href: "ai-agent/agent-input-output#call-agent-in-backend-service-functions" },
    { text: "Test Agent in Page Assistant", href: "ai-agent/agent-input-output#test-agent-in-page-assistant" }
  ]} />
</IndexCard>

<IndexCard
  title="Using Knowledge Base for Retrieval-Augmented Generation (RAG)"
  href="ai-agent/agent-knowledge-base"
  description="Learn how to integrate knowledge bases with Agent to implement RAG functionality for enhanced response accuracy."
>
  <LinkGrid links={[
    { text: "Adding Knowledge Bases in Agent", href: "ai-agent/agent-knowledge-base#integrate-knowledge-base-rag" }
  ]} />
</IndexCard>

<IndexCard
  title="Implement Single-Task Intelligent Agent with Agent"
  href="ai-agent/single-task-intelligent-agent"
  description="Learn how to use Agent to implement specialized single-task intelligent agents for optimized business scenario handling."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Agent API Exposure"
  href="ai-agent/agent-api-exposure"
  description="Expose Agent capabilities through API interfaces for external system integration."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI Assistant
Visual intelligent workflow engine. Orchestrate business processes through drag-and-drop nodes, combining AI decision-making and human-machine interaction to achieve intelligent automation in scenarios such as customer service, approval, and data processing.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="创建AI助理元素"
  href="ai-assitant/create-ai-assistant"
  description="学习如何创建AI助理元素，配置工作流、节点类型和事件处理，实现智能业务流程自动化。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="流程编排与节点配置"
  href="ai-assitant/process-orchestration-node-configuration"
  description="深入了解AI助理流程编排技术和详细的节点配置方法。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="AI助理的输入与输出"
  href="ai-assitant/ai-assistant-input-output"
  description="理解AI助理的输入输出配置和数据处理方法。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="AI助理的API开放"
  href="ai-assitant/ai-assistant-api-integration"
  description="通过API接口开放AI助理能力，实现与外部系统的集成。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 敬请期待...
  </div>
</IndexCard>
</div>

## Data Modeling
Design a powerful data foundation for your application. Create data tables, design field types, and establish relationships through visual methods without complex SQL knowledge. Make data management easy and efficient.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard  title="Managing Database Connections"
  href="data-modeling/manage-database-connections"
  description="Configure and manage multiple database connections, supporting multi-data source application development."
>
  <LinkGrid links={[
    { text: "Create Database Connection", href: "data-modeling/manage-database-connections#create-database-connection" },
    { text: "Multi-database Connection Management", href: "data-modeling/manage-database-connections#multi-database-connection-management" },
    { text: "Database Connection Security Configuration", href: "data-modeling/manage-database-connections#database-connection-security-configuration" },
    { text: "Connection Test and Troubleshooting", href: "data-modeling/manage-database-connections#connection-test-and-troubleshooting" }
  ]} />
</IndexCard>

<IndexCard
  title="Supported Database Vendors"
  href="data-modeling/supported-database-vendors"
  description="Learn about various database types and connection configurations supported by JitAi."
>
  <LinkGrid links={[
    { text: "Scenario Selection Suggestions", href: "data-modeling/supported-database-vendors#scenario-selection-suggestions" },
    { text: "Cloud Vendor Compatibility", href: "data-modeling/supported-database-vendors#cloud-vendor-compatibility" },
    { text: "Database Element Usage", href: "data-modeling/supported-database-vendors#database-element-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Table Model"
  href="data-modeling/data-table-model"
  description="Basic structure of application data, learn how to create and configure data tables, design field types and constraints."
>
  <LinkGrid links={[
    { text: "Create Data Table Model", href: "data-modeling/data-table-model" },
    { text: "Design Table Fields and Data Types", href: "data-modeling/data-table-model#design-table-fields-and-data-types" },
    { text: "Configure Table Index Optimization", href: "data-modeling/data-table-model#configure-table-index-optimization" }
  ]} />
</IndexCard>

<IndexCard
  title="Creating Tables from Existing Database Schema"
  href="data-modeling/create-data-table-from-existing-tables"
  description="Quickly create data table elements from existing database tables, supporting rapid model generation."
>
  <LinkGrid links={[
    { text: "Creating Tables from Existing Database Schema", href: "data-modeling/create-data-table-from-existing-tables" },
  ]} />
</IndexCard>

<IndexCard
  title="Built-in Data Management Tools"
  href="data-modeling/built-in-data-management-tools"
  description="Utilize built-in data management tools for efficient data operations and administration."
>
  <LinkGrid links={[
    { text: "Built-in Data Management Tools", href: "data-modeling/built-in-data-management-tools" },
  ]} />
</IndexCard>

<IndexCard
  title="Creating Data Model Functions"
  href="data-modeling/create-data-model-functions"
  description="Design and implement custom data model functions to extend data processing capabilities."
>
  <LinkGrid links={[
    { text: "Creating Data Model Functions", href: "data-modeling/create-data-model-functions" },
  ]} />
</IndexCard>

<IndexCard
  title="Aggregate Table Model"
  href="data-modeling/aggregate-table-model"
  description="Multi-table data integration and statistical analysis, supporting complex data aggregation and calculation functions."
>
  <LinkGrid columns={2} links={[
    { text: "Create Aggregate Table Model", href: "data-modeling/aggregate-table-model" },
    { text: "Multi-table Data Merge", href: "data-modeling/aggregate-table-model#multi-table-data-merge" },
    { text: "Multi-table Horizontal Connection", href: "data-modeling/aggregate-table-model#multi-table-horizontal-connection" },
    { text: "Group Aggregate Statistics", href: "data-modeling/aggregate-table-model#group-aggregate-statistics" },
    { text: "Extend Custom Calculation Fields", href: "data-modeling/aggregate-table-model#extend-custom-calculation-fields" },
    { text: "Aggregate Then Filter", href: "data-modeling/aggregate-table-model#aggregate-then-filter" },
    { text: "Filter Then Aggregate (Recommended)", href: "data-modeling/aggregate-table-model#aggregate-then-filter" }
  ]} />
</IndexCard>

<IndexCard
  title="Extended Table Model"
  href="data-modeling/extended-table-model"
  description="Data extension based on existing tables, implementing business field extension and multi-table data integration through association with other data tables."
>
  <LinkGrid columns={2} links={[
    { text: "Extended Table Creation", href: "data-modeling/extended-table-model" },
    { text: "Connection Design", href: "data-modeling/extended-table-model#connection-design" },
    { text: "Set Baseline Table Filter Conditions", href: "data-modeling/extended-table-model#set-baseline-table-filter-conditions" },
    { text: "Add Data Table", href: "data-modeling/extended-table-model#add-data-table" },
    { text: "Real-time Edit Statistics Table Configuration", href: "data-modeling/extended-table-model#real-time-edit-statistics-table-configuration" },
    { text: "Field Statistics", href: "data-modeling/extended-table-model#field-statistics" },
    { text: "Add Formula Field", href: "data-modeling/extended-table-model#add-formula-field" },
    { text: "Modify Field Alias", href: "data-modeling/extended-table-model#modify-field-alias" },
    { text: "Function Design", href: "data-modeling/extended-table-model#function-design" },
    { text: "Create Function", href: "data-modeling/extended-table-model#create-function" },
    { text: "Source Code View Edit", href: "data-modeling/extended-table-model#source-code-view-edit" }
  ]} />
</IndexCard>

<IndexCard
  title="Using Data Models in Pages and Functions"
  href="data-modeling/calling-data-models-in-pages-and-functions"
  description="Learn how to effectively use data models in frontend pages and backend function logic for data operations."
>
  <LinkGrid columns={2} links={[
    { text: "Built-in Model Functions", href: "data-modeling/calling-data-models-in-pages-and-functions#built-in-model-functions" },
    { text: "Calling Data Models in Pages", href: "data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-pages" },
    { text: "Calling Data Models in Functions", href: "data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Object Model"
  href="data-modeling/data-object-model"
  description="Data structure designed specifically for full-code development, similar to DTO, used for structured data expression and transmission in business logic."
>
  <LinkGrid links={[
    { text: "Data Object Model Creation", href: "data-modeling/data-object-model#data-object-model-creation" },
    { text: "Data Object Model Usage", href: "data-modeling/data-object-model#data-object-model-usage" },
    { text: "Custom Field", href: "data-modeling/data-object-model#custom-field" },
    { text: "Model Function Override", href: "data-modeling/data-object-model#model-function-override" },
    { text: "Define New Function", href: "data-modeling/data-object-model#define-new-function" }
  ]} />
</IndexCard>

<IndexCard
  title="Integrating Data Models with AI Agents"
  href="data-modeling/calling-data-models-in-ai-agent"
  description="Integrate data models with AI Agent systems to enable intelligent data processing and decision making."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Transaction Management
Ensure data consistency and reliability in complex business operations. Master database transaction control mechanisms, implement atomic operations, and handle concurrent access scenarios effectively.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Transaction Management"
  href="transaction-management"
  description="Database transaction control and consistency management to ensure reliability of data operations."
>
  <LinkGrid links={[
    { text: "Default Transaction Management Mechanism", href: "transaction-management#default-transaction-management-mechanism" },
    { text: "Manual Transaction Commit/Rollback", href: "transaction-management#manual-transaction-commit-rollback" },
    { text: "Transaction Decorator", href: "transaction-management#transaction-decorator" }
  ]} />
</IndexCard>

</div>

## User and Permission Management
Build a secure and reliable user system. Support multiple login methods, flexible organizational structure design, and fine-grained permission allocation. Enable different users to perform their respective duties while ensuring data security and operational compliance.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Organizational Structure"
  description="Enterprise organizational structure management, including department, position and personnel hierarchical relationship configuration."
>
  <LinkGrid links={[
    { text: "Standard Organization", href: "user-and-permission/organizational-structure#standard-organization" },
    { text: "Allow New Registered User Join", href: "user-and-permission/organizational-structure#allow-new-registered-user-join" },
    { text: "DingTalk Custom Organization", href: "user-and-permission/organizational-structure#dingtalk-custom-organization" },
    { text: "WeChat Work Custom Organization", href: "user-and-permission/organizational-structure#wechat-work-custom-organization" },
    { text: "Contact Management Entry", href: "user-and-permission/organizational-structure#contact-management-entry" },
    { text: "DingTalk Custom Organization", href: "user-and-permission/organizational-structure#dingtalk-custom-organization" },
    { text: "WeChat Work Custom Organization", href: "user-and-permission/organizational-structure#wechat-work-custom-organization" },
    { text: "Department Member Search", href: "user-and-permission/organizational-structure#department-member-search" },
    { text: "Set Organization Leader", href: "user-and-permission/organizational-structure#set-organization-leader" },
    { text: "Create Department", href: "user-and-permission/organizational-structure#create-department" },
    { text: "Add Member", href: "user-and-permission/organizational-structure#add-member" },
    { text: "Import Member", href: "user-and-permission/organizational-structure#import-member" },
    { text: "Export Member", href: "user-and-permission/organizational-structure#export-member" },
    { text: "Adjust Department", href: "user-and-permission/organizational-structure#adjust-department" },
    { text: "Member Resignation", href: "user-and-permission/organizational-structure#member-resignation" },
    { text: "Create Role", href: "user-and-permission/organizational-structure#create-role" },
    { text: "Create Role Group", href: "user-and-permission/organizational-structure#standard-organization" },
    { text: "Manage Role Member", href: "user-and-permission/organizational-structure#manage-role-member" },
    { text: "Sync DingTalk Organization Structure", href: "user-and-permission/organizational-structure#sync-dingtalk-organization-structure" },
    { text: "Sync WeChat Work Organization Structure", href: "user-and-permission/organizational-structure#sync-wechat-work-organization-structure" },
  ]} />
</IndexCard>

<IndexCard
  title="Login Authentication"
  description="User identity verification and login method configuration, supporting multiple authentication modes."
>
  <LinkGrid links={[
    { text: "Login Method Creation", href: "user-and-permission/login-authentication#login-method-creation" },
    { text: "Account Password Login", href: "user-and-permission/login-authentication#account-password-login" },
    { text: "Mobile Phone Login", href: "user-and-permission/login-authentication#mobile-phone-login" },
    { text: "DingTalk Custom QR Login", href: "user-and-permission/login-authentication#dingtalk-custom-qr-login" },
    { text: "WeChat Work Custom QR Login", href: "user-and-permission/login-authentication#wechat-work-custom-qr-login" },
    { text: "WeChat Login", href: "user-and-permission/login-authentication#wechat-login" },
    { text: "WeChat Official Account Login", href: "user-and-permission/login-authentication#wechat-official-account-login" },
    { text: "WeChat Mini Program Login", href: "user-and-permission/login-authentication#wechat-mini-program-login" },
    { text: "Github Login", href: "user-and-permission/login-authentication#github-login" },
    { text: "Google Login", href: "user-and-permission/login-authentication#google-login" },
  ]} />
</IndexCard>

<IndexCard
  title="Role and Portal Menu Permissions"
  href="user-and-permission/role-portal-menu-permissions"
  description="Application role definition and permission allocation, implementing fine-grained access control."
>
  <LinkGrid columns={2} links={[
    { text: "Built-in Three Application Roles", href: "user-and-permission/role-portal-menu-permissions#built-in-three-application-roles" },
    { text: "Anonymous User", href: "user-and-permission/role-portal-menu-permissions#anonymous-user" },
    { text: "Developer", href: "user-and-permission/role-portal-menu-permissions#developer" },
    { text: "Administrator", href: "user-and-permission/role-portal-menu-permissions#administrator" },
    { text: "Create Application Role", href: "user-and-permission/role-portal-menu-permissions#create-application-role" },
    { text: "Application Role Permission Configuration", href: "user-and-permission/role-portal-menu-permissions#application-role-permission-configuration" },
    { text: "Specify Accessible Portals and Menus", href: "user-and-permission/role-portal-menu-permissions#specify-accessible-portals-and-menus" },
    { text: "Manage Application Role Members in Developer Portal", href: "user-and-permission/role-portal-menu-permissions#manage-application-role-members-in-developer-portal" },
    { text: "Portal-level Data Operation Type and Scope Control", href: "user-and-permission/role-portal-menu-permissions#portal-level-data-operation-type-and-scope-control" },
    { text: "Component Button Permission Control", href: "user-and-permission/role-portal-menu-permissions#component-button-permission-control" },
    { text: "Component Data Field Access Control", href: "user-and-permission/role-portal-menu-permissions#component-data-field-access-control" },
    { text: "Hierarchical Management of Multiple Application Roles", href: "user-and-permission/role-portal-menu-permissions#hierarchical-management-of-multiple-application-roles" },
    { text: "Application Role Member Management", href: "user-and-permission/role-portal-menu-permissions#application-role-member-management" },
    { text: "Member Addition and Removal", href: "user-and-permission/role-portal-menu-permissions#member-addition-and-removal" },
    { text: "Member Management Scope Settings in Org Structure", href: "user-and-permission/role-portal-menu-permissions#member-management-scope-settings-in-org-structure" }
  ]} />
</IndexCard>

<IndexCard
  title="Roles and Business Element Permissions"
  href="user-and-permission/roles-and-business-element-permissions"
  description="Advanced role-based permission control for business elements, data models, and functional components."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Agent Tool Permission Control"
  href="user-and-permission/agent-tool-permission-control"
  description="Configure and manage permission control for AI Agent tools, ensuring secure and controlled agent operations."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Business Logic Development
Empower applications with powerful business processing capabilities. Handle complex business rules through visual programming, respond to user operations, and execute background tasks. Make logic writing as intuitive and easy to understand as building blocks.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Service Elements"
  href="business-logic-development/creating-service-elements"
  description="Backend business logic implementation, encapsulating reusable business functions through service elements, providing API interfaces and data processing services."
>
  <LinkGrid columns={2} links={[
    { text: "Create Service Elements", href: "business-logic-development/creating-service-elements#create-service-elements" },
    { text: "Create Service Functions", href: "business-logic-development/creating-service-elements#create-service-functions" },
    { text: "Edit Service Functions in Source Code Mode", href: "business-logic-development/creating-service-elements#edit-service-functions-source-code-mode" },
    { text: "Add New Dependency Library", href: "business-logic-development/creating-service-elements#add-new-dependency-library" },
    { text: "Where Service Functions Are Used", href: "business-logic-development/creating-service-elements#where-service-functions-are-used" },
    { text: "Help AI Understand Service Functions", href: "business-logic-development/creating-service-elements#help-ai-understand-service-functions" },
    { text: "Use Cross-App Service Elements to Call Authorized Interfaces", href: "business-logic-development/creating-service-elements#use-cross-app-service-elements-to-call-authorized-interfaces" },
    { text: "Create Cross-App Service Elements", href: "business-logic-development/creating-service-elements#create-cross-app-service-elements" },
    { text: "Use Cross-App Service Elements in Functions", href: "business-logic-development/creating-service-elements#use-cross-app-service-elements-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Other Elements in Service Functions"
  href="business-logic-development/calling-other-elements-in-service-functions"
  description="Learn how to call other elements from service functions, including models, other services, external APIs, and system components for comprehensive business logic implementation."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Service Elements Usage Scenarios"
  href="business-logic-development/service-elements-usage-scenarios"
  description="Explore practical usage scenarios and best practices for service elements across different business contexts and application architectures."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Background Tasks"
  href="business-logic-development/background-tasks"
  description="Scheduled tasks and asynchronous processing, supporting complex background business processes."
>
  <LinkGrid columns={2} links={[
    { text: "Task Creation", href: "business-logic-development/background-tasks#task-creation" },
    { text: "Scheduled Tasks", href: "business-logic-development/background-tasks#scheduled-tasks" },
    { text: "Date Field Tasks", href: "business-logic-development/background-tasks#date-field-tasks" },
    { text: "General Configuration Items", href: "business-logic-development/background-tasks#general-configuration-items" },
    { text: "Task Execution Function Development", href: "business-logic-development/background-tasks#task-execution-function-development" },
    { text: "Execution Record View", href: "business-logic-development/background-tasks#execution-record-view" },
    { text: "Source Code Mode", href: "business-logic-development/background-tasks#source-code-mode" }
  ]} />
</IndexCard>

<IndexCard
  title="Event Handling"
  href="business-logic-development/event-handling"
  description="System event monitoring and processing mechanism, implementing reactive business logic."
>
  <LinkGrid columns={2} links={[
    { text: "Event Creation", href: "business-logic-development/event-handling#event-create" },
    { text: "Model Events", href: "business-logic-development/event-handling#model-events" },
    { text: "Approval Events", href: "business-logic-development/event-handling#approval-events" },
    { text: "Custom Events", href: "business-logic-development/event-handling#custom-events" },
    { text: "AI-Assistant Events", href: "business-logic-development/event-handling#ai-assistant-events" },
    { text: "Agent Tool Call Events", href: "business-logic-development/event-handling#agent-tool-call-events" },
    { text: "Service Function Replace Event Internal Function", href: "business-logic-development/event-handling#service-function-replace-event-internal-function" },
    { text: "Event Enable", href: "business-logic-development/event-handling#event-enable" },
    { text: "Event Sync/Async Execution", href: "business-logic-development/event-handling#event-sync-async-execution" },
    { text: "Event Execution Records", href: "business-logic-development/event-handling#event-execution-records" },
    { text: "Full Code View/Edit", href: "business-logic-development/event-handling#full-code-view-edit" }
  ]} />
</IndexCard>

</div>

## Approval Process
Make enterprise approval processes efficient and orderly. Design flowcharts through drag-and-drop, configure approvers and conditions, and automate process flow. Say goodbye to tedious paper approvals and embrace digital office work.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Approval Process Basic Configuration"
  href="approval-workflow/approval-workflow-basic-configuration"
  description="Creation and basic settings of approval processes, including process node configuration and path design."
>
  <LinkGrid columns={2} links={[
    { text: "Create Process", href: "approval-workflow/approval-workflow-basic-configuration#create-process" },
    { text: "Drag Process Node", href: "approval-workflow/approval-workflow-basic-configuration#drag-process-node" },
    { text: "Approval Process Default Page", href: "approval-workflow/approval-workflow-basic-configuration#approval-workflow-default-page" },
    { text: "Other Process Configuration", href: "approval-workflow/approval-workflow-basic-configuration#other-process-configuration" },
    { text: "Sync Approval Info to Data Table Model", href: "approval-workflow/approval-workflow-basic-configuration#sync-approval-info-to-data-table-model" },
    { text: "Sync to Third-party Approval Todo", href: "approval-workflow/approval-workflow-basic-configuration#sync-to-third-party-approval-todo" },
    { text: "Comment Function", href: "approval-workflow/approval-workflow-basic-configuration#comment-function" },
    { text: "Share", href: "approval-workflow/approval-workflow-basic-configuration#share" },
    { text: "Print Approval Form", href: "approval-workflow/approval-workflow-basic-configuration#print-approval-form" },
    { text: "Reuse Other Approval Processes", href: "approval-workflow/approval-workflow-basic-configuration#reuse-other-approval-workflowes" }
  ]} />
</IndexCard>

<IndexCard
  title="Start Node Configuration"
  href="approval-workflow/start-node-configuration"
  description="Configuration of approval process start node, defining conditions and rules for application initiation."
>
  <LinkGrid columns={2} links={[
    { text: "Process Cancellation Function", href: "approval-workflow/start-node-configuration#process-cancellation-function" },
    { text: "Approval Reminder", href: "approval-workflow/start-node-configuration#approval-reminder" },
    { text: "Approval Draft", href: "approval-workflow/start-node-configuration#approval-draft" },
    { text: "Message Notification", href: "approval-workflow/start-node-configuration#anchor-414" },
    { text: "Pages Used by Current Node", href: "approval-workflow/start-node-configuration#pages-used-by-current-node" },
    { text: "Summary Display", href: "approval-workflow/start-node-configuration#summary-display" },
    { text: "Field View Edit Permissions", href: "approval-workflow/start-node-configuration#field-view-edit-permissions" },
    { text: "Layout Control Permissions", href: "approval-workflow/start-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Node Configuration"
  href="approval-workflow/approval-node-configuration"
  description="Detailed configuration of approval links, including approver settings and approval rules."
>
  <LinkGrid columns={2} links={[
    { text: "Approver Settings", href: "approval-workflow/approval-node-configuration#approver-settings" },
    { text: "Approval Flow Rules", href: "approval-workflow/approval-node-configuration#approval-flow-rules" },
    { text: "Approval Process Rules", href: "approval-workflow/approval-node-configuration#approval-workflow-rules" },
    { text: "Approval Extended Function Configuration", href: "approval-workflow/approval-node-configuration#approval-extended-function-configuration" },
    { text: "Deduplication Approval", href: "approval-workflow/approval-node-configuration#deduplication-approval" },
    { text: "Time-limited Processing", href: "approval-workflow/approval-node-configuration#time-limited-processing" },
    { text: "Approval Draft", href: "approval-workflow/approval-node-configuration#approval-draft" },
    { text: "Approval Feedback", href: "approval-workflow/approval-node-configuration#approval-feedback" },
    { text: "Handwritten Signature", href: "approval-workflow/approval-node-configuration#handwritten-signature" },
    { text: "Allow Batch Approval", href: "approval-workflow/approval-node-configuration#allow-batch-approval" },
    { text: "Message Notification", href: "approval-workflow/approval-node-configuration#message-notification" },
    { text: "SMS Notification", href: "approval-workflow/approval-node-configuration#sms-notification" },
    { text: "Approval Page and Permission Control", href: "approval-workflow/approval-node-configuration#approval-page-permission-control" },
    { text: "Pages Used by Current Node", href: "approval-workflow/approval-node-configuration#pages-used-by-current-node" },
    { text: "Summary Display", href: "approval-workflow/approval-node-configuration#summary-display" },
    { text: "Field Permission", href: "approval-workflow/approval-node-configuration#fieldpermission" },
    { text: "Layout Control Permissions", href: "approval-workflow/approval-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="Special Node Configuration"
  href="approval-workflow/special-node-configuration"
  description="Configuration methods for special process nodes such as condition nodes and parallel nodes."
>
  <LinkGrid columns={2} links={[
    { text: "CC Node", href: "approval-workflow/special-node-configuration#cc-node" },
    { text: "CC Recipients", href: "approval-workflow/special-node-configuration#sms-notification" },
    { text: "SMS Notification", href: "approval-workflow/special-node-configuration#sms-notification" },
    { text: "Pages Used by Current Node", href: "approval-workflow/special-node-configuration#pages-used-by-current-node" },
    { text: "Field Permission", href: "approval-workflow/special-node-configuration#fieldpermission" },
    { text: "Layout Control Permissions", href: "approval-workflow/special-node-configuration#layout-control-permissions" },
    { text: "Branch Node", href: "approval-workflow/special-node-configuration#branch-node" },
    { text: "Parallel Node", href: "approval-workflow/special-node-configuration#parallel-node" },
    { text: "Sub-process Node", href: "approval-workflow/special-node-configuration#sub-process-node" },
    { text: "Sub-process Name", href: "approval-workflow/special-node-configuration#sub-process-name" },
    { text: "Sub-process Initiator", href: "approval-workflow/special-node-configuration#sub-process-initiator" },
    { text: "Sub-process Flow Rules", href: "approval-workflow/special-node-configuration#sub-process-flow-rules" },
    { text: "When Main Process Flows to Sub-process", href: "approval-workflow/special-node-configuration#when-main-process-flows-to-sub-process" },
    { text: "Sub-process Post-flow Function Design", href: "approval-workflow/special-node-configuration#sub-process-post-flow-function-design" },
    { text: "Update Main Process Data When Single Sub-process Ends", href: "approval-workflow/special-node-configuration#update-main-process-data-single-sub-process-end" },
    { text: "Update Main Process Data When All Sub-processes End", href: "approval-workflow/special-node-configuration#update-main-process-data-all-sub-processes-end" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Page Customization"
  href="approval-workflow/approval-page-customization"
  description="Customize approval interface and user experience to improve approval efficiency."
>
  <LinkGrid links={[
    { text: "Approval Page Advanced Customization", href: "approval-workflow/approval-page-customization#approval-page-advanced-customization" },
    { text: "Approval Page Types", href: "approval-workflow/approval-page-customization#approval-page-types" },
    { text: "Custom Page Creation Method", href: "approval-workflow/approval-page-customization#custom-page-creation-method" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Process Usage"
  href="approval-workflow/approval-workflow-usage"
  description="Practical application and operation guide of approval process, including initiating and processing approvals."
>
  <LinkGrid links={[
    { text: "Initiate Application", href: "approval-workflow/approval-workflow-usage#initiate-application" },
    { text: "Todo Center", href: "approval-workflow/approval-workflow-usage#todo-center" },
    { text: "Detail Page", href: "approval-workflow/approval-workflow-usage#detail-page" },
    { text: "Delegate to Others Processing", href: "approval-workflow/approval-workflow-usage#delegate-to-others-processing" },
    { text: "Approval Process Management Page", href: "approval-workflow/approval-workflow-usage#approval-workflow-management-page" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Business Logic Elements in Approval Process"
  href="approval-workflow/calling-business-logic-elements-in-approval-workflow"
  description="Learn how to call business logic elements within approval processes to implement complex business rules and automated decisions."
>
  <LinkGrid links={[
    { text: "Calling Business Logic Through Approval Events", href: "approval-workflow/calling-business-logic-elements-in-approval-workflow#calling-business-logic-through-approval-events" },
    { text: "Function Processing in Subprocesses", href: "approval-workflow/calling-business-logic-elements-in-approval-workflow#function-processing-in-subprocesses" }
  ]} />
</IndexCard>

<IndexCard
  title="Integrating AI in Approval Process"
  href="approval-workflow/integrating-ai-in-approval-workflow"
  description="Integrate artificial intelligence capabilities into approval processes to achieve intelligent routing, automated review, and smart decision making."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## File Processing
Easily handle various file requirements in applications. Support file upload and download in multiple formats, dynamically generate Word and Excel documents, making file operations simple and convenient.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="File Storage"
  href="file-processing/file-storage"
  description="File upload, storage and management system supporting multiple storage methods and file operations."
>
  <LinkGrid columns={2} links={[
    { text: "Local Storage Configuration", href: "file-processing/file-storage#local-storage-configuration" },
    { text: "Add Local Storage", href: "file-processing/file-storage#add-local-storage" },
    { text: "Specify Disk Storage Directory", href: "file-processing/file-storage#specify-disk-storage-directory" },
    { text: "Cloud Storage Service Configuration", href: "file-processing/file-storage#cloud-storage-service-configuration" },
    { text: "Alibaba Cloud OSS", href: "file-processing/file-storage#aliyun-oss" },
    { text: "China Mobile Cloud EOS", href: "file-processing/file-storage#china-mobile-cloud-eos" },
    { text: "MinIO", href: "file-processing/file-storage#minio" },
    { text: "Qiniu Cloud", href: "file-processing/file-storage#aliyun-oss" },
    { text: "Use Environment Variables to Prevent Config Info Leak", href: "file-processing/file-storage#prevent-config-info-leak-with-env-variables" },
    { text: "Set Application Default Storage Service", href: "file-processing/file-storage#set-application-default-storage-service" },
    { text: "Call File Upload in Frontend Code", href: "file-processing/file-storage#call-file-upload-in-frontend-code" }
  ]} />
</IndexCard>

<IndexCard
  title="File Templates"
  href="file-processing/file-templates"
  description="Document template generation and processing, supporting dynamic content filling and format conversion."
>
  <LinkGrid columns={2} links={[
    { text: "Word Template", href: "file-processing/file-templates#word-template" },
    { text: "Create Word Template", href: "file-processing/file-templates#create-word-template" },
    { text: "Create Word Template Variables", href: "file-processing/file-templates#create-word-template-variables" },
    { text: "Use Template Variables in Word", href: "file-processing/file-templates#use-template-variables-in-word" },
    { text: "Excel Template", href: "file-processing/file-templates#excel-template" },
    { text: "Create Excel Template", href: "file-processing/file-templates#create-excel-template" },
    { text: "Create Excel Template Variables", href: "file-processing/file-templates#create-excel-template-variables" },
    { text: "Use Template Variables in Excel", href: "file-processing/file-templates#use-template-variables-in-excel" },
    { text: "Template Variable Style Description", href: "file-processing/file-templates#template-variable-style-description" },
    { text: "Text Style", href: "file-processing/file-templates#text-style" },
    { text: "Numeric Style", href: "file-processing/file-templates#numeric-style" },
    { text: "Date Time Style", href: "file-processing/file-templates#date-time-style" },
    { text: "Multi-value Style (Complex Types)", href: "file-processing/file-templates#multi-value-complex-types" }
  ]} />
</IndexCard>

<IndexCard
  title="Generating and Printing Files Using File Templates"
  href="file-processing/generating-and-printing-files-using-file-templates"
  description="Learn how to use file templates to generate and print documents programmatically, including dynamic content population and output formatting."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## External API Integration
Connect your application to the broader world. Easily integrate third-party APIs, integrate WeChat Pay and Alipay, and configure SMS notification services. Expand application capability boundaries to meet more business scenarios.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Universal External API Elements"
  href="third-party-integration/external-api"
  description="Third-party API service integration, expanding application functionality and data sources."
>
  <LinkGrid columns={2} links={[
    { text: "External API Creation", href: "third-party-integration/external-api#api-interface-management" },
    { text: "Public Configuration", href: "third-party-integration/external-api#public-configuration" },
    { text: "Access Domain", href: "third-party-integration/external-api#public-configuration" },
    { text: "Public Request Headers", href: "third-party-integration/external-api#public-request-headers" },
    { text: "Request Preprocessing", href: "third-party-integration/external-api#request-preprocessing" },
    { text: "Response Postprocessing", href: "third-party-integration/external-api#response-postprocessing" },
    { text: "API Interface Management", href: "third-party-integration/external-api#api-interface-management" },
    { text: "API Interface Grouping", href: "third-party-integration/external-api#api-interface-grouping" },
    { text: "API Interface", href: "third-party-integration/external-api#api-interface" },
    { text: "API Interface Testing and Calling", href: "third-party-integration/external-api#api-interface-testing" }
  ]} />
</IndexCard>

<IndexCard
  title="Built-in Payment Service"
  href="third-party-integration/payment-service"
  description="Integrate mainstream payment platforms to implement online payment and transaction functions."
>
  <LinkGrid links={[
    { text: "WeChat Payment Service Configuration", href: "third-party-integration/payment-service#wechat-payment-service-configuration" },
    { text: "Alipay Payment Service Configuration", href: "third-party-integration/payment-service#alipay-payment-service-configuration" },
    { text: "Payment Service Usage", href: "third-party-integration/payment-service#payment-service-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Built-in SMS Service"
  href="third-party-integration/sms-service"
  description="SMS sending and notification service integration, supporting verification codes and message push."
>
  <LinkGrid links={[
    { text: "Alibaba Cloud SMS", href: "third-party-integration/sms-service#aliyun-sms" },
    { text: "Alibaba Cloud SMS Service Creation", href: "third-party-integration/sms-service#aliyun-sms-service-creation" },
    { text: "Use SMS Service in Mobile Login", href: "third-party-integration/sms-service#use-sms-service-in-mobile-login" },
    { text: "Use SMS Service in Approval Process", href: "third-party-integration/sms-service#use-sms-service-in-approval-workflow" },
    { text: "SMS Notification Function", href: "third-party-integration/sms-service#sms-notification-function" }
  ]} />
</IndexCard>
</div>

## Cache Management
Make applications run faster and more stable. Configure intelligent caching strategies, optimize data access speed, and enhance user experience. Ensure applications run smoothly even under high concurrent access.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Cache Configuration and Usage"
  href="cache-management"
  description="Application cache strategy configuration to improve system performance and response speed."
>
  <LinkGrid links={[
    { text: "Cache Service Configuration", href: "cache-management#cache-service-configuration" },
    { text: "Multi-cache Service Management", href: "cache-management#multi-cache-service-management" },
    { text: "Cache Programming Interface Usage", href: "cache-management#cache-programming-interface-usage" }
  ]} />
</IndexCard>
</div>

## Internal API Exposure
Expose application capabilities for external system calls. Generate standard API interfaces with one click, manage call permissions, and monitor usage. Make your application a provider of data and services.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="API Authorization"
  href="api-exposure/api-authorization"
  description="Permission control and access authorization management for API interfaces."
>
  <LinkGrid links={[
    { text: "API Authorization Creation", href: "api-exposure/api-authorization#api-authorization-creation" },
    { text: "API Authorization Detail", href: "api-exposure/api-authorization#api-authorization-detail" },
    { text: "Call Records", href: "api-exposure/api-authorization#call-records" }
  ]} />
</IndexCard>

<IndexCard
  title="API Exposure Examples for Various Elements"
  href="api-exposure/api-exposure-examples-for-various-elements"
  description="Comprehensive examples demonstrating how to expose different types of elements as APIs, including data models, services, and custom functions."
>
    <LinkGrid links={[
        { text: "API Authorization for Service Functions", href: "api-exposure/api-exposure-examples-for-various-elements#service-function-api-authorization" },
        { text: "API Authorization for Data Models", href: "api-exposure/api-exposure-examples-for-various-elements#data-model-api-authorization" },
        { text: "API Authorization for Large Language Model Functions", href: "api-exposure/api-exposure-examples-for-various-elements#large-language-model-function-api-authorization" },
        { text: "API Authorization for AI Agents", href: "api-exposure/api-exposure-examples-for-various-elements#agent-api-authorization" },
        { text: "API Authorization for AI Assistants", href: "api-exposure/api-exposure-examples-for-various-elements#ai-assistant-api-authorization" },
        { text: "API Authorization for Approval Processes", href: "api-exposure/api-exposure-examples-for-various-elements#approval-process-api-authorization" }
    ]} />
</IndexCard>

<IndexCard
  title="Using SDK to Call Authorized Element APIs"
  href="api-exposure/using-sdk-to-call-authorized-element-apis"
  description="Learn how to use official SDKs to call authorized element APIs, including authentication, request handling, and error management."
>
    <LinkGrid links={[
        { text: "Using Python SDK", href: "api-exposure/using-sdk-to-call-authorized-element-apis#using-python-sdk" },
        { text: "Using Node.js SDK", href: "api-exposure/using-sdk-to-call-authorized-element-apis#using-nodejs-sdk" },
        { text: "Using Java SDK", href: "api-exposure/using-sdk-to-call-authorized-element-apis#using-java-sdk" }
    ]} />
</IndexCard>

<IndexCard
  title="Using Cross-App Service Elements to Call Authorized APIs"
  href="api-exposure/using-cross-app-service-elements-to-call-authorized-apis"
  description="Implement cross-application API calls using service elements, enabling seamless integration between different JitAi applications."
>
    <LinkGrid links={[
        { text: "Using Cross-App Service Elements", href: "api-exposure/using-cross-app-service-elements-to-call-authorized-apis#using-cross-app-service-elements" }
    ]} />
</IndexCard>

</div>

## Internationalization
Make your application accessible to global users. Support multiple languages, regional settings, and dynamic language switching to create truly international applications.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Language Packages"
  href="internationalization/creating-language-packages"
  description="Learn how to create custom language packages for your application, including structure definition and content organization."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Extending System Builtin Language Packages"
  href="internationalization/extending-system-builtin-language-packages"
  description="Extend and customize existing system language packages to meet specific business requirements and regional needs."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="How to Translate Page Terms"
  href="internationalization/how-to-translate-page-terms"
  description="Master the techniques for translating page content, including dynamic text replacement and context-aware translations."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>


## Frontend UI Customization
Create unique visual experiences and brand identity. Customize application theme colors, develop exclusive UI components, and make application interfaces better align with corporate brand tone while enhancing user experience and recognition.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Global Styles"
  href="frontend-ui-customization/global-styles"
  description="Application overall style and theme configuration, unifying interface style and user experience."
>
  <LinkGrid links={[
    { text: "Create Global Style Element", href: "frontend-ui-customization/global-styles#create-global-style-element" },
    { text: "Modify Global Style", href: "frontend-ui-customization/global-styles#modify-global-style" },
    { text: "More Style Variables", href: "frontend-ui-customization/global-styles#more-style-variables" },
    { text: "Debug Theme", href: "frontend-ui-customization/global-styles#debug-theme" }
  ]} />
</IndexCard>

<IndexCard
  title="Custom Controls"
  href="frontend-ui-customization/custom-controls"
  description="Develop personalized UI components to meet special business needs and interaction requirements."
>
  <LinkGrid links={[
    { text: "Create Custom Control Element", href: "frontend-ui-customization/custom-controls#create-custom-control-element" },
    { text: "Modify Custom Control", href: "frontend-ui-customization/custom-controls#modify-custom-control" },
    { text: "Use Custom Control in Form", href: "frontend-ui-customization/custom-controls#use-custom-control-in-form" },
    { text: "Use Custom Control in Table", href: "frontend-ui-customization/custom-controls#use-custom-control-in-table" },
    { text: "Custom Control Parameters", href: "frontend-ui-customization/custom-controls#custom-control-parameters" }
  ]} />
</IndexCard>

<IndexCard
  title="Component Customization"
  href="frontend-ui-customization/component-customization"
  description="Customize individual components to match specific design requirements and enhance user interface consistency across the application."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Page Customization"
  href="frontend-ui-customization/page-customization"
  description="Customize entire page layouts, themes, and visual elements to create cohesive and branded user experiences."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Portal Customization"
  href="frontend-ui-customization/portal-customization"
  description="Customize portal interfaces and navigation elements to provide personalized and role-based user experiences."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>
</div>

## Scenario-based Advanced Guide
In-depth practical guides based on real business scenarios to help developers master complex application architecture design and best practices.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Development and Operations Process"
  href="advanced-guide/local-development-and-debugging"
  description="Master efficient development processes, debugging techniques, and production environment deployment management to ensure application stability and team collaboration efficiency."
>
  <LinkGrid links={[
    { text: "Local Development and Debugging", href: "advanced-guide/local-development-and-debugging" },
    { text: "Team Collaborative Development", href: "advanced-guide/team-collaborative-development" },
    { text: "Agent Prompt Writing Techniques", href: "advanced-guide/agent-prompt-writing-techniques" },
    { text: "Application Layer Stability Guarantee", href: "advanced-guide/application-layer-stability-guarantee" }
  ]} />
</IndexCard>

<IndexCard
  title="Authentication and Permission Management"
  href="advanced-guide/login-authentication-and-permission-management"
  description="Build enterprise-level permission systems based on JitAuth, supporting multiple login methods and fine-grained permission control."
>
  <LinkGrid links={[
    { text: "Login Authentication and Permission Management", href: "advanced-guide/login-authentication-and-permission-management" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Modeling and Analysis"
  href="advanced-guide/business-entity-modeling-and-data-analysis"
  description="Build sales data analysis systems based on JitORM, implementing multi-dimensional aggregation analysis and business rule automation."
>
  <LinkGrid links={[
    { text: "Business Entity Modeling and Data Analysis", href: "advanced-guide/business-entity-modeling-and-data-analysis" }
  ]} />
</IndexCard>

<IndexCard
  title="Interface Design and Components"
  href="advanced-guide/system-interface-design-and-component-application"
  description="Build multi-entry business interfaces based on JitWeb, quickly completing system navigation and interface layout through portals, pages, and components."
>
  <LinkGrid links={[
    { text: "System Interface Design and Component Application", href: "advanced-guide/system-interface-design-and-component-application" }
  ]} />
</IndexCard>

<IndexCard
  title="Business Services and API"
  href="advanced-guide/open-api-to-third-party"
  description="Implement API opening, third-party integration, custom authentication and event-driven business service architecture based on JitService."
>
  <LinkGrid links={[
    { text: "Open API Interfaces to External Systems", href: "advanced-guide/open-api-to-third-party" },
    { text: "Integrate External API Interfaces", href: "advanced-guide/integrating-external-api-interfaces" },
    { text: "Use Interceptors for Custom Request Authentication", href: "advanced-guide/using-interceptors-for-custom-request-authentication" },
    { text: "Custom Business Event Trigger Subscription and Handling", href: "advanced-guide/custom-business-event-trigger-subscription-and-handling" }
  ]} />
</IndexCard>

<IndexCard
  title="Workflow Management"
  href="advanced-guide/approval-workflow-orchestration-and-custom-approval-events"
  description="Implement approval process orchestration, scheduled task execution and business process automation based on JitWorkflow and JitTask."
>
  <LinkGrid links={[
    { text: "Approval Process Orchestration and Custom Approval Events", href: "advanced-guide/approval-workflow-orchestration-and-custom-approval-events" },
    { text: "Scheduled Execution of Custom Business Logic", href: "advanced-guide/scheduled-execution-of-custom-business-logic" },
    { text: "Use Database Table Time Fields to Trigger Scheduled Tasks", href: "advanced-guide/using-database-table-time-fields-to-trigger-scheduled-tasks" }
  ]} />
</IndexCard>

<IndexCard
  title="Payment and Message Notification"
  href="advanced-guide/online-payment-feature-integration"
  description="Implement payment function integration and real-time message notification based on JitPay and JitMessage to build a complete business closed loop."
>
  <LinkGrid links={[
    { text: "Online Payment Feature Integration", href: "advanced-guide/online-payment-feature-integration" },
    { text: "Send SMS Notifications", href: "advanced-guide/sending-sms-notifications" }
  ]} />
</IndexCard>

<IndexCard
  title="File and Storage Management"
  href="advanced-guide/file-management-based-on-file-storage-elements"
  description="Implement unified file management, templated document generation and printing functions based on JitStorage to improve document processing efficiency."
>
  <LinkGrid links={[
    { text: "File Management Based on File Storage Elements", href: "advanced-guide/file-management-based-on-file-storage-elements" },
    { text: "Use File Templates to Generate and Print Files", href: "advanced-guide/using-file-templates-to-generate-and-print-files" }
  ]} />
</IndexCard>

</div>
