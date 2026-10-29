import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Cases';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/cases" title={text("场景示例", "Scenario examples")} description={text("通过制造、商贸与多分支服务场景，了解 JitAI 的落地思路与预期价值。", "Explore illustrative manufacturing, distribution and multi-branch scenarios with JitAI.")}><Content /></MarketingLayout>;
}
