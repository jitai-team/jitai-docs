---
sidebar_position: 0
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# Developer Guide Index
Ready to experience a revolutionary approach to application development? Start here and learn to build powerful enterprise-grade applications using cutting-edge AI-era technology.

This developer guide provides a comprehensive learning path from organizational management and application development fundamentals to business logic implementation, along with best practices for mastering complex application architecture design through real-world business scenarios.

**Usage recommendations**: Beginners should follow the sequential learning path, while experienced developers can jump directly to the scenario-based advanced guides.

First, you need to complete the basic [Download and Installation](tutorial/download-installation)!


## Basic concepts {#basic-concepts}
Master the core concepts and architecture principles of the JitAi platform. Understand the fundamental concepts of platform applications, element systems, development frameworks, and visual development tools to establish the theoretical foundation for subsequent development work.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Platform Architecture and Core Concepts"
  href="devguide/basic-concept"
  description="Understand JitAi platform architecture, application concepts, JAAP protocol, element systems, and development frameworks to master the fundamental principles of the platform."
>
  <LinkGrid columns={2} links={[
    { text: "Platform and applications", href: "devguide/basic-concept#platform-and-applications" },
    { text: "DevOps tools and services", href: "devguide/basic-concept#devops-tools-and-services" },
    { text: "Application creation and development", href: "devguide/basic-concept#application-creation-and-development" },
    { text: "JAAP protocol and elements", href: "devguide/basic-concept#jaap-protocol-and-elements" },
    { text: "Element types and element loading", href: "devguide/basic-concept#element-type-and-element-loading" },
    { text: "Development framework", href: "devguide/basic-concept#development-framework" },
    { text: "Business applications and application inheritance", href: "devguide/basic-concept#business-applications-and-application-inheritance" },
    { text: "Development tools", href: "devguide/basic-concept#development-tools" },
    { text: "Extension", href: "devguide/basic-concept#extension" }
  ]} />
</IndexCard>

</div>

## Platform installation and node activation {#platform-installation-node-activation}
Complete the platform installation and node activation process. Learn download and installation methods, node activation procedures, and developer team management to establish a solid development environment foundation.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Download and Installation"
  href="devguide/installation-activation/download-installation"
  description="Learn how to download and install JitAi platform, including desktop and server versions for different deployment scenarios."
>
  <LinkGrid links={[
    { text: "Detailed Installation Steps", href: "devguide/installation-activation/download-installation#detailed-installation-steps" }
  ]} />
</IndexCard>

<IndexCard
  title="Node Activation and Developer Team"
  href="devguide/installation-activation/developer-team-management"
  description="Learn how to activate nodes and manage developer teams, including organization binding, member management and other core operations."
>
  <LinkGrid links={[
    { text: "What is Node", href: "devguide/installation-activation/developer-team-management#what-is-jitnode" },
    { text: "What is Developer Team", href: "devguide/installation-activation/developer-team-management#what-is-developer-team" },
    { text: "Create New Development Organization When Activating Node", href: "devguide/installation-activation/developer-team-management#create-new-dev-team-when-activating-node" },
    { text: "Bind Node to Joined Organization When Activating", href: "devguide/installation-activation/developer-team-management#bind-node-to-joined-team-when-activating" },
    { text: "Use Organization Bind Code to Join and Bind When Activating Node", href: "devguide/installation-activation/developer-team-management#use-team-bind-code-to-join-and-bind-when-activating-node" },
    { text: "Join Organization via Bind Code When Logging into Existing Node", href: "devguide/installation-activation/developer-team-management#join-team-via-bind-code-when-logging-into-existing-node" },
    { text: "View and Refresh Organization Bind Code", href: "devguide/installation-activation/developer-team-management#view-and-refresh-team-bind-code" },
    { text: "Remove Organization Member", href: "devguide/installation-activation/developer-team-management#remove-team-member" }
  ]} />
</IndexCard>

<IndexCard
  title="Platform Node Updates and Upgrades"
  href="devguide/installation-activation/platform-node-updates-upgrades"
  description="Learn how to update and upgrade platform nodes to maintain system stability and feature updates."
>
  <LinkGrid links={[
    { text: "Update Procedures", href: "devguide/installation-activation/platform-node-updates-upgrades" },
    { text: "Upgrade Methods", href: "devguide/installation-activation/platform-node-updates-upgrades" }
  ]} />
</IndexCard>

</div>

## Development tools and publishing services {#development-tools-publishing-services}
Powerful toolchain for efficient development. Master visual development environments, DevOps management tools, and cloud publishing services to achieve comprehensive toolchain support from development to deployment.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="JitAi Visual Development Tools"
  href="devguide/development-tool-and-publish-service/visual-development-tool"
  description="Master the powerful visual development environment, familiarize yourself with IDE functional areas, and learn to switch between visual and source code modes."
>
  <LinkGrid links={[
    { text: "Element directory tree", href: "devguide/development-tool-and-publish-service/visual-development-tool#element-directory-tree" },
    { text: "Adding elements", href: "devguide/development-tool-and-publish-service/visual-development-tool#adding-elements" },
    { text: "Visual editor", href: "devguide/development-tool-and-publish-service/visual-development-tool#visual-editor" },
    { text: "Source code editor", href: "devguide/development-tool-and-publish-service/visual-development-tool#source-code-editor" },
    { text: "Source code file tree", href: "devguide/development-tool-and-publish-service/visual-development-tool#source-code-file-tree" },
    { text: "Application settings", href: "devguide/development-tool-and-publish-service/visual-development-tool#application-settings" },
    { text: "Basic information", href: "devguide/development-tool-and-publish-service/visual-development-tool#basic-information" },
    { text: "Default elements", href: "devguide/development-tool-and-publish-service/visual-development-tool#default-elements" },
    { text: "Environment variables", href: "devguide/development-tool-and-publish-service/visual-development-tool#environment-variables" },
    { text: "Portal switching", href: "devguide/development-tool-and-publish-service/visual-development-tool#portal-switching" },
    { text: "Personal center", href: "devguide/development-tool-and-publish-service/visual-development-tool#personal-center" },
    { text: "Language switching", href: "devguide/development-tool-and-publish-service/visual-development-tool#language-switching" },
    { text: "Navigation tabs", href: "devguide/development-tool-and-publish-service/visual-development-tool#navigation-tabs" }
  ]} />
</IndexCard>

<IndexCard
  title="DevOps Management Tool"
  href="devguide/development-tool-and-publish-service/devops-management-tool"
  description="Comprehensive DevOps management solution with dual-console architecture, providing complete application lifecycle management from development to deployment."
>
  <LinkGrid links={[
    { text: "Dual Console Architecture", href: "devguide/development-tool-and-publish-service/devops-management-tool#dual-console-architecture" },
    { text: "Local node console", href: "devguide/development-tool-and-publish-service/devops-management-tool#local-node-console" },
    { text: "Organization management console", href: "devguide/development-tool-and-publish-service/devops-management-tool#organization-management-console" },
    { text: "Core Capabilities Overview", href: "devguide/development-tool-and-publish-service/devops-management-tool#core-capabilities-overview" },
    { text: "Application lifecycle management", href: "devguide/development-tool-and-publish-service/devops-management-tool#application-lifecycle-management" },
    { text: "Runtime environment management", href: "devguide/development-tool-and-publish-service/devops-management-tool#runtime-environment-management" },
    { text: "Node cluster management", href: "devguide/development-tool-and-publish-service/devops-management-tool#node-cluster-management" },
    { text: "Flexible configuration management", href: "devguide/development-tool-and-publish-service/devops-management-tool#flexible-configuration-management" },
    { text: "Version release and deployment", href: "devguide/development-tool-and-publish-service/devops-management-tool#version-release-and-deployment" },
    { text: "Multi-platform export", href: "devguide/development-tool-and-publish-service/devops-management-tool#multi-platform-export" },
    { text: "Application template ecosystem", href: "devguide/development-tool-and-publish-service/devops-management-tool#application-template-ecosystem" }
  ]} />
</IndexCard>

<IndexCard
  title="JCS Cloud Application Publishing Service"
  href="devguide/development-tool-and-publish-service/jcs-cloud-publishing-service"
  description="Official cloud application publishing service providing centralized application repository, version management, and seamless deployment across JitNodes."
