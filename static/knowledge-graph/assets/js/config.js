/**
 * 应用配置和常量 - 统一配置管理
 * 职责：管理全局配置、常量、默认值等
 */

// 应用配置对象
const AppConfig = {
    // 层级关系配置
    HIERARCHICAL_RELATIONS: ['包含', '支持', '管理'],
    
    // 数据文件路径
    DATA_PATH: 'assets/data/graph-data.json',
    
    // UI配置
    UI: {
        SIDEBAR_WIDTH: 350,
        SIDEBAR_MIN_WIDTH: 300,
        SIDEBAR_MAX_WIDTH: 500,
        INFO_PANEL_WIDTH: 300,
        TREE_INDENT_SIZE: 12,
        MESSAGE_DURATION: 3000,
        ANIMATION_DURATION: 300
    },
    
    // 图形配置
    GRAPH: {
        NODE_RADIUS: 12,
        STROKE_WIDTH: 2,
        LINK_STROKE_WIDTH: 1.5,
        COLORS: {
            NODE: '#90CAF9',
            NODE_STROKE: '#fff',
            LINK: '#bdbdbd',
            HIGHLIGHT_NODE: '#1976D2',
            HIGHLIGHT_CONNECTED: '#4CAF50',
            HIGHLIGHT_LINK: '#2196F3'
        }
    },
    
    // 消息类型
    MESSAGE_TYPES: {
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error'
    },
    
    // 节点状态
    NODE_STATES: {
        PENDING: 'pending',
        IN_PROGRESS: 'in_progress',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled'
    }
};

// DOM选择器常量
const Selectors = {
    // 主要容器
    SIDEBAR: '#sidebar',
    GRAPH_CONTAINER: '#network',
    INFO_PANEL: '#infoPanel',
    FILTER_CONTAINER: '#filterContainer',
    LOADING_OVERLAY: '#loadingOverlay',
    TEMP_MESSAGE: '#tempMessage',
    
    // 搜索相关
    SEARCH_INPUT: '#nodeSearchInput',
    
    // 信息面板
    INFO_TITLE: '#infoTitle',
    INFO_TYPE: '#infoType',
    INFO_CONTENT: '#infoContent'
};

// CSS类名常量
const CSSClasses = {
    VISIBLE: 'visible',
    EXPANDED: 'expanded',
    HIDDEN: 'hidden',
    LOADING: 'loading',
    SHOW: 'show',
    HAS_SCROLL: 'has-scroll',
    
    // 树形相关
    TREE_NODE: 'tree-node',
    TREE_NODE_HEADER: 'tree-node-header',
    TREE_NODE_LABEL: 'tree-node-label',
    TREE_NODE_CHILDREN: 'tree-node-children',
    TREE_EXPAND_ICON: 'tree-expand-icon',
    
    // 消息类型
    MESSAGE_WARNING: 'warning',
    MESSAGE_ERROR: 'error',
    MESSAGE_SUCCESS: 'success'
};

// 事件名称常量
const Events = {
    // DOM事件
    CLICK: 'click',
    CHANGE: 'change',
    INPUT: 'input',
    KEYUP: 'keyup',
    KEYDOWN: 'keydown',
    RESIZE: 'resize',
    
    // 自定义事件
    DATA_LOADED: 'dataLoaded',
    NODE_SELECTED: 'nodeSelected',
    FILTER_CHANGED: 'filterChanged',
    SEARCH_PERFORMED: 'searchPerformed'
};

// 键盘按键常量
const Keys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown'
};

// 导出配置（支持ES6模块和传统方式）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppConfig, Selectors, CSSClasses, Events, Keys };
} else {
    // 浏览器环境，挂载到全局对象
    window.AppConfig = AppConfig;
    window.Selectors = Selectors;
    window.CSSClasses = CSSClasses;
    window.Events = Events;
    window.Keys = Keys;
} 