import React from 'react';
import { useMarketingCopy, CONTACT_EMAIL, FORUM_URL, LOGO_DARK, LOGO_LIGHT } from './copy';

export default function Footer({ theme }: { theme: 'light' | 'dark' }) {
  const { text, path } = useMarketingCopy();
  const groups = [
    { title: text('产品与技术', 'Product & technology'), links: [
      ['/whitepaper', text('技术白皮书', 'Technical whitepaper')], ['/solutions', text('解决方案', 'Solutions')], ['/download', text('桌面端与服务器下载', 'Desktop & server downloads')],
    ] },
    { title: text('合作与场景', 'Partnerships & scenarios'), links: [
      ['/partners', text('渠道伙伴合作', 'Partner with JitAI')], ['/cases', text('场景示例', 'Scenario examples')], ['/contact', text('商务交流', 'Talk to our team')],
    ] },
    { title: text('关于', 'About'), links: [
      ['/about', text('关于我们', 'About JitAI')], [FORUM_URL, text('论坛', 'Forum')], ['/privacy', text('隐私协议', 'Privacy policy')], ['/terms-of-service', text('服务条款', 'Terms of service')],
    ] },
  ];
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-top">
      <div className="footer-brand">
        <a className="brand" href={path('/')}><img className="official-logo" src={theme === 'dark' ? LOGO_DARK : LOGO_LIGHT} alt="JitAI" width="112" height="34" /></a>
        <p>{text('AI 时代开发和运行一体化平台。让企业拥有可持续进化的 AI 业务大脑。', 'One platform for development and operations. Build business AI that evolves with your enterprise.')}</p>
        <div className="tag-row mt-16"><span className="tag">{text('业务系统 AI 原生', 'AI-native systems')}</span><span className="tag">{text('开发过程 AI 原生', 'AI-native development')}</span></div>
      </div>
      {groups.map(group => <div className="footer-col" key={group.title}><h2 className="h5">{group.title}</h2><ul>{group.links.map(([url, label]) => <li key={url}><a href={url.startsWith('/') ? path(url) : url}>{label}</a></li>)}</ul></div>)}
    </div>
    <div className="footer-bottom">
      <div>© {new Date().getFullYear()} JitAI. {text('保留所有权利。', 'All rights reserved.')}</div>
      <nav aria-label={text('联系与备案', 'Contact and registration')}>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">鄂ICP备18017077号-7</a>
      </nav>
    </div>
  </div></footer>;
}
