/**
 * UTM 工具函数
 * 用于在组件中处理 UTM 参数
 */

/**
 * 给 URL 添加 UTM 参数
 * @param url - 原始 URL
 * @returns 添加了 UTM 参数的 URL
 */
export function addUTMToUrl(url: string): string {
  console.error('aiaddUTMToUrl========================', url);
  if (typeof window === 'undefined' || !window.jitaiUTM) {
    return url;
  }
  
  return window.jitaiUTM.addUTMToUrl(url);
}

/**
 * 处理带 UTM 参数的链接点击
 * @param url - 原始 URL
 * @param target - 打开方式，默认 '_blank'
 */
export function navigateWithUTM(url: string, target: string = '_blank'): void {
  const urlWithUTM = addUTMToUrl(url);
  
  if (target === '_blank') {
    window.open(urlWithUTM, '_blank');
  } else {
    window.location.href = urlWithUTM;
  }
}

/**
 * 获取当前保存的 UTM 参数
 * @returns UTM 参数对象或 null
 */
export function getUTMParams(): Record<string, string> | null {
  if (typeof window === 'undefined' || !window.jitaiUTM) {
    return null;
  }
  
  return window.jitaiUTM.getParams();
}

/**
 * 获取完整的访问信息
 * @returns 访问信息对象或 null
 */
export function getVisitInfo(): VisitInfo | null {
  if (typeof window === 'undefined' || !window.jitaiUTM) {
    return null;
  }
  
  return window.jitaiUTM.getVisitInfo();
}

// TypeScript 类型定义
export interface VisitInfo {
  utm: Record<string, string>;
  firstVisit: string;
  userAgent: string;
  ip: string;
  referrer: string;
  landingPage: string;
  expiresAt: string;
  remainingDays: number;
}

// TypeScript 类型声明
declare global {
  interface Window {
    jitaiUTM?: {
      getParams: () => Record<string, string> | null;
      getVisitInfo: () => VisitInfo | null;
      clearParams: () => void;
      addUTMToUrl: (url: string) => string;
      init: () => void;
    };
  }
}

