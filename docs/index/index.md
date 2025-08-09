---
sidebar_position: -1
---
# 导读

欢迎来到 JitAi 文档！JitAi 是为AI而生的下一代应用开发技术体系，本文档将帮助你快速上手并深入掌握 JitAi 的各项功能。

## 了解JitAi

**第一次接触JitAi？** 建议先了解背景和核心概念：

- [为什么选择JitAi](WhyJitAi.md) - 了解传统开发方式的问题，理解JitAi诞生的背景和必要性
- [JitAi是什么](WhatIsJitAi.md) - 全面了解JitAi的技术架构、核心组件和特性

## 快速入门

**完全新手？** 建议按以下顺序开始：

- [下载安装](../tutorial/下载安装.md) - 立即开始使用JitAi，5分钟完成环境搭建
- [开发第一个AI应用](../tutorial/开发第一个AI应用（智能客服）.md) - 跟随教程快速体验智能客服开发，建立信心

## 获得帮助

遇到问题？我们为你提供有效的支持渠道：

- [社区交流](../community/index.md) - 加入开发者社区，与其他开发者交流经验

## 文档分类

根据你的需求和经验水平，选择合适的文档类型：

### [入门教程](../tutorial) - 手把手学习
**适合人群**：初学者、想要快速上手的开发者  
**特点**：循序渐进，注重实践，让你尽快做出有用的应用

#### 基础教程
新手必读，帮助你建立对JitAi的基本认知：
- [下载安装](../tutorial/下载安装.md) - 环境搭建和基本配置
- [了解JitNode目录](../reference/运行平台/JitNode目录.md) - 理解项目结构，为开发做准备
- [开发第一个AI应用（智能客服）](../tutorial/开发第一个AI应用（智能客服）.md) - 完整的入门项目，体验从零到部署

#### 进阶指南
掌握基础后，学习更复杂的应用场景：
- [新增元素族类，集成智能客服到钉钉机器人](../extguide/后端/新增后端Type元素.md) - 企业级集成实战
- [AI智能出题，智能阅卷](../tutorial/AI出题阅卷.md) - 完整的AI教育应用案例，涵盖AI Agent、知识库、审批流程等高级特性

### [参考手册](../reference) - 技术查阅
**适合人群**：需要查阅技术细节和深入理解系统设计的开发者  
**特点**：完整的API文档、技术规范和高层次概念解释

#### 技术概念
- [体系结构与原理](体系结构与原理.md) - 了解JitAi的核心设计思想和技术架构
- [JAAP协议](../reference/运行平台/JAAP.md) - 深入理解JitAi应用协议的设计理念
- [开发工具](../reference/开发工具/index.md) - 理解可视化开发工具的概念和优势
- [运行平台](../reference/运行平台/index.md) - 掌握应用运行时机制和架构

