/**
 * D3.js 知识图谱可视化模块
 * 高内聚、低耦合的设计，专门处理D3力导向图
 */

class D3NetworkGraph {
    constructor(container) {
        this.container = container;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        
        // 数据
        this.nodes = [];
        this.links = [];
        this.allNodes = []; // 完整节点数据
        this.allLinks = []; // 完整连接数据
        
        // D3元素
        this.svg = null;
        this.g = null;
        this.simulation = null;
        this.nodeElements = null;
        this.linkElements = null;
        this.labelElements = null;
        
        // 配置
        this.config = {
            nodeColor: '#68bdf6', // 统一的节点颜色
            force: {
                charge: -500,
                linkDistance: 80,
                linkStrength: 0.6,
                velocityDecay: 0.4,
                alpha: 0.3,
                alphaTarget: 0,
                alphaDecay: 0.02
            },
            node: {
                radius: 12,
                strokeWidth: 2,
                fontSize: 12
            },
            link: {
                strokeWidth: 1,
                color: '#999'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createSVG();
        this.createSimulation();
        this.setupZoom();
    }
    
    createSVG() {
        // 清空容器
        d3.select(this.container).selectAll("*").remove();
        
        // 创建SVG元素
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("background", "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)");
            
        // 创建主绘图组
        this.g = this.svg.append("g");
        
        // 创建箭头标记 - 更小更精致的箭头
        const defs = this.svg.append("defs");
        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -3 6 6")
            .attr("refX", 6)  // 减小refX，让箭头不深入节点内部
            .attr("refY", 0)
            .attr("markerWidth", 4)  // 缩小箭头
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-3L6,0L0,3")  // 更小的箭头路径
            .attr("fill", this.config.link.color);
    }
    
    createSimulation() {
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id)
                .distance(this.config.force.linkDistance)
                .strength(this.config.force.linkStrength))
            .force("charge", d3.forceManyBody()
                .strength(this.config.force.charge))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collision", d3.forceCollide()
                .radius(d => (d.size || this.config.node.radius) + 3))
            .velocityDecay(this.config.force.velocityDecay)
            .alpha(this.config.force.alpha)
            .alphaTarget(this.config.force.alphaTarget)
            .alphaDecay(this.config.force.alphaDecay);
    }
    
    setupZoom() {
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                this.g.attr("transform", event.transform);
            });
            
        this.svg.call(zoom);
        
        // 保存zoom实例供后续使用
        this.zoom = zoom;
    }
    
    /**
     * 设置完整数据
     */
    setFullData(nodes, links) {
        this.allNodes = nodes.map(d => ({...d}));
        this.allLinks = links.map(d => ({...d}));
        
        // 计算并设置节点层级和大小
        this.calculateNodeHierarchy();
    }
    
    /**
     * 设置当前显示的数据
     */
    setVisibleData(nodes, links) {
        // 确保使用包含计算属性的节点数据
        this.nodes = nodes.map(inputNode => {
            // 从allNodes中找到对应的完整节点数据（包含hierarchyLevel和size）
            const fullNode = this.allNodes?.find(n => n.id === inputNode.id) || inputNode;
            return {...fullNode};
        });
        
        this.links = links.map(d => ({...d}));
        
        // 绑定数据到仿真
        this.simulation.nodes(this.nodes);
        this.simulation.force("link").links(this.links);
        
        this.render();
        this.simulation.restart();
    }
    
    /**
     * 计算节点层级并设置大小
     */
    calculateNodeHierarchy() {
        if (!this.allNodes || !this.allLinks) return;
        
        // 层次关系类型（使用配置文件中的定义）
        const hierarchicalRelations = window.AppConfig?.HIERARCHICAL_RELATIONS || ['包含', '支持', '管理'];
        
        // 构建父子关系映射
        const childParentMap = {};
        
        this.allLinks.forEach(link => {
            const relationType = link.type || link.label || '';
            if (hierarchicalRelations.includes(relationType)) {
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                childParentMap[targetId] = sourceId;
            }
        });
        
        // 计算每个节点的层级深度
        const getNodeLevel = (nodeId, visited = new Set()) => {
            if (visited.has(nodeId)) return 0; // 避免循环引用
            
            const parent = childParentMap[nodeId];
            if (!parent) return 0; // 顶级节点
            
            visited.add(nodeId);
            const parentLevel = getNodeLevel(parent, visited);
            visited.delete(nodeId);
            
            return parentLevel + 1;
        };
        
        // 为每个节点设置层级和对应的大小
        let hierarchyStats = {};
        this.allNodes.forEach(node => {
            const level = getNodeLevel(node.id);
            node.hierarchyLevel = level;
            
            // 统计层级分布
            if (!hierarchyStats[level]) hierarchyStats[level] = 0;
            hierarchyStats[level]++;
            
            // 根据层级设置节点大小：顶级最大，逐层递减
            // 大小范围：12-30，进一步增大差异确保视觉效果明显
            const maxRadius = 30;
            const minRadius = 12;
            const levelDecrement = 4;
            
            node.size = Math.max(minRadius, maxRadius - (level * levelDecrement));
        });
        
        // 调试输出层级统计信息
        console.log('节点层级分布:', hierarchyStats);
        console.log('发现的层次关系数量:', Object.keys(childParentMap).length);
        
        // 按层级分组显示大小范围
        const sizeByLevel = {};
        this.allNodes.forEach(node => {
            const level = node.hierarchyLevel;
            if (!sizeByLevel[level]) sizeByLevel[level] = [];
            sizeByLevel[level].push(node.size);
        });
        
        Object.keys(sizeByLevel).forEach(level => {
            const sizes = sizeByLevel[level];
            const uniqueSizes = [...new Set(sizes)];
            console.log(`第${level}层节点大小: ${uniqueSizes.join(', ')}`);
        });
    }
    

    
    /**
     * 根据选中状态筛选节点
     */
    filterNodesBySelection(selectedNodeIds) {
        const visibleNodes = this.allNodes.filter(n => selectedNodeIds.has(n.id));
        const visibleLinks = this.allLinks.filter(l => 
            selectedNodeIds.has(l.source) && selectedNodeIds.has(l.target)
        );
        
        this.setVisibleData(visibleNodes, visibleLinks);
    }
    
    render() {
        // 渲染连接线
        this.linkElements = this.g.selectAll(".link")
            .data(this.links, d => d.id)
            .join("line")
            .classed("link", true)
            .attr("stroke", this.config.link.color)
            .attr("stroke-width", this.config.link.strokeWidth)
            .attr("marker-end", "url(#arrowhead)")
            .style("opacity", 0.6);
            
        // 渲染连接线标签背景
        this.linkLabelBgElements = this.g.selectAll(".link-label-bg")
            .data(this.links, d => d.id)
            .join("rect")
            .classed("link-label-bg", true)
            .attr("fill", "rgba(255, 255, 255, 0.85)")
            .attr("stroke", "rgba(0, 0, 0, 0.1)")
            .attr("stroke-width", 0.5)
            .attr("rx", 2)
            .attr("ry", 2)
            .style("pointer-events", "none");
            
        // 渲染连接线标签
        this.linkLabelElements = this.g.selectAll(".link-label")
            .data(this.links, d => d.id)
            .join("text")
            .classed("link-label", true)
            .text(d => d.label || "")
            .attr("font-size", "9px")
            .attr("font-family", "Arial, sans-serif")
            .attr("text-anchor", "middle")
            .attr("fill", "#555")
            .attr("dy", "0.35em")
            .style("pointer-events", "none")
            .style("user-select", "none")
            .style("opacity", 0.9);
            
        // 渲染节点
        this.nodeElements = this.g.selectAll(".node")
            .data(this.nodes, d => d.id)
            .join("circle")
            .classed("node", true)
            .attr("r", d => d.size || this.config.node.radius)
            .attr("fill", d => {
                // 根据层级设置颜色：顶级更深，子级更浅
                const level = d.hierarchyLevel || 0;
                const baseColor = '#68bdf6';
                const opacity = Math.max(0.6, 1 - (level * 0.1));
                return this.adjustColorOpacity(baseColor, opacity);
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", d => {
                // 顶级节点边框更粗
                const level = d.hierarchyLevel || 0;
                return level === 0 ? 3 : this.config.node.strokeWidth;
            })
            .style("cursor", "pointer")
            .call(this.createDragBehavior())
            .on("click", (event, d) => {
                event.stopPropagation();
                this.onNodeClick && this.onNodeClick(d);
            });
            
        // 渲染标签 - 放在节点下方，根据节点大小调整字体
        this.labelElements = this.g.selectAll(".label")
            .data(this.nodes, d => d.id)
            .join("text")
            .classed("label", true)
            .text(d => d.name || d.label)
            .attr("font-size", d => {
                // 根据节点大小动态调整字体大小
                const nodeSize = d.size || this.config.node.radius;
                return Math.max(10, Math.min(14, nodeSize * 0.8));
            })
            .attr("font-family", "Arial, sans-serif")
            .attr("text-anchor", "middle")
            .attr("dy", "1.2em")
            .attr("fill", "#333")
            .style("pointer-events", "none")
            .style("user-select", "none");
            
        // 绑定仿真更新事件
        this.simulation.on("tick", () => this.tick());
        
        // 添加空白区域点击事件
        this.svg.on("click", (event) => {
            if (event.target === this.svg.node()) {
                this.onBackgroundClick && this.onBackgroundClick();
            }
        });
    }
    
    createDragBehavior() {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
    
    tick() {
        // 更新连接线位置 - 计算节点边缘连接点
        if (this.linkElements) {
            this.linkElements.each(function(d) {
                const sourceRadius = (d.source.size || 12) + 3; // 节点半径 + 边框宽度 + 间距
                const targetRadius = (d.target.size || 12) + 3;
                
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance === 0) {
                    d3.select(this)
                        .attr("x1", d.source.x)
                        .attr("y1", d.source.y)
                        .attr("x2", d.target.x)
                        .attr("y2", d.target.y);
                } else {
                    const sourceX = d.source.x + (dx / distance) * sourceRadius;
                    const sourceY = d.source.y + (dy / distance) * sourceRadius;
                    // 连线到达目标节点边缘，箭头会自动从此处开始
                    const targetX = d.target.x - (dx / distance) * targetRadius;
                    const targetY = d.target.y - (dy / distance) * targetRadius;
                    
                    d3.select(this)
                        .attr("x1", sourceX)
                        .attr("y1", sourceY)
                        .attr("x2", targetX)
                        .attr("y2", targetY);
                }
            });
        }
            
        // 更新连接线标签位置 - 放在连线中间
        if (this.linkLabelElements) {
            this.linkLabelElements
                .attr("x", d => (d.source.x + d.target.x) / 2)
                .attr("y", d => (d.source.y + d.target.y) / 2);
        }
        
        // 更新连接线标签背景位置和大小
        if (this.linkLabelBgElements && this.linkLabelElements) {
            this.linkLabelElements.each(function(d, i) {
                const textElement = this;
                const bgElement = d3.select(d3.selectAll('.link-label-bg').nodes()[i]);
                
                if (textElement && !bgElement.empty()) {
                    try {
                        const bbox = textElement.getBBox();
                        const padding = 3;
                        bgElement
                            .attr("x", bbox.x - padding)
                            .attr("y", bbox.y - padding)
                            .attr("width", bbox.width + 2 * padding)
                            .attr("height", bbox.height + 2 * padding);
                    } catch (e) {
                        // getBBox可能在某些情况下失败，忽略错误
                    }
                }
            });
        }
            
        // 更新节点位置
        if (this.nodeElements) {
            this.nodeElements
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }
            
        // 更新标签位置 - 放在节点下方
        if (this.labelElements) {
            this.labelElements
                .attr("x", d => d.x)
                .attr("y", d => d.y + (d.size || this.config.node.radius) + 8);
        }
    }
    
    // 工具方法（保留以防需要）
    getColorByLabel(label, index = 0) {
        return this.config.nodeColor; // 统一返回单一颜色
    }
    
    // 调整颜色透明度
    adjustColorOpacity(color, opacity) {
        // 将hex颜色转换为rgba
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // 高亮节点
    highlightNode(nodeId) {
        if (!this.nodeElements) return;
        
        this.nodeElements
            .style("opacity", d => d.id === nodeId ? 1 : 0.3)
            .attr("stroke", d => d.id === nodeId ? "#ff6b35" : "#fff")
            .attr("stroke-width", d => d.id === nodeId ? 4 : this.config.node.strokeWidth);
            
        if (this.labelElements) {
            this.labelElements
                .style("opacity", d => d.id === nodeId ? 1 : 0.3);
        }
            
        if (this.linkElements) {
            this.linkElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 0.8 : 0.1
                );
        }
        
        if (this.linkLabelElements) {
            this.linkLabelElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.2
                );
        }
        
        if (this.linkLabelBgElements) {
            this.linkLabelBgElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.2
                );
        }
    }
    
    // 高亮节点及其直接连接的节点
    highlightNodeWithConnections(nodeId) {
        if (!this.nodeElements) return;
        
        // 找到所有与目标节点直接连接的节点
        const connectedNodes = new Set([nodeId]);
        this.links.forEach(link => {
            if (link.source.id === nodeId) {
                connectedNodes.add(link.target.id);
            } else if (link.target.id === nodeId) {
                connectedNodes.add(link.source.id);
            }
        });
        
        // 高亮目标节点和连接的节点
        this.nodeElements
            .style("opacity", d => {
                if (d.id === nodeId) return 1; // 目标节点完全不透明
                if (connectedNodes.has(d.id)) return 0.85; // 连接节点稍微透明
                return 0.25; // 其他节点较透明
            })
            .attr("stroke", d => {
                if (d.id === nodeId) return "#2196F3"; // 目标节点蓝色边框
                if (connectedNodes.has(d.id)) return "#66BB6A"; // 连接节点绿色边框
                return "#e0e0e0"; // 其他节点浅灰色边框
            })
            .attr("stroke-width", d => {
                if (d.id === nodeId) return 3; // 目标节点适中粗边框
                if (connectedNodes.has(d.id)) return 2.5; // 连接节点稍粗边框
                return 1; // 其他节点细边框
            })
            .attr("fill", d => {
                if (d.id === nodeId) return "#1976D2"; // 目标节点深蓝色
                if (connectedNodes.has(d.id)) return "#4CAF50"; // 连接节点绿色
                return "#90CAF9"; // 其他节点浅蓝色
            });
            
        if (this.labelElements) {
            this.labelElements
                .style("opacity", d => {
                    if (d.id === nodeId) return 1;
                    if (connectedNodes.has(d.id)) return 0.95;
                    return 0.35;
                })
                .style("font-weight", d => {
                    if (d.id === nodeId) return "600";
                    if (connectedNodes.has(d.id)) return "500";
                    return "normal";
                });
        }
            
        if (this.linkElements) {
            this.linkElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 0.9 : 0.15
                )
                .attr("stroke", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? "#2196F3" : "#bdbdbd"
                )
                .attr("stroke-width", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 2 : this.config.link.strokeWidth
                );
        }
        
        if (this.linkLabelElements) {
            this.linkLabelElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.2
                )
                .style("font-weight", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? "600" : "normal"
                )
                .attr("fill", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? "#1976D2" : "#555"
                );
        }
        
        if (this.linkLabelBgElements) {
            this.linkLabelBgElements
                .style("opacity", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.2
                )
                .attr("fill", d => 
                    (d.source.id === nodeId || d.target.id === nodeId) ? "rgba(33, 150, 243, 0.1)" : "rgba(255, 255, 255, 0.85)"
                );
        }
    }
    
    // 以指定节点为中心调整视图
    focusOnNode(nodeId) {
        const targetNode = this.nodes.find(n => n.id === nodeId);
        if (!targetNode) return;
        
        // 如果节点位置还未确定，等待仿真稳定后再尝试
        if (!targetNode.x || !targetNode.y || targetNode.x === 0 || targetNode.y === 0) {
            setTimeout(() => {
                this.focusOnNode(nodeId);
            }, 300);
            return;
        }
        
        const scale = 1.5; // 放大倍数
        const translate = [
            this.width / 2 - scale * targetNode.x,
            this.height / 2 - scale * targetNode.y
        ];
        
        this.svg.transition()
            .duration(800)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
    
    // 智能最佳视图：以指定节点为中心，优化显示相关节点
    focusOnNodeWithOptimalView(nodeId) {
        const targetNode = this.nodes.find(n => n.id === nodeId);
        if (!targetNode) return;
        
        // 如果节点位置还未确定，等待仿真稳定后再尝试
        if (!targetNode.x || !targetNode.y || targetNode.x === 0 || targetNode.y === 0) {
            setTimeout(() => {
                this.focusOnNodeWithOptimalView(nodeId);
            }, 300);
            return;
        }
        
        // 找到与目标节点直接连接的所有节点
        const connectedNodes = new Set([targetNode]);
        this.links.forEach(link => {
            if (link.source.id === nodeId) {
                connectedNodes.add(link.target);
            } else if (link.target.id === nodeId) {
                connectedNodes.add(link.source);
            }
        });
        
        const connectedNodesArray = Array.from(connectedNodes);
        
        // 如果只有目标节点或相关节点很少，使用简单居中
        if (connectedNodesArray.length <= 2) {
            this.focusOnNode(nodeId);
            return;
        }
        
        // 计算相关节点的边界
        const xs = connectedNodesArray.map(n => n.x).filter(x => x != null);
        const ys = connectedNodesArray.map(n => n.y).filter(y => y != null);
        
        if (xs.length === 0 || ys.length === 0) {
            this.focusOnNode(nodeId);
            return;
        }
        
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        
        // 添加适当的边距
        const padding = 80;
        const contentWidth = (maxX - minX) + padding * 2;
        const contentHeight = (maxY - minY) + padding * 2;
        const contentCenterX = (minX + maxX) / 2;
        const contentCenterY = (minY + maxY) / 2;
        
        // 计算合适的缩放比例，确保相关节点都能显示
        const scaleX = Math.min(this.width * 0.85 / contentWidth, 3.0);
        const scaleY = Math.min(this.height * 0.85 / contentHeight, 3.0);
        let scale = Math.min(scaleX, scaleY);
        
        // 确保最小缩放，避免过小
        scale = Math.max(scale, 0.8);
        
        // 但目标节点应该尽可能在中心，做适当调整
        const targetWeight = 0.7; // 目标节点的权重
        const adjustedCenterX = contentCenterX * (1 - targetWeight) + targetNode.x * targetWeight;
        const adjustedCenterY = contentCenterY * (1 - targetWeight) + targetNode.y * targetWeight;
        
        const translate = [
            this.width / 2 - scale * adjustedCenterX,
            this.height / 2 - scale * adjustedCenterY
        ];
        
        this.svg.transition()
            .duration(1000)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }

    
    // 清除节点约束
    clearRadialLayoutConstraints() {
        // 移除所有节点的固定位置约束
        this.nodes.forEach(node => {
            node.fx = null;
            node.fy = null;
        });
    }
    
    // 重置高亮
    resetHighlight() {
        if (this.nodeElements) {
            this.nodeElements
                .style("opacity", 1)
                .attr("stroke", "#fff")
                .attr("stroke-width", d => {
                    const level = d.hierarchyLevel || 0;
                    return level === 0 ? 3 : this.config.node.strokeWidth;
                })
                .attr("fill", d => {
                    const level = d.hierarchyLevel || 0;
                    const baseColor = '#68bdf6';
                    const opacity = Math.max(0.6, 1 - (level * 0.1));
                    return this.adjustColorOpacity(baseColor, opacity);
                });
        }
        
        if (this.labelElements) {
            this.labelElements
                .style("opacity", 1)
                .style("font-weight", "normal");
        }
            
        if (this.linkElements) {
            this.linkElements
                .style("opacity", 0.6)
                .attr("stroke", this.config.link.color)
                .attr("stroke-width", this.config.link.strokeWidth);
        }
        
        if (this.linkLabelElements) {
            this.linkLabelElements
                .style("opacity", 0.9)
                .style("font-weight", "normal")
                .attr("fill", "#555");
        }
        
        if (this.linkLabelBgElements) {
            this.linkLabelBgElements
                .style("opacity", 1)
                .attr("fill", "rgba(255, 255, 255, 0.85)");
        }
    }
    
    // 智能最佳视图
    fit() {
        if (!this.g || this.nodes.length === 0) return;
        
        // 根据节点数量采用不同策略
        const nodeCount = this.nodes.length;
        
        if (nodeCount <= 20) {
            // 少量节点：显示全部，适度缩放
            this.performTraditionalFit();
        } else if (nodeCount <= 50) {
            // 中等数量：智能缩放，确保可读性
            this.performReadableFit();
        } else {
            // 大量节点：聚焦核心区域
            this.performFocusedFit();
        }
    }
    
    // 传统适应视图：显示所有节点（适用于少量节点）
    performTraditionalFit() {
        if (!this.g) return;
        
        const bounds = this.g.node().getBBox();
        if (bounds.width === 0 || bounds.height === 0) {
            // 节点可能还在布局中，稍后重试
            setTimeout(() => this.performTraditionalFit(), 500);
            return;
        }
        
        const fullWidth = this.width;
        const fullHeight = this.height;
        const width = bounds.width;
        const height = bounds.height;
        const midX = bounds.x + width / 2;
        const midY = bounds.y + height / 2;
        
        const scale = Math.min(
            0.85 / (width / fullWidth), 
            0.85 / (height / fullHeight),
            2.0  // 最大放大2倍
        );
        const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
        
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
    
    // 可读性优先适应：确保节点和文字清晰可读
    performReadableFit() {
        if (!this.g) return;
        
        // 设置最小可读缩放比例
        const minReadableScale = 0.6;
        const maxComfortableScale = 1.5;
        
        const bounds = this.g.node().getBBox();
        if (bounds.width === 0 || bounds.height === 0) {
            setTimeout(() => this.performReadableFit(), 500);
            return;
        }
        
        const fullWidth = this.width;
        const fullHeight = this.height;
        const width = bounds.width;
        const height = bounds.height;
        const midX = bounds.x + width / 2;
        const midY = bounds.y + height / 2;
        
        // 计算理想缩放比例，但限制在可读范围内
        let scale = Math.min(
            0.8 / (width / fullWidth), 
            0.8 / (height / fullHeight)
        );
        
        // 确保缩放在可读范围内
        scale = Math.max(minReadableScale, Math.min(scale, maxComfortableScale));
        
        const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
        
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
    
    // 聚焦核心区域：智能选择最重要的节点区域进行显示
    performFocusedFit() {
        if (!this.g) return;
        
        // 分析节点的连接度，找到核心区域
        const nodeConnections = new Map();
        
        // 计算每个节点的连接数
        this.nodes.forEach(node => {
            nodeConnections.set(node.id, 0);
        });
        
        this.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            nodeConnections.set(sourceId, (nodeConnections.get(sourceId) || 0) + 1);
            nodeConnections.set(targetId, (nodeConnections.get(targetId) || 0) + 1);
        });
        
        // 找到连接度最高的节点作为核心
        const sortedNodes = this.nodes
            .map(node => ({
                ...node,
                connections: nodeConnections.get(node.id) || 0
            }))
            .sort((a, b) => b.connections - a.connections);
        
        // 选择前30%的重要节点或至少10个节点
        const importantNodeCount = Math.max(10, Math.floor(this.nodes.length * 0.3));
        const focusNodes = sortedNodes.slice(0, importantNodeCount);
        
        if (focusNodes.length === 0) {
            this.performReadableFit();
            return;
        }
        
        // 计算这些重要节点的边界
        const xs = focusNodes.map(n => n.x).filter(x => x != null);
        const ys = focusNodes.map(n => n.y).filter(y => y != null);
        
        if (xs.length === 0 || ys.length === 0) {
            setTimeout(() => this.performFocusedFit(), 500);
            return;
        }
        
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        
        // 添加边距
        const padding = 100;
        const focusWidth = (maxX - minX) + padding * 2;
        const focusHeight = (maxY - minY) + padding * 2;
        const focusCenterX = (minX + maxX) / 2;
        const focusCenterY = (minY + maxY) / 2;
        
        // 计算合适的缩放和位移
        const scale = Math.min(
            0.9 / (focusWidth / this.width),
            0.9 / (focusHeight / this.height),
            1.8  // 最大缩放限制
        );
        
        const translate = [
            this.width / 2 - scale * focusCenterX,
            this.height / 2 - scale * focusCenterY
        ];
        
        this.svg.transition()
            .duration(1000)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
    
    // 重新启动仿真
    restabilize() {
        if (this.simulation) {
            this.simulation.alpha(0.3).restart();
        }
    }
    
    // 获取当前使用的视图策略信息
    getViewStrategy() {
        const nodeCount = this.nodes.length;
        if (nodeCount <= 20) {
            return {
                strategy: 'traditional',
                description: '传统视图：显示所有节点',
                nodeCount: nodeCount
            };
        } else if (nodeCount <= 50) {
            return {
                strategy: 'readable',
                description: '可读性优先：确保节点清晰',
                nodeCount: nodeCount
            };
        } else {
            return {
                strategy: 'focused',
                description: '聚焦核心：显示重要节点区域',
                nodeCount: nodeCount
            };
        }
    }
    
    // 强制使用传统适应视图（显示全部节点）
    fitAll() {
        this.performTraditionalFit();
    }
    
    // 窗口大小改变
    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        
        if (this.svg) {
            this.svg
                .attr("width", this.width)
                .attr("height", this.height);
        }
        
        if (this.simulation) {
            this.simulation.force("center", d3.forceCenter(this.width / 2, this.height / 2));
            this.simulation.restart();
        }
    }
    
    // 事件回调设置
    onNodeClick = null;
    onBackgroundClick = null;
    
    // 获取节点层级信息（调试用）
    getNodeHierarchyInfo() {
        if (!this.allNodes) return null;
        
        const hierarchyStats = {};
        this.allNodes.forEach(node => {
            const level = node.hierarchyLevel || 0;
            if (!hierarchyStats[level]) {
                hierarchyStats[level] = { count: 0, nodes: [], avgSize: 0 };
            }
            hierarchyStats[level].count++;
            hierarchyStats[level].nodes.push({
                id: node.id,
                name: node.name || node.label,
                size: node.size
            });
        });
        
        // 计算每层的平均大小
        Object.keys(hierarchyStats).forEach(level => {
            const levelData = hierarchyStats[level];
            const totalSize = levelData.nodes.reduce((sum, node) => sum + node.size, 0);
            levelData.avgSize = totalSize / levelData.count;
        });
        
        return hierarchyStats;
    }
    
    // 清理资源
    destroy() {
        if (this.simulation) {
            this.simulation.stop();
        }
        if (this.svg) {
            this.svg.remove();
        }
    }
}

// 导出给主模块使用
window.D3NetworkGraph = D3NetworkGraph;
window.D3Graph = D3NetworkGraph; 