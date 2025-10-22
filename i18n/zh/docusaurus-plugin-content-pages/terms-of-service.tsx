import React from 'react';
import PageLayout from '@site/src/components/PageLayout';
import { LegalDocumentPage } from '@site/src/components/LegalDocuments/copyRight';

export default function ServiceAgreementPage(): React.JSX.Element {
  return (
    <PageLayout pageId="terms-of-service">
      <LegalDocumentPage type="service" />
    </PageLayout>
  );
}
