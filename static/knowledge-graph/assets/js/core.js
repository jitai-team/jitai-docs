// 图谱核心状态管理和工具类

// 统一错误处理器
class ErrorHandler {
    static handle(error, context, recovery = null) {
        console.error(`Error in ${context}:`, error);
        
        // 用户友好的错误消息
        const userMessage = this.getUserFriendlyMessage(error);
        this.showMessage(`${context}失败: ${userMessage}`, 'error');
        
        // 错误恢复策略
        if (recovery && typeof recovery === 'function') {
            try {
                recovery();
            } catch (recoveryError) {
                console.error('Recovery failed:', recoveryError);
            }
        }
        
        // 错误上报（可扩展）
        this.reportError(error, context);
    }
    
    static getUserFriendlyMessage(error) {
        const errorMap = {
            'NetworkError': '网络连接失败',
            'TypeError': '数据格式错误',
            'ReferenceError': '组件未初始化'
        };
        
        return errorMap[error.constructor.name] || error.message || '未知错误';
    }
    
    static showMessage(message, type = 'info') {
        if (typeof showTempMessage === 'function') {
            showTempMessage(message, type);
        }
    }
    
    static reportError(error, context) {
        // 可扩展：发送到错误监控服务
        // 可扩展：上报错误到监控服务
    }
}

// 状态管理器
class GraphState {
    constructor() {
        this.data = {
            nodes: new Map(),
            edges: new Map(),
            selection: new Set(),
            filters: new Map(),
            highlightedNodes: new Set(),
            highlightedEdges: new Set()
        };
        
        this.listeners = new Map();
        this.history = [];
        this.historyIndex = -1;
    }
    
    // 订阅状态变更
    subscribe(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        
        // 返回取消订阅函数
        return () => {
            this.listeners.get(event)?.delete(callback);
        };
    }
    
    // 触发事件
    emit(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    ErrorHandler.handle(error, `State event: ${event}`);
                }
            });
        }
    }
    
    // 更新状态
    update(type, action, data) {
        const oldState = this.cloneState();
        
        try {
            switch (type) {
                case 'nodes':
                    this.updateNodes(action, data);
                    break;
                case 'edges':
                    this.updateEdges(action, data);
                    break;
                case 'selection':
                    this.updateSelection(action, data);
                    break;
                case 'highlight':
                    this.updateHighlight(action, data);
                    break;
                default:
                    throw new Error(`Unknown state type: ${type}`);
            }
            
            // 保存历史记录
            this.saveHistory(oldState);
            
            // 触发变更事件
            this.emit(`${type}:${action}`, data);
            this.emit('stateChanged', { type, action, data });
            
        } catch (error) {
            ErrorHandler.handle(error, `State update: ${type}.${action}`);
            throw error;
        }
    }
    
    updateNodes(action, data) {
        switch (action) {
            case 'add':
                if (Array.isArray(data)) {
                    data.forEach(node => this.data.nodes.set(node.id, node));
                } else {
                    this.data.nodes.set(data.id, data);
                }
                break;
            case 'remove':
                const ids = Array.isArray(data) ? data : [data];
                ids.forEach(id => this.data.nodes.delete(id));
                break;
            case 'update':
                if (this.data.nodes.has(data.id)) {
                    this.data.nodes.set(data.id, { ...this.data.nodes.get(data.id), ...data });
                }
                break;
        }
    }
    
    updateEdges(action, data) {
        switch (action) {
            case 'add':
                if (Array.isArray(data)) {
                    data.forEach(edge => this.data.edges.set(edge.id, edge));
                } else {
                    this.data.edges.set(data.id, data);
                }
                break;
            case 'remove':
                const ids = Array.isArray(data) ? data : [data];
                ids.forEach(id => this.data.edges.delete(id));
                break;
            case 'update':
                if (this.data.edges.has(data.id)) {
                    this.data.edges.set(data.id, { ...this.data.edges.get(data.id), ...data });
                }
                break;
        }
    }
    
    updateSelection(action, data) {
        switch (action) {
            case 'add':
                const addIds = Array.isArray(data) ? data : [data];
                addIds.forEach(id => this.data.selection.add(id));
                break;
            case 'remove':
                const removeIds = Array.isArray(data) ? data : [data];
                removeIds.forEach(id => this.data.selection.delete(id));
                break;
            case 'clear':
                this.data.selection.clear();
                break;
        }
    }
    
    updateHighlight(action, data) {
        switch (action) {
            case 'nodes':
                this.data.highlightedNodes.clear();
                if (data) {
                    const ids = Array.isArray(data) ? data : [data];
                    ids.forEach(id => this.data.highlightedNodes.add(id));
                }
                break;
            case 'edges':
                this.data.highlightedEdges.clear();
                if (data) {
                    const ids = Array.isArray(data) ? data : [data];
                    ids.forEach(id => this.data.highlightedEdges.add(id));
                }
                break;
            case 'clear':
                this.data.highlightedNodes.clear();
                this.data.highlightedEdges.clear();
                break;
        }
    }
    
    // 获取状态
    get(type, id = null) {
        if (id) {
            return this.data[type]?.get?.(id) || this.data[type]?.has?.(id);
        }
        return this.data[type];
    }
    
    // 历史记录管理
    saveHistory(state) {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
        
        // 限制历史记录数量
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
            return true;
        }
        return false;
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
            return true;
        }
        return false;
    }
    
    cloneState() {
        return {
            nodes: new Map(this.data.nodes),
            edges: new Map(this.data.edges),
            selection: new Set(this.data.selection),
            filters: new Map(this.data.filters),
            highlightedNodes: new Set(this.data.highlightedNodes),
            highlightedEdges: new Set(this.data.highlightedEdges)
        };
    }
    
    restoreState(state) {
        this.data = state;
        this.emit('stateRestored', state);
    }
    
    // 清理资源
    cleanup() {
        this.listeners.clear();
        this.data = {
            nodes: new Map(),
            edges: new Map(),
            selection: new Set(),
            filters: new Map(),
            highlightedNodes: new Set(),
            highlightedEdges: new Set()
        };
        this.history = [];
        this.historyIndex = -1;
    }
}

