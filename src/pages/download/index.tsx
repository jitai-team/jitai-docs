import React from 'react';
import MarketingLayout from '@site/src/components/MarketingSite';
import Content from '@site/src/components/MarketingSite/Downloads';
import { useMarketingCopy } from '@site/src/components/MarketingSite/copy';
export default function Page() {
  const { text } = useMarketingCopy();
  return <MarketingLayout route="/download" title={text("桌面端与服务器下载", "Desktop and server downloads")} description={text("直接下载 Windows、Mac 安装包，获取 Linux 服务器安装命令。", "Download JitAI for Windows and Mac, or install it on your Linux server.")}><Content /></MarketingLayout>;
}
