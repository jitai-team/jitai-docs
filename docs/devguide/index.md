---
sidebar_position: 0
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# 导读
准备好体验全新的应用开发方式了吗？从这里开始，你将学会使用AI时代的全新技术体系构建功能强大的企业级应用。

开发指南提供从组织管理、应用开发基础到业务逻辑实现的完整学习路径，以及通过真实业务场景掌握复杂应用架构设计的最佳实践。

**使用建议**：新手按顺序学习，有经验的开发者可直接查看场景化进阶指南。

首先，你需要完成基本的[下载安装](../tutorial/download-installation)！


## 应用开发基础
从零开始创建你的第一个应用。掌握开发者组织管理、运行环境配置、应用创建与管理的完整流程，为后续开发工作打下坚实基础。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="应用创建与管理"
  href="application-development-basics/application-creation-and-management"
  description="学习应用的创建、继承、版本管理和发布流程，掌握应用全生命周期管理。"
>
  <LinkGrid links={[
    { text: "创建第一个应用", href: "application-development-basics/application-creation-and-management#创建第一个应用" },
    { text: "基于已有应用快速开发", href: "application-development-basics/application-creation-and-management#基于已有应用快速开发" },
    { text: "数据存储与环境变量配置", href: "application-development-basics/application-creation-and-management#数据存储与环境变量配置" },
    { text: "应用版本管理与发布", href: "application-development-basics/application-creation-and-management#应用版本管理与发布" },
    { text: "应用导出导入", href: "application-development-basics/application-creation-and-management#应用导出导入" }
  ]} />
</IndexCard>

<IndexCard
  title="开发者组织管理"
  href="application-development-basics/developer-organization-management"
  description="了解如何创建和管理开发者组织，包括节点激活、组织绑定、成员管理等核心操作。"
>
  <LinkGrid links={[
    { text: "什么是开发者组织", href: "application-development-basics/developer-organization-management#什么是开发者组织" },
    { text: "在激活节点时创建新的开发组织", href: "application-development-basics/developer-organization-management#在激活节点时创建新的开发组织" },
    { text: "在激活节点时将节点绑定到自己已加入的组织", href: "application-development-basics/developer-organization-management#在激活节点时将节点绑定到自己已加入的组织" },
    { text: "在激活节点时使用组织绑定码加入组织并绑定", href: "application-development-basics/developer-organization-management#在激活节点时使用组织绑定码加入组织并绑定" },
    { text: "在登录已有节点时通过组织绑定码加入组织", href: "application-development-basics/developer-organization-management#在登录已有节点时通过组织绑定码加入组织" },
    { text: "查看和刷新组织绑定码", href: "application-development-basics/developer-organization-management#查看和刷新组织绑定码" },
    { text: "移除组织成员", href: "application-development-basics/developer-organization-management#移除组织成员" }
  ]} />
</IndexCard>

<IndexCard
  title="运行环境管理"
  href="application-development-basics/runtime-environment-management"
  description="掌握运行环境的创建、配置和管理，学习如何使用节点集群和应用部署。"
>
  <LinkGrid links={[
    { text: "什么是运行环境", href: "application-development-basics/runtime-environment-management#什么是运行环境" },
    { text: "节点的本地默认运行环境", href: "application-development-basics/runtime-environment-management#节点的本地默认运行环境" },
    { text: "创建新的运行环境", href: "application-development-basics/runtime-environment-management#创建新的运行环境" },
    { text: "使用运行环境管理节点集群", href: "application-development-basics/runtime-environment-management#使用运行环境管理节点集群" },
    { text: "在运行环境中部署应用", href: "application-development-basics/runtime-environment-management#在运行环境中部署应用" }
  ]} />
</IndexCard>

</div>

## JitAi可视化开发工具
掌握强大的可视化开发环境。熟悉IDE的各个功能区域，学会在可视化和源码双模式之间自由切换，高效完成应用开发工作。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid links={[
    { text: "元素目录树", href: "jitai-visual-development-tools#元素目录树" },
    { text: "添加元素", href: "jitai-visual-development-tools#添加元素" },
    { text: "可视化编辑器", href: "jitai-visual-development-tools#可视化编辑器" },
    { text: "源码编辑器", href: "jitai-visual-development-tools#源码编辑器" },
    { text: "源码文件树", href: "jitai-visual-development-tools#源码文件树" },
    { text: "应用设置", href: "jitai-visual-development-tools#应用设置" },
    { text: "门户切换", href: "jitai-visual-development-tools#门户切换" },
    { text: "个人中心", href: "jitai-visual-development-tools#个人中心" },
    { text: "语言切换", href: "jitai-visual-development-tools#语言切换" },
    { text: "导航标签", href: "jitai-visual-development-tools#导航标签" }
  ]} />
</IndexCard>

</div>

## 门户与页面开发
设计精美的用户界面和交互体验。从门户导航到页面构建，从组件布局到数据管理，打造功能完整、用户友好的应用界面。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="门户导航设计"
  href="portal-and-page-development/portal-navigation-design"
  description="设计不同用户角色的门户界面，配置导航菜单和权限控制，创建个性化用户体验。"
>
  <LinkGrid links={[
    { text: "应用内置3个门户", href: "portal-and-page-development/portal-navigation-design#应用内置3个门户" },
    { text: "3种门户类型", href: "portal-and-page-development/portal-navigation-design#3种门户类型" },
    { text: "创建门户并配置菜单", href: "portal-and-page-development/portal-navigation-design#创建门户并配置菜单" },
    { text: "门户布局设计", href: "portal-and-page-development/portal-navigation-design#门户布局设计" },
    { text: "启用或关闭常用功能入口", href: "portal-and-page-development/portal-navigation-design#启用或关闭常用功能入口" },
    { text: "在门户中集成ai-assistant", href: "portal-and-page-development/portal-navigation-design#在门户中集成ai-assistant" }
  ]} />
</IndexCard>

<IndexCard
  title="组件化页面开发"
  href="portal-and-page-development/component-based-page-development"
  description="使用可视化编辑器构建页面界面，配置组件和事件，实现丰富的用户交互功能。"
>
  <LinkGrid links={[
    { text: "创建一个常规页面", href: "portal-and-page-development/component-based-page-development#创建一个常规页面" },
    { text: "可视化页面编辑器", href: "portal-and-page-development/component-based-page-development#可视化页面编辑器" },
    { text: "页面变量", href: "portal-and-page-development/component-based-page-development#页面变量" },
    { text: "页面事件", href: "portal-and-page-development/component-based-page-development#页面事件" },
    { text: "页面函数", href: "portal-and-page-development/component-based-page-development#页面函数" }
  ]} />
</IndexCard>

<IndexCard
  title="ai-data-management-page"
  href="portal-and-page-development/ai-data-management-page"
  description="AI加持的ai-data-management-page，智能辅助高效完成数据浏览、筛选、编辑与批量操作。"
>
  <LinkGrid columns={2} links={[
    { text: "创建ai-data-management-page", href: "portal-and-page-development/ai-data-management-page#创建ai-data-management-page" },
    { text: "通过默认筛选条件限制页面表格查询的数据", href: "portal-and-page-development/ai-data-management-page#通过默认筛选条件限制页面表格查询的数据" },
    { text: "配置默认的数据排序规则", href: "portal-and-page-development/ai-data-management-page#配置默认的数据排序规则" },
    { text: "在页面表格中隐藏部分字段", href: "portal-and-page-development/ai-data-management-page#在页面表格中隐藏部分字段" },
    { text: "配置支持条件筛选的字段", href: "portal-and-page-development/ai-data-management-page#配置支持条件筛选的字段" },
    { text: "配置表单中允许查看和编辑的字段", href: "portal-and-page-development/ai-data-management-page#配置表单中允许查看和编辑的字段" },
    { text: "配置批量编辑表单中展示的字段", href: "portal-and-page-development/ai-data-management-page#配置批量编辑表单中展示的字段" },
    { text: "启用AI数据管理助手", href: "portal-and-page-development/ai-data-management-page#启用-ai-数据管理助手" },
    { text: "转换为常规页面进行修改", href: "portal-and-page-development/ai-data-management-page#转换为常规页面进行修改" }
  ]} />
</IndexCard>

<IndexCard
  title="ai-data-analysis-page"
  href="portal-and-page-development/ai-data-analysis-page"
  description="通过自然语言描述需求，AI自动生成数据图表，支持用户随时调整图表样式和统计维度。"
>
  <LinkGrid links={[
    { text: "创建ai-data-analysis-page", href: "portal-and-page-development/ai-data-analysis-page#创建ai-data-analysis-page" },
    { text: "页面配置", href: "portal-and-page-development/ai-data-analysis-page#页面配置" },
    { text: "运行效果演示", href: "portal-and-page-development/ai-data-analysis-page#运行效果" },
    { text: "全代码开发", href: "portal-and-page-development/ai-data-analysis-page#全代码开发" },
    { text: "快捷创建", href: "portal-and-page-development/ai-data-analysis-page#快捷创建" }
  ]} />
</IndexCard>

<IndexCard
  title="data-entry-page"
  href="portal-and-page-development/data-entry-page"
  description="快速创建数据录入表单，实现数据收集和提交功能。"
