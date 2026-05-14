import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type RootProps = { children?: React.ReactNode };

export default function Root({children}: RootProps) {
  const {i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale.startsWith('zh');

  const title = isZh
    ? 'JitAI - 企业级 AI 智能体平台'
    : 'JitAI - Enterprise AI Agent Platform';

  const description = isZh
    ? 'JitAI 是企业级 AI 智能体平台，帮助企业快速构建 AI 智能体，赋能核心业务岗位，提升企业业务运转效率。'
    : 'JitAI is an enterprise-grade AI agent platform for building AI agents that empower core business roles and improve operational efficiency.';

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
  }, [title, description]);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-K39JND5X"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      {children}
    </>
  );
}
