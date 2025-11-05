import React from 'react';
import type BlogPostPageType from '@theme/BlogPostPage';
import BlogPostPage from '@theme-original/BlogPostPage';
import PageLayout from '@site/src/components/PageLayout';
import styles from './styles.module.css';

type Props = React.ComponentProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): React.ReactElement {
  const { content } = props;
  const { metadata, frontMatter } = content;

  const title = metadata?.title || frontMatter?.title || '';
  const description = metadata?.description || frontMatter?.description || '';

  // 强制移除左侧 Recent posts 侧边栏和右侧 TOC
  const blogPostProps = {
    ...props,
    sidebar: null,
  };

  return (
    <PageLayout pageId="blog-post" title={title} description={description} containerClassName="blog-post-page" withLayout={false}>
      <div className={styles.blogPostWrapper}>
        <BlogPostPage {...blogPostProps} />
      </div>
    </PageLayout>
  );
}


