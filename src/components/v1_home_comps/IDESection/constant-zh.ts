const CONTENT = {
    title: "Jit 开发工具",
    subtitle:
        "编排式定义业务模块、组合模块，编程式开发业务处理逻辑，自动生成高质量代码，同时支持原生编码",
    color: "#b45309",
    videoHoverText: "点击全屏查看高清视频",
    coreFeatures: [
        {
            title: "简单、灵活、一致性的开发范式",
            description:
                "创建、选择、组装、配置各种规范化的元素，即可构建出各种各样的系统功能。开发者极易掌握和操作，开发工作质量高、效率高",
            video: "https://jit-www.oss-accelerate.aliyuncs.com/ide_frame.mp4",
        },
        {
            title: "自动生成高质量代码",
            description:
                "JitAi图形化编排和编程工具是基于应用协议和编程框架的代码编辑技术，自动生成高质量原生代码，且与程序员编码和AI编码共同编辑同一份源代码，开发工具不对程序员编码造成限制",
            video: "https://jit-www.oss-accelerate.aliyuncs.com/ide_code.mp4",
        },
        {
            title: "可改写、可扩展",
            description:
                "开发者通过在自己的应用中实现元素编辑器，可以扩展和改写官方开发工具的功能特性，意味着开发者可以自定义自己的开发工具",
            video: "https://jit-www.oss-accelerate.aliyuncs.com/ide_extend.mp4",
        },
    ],
    developmentModules: [
        {
            title: "门户可视化开发",
            description:
                "支持多门户设计，可面向不同场景设计子系统，支持多标签页和导航布局",
            link: "./docs/devguide/shell-and-page/portal-navigation-design",
        },
        {
            title: "页面可视化开发",
            description:
                "灵活组合组件，界面完全自由排版，支持自定义组件事件和变量函数",
            link: "./docs/devguide/shell-and-page/component-based-page-development",
        },
        {
            title: "服务可视化开发",
            description:
                "封装复杂业务逻辑，支持API调用对接，可被前端后端函数调用",
            link: "./docs/devguide/business-logic-development/creating-service-elements",
        },
        {
            title: "模型可视化开发",
            description: "简化数据表模型，支持多表增删改查，内置丰富数据类型",
            link: "./docs/devguide/data-modeling",
        },
        {
            title: "权限可视化开发",
            description:
                "灵活配置用户权限，支持角色管理和访问控制，确保系统安全",
            link: "./docs/devguide/user-and-permission/role-portal-menu-permissions",
        },
        {
            title: "流程可视化开发",
            description:
                "定义业务审批流程，支持子流程并行节点，可同步到第三方平台",
            link: "./docs/devguide/approval-workflow",
        },
        {
            title: "AI助理可视化开发",
            description:
                "集成AI大模型能力，支持智能对话和自动化处理，提升用户体验",
            link: "./docs/devguide/ai-assistant",
        },
        {
            title: "AI Agent可视化开发",
            description:
                "创建具备自主决策和任务执行能力的智能体代理，可调用工具和知识库完成复杂业务流程",
            link: "./docs/devguide/ai-agent",
        },
        {
            title: "AI知识库可视化开发",
            description:
                "深度融合应用中的模型数据，构建基于RAG架构的智能知识库，支持语义理解和检索增强生成",
            link: "./docs/devguide/knowledge-base",
        },
        {
            title: "后台任务可视化开发",
            description: "配置定时任务和后台处理，支持任务调度和状态监控",
            link: "./docs/devguide/business-logic-development/background-tasks",
        },
        {
            title: "后端事件可视化开发",
            description:
                "定义系统事件处理，支持事件触发和响应机制，实现业务自动化",
            link: "./docs/devguide/business-logic-development/event-handling",
        },
        {
            title: "API 授权可视化开发",
            description:
                "管理API接口权限，支持OAuth认证和访问令牌，保障接口安全",
            link: "./docs/devguide/api-exposure",
        },
    ],
};

export default CONTENT;
