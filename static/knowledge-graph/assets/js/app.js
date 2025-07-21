/**
 * 主应用程序 - 知识图谱可视化应用
 * 职责：协调各个模块，管理应用状态，处理用户交互
 */

class KnowledgeGraphApp {
    constructor() {
        // 应用状态
        this.state = {
            isInitialized: false,
            isDataLoaded: false,
            knowledgeGraphConfig: null,
            currentFilter: null,
            searchTerm: '',
            selectedNode: null
        };
        
        // 组件引用
        this.components = {
            d3Graph: null,
            filterManager: null,
            searchManager: null
        };
    }
    
    /**
     * 初始化应用
     */
    async initialize() {
        try {
            // 检查必要的依赖
            if (!this.checkDependencies()) {
                throw new Error('缺少必要的依赖');
            }
            
            // 加载数据
            await this.loadData();
            
            // 验证数据
            if (!this.validateData()) {
                throw new Error('数据验证失败');
            }
            
            // 初始化组件
            this.initializeComponents();
            
            // 绑定事件
            this.bindEvents();
            
            // 设置全局引用（向后兼容）
            this.setupGlobalReferences();
            
            // 完成初始化
            this.finishInitialization();
            
        } catch (error) {
            this.handleInitializationFailure(error.message);
        }
    }
    
    /**
     * 加载数据
     */
    async loadData() {
        this.state.knowledgeGraphConfig = await DataLoader.loadKnowledgeGraphData();
        
        if (this.state.knowledgeGraphConfig) {
            // 预处理数据
            this.state.knowledgeGraphConfig = DataLoader.preprocessData(this.state.knowledgeGraphConfig);
            this.state.isDataLoaded = true;
        }
    }
    
    /**
     * 验证数据
     */
    validateData() {
        if (!this.state.knowledgeGraphConfig) {
            return false;
        }
        
        if (!Array.isArray(this.state.knowledgeGraphConfig.nodes)) {
            return false;
        }
        
        if (this.state.knowledgeGraphConfig.nodes.length === 0) {
            return false;
        }
        
        return true;
    }
    
    /**
     * 初始化各个组件
     */
    initializeComponents() {
        try {
                         // 初始化D3图形组件
             this.components.d3Graph = new D3NetworkGraph(document.querySelector('#network'));
            
            // 设置数据
            this.components.d3Graph.setFullData(
                this.state.knowledgeGraphConfig.nodes,
                this.state.knowledgeGraphConfig.edges || []
            );
            
            // 设置可见数据并渲染
            this.components.d3Graph.setVisibleData(
                this.state.knowledgeGraphConfig.nodes,
                this.state.knowledgeGraphConfig.edges || []
            );
            
            // 延迟调用fit以确保图形正确渲染
            setTimeout(() => {
                if (this.components.d3Graph && this.components.d3Graph.fit) {
                    this.components.d3Graph.fit();
                }
            }, 100);
            
            // 设置节点点击事件
            this.components.d3Graph.onNodeClick = (node) => {
                this.handleNodeClick(node);
            };
            
            // 设置背景点击事件  
            this.components.d3Graph.onBackgroundClick = () => {
                this.handleBackgroundClick();
            };
            
                         // 初始化筛选管理器
             this.components.filterManager = new FilterManager();
             this.components.filterManager.init(this.state.knowledgeGraphConfig);
             
             // 设置筛选变化回调
             this.components.filterManager.onFilterChange = (visibleNodes, visibleEdges) => {
                 this.handleFilterChange(visibleNodes, visibleEdges);
             };
             
             // 搜索管理器是静态类，不需要实例化
             this.components.searchManager = SearchManager;
            
        } catch (error) {
            throw new Error(`组件初始化失败: ${error.message}`);
        }
    }
    
    /**
     * 绑定全局事件
     */
    bindEvents() {
        // 主搜索框回车键事件
        const searchInput = DOMUtils.safeGetElement(Selectors.SEARCH_INPUT);
        if (searchInput) {
            searchInput.addEventListener(Events.KEYDOWN, (event) => {
                if (event.key === Keys.ENTER) {
                    event.preventDefault();
                    if (typeof searchAndHighlightNode === 'function') {
                        searchAndHighlightNode();
                    }
                }
            });
        }
    }
    
