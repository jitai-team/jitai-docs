/**
 * 知识图谱主控制器
 * 负责协调各模块，处理业务逻辑
 */

// ===== 全局状态管理 =====
const AppState = {
    // 数据
    knowledgeGraphConfig: null,
    isInitialized: false,
    
    // 组件实例
    d3Graph: null,
    filterManager: null,
    
    // 常量
    HIERARCHICAL_RELATIONS: ['包含', '支持', '管理']
};

// ===== 数据加载器 =====
class DataLoader {
    static async loadKnowledgeGraphData() {
        try {
            showTempMessage('正在加载数据...', 'info');
            
            const response = await fetch('assets/data/graph-data.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const neo4jData = await response.json();
            
            if (!neo4jData.entities || !neo4jData.relations) {
                throw new Error('数据格式不正确：缺少必要字段 entities 或 relations');
            }
            
            // 转换Neo4j格式为应用格式
            const data = this.transformNeo4jData(neo4jData);
            return data;
            
        } catch (error) {
            console.error('加载知识图谱数据失败:', error);
            showTempMessage(`数据加载失败: ${error.message}`, 'error');
            return { nodes: [], edges: [], nodeDetails: {} };
        }
    }
    
    static transformNeo4jData(neo4jData) {
        // 转换节点格式：从Neo4j entities格式转为应用格式
        const nodes = neo4jData.entities.map(entity => ({
            id: entity.name,
            label: entity.name,
            type: entity.type
        }));
        
        // 转换关系格式：从Neo4j relations格式转为应用格式
        const edges = neo4jData.relations.map(relation => ({
            from: relation.source,
            to: relation.target,
            label: relation.relationType
        }));
        
        // 构建节点详情对象：使用observations作为节点详情
        const nodeDetails = {};
        neo4jData.entities.forEach(entity => {
            if (entity.observations && entity.observations.length > 0) {
                nodeDetails[entity.name] = {
                    type: entity.type,
                    observations: entity.observations
                };
            }
        });
        
        return {
            nodes,
            edges,
            nodeDetails
        };
    }
    

}

// ===== 筛选器管理器 =====
class FilterManager {
    constructor() {
        this.selectedNodeIds = new Set();
    }
    
    init(knowledgeGraphConfig) {
        this.knowledgeGraphConfig = knowledgeGraphConfig;
        this.buildTreeFilter();
        
        // 先清空，然后选中所有节点（确保状态正确）
        this.selectedNodeIds.clear();
        this.selectAllNodes(); // 默认选中所有节点
    }
    
    buildTreeFilter() {
        const filterContainer = document.getElementById('filterContainer');
        if (!filterContainer || !this.knowledgeGraphConfig.nodes) {
            console.warn('无法初始化过滤器：缺少数据或容器');
        return;
    }
    
    // 构建父子关系映射
    const parentChildMap = {};
    const childParentMap = {};
    
        this.knowledgeGraphConfig.edges.forEach(edge => {
            if (AppState.HIERARCHICAL_RELATIONS.includes(edge.label)) {
            if (!parentChildMap[edge.from]) {
                parentChildMap[edge.from] = [];
            }
            parentChildMap[edge.from].push(edge.to);
            childParentMap[edge.to] = edge.from;
        }
    });
    
    // 找到根节点
        const rootNodes = this.knowledgeGraphConfig.nodes.filter(node => !childParentMap[node.id]);
        
        // 构建树形结构
        const buildTreeData = (nodeId, level = 0, visited = new Set()) => {
            const node = this.knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
            if (!node || visited.has(nodeId)) return null;
            
        const newVisited = new Set(visited);
        newVisited.add(nodeId);
        
        const children = parentChildMap[nodeId] || [];
        return {
            id: nodeId,
            label: node.label,
            level: level,
            children: children.map(childId => buildTreeData(childId, level + 1, newVisited)).filter(child => child !== null),
                isExpanded: level < 2
        };
        };
    
    const treeData = rootNodes.map(node => buildTreeData(node.id));
    
    // 渲染树形HTML
        const renderTreeNode = (nodeData) => {
        const hasChildren = nodeData.children.length > 0;
        const expandIcon = hasChildren ? (nodeData.isExpanded ? '▼' : '▶') : '';
        
                    let html = `
                <div class="tree-node" data-level="${nodeData.level}" style="--tree-level: ${nodeData.level};">
                    <div class="tree-node-header" ${hasChildren ? `onclick="toggleTreeNode('${nodeData.id}')"` : ''}>
                        <span class="tree-expand-icon" id="expand-${nodeData.id}">${expandIcon}</span>
                        <input type="checkbox" id="node-${nodeData.id}" onchange="toggleFilterNode('${nodeData.id}')" checked>
                        <label for="node-${nodeData.id}" class="tree-node-label" title="${nodeData.label}">${nodeData.label}</label>
                    </div>
                    <div class="tree-node-children ${nodeData.isExpanded ? 'expanded' : ''}" id="children-${nodeData.id}">
            `;
        
        nodeData.children.forEach(child => {
            html += renderTreeNode(child);
        });
        
            html += `</div></div>`;
        return html;
        };
    
    let filterHTML = '<div class="tree-container">';
    treeData.forEach(rootNode => {
            filterHTML += renderTreeNode(rootNode);
    });
    filterHTML += '</div>';
    
    filterContainer.innerHTML = filterHTML;
    }
    
