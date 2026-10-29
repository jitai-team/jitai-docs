import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/About';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text, brand } = useMarketingCopy();
  return <MarketingLayout route="/about" title={text("关于我们", "About JitAI")} description={brand.description}><Content /></MarketingLayout>;
}
