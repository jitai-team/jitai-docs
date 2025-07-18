// 知识图谱配置管理
class GraphConfig {
    static theme = {
        colors: {
            node: {
                primary: '#68B3E8',
                primaryBorder: '#4A90B8',
                highlight: '#5A9FD4',
                highlightBorder: '#3D7BA8',
                hover: '#7BC3F0',
                hoverBorder: '#5FA0C8',
                selected: '#FF6B35',
                selectedBorder: '#FF4500',
                disabled: '#E0E0E0',
                disabledBorder: '#CCCCCC'
            },
            edge: {
                normal: 'rgba(120, 120, 120, 0.6)',
                highlight: '#FF6B35',
                hover: 'rgba(120, 120, 120, 0.8)',
                disabled: '#D0D0D0'
            },
            text: {
                primary: '#2C3E50',
                secondary: '#555555',
                background: 'rgba(255,255,255,0.7)'
            }
        },
        
        sizes: {
            node: {
                base: 20,
                min: 15,
                max: 100,
                fontRatio: 0.35
            },
            edge: {
                normal: 1.5,
                selected: 2,
                hover: 1.8
            }
        },
        
        animations: {
            particleSpeed: 0.08,
            stabilization: {
                iterations: 200,
                updateInterval: 20
            },
            transition: {
                duration: 800,
                easing: 'easeInOutQuad'
            }
        },
        
        physics: {
            gravitationalConstant: -1500,
            centralGravity: 0.08,
            springConstant: 0.06,
            damping: 0.95,
            avoidOverlap: 0.9
        }
    };
    
    static relationships = {
        hierarchical: ['包含', '支持', '管理', '运行', '遵循', '编排'],
        getHierarchicalTypes() {
            return [...this.hierarchical];
        },
        addHierarchicalType(type) {
            if (!this.hierarchical.includes(type)) {
                this.hierarchical.push(type);
            }
        }
    };
    
    static layout = {
        sidebar: {
            defaultWidth: 350,
            minWidth: 300,
            maxWidth: 500
        },
        adaptive: {
            baseIndent: 8,
            minIndentIncrement: 4,
            maxIndentIncrement: 20,
            maxTextLength: 25
        }
    };
    
    // 获取主题配置
    static getTheme(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.theme);
    }
    
    // 更新配置
    static updateConfig(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key], this);
        if (target) {
            target[lastKey] = value;
        }
    }
    
    // 重置为默认配置
    static reset() {
        // 重置逻辑
    }
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GraphConfig;
} else {
    window.GraphConfig = GraphConfig;
} 