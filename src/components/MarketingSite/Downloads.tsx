import React, { useEffect, useState } from 'react';
import zh from '@site/src/components/DownloadSection/constant-zh';
import en from '@site/src/components/DownloadSection/constant-en';
import { useMarketingCopy } from './copy';

export default function Downloads() {
  const { isZh, text, path } = useMarketingCopy();
  const content = isZh ? zh : en;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const [copyState, setCopyState] = useState<'idle' | 'done' | 'failed'>('idle');
  const copyCommand = async () => {
    try { await navigator.clipboard.writeText(content.server.docker.command); setCopyState('done'); }
    catch { setCopyState('failed'); }
  };
  return <>
    <section className="section"><div className="wrap">
      <div className="section-head"><p className="kicker">{text('开始使用', 'Get started')}</p><h1 className="h1 mt-16">{text('桌面端与服务器下载安装', 'Download JitAI for desktop and server')}</h1><p className="lead mt-24">{text('选择适合你的系统，直接下载安装。', 'Choose your platform and download directly.')}</p></div>
      <div className="grid g-2">
        <article className="marketing-card download-card"><p className="kicker">Windows</p><h2 className="h3">{content.desktop.windows.title}</h2><p className="small">{content.desktop.windows.description}</p><div className="btn-row"><a className="btn btn-primary analytics-downloadWindows" href={content.desktop.windows.downloadUrl}>{content.desktop.windows.downloadText}</a></div></article>
        <article className="marketing-card download-card"><p className="kicker">macOS</p><h2 className="h3">{content.desktop.mac.title}</h2><p className="small">{content.desktop.mac.description}</p><div className="btn-row"><a className="btn btn-primary analytics-downloadMacApple" href={content.desktop.mac.appleDownloadUrl}>{content.desktop.mac.appleDownloadText}</a><a className="btn btn-ghost analytics-downloadMacIntel" href={content.desktop.mac.intelDownloadUrl}>{content.desktop.mac.intelDownloadText}</a></div></article>
      </div>
      <article className="marketing-card mt-24"><p className="kicker">Linux / Docker</p><h2 className="h3 mt-16">{text('服务器端安装', 'Server installation')}</h2><p className="small mt-16">{text('支持 Linux 服务器部署，适用于生产环境。执行以下安装命令：', 'Deploy on a Linux server for production use. Run the installation command below:')}</p><pre className="install-command mt-24"><code>{content.server.docker.command}</code></pre><button type="button" className="btn btn-primary mt-16 analytics-copyDocker" onClick={copyCommand}>{text('复制安装命令', 'Copy installation command')}</button><p role="status" className="small mt-16">{copyState === 'done' ? text('安装命令已复制。', 'Installation command copied.') : copyState === 'failed' ? text('无法自动复制，请选中上方命令手动复制。', 'Automatic copy is unavailable. Select and copy the command above.') : ''}</p></article>
      {isMobile && <div className="callout mt-24 download-mobile-notice"><p>{text('手机用户请在 Windows、Mac 或 Linux 服务器上下载安装。', 'Please install JitAI on a Windows or Mac computer, or a Linux server.')}</p><p className="mt-8"><a className="textlink" href={path('/contact')}>{text('遇到安装问题？联系我们', 'Need installation help? Contact us')}</a></p></div>}
    </div></section>
  </>;
}
