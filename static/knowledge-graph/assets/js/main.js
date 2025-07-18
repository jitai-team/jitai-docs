// 全局变量
let knowledgeGraphConfig = null;
let network;
let nodes, edges;
let allNodes, allEdges;

// 定义层级关系类型（与"包含"等价的关系）
// 这些关系类型在树形筛选器中会被视为父子关系，用于构建层级结构
// 注意：由于支持多种关系类型，可能存在循环关系（如 A→B→C→A）
// 因此在buildTreeData函数中实现了循环检测机制防止死循环
const HIERARCHICAL_RELATIONS = ['包含', '支持', '管理'];

// 自适应布局管理器
class AdaptiveLayoutManager {
    constructor() {
        this.maxDepth = 0;
        this.sidebarWidth = 350; // 默认宽度
        this.defaultSidebarWidth = 350; // 保存默认宽度，用于恢复
        this.baseIndent = 8;
        this.minIndentIncrement = 4;
        this.maxIndentIncrement = 20;
        this.displayMode = 'normal'; // normal, compact, ultra-compact
        this.textMode = 'truncated'; // truncated, wrapped
    }

    // 分析数据结构
    analyzeDataStructure(treeData) {
        this.maxDepth = this.calculateMaxDepth(treeData);
        // 检测到最大层级深度
    }

    // 递归计算最大深度
    calculateMaxDepth(nodes) {
        let maxDepth = 0;
        const traverse = (nodeList, currentDepth = 0) => {
            nodeList.forEach(node => {
                maxDepth = Math.max(maxDepth, currentDepth);
                if (node.children && node.children.length > 0) {
                    traverse(node.children, currentDepth + 1);
                }
            });
        };
        traverse(nodes);
        return maxDepth;
    }

    // 更新侧边栏宽度
    updateSidebarWidth(width) {
        this.sidebarWidth = width;
        this.recalculateLayout();
    }

    // 计算自适应缩进策略
    calculateAdaptiveIndent() {
        const availableWidth = this.sidebarWidth - 100; // 预留100px给其他元素
        const totalLevels = this.maxDepth + 1;
        
        if (totalLevels <= 1) {
            return { baseIndent: this.baseIndent, increment: this.maxIndentIncrement };
        }

        // 计算理想的缩进增量
        const idealTotalIndent = availableWidth * 0.7; // 使用70%的可用宽度
        let increment = Math.floor(idealTotalIndent / totalLevels);
        
        // 限制增量范围
        increment = Math.max(this.minIndentIncrement, Math.min(this.maxIndentIncrement, increment));
        
        // 如果计算出的总宽度仍然超出，则进入压缩模式
        const projectedTotalWidth = this.baseIndent + (totalLevels * increment);
        
        let mode = 'normal';
        if (projectedTotalWidth > availableWidth * 0.8) {
            mode = 'compact';
            increment = Math.max(this.minIndentIncrement, increment * 0.7);
        }
        
        if (projectedTotalWidth > availableWidth * 0.9) {
            mode = 'ultra-compact';
            increment = this.minIndentIncrement;
        }

        return { 
            baseIndent: this.baseIndent, 
            increment, 
            mode,
            totalLevels,
            projectedWidth: projectedTotalWidth
        };
    }

    // 应用自适应布局
    applyAdaptiveLayout() {
        const layout = this.calculateAdaptiveIndent();
        const sidebar = document.getElementById('sidebar');
        
        // 如果是手动设置的模式，优先使用手动模式
        const effectiveMode = this.displayMode !== 'normal' ? this.displayMode : layout.mode;
        
        // 更新显示模式
        this.updateDisplayMode(effectiveMode);
        
        // 重新计算布局（如果是手动模式，调整increment）
        if (this.displayMode === 'compact') {
            layout.increment = Math.max(this.minIndentIncrement, layout.increment * 0.7);
        } else if (this.displayMode === 'ultra-compact') {
            layout.increment = this.minIndentIncrement;
        }
        
        // 应用缩进样式
        this.applyIndentStyles(layout);
        
        // 应用深层级连接线
        this.applyDeepLevelConnections(layout);
        
        // 应用自适应布局
    }

    // 更新显示模式
    updateDisplayMode(mode) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('adaptive-compact', 'adaptive-ultra-compact');
        
        if (mode === 'compact') {
            sidebar.classList.add('adaptive-compact');
        } else if (mode === 'ultra-compact') {
            sidebar.classList.add('adaptive-ultra-compact');
        }
        
        this.displayMode = mode;
    }

    // 手动设置显示模式
    setDisplayMode(mode) {
        this.displayMode = mode;
        this.applyAdaptiveLayout();
    }

    // 应用缩进样式
    applyIndentStyles(layout) {
        // 移除现有的样式
        const existingStyle = document.getElementById('adaptive-indent-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        // 创建新的样式规则
        const styleSheet = document.createElement('style');
        styleSheet.id = 'adaptive-indent-styles';
        let css = '';

        for (let level = 0; level <= this.maxDepth; level++) {
            const indent = layout.baseIndent + (level * layout.increment);
            css += `.tree-node[data-level="${level}"] { margin-left: ${indent}px; }\n`;
            
            // 为深层级添加连接线类
            if (level > Math.floor(this.maxDepth * 0.6)) {
                css += `.tree-node[data-level="${level}"] { }\n`;
                css += `.tree-node[data-level="${level}"].deep-level::before { left: ${-8}px; }\n`;
            }
        }

        styleSheet.textContent = css;
        document.head.appendChild(styleSheet);
    }



    // 应用深层级连接线
    applyDeepLevelConnections(layout) {
        const deepLevelThreshold = Math.floor(this.maxDepth * 0.6);
        document.querySelectorAll('.tree-node').forEach(node => {
            const level = parseInt(node.getAttribute('data-level'));
            if (level > deepLevelThreshold) {
                node.classList.add('deep-level');
            } else {
                node.classList.remove('deep-level');
            }
        });
    }

    // 重新计算布局
    recalculateLayout() {
        if (this.maxDepth > 0) {
            this.applyAdaptiveLayout();
        }
    }

    // 智能文本处理
    calculateOptimalTextLength() {
        // 如果侧边栏宽度太小（折叠状态），使用默认长度
        if (this.sidebarWidth < 100) {
            return 15; // 折叠状态下的默认长度
        }
        
        const layout = this.calculateAdaptiveIndent();
        const availableTextWidth = this.sidebarWidth - layout.projectedWidth - 60; // 预留60px给图标和数字
        
        // 根据可用宽度计算最优文本长度
        const charWidth = 8; // 估算每个字符的宽度
        const optimalLength = Math.max(8, Math.floor(availableTextWidth / charWidth));
        
        return Math.min(25, optimalLength); // 最大不超过25个字符
    }

    // 自适应文本显示
    applyAdaptiveTextDisplay() {
        const optimalLength = this.calculateOptimalTextLength();
        
        document.querySelectorAll('.tree-node-label').forEach(label => {
            const originalText = label.getAttribute('title')?.split(' (双击')[0] || label.textContent;
            
            if (this.textMode === 'truncated' && originalText.length > optimalLength) {
                label.textContent = originalText.substring(0, optimalLength) + '...';
                label.classList.remove('wrapped');
            } else {
                label.textContent = originalText;
                if (this.textMode === 'wrapped') {
                    label.classList.add('wrapped');
                }
            }
        });
    }

    // 获取当前状态信息
    getStatusInfo() {
        const layout = this.calculateAdaptiveIndent();
        return {
            maxDepth: this.maxDepth,
            sidebarWidth: this.sidebarWidth,
            displayMode: this.displayMode,
            textMode: this.textMode,
            increment: layout.increment,
            projectedWidth: layout.projectedWidth,
            optimalTextLength: this.calculateOptimalTextLength()
        };
    }
}

// 创建全局布局管理器实例
const layoutManager = new AdaptiveLayoutManager();

// 动态尺寸计算器
class SizeCalculator {
    constructor() {
        this.containerRect = null;
        this.nodeCount = 0;
        this.baseSize = 20;
        this.maxSize = 100;
        this.minSize = 15;
    }

    updateContext(containerRect, nodeCount) {
        this.containerRect = containerRect;
        this.nodeCount = nodeCount;
    }

    // 基于节点重要性的基础尺寸
    getBaseSize() {
        return this.baseSize;
    }

    // Neo4j Browser风格：基于度中心性的智能节点大小计算
    getImportanceFactor(nodeId) {
        let inDegree = 0;
        let outDegree = 0;
        
        knowledgeGraphConfig.edges.forEach(edge => {
            if (edge.to === nodeId) inDegree++;
            if (edge.from === nodeId) outDegree++;
        });
        
        const totalDegree = inDegree + outDegree;
        
        // 使用对数缩放，避免极端大小差异（Neo4j Browser的做法）
        if (totalDegree === 0) return 0.8; // 孤立节点略小
        
        // 对数缩放：log(degree + 1) * 0.3 + 0.7，范围约在 0.7-1.6 之间
        const logFactor = Math.log(totalDegree + 1) * 0.25 + 0.75;
        
        // 限制在合理范围内，避免过度放大
        return Math.min(1.8, Math.max(0.7, logFactor));
    }

    // 基于屏幕尺寸的自适应因子
    getScreenAdaptiveFactor() {
        if (!this.containerRect) return 1.0;
        
        const screenArea = this.containerRect.width * this.containerRect.height;
        const standardArea = 1200 * 800; // 标准参考尺寸
        
        let factor = Math.sqrt(screenArea / standardArea);
        factor = Math.max(0.7, Math.min(1.5, factor)); // 限制在合理范围
        
        return factor;
    }

    // 基于节点密度的密度因子
    getDensityFactor() {
        if (this.nodeCount <= 10) return 1.2;      // 少量节点：放大
        if (this.nodeCount <= 30) return 1.0;      // 中等节点：标准
        if (this.nodeCount <= 50) return 0.9;      // 较多节点：略小
        return 0.8;                                 // 大量节点：更小
    }