    toggleNode(nodeId) {
        const checkbox = document.getElementById(`node-${nodeId}`);
        if (!checkbox) return;
        
        const wasEmpty = this.selectedNodeIds.size === 0;
        
        if (checkbox.checked) {
            this.selectedNodeIds.add(nodeId);
    } else {
            this.selectedNodeIds.delete(nodeId);
        }
        
        this.updateGraph();
        
        // 如果从空状态切换到有节点状态，自动适应视图
        if (wasEmpty && this.selectedNodeIds.size > 0 && AppState.d3Graph) {
    setTimeout(() => {
                AppState.d3Graph.fit();
            }, 600);
        }
    }
    
    selectAllNodes() {
        const wasEmpty = this.selectedNodeIds.size === 0;
        
        this.selectedNodeIds.clear();
        this.knowledgeGraphConfig.nodes.forEach(node => {
            this.selectedNodeIds.add(node.id);
            const checkbox = document.getElementById(`node-${node.id}`);
            if (checkbox) checkbox.checked = true;
        });
        
        this.updateGraph();
        
        // 如果之前是空的（全不选状态），现在选择全部，自动适应最佳视图
        if (wasEmpty && AppState.d3Graph) {
        setTimeout(() => {
                AppState.d3Graph.fit();
                setTimeout(() => {
                    showTempMessage('视图已优化完成', 'success');
                }, 750); // 等待fit动画完成后显示消息
            }, 800); // 给仿真一些时间重新布局
        }
    }
    
    deselectAllNodes() {
        this.selectedNodeIds.clear();
        this.knowledgeGraphConfig.nodes.forEach(node => {
            const checkbox = document.getElementById(`node-${node.id}`);
            if (checkbox) checkbox.checked = false;
        });
        this.updateGraph();
    }
    
