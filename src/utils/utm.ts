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

// TypeScript 类型声明
declare global {
  interface Window {
    jitaiUTM?: {
      getParams: () => Record<string, string> | null;
      clearParams: () => void;
      addUTMToUrl: (url: string) => string;
      init: () => void;
    };
  }
}

