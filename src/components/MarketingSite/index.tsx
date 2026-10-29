import React, { useEffect, useRef } from 'react';
import Head from '@docusaurus/Head';
import Header from './Header';
import Footer from './Footer';
import { useMarketingCopy, LOGO_DARK } from './copy';
import './styles.css';
import useMarketingTheme from './useMarketingTheme';

export default function MarketingLayout({ route, title, description, children }: {
  route: string; title: string; description: string; children: React.ReactNode;
}) {
  const { isZh, text, path } = useMarketingCopy();
  const { theme, toggleTheme } = useMarketingTheme();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // A direct visit to an English page should keep its Home link in English.
    try { localStorage.setItem('jitai-preferred-language', isZh ? 'zh' : 'en'); } catch { /* Optional preference only. */ }
  }, [isZh]);
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = element.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    const setup = () => {
      observer.disconnect();
      if (motion.matches) {
        element.removeAttribute('data-reveal-ready');
        return;
      }
      element.setAttribute('data-reveal-ready', 'true');
      items.forEach((node, i) => {
        node.style.transitionDelay = `${(i % 6) * 45}ms`;
        observer.observe(node);
      });
    };
    // Keyboard users must never land on an invisible offscreen link.
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      let node = event.target.closest<HTMLElement>('.reveal');
      while (node && element.contains(node)) {
        node.classList.add('in');
        observer.unobserve(node);
        node = node.parentElement?.closest<HTMLElement>('.reveal') || null;
      }
    };
    setup();
    motion.addEventListener('change', setup);
    element.addEventListener('focusin', revealFocused);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', setup);
      element.removeEventListener('focusin', revealFocused);
      element.removeAttribute('data-reveal-ready');
      items.forEach(node => node.style.removeProperty('transition-delay'));
    };
  }, [route]);
  return <div ref={root} className="marketing-site" data-marketing-theme={theme}>
    <Head>
      <title>{title} | JitAI</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | JitAI`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={LOGO_DARK} />
      <meta property="og:url" content={`https://jit.pro${path(route)}`} />
      <meta name="twitter:title" content={`${title} | JitAI`} />
      <meta name="twitter:description" content={description} />
      <meta name="theme-color" content={theme === 'dark' ? '#0a0d13' : '#f4f5f7'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`https://jit.pro${path(route)}`} />
    </Head>
    <a className="marketing-skip-link" href="#marketing-main">{text('跳转到主要内容', 'Skip to main content')}</a>
    <Header active={route} theme={theme} toggleTheme={toggleTheme} />
    <main id="marketing-main" tabIndex={-1}>{children}</main>
    <Footer theme={theme} />
  </div>;
}