    // 计算节点的最终尺寸
    calculateNodeSize(node) {
        const baseSize = this.getBaseSize();
        const importanceFactor = this.getImportanceFactor(node.id);
        const screenFactor = this.getScreenAdaptiveFactor();
        const densityFactor = this.getDensityFactor();
        
        let finalSize = baseSize * importanceFactor * screenFactor * densityFactor;
        
        // 确保在合理范围内
        finalSize = Math.max(this.minSize, Math.min(this.maxSize, finalSize));
        
        return Math.round(finalSize);
    }

    // 批量计算所有节点尺寸
    calculateAllNodeSizes(nodes) {
        return nodes.map(node => ({
            ...node,
            size: this.calculateNodeSize(node)
        }));
    }
}

// 数据加载器
class DataLoader {
    static async loadKnowledgeGraphData() {
        try {
            showTempMessage('正在加载数据...', 'info');
            
            const response = await fetch('assets/data/graph-data.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // 验证数据结构
            if (!data.nodes || !data.edges) {
                throw new Error('数据格式不正确：缺少必要字段');
            }
            
            return data;
            
        } catch (error) {
            console.error('加载知识图谱数据失败:', error);
            showTempMessage(`数据加载失败: ${error.message}`, 'error');
            
            // 返回空的默认数据，避免程序崩溃
            return {
                nodes: [],
                edges: [],
                nodeDetails: {}
            };
        }
    }
}

// 初始化网络
async function initNetwork() {
    try {
        // 显示加载覆盖层
        document.getElementById('loadingOverlay').classList.remove('hidden');
        
        // 加载数据
        knowledgeGraphConfig = await DataLoader.loadKnowledgeGraphData();
        
        if (knowledgeGraphConfig.nodes.length === 0) {
            showTempMessage('没有可显示的数据', 'warning');
            return;
        }
        
        const container = document.getElementById('network');
        const containerRect = container.getBoundingClientRect();
        
        // 初始化尺寸计算器
        const sizeCalculator = new SizeCalculator();
        sizeCalculator.updateContext(containerRect, knowledgeGraphConfig.nodes.length);
        
        // 计算自适应尺寸
        const nodesWithSize = sizeCalculator.calculateAllNodeSizes(knowledgeGraphConfig.nodes);
        
        // 创建数据集 - Neo4j Browser风格的视觉效果
        allNodes = new vis.DataSet(nodesWithSize.map(node => ({
            id: node.id,
            label: node.label,
            size: node.size,
            color: {
                // 蓝色系配色方案
                background: '#68B3E8', // 柔和的蓝色
                border: '#4A90B8', // 深蓝色边框
                highlight: {
                    background: '#5A9FD4', // 高亮时稍深的蓝色
                    border: '#3D7BA8' // 深蓝色高亮边框
                },
                hover: {
                    background: '#7BC3F0', // 悬停时稍亮的蓝色
                    border: '#5FA0C8'
                }
            },
            font: {
                color: '#2C3E50', // 深色文字，清晰可读
                size: Math.max(11, Math.min(18, Math.round(node.size * 0.35))), // 略小的字体
                face: 'Helvetica, Arial, sans-serif', // 更现代的字体
                strokeWidth: 0, // 去掉描边
                bold: true // 加粗提高可读性
            },
            borderWidth: 1, // 细边框
            borderWidthSelected: 1, // 选中时保持细线条
            shadow: {
                enabled: true, // 启用阴影效果
                color: 'rgba(0,0,0,0.15)',
                size: 8,
                x: 2,
                y: 2
            },
            smooth: {
                enabled: true,
                type: 'continuous'
            }
        })));

        allEdges = new vis.DataSet(knowledgeGraphConfig.edges.map((edge, index) => ({
            id: `edge_${index}_${edge.from}_${edge.to}`,
            from: edge.from,
            to: edge.to,
            label: edge.label,
            color: {
                color: 'rgba(120, 120, 120, 0.6)', // 半透明灰色，更柔和
                highlight: '#FF6B35', // 暖色调高亮
                hover: 'rgba(120, 120, 120, 0.8)' // 悬停时稍深
            },
            font: {
                color: '#555555', // 稍深的灰色文字
                size: 11, // 稍小的边标签字体
                face: 'Helvetica, Arial, sans-serif',
                strokeWidth: 1.5,
                strokeColor: 'rgba(255,255,255,0.8)', // 半透明白色描边
                background: 'rgba(255,255,255,0.7)', // 标签背景
                align: 'middle'
            },
            arrows: {
                to: {
                    enabled: true, 
                    scaleFactor: 0.4, // 更细的箭头，更精致
                    type: 'arrow'
                }
            },
            smooth: {
                enabled: true,
                type: 'curvedCW', // Neo4j风格的弯曲边
                roundness: 0.15 // 适度的弯曲
            },
            width: 1.5, // 稍细的边线
            selectionWidth: 2, // 选中时保持细线
            hoverWidth: 1.8, // 悬停时稍粗
            chosen: {
                edge: function(values, id, selected, hovering) {
                    if (selected) {
                        // 选中时的静态样式
                        values.dashes = [6, 3]; // 虚线模式：6px实线，3px空隙
                        values.width = 2;
                        values.color = '#FF6B35'; // 橙色高亮
                    } else {
                        values.dashes = false; // 取消虚线
                        values.width = 1.5;
                        values.color = 'rgba(102, 102, 102, 0.6)';
                    }
                }
            }
        })));

        nodes = new vis.DataSet(allNodes.get());
        edges = new vis.DataSet(allEdges.get());

        const data = { nodes: nodes, edges: edges };

        // 修复的vis-network配置选项
        const options = {
            physics: {
                enabled: true,
                stabilization: {
                    enabled: true,
                    iterations: 200,
                    updateInterval: 20,
                    onlyDynamicEdges: false,
                    fit: true
                },
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    gravitationalConstant: -800,
                    centralGravity: 0.03,
                    springLength: Math.max(80, containerRect.width / 15),
                    springConstant: 0.04,
                    damping: 0.95,
                    avoidOverlap: 0.9
                }
            },
            layout: {
                hierarchical: {
                    enabled: false
                }
            },
            interaction: {
                hover: true,
                hoverConnectedEdges: true,
                selectConnectedEdges: false,
                tooltipDelay: 200,
                zoomView: true,
                dragView: true,
                dragNodes: true,
                multiselect: true,
                zoomSpeed: 1
            },
            nodes: {
                shape: 'dot', // Neo4j使用圆形节点
                shapeProperties: {
                    useBorderWithImage: true
                },
                scaling: {
                    min: sizeCalculator.minSize,
                    max: sizeCalculator.maxSize,
                    label: {
                        enabled: true,
                        min: 8, // 更小的最小字体
                        max: 20, // 适中的最大字体
                        maxVisible: 30, // 适度显示标签
                        drawThreshold: 2 // 更早显示标签
                    }
                },
                chosen: {
                    node: function(values, id, selected, hovering) {
                        if (selected) {
                            values.borderWidth = 1; // 选中时保持细线条
                            values.shadow = true;
                            values.shadowSize = 10;
                        } else {
                            values.borderWidth = 1;
                        }
                    }
                },
                fixed: {
                    x: false,
                    y: false
                },
                // Neo4j风格的节点物理属性
                mass: 1,
                physics: true
            },
            edges: {
                width: 1.5, // Neo4j风格的细边线
                selectionWidth: 3,
                hoverWidth: 2,
                chosen: {
                    edge: function(values, id, selected, hovering) {
                        if (selected) {
                            values.width = 3;
                            values.color = '#FF6B35';
                        } else if (hovering) {
                            values.width = 2;
                        }
                    }
                },
                // Neo4j风格的边渲染
                smooth: {
                    enabled: true,
                    type: 'curvedCW',
                    forceDirection: 'none',
                    roundness: 0.15
                },
                physics: true,
                endPointOffset: {
                    from: 0,
                    to: 0
                }
            }
        };

        // 创建网络
        network = new vis.Network(container, data, options);

        // 添加事件监听器
        setupNetworkEvents();

        // 设置粒子流动动画
        setupParticleAnimation();

        // 初始化树形过滤器
        initFilters();
        
        // 隐藏加载覆盖层
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 1000);
        
        // 自动优化布局
        setTimeout(() => {
            network.fit({
                animation: {
                    duration: 1000,
                    easingFunction: 'easeInOutQuad'
                }
            });
        }, 2000);
        
    } catch (error) {
        console.error('初始化网络失败:', error);
        showTempMessage('网络初始化失败', 'error');
        document.getElementById('loadingOverlay').classList.add('hidden');
    }
}

