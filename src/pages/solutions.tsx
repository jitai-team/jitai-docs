import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Solutions';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/solutions" title={text("解决方案", "Solutions")} description={text("面向销售、采购、库存、生产、财务与风险管理的 AI 原生解决方案。", "AI-native solutions for sales, procurement, inventory, production, finance and risk management.")}><Content /></MarketingLayout>;
}
