/**
 * 筛选器管理器 - 树形筛选和节点过滤
 * 职责：构建树形筛选器，管理节点选择状态，更新图形显示
 */

class FilterManager {
    constructor() {
        this.selectedNodeIds = new Set();
        this.knowledgeGraphConfig = null;
    }
    
    /**
     * 初始化筛选器
     * @param {Object} knowledgeGraphConfig - 知识图谱配置
     */
    init(knowledgeGraphConfig) {
        this.knowledgeGraphConfig = knowledgeGraphConfig;
        this.buildTreeFilter();
        
        // 默认选中所有节点
        this.selectedNodeIds.clear();
        this.selectAllNodes();
        
        // 初始化时调整侧边栏宽度
        setTimeout(() => {
            this.adjustSidebarWidth();
        }, 100);
    }
    
    /**
     * 构建树形筛选器
     */
    buildTreeFilter() {
        const filterContainer = DOMUtils.safeGetElement(Selectors.FILTER_CONTAINER);
        if (!filterContainer || !this.knowledgeGraphConfig.nodes) {
            return;
        }
        
        // 构建层次关系映射
        const hierarchyData = this.buildHierarchyData();
        
        // 构建树形结构
        const treeData = this.buildTreeData(hierarchyData);
        
        // 渲染树形HTML
        const filterHTML = this.renderTreeHTML(treeData);
        
        filterContainer.innerHTML = filterHTML;
    }
    
    /**
     * 构建层次关系数据
     */
    buildHierarchyData() {
        const parentChildMap = {};
        const childParentMap = {};
        
        if (this.knowledgeGraphConfig.edges) {
            this.knowledgeGraphConfig.edges.forEach(edge => {
                if (AppConfig.HIERARCHICAL_RELATIONS.includes(edge.type)) {
                    if (!parentChildMap[edge.source]) {
                        parentChildMap[edge.source] = [];
                    }
                    parentChildMap[edge.source].push(edge.target);
                    childParentMap[edge.target] = edge.source;
                }
            });
        }
        
        return { parentChildMap, childParentMap };
    }
    
    /**
     * 构建树形数据结构
     */
    buildTreeData(hierarchyData) {
        const { parentChildMap, childParentMap } = hierarchyData;
        
        // 找到根节点（没有父节点的节点）并按名称排序
        const rootNodes = this.knowledgeGraphConfig.nodes
            .filter(node => !childParentMap[node.id])
            .sort((a, b) => {
                const nameA = (a.name || a.label || a.id).toLowerCase();
                const nameB = (b.name || b.label || b.id).toLowerCase();
                return nameA.localeCompare(nameB);
            });
        
        // 递归构建树形结构
        const buildTreeNode = (nodeId, level = 0, visited = new Set()) => {
            const node = this.knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
            if (!node || visited.has(nodeId)) {
                return null;
            }
            
            const newVisited = new Set(visited);
            newVisited.add(nodeId);
            
            const children = parentChildMap[nodeId] || [];
            
            // 对子节点按名称排序
            const sortedChildren = children
                .map(childId => {
                    const childNode = this.knowledgeGraphConfig.nodes.find(n => n.id === childId);
                    return {
                        id: childId,
                        sortKey: (childNode?.name || childNode?.label || childId).toLowerCase()
                    };
                })
                .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
                .map(item => item.id);
            
            return {
                id: nodeId,
                label: node.name || node.label || node.id,
                type: node.type || 'Entity',
                level: level,
                children: sortedChildren
                    .map(childId => buildTreeNode(childId, level + 1, newVisited))
                    .filter(child => child !== null),
                isExpanded: level < 1 // 默认只展开第一层到第二层
            };
        };
        
        return rootNodes.map(node => buildTreeNode(node.id)).filter(node => node !== null);
    }
    
    /**
     * 渲染树形HTML
     */
    renderTreeHTML(treeData) {
        let html = '<div class="tree-container">';
        
        treeData.forEach(rootNode => {
            html += this.renderTreeNode(rootNode);
        });
        
        html += '</div>';
        return html;
    }
    
