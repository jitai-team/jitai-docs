import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Whitepaper';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/whitepaper" title={text("技术白皮书", "Technical whitepaper")} description={text("了解 JitAI 元素化架构、自描述机制与开发运行反馈闭环。", "Explore JitAI element architecture, self-description and continuous development and runtime feedback.")}><Content /></MarketingLayout>;
}
