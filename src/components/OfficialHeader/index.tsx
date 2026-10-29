import React from 'react';
import { useLocation } from '@docusaurus/router';
import Header from '@site/src/components/MarketingSite/Header';
import useMarketingTheme from '@site/src/components/MarketingSite/useMarketingTheme';
import '@site/src/components/MarketingSite/styles.css';

// Shared navigation for retained utility pages, including referral and Mac installation help.
export default function OfficialHeader({ currentLocale: _currentLocale }: { currentLocale?: string }) {
  const { theme, toggleTheme } = useMarketingTheme();
  const { pathname } = useLocation();
  const active = pathname.replace(/^\/zh(?=\/|$)/, '').replace(/\/$/, '') || '/';
  return <div className="marketing-site marketing-header-shell" data-marketing-theme={theme}>
    <Header active={active} theme={theme} toggleTheme={toggleTheme} />
  </div>;
}
