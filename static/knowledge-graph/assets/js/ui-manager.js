/**
 * UI管理器 - 用户界面控制和交互
 * 职责：管理侧边栏、信息面板、搜索等UI交互
 */

// ===== UI控制器 =====
class UIController {
    
    static toggleTreeNode(nodeId) {
        const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
        if (nodeElement) {
            const childrenContainer = nodeElement.querySelector('.tree-node-children');
            const expandIcon = nodeElement.querySelector('.tree-expand-icon');
            
            if (childrenContainer) {
                DOMUtils.toggleClass(childrenContainer, CSSClasses.EXPANDED);
                
                if (expandIcon) {
                    const isExpanded = DOMUtils.hasClass(childrenContainer, CSSClasses.EXPANDED);
                    expandIcon.textContent = isExpanded ? '▼' : '▶';
                }
            }
        }
    }
}

// ===== 信息面板控制器 =====
class InfoPanel {
    static show() {
        const panel = DOMUtils.safeGetElement(Selectors.INFO_PANEL);
        if (panel) {
            DOMUtils.addClass(panel, CSSClasses.VISIBLE);
            
            // 检查是否需要滚动提示
            setTimeout(() => {
                this.checkScrollIndicator();
            }, 100);
        }
    }
    
    static hide() {
        const panel = DOMUtils.safeGetElement(Selectors.INFO_PANEL);
        if (panel) {
            DOMUtils.removeClass(panel, CSSClasses.VISIBLE);
        }
    }
    
    static showNodeInfo(nodeId) {
        const nodeData = this.getNodeData(nodeId);
        
        if (!nodeData) {
            this.showError('节点信息未找到');
            return;
        }
        
        this.updateContent(nodeData);
        this.show();
    }
    
    static getNodeData(nodeId) {
        if (!window.AppState || !window.AppState.knowledgeGraphConfig) {
            return null;
        }
        
        const { knowledgeGraphConfig } = window.AppState;
        const node = knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
        
        if (!node) {
            return null;
        }
        
        return {
            ...node,
            details: node.observations ? { observations: node.observations } : {}
        };
    }
    
    static updateContent(nodeData) {
        const titleElement = DOMUtils.safeGetElement(Selectors.INFO_TITLE);
        const typeElement = DOMUtils.safeGetElement(Selectors.INFO_TYPE);
        const contentElement = DOMUtils.safeGetElement(Selectors.INFO_CONTENT);
        
        if (titleElement) {
            titleElement.textContent = nodeData.name || nodeData.label || nodeData.id;
        }
        
        // 隐藏类型元素，不再显示
        if (typeElement) {
            typeElement.style.display = 'none';
        }
        
        if (contentElement) {
            contentElement.innerHTML = this.generateContentHTML(nodeData);
        }
        
        // 内容更新后检查滚动
        setTimeout(() => {
            this.checkScrollIndicator();
        }, 100);
    }
    
    static generateContentHTML(nodeData) {
        let html = '';
        
        // 观察信息
        html += `<div class="observations-section">`;
        
        if (nodeData.details && nodeData.details.observations && nodeData.details.observations.length > 0) {
            nodeData.details.observations.forEach((obs, index) => {
                html += `<div class="observation-item">`;
                html += `<div class="observation-text">${StringUtils.escapeHtml(obs)}</div>`;
                html += `</div>`;
            });
        } else {
            html += `<div class="no-observations">`;
            html += `<div class="no-observations-text">暂无相关信息</div>`;
            html += `</div>`;
        }
        
        html += `</div>`;
        
        // 相关节点
        const relatedNodes = this.getRelatedNodes(nodeData.id);
        if (relatedNodes.length > 0) {
            html += `<div class="related-nodes-section">`;
            
            relatedNodes.forEach(rel => {
                const relationText = rel.direction === 'outgoing' 
                    ? `${rel.relationType}` 
                    : `被${rel.relationType}`;
                
                html += `<div class="relation-item">`;
                html += `<div class="relation-content">`;
                html += `<span class="relation-label">${StringUtils.escapeHtml(relationText)}</span>`;
                html += `<span class="related-node-link" onclick="showRelatedNode('${rel.nodeId}')">${StringUtils.escapeHtml(rel.name)}</span>`;
                html += `</div>`;
                html += `</div>`;
            });
            
            html += `</div>`;
        }
        
        return html;
    }
    
