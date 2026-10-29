import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/content/Home';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/" title={text("打造 AI 原生系统，让 AI 看懂业务全貌", "Build AI-native business systems")} description={text("AI 时代开发和运行一体化平台，构建 AI 原生业务系统与智能体。", "One platform to develop and operate AI-native business systems and agents.")}><Content /></MarketingLayout>;
}
