/**
 * 数据加载器 - 专门负责数据获取和转换
 * 职责：从远程API或文件加载数据，格式转换，数据验证
 */

class DataLoader {
    /**
     * 加载知识图谱数据
     * @returns {Promise<Object>} 图谱数据对象
     */
    static async loadKnowledgeGraphData() {
        try {
            // 显示加载状态
            if (window.showTempMessage) {
                showTempMessage('正在加载数据...', AppConfig.MESSAGE_TYPES.INFO);
            }
            
            // 获取数据
            const response = await fetch(AppConfig.DATA_PATH);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const rawData = await response.json();
            
            // 验证数据格式
            this.validateDataFormat(rawData);
            
            // 转换数据格式
            const transformedData = this.transformNeo4jData(rawData);
            
            return transformedData;
            
        } catch (error) {
            if (window.showTempMessage) {
                showTempMessage(`数据加载失败: ${error.message}`, AppConfig.MESSAGE_TYPES.ERROR);
            }
            
            return this.getEmptyDataStructure();
        }
    }
    
    /**
     * 验证数据格式
     * @param {Object} data - 原始数据
     */
    static validateDataFormat(data) {
        if (!ValidationUtils.isValidObject(data)) {
            throw new Error('数据格式无效：不是有效的JSON对象');
        }
        
        if (!data.entities && !data.nodes) {
            throw new Error('数据格式无效：缺少实体/节点数据');
        }
        
        if (!data.relations && !data.edges && !data.links) {
            throw new Error('数据格式无效：缺少关系/边数据');
        }
    }
    
    /**
     * 转换Neo4j格式数据为D3格式
     * @param {Object} rawData - 原始数据
     * @returns {Object} 转换后的数据
     */
    static transformNeo4jData(rawData) {
        try {
            const entities = rawData.entities || rawData.nodes || [];
            const relations = rawData.relations || rawData.edges || rawData.links || [];
            
            const nodes = this.transformEntities(entities);
            const edges = this.transformRelations(relations);
            
            const result = {
                nodes: nodes.filter(node => node !== null),
                edges: edges.filter(edge => edge !== null)
            };
            
            return result;
            
        } catch (error) {
            throw new Error(`数据转换失败: ${error.message}`);
        }
    }
    
    /**
     * 转换实体数据为节点格式
     * @param {Array} entities - 实体数组
     * @returns {Array} 节点数组
     */
    static transformEntities(entities) {
        if (!ValidationUtils.isValidArray(entities)) {
            return [];
        }
        
        return entities.map(entity => {
            if (!ValidationUtils.isValidObject(entity)) {
                return null;
            }
            
            return {
                id: entity.name || entity.id || StringUtils.generateId(),
                name: entity.name || '未命名节点',
                type: entity.type || entity.entityType || 'unknown',
                observations: entity.observations || [],
                original: entity
            };
        });
    }
    
    /**
     * 转换关系数据为边格式
     * @param {Array} relations - 关系数组
     * @returns {Array} 边数组
     */
    static transformRelations(relations) {
        if (!ValidationUtils.isValidArray(relations)) {
            return [];
        }
        
        return relations.map(relation => {
            if (!ValidationUtils.isValidObject(relation)) {
                return null;
            }
            
            return {
                id: StringUtils.generateId(),
                source: relation.from || relation.source || relation.start,
                target: relation.to || relation.target || relation.end,
                type: relation.relationType || relation.type || 'unknown',
                label: relation.relationType || relation.type || 'unknown',
                original: relation
            };
        });
    }
    
    /**
     * 获取空数据结构
     * @returns {Object} 空数据结构
     */
    static getEmptyDataStructure() {
        return {
            nodes: [],
            edges: []
        };
    }
    
    /**
     * 预处理数据
     * @param {Object} data - 原始数据
     * @returns {Object} 预处理后的数据
     */
    static preprocessData(data) {
        if (!data || !data.nodes) {
            return this.getEmptyDataStructure();
        }
        
        const processedData = {
            nodes: this.preprocessNodes(data.nodes),
            edges: this.preprocessEdges(data.edges || [])
        };
        
        // 构建索引
        processedData.nodeMap = new Map();
        processedData.nodes.forEach(node => {
            processedData.nodeMap.set(node.id, node);
        });
        
        // 验证边的有效性
        processedData.edges = processedData.edges.filter(edge => {
            const sourceExists = processedData.nodeMap.has(edge.source);
            const targetExists = processedData.nodeMap.has(edge.target);
            return sourceExists && targetExists;
        });
        
        return processedData;
    }
    
    /**
     * 预处理节点数据
     * @param {Array} nodes - 节点数组
     * @returns {Array} 预处理后的节点数组
     */
    static preprocessNodes(nodes) {
        if (!ValidationUtils.isValidArray(nodes)) {
            return [];
        }
        
        return nodes.map(node => {
            if (!ValidationUtils.isValidObject(node)) {
                return null;
            }
            
            return {
                ...node,
                id: String(node.id || node.name || StringUtils.generateId()),
                name: String(node.name || node.id || '未命名'),
                type: String(node.type || 'unknown'),
                observations: Array.isArray(node.observations) ? node.observations : []
            };
        }).filter(node => node !== null);
    }
    
    /**
     * 预处理边数据
     * @param {Array} edges - 边数组
     * @returns {Array} 预处理后的边数组
     */
    static preprocessEdges(edges) {
        if (!ValidationUtils.isValidArray(edges)) {
            return [];
        }
        
        return edges.map(edge => {
            if (!ValidationUtils.isValidObject(edge)) {
                return null;
            }
            
            return {
                ...edge,
                id: edge.id || StringUtils.generateId(),
                source: String(edge.source || edge.from),
                target: String(edge.target || edge.to),
                type: String(edge.type || edge.relationType || 'unknown')
            };
        }).filter(edge => edge !== null && edge.source && edge.target);
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataLoader;
} else {
    window.DataLoader = DataLoader;
} 