    updateGraph() {
        if (AppState.d3Graph) {
            const previousCount = AppState.d3Graph.nodes.length;
            AppState.d3Graph.filterNodesBySelection(this.selectedNodeIds);
            const currentCount = this.selectedNodeIds.size;
            
            // 任何筛选操作后都自动重新稳定并进入最佳视图
            setTimeout(() => {
                if (AppState.d3Graph.simulation) {
                    // 重新启动力模拟以重新稳定布局
                    AppState.d3Graph.simulation
                        .alpha(0.3)
                        .restart();
                }
                
                // 延迟执行最佳视图适应
                setTimeout(() => {
                    AppState.d3Graph.fit();
                }, 800);
            }, 100);
        }
    }
}

// ===== 搜索管理器 =====
class SearchManager {
    static search(searchTerm) {
        if (!AppState.knowledgeGraphConfig || !searchTerm.trim()) {
            showTempMessage('请输入搜索关键词', 'warning');
            return;
        }
        
        const matchingNodes = AppState.knowledgeGraphConfig.nodes.filter(node =>
            node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (matchingNodes.length === 0) {
            showTempMessage('未找到匹配的节点', 'warning');
            return;
        }
        
        if (matchingNodes.length === 1) {
            const nodeId = matchingNodes[0].id;
            InfoPanel.showNodeInfo(nodeId);
            
            // 高亮节点及其直接连接的节点
            AppState.d3Graph.highlightNodeWithConnections(nodeId);
            
            // 以该节点为中心调整视图
    setTimeout(() => {
                AppState.d3Graph.focusOnNode(nodeId);
            }, 100); // 短暂延迟确保高亮效果先显示
            
    } else {
            InfoPanel.showSearchResults(matchingNodes);
        }
        
        showTempMessage(`找到 ${matchingNodes.length} 个匹配项`, 'success');
    }
}

// ===== 信息面板管理器 =====
class InfoPanel {
    static showNodeInfo(nodeId) {
        const node = AppState.knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        const relatedNodes = this.getRelatedNodes(nodeId);
        const nodeDetails = AppState.knowledgeGraphConfig.nodeDetails?.[nodeId] || {};
        
        let content = '';
        
        // 显示节点类型
        if (nodeDetails.type) {
            content += `<div class="node-labels">
                <span class="label-tag">${nodeDetails.type}</span>
            </div>`;
        }
        
        // 显示observations（作为节点的核心信息）
        if (nodeDetails.observations && nodeDetails.observations.length > 0) {
            content += '<div class="node-description">';
            nodeDetails.observations.forEach(obs => {
                content += `<div class="observation-item">• ${obs}</div>`;
            });
            content += '</div>';
        }
        
        // 显示关联节点
        if (relatedNodes.length > 0) {
            content += '<div class="related-nodes"><h4>关联节点</h4>';
            relatedNodes.forEach(rel => {
                content += `<div class="relation-item">
                    <a href="javascript:void(0)" onclick="InfoPanel.selectNode('${rel.node}')" class="node-link">
                        ${rel.node}
                    </a>
                    <span class="relation-type">${rel.relation}</span>
                </div>`;
            });
            content += '</div>';
        }
        
        if (!content.trim()) {
            content = '<div class="no-info">暂无详细信息</div>';
        }
        
        document.getElementById('infoTitle').textContent = node.label || node.id;
        document.getElementById('infoType').textContent = '节点详情';
        document.getElementById('infoContent').innerHTML = content;
        document.getElementById('infoPanel').classList.add('visible');
    }
    
    static showSearchResults(matchingNodes) {
        let content = '<div style="max-height: 300px; overflow-y: auto;">';
        content += '<h4>搜索结果：</h4><ul>';
        matchingNodes.forEach(node => {
            content += `<li><a href="javascript:void(0)" onclick="InfoPanel.selectNode('${node.id}')">${node.label}</a></li>`;
        });
        content += '</ul></div>';
        
        document.getElementById('infoTitle').textContent = '搜索结果';
        document.getElementById('infoType').textContent = `找到 ${matchingNodes.length} 个匹配项`;
        document.getElementById('infoContent').innerHTML = content;
        document.getElementById('infoPanel').classList.add('visible');
    }
    
    static selectNode(nodeId) {
        this.showNodeInfo(nodeId);
        
        // 高亮节点及其直接连接的节点
        AppState.d3Graph.highlightNodeWithConnections(nodeId);
        
        // 以该节点为中心调整视图
                setTimeout(() => {
            AppState.d3Graph.focusOnNode(nodeId);
                }, 100);
    }
    
    static hide() {
        document.getElementById('infoPanel').classList.remove('visible');
        AppState.d3Graph.resetHighlight();
    }
    
    static getRelatedNodes(nodeId) {
    const relatedNodes = [];
        AppState.knowledgeGraphConfig.edges.forEach(edge => {
        if (edge.from === nodeId) {
                relatedNodes.push({ node: edge.to, relation: edge.label });
        } else if (edge.to === nodeId) {
                relatedNodes.push({ node: edge.from, relation: `被${edge.label}` });
        }
    });
    return relatedNodes;
}
}

// ===== 界面控制器 =====
class UIController {
    static toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const floatingSearch = document.getElementById('floatingSearch');
        const collapseIcon = document.getElementById('collapseIcon');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            floatingSearch.classList.remove('visible');
            collapseIcon.textContent = '◁';
    } else {
            sidebar.classList.add('collapsed');
            floatingSearch.classList.add('visible');
            collapseIcon.textContent = '▷';
        }
    }
    
