import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './legal-documents.module.css';

// 导入 MDX 文件
import PrivacyPolicyZh from './privacy-policy-zh.mdx';
import PrivacyPolicyEn from './privacy-policy-en.mdx';
import TermsOfServiceZh from './terms-of-service-zh.mdx';
import TermsOfServiceEn from './terms-of-service-en.mdx';

interface LegalDocumentProps {
  type: 'privacy' | 'service';
}

export const LegalDocumentPage: React.FC<LegalDocumentProps> = ({ type }) => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  // 根据类型和语言选择对应的 MDX 组件
  let Content: React.ComponentType;
  
  if (type === 'privacy') {
    Content = currentLocale === 'zh' ? PrivacyPolicyZh : PrivacyPolicyEn;
  } else {
    Content = currentLocale === 'zh' ? TermsOfServiceZh : TermsOfServiceEn;
  }

  return (
    <div className={styles.legalDocumentContainer}>
      <div className={styles.legalDocumentBody}>
        <Content />
      </div>
    </div>
  );
};
