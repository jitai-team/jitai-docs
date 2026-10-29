import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
import Chinese from '@site/src/components/LegalDocuments/terms-of-service-zh.mdx';
import English from '@site/src/components/LegalDocuments/terms-of-service-en.mdx';
export default function Page() {
  const { isZh, text } = useMarketingCopy();
  const Content = isZh ? Chinese : English;
  return <MarketingLayout route="/terms-of-service" title={text('服务条款', 'Terms of service')} description={text('JitAI 服务条款', 'JitAI Terms of service')}><article className="legal-copy"><Content /></article></MarketingLayout>;
}