>
  <LinkGrid links={[
    { text: "Synchronizing runtime environment configuration from JCS", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#synchronizing-runtime-environment-configuration" },
    { text: "Retrieving version update information from JCS", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#retrieving-version-update-information" },
    { text: "Accessing cloud application repository through JCS", href: "devguide/development-tool-and-publish-service/jcs-cloud-publishing-service#accessing-cloud-application-repository" }
  ]} />
</IndexCard>

</div>

## Creating and publishing applications {#creating-publishing-applications}
Complete workflow from application creation to distributed deployment. Master application creation, source code management, version publishing, runtime environment configuration, and building infinitely horizontally scalable distributed cluster architectures.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating and Deploying Applications"
  href="devguide/creating-and-publishing-applications/creating-and-deploying-applications"
  description="Learn application creation, inheritance, data configuration, and deployment. Master the fundamentals of application development workflow."
>
  <LinkGrid links={[
    { text: "Creating Your First Application", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#creating-first-application" },
    { text: "Developing Applications Based on Existing Templates", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#developing-applications-based-on-existing-templates" },
    { text: "Inheriting from Applications", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#inheriting-from-applications" },
    { text: "Duplicating Applications", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#duplicating-applications" },
    { text: "Configuring Data Storage and Environment Variables", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#configuring-data-storage-and-environment-variables" },
    { text: "Deploying Applications", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications" },
    { text: "Deploying Applications on Specified Nodes", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications-on-specified-nodes" },
    { text: "Deploying Applications in Specified Runtime Environments", href: "devguide/creating-and-publishing-applications/creating-and-deploying-applications#deploying-applications-in-specified-runtime-environments" }
  ]} />
</IndexCard>

<IndexCard
  title="Application Directory and Element Source Code"
  href="devguide/creating-and-publishing-applications/application-directory-and-element-source-code"
  description="Understand JitAi application directory structure based on JAAP protocol, element code organization, and source code export/import mechanisms."
>
  <LinkGrid links={[
    { text: "Understanding application directory structure", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#application-directory-structure" },
    { text: "Understanding element code directory structure", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#element-code-directory-structure" },
    { text: "Exporting and importing application source code", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#application-export-import" },
    { text: "Exporting source code zip packages", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#export-source-code-zip" },
    { text: "Exporting to WeChat MiniProgram", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#export-to-wechat-miniprogram" },
    { text: "Importing application source code packages", href: "devguide/creating-and-publishing-applications/application-directory-and-element-source-code#import-application-source-code" }
  ]} />
</IndexCard>

<IndexCard
  title="Publishing and Upgrading Applications"
  href="devguide/creating-and-publishing-applications/publishing-and-upgrading-applications"
  description="Master application version management, publishing workflows, and upgrade strategies. Learn semantic versioning and deployment configurations."
>
  <LinkGrid links={[
    { text: "Managing application version and publishing", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-version-management-and-publish" },
    { text: "Understanding semantic versioning", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#semantic-versioning" },
    { text: "Setting automatic updates", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#force-auto-update" },
    { text: "Writing meaningful update logs", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#meaningful-update-logs" },
    { text: "Including source code", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#include-source-code" },
    { text: "Including initialization data", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#include-initialization-data" },
    { text: "Upgrading application versions", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-version-updates" },
    { text: "Planning application deployment strategies", href: "devguide/creating-and-publishing-applications/publishing-and-upgrading-applications#application-deployment-strategies" }
  ]} />
</IndexCard>


<IndexCard
  title="Runtime Environment Management"
  href="devguide/creating-and-publishing-applications/runtime-environment-management"
  description="Master the creation, configuration, and management of runtime environments, and learn how to use node clusters and application deployment."
>
  <LinkGrid links={[
    { text: "Understanding runtime environments", href: "devguide/creating-and-publishing-applications/runtime-environment-management#what-is-runtime-environment" },
    { text: "Managing node local default runtime environment", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-local-default-runtime-environment" },
    { text: "Creating new runtime environments", href: "devguide/creating-and-publishing-applications/runtime-environment-management#createnewrunenvironment" },
    { text: "Deploying in development mode", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-in-development-mode" },
    { text: "Deploying in production mode", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-in-production-mode" },
    { text: "Managing node clusters with runtime environments", href: "devguide/creating-and-publishing-applications/runtime-environment-management#use-runtime-environment-to-manage-node-clusters" },
    { text: "Managing node addresses", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-address" },
    { text: "Monitoring node status", href: "devguide/creating-and-publishing-applications/runtime-environment-management#node-status" },
    { text: "Deploying applications in runtime environments", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-application-in-runtime-environment" },
    { text: "Deploying in production mode", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-production-mode" },
    { text: "Deploying in development mode", href: "devguide/creating-and-publishing-applications/runtime-environment-management#deploy-development-mode" }
  ]} />
</IndexCard>

<IndexCard
  title="Distributed Cluster Architecture for Unlimited Horizontal Scaling"
  href="devguide/creating-and-publishing-applications/distributed-cluster-architecture"
  description="Learn how to build and manage infinitely horizontally scalable distributed cluster architectures for high availability and performance."
>
  <LinkGrid links={[
    { text: "Understanding the four-layer architecture model", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#four-layer-architecture" },
    { text: "Designing enterprise cluster deployment architecture", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#enterprise-cluster-deployment" },
    { text: "Implementing typical deployment topology", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#typical-deployment-topology" },
    { text: "Organizing multi-dimensional environment division", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#multi-dimensional-environment-division" },
    { text: "Configuring entry address strategies", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#entry-address-configuration" },
    { text: "Implementing cluster scaling strategies", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#cluster-scaling-strategies" },
    { text: "Deploying horizontal scaling modes", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#horizontal-scaling" },
    { text: "Implementing load balancing and fault tolerance", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#load-balancing-fault-tolerance" },
    { text: "Understanding architecture constraints and best practices", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#architecture-constraints-best-practices" },
    { text: "Managing version constraints", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#version-management-constraints" },
    { text: "Configuring network access constraints", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#network-access-constraints" },
    { text: "Following deployment best practices", href: "devguide/creating-and-publishing-applications/distributed-cluster-architecture#deployment-best-practices" }
  ]} />
</IndexCard>

</div>


## Frontend portals and pages {#frontend-portals-pages}
Design beautiful user interfaces and interactive experiences. From portal navigation to page construction, from component layout to data management, create comprehensive, user-friendly application interfaces.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>
  
<IndexCard
  title="Creating Portals"
  href="devguide/shell-and-page/portal-navigation-design"
  description="Design portal interfaces for different user roles, configure navigation menus and permission controls, and create personalized user experiences."
>
  <LinkGrid links={[
    { text: "Application built-in portals", href: "devguide/shell-and-page/portal-navigation-design#application-built-in-portals" },
    { text: "Developer portal", href: "devguide/shell-and-page/portal-navigation-design#developer-portal" },
    { text: "Manager portal", href: "devguide/shell-and-page/portal-navigation-design#manager-portal" },
    { text: "User portal", href: "devguide/shell-and-page/portal-navigation-design#user-portal" },
    { text: "Portal types", href: "devguide/shell-and-page/portal-navigation-design#portal-types" },
    { text: "Generic portal", href: "devguide/shell-and-page/portal-navigation-design#generic-portal" },
    { text: "Blank portal", href: "devguide/shell-and-page/portal-navigation-design#blank-portal" },
    { text: "SSR portal", href: "devguide/shell-and-page/portal-navigation-design#ssr-portal" },
    { text: "Creating portals and configuring menus", href: "devguide/shell-and-page/portal-navigation-design#creating-portals-and-configuring-menus" },
    { text: "Creating, deleting, and hiding menus", href: "devguide/shell-and-page/portal-navigation-design#creating-deleting-hiding-menus" },
    { text: "Sorting menus by dragging", href: "devguide/shell-and-page/portal-navigation-design#sorting-menus-by-dragging" },
    { text: "Menu grouping", href: "devguide/shell-and-page/portal-navigation-design#menu-grouping" },
    { text: "Creating portal menu groups", href: "devguide/shell-and-page/portal-navigation-design#creating-portal-menu-groups" },
    { text: "Moving menus into groups", href: "devguide/shell-and-page/portal-navigation-design#moving-menus-into-groups" },
    { text: "PC and mobile menu pages", href: "devguide/shell-and-page/portal-navigation-design#pc-and-mobile-menu-pages" },
    { text: "Controlling page logic with variable assignment", href: "devguide/shell-and-page/portal-navigation-design#controlling-page-logic-with-variable-assignment" },
    { text: "Rewriting menu pages", href: "devguide/shell-and-page/portal-navigation-design#rewriting-menu-pages" },
    { text: "Portal layout design", href: "devguide/shell-and-page/portal-navigation-design#portal-layout-design" },
    { text: "Configuring navigation layout", href: "devguide/shell-and-page/portal-navigation-design#configuring-navigation-layout" },
    { text: "Multi-tab functionality", href: "devguide/shell-and-page/portal-navigation-design#multi-tab-functionality" },
    { text: "Portal visibility settings", href: "devguide/shell-and-page/portal-navigation-design#portal-visibility-settings" },
    { text: "Portal ordering", href: "devguide/shell-and-page/portal-navigation-design#portal-ordering" },
    { text: "Managing common function entries", href: "devguide/shell-and-page/portal-navigation-design#managing-common-function-entries" },
    { text: "Application and workflow entries", href: "devguide/shell-and-page/portal-navigation-design#application-and-workflow-entries" },
    { text: "Personal center entry", href: "devguide/shell-and-page/portal-navigation-design#personal-center-entry" },
    { text: "Integrating AI assistants", href: "devguide/shell-and-page/portal-navigation-design#integrating-ai-assistants" }
  ]} />
</IndexCard>

<IndexCard
  title="Component-Based Page Development"
  href="devguide/shell-and-page/component-based-page-development"
  description="Use the visual editor to build page interfaces, configure components and events, and implement rich user interaction features."
>
  <LinkGrid links={[
    { text: "Creating generic pages", href: "devguide/shell-and-page/component-based-page-development#creating-generic-pages" },
    { text: "Visual page editor", href: "devguide/shell-and-page/component-based-page-development#visual-page-editor" },
    { text: "Component common operations", href: "devguide/shell-and-page/component-based-page-development#component-common-operations" },
    { text: "Page variables", href: "devguide/shell-and-page/component-based-page-development#page-variables" },
    { text: "Page functions", href: "devguide/shell-and-page/component-based-page-development#page-functions" },
    { text: "Page events", href: "devguide/shell-and-page/component-based-page-development#page-events" },
    { text: "Shortcuts", href: "devguide/shell-and-page/component-based-page-development#shortcuts" },
    { text: "Enabling AI assistant for page", href: "devguide/shell-and-page/component-based-page-development#enabling-ai-assistant" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Data Management Page"
  href="devguide/shell-and-page/ai-data-management-page"
  description="AI-powered ai-data-management-page that intelligently assists in efficient data browsing, filtering, editing, and batch operations."
>
  <LinkGrid columns={2} links={[
    { text: "Create AI Data Management Page", href: "devguide/shell-and-page/ai-data-management-page#create-ai-data-management-page" },
    { text: "Limit Page Table Query Data Through Default Filter Conditions", href: "devguide/shell-and-page/ai-data-management-page#limit-page-table-query-data-through-default-filter-conditions" },
    { text: "Configure Default Data Sort Rules", href: "devguide/shell-and-page/ai-data-management-page#configure-default-data-sort-rules" },
    { text: "Hide Some Fields in Page Table", href: "devguide/shell-and-page/ai-data-management-page#hide-some-fields-in-page-table" },
    { text: "Configure Conditional Filter Fields", href: "devguide/shell-and-page/ai-data-management-page#configure-conditional-filter-fields" },
    { text: "Configure Viewable and Editable Fields in Form", href: "devguide/shell-and-page/ai-data-management-page#configure-viewable-editable-fields-in-form" },
    { text: "Configure Fields Displayed in Batch Edit Form", href: "devguide/shell-and-page/ai-data-management-page#configure-fields-displayed-in-batch-edit-form" },
    { text: "Enable AI Data Management Assistant", href: "devguide/shell-and-page/ai-data-management-page#enable-ai-data-management-assistant" },
    { text: "Convert to Generic Page for Modification", href: "devguide/shell-and-page/ai-data-management-page#convert-to-generic-page-for-modification" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Data Analysis Page"
  href="devguide/shell-and-page/ai-data-analysis-page"
  description="AI automatically generates data charts through natural language descriptions of requirements, supporting users to adjust chart styles and statistical dimensions at any time."
>
  <LinkGrid links={[
    { text: "Create AI data analysis page", href: "devguide/shell-and-page/ai-data-analysis-page#create-ai-data-analysis-page" },
    { text: "Page configuration", href: "devguide/shell-and-page/ai-data-analysis-page#page-configuration" },
    { text: "Runtime effects demo", href: "devguide/shell-and-page/ai-data-analysis-page#runtime-effects" },
    { text: "Full code development", href: "devguide/shell-and-page/ai-data-analysis-page#full-code-development" },
    { text: "Quick create", href: "devguide/shell-and-page/ai-data-analysis-page#quick-create" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Entry Pages"
  href="devguide/shell-and-page/data-entry-page"
  description="Quickly create data entry forms to implement data collection and submission functions."
>
  <LinkGrid links={[
    { text: "Creating a data entry page", href: "devguide/shell-and-page/data-entry-page#creating-data-entry-page" },
    { text: "Configuring viewable and editable fields", href: "devguide/shell-and-page/data-entry-page#configuring-viewable-editable-fields" },
    { text: "Showing enter again button after submission", href: "devguide/shell-and-page/data-entry-page#showing-enter-again-button-after-submission" },
    { text: "Showing result feedback after submission", href: "devguide/shell-and-page/data-entry-page#showing-result-feedback-after-submission" },
    { text: "Converting to generic page for modification", href: "devguide/shell-and-page/data-entry-page#converting-to-generic-page-for-modification" }
  ]} />
</IndexCard>


<IndexCard
  title="Markdown Page"
  href="devguide/shell-and-page/markdown-page"
  description="Create document-type pages with support for rich Markdown syntax and document display requirements."
>
  <LinkGrid links={[
    { text: "Create Markdown Page", href: "devguide/shell-and-page/markdown-page#create-markdown-page" },
    { text: "Markdown Syntax", href: "devguide/shell-and-page/markdown-page#markdown-syntax" }
  ]} />
</IndexCard>


<IndexCard
  title="Full Code Page Development"
  href="devguide/shell-and-page/full-code-page-development"
  description="Fully customized page development approach for advanced developers, supporting complex business logic and personalized interfaces."
>
  <LinkGrid columns={2} links={[
    { text: "Create React Full Code Page", href: "devguide/shell-and-page/full-code-page-development#create-react-full-code-page" },
    { text: "Create Vue Full Code Page", href: "devguide/shell-and-page/full-code-page-development#vue-full-code-page" }
  ]} />
</IndexCard>

</div>

## Using AI in portals and pages {#using-ai-portals-pages}
Enhance user experience with intelligent AI elements. Integrate AI assistants, agents, and other AI components into portals and pages to create smart, interactive applications that provide personalized assistance and automated workflows.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Using AI Assistant in Portals"
  href="devguide/using-ai-in-portals-and-pages/using-ai-assistants-in-portals"
  description="Learn how to use AI assistants into portal interfaces, providing users with intelligent help and guidance throughout their workflow."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Using AI Assistant in Component Pages"
  href="devguide/using-ai-in-portals-and-pages/using-ai-assistants-in-component-pages"
  description="Embed AI assistants into component-based pages to enhance user interactions and provide contextual assistance for specific tasks."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Using AI Elements in Pages"
  href="devguide/using-ai-in-portals-and-pages/using-ai-elements-in-pages"
  description="Master the techniques for invoking AI elements from pages, including AI agents, LLM services, and knowledge bases for dynamic content generation."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## Calling business elements in pages {#calling-business-elements-pages}
Connect your pages to powerful business logic and data operations. Learn how to invoke service functions and data model functions from pages to create dynamic, data-driven user interfaces with real-time business processing capabilities.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Calling Service Functions in Pages"
  href="devguide/calling-business-elements-in-pages/calling-service-functions-in-pages"
  description="Learn how to invoke service functions from pages to execute business logic, process data, and integrate with external systems for dynamic content generation."
>
  <LinkGrid links={[
    { text: "Calling Service Functions in Standard Pages", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#calling-service-functions-in-standard-pages" },
    { text: "Calling Service Functions in Full-Code Pages", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#calling-service-functions-in-full-code-pages" },
    { text: "Complex Parameter Handling", href: "devguide/calling-business-elements-in-pages/calling-service-functions-in-pages#complex-parameter-handling" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Data Model Functions in Pages"
  href="devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages"
  description="Master the techniques for calling data model functions from pages to perform CRUD operations, data queries, and database interactions for real-time data display."
>
  <LinkGrid links={[
    { text: "Calling Syntax", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#calling-syntax" },
    { text: "Basic Syntax in Full-Code Pages", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#basic-syntax-in-full-code-pages" },
    { text: "Data Operation Capabilities", href: "devguide/calling-business-elements-in-pages/calling-data-model-functions-in-pages#data-operation-capabilities" }
  ]} />
</IndexCard>

</div>

## Full-code UI components in pages {#fullcode-ui-components-pages}
Create advanced custom UI components with full programming control. Build sophisticated interactive elements that seamlessly integrate with page logic, handle complex events, and provide rich user experiences beyond standard components.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="UI Component Interface Specifications"
  href="devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="Learn the interface specifications and standards for creating full-code UI components, including props, state management, and lifecycle methods."
>
  <LinkGrid columns={2} links={[
    { text: "Component Interface Architecture", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#component-interface-architecture" },
    { text: "Core Interface Definitions", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#core-interface-definitions" },
    { text: "Interface Interaction Mechanism", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-interaction-mechanism" },
    { text: "Interface Implementation Specifications", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-implementation-specifications" },
    { text: "Interface Runtime Sequence", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-runtime-sequence" },
    { text: "Interface Invocation Explanation", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#interface-invocation-explanation" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Page and Component Functions in Full-Code Components"
  href="devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components"
  description="Master techniques for invoking page functions and other component functions from within full-code components for seamless integration."
>
  <LinkGrid columns={2} links={[
    { text: "Calling Principle", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#calling-principle" },
    { text: "Practical Examples", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#practical-examples" },
    { text: "Basic Component Calling", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#basic-component-calling" },
    { text: "Getting Data from Other Components", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#getting-data-from-other-components" },
    { text: "Common Component Methods", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#common-component-methods" },
    { text: "Basic Calling Pattern", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components#basic-calling-pattern" }
  ]} />
</IndexCard>

<IndexCard
  title="Emitting Events"
  href="devguide/fullcode-ui-components-in-pages/emitting-events"
  description="Learn how to emit custom events from full-code components to communicate with parent pages and other components effectively."
>
  <LinkGrid columns={2} links={[
    { text: "Event Subscription Principles", href: "devguide/fullcode-ui-components-in-pages/emitting-events#event-subscription-principles" },
    { text: "Responding to Events in Full-Code Components", href: "devguide/fullcode-ui-components-in-pages/emitting-events#respond-in-custom-components" },
    { text: "Publishing Custom Events", href: "devguide/fullcode-ui-components-in-pages/emitting-events#publishing-custom-events" },
    { text: "Subscribable Event Types", href: "devguide/fullcode-ui-components-in-pages/emitting-events#subscribable-events" },
    { text: "Standard Component Events", href: "devguide/fullcode-ui-components-in-pages/emitting-events#standard-component-events" },
    { text: "Custom Events in Full-Code Components", href: "devguide/fullcode-ui-components-in-pages/emitting-events#custom-component-events" },
    { text: "Bidirectional Communication Example", href: "devguide/fullcode-ui-components-in-pages/emitting-events#bidirectional-communication-example" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Full-Code Component Functions in Page Code"
  href="devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code"
  description="Understand how to call functions exposed by full-code components from page code to control component behavior and data flow."
>
  <LinkGrid links={[
    { text: "Calling Principle", href: "devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code#calling-principle" },
    { text: "Calling Timing and Lifecycle", href: "devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code#calling-timing-and-lifecycle" }
  ]} />
</IndexCard>

</div>

## Using functional components in pages {#using-functional-components-pages}
The rich component library is your powerful toolkit. Drag and drop tables to display data, add forms to collect information, and insert charts for data visualization. Make complex frontend development simple and intuitive.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Form Components"
  href="devguide/using-functional-components-in-pages/form-components"
  description="Powerful form building tools supporting data collection, validation, permission control, and complex business rule configuration."
>
  <LinkGrid columns={2} links={[
    { text: "Basic Configuration and Item Management", href: "devguide/using-functional-components-in-pages/form-components#basic-configuration-and-item-management" },
    { text: "Field Validation and Interaction", href: "devguide/using-functional-components-in-pages/form-components#field-validation-and-interaction" },
    { text: "Layout Design", href: "devguide/using-functional-components-in-pages/form-components#layout-design" },
    { text: "Use Custom Controls to Render Fields", href: "devguide/using-functional-components-in-pages/form-components#use-custom-controls-to-render-fields" },
    { text: "Event Configuration", href: "devguide/using-functional-components-in-pages/form-components#event-configuration" },
    { text: "Advanced Functions", href: "devguide/using-functional-components-in-pages/form-components#advanced-functions" },
    { text: "Batch Edit Form Configuration", href: "devguide/using-functional-components-in-pages/form-components#batch-edit-form-configuration" },
    { text: "Batch Edit Form Events and Interaction", href: "devguide/using-functional-components-in-pages/form-components#batch-edit-form-events-and-interaction" },
    { text: "Data Correction Configuration", href: "devguide/using-functional-components-in-pages/form-components#data-correction-configuration" },
    { text: "Data Correction Usage", href: "devguide/using-functional-components-in-pages/form-components#data-correction-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Basic Table"
  href="devguide/using-functional-components-in-pages/table-components#basic-table"
  description="Standard data table display component supporting data source binding, field customization, pagination, sorting, and other basic functions."
>
  <LinkGrid columns={2} links={[
    { text: "Set Data Source", href: "devguide/using-functional-components-in-pages/table-components#set-data-source" },
    { text: "Custom Display Fields", href: "devguide/using-functional-components-in-pages/table-components#custom-display-fields" },
    { text: "Display Fields by Group", href: "devguide/using-functional-components-in-pages/table-components#display-fields-by-group" },
    { text: "Set Group Names and Background Colors", href: "devguide/using-functional-components-in-pages/table-components#set-group-names-and-background-colors" },
    { text: "Configure Field Attributes", href: "devguide/using-functional-components-in-pages/table-components#configure-field-attributes" },
    { text: "Freeze Fields", href: "devguide/using-functional-components-in-pages/table-components#freeze-fields" },
    { text: "Inline Editing", href: "devguide/using-functional-components-in-pages/table-components#inline-editing" },
    { text: "Field Statistics", href: "devguide/using-functional-components-in-pages/table-components#field-statistics" },
    { text: "Custom Field Renderer and Field Editor", href: "devguide/using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "Add Button", href: "devguide/using-functional-components-in-pages/table-components#add-button" },
    { text: "Delete Button", href: "devguide/using-functional-components-in-pages/table-components#delete-button" },
    { text: "Collapse Multiple Buttons to \"More\"", href: "devguide/using-functional-components-in-pages/table-components#collapse-multiple-buttons-to-more" },
    { text: "Set Page Size/Disable Selection/Disable Sorting/Refresh Data on First Load", href: "devguide/using-functional-components-in-pages/table-components#set-page-size-disable-selection-disable-sorting-refresh-on-first-load" },
    { text: "Turbo Mode", href: "devguide/using-functional-components-in-pages/table-components#turbo-mode" },
    { text: "Edit Rules", href: "devguide/using-functional-components-in-pages/table-components#edit-rules" },
    { text: "Style Rules", href: "devguide/using-functional-components-in-pages/table-components#style-rules" },
    { text: "Set Related Data Levels and No Data Text", href: "devguide/using-functional-components-in-pages/table-components#set-related-data-levels-and-no-data-text" },
    { text: "Table Events", href: "devguide/using-functional-components-in-pages/table-components#table-events" },
    { text: "Table Component Variables", href: "devguide/using-functional-components-in-pages/table-components#table-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="Grouped Table"
  href="devguide/using-functional-components-in-pages/table-components#grouped-table"
  description="Table component that groups data by specified fields, suitable for hierarchical data management."
>
  <LinkGrid links={[
    { text: "Grouped Field Configuration", href: "devguide/using-functional-components-in-pages/table-components#grouped-field-configuration" },
    { text: "Same Configuration as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "Same Events as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "Same Component Variables as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-component-variables-as-basic-table" }
  ]} />
</IndexCard>

<IndexCard
  title="Cascaded Table"
  href="devguide/using-functional-components-in-pages/table-components#cascaded-table"
  description="Handle hierarchical data with parent-child relationships, supporting tree structure display and operations."
>
  <LinkGrid links={[
    { text: "Cascaded Table Sample Data", href: "devguide/using-functional-components-in-pages/table-components#cascaded-table-sample-data" },
    { text: "Configure Cascaded Logic Fields", href: "devguide/using-functional-components-in-pages/table-components#configure-cascaded-logic-fields" },
    { text: "Cascaded Table Usage Effects", href: "devguide/using-functional-components-in-pages/table-components#cascaded-table-usage-effects" },
    { text: "Same Configuration as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-configuration-as-basic-table" },
    { text: "Same Events as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-events-as-basic-table" },
    { text: "Same Table Variables as Basic Table", href: "devguide/using-functional-components-in-pages/table-components#same-table-variables-as-basic-table" }
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
  href="devguide/using-functional-components-in-pages/table-components#crosstab"
  description="Multi-dimensional pivot table supporting row-column cross-analysis, suitable for data statistics and report display."
>
  <LinkGrid columns={2} links={[
    { text: "Initialization Configuration", href: "devguide/using-functional-components-in-pages/table-components#initialization-configuration" },
    { text: "Configure Dimensions and Metrics", href: "devguide/using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "Statistics by Year/Quarter/Month/Week/Day", href: "devguide/using-functional-components-in-pages/table-components#configure-dimensions-and-metrics" },
    { text: "Configure Metrics", href: "devguide/using-functional-components-in-pages/table-components#configure-metrics" },
    { text: "Configure Calculated Metrics", href: "devguide/using-functional-components-in-pages/table-components#configure-calculated-metrics" },
    { text: "Custom Metric Attributes", href: "devguide/using-functional-components-in-pages/table-components#custom-metric-attributes" },
    { text: "Configure Metric Statistics Methods", href: "devguide/using-functional-components-in-pages/table-components#configure-metric-statistics-methods" },
    { text: "Metric Data Filtering", href: "devguide/using-functional-components-in-pages/table-components#metric-data-filtering" },
    { text: "Configure Chart Styles", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Header/Body Alignment", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Row/Column Styles", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Export/Refresh/Scroll Display Buttons", href: "devguide/using-functional-components-in-pages/table-components#configure-chart-styles" },
    { text: "Show Total", href: "devguide/using-functional-components-in-pages/table-components#show-total" },
    { text: "Cross Table Events", href: "devguide/using-functional-components-in-pages/table-components#cross-table-events" },
    { text: "Crosstab Component Variables", href: "devguide/using-functional-components-in-pages/table-components#crosstab-component-variables" }
  ]} />
</IndexCard>

<IndexCard
  title="Row to Column"
  href="devguide/using-functional-components-in-pages/table-components#row-to-column"
  description="Special table mode that converts row data to column display, suitable for dynamic field display scenarios."
>
  <LinkGrid columns={2} links={[
    { text: "Basic Configuration", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Custom Field Names/Alignment", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Custom Field Renderer", href: "devguide/using-functional-components-in-pages/table-components#custom-field-renderer" },
    { text: "Statistics Columns", href: "devguide/using-functional-components-in-pages/table-components#statistics-columns" },
    { text: "Export/Edit/Default Load Data", href: "devguide/using-functional-components-in-pages/table-components#basic-configuration" },
    { text: "Value Click Event", href: "devguide/using-functional-components-in-pages/table-components#value-click-event" },
    { text: "Button Configuration", href: "devguide/using-functional-components-in-pages/table-components#button-configuration" },
    { text: "Row to Column Event", href: "devguide/using-functional-components-in-pages/table-components#row-to-column-event" },
    { text: "Row to Column Component Variables", href: "devguide/using-functional-components-in-pages/table-components#row-to-column-component-variables" }
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
  href="devguide/using-functional-components-in-pages/tree-components"
  description="Display hierarchical data structures with node expand/collapse and selection operations, providing clear data navigation experience."
>
  <LinkGrid columns={2} links={[
    { text: "Create Tree Component", href: "devguide/using-functional-components-in-pages/tree-components#create-tree-form-component" },
    { text: "Configure Hierarchical Fields", href: "devguide/using-functional-components-in-pages/tree-components#configure-hierarchy-fields" },
    { text: "Refresh Data on First Load", href: "devguide/using-functional-components-in-pages/tree-components#tree-form-refresh-on-first-load" },
    { text: "Default Expand First Node", href: "devguide/using-functional-components-in-pages/tree-components#default-expand-first-node" },
    { text: "Node Click Events", href: "devguide/using-functional-components-in-pages/tree-components#click-node-event" },
    { text: "Cascade Tree", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree" },
    { text: "Create Cascade Tree", href: "devguide/using-functional-components-in-pages/tree-components#create-cascade-tree" },
    { text: "Configure Node Title", href: "devguide/using-functional-components-in-pages/tree-components#configure-node-title" },
    { text: "Set Parent Node", href: "devguide/using-functional-components-in-pages/tree-components#set-parent-node" },
    { text: "Single/Multiple Selection Mode", href: "devguide/using-functional-components-in-pages/tree-components#node-selection-mode" },
    { text: "Cascade Tree Refresh Data on First Load", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-refresh-on-first-load" },
    { text: "Cascade Tree Node Click Events", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-click-node-event" },
    { text: "Cascade Tree Node Selection Events", href: "devguide/using-functional-components-in-pages/tree-components#cascade-tree-select-node-event" }
  ]} />
</IndexCard>

<IndexCard
  title="List Components"
  href="devguide/using-functional-components-in-pages/list-components"
  description="Flexible data list display component supporting title, summary, button configuration, suitable for various list display scenarios."
>
  <LinkGrid columns={2} links={[
    { text: "Configure List Title", href: "devguide/using-functional-components-in-pages/list-components#configure-list-title" },
    { text: "Set Summary Content", href: "devguide/using-functional-components-in-pages/list-components#set-summary-content" },
    { text: "Show Field Titles in Summary", href: "devguide/using-functional-components-in-pages/list-components#show-field-titles-in-summary" },
    { text: "Set Summary Content Layout", href: "devguide/using-functional-components-in-pages/list-components#set-summary-content-layout" },
    { text: "List Component Button", href: "devguide/using-functional-components-in-pages/list-components#list-component-button" },
    { text: "Add Button", href: "devguide/using-functional-components-in-pages/list-components#add-button" },
    { text: "Modify Button Attributes", href: "devguide/using-functional-components-in-pages/list-components#modify-button-attributes" },
    { text: "Button Collapse to More", href: "devguide/using-functional-components-in-pages/list-components#button-collapse-to-more" },
    { text: "Button Drag Sort", href: "devguide/using-functional-components-in-pages/list-components#button-drag-sort" },
    { text: "Set Bottom Button Size", href: "devguide/using-functional-components-in-pages/list-components#set-bottom-button-size" },
    { text: "Refresh Data on First Component Load", href: "devguide/using-functional-components-in-pages/list-components#refresh-data-on-first-component-load" },
    { text: "Enable Row Click Event", href: "devguide/using-functional-components-in-pages/list-components#enable-row-click-event" },
    { text: "Default Select First Data", href: "devguide/using-functional-components-in-pages/list-components#default-select-first-data" },
    { text: "Show Row Spacing", href: "devguide/using-functional-components-in-pages/list-components#show-row-spacing" },
    { text: "List Component Event", href: "devguide/using-functional-components-in-pages/list-components#list-component-event" },
    { text: "Row Click Event", href: "devguide/using-functional-components-in-pages/list-components#row-click-event" },
    { text: "Button Event", href: "devguide/using-functional-components-in-pages/list-components#button-event" },
    { text: "List Component Variables", href: "devguide/using-functional-components-in-pages/list-components#list-component-variables" },
    { text: "Refresh List Component", href: "devguide/using-functional-components-in-pages/list-components#refresh-list-component" }
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
  href="devguide/using-functional-components-in-pages/filter-components#model-filters"
  description="Advanced filtering component based on data models, supporting simple, complex and free filtering modes."
>
  <LinkGrid links={[
    { text: "Simple Filter", href: "devguide/using-functional-components-in-pages/filter-components#simple-filter" },
    { text: "Complex Filter", href: "devguide/using-functional-components-in-pages/filter-components#complex-filter" },
    { text: "Free Filter", href: "devguide/using-functional-components-in-pages/filter-components#free-filter" },
    { text: "Layout Settings", href: "devguide/using-functional-components-in-pages/filter-components#layout-settings" },
    { text: "Filter Usage", href: "devguide/using-functional-components-in-pages/filter-components#filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Universal Filter"
  href="devguide/using-functional-components-in-pages/filter-components#universal-filters"
  description="Flexible universal filtering component supporting custom field configuration and multiple trigger modes."
>
  <LinkGrid columns={2} links={[
    { text: "Filter Field Configuration", href: "devguide/using-functional-components-in-pages/filter-components#filter-field-configuration" },
    { text: "Quick Layout", href: "devguide/using-functional-components-in-pages/filter-components#quick-layout" },
    { text: "Show Query/Reset Buttons", href: "devguide/using-functional-components-in-pages/filter-components#show-query-reset-buttons" },
    { text: "Condition Change Trigger Query", href: "devguide/using-functional-components-in-pages/filter-components#condition-change-trigger-query" },
    { text: "First Load Filter", href: "devguide/using-functional-components-in-pages/filter-components#first-load-filter" },
    { text: "Filter Usage", href: "devguide/using-functional-components-in-pages/filter-components#universal-filter-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Calendar"
  href="devguide/using-functional-components-in-pages/time-management-components#calendar"
  description="Schedule management and time arrangement component supporting event creation, editing, and view switching."
>
  <LinkGrid columns={2} links={[
    { text: "Data Model Preparation and Component Creation", href: "devguide/using-functional-components-in-pages/time-management-components#data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#basic-configuration" },
    { text: "Schedule Type", href: "devguide/using-functional-components-in-pages/time-management-components#schedule-type" },
    { text: "Day/Week/Month View Switch", href: "devguide/using-functional-components-in-pages/time-management-components#day-week-month-view-switch" },
    { text: "Switch Time", href: "devguide/using-functional-components-in-pages/time-management-components#switch-time" },
    { text: "List Display and Search", href: "devguide/using-functional-components-in-pages/time-management-components#list-display-and-search" },
    { text: "Drag Schedule", href: "devguide/using-functional-components-in-pages/time-management-components#drag-schedule" },
    { text: "Button Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#button-configuration" },
    { text: "Refresh Data on First Component Load", href: "devguide/using-functional-components-in-pages/time-management-components#refresh-data-on-first-component-load" },
    { text: "New Schedule", href: "devguide/using-functional-components-in-pages/time-management-components#new-schedule" },
    { text: "Drag Agenda", href: "devguide/using-functional-components-in-pages/time-management-components#drag-agenda" }
  ]} />
</IndexCard>

<IndexCard
  title="Timeline"
  href="devguide/using-functional-components-in-pages/time-management-components#timeline"
  description="Timeline display component suitable for showing historical records and process progress."
>
  <LinkGrid links={[
    { text: "Data Model Preparation and Component Creation", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-basic-configuration" },
    { text: "Color Type", href: "devguide/using-functional-components-in-pages/time-management-components#color-type" },
    { text: "Position", href: "devguide/using-functional-components-in-pages/time-management-components#position" },
    { text: "Button Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-button-configuration" },
    { text: "Refresh Data on First Component Load", href: "devguide/using-functional-components-in-pages/time-management-components#timeline-refresh-data-on-first-component-load" }
  ]} />
</IndexCard>

<IndexCard
  title="Gantt Chart"
  href="devguide/using-functional-components-in-pages/time-management-components#gantt-chart"
  description="Project management and progress tracking component supporting task dependencies and progress visualization."
>
  <LinkGrid columns={2} links={[
    { text: "Data Model Preparation and Component Creation", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-data-model-preparation-and-component-creation" },
    { text: "Basic Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-basic-configuration" },
    { text: "Progress", href: "devguide/using-functional-components-in-pages/time-management-components#progress" },
    { text: "Hierarchical Relationship", href: "devguide/using-functional-components-in-pages/time-management-components#hierarchical-relationship" },
    { text: "Sequential Relationship", href: "devguide/using-functional-components-in-pages/time-management-components#sequential-relationship" },
    { text: "Day/Week/Month/Quarter/Year View Switch", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-view-switch" },
    { text: "List Display Fields", href: "devguide/using-functional-components-in-pages/time-management-components#list-display-fields" },
    { text: "Floating Layer Display Fields", href: "devguide/using-functional-components-in-pages/time-management-components#floating-layer-display-fields" },
    { text: "Button Configuration", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-button-configuration" },
    { text: "Refresh Data on First Component Load", href: "devguide/using-functional-components-in-pages/time-management-components#gantt-refresh-data-on-first-component-load" },
    { text: "Drag Date Progress", href: "devguide/using-functional-components-in-pages/time-management-components#drag-date-progress" },
    { text: "Allow Add Schedule", href: "devguide/using-functional-components-in-pages/time-management-components#allow-add-schedule" }
  ]} />
</IndexCard>

<IndexCard
  title="Button Components"
  href="devguide/using-functional-components-in-pages/button-components"
  description="Various types of button components supporting different styles and interactive effects."
>
  <LinkGrid columns={2} links={[
    { text: "Button Component Creation", href: "devguide/using-functional-components-in-pages/button-components#button-component-creation" },
    { text: "Button Title/Icon/Type/Size Configuration", href: "devguide/using-functional-components-in-pages/button-components#title-icon-type-configuration" },
    { text: "Button Click Event", href: "devguide/using-functional-components-in-pages/button-components#click-event" }
  ]} />
</IndexCard>

<IndexCard
  title="Layout Components (Editing in Progress)"
  href="devguide/using-functional-components-in-pages/layout-components"
  description="Page layout and container components including popups, tabs and other interface structural elements."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Documentation is being improved, please stay tuned...
  </div>
</IndexCard>

<IndexCard
  title="Approval Components"
  href="devguide/using-functional-components-in-pages/approval-components"
  description="UI components related to approval processes, supporting application initiation and approval processing."
>
  <LinkGrid columns={2} links={[
    { text: "Create Initiate Application Component", href: "devguide/using-functional-components-in-pages/approval-components#create-initiate-application-component" },
    { text: "Parameter Configuration for Initiate Application", href: "devguide/using-functional-components-in-pages/approval-components#parameter-configuration-1" },
    { text: "Post-processing/Refresh Event for Initiate Application", href: "devguide/using-functional-components-in-pages/approval-components#post-processing-refresh-event" },
    { text: "Create Approval Process Component", href: "devguide/using-functional-components-in-pages/approval-components#create-approval-workflow-component" },
    { text: "Parameter Configuration for Approval Processing", href: "devguide/using-functional-components-in-pages/approval-components#parameter-configuration-2" },
    { text: "Keep Historical Approval Records", href: "devguide/using-functional-components-in-pages/approval-components#keep-historical-approval-records" },
    { text: "Post-processing/Refresh Event for Approval Processing", href: "devguide/using-functional-components-in-pages/approval-components#post-processing-refresh-event-1" }
  ]} />
</IndexCard>

<IndexCard
  title="Payment Components"
  href="devguide/using-functional-components-in-pages/payment-components"
  description="Components integrating payment functionality, supporting multiple payment methods and payment flows."
>
  <LinkGrid links={[
    { text: "Create Component", href: "devguide/using-functional-components-in-pages/payment-components#payment-component-creation" },
    { text: "Component Functions", href: "devguide/using-functional-components-in-pages/payment-components#initiate-payment-function" },
    { text: "Component Event Logic", href: "devguide/using-functional-components-in-pages/payment-components#event-logic" },
    { text: "Component Usage", href: "devguide/using-functional-components-in-pages/payment-components#component-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Parsing and Import"
  href="devguide/using-functional-components-in-pages/data-parsing-and-import"
  description="Powerful data import and parsing tools supporting Excel file batch import, data cleaning, conditional filtering, and master-detail table association import."
>
  <LinkGrid columns={2} links={[
    { text: "Import Component", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-component" },
    { text: "Adding Import Component to Page", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#add-import-component-to-page" },
    { text: "Import Serial Number Fields", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-serial-number-fields" },
    { text: "Set Required Fields", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#set-required-fields" },
    { text: "Import Subtable Data", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-subtable-data" },
    { text: "Append Import/Update Import", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#append-import-or-update-import" },
    { text: "Import Data by Conditions", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-data-by-conditions" },
    { text: "Add Import Description Text", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#add-import-description-text" },
    { text: "Pre-processing/Post-trigger Functions", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#pre-processing-and-post-trigger-functions" },
    { text: "Import Hint Button Click Event", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#import-hint-button-click-event" },
    { text: "Parse Excel", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#parse-excel" },
    { text: "Create Parse Excel Component", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#create-parse-excel-component" },
    { text: "Configure Field Aliases", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#configure-field-aliases" },
    { text: "Adjust Field Order", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#adjust-field-order" },
    { text: "Delete Parse Fields", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#delete-parse-fields" },
    { text: "Create Custom Buttons", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#create-custom-buttons" },
    { text: "Post-parse Events", href: "devguide/using-functional-components-in-pages/data-parsing-and-import#post-parse-events" }
  ]} />
</IndexCard>

<IndexCard
  title="Full Code Components"
  href="devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications"
  description="Fully customized code components supporting highly personalized function implementation."
>
  <LinkGrid columns={2} links={[
    { text: "Component Interface Specifications", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications" },
    { text: "Component Interface Architecture", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#component-interface-architecture" },
    { text: "Core Interface Definitions", href: "devguide/fullcode-ui-components-in-pages/ui-component-interface-specifications#core-interface-definitions" },
    { text: "Calling Page and Component Functions", href: "devguide/fullcode-ui-components-in-pages/calling-page-and-component-functions-in-fullcode-components" },
    { text: "Emitting Events", href: "devguide/fullcode-ui-components-in-pages/emitting-events" },
    { text: "Event Subscription Principles", href: "devguide/fullcode-ui-components-in-pages/emitting-events#event-subscription-principles" },
    { text: "Bidirectional Communication", href: "devguide/fullcode-ui-components-in-pages/emitting-events#bidirectional-communication-example" },
    { text: "Calling Component Functions in Page Code", href: "devguide/fullcode-ui-components-in-pages/calling-fullcode-component-functions-in-page-code" }
  ]} />
</IndexCard>

</div>

<div style={{textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999'}}>
  Click "View More Components" above to collapse
</div>

  </details>
</div>

## AI large language models {#ai-large-language-models}
Integrate mainstream large language models such as GPT-4, Claude, and Tongyi Qianwen. Support multi-vendor disaster recovery and private deployment to provide applications with AI capabilities including intelligent dialogue, text generation, and code assistance.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Create AI Large Language Model Element"
  href="devguide/ai-llm/create-ai-llm"
  description="Learn how to integrate mainstream large language models, configure API keys, implement retry mechanisms, and call LLM functions in your applications."
>
  <LinkGrid links={[
    { text: "Mainstream LLM Vendor Support List", href: "devguide/ai-llm/create-ai-llm#mainstream-llm-vendor-support-list" },
    { text: "Create LLM Vendor Element", href: "devguide/ai-llm/create-ai-llm#creating-llm-vendor-elements" },
    { text: "Retry and Backup API Key Mechanism", href: "devguide/ai-llm/create-ai-llm#retry-backup-api-key-mechanism" },
    { text: "Private LLM Integration", href: "devguide/ai-llm/create-ai-llm#private-llm-integration" }
  ]} />
</IndexCard>

<IndexCard
  title="LLM Input and Output"
  href="devguide/ai-llm/llm-input-output"
  description="Understand the input and output configurations of large language models for optimal integration and performance."
>
  <LinkGrid links={[
    { text: "Calling LLM in Pages", href: "devguide/ai-llm/llm-input-output#call-llm-in-pages" },
    { text: "Calling LLM in Backend Functions", href: "devguide/ai-llm/llm-input-output#call-llm-in-backend-functions" },
    { text: "LLM Programming Interface", href: "devguide/ai-llm/llm-input-output#llm-programming-interface" }
  ]} />
</IndexCard>

<IndexCard
  title="Implement multimodal AIGC using LLM functions"
  href="devguide/ai-llm/implement-multimodal-aigc"
  description="Discover how to leverage LLM functions to create multimodal AI-generated content with text, images, and other media types."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI knowledge base {#ai-knowledge-base}
Transform enterprise documents, manuals, and FAQs into intelligent knowledge bases. Support automatic document processing, intelligent segmentation, and semantic retrieval to enable AI to answer questions accurately based on enterprise knowledge.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Knowledge Base Elements"
  href="devguide/knowledge-base/create-knowledge-elements"
  description="Learn how to create AI Knowledge Base elements and understand their working principles."
>
  <LinkGrid columns={2} links={[
    { text: "Creating AI Knowledge Base Elements", href: "devguide/knowledge-base/create-knowledge-elements#create-ai-knowledge-base-element" },
    { text: "Principle Description", href: "devguide/knowledge-base/create-knowledge-elements#principle-description" },
    { text: "Core Components", href: "devguide/knowledge-base/create-knowledge-elements#core-components" },
    { text: "System Architecture", href: "devguide/knowledge-base/create-knowledge-elements#system-architecture" },
    { text: "Technical Principles", href: "devguide/knowledge-base/create-knowledge-elements#technical-principles" },
    { text: "Data Processing Flow", href: "devguide/knowledge-base/create-knowledge-elements#data-processing-flow" },
    { text: "Retrieval Mechanism", href: "devguide/knowledge-base/create-knowledge-elements#retrieval-mechanism" }
  ]} />
</IndexCard>

<IndexCard
  title="Knowledge Base Document Management"
  href="devguide/knowledge-base/knowledge-base-document-management"
  description="Manage knowledge base documents, configure knowledge base parameters, perform query testing and vectorization tuning."
>
  <LinkGrid columns={2} links={[
    { text: "AI Knowledge Base Settings", href: "devguide/knowledge-base/knowledge-base-document-management#ai-knowledge-base-settings" },
    { text: "Query Testing", href: "devguide/knowledge-base/knowledge-base-document-management#query-testing" },
    { text: "Vectorization Configuration Description", href: "devguide/knowledge-base/knowledge-base-document-management#vectorization-configuration-description" },
    { text: "Knowledge Base Configuration Parameter Description", href: "devguide/knowledge-base/knowledge-base-document-management#knowledge-base-configuration-parameter-description" }
  ]} />
</IndexCard>

<IndexCard
  title="Full-Text and Semantic Search Using Knowledge Base Elements"
  href="devguide/knowledge-base/full-text-and-semantic-search"
  description="Understand how configuration items participate in query flow and call knowledge base in backend visual programming."
>
  <LinkGrid columns={2} links={[
    { text: "Callling AI Knowledge Base in Backend Visual Programming", href: "devguide/knowledge-base/full-text-and-semantic-search#call-ai-knowledge-base-in-backend-visual-programming" },
    { text: "Semantic Search", href: "devguide/knowledge-base/full-text-and-semantic-search#semantic-search" },
    { text: "Adding Document", href: "devguide/knowledge-base/full-text-and-semantic-search#adding-document" },
    { text: "Deleting Document", href: "devguide/knowledge-base/full-text-and-semantic-search#deleting-document" },
    { text: "Searching by Keywords", href: "devguide/knowledge-base/full-text-and-semantic-search#searching-by-keywords" },
    { text: "How AI Knowledge Base Settings Participate in Query Flow", href: "devguide/knowledge-base/full-text-and-semantic-search#how-ai-knowledge-base-settings-participate-in-query-flow" }
  ]} />
</IndexCard>

<IndexCard
  title="Integrating Knowledge Base into Agent"
  href="devguide/knowledge-base/integrate-knowledge-base-into-agent"
  description="Integrate knowledge base into Agent to implement RAG."
>
  <LinkGrid links={[
    { text: "Relationship Between Knowledge Base and Agent", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#relationship-between-knowledge-base-and-agent" },
    { text: "Technical Integration Principle", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#technical-integration-principle" },
    { text: "Integration Modes", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#integration-modes" },
    { text: "Using Knowledge Base in Agent", href: "devguide/knowledge-base/integrate-knowledge-base-into-agent#use-knowledge-base-in-agent" }
  ]} />
</IndexCard>

<IndexCard
  title="Vector Database Standalone Deployment"
  href="devguide/knowledge-base/vector-database-standalone-deployment"
  description="Intelligent storage engine for enterprise knowledge. Convert text into vector data to achieve semantic-level precise search."
>
  <LinkGrid columns={2} links={[
    { text: "Standalone Deployment Solution: Chroma Vector Database", href: "devguide/knowledge-base/vector-database-standalone-deployment#chroma-standalone-deployment" },
    { text: "Advantages of Standalone Deployment", href: "devguide/knowledge-base/vector-database-standalone-deployment#advantages-of-standalone-deployment" },
    { text: "Chroma Standalone Deployment Installation", href: "devguide/knowledge-base/vector-database-standalone-deployment#chroma-installation" },
    { text: "Connecting to Standalone Chroma Database", href: "devguide/knowledge-base/vector-database-standalone-deployment#connect-to-standalone-chroma" },
    { text: "Development Testing Environment: Local Configuration", href: "devguide/knowledge-base/vector-database-standalone-deployment#local-development-config" },
    { text: "Vector Database Programming Interface", href: "devguide/knowledge-base/vector-database-standalone-deployment#vector-database-programming-interface" },
    { text: "health_check", href: "devguide/knowledge-base/vector-database-standalone-deployment#health_check" },
    { text: "create_collection", href: "devguide/knowledge-base/vector-database-standalone-deployment#create_collection" },
    { text: "add_vectors", href: "devguide/knowledge-base/vector-database-standalone-deployment#add_vectors" },
    { text: "query_vectors", href: "devguide/knowledge-base/vector-database-standalone-deployment#query_vectors" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Knowledge Base API Exposure"
  href="devguide/knowledge-base/ai-knowledge-base-api-exposure"
  description="Expose AI Knowledge Base capabilities through API interfaces for external system integration."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI agent {#ai-agent}
Intelligent agents with reasoning and action capabilities. Through prompts and tool configuration, enable AI to autonomously analyze problems, formulate solutions, and execute tasks to handle complex business scenarios.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating AI Agents"
  href="devguide/ai-agent/create-ai-agent"
  description="Learn how to create ReActAgents, configure system prompts, select large language models, write descriptions, and configure runtime state storage."
>
  <LinkGrid columns={2} links={[
    { text: "Creating a ReActAgent", href: "devguide/ai-agent/create-ai-agent#creating-react-agent" },
    { text: "Writing system prompts", href: "devguide/ai-agent/create-ai-agent#writing-system-prompts" },
    { text: "Selecting models and configuring parameters", href: "devguide/ai-agent/create-ai-agent#selecting-models-configuring-parameters" },
    { text: "Writing agent descriptions", href: "devguide/ai-agent/create-ai-agent#writing-agent-descriptions" },
    { text: "Configuring runtime state storage", href: "devguide/ai-agent/create-ai-agent#configuring-runtime-state-storage" },
    { text: "Memory storage", href: "devguide/ai-agent/create-ai-agent#memory-storage" },
    { text: "Database storage", href: "devguide/ai-agent/create-ai-agent#database-storage" },
    { text: "Modifying agents in source code mode", href: "devguide/ai-agent/create-ai-agent#modifying-agents-source-code-mode" },
    { text: "Custom callback processors", href: "devguide/ai-agent/create-ai-agent#custom-callback-processors" }
  ]} />
</IndexCard>

<IndexCard
  title="Tools in Agent"
  href="devguide/ai-agent/agent-tools"
  description="Learn how to add and manage various tools in Agent, including model functions, service functions, MCP services, external APIs, and page functions."
>
  <LinkGrid columns={2} links={[
    { text: "Calling model functions", href: "devguide/ai-agent/agent-tools#calling-model-functions" },
    { text: "Calling service functions", href: "devguide/ai-agent/agent-tools#calling-service-functions" },
    { text: "Calling MCP servers", href: "devguide/ai-agent/agent-tools#calling-mcp-servers" },
    { text: "Converting MCP configuration to environment variable", href: "devguide/ai-agent/agent-tools#converting-mcp-config-to-environment-variable" },
    { text: "Calling external APIs", href: "devguide/ai-agent/agent-tools#calling-external-apis" },
    { text: "Calling page functions", href: "devguide/ai-agent/agent-tools#calling-page-functions" },
    { text: "Tool function management", href: "devguide/ai-agent/agent-tools#tool-function-management" },
    { text: "Enabling/disabling tool functions", href: "devguide/ai-agent/agent-tools#enabling-disabling-tool-functions" },
    { text: "Tool function call pre/post event triggering", href: "devguide/ai-agent/agent-tools#tool-function-call-pre-post-event-triggering" },
    { text: "Manual confirmation before tool execution", href: "devguide/ai-agent/agent-tools#manual-confirmation-before-tool-execution" },
    { text: "Restricting user roles for tool calls", href: "devguide/ai-agent/agent-tools#restricting-user-roles-for-tool-calls" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent Input and Output"
  href="devguide/ai-agent/agent-input-output"
  description="Master Agent's input variable configuration, output result settings, streaming output, and various calling methods."
>
  <LinkGrid columns={2} links={[
    { text: "Configuring input variables", href: "devguide/ai-agent/agent-input-output#configuring-input-variables" },
    { text: "Using variables in prompts", href: "devguide/ai-agent/agent-input-output#using-variables-in-prompts" },
    { text: "Configuring output results", href: "devguide/ai-agent/agent-input-output#configuring-output-results" },
    { text: "Output result data types", href: "devguide/ai-agent/agent-input-output#output-result-data-types" },
    { text: "Agent streaming output", href: "devguide/ai-agent/agent-input-output#agent-streaming-output" },
    { text: "Calling Agent in frontend functions", href: "devguide/ai-agent/agent-input-output#calling-agent-in-frontend-functions" },
    { text: "Calling Agent in backend service functions", href: "devguide/ai-agent/agent-input-output#calling-agent-in-backend-service-functions" },
    { text: "Testing Agent in page assistant", href: "devguide/ai-agent/agent-input-output#testing-agent-in-page-assistant" }
  ]} />
</IndexCard>

<IndexCard
  title="Using Knowledge Base for Retrieval-Augmented Generation (RAG)"
  href="devguide/ai-agent/agent-knowledge-base"
  description="Learn how to integrate knowledge bases with Agent to implement RAG functionality for enhanced response accuracy."
>
  <LinkGrid links={[
    { text: "Adding knowledge bases in Agent", href: "devguide/ai-agent/agent-knowledge-base#integrate-knowledge-base-rag" }
  ]} />
</IndexCard>

<IndexCard
  title="Implement Single-Task Intelligent Agent with Agent"
  href="devguide/ai-agent/single-task-intelligent-agent"
  description="Learn how to use Agent to implement specialized single-task intelligent agents for optimized business scenario handling."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Agent API Exposure"
  href="devguide/ai-agent/agent-api-exposure"
  description="Expose Agent capabilities through API interfaces for external system integration."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## AI assistant {#ai-assistant}
Visual intelligent workflow engine. Orchestrate business processes through drag-and-drop nodes, combining AI decision-making and human-machine interaction to achieve intelligent automation in scenarios such as customer service, approval, and data processing.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating AI Assistant Elements"
  href="devguide/ai-assistant/create-ai-assistant"
  description="Learn how to create AI assistant elements, configure workflows, node types, and event handling for intelligent business process automation."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="Process Orchestration and Node Configuration"
  href="devguide/ai-assistant/process-orchestration-node-configuration"
  description="Deep dive into AI assistant process orchestration technology and detailed node configuration methods."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="AI Assistant Input and Output"
  href="devguide/ai-assistant/ai-assistant-input-output"
  description="Understand AI assistant input and output configuration and data processing methods."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

<IndexCard
  title="AI Assistant API Integration"
  href="devguide/ai-assistant/ai-assistant-api-exposure"
  description="Expose AI assistant capabilities through API interfaces for integration with external systems."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>
</div>

## Data modeling {#data-modeling}
Design a powerful data foundation for your application. Create data tables, design field types, and establish relationships through visual methods without complex SQL knowledge. Make data management easy and efficient.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Data Table Model"
  href="devguide/data-modeling/data-table-model"
  description="Basic structure of application data, learn how to create and configure data tables, design field types and constraints."
>
  <LinkGrid links={[
    { text: "Create Data Table Model", href: "devguide/data-modeling/data-table-model" },
    { text: "Design Table Fields and Data Types", href: "devguide/data-modeling/data-table-model#design-table-fields-and-data-types" },
    { text: "Configure Table Index Optimization", href: "devguide/data-modeling/data-table-model#configure-table-index-optimization" }
  ]} />
</IndexCard>

<IndexCard
  title="Creating Tables from Existing Database Schema"
  href="devguide/data-modeling/create-data-table-from-existing-tables"
  description="Quickly create data table elements from existing database tables, supporting rapid model generation."
>
  <LinkGrid links={[
    { text: "Creating Tables from Existing Database Schema", href: "devguide/data-modeling/create-data-table-from-existing-tables" },
  ]} />
</IndexCard>

<IndexCard
  title="Built-in Data Management Tools"
  href="devguide/data-modeling/built-in-data-management-tools"
  description="Utilize built-in data management tools for efficient data operations and administration."
>
  <LinkGrid links={[
    { text: "Built-in Data Management Tools", href: "devguide/data-modeling/built-in-data-management-tools" },
  ]} />
</IndexCard>

<IndexCard
  title="Creating Data Model Functions"
  href="devguide/data-modeling/create-data-model-functions"
  description="Design and implement custom data model functions to extend data processing capabilities."
>
  <LinkGrid links={[
    { text: "Creating Data Model Functions", href: "devguide/data-modeling/create-data-model-functions" },
  ]} />
</IndexCard>

<IndexCard
  title="Aggregate Table Model"
  href="devguide/data-modeling/aggregate-table-model"
  description="Multi-table data integration and statistical analysis, supporting complex data aggregation and calculation functions."
>
  <LinkGrid columns={2} links={[
    { text: "Create Aggregate Table Model", href: "devguide/data-modeling/aggregate-table-model" },
    { text: "Multi-table Data Merge", href: "devguide/data-modeling/aggregate-table-model#multi-table-data-merge" },
    { text: "Multi-table Horizontal Connection", href: "devguide/data-modeling/aggregate-table-model#multi-table-horizontal-connection" },
    { text: "Group Aggregate Statistics", href: "devguide/data-modeling/aggregate-table-model#group-aggregate-statistics" },
    { text: "Extend Custom Calculation Fields", href: "devguide/data-modeling/aggregate-table-model#extend-custom-calculation-fields" },
    { text: "Aggregate Then Filter", href: "devguide/data-modeling/aggregate-table-model#aggregate-then-filter" },
    { text: "Filter Then Aggregate (Recommended)", href: "devguide/data-modeling/aggregate-table-model#aggregate-then-filter" }
  ]} />
</IndexCard>

<IndexCard
  title="Extended Table Model"
  href="devguide/data-modeling/extended-table-model"
  description="Data extension based on existing tables, implementing business field extension and multi-table data integration through association with other data tables."
>
  <LinkGrid columns={2} links={[
    { text: "Extended Table Creation", href: "devguide/data-modeling/extended-table-model" },
    { text: "Connection Design", href: "devguide/data-modeling/extended-table-model#connection-design" },
    { text: "Set Baseline Table Filter Conditions", href: "devguide/data-modeling/extended-table-model#set-baseline-table-filter-conditions" },
    { text: "Add Data Table", href: "devguide/data-modeling/extended-table-model#add-data-table" },
    { text: "Real-time Edit Statistics Table Configuration", href: "devguide/data-modeling/extended-table-model#real-time-edit-statistics-table-configuration" },
    { text: "Field Statistics", href: "devguide/data-modeling/extended-table-model#field-statistics" },
    { text: "Add Formula Field", href: "devguide/data-modeling/extended-table-model#add-formula-field" },
    { text: "Modify Field Alias", href: "devguide/data-modeling/extended-table-model#modify-field-alias" },
    { text: "Function Design", href: "devguide/data-modeling/extended-table-model#function-design" },
    { text: "Create Function", href: "devguide/data-modeling/extended-table-model#create-function" },
    { text: "Source Code View Edit", href: "devguide/data-modeling/extended-table-model#source-code-view-edit" }
  ]} />
</IndexCard>

<IndexCard
  title="Using Data Models in Pages and Functions"
  href="devguide/data-modeling/calling-data-models-in-pages-and-functions"
  description="Learn how to effectively use data models in frontend pages and backend function logic for data operations."
>
  <LinkGrid columns={2} links={[
    { text: "Built-in Model Functions", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#built-in-model-functions" },
    { text: "Calling Data Models in Pages", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-pages" },
    { text: "Calling Data Models in Functions", href: "devguide/data-modeling/calling-data-models-in-pages-and-functions#calling-data-models-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Object Model"
  href="devguide/data-modeling/data-object-model"
  description="Data structure designed specifically for full-code development, similar to DTO, used for structured data expression and transmission in business logic."
>
  <LinkGrid links={[
    { text: "Creating Data Object Model", href: "devguide/data-modeling/data-object-model#creating-data-object-model" },
    { text: "Using Data Object Model", href: "devguide/data-modeling/data-object-model#using-data-object-model" },
    { text: "Customizing Fields", href: "devguide/data-modeling/data-object-model#customizing-fields" },
    { text: "Overriding Model Functions", href: "devguide/data-modeling/data-object-model#overriding-model-functions" },
    { text: "Defining New Functions", href: "devguide/data-modeling/data-object-model#defining-new-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Data Models with AI Agents"
  href="devguide/data-modeling/calling-data-models-in-ai-agent"
  description="Add data model functions as Agent tools, enabling AI to intelligently perform CRUD operations and automated data processing."
>
  <LinkGrid links={[
    { text: "Data models as Agent tools", href: "devguide/data-modeling/calling-data-models-in-ai-agent#data-models-as-agent-tools" }
  ]} />
</IndexCard>


<IndexCard
  title="Managing Database Connections"
  href="devguide/data-modeling/manage-database-connections"
  description="Configure and manage multiple database connections, supporting multi-data source application development."
>
  <LinkGrid links={[
    { text: "Creating database connections", href: "devguide/data-modeling/manage-database-connections#create-database-connection" },
    { text: "Multi-database connection management", href: "devguide/data-modeling/manage-database-connections#multi-database-connection-management" },
    { text: "Database connection security configuration", href: "devguide/data-modeling/manage-database-connections#database-connection-security-configuration" },
    { text: "Connection testing and troubleshooting", href: "devguide/data-modeling/manage-database-connections#connection-test-and-troubleshooting" }
  ]} />
</IndexCard>

<IndexCard
  title="Supported Database Vendors"
  href="devguide/data-modeling/supported-database-vendors"
  description="Learn about various database types and connection configurations supported by JitAi."
>
  <LinkGrid links={[
    { text: "Scenario selection recommendations", href: "devguide/data-modeling/supported-database-vendors#scenario-selection-recommendations" },
    { text: "Cloud vendor compatibility", href: "devguide/data-modeling/supported-database-vendors#cloud-vendor-compatibility" },
    { text: "Database element usage", href: "devguide/data-modeling/supported-database-vendors#database-element-usage" }
  ]} />
</IndexCard>

</div>

## Transaction management {#transaction-management}
Ensure data consistency and reliability in complex business operations. Master database transaction control mechanisms, implement atomic operations, and handle concurrent access scenarios effectively.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Transaction Management"
  href="devguide/data-modeling/transaction-management"
  description="Database transaction control and consistency management to ensure reliability of data operations."
>
  <LinkGrid links={[
    { text: "Default transaction management mechanism", href: "devguide/data-modeling/transaction-management#default-transaction-management-mechanism" },
    { text: "Manual transaction commit/rollback", href: "devguide/data-modeling/transaction-management#manual-transaction-commit-rollback" },
    { text: "Transaction decorator", href: "devguide/data-modeling/transaction-management#transaction-decorator" }
  ]} />
</IndexCard>

</div>

## User and permission management {#user-permission-management}
Build a secure and reliable user system. Support multiple login methods, flexible organizational structure design, and fine-grained permission allocation. Enable different users to perform their respective duties while ensuring data security and operational compliance.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Organization"
  href="devguide/user-and-permission/organization"
  description="Enterprise organization management, including department, position and personnel hierarchical relationship configuration."
>
  <LinkGrid links={[
    { text: "Default Organization", href: "devguide/user-and-permission/organization#default-organization" },
    { text: "Creating organizations", href: "devguide/user-and-permission/organization#creating-organizations" },
    { text: "Generic organization", href: "devguide/user-and-permission/organization#generic-organization" },
    { text: "Allowing new users to join", href: "devguide/user-and-permission/organization#allowing-new-users-to-join" },
    { text: "DingTalk Self-built Org.", href: "devguide/user-and-permission/organization#dingtalk-custom-organization" },
    { text: "WeCom Self-built Org.", href: "devguide/user-and-permission/organization#wechat-work-custom-organization" },
    { text: "Microsoft Teams", href: "devguide/user-and-permission/organization#microsoft-teams" },
    { text: "Contact management entry", href: "devguide/user-and-permission/organization#contact-management-entry" },
    { text: "Setting organization leader", href: "devguide/user-and-permission/organization#setting-organization-leader" },
    { text: "Department member search", href: "devguide/user-and-permission/organization#department-member-search" },
    { text: "Generic organization contacts", href: "devguide/user-and-permission/organization#generic-organization-contacts" },
    { text: "Creating department", href: "devguide/user-and-permission/organization#creating-department" },
    { text: "Adding member", href: "devguide/user-and-permission/organization#adding-member" },
    { text: "Importing members", href: "devguide/user-and-permission/organization#importing-members" },
    { text: "Exporting members", href: "devguide/user-and-permission/organization#exporting-members" },
    { text: "Adjusting department", href: "devguide/user-and-permission/organization#adjusting-department" },
    { text: "Member resignation", href: "devguide/user-and-permission/organization#member-resignation" },
    { text: "Creating role", href: "devguide/user-and-permission/organization#creating-role" },
    { text: "Creating role group", href: "devguide/user-and-permission/organization#creating-role-group" },
    { text: "Managing role members", href: "devguide/user-and-permission/organization#managing-role-members" },
    { text: "DingTalk organization contacts", href: "devguide/user-and-permission/organization#dingtalk-organization-contacts" },
    { text: "Syncing DingTalk organization structure", href: "devguide/user-and-permission/organization#syncing-dingtalk-organization-structure" },
    { text: "Exporting members", href: "devguide/user-and-permission/organization#exporting-members-dingtalk" },
    { text: "WeCom organization contacts", href: "devguide/user-and-permission/organization#wechat-work-organization-contacts" },
    { text: "Syncing WeCom organization structure", href: "devguide/user-and-permission/organization#syncing-wechat-work-organization-structure" },
    { text: "Exporting members", href: "devguide/user-and-permission/organization#exporting-members-wechat-work" },
  ]} />
</IndexCard>

<IndexCard
  title="Login Authentication"
  href="devguide/user-and-permission/login-authentication"
  description="User identity verification and login method configuration, supporting multiple authentication modes."
>
  <LinkGrid links={[
    { text: "Creating Login Method", href: "devguide/user-and-permission/login-authentication#creating-login-method" },
    { text: "Account Password Login", href: "devguide/user-and-permission/login-authentication#account-password-login" },
    { text: "Mobile Phone Login", href: "devguide/user-and-permission/login-authentication#mobile-phone-login" },
    { text: "Alibaba Cloud SMS", href: "devguide/user-and-permission/login-authentication#aliyun-sms" },
    { text: "Twilio", href: "devguide/user-and-permission/login-authentication#twilio" },
    { text: "AWS SNS", href: "devguide/user-and-permission/login-authentication#aws-sns" },
    { text: "DingTalk Custom QR Login", href: "devguide/user-and-permission/login-authentication#dingtalk-custom-qr-login" },
    { text: "WeCom Custom QR Login", href: "devguide/user-and-permission/login-authentication#wechat-work-custom-qr-login" },
    { text: "WeChat Login", href: "devguide/user-and-permission/login-authentication#wechat-login" },
    { text: "WeChat Official Account Login", href: "devguide/user-and-permission/login-authentication#wechat-official-account-login" },
    { text: "WeChat Mini Program Login", href: "devguide/user-and-permission/login-authentication#wechat-mini-program-login" },
    { text: "Github Login", href: "devguide/user-and-permission/login-authentication#github-login" },
    { text: "Google Login", href: "devguide/user-and-permission/login-authentication#google-login" },
  ]} />
</IndexCard>

<IndexCard
  title="Role and Portal Menu Permissions"
  href="devguide/user-and-permission/role-portal-menu-permissions"
  description="Application role definition and permission allocation, implementing fine-grained access control."
>
  <LinkGrid columns={2} links={[
    { text: "Built-in application roles", href: "devguide/user-and-permission/role-portal-menu-permissions#built-in-three-application-roles" },
    { text: "Anonymous user", href: "devguide/user-and-permission/role-portal-menu-permissions#anonymous-user" },
    { text: "Developer", href: "devguide/user-and-permission/role-portal-menu-permissions#developer" },
    { text: "Administrator", href: "devguide/user-and-permission/role-portal-menu-permissions#administrator" },
    { text: "Creating application roles", href: "devguide/user-and-permission/role-portal-menu-permissions#create-application-role" },
    { text: "Application role permission configuration", href: "devguide/user-and-permission/role-portal-menu-permissions#application-role-permission-configuration" },
    { text: "Specifying accessible portals and menus", href: "devguide/user-and-permission/role-portal-menu-permissions#specify-accessible-portals-and-menus" },
    { text: "Managing application role members in the Developer Portal", href: "devguide/user-and-permission/role-portal-menu-permissions#manage-application-role-members-in-developer-portal" },
    { text: "Component button permission control", href: "devguide/user-and-permission/role-portal-menu-permissions#component-button-permission-control" },
    { text: "Component data field read/write/statistics permission control", href: "devguide/user-and-permission/role-portal-menu-permissions#component-data-field-access-control" },
    { text: "Hierarchical management of multiple application roles", href: "devguide/user-and-permission/role-portal-menu-permissions#hierarchical-management-of-multiple-application-roles" },
    { text: "Application role member management", href: "devguide/user-and-permission/role-portal-menu-permissions#application-role-member-management" },
    { text: "Member addition and removal", href: "devguide/user-and-permission/role-portal-menu-permissions#member-addition-and-removal" },
    { text: "Member management scope settings in organization", href: "devguide/user-and-permission/role-portal-menu-permissions#member-management-scope-settings-in-org" }
  ]} />
</IndexCard>

<IndexCard
  title="Roles and Business Element Permissions"
  href="devguide/user-and-permission/roles-and-business-element-permissions"
  description="Advanced role-based permission control for business elements, data models, and functional components."
>
  <LinkGrid links={[
    { text: "Portal-level data operation type and scope control", href: "devguide/user-and-permission/roles-and-business-element-permissions#portal-level-data-operation-type-and-scope-control" }
  ]} />
</IndexCard>

<IndexCard
  title="Agent Tool Permission Control"
  href="devguide/user-and-permission/agent-tool-permission-control"
  description="Configure and manage permission control for AI Agent tools, ensuring secure and controlled agent operations."
>
  <LinkGrid links={[
    { text: "Configuring Agent tool execution permissions", href: "devguide/user-and-permission/agent-tool-permission-control#configure-agent-tool-execution-permissions" }
  ]} />
</IndexCard>

</div>

## Business logic development {#business-logic-development}
Empower applications with powerful business processing capabilities. Handle complex business rules through visual programming, respond to user operations, and execute background tasks. Make logic writing as intuitive and easy to understand as building blocks.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Service Elements"
  href="devguide/business-logic-development/creating-service-elements"
  description="Backend business logic implementation, encapsulating reusable business functions through service elements, providing API interfaces and data processing services."
>
  <LinkGrid columns={2} links={[
    { text: "Creating service functions", href: "devguide/business-logic-development/creating-service-elements#create-service-functions" },
    { text: "Editing service functions in source code mode", href: "devguide/business-logic-development/creating-service-elements#edit-service-functions-source-code-mode" },
    { text: "Adding new dependency libraries", href: "devguide/business-logic-development/creating-service-elements#add-new-dependency-library" },
    { text: "Using cross-app service elements to call authorized APIs", href: "devguide/business-logic-development/creating-service-elements#use-cross-app-service-elements-to-call-authorized-apis" },
    { text: "Creating cross-app service elements", href: "devguide/business-logic-development/creating-service-elements#create-cross-app-service-elements" },
    { text: "Using cross-app service elements in function logic", href: "devguide/business-logic-development/creating-service-elements#use-cross-app-service-elements-in-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Elements in Service Functions"
  href="devguide/business-logic-development/calling-other-elements-in-service-functions"
  description="Learn how to call other elements from service functions, including models, other services, external APIs, and system components for comprehensive business logic implementation."
>
  <LinkGrid columns={2} links={[
    { text: "Using platform APIs to call other elements", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#use-platform-api-to-call-other-elements" },
    { text: "Typical examples", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#typical-examples" },
    { text: "Calling data model functions", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-data-model-function" },
    { text: "Calling other service functions", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-other-service-functions" },
    { text: "Calling external APIs", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-external-api" },
    { text: "Calling AI large language models", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-ai-llm" },
    { text: "Calling AI agents", href: "devguide/business-logic-development/calling-other-elements-in-service-functions#call-ai-agent" }
  ]} />
</IndexCard>

<IndexCard
  title="Service Elements Usage Scenarios"
  href="devguide/business-logic-development/service-elements-usage-scenarios"
  description="Explore practical usage scenarios and best practices for service elements across different business contexts and application architectures."
>
  <LinkGrid links={[
    { text: "Where service functions are used", href: "devguide/business-logic-development/service-elements-usage-scenarios#where-service-functions-are-used" },
    { text: "Helping AI understand service functions accurately", href: "devguide/business-logic-development/service-elements-usage-scenarios#help-ai-understand-service-functions" }
  ]} />
</IndexCard>

<IndexCard
  title="Background Tasks"
  href="devguide/business-logic-development/background-tasks"
  description="Scheduled tasks and asynchronous processing, supporting complex background business processes."
>
  <LinkGrid columns={2} links={[
    { text: "Creating Tasks", href: "devguide/business-logic-development/background-tasks#creating-tasks" },
    { text: "Scheduled Tasks", href: "devguide/business-logic-development/background-tasks#scheduled-tasks" },
    { text: "Date Field Tasks", href: "devguide/business-logic-development/background-tasks#date-field-tasks" },
    { text: "General Configuration Items", href: "devguide/business-logic-development/background-tasks#general-configuration-items" },
    { text: "Developing Task Execution Functions", href: "devguide/business-logic-development/background-tasks#developing-task-execution-functions" },
    { text: "Viewing Execution Records", href: "devguide/business-logic-development/background-tasks#viewing-execution-records" },
    { text: "Source Code Mode", href: "devguide/business-logic-development/background-tasks#source-code-mode" }
  ]} />
</IndexCard>

<IndexCard
  title="Event Handling"
  href="devguide/business-logic-development/event-handling"
  description="System event monitoring and processing mechanism, implementing reactive business logic."
>
  <LinkGrid columns={2} links={[
    { text: "Creating Events", href: "devguide/business-logic-development/event-handling#creating-events" },
    { text: "Model Events", href: "devguide/business-logic-development/event-handling#model-events" },
    { text: "Approval Events", href: "devguide/business-logic-development/event-handling#approval-events" },
    { text: "Custom Events", href: "devguide/business-logic-development/event-handling#custom-events" },
    { text: "AI-Assistant Events", href: "devguide/business-logic-development/event-handling#ai-assistant-events" },
    { text: "Agent Tool Call Events", href: "devguide/business-logic-development/event-handling#agent-tool-call-events" },
    { text: "Replacing Event Internal Function with Service Function", href: "devguide/business-logic-development/event-handling#replacing-event-internal-function-with-service-function" },
    { text: "Enabling Events", href: "devguide/business-logic-development/event-handling#enabling-events" },
    { text: "Executing Events Synchronously/Asynchronously", href: "devguide/business-logic-development/event-handling#executing-events-synchronously-asynchronously" },
    { text: "Viewing Event Execution Records", href: "devguide/business-logic-development/event-handling#viewing-event-execution-records" },
    { text: "Viewing/Editing Full Code", href: "devguide/business-logic-development/event-handling#viewing-editing-full-code" }
  ]} />
</IndexCard>

</div>

## Approval process {#approval-process}
Make enterprise approval processes efficient and orderly. Design flowcharts through drag-and-drop, configure approvers and conditions, and automate process flow. Say goodbye to tedious paper approvals and embrace digital office work.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Approval Process Basic Configuration"
  href="devguide/approval-workflow/approval-workflow-basic-configuration"
  description="Creation and basic settings of approval processes, including process node configuration and path design."
>
  <LinkGrid columns={2} links={[
    { text: "Create Process", href: "devguide/approval-workflow/approval-workflow-basic-configuration#create-process" },
    { text: "Drag Process Node", href: "devguide/approval-workflow/approval-workflow-basic-configuration#drag-process-node" },
    { text: "Approval Process Default Page", href: "devguide/approval-workflow/approval-workflow-basic-configuration#approval-workflow-default-page" },
    { text: "Other Process Configuration", href: "devguide/approval-workflow/approval-workflow-basic-configuration#other-process-configuration" },
    { text: "Sync Approval Info to Data Table Model", href: "devguide/approval-workflow/approval-workflow-basic-configuration#sync-approval-info-to-data-table-model" },
    { text: "Sync to Third-party Approval Todo", href: "devguide/approval-workflow/approval-workflow-basic-configuration#sync-to-third-party-approval-todo" },
    { text: "Comment Function", href: "devguide/approval-workflow/approval-workflow-basic-configuration#comment-function" },
    { text: "Share", href: "devguide/approval-workflow/approval-workflow-basic-configuration#share" },
    { text: "Print Approval Form", href: "devguide/approval-workflow/approval-workflow-basic-configuration#print-approval-form" },
    { text: "Reuse Other Approval Processes", href: "devguide/approval-workflow/approval-workflow-basic-configuration#reuse-other-approval-workflowes" }
  ]} />
</IndexCard>

<IndexCard
  title="Start Node Configuration"
  href="devguide/approval-workflow/start-node-configuration"
  description="Configuration of approval process start node, defining conditions and rules for application initiation."
>
  <LinkGrid columns={2} links={[
    { text: "Process Cancellation Function", href: "devguide/approval-workflow/start-node-configuration#process-cancellation-function" },
    { text: "Approval Reminder", href: "devguide/approval-workflow/start-node-configuration#approval-reminder" },
    { text: "Approval Draft", href: "devguide/approval-workflow/start-node-configuration#approval-draft" },
    { text: "Message Notification", href: "devguide/approval-workflow/start-node-configuration#anchor-414" },
    { text: "Pages Used by Current Node", href: "devguide/approval-workflow/start-node-configuration#pages-used-by-current-node" },
    { text: "Summary Display", href: "devguide/approval-workflow/start-node-configuration#summary-display" },
    { text: "Field View Edit Permissions", href: "devguide/approval-workflow/start-node-configuration#field-view-edit-permissions" },
    { text: "Layout Control Permissions", href: "devguide/approval-workflow/start-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Node Configuration"
  href="devguide/approval-workflow/approval-node-configuration"
  description="Detailed configuration of approval links, including approver settings and approval rules."
>
  <LinkGrid columns={2} links={[
    { text: "Approver Settings", href: "devguide/approval-workflow/approval-node-configuration#approver-settings" },
    { text: "Approval Flow Rules", href: "devguide/approval-workflow/approval-node-configuration#approval-flow-rules" },
    { text: "Approval Process Rules", href: "devguide/approval-workflow/approval-node-configuration#approval-workflow-rules" },
    { text: "Approval Extended Function Configuration", href: "devguide/approval-workflow/approval-node-configuration#approval-extended-function-configuration" },
    { text: "Deduplication Approval", href: "devguide/approval-workflow/approval-node-configuration#deduplication-approval" },
    { text: "Time-limited Processing", href: "devguide/approval-workflow/approval-node-configuration#time-limited-processing" },
    { text: "Approval Draft", href: "devguide/approval-workflow/approval-node-configuration#approval-draft" },
    { text: "Approval Feedback", href: "devguide/approval-workflow/approval-node-configuration#approval-feedback" },
    { text: "Handwritten Signature", href: "devguide/approval-workflow/approval-node-configuration#handwritten-signature" },
    { text: "Allow Batch Approval", href: "devguide/approval-workflow/approval-node-configuration#allow-batch-approval" },
    { text: "Message Notification", href: "devguide/approval-workflow/approval-node-configuration#message-notification" },
    { text: "SMS Notification", href: "devguide/approval-workflow/approval-node-configuration#sms-notification" },
    { text: "Approval Page and Permission Control", href: "devguide/approval-workflow/approval-node-configuration#approval-page-permission-control" },
    { text: "Pages Used by Current Node", href: "devguide/approval-workflow/approval-node-configuration#pages-used-by-current-node" },
    { text: "Summary Display", href: "devguide/approval-workflow/approval-node-configuration#summary-display" },
    { text: "Field Permission", href: "devguide/approval-workflow/approval-node-configuration#fieldpermission" },
    { text: "Layout Control Permissions", href: "devguide/approval-workflow/approval-node-configuration#layout-control-permissions" }
  ]} />
</IndexCard>

<IndexCard
  title="Special Node Configuration"
  href="devguide/approval-workflow/special-node-configuration"
  description="Configuration methods for special process nodes such as condition nodes and parallel nodes."
>
  <LinkGrid columns={2} links={[
    { text: "CC Node", href: "devguide/approval-workflow/special-node-configuration#cc-node" },
    { text: "CC Recipients", href: "devguide/approval-workflow/special-node-configuration#sms-notification" },
    { text: "SMS Notification", href: "devguide/approval-workflow/special-node-configuration#sms-notification" },
    { text: "Pages Used by Current Node", href: "devguide/approval-workflow/special-node-configuration#pages-used-by-current-node" },
    { text: "Field Permission", href: "devguide/approval-workflow/special-node-configuration#fieldpermission" },
    { text: "Layout Control Permissions", href: "devguide/approval-workflow/special-node-configuration#layout-control-permissions" },
    { text: "Branch Node", href: "devguide/approval-workflow/special-node-configuration#branch-node" },
    { text: "Parallel Node", href: "devguide/approval-workflow/special-node-configuration#parallel-node" },
    { text: "Sub-process Node", href: "devguide/approval-workflow/special-node-configuration#sub-process-node" },
    { text: "Sub-process Name", href: "devguide/approval-workflow/special-node-configuration#sub-process-name" },
    { text: "Sub-process Initiator", href: "devguide/approval-workflow/special-node-configuration#sub-process-initiator" },
    { text: "Sub-process Flow Rules", href: "devguide/approval-workflow/special-node-configuration#sub-process-flow-rules" },
    { text: "When Main Process Flows to Sub-process", href: "devguide/approval-workflow/special-node-configuration#when-main-process-flows-to-sub-process" },
    { text: "Sub-process Post-flow Function Design", href: "devguide/approval-workflow/special-node-configuration#sub-process-post-flow-function-design" },
    { text: "Update Main Process Data When Single Sub-process Ends", href: "devguide/approval-workflow/special-node-configuration#update-main-process-data-single-sub-process-end" },
    { text: "Update Main Process Data When All Sub-processes End", href: "devguide/approval-workflow/special-node-configuration#update-main-process-data-all-sub-processes-end" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Page Customization"
  href="devguide/approval-workflow/approval-page-customization"
  description="Customize approval interface and user experience to improve approval efficiency."
>
  <LinkGrid links={[
    { text: "Approval Page Advanced Customization", href: "devguide/approval-workflow/approval-page-customization#approval-page-advanced-customization" },
    { text: "Approval Page Types", href: "devguide/approval-workflow/approval-page-customization#approval-page-types" },
    { text: "Custom Page Creation Method", href: "devguide/approval-workflow/approval-page-customization#custom-page-creation-method" }
  ]} />
</IndexCard>

<IndexCard
  title="Approval Process Usage"
  href="devguide/approval-workflow/approval-workflow-usage"
  description="Practical application and operation guide of approval process, including initiating and processing approvals."
>
  <LinkGrid links={[
    { text: "Initiate Application", href: "devguide/approval-workflow/approval-workflow-usage#initiate-application" },
    { text: "Todo Center", href: "devguide/approval-workflow/approval-workflow-usage#todo-center" },
    { text: "Detail Page", href: "devguide/approval-workflow/approval-workflow-usage#detail-page" },
    { text: "Delegate to Others Processing", href: "devguide/approval-workflow/approval-workflow-usage#delegate-to-others-processing" },
    { text: "Approval Process Management Page", href: "devguide/approval-workflow/approval-workflow-usage#approval-workflow-management-page" }
  ]} />
</IndexCard>

<IndexCard
  title="Calling Business Logic Elements in Approval Process"
  href="devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow"
  description="Learn how to call business logic elements within approval processes to implement complex business rules and automated decisions."
>
  <LinkGrid links={[
    { text: "Calling Business Logic Through Approval Events", href: "devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow#calling-business-logic-through-approval-events" },
    { text: "Function Processing in Subprocesses", href: "devguide/approval-workflow/calling-business-logic-elements-in-approval-workflow#function-processing-in-subprocesses" }
  ]} />
</IndexCard>

<IndexCard
  title="Integrating AI in Approval Process"
  href="devguide/approval-workflow/integrating-ai-in-approval-workflow"
  description="Integrate artificial intelligence capabilities into approval processes to achieve intelligent routing, automated review, and smart decision making."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 Coming soon...
  </div>
</IndexCard>

</div>

## File processing {#file-processing}
Easily handle various file requirements in applications. Support file upload and download in multiple formats, dynamically generate Word and Excel documents, making file operations simple and convenient.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="File Storage"
  href="devguide/file-processing/file-storage"
  description="File upload, storage and management system supporting multiple storage methods and file operations."
>
  <LinkGrid columns={2} links={[
    { text: "Local Storage Configuration", href: "devguide/file-processing/file-storage#local-storage-configuration" },
    { text: "Add Local Storage", href: "devguide/file-processing/file-storage#add-local-storage" },
    { text: "Specify Disk Storage Directory", href: "devguide/file-processing/file-storage#specify-disk-storage-directory" },
    { text: "Cloud Storage Service Configuration", href: "devguide/file-processing/file-storage#cloud-storage-service-configuration" },
    { text: "Alibaba Cloud OSS", href: "devguide/file-processing/file-storage#aliyun-oss" },
    { text: "China Mobile Cloud EOS", href: "devguide/file-processing/file-storage#china-mobile-cloud-eos" },
    { text: "MinIO", href: "devguide/file-processing/file-storage#minio" },
    { text: "Qiniu Cloud", href: "devguide/file-processing/file-storage#aliyun-oss" },
    { text: "AWS S3", href: "devguide/file-processing/file-storage#aws-s3" },
    { text: "Cloudflare R2", href: "devguide/file-processing/file-storage#cloudflare-r2" },
    { text: "Use Environment Variables to Prevent Config Info Leak", href: "devguide/file-processing/file-storage#prevent-config-info-leak-with-env-variables" },
    { text: "Set Application Default Storage Service", href: "devguide/file-processing/file-storage#set-application-default-storage-service" },
    { text: "Call File Upload in Frontend Code", href: "devguide/file-processing/file-storage#call-file-upload-in-frontend-code" }
  ]} />
</IndexCard>

<IndexCard
  title="File Templates"
  href="devguide/file-processing/file-templates"
  description="Document template generation and processing, supporting dynamic content filling and format conversion."
>
  <LinkGrid columns={2} links={[
    { text: "Word Template", href: "devguide/file-processing/file-templates#word-template" },
    { text: "Create Word Template", href: "devguide/file-processing/file-templates#create-word-template" },
    { text: "Create Word Template Variables", href: "devguide/file-processing/file-templates#create-word-template-variables" },
    { text: "Use Template Variables in Word", href: "devguide/file-processing/file-templates#use-template-variables-in-word" },
    { text: "Excel Template", href: "devguide/file-processing/file-templates#excel-template" },
    { text: "Create Excel Template", href: "devguide/file-processing/file-templates#create-excel-template" },
    { text: "Create Excel Template Variables", href: "devguide/file-processing/file-templates#create-excel-template-variables" },
    { text: "Use Template Variables in Excel", href: "devguide/file-processing/file-templates#use-template-variables-in-excel" },
    { text: "Template Variable Style Description", href: "devguide/file-processing/file-templates#template-variable-style-description" },
    { text: "Text Style", href: "devguide/file-processing/file-templates#text-style" },
    { text: "Numeric Style", href: "devguide/file-processing/file-templates#numeric-style" },
    { text: "Date Time Style", href: "devguide/file-processing/file-templates#date-time-style" },
    { text: "Multi-value Style (Complex Types)", href: "devguide/file-processing/file-templates#multi-value-complex-types" }
  ]} />
</IndexCard>

<IndexCard
  title="Generating and Printing Files Using File Templates"
  href="devguide/file-processing/generating-and-printing-files-using-file-templates"
  description="Learn how to use file templates to generate and print documents programmatically, including dynamic content population and output formatting."
>
  <LinkGrid links={[
    { text: "Print Word Templates", href: "devguide/file-processing/generating-and-printing-files-using-file-templates#print-word-template" },
    { text: "Print Excel Templates", href: "devguide/file-processing/generating-and-printing-files-using-file-templates#print-excel-template" }
  ]} />
</IndexCard>

</div>

## External API integration {#external-api-integration}
Connect your application to the broader world. Easily integrate third-party APIs, integrate WeChat Pay and Alipay, and configure SMS notification services. Expand application capability boundaries to meet more business scenarios.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Universal External API Elements"
  href="devguide/third-party-integration/external-api"
  description="Seamlessly integrate third-party HTTP interfaces with unified RESTful API call management, supporting standard HTTP methods and advanced processing capabilities."
>
  <LinkGrid columns={2} links={[
    { text: "Creating External APIs", href: "devguide/third-party-integration/external-api#creating-external-apis" },
    { text: "Public Configuration", href: "devguide/third-party-integration/external-api#public-configuration" },
    { text: "Access Domain", href: "devguide/third-party-integration/external-api#access-domain" },
    { text: "Public Request Headers", href: "devguide/third-party-integration/external-api#public-request-headers" },
    { text: "Request Preprocessing", href: "devguide/third-party-integration/external-api#request-preprocessing" },
    { text: "Response Postprocessing", href: "devguide/third-party-integration/external-api#response-postprocessing" },
    { text: "API Interface Management", href: "devguide/third-party-integration/external-api#api-interface-management" },
    { text: "API Interface Grouping", href: "devguide/third-party-integration/external-api#api-interface-grouping" },
    { text: "API Interface", href: "devguide/third-party-integration/external-api#api-interface" },
    { text: "Request Parameters", href: "devguide/third-party-integration/external-api#request-parameters" },
    { text: "Return Value Type", href: "devguide/third-party-integration/external-api#return-value-type" },
    { text: "Callback Function", href: "devguide/third-party-integration/external-api#callback-function" },
    { text: "API Interface Testing and Calling", href: "devguide/third-party-integration/external-api#api-interface-testing-and-calling" },
    { text: "API Interface Testing", href: "devguide/third-party-integration/external-api#api-interface-testing" },
    { text: "API Calling", href: "devguide/third-party-integration/external-api#api-calling" }
  ]} />
</IndexCard>

<IndexCard
  title="Built-in Payment Services"
  href="devguide/third-party-integration/payment-service"
  description="Integrate mainstream payment platforms to implement online payment and transaction functions."
>
  <LinkGrid links={[
    { text: "Configuring WeChat Payment Service", href: "devguide/third-party-integration/payment-service#wechat-payment-service-configuration" },
    { text: "Configuring Alipay Payment Service", href: "devguide/third-party-integration/payment-service#alipay-payment-service-configuration" },
    { text: "Using Payment Services", href: "devguide/third-party-integration/payment-service#payment-service-usage" }
  ]} />
</IndexCard>

<IndexCard
  title="Built-in SMS Service"
  href="devguide/third-party-integration/sms-service"
  description="SMS sending and notification service integration, supporting verification codes and message push."
>
  <LinkGrid links={[
    { text: "Alibaba Cloud SMS", href: "devguide/third-party-integration/sms-service#aliyun-sms" },
    { text: "Creating Alibaba Cloud SMS Service", href: "devguide/third-party-integration/sms-service#aliyun-sms-service-creation" },
    { text: "Using SMS Service in Mobile Login", href: "devguide/third-party-integration/sms-service#use-sms-service-in-mobile-login" },
    { text: "Using SMS Service in Approval Workflows", href: "devguide/third-party-integration/sms-service#use-sms-service-in-approval-workflow" },
    { text: "SMS Notification Function", href: "devguide/third-party-integration/sms-service#sms-notification-function" }
  ]} />
</IndexCard>
</div>

## Cache management {#cache-management}
Make applications run faster and more stable. Configure intelligent caching strategies, optimize data access speed, and enhance user experience. Ensure applications run smoothly even under high concurrent access.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Cache Configuration and Usage"
  href="devguide/cache-management"
  description="Application cache strategy configuration to improve system performance and response speed."
>
  <LinkGrid links={[
    { text: "Cache Service Configuration", href: "devguide/cache-management#cache-service-configuration" },
    { text: "Multi-cache Service Management", href: "devguide/cache-management#multi-cache-service-management" },
    { text: "Cache Programming Interface Usage", href: "devguide/cache-management#cache-programming-interface-usage" }
  ]} />
</IndexCard>
</div>

## Internal API exposure {#internal-api-exposure}
Expose application capabilities for external system calls. Generate standard API interfaces with one click, manage call permissions, and monitor usage. Make your application a provider of data and services.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="API Authorization"
  href="devguide/api-exposure/api-authorization"
  description="Permission control and access authorization management for API interfaces."
>
  <LinkGrid links={[
    { text: "API Authorization Creation", href: "devguide/api-exposure/api-authorization#api-authorization-creation" },
    { text: "API Authorization Detail", href: "devguide/api-exposure/api-authorization#api-authorization-detail" },
    { text: "Call Records", href: "devguide/api-exposure/api-authorization#call-records" }
  ]} />
</IndexCard>

<IndexCard
  title="API Exposure Examples for Various Elements"
  href="devguide/api-exposure/api-exposure-examples-for-various-elements"
  description="Comprehensive examples demonstrating how to expose different types of elements as APIs, including data models, services, and custom functions."
>
    <LinkGrid links={[
        { text: "API Authorization for Service Functions", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#service-function-api-authorization" },
        { text: "API Authorization for Data Models", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#data-model-api-authorization" },
        { text: "API Authorization for Large Language Model Functions", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#large-language-model-function-api-authorization" },
        { text: "API Authorization for AI Agents", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#agent-api-authorization" },
        { text: "API Authorization for AI Assistants", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#ai-assistant-api-authorization" },
        { text: "API Authorization for Approval Processes", href: "devguide/api-exposure/api-exposure-examples-for-various-elements#approval-process-api-authorization" }
    ]} />
</IndexCard>

<IndexCard
  title="Using SDK to Call Authorized Element APIs"
  href="devguide/api-exposure/using-sdk-to-call-authorized-element-apis"
  description="Learn how to use official SDKs to call authorized element APIs, including authentication, request handling, and error management."
>
    <LinkGrid links={[
        { text: "Using Python SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-python-sdk" },
        { text: "Using Node.js SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-nodejs-sdk" },
        { text: "Using Java SDK", href: "devguide/api-exposure/using-sdk-to-call-authorized-element-apis#using-java-sdk" }
    ]} />
</IndexCard>

<IndexCard
  title="Using Cross-App Service Elements to Call Authorized APIs"
  href="devguide/api-exposure/using-cross-app-service-elements-to-call-authorized-apis"
  description="Implement cross-application API calls using service elements, enabling seamless integration between different JitAi applications."
>
    <LinkGrid links={[
        { text: "Using Cross-App Service Elements", href: "devguide/api-exposure/using-cross-app-service-elements-to-call-authorized-apis#using-cross-app-service-elements" }
    ]} />
</IndexCard>

</div>

## Internationalization {#internationalization}
Make your application accessible to global users. Support multiple languages, regional settings, and dynamic language switching to create truly international applications.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Creating Language Packages"
  href="devguide/internationalization/creating-language-packages"
  description="Learn how to create custom language packages for your application, including structure definition and content organization."
>
  <LinkGrid links={[
      { text: "Creating language packages", href: "devguide/internationalization/creating-language-packages#creating-language-packages" },
      { text: "Translating built-in terms", href: "devguide/internationalization/creating-language-packages#translating-built-in-terms" },
      { text: "Adding new terms", href: "devguide/internationalization/creating-language-packages#adding-new-terms" },
      { text: "Importing terms", href: "devguide/internationalization/creating-language-packages#importing-terms" }
  ]} />
</IndexCard>

<IndexCard
  title="Extending System Built-in Language Packages"
  href="devguide/internationalization/extending-system-builtin-language-packages"
  description="Extend and customize existing system language packages to meet specific business requirements and regional needs."
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
  </div>
</IndexCard>

<IndexCard
  title="How to Translate Page Terms"
  href="devguide/internationalization/how-to-translate-page-terms"
  description="Master the techniques for translating page content, including dynamic text replacement and context-aware translations."
>
  <LinkGrid links={[
      { text: "Automatic text translation", href: "devguide/internationalization/how-to-translate-page-terms#automatic-text-translation" },
      { text: "Dynamic text translation", href: "devguide/internationalization/how-to-translate-page-terms#dynamic-text-translation" },
      { text: "DOM node attribute translation", href: "devguide/internationalization/how-to-translate-page-terms#dom-node-attribute-translation" },
      { text: "Using API translation", href: "devguide/internationalization/how-to-translate-page-terms#using-api-translation" }
  ]} />
</IndexCard>

<IndexCard
  title="Translation Ignore Rules"
  href="devguide/internationalization/translate-ignore-rules"
  description="Configure rules to exclude specific content from translation, ensuring proper handling of brand names, technical terms, and other non-translatable content."
>
  <LinkGrid links={[
      { text: "Basic usage", href: "devguide/internationalization/translate-ignore-rules#basic-usage" },
      { text: "Advanced configuration", href: "devguide/internationalization/translate-ignore-rules#advanced-configuration" },
      { text: "Configuration method", href: "devguide/internationalization/translate-ignore-rules#configuration-method" }
  ]} />
</IndexCard>

<IndexCard
  title="Default Language"
  href="devguide/internationalization/default-language"
  description="Configure the default language for your application to ensure optimal user experience for first-time visitors and users without explicit language preferences."
>
  <LinkGrid links={[
      { text: "Default language configuration", href: "devguide/internationalization/default-language#default-language-configuration" },
      { text: "Language selection strategy", href: "devguide/internationalization/default-language#language-selection-strategy" },
      { text: "Configuration recommendations", href: "devguide/internationalization/default-language#configuration-recommendations" }
  ]} />
</IndexCard>

</div>


## Frontend UI customization {#frontend-ui-customization}
Create unique visual experiences and brand identity. Customize application theme colors, develop exclusive UI components, and make application interfaces better align with corporate brand tone while enhancing user experience and recognition.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Global Styles"
  href="devguide/frontend-ui-customization/global-styles"
  description="Application overall style and theme configuration, unifying interface style and user experience."
>
  <LinkGrid links={[
    { text: "Creating Global Style Element", href: "devguide/frontend-ui-customization/global-styles#create-global-style-element" },
    { text: "Modifying Global Style", href: "devguide/frontend-ui-customization/global-styles#modify-global-style" },
    { text: "More Style Variables", href: "devguide/frontend-ui-customization/global-styles#more-style-variables" },
    { text: "Debugging Theme", href: "devguide/frontend-ui-customization/global-styles#debug-theme" }
  ]} />
</IndexCard>

<IndexCard
  title="Custom Controls"
  href="devguide/frontend-ui-customization/custom-controls"
  description="Develop personalized UI components to meet special business needs and interaction requirements."
>
  <LinkGrid links={[
    { text: "Creating Custom Control Element", href: "devguide/frontend-ui-customization/custom-controls#create-custom-control-element" },
    { text: "Modifying Custom Control", href: "devguide/frontend-ui-customization/custom-controls#modify-custom-control" },
    { text: "Using Custom Control in Forms", href: "devguide/frontend-ui-customization/custom-controls#use-custom-control-in-form" },
    { text: "Using Custom Control in Tables", href: "devguide/frontend-ui-customization/custom-controls#use-custom-control-in-table" },
    { text: "Custom Control Parameters", href: "devguide/frontend-ui-customization/custom-controls#custom-control-parameters" }
  ]} />
</IndexCard>

<IndexCard
  title="Component Customization"
  href="devguide/frontend-ui-customization/component-customization"
  description="Platform provides two main approaches for component customization to meet different development needs and scenarios."
>
  <LinkGrid links={[
    { text: "Developing Full-code Components", href: "devguide/frontend-ui-customization/component-customization#developing-full-code-components" },
    { text: "Extending Component Type Elements", href: "devguide/frontend-ui-customization/component-customization#extending-component-type-elements" }
  ]} />
</IndexCard>

<IndexCard
  title="Page Customization"
  href="devguide/frontend-ui-customization/page-customization"
  description="Specific development technologies and usage methods for full-code pages, including style processing, component usage, resource management, data operations, etc."
>
  <LinkGrid columns={2} links={[
    { text: "Using Styles", href: "devguide/frontend-ui-customization/page-customization#use-style" },
    { text: "Using Local Resources", href: "devguide/frontend-ui-customization/page-customization#use-local-resources" },
    { text: "Using Ant Design Components", href: "devguide/frontend-ui-customization/page-customization#use-ant-design-components" },
    { text: "Embedding Existing Generic Pages", href: "devguide/frontend-ui-customization/page-customization#embed-existing-generic-page" },
    { text: "Using Standard Components", href: "devguide/frontend-ui-customization/page-customization#use-standard-component" },
    { text: "Calling Data Model Functions", href: "devguide/frontend-ui-customization/page-customization#call-data-model-function" },
    { text: "Calling Service Functions", href: "devguide/frontend-ui-customization/page-customization#call-service-function" },
    { text: "Creating Vue Full-code Page", href: "devguide/frontend-ui-customization/page-customization#vue-full-code-page" },
    { text: "Using Third-party Packages", href: "devguide/frontend-ui-customization/page-customization#use-third-party-packages" },
    { text: "Using Packaging Configuration", href: "devguide/frontend-ui-customization/page-customization#use-packaging-configuration" }
  ]} />
</IndexCard>

<IndexCard
  title="Portal Customization"
  href="devguide/frontend-ui-customization/portal-customization"
  description="Full-code custom portals provide flexible solutions for navigation layout adjustment, interface style customization, and interaction method optimization."
>
  <LinkGrid links={[
    { text: "Creating Custom Portal", href: "devguide/frontend-ui-customization/portal-customization#creating-custom-portal" },
    { text: "Core File Structure", href: "devguide/frontend-ui-customization/portal-customization#core-file-structure" },
    { text: "Important APIs and Methods", href: "devguide/frontend-ui-customization/portal-customization#important-apis-and-methods" },
    { text: "Portal Basic APIs", href: "devguide/frontend-ui-customization/portal-customization#portal-basic-apis" },
    { text: "Page Rendering and Navigation", href: "devguide/frontend-ui-customization/portal-customization#page-rendering-and-navigation" },
    { text: "Permission Verification", href: "devguide/frontend-ui-customization/portal-customization#permission-verification" }
  ]} />
</IndexCard>
</div>

## Advanced guide {#advanced-guide}
In-depth practical guides based on real business scenarios to help developers master complex application architecture design and best practices.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="Development and Operations Process"
  href="devguide/advanced-guide/local-development-and-debugging"
  description="Master efficient development processes, debugging techniques, and production environment deployment management to ensure application stability and team collaboration efficiency."
>
  <LinkGrid links={[
    { text: "Local Development and Debugging", href: "devguide/advanced-guide/local-development-and-debugging" },
    { text: "Team Collaborative Development", href: "devguide/advanced-guide/team-collaborative-development" },
    { text: "Application Layer Stability Guarantee", href: "devguide/advanced-guide/application-layer-stability-guarantee" }
  ]} />
</IndexCard>

<IndexCard
  title="AI Development and Applications"
  href="devguide/advanced-guide/ai-customer-service"
  description="Build intelligent applications using AI agents, assistants, and advanced prompt engineering techniques for enhanced user experiences and automated workflows."
>
  <LinkGrid links={[
    { text: "AI Customer Service", href: "devguide/advanced-guide/ai-customer-service" },
    { text: "AI Question Grading", href: "devguide/advanced-guide/ai-question-grading" },
    { text: "Agent Prompt Writing Techniques", href: "devguide/advanced-guide/agent-prompt-writing-techniques" }
  ]} />
</IndexCard>

<IndexCard
  title="Data Modeling and Analysis"
  href="devguide/advanced-guide/business-entity-modeling-and-data-analysis"
  description="Build sales data analysis systems based on JitORM, implementing multi-dimensional aggregation analysis and business rule automation."
>
  <LinkGrid links={[
    { text: "Business Entity Modeling and Data Analysis", href: "devguide/advanced-guide/business-entity-modeling-and-data-analysis" }
  ]} />
</IndexCard>

<IndexCard
  title="Business Services and API"
  href="devguide/advanced-guide/using-interceptors-for-custom-request-authentication"
  description="Implement custom authentication and business service architecture based on JitService."
>
  <LinkGrid links={[
    { text: "Use Interceptors for Custom Request Authentication", href: "devguide/advanced-guide/using-interceptors-for-custom-request-authentication" }
  ]} />
</IndexCard>

</div>
