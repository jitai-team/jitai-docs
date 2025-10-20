import React from 'react';
import type {Props} from '@theme/BlogPostPage';
import PageLayout from '../../components/PageLayout';
import BlogPostPageOriginal from '@theme-original/BlogPostPage';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function BlogPostPage(props: Props): React.JSX.Element {
  const {metadata} = props;
  const title = metadata?.title || 'Blog Post';
  const description = metadata?.description || '';

  return (
    <PageLayout 
      title={title} 
      description={description}
      containerClassName={styles.container}
    >
      <div className={clsx(styles.blogPostPage)}>
        <BlogPostPageOriginal {...props} />
      </div>
    </PageLayout>
  );
}