// 设置网络事件监听器
function setupNetworkEvents() {
    // 拖拽优化
    network.on('dragStart', function(params) {
        if (params.nodes.length > 0) {
            const selectedNodes = nodes.get(params.nodes);
            selectedNodes.forEach(node => {
                nodes.update({
                    id: node.id,
                    fixed: { x: false, y: false },
                    physics: true
                });
            });
        }
    });

    network.on('dragEnd', function(params) {
        setTimeout(() => {
            network.setOptions({
                physics: { enabled: true }
            });
            
            setTimeout(() => {
                network.setOptions({
                    physics: { enabled: false }
                });
            }, 800);
        }, 100);
    });

    // 点击事件 - 添加防抖逻辑避免重复触发
    let lastClickTime = 0;
    let lastClickedNode = null;
    
    network.on('click', function(params) {
        const currentTime = Date.now();
        
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            
            // 防抖：如果是同一个节点在短时间内重复点击，忽略
            if (lastClickedNode === nodeId && currentTime - lastClickTime < 500) {
                return;
            }
            
            lastClickedNode = nodeId;
            lastClickTime = currentTime;
            // 进入最佳视图模式
            enterOptimalView(nodeId);
        } else {
            // 防抖：避免节点点击后立即触发空白点击
            if (lastClickedNode && currentTime - lastClickTime < 300) {
                return;
            }
            
            lastClickedNode = null;
            lastClickTime = currentTime;
            // 点击空白处只取消高亮和隐藏信息面板
            hideInfoPanel();
            resetHighlight();
        }
    });

    // 鼠标悬停
    network.on('hoverNode', function(params) {
        network.canvas.body.container.style.cursor = 'pointer';
    });

    network.on('blurNode', function(params) {
        network.canvas.body.container.style.cursor = 'default';
    });

    // 稳定化完成
    network.on('stabilizationIterationsDone', function() {
        setTimeout(() => {
            network.setOptions({
                physics: { enabled: false }
            });
        }, 1000);
    });

    // 窗口大小改变时重新计算尺寸
    window.addEventListener('resize', debounce(() => {
        if (knowledgeGraphConfig && knowledgeGraphConfig.nodes.length > 0) {
            updateNodeSizesForNewContainer();
        }
    }, 300));
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 更新节点尺寸以适应新的容器大小
function updateNodeSizesForNewContainer() {
    const container = document.getElementById('network');
    const containerRect = container.getBoundingClientRect();
    
    const sizeCalculator = new SizeCalculator();
    sizeCalculator.updateContext(containerRect, nodes.length);
    
    const currentNodes = allNodes.get();
    const updatedNodes = sizeCalculator.calculateAllNodeSizes(currentNodes);
    
    const updateData = updatedNodes.map(node => ({
        id: node.id,
        size: node.size,
        font: {
            ...allNodes.get(node.id).font,
            size: Math.max(12, Math.min(20, Math.round(node.size * 0.3)))
        }
    }));
    
    allNodes.update(updateData);
    nodes.update(updateData);
}

