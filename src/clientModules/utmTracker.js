/**
 * UTM Parameters Tracker
 * 自动捕获并缓存 UTM 参数 30 天
 * 
 * 支持的 UTM 参数：
 * - utm_source: 流量来源
 * - utm_medium: 营销媒介
 * - utm_campaign: 营销活动名称
 * - utm_term: 关键词
 * - utm_content: 广告内容
 * - utm_id: 营销活动 ID
 */

const UTM_STORAGE_KEY = 'jitai_utm_params';
const UTM_EXPIRY_DAYS = 30;
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];

/**
 * 从 URL 中提取 UTM 参数
 */
function extractUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  let hasParams = false;

  UTM_PARAMS.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
      hasParams = true;
    }
  });

  return hasParams ? utmParams : null;
}

/**
 * 保存 UTM 参数到 localStorage
 */
function saveUTMParams(params) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + UTM_EXPIRY_DAYS);

  const data = {
    params: params,
    expiry: expiryDate.getTime(),
    firstSeen: new Date().toISOString()
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
    console.log('[UTM Tracker] UTM 参数已保存，有效期至：', expiryDate.toLocaleString());
  } catch (error) {
    console.error('[UTM Tracker] 保存 UTM 参数失败：', error);
  }
}

/**
 * 从 localStorage 读取 UTM 参数
 */
function loadUTMParams() {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const now = new Date().getTime();

    // 检查是否过期
    if (now > data.expiry) {
      console.log('[UTM Tracker] UTM 参数已过期，已清除');
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[UTM Tracker] 读取 UTM 参数失败：', error);
    return null;
  }
}

/**
 * 获取当前有效的 UTM 参数
 */
export function getUTMParams() {
  const data = loadUTMParams();
  return data ? data.params : null;
}

/**
 * 清除保存的 UTM 参数
 */
export function clearUTMParams() {
  localStorage.removeItem(UTM_STORAGE_KEY);
  console.log('[UTM Tracker] UTM 参数已清除');
}

/**
 * 给 URL 添加 UTM 参数
 * @param {string} url - 原始 URL
 * @returns {string} - 添加了 UTM 参数的 URL
 */
export function addUTMToUrl(url) {
  if (!url) return url;
  
  const utmParams = getUTMParams();
  if (!utmParams || Object.keys(utmParams).length === 0) {
    return url;
  }

  try {
    const urlObj = new URL(url, window.location.origin);
    
    // 添加 UTM 参数到 URL
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(key, value);
      }
    });

    return urlObj.toString();
  } catch (error) {
    console.error('[UTM Tracker] URL 解析失败：', error);
    return url;
  }
}

/**
 * 为页面上的 demo.jit.pro 链接添加 UTM 参数
 */
function updateDemoLinks() {
  const utmParams = getUTMParams();
  if (!utmParams || Object.keys(utmParams).length === 0) {
    return;
  }

  // 查找所有指向 demo.jit.pro 的链接
  const links = document.querySelectorAll('a[href*="demo.jit.pro"]');
  
  links.forEach(link => {
    const originalHref = link.getAttribute('href');
    if (originalHref && !link.dataset.utmProcessed) {
      const newHref = addUTMToUrl(originalHref);
      link.setAttribute('href', newHref);
      link.dataset.utmProcessed = 'true';
    }
  });

  if (links.length > 0) {
    console.log('[UTM Tracker] 已为', links.length, '个链接添加 UTM 参数');
  }
}

/**
 * 初始化 UTM 追踪器
 */
function initUTMTracker() {
  // 检查当前 URL 是否包含 UTM 参数
  const currentUTMParams = extractUTMParams();
  
  if (currentUTMParams) {
    // 如果当前 URL 有 UTM 参数，保存（覆盖旧的）
    saveUTMParams(currentUTMParams);
    console.log('[UTM Tracker] 检测到新的 UTM 参数：', currentUTMParams);
  } else {
    // 如果当前 URL 没有 UTM 参数，检查是否有已保存的参数
    const storedData = loadUTMParams();
    if (storedData) {
      const remainingDays = Math.ceil((storedData.expiry - new Date().getTime()) / (1000 * 60 * 60 * 24));
      console.log('[UTM Tracker] 使用已保存的 UTM 参数，剩余有效期：', remainingDays, '天');
      console.log('[UTM Tracker] 参数详情：', storedData.params);
    }
  }

  // 更新页面上的 demo.jit.pro 链接
  updateDemoLinks();

  // 监听 DOM 变化，处理动态加载的链接
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      updateDemoLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// 页面加载时自动执行
if (typeof window !== 'undefined') {
  // 确保在 DOM 加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUTMTracker);
  } else {
    initUTMTracker();
  }

  // 将工具函数暴露到全局对象（方便调试和外部调用）
  window.jitaiUTM = {
    getParams: getUTMParams,
    clearParams: clearUTMParams,
    addUTMToUrl: addUTMToUrl,
    init: initUTMTracker
  };
}

export default initUTMTracker;

