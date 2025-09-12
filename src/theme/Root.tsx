import React from 'react';
import Head from '@docusaurus/Head';
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

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      {children}
    </>
  );
}