    /**
     * 渲染单个树形节点
     */
    renderTreeNode(nodeData) {
        const hasChildren = nodeData.children && nodeData.children.length > 0;
        const expandIcon = hasChildren ? (nodeData.isExpanded ? '▼' : '▶') : '';
        
        let html = `
            <div class="tree-node" data-level="${nodeData.level}" style="--tree-level: ${nodeData.level};" data-node-id="${nodeData.id}">
                <div class="tree-node-header">
                    <span class="tree-expand-icon" 
                          id="expand-${nodeData.id}"
                          ${hasChildren ? `onclick="toggleTreeNode('${nodeData.id}')"` : ''} 
                          ${hasChildren ? `title="展开/折叠子节点"` : ''}
                          style="${hasChildren ? 'cursor: pointer;' : 'visibility: hidden;'}">
                        ${expandIcon}
                    </span>
                    <input type="checkbox" 
                           id="node-${nodeData.id}" 
                           onchange="toggleFilterNode('${nodeData.id}')" 
                           checked 
                           title="选中/取消选中节点">
                    <span class="tree-node-label" 
                          title="点击查看节点详情并高亮: ${StringUtils.escapeHtml(nodeData.label)}" 
                          onclick="highlightNodeFromTree(event, '${nodeData.id}')">
                        ${StringUtils.escapeHtml(nodeData.label)}
                    </span>
                </div>
                <div class="tree-node-children ${nodeData.isExpanded ? 'expanded' : ''}" 
                     id="children-${nodeData.id}">
        `;
        
        if (hasChildren) {
            nodeData.children.forEach(child => {
                html += this.renderTreeNode(child);
            });
        }
        
        html += '</div></div>';
        return html;
    }
    
    /**
     * 切换节点选择状态
     */
    toggleNode(nodeId) {
        const checkbox = document.getElementById(`node-${nodeId}`);
        if (!checkbox) {
            return;
        }
        
        const wasEmpty = this.selectedNodeIds.size === 0;
        
        if (checkbox.checked) {
            this.selectedNodeIds.add(nodeId);
        } else {
            this.selectedNodeIds.delete(nodeId);
        }
        
        this.updateGraph();
        
        // 如果从空状态切换到有节点状态，自动适应视图
        if (wasEmpty && this.selectedNodeIds.size > 0 && window.AppState?.d3Graph) {
            setTimeout(() => {
                window.AppState.d3Graph.fit();
            }, 600);
        }
    }
    
