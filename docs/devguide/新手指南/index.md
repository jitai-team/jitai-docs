---
sidebar_position: 0
---

import IndexCard, { LinkGrid } from '@site/src/components/IndexCard';

# 导读

准备好体验全新的应用开发方式了吗？从这里开始，你将学会使用AI时代的全新技术体系构建功能强大的企业级应用。

## 组织与运行环境

开启JitAi之旅的第一步。学会激活开发节点，创建团队组织，邀请成员协作。就像搭建一个数字化工作室，让团队开发变得高效有序。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="开发者组织管理"
  href="组织与运行环境/开发者组织管理"
  description="了解如何创建和管理开发者组织，包括节点激活、组织绑定、成员管理等核心操作。"
>
  <LinkGrid links={[
    { text: "什么是开发者组织", href: "组织与运行环境/开发者组织管理#什么是开发者组织" },
    { text: "在激活节点时创建新的开发组织", href: "组织与运行环境/开发者组织管理#在激活节点时创建新的开发组织" },
    { text: "在激活节点时将节点绑定到自己已加入的组织", href: "组织与运行环境/开发者组织管理#在激活节点时将节点绑定到自己已加入的组织" },
    { text: "在激活节点时使用组织绑定码加入组织并绑定", href: "组织与运行环境/开发者组织管理#在激活节点时使用组织绑定码加入组织并绑定" },
    { text: "在登录已有节点时通过组织绑定码加入组织", href: "组织与运行环境/开发者组织管理#在登录已有节点时通过组织绑定码加入组织" },
    { text: "查看和刷新组织绑定码", href: "组织与运行环境/开发者组织管理#查看和刷新组织绑定码" },
    { text: "移除组织成员", href: "组织与运行环境/开发者组织管理#移除组织成员" }
  ]} />
</IndexCard>

<IndexCard
  title="运行环境管理"
  href="组织与运行环境/运行环境管理"
  description="掌握运行环境的创建、配置和管理，学习如何使用节点集群和应用部署。"
>
  <LinkGrid links={[
    { text: "什么是运行环境", href: "组织与运行环境/运行环境管理#什么是运行环境" },
    { text: "节点的本地默认运行环境", href: "组织与运行环境/运行环境管理#节点的本地默认运行环境" },
    { text: "创建新的运行环境", href: "组织与运行环境/运行环境管理#创建新的运行环境" },
    { text: "使用运行环境管理节点集群", href: "组织与运行环境/运行环境管理#使用运行环境管理节点集群" },
    { text: "在运行环境中部署应用", href: "组织与运行环境/运行环境管理#在运行环境中部署应用" }
  ]} />
</IndexCard>

</div>

## 应用开发基础

从零开始创建你的第一个应用。掌握可视化开发工具，设计用户门户，构建页面界面。像搭积木一样简单，让应用开发不再复杂。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="了解JitAi开发工具"
  href="应用开发基础/了解JitAi开发工具"
  description="熟悉JitAi IDE的各个功能区域，掌握可视化和源码双模式开发环境的使用方法。"
>
  <LinkGrid links={[
    { text: "元素目录树", href: "应用开发基础/了解JitAi开发工具#元素目录树" },
    { text: "添加元素", href: "应用开发基础/了解JitAi开发工具#添加元素" },
    { text: "可视化编辑器", href: "应用开发基础/了解JitAi开发工具#可视化编辑器" },
    { text: "源码编辑器", href: "应用开发基础/了解JitAi开发工具#源码编辑器" },
    { text: "源码文件树", href: "应用开发基础/了解JitAi开发工具#源码文件树" },
    { text: "应用设置", href: "应用开发基础/了解JitAi开发工具#应用设置" },
    { text: "门户切换", href: "应用开发基础/了解JitAi开发工具#门户切换" },
    { text: "个人中心", href: "应用开发基础/了解JitAi开发工具#个人中心" },
    { text: "语言切换", href: "应用开发基础/了解JitAi开发工具#语言切换" },
    { text: "导航标签", href: "应用开发基础/了解JitAi开发工具#导航标签" }
  ]} />
</IndexCard>

<IndexCard
  title="应用创建与管理"
  href="应用开发基础/应用创建与管理"
  description="学习应用的创建、继承、版本管理和发布流程，掌握应用全生命周期管理。"
>
  <LinkGrid links={[
    { text: "创建第一个应用", href: "应用开发基础/应用创建与管理#创建第一个应用" },
    { text: "基于已有应用快速开发", href: "应用开发基础/应用创建与管理#基于已有应用快速开发" },
    { text: "数据存储与环境变量配置", href: "应用开发基础/应用创建与管理#数据存储与环境变量配置" },
    { text: "应用版本管理与发布", href: "应用开发基础/应用创建与管理#应用版本管理与发布" },
    { text: "应用导出导入", href: "应用开发基础/应用创建与管理#应用导出导入" }
  ]} />
</IndexCard>

<IndexCard
  title="门户导航设计"
  href="应用开发基础/门户导航设计"
  description="设计不同用户角色的门户界面，配置导航菜单和权限控制，创建个性化用户体验。"
>
  <LinkGrid links={[
    { text: "应用内置3个门户", href: "应用开发基础/门户导航设计#应用内置3个门户" },
    { text: "3种门户类型", href: "应用开发基础/门户导航设计#3种门户类型" },
    { text: "创建门户并配置菜单", href: "应用开发基础/门户导航设计#创建门户并配置菜单" },
    { text: "门户布局设计", href: "应用开发基础/门户导航设计#门户布局设计" },
    { text: "启用或关闭常用功能入口", href: "应用开发基础/门户导航设计#启用或关闭常用功能入口" },
    { text: "在门户中集成AI助理", href: "应用开发基础/门户导航设计#在门户中集成ai助理" }
  ]} />
</IndexCard>

<IndexCard
  title="页面UI与功能开发"
  href="应用开发基础/页面UI与功能开发"
  description="使用可视化编辑器构建页面界面，配置组件和事件，实现丰富的用户交互功能。"