    static toggleTreeNode(nodeId) {
        const childrenContainer = document.getElementById(`children-${nodeId}`);
        const expandIcon = document.getElementById(`expand-${nodeId}`);
        
        if (childrenContainer.classList.contains('expanded')) {
            childrenContainer.classList.remove('expanded');
            expandIcon.textContent = '▶';
    } else {
            childrenContainer.classList.add('expanded');
            expandIcon.textContent = '▼';
        }
    }
    
    static expandAllLayers() {
        document.querySelectorAll('.tree-node-children').forEach(content => {
            content.classList.add('expanded');
        });
        document.querySelectorAll('.tree-expand-icon').forEach(icon => {
            if (icon.textContent === '▶') {
                icon.textContent = '▼';
        }
    });
}

    static collapseAllLayers() {
        document.querySelectorAll('.tree-node-children').forEach(content => {
            content.classList.remove('expanded');
        });
        document.querySelectorAll('.tree-expand-icon').forEach(icon => {
            if (icon.textContent === '▼') {
                icon.textContent = '▶';
        }
    });
}
}

// ===== 主应用类 =====
class KnowledgeGraphApp {
    async init() {
        try {
            console.log('🚀 开始初始化应用...');
            
            // 显示加载覆盖层
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) loadingOverlay.classList.remove('hidden');
            
            // 加载数据
            AppState.knowledgeGraphConfig = await DataLoader.loadKnowledgeGraphData();
            
            if (AppState.knowledgeGraphConfig.nodes.length === 0) {
                showTempMessage('没有可显示的数据', 'warning');
                return;
            }
            
            // 初始化D3图形
            const container = document.getElementById('network');
            AppState.d3Graph = new D3NetworkGraph(container);
            
            // 设置事件回调
            AppState.d3Graph.onNodeClick = (node) => {
                InfoPanel.showNodeInfo(node.id);
                
                // 高亮节点及其直接连接的节点
                AppState.d3Graph.highlightNodeWithConnections(node.id);
                
                // 以该节点为中心调整视图
            setTimeout(() => {
                    AppState.d3Graph.focusOnNode(node.id);
            }, 100);
            };
            
            AppState.d3Graph.onBackgroundClick = () => {
                InfoPanel.hide();
            };
            
            // 准备数据
            const nodes = AppState.knowledgeGraphConfig.nodes.map(node => ({
                id: node.id,
                label: node.label,
                size: 12
            }));
            
            const links = AppState.knowledgeGraphConfig.edges.map((edge, index) => ({
                id: `edge_${index}_${edge.from}_${edge.to}`,
                source: edge.from,
                target: edge.to,
                label: edge.label
            }));
            
            // 设置完整数据
            AppState.d3Graph.setFullData(nodes, links);
            
            // 初始化筛选器
            AppState.filterManager = new FilterManager();
            AppState.filterManager.init(AppState.knowledgeGraphConfig);
            
            // 确保图形状态与筛选器同步
            AppState.filterManager.updateGraph();
            
            // 绑定事件
            this.bindEvents();
            
            // 窗口大小改变事件
            window.addEventListener('resize', () => {
                AppState.d3Graph.resize();
            });
            
            // 隐藏加载覆盖层
            setTimeout(() => {
                if (loadingOverlay) loadingOverlay.classList.add('hidden');
                AppState.isInitialized = true;
                console.log('✅ 应用初始化完成');
                showTempMessage('知识图谱加载完成', 'success');
            }, 1000);
            
            // 自动适应视图
        setTimeout(() => {
                AppState.d3Graph.fit();
            }, 2000);
        
    } catch (error) {
            console.error('应用初始化失败:', error);
            showTempMessage('应用初始化失败', 'error');
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) loadingOverlay.classList.add('hidden');
        }
    }
    
    bindEvents() {
        // 搜索框事件
        const searchInput = document.getElementById('nodeSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
                    SearchManager.search(searchInput.value);
        }
    });
        }
    
        const floatingSearchInput = document.getElementById('floatingSearchInput');
        if (floatingSearchInput) {
            floatingSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
                    SearchManager.search(floatingSearchInput.value);
                    // 同步到主搜索框
                    if (searchInput) searchInput.value = floatingSearchInput.value;
                }
            });
        }
    }
}