    /**
     * 选中所有节点
     */
    selectAllNodes() {
        const wasEmpty = this.selectedNodeIds.size === 0;
        
        this.selectedNodeIds.clear();
        
        if (this.knowledgeGraphConfig?.nodes) {
            this.knowledgeGraphConfig.nodes.forEach(node => {
                this.selectedNodeIds.add(node.id);
                const checkbox = document.getElementById(`node-${node.id}`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        
        this.updateGraph();
        
        // 如果之前是空的，现在选择全部，自动适应最佳视图
        if (wasEmpty && window.AppState?.d3Graph) {
            setTimeout(() => {
                window.AppState.d3Graph.fit();
                setTimeout(() => {
                    showTempMessage('视图已优化完成', AppConfig.MESSAGE_TYPES.SUCCESS);
                }, 750);
            }, 800);
        }
    }
    
    /**
     * 取消选中所有节点
     */
    deselectAllNodes() {
        this.selectedNodeIds.clear();
        
        if (this.knowledgeGraphConfig?.nodes) {
            this.knowledgeGraphConfig.nodes.forEach(node => {
                const checkbox = document.getElementById(`node-${node.id}`);
                if (checkbox) {
                    checkbox.checked = false;
                }
            });
        }
        
        this.updateGraph();
    }
    
    /**
     * 更新图形显示
     */
    updateGraph() {
        if (window.AppState?.d3Graph) {
            const d3Graph = window.AppState.d3Graph;
            
            // 筛选节点
            if (ValidationUtils.isFunction(d3Graph.filterNodesBySelection)) {
                d3Graph.filterNodesBySelection(this.selectedNodeIds);
            }
            
            // 重新稳定并适应视图
            setTimeout(() => {
                if (d3Graph.simulation) {
                    // 重新启动力模拟
                    d3Graph.simulation.alpha(0.3).restart();
                }
                
                // 延迟执行视图适应
                setTimeout(() => {
                    if (ValidationUtils.isFunction(d3Graph.fit)) {
                        d3Graph.fit();
                    }
                }, 800);
            }, 100);
        }
    }
    
    /**
     * 展开树形节点
     */
    expandTreeNode(nodeId) {
        const childrenContainer = document.getElementById(`children-${nodeId}`);
        const expandIcon = document.getElementById(`expand-${nodeId}`);
        
        if (childrenContainer) {
            childrenContainer.classList.add('expanded');
            
            if (expandIcon) {
                expandIcon.textContent = '▼';
            }
        }
    }
    
    /**
     * 折叠树形节点
     */
    collapseTreeNode(nodeId) {
        const childrenContainer = document.getElementById(`children-${nodeId}`);
        const expandIcon = document.getElementById(`expand-${nodeId}`);
        
        if (childrenContainer) {
            childrenContainer.classList.remove('expanded');
            
            if (expandIcon) {
                expandIcon.textContent = '▶';
            }
        }
    }
    
    /**
     * 切换树形节点展开/折叠状态
     */
    toggleTreeNode(nodeId) {
        const childrenContainer = document.getElementById(`children-${nodeId}`);
        
        if (childrenContainer) {
            const isExpanded = childrenContainer.classList.contains('expanded');
            
            if (isExpanded) {
                this.collapseTreeNode(nodeId);
            } else {
                this.expandTreeNode(nodeId);
            }
            
            // 动态调整侧边栏宽度
            this.adjustSidebarWidth();
        }
    }
    
    /**
     * 计算树形内容所需宽度
     */
    calculateRequiredWidth() {
        const treeContainer = document.querySelector('.tree-container');
        if (!treeContainer) return 240; // 默认最小宽度
        
        let maxWidth = 240; // 基础最小宽度
        const baseIndent = 48; // 基础边距(包含.filters的28px + .tree-container的16px + 额外边距4px)
        const levelIndent = 12; // 每级缩进
        const iconWidth = 16; // 图标宽度
        const checkboxWidth = 20; // 复选框宽度
        
        // 遍历所有可见的树形节点
        const visibleNodes = treeContainer.querySelectorAll('.tree-node-header');
        visibleNodes.forEach(header => {
            // 检查节点是否在展开的容器中
            let isVisible = true;
            let parent = header.parentElement;
            while (parent && parent !== treeContainer) {
                if (parent.classList.contains('tree-node-children') && 
                    !parent.classList.contains('expanded')) {
                    isVisible = false;
                    break;
                }
                parent = parent.parentElement;
            }
            
            if (isVisible) {
                const level = parseInt(header.closest('.tree-node').dataset.level) || 0;
                const labelElement = header.querySelector('.tree-node-label');
                
                if (labelElement) {
                    // 创建临时元素计算文本宽度
                    const tempSpan = document.createElement('span');
                    tempSpan.style.visibility = 'hidden';
                    tempSpan.style.position = 'absolute';
                    tempSpan.style.fontSize = '12px';
                    tempSpan.style.fontWeight = '500';
                    tempSpan.style.whiteSpace = 'nowrap';
                    tempSpan.textContent = labelElement.textContent;
                    
                    document.body.appendChild(tempSpan);
                    const textWidth = tempSpan.offsetWidth;
                    document.body.removeChild(tempSpan);
                    
                    // 计算该节点所需的总宽度
                    const nodeWidth = baseIndent + 
                                    (level * levelIndent) + 
                                    iconWidth + 
                                    checkboxWidth + 
                                    textWidth + 
                                    8; // 额外的安全边距
                    
                    maxWidth = Math.max(maxWidth, nodeWidth);
                }
            }
        });
        
        // 限制在合理范围内
        return Math.min(Math.max(maxWidth, 240), 400);
    }
    
    /**
     * 调整侧边栏宽度
     */
    adjustSidebarWidth() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        const requiredWidth = this.calculateRequiredWidth();
        const currentWidth = parseInt(sidebar.style.width) || 240;
        
        // 只有宽度真正改变时才调整
        if (Math.abs(requiredWidth - currentWidth) > 5) {
            // 设置新宽度
            sidebar.style.width = `${requiredWidth}px`;
            
            // 延迟触发图形重新计算尺寸
            setTimeout(() => {
                if (window.AppState?.d3Graph?.resize) {
                    window.AppState.d3Graph.resize();
                }
            }, 350); // 等待CSS transition完成
        }
    }
    
    /**
     * 获取选中节点数量
     */
    getSelectedCount() {
        return this.selectedNodeIds.size;
    }
    
    /**
     * 获取所有节点数量
     */
    getTotalCount() {
        return this.knowledgeGraphConfig?.nodes?.length || 0;
    }
    
    /**
     * 检查节点是否被选中
     */
    isNodeSelected(nodeId) {
        return this.selectedNodeIds.has(nodeId);
    }
    
    /**
     * 获取选中的节点ID列表
     */
    getSelectedNodeIds() {
        return Array.from(this.selectedNodeIds);
    }
}

// 全局函数：供HTML调用的筛选器相关函数
function toggleFilterNode(nodeId) {
    if (window.AppState?.filterManager) {
        window.AppState.filterManager.toggleNode(nodeId);
    } else if (window.filterManager) {
        window.filterManager.toggleNode(nodeId);
    }
}

function toggleTreeNode(nodeId) {
    if (window.AppState?.filterManager) {
        window.AppState.filterManager.toggleTreeNode(nodeId);
    } else if (window.filterManager) {
        window.filterManager.toggleTreeNode(nodeId);
    } else {
        // 兼容性处理：直接操作DOM
        UIController.toggleTreeNode(nodeId);
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FilterManager;
} else {
    window.FilterManager = FilterManager;
} 