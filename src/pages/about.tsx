import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/About';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/about" title={text("关于我们", "About JitAI")} description={text("让企业拥有可控、可持续进化的 AI 业务大脑。", "Give enterprises AI business systems they can control and continuously evolve.")}><Content /></MarketingLayout>;
}
