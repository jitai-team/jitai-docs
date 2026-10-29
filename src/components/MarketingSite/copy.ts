import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BRAND_COPY } from '../../brand';
import english from './content/en.json';

export function useMarketingCopy() {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh';
  const text = (zh: string, en: string) => isZh ? zh : en;
  const path = (route: string) => isZh ? `/zh${route === '/' ? '/' : route}` : route;
  const t = (source: keyof typeof english) => isZh ? source : `${english[source]} `;
  return { isZh, text, path, t, brand: BRAND_COPY[isZh ? 'zh' : 'en'] };
}

export const CONTACT_EMAIL = 'support@jit.pro';
export const WECHAT_IMAGE = '/img/marketing/wechat.jpg';
export const FORUM_URL = 'https://forum.jit.pro';
export const LOGO_LIGHT = 'https://jit-www.oss-accelerate.aliyuncs.com/logo/logo_title.svg';
export const LOGO_DARK = 'https://jit-www.oss-accelerate.aliyuncs.com/logo/logo_title_dark.svg';