>
  <LinkGrid links={[
    { text: "创建data-entry-page", href: "portal-and-page-development/data-entry-page#创建data-entry-page" },
    { text: "配置允许查看和编辑的字段", href: "portal-and-page-development/data-entry-page#配置允许查看和编辑的字段" },
    { text: "提交后显示再次录入按钮", href: "portal-and-page-development/data-entry-page#提交后显示再次录入按钮" },
    { text: "提交后展示结果反馈界面", href: "portal-and-page-development/data-entry-page#提交后展示结果反馈界面" }
  ]} />
</IndexCard>


<IndexCard
  title="markdown-page"
  href="portal-and-page-development/markdown-page"
  description="创建文档型页面，支持丰富的Markdown语法和文档展示需求。"
>
  <LinkGrid links={[
    { text: "创建 Markdown 页面", href: "portal-and-page-development/markdown-page#创建-markdown-页面" },
    { text: "Markdown 语法", href: "portal-and-page-development/markdown-page#markdown-语法" }
  ]} />
</IndexCard>


<IndexCard
  title="full-code-page-development"
  href="portal-and-page-development/full-code-page-development"
  description="面向高级开发者的完全自定义页面开发方式，支持复杂业务逻辑和个性化界面。"
>
  <LinkGrid columns={2} links={[
    { text: "React 全代码页面", href: "portal-and-page-development/full-code-page-development#react-全代码页面" },
    { text: "创建 React 全代码页面", href: "portal-and-page-development/full-code-page-development#创建-react-全代码页面" },
    { text: "使用样式", href: "portal-and-page-development/full-code-page-development#使用样式" },
    { text: "使用本地资源", href: "portal-and-page-development/full-code-page-development#使用本地资源" },
    { text: "使用 Ant Design 的组件", href: "portal-and-page-development/full-code-page-development#使用-ant-design-的组件" },
    { text: "内嵌已有常规页面", href: "portal-and-page-development/full-code-page-development#内嵌已有常规页面" },
    { text: "使用标准组件", href: "portal-and-page-development/full-code-page-development#使用标准组件" },
    { text: "调用数据模型函数", href: "portal-and-page-development/full-code-page-development#调用数据模型函数" },
    { text: "调用服务函数", href: "portal-and-page-development/full-code-page-development#调用服务函数" },
    { text: "Vue全代码页面", href: "portal-and-page-development/full-code-page-development#vue全代码页面" },
    { text: "使用第三方包", href: "portal-and-page-development/full-code-page-development#使用第三方包" },
    { text: "打包配置的使用", href: "portal-and-page-development/full-code-page-development#打包配置的使用" }
  ]} />
</IndexCard>

</div>

## 在页面中使用功能组件
丰富的组件库是你的超级工具箱。拖拽一个表格展示数据，添加表单收集信息，插入图表让数据可视化。让复杂的前端开发变得简单直观。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="form-components"
  href="using-functional-components-in-pages/form-components"
  description="强大的表单构建工具，支持数据收集、验证、权限控制和复杂业务规则配置。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置与配置项管理", href: "using-functional-components-in-pages/form-components#基础配置与配置项管理" },
    { text: "字段校验与交互", href: "using-functional-components-in-pages/form-components#字段校验与交互" },
    { text: "布局设计", href: "using-functional-components-in-pages/form-components#布局设计" },
    { text: "使用自定义控件渲染字段", href: "using-functional-components-in-pages/form-components#使用自定义控件渲染字段" },
    { text: "事件配置", href: "using-functional-components-in-pages/form-components#事件配置" },
    { text: "高级功能", href: "using-functional-components-in-pages/form-components#高级功能" },
    { text: "批量编辑表单配置", href: "using-functional-components-in-pages/form-components#批量编辑表单配置" },
    { text: "批量编辑表单事件与交互", href: "using-functional-components-in-pages/form-components#批量编辑表单事件与交互" },
    { text: "数据修正配置", href: "using-functional-components-in-pages/form-components#数据修正配置" },
    { text: "数据修正使用", href: "using-functional-components-in-pages/form-components#数据修正使用" }
  ]} />
</IndexCard>

<IndexCard
  title="基础表格"
  href="using-functional-components-in-pages/table-components#基础表格"
  description="标准数据表格展示组件，支持数据源绑定、字段自定义、分页和排序等基础功能。"
