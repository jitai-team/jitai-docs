import React, { useState } from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Layout';
import AIAssistant from '@site/src/components/AIAssistant';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): React.JSX.Element {
  // 控制 AI 助手的显示状态
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <>
      <footer
        className={clsx('footer', {
          'footer--dark': style === 'dark',
        })}>
        <div className="container container-fluid">
          {links}
          {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && (
                <div 
                  className="margin-bottom--sm" 
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    e.preventDefault(); // 阻止默认行为
                    setShowAIAssistant(true);
                  }}
                  style={{ cursor: 'pointer' }}
                  title="点击打开 AI 助手"
                >
                  {logo}
                </div>
              )}
              {/* toolfame 徽章 */}
              <div style={{ marginBottom: '1rem', display:'none' }} className='external-link'>
                <a 
                  href="https://toolfame.com/item/jitai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://toolfame.com/badge-dark.svg" 
                    alt="Featured on toolfame.com" 
                    style={{ height: '54px', width: 'auto', opacity: 0.6 }} 
                  />
                </a>
              </div>
              {copyright}
            </div>
          )}
        </div>
      </footer>
      
      {/* AI Assistant 组件 - 默认隐藏，点击 logo 后显示 */}
      <AIAssistant visible={showAIAssistant} />
    </>
  );
}

