import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Partners';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/partners" title={text("渠道伙伴合作", "Partner with JitAI")} description={text("欢迎软件服务商、系统集成商和行业团队交流合作意向。", "Discuss collaboration with JitAI as a software provider, system integrator or industry specialist.")}><Content /></MarketingLayout>;
}
