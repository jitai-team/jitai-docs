import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type RootProps = { children?: React.ReactNode };

export default function Root({children}: RootProps) {
  const {i18n} = useDocusaurusContext();
  const isZh = i18n.currentLocale.startsWith('zh');

  const title = isZh
    ? '下一代AI应用开发技术体系'
    : 'Next-Gen AI App Development Technology';

  const description = isZh
    ? 'JitAI全球首创解释型应用架构，让AI智能体实时感知与编排系统，开发效率提升10倍！立即体验智能开发新时代。'
    : "JitAI: The world's first interpreted app framework enabling AI agents to perceive and orchestrate systems in real-time, boosting development efficiency by 10x! Experience the new era of intelligent development now.";

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



