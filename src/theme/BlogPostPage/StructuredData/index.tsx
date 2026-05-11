import React, { type ReactNode } from "react";
import Head from "@docusaurus/Head";
import {
    useBlogPost,
    useBlogPostStructuredData,
} from "@docusaurus/plugin-content-blog/client";

export default function BlogPostStructuredData(): ReactNode {
    const { metadata } = useBlogPost();
    const frontMatter = metadata?.frontMatter as any;

    if (frontMatter?.disableDefaultStructuredData) {
        return null;
    }

    const structuredData = useBlogPostStructuredData();

    return (
        <Head>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Head>
    );
}
