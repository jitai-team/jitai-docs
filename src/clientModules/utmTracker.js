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

  UTM_PARAMS.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
}

/**
 * 获取客户端 IP 地址（通过第三方 API）
 */
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      timeout: 3000
    });
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.warn('[UTM Tracker] 无法获取 IP 地址：', error);
    return 'unknown';
  }
}

/**
 * 保存 UTM 参数和访问信息到 localStorage
 */
async function saveUTMParams(params) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + UTM_EXPIRY_DAYS);
  const now = new Date().toISOString();

  // 获取 IP 地址（异步）
  const ip = await getClientIP();

  const data = {
    params: params,
    expiry: expiryDate.getTime(),
    firstVisit: now,
    firstSeen: now, // 保持兼容性
    userAgent: navigator.userAgent || 'unknown',
    ip: ip,
    referrer: document.referrer || 'direct',
    landingPage: window.location.href
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
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
 * 获取完整的访问信息（包括 UTM 参数和访问详情）
 */
export function getVisitInfo() {
  const data = loadUTMParams();
  if (!data) return null;
  
  return {
    utm: data.params,
    firstVisit: data.firstVisit,
    userAgent: data.userAgent,
    ip: data.ip,
    referrer: data.referrer,
    landingPage: data.landingPage,
    expiresAt: new Date(data.expiry).toISOString(),
    remainingDays: Math.ceil((data.expiry - new Date().getTime()) / (1000 * 60 * 60 * 24))
  };
}

/**
 * 清除保存的 UTM 参数
 */
export function clearUTMParams() {
  localStorage.removeItem(UTM_STORAGE_KEY);
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
 * 初始化 UTM 追踪器
 */
async function initUTMTracker() {
  // 检查是否已有保存的数据
  const storedData = loadUTMParams();
  
  // 如果已有存储数据，不覆盖，继续使用首次访问信息
  if (storedData) {
    return; // 已有数据，不再保存新数据
  }
  
  // 首次访问，保存数据
  const currentUTMParams = extractUTMParams();
  await saveUTMParams(currentUTMParams);
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
    getVisitInfo: getVisitInfo,
    clearParams: clearUTMParams,
    addUTMToUrl: addUTMToUrl,
    init: initUTMTracker
  };
}

export default initUTMTracker;

