import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
import Chinese from '@site/src/components/LegalDocuments/privacy-policy-zh.mdx';
import English from '@site/src/components/LegalDocuments/privacy-policy-en.mdx';
export default function Page() {
  const { isZh, text } = useMarketingCopy();
  const Content = isZh ? Chinese : English;
  return <MarketingLayout route="/privacy" title={text('隐私协议', 'Privacy policy')} description={text('JitAI 隐私协议', 'JitAI Privacy policy')}><article className="legal-copy"><Content /></article></MarketingLayout>;
}
