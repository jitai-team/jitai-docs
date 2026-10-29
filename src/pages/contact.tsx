import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import ContactSection from '@site/src/components/MarketingSite/ContactSection';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function ContactPage() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/contact" title={text('联系我们', 'Contact us')} description={text('联系 JitAI，交流产品、部署与合作需求。', 'Contact JitAI to discuss products, deployment and partnerships.')}>
    <section className="section"><div className="wrap"><p className="kicker">JitAI</p><h1 className="h1 mt-16">{text('联系我们', 'Contact us')}</h1></div></section>
    <ContactSection />
  </MarketingLayout>;
}
