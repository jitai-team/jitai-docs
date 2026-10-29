import React, { useEffect, useState } from 'react';
import { addUTMToUrl } from '@site/src/utils/utm';
import { useMarketingCopy, CONTACT_EMAIL, WECHAT_IMAGE } from './copy';

export default function ContactSection({ id = 'contact', partner = false }: { id?: string; partner?: boolean }) {
  const { isZh, text, path } = useMarketingCopy();
  const baseUrl = `https://wy.jit.pro/whwy/aicrm/s/${isZh ? 'zhcontactus' : 'contactus'}?is_popup=1`;
  const [formUrl, setFormUrl] = useState(baseUrl);
  useEffect(() => { setFormUrl(addUTMToUrl(baseUrl)); }, [baseUrl]);
  return <section className="section section-alt" id={id}>
    <div className="wrap">
      <div className="section-head reveal"><p className="kicker">{text('联系我们', 'Contact us')}</p>
        <h2 className="h2 mt-16">{partner ? text('介绍你的合作想法', 'Tell us about your partnership idea') : text('聊聊你的企业 AI 落地计划', 'Discuss your enterprise AI plans')}</h2>
        <p className="lead mt-16">{partner ? text('留下团队背景、服务行业与合作意向，我们会与你进一步交流。', 'Share your team background, industry focus and partnership interests so we can continue the conversation.') : text('告诉我们你的业务场景、部署方式和团队现状，一起讨论适合的落地路径。', 'Share your business scenario, deployment needs and team context to explore a practical way forward.')}</p>
      </div>
      <div className="contact-grid">
        <div className="marketing-card contact-form-card">
          <div className="contact-form-heading"><h3>{text('留下需求', 'Tell us what you need')}</h3></div>
          <iframe src={formUrl} title={text('在线咨询表单', 'Online inquiry form')} className="contact-iframe" loading="lazy" />
          <div className="contact-form-footer"><p className="small">{text('表单未显示？', 'Form not displaying?')} <a className="textlink" href={formUrl} target="_blank" rel="noopener noreferrer">{text('在新窗口打开', 'Open it in a new window')}</a></p>
          <p className="small"><a className="textlink" href={path('/privacy')}>{text('隐私协议', 'Privacy policy')}</a> · <a className="textlink" href={path('/terms-of-service')}>{text('服务条款', 'Terms of service')}</a></p></div>
        </div>
        <aside className="stack gap-20">
          <div className="marketing-card"><h3 className="h4">{text('微信咨询', 'Chat on WeChat')}</h3><p className="small mt-8">{text('扫码添加，交流产品与合作需求。', 'Scan to discuss product or partnership needs.')}</p><img className="wechat-qr mt-24" src={WECHAT_IMAGE} alt={text('JitAI 微信咨询二维码', 'JitAI WeChat contact QR code')} width="280" height="280" loading="lazy" /></div>
          <div className="marketing-card"><h3 className="h4">{text('邮件联系', 'Email us')}</h3><p className="small mt-16"><a className="textlink" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p><p className="small mt-8">{text('产品咨询、技术支持与合作沟通。', 'Product questions, technical support and partnerships.')}</p></div>
        </aside>
      </div>
    </div>
  </section>;
}