    /**
     * 处理键盘事件
     */
    handleKeyboardEvents() {
        document.addEventListener(Events.KEYDOWN, (event) => {
            // ESC键清除选择
            if (event.key === Keys.ESCAPE) {
                this.clearSelection();
            }
            
            // Ctrl+F 或 Cmd+F 聚焦搜索框
            if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
                event.preventDefault();
                const searchInput = DOMUtils.safeGetElement(Selectors.SEARCH_INPUT);
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }
    
    /**
     * 设置全局引用（向后兼容）
     */
    setupGlobalReferences() {
        // 将关键组件设置为全局可访问
        if (typeof window !== 'undefined') {
            window.AppState = {
                app: this,
                d3Graph: this.components.d3Graph,
                filterManager: this.components.filterManager,
                searchManager: this.components.searchManager,
                knowledgeGraphConfig: this.state.knowledgeGraphConfig
            };
        }
    }
    
    /**
     * 完成初始化
     */
    finishInitialization() {
        this.state.isInitialized = true;
        
        // 隐藏加载提示
        const loadingOverlay = DOMUtils.safeGetElement('.loading-overlay');
        if (loadingOverlay) {
            DOMUtils.addClass(loadingOverlay, CSSClasses.HIDDEN);
        }
        
        // 显示成功消息
        if (window.showTempMessage) {
            showTempMessage('知识图谱加载完成', AppConfig.MESSAGE_TYPES.SUCCESS);
        }
    }
    
    /**
     * 处理初始化失败
     */
    handleInitializationFailure(message) {
        const errorMessage = `初始化失败: ${message}`;
        
        // 显示错误消息
        if (window.showTempMessage) {
            showTempMessage(errorMessage, AppConfig.MESSAGE_TYPES.ERROR);
        }
        
        // 隐藏加载提示
        const loadingOverlay = DOMUtils.safeGetElement('.loading-overlay');
        if (loadingOverlay) {
            DOMUtils.addClass(loadingOverlay, CSSClasses.HIDDEN);
        }
    }
    
    /**
     * 检查依赖
     */
    checkDependencies() {
        const requiredGlobals = ['DataLoader', 'D3Graph', 'FilterManager', 'SearchManager'];
        const missing = requiredGlobals.filter(dep => typeof window[dep] === 'undefined');
        
        if (missing.length > 0) {
            console.error('缺少依赖:', missing);
            return false;
        }
        
        return true;
    }
    
    /**
     * 处理节点点击
     */
    handleNodeClick(node) {
        this.state.selectedNode = node;
        
        // 显示节点信息
        if (window.showNodeInfo) {
            showNodeInfo(node);
        }
        
        // 高亮节点及其连接并调整最佳视图
        if (this.components.d3Graph && this.components.d3Graph.highlightNodeWithConnections) {
            this.components.d3Graph.highlightNodeWithConnections(node.id);
            
            // 调整最佳视图
            setTimeout(() => {
                if (this.components.d3Graph.focusOnNodeWithOptimalView) {
                    this.components.d3Graph.focusOnNodeWithOptimalView(node.id);
                }
            }, 100);
        }
    }
    
    /**
     * 处理背景点击
     */
    handleBackgroundClick() {
        this.clearSelection();
    }
    
    /**
     * 处理筛选变化
     */
    handleFilterChange(visibleNodes, visibleEdges) {
        if (this.components.d3Graph) {
            this.components.d3Graph.setVisibleData(visibleNodes, visibleEdges);
        }
    }
    
    
    
    /**
     * 清除选择
     */
    clearSelection() {
        this.state.selectedNode = null;
        
        // 隐藏信息面板
        if (window.hideInfoPanel) {
            hideInfoPanel();
        }
        
                 // 清除高亮
         if (this.components.d3Graph && this.components.d3Graph.resetHighlight) {
             this.components.d3Graph.resetHighlight();
         }
    }
    
    /**
     * 重新加载应用
     */
    async reload() {
        this.state.isInitialized = false;
        this.state.isDataLoaded = false;
        this.state.knowledgeGraphConfig = null;
        
        await this.initialize();
    }
    
    /**
     * 获取应用状态
     */
    getState() {
        return { ...this.state };
    }
    
    /**
     * 获取组件引用
     */
    getComponents() {
        return { ...this.components };
    }
}

// ===== 全局初始化和入口点 =====

/**
 * 创建应用实例
 */
function createApp() {
    try {
        const app = new KnowledgeGraphApp();
        return app;
    } catch (error) {
        console.error('创建应用实例失败:', error);
        return null;
    }
}

/**
 * DOM加载完成后初始化应用
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 显示加载状态
        const loadingOverlay = DOMUtils.safeGetElement('.loading-overlay');
        if (loadingOverlay) {
            DOMUtils.removeClass(loadingOverlay, CSSClasses.HIDDEN);
        }
        
        // 创建应用实例
        const app = createApp();
        if (!app) {
            throw new Error('应用实例创建失败');
        }
        
        // 初始化应用
        await app.initialize();
        
    } catch (error) {
        console.error('应用启动失败:', error);
        
        // 隐藏加载提示
        const loadingOverlay = DOMUtils.safeGetElement('.loading-overlay');
        if (loadingOverlay) {
            DOMUtils.addClass(loadingOverlay, CSSClasses.HIDDEN);
        }
        
        // 显示错误消息
        if (window.showTempMessage) {
            showTempMessage(`应用启动失败: ${error.message}`, AppConfig.MESSAGE_TYPES.ERROR);
        }
    }
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeGraphApp;
} else {
    window.KnowledgeGraphApp = KnowledgeGraphApp;
} 