// 显示临时消息
function showTempMessage(message, type = 'info') {
    const messageEl = document.getElementById('tempMessage');
    
    messageEl.classList.remove('warning', 'error', 'success', 'show');
    
    messageEl.textContent = message;
    if (type !== 'info') {
        messageEl.classList.add(type);
    }
    
    setTimeout(() => {
        messageEl.classList.add('show');
    }, 50);
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

// 初始化树形过滤器
function initFilters() {
    if (!knowledgeGraphConfig || !knowledgeGraphConfig.nodes) {
        console.warn('无法初始化过滤器：缺少数据');
        return;
    }

    const filterContainer = document.getElementById('filterContainer');
    
    // 构建父子关系映射
    const parentChildMap = {};
    const childParentMap = {};
    
    knowledgeGraphConfig.edges.forEach(edge => {
        if (HIERARCHICAL_RELATIONS.includes(edge.label)) {
            if (!parentChildMap[edge.from]) {
                parentChildMap[edge.from] = [];
            }
            parentChildMap[edge.from].push(edge.to);
            childParentMap[edge.to] = edge.from;
        }
    });
    
    // 找到根节点
    const rootNodes = knowledgeGraphConfig.nodes.filter(node => !childParentMap[node.id]);
    
    // 构建树形结构（带循环检测）
    function buildTreeData(nodeId, level = 0, visited = new Set()) {
        const node = knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
        if (!node) return null;
        
        // 检测循环：如果当前节点已经在访问路径中，停止递归
        if (visited.has(nodeId)) {
            console.warn(`检测到循环关系，停止递归构建树形结构: ${nodeId}`);
            return {
                id: nodeId,
                label: node.label + ' (循环)',
                level: level,
                children: [], // 循环节点不展示子节点
                isExpanded: false,
                isCircular: true
            };
        }
        
        // 添加当前节点到访问路径
        const newVisited = new Set(visited);
        newVisited.add(nodeId);
        
        const children = parentChildMap[nodeId] || [];
        return {
            id: nodeId,
            label: node.label,
            level: level,
            children: children.map(childId => buildTreeData(childId, level + 1, newVisited)).filter(child => child !== null),
            isExpanded: level < 2,
            isCircular: false
        };
    }
    
    const treeData = rootNodes.map(node => buildTreeData(node.id));
    
    // 分析数据结构并应用自适应布局
    layoutManager.analyzeDataStructure(treeData);
    layoutManager.applyAdaptiveLayout();
    
    // 渲染树形HTML
    function renderTreeNode(nodeData, isRoot = false) {
        const hasChildren = nodeData.children.length > 0;
        const expandIcon = hasChildren ? (nodeData.isExpanded ? '▼' : '▶') : '';
        const nodeCount = hasChildren ? ` (${nodeData.children.length})` : '';
        
        // 生成层级指示器
        const levelIndicator = nodeData.level > 0 ? '<span class="level-indicator"></span>' : '';
        
        // 处理长文本的显示
        const fullLabel = nodeData.label;
        const optimalLength = layoutManager.calculateOptimalTextLength();
        const shortLabel = fullLabel.length > optimalLength ? fullLabel.substring(0, optimalLength) + '...' : fullLabel;
        const needsTooltip = fullLabel.length > optimalLength;
        
        // 添加循环节点的特殊样式
        const circularClass = nodeData.isCircular ? ' circular-node' : '';
        const circularIcon = nodeData.isCircular ? ' 🔄' : '';
        
        let html = `
            <div class="tree-node${circularClass}" data-level="${nodeData.level}">
                <div class="tree-node-header" ${hasChildren ? `onclick="toggleTreeNode('${nodeData.id}')"` : ''}>
                    <span class="tree-expand-icon" id="expand-${nodeData.id}">${expandIcon}</span>
                    <input type="checkbox" id="node-${nodeData.id}" onchange="toggleTreeNodeSelection('${nodeData.id}')" ${nodeData.isCircular ? 'disabled' : 'checked'}>
                    ${levelIndicator}
                    <label for="node-${nodeData.id}" class="tree-node-label" 
                        ${hasChildren && !nodeData.isCircular ? `ondblclick="event.stopPropagation(); cascadeSelectChildren('${nodeData.id}')"` : ''} 
                        ${needsTooltip ? `onmouseenter="showTooltip(event, '${fullLabel.replace(/'/g, "&#39;")}')" onmouseleave="hideTooltip()"` : ''}
                        title="${nodeData.isCircular ? fullLabel + ' (检测到循环关系)' : (hasChildren ? fullLabel + ' (双击可级联选择所有子节点)' : fullLabel)}"
                    >${shortLabel}${circularIcon}</label>
                    <span class="tree-node-count">${nodeCount}</span>
                </div>
                <div class="tree-node-children ${nodeData.isExpanded ? 'expanded' : ''}" id="children-${nodeData.id}">
        `;
        
        nodeData.children.forEach(child => {
            html += renderTreeNode(child);
        });
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }
    
    let filterHTML = '<div class="tree-container">';
    treeData.forEach(rootNode => {
        filterHTML += renderTreeNode(rootNode, true);
    });
    filterHTML += '</div>';
    
    filterContainer.innerHTML = filterHTML;
    
    // 初始化所有父节点的视觉状态
    knowledgeGraphConfig.nodes.forEach(node => {
        updateParentVisualState(node.id);
    });
    
    // 应用自适应文本显示
    setTimeout(() => {
        layoutManager.applyAdaptiveTextDisplay();
    }, 100);
}

// 侧边栏控制
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const floatingSearch = document.getElementById('floatingSearch');
    const collapseIcon = document.getElementById('collapseIcon');
    
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        floatingSearch.classList.remove('visible');
        collapseIcon.textContent = '◁';
        
        // 展开后重新获取侧边栏宽度并应用自适应布局
        setTimeout(() => {
            const rect = sidebar.getBoundingClientRect();
            const width = rect.width > 100 ? rect.width : layoutManager.defaultSidebarWidth;
            layoutManager.updateSidebarWidth(width);
            layoutManager.applyAdaptiveTextDisplay();
        }, 100); // 等待CSS动画完成
        
        // 面板已展开
    } else {
        sidebar.classList.add('collapsed');
        floatingSearch.classList.add('visible');
        collapseIcon.textContent = '▷';
        // 面板已折叠，搜索框已悬浮显示
    }
}

function expandSidebar() {
    const sidebar = document.getElementById('sidebar');
    const floatingSearch = document.getElementById('floatingSearch');
    const collapseIcon = document.getElementById('collapseIcon');
    
    sidebar.classList.remove('collapsed');
    floatingSearch.classList.remove('visible');
    collapseIcon.textContent = '◁';
    
    // 展开后重新获取侧边栏宽度并应用自适应布局
    setTimeout(() => {
        const rect = sidebar.getBoundingClientRect();
        const width = rect.width > 100 ? rect.width : layoutManager.defaultSidebarWidth;
        layoutManager.updateSidebarWidth(width);
        layoutManager.applyAdaptiveTextDisplay();
    }, 100); // 等待CSS动画完成
}

// 搜索功能
function searchAndHighlightNode() {
    const searchTerm = document.getElementById('nodeSearchInput').value.trim();
    const btn = document.querySelector('button[onclick="searchAndHighlightNode()"]');
    
    if (!searchTerm) {
        showTempMessage('请输入搜索关键词', 'warning');
        return;
    }
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        const matchingNodes = knowledgeGraphConfig.nodes.filter(node => 
            node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
        
        if (matchingNodes.length === 0) {
            showTempMessage('未找到匹配的节点', 'warning');
            return;
        }
        
        if (matchingNodes.length === 1) {
            const nodeId = matchingNodes[0].id;
            ensureNodeVisible(nodeId);
            selectAndHighlightNode(nodeId);
        } else {
            showMultipleSearchResults(matchingNodes);
        }
    }, 200);
}

function searchFromFloating() {
    const searchTerm = document.getElementById('floatingSearchInput').value.trim();
    
    if (!searchTerm) {
        showTempMessage('请输入搜索关键词', 'warning');
        return;
    }
    
    document.getElementById('nodeSearchInput').value = searchTerm;
    searchAndHighlightNode();
}

// 网络布局控制
function restabilizeNetwork() {
    const btn = document.querySelector('button[onclick="restabilizeNetwork()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    resetHighlight();
    
    network.setOptions({
        physics: { enabled: true }
    });
    
    network.stabilize();
    setTimeout(() => {
        network.fit({
            animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad'
            }
        });
        
        setTimeout(() => {
            network.setOptions({
                physics: { enabled: false }
            });
            
            if (btn) {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        }, 300);
    }, 1000);
}

function optimizeView() {
    const btn = document.querySelector('button[onclick="optimizeView()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    network.setOptions({
        physics: { enabled: false }
    });
    
    const visibleNodes = nodes.get();
    const nodeCount = visibleNodes.length;
    
    let optimalScale;
    if (nodeCount <= 10) {
        optimalScale = 2.0;
    } else if (nodeCount <= 30) {
        optimalScale = 1.5;
    } else if (nodeCount <= 50) {
        optimalScale = 1.2;
    } else {
        optimalScale = 0.9;
    }
    
    network.fit({
        animation: {
            duration: 800,
            easingFunction: 'easeInOutQuad'
        }
    });
    
    setTimeout(() => {
        network.moveTo({
            scale: optimalScale,
            animation: {
                duration: 800,
                easingFunction: 'easeInOutQuad'
            }
        });
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 400);
}

// 树形控制
function expandAllLayers() {
    const btn = document.querySelector('button[onclick="expandAllLayers()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        document.querySelectorAll('.tree-node-children').forEach(content => {
            content.classList.add('expanded');
        });
        document.querySelectorAll('.tree-expand-icon').forEach(icon => {
            if (icon.textContent === '▶') {
                icon.textContent = '▼';
            }
        });
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 300);
}

function collapseAllLayers() {
    const btn = document.querySelector('button[onclick="collapseAllLayers()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        document.querySelectorAll('.tree-node-children').forEach(content => {
            content.classList.remove('expanded');
        });
        document.querySelectorAll('.tree-expand-icon').forEach(icon => {
            if (icon.textContent === '▼') {
                icon.textContent = '▶';
            }
        });
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 300);
}

function selectAllFilters() {
    const btn = document.querySelector('button[onclick="selectAllFilters()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        resetHighlight();
        
        knowledgeGraphConfig.nodes.forEach(node => {
            const checkbox = document.getElementById(`node-${node.id}`);
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                toggleSingleNode(node.id, true);
            }
        });
        
        syncAllEdges();
        
        knowledgeGraphConfig.nodes.forEach(node => {
            updateParentVisualState(node.id);
        });
        
        // 选择所有节点后需要重新稳定布局
        network.setOptions({ physics: { enabled: true } });
        network.stabilize();
        setTimeout(() => {
            network.setOptions({ physics: { enabled: false } });
        }, 1000);
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 300);
}

function deselectAllFilters() {
    const btn = document.querySelector('button[onclick="deselectAllFilters()"]');
    
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        resetHighlight();
        
        knowledgeGraphConfig.nodes.forEach(node => {
            const checkbox = document.getElementById(`node-${node.id}`);
            if (checkbox && checkbox.checked) {
                checkbox.checked = false;
                toggleSingleNode(node.id, false);
            }
        });
        
        syncAllEdges();
        
        knowledgeGraphConfig.nodes.forEach(node => {
            const checkbox = document.getElementById(`node-${node.id}`);
            if (checkbox) {
                checkbox.indeterminate = false;
            }
        });
        
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }, 300);
}

// 树形节点操作
function toggleTreeNode(nodeId) {
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

function toggleTreeNodeSelection(nodeId) {
    resetHighlight();
    
    const checkbox = document.getElementById(`node-${nodeId}`);
    const isChecked = checkbox.checked;
    
    toggleSingleNode(nodeId, isChecked);
    syncAllEdges();
    updateParentVisualState(nodeId);
}

function cascadeSelectChildren(nodeId) {
    const childrenContainer = document.getElementById(`children-${nodeId}`);
    const expandIcon = document.getElementById(`expand-${nodeId}`);
    if (childrenContainer && !childrenContainer.classList.contains('expanded')) {
        childrenContainer.classList.add('expanded');
        if (expandIcon) expandIcon.textContent = '▼';
    }
    
    const currentCheckbox = document.getElementById(`node-${nodeId}`);
    if (currentCheckbox && !currentCheckbox.checked) {
        currentCheckbox.checked = true;
        toggleSingleNode(nodeId, true);
    }
    
    function selectAllChildren(parentId) {
        const childrenContainer = document.getElementById(`children-${parentId}`);
        if (childrenContainer) {
            const childCheckboxes = childrenContainer.querySelectorAll('input[type="checkbox"]');
            childCheckboxes.forEach(childCheckbox => {
                if (!childCheckbox.checked) {
                    childCheckbox.checked = true;
                    const childNodeId = childCheckbox.id.replace('node-', '');
                    toggleSingleNode(childNodeId, true);
                }
                const childNodeId = childCheckbox.id.replace('node-', '');
                selectAllChildren(childNodeId);
            });
        }
    }
    
    selectAllChildren(nodeId);
    syncAllEdges();
    updateParentVisualState(nodeId);
}

// 节点和边管理
function toggleSingleNode(nodeId, forceState = null) {
    const checkbox = document.getElementById(`node-${nodeId}`);
    const isVisible = forceState !== null ? forceState : (checkbox ? checkbox.checked : false);
    
    if (isVisible) {
        if (!nodes.get(nodeId)) {
            const nodeData = allNodes.get(nodeId);
            if (nodeData) {
                nodes.add(nodeData);
            }
        }
    } else {
        if (nodes.get(nodeId)) {
            nodes.remove(nodeId);
        }
    }
}

function syncAllEdges() {
    const visibleNodeIds = new Set(nodes.getIds());
    
    edges.clear();
    
    const edgesToShow = [];
    allEdges.get().forEach(edge => {
        const shouldShow = visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to);
        if (shouldShow) {
            edgesToShow.push(edge);
        }
    });
    
    if (edgesToShow.length > 0) {
        edges.add(edgesToShow);
    }
}

function updateParentVisualState(nodeId) {
    let parentNode = null;
    knowledgeGraphConfig.edges.forEach(edge => {
        if (HIERARCHICAL_RELATIONS.includes(edge.label) && edge.to === nodeId) {
            parentNode = edge.from;
        }
    });
    
    if (!parentNode) return;
    
    const parentChildren = [];
    knowledgeGraphConfig.edges.forEach(edge => {
        if (HIERARCHICAL_RELATIONS.includes(edge.label) && edge.from === parentNode) {
            parentChildren.push(edge.to);
        }
    });
    
    const checkedChildren = parentChildren.filter(childId => {
        const childCheckbox = document.getElementById(`node-${childId}`);
        return childCheckbox && childCheckbox.checked;
    });
    
    const parentCheckbox = document.getElementById(`node-${parentNode}`);
    if (parentCheckbox) {
        if (checkedChildren.length === 0) {
            parentCheckbox.indeterminate = false;
        } else if (checkedChildren.length === parentChildren.length) {
            parentCheckbox.indeterminate = false;
        } else {
            parentCheckbox.indeterminate = true;
        }
        
        updateParentVisualState(parentNode);
    }
}

// 节点信息和高亮
function showNodeInfo(nodeId) {
    // 检查必要的DOM元素是否存在
    const infoPanel = document.getElementById('infoPanel');
    const infoTitle = document.getElementById('infoTitle');
    const infoType = document.getElementById('infoType');
    const infoContent = document.getElementById('infoContent');
    
    if (!infoPanel || !infoTitle || !infoType || !infoContent) {
        console.error('❌ 信息面板DOM元素缺失，无法显示节点信息');
        return false;
    }
    
    const info = knowledgeGraphConfig.nodeDetails[nodeId];
    const relatedNodes = getRelatedNodes(nodeId);
    
    // 设置面板标题
    infoTitle.textContent = nodeId;
    infoType.textContent = '节点信息';
    
    // 构建内容
    let content = '';
    
    // 如果有详细信息，显示描述和详情
    if (info) {
        if (info.description) {
            content += `<p><strong>描述：</strong></p><p>${info.description}</p>`;
        }
        
        if (info.details && info.details.length > 0) {
            content += '<p><strong>详细信息：</strong></p><ul>';
            info.details.forEach(detail => {
                content += `<li>${detail}</li>`;
            });
            content += '</ul>';
        }
    } else {
        content = '<p>暂无详细信息</p>';
    }
    
    // 显示关联节点
    if (relatedNodes.length > 0) {
        content += '<hr><p><strong>关联节点:</strong></p><ul>';
        relatedNodes.forEach(rel => {
            content += `<li><strong><a href="javascript:void(0)" onclick="selectAndHighlightNode('${rel.node}')">${rel.node}</a></strong> (${rel.relation})</li>`;
        });
        content += '</ul>';
    }
    
    // 设置内容
    infoContent.innerHTML = content;
    
    // 直接用JavaScript控制显示，绕过有问题的CSS动画
    infoPanel.classList.remove('visible');
    
    // 直接设置显示样式，不依赖CSS动画
    infoPanel.style.position = 'absolute';
    infoPanel.style.top = '60px';
    infoPanel.style.right = '20px';
    infoPanel.style.width = '300px';
    infoPanel.style.maxHeight = 'calc(100vh - 120px)';
    infoPanel.style.height = 'auto';
    infoPanel.style.background = 'white';
    infoPanel.style.borderRadius = '12px';
    infoPanel.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    infoPanel.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    infoPanel.style.zIndex = '1000';
    infoPanel.style.display = 'flex';
    infoPanel.style.flexDirection = 'column';
    infoPanel.style.overflow = 'hidden';
    infoPanel.style.visibility = 'visible';
    
    // 直接设置为显示状态
    infoPanel.style.transform = 'translateX(0)';
    infoPanel.style.opacity = '1';
    
    // 添加visible类（主要用于其他CSS规则）
    infoPanel.classList.add('visible');
    
    // 检查是否需要滚动提示
    setTimeout(() => {
        const contentContainer = infoPanel.querySelector('.info-content-container');
        if (contentContainer && contentContainer.scrollHeight > contentContainer.clientHeight) {
            infoPanel.classList.add('has-scroll');
        } else {
            infoPanel.classList.remove('has-scroll');
        }
    }, 50);
    
    return true;
}

function hideInfoPanel() {
    const infoPanel = document.getElementById('infoPanel');
    if (!infoPanel) return;
    
    // 直接设置隐藏样式，与显示逻辑保持一致
    infoPanel.style.opacity = '0';
    infoPanel.style.transform = 'translateX(100%)';
    infoPanel.style.visibility = 'hidden';
    
    // 移除CSS类
    infoPanel.classList.remove('visible', 'has-scroll');
}

function highlightConnectedNodes(selectedNodeId) {
    
    // 停止之前的动画，避免冲突
    if (window.connectedEdgesAnimationId) {
        cancelAnimationFrame(window.connectedEdgesAnimationId);
        window.connectedEdgesAnimationId = null;
    }
    if (window.particleAnimationId) {
        cancelAnimationFrame(window.particleAnimationId);
        window.particleAnimationId = null;
    }
    
    // 暂时禁用物理引擎，确保视图调整精确
    network.setOptions({ physics: { enabled: false } });
    
    const connectedNodes = new Set([selectedNodeId]);
    const connectedEdges = new Set();
    
    // 优化：只遍历当前显示的边，而不是全部边
    const currentEdges = edges.get();
    const allEdgeData = allEdges.get();
    
    // 首先找到所有相关的边（从完整数据中）
    allEdgeData.forEach(edge => {
        if (edge.from === selectedNodeId || edge.to === selectedNodeId) {
            connectedNodes.add(edge.from);
            connectedNodes.add(edge.to);
            // 只有当边在当前显示中时才添加到连接边集合
            if (currentEdges.find(e => e.id === edge.id)) {
                connectedEdges.add(edge.id);
            }
        }
    });
    
    // 使用批量更新避免多次DOM操作
    const updateData = [];
    const edgeUpdateData = [];
    
    // 只更新当前显示的节点
    const currentNodes = nodes.get();
    currentNodes.forEach(node => {
        if (connectedNodes.has(node.id)) {
            updateData.push({
                id: node.id,
                color: {
                    background: node.id === selectedNodeId ? '#FF6B35' : '#5A9FD4',
                    border: node.id === selectedNodeId ? '#FF4500' : '#3D7BA8',
                    highlight: {
                        background: '#FF6B35',
                        border: '#FF4500'
                    }
                },
                borderWidth: node.id === selectedNodeId ? 2 : 1,
                shadow: {
                    enabled: true,
                    color: node.id === selectedNodeId ? 'rgba(255, 107, 53, 0.3)' : 'rgba(90, 159, 212, 0.3)',
                    size: node.id === selectedNodeId ? 15 : 10,
                    x: 3,
                    y: 3
                }
            });
        } else {
            updateData.push({
                id: node.id,
                color: {
                    background: '#E0E0E0',
                    border: '#CCCCCC',
                    highlight: {
                        background: '#E0E0E0',
                        border: '#CCCCCC'
                    }
                },
                borderWidth: 1,
                shadow: {
                    enabled: false
                }
            });
        }
    });
    
    // 只更新当前显示的边
    currentEdges.forEach(edge => {
        if (connectedEdges.has(edge.id)) {
            edgeUpdateData.push({
                id: edge.id,
                color: {
                    color: '#FF6B35',
                    highlight: '#FF6B35'
                },
                width: 2,
                dashes: [6, 3],
                shadow: {
                    enabled: true,
                    color: 'rgba(255, 107, 53, 0.3)',
                    size: 5,
                    x: 2,
                    y: 2
                }
            });
        } else {
            edgeUpdateData.push({
                id: edge.id,
                color: {
                    color: '#D0D0D0',
                    highlight: '#D0D0D0'
                },
                width: 1,
                dashes: false,
                shadow: {
                    enabled: false
                }
            });
        }
    });
    
    // 分批更新避免阻塞UI
    requestAnimationFrame(() => {
        nodes.update(updateData);
        
        requestAnimationFrame(() => {
            edges.update(edgeUpdateData);
            
            // 启动连接边的粒子流动动画
            if (connectedEdges.size > 0) {
                startConnectedEdgesAnimation(Array.from(connectedEdges));
            }
            
            // 异步调整视图，避免阻塞
            const displayedConnectedNodes = Array.from(connectedNodes).filter(nodeId => nodes.get(nodeId));
            if (displayedConnectedNodes.length > 0) {
                setTimeout(() => {
                    adjustViewForConnectedNodes(displayedConnectedNodes, selectedNodeId);
                }, 50);
            } else {
                setTimeout(() => {
                    network.focus(selectedNodeId, {
                        scale: 1.5,
                        animation: {
                            duration: 600,
                            easingFunction: 'easeInOutQuad'
                        }
                    });
                }, 100);
            }
        });
    });
}

function resetHighlight() {
    // 停止所有动画
    if (window.connectedEdgesAnimationId) {
        cancelAnimationFrame(window.connectedEdgesAnimationId);
        window.connectedEdgesAnimationId = null;
    }
    if (window.particleAnimationId) {
        cancelAnimationFrame(window.particleAnimationId);
        window.particleAnimationId = null;
    }
    
    // 注意：不在这里控制物理引擎状态，让调用方决定是否需要重新稳定
    
    // 重置高亮状态时，确保保留节点和边的所有原有属性（如label、size等）
    // 只更新样式相关属性，避免丢失重要数据
    const nodeUpdateData = [];
    nodes.get().forEach(node => {
        // 保留节点的所有原有属性，只更新样式相关属性
        nodeUpdateData.push({
            id: node.id,
            label: node.label, // 保留label
            size: node.size, // 保留size
            font: node.font, // 保留font
            color: {
                background: '#68B3E8', // 蓝色系配色
                border: '#4A90B8',
                highlight: {
                    background: '#5A9FD4',
                    border: '#3D7BA8'
                }
            },
            borderWidth: 1,
            shadow: {
                enabled: true, // 恢复默认阴影
                color: 'rgba(0,0,0,0.15)',
                size: 8,
                x: 2,
                y: 2
            }
        });
    });
    
    const edgeUpdateData = [];
    edges.get().forEach(edge => {
        // 保留边的所有原有属性，只更新样式相关属性
        edgeUpdateData.push({
            id: edge.id,
            from: edge.from, // 保留from
            to: edge.to, // 保留to
            label: edge.label, // 保留label
            font: edge.font, // 保留font
            arrows: edge.arrows, // 保留arrows
            smooth: edge.smooth, // 保留smooth
            color: {
                color: 'rgba(120, 120, 120, 0.6)', // Neo4j风格的边颜色
                highlight: '#FF6B35'
            },
            width: 1.5, // 恢复默认宽度
            dashes: false, // 取消虚线
            shadow: {
                enabled: false // 取消边的阴影
            }
        });
    });
    
    nodes.update(nodeUpdateData);
    edges.update(edgeUpdateData);
}

// 辅助函数
function getRelatedNodes(nodeId) {
    const relatedNodes = [];
    
    knowledgeGraphConfig.edges.forEach(edge => {
        if (edge.from === nodeId) {
            relatedNodes.push({
                node: edge.to,
                relation: edge.label
            });
        } else if (edge.to === nodeId) {
            relatedNodes.push({
                node: edge.from,
                relation: `被${edge.label}`
            });
        }
    });
    
    return relatedNodes;
}

function selectAndHighlightNode(nodeId) {
    const node = nodes.get(nodeId);
    if (!node) {
        showTempMessage('该节点当前未显示，请先在筛选器中选择显示该节点', 'warning');
        return;
    }
    
    // 选择节点并进入最佳视图
    network.selectNodes([nodeId]);
    enterOptimalView(nodeId);
}

function ensureNodeVisible(nodeId) {
    const checkbox = document.getElementById(`node-${nodeId}`);
    if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        toggleSingleNode(nodeId, true);
        updateParentVisualState(nodeId);
    }
}

function showMultipleSearchResults(matchingNodes) {
    let resultHtml = '<div style="max-height: 300px; overflow-y: auto;">';
    resultHtml += '<h4>搜索结果：</h4><ul>';
    matchingNodes.forEach(node => {
        resultHtml += `<li><a href="javascript:void(0)" onclick="selectSearchResult('${node.id}')">${node.label}</a></li>`;
    });
    resultHtml += '</ul></div>';
    
    document.getElementById('infoTitle').textContent = '搜索结果';
    document.getElementById('infoType').textContent = `找到 ${matchingNodes.length} 个匹配项`;
    document.getElementById('infoContent').innerHTML = resultHtml;
    document.getElementById('infoPanel').classList.add('visible');
}

function selectSearchResult(nodeId) {
    ensureNodeVisible(nodeId);
    selectAndHighlightNode(nodeId);
}

// 工具提示功能
function showTooltip(event, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.classList.add('show');
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// 自适应显示模式切换
function toggleCompactMode() {
    const btn = document.getElementById('compactModeBtn');
    const status = layoutManager.getStatusInfo();
    
    if (status.displayMode === 'normal') {
        layoutManager.setDisplayMode('compact');
        btn.textContent = '自动模式';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
    } else {
        layoutManager.setDisplayMode('normal');
        btn.textContent = '智能模式';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    }
    
    layoutManager.applyAdaptiveTextDisplay();
}

// 自适应文本模式切换
function toggleTextWrap() {
    const btn = event.target;
    
    if (layoutManager.textMode === 'truncated') {
        layoutManager.textMode = 'wrapped';
        btn.textContent = '文本收起';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
    } else {
        layoutManager.textMode = 'truncated';
        btn.textContent = '文本换行';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    }
    
    layoutManager.applyAdaptiveTextDisplay();
}

// 侧边栏宽度调整功能
function initSidebarResize() {
    const sidebar = document.getElementById('sidebar');
    const resizeHandle = document.getElementById('resizeHandle');
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(300, Math.min(500, startWidth + deltaX));
        sidebar.style.width = newWidth + 'px';
        
        // 更新布局管理器的宽度
        layoutManager.updateSidebarWidth(newWidth);
        
        // 更新折叠按钮位置
        const collapseBtn = document.getElementById('collapseBtn');
        collapseBtn.style.left = newWidth + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            
            // 最终应用自适应文本显示
            layoutManager.applyAdaptiveTextDisplay();
        }
    });
}

// 显示自适应状态信息
function showAdaptiveStatus() {
    const status = layoutManager.getStatusInfo();
    const message = `深度: ${status.maxDepth}, 宽度: ${status.sidebarWidth}px, 模式: ${status.displayMode}, 缩进: ${status.increment}px, 文本长度: ${status.optimalTextLength}`;
    showTempMessage(message, 'info');
            // 自适应状态更新
}

// 页面加载完成后的额外初始化
function initAdvancedFeatures() {
    initSidebarResize();
    
    // 初始化侧边栏宽度
    const sidebar = document.getElementById('sidebar');
    const initialRect = sidebar.getBoundingClientRect();
    if (initialRect.width > 100) {
        layoutManager.updateSidebarWidth(initialRect.width);
    }
    
    // 监听侧边栏宽度变化
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const rect = entry.contentRect;
            // 只有在侧边栏未折叠时才更新宽度
            if (!sidebar.classList.contains('collapsed') && rect.width > 100) {
                layoutManager.updateSidebarWidth(rect.width);
                layoutManager.applyAdaptiveTextDisplay();
            }
        }
    });
    resizeObserver.observe(sidebar);
    
    // 添加状态显示快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            showAdaptiveStatus();
        }
    });
}

// 粒子流动动画函数
function startParticleAnimation() {
    let animationPhase = 0;
    const animationSpeed = 0.015; // 显著降低动画速度，创造缓慢优雅的流动感
    
    function animate() {
        animationPhase += animationSpeed;
        if (animationPhase >= 1) {
            animationPhase = 0;
        }
        
        // 更新选中边的样式
        const selectedEdges = network.getSelectedEdges();
        if (selectedEdges.length > 0) {
            // 创建平滑的流动效果：基于相位创造连续的虚线变化
            // 使用正弦函数创造平滑的流动感，避免突然的跳跃
            const phase = animationPhase * Math.PI * 2;
            
            // 创建两种虚线模式之间的平滑过渡
            const pattern1Weight = (Math.sin(phase) + 1) / 2; // 0-1之间平滑变化
            const pattern2Weight = 1 - pattern1Weight;
            
            // 两种虚线模式：长短交替创造流动感
            const dash1 = Math.round(6 + 2 * pattern1Weight); // 6-8变化
            const gap1 = Math.round(3 + 1 * pattern2Weight);  // 3-4变化
            const dash2 = Math.round(4 + 1 * pattern2Weight); // 4-5变化
            const gap2 = Math.round(5 + 1 * pattern1Weight);  // 5-6变化
            
            // 根据相位选择虚线模式，创造流动方向感
            const dashArray = phase % (Math.PI * 2) < Math.PI ? 
                [dash1, gap1] : [dash2, gap2];
            
            // 极其微妙的颜色变化，减少频率避免闪烁
            const colorIntensity = 0.87 + 0.03 * Math.sin(animationPhase * Math.PI * 0.5);
            
            const edgeUpdateData = selectedEdges.map(id => {
                const edge = edges.get(id);
                return {
                    id: id,
                    from: edge.from,
                    to: edge.to,
                    label: edge.label,
                    arrows: edge.arrows,
                    color: {
                        color: `rgba(255, 107, 53, ${colorIntensity})`,
                        highlight: '#FF6B35'
                    },
                    width: 2,
                    dashes: dashArray,
                    smooth: edge.smooth
                };
            });
            
            edges.update(edgeUpdateData);
            window.particleAnimationId = requestAnimationFrame(animate);
        } else {
            // 没有选中的边时停止动画
            if (window.particleAnimationId) {
                cancelAnimationFrame(window.particleAnimationId);
                window.particleAnimationId = null;
            }
        }
    }
    
    animate();
}

// 连接边的粒子流动动画函数
function startConnectedEdgesAnimation(edgeIds) {
    // 停止之前的动画
    if (window.connectedEdgesAnimationId) {
        cancelAnimationFrame(window.connectedEdgesAnimationId);
        window.connectedEdgesAnimationId = null;
    }
    
    let animationPhase = 0;
    const animationSpeed = 0.012; // 进一步降低速度，创造极为缓慢的流动感
    
    function animate() {
        animationPhase += animationSpeed;
        if (animationPhase >= 1) {
            animationPhase = 0;
        }
        
        // 检查边是否还存在
        const existingEdges = edgeIds.filter(id => edges.get(id));
        if (existingEdges.length > 0) {
            // 创建平滑连续的流动效果，避免闪烁
            const phase = animationPhase * Math.PI * 2;
            
            // 平滑的虚线模式变化
            const smoothTransition = (Math.sin(phase * 0.5) + 1) / 2; // 更慢的变化频率
            
            // 创造连续的虚线变化，而不是突然切换
            const dash1 = Math.round(7 + 2 * smoothTransition); // 7-9平滑变化
            const gap1 = Math.round(3 + 1 * (1 - smoothTransition)); // 3-4平滑变化
            const dashArray = [dash1, gap1];
            
            // 极其微妙的颜色和阴影变化
            const colorIntensity = 0.88 + 0.02 * Math.sin(animationPhase * Math.PI * 0.3);
            const shadowIntensity = 0.12 + 0.03 * Math.sin(animationPhase * Math.PI * 0.4);
            
            const edgeUpdateData = existingEdges.map(id => {
                const edge = edges.get(id);
                return {
                    id: id,
                    from: edge.from,
                    to: edge.to,
                    label: edge.label,
                    arrows: edge.arrows,
                    font: edge.font,
                    smooth: edge.smooth,
                    color: {
                        color: `rgba(255, 107, 53, ${colorIntensity})`, // 动态透明度
                        highlight: '#FF6B35'
                    },
                    width: 2,
                    dashes: dashArray, // 平滑流动的虚线
                    shadow: {
                        enabled: true,
                        color: `rgba(255, 107, 53, ${shadowIntensity})`,
                        size: 4 + 0.2 * Math.sin(animationPhase * Math.PI * 0.6), // 极其微妙的阴影变化
                        x: 2,
                        y: 2
                    }
                };
            });
            
            edges.update(edgeUpdateData);
            window.connectedEdgesAnimationId = requestAnimationFrame(animate);
        } else {
            // 没有连接的边时停止动画
            window.connectedEdgesAnimationId = null;
        }
    }
    
    animate();
}

// 监听网络选择事件
function setupParticleAnimation() {
    if (network) {
        network.on('selectEdge', function(params) {
            // 有边被选中时启动动画
            if (params.edges.length > 0) {
                if (!window.particleAnimationId) {
                    startParticleAnimation();
                }
            }
        });
        
        network.on('deselectEdge', function(params) {
            // 边被取消选择时停止动画
            const selectedEdges = network.getSelectedEdges();
            if (selectedEdges.length === 0) {
                if (window.particleAnimationId) {
                    cancelAnimationFrame(window.particleAnimationId);
                    window.particleAnimationId = null;
                }
                // 恢复边的原始样式
                resetHighlight();
            }
        });
    }
}

// 检查当前视图状态
function getCurrentViewStatus() {
    const scale = network.getScale();
    const position = network.getViewPosition();
    
    return {
        scale: scale,
        position: position,
        isOptimal: scale >= 0.8 && scale <= 2.5,
        suggestion: scale < 0.8 ? '建议放大视图' : scale > 2.5 ? '建议缩小视图' : '视图状态良好'
    };
}

// 进入最佳视图模式
function enterOptimalView(nodeId) {
    
    // 确保节点可见
    ensureNodeVisible(nodeId);
    
    // 先显示节点信息
    showNodeInfo(nodeId);
    
    // 使用更可靠的方式确保面板显示后再执行高亮
    function waitForPanelAndHighlight(attempts = 0) {
        const infoPanel = document.getElementById('infoPanel');
        
        if (infoPanel && infoPanel.classList.contains('visible')) {
            // 异步执行高亮，避免阻塞UI
            setTimeout(() => {
                highlightConnectedNodes(nodeId);
            }, 10);
        } else if (attempts < 10) {
            // 如果面板还没显示，等待并重试
            setTimeout(() => {
                waitForPanelAndHighlight(attempts + 1);
            }, 50);
        } else {
            console.warn(`信息面板显示超时，强制重新显示: ${nodeId}`);
            // 超时后强制重新显示面板
            showNodeInfo(nodeId);
            setTimeout(() => {
                highlightConnectedNodes(nodeId);
            }, 100);
        }
    }
    
    // 开始等待面板显示
    setTimeout(() => {
        waitForPanelAndHighlight();
    }, 100);
}

// 智能调整视图以显示所有相关节点
function adjustViewForConnectedNodes(connectedNodeIds, selectedNodeId) {
    try {
        if (connectedNodeIds.length === 0) return;
        
        // 获取所有相关节点的位置
        const nodePositions = network.getPositions(connectedNodeIds);
        
        if (Object.keys(nodePositions).length === 0) return;
        
        // 计算边界框
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        Object.values(nodePositions).forEach(pos => {
            minX = Math.min(minX, pos.x);
            maxX = Math.max(maxX, pos.x);
            minY = Math.min(minY, pos.y);
            maxY = Math.max(maxY, pos.y);
        });
        
        // 如果所有节点都在同一个点，扩展边界
        if (maxX - minX < 100) {
            const centerX = (minX + maxX) / 2;
            minX = centerX - 50;
            maxX = centerX + 50;
        }
        if (maxY - minY < 100) {
            const centerY = (minY + maxY) / 2;
            minY = centerY - 50;
            maxY = centerY + 50;
        }
        
        // 动态计算边距 - 基于节点数量和容器大小
        const container = document.getElementById('network');
        const containerRect = container.getBoundingClientRect();
        
        // 智能检测实际可用空间
        const sidebar = document.getElementById('sidebar');
        const infoPanel = document.getElementById('infoPanel');
        const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
        const infoPanelWidth = (infoPanel && infoPanel.classList.contains('visible')) ? 320 : 0;
        
        // 更充分利用可视区域 - 紧凑显示策略
        const availableWidth = containerRect.width - sidebarWidth - infoPanelWidth - 40; // 只留40px基础边距
        const availableHeight = containerRect.height - 40; // 上下各20px边距
        
        // 根据节点数量动态调整边距
        let dynamicPadding;
        if (connectedNodeIds.length <= 2) {
            dynamicPadding = Math.min(80, availableWidth * 0.08); // 单节点或2节点：较大边距
        } else if (connectedNodeIds.length <= 5) {
            dynamicPadding = Math.min(60, availableWidth * 0.06); // 3-5节点：中等边距
        } else if (connectedNodeIds.length <= 10) {
            dynamicPadding = Math.min(40, availableWidth * 0.04); // 6-10节点：较小边距
        } else {
            dynamicPadding = Math.min(30, availableWidth * 0.03); // 多节点：最小边距，最大化利用空间
        }
        
        const boundingBox = {
            x: minX - dynamicPadding,
            y: minY - dynamicPadding,
            width: (maxX - minX) + 2 * dynamicPadding,
            height: (maxY - minY) + 2 * dynamicPadding
        };
        
        // 计算紧凑的缩放比例 - 充分利用可用空间
        const scaleX = availableWidth / boundingBox.width;
        const scaleY = availableHeight / boundingBox.height;
        let optimalScale = Math.min(scaleX, scaleY);
        
        // 更积极的缩放策略 - 鼓励紧凑显示
        let minScale = 0.8, maxScale = 4.0; // 提高最大缩放限制
        if (connectedNodeIds.length <= 2) {
            minScale = 1.2; // 少量节点：更大的最小缩放
            maxScale = 5.0; // 允许更大的放大
        } else if (connectedNodeIds.length <= 5) {
            minScale = 1.0; // 中等节点数：适中缩放
            maxScale = 3.5;
        } else if (connectedNodeIds.length <= 10) {
            minScale = 0.9; // 较多节点：保持可读性
            maxScale = 2.5;
        } else {
            minScale = 0.8; // 大量节点：优先显示完整性
            maxScale = 2.0;
        }
        
        // 应用缩放限制
        optimalScale = Math.max(minScale, Math.min(maxScale, optimalScale));
        
        // 为紧凑显示再次优化：如果计算出的缩放过小，适当提升
        if (optimalScale < 1.0 && connectedNodeIds.length <= 8) {
            optimalScale = Math.min(optimalScale * 1.3, maxScale); // 提升30%，但不超过最大值
        }
        
        // 智能计算视图中心点 - 考虑侧边栏和信息面板的偏移
        const baseContentCenterX = (minX + maxX) / 2;
        const baseContentCenterY = (minY + maxY) / 2;
        
        // 计算可视区域的实际中心点
        const viewportOffsetX = (sidebarWidth - infoPanelWidth) / 2; // 侧边栏在左，信息面板在右
        const canvasCenter = network.getViewPosition();
        
        // 调整中心点以充分利用可用空间 - 向可用区域中心靠拢
        const adjustedCenterX = baseContentCenterX - (viewportOffsetX * 0.3 / optimalScale); // 轻微偏移补偿
        const adjustedCenterY = baseContentCenterY;
        
        // 调试信息已移除，减少控制台输出
        
        // 动画移动到紧凑的最佳视图
        network.moveTo({
            position: { x: adjustedCenterX, y: adjustedCenterY },
            scale: optimalScale,
            animation: {
                duration: 500, // 更快速的响应
                easingFunction: 'easeInOutQuad'
            }
        });
        
        // 对于单个节点，提供额外的微调聚焦
        if (connectedNodeIds.length === 1) {
            setTimeout(() => {
                const selectedPos = nodePositions[selectedNodeId];
                if (selectedPos) {
                    // 单节点时，以节点为中心进行精确定位
                    network.moveTo({
                        position: { x: selectedPos.x - (viewportOffsetX * 0.5 / optimalScale), y: selectedPos.y },
                        scale: Math.max(optimalScale, 1.8), // 单节点允许更大放大
                        animation: {
                            duration: 200, // 快速微调
                            easingFunction: 'easeInOutCubic'
                        }
                    });
                }
            }, 300);
        }
        
        // 已移除节点数量提示信息
        
        // 视图调整完成后，短暂重新启用物理引擎进行微调，然后再次禁用
        setTimeout(() => {
            network.setOptions({ physics: { enabled: true } });
            setTimeout(() => {
                network.setOptions({ physics: { enabled: false } });
            }, 200);
        }, 800);
        
    } catch (error) {
        console.warn('Failed to adjust view for connected nodes:', error);
        // 降级方案：简单聚焦到选中节点
        try {
            network.focus(selectedNodeId, {
                scale: 1.6,
                animation: {
                    duration: 600,
                    easingFunction: 'easeInOutQuad'
                }
            });
        } catch (fallbackError) {
            console.warn('Fallback focus also failed:', fallbackError);
            // 最后的降级方案：移动到节点位置
            setTimeout(() => {
                network.selectNodes([selectedNodeId]);
            }, 100);
        }
    }
}

// 全局资源清理函数
function cleanupResources() {
    // 停止所有动画
    if (window.connectedEdgesAnimationId) {
        cancelAnimationFrame(window.connectedEdgesAnimationId);
        window.connectedEdgesAnimationId = null;
    }
    if (window.particleAnimationId) {
        cancelAnimationFrame(window.particleAnimationId);
        window.particleAnimationId = null;
    }
    
    // 清理网络实例
    if (network) {
        try {
            network.destroy();
        } catch (e) {
            console.warn('Failed to destroy network:', e);
        }
    }
    
    // 清理ResizeObserver等其他资源
    // （这里可以扩展更多清理逻辑）
    
    // 资源清理完成
}

// 测试函数：直接显示信息面板
function testShowInfoPanel() {

    const nodeId = 'JitAi开发框架';
    showNodeInfo(nodeId);
}

// 添加到全局作用域供控制台调用
window.testShowInfoPanel = testShowInfoPanel;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNetwork();
    
    // 初始化高级功能
    initAdvancedFeatures();
    
    // 搜索框回车键支持
    document.getElementById('nodeSearchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchAndHighlightNode();
        }
    });
    
    document.getElementById('floatingSearchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchFromFloating();
        }
    });
    
    // 页面卸载时清理资源
    window.addEventListener('beforeunload', cleanupResources);
    window.addEventListener('unload', cleanupResources);
    
    // 监听页面可见性变化，优化性能
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面不可见时暂停动画
            if (window.connectedEdgesAnimationId) {
                cancelAnimationFrame(window.connectedEdgesAnimationId);
                window.connectedEdgesAnimationId = null;
            }
        }
    });
}); 

// ================================
// 调试和分析工具函数
// ================================

// 分析节点关系数量
function analyzeNodeRelationships() {
    if (!knowledgeGraphConfig) {
        console.log('❌ 数据未加载');
        return;
    }
    
    const nodeStats = new Map();
    
    // 初始化所有节点
    knowledgeGraphConfig.nodes.forEach(node => {
        nodeStats.set(node.id, {
            id: node.id,
            inDegree: 0,
            outDegree: 0,
            totalDegree: 0,
            relations: []
        });
    });
    
    // 统计关系
    knowledgeGraphConfig.edges.forEach(edge => {
        const from = nodeStats.get(edge.from);
        const to = nodeStats.get(edge.to);
        
        if (from) {
            from.outDegree++;
            from.relations.push(`出→${edge.to} (${edge.label})`);
        }
        if (to) {
            to.inDegree++;
            to.relations.push(`入←${edge.from} (${edge.label})`);
        }
    });
    
    // 计算总度数
    nodeStats.forEach(stat => {
        stat.totalDegree = stat.inDegree + stat.outDegree;
    });
    
    // 按总度数排序
    const sortedStats = Array.from(nodeStats.values())
        .sort((a, b) => b.totalDegree - a.totalDegree);
    
    console.log('📊 节点关系分析（按总关系数排序）:');
    console.log('==========================================');
    
    sortedStats.slice(0, 10).forEach((stat, index) => {
        console.log(`${index + 1}. ${stat.id}`);
        console.log(`   总关系: ${stat.totalDegree} (入: ${stat.inDegree}, 出: ${stat.outDegree})`);
        console.log(`   具体关系: ${stat.relations.slice(0, 5).join(', ')}${stat.relations.length > 5 ? '...' : ''}`);
        console.log('');
    });
    
    return sortedStats;
}

// 测试特定节点的信息面板显示
function testNodeInfoPanel(nodeId) {
    console.log(`🧪 开始测试节点: ${nodeId}`);
    
    if (!knowledgeGraphConfig) {
        console.log('❌ 数据未加载');
        return;
    }
    
    const node = knowledgeGraphConfig.nodes.find(n => n.id === nodeId);
    if (!node) {
        console.log(`❌ 节点不存在: ${nodeId}`);
        return;
    }
    
    const relatedNodes = getRelatedNodes(nodeId);
    console.log(`📊 节点 "${nodeId}" 有 ${relatedNodes.length} 个关系`);
    
    // 确保节点可见
    ensureNodeVisible(nodeId);
    
    // 记录开始时间
    const startTime = Date.now();
    
    // 监听面板状态变化
    const infoPanel = document.getElementById('infoPanel');
    let panelShown = false;
    
    const checkPanel = () => {
        const isVisible = infoPanel.classList.contains('visible');
        if (isVisible && !panelShown) {
            panelShown = true;
            const duration = Date.now() - startTime;
            console.log(`✅ 信息面板显示成功，耗时: ${duration}ms`);
            return true;
        }
        return false;
    };
    
    // 设置监听器
    const observer = new MutationObserver(() => {
        checkPanel();
    });
    
    observer.observe(infoPanel, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // 5秒后停止监听
    setTimeout(() => {
        observer.disconnect();
        if (!panelShown) {
            console.log(`❌ 信息面板未在5秒内显示`);
        }
    }, 5000);
    
    // 触发显示
    console.log(`🚀 触发 enterOptimalView("${nodeId}")`);
    enterOptimalView(nodeId);
}

// 批量测试多个高关系度节点
function testHighDegreeNodes() {
    const stats = analyzeNodeRelationships();
    if (!stats || stats.length === 0) return;
    
    console.log('🧪 开始批量测试高关系度节点...');
    
    const highDegreeNodes = stats.filter(s => s.totalDegree > 5).slice(0, 5);
    let currentIndex = 0;
    
    function testNext() {
        if (currentIndex >= highDegreeNodes.length) {
            console.log('✅ 批量测试完成');
            return;
        }
        
        const node = highDegreeNodes[currentIndex];
        console.log(`\n🔄 测试 ${currentIndex + 1}/${highDegreeNodes.length}: ${node.id} (关系数: ${node.totalDegree})`);
        
        testNodeInfoPanel(node.id);
        currentIndex++;
        
        // 间隔3秒测试下一个
        setTimeout(testNext, 3000);
    }
    
    testNext();
}

// 监听和记录所有关键事件
function enableDebugMode() {
    console.log('🔧 启用调试模式');
    
    // 监听网络事件
    if (network) {
        network.on('click', function(params) {
            console.log('🖱️ 网络点击事件:', params);
        });
        
        network.on('selectNode', function(params) {
            console.log('✅ 节点选中事件:', params);
        });
        
        network.on('deselectNode', function(params) {
            console.log('❌ 节点取消选中事件:', params);
        });
    }
    
    // 监听信息面板变化
    const infoPanel = document.getElementById('infoPanel');
    if (infoPanel) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isVisible = infoPanel.classList.contains('visible');
                    console.log(`📋 信息面板状态变化: ${isVisible ? '显示' : '隐藏'}`);
                }
            });
        });
        
        observer.observe(infoPanel, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // 监听错误
    window.addEventListener('error', function(e) {
        console.error('💥 JavaScript错误:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('💥 未处理的Promise拒绝:', e.reason);
    });
}

// 检查DOM元素状态
function checkDOMStatus() {
    console.log('🔍 检查DOM元素状态:');
    
    const elements = {
        'network': document.getElementById('network'),
        'infoPanel': document.getElementById('infoPanel'),
        'infoTitle': document.getElementById('infoTitle'),
        'infoType': document.getElementById('infoType'),
        'infoContent': document.getElementById('infoContent')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
        if (element) {
            const rect = element.getBoundingClientRect();
            console.log(`✅ ${name}: 存在 (${rect.width}x${rect.height})`);
        } else {
            console.log(`❌ ${name}: 不存在`);
        }
    });
    
    if (network) {
        console.log(`✅ vis-network: 已初始化`);
        console.log(`📊 显示节点数: ${nodes ? nodes.length : 0}`);
        console.log(`🔗 显示边数: ${edges ? edges.length : 0}`);
    } else {
        console.log(`❌ vis-network: 未初始化`);
    }
}

// 全面诊断函数
function fullDiagnosis() {
    console.log('🏥 开始全面诊断...');
    console.log('================================');
    
    checkDOMStatus();
    console.log('');
    
    const stats = analyzeNodeRelationships();
    console.log('');
    
    enableDebugMode();
    console.log('');
    
    console.log('🎯 推荐测试高关系度节点:');
    if (stats && stats.length > 0) {
        const topNodes = stats.filter(s => s.totalDegree > 5).slice(0, 3);
        topNodes.forEach((node, i) => {
            console.log(`${i + 1}. ${node.id} (${node.totalDegree} 关系) - 运行: testNodeInfoPanel("${node.id}")`);
        });
    }
    
    console.log('');
    console.log('🔧 可用的调试命令:');
    console.log('- analyzeNodeRelationships() // 分析节点关系');
    console.log('- testNodeInfoPanel("节点名") // 测试特定节点');
    console.log('- testHighDegreeNodes() // 批量测试高关系度节点');
    console.log('- checkDOMStatus() // 检查DOM状态');
    console.log('- enableDebugMode() // 启用调试模式');
}

// 导出到全局作用域
window.analyzeNodeRelationships = analyzeNodeRelationships;
window.testNodeInfoPanel = testNodeInfoPanel;
window.testHighDegreeNodes = testHighDegreeNodes;
window.enableDebugMode = enableDebugMode;
window.checkDOMStatus = checkDOMStatus;
window.fullDiagnosis = fullDiagnosis;

// CSS样式诊断工具
function diagnosePanelCSS() {
    console.log('🔧 开始CSS样式诊断...');
    
    const infoPanel = document.getElementById('infoPanel');
    if (!infoPanel) {
        console.log('❌ 信息面板不存在');
        return;
    }
    
    const computedStyle = window.getComputedStyle(infoPanel);
    const rect = infoPanel.getBoundingClientRect();
    
    console.log('📏 面板尺寸位置:');
    console.log(`  位置: x=${rect.x}, y=${rect.y}`);
    console.log(`  尺寸: width=${rect.width}, height=${rect.height}`);
    console.log(`  可视区域: top=${rect.top}, right=${rect.right}, bottom=${rect.bottom}, left=${rect.left}`);
    
    console.log('🎨 关键CSS属性:');
    console.log(`  display: ${computedStyle.display}`);
    console.log(`  visibility: ${computedStyle.visibility}`);
    console.log(`  opacity: ${computedStyle.opacity}`);
    console.log(`  transform: ${computedStyle.transform}`);
    console.log(`  position: ${computedStyle.position}`);
    console.log(`  z-index: ${computedStyle.zIndex}`);
    console.log(`  top: ${computedStyle.top}`);
    console.log(`  right: ${computedStyle.right}`);
    console.log(`  bottom: ${computedStyle.bottom}`);
    console.log(`  left: ${computedStyle.left}`);
    
    console.log('🔍 面板状态检查:');
    console.log(`  classList: ${Array.from(infoPanel.classList).join(', ')}`);
    console.log(`  内联样式: ${infoPanel.style.cssText}`);
    
    // 检查是否在可视区域内
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    console.log(`  窗口尺寸: ${viewport.width}x${viewport.height}`);
    
    const isInViewport = (
        rect.right > 0 &&
        rect.bottom > 0 &&
        rect.left < viewport.width &&
        rect.top < viewport.height
    );
    console.log(`  是否在可视区域: ${isInViewport ? '是' : '否'}`);
    
    // 检查父容器
    const parent = infoPanel.parentElement;
    if (parent) {
        const parentStyle = window.getComputedStyle(parent);
        const parentRect = parent.getBoundingClientRect();
        console.log('👨‍👩‍👧‍👦 父容器信息:');
        console.log(`  父容器: ${parent.tagName}${parent.className ? '.' + parent.className : ''}`);
        console.log(`  父容器overflow: ${parentStyle.overflow}`);
        console.log(`  父容器position: ${parentStyle.position}`);
        console.log(`  父容器尺寸: ${parentRect.width}x${parentRect.height}`);
    }
    
    // 检查遮挡元素
    const elementAtCenter = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
    console.log('🎭 中心点元素:', elementAtCenter?.tagName, elementAtCenter?.className);
    
    return {
        rect,
        computedStyle,
        isInViewport,
        classList: Array.from(infoPanel.classList)
    };
}

// 强制显示面板函数
function forceShowPanel() {
    console.log('💪 强制显示面板...');
    
    const infoPanel = document.getElementById('infoPanel');
    if (!infoPanel) {
        console.log('❌ 面板不存在');
        return;
    }
    
    // 清除所有可能的问题样式
    infoPanel.style.transform = 'translateX(0)';
    infoPanel.style.opacity = '1';
    infoPanel.style.visibility = 'visible';
    infoPanel.style.display = 'flex';
    infoPanel.style.zIndex = '9999';
    infoPanel.style.position = 'absolute';
    infoPanel.style.top = '60px';
    infoPanel.style.right = '20px';
    infoPanel.style.width = '300px';
    infoPanel.style.height = 'auto';
    infoPanel.style.maxHeight = 'calc(100vh - 120px)';
    infoPanel.style.backgroundColor = 'white';
    infoPanel.style.border = '2px solid red'; // 红色边框便于识别
    
    infoPanel.classList.add('visible');
    
    console.log('✅ 强制样式已应用');
    
    // 验证结果
    setTimeout(() => {
        const rect = infoPanel.getBoundingClientRect();
        console.log(`📍 强制显示后位置: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`);
    }, 100);
}

// 重置面板CSS
function resetPanelCSS() {
    console.log('🔄 重置面板CSS...');
    
    const infoPanel = document.getElementById('infoPanel');
    if (!infoPanel) {
        console.log('❌ 面板不存在');
        return;
    }
    
    // 清除所有内联样式
    infoPanel.style.cssText = '';
    infoPanel.classList.remove('visible');
    
    // 重新添加visible类
    setTimeout(() => {
        infoPanel.classList.add('visible');
        console.log('✅ 面板CSS已重置');
    }, 50);
}

// 导出到全局作用域
window.diagnosePanelCSS = diagnosePanelCSS;
window.forceShowPanel = forceShowPanel;
window.resetPanelCSS = resetPanelCSS;