>
  <LinkGrid links={[
    { text: "创建一个标准页面", href: "应用开发基础/页面UI与功能开发#创建一个标准页面" },
    { text: "可视化页面编辑器", href: "应用开发基础/页面UI与功能开发#可视化页面编辑器" },
    { text: "页面变量", href: "应用开发基础/页面UI与功能开发#页面变量" },
    { text: "页面事件", href: "应用开发基础/页面UI与功能开发#页面事件" },
    { text: "页面函数", href: "应用开发基础/页面UI与功能开发#页面函数" }
  ]} />
</IndexCard>

<IndexCard
  title="数据录入页面"
  href="应用开发基础/配置数据录入与管理页面"
  description="快速创建数据录入表单，实现数据收集和提交功能。"
>
  <LinkGrid links={[
    { text: "创建数据录入页面", href: "应用开发基础/配置数据录入与管理页面#创建数据录入页面" },
    { text: "配置允许查看和编辑的字段", href: "应用开发基础/配置数据录入与管理页面#配置允许查看和编辑的字段" },
    { text: "提交后显示再次录入按钮", href: "应用开发基础/配置数据录入与管理页面#提交后显示再次录入按钮" },
    { text: "提交后展示结果反馈界面", href: "应用开发基础/配置数据录入与管理页面#提交后展示结果反馈界面" }
  ]} />
</IndexCard>

<IndexCard
  title="数据管理页面"
  href="应用开发基础/配置数据录入与管理页面"
  description="创建功能完整的数据管理界面，支持查看、编辑、筛选和批量操作。"
>
  <LinkGrid columns={2} links={[
    { text: "创建数据管理页面", href: "应用开发基础/配置数据录入与管理页面#创建数据管理页面" },
    { text: "通过默认筛选条件限制页面表格查询的数据", href: "应用开发基础/配置数据录入与管理页面#通过默认筛选条件限制页面表格查询的数据" },
    { text: "配置默认的数据排序规则", href: "应用开发基础/配置数据录入与管理页面#配置默认的数据排序规则" },
    { text: "在页面表格中隐藏部分字段", href: "应用开发基础/配置数据录入与管理页面#在页面表格中隐藏部分字段" },
    { text: "配置支持条件筛选的字段", href: "应用开发基础/配置数据录入与管理页面#配置支持条件筛选的字段" },
    { text: "配置表单中允许查看和编辑的字段", href: "应用开发基础/配置数据录入与管理页面#配置表单中允许查看和编辑的字段" },
    { text: "配置批量编辑表单中展示的字段", href: "应用开发基础/配置数据录入与管理页面#配置批量编辑表单中展示的字段" },
    { text: "启用 AI 数据管理助手", href: "应用开发基础/配置数据录入与管理页面#启用-ai-数据管理助手" },
    { text: "转换为标准页面进行修改", href: "应用开发基础/配置数据录入与管理页面#转换为标准页面进行修改" }
  ]} />
</IndexCard>

<IndexCard
  title="全代码页面开发（正在编辑中）"
  description="面向高级开发者的完全自定义页面开发方式，支持复杂业务逻辑和个性化界面。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="Markdown页面"
  href="应用开发基础/Markdown页面"
  description="创建文档型页面，支持丰富的Markdown语法和文档展示需求。"
>
  <LinkGrid links={[
    { text: "创建 Markdown 页面", href: "应用开发基础/Markdown页面#创建-markdown-页面" },
    { text: "Markdown 语法", href: "应用开发基础/Markdown页面#markdown-语法" }
  ]} />
</IndexCard>

</div>

## 在页面中使用功能组件

丰富的组件库是你的超级工具箱。拖拽一个表格展示数据，添加表单收集信息，插入图表让数据可视化。让复杂的前端开发变得简单直观。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="表单组件"
  href="在页面中使用功能组件/表单组件"
  description="强大的表单构建工具，支持数据收集、验证、权限控制和复杂业务规则配置。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置与配置项管理", href: "在页面中使用功能组件/表单组件#基础配置与配置项管理" },
    { text: "字段校验与交互", href: "在页面中使用功能组件/表单组件#字段校验与交互" },
    { text: "布局设计", href: "在页面中使用功能组件/表单组件#布局设计" },
    { text: "使用自定义控件渲染字段", href: "在页面中使用功能组件/表单组件#使用自定义控件渲染字段" },
    { text: "事件配置", href: "在页面中使用功能组件/表单组件#事件配置" },
    { text: "高级功能", href: "在页面中使用功能组件/表单组件#高级功能" },
    { text: "批量编辑表单配置", href: "在页面中使用功能组件/表单组件#批量编辑表单配置" },
    { text: "批量编辑表单事件与交互", href: "在页面中使用功能组件/表单组件#批量编辑表单事件与交互" },
    { text: "数据修正配置", href: "在页面中使用功能组件/表单组件#数据修正配置" },
    { text: "数据修正使用", href: "在页面中使用功能组件/表单组件#数据修正使用" }
  ]} />
</IndexCard>

<IndexCard
  title="基础表格"
  href="在页面中使用功能组件/表格组件#基础表格"
  description="标准数据表格展示组件，支持数据源绑定、字段自定义、分页和排序等基础功能。"