#### 详细参考
参考手册包含两大部分：[开发框架](#开发框架参考) 和 [运行平台](#运行平台api参考)

### [应用开发指南](../devguide) - 场景驱动实践
**适合人群**：需要在具体业务场景中应用JitAi框架能力的开发者  
**特点**：以真实企业业务场景为驱动，指导如何将业务需求转化为框架能力的正确使用

#### 通用最佳实践
帮助开发者建立系统性思维，掌握JitAi开发的核心方法：

<div style={{columns: 2, columnGap: '2rem'}}>

- [本地开发与调试](../devguide/本地开发与调试.md) - 开发环境配置和调试技巧
- [运维架构与管理指南](../devguide/运维架构与管理指南.md) - 生产环境部署和管理
- [应用层稳定性保障](../devguide/应用层稳定性保障.md) - 应用可靠性最佳实践
- [团队协作开发](../devguide/团队协作开发.md) - 团队协作开发的最佳流程

</div>

#### 框架能力应用场景
通过具体的企业业务场景，学习如何正确使用各开发框架：

- [登录认证与权限管理](../devguide/应用场景/登录认证与权限管理)
- [业务实体建模与数据分析](../devguide/应用场景/业务实体建模与数据分析)
- [系统界面设计与组件应用](../devguide/应用场景/系统界面设计与组件应用)
- [对外开放HTTP接口](../devguide/应用场景/对外开放HTTP接口)
- [在线支付功能集成](../devguide/应用场景/在线支付功能集成)
- [定时执行自定义业务逻辑](../devguide/应用场景/定时执行自定义业务逻辑)
- [使用模型的时间字段触发定时任务](../devguide/应用场景/使用模型的时间字段触发定时任务)
- [基于文件存储元素实现文件管理](../devguide/应用场景/基于文件存储元素实现文件管理)
- [使用文件模版生成和打印文件](../devguide/应用场景/使用文件模版生成和打印文件)
- [发送短信通知](../devguide/应用场景/发送短信通知)
- [审批流程编排与自定义审批事件](../devguide/应用场景/审批流程编排与自定义审批事件)
- *更多场景指南正在编写中...*

### [框架扩展指南](../extguide) - 高级定制
**适合人群**：需要扩展或定制JitAi框架的高级开发者  
**特点**：深度定制和扩展开发，满足特殊业务需求

当官方框架无法满足特定行业需求，或需要定制化组件时，框架扩展指南将指导你构建自己的解决方案。

#### 前端扩展
定制和扩展前端组件，满足特殊UI需求：

<div style={{columns: 2, columnGap: '2rem'}}>

- [新增前端组件](../extguide/前端/新增前端组件.md) - 创建全新的前端组件元素
- [开发前端组件元素的可视化编辑器](../extguide/前端/开发前端组件元素的可视化编辑器.md) - 定制组件的可视化编辑器

</div>

#### 后端扩展
扩展后端Type元素，增强服务端能力：

<div style={{columns: 2, columnGap: '2rem'}}>

- [新增后端Type元素](../extguide/后端/新增后端Type元素.md) - 创建新的后端元素类型
- [继承扩展已有后端Type元素](../extguide/后端/继承扩展已有后端Type元素.md) - 基于现有元素进行扩展
- [开发后端元素可视化编辑器](../extguide/后端/开发后端元素可视化编辑器.md) - 定制后端元素的编辑器

</div>

#### 综合扩展
构建完整的扩展解决方案：

<div style={{columns: 2, columnGap: '2rem'}}>

- [新增前后端复合Type元素](../extguide/综合/新增前后端复合Type元素.md) - 创建包含前后端功能的复合元素
- [自建开发工具](../extguide/综合/自建开发工具.md) - 构建自己的可视化开发工具
- [发布自己的开发框架](../extguide/综合/发布自己的开发框架.md) - 分享可复用的扩展框架

</div>

### [应用市场](../appmarket) - 即用应用
**适合人群**：希望快速获得现成解决方案的用户  
**特点**：提供可直接部署的应用模板和解决方案

- 浏览所有可用应用 - 按国家/语言分类展示
- 从应用市场安装应用 - 一键部署已有应用
- 发布应用到市场 - 分享你的应用给其他开发者

### [开源](../opensource) - 参与贡献
**适合人群**：希望参与JitAi开源项目的开发者  
**特点**：开源政策、贡献指南和开源资源

- 开源政策与贡献指南 - 了解如何参与开源项目
- 开源开发框架 - 获取框架源代码
- 开源案例应用 - 学习优秀的开源实现
- 开源文档 - 参与文档建设

### [社区论坛](../community/index.md) - 交流互助
**适合人群**：希望与其他开发者交流的用户  
**特点**：技术讨论、经验分享、问题求助的活跃社区

- 加入开发者社区 - 与全球开发者交流技术心得
- 获取技术支持 - 专业技术支持和解答
- 分享项目经验 - 展示你的创新项目和最佳实践
- 参与贡献奖励 - 获得贡献者徽章和社区荣誉

---

## 开发框架参考

JitAi开发框架是基于JAAP的企业级应用开发框架，提供从基础设施到业务层组件的全栈技术底座。

**框架总览**
- [开发框架总览](../reference/开发框架/index.md) - 了解整体框架架构和选择指南

### 核心框架（AI与认证）

#### JitAi - 人工智能框架
人工智能框架，提供大语言模型集成、智能代理构建、AI助手开发和知识库管理能力

<div style={{columns: 2, columnGap: '2rem'}}>

- [JitAi概述](../reference/开发框架/JitAi/intro.md)
- [AIAgent](../reference/开发框架/JitAi/AIAgent.md)
- [AI助理](../reference/开发框架/JitAi/AI助理.md)
- [AI大模型](../reference/开发框架/JitAi/AI大模型.md)
- [AI知识库](../reference/开发框架/JitAi/AI知识库.md)
- [Agent事件](../reference/开发框架/JitAi/Agent事件.md)
- [助理事件](../reference/开发框架/JitAi/助理事件.md)

</div>

#### JitAuth - 身份认证与授权管理框架
身份认证与授权管理框架，支持多种认证方式、RBAC权限控制、组织架构管理和第三方身份系统集成

**权限管理**
- [标准角色](../reference/开发框架/JitAuth/标准角色.md) - 角色权限管理体系

**登录认证** - 支持多种主流登录方式：

<div style={{columns: 2, columnGap: '2rem'}}>

- [账号密码登录](../reference/开发框架/JitAuth/登录认证/账号密码登录.md)
- [手机号登录](../reference/开发框架/JitAuth/登录认证/手机号登录.md)
- [微信登录](../reference/开发框架/JitAuth/登录认证/微信登录.md)
- [微信公众号登录](../reference/开发框架/JitAuth/登录认证/微信公众号登录.md)
- [微信小程序登录](../reference/开发框架/JitAuth/登录认证/微信小程序登录.md)
- [企业微信自建扫码登录](../reference/开发框架/JitAuth/登录认证/企业微信自建扫码登录.md)
- [企业微信代开发登录](../reference/开发框架/JitAuth/登录认证/企业微信代开发登录.md)
- [钉钉自建扫码登录](../reference/开发框架/JitAuth/登录认证/钉钉自建扫码登录.md)

</div>

**企业组织** - 支持多种企业组织架构：

<div style={{columns: 2, columnGap: '2rem'}}>

- [标准组织](../reference/开发框架/JitAuth/企业组织/标准组织.md)
- [企业微信自建组织](../reference/开发框架/JitAuth/企业组织/企业微信自建组织.md)
- [企业微信代开发组织](../reference/开发框架/JitAuth/企业组织/企业微信代开发组织.md)
- [钉钉自建组织](../reference/开发框架/JitAuth/企业组织/钉钉自建组织.md)

</div>

### 数据与前端框架

#### JitORM - 对象关系映射框架
对象关系映射框架，提供数据库抽象层、数据模型定义、查询构建器和数据类型系统

<div style={{columns: 2, columnGap: '2rem'}}>

- [JitORM概述](../reference/开发框架/JitORM/index.md)
- [数据库](../reference/开发框架/JitORM/数据库.md)
- [数据模型](../reference/开发框架/JitORM/数据模型.md)
- [数据类型](../reference/开发框架/JitORM/数据类型.md)
- [Q表达式](../reference/开发框架/JitORM/Q表达式.md)
- [TQL](../reference/开发框架/JitORM/TQL.md)
- [模型事件](../reference/开发框架/JitORM/模型事件.md)

</div>

#### JitWeb - Web前端框架
Web前端框架，提供门户系统、页面管理、UI组件库、表单控件和样式系统

**样式与门户**
- [全局样式](../reference/开发框架/JitWeb/全局样式.md) - 统一的样式管理体系

**门户系统**：

<div style={{columns: 3, columnGap: '1.5rem'}}>

- [标准门户](../reference/开发框架/JitWeb/门户/标准门户.md)
- [SSR门户](../reference/开发框架/JitWeb/门户/SSR门户.md)
- [空白门户](../reference/开发框架/JitWeb/门户/空白门户.md)

</div>

**页面管理**：

<div style={{columns: 2, columnGap: '2rem'}}>

- [标准页面](../reference/开发框架/JitWeb/页面/标准页面.md)
- [数据录入页面](../reference/开发框架/JitWeb/页面/数据录入页面.md)
- [数据管理页面](../reference/开发框架/JitWeb/页面/数据管理页面.md)
- [全代码页面](../reference/开发框架/JitWeb/页面/全代码页面.md)
- [Vue全代码页面](../reference/开发框架/JitWeb/页面/Vue全代码页面.md)
- [Markdown页面](../reference/开发框架/JitWeb/页面/Markdown页面.md)

</div>

**UI组件库**：
- [自定义控件](../reference/开发框架/JitWeb/组件/自定义控件.md) - 创建自定义组件

*表单控件*：
- [表单](../reference/开发框架/JitWeb/组件/表单类/表单.md) - 标准表单组件
- [批量编辑表单](../reference/开发框架/JitWeb/组件/表单类/批量编辑表单.md) - 批量数据编辑

*数据展示组件*：

<div style={{columns: 3, columnGap: '1.5rem'}}>

- [表格](../reference/开发框架/JitWeb/组件/视图类/表格.md)
- [分组表](../reference/开发框架/JitWeb/组件/视图类/分组表.md)
- [级联表](../reference/开发框架/JitWeb/组件/视图类/级联表.md)
- [级联树](../reference/开发框架/JitWeb/组件/视图类/级联树.md)
- [甘特图](../reference/开发框架/JitWeb/组件/视图类/甘特图.md)
- [画廊](../reference/开发框架/JitWeb/组件/视图类/画廊.md)
- [导入](../reference/开发框架/JitWeb/组件/视图类/导入.md)
- [交叉表](../reference/开发框架/JitWeb/组件/视图类/交叉表.md)
- [列表](../reference/开发框架/JitWeb/组件/视图类/列表.md)
- [树形](../reference/开发框架/JitWeb/组件/视图类/树形.md)
- [看板](../reference/开发框架/JitWeb/组件/视图类/看板.md)
- [日历](../reference/开发框架/JitWeb/组件/视图类/日历.md)
- [时间轴](../reference/开发框架/JitWeb/组件/视图类/时间轴.md)
- [轮播图](../reference/开发框架/JitWeb/组件/视图类/轮播图.md)
- [统计图](../reference/开发框架/JitWeb/组件/视图类/统计图.md)
- [行转列](../reference/开发框架/JitWeb/组件/视图类/行转列.md)
- [解析Excel](../reference/开发框架/JitWeb/组件/视图类/解析Excel.md)
- [全代码组件](../reference/开发框架/JitWeb/组件/视图类/全代码组件.md)

</div>

*交互操作组件*：

<div style={{columns: 2, columnGap: '2rem'}}>

- [按钮](../reference/开发框架/JitWeb/组件/操作类/按钮.md)
- [支付](../reference/开发框架/JitWeb/组件/操作类/支付.md)
- [数据修正](../reference/开发框架/JitWeb/组件/操作类/数据修正.md)
- [模型筛选器](../reference/开发框架/JitWeb/组件/操作类/模型筛选器.md)
- [通用筛选器](../reference/开发框架/JitWeb/组件/操作类/通用筛选器.md)

</div>

*页面布局组件*：

<div style={{columns: 2, columnGap: '2rem'}}>

- [弹窗](../reference/开发框架/JitWeb/组件/布局类/弹窗.md)
- [子页面](../reference/开发框架/JitWeb/组件/布局类/子页面.md)
- [标签页](../reference/开发框架/JitWeb/组件/布局类/标签页.md)
- [折叠面板](../reference/开发框架/JitWeb/组件/布局类/折叠面板.md)

</div>

*工作流组件*：
- [发起申请](../reference/开发框架/JitWeb/组件/审批类/发起申请.md) - 审批流程发起
- [审批处理](../reference/开发框架/JitWeb/组件/审批类/审批处理.md) - 审批任务处理

### 业务支撑框架

#### JitService - 核心业务服务框架
核心业务服务框架，提供API服务、外部集成、事件处理、拦截器等完整后端能力。基于事件驱动架构实现服务解耦，集成拦截器组件实现横切关注点的统一管理，支持权限验证、参数校验、日志记录等自动化处理，为上层应用提供标准化的服务接口和集成能力

<div style={{columns: 2, columnGap: '2rem'}}>

- [API授权](../reference/开发框架/JitService/API授权.md)
- [外部API集成](../reference/开发框架/JitService/外部API集成.md)
- [拦截器](../reference/开发框架/JitService/拦截器.md)
- [自定义业务服务](../reference/开发框架/JitService/自定义业务服务.md)
- [自定义事件](../reference/开发框架/JitService/自定义事件.md)
- [自定义事件服务](../reference/开发框架/JitService/自定义事件服务.md)

</div>

#### JitPay - 支付处理框架
支付处理框架，为应用提供统一的第三方支付集成能力，涵盖主流支付渠道接入、支付流程管理、订单状态跟踪等完整支付生态，支持PC端和移动端多场景

<div style={{columns: 3, columnGap: '1.5rem'}}>

- [支付服务](../reference/开发框架/JitPay/支付服务.md)
- [微信支付](../reference/开发框架/JitPay/微信支付.md)
- [支付宝支付](../reference/开发框架/JitPay/支付宝支付.md)

</div>

#### JitWorkflow - 企业级审批流程引擎
企业级审批流程引擎，提供完整的工作流设计、执行和管理能力，涵盖标准审批流程、审批服务、流程管理、待办中心等完整工作流生态，支持复杂审批逻辑和代理机制

<div style={{columns: 2, columnGap: '2rem'}}>

- [标准审批](../reference/开发框架/JitWorkflow/标准审批.md)
- [审批事件](../reference/开发框架/JitWorkflow/审批事件.md)

</div>

### 基础设施框架

#### JitStorage - 存储管理框架
存储管理框架，提供文件存储、缓存系统、对象存储和文件模板引擎等存储解决方案

**文件存储选项**：

<div style={{columns: 2, columnGap: '2rem'}}>

- [磁盘存储](../reference/开发框架/JitStorage/存储/磁盘存储.md)
- [七牛云存储](../reference/开发框架/JitStorage/存储/七牛云存储.md)
- [阿里云OSS存储](../reference/开发框架/JitStorage/存储/阿里云OSS存储.md)
- [MinIO存储](../reference/开发框架/JitStorage/存储/MinIO存储.md)
- [EOS存储](../reference/开发框架/JitStorage/存储/EOS存储.md)

</div>

**缓存系统**：

<div style={{columns: 2, columnGap: '2rem'}}>

- [内置缓存](../reference/开发框架/JitStorage/缓存/内置缓存.md)
- [Redis缓存](../reference/开发框架/JitStorage/缓存/Redis缓存.md)
- [SQLite缓存](../reference/开发框架/JitStorage/缓存/SQLite缓存.md)
- [TongRDS缓存](../reference/开发框架/JitStorage/缓存/TongRDS缓存.md)

</div>

**文件模板引擎**：
- [Excel模板](../reference/开发框架/JitStorage/文件模板/Excel模板.md) - Excel文档生成
- [Word模板](../reference/开发框架/JitStorage/文件模板/Word模板.md) - Word文档生成

#### JitTask - 任务调度框架
任务调度框架，支持定时任务、异步任务、任务队列和分布式任务执行管理

<div style={{columns: 3, columnGap: '1.5rem'}}>

- [任务服务](../reference/开发框架/JitTask/任务服务.md)
- [定时任务](../reference/开发框架/JitTask/定时任务.md)
- [日期字段任务](../reference/开发框架/JitTask/日期字段任务.md)

</div>

### 扩展与工具框架

#### JitMessage - 企业级消息通知服务框架
企业级消息通知服务框架，提供统一的短信、邮件、推送等多种通知渠道集成，简化企业应用中的消息通知集成复杂度，提升用户体验和运维效率

- [阿里云短信](../reference/开发框架/JitMessage/阿里云短信.md) - 短信服务集成

#### JitI18N - 国际化与本地化框架
国际化与本地化框架，支持多语言翻译、区域化设置和动态语言包管理

- [语言包](../reference/开发框架/JitI18N/语言包.md) - 多语言支持

#### JitCommons - 通用工具库
通用工具库，提供常用的工具类、辅助函数和公共组件，提升开发效率

<div style={{columns: 2, columnGap: '2rem'}}>

- [前端](../reference/开发框架/JitCommons/前端.md)
- [后端](../reference/开发框架/JitCommons/后端.md)

</div>

---

## 运行平台API参考

应用运行时环境的技术参考：

### 前端平台API
- **元素系统**：[元素定义](../reference/运行平台/前端/元素/ElementDefine.md) - 前端元素定义
- **应用管理**：[应用管理](../reference/运行平台/前端/应用/App.md) - 前端应用配置

### 后端平台API

**应用核心管理**：

<div style={{columns: 3, columnGap: '1.5rem'}}>

- [App](../reference/运行平台/后端/01应用/App.md) - 应用实例管理
- [AppCode](../reference/运行平台/后端/01应用/AppCode.md) - 应用代码管理
- [AppResource](../reference/运行平台/后端/01应用/AppResource.md) - 应用资源管理

</div>

**运行环境管理**：
- [Environ](../reference/运行平台/后端/02运行环境/01Environ.md) - 环境配置管理

**元素系统核心**：
- [Element](../reference/运行平台/后端/03元素/Element.md) - 元素定义和管理
- [ElementAttrDict](../reference/运行平台/后端/03元素/ElementAttrDict.md) - 元素属性字典

**Jit节点管理**：
- [Node](../reference/运行平台/后端/04Jit节点/Node.md) - Jit节点配置

---

**提示**：建议将本页面加入书签，方便随时查找所需文档！