>
  <LinkGrid columns={2} links={[
    { text: "设置数据源", href: "using-functional-components-in-pages/table-components#设置数据源" },
    { text: "自定义显示字段", href: "using-functional-components-in-pages/table-components#自定义显示字段" },
    { text: "按分组显示字段", href: "using-functional-components-in-pages/table-components#按分组显示字段" },
    { text: "设置分组名和背景色", href: "using-functional-components-in-pages/table-components#设置分组名和背景色" },
    { text: "配置字段的属性", href: "using-functional-components-in-pages/table-components#配置字段的属性" },
    { text: "冻结字段", href: "using-functional-components-in-pages/table-components#冻结字段" },
    { text: "行内编辑", href: "using-functional-components-in-pages/table-components#行内编辑" },
    { text: "字段统计", href: "using-functional-components-in-pages/table-components#字段统计" },
    { text: "自定义字段渲染器与字段编辑器", href: "using-functional-components-in-pages/table-components#自定义字段渲染器与字段编辑器" },
    { text: "添加按钮", href: "using-functional-components-in-pages/table-components#添加按钮" },
    { text: "删除按钮", href: "using-functional-components-in-pages/table-components#删除按钮" },
    { text: "多个按钮折叠到\"更多\"中", href: "using-functional-components-in-pages/table-components#多个按钮折叠到更多中" },
    { text: "设置分页大小/禁用选择列/禁用排序/首次加载组件时刷新数据", href: "using-functional-components-in-pages/table-components#设置分页大小禁用选择列禁用排序首次加载组件时刷新数据" },
    { text: "极速模式", href: "using-functional-components-in-pages/table-components#极速模式" },
    { text: "编辑规则", href: "using-functional-components-in-pages/table-components#编辑规则" },
    { text: "样式规则", href: "using-functional-components-in-pages/table-components#样式规则" },
    { text: "设置关联数据层级和表格无数据时文案", href: "using-functional-components-in-pages/table-components#设置关联数据层级和表格无数据时文案" },
    { text: "表格事件", href: "using-functional-components-in-pages/table-components#表格事件" },
    { text: "表格组件变量", href: "using-functional-components-in-pages/table-components#表格组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="分组表"
  href="using-functional-components-in-pages/table-components#分组表"
  description="按指定字段对数据进行分组展示的表格组件，适用于层次化数据管理。"
>
  <LinkGrid links={[
    { text: "分组字段配置", href: "using-functional-components-in-pages/table-components#分组字段配置" },
    { text: "与基础表格相同的配置", href: "using-functional-components-in-pages/table-components#与基础表格相同的配置" },
    { text: "与基础表格相同的事件", href: "using-functional-components-in-pages/table-components#与基础表格相同的事件" },
    { text: "与基础表格相同的组件变量", href: "using-functional-components-in-pages/table-components#与基础表格相同的组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="级联表"
  href="using-functional-components-in-pages/table-components#级联表"
  description="处理具有父子关系的层级数据，支持树形结构展示和操作。"
>
  <LinkGrid links={[
    { text: "级联表示例数据", href: "using-functional-components-in-pages/table-components#级联表示例数据" },
    { text: "配置级联逻辑字段", href: "using-functional-components-in-pages/table-components#配置级联逻辑字段" },
    { text: "级联表使用区效果", href: "using-functional-components-in-pages/table-components#级联表使用区效果" },
    { text: "与基础表格相同的配置", href: "using-functional-components-in-pages/table-components#与基础表格相同的配置-1" },
    { text: "与基础表格相同的事件", href: "using-functional-components-in-pages/table-components#与基础表格相同的事件-1" },
    { text: "与基础表格相同的表格变量", href: "using-functional-components-in-pages/table-components#与基础表格相同的表格变量" }
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
  href="using-functional-components-in-pages/table-components#交叉表"
  description="多维数据透视表，支持行列交叉分析，适用于数据统计和报表展示。"
>
  <LinkGrid columns={2} links={[
    { text: "初始化配置", href: "using-functional-components-in-pages/table-components#初始化配置" },
    { text: "配置维度和指标", href: "using-functional-components-in-pages/table-components#配置维度和指标" },
    { text: "按年/季度/月/周/日统计", href: "using-functional-components-in-pages/table-components#按年季度月周日统计" },
    { text: "配置指标", href: "using-functional-components-in-pages/table-components#配置指标" },
    { text: "配置计算指标", href: "using-functional-components-in-pages/table-components#配置计算指标" },
    { text: "自定义指标属性", href: "using-functional-components-in-pages/table-components#自定义指标属性" },
    { text: "配置指标统计方式", href: "using-functional-components-in-pages/table-components#配置指标统计方式" },
    { text: "指标数据筛选", href: "using-functional-components-in-pages/table-components#指标数据筛选" },
    { text: "配置图表样式", href: "using-functional-components-in-pages/table-components#配置图表样式" },
    { text: "表头/表身对齐方式", href: "using-functional-components-in-pages/table-components#表头表身对齐方式" },
    { text: "行/列样式", href: "using-functional-components-in-pages/table-components#行列样式" },
    { text: "导出/刷新/滚动显示 按钮", href: "using-functional-components-in-pages/table-components#导出刷新滚动显示-按钮" },
    { text: "显示合计值", href: "using-functional-components-in-pages/table-components#显示合计值" },
    { text: "交叉表事件", href: "using-functional-components-in-pages/table-components#交叉表事件" },
    { text: "交叉表组件变量", href: "using-functional-components-in-pages/table-components#交叉表组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="行转列"
  href="using-functional-components-in-pages/table-components#行转列"
  description="将行数据转换为列显示的特殊表格模式，适用于动态字段展示场景。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置", href: "using-functional-components-in-pages/table-components#基础配置" },
    { text: "自定义字段名称/对齐方式", href: "using-functional-components-in-pages/table-components#自定义字段名称对齐方式" },
    { text: "自定义字段渲染器", href: "using-functional-components-in-pages/table-components#自定义字段渲染器" },
    { text: "统计列", href: "using-functional-components-in-pages/table-components#统计列" },
    { text: "导出/编辑/默认加载数据", href: "using-functional-components-in-pages/table-components#导出编辑默认加载数据" },
    { text: "值点击后事件", href: "using-functional-components-in-pages/table-components#值点击后事件" },
    { text: "按钮配置", href: "using-functional-components-in-pages/table-components#按钮配置" },
    { text: "行转列事件", href: "using-functional-components-in-pages/table-components#行转列事件" },
    { text: "行转列组件变量", href: "using-functional-components-in-pages/table-components#行转列组件变量" }
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
  title="树组件（正在编辑中）"
  description="层次化数据展示组件，支持树形结构的展示、选择和操作。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="列表组件"
  href="using-functional-components-in-pages/list-components"
  description="灵活的数据列表展示组件，支持标题、摘要、按钮等配置，适用于各类列表展示场景。"
>
  <LinkGrid columns={2} links={[
    { text: "配置列表标题", href: "using-functional-components-in-pages/list-components#配置列表标题" },
    { text: "设置摘要内容", href: "using-functional-components-in-pages/list-components#设置摘要内容" },
    { text: "摘要中显示字段标题", href: "using-functional-components-in-pages/list-components#摘要中显示字段标题" },
    { text: "设置摘要内容布局", href: "using-functional-components-in-pages/list-components#设置摘要内容布局" },
    { text: "列表组件按钮", href: "using-functional-components-in-pages/list-components#列表组件按钮" },
    { text: "添加按钮", href: "using-functional-components-in-pages/list-components#添加按钮" },
    { text: "修改按钮属性", href: "using-functional-components-in-pages/list-components#修改按钮属性" },
    { text: "按钮收起到更多", href: "using-functional-components-in-pages/list-components#按钮收起到更多" },
    { text: "按钮拖拽排序", href: "using-functional-components-in-pages/list-components#按钮拖拽排序" },
    { text: "设置底部按钮大小", href: "using-functional-components-in-pages/list-components#设置底部按钮大小" },
    { text: "首次加载组件时刷新数据", href: "using-functional-components-in-pages/list-components#首次加载组件时刷新数据" },
    { text: "是否启用点击行事件", href: "using-functional-components-in-pages/list-components#是否启用点击行事件" },
    { text: "默认选中第一条数据", href: "using-functional-components-in-pages/list-components#默认选中第一条数据" },
    { text: "显示行间距", href: "using-functional-components-in-pages/list-components#显示行间距" },
    { text: "列表组件事件", href: "using-functional-components-in-pages/list-components#列表组件事件" },
    { text: "点击行事件", href: "using-functional-components-in-pages/list-components#点击行事件" },
    { text: "按钮事件", href: "using-functional-components-in-pages/list-components#按钮事件" },
    { text: "列表组件变量", href: "using-functional-components-in-pages/list-components#列表组件变量当前展示的数据行列表当前操作的单行数据当前筛选条件" },
    { text: "刷新列表组件", href: "using-functional-components-in-pages/list-components#刷新列表组件" }
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
  href="using-functional-components-in-pages/filter-components"
  description="基于数据模型的高级筛选组件，支持简单、复杂和自由筛选模式。"
>
  <LinkGrid links={[
    { text: "简单筛选", href: "using-functional-components-in-pages/filter-components#简单筛选" },
    { text: "复杂筛选", href: "using-functional-components-in-pages/filter-components#复杂筛选" },
    { text: "自由筛选", href: "using-functional-components-in-pages/filter-components#自由筛选" },
    { text: "布局设置", href: "using-functional-components-in-pages/filter-components#布局设置" },
    { text: "筛选器的使用", href: "using-functional-components-in-pages/filter-components#筛选器的使用" }
  ]} />
</IndexCard>

<IndexCard
  title="通用筛选器"
  href="using-functional-components-in-pages/filter-components"
  description="灵活的通用筛选组件，支持自定义字段配置和多种触发模式。"
>
  <LinkGrid columns={2} links={[
    { text: "筛选字段配置", href: "using-functional-components-in-pages/filter-components#筛选字段配置" },
    { text: "快速布局", href: "using-functional-components-in-pages/filter-components#快速布局" },
    { text: "显示 查询/重置 按钮", href: "using-functional-components-in-pages/filter-components#显示-查询重置-按钮" },
    { text: "条件变更后触发查询", href: "using-functional-components-in-pages/filter-components#条件变更后触发查询" },
    { text: "首次加载进行筛选", href: "using-functional-components-in-pages/filter-components#首次加载进行筛选" },
    { text: "筛选器的使用", href: "using-functional-components-in-pages/filter-components#筛选器的使用-1" }
  ]} />
</IndexCard>

<IndexCard
  title="日历"
  href="using-functional-components-in-pages/time-management-components#日历"
  description="日程管理和时间安排组件，支持事件创建、编辑和视图切换。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "using-functional-components-in-pages/time-management-components#数据模型准备及组件创建" },
    { text: "基础配置", href: "using-functional-components-in-pages/time-management-components#基础配置" },
    { text: "日程类型", href: "using-functional-components-in-pages/time-management-components#日程类型" },
    { text: "日/周/月视图切换", href: "using-functional-components-in-pages/time-management-components#日周月视图切换" },
    { text: "切换时间", href: "using-functional-components-in-pages/time-management-components#切换时间" },
    { text: "列表展示及搜索", href: "using-functional-components-in-pages/time-management-components#列表展示及搜索" },
    { text: "拖拽排期", href: "using-functional-components-in-pages/time-management-components#拖拽排期" },
    { text: "按钮配置", href: "using-functional-components-in-pages/time-management-components#按钮配置" },
    { text: "首次加载组件时刷新数据", href: "using-functional-components-in-pages/time-management-components#首次加载组件时刷新数据" },
    { text: "新增日程", href: "using-functional-components-in-pages/time-management-components#新增日程" },
    { text: "拖拽日程", href: "using-functional-components-in-pages/time-management-components#拖拽日程" }
  ]} />
</IndexCard>

<IndexCard
  title="时间轴"
  href="using-functional-components-in-pages/time-management-components#时间轴"
  description="时间线展示组件，适用于展示历史记录和流程进度。"
>
  <LinkGrid links={[
    { text: "数据模型准备及组件创建", href: "using-functional-components-in-pages/time-management-components#数据模型准备及组件创建-1" },
    { text: "基础配置", href: "using-functional-components-in-pages/time-management-components#基础配置-1" },
    { text: "颜色类型", href: "using-functional-components-in-pages/time-management-components#颜色类型" },
    { text: "位置", href: "using-functional-components-in-pages/time-management-components#位置" },
    { text: "按钮配置", href: "using-functional-components-in-pages/time-management-components#按钮配置-1" },
    { text: "首次加载组件时刷新数据", href: "using-functional-components-in-pages/time-management-components#首次加载组件时刷新数据-1" }
  ]} />
</IndexCard>

<IndexCard
  title="甘特图"
  href="using-functional-components-in-pages/time-management-components#甘特图"
  description="项目管理和进度追踪组件，支持任务依赖关系和进度可视化。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "using-functional-components-in-pages/time-management-components#数据模型准备及组件创建-2" },
    { text: "基础配置", href: "using-functional-components-in-pages/time-management-components#基础配置-2" },
    { text: "进度", href: "using-functional-components-in-pages/time-management-components#进度" },
    { text: "层级关系", href: "using-functional-components-in-pages/time-management-components#层级关系" },
    { text: "先后关系", href: "using-functional-components-in-pages/time-management-components#先后关系" },
    { text: "日/周/月/季/年视图切换", href: "using-functional-components-in-pages/time-management-components#日周月季年视图切换" },
    { text: "列表显示字段", href: "using-functional-components-in-pages/time-management-components#列表显示字段" },
    { text: "浮层显示字段", href: "using-functional-components-in-pages/time-management-components#浮层显示字段" },
    { text: "按钮配置", href: "using-functional-components-in-pages/time-management-components#按钮配置-2" },
    { text: "首次加载组件时刷新数据", href: "using-functional-components-in-pages/time-management-components#首次加载组件时刷新数据-2" },
    { text: "拖拽日期进度", href: "using-functional-components-in-pages/time-management-components#拖拽日期进度" },
    { text: "允许添加排期", href: "using-functional-components-in-pages/time-management-components#允许添加排期" }
  ]} />
</IndexCard>

<IndexCard
  title="按钮组件"
  description="各种类型的按钮组件，支持不同样式和交互效果。"
>
  <LinkGrid columns={2} links={[
    { text: "按钮组件创建", href: "using-functional-components-in-pages/button-components#按钮组件创建" },
    { text: "按钮标题/图标/类型/大小配置", href: "using-functional-components-in-pages/button-components#标题图标类型配置" },
    { text: "按钮点击后事件", href: "using-functional-components-in-pages/button-components#点击后事件" }
  ]} />
</IndexCard>

<IndexCard
  title="布局组件（正在编辑中）"
  description="页面布局和容器组件，包括弹窗、标签页等界面结构元素。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="审批组件"
  description="审批流程相关的界面组件，支持申请发起和审批处理。"
>
  <LinkGrid columns={2} links={[
    { text: "发起申请组件的创建", href: "using-functional-components-in-pages/approval-components#创建发起申请组件" },
    { text: "发起申请的参数配置", href: "using-functional-components-in-pages/approval-components#参数配置" },
    { text: "发起申请的处理后/刷新后事件", href: "using-functional-components-in-pages/approval-components#处理后刷新后事件" },
    { text: "审批处理组件创建", href: "using-functional-components-in-pages/approval-components#创建审批处理组件" },
    { text: "审批处理的参数配置", href: "using-functional-components-in-pages/approval-components#参数配置-1" },
    { text: "是否保留历史审批记录", href: "using-functional-components-in-pages/approval-components#保留历史审批记录" },
    { text: "审批处理的处理后/刷新后事件", href: "using-functional-components-in-pages/approval-components#处理后刷新后事件-1" }
  ]} />
</IndexCard>

<IndexCard
  title="支付组件"
  href="using-functional-components-in-pages/payment-components"
  description="集成支付功能的组件，支持多种支付方式和支付流程。"
>
  <LinkGrid links={[
    { text: "创建组件", href: "using-functional-components-in-pages/payment-components#支付组件的创建" },
    { text: "组件函数", href: "using-functional-components-in-pages/payment-components#发起支付函数" },
    { text: "组件事件逻辑", href: "using-functional-components-in-pages/payment-components#事件逻辑" },
    { text: "组件的使用", href: "using-functional-components-in-pages/payment-components#组件使用" }
  ]} />
</IndexCard>

<IndexCard
  title="数据解析与导入（正在编辑中）"
  description="数据导入和解析工具，支持Excel等格式的数据批量导入。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="全代码组件"
  href="using-functional-components-in-pages/full-code-components"
  description="完全自定义的代码组件，支持高度个性化的功能实现。"
>
  <LinkGrid columns={2} links={[
    { text: "创建全代码组件", href: "using-functional-components-in-pages/full-code-components#创建全代码组件" },
    { text: "界面渲染器 Page 与逻辑处理类", href: "using-functional-components-in-pages/full-code-components#界面渲染器-page-与逻辑处理类" },
    { text: "通过组件实例调用其他组件", href: "using-functional-components-in-pages/full-code-components#通过组件实例调用其他组件" },
    { text: "响应其他组件的事件", href: "using-functional-components-in-pages/full-code-components#响应其他组件的事件" },
    { text: "事件订阅原理", href: "using-functional-components-in-pages/full-code-components#事件订阅原理" },
    { text: "在自定义组件中响应", href: "using-functional-components-in-pages/full-code-components#在自定义组件中响应" },
    { text: "可订阅的事件", href: "using-functional-components-in-pages/full-code-components#可订阅的事件" },
    { text: "双向通信示例", href: "using-functional-components-in-pages/full-code-components#双向通信示例" }
  ]} />
</IndexCard>

</div>

<div style={{textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999'}}>
  点击上方"查看更多组件"可收起
</div>

  </details>
</div>

## ai-llm
接入GPT-4、Claude、通义千问等主流大模型。支持多厂商容灾和私有化部署，为应用提供智能对话、文本生成、代码辅助等AI能力。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid links={[
    { text: "主流大模型厂商支持列表", href: "ai-llm#主流大模型厂商支持列表" },
    { text: "大模型厂商元素的创建", href: "ai-llm#大模型厂商元素的创建" },
    { text: "重试及备用API Key机制", href: "ai-llm#重试及备用api-key机制" },
    { text: "私有化大模型集成", href: "ai-llm#私有化大模型集成" },
    { text: "在页面中调用大模型", href: "ai-llm#在页面中调用大模型" },
    { text: "在后端函数中调用大模型", href: "ai-llm#在后端函数中调用大模型" },
    { text: "大模型编程接口", href: "ai-llm#大模型编程接口" }
  ]} />
</IndexCard>

</div>

## vector-database
企业知识的智能存储引擎。将文本转化为向量数据，实现语义级精准搜索，为智能问答和知识检索系统提供基础支撑。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid links={[
    { text: "Chromavector-database", href: "vector-database#chromavector-database" },
    { text: "本地vector-database配置", href: "vector-database#本地vector-database配置" },
    { text: "远程vector-database连接", href: "vector-database#远程vector-database连接" },
    { text: "vector-database编程接口", href: "vector-database#vector-database编程接口" }
  ]} />
</IndexCard>

</div>

## ai-knowledge-base
将企业文档、手册、FAQ转化为智能知识库。支持文档自动处理、智能分段、语义检索，让AI基于企业知识精准回答问题。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid columns={2} links={[
    { text: "创建ai-knowledge-base元素", href: "ai-knowledge-base#创建ai-knowledge-base元素" },
    { text: "ai-knowledge-base的管理", href: "ai-knowledge-base#ai-knowledge-base的管理" },
    { text: "文档管理", href: "ai-knowledge-base#文档管理" },
    { text: "ai-knowledge-base设置", href: "ai-knowledge-base#ai-knowledge-base设置" },
    { text: "查询测试", href: "ai-knowledge-base#查询测试" },
    { text: "在后端可视化编程中调用ai-knowledge-base", href: "ai-knowledge-base#在后端可视化编程中调用ai-knowledge-base" },
    { text: "在ai-agent中使用ai-knowledge-base", href: "ai-knowledge-base#在ai-agent中使用ai-knowledge-base" },
    { text: "ai-knowledge-base编程接口", href: "ai-knowledge-base#ai-knowledge-base编程接口" },
    { text: "原理及参数说明", href: "ai-knowledge-base#原理及参数说明" },
    { text: "向量化配置说明", href: "ai-knowledge-base#向量化配置说明" }
  ]} />
</IndexCard>

</div>

## ai-agent
具备推理和行动能力的智能代理。通过提示词和工具配置，让AI自主分析问题、制定方案、执行任务，处理复杂业务场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid columns={2} links={[
    { text: "创建ReActAgent", href: "ai-agent#创建reactagent" },
    { text: "编写系统提示词", href: "ai-agent#编写系统提示词" },
    { text: "基于模板编写系统提示词", href: "ai-agent#基于模板编写系统提示词" },
    { text: "在提示词中使用变量", href: "ai-agent#在提示词中使用变量" },
    { text: "选择模型并配置参数", href: "ai-agent#选择模型并配置参数" },
    { text: "为Agent编写简介描述", href: "ai-agent#为agent编写简介描述" },
    { text: "配置运行状态存储仓", href: "ai-agent#配置运行状态存储仓" },
    { text: "内存存储", href: "ai-agent#内存存储" },
    { text: "数据库存储", href: "ai-agent#数据库存储" },
    { text: "配置输入变量", href: "ai-agent#配置输入变量" },
    { text: "配置输出结果", href: "ai-agent#配置输出结果" },
    { text: "为Agent添加工具", href: "ai-agent#为agent添加工具" },
    { text: "Agent调用模型函数", href: "ai-agent#agent调用模型函数" },
    { text: "Agent调用服务函数", href: "ai-agent#agent调用服务函数" },
    { text: "Agent调用MCP服务", href: "ai-agent#agent调用mcp服务" },
    { text: "将MCP配置转为环境变量", href: "ai-agent#将mcp配置转为环境变量" },
    { text: "Agent调用外部API", href: "ai-agent#agent调用外部api" },
    { text: "Agent调用页面函数", href: "ai-agent#agent调用页面函数" },
    { text: "启用/关闭工具函数", href: "ai-agent#启用关闭工具函数" },
    { text: "工具函数调用前/后事件触发", href: "ai-agent#工具函数调用前后事件触发" },
    { text: "工具函数执行前的人工确认", href: "ai-agent#工具函数执行前的人工确认" },
    { text: "限制工具函数调用的用户角色", href: "ai-agent#限制工具函数调用的用户角色" },
    { text: "集成知识库实现检索增强生成（RAG）", href: "ai-agent#集成知识库实现检索增强生成rag" },
    { text: "在前端函数中调用Agent", href: "ai-agent#在前端函数中调用agent" },
    { text: "在页面助理中测试Agent", href: "ai-agent#在页面助理中测试agent" },
    { text: "在后端服务函数中调用Agent", href: "ai-agent#在后端服务函数中调用agent" },
    { text: "源码模式修改Agent", href: "ai-agent#源码模式修改agent" },
    { text: "自定义回调处理器", href: "ai-agent#自定义回调处理器" },
    { text: "Agent的流式输出", href: "ai-agent#agent的流式输出" }
  ]} />
</IndexCard>

</div>

## ai-assistant
可视化的智能工作流引擎。通过拖拽节点编排业务流程，结合AI决策和人机交互，实现客服、审批、数据处理等场景的智能自动化。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard>
  <LinkGrid columns={2} links={[
    { text: "什么是ai-assistant", href: "ai-assistant#什么是ai-assistant" },
    { text: "创建ai-assistant", href: "ai-assistant#创建ai-assistant" },
    { text: "可视化编排", href: "ai-assistant#可视化编排" },
    { text: "开始节点", href: "ai-assistant#开始节点" },
    { text: "路由决策", href: "ai-assistant#路由决策" },
    { text: "ai-agent", href: "ai-assistant#ai-agent" },
    { text: "对话区人机交互", href: "ai-assistant#对话区人机交互" },
    { text: "工作区人机交互", href: "ai-assistant#工作区人机交互" },
    { text: "函数调用", href: "ai-assistant#函数调用" },
    { text: "条件分支", href: "ai-assistant#条件分支" },
    { text: "多任务执行", href: "ai-assistant#多任务执行" },
    { text: "事件类型概览", href: "ai-assistant#事件类型概览" },
    { text: "前端工作区事件", href: "ai-assistant#前端工作区事件" },
    { text: "后端业务事件", href: "ai-assistant#后端业务事件" },
    { text: "运行状态数据", href: "ai-assistant#运行状态数据" },
    { text: "运行状态存储库", href: "ai-assistant#运行状态存储库" },
    { text: "高级设置", href: "ai-assistant#高级设置" },
    { text: "使用指南", href: "ai-assistant#使用指南" },
    { text: "欢迎语与开场白", href: "ai-assistant#欢迎语与开场白" },
    { text: "消息输出", href: "ai-assistant#消息输出" },
    { text: "发送AI消息", href: "ai-assistant#发送ai消息" },
    { text: "对话记录管理", href: "ai-assistant#对话记录管理" },
    { text: "全代码开发", href: "ai-assistant#全代码开发" },
    { text: "示例演示", href: "ai-assistant#示例演示" },
    { text: "如何选择合适的节点类型？", href: "ai-assistant#如何选择合适的节点类型" },
    { text: "流程卡住常见原因和解决方法", href: "ai-assistant#流程卡住常见原因和解决方法" }
  ]} />
</IndexCard>

</div>

## 数据建模
为你的应用设计强大的数据基础。无需复杂的SQL知识，通过可视化方式创建数据表，设计字段类型，建立关联关系。让数据管理变得轻松高效。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="数据表模型"
  href="data-modeling/data-table-model"
  description="应用数据的基础结构，学习如何创建和配置数据表，设计字段类型和约束。"
>
  <LinkGrid links={[
    { text: "创建数据表模型", href: "data-modeling/data-table-model#创建数据表模型" },
    { text: "设计表字段与数据类型", href: "data-modeling/data-table-model#设计表字段与数据类型" },
    { text: "配置表索引优化查询", href: "data-modeling/data-table-model#配置表索引优化查询" },
    { text: "使用内置数据管理功能", href: "data-modeling/data-table-model#使用内置数据管理功能" },
    { text: "扩展模型功能", href: "data-modeling/data-table-model#扩展模型功能" }
  ]} />
</IndexCard>

<IndexCard
  title="聚合表模型"
  href="data-modeling/aggregate-table-model"
  description="多表数据整合和统计分析，支持复杂的数据聚合和计算功能。"
>
  <LinkGrid columns={2} links={[
    { text: "新建聚合表模型", href: "data-modeling/aggregate-table-model#新建聚合表模型" },
    { text: "多表数据合并", href: "data-modeling/aggregate-table-model#多表数据合并" },
    { text: "多表横向连接", href: "data-modeling/aggregate-table-model#多表横向连接" },
    { text: "分组聚合统计", href: "data-modeling/aggregate-table-model#分组聚合统计" },
    { text: "扩展自定义计算字段", href: "data-modeling/aggregate-table-model#扩展自定义计算字段" },
    { text: "先聚合后筛选", href: "data-modeling/aggregate-table-model#先聚合后筛选" },
    { text: "先筛选后聚合（推荐）", href: "data-modeling/aggregate-table-model#先筛选后聚合推荐" }
  ]} />
</IndexCard>

<IndexCard
  title="扩展表模型"
  href="data-modeling/extended-table-model"
  description="基于现有表的数据扩展，通过关联其他数据表实现业务字段扩展和多表数据整合。"
>
  <LinkGrid columns={2} links={[
    { text: "扩展表创建", href: "data-modeling/extended-table-model#扩展表创建" },
    { text: "连接设计", href: "data-modeling/extended-table-model#连接设计" },
    { text: "设置基准表筛选条件", href: "data-modeling/extended-table-model#设置基准表筛选条件" },
    { text: "添加数据表", href: "data-modeling/extended-table-model#添加数据表" },
    { text: "实时编辑统计表配置", href: "data-modeling/extended-table-model#实时编辑统计表配置" },
    { text: "字段统计", href: "data-modeling/extended-table-model#字段统计" },
    { text: "添加公式字段", href: "data-modeling/extended-table-model#添加公式字段" },
    { text: "修改字段别名", href: "data-modeling/extended-table-model#修改字段别名" },
    { text: "函数设计", href: "data-modeling/extended-table-model#函数设计" },
    { text: "新建函数", href: "data-modeling/extended-table-model#新建函数" },
    { text: "源码查看编辑", href: "data-modeling/extended-table-model#源码查看编辑" }
  ]} />
</IndexCard>

<IndexCard
  title="数据对象模型"
  href="data-modeling/data-object-model"
  description="专为全代码开发设计的数据结构，类似DTO，用于业务逻辑中的数据结构化表达和传递。"
>
  <LinkGrid links={[
    { text: "数据对象模型创建", href: "data-modeling/data-object-model#数据对象模型创建" },
    { text: "数据对象模型使用", href: "data-modeling/data-object-model#数据对象模型使用" },
    { text: "自定义字段", href: "data-modeling/data-object-model#自定义字段" },
    { text: "模型函数重写", href: "data-modeling/data-object-model#模型函数重写" },
    { text: "定义新函数", href: "data-modeling/data-object-model#定义新函数" }
  ]} />
</IndexCard>

<IndexCard
  title="支持的数据库厂商"
  href="data-modeling/supported-database-vendors"
  description="了解JitAi支持的各种数据库类型和连接配置。"
>
  <LinkGrid links={[
    { text: "场景选择建议", href: "data-modeling/supported-database-vendors#场景选择建议" },
    { text: "与云厂商的兼容性说明", href: "data-modeling/supported-database-vendors#与云厂商的兼容性说明" },
    { text: "数据库元素使用", href: "data-modeling/supported-database-vendors#数据库元素使用" }
  ]} />
</IndexCard>

<IndexCard
  title="管理数据库连接"
  href="data-modeling/manage-database-connections"
  description="配置和管理多个数据库连接，支持多数据源应用开发。"
>
  <LinkGrid links={[
    { text: "创建数据库连接", href: "data-modeling/manage-database-connections#创建数据库连接" },
    { text: "多数据库连接管理", href: "data-modeling/manage-database-connections#多数据库连接管理" },
    { text: "数据库连接安全配置", href: "data-modeling/manage-database-connections#数据库连接安全配置" },
    { text: "连接测试与故障排查", href: "data-modeling/manage-database-connections#连接测试与故障排查" }
  ]} />
</IndexCard>

<IndexCard
  title="事务管理"
  href="data-modeling/transaction-management"
  description="数据库事务控制和一致性管理，确保数据操作的可靠性。"
>
  <LinkGrid links={[
    { text: "默认事务管理机制", href: "data-modeling/transaction-management#默认事务管理机制" },
    { text: "手动控制事务提交/回滚", href: "data-modeling/transaction-management#手动控制事务提交回滚" },
    { text: "事务装饰器", href: "data-modeling/transaction-management#事务装饰器" }
  ]} />
</IndexCard>

</div>

## 用户与权限
构建安全可靠的用户体系。支持多种登录方式，灵活设计组织架构，精细化权限分配。让不同用户各司其职，确保数据安全和操作规范。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="组织架构"
  description="企业组织结构管理，包括部门、岗位和人员层级关系配置。"
>
  <LinkGrid links={[
    { text: "标准组织架构", href: "user-and-permission/organizational-structure#标准组织" },
    { text: "允许新注册用户加入", href: "user-and-permission/organizational-structure#允许新注册用户加入" },
    { text: "钉钉自建组织", href: "user-and-permission/organizational-structure#钉钉自建组织" },
    { text: "企业微信自建组织", href: "user-and-permission/organizational-structure#企业微信自建组织" },
    { text: "通讯录管理入口", href: "user-and-permission/organizational-structure#通讯录管理入口" },
    { text: "钉钉自建组织", href: "user-and-permission/organizational-structure#钉钉自建组织" },
    { text: "企业微信自建组织", href: "user-and-permission/organizational-structure#企业微信自建组织" },
    { text: "部门成员搜索", href: "user-and-permission/organizational-structure#部门成员搜索" },
    { text: "设置组织负责人", href: "user-and-permission/organizational-structure#设置组织负责人" },
    { text: "新建部门", href: "user-and-permission/organizational-structure#新建部门" },
    { text: "添加成员", href: "user-and-permission/organizational-structure#添加成员" },
    { text: "导入成员", href: "user-and-permission/organizational-structure#导入成员" },
    { text: "导出成员", href: "user-and-permission/organizational-structure#导出成员" },
    { text: "调整部门", href: "user-and-permission/organizational-structure#调整部门" },
    { text: "成员转为离职", href: "user-and-permission/organizational-structure#成员转为离职" },
    { text: "新建角色", href: "user-and-permission/organizational-structure#新建角色" },
    { text: "新建角色组", href: "user-and-permission/organizational-structure#新建角色组" },
    { text: "管理角色成员", href: "user-and-permission/organizational-structure#管理角色成员" },
    { text: "同步钉钉组织架构", href: "user-and-permission/organizational-structure#同步钉钉组织架构" },
    { text: "同步企业微信组织架构", href: "user-and-permission/organizational-structure#同步企业微信组织架构" },
  ]} />
</IndexCard>

<IndexCard
  title="登录认证"
  description="用户身份验证和登录方式配置，支持多种认证模式。"
>
  <LinkGrid links={[
    { text: "登录方式创建", href: "user-and-permission/login-authentication#登录方式创建" },
    { text: "账号密码登录", href: "user-and-permission/login-authentication#账号密码登录" },
    { text: "手机号登录", href: "user-and-permission/login-authentication#手机号登录" },
    { text: "钉钉自建扫码登录", href: "user-and-permission/login-authentication#钉钉自建扫码登录" },
    { text: "企业微信自建扫码登录", href: "user-and-permission/login-authentication#企业微信自建扫码登录" },
    { text: "微信登录", href: "user-and-permission/login-authentication#微信登录" },
    { text: "微信公众号登录", href: "user-and-permission/login-authentication#微信公众号登录" },
    { text: "微信小程序登录", href: "user-and-permission/login-authentication#微信小程序登录" },
    { text: "Github登录", href: "user-and-permission/login-authentication#github登录" },
    { text: "Google登录", href: "user-and-permission/login-authentication#google登录" },
  ]} />
</IndexCard>

<IndexCard
  title="角色权限"
  href="user-and-permission/role-permissions"
  description="应用角色定义和权限分配，实现细粒度的访问控制。"
>
  <LinkGrid columns={2} links={[
    { text: "内置的3种应用角色", href: "user-and-permission/role-permissions#内置的3种应用角色" },
    { text: "匿名用户", href: "user-and-permission/role-permissions#匿名用户" },
    { text: "开发者", href: "user-and-permission/role-permissions#开发者" },
    { text: "管理员", href: "user-and-permission/role-permissions#管理员" },
    { text: "创建应用角色", href: "user-and-permission/role-permissions#创建应用角色" },
    { text: "应用角色的权限配置", href: "user-and-permission/role-permissions#应用角色的权限配置" },
    { text: "指定可访问的门户及菜单", href: "user-and-permission/role-permissions#指定可访问的门户及菜单" },
    { text: "在开发者门户中管理应用角色成员", href: "user-and-permission/role-permissions#在开发者门户中管理应用角色成员" },
    { text: "门户级的数据操作类型和操作范围控制", href: "user-and-permission/role-permissions#门户级的数据操作类型和操作范围控制" },
    { text: "组件的按钮权限控制", href: "user-and-permission/role-permissions#组件的按钮权限控制" },
    { text: "组件的数据字段读/写/统计权限控制", href: "user-and-permission/role-permissions#组件的数据字段读写统计权限控制" },
    { text: "多应用角色的分级管理", href: "user-and-permission/role-permissions#多应用角色的分级管理" },
    { text: "应用角色成员的管理", href: "user-and-permission/role-permissions#应用角色成员的管理" },
    { text: "成员的添加/删除", href: "user-and-permission/role-permissions#成员的添加删除" },
    { text: "成员在组织架构中的管理范围设置", href: "user-and-permission/role-permissions#成员在组织架构中的管理范围设置" }
  ]} />
</IndexCard>

</div>

## 业务逻辑开发
赋予应用强大的业务处理能力。通过可视化编程处理复杂业务规则，响应用户操作，执行后台任务。让逻辑编写像搭积木一样直观易懂。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="封装业务服务函数"
  href="business-logic-development/encapsulating-business-service-functions"
  description="后端业务逻辑实现，通过服务元素封装可复用的业务函数，提供API接口和数据处理服务。"
>
  <LinkGrid columns={2} links={[
    { text: "创建服务元素", href: "business-logic-development/encapsulating-business-service-functions#创建服务元素" },
    { text: "创建服务函数", href: "business-logic-development/encapsulating-business-service-functions#创建服务函数" },
    { text: "源码模式编辑服务函数", href: "business-logic-development/encapsulating-business-service-functions#源码模式编辑服务函数" },
    { text: "添加新的依赖库", href: "business-logic-development/encapsulating-business-service-functions#添加新的依赖库" },
    { text: "服务函数在哪里使用", href: "business-logic-development/encapsulating-business-service-functions#服务函数在哪里使用" },
    { text: "让AI更准确地理解服务函数", href: "business-logic-development/encapsulating-business-service-functions#让ai更准确地理解服务函数" },
    { text: "使用跨App服务元素调用授权接口", href: "business-logic-development/encapsulating-business-service-functions#使用跨app服务元素调用授权接口" },
    { text: "创建跨App服务元素", href: "business-logic-development/encapsulating-business-service-functions#创建跨app服务元素" },
    { text: "在函数逻辑中使用跨App服务元素", href: "business-logic-development/encapsulating-business-service-functions#在函数逻辑中使用跨app服务元素" }
  ]} />
</IndexCard>

<IndexCard
  title="事件处理"
  href="business-logic-development/event-handling"
  description="系统事件监听和处理机制，实现响应式业务逻辑。"
>
  <LinkGrid columns={2} links={[
    { text: "事件创建", href: "business-logic-development/event-handling#事件创建" },
    { text: "模型事件", href: "business-logic-development/event-handling#模型事件" },
    { text: "审批事件", href: "business-logic-development/event-handling#审批事件" },
    { text: "自定义事件", href: "business-logic-development/event-handling#自定义事件" },
    { text: "ai-assistant事件", href: "business-logic-development/event-handling#ai-assistant事件" },
    { text: "Agent工具调用事件", href: "business-logic-development/event-handling#agent工具调用事件" },
    { text: "服务函数替换事件内函数", href: "business-logic-development/event-handling#服务函数替换事件内函数" },
    { text: "事件启用", href: "business-logic-development/event-handling#事件启用" },
    { text: "事件同步/异步执行", href: "business-logic-development/event-handling#事件同步异步执行" },
    { text: "事件执行记录", href: "business-logic-development/event-handling#事件执行记录" },
    { text: "全代码查看/编辑", href: "business-logic-development/event-handling#全代码查看编辑" }
  ]} />
</IndexCard>

<IndexCard
  title="后台任务"
  href="business-logic-development/background-tasks"
  description="定时任务和异步处理，支持复杂的后台业务流程。"
>
  <LinkGrid columns={2} links={[
    { text: "任务创建", href: "business-logic-development/background-tasks#任务创建" },
    { text: "定时任务", href: "business-logic-development/background-tasks#定时任务" },
    { text: "日期字段任务", href: "business-logic-development/background-tasks#日期字段任务" },
    { text: "通用配置项", href: "business-logic-development/background-tasks#通用配置项" },
    { text: "任务执行函数开发", href: "business-logic-development/background-tasks#任务执行函数开发" },
    { text: "执行记录查看", href: "business-logic-development/background-tasks#执行记录查看" },
    { text: "源码模式", href: "business-logic-development/background-tasks#源码模式" }
  ]} />
</IndexCard>

</div>

## 审批流程
让企业审批流程变得高效有序。通过拖拽方式设计流程图，配置审批人和条件，自动化处理流转。告别繁琐的纸质审批，拥抱数字化办公。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="审批流程基础配置"
  href="approval-process/approval-process-basic-configuration"
  description="审批流程的创建和基础设置，包括流程节点配置和路径设计。"
>
  <LinkGrid columns={2} links={[
    { text: "创建流程", href: "approval-process/approval-process-basic-configuration#创建流程" },
    { text: "拖拽流程节点", href: "approval-process/approval-process-basic-configuration#拖拽流程节点" },
    { text: "审批流程默认页面", href: "approval-process/approval-process-basic-configuration#审批流程默认页面" },
    { text: "其他流程配置", href: "approval-process/approval-process-basic-configuration#其他流程配置" },
    { text: "同步审批信息到数据表模型", href: "approval-process/approval-process-basic-configuration#同步审批信息到数据表模型" },
    { text: "同步到第三方审批待办", href: "approval-process/approval-process-basic-configuration#同步到第三方审批待办" },
    { text: "评论功能", href: "approval-process/approval-process-basic-configuration#评论功能" },
    { text: "分享", href: "approval-process/approval-process-basic-configuration#分享" },
    { text: "打印审批单", href: "approval-process/approval-process-basic-configuration#打印审批单" },
    { text: "复用其他审批流程", href: "approval-process/approval-process-basic-configuration#复用其他审批流程" }
  ]} />
</IndexCard>

<IndexCard
  title="发起节点配置"
  href="approval-process/start-node-configuration"
  description="审批流程起始节点的配置，定义申请发起的条件和规则。"
>
  <LinkGrid columns={2} links={[
    { text: "流程撤销功能", href: "approval-process/start-node-configuration#流程撤销功能" },
    { text: "审批催办", href: "approval-process/start-node-configuration#审批催办" },
    { text: "审批暂存", href: "approval-process/start-node-configuration#审批暂存" },
    { text: "消息通知", href: "approval-process/start-node-configuration#消息通知" },
    { text: "当前节点用到的页面", href: "approval-process/start-node-configuration#当前节点用到的页面" },
    { text: "摘要信息显示", href: "approval-process/start-node-configuration#摘要信息显示" },
    { text: "字段的查看编辑权限", href: "approval-process/start-node-configuration#字段的查看编辑权限" },
    { text: "布局控件权限", href: "approval-process/start-node-configuration#布局控件权限" }
  ]} />
</IndexCard>

<IndexCard
  title="审批节点配置"
  href="approval-process/approval-node-configuration"
  description="审批环节的详细配置，包括审批人设置和审批规则。"
>
  <LinkGrid columns={2} links={[
    { text: "审批人设置", href: "approval-process/approval-node-configuration#审批人设置" },
    { text: "审批流转规则", href: "approval-process/approval-node-configuration#审批流转规则" },
    { text: "审批流程处理规则", href: "approval-process/approval-node-configuration#审批流程处理规则" },
    { text: "审批扩展功能配置", href: "approval-process/approval-node-configuration#审批扩展功能配置" },
    { text: "去重审批", href: "approval-process/approval-node-configuration#去重审批" },
    { text: "限时处理", href: "approval-process/approval-node-configuration#限时处理" },
    { text: "审批暂存", href: "approval-process/approval-node-configuration#审批暂存" },
    { text: "审批意见反馈", href: "approval-process/approval-node-configuration#审批意见反馈" },
    { text: "手写签名", href: "approval-process/approval-node-configuration#手写签名" },
    { text: "允许批量审批", href: "approval-process/approval-node-configuration#允许批量审批" },
    { text: "消息通知", href: "approval-process/approval-node-configuration#消息通知" },
    { text: "短信通知", href: "approval-process/approval-node-configuration#短信通知" },
    { text: "审批页面与权限控制", href: "approval-process/approval-node-configuration#审批页面与权限控制" },
    { text: "当前节点用到的页面", href: "approval-process/approval-node-configuration#当前节点用到的页面" },
    { text: "摘要信息显示", href: "approval-process/approval-node-configuration#摘要信息显示" },
    { text: "字段权限", href: "approval-process/approval-node-configuration#字段权限" },
    { text: "布局控件权限", href: "approval-process/approval-node-configuration#布局控件权限" }
  ]} />
</IndexCard>

<IndexCard
  title="特殊节点配置"
  href="approval-process/special-node-configuration"
  description="条件节点、并行节点等特殊流程节点的配置方法。"
>
  <LinkGrid columns={2} links={[
    { text: "抄送节点", href: "approval-process/special-node-configuration#抄送节点" },
    { text: "抄送人", href: "approval-process/special-node-configuration#抄送人" },
    { text: "短信通知", href: "approval-process/special-node-configuration#短信通知" },
    { text: "当前节点用到的页面", href: "approval-process/special-node-configuration#当前节点用到的页面" },
    { text: "字段权限", href: "approval-process/special-node-configuration#字段权限" },
    { text: "布局控件权限", href: "approval-process/special-node-configuration#布局控件权限" },
    { text: "分支节点", href: "approval-process/special-node-configuration#分支节点" },
    { text: "并行节点", href: "approval-process/special-node-configuration#并行节点" },
    { text: "子流程节点", href: "approval-process/special-node-configuration#子流程节点" },
    { text: "子流程名称", href: "approval-process/special-node-configuration#子流程名称" },
    { text: "子流程发起人", href: "approval-process/special-node-configuration#子流程发起人" },
    { text: "子流程流转规则", href: "approval-process/special-node-configuration#子流程流转规则" },
    { text: "当主流程流转至子流程", href: "approval-process/special-node-configuration#当主流程流转至子流程" },
    { text: "子流程流转后函数设计", href: "approval-process/special-node-configuration#子流程流转后函数设计" },
    { text: "单个子流程结束时更新主流程数据", href: "approval-process/special-node-configuration#单个子流程结束时更新主流程数据" },
    { text: "所有子流程结束时更新主流程数据", href: "approval-process/special-node-configuration#所有子流程结束时更新主流程数据" }
  ]} />
</IndexCard>

<IndexCard
  title="审批页面定制"
  href="approval-process/approval-page-customization"
  description="自定义审批界面和用户体验，提升审批效率。"
>
  <LinkGrid links={[
    { text: "审批页面高级定制", href: "approval-process/approval-page-customization#审批页面高级定制" },
    { text: "审批页面类型", href: "approval-process/approval-page-customization#审批页面类型" },
    { text: "自定义页面创建方式", href: "approval-process/approval-page-customization#自定义页面创建方式" }
  ]} />
</IndexCard>

<IndexCard
  title="审批流程的使用"
  href="approval-process/approval-process-usage"
  description="审批流程的实际应用和操作指南，包括发起和处理审批。"
>
  <LinkGrid links={[
    { text: "发起申请", href: "approval-process/approval-process-usage#发起申请" },
    { text: "待办中心", href: "approval-process/approval-process-usage#待办中心" },
    { text: "详情页面", href: "approval-process/approval-process-usage#详情页面" },
    { text: "委托他人处理", href: "approval-process/approval-process-usage#委托他人处理" },
    { text: "审批流程管理页面", href: "approval-process/approval-process-usage#审批流程管理页面" }
  ]} />
</IndexCard>

</div>

## 文件处理
轻松处理应用中的各种文件需求。支持多种格式文件上传下载，动态生成Word、Excel文档，让文件操作变得简单便捷。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="文件存储"
  href="file-processing/file-storage"
  description="文件上传、存储和管理系统，支持多种存储方式和文件操作。"
>
  <LinkGrid columns={2} links={[
    { text: "本地存储配置", href: "file-processing/file-storage#本地存储配置" },
    { text: "添加本地存储", href: "file-processing/file-storage#添加本地存储" },
    { text: "指定磁盘存储目录", href: "file-processing/file-storage#指定磁盘存储目录" },
    { text: "云存储服务配置", href: "file-processing/file-storage#云存储服务配置" },
    { text: "阿里云OSS", href: "file-processing/file-storage#阿里云oss" },
    { text: "移动云EOS", href: "file-processing/file-storage#移动云eos" },
    { text: "MinIO", href: "file-processing/file-storage#minio" },
    { text: "七牛云", href: "file-processing/file-storage#七牛云" },
    { text: "用环境变量防止配置信息泄露", href: "file-processing/file-storage#用环境变量防止配置信息泄露" },
    { text: "设置应用默认的存储服务", href: "file-processing/file-storage#设置应用默认的存储服务" },
    { text: "在前端代码中调用文件上传", href: "file-processing/file-storage#在前端代码中调用文件上传" }
  ]} />
</IndexCard>

<IndexCard
  title="文件模板"
  href="file-processing/file-templates"
  description="文档模板生成和处理，支持动态内容填充和格式转换。"
>
  <LinkGrid columns={2} links={[
    { text: "Word模板", href: "file-processing/file-templates#word模板" },
    { text: "创建Word模板", href: "file-processing/file-templates#创建word模板" },
    { text: "创建Word模板变量", href: "file-processing/file-templates#创建word模板变量" },
    { text: "在Word文档中使用模板变量", href: "file-processing/file-templates#在word文档中使用模板变量" },
    { text: "打印Word模板", href: "file-processing/file-templates#打印word模板" },
    { text: "Excel模板", href: "file-processing/file-templates#excel模板" },
    { text: "创建Excel模板", href: "file-processing/file-templates#创建excel模板" },
    { text: "创建Excel模板变量", href: "file-processing/file-templates#创建excel模板变量" },
    { text: "在Excel文档中使用模板变量", href: "file-processing/file-templates#在excel文档中使用模板变量" },
    { text: "打印Excel模板", href: "file-processing/file-templates#打印excel模板" },
    { text: "模板变量样式说明", href: "file-processing/file-templates#模板变量样式说明" },
    { text: "文本样式", href: "file-processing/file-templates#文本样式" },
    { text: "数值类样式", href: "file-processing/file-templates#数值类样式" },
    { text: "日期时间类样式", href: "file-processing/file-templates#日期时间类样式" },
    { text: "多值类样式（复杂类型）", href: "file-processing/file-templates#多值类样式复杂类型" }
  ]} />
</IndexCard>

</div>

## 第三方集成
让你的应用连接更广阔的世界。轻松接入第三方API，集成微信支付、支付宝支付，配置短信通知服务。扩展应用能力边界，满足更多业务场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="外部API"
  href="third-party-integration/external-api"
  description="第三方API服务集成，扩展应用功能和数据来源。"
>
  <LinkGrid columns={2} links={[
    { text: "外部API创建", href: "third-party-integration/external-api#外部api创建" },
    { text: "公共配置", href: "third-party-integration/external-api#公共配置" },
    { text: "访问域名", href: "third-party-integration/external-api#访问域名" },
    { text: "公共请求头", href: "third-party-integration/external-api#公共请求头" },
    { text: "请求前置处理", href: "third-party-integration/external-api#请求前置处理" },
    { text: "响应后置处理", href: "third-party-integration/external-api#响应后置处理" },
    { text: "API接口管理", href: "third-party-integration/external-api#api接口管理" },
    { text: "API接口分组", href: "third-party-integration/external-api#api接口分组" },
    { text: "API接口", href: "third-party-integration/external-api#api接口" },
    { text: "API接口的测试及调用", href: "third-party-integration/external-api#api接口的测试及调用" }
  ]} />
</IndexCard>

<IndexCard
  title="支付服务"
  href="third-party-integration/payment-service"
  description="集成主流支付平台，实现在线支付和交易功能。"
>
  <LinkGrid links={[
    { text: "微信支付服务配置", href: "third-party-integration/payment-service#微信支付服务配置" },
    { text: "支付宝支付服务配置", href: "third-party-integration/payment-service#支付宝支付服务配置" },
    { text: "支付服务使用", href: "third-party-integration/payment-service#支付服务使用" }
  ]} />
</IndexCard>

<IndexCard
  title="短信服务"
  href="third-party-integration/sms-service"
  description="短信发送和通知服务集成，支持验证码和消息推送。"
>
  <LinkGrid links={[
    { text: "阿里云短信", href: "third-party-integration/sms-service#阿里云短信" },
    { text: "阿里云短信服务创建", href: "third-party-integration/sms-service#阿里云短信服务创建" },
    { text: "手机登录方式中使用短信服务", href: "third-party-integration/sms-service#手机登录方式中使用短信服务" },
    { text: "审批流程中使用短信服务", href: "third-party-integration/sms-service#审批流程中使用短信服务" },
    { text: "短信通知功能", href: "third-party-integration/sms-service#短信通知功能" }
  ]} />
</IndexCard>

</div>

## 缓存管理
让应用跑得更快更稳定。配置智能缓存策略，优化数据访问速度，提升用户体验。确保应用在高并发访问时依然流畅运行。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="缓存配置与使用"
  href="cache-management/cache-configuration-and-usage"
  description="应用缓存策略配置，提升系统性能和响应速度。"
>
  <LinkGrid links={[
    { text: "缓存服务配置", href: "cache-management/cache-configuration-and-usage#缓存服务配置" },
    { text: "多缓存服务管理", href: "cache-management/cache-configuration-and-usage#多缓存服务管理" },
    { text: "缓存编程接口使用", href: "cache-management/cache-configuration-and-usage#缓存编程接口使用" }
  ]} />
</IndexCard>

</div>

## API开放
将应用能力开放给外部系统调用。一键生成标准API接口，管理调用权限，监控使用情况。让你的应用成为数据和服务的提供者。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="API授权"
  href="api-open/api-authorization"
  description="API接口的权限控制和访问授权管理。"
>
  <LinkGrid links={[
    { text: "API 授权的创建", href: "api-open/api-authorization#api-授权的创建" },
    { text: "API 访问权限控制", href: "api-open/api-authorization#api-访问权限控制" },
    { text: "API 调用监控", href: "api-open/api-authorization#api-调用监控" },
    { text: "使用SDK调用授权的接口", href: "api-open/api-authorization#使用sdk调用授权的接口" },
    { text: "使用跨App服务元素调用授权接口", href: "api-open/api-authorization#使用跨app服务元素调用授权接口" }
  ]} />
</IndexCard>

</div>

## 样式与控件定制
打造独特的视觉体验和品牌形象。自定义应用主题色彩，开发专属UI组件，让应用界面更符合企业品牌调性，提升用户体验和辨识度。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="全局样式"
  href="style-and-control-customization/global-styles"
  description="应用整体样式和主题配置，统一界面风格和用户体验。"
>
  <LinkGrid links={[
    { text: "创建全局样式元素", href: "style-and-control-customization/global-styles#创建全局样式元素" },
    { text: "修改全局样式", href: "style-and-control-customization/global-styles#修改全局样式" },
    { text: "更多样式变量", href: "style-and-control-customization/global-styles#更多样式变量" },
    { text: "调试主题", href: "style-and-control-customization/global-styles#调试主题" }
  ]} />
</IndexCard>

<IndexCard
  title="自定义控件"
  description="开发个性化UI组件，满足特殊业务需求和交互要求。"
>
  <LinkGrid links={[
    { text: "创建自定义控件", href: "style-and-control-customization/custom-controls#创建自定义控件元素" },
    { text: "修改自定义控件", href: "style-and-control-customization/custom-controls#修改自定义控件" },
    { text: "表单中使用自定义控件", href: "style-and-control-customization/custom-controls#表单中使用自定义控件" },
    { text: "表格中使用自定义控件", href: "style-and-control-customization/custom-controls#表格中使用自定义控件" },
    { text: "自定义控件参数", href: "style-and-control-customization/custom-controls#自定义控件参数" }
  ]} />
</IndexCard>

</div>



## 场景化进阶指南
基于真实业务场景的深度实践指南，帮助开发者掌握复杂应用的架构设计和最佳实践。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="开发与运维流程"
  href="advanced-guide/local-development-and-debugging"
  description="掌握高效的开发流程、调试技巧和生产环境部署管理，确保应用稳定性和团队协作效率。"
>
  <LinkGrid links={[
    { text: "本地开发与调试", href: "advanced-guide/local-development-and-debugging" },
    { text: "团队协作开发", href: "advanced-guide/team-collaborative-development" },
    { text: "Agent提示词编写技巧", href: "advanced-guide/agent-prompt-writing-techniques" },
    { text: "应用层稳定性保障", href: "advanced-guide/application-layer-stability-guarantee" },
    { text: "运维架构与管理指南", href: "advanced-guide/devops-architecture-and-management-guide" }
  ]} />
</IndexCard>

<IndexCard
  title="认证与权限管理"
  href="advanced-guide/login-authentication-and-permission-management"
  description="基于JitAuth构建企业级权限体系，支持多种登录方式和细粒度权限控制。"
>
  <LinkGrid links={[
    { text: "登录认证与权限管理", href: "advanced-guide/login-authentication-and-permission-management" }
  ]} />
</IndexCard>

<IndexCard
  title="数据建模与分析"
  href="advanced-guide/business-entity-modeling-and-data-analysis"
  description="基于JitORM构建销售数据分析系统，实现多维度聚合分析和业务规则自动化。"
>
  <LinkGrid links={[
    { text: "业务实体建模与数据分析", href: "advanced-guide/business-entity-modeling-and-data-analysis" }
  ]} />
</IndexCard>

<IndexCard
  title="界面设计与组件"
  href="advanced-guide/system-interface-design-and-component-application"
  description="基于JitWeb构建多入口业务界面，通过门户、页面与组件快速完成系统导航与界面布局。"
>
  <LinkGrid links={[
    { text: "系统界面设计与组件应用", href: "advanced-guide/system-interface-design-and-component-application" }
  ]} />
</IndexCard>

<IndexCard
  title="业务服务与API"
  href="advanced-guide/external-api-interface"
  description="基于JitService实现API开放、第三方集成、自定义鉴权和事件驱动的业务服务架构。"
>
  <LinkGrid links={[
    { text: "对外开放API接口", href: "advanced-guide/external-api-interface" },
    { text: "集成外部API接口", href: "advanced-guide/integrating-external-api-interfaces" },
    { text: "使用拦截器实现自定义请求鉴权", href: "advanced-guide/using-interceptors-for-custom-request-authentication" },
    { text: "自定义业务事件的触发订阅与处理", href: "advanced-guide/custom-business-event-trigger-subscription-and-handling" }
  ]} />
</IndexCard>

<IndexCard
  title="工作流程管理"
  href="advanced-guide/approval-process-orchestration-and-custom-approval-events"
  description="基于JitWorkflow和JitTask实现审批流程编排、定时任务执行和业务流程自动化。"
>
  <LinkGrid links={[
    { text: "审批流程编排与自定义审批事件", href: "advanced-guide/approval-process-orchestration-and-custom-approval-events" },
    { text: "定时执行自定义业务逻辑", href: "advanced-guide/scheduled-execution-of-custom-business-logic" },
    { text: "使用数据库表的时间字段触发定时任务", href: "advanced-guide/using-database-table-time-fields-to-trigger-scheduled-tasks" }
  ]} />
</IndexCard>

<IndexCard
  title="支付与消息通知"
  href="advanced-guide/online-payment-feature-integration"
  description="基于JitPay和JitMessage实现支付功能集成和实时消息通知，构建完整的业务闭环。"
>
  <LinkGrid links={[
    { text: "在线支付功能集成", href: "advanced-guide/online-payment-feature-integration" },
    { text: "发送短信通知", href: "advanced-guide/sending-sms-notifications" }
  ]} />
</IndexCard>

<IndexCard
  title="文件与存储管理"
  href="advanced-guide/file-management-based-on-file-storage-elements"
  description="基于JitStorage实现文件统一管理、模板化文档生成和打印功能，提升文档处理效率。"
>
  <LinkGrid links={[
    { text: "基于文件存储元素实现文件管理", href: "advanced-guide/file-management-based-on-file-storage-elements" },
    { text: "使用文件模版生成和打印文件", href: "advanced-guide/using-file-templates-to-generate-and-print-files" }
  ]} />
</IndexCard>

</div>