>
  <LinkGrid columns={2} links={[
    { text: "设置数据源", href: "在页面中使用功能组件/表格组件#设置数据源" },
    { text: "自定义显示字段", href: "在页面中使用功能组件/表格组件#自定义显示字段" },
    { text: "按分组显示字段", href: "在页面中使用功能组件/表格组件#按分组显示字段" },
    { text: "设置分组名和背景色", href: "在页面中使用功能组件/表格组件#设置分组名和背景色" },
    { text: "配置字段的属性", href: "在页面中使用功能组件/表格组件#配置字段的属性" },
    { text: "冻结字段", href: "在页面中使用功能组件/表格组件#冻结字段" },
    { text: "行内编辑", href: "在页面中使用功能组件/表格组件#行内编辑" },
    { text: "字段统计", href: "在页面中使用功能组件/表格组件#字段统计" },
    { text: "自定义字段渲染器与字段编辑器", href: "在页面中使用功能组件/表格组件#自定义字段渲染器与字段编辑器" },
    { text: "添加按钮", href: "在页面中使用功能组件/表格组件#添加按钮" },
    { text: "删除按钮", href: "在页面中使用功能组件/表格组件#删除按钮" },
    { text: "多个按钮折叠到\"更多\"中", href: "在页面中使用功能组件/表格组件#多个按钮折叠到更多中" },
    { text: "设置分页大小/禁用选择列/禁用排序/首次加载组件时刷新数据", href: "在页面中使用功能组件/表格组件#设置分页大小禁用选择列禁用排序首次加载组件时刷新数据" },
    { text: "极速模式", href: "在页面中使用功能组件/表格组件#极速模式" },
    { text: "编辑规则", href: "在页面中使用功能组件/表格组件#编辑规则" },
    { text: "样式规则", href: "在页面中使用功能组件/表格组件#样式规则" },
    { text: "设置关联数据层级和表格无数据时文案", href: "在页面中使用功能组件/表格组件#设置关联数据层级和表格无数据时文案" },
    { text: "表格事件", href: "在页面中使用功能组件/表格组件#表格事件" },
    { text: "表格组件变量", href: "在页面中使用功能组件/表格组件#表格组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="分组表"
  href="在页面中使用功能组件/表格组件#分组表"
  description="按指定字段对数据进行分组展示的表格组件，适用于层次化数据管理。"
>
  <LinkGrid links={[
    { text: "分组字段配置", href: "在页面中使用功能组件/表格组件#分组字段配置" },
    { text: "与基础表格相同的配置", href: "在页面中使用功能组件/表格组件#与基础表格相同的配置" },
    { text: "与基础表格相同的事件", href: "在页面中使用功能组件/表格组件#与基础表格相同的事件" },
    { text: "与基础表格相同的组件变量", href: "在页面中使用功能组件/表格组件#与基础表格相同的组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="级联表"
  href="在页面中使用功能组件/表格组件#级联表"
  description="处理具有父子关系的层级数据，支持树形结构展示和操作。"
>
  <LinkGrid links={[
    { text: "级联表示例数据", href: "在页面中使用功能组件/表格组件#级联表示例数据" },
    { text: "配置级联逻辑字段", href: "在页面中使用功能组件/表格组件#配置级联逻辑字段" },
    { text: "级联表使用区效果", href: "在页面中使用功能组件/表格组件#级联表使用区效果" },
    { text: "与基础表格相同的配置", href: "在页面中使用功能组件/表格组件#与基础表格相同的配置-1" },
    { text: "与基础表格相同的事件", href: "在页面中使用功能组件/表格组件#与基础表格相同的事件-1" },
    { text: "与基础表格相同的表格变量", href: "在页面中使用功能组件/表格组件#与基础表格相同的表格变量" }
  ]} />
</IndexCard>

<IndexCard
  title="交叉表"
  href="在页面中使用功能组件/表格组件#交叉表"
  description="多维数据透视表，支持行列交叉分析，适用于数据统计和报表展示。"
>
  <LinkGrid columns={2} links={[
    { text: "初始化配置", href: "在页面中使用功能组件/表格组件#初始化配置" },
    { text: "配置维度和指标", href: "在页面中使用功能组件/表格组件#配置维度和指标" },
    { text: "按年/季度/月/周/日统计", href: "在页面中使用功能组件/表格组件#按年季度月周日统计" },
    { text: "配置指标", href: "在页面中使用功能组件/表格组件#配置指标" },
    { text: "配置计算指标", href: "在页面中使用功能组件/表格组件#配置计算指标" },
    { text: "自定义指标属性", href: "在页面中使用功能组件/表格组件#自定义指标属性" },
    { text: "配置指标统计方式", href: "在页面中使用功能组件/表格组件#配置指标统计方式" },
    { text: "指标数据筛选", href: "在页面中使用功能组件/表格组件#指标数据筛选" },
    { text: "配置图表样式", href: "在页面中使用功能组件/表格组件#配置图表样式" },
    { text: "表头/表身对齐方式", href: "在页面中使用功能组件/表格组件#表头表身对齐方式" },
    { text: "行/列样式", href: "在页面中使用功能组件/表格组件#行列样式" },
    { text: "导出/刷新/滚动显示 按钮", href: "在页面中使用功能组件/表格组件#导出刷新滚动显示-按钮" },
    { text: "显示合计值", href: "在页面中使用功能组件/表格组件#显示合计值" },
    { text: "交叉表事件", href: "在页面中使用功能组件/表格组件#交叉表事件" },
    { text: "交叉表组件变量", href: "在页面中使用功能组件/表格组件#交叉表组件变量" }
  ]} />
</IndexCard>

<IndexCard
  title="行转列"
  href="在页面中使用功能组件/表格组件#行转列"
  description="将行数据转换为列显示的特殊表格模式，适用于动态字段展示场景。"
>
  <LinkGrid columns={2} links={[
    { text: "基础配置", href: "在页面中使用功能组件/表格组件#基础配置" },
    { text: "自定义字段名称/对齐方式", href: "在页面中使用功能组件/表格组件#自定义字段名称对齐方式" },
    { text: "自定义字段渲染器", href: "在页面中使用功能组件/表格组件#自定义字段渲染器" },
    { text: "统计列", href: "在页面中使用功能组件/表格组件#统计列" },
    { text: "导出/编辑/默认加载数据", href: "在页面中使用功能组件/表格组件#导出编辑默认加载数据" },
    { text: "值点击后事件", href: "在页面中使用功能组件/表格组件#值点击后事件" },
    { text: "按钮配置", href: "在页面中使用功能组件/表格组件#按钮配置" },
    { text: "行转列事件", href: "在页面中使用功能组件/表格组件#行转列事件" },
    { text: "行转列组件变量", href: "在页面中使用功能组件/表格组件#行转列组件变量" }
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
  title="列表组件（正在编辑中）"
  description="灵活的数据列表展示组件，支持自定义布局和交互操作。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
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
  href="在页面中使用功能组件/筛选器组件"
  description="基于数据模型的高级筛选组件，支持简单、复杂和自由筛选模式。"
>
  <LinkGrid links={[
    { text: "简单筛选", href: "在页面中使用功能组件/筛选器组件#简单筛选" },
    { text: "复杂筛选", href: "在页面中使用功能组件/筛选器组件#复杂筛选" },
    { text: "自由筛选", href: "在页面中使用功能组件/筛选器组件#自由筛选" },
    { text: "布局设置", href: "在页面中使用功能组件/筛选器组件#布局设置" },
    { text: "筛选器的使用", href: "在页面中使用功能组件/筛选器组件#筛选器的使用" }
  ]} />
</IndexCard>

<IndexCard
  title="通用筛选器"
  href="在页面中使用功能组件/筛选器组件"
  description="灵活的通用筛选组件，支持自定义字段配置和多种触发模式。"
>
  <LinkGrid columns={2} links={[
    { text: "筛选字段配置", href: "在页面中使用功能组件/筛选器组件#筛选字段配置" },
    { text: "快速布局", href: "在页面中使用功能组件/筛选器组件#快速布局" },
    { text: "显示 查询/重置 按钮", href: "在页面中使用功能组件/筛选器组件#显示-查询重置-按钮" },
    { text: "条件变更后触发查询", href: "在页面中使用功能组件/筛选器组件#条件变更后触发查询" },
    { text: "首次加载进行筛选", href: "在页面中使用功能组件/筛选器组件#首次加载进行筛选" },
    { text: "筛选器的使用", href: "在页面中使用功能组件/筛选器组件#筛选器的使用-1" }
  ]} />
</IndexCard>

<IndexCard
  title="日历"
  href="在页面中使用功能组件/时间管理组件#日历"
  description="日程管理和时间安排组件，支持事件创建、编辑和视图切换。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "在页面中使用功能组件/时间管理组件#数据模型准备及组件创建" },
    { text: "基础配置", href: "在页面中使用功能组件/时间管理组件#基础配置" },
    { text: "日程类型", href: "在页面中使用功能组件/时间管理组件#日程类型" },
    { text: "日/周/月视图切换", href: "在页面中使用功能组件/时间管理组件#日周月视图切换" },
    { text: "切换时间", href: "在页面中使用功能组件/时间管理组件#切换时间" },
    { text: "列表展示及搜索", href: "在页面中使用功能组件/时间管理组件#列表展示及搜索" },
    { text: "拖拽排期", href: "在页面中使用功能组件/时间管理组件#拖拽排期" },
    { text: "按钮配置", href: "在页面中使用功能组件/时间管理组件#按钮配置" },
    { text: "首次加载组件时刷新数据", href: "在页面中使用功能组件/时间管理组件#首次加载组件时刷新数据" },
    { text: "新增日程", href: "在页面中使用功能组件/时间管理组件#新增日程" },
    { text: "拖拽日程", href: "在页面中使用功能组件/时间管理组件#拖拽日程" }
  ]} />
</IndexCard>

<IndexCard
  title="时间轴"
  href="在页面中使用功能组件/时间管理组件#时间轴"
  description="时间线展示组件，适用于展示历史记录和流程进度。"
>
  <LinkGrid links={[
    { text: "数据模型准备及组件创建", href: "在页面中使用功能组件/时间管理组件#数据模型准备及组件创建-1" },
    { text: "基础配置", href: "在页面中使用功能组件/时间管理组件#基础配置-1" },
    { text: "颜色类型", href: "在页面中使用功能组件/时间管理组件#颜色类型" },
    { text: "位置", href: "在页面中使用功能组件/时间管理组件#位置" },
    { text: "按钮配置", href: "在页面中使用功能组件/时间管理组件#按钮配置-1" },
    { text: "首次加载组件时刷新数据", href: "在页面中使用功能组件/时间管理组件#首次加载组件时刷新数据-1" }
  ]} />
</IndexCard>

<IndexCard
  title="甘特图"
  href="在页面中使用功能组件/时间管理组件#甘特图"
  description="项目管理和进度追踪组件，支持任务依赖关系和进度可视化。"
>
  <LinkGrid columns={2} links={[
    { text: "数据模型准备及组件创建", href: "在页面中使用功能组件/时间管理组件#数据模型准备及组件创建-2" },
    { text: "基础配置", href: "在页面中使用功能组件/时间管理组件#基础配置-2" },
    { text: "进度", href: "在页面中使用功能组件/时间管理组件#进度" },
    { text: "层级关系", href: "在页面中使用功能组件/时间管理组件#层级关系" },
    { text: "先后关系", href: "在页面中使用功能组件/时间管理组件#先后关系" },
    { text: "日/周/月/季/年视图切换", href: "在页面中使用功能组件/时间管理组件#日周月季年视图切换" },
    { text: "列表显示字段", href: "在页面中使用功能组件/时间管理组件#列表显示字段" },
    { text: "浮层显示字段", href: "在页面中使用功能组件/时间管理组件#浮层显示字段" },
    { text: "按钮配置", href: "在页面中使用功能组件/时间管理组件#按钮配置-2" },
    { text: "首次加载组件时刷新数据", href: "在页面中使用功能组件/时间管理组件#首次加载组件时刷新数据-2" },
    { text: "拖拽日期进度", href: "在页面中使用功能组件/时间管理组件#拖拽日期进度" },
    { text: "允许添加排期", href: "在页面中使用功能组件/时间管理组件#允许添加排期" }
  ]} />
</IndexCard>

<IndexCard
  title="按钮组件（正在编辑中）"
  description="各种类型的按钮组件，支持不同样式和交互效果。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
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
  title="审批组件（正在编辑中）"
  description="审批流程相关的界面组件，支持申请发起和审批处理。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="支付组件"
  href="在页面中使用功能组件/支付组件"
  description="集成支付功能的组件，支持多种支付方式和支付流程。"
>
  <LinkGrid links={[
    { text: "支付组件", href: "在页面中使用功能组件/支付组件" }
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
  title="全代码组件（正在编辑中）"
  description="完全自定义的代码组件，支持高度个性化的功能实现。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

</div>

## 数据建模

为你的应用设计强大的数据基础。无需复杂的SQL知识，通过可视化方式创建数据表，设计字段类型，建立关联关系。让数据管理变得轻松高效。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="数据表模型"
  href="数据建模/数据表模型"
  description="应用数据的基础结构，学习如何创建和配置数据表，设计字段类型和约束。"
>
  <LinkGrid links={[
    { text: "创建数据表模型", href: "数据建模/数据表模型#创建数据表模型" },
    { text: "设计表字段与数据类型", href: "数据建模/数据表模型#设计表字段与数据类型" },
    { text: "配置表索引优化查询", href: "数据建模/数据表模型#配置表索引优化查询" },
    { text: "使用内置数据管理功能", href: "数据建模/数据表模型#使用内置数据管理功能" },
    { text: "扩展模型功能", href: "数据建模/数据表模型#扩展模型功能" }
  ]} />
</IndexCard>

<IndexCard
  title="聚合表模型"
  href="数据建模/聚合表模型"
  description="多表数据整合和统计分析，支持复杂的数据聚合和计算功能。"
>
  <LinkGrid columns={2} links={[
    { text: "新建聚合表模型", href: "数据建模/聚合表模型#新建聚合表模型" },
    { text: "多表数据合并", href: "数据建模/聚合表模型#多表数据合并" },
    { text: "多表横向连接", href: "数据建模/聚合表模型#多表横向连接" },
    { text: "分组聚合统计", href: "数据建模/聚合表模型#分组聚合统计" },
    { text: "扩展自定义计算字段", href: "数据建模/聚合表模型#扩展自定义计算字段" },
    { text: "先聚合后筛选", href: "数据建模/聚合表模型#先聚合后筛选" },
    { text: "先筛选后聚合（推荐）", href: "数据建模/聚合表模型#先筛选后聚合推荐" }
  ]} />
</IndexCard>

<IndexCard
  title="扩展表模型（正在编辑中）"
  description="基于现有表的数据扩展，支持关联查询和数据筛选排序。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="数据对象模型（正在编辑中）"
  description="非数据库数据建模，适用于API数据和临时数据结构定义。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="支持的数据库厂商"
  href="数据建模/支持的数据库厂商"
  description="了解JitAi支持的各种数据库类型和连接配置。"
>
  <LinkGrid links={[
    { text: "场景选择建议", href: "数据建模/支持的数据库厂商#场景选择建议" },
    { text: "与云厂商的兼容性说明", href: "数据建模/支持的数据库厂商#与云厂商的兼容性说明" },
    { text: "数据库元素使用", href: "数据建模/支持的数据库厂商#数据库元素使用" }
  ]} />
</IndexCard>

<IndexCard
  title="管理数据库连接"
  href="数据建模/管理数据库连接"
  description="配置和管理多个数据库连接，支持多数据源应用开发。"
>
  <LinkGrid links={[
    { text: "创建数据库连接", href: "数据建模/管理数据库连接#创建数据库连接" },
    { text: "多数据库连接管理", href: "数据建模/管理数据库连接#多数据库连接管理" },
    { text: "数据库连接安全配置", href: "数据建模/管理数据库连接#数据库连接安全配置" },
    { text: "连接测试与故障排查", href: "数据建模/管理数据库连接#连接测试与故障排查" }
  ]} />
</IndexCard>

<IndexCard
  title="事务管理"
  href="数据建模/事务管理"
  description="数据库事务控制和一致性管理，确保数据操作的可靠性。"
>
  <LinkGrid links={[
    { text: "默认事务管理机制", href: "数据建模/事务管理#默认事务管理机制" },
    { text: "手动控制事务提交/回滚", href: "数据建模/事务管理#手动控制事务提交回滚" },
    { text: "事务装饰器", href: "数据建模/事务管理#事务装饰器" }
  ]} />
</IndexCard>

</div>

## 用户与权限

构建安全可靠的用户体系。支持多种登录方式，灵活设计组织架构，精细化权限分配。让不同用户各司其职，确保数据安全和操作规范。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="组织架构（正在编辑中）"
  description="企业组织结构管理，包括部门、岗位和人员层级关系配置。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="登录认证（正在编辑中）"
  description="用户身份验证和登录方式配置，支持多种认证模式。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="角色权限"
  href="用户与权限/角色权限"
  description="应用角色定义和权限分配，实现细粒度的访问控制。"
>
  <LinkGrid columns={2} links={[
    { text: "内置的3种应用角色", href: "用户与权限/角色权限#内置的3种应用角色" },
    { text: "匿名用户", href: "用户与权限/角色权限#匿名用户" },
    { text: "开发者", href: "用户与权限/角色权限#开发者" },
    { text: "管理员", href: "用户与权限/角色权限#管理员" },
    { text: "创建应用角色", href: "用户与权限/角色权限#创建应用角色" },
    { text: "应用角色的权限配置", href: "用户与权限/角色权限#应用角色的权限配置" },
    { text: "指定可访问的门户及菜单", href: "用户与权限/角色权限#指定可访问的门户及菜单" },
    { text: "在开发区门户中管理应用角色成员", href: "用户与权限/角色权限#在开发区门户中管理应用角色成员" },
    { text: "门户级的数据操作类型和操作范围控制", href: "用户与权限/角色权限#门户级的数据操作类型和操作范围控制" },
    { text: "组件的按钮权限控制", href: "用户与权限/角色权限#组件的按钮权限控制" },
    { text: "组件的数据字段读/写/统计权限控制", href: "用户与权限/角色权限#组件的数据字段读写统计权限控制" },
    { text: "多应用角色的分级管理", href: "用户与权限/角色权限#多应用角色的分级管理" },
    { text: "应用角色成员的管理", href: "用户与权限/角色权限#应用角色成员的管理" },
    { text: "成员的添加/删除", href: "用户与权限/角色权限#成员的添加删除" },
    { text: "成员在组织架构中的管理范围设置", href: "用户与权限/角色权限#成员在组织架构中的管理范围设置" }
  ]} />
</IndexCard>

</div>

## 业务逻辑开发

赋予应用强大的业务处理能力。通过可视化编程处理复杂业务规则，响应用户操作，执行后台任务。让逻辑编写像搭积木一样直观易懂。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="服务函数（正在编辑中）"
  description="后端业务逻辑实现，提供API接口和数据处理服务。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="事件处理"
  href="业务逻辑开发/事件处理"
  description="系统事件监听和处理机制，实现响应式业务逻辑。"
>
  <LinkGrid columns={2} links={[
    { text: "事件创建", href: "业务逻辑开发/事件处理#事件创建" },
    { text: "模型事件", href: "业务逻辑开发/事件处理#模型事件" },
    { text: "审批事件", href: "业务逻辑开发/事件处理#审批事件" },
    { text: "自定义事件", href: "业务逻辑开发/事件处理#自定义事件" },
    { text: "AI相关事件", href: "业务逻辑开发/事件处理#ai相关事件" },
    { text: "服务函数替换事件内函数", href: "业务逻辑开发/事件处理#服务函数替换事件内函数" },
    { text: "事件启用", href: "业务逻辑开发/事件处理#事件启用" },
    { text: "事件同步/异步执行", href: "业务逻辑开发/事件处理#事件同步异步执行" },
    { text: "事件执行记录", href: "业务逻辑开发/事件处理#事件执行记录" },
    { text: "全代码查看/编辑", href: "业务逻辑开发/事件处理#全代码查看编辑" }
  ]} />
</IndexCard>

<IndexCard
  title="后台任务"
  href="业务逻辑开发/后台任务"
  description="定时任务和异步处理，支持复杂的后台业务流程。"
>
  <LinkGrid columns={2} links={[
    { text: "任务创建", href: "业务逻辑开发/后台任务#任务创建" },
    { text: "定时任务", href: "业务逻辑开发/后台任务#定时任务" },
    { text: "日期字段任务", href: "业务逻辑开发/后台任务#日期字段任务" },
    { text: "通用配置项", href: "业务逻辑开发/后台任务#通用配置项" },
    { text: "任务执行函数开发", href: "业务逻辑开发/后台任务#任务执行函数开发" },
    { text: "执行记录查看", href: "业务逻辑开发/后台任务#执行记录查看" },
    { text: "源码模式", href: "业务逻辑开发/后台任务#源码模式" }
  ]} />
</IndexCard>

</div>

## 审批流程

让企业审批流程变得高效有序。通过拖拽方式设计流程图，配置审批人和条件，自动化处理流转。告别繁琐的纸质审批，拥抱数字化办公。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="审批流程基础配置"
  href="审批流程/审批流程基础配置"
  description="审批流程的创建和基础设置，包括流程节点配置和路径设计。"
>
  <LinkGrid columns={2} links={[
    { text: "创建流程", href: "审批流程/审批流程基础配置#创建流程" },
    { text: "拖拽流程节点", href: "审批流程/审批流程基础配置#拖拽流程节点" },
    { text: "审批流程默认页面", href: "审批流程/审批流程基础配置#审批流程默认页面" },
    { text: "其他流程配置", href: "审批流程/审批流程基础配置#其他流程配置" },
    { text: "同步审批信息到数据表模型", href: "审批流程/审批流程基础配置#同步审批信息到数据表模型" },
    { text: "同步到第三方审批待办", href: "审批流程/审批流程基础配置#同步到第三方审批待办" },
    { text: "评论功能", href: "审批流程/审批流程基础配置#评论功能" },
    { text: "分享", href: "审批流程/审批流程基础配置#分享" },
    { text: "打印审批单", href: "审批流程/审批流程基础配置#打印审批单" },
    { text: "复用其他审批流程", href: "审批流程/审批流程基础配置#复用其他审批流程" }
  ]} />
</IndexCard>

<IndexCard
  title="发起节点配置"
  href="审批流程/发起节点配置"
  description="审批流程起始节点的配置，定义申请发起的条件和规则。"
>
  <LinkGrid columns={2} links={[
    { text: "流程撤销功能", href: "审批流程/发起节点配置#流程撤销功能" },
    { text: "审批催办", href: "审批流程/发起节点配置#审批催办" },
    { text: "审批暂存", href: "审批流程/发起节点配置#审批暂存" },
    { text: "消息通知", href: "审批流程/发起节点配置#消息通知" },
    { text: "当前节点用到的页面", href: "审批流程/发起节点配置#当前节点用到的页面" },
    { text: "摘要信息显示", href: "审批流程/发起节点配置#摘要信息显示" },
    { text: "字段的查看编辑权限", href: "审批流程/发起节点配置#字段的查看编辑权限" },
    { text: "布局控件权限", href: "审批流程/发起节点配置#布局控件权限" }
  ]} />
</IndexCard>

<IndexCard
  title="审批节点配置"
  href="审批流程/审批节点配置"
  description="审批环节的详细配置，包括审批人设置和审批规则。"
>
  <LinkGrid columns={2} links={[
    { text: "审批人设置", href: "审批流程/审批节点配置#审批人设置" },
    { text: "审批流转规则", href: "审批流程/审批节点配置#审批流转规则" },
    { text: "审批流程处理规则", href: "审批流程/审批节点配置#审批流程处理规则" },
    { text: "审批扩展功能配置", href: "审批流程/审批节点配置#审批扩展功能配置" },
    { text: "去重审批", href: "审批流程/审批节点配置#去重审批" },
    { text: "限时处理", href: "审批流程/审批节点配置#限时处理" },
    { text: "审批暂存", href: "审批流程/审批节点配置#审批暂存" },
    { text: "审批意见反馈", href: "审批流程/审批节点配置#审批意见反馈" },
    { text: "手写签名", href: "审批流程/审批节点配置#手写签名" },
    { text: "允许批量审批", href: "审批流程/审批节点配置#允许批量审批" },
    { text: "消息通知", href: "审批流程/审批节点配置#消息通知" },
    { text: "短信通知", href: "审批流程/审批节点配置#短信通知" },
    { text: "审批页面与权限控制", href: "审批流程/审批节点配置#审批页面与权限控制" },
    { text: "当前节点用到的页面", href: "审批流程/审批节点配置#当前节点用到的页面" },
    { text: "摘要信息显示", href: "审批流程/审批节点配置#摘要信息显示" },
    { text: "字段权限", href: "审批流程/审批节点配置#字段权限" },
    { text: "布局控件权限", href: "审批流程/审批节点配置#布局控件权限" }
  ]} />
</IndexCard>

<IndexCard
  title="特殊节点配置"
  href="审批流程/特殊节点配置"
  description="条件节点、并行节点等特殊流程节点的配置方法。"
>
  <LinkGrid columns={2} links={[
    { text: "抄送节点", href: "审批流程/特殊节点配置#抄送节点" },
    { text: "抄送人", href: "审批流程/特殊节点配置#抄送人" },
    { text: "短信通知", href: "审批流程/特殊节点配置#短信通知" },
    { text: "当前节点用到的页面", href: "审批流程/特殊节点配置#当前节点用到的页面" },
    { text: "字段权限", href: "审批流程/特殊节点配置#字段权限" },
    { text: "布局控件权限", href: "审批流程/特殊节点配置#布局控件权限" },
    { text: "分支节点", href: "审批流程/特殊节点配置#分支节点" },
    { text: "并行节点", href: "审批流程/特殊节点配置#并行节点" },
    { text: "子流程节点", href: "审批流程/特殊节点配置#子流程节点" },
    { text: "子流程名称", href: "审批流程/特殊节点配置#子流程名称" },
    { text: "子流程发起人", href: "审批流程/特殊节点配置#子流程发起人" },
    { text: "子流程流转规则", href: "审批流程/特殊节点配置#子流程流转规则" },
    { text: "当主流程流转至子流程", href: "审批流程/特殊节点配置#当主流程流转至子流程" },
    { text: "子流程流转后函数设计", href: "审批流程/特殊节点配置#子流程流转后函数设计" },
    { text: "单个子流程结束时更新主流程数据", href: "审批流程/特殊节点配置#单个子流程结束时更新主流程数据" },
    { text: "所有子流程结束时更新主流程数据", href: "审批流程/特殊节点配置#所有子流程结束时更新主流程数据" }
  ]} />
</IndexCard>

<IndexCard
  title="审批页面定制"
  href="审批流程/审批页面定制"
  description="自定义审批界面和用户体验，提升审批效率。"
>
  <LinkGrid links={[
    { text: "审批页面高级定制", href: "审批流程/审批页面定制#审批页面高级定制" },
    { text: "审批页面类型", href: "审批流程/审批页面定制#审批页面类型" },
    { text: "自定义页面创建方式", href: "审批流程/审批页面定制#自定义页面创建方式" }
  ]} />
</IndexCard>

<IndexCard
  title="审批流程的使用"
  href="审批流程/审批流程的使用"
  description="审批流程的实际应用和操作指南，包括发起和处理审批。"
>
  <LinkGrid links={[
    { text: "发起申请", href: "审批流程/审批流程的使用#发起申请" },
    { text: "待办中心", href: "审批流程/审批流程的使用#待办中心" },
    { text: "详情页面", href: "审批流程/审批流程的使用#详情页面" },
    { text: "委托他人处理", href: "审批流程/审批流程的使用#委托他人处理" },
    { text: "审批流程管理页面", href: "审批流程/审批流程的使用#审批流程管理页面" }
  ]} />
</IndexCard>

</div>

## 文件处理

轻松处理应用中的各种文件需求。支持多种格式文件上传下载，动态生成Word、Excel文档，让文件操作变得简单便捷。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="文件存储"
  href="文件处理/文件存储"
  description="文件上传、存储和管理系统，支持多种存储方式和文件操作。"
>
  <LinkGrid columns={2} links={[
    { text: "本地存储配置", href: "文件处理/文件存储#本地存储配置" },
    { text: "添加本地存储", href: "文件处理/文件存储#添加本地存储" },
    { text: "指定磁盘存储目录", href: "文件处理/文件存储#指定磁盘存储目录" },
    { text: "云存储服务配置", href: "文件处理/文件存储#云存储服务配置" },
    { text: "阿里云OSS", href: "文件处理/文件存储#阿里云oss" },
    { text: "移动云EOS", href: "文件处理/文件存储#移动云eos" },
    { text: "MinIO", href: "文件处理/文件存储#minio" },
    { text: "七牛云", href: "文件处理/文件存储#七牛云" },
    { text: "用环境变量防止配置信息泄露", href: "文件处理/文件存储#用环境变量防止配置信息泄露" },
    { text: "设置应用默认的存储服务", href: "文件处理/文件存储#设置应用默认的存储服务" },
    { text: "在前端代码中调用文件上传", href: "文件处理/文件存储#在前端代码中调用文件上传" }
  ]} />
</IndexCard>

<IndexCard
  title="文件模板（正在编辑中）"
  description="文档模板生成和处理，支持动态内容填充和格式转换。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

</div>

## 第三方集成

让你的应用连接更广阔的世界。轻松接入第三方API，集成微信支付、支付宝支付，配置短信通知服务。扩展应用能力边界，满足更多业务场景。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="外部API"
  href="第三方集成/外部API"
  description="第三方API服务集成，扩展应用功能和数据来源。"
>
  <LinkGrid columns={2} links={[
    { text: "外部API创建", href: "第三方集成/外部API#外部api创建" },
    { text: "公共配置", href: "第三方集成/外部API#公共配置" },
    { text: "访问域名", href: "第三方集成/外部API#访问域名" },
    { text: "公共请求头", href: "第三方集成/外部API#公共请求头" },
    { text: "请求前置处理", href: "第三方集成/外部API#请求前置处理" },
    { text: "响应后置处理", href: "第三方集成/外部API#响应后置处理" },
    { text: "API接口管理", href: "第三方集成/外部API#api接口管理" },
    { text: "API接口分组", href: "第三方集成/外部API#api接口分组" },
    { text: "API接口", href: "第三方集成/外部API#api接口" },
    { text: "API接口的测试及调用", href: "第三方集成/外部API#api接口的测试及调用" }
  ]} />
</IndexCard>

<IndexCard
  title="支付服务"
  href="第三方集成/支付服务"
  description="集成主流支付平台，实现在线支付和交易功能。"
>
  <LinkGrid links={[
    { text: "微信支付服务配置", href: "第三方集成/支付服务#微信支付服务配置" },
    { text: "支付宝支付服务配置", href: "第三方集成/支付服务#支付宝支付服务配置" },
    { text: "支付服务使用", href: "第三方集成/支付服务#支付服务使用" }
  ]} />
</IndexCard>

<IndexCard
  title="短信服务"
  href="第三方集成/短信服务"
  description="短信发送和通知服务集成，支持验证码和消息推送。"
>
  <LinkGrid links={[
    { text: "阿里云短信", href: "第三方集成/短信服务#阿里云短信" },
    { text: "阿里云短信服务创建", href: "第三方集成/短信服务#阿里云短信服务创建" },
    { text: "手机登录方式中使用短信服务", href: "第三方集成/短信服务#手机登录方式中使用短信服务" },
    { text: "审批流程中使用短信服务", href: "第三方集成/短信服务#审批流程中使用短信服务" },
    { text: "短信通知功能", href: "第三方集成/短信服务#短信通知功能" }
  ]} />
</IndexCard>

</div>

## 缓存管理

让应用跑得更快更稳定。配置智能缓存策略，优化数据访问速度，提升用户体验。确保应用在高并发访问时依然流畅运行。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="缓存配置与使用"
  href="缓存管理/缓存配置与使用"
  description="应用缓存策略配置，提升系统性能和响应速度。"
>
  <LinkGrid links={[
    { text: "缓存服务配置", href: "缓存管理/缓存配置与使用#缓存服务配置" },
    { text: "多缓存服务管理", href: "缓存管理/缓存配置与使用#多缓存服务管理" },
    { text: "缓存编程接口使用", href: "缓存管理/缓存配置与使用#缓存编程接口使用" }
  ]} />
</IndexCard>

</div>

## API开放

将应用能力开放给外部系统调用。一键生成标准API接口，管理调用权限，监控使用情况。让你的应用成为数据和服务的提供者。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="API授权"
  href="API开放/API授权"
  description="API接口的权限控制和访问授权管理。"
>
  <LinkGrid links={[
    { text: "API 授权的创建", href: "API开放/API授权#api-授权的创建" },
    { text: "API 访问权限控制", href: "API开放/API授权#api-访问权限控制" },
    { text: "API 调用监控", href: "API开放/API授权#api-调用监控" },
    { text: "SDK 集成指南", href: "API开放/API授权#sdk-集成指南" }
  ]} />
</IndexCard>

</div>

## 样式与控件定制

打造独特的视觉体验和品牌形象。自定义应用主题色彩，开发专属UI组件，让应用界面更符合企业品牌调性，提升用户体验和辨识度。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="全局样式"
  href="样式与控件定制/全局样式"
  description="应用整体样式和主题配置，统一界面风格和用户体验。"
>
  <LinkGrid links={[
    { text: "创建全局样式元素", href: "样式与控件定制/全局样式#创建全局样式元素" },
    { text: "修改全局样式", href: "样式与控件定制/全局样式#修改全局样式" },
    { text: "更多样式变量", href: "样式与控件定制/全局样式#更多样式变量" },
    { text: "调试主题", href: "样式与控件定制/全局样式#调试主题" }
  ]} />
</IndexCard>

<IndexCard
  title="自定义控件（正在编辑中）"
  description="开发个性化UI组件，满足特殊业务需求和交互要求。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

</div>

## AI功能开发

为应用注入AI智慧。轻松接入主流大模型，构建企业知识库，开发智能对话助手。让传统应用秒变AI应用，提升用户体验。

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '40px'}}>

<IndexCard
  title="大模型配置"
  href="AI功能开发/大模型配置"
  description="配置和管理AI大模型服务，为应用提供智能化能力支撑。"
>
  <LinkGrid links={[
    { text: "主流大模型厂商支持列表", href: "AI功能开发/大模型配置#主流大模型厂商支持列表" },
    { text: "大模型厂商元素的创建", href: "AI功能开发/大模型配置#大模型厂商元素的创建" },
    { text: "重试及备用API Key机制", href: "AI功能开发/大模型配置#重试及备用api-key机制" },
    { text: "私有化大模型集成", href: "AI功能开发/大模型配置#私有化大模型集成" },
    { text: "在页面中调用大模型", href: "AI功能开发/大模型配置#在页面中调用大模型" },
    { text: "在后端函数中调用大模型", href: "AI功能开发/大模型配置#在后端函数中调用大模型" },
    { text: "大模型编程接口", href: "AI功能开发/大模型配置#大模型编程接口" }
  ]} />
</IndexCard>

<IndexCard
  title="向量数据库"
  href="AI功能开发/向量数据库"
  description="向量存储和检索系统，为AI应用提供语义搜索和相似度匹配功能。"
>
  <LinkGrid links={[
    { text: "Chroma向量数据库", href: "AI功能开发/向量数据库#chroma向量数据库" },
    { text: "本地向量数据库配置", href: "AI功能开发/向量数据库#本地向量数据库配置" },
    { text: "远程向量数据库连接", href: "AI功能开发/向量数据库#远程向量数据库连接" },
    { text: "向量数据库编程接口", href: "AI功能开发/向量数据库#向量数据库编程接口" }
  ]} />
</IndexCard>

<IndexCard
  title="AI知识库"
  href="AI功能开发/AI知识库"
  description="智能知识管理系统，支持文档索引、语义搜索和知识问答。"
>
  <LinkGrid columns={2} links={[
    { text: "创建AI知识库元素", href: "AI功能开发/AI知识库#创建ai知识库元素" },
    { text: "AI知识库的管理", href: "AI功能开发/AI知识库#ai知识库的管理" },
    { text: "文档管理", href: "AI功能开发/AI知识库#文档管理" },
    { text: "AI知识库设置", href: "AI功能开发/AI知识库#ai知识库设置" },
    { text: "查询测试", href: "AI功能开发/AI知识库#查询测试" },
    { text: "在后端可视化编程中调用AI知识库", href: "AI功能开发/AI知识库#在后端可视化编程中调用ai知识库" },
    { text: "在AIAgent中使用AI知识库", href: "AI功能开发/AI知识库#在aiagent中使用ai知识库" },
    { text: "AI知识库编程接口", href: "AI功能开发/AI知识库#ai知识库编程接口" },
    { text: "原理及参数说明", href: "AI功能开发/AI知识库#原理及参数说明" },
    { text: "向量化配置说明", href: "AI功能开发/AI知识库#向量化配置说明" }
  ]} />
</IndexCard>

<IndexCard
  title="AI助理（正在编辑中）"
  description="智能对话助手开发，提供自然语言交互和任务辅助功能。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

<IndexCard
  title="AIAgent开发（正在编辑中）"
  description="自主决策AI代理开发，实现复杂的智能自动化流程。"
>
  <div style={{padding: '20px', textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
    📝 文档正在完善中，敬请期待...
  </div>
</IndexCard>

</div>