    static getRelatedNodes(nodeId) {
        if (!window.AppState || !window.AppState.knowledgeGraphConfig) {
            return [];
        }
        
        const { edges, nodes } = window.AppState.knowledgeGraphConfig;
        const related = [];
        
        edges.forEach(edge => {
            let targetNodeId = null;
            let relationType = edge.label || edge.type || 'relates_to';
            let direction = '';
            
            if (edge.source === nodeId) {
                targetNodeId = edge.target;
                direction = 'outgoing';
            } else if (edge.target === nodeId) {
                targetNodeId = edge.source;
                direction = 'incoming';
            }
            
            if (targetNodeId) {
                const targetNode = nodes.find(n => n.id === targetNodeId);
                if (targetNode) {
                    related.push({
                        nodeId: targetNodeId,
                        name: targetNode.name || targetNode.label || targetNodeId,
                        relationType: relationType,
                        direction: direction
                    });
                }
            }
        });
        
        return related;
    }
    
    static showError(message) {
        const contentElement = DOMUtils.safeGetElement(Selectors.INFO_CONTENT);
        if (contentElement) {
            contentElement.innerHTML = `<div class="no-info">${StringUtils.escapeHtml(message)}</div>`;
        }
        this.show();
    }
    
    static checkScrollIndicator() {
        const panel = DOMUtils.safeGetElement(Selectors.INFO_PANEL);
        const contentContainer = panel?.querySelector('.info-content-container');
        
        if (panel && contentContainer) {
            const hasScroll = contentContainer.scrollHeight > contentContainer.clientHeight;
            
            if (hasScroll) {
                DOMUtils.addClass(panel, CSSClasses.HAS_SCROLL);
            } else {
                DOMUtils.removeClass(panel, CSSClasses.HAS_SCROLL);
            }
            
            // 确保滚动条可见
            contentContainer.style.overflowY = 'auto';
        }
    }
}

// ===== 搜索管理器 =====
class SearchManager {
    static search(query) {
        if (!ValidationUtils.isValidString(query)) {
            showTempMessage('请输入搜索关键词', AppConfig.MESSAGE_TYPES.WARNING);
            return;
        }
        
        const normalizedQuery = query.toLowerCase().trim();

        
        // 查找匹配的节点
        const matchedNodes = this.findMatchingNodes(normalizedQuery);
        
        if (matchedNodes.length === 0) {
            showTempMessage(`未找到包含"${query}"的节点`, AppConfig.MESSAGE_TYPES.WARNING);
            return;
        }
        
        // 高亮第一个匹配的节点
        const firstMatch = matchedNodes[0];
        this.highlightAndShowNode(firstMatch);
        
        // 显示搜索结果
        const nodeName = firstMatch.name || firstMatch.label || firstMatch.id;
        const message = matchedNodes.length === 1 
            ? `找到节点: ${nodeName}`
            : `找到 ${matchedNodes.length} 个相关节点，显示: ${nodeName}`;
            
        showTempMessage(message, AppConfig.MESSAGE_TYPES.SUCCESS);
    }
    
    static findMatchingNodes(query) {
        if (!window.AppState || !window.AppState.knowledgeGraphConfig) {
            return [];
        }
        
        const { nodes } = window.AppState.knowledgeGraphConfig;
        
        return nodes.filter(node => {
            const name = (node.name || node.label || node.id).toLowerCase();
            const id = node.id.toLowerCase();
            
            return name.includes(query) || id.includes(query);
        });
    }
    
    static highlightAndShowNode(node) {
        // 高亮节点
        if (window.AppState && window.AppState.d3Graph) {
            window.AppState.d3Graph.highlightNodeWithConnections(node.id);
            
            // 延迟调整最佳视图
            setTimeout(() => {
                window.AppState.d3Graph.focusOnNodeWithOptimalView(node.id);
            }, 100);
        }
        
        // 显示节点信息
        InfoPanel.showNodeInfo(node.id);
    }
}

// ===== 全局函数定义 =====

// 搜索相关
function searchAndHighlightNode() {
    const searchInput = DOMUtils.safeGetElement(Selectors.SEARCH_INPUT);
    if (searchInput) {
        SearchManager.search(searchInput.value);
    }
}



// 信息面板控制
function showNodeInfo(node) {
    InfoPanel.showNodeInfo(node.id);
}

function hideInfoPanel() {
    InfoPanel.hide();
}

function showRelatedNode(nodeId) {
    InfoPanel.showNodeInfo(nodeId);
    
    // 同时在图中高亮该节点并调整最佳视图
    if (window.AppState && window.AppState.d3Graph) {
        window.AppState.d3Graph.highlightNodeWithConnections(nodeId);
        setTimeout(() => {
            window.AppState.d3Graph.focusOnNodeWithOptimalView(nodeId);
        }, 100);
    }
}

// 图形控制
function restabilizeNetwork() {
    if (window.AppState && window.AppState.d3Graph) {
        window.AppState.d3Graph.restabilize();
        showTempMessage('重新稳定化中...', AppConfig.MESSAGE_TYPES.INFO);
    }
}

function optimizeView() {
    if (window.AppState && window.AppState.d3Graph) {
        window.AppState.d3Graph.fit();
        showTempMessage('视图已优化', AppConfig.MESSAGE_TYPES.SUCCESS);
    }
}



