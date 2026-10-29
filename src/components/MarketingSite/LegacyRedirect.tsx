import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import { useMarketingCopy } from './copy';

// Keep published marketing URLs usable after reorganizing the site.
export default function LegacyRedirect({ to }: { to: string }) {
  const { path, text } = useMarketingCopy();
  const destination = path(to);
  useEffect(() => {
    const target = new URL(destination, window.location.origin);
    target.search = window.location.search;
    if (!target.hash) target.hash = window.location.hash;
    window.location.replace(target.href);
  }, [destination]);
  return <>
    <Head><meta name="robots" content="noindex, follow" /><link rel="canonical" href={`https://jit.pro${destination}`} /></Head>
    <main style={{ padding: '48px 24px', maxWidth: 900, margin: 'auto' }}>
      <h1>{text('页面已更新', 'This page has moved')}</h1>
      <a href={destination}>{text('前往新版页面', 'Continue to the updated page')}</a>
    </main>
  </>;
}
