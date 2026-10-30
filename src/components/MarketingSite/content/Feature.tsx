import React from 'react';
import MarketingLayout from '..';
import { useMarketingCopy } from '../copy';
import featuresZh from './features-zh.json';
import featuresEn from './features-en.json';

function EmphasizedText({ value }: { value: string }) {
  const parts = value.split(/(<strong>.*?<\/strong>)/g);
  return <>{parts.map((part, index) => part.startsWith('<strong>')
    ? <strong key={index}>{part.slice(8, -9)}</strong>
    : <React.Fragment key={index}>{part}</React.Fragment>)}</>;
}

export default function Feature({ slug }: { slug: string }) {
  const { isZh, text, path } = useMarketingCopy();
  const features = isZh ? featuresZh : featuresEn;
  const feature = features.find(item => item.slug === slug);
  if (!feature) return null;

  return <MarketingLayout route={`/${slug}`} title={feature.name} description={feature.desc}>
    <section className="section feature-intro"><div className="wrap">
      <div className="section-head reveal">
        <p className="kicker">{text('九大特性', 'Nine platform capabilities')} · {feature.num}</p>
        <h1 className="h1 mt-16">{feature.name}</h1>
        <p className="lead mt-16">{feature.lead}</p>
      </div>
    </div></section>

    <section className="section section-alt"><div className="wrap"><div className="grid g-2">
      <div className="marketing-card reveal">
        <h2 className="h4 mb-16">{text('它是什么', 'What it is')}</h2>
        <p className="small mb-16">{feature.what}</p>
        <ul className="checklist">{feature.what_points.map(point => <li key={point}>{point}</li>)}</ul>
      </div>
      <div className="marketing-card card-warn reveal">
        <h2 className="h4 mb-16">{text('没有它会怎样', 'Without it')}</h2>
        <ul className="bullets">{feature.pain.map(point => <li key={point}><EmphasizedText value={point} /></li>)}</ul>
      </div>
    </div></div></section>

    <section className="section"><div className="wrap">
      <div className="section-head reveal"><p className="kicker">{text('如何实现', 'How it works')}</p>
        <h2 className="h2 mt-16">{text('JitAI 怎么做到', 'How JitAI makes it work')}</h2>
      </div>
      <div className="grid g-2">{feature.how.map(([title, description]) => <div key={title} className="marketing-card card-flat reveal"><h3 className="h5">{title}</h3><p className="small mt-8">{description}</p></div>)}</div>
      <p className="quote-line mt-32 reveal">{feature.quote}</p>
    </div></section>

    <section className="section section-alt"><div className="wrap">
      <div className="section-head reveal"><p className="kicker">{text('继续了解', 'Explore more')}</p><h2 className="h2 mt-16">{text('九大特性', 'Nine platform capabilities')}</h2></div>
      <div className="grid g-3">{features.map(item => item.slug === slug
        ? <div key={item.slug} className="marketing-card card-ok reveal" aria-current="page"><h3 className="h5">{item.name}</h3><p className="small mt-8">{item.grid}</p><p className="small mt-8 accent">{text('当前页面', 'Current page')}</p></div>
        : <a key={item.slug} className="marketing-card card-flat feature-card reveal" href={path(`/${item.slug}`)}><h3 className="h5">{item.name}</h3><p className="small mt-8">{item.grid}</p><span className="feature-more">{text('了解详情', 'Explore feature')} <span aria-hidden="true">→</span></span></a>)}</div>
      <div className="btn-row mt-32 feature-actions"><a className="btn btn-primary" href={path('/whitepaper')}>{text('阅读技术白皮书', 'Read the technical whitepaper')}</a><a className="btn btn-ghost" href={path('/contact')}>{text('预约企业落地沟通', 'Discuss your rollout')}</a></div>
    </div></section>
  </MarketingLayout>;
}
