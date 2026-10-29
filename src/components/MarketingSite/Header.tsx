import React, { useEffect, useRef, useState } from 'react';
import { useMarketingCopy, LOGO_DARK, LOGO_LIGHT } from './copy';

export default function Header({ active, theme, toggleTheme }: {
  active: string; theme: 'light' | 'dark'; toggleTheme: () => void;
}) {
  const { text, path } = useMarketingCopy();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
    };
    const media = window.matchMedia('(min-width: 1181px)');
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', close);
    media.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', close); media.removeEventListener('change', resize); };
  }, [open]);
  const items = [
    ['/', text('首页', 'Home')], ['/solutions', text('解决方案', 'Solutions')],
    ['/whitepaper', text('技术白皮书', 'Whitepaper')], ['/cases', text('场景示例', 'Scenarios')],
    ['/partners', text('渠道合作', 'Partners')], ['/about', text('关于我们', 'About')],
  ];
  const actions = <>
    <a className="btn btn-ghost btn-sm" href={path('/download')}>{text('免费下载', 'Download')}</a>
    <a className="btn btn-primary btn-sm" href={path('/contact')}>{text('联系交流', 'Contact us')}</a>
  </>;
  return <header className="site-header">
    <div className="wrap header-inner">
      <a className="brand" href={path('/')} aria-label={text('JitAI 首页', 'JitAI home')}>
        <img className="official-logo" src={theme === 'dark' ? LOGO_DARK : LOGO_LIGHT} alt="JitAI" width="112" height="34" />
      </a>
      <nav className="nav" id="marketing-navigation" aria-label={text('主导航', 'Main navigation')} data-open={open} onClick={() => setOpen(false)}>
        {items.map(([route, label]) => <a key={route} href={path(route)} aria-current={active === route ? 'page' : undefined}>{label}</a>)}
        <div className="nav-cta">{actions}</div>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? text('切换浅色主题', 'Switch to light theme') : text('切换深色主题', 'Switch to dark theme')}>
          {theme === 'dark' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>}
        </button>
        {actions}
        <button ref={menuButton} className="nav-toggle" type="button" aria-expanded={open} aria-controls="marketing-navigation" aria-label={open ? text('关闭导航', 'Close navigation') : text('展开导航', 'Open navigation')} onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}/></svg>
        </button>
      </div>
    </div>
  </header>;
}
