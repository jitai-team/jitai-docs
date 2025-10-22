import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import { LegalDocumentPage } from '@site/src/components/LegalDocuments/copyRight';

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <PageLayout pageId="privacy">
      <LegalDocumentPage type="privacy" />
    </PageLayout>
  );
}