// 资源管理器
class ResourceManager {
    constructor() {
        this.resources = {
            observers: [],
            timers: [],
            animationIds: [],
            eventListeners: []
        };
    }
    
    addObserver(observer) {
        this.resources.observers.push(observer);
        return observer;
    }
    
    addTimer(timer) {
        this.resources.timers.push(timer);
        return timer;
    }
    
    addAnimationId(id) {
        this.resources.animationIds.push(id);
        return id;
    }
    
    addEventListener(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        this.resources.eventListeners.push({ element, event, handler, options });
    }
    
    cleanup() {
        // 清理 observers
        this.resources.observers.forEach(observer => {
            try {
                observer.disconnect();
            } catch (e) {
                console.warn('Failed to disconnect observer:', e);
            }
        });
        
        // 清理 timers
        this.resources.timers.forEach(timer => {
            try {
                clearTimeout(timer);
                clearInterval(timer);
            } catch (e) {
                console.warn('Failed to clear timer:', e);
            }
        });
        
        // 清理 animations
        this.resources.animationIds.forEach(id => {
            try {
                cancelAnimationFrame(id);
            } catch (e) {
                console.warn('Failed to cancel animation:', e);
            }
        });
        
        // 清理 event listeners
        this.resources.eventListeners.forEach(({ element, event, handler, options }) => {
            try {
                element.removeEventListener(event, handler, options);
            } catch (e) {
                console.warn('Failed to remove event listener:', e);
            }
        });
        
        // 重置资源列表
        this.resources = {
            observers: [],
            timers: [],
            animationIds: [],
            eventListeners: []
        };
    }
}

// 批量更新管理器
class BatchUpdateManager {
    constructor() {
        this.pendingUpdates = new Map();
        this.batchTimer = null;
        this.batchDelay = 16; // 60fps
    }
    
    scheduleUpdate(type, id, data) {
        this.pendingUpdates.set(`${type}-${id}`, { type, id, data });
        this.debouncedFlush();
    }
    
    debouncedFlush() {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
        }
        
        this.batchTimer = setTimeout(() => {
            this.flush();
        }, this.batchDelay);
    }
    
    flush() {
        if (this.pendingUpdates.size === 0) return;
        
        const updates = Array.from(this.pendingUpdates.values());
        this.pendingUpdates.clear();
        
        // 按类型分组批量更新
        const nodeUpdates = updates.filter(u => u.type === 'node');
        const edgeUpdates = updates.filter(u => u.type === 'edge');
        
        try {
            if (nodeUpdates.length > 0) {
                this.applyNodeUpdates(nodeUpdates);
            }
            if (edgeUpdates.length > 0) {
                this.applyEdgeUpdates(edgeUpdates);
            }
        } catch (error) {
            ErrorHandler.handle(error, 'Batch update');
        }
    }
    
    applyNodeUpdates(updates) {
        // 具体的节点更新逻辑
        // 应用节点更新
    }
    
    applyEdgeUpdates(updates) {
        // 具体的边更新逻辑
        // 应用边更新
    }
}

// 防抖工具函数
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// 节流工具函数
function throttle(func, wait) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ErrorHandler,
        GraphState,
        ResourceManager,
        BatchUpdateManager,
        debounce,
        throttle
    };
} else {
    window.GraphCore = {
        ErrorHandler,
        GraphState,
        ResourceManager,
        BatchUpdateManager,
        debounce,
        throttle
    };
} 