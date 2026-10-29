import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Home';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { brand } = useMarketingCopy();
  return <MarketingLayout route="/" title={brand.title} description={brand.description}><Content /></MarketingLayout>;
}