// ===== 全局函数（供HTML调用） =====
function searchAndHighlightNode() {
    const searchInput = document.getElementById('nodeSearchInput');
    if (searchInput) {
        SearchManager.search(searchInput.value);
    }
}

function searchFromFloating() {
    const floatingInput = document.getElementById('floatingSearchInput');
    if (floatingInput) {
        SearchManager.search(floatingInput.value);
        // 同步到主搜索框
        const mainInput = document.getElementById('nodeSearchInput');
        if (mainInput) mainInput.value = floatingInput.value;
    }
}

function restabilizeNetwork() {
    if (AppState.d3Graph) {
        AppState.d3Graph.restabilize();
        showTempMessage('重新稳定化中...', 'info');
    }
}

function optimizeView() {
    if (AppState.d3Graph) {
        AppState.d3Graph.fit();
        
        // 获取并显示当前视图策略
        const strategy = AppState.d3Graph.getViewStrategy();
        const message = `视图已优化：${strategy.description} (${strategy.nodeCount}个节点)`;
        showTempMessage(message, 'success');
    }
}

function showAllNodes() {
    if (AppState.d3Graph) {
        AppState.d3Graph.fitAll();
        showTempMessage('显示所有节点（传统视图）', 'info');
    }
}

function selectAllFilters() {
    if (AppState.filterManager) {
        const wasEmpty = AppState.filterManager.selectedNodeIds.size === 0;
        AppState.filterManager.selectAllNodes();
        
        if (wasEmpty) {
            showTempMessage('已选择所有节点，正在优化视图...', 'info');
        } else {
            showTempMessage('已选择所有节点', 'success');
        }
    }
}

function deselectAllFilters() {
    if (AppState.filterManager) {
        AppState.filterManager.deselectAllNodes();
        showTempMessage('已取消选择所有节点', 'success');
    }
}

function expandAllLayers() {
    UIController.expandAllLayers();
}

function collapseAllLayers() {
    UIController.collapseAllLayers();
}

function toggleSidebar() {
    UIController.toggleSidebar();
}

function toggleTreeNode(nodeId) {
    UIController.toggleTreeNode(nodeId);
}

function hideInfoPanel() {
    InfoPanel.hide();
}

// 安全的节点切换函数（供HTML调用）
function toggleFilterNode(nodeId) {
    if (AppState.filterManager) {
        AppState.filterManager.toggleNode(nodeId);
    } else if (window.filterManager) {
        window.filterManager.toggleNode(nodeId);
    } else {
        console.warn('筛选器管理器尚未初始化');
    }
}

// 全局变量供HTML调用（向后兼容）
let filterManager = null;

// 显示临时消息
function showTempMessage(message, type = 'info') {
    const messageEl = document.getElementById('tempMessage');
    if (!messageEl) return;
    
    messageEl.classList.remove('warning', 'error', 'success', 'show');
    messageEl.textContent = message;
    
    if (type !== 'info') {
        messageEl.classList.add(type);
    }
    
    setTimeout(() => messageEl.classList.add('show'), 50);
    setTimeout(() => messageEl.classList.remove('show'), 3000);
}

// ===== 应用启动 =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM 加载完成，启动应用...');
    const app = new KnowledgeGraphApp();
    
    // 设置全局引用供HTML调用
    window.filterManager = AppState.filterManager;
    filterManager = AppState.filterManager;
    
    app.init().catch(error => {
        console.error('❌ 应用启动失败:', error);
    });
});

// ===== 调试工具 =====
window.AppState = AppState;
window.checkStatus = () => {
    console.log('应用状态:', {
        isInitialized: AppState.isInitialized,
        hasData: !!AppState.knowledgeGraphConfig,
        hasGraph: !!AppState.d3Graph,
        hasFilter: !!AppState.filterManager,
        nodeCount: AppState.knowledgeGraphConfig?.nodes?.length || 0
    });
};