// 筛选器控制
function expandAllLayers() {
    const treeNodes = document.querySelectorAll('.tree-node-children');
    treeNodes.forEach(node => {
        DOMUtils.addClass(node, CSSClasses.EXPANDED);
    });
    
    const expandIcons = document.querySelectorAll('.tree-expand-icon');
    expandIcons.forEach(icon => {
        icon.textContent = '▼';
    });
    
    // 调整侧边栏宽度
    if (window.AppState?.filterManager?.adjustSidebarWidth) {
        setTimeout(() => {
            window.AppState.filterManager.adjustSidebarWidth();
        }, 100);
    }
    
    showTempMessage('已展开所有层级', AppConfig.MESSAGE_TYPES.SUCCESS);
}

function collapseAllLayers() {
    const treeNodes = document.querySelectorAll('.tree-node-children');
    treeNodes.forEach(node => {
        DOMUtils.removeClass(node, CSSClasses.EXPANDED);
    });
    
    const expandIcons = document.querySelectorAll('.tree-expand-icon');
    expandIcons.forEach(icon => {
        icon.textContent = '▶';
    });
    
    // 调整侧边栏宽度
    if (window.AppState?.filterManager?.adjustSidebarWidth) {
        setTimeout(() => {
            window.AppState.filterManager.adjustSidebarWidth();
        }, 100);
    }
    
    showTempMessage('已收起所有层级', AppConfig.MESSAGE_TYPES.SUCCESS);
}

function selectAllFilters() {
    const checkboxes = document.querySelectorAll('.tree-node input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    
    showTempMessage('已选中所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
}

function deselectAllFilters() {
    const checkboxes = document.querySelectorAll('.tree-node input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    showTempMessage('已取消所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
}

// 消息提示
function showTempMessage(message, type = AppConfig.MESSAGE_TYPES.INFO) {
    const messageEl = DOMUtils.safeGetElement(Selectors.TEMP_MESSAGE);
    if (!messageEl) return;
    
    // 重置所有样式类
    DOMUtils.removeClass(messageEl, CSSClasses.MESSAGE_WARNING);
    DOMUtils.removeClass(messageEl, CSSClasses.MESSAGE_ERROR);
    DOMUtils.removeClass(messageEl, CSSClasses.MESSAGE_SUCCESS);
    DOMUtils.removeClass(messageEl, CSSClasses.SHOW);
    
    messageEl.textContent = message;
    
    // 添加对应的类型样式
    if (type === AppConfig.MESSAGE_TYPES.WARNING) {
        DOMUtils.addClass(messageEl, CSSClasses.MESSAGE_WARNING);
    } else if (type === AppConfig.MESSAGE_TYPES.ERROR) {
        DOMUtils.addClass(messageEl, CSSClasses.MESSAGE_ERROR);
    } else if (type === AppConfig.MESSAGE_TYPES.SUCCESS) {
        DOMUtils.addClass(messageEl, CSSClasses.MESSAGE_SUCCESS);
    }
    
    // 显示消息
    setTimeout(() => DOMUtils.addClass(messageEl, CSSClasses.SHOW), 50);
    
    // 自动隐藏
    setTimeout(() => DOMUtils.removeClass(messageEl, CSSClasses.SHOW), AppConfig.UI.MESSAGE_DURATION);
}

// 筛选器批量操作
function selectAllFilters() {
    if (window.AppState?.filterManager) {
        window.AppState.filterManager.selectAllNodes();
        showTempMessage('已选中所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
    } else if (window.filterManager) {
        window.filterManager.selectAllNodes();
        showTempMessage('已选中所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
    }
}

function deselectAllFilters() {
    if (window.AppState?.filterManager) {
        window.AppState.filterManager.deselectAllNodes();
        showTempMessage('已取消所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
    } else if (window.filterManager) {
        window.filterManager.deselectAllNodes();
        showTempMessage('已取消所有筛选器', AppConfig.MESSAGE_TYPES.SUCCESS);
    }
}

// 树形筛选器交互
function highlightNodeFromTree(event, nodeId) {
    event.stopPropagation();
    
    if (window.AppState && window.AppState.d3Graph) {
        window.AppState.d3Graph.highlightNodeWithConnections(nodeId);
        
        // 调整最佳视图
        setTimeout(() => {
            window.AppState.d3Graph.focusOnNodeWithOptimalView(nodeId);
        }, 100);
        
        InfoPanel.showNodeInfo(nodeId);
    }
}

// 导出全局引用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        UIController,
        InfoPanel,
        SearchManager
    };
} else {
    // 浏览器环境，挂载到全局
    window.UIController = UIController;
    window.InfoPanel = InfoPanel;
    window.SearchManager = SearchManager;
    window.showNodeInfo = showNodeInfo;
    window.hideInfoPanel = hideInfoPanel;
} 