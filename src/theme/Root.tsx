import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { BRAND_COPY } from '../brand';

type RootProps = { children?: React.ReactNode };

export default function Root({children}: RootProps) {
  const {i18n} = useDocusaurusContext();
  const { pathname } = useLocation();
  const pagePath = pathname.replace(/^\/zh(?=\/|$)/, '').replace(/\/$/, '') || '/';
  const hasPageMetadata = ['/', '/solutions', '/whitepaper', '/cases', '/partners', '/about', '/contact', '/download', '/privacy', '/terms-of-service'].includes(pagePath) || /^\/feature-(auto|twin|ai-native|private|dual-mode|robust|evolving|governance|dialog-code)$/.test(pagePath);
  const isZh = i18n.currentLocale.startsWith('zh');

  const { title, description } = BRAND_COPY[isZh ? 'zh' : 'en'];

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncPreferredLanguage = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const localeLink = target.closest<HTMLAnchorElement>('a[lang]');
      const lang = localeLink?.getAttribute('lang');
      if (lang !== 'en' && lang !== 'zh') {
        return;
      }

      try {
        window.localStorage.setItem('jitai-preferred-language', lang);
      } catch {
        // Ignore storage failures and let the normal locale link continue.
      }
    };

    document.addEventListener('click', syncPreferredLanguage, true);
    return () => {
      document.removeEventListener('click', syncPreferredLanguage, true);
    };
  }, []);

  useEffect(() => {
    // Update meta tags dynamically
    // Marketing pages own their localized metadata; do not overwrite it after hydration.
    if (hasPageMetadata) return;
    const updateMetaTag = (name: string, content: string, attributeType?: string) => {
      const isProperty = attributeType === 'property';
      let meta = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
  }, [title, description, hasPageMetadata]);

  return (
    <>
      {/* 暂停加载 Google Tag Manager 的 noscript iframe，避免第三方请求影响页面加载速度。
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-K39JND5X"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      */}
      {children}
    </>
  );
}
