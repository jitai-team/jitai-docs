import React from "react";
import type BlogPostPageType from "@theme/BlogPostPage";
import BlogPostPage from "@theme-original/BlogPostPage";
import Layout from "@theme/Layout";
import PageLayout from "@site/src/components/PageLayout";
import CaseTemplate from "@site/src/components/CaseTemplate";
import styles from "./styles.module.css";

type Props = React.ComponentProps<typeof BlogPostPageType>;

const LayoutComponent = Layout as React.ComponentType<any>;

export default function BlogPostPageWrapper(props: Props): React.ReactElement {
    const { content } = props;
    const { metadata, frontMatter } = content;

    const seoTitle = (frontMatter as any)?.seoTitle;

    const title = seoTitle || metadata?.title || frontMatter?.title || "";
    const description = metadata?.description || frontMatter?.description || "";

    const isCase =
        typeof metadata?.permalink === "string" &&
        (metadata.permalink.startsWith("/cases/") ||
            metadata.permalink.startsWith("/zh/cases/"));

    // 强制移除左侧 Recent posts 侧边栏和右侧 TOC
    const blogPostProps = {
        ...props,
        sidebar: null,
    };

    if (isCase) {
        return (
            <LayoutComponent title={title} description={description} noNavbar>
                <PageLayout
                    pageId="blog-post"
                    title={title}
                    description={description}
                    containerClassName="blog-post-page"
                    withLayout={false}
                >
                    <div className={styles.blogPostWrapper}>
                        <CaseTemplate />
                    </div>
                </PageLayout>
            </LayoutComponent>
        );
    }

    return (
        <PageLayout
            pageId="blog-post"
            title={title}
            description={description}
            containerClassName="blog-post-page"
            withLayout={false}
        >
            <div className={styles.blogPostWrapper}>
                <BlogPostPage {...blogPostProps} />
            </div>
        </PageLayout>
    );
}
