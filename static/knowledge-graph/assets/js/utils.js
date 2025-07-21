/**
 * 工具函数库 - 通用辅助函数
 * 职责：提供可复用的工具函数，支持其他模块
 */

/**
 * DOM操作工具
 */
const DOMUtils = {
    /**
     * 安全获取DOM元素
     * @param {string} selector - CSS选择器
     * @returns {Element|null}
     */
    safeGetElement(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            return null;
        }
    },

    /**
     * 安全获取多个DOM元素
     * @param {string} selector - CSS选择器
     * @returns {NodeList}
     */
    safeGetElements(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            return [];
        }
    },

    /**
     * 添加CSS类
     * @param {Element} element - DOM元素
     * @param {string} className - CSS类名
     */
    addClass(element, className) {
        if (element && element.classList) {
            element.classList.add(className);
        }
    },

    /**
     * 移除CSS类
     * @param {Element} element - DOM元素
     * @param {string} className - CSS类名
     */
    removeClass(element, className) {
        if (element && element.classList) {
            element.classList.remove(className);
        }
    },

    /**
     * 切换CSS类
     * @param {Element} element - DOM元素
     * @param {string} className - CSS类名
     */
    toggleClass(element, className) {
        if (element && element.classList) {
            element.classList.toggle(className);
        }
    },

    /**
     * 检查是否包含CSS类
     * @param {Element} element - DOM元素
     * @param {string} className - CSS类名
     * @returns {boolean}
     */
    hasClass(element, className) {
        return element && element.classList && element.classList.contains(className);
    }
};

/**
 * 字符串处理工具
 */
const StringUtils = {
    /**
     * 截断文本
     * @param {string} text - 原文本
     * @param {number} maxLength - 最大长度
     * @param {string} suffix - 后缀
     * @returns {string}
     */
    truncate(text, maxLength = 50, suffix = '...') {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length) + suffix;
    },

    /**
     * 转义HTML字符
     * @param {string} text - 原文本
     * @returns {string}
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * 移除HTML标签
     * @param {string} html - HTML字符串
     * @returns {string}
     */
    stripHtml(html) {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },

    /**
     * 首字母大写
     * @param {string} str - 字符串
     * @returns {string}
     */
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * 生成唯一ID
     * @param {string} prefix - 前缀
     * @returns {string}
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};

/**
 * 数组和对象工具
 */
const CollectionUtils = {
    /**
     * 数组去重
     * @param {Array} array - 原数组
     * @returns {Array}
     */
    unique(array) {
        return [...new Set(array)];
    },

    /**
     * 深度克隆对象
     * @param {*} obj - 要克隆的对象
     * @returns {*}
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
        return obj;
    },

    /**
     * 按属性分组
     * @param {Array} array - 数组
     * @param {string} key - 分组键
     * @returns {Object}
     */
    groupBy(array, key) {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },

    /**
     * 检查对象是否为空
     * @param {Object} obj - 对象
     * @returns {boolean}
     */
    isEmpty(obj) {
        if (!obj) return true;
        if (Array.isArray(obj)) return obj.length === 0;
        return Object.keys(obj).length === 0;
    }
};

/**
 * 延迟和异步工具
 */
const AsyncUtils = {
    /**
     * 延迟执行
     * @param {number} ms - 延迟时间（毫秒）
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 时间限制
     * @returns {Function}
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * 验证工具
 */
const ValidationUtils = {
    /**
     * 检查是否为有效字符串
     * @param {*} value - 值
     * @returns {boolean}
     */
    isValidString(value) {
        return typeof value === 'string' && value.trim().length > 0;
    },

    /**
     * 检查是否为有效数组
     * @param {*} value - 值
     * @returns {boolean}
     */
    isValidArray(value) {
        return Array.isArray(value) && value.length > 0;
    },

    /**
     * 检查是否为有效对象
     * @param {*} value - 值
     * @returns {boolean}
     */
    isValidObject(value) {
        return value && typeof value === 'object' && !Array.isArray(value);
    },

    /**
     * 检查是否为函数
     * @param {*} value - 值
     * @returns {boolean}
     */
    isFunction(value) {
        return typeof value === 'function';
    }
};



// 导出工具函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DOMUtils,
        StringUtils,
        CollectionUtils,
        AsyncUtils,
        ValidationUtils
    };
} else {
    // 浏览器环境
    window.DOMUtils = DOMUtils;
    window.StringUtils = StringUtils;
    window.CollectionUtils = CollectionUtils;
    window.AsyncUtils = AsyncUtils;
    window.ValidationUtils = ValidationUtils;
} 